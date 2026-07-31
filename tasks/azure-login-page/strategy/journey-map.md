---
title: "Current-State Journey Map — Azure Sign-In / Login Page"
phase: define
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Strategist Agent"
related:
  - "../research/research-brief.md"
  - "../research/competitive-analysis.md"
  - "../research/findings-synthesis.md"
  - "./problem-statements.md"
  - "./personas.md"
  - "./prd.md"
---

# Current-State Journey Map — Azure Sign-In

Maps the **current-state** sign-in experience for the primary personas
([Priya, Marcus, Devan](./personas.md)) across six stages, from arriving on the
page to landing in the portal. Each stage captures the user's **actions**,
**emotions**, **pain points**, and **opportunity annotations** that trace to the
[problem statements](./problem-statements.md) and research insights.

> **Evidence basis:** Current-state pain points are inferred from the competitive
> teardown and authentication UX heuristics in the Discover artifacts, **not** from
> observed sessions. Emotions are heuristic estimates to be validated with primary
> research.

## Journey at a Glance

| Stage | 1. Arrive | 2. Identify | 3. Authenticate | 4. MFA / Step-up | 5. Error / Recovery | 6. Land in Portal |
|---|---|---|---|---|---|---|
| **Emotion** | 🙂 Confident | 😐 Neutral | 😐 → 🙂 Focused | 😐 Slightly wary | 😟 Frustrated / anxious | 😀 Relieved |
| **Primary problem** | P4 | P1, P6 | P3 | P3, P4 | P2 | P4, P5 |

Emotional low point is **Stage 5 (Error / Recovery)** — the moment trust is most
at risk *(Theme 3)*.

---

## Stage 1 — Arrive

- **Persona focus:** All. Marcus also arrives via a **custom-branded** tenant URL.
- **Actions:** Navigate to the Azure portal / sign-in URL; visually scan for
  legitimacy (domain, Microsoft/tenant branding); begin sign-in.
- **Thoughts:** *"Is this the real, safe Azure page?"*
- **Emotion:** 🙂 Confident — but implicitly relying on a single visual cue.
- **Pain points:**
  - Anti-phishing depends on the user manually checking the domain *(I4)*.
  - Tenant custom branding can **dilute** the consistent trust cue *(Theme 4, gap G3)*.
- **Opportunity:** **P4** — a stable, recognizable trust cue that survives custom
  branding; consider new-sign-in / device awareness *(I4, I5)*.

## Stage 2 — Identify (identifier-first)

- **Persona focus:** Priya (personal ↔ work), Devan (multi-tenant).
- **Actions:** Enter email/phone; system detects work/school vs. personal;
  returning users see an **account picker**; page transitions to a method screen.
- **Thoughts:** *"Just get me to the right account quickly."*
- **Emotion:** 😐 Neutral, mild impatience.
- **Pain points:**
  - Identifier → method transition feels like **distinct screens**, adding
    perceived latency *(Theme 1, I1, gap G1)*.
  - Account picker can default to the **wrong account/tenant**, forcing a back-out
    *(I7)*.
- **Opportunity:** **P1** — one continuous, minimal flow (Google benchmark);
  **P6** — first-class, unambiguous multi-account/tenant switching *(I7)*.

## Stage 3 — Authenticate (choose method / credential)

- **Persona focus:** Priya & Devan (passwordless-ready), all for fallback.
- **Actions:** Choose or are presented a method; ideally approve a passkey /
  Authenticator; otherwise enter a password. "Sign in another way" exposes options.
- **Thoughts:** *"I want the passwordless tap, not to type a password."*
- **Emotion:** 😐 → 🙂 Focused; positive when passwordless is offered first.
- **Pain points:**
  - Password fallback is sometimes surfaced **before** passwordless — the inverse
    of the expected default *(Theme 2, I2)*.
  - Un-enrolled users risk being **dead-ended** if fallbacks aren't ordered well
    *(risk R1)*.
- **Opportunity:** **P3** — passwordless-first with clear, **ordered** fallbacks
  that never dead-end an un-enrolled user *(I2, O1, R1)*.

## Stage 4 — MFA / Conditional-Access Step-up

- **Persona focus:** Marcus (enforced MFA), Devan (prod step-up mid-incident).
- **Actions:** Complete MFA (number matching, security key, TOTP); satisfy
  conditional-access / device-trust checks.
- **Thoughts:** *"This should feel like protection, not a roadblock."*
- **Emotion:** 😐 Slightly wary; time pressure for Devan.
- **Pain points:**
  - Step-up can feel like **friction** rather than protection if unexplained
    *(brief RQ4)*.
  - Number-matching / multi-step transitions can be **verbose** for screen-reader
    users *(Theme 5)*.
- **Opportunity:** **P4** — frame step-up as protection with context; **P3** —
  fast trusted-device paths; **P5** — accessible, non-verbose challenge flows.

## Stage 5 — Error / Recovery *(emotional low point)*

- **Persona focus:** All — Marcus meets policy-block errors most; Devan under
  incident pressure.
- **Actions:** Encounter a failure (wrong password, unknown account, locked
  account, expired session, network error, **conditional-access / policy block**);
  try to interpret it; attempt recovery or escalate.
- **Thoughts:** *"What just happened, and what do I do now?"*
- **Emotion:** 😟 Frustrated / anxious — trust is most fragile here.
- **Pain points:**
  - Conditional-access / policy-block messages are **terse and admin-oriented**,
    stranding end users *(Theme 3, gap G2)*.
  - Users escalate to IT (Marcus) instead of self-recovering; Devan loses time
    mid-incident *(persona pains)*.
- **Opportunity:** **P2** — rewrite every recoverable error to be **specific,
  human, and paired with a clear next step**; inline recovery links *(I3, G2)*.
  Explore **P7** (scoped, security-reviewed guided help) — do not commit yet
  *(I8, R3)*.

## Stage 6 — Land in Portal

- **Persona focus:** All.
- **Actions:** Optionally choose "Stay signed in"; get handed off cleanly into the
  correct tenant/portal.
- **Thoughts:** *"Finally — and I hope I'm in the right tenant."*
- **Emotion:** 😀 Relieved.
- **Pain points:**
  - "Stay signed in" / session persistence behavior is **unpredictable** across
    devices *(Theme 1)*.
  - Uncertainty about landing in the **correct tenant** after a switch *(I7)*.
- **Opportunity:** **P4/P6** — confirm the safe landing and the active
  account/tenant; **P5** — ensure the final handoff keeps focus management intact.

---

## Cross-Journey Insights

1. **The flow feels like screens, not a path.** Perceived latency accumulates
   across Stages 2–4 *(Theme 1 → P1)*.
2. **Failure is the trust fulcrum.** Stage 5 is the emotional low point and the
   highest-leverage fix *(Theme 3 → P2)*.
3. **Security should feel earned, not imposed.** Stages 1, 4, 6 need trust cues
   that reassure rather than obstruct *(Themes 4/2 → P3, P4)*.
4. **Accessibility must hold end-to-end.** Verbose challenges and branded themes
   threaten conformance across every stage *(Theme 5 → P5)*.

## Opportunity Map (journey → problem → PRD)

| Stage | Opportunity | Problem | Feeds PRD requirement |
|---|---|:--:|---|
| 1 Arrive | Consistent trust cue under branding | P4 | FR-7, FR-8 |
| 2 Identify | Continuous minimal flow; account switch | P1, P6 | FR-1, FR-2, FR-9 |
| 3 Authenticate | Passwordless-first, ordered fallbacks | P3 | FR-3, FR-4 |
| 4 MFA / Step-up | Protective, accessible step-up | P3, P4, P5 | FR-5, NFR-A11y |
| 5 Error / Recovery | Human, actionable errors | P2 | FR-6 |
| 6 Land in Portal | Confirm safe, correct landing | P4, P6 | FR-7, FR-9 |

This journey and its opportunities are converted into concrete requirements in
the [PRD](./prd.md).
