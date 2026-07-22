---
title: "Wireframe Specification: Evidence Console"
phase: design
status: approved
created: 2026-07-12
updated: 2026-07-12
author: "Designer Agent"
related: ["../strategy/requirements-prd.md", "../ideation/decision-log.md", "component-spec.md", "design-token-document.md"]
---

# Wireframe Specification: Evidence Console

## Overview

The Evidence Console is a terminal-adjacent, opt-in review surface. Its layout makes the suggested command, validation evidence, known boundary, and insertion decision visible at the same time, without claiming live environment confirmation.

## Desktop Layout

| Region | Content | Interaction and accessibility |
|---|---|---|
| Utility bar | Product label, assistance switch, context disclosure. | Switch has an accessible name and announces state. |
| Intent form | Label, text input, Generate suggestion button. | Input is first in tab order; Enter submits; error is associated with input. |
| Suggestion | Command in `pre`, Insert into terminal button, Copy command button. | Command is selectable text; actions are buttons with visible focus. |
| Evidence | Syntax, documentation, and best-practice status rows. | Each status has text and icon-independent meaning. |
| Boundary notice | Environment-dependent risk about names, permissions, and quota. | `role="note"`; does not imply failure or validation. |
| Quiet issue | Syntax issue plus Review correction button. | `role="status"`; does not move focus or block typing. |
| Terminal preview | Editable command input and Run command button. | Run presents a non-execution notice in this prototype. |

## Responsive Behavior

At 320 CSS pixels and above, the page is a single column. Status rows and action buttons wrap rather than overlap; `pre` scrolls horizontally within its own region. The utility bar may wrap, preserving switch label and context disclosure.

## States

| State | Required presentation |
|---|---|
| Assistance off | Disable generation and explain that no AI context is used. |
| Empty intent | Inline validation message after an attempted generation. |
| Suggestion ready | Show command, evidence categories, boundary, and quiet issue. |
| Correction reviewed | Update the preview only after a deliberate action and announce it. |
| Run requested | Show an honest local-demo notice; never execute. |

## Design Assumptions

The selected example command and all validation statuses are illustrative UI content rather than a live Azure response. The layout must be tested with actual task language and assistive technology.

## Next Steps

- [ ] Use the demo to test the review path with keyboard and screen-reader users.
- [ ] Convert the component contract into production framework components only after validation.