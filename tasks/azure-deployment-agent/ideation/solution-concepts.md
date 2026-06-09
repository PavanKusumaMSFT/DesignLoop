---
title: "Solution Concepts — Deployment Agent UX Enhancements"
phase: ideate
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Ideator Agent"
related:
  - "../strategy/problem-statements.md"
  - "../strategy/requirements-prd.md"
---

# Solution Concepts — Deployment Agent UX Enhancements

## Overview

This document presents 2–3 solution concepts for each of the five focus areas identified in the Define phase. Concepts are grounded in the problem statements, personas, and requirements defined in [problem-statements.md](../strategy/problem-statements.md) and [requirements-prd.md](../strategy/requirements-prd.md). Each concept includes an interaction description, persona mapping, requirement traceability, trade-off analysis, and effort estimate.

---

## 1. Agent Discovery

> **HMW**: How might we make the Deployment Agent discoverable within Azure Copilot so that users can find and invoke it without guidance, using interaction patterns that match their IDE-driven mental models?

### Concept A: Smart Agent Bar

**Description**: A persistent, contextual agent bar at the top of Azure Copilot that shows available agents as chips/pills based on the current context. When a user is in a resource group, the Deployment Agent chip highlights. Clicking it or typing `@deploy` invokes it. Mirrors VS Code's @ mention pattern.

**How It Works**:
1. A slim horizontal bar renders above the Copilot input field, showing agent chips (e.g., "Deploy", "Monitor", "Secure").
2. Chips activate/highlight based on the user's current Azure context (resource group, subscription, resource type).
3. Clicking a chip switches Copilot into the corresponding agent mode and pre-fills the input with the agent mention (e.g., `@deploy`).
4. Typing `@` in the input field opens an autocomplete dropdown listing available agents, matching VS Code's `@` mention behavior.

| Dimension | Detail |
|-----------|--------|
| **Personas served** | Alex (IDE patterns), Priya (quick invocation) |
| **Requirements addressed** | REQ-001, REQ-014 |
| **Pros** | Familiar IDE pattern; zero-learning-curve for VS Code users; contextual highlighting reduces search |
| **Cons** | Consumes screen real estate; may not scale gracefully to a large number of agents |
| **Effort** | Medium |

---

### Concept B: Intent Detection + Agent Suggestions

**Description**: When a user types deployment-related keywords (e.g., "deploy", "create VM", "set up AKS"), Copilot infers intent and shows an inline suggestion: "It looks like you want to deploy. Would you like to use the Deployment Agent?" with a one-click handoff. No persistent UI chrome is needed.

**How It Works**:
1. As the user types a prompt, an intent classifier analyzes the input in real time.
2. When deployment intent is detected with high confidence, a subtle inline suggestion card appears below the input field.
3. The card displays: agent name, a one-line capability summary, and a "Use Deployment Agent" button.
4. Clicking the button switches to Agent mode and re-submits the prompt to the Deployment Agent.
5. Dismissing the card suppresses suggestions for the same intent within the session.

| Dimension | Detail |
|-----------|--------|
| **Personas served** | Alex (natural language), Marcus (contextual guidance) |
| **Requirements addressed** | REQ-001, REQ-002, REQ-014 |
| **Pros** | Low friction; proactive; no persistent UI chrome needed; meets users where they are |
| **Cons** | Intent detection accuracy is critical — false positives feel intrusive; requires ML model investment |
| **Effort** | High |

---

### Concept C: Mode Switcher

**Description**: An explicit mode toggle (Ask | Plan | Agent) in the Copilot header, similar to VS Code's Agent/Edit/Ask mode selector. Default is "Ask", but typing deployment-related prompts nudges toward "Agent" mode with a visual transition. Each mode has distinct styling to reinforce the active context.

**How It Works**:
1. A segmented control in the Copilot header shows three modes: **Ask** (conversational Q&A), **Plan** (generate a workload plan), **Agent** (invoke a specialized agent).
2. Each mode has a distinct background tint and icon to provide persistent visual feedback.
3. Users can click to switch modes explicitly at any time.
4. When a user types a deployment-related prompt in Ask mode, a subtle nudge appears: "Switch to Agent mode for deployment workflows?" with a one-click toggle.
5. Mode transitions triggered by the system show a brief animated indicator and a description of what will change.

| Dimension | Detail |
|-----------|--------|
| **Personas served** | Alex, Priya, Marcus (all three) |
| **Requirements addressed** | REQ-001, REQ-002 |
| **Pros** | Explicit modes eliminate ambiguity; matches VS Code's interaction model; clear mental model separation |
| **Cons** | Adds interface complexity; users must learn what each mode does; nudges may still be missed |
| **Effort** | Medium |

---

## 2. Cost Transparency

> **HMW**: How might we surface cost and performance trade-off information early and contextually within the deployment planning workflow so that users can make confident architectural decisions without leaving their flow?

### Concept A: Cost Impact Sidebar

**Description**: A collapsible sidebar panel that appears alongside the workload plan, showing real-time cost estimates broken down by service and SKU. Updates dynamically as users make changes. Includes color-coded indicators (green = under budget, yellow = approaching limit, red = over budget).

**How It Works**:
1. When a workload plan is generated or modified, a sidebar panel slides in from the right.
2. The sidebar shows a hierarchical cost breakdown: Total → Service Category → Individual Resource → SKU Details.
3. Each line item includes a cost estimate (monthly) and a color-coded status indicator.
4. Budget thresholds (if set) trigger color transitions — green below 70%, yellow at 70–90%, red above 90%.
5. Clicking any line item expands to show SKU alternatives with price-performance comparisons.
6. The sidebar collapses to a slim cost summary strip when dismissed, showing only the total.

| Dimension | Detail |
|-----------|--------|
| **Personas served** | Marcus (cost optimization), Priya (budget awareness) |
| **Requirements addressed** | REQ-004, REQ-005, REQ-011, REQ-013 |
| **Pros** | Always visible; real-time feedback loop; clear risk signals via color coding; supports deep drill-down |
| **Cons** | Consumes significant screen real estate; API latency for real-time updates may cause stale data; complex state management |
| **Effort** | High |

---

### Concept B: Inline Cost Annotations

**Description**: Cost badges/tags appear inline next to each resource in the workload plan (e.g., "VM: ~$120/mo"). Clicking a badge expands to show SKU alternatives with price-performance comparisons. A summary bar at the bottom shows the running total.

**How It Works**:
1. Each resource row in the workload plan displays a cost badge (e.g., `~$120/mo`) aligned to the right edge.
2. Badges use subtle color coding: gray for informational, amber for high-cost items, red for items exceeding thresholds.
3. Clicking a badge opens an inline expansion showing 2–3 alternative SKUs with cost and performance trade-offs in a compact comparison table.
4. A persistent summary bar at the bottom of the plan view shows: total estimated cost, number of resources, and a cost trend indicator (↑/↓) when changes are made.
5. Hovering over a badge shows a tooltip with hourly, monthly, and annual cost breakdowns.

| Dimension | Detail |
|-----------|--------|
| **Personas served** | Alex (quick scanning), Marcus (comparison shopping) |
| **Requirements addressed** | REQ-004, REQ-005 |
| **Pros** | Contextual and non-intrusive; scannable at a glance; supports progressive disclosure; low screen real estate |
| **Cons** | Clutter risk with many resources; cost estimate precision may vary by SKU; limited space for detailed trade-off data |
| **Effort** | Medium |

---

### Concept C: Cost Delta in Diffs

**Description**: Within the version diff view, a cost column shows how each change impacts cost (e.g., "+$45/mo", "−$20/mo"). A summary row shows the net cost change. Color-coded increases (red) and decreases (green) make the cost impact of each iteration immediately visible.

**How It Works**:
1. The existing side-by-side diff view gains an additional "Cost Impact" column on the right edge.
2. For each resource row, the column shows the cost delta between the two compared versions (e.g., `+$45/mo`, `−$20/mo`, `$0`).
3. Positive deltas are styled in red, negative in green, and zero in gray.
4. A summary row at the bottom shows: total cost (previous version), total cost (current version), and net delta.
5. Clicking a cost delta cell drills into the specific configuration change that drove the cost difference.

| Dimension | Detail |
|-----------|--------|
| **Personas served** | All personas during iteration |
| **Requirements addressed** | REQ-004, REQ-005 (ties into version diffing REQ-008, REQ-009) |
| **Pros** | Cost context exactly where users compare versions; reinforces the iterative "try → validate → adjust" workflow; low additional UI weight |
| **Cons** | Cost estimation accuracy for unreleased or hypothetical configurations; only visible when diffing (not during initial planning) |
| **Effort** | Medium |

---

## 3. Bicep Pre-Deployment Validation

> **HMW**: How might we create a pre-deployment review experience that gives users the confidence of a Terraform plan while maintaining the simplicity of the Azure Portal's Review + Create pattern?

### Concept A: Deploy Gate

**Description**: A multi-step validation screen before deployment, modeled after Azure's "Review + Create" but enhanced with five validation layers. A "Deploy" button only activates when all critical checks pass, providing a confidence gate for production-grade deployments.

**How It Works**:
1. When the user clicks "Deploy", a full-screen validation overlay appears instead of immediately executing.
2. The overlay displays five validation sections, each running asynchronously with progress indicators:
   - **(1) Resource Change Summary** — lists resources to be created, modified, or deleted with change counts.
   - **(2) Policy Compliance Check** — shows pass/fail badges for each applicable Azure Policy, with links to policy definitions.
   - **(3) Quota & Capacity Validation** — verifies region availability, subscription quotas, and resource limits.
   - **(4) Cost Impact Summary** — displays estimated cost delta with a breakdown by resource.
   - **(5) Destructive Change Warnings** — highlights any resource deletions or breaking changes with explicit acknowledgment checkboxes.
3. Each section shows a status badge: ✅ Pass, ⚠️ Warning, ❌ Fail.
4. The "Deploy" button activates only when all critical checks (Fail items) are resolved. Warnings can be acknowledged.
5. Users can click "Edit Plan" to return to configuration and address issues.

| Dimension | Detail |
|-----------|--------|
| **Personas served** | Priya (validation), Marcus (compliance) |
| **Requirements addressed** | REQ-003, REQ-011 |
| **Pros** | Comprehensive; builds deployment confidence; blocks risky deploys; aligns with Terraform `plan` mental model |
| **Cons** | May slow down test/dev deployments unnecessarily; full-screen overlay interrupts flow; validation latency for complex plans |
| **Effort** | High |

---

### Concept B: Lightweight Validation Banner

**Description**: A validation summary banner appears after the user clicks "Deploy", showing pass/fail for key checks with expandable details. Users can proceed with warnings acknowledged or fix issues first. Includes a "Run Full Validation" option for production environments.

**How It Works**:
1. When the user clicks "Deploy", a banner expands below the deploy button (not full-screen).
2. The banner shows a compact validation summary: 3–5 check categories as pass/fail pills (e.g., "Quotas ✅", "Policies ⚠️", "Dependencies ✅").
3. Clicking a pill expands to show detailed results for that category.
4. Warnings show a "Proceed Anyway" option with an acknowledgment checkbox.
5. A "Run Full Validation" link triggers the comprehensive Deploy Gate experience (Concept A) for production environments.
6. For non-production environments, users can configure a preference to skip the banner after initial setup.

| Dimension | Detail |
|-----------|--------|
| **Personas served** | Alex (fast test deploys), Priya (thorough production deploys) |
| **Requirements addressed** | REQ-003 |
| **Pros** | Fast for test/dev; thorough when needed; non-blocking for low-risk deploys; progressive disclosure |
| **Cons** | Users might skip warnings in test environments and build bad habits; less comprehensive than Deploy Gate for default flows |
| **Effort** | Medium |

---

## 4. Inline Editing

> **HMW**: How might we enable users to make quick, contextual edits to deployment parameters and IaC code without breaking their workflow, while providing clear thresholds for when to transition to a full VS Code experience?

### Concept A: Click-to-Edit Fields

**Description**: Configuration parameters in the workload plan and Bicep preview are rendered as interactive fields. Clicking a value (e.g., SKU name, replica count) opens an inline editor with validation, autocomplete, and a preview of the impact. Pressing Escape or Enter confirms/cancels.

**How It Works**:
1. Editable values in the workload plan and Bicep preview render with a subtle underline or edit icon on hover, signaling interactivity.
2. Clicking a value transforms it into an inline input field — text input for strings/numbers, dropdown for constrained values (SKUs, regions, tiers).
3. As the user types, inline validation checks the value against constraints (type, range, allowed values) and shows errors immediately.
4. Autocomplete suggests valid options for known parameter types (e.g., SKU names, Azure regions).
5. Pressing **Enter** commits the change and triggers a cost/impact recalculation. Pressing **Escape** cancels.
6. A subtle animation highlights the changed value, and the cost summary updates to reflect the delta.

| Dimension | Detail |
|-----------|--------|
| **Personas served** | Alex (quick edits), Marcus (parameter tweaks) |
| **Requirements addressed** | REQ-007, REQ-015 |
| **Pros** | Direct manipulation; immediate feedback; familiar pattern from spreadsheets and IDEs; low cognitive load |
| **Cons** | Not all parameters are safely editable inline (some have cross-resource dependencies); requires robust validation logic per parameter type |
| **Effort** | Medium |

---

### Concept B: Edit/Prompt Toggle

**Description**: Each editable section has a small toggle: "Edit" (direct manipulation) or "Prompt" (describe changes in natural language). The system remembers the user's preference. Complex changes auto-suggest switching to Prompt mode. A "Open in VS Code" button appears for anything that needs cross-file editing.

**How It Works**:
1. Each configuration section header includes a toggle switch: **Edit** (pencil icon) and **Prompt** (chat icon).
2. In **Edit mode**, parameters are directly editable (per Concept A behavior).
3. In **Prompt mode**, a mini text input appears where users describe the desired change in natural language (e.g., "Change to Standard_D4s_v3 for better performance").
4. The system remembers the user's last-used mode per section and pre-selects it on return.
5. When a user attempts an edit that affects multiple resources or cross-file dependencies, a suggestion appears: "This change affects 3 files. Switch to Prompt mode or open in VS Code?"
6. An **"Open in VS Code"** button is available on every section, deep-linking to the relevant Bicep file and line number.

| Dimension | Detail |
|-----------|--------|
| **Personas served** | Alex, Priya, Marcus (all three) |
| **Requirements addressed** | REQ-007, REQ-015 |
| **Pros** | Respects different editing preferences; clear transition thresholds for complex changes; VS Code handoff preserves context |
| **Cons** | Two modes to learn; toggle adds visual noise; preference persistence adds state complexity |
| **Effort** | High |

---

## 5. Version Diffing Enhancements

> **HMW**: How might we enhance the already-resonant version diffing experience with better organization, search, and rollback so that users can efficiently compare iterations and confidently roll back when needed?

### Concept A: Smart Diff Navigator

**Description**: An enhanced diff view with search, filtering, collapsible resource groups, breadcrumb navigation, and a floating "Changes Summary" chip. Rollback is available on each version. Designed for managing large, complex deployment plans with 10+ resources.

**How It Works**:
1. A **search bar** at the top of the diff view filters resources by name, type, or property — results highlight matching rows and collapse non-matching ones.
2. **Collapsible resource groups** organize resources by service type (Compute, Storage, Networking) or resource group, with expand/collapse all controls.
3. **Breadcrumb navigation** (Plan > Resource Group > Resource > Property) allows users to jump to any level of the diff hierarchy.
4. A **floating "Changes Summary" chip** in the top-right corner shows counts: "3 added · 2 modified · 1 removed". Clicking the chip scrolls to the first change.
5. **Change type filters** (Added / Modified / Removed / Unchanged) allow users to show/hide resource categories.
6. Each version in the diff sidebar shows a **"Rollback to this version"** button with a confirmation dialog showing what will change.

| Dimension | Detail |
|-----------|--------|
| **Personas served** | Alex, Priya, Marcus (all three) |
| **Requirements addressed** | REQ-008, REQ-009 |
| **Pros** | Scales to large plans; reduces information overload; supports targeted review; rollback in context |
| **Cons** | Complex UI to build and test; navigation patterns require learning; may over-engineer simple diffs |
| **Effort** | High |

---

### Concept B: Version Timeline

**Description**: A horizontal timeline strip below the diff view showing the last 3–5 versions as interactive dots. Clicking any two dots compares them. The active comparison is highlighted. Each dot shows a tooltip with the change summary. Rollback is a right-click option on any dot.

**How It Works**:
1. A slim horizontal timeline renders below the diff header, showing the last 3–5 versions as evenly spaced dots.
2. Each dot displays the version number and a timestamp on hover.
3. Hovering a dot shows a tooltip with a mini change summary: "2 resources added, 1 SKU changed, total cost +$35/mo".
4. Users select two dots to compare — the selected dots highlight and the diff view updates to show the comparison.
5. By default, the latest two versions are pre-selected.
6. Right-clicking a dot opens a context menu with: "Rollback to this version", "Set as baseline", "View details".
7. Rollback triggers a confirmation dialog showing the resource change summary before execution.

| Dimension | Detail |
|-----------|--------|
| **Personas served** | Priya (version management), Marcus (audit trail) |
| **Requirements addressed** | REQ-008 |
| **Pros** | Visual and intuitive; compact form factor; minimal UI overhead; fast version switching |
| **Cons** | Limited space for details beyond tooltips; may not scale beyond 5 versions; right-click discovery is not guaranteed on all devices |
| **Effort** | Low |

---

## Concept Summary

| Focus Area | Concept | Key Idea | Effort | Primary Personas |
|------------|---------|----------|--------|-----------------|
| Agent Discovery | A: Smart Agent Bar | Persistent contextual agent chips | Medium | Alex, Priya |
| Agent Discovery | B: Intent Detection | Proactive agent suggestion via NLU | High | Alex, Marcus |
| Agent Discovery | C: Mode Switcher | Explicit Ask/Plan/Agent toggle | Medium | All |
| Cost Transparency | A: Cost Impact Sidebar | Collapsible sidebar with real-time costs | High | Marcus, Priya |
| Cost Transparency | B: Inline Cost Annotations | Cost badges inline with resources | Medium | Alex, Marcus |
| Cost Transparency | C: Cost Delta in Diffs | Cost column in version diff view | Medium | All |
| Pre-Deployment | A: Deploy Gate | Multi-step validation overlay | High | Priya, Marcus |
| Pre-Deployment | B: Lightweight Banner | Compact validation banner with fast-track | Medium | Alex, Priya |
| Inline Editing | A: Click-to-Edit Fields | Direct manipulation of parameter values | Medium | Alex, Marcus |
| Inline Editing | B: Edit/Prompt Toggle | Dual editing modes with VS Code handoff | High | All |
| Version Diffing | A: Smart Diff Navigator | Search, filter, group, breadcrumbs | High | All |
| Version Diffing | B: Version Timeline | Horizontal timeline with dot comparison | Low | Priya, Marcus |

---

## Next Steps

- [ ] Evaluate concepts using the scoring matrix in [concept-evaluation.md](concept-evaluation.md)
- [ ] Select recommended concepts and document rationale in [decision-log.md](decision-log.md)
- [ ] Validate selected concepts with persona-driven walkthroughs
- [ ] Begin wireframe exploration for P0 concepts (Agent Discovery, Pre-Deployment Validation)
- [ ] Align with Azure Copilot framework team on Mode Switcher feasibility (Concept 1C)
