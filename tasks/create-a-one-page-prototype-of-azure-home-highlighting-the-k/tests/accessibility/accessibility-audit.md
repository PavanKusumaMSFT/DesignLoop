---
title: "Accessibility Audit — Azure Home (Kubernetes Highlight) Prototype"
phase: test
status: in-review
created: 2026-07-22
updated: 2026-07-22
author: "Accessibility Audit Agent"
related:
  - "../../prototypes/manifest.md"
  - "prototype-workspace/app/create-a-one-page-prototype-of-azure-home-highlighting-the-k/page.tsx"
  - "prototype-workspace/components/projects/create-a-one-page-prototype-of-azure-home-highlighting-the-k/index.tsx"
  - "prototype-workspace/components/projects/create-a-one-page-prototype-of-azure-home-highlighting-the-k/kubernetes-highlight-card.tsx"
---

# Accessibility Audit — Azure Home (Kubernetes Highlight)

**Standard:** WCAG 2.1 Level AA
**Route audited:** `/create-a-one-page-prototype-of-azure-home-highlighting-the-k`
**Local URL:** `http://localhost:3000/create-a-one-page-prototype-of-azure-home-highlighting-the-k?auditBridge=1`
**Theme:** Fluent UI React v9 `webLightTheme`
**Tools:** axe-core 4.11.1 (via Playwright/Chromium, 1280×900), manual keyboard tab-order trace (45 stops), WCAG relative-luminance contrast calculation on resolved Fluent token hex values, source review of page + shared components.
**Date:** 2026-07-22

---

## Summary

| Impact | Count |
|--------|-------|
| Critical | 1 |
| Serious | 3 |
| Moderate | 2 |
| Minor | 2 |
| **Total** | **8** |

### WCAG criteria violated
- **1.1.1** Non-text Content (A) — Issue A-07
- **1.3.1** Info and Relationships (A) — Issue A-03
- **1.4.3** Contrast (Minimum) (AA) — Issue A-04
- **2.1.1** Keyboard (A) — Issue A-01
- **2.4.4** Link Purpose / **3.2.5** Change on Request (A/AAA) — Issue A-06
- **4.1.2** Name, Role, Value (A) — Issues A-01, A-02, A-05

### Automated scan result (axe-core 4.11.1)
- **Violations:** 2 (`aria-hidden-focus` — serious; `color-contrast` — serious)
- **Passes:** 30 rules
- **Incomplete:** 0
- Automated tools detect only ~30% of WCAG issues; the keyboard, ARIA-role, focus, and motion findings below were surfaced by manual testing.

### Components / checks that PASSED all checks
- **KubernetesHighlightCard CTAs** — `Create Kubernetes cluster` and `View documentation` are real Fluent `Button`s: keyboard-focusable (tab stops 35–36), Enter/Space operable, visible Fluent focus ring, accessible names present.
- **KubernetesHighlightCard container** — correctly uses `<section aria-label="Azure Kubernetes Service — featured service">`; decorative accent bar and icon are correctly `aria-hidden`.
- **Heading hierarchy** — logical order with no skipped levels: one `H1` ("Welcome to Azure") followed by `H2`s ("Azure Kubernetes Service", "Get started", "Popular services", "Kubernetes resources"). Passes 1.3.1 for headings and 2.4.6.
- **Body / heading text contrast** — all body, title, subtitle, eyebrow, and stat text meet or exceed AA (measured values in Issue A-04 table).
- **External resource links** — real `<a href>` elements, keyboard-focusable (tab stops 40–43), `rel="noreferrer"` set (see A-06 for the new-tab caveat).
- **Back-to-workspace control** — `role="button"`, `tabIndex=0`, Enter handler, and a `:focus-visible` outline (`colorStrokeFocus2`).

### Sign-off recommendation: **BLOCK**

One Critical keyboard failure (A-01) makes the prototype's core interaction — the spotlighted **Popular services** grid, including the featured Kubernetes tile that is the entire purpose of this page — completely inoperable for keyboard and switch users. This must be fixed before usability testing. Serious ARIA-role and contrast issues (A-02, A-04, A-05) should be fixed in the same pass.

---

## Audit Scope

| Audit ID | Component / Screen | Source File | Automated | Manual |
|----------|-------------------|-------------|-----------|--------|
| A-01/A-05 | ServiceTile (Popular services + featured Kubernetes tile) | `components/shared/service-tile.tsx` | axe-core | Keyboard, SR roles |
| A-02 | ActionCard (Get started grid) | `components/shared/action-card.tsx` | axe-core | Keyboard, SR roles |
| A-03 | Page landmarks / shell | `index.tsx`, `project-layout.tsx`, `azure-header-buildmvp.tsx` | axe-core structure probe | Landmark review |
| A-04 | PROTOTYPE badge + colour set | `azure-header-buildmvp.tsx`, page tokens | axe-core color-contrast | Contrast calc |
| A-06 | External resource links | `index.tsx` | — | New-tab announcement |
| A-07 | ServiceTile icon alt text | `service-tile.tsx` | — | SR redundancy |
| A-08 | Tabster focus-dummy elements | Fluent v9 / header nav drawer | axe-core | Review |
| — | Motion / prefers-reduced-motion | multiple | — | Reduced-motion review |

---

## Manual Check Coverage

### A. Colour Contrast — measured
All Fluent `webLightTheme` tokens were resolved to hex and run through the WCAG relative-luminance formula.

| Combination | Foreground | Background | Ratio | Req. | Result |
|-------------|-----------|-----------|-------|------|--------|
| Body text (title, `colorNeutralForeground1`) on page bg2 | `#242424` | `#fafafa` | **14.87:1** | 4.5 | Pass |
| Subtitle / secondary (`colorNeutralForeground2`) on white | `#424242` | `#ffffff` | **10.05:1** | 4.5 | Pass |
| Muted / stat label (`colorNeutralForeground3`) on white | `#616161` | `#ffffff` | **6.19:1** | 4.5 | Pass |
| Brand eyebrow/link (`colorBrandForeground1`) on white | `#0f6cbd` | `#ffffff` | **5.38:1** | 4.5 | Pass |
| Eyebrow "Featured service" on highlight surface | `#0f6cbd` | `#ebf3fc` | **4.81:1** | 4.5 | Pass |
| Highlight card title on brand surface | `#242424` | `#ebf3fc` | **13.87:1** | 4.5 | Pass |
| Highlight card description on brand surface | `#424242` | `#ebf3fc` | **8.98:1** | 4.5 | Pass |
| "Free" badge text (`colorPaletteGreenForeground1`) on success bg | `#0e700e` | `#f1faf1` | **5.89:1** | 4.5 | Pass |
| Primary button label on brand fill | `#ffffff` | `#0f6cbd` | **5.38:1** | 4.5 | Pass |
| **"PROTOTYPE" badge (0.85 opacity white) on brand header** | `#dbe9f5` | `#0f6cbd` | **4.35:1** | 4.5 | **FAIL → A-04** |
| ServiceTile rest border (`colorNeutralStroke2`) vs white | `#e0e0e0` | `#ffffff` | 1.32:1 | 3.0 (1.4.11) | See A-04 note |

### B. Keyboard Navigation — 45-stop tab trace
- Tab reaches header nav, search, highlight-card CTAs (35–36), the three ActionCard groups (37–39), and the four external links (40–43).
- **FAIL:** none of the six **Popular services** ServiceTiles (Kubernetes, Virtual machines, Web App, SQL databases, Storage accounts, Function App) appear anywhere in the tab order — see A-01.
- **FAIL:** ActionCards are exposed as `role="group"` tab stops, not buttons; their inner CTA buttons are not standalone Tab stops — see A-02.
- No keyboard traps observed. Escape / arrow handling not applicable on this page (no modal, menu, or tablist in the page body; the header menu is a separate shared component).
- Visible focus indicator present on all *genuinely* focusable Fluent elements (Buttons, Links, back control).

### C. ARIA and Semantics
- **FAIL:** No landmark regions — `main`, `header`/`banner`, `nav`, and `footer` counts are all **0** on the rendered page (axe structure probe) — see A-03.
- **FAIL:** Clickable `<div>` tiles and `role="group"` cards carry click handlers without button semantics — see A-01, A-02.
- Headings: correct single `H1` + sequential `H2`s. Pass.
- Featured card `aria-label` present and correct. Pass.
- **FAIL:** decorative ServiceTile icon uses `alt={name}`, duplicating the adjacent visible name — see A-07.

### D. Focus Management
- No modals/dialogs are triggered from the page body, so open/return focus flows are not exercised here.
- Client-side navigation on tile/card/button click routes to other pages; focus is not programmatically moved to the new page's heading on arrival (framework default). Noted as a cross-page recommendation, not scored against this single-page audit.
- **FAIL (serious):** 8 Tabster focus-dummy `<i tabindex="0" aria-hidden="true">` elements are focusable while hidden — see A-08.

### E. Motion and Animation
- Hover transitions exist: ServiceTile `transition: all 0.2s`, ActionCard `box-shadow` transition (`durationNormal`), ProjectLayout opacity/`translateX` transitions.
- No content flashes more than 3×/second — **passes 2.3.1/2.3.3**.
- `prefers-reduced-motion: reduce` is **not** honoured. WCAG 2.3.3 (Animation from Interactions) is Level AAA, so this is **not an AA failure**; logged as a low-priority best-practice recommendation (R-1) rather than a scored issue.

---

## Issues

## Issue A-01: Popular services tiles (incl. featured Kubernetes tile) are not keyboard operable

**WCAG Criterion**: 2.1.1 Keyboard (A); 4.1.2 Name, Role, Value (A)
**Impact**: Critical
**Component/Screen**: ServiceTile — Popular services grid
**Element**: `components/shared/service-tile.tsx`, root `<div className={styles.tile} onClick={onClick}>` (lines 180–188); consumed for all 6 tiles in `index.tsx` lines 185–228, including the featured tile at 186–193.

**Description**: Each service tile is a plain `<div>` with an `onClick` handler but **no `role`, no `tabIndex`, and no keyboard event handler**. Keyboard-only, switch, and screen-reader users cannot focus or activate any tile. The 45-stop tab trace jumps straight from the highlight-card "View documentation" button (stop 36) and the ActionCard groups (37–39) to the external links (40–43) — the entire Popular services grid is skipped. The spotlighted Kubernetes tile, which is the whole point of this prototype, is therefore unreachable without a mouse.

**Evidence**: Manual tab trace (45 presses) never lands on any tile; `document.querySelectorAll('[role="button"]')` returns 0 tiles. Source shows `<div ... onClick={onClick}>` with no `tabIndex`/`role`/`onKeyDown`.

**Remediation**: In `ServiceTile` (`service-tile.tsx`), make the clickable root operable. When `onClick` is provided, add to the root `<div>`: `role="button"`, `tabIndex={0}`, and an `onKeyDown` that fires `onClick` on `Enter` and `Space` (calling `e.preventDefault()` on Space to avoid page scroll), plus an accessible name via `aria-label={name}`. Concretely:

```tsx
<div
  className={mergeClasses(styles.tile, !onClick && styles.tileNoClick, className)}
  onClick={onClick}
  role={onClick ? "button" : undefined}
  tabIndex={onClick ? 0 : undefined}
  aria-label={onClick ? name : undefined}
  onKeyDown={
    onClick
      ? (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }
      : undefined
  }
>
```
Also add a visible focus style to `styles.tile`: `":focus-visible": { outline: \`2px solid ${tokens.colorStrokeFocus2}\`, outlineOffset: "2px" }`.

**Effort**: Low (<1 hour)

---

## Issue A-02: "Get started" ActionCards expose a clickable `role="group"` instead of a button

**WCAG Criterion**: 4.1.2 Name, Role, Value (A); 2.1.1 Keyboard (A)
**Impact**: Serious
**Component/Screen**: ActionCard — "Get started" grid
**Element**: `components/shared/action-card.tsx`, Fluent `<Card ... onClick={onClick}>` (lines 213–238); consumed in `index.tsx` lines 152–177.

**Description**: Each ActionCard passes `onClick` to a Fluent `Card`, which renders as a focusable `role="group"` (confirmed at tab stops 37–39). A `group` is not an interactive role, so screen readers announce the card as a non-actionable group even though clicking it navigates. The card also contains a real CTA `Button` ("Create", "Explore services", "Go to AI Foundry") whose handler duplicates the card's — but those buttons are **not** standalone Tab stops (they sit inside the `group` and are only reachable via arrow keys), so the obvious keyboard path is a `group` that AT does not present as clickable. This is a nested-interactive / ambiguous-role defect.

**Evidence**: Tab trace shows stops 37–39 as `DIV|group|"Create a resource…"`, `DIV|group|"Explore services…"`, `DIV|group|"Build with AI…"`; the inner buttons "Create/Explore services/Go to AI Foundry" do not appear as separate Tab stops.

**Remediation**: Remove the card-level `onClick` and drive navigation solely through the existing CTA `Button` (which is already an accessible, focusable button). In `index.tsx`, delete the `onClick={() => go(...)}` prop on each `<ActionCard>` and keep only `buttonText`; the `ActionCard` button already calls `onClick` internally (action-card.tsx lines 267–279). This removes the redundant `group` tab stop and leaves one unambiguous, keyboard-operable button per card. (If whole-card click must be retained, instead set the Fluent `Card` `onClick` together with `role="button"` and an accessible name, and remove the inner `Button` to avoid a nested control.)

**Effort**: Low (<1 hour)

---

## Issue A-03: No landmark regions on the page (`main`, `banner`, `nav` all missing)

**WCAG Criterion**: 1.3.1 Info and Relationships (A)
**Impact**: Serious
**Component/Screen**: Page shell — `index.tsx` root, `ProjectLayout`, `AzureHeaderBuildMVP`
**Element**: `index.tsx` root `<div className={styles.root}>` (line 123); `project-layout.tsx` content `<div className={styles.contentFullWidth}>` (line 296); `azure-header-buildmvp.tsx` root `<div className={styles.topNav}>` (line 653).

**Description**: The rendered page contains **zero** landmark regions (axe structure probe: `main:0, header:0, nav:0, footer:0, banner:0`). Screen-reader users cannot jump to main content or navigation via landmark shortcuts, and there is no programmatic separation between the site header and the page's main content. The page content is wrapped only in generic `<div>`s.

**Evidence**: `document.querySelectorAll('main').length === 0`; `header`/`[role="banner"]`/`nav` all 0. Header root is `<div className={styles.topNav}>` (no `<header>`); ProjectLayout wraps children in `<div className={styles.contentFullWidth}>` (no `<main>`).

**Remediation**:
1. In `ProjectLayout` (`project-layout.tsx` line 296), change the content wrapper from `<div className={fullWidth ? styles.contentFullWidth : styles.content}>` to `<main className={fullWidth ? styles.contentFullWidth : styles.content}>` (close with `</main>`). This gives every project page a single `main` landmark.
2. In `AzureHeaderBuildMVP` (`azure-header-buildmvp.tsx` line 653), change the top-nav root `<div className={...styles.topNav...}>` to a `<header>` element (or add `role="banner"`), and add `role="navigation"` / a `<nav aria-label="Global">` around the primary nav button cluster.

**Effort**: Low (<1 hour)

---

## Issue A-04: "PROTOTYPE" badge text fails minimum contrast (4.35:1)

**WCAG Criterion**: 1.4.3 Contrast (Minimum) (AA)
**Impact**: Serious
**Component/Screen**: Header PROTOTYPE badge (renders over every prototype page)
**Element**: `components/shared/azure-header-buildmvp.tsx` — `.prototypeBadge` style (lines 138–148), span at line 673.

**Description**: The "PROTOTYPE" label is `colorNeutralForegroundInverted` (`#ffffff`) at `opacity: 0.85`, which composites to ≈`#dbe9f5` over the brand-blue header (`#0f6cbd`). Measured contrast is **4.35:1**, below the 4.5:1 requirement for 10px normal-weight text. Low-vision users may not be able to read the label.

**Evidence**: axe-core `color-contrast` violation (serious), 1 node: `<span class="…">PROTOTYPE</span>`, "insufficient color contrast of 4.35 (foreground `#dbe9f5`, background `#0f6cbd`, 10px, normal weight); expected 4.5:1".

**Remediation**: Remove `opacity: 0.85` from the `.prototypeBadge` rule (line 146). Full-opacity `#ffffff` on `#0f6cbd` measures **5.38:1** and passes. (Alternatively keep the opacity but raise `fontSize` to ≥14px bold to qualify as large text — removing the opacity is the smaller change.)

*Note on the 1.32:1 ServiceTile rest border:* `colorNeutralStroke2` (`#e0e0e0`) on white is 1.32:1, below the 3:1 UI-boundary guideline (1.4.11). Because tiles are separated by grid gaps and gain a shadow on hover, the border is not the sole means of identifying each control; this is a recommendation (R-2), not scored as a failure. Bumping the tile border to `colorNeutralStroke1` (`#d1d1d1`) is still only 1.53:1, so if strict 1.4.11 conformance is desired, use a darker divider token or rely on elevation instead of a hairline border.

**Effort**: Low (<1 hour)

---

## Issue A-05: ServiceTile has no accessible role even when non-interactive vs interactive is ambiguous

**WCAG Criterion**: 4.1.2 Name, Role, Value (A)
**Impact**: Serious
**Component/Screen**: ServiceTile
**Element**: `components/shared/service-tile.tsx` root `<div>` (lines 180–201).

**Description**: Related to A-01 but distinct: even setting keyboard aside, the tile conveys no role or state to assistive tech. A clickable tile is announced by screen readers as plain text with no indication it is actionable, so users relying on the AT tree cannot discover that the featured Kubernetes tile (and the other five tiles) navigate on activation. The visible name is inside a `<div className={styles.name}>` with no heading or button semantics.

**Evidence**: Source shows the root `<div>` and name `<div>` carry no `role`, `aria-*`, or heading element; the AT tree exposes them as generic text containers.

**Remediation**: The `role="button"` + `aria-label={name}` addition specified in A-01 resolves this by giving the interactive tile an explicit button role and accessible name. For the non-interactive variant (`tileNoClick`, no `onClick`), leave it as a static group but promote the service name to a heading for structure: render the name via Fluent `<Text as="h3">` (or wrap in an appropriate heading level) so the AT tree exposes each service name in the document outline.

**Effort**: Low (<1 hour) — combine with A-01.

---

## Issue A-06: External resource links open in a new tab without warning

**WCAG Criterion**: 2.4.4 Link Purpose (In Context) (A); 3.2.5 Change on Request (AAA)
**Impact**: Moderate
**Component/Screen**: "Kubernetes resources" link list
**Element**: `index.tsx` lines 236–248 — `<Link href={link.href} target="_blank" rel="noreferrer">` with a trailing `<Open16Regular />` icon.

**Description**: All four resource links (`AKS documentation`, `AKS learning path`, `Pricing calculator`, `Service health status`) open in a new browser tab via `target="_blank"`, but nothing in the accessible name tells the user this. The `Open16Regular` icon is purely visual and is not exposed to assistive tech, so screen-reader and low-vision users get no warning that focus/context will move to a new window — a disorienting, unexpected context change.

**Evidence**: Source: every link uses `target="_blank"` with only a decorative icon and no "opens in new tab" text or `aria-label`. Tab trace confirms links at stops 40–43 are the only new-tab targets.

**Remediation**: Add an explicit new-tab indication to each link's accessible name. In `index.tsx`, give the `<Link>` an `aria-label={\`${link.label} (opens in a new tab)\`}` (keeping the visible text unchanged), and mark the trailing icon decorative if it is not already (`<Open16Regular aria-hidden />`). Optionally add a visually-hidden `<span>` "(opens in a new tab)" after the label for sighted-AT parity.

**Effort**: Low (<1 hour)

---

## Issue A-07: Featured-card and tile icons use redundant / incorrect alt text

**WCAG Criterion**: 1.1.1 Non-text Content (A)
**Impact**: Minor
**Component/Screen**: ServiceTile icon (and confirm across tiles)
**Element**: `components/shared/service-tile.tsx` line 192 — `<img src={icon} alt={name} className={styles.iconImage} />`.

**Description**: The ServiceTile renders its service-logo image with `alt={name}` while the same `name` string is displayed as visible text immediately beside it (line 196). Screen readers therefore announce the service name twice ("Kubernetes services, Kubernetes services"). The logo is decorative in this context and should have an empty alt. (For contrast, the KubernetesHighlightCard already does this correctly: `alt="" aria-hidden="true"` at line 252.)

**Evidence**: Source line 192 (`alt={name}`) vs. adjacent visible name at line 196; highlight card at line 252 shows the correct decorative pattern.

**Remediation**: In `service-tile.tsx` line 192, change the string-icon branch to `<img src={icon} alt="" className={styles.iconImage} />` (decorative), since the visible `name` text already provides the accessible name.

**Effort**: Low (<1 hour)

---

## Issue A-08: Tabster focus-dummy elements are focusable while `aria-hidden`

**WCAG Criterion**: 4.1.2 Name, Role, Value (A)
**Impact**: Serious (per axe) — low real-world user impact
**Component/Screen**: Fluent v9 Tabster focus zones in the shared header / nav drawer
**Element**: 8 nodes matching `<i tabindex="0" role="none" data-tabster-dummy="… tabbable=true" aria-hidden="true" style="position:fixed…">` (e.g. `.fui-NavDrawerBody > i:nth-child(1)`).

**Description**: axe flags 8 elements that are both `aria-hidden="true"` and `tabindex="0"`. These are **Tabster** focus-management sentinel elements injected by Fluent UI v9's `Mover`/`Groupper` (used by the header's `CopilotNavDrawer`/nav components), not authored by the prototype. They are visually hidden 1px sentinels used to trap/redirect focus. In practice they immediately forward focus and are not perceivable, so real-world impact is low, but they are a genuine `aria-hidden-focus` violation in the DOM.

**Evidence**: axe-core `aria-hidden-focus` (serious), 8 nodes, all `data-tabster-dummy … tabbable=true` inside `NavDrawerBody`/Groupper containers.

**Remediation**: This originates in the vendored Fluent v9 / `@fluentui-copilot` nav-drawer components, not in page code. (1) Upgrade `@fluentui/react-components` and `@fluentui-copilot/react-copilot` to the latest patch, as newer Tabster releases set `data-tabster-dummy` sentinels to `tabindex="-1"` / mark them ignorable to axe. (2) If the nav drawer is not needed on prototype pages, avoid mounting `AzureHeaderBuildMVP`'s nav drawer, or render the header with the drawer closed and unmounted. (3) As a scan-scoping measure, exclude `[data-tabster-dummy]` from future axe runs so this known library artifact does not mask real issues. No change to this task's page component is required.

**Effort**: Medium (1–4 hours) — dependency upgrade + regression check.

---

## Recommendations (non-scored, best practice)

- **R-1 — `prefers-reduced-motion`**: Wrap hover/opacity/transform transitions (ServiceTile `transition: all 0.2s`, ActionCard box-shadow, ProjectLayout opacity/`translateX`) in an `@media (prefers-reduced-motion: reduce) { transitionDuration: "0.01ms" }` block within their `makeStyles` definitions. WCAG 2.3.3 is AAA, so this is optional for AA sign-off.
- **R-2 — Tile boundary contrast (1.4.11)**: The `colorNeutralStroke2` hairline (1.32:1) is below 3:1. Consider a stronger divider token or lean on elevation/spacing so the tile boundary does not depend on a sub-3:1 border.
- **R-3 — Cross-page focus management**: On client-side navigation from a tile/card/button, move focus to the destination page's `H1` (or a skip target) so keyboard/SR users are oriented after route changes.

---

## Re-test checklist (before removing BLOCK)

- [ ] A-01 fixed and verified: every Popular services tile (all 6, incl. featured Kubernetes) is Tab-focusable and Enter/Space-activatable with a visible focus ring.
- [ ] A-02 fixed: "Get started" cards expose a single, keyboard-operable button (no clickable `role="group"`).
- [ ] A-03 fixed: page exposes exactly one `main` landmark and a `banner`/`header` + `nav` in the shell.
- [ ] A-04 fixed: PROTOTYPE badge ≥ 4.5:1 (re-run axe → 0 color-contrast violations).
- [ ] A-05 / A-07 / A-06 fixed: tile roles/names, decorative alt, and new-tab link labelling.
- [ ] A-08 addressed or scan-scoped; re-run axe-core → target 0 serious violations.
