---
stage: design
label: Design
coordinator-agent: designer
---

# Design Stage — Coordinator Playbook

## Purpose
Produce all the Fluent-aware design artifacts the Prototype stage needs to build from:
wireframes covering every PRD screen, a Fluent UI React v9 theme and token usage guide,
component specs that reuse the vendored shared-component library, optional Fluent visual
mockups, and a coherent design system index.

## Tools in This Stage

| Tool ID | Required | Depends On | Can Parallel |
|---|---|---|---|
| `wireframe-spec` | yes | Ideate + Define artifacts | no (runs first) |
| `design-system-setup` | yes | task description | yes (parallel with wireframes) |
| `component-spec` | yes | `wireframe-spec`, `design-system-setup` | yes (parallel with `design-with-fluent`) |
| `design-with-fluent` | optional | `wireframe-spec`, `design-system-setup` | yes (parallel with `component-spec`) |
| `design-system-assembly` | no | `component-spec`, `design-system-setup` | no (runs last) |

## Selection Logic

Before running any tool, check the `tasks/{taskId}/designs/` directory:

1. If `designs/wireframes/` has files covering all PRD requirements and each layout region is annotated with `component-map.json` or Fluent component matches → skip `wireframe-spec`
2. If `designs/tokens/fluent-theme.md` and `designs/tokens/token-usage-guide.md` exist and document Fluent token families plus light/dark behavior → skip `design-system-setup`
3. If `designs/components/` has Fluent-aware specs for all required components, including reuse checks against `prototype-workspace/component-map.json`, `prototype-workspace/components/shared/`, and Fluent exports → skip `component-spec`
4. If a visual Fluent design/mockup already exists or the request is documentation-only → skip optional `design-with-fluent`
5. If Figma MCP is available, use it to supplement wireframe and Fluent component mapping; ignore generic CSS/Tailwind output in favor of Fluent tokens and shared components

## Execution Order

```
wireframe-spec ────────────┐
design-system-setup        ├── (parallel)
                           ↓
                   component-spec ─────┐
                   design-with-fluent   ├── (optional parallel)
                                        ↓
                         design-system-assembly
```

## Completion Criteria

Stage is complete when:
- All PRD screens have wireframes with `component-map.json` pattern matches, shared components, or Fluent primitives annotated
- `design-system-setup` passed verification with `fluent-theme.md` and `token-usage-guide.md`
- All PRD components have a Fluent-aware `component-spec` that passed verification
- No generic `tokens.css` or invented CSS custom property token scheme is expected by downstream work
- All design guidance follows the prototype workspace contract: Fluent UI React v9, `makeStyles` + Fluent `tokens`, shared components first, and brand colors only through theme customization

## Artifacts Expected

```
tasks/{taskId}/designs/
  wireframes/
    {screen-name}.md
    index.md
  tokens/
    fluent-theme.md
    token-usage-guide.md
    theme.ts (only when brand customization is needed)
  components/
    {ComponentName}.md
  design-system.md
```

## Passing Context to Prototype

The Prototyper needs:
- `tasks/{taskId}/designs/components/{ComponentName}.md` — Fluent/shared component spec for each component to build or reuse
- `tasks/{taskId}/designs/tokens/fluent-theme.md` — selected `webLightTheme`/`webDarkTheme` or custom Fluent theme rationale
- `tasks/{taskId}/designs/tokens/token-usage-guide.md` — Fluent token family mappings to reference
- `tasks/{taskId}/designs/wireframes/` — layout, state, interaction, and pattern mapping context
- `prototype-workspace/component-map.json`, `prototype-workspace/components/shared/`, and `prototype-workspace/AGENTS.md` as implementation references
