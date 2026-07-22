---
title: "HITS Study Participation — Concept Evaluation"
phase: ideate
status: draft
created: 2026-06-22
updated: 2026-06-22
author: "Ideator Agent"
related:
  - ./solution-concepts.md
  - ./decision-log.md
---

# Concept Evaluation — HITS Study Participation Experience

All twelve concepts from `solution-concepts.md` scored against three dimensions. The
**Weighted Score** drives the shortlist that feeds `decision-log.md`.

## Scoring Model

| Dimension | Scale | Meaning | Weight |
|-----------|-------|---------|--------|
| **Value (Desirability + Impact)** | 1–5 (higher better) | How strongly it moves PRD success metrics and serves the personas | ×0.45 |
| **Effort (Feasibility, inverse)** | 1–5 (higher = *less* effort) | Build/integration cost within existing Azure App Service + Cosmos DB; ease of delivery | ×0.30 |
| **Risk (Viability, inverse)** | 1–5 (higher = *less* risk) | Privacy, fairness, adoption, notification-fatigue, scope risk | ×0.25 |

**Weighted Score** = Value×0.45 + Effort×0.30 + Risk×0.25 (max 5.0). Higher is better.

---

## Scoring Matrix

| # | Concept | Value | Effort¹ | Risk¹ | Weighted | Tier |
|---|---------|:----:|:----:|:----:|:----:|------|
| C1 | "For You" Personalized Feed | 5 | 3 | 3 | **3.90** | ⭐ Shortlist |
| C2 | Guided First-Run Onboarding | 4 | 4 | 4 | **4.00** | ⭐ Shortlist |
| C3 | Cross-Device Auto-Save & Resume | 5 | 3 | 4 | **4.15** | ⭐ Shortlist |
| C4 | Mobile-First Study-Taking Shell | 5 | 2 | 4 | **3.85** | ⭐ Shortlist |
| C5 | Profile-Based Targeting + Invite | 4 | 2 | 2 | **2.90** | Phase 2 |
| C6 | Smart Pre-Enrollment Screener | 4 | 3 | 4 | **3.70** | ⭐ Shortlist |
| C7 | Screener Template Library | 3 | 4 | 5 | **3.80** | Phase 2 |
| C8 | "Your Impact" Closing Loop | 4 | 3 | 4 | **3.70** | ⭐ Shortlist |
| C9 | Matched-Study Notifications | 4 | 3 | 2 | **3.20** | Phase 2 |
| C10 | In-Study Progress Bar | 3 | 5 | 5 | **4.10** | ⭐ Shortlist |
| C11 | Unified "Research Companion" Platform | 5 | 1 | 3 | **3.30** | ★ Umbrella |
| C12 | Copilot Study Concierge | 4 | 1 | 2 | **2.60** | Defer (V2) |

¹ Effort and Risk are scored *inverse* — a 5 means low effort / low risk.

---

## Per-Concept Rationale

- **C1 (3.90)** — Highest-value discovery lever; the keystone of personalization. Effort and
  risk are moderate because it depends on profile adoption (HMW-8) and a fairness-reviewed
  ranking model.
- **C2 (4.00)** — Cheap, low-risk, and unlocks the profile data every other personalization
  feature needs. Strong enabler with little downside.
- **C3 (4.15)** — Directly attacks the Critical-severity completion problem (PS-2). High value,
  low risk; effort is the main cost (state persistence across devices).
- **C4 (3.85)** — Essential for mobile parity (a non-negotiable cross-cutting theme), but the
  most effort-heavy of the P0 set (a UI overhaul).
- **C5 (2.90)** — High researcher value but carries real fairness/consent risk and notable
  build effort; better sequenced after the profile foundation exists.
- **C6 (3.70)** — Protects data quality *and* participant dignity with modest effort. Strong
  early candidate.
- **C7 (3.80)** — Low-risk efficiency win, but lower participant value; ideal Phase-2 filler.
- **C8 (3.70)** — The motivation/retention multiplier. Modest effort; gated by IP/confidentiality
  approval of summaries (manageable risk).
- **C9 (3.20)** — Valuable reach, but notification-fatigue and policy limits make it the
  riskiest of the moderate set; pair with strict frequency controls in Phase 2.
- **C10 (4.10)** — Cheapest high-confidence completion win. Almost no risk.
- **C11 (3.30)** — Highest *value* (covers all eight HMWs) but lowest *feasibility* as a single
  deliverable. Its score reflects program-level effort, not weak merit — it is best treated as
  the **umbrella vision** delivered through the shortlisted concepts, not a one-shot build.
- **C12 (2.60)** — Compelling but speculative; depends on unresolved open question OQ-4 and
  carries adoption + accuracy risk. Defer to V2.

---

## Shortlist (Top Convergence Set)

Ranked by weighted score, the concepts that should anchor V1:

| Rank | Concept | Weighted | Primary HMW | PRD Phase |
|------|---------|:----:|-------------|-----------|
| 1 | C3 Auto-Save & Resume | 4.15 | HMW-3 | Phase 1 |
| 2 | C10 Progress Bar | 4.10 | HMW-3/4 | Phase 2 |
| 3 | C2 Guided Onboarding | 4.00 | HMW-2/8 | Phase 1 |
| 4 | C1 Personalized Feed | 3.90 | HMW-1 | Phase 1 |
| 5 | C4 Mobile-First Shell | 3.85 | HMW-4 | Phase 1 |
| 6 | C6 Smart Screener | 3.70 | HMW-5 | Phase 2 |
| 6 | C8 "Your Impact" Loop | 3.70 | HMW-7 | Phase 3 |

**Key observation:** No single shortlisted concept covers all four problem statements alone.
Each addresses one or two HMWs. **C11 (Unified Research Companion)** is the only concept that
spans every HMW — its low feasibility score is purely a function of trying to score a *program*
as a *feature*. The natural convergence is therefore to **adopt C11 as the guiding vision and
deliver it incrementally through the high-scoring shortlist (C1–C4, C6, C8, C10), sequenced to
the PRD's existing four-phase roadmap.**

---

## Decision Inputs Forwarded

- The shortlist and the C11 framing above are the direct inputs to `decision-log.md`.
- C5, C7, C9 are valid but sequenced to Phase 2; C12 is deferred to V2 pending OQ-4.
