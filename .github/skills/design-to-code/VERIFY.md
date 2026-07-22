---
tool: design-to-code
---

# Verification: Design to Code

## Dimensions

```yaml
dimensions:
  workspace-build:
    weight: 25
    threshold: 85
    failure_instruction: "The prototype must compile in the shared workspace with
      pnpm --dir prototype-workspace build. Fix every TypeScript, route, import,
      Storybook-incompatible export, and static export error before submitting.
      Source must live under prototype-workspace/app/{taskId}/ and
      prototype-workspace/components/projects/{taskId}/, with only a pointer
      manifest under tasks/{taskId}/prototypes/."

  fluent-token-compliance:
    weight: 25
    threshold: 85
    failure_instruction: "Every generated TSX file must use makeStyles and the
      SafeTokens pattern: import makeStyles and tokens as fluentTokens from
      @fluentui/react-components, define type SafeTokens = { [key:string]: any },
      and assign const tokens: SafeTokens = fluentTokens. No CSS Modules,
      Tailwind classes, or inline style props except truly dynamic values. Replace
      all hardcoded colors with Fluent tokens except #0078D4, #106EBE, and
      #005A9E."

  reuse-and-fluent-primitives:
    weight: 25
    threshold: 80
    failure_instruction: "Before custom code, the implementation must consult
      prototype-workspace/component-map.json, prototype-workspace/components/shared/,
      and Fluent export discovery. Use shared components and Fluent primitives
      instead of custom card, table, form, dialog, badge, typography, or button
      wrappers. Raw HTML text elements such as h1, p, and span must be replaced
      with Fluent typography components."

  spec-fidelity-and-icons:
    weight: 25
    threshold: 78
    failure_instruction: "The route must implement every variant, state, and key
      interaction from the design source. Icons must follow the correct tier:
      Azure service logos from public/azure-service-icons, portal-specific icons
      from public/icons, and UI chrome from @fluentui/react-icons. Inline SVG is
      not allowed. Fluent Copilot components must be used for chat, prompt,
      reasoning, feedback, citation, latency, and agent surfaces."

accept_threshold: 82
```

## What the Verifier Checks

1. `pnpm --dir prototype-workspace build` succeeds
2. Source is in `prototype-workspace/app/{taskId}/` and `prototype-workspace/components/projects/{taskId}/`
3. `tasks/{taskId}/prototypes/manifest.md` exists and points to the route, source, reused components, and run commands
4. SafeTokens pattern appears in every generated TSX file that uses Fluent tokens
5. No CSS Modules, Tailwind classes, static HTML demos, or non-dynamic inline styles
6. No hardcoded colors except `#0078D4`, `#106EBE`, and `#005A9E`
7. Shared components and Fluent primitives are used before custom implementations
8. Raw HTML text elements are avoided in favor of Fluent typography components
9. Icons use the correct Azure logo, portal icon, or Fluent icon tier; no inline SVG
10. All specified variants, states, interactions, and Copilot/agent surfaces are implemented

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Build errors from `pnpm --dir prototype-workspace build`
- Files outside the workspace source or missing manifest pointer
- Token, SafeTokens, CSS Module, Tailwind, inline style, or hardcoded color violations
- Missed shared-component or Fluent primitive reuse opportunities
- Incorrect icon tier or inline SVG usage
- Missing variants, states, interactions, or Copilot component mappings
- The best output produced so far
