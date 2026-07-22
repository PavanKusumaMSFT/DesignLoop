---
title: "Project Cirrus — Divergent Concept Brainstorm"
phase: ideate
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Ideator Agent"
related:
  - "ideation/hmw-reframing.md"
  - "strategy/personas.md"
  - "strategy/requirements-prd.md"
  - "strategy/journey-map.md"
---

# Concept Brainstorm: Inline Azure CLI Intelligence

A wide, deliberately divergent set of solution concepts generated across six ideation lenses, ranging from conventional (proven autocomplete patterns) to speculative (predictive scenario detection, AI-terminal context servers). This is the *divergence* step — breadth before judgement. Convergence and scoring happen in `concept-evaluation.md`.

## Overview

Concepts are organised by **lens** so we cover the full opportunity surface rather than clustering around one idea:

- **Lens A — Inline autocomplete UX** (how command paths/subcommands surface)
- **Lens B — Parameter & value suggestion surfaces** (how flags and enum values surface)
- **Lens C — Dynamic resource-lookup affordances** (how live subscription data completes identifiers)
- **Lens D — Expert-framed discoverability nudges** (how guidance appears without stigma)
- **Lens E — Cross-environment adaptation** (how intelligence travels and degrades)
- **Lens F — AI-terminal composition** (how first-party Azure context feeds AI terminals)

Every concept below is annotated with: **HMW served**, **persona(s) served**, and a **gate check** proving it clears **NG1 (no mode)** and **FR-5 (non-az always runs)**. Concepts that are *speculative* or *reference/out-of-bounds* are flagged so evaluation can cut cleanly.

---

## Lens A — Inline Autocomplete UX

### C1 — Ghost-text command completion
**One-liner:** As the user types `az`, a dimmed inline "ghost" of the most-likely full command path appears ahead of the cursor; Right-arrow / Tab accepts, any other key ignores it.
- **HMW:** HMW-1, HMW-4. **Personas:** David, Maya, Priya.
- **Gate:** NG1 ✓ — ghost text is a rendering of the current line, no program to enter. FR-5 ✓ — non-`az` first token → no ghost ever shown; input passes through untouched.

### C2 — Inline dropdown menu (fish/zsh-autosuggest style)
**One-liner:** A small, dismissible dropdown of ranked candidate subcommands renders below the input line, navigable with arrows, closed with Esc.
- **HMW:** HMW-1. **Personas:** David, Maya.
- **Gate:** NG1 ✓ — ephemeral overlay tied to the line, not a stateful container. FR-5 ✓ — suppressed entirely for non-`az` tokens; never repaints the line for other commands.

### C3 — Widened `<Tab>` completion (progressive)
**One-liner:** Enrich the existing shell completion so a single Tab cycles ranked, context-aware `az` candidates with a one-line description each — no new keybinding, no overlay.
- **HMW:** HMW-1, HMW-4. **Personas:** Maya (respects existing muscle memory), David.
- **Gate:** NG1 ✓ — reuses native completion mechanism. FR-5 ✓ — completion only registered for the `az` command; other commands use their own completers unchanged.

### C4 — Fuzzy "did-you-mean" correction hint
**One-liner:** On a mistyped subcommand, show a single inline suggestion ("`az storage acount` → `account`?") that Tab accepts, printed *after* Enter only if the command would fail.
- **HMW:** HMW-1, HMW-5. **Personas:** David, Maya.
- **Gate:** NG1 ✓ — a printed hint line, no mode. FR-5 ✓ — only triggers on failed `az` invocations; never on non-`az` commands.

---

## Lens B — Parameter & Value Suggestion Surfaces

### C5 — Contextual parameter palette
**One-liner:** When the cursor reaches an argument position for a recognised `az` command, offer valid `--flags` inline, ranked by relevance (required first), each with a short description.
- **HMW:** HMW-1, HMW-4. **Personas:** David (Journey Stage 3), Maya.
- **Gate:** NG1 ✓ — argument-position suggestion, no container. FR-5 ✓ — scoped to recognised `az` commands only.

### C6 — Valid-enum value completion
**One-liner:** For bounded-value params (`--sku`, `--location`, `--tier`), offer only valid values — invalid values are never suggested — preventing the failed-run loop (Journey Stage 8).
- **HMW:** HMW-1, HMW-5. **Personas:** David, Maya.
- **Gate:** NG1 ✓ — value completion inline. FR-5 ✓ — bound to `az` param context; irrelevant elsewhere.

### C7 — Inline required-parameter checklist
**One-liner:** A dim, dismissible one-line indicator of which required params are still missing before the command is runnable ("missing: --resource-group").
- **HMW:** HMW-1, HMW-4. **Personas:** David (Stage 5 sanity-check), Maya.
- **Gate:** NG1 ✓ — advisory annotation, never blocks Enter. FR-5 ✓ — only for `az` commands.

### C8 — Pre-flight validation glow *(speculative — borders on blocking)*
**One-liner:** Live-validate the assembled command and tint the prompt when the current command is known-invalid, clearing when valid.
- **HMW:** HMW-1, HMW-5. **Personas:** David.
- **Gate:** NG1 ✓ — no mode. FR-5 ⚠ — must guarantee it never delays/blocks Enter (NFR conflict risk); flagged for latency scrutiny in evaluation.

---

## Lens C — Dynamic Resource-Lookup Affordances

### C9 — Live resource-group / resource-name completion
**One-liner:** Complete `--resource-group`, resource names, and IDs from the user's live subscription using existing CLI auth; async, time-boxed, cached.
- **HMW:** HMW-1, HMW-5. **Personas:** David (Stage 4), Maya, Priya.
- **Gate:** NG1 ✓ — completion source, no mode. FR-5 ✓ — only for `az` resource params; offline → silent free-text fallback.

### C10 — Async lookup with cached-first render
**One-liner:** Serve last-known resource lists from a local cache instantly (p95 ≤ 100 ms), then quietly refresh in the background; the network call never sits on the keystroke path.
- **HMW:** HMW-5, HMW-1. **Personas:** Maya, David.
- **Gate:** NG1 ✓ — caching strategy, invisible. FR-5 ✓ — no interference with non-`az`; degrades to free text on miss.

### C11 — Cross-subscription resource disambiguation
**One-liner:** When a resource name is ambiguous across subscriptions, show the qualifying subscription/RG inline so the user picks the right one without `az account set`.
- **HMW:** HMW-1. **Personas:** Maya (multi-sub), David.
- **Gate:** NG1 ✓ — inline disambiguation. FR-5 ✓ — az-scoped.

### C12 — Predictive next-resource suggestion *(speculative)*
**One-liner:** From the current command + recent history, predict the likely *next* resource the user will reference (e.g., the RG just created) and pre-warm its cache.
- **HMW:** HMW-1, HMW-5. **Personas:** David, Maya.
- **Gate:** NG1 ✓ — pre-warming is invisible. FR-5 ✓ — no input interception. Flagged speculative: value depends on prediction accuracy.

---

## Lens D — Expert-Framed Discoverability Nudges

### C13 — Dismissible inline hint line (expert copy)
**One-liner:** A single, neutral-toned hint (syntax shape, next-step context) rendered below the input, fully dismissible and disable-able via a persistent setting — no "beginner" framing anywhere.
- **HMW:** HMW-4, HMW-1. **Personas:** David, Maya, Priya.
- **Gate:** NG1 ✓ — advisory line, no mode. FR-5 ✓ — az-scoped, never blocks entry.

### C14 — On-demand inline "peek" (opt-in reveal)
**One-liner:** A quiet affordance (e.g., `??` or a keychord) expands richer guidance *only when the expert asks*, then collapses — help on tap, gone when unwanted.
- **HMW:** HMW-4. **Personas:** David, Priya.
- **Gate:** NG1 ✓ — expansion is transient inline, not a program. FR-5 ✓ — opt-in, az-scoped; must not collide with existing keybindings (NG3).

### C15 — Neutral relevance ranking (no novelty badges)
**One-liner:** Rank suggestions purely by contextual relevance and user history, with expert-neutral presentation — no "NEW", "TIP", or tutorial chrome that signals training wheels.
- **HMW:** HMW-4. **Personas:** David, Maya.
- **Gate:** NG1 ✓. FR-5 ✓. A presentation principle layered onto C1/C5 rather than a standalone surface.

### C16 — Explain-on-hover for flags *(IDE-only enrichment)*
**One-liner:** In IDE terminals that support it, hovering a flag shows its docstring; degrades to the inline hint line elsewhere.
- **HMW:** HMW-4, HMW-3. **Personas:** David.
- **Gate:** NG1 ✓. FR-5 ✓. Surface-conditional; folds into the portability layer.

---

## Lens E — Cross-Environment Adaptation

### C17 — Capability-detecting rendering layer
**One-liner:** A detection layer probes the surface (TTY richness, IDE, CI, Cloud Shell, AI terminal) and picks the richest safe rendering: full inline UI → plain hints → silent no-op in non-interactive CI.
- **HMW:** HMW-3, HMW-5. **Personas:** David, Maya, Priya.
- **Gate:** NG1 ✓ — adaptation of an inline layer, never a mode. FR-5 ✓ — in CI, degrades to zero interference so scripts run byte-identically.

### C18 — Shared intelligence core, thin surface adapters
**One-liner:** One environment-agnostic intelligence engine (completion, lookup, ranking) with thin per-surface adapters (local shell, IDE extension, Cloud Shell, AI-terminal context server) — build the brain once, adapt the skin.
- **HMW:** HMW-3, HMW-6. **Personas:** David, Priya, Maya.
- **Gate:** NG1 ✓ — the core is a library, not a mode. FR-5 ✓ — every adapter inherits the non-`az` pass-through contract. This is the architectural spine, not a UX surface.

### C19 — Portable settings/profile sync
**One-liner:** User preferences (hints on/off, verbosity) follow the user across environments so the experience is consistent from local terminal to Cloud Shell.
- **HMW:** HMW-3. **Personas:** David (Stage 10 consistency).
- **Gate:** NG1 ✓ — config only. FR-5 ✓ — no input effect. Non-stateful w.r.t. the command line (NG3 respected); settings persistence only.

### C20 — Cloud Shell / remote pre-warmed cache
**One-liner:** In pre-authed surfaces (Cloud Shell), seed the resource cache at session start so first lookups are instant without a startup penalty on the input path.
- **HMW:** HMW-3, HMW-5. **Personas:** David, Maya.
- **Gate:** NG1 ✓. FR-5 ✓ — background seeding, no interactive-startup penalty (AC-7.3).

---

## Lens F — AI-Terminal Composition

### C21 — First-party Azure context provider (MCP-style)
**One-liner:** Expose Azure intelligence (resource lookups, validated params, scenario detection) as a composable context service that AI terminals (Copilot CLI, Claude Code) can call, so their generated `az` commands are correct and runnable.
- **HMW:** HMW-6, HMW-3. **Personas:** Priya (primary), David.
- **Gate:** NG1 ✓ — a callable provider, not a mode the user enters. FR-5 ✓ — the AI terminal keeps running everything; we only supply Azure context. NG2 ✓ — composes, doesn't rival.

### C22 — Command-validation hook for AI output
**One-liner:** Offer a lightweight validate-and-repair hook AI terminals can invoke on drafted `az` commands (fix deprecated SKUs, wrong resource names) before presenting them to the user.
- **HMW:** HMW-6, HMW-1. **Personas:** Priya.
- **Gate:** NG1 ✓ — a hook, no mode. FR-5 ✓ — only touches `az` drafts; non-`az` untouched. NG2 ✓.

### C23 — Shared cache between CLI and AI terminal
**One-liner:** Let the AI-terminal adapter and the local CLI share one resource cache so context stays consistent and fast across both surfaces.
- **HMW:** HMW-6, HMW-3, HMW-5. **Personas:** Priya, Maya.
- **Gate:** NG1 ✓. FR-5 ✓. Efficiency layer under C21/C18.

### C24 — Bespoke Cirrus AI chat mode *(REFERENCE — out of bounds)*
**One-liner:** Ship our own conversational Azure AI assistant as a standalone interactive surface.
- **HMW:** (would target HMW-6). **Personas:** none well-served.
- **Gate:** NG1 ✗ — a dedicated mode. NG2 ✗ — rivals AI terminals. **Included only to mark the boundary; auto-fails gates.** Evidence: AI Shell ~6% retention.

---

## Concept Inventory (quick index)

| # | Concept | Lens | HMW | Gate status |
|---|---------|------|-----|-------------|
| C1 | Ghost-text completion | A | 1,4 | pass |
| C2 | Inline dropdown menu | A | 1 | pass |
| C3 | Widened Tab completion | A | 1,4 | pass |
| C4 | Did-you-mean correction | A | 1,5 | pass |
| C5 | Contextual parameter palette | B | 1,4 | pass |
| C6 | Valid-enum value completion | B | 1,5 | pass |
| C7 | Required-param checklist | B | 1,4 | pass |
| C8 | Pre-flight validation glow | B | 1,5 | ⚠ latency |
| C9 | Live resource completion | C | 1,5 | pass |
| C10 | Async cached-first render | C | 5,1 | pass |
| C11 | Cross-sub disambiguation | C | 1 | pass |
| C12 | Predictive next-resource | C | 1,5 | speculative |
| C13 | Dismissible expert hint line | D | 4,1 | pass |
| C14 | On-demand peek | D | 4 | pass |
| C15 | Neutral relevance ranking | D | 4 | pass (principle) |
| C16 | Explain-on-hover (IDE) | D | 4,3 | pass (conditional) |
| C17 | Capability-detecting layer | E | 3,5 | pass |
| C18 | Shared core + adapters | E | 3,6 | pass (spine) |
| C19 | Portable settings sync | E | 3 | pass |
| C20 | Pre-warmed cache | E | 3,5 | pass |
| C21 | First-party context provider | F | 6,3 | pass |
| C22 | AI-output validation hook | F | 6,1 | pass |
| C23 | Shared CLI/AI cache | F | 6,3,5 | pass |
| C24 | Bespoke AI chat mode | F | (6) | ✗ FAILS NG1/NG2 |

## Next Steps

- Carry all gate-passing concepts into `concept-evaluation.md` for feasibility × desirability × viability scoring plus an explicit NG1/FR-5 gate column.
- Cut C24 immediately (fails gates by construction); scrutinise C8 for latency-budget compliance; treat C12 as speculative upside.
- Expect the shortlist to combine one architectural spine (C18), a capability-adaptation layer (C17), and the highest-value UX surfaces (autocomplete, param/enum, resource lookup, expert hints) into a single coherent inline layer — plus the AI-terminal provider (C21) as the composition play.
