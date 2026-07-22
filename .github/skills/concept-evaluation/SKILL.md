---
name: concept-evaluation
description: "Score and prioritise solution concepts against feasibility, desirability, and viability dimensions. Produces a scored matrix and a shortlist of concepts to take forward for prototyping. Use after concept brainstorm."
argument-hint: "Product or feature name (e.g., 'DesAIgns design operations platform')"
---

# Concept Evaluation

## When to Use
- After concept brainstorm to move from divergent to convergent thinking
- Before committing to a design direction
- When the team needs an objective basis for prioritisation decisions

## Procedure

### 1. Read Source Artifacts

Load:
- `ideation/concepts.md` — all generated concepts
- `strategy/requirements-prd.md` — must-have requirements and constraints
- `strategy/personas.md` — user goals and pain points

### 2. Define Evaluation Dimensions

Score every concept on three dimensions (1–5 scale each):

**Desirability (1–5)**: How well does this concept address the user's actual need?
- 5: Directly resolves the primary pain point for the primary persona
- 3: Partial fit — addresses the need with significant workarounds
- 1: Tangential — does not materially improve the user's situation

**Feasibility (1–5)**: How achievable is this concept given known constraints?
- 5: Can be built with existing technology and team capability in current sprint
- 3: Requires new technology or skills but is achievable within 3 months
- 1: Requires breakthrough technology or years of engineering

**Viability (1–5)**: How well does this concept align with business strategy and sustainability?
- 5: Directly supports stated product goals and is commercially sustainable
- 3: Neutral business impact; does not conflict with strategy
- 1: Works against business model or requires unsustainable resources

**Weighted score**: (Desirability × 0.45) + (Feasibility × 0.35) + (Viability × 0.20)

### 3. Build the Evaluation Matrix

Create a table with columns: Concept ID | Title | HMW Source | Desirability | Feasibility | Viability | Weighted Score | Recommendation

Recommendation values: **Prototype**, **Explore Further**, **Park**, **Discard**

### 4. Write Evaluation Notes

For each concept scored 3.0 or above:
- **Strengths**: What makes this concept strong against the criteria
- **Risks**: The top 1–2 risks if pursued
- **Hybrid potential**: Could elements of this concept be combined with another?

### 5. Select the Shortlist

Shortlist 2–4 concepts for prototyping. Selection rules:
- Must include at least one concept with the highest desirability score
- Must be feasible within project constraints
- Should not all be conventional — include at least one concept from an unexpected lens

Write a 3–5 sentence rationale for the shortlist.

### 6. Save the Document

Save to `ideation/concept-evaluation.md`:

```
# Concept Evaluation: {Product/Feature}

## Evaluation Criteria
## Scoring Matrix
## Evaluation Notes (top concepts)
## Shortlisted Concepts
## Rationale
## Parked Concepts (reasons)
```

Every concept from `concepts.md` must appear in the scoring matrix — even if scored 1.0 and discarded. Do not silently drop concepts.
