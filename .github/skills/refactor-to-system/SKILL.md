---
name: refactor-to-system
description: "Refactor existing prototype code in place to follow Fluent v9, Fluent Copilot, shared component, and token conventions without changing behavior."
argument-hint: "Target file or component path (e.g., 'prototype-workspace/components/projects/foo/LegacyPanel.tsx')"
---

# Refactor to System

## When to Use

- Cleaning up a prototype file that uses inline styles, hardcoded values, Tailwind, CSS Modules, or custom markup
- Replacing duplicate UI with shared components or Fluent primitives
- Converting custom agent/chat UI to Fluent Copilot components
- Preparing generated prototype code for handoff or review

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

### 1. Read the Target File(s)

Read the requested target file or component reference. Do not broaden scope beyond the target and tightly coupled imports unless required for correctness.

### 2. Discover Existing Replacements

Before editing, check whether inline UI patterns match shared components or Fluent primitives.

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


### 3. List Violations Internally

Identify every issue to fix:

- Inline `style={...}` that is not truly dynamic
- Tailwind classes, CSS Modules, raw CSS patterns, or raw pixel/color styling
- Hardcoded colors except `#0078D4`, `#106EBE`, `#005A9E`
- Hardcoded typography, radius, shadows, and state colors that should use tokens
- Missing SafeTokens alias pattern
- Raw text elements where Fluent typography should be used
- Custom cards, forms, tables, buttons, badges, tabs, dialogs, or div-based visual wrappers
- Inline SVGs or wrong icon sources
- Custom copilot/agent/chat UI that should use Fluent Copilot components
- Duplicate components that already exist in `components/shared/`

### 4. Refactor In Place

Preserve behavior, props, state, data flow, accessibility, and exported API. Do not remove features because they appear unused.

Required transformations:

- Move static styles into `makeStyles`
- Add SafeTokens aliasing if missing
- Replace hardcoded colors with Fluent tokens
- Replace custom visual wrappers with Fluent components where appropriate
- Replace UI chrome inline SVGs with `@fluentui/react-icons`
- Use `/azure-service-icons/` and `/icons/` image assets for service logos and custom portal icons
- Replace custom chat, prompt, feedback, citation, latency, and copilot navigation UI with Fluent Copilot components where a matching primitive exists
- Replace duplicate inline patterns with shared components such as `ActionCard`, `MetricCard`, `ResourceStatusTable`, `AlertSummaryCard`, `CostSummaryCard`, `ServiceTile`, `DockedChatPanel`, `AgentLayout`, `CopyButton`, and `wizard-*`

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


### 5. Verify

Run the smallest existing validation command that covers the changed file when available. If no targeted command exists, at minimum inspect imports and TypeScript syntax manually.

Self-check against `.github/skills/refactor-to-system/VERIFY.md`:

- Visual behavior preserved
- No new dependencies
- No unsupported hardcoded colors
- No Tailwind, CSS Modules, inline SVG, raw text elements, or non-dynamic inline style
- SafeTokens pattern present
- Shared component reuse considered first

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


## Do NOT

- Do not change component behavior or public props unless required to preserve type correctness.
- Do not remove functionality.
- Do not introduce dependencies.
- Do not rewrite unrelated files.
