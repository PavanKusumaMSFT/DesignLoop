---
title: "SuggestionItem"
phase: deliver
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Handoff Agent"
related:
  - "prototypes/src/components/SuggestionItem/SuggestionItem.tsx"
  - "prototypes/src/components/SuggestionItem/SuggestionItem.module.css"
  - "designs/component-specs.md"
  - "tests/accessibility-audit.md"
  - "strategy/requirements-prd.md"
---

# SuggestionItem

> The shared single-row primitive rendered inside both `ParameterPalette` (State B) and
> `ResourceLookupList` (State C). It is an ARIA `option` (`role="option"`) inside the parent
> `listbox`. It is **intentionally not individually focusable** — roving selection is owned by
> the parent via `aria-activedescendant`. Its defining accessibility contract: **fold every
> non-colour signal into the accessible name** so meaning never depends on colour alone.

## Overview

- **Maps to:** FR-2 / FR-3 (shared suggestion row).
- **Rendered in states:** B, C (rich), F-1 (plain — a bare comma-joined text token).
- **Selection model:** the parent listbox passes `selected` and points
  `aria-activedescendant` at the selected row's `id`. This row is never a tab stop.
- **A11Y-1 fix lives here:** on the selected row, **all** child spans (type hint, secondary,
  required glyph, status, requirement, freshness) are recoloured to
  `--color-suggestion-active-text` so every element clears ≥ 4.5:1 on the active background.

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | — | Yes | DOM id so the parent listbox can point `aria-activedescendant` at it. |
| `kind` | `'flag' \| 'enum-value' \| 'resource'` | — | Yes | Row kind; exposed as a CSS custom prop `--kind`. |
| `label` | `string` | — | Yes | Primary text (`--sku`, `Standard`, `rg-prod`). |
| `matchRanges` | `[number, number][]` | — | No | Char ranges to emphasise (fuzzy match). Decorative (`aria-hidden`). |
| `secondary` | `string` | — | No | Secondary/description text. |
| `typeHint` | `string` | — | No | Value-type hint, e.g. `<enum>`; `<>` stripped from `aria-label`. |
| `requirement` | `'required' \| 'optional'` | — | No | Required rows also render a `*` glyph. |
| `status` | `'valid' \| 'deprecated'` | — | No | Enum-value status. |
| `freshness` | `'cached' \| 'live'` | — | No | Rendered as glyph (`⚡`/`●`) + word. |
| `selected` | `boolean` | — | Yes | Whether this is the active row. |
| `variant` | `'rich' \| 'plain'` | `'rich'` | No | `plain` ⇒ a bare `<span>` token (with ` (deprecated)` suffix if applicable) for comma-joined output. |
| `onSelect` | `() => void` | — | Yes | Fired on `onMouseDown` (with `preventDefault` so the command input keeps DOM focus). |

## Variants

### Rich
An `<li role="option">` with primary label (match highlights + optional `*`), optional type
hint, secondary text, status, requirement, and freshness signals.

### Plain
A bare `<span>{label}{ (deprecated)?}</span>` — used inside a parent's comma-joined advisory
line (State F-1). No `role`, no interactivity.

## States

| State | Description | Visual Changes |
|-------|-------------|----------------|
| Idle | `selected=false` | `--color-suggestion-idle-text` on transparent bg; passes AA |
| Selected | `selected=true` | `--color-suggestion-active-bg` + left border `--color-suggestion-active-border`; **all children** recoloured to `--color-suggestion-active-text` (A11Y-1) |
| Match highlight | `matchRanges` set | Emphasised segments: `--color-suggestion-match` + underline + weight (never colour-alone) |
| Required | `requirement='required'` | `*` glyph + "required" word |
| Deprecated | `status='deprecated'` | "deprecated" word + `--color-enum-deprecated` |
| Freshness | `freshness` set | `● live` / `⚡ cached` glyph + word |
| Plain | `variant='plain'` | Bare text token |

## Design Tokens

| Token | Usage |
|-------|-------|
| `--color-suggestion-idle-text` / `--color-suggestion-idle-bg` | Idle row |
| `--color-suggestion-active-bg` | Selected-row background (high-contrast = `--color-primary-800`, A11Y-2) |
| `--color-suggestion-active-text` | Selected-row foreground (all children) |
| `--color-suggestion-active-border` | Selected-row left border / focus cue |
| `--color-suggestion-match` | Match-highlight colour |
| `--color-param-flag` | Idle flag/primary colour |
| `--color-param-required` / `--color-param-optional` / `--color-param-type` | Requirement / type-hint signals |
| `--color-enum-valid` / `--color-enum-deprecated` | Enum status |
| `--color-resource-live` / `--color-resource-cached` | Freshness signals |
| `--color-text-secondary` | Secondary text |
| `--font-family-mono`, `--font-size-sm/-xs/-2xs` | Type scale |
| `--font-weight-bold/-semibold/-medium` | Emphasis levels |
| `--line-height-snug` | Dense list rows |
| `--border-radius-sm` | Row corner |
| `--spacing-2xs` / `--spacing-sm` | Padding / gaps |

## Accessibility

### ARIA
- `role="option"` with `aria-selected={selected}`.
- **`aria-label` folds every signal** (via `buildAriaLabel`): label, requirement, status,
  freshness, secondary, and type hint (`<>` stripped). This is the "never colour-alone"
  guarantee at the row level.
- All decorative visual spans (match highlight, glyphs, badges) are `aria-hidden="true"` — the
  meaning is already carried by the row's `aria-label`.

### Keyboard
The row handles **no keys itself**. Navigation (`↑↓`), acceptance (`Tab`), and dismissal
(`Esc`) are owned centrally by `OverlayHost`. Pointer selection uses `onMouseDown` +
`e.preventDefault()` so the command input never loses focus.

### Focus
Not a tab stop. Selection is communicated to AT via the parent's `aria-activedescendant`, not
via DOM focus on the row (A11Y-3 pattern).

### Contrast
- Idle rows: pass AA in all themes.
- Selected rows: **all** children clear ≥ 4.5:1 after the A11Y-1 recolour + A11Y-2 token
  darkening (re-verified 0 Serious in the latest axe sweep).

## Usage Examples

```tsx
import { SuggestionItem } from 'cirrus-prototype';

// Rendered by ParameterPalette / ResourceLookupList — not usually standalone
<SuggestionItem
  id="cirrus-palette-opt-0"
  kind="flag"
  label="--sku"
  matchRanges={[[0, 5]]}
  secondary="Pricing tier"
  typeHint="<enum>"
  requirement="required"
  selected={activeIndex === 0}
  onSelect={() => insertAtCaret('--sku')}
/>
```

### Do / Don't

- ✅ **Do** rely on the parent listbox to own `aria-activedescendant` and keyboard.
- ❌ **Don't** add `tabIndex` to the row — it breaks the non-modal roving-selection pattern.
- ✅ **Do** pass all signals as props so they land in `aria-label`.
- ❌ **Don't** signal state with colour only — always keep the accompanying glyph/word.

## Related Components

- `ParameterPalette`, `ResourceLookupList` — the two parents that render this row.
- `OverlayHost` — owns focus + keyboard.

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-07-13 | Initial developer API spec | Handoff Agent |
