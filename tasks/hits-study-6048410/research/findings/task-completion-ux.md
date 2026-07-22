---
title: "Finding: Task Completion UX Friction"
phase: discover
status: draft
created: 2026-06-18
updated: 2026-06-18
author: "Researcher Agent"
related:
  - ../research-brief.md
  - ../competitive-analysis.md
  - ./study-discovery.md
  - ./participant-matching.md
  - ./feedback-loops.md
---

# Finding: Task Completion UX Friction

| Attribute | Value |
|-----------|-------|
| **Severity** | 🟠 High |
| **Workflow Stage** | Complete |
| **Impact Area** | Study completion rates, data quality, participant satisfaction |
| **Confidence** | Medium (heuristic analysis + competitive benchmarking; needs participant validation) |

---

## 1. Summary

Participants experience significant friction when completing study tasks on HITS. The platform frequently redirects participants to external tools (Qualtrics, Microsoft Forms, Figma, UserTesting), breaking context, introducing authentication hurdles, and eliminating progress visibility. Multi-part studies lack save-and-resume capability, and the mobile experience is largely non-functional for task completion.

---

## 2. Evidence

### 2.1 External Tool Fragmentation

Studies on HITS use a variety of external tools for task execution:

| Task Type | Common Tool(s) | Integration Level |
|-----------|----------------|-------------------|
| Survey | Microsoft Forms, Qualtrics | Link-out (new tab) |
| Prototype evaluation | Figma, UserTesting | Link-out (new tab/app) |
| Card sort / tree test | Optimal Workshop, UserZoom | Link-out (new tab) |
| Moderated interview | Microsoft Teams | Calendar invite + Teams link |
| Diary study | Forms, OneNote | Link-out (new tab) |
| Unmoderated usability test | UserTesting | Link-out (requires plugin) |

**Key issue:** When participants click "Start Study" on HITS, they are taken to an external tool in a new tab. HITS has no visibility into whether the participant started, progressed, or completed the task. Completion verification often requires manual reconciliation by researchers.

### 2.2 Context-Switching Costs

The typical flow for an unmoderated study:

```
HITS (browse) → HITS (study detail) → External tool (new tab) → Complete task → Close tab → Return to HITS (?)
```

Pain points in this flow:
- **Auth friction** — Some external tools require separate login or SSO consent prompts.
- **Lost context** — After completing a task in an external tool, participants may not return to HITS to confirm completion.
- **No progress sync** — HITS cannot display "50% complete" because it has no data from the external tool.
- **Browser/tab fatigue** — Enterprise users already have many tabs open; adding more increases cognitive load.

### 2.3 Multi-Part Study Issues

Some studies involve multiple tasks (e.g., a survey followed by a prototype evaluation). Current issues:

- **No progress indicator** — Participants don't know how many tasks remain or how much time is left.
- **No save-and-resume** — If a participant is interrupted mid-task, they must restart from the beginning.
- **No sequential guidance** — After completing Task 1, participants must manually navigate back to HITS to find Task 2.

### 2.4 Mobile Experience

- Most external tools are not optimized for mobile interaction within the HITS context.
- HITS study detail pages are not responsive — text overflows, buttons are difficult to tap, and task links may not deep-link to mobile-friendly versions.
- No native app experience means participants cannot complete quick studies during commute or breaks.

### 2.5 Competitive Gap

Platforms like **Maze** and **UserTesting** run all tasks natively in-platform with integrated progress bars, automatic screen recording, and seamless mobile support. HITS relies on a fragmented ecosystem of external tools.

See: [Competitive Analysis](../competitive-analysis.md) § 5.3

---

## 3. Impact

| Metric | Current State (estimated) | Desired State |
|--------|--------------------------|---------------|
| Task completion rate | ~60–70% of enrolled participants | >85% |
| Average completion time (10-min survey) | 15–18 min (including context-switching) | 10–12 min |
| Mobile completion rate | <5% of total completions | >20% |
| Partial/abandoned submissions | ~15–20% | <5% |

### Downstream Effects

- **Data quality** — Incomplete submissions waste researcher time and reduce sample sizes.
- **Participant frustration** — Context-switching and auth issues erode willingness to participate in future studies.
- **Researcher burden** — Manual completion verification is time-consuming and error-prone.

---

## 4. Hypothesized Root Causes

1. **Platform architecture** — HITS was designed as a recruitment/scheduling tool, not a task-execution environment. Task execution was always delegated to external tools.
2. **Tool proliferation** — Different research teams use different tools, and HITS must accommodate all of them.
3. **No completion callback** — External tools do not reliably send a "completion" signal back to HITS (no webhook/API integration).
4. **Mobile not prioritized** — The participant base was assumed to be at their desks on desktop machines.

---

## 5. Design Opportunities

### Opportunity A: Embedded Task Runner
Build a lightweight task runner that can embed common task types (Forms surveys, Figma prototypes) within an iframe or webview on HITS, eliminating the need to open a new tab.

| Task Type | Embedding Feasibility |
|-----------|----------------------|
| Microsoft Forms | High (supports iframe embedding) |
| Qualtrics | Medium (iframe restrictions vary by config) |
| Figma prototypes | High (supports embed API) |
| UserTesting | Low (requires native integration) |
| Optimal Workshop | Medium |

### Opportunity B: Progress Tracker
Add a persistent progress indicator for multi-part studies:
- Step-by-step task list with completion status
- Estimated time remaining
- "Continue where you left off" re-entry point

### Opportunity C: Completion Webhook Integration
Work with external tool providers to implement completion callbacks:
- When a participant finishes a Forms survey, a webhook notifies HITS.
- HITS updates the study status and triggers the next task or compensation flow.

### Opportunity D: Mobile-Responsive Redesign
- Redesign study detail pages and task flows for mobile viewports.
- Prioritize task types that work well on mobile (surveys, card sorts) for mobile-targeted notifications.
- Consider a Teams-based mini-app for quick study completion.

### Opportunity E: Save-and-Resume
For longer studies (>15 min), implement save-and-resume:
- Save partial responses in HITS (for first-party tasks) or bookmark the external tool's state.
- Send a reminder notification to resume an incomplete study.

---

## 6. Next Steps

1. **Map task-type frequency** — Determine which external tools are most commonly used and prioritize embedding for the top 2–3.
2. **Measure drop-off** — Analyze the gap between "Start Study" clicks and verified completions to quantify the context-switching problem.
3. **Prototype embedded runner** — Build a proof-of-concept embedding Microsoft Forms and Figma prototypes within the HITS task page.
4. **Test with participants** — Conduct A/B concept testing of embedded vs. link-out task flow with 10–12 participants.
5. **Technical spike** — HITS engineering to assess webhook feasibility with Forms, Qualtrics, and UserTesting APIs.
