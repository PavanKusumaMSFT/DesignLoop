---
tool: tenets-traps-evaluation
---

# Verification: Tenets & Traps Evaluation

## Dimensions

```yaml
dimensions:
  framework-accuracy:
    weight: 35
    threshold: 80
    failure_instruction: "Every finding must be mapped to an official Tenet and Trap
      from reference.md — use the exact codes (e.g., Trap '1.2 Effectively Invisible
      Element' under Tenet 'Understandable'). Do not invent tenet names or trap codes.
      Do not map a finding to a tenet if it does not genuinely violate that tenet.
      Re-read reference.md and re-map any finding that uses non-standard codes."

  evidence-quality:
    weight: 35
    threshold: 75
    failure_instruction: "Every finding must cite concrete, specific evidence: where
      exactly it was observed (screen name, component, interaction step), what the
      user would experience, and why it is a problem. Vague evidence like 'the button
      is hard to see' is not acceptable — write 'the Deploy button on the confirmation
      screen has a contrast ratio of 2.1:1 against the background, below the 4.5:1
      WCAG AA minimum, causing it to be missed by users with low vision.'"

  coverage:
    weight: 20
    threshold: 70
    failure_instruction: "The evaluation must walk all major user tasks (happy path,
      error paths, keyboard-only navigation). If personas exist in strategy/personas.md,
      tasks must reflect those personas' goals. Do not evaluate only the happy path —
      error states, empty states, and edge cases must be included."

  actionability:
    weight: 10
    threshold: 68
    failure_instruction: "Each finding must include a specific remediation suggestion —
      not just a description of the problem. The suggestion must be implementable by
      a designer or developer without further clarification. Quick Wins must be
      genuinely low-effort (under 1 hour to fix)."

accept_threshold: 78
```

## What the Verifier Checks

1. Every finding ID maps to a valid Tenet code and Trap code from reference.md
2. No invented tenet names or trap codes
3. Every finding has a specific location (screen/component) and concrete evidence
4. Both happy path and at least one error path evaluated
5. Report has all 8 required sections (Executive Summary through Fix & Re-evaluate Loop)
6. Round Tracker table is present
7. Each Quick Win is genuinely low-effort and references a finding ID

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Findings with invalid tenet/trap codes (list by ID)
- Findings with vague evidence (list by ID)
- Missing report sections
- The best output produced so far
