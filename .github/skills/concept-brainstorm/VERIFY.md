---
tool: concept-brainstorm
---

# Verification: Concept Brainstorm

## Dimensions

```yaml
dimensions:
  quantity-and-coverage:
    weight: 35
    threshold: 72
    failure_instruction: "The brainstorm must produce a minimum of 25 concept cards
      total across all HMW questions. Every selected HMW question must have a minimum
      of 5 concepts. If any HMW question has fewer than 5 concepts, generate additional
      concepts before re-submitting. Every concept card must include all six fields:
      title, HMW source, lens, core idea, key mechanism, and open questions."

  lens-diversity:
    weight: 35
    threshold: 72
    failure_instruction: "Across the entire concept set, all five lenses (Conventional,
      Analogy, Inversion, Constraint Removal, AI-augmented) must be represented. A
      brainstorm that consists only of conventional and AI-augmented concepts is not
      sufficiently divergent. Add at least one concept for any missing lens before
      re-submitting. The Analogy lens must name a specific domain being borrowed from —
      'like how [industry] solves [problem]' — not a generic analogy."

  no-evaluation:
    weight: 30
    threshold: 75
    failure_instruction: "This document must not evaluate, rank, or kill any concept.
      Remove any language that scores or dismisses concepts (e.g., 'this is unlikely
      to work', 'best option', 'impractical'). Remove any ranking tables or scores.
      All evaluation happens in concept-evaluation.md, not here. Replace any evaluative
      language with neutral descriptions of what the concept does and what is unknown."

accept_threshold: 74
```

## What the Verifier Checks

1. Minimum 25 concept cards total
2. Minimum 5 concepts per HMW question
3. All 5 lenses present in the total concept set
4. Every concept card has all 6 required fields
5. No ranking, scoring, or evaluative language present
6. Starred concepts marked but not ranked against unstarred concepts

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- HMW questions with fewer than 5 concepts (list by HMW-N)
- Missing lenses (list which are absent)
- Concepts with missing fields (list by concept number)
- The best output produced so far
