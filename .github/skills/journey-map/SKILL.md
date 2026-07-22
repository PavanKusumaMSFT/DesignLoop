---
name: journey-map
description: "Map the current-state user journey across all stages with actions, tools, emotions, pain points, and opportunity annotations. Use after problem statements to visualise where and why users struggle before designing solutions."
argument-hint: "Product or feature name and the journey to map (e.g., 'DesAIgns — map the journey from design brief to first prototype')"
---

# Journey Map

## When to Use
- After problem statements to understand the full context of the problem space
- Before requirements writing to ensure all pain points are captured at each stage
- When stakeholders need a visual artefact showing the current user experience

## Procedure

### 1. Define the Journey Scope

Load `strategy/problem-statements.md`. Identify:
- The primary persona for this journey (use the highest-priority problem statement's segment)
- The start and end point of the journey
- The goal the user is trying to achieve

The journey should cover the end-to-end experience — not just the in-product portion.

### 2. Identify Journey Stages

Break the journey into 4–7 phases. Each phase represents a meaningful shift in the user's activity or context. Name each phase with a verb phrase:
> e.g., "Discover the need" → "Gather requirements" → "Set up the project" → "Run the design" → "Share with stakeholders"

### 3. For Each Stage, Document

**Actions**: What the user does (specific tasks, tool interactions, decisions)

**Thoughts**: What they are thinking — use quotes from research where possible

**Emotions**: Their emotional state on a scale — use emoji or a named state (frustrated, confident, anxious). Mark the emotion on a 5-point arc from negative to positive.

**Pain Points**: Specific frictions experienced. Each must be grounded in research — cite theme ID or participant quote.

**Tools**: What software, apps, or manual methods they use at this stage

**Opportunities**: One design opportunity annotation per pain point (prefixed `OPP-[N]`)

### 4. Identify Moments of Truth

Mark 1–3 stages as "Moment of Truth" — the stage where the user's overall perception of the experience is most shaped. Explain why.

### 5. Write the Journey Map

Present the journey as a Markdown table with one column per stage and rows for: Actions, Thoughts, Emotions, Pain Points, Tools, Opportunities.

After the table:
- **Key Pain Clusters**: Group pain points into 2–3 clusters that span multiple stages
- **Moments of Truth**: Explain each with 2–3 sentences
- **Top Opportunities**: List the top 5 opportunity annotations with their stage reference

### 6. Save the Document

Save to `strategy/journey-map.md`:

```
# Journey Map: {Persona} — {Journey Name}

## Journey Scope
## Journey Map Table
## Key Pain Clusters
## Moments of Truth
## Top Opportunities
```

The journey must cover a minimum of 4 stages and include at least one stage that occurs before the user touches the product (context-setting) and one after primary task completion (follow-up or reflection).
