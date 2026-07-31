---
title: "Component Spec — AccountPicker (S1b)"
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
  - "./TrustHeader.md"
---

# Component Spec — `AccountPicker`

## Purpose
Returning-user account picker (state **S1b**). Lets known users select an account without
re-typing (FR-2), with account-type hints, optional environment badges (C37), and a persistent
`Use another account` escape. Should-have multi-tenant switching (FR-9). Directly serves Priya's
"defaulted to personal, need work" scenario.

## Reuse check
No shared account-picker exists (`signup-modal` and `resource-picker` are unrelated). New
component: `components/projects/azure-login-page/account-picker.tsx`. Held at **should-have**
fidelity pending I7 validation (decision D6, AR4).

## Fluent primitives / shared components used
`Avatar`, `Text`/`Body1`, `Caption1`, `Badge`, `Button` (`appearance="subtle"` for rows and
`Use another account`), `Divider`. Selectable rows are keyboard-navigable buttons.

## Props
| Prop | Type | Notes |
|---|---|---|
| `accounts` | `Account[]` | `{ id, displayName, email, type: "work"\|"personal", tenant?, environment? }` |
| `onSelect` | `(accountId) => void` | Advances to that account's S2 (no re-type, FR-2 AC2). |
| `onUseAnother` | `() => void` | Routes to S1 (FR-2 AC3). |

## Variants
| Variant | Notes |
|---|---|
| Mixed accounts | Work + personal rows each labeled with type hint (FR-2 AC1). |
| DevOps multi-env | Rows carry `Dev`/`Staging`/`Prod` `Badge` (color + text, C37). |
| Single account | One row + `Use another account`. |

## States
- **Rest** — list of rows.
- **Row hover/focus** — `colorNeutralBackground1Hover`, visible focus ring.
- **Selecting** — row shows spinner; transitions to S2.
- **Stale account** — selecting routes to S5 `unknown-account` with recovery (no dead-end).

## Accessibility requirements
- Each row is a single ≥44×44 focusable control with an accessible name combining display name +
  type + tenant (NFR-A11y AC3/AC4).
- Arrow-key navigation within the list; Enter selects; `Use another account` always reachable
  (FR-2 AC3).
- Environment/type conveyed by badge **text**, not color alone (NFR-Brand AC3, C31).

## Token dependencies
`colorNeutralBackground1Hover` (row hover), `colorNeutralForeground1` (name),
`colorNeutralForeground2` (email), `Badge` color tokens, `borderRadiusMedium` (rows),
`borderRadiusCircular` (avatar), `spacingVerticalS` (row gap).

## Traceability
FR-2 (AC1/AC2/AC3), FR-9 (AC2) · concepts C35, C36, C37 · personas Priya (P1/P6), Devan (P6).
