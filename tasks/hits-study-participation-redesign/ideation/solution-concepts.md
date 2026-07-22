---
title: "HITS Study Participation — Solution Concepts"
phase: ideate
status: draft
created: 2026-06-22
updated: 2026-06-22
author: "Ideator Agent"
related:
  - ./hmw-statements.md
  - ./concept-evaluation.md
---

# Solution Concepts — HITS Study Participation Experience

Divergent ideation against the eight HMW statements. Concepts deliberately span the range
from **conventional** (safe, incremental) to **speculative** (ambitious, higher-risk).
No filtering or scoring happens here — that is the job of `concept-evaluation.md`.

**Method:** SCAMPER applied to the current HITS participation flow, supplemented by a
Crazy-8s pass on the discovery surface. Each concept lists the SCAMPER lens that generated
it, the HMWs it addresses, and the persona it most serves.

---

## Concept Catalog

### C1 — "For You" Personalized Study Feed
*SCAMPER: Substitute (flat catalog → ranked feed)*
Replace the chronological catalog with a relevance-ranked feed driven by the opt-in
profile (role, org, interests, past participation). Top section = "Best matches for you,"
below = "Explore more." Each card carries an eligibility badge and a time estimate.
- **HMWs:** HMW-1, HMW-2, HMW-8 · **Persona:** Alex, Jordan
- **Ambition:** Conventional–Moderate

### C2 — Guided First-Run Onboarding ("Let's set you up")
*SCAMPER: Adapt (adapt consumer onboarding patterns to HITS)*
A 3-step first-visit flow: explain what HITS is + data handling, pre-populate profile from
Entra ID (with consent), then immediately show "Here are 3 studies for you." Turns an empty
wall into a confident first action.
- **HMWs:** HMW-2, HMW-8 · **Persona:** Jordan
- **Ambition:** Conventional

### C3 — Cross-Device Auto-Save & Resume
*SCAMPER: Eliminate (eliminate lost-progress failure)*
Continuous auto-save of in-progress study state to the participant's account; a "Resume
where you left off" banner on any authenticated device for up to 14 days. Session timeouts
no longer destroy work.
- **HMWs:** HMW-3 · **Persona:** Alex, Jordan
- **Ambition:** Moderate

### C4 — Mobile-First Study-Taking Shell
*SCAMPER: Reverse (reverse desktop-first → mobile-first)*
Rebuild the study-taking flow as a responsive, mobile-first shell: single-column tasks,
thumb-reachable controls, no horizontal scroll ≥320px, inline tooltips explaining what each
task measures. Desktop inherits the same components.
- **HMWs:** HMW-4 · **Persona:** Alex, Jordan
- **Ambition:** Moderate

### C5 — Profile-Based Targeting + Invite for Researchers
*SCAMPER: Combine (combine eligibility filters + recommendation engine)*
Researcher defines a target profile (≥5 attributes); HITS estimates match count pre-launch
and optionally sends targeted invites to matched, consenting employees. Shifts recruitment
from passive self-selection to active matching.
- **HMWs:** HMW-5, HMW-6 · **Persona:** Priya
- **Ambition:** Moderate–High

### C6 — Smart Pre-Enrollment Screener with Early Exit
*SCAMPER: Rearrange (move screening before time investment)*
Lightweight screener runs *before* enrollment; participants who don't qualify are told
immediately and gently, with "studies you'd be great for" alternatives — never disqualified
after investing minutes. Protects data quality and dignity at once.
- **HMWs:** HMW-5, HMW-2 · **Persona:** Jordan, Priya
- **Ambition:** Moderate

### C7 — Screener Template Library
*SCAMPER: Combine / Reuse (reusable qualification modules)*
A library of ≥10 vetted screener templates researchers can clone and modify, plus the
ability to save their own modules. Eliminates rebuilding qualification logic each study.
- **HMWs:** HMW-6 · **Persona:** Priya
- **Ambition:** Conventional

### C8 — "Your Impact" Closing Loop
*SCAMPER: Put to other use (turn the dead-end thank-you into a channel)*
Replace the generic thank-you with a persistent "Your Impact" space: researchers publish a
short post-study impact summary (one-click, auto-distributed); participants see "what changed
because of you" weeks later, plus participation milestones.
- **HMWs:** HMW-7 · **Persona:** Alex, Jordan, Priya
- **Ambition:** Moderate

### C9 — Matched-Study Notifications (Teams + Email Digest)
*SCAMPER: Adapt (proactive notification instead of pull)*
When a new study matches a participant's profile, notify via Teams activity feed and/or a
daily email digest. Frequency is participant-controlled (immediate / daily / off) to avoid
fatigue. Brings the right study to the participant instead of waiting for a visit.
- **HMWs:** HMW-1, HMW-7 · **Persona:** Alex, Jordan
- **Ambition:** Moderate

### C10 — In-Study Progress & Time-Remaining Bar
*SCAMPER: Magnify (make hidden progress visible)*
A persistent progress bar with accurate "≈X min left" estimate, updating after each task.
Reduces uncertainty-driven abandonment and helps time-boxed participants commit.
- **HMWs:** HMW-3, HMW-4 · **Persona:** Alex
- **Ambition:** Conventional

### C11 — Unified "Research Companion" Platform (Integrated Concept)
*SCAMPER: Combine (fuse C1–C10 into one coherent platform)*
A single reimagined participation platform: consent-driven profile powers a personalized
feed (C1) and proactive notifications (C9); guided onboarding (C2) brings newcomers in;
a mobile-first shell (C4) with auto-save (C3) and progress bar (C10) removes completion
friction; pre-enrollment smart screeners (C6) and researcher targeting + templates (C5, C7)
protect matching and efficiency; and a "Your Impact" loop (C8) closes the cycle. One profile,
one trust contract, end-to-end. Sequenced to the PRD's four delivery phases.
- **HMWs:** HMW-1 through HMW-8 (all) · **Persona:** All three
- **Ambition:** High (program-level)

### C12 — Copilot Study Concierge (Speculative)
*SCAMPER: Adapt (conversational AI as the discovery + authoring surface)*
A Copilot-style assistant: participants ask "find me a 5-minute study about Teams" and get
matched instantly; researchers describe a target cohort in natural language and Copilot
drafts screener + targeting. Conversational layer over the matching engine.
- **HMWs:** HMW-1, HMW-5, HMW-6 · **Persona:** Alex, Priya
- **Ambition:** Speculative (ties to PRD Open Question OQ-4)

---

## Coverage Check — Every HMW Has Multiple Concepts

| HMW | Concepts addressing it |
|-----|------------------------|
| HMW-1 Discoverability | C1, C9, C11, C12 |
| HMW-2 Onboarding | C1, C2, C6, C11 |
| HMW-3 Completion/resume | C3, C10, C11 |
| HMW-4 Mobile parity | C4, C10, C11 |
| HMW-5 Matching | C5, C6, C11, C12 |
| HMW-6 Researcher efficiency | C5, C7, C11, C12 |
| HMW-7 Feedback loop | C8, C9, C11 |
| HMW-8 Consent-driven trust | C1, C2, C11 |

All eight HMWs are covered by at least three concepts — divergence is sufficient to proceed
to evaluation.

---

## Spectrum Summary

| Ambition tier | Concepts |
|---------------|----------|
| Conventional | C2, C7, C10 |
| Moderate | C1, C3, C4, C6, C8, C9 |
| High / Speculative | C5, C11, C12 |

---

## Next Step

Carry all twelve concepts into **Concept Evaluation** (`concept-evaluation.md`) for scoring
on value × effort × risk, then shortlist for the decision log.
