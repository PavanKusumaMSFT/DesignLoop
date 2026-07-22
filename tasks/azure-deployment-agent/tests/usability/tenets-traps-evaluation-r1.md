---
title: "UI Tenets & Traps Evaluation: Deployment Agent UX Enhancements (Round 1)"
phase: test
status: draft
created: 2026-06-12
updated: 2026-06-12
author: "Tester Agent"
related:
  - "../../designs/components/mode-switcher.md"
  - "../../designs/components/cost-annotation.md"
  - "../../designs/components/deploy-gate.md"
  - "../../designs/components/click-to-edit.md"
  - "../../designs/components/version-timeline.md"
  - "../../designs/wireframes/deployment-agent-overview.md"
  - "deployment-agent-r4-test-plan.md"
---

# UI Tenets & Traps Evaluation: Deployment Agent UX Enhancements (Round 1)

A heuristic usability evaluation of the Azure Deployment Agent UX enhancements using Microsoft's
[UI Tenets & Traps](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Home.aspx?web=1)
framework (9 Tenets, 26 Traps). Findings map to the canonical taxonomy in
[`.github/skills/tenets-traps-evaluation/reference.md`](../../../../.github/skills/tenets-traps-evaluation/reference.md).

## Round Tracker

| Round | Date | Findings (C/H/M/L) | Resolved since last | Notes |
|-------|------|--------------------|--------------------|-------|
| r1 | 2026-06-12 | 0 / 1 / 8 / 3 | — | Baseline expert evaluation |

---

## 1. Executive Summary

This is a Round 1 expert (heuristic) evaluation of five components — **Mode Switcher**, **Cost Badge / Cost
Delta**, **Deploy Gate**, **Click-to-Edit**, and **Version Timeline** — as specified in the Design phase specs
and the deployment-agent overview wireframe. The evaluation walked the core deployment task end-to-end
(choose mode → review workload plan and cost → edit a value → review version diff → pass the deploy gate →
roll back post-deploy).

**Headline:** The designs are strong on accessibility intent and on *Forgiving* / *Protective* behaviors
(deploy gating, confirmation dialogs, color-plus-icon encoding). The most consequential gaps cluster under
**Understandable** (hidden affordances, weak feedback) and **Efficient** (action discoverability, returning-user
friction). No Critical issues were found at the spec level; one High-severity discoverability issue should be
addressed before usability testing.

**Findings by severity:** 0 Critical · 1 High · 8 Medium · 3 Low (12 total). Plus 6 notable strengths.

---

## 2. Scope & Method

| Aspect | Detail |
|--------|--------|
| **Target** | Five React component specs + overview wireframe (Design-phase artifacts; prototypes not yet live-tested) |
| **User tasks walked** | Mode selection; plan + cost review; inline edit of a config value; version diff review; passing the deploy gate; post-deploy rollback |
| **Paths considered** | Happy path, keyboard-only, touch, screen-reader, returning user, error/empty states |
| **Method** | Single-reviewer heuristic evaluation against UI Tenets & Traps; severity per the reference scale |
| **Reference** | [reference.md](../../../../.github/skills/tenets-traps-evaluation/reference.md) |

**Limitations:** This is a spec-level expert review, not a moderated study with real users — findings are
predictions of likely problems, to be validated by the Round 4 test plan
([deployment-agent-r4-test-plan.md](deployment-agent-r4-test-plan.md)). Color-contrast findings require
verification against the rendered prototype.

---

## 3. Scorecard

| Area / Component | Strengths | Findings | Worst severity |
|------------------|-----------|----------|----------------|
| Mode Switcher | Roving tablist, arrow-key nav, 44×44 targets | F10, F11 | Low–Medium |
| Cost Badge / Cost Delta | Color never sole indicator (▲▼ + signs) | F3, F8, F12 | Medium |
| Deploy Gate | Blocks on critical checks; aria-live; focus mgmt | F5, F6, F9 | Medium |
| Click-to-Edit | Inline validation; Escape cancels; impact preview | **F1**, F2 | **High** |
| Version Timeline | Listbox semantics; rollback confirmation | F4, F7 | Medium |

---

## 4. Top Issues

Ranked by impact. Each references a finding ID from §5.

1. **F1 — Edit affordance is hover-only (High).** The pencil that reveals editability appears only on hover,
   leaving touch and keyboard users unaware that plan values are editable. Degrades *Understandable*.
2. **F6 — Primary "Deploy" action is buried below five expanded sections (Medium).** Users must scroll past
   long validation content to reach the gate's primary action, hurting discoverability and perceived efficiency.
3. **F2 — Save feedback is visual-only (Medium).** A brief animation confirms a successful inline edit, but the
   change is not announced to assistive tech, so screen-reader users get no confirmation.
4. **F3 — Cost estimates lack stated assumptions (Medium).** "~$" figures don't disclose region, hours, or
   currency basis, inviting misinterpretation of a number users will act on.
5. **F5 — Deploy-gate warnings are dismissible without remediation (Medium).** Acknowledge-to-proceed on
   non-blocking warnings invites rubber-stamping of real risks.

---

## 5. All Findings

| ID | Area / Component | Finding | Tenet | Trap(s) | Severity | Evidence / Reasoning |
|----|------------------|---------|-------|---------|----------|----------------------|
| F1 | Click-to-Edit | Editability is signalled only by a pencil icon shown on hover; touch and keyboard users may never discover that values are editable. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.2 Effectively Invisible Element; 1.1 Invisible Element (touch) | **High** | Spec: pencil appears "on hover" of the field. No persistent cue for non-pointer input; the element is `role=button` but visually undifferentiated until hover. |
| F2 | Click-to-Edit | Successful save is confirmed by a brief animation only; no programmatic announcement. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.9 Feedback Failure | Medium | Spec describes a save flash/transition; no `aria-live` region to announce "Updated". SR users get no comprehensible feedback. |
| F3 | Cost Badge / Delta | "~$" estimates do not state assumptions (region, hours/month, currency, reserved vs. on-demand). | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.4 Uncomprehended Element | Medium | A figure users base spend decisions on is ambiguous without its basis; risks false precision. |
| F4 | Version Timeline | The dot strip surfaces only ~3–5 recent versions; older history has no clear access path. | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) | 4.1 Unnecessary Step; 1.2 Effectively Invisible Element | Medium | Spec shows a fixed horizontal strip. Locating an older version to roll back to may be effortful or appear impossible. |
| F5 | Deploy Gate | Non-blocking warnings can be acknowledged to proceed without remediation. | [Protective](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Protective.aspx?web=1) | 4.4 Bad Prediction; 1.9 Feedback Failure | Medium | Acknowledge-to-proceed encourages habitual dismissal; real risk may be deployed. Consider requiring a typed reason for high-risk warnings. |
| F6 | Deploy Gate | Five collapsible sections expanded by default push the primary "Deploy" button far below the fold. | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) | 4.3 Information Overload; 1.2 Effectively Invisible Element | Medium | Long scroll to reach the gate's main action; collapse-by-default + a sticky action bar would help. |
| F7 | Version Timeline / Rollback | Rollback confirmation dialog states the target but does not preview what will change (resources, cost delta). | [Forgiving](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Forgiving.aspx?web=1) | 1.4 Uncomprehended Element | Medium | Users confirm a consequential action without seeing its impact; an impact summary would reduce error. |
| F8 | Cost Badge | Warning/critical pill states claim AA contrast; not yet verified on rendered colors. | [Comfortable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Comfortable.aspx?web=1) | 2.1 Physical Challenge (legibility) | Medium | Needs measurement on the prototype; small pill text on tinted backgrounds is a common AA failure. |
| F9 | Deploy Gate | Failed validation fetch / failed save / empty-check states are not fully specified. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.5 Inviting Dead End; 1.9 Feedback Failure | Medium | Without defined error/empty states, users can hit a stuck gate with no recovery path. |
| F10 | Mode Switcher | Mode resets to "Ask" each session rather than remembering the user's last choice. | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) | 4.2 System Amnesia | Low | Returning Agent-mode users must re-select every session; persisting last mode reduces a repeated step. |
| F11 | Mode Switcher | The `@deploy` nudge relies on keyword detection, which may miss intent or fire when unwanted. | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) | 4.4 Bad Prediction; 1.3 Distraction | Low | Mis-prediction either fails to help or interrupts; make the nudge dismissible and low-salience. |
| F12 | Cost Badge | The expandable SKU-alternatives table may overflow horizontally below 480px. | [Comfortable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Comfortable.aspx?web=1) | 2.1 Physical Challenge | Low | Small-screen layout for the alternatives table is unspecified; risk of clipped/scrolled content. |

### Strengths observed (Tenets upheld)

| Area | Strength | Tenet |
|------|----------|-------|
| Cost Delta | Encodes change with ▲▼ icon + sign + color (never color alone) | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) |
| Deploy Gate | Blocks deployment until critical checks pass | [Protective](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Protective.aspx?web=1) |
| Version Timeline / Rollback | Rollback exists and is confirmation-guarded | [Forgiving](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Forgiving.aspx?web=1) |
| Mode Switcher | Roving-tabindex tablist, arrow-key nav, 44×44 targets, focus-visible | [Comfortable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Comfortable.aspx?web=1) |
| Click-to-Edit | Impact preview before commit; Escape cancels | [Forgiving](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Forgiving.aspx?web=1) |
| Deploy Gate | `aria-live` polite announcements + focus management | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) |

---

## 6. Quick Wins

Low-effort, high-value fixes drawn from §5:

| ID | Quick fix |
|----|-----------|
| F1 | Show a persistent, low-emphasis edit affordance (e.g., a subtle pencil or underline) and reveal it on focus, not just hover. |
| F2 | Add an `aria-live="polite"` region that announces "Updated" (and validation errors) on save. |
| F3 | Add a tooltip / caption stating estimate assumptions (region, hours/month, currency, pricing model). |
| F6 | Collapse non-critical gate sections by default and pin the Deploy action in a sticky footer bar. |
| F10 | Persist the user's last-used mode and restore it on return. |

---

## 7. Reasoning & Decisions

- **Why F1 is High, not Medium.** Hidden editability blocks an entire interaction class (touch/keyboard users)
  from discovering a core feature of the plan view. It maps cleanly to *Effectively Invisible Element* (1.2)
  for pointer users and *Invisible Element* (1.1) for non-pointer input; the combined reach raises it to High.
- **Multiple traps per finding.** Per the framework's "log all applicable traps" guidance, findings such as
  F4, F5, F6, and F9 list more than one trap and name the root-cause trap first.
- **No Critical findings.** Critical requires blocked task completion or data loss. The Deploy Gate's hard
  block on critical checks and the rollback path remove the obvious data-loss vectors at the spec level, so
  the worst standing issue is the High discoverability gap (F1).
- **Contrast (F8) kept at Medium pending measurement.** It is logged as a finding because the claim is
  unverified; it would move to High only if measured ratios fail AA on interactive/critical text.
- **Predictive features (F5, F11) mapped to *Bad Prediction* (4.4).** Both the warning-dismissal and the
  `@deploy` nudge are system predictions of user intent; when wrong they either under-protect or distract.
- **Strengths logged deliberately.** The framework separates positive attributes (Tenets met) from problems
  (Traps); recording strengths keeps the report balanced and prevents regressions during fixes.

---

## 8. Fix & Re-evaluate Loop

This report is the **r1 baseline**. The loop is human-in-the-loop:

1. **Choose what to fix.** Options:
   - (a) Fix all **Quick Wins** (F1, F2, F3, F6, F10)
   - (b) Fix **Top Issues** only (F1, F6, F2, F3, F5)
   - (c) Pick specific finding **IDs**
   - (d) Defer and validate with the Round 4 usability study first
2. **Apply fixes** to the relevant component specs / prototypes.
3. **Re-evaluate** → generate `tenets-traps-evaluation-r2.md` with a delta column marking each prior finding
   **Resolved / Partially resolved / Unchanged / Regressed**, plus any **new** findings, and update the Round Tracker.
4. **Repeat** until no open High/Critical findings remain or the team accepts the residual risk.

## Next Steps

- Confirm the fix scope (a/b/c/d above).
- Validate predicted findings against real users via [deployment-agent-r4-test-plan.md](deployment-agent-r4-test-plan.md).
- Verify F8 contrast on the rendered prototype.
