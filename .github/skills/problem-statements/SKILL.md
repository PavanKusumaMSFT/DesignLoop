---
name: problem-statements
description: "Write HMW problem statements grounded in validated research insights. Each statement names a specific user, their unmet need, and the insight that surfaces it. Use after findings synthesis to frame the problem space before ideation."
argument-hint: "Product or feature name (e.g., 'DesAIgns design operations platform')"
---

# Problem Statements

## When to Use
- After findings synthesis is complete and key insights are validated
- Before ideation begins — problem statements frame the design space
- When multiple stakeholders need alignment on what problem is being solved

## Procedure

### 1. Read Findings Synthesis

Load `research/findings-synthesis.md`. For each insight:
- Note the user segment affected
- Note the root cause identified
- Note the opportunity area associated

### 2. Write Problem Statements

Use this format for each statement:
> **PS-[N]**: [Specific user segment] needs a way to [accomplish goal] because [insight-backed reason], but currently [specific barrier or friction they face].

Rules:
- "Specific user segment" must be drawn from research — not "users" generically
- The "need" must be functional (what they are trying to accomplish), not a feature request
- The "because" clause must cite a specific insight ID from the synthesis (e.g., "Insight 3")
- The "but currently" clause must describe observable friction — not a solution gap

Write one problem statement per major opportunity area. Minimum: 3 statements. Maximum: 8.

### 3. Prioritise Statements

Score each statement on two dimensions (1–5 scale):
- **User impact**: How severely does this barrier affect users' primary goal?
- **Strategic value**: How well does solving this align with product goals?

Rank statements by combined score. Flag top 3 as "Priority" in the output.

### 4. Write HMW Reframes (Preview)

For each problem statement, write one How Might We question (1 sentence):
> **HMW-[N]**: How might we [address the need] so that [user segment] can [accomplish goal] without [current barrier]?

These are preview seeds for the hmw-reframing tool — keep them broad and non-prescriptive.

### 5. Save the Document

Save to `strategy/problem-statements.md`:

```
# Problem Statements: {Product/Feature}

## Research Foundation (link to findings-synthesis.md)
## Problem Statements (ordered by priority)
### PS-1: [Short title]
### PS-2: [Short title]
...
## Priority Problem Statements
## HMW Preview Questions
```

Every problem statement must include the insight ID it is grounded in. Statements without a research citation are not acceptable.
