---
title: "HITS Study Participation — Usability Test Plan"
phase: test
status: draft
created: 2026-06-18
updated: 2026-06-18
author: "Tester Agent"
related:
  - ../../strategy/personas.md
  - ../../strategy/requirements-prd.md
  - ../../ideation/solution-concepts.md
  - ../../prototypes/components/StudyCard
  - ../../prototypes/components/ProgressStepper
  - ../../prototypes/components/ImpactCard
---

# Usability Test Plan — HITS Study Participation Experience

## 1. Study Overview

| Field | Detail |
|-------|--------|
| **Project** | HITS (Human Insights Tracking System) Study Participation Redesign |
| **Test Type** | Moderated Remote Usability Test |
| **Methodology** | Task-based think-aloud protocol |
| **Prototype Fidelity** | High-fidelity interactive HTML/CSS prototypes |
| **Components Under Test** | StudyCard, ProgressStepper, ImpactCard |
| **Concepts Under Test** | Smart Study Feed, Study Completion Wizard, Impact Feed |
| **Planned Sessions** | 6 participants × 45 minutes each |
| **Planned Dates** | Week of 2026-06-29 through 2026-07-03 |

---

## 2. Study Objectives

### Primary Objectives

| ID | Objective | Mapped Requirement |
|----|-----------|-------------------|
| OBJ-1 | Validate that participants can discover and evaluate a relevant study via the Smart Study Feed within 90 seconds | FR-01, FR-02 |
| OBJ-2 | Validate that participants can navigate the Study Completion Wizard, understand progress state, and successfully save/resume | FR-03, FR-07 |
| OBJ-3 | Validate that participants can interpret Impact Feed cards and understand how their contributions led to product changes | FR-09 |
| OBJ-4 | Assess whether the three components (StudyCard, ProgressStepper, ImpactCard) are understandable without instruction | General usability |
| OBJ-5 | Identify any accessibility barriers experienced by participants using keyboard-only or screen reader navigation | NFR-02 |

### Secondary Objectives

- Gauge emotional response to the "Why This Study" explainer on StudyCard
- Test comprehension of match score (percentage) on StudyCard
- Evaluate whether ProgressStepper completion percentage creates appropriate urgency vs. anxiety
- Assess whether ImpactCard's share action is discoverable and understood
- Collect qualitative feedback on visual hierarchy, information density, and terminology

---

## 3. Participant Criteria

### Recruitment Targets

| # | Persona Archetype | Count | Key Screening Criteria |
|---|-------------------|-------|----------------------|
| P1 | **Alex Chen** — Time-Constrained Contributor | 2 | Senior IC or manager, 3+ years at Microsoft, participates in 1–3 HITS studies per quarter, uses mobile for work tasks |
| P2 | **Priya Sharma** — Insight-Driven Researcher | 2 | UX Researcher or equivalent role, has created ≥2 HITS studies, familiar with study authoring tools |
| P3 | **Jordan Blake** — Enthusiastic Newcomer | 2 | Hired within last 6 months, ≤2 HITS studies completed, any IC role |

### Inclusion Criteria

- Full-time Microsoft employee (any geo, any time zone compatible with test schedule)
- Has a HITS account (active or inactive)
- Comfortable participating in a 45-minute remote session via Teams
- Willing to share screen and think aloud

### Exclusion Criteria

- Member of the HITS product team or this redesign project
- Has participated in UX research on HITS in the past 3 months (to avoid priming bias)
- Unable to use a desktop/laptop for the session (mobile-only participants excluded for this round)

### Accessibility Inclusion

- At least **1 participant** should regularly use assistive technology (screen reader, magnification, or keyboard-only navigation)
- At least **1 participant** should have a disclosed visual impairment or color vision deficiency

### Recruitment Method

- Post recruitment request in HITS (meta! 😊) targeting the criteria above
- Supplement with direct outreach via Teams to known participant pools
- Offer standard HITS participation compensation (e.g., $25 gift card or equivalent)

---

## 4. Test Environment & Equipment

### Moderator Setup

| Item | Detail |
|------|--------|
| **Platform** | Microsoft Teams (video call with screen sharing + recording) |
| **Recording** | Teams meeting recording + Stream auto-transcript |
| **Note-taking** | Dedicated observer using structured note template in OneNote |
| **Prototype hosting** | Local dev server or GitHub Pages serving HTML prototypes from `../../prototypes/` |
| **Timer** | Built-in task timer (moderator tracks manually; recording timestamps for analysis) |

### Participant Setup

| Item | Requirement |
|------|-------------|
| **Browser** | Microsoft Edge or Chrome (latest version) |
| **Device** | Desktop or laptop with screen ≥1280px wide |
| **Connection** | Stable internet for Teams video + screen share |
| **Assistive tech** | Participant's own AT setup if applicable (Narrator, JAWS, ZoomText, etc.) |

---

## 5. Task Scenarios

### Pre-Task Brief (read to all participants)

> "Thank you for joining today. We're testing a prototype for a redesigned HITS experience. I'll ask you to complete 5 tasks using the prototype. There are no right or wrong answers — we're testing the design, not you. Please think aloud as you go: tell me what you see, what you expect to happen, and any confusion you experience. You can stop at any time."

---

### Task 1: Discover a Relevant Study (Smart Study Feed + StudyCard)

| Field | Detail |
|-------|--------|
| **Concept** | Smart Study Feed |
| **Component** | StudyCard |
| **Scenario** | "Imagine you're a Product Manager on the Teams team. You have 15 minutes between meetings and want to find a quick, relevant study to participate in." |
| **Task Prompt** | "You've just opened the redesigned HITS homepage. Look at the study feed and find a study that seems most relevant to your role. Tell me which one you'd choose and why." |
| **Follow-up Probes** | "What does the match score (e.g., 92%) mean to you?" · "What does the 'Why This Study' text tell you?" · "How would you filter for studies under 10 minutes?" |
| **Success Criteria** | Participant identifies a relevant study within 90 seconds; can articulate why the study is relevant based on card information |
| **Metrics** | Time to selection, confidence rating (1–5), verbal rationale quality |

### Task 2: Evaluate Study Details (StudyCard Interaction)

| Field | Detail |
|-------|--------|
| **Concept** | Smart Study Feed |
| **Component** | StudyCard |
| **Scenario** | "Before you commit to a study, you want to learn more about it." |
| **Task Prompt** | "Without enrolling yet, find out: (a) how long the study will take, (b) what compensation is offered, (c) when the deadline is, and (d) whether you're a good match. Tell me where you found each piece of information." |
| **Follow-up Probes** | "Is there any information missing that you'd want before enrolling?" · "What do the tags mean to you?" |
| **Success Criteria** | Participant locates all 4 data points without assistance; can identify match-relevant tags |
| **Metrics** | Completion rate (all 4 found), time to find each data point, errors/hesitations |

### Task 3: Navigate the Study Wizard (ProgressStepper)

| Field | Detail |
|-------|--------|
| **Concept** | Study Completion Wizard |
| **Component** | ProgressStepper |
| **Scenario** | "You've enrolled in a study and are now completing it step by step." |
| **Task Prompt** | "You're currently on Step 2 of a 4-step study. Using the progress indicator at the top, tell me: (a) what step you're on, (b) what steps you've completed, (c) what steps remain, and (d) your overall completion percentage." |
| **Follow-up Probes** | "If you needed to stop now and come back later, what would you do?" · "How confident are you that your progress would be saved?" · "Can you go back to a previous step?" |
| **Success Criteria** | Participant correctly identifies current step, completed steps, remaining steps, and approximate completion %; expresses confidence in save/resume |
| **Metrics** | Accuracy of step identification, confidence in save/resume (1–5), time to parse stepper |

### Task 4: Save and Resume (Study Completion Wizard)

| Field | Detail |
|-------|--------|
| **Concept** | Study Completion Wizard |
| **Component** | ProgressStepper |
| **Scenario** | "You're interrupted and need to leave the study. Later, you come back to finish it." |
| **Task Prompt** | "Imagine you just got pulled into an urgent meeting. How would you save your progress and exit? [After participant responds, show resumed state.] Now imagine you've come back the next day. What do you notice about your progress?" |
| **Follow-up Probes** | "Does the resumed state match your expectations?" · "Is it clear what you need to do next?" |
| **Success Criteria** | Participant identifies save mechanism; on resume, correctly identifies where they left off |
| **Metrics** | Save discoverability (found/not found), time to orient on resume, satisfaction (1–5) |

### Task 5: Understand Your Impact (ImpactCard)

| Field | Detail |
|-------|--------|
| **Concept** | Impact Feed |
| **Component** | ImpactCard |
| **Scenario** | "It's been a few weeks since you completed a study. You see an update in your Impact Feed." |
| **Task Prompt** | "Look at this impact card and tell me: (a) which study this is about, (b) what the researcher found, (c) how your feedback influenced the product, and (d) what you can do with this card." |
| **Follow-up Probes** | "How does seeing this impact update make you feel?" · "Would this make you more likely to participate in future studies?" · "Would you share this? With whom?" |
| **Success Criteria** | Participant correctly identifies study, summarizes impact, discovers share action |
| **Metrics** | Comprehension accuracy, emotional response (positive/neutral/negative), share discoverability, future participation intent (1–5) |

---

## 6. Post-Task Questionnaires

### After Each Task

**Single Ease Question (SEQ):**  
> "Overall, how easy or difficult was this task?" (1 = Very Difficult … 7 = Very Easy)

### After All Tasks

**System Usability Scale (SUS):**  
Standard 10-item SUS questionnaire applied to the overall prototype experience. Target: SUS ≥ 72 (above average).

**Custom Post-Test Questions:**

| # | Question | Scale |
|---|----------|-------|
| 1 | How confident would you be finding a relevant study on your first visit? | 1–5 |
| 2 | How confident would you be that your in-progress study is saved? | 1–5 |
| 3 | How meaningful is the Impact Feed to you? | 1–5 |
| 4 | What one thing would you change about this experience? | Open text |
| 5 | What one thing did you like most? | Open text |
| 6 | How likely would you be to use this version of HITS regularly? | 1–5 |

---

## 7. Success Metrics Summary

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Task Completion Rate** | ≥ 90% across all tasks | Binary: completed without critical assistance |
| **Time on Task — Study Discovery (T1)** | ≤ 90 seconds | Stopwatch from task start to study selection |
| **Time on Task — Detail Evaluation (T2)** | ≤ 60 seconds | Stopwatch from task start to all 4 data points found |
| **Time on Task — Stepper Comprehension (T3)** | ≤ 30 seconds | Stopwatch from task start to correct identification |
| **SEQ Score (per task)** | ≥ 5.5 / 7 | Post-task single ease question |
| **SUS Score (overall)** | ≥ 72 | Post-session SUS questionnaire |
| **Save/Resume Confidence** | ≥ 4 / 5 | Post-task probe |
| **Future Participation Intent** | ≥ 4 / 5 | Post-session question |
| **Share Action Discoverability** | ≥ 80% of participants find it unassisted | Observation |
| **Critical Usability Issues** | 0 | Issues preventing task completion |

---

## 8. Moderator Script Outline

### Opening (5 minutes)

1. Welcome and thank participant
2. Explain purpose: "We're testing a prototype, not you"
3. Confirm consent for recording
4. Ask about their current HITS usage and role
5. Explain think-aloud protocol with a brief example

### Warm-Up (2 minutes)

1. "Tell me about the last time you participated in a HITS study — what was that like?"
2. "What would make you more likely to participate regularly?"

### Task Execution (25 minutes)

- Run Tasks 1–5 in order
- Read each scenario and task prompt verbatim
- Use follow-up probes after each task
- Collect SEQ after each task
- Note: If participant is stuck for >2 minutes, offer one neutral hint ("Where might you look for that?")

### Post-Session (10 minutes)

1. Administer SUS questionnaire
2. Ask custom post-test questions
3. Open-ended: "Any other thoughts or things you noticed?"
4. Thank participant and explain next steps

### Closing (3 minutes)

1. Confirm compensation logistics
2. Ask if they'd be willing to participate in a follow-up session
3. Thank and end recording

---

## 9. Data Collection & Analysis Plan

### Data Captured Per Session

| Data Type | Source | Format |
|-----------|--------|--------|
| Task completion (pass/fail) | Moderator observation | Spreadsheet |
| Time on task | Recording timestamps | Seconds |
| SEQ scores | Post-task questionnaire | Numeric (1–7) |
| SUS scores | Post-session questionnaire | Numeric (0–100) |
| Think-aloud insights | Session recording + transcript | Affinity notes |
| Errors and hesitations | Observer notes | Categorized log |
| Emotional reactions | Observer notes + facial cues | Coded (positive/neutral/negative) |

### Analysis Method

1. **Quantitative:** Aggregate completion rates, time-on-task means, SEQ means, SUS score
2. **Qualitative:** Affinity diagram of think-aloud comments, grouped by component and severity
3. **Issue Log:** Each usability issue assigned severity (Critical / Major / Minor / Cosmetic) and mapped to component
4. **Recommendations:** Prioritized list of fixes, categorized as Quick Wins vs. Requires Redesign

---

## 10. Risks & Mitigations

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Prototype breaks during session | Medium | Pre-test all flows 1 hour before each session; have backup screenshots |
| Participant no-shows | Medium | Over-recruit by 1 (recruit 7 for 6 sessions); have backup slots |
| Participants unfamiliar with think-aloud | Low | Practice round with a simple non-HITS task |
| Observer bias in note-taking | Low | Use structured note template; have 2nd observer for 2+ sessions |
| Prototype fidelity gap (participant confused by non-functional elements) | Medium | Brief participants upfront: "Some elements are interactive, some are static" |

---

## 11. Timeline

| Date | Activity |
|------|----------|
| 2026-06-19 – 06-20 | Finalize test plan, recruit participants |
| 2026-06-23 – 06-25 | Pilot test (1 internal team member), refine tasks and probes |
| 2026-06-26 – 06-27 | Set up prototype hosting, prepare recording environment |
| 2026-06-29 – 07-03 | Conduct 6 usability sessions (1–2 per day) |
| 2026-07-07 – 07-09 | Analyze data, build affinity diagram, calculate metrics |
| 2026-07-10 | Compile findings report with recommendations |
| 2026-07-11 | Share findings with Designer and Prototyper for iteration |

---

## 12. Deliverables

| Deliverable | Format | Audience |
|-------------|--------|----------|
| Usability findings report | Markdown in `tests/usability/` | Design team, PM |
| Issue log with severity ratings | Table in findings report | Prototyper, Designer |
| SUS score + benchmark comparison | Chart + summary | Stakeholders |
| Highlight reel (key moments) | 5-minute video compilation | Stakeholders, leadership |
| Recommendations backlog | Prioritized list | Prototyper, Designer |

---

## Next Steps

1. **Get stakeholder sign-off** on this test plan
2. **Begin participant recruitment** using HITS and direct outreach
3. **Pilot test** with 1 team member to validate task clarity and timing
4. **Coordinate with Prototyper** to ensure all prototype flows are stable and hosted
5. **Prepare accessibility-specific test tasks** for the participant using assistive technology
