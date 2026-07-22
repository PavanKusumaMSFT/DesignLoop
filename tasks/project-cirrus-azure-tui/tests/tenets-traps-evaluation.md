---
title: "Project Cirrus — UI Tenets & Traps Heuristic Evaluation"
phase: test
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Tester Agent"
related:
  - "prototypes/README.md"
  - "prototypes/demos/index.html"
  - "designs/component-specs.md"
  - "designs/wireframe-spec.md"
  - "strategy/requirements-prd.md"
  - "strategy/personas.md"
  - "tests/accessibility-audit.md"
  - "tests/usability-test-plan.md"
---

# Project Cirrus — UI Tenets & Traps Heuristic Evaluation

A heuristic evaluation of the inline, non-modal Azure CLI intelligence layer against
**Microsoft's UI Tenets & Traps** model. Because Project Cirrus is explicitly a reaction to the
failure modes of `az interactive` (~0.1% adoption) and AI Shell (~6% retention), the evaluation
is weighted toward the traps that sink terminal tooling: **mode friction, interruption,
discoverability, and forced overhead.**

Evaluated artefacts: the six runnable demos (`prototypes/demos/`, States A–F), the component and
wireframe specs, and the design tokens. Each finding maps to a **Tenet** (the good principle at
stake) and a **Trap** (the anti-pattern to avoid).

## Overview

- **Method:** single-evaluator expert walkthrough of every demo state × 3 themes, cross-checked
  against `wireframe-spec.md` cross-state rules and the PRD's non-goals (NG1/NG2/NG5).
- **Tenets/Traps vocabulary used** (Microsoft UI Tenets & Traps): *Self-Evident / Self-Explaining*
  · *Efficient* · *Forgiving* · *Trustworthy* · *In Control* · *Approachable* — paired against the
  classic traps below.
- **Headline:** The core interaction model is **strong and directly antidotal** to the historic
  traps — there is genuinely no mode (NG1), the user is never trapped (NG2), and non-`az` commands
  pass through untouched (FR-5). **0 Critical** and **0 High** tenet/trap findings on the
  *interaction model*. The residual issues are **Medium** (perceptibility/consistency of the
  active row — overlapping the accessibility audit) and **Low** (discoverability of persistent
  controls, freshness legend). Net: the experience **avoids the traps that killed `az
  interactive`.**

### Trap-avoidance scorecard (the four traps that mattered most)

| Historic failure | Trap | Cirrus behaviour | Verdict |
|------------------|------|------------------|---------|
| `az interactive` mode friction | **Trap: Forcing an unnatural model / Optionitis of modes** | No container to enter/exit; suggestions are inline, presentational, non-stateful (NG1) | ✅ Avoided |
| Modes trapping the user / hijacked keys | **Trap: Trapping the user / Taking control away** | Single `Esc` exits; `Enter`/`Ctrl+C`/`Ctrl+L`/tmux never intercepted; non-`az` fully suppresses (NG2, FR-5) | ✅ Avoided |
| "SECRET mode beginners must see" stigma | **Trap: Talking down to the user** | Hint copy is expert-neutral, factual, dismissible + persistently disable-able (FR-4, NG5) | ✅ Avoided |
| Slow / blocking startup & lookups | **Trap: Making the user wait / Blocking** | Cached-first, non-blocking, ≤ 500 ms fallback to free text; keystrokes never blocked (FR-7, NFR-1) | ✅ Avoided *(design intent; latency mocked — verify live)* |

## Top Issues

1. **T&T-1 (Medium) — The selected row is the least perceptible element.** The one row the user
   is acting on drops below legibility in light/high-contrast themes (secondary text, type hint,
   and freshness badges lose contrast on the active background). Violates *Trustworthy /
   Self-Evident*; **Trap: Poor perceived affordance / hard to perceive state.** This is the same
   defect as accessibility findings A11Y-1/A11Y-2 and is the single most impactful UX issue.
2. **T&T-2 (Medium) — "You are here" of the non-modal listbox is not announced to everyone.**
   The roving `aria-activedescendant` is wired to a non-focused span, so screen-reader users may
   not perceive which option is active while arrowing. Violates *In Control / Self-Evident*;
   **Trap: Hiding feedback / state the user can't perceive.** Mirrors A11Y-3. The *visual* cue is
   present; the *programmatic* cue can be lost.
3. **T&T-3 (Low→Medium) — The persistent "disable hints" control is discoverable only when a hint
   is already shown.** AC-4.3 requires a documented, persistent setting; in the demo it lives
   inline next to a hint. A user who wants to turn hints off *proactively* (or who already
   dismissed them) has no visible path. Violates *In Control*; **Trap: Hidden/forgotten
   settings.**
4. **T&T-4 (Low) — Freshness / required legend relies on learned glyphs.** `⚡ cached` vs `● live`
   and the `*` required marker are labelled with words (good, never colour-alone) but there is no
   persistent legend; first-time users must infer meaning. Violates *Self-Explaining*; **Trap:
   Assuming the user knows.** Low because the words accompany the glyphs.

## All Findings

Each finding: **ID · Severity · Tenet upheld/violated · Trap code · State · Evidence · Recommendation.**

### T&T-1 · Medium · Tenet: *Trustworthy / Self-Evident* · Trap: **Hard-to-perceive state (poor affordance)**
- **State/where:** B (`parameter-palette.html`), C (`resource-lookup.html`) selected row; worst in
  high-contrast and light themes.
- **Evidence:** `.row.selected` recolours only `.rprimary`; type hint (2.38:1), required badge
  (2.58:1), cached badge (2.51:1), secondary/primary (4.35:1) fall under 4.5:1 on the active
  background (measured — see accessibility audit A11Y-1/-2).
- **Why it matters:** Selection is the primary feedback of the whole interaction; if the active
  row is the hardest to read, the user distrusts what `Tab` will insert — corrosive for a tool
  competing on *trust and speed*.
- **Recommendation:** Recolour all selected-row children to an active-safe token and fix the
  high-contrast active-bg token (owners: Prototyper + Designer). See A11Y-1/-2 for exact fix.

### T&T-2 · Medium · Tenet: *In Control / Self-Evident* · Trap: **Hidden feedback**
- **State/where:** B, C — roving selection via `aria-activedescendant`.
- **Evidence:** `role="combobox"` + `aria-activedescendant` are on the non-focusable `#cmd` span
  while DOM focus is on the wrapping `host`; the active option may not be announced (A11Y-3).
- **Why it matters:** The non-modal listbox is the crux of "help without a mode"; if its state
  isn't perceivable by AT users, the tenet fails for them specifically.
- **Recommendation:** Consolidate focus + combobox role + `aria-activedescendant` onto one
  focusable element; verify with NVDA/VoiceOver (owner: Prototyper).

### T&T-3 · Low→Medium · Tenet: *In Control* · Trap: **Hidden/forgotten setting**
- **State/where:** D (`hint-line.html`) — "Don't show hints" only appears alongside a live hint.
- **Evidence:** No global/settings entry point in the prototype; AC-4.3 asks for a *documented,
  persistent* setting.
- **Recommendation:** Expose the persistent hint toggle in a documented config/settings surface
  (and/or a discoverable command), not only inline (owner: Designer + Prototyper/eng).

### T&T-4 · Low · Tenet: *Self-Explaining* · Trap: **Assuming the user knows**
- **State/where:** B, C — `*`, `⚡ cached`, `● live`, `<enum>`/`<lookup>` type hints.
- **Evidence:** Meaning is carried in words (good) but there is no first-run legend; the footer
  shows key legend, not symbol legend.
- **Recommendation:** Consider a one-time or `Ctrl+Space`-peek legend; keep it dismissible so it
  doesn't nag experts (owner: Designer). Low priority — words already accompany glyphs.

### T&T-5 · Low · Tenet: *Consistent* · Trap: **Gratuitous inconsistency**
- **State/where:** wireframe B nests enum values **under** the active flag; the prototype models
  flags and enum values as **sibling rows** in one flat listbox (documented in README fidelity
  note #4).
- **Evidence:** Spec vs implementation divergence in grouping.
- **Recommendation:** Confirm with the Designer whether flat roving selection (simpler, one
  coherent model) is acceptable, or strict nesting is required; align spec + build (owner:
  Designer decision). Not a user-facing defect on its own.

### T&T-6 · Low · Tenet: *Approachable* · Trap: **Overwhelming density**
- **State/where:** B palette shows flag + `<type>` + description + requirement badge per row in a
  dense monospace grid; on narrow terminals this may crowd.
- **Evidence:** `white-space: nowrap` rows; no observed truncation strategy for the palette rows
  (hint line and ghost text do truncate).
- **Recommendation:** Verify row truncation/priority at ~80-col width; ensure the required marker
  and flag name survive truncation (owner: Prototyper). Low — max ~8 rows keeps it bounded.

### Positive findings (tenets strongly upheld — evidence the traps are avoided)

- **P1 · *Efficient* / no-mode:** Components are pure/presentational; no persistent mode state.
  Non-`az` token-0 suppresses **every** surface with zero prefix/wrapper/exit (`passthrough.html`
  verified for `kubectl`, `git`, `aws`, `pwsh`, and composed `az … | jq`). Directly neutralises
  the `az interactive` mode trap and the `#`-prefix workaround. **Maya's gate: passed.**
- **P2 · *Forgiving* / never trap:** Every interactive state exits on a single `Esc`; a second
  `Esc`/`Ctrl+C` passes to the shell; `Enter` always submits the typed line. Overlays render
  **below** the caret and never cover the command line. Neutralises the "trapping / hijacked
  keys" trap (NG2, FR-5, verified across B/C/D).
- **P3 · *Approachable* without condescension:** Hint copy ("3 required flags remain", "42 SKUs
  available — Ctrl+Space") is factual and expert-framed; no "beginner/tip/learn-the-basics"
  phrasing. Neutralises the "talking down" trap (NG5, T4) that stigmatised the earlier design.
- **P4 · *Forgiving* / non-blocking recovery:** State C is cached-first and always degrades to
  free text on timeout/unauth/empty with plain-language notes — the user is never blocked or
  forced to authenticate mid-flow (FR-3/NFR-1/AC-3.3).
- **P5 · *Trustworthy* / honest state:** Freshness is always labelled (`cached ⚡` / `live ●`) as
  text+glyph+colour, and `aria-busy` + live regions announce loading/results — the system tells
  the truth about staleness rather than silently showing stale data.
- **P6 · *In Control* / graceful degradation:** The capability cascade fails **down** to the
  plainer tier (safe default), and CI is a strict no-op (no stdout/exit-code contamination) —
  respecting scripts and Priya's "no rival AI mode" requirement (FR-6/AC-6.3).

## Quick Wins

Low-effort, high-value fixes routable before Handoff:

1. **Recolour selected-row children** (`.row.selected .typeHint/.secondary/.badge-*/.requiredGlyph
   → active-text`) — one CSS rule closes T&T-1's UX side and a11y A11Y-1. *(Prototyper, ~1 line.)*
2. **Add `aria-label="Azure CLI command"`** to the combobox and consolidate focus onto it —
   resolves T&T-2 / A11Y-3 naming half. *(Prototyper.)*
3. **Darken high-contrast `--color-suggestion-active-bg`** to `--color-primary-800` (or black) —
   fixes A11Y-2 / T&T-1 for the safest theme. *(Designer token change.)*
4. **Add `.host:focus-visible` ring** — closes A11Y-4 and improves perceived focus. *(Prototyper.)*
5. **Document the persistent "disable hints" setting** location in the spec/help — addresses
   T&T-3 without new UI. *(Designer/docs.)*

## Reasoning

The evaluation deliberately privileged the **mode-friction, interruption, and stigma traps**
because those, not visual polish, are what the retention data blames for `az interactive` and AI
Shell. On those axes Cirrus is **structurally sound**: non-statefulness is enforced at the
component level (data-in via props, no mode state), the keyboard contract is opt-in and
released the instant context leaves `az`, and the copy is de-stigmatised. These are not cosmetic
choices — they are the direct antidotes to the documented failures, and the prototype
demonstrates them concretely in every relevant state.

The residual findings cluster in **perceptibility and consistency of the selection surface**
(T&T-1, T&T-2) — which is also where the accessibility audit concentrates — plus minor
**discoverability** gaps (T&T-3, T&T-4). None re-introduce a mode, a trap, or a blocking wait, so
none rise to High/Critical. The most important caveat is external to heuristics: the **≤ 100 ms /
≤ 500 ms performance tenet (P4) is asserted by design but mocked in the prototype** — it must be
proven live, because "making the user wait" is the one trap this evaluation *cannot* fully
clear from static demos.

## Next Steps

- Route **T&T-1 / T&T-2** with the accessibility audit's A11Y-1/-2/-3 as a single fix package to
  Prototyper + Designer (they share a root cause).
- Designer to decide **T&T-5** (flat vs nested enum grouping) and the **T&T-3** persistent-setting
  surface; update `wireframe-spec.md`/`component-specs.md` to match the shipped model.
- Validate the *no-wait* tenet (P4) against a live subscription — the one trap the mock can't
  clear (ties to the usability plan's out-of-scope performance note).
- Re-evaluate after fixes; expect **0 High/Critical and ≤ 2 Low** remaining, clearing the
  Tenets & Traps completion criterion for Handoff.
