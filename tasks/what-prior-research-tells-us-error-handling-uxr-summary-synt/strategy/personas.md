---
title: "User Personas — Azure CLI & PowerShell Error Handling"
phase: define
status: draft
created: 2026-06-23
updated: 2026-06-23
author: "Strategist Agent"
related: ["../research/findings-synthesis.md", "problem-statements.md", "journey-map.md", "requirements-prd.md"]
---

# User Personas — Azure CLI & PowerShell Error Handling

## Overview

Three evidence-grounded personas derived from the audience segments in
`research/findings-synthesis.md`. Each is built only from validated HaTS verbatims
(Oct 2022 – Jun 2026) — no invented attributes. Citations reference findings (F#) and
themes (T#) from the source UXR summary. The ~75% CLI / 25% PowerShell response split
informs the relative weighting: Maya and Dev (CLI) represent the larger segment;
Priya (PowerShell) represents the distinct 25% with un-idiomatic-error pain.

---

## Persona 1 — Maya, the Interactive Cloud Engineer  *(primary · largest segment)*

> "Cryptic error messages if something doesn't work. It is not always clear what the
> problem is." — CLI, March 2024

**Segment:** Interactive operator / cloud engineer (Azure CLI). Represents the majority
CLI verbatim volume and the #1 and #2 pains.

**Context & behaviours**
- Works at the terminal provisioning and managing Azure resources interactively.
- When a command fails, reads the error inline and tries to act immediately.
- Falls back to the Azure Portal to find the *real* detail the CLI omitted. *(F1)*

**Goals**
- Understand *what* failed without leaving the terminal. *(F1/T1)*
- Get a concrete next action to recover and continue the workflow. *(F2/T3)*
- Trust that the reported cause is the real cause. *(F3/T2)*

**Pain points**
- Errors are vague/cryptic — "which one?" *(F1 — "at least one resource deployment operation failed.' Sure but which one?", CLI Apr 2023)*
- Misleading errors send her down the wrong path — a firewall block reported as a role error. *(F3 — CLI May 2023)*
- Has to open the Portal to see detailed information a deployment failure should have shown. *(F1 — CLI Jan 2026)*
- Occasional raw Python stack traces she can't act on. *(F7 — CLI Oct 2024)*

**Needs from the product**
- Plain-language *What / Why / What-next* error contract. *(O1)*
- Translation of misleading symptoms into true cause. *(O2)*

**Scenario**
Maya runs `az deployment group create`. It fails with *"at least one resource deployment
operation failed."* She can't tell which resource or why, opens the Portal to dig out the
detail, discovers it was a storage firewall rule — not the "authorization" the CLI hinted
at. Twenty minutes lost to a message that should have told her in one line.

---

## Persona 2 — Dev, the DevOps / Automation Engineer  *(primary · automation surface)*

> "Inconsistent return values, sometimes you have a message of failure and error code 0,
> sometimes ok. Makes CLI automation tricky as you cater for command specific response
> handling." — CLI, August 2024

**Segment:** DevOps / automation engineer running Azure CLI at scale in CI/CD.

**Context & behaviours**
- Invokes the CLI inside pipelines; relies on exit codes and stream discipline rather
  than reading output by eye.
- Writes per-command wrappers to compensate for inconsistent failure signalling. *(F5)*

**Goals**
- Have every command reliably signal failure (non-zero exit, errors on stderr). *(F5/T5)*
- Keep machine-readable output (JSON) clean of warnings. *(F8/T8)*
- Stop maintaining bespoke handling for each command group. *(F5)*

**Pain points**
- Some commands return 0 on failure; some write errors to stdout — failures slip past
  pipeline guardrails. *(F5 — CLI Jan 2025, Aug 2024)*
- Error behaviour changes between versions and "breaks automation." *(F5 — CLI Jan 2025)*
- Warnings contaminate JSON output, undermining trust in machine-readable results. *(F8 — CLI Jun 2024)*

**Needs from the product**
- Uniform failure contract: always stderr, always non-zero on error. *(O3)*
- Structured output free of warning noise. *(O5)*

**Scenario**
Dev's release pipeline calls an `az` command that fails but exits 0 and writes the error
to stdout. The pipeline marches on and ships a broken change. The post-mortem traces it
to mis-signalled failure — so Dev adds yet another command-specific guard, growing the
brittle wrapper layer he already maintains.

---

## Persona 3 — Priya, the PowerShell Automation User  *(secondary · the 25% segment)*

> "…to find out what happened, I have to parse JSON of the $error object… That in general
> is totally inconsistent with the spirit of PowerShell error handling." — PS, August 2024

**Segment:** Azure PowerShell user (the distinct ~25% segment) who expects idiomatic PS
error semantics.

**Context & behaviours**
- Automates Azure with Az cmdlets inside PowerShell scripts using `try/catch`, the
  pipeline, and `-ErrorAction`.
- Expects typed exceptions / error IDs to branch on programmatically. *(F6)*

**Goals**
- Handle errors idiomatically with `try/catch` and `-ErrorAction`. *(F6/T6)*
- Predictable behaviour on "not found" (consistent throw vs. null). *(F6)*
- A stable error ID / typed exception instead of parsing message text. *(F6)*

**Pain points**
- `-ErrorAction SilentlyContinue` is ignored; cmdlets emit errors anyway. *(F6 — PS Jun 2024)*
- Some cmdlets throw on not-found when `NotExists` is expected; others return null. *(F6 — PS Aug 2023)*
- No error sent to the error stream; must parse `$error` JSON / message text. *(F6 — PS Aug 2024)*
- Az "feels more like a collection of modules than one cohesive experience." *(F6 — PS Jul 2024)*

**Needs from the product**
- Cmdlet error behaviour standardized to PowerShell conventions. *(O3)*
- Programmatically catchable, typed/ID-bearing errors. *(O3)*

**Scenario**
Priya wraps a role-assignment cmdlet in `try/catch` with `-ErrorAction SilentlyContinue`,
expecting a clean "not found" path. The cmdlet ignores `-ErrorAction`, throws on a
not-found that she expected to be normal, and gives her no error ID — so she resorts to
string-matching the message, the exact anti-pattern PowerShell exists to avoid.

---

## Persona Comparison

| Dimension | Maya (Interactive CLI) | Dev (DevOps CLI) | Priya (PowerShell) |
|-----------|------------------------|------------------|--------------------|
| Surface | Terminal, interactive | CI/CD pipelines | PS scripts/automation |
| Reads errors by | Eye, in the moment | Exit code / stream | try/catch, error ID |
| Top pain | Vague & misleading errors (T1, T2) | Inconsistent signalling (T5) | Un-idiomatic cmdlets (T6) |
| Key need | What/Why/What-next + translation (O1, O2) | Uniform failure contract (O3) | PS-idiomatic typed errors (O3) |
| Segment size | Largest (CLI ~75%) | Large (CLI subset) | ~25% (PS) |

## Next Steps

- Use Maya's interactive flow as the spine of `journey-map.md`.
- Carry each persona's key need into must-have requirements in `requirements-prd.md`.
