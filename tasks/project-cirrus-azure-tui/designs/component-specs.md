---
title: "Project Cirrus — Component Specifications"
phase: design
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Designer Agent"
related:
  - "designs/wireframe-spec.md"
  - "designs/tokens/README.md"
  - "designs/tokens/tokens.css"
  - "strategy/requirements-prd.md"
  - "ideation/decision-log.md"
---

# Project Cirrus — Component Specifications

Buildable specs for the five core components of the inline Azure CLI intelligence layer,
targeting **React + TypeScript + CSS Modules**. Each spec gives purpose, props/variants,
states, accessibility requirements (ARIA, keyboard, focus, contrast ≥ 4.5:1), and the exact
design-token dependencies consumed. Components reference **only semantic tokens** from
`tokens.css` — no literals (per `.github/instructions/design-tokens.instructions.md`).

## Overview

| Component | Maps to | Concept | Renders in states |
|-----------|---------|---------|-------------------|
| `GhostTextCompletion` | FR-1 | C1 | A |
| `ParameterPalette` | FR-2 | C5/C6/C7 | B, F-1 (plain) |
| `ResourceLookupList` | FR-3 | C9/C10 | C, F-1 (plain) |
| `HintLine` | FR-4 | C13/C14 | D |
| `SuggestionItem` | FR-2/FR-3 | shared row | B, C, F-1 |

**Universal contract for all components**

- Accept a `variant: 'rich' | 'plain'` prop driven by the capability-detecting layer (C17).
  `plain` drops overlays/elevation/motion and renders read-only text (State F-1).
- Accept `theme` implicitly via `data-theme` on an ancestor — components never branch on theme
  in JS; they consume theme-aware semantic tokens.
- **Never** intercept `Enter`, `Ctrl+C`, `Ctrl+L`, or tmux prefixes. Only opt-in keys
  (`Tab`, `↑↓`, `Esc`, `Ctrl+Space`) are handled, and only while the overlay is open.
- All motion via `--motion-*`; must degrade to none under `prefers-reduced-motion`.
- No component may block input; async data arrives via props/callbacks, never via blocking.

---

## 1. `GhostTextCompletion`

### Purpose
Render a single, low-emphasis inline prediction after the caret for a recognised `az` command
(State A). Ignorable by default; the lightest-touch surface.

### Props / Variants
```ts
interface GhostTextCompletionProps {
  suggestion: string | null;      // full predicted continuation; null => render nothing
  matchedPrefix?: string;         // the already-typed segment to visually de-emphasise
  visible: boolean;               // gated by debounce + az-context detection
  maxWidthCh?: number;            // clamp to remaining viewport; overflow => ellipsis
  variant?: 'rich' | 'plain';     // plain => not rendered inline (guidance moves to HintLine)
  onAccept: (accepted: string) => void; // fired on Tab / →-at-EOL
}
```
- Variants: `rich` (inline ghost span), `plain` (no-op — degraded surfaces don't show ghosts).

### States
| State | Visual |
|-------|--------|
| Hidden | nothing rendered (null suggestion, not az-context, or still computing) |
| Visible | greyed continuation, `--color-ghost-text`; matched segment `--color-ghost-text-emphasis` |
| Overflow | truncated with `…` at `maxWidthCh` |
| Accepting | text committed to line, component unmounts/clears (fade via `--motion-transition-fade`) |

### Accessibility
- **ARIA:** the ghost span is `aria-hidden="true"` (decorative visual); the *accessible*
  announcement is carried by the parent input via `aria-autocomplete="inline"` and an
  `aria-live="polite"` companion that announces "suggestion: {suggestion}, press Tab to
  accept." This prevents screen readers reading half-typed inline text as real input.
- **Keyboard:** `Tab` / `→`-at-end-of-line accept; any divergent keystroke clears; never traps.
- **Focus:** ghost text is not focusable; focus stays in the command input.
- **Contrast:** `--color-ghost-text` verified ≥ 4.5:1 on `--color-surface-terminal` in every
  theme (4.8:1 dark, 4.9:1 light).

### Token dependencies
`--color-ghost-text`, `--color-ghost-text-emphasis`, `--color-text-command`,
`--font-family-mono`, `--font-size-base`, `--font-weight-normal`, `--line-height-tight`,
`--motion-transition-fade`, `--motion-duration-fast`.

---

## 2. `ParameterPalette`

### Purpose
Non-modal popover of valid parameters/flags and, at value positions, valid enum values for the
recognised `az` command (State B). Enforces the required-param-first checklist (C7) and never
suggests invalid values (C6, AC-2.2).

### Props / Variants
```ts
interface ParameterPaletteProps {
  commandContext: string;                 // e.g. "az servicebus namespace create"
  freshness: 'cached' | 'live';           // header badge
  groups: ParamGroup[];                    // required first, then optional
  activeIndex: number;                     // selected row
  filterText?: string;                     // narrows rows as the user types
  variant?: 'rich' | 'plain';             // plain => single comma-joined advisory line (F-1)
  onSelect: (item: ParamItem) => void;     // Tab / click inserts at caret
  onDismiss: () => void;                   // Esc / outside
  onActiveIndexChange: (i: number) => void;
}
type ParamItem = {
  kind: 'flag' | 'enum-value';
  label: string;                           // "--sku" | "Standard"
  valueType?: 'string' | 'enum' | 'lookup' | 'free-text';
  description?: string;
  requirement: 'required' | 'optional';
  status?: 'valid' | 'deprecated';         // for enum values
};
```
- Variants: `rich` (popover with rows), `plain` (F-1: "valid --sku values: A, B, C — Tab
  completion unavailable"; no selection model).

### States
| State | Visual |
|-------|--------|
| Open | popover, `--elevation-2`, `--color-surface-overlay`, header + rows + footer legend |
| Empty / no bounded values | flag shown with `<free text>`; muted "no bounded values" note |
| Filtered | rows narrowed; footer "n of m match" (`--color-resource-meta`) |
| Long list | virtualised, max ~8 rows, scroll; "n more…" footer |
| Closing | fade/translate out via `--motion-transition-popover` |
| Plain | single advisory text line, no elevation/overlay |

### Accessibility
- **ARIA:** container `role="listbox"` with `aria-label="Parameters for {commandContext}"`;
  each row a `SuggestionItem` `role="option"` with `aria-selected`. The command input owns
  `aria-controls={paletteId}`, `aria-expanded`, `aria-activedescendant={activeOptionId}`
  (input keeps DOM focus — the palette is a non-modal popup, not a focus trap; NG2).
- **Required signalling — never color-alone:** required rows render red text **and** a `*`
  glyph **and** an `aria-label` "required"; deprecated enum values render amber **and** a
  "deprecated" text tag in the accessible name.
- **Keyboard:** `↑↓` move (wrap) via `aria-activedescendant`, `Tab` insert, `Esc` dismiss,
  `Ctrl+Space` re-open/peek. `Enter` is **not** consumed — it submits the shell line.
- **Focus:** roving via `aria-activedescendant` (no focus move); visible
  `--color-suggestion-active-border` on the active row.
- **Contrast:** active row text `--color-suggestion-active-text` on
  `--color-suggestion-active-bg` ≥ 4.5:1 in all themes; flag/description text verified.

### Token dependencies
`--color-surface-overlay`, `--color-surface-selected`, `--color-border-subtle`,
`--color-param-flag`, `--color-param-value`, `--color-param-type`, `--color-param-required`,
`--color-param-optional`, `--color-enum-valid`, `--color-enum-deprecated`,
`--color-suggestion-active-bg/-text/-border`, `--color-suggestion-match`,
`--color-text-secondary`, `--color-resource-meta`, `--color-resource-cached`,
`--color-resource-live`, `--elevation-2`, `--border-radius-md`, `--spacing-sm`,
`--spacing-2xs`, `--font-family-mono`, `--font-size-sm/-base/-xs`,
`--font-weight-medium`, `--line-height-snug`, `--motion-transition-popover`,
`--color-focus-ring`.

---

## 3. `ResourceLookupList`

### Purpose
Async, cached-first list of live subscription resources for resource-identifying params
(State C). Cached rows are usable immediately; live results merge in without blocking or
stealing selection (C9/C10, NFR-1). Falls back to free text on timeout/offline (AC-3.3).

### Props / Variants
```ts
interface ResourceLookupListProps {
  resourceType: string;                    // "resource groups"
  subscriptionLabel: string;               // "contoso-prod"
  status: 'loading' | 'resolved' | 'timeout' | 'unauthenticated' | 'empty';
  items: ResourceItem[];                    // may include cached items during loading
  activeIndex: number;
  filterText?: string;
  variant?: 'rich' | 'plain';
  onSelect: (item: ResourceItem) => void;
  onDismiss: () => void;                    // Esc => collapse to free text
  onActiveIndexChange: (i: number) => void;
}
type ResourceItem = {
  name: string;
  meta?: string;                            // region / sub id
  freshness: 'cached' | 'live';
};
```
- Variants: `rich` (list + freshness badges + loading shimmer), `plain` (F-1 single line).

### States
| State | Visual |
|-------|--------|
| Loading | shimmer bar (`--color-resource-loading` on `--color-resource-loading-track`, `--motion-duration-slow`); cached rows shown + selectable; "refreshing…" note |
| Resolved | merged rows; each row a freshness badge `live ●` / `cached ⚡`; "n of m match" |
| Timeout | spinner stops; cached rows kept; muted "showing cached · live lookup timed out — type any value" (`--color-validation-fallback-text`) |
| Unauthenticated / offline | no rows; single muted "sign-in context unavailable — free text" |
| Empty | "no {resourceType} found — type a new name" |
| Plain / reduced-motion | shimmer replaced by static "loading…" text |

### Accessibility
- **ARIA:** `role="listbox"` labelled "{resourceType} in {subscriptionLabel}"; rows
  `role="option"`. Loading state sets `aria-busy="true"`. A polite `aria-live` region
  announces "{n} resources loaded" and freshness ("live"/"cached") so status is not
  color-only.
- **Never color-alone:** freshness is a text badge ("live"/"cached") plus color plus glyph;
  timeout/offline states are conveyed in text.
- **Keyboard:** type filters, `↑↓` move, `Tab` accept, `Esc` collapses to free-text entry
  (never traps; AC-3.3). `Enter` not consumed.
- **Focus:** `aria-activedescendant` on the input; active row `--color-suggestion-active-border`.
- **Contrast:** `--color-resource-name`, `--color-resource-meta`, and both freshness badge
  colors verified ≥ 4.5:1 per theme.

### Token dependencies
`--color-surface-overlay`, `--color-resource-loading`, `--color-resource-loading-track`,
`--color-resource-cached`, `--color-resource-live`, `--color-resource-name`,
`--color-resource-meta`, `--color-validation-fallback-text`,
`--color-suggestion-active-bg/-text/-border`, `--color-suggestion-match`,
`--elevation-2`, `--border-radius-md`, `--spacing-sm`, `--spacing-2xs`,
`--font-family-mono`, `--font-size-sm/-xs`, `--line-height-snug`,
`--motion-duration-slow`, `--motion-easing-standard`, `--color-focus-ring`.

---

## 4. `HintLine`

### Purpose
One quiet, expert-framed, dismissible line of additive discoverability (State D). Neutral copy,
no beginner stigma (T4, NG5); persistently disable-able (AC-4.3).

### Props / Variants
```ts
interface HintLineProps {
  message: string;                         // expert-neutral, e.g. "3 required flags remain"
  shortcut?: { keys: string; action: string }; // e.g. { keys: "Ctrl+Space", action: "review" }
  dismissible?: boolean;                    // default true
  variant?: 'rich' | 'plain';
  onDismiss: () => void;                    // hide this instance
  onDisableAll?: () => void;                // persistent setting (AC-4.3)
}
```
- Variants: `rich` (accent glyph + copy + kbd chips + dismiss), `plain` (plain text, no chips).
- Never renders when hints are globally disabled or when `message` is empty.

### States
| State | Visual |
|-------|--------|
| Shown | leading `⌁` accent (`--color-hint-line-accent`), neutral copy (`--color-hint-line-text`), `kbd` chips, `✕ hide` |
| Hovered/focused dismiss | dismiss target shows `--color-focus-ring` |
| Dismissing | fade out via `--motion-transition-fade` |
| Disabled (global) | not rendered |

### Accessibility
- **ARIA:** wrapper `role="note"` `aria-label="Cirrus hint"`; content in an `aria-live="polite"`
  region so a new hint is announced without stealing focus. `kbd` chips use `<kbd>` semantics.
- **Dismiss:** `✕ hide` is a real `<button>` with `aria-label="Hide hint"`; a secondary
  "Don't show hints" control exposes `onDisableAll` (documented persistent setting).
- **Keyboard:** dismiss button is Tab-focusable with visible focus ring; `Esc` also dismisses;
  the referenced shortcut is documented in the copy, not a hidden binding.
- **Copy rule:** must be expert-neutral and factual — reviewers reject any "beginner/tip/learn
  the basics" phrasing (NG5).
- **Contrast:** `--color-hint-line-text` intentionally quiet but verified ≥ 4.5:1;
  `kbd` chip text on chip bg verified.

### Token dependencies
`--color-hint-line-text`, `--color-hint-line-accent`, `--color-hint-line-key-bg`,
`--color-hint-line-key-text`, `--color-hint-line-dismiss`, `--color-focus-ring`,
`--font-family-ui`, `--font-size-xs`, `--line-height-relaxed`, `--spacing-xs`,
`--spacing-2xs`, `--border-radius-sm`, `--motion-transition-fade`.

---

## 5. `SuggestionItem`

### Purpose
The shared row primitive used by `ParameterPalette` and `ResourceLookupList` (and the plain
variant of both). One consistent row model for flags, enum values, and resources — with
selection, match highlighting, requirement/freshness signalling.

### Props / Variants
```ts
interface SuggestionItemProps {
  kind: 'flag' | 'enum-value' | 'resource';
  label: string;
  matchRanges?: [number, number][];        // char ranges to highlight (fuzzy match)
  secondary?: string;                       // description | region | meta
  typeHint?: string;                        // "<enum>" | "<string>" | "<lookup>"
  requirement?: 'required' | 'optional';    // flags
  status?: 'valid' | 'deprecated';          // enum values
  freshness?: 'cached' | 'live';            // resources
  selected: boolean;
  variant?: 'rich' | 'plain';
  onSelect: () => void;
}
```
- Variants: `rich` (full row), `plain` (text token only, used in comma-joined F-1 output).

### States
| State | Visual |
|-------|--------|
| Idle | `--color-suggestion-idle-text` on transparent bg |
| Selected | `--color-suggestion-active-bg`, `--color-suggestion-active-text`, left `--color-suggestion-active-border` |
| Match highlight | matched chars in `--color-suggestion-match` (+ subtle weight), never color-alone (also weight) |
| Required (flag) | `*` glyph + `--color-param-required` label text |
| Deprecated (enum) | `--color-enum-deprecated` + "deprecated" tag |
| Freshness (resource) | `live ●` / `cached ⚡` badge (color + text + glyph) |

### Accessibility
- **ARIA:** `role="option"`, `aria-selected`, and an `aria-label` that folds in every
  non-color signal (e.g. "Standard, valid" / "--sku, required" / "rg-staging-westus2,
  westus2, live"). Match highlight is decorative (`aria-hidden` spans) — the label is the
  full plain string.
- **Never color-alone:** requirement, deprecation, freshness, and match are all carried in
  text/glyph/weight in addition to color.
- **Keyboard:** not individually focusable (roving via parent `aria-activedescendant`);
  `onSelect` fires on `Tab`/click when active.
- **Contrast:** every text/badge/surface pair ≥ 4.5:1 across all three themes.

### Token dependencies
`--color-suggestion-idle-text`, `--color-suggestion-idle-bg`,
`--color-suggestion-active-bg/-text/-border`, `--color-suggestion-match`,
`--color-param-flag`, `--color-param-required`, `--color-param-optional`,
`--color-param-type`, `--color-enum-valid`, `--color-enum-deprecated`,
`--color-resource-name`, `--color-resource-meta`, `--color-resource-cached`,
`--color-resource-live`, `--spacing-2xs`, `--spacing-sm`, `--border-radius-sm`,
`--font-family-mono`, `--font-size-sm/-xs/-2xs`, `--font-weight-medium/-semibold`,
`--line-height-snug`.

---

## Composition Notes for the Prototyper

- **Overlay host:** a single positioned container anchors under the caret line and holds at
  most one of `ParameterPalette` / `ResourceLookupList`, plus optionally `HintLine` and the
  inline `GhostTextCompletion`. Never cover the command line (see wireframe cross-state rules).
- **Capability gate:** one `useCapability()` hook resolves `variant`; pass it down so every
  component degrades in lockstep (rich → plain → suppressed).
- **Non-statefulness:** components are pure/presentational; all data (predictions, params,
  resources, freshness) arrives via props from the intelligence core. No component owns
  persistent mode state — there is no mode (NG1).
- **Keyboard ownership:** centralise the shared key contract in the overlay host; child
  components expose intent callbacks only, so `Enter`/`Ctrl+C`/tmux prefixes are never trapped.

## Next Steps

- Prototyper: implement as React + TS + CSS Modules, importing `tokens.css`; run the Token
  Validator to confirm zero hardcoded literals.
- Build a Storybook/state matrix per component covering every state row above × 3 themes ×
  {reduced-motion on/off} for the accessibility pass.
- Verify `aria-activedescendant` non-modal pattern with a screen reader (NVDA/VoiceOver) to
  confirm no focus trap (NG2, NFR-2).
- Feed measured render timings back to tune `--motion-duration-fast` against the p95 ≤ 100 ms
  inline budget (FR-7 / NFR-1).
