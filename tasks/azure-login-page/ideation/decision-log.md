---
title: "Decision Log — Azure Sign-In / Login Page (Ideate)"
phase: ideate
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Ideator Agent"
related:
  - "../strategy/problem-statements.md"
  - "../strategy/personas.md"
  - "../strategy/prd.md"
  - "../research/findings-synthesis.md"
  - "./hmw-questions.md"
  - "./concept-brainstorm.md"
  - "./concept-evaluation.md"
---

# Decision Log

## Purpose

Record the ideation decisions that converge the scored shortlist in
[concept-evaluation.md](./concept-evaluation.md) into a **single winning direction**
for the Azure sign-in / login page, with alternatives considered and accepted risks.
This log is the primary handoff to Design.

---

## The Chosen Concept

> **"One continuous, trust-anchored sign-in canvas"** — a single Fluent UI React v9
> page where **identify → method → verify → land** are animated *states of one
> persistent surface* (not separate screens). The surface is **passwordless-first**,
> wraps every failure in a **human, recovery-first error system**, carries a
> **branding-proof trust cue + live account/tenant context** at all times, and is
> **accessible by construction** (token-enforced theming, full keyboard, live-region
> status).

**Composition (shortlisted concept IDs):**

| Layer | Concepts | Serves |
|---|---|---|
| Carrier surface | **C1** continuous canvas · **C4** light stepper · **C2** inline type detection · **C3** warm start | P1 |
| Account model | **C35** rich account picker · **C36** tenant switcher · **C37** environment badges | P1, P6 |
| Method engine | **C13** enrollment-driven ordering · **C16** passkey-forward hero · **C14** method drawer · **C15** silent fallback · **C17** one-tap return · **C18** availability matrix | P3 |
| Trust frame | **C21** verified-surface cue · **C22** account+tenant chip · **C23** protective step-up copy · **C24** reserved trust zone | P4 |
| Error system | **C7** inline error + recovery · **C8** plain policy panel · **C9** recovery-first layout · **C10** error taxonomy | P2 |
| A11y substrate | **C28** token theme · **C29** contrast gate · **C30** keyboard+focus · **C31** color-plus-text · **C32** live-region status | P5 |

**Rationale (tied to evaluation scores):** This direction is the union of the
highest-scoring concepts in every must-have lens — it contains all five perfect-score
concepts (C7, C22, C30, C32 at **25**; plus C1/C16-tier cores) and no concept below
the shortlist bar of 18. It is the only combination that (a) covers all five
must-have problems P1–P5, (b) composes onto a *single* page surface, and (c) holds
the four Define design tensions rather than trading one away. It leans directly into
Azure's differentiators (method breadth for C13, audit-grade trust for C21/C22) while
closing the benchmarked competitive gaps G1 (entry), G2 (errors), and G3 (trust).

---

## Key Decisions

### D1 — Adopt one continuous canvas over a multi-screen wizard
- **Decision:** Build the page as a single persistent surface (C1) with in-place state
  transitions; reject full-page-reload multi-screen flows.
- **Why:** C1 scored **24**; directly serves P1 (Priority 28) / FR-1 AC2 and NFR-Perf;
  addresses Priya's #1 pain (perceived latency). Anti-pattern C6 (auto-submit) rejected
  for harming control and recovery.
- **Alternatives considered:** Classic Microsoft multi-screen wizard (familiar but
  reintroduces the perceived-latency gap G1); accordion single-page form (weaker
  method-ordering story).

### D2 — Passwordless-first is enrollment-driven, never dead-ending
- **Decision:** Order methods from MSAL/Entra enrollment state (C13), lead with a
  passkey-forward hero (C16), and guarantee a silent password fallback (C15) backed by
  a method-availability matrix (C18).
- **Why:** Serves P3 / FR-3, FR-4; C15 scored **24** and is the explicit R1 mitigation
  (never strand an un-enrolled user). Anti-pattern C20 (password-first) rejected — it is
  the legacy model P3 reverses.
- **Alternatives considered:** Hard-coded passwordless-first (rejected — violates FR-3
  AC4, breaks for un-enrolled users); password-first with passwordless opt-in (rejected —
  regresses the P3 goal and the adoption metric).

### D3 — Errors are a system, not scattered strings
- **Decision:** Build a single recovery-first error system: taxonomy/content map (C10)
  → inline specific message + adjacent recovery action (C7) → plain-language policy panel
  (C8), with recovery elevated to primary (C9).
- **Why:** C7 scored **25**; serves P2 (Priority 27) / FR-6 and the ≥90% recovery
  metric; C8 directly resolves Marcus's escalation pain. Anti-pattern C12 (generic "try
  again") is the failure mode this redesign exists to kill.
- **Alternatives considered:** Per-state one-off error copy (rejected — inconsistent,
  untestable, no a11y contract).

### D4 — Trust is a reserved, branding-proof layer
- **Decision:** A persistent verified-surface cue (C21) + live account/tenant chip
  (C22) live in a reserved trust zone (C24) that tenant branding can theme but never
  occupy; step-up challenges carry protective-framing copy (C23).
- **Why:** C22 scored **25**; serves P4 / FR-7, FR-8, FR-5; C24 is the structural
  resolution of the branding↔trust tension (R2). Anti-pattern C27 (restylable/hideable
  cue) is forbidden by FR-7 AC2.
- **Alternatives considered:** Trust cue merged into tenant-themed header (rejected —
  branding could dilute it, violating FR-7 AC2).

### D5 — Accessibility is enforced by construction, not audited after
- **Decision:** Theming flows only through Fluent v9 tokens (C28) behind a contrast-
  enforcing gate (C29); full keyboard path + visible focus (C30); color-plus-text state
  (C31); live-region status and labeled challenges (C32).
- **Why:** C30 and C32 scored **25**; NFR-A11y is a hard constraint (P5); this turns
  Okta's known theming weakness (anti-pattern C34, free-form CSS) into an Azure strength.
- **Alternatives considered:** Free-form CSS branding (C34, rejected — silently
  regresses WCAG); post-hoc audit only (rejected — cannot guarantee "zero blockers").

### D6 — Multi-account is in scope but held light, pending I7
- **Decision:** Ship the rich account picker (C35) and a ≤2-action tenant switcher (C36)
  with environment badges (C37) at **should-have** fidelity; do **not** build workspace
  grouping (C38).
- **Why:** C35 (**22**) also satisfies FR-2 for P1, so it earns its place regardless; C36/
  C37 serve Devan's incident scenario. But I7 (switching frequency/pain) is an unvalidated
  assumption, so investment stays proportionate.
- **Alternatives considered:** Full multi-tenant workspace (C38, deferred — over-invests
  ahead of I7 validation).

### D7 — On-page assistance stays explore-only and security-gated
- **Decision:** Do **not** build interactive assistance (C41 Copilot is **out** for this
  task). The only P7 content that may appear is read-only guidance (C39 "which account?",
  C40 policy explainer) — and only after a **documented security review sign-off**. C40's
  content is otherwise absorbed into the read-only policy panel C8.
- **Why:** P7 scored lowest (15); C41 scored **12** with a Viability of 1 due to the R3
  unauthenticated attack-surface risk (NFR-Sec AC2). Anti-pattern C42 (credential-taking
  help widget) is categorically forbidden.
- **Alternatives considered:** Ship a scoped Copilot now (rejected — violates PRD
  non-goal and NFR-Sec gate).

---

## Alternatives Considered (Direction-Level)

| Alternative direction | Why not chosen |
|---|---|
| **Familiar multi-screen wizard** (status-quo-plus) | Reintroduces perceived-latency gap G1; fails P1's core intent; lower ceiling on the time-to-authenticated metric. |
| **Assistance-led ("Copilot-first") sign-in** | Anchored on P7/I8 — the lowest-priority, unvalidated, highest-risk problem; C41 scored 12; blocked by NFR-Sec. Premature. |
| **Branding-maximal, per-tenant bespoke page** | Optimizes tenant expression at the cost of trust consistency (R2) and accessibility (R- Okta weakness); inverts P4/P5 priorities. |
| **Security-maximal, step-up-everywhere** | Over-applies MFA/verification, adding friction that violates P1 and the low-friction persona trait; contradicts the simplicity↔security balance. |

The chosen "continuous, trust-anchored canvas" is the balanced direction that holds
all four Define tensions instead of collapsing one.

---

## Accepted Risks

| ID | Risk | Accepted stance / mitigation | Owner-forward |
|:--:|---|---|---|
| **AR1** | **R1** — passwordless-first strands un-enrolled users | Accepted with mitigation: silent fallback (C15) + availability matrix (C18) guarantee ≥1 path (FR-4 AC3). | Design must validate against MSAL states (OQ1). |
| **AR2** | **R2** — tenant branding dilutes anti-phishing cue | Accepted with mitigation: reserved trust zone (C24) + contrast gate (C29); branding cannot occupy or breach the trust layer (FR-7 AC2). | Design + branding guardrail spec. |
| **AR3** | **R3** — on-page assistance = unauthenticated attack surface | **Risk avoided, not accepted:** C41 out of scope; C39/C40 gated on documented security review (NFR-Sec AC2). No assistance ships without sign-off. | Security review before any P7 build. |
| **AR4** | **I7 unvalidated** — multi-account switching frequency/pain | Accepted proportionate investment: C35 justified via FR-2; C36/C37 kept light; C38 deferred until I7 is validated. | Research validation of I7. |
| **AR5** | **OQ2 unknown** — MSAL feasibility of new-sign-in / device signals | Accepted deferral: C25/C19 out of the first build until OQ2 resolved; trust story stands on C21/C22/C24 without them. | Design spike on MSAL signal availability. |
| **AR6** | **R4 / no primary data** — personas & metrics are provisional | Accepted: shortlist is grounded in Established insights (I1–I6); assumption-bound concepts (C5, C38, C39–C41) are deferred/gated, limiting exposure. | Validate before scope lock / Test. |

---

## Handoff to Design

**Chosen direction:** the one continuous, trust-anchored sign-in canvas (D1–D7 above).

**Design must build (must-have, P1–P5):** C1, C2, C3, C4 · C7, C8, C9, C10 · C13, C14,
C15, C16, C17, C18 · C21, C22, C23, C24 · C28, C29, C30, C31, C32 — composed into a
single Fluent UI React v9 page.

**Design should build (should-have, P6, validate I7):** C35, C36, C37.

**Design must NOT build in this task:** C41 (Copilot) and any credential-taking help
(C42); C39/C40 only after security sign-off; C5, C11, C19, C25, C26, C33, C38 deferred.

**Traceability preserved:** every shortlisted concept maps to a problem (P1–P7), a PRD
requirement (FR-1…FR-10, NFR-A11y, NFR-Brand, NFR-Sec), and a research insight — see the
Coverage Check in [concept-evaluation.md](./concept-evaluation.md).

**Stage gate:** one winning concept documented with rationale tied to evaluation
scores, alternatives recorded, risks accepted or explicitly avoided → **Ideate
complete.** Proceed to Design with this log,
[prd.md](../strategy/prd.md), and [personas.md](../strategy/personas.md).
