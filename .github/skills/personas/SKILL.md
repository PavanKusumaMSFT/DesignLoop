---
name: personas
description: "Create research-grounded user personas with goals, pain points, behaviours, and a scenario narrative. Each persona must be derived from validated research — not invented from assumptions. Use after problem statements to ground design decisions in real user segments."
argument-hint: "Product name and number of personas to create (e.g., 'DesAIgns platform — 2 personas')"
---

# Personas

## When to Use
- After problem statements to crystallise the user segments being designed for
- When the team needs shared reference characters for design decisions
- Before journey mapping and requirements writing to ensure user-centricity

## Procedure

### 1. Read Source Artifacts

Load:
- `strategy/problem-statements.md` — user segments identified
- `research/findings-synthesis.md` — themes and insights
- `research/user-interviews/synthesis.md` — direct quotes and behaviours (if available)

Identify distinct user segments from the research. A segment qualifies as a persona if it has:
- A distinct primary goal
- At least 2 unique pain points not shared by other segments
- Evidence from at least 2 participant sessions or data sources

### 2. Create Each Persona

For each persona, write the following sections:

**A. Identity**
- Name (fictional, memorable — avoid stereotypes)
- Role and organisation type
- Experience level with the product category
- One-line summary: "[Name] is a [role] who [primary behaviour or challenge]."

**B. Goals**
- 3 primary goals in priority order
- Each goal stated as "To [verb] [object] so that [outcome]"
- Goals must be task-level — not aspirational values

**C. Pain Points**
- 3–5 specific pain points
- Each must cite a source: a theme ID from synthesis or a direct quote
- Format: "[Pain point description]" — *Source: Theme 3 / Participant P02*

**D. Behaviours**
- 4–6 behavioural traits as axis spectrums, e.g.:
  - Prefers manual control ←——→ Trusts automation
  - Works solo ←——→ Collaborates in real-time
- Mark where on the spectrum this persona sits with an X

**E. Tools and Context**
- Tools they currently use for the task
- Working environment (remote, in-office, device)
- Frequency of relevant task

**F. Scenario Narrative**
- A 150–200 word first-person narrative describing a realistic day-in-the-life moment that surfaces their primary goal and main pain point
- Written as flowing prose, not bullet points
- Must reference the actual product context

**G. Design Implications**
- 2–3 specific design implications this persona surfaces
- Format: "This persona needs [feature/pattern] because [behaviour/pain]."

### 3. Save the Document

Save to `strategy/personas.md`:

```
# Personas: {Product/Feature}

## Research Foundation
## Persona 1: {Name}
## Persona 2: {Name}
...
## Design Implications Summary
```

Minimum: 2 personas. Maximum: 4. Do not create a persona for every participant — group by segment.
