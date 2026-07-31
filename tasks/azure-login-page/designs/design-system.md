---
title: "Design System — Azure Sign-In / Login Page"
phase: design
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Designer Agent"
related:
  - "../ideation/decision-log.md"
  - "../ideation/concept-evaluation.md"
  - "../strategy/prd.md"
  - "../strategy/personas.md"
  - "./wireframes/index.md"
  - "./wireframes/login-page.md"
  - "./tokens/fluent-theme.md"
  - "./tokens/token-usage-guide.md"
---

# Design System — Azure Sign-In / Login Page

The assembled design-system index for the Azure sign-in / login page. It composes the winning
Ideate concept — **"One continuous, trust-anchored sign-in canvas"**
([decision-log.md](../ideation/decision-log.md)) — into **one** Fluent UI React v9 page at
`app/azure-login-page/page.tsx`, built entirely from Fluent v9 primitives, Fluent tokens, and an
Azure brand theme. Everything here traces to the PRD (FR/NFR) and personas P1–P7 (referenced as
Priya/Marcus/Devan across problems P1–P7).

## 1. Theme

- **Base:** `webLightTheme` + **Azure brand ramp** via `createLightTheme` (anchors `#0078D4` /
  `#106EBE` / `#005A9E`). Full snippet and contrast gate in
  [tokens/fluent-theme.md](./tokens/fluent-theme.md).
- **Token families:** `colorBrand*`, `colorNeutral*`, `colorPaletteRed/Green/Yellow*`,
  `spacing*`, `fontSize*`/`fontWeight*`/`lineHeight*`, `borderRadius*`, `shadow*`, `duration*` —
  mapped per region in [tokens/token-usage-guide.md](./tokens/token-usage-guide.md).
- **Tenant branding = theme overrides only**, passed through a **contrast-enforcing gate** (C29)
  that auto-corrects or rejects any pairing below WCAG AA (NFR-A11y AC6, FR-8 AC2). The reserved
  trust zone is immune to tenant overrides (FR-7 AC2).

## 2. Component Inventory

All components are new, project-scoped under
`components/projects/azure-login-page/`. **Reuse audit result:** the workspace has a *sign-up*
page and `signup-modal` but **no login/sign-in surface, trust cue, method selector, or error
system** — none reusable. Reusable helpers referenced: `components/shared/safe-latency-loader`
(loading spinner) and `components/shared/prototype-footer` (footer link-row conventions, not the
component itself). `ProjectLayout` is intentionally **not** used (it injects post-login portal
chrome).

| Component | Spec | State(s) | Fluent primitives | Concepts | PRD |
|---|---|---|---|---|---|
| `LoginPage` | [components/LoginPage.md](./components/LoginPage.md) | shell / orchestrator | `FluentProvider`, `makeStyles` | C1, C24, C28, C30, C32 | FR-1, FR-7, FR-8, NFR-A11y/Perf |
| `SignInCard` | [components/SignInCard.md](./components/SignInCard.md) | shell of S1–S7 | `Card`, `Title2`, `Body1`, `Divider`, `Spinner` | C1, C7, C9 | FR-1, FR-6 |
| `TrustHeader` | [components/TrustHeader.md](./components/TrustHeader.md) | persistent | `Text`, `Badge`, `Menu` | C21, C22, C24, C36, C37 | FR-7, FR-9 |
| `IdentityInput` | [components/IdentityInput.md](./components/IdentityInput.md) | S1 | `Field`, `Input`, `Button`, `Link` | C1, C2, C3, C4 | FR-1 |
| `AccountPicker` | [components/AccountPicker.md](./components/AccountPicker.md) | S1b | `Avatar`, `Badge`, `Button` | C35, C36, C37 | FR-2, FR-9 |
| `IdentityMethodList` | [components/IdentityMethodList.md](./components/IdentityMethodList.md) | S2 | `Button`, `Divider`, `Menu`/`Drawer` | C13–C18 | FR-3, FR-4 |
| `PasswordEntry` | [components/PasswordEntry.md](./components/PasswordEntry.md) | S3 | `Field`, `Input`, `Checkbox`, `Link` | C15 | FR-3, FR-4, FR-5 |
| `MfaVerify` | [components/MfaVerify.md](./components/MfaVerify.md) | S4 | `Field`, `Input`, `Spinner`, `Checkbox` | C23 | FR-5 |
| `ErrorRecovery` | [components/ErrorRecovery.md](./components/ErrorRecovery.md) | S5 | `MessageBar`, `Accordion` | C7, C8, C9, C10 | FR-6 |
| `TrustFooter` | [components/TrustFooter.md](./components/TrustFooter.md) | persistent | `Text`, `Link`, `Divider` | C24, C21 | FR-7, NFR-Sec |

S6 (loading) and S7 (success) are rendered inside `SignInCard` (`Spinner`, success icon), not
separate components.

## 3. Usage Guidelines

1. **One surface, in-place states.** All state changes swap only the body inside `SignInCard`;
   `TrustHeader`/`TrustFooter` stay mounted — no full-page reload, no unbranded flash (FR-1 AC2,
   NFR-Perf).
2. **Passwordless-first is data-driven.** `IdentityMethodList` orders methods from the auth
   adapter's enrollment state (FR-3 AC4) — never hardcode order.
3. **Never dead-end.** The availability matrix guarantees ≥1 path; password is the silent
   fallback floor (FR-4). Every method/challenge has a one-action return to method selection.
4. **Errors are a system.** All error copy comes from the taxonomy in
   [components/ErrorRecovery.md](./components/ErrorRecovery.md); each has an adjacent recovery
   action and, for policy blocks, a plain-language panel (FR-6).
5. **Trust is reserved and branding-proof.** The verified-surface cue + account/tenant chip live
   in a zone tenant branding can theme *around* but never occupy, restyle, or hide (FR-7 AC2).
6. **Theme, never CSS.** Style only via `makeStyles` + Fluent tokens; brand only via the theme
   ramp; tenant branding only via gated theme overrides (NFR-Brand, FR-8).
7. **Accessible by construction.** Full keyboard path, focus moved to each new state heading,
   live-region status, color-plus-text state, ≥44×44 targets, contrast gate — targeting **zero
   WCAG 2.1 AA blockers** (NFR-A11y AC5).

## 4. Do / Don't Patterns

| ✅ Do | ❌ Don't |
|---|---|
| Lead with the enrolled passwordless method as the primary action (FR-3 AC1). | Show password first when passwordless is enrolled (anti-pattern C20). |
| Cross-fade only the card body between states (FR-1 AC2). | Navigate to separate full-page screens / reload (rejected in D1). |
| Give every error a specific message + adjacent recovery (C7, FR-6 AC3). | Use generic "Something went wrong / try again" (anti-pattern C12). |
| Explain conditional-access blocks in plain language (C8, FR-6 AC2). | Surface terse admin-only policy jargon to end users. |
| Keep the verified-surface cue fixed and always visible (FR-7 AC1). | Let tenant branding restyle or hide the trust cue (anti-pattern C27). |
| Apply brand via `colorBrand*` theme tokens (NFR-Brand AC2). | Hardcode hex (except the 3 brand blues) / free-form CSS (anti-pattern C34). |
| Pair every state signal with icon + text (NFR-Brand AC3, C31). | Convey state by color alone. |
| Gate any on-page assistance on security sign-off (D7, AR3). | Ship a credential-taking help widget on the unauthenticated page (C42, NFR-Sec). |
| Detect account type inline; advance without re-typing (FR-1 AC4, FR-2 AC2). | Require a manual work/personal toggle or force re-entry of the identifier. |
| Announce status via live regions; move focus to new headings (C32, NFR-A11y). | Change state silently for screen-reader/keyboard users. |

## 5. Scope Guardrails (from Ideate D6/D7)

- **Should-have, kept light:** `AccountPicker` tenant switching + environment badges (C35–C37) —
  validate assumption I7 before deeper investment (AR4).
- **Explicitly not built:** on-page Copilot (C41) and any credential-taking help (C42);
  read-only "which account?" / policy explainer (C39/C40) permitted **only** after documented
  security review (AR3). C40's content is otherwise absorbed into `ErrorRecovery`'s policy panel.
- **Deferred pending tech/assumption validation:** predictive prefill (C5), device-trust express
  lane (C19), new-sign-in awareness (C25), workspace grouping (C38) — not in this build.

## 6. Handoff to Prototype

Build order: `LoginPage` shell + theme → `TrustHeader`/`TrustFooter` → `SignInCard` → state
bodies (`IdentityInput`, `AccountPicker`, `IdentityMethodList`, `PasswordEntry`, `MfaVerify`) →
`ErrorRecovery` taxonomy. Wire the state machine per
[wireframes/login-page.md](./wireframes/login-page.md) §2. Reference
`prototype-workspace/AGENTS.md`, `component-map.json`, and `components/shared/` throughout.
Open items to resolve in Prototype/Test: MSAL enrollment-state feasibility (OQ1/AR1) and
MSAL device/new-sign-in signals (AR5).

## 7. Traceability Recap

Must-have problems **P1–P5** are fully covered on one surface; **P6** is served at should-have
fidelity; **P7** is intentionally absent (gated). Every component maps to shortlisted concepts
and PRD requirements — see the per-component "Traceability" sections and
[concept-evaluation.md](../ideation/concept-evaluation.md) §Coverage Check.
