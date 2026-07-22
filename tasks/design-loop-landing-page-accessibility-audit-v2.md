---
title: "Accessibility Audit: Design Loop Landing Page"
phase: test
status: draft
created: 2026-06-16
updated: 2026-06-16
author: "Tester Agent"
related:
  - "design-loop-landing-page-tenets-traps-r1-v2.md"
  - "design-loop-landing-page-usability-test-plan.md"
---

# Accessibility Audit: Design Loop Landing Page

WCAG 2.1 AA compliance audit of the Design Loop marketing landing page (`index.html` source artifact).

## Overview

This audit evaluates the landing page against WCAG 2.1 Level AA success criteria. The page is a
single-page dark-themed site with a fixed nav, hero section, interactive 3D stage-card carousel
with perspective transforms, a tool/framework grid, code blocks with copy buttons, a modal dialog
for stage details, and a contribution workflow section.

**Result:** 11 issues identified — 3 High, 5 Medium, 3 Low. The page **does not currently meet
WCAG 2.1 AA**. The highest-impact issues are keyboard inaccessibility of stage cards, missing
focus indicators, and insufficient colour contrast on muted text.

---

## Checklist

### Perceivable

- [x] All images have meaningful `alt` text — PASS (logo `<img>` has `alt="Design Loop Logo"`; inline SVGs are decorative)
- [ ] **Colour contrast meets 4.5:1 (normal text) and 3:1 (large text)** — FAIL (A1, A2)
- [ ] **No content relies solely on colour to convey meaning** — PARTIAL (A3)
- [x] Content is readable at 200% zoom — PASS (responsive layout reflows correctly)
- [x] Text is not embedded in images — PASS

### Operable

- [ ] **All interactive elements are keyboard-accessible** — FAIL (A4)
- [ ] **Focus order is logical and visible** — FAIL (A5)
- [x] No content flashes more than 3 times per second — PASS (pulse animation is a slow opacity fade)
- [ ] **Skip navigation is provided** — FAIL (A6)
- [x] Page has a descriptive `<title>` — PASS ("Design Loop — Build your loop. Stay the Designer.")
- [ ] **Mobile navigation available** — FAIL (A11)

### Understandable

- [x] Page language is set (`lang="en"`) — PASS
- [x] Navigation is consistent — PASS (fixed nav, single-page anchors)
- [x] Error identification — N/A (no user input forms)

### Robust

- [ ] **ARIA roles and labels are correctly applied** — PARTIAL (A7, A8, A9, A10)
- [x] HTML validates (no major structural errors) — PASS

---

## Findings

| ID | WCAG SC | Criterion | Severity | Element / Area | Issue | Remediation |
|----|---------|-----------|----------|----------------|-------|-------------|
| A1 | 1.4.3 | Contrast (Minimum) | **High** | `--text-muted` elements | `rgba(240,237,232,0.25)` on `#080808` background ≈ **1.9:1** ratio. Fails AA for all text sizes. Used at 9–12px for: `.section-label`, `.stat-label`, `.foot-copy`, `.stage-num`, `.tool-stage-badge`, `.step-num`, `.dialog-tools-label`, `.card-click-hint`, `.loop-connector`, `.tool-coming`. | Raise to `rgba(240,237,232,0.50)` or solid `#8a8880` for ≥ 3:1. For normal-size text (< 18px), target `rgba(240,237,232,0.65)` or `#a09e98` for ≥ 4.5:1. |
| A2 | 1.4.3 | Contrast (Minimum) | Medium | `--text-dim` body text | `rgba(240,237,232,0.45)` on `#080808` ≈ **3.9:1**. Passes 3:1 (large text) but fails 4.5:1 (normal text). Used at 13–17px for: `.hero-sub`, `.about-text p`, `.tool-desc`, `.flow-step p`, `.step p`, `.cards-header p`, `.dialog-desc`, `.dialog-tool-desc`. | Raise to `rgba(240,237,232,0.58)` or solid `#9a9790` for ≥ 4.5:1. |
| A3 | 1.4.1 | Use of Colour | Low | Tool grid `.badge-dot` | Stage membership communicated by dot colour alone (teal / amber / violet). Adjacent text labels mitigate, but the dot itself is a primary visual grouping cue with no shape or pattern differentiation for colour-blind users. | Add a shape variant per stage (circle, diamond, square) or confirm text label is the primary cue. |
| A4 | 2.1.1 | Keyboard | **High** | `.stage-card` elements | 5 stage cards are `<div>` elements with `click` handlers but no `tabindex`, `role`, or `keydown` bindings. Keyboard users cannot focus, discover, or activate any of them. Blocks access to stage detail dialogs entirely. | Add `role="button"`, `tabindex="0"`, and handle `keydown` for Enter/Space. |
| A5 | 2.4.7 | Focus Visible | **High** | All interactive elements | No `:focus` or `:focus-visible` styles defined in the stylesheet. Browser defaults are invisible on `#080808`. Affects: `.nav-logo`, `.nav-links a`, `.nav-cta`, `.btn-primary`, `.btn-secondary`, `.copy-btn`, `.dialog-close`, `.foot-links a`. | Add `*:focus-visible { outline: 2px solid var(--teal-glow); outline-offset: 2px; }` globally. |
| A6 | 2.4.1 | Bypass Blocks | Medium | Page-level | No skip-to-content link provided. Fixed nav has 5+ focusable elements (logo, 3 links, CTA). Keyboard users must tab through all on every page load. | Add `<a href="#about" class="skip-link">Skip to content</a>` as first child of `<body>` with CSS to show on focus. |
| A7 | 4.1.2 | Name, Role, Value | Low | `.copy-btn` elements | Three "Copy" buttons have identical text with no `aria-label`. Screen readers announce "Copy, button" three times with no differentiation. | Add unique labels: `aria-label="Copy clone command"`, `aria-label="Copy install command"`, `aria-label="Copy contribution commands"`. |
| A8 | 4.1.2 | Name, Role, Value | Medium | Stage dialog (`#stageDialog`) | `role="dialog"` and `aria-modal="true"` are correctly set. However: (1) focus is not moved to the dialog on open; (2) no focus trap constrains Tab within the dialog; (3) focus is not returned to the trigger card on close. | Implement JS focus trap: move focus to close button on open; cycle Tab within `.dialog-panel`; return focus to trigger `.stage-card` on close. |
| A9 | 4.1.2 | Name, Role, Value | Medium | `.tool-card-soon` (3 cards) | "Coming soon" cards use `opacity: 0.35` and `cursor: not-allowed` but have no `aria-disabled="true"` or programmatic role indicating unavailability. Screen readers present them identically to available tools. | Add `aria-disabled="true"` and `aria-label="[Tool Name] — coming soon"`. |
| A10 | 1.3.1 | Info and Relationships | Medium | `.section-label` elements | Section labels ("The Process", "Tools & Frameworks", "What is Design Loop", "Get Started", "Contribute", "Start Now") are `<div>` elements styled as section identifiers. They visually function as category labels but carry no semantic role. | Either promote to `<h2>` and adjust heading hierarchy, or keep as decorative (current approach is acceptable if the subsequent `<h2>` carries semantic weight). |
| A11 | 2.4.5 | Multiple Ways | Low | Navigation (responsive) | Below 900px, `.nav-links { display: none }` removes all section links. No hamburger, drawer, or alternative nav is provided. Mobile visitors can only navigate by scrolling. | Implement a hamburger menu or collapsible navigation for ≤ 900px viewports. |

---

## Summary by Severity

| Severity | Count | IDs |
|----------|-------|-----|
| High | 3 | A1, A4, A5 |
| Medium | 5 | A2, A6, A8, A9, A10 |
| Low | 3 | A3, A7, A11 |

---

## Priority Remediation Order

1. **A4 + A5** — Keyboard access and focus visibility (blocks all keyboard/AT users)
2. **A1** — Contrast on `--text-muted` (legibility failure across ~15+ element types)
3. **A8** — Dialog focus trap (modal accessibility)
4. **A6** — Skip link (keyboard navigation efficiency)
5. **A2** — Contrast on `--text-dim` (body text legibility)
6. **A9** — Disabled card semantics for "coming soon" tools
7. **A10** — Section label semantics
8. **A11** — Mobile navigation replacement
9. **A7** — Copy button differentiation
10. **A3** — Colour-only encoding on badge dots

---

## Next Steps

- Address High-severity items (A1, A4, A5) before any public release
- Implement Quick Wins from the Tenets & Traps evaluation (see related document)
- Re-run audit after fixes to verify remediation and check for regressions
- Run automated axe-core audit via Playwright on the rendered page
- Test with at least one screen reader (NVDA or VoiceOver) to validate dialog flow end-to-end
