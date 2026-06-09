---
title: "Design-Engineering Changelog — Deployment Agent UX"
phase: deliver
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Handoff Agent"
related:
  - "implementation-guide.md"
---

# Design-Engineering Changelog — Deployment Agent UX

## Overview

This changelog documents design decisions, research rationale, trade-offs, and known limitations for each component in the Azure Deployment Agent UX enhancement suite. It bridges the gap between design intent and engineering implementation by explaining *why* decisions were made, not just *what* was decided.

---

## 1. ModeSwitcher

### What Changed From Previous Rounds

| Round | Change | Reason |
|-------|--------|--------|
| R1 → R2 | Changed from dropdown to segmented control | Research finding: users missed mode changes with dropdown; segmented control provides persistent visibility (ref: `research/findings/agent-discovery.md`) |
| R2 → R3 | Added `activeAgent` sub-label | Users reported confusion about which agent was active when multiple agents were available |
| R3 → R4 | Added `disabled` state during deployments | Edge case discovered in usability testing: users switching modes mid-deployment caused orphaned processes |

### Research Evidence

- **Agent discovery study** (`research/findings/agent-discovery.md`): 7/10 participants did not notice the mode indicator when it was a dropdown in the header overflow menu. Segmented control increased mode awareness to 10/10.
- **Task completion**: Mode switch time dropped from 4.2s (dropdown) to 1.1s (segmented control) in timed tasks.

### Design Decisions

- **Three fixed modes**: Ask, Plan, and Agent were chosen based on the existing Copilot mode taxonomy. Custom modes were considered and deferred to avoid scope creep.
- **Roving tabindex**: Chose roving tabindex over `aria-activedescendant` for the tab pattern because it aligns with the WAI-ARIA Authoring Practices for tabs and provides more predictable focus behavior across screen readers.
- **No mode persistence**: Mode resets to "Ask" on new sessions. Research showed users expected fresh sessions to start in the default mode.

### Trade-offs

- **Horizontal space**: Segmented control takes more header space than a dropdown. Accepted because mode visibility was the higher-priority finding.
- **Fixed mode set**: The current design does not support dynamic modes or custom agent tabs. If the agent ecosystem grows, this component will need a redesign (likely a scrollable tab bar or dropdown hybrid).

### Known Limitations (Prototype vs. Production)

- Prototype does not animate the active indicator slide — production should implement the `--motion-duration-fast` transition.
- Prototype hardcodes three modes — production must read available modes from the Copilot session context.
- No telemetry hooks in prototype — production should track mode switch frequency and dwell time.

---

## 2. CostBadge

### What Changed From Previous Rounds

| Round | Change | Reason |
|-------|--------|--------|
| R1 → R2 | Moved from sidebar panel to inline badge | Research finding: users ignored cost data in separate panels; inline placement increased cost awareness (ref: `research/findings/cost-transparency.md`) |
| R2 → R3 | Added `status` thresholds (normal/warning/critical) | Users wanted visual urgency signals without having to interpret raw numbers |
| R3 → R4 | Added SKU alternatives panel with performance comparison | Users asked "what are my cheaper options?" — alternatives panel answers this inline |
| R3 → R4 | Added `timeHorizon` toggle | Different teams think in different time scales (DevOps: monthly; Finance: annual; testing: hourly) |

### Research Evidence

- **Cost transparency study** (`research/findings/cost-transparency.md`): 8/10 participants failed to notice cost information when it was in a separate sidebar. Inline badges raised awareness to 9/10.
- **Threshold preferences**: Users preferred color-coded severity over raw numbers. "I don't want to do math — just tell me if it's expensive."
- **Alternatives request**: 6/10 participants asked some variant of "Can the agent suggest a cheaper option?" unprompted.

### Design Decisions

- **Inline, not block**: CostBadge renders inline within agent response text to maintain reading flow. It does not break the text into separate visual blocks.
- **Click-to-expand alternatives**: Chose a flyout panel over always-visible alternatives to keep the default view clean. Only users who care about alternatives need to interact.
- **Performance bar**: The performance comparison in alternatives uses a simple percentage bar (0-100) rather than detailed benchmark data. This is a simplification — production may want to link to full benchmark comparisons.
- **Currency formatting**: Delegated to `Intl.NumberFormat` rather than building custom formatters. This ensures locale-appropriate formatting without maintenance burden.

### Trade-offs

- **Pricing accuracy**: Costs shown are estimates based on list pricing. Actual costs may differ due to reserved instances, enterprise agreements, or hybrid benefit. The badge should include a "estimated" qualifier in production.
- **API latency**: Fetching alternatives from the Pricing API adds latency. The parent container should pre-fetch alternatives when rendering agent responses, not on badge click.
- **Simplification of performance metric**: A single 0-100 performance score abstracts away nuanced benchmark differences. Acceptable for quick comparison; power users may need a "View full comparison" link.

### Known Limitations (Prototype vs. Production)

- Prototype uses hardcoded cost data — production must integrate with Azure Retail Pricing API.
- Prototype does not handle currency conversion — production should respect the user's Azure portal currency setting.
- Alternatives panel does not paginate — production should handle SKUs with 20+ alternatives.
- No caching strategy in prototype — production should cache pricing data with a reasonable TTL (e.g., 1 hour).

---

## 3. DeployGate

### What Changed From Previous Rounds

| Round | Change | Reason |
|-------|--------|--------|
| R1 → R2 | Changed from simple confirm dialog to 5-section panel | Users needed more context before deploying — "I don't trust a single 'Deploy' button" |
| R2 → R3 | Added cost delta and top cost drivers | Users wanted to understand cost impact before confirming deployment |
| R3 → R4 | Added production environment safeguard checkbox | Research finding: accidental production deployments were the #1 fear (ref: `research/findings/bicep-deployments.md`) |
| R3 → R4 | Added "Save as PR" action | Teams with GitOps workflows wanted to review templates in PR before deploying |

### Research Evidence

- **Bicep deployments study** (`research/findings/bicep-deployments.md`): 9/10 participants wanted to see a resource summary before deploying. 7/10 specifically asked for validation results.
- **Production anxiety**: "My biggest fear is accidentally deploying to production" was the most common sentiment. The confirmation checkbox addresses this directly.
- **Cost in context**: Users wanted cost information at the point of deployment decision, not in a separate cost management tool.

### Design Decisions

- **Five sections, fixed order**: Resource Summary → Validation → Cost → Environment → Actions. This order follows the mental model discovered in research: "What am I deploying? Is it valid? How much? Where? Go."
- **Hard gate on validation failure**: Deploy button is truly disabled (not just warned) when any validation check fails. This is intentional — the research showed warnings were ignored, but disabled buttons forced users to resolve issues.
- **Production checkbox**: An explicit checkbox was chosen over a confirmation dialog because dialogs were dismissed too quickly in testing. The checkbox forces deliberate action.
- **Save as PR**: This action is optional (conditional on `onSaveAsPR` prop) because not all deployments originate from a repository context.

### Trade-offs

- **Strictness of gating**: Hard-blocking deployment on any validation failure may frustrate experienced users who know a warning is benign. Consider adding a "force deploy" escape hatch behind an admin permission in production.
- **Panel size**: Five sections create a tall panel that may require scrolling. Accepted because completeness was valued over compactness in research.
- **No progressive disclosure**: All sections are expanded by default. An accordion pattern was considered but rejected because users in testing said they wanted "everything visible at once."

### Known Limitations (Prototype vs. Production)

- Prototype uses mock validation data — production must integrate with ARM validation API.
- Prototype does not implement real-time validation polling — production should show a loading state while validation runs.
- "Save as PR" flow is stubbed — production needs GitHub/ADO repository integration.
- No retry mechanism for transient validation failures in the prototype.
- Prototype does not handle partial deployment failures or rollback from within DeployGate.

---

## 4. ClickToEdit

### What Changed From Previous Rounds

| Round | Change | Reason |
|-------|--------|--------|
| R1 → R2 | Added inline editing (component did not exist in R1) | Research finding: users wanted to modify parameters without re-typing the entire prompt (ref: `research/findings/inline-editing.md`) |
| R2 → R3 | Added `type="select"` for constrained values | Users were typing invalid values for fields like region and SKU that have fixed option sets |
| R3 → R4 | Added `impactPreview` prop | Users wanted to understand consequences before committing edits: "What happens if I change the region?" |
| R3 → R4 | Added `readOnly` prop | Some parameters should be visible but not editable (e.g., subscription ID) |

### Research Evidence

- **Inline editing study** (`research/findings/inline-editing.md`): 8/10 participants preferred editing values inline over re-prompting the agent. Average task time dropped from 18s (re-prompt) to 6s (inline edit).
- **Error prevention**: Free-text entry for constrained fields (like Azure regions) resulted in errors in 40% of attempts. Select dropdowns eliminated this.
- **Impact anxiety**: 5/10 participants hesitated before editing, saying "I don't know what this will affect." The impact preview addresses this.

### Design Decisions

- **Click-to-activate, not always-editable**: Fields appear as static text by default to avoid visual clutter. The edit affordance (pencil icon) appears on hover to signal interactivity without dominating the UI.
- **Escape to cancel**: Standard keyboard pattern. Pressing Escape discards the edit — no confirmation dialog for cancellation because the cost of re-entering a value is low.
- **Immediate save on select change**: For `type="select"`, changing the dropdown value saves immediately (no Enter required). This matches native `<select>` behavior and reduces clicks.
- **XSS sanitization**: All values are rendered through React's default escaping. `dangerouslySetInnerHTML` is explicitly prohibited for this component.

### Trade-offs

- **Discoverability**: The click-to-edit affordance is subtle (hover-only pencil icon). Users who don't hover may not discover it. Consider adding a first-time-use tooltip in production.
- **No undo**: After saving, there is no built-in undo. The parent component could implement undo by tracking previous values, but ClickToEdit itself does not manage history.
- **Impact preview is static text**: The `impactPreview` prop is a static string, not a dynamically computed impact. The parent is responsible for computing and passing the correct preview text.

### Areas for Additional Research

- **Editing thresholds**: At what point should inline editing give way to a form-based editing experience? If a deployment has 15+ editable parameters, inline editing may become overwhelming. Research recommended for deployments with high parameter counts.
- **Validation timing**: Should validation happen on every keystroke, on blur, or on save? The prototype validates on save only. Production may benefit from real-time validation for certain field types.

### Known Limitations (Prototype vs. Production)

- Prototype does not implement `impactPreview` computation — it uses hardcoded strings.
- Prototype does not handle concurrent edits (two users editing the same deployment).
- No optimistic UI update — the value reverts to the original until `onSave` completes, which may cause a flash.
- Prototype does not support multi-line text editing (e.g., for tags or descriptions).

---

## 5. VersionTimeline

### What Changed From Previous Rounds

| Round | Change | Reason |
|-------|--------|--------|
| R1 → R2 | Added version comparison (component did not exist in R1) | Research finding: users needed to compare deployments to understand what changed (ref: `research/findings/version-diffing.md`) |
| R2 → R3 | Changed from vertical list to horizontal timeline | Visual metaphor testing showed horizontal timeline better communicated temporal progression |
| R3 → R4 | Added two-version selection model | Users wanted side-by-side comparison; single selection was insufficient for diffing |
| R3 → R4 | Added rollback capability | "Can I just go back to the version that worked?" was asked by 6/10 participants |
| R3 → R4 | Added search/filter | Users with long deployment histories needed to find specific versions quickly |

### Research Evidence

- **Version diffing study** (`research/findings/version-diffing.md`): 7/10 participants attempted to compare deployment versions during tasks. Without a comparison tool, they resorted to manually opening Azure Portal deployment history in separate tabs.
- **Timeline metaphor**: Horizontal timeline tested better than vertical list for communicating temporal relationships. Users scanned left-to-right to find "when things broke."
- **Rollback demand**: "Can I roll back?" was the single most common question during the deployment agent usability study.

### Design Decisions

- **Two-version selection**: Exactly two versions must be selected for comparison. This constraint simplifies the diff view (always a binary comparison) and matches how users think: "What changed between X and Y?"
- **Selection replacement**: When two versions are already selected and the user clicks a third, the oldest selection is replaced. This avoids a "deselect first" interaction that frustrated users in testing.
- **Confirmation for rollback**: Rollback is a destructive action — always requires explicit confirmation. The confirmation dialog shows the target version details (label, date, author, change count) to prevent accidental rollbacks.
- **Search dims rather than hides**: Non-matching versions are dimmed rather than removed from the timeline. This preserves spatial context — users can still see where the matching version sits relative to others.

### Trade-offs

- **Horizontal scrolling**: Horizontal scroll is less natural on most input devices than vertical scroll. Mitigated with arrow buttons at timeline edges and keyboard Left/Right navigation.
- **Two-version limit**: Some users may want to compare 3+ versions simultaneously. This was deferred due to complexity — a multi-version diff view would require a fundamentally different UI.
- **No inline diff**: The timeline shows `changeCount` per version but does not show inline diffs. Diff details are expected to render in a separate panel controlled by the parent. This keeps VersionTimeline focused on navigation.

### Areas for Additional Research

- **Production deployment workflows**: The rollback model assumes re-deploying an older template is safe. In practice, some deployments have state dependencies (databases, DNS, etc.) that make rollback non-trivial. Research with production operations teams is recommended.
- **Version labeling**: The prototype uses deployment numbers (e.g., "Deploy #50"). Production teams may prefer semantic versioning, commit SHAs, or custom labels. Research on labeling preferences would inform the `label` field format.

### Known Limitations (Prototype vs. Production)

- Prototype uses mock version data — production must fetch from ARM Deployment History API.
- Prototype does not implement virtual scrolling for large version sets (>20).
- Diff computation is not implemented — prototype shows `changeCount` but not actual resource diffs.
- Rollback in prototype is a no-op — production must re-deploy the selected version's template.
- No support for version annotations or notes in the prototype.
- Timeline does not handle deployment-in-progress states (e.g., a version currently being deployed).

---

## Cross-Component Notes

### Design System Consistency

All five components share the same design token vocabulary. Engineering should verify that token values are defined in `designs/tokens/` before implementation begins. If any tokens are missing, coordinate with the design team to add them.

### Research-to-Implementation Traceability

| Research Finding | Component | Requirement | Implementation Detail |
|-----------------|-----------|-------------|----------------------|
| Mode awareness gap | ModeSwitcher | REQ-001, REQ-002 | Segmented control with persistent visibility |
| Cost visibility gap | CostBadge | REQ-004, REQ-005 | Inline badges with click-to-expand alternatives |
| Pre-deploy anxiety | DeployGate | REQ-003 | 5-section review panel with hard validation gating |
| Re-prompt friction | ClickToEdit | REQ-007 | Inline editing with select dropdowns for constrained values |
| Version comparison need | VersionTimeline | REQ-008, REQ-009 | Horizontal timeline with two-version selection and rollback |

### Outstanding Questions for Engineering

- [ ] Confirm ARM template validation API response shape matches `validationResults` prop structure
- [ ] Determine caching strategy for Azure Pricing API responses
- [ ] Clarify rollback semantics: does rollback create a new deployment or revert to an existing one?
- [ ] Define telemetry events for each component (mode switches, cost badge interactions, deploy gate outcomes, edits, rollbacks)
- [ ] Establish error boundary strategy: what does each component render when its data fetch fails?

## Next Steps

- [ ] Schedule design-engineering sync to walk through this changelog
- [ ] Engineering team documents API response shapes for each backend dependency
- [ ] Plan follow-up research for inline editing thresholds and production rollback workflows
- [ ] Create tracking issues for known prototype limitations that must be addressed before production
