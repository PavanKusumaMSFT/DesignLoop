---
tool: research-brief
---

# Verification: Research Brief

## Dimensions

```yaml
dimensions:
  completeness:
    weight: 35
    threshold: 75
    failure_instruction: "The brief must contain all eight sections: Background, Research
      Goals, Research Questions, Methods, Participant Profile, Timeline, Success Criteria,
      and Out of Scope. Do not omit any section. The Out of Scope section must name at
      least 2 explicit exclusions — a blank section is not acceptable. Return to SKILL.md
      Section 7 and fill every missing section before re-submitting."

  specificity:
    weight: 35
    threshold: 72
    failure_instruction: "Every goal must name the specific design decision it will
      unlock — not general learning objectives. Every research question must be open-ended
      and product-specific. Replace any generic questions like 'What do users want?'
      with questions tied to the actual product context and the decisions listed in the
      Background section. Generic placeholder text is not acceptable."

  method-justification:
    weight: 20
    threshold: 70
    failure_instruction: "Every selected research method must include a justification
      explaining why it is appropriate for the specific research questions listed. A
      method choice without a rationale (e.g., 'we will do interviews') is not acceptable.
      Write one sentence per method explaining which research question it addresses and
      why this method is better suited than the alternatives."

  measurable-success:
    weight: 10
    threshold: 68
    failure_instruction: "The Success Criteria section must define what 'done' looks
      like in concrete terms: specific insights needed, minimum confidence thresholds
      (e.g., 'pattern confirmed across 4+ participants'), and the decisions that will
      be unblocked. Replace any success criteria that are vague (e.g., 'we will learn
      about users') with measurable outcomes."

accept_threshold: 75
```

## What the Verifier Checks

1. All 8 sections present and non-empty
2. Out of Scope lists at least 2 explicit exclusions
3. Every research goal names a specific design decision it will inform
4. Every research question is open-ended and product-specific
5. Each research method has a justification sentence
6. Success criteria include a confidence threshold or measurable outcome

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Which sections are missing or empty
- Which research questions are too generic (list them)
- Which methods lack justification
- The best output produced so far
