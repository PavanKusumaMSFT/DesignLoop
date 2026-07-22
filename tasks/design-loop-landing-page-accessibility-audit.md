---
title: "Accessibility Audit: Design Loop Landing Page"
phase: test
status: draft
created: 2026-06-15
updated: 2026-06-15
author: "Tester Agent"
related:
  - "design-loop-landing-page-tenets-traps-r1.md"
---

# Accessibility Audit: Design Loop Landing Page

WCAG 2.1 AA compliance audit of the Design Loop marketing landing page (`index.html`).

## Overview

This audit evaluates the landing page against WCAG 2.1 Level AA success criteria. The page is a
single-page dark-themed site with a fixed nav, hero section, interactive stage-card carousel,
tool grid, code blocks, and a modal dialog. Findings are organized by WCAG principle and include
severity ratings and remediation guidance.

**Result:** 9 issues identified — 3 High, 4 Medium, 2 Low. The page does not currently meet
WCAG 2.1 AA. The highest-impact issues are keyboard inaccessibility of stage cards, missing
focus indicators, and insufficient colour contrast on body text.

---

## Checklist

### Perceivable

- [x] All images have meaningful `alt` text — N/A (decorative SVGs use `aria-hidden="true"`)
- [ ] **Color contrast meets 4.5:1 (normal text) and 3:1 (large text)** — FAIL (A1, A2)
- [ ] **No content relies solely on color to convey meaning** — PARTIAL (A3)
- [x] Content is readable at 200% zoom — PASS (responsive layout reflows)
- [x] Text is not embedded in images — PASS

### Operable

- [ ] **All interactive elements are keyboard-accessible** — FAIL (A4)
- [ ] **Focus order is logical and visible** — FAIL (A5)
- [x] No content flashes more than 3 times per second — PASS
- [ ] **Skip navigation is provided** — FAIL (A6)
- [x] Page has a descriptive `<title>` — PASS

### Understandable

- [x] Page language is set (`lang="en"`) — PASS
- [x] Navigation is consistent — PASS (single-page, fixed nav)
- [x] Error identification — N/A (no user input forms)

### Robust

- [ ] **ARIA roles and labels are correctly applied** — PARTIAL (A7, A8, A9)
- [x] HTML validates (no major structural errors) — PASS

---

## Findings

| ID | WCAG SC | Criterion | Severity | Element / Area | Issue | Remediation |
|----|---------|-----------|----------|----------------|-------|-------------|
| A1 | 1.4.3 | Contrast (Minimum) | **High** | `--text-muted` elements | `rgba(240,237,232,0.25)` on `#080808` ≈ **1.9:1**. Fails AA for all text sizes. Used at 9–12 px for section labels, stat labels, footer copy, stage numbers. | Raise to at least `rgba(240,237,232,0.50)` or solid `#8a8880` (≥ 3:1). For normal-size contexts, target `#a09e98` (≥ 4.5:1). |
| A2 | 1.4.3 | Contrast (Minimum) | Medium | `--text-dim` body paragraphs | `rgba(240,237,232,0.45)` on `#080808` ≈ **3.9:1**. Passes 3:1 (large text) but fails 4.5:1 (normal text). Used at 15–17 px for body content. | Raise to `rgba(240,237,232,0.58)` or solid `#9a9790` for ≥ 4.5:1. |
| A3 | 1.4.1 | Use of Color | Low | Tool grid `.badge-dot` | Stage membership is encoded by dot colour alone (teal / amber / violet). The adjacent text label mitigates, but the dot itself is a primary visual cue with no shape or pattern differentiation. | Add a shape variant per stage, or confirm the text label is always sufficient. |
| A4 | 2.1.1 | Keyboard | **High** | `.stage-card` elements | Stage cards are `<div>` elements with `click` handlers but no `tabindex`, `role`, or keyboard event bindings. Keyboard users cannot reach or activate them. | Add `role="button"`, `tabindex="0"`, and handle `keydown` for Enter and Space keys. |
| A5 | 2.4.7 | Focus Visible | **High** | All interactive elements | No `:focus` or `:focus-visible` styles defined in the stylesheet. Browser-default outlines are invisible on `#080808`. | Add `*:focus-visible { outline: 2px solid var(--teal-glow); outline-offset: 2px; }` globally. |
| A6 | 2.4.1 | Bypass Blocks | Medium | Page-level | No skip-to-content link. Fixed nav forces keyboard users through 5+ tab stops before reaching main content. | Add a visually-hidden skip link as the first focusable element: `<a href="#about" class="skip-link">Skip to content</a>`. |
| A7 | 4.1.2 | Name, Role, Value | Low | `.copy-btn` elements | Three identical "Copy" buttons with no distinguishing `aria-label`. Screen-reader users cannot differentiate them. | Add unique labels: `aria-label="Copy clone command"`, `aria-label="Copy install command"`, `aria-label="Copy contribution command"`. |
| A8 | 4.1.2 | Name, Role, Value | Medium | Stage dialog | `aria-modal="true"` is set but no focus trap is implemented in JS. Focus can escape to background content while the modal is visually open. | Implement a focus trap: move focus to close button on open; loop Tab within the dialog; return focus to trigger on close. |
| A9 | 4.1.2 | Name, Role, Value | Medium | `.tool-card-soon` | "Coming soon" cards use `cursor: not-allowed` and `opacity: 0.35` but lack `aria-disabled="true"` or a programmatic indication of unavailability. | Add `aria-disabled="true"` and include an accessible label like `aria-label="User Interview Kit — coming soon"`. |

---

## Summary by Severity

| Severity | Count | IDs |
|----------|-------|-----|
| High | 3 | A1, A4, A5 |
| Medium | 4 | A2, A6, A8, A9 |
| Low | 2 | A3, A7 |

---

## Priority Remediation Order

1. **A4 + A5** — Keyboard access and focus visibility (blocks all keyboard users)
2. **A1** — Contrast on `--text-muted` (legibility failure)
3. **A8** — Dialog focus trap (modal accessibility)
4. **A6** — Skip link (navigation efficiency)
5. **A2** — Contrast on `--text-dim` (body text legibility)
6. **A9** — Disabled card semantics
7. **A7** — Copy button labels
8. **A3** — Colour-only encoding on badge dots

## Next Steps

- Address High-severity items (A1, A4, A5) before any public release.
- Re-run audit after fixes to verify remediation and check for regressions.
- Conduct an automated axe-core audit via Playwright on the rendered page to catch
  any issues not visible in code-level review.
