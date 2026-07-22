---
title: "HITS Study Participation — Product Requirements Document"
phase: define
status: draft
created: 2026-06-18
updated: 2026-06-18
author: "Strategist Agent"
related:
  - ../research/findings
  - ./problem-statements.md
  - ./personas.md
---

# Product Requirements Document — HITS Study Participation Experience

> **Source study:** [HITS Study 6048410](https://hits.microsoft.com/study/6048410)

---

## 1. Product Vision

**Reimagine HITS as an intelligent, participant-centric research platform that connects the right Microsoft employees to the right studies with zero friction, and closes the loop by showing participants the impact of their contributions.**

---

## 2. Goals & Non-Goals

### Goals

| # | Goal | Aligned HMW |
|---|------|-------------|
| G1 | Reduce time-to-enrollment by surfacing personalized, relevant studies | HMW 1 |
| G2 | Achieve ≥90% study completion rate by eliminating mid-task friction | HMW 2 |
| G3 | Improve participant-study fit through profile-based matching and smart screeners | HMW 3 |
| G4 | Increase repeat participation by building visible feedback loops | HMW 4 |
| G5 | Improve researcher efficiency by reducing manual recruitment and screening overhead | HMW 3, HMW 4 |

### Non-Goals

| # | Non-Goal | Rationale |
|---|----------|-----------|
| NG1 | Replace HITS' study authoring engine | Out of scope — focus is on the participation experience; authoring improvements are limited to templates and targeting. |
| NG2 | Build a standalone mobile app | Web-responsive design is sufficient; a native app introduces maintenance burden without commensurate value. |
| NG3 | Gamify participation with leaderboards or competitive elements | Risk of incentivizing quantity over quality; may create privacy/equity concerns. |
| NG4 | Integrate with external (non-Microsoft) research platforms | Internal-only scope for V1; cross-platform federation is a future consideration. |

---

## 3. User Stories

### Participant Stories (Alex Chen, Jordan Blake)

| ID | User Story | Priority | Persona |
|----|-----------|----------|---------|
| US-01 | As a **participant**, I want to see a personalized feed of studies matched to my role and interests so that I don't waste time scrolling through irrelevant listings. | P0 | Alex, Jordan |
| US-02 | As a **participant**, I want to save my progress mid-study and resume later on any device so that I don't lose work if I'm interrupted. | P0 | Alex |
| US-03 | As a **new employee**, I want a guided onboarding experience when I first visit HITS so that I understand what studies are, how to participate, and what happens with my data. | P1 | Jordan |
| US-04 | As a **participant**, I want to receive a notification when a new study matches my profile so that I can enroll quickly without checking the catalog. | P1 | Alex, Jordan |
| US-05 | As a **participant**, I want to see clear eligibility indicators on each study card so that I know whether a study is meant for someone like me before I click in. | P0 | Jordan |
| US-06 | As a **participant**, I want to receive a brief impact summary after a study concludes so that I feel my contribution mattered. | P1 | Alex, Jordan |
| US-07 | As a **participant**, I want a responsive mobile experience with no layout issues so that I can complete studies on my phone. | P0 | Alex, Jordan |
| US-08 | As a **participant**, I want to see a progress bar and estimated time remaining during a study so that I can manage my time. | P1 | Alex |

### Researcher Stories (Priya Sharma)

| ID | User Story | Priority | Persona |
|----|-----------|----------|---------|
| US-09 | As a **researcher**, I want to define a target participant profile and have HITS recommend matched employees so that I reach recruitment targets faster. | P0 | Priya |
| US-10 | As a **researcher**, I want to use pre-built screener templates so that I don't rebuild qualification logic from scratch for every study. | P1 | Priya |
| US-11 | As a **researcher**, I want to publish a post-study impact summary that auto-distributes to participants so that I can close the feedback loop with minimal effort. | P1 | Priya |
| US-12 | As a **researcher**, I want to see a participant fit score before a study launches so that I can assess whether my targeting criteria will yield quality respondents. | P2 | Priya |
| US-13 | As a **researcher**, I want to send optional follow-up questions to participants after initial analysis so that I can clarify ambiguous responses without running a new study. | P2 | Priya |

---

## 4. Requirements

### 4.1 Functional Requirements

| ID | Priority | Category | Requirement | Acceptance Criteria |
|----|----------|----------|-------------|-------------------|
| FR-01 | **P0** | Discovery | Personalized study feed based on participant profile (role, org, interests, past participation) | Feed ranks studies by relevance score; participants see ≤5 irrelevant studies in top 20 |
| FR-02 | **P0** | Discovery | Eligibility badges on study cards ("Best for: PMs", "Requires: Teams daily use") | Every published study displays at least one eligibility tag; tags are auto-generated from screener criteria |
| FR-03 | **P0** | Completion | Auto-save and cross-device resume for in-progress studies | Progress persists across sessions; participant can resume within 14 days on any authenticated device |
| FR-04 | **P0** | Completion | Fully responsive web UI (mobile-first design for study-taking flow) | All study tasks pass WCAG 2.1 AA; no horizontal scroll on viewports ≥ 320px |
| FR-05 | **P0** | Matching | Profile-based targeting for researchers (define target attributes; HITS recommends and optionally invites matched participants) | Researcher can define ≥5 targeting attributes; system returns estimated match count before launch |
| FR-06 | **P1** | Discovery | Push notifications for new matching studies (Teams activity feed + email digest) | Participant can configure notification frequency (immediate / daily digest / off) |
| FR-07 | **P1** | Completion | In-study progress bar and estimated time remaining | Progress indicator updates after each task; time estimate is within ±2 min of actual |
| FR-08 | **P1** | Onboarding | First-visit guided onboarding (3-step profile setup + HITS explainer) | New users complete onboarding in <3 min; profile completion rate ≥ 80% |
| FR-09 | **P1** | Feedback | Post-study impact summary publishing tool for researchers | Researcher can write and publish a summary in <5 min; auto-sent to all study participants |
| FR-10 | **P1** | Matching | Screener template library (reusable qualification modules) | Library includes ≥10 templates at launch; researcher can clone and modify |
| FR-11 | **P2** | Feedback | Optional follow-up question channel (researcher → participant, post-study) | Participant receives follow-up as a HITS notification; can respond or dismiss |
| FR-12 | **P2** | Matching | Pre-launch participant fit score dashboard | Dashboard shows distribution of matched profiles by key attributes; updates in real time |
| FR-13 | **P2** | Feedback | Participation milestones and acknowledgment (e.g., "You've contributed to 10 studies!") | Milestones trigger at 1, 5, 10, 25 studies; shown in participant profile |

### 4.2 Non-Functional Requirements

| ID | Priority | Category | Requirement |
|----|----------|----------|-------------|
| NFR-01 | **P0** | Performance | Study pages load in < 2 seconds on 4G connections |
| NFR-02 | **P0** | Accessibility | All participant-facing UI meets WCAG 2.1 AA compliance |
| NFR-03 | **P0** | Privacy | Profile data is opt-in, editable, and deletable by the participant at any time; complies with Microsoft Privacy Standard |
| NFR-04 | **P0** | Security | All data in transit encrypted via TLS 1.3; data at rest encrypted in Azure |
| NFR-05 | **P1** | Scalability | System supports ≥50,000 concurrent participants and ≥500 active studies |
| NFR-06 | **P1** | Reliability | 99.9% uptime SLA for study-taking flow |
| NFR-07 | **P1** | Fairness | Matching algorithm undergoes fairness review to prevent demographic bias in study recommendations |

---

## 5. Success Metrics

| Metric | Baseline (est.) | V1 Target | V2 Target | Measurement Method |
|--------|-----------------|-----------|-----------|-------------------|
| Time to first relevant study (from catalog open) | ~6 min | < 90 sec | < 30 sec | Client-side telemetry |
| Study completion rate (enrolled → finished) | ~62% | ≥ 85% | ≥ 93% | HITS backend analytics |
| Mid-task abandonment rate | ~25% | < 12% | < 5% | Session tracking |
| Study recruitment fill rate (within 48 hrs) | ~35% | ≥ 60% | ≥ 80% | HITS recruitment dashboard |
| Post-enrollment disqualification rate | ~18% | < 8% | < 3% | Screener completion data |
| Participant satisfaction (post-study CSAT) | 3.4 / 5 | ≥ 4.0 / 5 | ≥ 4.5 / 5 | In-product survey |
| 60-day repeat participation rate | ~18% | ≥ 30% | ≥ 45% | Cohort analysis |
| Researcher time spent on recruitment per study | ~6 hrs | < 2 hrs | < 45 min | Researcher self-report survey |
| % of studies with published impact summaries | ~5% | ≥ 25% | ≥ 55% | HITS content audit |

---

## 6. Technical Constraints & Dependencies

| Constraint | Detail |
|-----------|--------|
| **Identity** | Must use Azure AD / Entra ID for authentication and profile attribute access (with consent). |
| **Notifications** | Teams activity feed integration requires Microsoft Graph API; must comply with notification volume policies. |
| **Data residency** | Participant profile and response data must reside in Microsoft-managed Azure tenants; no third-party storage. |
| **Existing infrastructure** | HITS backend is built on Azure App Service + Cosmos DB; new features must integrate without re-platforming. |
| **Browser support** | Edge (latest 2), Chrome (latest 2), Safari (latest 2) — desktop and mobile. |
| **Accessibility tooling** | Must pass Accessibility Insights for Web automated checks + manual screen-reader testing (Narrator, JAWS). |
| **API rate limits** | Microsoft Graph calls for profile data are subject to throttling; caching strategy required. |

---

## 7. Timeline & Phases

### Phase 1 — Foundation (Weeks 1–8)

| Deliverable | Requirements Covered |
|-------------|---------------------|
| Participant profile system (opt-in, editable) | NFR-03, FR-05, FR-08 |
| Personalized study feed (relevance-ranked) | FR-01, FR-02 |
| Responsive study-taking UI overhaul | FR-04, NFR-01, NFR-02 |
| Auto-save and cross-device resume | FR-03 |

### Phase 2 — Matching & Notifications (Weeks 9–14)

| Deliverable | Requirements Covered |
|-------------|---------------------|
| Profile-based targeting for researchers | FR-05, FR-12 |
| Screener template library | FR-10 |
| Push notification system (Teams + email) | FR-06 |
| In-study progress bar | FR-07 |

### Phase 3 — Feedback & Polish (Weeks 15–20)

| Deliverable | Requirements Covered |
|-------------|---------------------|
| Impact summary publishing tool | FR-09 |
| Follow-up question channel | FR-11 |
| Participation milestones | FR-13 |
| Fairness review of matching algorithm | NFR-07 |
| Guided onboarding flow | FR-08 |

### Phase 4 — Measure & Iterate (Weeks 21–24)

| Deliverable | Requirements Covered |
|-------------|---------------------|
| Telemetry dashboard for success metrics | All metrics |
| A/B test personalized feed vs. control | FR-01 |
| Researcher satisfaction survey | G5 |
| V2 roadmap based on learnings | — |

---

## 8. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| OQ-1 | What is the maximum number of profile attributes participants will realistically fill out during onboarding? | UX Research | Open |
| OQ-2 | Can we access org/role data from Entra ID with a one-time consent, or is per-session consent required? | Identity / Legal | Open |
| OQ-3 | Should impact summaries be visible only to participants, or also discoverable by the broader org? | HITS Product Team | Open |
| OQ-4 | Is there appetite for a Copilot-assisted study authoring experience for researchers? | GPM | Open |
| OQ-5 | How do we handle studies that span multiple time zones for scheduling-sensitive tasks? | Engineering | Open |

---

## 9. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Low profile adoption — participants don't fill out profiles, undermining personalization | Medium | High | Make onboarding delightful and fast (< 3 min); pre-populate from Entra ID with consent; show immediate value ("Here are 3 studies for you") |
| Notification fatigue — too many pings drive participants to mute HITS | Medium | Medium | Default to daily digest; let participants set preferences; enforce platform-wide rate limits |
| Fairness concerns in matching — algorithm may inadvertently exclude certain groups | Low | High | Mandatory fairness review before launch; regular bias audits; transparent "Why this study?" explanations |
| Researcher resistance to templates — perceived as limiting creativity | Low | Medium | Make templates optional and customizable; seed library with high-quality examples from top researchers |
| Scope creep into study authoring overhaul | Medium | Medium | Clearly delineate non-goals; separate authoring improvements into a dedicated workstream |

---

## Next Steps

1. **Design review** — Hand off to the Designer for wireframing the personalized feed, onboarding flow, and impact summary experience.
2. **Technical spike** — Engineering to validate auto-save architecture and Graph API integration for profile data.
3. **Stakeholder alignment** — Present this PRD to the HITS product team and executive sponsor for sign-off.
4. **Usability test plan** — Define test scenarios for Phase 1 deliverables using the three personas (see [personas.md](./personas.md)).
5. **Fairness review kickoff** — Engage the Responsible AI team for early review of matching algorithm design.
