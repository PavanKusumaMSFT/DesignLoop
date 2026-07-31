---
title: "Tenets & Traps Evaluation — Azure Sign-In / Login Page"
phase: test
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Tester Agent"
related:
  - "../prototypes/manifest.md"
  - "../designs/wireframes/login-page.md"
  - "../designs/design-system.md"
  - "../strategy/prd.md"
  - "../strategy/personas.md"
  - "./accessibility-audit.md"
  - "./usability-test-plan.md"
---

# Tenets & Traps Evaluation — Azure Sign-In / Login Page

Heuristic usability evaluation of the runnable Fluent UI React v9 prototype at
route `/azure-login-page`, using **Microsoft's UI Tenets & Traps** framework. The
evaluation covers the single-canvas flow **S1 identify → S1b picker → S2 method →
S3 password → S4 MFA → S6 loading → S7 success**, plus the **S5 error/recovery**
system. Evidence: component source under
`prototype-workspace/components/projects/azure-login-page/*` and the 10 rendered
states in `../prototypes/screenshots/`.

## Method

Each screen/state was walked against the design spec
([login-page.md](../designs/wireframes/login-page.md)) and PRD acceptance criteria
([prd.md](../strategy/prd.md)). Findings are mapped to a **Tenet** (the principle
upheld or violated) and a named **Trap** (the anti-pattern), with a severity and a
concrete, minimal remediation. Severity scale: **Critical** (blocks task /
destroys trust) · **High** (major friction or likely error) · **Medium**
(noticeable friction, degrades quality/trust) · **Low** (polish).

### Tenets referenced

| Code | Tenet |
|---|---|
| TN-1 | **Deliver the intended experience** — the UI does what the design promised. |
| TN-2 | **Reduce cognitive load** — minimal thinking to reach the goal. |
| TN-3 | **Communicate clearly & truthfully** — copy and state reflect reality. |
| TN-4 | **Provide feedback** — every action has a visible, honest response. |
| TN-5 | **Prevent errors & support recovery** — no dead-ends; recovery is easy. |
| TN-6 | **Respect the user's time & attention** — fewest steps, no wasted motion. |
| TN-7 | **Be discoverable** — actions look like what they are. |
| TN-8 | **Be trustworthy** — especially critical on an unauthenticated surface. |
| TN-9 | **Be consistent & inclusive** — predictable, accessible to all. |

### Trap codes referenced

| Code | Trap | Short definition |
|---|---|---|
| TR-A | **Mystery Meat** | Interactive control gives no visible affordance. |
| TR-B | **Metaphor Mismatch** | Visual language of one control adopted by another. |
| TR-C | **Buried Treasure** | A needed action is hidden behind extra steps. |
| TR-D | **Broken Promise** | The UI states an expectation it does not keep. |
| TR-E | **Crying Wolf / The Ransom Note** | Redundant or over-loud messaging dilutes signal. |
| TR-F | **Illusion of Completeness** | A state looks finished/handled when a path is missing. |
| TR-G | **Roach Motel** | Easy to get in, extra work to get where you meant to go. |
| TR-H | **Misleading State** | On-screen copy misrepresents the system's actual state. |

---

## Top Issues (fix before test execution)

| # | Finding | Tenet | Trap | Severity |
|---|---|---|---|---|
| 1 | **Heading focus ring looks like a filled text input.** On every state change `SignInCard` moves focus to the `<Title2 as="h1" tabIndex={-1} id="signin-heading">`; Fluent's focus outline draws a full-width bordered box around the heading text. In `01-identify.png` the "Sign in" heading is enclosed in the same blue-outlined rectangle as the email `Input` directly beneath it — a keyboard user can reasonably believe focus is in an editable field and begin typing to no effect. | TN-2, TN-3 | TR-B | **Medium** |
| 2 | **"Signed in as {email}" appears before authentication.** On S2 (`IdentityMethodList`, `03-method-passwordless.png`) the account echo reads *"Signed in as priya@contoso.com"* while the user has only been *identified* — no credential has been verified. On a trust-critical unauthenticated surface, telling the user they are "signed in" is inaccurate and undermines the page's own anti-phishing/trust mandate (FR-7). | TN-3, TN-8 | TR-H | **Medium** |
| 3 | **Wrong-password error is shown twice, simultaneously.** `06-error-wrong-password.png` renders the identical sentence *"That password isn't correct. Try again or reset it."* both in the `MessageBar` (with a "Try again" action) **and** as the `Field` `validationMessage` under the input. It is also announced twice to assistive tech (assertive `role="alert"` on the MessageBar + the polite `role="status"` live region that `SignInCard` sets to the same message). Double signal reduces trust in the message and adds screen-reader verbosity. | TN-3, TN-4 | TR-E | **Medium** |
| 4 | **Password fallback is two levels deep and low-affordance on S2.** Per FR-3 AC2 password must be "clearly available but secondary." In `IdentityMethodList`, password lives only inside the collapsed drawer, reachable via a **subtle-appearance** "Sign in another way" control that renders as plain bold text with no underline/button chrome (`03-method-passwordless.png`). A user who currently cannot use passwordless (phone unavailable) must first *notice* an unstyled control, then expand a drawer — two interactions with weak discoverability. | TN-7, TN-5 | TR-C, TR-A | **Medium** |

---

## All Findings

### F-01 · Heading focus indicator reads as an input field
- **State/component:** all states · `SignInCard.tsx` (focus-to-heading effect, lines 166–172) + `01-identify.png`.
- **Tenet/Trap:** TN-2, TN-3 / TR-B (Metaphor Mismatch). **Severity: Medium.**
- **Detail:** `useEffect` calls `document.getElementById("signin-heading").focus()` on each state; the heading is a non-interactive `<h1>` with `tabIndex={-1}`. The resulting focus ring is a rectangular outline that mirrors the input styling, so the very first thing a user sees (S1) is a title that looks like a pre-filled text box. This also fights the `autoFocus` on the email `Input` (see F-02).
- **Remediation (Prototyper):** keep the programmatic focus for screen-reader announcement but suppress the *visible* box on the heading (e.g. focus a visually-quiet container or apply an outline-none focus style scoped to the heading), or move focus to the first field on entry states and rely on the live region for the announcement.

### F-02 · Focus-to-heading overrides field autofocus; costs keyboard-first users a step
- **State/component:** S1 `IdentityInput.tsx` (`autoFocus` on `Input`), S3 `PasswordEntry.tsx` (`autoFocus`), overridden by `SignInCard` focus effect.
- **Tenet/Trap:** TN-6 / TR-G (Roach Motel). **Severity: Medium.**
- **Detail:** React `autoFocus` fires on mount, then the post-paint `useEffect` steals focus back to the heading, so focus lands on the title, not the field. Priya (keyboard-first power user, P1) must press **Tab** before she can type. On S3 after a wrong password, focus returns to the heading rather than the password field — contradicting the wireframe's "field retains focus" (S3 edge cases).
- **Remediation:** decide a single, consistent focus target per state — for data-entry states (S1, S3, S4-TOTP) prefer focusing the field and announcing the heading via the live region; reserve heading focus for non-entry states (picker, method, success).

### F-03 · "Signed in as" copy precedes authentication
- **State/component:** S2 `IdentityMethodList.tsx` (echo line ~402) · `03-method-passwordless.png`.
- **Tenet/Trap:** TN-3, TN-8 / TR-H (Misleading State). **Severity: Medium.**
- **Detail:** The user has been *identified*, not authenticated; "Signed in as" is factually wrong on an unauthenticated surface and weakens the trust posture the page is built to protect (FR-7/FR-8).
- **Remediation (Designer/copy):** use a state-accurate phrase such as *"Continue as {email}"* or *"Signing in as {email}"* with the adjacent "Change" affordance retained.

### F-04 · Duplicated error message + double announcement
- **State/component:** S5 wrong-password · `SignInCard.tsx` (`liveMessage` = error text, line 288) + `PasswordEntry.tsx` `externalError` field message + `ErrorRecovery.tsx` `role="alert"`.
- **Tenet/Trap:** TN-3, TN-4 / TR-E (Crying Wolf / Ransom Note). **Severity: Medium.**
- **Detail:** Same sentence in MessageBar and field validation; also announced by both an assertive alert and a polite status region. See `06-error-wrong-password.png`.
- **Remediation:** choose one canonical surface per error. Recommended: MessageBar carries the message + recovery; the field shows only its error **state** (red border + `aria-invalid`) without repeating the sentence; drop the error string from the live region since `role="alert"` already announces it.

### F-05 · Password buried behind a low-affordance drawer on S2
- **State/component:** S2 `IdentityMethodList.tsx` (`Sign in another way` subtle button + drawer) · `03/04-method*.png`.
- **Tenet/Trap:** TN-7, TN-5 / TR-C (Buried Treasure), TR-A (Mystery Meat). **Severity: Medium.**
- **Detail:** Password (the guaranteed floor, C15/FR-4) is reachable only after opening a subtle, unstyled control. Discoverability of the fallback matters most exactly when passwordless is failing.
- **Remediation (Designer):** give "Sign in another way" clear secondary-button or link affordance (underline/chevron), and/or surface "Use your password" as a persistently visible secondary row beneath the passwordless hero.

### F-06 · Stepper promises "2 of 2" but the flow can be longer
- **State/component:** `SignInCard.tsx` (`Step {stepNumber} of 2`, shown on identify + method) · `01/03-*.png`.
- **Tenet/Trap:** TN-3 / TR-D (Broken Promise), TR-F (Illusion of Completeness). **Severity: Medium.**
- **Detail:** The stepper reads "Step 2 of 2" on the method screen, yet a work account then proceeds to S3/S4 (password and/or MFA) before success. The count under-states the journey and breaks the expectation it sets.
- **Remediation (Designer):** make the stepper reflect the real, account-dependent path length, or drop the numeric count in favour of the continuous-canvas model the design already espouses (D1) — a fixed "of 2" fights the variable MSAL flow.

### F-07 · MFA number-match auto-approves with no honest terminal path in the prototype
- **State/component:** S4 `MfaVerify.tsx` (`autoApproveMs = 3200` timer) · `07-mfa-number-match.png`.
- **Tenet/Trap:** TN-4, TN-5 / TR-F (Illusion of Completeness). **Severity: Low (prototype artifact — flag for real integration).**
- **Detail:** The number-match challenge advances purely on a timer; there is no simulated *deny/timeout*, so the `mfa-failed` taxonomy row (which exists in `types.ts` and `recoveryActions`) is unreachable in the demo. Real users need a visible timeout/retry path and a way to know the request is pending vs. resolved.
- **Remediation:** wire a deny/timeout branch to `mfa-failed` before usability testing so the recovery path can actually be observed (also required to test FR-5/FR-6 with participants).

### F-08 · "Try again" recovery does not re-focus the password field; spec-listed "Forgot password?" recovery is absent from the MessageBar
- **State/component:** S5 wrong-password · `SignInCard.tsx` `recoveryActions("wrong-password")` returns only `Try again`.
- **Tenet/Trap:** TN-5, TN-6 / TR-G (Roach Motel). **Severity: Low.**
- **Detail:** The taxonomy in the wireframe specifies adjacent recovery = *"Forgot password?" + "Try again."* The MessageBar exposes only "Try again," and activating it clears the error without returning focus to the password input (the `Forgot password?` link does exist lower in the options row, so it is not a dead-end — hence Low).
- **Remediation:** add "Forgot password?" to the MessageBar actions for adjacency, and move focus to the password field when "Try again" is pressed.

### F-09 · Returning-user list uses Tab, not the spec'd arrow-key roving
- **State/component:** S1b `AccountPicker.tsx` · `09-account-picker.png`.
- **Tenet/Trap:** TN-9 / (consistency). **Severity: Low.**
- **Detail:** The wireframe says "Arrow keys move within the list, Enter selects." The implementation is a stack of `<button>`s traversed by Tab. This works and is accessible, but diverges from the documented interaction and from platform list conventions.
- **Remediation:** either implement roving `tabindex`/arrow navigation, or update the spec to the simpler Tab model (recommended for a short list).

### F-10 · Footer / inline "Change" & "Use a saved account" links are small, tightly-spaced targets
- **State/component:** `TrustFooter.tsx` (Privacy · Terms · Help at `fontSizeBase200`), inline `Link as="button"` echoes.
- **Tenet/Trap:** TN-9 / (inclusive design). **Severity: Low** (see accessibility-audit A-05 for the WCAG target-size treatment).
- **Detail:** 12px inline links separated by thin dividers are small hit targets; on touch/mobile-web they risk mis-taps.
- **Remediation:** increase link padding/hit area to ≥24×24 CSS px (PRD target ≥24, prefer 44), especially on the < 640px breakpoint.

---

## Tenets upheld (strengths — do not regress)

- **TN-8 Trust:** persistent, reserved `TrustHeader`/`TrustFooter` with an icon+text
  "Verified Microsoft sign-in" cue in every state (FR-7 AC1) — visible in all
  screenshots; genuine-surface reassurance in the footer.
- **TN-1 Intended experience:** passwordless-first hero is visually dominant and
  enrollment-ordered (`getMethodsForAccount`), password demoted (FR-3) —
  `03-method-passwordless.png`.
- **TN-5 Recovery:** plain-language error taxonomy with adjacent recovery and an
  expandable, jargon-free policy panel for conditional-access blocks (FR-6) —
  `10-policy-block.png`.
- **TN-9 Inclusive:** state is never conveyed by colour alone (icon + text on
  errors, success, trust cue); 44px method/picker rows; `prefers-reduced-motion`
  honoured on the body cross-fade.
- **TN-3 Clarity:** protective-framing MFA copy ("Extra verification is required by
  your organization…") frames step-up as protection (FR-5 AC1) —
  `07-mfa-number-match.png`.

---

## Quick Wins (high value, low effort)

1. **Suppress the heading's visible focus box** (F-01) — CSS-only; removes the
   biggest "looks broken" first impression.
2. **Change "Signed in as" → "Continue as"/"Signing in as"** (F-03) — one string;
   restores state-accuracy on a trust page.
3. **De-duplicate the wrong-password message** — keep it in the MessageBar, reduce
   the field to error-state styling only, and stop echoing it into the live region
   (F-04).
4. **Give "Sign in another way" real affordance** (underline/secondary button) and
   surface password as a visible secondary row (F-05).
5. **Fix or drop the "Step x of 2" stepper** so it stops promising a 2-step flow it
   cannot keep (F-06).

---

## Reasoning & scope note

None of the findings is Critical or High: every task can still be completed, no
recovery path is a true dead-end, and the trust/anti-phishing scaffolding is
sound. The cluster of **Medium** findings, however, concentrates on **clarity and
truthfulness** (F-01, F-03, F-04, F-06) on a surface whose entire purpose is to be
*trusted* — so they are worth resolving before participant testing, where
"looks-like-an-input heading" and "says I'm signed in when I'm not" would
predictably generate confused think-aloud and depress trust-perception scores.
The discoverability findings (F-04/F-05) directly touch FR-3 AC2/AC3 and FR-4 and
should be re-checked against the Designer's intent before lock.

## Severity summary

**0 Critical · 0 High · 6 Medium (F-01–F-06) · 4 Low (F-07–F-10).**
Stage-gate note: the T&T round carries **0 Critical/High**, but the 6 Medium
findings (esp. the four Top Issues) are recommended fixes before test execution.
