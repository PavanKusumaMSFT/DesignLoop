---
title: "Current-State Journey Map — Encountering an Error in Azure CLI / PowerShell"
phase: define
status: draft
created: 2026-06-23
updated: 2026-06-23
author: "Strategist Agent"
related: ["../research/findings-synthesis.md", "problem-statements.md", "personas.md", "requirements-prd.md"]
---

# Current-State Journey Map — Encountering an Error in Azure CLI / PowerShell

## Overview

The current-state journey a user travels from running a command to (eventually)
recovering from its failure. Primary actor is **Maya** (interactive CLI engineer), with
**Dev** (DevOps) and **Priya** (PowerShell) divergences called out where the automation
path differs. Every pain point and opportunity traces to findings (F#) / themes (T#) in
`research/findings-synthesis.md`.

## Scenario

Maya runs a deployment command that fails. She must figure out what broke, why, and how
to fix it — using only the error the tool gives her.

## Journey Stages

| Stage | 1. Run command | 2. Failure occurs | 3. Read the error | 4. Interpret cause | 5. Find a fix | 6. Recover / retry |
|-------|----------------|-------------------|-------------------|--------------------|----------------|--------------------|
| **User actions** | Executes `az`/Az cmdlet | Command exits / returns | Scans console output | Tries to map error → root cause | Searches docs, Portal, Support, AI | Edits command/config, re-runs |
| **Tools/touchpoints** | Terminal / pipeline | Exit code, stderr/stdout | Error text (often JSON-in-JSON) | The error message itself | Azure Portal, docs, ChatGPT/Copilot/Claude | Terminal |
| **Thoughts** | "This should just work." | "Did it fail? It said code 0…" *(Dev)* | "Why is this a wall of escaped JSON?" | "It says role — but is that really it?" | "I have to leave the tool to understand my own error." | "Hope I guessed the real cause." |
| **Emotions** | 🙂 Confident | 😐 Uncertain | 😖 Frustrated | 😠 Misled | 😞 Resigned / dependent | 😤 Relieved but wary |

## Pain Points by Stage

**Stage 2 — Failure occurs**
- *(Dev/T5)* Inconsistent signalling: failure may exit 0 or write to stdout, so the
  failure isn't reliably detected at all. — *"sometimes you have a message of failure and
  error code 0"* (CLI, Aug 2024) · *(F5)*
- *(Priya/T6)* `-ErrorAction` ignored; not-found throws unexpectedly. *(F6)*

**Stage 3 — Read the error**
- *(T4)* Stringified JSON-within-JSON and walls of text; no visual hierarchy. — *"very
  unreadable and thus less actionable"* (CLI, Oct 2023) · *(F4)*
- *(T7)* Raw Python tracebacks leak to the console. *(F7)*
- *(T8)* Warnings contaminate the output she's trying to read. *(F8)*

**Stage 4 — Interpret cause** *(highest-friction stage)*
- *(T1)* Vague/cryptic: "which one?" — she knows it failed, not what failed. *(F1)*
- *(T2)* Misleading: a firewall block reported as a role error sends her down the wrong
  path for hours/days. — *"took our team three days to figure out"* (CLI, Feb 2025) · *(F3)*

**Stage 5 — Find a fix**
- *(T3)* Error gives no remediation; points to generic docs landing pages, not the
  specific issue. — *"pointing to general documentation instead of specific ones"*
  (CLI, Mar 2026) · *(F2)*
- *(T9)* She leaves the tool entirely — Portal, Support, or an AI assistant — to translate
  her own error. *(F9)*

**Stage 6 — Recover / retry**
- Recovery is guesswork because the true cause was never confirmed (loops back to Stage 4
  if the guess was wrong). *(F1, F3)*

## Opportunity Annotations

| Stage | Opportunity | Theme | Maps to |
|-------|-------------|-------|---------|
| 2 | Uniform failure contract — always non-zero exit + stderr; idiomatic PS errors | T5, T6 | O3 |
| 3 | Human-readable rendering — de-nest/unescape JSON, hierarchy; suppress raw tracebacks; keep warnings out of structured output | T4, T7, T8 | O4, O5 |
| 4 | State *what* failed in plain language; translate misleading symptom → true cause (probe connectivity/permissions/environment) | T1, T2 | O1, O2 |
| 5 | Provide 1–3 concrete next actions and an issue-specific doc link in-line | T3 | O1 |
| 5 | Offer in-tool AI-grade explanation so the user need not leave | T9 | O6 |
| 6 | Confirmed cause → reliable single-pass recovery (no guess-and-loop) | T1, T2 | O1, O2 |

## Key Moments of Truth

1. **Stage 4 (Interpret cause)** is where the journey breaks down most — vague and
   misleading errors here convert a quick fix into hours of misdirected work. Fixing the
   *What / Why* contract (O1) and translation (O2) has the highest leverage.
2. **Stage 5 (Find a fix)** is where users abandon the tool for Portal/Support/AI. A
   remediation step + specific doc link keeps them in the workflow (O1, O6).
3. **Stage 2 (Failure occurs)** is the silent killer for Dev — a failure that isn't
   signalled is never even noticed until it ships (O3).

## Next Steps

- Translate Stage-4/5 opportunities (O1, O2) and the Stage-2 signalling contract (O3)
  into must-have requirements in `requirements-prd.md`.
