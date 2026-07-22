---
name: tenets-traps-evaluation
description: "Run a heuristic usability evaluation using Microsoft's UI Tenets & Traps framework and produce an evaluation report with Top Issues, All Findings (each mapped to a Tenet and Trap), Quick Wins, and Reasoning. Supports a fix → re-evaluate loop across rounds. Use when evaluating designs, wireframes, prototypes, or live UI for usability quality, or when a user asks for a Tenets & Traps review."
argument-hint: "Target to evaluate (e.g., 'azure-deployment-agent prototypes' or a Figma/URL/component set)"
---

# UI Tenets & Traps Evaluation

A reusable usability-evaluation capability built on Microsoft's **UI Tenets & Traps** heuristic framework
(9 Tenets, 26 Traps). It produces a structured evaluation report and supports an iterative
**fix → re-evaluate** loop. Available inside the **Test** phase of any task and as a **standalone** tool in DesignLoop.

## When to Use
- Evaluating designs, wireframes, prototypes, or live UI for usability quality
- A user asks for a "Tenets & Traps review" or heuristic evaluation
- Validating a flow before development handoff
- Re-checking a target after fixes (subsequent evaluation rounds)

## Framework Reference

The canonical taxonomy lives at [reference.md](./reference.md) — 9 Tenets (each with its source page link)
and 26 Traps with descriptions, plus the severity scale. **Always** map findings to that file. Do not invent
tenets or traps; use the official codes (e.g., Trap `1.2 Effectively Invisible Element` under Tenet `Understandable`).

## Procedure

### 1. Define Scope
Gather from the user / task:
- What is being evaluated (components, screens, a flow, a URL, a Figma file).
- The most important user tasks for the target persona (see `strategy/personas.md` if present).
- Source artifacts: `designs/`, `prototypes/`, wireframes, and any live demo.

### 2. Walk the Tasks
For each important task, walk through the realistic paths a user would take to complete it
(happy path, error paths, keyboard-only, touch, returning user). Note what the user must perceive,
understand, do, and recover from at each step.

### 3. Log Findings
For every issue observed:
- Identify the **Trap(s)** from [reference.md](./reference.md). Log *all* applicable traps; identify the root-cause trap when issues are connected.
- Identify the degraded **Tenet** (and link to its page).
- Assign **severity** (Critical / High / Medium / Low) per the scale in the reference.
- Record concrete **evidence/reasoning** (where it was seen, why it's a problem).
Also log **strengths** — tenets the design upholds well — to keep the report balanced.

### 4. Produce the Evaluation Report
Write to `tasks/<task-id>/tests/usability/tenets-traps-evaluation-r<N>.md` (use `r1`, `r2`, … per round)
following the document conventions in `.github/instructions/design-docs.instructions.md`
(`phase: test`, `author: "Tester Agent"`). Include **all** of these sections, in order:

1. **Executive Summary** — what was evaluated, method, headline outcome, count of findings by severity.
2. **Scope & Method** — target artifacts, user tasks walked, evaluation approach, limitations.
3. **Scorecard** — per-area/component tally (e.g., strengths vs. findings, worst severity).
4. **Top Issues** — the highest-impact findings, ranked, with a one-line rationale each.
5. **All Findings** — a table with these columns:
   `ID | Area / Component | Finding | Tenet (linked) | Trap(s) | Severity | Evidence / Reasoning`
6. **Quick Wins** — low-effort, high-value fixes (subset of findings) the team can ship fast.
7. **Reasoning & Decisions** — why severities and tenet/trap mappings were chosen; ambiguous calls and how they were resolved; framework-interpretation notes.
8. **Fix & Re-evaluate Loop** — the round tracker (see below) and how the user chimes in.

Every finding in **Top Issues** and **Quick Wins** must reference a finding **ID** from the All Findings table.

### 5. Fix → Re-evaluate Loop
This is a human-in-the-loop cycle:
1. Present the report and ask the user which findings to address. Offer:
   - (a) Fix all **Quick Wins**, (b) Fix **Top Issues** only, (c) Pick specific finding **IDs**, (d) Defer.
2. Apply the chosen fixes to the relevant specs / prototypes.
3. Generate the next round report `tenets-traps-evaluation-r<N+1>.md` with a **delta** section:
   each prior finding marked **Resolved / Partially resolved / Unchanged / Regressed**, plus any **new** findings.
4. Repeat until the user is satisfied (no open Critical/High findings, or user accepts remaining risk).

Maintain a round tracker in every report header:

| Round | Date | Findings (C/H/M/L) | Resolved since last | Notes |
|-------|------|--------------------|--------------------|-------|
| r1 | YYYY-MM-DD | … | — | Baseline |

### 6. Register & Surface
- Add the report file to the task's **Test** phase so it appears in the DesignLoop viewer.
- The capability is also exposed as a **standalone** action on the DesignLoop Home ("Run a Tenets & Traps Evaluation")
  for users starting fresh — it composes a prompt targeting the **Tester** agent plus this skill.

## Severity Scale
Critical (blocks/loses data) · High (major friction, errors, abandonment) · Medium (completable with effort/confusion) · Low (minor/edge-case). Full definitions in [reference.md](./reference.md).
