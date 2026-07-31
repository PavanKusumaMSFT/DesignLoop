---
title: "Implementation Guide — Azure Sign-In / Login Page"
phase: deliver
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Handoff Agent"
related:
  - "../strategy/prd.md"
  - "../ideation/decision-log.md"
  - "../designs/design-system.md"
  - "../designs/tokens/fluent-theme.md"
  - "../designs/wireframes/login-page.md"
  - "../prototypes/manifest.md"
  - "../tests/accessibility-audit.md"
  - "../tests/tenets-traps-evaluation.md"
  - "../tests/usability-test-plan.md"
  - "./component-api-reference.md"
  - "./design-engineering-changelog.md"
  - "./handoff-checklist.md"
---

# Implementation Guide — Azure Sign-In / Login Page

This is the step-by-step engineering guide for the **"one continuous, trust-anchored
sign-in canvas"** (Ideate winning concept, [decision-log.md](../ideation/decision-log.md)).
A developer should be able to stand up, understand, extend, and production-wire the
prototype from this document alone. It is grounded in the **actual shipped source** under
`prototype-workspace/components/projects/azure-login-page/` and the PRD requirements
(FR-1…FR-10, NFR-A11y/Brand/Perf/Sec).

> **Prototype vs. production, up front.** The prototype auth is **fully mocked** — no
> network, no MSAL. All behavior is simulated with `setTimeout` + validation in
> `types.ts` and `SignInCard.tsx`. Production wiring means swapping the mock adapter for
> `@azure/msal-react`/`@azure/msal-browser` (see [§7](#7-real-msal-wiring)). The **view
> layer, state machine, trust frame, error taxonomy, and accessibility contract are
> production-shaped** and are meant to be kept.

---

## 1. Environment & setup

The prototype lives inside the shared **`prototype-workspace/`** Next.js (App Router) +
Fluent UI React v9 workspace.

### 1.1 Prerequisites
- Node.js 18+ (repo is validated on current LTS).
- `pnpm` (preferred) — `npm` also works.
- No secrets or Azure app registration are needed to run the **mock** prototype.

### 1.2 Install & run

```bash
cd prototype-workspace
pnpm install          # first time only (npm install also works)
pnpm dev              # Next.js dev server → http://localhost:3000
# open:
#   http://localhost:3000/azure-login-page
```

- The workspace wraps all routes in an MSAL `AuthWrapper`. To view the login canvas
  locally **without** a real Microsoft sign-in, append the audit-bypass query param:
  `http://localhost:3000/azure-login-page/?auditBridge=1`.
- **Production build check:** `cd prototype-workspace && npx next build` (or `pnpm build`).
  The route `/azure-login-page` prerenders as static content (~31.6 kB). `tsc --noEmit`
  is clean for every file in this project.

### 1.3 Where everything is

| File (under `prototype-workspace/`) | Role |
|---|---|
| `app/azure-login-page/page.tsx` | Route entry — a thin `"use client"` wrapper that renders `<LoginPage />`. |
| `components/projects/azure-login-page/index.tsx` | Barrel export (`default` = `LoginPage`; also named exports for every component + `types`). |
| `components/projects/azure-login-page/LoginPage.tsx` | Page shell: `FluentProvider` (Azure brand theme) + full-viewport neutral canvas. |
| `components/projects/azure-login-page/SignInCard.tsx` | Single-surface **state-machine orchestrator** (S1–S7) + error slot. **The heart of the flow.** |
| `components/projects/azure-login-page/TrustHeader.tsx` | Reserved trust zone: verified-surface cue + account/tenant chip + tenant switcher. |
| `components/projects/azure-login-page/TrustFooter.tsx` | Reserved trust zone: genuine-surface reassurance + Privacy/Terms/Help links. |
| `components/projects/azure-login-page/IdentityInput.tsx` | S1 identifier-first entry + inline account-type detection. |
| `components/projects/azure-login-page/AccountPicker.tsx` | S1b returning-user picker. |
| `components/projects/azure-login-page/IdentityMethodList.tsx` | S2 passwordless-first method selection + drawer. |
| `components/projects/azure-login-page/PasswordEntry.tsx` | S3 password fallback floor. |
| `components/projects/azure-login-page/MfaVerify.tsx` | S4 step-up: number-match / TOTP / security-key. |
| `components/projects/azure-login-page/ErrorRecovery.tsx` | S5 error/recovery `MessageBar` + policy `Accordion`. |
| `components/projects/azure-login-page/theme.ts` | `azureLoginTheme` — Azure brand ramp. |
| `components/projects/azure-login-page/types.ts` | Shared types, **error taxonomy**, mock accounts, **mock auth adapter**. |
| `data/projects.ts` | Registry entry `id: "azure-login-page"` in `ALL_PROJECTS`. |

Full per-component prop tables are in the companion
[component-api-reference.md](./component-api-reference.md).

---

## 2. Azure brand theme

**File: `theme.ts`.** All UI must be Fluent v9 tokens (NFR-Brand AC1). The only raw hexes
permitted anywhere in this project are the three PRD brand blues; everywhere else you
reference `tokens.colorBrand*` / `tokens.colorNeutral*` / `tokens.colorPaletteRed|Green|Yellow*`.

### 2.1 The three allowed hexes (PRD constraint / NFR-Brand AC2)

| Role | Hex | Ramp stop | Resolves to Fluent tokens |
|---|---|---|---|
| **Primary** | `#0078D4` | 80 | `colorBrandBackground`, `colorCompoundBrandForeground1`, primary `Button` rest |
| **Hover / pressed** | `#106EBE` | 70 | `colorBrandBackgroundHover`, `colorCompoundBrandForeground1Hover` |
| **Active / deep** | `#005A9E` | 60 | `colorBrandBackgroundPressed`, brand link pressed |

### 2.2 How the ramp is built

```ts
// theme.ts (abridged)
import { createLightTheme, webLightTheme, type BrandVariants, type Theme } from "@fluentui/react-components";

const azureBrandRamp: BrandVariants = {
  // …10–50 dark fills…
  60: "#005A9E", // active / deep  (PRD anchor)
  70: "#106EBE", // hover / pressed (PRD anchor)
  80: "#0078D4", // primary         (PRD anchor)
  // …90–160 light fills…
};

const azureLight: Theme = { ...createLightTheme(azureBrandRamp) };
export const azureLoginTheme: Theme = { ...webLightTheme, ...azureLight };
```

- The **three anchors (60/70/80) are the source of truth**; the other ramp stops are
  perceptually-spaced fills so Fluent's token recipes resolve correctly. Do **not**
  re-tune 60/70/80 — they are contract values traced to the PRD and verified by the
  accessibility audit (white-on-`#0078D4` = **4.53:1**, exactly at AA with no headroom).
- Apply the theme by wrapping the surface in `<FluentProvider theme={azureLoginTheme}>`
  (done once, in `LoginPage.tsx`).

> **Contrast headroom warning (from the a11y audit).** `#0078D4` sits exactly at 4.53:1
> on white. Keep it for text/UI on `#FFFFFF`/near-white only. Any darker card background,
> semi-transparent overlay, or lighter brand stop pushes it below 4.5:1 and fails AA.

### 2.3 Tenant custom branding (FR-8) — **not shipped; gated**

The prototype wires **only the default Azure theme**. The design specifies a
contrast-enforcing gate `enforceContrast()` (concept C29,
[tokens/fluent-theme.md](../designs/tokens/fluent-theme.md)) that every tenant
logo/background/text override must pass before it is applied. **This gate is not yet
implemented.** Do not ship any tenant-branding path until it is (see the
[handoff-checklist](./handoff-checklist.md) tracked item and NFR-A11y AC2/AC6).

---

## 3. Component structure & the single-canvas state machine

The defining decision (**D1**) is that `identify → method → verify → land` are **in-place
states of one persistent `Card`**, not separate routed screens. The `TrustHeader` and
`TrustFooter` stay mounted at all times (FR-7); only the card **body** cross-fades between
states.

### 3.1 The tree

```
app/azure-login-page/page.tsx
└─ LoginPage                         ← FluentProvider(azureLoginTheme) + <main> viewport
   └─ SignInCard                     ← orchestrator; owns ALL flow state
      ├─ TrustHeader                 ← always mounted (verified cue + account/tenant chip)
      ├─ Card
      │  ├─ Azure logo + srOnly live region + heading/subtitle/stepper
      │  ├─ ErrorRecovery            ← rendered when `error != null`
      │  └─ body (key={state}) renders exactly one of:
      │     ├─ IdentityInput         (state "identify"  / S1)
      │     ├─ AccountPicker         (state "picker"    / S1b)
      │     ├─ IdentityMethodList    (state "method"    / S2)
      │     ├─ PasswordEntry         (state "password"  / S3)
      │     ├─ MfaVerify             (state "mfa"        / S4)
      │     ├─ Spinner block         (state "loading"   / S6)
      │     └─ Success block         (state "success"   / S7)
      └─ TrustFooter                 ← always mounted (reassurance + legal links)
```

### 3.2 The state type (`types.ts`)

```ts
export type LoginState =
  | "identify"  // S1
  | "picker"    // S1b
  | "method"    // S2
  | "password"  // S3
  | "mfa"       // S4
  | "loading"   // S6
  | "success";  // S7
```

### 3.3 State held in `SignInCard`

| State var | Type | Purpose |
|---|---|---|
| `state` | `LoginState` | Which sub-view renders. |
| `identifier` | `string` | The typed/selected email or phone. |
| `account` | `KnownAccount \| null` | Resolved account context (drives TrustHeader chip + success line). |
| `chosenMethod` | `MethodKind \| null` | Selected auth method → picks the MFA challenge. |
| `error` | `ErrorKind \| null` | Active taxonomy row; when set, `ErrorRecovery` renders. |
| `submitting` | `boolean` | Disables primary buttons during simulated latency. |
| `loadingLabel` | `string` | Copy on the loading spinner (context-specific). |
| `liveMessage` | `string` | Text pushed to the polite `role="status"` live region (a11y). |

### 3.4 Transition map (as implemented)

| From | Trigger | To | Notes |
|---|---|---|---|
| `identify` | `handleIdentify(value)` | `loading` → `method` | Detects account, computes methods. **Silent fallback:** if the only method is `password`, goes straight to `password` (FR-4 AC1). Sentinel `unknown@…` → `unknown-account` error back on `identify`. |
| `identify` | "Use a saved account" | `picker` | `goto("picker")`. |
| `picker` | `handlePickAccount(acct)` | `method` (or `password`) | Same silent-fallback rule; no re-typing (FR-2 AC2). |
| `method` | `handleChooseMethod(kind)` | `password` if `kind==="password"`, else `mfa` | Passwordless → step-up challenge. |
| `password` | `handlePasswordSubmit(pw)` | `loading` → `mfa` (work) / `success` (personal) | Sentinels: `wrong`→wrong-password, `locked`→locked-account, `policy`→policy-block. |
| `mfa` | `handleMfaVerified()` | `loading` → `success` | `finishSuccess()`. |
| any | recovery action | varies | e.g. `resetToIdentify()`, `goto("method")`, `setError(null)`. |

### 3.5 Two behaviors to preserve

1. **Enrollment-driven method ordering (FR-3 AC4).** Methods come from
   `getMethodsForAccount(email)` in `types.ts`, sorted by their `order` field in the view
   — never hard-coded in JSX. In production this function is replaced by MSAL-reported
   enrollment state.
2. **Accessibility focus + live region (NFR-A11y AC1/AC3).** On each state change a
   `useEffect` focuses `#signin-heading` and writes a `Title. Subtitle` string into the
   polite live region. Loading and success statuses also route through the live region.
   *(See §6 for the two known follow-ups on this mechanism.)*

---

## 4. Props reference (quick view)

Full tables — every prop, type, required flag, default, description, states, and composed
Fluent primitives — are in [component-api-reference.md](./component-api-reference.md). Key
public entry props:

| Component | Public props |
|---|---|
| `LoginPage` | `startWithPicker?: boolean` (default `false`) — seed S1b instead of S1. |
| `SignInCard` | `startWithPicker?: boolean` (default `false`). |
| `IdentityInput` | `onSubmit(id)`, `onUseAccountPicker?()`, `isSubmitting?`, `initialValue?`. |
| `AccountPicker` | `accounts`, `onSelect(account)`, `onUseAnother()`. |
| `IdentityMethodList` | `email`, `methods`, `onChooseMethod(kind)`, `onChangeAccount()`. |
| `PasswordEntry` | `email`, `onSubmit(pw, keepSignedIn)`, `onChangeAccount()`, `onAnotherWay()`, `isSubmitting?`, `externalError?`. |
| `MfaVerify` | `challenge`, `matchNumber?` (42), `onVerified(dontAskAgain)`, `onDifferentMethod()`, `autoApproveMs?` (3200). |
| `ErrorRecovery` | `spec: ErrorSpec`, `actions: RecoveryAction[]`. |
| `TrustHeader` | `account?`, `tenants?`, `onSwitchTenant?`. |
| `TrustFooter` | *(no props)*. |

---

## 5. Mock behavior & demo sentinels

The prototype is deterministic so every state can be demoed and tested without a backend.
Drive it by typing these into the fields:

| Type this | In | Result |
|---|---|---|
| `unknown@…` | S1 email | S5 `unknown-account` error. |
| any `@outlook.com`/`@gmail.com` | S1 email | Personal account → passkey-forward methods. |
| any `@fabrikam.dev` | S1 email | **Only** password enrolled → silent fallback straight to S3 (FR-4 AC1). |
| any other `…@domain.tld` | S1 email | Work account → Authenticator-forward methods. |
| `wrong` | S3 password | S5 `wrong-password`. |
| `locked` | S3 password | S5 `locked-account` (warning). |
| `policy` | S3 password | S5 `policy-block` with expandable plain-language panel. |
| any other password on a **work** account | S3 | S4 MFA (number-match) → success. |
| any other password on a **personal** account | S3 | Straight to S7 success. |
| — | S4 number-match | Auto-approves after ~3.2 s (simulated push). |

The error copy is centralized in `ERROR_TAXONOMY` (`types.ts`) — a single source of truth
for all messages (FR-6 AC1). Mock accounts are in `MOCK_ACCOUNTS`.

---

## 6. Known open follow-ups (carry into implementation)

These are the **still-open** findings from Test. None is Critical/High — the severity
summary is **0 Critical · 0 High** — but they must be tracked. (The previously-reported
Level A defect **A-01** — `role="listitem"` on a `<button>` in `AccountPicker` — is
**RESOLVED**: rows are now native `<button>`s wrapped in `role="listitem"` divs inside a
named `role="list"`.)

| ID | Finding | Fix owner | Where |
|---|---|---|---|
| F-01 / A-04 | Heading focus box looks like an editable input (the `#signin-heading` focus ring mirrors input styling). | Prototyper (CSS) | `SignInCard.tsx` focus effect + `styles.title`. |
| F-03 | Pre-auth **"Signed in as {email}"** copy on S2 is inaccurate (user is identified, not authenticated). | Designer/copy | `IdentityMethodList.tsx` echo line. |
| F-04 / A-03 | Wrong-password message is **duplicated** (MessageBar + field validation + live region → announced up to 3×). | Prototyper | `SignInCard.tsx` `liveMessage`, `PasswordEntry` `externalError`, `ErrorRecovery`. |
| F-06 | **"Step {n} of 2"** stepper under-states the real, account-dependent path length. | Designer | `SignInCard.tsx` `showStepper`/`stepNumber`. |
| FR-8 gate | Tenant-branding **contrast gate** (`enforceContrast`) not implemented → only the default theme is AA-verified. | Designer + Prototyper | `theme.ts` / branding path. |
| A-02 | Redundant `role="alert"` + explicit `aria-live="assertive"` on the MessageBar (harmless, tidy up). | Prototyper | `ErrorRecovery.tsx`. |
| A-05 / F-10 | Footer + inline links below the PRD ≥24px target size. | Designer/Prototyper | `TrustFooter.tsx`, inline `Link as="button"`. |
| F-07 | MFA number-match auto-approves on a timer; no deny/timeout branch → `mfa-failed` unreachable in demo. | Prototyper | `MfaVerify.tsx` (real MSAL supplies this). |

---

## 7. Real MSAL wiring

The prototype's mock adapter lives in **`types.ts`** and the orchestration handlers in
**`SignInCard.tsx`**. Production means replacing the simulated calls with
`@azure/msal-react` / `@azure/msal-browser` while **keeping the view layer, state machine,
trust frame, error taxonomy, and a11y contract intact**.

### 7.1 What is mocked today

| Mock (prototype) | Production replacement |
|---|---|
| `wait(ms)` `setTimeout` in each handler | Real async MSAL/Graph promises. |
| `detectAccountType()` / `isValidIdentifier()` (`types.ts`) | Keep client-side validation, but authority resolution comes from MSAL (`loginHint`, tenant discovery). |
| `getMethodsForAccount(email)` returning static `AuthMethod[]` | MSAL/Entra **reported enrollment state** for the account (FR-3 AC4). Preserve the `order` field so the view's sort still drives the hero/secondary/drawer layout. |
| `MOCK_ACCOUNTS` in `AccountPicker` | MSAL cached accounts: `useMsal().accounts` / `instance.getAllAccounts()`. |
| Password sentinels (`wrong`/`locked`/`policy`) | Real `AuthError` / `InteractionRequiredAuthError` → map error codes onto `ERROR_TAXONOMY` keys. |
| `MfaVerify` timer auto-approve | Real challenge outcome (push approve/deny, TOTP verify, WebAuthn). Wire deny/timeout → `mfa-failed` (closes F-07). |
| `finishSuccess()` → S7 | Successful `acquireToken*` result; then redirect to the Azure portal. |

### 7.2 Suggested integration shape

1. Wrap the app in `MsalProvider` with a `PublicClientApplication` (the workspace already
   has an `AuthWrapper`; align with it rather than double-wrapping).
2. **S1 identify** → `instance.ssoSilent({ loginHint })` or begin an interactive flow with
   the identifier as `loginHint`. On `InteractionRequiredAuthError`, continue in-canvas.
3. **Method screen** → build `AuthMethod[]` from enrollment data; keep passwordless-first
   ordering by `order`.
4. **Password / passwordless / MFA** → each maps to an MSAL interaction; on success call
   the same `finishSuccess()` path.
5. **Errors** → translate MSAL error codes to `ErrorKind` and render via the existing
   `ErrorRecovery` + `recoveryActions()` machinery. Do **not** invent new ad-hoc strings;
   extend `ERROR_TAXONOMY`.
6. **Success** → replace the simulated redirect with the real post-login navigation.

**Do not** move authentication logic into the presentational components — keep
`SignInCard` as the single orchestrator so the state machine, trust frame, and a11y
announcements remain centralized.

---

## 8. Do / Don't patterns

**Do**
- Compose only from Fluent UI React v9 components/tokens (NFR-Brand AC1).
- Route every color through `tokens.colorBrand*`/`colorNeutral*`/`colorPalette*`; the only
  raw hexes allowed are the three PRD blues, and only in `theme.ts`.
- Keep `TrustHeader`/`TrustFooter` mounted in every state (FR-7 AC1/AC2) — tenant branding
  may theme *around* the trust zone but must never occupy, restyle, or remove the verified
  cue.
- Keep all error copy in `ERROR_TAXONOMY`; keep the `MessageBar` as the single canonical
  error surface with an **adjacent** recovery action (FR-6 AC3 — no dead-ends).
- Always pair color with an icon + text for state (NFR-Brand AC3): errors, success, trust
  cue, badges.
- Keep primary actions and method/picker rows at **44px** min target; fix the smaller
  inline/footer links up toward the PRD ≥24 (prefer 44) target.
- Preserve `prefers-reduced-motion` handling on the body cross-fade.

**Don't**
- Don't add a full-page reload between states (breaks D1 / FR-1 AC2 / NFR-Perf AC2).
- Don't add a manual work-vs-personal account toggle (FR-1 AC4 — detection is automatic).
- Don't make password the visual default when a passwordless method is enrolled (FR-3;
  anti-pattern C20/"password-first").
- Don't hard-code method ordering — drive it from enrollment data.
- Don't ship any tenant-branding path before the `enforceContrast` gate exists.
- **Don't add any interactive on-page assistance / Copilot / credential-taking help
  widget** on this unauthenticated surface. P7 (FR-10) is **explore-only** and blocked
  until a documented security review sign-off (D7 / NFR-Sec AC2). This is a hard gate.
- Don't convey any state by color alone.

---

## 9. Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Redirected to Microsoft sign-in instead of the canvas locally | The workspace `AuthWrapper` guards routes. | Append `?auditBridge=1` to the URL. |
| Login page shows portal chrome / nav | Someone wrapped it in `ProjectLayout`. | This flow intentionally renders its **own** `FluentProvider` + viewport (`LoginPage.tsx`); do not use `ProjectLayout`. |
| Brand blue looks wrong / buttons not Azure blue | `FluentProvider theme` missing or overridden. | Ensure the surface is inside `<FluentProvider theme={azureLoginTheme}>` (only `LoginPage` should set it). |
| A method won't appear on S2 | `getMethodsForAccount` didn't include it / `order` off. | Check the mock (or, in prod, the enrollment payload). Sort is by `order` asc. |
| Can't reach S3 password from S2 | Passwordless hero is dominant; password is in the drawer. | Click "Sign in another way" → drawer. *(Discoverability is tracked as F-05.)* |
| Heading looks like a filled text field | Known finding **F-01/A-04** (heading focus box). | Tracked follow-up; suppress the visible focus box on `#signin-heading`. |
| MFA never fails in the demo | Number-match auto-approves on a timer (**F-07**). | Wire a real deny/timeout → `mfa-failed` when integrating MSAL. |
| `next build` type errors elsewhere | Pre-existing unrelated repo errors. | The `azure-login-page` project is `tsc --noEmit` clean; unrelated errors are out of scope. |

---

## 10. Definition of done for implementation

A developer has correctly implemented this feature when: the flow runs as a single
non-reloading canvas (FR-1); passwordless is default with a guaranteed password fallback
(FR-3/FR-4); every error renders from `ERROR_TAXONOMY` with an adjacent recovery action
(FR-6); the reserved trust zone is present in every state and survives branding (FR-7);
the WCAG 2.1 AA contract holds (NFR-A11y) with the CI axe crawl green; all UI is Fluent v9
+ the three brand blues (NFR-Brand); and **no on-page assistance ships without the P7
security sign-off** (NFR-Sec). Track the §6 follow-ups to closure.
