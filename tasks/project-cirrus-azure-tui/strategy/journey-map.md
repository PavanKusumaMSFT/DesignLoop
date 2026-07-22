---
title: "Project Cirrus — Current-State Journey Map"
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

# Current-State Journey Map: Authoring a Non-Trivial `az` Command

This map traces the **current-state** experience of David Rossi (Persona 2, Azure-primary IDE developer) completing a real, representative task: authoring a non-trivial `az servicebus namespace create` command with unfamiliar parameters, spanning his VS Code integrated terminal and a fallback to the local terminal / docs. It exposes where the workflow breaks today and annotates the inline, additive opportunities Cirrus can own — without introducing a mode.

## Overview

The task is deliberately "expert-but-unfamiliar": David knows the CLI, but not this service's parameter surface or the exact resource names in his subscription. This is the highest-frequency friction pattern in the research (valued capabilities: dynamic resource lookup, discoverability, syntax guidance — T5). The current journey forces context-switches to docs and the portal, guesswork on parameters, and failed runs — precisely the gaps the inline enhancement targets. Emotional low points cluster where the CLI gives no in-place help and where a mode would *add* friction rather than remove it.

## Journey Stages

| Stage | User actions | Tools / environment | Emotion | Pain points | Opportunity (inline, non-modal) |
|-------|--------------|---------------------|:---:|-------------|---------------------------------|
| 1. Intent & framing | Decides to create a Service Bus namespace for a new feature; opens integrated terminal | VS Code terminal (IDE, 49.4%) | 🙂 Motivated | None yet — but no in-context entry point for Azure help | Ambient readiness: enhancement present in IDE terminal from the first keystroke (HMW-3) |
| 2. Recall the command | Starts typing `az servicebus...`, unsure of the exact subgroup/verb | VS Code terminal | 😐 Uncertain | Must remember command shape; tab-completion is shallow | Inline intelligent autocomplete for command path as he types (HMW-1) |
| 3. Discover parameters | Needs `--sku`, `--location`, `--resource-group`; doesn't know valid `--sku` values | VS Code terminal → **alt-tab to docs** | 😟 Frustrated | Breaks flow to open web docs; no in-place param discovery; stigma of "beginner mode" deters trying `az interactive` (T4) | Contextual parameter suggestions with valid enum values surfaced inline & dismissibly (HMW-1, HMW-4) |
| 4. Find real resource names | Doesn't recall the exact existing `--resource-group` name | **Alt-tab to Azure Portal** / runs `az group list` separately | 😠 Annoyed | Extra round-trip command or portal lookup; loses place | Dynamic resource lookup: complete `--resource-group` from live subscription data inline (HMW-1) |
| 5. Assemble & sanity-check | Stitches the full command together from memory + docs + portal | VS Code terminal | 😰 Anxious | Low confidence it's correct; fears a failed/expensive run | Inline validation & syntax guidance before execution (HMW-1, HMW-5) |
| 6. Consider `az interactive` | Briefly wonders whether to use interactive mode; rejects it | (mental) | 🙁 Resigned | "Heavyweight," "two programs," would break his other terminal commands (T2, T3); poor fit for IDE | Additive help means there is *nothing to enter* — value arrives in place (thesis) |
| 7. Execute | Runs the command | VS Code terminal | 😬 Tense | If wrong, error is cryptic; retry loop begins | Fast, non-blocking suggestions that reduce first-run failures (HMW-5) |
| 8. Handle failure / retry | Command fails on an invalid `--sku`; edits and reruns | VS Code terminal → docs again | 😞 Deflated | Repeat of stages 3–5; compounding time loss and morale hit | Prevent the failure upstream via validated enum suggestions (HMW-1) |
| 9. Move to next tool | Immediately needs a `kubectl`/`git` command after success | VS Code terminal | 😐 Wary | Any mode would trap him here; must stay interoperable | Enhancement silently steps aside for non-az commands (HMW-2) |
| 10. Repeat elsewhere | Later redoes similar work in Cloud Shell / a pipeline | Cloud Shell (21.6%), CI/CD (23.2%) | 😕 Inconsistent | Help (if any) didn't travel; inconsistent experience across contexts | Portable enhancement delivering the same intelligence across environments (HMW-3) |

## Emotional Curve Summary

The journey starts positive (Stage 1) and degrades sharply through Stages 3–5 (parameter/resource guesswork and context-switching), bottoms out at Stage 8 (failed run and rework), and only partially recovers. The two structural traps are: (a) **no in-place intelligence**, forcing docs/portal detours; and (b) **the false choice of a mode**, which David correctly rejects because it would break Stage 9's interoperability. Cirrus flattens the curve by injecting the valued intelligence *inline* at Stages 2–5 and 7–8, while guaranteeing Stage 9's compositional freedom.

## Key Opportunity Themes (traceable)

1. **Collapse the docs/portal detour (Stages 3–4)** → inline contextual parameter suggestions + dynamic resource lookup. *Evidence: T5 valued capabilities; David persona.*
2. **Prevent failed runs (Stages 5, 7, 8)** → inline validation + fast, non-blocking guidance. *Evidence: T6 performance/reliability.*
3. **Eliminate the mode dilemma (Stages 6, 9)** → additive help with nothing to enter/exit; non-az commands always run. *Evidence: T2, T3.*
4. **Make it consistent everywhere (Stage 10)** → cross-environment portability. *Evidence: T7 avg 1.86 contexts; IDE/Cloud Shell/CI-CD shares.*

## Next Steps

- Hand the opportunity themes and emotional low points to the Ideator to target Stages 3–5 and 7–8 first (highest friction density).
- Use Stage 9 (interoperability) and Stage 10 (portability) as hard evaluation gates for every concept.
- Journey is grounded in the approved 2025 HaTS / UXR source and Persona 2; validate with a moderated task replay if research capacity allows.
