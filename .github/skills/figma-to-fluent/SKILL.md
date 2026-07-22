---
name: figma-to-fluent
description: "Convert Figma designs into Next.js + Fluent v9 and Fluent Copilot prototype code using shared DesAIgns workspace components."
argument-hint: "Task id plus Figma URL/node or design artifact (e.g., 'task cost-dashboard from Figma node 123:456')"
---

# Figma to Fluent

## When to Use

- Converting a Figma design or node into prototype code
- Translating a screenshot or design artifact into Fluent v9 / Fluent Copilot components
- Building a per-task Next.js page and reusable components from a visual design

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

### 1. Read the Design Source

Use the provided Figma URL, node id, screenshot, wireframe, or design artifact. Extract:

- Page/component purpose and `{taskId}`
- Layout regions and hierarchy
- Typography ramp, font weight, and line height
- Fills, strokes, radii, shadows, and state colors mapped to Fluent tokens
- Spacing, padding, gap, and responsive behavior
- Component instances and their intended Fluent primitives
- Copilot/agent/chat regions that require Fluent Copilot components
- Icon purpose and source tier

If Figma MCP output includes Tailwind classes or raw CSS, treat it as structure only. Do not paste it.

### 2. Search Existing Components First

Before writing any code, check `component-map.json`, `prototype-workspace/AGENTS.md`, `components/shared/`, and existing `components/projects/` files. Reuse or extend a matching component instead of rebuilding it.

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


### 3. Map Figma Elements to Libraries

Use Fluent v9 for standard portal UI:

- `Button`, `CompoundButton`, `ToggleButton`
- `Text`, `Body1`, `Subtitle1`, `Subtitle2`, `Title2`, `Caption1`
- `Card`, `CardPreview`, `CardHeader`
- `Field`, `Input`, `Dropdown`, `Checkbox`, `Switch`, `RadioGroup`, `Radio`
- `TabList`, `Tab`, `Tooltip`, `MessageBar`, `Spinner`, `Badge`, `Divider`, `Table`, `Dialog`

Use Fluent Copilot / Fluent AI for agent experiences:

| Figma element | Use |
| --- | --- |
| Chat container/thread | `CopilotChat` |
| AI message | `CopilotMessage` or `CopilotMessageV2` |
| User message | `UserMessage` or `UserMessageV2` |
| System/status message | `SystemMessage` |
| Timestamp | `Timestamp` |
| AI disclaimer | `AiGeneratedDisclaimer` |
| Prompt input | `PromptInput` or `ChatInput` |
| Send action | `SendButton` |
| Prompt starters | `PromptStarter` or `PromptStarterV2` |
| Suggestions | `Suggestion` / `SuggestionList` |
| Feedback | `FeedbackButtons` |
| Citations | `Citation`, `Reference`, `ReferenceList` |
| Loading/reasoning | `LatencyLoader`, `LatencyCancel`, `ReasonMarker` |
| Chat history nav | `CopilotNavDrawer`, `CopilotNavItem`, `CopilotNavCategory` |
| Output/content cards | `OutputCard`, `Snippet`, `EntityCard`, `EntityCardList` |
| Attachments/labels | `Attachment`, `AttachmentList`, `SensitivityLabel` |

Wrap copilot areas with `CopilotProvider` inside the Fluent provider context when required.

### 4. Implement Reusable Components and Page

Write outputs to:

- `prototype-workspace/components/projects/{taskId}/*.tsx`
- `prototype-workspace/app/{taskId}/page.tsx`

Make new UI patterns reusable by default:

- Typed props interface
- One-line JSDoc summary
- Data passed through props, not hardcoded into the component
- `makeStyles` + SafeTokens pattern
- Fluent components for visual containers and controls

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


### 5. Match the Figma Design Carefully

- Match exact visual hierarchy, section rhythm, state behavior, and responsive intent.
- Override component defaults when Figma explicitly specifies line-height, spacing, icon size, or border treatment.
- Use existing layout constants from `prototype-workspace/AGENTS.md` such as the established content widths and breakpoints.
- Use `<img alt="...">` for Azure service logos and custom portal icons.

### 6. Verify Before Finishing

Self-check the output against `.github/skills/figma-to-fluent/VERIFY.md` and fix all hard-stop issues before reporting completion.

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

