---
title: "Observation Sheet: AI-Assisted Azure CLI Error Handling (Project Cirrus)"
phase: test
status: draft
created: 2026-06-23
updated: 2026-06-23
author: "Tester Agent"
related: ["ai-cli-error-handling-test-plan.md", "ai-cli-error-handling-task-scripts.md"]
---

# Observation Sheet: AI-Assisted Azure CLI Error Handling (Project Cirrus)

Use one copy per participant. Capture facts, not interpretations, during the session.

## Session Header

| Field | Value |
|-------|-------|
| Participant ID | P__ |
| Date / Time | |
| Moderator | |
| Note-taker | |
| Azure CLI expertise | none / some / strong |
| Screen-reader user? | no / yes (AT + OS: ____) |

## Severity Scale (for logging issues)

| Severity | Meaning |
|----------|---------|
| Critical | Could not proceed / would have caused data or money loss |
| High | Major friction; error, wrong action, or would abandon |
| Medium | Completed with effort, confusion, or extra steps |
| Low | Minor / cosmetic |

---

## Task 1 — Make sense of the failure

| Observation | Capture |
|-------------|---------|
| Recognised command failed? | Y / N |
| Identified resource group missing (unaided)? | Y / N |
| Distinguished warning (yellow) from error (red)? | Y / N |
| Unaided next-step plan (verbatim) | |
| Time to understand the error | ____ s |
| Confusion / hesitation points | |
| Self-fix confidence (1–5) | |

---

## Task 2 — Notice and interpret the AI help

| Observation | Capture |
|-------------|---------|
| Noticed AI help appeared? | Y / N |
| Understood / guessed how it was triggered? *(F1)* | Y / N — notes: |
| Wanted to cancel / waited comfortably during "Analyzing…"? *(F4/A-05)* | comfortable / impatient / looked for cancel |
| Identified the true blocking issue (item 6, missing RG)? *(F2)* | Y / N |
| Treated all 6 issues as equal vs. prioritised? *(F2/F9)* | equal / prioritised |
| Comprehension of the 6-issue list (1–5) | |
| Confusion points (verbatim) | |
| Issues logged (ID + severity) | |

---

## Task 3 — Decide whether to run the suggested commands

| Observation | Capture |
|-------------|---------|
| Decision taken | run as-is / review first / edit / reject / unsure |
| Reviewed command before running? *(F3/F10)* | Y / N |
| Tried to copy / retype / find a "run" control? *(F7/A-07)* | copy / retype / looked for control / n/a |
| Noticed AI-injected values (region/subscription/SKU/names)? *(F5)* | which: |
| Caught invalid SKU `Standard_D2vs_v3`? *(F6)* | Y / N |
| Noticed `--admin-password` / billable-resource risk? *(F3)* | Y / N |
| When did they read the "may be incorrect" caveat? *(F10)* | before deciding / after / never |
| Trust in suggestion (1–5) | |
| Time from AI output shown to stated decision | ____ s |
| Issues logged (ID + severity) | |

---

## Task 4 — Screen-reader pass (AT participants only)

| Observation | Capture |
|-------------|---------|
| Alerted that AI help appeared? *(A-04)* | announced / silent until navigated |
| Could read all 6 issues in order? | Y / N |
| Could read both suggested commands? | Y / N |
| Long wrapped command read coherently? *(A-06)* | Y / N |
| Could read the disclaimer? | Y / N |
| Cursor blink disruptive / motion reduced? *(A-05)* | notes: |
| Ease: knew AI responded (1–5) | |
| Ease: read issues + commands in order (1–5) | |
| Issues logged (ID + severity) | |

---

## Expected vs. Actual Path Tracker

| Step | Expected | Actual | Match? |
|------|----------|--------|--------|
| Read & understand error | Identifies missing resource group | | Y/N |
| Engage AI help | Notices + reads AI output | | Y/N |
| Identify blocking issue | Picks item 6 | | Y/N |
| Handle suggested commands | Reviews before running, edits unknowns | | Y/N |
| Reach valid corrected command | Produces a runnable, reviewed command | | Y/N |

## Per-Participant Issue Log

| Issue ID | Task | Description (what happened) | Linked finding (F#/A-#) | Severity | Verbatim quote |
|----------|------|-----------------------------|--------------------------|----------|----------------|
| | | | | | |

## Post-Task & Session Ratings

| Measure | Value |
|---------|-------|
| Task 1 difficulty (1–5) | |
| Task 2 comprehension (1–5) | |
| Task 3 trust (1–5) | |
| Error-recovery confidence (1–5) | |
| Overall experience (1–5) | |
| SUS score (0–100) | |

## Moderator Notes / Standout Quotes

> 

## Cross-Reference Key

Findings referenced above come from the Round 1 Tenets & Traps evaluation (F1–F11) and the
accessibility audit (A-04–A-07). Use the same IDs when logging so synthesis can roll session
evidence up to each finding and confirm/raise/lower its severity.
