---
name: decision-log
description: "Record every key design decision made during the ideation phase: what was decided, why, what alternatives were considered, and what risks were accepted. Use after concept evaluation to preserve institutional knowledge for the engineering team."
argument-hint: "Product or feature name (e.g., 'DesAIgns design operations platform')"
---

# Decision Log

## When to Use
- After concept evaluation and shortlisting
- When a significant design direction change occurs
- Before handoff — to ensure engineers understand why decisions were made

## Procedure

### 1. Read Source Artifacts

Load:
- `ideation/concept-evaluation.md` — shortlisted concepts and rationale
- `strategy/requirements-prd.md` — constraints and must-haves
- Any existing decisions from prior stages

### 2. Identify Decisions to Log

A decision is worth logging if it:
- Changed the design direction from the default or expected path
- Rejected a technically feasible option for UX or strategic reasons
- Accepted a known trade-off or risk
- Set a precedent that will affect future design choices

### 3. Write Each Decision Entry

Use this format:

```
## Decision [N]: {Short title}

**Date**: YYYY-MM-DD
**Status**: Decided / Under Review / Superseded
**Decided By**: [Role or team]

### Context
2–4 sentences describing the situation that required a decision. What was the design challenge? What constraints applied?

### Decision
The specific choice made. One clear statement: "We will [action] rather than [alternative]."

### Rationale
Why this choice was made. Reference evidence: persona goals, research insights, feasibility constraints, business requirements. Cite artifact IDs where applicable.

### Alternatives Considered
| Alternative | Why Rejected |
|-------------|-------------|
| [Option A] | [Specific reason with evidence] |
| [Option B] | [Specific reason with evidence] |

### Trade-offs Accepted
What is being given up by making this decision? What risks are accepted? Be honest — do not omit real trade-offs.

### Reversibility
- **Easy to reverse**: Can be changed at any time without significant rework
- **Hard to reverse**: Changing this would require significant re-work
- **Irreversible**: Cannot be undone once shipped (mark these with ⚠️)
```

### 4. Maintain Chronological Order

List decisions in the order they were made. If a decision supersedes an earlier one, link to the earlier decision and mark the old entry as "Superseded by Decision [N]".

### 5. Write the Summary Table

At the top of the document, include a summary table:

| Decision | Status | Date | Reversibility |
|----------|--------|------|---------------|
| D-1: ... | Decided | ... | Easy |

### 6. Save the Document

Save to `ideation/decision-log.md`:

```
# Decision Log: {Product/Feature}

## Summary Table
## Decisions
### Decision 1: {Title}
...
```

Minimum: 3 entries (there are always at least 3 meaningful decisions). If fewer than 3 are identified, go back to concept-evaluation and find the decisions that were implicit.
