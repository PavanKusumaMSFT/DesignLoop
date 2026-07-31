---
title: "Component Spec — PasswordEntry (S3 fallback)"
phase: design
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Designer Agent"
related:
  - "../../ideation/decision-log.md"
  - "../../strategy/prd.md"
  - "../wireframes/login-page.md"
  - "../tokens/token-usage-guide.md"
  - "./IdentityMethodList.md"
  - "./ErrorRecovery.md"
---

# Component Spec — `PasswordEntry`

## Purpose
Password entry body (state **S3**) — the guaranteed fallback floor (C15) that ensures no user is
dead-ended (FR-4 AC1). Secondary to passwordless (FR-3 AC2). Includes "Keep me signed in"
(trusted-device, FR-5 AC3) and a `Forgot password?` entry link.

## Reuse check
No shared password field component. Uses Fluent `Field` + `Input type="password"` directly. New
body component: `components/projects/azure-login-page/password-entry.tsx`.

## Fluent primitives / shared components used
`Field`, `Input` (`type="password"`, `contentAfter` show/hide toggle `Button`), `Checkbox`,
`Link`, `Button` (`appearance="primary"`), `Caption1`, `@fluentui/react-icons` (`Eye`/`EyeOff`).

## Props
| Prop | Type | Notes |
|---|---|---|
| `email` | `string` | Account echo `{email}` + `Change`. |
| `value` | `string` | Controlled password. |
| `onChange` | `(v) => void` | — |
| `onSubmit` | `() => void` | Triggers S6 → success / S4 / S5. |
| `keepSignedIn` | `boolean` | Controlled `Checkbox`. |
| `onForgotPassword` | `() => void` | Entry link only (PRD non-goal: no back-end). |
| `onUseAnotherMethod` | `() => void` | Back to S2. |
| `error` | `SignInError \| null` | Wrong password / locked → `ErrorRecovery`. |

## Variants
| Variant | Notes |
|---|---|
| Default | Password field + keep-signed-in + forgot link. |
| Password-only account | Reached directly from S2 silent fallback. |

## States
- **Rest / typing** — show/hide toggle available.
- **Submitting** — in-button spinner, disabled.
- **Wrong password** — `ErrorRecovery` `MessageBar` with adjacent `Forgot password?` + `Try
  again`; field retains focus (FR-6 AC3).
- **Locked** — `locked-account` recovery.

## Accessibility requirements
- `Field` label `Password`; show/hide toggle has `aria-label` and toggles `aria-pressed`.
- Error programmatically associated via `aria-describedby` + `role="alert"` (FR-6 AC4,
  NFR-A11y AC3).
- `Keep me signed in` `Checkbox` labelled; ≥44×44 target (AC4).
- `Forgot password?` and `Sign in another way` reachable by keyboard (AC1).

## Token dependencies
Fluent `Field`/`Input` neutral tokens, `colorBrandForeground1` (`Forgot password?` link),
`colorBrandBackground` (Sign in), `colorPaletteRed*` (error via `ErrorRecovery`),
`spacingVerticalS`/`spacingVerticalL`.

## Traceability
FR-3 (AC2), FR-4 (AC1), FR-5 (AC3 keep-signed-in), FR-6 (AC3/AC4) · concept C15 · all personas
(fallback floor).
