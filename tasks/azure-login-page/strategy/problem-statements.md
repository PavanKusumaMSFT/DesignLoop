---
title: "Problem Statements & How-Might-We — Azure Sign-In / Login Page"
phase: define
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Strategist Agent"
related:
  - "../research/research-brief.md"
  - "../research/competitive-analysis.md"
  - "../research/findings-synthesis.md"
  - "./personas.md"
  - "./journey-map.md"
  - "./prd.md"
---

# Problem Statements & How-Might-We (HMW)

## Purpose

Translate the ranked opportunity areas from
[findings-synthesis.md](../research/findings-synthesis.md) into crisp,
prioritized problem statements for the Azure portal sign-in page. Each statement
names **a specific user**, their **unmet need**, and the **supporting research
insight**, then is scored and ranked so Ideate and Design can act on the highest-
value problems first.

> **Evidence basis:** Grounded in the Discover artifacts. No primary user data
> exists for this redesign yet; insights are heuristic/comparative and flagged as
> such in the research. Assumptions (I7, I8) are held lower until validated.

## The Overarching Problem

> **How might we** let Azure's frequent, security-conscious technical users sign
> in **faster and passwordless-first**, recover **effortlessly** when something
> goes wrong, and always feel **certain they are in the right, safe place** —
> across personal and work accounts, custom-branded tenants, and assistive
> technologies?
>
> — *derived from [findings-synthesis.md → Framing the Problem Space](../research/findings-synthesis.md)*

## Scoring Model

Each problem is scored 1–5 on four dimensions, then given a **Priority Score**
(User & Security Value and Frequency are double-weighted because this is a
high-stakes, high-frequency surface):

`Priority = (2 × Value) + (2 × Frequency) + Feasibility + (6 − Risk)`

- **Value** — user + security value of solving it (higher = better)
- **Frequency** — how often the target user hits this path (higher = better)
- **Feasibility** — ease of delivery in Fluent UI v9 / MSAL (higher = easier)
- **Risk** — delivery/security risk (higher = riskier; inverted in the formula)

Max score = 30.

---

## Ranked Problem Statements

### P1 — Streamline the identifier-first flow *(Priority: 28)*

**HMW** help a **returning enterprise developer** who signs in many times a day
move from landing on the page to an authenticated session with the **fewest,
clearest steps possible**, so sign-in feels instant rather than like a
multi-screen detour?

- **User:** Priya, the Enterprise Cloud Developer (see [personas](./personas.md))
- **Unmet need:** A minimal, continuous identifier → method flow; the current
  multi-screen transition adds perceived latency.
- **Supporting insight:** Theme 1, **I1** (fewer/clearer steps increase
  completion and perceived trust); competitive gap **G1**; Google is the
  benchmark. *(Established)*

| Value | Frequency | Feasibility | Risk | **Priority** |
|:--:|:--:|:--:|:--:|:--:|
| 5 | 5 | 5 | 1 | **28** |

Highest-frequency path for every persona and a pure usability win with no
security tradeoff.

---

### P2 — Rewrite error & recovery states to be human and actionable *(Priority: 27)*

**HMW** ensure that when **any user** hits a recoverable failure (wrong password,
unknown account, MFA retry, conditional-access/policy block), the page tells them
**specifically what happened and exactly what to do next**, so they recover
without abandoning or calling the help desk?

- **User:** All personas — acutely Marcus, the IT Administrator, who meets terse,
  admin-oriented conditional-access errors most often.
- **Unmet need:** Human, specific, actionable error + a clear next step;
  today's policy-block messages strand end users.
- **Supporting insight:** Theme 3, **I3** (specific human errors materially
  improve recovery); competitive gap **G2**; Google/GitHub set the bar.
  *(Established)*

| Value | Frequency | Feasibility | Risk | **Priority** |
|:--:|:--:|:--:|:--:|:--:|
| 5 | 4 | 5 | 1 | **27** |

Trust is won or lost at failure; largely content + inline-component work, so high
value at low effort and low risk.

---

### P3 — Passwordless-first with graceful, ordered fallbacks *(Priority: 24)*

**HMW** offer a **security-conscious technical user** a **passwordless method
(passkey / Authenticator) as the default preferred path**, with clear ordered
fallbacks, so they get the fastest, most secure sign-in — **without ever
dead-ending** an un-enrolled user?

- **User:** Priya (frequent, passwordless-ready) and Devan, the DevOps/SRE
  Engineer (device-trust-oriented).
- **Unmet need:** Passwordless offered first with passwords as fallback — the
  inverse of the legacy model — while un-enrolled users still have a path.
- **Supporting insight:** Theme 2, **I2** (passwordless-first reduces friction
  and improves posture); opportunity **O1**; risk **R1** (fallback ordering must
  be validated). *(Established)*

| Value | Frequency | Feasibility | Risk | **Priority** |
|:--:|:--:|:--:|:--:|:--:|
| 5 | 4 | 3 | 3 | **24** |

Advances usability **and** security and leans into an Azure strength (method
breadth), but MSAL enrollment state and fallback ordering carry medium risk.

---

### P4 — Trust & anti-phishing signals that survive tenant branding *(Priority: 22)*

**HMW** give **every user** consistent, recognizable cues that they are on the
**genuine, safe Azure sign-in surface** — even under custom tenant branding — and
make them aware of **new / unrecognized sign-ins**, so phishing and account
takeover become materially harder?

- **User:** Marcus (owns tenant branding, audit-grade trust expectations) and all
  personas as targets of phishing.
- **Unmet need:** A stable anti-phishing cue that custom branding can't dilute,
  plus GitHub-style device-verification / new-sign-in awareness.
- **Supporting insight:** Theme 4, **I4** + **I5**; competitive gap **G3**;
  GitHub pattern. *(Established + Comparative)*

| Value | Frequency | Feasibility | Risk | **Priority** |
|:--:|:--:|:--:|:--:|:--:|
| 5 | 3 | 3 | 3 | **22** |

Protects the highest-stakes moment; medium feasibility (touches identity/security
systems) and medium risk (verification can add friction if over-applied).

---

### P5 — Accessibility guardrails for tenant custom branding *(Priority: 22)*

**HMW** guarantee that the sign-in page meets **WCAG 2.1 AA** for keyboard,
focus, contrast, labeling, and target size — and stays compliant **even when a
tenant applies custom branding** — so assistive-technology and keyboard-first
power users are never locked out?

- **User:** Any assistive-technology or keyboard-first user across all personas;
  Marcus configures the tenant themes that could regress it.
- **Unmet need:** Enforced accessibility guardrails that custom themes cannot
  break (Okta's known weakness).
- **Supporting insight:** Theme 5, **I6**; opportunity **O2**; WCAG 2.1 AA is a
  hard constraint. *(Established)*

| Value | Frequency | Feasibility | Risk | **Priority** |
|:--:|:--:|:--:|:--:|:--:|
| 4 | 3 | 4 | 2 | **22** |

Turns a competitor weakness into an Azure strength; Fluent UI v9 tokens make the
baseline feasible, though enforcement across arbitrary tenant themes is harder.

---

### P6 — First-class multi-account / multi-tenant switching *(Priority: 20)*

**HMW** let a user who juggles **personal + work accounts and multiple tenants**
see, choose, and switch accounts quickly and unambiguously at sign-in, so
multi-tenant work stops being a repeated friction point?

- **User:** Priya (personal ↔ work tenants) and Devan (multiple environment
  tenants).
- **Unmet need:** First-class account-picker / tenant-switch support built on
  the MSAL account model.
- **Supporting insight:** Theme 1, **I7** *(Assumption — frequency/pain needs
  primary validation)*.

| Value | Frequency | Feasibility | Risk | **Priority** |
|:--:|:--:|:--:|:--:|:--:|
| 4 | 3 | 3 | 2 | **20** |

Held at **should-have** pending primary validation of I7.

---

### P7 — Safe, scoped sign-in assistance (help / Copilot affordance) *(Priority: 15)*

**HMW** offer **a stuck user** scoped, plain-language help ("which account?",
policy-block explanations, guided recovery) on the sign-in page **without**
creating a social-engineering / attack surface on an unauthenticated page?

- **User:** Any user blocked or confused at sign-in.
- **Unmet need:** Guided recovery where every competitor scores only "basic."
- **Supporting insight:** Theme 6, **I8** *(Assumption)*; opportunity **O3**;
  risk **R3** (unauthenticated attack surface). Explore only after security review.

| Value | Frequency | Feasibility | Risk | **Priority** |
|:--:|:--:|:--:|:--:|:--:|
| 4 | 2 | 2 | 5 | **15** |

**Do not commit** until security-reviewed; keep as an explore-only opportunity.

---

## Priority Summary

| Rank | ID | Problem | Priority | Define disposition |
|:--:|:--:|---|:--:|---|
| 1 | P1 | Streamline identifier-first flow | 28 | Must-have |
| 2 | P2 | Human, actionable errors & recovery | 27 | Must-have |
| 3 | P3 | Passwordless-first w/ ordered fallbacks | 24 | Must-have |
| 4 | P4 | Trust / anti-phishing under branding | 22 | Must-have |
| 5 | P5 | Accessibility guardrails for branding | 22 | Must-have (constraint) |
| 6 | P6 | Multi-account / multi-tenant switching | 20 | Should-have (validate I7) |
| 7 | P7 | Safe, scoped assistance | 15 | Could-have / explore (security review) |

## Design Tensions to Resolve

Carried forward from [findings-synthesis.md](../research/findings-synthesis.md):

- **Simplicity vs. security** — fewer steps without weakening MFA/conditional access (P1 ↔ P3).
- **Branding vs. trust consistency** — customization without diluting anti-phishing cues (P4).
- **Branding vs. accessibility** — custom themes that can't break WCAG 2.1 AA (P5).
- **Assistance vs. attack surface** — help value vs. social-engineering risk (P7).

These problem statements feed the [personas](./personas.md),
[journey map](./journey-map.md), and the requirements in the [PRD](./prd.md).
