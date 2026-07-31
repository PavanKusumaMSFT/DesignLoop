---
title: "Personas — Azure Sign-In / Login Page"
phase: define
status: draft
created: 2026-07-29
updated: 2026-07-29
author: "Strategist Agent"
related:
  - "../research/research-brief.md"
  - "../research/competitive-analysis.md"
  - "../research/findings-synthesis.md"
  - "./problem-statements.md"
  - "./journey-map.md"
  - "./prd.md"
---

# Personas — Azure Sign-In / Login Page

Three research-grounded personas derived from the audience profile in the
[research brief](../research/research-brief.md) (§6) and the opportunity areas in
[findings-synthesis.md](../research/findings-synthesis.md). Together they cover
the three named roles: **enterprise cloud developer, IT administrator, and
DevOps/SRE engineer**.

> **Evidence basis:** These personas are **provisional archetypes** built from the
> research brief's participant profile and heuristic/competitive insights — **not**
> from primary interviews. The brief recommends validating with 6–8 participants
> (incl. ≥2 assistive-technology users) before scope lock. Each trait cites the
> supporting research insight.

---

## Persona 1 — Priya Nair, the Enterprise Cloud Developer

> *"I live in the Azure portal. Sign-in should get out of my way and let me back
> to my work."*

| | |
|---|---|
| **Role** | Senior Cloud Developer at a mid-size SaaS company |
| **Frequency** | Signs in multiple times daily, often across devices |
| **Accounts** | One **personal** Microsoft account + one **work/school** tenant; switches often |
| **Devices** | Corporate-managed laptop (device-based conditional access) + personal phone with Authenticator |
| **Tech literacy** | Very high; keyboard-first power user |

**Goals**
- Get from landing to authenticated in as few steps as possible *(P1 / I1)*.
- Use **passwordless** (passkey / Authenticator) as her default *(P3 / I2)*.
- Switch between personal and work tenants without friction *(P6 / I7)*.

**Pain points**
- The identifier-first → method transition feels like distinct screens, adding
  perceived latency *(Theme 1, gap G1)*.
- Occasionally lands in the wrong account/tenant and has to back out *(I7)*.
- Password fallback is sometimes surfaced before passwordless *(Theme 2)*.

**Behaviours**
- Uses "Stay signed in" on trusted devices; keyboard-tabs through forms.
- Approves Authenticator number-matching prompts on her phone.
- Abandons quickly and retries if a step feels slow or ambiguous.

**Sign-in scenario**
> Priya opens the Azure portal to check a deployment. She expects to be
> recognized on her managed laptop, tap an Authenticator prompt on her phone, and
> land straight in her **work** tenant — no password. When the account picker
> instead defaults to her personal account, she needs a fast, unambiguous switch
> back to work without re-typing anything.

**Primary problems this persona drives:** P1, P3, P6.

---

## Persona 2 — Marcus Ellison, the IT Administrator

> *"My job is to prove we're secure. Every sign-in is an audit event and a
> potential phishing target."*

| | |
|---|---|
| **Role** | Identity & Access Administrator / Tenant Admin |
| **Frequency** | Signs in daily; also configures the sign-in experience for others |
| **Accounts** | Privileged admin account with enforced **MFA + conditional access** |
| **Devices** | Managed workstation; hardware security key (FIDO2) |
| **Tech literacy** | Very high; deep identity-platform knowledge |

**Goals**
- Enforce and demonstrate strong security: MFA, conditional access, device trust
  *(P4 / I5)*.
- Apply **tenant custom branding** (logo, colors, background) that his org expects
  *(brief RQ7)*.
- Keep the experience **WCAG 2.1 AA** compliant even after branding *(P5 / I6)*.
- Reduce help-desk tickets caused by confusing sign-in errors *(P2 / I3)*.

**Pain points**
- Conditional-access / policy-block errors are terse and admin-oriented, so end
  users escalate to him instead of self-recovering *(Theme 3, gap G2)*.
- Custom branding risks diluting the consistent anti-phishing cue *(Theme 4, I4)*.
- Aggressive customization can silently regress contrast/focus (Okta's weakness)
  *(Theme 5, I6)*.

**Behaviours**
- Reviews sign-in logs and new-sign-in alerts; values auditability.
- Configures branding centrally and expects guardrails to prevent misconfiguration.
- Tests the flow with a screen reader and keyboard before rollout.

**Sign-in scenario**
> Marcus rolls out his company's branded sign-in page. He needs the org logo and
> background applied **without** breaking the trusted, recognizable Azure cue that
> protects users from phishing — and without dropping any element below WCAG 2.1
> AA contrast. When a user is blocked by a conditional-access policy, he wants the
> page itself to explain, in plain language, what to do next so the user doesn't
> open a ticket.

**Primary problems this persona drives:** P2, P4, P5.

---

## Persona 3 — Devan Rao, the DevOps / SRE Engineer

> *"I switch between environments all day. I need trusted sessions and instant
> recovery when a policy blocks me."*

| | |
|---|---|
| **Role** | DevOps / Site Reliability Engineer |
| **Frequency** | Frequent, bursty sign-ins across multiple environment tenants |
| **Accounts** | Work account with access to several tenants (dev / staging / prod) |
| **Devices** | Managed laptop + phone; relies on device trust and session persistence |
| **Tech literacy** | Very high; automation-adjacent, cares about session behavior |

**Goals**
- Maintain trusted, persistent sessions to avoid re-authenticating constantly
  *(brief §6, R- session persistence)*.
- **Recover fast** from policy-blocked / device-trust states without losing flow
  *(P2 / P4)*.
- Switch tenants quickly during incidents *(P6 / I7)*.
- Passwordless with device trust for speed and security *(P3 / I2, I5)*.

**Pain points**
- Gets policy-blocked mid-incident and the message doesn't say how to unblock
  *(Theme 3, gap G2)*.
- Multi-tenant switching is a repeated, under-supported task *(I7)*.
- Session/"stay signed in" behavior is unpredictable across devices *(Theme 1)*.

**Behaviours**
- Keeps sessions alive on trusted devices; reacts fast under incident pressure.
- Uses new-sign-in / device-verification signals to spot anomalies *(I5)*.
- Escalates only when the page gives no actionable path.

**Sign-in scenario**
> During an incident, Devan needs to jump into the **prod** tenant. His session in
> staging is active, but conditional access requires step-up MFA for prod. He
> needs the challenge to be fast, the tenant switch unambiguous, and — if he's
> blocked by device policy — a clear, immediate explanation of how to satisfy it,
> because every second counts during an outage.

**Primary problems this persona drives:** P3, P4, P6, P2.

---

## Persona → Problem Traceability

| Persona | Primary problems (see [problem-statements](./problem-statements.md)) | Key insights |
|---|---|---|
| Priya — Enterprise Developer | P1, P3, P6 | I1, I2, I7 |
| Marcus — IT Administrator | P2, P4, P5 | I3, I4, I5, I6 |
| Devan — DevOps / SRE | P3, P4, P6, P2 | I2, I3, I5, I7 |

**Shared characteristics across all three** (from brief §6): high digital
literacy, low tolerance for friction, high security expectations, frequent
multi-account/multi-tenant switching, and use of corporate-managed devices with
device-based conditional access.

These personas anchor the [journey map](./journey-map.md) and the requirements in
the [PRD](./prd.md).
