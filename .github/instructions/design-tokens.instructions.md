---
description: "Use when editing design token files, creating CSS custom properties, or working with design system variables. Covers naming conventions, required categories, and forbidden patterns."
applyTo: ["**/tokens/**", "**/design-system/**"]
---

# Design Token Standards — Fluent UI React v9

## Prototype and React Code

Design and Prototype phase React code must use Fluent UI React v9 tokens from `@fluentui/react-components`, not bespoke CSS custom-property token systems.

```tsx
import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";
type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
```

Use these Fluent token families in `makeStyles`:

| Need | Fluent token families |
|------|-----------------------|
| Neutral colors | `colorNeutralBackground*`, `colorNeutralForeground*`, `colorNeutralStroke*` |
| Brand colors | `colorBrandBackground*`, `colorBrandForeground*`, `colorBrandStroke*` |
| Status colors | `colorPaletteRed*`, `colorPaletteGreen*`, `colorStatus*` |
| Spacing | `spacingHorizontal*`, `spacingVertical*` |
| Typography | `fontSize*`, `fontWeight*`, `lineHeight*`, `fontFamily*` |
| Shape | `borderRadius*`, `strokeWidth*` |
| Elevation | `shadow2`, `shadow4`, `shadow8`, `shadow16`, `shadow28`, `shadow64` |
| Motion | `duration*`, `curve*` |

Brand customization belongs in the `FluentProvider` theme. Use Azure brand blues only for theme seed values or approved brand accents: `#0078D4`, `#106EBE`, `#005A9E`.

## Forbidden in Prototype React Code

- No CSS Modules or styled-components for token application.
- No Tailwind utility classes.
- No generic `var(--color-*)`, `var(--spacing-*)`, or `--{category}-{variant}-{scale}` mandates inside TSX prototypes.
- No hardcoded hex colors except `#0078D4`, `#106EBE`, `#005A9E`.
- No hardcoded font stacks, font sizes, line heights, shadows, radii, or spacing where a Fluent token exists.
- No inline `style={}` except truly dynamic values.

## Non-React Design Artifacts

The older generic token convention (`--{category}-{variant}-{scale}`, such as `--color-primary-500` or `--spacing-md`) may still be useful in non-React design documents, exported token references, or exploratory design-system notes. When those artifacts are later implemented in `prototype-workspace/`, map them to Fluent token families and a `FluentProvider` theme rather than carrying custom CSS variables into React components.

## Token File Guidance

- Store source design-token documentation under the task's `designs/tokens/` directory when the Design phase needs it.
- Store runnable React theme code in `prototype-workspace/` when the Prototype phase needs it.
- Document any Azure brand theme overrides explicitly, including why a Fluent default was not sufficient.
