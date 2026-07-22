---
title: "Project Cirrus — Market Insights: Usage Behaviour & Trends"
phase: discover
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Researcher Agent"
related:
  - "research/web/cirrus-uxr-summary-source.md"
  - "research/findings-synthesis.md"
  - "research/competitive-analysis.md"
---

# Market Insights: Usage Behaviour & Trends for Azure CLI

This document synthesises the usage-behaviour and market-trend signals from the approved Cirrus UXR source into design implications. The behavioural data — multi-cloud prevalence, multi-environment compositionality, and emerging AI-terminal adoption — independently reinforces the strategic thesis: **an enhancement must be additive, inline, and portable across environments, because that is where and how Azure CLI users actually work.**

## Overview

Azure CLI usage is not a single-tool, single-environment activity. Users operate across multiple cloud providers, average nearly two execution contexts, and are increasingly reaching Azure CLI through AI-assisted terminals. Any Azure-specific modal experience fights against all three trends; an inline enhancement rides with them.

## Key Behavioural Signals

| Signal | Data point | Source |
|--------|-----------|--------|
| Multi-cloud is the norm | 68.9% of Azure CLI users (72.2% Azure PowerShell) work across multiple cloud providers | 2025 HaTS |
| Highly compositional | Workflows interleave Azure CLI, AWS CLI, gCloud, Kubernetes, git, etc. | 2025 HaTS |
| Multi-environment | 60.2% local terminal, 49.4% IDE, 23.2% CI/CD, 21.6% Cloud Shell, 14.6% remote | 2025 HaTS |
| Avg contexts per user | 1.86 execution contexts | 2025 HaTS |
| AI-terminal emergence | 13.1% run Azure CLI via AI terminals (Claude Code, Copilot CLI, etc.) | 2025 HaTS |
| Modal AI retention gap | AI Shell ~6% monthly vs Azure Copilot ~20% | Source telemetry |

## Trend Analysis & Design Implications

### 1. Multi-cloud / hybrid is the default operating context
With ~69–72% of users working across clouds, an Azure-only interaction container conflicts with reality. Users constantly switch between Azure CLI, AWS CLI, gCloud, kubectl, and git in one flow. **Implication:** enhancements must never lock users into an Azure-specific model or degrade the ability to run non-Azure commands — the exact failure that frustrated `az interactive` users (the `#`-prefix workaround, tmux/screen friction).

### 2. Work is compositional and multi-environment
An average of 1.86 execution contexts, with meaningful IDE (49.4%), CI/CD (23.2%), Cloud Shell (21.6%), and remote (14.6%) usage beyond the local terminal, means the local shell is necessary but not sufficient. **Implication:** design for portability from day one. Enhancements that only exist in a local TUI reach a shrinking slice of real usage; inline capabilities that travel to IDE terminals, pipelines, hosted shells, and remote sessions compound value.

### 3. AI-assisted terminals are a real, growing surface
13.1% already run Azure CLI through AI terminals — a double-digit, emerging shift toward conversational, guided command-line experiences. **Implication:** rather than build a competing bespoke AI mode (AI Shell's ~6% monthly retention shows how that ends), Cirrus should ensure Azure CLI enhancements compose gracefully with the AI terminals users already adopt, and deliver first-party context these general tools lack.

### 4. The market rewards additive AI over modal AI
Azure Copilot (~20% retention) meaningfully outperforms AI Shell (~6% monthly), and `az interactive` sits at ~14% (90-day). **Implication:** retention correlates with reduced statefulness. The design direction with the best market-proven retention profile is the least modal one.

## Strategic Direction (grounded in the data)

Every behavioural trend points the same way: build **faster, more discoverable, context-aware Azure CLI enhancements that are additive, non-modal, and portable** across local terminal, IDE, CI/CD, Cloud Shell, remote machines, and AI-powered terminals. The market is not asking for a new place to do Azure work — it is asking for Azure work to be smarter everywhere it already happens.

## Next Steps

- Provide the Strategist with the multi-cloud (68.9%), multi-environment (avg 1.86), and AI-terminal (13.1%) figures as sizing inputs for prioritising target environments in Define.
- Recommend Define-phase concepts be tested for portability across at least local terminal + one non-local context (IDE, CI/CD, or AI terminal).
- Flag that all figures derive from the approved 2025 HaTS / UXR source; refresh if newer HaTS waves become available.
