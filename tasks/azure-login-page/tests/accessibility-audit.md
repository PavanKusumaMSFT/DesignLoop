---
title: "Accessibility Audit (WCAG 2.1 AA) — Azure Sign-In / Login Page"
phase: test
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Tester Agent"
related:
  - "../prototypes/manifest.md"
  - "../designs/wireframes/login-page.md"
  - "../designs/tokens/fluent-theme.md"
  - "../strategy/prd.md"
  - "./tenets-traps-evaluation.md"
  - "./usability-test-plan.md"
---

# Accessibility Audit (WCAG 2.1 AA) — Azure Sign-In / Login Page

Target: the runnable prototype at `/azure-login-page`. This audit combines
**automated colour-contrast analysis** (computed from the shipped Azure theme
tokens), **manual source inspection** of ARIA/semantics/focus in
`prototype-workspace/components/projects/azure-login-page/*`, and review of the 10
rendered states in `../prototypes/screenshots/`. Success bar: **NFR-A11y AC5 —
zero WCAG 2.1 AA blockers, full keyboard + screen-reader path**.

## How this audit was run

| Dimension | Tool / method | Status |
|---|---|---|
| Colour contrast | Programmatic WCAG 1.4.3/1.4.11 ratio computation over `theme.ts` brand ramp + Fluent `webLight` neutrals | **Run — results below** |
| ARIA / roles / names | Manual source inspection of every component | Run |
| Keyboard operability & focus order | Source inspection + rendered-state walk | Run |
| Screen-reader behaviour | Source inspection of live regions, labels, `aria-*` | Run |
| Motion | `prefers-reduced-motion` review | Run |
| Full-page automated crawl (axe-core) | **Blocked in this environment** — the sandbox denied binding a local dev server (`next dev` → "Permission denied"), so a live DOM crawl could not execute. `axe-core@4.11.1` is present in the repo; the ready-to-run scan is provided in the appendix and **must be executed in CI** to close NFR-A11y AC5. |

> Because the automated DOM crawl could not run here, the findings below are
> derived from source truth and computed contrast. The appendix script reproduces
> the axe pass in any environment that permits `localhost:3000`.

---

## 1. Colour contrast — 1.4.3 (text) / 1.4.11 (UI) · **PASS in default theme**

Computed contrast ratios (sRGB, WCAG formula) for the shipped Azure brand ramp
(`theme.ts`: primary `#0078D4`, hover `#106EBE`, active `#005A9E`) on the card
surface (`colorNeutralBackground1` = `#FFFFFF`):

| Foreground / usage | On | Ratio | Requirement | Result |
|---|---|---:|---|---|
| White text on `#0078D4` primary button | `#0078D4` | **4.53:1** | ≥4.5:1 (normal text) | PASS |
| White on `#106EBE` (hover/pressed) | `#106EBE` | 5.26:1 | ≥4.5:1 | PASS |
| White on `#005A9E` (active/deep) | `#005A9E` | 7.10:1 | ≥4.5:1 | PASS |
| Link `#0078D4` on white | `#FFFFFF` | **4.53:1** | ≥4.5:1 | PASS |
| Body `colorNeutralForeground1` `#242424` | `#FFFFFF` | 15.52:1 | ≥4.5:1 | PASS |
| Secondary `colorNeutralForeground2` `#424242` | `#FFFFFF` | 10.05:1 | ≥4.5:1 | PASS |
| Caption/hint `colorNeutralForeground3` `#616161` | `#FFFFFF` | 6.19:1 | ≥4.5:1 | PASS |
| Trust/success green `colorPaletteGreenForeground1` `#0E700E` | `#FFFFFF` | 6.28:1 | ≥3:1 (icon) | PASS |

**Notes.** The primary-button and link blue sit exactly at the **4.53:1** AA
threshold — passing, but with almost no headroom. Any future darkening of the card
background, semi-transparent overlays, or a lighter brand stop would push these
below 4.5:1. Keep `#0078D4` reserved for text/UI on `#FFFFFF`/near-white only.
The neutral canvas (`colorNeutralBackground2` ≈ `#FAF9F8`) vs. the white card is
~1.05:1 — intentional (surface separation is carried by `shadow16`, not contrast),
which is acceptable since no text relies on that pair.

### 1a. Tenant-branding contrast gate — **deferred (conditional risk)**
- **SC 1.4.3 / 1.4.11 · Severity: High *for FR-8 tenant configs* (N/A for the shipped default theme).**
- The prototype wires **only the default Azure theme**. The contrast-enforcing
  branding gate (`enforceContrast`, C29) specified in
  [tokens/fluent-theme.md](../designs/tokens/fluent-theme.md) is **not implemented**
  (manifest "Open items"). Under NFR-A11y AC2/AC6, custom tenant logo/background/
  text must be contrast-checked or auto-corrected. As shipped, a tenant could
  supply a background that fails contrast against the card/text.
- **Remediation (Designer + Prototyper):** implement the contrast gate before any
  tenant-branding path ships; until then, document that only the default theme is
  AA-verified.

---

## 2. Images & non-text content — 1.1.1 · **PASS**

- Azure logo `img alt="Azure"` (`SignInCard.tsx`), Microsoft logo
  `img alt="Microsoft"` (`TrustHeader.tsx`) — meaningful text alternatives present.
- Decorative icons (`ShieldCheckmark*`, `Person16`, `ChevronDown16`, success
  `CheckmarkCircle48`, method icons, `Avatar` glyph) are correctly
  `aria-hidden="true"` and always paired with a visible text label.

---

## 3. Forms, labels & error identification — 1.3.1 / 3.3.1 / 3.3.2 / 4.1.2 · **PASS**

- Email (`Email, phone, or Skype`), Password (`Password`), and TOTP
  (`Enter the 6-digit code`) all use Fluent `Field` with a real `label`, which wires
  `htmlFor`/`aria-labelledby` and associates `validationMessage` via
  `aria-describedby`/`aria-invalid` — satisfies 3.3.1/3.3.2.
- Password show/hide toggle has a dynamic `aria-label` (`Show password` /
  `Hide password`) — 4.1.2 PASS.
- "Keep me signed in" and "Don't ask again on this device" are labelled `Checkbox`es.
- Empty-submit and malformed-identifier validations are text messages, not
  colour-only.

---

## 4. Names, roles & values / status messages — 4.1.2 / 4.1.3

### A-01 · Account-picker row uses `role="listitem"` on a `<button>` — **SC 4.1.2 (Level A) · Medium**
- **Component:** `AccountPicker.tsx` — `<div role="list">` containing
  `<button type="button" role="listitem">` per account (`09-account-picker.png`).
- **Issue:** applying `role="listitem"` to a native `<button>` **overrides the
  implicit `button` role**. Assistive tech will announce each row as a *list item*,
  not a *button*, so screen-reader users may not perceive the row as activatable —
  a Name/Role/Value defect. (It remains keyboard-operable and has a good
  `aria-label`, which is why this is Medium rather than a hard block, but it is a
  **Level A** correctness issue that must be fixed to clear NFR-A11y AC5.)
- **Remediation:** put `role="listitem"` on a **wrapper** element and leave the
  `<button>` with its native role — e.g. `<div role="listitem"><button…></div>` —
  or drop the list roles entirely and rely on the button group. Preserve the
  existing `aria-label`.

### A-02 · Redundant `role="alert"` + explicit `aria-live` on the MessageBar — **4.1.3 · Low**
- **Component:** `ErrorRecovery.tsx` sets both `role="alert"` and
  `aria-live="assertive"`. `role="alert"` already implies an assertive live region;
  the explicit attribute is redundant (harmless, but tidy up).
- **Remediation:** keep `role="alert"` (or `role="status"` for the info variant) and
  remove the explicit `aria-live`.

### A-03 · Duplicate status announcement of errors — **4.1.3 · Low (verbosity)**
- **Component:** `SignInCard.tsx` copies the error string into the polite
  `role="status"` live region (`liveMessage`) **and** renders it in the assertive
  `role="alert"` MessageBar (and again as the field `validationMessage`). The same
  error is announced up to three times.
- **Remediation:** let `role="alert"` own error announcements; reserve the polite
  live region for non-error status (loading, "You're signed in"). (See also T&T
  F-04.) Not a barrier, but degrades the screen-reader experience Marcus tests for.

### 4b · Live regions that are correct — PASS
- Loading status (`Signing you in…` / `Checking your sign-in options…`) and success
  (`You're signed in. Redirecting…`) are announced via the polite live region and a
  `role="status"` success block — 4.1.3 PASS.
- MFA number-match "Waiting for approval… / Request approved" is in an
  `aria-live="polite"` region; the match number carries `aria-label="Match number 42"`
  so it reads as an integer, not spaced digits — good.

---

## 5. Keyboard operability & focus — 2.1.1 / 2.4.3 / 2.4.7 / 3.2.1

### PASS
- All interactive controls are native `<button>`/`<input>`/Fluent `Link`/`Menu`;
  Enter submits forms; the tenant-switch `Menu` and the policy `Accordion` are
  Fluent-managed and keyboard-operable — **2.1.1 PASS, no keyboard traps (2.1.2)**.
- Visible focus: Fluent's `colorStrokeFocus2` ring is present; `AccountPicker` rows
  add an explicit `:focus-visible` outline — **2.4.7 PASS**.

### A-04 · Focus-to-heading vs. field autofocus conflict — **2.4.3 / review · Medium**
- **Component:** `SignInCard.tsx` moves focus to the `#signin-heading` on every
  state change, overriding the `autoFocus` on the S1 email and S3 password inputs.
- **Impact:** (a) keyboard-first users (Priya, P1) must Tab to reach the field;
  (b) after a wrong password, focus lands on the heading, not the field (spec said
  the field retains focus); (c) the heading's focus box visually resembles an input
  (see T&T F-01 — a 3.2 "looks-like-what-it-isn't" concern). Programmatic focus
  after a user-initiated transition does not violate **3.2.1 On Focus**, so this is
  a focus-order/experience issue rather than a hard failure.
- **Remediation:** pick one focus target per state (field for entry states, heading
  for non-entry states) and suppress the visible box on the heading.

---

## 6. Target size — 2.5.5 (AAA) / 2.5.8 (WCAG 2.2 AA) / PRD ≥24px

### A-05 · Small, tightly-spaced text targets — **PRD target-size (≥24px) · Medium**
- **Components:** `TrustFooter.tsx` Privacy · Terms · Help links (`fontSizeBase200`
  ≈ 12px, separated by thin vertical dividers); inline `Link as="button"` "Change" /
  "Use a saved account" echoes; the password show/hide `size="small"` transparent
  button.
- **Issue:** these fall short of the PRD's explicit **≥24×24 CSS px (prefer 44×44)**
  requirement and the 12px footer links sit close together, raising mis-tap risk on
  mobile-web (NFR-Responsive). The primary buttons and method/picker rows correctly
  meet 44px, so this is scoped to secondary/inline links.
- **Remediation:** add vertical padding / min-height to inline and footer links so
  their hit area is ≥24px (prefer 44 on the <640px breakpoint), and increase spacing
  between the footer links.

---

## 7. Reflow, zoom & responsive — 1.4.4 / 1.4.10 · **Verify (Low)**

- The card is `max-width: 440px` and grows to `100%` minus gutters below 640px
  (spec §1); layout uses tokenised spacing and no fixed pixel text sizes that would
  block 200% zoom. This is **likely PASS** but **could not be verified live** in
  this environment — confirm no horizontal scroll of core actions at 320px width and
  200% zoom during the CI axe run / manual pass.

---

## 8. Motion — 2.3.3 · **PASS**

- The only animation is the body opacity cross-fade (`SignInCard.tsx`), which is
  disabled under `@media (prefers-reduced-motion: reduce)`. Spinners convey
  essential status. No parallax, auto-playing, or flashing content — no 2.3.1
  concern.

---

## 9. Colour is not the sole means — 1.4.1 · **PASS**

- Errors pair a red intent with an icon + text; success pairs green with a
  checkmark + "You're signed in"; the trust cue pairs green with a shield icon +
  "Verified Microsoft sign-in"; account-type and environment are text + `Badge`
  text. Satisfies NFR-Brand AC3.

---

## Findings summary

| ID | SC | Level | Severity | Blocks AC5? |
|---|---|---|---|---|
| A-01 | 4.1.2 Name, Role, Value | **A** | Medium | **Yes — must fix** |
| Tenant contrast gate | 1.4.3 / 1.4.11 | AA | High *(FR-8 only)* | Not for default theme; **yes before tenant branding ships** |
| A-04 | 2.4.3 focus order | A | Medium | No (review/UX) |
| A-05 | 2.5.8 (WCAG 2.2) / PRD ≥24 | AA | Medium | Recommended |
| A-02 | 4.1.3 | AA | Low | No |
| A-03 | 4.1.3 | AA | Low | No |
| §7 reflow/zoom | 1.4.10 | AA | Low | Verify in CI |

**Verdict.** The default Azure theme is **strongly compliant**: contrast passes,
forms are labelled, errors are identified, keyboard operability and visible focus
are present, colour is never the sole signal, and motion respects user
preference. **One Level A defect (A-01, `role="listitem"` on a button)** and the
**deferred tenant-branding contrast gate** stand between the prototype and a clean
NFR-A11y AC5 sign-off; A-04/A-05 are AA/UX improvements. **No Critical barriers.**
A live axe-core crawl must still be run in CI (script below) to formally close AC5.

---

## Appendix — reproducible axe-core scan (run in CI / a network-enabled env)

`axe-core@4.11.1` and Playwright are already vendored in the repo. From
`prototype-workspace/`, start the dev server (append `?auditBridge=1` to bypass the
MSAL `AuthWrapper` for local viewing) and inject the bundled axe script:

```js
// a11y-scan.mjs — node a11y-scan.mjs  (dev server must be on :3000)
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const BASE = "http://localhost:3000/azure-login-page/?auditBridge=1";

const browser = await chromium.launch();
const page = await browser.newPage();

async function scan(label) {
  await page.addScriptTag({ content: axeSource });
  const results = await page.evaluate(async () => await window.axe.run(document, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
  }));
  const v = results.violations;
  console.log(`\n[${label}] violations: ${v.length}`);
  for (const item of v) console.log(`  ${item.impact}\t${item.id}\t${item.nodes.length}\t${item.help}`);
}

await page.goto(BASE, { waitUntil: "networkidle" });
await scan("S1 identify");

// Drive the flow and re-scan each state:
await page.getByRole("button", { name: "Use a saved account" }).click();
await scan("S1b picker");
await page.getByRole("button", { name: /Priya Sharma.*contoso/i }).click();
await scan("S2 method (work)");
// wrong-password path:
// (from S2 → open drawer → Use your password → type "wrong" → Sign in)
// policy path: type "policy"; locked: "locked"; unknown email: unknown@corp.com

await browser.close();
```

Run: `node a11y-scan.mjs`. **Exit criterion for NFR-A11y AC5:** zero
`critical`/`serious` violations across S1, S1b, S2, S3, S4, S5 (wrong-password +
policy-block) and S7. Fix A-01 first — axe's `aria-required-parent` /
`aria-allowed-role` rules will flag the `listitem`-on-button.
