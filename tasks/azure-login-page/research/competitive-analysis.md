---
title: "Competitive Analysis — Sign-In / Login Experiences"
phase: discover
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Researcher Agent"
related:
  - "./research-brief.md"
  - "./findings-synthesis.md"
---

# Competitive Analysis — Sign-In Experiences

## Purpose

Establish a competitive baseline for the Azure portal sign-in redesign by
comparing five widely-used sign-in experiences aimed at technical/enterprise
audiences. The goal is to identify what is now table-stakes, where leaders
differentiate, and where opportunities exist for Azure.

> **Evidence basis:** This teardown is based on **publicly observable sign-in
> flows and published product/identity documentation** as of mid-2026, combined
> with established authentication UX heuristics. It does not include competitor
> telemetry or private data. Treat scores as informed, comparative judgments —
> not measured metrics.

## Competitors Reviewed

| # | Product | Why included |
|---|---|---|
| 1 | **Microsoft / Azure current sign-in** (login.microsoftonline.com / Entra) | Our own baseline; identifier-first, MSAL-backed |
| 2 | **Google Account sign-in** | Mass-scale identifier-first flow, strong passwordless/passkey push |
| 3 | **AWS Management Console sign-in** | Direct cloud-console competitor; root vs. IAM account model |
| 4 | **Okta** | Identity-provider specialist; adaptive MFA, enterprise branding |
| 5 | **GitHub** | Developer-audience overlap; passkeys, device verification, clear errors |

## Evaluation Criteria

- **Entry fields** — identifier-first vs. combined; account-type handling.
- **Passwordless / MFA support** — passkeys/FIDO2, authenticator apps, adaptive/step-up MFA.
- **Error handling** — clarity, specificity, and recoverability of failure states.
- **Branding** — product identity + tenant/org custom branding support.
- **Trust signals** — anti-phishing cues, domain clarity, security messaging.
- **Accessibility** — keyboard, focus, labeling, contrast, WCAG 2.1 AA alignment.
- **Help / Copilot affordances** — assistance, recovery links, guided help.

---

## 1. Microsoft / Azure current sign-in

- **Entry fields:** Identifier-first ("Enter email, phone, or Skype"), then a
  method screen. Detects work/school vs. personal account and can redirect to a
  federated/tenant sign-in. Account picker for returning users.
- **Passwordless / MFA:** Strong — Microsoft Authenticator (number matching),
  passkeys/FIDO2, Windows Hello, and password fallback. Conditional access can
  force step-up MFA. "Sign in another way" exposes method options.
- **Error handling:** Generally clear ("That Microsoft account doesn't exist",
  "Your account or password is incorrect") with inline reset links; some
  policy-blocked/conditional-access errors are terse and admin-oriented.
- **Branding:** Microsoft branding by default; **tenant custom branding**
  (logo, background, sign-in text) is a differentiator many competitors lack.
- **Trust signals:** "Stay signed in?" prompt, Microsoft domain, privacy links.
  Anti-phishing depends on user checking the domain; custom branding can dilute
  a consistent cue.
- **Accessibility:** Broadly strong keyboard + screen-reader support; some
  multi-step transitions and number-matching flows can be verbose.
- **Help / Copilot:** "Forgot password", "Sign-in options", "Get help" links.
  No Copilot-style guided assistance on the sign-in page itself.

## 2. Google Account sign-in

- **Entry fields:** Identifier-first ("Email or phone"), then password/method.
  Very minimal, single-column, large focus target.
- **Passwordless / MFA:** Aggressive passkey promotion (passkeys as default for
  many users), Google prompt on phone, authenticator, security keys; adaptive
  challenges based on risk.
- **Error handling:** Clear, friendly, specific ("Couldn't find your Google
  Account", "Wrong password. Try again or click Forgot password"). Inline,
  well-placed.
- **Branding:** Consistent Google branding; limited org/tenant custom branding
  (Workspace shows org name/logo in a constrained way).
- **Trust signals:** Persistent account context, clear domain, "Not your
  computer? Use Guest mode" privacy nudge, security-check prompts.
- **Accessibility:** Strong — clean focus states, labeled fields, good contrast.
- **Help / Copilot:** "Forgot email/password", account recovery flows; no
  generative help on the page.

## 3. AWS Management Console sign-in

- **Entry fields:** Splits **root user** vs. **IAM user** sign-in — an account
  model that adds cognitive load (account ID/alias required for IAM). Multi-step.
- **Passwordless / MFA:** MFA supported (virtual, hardware, passkeys expanding);
  historically password-first with MFA as a second step. Passwordless less
  prominent than Google/Microsoft.
- **Error handling:** Functional but sometimes generic; account-ID/alias errors
  can confuse newer users. Root vs. IAM confusion is a known friction point.
- **Branding:** AWS branding; limited end-user custom branding on the console
  sign-in itself (identity-center flows differ).
- **Trust signals:** Domain clarity; security messaging present but the dual
  account model can undercut a clean trust story.
- **Accessibility:** Adequate; the multi-field/account-ID pattern adds keyboard
  and screen-reader steps.
- **Help / Copilot:** Links to docs/support; no guided sign-in assistant.

## 4. Okta

- **Entry fields:** Identifier-first, org-tenant-scoped (customer subdomain).
  Configurable to combined or multi-factor sequences.
- **Passwordless / MFA:** Category leader in adaptive/step-up MFA — FastPass
  (passwordless), FIDO2/passkeys, push, TOTP, device trust, risk-based policies.
- **Error handling:** Generally clear; enterprise deployments vary by admin
  config. Method-selection screens are explicit.
- **Branding:** **Deep custom branding** — org logo, colors, backgrounds,
  custom domain; a core selling point for enterprise identity.
- **Trust signals:** Custom domain reinforces legitimacy; device-trust and
  contextual signals communicated during step-up.
- **Accessibility:** Widget is broadly WCAG-aware, but heavily customized
  deployments can regress accessibility if admins override styles.
- **Help / Copilot:** Configurable help links, self-service recovery; no
  generative assistant standard.

## 5. GitHub

- **Entry fields:** Combined username/email + password on one screen (developer
  familiarity), moving toward passkey-first for enrolled users.
- **Passwordless / MFA:** Mandatory 2FA for contributors; passkeys, security
  keys, TOTP, and **device verification** emails for new locations.
- **Error handling:** Clear, developer-friendly, specific; device-verification
  and new-device flows are well explained.
- **Branding:** Consistent GitHub identity; minimal tenant custom branding
  (enterprise SSO redirects to the org IdP).
- **Trust signals:** Device verification, new-sign-in email alerts, clear
  domain — strong anti-account-takeover posture.
- **Accessibility:** Strong, clean, high-contrast, well-labeled single-screen
  form; good keyboard support.
- **Help / Copilot:** Recovery links, docs; no on-page generative assistant.

---

## Scored Feature Matrix

Scoring: **1 = weak / absent, 2 = basic, 3 = adequate, 4 = strong, 5 = best-in-class.**
Scores are comparative, heuristic-based judgments (not measured).

| Criterion | Azure (current) | Google | AWS Console | Okta | GitHub |
|---|:--:|:--:|:--:|:--:|:--:|
| Entry fields (clarity/simplicity) | 3 | 5 | 2 | 4 | 4 |
| Passwordless / MFA support | 5 | 5 | 3 | 5 | 4 |
| Error handling & recovery | 3 | 5 | 2 | 4 | 4 |
| Branding (product + tenant custom) | 5 | 3 | 2 | 5 | 3 |
| Trust / anti-phishing signals | 3 | 4 | 3 | 4 | 5 |
| Accessibility (WCAG 2.1 AA alignment) | 4 | 5 | 3 | 3 | 4 |
| Help / Copilot affordances | 2 | 2 | 2 | 2 | 2 |
| **Total (of 35)** | **25** | **29** | **17** | **27** | **26** |

### How to read the matrix
- **Google** leads on *simplicity, error clarity, and accessibility* — a clean
  identifier-first flow is the benchmark.
- **Okta** leads on *branding and adaptive MFA* — the enterprise identity bar.
- **GitHub** leads on *trust signals* — device verification and new-sign-in
  alerts are strong anti-takeover patterns for a technical audience.
- **Azure (current)** is already strong on *passwordless/MFA and tenant
  branding*, but trails on *entry simplicity, error clarity, and help*.
- **Help / Copilot** is a universal gap — nobody offers meaningful guided
  assistance on the sign-in page (partly for good security reasons).

---

## Gaps & Opportunities for Azure

**Where Azure already leads (protect these):**
- Breadth of passwordless/MFA methods (Authenticator, passkeys, Windows Hello).
- Tenant custom branding — an enterprise expectation Okta matches but Google/AWS
  do not.

**Gaps to close (match the leaders):**
- **G1. Entry simplicity.** Reduce cognitive load in the identifier-first →
  method transition; make it feel like one continuous flow rather than distinct
  screens. Benchmark: Google.
- **G2. Error clarity & recovery.** Rewrite terse, admin-oriented
  conditional-access/policy errors into human, actionable guidance with a clear
  next step. Benchmark: Google/GitHub.
- **G3. Anti-phishing trust signals.** Strengthen consistent domain/branding
  cues and consider device-verification / new-sign-in awareness akin to GitHub —
  especially important because tenant custom branding can dilute a single
  trusted visual cue.

**Opportunities to differentiate (lead the category):**
- **O1. Passwordless-first, gracefully degrading.** Present passkey/Authenticator
  as the default preferred path with clear, ordered fallbacks — leaning into a
  strength Google is also pushing, but combined with Azure's method breadth.
- **O2. Enterprise trust without accessibility regression.** Offer rich tenant
  branding *and* enforce WCAG 2.1 AA guardrails so custom themes can't break
  contrast/focus — solving Okta's known customization-regression risk.
- **O3. Safe, scoped assistance.** The Help/Copilot column is a universal 2. A
  carefully scoped, security-reviewed help affordance (recovery guidance,
  "which account?", policy-block explanations) could be a genuine
  differentiator — provided it does not become a social-engineering surface
  (see brief risk R3).

## Implications for Design (handoff)

The strongest, lowest-risk moves are **G1 (entry simplicity)** and **G2 (error
clarity)** — pure usability wins with no security tradeoff. **O1 (passwordless-
first)** and **G3 (trust signals)** advance security posture. **O3 (assistance)**
is high-upside but must clear a security review. These feed directly into the
ranked opportunities in `findings-synthesis.md`.
