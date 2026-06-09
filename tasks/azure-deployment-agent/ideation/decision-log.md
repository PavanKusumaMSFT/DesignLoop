---
title: "Decision Log — Deployment Agent UX Enhancements"
phase: ideate
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Ideator Agent"
related:
  - "solution-concepts.md"
  - "concept-evaluation.md"
---

# Decision Log — Deployment Agent UX Enhancements

## Overview

This decision log records the concept selection rationale for each of the five focus areas in the Deployment Agent UX enhancement initiative. Each entry documents the options considered, the selected approach, trade-offs accepted, dependencies, and conditions that would trigger reconsideration.

---

## DEC-001: Agent Discovery Approach

| Field | Detail |
|-------|--------|
| **Decision ID** | DEC-001 |
| **Decision** | Implement Mode Switcher (Concept C) as the primary discovery mechanism, with Intent Detection (Concept B) as a follow-on enhancement |
| **Date** | 2026-05-13 |
| **Status** | Proposed |

### Options Considered

| Option | Score | Summary |
|--------|:-----:|---------|
| A: Smart Agent Bar | 19 | Persistent agent chips — familiar but limited to discoverability; doesn't resolve mode confusion |
| B: Intent Detection + Agent Suggestions | 15 | Proactive NLU-based suggestion — high alignment but high effort and scope risk |
| **C: Mode Switcher** | **20** | **Explicit Ask/Plan/Agent toggle — directly eliminates mode confusion; mirrors VS Code pattern** |

### Selected Option

**Mode Switcher (C) + Intent Detection (B)**, sequenced as Mode Switcher first (P0), Intent Detection second (P2).

### Rationale

The 0% unguided discovery rate is driven by two compounding factors: (1) users cannot find the agent, and (2) users cannot distinguish what Copilot will do with their prompt. Mode Switcher addresses both simultaneously — it makes the agent explicitly selectable AND clarifies the current interaction mode. Intent Detection adds a proactive discovery path for users who prefer natural language over UI exploration, but depends on ML model accuracy that introduces scope risk. Sequencing Intent Detection as P2 allows the team to ship a high-impact solution quickly while investing in the ML capabilities in parallel.

### Trade-offs Accepted

- Users must learn what three modes mean (added cognitive load at onboarding)
- Mode Switcher adds a persistent UI element that consumes header space
- Intent Detection is deferred, meaning natural-language-first users (like Alex) won't get proactive suggestions in v1
- Smart Agent Bar's contextual highlighting is not included — may revisit if discovery rates remain below target

### Dependencies

- Azure Copilot framework team must support mode differentiation in the platform (API and UI framework)
- Visual design alignment needed with Copilot's existing header patterns and theming
- Intent Detection (P2) requires NLU model development and training data for deployment-related intents

### Revisit Trigger

- Unguided discovery rate remains below 60% after Mode Switcher ships — consider adding Smart Agent Bar for additional visual affordance
- Framework team rejects mode differentiation at the platform level — fall back to Smart Agent Bar as primary mechanism
- Intent Detection accuracy in prototype testing falls below 85% precision — deprioritize or redesign the suggestion UX

---

## DEC-002: Cost Transparency Approach

| Field | Detail |
|-------|--------|
| **Decision ID** | DEC-002 |
| **Decision** | Implement Inline Cost Annotations (Concept B) for the planning phase and Cost Delta in Diffs (Concept C) for the iteration phase |
| **Date** | 2026-05-13 |
| **Status** | Proposed |

### Options Considered

| Option | Score | Summary |
|--------|:-----:|---------|
| A: Cost Impact Sidebar | 14 | Comprehensive but high effort, screen real estate cost, and scope risk |
| **B: Inline Cost Annotations** | **20** | **Cost badges inline with resources — contextual, scannable, medium effort** |
| **C: Cost Delta in Diffs** | **20** | **Cost column in diff view — context at comparison time, well-contained scope** |

### Selected Option

**Inline Cost Annotations (B) + Cost Delta in Diffs (C)**, shipped together.

### Rationale

Research shows users need cost information at two critical moments: (1) when making configuration decisions during planning, and (2) when comparing versions during iteration. Inline Annotations serve moment #1 — they put cost data at the point of decision without consuming dedicated screen real estate. Cost Delta in Diffs serves moment #2 — it shows the cost impact of each change within the already-resonant diff view. Together, they deliver cost transparency across the full decision lifecycle with moderate effort and low scope risk. The Cost Impact Sidebar (A) was rejected because its high effort, real-time API dependency, and scope risk (feature creep toward budget management) outweigh its incremental benefit over the B+C combination.

### Trade-offs Accepted

- No dedicated cost panel — users who want a comprehensive cost dashboard must navigate to Azure Cost Management
- Cost estimates are point-in-time and may not reflect real-time pricing fluctuations
- Inline badges may add visual clutter in plans with 15+ resources — will need density testing
- Cost Delta in Diffs is only visible during version comparison, not during initial plan creation (covered by Concept B)

### Dependencies

- Azure Pricing API must support SKU-level cost estimation with acceptable latency (<2s per resource)
- Cost estimation accuracy thresholds must be defined — users need to understand estimate precision
- Design token system must include semantic colors for cost indicators (over-budget, approaching-budget, under-budget)

### Revisit Trigger

- Azure Pricing API cannot deliver SKU-level estimates — fall back to tier-level estimates with reduced granularity
- User testing reveals that inline badges cause information overload — consider the Cost Impact Sidebar as a supplementary view
- Stakeholders require real-time cost tracking — scope expands to include the sidebar concept

---

## DEC-003: Pre-Deployment Validation Approach

| Field | Detail |
|-------|--------|
| **Decision ID** | DEC-003 |
| **Decision** | Implement Deploy Gate (Concept A) as the default pre-deployment validation, with a fast-track option for non-production environments |
| **Date** | 2026-05-13 |
| **Status** | Proposed |

### Options Considered

| Option | Score | Summary |
|--------|:-----:|---------|
| **A: Deploy Gate** | **18** | **Multi-step validation overlay — comprehensive, confidence-building, high effort** |
| B: Lightweight Validation Banner | 18 | Compact banner with expandable details — fast for dev, less thorough by default |

### Selected Option

**Deploy Gate (A) with fast-track for non-production environments**.

### Rationale

Pre-deployment validation is the area with the strongest user consensus: every participant across all research rounds expected a review step before deployment. Priya (DevOps) and Marcus (Architect) explicitly require comprehensive validation for production confidence — quota checks, policy compliance, destructive change detection. The Deploy Gate delivers this comprehensiveness. However, Alex (Developer) needs fast iteration in test/dev environments. Adding a fast-track toggle (inspired by Concept B's lightweight approach) that reduces the Deploy Gate to a single-screen summary for non-production targets preserves speed without sacrificing rigor. This hybrid approach addresses the key weakness of each standalone concept.

### Trade-offs Accepted

- Deploy Gate adds a full-screen interruption to the deployment flow — may feel heavy for simple deployments
- Fast-track for non-production requires environment classification — user must identify target environment type
- Validation latency for complex plans (10+ resources, multiple policy checks) may be 5–10 seconds
- Users might miscategorize production environments as non-production to skip validation — need guardrails

### Dependencies

- Azure Resource Manager APIs for quota and capacity validation
- Azure Policy APIs for compliance checking
- Environment classification mechanism (production vs. non-production) — may leverage existing Azure environment tags
- Destructive change detection logic must be built or integrated from existing ARM deployment preview capabilities

### Revisit Trigger

- Validation latency exceeds 15 seconds for typical plans — consider async validation with notification
- Users consistently skip the fast-track and use Deploy Gate even for test environments — simplify to a single flow
- False positive rate for policy/quota checks exceeds 10% — erodes trust; recalibrate validation rules

---

## DEC-004: Inline Editing Approach

| Field | Detail |
|-------|--------|
| **Decision ID** | DEC-004 |
| **Decision** | Implement Click-to-Edit Fields (Concept A) as the primary inline editing mechanism |
| **Date** | 2026-05-13 |
| **Status** | Proposed |

### Options Considered

| Option | Score | Summary |
|--------|:-----:|---------|
| **A: Click-to-Edit Fields** | **21** | **Direct manipulation of parameter values — simple, aligned, medium effort** |
| B: Edit/Prompt Toggle | 15 | Dual editing modes with VS Code handoff — flexible but complex |

### Selected Option

**Click-to-Edit Fields (A)**.

### Rationale

Click-to-Edit is the most natural and lowest-friction editing pattern available. Research shows users instinctively try to click parameter values to edit them — this concept makes that instinct work. It earns the highest Alignment score (5/5) because direct manipulation is the foundational interaction pattern of every IDE and spreadsheet. The Edit/Prompt Toggle (B) adds flexibility but introduces two modes to learn, toggle UI noise, and significant scope risk from preference persistence and complex change detection. Given the existing data gap on inline editing behaviors (noted in research), starting with the simpler, more predictable pattern is the prudent choice. Prompt-based editing remains available through the main Copilot input — it doesn't need a dedicated toggle within each section.

### Trade-offs Accepted

- No dedicated prompt-based editing mode within configuration sections — users must use the main Copilot input for natural language edits
- Not all parameters can be safely edited inline (cross-resource dependencies) — requires clear disabled/read-only states for non-editable values
- No explicit VS Code handoff button in v1 — complex edits require manual context-switching
- Inline editing behavioral data is incomplete (research gap) — design may need iteration after follow-up research

### Dependencies

- Parameter validation rules must be defined per resource type and SKU
- Bicep tooling integration for inline validation of IaC-specific values
- State management for unsaved inline edits (autosave vs. explicit save)
- Accessibility: inline edit fields must support keyboard navigation and screen readers

### Revisit Trigger

- Follow-up research on inline editing reveals strong demand for prompt-based editing within configuration sections — add Edit/Prompt Toggle
- Users consistently attempt edits that affect multiple resources — add "Open in VS Code" handoff button
- Inline editing error rates exceed 20% — validation logic needs strengthening or certain fields should be read-only

---

## DEC-005: Version Diffing Enhancement Approach

| Field | Detail |
|-------|--------|
| **Decision ID** | DEC-005 |
| **Decision** | Implement Version Timeline (Concept B) as the primary version management UX, supplemented with search and filter features from Smart Diff Navigator (Concept A) |
| **Date** | 2026-05-13 |
| **Status** | Proposed |

### Options Considered

| Option | Score | Summary |
|--------|:-----:|---------|
| A: Smart Diff Navigator | 15 | Full-featured diff navigation — powerful but high effort and scope risk |
| **B: Version Timeline** | **22** | **Horizontal timeline with dot-based version comparison — visual, compact, low effort** |

### Selected Option

**Version Timeline (B) + Smart Diff Navigator search/filter features (from A)**.

### Rationale

Version Diffing is already the strongest-performing area in the current UX — users described it as "intuitive" and "comprehensive". The goal is enhancement, not redesign. Version Timeline delivers the two most-requested features — version comparison selection and rollback — with the lowest effort and highest speed to value (score: 22/25). It provides a clear, visual mechanism for the "try → validate → undo" workflow pattern observed across all personas. Selectively adopting Smart Diff Navigator's search bar and change-type filters adds scalability for large plans without the full navigation complexity, breadcrumb UI, or scope risk of the complete Navigator concept. This incremental approach respects the existing UX strengths while addressing specific enhancement requests from research.

### Trade-offs Accepted

- Version Timeline is limited to 3–5 versions — users with longer iteration histories must rely on other mechanisms
- Right-click for rollback may not be discoverable on all devices (especially touch) — consider adding an explicit rollback button
- Search and filter from Smart Diff Navigator are shipped as incremental enhancements, not at launch — large diff usability may be limited initially
- Breadcrumb navigation and resource grouping from Concept A are deferred — may be needed for enterprise-scale plans

### Dependencies

- Version history storage for the last 3–5 workload plan iterations
- Diff engine capable of resource-level comparison across stored versions
- Rollback API that can restore a previous workload plan version
- Search indexing of diff content for the search feature (from Smart Diff Navigator)

### Revisit Trigger

- Users regularly iterate beyond 5 versions — extend the timeline or add a version list view
- Large plans (20+ resources) make the diff view unwieldy without search/filter — accelerate Smart Diff Navigator features
- Touch device usage is significant — replace right-click rollback with an explicit button or long-press gesture

---

## Decision Summary

| ID | Focus Area | Selected Approach | Priority | Effort |
|----|-----------|-------------------|----------|--------|
| DEC-001 | Agent Discovery | Mode Switcher + Intent Detection (sequenced) | P0 + P2 | Medium + High |
| DEC-002 | Cost Transparency | Inline Cost Annotations + Cost Delta in Diffs | P1 | Medium + Medium |
| DEC-003 | Pre-Deployment Validation | Deploy Gate with non-production fast-track | P0 | High |
| DEC-004 | Inline Editing | Click-to-Edit Fields | P1 | Medium |
| DEC-005 | Version Diffing | Version Timeline + search/filter from Navigator | P1 | Low + Medium |

---

## Next Steps

- [ ] Present decisions to product and engineering stakeholders for alignment
- [ ] Begin wireframe exploration for DEC-001 (Mode Switcher) and DEC-003 (Deploy Gate) — P0 priorities
- [ ] Schedule feasibility review with Azure Copilot framework team for Mode Switcher integration
- [ ] Define API requirements for DEC-002 (Azure Pricing API) and DEC-003 (ARM validation APIs)
- [ ] Plan follow-up research session on inline editing behaviors to validate DEC-004 assumptions
- [ ] Establish design review cadence for iterating on wireframes and prototypes
