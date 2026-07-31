---
title: "Fluent Theme — Azure Sign-In / Login Page"
phase: design
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Designer Agent"
related:
  - "../../ideation/decision-log.md"
  - "../../strategy/prd.md"
  - "../../strategy/personas.md"
  - "./token-usage-guide.md"
  - "../design-system.md"
  - "../wireframes/login-page.md"
---

# Fluent Theme — Azure Sign-In / Login Page

## 1. Decision: base + Azure brand ramp

The login page uses Fluent UI React v9 **`webLightTheme`** as its base, customized with an
**Azure brand ramp** built from the PRD brand blues via `createLightTheme`. This satisfies
NFR-Brand AC1/AC2 (all UI from Fluent v9 tokens; primary `#0078D4`, hover/pressed `#106EBE`,
active/deep `#005A9E` applied **through theme tokens, not ad-hoc hex**) and decision **D5**
(theming flows only through tokens behind a contrast-enforcing gate — C28/C29).

- **Light-first.** Desktop-first, light default. A `webDarkTheme`-based counterpart can be
  derived later from the same `azureBrandRamp`; not required for this task.
- **Brand hex is confined to the ramp definition.** In component code the only literal hexes
  permitted anywhere are `#0078D4`, `#106EBE`, `#005A9E` (per `prototype-workspace/AGENTS.md`);
  everywhere else, reference `tokens.colorBrand*`.

## 2. Brand ramp + theme snippet

> Design guidance only — implemented by the Prototype phase. Place in
> `components/projects/azure-login-page/theme.ts` and wrap the page in a `FluentProvider`.

```ts
import {
  createLightTheme,
  webLightTheme,
  type BrandVariants,
  type Theme,
} from "@fluentui/react-components";

// Azure brand ramp anchored on the three PRD blues.
// 80 = #0078D4 (primary), 70 = #106EBE (hover/pressed), 60 = #005A9E (active/deep).
// Remaining stops are perceptually-spaced fills so Fluent's token recipes resolve
// correctly; anchors are the source of truth.
const azureBrandRamp: BrandVariants = {
  10: "#020A13",
  20: "#0E2A47",
  30: "#00375F",
  40: "#00456E",
  50: "#00568A",
  60: "#005A9E", // active / deep    (PRD)
  70: "#106EBE", // hover / pressed  (PRD)
  80: "#0078D4", // primary          (PRD)
  90: "#2B88D8",
  100: "#4A9BE0",
  110: "#69ADE7",
  120: "#89C0EE",
  130: "#A9D2F4",
  140: "#C7E0F9",
  150: "#E1EEFB",
  160: "#F3F9FE",
};

const azureLight: Theme = {
  ...createLightTheme(azureBrandRamp),
};

// Merge onto webLightTheme so any tokens not touched by the ramp keep Fluent defaults.
export const azureLoginTheme: Theme = {
  ...webLightTheme,
  ...azureLight,
};
```

Usage in the page shell (`LoginPage`):

```tsx
import { FluentProvider } from "@fluentui/react-components";
import { azureLoginTheme } from "./theme";

<FluentProvider theme={azureLoginTheme}> {/* ...login surface... */} </FluentProvider>
```

### Where the anchors land

| PRD role | Hex | Ramp stop | Resolves (examples) |
|---|---|---|---|
| Primary | `#0078D4` | 80 | `colorBrandBackground`, `colorCompoundBrandForeground1`, primary `Button` rest |
| Hover / pressed | `#106EBE` | 70 | `colorBrandBackgroundHover`, `colorCompoundBrandForeground1Hover` |
| Active / deep | `#005A9E` | 60 | `colorBrandBackgroundPressed`, brand link pressed |

> Note (implementation): Fluent maps `colorBrandBackground` → ramp **80** and its
> hover/pressed to **70/60** in the default recipe, so the three PRD anchors align to
> Fluent's primary/hover/pressed treatment out of the box. The Prototype phase must
> visually verify primary `Button` rest/hover/pressed against the three PRD blues and
> adjust anchors only if a stop drifts.

## 3. Tenant branding = theme overrides only (FR-8, decision D4)

Tenant custom branding is expressed **exclusively** as a partial theme override + optional
logo/background assets — never free-form CSS (anti-pattern C34 rejected):

```ts
// A tenant supplies a partial override; it can re-anchor the brand ramp and neutrals,
// but it is passed through the contrast gate before it is applied.
export function makeTenantTheme(overrides: Partial<Theme>): Theme {
  return enforceContrast({ ...azureLoginTheme, ...overrides });
}
```

- **Reserved trust zone is immune.** `TrustHeader` / `TrustFooter` verified-surface cue read
  from a fixed neutral token subset and are **not** derived from tenant overrides — branding
  can theme the card/logo/background but cannot restyle or hide the trust cue (FR-7 AC2, C24).

## 4. Contrast-enforcing gate (C29, NFR-A11y AC2/AC6, FR-8 AC2)

Design contract for `enforceContrast()` (implemented in Prototype):

1. For every foreground/background token pair used on the surface, compute WCAG contrast.
2. **Text** must be ≥ 4.5:1; **UI components and large text** ≥ 3:1.
3. If a tenant override would drop a pair below threshold, the gate **auto-corrects** the
   foreground token (toward `colorNeutralForeground1`/`colorNeutralForegroundOnBrand`) or
   **rejects** the override — never renders a failing combination (NFR-A11y AC6).
4. The gate runs on: card background vs. text, primary `Button` label vs. brand background,
   error `MessageBar` text vs. intent background, and tenant background image vs. card edge.

## 5. Light / dark behavior

| Mode | Source | Status |
|---|---|---|
| Light (default) | `azureLoginTheme` (webLightTheme + azure ramp) | Required this task |
| Dark | `createDarkTheme(azureBrandRamp)` merged onto `webDarkTheme` | Derivable from same ramp; optional, out of scope |
| High-contrast | Fluent `teamsHighContrastTheme` fallback | Honored via `FluentProvider`; contrast gate still applies |

## 6. Token families in play

Only Fluent v9 token families are used (no invented CSS custom properties). See the mapping
in [token-usage-guide.md](./token-usage-guide.md):
`colorBrand*`, `colorNeutral*`, `colorPaletteRed/Green/Yellow*` (error/success/warning),
`spacingHorizontal*` / `spacingVertical*`, `fontSize*` / `fontWeight*` / `lineHeight*`,
`borderRadius*`, `shadow*`, `duration*`.
