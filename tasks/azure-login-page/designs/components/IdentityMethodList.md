---
title: "Component Spec — IdentityMethodList (S2 passwordless-first)"
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
  - "./PasswordEntry.md"
  - "./MfaVerify.md"
---

# Component Spec — `IdentityMethodList`

## Purpose
The method-selection body (state **S2**). Presents authentication methods **passwordless-first**,
ordered by MSAL/Entra enrollment state (C13), with a passkey-forward hero (C16), a "Sign in
another way" drawer (C14) backed by the availability matrix (C18), one-tap return (C17), and a
guaranteed silent password fallback (C15). Realizes decision **D2** — never dead-ending
(FR-3, FR-4).

## Reuse check
No shared method-list/selector exists. New component:
`components/projects/azure-login-page/identity-method-list.tsx`. Method ordering must be
**data-driven** from the auth adapter, never hardcoded (FR-3 AC4, mitigates AR1).

## Fluent primitives / shared components used
`Button` (`appearance="primary"` hero + `appearance="secondary"` rows), `Divider`,
`Menu`/`Drawer` for "Sign in another way", `Text`/`Caption1`, `@fluentui/react-icons` (method
icons: passkey, Authenticator, Windows Hello, password, security key).

## Props
| Prop | Type | Notes |
|---|---|---|
| `account` | `Account` | Echoed at top (`signed in as {email}` + `Change`). |
| `methods` | `Method[]` | Ordered by enrollment (C13); `{ id, kind, label, enrolled, available }` (C18). |
| `onChoose` | `(methodId) => void` | Routes to S3 (password) or S4 (verify). |
| `onChangeAccount` | `() => void` | Back to S1 (C17). |

## Variants
| Variant | Behavior |
|---|---|
| Passwordless enrolled | Hero = primary passwordless action; password is a secondary/drawer option (FR-3 AC1/AC2). |
| No passwordless enrolled | Password (or next supported) auto-presented as primary — **no error** (FR-4 AC1, silent fallback C15). |
| Single method | Show only that method as primary. |
| Drawer open | All available methods listed incl. `Use your password` (FR-3 AC3). |

## States
- **Rest** — ordered method rows.
- **Method unavailable** (e.g., phone offline) — inline recovery to return to list in one action
  (FR-4 AC2); not a dead-end.
- **Choosing** — row spinner; transition to S3/S4.

## Accessibility requirements
- Visual primacy of the hero is conveyed by size/`appearance` **and** label/icon, not color alone
  (NFR-Brand AC3, C31).
- Every method row is a ≥44×44 keyboard-operable button with a descriptive name (AC3/AC4).
- Drawer/menu follows Fluent focus-trap semantics; `Escape` returns to list; one-tap
  `Back to sign-in options` (C17, FR-4 AC2).
- Availability matrix guarantees ≥1 usable path announced (FR-4 AC3).

## Token dependencies
`colorBrandBackground` (hero), `colorNeutralBackground1` + `colorNeutralStroke1` (secondary rows),
`colorNeutralStroke2` (`Divider`), `spacingVerticalS` (row gap), `spacingHorizontalS`
(icon→label), `shadow16` (drawer).

## Traceability
FR-3 (AC1–AC4), FR-4 (AC1–AC3) · concepts C13, C14, C15, C16, C17, C18 · personas Priya (P3),
Devan (P3).
