---
title: "Finding: Agent Discovery Gap"
phase: discover
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Researcher Agent"
related:
  - "../azure-deployment-agent-ux-enhancements.md"
---

# Finding: Agent Discovery Gap

## Severity: **Critical**

## Summary

None of the participants discovered the Deployment Agent without guidance across the two most recent studies (Round 2 and Round 3). Video evidence reinforced this consistent failure. A 0% unguided discovery rate across two study rounds — using different prototype fidelities and environments — signals a fundamental discoverability problem, not a prototype-specific issue.

## Detailed Insights

### IDE-Driven Mental Models

Users' mental models were strongly IDE-driven. They expected agent invocation patterns to mirror VS Code conventions — specifically @ mentions, slash commands, and command palette interactions. When these familiar patterns were absent, users did not intuitively explore alternative paths to find the Deployment Agent.

### Mode Confusion

Participants expected clearer separation between asking questions, planning, and agent-driven execution. The lack of explicit modes made it difficult to understand what Copilot would do next. Users were uncertain whether a prompt would trigger a conversational response, generate a plan, or initiate an action — and this ambiguity discouraged exploration.

### Lack of Proactive Surfacing

Some participants expected Copilot to infer intent from their prompts and proactively surface relevant agents. For example, when a user described a deployment scenario, they expected the system to suggest or auto-invoke the Deployment Agent rather than requiring manual discovery.

### No Clear Entry Point

The agent's entry point was not visible or intuitive within the existing Copilot surface. Users who were unfamiliar with the Deployment Agent had no affordance to indicate its existence, and no contextual cue to guide them toward it.

## Behavioral Evidence

| Metric | Value | Source |
|--------|-------|--------|
| Unguided discovery rate | 0% | Rounds 2 and 3 |
| Study rounds confirming failure | 2 | Round 2 (BAMI tenant), Round 3 (vibe-coded prototype) |
| Confirmation method | Video review | Session recordings from both rounds |

## Recommendations

| # | Recommendation | Priority |
|---|---------------|----------|
| 1 | Align agent entry and invocation with established IDE patterns (@ mentions, slash commands, command palette) | **HIGH** |
| 2 | Differentiate ask, plan, and agent modes explicitly in the UI with clear visual indicators | **HIGH** |
| 3 | Collaborate with Azure Copilot framework team to standardize agent discovery patterns across surfaces | **MEDIUM** |
| 4 | Proactively surface relevant agents based on inferred user intent from prompt context | **MEDIUM** |

## Design Implications

- **Agent entry point redesign**: The current entry point must be rethought to align with IDE conventions users already know. Consider @ mention invocation (`@deploy`), slash commands (`/deploy`), or command palette integration.
- **Mode indicator system**: A visible, persistent indicator should communicate the current mode (ask, plan, execute) so users understand what will happen when they submit a prompt.
- **Intent-based agent routing**: The system should analyze user prompts for deployment-related intent and proactively suggest or surface the Deployment Agent when relevant.

## Related Findings

- [Inline Editing](inline-editing.md) — Mode confusion between editing and prompting mirrors the ask/plan/execute ambiguity identified here
- [Bicep Deployments](bicep-deployments.md) — Workflow expectations (plan → validate → deploy) reflect the same IDE-driven mental models that drive discovery expectations
