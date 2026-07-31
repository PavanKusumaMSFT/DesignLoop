---
title: "Wireframe Spec — Azure Sign-In / Login Page"
phase: design
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Designer Agent"
related:
  - "../../ideation/decision-log.md"
  - "../../ideation/concept-evaluation.md"
  - "../../strategy/prd.md"
  - "../../strategy/personas.md"
  - "./index.md"
  - "../components/LoginPage.md"
  - "../components/SignInCard.md"
  - "../components/TrustHeader.md"
  - "../components/IdentityInput.md"
  - "../components/AccountPicker.md"
  - "../components/IdentityMethodList.md"
  - "../components/PasswordEntry.md"
  - "../components/MfaVerify.md"
  - "../components/ErrorRecovery.md"
  - "../components/TrustFooter.md"
  - "../tokens/token-usage-guide.md"
---

# Wireframe Spec — Azure Sign-In / Login Page

> One continuous, trust-anchored sign-in canvas. Single Fluent UI React v9 page,
> route `app/azure-login-page/page.tsx`. All seven states are in-place transitions of
> **one persistent surface** — never separate screens (decision **D1**, FR-1 AC2).

## 1. Global Layout

Desktop-first, centered single-column card on a full-viewport neutral canvas.
Responsive down to mobile-web with no horizontal scroll of core actions
(NFR-Responsive AC1).

```
┌───────────────────────────────────────────── viewport (colorNeutralBackground2 / tenant bg) ─┐
│                                                                                               │
│                       ┌───────── TRUST HEADER (reserved, persistent) ─────────┐               │
│                       │  [Microsoft] │ ✓ Verified sign-in   │ [account/tenant chip ▾]         │
│                       └────────────────────────────────────────────────────────┘             │
│                       ┌──────────────── SIGN-IN CARD (Card, max 440px) ─────────┐             │
│                       │  [Tenant logo — optional, guardrailed]                   │             │
│                       │  Title2:  "Sign in"                                       │            │
│                       │  Body1:   contextual subtitle per state                   │            │
│                       │  ┌──────────── BODY REGION (state machine) ───────────┐  │             │
│                       │  │  S1 / S1b / S2 / S3 / S4 / S5 / S6 / S7 render here │ │             │
│                       │  └─────────────────────────────────────────────────────┘ │            │
│                       │  [MessageBar — error/recovery slot, above primary action] │             │
│                       │  [Primary Button]   [Secondary Link/Button]               │            │
│                       └───────────────────────────────────────────────────────────┘           │
│                       ┌───────── TRUST FOOTER (reserved, persistent) ─────────┐               │
│                       │  ✓ Genuine Microsoft sign-in · Privacy · Terms · Help  │               │
│                       └────────────────────────────────────────────────────────┘             │
└───────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Layout regions

| Region | Component | Persists across states? | Notes |
|---|---|---|---|
| Viewport canvas | `LoginPage` (layout) | yes | Background: `colorNeutralBackground2`, or tenant background image with contrast-gate overlay (FR-8, NFR-A11y AC2/AC6). |
| Trust header | `TrustHeader` | yes | Reserved zone — tenant branding **cannot** occupy or remove (FR-7 AC1/AC2, decision D4). |
| Sign-in card | `SignInCard` | yes (shell); body swaps | Fluent `Card`, `max-width: 440px`, `shadow16`, `borderRadiusXLarge`. |
| Body region | state components | swaps in-place | Cross-fade only the body; header/footer static → no unbranded flash (NFR-Perf AC2). |
| Error slot | `ErrorRecovery` (`MessageBar`) | conditional | Rendered above the primary action, `role="alert"` (FR-6 AC4). |
| Trust footer | `TrustFooter` | yes | Reserved trust zone (C24), support/legal links. |

### Responsive behavior

| Breakpoint | Layout |
|---|---|
| ≥ 640px (desktop/tablet) | Card centered, `max-width: 440px`, vertical centering with top offset. |
| < 640px (mobile web) | Card grows to `100%` width minus `spacingHorizontalL` gutters; trust header collapses account chip label to icon + short name; all targets stay ≥ 44×44 (NFR-A11y AC4). |

---

## 2. State Specifications

### S1 — Identify (identifier-first entry) · FR-1

**Concepts:** C1 continuous canvas · C2 inline type detection · C3 warm start · C4 light stepper.

**Content inventory**
- Title2 `Sign in`
- Body1 `to continue to the Azure portal`
- `IdentityInput`: Fluent `Field` label `Email, phone, or Skype` + `Input type="email"` (autofocus).
- Helper `Caption1`: `Use your work, school, or personal Microsoft account.`
- Inline account-type hint (C2): as the user types a recognized domain, a `Caption1` line resolves to `Work or school account` / `Personal account` — **detected, never a manual toggle** (FR-1 AC4).
- Optional light stepper (C4): `Text` `Step 1 of 2` — de-emphasized, `colorNeutralForeground3`.
- Primary `Button appearance="primary"` `Next`.
- Secondary `Link` `No account? Create one` → out of scope, deep-links away (PRD non-goal).

**Interaction notes**
- Enter key submits (`Next`). Single primary action (FR-1 AC1).
- On submit → S6 loading micro-transition → S2 method (no full-page reload; FR-1 AC2).
- Warm start (C3): if a returning identifier exists (from prior session hint), pre-fill the field and shift subtitle to `Welcome back`.

**Edge cases**
- Empty submit → inline `Field` validation `Enter your email, phone, or Skype name.` (`aria-describedby`, SC 3.3.1).
- Malformed identifier → inline validation, no state change.
- Unknown account → resolved after submit as **S5 error** (`unknown-account` taxonomy row), not blocked here.

---

### S1b — Returning-user account picker · FR-2, FR-9

**Concepts:** C35 rich account picker · C36 tenant switcher · C37 environment badges.

Shown *instead of* the empty S1 field when ≥1 known account exists for the session/device.

**Content inventory**
- Title2 `Pick an account`
- List of accounts (`AccountPicker`), each row:
  - Avatar/initials, `Body1` display name, `Caption1` email.
  - Account-type hint: `Work or school` / `Personal` (FR-2 AC1).
  - Optional environment badge (C37) for DevOps tenants: `Dev` / `Staging` / `Prod` (`Badge`, color + text — NFR-Brand AC3).
- Persistent affordance `Use another account` (`Button appearance="subtle"`) → switches to S1 (FR-2 AC3).
- Tenant switcher (C36): if the selected account spans tenants, a `Menu` reachable in ≤2 actions (FR-9 AC1).

**Interaction notes**
- Selecting a row → advances directly to that account's S2 method screen **without re-typing** (FR-2 AC2).
- Each row is a single ≥44px keyboard-focusable target; Arrow keys move within the list, Enter selects.

**Edge cases**
- Stale/removed account → selecting it routes to S5 error `unknown-account` with `Use another account` recovery.
- Priya's scenario: picker defaults to *personal* but she wants *work* → `Use another account` and tenant switcher make the correction ≤2 actions, no re-typing (persona P1/P6).

---

### S2 — Choose method (passwordless-first) · FR-3, FR-4

**Concepts:** C13 enrollment-driven ordering · C16 passkey-forward hero · C14 method drawer · C15 silent fallback · C17 one-tap return · C18 availability matrix.

**Content inventory**
- Title2 `Verify your identity` (or `Sign in` when single method).
- Active account chip echo at top of body (`Caption1` `signed in as {email}` + `Change`).
- `IdentityMethodList` ordered by MSAL/Entra enrollment state (FR-3 AC4):
  1. **Hero passwordless action** (C16): primary `Button` e.g. `Use a passkey` / `Approve a request on Microsoft Authenticator` / `Use Windows Hello` — visually dominant, `appearance="primary"` (FR-3 AC1).
  2. Other enrolled methods as secondary `Button appearance="secondary"` rows with leading method icons.
  3. `Divider`.
  4. `Sign in another way` (`Button appearance="subtle"` or `Link`) → opens **method drawer** (C14) listing all available methods from the availability matrix (C18), incl. **Use your password** (FR-3 AC2/AC3).

**Interaction notes**
- Password is present but **secondary** — never the visual default when passwordless is enrolled (FR-3 AC2; anti-pattern C20 rejected).
- One-tap return (C17): from any method, `Back to sign-in options` returns to S2 in one action (FR-4 AC2).
- Choosing password → S3. Choosing passkey/Authenticator/Hello → S4 verify (or direct success).

**Edge cases (no dead-ends — FR-4)**
- **No passwordless enrolled** → S2 auto-presents password (or next supported method) as primary, **without an error state** (FR-4 AC1). Silent fallback (C15).
- **Chosen method unavailable** (e.g., phone offline for Authenticator) → inline recovery to return to method list in one action (FR-4 AC2); not a dead-end.
- Availability matrix guarantees ≥1 usable path in every account state (FR-4 AC3; validate against MSAL states — OQ1/AR1).

---

### S3 — Password entry (fallback) · FR-3 AC2, FR-4 AC1

**Concepts:** C15 silent fallback (password is the guaranteed floor).

**Content inventory**
- Title2 `Enter password`
- Account echo `Caption1` `{email}` + `Change`.
- `PasswordEntry`: `Field` label `Password` + `Input type="password"` with show/hide toggle (`contentAfter` eye button, `aria-label`).
- `Checkbox` `Keep me signed in` (honors trusted-device state — FR-5 AC3).
- `Link` `Forgot password?` → password-reset entry link only (PRD non-goal: no back-end).
- Primary `Button` `Sign in`. Secondary `Link` `Sign in another way` → S2.

**Interaction notes**
- Enter submits. On submit → S6 loading → success, MFA (S4), or S5 error.

**Edge cases**
- Wrong password → S5 error `wrong-password` (inline, adjacent `Forgot password?` + `Try again`), field retains focus.
- Locked account → S5 `locked-account`.

---

### S4 — MFA / verify (step-up) · FR-5

**Concepts:** C23 protective-framing step-up copy.

**Content inventory**
- Title2 varies by challenge: `Approve sign-in request` / `Enter code` / `Use your security key`.
- **Protective-framing line** (C23, FR-5 AC1): `Body1` `Extra verification is required by your organization to keep your account secure.` — always present, plain language.
- Challenge body by type:
  - **Number matching** (Authenticator push): large `Text` displaying the number to match on device; `Spinner` + live-region `Waiting for approval…`.
  - **TOTP / code**: `Field` `Enter the 6-digit code` + `Input inputMode="numeric"`; keyboard-operable (FR-5 AC2).
  - **Security key (FIDO2)**: instruction copy + `Button` `Use security key`; screen-reader-labeled (FR-5 AC2).
- `Checkbox` `Don't ask again on this device` when trusted-device is eligible (FR-5 AC3).
- Secondary `Link` `I can't use this method` → S2 method drawer (no dead-end).

**Interaction notes**
- Waiting states publish to `aria-live="polite"` (`Waiting for approval…`, `Request approved`).
- Success → S6 → S7. Timeout/denied → S5 (`try-again` / `method-failed`).

**Edge cases**
- Push denied/expired → S5 recovery with `Try again` and `Choose another method`.
- Devan's incident scenario: step-up for prod tenant must be fast and keyboard-operable; `Don't ask again` honored to avoid repeat step-up (FR-5 AC3, persona P3/P4).

---

### S5 — Error / recovery · FR-6

**Concepts:** C7 inline error + adjacent recovery · C8 plain policy panel · C9 recovery-first layout · C10 error taxonomy.

Errors are a **system**, not scattered strings (decision D3). All copy derives from the
taxonomy table below (C10). The recovery action is **elevated to primary** (C9).

**Layout**
- `MessageBar` rendered in the card's error slot (above the body's primary action), `role="alert"`, `intent` per severity.
- Structure: `MessageBarBody` = specific human message; `MessageBarActions` = the adjacent recovery action(s) (C7).
- For policy blocks, an expandable plain-language panel (C8) explains *what* and *what to do next* — no admin jargon (FR-6 AC2).

**Error taxonomy → content map (C10, FR-6 AC1)**

| Error state | Message (plain language) | Primary recovery (adjacent) | Intent | ARIA |
|---|---|---|---|---|
| Wrong password | `That password isn't correct. Try again or reset it.` | `Forgot password?` + `Try again` | error | `role="alert"`, `aria-describedby` field |
| Unknown account | `We couldn't find an account with that name.` | `Use another account` | error | `role="alert"` |
| Locked account | `Your account is temporarily locked for your protection.` | `Unlock / reset` link | warning | `role="alert"` |
| Expired session | `Your session expired. Sign in again to continue.` | `Sign in again` | info | `role="status"` |
| Network error | `We couldn't reach the sign-in service. Check your connection.` | `Try again` | error | `role="alert"` |
| Conditional-access / policy block | `Access is blocked by your organization's security policy.` + panel: *why + next step* (e.g. `You must sign in from a managed device. Enroll this device or contact your admin.`) | `How to fix this` (expands C8 panel) + `Contact your admin` | warning | `role="alert"` + labeled disclosure |

**Interaction notes**
- Every recoverable error shows an inline recovery action adjacent to the message (FR-6 AC3).
- No terse admin-only jargon without plain-language explanation (FR-6 AC2) — resolves Marcus's escalation pain and Devan's mid-incident block.
- Errors are programmatically associated with their field/context (FR-6 AC4, NFR-A11y AC3).

**Edge cases**
- Multiple simultaneous issues → show the highest-severity single `MessageBar`; do not stack alerts.
- Policy block with no self-serve path → still gives `Contact your admin` (never a dead-end).

---

### S6 — Loading / transition · NFR-Perf, NFR-A11y

**Content inventory**
- Inline `Spinner` with `label` (e.g. `Signing you in…`, `Checking your sign-in options…`).
- Body region cross-fades; card shell, header, and footer stay mounted (no layout shift — NFR-Perf AC2).

**Interaction notes**
- Status announced via `aria-live="polite"` (NFR-A11y AC3, C32).
- Primary action shows in-button `Spinner` and is disabled during the async call.
- Transitions render without full-page reload where MSAL allows (NFR-Perf AC1).

---

### S7 — Success / redirect · FR-7 AC3

**Content inventory**
- `Checkmark` icon (color + icon + text — NFR-Brand AC3) with `Text` `You're signed in`.
- Final **account and tenant** displayed clearly before redirect (FR-7 AC3): `Body1` `{display name} · {tenant}`.
- `Spinner` + `Redirecting to the Azure portal…` announced via live region.

**Interaction notes**
- Auto-redirect after confirmation; `Link` `Continue now` as a manual fallback.

---

## 3. Trust Header & Footer (persistent) · FR-7, FR-8

### Trust header (`TrustHeader`, reserved zone — decision D4)
- **Verified-surface cue** (C21): `✓ Verified Microsoft sign-in` with a checkmark icon + text — always present in **every** branding configuration (FR-7 AC1), cannot be removed or obscured by tenant branding (FR-7 AC2, anti-pattern C27 forbidden).
- **Active account + tenant chip** (C22): shows the current account/tenant context once known; opens the tenant switcher `Menu` (C36).
- Tenant logo (optional, guardrailed) sits **beside**, never **over**, the trust cue.

### Trust footer (`TrustFooter`, reserved zone C24)
- `✓ Genuine Microsoft sign-in surface` reassurance.
- `Link`s: `Privacy` · `Terms` · `Help` (help is read-only/static; no credential-taking widget — NFR-Sec, C42 forbidden).

### Tenant branding guardrails (FR-8)
- Logo, background, sign-in text themeable **via Fluent v9 tokens only** (FR-8 AC1, NFR-Brand AC1).
- Branding inputs that would breach FR-7 or NFR-A11y contrast are **rejected or auto-corrected** by the contrast gate (C29, FR-8 AC2, NFR-A11y AC6). See [../tokens/fluent-theme.md](../tokens/fluent-theme.md).

---

## 4. Accessibility Specification (applies to all states) · NFR-A11y

| Requirement | Spec | AC |
|---|---|---|
| Keyboard path | Full keyboard operability; logical focus order identify→land; visible focus ring on every interactive target (C30). | AC1 |
| Focus management | On state change, move focus to the new state's heading (`tabIndex={-1}` + focus) or first field; announce via live region. | AC1 |
| Contrast | Text ≥ 4.5:1, UI/large text ≥ 3:1 — in default **and** every tenant branding config (contrast gate, C29). | AC2 |
| Names/labels | All inputs/buttons/challenges have programmatic names; errors use `role="alert"`; async status uses `aria-live` (C32). | AC3 |
| Target size | Interactive targets ≥ 24×24 CSS px, prefer 44×44. | AC4 |
| Color independence | State never conveyed by color alone — always paired with icon + text (C31, NFR-Brand AC3). | AC5 |
| Audit bar | Automated + manual (screen reader + keyboard-only) → **zero WCAG 2.1 AA blockers**. | AC5 |

---

## 5. Component → Region Mapping (Fluent v9)

| Region / state | Spec doc | Fluent primitives / shared |
|---|---|---|
| Page layout | [LoginPage.md](../components/LoginPage.md) | `FluentProvider`, `makeStyles`; shell only (NOT `ProjectLayout`) |
| Card shell | [SignInCard.md](../components/SignInCard.md) | `Card`, `Title2`, `Body1`, `Divider` |
| Trust header | [TrustHeader.md](../components/TrustHeader.md) | `Text`, `Badge`, `Menu`, `@fluentui/react-icons` |
| S1 identify | [IdentityInput.md](../components/IdentityInput.md) | `Field`, `Input`, `Button`, `Link`, `Caption1` |
| S1b picker | [AccountPicker.md](../components/AccountPicker.md) | `Card`/list rows, `Avatar`, `Badge`, `Button` |
| S2 method | [IdentityMethodList.md](../components/IdentityMethodList.md) | `Button`, `Divider`, `Menu`/drawer, icons |
| S3 password | [PasswordEntry.md](../components/PasswordEntry.md) | `Field`, `Input`, `Checkbox`, `Link`, `Button` |
| S4 verify | [MfaVerify.md](../components/MfaVerify.md) | `Field`, `Input`, `Spinner`, `Text`, `Checkbox` |
| S5 error | [ErrorRecovery.md](../components/ErrorRecovery.md) | `MessageBar`, `MessageBarBody`, `MessageBarActions`, disclosure |
| S6 loading | in `SignInCard` / `MfaVerify` | `Spinner`, `safe-latency-loader` (shared) optional |
| S7 success | in `SignInCard` | `Text`, icon, `Spinner` |
| Trust footer | [TrustFooter.md](../components/TrustFooter.md) | `Text`, `Link`, `Divider` |

Reuse check performed against `prototype-workspace/component-map.json` and
`prototype-workspace/components/shared/`: **no existing sign-in/login pattern** exists
(the workspace has a *sign-up* page and a `signup-modal`, which are not applicable).
Reusable helpers referenced: `safe-latency-loader` (shared) for the loading spinner and
`prototype-footer` conventions for the footer link row. New components are project-scoped
under `components/projects/azure-login-page/`. Full rationale in
[../design-system.md](../design-system.md).

---

## 6. Traceability

| State | Concept(s) | PRD | Persona |
|---|---|---|---|
| S1 identify | C1, C2, C3, C4 | FR-1 | Priya (P1) |
| S1b picker | C35, C36, C37 | FR-2, FR-9 | Priya, Devan (P1, P6) |
| S2 method | C13, C14, C15, C16, C17, C18 | FR-3, FR-4 | Priya, Devan (P3) |
| S3 password | C15 | FR-3 AC2, FR-4 AC1 | all (fallback floor) |
| S4 verify | C23 | FR-5 | Marcus, Devan (P3/P4) |
| S5 error | C7, C8, C9, C10 | FR-6 | Marcus, Devan (P2) |
| S6 loading | C1, C32 | NFR-Perf, NFR-A11y | Priya (P1) |
| S7 success | C22, C32 | FR-7 AC3 | all (P4) |
| Trust header/footer | C21, C22, C23, C24 | FR-7, FR-8 | Marcus (P4) |
| A11y (all) | C28, C29, C30, C31, C32 | NFR-A11y, NFR-Brand | Marcus (P5) |

All must-have problems P1–P5 fully covered on one surface; P6 served at should-have
fidelity; P7 (assistance) intentionally absent — gated pending security review
(decision D7, AR3).
