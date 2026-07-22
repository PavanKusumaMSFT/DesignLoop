---
title: "Azure Home Page — Prototype Manifest"
phase: prototype
status: draft
created: 2026-07-21
updated: 2026-07-21
author: "Designer Agent"
related:
  - "../designs/design-system.md"
  - "../designs/components/AzureHomePage.md"
---

## Pointer manifest

This folder holds only a pointer to the runnable prototype source (which lives in the
shared `prototype-workspace/`) plus any Playwright screenshots. No React source is
stored here.

## Runnable prototype

| Item | Value |
|---|---|
| Project id | `azure-home-page` |
| Route | `/azure-home-page` |
| Page wrapper | `prototype-workspace/app/azure-home-page/page.tsx` |
| Component | `prototype-workspace/components/projects/azure-home-page/index.tsx` |
| Registry entry | `prototype-workspace/data/projects.ts` (`id: "azure-home-page"`) |
| Stack | Next.js + Fluent UI React v9 (`webLightTheme`) |

## How to run

```bash
cd prototype-workspace
pnpm install          # first time only
pnpm dev              # dev server → http://localhost:3000/azure-home-page
# or a production static export:
npx next build        # outputs to out/ ; route: out/azure-home-page/index.html
```

## Clickable links in the prototype

| Element | Destination |
|---|---|
| Get started → Create a resource | `/create-vm` |
| Get started → Explore services | `/all-services` |
| Get started → Build with AI | `/agents` |
| Popular services (6 tiles) | `/create-vm`, `/all-services` |
| Recent resources (4 rows) | `/resource-manager-mvp`, `/create-vm`, `/all-services` |
| Navigate (3 rows) | `/all-services`, `/search`, `/agents` |
| Useful links (4) | learn.microsoft.com/azure, learn.microsoft.com/training, azure.microsoft.com/pricing, azure.status.microsoft (new tab) |

## Verification

- `npx next build` completes successfully; `/azure-home-page` generated as a static
  route (18.2 kB, 339 kB first load).
- Live route Playwright-verified at `http://localhost:3000/azure-home-page/`
  (auth-bypassed via `?auditBridge=1`). Page renders the full composition: header,
  hero, Get started cards, Popular services tiles, Recent resources, Navigate, and
  Useful links.
- Clickable-link navigation confirmed via Playwright (see
  `visual-verification.md`): Get started CTA → `/create-vm`; Navigate rows →
  `/all-services`, `/search`, `/agents`; Recent resource row → `/resource-manager-mvp`;
  service tile → `/create-vm`; external links carry correct `href` + `target="_blank"`
  + `rel="noreferrer"`.

## Environment fix applied during verification

Rendering `AzureHeaderBuildMVP` initially threw `presenceFn is not a function` — a
pre-existing, workspace-wide dependency bug (two duplicate copies of
`@fluentui/react-motion`: 9.15.0 via an old `react-popover@9.14.2` pulled by
`react-datepicker-compat`, and 9.16.1 via `react-components@9.74.3`). This affected
every page using the header (reproduced on `/engops-agent/prototype`), not just this
task. Resolved by adding `pnpm-workspace.yaml` overrides to dedupe to the versions
`react-components@9.74.3` expects:

```yaml
overrides:
  "@fluentui/react-popover": 9.14.4
  "@fluentui/react-motion": 9.16.1
  "@fluentui/react-motion-components-preview": 0.15.6
```

After `pnpm install`, only single copies remain and the header renders cleanly across
the workspace. Production build still passes.

## Screenshots

Saved to `screenshots/`:

| File | Viewport | Notes |
|---|---|---|
| `home-desktop-full.png` | 1440×1024 | Full-page desktop capture (3-col grids, 2fr/1fr bottom band) |
| `home-desktop-viewport.png` | 1440×1024 | Above-the-fold desktop |
| `home-mobile-full.png` | 480×900 | Responsive single/2-column stacking |
