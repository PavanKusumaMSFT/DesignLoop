---
title: "Usability Test Plan: Design Loop Landing Page"
phase: test
status: draft
created: 2026-06-16
updated: 2026-06-16
author: "Tester Agent"
related:
  - "design-loop-landing-page-tenets-traps-r1-v2.md"
  - "design-loop-landing-page-accessibility-audit-v2.md"
---

# Usability Test Plan: Design Loop Landing Page

## Overview

A moderated usability test plan for the Design Loop marketing landing page. This plan validates
whether first-time visitors can understand the product, navigate the page, interact with the
stage-card carousel, copy setup commands, and find their way to the GitHub repository.

---

## 1. Objectives

| # | Objective | Success Indicator |
|---|-----------|-------------------|
| O1 | Visitors understand what Design Loop is within 30 seconds | ≥ 4/5 participants can articulate the value proposition |
| O2 | Visitors can navigate to any section using the nav | ≥ 4/5 reach the target section within 10 seconds |
| O3 | Visitors discover and interact with stage cards | ≥ 3/5 click a stage card without prompting |
| O4 | Visitors can copy a code snippet to clone the repo | ≥ 4/5 successfully copy the clone command |
| O5 | Visitors can find the GitHub link from any position on the page | ≥ 5/5 locate at least one GitHub CTA |

---

## 2. Participants

| Attribute | Requirement |
|-----------|-------------|
| Count | 5 participants |
| Profile | Product designers or design-adjacent roles (UX researchers, front-end developers) |
| Experience | 2+ years in a design or development role |
| Familiarity | No prior exposure to Design Loop |
| Diversity | Mix of operating systems (Mac/Windows); at least 1 participant using keyboard-only or screen reader |
| Recruitment | Internal design community or LinkedIn outreach |

---

## 3. Method

| Parameter | Value |
|-----------|-------|
| Format | Remote moderated (video call with screen share) |
| Duration | 30 minutes per session |
| Tools | Zoom or Teams for recording; browser of participant's choice |
| Moderator | 1 facilitator + 1 note-taker |
| Recording | Screen + audio (with consent) |
| Think-aloud | Concurrent think-aloud protocol |

---

## 4. Test Environment

- Participants access the page via a hosted URL or local file
- Browser: participant's default browser (record which)
- Device: desktop (primary); one session on a mobile device if available
- No login or account required

---

## 5. Task Scenarios

### Task 1: First Impression (O1)

**Scenario:** "You've just landed on this page for the first time. Take 30 seconds to look around
without clicking anything. Then tell me: what is this product, and who is it for?"

**Success criteria:**
- [ ] Participant identifies Design Loop as a design process / workflow tool
- [ ] Participant identifies designers as the target audience

**Metrics:** Time to first articulation, accuracy of description

---

### Task 2: Section Navigation (O2)

**Scenario:** "Without scrolling, find and navigate to the 'Get Started' section."

**Success criteria:**
- [ ] Participant clicks the "Get Started" nav link
- [ ] Page scrolls to the correct section within 10 seconds

**Metrics:** Time to task completion, path taken (nav link vs. scroll)

---

### Task 3: Stage Exploration (O3)

**Scenario:** "This page talks about a design process with stages. Find and explore the 'Define'
stage to learn more about it."

**Success criteria:**
- [ ] Participant locates the stage card carousel
- [ ] Participant clicks the "Define" card
- [ ] Participant reads the dialog content
- [ ] Participant closes the dialog (close button, backdrop click, or Escape)

**Metrics:** Time to first click, whether participant discovered cards are clickable independently
(without prompting), hesitation or confusion observed

---

### Task 4: Copy Clone Command (O4)

**Scenario:** "You've decided to try Design Loop. Copy the command you'd need to clone it to your
computer."

**Success criteria:**
- [ ] Participant navigates to the "Get Started" section
- [ ] Participant clicks the "Copy" button on the clone code block
- [ ] "Copied" confirmation appears

**Metrics:** Time to task completion, confusion between the two code blocks (step 01 vs. step 02)

---

### Task 5: Find GitHub Repository (O5)

**Scenario:** "Find a link that takes you to the Design Loop GitHub repository."

**Success criteria:**
- [ ] Participant identifies at least one GitHub CTA (nav CTA, hero button, or footer CTA)

**Metrics:** Which CTA was found first, total number discovered, time to discovery

---

### Task 6: Keyboard Navigation (accessibility participant only)

**Scenario:** "Using only your keyboard (no mouse), navigate through the page and try to open one
of the stage cards."

**Success criteria:**
- [ ] Participant can tab through nav elements with visible focus
- [ ] Participant can reach a stage card via Tab
- [ ] Participant can activate a stage card via Enter or Space
- [ ] Focus indicators are visible throughout navigation

**Metrics:** Tab count to reach stage cards, whether cards are reachable, frustration indicators,
verbal observations about focus visibility

---

## 6. Moderator Script

### Introduction (2 min)

> "Thanks for joining today. We're testing a landing page for a new design tool called Design Loop.
> I want to emphasize — we're testing the page, not you. There are no wrong answers.
>
> I'll ask you to complete a few short tasks while thinking out loud — tell me what you're looking
> at, what you expect to happen, and what you're thinking as you go.
>
> This session will take about 30 minutes. We'll record the screen and audio with your permission.
> Do you have any questions before we start?"

### Task Delivery

- Present one task at a time by reading the scenario aloud
- Confirm participant understands the task before they begin
- Do not guide, hint, or correct — note any hesitation or confusion
- After each task: "On a scale of 1 to 5, where 1 is very difficult and 5 is very easy, how
  easy or difficult was that?"
- If participant is stuck for > 60 seconds, offer a gentle nudge and note it

### Debrief (5 min)

> "Now that you've explored the page:
> 1. What was your overall impression?
> 2. Was anything confusing or frustrating?
> 3. What did you like most?
> 4. Is there anything you expected to find but didn't?
> 5. On a scale of 0–10, how likely would you be to recommend this tool to a colleague?"

---

## 7. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Task completion rate | ≥ 80% across all tasks | Binary pass/fail per task per participant |
| Time on task (T2 — nav) | ≤ 10 seconds | Stopwatch from scenario read to section arrival |
| Time on task (T3 — stage card) | ≤ 20 seconds | Stopwatch from scenario read to dialog open |
| Discoverability of stage cards | ≥ 60% unprompted | Proportion who click without moderator hint |
| Post-task ease rating | ≥ 4.0 / 5.0 average | Self-reported per task |
| System Usability Scale (SUS) | ≥ 72 | Post-session 10-item SUS questionnaire |
| Net Promoter Score (NPS) | ≥ 8 / 10 average | Debrief question 5 |

---

## 8. Observation Sheet Template

| Participant | Task | Completed? | Time (s) | Ease (1–5) | Observations / Quotes |
|-------------|------|------------|----------|------------|----------------------|
| P1 | T1 | | | | |
| P1 | T2 | | | | |
| P1 | T3 | | | | |
| P1 | T4 | | | | |
| P1 | T5 | | | | |
| P1 | T6 | | | | |
| P2 | T1 | | | | |
| P2 | T2 | | | | |
| P2 | T3 | | | | |
| P2 | T4 | | | | |
| P2 | T5 | | | | |
| P2 | T6 | | | | |
| P3 | T1 | | | | |
| P3 | T2 | | | | |
| P3 | T3 | | | | |
| P3 | T4 | | | | |
| P3 | T5 | | | | |
| P3 | T6 | | | | |
| P4 | T1 | | | | |
| P4 | T2 | | | | |
| P4 | T3 | | | | |
| P4 | T4 | | | | |
| P4 | T5 | | | | |
| P4 | T6 | | | | |
| P5 | T1 | | | | |
| P5 | T2 | | | | |
| P5 | T3 | | | | |
| P5 | T4 | | | | |
| P5 | T5 | | | | |
| P5 | T6 | | | | |

---

## 9. Analysis Plan

1. **Aggregate completion rates** per task — flag any task with < 80% completion
2. **Affinity-map qualitative observations** — cluster quotes and behaviours into themes
3. **Cross-reference with heuristic findings** — validate Tenets & Traps issues (F-01 through F-13) with real user data
4. **Prioritise fixes** — combine severity (heuristic) × frequency (test) × impact (user quotes)
5. **Produce a findings report** at `design-loop-landing-page-usability-test-findings.md`

---

## Next Steps

- Schedule sessions with 5 participants (target: week of 2026-06-23)
- Set up recording tool and consent forms
- Deploy the landing page to a test URL accessible to participants
- Conduct sessions and populate observation sheets
- Synthesise findings and cross-reference with the Tenets & Traps evaluation
