---
title: "Azure Home Page — Visual Verification"
phase: prototype
status: approved
created: 2026-07-21
updated: 2026-07-21
author: "Prototyper Agent"
related:
  - "./manifest.md"
  - "./audit-AzureHomePage.md"
---

# Visual Verification — Azure Home Page

Tooling: Playwright (Chromium) against the live dev server
`http://localhost:3000/azure-home-page/` with auth bypassed via `?auditBridge=1`.

## Render

| Check | Result |
|---|---|
| Page mounts without runtime errors | Pass (after react-motion dedupe — see manifest) |
| Header (`AzureHeaderBuildMVP`) renders | Pass |
| Hero "Welcome to Azure" + subtitle | Pass |
| Get started — 3 `ActionCard`s | Pass |
| Popular services — 6 `ServiceTile`s (4 with Free badge) | Pass |
| Recent resources — 4 link rows | Pass |
| Navigate — 3 link rows | Pass |
| Useful links — 4 external links | Pass |
| Responsive (mobile 480px stacks columns) | Pass |

## Clickable-link navigation

| Element | Expected | Result |
|---|---|---|
| Get started → "Create a resource" CTA | `/create-vm` | Pass |
| Service tile → "Virtual machines" | `/create-vm` | Pass |
| Recent resource → "rg-production" | `/resource-manager-mvp` | Pass |
| Navigate → "All services" | `/all-services` | Pass |
| Navigate → "Search resources" | `/search` | Pass |
| Navigate → "Copilot & agents" | `/agents` | Pass |

## External links (open in new tab)

All four carry `target="_blank"` and `rel="noreferrer"`:

| Label | href |
|---|---|
| Azure documentation | https://learn.microsoft.com/azure/ |
| Microsoft Learn | https://learn.microsoft.com/training/azure/ |
| Pricing calculator | https://azure.microsoft.com/pricing/calculator/ |
| Service health status | https://azure.status.microsoft/ |

## Screenshots

- `screenshots/home-desktop-full.png` (1440×1024, full page)
- `screenshots/home-desktop-viewport.png` (1440×1024, above the fold)
- `screenshots/home-mobile-full.png` (480×900, responsive)

## Accessibility spot-checks

- All clickable link rows are real `<button type="button">` elements (keyboard operable).
- Get started / service tiles activate via Fluent `Button` / `Card` `onClick`.
- External links visibly signal new-tab behaviour with an `Open16Regular` icon.
- Focus-visible outline uses `colorStrokeFocus2` with 2px offset (per component spec).

_Note: a full WCAG 2.1 AA audit (contrast, screen-reader, keyboard traversal) belongs
to the Test stage; this report verifies implementation fidelity and interaction wiring._
