---
title: "Findings Synthesis — Defining a Good CLI Error-Handling Structure"
phase: discover
status: draft
created: 2026-07-20
updated: 2026-07-20
author: "Researcher Agent"
related: ["research-brief.md", "competitive-analysis.md"]
---

# Findings Synthesis — Defining a Good CLI Error-Handling Structure

## Overview

This synthesis re-frames prior validated UXR around a single question: **what structure
(contract, schema, and rendering rules) should govern errors inside the CLI?** The
evidence base is 115 error-related HaTS verbatims (Oct 2022 – Jun 2026; ~75% Azure CLI,
~25% Azure PowerShell), documented in
`../../what-prior-research-tells-us-error-handling-uxr-summary-synt/research/web/error-handling-uxr-summary.md`
(Zainab Alasadi, UXR, May 2026) and synthesised in
`../../what-prior-research-tells-us-error-handling-uxr-summary-synt/research/findings-synthesis.md`.
Findings are cited as **F1–F9** (source) and themes as **T1–T9** (prior synthesis).

The core insight: individual error messages are only symptoms. The root cause of the
#1 dissatisfaction driver is the **absence of a defined error-handling structure**.
Errors vary in content, in how failure is signalled to callers, and in how they are
rendered. A good structure is therefore three concentric layers: a **content contract**,
a **signalling contract**, and **rendering rules** — with an AI-assist hook as an
extension point.

## Validated Themes (mapped to structural gaps)

| # | Theme (from prior UXR) | Structural gap it exposes | Source |
|---|------------------------|---------------------------|--------|
| T1 | Errors are vague/cryptic — *what* failed is unclear | No mandatory "What" field | F1 |
| T2 | Errors are misleading — wrong symptom, wrong root cause | No cause-classification field; tool is a passthrough | F3 |
| T3 | Errors say *what* but not *how to fix* | No mandatory "What next" / remediation field | F2 |
| T4 | Output formatting unreadable (escaped JSON-in-JSON, walls of text) | No separation of structured payload from human rendering | F4 |
| T5 | Inconsistent failure signalling (exit codes, stderr/stdout) | No enforced automation signalling contract | F5 |
| T6 | Cmdlet inconsistency violates PowerShell norms | No idiomatic error-object / error-ID contract for PS | F6 |
| T7 | Raw Python tracebacks leak to users | No "unexpected exception" wrapping rule in the structure | F7 |
| T8 | Warning noise contaminates structured output | No classification separating warnings from errors/structured output | F8 |
| T9 | Users rely on AI assistants to decode errors | No defined hook/metadata for machine explanation | F9 |

## Key Insights

1. **The problem is structural, not lexical.** Fixing message strings one at a time
   cannot resolve T1–T3 because the underlying issue is that no field is *guaranteed* to
   exist. A structure that *mandates* What / Why / What next converts an open-ended copy
   problem into a schema-conformance problem. *(F1, F2, F3)*

2. **A "good" error is a typed object first, a string second.** The verbatims about
   automation (T5, T6) and about unreadable JSON (T4) both point to the same design:
   errors should be a single structured object with a stable schema, from which both a
   human view and a machine view are *rendered*. Humans should never be handed the raw
   machine payload (escaped JSON-in-JSON), and machines should never receive
   human-formatting noise (warnings, tracebacks). *(F4, F5, F8)*

3. **Cause classification is the highest-leverage new field.** T2's misleading-error
   pain (a firewall block reported as a role error; "conditional access" with no CAP;
   three days lost to an OS incompatibility) is a passthrough failure. The structure must
   carry a `cause_category` (user-input | environment | service | permission) so the CLI
   can act as a *translator* rather than a passthrough. *(F3)*

4. **Signalling is foundational and independently blocking.** Even a perfect message is
   useless to a pipeline if failure exits 0 or writes to stdout. The signalling contract
   (always non-zero on failure, always stderr, stable error ID) is a prerequisite for
   automation trust and must be enforced uniformly across command groups. *(F5, F6)*

5. **The structure needs an "unexpected" lane.** Raw tracebacks (T7) are what happens
   when there is no rule for exceptions the code did not anticipate. The structure must
   define a catch-all wrapper that still emits the contract fields (What / Why / What
   next) and hides implementation detail unless a debug flag is set. *(F7)*

6. **Warnings must be a first-class, separate class.** T8 shows warnings leaking into
   JSON and being un-suppressible. The structure must define severity classes and a rule
   that only errors participate in exit-code/stderr semantics and that structured output
   channels are never contaminated by warnings. *(F8)*

7. **The bar is now set by LLMs, so design for machine explanation.** T9 means the
   structure should expose stable, machine-readable metadata (error ID, cause category,
   docs link) that an AI assistant — internal or external — can consume to explain the
   error. Designing the schema for this consumption future-proofs the contract. *(F9)*

## Proposed Structure (evidence-derived, for the Define stage to formalise)

This is presented as *findings-derived options*, not a decision. Each element maps to
cited evidence.

| Layer | Element | Purpose | Source |
|-------|---------|---------|--------|
| Content contract | `summary` (What) | Plain-language, customer-vocabulary statement of what failed | F1 |
| Content contract | `cause` + `cause_category` (Why) | Likely cause + classification (user-input / environment / service / permission) | F2, F3 |
| Content contract | `next_steps` (What next) | 1–3 concrete actions and/or a *specific* doc link | F2 |
| Signalling contract | `exit_code` | Always non-zero on failure, uniform across command groups | F5 |
| Signalling contract | `stream` | Errors always to stderr; structured output never polluted | F5, F8 |
| Signalling contract | `error_id` | Stable, machine-readable ID for programmatic handling / try-catch | F5, F6 |
| Signalling contract | PS error object | Idiomatic error stream, respects `-ErrorAction`, typed exception | F6 |
| Rendering rules | human view | De-nested/unescaped, visual hierarchy, concise mode, no raw traceback | F4, F7 |
| Rendering rules | machine view | Clean JSON, no warnings, no traceback | F4, F8 |
| Rendering rules | severity class | error vs. warning vs. info; only errors affect exit/stderr; warnings suppressible | F8 |
| Extension | AI-assist hook | Expose error_id + cause_category + docs link for LLM explanation | F9 |

## Ranked Opportunity Areas (framed around the structure)

Ranking reflects prevalence in the source (F1/F3 are #1/#2 most-cited), whether the item
is *foundational* (blocks other work), and leverage per unit of effort.

| Rank | Opportunity | Structural role | Themes | Source | Why ranked here |
|------|-------------|-----------------|--------|--------|-----------------|
| 1 | **Structured "What / Why / What next" error contract** — a mandatory schema every error conforms to | Content contract (core) | T1, T2, T3 | F1, F2, F3 | Attacks the #1 and #2 most-cited pains and the recovery gap; defines the spine of the whole structure |
| 2 | **Consistent automation signalling contract** — always non-zero + stderr + stable error ID, uniform across command groups | Signalling contract | T5, T6 | F5, F6 | Foundational and independently blocking for automation; must be enforced structurally, not per-command |
| 3 | **Cause-classification / translation layer** — `cause_category` field turning passthrough into translator | Content contract (Why field) | T2, T3 | F3 | Highest-leverage new field; directly kills the "hours/days of misdirected troubleshooting" pain |
| 4 | **Dual rendering rules** — one payload, human-readable and machine-readable views (de-nest JSON, wrap tracebacks) | Rendering rules | T4, T7 | F4, F7 | Makes already-present information usable; removes quality-perception damage from raw tracebacks |
| 5 | **Severity classes & warning hygiene** — warnings never contaminate structured output; suppressible | Rendering rules (severity) | T8 | F8 | Restores trust in machine-readable output; scoped and clearly bounded |
| 6 | **AI-assist explanation hook** — stable metadata for LLM consumption | Extension point | T9, T1 | F9 | Emerging signal; meets the rising bar and leverages existing user behaviour; depends on ranks 1–3 existing first |

## Next Steps

- Feed ranked opportunities (1–6) and the proposed structure table into
  `strategy/problem-statements.md` and the Define-stage PRD.
- Prioritise the **content contract (rank 1)** and **signalling contract (rank 2)** as
  the foundational spine; ranks 3–6 attach to that spine.
- Consider a lightweight validation of the proposed schema with 2–3 automation users and
  2–3 interactive users before locking the PRD (optional confirmatory pass).
- See `competitive-analysis.md` for how leading CLIs structure these same layers.
