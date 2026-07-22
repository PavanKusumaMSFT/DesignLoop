---
tool: demo-pages
---

# Verification: Demo Pages

## Dimensions

```yaml
dimensions:
  route-runnability:
    weight: 35
    threshold: 80
    failure_instruction: "The demo must be the runnable workspace route at
      /{taskId}, served with pnpm --dir prototype-workspace dev. Do not create
      self-contained static HTML, embedded CSS demos, or files under
      tasks/{taskId}/prototypes/ except the pointer manifest and screenshots.
      Fix route, provider, or runtime errors until the page renders."

  variant-and-state-coverage:
    weight: 40
    threshold: 78
    failure_instruction: "Every variant and interactive state listed in the
      component spec must be shown on the workspace route with a visible Fluent
      label. Include default, hover, focus, active, disabled, error, loading,
      empty, and success states where applicable. Add any missing state or
      scenario before re-submitting."

  manifest-and-accessibility-notes:
    weight: 25
    threshold: 72
    failure_instruction: "tasks/{taskId}/prototypes/manifest.md must document
      the route, run command, source paths, variants and states shown, reused
      shared components, accessibility notes, and optional Storybook path. The
      notes must reflect the actual Fluent/ARIA implementation, keyboard flow,
      focus behavior, and screen reader expectations."

accept_threshold: 78
```

## What the Verifier Checks

1. `/{taskId}` renders from `prototype-workspace/app/{taskId}/page.tsx`
2. Demo instructions use `pnpm --dir prototype-workspace dev` and `http://localhost:3000/{taskId}`
3. No self-contained static HTML demo is created
4. Every variant and interactive state is visible and labeled in the route
5. The route uses Fluent primitives, shared components, and SafeTokens-compliant styles
6. `tasks/{taskId}/prototypes/manifest.md` points to the workspace source and documents run instructions
7. Accessibility notes cover roles, keyboard flow, focus behavior, and screen reader expectations
8. Optional Storybook stories are linked when they exist

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Runtime or route errors
- Static HTML or misplaced prototype source found under `tasks/{taskId}/prototypes/`
- Variants or states missing from the route
- Missing or incomplete manifest run instructions
- Empty or placeholder accessibility notes
- The best output produced so far
