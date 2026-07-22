---
tool: component-spec
---

# Verification: Component Specification

## Dimensions

```yaml
dimensions:
  completeness:
    weight: 35
    threshold: 75
    failure_instruction: "The spec must include all required sections: Overview,
      Reuse Check, Fluent Implementation Mapping, Props/API, Variants, States, Fluent
      Token Mapping, Accessibility spec, and at least one usage example. Do not omit
      the reuse check or Fluent mapping — a generic component template is incomplete."

  fluent-precision:
    weight: 40
    threshold: 78
    failure_instruction: "The spec must cite real Fluent UI React v9 primitives, existing
      shared components from prototype-workspace/components/shared/, and/or matches from
      prototype-workspace/component-map.json. Every token reference must be an exact
      Fluent token name such as colorNeutralBackground1, colorBrandForeground1,
      spacingHorizontalM, fontSizeBase300, borderRadiusMedium, or shadow4. Remove any
      generic --{category}-{variant}-{scale} tokens or vague descriptions like 'primary
      color'."

  task-grounding:
    weight: 25
    threshold: 68
    failure_instruction: "This spec must be for the specific component requested, not
      a generic template. The component name, reuse decision, variants, states, token
      mapping, and usage examples must reflect the actual product context. If no shared
      component exists, document the search evidence and why a new component is justified."

accept_threshold: 80
```

## What the Verifier Checks

1. All 9 sections present (overview, reuse check, Fluent mapping, props, variants, states, tokens, a11y, examples)
2. Reuse check names searches in `component-map.json`, `components/shared/`, and Fluent exports
3. Shared components and Fluent primitives cited by exact name and import path
4. Every token is a real Fluent token name, not a generic CSS custom property
5. All applicable interactive states listed, including focus-visible and disabled
6. ARIA role, keyboard interaction, and screen reader behavior documented
7. Component name and context match the task request

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Which sections are incomplete or missing
- Which reuse checks were not performed
- Which Fluent components or tokens are invalid or generic
- The best output produced so far for manual completion
