---
description: "Use when editing design token files, creating CSS custom properties, or working with design system variables. Covers naming conventions, required categories, and forbidden patterns."
applyTo: ["**/tokens/**", "**/design-system/**"]
---

# Design Token Standards

## Naming Convention

All tokens must follow the pattern: `--{category}-{variant}-{scale}`

### Required Categories

| Category | Example | Format |
|----------|---------|--------|
| `color` | `--color-primary-500` | `--color-{palette}-{shade}` |
| `spacing` | `--spacing-md` | `--spacing-{size}` |
| `font-size` | `--font-size-lg` | `--font-size-{size}` |
| `font-weight` | `--font-weight-bold` | `--font-weight-{name}` |
| `line-height` | `--line-height-normal` | `--line-height-{name}` |
| `border-radius` | `--border-radius-md` | `--border-radius-{size}` |
| `elevation` | `--elevation-2` | `--elevation-{level}` |
| `motion` | `--motion-duration-fast` | `--motion-{property}-{name}` |

## Forbidden Patterns

- **No hardcoded hex colors**: Use `var(--color-*)` instead of `#3B82F6`
- **No hardcoded pixel values**: Use `var(--spacing-*)` instead of `16px`
- **No raw font stacks**: Use `var(--font-family-*)` instead of `'Inter', sans-serif`
- **No magic numbers**: Every value should reference a token

## Token File Format

- JSON tokens go in `designs/tokens/*.json`
- CSS custom properties go in `designs/tokens/tokens.css`
- Theme overrides go in `designs/tokens/theme-{name}.css`
