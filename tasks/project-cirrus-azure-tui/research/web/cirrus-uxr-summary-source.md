---
title: "Project Cirrus — Prior Research on Azure-Flavoured TUIs (Source UXR Summary)"
phase: discover
status: approved
created: 2026-07-13
updated: 2026-07-13
author: "Zainab Alasadi (UXR)"
related: []
---

# What Prior Research Tells Us About Azure-Flavoured TUIs · UXR Summary

Summarising UX research, telemetry, and customer feedback related to Azure-specific "modes" or TUI-style experiences in Azure CLI tools to consolidate what we already know and determine whether additional research is needed.

**Author(s):** Zainab Alasadi (UXR) | May 2026
**Stakeholders:** Aakash Basavaraj (PM), Teresa Ritorto (EM), Pavan Kusuma (UXD), Nori Zhang (ENG)

## TL;DR

Underlying features such as intelligent autocomplete and contextual suggestions do show promise, but past Azure CLI Tools TUI experiments such as `az interactive` and AI Shell, while they generated some initial curiosity, have failed to demonstrate long-term user value or workflow fit, evident in their comparatively low usage and retention rates.

In previous concept studies, users consistently perceive dedicated CLI "modes" as disruptive, heavyweight, and difficult to integrate into real-world terminal workflows that span multiple tools, shells, environments, and cloud providers.

## Recommendation

At this stage, current evidence does not support building an experience where Azure-specific functionality is gated behind a dedicated TUI mode.

Instead, future exploration should focus on enhancing Azure CLI Tools as they exist today, making Azure interactions faster, more discoverable, and more context aware. These investments should optimize not only for local terminal usage, but also for the environments where users already work with Azure CLI Tools, including IDEs, CI/CD, Cloud Shell, remote machines, AI-powered terminals, and general AI tools.

## Previous TUI Experiments & UX Research

### `az interactive` — negligible adoption (~0.1%) and weak retention (~14%)

Officially launched in 2023 to provide a guided and intelligent Azure CLI experience for reducing onboarding friction, `az interactive` extended beyond basic autocomplete and dropdown suggestions to include capabilities such as next-command recommendations, scenario detection, and natural language command discovery.

Recent 90-day telemetry shows the experience failed to gain meaningful adoption or long-term engagement: ~0.1% adoption amongst Azure CLI users, and a ~14% return usage/retention rate within a 90-day window. The retention signal is particularly important: even among the very small group who engaged, most did not incorporate it into ongoing workflows.

### Perceived as beginner-oriented onboarding aid, not a long-term workflow tool

MVPs, instructors, and online training materials consistently frame `az interactive` as a hidden or "secret" feature primarily useful for users new to Azure CLI. This transitional-learning positioning helps explain low repeat usage.

Representative external framing:
- "Azure CLI has a SECRET mode, beginners must see." — Cloud360 Training YouTube, 2026
- "…if you are really new, you want to have that experience that's really simplified, check out az interactive." — KnowOps YouTube, 2019
- "…especially to those that are new to it, or if you are working with commands that are new to you." — Sam Cogan Blog, 2019
- "…especially helpful if you are new to Azure." — Thomas Bründl Blog, 2020
- "…Interactive which simplifies things to a great extent." — Nilesh Gule Blog, 2018

### Performance & reliability issues accelerated abandonment (but don't fully explain non-adoption)

HaTS feedback consistently described the feature as slow, unstable, and error-prone:
- "Interactive mode was very slow last time I used it… trying to do too much at once during autocompletion…" v2.54.0
- "az interactive should load quickly. Cache things perhaps? Startup time is too slow right now. I like to use it though." v2.61.0
- "Interactive mode should be more stable." v2.50.0
- "I really enjoyed the az interactive with its dynamic resource lookups. I'd like to see it stabilized and iteratively improved." v2.67.0

The scale of non-adoption (~0.1%) suggests usability issues alone are insufficient. Even a perfectly stable implementation may still have struggled if the interaction model conflicted with established CLI behaviours. Several users did acknowledge value in dynamic resource lookups, discoverability support, and interactive syntax guidance — some underlying capabilities were useful even if the mode was not.

### `az interactive` introduced friction into existing terminal workflows

Users found `az interactive` limiting because non-az commands couldn't be executed in the same TUI without extra steps.
- "Not having az interactive loaded so we can easily use other commands… I'm not able to use a combination of kubectl powershell and AZ." v2.40.0
- "It is difficult to use the interactive mode within a screen manager like tmux or gnu screen. The shortcuts are not customizable (F1, F3). Clear screen should be Ctrl + L not Ctrl + C." v2.59.0

While `az interactive` technically supported non-az commands via the `#` prefix (e.g., `#npm version`), this was poorly discoverable / added friction. Users value terminal environments that remain flexible, interoperable, and minimally stateful. Experiences requiring users to adapt their workflow around a dedicated Azure-specific mode create friction rather than efficiency.

### AI Shell — initial curiosity, weak long-term workflow integration

AI Shell, an AI-oriented TUI experience built around Azure workflows, generated strong initial exploration but weak sustained engagement: ~56% Day 1 return usage and ~6% monthly retention. Retention dropped sharply and remained substantially lower than adjacent AI-assisted experiences such as Azure Copilot (~20% retention). Pattern: strong novelty value, moderate exploratory interest, weak habit formation.

### Users strongly resist workflows that require entering a dedicated "mode"

Concept evaluations (2025) consistently showed negative reactions to gating functionality behind a dedicated Azure CLI "mode." Participants described them as "cluttered," "unnatural," "heavyweight," or disruptive.
- "…the amount of energy and work it takes to switch back and forth [in and out of AI mode] wasn't seamless… it almost felt that I was running two different programs in the same environment. The interaction wasn't natural." — Participant 4
- "Rather than switching terminal modes, I'd like to have something more fluid." — Participant 2

Mode-switching itself is a recurring source of friction: users don't want to "enter"/"exit" a special experience, prefer retaining normal terminal behaviours, and expect enhancements to feel additive rather than stateful.

## Usage Behaviours

### Multi-cloud / hybrid is the norm
As of 2025 HaTS, 68.9% of Azure CLI users and 72.2% of Azure PowerShell users report working across multiple cloud providers. Workflows span Azure CLI, AWS CLI, gCloud CLI, Kubernetes, git, etc. Experiences that lock users into Azure-specific interaction models may create friction rather than value.

### Multi-environment and highly compositional
60.2% run commands in a local terminal; 49.4% also use CLI within IDEs; Cloud Shell (21.6%), CI/CD (23.2%), remote machines (14.6%). Respondents selected an average of 1.86 execution contexts. Future investments should optimize for local terminal and beyond.

### AI-powered terminals emerging (>10%)
13.1% of Azure CLI users report using AI-assisted terminals such as Claude Code, Copilot CLI, or similar to run Azure CLI commands — a meaningful, emerging shift toward conversational, guided, AI-assisted command-line experiences.
