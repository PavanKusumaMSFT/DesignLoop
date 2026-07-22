---
title: "Project Cirrus — Problem Statements (How Might We)"
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
---

# Problem Statements: Inline Azure CLI Enhancement

This document translates the Discover-phase evidence into a prioritised set of How Might We (HMW) problem statements. Each statement names a specific user, an unmet need, and the research insight that surfaces it. Every statement is deliberately framed to preserve the strategic thesis: **an additive, inline, non-modal enhancement to Azure CLI — never a new dedicated TUI "mode."**

## Overview

Two prior modal experiments failed at the retention layer, not just acquisition: `az interactive` reached ~0.1% adoption / ~14% 90-day retention, and AI Shell collapsed from ~56% Day-1 return to ~6% monthly retention (vs. the ~20% Azure Copilot benchmark). Users valued the *intelligence* (dynamic resource lookups, discoverability, syntax guidance) but rejected the *container* (mode-switching, broken interoperability, "beginner-only" framing). Meanwhile, real usage is multi-cloud (68.9%), multi-environment (avg 1.86 contexts), and increasingly AI-terminal-based (13.1%). The problem space is therefore how to deliver expert-grade Azure intelligence *in place*, everywhere users already work, without asking them to change into a mode.

## How Might We Statements

### HMW-1 — Deliver valued intelligence without a mode
**How might we** give an Azure-primary developer the dynamic resource lookups, next-command hints, and syntax guidance they valued **inline in their normal shell**, so they never have to "enter" or "exit" a mode?
- **User:** Azure-primary developer authoring non-trivial `az` commands.
- **Unmet need:** The capabilities were praised but locked in a rejected container.
- **Insight:** T5 — "the underlying capabilities are valued, the container is not" (HaTS v2.67.0: *"I really enjoyed az interactive with its dynamic resource lookups… I'd like to see it stabilized"*). T1/T2 — modes fail to retain and mode-switching is intrinsic friction.

### HMW-2 — Never trap the compositional user
**How might we** let a multi-cloud DevOps engineer keep interleaving `kubectl`, PowerShell, `git`, and AWS/gcloud commands **with zero extra steps**, so Azure intelligence never degrades a compositional workflow?
- **User:** Multi-cloud DevOps engineer running mixed toolchains.
- **Unmet need:** Non-az commands must always run natively; no `#`-prefix workaround.
- **Insight:** T3 — modes break interoperability (HaTS v2.40.0: *"I'm not able to use a combination of kubectl powershell and AZ"*). T7 — 68.9% multi-cloud.

### HMW-3 — Make enhancements portable across environments
**How might we** ensure Azure CLI intelligence **travels** to the IDE terminal, CI/CD, Cloud Shell, remote sessions, and AI terminals, so users get the same help everywhere they already work (not just the local terminal)?
- **User:** Developer spanning IDE (49.4%) + local terminal (60.2%) + CI/CD (23.2%).
- **Unmet need:** Local-only enhancements reach a shrinking slice of real usage.
- **Insight:** T7/T8 — avg 1.86 contexts; 13.1% AI-terminal cohort. Market-insights §2 portability implication.

### HMW-4 — Aid experts without the "beginner mode" stigma
**How might we** surface contextual discoverability **additively and dismissibly** so it helps experienced daily users in their existing flow, rather than signalling a training-wheels feature they'll abandon?
- **User:** Experienced Azure daily user working with unfamiliar parameters/services.
- **Unmet need:** Guidance that respects expertise instead of capping repeat use.
- **Insight:** T4 — "beginner aid, not workflow tool" positioning ("SECRET mode, beginners must see"). Competitive gap #5 — de-stigmatised expert value.

### HMW-5 — Be fast and stable enough to keep
**How might we** make inline suggestions **fast, cached, and non-blocking** so we eliminate the slowness/instability that accelerated abandonment and never slow down a keystroke?
- **User:** Any Azure CLI user typing under time pressure.
- **Unmet need:** Sub-perceptible latency; no startup penalty; graceful failure.
- **Insight:** T6 — performance/reliability accelerated churn (HaTS v2.54.0, v2.61.0: *"startup time is too slow… cache things perhaps?"*).

### HMW-6 — Compose with AI terminals rather than compete
**How might we** make Azure CLI enhancements **compose gracefully** with AI-assisted terminals (Claude Code, Copilot CLI), delivering first-party Azure context those general tools lack, instead of building a rival AI mode?
- **User:** AI-terminal-forward power user (13.1% cohort).
- **Unmet need:** First-party Azure depth inside the AI terminals they already adopt.
- **Insight:** T8 — AI terminals emerging; AI Shell's ~6% retention shows a bespoke rival mode fails. Competitive gap #1 — the unowned intersection.

## Scoring & Ranking

Scored 1–5 on four dimensions, weighted by strategic leverage. **Reach** = size of affected population; **Evidence** = strength/directness of the research signal; **Thesis fit** = alignment with additive/inline direction; **Feasibility** = build tractability (higher = easier). Priority = (Reach + Evidence + ThesisFit) × ThesisWeight, with Feasibility as a tie-breaker. Core-thesis items outrank enablers and adjacencies.

| Rank | HMW | Reach | Evidence | Thesis Fit | Feasibility | Priority Score | Tier |
|------|-----|:---:|:---:|:---:|:---:|:---:|------|
| 1 | HMW-1 Intelligence without a mode | 5 | 5 | 5 | 3 | **18** | Core |
| 2 | HMW-2 Never trap the compositional user | 5 | 5 | 5 | 4 | **19** | Core |
| 3 | HMW-3 Cross-environment portability | 4 | 4 | 5 | 2 | **15** | Core |
| 4 | HMW-4 Expert value, no stigma | 4 | 4 | 5 | 3 | **16** | Core |
| 5 | HMW-5 Fast & stable | 5 | 4 | 4 | 3 | **16** | Enabler |
| 6 | HMW-6 Compose with AI terminals | 3 | 3 | 4 | 2 | **12** | Adjacent |

**Ranked priority order (leverage-adjusted):** HMW-2 ≈ HMW-1 (top core pair) → HMW-4 ≈ HMW-5 → HMW-3 → HMW-6.

> Interpretation: HMW-1 and HMW-2 are the twin pillars — deliver the valued intelligence *and* never break interoperability. HMW-4 and HMW-5 are near-equal must-haves (expert framing + performance). HMW-3 is a core differentiator with lower build feasibility (staged rollout). HMW-6 is an adjacency to design *for* but not to lead with.

## Next Steps

- Carry HMW-1, HMW-2, HMW-4, HMW-5 into the PRD as must-have requirement drivers; treat HMW-3 as a phased must-have and HMW-6 as a compatibility constraint.
- Hand ranked statements to the Ideator as the framing for concept generation; every concept must satisfy HMW-2 (interoperability) as a gate.
- Validate the scoring weights with the PM if fresh telemetry arrives; all inputs currently derive from the approved 2025 HaTS / UXR source.
