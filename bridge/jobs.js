'use strict';

/**
 * Job manager for the DesignLoop Bridge.
 *
 * Spawns the GitHub Copilot CLI headlessly, captures its output line-by-line,
 * streams it to subscribers, and computes the artifacts it produced by diffing
 * `git status` before and after the run.
 *
 * Zero external dependencies — uses only Node built-ins.
 */

const { spawn, execSync, execFileSync } = require('child_process');
const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');

/** Resolve the absolute path to the `copilot` binary once at startup. */
function resolveCopilotBin() {
  if (process.env.COPILOT_BIN) return process.env.COPILOT_BIN;
  const tries = [
    () => execSync('command -v copilot', { shell: '/bin/zsh', encoding: 'utf8' }).trim(),
    () => execSync('which copilot', { encoding: 'utf8' }).trim(),
  ];
  for (const t of tries) {
    try {
      const p = t();
      if (p) return p;
    } catch { /* keep trying */ }
  }
  return 'copilot'; // fall back to PATH lookup at spawn time
}

const COPILOT_BIN = resolveCopilotBin();

class JobManager {
  /**
   * @param {object} opts
   * @param {string} opts.root - repository root (cwd for the agent + git).
   * @param {number} [opts.concurrency=1] - max simultaneously running jobs.
   */
  constructor({ root, concurrency = 1 }) {
    this.root = root;
    this.concurrency = concurrency;
    this.jobs = new Map();   // id -> job
    this.queue = [];         // ids waiting to run
    this.running = 0;
  }

  copilotBin() { return COPILOT_BIN; }

  /** Snapshot of `git status --porcelain` as a Set of raw lines. */
  _gitSnapshot() {
    try {
      const out = execSync('git status --porcelain', { cwd: this.root, encoding: 'utf8' });
      return new Set(out.split('\n').filter(Boolean));
    } catch {
      return new Set(); // not a git repo / git missing — artifacts just won't be computed
    }
  }

  /**
   * Snapshot of every file currently inside `tasks/` as a Set of repo-relative
   * paths (e.g. "tasks/my-task/ideation/concepts.md"). Git shows whole untracked
   * directories as a single `??` entry, so new files inside them are invisible to
   * the git diff. This walk catches them.
   */
  _filesSnapshot() {
    const tasksDir = path.join(this.root, 'tasks');
    const files = new Set();
    const walk = (dir) => {
      let entries;
      try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
      for (const e of entries) {
        if (e.name.startsWith('.')) continue;
        const abs = path.join(dir, e.name);
        if (e.isDirectory()) walk(abs);
        else files.add(path.relative(this.root, abs));
      }
    };
    walk(tasksDir);
    return files;
  }

  /** Parse a porcelain line into its file path (handles renames). */
  _porcelainPath(line) {
    let p = line.slice(3);
    const arrow = p.indexOf(' -> ');
    if (arrow !== -1) p = p.slice(arrow + 4);
    // Porcelain quotes paths containing special chars.
    if (p.startsWith('"') && p.endsWith('"')) {
      try { p = JSON.parse(p); } catch { p = p.slice(1, -1); }
    }
    return p;
  }

  /**
   * Files that appear changed at `end` but not (identically) at `start`.
   * Also includes new files discovered by diffing filesystem snapshots of
   * tasks/ (handles files inside already-untracked directories).
   */
  _computeArtifacts(gitStart, gitEnd, filesStart, filesEnd) {
    const seen = new Set();
    const artifacts = [];

    const add = (rel) => {
      if (!rel || seen.has(rel)) return;
      seen.add(rel);
      const abs = path.join(this.root, rel);
      let exists = false;
      try { exists = fs.statSync(abs).isFile(); } catch {}
      if (!exists) return;
      artifacts.push({ path: rel, isMarkdown: rel.toLowerCase().endsWith('.md') });
    };

    // Git-tracked changes (modified, staged, new tracked files).
    for (const line of gitEnd) {
      if (gitStart.has(line)) continue;
      add(this._porcelainPath(line));
    }

    // New files inside already-untracked task directories (git misses these).
    if (filesStart && filesEnd) {
      for (const rel of filesEnd) {
        if (!filesStart.has(rel)) add(rel);
      }
    }

    // Markdown first, then alphabetical — the frontend opens the first artifact.
    artifacts.sort((a, b) => (Number(b.isMarkdown) - Number(a.isMarkdown)) || a.path.localeCompare(b.path));
    return artifacts;
  }

  /**
   * Create and queue a job.
   * @param {object} spec
   * @param {string} spec.prompt      - the full prompt for the agent.
   * @param {string} [spec.agent]     - custom agent slug (e.g. "design-lead").
   * @param {string} [spec.taskId]
   * @param {string} [spec.kind]
   * @param {string} [spec.toolId]    - tool id for verify-loop (triggers VERIFY.md check on completion).
   * @param {number} [spec.round]     - which round this is (1 or 2). Default 1.
   * @param {string} [spec.parentJobId] - round-2 jobs reference their parent.
   * @param {boolean} [spec._skipVerify] - internal: skip verification (verify jobs, plain runs).
   */
  createJob({ prompt, agent, taskId, kind, toolId, round, parentJobId, _skipVerify }) {
    const id = randomUUID();
    const job = {
      id,
      kind: kind || 'run',
      taskId: taskId || null,
      agent: agent || null,
      promptText: prompt || '',
      toolId: toolId || null,
      round: round || 1,
      parentJobId: parentJobId || null,
      rerunJobId: null,
      verifyResult: null,
      _skipVerify: !!_skipVerify,
      status: 'queued',          // queued | running | verifying | rerunning | done | error | flagged | cancelled
      log: [],                   // [{ t, stream, line }]
      exitCode: null,
      error: null,
      artifacts: [],
      createdAt: Date.now(),
      startedAt: null,
      endedAt: null,
      _child: null,
      _gitStart: null,
      _filesStart: null,
      _subscribers: new Set(),   // res objects for SSE
    };
    this.jobs.set(id, job);
    this.queue.push(id);
    this._pump();
    return job;
  }

  get(id) { return this.jobs.get(id); }

  subscribe(id, res) {
    const job = this.jobs.get(id);
    if (!job) return false;
    job._subscribers.add(res);
    res.on('close', () => job._subscribers.delete(res));
    return true;
  }

  _emit(job, event, data) {
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    for (const res of job._subscribers) {
      try { res.write(payload); } catch { /* client gone */ }
    }
  }

  _appendLog(job, stream, line) {
    const entry = { t: Date.now(), stream, line };
    job.log.push(entry);
    if (job.log.length > 5000) job.log.shift(); // cap memory
    this._emit(job, 'log', entry);
  }

  _pump() {
    while (this.running < this.concurrency && this.queue.length) {
      const id = this.queue.shift();
      const job = this.jobs.get(id);
      if (!job || job.status === 'cancelled') continue;
      this._start(job);
    }
  }

  _start(job) {
    this.running++;
    job.status = 'running';
    job.startedAt = Date.now();
    job._gitStart   = this._gitSnapshot();
    job._filesStart = this._filesSnapshot();
    this._emit(job, 'status', { status: 'running' });

    const finalArgs = ['-p', job.promptText, '--allow-all-tools'];
    if (job.agent) finalArgs.push(`--agent=${job.agent}`);

    let child;
    try {
      child = spawn(COPILOT_BIN, finalArgs, {
        cwd: this.root,
        env: process.env,
        stdio: ['ignore', 'pipe', 'pipe'],
        detached: true, // own process group so cancel can kill the whole subtree
      });
    } catch (err) {
      this._appendLog(job, 'stderr', `Failed to launch Copilot CLI: ${err.message}`);
      return this._finish(job, { status: 'error', error: err.message });
    }

    job._child = child;
    this._appendLog(job, 'system', `▶ Running Copilot CLI${job.agent ? ` (agent: ${job.agent})` : ''}…`);

    const wire = (stream, name) => {
      let buf = '';
      stream.setEncoding('utf8');
      stream.on('data', (chunk) => {
        buf += chunk;
        let nl;
        while ((nl = buf.indexOf('\n')) !== -1) {
          const line = buf.slice(0, nl).replace(/\r$/, '');
          buf = buf.slice(nl + 1);
          this._appendLog(job, name, line);
        }
      });
      stream.on('end', () => {
        if (buf.length) this._appendLog(job, name, buf.replace(/\r$/, ''));
      });
    };
    wire(child.stdout, 'stdout');
    wire(child.stderr, 'stderr');

    child.on('error', (err) => {
      this._appendLog(job, 'stderr', `Process error: ${err.message}`);
      this._finish(job, { status: 'error', error: err.message });
    });

    child.on('close', (code, signal) => {
      if (job.status === 'cancelled') {
        return this._finish(job, { status: 'cancelled', exitCode: code });
      }
      // The CLI exits 0 even when it can't authenticate — detect that explicitly.
      const authFailed = job.log.some((e) =>
        e.stream === 'stderr' && /No authentication information found/i.test(e.line));
      if (authFailed) {
        this._appendLog(job, 'system',
          '✖ Copilot CLI is not authenticated. Run `copilot` once and use /login, or set COPILOT_GITHUB_TOKEN.');
        return this._finish(job, { status: 'error', exitCode: code, error: 'Copilot CLI not authenticated' });
      }
      const artifacts = this._computeArtifacts(job._gitStart, this._gitSnapshot(), job._filesStart, this._filesSnapshot());
      job.artifacts = artifacts;
      if (code === 0) {
        this._appendLog(job, 'system', `✔ Done — ${artifacts.length} artifact(s) changed.`);
        this._finish(job, { status: 'done', exitCode: 0, artifacts });
      } else {
        this._appendLog(job, 'system', `✖ Exited with code ${code}${signal ? ` (${signal})` : ''}.`);
        this._finish(job, { status: 'error', exitCode: code, artifacts });
      }
    });
  }

  /**
   * Internal: set terminal state and emit. Called by the verifier (or directly
   * when there is no verifier / _skipVerify is set).
   */
  _finalise(job, { status, exitCode = null, error = null, artifacts, verifyResult }) {
    job.status = status;
    if (exitCode !== null) job.exitCode = exitCode;
    if (error     !== null) job.error     = error;
    if (artifacts)          job.artifacts  = artifacts;
    if (verifyResult)       job.verifyResult = verifyResult;
    job.endedAt = Date.now();
    if (job._killTimer) { clearTimeout(job._killTimer); job._killTimer = null; }
    job._child = null;
    this._emit(job, 'status', {
      status,
      exitCode: job.exitCode,
      error: job.error,
      artifacts: job.artifacts,
      verifyResult: job.verifyResult || null,
    });
  }

  _finish(job, { status, exitCode = null, error = null, artifacts = job.artifacts }) {
    // Store exit metadata on the job before handing off to the verifier.
    job.exitCode  = exitCode;
    job.error     = error;
    job.artifacts = artifacts || [];
    job.endedAt   = Date.now();
    if (job._killTimer) { clearTimeout(job._killTimer); job._killTimer = null; }
    job._child = null;

    this.running = Math.max(0, this.running - 1);
    this._pump();

    // Non-tool jobs or jobs that should skip verification → finalise immediately.
    if (job._skipVerify || !this._verifier || status === 'cancelled' || status === 'error') {
      this._finalise(job, { status, exitCode, error, artifacts: job.artifacts });
      return;
    }

    // Tool job completed successfully → hand off to verifier.
    if (status === 'done') {
      this._verifier.check(job).catch((err) => {
        this._appendLog(job, 'system', `Verifier error: ${err.message}`);
        this._finalise(job, { status: 'done' }); // fall back to accepting on verifier crash
      });
      return;
    }

    // Error / other terminal state → finalise directly.
    this._finalise(job, { status, exitCode, error, artifacts: job.artifacts });
  }

  /** Cancel a queued or running job. */
  cancel(id) {
    const job = this.jobs.get(id);
    if (!job) return false;
    if (job.status === 'queued') {
      job.status = 'cancelled';
      job.endedAt = Date.now();
      this._emit(job, 'status', { status: 'cancelled' });
      return true;
    }
    if (job.status === 'running' && job._child) {
      job.status = 'cancelled';
      this._appendLog(job, 'system', '■ Cancelling — stopping the agent…');
      this._killTree(job._child, 'SIGTERM');
      // Hard-kill the whole group quickly if it ignores SIGTERM (stop burning tokens).
      job._killTimer = setTimeout(() => {
        if (job._child) this._killTree(job._child, 'SIGKILL');
      }, 1500);
      return true;
    }
    return false;
  }

  /** Signal an entire process group (CLI + its subprocesses), with a single-process fallback. */
  _killTree(child, signal) {
    if (!child || child.killed) return;
    try {
      // Negative PID targets the whole process group (requires detached spawn).
      process.kill(-child.pid, signal);
    } catch {
      try { child.kill(signal); } catch { /* already gone */ }
    }
  }

  /** Attach a Verifier instance after construction (avoids circular dependency). */
  setVerifier(verifier) {
    this._verifier = verifier;
    verifier.jobs = this;
  }

  /** Public snapshot (without internal fields). */
  snapshot(id) {
    const job = this.jobs.get(id);
    if (!job) return null;
    return {
      id: job.id,
      kind: job.kind,
      taskId: job.taskId,
      agent: job.agent,
      toolId: job.toolId,
      round: job.round,
      parentJobId: job.parentJobId,
      rerunJobId: job.rerunJobId,
      status: job.status,
      exitCode: job.exitCode,
      error: job.error,
      artifacts: job.artifacts,
      verifyResult: job.verifyResult,
      createdAt: job.createdAt,
      startedAt: job.startedAt,
      endedAt: job.endedAt,
      log: job.log,
    };
  }
}

module.exports = { JobManager, resolveCopilotBin, COPILOT_BIN };
