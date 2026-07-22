---
tool: design-with-fluent
---

# Verification: Design with Fluent

## Dimensions

```yaml
dimensions:
  workspace_fit:
    weight: 25
    threshold: 80
    failure_instruction: "Outputs must target prototype-workspace/components/projects/{taskId}/ and prototype-workspace/app/{taskId}/page.tsx, wrap pages with ProjectLayout, and follow prototype-workspace/AGENTS.md layout conventions. Fix any path, shell, or page composition mismatch before finishing."

  fluent_compliance:
    weight: 35
    threshold: 85
    failure_instruction: "Every generated TSX file must use makeStyles, the SafeTokens alias pattern, Fluent typography/components, approved icon sources, and only allowed Azure brand hex values. Remove Tailwind, CSS Modules, unsupported hardcoded colors, raw HTML text elements, inline SVG, and non-dynamic inline style."

  reuse_and_discovery:
    weight: 25
    threshold: 78
    failure_instruction: "The work must demonstrate shared-component reuse first. Re-check component-map.json, components/shared, components/projects, Fluent v9 exports, and Fluent Copilot exports. Replace rebuilt patterns with existing shared or library components."

  completeness:
    weight: 15
    threshold: 75
    failure_instruction: "The page and required project components must be complete, typed, accessible, and coherent for the task. Add missing states, labels, alt text, responsive behavior, and data-driven props before completing."

accept_threshold: 82
```

## What the Verifier Checks

1. Generated files are in the required `prototype-workspace/` paths for the task id.
2. Page code uses `ProjectLayout` and imports shared components where applicable.
3. Every generated TSX file includes the SafeTokens alias pattern.
4. Styling uses `makeStyles` and Fluent tokens; no Tailwind, CSS Modules, unsupported hex values, inline SVG, raw text elements, emoji, or static inline styles.
5. Fluent v9 and Fluent Copilot discovery was performed for custom UI needs.
6. Azure service logos, custom portal icons, and UI chrome icons use the correct source tier.
7. The output is specific to the requested design/task and not a generic page shell.

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- The composite score and failed dimensions
- The files that need more work
- The exact missing source artifact, shared-component ambiguity, or validation blocker
