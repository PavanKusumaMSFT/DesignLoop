---
title: "ParameterPalette"
phase: deliver
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Handoff Agent"
related:
  - "prototypes/src/components/ParameterPalette/ParameterPalette.tsx"
  - "designs/component-specs.md"
  - "designs/wireframe-spec.md"
  - "tests/accessibility-audit.md"
  - "strategy/requirements-prd.md"
---

# ParameterPalette

> Non-modal popover of valid parameters/flags and, at value positions, valid enum values for a
> recognised `az` command (wireframe **State B**, FR-2 / concepts C5·C6·C7). Enforces the
> required-param-first checklist and never suggests invalid values. Rendered as an ARIA
> `listbox` with roving `aria-activedescendant`: the command input keeps DOM focus, so this is
> a **popup, not a focus trap** (NG2). It **never** consumes `Enter` / `Ctrl+C`.

## Overview

- **Maps to:** FR-2 (contextual parameter & enum-value suggestions), concepts C5/C6/C7.
- **Rendered in states:** B (rich), F-1 (plain — a single comma-joined advisory line).
- **Composition:** renders a list of `SuggestionItem` rows. Selection is **owned by the
  parent** (`OverlayHost` via `activeIndex` + `onActiveIndexChange`); the palette holds no
  selection state of its own.
- **Grouping fidelity note:** the wireframe nests enum values *under* the active flag; the
  prototype flattens flags + enum values into one indexable listbox for a single coherent
  roving-selection model (T&T-5, README fidelity note #4). Confirm with Designer before GA.

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | — | Yes | Stable DOM id so the command input can point `aria-controls` / `aria-activedescendant` at the listbox. Rows get `${id}-opt-${n}`. |
| `commandContext` | `string` | — | Yes | e.g. `"az servicebus namespace create"`. Shown in header + folded into the listbox `aria-label`. |
| `freshness` | `'cached' \| 'live'` | — | Yes | Header badge; rendered as glyph (`⚡`/`●`) + word (never colour-alone). |
| `groups` | `ParamGroup[]` | — | Yes | Required-first, then optional. Flattened into an indexable option list. |
| `activeIndex` | `number` | — | Yes | Index of the selected row across the flattened list. |
| `filterText` | `string` | — | No | Narrows rows as the user types; also drives fuzzy match-range highlighting. |
| `variant` | `'rich' \| 'plain'` | `'rich'` | No | `plain` ⇒ single comma-joined advisory line, no selection model (State F-1). |
| `onSelect` | `(item: ParamItem) => void` | — | Yes | `Tab` / click inserts the flag/value at the caret. |
| `onDismiss` | `() => void` | — | Yes | `Esc` / outside dismiss. **`Esc` handling lives in `OverlayHost`**; the prop documents intent. |
| `onActiveIndexChange` | `(i: number) => void` | — | Yes | Reports hover/selection-index changes back to the host. |

### Supporting types

```ts
interface ParamGroup {
  label: string;                         // "required" | "optional" | "--sku values"
  requirement: 'required' | 'optional';
  items: ParamItem[];
}
interface ParamItem {
  kind: 'flag' | 'enum-value';
  label: string;                         // "--sku" | "Standard"
  valueType?: 'string' | 'enum' | 'lookup' | 'free-text';
  description?: string;
  requirement: 'required' | 'optional';
  status?: 'valid' | 'deprecated';       // for enum values
}
```

## Variants

### Rich
Full popover: header (`parameters · {context}` + freshness badge), scrollable `listbox` of
`SuggestionItem` rows, footer legend (`↑↓ move · Tab accept · Esc dismiss · Ctrl+Space peek`)
and a filtered match count.

### Plain
One line: `cirrus: valid values for {context}: a, b, c (Tab completion unavailable)`. No
selection, no ARIA listbox — advisory text only (State F-1).

## States

| State | Description | Visual Changes |
|-------|-------------|----------------|
| Default | Rows rendered, `activeIndex` row highlighted | Active row uses `--color-suggestion-active-bg` + border |
| Filtered | `filterText` set | Non-matching rows removed; match ranges highlighted; footer shows `N of M match` |
| Empty | No rows match / no bounded values | `role="note"` line: `no bounded values — type freely <free text>` (rendered outside the option set) |
| Selected row | `i === activeIndex` | See `SuggestionItem` selected state — **all** children recoloured (A11Y-1 fix) |
| Plain | `variant='plain'` | Single advisory line, no interactivity |

## Design Tokens

| Token | Usage |
|-------|-------|
| `--color-surface-overlay` | Popover background |
| `--color-border-subtle` | Popover / header / footer borders |
| `--color-param-flag` | Flag-token colour |
| `--color-resource-live` / `--color-resource-cached` | Freshness badge |
| `--color-resource-meta` | Meta text |
| `--color-text-secondary` / `--color-text-muted` | Header / footer / descriptions |
| `--elevation-2` | Popover shadow depth |
| `--border-radius-md` | Popover corner radius |
| `--font-family-mono` | Monospace grid |
| `--font-size-sm` / `--font-size-xs` / `--font-size-2xs` | Row / meta / badge text |
| `--font-weight-semibold` / `--font-weight-medium` | Header / emphasis |
| `--line-height-normal` | Row height |
| `--spacing-2xs` / `--spacing-xs` / `--spacing-sm` | Dense padding |
| `--motion-duration-base` + `--motion-easing-decelerate` | Popover open/close (zeroed under reduced motion) |

Row-level suggestion/state tokens are consumed by the child `SuggestionItem` (see its spec).

## Accessibility

### ARIA
- Outer container `role="presentation"`; the `<ul>` is `role="listbox"` with `id={id}`,
  `aria-label="Parameters for {context}"`, and `aria-activedescendant={activeOptionId}`.
- Each row is a `SuggestionItem` `role="option"` with `aria-selected` and a full
  `aria-label` folding every non-colour signal (label, requirement, status, freshness, desc).
- **A11Y-3 (fixed):** the command input in `OverlayHost` is the single focusable combobox that
  carries the accessible name (`aria-label="Azure CLI command"`) and `aria-activedescendant`;
  the palette exposes matching option ids so the roving announcement is not lost.
- The empty-state note is `role="note"`, kept **out** of the option set (A11Y-6 guidance).

### Keyboard
All keys are handled centrally by `OverlayHost` and only while the overlay is open:

| Key | Action |
|-----|--------|
| `↑` / `↓` | Move selection (wraps) |
| `Tab` | Insert selected flag/value at the caret (`onSelect`), then close |
| `Esc` | Dismiss to plain typing (single `Esc`, never traps) |
| `Ctrl+Space` | On-demand peek (force-open) |
| `Enter` / `Ctrl+C` / `Ctrl+L` / tmux prefix | **Never intercepted** — pass through to shell |

Rows are intentionally **not** individually focusable (roving selection via
`aria-activedescendant`). Clicks use `onMouseDown` + `preventDefault` so the command input
never loses DOM focus.

### Focus
Focus stays on the command input; the palette itself is never a tab stop.

### Contrast
Idle rows and all header/footer text pass AA in every theme. The active row's children were
recoloured to `--color-suggestion-active-text` (A11Y-1) and the high-contrast active-bg token
darkened to `--color-primary-800` (A11Y-2) so every selected-row element clears ≥ 4.5:1.

## Usage Examples

```tsx
import { ParameterPalette } from 'cirrus-prototype';
import type { ParamGroup } from 'cirrus-prototype';

const groups: ParamGroup[] = [
  {
    label: 'required',
    requirement: 'required',
    items: [
      { kind: 'flag', label: '--name', valueType: 'string', requirement: 'required',
        description: 'Namespace name' },
      { kind: 'flag', label: '--sku', valueType: 'enum', requirement: 'required',
        description: 'Pricing tier' },
    ],
  },
];

<ParameterPalette
  id="cirrus-palette"
  commandContext="az servicebus namespace create"
  freshness="cached"
  groups={groups}
  activeIndex={activeIndex}
  filterText={filter}
  variant="rich"
  onSelect={(item) => insertAtCaret(item.label)}
  onDismiss={() => closeOverlay()}
  onActiveIndexChange={setActiveIndex}
/>
```

## Related Components

- `SuggestionItem` — the shared row rendered for each parameter/enum value.
- `OverlayHost` — owns the keyboard contract, `activeIndex`, and the focusable combobox.
- `ResourceLookupList` — sibling overlay (mutually exclusive with the palette).

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-07-13 | Initial developer API spec | Handoff Agent |
