---
title: "Project Cirrus — Wireframe Specification"
phase: design
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Designer Agent"
related:
  - "designs/component-specs.md"
  - "designs/tokens/README.md"
  - "designs/tokens/tokens.css"
  - "ideation/decision-log.md"
  - "strategy/requirements-prd.md"
  - "strategy/personas.md"
---

# Project Cirrus — Wireframe Specification

Screen/state wireframes for the inline, non-modal Azure CLI intelligence layer. Every state
is drawn **in place** on the user's existing shell line — there is no full-screen "app," no
container to enter or exit (NG1, NG2). All overlays render *below* the active command line,
never covering it, and every state is dismissible without trapping the user (NG2). These are
ASCII wireframes; visual fidelity comes from the tokens and component specs.

## Overview

Six key states are specified:

- **A.** Inline ghost-text completion (FR-1)
- **B.** Parameter palette open (FR-2)
- **C.** Resource-lookup loading + results (FR-3, NFR-1)
- **D.** Dismissible expert hint line (FR-4)
- **E.** Non-az command passthrough — suggestions fully suppressed (FR-5)
- **F.** Degraded / low-capability environment rendering (FR-6)

**Shared anchor model.** The prompt line is the anchor. Overlays are absolutely positioned
directly under the caret's line, width-clamped to the terminal viewport. The command line
always remains the top-most, fully-typed, editable region. Nothing Cirrus renders ever
intercepts `Enter`, `Ctrl+C`, `Ctrl+L`, tmux prefixes, or pipes (FR-5, NFR-3).

**Shared keyboard contract (applies to all interactive states):**

| Key | Behaviour |
|-----|-----------|
| `Tab` / `→` (at EOL) | Accept the primary ghost/selected suggestion |
| `↓` / `↑` | Move selection within an open palette/list (never moves shell history while open; `Esc` first to restore history) |
| `Enter` | Runs the command as typed — **never** hijacked; if a palette row is selected, Enter still submits the line unless the surface explicitly opted into "Enter accepts" (default: off, per Maya) |
| `Esc` | Dismiss the current overlay; returns to plain typing; a second `Esc` is a no-op passed to the shell |
| `Ctrl+Space` | On-demand peek: force-open suggestions for the current token |
| Any printable key | Continues normal typing; overlay re-filters, never blocks the keystroke (FR-7 AC-7.1) |

---

## State A — Inline Ghost-Text Completion (FR-1)

The lowest-emphasis surface: a single greyed prediction rendered *after* the caret on the
same line. Ignorable by default (Maya/R3).

```
┌ terminal viewport ─────────────────────────────────────────────┐
│                                                                 │
│ $ az storage account cre▉ate --name mydata                      │
│                        └caret  └──────── ghost text ────────┘   │
│                                                                 │
│  ⌁ Tab to accept · Esc to dismiss                    (hint line)│
└─────────────────────────────────────────────────────────────────┘
```

- **Layout regions:** (1) prompt + typed command (`--color-text-command`); (2) ghost text
  inline continuation (`--color-ghost-text`, matched segment `--color-ghost-text-emphasis`);
  (3) optional one-line hint (State D) below.
- **Content hierarchy:** typed command is highest contrast; ghost text is recessive but
  ≥ 4.5:1; hint line quietest.
- **Component placement:** `GhostTextCompletion` renders as an inline span sharing the
  command line's baseline and monospace metrics — it must not shift the caret or reflow.
- **Interaction notes:** appears only for recognised `az` context after a short idle/debounce;
  fades in via `--motion-transition-fade` (90ms). `Tab`/`→`-at-EOL accepts and moves caret to
  end of accepted text.
- **Keyboard:** per shared contract. Typing a character that diverges from the ghost text
  immediately clears or re-predicts it — never commits stale text.
- **Edge cases / errors:**
  - *No confident prediction* → render nothing (silent no-op).
  - *Prediction still computing at keystroke* → show nothing yet; never block (FR-7).
  - *Ghost text longer than remaining viewport width* → truncate with `…`; full form appears
    in State B palette.
  - *Multi-cloud line* (e.g. user pivots to `aws`) → ghost text disappears instantly (State E).

---

## State B — Parameter Palette Open (FR-2)

A non-modal popover listing valid parameters/flags and (when a value position is reached)
valid enum values for the recognised command. Anchored under the current token.

```
┌ terminal viewport ─────────────────────────────────────────────┐
│ $ az servicebus namespace create --sku ▉                        │
│                                                                 │
│ ┌─ parameters · az servicebus namespace create ──── cached ⚡ ┐ │
│ │  --sku            <enum>   Pricing tier         required *  │ │
│ │ ▸Basic            valid                          ← selected │ │
│ │  Standard         valid                                     │ │
│ │  Premium          valid                                     │ │
│ │  ─────────────────────────────────────────────────────     │ │
│ │  --location       <string> Azure region         required * │ │
│ │  --resource-group <lookup> Existing RG          required * │ │
│ │  --tags           <string> Key=value pairs      optional   │ │
│ └── ↑↓ move · Tab accept · Esc dismiss · Ctrl+Space peek ───── ┘ │
└─────────────────────────────────────────────────────────────────┘
```

- **Layout regions:** (1) header (command context + freshness badge `cached ⚡` / `live ●`);
  (2) scrollable rows of `SuggestionItem`; (3) footer key legend.
- **Content hierarchy:** flag name (`--color-param-flag`, medium weight) > value/type token
  (`--color-param-type` / `--color-param-value`) > description (`--color-text-secondary`) >
  required/optional tag (`--color-param-required` with `*` glyph / `--color-param-optional`).
- **Component placement:** `ParameterPalette` wraps N `SuggestionItem`s; enum values (C6) are
  child rows under the active flag, marked `valid` (`--color-enum-valid`) or `deprecated`
  (`--color-enum-deprecated` + text tag).
- **Interaction notes:** opens on `Ctrl+Space` or when caret enters an argument position;
  `--motion-transition-popover` (150ms). Required params surface first (required-param
  checklist principle, C7). Never color-alone: required = red text **and** `*` **and** the
  word context; deprecated = amber **and** "deprecated" tag.
- **Keyboard:** `↑↓` moves selection (wraps), `Tab` inserts the selected flag/value at the
  caret, `Esc` closes and returns to plain typing. `Enter` still submits the line (default).
- **Edge cases / errors:**
  - *No valid values known* → show the flag with `<free text>` type and a muted "no bounded
    values" note; user types freely (AC-2.2 respected — never suggest invalid).
  - *Very long list* → virtualised scroll, max height ≈ 8 rows; `--color-resource-meta`
    "n more…" footer.
  - *Invalid current value typed* → the palette does not error; validation lives in State D.

---

## State C — Resource-Lookup Loading + Results (FR-3, NFR-1)

For resource-identifying params (`--resource-group`, resource names), Cirrus does an async,
cached-first lookup against the live subscription. Two sub-states: **loading** and **results**.

### C-1 Loading (cache miss, network in flight)

```
┌ terminal viewport ─────────────────────────────────────────────┐
│ $ az servicebus namespace create --resource-group ▉             │
│                                                                 │
│ ┌─ resource groups · sub: contoso-prod ───────── looking up… ┐  │
│ │  ▚▚▚▚▚▚▚  loading live resources (≤ 500 ms)                 │  │
│ │  ▸ rg-shared-eastus        (cached)          ← usable now   │  │
│ │    rg-staging-westus2      (cached)                         │  │
│ │  … refreshing from subscription                            │  │
│ └── Esc to dismiss · type to filter · Tab accept ──────────── ┘  │
└─────────────────────────────────────────────────────────────────┘
```

### C-2 Results (resolved / merged live + cached)

```
┌ terminal viewport ─────────────────────────────────────────────┐
│ $ az servicebus namespace create --resource-group rg-st▉        │
│                                                                 │
│ ┌─ resource groups · sub: contoso-prod ─────────────── live ● ┐ │
│ │ ▸ rg-staging-westus2      westus2      ● live   ← selected  │ │
│ │   rg-staging-eastus       eastus       ⚡ cached           │ │
│ │   (2 of 7 match "rg-st")                                   │ │
│ └── ↑↓ move · Tab accept · Esc free text ──────────────────── ┘ │
└─────────────────────────────────────────────────────────────────┘
```

- **Layout regions:** (1) header (resource type + subscription context + freshness state);
  (2) rows via `ResourceLookupList` → `SuggestionItem`, each with name
  (`--color-resource-name`), region/meta (`--color-resource-meta`), and a freshness badge
  (`live ●` `--color-resource-live` / `cached ⚡` `--color-resource-cached`); (3) footer.
- **Content hierarchy:** cached results render **immediately** (cached-first, C10) and are
  fully selectable while the live refresh streams in — the user is never blocked waiting.
- **Interaction notes:** loading shimmer uses `--color-resource-loading` on
  `--color-resource-loading-track`, animated on `--motion-duration-slow`; under
  reduced-motion it becomes a static "loading…" text (no shimmer). Live results merge in
  without stealing the current selection.
- **Keyboard:** typing filters live; `Tab` accepts selected resource; `Esc` collapses to
  free-text entry (AC-3.3).
- **Edge cases / errors:**
  - *Timeout > 500 ms* → stop spinner, keep cached rows, append muted note
    "showing cached · live lookup timed out — type any value" (`--color-validation-fallback-text`).
    Never blocks or errors (NFR-1).
  - *Unauthenticated / offline* → no list; single muted row "sign-in context unavailable —
    free text" (AC-3.3). No modal, no prompt to log in.
  - *Empty subscription* → "no resource groups found — type a new name."
  - *Large result set* → virtualised; filter narrows; "n of m match" counter.

---

## State D — Dismissible Expert Hint Line (FR-4)

A single, quiet, expert-framed line beneath the command. Additive discoverability with a
persistent disable setting — never "beginner mode" copy (T4, NG5).

```
┌ terminal viewport ─────────────────────────────────────────────┐
│ $ az aks nodepool add ▉                                         │
│                                                                 │
│  ⌁ 3 required flags remain · Ctrl+Space to review    ✕ hide    │
│    └accent glyph  └──────── neutral copy ─────────┘  └dismiss   │
└─────────────────────────────────────────────────────────────────┘
```

- **Layout regions:** (1) leading accent glyph (`--color-hint-line-accent`); (2) neutral
  hint copy (`--color-hint-line-text`) with inline `kbd` chips
  (`--color-hint-line-key-bg` / `-text`); (3) trailing dismiss affordance
  (`✕ hide`, `--color-hint-line-dismiss`).
- **Content hierarchy:** deliberately the quietest surface on screen; must not compete with
  the command line. Font uses `--font-family-ui`, `--font-size-xs`, `--line-height-relaxed`.
- **Component placement:** `HintLine` occupies one row directly below the command / above any
  palette. Only one hint shown at a time.
- **Interaction notes:** copy is expert-neutral ("3 required flags remain", "42 SKUs
  available — Ctrl+Space") — never "Tip for beginners." `✕ hide` dismisses this instance;
  a secondary "don't show hints" affordance (in settings / long-press menu) sets the
  persistent disable (AC-4.3). Appears/hides via `--motion-transition-fade`.
- **Keyboard:** `Esc` dismisses the hint line just like any overlay; the referenced shortcut
  (e.g. `Ctrl+Space`) opens the relevant palette. Dismiss target is keyboard-focusable with a
  visible `--color-focus-ring`.
- **Edge cases / errors:**
  - *Hints disabled by setting* → never renders (AC-4.3).
  - *Nothing useful to say* → render nothing (no empty/nagging hint).
  - *Narrow viewport* → truncate copy with `…`, keep the shortcut and dismiss visible.

---

## State E — Non-az Command Passthrough (FR-5)

The interoperability guarantee, drawn as a state: the instant the command is not `az`, every
Cirrus surface is suppressed. This is Maya's gate.

```
┌ terminal viewport ─────────────────────────────────────────────┐
│ $ kubectl get pods -n staging | grep Running ▉                  │
│                                                                 │
│      (no ghost text · no palette · no hint · nothing rendered)  │
│                                                                 │
│ $ az … ▉   ← the moment the token is `az` again, surfaces return │
└─────────────────────────────────────────────────────────────────┘
```

- **Layout regions:** command line only. **Zero** Cirrus regions render.
- **Content hierarchy:** N/A — Cirrus contributes nothing.
- **Interaction notes:** detection is token-0 based; `kubectl`, `pwsh`, `git`, `aws`,
  `gcloud`, and anything non-`az` → full suppression with no prefix/wrapper/exit step
  (AC-5.1). Pipes, redirects, `&&`, subshells, and tmux prefixes pass through untouched
  (AC-5.2, AC-5.3).
- **Keyboard:** the shared contract is fully released — Cirrus holds no keybindings while
  suppressed; `Tab` reverts to the shell's native completion.
- **Edge cases / errors:**
  - *Composed line `az … | jq …`* → suggestions apply only while editing the `az` segment;
    once caret is past the pipe, surfaces suppress.
  - *Alias resolving to az* → out of scope for v1 visual spec; degrade to State E (safe).
  - *`# az …` legacy prefix* → treated as comment/non-az → suppressed (we removed the need
    for the `#` workaround, not re-added it).

---

## State F — Degraded / Low-Capability Environment (FR-6)

The capability-detecting rendering layer (C17) steps down from rich overlays to plain,
single-line, non-interactive hints — or to silent no-op in non-interactive CI.

### F-1 Constrained TTY (limited terminal, minimal remote)

```
┌ constrained terminal ──────────────────────────────────────────┐
│ $ az storage account create --sku ▉                             │
│ cirrus: valid --sku values: Standard_LRS, Standard_GRS,         │
│         Premium_LRS  (type value; Tab completion unavailable)   │
│ $                                                               │
└─────────────────────────────────────────────────────────────────┘
```

### F-2 Non-interactive (CI/CD, piped, no TTY)

```
# CI/CD job log
$ az storage account create --sku Standard_LRS --name ci123 ...
# (cirrus emits nothing — silent no-op; script output unchanged)
```

- **Layout regions:** F-1 → a single plain-text advisory line printed below the input, no
  popover, no color dependency (works on 4-color/no-color terminals). F-2 → nothing.
- **Content hierarchy:** plain text only; if color is available it uses semantic tokens, but
  meaning never depends on it (AC-6.2, NFR-2 "never color-alone").
- **Component placement:** components render in a "plain" variant — `SuggestionItem` collapses
  to comma-joined text; `ParameterPalette`/`ResourceLookupList` collapse to a single line;
  overlays and elevation are dropped.
- **Interaction notes:** in F-1 there is no selection model (arrow keys do nothing special) —
  guidance is read-only text so nothing can trap the user (NG2). In F-2 Cirrus is a strict
  no-op: no stdout/stderr contamination, no exit-code change, scripts unaffected (AC-6.2).
- **Keyboard:** F-1 releases all Cirrus keybindings (advisory only). F-2 has no interactive
  layer at all.
- **Edge cases / errors:**
  - *Capability probe uncertain* → fail **down** to the plainer tier (safe default).
  - *AI-terminal surface* → Cirrus does not render UI; it exposes first-party Azure context to
    the AI terminal instead (AC-6.3) — no rival overlay drawn (Priya / NG2). Visually this is
    State E from the user's perspective (nothing Cirrus-drawn on the line).
  - *No-color terminal* → tokens still resolve, but layout/meaning must hold in monochrome.

---

## Cross-State Rules (apply everywhere)

- **Never cover the command line.** All overlays render below the caret line and are clipped
  to the viewport; the typed command is always fully visible and editable.
- **Never trap.** Every interactive state exits on a single `Esc` back to plain typing; a
  second `Esc`/`Ctrl+C` passes straight to the shell (NG2, NFR-3).
- **Never block the keystroke.** Any state may be mid-computation; typing and `Enter` always
  proceed on the already-typed text (FR-7).
- **One overlay at a time.** Ghost text (A) may coexist with the hint line (D); the palette
  (B) and resource list (C) are mutually exclusive and supersede the hint line.
- **Freshness is always labelled.** `cached ⚡` vs `live ●` shown as text badge + color, never
  color alone.

## Next Steps

- Prototyper: build each component (see `component-specs.md`) with a `variant` prop covering
  `rich` (States A–D) and `plain` (State F-1); wire capability detection to select the variant.
- Validate State C latency behaviour against the ≤ 500 ms fallback in a real subscription.
- Usability-test State D copy with expert users (Maya/David) to confirm no beginner-stigma read.
- Confirm State E suppression across tmux + composed pipelines before GA (Maya's gate).
