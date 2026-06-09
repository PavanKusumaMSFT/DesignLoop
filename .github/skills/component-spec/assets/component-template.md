---
title: "{ComponentName}"
phase: deliver
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
author: "Handoff Agent"
related: []
---

# {ComponentName}

> {Brief description of the component and its primary use case.}

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | No | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | No | Component size |
| `disabled` | `boolean` | `false` | No | Disables interaction |
| `children` | `ReactNode` | — | Yes | Content to render |
| `onClick` | `() => void` | — | No | Click handler |
| `className` | `string` | — | No | Additional CSS classes |

## Variants

### Primary
{Description of when to use the primary variant.}

### Secondary
{Description of when to use the secondary variant.}

### Ghost
{Description of when to use the ghost variant.}

## States

| State | Description | Visual Changes |
|-------|-------------|----------------|
| Default | Resting state | — |
| Hover | Mouse over | {describe changes} |
| Active | Being pressed | {describe changes} |
| Focus | Keyboard focus | Focus ring using `--color-primary-500` |
| Disabled | Non-interactive | Opacity 0.5, cursor not-allowed |
| Loading | Async action | Spinner replaces content |

## Design Tokens

| Token | Usage |
|-------|-------|
| `--color-primary-500` | Primary variant background |
| `--color-primary-700` | Primary variant hover background |
| `--color-neutral-200` | Border color |
| `--spacing-sm` | Horizontal padding (sm size) |
| `--spacing-md` | Horizontal padding (md size) |
| `--border-radius-md` | Corner radius |
| `--font-size-sm` | Text size (sm variant) |
| `--motion-duration-fast` | Hover transition |

## Accessibility

### ARIA
- Role: `button` (implicit when using `<button>`)
- `aria-disabled="true"` when disabled
- `aria-busy="true"` when loading

### Keyboard
| Key | Action |
|-----|--------|
| `Enter` | Activate the button |
| `Space` | Activate the button |
| `Tab` | Move focus to/from button |

### Screen Reader
- Announces: "{children} button"
- When disabled: "{children} button, dimmed"
- When loading: "{children} button, busy"

## Usage Examples

```tsx
import { {ComponentName} } from '@/components/{ComponentName}';

// Primary (default)
<{ComponentName} onClick={handleClick}>
  Save Changes
</{ComponentName}>

// Secondary variant, small size
<{ComponentName} variant="secondary" size="sm">
  Cancel
</{ComponentName}>

// Disabled state
<{ComponentName} disabled>
  Submit
</{ComponentName}>
```

## Related Components

- {List related components here}

## Changelog

| Date | Change | Author |
|------|--------|--------|
| YYYY-MM-DD | Initial spec | Handoff Agent |
