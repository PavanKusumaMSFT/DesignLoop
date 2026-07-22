---
name: accessibility-audit
description: "Audit all components and screens against WCAG 2.1 AA: colour contrast, keyboard navigation, ARIA markup, focus management, screen reader behaviour, and motion. Use after demo pages are built to identify and document every accessibility barrier."
argument-hint: "Component or screen name to audit (e.g., 'DesAIgns project setup flow — all screens')"
---

# Accessibility Audit

## When to Use
- After demo pages are built and component implementations are stable
- Before usability testing — accessibility barriers must be fixed before testing
- When verifying WCAG 2.1 AA compliance before production release

## Procedure

### 1. Read Source Artifacts

Load:
- `prototypes/demos/` — all demo pages for the components/screens in scope
- `handoff/components/` — component specs (ARIA and keyboard sections)
- `strategy/requirements-prd.md` — accessibility requirements (WCAG level)

### 2. Define Audit Scope

List every component and screen to audit:

| Audit ID | Component/Screen | Demo File | Automated Tool | Manual Check |
|----------|-----------------|-----------|----------------|--------------|
| A-01 | PrimaryButton | demos/PrimaryButton.html | axe-core | Keyboard, screen reader |

### 3. Run Automated Checks

For each demo file, run axe-core or equivalent:
- Document every violation with: Rule ID, Impact (Critical/Serious/Moderate/Minor), Element selector, Description
- Note: automated tools catch ~30% of WCAG issues — manual checks are required

### 4. Perform Manual Checks

For each component/screen, manually verify:

**A. Colour Contrast**
- Text on background: ≥ 4.5:1 (normal text), ≥ 3:1 (large text ≥ 18pt or 14pt bold)
- UI component boundaries and focus indicators: ≥ 3:1
- Tool: use the browser's DevTools accessibility panel or a contrast checker
- Record actual ratio for every colour combination

**B. Keyboard Navigation**
- Tab order follows a logical reading order
- All interactive elements reachable by keyboard (no keyboard traps)
- Focus indicator visible on all focusable elements (not hidden with outline: none)
- Enter/Space activates buttons; Enter follows links
- Escape closes modals, menus, dialogs
- Arrow keys navigate within composite widgets (menus, tabs, radio groups)

**C. ARIA and Semantics**
- Every interactive element has an accessible name (label, aria-label, or aria-labelledby)
- Landmark regions present: `<header>`, `<main>`, `<nav>`, `<footer>`
- Status messages use aria-live regions (for dynamic content)
- Images have meaningful alt text (or alt="" for decorative images)
- Error messages are programmatically associated with their input (aria-describedby)

**D. Focus Management**
- Modal/dialog: focus moves to the dialog on open; returns to trigger on close
- Page navigation: focus moves to the new content or page heading
- Dynamic content updates: focus not lost when content changes

**E. Motion and Animation**
- All animations respect `prefers-reduced-motion: reduce`
- No content flashes more than 3 times per second

### 5. Write Findings

For each issue found:

```
## Issue [A-N]: {Short title}

**WCAG Criterion**: {e.g., 1.4.3 Contrast (Minimum)} — Level AA
**Impact**: Critical / Serious / Moderate / Minor
**Component/Screen**: {Name}
**Element**: {CSS selector or description}

**Description**: What the issue is and what user group it affects.

**Evidence**: Specific data — contrast ratio, missing attribute value, keyboard test result.

**Remediation**: Exact fix required. Not "improve contrast" — write "Change `--color-text-secondary` from `#9CA3AF` to `#6B7280` to achieve a 4.6:1 contrast ratio on white."

**Effort**: Low (<1 hour) / Medium (1–4 hours) / High (>4 hours)
```

### 6. Write the Summary

At the top of the report:
- Total issues by impact level
- WCAG criteria violated (list by criterion)
- Components that passed all checks
- Sign-off recommendation: Pass / Pass with caveats / Block (if Critical issues exist)

### 7. Save the Report

Save to `tests/accessibility/accessibility-audit.md`.
