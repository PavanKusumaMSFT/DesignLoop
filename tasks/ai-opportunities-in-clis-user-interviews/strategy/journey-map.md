---
title: "Journey Map: From CLI Goal to Trusted Execution"
phase: define
status: draft
created: 2026-07-12
updated: 2026-07-12
author: "Strategist Agent"
related: ["../research/interview-synthesis.md", "personas.md", "requirements-prd.md"]
---

# Journey Map: From CLI Goal to Trusted Execution

## Overview

This current-state journey maps behaviors reported in the study. Opportunities describe the proposed concept and must be validated; they are not evidence that the behavior will succeed.

| Stage | Reported behavior and pain | Opportunity | Success signal to test |
|---|---|---|---|
| Frame goal | People know the outcome but not the valid command. | Accept an explicit natural-language intent in the terminal. | Person finds a relevant starting command. |
| Discover | Search is often first; AI is a primary discovery aid; `--help` is inefficient broadly. | Present a concise command plus alternatives and parameter suggestions. | Person can distinguish the intended option. |
| Review | Docs are complete but costly; testing AI output is manual and complex. | Display evidence, validation scope, and assumptions beside the command. | Person can explain what is and is not checked. |
| Edit | Typos and missing values are common. | Show quiet inline issue notices and a corrected-command option. | Person corrects syntax without interruption. |
| Execute | Successful execution can still have unexpected outcomes. | Preserve execution control; do not auto-run or auto-replace commands. | Person retains understanding and control. |
| Resolve | Permissions, quotas, and conventions may fail outside AI capability. | Identify them as environment-dependent and link to next diagnostic action. | Person does not mistake a limitation for validation. |

## Next Steps

- [ ] Use the prototype to test the discovery-to-review transition.
- [ ] Record observed deviations in the usability observation sheet.