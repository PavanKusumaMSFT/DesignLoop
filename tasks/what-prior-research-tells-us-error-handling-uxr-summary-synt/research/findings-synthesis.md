---
title: "Findings Synthesis — Azure CLI & PowerShell Error Handling"
phase: discover
status: approved
created: 2026-06-23
updated: 2026-06-23
author: "Strategist Agent"
related: ["web/error-handling-uxr-summary.md", "../strategy/problem-statements.md"]
---

# Findings Synthesis — Azure CLI & PowerShell Error Handling

> **Assumption note:** No prior Discover-stage artifacts existed for this task. This
> synthesis is derived directly from the single source of truth —
> `research/web/error-handling-uxr-summary.md` (Zainab Alasadi, UXR, May 2026), which
> analyses 115 error-related open-text HaTS responses (Oct 2022 – Jun 2026; ~75% Azure
> CLI, ~25% Azure PowerShell). It exists to give the Define stage a ranked, citable
> evidence base. Every theme below traces to verbatims in the source.

## Overview

Across 115 verbatims, error handling is the dominant dissatisfaction driver for Azure
CLI and Azure PowerShell. Users can tell *something* failed but rarely *what*, *why*, or
*what to do next*. The pain spans two distinct surfaces — interactive humans
troubleshooting at the prompt, and automation/CI-CD pipelines that depend on reliable
failure signalling. A rising 2024–2026 signal shows users routing errors through AI
assistants to make them usable, raising the quality bar.

## Validated Themes (ranked by prevalence)

| # | Theme | Prevalence | Primary surface | Source finding |
|---|-------|-----------|-----------------|----------------|
| T1 | Errors are vague/cryptic — *what* failed is unclear | #1 most cited | Interactive + Auto | F1 |
| T2 | Errors are misleading — wrong symptom, wrong root cause | #2 most cited | Interactive | F3 |
| T3 | Errors say *what* but not *how to fix* — no path forward | High | Interactive | F2 |
| T4 | Output formatting unreadable — escaped JSON-in-JSON, walls of text | High | Interactive + Auto | F4 |
| T5 | Inconsistent failure signalling (exit codes, stderr/stdout) breaks automation | High (DevOps) | Automation | F5 |
| T6 | Cmdlet inconsistency violates PowerShell norms (ErrorAction, error stream, throw vs null) | High (PS segment) | Automation + Interactive | F6 |
| T7 | Raw Python tracebacks leak to end users | Moderate | Interactive | F7 |
| T8 | Warning noise / fatigue; warnings contaminate structured output | Moderate | Interactive + Auto | F8 |
| T9 | Users increasingly rely on AI assistants to decode errors | Emerging (2024–26) | Both | F9 |

## Key Insights

1. **Errors fail the basic "What / Why / What next" contract.** The most prevalent
   complaint (T1) plus T2 and T3 together mean the error is neither diagnostic nor
   actionable. Users are dropped into a problem with no route out and must leave the
   tool (Portal, Support, AI) to recover. *(F1, F2, F3)*

2. **The CLI/PS is a passthrough, not a translator.** Errors surface the literal
   service/symptom (auth, role, "conditional access") instead of the true cause
   (network, firewall, OS/version, missing config), actively misdirecting
   troubleshooting for hours or days. *(F3)*

3. **Presentation destroys otherwise-present information.** Even when the cause is in
   the payload, nested escaped JSON and walls of text make it unreadable and therefore
   un-actionable. *(F4)*

4. **Automation has a separate, harder failure: unreliable signalling.** Inconsistent
   exit codes and stream usage vary by command group, forcing per-command handling and
   letting failures slip past CI/CD guardrails. For PS users this manifests as
   un-idiomatic error behaviour that breaks try/catch and `-ErrorAction`. *(F5, F6)*

5. **Implementation details leak.** Raw Python tracebacks signal poor quality and add
   cognitive load. *(F7)*

6. **Noise erodes trust.** Warnings bleed into structured output and can't be
   suppressed, producing fatigue that makes users ignore messages that matter. *(F8)*

7. **The quality bar is rising externally.** Users now benchmark Az error output against
   an LLM's explanation of it; "good enough" is being redefined by AI assistants. *(F9)*

## Ranked Opportunity Areas

| Rank | Opportunity | Themes addressed | Why it ranks here |
|------|-------------|------------------|-------------------|
| O1 | **Structured "What / Why / What next" error contract** rendered in plain language | T1, T2, T3 | Directly attacks the #1 and #2 pains and the recovery gap |
| O2 | **Error translation/disambiguation layer** (probe connectivity, permissions, environment) | T2, T3 | Converts the tool from passthrough to translator; saves hours/days |
| O3 | **Consistent automation signalling contract** (always stderr, always non-zero on failure, stable error IDs) | T5, T6 | Unblocks CI/CD and scripting at scale; foundational |
| O4 | **Human-readable error rendering** (de-nest/unescape JSON, visual hierarchy, concise mode) | T4, T7 | Makes existing information usable; suppresses raw tracebacks |
| O5 | **Warning hygiene & suppression controls** (no warnings in structured output, dismissable notices) | T8 | Restores trust in machine-readable output |
| O6 | **AI-assist hook for error explanation** | T9, T1 | Meets the rising bar; leverages users' existing behaviour |

## Audience Segments (evidence-grounded, for persona derivation)

- **Interactive operator / cloud engineer** — works at the prompt, hits cryptic and
  misleading errors, leaves the tool to recover. *(F1, F2, F3, F7)*
- **DevOps / automation engineer** — runs the CLI in CI/CD; depends on exit codes and
  stream discipline; broken by inconsistent signalling. *(F5)*
- **PowerShell automation user** — expects idiomatic `try/catch`, `-ErrorAction`, error
  stream, typed exceptions/error IDs. *(F6)*

## Next Steps

- Feed validated themes T1–T9 and opportunities O1–O6 into `strategy/problem-statements.md`.
- Derive personas from the three audience segments above.
- Map the current-state error journey to expose where recovery breaks down.
