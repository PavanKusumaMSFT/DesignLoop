---
title: "HITS Study Participation — Problem Statements"
phase: define
status: draft
created: 2026-06-18
updated: 2026-06-18
author: "Strategist Agent"
related:
  - ../research/findings
---

# Problem Statements — HITS Study Participation Experience

> **Source study:** [HITS Study 6048410](https://hits.microsoft.com/study/6048410)

## Overview

Research into Microsoft's Human Insights Tracking System (HITS) surfaced four systemic problems that degrade the participant experience and, consequently, the quality and velocity of internal user research. The following "How Might We" statements translate those findings into actionable design challenges.

---

## HMW 1 — Study Discoverability

### How might we improve study discoverability so participants find relevant studies faster?

### Context

The HITS study catalog currently presents studies in a flat, chronologically-ordered list. Employees must scroll through dozens of irrelevant listings — covering different product areas, device types, and time commitments — to find studies that match their expertise and availability. There is no personalized feed, no smart filtering beyond basic category tags, and no proactive notification system that alerts participants to new studies aligned with their profile. As a result, many high-value studies go under-recruited while employees waste time scanning listings that don't apply to them.

### Impact Assessment

| Dimension | Rating | Detail |
|-----------|--------|--------|
| User frustration | **High** | Participants report spending 5–10 minutes browsing before finding a relevant study, leading many to abandon the catalog entirely. |
| Research velocity | **High** | Studies take longer to reach recruitment targets, delaying product insight timelines. |
| Participant retention | **Medium** | Repeat participation drops when discovery feels like work rather than an invitation. |
| Data quality | **Medium** | Poor matching means some participants join studies outside their domain, diluting insight quality. |

### Success Metrics

| Metric | Current (est.) | Target |
|--------|---------------|--------|
| Time from catalog open → study enrollment | ~6 min | < 90 sec |
| Study recruitment fill rate within 48 hrs | ~35% | ≥ 70% |
| Participant return rate (30-day) | ~22% | ≥ 45% |
| Studies expiring under-recruited | ~28% | < 10% |

### Constraints

- Must respect employee privacy — no tracking of role/org data without explicit opt-in.
- Notifications must comply with Microsoft's internal communications policy (no more than 2 unsolicited pings per week).
- Cannot access employee calendars without Azure AD consent flow.

---

## HMW 2 — Task Completion Friction

### How might we reduce task completion friction so participants complete studies without abandoning?

### Context

Once a participant enrolls in a study, the in-study experience introduces several friction points: unclear task instructions, missing progress indicators, session timeouts that lose work, and multi-step flows that lack a "save and resume" capability. These issues are compounded on mobile devices, where the HITS web interface is not fully responsive. The result is a significant study abandonment rate mid-task, which wastes both the participant's time and the researcher's recruitment budget.

### Impact Assessment

| Dimension | Rating | Detail |
|-----------|--------|--------|
| Completion rate | **Critical** | Estimated 30–40% of enrolled participants fail to complete all study tasks. |
| Data loss | **High** | Partial completions are often unusable, requiring re-recruitment. |
| Participant trust | **High** | Losing progress erodes willingness to participate again. |
| Researcher burden | **Medium** | Researchers must over-recruit by 1.5–2× to compensate for dropout. |

### Success Metrics

| Metric | Current (est.) | Target |
|--------|---------------|--------|
| Study completion rate (enrolled → finished) | ~62% | ≥ 90% |
| Mid-task abandonment rate | ~25% | < 8% |
| Average task completion time (for 15-min study) | ~22 min | ≤ 16 min |
| Mobile completion rate | ~40% | ≥ 80% |

### Constraints

- Must support Edge, Chrome, and Safari across desktop and mobile.
- Cannot fundamentally alter the study authoring schema without researcher migration tooling.
- Progress-save mechanism must comply with data retention policies (auto-purge partial data after 30 days).
- Must not add latency to the study-taking experience (page load < 2 s).

---

## HMW 3 — Participant-Study Matching

### How might we create better participant-study matching so the right people join the right studies?

### Context

HITS studies often require participants with specific characteristics — product familiarity, job role, tenure, device usage patterns, accessibility needs, or geographic location. Today, matching relies on broad eligibility filters set by the researcher and self-selection by participants. There is no profile-based recommendation engine, no screener pre-qualification flow, and no mechanism for researchers to invite targeted cohorts. This results in two failure modes: (a) qualified participants never see the study, and (b) unqualified participants enroll, complete tasks, and generate unusable data.

### Impact Assessment

| Dimension | Rating | Detail |
|-----------|--------|--------|
| Data quality | **Critical** | Mismatched participants produce insights that can mislead product decisions. |
| Recruitment efficiency | **High** | Researchers spend significant time manually screening and disqualifying enrollees. |
| Participant experience | **Medium** | Being disqualified after enrollment feels exclusionary and discouraging. |
| Platform trust | **Medium** | Researchers lose confidence in HITS when participant quality is inconsistent. |

### Success Metrics

| Metric | Current (est.) | Target |
|--------|---------------|--------|
| Participant-study fit score (post-study researcher rating) | 3.1 / 5 | ≥ 4.2 / 5 |
| Post-enrollment disqualification rate | ~18% | < 5% |
| Researcher time spent on manual screening per study | ~3 hrs | < 30 min |
| % of studies using profile-based targeting | ~10% | ≥ 60% |

### Constraints

- Profile data must be opt-in and editable by the employee at any time.
- Matching algorithms must be explainable — participants should understand *why* a study was recommended.
- Cannot create exclusionary patterns that disadvantage any demographic group (fairness review required).
- Must integrate with existing Azure AD attributes where consent is granted.

---

## HMW 4 — Feedback Loops

### How might we build feedback loops so participants feel valued and researchers get richer insights?

### Context

Today, the participant experience ends abruptly after task submission. Participants receive no confirmation of how their input was used, no summary of aggregate findings, and no acknowledgment beyond a generic "Thank you" screen. Researchers, in turn, have no structured channel to ask follow-up questions or share how participant insights influenced product decisions. This one-directional flow makes participation feel transactional rather than collaborative, reducing intrinsic motivation and long-term engagement.

### Impact Assessment

| Dimension | Rating | Detail |
|-----------|--------|--------|
| Participant motivation | **High** | Without feedback, the "why should I bother?" sentiment grows with each study. |
| Repeat participation | **High** | Participants who never see impact are 3× less likely to return within 60 days. |
| Insight depth | **Medium** | Inability to follow up means researchers miss clarifying questions that could deepen findings. |
| Culture of research | **Medium** | A visible feedback loop normalizes and celebrates research participation across the org. |

### Success Metrics

| Metric | Current (est.) | Target |
|--------|---------------|--------|
| Participant satisfaction score (post-study) | 3.4 / 5 | ≥ 4.5 / 5 |
| 60-day repeat participation rate | ~18% | ≥ 40% |
| % of studies with published impact summaries | ~5% | ≥ 50% |
| Researcher follow-up question utilization rate | ~2% | ≥ 25% |

### Constraints

- Impact summaries must be approved by the study owner before publication (IP/confidentiality review).
- Follow-up requests must be optional for participants — no obligation to respond.
- Feedback content must not reveal individual responses (aggregate only, unless participant opts in).
- Notification fatigue must be managed — bundle feedback updates with existing HITS digests.

---

## Cross-Cutting Themes

Across all four problem areas, three recurring themes emerge:

1. **Personalization requires consent-driven profiles** — Most improvements depend on knowing more about the participant, which demands a transparent, opt-in profile system.
2. **Mobile parity is non-negotiable** — A significant share of Microsoft employees access HITS on mobile; any solution that ignores mobile will perpetuate friction.
3. **Trust is the multiplier** — Discoverability, matching, completion, and feedback all contribute to a trust relationship between participant and platform. Eroding trust in any one area cascades to the others.

---

## Next Steps

1. **Validate with stakeholders** — Review these HMW statements with the HITS product team and 3–5 active researchers to confirm prioritization.
2. **Map to personas** — Align each HMW to the persona most impacted (see [personas.md](./personas.md)).
3. **Ideation workshops** — Use these HMW statements as prompts for structured brainstorming in the Ideate phase.
4. **Define solution scope** — Identify which HMW areas are addressable in V1 vs. deferred to V2 (see [requirements-prd.md](./requirements-prd.md)).
