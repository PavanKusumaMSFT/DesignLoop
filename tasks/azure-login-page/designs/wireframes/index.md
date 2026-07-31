---
title: "Wireframes Index — Azure Sign-In / Login Page"
phase: design
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Designer Agent"
related:
  - "../../ideation/decision-log.md"
  - "../../ideation/concept-evaluation.md"
  - "../../strategy/prd.md"
  - "../../strategy/personas.md"
  - "./login-page.md"
  - "../design-system.md"
---

# Wireframes Index — Azure Sign-In / Login Page

## Purpose

Index of the wireframe specifications that realize the Ideate winning concept —
**"One continuous, trust-anchored sign-in canvas"**
([decision-log.md](../../ideation/decision-log.md)) — as a single Fluent UI React v9
page at route `app/azure-login-page/page.tsx`. There is **one screen** with
**animated in-place states**, not a multi-screen wizard (decision **D1**, FR-1 AC2).

## Scope

| In scope (this task) | Out of scope (PRD §2 non-goals) |
|---|---|
| Identifier-first entry, account picker, method selection, passwordless-first, password fallback, MFA/step-up, error+recovery, trust cue, loading, success/redirect | Account creation/sign-up, password-reset back-end/email, admin conditional-access config UI, post-login dashboard, on-page Copilot/assistance (P7, gated) |

## Wireframe Documents

| Doc | Covers | PRD requirements | Personas |
|---|---|---|---|
| [login-page.md](./login-page.md) | The single sign-in surface and all 7 states (identify → method → password → verify → error/recovery → loading → success) | FR-1…FR-9, NFR-A11y, NFR-Brand, NFR-Perf, NFR-Responsive | Priya, Marcus, Devan |

## The One Surface — State Model

The page is one persistent surface. State transitions are in-place (cross-fade of the
body region only); the header trust zone and footer trust zone never re-render, so
there is **no flash of unbranded content** (NFR-Perf AC2, decision D4/D5).

```
                 ┌────────────────── persistent shell (never re-renders) ──────────────────┐
                 │  Trust header: verified-surface cue + account/tenant chip (reserved)     │
                 │  ┌───────────────────────── body region (state machine) ─────────────┐  │
  arrive ─────────▶│ S1 IDENTIFY  │─┬─▶│ S2 METHOD (passwordless-first) │──▶│ S4 VERIFY │  │
                 │  │  (email/phone)  │ │   ▲          │ password fallback  │  (MFA/step-up)│
                 │  │  or S1b PICKER  │ │   │          ▼                    │      │       │  │
                 │  └─────────────────┘ │   └── S3 PASSWORD ────────────────┘      │       │  │
                 │        │             │                                          ▼       │  │
                 │        └── any error ─┴──▶ S5 ERROR / RECOVERY ──▶ (back to S1/S2/S3)   │  │
                 │                                     │                                   │  │
                 │                                     ▼   success                         │  │
                 │  ┌───────── S6 LOADING (spinner, live-region) ──▶ S7 SUCCESS / REDIRECT│  │
                 │  Trust footer: reserved trust zone (verified surface + support links)   │  │
                 └──────────────────────────────────────────────────────────────────────────┘
```

| State | ID | Concept refs | PRD |
|---|---|---|---|
| Identify (identifier-first) | S1 | C1, C2, C3, C4 | FR-1 |
| Returning-user account picker | S1b | C35, C36, C37 | FR-2, FR-9 |
| Choose method (passwordless-first) | S2 | C13, C14, C16, C17, C18 | FR-3, FR-4 |
| Password entry (fallback) | S3 | C15, C20-avoided | FR-3 AC2, FR-4 AC1 |
| MFA / verify (step-up) | S4 | C23, C5-of-FR5 | FR-5 |
| Error / recovery | S5 | C7, C8, C9, C10 | FR-6 |
| Loading / transition | S6 | C1, C32 | NFR-Perf, NFR-A11y |
| Success / redirect | S7 | C22, C32 | FR-7 AC3 |

## Layout Regions (shared by every state)

1. **Trust header** — verified-surface cue + active account/tenant chip (reserved zone; tenant branding may theme but never occupy — decision D4, FR-7).
2. **Sign-in card** — the single Fluent `Card` surface hosting the active state body.
3. **Trust footer** — reserved trust zone: "You're on the genuine Microsoft sign-in surface" affordance + support/privacy links.

See [login-page.md](./login-page.md) for region-by-region content, interaction, and
edge-case detail, and [../design-system.md](../design-system.md) for the component
inventory that implements each region.

## Traceability Summary

Every state maps to a shortlisted concept, a PRD requirement, and a persona — the
spine inherited from [concept-evaluation.md](../../ideation/concept-evaluation.md)
§Coverage Check. Full mapping in [login-page.md](./login-page.md) §Traceability.
