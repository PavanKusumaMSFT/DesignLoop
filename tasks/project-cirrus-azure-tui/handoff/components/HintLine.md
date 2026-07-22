---
title: "HintLine"
phase: deliver
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Handoff Agent"
related:
  - "prototypes/src/components/HintLine/HintLine.tsx"
  - "designs/component-specs.md"
  - "designs/wireframe-spec.md"
  - "tests/accessibility-audit.md"
  - "strategy/requirements-prd.md"
---

# HintLine

> One quiet, expert-framed, dismissible hint line rendered below the caret (wireframe
> **State D**, FR-4 / concepts C13·C14). Copy is neutral and factual — **never** beginner-stigma
> phrasing (NG5, T4). Uses `role="note"` in a polite live region so a new hint is announced
> without stealing focus. `Esc` also dismisses (via `OverlayHost`).

## Overview

- **Maps to:** FR-4 (discoverability affordances, expert-framed), concepts C13/C14.
- **Rendered in states:** D (rich), F-1 (plain — a bare `cirrus: {message}` text line).
- **Copy contract (AC-4.2 / NG5):** factual and expert-appropriate (e.g. `"3 required flags
  remain"`, `"42 SKUs available — Ctrl+Space to review"`). No `"Tip"`, `"beginner"`,
  `"learn the basics"` framing.
- **Persistent disable (AC-4.3):** `onDisableAll` wires the persistent "don't show hints"
  setting. Note **T&T-3 open item**: the inline "Don't show hints" control is only visible when
  a hint is shown; a documented global setting surface is still owed.

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `message` | `string` | — | Yes | Expert-neutral copy. Empty string ⇒ renders `null` (no nagging empty hint). |
| `shortcut` | `{ keys: string; action: string }` | — | No | A **documented, not hijacked** shortcut, e.g. `{ keys: 'Ctrl+Space', action: 'review' }`. Rendered as a `<kbd>` chip in rich, parenthesised text in plain. |
| `dismissible` | `boolean` | `true` | No | Shows the `✕ hide` button. |
| `variant` | `'rich' \| 'plain'` | `'rich'` | No | `plain` ⇒ plain-text line, no accent glyph or `kbd` chips (State F-1). |
| `onDismiss` | `() => void` | — | Yes | Hides this hint instance (`✕ hide` button or `Esc`). |
| `onDisableAll` | `() => void` | — | No | Persistent "Don't show hints" setting (AC-4.3). When omitted, the button is not rendered. |

## Variants

### Rich
`⌁` accent glyph + copy + optional `<kbd>` shortcut chip + actions (`Don't show hints`,
`✕ hide`). `role="note"`, `aria-live="polite"`.

### Plain
`<p role="note">cirrus: {message} (keys to action)</p>` — plain text, no glyph/chips, no
buttons (State F-1).

## States

| State | Description | Visual Changes |
|-------|-------------|----------------|
| Hidden | `message === ''` | Renders `null` |
| Visible | Non-empty message | Accent glyph + copy; announced politely |
| With shortcut | `shortcut` provided | ` · <kbd>{keys}</kbd> to {action}` appended |
| Dismissed | `onDismiss` fired | Instance removed by parent (`hintVisible=false`) |
| Focus (dismiss button) | Keyboard focus on `✕ hide` / `Don't show hints` | Focus ring via `--color-focus-ring` |
| Plain | `variant='plain'` | Single plain-text line |

## Design Tokens

| Token | Usage |
|-------|-------|
| `--color-hint-line-text` | Body copy (quiet, ≥ 4.5:1) |
| `--color-hint-line-accent` | Leading `⌁` glyph / key accent |
| `--color-hint-line-key-bg` / `--color-hint-line-key-text` | `<kbd>` chip |
| `--color-hint-line-dismiss` | Dismiss / disable controls |
| `--color-focus-ring` | Focus ring on buttons |
| `--font-family-mono` / `--font-family-ui` | Copy / chrome |
| `--font-size-xs` / `--font-size-2xs` | Copy / chip |
| `--font-weight-semibold` | Chip emphasis |
| `--line-height-relaxed` / `--line-height-normal` / `--line-height-tight` | Hint prose |
| `--border-radius-sm` | Chip corners |
| `--spacing-3xs` / `--spacing-2xs` / `--spacing-xs` / `--spacing-sm` | Padding / gaps |
| `--motion-transition-fade` | Fade (zeroed under reduced motion) |

## Accessibility

### ARIA
- Container `role="note"` with `aria-label="Cirrus hint"`, in an `aria-live="polite"` region —
  a new hint is announced without stealing focus.
- The accent glyph is `aria-hidden="true"` (decorative).

### Keyboard
| Key | Action | Owner |
|-----|--------|-------|
| `Tab` | Focus the `✕ hide` / `Don't show hints` buttons (real `<button>`s) | Native |
| `Enter` / `Space` | Activate the focused button | Native |
| `Esc` | Dismiss the hint like any overlay | `OverlayHost` |

Dismiss controls are real, keyboard-focusable `<button>` elements with accessible labels
(`aria-label="Hide hint"`).

### Focus
Buttons show a visible focus ring via `--color-focus-ring`. The hint container itself is not a
tab stop.

### Contrast
`--color-hint-line-text` verified ≥ 4.5:1 (8.1:1 dark, 9.7:1 light) — quiet but readable in
all themes. State D scanned **0 violations** across all three themes.

## Usage Examples

```tsx
import { HintLine } from 'cirrus-prototype';

<HintLine
  message="3 required flags remain"
  shortcut={{ keys: 'Ctrl+Space', action: 'review' }}
  variant="rich"
  onDismiss={() => setHintVisible(false)}
  onDisableAll={() => persistDisableHints()}
/>

// Plain / degraded surface
<HintLine
  message="42 SKUs available"
  variant="plain"
  onDismiss={() => {}}
/>
```

### Do / Don't

- ✅ **Do** keep copy factual and expert-neutral: `"3 required flags remain"`.
- ❌ **Don't** write onboarding copy: `"New here? Tip: try Ctrl+Space!"` — violates NG5.
- ✅ **Do** reference shortcuts as documentation (`Ctrl+Space to review`).
- ❌ **Don't** rebind the referenced key inside `HintLine` — `OverlayHost` owns keys.

## Related Components

- `OverlayHost` — hosts the hint below the caret and owns `Esc` dismissal.

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-07-13 | Initial developer API spec | Handoff Agent |
