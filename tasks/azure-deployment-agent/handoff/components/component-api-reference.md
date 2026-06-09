---
title: "Component API Reference — Deployment Agent UX"
phase: deliver
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Handoff Agent"
related:
  - "../implementation-guide.md"
---

# Component API Reference — Deployment Agent UX

## Overview

Complete API reference for the five React components in the Azure Deployment Agent UX enhancement suite. Each component section includes the TypeScript props interface, props table, usage examples, component states, key behaviors, and accessibility contract.

---

## 1. ModeSwitcher

Segmented control rendered in the Copilot header bar. Allows users to switch between Ask, Plan, and Agent modes.

### Props Interface

```typescript
interface ModeSwitcherProps {
  mode: 'ask' | 'plan' | 'agent';
  activeAgent?: string;
  onModeChange: (mode: 'ask' | 'plan' | 'agent') => void;
  disabled?: boolean;
}
```

### Props Table

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `mode` | `'ask' \| 'plan' \| 'agent'` | — | Yes | The currently active Copilot mode. Controls which tab appears selected. |
| `activeAgent` | `string` | `undefined` | No | Display name of the active agent. Shown as a sub-label when `mode` is `'agent'`. |
| `onModeChange` | `(mode: 'ask' \| 'plan' \| 'agent') => void` | — | Yes | Called when the user activates a different mode tab. |
| `disabled` | `boolean` | `false` | No | When `true`, all tabs are visually dimmed and non-interactive. Used during active deployments. |

### Usage Example

```tsx
import { ModeSwitcher } from './components/ModeSwitcher/ModeSwitcher';

function CopilotHeader() {
  const [mode, setMode] = useState<'ask' | 'plan' | 'agent'>('agent');

  return (
    <ModeSwitcher
      mode={mode}
      activeAgent="Deployment Agent"
      onModeChange={setMode}
    />
  );
}
```

### States

| State | Description | Visual Treatment |
|-------|-------------|-----------------|
| **Default** | One tab active, others inactive | Active tab: `--color-primary-500` background, white text. Inactive: `--color-neutral-100` background, `--color-neutral-700` text. |
| **Hover** | User hovers an inactive tab | Background shifts to `--color-neutral-200`. |
| **Focused** | Tab has keyboard focus | 2px focus ring using `--color-focus-ring`. |
| **Disabled** | All tabs non-interactive | Opacity reduced to 0.5, `pointer-events: none`. |
| **Agent Active** | Agent mode selected with `activeAgent` | Agent tab shows sub-label with agent name in `--font-size-sm`. |

### Key Behaviors

1. **Single selection**: Exactly one mode is active at all times.
2. **Animated indicator**: Active tab indicator slides horizontally with `--motion-duration-fast` transition.
3. **Agent sub-label**: When `mode === 'agent'` and `activeAgent` is set, the agent name appears below the "Agent" label.
4. **Disabled guard**: When `disabled` is `true`, `onModeChange` is not called regardless of user interaction.

### Accessibility Contract

| Requirement | Implementation |
|-------------|---------------|
| **Container role** | `role="tablist"` on the outer `<div>` |
| **Tab role** | `role="tab"` on each mode button |
| **Selection state** | `aria-selected="true"` on the active tab, `"false"` on others |
| **Disabled state** | `aria-disabled="true"` on all tabs when `disabled` prop is `true` |
| **Keyboard — Left/Right** | Move focus between tabs |
| **Keyboard — Enter/Space** | Activate the focused tab |
| **Keyboard — Home** | Move focus to the first tab (Ask) |
| **Keyboard — End** | Move focus to the last tab (Agent) |
| **Focus management** | Focus follows selection (roving tabindex pattern) |

---

## 2. CostBadge

Inline badge displaying resource cost with an expandable SKU alternatives panel.

### Props Interface

```typescript
interface CostBadgeProps {
  cost: number;
  currency?: string;
  timeHorizon?: 'hourly' | 'monthly' | 'annual';
  resourceName: string;
  alternatives?: Array<{
    sku: string;
    vcpus: number;
    ram: string;
    cost: number;
    performance: number;
  }>;
  onAlternativeSelect?: (sku: string) => void;
  status?: 'normal' | 'warning' | 'critical';
}
```

### Props Table

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `cost` | `number` | — | Yes | The cost value to display in the badge. |
| `currency` | `string` | `'USD'` | No | ISO 4217 currency code for formatting. |
| `timeHorizon` | `'hourly' \| 'monthly' \| 'annual'` | `'monthly'` | No | Time period for the displayed cost. |
| `resourceName` | `string` | — | Yes | Name of the Azure resource this cost applies to. |
| `alternatives` | `Array<{ sku, vcpus, ram, cost, performance }>` | `[]` | No | List of alternative SKU options. When provided, badge becomes clickable. |
| `onAlternativeSelect` | `(sku: string) => void` | `undefined` | No | Called when the user selects an alternative SKU from the panel. |
| `status` | `'normal' \| 'warning' \| 'critical'` | `'normal'` | No | Visual severity. Controls badge background color and icon. |

### Usage Example

```tsx
import { CostBadge } from './components/CostBadge/CostBadge';

function ResourceCard() {
  const alternatives = [
    { sku: 'Standard_D2s_v3', vcpus: 2, ram: '8 GiB', cost: 70.08, performance: 60 },
    { sku: 'Standard_D4s_v3', vcpus: 4, ram: '16 GiB', cost: 140.16, performance: 80 },
    { sku: 'Standard_B2ms', vcpus: 2, ram: '8 GiB', cost: 60.74, performance: 45 },
  ];

  return (
    <CostBadge
      cost={140.16}
      currency="USD"
      timeHorizon="monthly"
      resourceName="app-vm-prod"
      alternatives={alternatives}
      onAlternativeSelect={(sku) => console.log(`Selected: ${sku}`)}
      status="warning"
    />
  );
}
```

### States

| State | Description | Visual Treatment |
|-------|-------------|-----------------|
| **Normal** | Cost is within expected range | `--color-neutral-50` background, `--color-neutral-800` text. |
| **Warning** | Cost exceeds soft threshold | `--color-warning-500` background with warning icon. |
| **Critical** | Cost exceeds hard threshold | `--color-error-500` background with alert icon, bold text. |
| **Hover** | User hovers the badge (when alternatives exist) | Subtle shadow increase, cursor changes to pointer. |
| **Panel Open** | Alternatives panel is visible | Badge has active indicator; flyout panel rendered below with `--elevation-lg`. |
| **No Alternatives** | `alternatives` is empty or undefined | Badge is non-interactive, no hover effect or click behavior. |

### Key Behaviors

1. **Inline rendering**: Badge renders as an inline element within text flow, not as a block.
2. **Currency formatting**: Uses `Intl.NumberFormat` with the `currency` prop for locale-aware formatting.
3. **Time horizon label**: Appended to the formatted cost (e.g., "$140.16/mo").
4. **Clickable when alternatives exist**: Badge becomes interactive only when `alternatives` has at least one entry.
5. **Alternatives panel**: Opens below the badge as a flyout. Lists alternatives sorted by cost ascending. Each row shows SKU name, vCPUs, RAM, cost, and a performance comparison bar (percentage fill).
6. **Selection**: Clicking an alternative calls `onAlternativeSelect(sku)` and closes the panel.
7. **Close behavior**: Panel closes on outside click, Escape key, or alternative selection.

### Accessibility Contract

| Requirement | Implementation |
|-------------|---------------|
| **Badge role** | `role="status"` with `aria-label` describing cost, resource, and time horizon |
| **Interactive badge** | When alternatives exist: `role="button"`, `aria-expanded`, `aria-haspopup="dialog"` |
| **Panel role** | `role="dialog"`, `aria-modal="true"`, `aria-label="SKU alternatives for {resourceName}"` |
| **Alternatives list** | `role="listbox"` with `role="option"` on each alternative |
| **Keyboard — Enter/Space** | Open/close alternatives panel |
| **Keyboard — Arrow Up/Down** | Navigate alternatives list |
| **Keyboard — Escape** | Close panel, return focus to badge |
| **Focus trap** | Focus is trapped within the panel while open |
| **Screen reader** | Cost values announced as currency (e.g., "140 dollars and 16 cents per month") |

---

## 3. DeployGate

Five-section pre-deployment validation panel. Summarizes resources, validation results, costs, environment, and deployment actions.

### Props Interface

```typescript
interface DeployGateProps {
  resources: Array<{
    name: string;
    type: string;
    status: 'added' | 'modified' | 'removed';
  }>;
  validationResults: Array<{
    name: string;
    status: 'pass' | 'fail' | 'warning';
    message?: string;
  }>;
  costSummary: {
    total: number;
    delta: number;
    currency: string;
    drivers: Array<{ name: string; cost: number }>;
  };
  environment: 'production' | 'staging' | 'development' | 'test';
  onDeploy: () => void;
  onCancel: () => void;
  onSaveAsPR?: () => void;
}
```

### Props Table

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `resources` | `Array<{ name, type, status }>` | — | Yes | List of resources in the deployment with their change status. |
| `validationResults` | `Array<{ name, status, message? }>` | — | Yes | Results of pre-deployment validation checks. |
| `costSummary` | `{ total, delta, currency, drivers }` | — | Yes | Aggregated cost data: total estimated cost, delta from current, currency, and top cost drivers. |
| `environment` | `'production' \| 'staging' \| 'development' \| 'test'` | — | Yes | Target deployment environment. Production triggers additional safeguards. |
| `onDeploy` | `() => void` | — | Yes | Called when user confirms deployment. |
| `onCancel` | `() => void` | — | Yes | Called when user cancels the deployment flow. |
| `onSaveAsPR` | `() => void` | `undefined` | No | Called when user opts to save the deployment as a pull request. Only rendered when provided. |

### Usage Example

```tsx
import { DeployGate } from './components/DeployGate/DeployGate';

function DeploymentReview() {
  return (
    <DeployGate
      resources={[
        { name: 'app-vm-prod', type: 'Microsoft.Compute/virtualMachines', status: 'modified' },
        { name: 'app-nsg', type: 'Microsoft.Network/networkSecurityGroups', status: 'added' },
      ]}
      validationResults={[
        { name: 'ARM Template Valid', status: 'pass' },
        { name: 'Quota Check', status: 'pass' },
        { name: 'Policy Compliance', status: 'warning', message: 'Tag "cost-center" recommended' },
      ]}
      costSummary={{
        total: 245.50,
        delta: 32.00,
        currency: 'USD',
        drivers: [
          { name: 'app-vm-prod', cost: 140.16 },
          { name: 'app-nsg', cost: 0 },
        ],
      }}
      environment="production"
      onDeploy={() => startDeployment()}
      onCancel={() => closePanel()}
      onSaveAsPR={() => createPullRequest()}
    />
  );
}
```

### States

| State | Description | Visual Treatment |
|-------|-------------|-----------------|
| **All Pass** | All validations pass | Green checkmarks, Deploy button enabled. |
| **Has Warnings** | Some validations have warnings | Yellow warning icons, Deploy button enabled with caution banner. |
| **Has Failures** | One or more validations fail | Red X icons, Deploy button disabled with `aria-disabled`. |
| **Production** | `environment === 'production'` | Orange environment badge, confirmation checkbox required before Deploy enables. |
| **Non-production** | Other environments | Standard environment badge, no extra confirmation. |
| **Cost Increase** | `delta > 0` | Delta shown in red with upward arrow: "+$32.00/mo". |
| **Cost Decrease** | `delta < 0` | Delta shown in green with downward arrow: "-$15.00/mo". |

### Key Behaviors

1. **Five sections** rendered in order:
   - **Resource Summary**: Table of resources with name, type, and color-coded status badges (green=added, blue=modified, red=removed).
   - **Validation Results**: Checklist of validation checks with pass/fail/warning icons and optional messages.
   - **Cost Summary**: Total cost, delta from current deployment, and top cost drivers.
   - **Environment Confirmation**: Environment badge with production safeguard checkbox.
   - **Action Buttons**: Deploy (primary), Save as PR (secondary, conditional), Cancel (tertiary).
2. **Deploy gating**: Deploy button is disabled when any `validationResults` entry has `status: 'fail'`.
3. **Production confirmation**: When `environment === 'production'`, a checkbox labeled "I confirm this deployment to production" must be checked before Deploy enables.
4. **Save as PR**: Button only renders when `onSaveAsPR` prop is provided.

### Accessibility Contract

| Requirement | Implementation |
|-------------|---------------|
| **Panel role** | `role="region"`, `aria-label="Pre-deployment review"` |
| **Sections** | Each section uses `<section>` with `aria-label` |
| **Validation list** | `role="list"` with `role="listitem"` per check |
| **Status icons** | Each icon has `aria-label` (e.g., "Passed", "Failed", "Warning") |
| **Deploy button** | `aria-disabled="true"` with `title` explaining why when gated |
| **Cost delta** | `aria-label` includes direction ("increase of 32 dollars") |
| **Production checkbox** | `<input type="checkbox">` with associated `<label>` |
| **Keyboard — Tab** | Moves through sections and interactive elements in document order |
| **Keyboard — Enter** | Activates buttons and checkbox |
| **Live region** | Validation status changes announced via `aria-live="polite"` |

---

## 4. ClickToEdit

Inline editable field that transitions between display and edit modes. Supports text, number, and select input types.

### Props Interface

```typescript
interface ClickToEditProps {
  value: string | number;
  type?: 'text' | 'number' | 'select';
  options?: string[];
  onSave: (newValue: string | number) => void;
  label: string;
  impactPreview?: string;
  readOnly?: boolean;
}
```

### Props Table

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `string \| number` | — | Yes | The current value displayed in the field. |
| `type` | `'text' \| 'number' \| 'select'` | `'text'` | No | Determines the input element type in edit mode. |
| `options` | `string[]` | `[]` | No | Options for `type="select"`. Required when type is `'select'`. |
| `onSave` | `(newValue: string \| number) => void` | — | Yes | Called when the user confirms an edit (Enter or blur). |
| `label` | `string` | — | Yes | Accessible label for the field. Not visually rendered by default. |
| `impactPreview` | `string` | `undefined` | No | Hint text shown during edit mode describing the impact of changing this value. |
| `readOnly` | `boolean` | `false` | No | When `true`, the field appears as static text with no edit affordance. |

### Usage Example

```tsx
import { ClickToEdit } from './components/ClickToEdit/ClickToEdit';

function ParameterRow() {
  const [region, setRegion] = useState('eastus2');

  return (
    <ClickToEdit
      value={region}
      type="select"
      options={['eastus', 'eastus2', 'westus', 'westeurope', 'southeastasia']}
      onSave={(newRegion) => setRegion(newRegion as string)}
      label="Deployment region"
      impactPreview="Changing region will affect latency and may change pricing"
    />
  );
}
```

### States

| State | Description | Visual Treatment |
|-------|-------------|-----------------|
| **Display** | Showing the current value | Styled text with subtle underline or pencil icon on hover. |
| **Hover** | User hovers display mode | Pencil icon appears, background shifts to `--color-neutral-100`. |
| **Edit** | Input is active | Inline `<input>` or `<select>` replaces the text. Border uses `--color-primary-500`. |
| **Edit with Impact** | Edit mode with `impactPreview` | Hint text appears below the input in `--font-size-sm`, `--color-warning-500`. |
| **Read-only** | `readOnly` is `true` | Static text, no hover effects, no pencil icon. |
| **Saving** | Between save and value update | Brief loading indicator (optional, controlled by parent). |

### Key Behaviors

1. **Display → Edit**: Click or press Enter on the display element to enter edit mode. Focus moves to the input.
2. **Edit → Save**: Press Enter or blur the input to save. Calls `onSave(newValue)`.
3. **Edit → Cancel**: Press Escape to revert to the original value without calling `onSave`.
4. **Select type**: When `type="select"`, renders a `<select>` dropdown with `options`. Changing the selection triggers save immediately.
5. **Number validation**: When `type="number"`, validate that input is a valid number before calling `onSave`. Invalid input shows inline error.
6. **Impact preview**: When `impactPreview` is provided and edit mode is active, display the preview text below the input.
7. **XSS protection**: Values are rendered using `textContent` or React's default escaping, never via `dangerouslySetInnerHTML`.

### Accessibility Contract

| Requirement | Implementation |
|-------------|---------------|
| **Display role** | `role="button"`, `tabindex="0"` |
| **Display label** | `aria-label="{label}: {value} — click to edit"` |
| **Read-only** | `aria-readonly="true"`, no `role="button"` |
| **Edit input** | Native `<input>` or `<select>` with `aria-label="{label}"` |
| **Mode announcement** | `aria-live="assertive"` region announces "Editing {label}" and "Saved {label}" |
| **Keyboard — Enter** | Activate edit mode (from display) or save (from edit) |
| **Keyboard — Escape** | Cancel edit, revert value, return to display mode |
| **Keyboard — Tab** | In edit mode, save and move focus to next focusable element |
| **Focus management** | Focus moves to input on edit activation; returns to display element on save/cancel |

---

## 5. VersionTimeline

Horizontal scrollable timeline for comparing deployment versions and triggering rollbacks.

### Props Interface

```typescript
interface VersionTimelineProps {
  versions: Array<{
    id: string;
    label: string;
    date: string;
    changeCount: number;
    author: string;
  }>;
  selectedVersions: [string, string];
  onVersionSelect: (selected: [string, string]) => void;
  onRollback?: (versionId: string) => void;
  searchQuery?: string;
  onSearch?: (query: string) => void;
}
```

### Props Table

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `versions` | `Array<{ id, label, date, changeCount, author }>` | — | Yes | Ordered list of deployment versions (newest first). |
| `selectedVersions` | `[string, string]` | — | Yes | Tuple of two version IDs currently selected for comparison. |
| `onVersionSelect` | `(selected: [string, string]) => void` | — | Yes | Called when the user changes the version selection. |
| `onRollback` | `(versionId: string) => void` | `undefined` | No | Called after user confirms rollback to a specific version. Only renders rollback UI when provided. |
| `searchQuery` | `string` | `''` | No | Current search/filter query string. |
| `onSearch` | `(query: string) => void` | `undefined` | No | Called on search input change. Only renders search UI when provided. |

### Version Object Shape

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique version identifier (e.g., deployment ID or commit SHA). |
| `label` | `string` | Human-readable version label (e.g., "v2.3.1" or "Deploy #47"). |
| `date` | `string` | ISO 8601 date string of the deployment. |
| `changeCount` | `number` | Number of resources changed in this version. |
| `author` | `string` | Name or email of the person who triggered the deployment. |

### Usage Example

```tsx
import { VersionTimeline } from './components/VersionTimeline/VersionTimeline';

function DeploymentHistory() {
  const [selected, setSelected] = useState<[string, string]>(['v5', 'v4']);
  const [search, setSearch] = useState('');

  const versions = [
    { id: 'v5', label: 'Deploy #50', date: '2026-05-12T14:30:00Z', changeCount: 3, author: 'alice@contoso.com' },
    { id: 'v4', label: 'Deploy #49', date: '2026-05-10T09:15:00Z', changeCount: 1, author: 'bob@contoso.com' },
    { id: 'v3', label: 'Deploy #48', date: '2026-05-08T16:45:00Z', changeCount: 5, author: 'alice@contoso.com' },
  ];

  return (
    <VersionTimeline
      versions={versions}
      selectedVersions={selected}
      onVersionSelect={setSelected}
      onRollback={(versionId) => confirmAndRollback(versionId)}
      searchQuery={search}
      onSearch={setSearch}
    />
  );
}
```

### States

| State | Description | Visual Treatment |
|-------|-------------|-----------------|
| **Default** | Timeline with no selections | All version nodes are `--color-neutral-300` dots on a horizontal track. |
| **One Selected** | First version selected, awaiting second | Selected node uses `--color-primary-500` fill. Prompt text: "Select a second version to compare." |
| **Two Selected** | Both versions selected | Both nodes filled with `--color-primary-500`. Track segment between them highlighted. Diff summary visible. |
| **Hover** | User hovers a version node | Tooltip with label, date, author, change count. Node scales up slightly. |
| **Search Active** | `searchQuery` is non-empty | Non-matching versions are dimmed (opacity 0.3). Matching versions remain full opacity. |
| **Rollback Confirm** | User clicked rollback | Confirmation dialog overlays the timeline with version details and confirm/cancel buttons. |

### Key Behaviors

1. **Two-selection model**: Users select exactly two versions. First click sets the first version; second click sets the second. Clicking a third version replaces the oldest selection.
2. **Horizontal scroll**: Timeline scrolls horizontally when versions overflow. Arrow buttons appear at edges for keyboard/mouse scrolling.
3. **Rollback flow**: Clicking rollback on a selected version opens a confirmation dialog. Confirming calls `onRollback(versionId)`. Canceling closes the dialog.
4. **Search filtering**: When `searchQuery` is provided, versions whose `label`, `author`, or `date` do not contain the query are visually dimmed but remain in the DOM for context.
5. **Virtual scrolling**: For lists exceeding 20 versions, implement windowed rendering to maintain performance.
6. **Date formatting**: Dates displayed using `Intl.DateTimeFormat` with relative time for recent versions (e.g., "2 days ago").

### Accessibility Contract

| Requirement | Implementation |
|-------------|---------------|
| **Timeline role** | `role="listbox"`, `aria-multiselectable="true"`, `aria-label="Deployment version timeline"` |
| **Version node** | `role="option"`, `aria-selected` reflects selection state |
| **Node label** | `aria-label="{label}, deployed {date} by {author}, {changeCount} changes"` |
| **Keyboard — Left/Right** | Navigate between version nodes |
| **Keyboard — Space** | Toggle selection of focused version |
| **Keyboard — Enter** | Open version detail or rollback dialog for focused version |
| **Keyboard — Escape** | Close rollback confirmation dialog |
| **Rollback dialog** | `role="alertdialog"`, `aria-describedby` referencing version details |
| **Focus trap** | Focus trapped in rollback dialog while open |
| **Selection announcement** | `aria-live="polite"` region announces "Selected {label} for comparison" |
| **Search** | Search input has `aria-label="Search deployment versions"`, results count announced via `aria-live` |

---

## Design Token Reference (All Components)

| Token | Category | Used By |
|-------|----------|---------|
| `--color-primary-500` | Color | ModeSwitcher (active), CostBadge (interactive), ClickToEdit (edit border), VersionTimeline (selected), DeployGate (deploy button) |
| `--color-neutral-50` | Color | CostBadge (normal background) |
| `--color-neutral-100` | Color | ModeSwitcher (inactive background), ClickToEdit (input background) |
| `--color-neutral-200` | Color | ModeSwitcher (hover), DeployGate (dividers) |
| `--color-neutral-300` | Color | VersionTimeline (track, unselected nodes) |
| `--color-neutral-700` | Color | ModeSwitcher (inactive text) |
| `--color-neutral-800` | Color | ClickToEdit (display text) |
| `--color-success-500` | Color | DeployGate (pass), VersionTimeline (added), CostBadge (under budget) |
| `--color-warning-500` | Color | DeployGate (warning), CostBadge (warning), ClickToEdit (impact preview) |
| `--color-error-500` | Color | DeployGate (fail), CostBadge (critical), VersionTimeline (removed) |
| `--color-focus-ring` | Color | All components (keyboard focus indicator) |
| `--spacing-xs` | Spacing | CostBadge, ClickToEdit |
| `--spacing-sm` | Spacing | ModeSwitcher, CostBadge |
| `--spacing-md` | Spacing | DeployGate, VersionTimeline |
| `--spacing-lg` | Spacing | DeployGate, VersionTimeline |
| `--font-size-sm` | Typography | CostBadge, ModeSwitcher (sub-label), VersionTimeline (labels) |
| `--font-size-md` | Typography | ClickToEdit |
| `--border-radius-sm` | Border | CostBadge, ClickToEdit |
| `--border-radius-md` | Border | ModeSwitcher |
| `--border-radius-lg` | Border | DeployGate |
| `--border-radius-full` | Border | VersionTimeline (node dots) |
| `--elevation-md` | Elevation | DeployGate |
| `--elevation-lg` | Elevation | CostBadge (alternatives panel) |
| `--motion-duration-fast` | Motion | ModeSwitcher (tab slide) |
| `--motion-easing-standard` | Motion | ModeSwitcher (tab slide) |

## Next Steps

- [ ] Engineering reviews API surface for each component and flags concerns
- [ ] Confirm design token values are defined in `designs/tokens/`
- [ ] Validate prop interfaces against prototype implementations
