---
title: "Product Requirements Document (PRD) — Azure Sign-In / Login Page"
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
  - "./journey-map.md"
---

# PRD — Azure Sign-In / Login Page

## 1. Summary

Redesign the **Azure portal sign-in page** so that Azure's frequent,
security-conscious technical users ([Priya, Marcus, Devan](./personas.md)) sign
in **faster and passwordless-first**, recover **effortlessly** from errors, and
always feel **certain they are in the right, safe place** — across personal and
work accounts, custom-branded tenants, and assistive technologies.

Authentication is **MSAL / Microsoft Entra**-backed; the prototype is built in
**Fluent UI React v9**. Requirements trace to the ranked
[problem statements](./problem-statements.md), the
[journey map](./journey-map.md), and the Discover
[findings-synthesis](../research/findings-synthesis.md).

## 2. Goals & Non-Goals

**Goals**
- Minimize steps and perceived latency on the identifier-first path *(P1)*.
- Make passwordless the default preferred method, with safe fallbacks *(P3)*.
- Make every recoverable error human, specific, and actionable *(P2)*.
- Provide trust/anti-phishing cues that survive tenant branding *(P4)*.
- Enforce WCAG 2.1 AA even under custom branding *(P5)*.

**Non-Goals (this task)** — from [research brief §4](../research/research-brief.md):
- Full account creation / sign-up flows.
- Password-reset back-end and email flows (entry link + return state only).
- Admin-side conditional-access policy configuration UI.
- Post-login portal dashboard.
- Committing to on-page Copilot/assistance before security review *(P7, R3)*.

## 3. Personas Served

See [personas.md](./personas.md): **Priya** (Enterprise Developer), **Marcus**
(IT Administrator), **Devan** (DevOps / SRE). Shared traits: high digital
literacy, low friction tolerance, high security expectations, frequent
multi-account/tenant switching, managed devices.

## 4. Constraints

| Constraint | Detail |
|---|---|
| **Design system** | **Fluent UI React v9** components & design tokens only |
| **Identity platform** | **MSAL / Microsoft Entra** — identifier-first, passwordless, MFA, conditional access, work/school + personal accounts |
| **Brand palette** | Azure blues **#0078D4** (primary), **#106EBE** (hover/pressed), **#005A9E** (active/deep); use Fluent tokens mapped to these |
| **Accessibility** | **WCAG 2.1 AA** — keyboard, focus, contrast (≥4.5:1 text / ≥3:1 UI + large text), labeling, error identification, target size (≥24×24 CSS px, prefer 44×44) |
| **Responsive** | Desktop-first, responsive down to mobile web |
| **Branding** | Tenant custom branding (logo, background, text) supported without breaking accessibility or anti-phishing guidance |
| **Security** | Unauthenticated surface — no feature may introduce a social-engineering/attack vector (brief R3) |

---

## 5. Functional Requirements

> Every **must-have** requirement below carries explicit **acceptance criteria**.
> Priority uses MoSCoW; traceability links to problems, journey stages, insights.

### FR-1 — Continuous identifier-first entry *(Must)* — P1, Stage 2, I1
The page presents a single, continuous identifier-first flow that minimizes
perceived screen-to-screen transitions.

**Acceptance criteria**
- [ ] AC1: An identifier (email/phone) can be entered and submitted from the first
  screen with a single primary action.
- [ ] AC2: Transition from identifier to method screen occurs without a full-page
  reload and preserves visual continuity (shared layout/branding, no flash).
- [ ] AC3: Median returning-user path from arrive → method screen is **≤ 2
  interactive steps**.
- [ ] AC4: Work/school vs. personal account detection is automatic; no user-visible
  account-type toggle is required.

### FR-2 — Returning-user account picker *(Must)* — P1/P6, Stage 2, I7
Returning users see a recognizable account picker to select a known account
without re-typing.

**Acceptance criteria**
- [ ] AC1: Previously used accounts are listed with display name + account/tenant
  hint (personal vs. work/school).
- [ ] AC2: Selecting an account advances to its method screen without re-entering
  the identifier.
- [ ] AC3: An explicit "Use another account" affordance is always available.

### FR-3 — Passwordless-first method ordering *(Must)* — P3, Stage 3, I2/O1
When the user has an enrolled passwordless method (passkey/FIDO2, Microsoft
Authenticator, Windows Hello), it is presented as the **default preferred**
option, above password.

**Acceptance criteria**
- [ ] AC1: If ≥1 passwordless method is enrolled, a passwordless option is the
  visually primary default on the method screen.
- [ ] AC2: Password appears as a clearly available but secondary/fallback option.
- [ ] AC3: "Sign in another way" exposes all supported methods available to the
  account.
- [ ] AC4: Method ordering is driven by MSAL/Entra-reported enrollment state, not
  hard-coded.

### FR-4 — Graceful fallback (no dead-ends) *(Must)* — P3, Stage 3, R1
No user is ever dead-ended; an un-enrolled or method-unavailable user always has a
working path forward.

**Acceptance criteria**
- [ ] AC1: If no passwordless method is enrolled, password (or another supported
  method) is offered automatically without an error state.
- [ ] AC2: If a chosen method fails/unavailable, the user can return to method
  selection in one action.
- [ ] AC3: At least one usable authentication path is presented in every account
  state (validated against MSAL states; see open question OQ1).

### FR-5 — MFA / conditional-access step-up as protection *(Must)* — P3/P4, Stage 4, RQ4
MFA and conditional-access step-up are presented with brief context that frames
them as protection, and remain fully accessible.

**Acceptance criteria**
- [ ] AC1: Each step-up challenge includes a plain-language line stating why it is
  required (e.g., "Extra verification is required by your organization").
- [ ] AC2: Number-matching / security-key / TOTP challenges are keyboard-operable
  and screen-reader-labeled (see NFR-A11y).
- [ ] AC3: Trusted-device / "stay signed in" state, when applicable, is honored so
  repeat step-up is not requested unnecessarily.

### FR-6 — Human, actionable error & recovery states *(Must)* — P2, Stage 5, I3/G2
Every recoverable failure state shows a specific, human message and a clear next
step, including conditional-access/policy blocks.

**Acceptance criteria**
- [ ] AC1: The following states each have a specific message + actionable next
  step: wrong password, unknown account, locked account, expired session, network
  error, **conditional-access / policy block**.
- [ ] AC2: No end-user-facing error uses terse admin-only jargon without a
  plain-language explanation.
- [ ] AC3: Recoverable errors present an inline recovery action (e.g., "Forgot
  password", "Try another method", "Try again") adjacent to the message.
- [ ] AC4: Errors are programmatically associated with their field/context
  (`aria-describedby` / role="alert") for assistive tech (see NFR-A11y).

### FR-7 — Consistent anti-phishing trust cue *(Must)* — P4, Stages 1/6, I4
The page presents a consistent, recognizable trust cue (genuine Azure sign-in
surface + clear domain/account context) that persists even under tenant branding.

**Acceptance criteria**
- [ ] AC1: A consistent Microsoft/Azure trust element (e.g., verified sign-in
  surface indicator + account/tenant context) is present in all branding
  configurations.
- [ ] AC2: Tenant custom branding cannot remove or fully obscure the consistent
  trust cue.
- [ ] AC3: The active account and tenant are clearly displayed before final
  submission and at landing.

### FR-8 — Trust-preserving tenant custom branding *(Should)* — P4, Stage 1, RQ7
Tenants can apply logo, background, and sign-in text within guardrails that
protect trust and accessibility.

**Acceptance criteria**
- [ ] AC1: Logo, background, and sign-in text are themeable via Fluent UI v9 tokens.
- [ ] AC2: Branding inputs that would violate FR-7 or NFR-A11y are rejected or
  auto-corrected (see NFR-A11y AC on contrast enforcement).

### FR-9 — Multi-account / multi-tenant switching *(Should)* — P6, Stages 2/6, I7
Users can view and switch between accounts/tenants quickly and unambiguously.
*(Held as should-have pending primary validation of I7.)*

**Acceptance criteria**
- [ ] AC1: Switching account/tenant is reachable in ≤ 2 actions from the method or
  landing surface.
- [ ] AC2: The target account/tenant is unambiguously labeled before and after the
  switch.

### FR-10 — Scoped sign-in assistance *(Could / Explore)* — P7, Stage 5, I8/R3
Explore scoped, plain-language help (e.g., "which account?", policy-block
explanations). **Not committed** — gated on security review (brief R3).

**Acceptance criteria (gating, not delivery)**
- [ ] AC1: No assistance affordance ships without a completed security review
  sign-off documented in handoff.
- [ ] AC2: Any assistance is read-only/guidance-only and requests no credentials or
  secrets on the unauthenticated page.

---

## 6. Non-Functional Requirements

### NFR-A11y — WCAG 2.1 AA (enforced, branding-proof) *(Must)* — P5, I6
**Acceptance criteria**
- [ ] AC1: Full keyboard operability with a visible, logical focus order across all
  stages (identify → land).
- [ ] AC2: Text contrast ≥ **4.5:1**, and UI-component/large-text contrast ≥
  **3:1**, in default **and** every permitted tenant branding configuration.
- [ ] AC3: All inputs, buttons, and challenges have programmatic names/labels; error
  identification meets SC 3.3.1 and status uses `role="alert"`/live regions.
- [ ] AC4: Interactive targets are ≥ **24×24 CSS px** (target ≥ 44×44).
- [ ] AC5: Automated + manual audit (screen reader + keyboard-only) yields **zero
  WCAG 2.1 AA blockers** — the brief's success bar.
- [ ] AC6: Tenant branding that would breach AC2/AC3 is enforced-corrected or
  rejected (ties to FR-8).

### NFR-Brand — Fluent UI v9 + Azure palette fidelity *(Must)*
**Acceptance criteria**
- [ ] AC1: All UI is composed from **Fluent UI React v9** components/tokens.
- [ ] AC2: Primary actions use **#0078D4**; hover/pressed **#106EBE**; active/deep
  **#005A9E**, applied via Fluent theme tokens (not ad-hoc hex).
- [ ] AC3: Color is never the sole means of conveying state (paired with text/icon).

### NFR-Perf — Perceived performance *(Should)*
**Acceptance criteria**
- [ ] AC1: Stage-to-stage transitions render without full-page reload where the
  MSAL flow allows.
- [ ] AC2: No visible layout shift/flash of unbranded content between stages.

### NFR-Sec — Unauthenticated-surface safety *(Must)*
**Acceptance criteria**
- [ ] AC1: No requirement introduces a feature that collects credentials/secrets
  outside the MSAL-governed flow.
- [ ] AC2: Any exploratory assistance (FR-10) is blocked until security sign-off.

### NFR-Responsive — Desktop-first responsive *(Should)*
**Acceptance criteria**
- [ ] AC1: Layout is usable and passes NFR-A11y from desktop down to mobile-web
  breakpoints without horizontal scrolling of core actions.

---

## 7. Requirement → Problem → Research Traceability

| Req | Problem | Journey stage | Research insight / gap |
|---|:--:|---|---|
| FR-1 | P1 | 2 | I1, G1, Theme 1 |
| FR-2 | P1/P6 | 2 | I7 |
| FR-3 | P3 | 3 | I2, O1, Theme 2 |
| FR-4 | P3 | 3 | R1 |
| FR-5 | P3/P4 | 4 | RQ4 |
| FR-6 | P2 | 5 | I3, G2, Theme 3 |
| FR-7 | P4 | 1/6 | I4, G3, Theme 4 |
| FR-8 | P4 | 1 | RQ7, O2 |
| FR-9 | P6 | 2/6 | I7 (assumption) |
| FR-10 | P7 | 5 | I8, O3, R3 |
| NFR-A11y | P5 | all | I6, O2, Theme 5 |

---

## 8. Success Metrics

Carried from [research brief §7](../research/research-brief.md); baselines to be
established before Test.

| Metric | Target | Source problem |
|---|---|---|
| Sign-in completion (valid credentials) | **≥ 95%** | P1 |
| Median time-to-authenticated (returning) | **Reduced** vs. baseline; fewer steps for passwordless | P1, P3 |
| Recoverable-error recovery without abandonment | **≥ 90%** | P2 |
| Passwordless / MFA adoption at sign-in | **Increase** vs. baseline | P3 |
| WCAG 2.1 AA blockers | **0**; full keyboard + screen-reader path | P5 |
| Phishing-susceptibility signals (domain/branding check) | **Measurable reduction** | P4 |

---

## 9. Assumptions, Risks & Open Questions

**Assumptions (validate before scope lock):**
- **I7** — multi-account/tenant switching frequency/pain (drives FR-9 priority).
- **I8** — value of on-page assistance (drives FR-10).

**Risks:**
- **R1** — passwordless-first can strand un-enrolled users → mitigated by FR-4.
- **R2** — tenant branding weakens anti-phishing cues → mitigated by FR-7/FR-8.
- **R3** — assistance on unauthenticated page is an attack surface → FR-10 gated by
  NFR-Sec.
- **R4** — no primary data yet → metrics/assumptions require validation.

**Open questions:**
- **OQ1:** Full enumeration of MSAL/Entra account states to guarantee FR-4 AC3.
- **OQ2:** Which device-verification / new-sign-in signals (GitHub-style, I5) are
  feasible within MSAL for FR-7.
- **OQ3:** Security-review outcome for FR-10.

## 10. Definition of Done (stage gate)

The PRD is complete when **every must-have requirement (FR-1–FR-7, NFR-A11y,
NFR-Brand, NFR-Sec) has explicit acceptance criteria** — satisfied above — and
each requirement traces to a problem statement and a research insight (§7). This
PRD, with [problem-statements.md](./problem-statements.md) and
[personas.md](./personas.md), is the handoff package to Ideate.
