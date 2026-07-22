---
name: design-to-code
description: "Convert design specifications or Figma files into runnable Fluent UI React v9 prototypes in the shared Next.js prototype workspace. Use when translating designs to code, building task prototypes from specs, converting Figma to Fluent, or preparing workspace routes for demos and Storybook."
argument-hint: "Task ID, title, and design source (e.g., 'cost-dashboard \"Cost dashboard\" from tasks/cost-dashboard/designs/')"
---

# Design-to-Code Conversion

## When to Use
- Converting task design artifacts into a runnable Fluent UI React v9 prototype
- Extracting component structure from Figma and implementing it with Fluent primitives
- Creating or updating `prototype-workspace/app/{taskId}/` and `prototype-workspace/components/projects/{taskId}/`
- Preparing a prototype route that demo-pages, Storybook, and visual verification will use

## Procedure

### 1. Read the Design Source

Check for the design source in `tasks/{taskId}/designs/`:
- `component-spec*.md` or `components/*.md` — component specs, props, variants, states
- `wireframe*.md` or `wireframes/` — page layout and interaction notes
- `fluent-theme*.md`, `tokens/`, or design-system artifacts — Fluent theme and token guidance
- Figma file via `figma/*` MCP tools — live design data, if provided

Extract:
- Task ID, page title, and route intent
- Component names and descriptions
- Props and their types
- Visual variants and interactive states
- Fluent token mappings and theme requirements
- Layout, spacing, breakpoints, and responsive behavior
- Icon requirements, including Azure service logos, portal icons, and UI chrome icons
- Copilot, agent, chat, or AI surfaces that require Fluent Copilot components

### 2. Scaffold the Workspace Route

Run the workspace scaffolder from the repo root:

```bash
node prototype-workspace/scripts/create-task-prototype.mjs <taskId> --title "<Title>" [--author "<Name>"]
```

This creates:
- `prototype-workspace/app/{taskId}/page.tsx`
- `prototype-workspace/components/projects/{taskId}/index.tsx`
- an entry in `prototype-workspace/public/local-prototypes.json` (author/status metadata)

The route must render at `/{taskId}` and remain wrapped in `ProjectLayout`. The
prototype is auto-discovered by the bridge from its `app/{taskId}/page.tsx` file,
so it appears in the workspace listing as a "Local" prototype as soon as the files
exist — even if this scaffold step is skipped (metadata is then derived from the id).

### 3. Reuse Before Building

Before writing or replacing any component, search in this order:

1. `prototype-workspace/component-map.json` — pattern-to-component lookup
2. `prototype-workspace/components/shared/` — shared reusable components
3. `prototype-workspace/components/projects/*/` — reusable project-scoped patterns
4. Fluent v9 exports from `@fluentui/react-components`
5. Fluent Copilot exports from `@fluentui-copilot/react-copilot` and latency components where relevant

Run Fluent discovery from `prototype-workspace/` before building a custom primitive:

```bash
node -e "console.log(Object.keys(require('@fluentui/react-components')).filter(k=>/^[A-Z]/.test(k)&&/KW/i.test(k)).join('\n'))"
```

Replace `KW` with the component keyword (for example `Card`, `Dialog`, `Table`, `Field`, `Nav`, `Drawer`). For agent or chat UI, also inspect Fluent Copilot exports before creating custom message, prompt, reasoning, citation, or feedback UI.

If a match exists, use or extend it. Do not rebuild shared portal patterns such as `ProjectLayout`, page headers, metric cards, action cards, resource tables, service tiles, wizards, docked chat panels, or Copilot chat shells.

### 4. Generate Fluent UI React v9 Components

Implement the prototype in:
- `prototype-workspace/components/projects/{taskId}/index.tsx`
- Additional reusable files under `prototype-workspace/components/projects/{taskId}/`
- Shared reusable components under `prototype-workspace/components/shared/` only when the workspace convention says the pattern is reusable beyond the task

Every generated TSX file must:
- Use Fluent UI React v9 primitives from `@fluentui/react-components`
- Use Fluent Copilot components for copilot, agent, chat, prompt, reasoning, citation, feedback, latency, and AI surfaces
- Use `makeStyles` and Fluent tokens; no CSS Modules, Tailwind, or static HTML/CSS output
- Include the SafeTokens pattern:

```typescript
import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";
type SafeTokens = { [key:string]: any };
const tokens: SafeTokens = fluentTokens;
```

- Use Fluent typography components (`Text`, `Body1`, `Subtitle1`, `Title2`, etc.) instead of raw HTML text elements
- Use Fluent `Button`, `Card`, `Field`, `Input`, `Table`, `Badge`, `Divider`, `Dialog`, `TabList`, and related primitives instead of custom visual wrappers
- Use raw `<div>` only for layout containers that have no Fluent equivalent and no visual styling
- Use Azure service logos from `prototype-workspace/public/azure-service-icons/{category}/*.svg`
- Use custom portal icons from `prototype-workspace/public/icons/`
- Use `@fluentui/react-icons` for UI chrome icons
- Never inline SVG
- Avoid inline `style={}` except for truly dynamic values
- Use only the allowed hardcoded hex values: `#0078D4`, `#106EBE`, `#005A9E`; otherwise use Fluent tokens

### 5. Verify the Workspace Build

Run:

```bash
pnpm --dir prototype-workspace build
```

Fix TypeScript, lint, import, token, route, or static export failures before considering the prototype complete.

The workspace uses `output: "export"`, so this build also emits a self-contained static export at `prototype-workspace/out/{taskId}/index.html` (an offline fallback the bridge can serve).

**The in-task preview does NOT require a build.** The DesignLoop bridge auto-runs a managed live dev server for the workspace (default port 3100), so the task page embeds the live route `/{taskId}` directly with hot reload — the prototype appears in the Prototype phase as soon as the workspace route (`app/{taskId}/page.tsx`) exists. Still run the build to catch TypeScript, lint, token, and static-export errors before considering the prototype complete.

### 6. Write the Prototype Manifest Pointer

Generated prototype source lives in `prototype-workspace/`, not in `tasks/{taskId}/prototypes/`.

Create or update `tasks/{taskId}/prototypes/manifest.md` with:
- Task ID and title
- Workspace route: `/{taskId}`
- In-task embedded preview: live dev-server route `/{taskId}` (shown automatically in the Prototype phase of the task page; the bridge auto-runs the workspace on port 3100 — no build required). Static export fallback: `/prototype-workspace/out/{taskId}/index.html`
- Source paths:
  - `prototype-workspace/app/{taskId}/page.tsx`
  - `prototype-workspace/components/projects/{taskId}/`
- Shared components reused
- Fluent primitives and Fluent Copilot components used
- Icon sources used by tier
- Variants and states implemented
- Build command and result: `pnpm --dir prototype-workspace build`
- How to preview locally: `pnpm --dir prototype-workspace dev` then open `http://localhost:3000/{taskId}`

