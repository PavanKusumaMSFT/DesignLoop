---
title: "Component Spec — SignInCard"
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
  - "./LoginPage.md"
  - "./ErrorRecovery.md"
---

# Component Spec — `SignInCard`

## Purpose
The single persistent card surface that hosts the active state body, the card title/subtitle,
the error slot, and the primary/secondary action row. It is the visual "one surface" — its
shell stays mounted while only the body region cross-fades between states (FR-1 AC2, NFR-Perf).

## Reuse check
No shared sign-in card exists. Structurally mirrors the vendored *sign-up* card
(`components/projects/generate-a-fluent-sign-up-page/index.tsx`) — same `Card` + `Title2` +
`Body1` + `Divider` + `MessageBar` composition — but is a distinct new component. New file:
`components/projects/azure-login-page/sign-in-card.tsx`.

## Fluent primitives / shared components used
`Card`, `Title2`, `Body1`, `Caption1`, `Divider`, `Button`, `Link`, `Spinner`,
`MessageBar`/`MessageBarBody`/`MessageBarActions` (via `ErrorRecovery`), `Image`/`img` for
optional tenant logo, `@fluentui/react-icons`.

## Props
| Prop | Type | Notes |
|---|---|---|
| `title` | `string` | State heading (`Title2`), focus target on transition. |
| `subtitle` | `string` | `Body1` contextual line. |
| `tenantLogoSrc` | `string \| null` | Optional, guardrailed; rendered beside, never over, trust cue. |
| `error` | `SignInError \| null` | Renders `ErrorRecovery` in the error slot. |
| `isLoading` | `boolean` | Shows in-button spinner / disables primary action. |
| `primaryAction` | `{ label, onClick, disabled }` | Single primary `Button appearance="primary"`. |
| `secondaryAction` | `{ label, onClick } \| null` | `Link`/subtle `Button`. |
| `children` | `ReactNode` | Active state body (S1–S7). |

## Variants
| Variant | Notes |
|---|---|
| Form states (S1, S3, S4) | Body = fields; primary submits. |
| List states (S1b, S2) | Body = selectable rows; primary may be hidden. |
| Status states (S6, S7) | Body = spinner/success; actions minimal. |

## States
- **Rest** — body visible, actions enabled.
- **Loading (S6)** — primary shows `Spinner`, disabled; live-region status.
- **Error** — `ErrorRecovery` `MessageBar` above actions, `role="alert"`.
- **Success (S7)** — success icon + account/tenant confirmation.

## Accessibility requirements
- `Title2` is the region heading and receives focus on state change (NFR-A11y AC1).
- Error slot uses `role="alert"`; loading uses `aria-live="polite"` (AC3, C32).
- Card `max-width: 440px`; content reflows to full width < 640px with no horizontal scroll
  (NFR-Responsive AC1).
- All actions ≥ 44×44 target (AC4). Primary/secondary distinguished by shape+label, not color
  alone (AC5).

## Token dependencies
`colorNeutralBackground1`, `shadow16`, `borderRadiusXLarge`, `spacingVerticalXXL` /
`spacingHorizontalXXL` (padding), `spacingVerticalL` (rhythm), `Title2`/`Body1` type tokens,
`colorNeutralStroke2` (`Divider`). See [../tokens/token-usage-guide.md](../tokens/token-usage-guide.md).

## Traceability
FR-1 (AC1/AC2), FR-6 (error slot), NFR-Perf, NFR-A11y, NFR-Brand · concepts C1, C7, C9 ·
all personas.
