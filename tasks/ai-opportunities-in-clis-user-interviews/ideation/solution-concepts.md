---
title: "Solution Concepts: CLI AI Opportunities"
phase: ideate
status: approved
created: 2026-07-12
updated: 2026-07-12
author: "Ideator Agent"
related: ["hmw-questions.md", "feature-matrix.md", "decision-log.md"]
---

# Solution Concepts: CLI AI Opportunities

## Overview

The concepts explore the report’s P0-P2 recommendations. They do not imply that the source validates implementation feasibility or user preference for a particular design.

| Concept | Description | Advantages | Limitation |
|---|---|---|---|
| Evidence Console | An opt-in terminal-adjacent panel turns intent into a command and displays evidence, boundaries, and insertion control. | Directly serves P0 discovery and validation burden. | Needs evaluation for terminal workflow fit. |
| Quiet Syntax Guard | Inline, non-blocking syntax and missing-value notices offer a corrected command. | Matches P1 preference for subtle, actionable prevention. | Cannot confirm execution outcome. |
| Sequence Compass | Suggests the likely next command after a reviewed command. | Addresses hard multi-command tasks. | Risk of overreach and context dependence. |
| Trusted Surface Bridge | Presents the same evidence model in terminal and an IDE entry point. | Addresses terminal/IDE preference split. | P2 scope and integration complexity. |

## Selected Concept

**Evidence Console with Quiet Syntax Guard** is the scoped concept. It keeps discovery, evidence, opt-in status, and non-disruptive correction in one prototype, without attempting live environment validation or IDE integration.

## Next Steps

- [ ] Use the feature matrix to keep P0 work intentionally narrow.