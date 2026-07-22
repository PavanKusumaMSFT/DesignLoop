---
tool: requirements-prd
---

# Verification: Requirements PRD

## Dimensions

```yaml
dimensions:
  completeness:
    weight: 35
    threshold: 75
    failure_instruction: "The PRD must include all eight sections: Overview, Problem
      Statement, Success Metrics, Functional Requirements, Non-Functional Requirements,
      Constraints and Assumptions, Out of Scope, and Glossary. Every Must Have functional
      requirement must have at least 2 acceptance criteria in Given/When/Then format.
      Requirements without acceptance criteria cannot be used for engineering or QA.
      Add acceptance criteria before re-submitting."

  measurability:
    weight: 35
    threshold: 72
    failure_instruction: "Every success metric must include a numeric target: task
      completion rate as a percentage, time-on-task in seconds or minutes, error rate
      per session, and satisfaction score (e.g., SUS ≥ 68). Non-functional requirements
      must include thresholds — 'the app should be fast' is not a requirement. Rewrite
      every metric and non-functional requirement to include a specific, measurable
      threshold. Remove any metric that cannot be tested."

  persona-traceability:
    weight: 30
    threshold: 70
    failure_instruction: "Every functional requirement must reference the persona it
      serves (e.g., 'As [PersonaName], I need...'). Requirements that cannot be traced
      to a persona must be justified in the Constraints section or removed. If no personas
      have been defined, this PRD cannot be completed — run the personas tool first."

accept_threshold: 76
```

## What the Verifier Checks

1. All 8 sections present and non-empty
2. Every Must Have requirement has 2+ Given/When/Then acceptance criteria
3. Every success metric has a numeric target
4. Every non-functional requirement has a measurable threshold
5. Every functional requirement references a persona name
6. Out of Scope lists at least 2 explicit exclusions
7. Minimum 8 functional requirements present

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Requirements missing acceptance criteria (list by FR-N)
- Metrics without numeric targets (list them)
- Requirements not tied to a persona (list by FR-N)
- The best output produced so far
