---
title: "Design Token Document: Evidence Console"
phase: design
status: approved
created: 2026-07-12
updated: 2026-07-12
author: "Designer Agent"
related: ["wireframe-spec.md", "component-spec.md", "../prototypes/demos/EvidenceConsole.html"]
---

# Design Token Document: Evidence Console

## Overview

These tokens support a high-contrast, terminal-adjacent interface with distinct neutral, positive, warning, and focus roles. Values are design selections for the prototype; contrast must be rechecked against any production theme.

## Token Inventory

| Category | Tokens | Intended use |
|---|---|---|
| Color | `--color-neutral-950`, `--color-neutral-50`, `--color-teal-600`, `--color-green-700`, `--color-amber-800`, `--color-red-700`, `--color-focus-500` | Surface, text, states, focus. |
| Spacing | `--spacing-xs` through `--spacing-xl` | Consistent gaps, padding, and layout. |
| Type | `--font-family-ui`, `--font-family-code`, `--font-size-sm` through `--font-size-xl`, weights and line heights | Readable UI and command display. |
| Shape/elevation | `--border-radius-sm`, `--border-radius-md`, `--elevation-1` | Reserved panels and controls. |
| Motion | `--motion-duration-fast`, `--motion-duration-normal` | State transitions, disabled under reduced motion. |

## Use Rules

- Components reference tokens with `var(--...)`; only token definitions contain literal values.
- Status relies on a text label plus color; no status is conveyed by color alone.
- Focus uses `--color-focus-500` at a visible 3px outline with offset.
- Components retain a compact radius; panels use `--border-radius-md` or less.

## Next Steps

- [ ] Promote the demo token block to `designs/tokens/tokens.css` when a shared implementation starts.
- [ ] Recalculate contrast after branding or theme changes.