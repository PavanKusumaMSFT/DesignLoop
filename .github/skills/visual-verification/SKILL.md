---
name: visual-verification
description: "Run Playwright visual regression checks against the running Fluent UI React v9 prototype workspace, document pixel-level diffs, categorise failures by severity, and produce a resolution report. Use after workspace demos are built to verify implementation fidelity."
argument-hint: "Task ID to verify (e.g., 'cost-dashboard — verify /cost-dashboard against design baseline')"
---

# Visual Verification

## When to Use
- After the workspace route demo is built and runnable
- When verifying that a code change has not introduced unintended visual regressions
- When signing off on Fluent prototype fidelity before accessibility audit

## Procedure

### 1. Read Source Artifacts

Load:
- `tasks/{taskId}/designs/` — component spec, wireframe, or design baseline reference
- `tasks/{taskId}/prototypes/manifest.md` — route, source paths, and run instructions
- `prototype-workspace/app/{taskId}/page.tsx` — route entry point
- `prototype-workspace/components/projects/{taskId}/` — implementation
- Existing baseline screenshots, if available in `tasks/{taskId}/prototypes/screenshots/` or a design-provided baseline folder

### 2. Start the Workspace Dev Server

Run the Next.js workspace server:

```bash
pnpm --dir prototype-workspace dev
```

Use the default Next port, `http://localhost:3000`. Verify the route responds before capturing screenshots:

```text
http://localhost:3000/{taskId}
```

If verification targets Storybook instead, run:

```bash
pnpm --dir prototype-workspace storybook
```

and use `http://localhost:6006` story URLs.

### 3. Define Test Coverage

For every variant and state in the component spec or manifest, create a verification case:

| Case ID | Target | Variant | State | Viewport | Expected Baseline |
|---------|--------|---------|-------|----------|-------------------|
| VV-01 | `/{taskId}` | Primary | Default | 1280px | Matches wireframe and Fluent tokens |
| VV-02 | `/{taskId}` | Primary | Hover | 1280px | Hover state color/elevation change |
| VV-03 | `/{taskId}` | Empty | Default | 375px | Responsive empty state layout |

Cover desktop and mobile viewports, route-level states, and Storybook stories if a component needs isolated capture.

### 4. Run Visual Checks

Use Playwright against the running workspace, not `file://` static HTML:

```typescript
test('task route — default desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('http://localhost:3000/{taskId}');
  await expect(page).toHaveScreenshot('{taskId}-default-1280.png', { fullPage: true });
});
```

Capture screenshots into:

```text
tasks/{taskId}/prototypes/screenshots/
```

For each failure, capture:
- The actual screenshot
- The diff image, when available
- The pixel difference count and percentage
- The bounding box of the largest diff region

### 5. Categorise Failures

| Severity | Criteria |
|----------|----------|
| **Critical** | Diff affects interactive area, text readability, color contrast, or task completion |
| **Major** | Diff affects layout structure, spacing > 4px off, wrong component, or wrong state rendered |
| **Minor** | Diff in decorative elements, sub-2px spacing difference, or non-blocking alignment |
| **Accepted** | Anti-aliasing or render engine differences — explicitly accepted |

### 6. Write the Diff Report

For each failure, write:

```
## VV-[N]: {Target} — {Variant} — {State} @ {Viewport}

**Severity**: Critical / Major / Minor / Accepted
**Pixel Diff**: {N}px² ({percentage}% of capture area)
**Region**: {Description of where the diff occurs}
**Screenshot**: tasks/{taskId}/prototypes/screenshots/{file}.png

**Expected**: {Description from design spec}
**Actual**: {Description of what was rendered}

**Root Cause**: {Token mismatch / Fluent primitive mismatch / incorrect state / layout / render engine}

**Resolution**: {Specific fix required — token, component prop, import, state, or explicit acceptance}
**Status**: Open / Fixed / Accepted
```

### 7. Write the Summary

At the top of the report:
- Route or Storybook URL verified
- Total cases run
- Pass / Fail / Accepted breakdown
- Critical and Major failures that block sign-off
- Dev server command used
- Screenshot folder path

### 8. Save the Report

Save the report to `tasks/{taskId}/prototypes/visual-verification.md`.

Save screenshots and diffs under `tasks/{taskId}/prototypes/screenshots/`. If no baselines exist yet, the first run creates them — annotate the report with "Initial baseline captured." Do not write prototype source into `tasks/{taskId}/prototypes/`.
