---
title: "PRD: Safe Contextual CLI Completion"
phase: define
status: draft
created: 2026-07-12
updated: 2026-07-12
author: "Strategist Agent"
related: ["problem-statements.md", "personas.md", "journey-map.md", "../designs/wireframe-spec.md"]
---

# PRD: Safe Contextual CLI Completion

## Overview

Safe Contextual CLI Completion is a P0 concept for moving from a stated CLI goal to a reviewable command. It proposes intent-guided suggestions, transparent evidence, quiet issue detection, and opt-in controls while explicitly preserving user execution control.

## Target Users and Success Metrics

Target users are the provisional Terminal-Continuous Operator and IDE-Connected Builder in [personas.md](personas.md). The following are **design targets, not study results**: in evaluative testing, at least 80% of recruited users should complete the primary review task without assistance; at least 80% should correctly identify one validation boundary; and no participant should report an automatic command execution or replacement.

## Functional Requirements

| ID | Priority | Persona | Requirement and acceptance criteria |
|---|---|---|---|
| FR-01 | Must | Both | As a user, I need to state an intent so I can start discovery. Given an intent, when I request a suggestion, then a command is shown; when intent is blank, then a clear inline prompt is shown. |
| FR-02 | Must | Both | As a user, I need a command suggestion with parameters. Given a suggestion, then required and optional parameters are distinguished; then insertion remains a separate action. |
| FR-03 | Must | Both | As a user, I need validation evidence. Given a suggestion, then syntax, documentation, and best-practice checks are independently labeled; then unchecked environment risks are named. |
| FR-04 | Must | Terminal-Continuous Operator | As a user, I need control over assistance. Given the assistant is off, then no suggestion is generated; when enabled, then the used context is disclosed. |
| FR-05 | Must | Both | As a user, I need non-disruptive issue detection. Given a likely syntax fault, then an inline notice appears without blocking typing; then a correction can be reviewed before insertion. |
| FR-06 | Should | Terminal-Continuous Operator | As a user, I need anticipated next steps. Given a reviewed command, then a separate next-step suggestion is offered without execution. |
| FR-07 | Should | IDE-Connected Builder | As a user, I need a documentation route. Given evidence is shown, then I can access an identified documentation reference. |
| FR-08 | Could | Both | As a user, I need a disclosure for org-dependent risks. Given a syntactically valid command, then potential naming, permission, or quota dependencies are labeled as unverified. |

## Non-Functional Requirements

| ID | Requirement |
|---|---|
| NFR-01 | Meet WCAG 2.1 AA: text contrast at least 4.5:1, UI/focus contrast at least 3:1, full keyboard operation, and programmatic status announcements. |
| NFR-02 | Never execute, replace, or transmit a command from the client without an explicit user action. |
| NFR-03 | Render the local suggestion response in under 500 ms in the prototype; production service latency is unvalidated. |
| NFR-04 | Support current desktop Chromium, Firefox, and Safari, plus 320 CSS-pixel viewport width without horizontal loss of controls. |
| NFR-05 | Respect `prefers-reduced-motion: reduce`; no required information may rely on motion or color alone. |

## Constraints, Assumptions, and Scope

**Constraints:** No claim of permission, quota, or organization-convention validation; AI must be opt-in; provider, data policy, and organizational approval remain unresolved.

**Assumptions:** Intent can be safely represented as text; static prototype evidence labels communicate scope; a user has command-insertion authority; and accessible terminal-adjacent UI is acceptable. These require validation.

**Out of scope:** Live Azure authentication, live command execution, private tenant context ingestion, shell modification, guarantee of environment outcome, and IDE plugin delivery.

## Glossary

**Intent:** A user’s stated desired CLI outcome. **Evidence:** A visible label explaining what a suggestion was checked against. **Environment-dependent risk:** A condition such as permissions, quotas, or naming convention that static validation cannot confirm.

## Next Steps

- [ ] Trace each Must requirement into wireframes and test tasks.
- [ ] Recalibrate targets after the first evaluative round.