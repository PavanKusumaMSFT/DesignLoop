---
title: "Component Spec: Deploy Gate"
phase: design
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Designer Agent"
related:
  - "../../ideation/solution-concepts.md"
---

# Deploy Gate

> A multi-step pre-deployment validation panel modeled after Azure's "Review + Create" experience. Presents five collapsible validation sections — resource changes, validation checks, cost impact, Bicep preview, and deployment target — gating the Deploy action behind critical check resolution. Provides a confidence gate for production-grade deployments while offering a fast-track variant for non-production environments.

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `resources` | `ResourceChange[]` | — | Yes | Array of resources being added, modified, or deleted |
| `validationResults` | `ValidationResult[]` | — | Yes | Results from quota, policy, dependency, and destructive change checks |
| `costSummary` | `CostSummary` | — | Yes | Service-level cost breakdown and net cost change |
| `bicepFiles` | `BicepFile[]` | — | Yes | Generated Bicep files for preview |
| `target` | `DeploymentTarget` | — | Yes | Subscription, resource group, and region for deployment |
| `environment` | `'production' \| 'staging' \| 'dev' \| 'test'` | `'production'` | No | Deployment environment; controls fast-track behavior |
| `onDeploy` | `() => void` | — | Yes | Callback fired when user confirms deployment |
| `onCancel` | `() => void` | — | Yes | Callback fired when user cancels |
| `onSaveAsPR` | `() => void` | — | No | Callback to save generated Bicep as a PR |
| `onFixIssues` | `() => void` | — | No | Callback to navigate back to plan editor for issue resolution |
| `className` | `string` | — | No | Additional CSS classes |

### Supporting Types

```ts
interface ResourceChange {
  id: string;
  name: string;
  type: string; // e.g., "Microsoft.Compute/virtualMachines"
  changeType: 'added' | 'modified' | 'deleted';
  details?: string; // human-readable summary of what changed
}

interface ValidationResult {
  id: string;
  category: 'quota' | 'region' | 'policy' | 'dependencies' | 'destructive';
  label: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  actionUrl?: string; // link to fix the issue
}

interface CostSummary {
  services: ServiceCost[];
  totalPrevious: number;
  totalCurrent: number;
  netDelta: number;
  currency: string;
}

interface ServiceCost {
  serviceName: string;
  previousCost: number;
  currentCost: number;
  delta: number;
}

interface BicepFile {
  filename: string;
  content: string; // raw Bicep source
  language: 'bicep';
}

interface DeploymentTarget {
  subscription: string;
  subscriptionId: string;
  resourceGroup: string;
  region: string;
}
```

## Anatomy

```
┌─────────────────────────────────────────────────────┐
│  Deploy Gate                                    ✕   │
│─────────────────────────────────────────────────────│
│                                                     │
│  ▼ 1. Resource Changes Summary                      │
│  ┌─────────────────────────────────────────────┐    │
│  │  + 2 added  · ✎ 1 modified  · ✕ 1 deleted  │    │
│  │ ┌──────────────────┬────────┬────────────┐  │    │
│  │ │ Resource         │ Type   │ Change     │  │    │
│  │ ├──────────────────┼────────┼────────────┤  │    │
│  │ │ web-server-02    │ VM     │ + Added    │  │    │
│  │ │ cache-redis      │ Cache  │ + Added    │  │    │
│  │ │ web-server-01    │ VM     │ ✎ Modified │  │    │
│  │ │ legacy-lb        │ LB     │ ✕ Deleted  │  │    │
│  │ └──────────────────┴────────┴────────────┘  │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ▼ 2. Validation Checks                             │
│  ┌─────────────────────────────────────────────┐    │
│  │  ✅ Quota          ✅ Region                 │    │
│  │  ⚠️ Policy         ✅ Dependencies            │    │
│  │  ❌ Destructive Changes                      │    │
│  │                                               │    │
│  │  ❌ Deleting load balancer "legacy-lb" —     │    │
│  │     3 resources depend on this. [Fix →]      │    │
│  │  ⚠️ Policy "require-tags" — 1 resource      │    │
│  │     missing required tags. [Fix →]           │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ▼ 3. Cost Impact                                   │
│  ┌─────────────────────────────────────────────┐    │
│  │ Service          Previous   Current   Delta  │    │
│  │ Compute          $190/mo    $310/mo   +$120  │    │
│  │ Database         $120/mo    $120/mo    —     │    │
│  │ Cache            —          $55/mo    +$55   │    │
│  │ Load Balancer    $25/mo     —         −$25   │    │
│  │──────────────────────────────────────────────│    │
│  │ Total            $335/mo    $485/mo   +$150  │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ▶ 4. Bicep Preview (collapsed)                     │
│                                                     │
│  ▼ 5. Deployment Target                             │
│  ┌─────────────────────────────────────────────┐    │
│  │ Subscription:  Azure Production (abc-123)    │    │
│  │ Resource Group: rg-web-prod                  │    │
│  │ Region:         East US 2                    │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│─────────────────────────────────────────────────────│
│  [Cancel]   [Save as PR]   [Fix Issues]   [Deploy]  │
└─────────────────────────────────────────────────────┘
```

### Sections

| # | Section | Default State | Description |
|---|---------|---------------|-------------|
| 1 | **Resource Changes Summary** | Expanded | Table of resources being added, modified, or deleted with change type badges and counts. |
| 2 | **Validation Checks** | Expanded | Pass/fail/warning badges for each validation category: quota, region availability, policy compliance, dependency checks, destructive change warnings. |
| 3 | **Cost Impact** | Expanded | Service-level cost breakdown table showing previous cost, current cost, and delta. Summary row for totals. |
| 4 | **Bicep Preview** | Collapsed | Syntax-highlighted, read-only code viewer showing generated Bicep files. Line numbers and file tabs included. |
| 5 | **Deployment Target** | Expanded | Displays the target subscription, resource group, and region for deployment. |

### Actions

| Action | Description | Condition |
|--------|-------------|-----------|
| **Deploy** | Executes the deployment | Enabled only when all critical (fail) checks are resolved. Warnings may be acknowledged. |
| **Fix Issues** | Navigates back to the plan editor to resolve validation failures | Visible when any checks have `fail` status |
| **Cancel** | Closes the Deploy Gate and returns to the plan view | Always available |
| **Save as PR** | Creates a pull request from the generated Bicep files | Available when `onSaveAsPR` is provided |

## Variants

### Default (Production)

All five sections are expanded by default (except Bicep Preview). Full validation runs on all categories. Deploy button is blocked until all critical checks pass. Destructive changes require explicit acknowledgment checkboxes.

### Fast-Track (Non-Production)

For `environment` values of `staging`, `dev`, or `test`:
- Sections 2 (Validation Checks) and 4 (Bicep Preview) are collapsed by default
- Validation runs optimistically — warnings do not block deployment
- Destructive change acknowledgment is simplified (single "I understand" toggle instead of per-item checkboxes)
- Visual styling is lighter: reduced emphasis on warning states

## States

| State | Description | Visual Changes |
|-------|-------------|----------------|
| Loading | Validation checks are running asynchronously | Each section shows a progress indicator. Deploy button is disabled with "Validating…" label. Sections render with skeleton shimmer as results arrive. |
| Ready | All checks complete, no blockers | Deploy button is enabled with `--color-primary-500` background. All sections show final results. |
| Blocked | One or more critical validation failures | Deploy button is disabled (`aria-disabled="true"`). Failed checks are highlighted with `--color-error-500`. "Fix Issues" button is prominent. |
| Warning | Checks passed but warnings exist | Deploy button is enabled. Warning items highlighted with `--color-warning-500`. Acknowledgment checkboxes appear for each warning. |
| Deploying | Deployment is in progress after user confirmation | All sections become read-only. Deploy button shows spinner and "Deploying…" text. Progress bar appears below the header. Cancel is disabled. |

## Design Tokens

| Token | Usage |
|-------|-------|
| `--color-success-500` | Pass badge background, decrease delta text |
| `--color-error-500` | Fail badge background, destructive change highlight, increase delta text |
| `--color-warning-500` | Warning badge background, advisory notices |
| `--color-primary-500` | Deploy button background (enabled state), focus ring |
| `--color-primary-700` | Deploy button hover state |
| `--color-neutral-50` | Deploy button text, panel background |
| `--color-neutral-100` | Section header background (collapsed) |
| `--color-neutral-200` | Section borders and dividers |
| `--color-neutral-700` | Body text color |
| `--elevation-2` | Panel container box shadow |
| `--spacing-lg` | Panel outer padding, section spacing |
| `--spacing-md` | Section inner padding, table cell padding |
| `--spacing-sm` | Badge internal padding, action button gaps |
| `--border-radius-md` | Panel and section corner radius |
| `--border-radius-sm` | Badge and button corner radius |
| `--font-size-lg` | Panel title |
| `--font-size-md` | Section headings |
| `--font-size-sm` | Table content, validation messages |
| `--font-weight-semibold` | Section headings, summary row |
| `--font-weight-medium` | Badge labels |
| `--motion-duration-fast` | Section expand/collapse animation |
| `--motion-duration-normal` | Panel entry animation |

## Accessibility

### ARIA

| Attribute | Element | Value |
|-----------|---------|-------|
| `role` | Panel container | `region` |
| `aria-label` | Panel container | `"Pre-deployment validation"` |
| `aria-live` | Validation results area | `polite` — announces check results as they complete |
| `aria-disabled` | Deploy button (blocked state) | `true` |
| `aria-expanded` | Section headers | `true` / `false` |
| `aria-controls` | Section headers | ID of the corresponding section content |
| `aria-label` | Status badges (✅/⚠️/❌) | `"pass"` / `"warning"` / `"fail"` |
| `aria-label` | Deploy button (deploying) | `"Deploying, please wait"` |
| `role` | Resource changes table | `table` |
| `role` | Cost impact table | `table` |

### Keyboard

| Key | Action |
|-----|--------|
| `Tab` | Move focus through sections, action buttons, and interactive elements in reading order |
| `Enter` / `Space` | Toggle section expand/collapse; activate buttons |
| `Escape` | Close the Deploy Gate panel (equivalent to Cancel) |
| `Arrow Down/Up` | Navigate rows within tables |

### Screen Reader

- Panel announces: _"Pre-deployment validation, 5 sections"_
- Validation results announce as they complete: _"Quota check passed"_, _"Destructive changes check failed: 1 issue"_
- Deploy button when blocked: _"Deploy button, disabled, resolve 1 critical issue to proceed"_
- Deploy button when ready: _"Deploy button"_
- Section toggle: _"Resource Changes Summary, expanded"_ / _"Bicep Preview, collapsed"_
- Deploying state: _"Deployment in progress"_

### Focus Management

- On open, focus moves to the panel container
- After resolving all issues and returning to Deploy Gate, focus moves to the Deploy button
- On close (Cancel or Escape), focus returns to the element that triggered the Deploy Gate
- Focus ring: `2px solid var(--color-primary-500)`, `2px` offset

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| ≥ 768px | Full panel layout with side-by-side cost columns and inline validation messages |
| < 768px | Stacked layout. Tables scroll horizontally. Action buttons stack vertically with Deploy button at the top for quick access. |

## Behavior

| Interaction | Behavior |
|-------------|----------|
| **Section expand/collapse** | Click section header or chevron to toggle. Animated with `--motion-duration-fast`. |
| **Validation progress** | Checks run asynchronously. Sections update independently as results arrive. `aria-live="polite"` announces completions. |
| **Destructive change acknowledgment** | Each destructive change has an explicit checkbox. Deploy remains blocked until all are checked. In fast-track mode, a single toggle replaces per-item checkboxes. |
| **Deploy click** | Confirmation dialog appears for production environments. Non-production deploys proceed directly. |
| **Fix Issues click** | Closes the Deploy Gate and navigates to the plan editor with failed checks highlighted in context. |
| **Save as PR** | Opens a PR creation flow with pre-filled Bicep files, commit message, and branch name. |

## Requirement Traceability

| Requirement | Coverage |
|-------------|----------|
| REQ-003 | Full pre-deployment validation with structured pass/warn/fail summary, destructive change gates, and abort/modify/proceed flow |
| REQ-004 | Service-level cost breakdown in the Cost Impact section |
| REQ-005 | Cost impact surfaced before deployment execution |
| REQ-006 | Syntax-highlighted Bicep preview with line numbers |
| REQ-010 | "Save as PR" action enables collaborative deployment review workflows |
| REQ-011 | Budget/scaling risk warnings surfaced in Validation Checks and Cost Impact sections |

## Usage Examples

```tsx
import { DeployGate } from '@/components/DeployGate';

// Production deployment with full validation
<DeployGate
  resources={[
    { id: '1', name: 'web-server-02', type: 'Microsoft.Compute/virtualMachines', changeType: 'added' },
    { id: '2', name: 'legacy-lb', type: 'Microsoft.Network/loadBalancers', changeType: 'deleted', details: '3 dependent resources' },
  ]}
  validationResults={[
    { id: 'q1', category: 'quota', label: 'Quota', status: 'pass', message: 'All quotas within limits' },
    { id: 'd1', category: 'destructive', label: 'Destructive Changes', status: 'fail', message: 'Deleting legacy-lb with 3 dependents', actionUrl: '/plan/edit' },
  ]}
  costSummary={{
    services: [
      { serviceName: 'Compute', previousCost: 190, currentCost: 310, delta: 120 },
      { serviceName: 'Load Balancer', previousCost: 25, currentCost: 0, delta: -25 },
    ],
    totalPrevious: 335,
    totalCurrent: 485,
    netDelta: 150,
    currency: 'USD',
  }}
  bicepFiles={[
    { filename: 'main.bicep', content: '// ...generated Bicep', language: 'bicep' },
  ]}
  target={{
    subscription: 'Azure Production',
    subscriptionId: 'abc-123',
    resourceGroup: 'rg-web-prod',
    region: 'East US 2',
  }}
  environment="production"
  onDeploy={() => executeDeploy()}
  onCancel={() => closeGate()}
  onSaveAsPR={() => createPR()}
  onFixIssues={() => navigateToEditor()}
/>

// Fast-track for dev environment
<DeployGate
  resources={resources}
  validationResults={results}
  costSummary={costs}
  bicepFiles={files}
  target={devTarget}
  environment="dev"
  onDeploy={() => executeDeploy()}
  onCancel={() => closeGate()}
/>
```
