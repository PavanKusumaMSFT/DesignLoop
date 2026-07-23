---
title: "Azure Home — Kubernetes Highlight Prototype Manifest"
phase: prototype
status: in-review
created: 2026-07-22
updated: 2026-07-22
author: "Prototyper Agent"
related:
  - prototype-workspace/app/create-a-one-page-prototype-of-azure-home-highlighting-the-k/page.tsx
  - prototype-workspace/components/projects/create-a-one-page-prototype-of-azure-home-highlighting-the-k/index.tsx
  - prototype-workspace/components/projects/create-a-one-page-prototype-of-azure-home-highlighting-the-k/kubernetes-highlight-card.tsx
---

# Azure Home — Kubernetes Highlight — Prototype Manifest

> Pointer manifest only. All runnable source lives in `prototype-workspace/`.
> This folder holds the manifest plus Playwright verification screenshots.

## Summary

A one-page Azure portal Home prototype that spotlights **Azure Kubernetes Service**.
The page reuses the existing Azure Home layout (header, welcome hero, quick-action
cards, popular-services grid) and adds a prominent, brand-tinted **featured Kubernetes
hero card** as the focal point. In the Popular services grid the Kubernetes tile is
additionally emphasized with a brand surface and a "Featured" badge.

## Assumptions

- No prior-stage design specs existed for this task; the layout was derived from the
  existing `azure-home-page` prototype and the workspace Fluent v9 composition patterns.
- No source URLs were provided in the instruction, so no external material was fetched.

## Workspace Route

- **Route:** `/create-a-one-page-prototype-of-azure-home-highlighting-the-k`
- **Local URL:** `http://localhost:3000/create-a-one-page-prototype-of-azure-home-highlighting-the-k`
- **Auth note:** the workspace is MSAL-gated. For local verification without sign-in,
  append `?auditBridge=1` to the URL.

## Source Paths

| File | Purpose |
|------|---------|
| `prototype-workspace/app/create-a-one-page-prototype-of-azure-home-highlighting-the-k/page.tsx` | Route wrapper (`ProjectLayout` fullWidth, hideProjectHeader) |
| `prototype-workspace/components/projects/create-a-one-page-prototype-of-azure-home-highlighting-the-k/index.tsx` | Azure Home page composition |
| `prototype-workspace/components/projects/create-a-one-page-prototype-of-azure-home-highlighting-the-k/kubernetes-highlight-card.tsx` | New featured Kubernetes hero card component |

## Run Commands

```bash
# Dev server
pnpm --dir prototype-workspace dev
# then open http://localhost:3000/create-a-one-page-prototype-of-azure-home-highlighting-the-k?auditBridge=1

# Production/static build (verifies static export)
pnpm --dir prototype-workspace build
```

## Reused Shared Components

- `AzureHeaderBuildMVP` (`components/shared/azure-header-buildmvp`) — top nav/header
- `ActionCard` + `ActionCardGrid` (`components/shared/action-card`) — quick-action cards
- `ServiceTile` + `ServiceTileGrid` (`components/shared/service-tile`) — popular services grid
- `ProjectLayout` (`components/shared/project-layout`) — page shell + FluentProvider

## New Component

- `KubernetesHighlightCard` (`components/projects/.../kubernetes-highlight-card.tsx`) —
  format-agnostic featured card with icon tile, eyebrow + badge, feature list, stat
  strip, and dual CTAs. Visually flexible via `className`, `borderRadius`, and `shadow`
  overrides. Candidate for promotion to `components/shared/` if a second surface needs it.

## Variants & States

- **Featured hero card:** default content (AKS copy, 3 feature bullets, 3 stats),
  primary CTA ("Create Kubernetes cluster") and secondary CTA ("View documentation").
- **Popular services grid:** Kubernetes tile in emphasized state (brand surface +
  "Featured" badge); standard tiles for VMs, Web App, SQL, Storage, Function App.
- **Interactive states:** hover elevation on tiles/cards, `:focus-visible` outlines on
  interactive rows/buttons (inherited from shared components), Fluent Button hover/press.
- **Responsive:** hero card and grids collapse from 2/3 columns to 1 column at the
  900px / 600px breakpoints.

## Accessibility Notes

- Featured card is a `<section>` with an `aria-label`; decorative icon/accent are
  `aria-hidden`.
- All colors use Fluent tokens; only Azure brand blue `#0078D4` is hardcoded (accent bar).
- Headings use Fluent `Text as="h1"/"h2"`; CTAs are Fluent `Button`s with icons.
- External links open in a new tab with `rel="noreferrer"` and a visible open-in-new icon.

## Verification

- `pnpm --dir prototype-workspace build` — succeeds (static export, route generated).
- Self-audit: no non-brand hardcoded hex, no inline SVG, SafeTokens present, all icons
  resolve under `public/icons/`.
- Playwright screenshot captured at 1440×900 with `?auditBridge=1`; no console errors.
  See `screenshots/azure-home-kubernetes-full.png` and
  `screenshots/azure-home-kubernetes-viewport.png`.
