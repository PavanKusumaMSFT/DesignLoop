---
title: "Project Cirrus — User Personas"
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

# User Personas: Azure CLI Enhancement

Three evidence-grounded personas derived directly from the 2025 HaTS usage telemetry and the prior-experiment retention signals. Each persona is anchored to specific percentages so the design team can trace decisions back to behaviour, not assumption. Together they cover the multi-cloud majority (68.9%), the multi-environment reality (avg 1.86 contexts; IDE 49.4%), and the emerging AI-terminal channel (13.1%).

## Overview

The personas are chosen to represent the three behavioural axes the research proves matter: **cloud breadth**, **environment breadth**, and **channel emergence**. All three share one rejection (dedicated modes) and one desire (fast, contextual, additive Azure intelligence that stays out of the way). None of them wants a new place to do Azure work; they want Azure work to be smarter where it already happens.

## Persona 1 — Maya Okonkwo · Multi-Cloud DevOps Engineer

*"I live in a terminal that has to speak Azure, AWS, and Kubernetes in the same breath. Don't make me change modes to do that."*

- **Role:** Platform/DevOps engineer at a mid-size SaaS company; owns cross-cloud infrastructure.
- **Environments used:** Local terminal (60.2% cohort) + CI/CD pipelines (23.2%) + remote machines (14.6%). Often inside tmux.
- **Telemetry grounding:** One of the **68.9% of Azure CLI users who work multi-cloud**; her workflow interleaves Azure CLI, AWS CLI, gcloud, kubectl, and git — the exact compositional pattern the HaTS data documents.

**Goals**
- Ship and troubleshoot infra fast across clouds without context-switching penalties.
- Keep her shell scriptable, interoperable, and predictable.
- Get parameter/resource help *without* leaving her flow.

**Pain points**
- Modes break her toolchain — she cannot "use a combination of kubectl, PowerShell, and AZ" inside a container (HaTS v2.40.0). The `#`-prefix workaround is undiscoverable friction.
- `az interactive` fights tmux/screen and has non-customizable shortcuts (F1/F3, Ctrl+C vs Ctrl+L — HaTS v2.59.0).
- Slow, unstable startup wastes her time (T6).

**Behaviours**
- Composes long pipelines; pipes az output into jq, grep, and non-az tools.
- Rejects anything "heavyweight" or stateful; values minimally-stateful terminals.
- Automates repetitive work; anything that blocks a keystroke gets uninstalled.

**Scenario narrative**
Maya is debugging a failed deployment that spans an AKS cluster and an Azure storage account. In one tmux pane she runs `kubectl get pods`, then immediately needs an `az storage account` command with parameters she doesn't remember. With today's tools she either memorises flags or breaks flow to open docs; a mode would force her to "enter" a container that then can't run her next `kubectl` command cleanly. What she needs: inline parameter and resource suggestions that appear as she types `az`, disappear the instant she runs a non-az command, and never touch her tmux setup.

## Persona 2 — David Rossi · Azure-Primary Developer in an IDE

*"Half my Azure commands happen in the VS Code terminal. If the help only lives in a special local shell, it doesn't exist for me."*

- **Role:** Backend application developer; Azure is his primary cloud.
- **Environments used:** IDE integrated terminal (**49.4% cohort**) + local terminal (60.2%) + Cloud Shell (21.6%).
- **Telemetry grounding:** Represents the **avg 1.86 execution contexts** finding — his Azure work is split between the IDE terminal and occasional Cloud Shell, so any local-terminal-only enhancement reaches only part of his day.

**Goals**
- Author non-trivial `az` commands with unfamiliar parameters correctly, the first time.
- Stay inside his IDE; avoid alt-tabbing to docs or the portal.
- Learn services incrementally without feeling "handled" like a beginner.

**Pain points**
- Discoverability help was framed as a "SECRET mode… beginners must see" (external framing, T4) — stigma that made experienced devs like him skip it.
- Enhancements bound to a local TUI don't travel into his IDE terminal or Cloud Shell (Market-insights §2).
- Guessing at parameter names and valid resource values slows authoring and causes failed runs.

**Behaviours**
- Types commands incrementally, leaning on autocomplete; reads inline hints if they don't interrupt.
- Wants dismissible, additive guidance — help on tap, gone when unwanted.
- Uses Cloud Shell for quick pre-authed tasks; expects consistency between surfaces.

**Scenario narrative**
David is wiring an app to Azure Service Bus from the VS Code terminal. He starts `az servicebus namespace create` but isn't sure of the `--sku` values or the exact resource-group name that already exists. Today he alt-tabs to docs and the portal. He'd never open a dedicated mode for this — it feels heavyweight and "for beginners." What he needs: inline contextual suggestions that complete `--sku` with valid options and do a dynamic lookup of his existing resource groups, right there in the IDE terminal, presented as expert-grade help rather than training wheels.

## Persona 3 — Priya Nair · AI-Terminal-Forward Power User

*"I already drive Azure through Copilot CLI and Claude Code. I want them to actually know Azure — not to install yet another AI mode."*

- **Role:** Senior cloud engineer / early adopter; runs Azure CLI through AI-assisted terminals.
- **Environments used:** AI terminals (Claude Code, Copilot CLI — **13.1% cohort**) + local terminal + remote.
- **Telemetry grounding:** Represents the emerging **13.1% AI-terminal cohort**, and is acutely aware that a bespoke AI mode (AI Shell) cratered to **~6% monthly retention** vs. Azure Copilot's **~20%**.

**Goals**
- Get first-party Azure context (resource lookups, scenario detection) inside the AI terminals she already uses.
- Move fast conversationally without adopting a competing bespoke Azure AI mode.
- Blend natural-language intent with precise, correct `az` invocations.

**Pain points**
- General AI terminals lack deep, first-party Azure awareness (Competitive gap #1 — the unowned intersection).
- Bespoke Azure AI modes fail to form habit (AI Shell ~6% monthly; T1).
- Fragmentation: she doesn't want to juggle a separate mode alongside her AI terminal.

**Behaviours**
- Composes intent in natural language, then wants exact, runnable Azure commands.
- Abandons novelty tools that don't earn a daily habit within weeks.
- Values interoperability and portability above bespoke richness.

**Scenario narrative**
Priya asks her AI terminal to "spin up a staging environment mirroring prod." The AI drafts `az` commands but guesses at resource names and a deprecated SKU. She wants Cirrus to supply first-party Azure context — real resource lookups and validated parameters — *into* the AI terminal's flow, so the generated commands are correct and runnable, without her switching into any Azure-specific mode. If Cirrus instead shipped its own rival AI mode, she'd try it once and drop it, exactly as the AI Shell retention curve predicts.

## Persona Comparison

| Dimension | Maya (Multi-Cloud DevOps) | David (Azure-Primary IDE) | Priya (AI-Terminal Power User) |
|-----------|---------------------------|----------------------------|-------------------------------|
| Anchor telemetry | 68.9% multi-cloud | 49.4% IDE / 1.86 contexts | 13.1% AI terminals |
| Primary environment | Local terminal + CI/CD + tmux | IDE terminal + Cloud Shell | AI terminals + remote |
| Top need | Interoperability, non-statefulness | Portable inline param/resource help | First-party Azure context in AI terminals |
| Biggest rejection | Modes that break kubectl/composition | "Beginner mode" stigma; local-only help | Bespoke rival AI mode |
| Design priority driver | HMW-2, HMW-5 | HMW-1, HMW-3, HMW-4 | HMW-6, HMW-3 |

## Next Steps

- Hand personas to the Ideator; require every concept to be evaluated against all three, with Maya as the interoperability gate and Priya as the portability/AI-terminal stress test.
- Feed the persona→HMW mapping into the PRD to prioritise must-have requirements.
- Flag that all persona grounding derives from the approved 2025 HaTS / UXR source; refresh personas if newer HaTS waves segment users differently.
