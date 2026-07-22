---
name: design-engineering-changelog
description: "Document every design decision made during the project for the engineering team: what changed, why, what the constraint was, and what it means for implementation. Use after implementation-guide to produce the authoritative design history."
argument-hint: "Project or feature name (e.g., 'DesAIgns project setup flow — design changelog')"
---

# Design Engineering Changelog

## When to Use
- After implementation-guide is complete
- Before final handoff — engineers must understand the design history to implement correctly
- When a design decision in the implementation guide needs context

## Procedure

### 1. Read Source Artifacts

Load:
- `handoff/implementation-guide.md` — the guide that will reference this changelog
- `ideation/decision-log.md` — design decisions from the ideation phase
- `designs/wireframes/` — wireframe specs (for design evolution evidence)
- `handoff/components/` — component specs

### 2. Identify Changeable Decisions

A design decision belongs in this changelog if:
- It deviated from the initial wireframe or concept
- It responds to a constraint (technical, accessibility, legal, performance)
- It is counter-intuitive and an engineer might "fix" it without understanding the rationale
- It was debated between design and engineering and design prevailed (or compromised)

### 3. Write Each Changelog Entry

Use this format:

```
## [YYYY-MM-DD] {Short title}

**Change Type**: New / Revised / Removed / Constrained
**Affected**: {Component name, screen name, or pattern}
**Design Owner**: {Name or role}
**Engineering Contact**: {Name or role}

### What Changed
Describe the specific design decision or change. Be concrete: "The primary CTA on the setup screen was moved from the bottom-right to a sticky footer bar."

### Why
The reasoning — user research insight, usability test finding, accessibility requirement, or stakeholder decision. Cite artifact IDs (e.g., "Finding F-3 from test-findings.md").

### What It Means for Engineering
Direct implications for the build:
- {Specific HTML/CSS/JS change required}
- {Behaviour to implement}
- {Edge case to handle}

### What Not to Change
Explicitly flag things an engineer might be tempted to "simplify" that must not be changed:
- "Do not remove the `aria-live` region — it is required for screen reader announcements."

### Linked Artifacts
- Design decision: {Link or path}
- Wireframe: {Link or path}
- Research finding: {Link or path}
```

### 4. Organise Chronologically

List entries from oldest to newest. For a batch handoff, use sprint or phase boundaries as grouping headers.

### 5. Write the Summary Table

At the top, a table of all entries:

| Date | Title | Type | Affected | Status |
|------|-------|------|----------|--------|
| ... | ... | Revised | Button | Implemented |

Status values: **Pending** (engineering hasn't implemented yet), **Implemented** (confirmed in code), **Blocked** (engineering flagged an issue).

### 6. Write the "Do Not Regress" Section

A curated list of 5–10 design decisions that are easy to accidentally break during engineering and are critical to maintain:

> **DNR-1**: The focus indicator on all interactive elements must have a minimum 3:1 contrast ratio against the adjacent background. Do not remove `outline` styles without replacing them with an equivalent focus indicator.

### 7. Save the Document

Save to `handoff/design-engineering-changelog.md`.

Minimum: 5 entries. A project with fewer than 5 meaningful design decisions is unlikely — review the design history more carefully.
