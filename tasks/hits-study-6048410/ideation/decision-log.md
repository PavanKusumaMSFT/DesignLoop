---
title: "HITS Study Participation — Ideation Decision Log"
phase: ideate
status: draft
created: 2026-06-18
updated: 2026-06-22
author: "Ideator Agent"
related:
  - ./solution-concepts.md
  - ./concept-evaluation.md
  - ../strategy/requirements-prd.md
  - ../strategy/personas.md
---

# Decision Log: HITS Study Participation Experience

## Summary Table

| Decision | Status | Date | Reversibility |
|----------|--------|------|---------------|
| D-1: Select Study Completion Wizard as primary concept | Decided | 2026-06-22 | Hard to reverse |
| D-2: Advance Impact Feed + Research Champion Network as complementary pair | Decided | 2026-06-22 | Easy to reverse |
| D-3: Include Smart Screener Flow in prototype shortlist | Decided | 2026-06-22 | Easy to reverse |
| D-4: Defer Smart Study Feed to technical discovery | Decided | 2026-06-22 | Easy to reverse |
| D-5: Merge Progress Tracker Dashboard into Wizard rather than build standalone | Decided | 2026-06-22 | Hard to reverse |

---

## Decisions

### Decision 1: Select Study Completion Wizard as Primary Concept

**Date**: 2026-06-22
**Status**: Decided
**Decided By**: Ideator Agent (based on evaluation scores and strategic analysis)

#### Context

Eight concepts were generated and scored across Desirability, Feasibility, and Viability dimensions. The team needed to identify a single primary concept to lead design efforts — the one that, if only one thing shipped, would deliver the most value to HITS participants and the research program. The critical constraint from `requirements-prd.md` is that study completion rate (currently ~62%) is the platform's most important metric.

#### Decision

We will advance the **Study Completion Wizard** as the P0 (highest priority) concept for design and prototyping, rather than leading with the Impact Feed or Smart Study Feed.

#### Rationale

- Scored highest overall (4.65) with the top Desirability score (5/5), tied with Smart Study Feed — directly targets the moment of highest friction per PS-2 in `problem-statements.md`
- Addresses the #1 success metric from `requirements-prd.md`: improving study completion rate from ~62% to ≥90%
- Save-and-resume directly serves Alex Chen's fragmented schedule (per `personas.md`) and Jordan Blake's need for guided scaffolding
- Medium feasibility (4/5) means it can be prototyped and validated within a reasonable timeline
- Absorbs the strongest elements of the Progress Tracker Dashboard (progress bars, resume, deadlines), delivering two concepts' value in one build

#### Alternatives Considered

| Alternative | Why Rejected |
|-------------|-------------|
| Lead with Impact Feed (scored 4.55) | While higher feasibility, it addresses post-study motivation rather than the core completion problem. Completion rate improvement must precede retention investment — participants must finish studies before they can feel impact. |
| Lead with Smart Study Feed (scored 3.80) | Highest strategic value long-term but Large effort with privacy review dependency. Cannot be prototyped quickly enough to validate the participation hypothesis. Relegated to parallel technical discovery. |
| Lead with Research Champion Network (scored 4.55) | Addresses culture and discovery but not the highest-friction moment (in-study completion). Social advocacy works best when the core study experience is already good — otherwise Champions are promoting a frustrating experience. |

#### Trade-offs Accepted

- **Survey tool integration complexity** — wrapping a wizard around existing survey platforms (Qualtrics, Forms) risks fragmentation. Some studies may not fit the wizard model (live sessions, open-ended interviews). We accept that not all study types will benefit equally.
- **Over-engineering risk** — simple 2-minute surveys may feel heavy in a full wizard. We accept the need to design a "lightweight mode" threshold, which adds design complexity.
- **Delayed discovery improvement** — by not leading with the Smart Study Feed, we defer the top-of-funnel problem. Participants still need to find studies the old way while the Wizard ships.

#### Reversibility

- **Hard to reverse**: The Wizard becomes the primary study-taking UI. Once researchers adapt their studies to the step-based format, reverting to the raw experience would require migration.

---

### Decision 2: Advance Impact Feed + Research Champion Network as Complementary Pair

**Date**: 2026-06-22
**Status**: Decided
**Decided By**: Ideator Agent (based on synergy analysis and effort efficiency)

#### Context

Impact Feed and Research Champion Network both scored 4.55 and both require low technical effort (S-sized builds). They address different HMW questions (HMW-7 and HMW-8 respectively) but both target the same lifecycle stage: post-study engagement and organizational culture. The question was whether to advance them independently or as a designed pair.

#### Decision

We will advance Impact Feed and Research Champion Network as a **complementary pair** (P1 priority) designed to work together, rather than selecting only one or treating them as independent workstreams.

#### Rationale

- Both scored identically (4.55) — no basis to exclude one over the other
- Natural synergy: Impact Feed provides the *content* (impact stories), Champions provide the *amplification channel* (social sharing within teams). Together they create a virtuous cycle per HMW-8 from `hmw-statements.md`
- Combined effort is still Small — both are primarily content/workflow solutions with lightweight UI
- Per `personas.md`, Priya Sharma benefits from both: Impact Feed helps her close the loop with participants, Champions help her reach new participant pools
- PS-4 in `problem-statements.md` explicitly identifies that participants who see impact are 3× more likely to return within 60 days — both concepts directly target this metric

#### Alternatives Considered

| Alternative | Why Rejected |
|-------------|-------------|
| Advance Impact Feed only, defer Champion Network | Champions solve a distinct problem (social discovery and culture) that the Feed alone cannot. Without Champions, impact stories exist but lack organic distribution beyond the HITS platform. |
| Advance Champion Network only, defer Impact Feed | Champions need content to share. Without impact stories, Champions are reduced to promoting study enrollment with no closure mechanism. The combination is more than the sum of parts. |
| Treat them as independent P1 and P2 workstreams | They share infrastructure (notification systems, social sharing, recognition) and user flows. Designing them separately risks inconsistent patterns. Joint design is more efficient. |

#### Trade-offs Accepted

- **Researcher adoption dependency** — both concepts depend on researchers publishing impact updates. If adoption is low, both concepts underperform simultaneously rather than hedging risk across different lifecycle stages.
- **Program management overhead** — the Champion Network requires ongoing curation (recruiting, training, recognizing Champions) that is not a one-time build. We accept this as an operational cost.
- **Measurement complexity** — attributing participation increases to Impact Feed vs. Champion Network individually will be difficult. We accept blended metrics for the pair.

#### Reversibility

- **Easy to reverse**: Both are additive features. They can be scaled back or paused without disrupting the core study-taking experience. Champion program can be sunset with minimal technical debt.

---

### Decision 3: Include Smart Screener Flow in Prototype Shortlist

**Date**: 2026-06-22
**Status**: Decided
**Decided By**: Ideator Agent (based on researcher-side value and matching quality goals)

#### Context

The shortlist needed to address both participant-side and researcher-side problems. The first three concepts (Wizard, Feed, Champions) all primarily serve participant experience. PS-3 in `problem-statements.md` identifies that post-enrollment disqualification rate is ~18% and researchers spend ~3 hrs/study on manual screening. The Smart Screener Flow scored 4.20 and directly addresses the matching quality problem.

#### Decision

We will include the **Smart Screener Flow** as P3 in the prototype shortlist, rather than deferring all matching-quality concepts.

#### Rationale

- Directly eliminates ~3 hrs/study of researcher manual screening labor (per PS-3 success metrics in `problem-statements.md`)
- Prevents the demoralizing post-enrollment disqualification experience that PS-3 identifies as a participant trust issue
- Graceful mismatch redirects increase overall platform participation — a rejected participant becomes a redirected participant
- Feasibility score of 4/5 — screener patterns are well-established and don't require ML or Graph API
- Per `personas.md`, Priya Sharma's core frustration is participant quality inconsistency. This concept directly serves her primary goal.

#### Alternatives Considered

| Alternative | Why Rejected |
|-------------|-------------|
| Defer all matching to Smart Study Feed (long-term) | Smart Study Feed requires Large effort and privacy review. Matching quality cannot wait 6+ months. Screener provides immediate value with Medium effort. |
| Use Quick-Match Cards for pre-enrollment filtering | Quick-Match Cards optimize browsing speed, not qualification verification. Swiping doesn't confirm fit — it confirms interest. Different problems. |
| Rely on researcher-authored eligibility text (status quo) | Current self-selection model produces 18% post-enrollment disqualification per PS-3. Text-based eligibility descriptions are insufficient — participants misjudge their own fit. |

#### Trade-offs Accepted

- **Added enrollment friction** — inserting 2–4 screening questions between "interested" and "enrolled" may reduce conversion for studies with already-low interest. We accept this trade-off because quality > quantity for research data.
- **Screener design burden** — researchers must author good screening questions. Poor questions lead to false disqualifications. We accept the need for templates, examples, and validation tooling.

#### Reversibility

- **Easy to reverse**: The screener is an optional enrollment step. Researchers can choose to enable or disable it per study. Can be removed without impacting the core platform.

---

### Decision 4: Defer Smart Study Feed to Technical Discovery

**Date**: 2026-06-22
**Status**: Decided
**Decided By**: Ideator Agent (based on effort/timeline analysis)

#### Context

The Smart Study Feed scored well on Desirability (5/5) and Viability (5/5) but poorly on Feasibility (3/5) due to ML pipeline requirements, Microsoft Graph API integration, and mandatory privacy impact assessment. The concept is strategically important but cannot be prototyped within the initial design sprint timeline defined in `requirements-prd.md`.

#### Decision

We will defer the Smart Study Feed to a parallel **technical discovery track** rather than including it in the immediate prototype shortlist, with a Phase 1 rule-based matching approach as the bridge.

#### Rationale

- Effort is Large — requires ML recommendation pipeline, Graph API integration (calendar, org data, skills), and privacy review per the constraints in PS-1 of `problem-statements.md`
- Privacy impact assessment alone may take 4–8 weeks based on Microsoft's internal review timelines
- A Phase 1 rule-based approach (match by role + product area + org) can deliver partial value without ML investment
- The four shortlisted concepts collectively address discovery partially: Champion Network enables social discovery, Smart Screener redirects create serendipitous discovery, Impact Feed surfaces related studies
- Per `requirements-prd.md`, the project needs demonstrable results within one quarter — the Feed's timeline doesn't fit

#### Alternatives Considered

| Alternative | Why Rejected |
|-------------|-------------|
| Include Smart Study Feed in shortlist as P4 | P4 implies it will be designed and prototyped. Given timeline constraints, this sets unrealistic expectations. Technical discovery is the honest commitment. |
| Discard the concept entirely | Strategic value is too high (5/5 Viability). Microsoft's Graph API access is a unique competitive advantage per HMW-1. Must be pursued, just not first. |
| Build a simplified "email digest" version as interim | This partially overlaps with existing HITS email notifications. A digest without personalization doesn't solve the core problem (relevance). Better to invest in the full concept once privacy is cleared. |

#### Trade-offs Accepted

- **Discovery remains broken short-term** — participants still browse a flat chronological list until the Feed ships. The Champion Network partially mitigates this through social distribution.
- **Competitors could ship first** — if other internal platforms (Viva, Teams) build study-matching features, HITS loses the first-mover advantage. We accept this risk given the privacy review dependency is non-negotiable.

#### Reversibility

- **Easy to reverse**: This is a timing decision, not a direction decision. Smart Study Feed can be elevated to P0 at any time if technical blockers resolve faster than expected.

---

### Decision 5: Merge Progress Tracker Dashboard into Wizard Rather Than Build Standalone

**Date**: 2026-06-22
**Status**: Decided
**Decided By**: Ideator Agent (based on overlap analysis and adoption risk)

#### Context

The Progress Tracker Dashboard (scored 4.00) and Study Completion Wizard (scored 4.65) both address HMW-3 (progress visibility and completion confidence). Their feature sets overlap significantly: progress bars, quick-resume buttons, deadline awareness, and completion stats. The question was whether to build both as separate experiences or merge the Dashboard's best elements into the Wizard.

#### Decision

We will merge the Progress Tracker Dashboard's key features into the Study Completion Wizard rather than building a standalone "My Studies" dashboard.

#### Rationale

- Feature overlap is ~70%: progress bars, quick-resume, and deadline nudges appear in both concepts
- Per `personas.md`, Jordan Blake needs guided scaffolding (Wizard) more than a passive dashboard — the Wizard actively helps completion while the Dashboard only displays status
- Microsoft employees already navigate 5+ dashboards daily (Viva Insights, Azure DevOps, Power BI, etc.) — per PS-2 context, adding another standalone surface risks low adoption
- The Wizard provides the natural home for progress tracking — participants see their progress while actively completing a study, not in a separate location
- Elements that don't fit the Wizard (lifetime stats, reward tracking, completion streaks) are absorbed into Impact Feed's "My Impact" section

#### Alternatives Considered

| Alternative | Why Rejected |
|-------------|-------------|
| Build both standalone Wizard and Dashboard | Duplicates progress visualization in two places, creating maintenance burden and user confusion about where to check status. |
| Build Dashboard only, skip Wizard | Dashboard shows progress but doesn't actively reduce friction. It's informational, not interventional. The Wizard directly helps participants complete — the Dashboard just tells them they haven't. |
| Defer all progress features to a later phase | Progress visibility scored 4.00 — deferring it entirely would ignore a validated user need (Jordan Blake's desire for structure and accomplishment signals per `personas.md`). |

#### Trade-offs Accepted

- **No centralized "My Studies" view** — participants who want a single dashboard of all active studies won't find one. In-context progress (within the Wizard) replaces at-a-glance overview. If HITS scales to 3+ concurrent studies per participant, this decision should be revisited.
- **Gamification is deprioritized** — the Dashboard's streak mechanics and lifetime stats are absorbed into Impact Feed but lose their prominent position. Gamification advocates may feel underserved.
- **Reward tracking is fragmented** — without a standalone dashboard, reward history lives in Impact Feed's "My Contributions" section rather than a dedicated tracker. May be less discoverable.

#### Reversibility

- **Hard to reverse**: Once the Wizard is designed as the single home for progress tracking, extracting those features into a separate dashboard requires significant re-architecture and risks confusing participants who learned the Wizard-first mental model.

---

## Chosen Concept Summary

**Primary concept advancing to Design:** Study Completion Wizard (P0, score 4.65)

The Study Completion Wizard is the single winning concept that, if only one thing shipped, delivers the highest impact on HITS's most critical metric (completion rate). It is supported by three complementary concepts (Impact Feed, Research Champion Network, Smart Screener Flow) that address post-study engagement, organizational culture, and matching quality respectively.

### Design Phase Sequence

```
Sprint 1–2:  Study Completion Wizard (save/resume MVP → guided flow)
Sprint 1–2:  Impact Feed + Research Champion Network (low-effort, parallel)
Sprint 2–3:  Smart Screener Flow (enrollment quality)
Parallel:    Smart Study Feed technical discovery (privacy review + Phase 1 design)
```

### Passing to Design

The Designer needs:
- This `decision-log.md` — the chosen concept and rationale
- `strategy/requirements-prd.md` — must-have requirements to design for
- `strategy/personas.md` — who the design must serve
- `ideation/concept-evaluation.md` — full scoring context for trade-off decisions during design
