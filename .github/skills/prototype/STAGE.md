---
stage: prototype
label: Prototype
coordinator-agent: prototyper
---

# Prototype Stage — Coordinator Playbook

## Purpose
Build every approved design into a runnable Fluent UI React v9 prototype in the
shared `prototype-workspace/`. Each task gets a Next.js route, workspace source,
optional Storybook stories, visual verification screenshots, and a pointer
manifest under the task's `prototypes/` folder before the stage is complete.

## Tools in This Stage

| Tool ID | Required | Depends On | Can Parallel |
|---|---|---|---|
| `figma-to-fluent` | no | Figma/design artifacts | yes (parallel across independent task routes) |
| `design-to-code` | yes | Design artifacts | no (one task route at a time) |
| `refactor-to-system` | no | `design-to-code` | yes (parallel across independent task routes) |
| `component-audit` | yes | `design-to-code` | no (quality gate after code generation/refactor) |
| `demo-pages` | yes | `component-audit` | yes (parallel across task routes) |
| `storybook-stories` | no | `design-to-code` | yes (parallel across components) |
| `visual-verification` | no | `demo-pages` | no (runs last) |

## Selection Logic

Before running any tool, check the workspace source and pointer manifest:

1. If the source design is a Figma file or Figma-derived artifact and no Fluent
   implementation exists yet, run `figma-to-fluent` or feed its output into
   `design-to-code`.
2. For each task in `tasks/{taskId}/designs/`: if
   `prototype-workspace/app/{taskId}/page.tsx`,
   `prototype-workspace/components/projects/{taskId}/`, and
   `tasks/{taskId}/prototypes/manifest.md` exist and
   `pnpm --dir prototype-workspace build` succeeds → skip `design-to-code`.
3. If code exists but violates workspace conventions (CSS Modules, Tailwind,
   hardcoded colors, inline SVG, missed shared components, raw HTML text
   elements, missing SafeTokens) → run `refactor-to-system`.
4. Run `component-audit` after `design-to-code` or `refactor-to-system` as the
   quality gate for Fluent primitives, shared-component reuse, token compliance,
   icon tiers, and source placement.
5. If the route `/{taskId}` renders all variants and states and the manifest
   documents `pnpm --dir prototype-workspace dev` → skip `demo-pages`.
6. If `prototype-workspace/components/projects/{taskId}/*.stories.tsx` exists for
   every story-worthy component → skip `storybook-stories`.
7. Run `visual-verification` only if Playwright is available and the workspace dev
   server or Storybook can be started.

`design-to-code` runs once per task route. Parallelise across independent task
routes, not within a single route.

## Execution Order

```
figma-to-fluent (optional source conversion)
              ↓
design-to-code (TaskA route) ──┐
design-to-code (TaskB route)   ├── (parallel across independent task routes)
design-to-code (TaskC route)   │
              ↓                │
refactor-to-system (optional)  │
              ↓                │
component-audit ───────────────┘
              ↓
demo-pages (workspace routes) ─┐
storybook-stories              ├── (parallel where independent)
              ↓                │
visual-verification ───────────┘
```

## Completion Criteria

Stage is complete when:
- Every approved design has a runnable route at `/{taskId}` in `prototype-workspace/app/{taskId}/`
- Prototype source lives in `prototype-workspace/components/projects/{taskId}/` or reused `prototype-workspace/components/shared/`
- `pnpm --dir prototype-workspace build` succeeds
- `component-audit` passes for Fluent primitives, shared-component reuse, SafeTokens, token compliance, icon tiers, and source placement
- `tasks/{taskId}/prototypes/manifest.md` points to the route, source paths, run commands, reused components, variants, and states
- Optional Storybook stories render under the workspace Fluent decorator
- Visual verification screenshots and report are saved when verification is requested

## Artifacts Expected

```
prototype-workspace/
  app/
    {taskId}/
      page.tsx
  components/
    projects/
      {taskId}/
        index.tsx
        *.tsx
        *.stories.tsx
    shared/
      *.tsx
  component-map.json

tasks/
  {taskId}/
    prototypes/
      manifest.md
      visual-verification.md
      screenshots/
        *.png
```

`tasks/{taskId}/prototypes/` is a pointer and evidence folder only. Do not place
prototype source code, CSS Modules, static HTML demos, or Storybook source there.

## Passing Context to Test

The Tester needs:
- Workspace route URL: `http://localhost:3000/{taskId}` after `pnpm --dir prototype-workspace dev`
- `tasks/{taskId}/prototypes/manifest.md` — source pointers, route, variants, states, run commands, reused components, and accessibility notes
- `prototype-workspace/components/projects/{taskId}/` and relevant `prototype-workspace/components/shared/` source for accessibility audit
- Optional Storybook URL after `pnpm --dir prototype-workspace storybook`
- `tasks/{taskId}/prototypes/screenshots/` and `visual-verification.md` for visual evidence
- `tasks/{taskId}/designs/` — specs to compare implementation against
