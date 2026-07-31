---
title: "Concept Evaluation — Azure Sign-In / Login Page"
phase: ideate
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Ideator Agent"
related:
  - "../strategy/problem-statements.md"
  - "../strategy/personas.md"
  - "../strategy/prd.md"
  - "../research/findings-synthesis.md"
  - "./hmw-questions.md"
  - "./concept-brainstorm.md"
---

# Concept Evaluation

## Purpose

Converge on the diverged concepts from
[concept-brainstorm.md](./concept-brainstorm.md) by scoring them against the
classic innovation triad — **Desirability × Feasibility × Viability** — then
produce a **shortlist** that is buildable as a *single* Fluent UI React v9 Azure
login page and traces cleanly to the problem-ID spine (P1–P7).

## Scoring Model

Each concept is scored **1–5** on three dimensions (5 = best):

- **Desirability (D)** — how much it solves the user/persona need and advances the
  parent problem's value (grounded in personas + insights).
- **Feasibility (F)** — buildability in Fluent UI v9 / MSAL on an unauthenticated
  login surface, within WCAG 2.1 AA.
- **Viability (V)** — strategic/security fit: risk posture, PRD priority, and
  whether it holds the design tensions without introducing an attack vector.

**Weighted score** favors the surface's stakes:

`Score = (2 × D) + (2 × V) + F`  → max **25**

Desirability and Viability are double-weighted because this is a high-frequency,
high-stakes, security-sensitive surface where user value and safe strategic fit
matter more than raw ease of build (mirrors the Define scoring rationale).

**Shortlist bar:** Score ≥ **18** *and* no unresolved 🔴 security/viability blocker
→ **carry into Design**. Anti-patterns (C6, C12, C20, C27, C34, C42) are excluded
by definition and not scored.

---

## Scored Matrix — Must-Have Lenses (A–E)

| ID | Concept (short) | Lens/Problem | D | F | V | **Score** | Disposition |
|:--:|---|:--:|:--:|:--:|:--:|:--:|---|
| C1 | Single continuous canvas | A / P1 | 5 | 4 | 5 | **24** | ✅ Shortlist (core) |
| C2 | Inline account-type detection | A / P1 | 5 | 4 | 5 | **24** | ✅ Shortlist |
| C3 | Returning-user warm start | A / P1 | 4 | 4 | 4 | **20** | ✅ Shortlist |
| C4 | Progressive stepper | A / P1 | 3 | 5 | 4 | **19** | ✅ Shortlist (light) |
| C5 | Predictive prefill from cache | A / P1 | 4 | 3 | 3 | **17** | 🟨 Defer (privacy on shared devices) |
| C7 | Inline error + adjacent recovery | B / P2 | 5 | 5 | 5 | **25** | ✅ Shortlist (core) |
| C8 | Plain-language policy-block panel | B / P2 | 5 | 4 | 5 | **24** | ✅ Shortlist (core) |
| C9 | Recovery-first error layout | B / P2 | 4 | 5 | 5 | **23** | ✅ Shortlist |
| C10 | Error taxonomy → content map | B / P2 | 4 | 4 | 5 | **22** | ✅ Shortlist (foundation) |
| C11 | Guided inline step recovery | B / P2 | 4 | 3 | 3 | **17** | 🟨 Defer (borders P7; guidance-only) |
| C13 | Enrollment-driven ordering | C / P3 | 5 | 3 | 5 | **23** | ✅ Shortlist (core) |
| C14 | "Sign in another way" drawer | C / P3 | 4 | 5 | 5 | **23** | ✅ Shortlist |
| C15 | Silent password fallback | C / P3 | 5 | 4 | 5 | **24** | ✅ Shortlist (core, R1 mitigation) |
| C16 | Passkey-forward hero action | C / P3 | 5 | 4 | 4 | **22** | ✅ Shortlist |
| C17 | One-tap return to methods | C / P3 | 4 | 5 | 5 | **23** | ✅ Shortlist |
| C18 | Method-availability matrix | C / P3 | 4 | 3 | 5 | **21** | ✅ Shortlist (foundation, OQ1) |
| C19 | Device-trust express lane | C / P3 | 4 | 2 | 3 | **16** | 🟨 Defer (MSAL device-state depth) |
| C21 | Persistent verified-surface cue | D / P4 | 5 | 3 | 5 | **23** | ✅ Shortlist (core) |
| C22 | Active account + tenant chip | D / P4 | 5 | 5 | 5 | **25** | ✅ Shortlist (core) |
| C23 | Protective-framing step-up copy | D / P4 | 4 | 5 | 5 | **23** | ✅ Shortlist |
| C24 | Reserved trust zone in layout | D / P4 | 4 | 4 | 5 | **22** | ✅ Shortlist (resolves branding↔trust) |
| C25 | New/unrecognized sign-in awareness | D / P4 | 4 | 2 | 3 | **16** | 🟨 Defer (OQ2 MSAL feasibility) |
| C26 | Domain/URL confidence coach | D / P4 | 3 | 3 | 3 | **15** | 🟨 Defer (borders P7) |
| C28 | Token-enforced theme | E / P5 | 4 | 5 | 5 | **23** | ✅ Shortlist (core) |
| C29 | Contrast-enforcing branding gate | E / P5 | 5 | 3 | 5 | **23** | ✅ Shortlist |
| C30 | Full keyboard path + visible focus | E / P5 | 5 | 5 | 5 | **25** | ✅ Shortlist (core, constraint) |
| C31 | Color-plus-icon/text state | E / P5 | 4 | 5 | 5 | **23** | ✅ Shortlist |
| C32 | Live-region status + labels | E / P5 | 5 | 5 | 5 | **25** | ✅ Shortlist (core, constraint) |
| C33 | A11y self-audit overlay | E / P5 | 3 | 3 | 4 | **17** | 🟨 Defer (tooling, not page UX) |

## Scored Matrix — Should-have / Explore Lenses (F–G)

| ID | Concept (short) | Lens/Problem | D | F | V | **Score** | Disposition |
|:--:|---|:--:|:--:|:--:|:--:|:--:|---|
| C35 | Rich account picker | F / P6 | 5 | 4 | 4 | **22** | ✅ Shortlist (also serves P1 via FR-2) |
| C36 | Tenant switcher ≤2 actions | F / P6 | 4 | 3 | 4 | **19** | ✅ Shortlist (should, validate I7) |
| C37 | Environment badges (DevOps) | F / P6 | 4 | 4 | 4 | **20** | ✅ Shortlist (light, Devan value) |
| C38 | Persona/workspace grouping | F / P6 | 3 | 3 | 3 | **15** | 🟨 Defer (I7 unvalidated) |
| C39 | Static "which account?" helper | G / P7 | 3 | 5 | 4 | **19** | 🟨 Conditional (read-only, sec sign-off) |
| C40 | Contextual policy-block explainer | G / P7 | 4 | 4 | 4 | **20** | 🟨 Conditional (converge into C8) |
| C41 | Conversational sign-in Copilot | G / P7 | 4 | 2 | 1 | **12** | ❌ Out (R3 attack surface, gated) |

> **Note on C40 → C8:** the policy-block explainer is the same content asset as the
> plain-language policy panel (C8) at a different ambition level. C8 (a rendered,
> read-only inline panel) ships in the must-have set; the *interactive* explainer
> framing (C40) is treated as P7-adjacent and gated with C39/C41.

---

## Value × Effort View (sanity check)

Positioning the shortlist by **user value** (≈ Desirability) against **build
effort** (inverse of Feasibility) confirms the convergence:

| | **Low effort** | **High effort** |
|---|---|---|
| **High value** | C7, C22, C30, C32, C14, C17, C23, C31, C28 — *quick wins, build first* | C1, C2, C13, C21, C29, C15, C16, C8, C10, C18, C35 — *big-rock core, plan capacity* |
| **Lower value** | C4, C37, C24 — *cheap polish, include* | C5, C11, C19, C25, C26, C33, C38, C39/C40 — *defer / conditional* |

No shortlisted concept is high-effort/low-value. The deferred cluster is exactly the
speculative/assumption-bound set (predictive prefill, device-trust depth, new-sign-in
signals, workspace grouping, on-page help) — appropriately held.

---

## Shortlist to Carry Into Design

The following **buildable-as-one-page** set clears the bar (Score ≥ 18, no unresolved
blocker). Grouped by problem so Design inherits the spine:

### Must-have core (the page's backbone)
- **P1 (entry):** C1 continuous canvas · C2 inline type detection · C3 warm start ·
  C4 light stepper
- **P2 (errors):** C7 inline error + recovery · C8 plain policy panel · C9 recovery-
  first layout · C10 error taxonomy (content foundation)
- **P3 (passwordless):** C13 enrollment-driven ordering · C14 method drawer · C15
  silent fallback · C16 passkey-forward hero · C17 one-tap return · C18 availability
  matrix (foundation)
- **P4 (trust):** C21 verified-surface cue · C22 account+tenant chip · C23 protective
  step-up copy · C24 reserved trust zone
- **P5 (a11y):** C28 token-enforced theme · C29 contrast gate · C30 keyboard+focus ·
  C31 color-plus-text state · C32 live-region status

### Should-have (validate I7, keep light)
- **P6:** C35 rich account picker (also satisfies FR-2 for P1) · C36 tenant switcher ·
  C37 environment badges

### Deferred / conditional (NOT in the Design build unless gated)
- **Deferred (assumption/tech depth):** C5, C11, C19, C25, C26, C33, C38
- **Security-gated (P7):** C39, C40 — permitted **only** as read-only guidance after a
  documented security review; **C41 (Copilot) is out** for this task (R3 / NFR-Sec).

## Coverage Check — Every Must-Have Problem Is Served

| Problem | HMW | Shortlisted concepts | PRD reqs covered |
|:--:|:--:|---|---|
| P1 | HMW-1 | C1, C2, C3, C4, C35 | FR-1, FR-2 |
| P2 | HMW-2 | C7, C8, C9, C10 | FR-6 |
| P3 | HMW-3 | C13, C14, C15, C16, C17, C18 | FR-3, FR-4, FR-5 |
| P4 | HMW-4 | C21, C22, C23, C24 | FR-5, FR-7, FR-8 |
| P5 | HMW-5 | C28, C29, C30, C31, C32 | NFR-A11y, NFR-Brand |
| P6 | HMW-6 | C35, C36, C37 | FR-2, FR-9 |
| P7 | HMW-7 | (gated) C39, C40 | FR-10 (explore only) |

All five must-have problems (P1–P5) are fully covered; P6 is served at should-have;
P7 stays explore-only and gated. The shortlist composes into **one** login surface —
a continuous canvas (C1) hosting method ordering (C13–C18), trust cues (C21–C24),
accessible theming (C28–C32), an account picker (C35–C37), and a unified error/
recovery system (C7–C10).

Next: record the decisions and accepted risks in
[decision-log.md](./decision-log.md).
