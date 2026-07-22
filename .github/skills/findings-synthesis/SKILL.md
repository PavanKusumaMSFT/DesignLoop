---
name: findings-synthesis
description: "Synthesise all research artifacts — competitive analysis, user interview synthesis, desk research — into a unified set of validated themes, key insights, and ranked opportunity areas. Use after all discover-stage research is complete."
argument-hint: "Product or feature name (e.g., 'DesAIgns design operations platform')"
---

# Findings Synthesis

## When to Use
- After all discover-stage research tools have run (competitive analysis, user interviews)
- When the team needs a single source of truth before entering the define stage
- When multiple research streams need to be reconciled and prioritised

## Procedure

### 1. Gather All Research Artifacts

Load each available artifact from `research/`:
- `research/competitive/` — competitive analysis matrix and brief
- `research/user-interviews/synthesis.md` — interview themes and insights
- `research/research-brief.md` — original research questions

Note which artifacts are absent — call out any gaps in the synthesis.

### 2. Extract Raw Findings

For each artifact, list every finding as a bullet:
- Label by source (e.g., `[CA]` for competitive analysis, `[UI]` for user interviews)
- Keep each finding atomic (one observation per bullet)
- Include a direct quote or data point for every finding

Target: 15–40 raw findings before clustering.

### 3. Identify Themes

Group raw findings into 4–8 themes. Rules:
- A theme must be supported by findings from at least 2 different sources
- Each theme must have a clear user-facing or strategic implication
- Name themes as active insights, not category labels:
  - Good: "Users abandon setup when token configuration is required upfront"
  - Bad: "Onboarding issues"

### 4. Write Key Insights

For each theme, write one insight statement in this format:
> **Insight [N]**: [User segment] [experience/believe/do] [specific behaviour or situation] because [root cause]. This matters because [design or business implication].

Each insight must cite at least 2 supporting findings by their source label.

### 5. Identify Opportunity Areas

For each insight, write one opportunity area:
> **Opportunity [N]**: How might we [address the root cause] so that [user outcome] is achieved?

Rank opportunities 1–N by impact (how many users affected × severity of pain).

### 6. Note Confidence Levels

For each insight, rate confidence:
- **High**: Supported by 3+ sources, consistent across participant groups
- **Medium**: Supported by 2 sources, may vary by segment
- **Low**: Single source, needs validation

### 7. Save the Synthesis

Save to `research/findings-synthesis.md`:

```
# Findings Synthesis: {Product/Feature}

## Research Inputs
## Raw Findings
## Themes
## Key Insights (with source citations)
## Opportunity Areas (ranked)
## Confidence Levels
## Gaps and Unanswered Questions
```

The "Gaps and Unanswered Questions" section must be present even if empty — explicitly state "No gaps identified" or list open questions.
