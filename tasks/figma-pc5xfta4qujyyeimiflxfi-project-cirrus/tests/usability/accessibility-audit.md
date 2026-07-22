---
title: "Project Cirrus — Accessibility Audit (WCAG 2.1 AA)"
phase: test
status: draft
created: 2026-06-23
updated: 2026-06-23
author: "Tester Agent"
related: ["../../research/web/project-cirrus-prototype.md", "tenets-traps-evaluation-r1.md"]
---

# Project Cirrus — Accessibility Audit (WCAG 2.1 AA)

## Overview

Accessibility audit of the **Project Cirrus** prototype — an AI-assisted error-recovery
experience for the Azure CLI (`az`), rendered as a simulated **zsh terminal**. The target is
**WCAG 2.1 Level AA**. The audit covers the full captured flow: failed `az vm create` →
`ResourceGroupNotFound` error → "Analyzing error root cause using AI…" → the **AI help**
block (6 issues + 2 corrective commands + disclaimer).

> **Method note (important):** No DOM-based demo page exists for this prototype — it is a
> password-gated Figma click-through of a terminal UI. **axe-core could not be run** because
> there is no live HTML/ARIA tree to instrument. This audit therefore combines
> **(a) pixel-measured colour-contrast analysis** of the captured frames (objective) with
> **(b) an expert WCAG 2.1 AA heuristic review** of the visible design. Findings that depend
> on runtime behaviour — screen-reader announcement, keyboard operability of suggested
> commands, blink rate, `prefers-reduced-motion` — **cannot be confirmed from static frames**
> and are listed as **Caveats requiring validation on a live build** (see §6 and the usability
> test plan).

## 1. Summary

| Impact | Count |
|---|---|
| Critical | 0 |
| Serious | 0 |
| Moderate | 2 (A-04, A-05) |
| Minor | 2 (A-06, A-07) |

- **Confirmed WCAG Level A violations:** **0** (against the captured design).
- **Confirmed WCAG Level AA violations:** **0** measurable; **2 Moderate AA risks** pending
  live-build validation (4.1.3, 2.2.x).
- **Colour contrast (1.4.3):** **PASS** — every text colour sampled exceeds 4.5:1 on the
  black terminal background.
- **Components passing all checks:** terminal body text, warning text, error text, AI help
  text (all contrast checks pass).
- **Sign-off recommendation:** **PASS WITH CAVEATS.** No blocking accessibility defects are
  visible in the design. Before production, the four runtime caveats in §6 **must** be verified
  on a screen-reader-instrumented build (VoiceOver/NVDA + terminal).

### WCAG criteria evaluated

| Criterion | Level | Result |
|---|---|---|
| 1.1.1 Non-text Content | A | Pass (text UI; macOS window controls are decorative chrome) |
| 1.3.1 Info & Relationships | A | Pass with caveat (structure is plain text — see A-04) |
| 1.4.1 Use of Color | A | Pass (errors/warnings also conveyed by text, not colour alone) |
| 1.4.3 Contrast (Minimum) | AA | **Pass** (measured, all ≥ 4.5:1) |
| 1.4.4 / 1.4.10 Resize & Reflow | AA | Pass with caveat (long command wrap — A-06) |
| 1.4.11 Non-text Contrast | AA | Not applicable / Pass (no graphical controls; no visible focus ring to fail) |
| 2.1.1 Keyboard | A | Pass (terminal is keyboard-native) — A-07 covers suggested-command operability |
| 2.1.2 No Keyboard Trap | A | Pass with caveat (cancel during "Analyzing…" — A-05) |
| 2.2.1 / 2.2.2 Timing & Pause | A/AA | Caveat (no progress/cancel during AI wait — A-05) |
| 2.3.1 Three Flashes | A | Pass with caveat (cursor blink rate unverified — A-05) |
| 2.4.3 Focus Order | A | Pass (linear terminal output) |
| 3.3.1 Error Identification | A | **Pass** (errors clearly identified in text + the AI feature reinforces this) |
| 4.1.2 Name, Role, Value | A | Pass (native terminal text; no custom interactive widgets visible) |
| 4.1.3 Status Messages | AA | **Caveat** — AI status/result announcement unverified (A-04) |

## 2. Audit Scope

| Audit ID | Screen / Element | Source | Automated | Manual |
|---|---|---|---|---|
| A-01 | Terminal body & command echo (frames 00–01) | frame-00/01.png | n/a (no DOM) | Contrast, keyboard |
| A-02 | Deprecation warning + error block (frames 02–03) | frame-02/03.png | n/a | Contrast, use-of-color |
| A-03 | "Analyzing… using AI" wait state (frame 04) | frame-04.png | n/a | Timing, motion, SR |
| A-04 | AI help output: issues + next actions (frame 05) | frame-05.png | n/a | Structure, SR, contrast |

## 3. Colour Contrast Results (measured)

Foreground colours sampled pixel-accurately from `frame-05.png` against the terminal
background `#000000`:

| Element | Foreground | Background | Ratio | Required (AA) | Result |
|---|---|---|---|---|---|
| Command / normal text | `#F2F2F2` | `#000000` | **18.76:1** | 4.5:1 | Pass (AAA) |
| Secondary / dim text | `#B6B6B6` | `#000000` | **10.36:1** | 4.5:1 | Pass (AAA) |
| Warning text | `#C19C00` | `#000000` | **8.02:1** | 4.5:1 | Pass (AAA) |
| Error text | `#E74856` | `#000000` | **5.46:1** | 4.5:1 | Pass |
| Dimmest sampled glyph edge | `#797979` | `#000000` | **4.82:1** | 4.5:1 | Pass (marginal) |

**1.4.3 Contrast (Minimum): PASS.** No text combination falls below 4.5:1. The dimmest
sampled value (4.82:1) is anti-aliasing edge pixels of small text, not a primary content
colour, and still clears the AA threshold.

## 4. Manual Check Results

**A. Colour Contrast** — Pass (see §3).

**B. Keyboard Navigation** — The interface is a native terminal and is therefore inherently
keyboard-operable for command entry. **However**, it is not visible from the static capture
whether the *suggested* `Next action` commands are keyboard-selectable/copyable or merely
printed text (see A-07). No keyboard trap is visible, but the "Analyzing…" state's cancel
path (Ctrl-C) is not surfaced (A-05).

**C. ARIA & Semantics** — Not applicable in the conventional DOM sense: a terminal has no ARIA
tree. Screen readers consume the terminal text buffer linearly. The information needed to
recover (error code, the six issues, the corrective commands) **is present as text**, which
is the key requirement — but it is not programmatically *grouped* (A-04).

**D. Focus Management** — No visible focus indicator is rendered in any frame. For pure text
output this is acceptable; it becomes a concern only if the suggested commands are interactive
(A-07).

**E. Motion & Animation** — A blinking cursor is present (frames 02, 04). Blink rate and
`prefers-reduced-motion` handling cannot be measured from still frames (A-05). Standard
terminal cursor blink (~1–2 Hz) is well under the 3-flashes/second threshold, so no 2.3.1
violation is expected — but this must be confirmed on the live build.

## 5. Findings

## Issue A-04: AI output structure relies on visual text formatting only
**WCAG Criterion**: 1.3.1 Info & Relationships (A) and 4.1.3 Status Messages (AA)
**Impact**: Moderate
**Screen/Element**: AI help block (frame 05) and "Analyzing…" status (frame 04)
**Element**: AI output region of the terminal

**Description**: Sighted users perceive clear structure — "AI help", "Found 6 issues",
"Next action", and a disclaimer — through headings, underlines, numbering and whitespace. A
screen-reader user reading the terminal buffer receives this as one linear text stream with no
programmatic headings, list semantics, or live-region announcement. The long AI block dumped at
once can also be hard to navigate and may not be announced as a status update (4.1.3). This
affects blind and low-vision screen-reader users.

**Evidence**: Frame 05 shows visual-only structure (the `---------` underline, numbered lists,
the `└` continuation glyph). Terminals expose no ARIA; announcement behaviour is unverified.

**Remediation**: This is partly inherent to a terminal and cannot be fully "fixed" with ARIA.
Mitigations for the Prototyper/CLI team: (1) keep each issue and each next-action on its own
line with stable, parseable prefixes so screen-reader line-navigation works; (2) emit a short,
distinct summary line first (e.g. "AI found 6 issues; 2 suggested commands below") so the
status is announced before the detail; (3) validate announcement with VoiceOver + Terminal and
NVDA + Windows Terminal; (4) if a companion GUI/portal surface exists, render the same content
with real heading/list semantics and an `aria-live="polite"` region.

**Effort**: Medium

---

## Issue A-05: "Analyzing… using AI" wait state has no progress, cancel hint, or verified motion safety
**WCAG Criterion**: 2.2.1 Timing Adjustable (A) · 2.2.2 Pause, Stop, Hide (AA) · 2.3.1 Three
Flashes (A)
**Impact**: Moderate
**Screen/Element**: "Analyzing error root cause using AI ..." (frame 04)

**Description**: During the AI call the user sees only static text plus a blinking cursor.
There is no progress indicator, no indication the operation can be interrupted, and (from
static frames) no confirmation that the cursor blink respects `prefers-reduced-motion` or stays
under 3 flashes/second. For users with cognitive or vestibular sensitivities, an unbounded wait
with motion and no exit is a barrier.

**Evidence**: Frame 04 — single line "Analyzing error root cause using AI ..." with blinking
cursor; no spinner, percentage, elapsed time, or "press Ctrl-C to cancel" hint.

**Remediation**: (1) Surface an explicit cancel affordance/hint (e.g. "Press Ctrl-C to
cancel"); (2) add lightweight progress feedback (animated ellipsis or elapsed seconds) so the
wait is bounded in perception; (3) confirm cursor blink rate < 3 Hz and that
`prefers-reduced-motion: reduce` (or the terminal's no-blink setting) disables the blink.

**Effort**: Medium

---

## Issue A-06: Long suggested command wraps and loses indentation
**WCAG Criterion**: 1.4.10 Reflow (AA) / 1.4.4 Resize Text (AA)
**Impact**: Minor
**Screen/Element**: "Retry VM creation" suggested command (frame 05)

**Description**: The second suggested `az vm create` command is long and soft-wraps across
three lines; wrapped continuation lines lose the `└` indent, making it visually ambiguous where
the single command begins and ends. At larger text sizes this worsens. Affects low-vision users
relying on large text and anyone parsing the command.

**Evidence**: Frame 05 — the `az vm create --name myvm1 …` command wraps mid-flag with no
continuation indent on lines 2–3.

**Remediation**: Preserve a continuation indent on wrapped lines, or present the suggested
command as a clearly delimited block (e.g. a leading `$ ` per command and consistent hanging
indent) so the command boundary survives reflow.

**Effort**: Low

---

## Issue A-07: Operability of suggested commands is unconfirmed (copy/keyboard)
**WCAG Criterion**: 2.1.1 Keyboard (A) — operability of interactive content
**Impact**: Minor (pending confirmation; escalates if commands are mouse-only interactive)
**Screen/Element**: "Next action" suggested commands (frame 05)

**Description**: If the suggested commands are interactive (clickable "run"/"copy" targets),
they must be keyboard-operable with a visible focus indicator and an accessible name. If they
are plain text the user retypes/selects, that is keyboard-accessible by default but imposes a
manual burden (cross-ref Tenets & Traps F7). From static frames the affordance is unknown.

**Evidence**: Frame 05 — commands appear as plain wrapped text with no visible control,
selection state, or focus ring.

**Remediation**: Decide and document the interaction model. If interactive: ensure Tab focus,
visible focus indicator (≥ 3:1 per 1.4.11), accessible name, and Enter/Space activation. If
plain text: provide an explicit, keyboard-reachable "copy command" affordance so users need not
retype a 200-character command error-free.

**Effort**: Low–Medium

## 6. Caveats Requiring Validation on a Live Build

These cannot be verified from a static, password-gated Figma capture and **must** be checked on
a running, screen-reader-instrumented build before production sign-off:

- [ ] **Screen-reader announcement** of the AI status and result (VoiceOver + macOS Terminal;
      NVDA + Windows Terminal) — relates to A-04 (4.1.3, 1.3.1).
- [ ] **Cursor blink rate < 3 Hz** and `prefers-reduced-motion` honoured — A-05 (2.3.1, 2.2.2).
- [ ] **Cancel/interrupt** path during the AI wait (Ctrl-C works and is discoverable) — A-05
      (2.2.1).
- [ ] **Suggested-command operability** and copy affordance — A-07 (2.1.1).
- [ ] **axe-core run** against any DOM/portal surface that renders this content (none exists in
      the current prototype; required if a web companion is built).

## 7. Next Steps

- [ ] No Critical/Serious accessibility defects block the stage — contrast and error
      identification pass. Stage accessibility gate (**0 Level A violations**) is **met for the
      captured design**.
- [ ] Hand A-04–A-07 to the Prototyper/CLI team; prioritise A-04 and A-05 (Moderate).
- [ ] Execute the §6 live-build validation checklist during usability testing (the test plan
      includes a screen-reader pass).
- [ ] Re-audit with axe-core if/when a DOM companion surface is implemented.
