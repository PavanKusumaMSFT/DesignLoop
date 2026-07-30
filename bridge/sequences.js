'use strict';

/**
 * Server-side sequence orchestrator for the DesignLoop Bridge.
 *
 * A "sequence" is a multi-step run (a chain of stage and/or tool steps). The
 * bridge — not the browser — owns the loop: it runs one JobManager job per
 * step, and when Review mode is on it PAUSES after each step and persists the
 * whole run to disk. Because the state lives on the server, a paused sequence
 * can be resumed with a plain API call (or restart) — no browser tab required.
 *
 * Zero external dependencies — Node built-ins only.
 */

const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

class SequenceManager {
  /**
   * @param {object} deps
   * @param {import('./jobs').JobManager} deps.jobs
   * @param {string} deps.dataDir              - where to persist index.json
   * @param {(o:object)=>string} deps.buildStagePrompt
   * @param {(o:object)=>string} deps.buildToolPrompt
   * @param {(stageId:string)=>string|undefined} deps.stageAgent
   * @param {(entry:object)=>object} [deps.onPause] - create an inbox review entry when a seq pauses
   * @param {(sequenceId:string)=>void} [deps.onResolve] - resolve/remove the inbox entry when resumed/stopped
   */
  constructor({ jobs, dataDir, buildStagePrompt, buildToolPrompt, stageAgent, onPause, onResolve }) {
    this.jobs = jobs;
    this.dataDir = dataDir;
    this.file = path.join(dataDir, 'index.json');
    this.buildStagePrompt = buildStagePrompt;
    this.buildToolPrompt = buildToolPrompt;
    this.stageAgent = stageAgent;
    this.onPause = onPause || (() => null);
    this.onResolve = onResolve || (() => {});
    this.seqs = new Map();        // id -> sequence
    this._subscribers = new Map(); // id -> Set(res)
    this._load();
  }

  /* ── persistence ─────────────────────────────────────────────── */

  _persist() {
    try {
      fs.mkdirSync(this.dataDir, { recursive: true });
      const rows = [...this.seqs.values()].map((s) => this._store(s));
      fs.writeFileSync(this.file, JSON.stringify(rows, null, 2) + '\n');
    } catch { /* best-effort */ }
  }

  /** Serializable form (drop live-only fields). */
  _store(s) {
    return {
      id: s.id, mode: s.mode, steps: s.steps, index: s.index, status: s.status,
      reviewMode: s.reviewMode, text: s.text, promptBlock: s.promptBlock,
      taskId: s.taskId, allArtifacts: s.allArtifacts, nextNote: s.nextNote,
      model: s.model || null,
      reviewEntryId: s.reviewEntryId, currentJobId: s.currentJobId,
      error: s.error, createdAt: s.createdAt, updatedAt: s.updatedAt,
    };
  }

  _load() {
    let rows = [];
    try { rows = JSON.parse(fs.readFileSync(this.file, 'utf8')); } catch { rows = []; }
    if (!Array.isArray(rows)) rows = [];
    for (const s of rows) {
      // A sequence that was mid-run when the bridge stopped can't have its
      // (now-dead) child process reattached. Rewind to just before the
      // interrupted step so a resume re-runs it cleanly.
      if (s.status === 'running') {
        const i = s.index;
        if (s.steps[i]) s.steps[i].status = 'pending';
        s.index = i - 1;
        s.status = 'paused';
        s.currentJobId = null;
        s.interrupted = true;
      }
      this.seqs.set(s.id, s);
    }
  }

  /* ── SSE ─────────────────────────────────────────────────────── */

  subscribe(id, res) {
    if (!this.seqs.has(id)) return false;
    if (!this._subscribers.has(id)) this._subscribers.set(id, new Set());
    const set = this._subscribers.get(id);
    set.add(res);
    res.on('close', () => set.delete(res));
    return true;
  }

  _emit(seq, event, data) {
    const set = this._subscribers.get(seq.id);
    if (!set) return;
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    for (const res of set) { try { res.write(payload); } catch { /* gone */ } }
  }

  _emitState(seq) {
    seq.updatedAt = new Date().toISOString();
    this._emit(seq, 'seq-status', this.snapshot(seq.id));
  }

  /* ── lifecycle ───────────────────────────────────────────────── */

  /**
   * @param {object} spec
   * @param {'stage'|'tool'|'mixed'} spec.mode
   * @param {Array<{mode:'stage'|'tool',stageId?:string,toolId?:string,agent?:string,name?:string,label:string,runner?:string}>} spec.steps
   * @param {string} spec.text
   * @param {string} spec.promptBlock  - pre-materialized source block
   * @param {string|null} spec.taskId
   * @param {boolean} spec.reviewMode
   */
  create({ mode, steps, text, promptBlock, taskId, reviewMode, model }) {
    const id = randomUUID();
    const seq = {
      id,
      mode: mode || 'stage',
      steps: (steps || []).map((s) => ({
        mode: s.mode || 'stage',
        stageId: s.stageId || null,
        toolId: s.toolId || null,
        agent: s.agent || null,
        name: s.name || s.label || null,
        label: s.label || s.name || s.stageId || s.toolId || 'Step',
        runner: s.runner || null,
        status: 'pending',
        artifacts: [],
      })),
      index: -1,
      status: 'running',
      reviewMode: reviewMode !== false,
      model: model || null,
      text: text || '',
      promptBlock: promptBlock || '',
      taskId: taskId || null,
      allArtifacts: [],
      nextNote: '',
      reviewEntryId: null,
      currentJobId: null,
      error: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.seqs.set(id, seq);
    this._persist();
    this._runStep(seq, 0);
    return seq;
  }

  get(id) { return this.seqs.get(id); }

  list() {
    return [...this.seqs.values()]
      .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
      .map((s) => this.snapshot(s.id));
  }

  snapshot(id) {
    const s = this.seqs.get(id);
    if (!s) return null;
    return {
      id: s.id, mode: s.mode, status: s.status, index: s.index,
      reviewMode: s.reviewMode, taskId: s.taskId, text: s.text,
      currentJobId: s.currentJobId, error: s.error,
      artifacts: s.allArtifacts,
      steps: s.steps.map((st) => ({
        label: st.label, mode: st.mode, stageId: st.stageId, toolId: st.toolId,
        status: st.status, artifacts: st.artifacts,
      })),
      createdAt: s.createdAt, updatedAt: s.updatedAt,
    };
  }

  /** Build the prompt + job spec for step i and launch its job. */
  _runStep(seq, i) {
    const step = seq.steps[i];
    if (!step) return;
    seq.index = i;
    seq.status = 'running';
    step.status = 'running';
    const note = seq.nextNote ? `\n\nReviewer note for this step: ${seq.nextNote}` : '';
    seq.nextNote = '';

    let jobSpec;
    if (step.mode === 'stage') {
      const agent = this.stageAgent(step.stageId);
      const prompt = this.buildStagePrompt({
        stageId: step.stageId,
        userPrompt: (seq.text || '') + note,
        promptBlock: seq.promptBlock,
        taskId: seq.taskId,
      });
      jobSpec = { prompt, agent, taskId: seq.taskId, kind: 'stage', model: seq.model || null, _skipVerify: true };
    } else {
      const prompt = this.buildToolPrompt({
        toolName: step.name || step.toolId,
        userPrompt: (seq.text || '') + note,
        promptBlock: seq.promptBlock,
      });
      jobSpec = {
        prompt, agent: step.agent || null, taskId: seq.taskId,
        kind: `tool:${step.toolId}`, toolId: step.toolId,
        runner: step.runner || undefined,
        model: seq.model || null,
        _skipVerify: !step.toolId || step.runner === 'claude',
      };
    }

    const job = this.jobs.createJob(jobSpec);
    seq.currentJobId = job.id;
    job._onDone = (finished) => this._onStepDone(seq, finished, i);
    this._persist();
    this._emitState(seq);
  }

  /** A step's job finished — record it and advance, pause, or finish. */
  _onStepDone(seq, job, i) {
    if (seq.status === 'stopped') return; // cancelled out from under us
    const step = seq.steps[i];
    if (Array.isArray(job.artifacts)) {
      step.artifacts = job.artifacts;
      seq.allArtifacts.push(...job.artifacts);
    }
    seq.currentJobId = null;

    if (job.status === 'error' || job.status === 'cancelled') {
      step.status = job.status === 'cancelled' ? 'skipped' : 'error';
      seq.status = job.status === 'cancelled' ? 'stopped' : 'error';
      seq.error = job.error || null;
      for (let j = i + 1; j < seq.steps.length; j++) seq.steps[j].status = 'skipped';
      this._persist();
      this._emitState(seq);
      return;
    }

    step.status = 'done';

    if (i >= seq.steps.length - 1) {
      seq.status = 'done';
      this._persist();
      this._emitState(seq);
      return;
    }

    if (seq.reviewMode) {
      seq.status = 'paused';
      seq.index = i;
      // Surface a resumable entry in the review inbox.
      try {
        const entry = this.onPause({
          sequenceId: seq.id,
          taskId: seq.taskId,
          justLabel: step.label,
          nextLabel: seq.steps[i + 1].label,
        });
        seq.reviewEntryId = entry && entry.id ? entry.id : null;
      } catch { /* inbox is best-effort */ }
      this._persist();
      this._emitState(seq);
      return;
    }

    this._runStep(seq, i + 1);
  }

  /** Continue a paused sequence to the next step. */
  resume(id, note) {
    const seq = this.seqs.get(id);
    if (!seq) return { ok: false, error: 'Unknown sequence' };
    if (seq.status !== 'paused') return { ok: false, error: `Cannot resume a ${seq.status} sequence` };
    if (note) seq.nextNote = String(note);
    if (seq.reviewEntryId) { try { this.onResolve(seq.reviewEntryId); } catch {} seq.reviewEntryId = null; }
    const next = seq.index + 1;
    seq.interrupted = false;
    if (next >= seq.steps.length) { seq.status = 'done'; this._persist(); this._emitState(seq); return { ok: true, seq: this.snapshot(id) }; }
    this._runStep(seq, next);
    return { ok: true, seq: this.snapshot(id) };
  }

  /** Re-run the step that just completed (the one we paused after). */
  redo(id, note) {
    const seq = this.seqs.get(id);
    if (!seq) return { ok: false, error: 'Unknown sequence' };
    if (seq.status !== 'paused') return { ok: false, error: `Cannot redo a ${seq.status} sequence` };
    if (note) seq.nextNote = String(note);
    if (seq.reviewEntryId) { try { this.onResolve(seq.reviewEntryId); } catch {} seq.reviewEntryId = null; }
    const target = Math.max(0, seq.index);
    this._runStep(seq, target);
    return { ok: true, seq: this.snapshot(id) };
  }

  /** Abort a paused or running sequence. */
  stop(id) {
    const seq = this.seqs.get(id);
    if (!seq) return { ok: false, error: 'Unknown sequence' };
    if (seq.status === 'done' || seq.status === 'error' || seq.status === 'stopped') {
      return { ok: false, error: `Sequence already ${seq.status}` };
    }
    if (seq.currentJobId) { try { this.jobs.cancel(seq.currentJobId); } catch {} }
    if (seq.reviewEntryId) { try { this.onResolve(seq.reviewEntryId); } catch {} seq.reviewEntryId = null; }
    seq.status = 'stopped';
    for (let j = seq.index + 1; j < seq.steps.length; j++) {
      if (seq.steps[j].status === 'pending') seq.steps[j].status = 'skipped';
    }
    this._persist();
    this._emitState(seq);
    return { ok: true, seq: this.snapshot(id) };
  }

  /** Remove a terminal sequence from the store. */
  remove(id) {
    const seq = this.seqs.get(id);
    if (!seq) return false;
    if (seq.reviewEntryId) { try { this.onResolve(seq.reviewEntryId); } catch {} }
    this.seqs.delete(id);
    this._persist();
    return true;
  }
}

module.exports = { SequenceManager };
