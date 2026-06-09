---
title: "Problem Statements — Deployment Agent UX"
phase: define
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Strategist Agent"
related:
  - "../research/azure-deployment-agent-ux-enhancements.md"
---

# Problem Statements — Deployment Agent UX

## Overview

This document defines five "How Might We" (HMW) problem statements for the Azure Copilot Deployment Agent UX enhancement initiative. Each statement is grounded in evidence from three rounds of evaluative research (most recently Round 3, May 2026) and targets a specific finding area. Together, they frame the design challenge space for the Define phase and establish measurable success criteria to guide solution evaluation.

## HMW 1: Agent Discovery (Critical)

> **How might we make the Deployment Agent discoverable within Azure Copilot so that users can find and invoke it without guidance, using interaction patterns that match their IDE-driven mental models?**

### Evidence

- **0% unguided discovery rate** across two study rounds (Round 2 — BAMI tenant, Round 3 — vibe-coded prototype), confirmed via video review of session recordings.
- Users' mental models are deeply shaped by VS Code conventions: they expect @ mentions (`@deploy`), slash commands (`/deploy`), and command palette interactions. When these familiar patterns are absent, users do not explore alternative paths.
- Participants experienced **mode confusion** — unable to distinguish whether a prompt would trigger a conversational response, generate a plan, or initiate an action — which further discouraged exploration.
- Some participants expected Copilot to **proactively surface** the Deployment Agent based on inferred intent from their prompts.

### User Need

Familiar, IDE-aligned invocation patterns that make the Deployment Agent visible and accessible without prior knowledge. Clear separation between Ask, Plan, and Agent modes so users understand what Copilot will do next.

### Success Metric

- **>80% unguided discovery rate** in the next evaluative study round.
- Users can correctly identify and invoke the Deployment Agent within 60 seconds of starting a deployment-related task.

---

## HMW 2: Cost Transparency (High)

> **How might we surface cost and performance trade-off information early and contextually within the deployment planning workflow so that users can make confident architectural decisions without leaving their flow?**

### Evidence

- A **single aggregate cost estimate was viewed as insufficient** — users cannot identify cost drivers or optimization opportunities from a total alone.
- Users expect cost information **early in the workflow** — during planning and configuration — not as an afterthought after decisions are made.
- Participants demanded visibility into how architectural decisions (swapping services, changing SKUs, adjusting tiers) affect **both cost AND performance**, not cost in isolation.
- Users expected **proactive risk signals** for budget, scaling, and operational risks prior to deployment — rather than discovering cost surprises post-deployment.

### User Need

Granular, service/SKU-level cost data surfaced at the point of decision. Cost-performance trade-off visibility that supports informed architectural choices. Proactive warnings for budget and scaling risks.

### Success Metric

- Users can **identify the top 3 cost drivers** in a deployment plan without navigating away from the plan view.
- Users can compare cost-performance trade-offs between at least two alternative configurations within the workflow.

---

## HMW 3: Bicep Deployment Experience (Medium)

> **How might we create a pre-deployment review experience that gives users the confidence of a Terraform plan while maintaining the simplicity of the Azure Portal's Review + Create pattern?**

### Evidence

- **Universal expectation for pre-deployment validation** — participants consistently expected a review step analogous to Terraform's `plan` command or Azure Portal's "Review + Create" flow.
- Expected validations include: quota and region capacity checks, policy compliance verification, dependency validation, and destructive change detection.
- Deployment hesitation was driven by **process expectations** (organizational approval workflows, peer review for production), not doubts about generated code quality.
- Generated Bicep **increased trust and transparency** — users expressed strong confidence in code quality, noting modular structure and readable formatting. Even Terraform-first users found Bicep approachable.
- UX polish gaps (missing syntax highlighting, limited explanatory comments, naming inconsistencies) reduced the effectiveness of the code browsing experience.

### User Need

A structured pre-deployment validation step that checks quotas, policies, dependencies, and destructive changes. Peer review and approval workflows for production deployments. Enhanced IaC browsing with syntax highlighting and explanatory context.

### Success Metric

- Users express **high confidence** (≥4/5 on a Likert scale) before deploying in both test and production scenarios.
- Pre-deployment validation catches and surfaces at least 90% of quota, policy, and dependency issues before execution.

---

## HMW 4: Inline Editing (Medium)

> **How might we enable users to make quick, contextual edits to deployment parameters and IaC code without breaking their workflow, while providing clear thresholds for when to transition to a full VS Code experience?**

### Evidence

- **Prompt-only editing was perceived as unclear** — users were uncertain about what their prompt would change, whether changes would be isolated, and how to verify results before application.
- Users **prefer direct inline editing** within the IaC context pane — click-to-edit with immediate visual feedback — aligning with IDE-driven mental models where code is directly editable.
- Implicit **editing thresholds** exist in users' mental models: lightweight changes (renaming, SKU adjustments, parameter values) should be inline; structural changes (refactoring modules, adding resources) should transition to VS Code.
- Detailed behavioral data specific to inline editing requires additional extraction from session recordings (data gap noted in research).

### User Need

Direct manipulation for lightweight parameter and configuration changes within the web UI. Clear transition points where the system suggests moving to VS Code for complex edits, with seamless context handoff.

### Success Metric

- Users complete **simple parameter changes inline** (e.g., SKU adjustment, resource rename) without resorting to prompt-based editing.
- Users can identify when to transition to VS Code based on system-provided guidance.

---

## HMW 5: Version Diffing Enhancements (Low — Polish)

> **How might we enhance the already-resonant version diffing experience with better organization, search, and rollback so that users can efficiently compare iterations and confidently roll back when needed?**

### Evidence

- **Strong positive reception** — participants consistently described the version diffing experience as intuitive, comprehensive, and easy to follow. Side-by-side tables with color coding were viewed as significantly superior to manual comparison workflows.
- Users valued **fluid summary-to-detail navigation** and the rich explanatory content embedded within diffs (configuration details, best-practice flags, trade-offs, costs, alternatives).
- Enhancement requests centered on: **resource grouping** (by service type, resource group, change type), **search and filtering**, and **collapsible sections** for managing large diffs.
- All participants expected **rollback** as part of an iterative "try → validate → undo if needed" workflow — typically to the last 3–5 versions.
- Mixed reception of formal baseline versioning — no strong consensus; recommended to defer.

### User Need

Ability to manage and compare 3–5 recent versions with rollback support. Organizational tools (search, filter, grouping, collapsible sections) to handle complex diffs efficiently.

### Success Metric

- Users can **find and compare specific resource changes** within 10 seconds in a diff containing 10+ resources.
- Users can successfully **roll back** to a previous version within the diff view without external assistance.

---

## Next Steps

- [ ] Develop user personas grounded in these problem statements — see [personas.md](personas.md)
- [ ] Translate HMWs into prioritized requirements — see [requirements-prd.md](requirements-prd.md)
- [ ] Map the end-to-end deployment journey with friction points annotated by HMW area
- [ ] Align with Azure Copilot framework team on agent discovery pattern standardization (HMW 1)
- [ ] Schedule design review to sequence solution exploration across HMW areas
