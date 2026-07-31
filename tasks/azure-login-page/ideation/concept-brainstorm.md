---
title: "Concept Brainstorm — Azure Sign-In / Login Page"
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
---

# Concept Brainstorm

## Purpose

Diverge widely on each [How Might We question](./hmw-questions.md), generating a
broad set of solution concepts — from **conventional** (proven, low-risk patterns)
to **speculative** (ambitious, higher-risk bets) — before any convergence. This is
the divergence step; nothing here is chosen. Scoring and shortlisting happen in
[concept-evaluation.md](./concept-evaluation.md).

**Method:** SCAMPER + Crazy-8s per HMW, then organized by **lens** (the design
surface each concept touches). Every concept carries a stable ID (C#) used
downstream, its parent HMW/problem, and a one-line note on the PRD constraint it
must respect.

> **Constraint spine (applies to every concept):** Fluent UI React v9 tokens only ·
> MSAL/Entra-backed · Azure blues (#0078D4 / #106EBE / #005A9E) via Fluent theme
> tokens · WCAG 2.1 AA (branding-proof) · unauthenticated-surface safety (no new
> attack vector). Concepts that violate these are flagged and carried only as
> reference "anti-patterns."

**Legend:** 🟢 conventional/proven · 🟡 moderate/novel · 🔴 speculative/ambitious ·
⛔ anti-pattern (kept for contrast, not for build).

---

## Lens A — Entry & Continuity *(HMW-1 / P1)*

Goal: collapse arrive → identify → method into one continuous, near-instant feel.

- **C1 🟢 Single continuous canvas.** One persistent layout where the identifier
  field and the method screen are *states* of the same panel, animated in place —
  no full-page reload, shared branding, no flash. *(FR-1 AC2; NFR-Perf)*
- **C2 🟢 Identifier-first with inline type detection.** As the user types, silently
  detect work/school vs. personal and route without a visible account-type toggle.
  *(FR-1 AC4)*
- **C3 🟡 Returning-user "warm start."** On a recognized device, skip straight to
  the account picker / method screen with a subtle "Welcome back" and a one-tap
  path; "Use another account" always present. *(FR-2; P1/P6)*
- **C4 🟡 Progressive-disclosure stepper.** A slim, accessible progress affordance
  (Identify → Verify → Done) that reassures without adding screens; collapses on
  mobile. *(perceived-latency, Theme 1)*
- **C5 🔴 Predictive prefill from local hints.** Use previously-signed-in MSAL
  account cache to pre-populate the picker *before* any typing, with an explicit,
  revocable "not you?" control. *(FR-2; must respect privacy on shared devices)*
- **C6 ⛔ Auto-submit on detected email.** Submitting the identifier without an
  explicit primary action — rejected: harms control, keyboard users, and error
  recovery. Kept as anti-pattern.

**SCAMPER notes:** *Combine* identify+method (C1); *Eliminate* the account-type
toggle (C2); *Adapt* Google's continuous canvas as the benchmark (C1); *Reverse*
"type then be recognized" → "be recognized then confirm" (C3/C5).

---

## Lens B — Errors & Recovery *(HMW-2 / P2)*

Goal: every recoverable failure states what happened + the exact next step, inline.

- **C7 🟢 Specific inline error + adjacent recovery action.** Each state (wrong
  password, unknown account, locked, expired session, network) shows a human
  message with the *right* action beside it ("Forgot password", "Try another
  method", "Try again"), wired with `role="alert"` / `aria-describedby`.
  *(FR-6 AC1/AC3/AC4)*
- **C8 🟢 Plain-language conditional-access / policy-block panel.** Translate terse
  CA/policy errors into "Your organization requires X. Here's how to continue,"
  with an org-help link — no admin jargon. *(FR-6 AC2; Marcus's #1 pain)*
- **C9 🟡 Recovery-first error layout.** When a failure is recoverable, elevate the
  next action to a primary button and demote "try again," so the path forward is
  the loudest element. *(I3; recovery ≥ 90% metric)*
- **C10 🟡 Error taxonomy → content map.** A structured map of MSAL/Entra error
  codes → {plain message, cause, next step, a11y role} so content is consistent and
  testable rather than ad-hoc. *(FR-6; OQ1 enumeration)*
- **C11 🔴 Guided step-by-step recovery inline.** For multi-step recoveries (e.g.,
  device-trust not met), a compact inline checklist that walks the user through
  satisfying the policy without leaving the page. *(borders P7 — keep guidance-only)*
- **C12 ⛔ Generic "Something went wrong. Try again."** Terse catch-all — explicit
  anti-pattern the redesign exists to kill.

**SCAMPER notes:** *Substitute* jargon → plain language (C8); *Rearrange* layout so
recovery leads (C9); *Modify* error into help (C11); *Put to other use* MSAL error
codes as a content contract (C10).

---

## Lens C — Passwordless & Method Ordering *(HMW-3 / P3)*

Goal: passwordless as the obvious default; never dead-end an un-enrolled user.

- **C13 🟢 Enrollment-driven method ordering.** MSAL/Entra-reported enrollment state
  decides order; if ≥1 passwordless method exists it is the visually primary
  default, password clearly secondary. *(FR-3 AC1/AC2/AC4)*
- **C14 🟢 "Sign in another way" drawer.** A single, always-available affordance that
  reveals every supported method for the account. *(FR-3 AC3)*
- **C15 🟢 Silent password fallback (no error).** If no passwordless method is
  enrolled, offer password (or another method) automatically — never an error
  state. *(FR-4 AC1; risk R1)*
- **C16 🟡 Passkey-forward hero action.** Present passkey/Authenticator as a large,
  branded primary action with a "fastest & most secure" microcopy nudge and an
  icon, so passwordless feels like the easy path. *(I2; adoption metric)*
- **C17 🟡 One-tap return to method selection.** If a chosen method fails or is
  unavailable, a single action returns the user to the full method list. *(FR-4 AC2)*
- **C18 🟡 Method-availability matrix.** Deterministic mapping of account state →
  at-least-one-usable-path, validated against MSAL states, guaranteeing no
  dead-ends. *(FR-4 AC3; OQ1)*
- **C19 🔴 Device-trust express lane.** On a managed/trusted device, offer a
  near-instant passwordless "continue as…" that leans on device trust + number
  match, minimizing taps for Devan's incident bursts. *(FR-5 AC3; honor trusted state)*
- **C20 ⛔ Password field shown first by default.** The legacy inverse — kept only as
  the anti-pattern P3 explicitly reverses.

**SCAMPER notes:** *Reverse* password-first → passwordless-first (C13/C16);
*Eliminate* the dead-end via guaranteed path (C18); *Adapt* FIDO2/passkey industry
default (C16); *Combine* device trust + passwordless (C19).

---

## Lens D — Trust, Anti-Phishing & Step-Up *(HMW-4 / P4)*

Goal: a branding-proof "genuine Azure" signal + account/tenant clarity + protective MFA.

- **C21 🟢 Persistent verified-surface cue.** A consistent Microsoft/Azure trust
  element (verified sign-in indicator + domain/account context) present in *all*
  branding configs and non-removable by tenant branding. *(FR-7 AC1/AC2)*
- **C22 🟢 Active account + tenant chip.** Always show the account and tenant in
  context before final submission and at landing, so no one signs into the wrong
  place. *(FR-7 AC3; helps P6)*
- **C23 🟢 Protective-framing microcopy on step-up.** Each MFA/CA challenge carries a
  one-line "why" ("Extra verification is required by your organization"). *(FR-5 AC1)*
- **C24 🟡 Reserved trust zone in layout.** A layout region (e.g., header/footer band)
  that branding can theme but never occupy — the anti-phishing cue always lives
  there. *(FR-7 AC2 ↔ FR-8; resolves branding-vs-trust tension)*
- **C25 🟡 New / unrecognized sign-in awareness.** GitHub-style device-verification
  or "new sign-in from this device" acknowledgment where MSAL signals allow.
  *(I5; OQ2 feasibility)*
- **C26 🔴 Domain/URL confidence coach.** A subtle, dismissible affordance that
  teaches users to check the genuine domain — guidance-only, no data entry. *(I4;
  borders P7 — must pass NFR-Sec)*
- **C27 ⛔ Trust cue that tenant branding can fully restyle/hide.** Anti-pattern —
  the exact failure mode FR-7 AC2 forbids.

**SCAMPER notes:** *Adapt* GitHub device-verification (C25); *Combine* trust cue +
account context (C21/C22); *Modify* MFA framing from friction → protection (C23);
*Eliminate* branding's ability to touch the trust zone (C24).

---

## Lens E — Accessible, Branding-Proof Theming *(HMW-5 / P5)*

Goal: WCAG 2.1 AA as an unbreakable property, even under custom branding.

- **C28 🟢 Token-enforced theme.** Branding is expressed only through Fluent UI v9
  design tokens mapped to Azure blues; no ad-hoc hex, so contrast/state are
  compliant by construction. *(NFR-Brand AC1/AC2; NFR-A11y AC2)*
- **C29 🟢 Contrast-enforcing branding gate.** Any tenant logo/background/text that
  would breach ≥4.5:1 (text) / ≥3:1 (UI) is auto-corrected or rejected. *(FR-8 AC2;
  NFR-A11y AC6)*
- **C30 🟢 Full keyboard path + visible focus.** Logical focus order and always-
  visible focus ring across identify → land; targets ≥24×24 (prefer 44×44). *(NFR-A11y
  AC1/AC4)*
- **C31 🟡 Color-plus-icon/text state encoding.** State is never color-alone; every
  status pairs color with icon/text. *(NFR-Brand AC3; NFR-A11y AC3)*
- **C32 🟡 Live-region status + labeled challenges.** All inputs/buttons/challenges
  programmatically named; status via `role="alert"`/live regions; error id per SC
  3.3.1. *(NFR-A11y AC3)*
- **C33 🔴 Built-in a11y self-audit overlay.** A dev/preview overlay that flags
  contrast/focus/label failures on the composed page (incl. tenant theme) before
  rollout, targeting "zero blockers." *(NFR-A11y AC5; supports Marcus's pre-rollout test)*
- **C34 ⛔ Free-form CSS branding injection.** Anti-pattern — arbitrary CSS is how
  Okta's themes silently regress WCAG (Theme 5).

**SCAMPER notes:** *Constrain/Eliminate* free CSS in favor of tokens (C28/C34);
*Add safeguard* (the gate, C29); *Automate* the audit (C33); *Modify* state
encoding to be non-color-dependent (C31).

---

## Lens F — Multi-Account / Multi-Tenant Switching *(HMW-6 / P6, should-have)*

Goal: fast, unambiguous account/tenant switching from the sign-in surface.

- **C35 🟢 Rich account picker.** List known accounts with display name + account/
  tenant hint (personal vs. work/school); select → method with no re-typing;
  "Use another account" always present. *(FR-2 AC1/AC2/AC3)*
- **C36 🟡 Tenant switcher in ≤2 actions.** Reach account/tenant switch in ≤2 actions
  from method or landing, target unambiguously labeled before & after. *(FR-9 AC1/AC2)*
- **C37 🟡 Environment badges for DevOps.** Visual dev/staging/**prod** badges on
  tenant entries so Devan never jumps into the wrong environment mid-incident.
  *(Devan scenario; pairs with C22)*
- **C38 🔴 Persona/workspace grouping.** Group accounts by "Personal" vs. "Work"
  clusters with quick-switch, anticipating Priya's frequent toggle. *(I7 — assumption;
  hold pending validation)*

**SCAMPER notes:** *Adapt* MSAL account model (C35); *Magnify* tenant labeling for
high-stakes prod (C37); *Rearrange* accounts into meaningful groups (C38). **All held
should-have** pending I7 validation.

---

## Lens G — Scoped On-Page Assistance *(HMW-7 / P7, explore only)*

Goal: guidance for stuck users **without** an unauthenticated attack surface.

- **C39 🟡 Static "which account?" helper.** Read-only, plain-language explainer of
  personal vs. work/school — no input, no credentials. *(FR-10 AC2; lowest-risk help)*
- **C40 🟡 Contextual policy-block explainer.** Inline expandable text that explains a
  CA/policy block in plain language and points to org self-service — guidance-only.
  *(overlaps C8; FR-10)*
- **C41 🔴 Conversational sign-in Copilot.** An assistive chat affordance on the
  page. **Gated:** cannot ship without documented security sign-off; must request no
  credentials/secrets. *(FR-10 AC1/AC2; risk R3; NFR-Sec AC2)*
- **C42 ⛔ Help widget that accepts credentials / "verify your identity here."**
  Explicit anti-pattern — the social-engineering vector NFR-Sec forbids.

**SCAMPER notes:** *Minimize* to read-only guidance (C39/C40); *Speculate* on Copilot
but *gate* it hard (C41); *Eliminate* any credential capture outside MSAL (C42).

---

## Divergence Summary

| Lens | HMW/Problem | Concepts | Speculative bets |
|---|---|---|---|
| A — Entry & Continuity | HMW-1 / P1 | C1–C6 | C5 |
| B — Errors & Recovery | HMW-2 / P2 | C7–C12 | C11 |
| C — Passwordless & Ordering | HMW-3 / P3 | C13–C20 | C19 |
| D — Trust & Anti-Phishing | HMW-4 / P4 | C21–C27 | C26 |
| E — Accessible Theming | HMW-5 / P5 | C28–C34 | C33 |
| F — Multi-Account Switching | HMW-6 / P6 | C35–C38 | C38 |
| G — Scoped Assistance | HMW-7 / P7 | C39–C42 | C41 |

**Total: 42 concept IDs** (C1–C42) across 7 lenses; 6 anti-patterns (C6, C12, C20,
C27, C34, C42) retained for contrast only.

**Cross-lens synergies to watch (feed the shortlist):**
- C1 (continuous canvas) is the *carrier surface* that hosts C13, C21/C22, C35.
- C8 (plain policy panel) and C40 (policy explainer) are the same content asset at
  two ambition levels — converge them.
- C24 (reserved trust zone) resolves the branding↔trust tension for C28/C29.

Next: score and shortlist in
[concept-evaluation.md](./concept-evaluation.md).
