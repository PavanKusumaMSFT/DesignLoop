---
title: "Project Cirrus — Design Token System"
phase: design
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Designer Agent"
related:
  - "designs/tokens/tokens.css"
  - "designs/tokens/colors.json"
  - "designs/tokens/typography.json"
  - "designs/tokens/spacing.json"
  - "designs/tokens/elevation.json"
  - "designs/tokens/motion.json"
  - "designs/wireframe-spec.md"
  - "designs/component-specs.md"
  - "strategy/requirements-prd.md"
---

# Project Cirrus — Design Token System

A terminal/CLI-flavoured token system for the inline, non-modal Azure CLI intelligence
layer. Tokens are organised in two layers — **primitives** (raw values, the only place
literals live) and **semantic role tokens** (theme-aware aliases the components consume).
Three themes ship: `dark` (default), `light`, and `high-contrast`, plus a reduced-motion
override. Every text/surface pair meets **WCAG 2.1 AA (≥ 4.5:1)** on its intended surface.

## Overview

- **Convention:** `--{category}-{variant}-{scale}` (e.g. `--color-primary-500`,
  `--spacing-md`, `--font-size-base`, `--motion-duration-fast`).
- **No hardcoded values in components.** Prototyper references `var(--…)` only.
- **Theme switching:** set `data-theme="dark|light|high-contrast"` on the root/host element.
  The capability-detecting rendering layer (C17) also chooses which surfaces are allowed to
  render — but color/theme selection is purely token-driven.
- **Files:** `tokens.css` is authoritative for build; the `*.json` files mirror the same
  values for tooling/Figma sync.

## Token Categories

| Category | Purpose | Example tokens |
|----------|---------|----------------|
| `color` | Palette primitives + semantic roles | `--color-primary-500`, `--color-ghost-text`, `--color-param-flag` |
| `spacing` | 0.25rem-based dense grid | `--spacing-2xs` … `--spacing-2xl` |
| `font-size` | Monospace cell + UI chrome sizes | `--font-size-base` (14px terminal), `--font-size-xs` |
| `font-weight` | Emphasis levels | `--font-weight-medium`, `--font-weight-semibold` |
| `line-height` | Row density | `--line-height-tight` (terminal rows) … `--line-height-relaxed` |
| `border-radius` | Overlay corner softness | `--border-radius-sm` … `--border-radius-pill` |
| `elevation` | Overlay depth (theme-specific shadows) | `--elevation-1` … `--elevation-3` |
| `motion` | Duration / easing / composed transitions | `--motion-duration-fast`, `--motion-easing-standard`, `--motion-transition-popover` |
| `font-family` (support) | Mono-first stacks | `--font-family-mono`, `--font-family-ui` |

## Semantic Suggestion-State Tokens

These are the heart of the system — one role token per suggestion state so components never
reach into primitives. Each maps to a per-theme primitive in `tokens.css`.

| State (concept) | Token(s) | Notes |
|-----------------|----------|-------|
| Ghost text (C1) | `--color-ghost-text`, `--color-ghost-text-emphasis` | Recessive but ≥ 4.5:1; emphasis marks the matched segment |
| Active suggestion | `--color-suggestion-active-bg` / `-text` / `-border`, `--color-suggestion-match` | Selected row + fuzzy-match char highlight |
| Idle suggestion | `--color-suggestion-idle-text`, `--color-suggestion-idle-bg` | Unselected rows |
| Parameter hint (C5) | `--color-param-flag`, `--color-param-value`, `--color-param-required`, `--color-param-optional`, `--color-param-type` | Never uses color alone — pairs with `*` glyph + text label |
| Enum / valid value (C6) | `--color-enum-valid`, `--color-enum-deprecated` | Deprecated pairs with a text tag, not color alone |
| Resource lookup (C9/C10) | `--color-resource-loading`, `--color-resource-loading-track`, `--color-resource-cached`, `--color-resource-live`, `--color-resource-name`, `--color-resource-meta` | `cached` vs `live` shown as text badge + color |
| Validation / error | `--color-validation-error-text`, `--color-validation-error-bg`, `--color-validation-error-border`, `--color-validation-fallback-text` | Fallback-to-free-text note is muted, non-alarming |
| Dismissible hint line (C13) | `--color-hint-line-text`, `--color-hint-line-accent`, `--color-hint-line-key-bg`, `--color-hint-line-key-text`, `--color-hint-line-dismiss` | Quiet, expert-neutral, no "beginner" red flags |
| Focus (keyboard) | `--color-focus-ring`, `--color-border-focus` | 2px ring, always visible on keyboard focus |

## Accessibility Guarantees (NFR-2)

- **Contrast:** all text roles verified ≥ 4.5:1 on their intended surface (see
  `colors.json → contrastNotes`). `high-contrast` theme pushes text to pure white/black.
- **Never color-alone:** required params add a `*` glyph + "required" label; `live`/`cached`
  and `deprecated` states carry text badges. Color is always a secondary signal.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` zeroes all durations and
  disables composed transitions — critical because these overlays appear on the keystroke path.
- **High-contrast:** `data-theme="high-contrast"` maps to OS/terminal high-contrast intent.

## Usage Rules for the Prototyper

1. Import `tokens.css` once at the app/host root; set `data-theme` on the host element.
2. In CSS Modules, reference **only** semantic tokens (`var(--color-ghost-text)`), never a
   primitive (`var(--color-neutral-400)`) and never a literal.
3. Motion must never gate input — use `--motion-transition-fade` on opacity only; the ghost
   text must be present in the DOM before its fade completes.
4. For any new state, add a semantic token here first, then consume it — do not hardcode.

## Next Steps

- Prototyper: wire `tokens.css` into the React + CSS Modules build; confirm Token Validator
  passes (no hardcoded hex/px/font literals in component styles).
- Validate ghost-text and error contrast against a real terminal background sample per theme.
- Revisit `--motion-duration-fast` (90ms) against measured render latency to stay within the
  p95 ≤ 100 ms inline feel (FR-7 / NFR-1).
