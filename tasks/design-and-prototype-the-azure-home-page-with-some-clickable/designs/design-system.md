---
title: "Azure Home Page — Design System Index"
phase: design
status: draft
created: 2026-07-21
updated: 2026-07-21
author: "Designer Agent"
related:
  - "./tokens/fluent-theme.md"
  - "./tokens/token-usage-guide.md"
  - "./components/AzureHomePage.md"
  - "./wireframes/index.md"
---

## Overview

Fluent UI React v9 design system reference for the Azure home page prototype. The page
is a **composition of existing shared components** — no new shared component was added.

## Theme

- Base: `webLightTheme` (via `ProjectLayout` → `FluentProvider`); `webDarkTheme` through `isDarkMode`.
- No custom `theme.ts`. See [tokens/fluent-theme.md](./tokens/fluent-theme.md).

## Token usage

See [tokens/token-usage-guide.md](./tokens/token-usage-guide.md) for the full color,
typography, spacing, radius, elevation, and motion token map. SafeTokens pattern is used
in the page component.

## Shared component inventory (reused)

| Pattern | Component | Path |
|---|---|---|
| `page-header-bar` | `AzureHeaderBuildMVP` | `components/shared/azure-header-buildmvp` |
| `icon-title-description-cta-card` | `ActionCard` / `ActionCardGrid` | `components/shared/action-card` |
| `service-selection-tile` | `ServiceTile` / `ServiceTileGrid` | `components/shared/service-tile` |
| `page-layout-shell` | `ProjectLayout` | `components/shared/project-layout` |

## Composed component

| Component | Path | Spec |
|---|---|---|
| `AzureHomePage` | `components/projects/azure-home-page/index.tsx` | [components/AzureHomePage.md](./components/AzureHomePage.md) |

## Fluent rules honoured

- `makeStyles` + Fluent tokens only; no Tailwind, CSS Modules, or styled-components.
- No inline `style={}` except one layout-constant `Divider` margin.
- Only Fluent tokens for color (brand blues live in shared chrome, not the page).
- `@fluentui/react-icons` for UI chrome; `<img src="/icons/*.svg">` for Azure logos; no inline SVG.
- Typography via Fluent `Text` / `Link`.

## Verification

`npx next build` passes; `/azure-home-page` prerenders as a static route (18.2 kB).
