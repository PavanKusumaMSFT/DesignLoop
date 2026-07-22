---
name: requirements-prd
description: "Write the product requirements document with functional and non-functional requirements, acceptance criteria, constraints, and measurable success metrics. Use after personas and journey mapping to define what will be built before wireframing begins."
argument-hint: "Product or feature name (e.g., 'DesAIgns project setup flow')"
---

# Requirements PRD

## When to Use
- After personas and journey map are complete
- Before design begins, to align engineering on scope and constraints
- When a shared requirements document is needed for sprint planning

## Procedure

### 1. Read Source Artifacts

Load:
- `strategy/personas.md` — user segments and their goals
- `strategy/journey-map.md` — pain points and opportunities (if available)
- `strategy/problem-statements.md` — priority problems being solved

### 2. Write the Overview Section

- **Problem Statement**: 2–3 sentence summary of the problem being solved
- **Proposed Solution**: 2–3 sentence description of the product or feature scope
- **Target Users**: Reference persona names from `personas.md`
- **Success Metrics**: 3–5 measurable outcomes with numeric targets, e.g.:
  - Task completion rate ≥ 85%
  - Time-to-first-output ≤ 5 minutes
  - User satisfaction (SUS) ≥ 72

### 3. Write Functional Requirements

Group requirements by feature area. For each requirement:
- ID: `FR-[N]`
- User story: "As a [persona], I need to [action] so that [goal]."
- Acceptance criteria: 2–4 testable conditions in Given/When/Then format
- Priority: Must Have / Should Have / Could Have (MoSCoW)
- Persona reference: which persona this requirement serves

Minimum: 8 functional requirements. Every "Must Have" requirement must have at least 2 acceptance criteria.

### 4. Write Non-Functional Requirements

Address:
- **Performance**: Load time targets, throughput
- **Accessibility**: WCAG 2.1 AA compliance required
- **Security**: Data handling, authentication
- **Browser/device support**: Minimum support matrix
- **Internationalisation**: If applicable

Each non-functional requirement must include a measurable threshold, not just a category name.

### 5. Define Constraints and Assumptions

**Constraints**: Technical, time, resource, or regulatory constraints that bound the solution space

**Assumptions**: What is assumed to be true — each assumption is a risk if wrong. List 3–6 assumptions.

**Out of Scope**: List explicitly what will NOT be built in this version

### 6. Write the Glossary

Define any domain-specific terms used in the PRD.

### 7. Save the Document

Save to `strategy/requirements-prd.md`:

```
# Product Requirements Document: {Feature Name}

## Overview
## Problem Statement
## Success Metrics
## Functional Requirements
## Non-Functional Requirements
## Constraints and Assumptions
## Out of Scope
## Glossary
```

Every functional requirement must reference a persona. Requirements that cannot be tied to a user need must be justified in the constraints section.
