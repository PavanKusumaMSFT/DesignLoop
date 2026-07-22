---
title: "Project Cirrus — Tenets & Traps Evaluation (Round 1)"
phase: test
status: draft
created: 2026-06-23
updated: 2026-06-23
author: "Tester Agent"
related: ["../../research/web/project-cirrus-prototype.md", "accessibility-audit.md", "ai-cli-error-handling-test-plan.md"]
---

# Project Cirrus — Tenets & Traps Evaluation (Round 1)

## Executive Summary

**Evaluated:** The Project Cirrus prototype — an AI-assisted error-recovery experience
for the Azure CLI (`az`), captured frame-by-frame from the password-protected Figma
prototype (node `813:1502`). The evaluated flow: a failed `az vm create` command →
automatic "Analyzing error root cause using AI…" → an **AI help** block listing 6 issues
and 2 corrective next-action commands.

**Method:** Heuristic evaluation against Microsoft's **UI Tenets & Traps** (9 Tenets,
26 Traps), walking the primary task on the happy path, the error path, and a keyboard-only
path. Findings are grounded in the 8 captured frames (`research/web/screens/`).

**Headline outcome:** The concept is strong and the AI output is genuinely actionable
(clear issue list + ready-to-run commands). However, the experience has **discoverability
and feedback gaps** that would cause real friction, plus a **safety concern**: the AI
proposes destructive/credential-bearing commands with only a passive disclaimer. No defects
that *lose* user data were found, but the largest issues sit in **Understandable**,
**Forgiving/Protective**, and **Responsive**.

**Findings by severity:** Critical **0** · High **3** · Medium **5** · Low **3** (11 total).

> Limitation: a static click-through cannot reveal real timing, focus behaviour, or whether
> the suggested commands are copyable/executable. Several findings rest on assumptions
> documented in the source file (A1–A4) and are flagged **[assumption]**; they convert to
> test tasks in the usability plan rather than being treated as confirmed defects.

## Scope & Method

- **Target artifacts:** `research/web/project-cirrus-prototype.md` and the 8 captured frames
  `frame-00.png … frame-07.png`.
- **Primary user task:** "My `az vm create` failed — understand why and recover to a working
  command without leaving the terminal."
- **Persona (inferred):** A developer/cloud engineer ("MonaKane") using Azure CLI in a zsh
  terminal; comfortable with the command line, time-pressured, not necessarily an `az` expert.
- **Paths walked:** happy path (read AI help → run suggested fix), error path (command fails),
  keyboard-only (terminal is keyboard-native), returning user (does the feature behave the
  same next time?).
- **Approach:** Map each observed issue to its root-cause Trap and the degraded Tenet; assign
  severity per the reference scale; record evidence by frame.
- **Limitations:** No live prototype, no real latency, no confirmation of copy/run affordances,
  no audio/screen-reader channel observable. Visual-contrast facts come from the accessibility
  audit (all terminal text passes AA).

## Scorecard

| Area | Strengths | Findings | Worst severity |
|---|---|---|---|
| Error → AI trigger (frames 03–04) | Auto-analysis removes a step | F1, F4, F8 | High |
| AI "Found 6 issues" list (frame 05) | Specific, mapped to fixes | F2, F6, F9 | Medium |
| "Next action" suggested commands (frame 05) | Copy-pasteable, complete | F3, F5, F7 | High |
| Trust & safety (frame 05) | Disclaimer present | F3, F10 | High |
| Visual / legibility | Monospace, AA contrast (see a11y) | F11 | Low |

## Top Issues

1. **F1 — No visible affordance that AI help exists or how to invoke/decline it.** The jump
   from error (03) to "Analyzing…" (04) appears automatic with no prompt, opt-out, or hint.
   *(High)*
2. **F3 — AI suggests a credential-bearing, resource-creating command behind only a passive
   "may be incorrect" disclaimer.** Running suggestion #2 creates billable Azure resources and
   embeds `--admin-password`; there is no confirmation, no "review before run," and no undo.
   *(High)*
3. **F4 — "Analyzing error root cause using AI…" gives no progress, duration, or cancel.**
   On a slow call the user is stuck watching a blinking cursor with no way to bail. *(High)*
4. **F2 — The 6-issue list mixes severities and noise without prioritisation.** Benign items
   (a deprecation warning shorthand) sit alongside blocking ones (missing resource group);
   the user must parse all six to find what actually matters. *(Medium)*
5. **F5 — Suggested fix introduces unexplained new values** (`eastus`, a concrete
   `--subscription-id`, `Standard_D2vs_v3`, NIC/VNet/NSG names) the user never supplied.
   *(Medium)*

## All Findings

| ID | Area / Component | Finding | Tenet | Trap(s) | Severity | Evidence / Reasoning |
|---|---|---|---|---|---|---|
| F1 | Error → AI trigger | No cue signals that AI assistance is available, how it was triggered, or how to decline it. The transition 03→04 reads as automatic with no labelled control. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.1 Invisible Element; 1.9 Feedback Failure | High | Frames 03→04: error block is immediately followed by "Analyzing…" with no prompt, key hint, or `[Y/n]`. First-time users cannot form a model of what invoked it or how to suppress it next time. |
| F2 | Issue list | Six issues are presented as a flat numbered list with no prioritisation; blocking vs. cosmetic items are visually equal. | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) | 4.3 Information Overload; 1.6 Poor Grouping | Medium | Frame 05: items 1–4 are flag-naming nits; item 6 (missing resource group) is the actual blocker driving the error. No grouping into "blocking / advisory." |
| F3 | Next action / safety | The proposed retry command creates real Azure resources and contains `--admin-password <…>`; only a passive "AI-generated content may be incorrect" line guards it. No confirm step, no "dry run," no undo. | [Forgiving](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Forgiving.aspx?web=1) / [Protective](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Protective.aspx?web=1) | 5.1 Irreversible Action; 1.4 Uncomprehended Element | High | Frame 05: `az group create …` + `az vm create …` provision billable infra. A wrong region/subscription is costly and not trivially reversible. The disclaimer is below the commands and easily missed. |
| F4 | AI analysis wait | The "Analyzing…" state shows no progress indicator, time estimate, or cancel affordance. | [Responsive](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Responsive.aspx?web=1) | 3.1 Slow or No Response; 3.2 Captive Wait | High | Frame 04: only "Analyzing error root cause using AI ..." + blinking cursor. If the model call is slow, the user cannot tell progress from a hang, and there is no visible Ctrl-C hint. |
| F5 | Next action | The suggested commands inject values the user never provided (`--location eastus`, a literal `--subscription-id`, `--vm-size Standard_D2vs_v3`, generated NIC/VNet/NSG names) without explaining they are AI-chosen defaults. | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) | 4.4 Bad Prediction; 1.4 Uncomprehended Element | Medium | Frame 05: original command had none of these. User cannot tell which values are required, which are guessed, or whether `eastus`/that subscription are theirs. |
| F6 | Next action | Likely typo in a suggested value: `--vm-size Standard_D2vs_v3` (no such SKU; real SKUs are `Standard_D2s_v3` / `Standard_D2as_v5`). | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.4 Uncomprehended Element; 4.4 Bad Prediction | Medium | Frame 05 text. Copy-pasting it would itself error, undermining trust in the very feature meant to fix errors. |
| F7 | Next action | Unclear whether the suggested commands are selectable / copyable / runnable in place, or just printed text the user must retype. No affordance is shown. **[assumption A2]** | [Comfortable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Comfortable.aspx?web=1) | 1.1 Invisible Element; 2.1 Physical Challenge | Medium | Frame 05: commands appear as plain wrapped text. If not copyable, the long second command must be retyped error-free — a real physical/legibility burden. |
| F8 | Consistency | Behaviour of the AI step on subsequent errors is unknown — does it always auto-run, or only sometimes? **[assumption A1]** | [Habituating](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Habituating.aspx?web=1) | 8.2 Variable Outcome | Medium | Not observable in a single linear capture; flagged for usability testing. Inconsistent auto-trigger would block mastery. |
| F9 | Issue list wording | Item 5 lumps three distinct missing params ("Missing required: --location, --vm-size, --subscription-id") into one line, while items 1–4 are one-per-line — inconsistent granularity. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.6 Poor Grouping | Low | Frame 05. Minor parsing friction; harder to map each missing param to its fix. |
| F10 | Trust & safety | The safety disclaimer ("AI-generated content may be incorrect") is placed *after* the actionable commands and in normal weight, so it is read (if at all) only after the user has already copied a command. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.2 Effectively Invisible Element; 1.3 Distraction (inverse) | Medium | Frame 05: caveat sits below both numbered actions. Ordering defeats its protective purpose. |
| F11 | Legibility | Long suggested command wraps across 3 lines with the `└` continuation glyph; wrapped portions lose the leading indent, making it hard to see where one command ends. | [Comfortable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Comfortable.aspx?web=1) | 1.6 Poor Grouping | Low | Frame 05: the second `az vm create` command wraps mid-flag; boundaries of the single command are visually ambiguous. |

## Quick Wins

- **F6** — Correct the SKU typo (`Standard_D2vs_v3` → a valid SKU). One-line content fix that
  directly protects feature trust.
- **F9** — Split item 5 into one line per missing parameter for consistent granularity.
- **F10** — Move the "AI-generated content may be incorrect" caveat **above** the suggested
  commands (and/or emphasise it) so it is read before action.
- **F2** — Label the issue list as "Blocking" vs. "Advisory" (the deprecation note is advisory;
  the missing resource group is blocking) — pure presentation change, no new logic.

## Reasoning & Decisions

- **Why F3 is High, not Critical:** The prototype does not *itself* lose data or auto-execute;
  the user still presses Enter. It is rated High (major risk + no undo) rather than Critical
  (which requires the system to block completion or lose data unprompted). If testing shows the
  commands auto-run, F3 escalates to **Critical**.
- **F1/F4 mapping:** Both touch feedback, but their root causes differ. F1 is about *discover­
  ability of the capability* (Invisible Element, Understandable); F4 is about *response during
  the wait* (Slow/No Response + Captive Wait, Responsive). Logged separately to keep fixes
  targeted.
- **F5 vs F6:** F5 is "values the user didn't ask for, unexplained" (Bad Prediction at the UX
  level); F6 is a concrete *incorrect* value (a likely invalid SKU). Separated because F6 is a
  one-line content fix while F5 needs a presentation pattern ("we assumed: …").
- **Assumption-flagged findings (F7, F8):** Cannot be confirmed from a static capture. Logged at
  Medium so they are not dismissed, but explicitly marked **[assumption]** and routed into the
  usability test plan as tasks rather than asserted defects.
- **Strengths upheld (for balance):** *Understandable* — the issue list names the exact wrong
  flags and their correct forms; *Efficient* — auto-analysis saves the user a manual "explain
  this error" step; *Beautiful/Comfortable* — consistent monospace styling and AA-passing
  contrast (see accessibility audit). These keep the concept worth refining.

## Fix & Re-evaluate Loop

This is a human-in-the-loop cycle. Recommended next step: address the **Quick Wins** (F6, F9,
F10, F2) and the two safety/responsiveness **Top Issues** (F3, F4) in the prototype, then
re-run as `tenets-traps-evaluation-r2.md` with a delta section marking each finding
Resolved / Partially resolved / Unchanged / Regressed.

**Choose how to proceed:** (a) Fix all Quick Wins · (b) Fix Top Issues only · (c) Pick specific
IDs · (d) Defer. The Prototyper/Designer owns the fixes; the Tester re-evaluates.

| Round | Date | Findings (C/H/M/L) | Resolved since last | Notes |
|-------|------|--------------------|--------------------|-------|
| r1 | 2026-06-23 | 0 / 3 / 5 / 3 | — | Baseline. Open High: F1, F3, F4. |

## Next Steps

- [ ] Share r1 with Prototyper/Designer; agree on fix set (recommend at least F3, F4, F6, F10).
- [ ] Resolve the High findings before handoff — stage completion requires **0 High/Critical**.
- [ ] Validate assumption-flagged findings (F7, F8) via the usability test plan.
- [ ] Re-run as `tenets-traps-evaluation-r2.md` after fixes.
