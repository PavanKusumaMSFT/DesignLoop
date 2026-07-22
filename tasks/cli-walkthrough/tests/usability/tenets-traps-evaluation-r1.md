---
title: "CLI Walkthrough — Tenets & Traps Evaluation (Round 1)"
phase: test
status: draft
created: 2026-07-12
updated: 2026-07-12
author: "Tester Agent"
related: ["../../../figma-pc5xfta4qujyyeimiflxfi-project-cirrus/research/web/project-cirrus-prototype.md"]
---

# CLI Walkthrough — Tenets & Traps Evaluation (Round 1)

## Executive Summary

**Evaluated:** The **CLI Walkthrough** — the guided end-to-end demonstration of Project
Cirrus's AI-assisted Azure CLI (`az`) experience, entered from the Figma prototype at
starting node `937:133` (page `813:1500`, node `937-171`). The walkthrough carries a user
from an idle terminal prompt, through running a real `az vm create` command, into a failure,
and out via an **AI "root cause analysis"** step that lists the concrete issues and proposes
copy-and-run corrective commands.

**Method:** Heuristic evaluation against Microsoft's **UI Tenets & Traps** (9 Tenets,
26 Traps). I walked the walkthrough's four primary user tasks — run a command, understand
feedback, obtain AI help, act on the fix — across the happy path, the error path, a
keyboard-only path, and a returning-user path. Findings map to the canonical taxonomy in
[`reference.md`](../../../../.github/skills/tenets-traps-evaluation/reference.md).

**Headline outcome:** The walkthrough tells a compelling, legible story: the terminal is
highly readable, the AI diagnosis is specific and actionable, and the corrective commands are
ready to run. The weaknesses are **discoverability and control**: the walkthrough never shows
*how* a real user triggers, cancels, or acts on the AI step, offers **no undo or confirmation**
before commands that carry credentials and mutate cloud resources, and leaks a real-looking
**subscription ID** in plain view. The largest risks sit in **Understandable**, **Forgiving**,
**Protective**, and **Responsive**.

**Findings by severity:** Critical **0** · High **4** · Medium **5** · Low **3** (12 total).

> **Limitation — read this first.** The live prototype is login- and password-gated; the
> exact `937:133` walkthrough entry could not be independently re-captured for this round
> (the bridge redirected to Figma's login wall). This evaluation is therefore grounded in the
> approved frame-by-frame capture of the same Figma file
> (`tasks/figma-pc5xfta4qujyyeimiflxfi-project-cirrus/research/web/`, nodes in the `813:15xx`
> range) plus the documented flow and measured styling. A static click-through cannot reveal
> real timing, focus behaviour, or whether the suggested commands are selectable/executable;
> findings resting on that gap are flagged **[assumption]** and convert to test tasks rather
> than confirmed defects.

## Scope & Method

**Target artifacts**
- Figma prototype *Project Cirrus* — CLI Walkthrough entry, starting node `937:133`
  (`https://www.figma.com/proto/pc5Xfta4qujYYEImIfLXFI/Project-Cirrus`).
- Approved source of truth: `../../../figma-pc5xfta4qujyyeimiflxfi-project-cirrus/research/web/project-cirrus-prototype.md`.
- Captured terminal frames `frame-00.png … frame-07.png` (idle → command → warning →
  error → AI analysing → AI help → settled).

**Target user & primary tasks.** The persona is a developer/operator (MonaKane) working in a
`zsh` terminal who is new to the AI-assisted `az` experience and is being *walked through* what
it does. The walkthrough must let this user:

- **T1 — Run a command.** Enter `az vm create …` and perceive that it is executing.
- **T2 — Understand feedback.** Distinguish a non-blocking *warning* from a blocking *error*
  and grasp what failed and why.
- **T3 — Get AI help.** Reach the AI root-cause analysis and read a diagnosis they trust.
- **T4 — Act on the fix.** Take the two proposed `Next action` commands and safely apply them
  to recover (create the missing resource group, then retry the VM create).

**Approach.** For each task I walked the realistic paths a user would take (happy, error,
keyboard-only, returning), noting what must be *perceived, understood, done, and recovered from*
at each step, then logged every degraded Tenet and all applicable Traps with a severity and
concrete evidence.

**Limitations.** Static frames only; no timing, no focus/selection state, no confirmation of
interactivity. Figma chrome (cookie banner, hardware-acceleration toast) is excluded. The
walkthrough's own framing (captions, "next" affordances, progress indicator) was not visible in
the captured frames and is treated as **not present** unless evidence shows otherwise — flagged
where it drives a finding.

## Scorecard

| Area (walkthrough task) | Strengths | Findings | Worst severity |
|---|---|---|---|
| **T1 — Run a command** | Command echoes clearly; monospace legibility excellent | F07 | Medium |
| **T2 — Understand feedback** | Warning/error colour-coded; error block well structured | F01, F04, F10 | High |
| **T3 — Get AI help** | Diagnosis specific (6 issues), high trust; "AI may be incorrect" disclaimer present | F02, F05, F08, F12 | High |
| **T4 — Act on the fix** | Corrective commands concrete and ordered | F03, F06, F09, F11 | High |
| **Cross-cutting (walkthrough shell)** | Consistent, attractive terminal aesthetic | F05, F08 | High |

**Tenet health (this round):**

| Tenet | State | Notes |
|---|---|---|
| 1 Understandable | ⚠️ At risk | Trigger/interaction cues invisible (F02, F03) |
| 2 Comfortable | ✅ Strong | Excellent legibility; one dim-text edge (F10) |
| 3 Responsive | ⚠️ At risk | No cancel; wait feedback minimal (F04, F08) |
| 4 Efficient | ⚠️ Minor | Long retry command hard to scan (F11) |
| 5 Forgiving | ❌ Weak | No undo/confirm before mutating commands (F06) |
| 6 Discreet | ⚠️ At risk | Subscription ID exposed on screen (F09) |
| 7 Protective | ⚠️ At risk | Credential placeholder + destructive intent (F06, F09) |
| 8 Habituating | ✅ Mostly | Consistent prompt/home; minor (F07) |
| 9 Beautiful | ✅ Strong | Clean, coherent terminal aesthetic |

## Top Issues

1. **F06 — No undo or confirmation before mutating, credential-bearing commands (High).**
   The walkthrough's payoff is running `az group create` and `az vm create …`, which mutate
   cloud resources and embed `--admin-password <your-admin-password>`. Nothing shows a
   confirmation, dry-run, or undo path. This is the single riskiest gap.
2. **F02 — How the AI step is *triggered* is invisible (High) [assumption].** The walkthrough
   shows AI analysis appearing but never the affordance that starts it. New users cannot learn
   to reproduce the feature — the whole point of a walkthrough.
3. **F03 — Whether the suggested commands are copyable/executable is never shown (High)
   [assumption].** The core deliverable is two commands; if the user cannot tell they can
   select, copy, or press to run them, the walkthrough teaches a dead end.
4. **F01 — Warning vs. error carry the same weight and both use "future"/failure language
   (High).** The `--size` deprecation warning and the `ResourceGroupNotFound` error sit
   adjacently with only a colour difference; users may conflate a benign warning with the real
   blocker.
5. **F09 — A real-looking subscription ID is displayed in plain text (High).** Exposed in both
   the AI issue list and the corrective commands; in any shared/streamed walkthrough this is an
   oversharing and data-exposure risk.

## All Findings

| ID | Area / Component | Finding | Tenet (linked) | Trap(s) | Severity | Evidence / Reasoning |
|----|------------------|---------|----------------|---------|----------|----------------------|
| F01 | T2 — Feedback | Deprecation **warning** and blocking **error** are stacked with only colour to distinguish them; both read as "something is wrong," so users may act on the wrong signal or miss the real blocker. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.6 Poor Grouping; 1.4 Uncomprehended Element | High | frame-02/03: yellow `--size` warning line sits directly above the red `ResourceGroupNotFound` block with no separator, label, or severity glyph. |
| F02 | T3 — AI trigger | The affordance that *starts* the AI root-cause analysis is never shown; frame-04 implies it runs automatically but the walkthrough gives no cue a user could learn or repeat. **[assumption]** | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.1 Invisible Element; 8.2 Variable Outcome | High | frame-03→04: error is followed directly by `Analyzing error root cause using AI ...` with no visible prompt, key hint, or command. |
| F03 | T4 — Act on fix | No visible cue tells the user the two `Next action` commands are selectable, copyable, or runnable in place; they may be read as static text. **[assumption]** | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.1 Invisible Element; 1.4 Uncomprehended Element | High | frame-05: commands rendered as plain terminal text with no button, highlight, "press 1", or copy glyph. |
| F04 | T2 — Waiting | During execution and AI analysis the only progress feedback is a blinking cursor / `...`; there is no spinner, elapsed time, or way to know how long to wait. | [Responsive](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Responsive.aspx?web=1) | 3.1 Slow or No Response; 1.9 Feedback Failure | High | frame-02 (blinking cursor after warning) and frame-04 (`Analyzing … ...`) are the sole "working" indicators. |
| F05 | Cross-cutting | The AI output looks identical to normal terminal text — no label, container, or visual boundary marks where AI-generated content begins and ends, weakening trust calibration. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.6 Poor Grouping; 1.2 Effectively Invisible Element | Medium | frame-05: only the small `AI help` / `---------` header and a trailing `AI-generated content may be incorrect` line bound a large block of AI output. |
| F06 | T4 — Act on fix | The proposed recovery runs commands that create/modify Azure resources and embed `--admin-password <your-admin-password>`; no confirmation, dry-run, or undo is offered before mutating cloud state. | [Forgiving](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Forgiving.aspx?web=1) | 5.1 Irreversible Action; 2.2 Accidental Activation | High | frame-05 `Next action` 1–2: `az group create …` and a full `az vm create …` with credential placeholder, presented as the direct path forward. |
| F07 | T1 — Run a command | The idle prompt gives no hint that this terminal has an AI capability at all; a first-time walkthrough user has no entry cue before an error occurs. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.1 Invisible Element | Medium | frame-00: bare `MonaKane [ ~ ]$` prompt, no banner, tip, or `az ?` hint. |
| F08 | T3 — Get AI help | If AI analysis is slow, the user cannot cancel or skip it; the walkthrough shows no way to back out of the `Analyzing …` state. **[assumption]** | [Responsive](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Responsive.aspx?web=1) | 3.2 Captive Wait | Medium | frame-04: `Analyzing error root cause using AI ...` with no `Ctrl-C`/cancel affordance shown. |
| F09 | T4 / Cross-cutting | A real-looking **subscription ID** (`2dad32d6-…`) is printed in plain text in both the issue list and the corrective commands — sensitive in any shared, recorded, or streamed walkthrough. | [Discreet](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Discreet.aspx?web=1) | 6.1 Unwanted Disclosure | High | frame-05 issue 5 and `Next action` commands both contain `--subscription-id 2dad32d6-b188-49e6-9437-ca1d51cec4dd`. |
| F10 | T2 — Feedback | The dimmest secondary text sampled (`#797979` on black) is only ~4.82:1 — passes AA for the sampled size but is marginal and risks failing at smaller sizes or on lower-quality displays. | [Comfortable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Comfortable.aspx?web=1) | 2.1 Physical Challenge | Low | Measured styling table in source-of-truth: dimmest text `#797979` → 4.82:1 (marginal pass). |
| F11 | T4 — Act on fix | The retry `az vm create …` command is a single very long line with ~10 flags; it is hard to scan, verify, or edit before running, raising error risk. | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) | 4.3 Information Overload | Medium | frame-05 `Next action` 2 wraps across three visual lines of dense flags. |
| F12 | T3 — Get AI help | The AI restates issues the raw `az` error already implied (e.g. missing resource group) without visibly reconciling them, so the walkthrough doesn't teach *why* the AI adds value over reading the error. | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) | 4.2 System Amnesia | Low | frame-03 error already says `Resource group 'myRG' could not be found`; frame-05 issue 6 repeats "Missing resource: resource group `myRG`". |

## Quick Wins

Low-effort, high-value fixes drawn from the findings above:

- **F05** — Wrap AI output in a labelled, visually distinct block (e.g. a subtle border or
  `╭─ AI help ─╮` box) so its boundaries and provenance are unmistakable.
- **F01** — Insert a blank line and a severity glyph/label (`⚠ warning` / `✖ error`) between
  the deprecation warning and the failure so the blocker is unambiguous.
- **F09** — Mask the subscription ID in the walkthrough (`--subscription-id ****…c4dd`) or use
  an obviously fake placeholder GUID.
- **F07** — Add a one-line idle-prompt hint (e.g. `tip: when a command fails, press ? for AI
  help`) so the capability is discoverable before the first error.
- **F12** — Add a single framing caption ("The AI reconciles the error into ordered, runnable
  fixes") so the walkthrough states the value proposition explicitly.

## Reasoning & Decisions

- **Severity calibration.** No **Critical** was assigned: nothing in the captured walkthrough
  *loses* user work or hard-blocks completion of the demo itself. The four **High** findings all
  either break the walkthrough's teaching goal (F02, F03), risk real cloud/credential harm on
  the recommended action (F06), or misdirect the user's understanding of what failed (F01) /
  expose sensitive data (F09).
- **Root-cause vs. symptom traps.** F02 (invisible trigger) and F03 (unknown interactivity)
  share a root cause: the walkthrough renders a *native terminal* with no DOM affordances, so
  cues that would normally be buttons/hints are simply absent. I logged them separately because
  they degrade different tasks (T3 vs T4) and would be fixed by different additions (a trigger
  cue vs. a "these are runnable" cue), but noted the shared root here.
- **`[assumption]` handling.** F02, F03, and F08 rest on interaction behaviour a static
  click-through cannot confirm. Per the skill's guidance and the source-of-truth assumptions
  A1–A4, these are logged as findings *and* flagged as assumptions; they should be converted to
  tasks in a usability test plan rather than treated as settled defects.
- **F06 mapping (Forgiving over Protective).** The command *would* create real resources and
  embeds a credential placeholder. I mapped the primary tenet to **Forgiving / 5.1 Irreversible
  Action** because the core gap is the absence of undo/confirmation before a mutating action,
  and added **2.2 Accidental Activation** for the one-step-from-disaster risk. Protective/7.1 was
  considered but reserved: no evidence the walkthrough itself loses data.
- **F09 mapping (Discreet).** Placed under **Discreet / 6.1 Unwanted Disclosure** because the
  harm is contextual oversharing (a walkthrough is meant to be shown/recorded), with Protective
  as a secondary concern. Kept it **High**, not Critical, because it is a display/redaction fix.
- **Contrast (F10).** Measured values in the source of truth pass AA, so this is **Low** — a
  watch-item for smaller sizes, not a violation.
- **Strengths logged for balance.** Excellent monospace legibility (Comfortable), a specific and
  actionable AI diagnosis with an honest "may be incorrect" disclaimer (Understandable), an
  ordered recovery plan (Efficient), and a clean, consistent aesthetic (Beautiful) are genuine
  strengths and should be preserved through any fixes.

## Fix & Re-evaluate Loop

This is a human-in-the-loop cycle. **Please choose what to address next:**

- **(a) Fix all Quick Wins** — F05, F01, F09, F07, F12 (fast, mostly presentational).
- **(b) Fix Top Issues only** — F06, F02, F03, F01, F09.
- **(c) Pick specific finding IDs** — name them (e.g. "F06, F09").
- **(d) Defer** — accept current risk and revisit later.

For the `[assumption]` findings (F02, F03, F08), the recommended path is to fold them into a
usability test plan so the interaction model can be validated with users before redesign.

Once fixes are applied, I will generate `tenets-traps-evaluation-r2.md` with a **delta** section
marking each finding **Resolved / Partially resolved / Unchanged / Regressed**, plus any new
findings, and update the round tracker below.

### Round tracker

| Round | Date | Findings (C/H/M/L) | Resolved since last | Notes |
|-------|------|--------------------|--------------------|-------|
| r1 | 2026-07-12 | 0 / 4 / 5 / 3 (12) | — | Baseline. Evaluated from approved frame capture of the same Figma file; live `937:133` entry was login-gated. |

## Next Steps

1. Review this report and select a fix set (a/b/c/d above).
2. Convert F02, F03, F08 into usability-test tasks to validate the real interaction model.
3. Apply chosen fixes in the prototype/spec, then request Round 2 for a delta re-evaluation.
