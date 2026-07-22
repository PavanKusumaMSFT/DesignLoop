---
name: wireframe-spec
description: "Write detailed Fluent-aware wireframe specifications for each screen and state: layout regions, component-map pattern matches, Fluent components, content hierarchy, interactions, and annotations. Use after requirements are defined to provide the design blueprint for prototyping."
argument-hint: "Feature name and list of screens to spec (e.g., 'DesAIgns project setup — spec: empty state, form, confirmation')"
---

# Wireframe Spec

## When to Use
- After requirements PRD is approved
- Before visual design or prototyping begins
- When developers need a layout, Fluent component, and interaction reference

## Procedure

### 1. Read Source Artifacts

Load:
- `tasks/{taskId}/strategy/requirements-prd.md` — functional requirements and acceptance criteria
- `tasks/{taskId}/strategy/personas.md` — user goals that must be served by each screen
- `tasks/{taskId}/ideation/concept-evaluation.md` — the shortlisted concept being designed
- `prototype-workspace/component-map.json` — pattern-to-component lookup
- `prototype-workspace/components/shared/` — shared Fluent component inventory
- `prototype-workspace/AGENTS.md` — Fluent v9 implementation rules

Identify all screens that are in scope. For each functional requirement, map which screen(s) it lives on.

### 2. Define the Screen Inventory

List all screens and states before writing any spec:

| Screen ID | Screen Name | Persona | Primary Goal | States to Cover | Primary Fluent Patterns |
|-----------|-------------|---------|--------------|-----------------|-------------------------|
| SCR-01 | ... | ... | ... | Default, Empty, Error, Loading | `page-layout-shell`, `page-title-header` |

States that must always be covered for interactive screens: Default, Empty State, Error State, Loading State, Success/Confirmation State.

### 3. Map Layout Regions to Fluent Patterns

Before writing each screen spec, annotate every major region with its `component-map.json` match, shared component, or Fluent primitive. Examples:
- `header` → `page-header-bar` → `AzureHeaderBuildMVP`
- `page shell` → `page-layout-shell` → `ProjectLayout`
- `breadcrumb` → `breadcrumb-navigation` → `PageBreadcrumb`
- `page title` → `page-title-header` → `PageHeader`
- `kpi tile` → `kpi-metric-tile` → `MetricCard`
- `resource table` → `resource-status-table` → `ResourceStatusTable`
- `form field` → Fluent `Field` + `Input` / `Dropdown`

If no match exists, document `No existing match` and name the closest Fluent primitive(s) to compose.

### 4. Write a Spec for Each Screen

For each screen, write a spec with these sections:

**A. Screen Overview**
- Screen ID and name
- Entry point (what action brings the user here?)
- Primary user goal on this screen
- Persona reference

**B. Layout Regions with Fluent Mapping**
Describe the major layout regions (header, sidebar, main content, footer, modal layer). For each region:
- Name
- Purpose
- `component-map.json` pattern match
- Shared component or Fluent primitive to use
- Sticky/scrollable behaviour
- Responsive behaviour (what happens at mobile breakpoint)

**C. Content and Component Inventory**
List every piece of content and every UI component:
| Element | Type | Fluent/shared mapping | Content | Notes |
|---------|------|-----------------------|---------|-------|
| Page title | `PageHeader` / Fluent `Text as="h1"` | `page-title-header` → `PageHeader` | "[Title text]" | Truncates at 60 chars |
| Primary CTA | Fluent `Button` | `Button appearance="primary"` | "[Label text]" | Disabled until form valid |

**D. Interaction Notes**
For each interactive element:
- Trigger: what user action activates it
- Response: what happens immediately
- State change: what visual change occurs
- Fluent state: hover, pressed, focus-visible, disabled, loading, selected, error, or success
- Error handling: what happens if the interaction fails

**E. Edge Cases and States**
For each state (empty, error, loading, success):
- What triggers this state
- What content is shown (exact copy or content model)
- What actions are available
- Which Fluent component communicates the state (`MessageBar`, `Spinner`, `Badge`, `Dialog`, etc.)

**F. Annotations**
Number 3–8 specific decisions that a developer might miss. Format:
> `[A-N]` — {Annotation text explaining the design rationale and any Fluent/shared component constraint}

### 5. Save Each Screen Spec

Save each screen to a separate file: `tasks/{taskId}/designs/wireframes/{screen-name}.md`

Use kebab-case for filenames matching the screen name (e.g., `tasks/{taskId}/designs/wireframes/project-setup-form.md`).

Include `tasks/{taskId}/designs/wireframes/index.md` listing all screens with links, status (Draft / Review / Approved), persona references, PRD requirement mapping, and primary Fluent pattern matches.
