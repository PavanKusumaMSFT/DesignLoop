---
title: "Problem Statements & How Might We — Error Handling"
phase: define
status: draft
created: 2026-06-23
updated: 2026-06-23
author: "Strategist Agent"
related: ["../research/findings-synthesis.md", "personas.md", "journey-map.md", "requirements-prd.md"]
---

# Problem Statements & How Might We — Azure CLI & PowerShell Error Handling

## Overview

This document reframes the validated research themes (T1–T9) from
`research/findings-synthesis.md` into problem statements and open-ended *How Might We*
(HMW) questions. Each statement names a specific user, their unmet need, and the
research insight that surfaces it. Every item traces to a finding (F#) and theme (T#)
from the source UXR summary.

## How to read this

- **PS-n** — Problem statement (user · need · insight).
- **HMW-n** — Reframed opportunity for ideation, deliberately solution-agnostic.
- **Trace** — Finding/theme and a representative verbatim from the source.

---

## PS-1 — Cryptic errors block diagnosis (T1, #1 pain)

**A cloud engineer** working interactively **needs to understand what actually failed**
**because** today's errors are generic and cryptic — they confirm something broke but
not what, forcing a context-switch to the Portal just to read the real detail.

- **Trace:** F1/T1 — *"Error messages are often useless 'at least one resource deployment operation failed.' Sure but which one?"* (CLI, Apr 2023)
- **HMW-1:** How might we make every error state, in plain language, *what* specifically failed — without the user leaving the terminal?

## PS-2 — Errors offer no path to recovery (T3)

**An engineer mid-workflow** **needs a concrete next action to recover** **because**
errors tell them what failed but not how to fix it, dropping them into a problem with no
way forward and pushing them to Support or AI to translate.

- **Trace:** F2/T3 — *"Some error messages could be more precise to indicate what I should change to fix an error…"* (CLI, Jun 2023)
- **HMW-2:** How might we turn every error into a starting point for resolution — surfacing the corrected command, remediation step, or issue-specific doc?

## PS-3 — Misleading errors waste hours of troubleshooting (T2, #2 pain)

**A cloud engineer** troubleshooting a failure **needs the reported cause to reflect the
real root cause** **because** errors surface a symptom (auth, role, "conditional access")
when the true cause is elsewhere (network, firewall, OS/version, config) — costing hours
to days of misdirected effort.

- **Trace:** F3/T2 — *"…if the storage account firewall is blocking the connection, the reported error is that you don't have the correct role."* (CLI, May 2023)
- **HMW-3:** How might we make the CLI/PS a translation layer that disambiguates a misleading symptom into its true cause (connectivity, permissions, environment)?

## PS-4 — Unreadable formatting hides the answer (T4)

**An engineer reading an error** **needs output they can parse at a glance** **because**
errors arrive as stringified JSON-within-JSON and walls of text, so even when the cause
is present it's buried behind escaping and has no visual hierarchy.

- **Trace:** F4/T4 — *"…error messages are almost always stringified JSON, within another JSON… very unreadable and thus less actionable."* (CLI, Oct 2023)
- **HMW-4:** How might we render errors in a human-readable form — de-nested, unescaped, with clear hierarchy — so the cause is obvious without manual parsing?

## PS-5 — Inconsistent failure signalling breaks automation (T5)

**A DevOps/automation engineer** running the CLI in CI/CD **needs every command to signal
failure reliably** **because** exit codes and stream usage vary by command group (some
return 0 on failure, some write errors to stdout), so failures slip past pipeline
guardrails and every command needs bespoke handling.

- **Trace:** F5/T5 — *"Inconsistent return values, sometimes you have a message of failure and error code 0… Makes CLI automation tricky."* (CLI, Aug 2024)
- **HMW-5:** How might we guarantee a uniform failure contract — errors always to stderr, always a non-zero exit code — across every command group?

## PS-6 — Az cmdlets violate PowerShell norms (T6)

**A PowerShell automation user** **needs Az cmdlets to behave idiomatically** **because**
inconsistent handling (throw vs. null on not-found, ignored `-ErrorAction`, errors not
written to the error stream, no typed exception/error ID) breaks the try/catch and
pipeline patterns they rely on.

- **Trace:** F6/T6 — *"…I have to parse the text of the error message. That in general is totally inconsistent with the spirit of PowerShell error handling."* (PS, Aug 2024)
- **HMW-6:** How might we make Az cmdlet error behaviour idiomatic to PowerShell — honouring `-ErrorAction`, the error stream, and programmatically catchable typed errors?

## PS-7 — Raw tracebacks leak implementation details (T7)

**An interactive user** **needs unexpected failures handled gracefully** **because** raw
Python stack traces leak to the console outside debug mode, are not actionable, raise
cognitive load, and signal poor product quality.

- **Trace:** F7/T7 — *"…the CLI throws up an ugly Python stack trace; I wish runtime errors were a little better insulated…"* (CLI, Oct 2024)
- **HMW-7:** How might we catch unhandled exceptions and present a helpful, application-level message instead of a raw traceback (reserving traces for debug mode)?

## PS-8 — Warning noise erodes trust (T8)

**Both interactive and automation users** **need a clean, trustworthy signal** **because**
warnings contaminate structured output (e.g. JSON) and can't be suppressed once
acknowledged, producing warning fatigue that makes users ignore messages that matter.

- **Trace:** F8/T8 — *"Error message (or warning) appears when using JSON output !!!"* (CLI, Jun 2024)
- **HMW-8:** How might we keep structured output clean of warnings and let users dismiss or suppress notices they've already acknowledged?

## PS-9 — The "good error" bar is rising via AI (T9, emerging)

**Users of both tools** **increasingly expect LLM-quality error explanations** **because**
they already route Az errors through Copilot/ChatGPT/Claude to decode them — benchmarking
native output against an AI's explanation of it.

- **Trace:** F9/T9 — *"I strongly believe the error messages could be analyzed by an AI… to describe clearer the error and options to resolve the problem."* (CLI, May 2026)
- **HMW-9:** How might we meet (or embed) AI-grade error explanation so users don't have to leave the tool to understand a failure?

---

## Priority HMW set for Ideation

Ranked to match opportunity areas O1–O6 in the findings synthesis:

1. **HMW-1 + HMW-2 + HMW-3** → a structured *What / Why / What-next* + translation contract (O1, O2). *Highest impact: the #1 and #2 pains.*
2. **HMW-5 + HMW-6** → a uniform automation failure contract across CLI and PS (O3).
3. **HMW-4 + HMW-7** → human-readable rendering, no raw tracebacks (O4).
4. **HMW-8** → warning hygiene and suppression (O5).
5. **HMW-9** → AI-assisted explanation (O6).

## Next Steps

- Derive personas from the three evidence-grounded segments → `personas.md`.
- Map the current-state error journey → `journey-map.md`.
- Translate the priority HMW set into must-have requirements → `requirements-prd.md`.
