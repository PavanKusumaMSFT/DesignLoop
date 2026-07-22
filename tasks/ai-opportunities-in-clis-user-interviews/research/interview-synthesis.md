---
title: "AI Opportunities in CLIs: Interview Synthesis"
phase: discover
status: approved
created: 2026-07-12
updated: 2026-07-12
author: "Researcher Agent"
related: ["../strategy/problem-statements.md", "../strategy/personas.md", "../ideation/hmw-questions.md"]
---

# AI Opportunities in CLIs: Interview Synthesis

## Overview

This synthesis records the evidence supplied in the January 2026 study supporting Krypton OKR 3.2, which seeks to improve ease of use of Azure CLI and PowerShell. It identifies a focused opportunity: help people move from an intended outcome to a correct command while keeping validation and user control visible in the terminal workflow.

This artifact is derived only from the supplied study report. The report contains no transcripts, participant count, roles, or direct quotations; this document therefore makes no claims about those details.

## Study Scope and Evidence Boundary

| Item | Evidence from supplied report |
|---|---|
| Study goals | Identify Azure CLI/PowerShell pain points, AI usage for CLI tasks, and AI workflow gaps. |
| Context | Supports Krypton OKR 3.2: improve ease of use of CLIs. |
| Reported priority | P0 context-aware autocomplete/IntelliSense and lower validation burden; P1 opt-in, non-disruptive prevention and actionable errors; P2 terminal-first and IDE AI exploration. |
| Evidence limitation | The report provides synthesized findings only. It does not provide participant demographics, counts, study method, or verbatim statements. |

## Findings

### Command Discovery Is the Dominant Barrier

People commonly know what outcome they want but cannot identify a valid command. Search is often the first source when encountering new concepts; official documentation is considered complete but costly to use, and `--help` is inefficient for broad discovery. The difficulty is systemic to CLIs rather than Azure-specific, and inconsistent command patterns reduce the benefit of prior learning.

### Completion Must Support Multi-Step Work

Multi-command task sequences are difficult. Missing parameters or values and typographical errors are common. The report recommends assistance that understands intent, anticipates next steps, and guides correct and efficient completion rather than merely expanding text.

### AI Is Useful but Must Be Assessable

All participants are reported to use AI as their primary command-discovery aid because it is faster than manual methods. However, evaluating and testing its suggestions remains manual, complex, and time-consuming. Plausible but unvalidated output reduces trust; participants want validation against documentation, constraints, and best practices. Provider-built, CLI-integrated AI is viewed as comparatively trustworthy.

### Prevention Needs Restraint

Early detection is valued when it is subtle, confirmatory, and non-interruptive. Users want corrected commands for syntax faults and actionable errors when possible. Permission and quota failures are outside the current AI capability described in the report. Organization and team naming conventions can yield syntactically valid failures, creating an opportunity to explore awareness of organizational conventions and permissions without promising resolution.

### Control and Context Shape Adoption

Embedded AI preserves workflow continuity, especially for people outside VS Code. Some dislike always-on AI and want explicit controls because of security considerations. Terminal-heavy users see stronger terminal AI value; IDE-heavy users prefer trusted IDE chat. Terminal integration can disrupt shell configurations, while approval, cost, and privacy are adoption barriers. AI restrictions do not necessarily mean non-use because people may work around them.

## Opportunity Themes

| Theme | Evidence | Product implication |
|---|---|---|
| Intent-to-command bridge | Command discovery is the largest pain point. | Offer intent-guided command suggestions with explicit assumptions. |
| Evidence before execution | Manual validation is difficult and AI answers may be unvalidated. | Show documentation, constraints, and checks alongside each suggestion. |
| Quiet safeguards | Detection is valued only when non-disruptive. | Use inline notices and a review action, never an unsolicited command replacement. |
| Contextual control | Always-on AI and privacy concerns cause friction. | Make assistance opt-in and disclose what context is used. |
| Honest boundaries | Permission, quota, and organization conventions are not solved by current AI. | Distinguish syntax validation from environment-dependent risks. |

## Design Assumptions Requiring Validation

- A suggestion panel can expose useful evidence without making terminal work slower.
- People will understand a clear difference between syntax confidence and environment-dependent risks.
- An explicit assistance toggle and context disclosure will address some, but not all, privacy and approval concerns.
- A terminal-first interaction can coexist with shell configuration when it is isolated and does not alter entered commands automatically.

## Next Steps

- [ ] Validate the assumptions with observed usability sessions before production commitments.
- [ ] Use the problem statements to constrain P0 scope to contextual completion and transparent validation.
- [ ] Test organization-convention and permission signals only as exploratory, non-authoritative guidance.