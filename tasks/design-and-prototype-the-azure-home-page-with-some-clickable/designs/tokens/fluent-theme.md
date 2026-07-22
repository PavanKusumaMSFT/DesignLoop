---
title: "Azure Home Page — Fluent Theme"
phase: design
status: draft
created: 2026-07-21
updated: 2026-07-21
author: "Designer Agent"
related:
  - "./token-usage-guide.md"
---

## Theme selection

Use the stock Fluent UI React v9 **`webLightTheme`** supplied by
`prototype-workspace/components/shared/project-layout.tsx` (which wraps the page in
`FluentProvider`). Dark mode is available via the component's `isDarkMode` prop
(passes `webDarkTheme` through the header chrome).

**No custom `theme.ts` is required.** The Azure home page needs no bespoke brand
palette beyond what Fluent's neutral + brand ramps already provide. The Azure brand
blues (`#0078D4`, `#106EBE`, `#005A9E`) are the only permitted hardcoded hex values
and are already expressed through Fluent's `colorBrand*` tokens in the header shell —
so the page itself hardcodes no colors.

### Rationale

- The prototype-workspace contract mandates Fluent v9 + `makeStyles` + tokens. The
  home page composes existing shared components (`AzureHeaderBuildMVP`, `ActionCard`,
  `ServiceTile`) that already consume the theme.
- Introducing a `createLightTheme` override would add drift risk for zero visual gain;
  the neutral/brand tokens cover every surface, border, text, and focus need here.

### Light / dark behaviour

| Surface | Light token | Behaviour |
|---|---|---|
| Page background | `colorNeutralBackground2` | Inverts to dark neutral under `webDarkTheme`. |
| Cards / tiles / link rows | `colorNeutralBackground1` | Elevated surface, inverts automatically. |
| Primary text | `colorNeutralForeground1` | High-contrast in both modes. |
| Secondary/meta text | `colorNeutralForeground2` / `3` | AA contrast preserved by Fluent ramps. |
| Borders | `colorNeutralStroke2` → `Stroke1` on hover | Theme-aware. |
| Focus ring | `colorStrokeFocus2` | Theme-aware, meets non-text contrast. |

All tokens resolve through `FluentProvider`; switching the provider theme requires no
page changes.
