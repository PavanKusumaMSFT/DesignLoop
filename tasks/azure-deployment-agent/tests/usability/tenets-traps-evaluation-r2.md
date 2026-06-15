---
title: "UI Tenets & Traps Evaluation: Azure Deployment Agent Prototypes (Round 2)"
phase: test
status: draft
created: 2026-06-15
updated: 2026-06-15
author: "Tester Agent"
related:
  - "tenets-traps-evaluation-r1.md"
  - "../../designs/wireframes/deployment-agent-overview.md"
  - "../../prototypes/demos/ModeSwitcher.html"
  - "../../prototypes/demos/CostBadge.html"
  - "../../prototypes/demos/DeployGate.html"
  - "../../prototypes/demos/ClickToEdit.html"
  - "../../prototypes/demos/VersionTimeline.html"
---

# UI Tenets & Traps Evaluation: Azure Deployment Agent Prototypes (Round 2)

Round 2 evaluates the implemented HTML demo prototypes rather than the earlier specs alone, using Microsoft's [UI Tenets & Traps](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Home.aspx?web=1) framework and the canonical taxonomy in [reference.md](../../../../.github/skills/tenets-traps-evaluation/reference.md).

## Round Tracker

| Round | Date | Findings (C/H/M/L) | Resolved since last | Notes |
|-------|------|--------------------|--------------------|-------|
| r1 | 2026-06-12 | 0 / 1 / 8 / 3 | — | Spec-level baseline before live demos |
| r2 | 2026-06-15 | 0 / 1 / 12 / 3 | 2 | Prototype-level review of five live HTML demos; 6 new implementation findings |

## Executive Summary

This Round 2 review evaluated the live **ModeSwitcher**, **CostBadge**, **DeployGate**, **ClickToEdit**, and **VersionTimeline** demos plus the overview wireframe to verify the predicted Round 1 issues against actual code and interaction logic.

**Headline:** the prototypes preserve several strong interaction foundations — keyboard navigation in ModeSwitcher/VersionTimeline, destructive-change acknowledgement in DeployGate, and inline validation in ClickToEdit — but they still carry most of the R1 clarity/efficiency issues and introduce several concrete implementation-level accessibility gaps. Two R1 findings were resolved (**F8** contrast verified, **F11** predictive `@deploy` nudge absent), but the highest-impact new issue is that **CostBadge alternatives are mouse-only**.

**Findings by severity:** 0 Critical · 1 High · 12 Medium · 3 Low (16 open findings).  
**Delta vs R1:** 2 resolved · 3 partially resolved · 7 unchanged · 0 regressed · 6 new.

## Scope & Method

| Aspect | Detail |
|--------|--------|
| **Targets** | `ModeSwitcher.html`, `CostBadge.html`, `DeployGate.html`, `ClickToEdit.html`, `VersionTimeline.html`, plus `designs/wireframes/deployment-agent-overview.md` |
| **User tasks walked** | Select modes; review/expand cost; choose an alternative SKU; review deploy sections; acknowledge destructive changes; attempt blocked deploy; edit values; validate/cancel/save; compare versions; search/filter versions |
| **Paths considered** | Happy path, keyboard-only, touch, screen-reader semantics, blocked/error states, narrow/mobile layouts, returning-user behavior |
| **Method** | Code-level heuristic walkthrough of the implemented React-in-HTML demos, mapping each issue to the official Tenets & Traps taxonomy |
| **Reference** | [reference.md](../../../../.github/skills/tenets-traps-evaluation/reference.md) |

**Limitations:** this pass validates implemented behavior from the live demo source and rendered semantics, but it was not run with a real screen reader or moderated participants. Findings about touch discoverability and narrow-screen overflow are still heuristic, but are now grounded in the shipped demo code rather than specs.

## Scorecard

| Area / Component | Strengths observed | Open findings | Worst severity |
|------------------|--------------------|---------------|----------------|
| ModeSwitcher | Proper `tablist`/`tab` state, roving focus, Home/End + arrow-key support, visible focus ring | F10, F11 (resolved) plus lingering F1 touch discoverability dependency | Medium |
| CostBadge | Badge text contrast now verifies AA; warning/critical states use more than color alone; expandable details exist | F3, F12, **F13**, F18 | **High** |
| DeployGate | Failed validations hard-block deploy; destructive changes require acknowledgement; section structure is scannable | F5, F6, F9, F16 | Medium |
| ClickToEdit | Enter/Space to edit, Escape to cancel, inline validation, save/cancel controls visible in edit mode | F1, F2, **F14**, F15 | Medium |
| VersionTimeline | Dots are keyboard focusable; tooltips duplicate detail already exposed in `aria-label`; empty search state exists | F4, F7, F17 | Medium |

## Top Issues

1. **F13 — Cost alternatives are mouse-only (High).** Users can open the CostBadge panel with the keyboard, but cannot select any alternative SKU because rows are clickable `<tr>` elements with no focus target.
2. **F14 — Edit controls are unlabeled in edit mode (Medium).** ClickToEdit visually shows labels, but the actual `<input>`/`<select>` elements are not programmatically associated with them.
3. **F16 — DeployGate does not explain why deploy is blocked (Medium).** The disabled CTA changes label to “Deploy blocked” without a blocker summary or `aria-describedby`.
4. **F1 — Editability is still not discoverable on touch (Medium, partially resolved).** Keyboard users now get a focus affordance, but touch users still get no persistent visual cue that values are editable.
5. **F4 — Version history is still capped to five visible versions (Medium).** Search filters the existing list but does not provide any path to older rollback targets.

## All Findings

| ID | Delta | Area / Component | Finding | Tenet | Trap(s) | Severity | Evidence / Reasoning |
|----|-------|------------------|---------|-------|---------|----------|----------------------|
| F1 | **Partially resolved** | ClickToEdit | Editability is still primarily signalled by hover/focus treatment instead of a persistent cue; touch users may not discover that values are editable. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.2 Effectively Invisible Element; 1.1 Invisible Element | Medium | `ClickToEdit.html:41-42` reveals the pencil only on hover or `:focus-visible`. Keyboard discoverability improved, but touch still has no pre-tap cue. |
| F2 | **Unchanged** | ClickToEdit | Successful save is still confirmed visually only; no live announcement is emitted for assistive tech. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.9 Feedback Failure | Medium | Save sets `showUpdated` and renders a visual “Updated” badge (`ClickToEdit.html:117-119`, `162`), but there is no `aria-live` region for success feedback. |
| F3 | **Unchanged** | CostBadge | Cost estimates still omit their assumptions (region, usage basis, pricing model, and estimate freshness). | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.4 Uncomprehended Element | Medium | `CostBadge.html:103-107` formats `~$.../mo`, but the badge and panel never explain what the estimate includes. |
| F4 | **Unchanged** | VersionTimeline | The timeline still exposes only five versions with no browse/load-more path to older history. | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) | 4.1 Unnecessary Step; 1.2 Effectively Invisible Element | Medium | `VersionTimeline.html:92-98` hard-codes five versions; search (`105-109`) only filters those same five entries. |
| F5 | **Partially resolved** | DeployGate | Warnings are now shown inline rather than as a dismissible banner, but warning-only states still have no remediation requirement or rationale capture before proceeding. | [Protective](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Protective.aspx?web=1) | 4.4 Bad Prediction; 1.9 Feedback Failure | Medium | The warning is embedded in the validation list (`DeployGate.html:82-87`, `164-175`), which is better than a blanket dismiss. However only destructive deletes require acknowledgement (`212-219`), so high-risk warnings can still become passive information. |
| F6 | **Partially resolved** | DeployGate | The gate is shorter than the R1 spec, but the primary deploy action still sits below four expanded sections and a destructive-change block. | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) | 4.3 Information Overload; 1.2 Effectively Invisible Element | Medium | All four sections default to expanded (`144`, `164`, `178`, `204`) and the action row remains at the bottom (`221-228`). |
| F7 | **Unchanged** | VersionTimeline / Rollback | The prototype set still provides no rollback impact preview showing what resources or costs would change before confirm. | [Forgiving](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Forgiving.aspx?web=1) | 1.4 Uncomprehended Element | Medium | The component demo handles version selection only; the wireframe still mentions rollback conceptually but no implemented confirmation preview exists in the prototype set. |
| F8 | **Resolved** | CostBadge | Warning/critical pill text contrast now verifies as readable in the implemented colors. | [Comfortable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Comfortable.aspx?web=1) | 2.1 Physical Challenge (legibility) | — | Rendered badge text uses `#374151` on `#FEF3C7` and `#FEE2E2` (`CostBadge.html:55`, `63-64`), which measures at ~9.26:1 and ~8.44:1 respectively. |
| F9 | **Unchanged** | DeployGate | Failed fetch, empty validation, and save-error states are still not modeled. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.5 Inviting Dead End; 1.9 Feedback Failure | Medium | `DeployGate.html` implements only populated happy/block states and a success reset. There is no empty/error branch for validations, cost, or target data. |
| F10 | **Unchanged** | ModeSwitcher | The component still does not remember last-used mode across sessions. | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) | 4.2 System Amnesia | Low | `ModeSwitcher.html:146-170` initializes local state only; no persistence is attempted. |
| F11 | **Resolved** | ModeSwitcher | The predictive `@deploy` nudge from R1 is absent in the prototype. | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) | 4.4 Bad Prediction; 1.3 Distraction | — | The live demo implements only direct user mode switching (`ModeSwitcher.html:146-170`); no auto-suggestion or keyword-triggered nudge is present. |
| F12 | **Unchanged** | CostBadge | The alternatives panel still risks narrow-screen overflow. | [Comfortable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Comfortable.aspx?web=1) | 2.1 Physical Challenge | Low | The flyout has `min-width: 360px` (`CostBadge.html:73-78`) with no responsive overflow handling; combined with page padding, this can overflow common mobile widths. |
| F13 | **New** | CostBadge | Alternative SKU selection is mouse-only. Keyboard and screen-reader users can expand the panel but cannot move focus to or activate a row. | [Comfortable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Comfortable.aspx?web=1) | 2.1 Physical Challenge; 1.4 Uncomprehended Element | **High** | Each alternative is a clickable `<tr>` with `onClick` only (`CostBadge.html:133-143`). Rows have no button, link, radio, `tabIndex`, or selected state. |
| F14 | **New** | ClickToEdit | Edit controls are not programmatically labeled in edit mode. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.4 Uncomprehended Element | Medium | The visible `<label>` is rendered separately (`ClickToEdit.html:131-144`) without `htmlFor`, wrapping, or `aria-labelledby`, so the `<input>`/`<select>` lacks a robust accessible name. |
| F15 | **New** | ClickToEdit | The numeric impact preview can show stale information from the saved value instead of the pending edit. | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) | 4.4 Bad Prediction; 1.9 Feedback Failure | Medium | The parent computes `impactPreview` from `replicas` (`ClickToEdit.html:192-194`), not from the in-progress `editValue`, so changing the number does not preview the proposed cost accurately. |
| F16 | **New** | DeployGate | “Deploy blocked” does not explain what specifically must change before deployment is allowed. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.9 Feedback Failure; 1.6 Poor Grouping | Medium | `deployDisabled` combines validation failures and destructive-change acknowledgement (`119-121`), but the CTA only changes text (`225-227`). No inline blocker summary or `aria-describedby` connects the disabled state to the exact cause. |
| F17 | **New** | VersionTimeline | Filtering can hide the currently selected versions without clearing or remapping the comparison state, creating an inconsistent “selected” outcome. | [Habituating](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Habituating.aspx?web=1) | 8.2 Variable Outcome | Low | Search filters the visible dots (`105-109`), but `selectedVersions` is preserved (`210-217`). When selected items drop out of the filtered list, the footer still reports the old comparison while the timeline shows no selected range. |
| F18 | **New** | CostBadge | The loading state announces a zero-dollar estimate instead of a loading/busy state. | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) | 1.9 Feedback Failure | Medium | With `loading`, the badge shows only a skeleton (`117-123`), but `aria-label` is still built from `cost=0` as “estimated cost: ~$0/mo” (`111-115`, `173`). |

## Quick Wins

| ID | Quick fix |
|----|-----------|
| F13 | Replace clickable table rows with actual buttons/radio rows, add focus states, and expose current selection programmatically. |
| F14 | Give each edit field an `id` and bind the visible label with `htmlFor` (or use `aria-labelledby`). |
| F16 | Add a blocker summary above the action row and connect it to the disabled CTA with `aria-describedby`. |
| F2 | Add a polite live region for successful saves and reuse it for non-blocking status changes. |
| F18 | Expose loading as `aria-busy`/`role="status"` and announce “Estimating cost…” instead of `$0/mo`. |
| F1 | Keep a persistent low-emphasis edit cue (underline, chip, or pencil) so touch users can discover editability before tapping. |

## Reasoning & Decisions

- **Why F13 is High.** This blocks a core path — choosing a cheaper SKU alternative — for keyboard-only users, not just slowing them down. Opening the panel is possible; completing the task is not.
- **Why F1 dropped from High to Medium.** The prototype added focus-based discoverability (`:focus-visible`) and proper keyboard entry, which materially helps keyboard and screen-reader users. The gap now concentrates on touch and glanceability rather than all non-mouse users.
- **Why F8 moved to Resolved.** Unlike R1, the implemented colors can be measured. The important pill text contrast passes AA even though accent icon/border colors remain decorative and lower contrast.
- **Why F7 remains open even though rollback is not demoed.** R2 was asked to validate the end-to-end prototype set against the wireframed flow. The absence of an implemented rollback-preview step means the original risk is still not addressed.
- **Why F16 is separate from F9.** F9 is about missing whole-state coverage (empty/fetch/save errors). F16 is about the implemented blocked state being insufficiently actionable even when data is present.
- **Trap mapping choices.** Where accessibility and comprehension overlapped, the root trap was chosen based on what most directly degrades the task: label/meaning gaps map to **1.4**, stale previews to **4.4**, and impossible keyboard targeting to **2.1**.

## Fix & Re-evaluate Loop

This report is the Round 2 checkpoint for the live demos.

| Round | Focus | Result |
|-------|-------|--------|
| r1 → r2 | Validate spec predictions against implemented prototypes | 2 findings resolved, 3 partially resolved, 6 new implementation issues discovered |
| r2 → r3 (recommended) | Fix accessibility blockers first: F13, F14, F16, F2, F18 | Re-run Tenets & Traps on updated demos and verify that no High findings remain |

**Recommended next pass**

- Fix **F13**, **F14**, and **F16** before any moderated usability study.
- Then address the fast a11y/feedback improvements in **F2** and **F18**.
- Re-run the evaluation as **r3** and update each open row to **Resolved / Partially resolved / Unchanged / Regressed**.
