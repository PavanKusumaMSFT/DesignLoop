---
name: design-system-setup
description: "Scaffold a complete design token system with colors, typography, spacing, elevation, and motion tokens. Use when starting a new design system, setting up design tokens, creating theme files, or initializing CSS custom properties for a project."
argument-hint: "Describe your brand or design direction (e.g., 'modern fintech app with blue primary color')"
---

# Design System Setup

## When to Use
- Starting a new project that needs a design token foundation
- Setting up a design system from scratch
- Migrating from hardcoded values to design tokens
- Creating light/dark theme support

## Procedure

### 1. Gather Requirements
Ask the user about:
- Brand colors (primary, secondary, accent)
- Typography preferences (font families, scale)
- Spacing scale preference (4px base, 8px base)
- Whether dark mode is needed

### 2. Create Token JSON Files

Create the following files in `designs/tokens/`:

**`designs/tokens/colors.json`** — Color palette with semantic mappings
Reference: [Color token template](./assets/colors.json.template)

**`designs/tokens/typography.json`** — Font families, sizes, weights, line heights
Reference: [Typography token template](./assets/typography.json.template)

**`designs/tokens/spacing.json`** — Spacing scale values
Reference: [Spacing token template](./assets/spacing.json.template)

**`designs/tokens/elevation.json`** — Box shadow definitions
Reference: [Elevation token template](./assets/elevation.json.template)

**`designs/tokens/motion.json`** — Animation durations and easing curves
Reference: [Motion token template](./assets/motion.json.template)

### 3. Generate CSS Custom Properties

Create `designs/tokens/tokens.css` that maps all JSON tokens to CSS custom properties following the `--{category}-{variant}-{scale}` naming convention.

Reference: [CSS tokens template](./assets/tokens.css.template)

### 4. Create Theme Files

Create theme overrides for light and dark modes:
- `designs/tokens/theme-light.css`
- `designs/tokens/theme-dark.css`

### 5. Create Token Documentation

Create `designs/tokens/README.md` documenting:
- Token naming conventions
- Available categories and values
- Usage examples in React components
- How to add new tokens

## Token Naming Convention

```
--{category}-{variant}-{scale}

Examples:
  --color-primary-50 through --color-primary-900
  --color-neutral-50 through --color-neutral-900
  --color-success-500, --color-error-500, --color-warning-500
  --spacing-xs (4px), --spacing-sm (8px), --spacing-md (16px), --spacing-lg (24px), --spacing-xl (32px)
  --font-size-xs, --font-size-sm, --font-size-base, --font-size-lg, --font-size-xl
  --font-weight-regular, --font-weight-medium, --font-weight-semibold, --font-weight-bold
  --border-radius-sm, --border-radius-md, --border-radius-lg, --border-radius-full
  --elevation-1, --elevation-2, --elevation-3
  --motion-duration-fast, --motion-duration-normal, --motion-duration-slow
  --motion-easing-default, --motion-easing-in, --motion-easing-out
```
