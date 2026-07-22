---
tool: storybook-stories
---

# Verification: Storybook Stories

## Dimensions

```yaml
dimensions:
  story-coverage:
    weight: 35
    threshold: 78
    failure_instruction: "The story file must include one story per variant from
      the component spec, one story per applicable interactive state, one
      AllVariants or equivalent matrix story, and one KeyboardNavigation play
      function story for interactive components. Add every missing story before
      re-submitting."

  fluent-story-runtime:
    weight: 30
    threshold: 80
    failure_instruction: "Stories must live in prototype-workspace and render
      under the workspace Storybook FluentProvider decorator. Use Fluent
      primitives, makeStyles, tokens, and SafeTokens for story-only layout. Do
      not use CSS Modules, Tailwind, inline styles except dynamic values, raw
      HTML text elements, placeholder imports, or providers that conflict with
      the workspace decorator."

  argtype-and-a11y-completeness:
    weight: 35
    threshold: 75
    failure_instruction: "Every prop in the component spec must have an argType
      with an appropriate control, one-line description, and default value. The
      a11y addon parameters must be enabled, and accessibility-critical stories
      must include play functions for keyboard navigation, focus, and required
      ARIA behavior."

accept_threshold: 78
```

## What the Verifier Checks

1. Stories are saved under `prototype-workspace/components/projects/{taskId}/` or the relevant shared component folder
2. Storybook uses CSF3 format with `Meta` and `StoryObj` types
3. Stories render under the workspace Fluent decorator (`FluentProvider`)
4. One story per component variant and applicable interactive state
5. AllVariants or equivalent matrix story present
6. KeyboardNavigation play function story present for interactive components
7. `@storybook/addon-a11y` parameters are enabled
8. Every prop has an argType with control, description, and defaultValue
9. No invalid imports, pseudocode, CSS Modules, Tailwind, or non-dynamic inline styles

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Missing story types (list which are absent)
- Story files outside `prototype-workspace`
- Props without argType entries (list by prop name)
- Missing a11y parameters or keyboard play functions
- Syntax errors, invalid imports, or Fluent provider conflicts
- The best output produced so far
