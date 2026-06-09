---
title: "Component Spec: Click-to-Edit Field"
phase: design
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Designer Agent"
related:
  - "../../ideation/solution-concepts.md"
---

# Component Spec: Click-to-Edit Field

## Overview

Inline editable field for deployment parameters. In **display mode**, the field shows the current value as static text with a pencil icon revealed on hover. In **edit mode**, the field transforms into an input with validation, autocomplete suggestions, an impact preview tooltip, and confirm/cancel controls.

## Anatomy

1. **Display container** — text value + pencil icon (visible on hover)
2. **Edit input** — text/number/select input matching the `type` prop
3. **Validation message** — inline error or success hint below the input
4. **Autocomplete dropdown** — contextual suggestions based on field type
5. **Impact preview tooltip** — shows cost/resource impact of the proposed change
6. **Action buttons** — Confirm (✓) and Cancel (✕)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string \| number` | — | Current field value |
| `type` | `"text" \| "number" \| "select" \| "enum"` | `"text"` | Input type to render in edit mode |
| `options` | `string[]` | `[]` | Available options for `select` and `enum` types |
| `onSave` | `(newValue: string \| number) => Promise<void>` | — | Callback when the user confirms a change |
| `onCancel` | `() => void` | — | Callback when the user cancels editing |
| `validation` | `(value: string \| number) => ValidationResult` | — | Validation function returning `{ valid, message }` |
| `impactPreview` | `(value: string \| number) => ImpactResult` | — | Returns cost/resource impact data for the proposed value |
| `readOnly` | `boolean` | `false` | Locks the field in display mode |

## States

| State | Description |
|-------|-------------|
| **Display** | Shows current value as static text; pencil icon hidden |
| **Hover** | Pencil icon appears; cursor changes to pointer |
| **Editing** | Input is focused; confirm/cancel buttons visible |
| **Validating** | Spinner shown while async validation runs |
| **Valid** | Green check; confirm button enabled |
| **Invalid** | Error message shown; confirm button disabled |
| **Saving** | Spinner on confirm button; input disabled |
| **ReadOnly** | Static text; no hover affordance; no pencil icon |

## Behavior

- **Click** or **Enter** on the display container enters edit mode and focuses the input.
- **Escape** cancels editing and reverts to display mode.
- **Enter** (in the input) triggers validation then confirms the change.
- **Tab** moves focus to the next editable field in the form.
- An **invalid** validation result blocks save — the confirm button is disabled and the error message is shown.
- On successful save, a brief **"Updated"** animation plays on the field.
- When `impactPreview` is provided, a **cost impact tooltip** appears as the user types, showing estimated cost changes.

## Design Tokens

| Element | Token | Purpose |
|---------|-------|---------|
| Display text | `--font-size-base` | Base font size for the value |
| Display text color | `--color-neutral-900` | Primary text color |
| Edit mode border | `--color-primary-500` | Focus ring / border color in edit mode |
| Error text & border | `--color-error-500` | Validation error styling |
| Save animation | `--motion-duration-fast` | Duration for the "Updated" confirmation animation |

## Accessibility

- **Display mode**: The container has `role="button"` and `tabindex="0"` so it is focusable and activatable via keyboard.
- **Edit mode**: The input is rendered with a proper `<label>` association. For `select`/`enum` types, the listbox follows ARIA combobox patterns.
- **Errors**: The input receives `aria-invalid="true"` and `aria-describedby` pointing to the error message element.
- **Focus management**: Focus moves to the input on edit, and returns to the display container on cancel or save.
- Minimum touch target size of 44×44 px.
- All interactive states meet WCAG 2.1 AA contrast requirements (4.5:1 for normal text, 3:1 for large text).

## Requirements Traceability

- **REQ-007** — Inline parameter editing
- **REQ-015** — Cost impact preview on edits
