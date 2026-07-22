---
title: "HITS Study Participation — How Might We Statements"
phase: ideate
status: draft
created: 2026-06-22
updated: 2026-06-22
author: "Ideator Agent"
related:
  - ./solution-concepts.md
  - ../../hits-study-6048410/strategy/problem-statements.md
  - ../../hits-study-6048410/strategy/personas.md
  - ../../hits-study-6048410/strategy/requirements-prd.md
---

# How Might We Statements — HITS Study Participation Experience

## Assumptions & Provenance

> **Source material note.** This Ideate run was invoked with a binary source artifact
> (~217 KB) that was not resolvable on disk and could not be read in this environment,
> and no source URL was supplied. Per the stage fallback policy, the Define-stage inputs
> were **derived from the established, validated HITS Study Participation problem space**
> documented in `tasks/hits-study-6048410/strategy/` (problem statements, personas, and
> PRD). Those artifacts are treated as the ground-truth prerequisites for this stage.
> Every HMW below traces explicitly to one of the four validated problem statements.
> If the original binary is later recovered, re-validate the HMW framing against it.

**Validated problem statements driving this ideation (from Define):**

| PS | Problem | Most-impacted persona |
|----|---------|-----------------------|
| PS-1 | Study **discoverability** — flat catalog, no personalization, relevant studies under-recruited | Alex Chen, Jordan Blake |
| PS-2 | Task **completion friction** — lost progress, timeouts, weak mobile, no save/resume | Alex Chen |
| PS-3 | Participant–study **matching** — broad filters, post-enrollment disqualification, unusable data | Priya Sharma |
| PS-4 | **Feedback loops** — transactional dead-end after submission, no visible impact | Alex Chen, Jordan Blake, Priya Sharma |

---

## HMW Statements

Each statement is open-ended (it invites many solutions without prescribing one), names
the affected user, and links back to a validated problem and target metric.

### HMW-1 — Discoverability → Relevance
**How might we** help a time-constrained participant like Alex see the *handful of studies
that actually fit her* the moment she opens HITS — instead of a flat wall of listings?
- **Traces to:** PS-1 (Discoverability)
- **Primary persona:** Alex Chen · **Secondary:** Jordan Blake
- **Anchor metric:** Time-to-first-relevant-study 6 min → < 90 sec; 48-hr fill rate 35% → ≥ 60%

### HMW-2 — Onboarding → Confident first step
**How might we** give a brand-new participant like Jordan enough orientation and signal
on their *first visit* that they can confidently pick a study meant for someone like them?
- **Traces to:** PS-1 (Discoverability) + PS-3 (Matching)
- **Primary persona:** Jordan Blake
- **Anchor metric:** Onboarding completion < 3 min; profile completion ≥ 80%

### HMW-3 — Completion → Never lose progress
**How might we** let a participant pause mid-study on one device and resume seamlessly on
another, so an interruption never costs them — or the researcher — their work?
- **Traces to:** PS-2 (Task Completion Friction)
- **Primary persona:** Alex Chen
- **Anchor metric:** Completion rate 62% → ≥ 85%; mid-task abandonment 25% → < 12%

### HMW-4 — Mobile parity → Friction-free on the phone
**How might we** make the study-taking experience feel native and effortless on a phone
during a lunch break or between meetings, with no cut-off buttons or layout breakage?
- **Traces to:** PS-2 (Task Completion Friction)
- **Primary persona:** Alex Chen, Jordan Blake
- **Anchor metric:** Mobile completion 40% → ≥ 80%; WCAG 2.1 AA on all study tasks

### HMW-5 — Matching → Right people, before enrollment
**How might we** connect a researcher like Priya to the *right* participants — and keep
mismatched ones out — *before* anyone invests time, so data quality is protected upfront?
- **Traces to:** PS-3 (Participant–Study Matching)
- **Primary persona:** Priya Sharma · **Secondary:** Jordan Blake
- **Anchor metric:** Post-enrollment disqualification 18% → < 8%; fit score 3.1 → ≥ 4.2/5

### HMW-6 — Researcher efficiency → Recruit & screen faster
**How might we** cut the hours Priya spends manually recruiting and cleaning data, so HITS
becomes a research *accelerator* rather than her bottleneck?
- **Traces to:** PS-3 (Matching) + PS-4 (Feedback, supply side)
- **Primary persona:** Priya Sharma
- **Anchor metric:** Recruitment time per study ~6 hrs → < 2 hrs

### HMW-7 — Feedback → Make impact visible
**How might we** show every participant that their contribution mattered — what changed
because of it — so participation feels collaborative rather than transactional?
- **Traces to:** PS-4 (Feedback Loops)
- **Primary persona:** Alex Chen, Jordan Blake · **Secondary:** Priya Sharma
- **Anchor metric:** 60-day repeat participation 18% → ≥ 30%; studies with impact summaries 5% → ≥ 25%

### HMW-8 — Trust → Consent-driven personalization
**How might we** earn the profile data that powers personalization through a transparent,
opt-in, explainable exchange — so participants feel in control rather than tracked?
- **Traces to:** Cross-cutting theme (Trust) underpinning PS-1, PS-3, PS-4
- **Primary persona:** All three
- **Anchor metric:** Profile adoption high enough to keep ≤ 5 irrelevant studies in top 20

---

## HMW → Problem → Persona Traceability Matrix

| HMW | PS-1 Discover | PS-2 Completion | PS-3 Matching | PS-4 Feedback | Alex | Priya | Jordan |
|-----|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| HMW-1 | ● | | ○ | | ● | | ○ |
| HMW-2 | ● | | ● | | | | ● |
| HMW-3 | | ● | | | ● | | ○ |
| HMW-4 | | ● | | | ● | | ● |
| HMW-5 | | | ● | | | ● | ○ |
| HMW-6 | ○ | | ● | ○ | | ● | |
| HMW-7 | | | | ● | ● | ○ | ● |
| HMW-8 | ● | | ● | ○ | ● | ● | ● |

● primary · ○ secondary

---

## Next Step

These eight HMW statements are the divergence stimulus for **Concept Brainstorm**
(`solution-concepts.md`), where each HMW is expanded into multiple candidate solutions
before any convergence or scoring occurs.
