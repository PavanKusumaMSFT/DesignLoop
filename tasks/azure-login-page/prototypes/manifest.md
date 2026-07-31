---
title: "Prototype Manifest — Azure Sign-In / Login Page"
phase: prototype
status: complete
created: 2026-07-29
updated: 2026-07-29
author: "Prototyper Agent"
route: "/azure-login-page"
workspace: "prototype-workspace"
related:
  - "../designs/design-system.md"
  - "../designs/wireframes/login-page.md"
  - "../designs/tokens/fluent-theme.md"
  - "../designs/tokens/token-usage-guide.md"
---

# Prototype Manifest — Azure Sign-In / Login Page

Pointer manifest for the coded prototype. **All runnable source lives in
`prototype-workspace/`** — this `tasks/.../prototypes/` folder holds only this pointer
manifest and verification screenshots (per `prototype-workspace/AGENTS.md`).

## Route

- **Live route:** `/azure-login-page`
- **Page component:** the flow is self-contained and does **not** use `ProjectLayout`
  (which injects post-login portal chrome); it renders its own `FluentProvider` +
  full-viewport canvas.

## How to run

```bash
cd prototype-workspace
pnpm install          # first time only (npm install also works)
pnpm dev              # Next.js dev server on http://localhost:3000
# open http://localhost:3000/azure-login-page
```

- The workspace wraps routes in an MSAL `AuthWrapper`. For local viewing without a
  Microsoft sign-in, append the audit bypass param:
  `http://localhost:3000/azure-login-page/?auditBridge=1`.
- Production build check: `cd prototype-workspace && npx next build` (or `pnpm build`).

## Source files (all under `prototype-workspace/`)

| File | Role |
|---|---|
| `app/azure-login-page/page.tsx` | Route entry — renders `<LoginPage />`. |
| `components/projects/azure-login-page/LoginPage.tsx` | Page shell: `FluentProvider` (Azure brand theme) + neutral viewport canvas. |
| `components/projects/azure-login-page/theme.ts` | `azureLoginTheme` — `webLightTheme` + `createLightTheme(azureBrandRamp)` anchored on `#0078D4 / #106EBE / #005A9E`. |
| `components/projects/azure-login-page/SignInCard.tsx` | Single-surface state-machine orchestrator (S1–S7) + error slot. |
| `components/projects/azure-login-page/TrustHeader.tsx` | Reserved trust zone: verified-surface cue + account/tenant chip + tenant-switcher `Menu`. |
| `components/projects/azure-login-page/TrustFooter.tsx` | Reserved trust zone: genuine-surface reassurance + Privacy/Terms/Help links. |
| `components/projects/azure-login-page/IdentityInput.tsx` | S1 identifier-first entry with inline account-type detection. |
| `components/projects/azure-login-page/AccountPicker.tsx` | S1b returning-user picker (avatar, type hint, environment badge). |
| `components/projects/azure-login-page/IdentityMethodList.tsx` | S2 passwordless-first method selection + "sign in another way" drawer. |
| `components/projects/azure-login-page/PasswordEntry.tsx` | S3 password fallback (show/hide, keep-signed-in, forgot). |
| `components/projects/azure-login-page/MfaVerify.tsx` | S4 step-up: number-match / TOTP / security-key. |
| `components/projects/azure-login-page/ErrorRecovery.tsx` | S5 error/recovery `MessageBar` system + policy `Accordion` panel. |
| `components/projects/azure-login-page/types.ts` | Shared types, error taxonomy, mock accounts, mock auth adapter. |
| `components/projects/azure-login-page/index.tsx` | Barrel export (default = `LoginPage`). |
| `data/projects.ts` | Registry entry `id: "azure-login-page"` added to `ALL_PROJECTS`. |

## States implemented (single canvas, in-place transitions)

| State | Screen | Screenshot |
|---|---|---|
| S1 | Identify — identifier-first entry, inline work/personal detection, light stepper | `screenshots/01-identify.png`, `02-identify-typed-work.png` |
| S1b | Returning-user account picker — avatars, type hints, environment badges, tenant switch | `screenshots/09-account-picker.png` |
| S2 | Choose method — passwordless-first hero (Authenticator/Hello/passkey), password secondary via drawer | `screenshots/03-method-passwordless.png`, `04-method-drawer.png` |
| S3 | Password entry — fallback floor, show/hide, keep-me-signed-in, forgot | `screenshots/05-password.png` |
| S4 | MFA / verify — number-match (protective framing + waiting live region), TOTP, security key | `screenshots/07-mfa-number-match.png` |
| S5 | Error / recovery — taxonomy-driven `MessageBar` + adjacent recovery; policy block plain-language panel | `screenshots/06-error-wrong-password.png`, `10-policy-block.png` |
| S6 | Loading — inline `Spinner`, body cross-fade, header/footer stay mounted, `aria-live` status | (transient; visible between states) |
| S7 | Success — checkmark + "You're signed in" + account · tenant + redirecting spinner | `screenshots/08-success.png` |

### Mock behavior (self-contained — no real MSAL/network)

- Auth simulated with `setTimeout` + validation in `types.ts` / `SignInCard.tsx`.
- **Passwordless-first ordering** is data-driven from `getMethodsForAccount()` (enrollment
  state mock), never hardcoded in the view.
- **Silent fallback:** `@fabrikam.dev` accounts have only password enrolled → the flow lands
  directly on S3 with no error (FR-4 AC1).
- **Sentinels for demoing states** (type these to trigger):
  - Email `unknown@…` → S5 `unknown-account`.
  - Password `wrong` → S5 `wrong-password`; `locked` → `locked-account`; `policy` → policy block.
  - Any correct password on a **work** account → S4 MFA (number-match) → success.
  - Number-match auto-approves after ~3.2 s (simulated phone approval).

## Requirement mapping (FR / NFR)

| Requirement | Where implemented |
|---|---|
| FR-1 identifier-first, single surface, no reload | `IdentityInput` + `SignInCard` in-place state swap (cross-fade body only). |
| FR-1 AC4 inline account-type detection | `detectAccountType()` → `IdentityInput` type hint (no manual toggle). |
| FR-2 / FR-9 returning-user picker + tenant switch | `AccountPicker`, `TrustHeader` tenant `Menu`. |
| FR-3 passwordless-first, password present-but-secondary | `IdentityMethodList` (enrollment-ordered hero + drawer). |
| FR-3 AC4 enrollment-driven ordering | `getMethodsForAccount()` order field, sorted in view. |
| FR-4 no dead-ends / silent fallback floor | password always in method set; single-method → direct S3; "Sign in another way" everywhere. |
| FR-5 MFA step-up, keyboard-operable, trusted-device opt-out | `MfaVerify` (number-match/TOTP/FIDO2, `Don't ask again`). |
| FR-6 error taxonomy + adjacent recovery + policy panel | `ERROR_TAXONOMY`, `ErrorRecovery` (`MessageBar` + `Accordion`). |
| FR-7 reserved trust zone, always-visible verified cue, final account/tenant on success | `TrustHeader`/`TrustFooter` (not tenant-themed), S7 shows account · tenant. |
| FR-8 / NFR-Brand tenant branding via theme tokens only; brand blues via `colorBrand*` | `theme.ts` ramp; all styling via `makeStyles` + Fluent tokens. |
| NFR-A11y focus-to-heading, live regions, labels, color+icon+text, ≥44px targets | `SignInCard` heading focus + `aria-live` status; `Field` labels; icon+text state; 44px rows/buttons. |
| NFR-Perf no full-page reload, persistent chrome, body cross-fade | header/footer stay mounted; only card body swaps with `durationNormal` fade (reduced-motion honored). |

## Verification

- **Build:** `npx next build` in `prototype-workspace/` — **PASS**. Route
  `/azure-login-page` prerendered as static content (31.6 kB). No type errors in any
  `azure-login-page` file (`tsc --noEmit` clean for this project; pre-existing unrelated
  errors elsewhere in the repo are untouched).
- **Runtime:** Playwright drove the live dev route and captured the 10 screenshots in
  `screenshots/` covering S1, S1b, S2 (+drawer), S3, S4, S5 (wrong-password + policy block),
  and S7. All transitions rendered without full-page reload.

## Open items (carried from Design → Test)

- MSAL enrollment-state feasibility (OQ1/AR1) and MSAL device / new-sign-in signals (AR5)
  are mocked here; validate against real MSAL/Entra during the Test phase.
- Contrast-enforcing tenant-branding gate (`enforceContrast`, C29) is specified in
  `tokens/fluent-theme.md` but only the default Azure theme is wired in this build; the gate
  and tenant-override path are deferred to a follow-up.
