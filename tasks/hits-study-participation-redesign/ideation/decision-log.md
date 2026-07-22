---
title: "HITS Study Participation — Decision Log"
phase: ideate
status: approved
created: 2026-06-22
updated: 2026-06-22
author: "Ideator Agent"
related:
  - ./hmw-statements.md
  - ./solution-concepts.md
  - ./concept-evaluation.md
  - ../../hits-study-6048410/strategy/requirements-prd.md
---

# Decision Log — HITS Study Participation Experience

## Decision

> **Chosen direction: C11 — the Unified "Research Companion" Platform, delivered
> incrementally through its highest-scoring component concepts (C3, C10, C2, C1, C4, C6, C8),
> sequenced to the PRD's four-phase roadmap.**

A consent-driven participant **profile** is the single foundation. On top of it: a
personalized feed (C1) and guided onboarding (C2) solve discovery; a mobile-first study
shell (C4) with auto-save/resume (C3) and a progress bar (C10) eliminate completion friction;
a smart pre-enrollment screener (C6) protects matching quality; and a "Your Impact" loop (C8)
closes the feedback gap. One profile, one trust contract, end-to-end.

---

## Rationale (Tied to Evaluation Scores)

1. **It is the only concept that covers all four validated problems.** C11 maps to HMW-1
   through HMW-8; no shortlisted single feature spans more than two HMWs (see the coverage
   table in `concept-evaluation.md`). The Define-stage cross-cutting theme — *trust is the
   multiplier across discovery, matching, completion, and feedback* — can only be honored by
   a unified profile + trust contract, which is exactly what C11 provides.

2. **Its component concepts dominate the weighted scores.** The shortlist that composes C11
   holds the seven highest weighted scores in the matrix: C3 (4.15), C10 (4.10), C2 (4.00),
   C1 (3.90), C4 (3.85), C6 (3.70), C8 (3.70). Choosing C11 is therefore choosing the
   evidence-ranked best concepts — not a separate, unscored idea.

3. **C11's own low weighted score (3.30) is an artifact of scale, not merit.** It scored
   Effort = 1 because a big-bang build is infeasible. Decomposing it into independently
   shippable, high-scoring pieces neutralizes that single weakness while preserving its
   category-leading Value = 5. Incremental delivery converts the program's only liability
   (feasibility) into the existing PRD phasing.

4. **It aligns 1:1 with the already-approved PRD roadmap**, requiring no re-planning:
   - **Phase 1 (Foundation):** profile system + C1 feed + C4 mobile shell + C3 auto-save
   - **Phase 2 (Matching & Notifications):** C6 screener, C7 templates, C9 notifications, C10 progress bar
   - **Phase 3 (Feedback & Polish):** C8 impact loop, C2 onboarding, fairness review
   - **Phase 4 (Measure & Iterate):** telemetry + A/B test of the feed

---

## Alternatives Considered & Why Not Chosen

| Concept | Weighted | Why not the lead choice |
|---------|:----:|--------------------------|
| C3 Auto-Save (4.15) | top-ranked | Highest-scoring *feature*, but solves only completion (PS-2). Adopted **as Phase-1 component** of C11, not as the whole direction. |
| C10 Progress Bar (4.10) | 2nd | Cheap, low-risk, but narrow value. Included **within** C11 (Phase 2). |
| C2 / C1 / C4 / C6 / C8 | 3.70–4.00 | Each addresses only one HMW. All **absorbed into** C11; none stands alone as a complete answer to the problem set. |
| C5 Targeting + Invite (2.90) | mid | High researcher value but real fairness/consent risk + heavy build; **sequenced to Phase 2** within C11, not V1 lead. |
| C7 Screener Templates (3.80) | mid | Low participant value; **Phase-2 efficiency add-on**. |
| C9 Notifications (3.20) | low-mid | Notification-fatigue and policy risk; **Phase-2, gated by strict frequency controls**. |
| C12 Copilot Concierge (2.60) | lowest | Speculative; depends on unresolved open question OQ-4 and carries adoption/accuracy risk. **Deferred to V2.** |

A single narrow feature (e.g. C3 alone) was rejected as the stage outcome because it would
leave three of four validated problems unaddressed and ignore the trust-multiplier theme.

---

## Risks Accepted & Mitigations

| Risk | Severity | Mitigation (carried into Design/PRD) |
|------|----------|--------------------------------------|
| Low profile adoption undermines personalization | High | Make onboarding (C2) delightful & < 3 min; pre-populate from Entra ID with consent; show immediate value ("3 studies for you"). |
| Fairness bias in feed/matching (C1, C6) | High | Mandatory Responsible-AI fairness review before launch; explainable "Why this study?" labels. |
| Notification fatigue (C9, Phase 2) | Medium | Default to daily digest; participant-controlled frequency; platform rate limits. |
| Scope creep into study authoring | Medium | Honor PRD non-goal NG1; authoring touched only via targeting (C5) + templates (C7). |
| Mobile overhaul (C4) is the heaviest Phase-1 lift | Medium | Build shared responsive components reused by desktop; mobile-first from day one. |

---

## Open Questions Forwarded to Design

Inherited from PRD §8 — must be resolved before or during Design:
- **OQ-2:** One-time vs. per-session Entra ID consent for role/org attributes (blocks C1/C5).
- **OQ-3:** Are impact summaries (C8) participant-only or org-discoverable?
- **OQ-4:** Appetite for the Copilot concierge (C12) — gates the V2 decision.

---

## Provenance Note

The Define-stage inputs for this Ideate run were derived from the validated HITS Study
Participation problem space (`tasks/hits-study-6048410/strategy/`) because the supplied
binary source artifact (~217 KB) was not resolvable in this environment and no source URL was
provided. Assumptions are documented at the top of `hmw-statements.md`. Re-validate against
the original source if it is later recovered.

---

## Stage Status: ✅ Complete

One winning concept (C11, delivered incrementally) is documented with a rationale tied
directly to the evaluation scores, alternatives are recorded with reasons for rejection, and
accepted risks are logged. Ready for hand-off to **Design**.

**Design needs:** this decision log · `strategy/requirements-prd.md` · `strategy/personas.md`.
