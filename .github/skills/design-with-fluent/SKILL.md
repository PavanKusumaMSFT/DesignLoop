---
name: design-with-fluent
description: "Build Azure-style prototype UI using Fluent v9, Fluent Copilot components, shared DesAIgns prototype components, and strict token conventions."
argument-hint: "Task id and page/component request (e.g., 'build billing overview for task azure-billing')"
---

# Design with Fluent

## When to Use

- Building a new freeform prototype page or UI section in the Fluent prototype workspace
- Turning a task description, sketch, or wireframe into a Fluent v9 page
- Creating Azure Portal-style pages that must reuse shared prototype components
- Designing standard portal UI, copilot/agent UI, or a page that combines both

## Workspace Contract

All work targets the Fluent prototype workspace at `prototype-workspace/` in the DesAIgns repo root.

- Run discovery commands from `prototype-workspace/`.
- Shared components live in `prototype-workspace/components/shared/`.
- Per-task prototype pages live at `prototype-workspace/app/{taskId}/page.tsx`.
- Per-task components live at `prototype-workspace/components/projects/{taskId}/*.tsx`.
- Pattern lookup lives at `prototype-workspace/component-map.json`.
- Full Fluent inventory and rules live at `prototype-workspace/AGENTS.md`.
- Azure service logos live in `prototype-workspace/public/azure-service-icons/{category}/*.svg`.
- Custom portal icons live in `prototype-workspace/public/icons/*.svg`.
- UI chrome icons come from `@fluentui/react-icons`.


## Procedure

### 1. Identify the Task and Output Paths

Extract `{taskId}` from the user request or the relevant task folder. If no task id is explicit, derive a kebab-case id from the task title and use it consistently.

Write generated code to:

- `prototype-workspace/components/projects/{taskId}/*.tsx`
- `prototype-workspace/app/{taskId}/page.tsx`

Do not write prototype code outside `prototype-workspace/`.

### 2. Reuse Shared Components First

Before writing code, inspect existing patterns and shared components. If a match exists, import and compose it instead of rebuilding it. If `component-map.json` identifies multiple viable variants, document the selected assumption in the implementation notes and choose the variant that best matches the task context.

High-priority shared components to check:

| Need | Use |
| --- | --- |
| KPI / stat tile | `MetricCard` |
| Icon + title + CTA card | `ActionCard` |
| Resource list with status | `ResourceStatusTable` |
| Alert summary | `AlertSummaryCard` |
| Cost summary | `CostSummaryCard` |
| Azure service selection tile | `ServiceTile` |
| Breadcrumb nav | `PageBreadcrumb` |
| Page title + back button | `PageHeader` |
| Right-side chat panel | `DockedChatPanel` |
| Create wizard shell | `WizardLayout`, `WizardStepNav`, `WizardCostPanel`, `WizardSection`, `WizardActionBar` |
| Full-screen agent | `AgentLayout` |
| Copy action | `CopyButton` |
| Page shell | `ProjectLayout` with `AzureHeaderBuildMVP` or `TopNav` |

## Required Discovery Commands

Run these from `prototype-workspace/` before creating or replacing UI:

```bash
# Pattern lookup: inspect pattern to shared-component mappings
cat component-map.json | node -e "const m=JSON.parse(require('fs').readFileSync('/dev/stdin','utf-8')); Object.entries(m.patterns || m).forEach(([k,v]) => console.log(k + ': ' + (Array.isArray(v) ? v.map(c => c.component || c).join(', ') : JSON.stringify(v))))"

# Shared components by keyword
grep -rn "export.*KEYWORD" components/shared/ --include="*.tsx"

# Existing project components by keyword
grep -rn "export.*KEYWORD" components/projects/ --include="*.tsx"

# Fluent v9 primitives
node -e "console.log(Object.keys(require('@fluentui/react-components')).filter(k => /^[A-Z]/.test(k) && /KEYWORD/i.test(k)).join('\n'))"

# Fluent Copilot primitives
node -e "console.log(Object.keys(require('@fluentui-copilot/react-copilot')).filter(k => /KEYWORD/i.test(k)).join('\n'))"
```

Replace `KEYWORD` with the pattern, component, or UI need you are implementing or auditing.


### 3. Select Fluent and Fluent Copilot Primitives

Map each UI element to the correct library before implementation:

- Standard portal UI: `@fluentui/react-components`
- Agent, AI, chat, reasoning, prompt, feedback, citations, and copilot navigation: `@fluentui-copilot/react-copilot` and `@fluentui-copilot/react-latency`

Use Fluent components for visual structure. Raw `<div>` is allowed only for non-visual flex/grid layout containers.

### 4. Build Reusable Project Components

When no shared component fits, create reusable project components in `prototype-workspace/components/projects/{taskId}/`:

- Named exports preferred unless the workspace pattern requires default exports
- Typed props interfaces with data passed via props
- A one-line JSDoc summary for reusable UI patterns
- `makeStyles` + SafeTokens pattern
- No parent state assumptions unless explicitly passed through props

### 5. Compose the Page

Create `prototype-workspace/app/{taskId}/page.tsx` that:

- Wraps the page in `ProjectLayout`
- Uses `AzureHeaderBuildMVP` for short/mid-term Azure Portal pages or `TopNav` for vision explorations
- Imports reusable components from `components/projects/{taskId}/` and shared components from `components/shared/`
- Uses Fluent typography and controls for all visible UI
- Adds accessible labels, alt text for image icons, keyboard-operable controls, and visible focus states

## Non-Negotiable Fluent Rules

- Use Fluent v9 primitives from `@fluentui/react-components` for portal UI.
- Use Fluent Copilot / Fluent AI components from `@fluentui-copilot/react-copilot` and `@fluentui-copilot/react-latency` for chat, agent, reasoning, feedback, citations, prompt input, and copilot navigation.
- Use existing shared components before creating new ones: `ActionCard`, `MetricCard`, `ResourceStatusTable`, `AlertSummaryCard`, `CostSummaryCard`, `ServiceTile`, `ProjectLayout`, `AzureHeaderBuildMVP`, `TopNav`, `wizard-*`, `DockedChatPanel`, `AgentLayout`, `CopyButton`, `PageHeader`, `PageBreadcrumb`, `NavigationPanel`, and related components.
- Use `makeStyles` + Fluent tokens only. No Tailwind, no CSS Modules, no inline `style={}` except truly dynamic values.
- Put this SafeTokens pattern in every generated or refactored TSX file:

```tsx
import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";
type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
```

- Use Fluent typography components such as `Text`, `Body1`, `Subtitle1`, `Subtitle2`, and `Title2`; do not render text with raw `<h1>`, `<p>`, or `<span>`.
- Use `Card`, `Field`, `Input`, `Dropdown`, `Button`, `CompoundButton`, `Badge`, `Divider`, `Table`, `Dialog`, `TabList`, and related Fluent primitives instead of custom visual wrappers.
- Only allowed hardcoded hex values are Azure brand blues: `#0078D4`, `#106EBE`, `#005A9E`. Map all other colors to Fluent tokens.
- Do not use inline SVG. Use the icon source rules below.
- Do not use emoji in rendered UI text, labels, headings, or buttons.


## Icon Source Rules

Use this three-tier icon system:

1. **Azure service/product logos**: use `<img>` from `/azure-service-icons/{category}/...` after searching `prototype-workspace/public/azure-service-icons/`.
2. **Custom portal icons**: use `<img>` from `/icons/...` after searching `prototype-workspace/public/icons/`.
3. **UI chrome icons**: use React icons from `@fluentui/react-icons` with the correct size variant.

Do not use Fluent UI icons for Azure service logos. Do not paste SVG paths from Figma.


### 6. Verify Before Finishing

Self-check the output against `.github/skills/design-with-fluent/VERIFY.md`.

Required final checks:

- Shared-component lookup completed and reflected in imports or notes
- Fluent v9 discovery run for custom primitives
- Fluent Copilot discovery run for AI/agent/chat UI
- `ProjectLayout` wraps the page
- SafeTokens pattern present in every generated TSX file
- No Tailwind, CSS Modules, unsupported hardcoded colors, raw HTML text elements, inline SVG, or emoji
- Components compile with existing imports and path conventions

## Common Mistakes to Avoid

1. Rebuilding shared components that already exist in `components/shared/` or `component-map.json`.
2. Copying Figma MCP Tailwind classes, raw CSS, or generated markup directly.
3. Using custom card, form, table, badge, tab, or dialog wrappers when Fluent provides a primitive.
4. Using raw labels and inputs instead of `<Field label="...">` with Fluent form controls.
5. Trusting component defaults when Figma specifies different line-height, spacing, icon size, or state styling.
6. Using `@fluentui/react-icons` for colorful Azure service logos instead of `/azure-service-icons/` assets.
7. Building custom chat, prompt, feedback, latency, citation, or copilot navigation UI instead of Fluent Copilot components.
8. Forgetting `CopilotProvider` around copilot experience areas.
9. Using inline `style={{}}`, Tailwind classes, CSS Modules, unsupported hex values, raw HTML text elements, inline SVG, or emoji.

