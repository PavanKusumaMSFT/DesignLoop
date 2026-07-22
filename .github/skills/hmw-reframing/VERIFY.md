---
tool: hmw-reframing
---

# Verification: HMW Reframing

## Dimensions

```yaml
dimensions:
  traceability:
    weight: 35
    threshold: 75
    failure_instruction: "Every HMW question in the final selected list must be tagged
      with its source problem statement ID (e.g., 'Source: PS-2'). HMW questions
      without a problem statement anchor must be removed. Every priority problem statement
      must have at least one HMW question in the selected list — do not leave a priority
      problem statement without a corresponding ideation prompt."

  openness:
    weight: 40
    threshold: 75
    failure_instruction: "Every HMW question must be genuinely open-ended: 5 or more
      meaningfully different solution concepts must be possible as answers. Questions
      that imply a specific solution (e.g., 'How might we add a wizard to the setup
      flow?') are too prescriptive — rewrite them to remove the solution. Questions
      that are too broad to be actionable (e.g., 'How might we improve the product?')
      must be narrowed to a specific user need or context. Re-read each question and
      test: does it exclude any reasonable solution direction?"

  diversity:
    weight: 25
    threshold: 68
    failure_instruction: "The selected HMW questions must represent at least 3 different
      reframing angles: at minimum one that removes the barrier, one that changes the
      context, and one that reframes the goal. A list of questions that all tackle the
      same aspect of the problem from the same angle does not produce diverse ideation.
      Add at least one question from each of the three angles before re-submitting."

accept_threshold: 74
```

## What the Verifier Checks

1. Every selected HMW question has a source problem statement tag
2. Every priority problem statement has at least one HMW question
3. No HMW question implies a specific solution
4. At least 3 reframing angles represented in the selected list
5. Selected list has 5–12 questions (not too narrow, not overwhelming)
6. Ideation Constraints section present

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Questions without source tags (list them)
- Questions that are too prescriptive (list with reframe suggestion)
- Priority problem statements without any HMW question
- The best output produced so far
