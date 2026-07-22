---
title: "Project Cirrus — Accessibility Audit (WCAG 2.1 AA)"
phase: test
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Tester Agent"
related:
  - "prototypes/README.md"
  - "prototypes/demos/index.html"
  - "prototypes/demos/cirrus-demo.css"
  - "designs/component-specs.md"
  - "designs/wireframe-spec.md"
  - "designs/tokens/tokens.css"
  - "strategy/requirements-prd.md"
  - "tests/usability-test-plan.md"
---

# Project Cirrus — Accessibility Audit (WCAG 2.1 AA)

Automated + manual WCAG 2.1 AA audit of the six runnable demos in `prototypes/demos/`
(States A–F) across the three themes (dark / light / high-contrast) and the reduce-motion
toggle, validating NFR-2 (accessibility), NG2 (never trap), and the "never colour-alone"
signalling contract.

## Overview

- **Automated engine:** `axe-core` 4.x driven by Playwright (Chromium), run against every demo
  page × 3 themes = **18 scans**, ruleset `wcag2a, wcag2aa, wcag21a, wcag21aa`.
- **Methodology caveat:** demos load `tokens.css` and `cirrus-demo.css` via relative `<link>`.
  Under `file://` these are blocked by CORS, so the audit **injected both stylesheets** into
  each page before scanning to reproduce true themed rendering (the CORS console errors are a
  test-harness artefact, not a product defect — the demos render correctly over HTTP as
  documented in the prototype README).
- **Manual review:** ARIA pattern correctness (non-modal listbox / `aria-activedescendant` /
  focus trap), keyboard operability, focus visibility, reduced-motion, and colour-independence
  were code-reviewed against `cirrus-demo.css` and each demo's script.
- **Result headline:** **2 distinct Serious defect classes**, both concentrated in the
  interactive overlay states (B parameter palette, C resource lookup). States A, D, E, F are
  clean. There are **0 Critical** findings, but the 2 Serious findings **are WCAG 2.1 AA
  Level A/AA failures and must be fixed before Handoff** (NFR-2 is a P0 acceptance criterion).

### Automated scan results (axe-core, per page × theme)

| Demo (state) | dark | light | high-contrast |
|--------------|------|-------|---------------|
| `ghost-text.html` (A) | ✅ 0 | ✅ 0 | ✅ 0 |
| `parameter-palette.html` (B) | ⚠️ 1 | ⚠️ 1 | ⚠️ 2 |
| `resource-lookup.html` (C) | ⚠️ 1 | ⚠️ 2 | ⚠️ 2 |
| `hint-line.html` (D) | ✅ 0 | ✅ 0 | ✅ 0 |
| `passthrough.html` (E) | ✅ 0¹ | ✅ 0¹ | ✅ 0¹ |
| `degraded-plain.html` (F) | ✅ 0² | ✅ 0² | ✅ 0² |

Violation IDs: `aria-input-field-name` (Serious, WCAG 4.1.2) and `color-contrast`
(Serious, WCAG 1.4.3).

> ¹ `passthrough.html` defaults to a **suppressed** (non-`az`) line, so the rich overlay/selected
> row was **not present at scan time** — its overlay reuses the same `.row.selected` CSS as B/C
> and therefore inherits the **same contrast defect** when shown (see A11Y-1). Coverage gap, not
> a pass.
> ² `degraded-plain.html` defaults to the **plain (F-1)** tier; the rich overlay is only rendered
> after clicking "rich", so it was likewise not scanned in the rich state. Same caveat.

## Findings

Severity scale: **Critical** (blocks core use / legal-risk on primary flow) · **High/Serious**
(WCAG AA failure on a functional element) · **Medium** (degrades experience, workaround exists) ·
**Low** (cosmetic / demo-harness only).

### A11Y-1 — Selected-row secondary text & badges fall below 4.5:1 on the active-row background · **Serious** · WCAG 1.4.3 (Contrast Minimum, AA)

- **Where:** `ParameterPalette` (State B) and `ResourceLookupList` (State C) — the **highlighted/
  selected** row. Confirmed by axe on `parameter-palette.html` (high-contrast) and
  `resource-lookup.html` (light + high-contrast). Applies equally to the same overlay in
  `passthrough.html` / `degraded-plain.html` rich tier.
- **Root cause (in `cirrus-demo.css`):** `.row.selected` swaps the background to
  `--color-suggestion-active-bg` and recolours **only** `.rprimary` to
  `--color-suggestion-active-text`. The child spans `.typeHint`, `.secondary`, `.requiredGlyph`,
  and the `.badge-*` set keep their **terminal-surface** colours (violet type hint, pink
  required, cyan cached, muted secondary), which were verified against the *terminal/overlay*
  background — not against the highlighted-row background.
- **Measured contrast on the selected row (from axe):**
  | Element | Theme | FG / BG | Ratio | Needs |
  |---------|-------|---------|-------|-------|
  | `.typeHint` `<enum>` | high-contrast | `#c4b6ff` / `#1f78e0` | **2.38:1** | ≥ 4.5 |
  | `.badge-required` "required" | high-contrast | `#ffb4b4` / `#1f78e0` | **2.58:1** | ≥ 4.5 |
  | `.secondary` "Pricing tier" | high-contrast | `#ffffff` / `#1f78e0` | **4.35:1** | ≥ 4.5 |
  | `.rprimary` "--sku" | high-contrast | `#ffffff` / `#1f78e0` | **4.35:1** | ≥ 4.5 |
  | `.badge-cached` "⚡ cached" | high-contrast | `#57d6e2` / `#1f78e0` | **2.51:1** | ≥ 4.5 |
  | `.badge-cached` "⚡ cached" | light | `#0f7580` / `#cfe6ff` | **4.23:1** | ≥ 4.5 |
- **Impact:** The one row the user is acting on is the **hardest to read** — worst in the
  high-contrast theme, which must be the *safest* surface. Low-vision users cannot reliably read
  the type hint, required marker, or freshness badge while selecting. Note the "never
  colour-alone" contract still holds (the *words* "required"/"cached" remain), but the **text
  contrast itself fails AA.**
- **Recommended fix (Prototyper + Designer):** In the selected state, recolour **all** row
  children to a token guaranteed ≥ 4.5:1 on `--color-suggestion-active-bg` — e.g. add
  `.row.selected .typeHint, .row.selected .secondary, .row.selected .requiredGlyph,
  .row.selected [class^="badge-"] { color: var(--color-suggestion-active-text); }` — or
  introduce dedicated `--color-suggestion-active-*` sub-tokens for badges/type hints that the
  Designer verifies per theme. Preserve non-colour signalling (glyph + text) so meaning survives
  the recolour.

### A11Y-2 — High-contrast active-row token pair itself is sub-threshold · **Serious** · WCAG 1.4.3 (AA)

- **Where:** the high-contrast theme's core selection pair in `tokens.css`:
  `--color-suggestion-active-text: #ffffff` on `--color-suggestion-active-bg: #1f78e0`
  (`--color-primary-500`) = **4.35:1** — below the 4.5:1 AA threshold for normal-size text.
- **Impact:** Even after A11Y-1's child recolour to white, the primary label on the selected row
  would still fail in high-contrast. This is a **token defect**, not just a CSS wiring issue, and
  it undermines the theme whose entire purpose is maximum legibility. The `component-specs.md`
  claim that "active row text ≥ 4.5:1 in all themes" is **not met** in high-contrast.
- **Recommended fix (Designer, token change):** Darken the high-contrast active background to a
  primary that clears 4.5:1 with white — e.g. `--color-primary-800` (`#0a3a72`, ≈ 10.9:1 with
  white) or pure `#000` with a bright border — then re-verify all selected-row children. Keep
  the yellow `#ffff00` active border (already strong) for the non-colour selection cue.

### A11Y-3 — `role="combobox"` command span has no accessible name · **Serious** · WCAG 4.1.2 (Name, Role, Value, Level A)

- **Where:** `#cmd` in `parameter-palette.html` and `resource-lookup.html`:
  `<span class="command" id="cmd" role="combobox" aria-autocomplete="list" aria-expanded="true"
  aria-controls="pal" aria-activedescendant="pal-opt-0">`. Flagged by axe in **all three
  themes** (`aria-input-field-name`).
- **Two coupled ARIA problems:**
  1. **No name:** the combobox exposes no `aria-label`/`aria-labelledby`/`title`, so a screen
     reader announces an unnamed combobox.
  2. **Focus/`activedescendant` mismatch (manual finding):** DOM focus lives on the wrapping
     `<main class="host" tabindex="0">`, but `role="combobox"` and `aria-activedescendant` sit on
     the non-focusable `#cmd` span. Per ARIA APG, `aria-activedescendant` must be on the element
     that **holds focus**. As wired, assistive tech tracking the focused `host` will **not**
     announce the active option as the user arrows — the roving-selection announcement can be
     lost. (The `aria-activedescendant` is duplicated onto `#cmd`, which never receives focus.)
- **Impact:** Screen-reader users may not hear which parameter/resource is selected while
  navigating — directly threatening the non-modal listbox promise (NG2, NFR-2) that this pattern
  exists to deliver. Note the parallel: the `README` and `component-specs` already flag that a
  real NVDA/VoiceOver pass is still owed; this audit confirms the wiring needs correcting first.
- **Recommended fix (Prototyper):** Consolidate the combobox onto a **single focusable element**.
  Either (a) make `#cmd` itself focusable (`tabindex="0"`) and move focus + `role="combobox"` +
  `aria-activedescendant` + `aria-controls` onto it (drop the redundant attrs on `host`), or
  (b) keep focus on a real input and put the combobox role + `aria-activedescendant` there. Add
  `aria-label="Azure CLI command"` (or label via visible prompt). Verify with NVDA + VoiceOver
  that each `↑↓` announces the active option.

### A11Y-4 — Focused terminal host has no visible focus indicator · **Medium** · WCAG 2.4.7 (Focus Visible, AA)

- **Where:** `.host` (the `<main tabindex="0">`) receives keyboard focus in States B/C/D/E, but
  `cirrus-demo.css` defines `:focus-visible` outlines only for demo-control buttons and the
  `HintLine` dismiss button — **not** for `.host`.
- **Impact:** A keyboard user tabbing to the terminal region gets no visible indication that it
  holds focus. Selection is shown via the active-row border, which partly mitigates it, but the
  focus container itself is invisible. (Largely a demo-scaffold concern; in the real terminal the
  shell owns the caret, but the pattern should still be correct.)
- **Recommended fix (Prototyper):** Add `.host:focus-visible { outline: 2px solid
  var(--color-focus-ring); outline-offset: 2px; }`, or move focus onto the labelled combobox per
  A11Y-3 (which would carry its own focus ring).

### A11Y-5 — Ghost-text demo intercepts `Tab`, creating a demo-only keyboard trap · **Low** · WCAG 2.1.2 (No Keyboard Trap, A) — harness only

- **Where:** `ghost-text.html` keydown handler calls `e.preventDefault()` on `Tab` to model
  "accept". In the browser demo this means keyboard focus cannot leave the `host` via `Tab`
  (must use `Esc`/click), a minor trap **in the demo page**.
- **Impact:** In the **product** context this is correct behaviour (Tab = accept the inline
  completion in the shell, which owns focus); the trap only exists because the demo reuses the
  page's Tab. No product defect, but note it so it isn't copied into a real web surface.
- **Recommended fix:** None required for product; if the demo is shown to keyboard users, scope
  the Tab-accept so it doesn't block page tab-out, or document it in the demo note.

### A11Y-6 — `role="option"` on non-selectable notes · **Low** · WCAG 4.1.2 (A)

- **Where:** the empty-state fallback `<li class="empty-note" role="option">no bounded values …`
  in `parameter-palette.html`, and similarly the informational rows. Giving purely
  informational, non-actionable text `role="option"` can mislead AT into announcing a selectable
  option that cannot be selected.
- **Impact:** Minor confusion in the empty/free-text state; not flagged by axe (valid role in a
  listbox) but a semantics nit.
- **Recommended fix (Prototyper):** Render non-selectable notes outside the option set (e.g. a
  `role="note"` line or the listbox's `aria-describedby`), not as an `option`.

## What passed (verified good)

- **States A, D, E, F: 0 automated violations in all three themes.** Ghost text is correctly
  `aria-hidden` with an `aria-live="polite"` companion (prevents SR reading half-typed input);
  the hint line uses `role="note"` in a polite live region with a real focusable `<button>`
  dismiss and a persistent "Don't show hints" control (FR-4/AC-4.3); passthrough and degraded
  states render plain, colour-independent text.
- **Never colour-alone contract holds:** required (`*` + "required"), deprecated ("deprecated"
  tag), and freshness (`● live` / `⚡ cached` glyph + word) all carry text/glyph in addition to
  colour, and every signal is folded into each row's `aria-label` (verified in demo scripts).
- **Reduced motion:** `tokens.css` has a `prefers-reduced-motion: reduce` block that zeroes
  motion tokens, and `cirrus-demo.css` mirrors it plus a manual `.force-reduced-motion` override
  that also converts the loading shimmer to a static track — honouring NFR-2.
- **Idle (non-selected) rows and all overlay header/footer text pass contrast** in every theme;
  ghost text meets its documented ≥ 4.5:1 (4.8:1 dark / 4.9:1 light).
- **`aria-busy`** is correctly toggled during the resource-lookup loading state, with a polite
  live region announcing resource counts and freshness.

## Severity Summary

| ID | Severity | WCAG SC | State(s) | Owner |
|----|----------|---------|----------|-------|
| A11Y-1 | Serious (High) | 1.4.3 (AA) | B, C (+ E/F rich) | Prototyper + Designer |
| A11Y-2 | Serious (High) | 1.4.3 (AA) | all — high-contrast token | Designer |
| A11Y-3 | Serious (High) | 4.1.2 (A) | B, C | Prototyper |
| A11Y-4 | Medium | 2.4.7 (AA) | B, C, D, E | Prototyper |
| A11Y-5 | Low (harness) | 2.1.2 (A) | A (demo only) | — |
| A11Y-6 | Low | 4.1.2 (A) | B (empty state) | Prototyper |

**0 Critical · 3 Serious/High · 1 Medium · 2 Low.** Level A failures present (A11Y-3, an
accessible-name defect), so the **Level-A-clean completion criterion is not yet met** — Handoff
should be gated on fixing A11Y-1/-2/-3.

## Next Steps

- **Blocking for Handoff:** fix A11Y-1 (recolour selected-row children), A11Y-2 (high-contrast
  active-bg token), and A11Y-3 (combobox accessible name + focus/`activedescendant` consolidation).
- Re-run the axe sweep after fixes; target **0 Serious across all 18 page×theme scans**, and add
  a scan that opens the rich overlay in `passthrough.html`/`degraded-plain.html` to close the
  coverage gap noted above.
- Complete the still-owed **NVDA + VoiceOver** pass on the non-modal listbox (confirms A11Y-3 fix
  and that no focus trap exists — NG2/NFR-2).
- Address Medium/Low items (host focus ring, non-selectable-note semantics) opportunistically.
- Re-verify all `--color-suggestion-*` and freshness/badge token pairs against the *selected-row*
  background per theme and update the contrast claims in `component-specs.md`.
