---
title: "Component Spec: Version Timeline"
phase: design
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Designer Agent"
related:
  - "../../ideation/solution-concepts.md"
---

# Component Spec: Version Timeline

## Overview

A horizontal timeline strip showing the last 3–5 deployment versions. Users click any two version dots to compare them side-by-side. A context menu on each dot provides a rollback action. A search bar allows filtering versions by date, author, or change description.

## Anatomy

1. **Timeline bar** — horizontal track connecting all version dots
2. **Version dots** — circular indicators positioned along the bar, one per version
3. **Connector** — highlighted segment between two selected version dots
4. **Tooltip** — popover on hover/focus showing date, change summary, and author
5. **Search bar** — input above the timeline for filtering versions

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `versions` | `Version[]` | — | Array of version objects (`{ id, label, date, author, changes }`) |
| `selectedVersions` | `[string, string]` | — | Tuple of two selected version IDs for comparison |
| `onVersionSelect` | `(versionId: string) => void` | — | Callback when a version dot is clicked |
| `onRollback` | `(versionId: string) => Promise<void>` | — | Callback triggered from the rollback context menu action |
| `maxVersions` | `number` | `5` | Maximum number of versions displayed on the timeline |
| `searchQuery` | `string` | `""` | Current search/filter query |
| `onSearch` | `(query: string) => void` | — | Callback when the search input changes |

## States

| State | Description |
|-------|-------------|
| **Default** | The latest two versions are selected; connector shown between them |
| **Selecting** | User has clicked one dot; waiting for second selection; pulsing animation on the selected dot |
| **Comparing** | Two dots selected; connector highlighted; diff view triggered externally |
| **Rolling back** | Confirmation dialog open; spinner on the target dot after confirmation |
| **Empty** | No versions available; placeholder message displayed |

## Design Tokens

| Element | Token | Purpose |
|---------|-------|---------|
| Timeline bar | `--color-neutral-200` | Background track color |
| Active version dot | `--color-primary-500` | Fill color for selected dots |
| Active dot elevation | `--elevation-1` | Subtle shadow lift on selected dots |
| Inactive version dot | `--color-neutral-300` | Fill color for unselected dots |
| Connector segment | `--color-primary-300` | Highlighted bar between selected versions |
| Tooltip | `--elevation-3` | Shadow depth for the tooltip popover |

## Accessibility

- The timeline has `role="listbox"` with each version dot as `role="option"`.
- **Arrow keys** (Left/Right) navigate between version dots.
- **Enter** or **Space** toggles selection of the focused dot.
- The rollback action opens an `alertdialog` with a confirmation prompt, requiring explicit user action before proceeding.
- Tooltips are accessible via focus (not hover-only) and use `role="tooltip"` with `aria-describedby`.
- Selected dots convey state via `aria-selected="true"`.
- All color combinations meet WCAG 2.1 AA contrast ratios.

## Requirements Traceability

- **REQ-008** — Version history browsing
- **REQ-009** — Version comparison and rollback
