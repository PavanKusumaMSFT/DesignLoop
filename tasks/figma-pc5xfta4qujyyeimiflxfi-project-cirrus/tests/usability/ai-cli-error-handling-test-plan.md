---
title: "Usability Test Plan: AI-Assisted Azure CLI Error Handling (Project Cirrus)"
phase: test
status: draft
created: 2026-06-23
updated: 2026-06-23
author: "Tester Agent"
related: ["ai-cli-error-handling-task-scripts.md", "ai-cli-error-handling-observation-sheet.md", "tenets-traps-evaluation-r1.md", "accessibility-audit.md", "../../research/web/project-cirrus-prototype.md"]
---

# Usability Test Plan: AI-Assisted Azure CLI Error Handling (Project Cirrus)

## Overview

| Field | Detail |
|-------|--------|
| **Feature** | AI "root cause analysis" for failed Azure CLI (`az`) commands — detects the error, lists the issues, and proposes corrective next-action commands. |
| **Test Type** | Moderated remote (think-aloud), screen + audio shared. One session includes an assistive-technology pass. |
| **Participants** | 6–8 (5 general developers + 1–2 screen-reader users) |
| **Duration** | 45 minutes per session |
| **Prototype** | Figma click-through `Project Cirrus` (node 813:1502), password-protected. Captured frames: `../../research/web/screens/`. Source: `../../research/web/project-cirrus-prototype.md`. Use a clickable build or a Wizard-of-Oz terminal if available. |

> **Assumptions under test (from the source capture):** A1 — how AI analysis is triggered;
> A2 — whether suggested commands are copyable/runnable; A3 — focus/selection affordances;
> A4 — screen-reader announcement. These map to the Tenets & Traps findings F1, F3, F4, F7, F8
> and accessibility caveats A-04, A-05, A-07.

## Research Questions

1. When an `az` command fails, do users **notice** that AI help is available and understand
   how it was triggered (or how to invoke/decline it)? *(T&T F1)*
2. Can users **understand the 6-issue list** and identify which issue actually blocked their
   command? *(T&T F2, F9)*
3. Do users **trust and act on** the suggested "Next action" commands — and do they review them
   before running, given they create billable resources and embed a password? *(T&T F3, F10)*
4. Do users notice that suggested commands contain **values they never supplied**
   (region, subscription, SKU) and do they verify/edit them? *(T&T F5, F6)*
5. Is the **wait state** ("Analyzing… using AI") tolerable — do users understand progress and
   know they can cancel? *(T&T F4 / a11y A-05)*
6. For screen-reader users, is the AI status and result **announced and navigable**?
   *(a11y A-04)*
7. What is users' overall **confidence** in the recovery outcome vs. solving the error
   themselves?

## Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Primary task completion (recover to a correct command) | ≥ 80% | Participant produces/identifies a valid corrected command |
| Identifies the true blocking issue (missing resource group) | ≥ 80% | Names item 6 as the root cause when asked |
| Reviews suggested command before "running" it | ≥ 90% | Observed verification/edit of region, subscription, password, SKU |
| Notices AI-injected values (region/subscription/SKU) | ≥ 70% | Participant calls out at least one unprompted value |
| Detects the invalid SKU (`Standard_D2vs_v3`) | report rate | Count who flag it (validates T&T F6) |
| Time on task (read AI help → decide next step) | ≤ 3 minutes | Stopwatch from AI output shown to stated decision |
| Error-recovery confidence | ≥ 4/5 | Post-task rating |
| Trust in AI suggestion | captured | Post-task rating + probe (no fixed target — diagnostic) |
| System Usability Scale (SUS) | ≥ 68 | Post-session SUS questionnaire |
| Screen-reader: AI result reached & understood | qualitative pass | AT participant locates issues + commands unaided |

## Participant Profile

### Screening Criteria
- Uses a command-line interface weekly (terminal/shell comfort required).
- Has used a cloud CLI (Azure CLI `az`, AWS CLI, or `gcloud`) at least occasionally.
- Mix of Azure expertise: ~half "regular `az` users," ~half "infrequent / new to `az`."
- 1–2 participants who use a screen reader (VoiceOver or NVDA) with a terminal daily.
- Exclude: people who have seen the Project Cirrus designs.

### Recruitment
- Source: internal developer pool + external panel of cloud/DevOps practitioners; AT users via
  an accessibility research panel.
- Incentive: standard per-session research incentive (per org policy).
- Screening questions: "How often do you use a terminal?"; "Which cloud CLIs have you used?";
  "How would you rate your Azure CLI experience (none / some / strong)?"; "Do you use a screen
  reader?"

## Session Structure

| Time | Activity |
|------|----------|
| 0:00 - 0:05 | Introduction and consent |
| 0:05 - 0:10 | Background questions (CLI habits, how they handle `az` errors today) |
| 0:10 - 0:38 | Task scenarios (Tasks 1–4) |
| 0:38 - 0:45 | Post-task questionnaire, SUS, debrief |

## Equipment & Environment

- [ ] Prototype/build loaded and tested (or Wizard-of-Oz terminal script ready)
- [ ] Screen recording software ready
- [ ] Audio recording permission obtained
- [ ] Observation sheet prepared (`ai-cli-error-handling-observation-sheet.md`)
- [ ] AT session: VoiceOver + macOS Terminal **and/or** NVDA + Windows Terminal configured
- [ ] Backup plan for technical issues (static frame walkthrough as fallback)

## Pre-Test Checklist

- [ ] Pilot test completed with 1–2 internal participants
- [ ] All task scripts reviewed and finalized
- [ ] Participants recruited and confirmed (incl. ≥1 screen-reader user)
- [ ] Observer roles assigned (moderator + note-taker)
- [ ] Data collection tools set up (timer, rating forms, SUS)

## Next Steps

- [ ] Run pilot, refine task wording.
- [ ] Execute sessions; log per-participant data in the observation sheet.
- [ ] Synthesise via `/test-execution` into a findings report with severity-ranked
      recommendations; feed confirmed issues back into a Tenets & Traps r2.
