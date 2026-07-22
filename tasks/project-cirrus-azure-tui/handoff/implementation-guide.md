---
title: "Project Cirrus — Implementation Guide"
phase: deliver
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Handoff Agent"
related:
  - "handoff/components/OverlayHost.md"
  - "handoff/components/useCapability.md"
  - "handoff/components/GhostTextCompletion.md"
  - "handoff/components/ParameterPalette.md"
  - "handoff/components/ResourceLookupList.md"
  - "handoff/components/HintLine.md"
  - "handoff/components/SuggestionItem.md"
  - "handoff/design-engineering-changelog.md"
  - "designs/tokens/tokens.css"
  - "designs/wireframe-spec.md"
  - "designs/component-specs.md"
  - "tests/accessibility-audit.md"
  - "tests/tenets-traps-evaluation.md"
  - "strategy/requirements-prd.md"
---

# Project Cirrus — Implementation Guide

> Step-by-step guide for the engineering team implementing the inline, non-modal Azure CLI
> intelligence layer. Read this alongside the per-component API references in
> `handoff/components/` and the design rationale in `handoff/design-engineering-changelog.md`.
> The goal: build every component **without further design support**.

## Overview

Project Cirrus delivers Azure CLI intelligence — inline autocomplete, contextual
parameter/enum suggestions, live resource lookup, and expert-framed discoverability hints —
**directly in the user's shell, with no mode to enter or exit**. The delivered artifacts are
seven token-driven React + TypeScript + CSS Modules units:

| Unit | Kind | Maps to | File |
|------|------|---------|------|
| `GhostTextCompletion` | component | FR-1 | `src/components/GhostTextCompletion/` |
| `ParameterPalette` | component | FR-2 | `src/components/ParameterPalette/` |
| `ResourceLookupList` | component | FR-3 | `src/components/ResourceLookupList/` |
| `HintLine` | component | FR-4 | `src/components/HintLine/` |
| `SuggestionItem` | shared row | FR-2/FR-3 | `src/components/SuggestionItem/` |
| `useCapability` | hook | FR-6 (C17) | `src/hooks/useCapability.ts` |
| `OverlayHost` | composer | composition + keyboard | `src/OverlayHost/` |

Three non-negotiable constraints govern the whole build:

- **NG1 — no mode.** Components are pure/presentational; no component owns persistent "mode"
  state. Data arrives via props; there is nothing to enter or exit.
- **NG2 — never trap.** A single `Esc` always exits any overlay. Focus never leaves the command
  line into a trap. `Enter` / `Ctrl+C` / `Ctrl+L` / tmux prefixes are never intercepted.
- **FR-5 — non-az passthrough.** When token-0 is not `az`, every surface suppresses and Cirrus
  holds zero keybindings.

## 1. Prerequisites

- **Node.js** ≥ 18 (matches the React 18 peer requirement).
- **Package manager:** npm (the prototype ships `package-lock`-compatible `package.json`); yarn
  or pnpm are fine.
- **Peer dependencies:** `react >= 18`, `react-dom >= 18`.
- **Dev/build tooling:** TypeScript `5.4.x`, a bundler with **CSS Modules** support
  (Vite, Next.js, Webpack + `css-loader?modules`). The prototype type-checks with
  `@types/react ^18.2`.
- **No environment variables** are required by the presentational layer. The intelligence core
  you wire in (section 6) will need Azure auth context — but it reuses the CLI's **existing**
  authenticated/subscription context (AC-3.2, NFR-4); Cirrus persists no credentials.
- **Access:** the prototype source in `prototypes/src/` is the handoff artifact. Package it as
  `@your-scope/cirrus` or vendor it directly.

## 2. Install & wire the source

The prototype is authored as an importable barrel (`src/index.ts`). To consume it:

```bash
# from your app repo, after vendoring or publishing the prototype src/
npm install react react-dom
# (dev) type-check the vendored source
npm install -D typescript@5.4.5 @types/react@18.2.0
```

Import components and types from the barrel:

```tsx
import {
  OverlayHost,
  useCapability,
  GhostTextCompletion,
  ParameterPalette,
  ResourceLookupList,
  HintLine,
  SuggestionItem,
} from '@your-scope/cirrus';

import type {
  CapabilityInput,
  ParamGroup,
  ParamItem,
  ResourceItem,
  ResourceStatus,
} from '@your-scope/cirrus';
```

> In almost all cases you integrate at the **`OverlayHost`** level and never mount the leaf
> components directly — the host owns composition, the capability cascade, and the keyboard
> contract.

## 3. Apply the design tokens

Every component consumes **semantic CSS custom properties only** — there are zero colour/font
literals in the components. The tokens are the theming contract.

### 3.1 Import the token stylesheet once, high in the tree

```css
/* app root stylesheet */
@import 'path/to/designs/tokens/tokens.css';
```

`tokens.css` defines two layers: **primitives** (raw values) and **semantic role tokens**
(theme-aware aliases the components consume). Never reference primitives from app code — use the
semantic tokens.

### 3.2 Switch themes via `data-theme`

Set `data-theme` on any ancestor of the host. The components never branch on theme in JS.

```html
<div data-theme="dark">   <!-- or "light" | "high-contrast" -->
  <!-- OverlayHost mounts here -->
</div>
```

- `dark` — default terminal theme (also applied at `:root`).
- `light` — light terminal.
- `high-contrast` — honours OS/terminal high-contrast (NFR-2). Active-row background is
  `--color-primary-800` (the A11Y-2 fix) so the selected row clears ≥ 4.5:1.

Map this to the terminal/OS setting: read the shell/OS high-contrast + colour-scheme signal and
set `data-theme` accordingly.

### 3.3 Honour reduced motion

`tokens.css` ships a `@media (prefers-reduced-motion: reduce)` block that **zeroes all motion
tokens** (`--motion-duration-*` → `0ms`, transitions → `none`) and converts the resource
shimmer to a static track. You get this for free by importing the tokens — **do not** add
hardcoded `transition`/`animation` durations in app CSS that would bypass it.

## 4. The capability cascade (rich → plain → suppressed)

`useCapability(CapabilityInput)` resolves **one render tier** that the whole overlay honours in
lockstep. `OverlayHost` calls it internally — you supply the probe inputs via the `capability`
prop.

```tsx
const capability: CapabilityInput = {
  isInteractiveTty: process.stdout.isTTY === true, // false in CI/pipe ⇒ suppressed (F-2)
  supportsOverlays: terminalSupportsOverlays(),     // false ⇒ plain (F-1)
  isAzContext: tokens[0] === 'az',                  // false ⇒ suppressed (State E, FR-5)
  suggestionsEnabled: settings.cirrusHints,         // false ⇒ suppressed (AC-4.3)
  isAiTerminal: detectAiTerminal(),                 // true  ⇒ suppressed (AC-6.3)
};
```

Resolution order (hard suppression gates first, then rich vs plain):

```
!isAzContext        → suppressed   (non-az passthrough — FR-5)
!isInteractiveTty   → suppressed   (CI / piped / no-TTY — F-2)
isAiTerminal        → suppressed   (compose, don't compete — AC-6.3)
!suggestionsEnabled → suppressed   (user-disabled — AC-4.3)
supportsOverlays ? rich : plain    (A–D vs F-1)
```

**Fail-down rule:** when a probe is uncertain, choose the **plainer** tier. A wrong `rich`
guess can break a constrained surface or a script; a wrong `plain`/`suppressed` guess only
under-delivers. Treat unknown TTY as non-interactive.

- **suppressed** ⇒ `OverlayHost` renders only the command line and **holds no keybindings**.
- **plain** ⇒ children render single-line advisory text (no selection model, no inline ghost).
- **rich** ⇒ full inline UI.

## 5. The centralised keyboard contract

`OverlayHost` is the **single** key handler (one `onKeyDown` on the focusable combobox).
Children expose intent callbacks only — never bind keys inside a child.

| Key | When | Behaviour |
|-----|------|-----------|
| `Enter` | always | Pass through — submits the line |
| `Ctrl+C` / `Ctrl+L` | always | Pass through |
| `Ctrl+B` (tmux) | always | Pass through |
| any printable key | always | Pass through; overlay re-filters upstream |
| `Ctrl+Space` | overlay closed | Peek — force-open the palette |
| `Tab` | closed + ghost present | Accept ghost (`onAcceptGhost`) |
| `Esc` | overlay open | Close to plain typing (single `Esc`; second passes to shell) |
| `↑` / `↓` | overlay open | Move `activeIndex` (wraps) |
| `Tab` | overlay open | Accept active row, close |

Only `Tab`, `↑`, `↓`, `Esc`, `Ctrl+Space` are ever `preventDefault`-ed, and only when relevant.

## 6. Wiring the (mocked) intelligence core to a real Azure source

The prototype's predictions, parameter lists, resource results, and the ≤ 500 ms timeout are
**mocked**. You replace the mock with a real, cached-first, non-blocking data source and feed
the results into `OverlayHost` props each keystroke.

### 6.1 Keep the keystroke path non-blocking (FR-7 / NFR-1)

- Never `await` intelligence on the keystroke path. Render the command line immediately; let
  `ghostSuggestion` / `paletteGroups` / `resourceItems` arrive asynchronously and re-render.
- **Cached/local computation** (command paths, static enums, cached resources) must return
  within **p95 ≤ 100 ms** (FR-7 AC-7.2).
- **Network-backed lookups** (FR-3) are async and **time-boxed to ≤ 500 ms**; on timeout set
  `resourceStatus="timeout"` and fall back to cached rows + free text (AC-3.3, NFR-1). Never
  hang or block.

### 6.2 Suggested data flow

```tsx
function CirrusShellLine({ command, tokens }: { command: string; tokens: string[] }) {
  const capability = useProbe(tokens);                 // section 4
  const ghost = useGhost(command);                      // cached, ≤100ms p95
  const palette = usePalette(tokens);                   // command-context params/enums
  const resources = useResourceLookup(tokens);          // async, ≤500ms time-box

  return (
    <OverlayHost
      command={command}
      capability={capability}
      ghostSuggestion={ghost.suggestion}
      ghostMatchedPrefix={ghost.matchedPrefix}
      activeOverlay={palette.open ? 'palette' : resources.open ? 'resource' : 'none'}
      paletteContext={palette.context}
      paletteFreshness={palette.freshness}
      paletteGroups={palette.groups}
      resourceType={resources.type}
      subscriptionLabel={resources.subscription}
      resourceStatus={resources.status}
      resourceItems={resources.items}
      hint={palette.hint}
      onAcceptGhost={commitToLine}
      onSelectParam={(i) => insertAtCaret(i.label)}
      onSelectResource={(r) => insertAtCaret(r.name)}
    />
  );
}
```

### 6.3 Resource lookup: reuse existing auth (NFR-4)

Resource lookups must use the CLI's **existing** authenticated/subscription context — no
separate login, no persisted credentials, no command content sent beyond the Azure APIs the CLI
already calls. Map real states onto `ResourceStatus`: `loading → resolved | timeout |
unauthenticated | empty`. Cached rows stay usable while live results stream in.

### 6.4 Bounded values only (FR-2 / AC-2.2)

For parameters with a bounded value set, only offer **valid** values — never surface an invalid
enum. Mark deprecated values with `status: 'deprecated'` (they stay in the list with a label,
not hidden), preserving the never-colour-alone contract.

## 7. Do / Don't patterns

### NG1 — no mode

- ✅ **Do** keep all components presentational; pass data in via props each keystroke.
- ❌ **Don't** introduce a persistent "Cirrus mode" state object, a launch/exit command, or any
  gate the user must pass to get Azure functionality. This is the exact failure of `az
  interactive` (~0.1% adoption).

### NG2 — no trap

- ✅ **Do** route every overlay's exit through a single `Esc` handled by `OverlayHost`.
- ✅ **Do** keep DOM focus on the one combobox; overlays are popups (`aria-activedescendant`),
  never focus traps.
- ❌ **Don't** add `tabIndex` to `SuggestionItem` rows or focus an overlay — it breaks the
  non-modal roving-selection pattern and can trap keyboard users.

### FR-5 — non-az passthrough

- ✅ **Do** gate `isAzContext` on token-0 === `az` (and suppress past a pipe/`&&` to a non-az
  command).
- ❌ **Don't** hold keybindings while suppressed. `kubectl`, `git`, `aws`, `gcloud`, `pwsh` must
  run natively with zero prefix/wrapper/exit step (contrast the `#`-prefix workaround).

### NG5 — expert-neutral copy

- ✅ **Do** keep hint copy factual: `"3 required flags remain"`.
- ❌ **Don't** use onboarding/"beginner" framing anywhere in copy or positioning.

## 8. Design-token customisation

Theme by **overriding semantic tokens**, never by editing component CSS. Example — a corporate
accent for the active row:

```css
[data-theme="dark"] .my-terminal {
  --color-suggestion-active-bg: #123a6b;   /* verify ≥ 4.5:1 with active-text per theme */
  --color-suggestion-active-text: #ffffff;
}
```

Rules:
- Any override to `--color-suggestion-active-*` **must** be re-verified ≥ 4.5:1 against the
  selected-row children (the A11Y-1/-2 contract).
- Don't hardcode motion durations; override `--motion-duration-*` instead so reduced-motion
  still zeroes them.
- Keep the never-colour-alone glyphs/words even if you recolour.

## 9. Troubleshooting / common pitfalls

### Problem: Components render unstyled / wrong colours
**Symptom:** everything is default black-on-white, or `var(--color-…)` resolves to nothing.
**Cause:** `tokens.css` not imported, or no `data-theme` on an ancestor.
**Fix:** `@import` `designs/tokens/tokens.css` at the app root and set `data-theme="dark"` (or
light/high-contrast) on an ancestor of `OverlayHost`.

### Problem: CSS Module class names come through as `undefined`
**Symptom:** `styles.row` is `undefined`; rows unstyled.
**Cause:** bundler not configured for CSS Modules on `*.module.css`.
**Fix:** enable CSS Modules (Vite: built-in for `*.module.css`; Webpack: `css-loader` with
`modules: true`).

### Problem: `Enter` doesn't submit / `Ctrl+C` doesn't interrupt
**Symptom:** the shell stops responding to control keys while an overlay is open.
**Cause:** a child bound keys, or the pass-through branch in `OverlayHost.onKeyDown` was
removed.
**Fix:** ensure **only** `OverlayHost` handles keys and its early-return pass-through for
`Enter`/`Ctrl+C`/`Ctrl+L`/tmux is intact. Never bind keys in a child.

### Problem: Screen reader doesn't announce the active option while arrowing
**Symptom:** `↑↓` moves the highlight but NVDA/VoiceOver is silent.
**Cause:** `aria-activedescendant` and DOM focus are on different elements (the pre-fix A11Y-3
bug).
**Fix:** keep `role="combobox"`, `tabIndex=0`, the `aria-label`, and `aria-activedescendant`
all on the **same** focusable command span (as `OverlayHost` ships it). Verify with a live SR
pass (still-owed open item).

### Problem: Rich UI appears in CI / piped output and corrupts a script
**Symptom:** overlay markup or ANSI noise in non-interactive output.
**Cause:** `isInteractiveTty` reported `true` (or unknown) in a non-TTY context.
**Fix:** treat unknown/absent TTY as `false` (fail down). Suppressed tier must emit nothing to
stdout and no exit-code contamination (AC-6.2).

### Problem: Selected row is hard to read (contrast)
**Symptom:** the highlighted row's badges/type-hint look washed out.
**Cause:** a token override, or reverting the A11Y-1 selected-child recolour.
**Fix:** keep `.selected .{typeHint,secondary,requiredGlyph,badge-*} { color:
var(--color-suggestion-active-text); }` and re-verify any active-token override per theme.

### Problem: Lookup hangs the input
**Symptom:** typing stalls during a resource lookup.
**Cause:** the lookup is on the keystroke path / not time-boxed.
**Fix:** make lookups async and time-boxed to ≤ 500 ms; render cached rows immediately; on
timeout set `status="timeout"` and fall back to free text.

### Problem: Motion still animates under reduced-motion
**Symptom:** fades/shimmer persist when the user prefers reduced motion.
**Cause:** hardcoded `transition`/`animation` in app CSS bypassing the tokens.
**Fix:** drive all motion through `--motion-*` tokens; remove literal durations.

## 10. Testing guide (verify the implementation)

- **Type check:** `tsc --noEmit` must pass with **no `any`** (the prototype does).
- **Token literal scan:** component CSS must contain **zero** hex/rgb colour and font
  literals — every visual value is a `var(--…)`. (Prototype: 59 unique tokens, 0 literals.)
- **Accessibility (axe-core):** run `axe-core` (wcag2a, wcag2aa, wcag21a, wcag21aa) against each
  state × 3 themes. **Expected result: 0 Serious / 0 Critical / 0 Level A** — this is the
  re-verified baseline across the 6 demos × 3 themes after the A11Y-1/-2/-3 fixes.
- **Keyboard/trap check:** confirm `Esc` exits every overlay, `Enter`/`Ctrl+C` always pass
  through, and focus never traps (NG2).
- **Visual check:** compare each state against the reference demo in `prototypes/demos/`
  (`ghost-text`, `parameter-palette`, `resource-lookup`, `hint-line`, `passthrough`,
  `degraded-plain`) and the screenshots in `prototypes/tests/visual/screenshots/`.
- **Still-owed validation (see checklist):** live **NVDA/VoiceOver** pass on the non-modal
  listbox, and **real-subscription performance** validation of FR-7 (p95 ≤ 100 ms inline,
  ≤ 500 ms lookups). These are mocked in the prototype and must be proven live.

## Next Steps

1. Package `prototypes/src/` as a versioned component library and stand up Storybook/Vite using
   the shipped `*.stories.tsx`.
2. Implement the intelligence-core adapters (section 6) behind the `OverlayHost` prop surface,
   preserving the non-blocking budget.
3. Run the axe sweep in CI and gate on 0 Serious/0 Critical/0 Level A.
4. Schedule the two owed validations: live NVDA/VoiceOver SR pass and real-subscription
   performance benchmarking.
5. Confirm the T&T-5 grouping decision (flat vs nested enum) and the T&T-3 persistent hint
   setting surface with the Designer before GA.
