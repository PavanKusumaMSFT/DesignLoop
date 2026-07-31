---
title: "Research Brief — Azure Sign-In / Login Page Redesign"
phase: discover
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Researcher Agent"
related:
  - "./competitive-analysis.md"
  - "./findings-synthesis.md"
---

# Research Brief — Azure Sign-In / Login Page

## 1. Background & Context

We are designing a login/sign-in page for the **Azure portal** experience. The
sign-in surface is the first — and highest-stakes — touchpoint of the entire
Azure journey: it must earn trust in seconds, authenticate securely, and hand
the user off cleanly into the portal. Authentication is powered by
**Microsoft accounts via MSAL** (Microsoft Authentication Library), so the
design must align with the Microsoft identity platform's supported flows
(password, passwordless, MFA, conditional access, work/school vs. personal
accounts).

The prototype will be built in **Fluent UI React v9** inside the repo's
`prototype-workspace`, so recommendations should map to components and tokens
available in that system.

> **Evidence basis:** This is the Discover stage of a full design lifecycle. We
> do **not** have live, primary user data (interviews, telemetry, usability
> sessions) for this specific redesign. All insights in this brief and its
> companion artifacts are **grounded in well-established authentication UX
> heuristics and secondary research** — Nielsen Norman Group usability
> heuristics, WCAG 2.1 AA, WebAuthn/FIDO2 and passwordless guidance, and
> published Microsoft identity platform documentation. Findings are labeled
> accordingly and should be validated with primary research before Define
> commits to scope.

## 2. Goals

1. Define what "good" looks like for an enterprise-grade Azure sign-in page
   across security, usability, trust, and accessibility.
2. Establish the competitive baseline (how peer clouds and identity providers
   handle sign-in) to identify gaps and opportunities.
3. Produce a synthesized, ranked set of opportunity areas that the Strategist
   can turn into a problem statement and design principles in Define.

## 3. Research Questions

**Usability & flow**
- RQ1. What is the minimal, clearest path from landing on the page to an
  authenticated session for the primary account types (work/school, personal)?
- RQ2. How should the page handle the "identifier-first" pattern (email →
  then method) that MSAL/Entra uses, without confusing users?

**Security & method support**
- RQ3. How do we present passwordless (passkeys/FIDO2, Authenticator app) as a
  first-class, preferred option while still supporting password + MFA fallbacks?
- RQ4. How do we communicate MFA/conditional-access steps so they feel like
  protection rather than friction?

**Error handling & recovery**
- RQ5. What are the common failure and edge states (wrong password, unknown
  account, locked account, expired session, network error, blocked by policy),
  and how should each be surfaced and recovered from?

**Trust & branding**
- RQ6. Which trust and security signals meaningfully reduce phishing risk and
  increase user confidence at sign-in?
- RQ7. How do we balance Microsoft/Azure branding with tenant-level custom
  branding (org logos, backgrounds) that enterprises expect?

**Accessibility**
- RQ8. What must the page do to meet WCAG 2.1 AA (keyboard, focus, contrast,
  screen-reader labeling, error identification, target size)?

**Assistance**
- RQ9. Where, if anywhere, do help or Copilot-style affordances belong on a
  sign-in page without becoming a security/attack surface?

## 4. Scope

**In scope**
- The sign-in page and its immediate states: identifier entry, credential/method
  entry, MFA challenge, error/recovery states, "stay signed in", account picker,
  and tenant-branded variants.
- Desktop-first responsive layout down to mobile web.
- Fluent UI React v9 component and token mapping for the prototype.

**Out of scope (for this stage / task)**
- Full account creation / sign-up flows (touched only where they intersect the
  sign-in entry point).
- Password reset back-end and email flows (we cover the entry link and return
  state only).
- Admin-side conditional access policy configuration UI.
- Post-login portal dashboard.

## 5. Methods (this stage)

| Method | Status | Notes |
|---|---|---|
| Secondary research / heuristic review | Done | Auth UX heuristics, WCAG 2.1 AA, FIDO2/WebAuthn, MSAL/Entra docs |
| Competitive teardown | Done | 5+ sign-in experiences — see `competitive-analysis.md` |
| Findings synthesis | Done | Themes + ranked opportunities — see `findings-synthesis.md` |
| Primary user interviews | **Not conducted** | Recommended before Define locks scope |
| Telemetry / analytics review | **Not available** | Recommended if portal sign-in data accessible |

## 6. Participant Profile (target audience)

The audience for the Azure portal sign-in are technical, security-aware
professionals who sign in frequently and often from managed devices.

- **Enterprise cloud developers** — sign in multiple times daily; value speed,
  SSO, and passwordless; may switch between personal and work tenants.
- **IT administrators** — highly security-conscious; manage tenant branding and
  conditional access; expect MFA and audit-grade trust signals.
- **DevOps / SRE engineers** — often authenticate via automation-adjacent flows;
  care about session persistence, device trust, and quick recovery from
  policy-blocked states.

**Shared characteristics:** high digital literacy, low tolerance for friction,
high expectation of security, frequent multi-account/multi-tenant switching,
often on corporate-managed devices with device-based conditional access.

**Recommended recruiting for future primary research:** 6–8 participants split
across the three roles, mix of personal + work/school account users, at least
2 assistive-technology users (screen reader / keyboard-only).

## 7. Success Criteria

The redesign research is successful if it enables Define to commit to a scope
with confidence. Design/product success metrics to carry forward:

**Research-stage success (this deliverable set)**
- Clear, ranked opportunity areas with rationale (see findings-synthesis).
- Competitive baseline with scored matrix and identified gaps.
- Traceable link from each opportunity back to a heuristic or competitive gap.

**Downstream product success metrics (proposed, to validate)**
- **Task success:** ≥ 95% successful sign-in completion for valid credentials.
- **Efficiency:** reduced median time-to-authenticated for returning users;
  fewer steps for passwordless.
- **Error recovery:** ≥ 90% of users who hit a recoverable error (wrong
  password, MFA retry) recover without abandoning.
- **Security posture:** increased passwordless/MFA adoption at sign-in.
- **Accessibility:** 0 WCAG 2.1 AA blockers; full keyboard + screen-reader path.
- **Trust:** measurable reduction in phishing-susceptibility signals (e.g.,
  users confirming they check the domain / branding cues).

## 8. Assumptions & Constraints

- Authentication is MSAL/Entra-backed; the page presents flows the identity
  platform supports (identifier-first, passwordless, MFA, conditional access).
- Prototype constrained to Fluent UI React v9 components/tokens.
- Tenant custom branding must be supported without breaking accessibility or
  anti-phishing guidance.
- No live user data this stage — insights are heuristic/secondary and flagged
  as such.

## 9. Risks & Open Questions

- **R1.** Passwordless-first may conflict with users who have not enrolled a
  passkey/Authenticator — fallback ordering must be validated.
- **R2.** Tenant custom branding can weaken consistent anti-phishing cues.
- **R3.** Copilot/help affordances on an unauthenticated page are a potential
  attack/social-engineering surface — needs security review before adoption.
- **R4.** Without primary data, method-preference and error-frequency
  assumptions are unvalidated.

## 10. Handoff to Define

The Strategist should consume:
- This brief (scope + research questions),
- `competitive-analysis.md` (landscape, scored matrix, gaps),
- `findings-synthesis.md` (themes + ranked opportunities),

and translate the ranked opportunities into a problem statement, design
principles, and prioritized requirements — while commissioning primary research
to validate the heuristic-grounded assumptions flagged above.
