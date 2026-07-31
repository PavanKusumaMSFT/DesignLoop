---
title: "Usability Test Plan — Azure Sign-In / Login Page"
phase: test
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Tester Agent"
related:
  - "../prototypes/manifest.md"
  - "../designs/wireframes/login-page.md"
  - "../strategy/prd.md"
  - "../strategy/personas.md"
  - "../strategy/journey-map.md"
  - "./tenets-traps-evaluation.md"
  - "./accessibility-audit.md"
---

# Usability Test Plan — Azure Sign-In / Login Page

A moderated, task-based usability study of the Fluent UI React v9 prototype at
route `/azure-login-page`. The plan validates the PRD's must-have requirements
(FR-1–FR-7, NFR-A11y) against the three research personas — **Priya** (Enterprise
Cloud Developer), **Marcus** (IT Administrator), **Devan** (DevOps/SRE) — using the
prototype's built-in mock sentinels to drive every state deterministically.

> **Pre-test dependency:** resolve the T&T Top Issues (heading focus box, "Signed
> in as" copy, duplicated error) and the accessibility A-01 `role="listitem"` defect
> first; and wire an MFA deny/timeout branch (T&T F-07) so the recovery path is
> reachable. Otherwise those known defects will dominate sessions and confound
> findings.

---

## 1. Objectives & research questions

| # | Objective | Maps to | Research question |
|---|---|---|---|
| O1 | Can users complete a first-time identifier-first sign-in quickly and without confusion? | FR-1, metric "completion ≥95%" | Do users understand the single identifier field and continuous flow? |
| O2 | Do users recover from a wrong password without abandoning? | FR-6, metric "recovery ≥90%" | Is the error message understood and the recovery action found and used? |
| O3 | Do users choose and complete passwordless/MFA step-up confidently? | FR-3, FR-5 | Is passwordless perceived as the default? Is MFA framing reassuring, not alarming? |
| O4 | Can returning users pick the *right* account/tenant without re-typing? | FR-2, FR-9 | Do users select the correct identity and correct a wrong default in ≤2 actions? |
| O5 | Do users trust that this is the genuine Azure sign-in surface? | FR-7, FR-8 | Do the trust cues register? Does any copy undermine trust (e.g. F-03)? |
| O6 | Is the flow fully operable by keyboard and screen reader? | NFR-A11y | Can AT users complete every task with no blockers? |

Secondary: perceived speed/effort (NFR-Perf), and whether the policy-block
explanation is actionable (FR-6 AC2).

---

## 2. Method

- **Type:** moderated, think-aloud; remote (Teams) or in-person.
- **Sessions:** 60 minutes each · 1 participant + 1 moderator (+ 1 optional note-taker/observer).
- **Prototype:** live route `/azure-login-page` (self-contained mock — no real MSAL/network). Use `?auditBridge=1` only if the MSAL wrapper prompts locally.
- **Environments tested:** desktop Chrome/Edge (primary); one mobile-web session; **≥2 assistive-technology sessions** (NVDA+Firefox or JAWS+Chrome; VoiceOver+Safari) — required to validate NFR-A11y with real AT users.
- **Data captured:** screen + audio recording, task success/assist/fail, time-on-task, error/recovery events, post-task SEQ, post-test SUS + trust rating, verbatim quotes.

### Mock sentinels (moderator reference — how to trigger each state)

| To reach | Enter |
|---|---|
| Method screen (work, passwordless-first) | any `name@contoso.com` |
| Password-only silent fallback (S3 directly, no error) | any `name@fabrikam.dev` |
| Unknown account error (S5) | `unknown@anything.com` |
| Wrong-password error (S5) | correct email → password `wrong` |
| Locked account (S5) | password `locked` |
| Conditional-access / policy block (S5 + panel) | password `policy` |
| MFA number-match (S4) → success | work email → any *other* password (auto-approves ≈3.2 s) |
| Returning-user picker (S1b) | "Use a saved account" (Priya personal, Priya work/Contoso·Prod, Devan/Fabrikam·Dev) |

---

## 3. Participants

**Target: 6–8 participants** (5 uncovers most issues; +AT coverage). Recruit to the
persona archetypes; **≥2 must be daily assistive-technology users** (per the
personas' evidence-basis requirement).

| Profile | Matches persona | Key screening criteria | n |
|---|---|---|---|
| **Enterprise cloud developer** | Priya (P1, P3, P6) | Signs into Azure/M365 multiple times daily; keyboard-first; juggles ≥1 personal + ≥1 work tenant; uses Authenticator | 2 |
| **IT administrator** | Marcus (P2, P4, P5) | Manages tenant sign-in/branding & conditional access; uses a FIDO2 security key; **tests with a screen reader before rollout** | 2 (≥1 AT) |
| **DevOps / SRE engineer** | Devan (P3, P6) | Frequent bursty sign-ins across dev/staging/prod tenants; relies on device trust & session persistence; reacts under incident pressure | 2 |
| **Assistive-tech generalist** | cross-persona | Daily screen-reader and/or keyboard-only user; technical-product context | 1–2 (AT) |

**Exclusions:** anyone who worked on this design; UX/researchers by profession
(unless the AT-generalist slot).

---

## 4. Task scenarios

Each task has a realistic frame, a success definition, and the sentinel to use.
Rotate task order where dependencies allow; keep S-numbers hidden from participants.

### Task 1 — First-time sign-in (Priya) · FR-1, FR-3, FR-5
> *"You're opening the Azure portal to check a deployment. Sign in with your work
> account `priya@contoso.com`."*
- **Path:** S1 identify → S2 method → choose **Approve on Microsoft Authenticator** → S4 number-match → S7 success.
- **Success:** reaches "You're signed in" having chosen the passwordless hero without prompting.
- **Watch:** Does she try to type into the heading (F-01)? Does she read the email field as *the* single next step (FR-1 AC1)? Does she perceive passwordless as the default (FR-3 AC1)? Does "Signed in as" confuse her (F-03)?

### Task 2 — Wrong-password recovery (Marcus) · FR-6, FR-4
> *"Sign in with `admin@contoso.com`. You type your usual password but it's
> rejected — get yourself signed in."*
- **Setup:** open the method drawer → **Use your password** → password `wrong` (error) → then any other password → success.
- **Success:** recovers **without abandoning** (metric ≥90%) using the inline recovery ("Try again" / "Forgot password?").
- **Watch:** Is the error message understood in plain language (FR-6 AC2)? Is the recovery action found (note F-04 duplicate message, F-08 focus)? Did he even find "Use your password" (F-05 discoverability)?

### Task 3 — MFA step-up under pressure (Devan) · FR-5
> *"There's a production incident. Sign into the **prod** tenant fast — your org
> requires extra verification."*
- **Path:** work email → password → S4 MFA (number-match) → success; observe the "Don't ask again on this device" option.
- **Success:** completes step-up quickly; articulates *why* it was required (protective framing, FR-5 AC1).
- **Watch:** Does the MFA copy reassure rather than alarm? Is the number-match obvious? Would he trust "Don't ask again" (FR-5 AC3)? (Keyboard/AT variant: complete via keyboard only.)

### Task 4 — Returning-user account pick + wrong-default correction (Priya) · FR-2, FR-9
> *"You've signed in here before. Continue — but make sure you use your **work**
> account, not your personal one."*
- **Path:** S1b picker (Priya personal vs. Priya work/Contoso) → select the **work** row → method → success. If they pick personal, observe correction via "Use another account"/tenant switch.
- **Success:** selects the correct account **without re-typing** (FR-2 AC2) and corrects a wrong default in **≤2 actions** (FR-9 AC1).
- **Watch:** Are the account-type hints and environment badges legible? Is the correct row unambiguous? Is the AT announcement of each row correct (accessibility A-01)?

### Task 5 — Policy-blocked, mid-incident (Devan) · FR-6 AC1/AC2
> *"You try to reach prod but you're blocked by a security policy. Figure out what's
> wrong and what you'd do next."*
- **Setup:** work email → password `policy` → S5 policy block + "How to fix this" panel.
- **Success:** correctly explains the block is a device/policy requirement and identifies a next step (enroll device / contact admin) — **no dead-end** (FR-6).
- **Watch:** Does he expand the plain-language panel? Is it free of admin jargon (FR-6 AC2)? Does he feel he has an actionable path (Devan's core frustration)?

### Task 6 — Trust check (Marcus / all) · FR-7
> *"Before you enter anything — how do you know this is the real Azure sign-in page
> and not a lookalike?"* (Ask at S1, then again at S7.)
- **Success:** cites the "Verified Microsoft sign-in" cue / genuine-surface footer / account-tenant context — unprompted or with light probing.
- **Watch:** Do the reserved trust cues register (FR-7 AC1)? Does any element (F-03 "Signed in as") *reduce* confidence?

*(Optional stretch — tenant branding, FR-8:* if a branded theme build is available,
repeat Task 1 on it and confirm the trust cue survives and contrast holds. Not
runnable on the current default-only build — see accessibility-audit §1a.)*

---

## 5. Moderator script

**Intro (5 min).** *"Thanks for joining. We're testing a sign-in page design, not
you — there are no wrong answers, and it's most useful when things confuse you.
Please think aloud: say what you see, what you expect, and what you'd do next. This
is a prototype with fake accounts, so never use a real password — I'll give you
what to type. I'll record the screen and audio; okay to start?"*

**Warm-up (3 min).** *"How often do you sign into Azure or Microsoft accounts? On
what devices? Do you use passwordless or a security key today?"*

**Per task.** Read the scenario verbatim → hand over → **stay silent** while they
work. If stuck ≥30 s, probe don't lead: *"What are you looking at?" / "What did you
expect to happen?" / "What would you try next?"* Record whether help was needed.

**Per-task probes (choose as relevant):**
- *"What do you think this screen is asking you to do?"*
- *"How confident are you this is the genuine Azure page? What tells you?"* (Task 6)
- *"That message appeared — in your own words, what happened and what would you do?"* (Tasks 2/5)
- *"Was verifying with your phone reassuring or annoying? Why?"* (Task 3)
- *"Is this the account you meant to use? How would you switch?"* (Task 4)

**Post-task:** SEQ — *"How easy or difficult was that task?"* (1 Very difficult – 7
Very easy) + *"What, if anything, got in your way?"*

**Post-test (7 min).** SUS (10 items) + trust rating *"How much do you trust this as
the real Azure sign-in? (1–7)"* + *"If you could change one thing, what?"* + *"Was
anything confusing or misleading?"* (listen for F-01/F-03/F-06). Thank + incentive.

**AT-session addendum.** Ask the participant to complete Tasks 1–5 **keyboard-only**,
then repeat with their screen reader. Note: whether focus lands somewhere sensible
on each state (A-04), whether account rows announce as activatable (A-01), whether
errors/loading/success are announced once and clearly (A-02/A-03), and any point of
being stranded.

---

## 6. Success metrics

| Metric | Definition | Target | Source |
|---|---|---|---|
| **Task success rate** | % completed unaided per task | **≥ 90%** overall; **≥ 95%** for Task 1 (valid-credential completion) | PRD §8 |
| **Error-recovery rate** | % who recover from wrong-password / policy block without abandoning (Tasks 2, 5) | **≥ 90%** | PRD §8 (P2) |
| **Time-on-task** | Median seconds per task | Establish baseline; Task 1 & Task 3 trend **fast**; returning-user Task 4 ≤ 2 interactive steps | FR-1 AC3, FR-9 AC1 |
| **Passwordless selection** | % who choose the passwordless hero over password when both exist (Task 1) | **Majority (> 60%)** unprompted | FR-3 |
| **SEQ** | Single Ease Question per task | **≥ 5.5 / 7** median per task | Standard |
| **SUS** | System Usability Scale | **≥ 75** (good) | Standard |
| **Trust rating** | "Genuine Azure sign-in?" 1–7 | **≥ 6 / 7** median; no drop between S1 and S7 | FR-7 |
| **A11y blockers** | Count of tasks an AT user cannot complete | **0** | NFR-A11y AC5 |
| **Misleading-copy hits** | # participants who question "Signed in as" / stepper / duplicate error | Track → prioritize fixes | T&T F-03/F-04/F-06 |

---

## 7. Observation framework

Log every task on a per-participant grid; one observation per cell.

| Field | Values |
|---|---|
| **Outcome** | Success (unaided) · Success (assisted) · Fail · Abandoned |
| **Errors/events** | typed into heading (F-01) · missed passwordless hero · couldn't find password (F-05) · misread "Signed in as" (F-03) · misread stepper (F-06) · re-typed identifier on picker (FR-2 fail) · questioned trust cue |
| **Recovery** (Tasks 2/5) | found recovery action? · used inline vs. field message? · understood policy panel? |
| **Time** | start → success (s); # interactive steps (Task 4) |
| **Verbatim** | notable quote (esp. trust, MFA framing, confusion) |
| **SEQ** | 1–7 |
| **A11y (AT sessions)** | focus target sensible? · row announced as button (A-01)? · error announced once & clear? · any strand point |

### Severity rubric for synthesized issues
- **Critical:** blocks task completion or breaks trust for most participants.
- **High:** ≥ 50% hit it, or it causes a wrong-account/abandonment.
- **Medium:** noticeable friction / repeated confusion, task still completes.
- **Low:** cosmetic / single-participant polish.

### Analysis & reporting
Affinity-map observations by task and persona; compute the metrics table;
rank issues by (frequency × severity); tie each back to the PRD requirement and,
where relevant, the standing T&T/accessibility finding it confirms. Deliverable:
a findings-and-recommendations readout with prioritized fixes routed to the
Designer (copy/affordance) and Prototyper (focus/ARIA), feeding the next
Tenets & Traps round and the handoff package.
