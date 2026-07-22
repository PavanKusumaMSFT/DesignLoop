# AGENTS.md — Azure Portal POC

This file governs how AI agents (GitHub Copilot, Figma MCP, etc.) generate and modify code in this repository.
Read this before writing any code. Non-negotiable rules are marked 🚫.

---

## Stack at a Glance

| Layer            | Technology                                                                                                     | Notes                                                           |
| ---------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Framework        | Next.js 14, App Router, `output: "export"`                                                                     | Static site — no server functions                               |
| UI               | Fluent UI React v9 (`@fluentui/react-components`)                                                              | Only UI library — do NOT use Radix, shadcn, MUI                 |
| Agent/Copilot UI | `@fluentui-copilot/*` (see Fluent Copilot section below)                                                       | Chat, agent, AI surfaces — extends Fluent v9, not a replacement |
| Styling          | `makeStyles` + Fluent `tokens`                                                                                 | 🚫 No Tailwind classes, no inline `style={}`, no CSS modules    |
| Icons            | `@fluentui/react-icons` (UI chrome) + `public/azure-service-icons/` (service logos) + `public/icons/` (custom) | 🚫 No Lucide, no inline SVG, no raster icons                    |
| Auth             | MSAL (`@azure/msal-react`)                                                                                     | Microsoft accounts only                                         |
| State            | React hooks                                                                                                    | No Redux, no Zustand                                            |

---

## 🚫 Forbidden Patterns — Reject These Without Exception

```tsx
// ❌ Inline styles
<div style={{ color: '#333', padding: '16px' }} />

// ❌ Tailwind classes
<div className="flex items-center gap-4 text-blue-600" />

// ❌ Hardcoded non-brand colors
color: '#6b7280'   // use tokens.colorNeutralForeground3

// ❌ Radix UI
import { Dialog } from '@radix-ui/react-dialog'

// ❌ Lucide icons
import { Search } from 'lucide-react'

// ❌ Inline SVG
<svg xmlns="..."><path d="..." /></svg>

// ❌ CSS modules
import styles from './thing.module.css'

// ❌ Emoji in UI text or labels
<Text>🚀 Deploy your app</Text>  // use plain text or Fluent icons

// ❌ Creating a component that already exists anywhere in components/
```

Azure brand blues are the ONLY allowed hardcoded hex values: `#0078D4`, `#106EBE`, `#005A9E`

---

## Required Styling Pattern

Every component file must use this exact pattern:

```tsx
import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";

// Required alias — lets tokens work without TypeScript errors on dynamic keys
type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow4,
  },
  title: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
});
```

### Common Token Reference

#### Colors — "Instead of X, Use Y"

| Hardcoded Value                 | Fluent Token                       | Purpose                   |
| ------------------------------- | ---------------------------------- | ------------------------- |
| `#ffffff`, `white`              | `colorNeutralBackground1`          | Page/surface background   |
| `#fafafa`, `#f8fafc`            | `colorNeutralBackground2`          | Card/subtle background    |
| `#f5f5f5`, `#f1f5f9`            | `colorNeutralBackground3`          | Hover/tertiary background |
| `#242424`, `#333`, `#1e293b`    | `colorNeutralForeground1`          | Primary text              |
| `#616161`, `#475569`            | `colorNeutralForeground2`          | Secondary text            |
| `#9e9e9e`, `#707070`, `#94a3b8` | `colorNeutralForeground3`          | Muted/caption text        |
| `#d1d1d1`, `#cbd5e1`            | `colorNeutralStroke1`              | Primary border            |
| `#e0e0e0`, `#e5e7eb`            | `colorNeutralStroke2`              | Subtle border             |
| `#0078d4`                       | `colorBrandForeground1`            | Brand text/links          |
| `#0078d4` on backgrounds        | `colorBrandBackground`             | Brand-colored surfaces    |
| `#d13438`, `red`                | `colorPaletteRedForeground1`       | Error/danger text         |
| `#107c10`, `green`              | `colorPaletteGreenForeground1`     | Success text              |
| `#e3a400`, `orange`             | `colorPaletteYellowForeground1`    | Warning text              |
| `rgba(0,0,0,0.*)` shadows       | `shadow4` / `shadow8` / `shadow16` | Elevation shadows         |

Only allowed literal colors: `transparent`, `currentColor`, `inherit`, `none`, and Azure brand blues (`#0078D4`, `#106EBE`, `#005A9E`).

#### Typography

| Hardcoded Value     | Fluent Token         | Resolved |
| ------------------- | -------------------- | -------- |
| `font-size: 10px`   | `fontSizeBase100`    | 10px     |
| `font-size: 12px`   | `fontSizeBase200`    | 12px     |
| `font-size: 14px`   | `fontSizeBase300`    | 14px     |
| `font-size: 16px`   | `fontSizeBase400`    | 16px     |
| `font-size: 20px`   | `fontSizeBase500`    | 20px     |
| `font-size: 24px`   | `fontSizeBase600`    | 24px     |
| `font-size: 28px`   | `fontSizeBase700`    | 28px     |
| `font-size: 32px`   | `fontSizeHero800`    | 32px     |
| `font-size: 40px`   | `fontSizeHero900`    | 40px     |
| `font-weight: 400`  | `fontWeightRegular`  | 400      |
| `font-weight: 500`  | `fontWeightMedium`   | 500      |
| `font-weight: 600`  | `fontWeightSemibold` | 600      |
| `line-height: 16px` | `lineHeightBase200`  | 16px     |
| `line-height: 20px` | `lineHeightBase300`  | 20px     |
| `line-height: 22px` | `lineHeightBase400`  | 22px     |

🚫 `fontWeightBold` (700) does NOT exist in Fluent tokens. Use `fontWeightSemibold` (600).

#### Spacing (4px grid)

| Hardcoded Value | Fluent Token                                  |
| --------------- | --------------------------------------------- |
| `2px`           | `spacingHorizontalXXS` / `spacingVerticalXXS` |
| `4px`           | `spacingHorizontalXS` / `spacingVerticalXS`   |
| `8px`           | `spacingHorizontalS` / `spacingVerticalS`     |
| `12px`          | `spacingHorizontalM` / `spacingVerticalM`     |
| `16px`          | `spacingHorizontalL` / `spacingVerticalL`     |
| `20px`          | `spacingHorizontalXL` / `spacingVerticalXL`   |
| `24px`          | `spacingHorizontalXXL` / `spacingVerticalXXL` |

Exceptions: `0`, `100%`, `max-width` constraints, grid templates, and layout constants (`1200px`, `48px 32px`) are fine as literals.

#### Border Radius, Shadows, Transitions

| Hardcoded Value                 | Fluent Token             |
| ------------------------------- | ------------------------ |
| `border-radius: 2px`            | `borderRadiusSmall`      |
| `border-radius: 4px`            | `borderRadiusMedium`     |
| `border-radius: 6px`            | `borderRadiusLarge`      |
| `border-radius: 8px`            | `borderRadiusXLarge`     |
| `border-radius: 12px`           | `borderRadius2XLarge`    |
| `border-radius: 16px`           | `borderRadius3XLarge`    |
| `border-radius: 50%` / `9999px` | `borderRadiusCircular`   |
| `box-shadow: 0 1px 2px ...`     | `shadow2`                |
| `box-shadow: 0 2px 4px ...`     | `shadow4`                |
| `box-shadow: 0 4px 8px ...`     | `shadow8`                |
| `box-shadow: 0 8px 16px ...`    | `shadow16`               |
| `transition: ... 0.1s`          | `durationFaster` (100ms) |
| `transition: ... 0.15s`         | `durationFast` (150ms)   |
| `transition: ... 0.2s`          | `durationNormal` (200ms) |

---

## Component Discovery — Check Before Creating Anything

🚫 **Do not create a component if a similar one already exists anywhere in `components/`.**

### Search Order (mandatory before creating any new component)

1. **`components/shared/`** — canonical building blocks and page shells (listed below)
2. **`components/projects/*/`** — project-scoped components that may be format-agnostic and importable
3. **AGENTS.md inventory tables** — quick reference for known shared components

Search by **function name, props pattern, and purpose** — not just file name. Example:

```bash
# Find any card that displays metrics
grep -rn "export.*MetricCard\|interface.*MetricCard" components/
# Find anything that renders resource status
grep -rn "ResourceStatus\|resource.*table\|resource.*list" components/ --include="*.tsx"
```

A component in `components/projects/optimize/reasoning-card.tsx` can be imported by any other project:

```tsx
import ReasoningCard from "../optimize/reasoning-card"; // cross-project import is fine
```

### Creating New Components

When building a new composed component (not a one-off page layout):

1. **Create it in your project folder** — `components/projects/<your-project>/`
2. **Make it format-agnostic** — typed props interface, no hardcoded project data, no parent state assumptions
3. **Make it visually flexible** — expose customization props so consumers can adapt the component without forking:
   - `className` — card/container root overrides
   - `borderRadius` — corner radius override (accepts Fluent tokens like `tokens.borderRadiusXLarge`)
   - `shadow` / `hoverShadow` — rest and hover elevation overrides
   - `titleClassName` / `descriptionClassName` — text styling overrides via `makeStyles`
   - Apply dynamic overrides with inline `style` only for truly dynamic values (prop-driven); use `mergeClasses` for className composition
4. **Export with a clear name** — `export default function IncidentTimeline({ ... }: IncidentTimelineProps)`
5. **Add a JSDoc summary** so grep and Copilot can discover it:

```tsx
/** Displays a chronological timeline of incident events with severity badges and timestamps. */
export default function IncidentTimeline({ events, title }: IncidentTimelineProps) {
```

6. **Promote to `components/shared/`** only when a second team actively needs it

7. **Register in AGENTS.md** — run the promote script to add the component to the inventory:

```bash
pnpm promote-component components/shared/my-component.tsx \
  --use-for "Brief description of what this component does" \
  --composed-from "Card, Text, Badge" \
  --section "Composed Building Blocks"
```

The script extracts the component name, props, and Fluent imports automatically. Use `--dry-run` to preview. This keeps the inventory growing as the library grows — each new shared component makes the next design-to-code pass more accurate.

This way every component is discoverable via search, importable across projects, and automatically registered in AGENTS.md.

### Page Shell Components

| Component             | Import Path                               | Use For                                                                             |
| --------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------- |
| `ProjectLayout`       | `components/shared/project-layout`        | Wraps every project page. Includes FluentProvider, ProjectsMenu, NavigationProvider |
| `AzureHeaderBuildMVP` | `components/shared/azure-header-buildmvp` | Main header with search + nav (build-2026 / v1-ideal horizon)                       |
| `AzureHeaderP1`       | `components/shared/azure-header-p1`       | Phase 1 header variant                                                              |
| `TopNav`              | `components/shared/top-nav`               | Vision/long-term header                                                             |
| `NavigationPanel`     | `components/shared/navigation-panel`      | Left sidebar nav                                                                    |
| `ProjectsMenu`        | `components/shared/projects-menu`         | Project switcher menu                                                               |
| `PageBreadcrumb`      | `components/shared/page-breadcrumb`       | Breadcrumb nav bar (Home › Section › Current)                                       |
| `PageHeader`          | `components/shared/page-header`           | Page title header with icon, back/close buttons                                     |

### Search + Suggestions

| Component                       | Import Path                                          | Use For                               |
| ------------------------------- | ---------------------------------------------------- | ------------------------------------- |
| `HpCopilotSuggestionPanel`      | `components/shared/hp-copilot-suggestion-panel`      | Main search suggestion panel          |
| `SearchSuggestionPanelBuildMVP` | `components/shared/search-suggestion-panel-buildmvp` | Build MVP search results              |
| `SearchSuggestionPanelP1`       | `components/shared/search-suggestion-panel-p1`       | P1 search variant                     |
| `SearchFullPageResults`         | `components/shared/search-fullpage-results`          | Full page search results              |
| `SimpleSearchSuggestions`       | `components/shared/simple-search-suggestions`        | Lightweight suggestion list           |
| `EnhancedInputBar`              | `components/shared/enhanced-input-bar`               | Search input with copilot integration |

### Homepage / FRE

| Component     | Import Path                      | Use For                       |
| ------------- | -------------------------------- | ----------------------------- |
| `HpFre`       | `components/shared/hp-fre`       | First Run Experience homepage |
| `HpReturning` | `components/shared/hp-returning` | Returning user homepage       |
| `FreServices` | `components/shared/fre-services` | Service selection in FRE flow |

### Level 1 Pages (Portal Sections)

| Component             | Import Path                              | Use For                      |
| --------------------- | ---------------------------------------- | ---------------------------- |
| `Level1Discover`      | `components/shared/level1-discover`      | Discover/marketplace section |
| `Level1Build`         | `components/shared/level1-build`         | Build/create section         |
| `Level1Manage`        | `components/shared/level1-manage`        | Manage/monitor section       |
| `Level2ProjectDetail` | `components/shared/level2-projectdetail` | Project detail view          |

### Agent / Copilot UI

| Component                    | Import Path                                      | Use For                                                                     |
| ---------------------------- | ------------------------------------------------ | --------------------------------------------------------------------------- |
| `AgentLayout`                | `components/shared/agent-layout`                 | **Layout shell** for any full-screen agent (sidebar + chat + input + panel) |
| `DockedChatPanel`            | `components/shared/docked-chat-panel`            | **Right-side panel** that docks a chat/agent onto an existing page          |
| `AgentWelcome`               | `components/shared/agent-welcome`                | Agent onboarding/welcome                                                    |
| `AgentWelcomeClean`          | `components/shared/agent-welcome-clean`          | Minimal agent welcome variant                                               |
| `AgentImmersive`             | `components/shared/agent-immersive`              | Full-screen immersive agent                                                 |
| `IncidentInvestigationCard`  | `components/shared/incident-investigation-card`  | Copilot investigation card                                                  |
| `WorkloadRecommendationCard` | `components/shared/workload-recommendation-card` | AI recommendation card                                                      |
| `ResolutionPlanCard`         | `components/shared/resolution-plan-card`         | Resolution plan                                                             |
| `ResolutionReportCard`       | `components/shared/resolution-report-card`       | Resolution summary report                                                   |
| `CodeViewerPanel`            | `components/shared/code-viewer-panel`            | Sliding side panel for Terraform/Bicep/code display                         |
| `useTypewriter`              | `components/shared/use-typewriter`               | Typewriter text animation hook for agent chat messages                      |

#### Agent Building Blocks (compose these for new agent pages)

These were extracted from the OptimizationAgent reference implementation. Use them to build new full-screen agent experiences instead of coding from scratch.

| Component                     | Import Path                                                 | Use For                                                          |
| ----------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------- |
| `AgentSidebar`                | `components/projects/optimize/agent-sidebar`                | CopilotNavDrawer with agents list, chat history, collapse toggle |
| `AgentHeader`                 | `components/projects/optimize/agent-header`                 | Title bar with AzureHeaderBuildMVP, docking, action buttons      |
| `ChatInputSection`            | `components/projects/optimize/chat-input-section`           | Chat input with mic/add/send buttons + AI disclaimer             |
| `FeedbackSection`             | `components/projects/optimize/feedback-section`             | Like/dislike/criteria buttons after agent responses              |
| `ProjectCreationCard`         | `components/projects/optimize/project-creation-card`        | Project name form with advanced options and create simulation    |
| `CloudShellPanel`             | `components/projects/optimize/cloud-shell-panel`            | Terminal simulation side panel                                   |
| `ReasoningCard`               | `components/projects/optimize/reasoning-card`               | Expandable thinking steps with progress animation                |
| `OptimizationRecommendations` | `components/projects/optimize/optimization-recommendations` | Sequential recommendation cards with reveal animation            |
| `useConversationFlow`         | `components/projects/optimize/use-conversation-flow`        | State machine hook for multi-step agent conversation flow        |

### Deployment Flow

| Component                        | Import Path                                           | Use For                                                                     |
| -------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------- |
| `DeploymentPlanCard`             | `components/shared/deployment-plan-card`              | Deployment plan preview                                                     |
| `DeploymentProgressCard`         | `components/shared/deployment-progress-card`          | In-progress deployment                                                      |
| `DeploymentCompleteCard`         | `components/shared/deployment-complete-card`          | Deployment success                                                          |
| `DeploymentCompleteResourceCard` | `components/shared/deployment-complete-resource-card` | Resource created confirmation                                               |
| `DeploymentSuccessCard`          | `components/shared/deployment-success-card`           | Wizard completion page with accordion sections, next-steps grid, and footer |

### Create Wizards

| Component                 | Import Path                                    | Use For                    |
| ------------------------- | ---------------------------------------------- | -------------------------- |
| `CreateVmWizard`          | `components/shared/create-vm-wizard`           | VM creation flow           |
| `CreateWebappWizard`      | `components/shared/create-webapp-wizard`       | Web app creation flow      |
| `CreateFunctionAppWizard` | `components/shared/create-function-app-wizard` | Function app creation flow |
| `CreatePostgresWizard`    | `components/shared/create-postgres-wizard`     | PostgreSQL creation flow   |

### Wizard Infrastructure (compose new create wizards from these)

These components are the shared building blocks extracted from the 5 create wizards above. Use them to scaffold new create flows — you get the layout, step nav, cost panel, section headers, and action bar for free and only need to write the unique form fields.

| Component         | Import Path                           | Use For                                                                                     |
| ----------------- | ------------------------------------- | ------------------------------------------------------------------------------------------- |
| `WizardLayout`    | `components/shared/wizard-layout`     | 3-column grid shell: step nav (180px) + content (1fr) + optional right panel (280px)        |
| `WizardStepNav`   | `components/shared/wizard-step-nav`   | Vertical step navigation — flat TabList mode or grouped/collapsible mode with copilot icons |
| `WizardCostPanel` | `components/shared/wizard-cost-panel` | Cost estimation panel with line items, totals, skeleton loading, disclaimers                |
| `WizardSection`   | `components/shared/wizard-section`    | Titled section within a step (e.g. "Project details") with optional divider + description   |
| `WizardActionBar` | `components/shared/wizard-action-bar` | Bottom action bar: Previous / Next / Skip to review / Create / Save draft                   |

### Utility / Layout

| Component            | Import Path                                        | Use For                                                                                      |
| -------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `LoadingWrapper`     | `components/shared/loading-wrapper`                | Auth-gated loading state                                                                     |
| `ThemeProvider`      | `components/shared/theme-provider`                 | Theme context (wraps FluentProvider)                                                         |
| `SignupModal`        | `components/shared/signup-modal`                   | Sign-up modal dialog                                                                         |
| `NextStepsCarousel`  | `components/shared/next-steps-carousel`            | Post-action next steps                                                                       |
| `AllServicesPage`    | `components/projects/build-2026/all-services-page` | All Azure services catalog (canonical — has filter pills, favorites, right nav, scroll-sync) |
| `allServicesData`    | `components/projects/build-2026/all-services-data` | Service/category data + icon paths (706 services, reusable `Service[]` + `Category[]` types) |
| `CopilotRegularIcon` | `components/shared/copilot-regular-icon`           | Copilot branded icon                                                                         |

### Composed Building Blocks (NEW — use these for new pages)

These components compose Fluent v9 primitives into reusable Azure portal patterns. Use them instead of building inline JSX.

| Component               | Import Path                                 | Composed From                                                          | Use For                                                                        |
| ----------------------- | ------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `ActionCard`            | `components/shared/action-card`             | `Card`, `CardHeader`, `Text`, `Button`, Fluent icon                    | Any card with icon + title + description + CTA button                          |
| `ActionCardGrid`        | `components/shared/action-card`             | CSS Grid wrapper                                                       | Responsive grid wrapper for ActionCards (4→2→1 cols)                           |
| `ServiceTile`           | `components/shared/service-tile`            | `Card`, `Text`, `Badge`, image                                         | Azure service selection tile (icon + name + description + badge)               |
| `ServiceTileGrid`       | `components/shared/service-tile`            | CSS Grid wrapper                                                       | Responsive grid wrapper for ServiceTiles (3→2→1 cols)                          |
| `ResourceStatusTable`   | `components/shared/resource-status-table`   | `Table`, `TableHeader`, `TableRow`, `TableCell`, `Badge`, `Text`       | Resource table with name, type, status, alerts, cost columns                   |
| `AlertSummaryCard`      | `components/shared/alert-summary-card`      | `Card`, `Text`, `Button`, stat boxes                                   | Alert/health summary with stat boxes and action buttons                        |
| `CostSummaryCard`       | `components/shared/cost-summary-card`       | `Card`, `Text`, `Button`, stat grid                                    | Cost/spending summary with stat grid and action button                         |
| `MetricCard`            | `components/shared/metric-card`             | `Card`, `Text`, `Badge`                                                | Any single KPI tile with label, value, unit, badge                             |
| `MetricCardGrid`        | `components/shared/metric-card`             | Flex-wrap wrapper                                                      | Flex-wrap grid for MetricCards                                                 |
| `DockedChatPanel`       | `components/shared/docked-chat-panel`       | `makeStyles` shell, `Button`, `Text`                                   | Right-side panel that docks any chat/agent onto an existing page               |
| `DeploymentSuccessCard` | `components/shared/deployment-success-card` | `Text`, `Button`, `Link`, accordion, next-steps grid                   | Wizard completion page: accordion sections + next-steps cards + footer buttons |
| `PageBreadcrumb`        | `components/shared/page-breadcrumb`         | `nav`, `button`, `span`, `makeStyles`                                  | Breadcrumb navigation bar with › separators. Last item = current page          |
| `PageHeader`            | `components/shared/page-header`             | `header`, `Button`, `Text`, `ChevronLeft20Regular`, `Dismiss20Regular` | Page header with icon, title, description, optional back/close buttons         |

---

## V8 (Classic Blade) Components — Separate Design System

**TL;DR:** A second, intentional design system that recreates the classic Azure portal blade aesthetic. Lives alongside the Fluent v9 components in `components/shared/` but follows a completely different styling contract. Use these only when you need the classic blade look (e.g. [`resource-manager-mvp`](app/resource-manager-mvp/)).

### What makes v8 different

- Every file is prefixed `v8-` (e.g. `v8-site-header.tsx`, `v8-data-grid.tsx`, `v8-icons/commands/add.svg`).
- **Not** Fluent-based. Uses plain CSS files with `ap-*` class names and custom-property tokens (`--blue-50`, `--neutral-170`, `--text-primary`) defined in [`styles/v8-tokens.css`](styles/v8-tokens.css).
- Icons are React components loaded via SVGR: `import AddIcon from "./v8-icons/commands/add.svg?react"`. The webpack rule is already configured in [`next.config.mjs`](next.config.mjs).
- Each `v8-*.tsx` imports its own sibling `v8-*.css` — Next.js bundles them automatically; **do not** add `@import` lines to `app/globals.css`.

### Styling rules **inside** `v8-*` files

The normal repo rules (no inline CSS, use `makeStyles`, use Fluent tokens, no hardcoded colors) **do NOT apply** inside `v8-*` files. They are a self-contained system:

- ✅ Sibling `.css` files with `ap-*` class names
- ✅ `var(--blue-50)` style custom properties from `styles/v8-tokens.css`
- ✅ SVGR `svg?react` imports from `./v8-icons/`
- 🚫 Don't mix Fluent `tokens` / `makeStyles` inside a `v8-*` file
- 🚫 Don't import a `v8-*` component's CSS from outside — each TSX self-loads its CSS

### Styling rules when **consuming** v8 components

- Import like any other shared component: `import { SiteHeader } from "../../shared/v8-site-header"`.
- Exported symbol names are **PascalCase** and unchanged from the original `azure-proto` version (`SiteHeader`, `BladeHeader`, `DataGrid`, `FilterPill`, etc.).
- Don't mix Fluent v9 primitives and v8 primitives in the same composite component. Pick one system per page/block.
- New pages should default to the Fluent v9 components; reach for `v8-*` only to recreate a classic-portal blade.

### Inventory

**Layout & chrome:** `v8-site-header`, `v8-blade-header`, `v8-breadcrumb`, `v8-footer`, `v8-service-nav`, `v8-context-pane`, `v8-toolbar`, `v8-tabs`, `v8-query-tabs`

**Form controls:** `v8-button`, `v8-checkbox`, `v8-dropdown`, `v8-radio`, `v8-text-input`, `v8-form-field`, `v8-filter-bar`, `v8-filter-menu`, `v8-filter-pill`, `v8-header-search`

**Data display:** `v8-data-grid`, `v8-properties`, `v8-summary-card`, `v8-create-summary`, `v8-essentials`

**Content:** `v8-card`, `v8-info-box`, `v8-menu`, `v8-tag`, `v8-code-editor`, `v8-copilot-button`

**Charts:** `v8-chart-area`, `v8-chart-bar`, `v8-chart-burndown`, `v8-chart-heatmap`, `v8-chart-line`, `v8-chart-pie`, `v8-chart-radar`, `v8-chart-sparkline`, `v8-chart-legend`, `v8-chart-tooltip` (shared base: `v8-chart.css`, helpers in `v8-chart-utils/`)

**Copilot:** `v8-copilot-provider`, `v8-copilot-sidecar`, `v8-copilot-message`, `v8-copilot-input`, `v8-copilot-card`, `v8-copilot-warm-start`, `v8-copilot-toast`, `v8-copilot-toast-icon`, `v8-copilot-toast-stack`, `v8-copilot-default-card-registry`, `v8-copilot-types` (built-in cards: `v8-copilot-card-code`, `v8-copilot-card-data-grid`, `v8-copilot-card-resource`)

**Icons:** all under `components/shared/v8-icons/{brand,commands,services,status,avatars,fluent}/*.svg` — import with `?react` suffix.

> Do **not** promote v8 components via `pnpm promote-component`. That script is for the Fluent v9 inventory above; v8 is a deliberately separate system.

---

## Fluent UI v9 — Correct Patterns

### Standard Component Imports

The list below covers the most commonly used components, but `@fluentui/react-components` exports **many more** (Field, Combobox, Drawer, InfoLabel, Accordion, etc.). Before building a custom UI element, check what the library already provides:

```bash
# Search for a specific component by keyword
node -e "console.log(Object.keys(require('@fluentui/react-components')).filter(k => /^[A-Z]/.test(k) && /keyword/i.test(k)).join('\n'))"

# Examples: find all Dialog-related exports, or all Field-related, or all Nav-related
node -e "console.log(Object.keys(require('@fluentui/react-components')).filter(k => /^[A-Z]/.test(k) && /dialog/i.test(k)).join('\n'))"
```

```tsx
import {
  Button,
  CompoundButton,
  Card,
  CardHeader,
  CardPreview,
  Text,
  Title1,
  Title2,
  Subtitle1,
  Subtitle2,
  Body1,
  Body2,
  Caption1,
  Badge,
  Spinner,
  Input,
  SearchBox,
  TabList,
  Tab,
  TabPanel,
  Tooltip,
  MessageBar,
  MessageBarBody,
  Avatar,
  Divider,
  Overflow,
  OverflowItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
```

### Icon Imports

```tsx
import {
  Search24Regular,
  Search24Filled,
  Add24Regular,
  Dismiss24Regular,
  ArrowLeft24Regular,
  ChevronRight12Regular,
  ChevronDown20Regular,
  Send16Regular,
  Send24Regular,
  Sparkle16Filled,
  Sparkle20Regular,
  Settings20Regular,
  Filter16Regular,
  PlugConnected24Regular,
  CloudArrowUp24Regular,
  DatabaseMultiple24Regular,
  bundleIcon,
} from "@fluentui/react-icons";

// Bundled icon (Filled on hover, Regular by default) — preferred pattern
const SendIcon = bundleIcon(Send16Regular, Send16Regular);
```

### Page Structure Pattern

```tsx
"use client";

import ProjectLayout from "../../components/shared/project-layout";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
  },
  header: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: tokens.spacingHorizontalL,
  },
});

export default function MyProjectPage() {
  const styles = useStyles();
  return (
    <ProjectLayout id="my-project-id">
      <div className={styles.page}>
        <div className={styles.header}>
          <Text as="h1" size={800} weight="semibold">
            Page Title
          </Text>
        </div>
        <div className={styles.grid}>{/* content */}</div>
      </div>
    </ProjectLayout>
  );
}
```

---

## Fluent Copilot — Agent & AI UI Patterns

`@fluentui-copilot` is a **companion library** to Fluent UI v9 — not a replacement. It provides purpose-built primitives for chat, agent, and AI surfaces that compose on top of `@fluentui/react-components`. Both libraries can (and often do) appear in the same page — a dashboard built with Fluent v9 cards + a docked copilot panel using Fluent Copilot components.

### When to Use Each Library

| UI Pattern                                  | Library                                            | Example                 |
| ------------------------------------------- | -------------------------------------------------- | ----------------------- |
| Buttons, cards, inputs, forms, tables, tabs | `@fluentui/react-components`                       | Any page UI             |
| Chat threads, message bubbles, feedback     | `@fluentui-copilot/react-copilot`                  | Agent chat area         |
| Agent sidebar with collapsible nav          | `@fluentui-copilot/react-copilot` (Nav components) | Agent sidebar           |
| AI thinking/loading animation               | `@fluentui-copilot/react-latency`                  | Reasoning steps         |
| Streaming/typing text animation             | `@fluentui-copilot/react-morse-code`               | Wizard AI responses     |
| Sparkle icons, copilot icon                 | `@fluentui/react-icons`                            | Tab indicators, buttons |

### Sub-Packages

| Package                              | Purpose                  | Key Exports                                                                                                                                                                                   |
| ------------------------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@fluentui-copilot/react-copilot`    | Core agent/chat UI       | `CopilotProvider`, `CopilotChat`, `CopilotMessage`, `ChatInput`, Nav drawer components, `FeedbackButtons`, `OutputCard`, `EntityCard`, `Citation`, `Attachment`, `SensitivityLabel`, and more |
| `@fluentui-copilot/react-latency`    | Loading/thinking states  | `LatencyLoader`                                                                                                                                                                               |
| `@fluentui-copilot/react-morse-code` | Streaming text animation | `MorseCode`                                                                                                                                                                                   |

> **Important — Discovery before building:** The `react-copilot` package exports **60+ components** and the library evolves between versions. Before building any custom AI/agent UI element, **actively check what the installed library provides:**
>
> ```bash
> # List all exports from the installed version
> node -e "console.log(Object.keys(require('@fluentui-copilot/react-copilot')).sort().join('\n'))"
>
> # Search for a specific pattern (e.g., anything related to "Nav" or "Card")
> node -e "console.log(Object.keys(require('@fluentui-copilot/react-copilot')).filter(k => /nav|card|badge/i.test(k)).join('\n'))"
>
> # Check the installed version
> node -e "console.log(require('@fluentui-copilot/react-copilot/package.json').version)"
> ```
>
> The tables in this document are a snapshot — the library may have added new components since they were last updated. When in doubt, grep the actual exports.

### Reference Implementations

| Pattern                                        | File                                                  | Notes                                                   |
| ---------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------- |
| Full copilot agent (sidebar + chat + AI cards) | `components/projects/optimize/optimization-agent.tsx` | Most complete — uses nav categories, latency, reasoning |
| Reusable agent shell                           | `components/shared/agent-layout.tsx`                  | Layout wrapper with default nav drawer                  |
| Wizard with copilot integration                | `components/projects/create/create-vm-wizard.tsx`     | CopilotProvider + MorseCode in a form wizard            |

### Core Chat Pattern

```tsx
import {
  CopilotProvider,
  CopilotChat,
  CopilotMessage,
  UserMessage,
  ChatInput,
  FeedbackButtons,
} from "@fluentui-copilot/react-copilot";

import { LatencyLoader } from "@fluentui-copilot/react-latency";

// Minimal agent chat pattern
function AgentChat() {
  return (
    <CopilotProvider>
      <CopilotChat>
        <CopilotMessage>Hello! How can I help you today?</CopilotMessage>
        <UserMessage>Show me my resources</UserMessage>
        {isLoading && <LatencyLoader />}
        <ChatInput placeholder="Ask Copilot..." />
      </CopilotChat>
    </CopilotProvider>
  );
}
```

### Nav Drawer — Sidebar with Collapsible Categories

The library provides a full nav drawer hierarchy for agent sidebars. Use these instead of building custom `<div>` + `<button>` sidebars:

```tsx
import {
  CopilotNavDrawer,
  CopilotNavDrawerHeader,
  CopilotNavDrawerBody,
  CopilotNavDrawerFooter,
  CopilotNavItem,
  CopilotNavCategory,
  CopilotNavCategoryItem,
  CopilotNavSubItemGroup,
  CopilotNavSubItem,
} from "@fluentui-copilot/react-copilot";

// Sidebar with collapsible category groups
<CopilotNavDrawer
  open={true}
  type="inline"
  selectedValue="current-chat"
  defaultOpenCategories={["agents", "chats"]}
>
  <CopilotNavDrawerHeader>
    {/* logo + collapse toggle */}
  </CopilotNavDrawerHeader>
  <CopilotNavDrawerBody>
    <CopilotNavItem icon={<ChatEmpty20Regular />} value="new-chat">
      New chat
    </CopilotNavItem>

    <CopilotNavCategory value="agents">
      <CopilotNavCategoryItem>Agents</CopilotNavCategoryItem>
      <CopilotNavSubItemGroup>
        <CopilotNavSubItem value="agent-1" icon={<AgentIcon />}>
          My Agent
        </CopilotNavSubItem>
      </CopilotNavSubItemGroup>
    </CopilotNavCategory>

    <CopilotNavCategory value="chats">
      <CopilotNavCategoryItem>Chats</CopilotNavCategoryItem>
      <CopilotNavSubItemGroup>
        <CopilotNavSubItem value="chat-1">Previous chat</CopilotNavSubItem>
      </CopilotNavSubItemGroup>
    </CopilotNavCategory>
  </CopilotNavDrawerBody>
</CopilotNavDrawer>;
```

**Key props:**

- `defaultOpenCategories={["agents", "chats"]}` — expand multiple categories on mount
- `selectedValue="current-chat"` — highlight the active item
- `defaultSelectedCategoryValue="chats"` — mark the active category

### Additional Components Worth Knowing

These are available in the library but not always shown in basic examples. Check the library before building custom versions:

| Component                       | Use For                                             |
| ------------------------------- | --------------------------------------------------- |
| `OutputCard`                    | AI-generated content card (structured output)       |
| `EntityCard` / `EntityCardList` | Resource/entity cards within chat                   |
| `ReasonMarker`                  | Reasoning step indicator                            |
| `Citation` / `Reference`        | Source attribution in AI responses                  |
| `Attachment` / `AttachmentList` | File attachments in chat                            |
| `Snippet`                       | Code snippet block                                  |
| `SensitivityLabel`              | Data sensitivity indicator                          |
| `SendButton`                    | Styled send button for chat input                   |
| `PromptStarter` / `Suggestion`  | Prompt suggestion chips                             |
| `FirstRunExperience`            | Agent onboarding flow                               |
| `RunningStatusIcon`             | Active/running indicator on nav items               |
| `SplitCopilotNavItem`           | Nav item with status icon + action buttons on hover |

---

## Project Creation

To scaffold a new project, use the CLI script — do NOT create files manually:

```bash
pnpm create-project "project-id" \
  --team "TeamName" \
  --owner "Owner Name" \
  --experience <fre|manage|search|create|cost|agent|startups|other> \
  --horizon <build-2026|v1-ideal|vision> \
  --pillar <discover,build,manage,shell-intelligence> \
  --description "Brief description" \
  --tags "tag1, tag2"
```

This generates:

- `app/<project-id>/page.tsx`
- `components/projects/<project-id>/index.tsx`
- Registry entry in `data/projects.ts`

If the project already exists, only update the registry in `data/projects.ts`.

---

## Copilot Skills

Skills are prompt files in `.github/prompts/` that standardize common workflows. Users invoke them in Copilot Chat (e.g., `/figma-to-fluent`).

| Skill                 | Command                  | What It Does                                                                                   |
| --------------------- | ------------------------ | ---------------------------------------------------------------------------------------------- |
| Start Setup           | `/start-setup`           | First-run project setup — install prerequisites, clone, install deps, start dev server         |
| Create Project        | `/create-project`        | Scaffold a new project, run the CLI, and show a standardized summary table                     |
| Figma to Fluent       | `/figma-to-fluent`       | Convert a Figma design (screenshot or link) into Fluent UI v9 code                             |
| Component Audit       | `/component-audit`       | Check for design system violations — hardcoded colors, missed shared components, inline styles |
| Refactor to System    | `/refactor-to-system`    | Auto-fix violations: inline styles → makeStyles + tokens, hardcoded colors → Fluent tokens     |
| Generate Preview Link | `/generate-preview-link` | Create a PR and preview deployment URL for stakeholders                                        |
| Publish to Production | `/publish-to-production` | Run audit + refactor, verify the build, squash-merge to main, clean up the branch              |
| Delete Preview        | `/delete-preview`        | Close the PR, delete the remote branch, and free up the staging slot                           |

**CLI Scripts** (run with `pnpm`):

| Script                | Command                             | What It Does                                                                                          |
| --------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Create Project        | `pnpm create-project <id> [flags]`  | Scaffold project files + register in `data/projects.ts`                                               |
| Promote Component     | `pnpm promote-component <path>`     | Register a shared component in AGENTS.md — extracts name, props, Fluent imports, appends to inventory |

### Skill Lifecycle

```
/start-setup → /create-project → build (/figma-to-fluent) → /generate-preview-link → share with stakeholders
                                                                   ↓                         ↓
                                                           /publish-to-production      /delete-preview
                                                           (go live on main)       (clean up, done experimenting)
```

---

## Page Layout Constants

| Property          | Value                                        |
| ----------------- | -------------------------------------------- |
| Content max-width | `1200px` (normal), `800px` (with side panel) |
| Content padding   | `48px 32px`                                  |
| Section spacing   | `48px–64px`                                  |
| Card grid         | `repeat(4, 1fr)`, gap `24px`                 |
| Breakpoints       | `1200px` → 2 cols, `768px` → 1 col           |

---

## Page Composition Patterns

🚫 **Do NOT build pages as monolithic single-file components.** Compose pages from shared components. These patterns are the "gold standard" — follow them when creating new pages.

### Pattern 1: Homepage / FRE Page

A First Run Experience page = header + search + action cards + service tiles. Use composed building blocks — do NOT build cards inline.

```tsx
"use client";

import ProjectLayout from "../../components/shared/project-layout";
import ActionCard, {
  ActionCardGrid,
} from "../../components/shared/action-card";
import ServiceTile, {
  ServiceTileGrid,
} from "../../components/shared/service-tile";
import NextStepsCarousel from "../../components/shared/next-steps-carousel";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
  },
  welcomeSection: {
    textAlign: "center",
    marginBottom: tokens.spacingVerticalXXL,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalM,
  },
});

export default function MyFrePage() {
  const styles = useStyles();

  return (
    <ProjectLayout id="my-project-id">
      <div className={styles.page}>
        <div className={styles.welcomeSection}>
          <Text as="h1" size={800} weight="semibold">
            Welcome to Azure
          </Text>
        </div>

        {/* Action cards — what can the user do? */}
        <ActionCardGrid>
          <ActionCard
            icon="/icons/templates.svg"
            title="Start with a template"
            description="Deploy in minutes using pre-made templates."
            buttonText="Browse templates"
            onClick={() => {
              /* navigate */
            }}
          />
          <ActionCard
            icon="/icons/Service.svg"
            title="Explore services"
            description="Choose the right solution for your use case."
            buttonText="Explore services"
            onClick={() => {
              /* navigate */
            }}
          />
          <ActionCard
            icon="/icons/aifoundry.svg"
            title="Play with AI"
            description="Create AI apps and agents using the latest models."
            buttonText="Go to AI Foundry"
            onClick={() => {
              /* navigate */
            }}
          />
        </ActionCardGrid>

        {/* Service selection tiles */}
        <Text className={styles.sectionTitle}>Popular services</Text>
        <ServiceTileGrid>
          <ServiceTile
            icon="/icons/Static-Web-Apps.svg"
            name="Web App"
            description="Host web apps without managing infrastructure."
            free
            onClick={() => {
              /* navigate */
            }}
          />
          <ServiceTile
            icon="/icons/virtual-machine.svg"
            name="Virtual machines"
            description="Build and run applications on scalable infrastructure."
            free
            onClick={() => {
              /* navigate */
            }}
          />
          <ServiceTile
            icon="/icons/SQL-Database.svg"
            name="SQL databases"
            description="Set up a scalable, secure relational database."
            free
            onClick={() => {
              /* navigate */
            }}
          />
        </ServiceTileGrid>
      </div>
    </ProjectLayout>
  );
}
```

### Pattern 2: Form / Create Page

Use Fluent `Field` + `Input` directly — do NOT create custom form wrappers.

```tsx
"use client";

import ProjectLayout from "../../components/shared/project-layout";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Field,
  Input,
  Dropdown,
  Option,
  Button,
  Card,
  Divider,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  page: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
  },
  header: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalM,
    marginTop: tokens.spacingVerticalL,
  },
});

export default function CreateResourcePage() {
  const styles = useStyles();

  return (
    <ProjectLayout id="my-project-id">
      <div className={styles.page}>
        <div className={styles.header}>
          <Text as="h1" size={800} weight="semibold">
            Create Web App
          </Text>
          <Text as="p" size={300}>
            Deploy a web application to Azure App Service
          </Text>
        </div>

        <Card>
          <div className={styles.form}>
            <Field label="Resource name" required>
              <Input placeholder="my-web-app" />
            </Field>

            <div className={styles.row}>
              <Field label="Subscription" required>
                <Dropdown placeholder="Select subscription">
                  <Option>Azure subscription 1</Option>
                </Dropdown>
              </Field>
              <Field label="Resource group" required>
                <Dropdown placeholder="Select or create">
                  <Option>my-resource-group</Option>
                </Dropdown>
              </Field>
            </div>

            <Field label="Region" required>
              <Dropdown placeholder="Select a region">
                <Option>West US</Option>
                <Option>East US</Option>
              </Dropdown>
            </Field>

            <Divider />

            <div className={styles.actions}>
              <Button appearance="secondary">Cancel</Button>
              <Button appearance="primary">Review + create</Button>
            </div>
          </div>
        </Card>
      </div>
    </ProjectLayout>
  );
}
```

### Pattern 3: Dashboard / Manage Page

Compose from composed building blocks. Use `MetricCard` for stats, `AlertSummaryCard` + `CostSummaryCard` for summary panels, `ResourceStatusTable` for resource lists.

```tsx
"use client";

import ProjectLayout from "../../components/shared/project-layout";
import MetricCard, {
  MetricCardGrid,
} from "../../components/shared/metric-card";
import AlertSummaryCard from "../../components/shared/alert-summary-card";
import CostSummaryCard from "../../components/shared/cost-summary-card";
import ResourceStatusTable from "../../components/shared/resource-status-table";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
} from "@fluentui/react-components";
import { Globe24Regular, Database24Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  page: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
  },
  section: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  summaryRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalXXL,
  },
});

export default function ManageDashboard() {
  const styles = useStyles();

  return (
    <ProjectLayout id="my-project-id">
      <div className={styles.page}>
        <Text as="h1" size={800} weight="semibold">
          Dashboard
        </Text>

        {/* Metrics row */}
        <div className={styles.section}>
          <MetricCardGrid>
            <MetricCard
              label="RESOURCES"
              value={12}
              badge="+2"
              badgeVariant="green"
            />
            <MetricCard
              label="MONTHLY SPEND"
              value="$42.50"
              badge="-8%"
              badgeVariant="green"
            />
            <MetricCard label="UPTIME" value="99.9" unit="%" />
            <MetricCard
              label="API CALLS"
              value="1.2"
              unit="K"
              badge="+12%"
              badgeVariant="neutral"
            />
          </MetricCardGrid>
        </div>

        {/* Alerts + Costs side by side */}
        <div className={styles.summaryRow}>
          <AlertSummaryCard
            stats={[
              { label: "Active alerts", value: 3 },
              { label: "Service issues", value: 0 },
            ]}
            subtitle="Monitor your resource health"
            primaryButtonText="View alerts"
            onPrimaryAction={() => {
              /* navigate */
            }}
          />
          <CostSummaryCard
            stats={[
              { label: "Monthly budget", value: "$10,000" },
              { label: "Remaining budget", value: "$8,234", highlight: true },
            ]}
            subtitle="Monthly spending on track"
            buttonText="View costs"
            onAction={() => {
              /* navigate */
            }}
          />
        </div>

        {/* Resource table */}
        <ResourceStatusTable
          title="Resources"
          resources={[
            {
              name: "my-web-app",
              type: "App Service",
              icon: Globe24Regular,
              alerts: 0,
              cost: "$2.45",
              lastActivity: "2 hours ago",
            },
            {
              name: "my-database",
              type: "SQL Database",
              icon: Database24Regular,
              alerts: 1,
              cost: "$8.90",
              lastActivity: "5 minutes ago",
            },
          ]}
        />
      </div>
    </ProjectLayout>
  );
}
```

### Pattern 4: Agent / Copilot Page

For full-screen agent experiences, compose from the extracted agent building blocks. The reference implementation is `OptimizationAgent` (`components/projects/optimize/optimization-agent.tsx`) — a ~976-line orchestrator that imports all the pieces below.

**Full-screen agent — compose from building blocks (recommended):**

```tsx
"use client";

import { useState, useRef } from "react";
import {
  CopilotProvider,
  CopilotChat,
  CopilotMessage,
  UserMessage,
} from "@fluentui-copilot/react-copilot";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
} from "@fluentui/react-components";

// Agent layout components (extracted building blocks)
import AgentSidebar from "../optimize/agent-sidebar";
import AgentHeader from "../optimize/agent-header";
import ChatInputSection from "../optimize/chat-input-section";
import FeedbackSection from "../optimize/feedback-section";
import ReasoningCard from "../optimize/reasoning-card";
import CodeViewerPanel from "../../components/shared/code-viewer-panel";
import { useTypewriter } from "../../components/shared/use-typewriter";

// Shared deployment cards
import DeploymentPlanCard from "../../components/shared/deployment-plan-card";
import DeploymentProgressCard from "../../components/shared/deployment-progress-card";
import DeploymentCompleteCard from "../../components/shared/deployment-complete-card";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  container: {
    position: "fixed",
    inset: "0",
    display: "flex",
    flexDirection: "column",
  },
  contentWrapper: { display: "flex", flex: 1, overflow: "hidden" },
  mainContent: { display: "flex", flexDirection: "column", flex: 1 },
  chatArea: {
    flex: 1,
    overflowY: "auto",
    padding: tokens.spacingHorizontalXXL,
  },
});

export default function MyAgentPage() {
  const styles = useStyles();
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showCodePanel, setShowCodePanel] = useState(false);

  // Typewriter for agent response
  const { typedText, isComplete } = useTypewriter({
    text: "Here's my analysis of your infrastructure...",
    enabled: true,
    scrollRef: chatAreaRef,
  });

  return (
    <CopilotProvider>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <AgentSidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            isDarkMode={false}
            docked={false}
            conversationTitle="My agent conversation"
          />
          <div className={styles.mainContent}>
            <AgentHeader
              docked={false}
              isSidebarCollapsed={isSidebarCollapsed}
              onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              conversationTitle="My agent conversation"
              isDarkMode={false}
              useTopNav={true}
            />
            <div className={styles.chatArea} ref={chatAreaRef}>
              <CopilotChat>
                <UserMessage>Analyze my resources</UserMessage>
                <CopilotMessage>
                  <Text style={{ whiteSpace: "pre-line" }}>{typedText}</Text>
                  {isComplete && (
                    <>
                      <ReasoningCard
                        steps={[
                          {
                            name: "Scanning resources",
                            desc: "Checking utilization...",
                          },
                          {
                            name: "Analyzing costs",
                            desc: "Comparing pricing tiers...",
                          },
                        ]}
                      />
                      <FeedbackSection isDarkMode={false} />
                    </>
                  )}
                </CopilotMessage>
              </CopilotChat>
            </div>
            <ChatInputSection
              docked={false}
              inputValue={inputValue}
              onInputChange={setInputValue}
              isSending={false}
            />
          </div>
          <CodeViewerPanel
            isOpen={showCodePanel}
            onClose={() => setShowCodePanel(false)}
            title="Infrastructure Code"
            code="resource azurerm_resource_group..."
          />
        </div>
      </div>
    </CopilotProvider>
  );
}
```

**Using `AgentLayout` shell (simpler alternative):**

If your agent doesn't need the sidebar/header composition, use the `AgentLayout` shell:

```tsx
import AgentLayout from "../../components/shared/agent-layout";
import {
  CopilotChat,
  CopilotMessage,
  UserMessage,
  ChatInput,
} from "@fluentui-copilot/react-copilot";

export default function SimpleAgentPage() {
  return (
    <AgentLayout
      chatTitle="Quick agent"
      inputBar={<ChatInput placeholder="Ask me anything..." />}
      onClose={() => {
        /* navigate back */
      }}
    >
      <CopilotChat>
        <CopilotMessage>How can I help?</CopilotMessage>
      </CopilotChat>
    </AgentLayout>
  );
}
```

**Simple inline copilot (for embedded chat within a page):**

```tsx
"use client";

import ProjectLayout from "../../components/shared/project-layout";
import {
  CopilotProvider,
  CopilotChat,
  CopilotMessage,
  UserMessage,
} from "@fluentui-copilot/react-copilot";
import { LatencyLoader } from "@fluentui-copilot/react-latency";
import EnhancedInputBar from "../../components/shared/enhanced-input-bar";
import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  chatArea: {
    flex: 1,
    overflowY: "auto",
    padding: tokens.spacingHorizontalXXL,
    maxWidth: "800px",
    margin: "0 auto",
    width: "100%",
  },
  inputArea: {
    padding: tokens.spacingHorizontalL,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
  },
});

export default function MyAgentPage() {
  const styles = useStyles();
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ProjectLayout id="my-project-id">
      <CopilotProvider>
        <div className={styles.page}>
          <div className={styles.chatArea}>
            <CopilotChat>
              <CopilotMessage>
                Hello! I can help you optimize your Azure resources.
              </CopilotMessage>
              {isLoading && <LatencyLoader />}
            </CopilotChat>
          </div>
          <div className={styles.inputArea}>
            <EnhancedInputBar
              value={input}
              onChange={setInput}
              onSubmit={(val) => {
                /* handle send */
              }}
              placeholder="Ask Copilot..."
            />
          </div>
        </div>
      </CopilotProvider>
    </ProjectLayout>
  );
}
```

### Pattern 4b: Docked Chat Sidecar (onto an existing page)

Use `DockedChatPanel` when you need to slide a chat/agent panel onto the **right side of an existing page** (dashboard, resource detail, etc.) without replacing the whole page. This is distinct from `AgentLayout`, which takes over the full screen.

```tsx
"use client";

import { useState } from "react";
import DockedChatPanel from "../../components/shared/docked-chat-panel";
import {
  makeStyles,
  tokens as fluentTokens,
  Button,
} from "@fluentui/react-components";
import { Sparkle20Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  pageRow: {
    display: "flex",
    flexDirection: "row",
    height: "calc(100vh - 48px)",
  },
  mainContent: {
    flex: 1,
    overflowY: "auto",
    padding: tokens.spacingHorizontalXXL,
  },
});

export default function DashboardWithCopilot() {
  const styles = useStyles();
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <div className={styles.pageRow}>
      <div className={styles.mainContent}>
        {/* Your existing page content (dashboard, resource table, etc.) */}
        <Button
          appearance="primary"
          icon={<Sparkle20Regular />}
          onClick={() => setPanelOpen(true)}
        >
          Optimize resources
        </Button>
      </div>

      {panelOpen && (
        <DockedChatPanel title="Copilot" onClose={() => setPanelOpen(false)}>
          {/* Any agent or chat component — accepts children */}
          <OptimizationAgent docked onClose={() => setPanelOpen(false)} />
        </DockedChatPanel>
      )}
    </div>
  );
}
```

**When to use which:**
| Pattern | Component | Use Case |
| --- | --- | --- |
| Full-screen agent (composed) | `AgentSidebar` + `AgentHeader` + `ChatInputSection` + `FeedbackSection` | Custom agent page with full control over layout and flow |
| Full-screen agent (shell) | `AgentLayout` | Simpler standalone agent page with opinionated layout |
| Inline chat | `CopilotChat` | Small embedded chat within a section |
| Docked sidecar | `DockedChatPanel` | Right-side panel docked onto an existing page |
| Multi-step flow | `useConversationFlow` + `useTypewriter` | Agent with cascading conversation states and typewriter text |

### Pattern 5: Deployment Flow (Plan → Progress → Complete)

Use the shared deployment cards — do NOT re-implement step indicators, progress bars, or resource tables.

```tsx
// State machine: "plan" → "deploying" → "complete"
const [phase, setPhase] = useState<"plan" | "deploying" | "complete">("plan");

{
  phase === "plan" && (
    <DeploymentPlanCard
      serviceName="Web App"
      region="West US"
      pricingTier="Basic"
      estimatedCost="$1.30"
      onApprove={() => setPhase("deploying")}
    />
  );
}
{
  phase === "deploying" && (
    <DeploymentProgressCard
      serviceName="Web App"
      onComplete={() => setPhase("complete")}
    />
  );
}
{
  phase === "complete" && (
    <DeploymentCompleteCard
      title="My Project"
      resources={[
        {
          name: "my-web-app",
          type: "App Service",
          status: "Running",
          monthlyCost: "$12.50",
          lastActivity: "Just now",
        },
      ]}
    />
  );
}
```

### Pattern 6: Create Wizard (New Resource)

Compose from shared wizard infrastructure. Only write the form fields — shell, nav, cost panel, sections, and action bar are handled by shared components.

```tsx
"use client";

import ProjectLayout from "../../components/shared/project-layout";
import PageBreadcrumb from "../../components/shared/page-breadcrumb";
import PageHeader from "../../components/shared/page-header";
import WizardLayout from "../../components/shared/wizard-layout";
import WizardStepNav from "../../components/shared/wizard-step-nav";
import WizardCostPanel from "../../components/shared/wizard-cost-panel";
import WizardSection from "../../components/shared/wizard-section";
import WizardActionBar from "../../components/shared/wizard-action-bar";
import {
  makeStyles,
  tokens as fluentTokens,
  Field,
  Input,
  Dropdown,
  Option,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  centerSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingVerticalXXXL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  formField: {
    marginBottom: tokens.spacingVerticalXXL,
  },
});

const steps = [
  { id: 1, title: "Basics" },
  { id: 2, title: "Networking" },
  { id: 3, title: "Tags" },
  { id: 4, title: "Review" },
];

export default function CreateStorageWizard() {
  const styles = useStyles();
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <ProjectLayout id="create-storage">
      <PageBreadcrumb
        noBorder
        items={[
          { label: "Home", onClick: () => {} },
          { label: "New" },
          { label: "Create a resource" },
        ]}
      />
      <PageHeader title="Create a Storage Account" onClose={() => {}} />

      <WizardLayout
        stepNav={
          <WizardStepNav
            steps={steps}
            activeStep={currentStep}
            onStepChange={setCurrentStep}
          />
        }
        rightPanel={
          <WizardCostPanel
            total="$21.00"
            period="/month"
            items={[{ label: "Storage (LRS)", value: "$21.00/mo" }]}
          />
        }
      >
        <div className={styles.centerSection}>
          {currentStep === 1 && (
            <>
              <WizardSection
                title="Project details"
                description="Select the subscription to manage deployed resources and costs."
              >
                <div className={styles.formField}>
                  <Field label="Subscription" required>
                    <Dropdown placeholder="Select subscription">
                      <Option>Azure subscription 1</Option>
                    </Dropdown>
                  </Field>
                </div>
                <div className={styles.formField}>
                  <Field label="Resource group" required>
                    <Dropdown placeholder="Select or create">
                      <Option>my-resource-group</Option>
                    </Dropdown>
                  </Field>
                </div>
              </WizardSection>

              <WizardSection title="Instance details">
                <div className={styles.formField}>
                  <Field label="Storage account name" required>
                    <Input placeholder="mystorageaccount" />
                  </Field>
                </div>
                <div className={styles.formField}>
                  <Field label="Region" required>
                    <Dropdown placeholder="Select a region">
                      <Option>East US</Option>
                    </Dropdown>
                  </Field>
                </div>
              </WizardSection>
            </>
          )}
          {/* More steps... */}

          <WizardActionBar
            currentStep={currentStep}
            totalSteps={4}
            reviewStep={4}
            nextLabel={currentStep === 1 ? "Next: Networking" : "Next"}
            createLabel="Create"
            onPrevious={() => setCurrentStep(currentStep - 1)}
            onNext={() => setCurrentStep(currentStep + 1)}
            onSkipToReview={() => setCurrentStep(4)}
            showSkipToReview
            showSaveDraft
          />
        </div>
      </WizardLayout>
    </ProjectLayout>
  );
}
```

### Anti-Patterns — What NOT to Do

```tsx
// ❌ Re-implementing search bar inline (use AzureHeaderBuildMVP or EnhancedInputBar)
<input type="text" placeholder="Search..." onChange={...} />

// ❌ Building a 2,000-line page with search, suggestions, service grid,
//    deployment, and copilot panel all in one component

// ❌ Forking a shared component into components/projects/ to "customize" it
//    — extend via props or composition instead

// ❌ Custom form field wrappers
function FormField({ label, children }) { ... }  // Just use <Field>

// ❌ Inline SVG icons
<svg viewBox="0 0 24 24">...</svg>  // Use @fluentui/react-icons
```

---

## Figma MCP Guidance

When converting a Figma design to code:

1. **Identify the shell first** — does the design use the build-2026 header (`AzureHeaderBuildMVP`) or vision header (`TopNav`)? Use the matching shared component.
2. **Check `component-map.json`** — search for patterns matching the Figma layout. If a match exists, use or extend it.
3. **Map Figma components → shared components** before generating any code. Check the Component Inventory table above.
4. **Use `ProjectLayout`** as the outermost wrapper — never re-implement the sidebar, header, or provider setup.
5. **Use `get_screenshot` + `use_figma` Plugin API** — NOT `get_design_context` (which flattens to Tailwind). Run `pnpm figma-extract <nodeId>` to get the extraction script.
6. **Map Figma colors → Fluent tokens** — the extraction script auto-maps `Neutral/Background/1/Rest` → `colorNeutralBackground1` etc.
7. **Map Figma icons → `@fluentui/react-icons`** — search by semantic name (e.g., "Search", "Settings", "Add").
8. **Ask before creating** — if a Figma component doesn't clearly map to an existing shared component, state what you found and ask which existing component to extend.

---

## Component Map (`component-map.json`)

A pattern→component lookup at the repo root. Used by `/figma-to-fluent` and `/design-with-fluent` to discover existing components before creating new ones.

- The `promote-component` flywheel script auto-updates both `AGENTS.md` and `component-map.json`

---

## Design References

Use these external resources for **structural patterns and component APIs only**. Do NOT copy their visual styling — this repo's design language is forward-looking (spacious layouts, card-based, copilot-first), not the dense blade-centric style of the current Azure portal.

### Fluent UI React v9 — Component API Reference

**URL:** https://storybooks.fluentui.dev/react/  
**Use for:** Looking up component props, variants, and usage examples for any `@fluentui/react-components` primitive (`Input`, `Field`, `Button`, `Dialog`, `Card`, `TabList`, etc.)  
**Don't use for:** Visual design decisions — Storybook examples are unstyled demos, not design specs

### Azure Portal Design System Storybook

**URL:** https://jolly-glacier-0c501de1e.2.azurestaticapps.net/  
**Use for:** Structural patterns only — how the portal composes pages, wizard navigation, container nesting, command bars, essentials panels  
**Key sections:**

- `Guidelines/Page Patterns` — how portal sections are structured
- `Guidelines/Token Usage` — token application patterns
- `Templates/` — CopilotChat, Resource List Page, FeatureCardsPage
- `Patterns/Wizard` — multi-step wizard composition

**⚠️ Do NOT adopt:**

- Dense, blade-centric layouts (v8-era design language)
- Muted color palettes or compact spacing
- Portal-specific component APIs that duplicate Fluent v9 primitives

When building wizard flows, page containers, or resource views, check this Storybook for structural inspiration, then apply this repo's spacing tokens (`spacingVerticalXXL`, `spacingHorizontalXXL`), typography scale, and card-based composition.

### Fluent AI / Copilot Components

**URL:** https://apps.1js.microsoft.com/azurestaticapps/fai-documentation/storybook/  
**Use for:** `@fluentui-copilot/react-copilot` component API — `CopilotChat`, `CopilotMessage`, `UserMessage`, `ChatInput`, `LatencyLoader`, `CopilotNavDrawer`  
**Note:** Internal Microsoft access required (401 for external)  
**Fallback reference:** `components/projects/optimize/optimization-agent.tsx` in this repo

### Fluent 2 Design Language (for humans, not code generation)

These are design-intent references — useful for understanding _why_ the system works the way it does. Copilot already applies the concrete token mappings from the tables above; these links are for designers who want the full rationale.

- **Design Principles:** https://fluent2.microsoft.design/design-principles
- **Layout:** https://fluent2.microsoft.design/layout
- **Color:** https://fluent2.microsoft.design/color
- **Elevation:** https://fluent2.microsoft.design/elevation
- **Iconography:** https://fluent2.microsoft.design/iconography
- **Motion:** https://fluent2.microsoft.design/motion

---

## Pre-Generation Checklist

🚫 **Every code generation must pass these checks. If any fail, fix before outputting.**

### Before writing code:

- [ ] Searched `components/shared/` AND `components/projects/*/` for existing matches
- [ ] Checked AGENTS.md component inventory table
- [ ] Identified which shell to use (`AzureHeaderBuildMVP` or `TopNav`) based on horizon
- [ ] **If building agent/copilot/AI UI:** Ran `node -e "..."` to check `@fluentui-copilot/react-copilot` exports for existing primitives before creating custom implementations (see "Fluent Copilot" section)
- [ ] **If building any UI element:** Checked `@fluentui/react-components` exports for existing primitives: `node -e "console.log(Object.keys(require('@fluentui/react-components')).filter(k => /^[A-Z]/.test(k) && /keyword/i.test(k)).join('\n'))"`

### In every generated file:

- [ ] `"use client"` directive present (if file uses state, effects, or event handlers)
- [ ] SafeTokens pattern present: `type SafeTokens = { [key: string]: any }; const tokens: SafeTokens = fluentTokens;`
- [ ] All colors use Fluent tokens (only `#0078D4`, `#106EBE`, `#005A9E` allowed as hardcoded hex)
- [ ] All spacing uses Fluent tokens (`spacingHorizontalS`, not `"8px"`)
- [ ] All font sizes use tokens (`fontSizeBase300`, not `"14px"`) — exception: layout constants like `maxWidth: "1200px"`
- [ ] All font weights use valid tokens: `fontWeightRegular`, `fontWeightMedium`, `fontWeightSemibold` (🚫 NOT `fontWeightBold` — it doesn't exist)
- [ ] No inline `style={{}}` except truly dynamic values (state-driven transforms) and **error boundaries** (`error.tsx`, `global-error.tsx`) which must use plain HTML/CSS since they render outside FluentProvider
- [ ] UI chrome icons imported from `@fluentui/react-icons` (no inline SVG)
- [ ] Azure service logos use `<img src="/azure-service-icons/{category}/..." />`
- [ ] Custom portal icons use `<img src="/icons/..." />`
- [ ] Text uses Fluent components (`<Text>`, `<Body1>`, `<Subtitle1>`) not raw `<h1>`/`<p>`/`<span>`

### For new components:

- [ ] Typed props interface exported
- [ ] JSDoc summary on the default export
- [ ] Format-agnostic (accepts data via props, no hardcoded project-specific content)
- [ ] Uses `makeStyles` + `mergeClasses` for style composition
- [ ] Visually flexible — exposes `className`, `borderRadius`, `shadow`/`hoverShadow`, and text `className` overrides as optional props (see "Creating New Components" §3)

---

## Branch Strategy

```
main                         ← primary branch
  ↑ accepts PRs from:
  chore/*                    ← system / infrastructure changes
  feat/<project-id>          ← individual project explorations
  fix/*                      ← bug fixes
```

Run `npx next build` before merging any branch to verify static export succeeds.
