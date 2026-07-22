---
title: "Project Cirrus — Usability Test Plan (Inline Azure CLI Intelligence Layer)"
phase: test
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Tester Agent"
related:
  - "prototypes/README.md"
  - "prototypes/demos/index.html"
  - "designs/component-specs.md"
  - "designs/wireframe-spec.md"
  - "strategy/requirements-prd.md"
  - "strategy/personas.md"
  - "tests/tenets-traps-evaluation.md"
  - "tests/accessibility-audit.md"
---

# Project Cirrus — Usability Test Plan

A moderated, task-based usability study for the **inline, non-modal Azure CLI intelligence
layer** — the surface set demonstrated in `prototypes/demos/` (States A ghost-text,
B parameter palette, C resource lookup, D hint line, E non-`az` passthrough, F
degraded/plain + CI no-op). The plan validates the hard product bets that sank `az interactive`
and AI Shell: **no mode to enter/exit (NG1)**, **never trap the user (NG2)**, **full
interoperability with non-`az` tools (FR-5)**, and **expert-grade, non-stigmatised
discoverability (FR-4 / NG5)**.

Every objective, scenario, and metric traces back to a PRD requirement and a persona
(Maya · multi-cloud DevOps; David · Azure-primary IDE developer; Priya · AI-terminal power
user).

## Overview

- **Method:** Moderated 1:1, think-aloud, remote or in-person. 60 minutes per session.
- **Fidelity note (critical caveat):** The runnable demos are **vanilla HTML/CSS/JS mocks**
  driving canned predictions, parameter lists, and resource results; latency (the 500 ms
  lookup, debounce) is **simulated**. Therefore this study measures **comprehension, flow,
  discoverability, trust, and non-trapping behaviour** — NOT real performance. FR-7 (p95 ≤ 100 ms
  inline) and NFR-1 (≤ 500 ms lookup) must be validated separately against a live subscription
  and are explicitly out of scope here (see Next Steps).
- **Environments to simulate in-session:** rich terminal (default), constrained TTY (State F-1),
  and CI/no-TTY (State F-2), plus the three themes (dark / light / high-contrast) and the
  reduce-motion toggle so we observe real-world surface variety (NFR-3, NFR-2).
- **Participants:** 12–15 total, recruited to the three personas (below). Screen for
  **experienced/daily Azure CLI users** as the majority — the anti-stigma metric (T4) requires
  that expert adoption ≥ novice adoption, so experts must be over-represented, not excluded.

### Participant matrix

| Persona | n | Screener signal | Primary environment to test |
|---------|---|-----------------|-----------------------------|
| Maya — Multi-cloud DevOps | 5 | Uses ≥ 2 clouds; scripts in tmux/CI; composes pipes | Local terminal + tmux + CI (F-2) |
| David — Azure-primary IDE dev | 5 | Azure primary; works in IDE integrated terminal + Cloud Shell | IDE-style terminal (rich) |
| Priya — AI-terminal power user | 3–5 | Drives Azure through Copilot CLI / Claude Code | AI-terminal / degraded (E + F) |

## Objectives

1. **O1 — No-mode comprehension (NG1, G1).** Do users understand that suggestions are inline
   and that there is nothing to "enter" or "exit"? Do they ever look for, or ask about, a mode?
2. **O2 — Non-trapping & interoperability (NG2, FR-5, FR-7).** Can users always get back to
   plain typing (single `Esc`), and do non-`az` commands run untouched with zero extra steps?
   This is **Maya's gate** and the single most important pass/fail bet.
3. **O3 — Authoring success (FR-1/FR-2/FR-3).** Can users author an unfamiliar `az` command —
   picking a valid `--sku` enum and completing a real resource group — faster and with fewer
   invalid-parameter errors than unaided?
4. **O4 — Resilience & trust (FR-3, NFR-1).** When a lookup times out / is unauthenticated /
   returns empty, do users understand they can type free text, and do they trust the
   cached-vs-live freshness signalling?
5. **O5 — Expert-framed discoverability (FR-4, NG5, T4).** Do experienced users read the hint
   line as useful and neutral — never as a "beginner"/"training-wheels" aid they'd disable out
   of stigma?
6. **O6 — Graceful degradation (FR-6).** In a constrained TTY (F-1) and CI (F-2), do users get
   correct, non-breaking behaviour and understand why the UI is plainer?

## Task Scenarios

Each task states the persona lens, the demo(s) exercised, the setup, the success definition,
and what to observe. Scenarios are ordered to avoid priming (interoperability before the user
is "trained" to expect suggestions).

### Task 1 — Prove non-trapping mid-session (Maya) · O2
- **Demo:** `passthrough.html` (E), then `parameter-palette.html` (B).
- **Setup:** "You're mid-debug in one tmux pane. You just ran an `az` command and a palette is
  showing. Now you need to run `kubectl get pods -n staging | grep Running`."
- **Task:** Dismiss whatever Cirrus is showing and run the `kubectl` line; then pipe `az`
  output into `jq`.
- **Success:** User reaches a clean command line with **one** `Esc` (or simply by typing the
  non-`az` token), runs the non-`az` command with **no prefix/wrapper/exit step**, and observes
  every surface suppress the instant token-0 ≠ `az` (and past the pipe).
- **Observe:** Any hunt for an "exit" affordance; any hesitation that suggests they feel
  trapped; whether they trust that `Enter`/`Ctrl+C` are untouched. **Fail trigger:** user
  presses `Esc` more than once, asks "how do I get out," or expects a mode.

### Task 2 — Author an unfamiliar command with an enum + resource lookup (David) · O3
- **Demo:** `ghost-text.html` (A) → `parameter-palette.html` (B) → `resource-lookup.html` (C).
- **Setup:** "In your IDE terminal, create an Azure Service Bus namespace. You're unsure of the
  valid `--sku` values and the exact name of an existing resource group."
- **Task:** Compose `az servicebus namespace create`, accept a ghost-text continuation, pick a
  valid `--sku` from the palette, and complete `--resource-group` from a live lookup.
- **Success:** Command authored with a **valid** SKU and a **real** RG name, using `Tab` to
  accept and `↑↓` to select, with no invalid value chosen.
- **Observe:** Does the user notice the required-first ordering and the `*`/"required" signal?
  Do they understand `<enum>`/`<lookup>` type hints? Time-to-author and number of corrections
  (proxy for failed-run reduction, not real latency).

### Task 3 — Recover from a failed/unauthenticated lookup (Maya/David) · O4
- **Demo:** `resource-lookup.html` (C) — use the **Timeout**, **Unauthenticated**, and **Empty**
  buttons.
- **Setup:** "Your subscription lookup is slow / you're not signed in / the group doesn't exist
  yet."
- **Task:** For each state, complete the `--resource-group` value anyway.
- **Success:** User recognises they can **type any value (free text)** and does so without
  waiting, retrying auth, or abandoning; correctly reads "cached" vs "live" freshness.
- **Observe:** Do the muted fallback lines communicate clearly? Does anyone wait, expecting a
  blocking spinner? Does cached-vs-live freshness affect their trust/choice?

### Task 4 — Judge the hint line as an expert (David/Maya) · O5
- **Demo:** `hint-line.html` (D) — cycle through the three copy variants.
- **Setup:** "You're an experienced Azure user. A one-line hint appears under your command."
- **Task:** React aloud; decide whether to act on it (`Ctrl+Space`), dismiss it, or disable
  hints entirely.
- **Success:** User describes the copy as factual/expert-appropriate and does **not** read it as
  "beginner mode"; can find both "hide" and the persistent "Don't show hints" control.
- **Observe:** Any stigma language in their reaction ("this is for newbies"); whether they'd
  keep hints on. **Fail trigger:** an expert disables hints *because of framing*, not utility.

### Task 5 — Work in a degraded CI-like environment (Maya/Priya) · O6
- **Demo:** `degraded-plain.html` (F) — toggle **plain (F-1)** and **no-op (F-2)**; and
  `passthrough.html` for the AI-terminal read.
- **Setup:** "Same command, but now you're on a constrained remote shell (F-1), then in a CI job
  (F-2)."
- **Task:** Read the `--sku` guidance in F-1 and type a value; confirm what Cirrus does in CI.
- **Success:** User understands F-1 is read-only advisory (no selection model, nothing to trap
  them) and expects **no output/side effects** in CI (F-2). Priya confirms she would not want a
  rival AI overlay (NG2/AC-6.3).
- **Observe:** Does anyone try to arrow-select in F-1 and get confused? Does the plain line read
  clearly with no color reliance?

### Task 6 (optional stretch) — Theme & motion sensitivity (all) · NFR-2
- **Demo:** any state; switch dark → light → high-contrast and toggle reduce-motion.
- **Task:** Re-read the active-row and freshness badges in each theme.
- **Success:** User can read the selected row and distinguish required/valid/deprecated and
  cached/live in **every** theme. **Note for moderator:** the accessibility audit found the
  **selected row's secondary text/badges drop below 4.5:1 in light and high-contrast** — watch
  specifically for users struggling to read the highlighted row (corroborates A11Y-1/A11Y-2).

## Moderator Script (abridged)

1. **Intro (5 min).** Purpose, think-aloud, "there are no wrong answers; we're testing the
   design, not you." Confirm consent/recording. Do **not** explain that there's "no mode" —
   that's what O1 measures.
2. **Warm-up (3 min).** "Tell me about the terminals and clouds you use in a normal day."
   (Confirms persona; primes think-aloud.)
3. **Tasks 1–5 (40 min).** Present each scenario verbatim; stay silent during attempts. Only
   prompt with neutral probes: *"What do you expect to happen?" "What would you do next?"
   "What does that line mean to you?"* Never say "mode," "accept," or "dismiss" first — note
   the user's own vocabulary.
4. **Post-task probes.** After Task 1: *"How would you get back to a normal prompt?"* After
   Task 4: *"Who is this hint for?"* After Task 5: *"What did Cirrus do in the CI job?"*
5. **Debrief (7 min).** SEQ (Single Ease Question, 1–7) per task; then: *"Was there ever a
   point you felt stuck or trapped?" "Did this feel like a separate program or part of your
   normal shell?" "Would you leave this on every day?"*
6. **Wrap (5 min).** Thanks; incentive.

## Success Metrics (quantifiable, tied to the PRD)

| # | Metric | Instrument | Target | Traces to |
|---|--------|-----------|--------|-----------|
| M1 | **Non-trapping success** — return to plain typing in ≤ 1 `Esc`; non-`az` runs with 0 extra steps | Task 1 observation | **100%** of participants | NG2, FR-5, AC-5.1 |
| M2 | **No-mode mental model** — participant never asks to enter/exit a mode; describes it as "part of my shell" | Task 1 probe + debrief coding | ≥ **90%** | NG1, G1 |
| M3 | **Authoring task success** — valid SKU + real RG chosen, no invalid value | Task 2 completion | ≥ **90%** | FR-1/2/3, AC-2.2 |
| M4 | **Invalid-value error rate** — # invalid params/values selected per authoring task | Task 2 error count | **0** invalid (enum), decisively < unaided baseline | FR-2, "failed-run reduction" metric |
| M5 | **Time-to-author (comprehension proxy, NOT latency)** — time to complete Task 2 | Screen timing | Trend faster across trials; report median | FR-1 value (caveat: mocked latency) |
| M6 | **Fallback recovery** — completes value via free text on timeout/unauth/empty without waiting | Task 3 observation | **100%** recover; 0 "stuck waiting" | FR-3, AC-3.3, NFR-1 |
| M7 | **Freshness comprehension** — correctly explains cached vs live | Task 3 probe | ≥ **85%** correct | State C spec, "never color-alone" |
| M8 | **Anti-stigma read** — experts rate hint copy neutral/expert-appropriate (not "beginner") | Task 4 Likert + coding | ≥ **90%** neutral; **0** disable-due-to-framing | FR-4, NG5, T4 |
| M9 | **Degradation comprehension** — correctly predicts F-1 (advisory) & F-2 (no-op) behaviour | Task 5 probe | ≥ **85%** | FR-6, AC-6.2/6.3 |
| M10 | **Perceived ease** — SEQ per task | Debrief | Median ≥ **6/7** per task | G5, retention proxy |
| M11 | **Retention proxy** — "would you leave this on every day?" (yes/conditional/no) | Debrief | ≥ **75%** unconditional yes (leading indicator for >25% retention target) | G6, primary success metric |
| M12 | **Readability across themes** — reads selected row + badges in all 3 themes | Task 6 | 100% — **flagged at risk** by a11y audit (see A11Y-1/2) | NFR-2 |

## Observation Framework

Capture per task, in a shared grid, one row per participant:

- **Outcome:** success / success-with-difficulty / fail (+ the fail trigger if any).
- **Trap signals (weighted heaviest):** extra `Esc` presses, verbalised "how do I get out," any
  attempt to run a non-`az` command that stalls, any expectation of a mode.
- **Discoverability signals:** did they find required-first ordering, type hints, `Ctrl+Space`,
  the freshness badge, the "Don't show hints" control — unaided vs prompted.
- **Trust/comprehension:** correct reading of cached/live, timeout/unauth/empty, F-1 vs F-2.
- **Stigma signals:** any "beginner/newbie/training-wheels" language (verbatim quotes).
- **Vocabulary:** the user's own words for the surfaces (feeds copy decisions for the Designer).
- **Severity coding for issues found:** Critical (blocks a PRD gate: mode/trap/interop failure) /
  High (task failure or invalid value) / Medium (confusion, recovered) / Low (cosmetic/preference).

**Analysis:** After all sessions, synthesise into a findings table (issue · frequency ·
severity · affected persona · demo/state · recommended owner — Designer or Prototyper). Any
Critical on M1/M2/M8 is a **release-blocker** because it re-creates the exact failure modes of
`az interactive` / AI Shell.

## Next Steps

- Recruit to the participant matrix, prioritising experienced/daily users (anti-stigma metric).
- Run a 2-participant pilot to validate task wording (especially that we never leak "mode").
- **Out of scope here — schedule separately:** live-subscription performance validation for
  FR-7 (p95 ≤ 100 ms inline) and NFR-1 (≤ 500 ms lookup + graceful fallback); the mock cannot
  measure these.
- Pair findings with the accessibility audit (`tests/accessibility-audit.md`) — Task 6 is
  expected to corroborate the selected-row contrast defect (A11Y-1/A11Y-2).
- Feed synthesised issues to the Design Lead for routing to Designer (copy, contrast tokens) and
  Prototyper (ARIA name, selected-row recolour) before Handoff.
