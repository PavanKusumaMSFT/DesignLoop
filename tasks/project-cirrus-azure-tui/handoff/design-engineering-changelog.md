---
title: "Project Cirrus — Design-Engineering Changelog"
phase: deliver
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Handoff Agent"
related:
  - "handoff/implementation-guide.md"
  - "handoff/components/OverlayHost.md"
  - "ideation/decision-log.md"
  - "designs/wireframe-spec.md"
  - "designs/component-specs.md"
  - "designs/tokens/tokens.css"
  - "tests/accessibility-audit.md"
  - "tests/tenets-traps-evaluation.md"
  - "strategy/requirements-prd.md"
---

# Project Cirrus — Design-Engineering Changelog

> The authoritative history of every key design decision across Discover → Test, why it was
> made, the constraint (and telemetry) behind it, and what it means for the build. Read this
> before "simplifying" anything: several decisions are counter-intuitive by design and exist to
> avoid the exact failures that sank `az interactive` and AI Shell. Cited telemetry throughout:
> **`az interactive` ~0.1% adoption / ~14% 90-day retention · AI Shell ~6% monthly retention ·
> Azure Copilot ~20% retention (the benchmark to beat) · multi-cloud 68.9% · avg 1.86
> environment contexts · AI-terminal-emergent 13.1%.**

## Summary Table

| Date | ID | Title | Type | Affected | Status |
|------|----|-------|------|----------|--------|
| 2026-07-13 | DEC-1 | No mode — inline, non-modal only | Constrained | Whole system | Implemented |
| 2026-07-13 | DEC-2 | Non-az passthrough / total suppression | Constrained | `useCapability`, `OverlayHost` | Implemented |
| 2026-07-13 | DEC-3 | Centralised keyboard contract in the host | New | `OverlayHost` | Implemented |
| 2026-07-13 | DEC-4 | Capability cascade fails DOWN | New | `useCapability` | Implemented |
| 2026-07-13 | DEC-5 | Ghost text as ghost-text (not dropdown) | Revised | `GhostTextCompletion` | Implemented |
| 2026-07-13 | DEC-6 | Cached-first, non-blocking, ≤ 500 ms lookups | Constrained | `ResourceLookupList` | Implemented (mocked) |
| 2026-07-13 | DEC-7 | Expert-neutral, dismissible hint copy | Constrained | `HintLine` | Implemented |
| 2026-07-13 | DEC-8 | Never colour-alone signalling | Constrained | `SuggestionItem` + all | Implemented |
| 2026-07-13 | DEC-9 | Flat roving listbox (enum values as siblings) | Revised | `ParameterPalette` | Implemented (Designer confirm owed) |
| 2026-07-13 | DEC-10 | A11Y-1 — recolour all selected-row children | Revised | `SuggestionItem` | Implemented + re-verified |
| 2026-07-13 | DEC-11 | A11Y-2 — darken high-contrast active-bg token | Revised | `tokens.css` | Implemented + re-verified |
| 2026-07-13 | DEC-12 | A11Y-3 — single focusable named combobox | Revised | `OverlayHost` | Implemented + re-verified |
| 2026-07-13 | DEC-13 | AI-terminal = compose, don't compete | Constrained | `useCapability` (Phase 2) | Deferred (Phase 2) |

---

## [2026-07-13] DEC-1 — No mode: inline, non-modal only

**Change Type:** Constrained · **Affected:** whole system · **Design Owner:** Ideator/Designer ·
**Engineering Contact:** Feature lead

### What Changed
The product is an **additive inline layer**, not a dedicated Azure TUI. There is no container to
enter/exit and no gating of Azure functionality behind a mode (NG1). Components are
pure/presentational and own no persistent "mode" state.

### Why
`az interactive` reached only **~0.1% adoption / ~14% 90-day retention** and AI Shell fell to
**~6% monthly retention**; 2025 concept evals called modal containers "unnatural,"
"heavyweight," "two programs." The container — not the intelligence — was rejected. The scoreboard
is retention, and the target is to **beat the ~20% Azure Copilot benchmark** (> 25% sustained).

### What It Means for Engineering
- All state is data-in via props each keystroke; no mode object, no launch/exit command.
- The command line is always the top-most editable region; overlays render **below** it.

### What Not to Change
- Do not introduce any persistent Cirrus state the user must enter/exit. That single change
  reintroduces the failure this whole project exists to avoid.

### Linked Artifacts
- `ideation/decision-log.md` (chosen direction); PRD NG1; `designs/wireframe-spec.md`.

---

## [2026-07-13] DEC-2 — Non-az passthrough / total suppression

**Change Type:** Constrained · **Affected:** `useCapability`, `OverlayHost` · **Design Owner:**
Designer · **Engineering Contact:** Feature lead

### What Changed
When token-0 is not `az`, **every** Cirrus surface suppresses and the layer holds **zero**
keybindings. Non-az commands (`kubectl`, `git`, `aws`, `gcloud`, `pwsh`) run natively with no
prefix, wrapper, or exit step. Suppression also applies past a pipe to a non-az command.

### Why
Interoperability was the core lesson (FR-5, HMW-2): the `#`-prefix workaround was friction that
drove churn; **multi-cloud usage is 68.9%** and users average **1.86 environment contexts**, so
the tool must never interfere with the rest of the toolchain.

### What It Means for Engineering
- `isAzContext` gates the entire cascade to `suppressed` first (before any render).
- Suppressed = command line only, no stdout contamination, no held keys.

### What Not to Change
- Do not keep any keybinding active while suppressed. Do not add a prefix/wrapper to reach az
  intelligence.

### Linked Artifacts
- PRD FR-5, NG3; `tests/tenets-traps-evaluation.md` P1; `demos/passthrough.html`.

---

## [2026-07-13] DEC-3 — Centralised keyboard contract in the host

**Change Type:** New · **Affected:** `OverlayHost` · **Design Owner:** Designer ·
**Engineering Contact:** Feature lead

### What Changed
All keyboard handling lives in **one** `onKeyDown` on the `OverlayHost` combobox. Children
expose intent callbacks only. Only `Tab`, `↑`, `↓`, `Esc`, `Ctrl+Space` are ever handled — and
only while relevant. `Enter` / `Ctrl+C` / `Ctrl+L` / tmux `Ctrl+B` / printable keys always pass
through.

### Why
Modes that hijacked keys (F1/F3, `Ctrl+C`-clears) were a documented anti-pattern (NG3). A single
handler guarantees children can never trap the user (NG2) and the contract is auditable in one
place.

### What It Means for Engineering
- Never bind keys inside a child component.
- Preserve the early-return pass-through branch for shell/tmux keys exactly.

### What Not to Change
- Do not expand the intercepted-key set. Do not move key handling into a child.

### Linked Artifacts
- `designs/wireframe-spec.md` (shared keyboard contract); PRD NFR-3; `handoff/components/OverlayHost.md`.

---

## [2026-07-13] DEC-4 — Capability cascade fails DOWN

**Change Type:** New · **Affected:** `useCapability` · **Design Owner:** Designer ·
**Engineering Contact:** Platform/adapters

### What Changed
`useCapability` resolves one tier — `rich → plain → suppressed` — for the whole overlay, and when
a probe is **uncertain it chooses the plainer tier** (safe default). Unknown TTY is treated as
non-interactive.

### Why
Portability is where prior efforts failed to reach (avg **1.86 contexts**; IDE, Cloud Shell,
CI/CD, remote, AI terminals). A wrong `rich` guess can break a constrained surface or a script
(AC-6.2); a wrong plain/suppressed guess only under-delivers — so the asymmetry is deliberately
biased toward safety.

### What It Means for Engineering
- Compute one `CapabilityResult` at the host; pass the derived `variant` down. Never let leaves
  probe independently.

### What Not to Change
- Do not render `rich` speculatively on an unknown surface. Do not let a child upgrade its own
  tier.

### Linked Artifacts
- `ideation/decision-log.md` (C17); PRD FR-6; `handoff/components/useCapability.md`.

---

## [2026-07-13] DEC-5 — Ghost text (not a dropdown) as the primary autocomplete

**Change Type:** Revised · **Affected:** `GhostTextCompletion` · **Design Owner:** Ideator ·
**Engineering Contact:** Feature lead

### What Changed
The primary autocomplete UX is inline **ghost text** (C1), not an inline dropdown menu (C2). The
dropdown is retained only as a fallback if ghost-text underperforms in testing.

### Why
Ghost text is lighter-weight, less likely to repaint/clutter the line, and ignorable by default —
directly answering the "suggestion noise / expert annoyance" risk (R3) that could re-trigger the
abandonment seen in prior tools.

### What It Means for Engineering
- The ghost span is decorative (`aria-hidden`) with a polite live companion; `Tab`/`→`-at-EOL
  accepts (handled by the host).

### What Not to Change
- Do not swap ghost text for an always-open dropdown without a test result justifying it.

### Linked Artifacts
- `ideation/decision-log.md` (alternatives); `handoff/components/GhostTextCompletion.md`.

---

## [2026-07-13] DEC-6 — Cached-first, non-blocking, ≤ 500 ms lookups

**Change Type:** Constrained · **Affected:** `ResourceLookupList` · **Design Owner:** Designer ·
**Engineering Contact:** Platform/adapters

### What Changed
Resource lookups are async and **cached-first**: cached rows are usable while live results
stream in, the keystroke path is never blocked, and a live call is time-boxed to **≤ 500 ms**
before graceful free-text fallback. Inline/cached computation targets **p95 ≤ 100 ms**.

### Why
Slowness and blocking were direct churn drivers (T6; HaTS "startup time is too slow… cache
things"). Speed is a precondition for the daily-habit retention target (> 25%).

### What It Means for Engineering
- Never `await` intelligence on keystroke. Map real states onto `ResourceStatus`
  (`loading/resolved/timeout/unauthenticated/empty`). Reuse the CLI's existing auth (NFR-4).
- **⚠ Currently mocked** — the ≤ 100 ms / ≤ 500 ms budgets must be proven on a live subscription
  (open item).

### What Not to Change
- Do not make lookups synchronous or remove the time-box/fallback. Do not persist credentials.

### Linked Artifacts
- PRD FR-3/FR-7/NFR-1; `tests/tenets-traps-evaluation.md` (P4, mocked-latency caveat).

---

## [2026-07-13] DEC-7 — Expert-neutral, dismissible hint copy

**Change Type:** Constrained · **Affected:** `HintLine` · **Design Owner:** Designer ·
**Engineering Contact:** Content/Feature lead

### What Changed
Hints are factual and expert-framed (e.g. `"3 required flags remain"`), additive, dismissible,
and disable-able via a persistent setting. No "beginner/tip/learn-the-basics" framing anywhere
(NG5).

### Why
The earlier "SECRET mode beginners must see" stigma capped adoption among experienced users
(T4). De-stigmatising expert value is required to reach the "expert engagement ≥ new-user
engagement" success metric.

### What It Means for Engineering
- Keep copy neutral; wire `onDisableAll` to a persistent setting (AC-4.3).
- **Open item (T&T-3):** the persistent disable control is currently only visible inline next to
  a live hint — a documented global settings surface is still owed.

### What Not to Change
- Do not add onboarding/beginner phrasing. Do not make hints non-dismissible.

### Linked Artifacts
- PRD FR-4/NG5; `tests/tenets-traps-evaluation.md` (P3, T&T-3).

---

## [2026-07-13] DEC-8 — Never colour-alone signalling

**Change Type:** Constrained · **Affected:** `SuggestionItem` + all rich components ·
**Design Owner:** Designer · **Engineering Contact:** Feature lead

### What Changed
Every state signal carries a non-colour cue: required (`*` + "required"), deprecated
("deprecated" tag), freshness (`● live` / `⚡ cached` glyph + word), match highlight (underline +
weight). Every signal is folded into each row's `aria-label`.

### Why
NFR-2 (WCAG 2.1 AA) forbids colour-alone signalling; it is also the correctness basis for the
accessible name that screen readers announce.

### What It Means for Engineering
- Pass all signals as props so `buildAriaLabel` includes them. Keep glyph/word even when
  recolouring.

### What Not to Change
- Do not remove glyphs/words to "clean up" a dense row. Do not signal state with colour only.

### Linked Artifacts
- PRD NFR-2; `tests/accessibility-audit.md` (What passed); `handoff/components/SuggestionItem.md`.

---

## [2026-07-13] DEC-9 — Flat roving listbox (enum values as sibling rows)

**Change Type:** Revised · **Affected:** `ParameterPalette` · **Design Owner:** Designer
(confirmation owed) · **Engineering Contact:** Feature lead

### What Changed
The wireframe nested enum values **under** the active flag; the prototype models flags and enum
values as **sibling rows** in one flat listbox for a single coherent roving-selection model.

### Why
One flat `aria-activedescendant` model is simpler and more predictable for keyboard/SR users
than nested selection; it keeps the non-modal listbox pattern uniform.

### What It Means for Engineering
- Implement one flat indexable option list (as shipped). **Open item (T&T-5):** confirm with the
  Designer whether flat is accepted or strict nesting is required, and align spec + build.

### What Not to Change
- Do not add nested focusable groups without the Designer decision — it would fork the keyboard
  model.

### Linked Artifacts
- `prototypes/README.md` (fidelity note #4); `tests/tenets-traps-evaluation.md` (T&T-5).

---

## [2026-07-13] DEC-10 — A11Y-1: recolour all selected-row children

**Change Type:** Revised · **Affected:** `SuggestionItem` · **Design Owner:** Designer +
Prototyper · **Engineering Contact:** Feature lead

### What Changed
On the selected row, **all** children (type hint, secondary, required glyph, status,
requirement, freshness) are recoloured to `--color-suggestion-active-text` — not just the
primary label. Previously the child spans kept their terminal-surface colours and fell below
4.5:1 on the active background (measured as low as **2.38:1** in high-contrast).

### Why
WCAG 1.4.3 (AA): the one row the user is acting on must not be the hardest to read (A11Y-1 /
T&T-1). This was the single most impactful UX+a11y defect found in Test.

### What It Means for Engineering
- Keep the CSS rule that recolours every `.selected` child. Non-colour signalling is preserved,
  so meaning survives the recolour.

### What Not to Change
- Do not revert child spans to terminal-surface colours on the selected row.

### Linked Artifacts
- `tests/accessibility-audit.md` A11Y-1; `SuggestionItem.module.css` (`.selected` rules).

---

## [2026-07-13] DEC-11 — A11Y-2: darken high-contrast active-bg token

**Change Type:** Revised · **Affected:** `tokens.css` (high-contrast) · **Design Owner:**
Designer · **Engineering Contact:** Feature lead

### What Changed
The high-contrast active-row background was changed from `--color-primary-500` (`#1f78e0`, **4.35:1**
with white — sub-AA) to `--color-primary-800` (`#0a3a72`, ≈ 11:1 with white). The yellow
`#ffff00` active border is retained as the non-colour selection cue.

### Why
WCAG 1.4.3 (AA): the high-contrast theme — whose entire purpose is maximum legibility — must
clear the threshold. This was a **token defect**, not just CSS wiring (A11Y-2).

### What It Means for Engineering
- Any override of `--color-suggestion-active-bg` must be re-verified ≥ 4.5:1 with the active-text
  per theme.

### What Not to Change
- Do not lighten the high-contrast active background back toward `primary-500`.

### Linked Artifacts
- `tests/accessibility-audit.md` A11Y-2; `designs/tokens/tokens.css` (high-contrast block).

---

## [2026-07-13] DEC-12 — A11Y-3: single focusable, named combobox

**Change Type:** Revised · **Affected:** `OverlayHost` · **Design Owner:** Prototyper ·
**Engineering Contact:** Feature lead

### What Changed
`role="combobox"`, `tabIndex=0`, `aria-label="Azure CLI command"`, `aria-controls`, and
`aria-activedescendant` are now consolidated on **one focusable element** (the command span).
Previously the combobox role + `aria-activedescendant` sat on a non-focusable span while focus
lived on the wrapping host, so the active option could go unannounced and the combobox had no
accessible name.

### Why
WCAG 4.1.2 (Name, Role, Value — **Level A**): per the ARIA APG, `aria-activedescendant` must be
on the focused element. This directly protects the non-modal listbox promise (NG2/NFR-2)
(A11Y-3 / T&T-2).

### What It Means for Engineering
- Keep focus, combobox role, name, and `aria-activedescendant` on the same element. **Open item:**
  verify with a live NVDA + VoiceOver pass that each `↑↓` announces the active option.

### What Not to Change
- Do not split focus and `aria-activedescendant` across elements again. Do not remove the
  `aria-label`.

### Linked Artifacts
- `tests/accessibility-audit.md` A11Y-3; `handoff/components/OverlayHost.md`.

---

## [2026-07-13] DEC-13 — AI-terminal: compose, don't compete (Phase 2)

**Change Type:** Constrained · **Affected:** `useCapability` (`isAiTerminal`) · **Design Owner:**
Ideator · **Engineering Contact:** Platform/adapters

### What Changed
In AI terminals, Cirrus **suppresses its own UI** and (Phase 2) exposes first-party Azure
context to the AI surface instead of drawing a rival mode (AC-6.3). `isAiTerminal=true` ⇒
suppressed today.

### Why
**AI-terminal usage is 13.1%** and rising; AI Shell's rival-mode approach hit **~6% retention**.
Composing with Copilot CLI / Claude Code (NG2) avoids reproducing that failure.

### What It Means for Engineering
- Today: suppress in AI terminals. Phase 2: build a first-party context provider to a
  stable/standard-ish interface (e.g. MCP-style), opt-in, not gating Phase 1.

### What Not to Change
- Do not draw Cirrus overlays inside an AI terminal. Do not build a competing chat mode.

### Linked Artifacts
- `ideation/decision-log.md` (C21, R4, Phase 2); PRD FR-6 AC-6.3, NG2.

---

## Do Not Regress (DNR)

Design decisions that are easy to accidentally break and are critical to maintain:

> **DNR-1 — No mode.** Never add persistent Cirrus state the user must enter/exit. (DEC-1)

> **DNR-2 — Never intercept `Enter` / `Ctrl+C` / `Ctrl+L` / tmux prefixes.** Keep the
> pass-through branch in `OverlayHost.onKeyDown` intact; never bind keys in a child. (DEC-3)

> **DNR-3 — Single `Esc` always exits; overlays render below the caret and never cover the
> command; rows are never focusable (roving `aria-activedescendant`).** (DEC-3, NG2)

> **DNR-4 — Non-az token-0 suppresses every surface and holds zero keybindings.** (DEC-2, FR-5)

> **DNR-5 — Capability fails DOWN.** Unknown TTY = non-interactive; never render `rich`
> speculatively into a script. (DEC-4)

> **DNR-6 — Never colour-alone.** Keep the glyph/word beside every colour signal and fold every
> signal into `aria-label`. (DEC-8)

> **DNR-7 — Selected-row contrast.** Keep all `.selected` children recoloured to
> `--color-suggestion-active-text`; keep high-contrast active-bg at `--color-primary-800`; any
> active-token override must be re-verified ≥ 4.5:1 per theme. (DEC-10, DEC-11)

> **DNR-8 — One focusable, named combobox** carrying `role`, `aria-label`, and
> `aria-activedescendant` together. Do not split them. (DEC-12)

> **DNR-9 — Reduced motion.** Drive all motion through `--motion-*` tokens so the
> `prefers-reduced-motion` block can zero it; never hardcode durations. (tokens.css)

> **DNR-10 — Expert-neutral copy.** No beginner/onboarding framing in hints; keep them
> dismissible + persistently disable-able. (DEC-7, NG5)

## Next Steps

- Engineering to confirm each Implemented entry in code review; flag any as **Blocked** if a
  build constraint conflicts.
- Designer to close the two open decisions: **DEC-9** (flat vs nested enum grouping) and the
  **DEC-7 / T&T-3** persistent-hint settings surface.
- Carry the two owed validations (live NVDA/VoiceOver — DEC-12; real-subscription performance —
  DEC-6) into the handoff checklist as tracked open items.
