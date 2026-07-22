---
title: "Project Cirrus — PRD: Inline Azure CLI Enhancement"
phase: define
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Strategist Agent"
related:
  - "research/findings-synthesis.md"
  - "research/competitive-analysis.md"
  - "research/market-insights.md"
  - "research/web/cirrus-uxr-summary-source.md"
  - "strategy/problem-statements.md"
  - "strategy/personas.md"
  - "strategy/journey-map.md"
---

# PRD: Inline, Additive Azure CLI Enhancement (Project Cirrus)

This PRD specifies an **additive, inline, non-modal enhancement to Azure CLI** that delivers the valued intelligence (contextual autocomplete, parameter/resource suggestions, dynamic resource lookup, discoverability) directly in the user's existing shell — across local terminal, IDE, CI/CD, Cloud Shell, remote, and AI terminals — while remaining interoperable and non-stateful. It is explicitly **not** a dedicated TUI mode.

## Overview

The Discover evidence is unanimous: users valued the intelligence but rejected the container. `az interactive` reached ~0.1% adoption / ~14% 90-day retention; AI Shell fell to ~6% monthly retention; the ~20% Azure Copilot retention is the benchmark to beat. The winning direction rides the behavioural grain — multi-cloud (68.9%), multi-environment (avg 1.86 contexts), AI-terminal-emergent (13.1%) — by making Azure work smarter *everywhere it already happens*, with nothing to enter or exit.

## Goals

- **G1.** Deliver the valued Azure intelligence (dynamic resource lookup, contextual suggestions, syntax/discoverability guidance) **inline**, with no mode to enter/exit. *(HMW-1; T5)*
- **G2.** Preserve full **interoperability**: non-az commands (kubectl, PowerShell, git, aws, gcloud) always run natively and unaffected. *(HMW-2; T3, T7)*
- **G3.** Be **portable** across local terminal, IDE, CI/CD, Cloud Shell, remote, and AI terminals, degrading gracefully where a surface can't support rich UI. *(HMW-3, HMW-6; T7, T8)*
- **G4.** Deliver **expert-grade value inline**, de-stigmatised from "beginner mode." *(HMW-4; T4)*
- **G5.** Be **fast and stable** enough to form a daily habit — no keystroke blocking, no startup penalty. *(HMW-5; T6)*
- **G6.** **Beat the ~20% Azure Copilot retention benchmark** by optimising for habit over novelty. *(Competitive gap #4)*

## Non-Goals

- **NG1 (explicit).** **We will NOT build a dedicated Azure TUI "mode."** No stateful container users must enter/exit; no gating of Azure functionality behind a mode. This is a hard constraint — the direct lesson of `az interactive` (~0.1% adoption) and AI Shell (~6% retention) and 2025 concept evals ("unnatural," "heavyweight," "two programs"). *(T1, T2)*
- **NG2.** We will not build a competing bespoke AI/chat mode rivaling AI terminals; we compose with them instead. *(T8)*
- **NG3.** We will not require customised shells, break tmux/screen, or override user keybindings (no F1/F3, Ctrl+C-clears anti-patterns). *(T3)*
- **NG4.** We will not create wireframes/designs or write production code in this phase (Define scope).
- **NG5.** We will not position or market the capability as an onboarding/"beginner" aid. *(T4)*

## Functional Requirements

Priority: **P0** = must-have (ships v1). Every P0 has acceptance criteria.

### FR-1 (P0) — Inline intelligent autocomplete
As the user types an `az` command, suggest command paths/subcommands inline in the current shell, without a mode.
- **AC-1.1** Suggestions appear inline as the user types an `az` command in a supported surface; accepting one never launches or switches into a separate mode/program.
- **AC-1.2** Suggestions are dismissible (e.g., Esc) and non-intrusive; ignoring them leaves normal typing behaviour unchanged.
- **AC-1.3** No suggestion action rebinds or overrides existing user/terminal keybindings (see NFR-3).

### FR-2 (P0) — Contextual parameter & resource-value suggestions
For a recognised `az` command, suggest valid parameters and valid enum values (e.g., `--sku`, `--location`) in context.
- **AC-2.1** For a recognised command, valid parameter flags are offered contextually as the user reaches the argument position.
- **AC-2.2** For parameters with a bounded value set, only valid values are offered (invalid values are not suggested), reducing failed runs (Journey Stages 3, 8).
- **AC-2.3** Suggestions reflect the specific command/service context, not a generic global list.

### FR-3 (P0) — Dynamic resource lookup
Complete resource-identifying parameters (e.g., `--resource-group`, resource names) from the user's live subscription.
- **AC-3.1** Resource-identifying parameters can be completed from live subscription data using existing authenticated context.
- **AC-3.2** Lookups reuse the CLI's current auth/subscription context; no separate login or mode is required.
- **AC-3.3** If a lookup cannot complete (offline, unauth, timeout), the CLI falls back to free text without blocking input (see FR-6, FR-7).

### FR-4 (P0) — Discoverability affordances (expert-framed, additive)
Surface inline, dismissible hints (syntax guidance, next-step context) that aid experts without "beginner mode" framing.
- **AC-4.1** Hints are additive and dismissible; they never require entering a mode and never block command entry.
- **AC-4.2** Hints are presented neutrally/expert-appropriately (no onboarding/"beginner" framing in copy or positioning).
- **AC-4.3** A user can fully disable/enable discoverability hints via a documented, persistent setting.

### FR-5 (P0) — Interoperability with non-az commands
Any non-az command runs natively and unaffected, with zero extra steps.
- **AC-5.1** A non-az command (e.g., `kubectl`, `pwsh`, `git`, `aws`, `gcloud`) entered in the same shell executes natively with no prefix, wrapper, or mode-exit step (contrast the `#`-prefix workaround).
- **AC-5.2** The enhancement introduces no interference with pipes/redirection or command composition.
- **AC-5.3** The enhancement functions correctly inside tmux/screen and does not hijack terminal control shortcuts.

### FR-6 (P0) — Graceful cross-environment degradation
Detect surface capabilities and degrade cleanly from rich inline UI to minimal/plain behaviour.
- **AC-6.1** In a rich-capable surface (local terminal, IDE terminal), full inline suggestions render.
- **AC-6.2** In a constrained/non-interactive surface (CI/CD, minimal remote, limited TTY), the enhancement degrades to plain, non-interactive behaviour without errors and without breaking scripts.
- **AC-6.3** In AI terminals, the enhancement exposes/first-party Azure context so generated commands are valid, without imposing a rival mode (compose, don't compete).

### FR-7 (P0) — Performance budget (non-blocking)
All inline intelligence is fast, cached where possible, and never blocks the keystroke path.
- **AC-7.1** Suggestion rendering never blocks user input; typing/execution proceed even if intelligence is still computing.
- **AC-7.2** Inline suggestion latency target: **p95 ≤ 100 ms** for cached/local computation; network-backed lookups (FR-3) are async and time-boxed (see NFR-1).
- **AC-7.3** No added interactive-startup penalty attributable to the enhancement (directly answering "startup time is too slow… cache things" — HaTS v2.61.0).

## Non-Functional Requirements

### NFR-1 (P0) — Performance & reliability
- **AC:** Inline suggestion p95 ≤ 100 ms (cached/local); resource-lookup calls async, time-boxed to **≤ 500 ms** before graceful free-text fallback; results cached to avoid repeat latency. No crash/hang on lookup failure. *(T6)*

### NFR-2 (P0) — Accessibility (WCAG 2.1 AA)
- **AC:** Inline suggestion UI meets **WCAG 2.1 AA** — sufficient colour contrast (≥ 4.5:1 for text), never colour-alone signalling, screen-reader-announceable suggestions, and full keyboard operability with no keyboard traps. Honours terminal/OS high-contrast and reduced-motion settings.

### NFR-3 (P0) — Cross-environment support & non-statefulness
- **AC:** Verified on local terminal, IDE integrated terminal, CI/CD, Cloud Shell, remote/SSH, and at least one AI terminal. The enhancement is non-stateful (no mode to enter/exit), does not override user keybindings, and functions within tmux/screen. *(T3, T7, T8)*

### NFR-4 (P1) — Privacy & security
- **AC:** Resource lookups use only the CLI's existing authenticated context; no credentials are persisted by the enhancement; no command content is sent to third parties beyond the Azure APIs already used by the CLI.

## Success Metrics

| Metric | Baseline / benchmark | Target | Rationale (evidence) |
|--------|----------------------|--------|----------------------|
| **Retention (primary)** | Azure Copilot ~20%; AI Shell ~6%; az interactive ~14%/90d | **> 25%** sustained (monthly), decisively beating the ~20% benchmark | Retention is the scoreboard; modes failed here (T1, gap #4) |
| **Adoption** | az interactive ~0.1% | **≥ 10%** of Azure CLI users engaging inline suggestions within 2 quarters | Additive value should vastly exceed the modal ceiling (T1) |
| **Inline suggestion latency** | az interactive "too slow" | **p95 ≤ 100 ms** (cached/local) | Directly addresses slowness complaints (T6, HaTS v2.54.0/2.61.0) |
| **Resource-lookup responsiveness** | unstable/slow | async, **≤ 500 ms** before graceful fallback; 0 blocking hangs | Stability was a churn driver (T6) |
| **Interoperability integrity** | `#`-prefix friction | **100%** of non-az commands run natively, 0 extra steps | Core interoperability lesson (T3) |
| **Cross-environment reach** | local-only TUI | Live in **≥ 3 environments** at GA (incl. ≥ 1 non-local: IDE/CI-CD/AI terminal) | Avg 1.86 contexts; portability (T7, T8) |
| **Failed-run reduction** | guesswork-driven failures | Measurable **↓ in invalid-parameter first-run failures** for enhanced sessions | Journey Stages 3/8; validated enum suggestions (FR-2) |
| **Expert engagement (anti-stigma)** | "beginner mode" cap | Adoption among **experienced/daily** users ≥ adoption among new users | De-stigmatise expert value (T4) |

## Next Steps

- **PRD gate check:** all P0 functional requirements (FR-1…FR-7) and P0 NFRs carry acceptance criteria — Define stage completion criterion met.
- Brief the Ideator with the ranked HMWs, three personas, and this PRD; require FR-5 (interoperability) and NG1 (no mode) as non-negotiable concept gates.
- Instrument for the success metrics above from first prototype; confirm the >25% retention target with the PM against current Azure Copilot data.
- All requirements trace to the approved 2025 HaTS / UXR source; revisit targets if newer telemetry lands.
