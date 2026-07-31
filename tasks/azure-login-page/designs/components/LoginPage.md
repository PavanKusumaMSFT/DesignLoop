---
title: "Component Spec — LoginPage (layout shell)"
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
  - "../tokens/fluent-theme.md"
  - "../tokens/token-usage-guide.md"
  - "./SignInCard.md"
---

# Component Spec — `LoginPage`

## Purpose
Top-level layout shell and state orchestrator for the single sign-in surface. Owns the
`FluentProvider` (Azure theme), the sign-in state machine (S1→S7), the persistent trust
header/footer, and the centered card. Realizes decision **D1** (one continuous canvas, no
multi-screen wizard) and FR-1 AC2 (in-place transitions, no full-page reload).

## Reuse check
`prototype-workspace/component-map.json` and `components/shared/` contain **no login/sign-in
page shell**. `ProjectLayout` (shared) is **not** used here — it injects Azure portal nav/header
chrome that must not appear on an unauthenticated sign-in surface. `LoginPage` is a new
project-scoped shell at `components/projects/azure-login-page/index.tsx`. Reusable helper:
`components/shared/safe-latency-loader` (LatencyLoader) may back the S6 loading state.

## Fluent primitives / shared components used
- `FluentProvider` (with `azureLoginTheme` from [../tokens/fluent-theme.md](../tokens/fluent-theme.md))
- `makeStyles` + `tokens` (SafeTokens pattern)
- Composes: `TrustHeader`, `SignInCard`, `TrustFooter` (children state components live inside `SignInCard`)
- `@fluentui/react-icons` for chrome icons

## Props
| Prop | Type | Default | Notes |
|---|---|---|---|
| `initialState` | `"identify" \| "picker"` | `"identify"` | `"picker"` when known accounts exist (S1b, FR-2). |
| `knownAccounts` | `Account[]` | `[]` | Feeds `AccountPicker`. |
| `tenantBranding` | `TenantBranding \| null` | `null` | Logo/background/text + partial theme override; passed through contrast gate (FR-8). |
| `onAuthenticated` | `(result) => void` | — | Fires on S7 success before redirect. |
| `msalOrchestrator` | `AuthAdapter` | — | Supplies enrollment/method availability + challenge results (FR-3 AC4). |

## Internal state
`signInState: S1 | S1b | S2 | S3 | S4 | S5 | S6 | S7`, `activeAccount`, `activeError`,
`availableMethods` (from availability matrix, C18). State transitions swap only the body region
inside `SignInCard`; `TrustHeader`/`TrustFooter` never unmount (NFR-Perf AC2).

## Variants
| Variant | Trigger |
|---|---|
| Default (unbranded) | `tenantBranding == null` — `azureLoginTheme`. |
| Tenant-branded | `tenantBranding` present — theme override + logo/background, trust zone immune (FR-7 AC2). |
| Warm-start | Returning identifier present — starts at `picker` or pre-filled identify (C3). |

## States
Hosts S1–S7 (see [../wireframes/login-page.md](../wireframes/login-page.md)). LoginPage manages:
transition orchestration, focus move to new state heading, and live-region announcements.

## Accessibility requirements
- One `main` landmark; card heading is the labelled region.
- On every state change: move focus to the new heading (`tabIndex={-1}`) and announce via a
  polite live region (NFR-A11y AC1/AC3, C30/C32).
- Logical DOM order matches visual order; visible focus ring everywhere.
- Respects `prefers-reduced-motion` for the cross-fade.
- Wraps all children in the theme so contrast gate applies globally (NFR-A11y AC2/AC6).

## Token dependencies
`colorNeutralBackground2` (canvas), layout centering, `spacingVertical*` offsets,
`durationNormal` (transition). No hardcoded colors. See
[../tokens/token-usage-guide.md](../tokens/token-usage-guide.md).

## Traceability
FR-1 (AC2), FR-7 (AC1/AC2), FR-8, NFR-A11y (all), NFR-Perf, NFR-Brand · concepts C1, C24, C28,
C30, C32 · personas Priya (P1), Marcus (P5).
