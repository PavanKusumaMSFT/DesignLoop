---
title: "Component Spec: Mode Switcher"
phase: design
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Designer Agent"
related:
  - "../../ideation/solution-concepts.md"
---

# Mode Switcher

> A segmented control in the Azure Copilot header that lets users explicitly switch between Ask, Plan, and Agent interaction modes — matching VS Code's Ask/Edit/Agent pattern. Provides persistent visual feedback of the active mode and supports contextual nudges when deployment intent is detected.

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `mode` | `'ask' \| 'plan' \| 'agent'` | `'ask'` | Yes | The currently active interaction mode |
| `activeAgent` | `string \| undefined` | `undefined` | No | Name of the active agent when in Agent mode (e.g., `"Deploy"`) |
| `onModeChange` | `(mode: 'ask' \| 'plan' \| 'agent') => void` | — | Yes | Callback fired when the user switches modes |
| `disabled` | `boolean` | `false` | No | Disables all mode switching |
| `disabledModes` | `('ask' \| 'plan' \| 'agent')[]` | `[]` | No | Selectively disables specific modes |
| `className` | `string` | — | No | Additional CSS classes |

## Anatomy

```
┌─────────────────────────────────────────────────┐
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │   Ask    │  │   Plan   │  │    Agent     │  │
│  │          │  │          │  │  @deploy ▾   │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
│  Container Bar                                   │
└─────────────────────────────────────────────────┘
```

| Element | Description |
|---------|-------------|
| **Container Bar** | Horizontal bar housing all three segments. Uses `--border-radius-md` and `--elevation-1`. |
| **Segment** | Individual clickable tab for each mode. Shows mode label text. |
| **Active Indicator** | Filled background (`--color-primary-500`) on the active segment with contrasting text (`--color-neutral-50`). |
| **Agent Sub-label** | Optional secondary text line below the "Agent" label showing the active agent name (e.g., `@deploy`) and a dropdown chevron. |

## Variants

### Default

Standard three-segment control with Ask active by default. All modes are available and interactive.

### Restricted

One or more modes are disabled (grayed out, non-interactive). Used when certain modes are unavailable in the current context — e.g., Agent mode disabled when no agents are configured for the active subscription.

### Agent-Active

When Agent mode is selected and an `activeAgent` is set, the Agent segment expands slightly to show the agent name as a sub-label with a dropdown chevron. Clicking the chevron opens an agent selection dropdown.

## States

| State | Description | Visual Changes |
|-------|-------------|----------------|
| Default | Resting state; one segment is active | Active segment: `--color-primary-500` bg, `--color-neutral-50` text. Inactive segments: `--color-neutral-100` bg, `--color-neutral-700` text. |
| Hover | Mouse over an inactive segment | Background transitions to `--color-neutral-200` with `--motion-duration-fast` |
| Active | Segment is the current mode | Filled background `--color-primary-500`, bold text `--color-neutral-50` |
| Focus | Keyboard focus on a segment | Focus ring using `--color-primary-500` outline, `2px` offset. Uses `:focus-visible` only. |
| Disabled | Segment or entire control is non-interactive | Opacity 0.4, `cursor: not-allowed`. `aria-disabled="true"` on disabled segments. |
| Transition | Animated shift between modes | Active indicator slides to the new segment using `--motion-duration-fast`. Brief scale pulse on the newly active segment. |

## Behavior

| Interaction | Behavior |
|-------------|----------|
| **Click segment** | Switches the active mode immediately and fires `onModeChange`. |
| **"@deploy" in Ask mode** | When the user types a deployment-related keyword (e.g., `@deploy`) in Ask mode, a subtle inline nudge appears below the switcher: _"Switch to Agent mode for deployment workflows?"_ with a one-click action. |
| **Arrow key navigation** | Left/Right arrows move focus between segments. Focus wraps around (first ↔ last). |
| **Enter / Space** | Activates the focused segment. |
| **Home / End** | Moves focus to the first / last segment. |
| **Mode persistence** | The selected mode persists across the session. On session start, defaults to Ask. |
| **Agent dropdown** | In Agent-Active variant, clicking the chevron opens a dropdown listing available agents. Selecting an agent updates `activeAgent`. |

## Design Tokens

| Token | Usage |
|-------|-------|
| `--color-primary-500` | Active segment background; focus ring color |
| `--color-neutral-50` | Active segment text color |
| `--color-neutral-100` | Inactive segment background |
| `--color-neutral-200` | Hover background for inactive segments |
| `--color-neutral-700` | Inactive segment text color |
| `--border-radius-md` | Container and segment corner radius |
| `--elevation-1` | Container box shadow |
| `--motion-duration-fast` | Hover and active indicator transition duration |
| `--font-size-sm` | Segment label text size |
| `--font-size-xs` | Agent sub-label text size |
| `--font-weight-medium` | Active segment label weight |
| `--spacing-sm` | Internal padding within segments |
| `--spacing-xs` | Gap between label and sub-label |

## Accessibility

### ARIA

| Attribute | Element | Value |
|-----------|---------|-------|
| `role` | Container | `tablist` |
| `role` | Each segment | `tab` |
| `aria-selected` | Active segment | `true` |
| `aria-selected` | Inactive segments | `false` |
| `aria-disabled` | Disabled segments | `true` |
| `aria-label` | Container | `"Interaction mode"` |

### Keyboard

| Key | Action |
|-----|--------|
| `Left Arrow` | Move focus to the previous segment (wraps to last) |
| `Right Arrow` | Move focus to the next segment (wraps to first) |
| `Home` | Move focus to the first segment |
| `End` | Move focus to the last segment |
| `Enter` | Activate the focused segment |
| `Space` | Activate the focused segment |
| `Tab` | Move focus into / out of the segmented control |

### Screen Reader

- Announces: _"{Mode} tab, {position} of 3"_ (e.g., "Ask tab, 1 of 3")
- When selected: _"{Mode} tab, selected, {position} of 3"_
- When disabled: _"{Mode} tab, dimmed"_
- Agent sub-label is announced as part of the tab name: _"Agent, @deploy, tab, 3 of 3"_

### Focus Management

- Only `:focus-visible` styles are applied (no focus ring on mouse click)
- Focus ring: `2px solid var(--color-primary-500)`, `2px` offset
- Minimum touch target size: 44×44px per segment

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| ≥ 480px | Full text labels ("Ask", "Plan", "Agent") with optional sub-label |
| < 480px | Icon-only segments. Labels are visually hidden but remain accessible via `aria-label`. Tooltip on hover/long-press shows the mode name. |

## Requirement Traceability

| Requirement | Coverage |
|-------------|----------|
| REQ-001 | Agent mode provides `@` mention invocation pattern |
| REQ-002 | Persistent visual indicator differentiates Ask, Plan, and Agent modes |
| REQ-014 | Nudge toward Agent mode on deployment intent detection |

## Usage Examples

```tsx
import { ModeSwitcher } from '@/components/ModeSwitcher';

// Default — Ask mode active
<ModeSwitcher
  mode="ask"
  onModeChange={(mode) => setMode(mode)}
/>

// Agent mode with active agent
<ModeSwitcher
  mode="agent"
  activeAgent="Deploy"
  onModeChange={(mode) => setMode(mode)}
/>

// Restricted — Agent mode disabled
<ModeSwitcher
  mode="ask"
  disabledModes={['agent']}
  onModeChange={(mode) => setMode(mode)}
/>
```
