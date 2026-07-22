---
title: "Project Cirrus — HMW Reframing for Divergent Ideation"
phase: ideate
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Ideator Agent"
related:
  - "strategy/problem-statements.md"
  - "strategy/personas.md"
  - "strategy/journey-map.md"
  - "strategy/requirements-prd.md"
  - "research/findings-synthesis.md"
---

# HMW Reframing: An Inline, Non-Modal Azure CLI Intelligence Layer

This document sharpens the six validated Define-phase problem statements into a crisp, open-ended set of **How Might We** questions tuned for divergent ideation. The Define HMWs were framed to prove the strategic thesis; these reframed HMWs are framed to *provoke solution generation* — each is deliberately open enough to yield many distinct concepts, yet gated by the two non-negotiable constraints: **NG1 (no dedicated Azure TUI mode)** and **FR-5 (full interoperability — non-az always runs natively)**.

## Overview

The reframing keeps the original HMW numbering (HMW-1…HMW-6) so every downstream concept traces cleanly back to a ranked problem statement and its evidence. For each, we restate the *tension to resolve* (the design conflict that makes it interesting), the *personas most served*, and the *gate implication* every concept must honour. Two "twin pillar" HMWs (HMW-1 intelligence-without-mode, HMW-2 never-trap) anchor the set; HMW-4/5 are near-equal must-haves; HMW-3 is the portability differentiator; HMW-6 is the AI-terminal adjacency to compose with.

The whole set converges on one design question: **How might we deliver expert-grade Azure intelligence *in place*, everywhere users already work, with nothing to enter or exit and nothing that ever traps the compositional user?**

## Reframed How Might We Questions

### HMW-1 — Valued intelligence, zero mode
**How might we surface dynamic resource lookups, next-command hints, and syntax guidance the instant a user types `az` — so the intelligence feels like a native property of their shell rather than a place they visit?**
- **Tension:** The capability was praised (T5) but the container was rejected (T1/T2). Deliver the value, drop the vessel.
- **Personas:** David (primary), Maya, Priya.
- **Gate implication:** Suggestions must render *inline*; accepting one must never launch or switch into a separate program (NG1). Serves Journey Stages 2–5.

### HMW-2 — Never trap the compositional user
**How might we make Azure intelligence step aside so completely that `kubectl`, `pwsh`, `git`, `aws`, and `gcloud` run natively with zero extra steps — no prefix, no wrapper, no exit?**
- **Tension:** Any Azure-aware layer risks intercepting the input line; it must be invisible to non-az commands (T3, contrast the `#`-prefix workaround).
- **Personas:** Maya (interoperability gate), David (Journey Stage 9), Priya.
- **Gate implication:** This *is* FR-5. A concept that cannot pass Maya's tmux + mixed-toolchain stress test is disqualified.

### HMW-3 — Intelligence that travels
**How might we make the same Azure intelligence appear wherever Azure work already happens — IDE terminal, Cloud Shell, CI/CD, remote/SSH, and AI terminals — degrading gracefully where a surface can't render rich UI?**
- **Tension:** Rich inline UX and universal reach pull in opposite directions; portability demands graceful degradation, not a lowest-common-denominator retreat.
- **Personas:** David (IDE + Cloud Shell), Priya (AI terminals + remote), Maya (CI/CD).
- **Gate implication:** No concept may assume a customised local shell (NG3); each must define its rich → plain fallback.

### HMW-4 — Expert value, no stigma
**How might we frame and surface discoverability so it reads as expert-grade, additive tooling a daily user reaches for on tap — never as "beginner mode" training wheels?**
- **Tension:** Discoverability historically signalled "for newcomers" (T4), capping repeat use. Must be dismissible, neutral in copy, and genuinely useful to experts.
- **Personas:** David (primary), Maya, Priya.
- **Gate implication:** Additive + dismissible; no onboarding framing; never blocks command entry.

### HMW-5 — Fast enough to keep, stable enough to trust
**How might we make every inline suggestion sub-perceptible (p95 ≤ 100 ms), cached, non-blocking, and fail-soft — so we never slow a keystroke or add a startup penalty?**
- **Tension:** Live resource lookups are inherently network-bound; the concept must reconcile freshness with a hard latency budget via async, time-boxed, cached patterns.
- **Personas:** Maya (uninstalls anything that blocks a keystroke), David, Priya.
- **Gate implication:** Network lookups async + time-boxed (≤ 500 ms → free-text fallback); intelligence never on the critical input path.

### HMW-6 — Compose with AI terminals, don't compete
**How might we feed first-party Azure context (real resource lookups, validated parameters, scenario awareness) *into* AI terminals like Copilot CLI and Claude Code — so their generated `az` commands are correct and runnable, without shipping a rival Azure AI mode?**
- **Tension:** The AI-terminal cohort (13.1%) is real and growing; a bespoke rival mode (AI Shell ~6%) fails. We must be a *supplier of context*, not a competing surface (NG2).
- **Personas:** Priya (primary), David, Maya.
- **Gate implication:** Expose Azure context through a composable interface; never impose a mode on the AI terminal.

## HMW → Persona → Gate Traceability

| HMW | Core tension | Primary persona | Also serves | Gate stress test |
|-----|--------------|-----------------|-------------|------------------|
| HMW-1 | Value without vessel | David | Maya, Priya | NG1 — nothing to enter/exit |
| HMW-2 | Step aside for non-az | Maya | David, Priya | FR-5 — the hard gate |
| HMW-3 | Rich vs. universal | David | Priya, Maya | NG3 — no custom shell; graceful degrade |
| HMW-4 | Expert vs. stigma | David | Maya, Priya | Additive + dismissible |
| HMW-5 | Fresh vs. fast | Maya | David, Priya | p95 ≤ 100 ms; async lookups |
| HMW-6 | Supply vs. compete | Priya | David, Maya | NG2 — compose, don't rival |

## Next Steps

- Carry all six HMWs into `concept-brainstorm.md`; require every concept to name the HMW(s) it serves and show how it clears NG1 + FR-5.
- Treat HMW-1 and HMW-2 as the twin pillars concepts must satisfy; HMW-4/5 as must-have qualities; HMW-3 as the portability differentiator; HMW-6 as the adjacency to design *for*.
- Stress-test every shortlisted concept against Maya (interoperability), David (IDE portability + anti-stigma), and Priya (AI-terminal composition).
