---
title: "Project Cirrus — Ideation Decision Log"
phase: ideate
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Ideator Agent"
related:
  - "ideation/concept-evaluation.md"
  - "ideation/concept-brainstorm.md"
  - "ideation/hmw-reframing.md"
  - "strategy/requirements-prd.md"
  - "strategy/personas.md"
  - "strategy/problem-statements.md"
---

# Decision Log: Chosen Design Direction

This log records the key ideation decisions for Project Cirrus, the evidence behind each, the alternatives considered, and the risks accepted. It is the primary hand-off artifact to the Design Lead: it names **one buildable design direction** and explains why it wins.

## Overview

Ideation diverged into 24 concepts across six lenses, gate-checked them against NG1 (no mode) and FR-5 (interoperability), scored the survivors on desirability × feasibility × viability, and stress-tested the shortlist against all three personas. The convergent result is a single coherent stack — **an inline, non-modal Azure CLI intelligence layer** — assembled from mutually reinforcing concepts rather than one isolated feature. Every decision traces to the 2025 HaTS / UXR evidence via the Define artifacts.

## The Decision (chosen direction)

**Build one inline, non-modal Azure CLI intelligence layer** composed of:

- **A shared intelligence core with thin per-surface adapters** (C18) — the architectural spine that makes the same brain portable across local terminal, IDE, Cloud Shell, CI/CD, remote, and AI terminals.
- **A capability-detecting rendering layer** (C17) — rich inline UI where supported, plain hints where constrained, silent no-op in non-interactive CI (FR-6, NG3).
- **Four inline suggestion surfaces** — ghost-text command completion (C1), contextual parameter palette (C5), valid-enum value completion (C6), and dynamic live resource lookup (C9) — the exact capabilities users praised in prior modes (T5), now delivered in place (HMW-1). Neutral relevance ranking (C15) and a required-param checklist (C7) fold in as presentation principles.
- **An async, cached-first performance pattern** (C10, with C20 pre-warm) — guaranteeing p95 ≤ 100 ms, non-blocking input, and no startup penalty (HMW-5, FR-7, NFR-1).
- **A dismissible, expert-framed hint line** (C13, with on-demand peek C14) — additive discoverability with neutral copy and a persistent disable setting, de-stigmatised from "beginner mode" (HMW-4).
- **A first-party Azure context provider for AI terminals** (C21) — sequenced as **Phase 2**, composing with Copilot CLI / Claude Code rather than rivalling them (HMW-6, NG2).

This stack satisfies all six HMWs, both hard gates, and the top persona needs simultaneously.

## Rationale (tied to scores & evidence)

1. **It delivers the praised intelligence without the rejected container.** C5/C6 (both 4.75) and C1 (4.50) top the matrix; they are the "dynamic resource lookups, discoverability, syntax guidance" users valued (T5) delivered inline (HMW-1) — directly answering the retention failure of `az interactive` (~14%/90d) and AI Shell (~6% monthly).
2. **It is interoperability-safe by construction.** Every shortlisted concept scores G≥4 on gate margin and passes Maya's tmux + mixed-toolchain stress test — az-scoped suggestion, native pass-through for kubectl/pwsh/git/aws/gcloud (FR-5, HMW-2). The one concept that couldn't guarantee this (C8, G=2) was cut.
3. **It is portable, which is where prior efforts failed to reach.** C17 (4.60) + C18 (4.30) make the same intelligence travel to the IDE (49.4%), Cloud Shell, CI/CD (23.2%), and AI terminals (13.1%) — matching the avg 1.86-context reality (HMW-3) that a local-only TUI misses.
4. **It is fast enough to form a habit.** C10 (4.40) enforces the p95 ≤ 100 ms / async ≤ 500 ms budget that the retention target (> 25%) depends on (HMW-5, T6).
5. **It respects experts.** C13 (4.15) surfaces guidance additively and dismissibly with neutral copy — breaking the "beginner mode" adoption cap (HMW-4, T4).
6. **It composes with, rather than competes against, AI terminals.** C21 supplies first-party Azure context to the AI surfaces Priya already uses, avoiding the rival-mode trap that sank AI Shell (HMW-6, NG2).

## Alternatives Considered (and why not)

- **A bespoke Cirrus AI chat mode (C24).** Rejected at the gate — it *is* a dedicated mode (NG1) and rivals AI terminals (NG2), reproducing AI Shell's ~6% retention by construction. This is the anti-pattern the whole project exists to avoid.
- **Pre-flight validation glow (C8).** Rejected on the latency/interop gate — cannot robustly promise it never delays Enter; low gate margin against Maya's "anything that blocks a keystroke gets uninstalled" behaviour. Its intent (fewer failed runs) is met more safely by C6 valid-enum completion upstream.
- **Inline dropdown menu (C2) as the primary autocomplete UX.** Deferred in favour of ghost-text (C1), which is lighter-weight and less likely to repaint or clutter the line; C2 is retained as a fallback rendering if C1 underperforms in testing.
- **Leading with the AI-terminal provider (C21) in Phase 1.** Deferred to Phase 2 — lower feasibility (F=2) and it depends on the shared core (C18) existing first. Building the core intelligence first de-risks the composition play.
- **Speculative predictive next-resource (C12) and cross-sub disambiguation (C11).** Backlogged as enrichments — real but lower-leverage, and C12 depends on unproven prediction accuracy.

## Risks Accepted

| Risk | Description | Mitigation / acceptance |
|------|-------------|-------------------------|
| **R1 — Portability build cost** | C17 + C18 (F=3 / F=2) are the hardest to build; portability is where feasibility is lowest (HMW-3 tier: staged rollout). | Accept a **phased surface rollout**: prove the core in local + IDE terminals first, then Cloud Shell/CI, then AI terminals. Ship ≥ 3 environments at GA (success metric). |
| **R2 — Latency under live lookup** | C9 network lookups risk breaching the 100 ms feel if the async/cache pattern is imperfect. | C10 cached-first + ≤ 500 ms time-box + graceful free-text fallback (FR-3, NFR-1); instrument latency from first prototype. |
| **R3 — Suggestion noise / expert annoyance** | Too-eager inline UI could feel like clutter and re-trigger abandonment. | C13/C15 neutral, dismissible, persistently disable-able; ghost-text (C1) is ignorable by default. Validate with expert users in prototype testing. |
| **R4 — AI-terminal integration uncertainty** | C21 depends on external AI terminals adopting a context interface (F=2). | Deferred to Phase 2; design the core provider to a stable, standard-ish interface (e.g., MCP-style) so adoption is opt-in and doesn't gate Phase 1 value. |
| **R5 — Interop regressions in edge shells** | Rare shell/tmux configs could still see interference. | FR-5 + NG3 as non-negotiable test gates; verify across the NFR-3 surface matrix before GA. |

## Traceability Snapshot

| Decision element | HMW | PRD driver | Evidence |
|------------------|-----|-----------|----------|
| Inline suggestion surfaces (C1/C5/C6/C9) | HMW-1 | FR-1, FR-2, FR-3 | T5 valued capabilities |
| Non-az pass-through contract | HMW-2 | FR-5 | T3, T7 |
| Core + adapters, capability layer (C18/C17) | HMW-3 | FR-6, NFR-3 | T7, T8; avg 1.86 contexts |
| Expert hint line (C13) | HMW-4 | FR-4 | T4 anti-stigma |
| Async cached-first (C10) | HMW-5 | FR-7, NFR-1 | T6 performance churn |
| AI-terminal context provider (C21) | HMW-6 | FR-6 AC-6.3 | T8; AI Shell ~6% (NG2) |

## Next Steps

- **Hand to Design Lead → Designer:** brief the design of one inline, non-modal Azure CLI intelligence layer using this log + `strategy/requirements-prd.md` (P0 FRs) + `strategy/personas.md`.
- **Phase the build:** Phase 1 = core intelligence + local/IDE surfaces + the four suggestion surfaces + async cache + hint line; Phase 2 = Cloud Shell/CI portability + AI-terminal context provider (C21).
- **Carry open questions into prototyping:** R2 latency validation, R3 expert-noise tuning, and C8's cut (confirm C6 fully covers the failed-run-prevention intent).
- All decisions trace to the approved 2025 HaTS / UXR source via the Define artifacts; revisit if newer telemetry lands.
