---
name: demo-pages
description: "Prepare the runnable prototype workspace route as the demo surface, ensuring it renders all variants and interactive states and documenting how stakeholders can run it. Use after design-to-code to create previewable Fluent UI React v9 demos."
argument-hint: "Task ID (e.g., 'cost-dashboard — route demo with all variants and states')"
---

# Demo Pages

## When to Use
- After design-to-code has produced the Fluent UI React v9 workspace route
- When accessibility audit or visual verification will run next
- When stakeholders need a browser-runnable prototype via the Next.js dev server

## Procedure

### 1. Read Source Artifacts

Load:
- `tasks/{taskId}/designs/` — component spec, wireframes, Fluent theme, variants, and states
- `prototype-workspace/app/{taskId}/page.tsx` — route entry point
- `prototype-workspace/components/projects/{taskId}/` — prototype implementation
- `tasks/{taskId}/prototypes/manifest.md` — pointer document, if present

### 2. Plan the Demo Route Structure

The demo is the workspace route itself, not a self-contained HTML file.

Ensure `prototype-workspace/app/{taskId}/page.tsx` renders a route at `/{taskId}` that covers:
- All variants listed in the component spec
- All interactive states: default, hover, focus, active, disabled, error, loading (where applicable)
- Empty, loading, success, error, and edge states defined by the design
- Desktop and mobile-responsive layouts
- Any light or dark theme behavior supported by the workspace

### 3. Render Variants and States in the Fluent Workspace

Update the route and project components so the demo:
- Uses `ProjectLayout` and workspace providers already established by the scaffold
- Uses Fluent UI React v9 primitives and shared components
- Uses Fluent Copilot components for agent, chat, prompt, reasoning, feedback, citation, and latency surfaces
- Uses `makeStyles`, Fluent tokens, and the SafeTokens pattern
- Does not use CSS Modules, Tailwind, self-contained static HTML, or embedded `<style>` blocks
- Avoids inline `style={}` except for truly dynamic values
- Avoids raw HTML text elements; use Fluent typography components
- Uses the correct icon tier: Azure service logos from `public/azure-service-icons`, portal icons from `public/icons`, UI chrome from `@fluentui/react-icons`

### 4. Label Every Demo Item

Every variant and state instance must be visibly labeled in the route with:
- The variant name matching the component spec
- The state name
- Relevant prop values or scenario data

Use Fluent typography components for labels.

### 5. Document How to Run

Create or update `tasks/{taskId}/prototypes/manifest.md` with demo instructions:

```bash
pnpm --dir prototype-workspace dev
```

Then open:

```text
http://localhost:3000/{taskId}
```

Include the route path `/{taskId}`, the workspace source paths, and the variants and states shown.

### 6. Optionally Add Storybook

If stakeholders need isolated component review, add or request Storybook stories in `prototype-workspace/components/projects/{taskId}/*.stories.tsx` using the storybook-stories skill. Do not replace the route demo with static HTML.
