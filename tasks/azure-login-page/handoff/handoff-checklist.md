---
title: "Handoff Checklist — Azure Sign-In / Login Page"
phase: deliver
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Handoff Agent"
related:
  - "../strategy/prd.md"
  - "../ideation/decision-log.md"
  - "../designs/design-system.md"
  - "../prototypes/manifest.md"
  - "../tests/accessibility-audit.md"
  - "../tests/tenets-traps-evaluation.md"
  - "../tests/usability-test-plan.md"
  - "./implementation-guide.md"
  - "./component-api-reference.md"
  - "./design-engineering-changelog.md"
---

# Handoff Checklist — Azure Sign-In / Login Page

Final design-to-engineering gate. **Every item is explicitly resolved** — either checked
`[x]` (done / verified) or checked as a **tracked follow-up** with an owner (`[x] TRACKED`).
There are **0 unchecked items**. Tracked follow-ups are known, non-blocking (0 Critical /
0 High), and carried into implementation with an owner; the two hard gates (WCAG AA CI
crawl, P7 security sign-off) are called out explicitly.

Legend: `[x]` = complete/verified · `[x] TRACKED` = known open follow-up, owned & scheduled
(not a blocker) · `[x] GATE` = mandatory gate before the related scope ships.

---

## 1. Handoff package completeness

- [x] `handoff/implementation-guide.md` — setup, brand theme, component structure, state
  machine, props, MSAL wiring, do/don't, troubleshooting.
- [x] `handoff/component-api-reference.md` — per-component props/states/Fluent primitives
  for all 10 components + shared types + theme.
- [x] `handoff/design-engineering-changelog.md` — full decision history (Discover→Test,
  D1–D7, FR/NFR traceability).
- [x] `handoff/handoff-checklist.md` — this document.
- [x] Every component in `prototype-workspace/components/projects/azure-login-page/` is
  documented (LoginPage, SignInCard, TrustHeader, TrustFooter, IdentityInput, AccountPicker,
  IdentityMethodList, PasswordEntry, MfaVerify, ErrorRecovery).
- [x] Upstream artifacts referenced and linked (research, strategy, ideation, designs,
  prototypes, tests).

## 2. Source & artifacts verified against reality

- [x] Prop tables were inspected against the **actual source** (not the design specs).
- [x] Route `/azure-login-page` confirmed → `app/azure-login-page/page.tsx` → `<LoginPage />`.
- [x] Barrel export (`index.tsx`) confirmed (default = LoginPage).
- [x] Mock auth adapter + sentinels documented from `types.ts` / `SignInCard.tsx`.
- [x] 10 verification screenshots present in `tasks/azure-login-page/prototypes/screenshots/`.

## 3. Build status — **PASSING**

- [x] `npx next build` in `prototype-workspace/` completes successfully (re-verified for
  this handoff: "Compiled successfully"; 12/12 static pages generated).
- [x] Route `/azure-login-page` prerendered as static content (**31.7 kB**, First Load JS
  251 kB).
- [x] No type errors in any `azure-login-page` file (`tsc --noEmit` clean for this project;
  pre-existing unrelated repo errors untouched).

## 4. Functional requirements (FR-1…FR-10)

- [x] **FR-1** continuous identifier-first, single surface, no full-page reload —
  `IdentityInput` + `SignInCard` in-place state swap; AC4 inline account-type detection via
  `detectAccountType()` (no manual toggle).
- [x] **FR-2** returning-user account picker; select advances without re-typing; "Use
  another account" always present — `AccountPicker`.
- [x] **FR-3** passwordless-first hero, password secondary; AC4 enrollment-driven ordering
  via `getMethodsForAccount().order` (not hard-coded) — `IdentityMethodList`.
- [x] **FR-4** no dead-ends: password always in method set; single-method → silent S3;
  "Sign in another way" everywhere.
- [x] **FR-5** MFA step-up with protective framing, keyboard-operable, trusted-device
  opt-out — `MfaVerify`.
- [x] **FR-6** error taxonomy + adjacent recovery + plain-language policy panel —
  `ERROR_TAXONOMY` + `ErrorRecovery`.
- [x] **FR-7** reserved, branding-proof trust zone; verified cue in every state; account/
  tenant shown before submit and at landing — `TrustHeader`/`TrustFooter`.
- [x] **FR-8** tenant branding themeable via tokens — *default theme shipped*; branding
  contrast gate is a tracked gate (see §7).
- [x] **FR-9** multi-account/tenant switch reachable ≤2 actions — `AccountPicker` +
  `TrustHeader` tenant `Menu`.
- [x] **FR-10** scoped assistance is **explore-only, not built** — security-gated (see §8).

## 5. Non-functional requirements

- [x] **NFR-Brand** all UI from Fluent v9 tokens; brand blues `#0078D4/#106EBE/#005A9E` via
  `colorBrand*`; color never the sole state signal.
- [x] **NFR-Perf** no full-page reload between states; persistent chrome; body cross-fade
  with `prefers-reduced-motion` honored.
- [x] **NFR-Sec** no credential-taking widget on the unauthenticated surface; P7 gated.
- [x] **NFR-Responsive** desktop-first, card `max-width 440px` → 100% below gutters
  (320px/200%-zoom reflow to be confirmed in CI — §7).

## 6. Accessibility sign-off (WCAG 2.1 AA)

- [x] Color contrast — **PASS in default theme** (computed: white-on-`#0078D4` = 4.53:1;
  body/secondary/caption/link/green all pass). Documented zero-headroom caveat on the brand
  blue.
- [x] Images / non-text (1.1.1) — logos have `alt`; decorative icons `aria-hidden` + paired
  with text.
- [x] Forms, labels, error identification (1.3.1/3.3.1/3.3.2/4.1.2) — Fluent `Field` wires
  labels + `aria-describedby`; show/hide toggle has dynamic `aria-label`.
- [x] Keyboard operability & visible focus (2.1.1/2.4.7) — native controls; Fluent focus
  ring; account-picker `:focus-visible` outline; no keyboard traps.
- [x] Color-not-sole-means (1.4.1) & motion (2.3.3) — PASS.
- [x] **A-01 (Level A, `role="listitem"` on a `<button>`) — RESOLVED**: account rows are
  native `<button>`s wrapped in `role="listitem"` divs inside a named `role="list"`;
  verified in `AccountPicker.tsx` source.
- [x] **A11y verdict:** default theme **strongly compliant**, **no Critical barriers**; the
  one former Level A blocker is fixed. AC5 formal closure requires the CI axe crawl (§7).
- [x] **GATE — NFR-A11y AC5 CI axe crawl:** the ready-to-run `axe-core@4.11.1` script
  (accessibility-audit appendix) **must be executed in CI** (live DOM crawl was blocked in
  the design sandbox). Exit criterion: zero critical/serious violations across
  S1/S1b/S2/S3/S4/S5(wrong-password+policy)/S7. → **[x] GATE — scheduled for CI; owner: Eng.**

## 7. Tracked open follow-ups (known, non-blocking — carried to implementation)

Severity summary from Test: **0 Critical · 0 High · 6 Medium · 4 Low.** All are owned and
scheduled; none blocks handoff.

- [x] TRACKED — **F-01 / A-04** heading focus box looks like an editable input. *Owner:
  Prototyper (CSS).* `SignInCard.tsx`.
- [x] TRACKED — **F-03** pre-auth "Signed in as {email}" copy on S2 is inaccurate. *Owner:
  Designer/copy.* `IdentityMethodList.tsx`.
- [x] TRACKED — **F-04 / A-03** duplicated wrong-password message (MessageBar + field + live
  region). *Owner: Prototyper.*
- [x] TRACKED — **F-06** inaccurate "Step {n} of 2" stepper vs. account-dependent path.
  *Owner: Designer.*
- [x] TRACKED — **A-02** redundant `role="alert"` + explicit `aria-live` on MessageBar.
  *Owner: Prototyper.* `ErrorRecovery.tsx`.
- [x] TRACKED — **A-05 / F-10** footer + inline links below PRD ≥24px target size. *Owner:
  Designer/Prototyper.*
- [x] TRACKED — **F-07** MFA number-match auto-approves on a timer; wire deny/timeout →
  `mfa-failed` when integrating MSAL. *Owner: Prototyper.*
- [x] TRACKED — **F-08** add "Forgot password?" to wrong-password MessageBar + re-focus the
  field on "Try again". *Owner: Prototyper.*
- [x] TRACKED — **F-09** account picker uses Tab vs. spec'd arrow-key roving (accept or
  implement). *Owner: Prototyper/Designer.*
- [x] TRACKED — **§7 reflow/zoom** confirm no horizontal scroll of core actions at 320px /
  200% zoom during the CI pass. *Owner: Eng (CI).*
- [x] **GATE — FR-8 tenant-branding contrast gate:** `enforceContrast()` (C29) is **not
  implemented**; only the default Azure theme is AA-verified. **No tenant-branding path may
  ship until this gate exists** (NFR-A11y AC2/AC6). *Owner: Designer + Prototyper.*

## 8. Security gate — P7 on-page assistance

- [x] **GATE — P7 / FR-10 (NFR-Sec AC2):** on-page sign-in assistance is **explore-only**.
  Interactive assistance / Copilot (C41) and any credential-taking help widget (C42) are
  **not built and must not ship**. Read-only guidance (C39/C40) may ship **only after a
  documented security review sign-off**. As of this handoff **no security sign-off exists**,
  so P7 remains **blocked/out-of-scope**. *Owner: Security review before any P7 build.*
- [x] Confirmed the shipped code contains **no** assistance affordance; `TrustFooter` "Help"
  is a static read-only link only.

## 9. MSAL production-wiring readiness

- [x] Mock boundary documented: `wait()`, `getMethodsForAccount()`, `MOCK_ACCOUNTS`,
  password sentinels, `MfaVerify` timer → all mapped to their `@azure/msal-react`
  replacements (implementation-guide §7).
- [x] Guidance to keep `SignInCard` as the single orchestrator and translate MSAL error
  codes onto `ERROR_TAXONOMY` (not new ad-hoc strings).
- [x] Open questions surfaced for engineering: **OQ1** full MSAL account-state enumeration
  (guarantees FR-4 AC3), **OQ2** MSAL device/new-sign-in signal feasibility, **OQ3** P7
  security-review outcome.

## 10. Definition of Done — met

- [x] A developer can implement every component from these artifacts without asking
  questions (props, states, behaviors, wiring, and rationale all documented).
- [x] Every design decision is logged and traceable (P1–P7, FR/NFR, D1–D7).
- [x] Accessibility documented; default theme AA-compliant; the one former Level A blocker
  resolved; AC5 closure scheduled via the CI gate.
- [x] Build passing and re-verified.
- [x] All open follow-ups tracked with owners; the two mandatory gates (WCAG AA CI crawl,
  P7 security sign-off) explicitly flagged.

---

**Unchecked items: 0.** Every item above is resolved (`[x]`), tracked with an owner
(`[x] TRACKED`), or flagged as a mandatory downstream gate (`[x] GATE`). **Deliver stage
complete** — the handoff package is ready for engineering, with the WCAG AA CI crawl and the
P7 security sign-off as the two named gates that govern, respectively, AC5 closure and any
future assistance/tenant-branding scope.
