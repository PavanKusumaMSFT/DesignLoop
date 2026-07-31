---
title: "Design–Engineering Changelog — Azure Sign-In / Login Page"
phase: deliver
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Handoff Agent"
related:
  - "../research/research-brief.md"
  - "../research/findings-synthesis.md"
  - "../strategy/problem-statements.md"
  - "../strategy/prd.md"
  - "../ideation/decision-log.md"
  - "../designs/design-system.md"
  - "../designs/tokens/fluent-theme.md"
  - "../designs/wireframes/login-page.md"
  - "../prototypes/manifest.md"
  - "../tests/tenets-traps-evaluation.md"
  - "../tests/accessibility-audit.md"
  - "../tests/usability-test-plan.md"
  - "./implementation-guide.md"
  - "./component-api-reference.md"
  - "./handoff-checklist.md"
---

# Design–Engineering Changelog — Azure Sign-In / Login Page

The authoritative decision history for the Azure sign-in / login page, from Discover
through Test. Each entry records **what was decided, why, the constraint it satisfies, and
what it means for implementation**, traceable to problem statements (P1–P7), PRD
requirements (FR-1…FR-10, NFR-*), and ideation decisions (D1–D7). Read this alongside the
[implementation-guide](./implementation-guide.md) to understand *why* the code is shaped as
it is before changing it.

---

## 0. Problem & requirement legend

| Ref | Meaning |
|---|---|
| **P1** | Perceived latency / too many steps on the sign-in path (Priya) |
| **P2** | Errors are terse, jargon-y, non-recoverable (Marcus) |
| **P3** | Password-first is the legacy default; passwordless under-surfaced |
| **P4** | Trust / anti-phishing uncertainty, worsened by tenant branding |
| **P5** | Accessibility not guaranteed, especially under custom branding |
| **P6** | Multi-account / multi-tenant switching friction (Devan) |
| **P7** | On-page assistance desire — lowest priority, highest risk |
| **D1–D7** | Ideate decisions (see [decision-log.md](../ideation/decision-log.md)) |

---

## 1. Discover → Define decisions

### C-01 · Personas and the low-friction, high-security profile
- **Decided:** Target three high-literacy, low-friction-tolerance, high-security personas —
  Priya (Enterprise Developer), Marcus (IT Admin), Devan (DevOps/SRE) — all frequent,
  multi-account, managed-device users.
- **Why / constraint:** Research findings-synthesis; frames every downstream trade-off
  (speed **and** trust, not one or the other).
- **Implementation impact:** Defaults optimize for the returning power user (identifier-
  first, saved accounts, passwordless), while never sacrificing the trust/a11y contract.

### C-02 · Scope boundaries (non-goals)
- **Decided:** Out of scope — full sign-up, password-reset backend, admin conditional-
  access config UI, post-login dashboard, and any committed on-page Copilot/assistance.
- **Why / constraint:** Research brief §4 / PRD §2; keeps the surface focused and avoids
  the P7 attack surface.
- **Implementation impact:** Reset/create are entry links + return states only
  (`href="#…"` placeholders in `IdentityInput`/`PasswordEntry`); no assistance widget ships.

### C-03 · Hard platform constraints
- **Decided:** Fluent UI React v9 + tokens only; MSAL / Microsoft Entra as the identity
  platform; Azure blues `#0078D4 / #106EBE / #005A9E`; WCAG 2.1 AA; desktop-first
  responsive; unauthenticated-surface safety.
- **Why / constraint:** PRD §4 constraint table.
- **Implementation impact:** These are non-negotiable and are enforced in `theme.ts`,
  the token-only styling in every component, and the a11y contract in `SignInCard`.

---

## 2. Ideate decisions (D1–D7)

### D1 · One continuous canvas over a multi-screen wizard
- **Decided:** Build the page as a **single persistent surface** with in-place state
  transitions (concept C1); reject full-page-reload multi-screen flows and auto-submit
  (anti-pattern C6).
- **Why / constraint:** Serves **P1**; satisfies **FR-1 AC2** (no full-page reload,
  visual continuity) and **NFR-Perf**. C1 scored 24 in evaluation.
- **Implementation impact:** `SignInCard` is a state machine over `LoginState`; only the
  card **body** cross-fades (`durationNormal`, reduced-motion honored). `TrustHeader`/
  `TrustFooter` never unmount. **Do not** introduce routing between states.

### D2 · Passwordless-first, enrollment-driven, never dead-ending
- **Decided:** Order methods from MSAL/Entra enrollment state (C13), lead with a
  passkey-forward hero (C16), guarantee a **silent password fallback** (C15) backed by a
  method-availability matrix (C18). Reject password-first (C20).
- **Why / constraint:** Serves **P3**; satisfies **FR-3** (passwordless default, password
  secondary), **FR-4** (no dead-ends, R1 mitigation).
- **Implementation impact:** `getMethodsForAccount()` returns `AuthMethod[]` sorted by
  `order`; `IdentityMethodList` renders hero/secondary/drawer from that sort — **never
  hard-coded**. If the only method is `password`, `SignInCard` silently routes to S3
  (FR-4 AC1). In production, replace the mock with real enrollment data, preserving `order`.

### D3 · Errors are a system, not scattered strings
- **Decided:** One recovery-first error system — taxonomy/content map (C10) → inline
  specific message + adjacent recovery action (C7) → plain-language policy panel (C8),
  recovery elevated to primary (C9). Reject generic "try again" (C12).
- **Why / constraint:** Serves **P2**; satisfies **FR-6** (specific message + actionable
  step for wrong-password, unknown-account, locked, expired, network, policy-block) and the
  ≥90% recovery metric. C7 scored 25.
- **Implementation impact:** `ERROR_TAXONOMY` in `types.ts` is the single source of truth;
  `ErrorRecovery` renders one `MessageBar` + adjacent `recoveryActions()`; policy blocks
  add an `Accordion` panel. Add new errors to the taxonomy, never as ad-hoc JSX strings.

### D4 · Trust is a reserved, branding-proof layer
- **Decided:** A persistent verified-surface cue (C21) + live account/tenant chip (C22)
  live in a reserved trust zone (C24) tenant branding can theme but never occupy; step-up
  challenges carry protective-framing copy (C23). Reject a restylable/hideable cue (C27).
- **Why / constraint:** Serves **P4**; satisfies **FR-7** (consistent cue survives
  branding), **FR-8**, **FR-5**. C22 scored 25; structural resolution of the branding↔trust
  tension (R2).
- **Implementation impact:** `TrustHeader`/`TrustFooter` are separate from the themeable
  card and always mounted; the "Verified Microsoft sign-in" cue + "Genuine Microsoft
  sign-in surface" reassurance are always present. `MfaVerify` always leads with protective
  copy. Branding must never restyle/remove the trust zone.

### D5 · Accessibility enforced by construction, not audited after
- **Decided:** Theming flows only through Fluent v9 tokens (C28) behind a contrast-
  enforcing gate (C29); full keyboard + visible focus (C30); color-plus-text state (C31);
  live-region status + labeled challenges (C32). Reject free-form CSS branding (C34) and
  post-hoc-only audits.
- **Why / constraint:** Serves **P5**; satisfies **NFR-A11y** (hard constraint). C30/C32
  scored 25.
- **Implementation impact:** All components use token styling; `SignInCard` manages focus +
  polite live region; state is always icon + text (never color alone); `Field` wires
  labels/`aria-describedby`. **The `enforceContrast` gate (C29) is specified but not yet
  implemented** — see §4 open item.

### D6 · Multi-account in scope but held light, pending I7
- **Decided:** Ship the rich account picker (C35) and a ≤2-action tenant switcher (C36)
  with environment badges (C37) at should-have fidelity; do **not** build workspace
  grouping (C38).
- **Why / constraint:** Serves **P6**; C35 also satisfies **FR-2** for P1, so it earns its
  place; but I7 (switching frequency/pain) is unvalidated, so investment stays proportionate
  (AR4).
- **Implementation impact:** `AccountPicker` (FR-2) + `TrustHeader` tenant `Menu` (FR-9)
  are built; workspace grouping is deliberately absent. Validate I7 before deepening.

### D7 · On-page assistance stays explore-only and security-gated
- **Decided:** Do **not** build interactive assistance; Copilot (C41) is **out** for this
  task. Only read-only guidance (C39/C40) may appear, and only after a **documented
  security review sign-off**. A credential-taking help widget (C42) is categorically
  forbidden.
- **Why / constraint:** **P7** scored lowest (15); C41 scored 12 (viability 1) due to the
  R3 unauthenticated attack-surface risk. Satisfies **FR-10** (gating, not delivery) and
  **NFR-Sec AC2**.
- **Implementation impact:** No assistance affordance in the code. `TrustFooter` "Help" is a
  static read-only link. **This is a hard gate:** nothing P7 ships without the security
  sign-off recorded in handoff.

---

## 3. Design → Prototype decisions

### DP-01 · Azure brand ramp via `createLightTheme`
- **Decided:** Build `azureLoginTheme` = `webLightTheme` + `createLightTheme(azureBrandRamp)`
  with the three PRD blues as ramp anchors (80=`#0078D4`, 70=`#106EBE`, 60=`#005A9E`);
  remaining stops are perceptually-spaced fills.
- **Why / constraint:** **NFR-Brand AC1/AC2** — all UI from Fluent tokens; brand blues
  applied via `colorBrand*`, not ad-hoc hex.
- **Implementation impact:** `theme.ts`; apply once via `FluentProvider` in `LoginPage`. The
  three anchors are contract values — do not retune. Raw hex is permitted **only** here.

### DP-02 · Self-contained page shell (no `ProjectLayout`)
- **Decided:** `LoginPage` renders its own `FluentProvider` + full-viewport neutral canvas
  and intentionally avoids `ProjectLayout` (which injects post-login portal chrome).
- **Why / constraint:** The login surface is pre-auth; portal chrome would be wrong and
  would dilute the trust framing (FR-7).
- **Implementation impact:** Keep the login route out of `ProjectLayout`. Surface separation
  is carried by `shadow16`, not background contrast (the ~1.05:1 canvas/card pair is
  intentional and carries no text).

### DP-03 · Mock auth adapter (no real MSAL in the prototype)
- **Decided:** Simulate all auth with `setTimeout` + validation in `types.ts` /
  `SignInCard.tsx`; provide demo **sentinels** (`unknown@…`, `wrong`, `locked`, `policy`)
  to drive every state deterministically.
- **Why / constraint:** Enables design/usability validation and screenshots without a
  backend; keeps the view/state layer production-shaped.
- **Implementation impact:** Production swaps the mock for `@azure/msal-react` at the
  `SignInCard` handler boundary (see implementation-guide §7). Keep the view components
  presentational.

### DP-04 · Single-canvas states implemented S1–S7
- **Decided:** Implement identify (S1), picker (S1b), method (S2), password (S3), MFA (S4),
  loading (S6), success (S7) as in-place transitions; error/recovery (S5) as an overlay slot
  above the current state's primary action.
- **Why / constraint:** Realizes D1/D3 across FR-1/FR-6.
- **Implementation impact:** `SignInCard` body renders exactly one sub-view keyed by
  `state`; `ErrorRecovery` renders whenever `error != null`.

---

## 4. Test findings & resolutions

Test round severity: **0 Critical · 0 High · 6 Medium · 4 Low** (Tenets & Traps), plus the
accessibility audit. Full detail in
[tenets-traps-evaluation.md](../tests/tenets-traps-evaluation.md) and
[accessibility-audit.md](../tests/accessibility-audit.md).

### T-RESOLVED-01 · A-01 `role="listitem"` on a `<button>` — **RESOLVED**
- **Finding:** Applying `role="listitem"` directly to the account-picker `<button>`
  overrode the implicit `button` role (Level A, SC 4.1.2), so AT would announce rows as
  list items, not activatable buttons.
- **Resolution (shipped):** `AccountPicker` now renders each account as a native
  `<button type="button">` **wrapped** in a `<div role="listitem">`, inside a
  `<div role="list" aria-label="Choose an account">`, preserving each row's descriptive
  `aria-label`. Verified in source.
- **Impact:** Clears the one Level A blocker toward **NFR-A11y AC5**. The CI axe crawl must
  still run to formally close AC5.

### Contrast — default theme **PASS**
- **Finding:** Computed WCAG ratios pass in the default theme (white-on-`#0078D4` = 4.53:1,
  link/body/secondary/caption/green all pass). **Caveat:** the brand blue sits *exactly* at
  the 4.5:1 threshold — zero headroom.
- **Impact:** Keep `#0078D4` for text/UI on white/near-white only; any darkening fails AA.
  Documented in implementation-guide §2.

### Open follow-ups (tracked, not blocking — carried to implementation)

| ID | Finding | Severity | Owner | Status |
|---|---|---|---|---|
| **F-01 / A-04** | Heading focus box looks like an editable input (`#signin-heading` focus ring). | Medium | Prototyper (CSS) | Open |
| **F-03** | Pre-auth "Signed in as {email}" copy on S2 is inaccurate (identified ≠ authenticated). | Medium | Designer/copy | Open |
| **F-04 / A-03** | Wrong-password message duplicated across MessageBar + field + live region (announced up to 3×). | Medium | Prototyper | Open |
| **F-06** | "Step {n} of 2" stepper under-states the account-dependent path length. | Medium | Designer | Open |
| **FR-8 contrast gate** | `enforceContrast` (C29) not implemented → only the default theme is AA-verified; tenant branding must not ship until built. | High *(FR-8 only)* | Designer + Prototyper | Open / deferred |
| **A-02** | Redundant `role="alert"` + explicit `aria-live` on the MessageBar (tidy-up). | Low | Prototyper | Open |
| **A-05 / F-10** | Footer + inline links below PRD ≥24px target size. | Medium/Low | Designer/Prototyper | Open |
| **F-07** | MFA number-match auto-approves on a timer; no deny/timeout → `mfa-failed` unreachable in demo. | Low (prototype artifact) | Prototyper | Open (resolved by real MSAL) |
| **F-08** | Wrong-password recovery lacks "Forgot password?" in the MessageBar and doesn't re-focus the field. | Low | Prototyper | Open |
| **F-09** | Account picker uses Tab, not the spec'd arrow-key roving. | Low | Prototyper/Designer | Open (accept or implement) |
| **§7 reflow/zoom** | 320px / 200% zoom not verified live; likely PASS. | Low | Eng (CI) | Verify in CI |

### Strengths to not regress (from Test)
- Persistent, reserved trust zone with icon+text verified cue in every state (FR-7).
- Passwordless-first hero visually dominant and enrollment-ordered (FR-3).
- Plain-language error taxonomy with adjacent recovery + jargon-free policy panel (FR-6).
- State never conveyed by color alone; 44px method/picker rows; reduced-motion honored.
- Protective-framing MFA copy (FR-5 AC1).

---

## 5. Requirement → decision → code traceability

| Req | Decision(s) | Where in code |
|---|---|---|
| FR-1 continuous identifier-first, no reload | D1, DP-04 | `IdentityInput` + `SignInCard` in-place state swap |
| FR-1 AC4 inline account-type detection | D1/C2 | `detectAccountType()` → `IdentityInput` hint |
| FR-2 returning-user picker | D6/C35 | `AccountPicker` |
| FR-3 passwordless-first, password secondary | D2 | `IdentityMethodList` (hero/secondary/drawer) |
| FR-3 AC4 enrollment-driven ordering | D2/C13 | `getMethodsForAccount().order`, sorted in-view |
| FR-4 no dead-ends / silent fallback | D2/C15 | password always in set; single-method → direct S3; "Sign in another way" everywhere |
| FR-5 MFA step-up, protective, keyboard-operable | D4/C23 | `MfaVerify` (number-match/TOTP/FIDO2, "Don't ask again") |
| FR-6 error taxonomy + adjacent recovery + policy panel | D3 | `ERROR_TAXONOMY`, `ErrorRecovery` |
| FR-7 reserved trust zone, always-visible cue | D4 | `TrustHeader`/`TrustFooter` (not tenant-themed) |
| FR-8 tenant branding via tokens (gated) | D4/D5/C29 | `theme.ts`; **`enforceContrast` not yet built** |
| FR-9 multi-account/tenant switch | D6/C36 | `AccountPicker`, `TrustHeader` tenant `Menu` |
| FR-10 scoped assistance (explore-only) | D7 | **not built**; security-gated |
| NFR-A11y WCAG 2.1 AA | D5 | focus + live regions in `SignInCard`; `Field` labels; icon+text; 44px targets |
| NFR-Brand Fluent v9 + Azure palette | DP-01 | `theme.ts` ramp; token-only styling |
| NFR-Perf no reload, persistent chrome | D1/DP-02 | header/footer stay mounted; body cross-fade |
| NFR-Sec unauthenticated-surface safety | D7 | no credential widget; P7 gated |

---

## 6. Accepted risks carried forward

| ID | Risk | Stance |
|---|---|---|
| AR1 | Passwordless-first strands un-enrolled users | Mitigated by silent fallback (C15) + availability matrix (C18); validate against real MSAL states (OQ1). |
| AR2 | Tenant branding dilutes anti-phishing cue | Mitigated by reserved trust zone (C24) + contrast gate (C29 — **still to build**). |
| AR3 | On-page assistance = attack surface | **Avoided:** C41 out; C39/C40 gated on security sign-off. |
| AR4 | I7 unvalidated | Proportionate investment; C38 deferred. |
| AR5 | MSAL device/new-sign-in signal feasibility | Deferred; trust story stands on C21/C22/C24. |
| AR6 | No primary data | Personas/metrics provisional; validate before scope lock. |
