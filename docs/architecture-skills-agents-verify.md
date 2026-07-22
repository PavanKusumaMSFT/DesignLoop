---
title: "DesignLoop Architecture — Skills, Agents, Stages, Verification & Hooks"
phase: deliver
status: approved
created: 2026-07-21
updated: 2026-07-21
author: ""
related: [".github/skills/", ".github/agents/", "bridge/server.js", "bridge/jobs.js", "bridge/verifier.js", ".github/hooks/"]
---

# How DesignLoop Works — Skills, Agents, Stages, Verification, Hooks

This document explains how the DesignLoop system is wired end to end: how a design
capability is defined, how the bridge runs it, how output is verified, and how a
full stage run flows. All references point at real files in this repo.

---

## 1. The building blocks (per capability)

Every design capability (competitive-analysis, personas, wireframe-spec, …) is
defined in **three coordinated places**.

### 1a. `.github/skills/<id>/` — the skill definition ("what to do")

| File | Role |
|------|------|
| `SKILL.md` | The procedure. YAML frontmatter (`name`, `description`, `argument-hint`) + a step-by-step playbook and the exact output paths. |
| `tool.json` | Machine-readable manifest the bridge reads to build the tool registry. |
| `VERIFY.md` | The quality bar: weighted scoring `dimensions` + an `accept_threshold`. |
| `assets/` | Optional markdown templates the skill fills in (e.g. `competitor-matrix.md`). |

**Example `tool.json`** (`.github/skills/competitive-analysis/tool.json`):

```json
{
  "id": "competitive-analysis",
  "name": "Competitive Analysis",
  "description": "Analyse competing products across UX, features, pricing, and positioning...",
  "stages": ["discover"],
  "agent": "competitive-analysis",
  "inputs": [
    { "type": "task-description", "required": true },
    { "type": "artifact", "from": "research-brief", "required": false }
  ],
  "outputs": [
    "research/competitive/{category}-matrix.md",
    "research/competitive/{category}-brief.md"
  ],
  "dependencies": [],
  "required": false
}
```

- `stages` — which lifecycle stage(s) this tool belongs to.
- `agent` — which agent (`.github/agents/<agent>.agent.md`) executes it.
- `inputs` / `outputs` / `dependencies` — what it consumes and produces.

**Example `VERIFY.md`** (`.github/skills/competitive-analysis/VERIFY.md`):

```yaml
dimensions:
  specificity:  { weight: 40, threshold: 70, failure_instruction: "Every competitor... must be specific..." }
  evidence:     { weight: 35, threshold: 68, failure_instruction: "Every claim must cite a source..." }
  coverage:     { weight: 25, threshold: 72, failure_instruction: "Must include 4-8 competitors..." }
accept_threshold: 78
```

### 1b. `.github/agents/<id>.agent.md` — the agent ("who does it")

Frontmatter declares the display name and tool grants; the body is a tight
executor prompt.

```markdown
---
name: "Competitive Analysis"
description: "Runs a structured competitive analysis for a product category..."
tools: [read, write, web, search, execute]
---

You are the **Competitive Analysis** sub-agent...
1. Read .github/skills/competitive-analysis/SKILL.md for the procedure
2. Read .github/skills/competitive-analysis/VERIFY.md to understand the quality bar
3. Execute the procedure precisely
4. Self-check against the VERIFY.md dimensions
5. Write outputs to the paths defined in tool.json
```

The agent is a pure executor — it reads its own skill, self-checks against its own
verify criteria, and writes to the manifest paths.

### 1c. `.github/skills/<stage>/STAGE.md` — the stage coordinator playbook

Stage folders (`discover`, `define`, `ideate`, `design`, `prototype`, `test`,
`deliver`) contain **only** a `STAGE.md` (no `tool.json`, so the registry skips
them). It declares the coordinator agent, tool dependency table, selection logic,
execution order, and completion criteria.

```markdown
---
stage: discover
label: Discover
coordinator-agent: researcher
---

| Tool ID | Required | Depends On | Can Parallel |
|---|---|---|---|
| research-brief        | yes | —                                    | no (runs first) |
| competitive-analysis  | no  | research-brief                       | yes |
| user-interviews       | no  | research-brief                       | yes |
| findings-synthesis    | yes | competitive-analysis, user-interviews| no (runs last) |
```

Selection logic example: "If `research/competitive/` has files < 30 days old →
skip `competitive-analysis`."

---

## 2. The runtime (bridge, port 8099)

| Endpoint / file | What it does |
|-----------------|--------------|
| `GET /api/tools` (`server.js:688`) | Scans `.github/skills/*/tool.json` → the dynamic tool registry the Run popover renders. Stage folders (only `STAGE.md`) are skipped. |
| `POST /api/run-stage` (`server.js:898`) | Maps `stageId` → coordinator agent (`discover→researcher`, `define→strategist`, …). Builds a coordinator prompt telling it to read `STAGE.md` and orchestrate its tools. Queues a job with `_skipVerify: true` (the coordinator's individual tools verify themselves). Returns `taskId`. |
| `POST /api/run` (`server.js:992`) | Runs a single tool with its `agent`. Returns `taskId`. |
| `bridge/jobs.js` | `JobManager`. Spawns the CLI, streams logs over SSE, snapshots git + files before/after to detect produced artifacts. |
| `bridge/verifier.js` | The quality gate (section 4). |

**How a job spawns the CLI** (`jobs.js:220`):

```js
const finalArgs = ['-p', job.promptText, '--allow-all-tools'];
if (job.agent) finalArgs.push(`--agent=${job.agent}`);
child = spawn(COPILOT_BIN, finalArgs, { cwd: root, detached: true, ... });
```

- **Concurrency = 1** (FIFO) — jobs run strictly one at a time. This ordering is
  load-bearing for the sequential runner.
- `detached: true` gives each job its own process group so cancel kills the whole
  subtree.

---

## 3. The verify loop (`bridge/verifier.js`)

Runs after any **tool** job succeeds (when `_skipVerify` is false and a `toolId` is
present). Verify jobs and stage/plain runs skip it.

```
Tool job done
   → verifier.check(job)
        reads VERIFY.md + produced markdown artifacts
        spawns a "verify" job that scores each dimension 0-100,
        computes the weighted composite, and emits strict JSON
        between ###VERIFY_RESULT### ... ###END_VERIFY_RESULT###
   → decision:
        ACCEPT (composite ≥ accept_threshold)  → status = done
        RERUN  (round 1 only)                  → round-2 job with
                                                 failure_instructions injected
        FAIL   (round 2 also below bar)        → status = flagged (user review)
        unreadable verifier output             → auto-accept (never blocks user)
```

Key behaviours:
- **One re-run maximum.** Round 1 fail → round 2 with a rebuilt prompt containing
  each failed dimension's `failure_instruction` + specific observations. Round 2
  fail → `flagged`.
- **Fail-open.** If the verifier's JSON can't be parsed, the artifact is accepted
  as-is so the user is never blocked.
- SSE statuses surfaced to the UI: `running` → `verifying` → (`rerunning`) →
  `done` | `flagged`.

---

## 4. Hooks (`.github/hooks/`)

`PreToolUse` command hooks enforce conventions independently of the agent's own
behaviour. Each hook is a JSON config pointing at a shell script.

| Hook | Script | Enforces |
|------|--------|----------|
| `output-organizer` | `scripts/check-output-path.sh` | Asks for confirmation if a file is written outside the phase directories (`research/`, `strategy/`, `ideation/`, `designs/`, `prototypes/`, `tests/`, `handoff/`). |
| `design-token-validator` | `scripts/validate-tokens.sh` | Token naming / no hardcoded values. |
| `accessibility-checker` | `scripts/check-a11y.sh` | WCAG-oriented checks. |

---

## 5. End-to-end flow: a full Discover stage run

Concrete walk-through of clicking **Run → Run one stage → Discover** with the task
"A budgeting app for freelancers":

1. **UI → bridge.** The Run popover posts to `POST /api/run-stage` with
   `{ stageId: "discover", prompt, taskId, sourceArtifacts }`.

2. **Bridge resolves the coordinator.** `stageId "discover"` → agent `researcher`.
   It computes the `taskId` (e.g. `budgeting-app-for-freelancers`), creates
   `tasks/<taskId>/`, and builds a coordinator prompt that says: *fetch any URLs
   first, read `.github/skills/discover/STAGE.md`, apply selection logic, run the
   tools in order.* The job is queued with `_skipVerify: true` and `taskId` is
   returned in the 202 response.

3. **CLI spawns.** `jobs.js` runs `copilot -p <prompt> --allow-all-tools
   --agent=researcher`. The Researcher coordinator now drives the stage.

4. **Coordinator reads `STAGE.md`** and applies the dependency table:
   - Runs `research-brief` **first** (required, no deps) → writes
     `research/brief.md`.
   - Runs `competitive-analysis` and `user-interviews` (both depend on the brief,
     `Can Parallel: yes`). Each is executed by **its own agent**, which reads its
     `SKILL.md`, writes artifacts (`research/competitive/…`, `research/interviews/…`).
   - Runs `findings-synthesis` **last** (depends on the two above) → writes
     `research/findings-synthesis.md`.
   - Selection logic skips any tool whose recent artifacts already exist.

5. **Hooks gate every write.** As each agent writes a file, the `output-organizer`
   PreToolUse hook confirms it lands under `research/`.

6. **Each tool self-verifies.** Because the tools are invoked as their own jobs
   with a `toolId`, the verifier scores each artifact against that tool's
   `VERIFY.md`: accept, re-run once, or flag.

7. **Stage completes.** When all required tools have passed, the coordinator
   reports a summary. Artifacts now live under `tasks/<taskId>/research/`, ready
   for the Define stage (Strategist), which consumes `brief.md`,
   `competitive/{category}-brief.md`, and `findings-synthesis.md`.

### Sequential multi-run (this session's feature)

The Run popover lets you select **multiple** stages or tools. The client-side
runner (`assets/app.js` → `runSequence`) chains them **one at a time** — it awaits
each job's SSE `done` before starting the next, threading the resolved `taskId`
forward so every step writes into the **same** `tasks/<id>/`. Because bridge
concurrency is 1, ordering is guaranteed. Failure stops the chain (remaining steps
marked *skipped*) and offers **Retry step** / **Skip & continue**.

---

## 6. Quick reference — where things live

```
.github/
  agents/<id>.agent.md          # executor prompt + tool grants
  skills/
    <tool-id>/
      SKILL.md                  # procedure
      tool.json                 # manifest (registry source)
      VERIFY.md                 # quality gate criteria
      assets/                   # templates
    <stage>/STAGE.md            # coordinator playbook (discover, define, ...)
  hooks/                        # PreToolUse gates (path, tokens, a11y)
  instructions/                 # path-scoped authoring rules
bridge/
  server.js                     # routes: /api/tools, /api/run-stage, /api/run
  jobs.js                       # JobManager (spawn CLI, SSE, concurrency=1)
  verifier.js                   # VERIFY.md scoring + re-run/flag loop
assets/app.js                   # frontend incl. runSequence() sequential runner
tasks/<task-id>/                # per-task artifacts, organised by phase dir
```
