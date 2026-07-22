---
name: user-interviews
description: "Plan, script, and synthesise user interview findings. Produces a reusable discussion guide and a thematic synthesis document. Use when generative research is needed to understand user goals, mental models, and pain points before defining the problem."
argument-hint: "Research topic and participant type (e.g., 'DesAIgns onboarding — interview 6 product designers new to AI-assisted design tools')"
---

# User Interviews

## When to Use
- Generative research to understand user goals, context, and mental models
- Validating or challenging assumptions before the define stage
- Following up on competitive analysis gaps where quantitative data is insufficient

## Procedure

### 1. Read the Research Brief

Load `research/research-brief.md`. Extract:
- The research questions this interview study will answer
- The participant profile and screening criteria
- The decisions that hinge on these findings

### 2. Design the Discussion Guide

Structure the guide in five sections:

**A. Warm-Up (5 min)**
- Role and context questions: "Walk me through your typical day as a [role]."
- Relationship to the problem space: open, non-leading

**B. Current Behaviour (15 min)**
- Task-based prompts: "Tell me about the last time you [relevant task]."
- Follow-up probes: "What made that difficult?", "What did you do next?", "How often does that happen?"

**C. Pain Points and Workarounds (10 min)**
- "What do you do when [pain point scenario]?"
- "If you could change one thing about how you [task], what would it be?"

**D. Concept Reactions (optional, 10 min)**
- Only if evaluating a sketch or concept — keep stimuli low-fidelity
- "What do you see here?", "What would you expect to happen if you tapped that?"

**E. Debrief (5 min)**
- "Is there anything important about [topic] we haven't covered?"
- Thank and logistics

Each question must be non-leading and open-ended. Do not include yes/no questions in the main body.

### 3. Add Moderator Notes

For each question, add a moderator note in italics:
> *Probe: If they mention [X], ask "Can you tell me more about when that happens?"*

### 4. Save the Discussion Guide

Save to `research/user-interviews/guide.md`:

```
# Interview Discussion Guide: {Research Topic}

## Study Overview
## Participant Profile
## Session Structure (with timing)
## Warm-Up Questions
## Core Questions
## Optional Concept Questions
## Debrief
## Moderator Notes
```

### 5. Synthesise Findings

After interviews are conducted (or using provided notes/transcripts):

**Step 1 — Extract observations**: Pull direct quotes and concrete observations from each session. Label each with participant ID and session number.

**Step 2 — Cluster themes**: Group observations into 4–8 themes. Each theme must appear in at least 2 participant sessions to be included.

**Step 3 — Write insights**: For each theme, write one insight statement:
> "[User segment] [do/believe/experience] [specific behaviour or mental model] because [underlying reason]."

**Step 4 — Map to research questions**: Every research question from the brief must be addressed. If a question was not answered, state so explicitly.

**Step 5 — Identify opportunities**: For each insight, note one or more design opportunities.

### 6. Save the Synthesis

Save to `research/user-interviews/synthesis.md`:

```
# User Interview Synthesis: {Research Topic}

## Participants
## Methodology
## Key Themes
## Insights (with supporting quotes)
## Unanswered Questions
## Design Opportunities
```

Every insight must be supported by at least 2 participant quotes. Do not include insights supported by only a single participant.
