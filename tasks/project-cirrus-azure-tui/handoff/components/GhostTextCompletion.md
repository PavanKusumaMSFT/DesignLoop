---
title: "GhostTextCompletion"
phase: deliver
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Handoff Agent"
related:
  - "prototypes/src/components/GhostTextCompletion/GhostTextCompletion.tsx"
  - "designs/component-specs.md"
  - "designs/wireframe-spec.md"
  - "tests/accessibility-audit.md"
  - "strategy/requirements-prd.md"
---

# GhostTextCompletion

> Inline, low-emphasis prediction rendered after the caret for a recognised `az` command
> (wireframe **State A**, FR-1 / concept C1). It is the lightest-touch surface: ignorable by
> default, visually recessive, and decorative to the accessibility tree — the spoken
> announcement is carried by a polite live region so screen readers never read half-typed
> text as real input.

## Overview

- **Maps to:** FR-1 (inline intelligent autocomplete), concept C1.
- **Rendered in states:** A (rich). In `plain` (State F-1) it renders **nothing** — degraded
  surfaces move guidance to `HintLine`.
- **Ownership:** pure/presentational. It **does not** own keyboard handling; the `onAccept`
  callback is wired by `OverlayHost`, which owns the `Tab`-accept contract. The component
  receives `suggestion`/`visible` via props from the (mocked) intelligence core.

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `suggestion` | `string \| null` | — | Yes | Full predicted continuation. `null` ⇒ renders nothing. |
| `matchedPrefix` | `string` | — | No | The already-typed segment to visually de-emphasise (rendered with `--color-ghost-text-emphasis`). Only applied when `suggestion.startsWith(matchedPrefix)`. |
| `visible` | `boolean` | — | Yes | Gated by debounce + az-context detection upstream. `false` ⇒ inline span hidden and live region cleared. |
| `maxWidthCh` | `number` | — | No | Clamp width in `ch` units; overflow ⇒ CSS ellipsis. Set to the remaining viewport width. |
| `variant` | `'rich' \| 'plain'` | `'rich'` | No | `plain` ⇒ inline ghost is never rendered (State F-1). |
| `onAccept` | `(accepted: string) => void` | — | Yes | Fired on `Tab` / `→`-at-EOL. **Wired by `OverlayHost`, not by this component** — passing it satisfies the type but the host intercepts the key. |

## Variants

### Rich
The inline greyed continuation span rendered after the command text. Used in States A–D on
overlay-capable surfaces.

### Plain
No inline span is rendered at all (returns only the empty live region). Degraded/limited TTYs
(State F-1) do not show ghosts; any guidance is surfaced through `HintLine` instead.

## States

| State | Description | Visual Changes |
|-------|-------------|----------------|
| Hidden | `null` suggestion, not az-context, still computing, or `variant='plain'` | Nothing rendered inline |
| Visible | `visible && suggestion && variant='rich'` | Greyed continuation in `--color-ghost-text`; matched prefix in `--color-ghost-text-emphasis` |
| Overflow | Continuation exceeds `maxWidthCh` | Truncated with `…` (CSS `text-overflow: ellipsis`) |
| Accepting | `onAccept` fired by host | Text committed to the line upstream; ghost clears/fades via `--motion-transition-fade` (90 ms; 0 ms under reduced motion) |

## Design Tokens

| Token | Usage |
|-------|-------|
| `--color-ghost-text` | Continuation text colour (≥ 4.5:1 on terminal: 4.8:1 dark, 4.9:1 light) |
| `--color-ghost-text-emphasis` | Matched-prefix emphasis colour |
| `--font-family-mono` | Monospace cell alignment |
| `--font-size-base` | 14px terminal body |
| `--font-weight-normal` | Continuation weight |
| `--font-weight-medium` | Emphasis-segment weight |
| `--line-height-tight` | Terminal row height |
| `--motion-transition-fade` | Fade in/out (zeroed under `prefers-reduced-motion`) |

## Accessibility

### ARIA
- The visible ghost span is `aria-hidden="true"` — it is decorative, so AT never reads
  half-typed inline text as real input.
- The **accessible companion** is a visually-hidden `<span aria-live="polite">`. When
  `visible && suggestion`, it is set to `suggestion: {suggestion}, press Tab to accept`;
  otherwise it is cleared.
- The command input (owned by `OverlayHost`) carries `aria-autocomplete="inline"`.

### Keyboard
| Key | Action | Owner |
|-----|--------|-------|
| `Tab` / `→` (at EOL) | Accept the suggestion (fires `onAccept`) | `OverlayHost` intercepts; never trapped |
| Any divergent key | Clears the ghost (upstream re-computes `suggestion`) | Intelligence core |

Ghost text is **not focusable**; focus stays in the command input.

### Focus
Never receives focus. No focus ring of its own.

### Contrast
`--color-ghost-text` is verified ≥ 4.5:1 on `--color-surface-terminal` in all three themes.
Recessive by design but still readable.

## Usage Examples

```tsx
import { GhostTextCompletion } from 'cirrus-prototype';

// Basic — rendered inside OverlayHost's command line
<GhostTextCompletion
  suggestion="group create --name "
  matchedPrefix="group cr"
  visible={overlay === 'none' && !!ghostSuggestion}
  variant="rich"
  onAccept={(accepted) => commitToLine(accepted)}
/>

// Degraded surface — renders nothing inline
<GhostTextCompletion
  suggestion="group create --name "
  visible={false}
  variant="plain"
  onAccept={() => {}}
/>
```

## Related Components

- `OverlayHost` — owns the `Tab`-accept keyboard contract and passes `onAccept`.
- `HintLine` — carries guidance in `plain` surfaces where the ghost is suppressed.

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-07-13 | Initial developer API spec | Handoff Agent |
