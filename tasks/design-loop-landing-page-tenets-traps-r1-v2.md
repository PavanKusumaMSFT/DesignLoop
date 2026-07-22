---
title: "UI Tenets & Traps Evaluation: Design Loop Landing Page (Round 1)"
phase: test
status: draft
created: 2026-06-16
updated: 2026-06-16
author: "Tester Agent"
related:
  - "design-loop-landing-page-accessibility-audit.md"
  - "design-loop-landing-page-usability-test-plan.md"
---

# UI Tenets & Traps Evaluation: Design Loop Landing Page (Round 1)

A heuristic usability evaluation of the Design Loop marketing landing page using Microsoft's
[UI Tenets & Traps](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Home.aspx?web=1)
framework (9 Tenets, 26 Traps). Findings map to the canonical taxonomy in
[`.github/skills/tenets-traps-evaluation/reference.md`](../.github/skills/tenets-traps-evaluation/reference.md).

## Round Tracker

| Round | Date | Findings (C/H/M/L) | Resolved since last | Notes |
|-------|------|--------------------|--------------------|-------|
| r1 | 2026-06-16 | 0 / 4 / 5 / 4 | — | Baseline expert evaluation of source HTML |

---

## 1. Executive Summary

This is a Round 1 expert (heuristic) evaluation of the **Design Loop marketing landing page** — a
single-page, dark-themed site (`index.html`) that introduces the open-source design process toolkit,
presents five design-thinking stages as an interactive 3D card carousel with perspective transforms,
lists available tools/frameworks in a grid, provides repository-cloning instructions, and outlines
a contribution workflow.

The evaluation walked **five core visitor tasks** end-to-end:

1. Understand what Design Loop is and decide whether to use it
2. Navigate between page sections via the fixed nav
3. Explore a design stage by clicking a carousel card and reading the dialog
4. Copy a code snippet to clone the repo
5. Reach the GitHub repository from any CTA

**Headline:** The page is visually striking and well-structured (*Beautiful*, *Efficient*). The
stage-card carousel with 3D perspective transforms and contextual dialogs is engaging. However,
**four High-severity issues** undermine core tenets: stage cards are completely unreachable by
keyboard (Trap 1.1); focus indicators are absent everywhere (Trap 1.2); the navigation collapses
on mobile with no hamburger or alternative (Trap 1.1); and the modal dialog lacks a focus trap,
letting keyboard focus escape behind the overlay (Trap 1.9). Multiple text layers also fall below
WCAG AA contrast minimums (Trap 2.1).

**Findings by severity:** 0 Critical · 4 High · 5 Medium · 4 Low (13 total).
**Strengths:** 5 notable positives identified.

---

## 2. Scope & Method

### Target Artifacts

- `index.html` — standalone single-page landing site (HTML + inline CSS + inline JS)
- Source artifact provided directly; no live URL evaluated

### User Tasks Walked

| # | Task | Persona |
|---|------|---------|
| T1 | Understand the product value proposition | First-time visitor (designer) |
| T2 | Navigate between sections (About, Get Started, Contribute) | Any visitor |
| T3 | Explore a design stage via card carousel and dialog | Curious visitor evaluating the methodology |
| T4 | Copy the clone command to start using the tool | Developer/designer ready to adopt |
| T5 | Reach the GitHub repo from a CTA | Any visitor ready to act |

### Evaluation Approach

- Manual code-level walkthrough of all HTML, CSS, and JS
- Task-based heuristic evaluation against all 9 Tenets / 26 Traps
- Keyboard-only navigation simulation
- Responsive behavior analysis (breakpoints at 900px, 600px)
- WCAG 2.1 AA contrast ratio calculations

### Limitations

- No live browser rendering (code-only review)
- No Playwright/axe-core automated audit (manual WCAG mapping only)
- No screen-reader testing performed
- No real user observation

---

## 3. Scorecard

| Area / Component | Strengths | Findings | Worst Severity |
|------------------|-----------|----------|----------------|
| Navigation (fixed nav) | Clean layout, clear labels | 2 | High |
| Hero section | Strong visual hierarchy | 1 | Low |
| Stage card carousel | Engaging 3D interaction | 3 | High |
| Stage dialog (modal) | Well-structured content | 2 | High |
| Tools grid | Clear taxonomy | 1 | Medium |
| Get Started (code blocks) | Useful copy buttons | 2 | Medium |
| Contribute section | Good workflow clarity | 0 | — |
| Footer CTA | Consistent CTAs | 0 | — |
| Global (CSS/tokens) | Beautiful dark theme | 2 | High |

---

## 4. Top Issues

Ranked by impact on user task completion and audience breadth.

| Rank | ID | Finding | Severity | Rationale |
|------|-----|---------|----------|-----------|
| 1 | F-01 | Stage cards are keyboard-inaccessible | High | Blocks 100% of keyboard/AT users from the page's signature interactive feature (T3) |
| 2 | F-02 | No focus indicators anywhere | High | All keyboard navigation is effectively blind across the entire page (T1–T5) |
| 3 | F-03 | Navigation vanishes on mobile with no replacement | High | Nav links `display: none` below 900px with no hamburger menu; mobile users lose section navigation (T2) |
| 4 | F-04 | Modal dialog has no focus trap | High | Tab key escapes the overlay, reaching background elements; disorienting for keyboard users (T3) |

---

## 5. All Findings

| ID | Area / Component | Finding | Tenet | Trap(s) | Severity | Evidence / Reasoning |
|----|------------------|---------|-------|---------|----------|----------------------|
| F-01 | Stage card carousel | **Stage cards are keyboard-inaccessible.** Cards are `<div>` with `click` handlers but no `tabindex`, `role="button"`, or `keydown` handler. Keyboard users cannot focus or activate them. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.1 Invisible Element | **High** | `document.querySelectorAll('.stage-card[data-stage]').forEach(card => card.addEventListener('click', …))` — no keyboard binding. The "Explore stage" hint is visible but the interaction path does not exist for keyboard users. |
| F-02 | Global (all interactive elements) | **No focus indicators defined.** The stylesheet has zero `:focus` or `:focus-visible` rules. Browser defaults are invisible on the `#080808` background. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.2 Effectively Invisible Element | **High** | CSS search for `focus` returns no results. Links, buttons, and the dialog close button all lack visible focus styles. |
| F-03 | Navigation | **Nav links hidden on mobile with no replacement.** `.nav-links { display: none }` at ≤ 900px. No hamburger menu, drawer, or alternative navigation is provided. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.1 Invisible Element | **High** | Mobile users can only navigate by scrolling. The About, Get Started, and Contribute anchor links are completely lost. |
| F-04 | Stage dialog (modal) | **No focus trap in modal.** `aria-modal="true"` is set but JS does not trap Tab focus. Focus is not moved to the dialog on open. Focus can escape to background content. Focus is not returned to trigger on close. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.9 Feedback Failure | **High** | `openDialog()` does not call `panel.focus()` or move focus to the close button. `closeDialog()` does not store/restore the trigger element. Tab can reach elements behind the backdrop overlay. |
| F-05 | Global text (`--text-muted`) | **Extreme low contrast on muted text.** `rgba(240,237,232,0.25)` on `#080808` ≈ 1.9:1. Used for section labels, stat labels, footer copy, `.stage-num`, `.tool-stage-badge`, `.dialog-tools-label`, `.card-click-hint`. | [Comfortable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Comfortable.aspx?web=1) | 2.1 Physical Challenge | **Medium** | Fails WCAG 1.4.3 (4.5:1 for normal text) and 1.4.11 (3:1 for non-text). Users with low vision or in bright ambient light will struggle. |
| F-06 | Global text (`--text-dim`) | **Below-threshold contrast on body text.** `rgba(240,237,232,0.45)` on `#080808` ≈ 3.9:1. Used at 13–17px for hero subtitle, about paragraphs, tool descriptions, code block comments. | [Comfortable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Comfortable.aspx?web=1) | 2.1 Physical Challenge | **Medium** | Passes large-text ratio (3:1) but fails normal-text ratio (4.5:1). Most usage is at 13–17px which is not "large text" per WCAG (≥ 18px or ≥ 14px bold). |
| F-07 | Page-level | **No skip-to-content link.** Fixed nav has 5+ focusable elements. No skip link is provided as the first focusable element in `<body>`. | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) | 4.1 Unnecessary Step | **Medium** | Keyboard users must tab through logo, 3 nav links, and GitHub CTA on every page load before reaching main content. |
| F-08 | Copy buttons | **Identical "Copy" buttons with no distinguishing label.** Three `.copy-btn` elements all have text "Copy" and no `aria-label`. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.4 Uncomprehended Element | **Low** | Screen-reader users hear "Copy, button" three times with no way to differentiate which code block each copies. |
| F-09 | "Coming soon" tool cards | **Disabled state not programmatically communicated.** `.tool-card-soon` uses `opacity: 0.35` and `cursor: not-allowed` but no `aria-disabled` or role. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.4 Uncomprehended Element | **Medium** | AT users cannot distinguish available tools from upcoming ones. Visual dimming alone is a colour/opacity-only cue. |
| F-10 | Tool grid (badge dots) | **Stage membership encoded by colour alone.** `.badge-dot` uses teal/amber/violet to indicate stage. Adjacent text label mitigates but the dot is a primary visual grouping cue with no shape differentiation. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.2 Effectively Invisible Element | **Low** | Colour-blind users may not distinguish stage dots. The adjacent text labels reduce severity. |
| F-11 | Hero ambient glows | **Decorative glows may reduce perceived contrast.** Three large ambient glow divs (`.hero-ambient-violet`, `.hero-ambient-amber`, `::after`) sit behind hero text. On low-gamut displays, overlapping colour halos can subtly reduce perceived contrast on the headline text. | [Beautiful](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Beautiful.aspx?web=1) | 9.1 Unattractive Appearance | **Low** | Edge case; the effect is subtle and mostly enhances the aesthetic. Minor concern on specific display types. |
| F-12 | Noise grain overlay | **Grain overlay at z-index 9999.** `body::before` with `pointer-events: none` and `z-index: 9999` covers the entire viewport. While functionally transparent to interaction, the extreme z-index creates a maintenance trap. | [Habituating](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Habituating.aspx?web=1) | 8.2 Variable Outcome | **Low** | If any future element requires z-index above 9999, the grain will obscure it. The dialog overlay uses z-index 500, so it currently renders *behind* the grain (visual grain visible on top of dialog). |
| F-13 | Stage card carousel | **"Explore stage" hint barely visible; invisible on touch.** `.card-click-hint` is `rgba(255,255,255,0.25)` at rest, rising to `0.5` on `:hover`. Touch devices receive no hover, so the hint never brightens. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.2 Effectively Invisible Element | **Medium** | On touch devices, cards look purely decorative. The "Explore stage" text is the only affordance signalling interactivity, and it is at 0.25 opacity / 9px. |

---

## 6. Strengths

| # | Tenet | Observation |
|---|-------|-------------|
| S1 | [Beautiful](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Beautiful.aspx?web=1) | The dark theme, grain overlay, ambient glows, and 3D perspective card carousel create a cohesive, premium visual identity. Typography pairing (Instrument Serif + Inter) is excellent. |
| S2 | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) | The page is well-structured with a clear information hierarchy: value prop → methodology → tools → setup → contribute → CTA. A visitor can understand the product within one scroll. |
| S3 | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | Stage dialogs are well-organized with coloured accent bars, numbered stages, descriptions, and tool listings with availability badges. The mapping between stage and tools is immediately clear. |
| S4 | [Habituating](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Habituating.aspx?web=1) | Consistent design language: teal/amber/violet palette maps reliably to stages across cards, tool grid dots, and dialog accents. Card shapes, code blocks, and flow steps share a unified radius and spacing system. |
| S5 | [Responsive](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Responsive.aspx?web=1) | Smooth CSS transitions on cards (0.5s cubic-bezier), hover states, and dialog open/close. Intersection Observer fade-ins are well-timed at 80ms stagger. No janky or slow interactions. |

---

## 7. Quick Wins

Low-effort, high-value fixes the team can ship fast.

| Priority | Finding ID | Fix | Effort |
|----------|-----------|-----|--------|
| 1 | F-02 | Add global focus style: `*:focus-visible { outline: 2px solid var(--teal-glow); outline-offset: 2px; }` | ~2 min |
| 2 | F-01 | Add `role="button" tabindex="0"` to `.stage-card[data-stage]` and bind `keydown` for Enter/Space to call `openDialog()` | ~10 min |
| 3 | F-07 | Add a visually-hidden skip link as the first child of `<body>`: `<a href="#about" class="skip-link">Skip to content</a>` | ~5 min |
| 4 | F-08 | Add unique `aria-label` to each `.copy-btn`: "Copy clone command", "Copy install command", "Copy contribution commands" | ~3 min |
| 5 | F-09 | Add `aria-disabled="true"` and descriptive `aria-label` to each `.tool-card-soon` element | ~3 min |

---

## 8. Reasoning & Decisions

### Severity Rationale

- **F-01 (High, not Critical):** Stage card exploration is a significant engagement feature but not the page's primary conversion goal (cloning the repo). Keyboard users can still understand the methodology from the static text and tool grid. If the cards were the only path to critical information, this would be Critical.
- **F-03 (High):** Navigation loss on mobile is High because mobile likely represents a substantial share of visitors for a marketing page. The page is still scrollable, but discoverability of sections is meaningfully degraded.
- **F-04 (High):** Focus trap absence is High because the dialog is the primary interaction for stage exploration. Without trapping, keyboard users who open the dialog (if F-01 is fixed) will lose context entirely.
- **F-05 and F-06 (Medium):** Contrast issues are Medium because the page is primarily marketing/informational with short text passages, not a data-dense application. Users can still complete tasks but with discomfort.
- **F-12 (Low):** The z-index issue is a developer maintenance concern, not a current user-facing problem. Included because the grain renders visually on top of the dialog (z-index 9999 > 500), which is a subtle visual inconsistency.

### Ambiguous Calls

- **F-12 (z-index 9999):** Could be argued as not a usability issue. Included as Low because the grain overlay visibly appears on top of the dialog overlay (z-index 500), which is technically a rendering order issue (Trap 8.2). Future elements would also be affected.
- **F-11 (ambient glows):** Borderline between a strength and a finding. Logged as Low because on specific display types, the coloured halos can interfere with text contrast perception.

### Trap Mapping Notes

- **F-04** mapped to Trap 1.9 (Feedback Failure) rather than 1.1 (Invisible Element) because the dialog does open visually — the issue is that the system fails to provide correct feedback about the user's focus context and does not constrain interaction to the dialog.
- **F-01** mapped to Trap 1.1 (Invisible Element) because there is literally no cue (no focus ring, no tabindex) for keyboard users to discover the interaction affordance.
- **F-13** mapped to Trap 1.2 (Effectively Invisible Element) rather than 1.1 because a cue *does* exist (the "Explore stage" text) but it is so faint and position-dependent that it fails to be noticed, especially on touch devices.

---

## 9. Fix → Re-evaluate Loop

### How to proceed

Choose one of the following options:

- **(a) Fix all Quick Wins** — Address F-02, F-01, F-07, F-08, F-09 (~25 min total effort)
- **(b) Fix Top Issues only** — Address F-01, F-02, F-03, F-04 (all High-severity items)
- **(c) Pick specific finding IDs** — Specify which finding IDs to address
- **(d) Defer** — Accept current state; no fixes this round

After fixes are applied, a Round 2 evaluation (`tenets-traps-evaluation-r2.md`) will be generated
with a delta section showing each prior finding as Resolved / Partially resolved / Unchanged /
Regressed, plus any new findings introduced by the changes.

---

## Next Steps

- Address all 4 High-severity findings (F-01 through F-04) before public release
- Run an automated axe-core audit via Playwright to catch rendering-specific issues
- Conduct the usability test plan (see `design-loop-landing-page-usability-test-plan.md`) with 5 participants
- Re-evaluate after fixes to confirm resolution and check for regressions
