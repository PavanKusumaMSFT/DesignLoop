---
title: "Problem Statements: Safe Contextual CLI Completion"
phase: define
status: approved
created: 2026-07-12
updated: 2026-07-12
author: "Strategist Agent"
related: ["../research/interview-synthesis.md", "personas.md", "journey-map.md", "requirements-prd.md"]
---

# Problem Statements: Safe Contextual CLI Completion

## Overview

The supplied study shows that command discovery and trust evaluation block efficient CLI work. These statements define the user needs to address without claiming that AI can solve permissions, quotas, or organization-specific configuration.

## Prioritized Problems

| Priority | Problem statement | Evidence |
|---|---|---|
| P0 | People using Azure CLI or PowerShell need to translate a goal into a valid command because command discovery is the largest reported pain point. | Users know the goal but cannot identify valid commands; search and AI are common discovery aids. |
| P0 | People need to inspect why a suggested command is appropriate before execution because current AI output can be plausible yet unvalidated, making manual evaluation complex and time-consuming. | Participants want checks against documentation, constraints, and best practices. |
| P1 | People need subtle, actionable feedback on likely syntax problems because missing values, missing parameters, and typos are common, but disruptive intervention is disliked. | Early detection is valued when confirmatory and non-interruptive; corrected syntax should be offered. |
| P1 | People need explicit choice over AI assistance and context because always-on assistance, privacy, shell compatibility, and approval concerns affect adoption. | Some dislike always-on AI; terminal integration can disrupt shell configuration. |

## Boundaries

Permission and quota outcomes, as well as organization naming conventions, are not represented as validated AI capabilities. The concept may surface these as environment-dependent risks, but cannot claim to predict or fix them.

## Next Steps

- [ ] Use these priorities to select P0 requirements.
- [ ] Validate the assumption that evidence labels enable faster, more confident review.