---
title: "Competitive Analysis — Error-Handling Structure in Leading CLIs"
phase: discover
status: draft
created: 2026-07-20
updated: 2026-07-20
author: "Researcher Agent"
related: ["research-brief.md", "findings-synthesis.md"]
---

# Competitive Analysis — Error-Handling Structure in Leading CLIs

## Overview

This analysis compares how widely used developer CLIs *structure* their error handling,
to inform the error-handling structure for Azure CLI / Azure PowerShell. It is a
**reasoned analysis based on well-known, publicly documented behaviour** of these tools;
where a claim is general knowledge of the tool's design conventions it is presented as
such, and no specific figures or private data are invented. It should be validated
against current tool versions before being cited normatively in a PRD.

Each tool is scored against the structural layers derived in `findings-synthesis.md`:
content contract (What/Why/What next), cause classification, signalling contract
(exit code + stream + error ID), and rendering (human vs. machine, warning hygiene).

## Comparison Matrix

Legend: ● strong / defined · ◐ partial / inconsistent · ○ weak or absent.

| CLI | What/Why/What-next content | Cause hinting | Exit code discipline | stderr discipline | Stable error IDs | Human vs. machine rendering | Notable structural pattern |
|-----|:--:|:--:|:--:|:--:|:--:|:--:|----------------------------|
| **git** | ◐ | ◐ | ● | ● | ○ | ◐ | "hint:" lines suggest next actions; consistent non-zero exit and stderr |
| **kubectl** | ◐ | ◐ | ● | ● | ◐ | ● | Errors mirror structured API status objects (reason/message/code) |
| **gh** (GitHub CLI) | ● | ◐ | ● | ● | ○ | ● | Friendly plain-language errors with explicit next-step prompts |
| **cargo** (Rust) | ● | ● | ● | ● | ◐ | ◐ | Compiler-grade errors: error code, cause chain, "help:"/"note:" spans |
| **npm** | ◐ | ◐ | ● | ● | ● | ◐ | Stable error codes (e.g. `ERESOLVE`, `ENOENT`) + machine-readable log |
| **aws** (AWS CLI) | ◐ | ◐ | ● | ● | ● | ◐ | Service error codes surfaced; passthrough-heavy like Azure CLI |
| **terraform** | ● | ● | ● | ● | ◐ | ● | Diagnostics with severity, summary, detail, and source location |

## Patterns Worth Adopting

1. **Diagnostic object with severity + summary + detail (terraform).** Terraform's
   diagnostic model (severity, a one-line summary, a detailed body, and a pointer to the
   offending location) is close to the "What / Why / What next" contract and cleanly
   separates severity from content — directly relevant to our rank-1 and rank-5
   opportunities (findings F1, F8).

2. **Compiler-grade cause chains and typed help spans (cargo).** Cargo distinguishes the
   error, the underlying cause chain, and `help:`/`note:` guidance. This is a strong
   template for our `cause` + `cause_category` + `next_steps` fields (findings F2, F3).

3. **Stable, documented error codes (npm, aws).** `ERESOLVE`-style stable identifiers let
   scripts branch on error type without string-parsing — exactly what the PowerShell and
   automation segments asked for (findings F5, F6). This validates the `error_id` field.

4. **Structured status mirroring (kubectl).** kubectl reflects the API's structured
   status (reason/message/code), giving both a human line and a machine object from one
   source — supporting our dual-rendering rule (findings F4, F8).

5. **Actionable "hint:" affordance (git, gh).** git's `hint:` and gh's next-step prompts
   show that a low-cost, opt-in guidance line materially improves recovery — a cheap
   early win for the `next_steps` field (finding F2).

## Anti-Patterns to Avoid (shared with Azure CLI today)

| Anti-pattern | Seen in | Our matching pain |
|--------------|---------|-------------------|
| Passing through raw upstream/service error as-is | aws, azure cli | T2 misleading errors (F3) |
| Inconsistent signalling across sub-commands | (historically) several | T5 (F5) |
| Human-formatting noise mixed into machine output | many | T4, T8 (F4, F8) |
| Leaking runtime/implementation stack traces | interpreted-language CLIs | T7 (F7) |

## Implications for the Structure

- The strongest peers converge on a **typed diagnostic object** (severity + summary +
  detail + code + location), rendered separately for humans and machines. This
  independently corroborates the proposed structure in `findings-synthesis.md`.
- **Stable error IDs** are a solved, proven pattern (npm/aws) and should be
  non-negotiable in our signalling contract.
- No major peer has a strong, built-in **cause-classification / translation** layer —
  this is a differentiation opportunity for Azure CLI (rank 3), not just parity.

## Next Steps

- Validate the matrix against current tool versions before normative citation in the PRD.
- Prototype a diagnostic-object schema drawing on terraform's severity model and cargo's
  cause chain, tuned to the What / Why / What next contract.
- Hand structural patterns to the Define stage alongside the ranked opportunities.
