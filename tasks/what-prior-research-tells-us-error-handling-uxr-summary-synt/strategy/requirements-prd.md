---
title: "Product Requirements — Azure CLI & PowerShell Error Handling"
phase: define
status: draft
created: 2026-06-23
updated: 2026-06-23
author: "Strategist Agent"
related: ["../research/findings-synthesis.md", "problem-statements.md", "personas.md", "journey-map.md"]
---

# Product Requirements Document — Azure CLI & PowerShell Error Handling

## Overview

Defines what we will build to fix the error-handling experience in Azure CLI and Azure
PowerShell, grounded in `research/findings-synthesis.md`. Scope centres on how errors are
*detected, signalled, explained, and remediated*. Every must-have requirement carries
acceptance criteria and traces to a finding (F#), theme (T#), HMW, and persona.

## Goals

1. Make every error answer **What / Why / What-next** in plain language. *(O1)*
2. Translate misleading symptoms into true root causes. *(O2)*
3. Guarantee a uniform, automation-safe failure contract across CLI and PS. *(O3)*
4. Render errors readably and keep noise out of structured output. *(O4, O5)*

## Non-Goals

- Redesigning Azure *service-side* error payloads (we wrap/translate, not author them).
- Building a general-purpose AI chat assistant (AI explanation is scoped to errors only).
- Changing command syntax or non-error CLI/PS behaviour.

## Success Metrics

| Metric | Baseline | Target | Source signal |
|--------|----------|--------|---------------|
| Share of error-related HaTS verbatims that are negative | #1 dissatisfaction driver | ↓ 50% within 2 survey cycles | F1, F3 |
| Errors that include a concrete next action / specific doc link | Low (qualitative) | ≥ 90% of known error classes | F2/T3 |
| Command groups conforming to stderr + non-zero-on-failure contract | Inconsistent | 100% | F5/T5 |
| Az cmdlets honouring `-ErrorAction` + emitting typed error IDs | Inconsistent | 100% of Az cmdlets | F6/T6 |
| Raw tracebacks surfaced outside `--debug` | Occurs | 0 | F7/T7 |
| Warnings appearing in structured (JSON) output | Occurs | 0 | F8/T8 |

---

## Must-Have Requirements

### R1 — Three-part error contract (What / Why / What-next)
*Traces: F1/F2/T1/T3 · HMW-1, HMW-2 · Maya · O1*

Every surfaced error must present three labelled parts: a plain-language summary of what
happened (customer vocabulary, not a stack-trace excerpt), the likely cause(s), and 1–3
concrete next actions or an issue-specific doc link.

**Acceptance criteria**
- [ ] Given a failed command, the error output contains a **What happened** summary in
      plain language with no raw stack-trace text.
- [ ] The output contains a **Why** section naming likely cause(s) and classifying them
      as user-input, environment, or service issue.
- [ ] The output contains a **What to try next** section with 1–3 actionable steps **or**
      a documentation link specific to this error (not a generic docs landing page).
- [ ] For every catalogued error class, all three parts are populated (no empty sections).

### R2 — Misleading-symptom translation / disambiguation
*Traces: F3/T2 · HMW-3 · Maya · O2*

The CLI/PS must act as a translation layer that disambiguates common misleading errors by
probing the actual environment (connectivity, permissions, configuration) before
reporting a cause.

**Acceptance criteria**
- [ ] For an identified ambiguous error set (auth/role/conditional-access symptoms), the
      tool runs applicable checks (network/firewall reachability, effective permissions,
      required config) before composing the **Why**.
- [ ] When a probe identifies a more specific cause than the raw symptom, the reported
      cause reflects the probe result (e.g. firewall-block rather than "incorrect role").
- [ ] When probes are inconclusive, the error states which checks ran and which were
      ruled out, rather than asserting a single misleading cause.
- [ ] No requirement-R2 message attributes the failure to authorization when a
      connectivity/firewall probe has failed.

### R3 — Uniform failure-signalling contract (automation)
*Traces: F5/T5 · HMW-5 · Dev · O3*

Every command, in every command group, must signal failure consistently: errors to
**stderr** and a **non-zero exit code** on any failure.

**Acceptance criteria**
- [ ] On any command failure, the process exits with a non-zero code — verified across
      all command groups in an automated conformance test.
- [ ] On failure, error content is written to **stderr**, never stdout.
- [ ] On success, stdout contains only the requested output and the exit code is 0.
- [ ] A CI conformance suite asserts R3 for every command group and fails the build on any
      violation (prevents per-version regressions noted in F5).

### R4 — PowerShell-idiomatic cmdlet error behaviour
*Traces: F6/T6 · HMW-6 · Priya · O3*

Az cmdlets must conform to PowerShell error conventions: honour `-ErrorAction`, write to
the error stream, use consistent throw-vs-null semantics on not-found, and expose typed,
ID-bearing errors that can be handled programmatically.

**Acceptance criteria**
- [ ] `-ErrorAction SilentlyContinue` suppresses error display for every Az cmdlet
      (verified by test); `Stop` makes it catchable in `try/catch`.
- [ ] Terminating errors are emitted to the PowerShell error stream and are catchable
      with `try/catch`.
- [ ] Not-found behaviour is consistent and documented per cmdlet category (throw vs.
      return null), with no surprise throws where `NotExists` is expected.
- [ ] Each error carries a stable error ID / typed exception so callers branch without
      string-matching the message text.

### R5 — Human-readable error rendering
*Traces: F4/T4 · HMW-4 · Maya/Dev · O4*

Errors must render in a human-readable form: nested/escaped JSON de-nested and unescaped,
with clear visual hierarchy, and a concise default view.

**Acceptance criteria**
- [ ] Nested or escaped JSON in an error is parsed and rendered without raw escape
      sequences (no `\"`-style escaping shown to the user).
- [ ] The default error view presents a concise, hierarchically structured message
      (summary first), not an undifferentiated wall of text.
- [ ] Full structured detail remains retrievable on demand (e.g. a verbose/raw flag) for
      users who need the underlying payload.

### R6 — Suppress raw tracebacks
*Traces: F7/T7 · HMW-7 · Maya · O4*

Unhandled exceptions must be caught and presented as application-level messages; raw
tracebacks appear only when debug output is explicitly requested.

**Acceptance criteria**
- [ ] In normal (non-debug) mode, no raw Python traceback reaches the console — an
      unhandled exception yields an R1-shaped, application-level error instead.
- [ ] Full traceback is available when `--debug` (CLI) / debug preference (PS) is set.
- [ ] An unhandled-exception path is covered by a test asserting no traceback leaks
      without the debug flag.

### R7 — Clean structured output & warning suppression
*Traces: F8/T8 · HMW-8 · Dev · O5*

Warnings must not contaminate structured (machine-readable) output, and users must be
able to dismiss or suppress acknowledged notices.

**Acceptance criteria**
- [ ] When an output format is structured (e.g. `--output json`), no warning or notice
      text is written to the structured stream; warnings go to stderr only.
- [ ] A documented mechanism lets users suppress a specific warning/deprecation notice
      once acknowledged (e.g. flag or config setting), and it persists per the setting's
      scope.
- [ ] `--output json` produces a parseable document with zero non-JSON contamination,
      verified by a parse test.

---

## Should-Have Requirements

### R8 — In-tool AI-grade error explanation
*Traces: F9/T9 · HMW-9 · all personas · O6*

Offer an opt-in, in-tool capability to produce an LLM-grade explanation and suggested
resolution for an error, so users need not copy errors into external assistants.

**Acceptance criteria**
- [ ] A user can request an expanded explanation of the most recent error from within the
      tool.
- [ ] The explanation reuses the R1 contract structure (What / Why / What-next).
- [ ] The capability is opt-in and does not alter default error output.

## Out of Scope (this iteration)

- Localisation of translated error messages beyond existing CLI/PS language support.
- Service-team changes to the upstream Azure error payloads themselves.

## Constraints

- Must wrap existing Azure service errors without requiring upstream service changes (O2
  is a translation layer, per F3 recommendation).
- Must not break existing successful-path output contracts relied on by automation (R3
  applies only to the failure path; success output is unchanged).

## Traceability Matrix

| Req | Finding | Theme | HMW | Persona | Opportunity |
|-----|---------|-------|-----|---------|-------------|
| R1 | F1, F2 | T1, T3 | HMW-1, HMW-2 | Maya | O1 |
| R2 | F3 | T2 | HMW-3 | Maya | O2 |
| R3 | F5 | T5 | HMW-5 | Dev | O3 |
| R4 | F6 | T6 | HMW-6 | Priya | O3 |
| R5 | F4 | T4 | HMW-4 | Maya, Dev | O4 |
| R6 | F7 | T7 | HMW-7 | Maya | O4 |
| R7 | F8 | T8 | HMW-8 | Dev | O5 |
| R8 | F9 | T9 | HMW-9 | All | O6 |

## Next Steps

- Hand R1–R7 (must-haves) to the Ideate stage with `problem-statements.md` and
  `personas.md` as the HMW and audience framing.
- Prioritise R1 + R2 (the #1 and #2 research pains) as the first ideation focus.
