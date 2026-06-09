# DesignLoop — Project-Wide Copilot Instructions

## Project Overview

This is a product design workspace powered by AI agents. Each stage of the design lifecycle is an intelligent loop — driven by one or more specialized agents that iterate and strengthen that stage. These stage-level loops compose into a larger continuous loop spanning the full design process: Discover → Define → Ideate → Design → Prototype → Test → Deliver.

## Output Directory Structure

Each task lives in its own folder under `tasks/<task-id>/`. Within every task, design
artifacts must be organized into phase-specific subdirectories (e.g.
`tasks/<task-id>/research/`). The Home page lists all tasks and lets users browse each
task's artifacts across the full lifecycle.

| Directory (per task) | Phase | Contents |
|----------------------|-------|----------|
| `research/` | Discover | Research briefs, competitive analyses, market insights |
| `strategy/` | Define | Problem statements, personas, journey maps, PRDs |
| `ideation/` | Ideate | Concept docs, feature matrices, decision logs |
| `designs/` | Design | Wireframes, design tokens, component specs |
| `prototypes/` | Prototype | React components, Storybook stories, demos |
| `tests/` | Test | Test plans, accessibility reports, feedback analysis |
| `handoff/` | Deliver | Implementation specs, component docs, style guides |

## Frontend Framework

- **React** with **TypeScript** is the target framework for all coded artifacts
- Use functional components with hooks
- Export components as named exports
- Co-locate styles using CSS Modules or styled-components with design tokens

## Design Token Conventions

- **Naming**: `--{category}-{variant}-{scale}` (e.g., `--color-primary-500`, `--spacing-md`, `--font-size-lg`)
- **Categories**: `color`, `spacing`, `font-size`, `font-weight`, `line-height`, `border-radius`, `elevation`, `motion`
- **No hardcoded values**: Always reference tokens — never use raw hex codes, pixel values, or font stacks directly in components
- **Token files** live in `designs/tokens/`

## Markdown Document Standards

All design documents should include a YAML frontmatter header:

```yaml
---
title: "Document Title"
phase: discover | define | ideate | design | prototype | test | deliver
status: draft | in-review | approved
created: YYYY-MM-DD
updated: YYYY-MM-DD
author: ""
related: []
---
```

## MCP Server Integrations

This workspace integrates with external design tools via MCP:
- **Figma** — Design file reading, token extraction, component inspection
- **Storybook** — Component documentation and visual testing
- **Microsoft Graph** — Word, Excel, PowerPoint, and Teams integration
- **Playwright** — Browser automation, screenshots, accessibility audits

## Accessibility Standards

- Target **WCAG 2.1 AA** compliance
- All images require `alt` text
- Interactive elements need visible focus indicators
- Color contrast ratio minimum: 4.5:1 for normal text, 3:1 for large text
- All components must support keyboard navigation
