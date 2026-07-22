---
name: concept-brainstorm
description: "Generate a wide, divergent set of solution concepts for each HMW question — ranging from conventional to speculative. Use after HMW reframing to create the raw material for concept evaluation."
argument-hint: "Product or feature name (e.g., 'DesAIgns design operations platform')"
---

# Concept Brainstorm

## When to Use
- After HMW questions are selected and finalized
- Before concept evaluation — brainstorm before judging
- When the team needs raw ideation material for a design sprint

## Procedure

### 1. Read HMW Questions

Load `ideation/hmw-questions.md`. Identify:
- The selected HMW questions for brainstorm
- The ideation constraints (what is off-limits)
- The source problem statements for context

### 2. Generate Concepts (Divergent Phase)

For each HMW question, generate a minimum of 5 concepts using these lenses:

**Lens A — Conventional**: The expected solution most designers would jump to first

**Lens B — Analogy**: A solution borrowed from a different domain (e.g., how does aviation, healthcare, or gaming solve an analogous problem?)

**Lens C — Inversion**: What if you did the opposite of the conventional approach?

**Lens D — Constraint removal**: What would the solution look like if you removed the most limiting constraint?

**Lens E — AI-augmented**: How could an AI or algorithmic approach address the need?

Do not evaluate concepts during this phase. Capture every idea, even ones that seem impractical.

### 3. Write Concept Cards

For each concept, write a concept card:

```
### Concept [N]: {One-line title}
**HMW Source**: HMW-[N]
**Lens**: [A/B/C/D/E]
**Core Idea**: 2–3 sentence description of what the concept does and how
**Key Mechanism**: The specific interaction, process, or technology that makes it work
**Rough Analogy**: A product or system this is similar to (if applicable)
**Open Questions**: 1–2 unknowns that would need to be resolved to pursue this
```

### 4. Quantity Over Quality

Aim for a total of 25–40 concepts across all HMW questions before stopping. Set no constraints on feasibility during generation — that is for the evaluation phase.

Mark any concept that the team immediately reacts to positively with a ★ (but do not exclude others).

### 5. Group by HMW Question

After generating all concepts, organise them by the HMW question they address. If a concept addresses multiple HMW questions, list it under the primary one and cross-reference.

### 6. Save the Document

Save to `ideation/concepts.md`:

```
# Concept Brainstorm: {Product/Feature}

## HMW Questions Reference
## Concepts by HMW Question
### HMW-1: {Question text}
#### Concept 1: {Title}
...
## Cross-Cutting Concepts
## Starred Concepts (Team Resonance)
```

Do not evaluate, rank, or kill any concept in this document. That is the concept-evaluation tool's job.
