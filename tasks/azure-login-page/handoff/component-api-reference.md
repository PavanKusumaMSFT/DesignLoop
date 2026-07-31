---
title: "Component API Reference — Azure Sign-In / Login Page"
phase: deliver
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Handoff Agent"
related:
  - "../prototypes/manifest.md"
  - "../designs/design-system.md"
  - "./implementation-guide.md"
  - "./design-engineering-changelog.md"
  - "./handoff-checklist.md"
---

# Component API Reference — Azure Sign-In / Login Page

Developer-facing API documentation for every component in
`prototype-workspace/components/projects/azure-login-page/`. Props, types, required flags,
defaults, and descriptions are taken **directly from the shipped source**. All components
are `"use client"` React function components styled with Fluent v9 `makeStyles` + design
tokens. Types referenced (`LoginState`, `KnownAccount`, `AuthMethod`, `MethodKind`,
`ErrorKind`, `ErrorSpec`, `Environment`, `AccountType`) are defined in `types.ts`.

Barrel (`index.tsx`): `default` = `LoginPage`; named exports for `LoginPage`, `SignInCard`,
`TrustHeader`, `TrustFooter`, `IdentityInput`, `AccountPicker`, `IdentityMethodList`,
`PasswordEntry`, `MfaVerify`, `ErrorRecovery`, plus `export * from "./types"`.

---

## LoginPage

**File:** `LoginPage.tsx` · **Purpose:** Page shell. Wraps the flow in a `FluentProvider`
with the Azure brand theme and a full-viewport neutral canvas. Intentionally does **not**
use `ProjectLayout` (which injects post-login portal chrome).

**Props** (`LoginPageProps`)

| Name | Type | Required | Default | Description |
|---|---|:--:|---|---|
| `startWithPicker` | `boolean` | No | `false` | Start on the returning-user account picker (S1b) instead of the empty S1 field. Forwarded to `SignInCard`. |

- **States:** none of its own (stateless shell).
- **Fluent primitives:** `FluentProvider` (theme = `azureLoginTheme`), `makeStyles`,
  `tokens`. Renders a `<main>` viewport centering `<SignInCard />`.

---

## SignInCard

**File:** `SignInCard.tsx` · **Purpose:** Single-surface orchestrator for the whole sign-in
flow. All states S1–S7 are in-place transitions of one persistent `Card`; the
`TrustHeader`/`TrustFooter` stay mounted. Auth is fully simulated (timeouts + validation) —
no real MSAL. Owns all flow state and renders the error slot + the current sub-view.

**Props** (`SignInCardProps`)

| Name | Type | Required | Default | Description |
|---|---|:--:|---|---|
| `startWithPicker` | `boolean` | No | `false` | Seed the returning-user picker (S1b) on first load. |

**Internal state**

| State | Type | Purpose |
|---|---|---|
| `state` | `LoginState` | Active sub-view (`identify`/`picker`/`method`/`password`/`mfa`/`loading`/`success`). |
| `identifier` | `string` | Entered/selected email or phone. |
| `account` | `KnownAccount \| null` | Resolved account context. |
| `chosenMethod` | `MethodKind \| null` | Selected auth method → picks MFA challenge via `challengeForMethod()`. |
| `error` | `ErrorKind \| null` | Active taxonomy row; renders `ErrorRecovery` when set. |
| `submitting` | `boolean` | Disables primary buttons during simulated latency. |
| `loadingLabel` | `string` | Loading `Spinner` copy (context-specific). |
| `liveMessage` | `string` | Text for the polite `role="status"` live region. |

**Key behaviors:** `useEffect` moves focus to `#signin-heading` and announces
`Title. Subtitle` on each state change (NFR-A11y AC1/AC3); `getMethodsForAccount()` +
`useMemo` derive the method list; silent fallback to `password` when it is the only method
(FR-4 AC1); `recoveryActions(kind)` maps each error to its recovery button(s)/link(s).

- **Fluent primitives:** `Card`, `Title2` (as `h1`, `id="signin-heading"`, `tabIndex={-1}`),
  `Body1`, `Spinner`, `makeStyles`, `tokens`; icon `CheckmarkCircle48Filled`. Composes
  `TrustHeader`, `TrustFooter`, `ErrorRecovery`, and the seven sub-views.

---

## TrustHeader

**File:** `TrustHeader.tsx` · **Purpose:** Reserved trust zone above the card. Always
renders the verified-surface cue (shield icon + "Verified Microsoft sign-in"); tenant
branding may theme around it but can never remove/restyle it (FR-7 AC1/AC2). Optionally
shows the active account/tenant chip with a tenant-switcher `Menu` (C36).

**Props** (`TrustHeaderProps`)

| Name | Type | Required | Default | Description |
|---|---|:--:|---|---|
| `account` | `KnownAccount \| null` | No | `undefined` | Active account/tenant context; the chip renders only once this is set (C22). |
| `tenants` | `string[]` | No | `undefined` | Alternate tenants the account can switch to. When length > 1, the chip becomes a `Menu` (C36 tenant switcher). |
| `onSwitchTenant` | `(tenant: string) => void` | No | `undefined` | Callback when a tenant is chosen from the switcher menu. |

- **States:** no account → cue only; account + single tenant → cue + labeled chip
  `Button`; account + multiple tenants → cue + `Menu`-backed chip.
- **Fluent primitives:** `Text`, `Menu`, `MenuTrigger`, `MenuPopover`, `MenuList`,
  `MenuItem`, `Button` (`appearance="subtle"`, `size="small"`); icons
  `ShieldCheckmark20Filled`, `ChevronDown16Regular`, `Person16Filled`. Wrapped in a
  semantic `<header>`.

---

## TrustFooter

**File:** `TrustFooter.tsx` · **Purpose:** Reserved trust footer (C24). Genuine-surface
reassurance ("Genuine Microsoft sign-in surface") plus static legal/support links. Help is
**read-only** — no credential-taking widget (NFR-Sec, C42 forbidden).

**Props:** none.

- **States:** static (no internal state).
- **Fluent primitives:** `Text`, `Link` (Privacy / Terms / Help, all `href="#…"`
  placeholders), `Divider` (vertical separators), `makeStyles`, `tokens`; icon
  `ShieldCheckmark16Regular`. Wrapped in a semantic `<footer>` with a
  `<nav aria-label="Legal and support">`.
- **Note:** links use `fontSizeBase200` (~12px) — flagged small target size (A-05/F-10).

---

## IdentityInput

**File:** `IdentityInput.tsx` · **Purpose:** S1 identifier-first entry (FR-1). Single
email/phone/Skype field with inline account-type detection (C2 — never a manual toggle) and
a single primary action.

**Props** (`IdentityInputProps`)

| Name | Type | Required | Default | Description |
|---|---|:--:|---|---|
| `onSubmit` | `(identifier: string) => void` | **Yes** | — | Called with the validated, trimmed identifier to advance to method selection. |
| `onUseAccountPicker` | `() => void` | No | `undefined` | Switches to the S1b picker; when omitted the "Use a saved account" link is hidden. |
| `isSubmitting` | `boolean` | No | `false` | Disables the primary button and swaps its label to "Checking…" with a spinner. |
| `initialValue` | `string` | No | `""` | Prefills the field (e.g. when returning to S1). |

- **Internal state:** `value` (field text), `error` (validation message).
- **Validation:** empty → "Enter your email, phone, or Skype name."; invalid (per
  `isValidIdentifier`) → "That doesn't look right…". Account type shown via
  `detectAccountType()` in the field hint ("Work or school account" / "Personal account").
- **Fluent primitives:** `Field` (label "Email, phone, or Skype", `validationState`/
  `validationMessage`, `hint`), `Input` (`type="email"`, `autoComplete="username"`,
  `autoFocus`), `Button` (`type="submit"`, `appearance="primary"`), `Link` ("No account?
  Create one", "Use a saved account"), `Caption1`, `Spinner`.

---

## AccountPicker

**File:** `AccountPicker.tsx` · **Purpose:** S1b returning-user account picker (FR-2, FR-9).
Rich rows with avatar, name, email, account-type hint, and optional environment badge
(C37). Selecting a row advances to that account's method screen without re-typing. Always
offers "Use another account".

**Props** (`AccountPickerProps`)

| Name | Type | Required | Default | Description |
|---|---|:--:|---|---|
| `accounts` | `KnownAccount[]` | **Yes** | — | Accounts to list (each rendered as a selectable row). |
| `onSelect` | `(account: KnownAccount) => void` | **Yes** | — | Called with the chosen account to advance to its method screen. |
| `onUseAnother` | `() => void` | **Yes** | — | Called by the "Use another account" action (resets to S1). |

- **States:** static list; each row has hover (`shadow4` + bg) and `:focus-visible`
  (2px `colorStrokeFocus2`) styling. Env badge color: Prod=success, Staging=warning,
  Dev=informative.
- **Accessibility (A-01 resolved):** rows are native `<button type="button">` elements,
  each wrapped in a `<div role="listitem">`, inside a `<div role="list"
  aria-label="Choose an account">`. Each button has a descriptive `aria-label`
  (name, email, account type, environment).
- **Fluent primitives:** `Avatar` (`color="colorful"`), `Badge` (`appearance="tint"`,
  `size="small"`), `Body1`, `Caption1`, `Button` (subtle "Use another account"); icon
  `Person24Regular`.

---

## IdentityMethodList

**File:** `IdentityMethodList.tsx` · **Purpose:** S2 passwordless-first method selection
(FR-3, FR-4). The first enrollment-ordered method is the visually dominant **primary**
action; other methods are secondary. Password is present but never the visual default when
passwordless is enrolled. "Sign in another way" reveals the full availability matrix
(drawer).

**Props** (`IdentityMethodListProps`)

| Name | Type | Required | Default | Description |
|---|---|:--:|---|---|
| `email` | `string` | **Yes** | — | Identifier echoed at the top ("Signed in as {email}" — flagged copy, see F-03). |
| `methods` | `AuthMethod[]` | **Yes** | — | Available methods; sorted by `order` in-view (hero = lowest order). |
| `onChooseMethod` | `(kind: MethodKind) => void` | **Yes** | — | Called with the chosen method kind. |
| `onChangeAccount` | `() => void` | **Yes** | — | "Change" affordance → resets to S1. |

- **Internal state:** `drawerOpen` (boolean) — reveals the full method list.
- **Layout logic:** `hero` = first sorted method (primary button); one additional non-
  password method may render as a secondary button; everything else (incl. password) lives
  in the drawer behind "Sign in another way".
- **Method icons:** passkey `Key24Regular`, authenticator `PhoneLaptop24Regular`,
  windows-hello `Fingerprint24Regular`, password `Password24Regular`.
- **Fluent primitives:** `Button` (primary hero / secondary / subtle drawer toggle),
  `Divider` ("or"), `Caption1`, `Link` ("Change").

---

## PasswordEntry

**File:** `PasswordEntry.tsx` · **Purpose:** S3 password entry, the guaranteed fallback
floor (C15, FR-3 AC2 / FR-4 AC1). Show/hide toggle, keep-me-signed-in, forgot-password
link, and a one-action return to method selection.

**Props** (`PasswordEntryProps`)

| Name | Type | Required | Default | Description |
|---|---|:--:|---|---|
| `email` | `string` | **Yes** | — | Identifier echoed above the field with a "Change" link. |
| `onSubmit` | `(password: string, keepSignedIn: boolean) => void` | **Yes** | — | Called with the entered password and the keep-signed-in checkbox state. |
| `onChangeAccount` | `() => void` | **Yes** | — | "Change" → resets to S1. |
| `onAnotherWay` | `() => void` | **Yes** | — | "Sign in another way" → back to S2 method selection (FR-4 AC2). |
| `isSubmitting` | `boolean` | No | `false` | Disables the primary button; swaps label to "Signing in…" with a spinner. |
| `externalError` | `string \| null` | No | `null` | External error (e.g. wrong-password) associated with the field via `validationMessage`. |

- **Internal state:** `password`, `show` (visibility toggle), `keep` (keep-signed-in),
  `error` (local validation). Shown error = local `error ?? externalError`.
- **Validation:** empty → "Enter your password."
- **Fluent primitives:** `Field` (label "Password"), `Input` (`type` toggles
  password/text, `autoComplete="current-password"`, `autoFocus`, `contentAfter` = show/hide
  `Button` with dynamic `aria-label`), `Checkbox` ("Keep me signed in"), `Link` ("Forgot
  password?"), `Button` (primary "Sign in" + subtle "Sign in another way"), `Caption1`,
  `Spinner`; icons `Eye20Regular` / `EyeOff20Regular`.

---

## MfaVerify

**File:** `MfaVerify.tsx` · **Purpose:** S4 MFA / step-up verification (FR-5). Always leads
with protective-framing copy (C23). Supports number-matching push (live-region waiting
state), 6-digit TOTP (keyboard-operable), and FIDO2 security key. Offers a trusted-device
opt-out and a no-dead-end escape to choose another method.

Also exports the type: `export type MfaChallenge = "number-match" | "totp" | "security-key";`

**Props** (`MfaVerifyProps`)

| Name | Type | Required | Default | Description |
|---|---|:--:|---|---|
| `challenge` | `MfaChallenge` | **Yes** | — | Which challenge UI to render. |
| `matchNumber` | `number` | No | `42` | Number the user matches on their device (number-match challenge). |
| `onVerified` | `(dontAskAgain: boolean) => void` | **Yes** | — | Called on success with the "Don't ask again on this device" state. |
| `onDifferentMethod` | `() => void` | **Yes** | — | "I can't use this method" → back to S2 (FR-4 AC2). |
| `autoApproveMs` | `number` | No | `3200` | Simulated push auto-approve delay for number-match (prototype only; real MSAL supplies the outcome — see F-07). |

- **Internal state:** `code` (TOTP), `dontAsk` (trusted-device opt-out), `error`,
  `approved` (number-match approval flag).
- **Behavior:** number-match auto-approves via `setTimeout(autoApproveMs)`; TOTP validates
  `^\d{6}$`; security-key resolves on button press. `challengeForMethod()` in `SignInCard`
  maps authenticator→number-match, windows-hello/passkey→security-key, else→totp.
- **Fluent primitives:** `Field` + `Input` (`inputMode="numeric"`, `maxLength={6}`,
  `autoComplete="one-time-code"`), `Button` (primary Verify / Use security key), `Checkbox`
  ("Don't ask again on this device"), `Body1`, `Text` (match number, `aria-label="Match
  number {n}"`), `Spinner` (waiting, `aria-live="polite"`), `Link` ("I can't use this
  method").

---

## ErrorRecovery

**File:** `ErrorRecovery.tsx` · **Purpose:** S5 error/recovery system (FR-6). Renders one
`MessageBar` (highest severity) from the error taxonomy with adjacent recovery action(s).
Policy blocks add an expandable plain-language panel (C8). Uses `role="alert"` (or
`role="status"` for non-urgent info) and color + icon + text — never color alone.

**Props** (`ErrorRecoveryProps`)

| Name | Type | Required | Default | Description |
|---|---|:--:|---|---|
| `spec` | `ErrorSpec` | **Yes** | — | Taxonomy row: `kind`, `message`, `intent` (`error`/`warning`/`info`), optional `status` (use `role="status"`), optional `policyPanel { summary, detail }`. |
| `actions` | `RecoveryAction[]` | **Yes** | — | Adjacent recovery action(s) — always ≥1 (no dead-ends, FR-6 AC3). |

**`RecoveryAction`**

| Name | Type | Required | Description |
|---|---|:--:|---|
| `label` | `string` | Yes | Action label. |
| `onClick` | `() => void` | Yes | Handler. |
| `asLink` | `boolean` | No | Render as a `Link` instead of a `Button`. |

- **A11y note (A-02):** `MessageBar` sets both `role` and an explicit `aria-live`
  (`assertive` for alert / `polite` for status) — the explicit `aria-live` is redundant
  with `role="alert"`; tidy-up follow-up.
- **Fluent primitives:** `MessageBar` (+ `MessageBarBody`, `MessageBarActions`), `Button`
  (`size="small"`, `appearance="primary"`), `Link`, `Accordion` (+ `AccordionItem`,
  `AccordionHeader`, `AccordionPanel`) for the policy panel, `Text`.

---

## Shared types & helpers (`types.ts`)

Not a component, but the contract every component consumes.

| Export | Kind | Purpose |
|---|---|---|
| `LoginState` | union type | The seven flow states (S1–S7). |
| `AccountType` | `"work" \| "personal"` | Account classification. |
| `Environment` | `"Prod" \| "Staging" \| "Dev"` | Optional environment badge on accounts. |
| `KnownAccount` | interface | `id`, `displayName`, `email`, `type`, `tenant`, `environment?`. |
| `MethodKind` | union type | `passkey \| authenticator \| windows-hello \| password`. |
| `AuthMethod` | interface | `kind`, `label`, `order` (enrollment-driven ordering, FR-3 AC4). |
| `ErrorKind` | union type | 7 error kinds (wrong-password, unknown-account, locked-account, expired-session, network-error, policy-block, mfa-failed). |
| `ErrorSpec` | interface | `kind`, `message`, `intent`, `status?`, `policyPanel?`. |
| `ERROR_TAXONOMY` | const map | **Single source of truth** for all error copy (FR-6 AC1). |
| `MOCK_ACCOUNTS` | const | Seed accounts for the picker (prototype only). |
| `getMethodsForAccount(email)` | fn | Returns enrollment-ordered `AuthMethod[]` (prototype mock → swap for MSAL). |
| `detectAccountType(email)` | fn | Inline work/personal detection (FR-1 AC4). |
| `isValidIdentifier(value)` | fn | Client-side email/phone validation. |
| `wait(ms)` | fn | Simulated async delay (prototype only). |

---

## Theme (`theme.ts`)

| Export | Kind | Purpose |
|---|---|---|
| `azureLoginTheme` | `Theme` | `webLightTheme` merged with `createLightTheme(azureBrandRamp)`; brand ramp anchored on `#0078D4` (80), `#106EBE` (70), `#005A9E` (60). Apply via `<FluentProvider theme={azureLoginTheme}>`. |
