---
title: "Research Brief — Defining a Good Error-Handling Structure inside the CLI"
phase: discover
status: draft
created: 2026-07-20
updated: 2026-07-20
author: "Researcher Agent"
related: ["findings-synthesis.md", "competitive-analysis.md"]
---

# Research Brief — Defining a Good Error-Handling Structure inside the CLI

## Overview

This brief frames the Discover-stage research for defining a **good error-handling
structure (contract) inside the CLI** — primarily Azure CLI and Azure PowerShell.
It does not aim to redesign individual error strings command-by-command. It aims to
define the *structure* — the shared contract, schema, and rendering rules — that every
error in the CLI should conform to, so that both humans and automation get a
consistent, diagnostic, and actionable failure experience.

The research foundation is prior validated UXR: an analysis of **115 error-related
open-text HaTS responses** collected Oct 2022 – Jun 2026 (~75% Azure CLI, ~25% Azure
PowerShell), summarised in
`../../what-prior-research-tells-us-error-handling-uxr-summary-synt/research/web/error-handling-uxr-summary.md`
and synthesised in the sibling
`../../what-prior-research-tells-us-error-handling-uxr-summary-synt/research/findings-synthesis.md`.
That work established validated themes **T1–T9** and opportunity areas **O1–O6**. This
brief treats those as pre-completed user evidence and re-scopes them around *structure*.

## Problem Statement

Errors in the CLI today are inconsistent in **content, contract, and presentation**.
Users can tell that *something* failed but rarely *what*, *why*, or *what to do next*;
automation cannot rely on how failure is signalled; and presentation (escaped
JSON-in-JSON, raw tracebacks, warning noise) destroys information that is otherwise
present. The absence of a defined error-handling *structure* is the root cause behind
the single most-cited dissatisfaction driver for the product (source: Finding F1).

## Goals

1. Define a **structured error contract** ("What / Why / What next") that applies to
   every error surface in the CLI.
2. Define the **automation signalling contract** (exit codes, stream discipline, stable
   error IDs) so scripts and CI/CD can rely on it uniformly.
3. Define **rendering rules** for human-readable vs. machine-readable output, including
   how warnings and unexpected exceptions are handled.
4. Produce a ranked, citable evidence base that lets the Define stage write the PRD
   without re-litigating the research.

## Non-Goals

- Rewriting the copy of specific error messages command-by-command.
- Building the error-translation intelligence itself (that is a downstream design/eng
  effort; here we define where it plugs into the structure).
- Making strategic prioritisation or roadmap decisions (owned by the Strategist).

## Research Questions

| # | Question | Primary evidence |
|---|----------|------------------|
| RQ1 | What fields must a structured error carry to satisfy the "What / Why / What next" contract? | F1, F2, F3 |
| RQ2 | How should the structure distinguish user-input vs. environment vs. service causes? | F3 |
| RQ3 | What is the required automation signalling contract (exit codes, streams, error IDs)? | F5, F6 |
| RQ4 | How should the same structured error be rendered for humans vs. machines? | F4, F7 |
| RQ5 | How should warnings and unexpected exceptions be classified within the structure so they never contaminate structured output? | F7, F8 |
| RQ6 | Where does an AI-assist / explanation hook attach to the structure? | F9 |
| RQ7 | What do leading CLIs (git, kubectl, gh, cargo, npm, aws, terraform) do structurally that we can learn from? | Competitive analysis |

## Method

- **Secondary analysis / synthesis** of the prior 115-verbatim HaTS UXR (source of
  truth). No new primary research is conducted in this pass; the sample is already
  validated and thematically saturated.
- **Re-framing** of validated themes T1–T9 and opportunities O1–O6 around the concept of
  a defined *structure/contract* rather than isolated fixes.
- **Competitive analysis** (reasoned, non-fabricated) of error-handling patterns in
  widely used CLIs to inform structural options — see `competitive-analysis.md`.

## Audience / Segments (from prior UXR)

| Segment | Primary need from the structure | Source |
|---------|--------------------------------|--------|
| Interactive operator / cloud engineer | Diagnostic + actionable, readable errors at the prompt | F1, F2, F3, F7 |
| DevOps / automation engineer | Reliable, uniform failure signalling for CI/CD | F5 |
| PowerShell automation user | Idiomatic errors: error stream, `-ErrorAction`, typed exceptions/error IDs | F6 |

## Success Criteria

The error-handling structure is "good" when:

- **Contract completeness** — every user-facing error carries What / Why / What next.
- **Cause disambiguation** — the structure can classify user-input vs. environment vs.
  service causes rather than passing through a symptom (addresses T2).
- **Signalling reliability** — failures always exit non-zero and write to stderr; errors
  carry a stable machine-readable ID; behaviour is uniform across command groups.
- **Dual rendering** — one structured payload renders cleanly for humans (de-nested, no
  raw tracebacks) and for machines (clean JSON, no warning contamination).
- **Extensibility** — the structure exposes a defined hook for AI-assisted explanation.
- **Evidence-traceable** — every structural requirement maps to a cited finding.

## Next Steps

- See `findings-synthesis.md` for validated themes and ranked opportunity areas framed
  around the structure/contract.
- See `competitive-analysis.md` for structural patterns from leading CLIs.
- Hand off to the Define stage (Strategist) to convert ranked opportunities O1–O6 into a
  PRD and problem statements.
