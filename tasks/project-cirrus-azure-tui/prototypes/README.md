---
title: "Project Cirrus — Prototype"
phase: prototype
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Prototyper Agent"
related:
  - "designs/component-specs.md"
  - "designs/wireframe-spec.md"
  - "designs/tokens/tokens.css"
  - "designs/tokens/README.md"
  - "strategy/requirements-prd.md"
---

# Project Cirrus — Prototype

React + TypeScript + CSS Modules realization of the **inline, non-modal Azure CLI
intelligence layer**, plus **self-contained HTML demos** that run in a browser with no
build step. Everything is token-driven (colors/typography/spacing/motion consumed from
`designs/tokens/tokens.css`) — there are **zero hardcoded color or font literals** in the
components.

There is **no dedicated mode** (NG1) and the user is **never trapped** (NG2): `Esc` always
exits, `Enter` / `Ctrl+C` / `Ctrl+L` / tmux prefixes are never intercepted, and any non-`az`
command suppresses every surface.

---

## Quick start

### Demos (no build step — for stakeholders)

Open `prototypes/demos/index.html` directly in a browser, **or** serve the task folder so the
relative `tokens.css` link resolves cleanly:

```bash
# from repo root — serves the whole task so ../../designs/tokens/tokens.css resolves
cd tasks/project-cirrus-azure-tui
python3 -m http.server 8080
# then open http://localhost:8080/prototypes/demos/index.html
```

Each demo has a **theme switcher** (dark / light / high-contrast) and a **reduce-motion**
toggle. Keyboard: `↑↓` move · `Tab` accept · `Esc` exits · `Enter` is never hijacked.

### Components (React source)

The `src/` tree is authored as importable React + TS + CSS Modules and is Storybook-ready.
The prototype sandbox ships a `tsconfig.json` and type stubs so it type-checks standalone:

```bash
cd prototypes
npm install          # typescript + @types/react (see devDependencies)
npm run typecheck    # tsc --noEmit — passes clean, no `any`
npm run verify:demos # Playwright: renders every demo x 3 themes, asserts no console errors
```

To consume in a real app, import from `src/index.ts` and ensure `designs/tokens/tokens.css`
is loaded on an ancestor carrying `data-theme="dark|light|high-contrast"`.

---

## Component inventory

| Component | File | Maps to | States |
|-----------|------|---------|--------|
| `GhostTextCompletion` | `src/components/GhostTextCompletion/` | FR-1 (C1) | A |
| `ParameterPalette` | `src/components/ParameterPalette/` | FR-2 (C5/C6/C7) | B, F-1 |
| `ResourceLookupList` | `src/components/ResourceLookupList/` | FR-3 (C9/C10) | C, F-1 |
| `HintLine` | `src/components/HintLine/` | FR-4 (C13/C14) | D |
| `SuggestionItem` | `src/components/SuggestionItem/` | FR-2/FR-3 (shared row) | B, C, F-1 |
| `useCapability` (hook) | `src/hooks/useCapability.ts` | C17 cascade | rich → plain → suppressed |
| `OverlayHost` (composer) | `src/OverlayHost/` | composition + keyboard | all |

Each component folder contains `{Name}.tsx`, `{Name}.module.css`, and `{Name}.stories.tsx`
(Storybook, `tags: ['autodocs']`, one story per variant/state). Shared types live in
`src/types.ts`; the barrel export is `src/index.ts`.

**Architecture notes**
- Components are **pure/presentational** — all data (predictions, params, resources,
  freshness) arrives via props; no component owns persistent "mode" state (NG1).
- `useCapability()` resolves one render tier and passes it down so every component degrades
  in lockstep. It fails **down** to the plainer tier when the probe is uncertain (safe default).
- `OverlayHost` centralises the shared keyboard contract, so children expose intent callbacks
  only and can never trap the user. It anchors at most one of `ParameterPalette` /
  `ResourceLookupList` (mutually exclusive) plus optionally `HintLine` and the inline
  `GhostTextCompletion`, always **below** the caret line.

---

## Demo → wireframe state coverage

| Demo (`demos/`) | Wireframe state | What it shows |
|-----------------|-----------------|---------------|
| `index.html` | — | Landing page linking all demos + theme switcher |
| `ghost-text.html` | **A** (FR-1) | Inline greyed prediction, emphasised matched prefix, `Tab` accept, diverging keystroke clears, `aria-live` announce |
| `parameter-palette.html` | **B** (FR-2) | Non-modal listbox, required-first, `*`+text signalling (never color-alone), roving `aria-activedescendant`, `↑↓` wrap, filter, `Esc` exit |
| `resource-lookup.html` | **C** (FR-3) | Cached-first **loading → resolved** merge, plus **timeout / unauthenticated / empty** free-text fallbacks; `aria-busy` + live status |
| `hint-line.html` | **D** (FR-4) | Expert-neutral copy, `kbd` chips, focusable `✕ hide` button, persistent "Don't show hints", `Esc` dismiss |
| `passthrough.html` | **E** (FR-5) | Non-`az` token-0 → **all surfaces suppressed**, no keybindings held; pipes / `&&` pass through; composed `az … \| jq` suppresses past the pipe |
| `degraded-plain.html` | **F-1 / F-2** (FR-6) | Capability cascade: rich overlay → plain single-line advisory (no selection model) → silent no-op in CI |

Every demo is reachable in all three themes and honours reduce-motion.

---

## Accessibility & constraint checklist (honoured in the prototype)

- **ARIA listbox/option** pattern with roving `aria-activedescendant` — the command input keeps
  DOM focus, so palettes/lists are **popups, not focus traps** (NG2).
- **Never color-alone** — requirement (`*` + "required"), deprecation ("deprecated" tag),
  freshness (`● live` / `⚡ cached` glyph + text), and match highlight (underline + weight) all
  carry a non-color signal; every signal is folded into each row's `aria-label`.
- **Keyboard** — only opt-in keys (`Tab`, `↑↓`, `Esc`, `Ctrl+Space`) are handled and only while
  an overlay is open; `Enter` / `Ctrl+C` / `Ctrl+L` / tmux `Ctrl+B` always pass through.
- **Focus** — visible focus ring via `--color-focus-ring`; `HintLine` dismiss is a real
  `<button>`; ghost text is not focusable and is `aria-hidden` (announced via a polite
  companion so screen readers never read half-typed text as input).
- **Reduced motion** — all motion via `--motion-*`; the tokens' `prefers-reduced-motion` block
  zeroes durations, and demos expose a manual toggle to preview it.
- **Contrast** — components consume the semantic tokens verified ≥ 4.5:1 per theme; a
  high-contrast theme is included and screenshotted.

---

## Verification performed

- `npm run typecheck` — `tsc --noEmit` passes with **zero errors and no `any`**.
- CSS scan — **zero** hex/rgb color literals and **zero** font-size/family/weight literals in
  component styles; 59 unique design tokens consumed.
- `npm run verify:demos` — Playwright loads all 7 demos, confirms tokens resolve (non-transparent
  body background), asserts **no console/page errors**, and captures screenshots for
  dark / light / high-contrast into `tests/visual/screenshots/`.

---

## Fidelity notes for the Design Lead / Tester

1. **Demos are vanilla HTML/CSS/JS**, not the compiled React. They intentionally mirror the
   component CSS Modules using the *same* semantic tokens (`demos/cirrus-demo.css`) so a
   stakeholder can run them with no toolchain. The React source in `src/` is the handoff
   artifact for engineering; wiring it into a real Storybook/Vite app is the next step.
2. **The intelligence core is mocked.** Predictions, parameter lists, resource results, and the
   500 ms timeout are canned/simulated. Real latency behaviour (FR-7 p95 ≤ 100 ms inline;
   NFR-1 ≤ 500 ms lookup fallback) must be validated against a live subscription.
3. **Screen-reader pass still owed.** The non-modal `aria-activedescendant` pattern is
   implemented but should be verified with NVDA/VoiceOver to confirm no focus trap (NG2/NFR-2),
   as the specs request.
4. **Enum values as child rows.** Wireframe B nests enum values under the active flag; the
   prototype models flags and enum values as sibling groups in one flat listbox for a single
   coherent roving-selection model. Flag to the Designer if strict nested grouping is required.
5. **Capability probe inputs are injected** (`useCapability(CapabilityInput)`); the actual
   terminal capability detection (TTY, overlay support, AI-terminal) is out of scope for the
   visual prototype and is represented by the `degraded-plain.html` tier switcher.
