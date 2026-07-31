---
title: "Token Usage Guide — Azure Sign-In / Login Page"
phase: design
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Designer Agent"
related:
  - "../../strategy/prd.md"
  - "./fluent-theme.md"
  - "../design-system.md"
  - "../wireframes/login-page.md"
---

# Token Usage Guide — Azure Sign-In / Login Page

Fluent UI React v9 token map for the login surface. Every value below is a Fluent token —
**no hardcoded values**, no invented CSS custom properties. The only literal hexes allowed in
component code are the three Azure brand blues, and even those should be reached via
`colorBrand*` tokens from the [theme](./fluent-theme.md). Required styling pattern
(`SafeTokens` + `makeStyles`) per `prototype-workspace/AGENTS.md`.

## 1. Color

### Surfaces & text
| Purpose | Token | Notes |
|---|---|---|
| Viewport canvas | `colorNeutralBackground2` | Or tenant background image behind a contrast-gated scrim. |
| Sign-in card background | `colorNeutralBackground1` | The elevated card surface. |
| Card subtle rows (method/account rows hover) | `colorNeutralBackground1Hover` / `colorNeutralBackground3` | Hover/tertiary. |
| Primary text (titles, values) | `colorNeutralForeground1` | Title2, key values. |
| Secondary text (subtitles, echo) | `colorNeutralForeground2` | Body1 subtitles, account echo. |
| Muted text (captions, stepper, fineprint) | `colorNeutralForeground3` | Caption1, `Step 1 of 2`, legal. |
| Card border / dividers | `colorNeutralStroke1` / `colorNeutralStroke2` | `Divider`, row separators. |

### Brand (primary actions & links) — NFR-Brand AC2
| Purpose | Token | Resolves to |
|---|---|---|
| Primary `Button` rest background | `colorBrandBackground` | `#0078D4` |
| Primary `Button` hover | `colorBrandBackgroundHover` | `#106EBE` |
| Primary `Button` pressed | `colorBrandBackgroundPressed` | `#005A9E` |
| Primary `Button` label | `colorNeutralForegroundOnBrand` | white on brand (gate-checked) |
| Brand links (`Link`, "Sign in another way") | `colorBrandForeground1` | `#0078D4` |
| Brand link hover/pressed | `colorBrandForeground1Hover` / `...Pressed` | `#106EBE` / `#005A9E` |
| Focus indicator | `colorStrokeFocus2` (+ Fluent focus recipe) | High-contrast focus ring |

### State colors (always paired with icon + text — NFR-Brand AC3 / NFR-A11y AC5)
| State | Foreground | Background (MessageBar/Badge) | Used in |
|---|---|---|---|
| Error (wrong password, unknown account, network) | `colorPaletteRedForeground1` | `colorPaletteRedBackground1` (`MessageBar intent="error"`) | S5 |
| Warning (locked, policy block) | `colorPaletteYellowForeground1` / `DarkOrangeForeground1` | `colorPaletteYellowBackground1` (`intent="warning"`) | S5 |
| Info (expired session) | `colorNeutralForeground2` | `intent="info"` background | S5 |
| Success (signed in) | `colorPaletteGreenForeground1` | — | S7 |
| Verified-surface cue | `colorPaletteGreenForeground1` (check) + `colorNeutralForeground1` (text) | `colorNeutralBackground1` | Trust header/footer |
| Environment badge (Prod/Staging/Dev) | `Badge` color prop + text label | — | S1b account rows |

## 2. Typography
| Element | Font size | Weight | Line height | Fluent component |
|---|---|---|---|---|
| Card title (`Sign in`, state headings) | `fontSizeBase600` (24) | `fontWeightSemibold` | `lineHeightBase600` | `Title2` |
| Number-match display (S4) | `fontSizeHero800` (32) | `fontWeightSemibold` | — | `Text` |
| Subtitle / step-up protective copy | `fontSizeBase300` (14) | `fontWeightRegular` | `lineHeightBase300` | `Body1` |
| Field labels | `fontSizeBase300` (14) | `fontWeightMedium` | `lineHeightBase300` | `Field` label |
| Account display name (picker) | `fontSizeBase300` (14) | `fontWeightSemibold` | `lineHeightBase300` | `Body1` |
| Captions / hints / stepper / legal | `fontSizeBase200` (12) | `fontWeightRegular` | `lineHeightBase200` | `Caption1` |
| Error message text | `fontSizeBase300` (14) | `fontWeightRegular` | `lineHeightBase300` | `MessageBarBody` |

> 🚫 `fontWeightBold` (700) does not exist in Fluent tokens — use `fontWeightSemibold` (600).

## 3. Spacing (4px grid)
| Purpose | Token | px |
|---|---|---|
| Card inner padding (block) | `spacingVerticalXXL` | 24 |
| Card inner padding (inline) | `spacingHorizontalXXL` | 24 |
| Vertical rhythm between card sections | `spacingVerticalL` | 16 |
| Gap between stacked buttons / method rows | `spacingVerticalS` | 8 |
| Field label → input gap | `spacingVerticalXS` | 4 |
| Icon → label gap in method rows | `spacingHorizontalS` | 8 |
| Trust header/footer padding | `spacingVerticalM` / `spacingHorizontalL` | 12 / 16 |
| Gap between title and subtitle | `spacingVerticalXS` | 4 |

Layout constants allowed as literals: card `max-width: 440px`, mobile gutter uses
`spacingHorizontalL`, `min-height: 100%`, `100%` widths.

## 4. Border radius
| Element | Token | px |
|---|---|---|
| Sign-in card | `borderRadiusXLarge` | 8 |
| Buttons, inputs (Fluent default) | `borderRadiusMedium` | 4 |
| Account/method rows (hover surface) | `borderRadiusMedium` | 4 |
| Avatar, environment badge | `borderRadiusCircular` | 50% |
| MessageBar | `borderRadiusMedium` | 4 |

## 5. Shadow / elevation
| Element | Token |
|---|---|
| Sign-in card (rest elevation) | `shadow16` |
| Method drawer / tenant switcher `Menu` popover | `shadow16` |
| Account row hover lift (optional) | `shadow4` |
| Trust header/footer | none (flat, reserved zone reads as chrome) |

## 6. Motion / duration
| Interaction | Token |
|---|---|
| Body-region cross-fade between states | `durationNormal` (200ms) |
| Button hover/pressed feedback | `durationFast` (150ms) |
| Spinner / focus transitions | `durationFaster` (100ms) |

Motion is subtle and respects `prefers-reduced-motion` (no essential info conveyed by
animation — NFR-A11y).

## 7. Token → region quick reference
| Region / state | Key tokens |
|---|---|
| Trust header/footer | `colorNeutralBackground1`, `colorPaletteGreenForeground1`, `colorNeutralForeground1`, `spacingHorizontalL` |
| Sign-in card | `colorNeutralBackground1`, `shadow16`, `borderRadiusXLarge`, `spacingVerticalXXL` |
| S1 identify | `Field`/`Input` neutral tokens, `colorBrandBackground` (Next), `colorNeutralForeground3` (hint) |
| S1b picker | `colorNeutralBackground1Hover`, `Badge` color, `colorNeutralForeground2` (email) |
| S2 method | `colorBrandBackground` (hero), `colorNeutralBackground1` (secondary), `colorNeutralStroke2` (Divider) |
| S3 password | neutral `Field` tokens, `colorBrandForeground1` (Forgot password) |
| S4 verify | `fontSizeHero800` (number), `colorNeutralForeground2` (protective copy) |
| S5 error | `colorPaletteRed*` / `colorPaletteYellow*`, `MessageBar` intents |
| S6 loading | Fluent `Spinner` recipe tokens |
| S7 success | `colorPaletteGreenForeground1` + check icon |

## 8. Enforcement rules (recap)
- No hardcoded colors except brand blues `#0078D4` / `#106EBE` / `#005A9E`, and prefer
  `colorBrand*` tokens over even those.
- No Tailwind, no inline `style={}` except truly dynamic values, no CSS modules, no inline SVG.
- Color never the sole state signal — always icon + text (NFR-Brand AC3, NFR-A11y AC5).
- All pairings pass the contrast gate (≥4.5:1 text / ≥3:1 UI) in default and tenant themes
  (NFR-A11y AC2/AC6). See [fluent-theme.md](./fluent-theme.md).
