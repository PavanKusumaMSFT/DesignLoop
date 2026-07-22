---
title: "Azure Home Page — Wireframe Specification"
phase: design
status: draft
created: 2026-07-21
updated: 2026-07-21
author: "Designer Agent"
related:
  - "../tokens/fluent-theme.md"
  - "../tokens/token-usage-guide.md"
  - "../components/AzureHomePage.md"
  - "../../prototypes/manifest.md"
---

## Assumptions

No prior Discover/Define/Ideate artifacts existed for this task and no source URLs
were provided. This wireframe is synthesised directly from the user instruction
("Design and prototype the Azure home page with some clickable links") and grounded
in the existing `prototype-workspace` Fluent UI React v9 component library. The Azure
portal home-page mental model (header + search, quick actions, popular services,
recent resources, resource links) is treated as the reference structure.

## Screen: Azure Home Page (`/azure-home-page`)

Forward-looking, spacious, card-based portal home — **not** the dense classic (v8)
blade layout. Single screen, one state (loaded). All primary elements are clickable.

### Layout regions (top → bottom)

| Region | Pattern (`component-map.json`) | Fluent / shared component | Notes |
|---|---|---|---|
| Global header | `page-header-bar` | `AzureHeaderBuildMVP` (`shared/azure-header-buildmvp`) | Brand background, centered search, Copilot button, nav panel. `activeLink="home"`. |
| Welcome hero | — | `Text as="h1"` (Hero800) + `Text as="p"` (Base400) | Title "Welcome to Azure" + one-line subtitle. |
| Get started (quick actions) | `icon-title-description-cta-card` | `ActionCard` + `ActionCardGrid` (3 cols) | 3 clickable cards, each with CTA button. |
| Popular services | `service-selection-tile` | `ServiceTile` + `ServiceTileGrid` (3 cols) | 6 clickable service tiles, Free badges. |
| Recent resources | — | Native `<button>` link rows in `makeStyles` list | 4 clickable rows: title + meta + chevron. |
| Navigate | — | Native `<button>` link rows | 3 clickable shortcut rows. |
| Useful links | — | Fluent `Link` (external, new tab) | 4 external doc links with open-in-new icon. |

### Content hierarchy

1. **Hero** — `fontSizeHero800` semibold title, `fontSizeBase400` `colorNeutralForeground2` subtitle.
2. **Section titles** — `fontSizeBase500` semibold, `colorNeutralForeground1`, `spacingVerticalL` bottom margin.
3. **Two-column band** at the bottom: Recent resources (2fr) | Navigate + Useful links (1fr). Collapses to 1 column below 900px.

### Interactions (all clickable links)

| Element | Action | Destination |
|---|---|---|
| "Create a resource" card | `router.push` | `/create-vm` |
| "Explore services" card | `router.push` | `/all-services` |
| "Build with AI" card | `router.push` | `/agents` |
| Service tiles (6) | `router.push` | `/create-vm`, `/all-services` |
| Recent resource rows (4) | `router.push` | `/resource-manager-mvp`, `/create-vm`, `/all-services` |
| Navigate rows (3) | `router.push` | `/all-services`, `/search`, `/agents` |
| Useful links (4) | `href` new tab | learn.microsoft.com, azure.microsoft.com, azure.status.microsoft |
| Header search / Copilot / nav | handled by `AzureHeaderBuildMVP` | — |

### Responsive

- `1200px` max content width, `48px 32px` padding.
- Action cards: 3 → 2 (`≤1200px`) → 1 (`≤768px`) columns (grid built into `ActionCardGrid`).
- Service tiles: 3 → 2 (`≤900px`) → 1 (`≤600px`) columns.
- Bottom band: 2fr/1fr → single column (`≤900px`).

### Accessibility annotations

- Link rows are real `<button type="button">` elements — keyboard focusable, Enter/Space activate.
- Visible focus ring via `:focus-visible` using `colorStrokeFocus2`, 2px offset.
- External links carry `target="_blank"` + `rel="noreferrer"` and a visible open-in-new icon so the new-tab behaviour is signalled, not implied.
- All text via Fluent `Text`/`Link` (no raw typography), meeting WCAG 2.1 AA contrast through neutral foreground tokens on `colorNeutralBackground1`/`2`.
- Service/CTA icons are decorative (`alt=""` inside `ActionCard`/`ServiceTile`); the accessible name comes from the adjacent title text.
