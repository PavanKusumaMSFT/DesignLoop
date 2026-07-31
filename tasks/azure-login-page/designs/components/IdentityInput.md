---
title: "Component Spec — IdentityInput (S1 identify)"
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
  - "./SignInCard.md"
  - "./IdentityMethodList.md"
---

# Component Spec — `IdentityInput`

## Purpose
The identifier-first entry body (state **S1**). Captures email/phone/Skype with a single
primary action and performs **inline account-type detection** (C2) — no user-visible account-type
toggle (FR-1 AC1/AC4). Realizes P1 fast entry for Priya.

## Reuse check
No shared identifier field component. Fluent `Field` + `Input` are used directly (do not create
a wrapper unless reused). New body component:
`components/projects/azure-login-page/identity-input.tsx`.

## Fluent primitives / shared components used
`Field`, `Input` (`type="email"`), `Button` (`appearance="primary"`), `Link`, `Caption1`,
`Text`.

## Props
| Prop | Type | Notes |
|---|---|---|
| `value` | `string` | Controlled identifier. |
| `onChange` | `(v: string) => void` | — |
| `onSubmit` | `(identifier) => void` | Triggers S6→S2. |
| `detectedType` | `"work" \| "personal" \| null` | Drives the inline hint (C2). |
| `validationError` | `string \| null` | Inline `Field` validation message. |
| `warmStartName` | `string \| null` | If present, pre-fills + shifts subtitle to `Welcome back` (C3). |

## Variants
| Variant | Notes |
|---|---|
| Empty (cold) | Placeholder, autofocus, `Next` disabled until non-empty. |
| Warm start | Pre-filled identifier + `Welcome back` (C3). |
| Type-detected | `Caption1` resolves to `Work or school account` / `Personal account`. |

## States
- **Rest / typing** — live type detection updates hint.
- **Invalid** — inline `Field` error (`aria-describedby`), no state change (SC 3.3.1).
- **Submitting** — `Next` shows in-button spinner (handled by `SignInCard`).

## Accessibility requirements
- `Field` label `Email, phone, or Skype`; input autofocused on S1 entry (AC1).
- Validation errors use `aria-describedby` and are announced (NFR-A11y AC3, FR-6 AC4).
- Account-type hint is text (not color) and does not steal focus.
- Enter submits; single primary action (FR-1 AC1). Target ≥ 44×44 (AC4).

## Token dependencies
Fluent `Field`/`Input` neutral tokens, `colorBrandBackground` (Next), `colorNeutralForeground3`
(hint/caption), `spacingVerticalXS` (label→input), `spacingVerticalL` (rhythm).

## Traceability
FR-1 (AC1/AC4), FR-6 (AC4 validation) · concepts C1, C2, C3, C4 · persona Priya (P1).
