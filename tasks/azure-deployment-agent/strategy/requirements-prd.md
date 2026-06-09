---
title: "Requirements — Deployment Agent UX Enhancements"
phase: define
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Strategist Agent"
related:
  - "problem-statements.md"
  - "personas.md"
  - "../research/azure-deployment-agent-ux-enhancements.md"
---

# Requirements — Deployment Agent UX Enhancements

## 1. Executive Summary

The Azure Copilot Deployment Agent helps developers, DevOps engineers, and cloud architects design, deploy, and manage cloud workloads within Azure. Three rounds of evaluative research — culminating in a full-lifecycle study using a vibe-coded prototype (May 2026) — have identified critical UX gaps that limit adoption, trust, and efficiency. This PRD defines 15 prioritized requirements addressing five finding areas: agent discovery, cost transparency, Bicep deployment experience, inline editing, and version diffing. Requirements are organized by priority (P0/P1/P2) and mapped to measurable success metrics, user personas, and research evidence.

---

## 2. Prioritized Requirements

### P0 — Must Have (Critical)

| ID | Requirement | Description | Finding Area | Personas |
|----|-------------|-------------|--------------|----------|
| REQ-001 | Agent Discovery Redesign | Implement IDE-aligned invocation patterns (@ mentions, slash commands, command palette integration) so users can discover and invoke the Deployment Agent without guidance. The agent must be visible and accessible through interaction patterns that match users' existing VS Code mental models. | Agent Discovery | Alex, Priya, Marcus |
| REQ-002 | Explicit Interaction Modes | Clearly differentiate between Ask, Plan, and Agent modes in the UI with persistent visual indicators. Users must understand what Copilot will do next before submitting a prompt — whether it will answer a question, generate a plan, or execute an action. | Agent Discovery | Alex, Priya |
| REQ-003 | Pre-Deployment Validation | Display a "Review + Create" style summary before deployment execution. The validation step must surface: resource changes, cost impact, policy compliance status, quota and region capacity validation, dependency checks, and potentially destructive changes with explicit warnings. | Bicep Deployments | Priya, Marcus |

#### REQ-001: Agent Discovery Redesign

**Problem**: 0% unguided discovery rate across two study rounds. Users cannot find the Deployment Agent without explicit guidance.

**Acceptance Criteria**:
- Users can invoke the Deployment Agent via @ mention (e.g., `@deploy`) within Azure Copilot
- Users can invoke the Deployment Agent via slash command (e.g., `/deploy`)
- The agent appears in a command palette or agent directory accessible from the Copilot interface
- The agent is listed with a clear description of its capabilities and supported workflows

**Success Metric**: >80% unguided discovery rate in the next evaluative study round.

#### REQ-002: Explicit Interaction Modes

**Problem**: Users cannot distinguish whether a prompt will trigger a conversational response, generate a plan, or initiate an action. This ambiguity discourages exploration.

**Acceptance Criteria**:
- A persistent visual indicator shows the current interaction mode (Ask / Plan / Agent)
- Users can explicitly switch between modes
- Each mode has a clear description of its behavior visible on hover or in onboarding
- Mode transitions triggered by the system are communicated to the user before execution

**Success Metric**: >90% of users correctly identify the active mode when prompted during usability testing.

#### REQ-003: Pre-Deployment Validation

**Problem**: Users universally expect a pre-deployment review step but none exists. Deployment hesitation is driven by process uncertainty, not code quality concerns.

**Acceptance Criteria**:
- A dedicated validation step executes before deployment, checking: quotas, policies, dependencies, and destructive changes
- Results are presented in a structured, scannable summary (pass/warn/fail per category)
- Destructive changes are highlighted with explicit warnings and confirmation gates
- Cost impact summary is included in the validation view
- Users can abort, modify, or proceed based on validation results

**Success Metric**: Users express deployment confidence ≥4/5 (Likert scale) in both test and production scenarios.

---

### P1 — Should Have (High)

| ID | Requirement | Description | Finding Area | Personas |
|----|-------------|-------------|--------------|----------|
| REQ-004 | Service-Level Cost Breakdowns | Show cost at service and SKU level, not just aggregate. Include price-performance trade-off context for architectural decisions (e.g., what the user gains or loses by changing a tier or SKU). | Cost Transparency | Marcus, Priya |
| REQ-005 | Early Cost Signals | Surface cost implications at the point of decision during plan iteration and configuration, not after configuration is complete. Cost data must be available when users are making choices, not reviewing them. | Cost Transparency | Alex, Marcus |
| REQ-006 | IaC Code Viewer Enhancements | Add syntax highlighting, line numbers, explanatory comments, and consistent naming to the Bicep file viewer. The browsing experience should approach VS Code's read-only editor quality. | Bicep Deployments | Priya, Alex |
| REQ-007 | Inline Parameter Editing | Allow direct inline editing of deployment parameters within the configuration and IaC context pane. Users must be able to click into a value, modify it, and see the change reflected — not rely solely on prompt-based editing. | Inline Editing | Alex, Priya |

#### REQ-004: Service-Level Cost Breakdowns

**Problem**: A single aggregate cost estimate is insufficient. Users cannot identify cost drivers or optimization opportunities without service/SKU-level granularity.

**Acceptance Criteria**:
- Cost breakdown displays total, service-level, and SKU-level costs
- Each service shows its contribution to the total (absolute and percentage)
- Price-performance trade-off context is available for SKU/tier selections (e.g., "Standard vs. Premium: +$120/month for 3x throughput")
- High-impact resources are visually highlighted

**Success Metric**: Users can identify the top 3 cost drivers without navigating away from the plan view.

#### REQ-005: Early Cost Signals

**Problem**: Cost information appears too late in the workflow — after decisions have been made rather than while they are being made.

**Acceptance Criteria**:
- Cost indicators appear inline during plan configuration, updating as selections change
- When a user modifies a SKU, tier, or scaling parameter, the cost delta is shown immediately
- Cost signals are non-blocking — they inform without interrupting the configuration flow

**Success Metric**: Users report that cost information was available "at the right time" (≥4/5 Likert) during plan iteration.

#### REQ-006: IaC Code Viewer Enhancements

**Problem**: Missing syntax highlighting, limited comments, and naming inconsistencies reduce the effectiveness of browsing generated Bicep — despite the browsing experience being a significant trust driver.

**Acceptance Criteria**:
- Bicep code displays with syntax highlighting and line numbers
- Generated code includes explanatory comments for key configuration decisions
- Resource naming is consistent across generated files
- Search within code files is supported

**Success Metric**: Users rate the IaC browsing experience ≥4/5 for readability and comprehension.

#### REQ-007: Inline Parameter Editing

**Problem**: Prompt-only editing is perceived as unclear. Users are uncertain about what their prompt will change and prefer direct manipulation.

**Acceptance Criteria**:
- Users can click into parameter values (SKUs, names, counts, regions) and edit them directly
- Edits provide immediate visual feedback (value change + validation status)
- Invalid edits show inline error messages with guidance
- Prompt-based editing remains available as an alternative path

**Success Metric**: Users complete simple parameter changes inline without resorting to prompt-based editing in >80% of cases.

---

### P1 — Should Have (Medium)

| ID | Requirement | Description | Finding Area | Personas |
|----|-------------|-------------|--------------|----------|
| REQ-008 | Version Rollback | Support rollback to the most recent 3–5 workload plan versions as part of the iterative "try → validate → undo" workflow. Rollback controls should be accessible directly within the diff view. | Version Diffing | Priya, Marcus |
| REQ-009 | Diff Navigation Enhancements | Add search, filtering, collapsible sections, and resource grouping (by service type, resource group, change type) to the version diff view. Refined labels should distinguish introduced, updated, unchanged, and removed resources. | Version Diffing | Priya, Marcus |
| REQ-010 | Collaborative Deployment Workflows | Support PR creation from generated Bicep, review routing, iteration on review feedback, and approval tracking. Enable team-based async review workflows for production deployments. | Bicep Deployments | Priya |
| REQ-011 | Budget/Scaling Risk Warnings | Proactively surface warnings when configuration choices introduce potential budget overruns, scaling risks, or operational concerns. Warnings should appear inline during configuration with actionable recommendations. | Cost Transparency | Marcus, Priya |

#### REQ-008: Version Rollback

**Acceptance Criteria**:
- Users can view the last 3–5 versions of a workload plan
- Rollback to any listed version is supported with a single action from the diff view
- Rollback triggers a confirmation step showing what will change
- Default comparison is current version vs. immediately previous version

**Success Metric**: Users can successfully roll back to a previous version within the diff view without external assistance.

#### REQ-009: Diff Navigation Enhancements

**Acceptance Criteria**:
- Search within diff content returns results across all resources
- Resources can be filtered by change type (introduced, updated, removed, unchanged)
- Resources can be grouped by service type or resource group
- Sections are collapsible to manage visual complexity
- Change labels clearly distinguish introduced, updated, unchanged, and removed — with special handling for SKU/tier modifications

**Success Metric**: Users find and compare specific resource changes within 10 seconds in a diff containing 10+ resources.

#### REQ-010: Collaborative Deployment Workflows

**Acceptance Criteria**:
- Users can create a PR from generated Bicep files with a single action
- PRs can be routed to specific reviewers
- Review comments and iteration are supported within the deployment workflow
- Approval status is visible before deployment execution

**Success Metric**: Teams can complete a review-and-approve cycle for a production deployment within the Deployment Agent workflow.

#### REQ-011: Budget/Scaling Risk Warnings

**Acceptance Criteria**:
- The system flags configurations that exceed defined budget thresholds
- Auto-scaling configurations with high cost ceilings generate warnings
- Tier selections with known cost pitfalls surface advisory notices
- Warnings include actionable recommendations (e.g., "Consider Standard tier to reduce cost by 40%")

**Success Metric**: >90% of budget/scaling risks are surfaced proactively before deployment.

---

### P2 — Nice to Have

| ID | Requirement | Description | Finding Area | Personas |
|----|-------------|-------------|--------------|----------|
| REQ-012 | Architecture Diagrams | Auto-generate lightweight architecture or deployment topology diagrams within the diff/plan view, reflecting current vs. previous state. | Version Diffing | Marcus |
| REQ-013 | Flexible Cost Time Horizons | Support hourly, monthly, and annual cost views with links to deeper Azure pricing details. | Cost Transparency | Marcus |
| REQ-014 | Intent-Based Agent Surfacing | Proactively suggest the Deployment Agent based on inferred user intent from prompt content, rather than requiring manual invocation. | Agent Discovery | Alex |
| REQ-015 | Edit Mode Transitions | Define clear thresholds for when inline editing is appropriate vs. when to transition to a full VS Code experience. The system should recognize edit complexity and suggest the appropriate mode with smooth context handoff. | Inline Editing | Alex, Priya |

---

## 3. Success Metrics Summary

| Priority | Requirement | Key Metric | Target |
|----------|-------------|------------|--------|
| P0 | REQ-001 Agent Discovery Redesign | Unguided discovery rate | >80% |
| P0 | REQ-002 Explicit Interaction Modes | Correct mode identification | >90% |
| P0 | REQ-003 Pre-Deployment Validation | Deployment confidence (Likert) | ≥4/5 |
| P1 | REQ-004 Service-Level Cost Breakdowns | Identify top 3 cost drivers without nav | Yes/No task success |
| P1 | REQ-005 Early Cost Signals | "Right time" perception (Likert) | ≥4/5 |
| P1 | REQ-006 IaC Code Viewer Enhancements | Readability/comprehension (Likert) | ≥4/5 |
| P1 | REQ-007 Inline Parameter Editing | Inline edit completion rate | >80% |
| P1 | REQ-008 Version Rollback | Unassisted rollback success | Yes/No task success |
| P1 | REQ-009 Diff Navigation Enhancements | Time to find specific resource change | <10 seconds |
| P1 | REQ-010 Collaborative Workflows | End-to-end review cycle completion | Yes/No task success |
| P1 | REQ-011 Budget/Scaling Risk Warnings | Proactive risk detection rate | >90% |

---

## 4. Dependencies & Risks

### Dependencies

| Dependency | Owner | Impact | Status |
|------------|-------|--------|--------|
| Azure Copilot framework team alignment on agent discovery patterns (@ mentions, slash commands, command palette) | Copilot Platform | Blocks REQ-001, REQ-002, REQ-014 | Coordination needed |
| Bicep tooling integration for syntax highlighting, validation, and inline editing within the web UI | Bicep / Azure DevTools | Blocks REQ-006, REQ-007 | Dependency assessment needed |
| Azure Pricing API integration for real-time, SKU-level cost estimation | Azure Commerce | Blocks REQ-004, REQ-005, REQ-013 | API availability TBD |
| Azure Resource Manager APIs for quota, policy, and dependency validation | ARM | Blocks REQ-003, REQ-011 | Integration scope TBD |
| Git/GitHub integration for PR creation and review workflows | Azure DevOps / GitHub | Blocks REQ-010 | Existing integration available |

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Agent discovery patterns may not be standardized across Azure Copilot — fragmented UX | Medium | High | Engage Copilot framework team early; propose standards based on research findings |
| Azure Pricing API may not support real-time SKU-level estimates at required granularity | Medium | High | Prototype with static pricing data; validate API capabilities with Commerce team |
| Inline editing in web UI introduces state management complexity and potential for data loss | Medium | Medium | Design autosave and undo patterns; validate with focused usability testing |
| Pre-deployment validation may surface false positives, eroding trust | Low | High | Calibrate validation rules conservatively; allow users to dismiss warnings with acknowledgment |
| Research data gap on inline editing may result in design assumptions that don't match real behavior | Medium | Medium | Prioritize follow-up research on inline editing before finalizing REQ-007 and REQ-015 designs |

---

## 5. Out of Scope

The following items were evaluated during research but are explicitly excluded from this requirements cycle:

| Item | Rationale |
|------|-----------|
| **Formal baseline versioning** (named snapshots, milestone markers) | Mixed reception in research; no strong user consensus. Deferred until clearer demand emerges. |
| **Production-grade deployment research** | Round 3 focused on test and greenfield scenarios. A separate study is recommended to evaluate production deployment workflows, approval chains, and rollback in live environments. |
| **Image/diagram generation for architecture views** | REQ-012 is scoped as P2. Full architecture diagram generation (beyond topology diagrams) is a future enhancement pending feasibility assessment. |
| **Multi-cloud or non-Azure deployment support** | Out of scope for this initiative; agent is Azure-specific. |
| **Detailed inline editing behavioral research** | Data gap noted in findings. Follow-up extraction from session recordings is a research task, not a design requirement. |

---

## Next Steps

- [ ] Review and align requirements with Azure Copilot framework team (REQ-001, REQ-002)
- [ ] Conduct feasibility assessment for Azure Pricing API integration (REQ-004, REQ-005)
- [ ] Begin design exploration for P0 requirements — agent discovery and pre-deployment validation
- [ ] Schedule follow-up research session focused on inline editing behaviors (data gap)
- [ ] Map requirements to the end-to-end deployment journey using personas from [personas.md](personas.md)
- [ ] Establish design review cadence for P0 requirement solutions
