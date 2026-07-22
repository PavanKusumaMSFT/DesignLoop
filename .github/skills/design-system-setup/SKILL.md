---
name: design-system-setup
description: "Document the Fluent UI React v9 theme, token usage, and brand customization for the prototype workspace. Use when selecting webLightTheme/webDarkTheme, mapping design intent to Fluent token families, or preparing a createLightTheme snippet."
argument-hint: "Describe the product brand direction and whether light/dark or Azure-blue customization is needed"
---

# Design System Setup

## When to Use
- Starting a task that needs a Fluent UI React v9 design foundation
- Choosing between `webLightTheme`, `webDarkTheme`, or an Azure-branded Fluent theme
- Mapping product design intent to Fluent token names before component specs or prototypes
- Documenting how the prototype workspace should use Fluent tokens and theme providers

## Procedure

### 1. Gather Requirements
Ask or infer from source artifacts:
- Product surface and Azure portal context
- Required theme modes: light, dark, or both
- Whether default Fluent brand is sufficient or Azure-blue brand customization is needed
- Any accessibility constraints for contrast, density, or motion

### 2. Read Fluent Workspace References
Before writing token guidance, inspect the prototype workspace sources:
- `prototype-workspace/AGENTS.md` — Fluent v9 rules, allowed styling patterns, icon rules, and do/don't guidance
- `prototype-workspace/component-map.json` — existing shared patterns that component specs should reference
- `prototype-workspace/components/shared/` — vendored shared components and theme/provider patterns

Use Fluent UI React v9 as the token source of truth. Do not invent a parallel CSS custom property scheme.

### 3. Create Fluent Theme Documentation
Create `tasks/{taskId}/designs/tokens/fluent-theme.md` documenting:
- The selected base theme: `webLightTheme`, `webDarkTheme`, or both
- Where the theme is applied in `prototype-workspace` (for example, `FluentProvider` or shared `ThemeProvider`)
- Any brand customization decision and rationale
- The allowed Azure brand blues: `#0078D4`, `#106EBE`, `#005A9E`
- How light and dark mode preserve contrast and state visibility

### 4. Create Token Usage Guide
Create `tasks/{taskId}/designs/tokens/token-usage-guide.md` mapping design intent to exact Fluent token names.

Include these Fluent token families:
- **Color**: `colorNeutralBackground1`, `colorNeutralBackground2`, `colorNeutralForeground1`, `colorNeutralForeground2`, `colorNeutralStroke1`, `colorBrandBackground`, `colorBrandForeground1`, `colorPaletteRedForeground1`, `colorPaletteGreenForeground1`, `colorPaletteYellowForeground1`
- **Spacing**: `spacingHorizontalS`, `spacingHorizontalM`, `spacingHorizontalL`, `spacingHorizontalXXL`, `spacingVerticalS`, `spacingVerticalM`, `spacingVerticalL`, `spacingVerticalXXL`
- **Typography**: `fontSizeBase200`, `fontSizeBase300`, `fontSizeBase400`, `fontSizeBase500`, `fontSizeHero800`, `fontWeightRegular`, `fontWeightMedium`, `fontWeightSemibold`, `lineHeightBase300`, `lineHeightBase400`
- **Shape and stroke**: `borderRadiusSmall`, `borderRadiusMedium`, `borderRadiusLarge`, `borderRadiusXLarge`, `strokeWidthThin`, `strokeWidthThick`
- **Elevation and motion**: `shadow4`, `shadow8`, `shadow16`, `durationNormal`, `curveEasyEase`

For each row, provide: Design intent | Fluent token | Use for | Do not use for | Light/dark considerations.

### 5. Add Theme Snippet Only When Needed
If brand customization is needed, create `tasks/{taskId}/designs/tokens/theme.ts` with a snippet for `prototype-workspace` using Fluent APIs:

```ts
import { createLightTheme, createDarkTheme, BrandVariants } from "@fluentui/react-components";

const azureBrandRamp: BrandVariants = {
  10: "#005A9E",
  20: "#005A9E",
  30: "#005A9E",
  40: "#005A9E",
  50: "#106EBE",
  60: "#0078D4",
  70: "#0078D4",
  80: "#0078D4",
  90: "#0078D4",
  100: "#0078D4",
  110: "#0078D4",
  120: "#0078D4",
  130: "#0078D4",
  140: "#0078D4",
  150: "#0078D4",
  160: "#0078D4",
};

export const azureLightTheme = createLightTheme(azureBrandRamp);
export const azureDarkTheme = createDarkTheme(azureBrandRamp);
```

Explain that the Azure blues are confined to the brand ramp/theme definition; component styles must consume Fluent tokens such as `colorBrandForeground1` and `colorBrandBackground`.

### 6. Validate Outputs
Confirm:
- No `colors.json`, `typography.json`, `spacing.json`, `elevation.json`, `motion.json`, `tokens.css`, or generic token CSS files were created
- All token names are real Fluent token families, not `--{category}-{variant}-{scale}` names
- Brand colors appear only in theme documentation or `theme.ts`, never as component styling guidance
- Both light and dark behavior are documented

## Fluent Token Families

Use Fluent UI React v9 token names exactly as exported by `tokens` from `@fluentui/react-components`.

```
Color:      colorNeutralBackground1, colorNeutralForeground1, colorBrandForeground1, colorBrandBackground
Spacing:    spacingHorizontalM, spacingVerticalM, spacingHorizontalL, spacingVerticalL
Typography: fontSizeBase300, fontSizeBase500, fontWeightSemibold, lineHeightBase400
Radius:     borderRadiusMedium, borderRadiusLarge, borderRadiusXLarge
Stroke:     strokeWidthThin, strokeWidthThick
Elevation:  shadow4, shadow8, shadow16
Motion:     durationNormal, curveEasyEase
```

Do not create custom CSS variable names for these values. Component code in the prototype workspace must use:

```ts
import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";
type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
```
