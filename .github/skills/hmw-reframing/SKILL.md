---
name: hmw-reframing
description: "Reframe validated problem statements as open-ended How Might We questions that invite a wide range of solution ideas without prescribing any. Use before concept brainstorm to create the ideation stimulus."
argument-hint: "Product or feature name (e.g., 'DesAIgns design operations platform')"
---

# HMW Reframing

## When to Use
- After problem statements are prioritised and approved
- Before concept brainstorm begins
- When the team needs a set of ideation prompts for a design sprint or workshop

## Procedure

### 1. Read Problem Statements

Load `strategy/problem-statements.md`. For each problem statement (PS-N):
- Identify the user segment
- Identify the unmet need
- Identify the barrier or friction
- Identify the insight it is grounded in

### 2. Apply the HMW Reframing Technique

For each problem statement, generate 3 different HMW questions using three distinct angles:

**Angle 1 — Remove the barrier**:
> "How might we eliminate [specific barrier] so that [user segment] can [accomplish goal]?"

**Angle 2 — Change the context**:
> "How might we design [context or environment] so that [user segment] naturally [desired behaviour]?"

**Angle 3 — Reframe the goal**:
> "How might we help [user segment] [reframed version of goal] even when [constraint that currently prevents it]?"

Each HMW question must:
- Be genuinely open-ended (multiple solution types possible)
- Not suggest a specific technology or UI pattern
- Be broad enough that 5+ different concepts could answer it
- Be specific enough that it is not answerable by any possible design (not "How might we improve the product?")

### 3. Cluster and Select

Group all generated HMW questions (typically 3 × N questions) into clusters by theme. Select the best 1–2 from each cluster based on:
- Breadth of possible solutions
- Strategic alignment with product goals
- Traction with the team (mark with a star if highly resonant)

Final output: 5–12 selected HMW questions, each tagged with its source problem statement (PS-N).

### 4. Write Supporting Context

For each selected HMW question:
- **Source**: PS-N (from problem-statements.md)
- **Why this framing**: 1–2 sentences explaining what makes this reframe generative
- **Constraints for ideation**: Any hard constraints solutions must respect (technical, legal, accessibility)

### 5. Save the Document

Save to `ideation/hmw-questions.md`:

```
# HMW Questions: {Product/Feature}

## Source: Problem Statements
## HMW Questions (grouped by cluster)
### Cluster 1: {Theme}
### Cluster 2: {Theme}
...
## Selected Questions for Brainstorm
## Ideation Constraints
```

Every HMW question must be traceable to a problem statement ID. Do not include questions invented without a problem statement anchor.
