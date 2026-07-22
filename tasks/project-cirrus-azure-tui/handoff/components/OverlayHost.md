---
title: "OverlayHost"
phase: deliver
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Handoff Agent"
related:
  - "prototypes/src/OverlayHost/OverlayHost.tsx"
  - "prototypes/src/hooks/useCapability.ts"
  - "designs/wireframe-spec.md"
  - "tests/accessibility-audit.md"
  - "strategy/requirements-prd.md"
---

# OverlayHost (composer)

> The single positioned container that anchors **below the caret line** and composes the whole
> Cirrus surface: at most one of `ParameterPalette` / `ResourceLookupList` (mutually
> exclusive), plus optionally `HintLine` and inline `GhostTextCompletion`. It **owns the shared
> keyboard contract** so children only expose intent callbacks and can never trap the user. It
> consumes `useCapability` and drives the `rich → plain → suppressed` cascade. It is the
> integration seam an engineering team wires to the real shell/intelligence core.

## Overview

- **Maps to:** composition + the centralised keyboard contract; drives C17 cascade.
- **Owns:** `overlay` (`none | palette | resource`), `hintVisible`, `activeIndex`, and the one
  focusable **combobox** (`role="combobox"` on the command span with
  `aria-label="Azure CLI command"`, A11Y-3 fix).
- **Guarantees:** overlays render **below** the caret and never cover the command; `Esc` always
  exits to plain typing; `Enter` / `Ctrl+C` / `Ctrl+L` / tmux `Ctrl+B` are **never**
  intercepted (NG1, NG2, FR-5, NFR-3).

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `prompt` | `string` | `'$ '` | No | The shell prompt string. |
| `command` | `string` | — | Yes | The already-typed command text (always fully visible + editable). |
| `capability` | `CapabilityInput` | — | Yes | Probe inputs driving the cascade (see `useCapability`). |
| `ghostSuggestion` | `string \| null` | `null` | No | Ghost-text prediction (State A). |
| `ghostMatchedPrefix` | `string` | — | No | Matched prefix for the ghost. |
| `hint` | `{ message: string; shortcut?: { keys: string; action: string } }` | — | No | Hint line content (State D). |
| `activeOverlay` | `'none' \| 'palette' \| 'resource'` | `'none'` | No | Which overlay is initially open. |
| `paletteContext` | `string` | `''` | No | `ParameterPalette` command context. |
| `paletteFreshness` | `'cached' \| 'live'` | `'cached'` | No | Palette freshness badge. |
| `paletteGroups` | `ParamGroup[]` | `[]` | No | Palette rows. |
| `resourceType` | `string` | `''` | No | Resource-lookup type label. |
| `subscriptionLabel` | `string` | `''` | No | Subscription label. |
| `resourceStatus` | `ResourceStatus` | `'resolved'` | No | Lookup status. |
| `resourceItems` | `ResourceItem[]` | `[]` | No | Resource rows. |
| `onAcceptGhost` | `(accepted: string) => void` | — | No | Fired on `Tab` when a ghost is present and no overlay is open. |
| `onSelectParam` | `(item: ParamItem) => void` | — | No | Fired on `Tab`/click of a palette row. |
| `onSelectResource` | `(item: ResourceItem) => void` | — | No | Fired on `Tab`/click of a resource row. |

### Exported type

```ts
type ActiveOverlay = 'none' | 'palette' | 'resource';
```

## The centralised keyboard contract

All keys are handled in one `onKeyDown` on the combobox. This is the single most important
behaviour to preserve — it is the antidote to the `az interactive` "trap" (T&T, NG2).

| Key | Condition | Action |
|-----|-----------|--------|
| `Enter` | always | **Pass through** — submits the line in the shell |
| `Ctrl+C` / `Ctrl+L` | always | **Pass through** — shell / clear |
| `Ctrl+B` (tmux prefix) | always | **Pass through** |
| Any printable key | always | Pass through; overlay re-filters upstream, never blocked |
| `Ctrl+Space` | overlay closed | Peek: force-open the palette |
| `Tab` | overlay closed + ghost present | Accept the ghost (`onAcceptGhost`), else let shell complete |
| `Esc` | overlay open | Close to plain typing (single `Esc`; a second `Esc` passes to shell) |
| `↓` / `↑` | overlay open | Move `activeIndex` (wraps) |
| `Tab` | overlay open | Accept the active row (`onSelectParam`/`onSelectResource`), close |

Only `Tab`, `↑`, `↓`, `Esc`, `Ctrl+Space` are ever `preventDefault`-ed, and only while
relevant. Everything else flows to the shell untouched.

## States (by capability tier)

| Tier | Rendered |
|------|----------|
| `suppressed` | **Only** the command line (prompt + command + caret). No overlays, no keybindings held (State E / F-2 / disabled / AI-terminal). |
| `plain` | Command line + `HintLine`/`ParameterPalette`/`ResourceLookupList` in their `plain` advisory forms; no ghost inline (State F-1). |
| `rich` | Command line + inline ghost + hint + one open overlay below the caret (States A–D). |

A `variant · overlay` debug line is rendered `aria-hidden` for development; remove or gate it
in production.

## Design Tokens

| Token | Usage |
|-------|-------|
| `--color-surface-terminal` | Host background |
| `--color-text-command` | Typed command text |
| `--color-text-muted` | Prompt / debug |
| `--color-param-flag` | Command-token accent |
| `--color-focus-ring` | Combobox focus ring |
| `--font-family-mono`, `--font-size-base/-2xs` | Terminal cell / debug |
| `--font-weight-semibold` | Prompt emphasis |
| `--line-height-tight` | Terminal rows |
| `--border-radius-lg` / `--border-radius-sm` | Host / caret |
| `--spacing-2xs` / `--spacing-md` | Layout padding |

Child overlays consume their own tokens (see each component spec).

## Accessibility

### ARIA
- The command span is the **single focusable combobox** (`role="combobox"`, `tabIndex=0`,
  `aria-label="Azure CLI command"`, `aria-autocomplete="inline"`, `aria-expanded`,
  `aria-controls`, `aria-activedescendant`). This consolidation is the A11Y-3 fix — focus and
  `aria-activedescendant` live on the *same* element, so the active option is announced as the
  user arrows.
- The caret span is `aria-hidden="true"`.
- Overlays are anchored in a `.below` region so they never cover the editable command.

### Keyboard
See the contract table above. The host is the sole key handler; children never bind keys.

### Focus
Focus stays on the combobox at all times; overlays are popups (roving selection), never focus
traps. Single `Esc` always exits (NG2).

### Contrast / motion
Inherits token themes via `data-theme` on an ancestor; honours `prefers-reduced-motion` via the
motion tokens. High-contrast active-row pair fixed (A11Y-2).

## Usage Examples

```tsx
import { OverlayHost } from 'cirrus-prototype';
import type { CapabilityInput } from 'cirrus-prototype';

const capability: CapabilityInput = {
  isInteractiveTty: true,
  supportsOverlays: true,
  isAzContext: true,
};

<div data-theme="dark">
  <OverlayHost
    prompt="$ "
    command="az servicebus namespace create --sku "
    capability={capability}
    activeOverlay="palette"
    paletteContext="az servicebus namespace create"
    paletteFreshness="cached"
    paletteGroups={groups}
    hint={{ message: '3 required flags remain',
            shortcut: { keys: 'Ctrl+Space', action: 'review' } }}
    onSelectParam={(item) => insertAtCaret(item.label)}
    onAcceptGhost={(g) => commitToLine(g)}
  />
</div>
```

### Do / Don't

- ✅ **Do** compute `command` and `capability` from the real shell each keystroke and pass
  them in; keep the host presentational.
- ❌ **Don't** intercept `Enter`, `Ctrl+C`, `Ctrl+L`, or tmux prefixes anywhere in the tree.
- ✅ **Do** keep overlays mutually exclusive (`palette` XOR `resource`).
- ❌ **Don't** move overlays above/over the command line — they must render below the caret.
- ❌ **Don't** ship the `aria-hidden` debug line to production.

## Related Components

- `useCapability` — the tier resolver it consumes.
- `GhostTextCompletion`, `ParameterPalette`, `ResourceLookupList`, `HintLine` — composed children.

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-07-13 | Initial developer API spec | Handoff Agent |
