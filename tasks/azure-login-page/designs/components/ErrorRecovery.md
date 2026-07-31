---
title: "Component Spec — ErrorRecovery (S5 error system)"
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
  - "./SignInCard.md"
---

# Component Spec — `ErrorRecovery`

## Purpose
The single recovery-first error **system** (state **S5**), not scattered strings (decision
**D3**). Renders a specific human message with an **adjacent recovery action** (C7), a
plain-language policy panel for conditional-access blocks (C8), a recovery-first layout (C9), all
driven by an error taxonomy → content map (C10). Resolves Marcus's escalation pain and Devan's
mid-incident policy block (FR-6). Meets the ≥90% recovery goal.

## Reuse check
No shared error/recovery system exists (`v8-info-box` is unrelated legacy). New component:
`components/projects/azure-login-page/error-recovery.tsx`, driven by a shared taxonomy map
(`error-taxonomy.ts`).

## Fluent primitives / shared components used
`MessageBar`, `MessageBarBody`, `MessageBarActions`, `MessageBarTitle`, `Button`/`Link`
(recovery actions), `Accordion`/disclosure for the plain-language policy panel (C8), `Text`.

## Props
| Prop | Type | Notes |
|---|---|---|
| `error` | `SignInError` | `{ code, intent, message, recovery[], policyExplanation? }` from taxonomy. |
| `onRecover` | `(actionId) => void` | Executes the adjacent recovery (routes to S1/S2/S3). |

## Error taxonomy → content map (C10, FR-6 AC1)
| `code` | Message | Primary recovery | `intent` | ARIA |
|---|---|---|---|---|
| `wrong-password` | That password isn't correct. Try again or reset it. | `Forgot password?` + `Try again` | error | `role="alert"` + field `aria-describedby` |
| `unknown-account` | We couldn't find an account with that name. | `Use another account` | error | `role="alert"` |
| `locked-account` | Your account is temporarily locked for your protection. | `Unlock / reset` | warning | `role="alert"` |
| `expired-session` | Your session expired. Sign in again to continue. | `Sign in again` | info | `role="status"` |
| `network-error` | We couldn't reach the sign-in service. Check your connection. | `Try again` | error | `role="alert"` |
| `policy-block` | Access is blocked by your organization's security policy. | `How to fix this` (expands C8 panel) + `Contact your admin` | warning | `role="alert"` + labelled disclosure |

## Variants
| Variant | Notes |
|---|---|
| Inline field error | `wrong-password` — associated with the field. |
| Standalone alert | `unknown-account`, `network-error`, `expired-session`. |
| Policy panel | `policy-block` — expandable plain-language explanation of *what + next step*, no admin jargon (FR-6 AC2). |

## States
- **Shown** — `MessageBar` with message + adjacent recovery (C7).
- **Policy expanded** — disclosure reveals the plain-language explainer (C8/C40 content, read-only).
- **Recovering** — recovery action routes to the relevant state (never a dead-end).

## Accessibility requirements
- Every error is programmatically associated with its field/context (`aria-describedby`) and
  uses `role="alert"` / live region per taxonomy (FR-6 AC4, NFR-A11y AC3).
- No terse admin-only jargon without a plain-language explanation (FR-6 AC2).
- Recovery action is adjacent and elevated to primary (C7/C9); every recoverable error has one
  (FR-6 AC3).
- Severity conveyed by `intent` **and** icon + text, never color alone (NFR-Brand AC3, C31).
- Do not stack multiple alerts — show highest severity single `MessageBar`.

## Token dependencies
`MessageBar` intent tokens: `colorPaletteRedForeground1`/`colorPaletteRedBackground1` (error),
`colorPaletteYellowForeground1`/`colorPaletteYellowBackground1` (warning), info neutrals;
`borderRadiusMedium`, `spacingVerticalS`. See [../tokens/token-usage-guide.md](../tokens/token-usage-guide.md).

## Traceability
FR-6 (AC1/AC2/AC3/AC4) · concepts C7, C8, C9, C10 (+ C40 content, read-only) · personas Marcus
(P2), Devan (P2).
