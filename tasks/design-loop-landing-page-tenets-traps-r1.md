---
title: "UI Tenets & Traps Evaluation: Design Loop Landing Page (Round 1)"
phase: test
status: draft
created: 2026-06-15
updated: 2026-06-15
author: "Tester Agent"
related:
  - "design-loop-landing-page-accessibility-audit.md"
---

# UI Tenets & Traps Evaluation: Design Loop Landing Page (Round 1)

A heuristic usability evaluation of the Design Loop marketing landing page using Microsoft's
[UI Tenets & Traps](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Home.aspx?web=1)
framework (9 Tenets, 26 Traps). Findings map to the canonical taxonomy in
[`.github/skills/tenets-traps-evaluation/reference.md`](../.github/skills/tenets-traps-evaluation/reference.md).

## Round Tracker

| Round | Date | Findings (C/H/M/L) | Resolved since last | Notes |
|-------|------|--------------------|--------------------|-------|
| r1 | 2026-06-15 | 0 / 3 / 5 / 4 | — | Baseline expert evaluation |

---

## 1. Executive Summary

This is a Round 1 expert (heuristic) evaluation of the **Design Loop marketing landing page** — a
single-page, dark-themed site that introduces the project, presents the five design-process stages
as an interactive card carousel, lists available tools/frameworks, and provides repository-cloning
instructions.

The evaluation walked five core visitor tasks end-to-end: understand the product, navigate between
sections, explore design stages via the interactive card dialog, copy code snippets, and reach the
GitHub repository.

**Headline:** The page is visually polished and the stage-card dialogs are well-structured
(*Beautiful*, *Efficient*). However, critical accessibility gaps undermine three tenets: **stage
cards are unreachable by keyboard** (High), **navigation vanishes on mobile with no replacement**
(High), and **focus indicators are absent** across all interactive elements (High). Multiple
text layers also fail WCAG AA contrast minimums.

**Findings by severity:** 0 Critical · 3 High · 5 Medium · 4 Low (12 total). Plus 5 notable
strengths.

---

## 2. Scope & Method

| Aspect | Detail |
|--------|--------|
| **Target** | `index.html` — single-page marketing / landing page (HTML + inline CSS + inline JS) |
| **User tasks walked** | 1. Understand what Design Loop is; 2. Navigate to About / Get Started / Contribute sections; 3. Explore stage cards and read stage dialogs; 4. Copy code snippets; 5. Reach the GitHub repo |
| **Paths considered** | Happy path (pointer), keyboard-only, touch (mobile), screen reader, returning visitor |
| **Method** | Single-reviewer heuristic evaluation against UI Tenets & Traps; severity per the reference scale |
| **Reference** | [reference.md](../.github/skills/tenets-traps-evaluation/reference.md) |

**Limitations:** This is a code-level expert review of the source HTML/CSS/JS, not a moderated
study with real users. Contrast ratios are calculated from CSS values; rendering differences across
monitors may shift results slightly. No browser-rendered testing was performed.

---

## 3. Scorecard

| Area / Component | Strengths | Findings | Worst severity |
|------------------|-----------|----------|----------------|
| Navigation | Sticky header, GitHub CTA | F1, F7 | **High** |
| Hero Section | Clear headline hierarchy, animated badge | — | — |
| Stage Cards (carousel) | Beautiful 3D perspective, parallax hover | **F2**, F3, F5 | **High** |
| Stage Dialog | Accent theming, Escape-to-close | F4 | Medium |
| Tools Grid | Stage-tagged badges, clear layout | F10 | Low |
| Code Blocks | Copy button, syntax highlighting | F12 | Low |
| Typography & Contrast | Elegant type pairing | **F6**, F8 | **High** |
| Footer | Minimal, consistent | F11 | Low |
| Global (focus / a11y) | — | **F9** | **High** |

---

## 4. Top Issues

Ranked by impact. Each references a finding ID from §5.

1. **F2 — Stage cards are not keyboard-accessible (High).** The five stage cards are `<div>`
   elements with click handlers but no `role="button"`, `tabindex`, or keyboard-event bindings.
   Keyboard-only and many assistive-tech users cannot discover or activate them, blocking a core
   interactive feature of the page.

2. **F1 — Navigation links disappear on mobile with no hamburger menu (High).** At ≤ 900 px
   `.nav-links` is set to `display: none` with no mobile menu alternative. Tablet and phone users
   lose the ability to navigate between sections via the header.

3. **F9 — No visible focus indicators anywhere (High).** The stylesheet defines no `:focus-visible`
   or `:focus` overrides. Browser-default focus rings are effectively invisible against the #080808
   background, making every interactive element unreachable for sighted keyboard users.

4. **F6 — `--text-muted` fails WCAG AA at all sizes (Medium).** Blended contrast of
   `rgba(240,237,232,0.25)` on `#080808` is approximately **1.9:1**, well below the 3:1 minimum
   for large text and 4.5:1 for normal text. Used on section labels, stat labels, and stage
   numbers.

5. **F4 — Stage dialog has no focus management (Medium).** Opening a dialog does not move focus
   into it; closing does not return focus to the trigger card. Screen-reader and keyboard users
   lose their place.

---

## 5. All Findings

| ID | Area / Component | Finding | Tenet | Trap(s) | Severity | Evidence / Reasoning |
|----|------------------|---------|-------|---------|----------|----------------------|
| F1 | Navigation | At ≤ 900 px, `.nav-links { display: none }` removes all section links with no hamburger or slide-out replacement. Mobile/tablet users cannot navigate via header. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.1 Invisible Element | **High** | CSS `@media (max-width: 900px)` hides links unconditionally; no toggle or drawer is implemented. |
| F2 | Stage Cards | Cards are `<div>` elements with `click` handlers but lack `role="button"`, `tabindex="0"`, and `keydown` handling. Keyboard users cannot Tab to or Enter/Space-activate them. | [Comfortable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Comfortable.aspx?web=1) | 2.1 Physical Challenge; 1.1 Invisible Element | **High** | JS binds `click` via `addEventListener`; no `keydown` listener; no `tabindex` attribute in HTML. Cards are completely inert for non-pointer input. |
| F3 | Stage Cards | The "Explore stage" hint text (`.card-click-hint`) is at 0.25 opacity and only brightens on hover. Touch users have no persistent cue that cards are interactive. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.2 Effectively Invisible Element | Medium | `.card-click-hint` has `color: rgba(255,255,255,0.25)` (≈ 1.6:1 contrast) and changes only on `:hover`. No focus or touch-persistent state. |
| F4 | Stage Dialog | Opening the dialog does not move focus into it; closing does not return focus to the originating card. `aria-modal="true"` is set but no focus-trap logic exists in JS. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.9 Feedback Failure; 2.1 Physical Challenge | Medium | `openDialog()` sets `classList.add('open')` but never calls `focus()`. `closeDialog()` doesn't store or restore the trigger element. Tab can escape the modal to the background. |
| F5 | Stage Cards | Edge cards are scaled to 0.83 and rotated up to 22°, reducing text legibility. On small screens (≤ 600 px), cards shrink further to 160 × 280 px — stage names and numbers become very small. | [Comfortable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Comfortable.aspx?web=1) | 2.1 Physical Challenge | Medium | CSS `.s-left2 { scale(0.83) }` combined with `@media (max-width: 600px) { width: 160px; }` produces ≈ 133 px effective card width with 13 px text. |
| F6 | Typography | `--text-muted: rgba(240,237,232,0.25)` on `#080808` yields ≈ 1.9:1 contrast — fails WCAG AA for all text sizes. Used in section labels, stat labels, stage numbers, and footer. | [Comfortable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Comfortable.aspx?web=1) | 2.1 Physical Challenge | **High** | Calculated: blended colour ≈ `#424240` on `#080808`. Relative luminance ratio ≈ 1.9:1. WCAG 1.4.3 requires 4.5:1 normal / 3:1 large. |
| F7 | Navigation | No skip-to-content link. The fixed nav is always present; keyboard users must Tab through all nav items to reach main content on every page load. | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) | 4.1 Unnecessary Step | Medium | No `<a class="skip-link">` or equivalent exists. With 4 nav links + CTA, keyboard users Tab 5+ times before reaching hero content. |
| F8 | Typography | `--text-dim: rgba(240,237,232,0.45)` on `#080808` yields ≈ 3.9:1 contrast — passes large text (3:1) but fails normal text (4.5:1). Used extensively for body paragraphs at 15–17 px. | [Comfortable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Comfortable.aspx?web=1) | 2.1 Physical Challenge | Medium | Blended ≈ `#706E69` on `#080808`. At 15–17 px (not "large" per WCAG definition), this text fails the 4.5:1 threshold. |
| F9 | Global | No `:focus-visible` or `:focus` styles defined. Browser-default outlines are invisible against the dark `#080808` background, blocking sighted keyboard navigation. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.1 Invisible Element; 2.1 Physical Challenge | **High** | Entire stylesheet has zero `:focus` or `:focus-visible` rules. Default `outline` on `#080808` is effectively invisible. |
| F10 | Tools Grid | "Coming Soon" tool cards use `cursor: not-allowed` but are not `disabled` elements and have no tooltip or screen-reader text explaining unavailability. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.5 Inviting Dead End | Low | `.tool-card-soon` has `opacity: 0.35` and `cursor: not-allowed`; visual cue only. No `aria-disabled`, no `title`, no explanatory text beyond the small "Soon" label. |
| F11 | Footer | "Docs" link points to `#start` (the Get Started section), not to documentation. Label creates a false expectation. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.5 Inviting Dead End | Low | `<a href="#start">Docs</a>` — user expects documentation but lands on clone/install instructions. |
| F12 | Code Blocks | Copy buttons lack `aria-label` context; three identical "Copy" buttons on the page are indistinguishable for screen-reader users navigating by button. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.4 Uncomprehended Element | Low | Three `<button class="copy-btn">Copy</button>` with no `aria-label` differentiator. |

### Strengths observed (Tenets upheld)

| Area | Strength | Tenet |
|------|----------|-------|
| Visual Design | Cohesive dark theme with teal/amber/violet palette, consistent card surfaces, grain overlay — strong brand identity | [Beautiful](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Beautiful.aspx?web=1) |
| Stage Dialog | Escape-to-close, click-outside-to-close, accent-coloured top bar, well-grouped tool listings | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) |
| Hero | Clear headline hierarchy, animated badge, dual-CTA (primary + secondary) — immediate comprehension of purpose | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) |
| Code Blocks | Syntax-highlighted snippets with copy button reduce friction for the "clone the repo" task | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) |
| Scroll Animations | `IntersectionObserver`-driven fade-ins are non-blocking, respect `threshold`, and don't replay | [Responsive](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Responsive.aspx?web=1) |

---

## 6. Quick Wins

Low-effort, high-value fixes drawn from §5:

| ID | Quick fix |
|----|-----------|
| F2 | Add `role="button"`, `tabindex="0"`, and a `keydown` listener (Enter/Space) to each `.stage-card[data-stage]`. |
| F9 | Add a global `:focus-visible` style: `*:focus-visible { outline: 2px solid var(--teal-glow); outline-offset: 2px; }` |
| F6 | Raise `--text-muted` to at least `rgba(240,237,232,0.45)` (or use solid `#8a8880`) to meet 3:1 for typical 11–12 px sizes. |
| F4 | In `openDialog()`, call `closeBtn.focus()` after opening. In `closeDialog()`, store the trigger and call `trigger.focus()`. |
| F12 | Add unique `aria-label` attributes: `"Copy clone command"`, `"Copy install command"`, `"Copy contribution command"`. |

---

## 7. Reasoning & Decisions

- **Why F2 is High, not Medium.** Stage cards are the page's primary interactive feature — the
  entire "five stages, one loop" value proposition is conveyed through them. Making them
  pointer-only blocks keyboard and switch-device users from the core experience. The combined
  exclusion of keyboard, switch, and voice-control input maps to both *Physical Challenge* (2.1)
  and *Invisible Element* (1.1), elevating this to High.

- **Why F1 is High.** Navigation links are the standard wayfinding mechanism on marketing pages.
  Removing them at ≤ 900 px without a substitute (hamburger menu, bottom sheet, etc.) means
  mobile visitors — often 50+ % of marketing-page traffic — lose header navigation entirely. The
  in-page scroll and anchor links partially mitigate, but the header nav loss is a clear
  *Invisible Element* (1.1).

- **F6 vs. F8 — different severities.** `--text-muted` (F6) is applied at 9–12 px for labels
  and meta-text where the content is informational; at 1.9:1 it's nearly unreadable and earns
  High. `--text-dim` (F8) is used at 15–17 px for body text; at 3.9:1 it fails the 4.5:1
  threshold but remains functionally readable, earning Medium.

- **No Critical findings.** Critical requires blocked task completion or data loss. The page is
  informational with no user-submitted data; even with the keyboard gaps, pointer users can
  complete all tasks, and no user data is at risk.

- **Multiple traps per finding.** Per the framework's "log all applicable traps" guidance,
  findings F2, F4, and F9 list more than one trap; the root-cause trap is named first.

- **Strengths logged deliberately.** The framework separates positive attributes (Tenets met)
  from problems (Traps); recording strengths keeps the report balanced and prevents regressions
  during fixes.

---

## 8. Fix & Re-evaluate Loop

This report is the **r1 baseline**. The loop is human-in-the-loop:

1. **Choose what to fix.** Options:
   - (a) Fix all **Quick Wins** (F2, F9, F6, F4, F12)
   - (b) Fix **Top Issues** only (F2, F1, F9, F6, F4)
   - (c) Pick specific finding **IDs**
   - (d) Defer and validate with a usability study first
2. **Apply fixes** to the landing page HTML/CSS/JS.
3. **Re-evaluate** → generate `tenets-traps-evaluation-r2.md` with a delta column marking each
   prior finding **Resolved / Partially resolved / Unchanged / Regressed**, plus any **new**
   findings, and update the Round Tracker.
4. **Repeat** until no open High/Critical findings remain or the team accepts the residual risk.

## Next Steps

- Confirm the fix scope (a/b/c/d above).
- Implement a mobile hamburger menu to resolve F1.
- Verify contrast ratios on the rendered page (browser DevTools) to confirm F6 and F8 calculations.
- Consider running an automated axe-core audit via Playwright for validation.
