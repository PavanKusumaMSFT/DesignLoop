---
title: "Azure Home Page — Token Usage Guide"
phase: design
status: draft
created: 2026-07-21
updated: 2026-07-21
author: "Designer Agent"
related:
  - "./fluent-theme.md"
  - "../components/AzureHomePage.md"
---

## SafeTokens pattern (required in every TSX)

```tsx
import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";
type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
```

## Token families used on the home page

### Color

| Purpose | Token |
|---|---|
| Page background | `colorNeutralBackground2` |
| Card / tile / link-row surface | `colorNeutralBackground1` |
| Link-row hover surface | `colorNeutralBackground1Hover` |
| Primary text (title, section titles, link labels) | `colorNeutralForeground1` |
| Subtitle text | `colorNeutralForeground2` |
| Meta text, chevron | `colorNeutralForeground3` |
| Rest border | `colorNeutralStroke2` |
| Hover border | `colorNeutralStroke1` |
| Keyboard focus ring | `colorStrokeFocus2` |
| Brand (header, links, CTA) | `colorBrand*` (via shared components) |

### Typography

| Element | Size token | Weight |
|---|---|---|
| Hero title | `fontSizeHero800` / `lineHeightHero800` | `fontWeightSemibold` |
| Subtitle | `fontSizeBase400` / `lineHeightBase400` | `fontWeightRegular` |
| Section title | `fontSizeBase500` | `fontWeightSemibold` |
| Link-row label | `fontSizeBase300` | `fontWeightMedium` |
| Link-row meta | `fontSizeBase200` | `fontWeightRegular` |

> `fontWeightBold` (700) does not exist in Fluent tokens — use `fontWeightSemibold`.

### Spacing (4px grid)

| Usage | Token |
|---|---|
| Section vertical rhythm | `spacingVerticalXXXL` |
| Section-title bottom margin | `spacingVerticalL` |
| Link-row inner padding (Y) | `spacingVerticalM` |
| Link-row inner padding (X) | `spacingHorizontalL` |
| Link list gap | `spacingVerticalS` |
| Icon/label gaps | `spacingHorizontalXS` / `spacingHorizontalS` |

Layout constants left as literals per workspace rules: `maxWidth: "1200px"`,
`padding: "48px 32px"`, grid `gap: "48px"`, grid templates, and media-query widths.

### Radius / elevation / motion

| Usage | Token |
|---|---|
| Link-row / resource-links radius | `borderRadiusLarge` |
| Card radius | `borderRadius2XLarge` (from `ActionCard` default) |
| Hover elevation | `shadow4` |
| Hover transition | `durationNormal` |

## Rules honoured

- No inline `style={{}}` except the single dynamic `Divider` margin (layout constant).
- No hardcoded colors on the page (only Fluent tokens; brand blues live in shared chrome).
- UI-chrome icons from `@fluentui/react-icons`; Azure service logos via
  `<img src="/icons/*.svg">`; no inline SVG.
- All typography rendered through Fluent `Text` / `Link`.
