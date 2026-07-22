---
title: "HITS Study Participation Experience — Research Brief"
phase: discover
status: draft
created: 2026-06-18
updated: 2026-06-18
author: "Researcher Agent"
related:
  - ./competitive-analysis.md
  - ./findings/study-discovery.md
  - ./findings/task-completion-ux.md
  - ./findings/participant-matching.md
  - ./findings/feedback-loops.md
---

# HITS Study Participation Experience — Research Brief

## 1. Executive Summary

This research brief examines Microsoft's **Human Insights Tracking System (HITS)** — the internal platform that connects UX researchers with employee participants for usability studies, surveys, prototype evaluations, card sorts, and other research activities. The goal of this Discover-phase investigation is to understand the end-to-end study participation experience and surface design opportunities that can increase participation rates, reduce completion friction, and improve participant satisfaction.

Reference study: `https://hits.microsoft.com/study/6048410`

---

## 2. Platform Overview

### What is HITS?

HITS is Microsoft's enterprise-internal UX research recruitment and participation platform. It serves two primary user groups:

| Role | Description |
|---|---|
| **Researchers** | UX researchers, PMs, and designers who create and publish studies to gather employee feedback on products, prototypes, and concepts. |
| **Participants** | Microsoft employees (FTEs and, in some cases, vendors) who browse available studies, sign up, complete tasks, and receive compensation (gift cards, swag, or charitable donations). |

### Platform Capabilities

- **Study catalog** — Browsable list of active studies with filters (product area, time commitment, compensation, study type).
- **Profile & matching** — Participant profiles capturing role, org, product usage, demographics, and device information for screener-based matching.
- **Task execution** — In-platform or linked-out task completion (surveys via Forms/Qualtrics, prototype tests via Figma/UserTesting, moderated sessions via Teams).
- **Compensation management** — Tracking of earned and pending compensation.
- **Study management** (researcher side) — Study creation, screener configuration, participant management, scheduling, and status tracking.

---

## 3. Study Participation Workflow Analysis

The participant journey has **six key stages**:

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ DISCOVER │───▶│  SCREEN  │───▶│  ENROLL  │───▶│ COMPLETE │───▶│  REWARD  │───▶│ FEEDBACK │
└──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
```

### Stage Breakdown

| # | Stage | Description | Current Channel |
|---|-------|-------------|-----------------|
| 1 | **Discover** | Participant learns a study exists | Email digest, HITS homepage, word-of-mouth, Teams posts |
| 2 | **Screen** | Participant answers screener questions to determine eligibility | In-platform screener form |
| 3 | **Enroll** | Participant is accepted and confirms participation | Email confirmation + calendar invite (for moderated) |
| 4 | **Complete** | Participant performs the study tasks | Mixed — in-platform, external links (Forms, Qualtrics, Figma, UserTesting) |
| 5 | **Reward** | Participant receives compensation | Gift card via email, charitable donation, or swag |
| 6 | **Feedback** | Participant sees study outcomes or provides meta-feedback | Largely absent today |

---

## 4. Key Pain Points

The following pain points are synthesized from analogous platform research, heuristic analysis of internal research platforms, and common patterns in participant experience design. Detailed findings are in the [`findings/`](./findings/) directory.

### 4.1 Study Discoverability — `Critical`

> **Finding:** [Study Discovery](./findings/study-discovery.md)

- Participants rely heavily on email digests, which are easily missed or ignored.
- The HITS homepage catalog lacks personalized recommendations; participants must manually browse.
- No push notifications or Teams integration to surface time-sensitive studies.
- Search and filtering capabilities are limited — no ability to filter by estimated effort, device type, or past participation history.

### 4.2 Participant Matching — `Medium`

> **Finding:** [Participant Matching](./findings/participant-matching.md)

- Screener questions can feel redundant when participants have already provided profile data.
- Participants frequently apply to studies only to be screened out, leading to frustration and reduced future participation.
- No transparency into *why* a participant was not selected.
- Profile freshness is a concern — participants rarely update their profiles, leading to stale matching data.

### 4.3 Task Completion Friction — `High`

> **Finding:** [Task Completion UX](./findings/task-completion-ux.md)

- Studies frequently link out to external tools (Qualtrics, Forms, Figma, UserTesting), breaking context and creating authentication friction.
- No progress indicator across multi-part studies.
- Mobile experience is poor — many study tasks are not optimized for phone/tablet completion.
- Incomplete submissions are common; there is no save-and-resume capability.

### 4.4 Feedback Loops — `Medium`

> **Finding:** [Feedback Loops](./findings/feedback-loops.md)

- Participants rarely learn what happened as a result of their contribution.
- Compensation status is opaque — participants don't know when to expect rewards.
- No mechanism to rate the study experience or flag issues.
- Researchers lack aggregated participant satisfaction data.

---

## 5. Research Methodology Recommendations

To validate and deepen these preliminary findings, we recommend the following research activities:

| Method | Purpose | Participants | Timeline |
|--------|---------|-------------|----------|
| **Contextual inquiry (moderated)** | Observe participants as they discover, enroll in, and complete a study on HITS | 8–10 FTEs across orgs | Weeks 1–2 |
| **Survey (unmoderated)** | Quantify pain point severity and frequency across a broad participant base | 200+ HITS participants | Week 2 |
| **Diary study** | Capture longitudinal experience across multiple study participations | 12–15 FTEs | Weeks 2–4 |
| **Researcher interviews** | Understand the study-creation side to identify systemic issues | 6–8 UX researchers | Week 1 |
| **Analytics review** | Analyze drop-off rates at each workflow stage, completion rates, time-to-complete | HITS telemetry data | Week 1 |
| **Competitive benchmark** | Evaluate external research platforms for best-practice patterns | N/A | Week 1 (see [competitive-analysis.md](./competitive-analysis.md)) |

### Recommended Metrics

- **Study enrollment rate** — % of views → enrollments
- **Screener pass-through rate** — % of screener starts → accepted
- **Task completion rate** — % of enrolled → completed
- **Time-to-compensation** — Calendar days from completion to reward delivery
- **Participant NPS** — Net Promoter Score for the participation experience
- **Repeat participation rate** — % of participants who complete 2+ studies per quarter

---

## 6. Stakeholder Map

```
                        ┌─────────────────────┐
                        │   Executive Sponsor  │
                        │  (UX Research Lead)  │
                        └──────────┬──────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
    ┌─────────▼──────────┐ ┌──────▼───────┐ ┌─────────▼──────────┐
    │  HITS Engineering  │ │ UX Researchers│ │ Participant Ops    │
    │  (Platform team)   │ │ (Study owners)│ │ (Compensation,     │
    │                    │ │              │ │  compliance)        │
    └─────────┬──────────┘ └──────┬───────┘ └─────────┬──────────┘
              │                    │                    │
              └────────────────────┼────────────────────┘
                                   │
                        ┌──────────▼──────────┐
                        │   Participants      │
                        │  (Microsoft FTEs)   │
                        └─────────────────────┘
```

| Stakeholder | Interest | Influence |
|-------------|----------|-----------|
| **Executive Sponsor (UX Research Lead)** | Increase research velocity and data quality | High |
| **HITS Engineering Team** | Platform reliability, feature roadmap, telemetry | High |
| **UX Researchers** | Fast recruitment, high completion rates, quality data | High |
| **Participant Ops** | Compliance, compensation processing, participant pool health | Medium |
| **Participants (FTEs)** | Easy discovery, low friction, fair compensation, meaningful impact | Medium (individually low, collectively high) |
| **Product teams consuming insights** | Timely, high-quality research findings | Low (indirect) |

---

## 7. Scope & Constraints

| Dimension | Boundary |
|-----------|----------|
| **In scope** | Participant-facing experience (discover → feedback loop) |
| **Out of scope** | Researcher study-creation workflow (separate initiative) |
| **Platform** | Web (primary), mobile web (secondary) |
| **Auth** | Azure AD — all participants are authenticated Microsoft employees |
| **Data sensitivity** | No PII in research artifacts; findings are anonymized |

---

## 8. Next Steps

1. **Validate pain points** — Run contextual inquiries with 8–10 active HITS participants to confirm and prioritize the identified pain points.
2. **Quantify impact** — Deploy a survey to the broader HITS participant pool to measure severity and frequency of each pain point.
3. **Pull analytics** — Partner with HITS engineering to extract funnel metrics (view → enroll → complete → compensate) for the past 6 months.
4. **Synthesize & prioritize** — Consolidate all findings into an insight map and opportunity matrix for the Strategist to act on.
5. **Share out** — Present research readout to stakeholders in Week 3.
