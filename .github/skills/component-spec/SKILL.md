---
name: component-spec
description: "Generate Fluent UI React v9 component specifications that name exact Fluent primitives, shared components, token mappings, variants, states, and accessibility requirements. Use when documenting components for prototype implementation or handoff."
argument-hint: "Component name and description (e.g., 'Metric tile for subscription health KPI')"
---

# Component Specification Generator

## When to Use
- Documenting a component for Fluent UI React v9 implementation
- Translating wireframe regions into reusable prototype components
- Choosing between an existing shared component and a new component requirement
- Capturing variants, states, token mapping, and accessibility requirements for handoff

## Procedure

### 1. Identify the Component
Determine the component to document. Check these sources:
- `tasks/{taskId}/designs/wireframes/` — screen regions and annotations
- `tasks/{taskId}/designs/tokens/fluent-theme.md` and `token-usage-guide.md` — Fluent theme and token decisions
- Figma files via MCP (if available)
- Product requirements and acceptance criteria

### 2. Perform the Mandatory Reuse Check
Before specifying anything new, search all three sources and record the result in the spec:

1. `prototype-workspace/component-map.json` for a matching pattern name, for example `kpi-metric-tile` → `MetricCard`
2. `prototype-workspace/components/shared/` for an existing shared component or composable building block
3. Fluent UI exports from `@fluentui/react-components` for primitives such as `Button`, `Card`, `Field`, `Input`, `Dropdown`, `Table`, `Badge`, `MessageBar`, `Dialog`, `Drawer`, `TabList`, and `Text`

If a match exists, specify reuse or extension of that component. Do not specify a new custom component unless no shared component or Fluent primitive fits. If `component-map.json` has multiple viable modern/classic matches, document the choice and rationale.

### 3. Create the Spec Document

Use the template at [component-template.md](./assets/component-template.md) as a starting point, but make it Fluent-aware. Include these sections:

- **Overview**: Name, purpose, usage context, and owning screen/region
- **Reuse Check**: Searches performed, matches found in `component-map.json`, shared component path, Fluent primitive(s), and final reuse/new decision
- **Fluent Implementation Mapping**: Exact shared component and/or Fluent primitive(s) to use, import paths, and any required `@fluentui/react-icons` icons
- **Props/API**: All props with TypeScript types, defaults, descriptions, and whether they align to an existing shared component API
- **Variants**: Visual and behavioral variations, including Fluent props such as `appearance`, `size`, `shape`, `validationState`, or component-specific variants
- **States**: Default, hover, active/pressed, focus-visible, disabled, loading, selected, empty, error, and success where applicable
- **Fluent Token Mapping**: Exact token names for color, typography, spacing, radius, stroke, elevation, and motion (for example `colorNeutralBackground1`, `colorBrandForeground1`, `spacingHorizontalM`, `fontSizeBase300`, `borderRadiusMedium`, `shadow4`)
- **Accessibility**: ARIA roles, labels, keyboard interactions, focus order, visible focus treatment, screen reader announcements, and WCAG 2.1 AA considerations
- **Usage Examples**: Code snippets that use the shared component or Fluent primitive, not raw HTML stand-ins

### 4. Save the Document

Save to `tasks/{taskId}/designs/components/{ComponentName}.md`.

Use PascalCase for the component name in the file and kebab-case anchors inside the document when needed.

### 5. Cross-Reference

- Verify the selected shared component exists in `prototype-workspace/components/shared/` or the selected primitive exists in `@fluentui/react-components`
- Verify every token is a Fluent token from `@fluentui/react-components`
- Verify icon guidance uses `@fluentui/react-icons` for UI chrome, `public/azure-service-icons/{category}/*.svg` for Azure service logos, and `public/icons/` for portal-specific icons
- Verify accessibility meets WCAG 2.1 AA
- Verify the spec does not introduce CSS Modules, Tailwind, inline `style={}` guidance, raw HTML text elements, inline SVG, or generic CSS variables
