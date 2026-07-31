---
title: "How Might We Questions — Azure Sign-In / Login Page"
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
---

# How Might We Questions

## Purpose

Reframe the ranked [problem statements](../strategy/problem-statements.md) (P1–P7)
as open-ended **How Might We (HMW)** questions to open the solution space before
diverging into concepts. Each HMW is deliberately broad enough to invite many
answers, yet anchored to a specific problem ID, persona, and the surface at hand:
a **single Fluent UI React v9 Azure portal login page** (MSAL/Entra, Azure brand
blues, WCAG 2.1 AA).

Every HMW traces back to a problem statement and its supporting insight so that
divergence in [concept-brainstorm.md](./concept-brainstorm.md) and convergence in
[concept-evaluation.md](./concept-evaluation.md) never lose the problem-ID spine.

> **Scope guardrail:** HMWs are framed only for what fits a login-page surface —
> identifier entry, method selection, passwordless/MFA, account picker, error &
> recovery, trust/anti-phishing signals, tenant branding, and *optional* on-page
> help. Out-of-scope journeys (sign-up, password-reset back-end, admin policy UI,
> post-login dashboard) are excluded per [PRD §2](../strategy/prd.md).

---

## Framing HMWs (Top-Ranked Problems)

### HMW-1 — from P1 (Streamline the identifier-first flow) · *Priya*

> **How might we** collapse the arrive → identify → method journey into one
> continuous, near-instant experience so a returning developer feels recognized
> and back to work in as few interactions as possible?

- **Traces to:** P1 (Priority 28), FR-1, FR-2 · Insight **I1**, gap **G1**, Theme 1
- **Persona pull:** Priya signs in many times a day; perceived latency is the enemy.
- **Sub-prompts:** How might we remove the *sense* of screen-to-screen jumps? How
  might we recognize a returning user before they type? How might we make the
  first primary action unmistakable?

### HMW-2 — from P2 (Human, actionable errors & recovery) · *Marcus / all*

> **How might we** turn every recoverable failure — wrong password, unknown
> account, MFA retry, conditional-access block — into a moment that tells the user
> exactly what happened and exactly what to do next, so they recover on the page
> instead of abandoning or opening a ticket?

- **Traces to:** P2 (Priority 27), FR-6 · Insight **I3**, gap **G2**, Theme 3
- **Persona pull:** Marcus's users escalate terse policy-block errors to him.
- **Sub-prompts:** How might we translate admin/policy jargon into plain language?
  How might we place the *right* recovery action next to the problem? How might we
  make an error feel like help, not a wall?

### HMW-3 — from P3 (Passwordless-first with ordered fallbacks) · *Priya / Devan*

> **How might we** present the fastest, most secure passwordless method as the
> obvious default for enrolled users while guaranteeing that an un-enrolled or
> method-unavailable user is never dead-ended?

- **Traces to:** P3 (Priority 24), FR-3, FR-4 · Insight **I2**, opp **O1**, risk **R1**
- **Persona pull:** Priya is passwordless-ready; Devan leans on device trust.
- **Sub-prompts:** How might we make passwordless feel like the easy path, not the
  advanced one? How might we order fallbacks by what the account can actually do?
  How might we degrade gracefully without ever showing an error state?

### HMW-4 — from P4 (Trust & anti-phishing under branding) · *Marcus / all*

> **How might we** give users a consistent, recognizable signal that they are on
> the genuine, safe Azure sign-in surface — one that custom tenant branding cannot
> dilute — and surface awareness of new or unrecognized sign-ins?

- **Traces to:** P4 (Priority 22), FR-5, FR-7, FR-8 · Insights **I4**, **I5**, gap **G3**, Theme 4
- **Persona pull:** Marcus owns branding *and* audit-grade trust expectations.
- **Sub-prompts:** How might we make "this is really Microsoft" legible at a
  glance? How might we show the active account/tenant so no one signs into the
  wrong place? How might we frame MFA/step-up as protection, not friction?

### HMW-5 — from P5 (Accessibility guardrails for branding) · *AT / keyboard users*

> **How might we** make WCAG 2.1 AA an unbreakable property of the page — keyboard,
> focus, contrast, labeling, target size — that holds true *even after* a tenant
> applies its own logo, colors, and background?

- **Traces to:** P5 (Priority 22), NFR-A11y, FR-8 · Insight **I6**, opp **O2**, Theme 5
- **Persona pull:** Marcus configures themes that could silently regress contrast;
  any AT/keyboard-first user must never be locked out.
- **Sub-prompts:** How might we let branding be expressive yet safe by construction?
  How might we auto-correct or reject a non-compliant theme? How might we prove
  compliance rather than hope for it?

---

## Supporting HMWs (Should-have / Explore)

### HMW-6 — from P6 (Multi-account / multi-tenant switching) · *Priya / Devan*

> **How might we** let a user juggling personal + work accounts and multiple
> tenants see, choose, and switch identities quickly and unambiguously right from
> the sign-in surface?

- **Traces to:** P6 (Priority 20, *should-have*), FR-2, FR-9 · Insight **I7** *(Assumption)*
- **Persona pull:** Priya toggles personal ↔ work; Devan jumps dev/staging/prod
  under incident pressure.
- **Held at should-have** pending primary validation of **I7**.

### HMW-7 — from P7 (Safe, scoped sign-in assistance) · *any stuck user*

> **How might we** offer a confused or blocked user scoped, plain-language guidance
> ("which account?", policy-block explanations) *without* creating a
> social-engineering or credential-harvesting surface on an unauthenticated page?

- **Traces to:** P7 (Priority 15, *could-have / explore*), FR-10 · Insight **I8**
  *(Assumption)*, opp **O3**, risk **R3**
- **Persona pull:** any user blocked at sign-in who would otherwise escalate.
- **Explore-only:** must not commit before a documented security review (NFR-Sec).

---

## HMW → Problem Traceability

| HMW | Problem | Disposition | Persona(s) | Requirements | Insight/Gap |
|:--:|:--:|---|---|---|---|
| HMW-1 | P1 | Must | Priya | FR-1, FR-2 | I1, G1 |
| HMW-2 | P2 | Must | Marcus, all | FR-6 | I3, G2 |
| HMW-3 | P3 | Must | Priya, Devan | FR-3, FR-4 | I2, O1, R1 |
| HMW-4 | P4 | Must | Marcus, all | FR-5, FR-7, FR-8 | I4, I5, G3 |
| HMW-5 | P5 | Must (constraint) | AT/keyboard users | NFR-A11y, FR-8 | I6, O2 |
| HMW-6 | P6 | Should (validate I7) | Priya, Devan | FR-2, FR-9 | I7 |
| HMW-7 | P7 | Could / explore (sec review) | any stuck user | FR-10 | I8, O3, R3 |

## Design Tensions Carried Into Brainstorm

From [problem-statements.md](../strategy/problem-statements.md) — every concept set
must hold these tensions, not ignore them:

- **Simplicity vs. security** — fewer steps without weakening MFA/CA (HMW-1 ↔ HMW-3/4).
- **Branding vs. trust consistency** — customization that can't erase the phishing cue (HMW-4).
- **Branding vs. accessibility** — themes that can't break WCAG 2.1 AA (HMW-5).
- **Assistance vs. attack surface** — help value vs. social-engineering risk (HMW-7).

Next: diverge on each HMW in
[concept-brainstorm.md](./concept-brainstorm.md).
