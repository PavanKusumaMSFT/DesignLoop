---
title: "Project Cirrus — Concept Evaluation & Shortlist"
phase: ideate
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Ideator Agent"
related:
  - "ideation/concept-brainstorm.md"
  - "ideation/hmw-reframing.md"
  - "strategy/requirements-prd.md"
  - "strategy/personas.md"
---

# Concept Evaluation: Scoring, Gate Checks & Shortlist

This document converges the 24 brainstormed concepts into a buildable shortlist. Each concept is first **gate-checked** against the two non-negotiables (NG1 no-mode, FR-5 interoperability); anything that fails is cut before scoring. Survivors are scored on **Desirability × Feasibility × Viability**, cross-checked against all three personas, and mapped to a single coherent design direction.

## Overview

Evaluation is a two-stage funnel:

1. **Gate stage (pass/fail).** A concept must clear **NG1** (introduces no mode to enter/exit) *and* **FR-5** (non-az commands run natively, zero extra steps). Fail either → cut, regardless of appeal.
2. **Score stage (1–5 each).** For gate-passers:
   - **Desirability (D):** how strongly it serves the ranked HMWs and the three personas' top needs.
   - **Feasibility (F):** build tractability within the inline/performance constraints (higher = easier).
   - **Viability (V):** contribution to the retention/adoption thesis (habit over novelty; ≥ 25% retention target).
   - **Gate margin (G):** confidence it *robustly* stays within NG1/FR-5 under stress (5 = trivially safe, 1 = fragile).

Weighted total = **D×0.35 + F×0.25 + V×0.25 + G×0.15**, rounded to one decimal. The shortlist is drawn from the top cluster *plus* concepts that are structurally required to make the others work (architectural spine, capability layer).

## Gate Check (pass/fail first)

| # | Concept | NG1 (no mode) | FR-5 (non-az runs) | Verdict |
|---|---------|:---:|:---:|:---:|
| C1 | Ghost-text completion | ✓ | ✓ | pass |
| C2 | Inline dropdown menu | ✓ | ✓ | pass |
| C3 | Widened Tab completion | ✓ | ✓ | pass |
| C4 | Did-you-mean correction | ✓ | ✓ | pass |
| C5 | Contextual parameter palette | ✓ | ✓ | pass |
| C6 | Valid-enum value completion | ✓ | ✓ | pass |
| C7 | Required-param checklist | ✓ | ✓ | pass |
| C8 | Pre-flight validation glow | ✓ | ⚠ latency risk | conditional |
| C9 | Live resource completion | ✓ | ✓ | pass |
| C10 | Async cached-first render | ✓ | ✓ | pass |
| C11 | Cross-sub disambiguation | ✓ | ✓ | pass |
| C12 | Predictive next-resource | ✓ | ✓ | pass (speculative) |
| C13 | Dismissible expert hint line | ✓ | ✓ | pass |
| C14 | On-demand peek | ✓ | ✓ | pass |
| C15 | Neutral relevance ranking | ✓ | ✓ | pass (principle) |
| C16 | Explain-on-hover (IDE) | ✓ | ✓ | pass (conditional) |
| C17 | Capability-detecting layer | ✓ | ✓ | pass |
| C18 | Shared core + adapters | ✓ | ✓ | pass (spine) |
| C19 | Portable settings sync | ✓ | ✓ | pass |
| C20 | Pre-warmed cache | ✓ | ✓ | pass |
| C21 | First-party context provider | ✓ | ✓ | pass |
| C22 | AI-output validation hook | ✓ | ✓ | pass |
| C23 | Shared CLI/AI cache | ✓ | ✓ | pass |
| **C24** | **Bespoke AI chat mode** | **✗** | **✗** | **CUT — fails both gates** |

**C24 is eliminated here** and carried no further: it *is* a dedicated mode (NG1 violation) and rivals AI terminals (NG2), reproducing the AI Shell ~6% retention failure.

## Scoring Matrix (gate-passers)

Scores 1–5. Weighted total = D×0.35 + F×0.25 + V×0.25 + G×0.15.

| # | Concept | D | F | V | G | **Total** | Tier |
|---|---------|:-:|:-:|:-:|:-:|:---:|------|
| C9 | Live resource completion | 5 | 3 | 5 | 4 | **4.35** | Shortlist |
| C6 | Valid-enum value completion | 5 | 4 | 5 | 5 | **4.75** | Shortlist |
| C5 | Contextual parameter palette | 5 | 4 | 5 | 5 | **4.75** | Shortlist |
| C1 | Ghost-text completion | 5 | 4 | 4 | 5 | **4.50** | Shortlist |
| C10 | Async cached-first render | 4 | 4 | 5 | 5 | **4.40** | Shortlist (enabler) |
| C17 | Capability-detecting layer | 5 | 3 | 5 | 5 | **4.60** | Shortlist (portability) |
| C18 | Shared core + adapters | 5 | 2 | 5 | 5 | **4.30** | Shortlist (spine) |
| C13 | Dismissible expert hint line | 4 | 4 | 4 | 5 | **4.15** | Shortlist (anti-stigma) |
| C21 | First-party context provider | 4 | 2 | 4 | 4 | **3.50** | Shortlist (Phase 2) |
| C15 | Neutral relevance ranking | 4 | 5 | 4 | 5 | **4.40** | Fold-in (principle) |
| C3 | Widened Tab completion | 4 | 5 | 3 | 5 | **4.20** | Fold-in / alt to C1 |
| C7 | Required-param checklist | 4 | 4 | 4 | 5 | **4.15** | Fold-in |
| C14 | On-demand peek | 3 | 4 | 4 | 4 | **3.65** | Fold-in |
| C20 | Pre-warmed cache | 3 | 4 | 4 | 5 | **3.90** | Fold-in (perf) |
| C11 | Cross-sub disambiguation | 3 | 3 | 3 | 4 | **3.15** | Backlog |
| C22 | AI-output validation hook | 3 | 2 | 3 | 4 | **2.90** | Backlog (Phase 2) |
| C23 | Shared CLI/AI cache | 3 | 3 | 3 | 5 | **3.20** | Backlog (Phase 2) |
| C16 | Explain-on-hover (IDE) | 3 | 3 | 3 | 5 | **3.20** | Backlog (surface-specific) |
| C2 | Inline dropdown menu | 3 | 3 | 3 | 3 | **3.00** | Backlog (alt to C1) |
| C4 | Did-you-mean correction | 3 | 4 | 3 | 5 | **3.55** | Backlog |
| C19 | Portable settings sync | 2 | 3 | 3 | 5 | **3.05** | Backlog |
| C12 | Predictive next-resource | 3 | 2 | 3 | 4 | **2.90** | Backlog (speculative) |
| C8 | Pre-flight validation glow | 3 | 2 | 3 | 2 | **2.55** | **Cut — latency gate risk** |

## Persona Stress-Test of the Shortlist

Each shortlisted concept must earn its place against all three personas.

| Concept | Maya (interop gate) | David (IDE portability, anti-stigma) | Priya (AI-terminal, portability) |
|---------|---------------------|--------------------------------------|----------------------------------|
| C5 Parameter palette | Steps aside for kubectl; az-scoped ✓ | Solves Journey Stage 3 param guesswork ✓ | Feeds correct flags into AI drafts ✓ |
| C6 Enum completion | No keystroke block; cached ✓ | Kills the `--sku` failed-run loop (Stage 8) ✓ | Prevents deprecated-SKU AI errors ✓ |
| C9 Resource lookup | Reuses auth; async, no hang ✓ | Solves Stage 4 RG lookup in IDE ✓ | Supplies real resource names to AI ✓ |
| C1 Ghost-text | Right-arrow accept, else ignored ✓ | Fast incremental authoring ✓ | Works in AI-terminal shells too ✓ |
| C10 Async cache | Never blocks a keystroke ✓ (her uninstall trigger) | p95 ≤ 100 ms in IDE ✓ | Consistent speed across surfaces ✓ |
| C17 Capability layer | No-op in CI; tmux-safe ✓ | Renders rich in IDE terminal ✓ | Degrades gracefully in AI terminal ✓ |
| C18 Core + adapters | One non-az contract everywhere ✓ | Same brain in IDE + Cloud Shell ✓ | Enables the AI-terminal adapter ✓ |
| C13 Expert hint line | Dismissible; no clutter ✓ | Neutral copy, no beginner stigma ✓ | Opt-in depth ✓ |
| C21 Context provider | Optional; doesn't touch her shell ✓ | Consistency into Cloud Shell ✓ | Her #1 need: Azure-aware AI terminal ✓ |

No shortlisted concept fails a persona. **C8 was cut** because it cannot guarantee Maya's "never block a keystroke" rule under live validation — a latency/interop gate risk not worth its marginal value.

## Shortlist (carried into Design)

The shortlist is a **coherent stack**, not a menu — it composes into one inline intelligence layer:

1. **C18 — Shared intelligence core + thin surface adapters** *(architectural spine).* Build the brain once; adapt per surface. Makes portability (HMW-3) and AI composition (HMW-6) tractable.
2. **C17 — Capability-detecting rendering layer** *(portability + graceful degradation).* Rich inline → plain hints → silent CI no-op. Satisfies FR-6, HMW-3, NG3.
3. **Inline suggestion surfaces — C1 + C5 + C6 + C9** *(the valued intelligence).* Ghost-text command completion, contextual parameter palette, valid-enum values, and live resource lookup — the four capabilities users explicitly praised (T5), delivered inline (HMW-1). C15 (neutral ranking) and C7 (required-param checklist) fold in as presentation principles.
4. **C10 — Async, cached-first performance pattern** *(enabler).* Guarantees p95 ≤ 100 ms and non-blocking lookups (HMW-5, FR-7, NFR-1). C20 (pre-warm) folds in.
5. **C13 — Dismissible, expert-framed hint line** *(anti-stigma discoverability).* Neutral copy, persistent disable setting (HMW-4). C14 (on-demand peek) folds in as opt-in depth.
6. **C21 — First-party Azure context provider for AI terminals** *(Phase 2 composition play).* Compose with Copilot CLI / Claude Code, don't rival them (HMW-6, NG2). Sequenced after the core proves out.

## Justification of the Cut

- **C24 (bespoke AI mode)** — cut at the gate: violates NG1 + NG2; reproduces AI Shell's ~6% retention failure by construction.
- **C8 (pre-flight validation glow)** — cut on the latency gate: cannot robustly promise it never delays Enter; low gate margin (G=2) against Maya's uninstall trigger.
- **C11, C4, C12, C16, C19, C2, C22, C23 (backlog)** — all pass gates but score lower on desirability/feasibility or are surface-specific/speculative. They are *deferrable enrichments*, not the core value. C22/C23 attach naturally to the C21 Phase-2 provider; C16 attaches to the IDE adapter; C2 is a fallback rendering if C1 ghost-text underperforms; C12 is speculative upside pending prediction-accuracy evidence.
- **Fold-ins (C3, C7, C14, C15, C20)** — not standalone shortlist items but merged into the shortlisted stack as principles or perf tactics, avoiding surface proliferation.

## Next Steps

- Record the chosen direction and rationale in `decision-log.md`, tying each decision to these scores and the persona stress-test.
- Hand the shortlist stack to the Design Lead as a single design direction: **an inline, non-modal Azure CLI intelligence layer** (spine + capability layer + four suggestion surfaces + async-cache enabler + expert hint line), with the AI-terminal context provider as a sequenced Phase-2 extension.
- Flag C8's latency concern and C12's accuracy dependency as open questions for prototyping.
