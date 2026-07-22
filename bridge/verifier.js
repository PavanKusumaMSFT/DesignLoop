'use strict';

/**
 * Verifier — reads a tool's VERIFY.md, scores the output artifacts against its
 * metric dimensions, and decides ACCEPT or RE-RUN (once). Hard stop after two
 * attempts; flags the job for user review.
 *
 * Flow:
 *   Tool job done → verifier.check(job) → ACCEPT: job.status = 'done'
 *                                       → RE-RUN:  new round-2 job created
 *                                       → FAIL:    job.status = 'flagged'
 */

const fs   = require('fs');
const path = require('path');

const RESULT_START = '###VERIFY_RESULT###';
const RESULT_END   = '###END_VERIFY_RESULT###';

class Verifier {
  /**
   * @param {object} opts
   * @param {string} opts.root - repo root
   * @param {object} opts.jobs - JobManager instance (set after construction to avoid circular dep)
   */
  constructor({ root }) {
    this.root = root;
    this.jobs = null; // injected after JobManager is created
  }

  /* ── file helpers ─────────────────────────────────────────────── */

  _readVerifyMd(toolId) {
    const p = path.join(this.root, '.github', 'skills', toolId, 'VERIFY.md');
    try { return fs.readFileSync(p, 'utf8'); } catch { return null; }
  }

  _readArtifacts(artifacts) {
    const parts = [];
    for (const a of (artifacts || []).filter(a => a.isMarkdown)) {
      try {
        const content = fs.readFileSync(path.join(this.root, a.path), 'utf8');
        parts.push(`### ${a.path}\n\n${content}`);
      } catch { /* skip unreadable */ }
    }
    return parts.join('\n\n---\n\n') || '(no artifacts produced)';
  }

  /* ── prompt builder ───────────────────────────────────────────── */

  _buildVerifyPrompt(toolId, verifyMd, artifactContent, round) {
    return `You are a quality verifier for the "${toolId}" tool in a design operations system.

## Verification Criteria

${verifyMd}

## Artifact to Evaluate

${artifactContent}

## Your Task

1. Score each dimension defined above from 0–100.
2. Compute a weighted composite score using the weights provided.
3. Decide: ACCEPT if composite ≥ accept_threshold, otherwise RERUN.
4. For each dimension that scored below its threshold:
   - Start from the pre-defined failure_instruction in the criteria.
   - Add specific observations from the artifact (exact quotes, locations, missing items).
   - Combine into a surgical, actionable instruction for the re-run.
5. Write a rerunBrief that the tool agent can act on immediately — specific, not vague.

Output ONLY the JSON block below, wrapped in the exact markers. No other text outside the markers.

${RESULT_START}
{
  "toolId": "${toolId}",
  "round": ${round},
  "scores": {
    "dimension-name": 0
  },
  "composite": 0,
  "decision": "accept",
  "failedDimensions": [
    {
      "dimension": "name",
      "score": 0,
      "threshold": 0,
      "instruction": "combined pre-defined + specific observations"
    }
  ],
  "rerunBrief": "specific instructions the tool agent must follow in the re-run"
}
${RESULT_END}`;
  }

  /* ── result parser ────────────────────────────────────────────── */

  _parseResult(log) {
    const text = (log || []).map(e => e.line).join('\n');
    const s = text.indexOf(RESULT_START);
    const e = text.indexOf(RESULT_END);
    if (s === -1 || e === -1) return null;
    try {
      return JSON.parse(text.slice(s + RESULT_START.length, e).trim());
    } catch { return null; }
  }

  /* ── re-run prompt builder ────────────────────────────────────── */

  _buildRerunPrompt(originalPrompt, verifyResult) {
    const failList = (verifyResult.failedDimensions || [])
      .map(d => `  [${d.dimension} — scored ${d.score}/100, required ${d.threshold}]\n  ${d.instruction}`)
      .join('\n\n');

    return `${originalPrompt}

---
QUALITY GATE FAILED — Round ${verifyResult.round} score: ${verifyResult.composite}/100

The previous output did not meet the quality bar. This is your one re-run.
Address every failure listed below precisely — vague or generic output will not pass.

${failList || verifyResult.rerunBrief || '(see previous artifact for specific issues)'}

Instructions:
- Read the round-${verifyResult.round} artifact produced previously for context.
- Produce a revised version that directly addresses each failure above.
- Every sentence must be specific to this task — no boilerplate.`;
  }

  /* ── wait for a job to reach a terminal state ─────────────────── */

  _waitForJob(jobId) {
    return new Promise((resolve) => {
      const poll = () => {
        const job = this.jobs.get(jobId);
        if (!job) return resolve(null);
        const terminal = ['done', 'error', 'cancelled', 'flagged'];
        if (terminal.includes(job.status)) return resolve(job);
        setTimeout(poll, 600);
      };
      poll();
    });
  }

  /* ── main entry point ─────────────────────────────────────────── */

  /**
   * Called by JobManager after a tool job finishes.
   * Handles the full verify → [re-run] → [flag] cycle.
   *
   * @param {object} job - the completed tool job
   */
  async check(job) {
    const { toolId, round = 1, taskId, promptText, artifacts } = job;

    // 1. No toolId or no VERIFY.md → auto-accept
    const verifyMd = this._readVerifyMd(toolId);
    if (!toolId || !verifyMd) {
      this.jobs._finalise(job, { status: 'done' });
      return;
    }

    // 2. Emit 'verifying' status so the UI can show progress
    this.jobs._emit(job, 'status', { status: 'verifying', round });
    job.status = 'verifying';

    // 3. Build and run the verify job
    const artifactContent = this._readArtifacts(artifacts);
    const verifyPrompt    = this._buildVerifyPrompt(toolId, verifyMd, artifactContent, round);

    const verifyJob = this.jobs.createJob({
      prompt: verifyPrompt,
      agent:  null,          // use default Copilot agent
      taskId,
      kind:   'verify',
      _skipVerify: true,     // prevent recursive verification
    });

    const completedVerifyJob = await this._waitForJob(verifyJob.id);
    const result = completedVerifyJob ? this._parseResult(completedVerifyJob.log) : null;

    // 4. Could not parse result → auto-accept (don't block the user)
    if (!result) {
      this.jobs._appendLog(job, 'system',
        '⚠ Verifier produced unreadable output — accepting as-is. Check VERIFY.md output format.');
      this.jobs._finalise(job, { status: 'done', verifyResult: null });
      return;
    }

    job.verifyResult = result;
    this.jobs._emit(job, 'verify-result', result);

    // 5. ACCEPT
    if (result.decision === 'accept') {
      this.jobs._appendLog(job, 'system',
        `✔ Verified — quality score ${result.composite}/100 (round ${round}).`);
      this.jobs._finalise(job, { status: 'done', verifyResult: result });
      return;
    }

    // 6. RE-RUN — only allowed on round 1
    if (round === 1) {
      this.jobs._appendLog(job, 'system',
        `↺ Quality score ${result.composite}/100 — below threshold. Starting round 2…`);
      job.status = 'rerunning';
      this.jobs._emit(job, 'status', { status: 'rerunning', round: 2, verifyResult: result });

      const rerunPrompt = this._buildRerunPrompt(promptText, result);
      const rerunJob = this.jobs.createJob({
        prompt: rerunPrompt,
        agent:  job.agent,
        taskId,
        kind:   job.kind,
        toolId,
        round:  2,
        parentJobId: job.id,
        _skipVerify: false, // round 2 goes through verification
      });

      job.rerunJobId = rerunJob.id;
      this.jobs._emit(job, 'status', { status: 'rerunning', round: 2, rerunJobId: rerunJob.id });
      return; // round-2 job will emit its own final status
    }

    // 7. FAIL — round 2 already used, hard stop
    this.jobs._appendLog(job, 'system',
      `⚑ Quality gate failed after 2 rounds (score ${result.composite}/100). Flagged for review.`);
    this.jobs._finalise(job, { status: 'flagged', verifyResult: result });
  }
}

module.exports = { Verifier };
