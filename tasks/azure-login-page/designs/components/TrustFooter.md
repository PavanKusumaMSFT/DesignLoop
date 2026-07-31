---
title: "Component Spec — TrustFooter"
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
  - "./TrustHeader.md"
---

# Component Spec — `TrustFooter`

## Purpose
Persistent reserved trust zone below the card (C24). Reinforces the genuine-Microsoft-sign-in
reassurance and exposes read-only support/legal links. Together with `TrustHeader` it is the
structural guarantee that trust survives tenant branding (decision **D4**, FR-7). Contains **no
credential-taking or interactive assistance** widget (NFR-Sec, anti-pattern C42 forbidden).

## Reuse check
No shared trust footer. The vendored `components/shared/prototype-footer` is a scenario-switcher,
not a trust footer — its link-row conventions are referenced but not reused. New component:
`components/projects/azure-login-page/trust-footer.tsx`.

## Fluent primitives / shared components used
`Text`, `Caption1`, `Link`, `Divider`, `@fluentui/react-icons` (`ShieldCheckmark`/`Checkmark`).

## Props
| Prop | Type | Notes |
|---|---|---|
| `links` | `{ label, href }[]` | Default: Privacy · Terms · Help (static, read-only). |
| `reassuranceLabel` | `string` | Default `Genuine Microsoft sign-in surface`. |

## Variants
| Variant | Notes |
|---|---|
| Default | Reassurance + link row. |
| Mobile (<640px) | Links wrap; reassurance stays on its own line. |

## States
Static. No interactive state beyond link hover/focus.

## Accessibility requirements
- Reassurance conveyed by icon + text, never color alone (NFR-Brand AC3, C31).
- Links keyboard-focusable with visible focus; each ≥44×44 target (NFR-A11y AC1/AC4).
- `Help` links to static, read-only guidance only — no credential collection on the
  unauthenticated surface (NFR-Sec AC1; any richer assistance gated on security sign-off — AR3).
- Reserved zone reads from fixed neutral tokens; not themeable by tenant overrides (FR-7 AC2).

## Token dependencies
`colorNeutralForeground3` (legal/caption), `colorBrandForeground1` (links),
`colorPaletteGreenForeground1` (check), `colorNeutralStroke2` (`Divider`), `spacingHorizontalL`.

## Traceability
FR-7 (AC1/AC2), NFR-Sec (AC1) · concepts C24, C21 · persona Marcus (P4). Assistance intentionally
absent (decision D7).
