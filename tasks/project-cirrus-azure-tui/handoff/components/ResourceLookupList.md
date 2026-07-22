---
title: "ResourceLookupList"
phase: deliver
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Handoff Agent"
related:
  - "prototypes/src/components/ResourceLookupList/ResourceLookupList.tsx"
  - "designs/component-specs.md"
  - "designs/wireframe-spec.md"
  - "tests/accessibility-audit.md"
  - "strategy/requirements-prd.md"
---

# ResourceLookupList

> Async, cached-first live resource lookup for resource-identifying parameters — e.g.
> `--resource-group`, resource names — completed from the user's live subscription (wireframe
> **State C**, FR-3 / concepts C9·C10). Cached rows are **usable while live results stream in**;
> the component never blocks the keystroke path and never steals selection. `Esc` collapses to
> free text. ARIA `listbox`; `aria-busy` while loading.

## Overview

- **Maps to:** FR-3 (dynamic resource lookup), concepts C9/C10; NFR-1 (async, ≤ 500 ms
  time-box before graceful free-text fallback).
- **Rendered in states:** C (rich), F-1 (plain — advisory line). Also renders the
  `timeout` / `unauthenticated` / `empty` free-text fallbacks (AC-3.3).
- **Composition:** renders `SuggestionItem` rows; selection owned by `OverlayHost`.
- **⚠ Data is mocked in the prototype.** `status`, `items`, and the ≤ 500 ms timeout are
  simulated. Wiring to a live Azure source (see the implementation guide) is a Deliver-stage
  open item.

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `id` | `string` | — | Yes | Stable id for `aria-controls` / `aria-activedescendant` on the command input. Rows get `${id}-opt-${slug(name)}`. |
| `resourceType` | `string` | — | Yes | e.g. `"resource groups"`. Shown in header + `aria-label`. |
| `subscriptionLabel` | `string` | — | Yes | Current subscription label (reuses the CLI's auth context; AC-3.2). |
| `status` | `ResourceStatus` | — | Yes | `'loading' \| 'resolved' \| 'timeout' \| 'unauthenticated' \| 'empty'`. Drives header badge, `aria-busy`, and fallback lines. |
| `items` | `ResourceItem[]` | — | Yes | Resource rows; each carries `freshness: 'cached' \| 'live'`. |
| `activeIndex` | `number` | — | Yes | Selected row index (post-filter). |
| `filterText` | `string` | — | No | Filters live and highlights match ranges. |
| `variant` | `'rich' \| 'plain'` | `'rich'` | No | `plain` ⇒ single advisory line, no selection (State F-1). |
| `onSelect` | `(item: ResourceItem) => void` | — | Yes | `Tab` / click accepts the selected resource. |
| `onDismiss` | `() => void` | — | Yes | `Esc` collapses to free text. Key handling lives in `OverlayHost`. |
| `onActiveIndexChange` | `(i: number) => void` | — | Yes | Reports selection-index changes to the host. |

### Supporting types

```ts
interface ResourceItem {
  name: string;
  meta?: string;                 // region / sub id, etc.
  freshness: 'cached' | 'live';
}
type ResourceStatus =
  | 'loading' | 'resolved' | 'timeout' | 'unauthenticated' | 'empty';
```

## Variants

### Rich
Header (`{resourceType} · sub: {subscriptionLabel}` + status badge), optional loading shimmer
row, ARIA `listbox` of `SuggestionItem` rows, status-specific fallback line, and a footer
legend/count. A polite live region announces status changes.

### Plain
One line: `cirrus: {resourceType} in {sub}: a, b, c (type value; Tab unavailable)`. No
selection model (State F-1).

## States

| State (`status`) | Description | Visual Changes |
|------------------|-------------|----------------|
| `loading` | Cached rows shown; live results streaming | Shimmer row (`aria-hidden`), `aria-busy="true"`, `looking up…` badge, `… refreshing from subscription` note |
| `resolved` | Live results merged in | `● live` badge; live region: `N resources loaded` |
| `timeout` | Live lookup exceeded ≤ 500 ms | `cached only` badge; fallback: `showing cached · live lookup timed out — type any value`; live region announces timeout |
| `unauthenticated` | No sign-in context | Fallback: `sign-in context unavailable — type any value (free text)` |
| `empty` | No resources found | Fallback: `no {resourceType} found — type a new name` |
| Filtered | `filterText` set | Rows filtered; footer shows `N of M match "text"` |
| Plain | `variant='plain'` | Single advisory line |

## Design Tokens

| Token | Usage |
|-------|-------|
| `--color-surface-overlay` | List background |
| `--color-border-subtle` | Borders |
| `--color-resource-loading` / `--color-resource-loading-track` | Shimmer accent + track |
| `--color-resource-live` | `live` badge |
| `--color-param-flag` | Header emphasis |
| `--color-resource-meta` | Meta text |
| `--color-text-secondary` / `--color-text-muted` | Header / footer |
| `--color-validation-fallback-text` | Free-text fallback lines |
| `--elevation-2` | List shadow depth |
| `--border-radius-md` / `--border-radius-sm` | Corners / shimmer |
| `--font-family-mono`, `--font-size-sm/-xs/-2xs` | Type scale |
| `--font-weight-semibold` / `--font-weight-medium` | Emphasis |
| `--line-height-normal` | Row height |
| `--spacing-2xs` / `--spacing-sm` | Padding |
| `--motion-duration-slow` + `--motion-easing-standard` | List expand / shimmer (zeroed under reduced motion; shimmer becomes a static track) |

## Accessibility

### ARIA
- The `<ul>` is `role="listbox"` with `id`, `aria-label="{resourceType} in {sub}"`,
  `aria-busy={isLoading}`, and `aria-activedescendant`.
- Each row is a `SuggestionItem` `role="option"`; freshness is folded into its `aria-label`.
- A visually-hidden `aria-live="polite"` region announces resolved/timeout/unauth/empty status
  in words — **status is never colour-only**.
- The loading shimmer row is `aria-hidden="true"` (decorative).

### Keyboard
Handled centrally by `OverlayHost` while the overlay is open:

| Key | Action |
|-----|--------|
| `↑` / `↓` | Move selection |
| `Tab` | Accept selected resource (`onSelect`), close |
| `Esc` | Collapse to free text (single `Esc`) |
| `Enter` / `Ctrl+C` / `Ctrl+L` / tmux prefix | Never intercepted |

Cached rows remain fully selectable while live results stream — the user is never blocked
(C9/C10, NFR-1, AC-7.1).

### Focus
Focus stays on the command input; rows are not tab stops (roving selection).

### Contrast
Idle rows, badges, and fallback text pass AA per theme. Selected-row children inherit the
A11Y-1/-2 fixes via `SuggestionItem`.

## Usage Examples

```tsx
import { ResourceLookupList } from 'cirrus-prototype';
import type { ResourceItem } from 'cirrus-prototype';

const items: ResourceItem[] = [
  { name: 'rg-prod-eastus', meta: 'East US', freshness: 'cached' },
  { name: 'rg-staging',     meta: 'West US 2', freshness: 'live' },
];

<ResourceLookupList
  id="cirrus-resource"
  resourceType="resource groups"
  subscriptionLabel="Contoso-Prod"
  status="loading"
  items={items}
  activeIndex={activeIndex}
  filterText={filter}
  variant="rich"
  onSelect={(r) => insertAtCaret(r.name)}
  onDismiss={() => collapseToFreeText()}
  onActiveIndexChange={setActiveIndex}
/>
```

## Related Components

- `SuggestionItem` — shared resource row.
- `OverlayHost` — owns keyboard contract, `activeIndex`, focusable combobox.
- `ParameterPalette` — sibling overlay (mutually exclusive).

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-07-13 | Initial developer API spec | Handoff Agent |
