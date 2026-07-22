---
tool: design-system-setup
---

# Verification: Design System Setup

## Dimensions

```yaml
dimensions:
  fluent-token-coverage:
    weight: 35
    threshold: 80
    failure_instruction: "The output must include fluent-theme.md and token-usage-guide.md
      under tasks/{taskId}/designs/tokens/. The guide must map design intents to real
      Fluent UI React v9 token families for color, spacing, typography, radius, stroke,
      elevation, and motion. Replace invented token names or CSS custom properties with
      exact Fluent token names such as colorNeutralBackground1, spacingHorizontalM,
      fontSizeBase300, borderRadiusMedium, and shadow4."

  fluent-theme-discipline:
    weight: 35
    threshold: 78
    failure_instruction: "The theme documentation must select webLightTheme, webDarkTheme,
      or both, and explain any createLightTheme/createDarkTheme brand ramp customization.
      Azure brand hex values (#0078D4, #106EBE, #005A9E) may appear only in theme
      documentation or theme.ts, never as component styling guidance. Do not create a
      generic tokens.css or --{category}-{variant}-{scale} token scheme."

  task-grounding:
    weight: 30
    threshold: 70
    failure_instruction: "The Fluent theme choice and token mappings must reflect the
      actual product context described in the task and reference the prototype workspace
      contract. If no brand customization is needed, state that default webLightTheme and
      webDarkTheme are used and explain why. Document light and dark mode implications."

accept_threshold: 82
```

## What the Verifier Checks

1. `fluent-theme.md` and `token-usage-guide.md` exist in `tasks/{taskId}/designs/tokens/`
2. `theme.ts` exists only when brand customization is needed
3. Token guidance uses Fluent token names, not invented CSS custom properties
4. No generic token JSON files or `tokens.css` scheme are produced
5. Brand colors are confined to theme documentation or the theme snippet
6. Light and dark behavior is documented

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Which required Fluent theme or token guide files are missing
- Which token names are invented or non-Fluent
- Whether brand colors are leaking outside theme customization
- The best output produced so far
