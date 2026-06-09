---
title: "Implementation Guide — Deployment Agent UX Enhancements"
phase: deliver
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Handoff Agent"
related:
  - "../designs/wireframes/deployment-agent-overview.md"
  - "../strategy/requirements-prd.md"
---

# Implementation Guide — Deployment Agent UX Enhancements

## Executive Summary

This guide covers the engineering implementation of five React components that deliver the P0 and P1 requirements identified during user research for the Azure Deployment Agent. These components — ModeSwitcher, DeployGate, CostBadge, ClickToEdit, and VersionTimeline — address critical gaps in the Copilot-assisted deployment workflow: mode transparency, pre-deployment validation, cost visibility, inline parameter editing, and version management. Each component has been prototyped, tested against accessibility standards, and is ready for production integration.

## Architecture Overview

All five components are designed to integrate into the existing Azure Copilot chat panel architecture:

```
┌─────────────────────────────────────────────┐
│  Copilot Chat Panel                         │
│  ┌───────────────────────────────────────┐  │
│  │  ModeSwitcher (header bar)            │  │
│  │  [Ask] [Plan] [Agent▼]               │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  ┌─ Chat Message Stream ─────────────────┐  │
│  │                                       │  │
│  │  Agent response with:                 │  │
│  │  ┌─────────────┐ ┌─────────────┐     │  │
│  │  │ CostBadge   │ │ ClickToEdit │     │  │
│  │  └─────────────┘ └─────────────┘     │  │
│  │                                       │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │ VersionTimeline                 │  │  │
│  │  └─────────────────────────────────┘  │  │
│  │                                       │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │  DeployGate (pre-deploy modal/panel) │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

- **State management**: Components consume and dispatch to the Copilot session state. ModeSwitcher controls the global mode; other components are rendered within agent response messages.
- **Styling**: All components use CSS Modules with design tokens defined as CSS custom properties. No hardcoded values.
- **Data flow**: Components receive data via props from the Copilot orchestrator. Backend calls are handled by parent containers, not by the components themselves.

## Implementation Priority

### Priority 0 — Must Ship

#### 1. ModeSwitcher

| Attribute | Detail |
|-----------|--------|
| **Requirements** | REQ-001, REQ-002 |
| **Rationale** | Unblocks all other components; users need mode awareness before interacting with agent features |
| **Prototype** | `prototypes/components/ModeSwitcher/ModeSwitcher.tsx` |
| **Design Spec** | `designs/components/mode-switcher.md` |
| **Stylesheet** | `prototypes/components/ModeSwitcher/ModeSwitcher.module.css` |
| **Stories** | `prototypes/components/ModeSwitcher/ModeSwitcher.stories.tsx` |

**Props Interface Summary**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `mode` | `'ask' \| 'plan' \| 'agent'` | Yes | Currently active mode |
| `activeAgent` | `string` | No | Name of the active agent (shown in Agent mode) |
| `onModeChange` | `(mode) => void` | Yes | Callback when user selects a mode |
| `disabled` | `boolean` | No | Disables all mode buttons |

**Key Implementation Notes**

- The segmented control must render in the Copilot header bar, outside the chat scroll area.
- When `mode` is `'agent'` and `activeAgent` is provided, display the agent name as a sub-label beneath the Agent tab.
- Disable mode switching while a deployment operation is in progress (pass `disabled={true}`).
- Animate the active indicator sliding between tabs using `--motion-duration-fast` and `--motion-easing-standard`.

**API Dependencies**

- Copilot session API: read/write current mode state.
- No external Azure service dependencies.

**Accessibility Requirements**

- ARIA: `role="tablist"` on container, `role="tab"` on each button, `aria-selected` on active tab.
- Keyboard: Left/Right arrows to move focus, Enter/Space to activate, Home/End to jump to first/last tab.
- Focus ring must use `--color-focus-ring` token.

**Design Token Dependencies**

- `--color-primary-500` — active tab indicator and text
- `--color-neutral-100` — inactive tab background
- `--color-neutral-700` — inactive tab text
- `--border-radius-md` — tab pill shape
- `--spacing-xs`, `--spacing-sm` — internal padding
- `--motion-duration-fast`, `--motion-easing-standard` — slide animation
- `--color-focus-ring` — keyboard focus indicator

---

#### 2. DeployGate

| Attribute | Detail |
|-----------|--------|
| **Requirements** | REQ-003 |
| **Rationale** | Production safety; prevents unreviewed deployments |
| **Prototype** | `prototypes/components/DeployGate/DeployGate.tsx` |
| **Design Spec** | `designs/components/deploy-gate.md` |
| **Stylesheet** | `prototypes/components/DeployGate/DeployGate.module.css` |
| **Stories** | `prototypes/components/DeployGate/DeployGate.stories.tsx` |

**Props Interface Summary**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `resources` | `Array<{ name, type, status }>` | Yes | Resources being deployed |
| `validationResults` | `Array<{ name, status, message? }>` | Yes | Validation check results |
| `costSummary` | `{ total, delta, currency, drivers }` | Yes | Aggregated cost information |
| `environment` | `'production' \| 'staging' \| 'development' \| 'test'` | Yes | Target environment |
| `onDeploy` | `() => void` | Yes | Deploy confirmation callback |
| `onCancel` | `() => void` | Yes | Cancel callback |
| `onSaveAsPR` | `() => void` | No | Save as pull request callback |

**Key Implementation Notes**

- The panel has 5 sections displayed in order: Resource Summary, Validation Results, Cost Summary, Environment Confirmation, and Action Buttons.
- The Deploy button must be disabled if any validation result has `status: 'fail'`.
- For production environments, require an explicit confirmation checkbox before enabling Deploy.
- Cost delta should render in green (decrease) or red (increase) with appropriate ARIA labels for screen readers.
- The "Save as PR" action is only available when the Copilot session is connected to a repository context.

**API Dependencies**

- **Validation Service**: ARM template validation API (`/providers/Microsoft.Resources/deployments/validate`).
- **Azure Pricing API**: Cost estimation for resources in the deployment.
- **Azure Resource Manager**: Resource diff (added/modified/removed).

**Accessibility Requirements**

- Each section should be a landmark region with `aria-label`.
- Validation failures must be announced via `aria-live="polite"`.
- Deploy button: `aria-disabled` when validation fails, with tooltip explaining why.
- Color-coded status indicators must have text alternatives (not color-only).

**Design Token Dependencies**

- `--color-success-500`, `--color-error-500`, `--color-warning-500` — status indicators
- `--color-primary-500` — Deploy button
- `--color-neutral-200` — section dividers
- `--spacing-md`, `--spacing-lg` — section padding
- `--border-radius-lg` — panel corners
- `--elevation-md` — panel shadow

---

### Priority 1 — Ship Next

#### 3. CostBadge + Cost Delta

| Attribute | Detail |
|-----------|--------|
| **Requirements** | REQ-004, REQ-005 |
| **Rationale** | Cost transparency was the #1 user-reported gap in research |
| **Prototype** | `prototypes/components/CostBadge/CostBadge.tsx` |
| **Design Spec** | `designs/components/cost-annotation.md` |
| **Stylesheet** | `prototypes/components/CostBadge/CostBadge.module.css` |
| **Stories** | `prototypes/components/CostBadge/CostBadge.stories.tsx` |

**Props Interface Summary**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `cost` | `number` | Yes | Cost value to display |
| `currency` | `string` | No | Currency code (default: `'USD'`) |
| `timeHorizon` | `'hourly' \| 'monthly' \| 'annual'` | No | Time period for cost |
| `resourceName` | `string` | Yes | Associated resource name |
| `alternatives` | `Array<{ sku, vcpus, ram, cost, performance }>` | No | SKU alternatives for panel |
| `onAlternativeSelect` | `(sku: string) => void` | No | Callback when user picks an alternative |
| `status` | `'normal' \| 'warning' \| 'critical'` | No | Visual severity of cost |

**Key Implementation Notes**

- Badge renders inline within agent response text, not as a block element.
- Clicking the badge opens a flyout panel showing SKU alternatives (if provided).
- Format costs using `Intl.NumberFormat` with the provided currency code.
- `status: 'critical'` should render with `--color-error-500` background and include a warning icon.
- The alternatives panel should sort by cost ascending by default with a performance comparison bar.
- Debounce rapid alternative selections to avoid excessive API calls.

**API Dependencies**

- **Azure Pricing API** (`/api/retail/prices`): Fetch SKU-level pricing.
- **Azure Advisor API**: Cost optimization recommendations for alternative SKUs.

**Accessibility Requirements**

- Badge: `role="status"`, `aria-label` describing cost and resource.
- Alternatives panel: `role="dialog"`, `aria-modal="true"`, focus trap when open.
- Alternative list: `role="listbox"` with `role="option"` items, arrow key navigation.
- Cost values must be read as currency by screen readers (e.g., "24 dollars per month").

**Design Token Dependencies**

- `--color-success-500`, `--color-warning-500`, `--color-error-500` — status thresholds
- `--color-neutral-50` — badge background (normal)
- `--spacing-xs`, `--spacing-sm` — badge padding
- `--font-size-sm` — badge text
- `--border-radius-sm` — badge shape
- `--elevation-lg` — alternatives panel shadow

---

#### 4. ClickToEdit

| Attribute | Detail |
|-----------|--------|
| **Requirements** | REQ-007 |
| **Rationale** | Reduces friction for parameter modifications within agent responses |
| **Prototype** | `prototypes/components/ClickToEdit/ClickToEdit.tsx` |
| **Design Spec** | `designs/components/click-to-edit.md` |
| **Stylesheet** | `prototypes/components/ClickToEdit/ClickToEdit.module.css` |
| **Stories** | `prototypes/components/ClickToEdit/ClickToEdit.stories.tsx` |

**Props Interface Summary**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string \| number` | Yes | Current field value |
| `type` | `'text' \| 'number' \| 'select'` | No | Input type (default: `'text'`) |
| `options` | `string[]` | No | Options list for `type="select"` |
| `onSave` | `(newValue: string \| number) => void` | Yes | Callback on confirmed edit |
| `label` | `string` | Yes | Accessible label for the field |
| `impactPreview` | `string` | No | Preview text showing impact of change |
| `readOnly` | `boolean` | No | Disables editing |

**Key Implementation Notes**

- Display mode shows the value as styled text with a subtle edit affordance (pencil icon on hover).
- Clicking transitions to an inline input; pressing Escape reverts, Enter/blur saves.
- For `type="select"`, render a dropdown instead of a text input.
- `impactPreview` should appear as a tooltip or inline hint below the field while editing (e.g., "Changing region will affect latency by ~20ms").
- Validate numeric inputs client-side before calling `onSave`.
- Guard against XSS: sanitize values before rendering in display mode.

**API Dependencies**

- No direct API dependencies. The parent component is responsible for dispatching changes to the deployment template and refreshing cost/validation data.

**Accessibility Requirements**

- Display mode: `role="button"`, `aria-label` including current value and "click to edit".
- Edit mode: native `<input>` or `<select>` with `aria-label` from `label` prop.
- Announce mode transitions with `aria-live="assertive"`.
- Keyboard: Enter to activate edit mode, Escape to cancel, Tab to save and move focus.

**Design Token Dependencies**

- `--color-primary-500` — edit affordance icon
- `--color-neutral-100` — input background
- `--color-neutral-800` — display text
- `--border-radius-sm` — input border radius
- `--spacing-xs` — inline padding
- `--font-size-md` — value text size

---

#### 5. VersionTimeline

| Attribute | Detail |
|-----------|--------|
| **Requirements** | REQ-008, REQ-009 |
| **Rationale** | Enables comparison and rollback for deployment versions |
| **Prototype** | `prototypes/components/VersionTimeline/VersionTimeline.tsx` |
| **Design Spec** | `designs/components/version-timeline.md` |
| **Stylesheet** | `prototypes/components/VersionTimeline/VersionTimeline.module.css` |
| **Stories** | `prototypes/components/VersionTimeline/VersionTimeline.stories.tsx` |

**Props Interface Summary**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `versions` | `Array<{ id, label, date, changeCount, author }>` | Yes | Version history entries |
| `selectedVersions` | `[string, string]` | Yes | Tuple of two selected version IDs for comparison |
| `onVersionSelect` | `(selected: [string, string]) => void` | Yes | Callback when selection changes |
| `onRollback` | `(versionId: string) => void` | No | Callback to trigger rollback |
| `searchQuery` | `string` | No | Filter versions by search text |
| `onSearch` | `(query: string) => void` | No | Search input callback |

**Key Implementation Notes**

- Renders as a horizontal scrollable timeline with version nodes.
- Two-version selection model: users pick exactly two versions to compare (diff view).
- The rollback action must show a confirmation dialog before invoking `onRollback`.
- For long version histories (>20 entries), implement virtual scrolling or pagination.
- The search feature filters versions by label, author, or date.
- Highlight the diff between the two selected versions using color-coded indicators (green = added, red = removed, yellow = modified).

**API Dependencies**

- **Deployment History API** (`/providers/Microsoft.Resources/deployments`): Fetch deployment version history.
- **Template Diff Service**: Compare two deployment templates to generate change summaries.

**Accessibility Requirements**

- Timeline: `role="listbox"` with `aria-multiselectable="true"`, `role="option"` on each version node.
- Keyboard: Arrow keys to navigate versions, Space to toggle selection, Enter to open version detail.
- Rollback confirmation dialog: focus trap, `role="alertdialog"`.
- Announce selection changes and diff summary via `aria-live`.

**Design Token Dependencies**

- `--color-primary-500` — selected version node
- `--color-neutral-300` — timeline track
- `--color-success-500`, `--color-error-500`, `--color-warning-500` — diff indicators
- `--spacing-md`, `--spacing-lg` — node spacing
- `--border-radius-full` — version node dots
- `--font-size-sm` — version labels

---

## Integration Points

### ModeSwitcher ↔ Copilot Mode System

- ModeSwitcher reads the current mode from the Copilot session context.
- `onModeChange` dispatches a mode change event to the Copilot orchestrator.
- When switching to Agent mode, the orchestrator must resolve the `activeAgent` name from the session and pass it as a prop.
- Mode changes should cancel any in-flight operations in the previous mode.

### CostBadge ↔ Azure Pricing

- The parent container calls the Azure Retail Pricing API and passes resolved cost data as props.
- CostBadge does not fetch pricing data directly — it is a presentational component.
- The alternatives list is populated by querying the Pricing API for the same resource type in the same region with different SKUs.
- Cost refresh should occur when ClickToEdit changes affect cost-impacting parameters (e.g., SKU, region, instance count).

### DeployGate ↔ Validation APIs

- Before rendering DeployGate, the parent container runs ARM template validation and passes results via `validationResults`.
- The parent also calls the Pricing API and passes the aggregated `costSummary`.
- `onDeploy` triggers the actual ARM deployment via the Copilot backend — DeployGate does not call ARM directly.
- `onSaveAsPR` creates a pull request with the Bicep/ARM template through the repository integration.

### VersionTimeline ↔ Deployment History

- The parent fetches deployment history from the ARM Deployments API and maps it to the `versions` prop shape.
- Template diff is performed server-side; the parent passes pre-computed `changeCount` per version.
- `onRollback` triggers a re-deployment of the selected version's template through the Copilot backend.

## Testing Requirements

### Unit Tests

| Component | Min. Coverage | Key Test Cases |
|-----------|--------------|----------------|
| ModeSwitcher | 95% | Mode changes, disabled state, keyboard navigation, ARIA attributes |
| DeployGate | 90% | Validation gating, production confirmation, all 5 sections render, disabled deploy on failure |
| CostBadge | 90% | Currency formatting, status thresholds, alternatives panel open/close, alternative selection |
| ClickToEdit | 95% | Mode transitions (display→edit→display), save/cancel, XSS sanitization, select dropdown |
| VersionTimeline | 90% | Two-version selection, rollback confirmation, search filtering, keyboard navigation |

### Accessibility Tests

- Run **axe-core** on every component in all states (default, hover, focus, active, disabled, error).
- Verify screen reader announcements for dynamic content (cost changes, validation results, mode transitions).
- Test full keyboard-only operation for each component.
- Validate color contrast ratios meet WCAG 2.1 AA (4.5:1 normal text, 3:1 large text).

### Integration Tests

| Scenario | Components Involved | What to Verify |
|----------|-------------------|----------------|
| Mode switch triggers agent activation | ModeSwitcher | Copilot session state updates, UI reflects new mode |
| Edit parameter → cost refresh | ClickToEdit, CostBadge | Editing a SKU parameter refreshes the adjacent CostBadge |
| Validation failure blocks deploy | DeployGate | Deploy button stays disabled with clear error messaging |
| Version compare and rollback | VersionTimeline | Two versions selected, diff displayed, rollback triggers re-deployment |
| Full deploy flow | ModeSwitcher → ClickToEdit → CostBadge → DeployGate | End-to-end: switch to Agent mode, edit params, review cost, deploy |

## Next Steps

- [ ] Engineering team reviews this guide and flags questions
- [ ] Backend team confirms API availability for Pricing, Validation, and Deployment History endpoints
- [ ] Set up Storybook deployment for design review of prototypes
- [ ] Schedule kick-off for P0 implementation (ModeSwitcher + DeployGate)
- [ ] Create ADO work items for each component with linked requirements
