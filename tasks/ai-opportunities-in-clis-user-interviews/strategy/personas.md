---
title: "Evidence-Based Personas: CLI AI Opportunity"
phase: define
status: draft
created: 2026-07-12
updated: 2026-07-12
author: "Strategist Agent"
related: ["../research/interview-synthesis.md", "problem-statements.md", "journey-map.md"]
---

# Evidence-Based Personas: CLI AI Opportunity

## Overview

The source does not provide participant roles or counts. The two provisional personas below represent behaviors explicitly reported in the synthesis, not distinct verified participant segments; their names and usage narratives are design assumptions to test.

## Terminal-Continuous Operator (Provisional)

**Evidence basis:** Terminal-heavy users see stronger value in terminal AI; embedded help preserves workflow continuity, particularly outside VS Code.

| Goals | Needs | Risks |
|---|---|---|
| Reach a valid command without abandoning the terminal. | Intent-to-command guidance, parameter help, and next-step suggestions. | Shell configuration disruption, unwanted always-on help, untrusted output. |

**Scenario:** Given an operational goal, this person invokes assistance deliberately, reviews an evidence-backed command, and decides whether to insert or modify it.

## IDE-Connected Builder (Provisional)

**Evidence basis:** IDE-heavy users prefer trusted IDE chat, while all participants reportedly use AI for command discovery and documentation for validation/testing.

| Goals | Needs | Risks |
|---|---|---|
| Move between IDE and CLI without losing confidence in a command. | Clear source and validation status that can be compared with documentation. | A duplicated assistant that is less trusted than established IDE chat. |

**Scenario:** This person uses a CLI surface for immediate completion but needs enough provenance to continue validation in a trusted workflow.

## Shared Accessibility Considerations

Both provisional personas need keyboard-operable assistance, screen-reader announcements for dynamic validation, and non-color-only status signals. These are product requirements, not claims from the study.

## Next Steps

- [ ] Recruit against terminal-heavy and IDE-heavy behaviors without treating them as demographic segments.
- [ ] Revise or merge personas after sessions establish meaningful differences.