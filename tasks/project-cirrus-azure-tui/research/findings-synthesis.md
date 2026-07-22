---
title: "Project Cirrus — Findings Synthesis: Azure CLI Enhancement Direction"
phase: discover
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Researcher Agent"
related:
  - "research/web/cirrus-uxr-summary-source.md"
  - "research/competitive-analysis.md"
  - "research/market-insights.md"
---

# Findings Synthesis: The Case for Additive, Inline Azure CLI Enhancement

This document synthesises the prior Cirrus UXR summary ("What Prior Research Tells Us About Azure-Flavoured TUIs," Alasadi, May 2026) into unified themes, evidence-backed insights, and a ranked set of opportunity areas. It is the anchor artifact for the Define phase. **The strategic thesis is consistent across every data point: the winning direction is an additive, inline, non-modal enhancement to Azure CLI that works across all execution environments — not a new dedicated TUI mode.**

## Overview

Two generations of Azure-flavoured TUI experiments — `az interactive` (2023) and AI Shell — generated initial curiosity but failed to achieve durable adoption or retention. Concept evaluations, telemetry, and usage-behaviour data converge on a single conclusion: users reject dedicated modes and want fluid, context-aware enhancements that preserve normal terminal behaviour across the multi-cloud, multi-environment workflows they already live in.

## Unified Themes

| # | Theme | What the evidence shows | Key sources |
|---|-------|-------------------------|-------------|
| T1 | **Dedicated modes fail to retain** | `az interactive` reached only ~0.1% adoption and ~14% 90-day retention; AI Shell hit ~56% Day-1 return but collapsed to ~6% monthly retention (vs ~20% for Azure Copilot). Novelty is high; habit formation is weak. | Telemetry (90-day); AI Shell retention data |
| T2 | **Mode-switching is intrinsic friction** | Users describe entering/exiting a mode as "unnatural," "heavyweight," "cluttered," "like running two different programs." They want additive, non-stateful enhancements. | 2025 concept evals (Participants 2 & 4) |
| T3 | **Modes break interoperability** | `az interactive` couldn't fluidly run non-az commands (kubectl, PowerShell, npm) except via a poorly-discoverable `#` prefix; conflicted with tmux/screen; non-customizable shortcuts (F1/F3, Ctrl+C vs Ctrl+L). | HaTS v2.40.0, v2.59.0 |
| T4 | **Positioned as a beginner aid, not a workflow tool** | MVPs, instructors, and training content consistently frame `az interactive` as a "secret" onboarding feature for newcomers — a transitional-learning framing that caps repeat use. | External framing (Cloud360, KnowOps, Cogan, Bründl, Gule) |
| T5 | **The underlying capabilities are valued — the container is not** | Users praised dynamic resource lookups, discoverability support, and interactive syntax guidance even while abandoning the mode. The value is in the intelligence, not the TUI shell. | HaTS v2.67.0; source TL;DR |
| T6 | **Performance/reliability accelerated abandonment (but didn't cause non-adoption)** | Slow, unstable, error-prone startup drove churn — yet 0.1% adoption implies the interaction model, not just bugs, was the core problem. | HaTS v2.50.0, v2.54.0, v2.61.0 |
| T7 | **Users work across many clouds and environments** | 68.9% of Azure CLI users (72.2% PowerShell) work multi-cloud; avg 1.86 execution contexts spanning local terminal, IDE, CI/CD, Cloud Shell, remote. | 2025 HaTS |
| T8 | **AI-assisted terminals are an emerging channel** | 13.1% already run Azure CLI via AI terminals (Claude Code, Copilot CLI, etc.) — a real, growing conversational surface. | 2025 HaTS |

## Validated Insights (each tied to evidence)

1. **A dedicated Azure TUI mode has a proven retention ceiling.** Both prior experiments failed at the retention layer, not just the acquisition layer — the ~14% (`az interactive`, 90-day) and ~6% (AI Shell, monthly) figures show even engaged users did not form a habit. *Evidence: T1.*
2. **Friction lives in the mode boundary itself.** The act of switching in/out is the reported pain, independent of feature quality — "the amount of energy and work it takes to switch back and forth… wasn't seamless." *Evidence: T2 (Participant 4).*
3. **Modes are incompatible with real, compositional terminal workflows.** Users routinely interleave az with kubectl, PowerShell, git, and tmux; any Azure-only container that degrades this composability creates net friction. *Evidence: T3, T7.*
4. **Discoverability, context-awareness, and speed are the real unmet needs.** Users explicitly asked for faster, more stable, dynamically-aware assistance — and valued those capabilities when present. *Evidence: T5, T6.*
5. **The addressable surface is broader than the local terminal.** With avg 1.86 contexts and a >10% AI-terminal cohort, enhancements must be portable to IDE, CI/CD, Cloud Shell, remote, and AI-terminal surfaces. *Evidence: T7, T8.*
6. **"Beginner-only" positioning is a self-fulfilling adoption cap.** Framing anchored `az interactive` as a training-wheels feature, discouraging experienced daily users. Any new investment must deliver value to experienced users in their existing flow. *Evidence: T4.*

## Ranked Opportunity Areas

Ranked by strategic leverage (evidence strength × addressable value × alignment with the additive/inline thesis).

| Rank | Opportunity | Rationale & evidence | Thesis fit |
|------|-------------|----------------------|-----------|
| 1 | **Inline intelligent autocomplete & contextual suggestions** (no mode) | The valued capabilities (dynamic resource lookup, next-command hints, syntax guidance) delivered directly in the normal shell — captures T5 value without the T1/T2 mode penalty. | Core |
| 2 | **Cross-environment portability** | Design enhancements to travel to IDE, CI/CD, Cloud Shell, remote, and AI terminals, not just local (avg 1.86 contexts; 13.1% AI-terminal). | Core |
| 3 | **Interoperable / non-stateful UX** | Enhancements that never trap the user, always allow non-az commands, and respect tmux/screen + customizable shortcuts. Directly answers T3 complaints. | Core |
| 4 | **Context-aware discoverability for experienced users** | Surface guidance additively (e.g., inline, dismissible) so it aids experts without the "beginner mode" stigma of T4. | Core |
| 5 | **Performance-first delivery** | Fast, cached, stable startup and response — table-stakes given HaTS abandonment signals (T6). | Enabler |
| 6 | **AI-terminal integration** | Meet the emerging 13.1% cohort where they are; ensure Azure CLI enhancements compose well with conversational AI terminals rather than competing with a bespoke mode. | Adjacent |

## Next Steps

- Hand this synthesis to the Strategist as the Define-phase anchor; pair with `competitive-analysis.md` (gap map) and `market-insights.md` (behaviour trends).
- Validate opportunity ranking against any additional telemetry the PM can supply; flag that all figures here derive solely from the approved UXR source.
- Frame Define-phase problem statements around opportunities #1–#4 (the "Core" thesis cluster), treating #5 as an enabler and #6 as an adjacency.
