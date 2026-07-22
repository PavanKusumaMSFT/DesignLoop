---
title: "Problem Statements — A Good Error-Handling Structure inside the CLI"
phase: define
status: draft
created: 2026-07-20
updated: 2026-07-20
author: "Strategist Agent"
related: ["../research/findings-synthesis.md", "../research/research-brief.md", "../research/competitive-analysis.md", "personas.md", "journey-map.md", "requirements-prd.md"]
---

# Problem Statements — A Good Error-Handling Structure inside the CLI

## Overview

This document converts the six ranked opportunities from the Discover stage
(`../research/findings-synthesis.md`) into **How Might We (HMW)** problem statements.
Each HMW is ranked, scoped to *structure* (contract, schema, and rendering rules — not
per-message copy), and traced back to a specific research finding (F1–F9) and theme
(T1–T9). These HMWs frame the requirements captured in `requirements-prd.md`.

The through-line: individual error messages are symptoms; the root cause of the #1
dissatisfaction driver is the **absence of a defined error-handling structure**. The
HMWs below attack that structure as three concentric layers — a content contract, a
signalling contract, and rendering rules — plus an AI-assist extension point.

## Ranked How Might We Statements

| Rank | HMW | Grounded in (finding / theme) | Structural layer | Success signal |
|------|-----|-------------------------------|------------------|----------------|
| 1 | **HMW guarantee that every CLI error tells the user *what* failed, *why*, and *what to do next* — as mandated schema fields, not optional copy?** | F1, F2, F3 / T1, T2, T3 | Content contract (spine) | Every user-facing error carries `summary`, `cause`, `next_steps` |
| 2 | **HMW make failure signalling uniform and machine-trustworthy across every command group — always non-zero exit, always stderr, always a stable error ID?** | F5, F6 / T5, T6 | Signalling contract | Scripts branch on `error_id`/exit code without string-parsing; 0% of failures exit 0 or write errors to stdout |
| 3 | **HMW turn the CLI from a passthrough into a translator by classifying the *cause* of every error (user-input / environment / service / permission)?** | F3 / T2, T3 | Content contract (`cause_category`) | Misleading-symptom errors are re-labelled to true cause category; misdirected-troubleshooting time drops |
| 4 | **HMW render one structured error payload cleanly for both humans (de-nested, no raw tracebacks) and machines (clean JSON, no noise)?** | F4, F7 / T4, T7 | Rendering rules | No escaped JSON-in-JSON in human view; no raw traceback unless debug flag set |
| 5 | **HMW keep warnings and informational output from ever contaminating structured machine output, while remaining suppressible?** | F8 / T8 | Rendering rules (severity) | Machine output channels contain zero warning text; warnings suppressible via flag/env |
| 6 | **HMW expose stable, machine-readable metadata so an AI assistant can reliably explain any CLI error?** | F9 / T9, T1 | Extension point (AI-assist hook) | `error_id` + `cause_category` + `docs_url` present and stable for LLM consumption |

## Problem Statement Detail

### HMW-1 — Guarantee the What / Why / What-next contract
Users can tell that *something* failed but rarely *what*, *why*, or *what to do next*
(F1, F2). Because no field is *guaranteed* to exist, this cannot be fixed message by
message. Mandating `summary` / `cause` / `next_steps` converts an open-ended copy
problem into a schema-conformance problem. **This is the spine; all other HMWs attach
to it.**

### HMW-2 — Uniform, machine-trustworthy signalling
Even a perfect message is useless to a pipeline if failure exits 0 or writes to stdout
(F5). PowerShell users additionally need idiomatic error-stream behaviour, `-ErrorAction`
support, and typed error IDs (F6). Signalling is **foundational and independently
blocking** for automation and must be enforced structurally, not per-command.

### HMW-3 — Cause classification / translation layer
The most damaging pain is misleading errors — a firewall block reported as a role error;
"conditional access" with no policy pointer; days lost to an OS incompatibility (F3).
These are passthrough failures. A `cause_category` field (user-input | environment |
service | permission) makes the CLI a **translator**. This is the highest-leverage *new*
field and, per competitive analysis, a differentiation opportunity — no major peer CLI
ships a built-in cause-classification layer.

### HMW-4 — Dual rendering rules
Information that is already present is destroyed by presentation: escaped JSON-in-JSON,
walls of text (F4), and raw Python tracebacks (F7). One structured payload must render a
de-nested, hierarchical human view and a clean machine view, with unexpected exceptions
wrapped so contract fields still appear.

### HMW-5 — Severity classes & warning hygiene
Warnings leak into JSON and cannot be suppressed (F8). The structure needs severity
classes (error / warning / info) where only errors participate in exit-code/stderr
semantics and structured output is never contaminated by warnings.

### HMW-6 — AI-assist explanation hook
Users already paste errors into AI assistants to decode them (F9). The schema should
expose stable metadata (`error_id`, `cause_category`, `docs_url`) designed for LLM
consumption. This depends on HMW-1–3 existing first.

## Next Steps

- Feed HMW-1–3 (the spine) into the must-have requirements in `requirements-prd.md`.
- Use these HMWs to frame persona goals in `personas.md` and pain points in
  `journey-map.md`.
- Hand ranked HMWs to the Ideate stage as the problem framing for solution generation.
