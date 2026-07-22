---
title: "Component Spec — AzureHomePage"
phase: design
status: draft
created: 2026-07-21
updated: 2026-07-21
author: "Designer Agent"
related:
  - "../wireframes/home-page.md"
  - "../tokens/token-usage-guide.md"
---

## Reuse check (mandatory, done before authoring)

Searched `prototype-workspace/component-map.json`, `components/shared/`, and Fluent v9
exports. Findings:

| Need | Existing asset | Decision |
|---|---|---|
| Header + search | `AzureHeaderBuildMVP` (`page-header-bar`) | **Reuse** as-is. |
| Quick-action cards | `ActionCard` + `ActionCardGrid` (`icon-title-description-cta-card`) | **Reuse** as-is. |
| Service tiles | `ServiceTile` + `ServiceTileGrid` (`service-selection-tile`) | **Reuse** as-is. |
| Page shell / theme | `ProjectLayout` | **Reuse** (`fullWidth`, `hideProjectHeader`). |
| Link rows / external links | — | Compose Fluent `Link` + native `<button>` in `makeStyles`; too page-specific to warrant a new shared component yet. |

> Existing shared homepages `HpFre` and `HpReturning` were reviewed but are tailored to
> the FRE / returning-user flows with their own fixed content. This task asks for a
> generic Azure home page with clickable links, so a thin new page composition
> (`AzureHomePage`) that reuses the shared building blocks is the right fit rather than
> forking either.

## Component: `AzureHomePage`

- **Location:** `prototype-workspace/components/projects/azure-home-page/index.tsx`
- **Route wrapper:** `prototype-workspace/app/azure-home-page/page.tsx`
- **Type:** page composition (client component).

### Props

| Prop | Type | Default | Purpose |
|---|---|---|---|
| `isDarkMode` | `boolean` | `false` | Forwarded to `AzureHeaderBuildMVP` for dark chrome. |

### Composed from

`ProjectLayout`, `AzureHeaderBuildMVP`, `ActionCard` / `ActionCardGrid`,
`ServiceTile` / `ServiceTileGrid`, Fluent `Text`, `Link`, `Divider`, and
`@fluentui/react-icons` (`ChevronRight16Regular`, `Open16Regular`, `Add24Regular`,
`AppsListDetail24Regular`, `Sparkle24Regular`).

### Regions & variants

1. **Hero** — title + subtitle (`Text`).
2. **Get started** — `ActionCardGrid` (3 cols) of 3 `ActionCard`s, each with a CTA button + card click → `router.push`.
3. **Popular services** — `ServiceTileGrid` (3 cols) of 6 `ServiceTile`s (Free badge variant on 4).
4. **Recent resources** — list of clickable `<button>` rows (title + meta + chevron).
5. **Navigate** — list of clickable `<button>` rows.
6. **Useful links** — external `Link`s (new tab + open-in-new icon).

### States

- **Rest** — default surfaces/borders.
- **Hover** (rows/cards/tiles) — `colorNeutralBackground1Hover`, `colorNeutralStroke1`, `shadow4`, `durationNormal`.
- **Focus-visible** — 2px `colorStrokeFocus2` outline, 2px offset.
- No loading/empty/error states — content is static.

### Accessibility requirements

- Every clickable link is a real interactive element (`<button type="button">`, Fluent `Link`, or Fluent `Button` inside cards) — keyboard operable, correct roles.
- Focus indicator visible and AA non-text-contrast compliant (`colorStrokeFocus2`).
- External links: `target="_blank"` + `rel="noreferrer"` + visible open-in-new icon.
- Text contrast ≥ 4.5:1 (normal) / 3:1 (large) via neutral foreground tokens on neutral backgrounds.
- Decorative icons use empty `alt`; accessible name derives from adjacent text.
- Headings use semantic `Text as="h1"/"h2"` for a logical outline.

### Token mapping

See [token-usage-guide.md](../tokens/token-usage-guide.md). No hardcoded colors on the
page; layout constants (`1200px`, `48px 32px`, `48px` gap, grid templates) remain
literals per workspace rules.
