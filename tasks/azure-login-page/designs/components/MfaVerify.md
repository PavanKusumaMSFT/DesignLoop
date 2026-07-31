---
title: "Component Spec — MfaVerify (S4 step-up)"
phase: design
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Designer Agent"
related:
  - "../../ideation/decision-log.md"
  - "../../strategy/prd.md"
  - "../../strategy/personas.md"
  - "../wireframes/login-page.md"
  - "../tokens/token-usage-guide.md"
  - "./IdentityMethodList.md"
  - "./ErrorRecovery.md"
---

# Component Spec — `MfaVerify`

## Purpose
MFA / conditional-access step-up body (state **S4**). Presents number-matching, TOTP/code, or
security-key challenges with **protective-framing copy** (C23) that states *why* verification is
required, fully accessible and keyboard-operable (FR-5). Honors trusted-device state to avoid
unnecessary repeat step-up (FR-5 AC3). Serves Marcus (audit-grade security) and Devan (fast
in-incident step-up).

## Reuse check
No shared MFA/verify component. New component:
`components/projects/azure-login-page/mfa-verify.tsx`. Reusable helper:
`components/shared/safe-latency-loader` (LatencyLoader) may back the "waiting for approval"
state; otherwise Fluent `Spinner`.

## Fluent primitives / shared components used
`Text` (number display), `Field` + `Input` (`inputMode="numeric"` for code), `Button`
(`appearance="primary"` security-key trigger), `Checkbox` (`Don't ask again`), `Spinner`,
`Body1`, `Link`, `@fluentui/react-icons`.

## Props
| Prop | Type | Notes |
|---|---|---|
| `challenge` | `"number-match" \| "totp" \| "security-key"` | Selects challenge body. |
| `matchNumber` | `string` | Displayed for number-matching push. |
| `code` | `string` / `onChange` | TOTP code entry. |
| `protectiveReason` | `string` | Plain-language why-line (FR-5 AC1). |
| `canTrustDevice` | `boolean` | Shows `Don't ask again on this device` (FR-5 AC3). |
| `onSubmit` / `onCantUseMethod` | `() => void` | Verify / route back to S2 (no dead-end). |
| `status` | `"idle" \| "waiting" \| "approved" \| "denied"` | Drives live-region announcements. |

## Variants
| Variant | Body |
|---|---|
| Number match | Large `Text` number + `Spinner` `Waiting for approval…`. |
| TOTP / code | `Field` `Enter the 6-digit code` + numeric `Input`. |
| Security key (FIDO2) | Instruction copy + `Use security key` button. |

## States
- **Idle** — challenge shown.
- **Waiting** — `aria-live="polite"` `Waiting for approval…`.
- **Approved** — `Request approved`, transition to S6→S7.
- **Denied / timeout** — S5 recovery (`Try again`, `Choose another method`).

## Accessibility requirements
- Protective-framing line always present, plain language (FR-5 AC1).
- All challenges keyboard-operable and screen-reader-labeled: numeric input has label; security
  key trigger has accessible name; number-match value is readable text (FR-5 AC2, NFR-A11y AC3).
- Status transitions announced via live region (C32).
- `Don't ask again` `Checkbox` labelled; ≥44×44 (AC4). `I can't use this method` returns in one
  action (no dead-end, FR-4 AC2).

## Token dependencies
`fontSizeHero800` (match number), `colorNeutralForeground2` (protective copy), Fluent
`Field`/`Input`/`Spinner` tokens, `colorBrandBackground` (primary), `colorPaletteGreenForeground1`
(approved), `spacingVerticalL`.

## Traceability
FR-5 (AC1/AC2/AC3), FR-4 (AC2 no dead-end) · concept C23 · personas Marcus (P4), Devan (P3/P4).
