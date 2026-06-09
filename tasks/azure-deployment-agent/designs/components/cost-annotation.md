---
title: "Component Spec: Cost Annotation"
phase: design
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Designer Agent"
related:
  - "cost-diff-column.md"
  - "../../ideation/solution-concepts.md"
---

# Cost Annotation

> A two-part cost transparency system providing inline cost badges next to resources (Part A) and a cost delta column in the version diff table (Part B). Together they surface cost implications at the point of decision during plan iteration and version comparison.

---

## Part A: Cost Badge

### Description

A compact pill badge displayed inline next to each resource in the workload plan, showing an estimated cost (e.g., "~$120/mo"). Clicking the badge expands an SKU alternatives panel with price-performance comparisons. A persistent summary bar at the bottom shows the running total across all resources.

### Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `cost` | `number` | — | Yes | Estimated cost value for the resource |
| `currency` | `string` | `'USD'` | No | ISO 4217 currency code |
| `timeHorizon` | `'hourly' \| 'monthly' \| 'annual'` | `'monthly'` | No | Cost display time period |
| `resourceName` | `string` | — | Yes | Name of the associated resource |
| `budgetThreshold` | `number \| undefined` | `undefined` | No | Budget limit for warning/critical state |
| `alternatives` | `Alternative[]` | `[]` | No | Array of SKU alternatives for the expanded panel |
| `onAlternativeSelect` | `(sku: string) => void` | — | No | Callback when user selects an alternative SKU |
| `onTimeHorizonChange` | `(horizon: 'hourly' \| 'monthly' \| 'annual') => void` | — | No | Callback when time horizon is toggled |
| `className` | `string` | — | No | Additional CSS classes |

#### `Alternative` Type

```ts
interface Alternative {
  sku: string;
  vCPUs: number;
  ram: string;
  cost: number;
  perfScore: number; // relative performance score 1–10
  recommended?: boolean;
}
```

### Anatomy

```
Collapsed:
┌──────────────────────────────────────────┐
│  VM: web-server-01      [ ~$120/mo ]     │
│  AKS: prod-cluster      [ ~$340/mo ⚠ ]  │
│  SQL: main-db            [ ~$220/mo ]     │
├──────────────────────────────────────────┤
│  Total: ~$680/mo                    3 res │
└──────────────────────────────────────────┘

Expanded (after clicking a badge):
┌──────────────────────────────────────────┐
│  VM: web-server-01      [ ~$120/mo ]     │
│  ┌────────────────────────────────────┐  │
│  │ SKU Alternatives                   │  │
│  │ ┌──────┬──────┬─────┬──────┬────┐ │  │
│  │ │ SKU  │ vCPU │ RAM │ Cost │Perf│ │  │
│  │ ├──────┼──────┼─────┼──────┼────┤ │  │
│  │ │ D2v3 │  2   │ 8GB │ $70  │ 6  │ │  │
│  │ │ D4v3 │  4   │16GB │ $120 │ 8  │◄│  │
│  │ │ D8v3 │  8   │32GB │ $230 │ 9  │ │  │
│  │ └──────┴──────┴─────┴──────┴────┘ │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

| Element | Description |
|---------|-------------|
| **Badge Pill** | Compact rounded pill showing formatted cost (e.g., `~$120/mo`). Color indicates budget status. |
| **Warning Icon** | `⚠` icon appended to badge when approaching budget threshold. |
| **Alternatives Panel** | Expandable panel below the resource row containing the SKU comparison table. |
| **SKU Table** | Columns: SKU, vCPUs, RAM, Cost, Perf. Current selection is highlighted. Recommended row marked. |
| **Summary Bar** | Persistent bar at the bottom showing aggregate total cost, resource count, and cost trend indicator. |

### States

| State | Description | Visual Changes |
|-------|-------------|----------------|
| Collapsed | Default resting state; badge shows cost | Pill badge with `--color-neutral-100` bg, `--font-size-sm` text |
| Hover | Mouse over badge | Badge bg lightens, subtle scale-up, cursor pointer. Tooltip shows hourly/monthly/annual breakdown. |
| Expanded | Badge clicked; alternatives panel visible | Panel slides down with `--elevation-2` shadow. `aria-expanded="true"`. |
| Loading | Cost data is being fetched | Skeleton shimmer on badge; spinner in alternatives panel |
| Warning | Cost approaches budget threshold (70–90%) | Badge bg changes to `--color-warning-100`, border `--color-warning-500`, `⚠` icon visible |
| Critical | Cost exceeds budget threshold (>90%) | Badge bg changes to `--color-error-100`, border `--color-error-500`, `⚠` icon pulsing |

### Design Tokens

| Token | Usage |
|-------|-------|
| `--color-neutral-100` | Default badge background |
| `--color-neutral-700` | Default badge text color |
| `--color-warning-100` | Warning state badge background |
| `--color-warning-500` | Warning state border and icon |
| `--color-error-100` | Critical state badge background |
| `--color-error-500` | Critical state border and icon |
| `--border-radius-full` | Badge pill shape (fully rounded) |
| `--elevation-2` | Alternatives panel box shadow |
| `--font-size-sm` | Badge text size |
| `--font-size-xs` | Table cell text size |
| `--font-weight-medium` | Badge cost value weight |
| `--spacing-sm` | Badge internal padding |
| `--spacing-md` | Alternatives panel padding |
| `--spacing-xs` | Table cell padding |
| `--motion-duration-fast` | Panel expand/collapse animation |
| `--color-primary-100` | Selected/current SKU row highlight |
| `--color-primary-500` | Recommended badge in alternatives table |

### Accessibility

#### ARIA

| Attribute | Element | Value |
|-----------|---------|-------|
| `aria-label` | Badge pill | `"{resourceName} estimated cost: {formattedCost} per {timeHorizon}"` |
| `aria-expanded` | Badge pill (when expandable) | `true` / `false` |
| `aria-controls` | Badge pill | ID of the alternatives panel |
| `role` | Alternatives table | `table` |
| `aria-label` | Alternatives table | `"SKU alternatives for {resourceName}"` |
| `scope` | Table headers | `col` |
| `aria-current` | Current SKU row | `true` |

#### Keyboard

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Toggle alternatives panel open/closed |
| `Escape` | Close alternatives panel |
| `Arrow Down/Up` | Navigate rows within the alternatives table |
| `Enter` | Select the focused alternative SKU |
| `Tab` | Move focus between badge, table rows, and summary bar |

#### Screen Reader

- Badge announces: _"web-server-01 estimated cost: approximately $120 per month"_
- Warning state: _"web-server-01 estimated cost: approximately $340 per month, approaching budget limit"_
- Critical state: _"web-server-01 estimated cost: approximately $500 per month, exceeds budget limit"_
- Expanded panel: _"SKU alternatives for web-server-01, table with 3 rows"_

---

## Part B: Cost Delta Column

### Description

An additional column in the version diff table showing the per-resource cost impact of changes between two plan versions. Positive deltas (cost increases) display in red, negative deltas (cost decreases) in green, and neutral (no change) in gray. A summary row at the bottom shows the net cost delta.

### Anatomy

```
┌────────────────┬──────────┬──────────┬─────────────┐
│ Resource       │ v1       │ v2       │ Cost Impact  │
├────────────────┼──────────┼──────────┼─────────────┤
│ VM: web-01     │ D2s_v3   │ D4s_v3   │ +$45/mo  ▲  │
│ SQL: main-db   │ S1       │ S0       │ −$20/mo  ▼  │
│ AKS: cluster   │ —        │ Standard │ +$180/mo ▲  │
│ Storage: logs  │ Hot      │ Hot      │ —            │
├────────────────┼──────────┼──────────┼─────────────┤
│ Net Change     │ $340/mo  │ $545/mo  │ +$205/mo     │
└────────────────┴──────────┴──────────┴─────────────┘
```

| Element | Description |
|---------|-------------|
| **Cost Impact Column** | Additional rightmost column in the diff table |
| **Positive Delta** | Red text with `▲` icon for cost increases |
| **Negative Delta** | Green text with `▼` icon for cost decreases |
| **Neutral** | Gray em-dash `—` for unchanged costs |
| **Summary Row** | Bottom row showing net delta across all resources |

### Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `deltas` | `CostDelta[]` | — | Yes | Array of per-resource cost deltas |
| `currency` | `string` | `'USD'` | No | ISO 4217 currency code |
| `timeHorizon` | `'hourly' \| 'monthly' \| 'annual'` | `'monthly'` | No | Cost display time period |

#### `CostDelta` Type

```ts
interface CostDelta {
  resourceId: string;
  resourceName: string;
  previousCost: number;
  currentCost: number;
  delta: number; // positive = increase, negative = decrease
}
```

### States

| State | Description | Visual Changes |
|-------|-------------|----------------|
| Increase | `delta > 0` | Red text `--color-error-500`, `▲` icon |
| Decrease | `delta < 0` | Green text `--color-success-500`, `▼` icon |
| Neutral | `delta === 0` | Gray em-dash `--color-neutral-400` |
| Loading | Cost deltas being computed | Skeleton shimmer in the Cost Impact column cells |

### Design Tokens

| Token | Usage |
|-------|-------|
| `--color-error-500` | Cost increase text and icon |
| `--color-success-500` | Cost decrease text and icon |
| `--color-neutral-400` | Neutral / no-change text |
| `--font-size-sm` | Delta value text size |
| `--font-weight-medium` | Delta and summary row text weight |
| `--spacing-sm` | Column cell padding |

### Accessibility

| Attribute | Element | Value |
|-----------|---------|-------|
| `aria-label` | Increase cell | `"{resourceName} cost increased by {delta} per month"` |
| `aria-label` | Decrease cell | `"{resourceName} cost decreased by {delta} per month"` |
| `aria-label` | Neutral cell | `"{resourceName} cost unchanged"` |
| `role` | Summary row | `row` with `aria-label="Net cost change summary"` |

- Color is never the sole indicator of direction: `▲`/`▼` icons and `+`/`−` signs supplement color coding
- All delta values are announced with direction and magnitude by screen readers

---

## Requirement Traceability

| Requirement | Coverage |
|-------------|----------|
| REQ-004 | Service-level and SKU-level cost breakdowns in badge + alternatives panel |
| REQ-005 | Inline cost signals at point of decision during plan iteration |
| REQ-011 | Warning and critical states surface budget/scaling risks proactively |
| REQ-013 | `timeHorizon` prop supports hourly, monthly, and annual cost views |

## Usage Examples

```tsx
import { CostBadge } from '@/components/CostBadge';
import { CostDeltaColumn } from '@/components/CostDeltaColumn';

// Cost Badge — default
<CostBadge
  cost={120}
  resourceName="web-server-01"
  alternatives={[
    { sku: 'D2s_v3', vCPUs: 2, ram: '8 GB', cost: 70, perfScore: 6 },
    { sku: 'D4s_v3', vCPUs: 4, ram: '16 GB', cost: 120, perfScore: 8, recommended: true },
    { sku: 'D8s_v3', vCPUs: 8, ram: '32 GB', cost: 230, perfScore: 9 },
  ]}
  onAlternativeSelect={(sku) => handleSkuChange(sku)}
/>

// Cost Badge — warning state
<CostBadge
  cost={340}
  resourceName="prod-cluster"
  budgetThreshold={400}
  timeHorizon="monthly"
/>

// Cost Delta Column
<CostDeltaColumn
  deltas={[
    { resourceId: '1', resourceName: 'VM: web-01', previousCost: 70, currentCost: 115, delta: 45 },
    { resourceId: '2', resourceName: 'SQL: main-db', previousCost: 120, currentCost: 100, delta: -20 },
  ]}
/>
```
