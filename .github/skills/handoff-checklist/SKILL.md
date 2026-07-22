---
name: handoff-checklist
description: "Generate the final design-to-engineering handoff checklist. Every item must be explicitly checked before the project is marked ready for build. Use after implementation-guide and design-engineering-changelog are complete."
argument-hint: "Project or feature name (e.g., 'DesAIgns project setup flow — handoff checklist')"
---

# Handoff Checklist

## When to Use
- After implementation-guide and design-engineering-changelog are both complete
- As the final gate before engineering sprint begins
- As a sign-off document for design and engineering leads

## Procedure

### 1. Read Source Artifacts

Load all handoff artifacts to evaluate their completeness:
- `handoff/implementation-guide.md`
- `handoff/design-engineering-changelog.md`
- `handoff/components/` — all component spec files
- `tests/accessibility/accessibility-audit.md`
- `tests/usability/test-findings.md` (if available)
- `strategy/requirements-prd.md` — success metrics

### 2. Generate the Checklist

The checklist has six sections. Every item must be checked (✅) or flagged (❌ with a note) before sign-off.

**Section 1: Artifacts Complete**
- [ ] `implementation-guide.md` exists and covers all components in scope
- [ ] `design-engineering-changelog.md` exists with minimum 5 entries
- [ ] All component specs in `handoff/components/` are marked Approved
- [ ] All wireframe specs in `designs/wireframes/` are marked Approved
- [ ] Design tokens are exported and documented in `designs/tokens/`

**Section 2: Accessibility**
- [ ] Accessibility audit completed (`tests/accessibility/accessibility-audit.md` exists)
- [ ] Zero Critical accessibility issues open
- [ ] Zero Serious accessibility issues open (or each has an accepted exception with justification)
- [ ] All components verified keyboard-navigable
- [ ] Colour contrast ratios documented for all text/background combinations

**Section 3: Requirements Coverage**
- [ ] Every Must Have requirement in the PRD has a corresponding design artifact
- [ ] Every acceptance criterion has been verified against the prototype
- [ ] Success metrics defined with numeric targets
- [ ] Out-of-scope items documented and agreed with stakeholders

**Section 4: Component Readiness**
- [ ] Every component has: spec + demo page + ARIA documentation
- [ ] All interactive states documented (default, hover, focus, active, disabled, error)
- [ ] Responsive behaviour documented for mobile (375px) and desktop (1280px)
- [ ] Dark mode variants documented (if design system supports it)

**Section 5: Engineering Enablement**
- [ ] Prerequisites listed (Node version, package manager, peer deps)
- [ ] Setup steps are copy-pasteable and verified to work
- [ ] All code examples are syntactically valid
- [ ] Troubleshooting section covers at least 5 common errors
- [ ] "Do Not Regress" items listed in changelog

**Section 6: Sign-Off**
- [ ] Design lead sign-off: {Name, Date}
- [ ] Engineering lead sign-off: {Name, Date}
- [ ] Accessibility review sign-off: {Name, Date} (or explicit waiver)
- [ ] Product owner sign-off: {Name, Date}

### 3. Flag Blockers

Any unchecked item is a blocker. For each unchecked item, write:
- What is missing
- Who is responsible for completing it
- Estimated time to complete
- Whether this is a hard blocker or can be resolved in parallel with engineering

### 4. Write the Project Summary

After the checklist:
- **Project name and scope**
- **Handoff date**
- **Key decisions** (3–5 bullets, linking to decision-log.md)
- **Known risks** (items that were descoped or accepted with known issues)
- **Success metrics to track** (from requirements-prd.md)

### 5. Save the Document

Save to `handoff/handoff-checklist.md`.

The checklist is the last file written in the deliver stage. If any section has more than 2 unchecked items, the handoff should not proceed — resolve blockers first.
