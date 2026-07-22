---
tool: usability-test-plan
---

# Verification: Usability Test Plan

## Dimensions

```yaml
dimensions:
  task-specificity:
    weight: 40
    threshold: 75
    failure_instruction: "Every test task and scenario must be specific to this product
      and feature — not a generic usability task template. The scenario context must
      name the actual product, describe a realistic user situation, and give the
      participant enough context to feel real. Tasks like 'Try to complete a task'
      or 'Find the settings' are not acceptable. Rewrite every task so it reads as
      a natural scenario a real user of this product would face."

  completeness:
    weight: 35
    threshold: 72
    failure_instruction: "The test plan must include all required sections: research
      questions, success metrics, participant profile with screening criteria, session
      structure with timing, at least 4 task scenarios, a moderator script with intro
      and debrief, and an observation sheet template. Do not omit any section —
      a plan without a moderator script or observation sheet cannot be executed."

  measurability:
    weight: 25
    threshold: 70
    failure_instruction: "Every success metric must be quantifiable with a defined
      target: task completion rate (e.g., ≥ 80%), time on task (e.g., ≤ 3 minutes),
      error rate (e.g., ≤ 1 per task), and satisfaction score (e.g., SUS ≥ 68).
      Replace any qualitative-only metrics with measurable equivalents. 'Users should
      find it easy' is not a metric — 'SUS score ≥ 68' is."

accept_threshold: 78
```

## What the Verifier Checks

1. All required sections present (research questions, metrics, participants, tasks, script, observation sheet)
2. Minimum 4 task scenarios, each with scenario context + task instruction + follow-up questions
3. Every task scenario names the actual product and realistic user context
4. Success metrics include numeric targets (completion rate %, time, error rate, SUS)
5. Participant screening criteria are specific (role, experience level, product familiarity)
6. Moderator script includes intro, task delivery instructions, and debrief questions

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Missing sections (list them)
- Tasks that are too generic (list by task number)
- Metrics that lack numeric targets (list them)
- The best output produced so far
