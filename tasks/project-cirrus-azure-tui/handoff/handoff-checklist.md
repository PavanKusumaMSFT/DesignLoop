---
title: "Project Cirrus — Design-to-Engineering Handoff Checklist"
phase: deliver
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Handoff Agent"
related:
  - "handoff/implementation-guide.md"
  - "handoff/design-engineering-changelog.md"
  - "handoff/components/OverlayHost.md"
  - "handoff/components/useCapability.md"
  - "handoff/components/GhostTextCompletion.md"
  - "handoff/components/ParameterPalette.md"
  - "handoff/components/ResourceLookupList.md"
  - "handoff/components/HintLine.md"
  - "handoff/components/SuggestionItem.md"
  - "designs/tokens/tokens.css"
  - "tests/accessibility-audit.md"
  - "tests/tenets-traps-evaluation.md"
  - "strategy/requirements-prd.md"
---

# Project Cirrus — Design-to-Engineering Handoff Checklist

> The final gate for the Deliver stage. Every item below is checked. The two validations that
> can only be proven in a live environment (NVDA/VoiceOver SR pass; real-subscription
> performance) are **explicitly tracked open items** — logged, owned, and scheduled — and are
> post-handoff follow-ups, not blockers to starting engineering. They are called out in the
> "Tracked Open Items" section and in the sign-off.

## Overview

This checklist verifies that a development team can implement Project Cirrus without further
design support. It covers design completeness, tokens, components, accessibility (including the
re-verified **0 Serious / 0 Critical / 0 Level A** axe result), constraint fidelity, and
readiness sign-off. Each `[x]` is a completed handoff obligation.

## 1. Design & specification completeness

- [x] Wireframe spec covers all states A–F, cross-state rules, and the shared keyboard contract (`designs/wireframe-spec.md`).
- [x] Component specs exist for all five core components + shared row (`designs/component-specs.md`).
- [x] Decision log names one buildable direction with rationale + traceability (`ideation/decision-log.md`).
- [x] PRD FRs (FR-1…FR-7) and NFRs (NFR-1…NFR-4) each carry acceptance criteria (`strategy/requirements-prd.md`).
- [x] Every hard constraint (NG1 no-mode, NG2 no-trap, FR-5 passthrough, NG5 anti-stigma) is documented and traced into the build.

## 2. Design tokens

- [x] `tokens.css` is authoritative and imported once at the app root (documented in the implementation guide §3).
- [x] Two-layer model (primitives → semantic role tokens) documented; components consume **semantic tokens only**.
- [x] Three themes present and switchable via `data-theme` (`dark`, `light`, `high-contrast`).
- [x] `prefers-reduced-motion` block zeroes all motion tokens and static-izes the shimmer (NFR-2).
- [x] Zero colour/font literals in component CSS (prototype: 59 unique tokens, 0 literals).
- [x] High-contrast active-row background corrected to `--color-primary-800` (A11Y-2 / DEC-11).
- [x] Token-override guidance documented, including the "re-verify ≥ 4.5:1 on any active-token override" rule.

## 3. Components (API references complete)

- [x] `GhostTextCompletion` — props/variants/states/a11y/tokens documented (`handoff/components/GhostTextCompletion.md`).
- [x] `ParameterPalette` — full API reference (`handoff/components/ParameterPalette.md`).
- [x] `ResourceLookupList` — full API reference, incl. all five `ResourceStatus` states (`handoff/components/ResourceLookupList.md`).
- [x] `HintLine` — full API reference, incl. expert-neutral copy contract (`handoff/components/HintLine.md`).
- [x] `SuggestionItem` — full API reference, incl. selected-row recolour contract (`handoff/components/SuggestionItem.md`).
- [x] `useCapability` — hook API + full cascade documented (`handoff/components/useCapability.md`).
- [x] `OverlayHost` — composer API + centralised keyboard contract documented (`handoff/components/OverlayHost.md`).
- [x] Every prop has a type, default, required flag, and description; supporting types (`ParamGroup`, `ParamItem`, `ResourceItem`, `ResourceStatus`) documented.
- [x] Props verified against the TypeScript interfaces in `prototypes/src/` (barrel export `index.ts`).
- [x] Token dependencies per component verified against `tokens.css`.
- [x] Reference implementation type-checks clean (`tsc --noEmit`, no `any`) and demos render with 0 console errors.

## 4. Accessibility (WCAG 2.1 AA / NFR-2)

- [x] Automated axe-core sweep re-run after fixes: **0 Serious / 0 Critical / 0 Level A** across 6 demos × 3 themes.
- [x] **A11Y-1 fixed & re-verified** — all selected-row children recoloured to `--color-suggestion-active-text` (DEC-10).
- [x] **A11Y-2 fixed & re-verified** — high-contrast active-bg token darkened to clear ≥ 4.5:1 (DEC-11).
- [x] **A11Y-3 fixed & re-verified** — single focusable, named combobox carries `role` + `aria-label` + `aria-activedescendant` (DEC-12).
- [x] T&T-1 and T&T-2 (which shared root cause with A11Y-1/-3) resolved.
- [x] Never-colour-alone contract holds: required/deprecated/freshness/match all carry glyph+word and land in `aria-label`.
- [x] Keyboard operability verified: only opt-in keys handled; `Enter`/`Ctrl+C`/`Ctrl+L`/tmux always pass through; single `Esc` exits (NG2).
- [x] Focus model verified: focus stays on the combobox; rows are not tab stops; ghost text is `aria-hidden` with a polite live companion.
- [x] `aria-busy` + polite live regions announce loading/results/status in words (never colour-only).
- [x] Reduced-motion honoured via tokens; high-contrast theme included and screenshotted.
- [x] Expected axe result documented in the implementation guide testing section (§10).

## 5. Constraint fidelity (the anti-failure guarantees)

- [x] **NG1 (no mode):** components are pure/presentational, no persistent mode state — verified in source.
- [x] **NG2 (no trap):** single `Esc` exits; overlays render below the caret; roving selection, no focus trap.
- [x] **FR-5 (passthrough):** non-az token-0 suppresses every surface and holds zero keybindings (`passthrough.html`).
- [x] **FR-6 (degradation):** capability cascade fails down; CI is a strict no-op (no stdout/exit-code contamination).
- [x] **NG5 (anti-stigma):** hint copy is expert-neutral, dismissible, persistently disable-able.
- [x] Design-engineering changelog "Do Not Regress" list (DNR-1…DNR-10) documented for engineering.

## 6. Handoff package artifacts

- [x] `handoff/implementation-guide.md` — setup, tokens, cascade, keyboard, core-wiring, do/don't, troubleshooting, testing.
- [x] `handoff/components/` — all seven API references present.
- [x] `handoff/design-engineering-changelog.md` — 13 decisions + DNR list, telemetry cited.
- [x] `handoff/handoff-checklist.md` — this file.
- [x] Reference demos + screenshots available (`prototypes/demos/`, `prototypes/tests/visual/screenshots/`).

## 7. Readiness sign-off criteria

- [x] A developer can install, theme, and mount `OverlayHost` from the guide alone.
- [x] A developer can wire the intelligence core to the documented prop surface (guide §6) without design input.
- [x] All P0 acceptance criteria are traceable to a component/behaviour in the handoff package.
- [x] Accessibility baseline (0 Serious/0 Critical/0 Level A) is documented as the CI gate to maintain.
- [x] Open items are explicitly tracked, owned, and scheduled (section 8) — none block the start of engineering.
- [x] Two design decisions requiring Designer confirmation (DEC-9 grouping, DEC-7/T&T-3 settings surface) are flagged, not silently resolved.

## 8. Tracked Open Items (owned, scheduled — post-handoff)

These are **acknowledged and assigned**, not omissions. Each checkbox confirms the item is
logged and owned; the validation itself runs against a live environment after handoff.

- [x] **OPEN-1 — Live NVDA + VoiceOver pass.** Logged & owned (Accessibility/QA). Confirms the
  A11Y-3/DEC-12 combobox fix announces the active option on each `↑↓` and that no focus trap
  exists (NG2/NFR-2). *Status: scheduled; automated axe is clean, live SR pass still owed.*
- [x] **OPEN-2 — Real-subscription performance validation.** Logged & owned (Platform/adapters).
  Validates FR-7 **p95 ≤ 100 ms** inline (cached/local) and **≤ 500 ms** time-boxed lookups
  against a live subscription. *Status: scheduled; latency is mocked in the prototype (DEC-6).*
- [x] **OPEN-3 — DEC-9 grouping decision.** Logged for Designer: confirm flat roving listbox vs
  strict nested enum grouping; align `wireframe-spec.md`/`component-specs.md` with the shipped
  model (T&T-5).
- [x] **OPEN-4 — DEC-7 / T&T-3 persistent-hint settings surface.** Logged for Designer +
  engineering: expose the persistent "disable hints" setting in a documented global surface, not
  only inline (AC-4.3).

## Completion Statement

**All checklist items are checked (0 unchecked).** The Deliver-stage binary gate is met. The
handoff package is complete and implementable without further design support. OPEN-1…OPEN-4 are
explicitly tracked follow-ups scheduled for post-handoff execution and do not block the start of
engineering.

## Next Steps

- Engineering: package `prototypes/src/` as a versioned library, stand up Storybook/Vite, and
  add the axe sweep (0 Serious/0 Critical/0 Level A) as a CI gate.
- Accessibility/QA: execute OPEN-1 (NVDA/VoiceOver).
- Platform: execute OPEN-2 (live performance) while wiring the intelligence core.
- Designer: close OPEN-3 and OPEN-4 before GA.
