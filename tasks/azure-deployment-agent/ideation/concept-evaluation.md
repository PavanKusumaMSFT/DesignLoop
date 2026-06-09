---
title: "Concept Evaluation Matrix — Deployment Agent UX"
phase: ideate
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Ideator Agent"
related:
  - "solution-concepts.md"
  - "../strategy/requirements-prd.md"
---

# Concept Evaluation Matrix — Deployment Agent UX

## Overview

This document scores each solution concept from [solution-concepts.md](solution-concepts.md) across five evaluation dimensions, then recommends the optimal concept (or combination) for each focus area. Scores use a 1–5 scale where 5 is the strongest.

## Scoring Dimensions

| Dimension | Definition | 1 (Low) | 5 (High) |
|-----------|-----------|---------|----------|
| **User Impact** | How much does it reduce friction or solve the core problem? | Marginal improvement | Eliminates the core friction |
| **Feasibility** | How technically achievable within Azure Copilot constraints? | Requires new platform capabilities | Buildable with existing infrastructure |
| **Alignment** | How well does it match users' IDE-driven mental models? | Foreign interaction pattern | Mirrors existing IDE behavior |
| **Scope Risk** | How likely is it to creep beyond the planned scope? (inverted: 5 = low risk) | High creep risk | Well-contained scope |
| **Speed to Value** | How quickly can it deliver value to users? | 6+ months to impact | Value within first sprint |

---

## 1. Agent Discovery

| Concept | User Impact | Feasibility | Alignment | Scope Risk | Speed to Value | **Total** |
|---------|:-----------:|:-----------:|:---------:|:----------:|:--------------:|:---------:|
| A: Smart Agent Bar | 3 | 4 | 4 | 4 | 4 | **19** |
| B: Intent Detection | 4 | 2 | 5 | 2 | 2 | **15** |
| C: Mode Switcher | 5 | 4 | 5 | 3 | 3 | **20** |

**Analysis**:
- **Mode Switcher (C)** scores highest overall. It directly addresses the mode confusion identified in research (0% unguided discovery) and mirrors VS Code's established Ask/Edit/Agent pattern, earning top marks on User Impact and Alignment.
- **Smart Agent Bar (A)** is highly feasible and fast to deliver, but its impact is limited to discoverability — it doesn't resolve the mode confusion problem (REQ-002).
- **Intent Detection (B)** earns the highest Alignment score for meeting users where they are, but its feasibility is constrained by ML model requirements and its scope risk is significant due to accuracy tuning.

---

## 2. Cost Transparency

| Concept | User Impact | Feasibility | Alignment | Scope Risk | Speed to Value | **Total** |
|---------|:-----------:|:-----------:|:---------:|:----------:|:--------------:|:---------:|
| A: Cost Impact Sidebar | 5 | 2 | 3 | 2 | 2 | **14** |
| B: Inline Cost Annotations | 4 | 4 | 4 | 4 | 4 | **20** |
| C: Cost Delta in Diffs | 3 | 4 | 4 | 5 | 4 | **20** |

**Analysis**:
- **Inline Cost Annotations (B)** and **Cost Delta in Diffs (C)** tie at 20 points but complement each other — B serves the planning phase, C serves the iteration/comparison phase.
- **Cost Impact Sidebar (A)** has the highest User Impact but scores poorly on Feasibility (real-time API integration complexity) and Scope Risk (feature creep into budget management).
- The B+C combination delivers cost visibility across the two moments that matter most: initial configuration and version comparison.

---

## 3. Bicep Pre-Deployment Validation

| Concept | User Impact | Feasibility | Alignment | Scope Risk | Speed to Value | **Total** |
|---------|:-----------:|:-----------:|:---------:|:----------:|:--------------:|:---------:|
| A: Deploy Gate | 5 | 3 | 5 | 3 | 2 | **18** |
| B: Lightweight Banner | 3 | 4 | 3 | 4 | 4 | **18** |

**Analysis**:
- Both concepts score equally at 18 points but serve different deployment contexts.
- **Deploy Gate (A)** is essential for production deployments where validation confidence is non-negotiable (Priya's workflow). Its Alignment score reflects the Terraform `plan` mental model that DevOps users expect.
- **Lightweight Banner (B)** is better suited for test/dev deployments where speed matters more than exhaustive validation (Alex's workflow).
- The optimal solution combines Deploy Gate as the default with a fast-track option for non-production environments.

---

## 4. Inline Editing

| Concept | User Impact | Feasibility | Alignment | Scope Risk | Speed to Value | **Total** |
|---------|:-----------:|:-----------:|:---------:|:----------:|:--------------:|:---------:|
| A: Click-to-Edit Fields | 4 | 4 | 5 | 4 | 4 | **21** |
| B: Edit/Prompt Toggle | 4 | 3 | 4 | 2 | 2 | **15** |

**Analysis**:
- **Click-to-Edit Fields (A)** wins decisively. It scores highest on Alignment because direct manipulation is the most natural editing pattern for IDE users — clicking a value and changing it is how every spreadsheet and code editor works.
- **Edit/Prompt Toggle (B)** adds flexibility but at significant cost: two modes to learn, visual noise from toggles, and high scope risk from preference persistence and complex change detection logic.
- Click-to-Edit is the right starting point; the Edit/Prompt Toggle could be layered in later if research reveals demand.

---

## 5. Version Diffing Enhancements

| Concept | User Impact | Feasibility | Alignment | Scope Risk | Speed to Value | **Total** |
|---------|:-----------:|:-----------:|:---------:|:----------:|:--------------:|:---------:|
| A: Smart Diff Navigator | 4 | 3 | 4 | 2 | 2 | **15** |
| B: Version Timeline | 3 | 5 | 4 | 5 | 5 | **22** |

**Analysis**:
- **Version Timeline (B)** scores highest overall, driven by exceptional Feasibility, Scope Risk containment, and Speed to Value. It delivers the core version management and rollback functionality with minimal UI complexity.
- **Smart Diff Navigator (A)** has higher User Impact for large/complex plans, but its scope risk is significant and build effort is high. However, its search and filter features are high-value, independent enhancements.
- The recommended approach is to ship the Version Timeline as the primary version management UX, then selectively adopt Smart Diff Navigator's search and filtering features.

---

## Composite Scoring Summary

| Focus Area | Concept | Total Score | Rank |
|------------|---------|:-----------:|:----:|
| Agent Discovery | C: Mode Switcher | 20 | 1 |
| Agent Discovery | A: Smart Agent Bar | 19 | 2 |
| Agent Discovery | B: Intent Detection | 15 | 3 |
| Cost Transparency | B: Inline Cost Annotations | 20 | 1 (tie) |
| Cost Transparency | C: Cost Delta in Diffs | 20 | 1 (tie) |
| Cost Transparency | A: Cost Impact Sidebar | 14 | 3 |
| Pre-Deployment | A: Deploy Gate | 18 | 1 (tie) |
| Pre-Deployment | B: Lightweight Banner | 18 | 1 (tie) |
| Inline Editing | A: Click-to-Edit Fields | 21 | 1 |
| Inline Editing | B: Edit/Prompt Toggle | 15 | 2 |
| Version Diffing | B: Version Timeline | 22 | 1 |
| Version Diffing | A: Smart Diff Navigator | 15 | 2 |

---

## Recommendations

| Focus Area | Recommended Concept(s) | Rationale |
|------------|----------------------|-----------|
| **Agent Discovery** | **Mode Switcher (C)** + **Intent Detection (B)** | Mode Switcher provides explicit clarity and eliminates mode confusion (the #1 discovery barrier). Intent Detection layers on proactive surfacing for users who don't explore the UI. Together, they address both explicit and implicit discovery paths. Ship Mode Switcher first; add Intent Detection as a P2 enhancement. |
| **Cost Transparency** | **Inline Cost Annotations (B)** + **Cost Delta in Diffs (C)** | Inline Annotations deliver cost visibility during planning (when decisions are made). Cost Delta in Diffs provides cost context during iteration (when decisions are compared). Together, they cover the full decision lifecycle without the scope risk of a dedicated sidebar. Lightweight, contextual, and builds on the already-resonant diff view. |
| **Pre-Deployment Validation** | **Deploy Gate (A)** with fast-track for non-production | Deploy Gate's comprehensive validation is essential for the production confidence that Priya and Marcus require. Adding a fast-track toggle for non-production environments (inspired by the Lightweight Banner concept) preserves speed for Alex's test/dev workflow without sacrificing rigor. |
| **Inline Editing** | **Click-to-Edit Fields (A)** | Direct manipulation is the simplest, most aligned, and fastest path to value. It matches the IDE mental model (click → edit → confirm) without introducing mode complexity. The Edit/Prompt Toggle can be revisited after inline editing behavioral research fills the current data gap. |
| **Version Diffing** | **Version Timeline (B)** + **Smart Diff Navigator search/filter** | Version Timeline delivers version management and rollback with minimal UI weight and the fastest time to value. Selectively adopting Smart Diff Navigator's search bar and change-type filters adds scalability for large plans without the full navigation complexity. Ship Timeline first; add search/filter incrementally. |

---

## Next Steps

- [ ] Document selected concepts and rationale in [decision-log.md](decision-log.md)
- [ ] Begin wireframe exploration for recommended concepts, starting with P0 areas
- [ ] Validate recommended combinations with persona-driven scenario walkthroughs
- [ ] Conduct feasibility review with engineering for Deploy Gate validation APIs and Mode Switcher framework integration
- [ ] Schedule design review with Azure Copilot framework team for Mode Switcher alignment
