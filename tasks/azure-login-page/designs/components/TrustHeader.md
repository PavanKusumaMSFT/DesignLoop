---
title: "Component Spec — TrustHeader"
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
  - "./TrustFooter.md"
  - "./AccountPicker.md"
---

# Component Spec — `TrustHeader`

## Purpose
Persistent, reserved trust zone above the card. Carries the **verified-surface anti-phishing
cue** (C21) and the **active account + tenant chip** (C22) that opens the tenant switcher (C36).
It is the structural resolution of the branding↔trust tension (decision **D4**): tenant branding
may theme the card but can **never occupy, restyle, or remove** this zone (FR-7 AC1/AC2;
anti-pattern C27 forbidden).

## Reuse check
No shared trust/verified-surface header exists. New component:
`components/projects/azure-login-page/trust-header.tsx`. Reads a **fixed neutral token subset**,
not tenant overrides, so the cue is immune to branding.

## Fluent primitives / shared components used
`Text`, `Badge`, `Menu`/`MenuTrigger`/`MenuPopover`/`MenuList`/`MenuItem` (tenant switcher),
`Divider`, `@fluentui/react-icons` (`ShieldCheckmark`/`Checkmark` for verified cue,
`ChevronDown` for chip). Azure/Microsoft logo via `img` from `public/icons/` (not inline SVG).

## Props
| Prop | Type | Notes |
|---|---|---|
| `verifiedLabel` | `string` | Default `Verified Microsoft sign-in`. |
| `activeAccount` | `Account \| null` | When known, renders the account/tenant chip. |
| `tenants` | `Tenant[]` | Feeds the ≤2-action tenant switcher `Menu` (FR-9 AC1). |
| `onSwitchTenant` | `(tenantId) => void` | — |
| `onChangeAccount` | `() => void` | Routes to S1 (`Use another account`). |

## Variants
| Variant | Notes |
|---|---|
| Pre-identify | Verified cue only; no account chip yet. |
| Account known | Verified cue + account/tenant chip with switcher. |
| Multi-tenant | Chip menu lists tenants + environment badges (Dev/Staging/Prod, C37). |
| Mobile (<640px) | Chip collapses to icon + short tenant name; verified cue label stays visible. |

## States
- **Rest** — cue + chip.
- **Menu open** — tenant switcher `MenuPopover` (`shadow16`).
- **Switching** — chip shows target tenant unambiguously before/after (FR-9 AC2).

## Accessibility requirements
- Verified cue conveyed by **icon + text** (never color alone — NFR-Brand AC3, C31).
- Chip/menu fully keyboard-operable; `Menu` follows Fluent focus semantics (NFR-A11y AC1).
- Verified cue has an accessible name; if it links to a "why you can trust this page" static
  explainer, that content is read-only (NFR-Sec — no credential collection).
- Cue contrast ≥ 4.5:1 in default **and** every tenant config (contrast gate, NFR-A11y AC2).

## Token dependencies
`colorNeutralBackground1`, `colorPaletteGreenForeground1` (verified check),
`colorNeutralForeground1` (label), `colorNeutralForeground2` (email), `Badge` color tokens,
`spacingHorizontalL`/`spacingVerticalM`, `shadow16` (menu). Fixed neutral subset — **not**
derived from tenant theme. See [../tokens/fluent-theme.md](../tokens/fluent-theme.md).

## Traceability
FR-7 (AC1/AC2/AC3), FR-9 (AC1/AC2) · concepts C21, C22, C24, C36, C37 · personas Marcus (P4),
Devan (P6), Priya (P6).
