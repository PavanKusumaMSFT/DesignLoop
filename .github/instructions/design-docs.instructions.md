---
description: "Use when creating or editing design documents in the research, strategy, designs, tests, or handoff directories. Covers standard document structure, metadata headers, and formatting conventions."
applyTo: ["**/research/**", "**/strategy/**", "**/ideation/**", "**/designs/**", "**/tests/**", "**/handoff/**"]
---

# Design Document Standards

## Required Frontmatter

Every design document must include a YAML frontmatter header:

```yaml
---
title: "Document Title"
phase: discover | define | ideate | design | prototype | test | deliver
status: draft | in-review | approved
created: YYYY-MM-DD
updated: YYYY-MM-DD
author: "{Agent Name} Agent"
related: ["other-doc.md"]
---
```

## Document Structure

1. **Title** (H1) — Clear, descriptive title matching the frontmatter
2. **Overview/Summary** — 2-3 sentence executive summary
3. **Body sections** (H2) — Organized by topic with clear headings
4. **Next Steps** — Actionable items or handoff notes at the end

## Phase-Directory Mapping

Every task lives in its own folder under `tasks/<task-id>/`, and each task contains the
full set of phase subdirectories below (e.g. `tasks/<task-id>/research/`).

| Phase | Directory | Typical Documents |
|-------|-----------|-------------------|
| Discover | `research/` | Research briefs, competitive analyses, interview summaries |
| Define | `strategy/` | Problem statements, personas, journey maps, PRDs |
| Ideate | `ideation/` | Concept docs, feature matrices, decision logs |
| Design | `designs/` | Wireframe specs, token docs, component specs |
| Prototype | `prototypes/` | README files, setup guides (code lives here too) |
| Test | `tests/` | Test plans, accessibility reports, feedback analysis |
| Deliver | `handoff/` | Implementation specs, component docs, style guides |

## Formatting

- Use tables for structured comparisons
- Use checklists (`- [ ]`) for action items
- Link to related documents using relative paths
- Include the `updated` date whenever the document is modified
