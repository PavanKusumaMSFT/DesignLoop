---
name: design-system-assembly
description: "Assemble the full Fluent UI React v9 design system index for a task: theme guidance, token usage, vendored shared-component inventory, component-map patterns, Fluent rules, do/don't patterns, and contribution guide. Use after Fluent theme setup and component specs to produce the authoritative reference."
argument-hint: "Design system name (e.g., 'DesAIgns Fluent Design System')"
---

# Design System Assembly

## When to Use
- After design-system-setup has documented Fluent theme and token usage
- After component-spec has documented required components and reuse decisions
- When a unified, navigable reference is needed before prototype implementation
- Before developer handoff to provide a single source of truth for Fluent v9 patterns

## Procedure

### 1. Read Source Artifacts

Load:
- `tasks/{taskId}/designs/tokens/fluent-theme.md` — selected Fluent theme and brand customization
- `tasks/{taskId}/designs/tokens/token-usage-guide.md` — design intent to Fluent token mapping
- `tasks/{taskId}/designs/components/` — component specs and reuse decisions
- `tasks/{taskId}/designs/wireframes/` — screen-level pattern mappings
- `prototype-workspace/component-map.json` — canonical pattern lookup
- `prototype-workspace/components/shared/` — vendored shared component library
- `prototype-workspace/AGENTS.md` — Fluent v9 rules, forbidden patterns, and component inventory

Inventory the Fluent theme, token families, pattern matches, shared components, and component specs available. Note any gaps where a spec proposes a new component instead of reuse.

### 2. Write the Index Structure

The index must serve as a navigable entry point for the vendored Fluent kit. Organise it in this order:

**A. System Overview**
- Design system name and version
- Fluent UI React v9 + `@fluentui/react-components` as the UI foundation
- `makeStyles` + Fluent `tokens` as the styling contract
- Shared component source: `prototype-workspace/components/shared/`
- Pattern lookup source: `prototype-workspace/component-map.json`
- Supported framework: `prototype-workspace/` Next.js 15 + Fluent v9

**B. Theme and Fluent Token Families**
Summarize `fluent-theme.md` and `token-usage-guide.md`:
- Base theme: `webLightTheme`, `webDarkTheme`, or custom `createLightTheme`/`createDarkTheme`
- Brand customization and Azure-blue ramp, if used
- Token family tables for color, typography, spacing, radius, stroke, elevation, and motion
- Light/dark mode considerations

Do not document generic CSS custom properties or `--{category}-{variant}-{scale}` tokens.

**C. Pattern Lookup and Shared Component Inventory**
Create a table that combines `component-map.json`, `components/shared/`, and task component specs:

| Pattern | Shared Component | Source Path | Fluent Primitives | Used By Screens | Status |
|---------|------------------|-------------|-------------------|-----------------|--------|
| `kpi-metric-tile` | `MetricCard` | `prototype-workspace/components/shared/metric-card` | `Card`, `Text`, `Badge` | ... | Stable |

Status values: **Stable** (production-ready shared component), **Task Extension** (extends an existing shared component), **New Needed** (no match found), **Deprecated** (do not use).

**D. Fluent Usage Guidelines**
For each major category (page shell, navigation, cards, forms, tables, feedback, agent/Copilot surfaces, icons):
- Preferred shared component or Fluent primitive
- When to use it
- Token families to use
- Accessibility requirements
- Anti-patterns from `prototype-workspace/AGENTS.md`

**E. Do / Don't Patterns**
10–20 paired examples based on Fluent rules. Include these themes:
- Use shared components before composing new UI
- Use Fluent primitives before raw HTML wrappers
- Use `makeStyles` + `tokens`, not CSS Modules, Tailwind, or inline styles
- Use `Text`, `Body1`, `Subtitle1`, or `Title2`, not raw text elements
- Use `@fluentui/react-icons` for UI chrome, Azure SVG assets for service logos, and `public/icons/` for portal-specific icons
- Keep hardcoded hex values out of component styles except the allowed Azure brand ramp in theme files

**F. Contribution Guide**
- How to propose a new shared component when no `component-map.json` or Fluent primitive match exists
- Required reuse evidence before adding a new component
- Required component spec sections
- Review process and approval criteria
- How to add a new pattern to `component-map.json`
- How to deprecate or migrate a shared component

### 3. Validate Completeness

Check:
- Every component spec appears in the inventory
- Every wireframe region maps to a shared component, Fluent primitive, or documented gap
- Every token referenced in component specs is a Fluent token family from `@fluentui/react-components`
- Do/don't patterns reflect the prototype workspace Fluent rules
- No generic token CSS scheme is included

### 4. Save the Document

Save to `tasks/{taskId}/designs/design-system.md`.

If supporting sub-documents are needed, create them under `tasks/{taskId}/designs/` and link from `design-system.md`.
