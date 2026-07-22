---
tool: test-execution
---

# Verification: Test Execution

## Dimensions

```yaml
dimensions:
  participant-documentation:
    weight: 30
    threshold: 72
    failure_instruction: "Every participant session must be documented with a structured
      log including: screening profile, completion status per task, time on task,
      error count, direct observations (not interpretations), direct quotes, and SUS
      score. Sessions documented with only a summary paragraph are not acceptable —
      the structured log format is required so findings can be audited against raw
      session data."

  metric-reporting:
    weight: 35
    threshold: 75
    failure_instruction: "For every task, the report must calculate and display: completion
      rate as a percentage (n/total), average time on task in seconds, error rate per
      participant, and which participants struggled. Every metric must be compared against
      the success threshold from the test plan with an explicit Pass/Fail label. Metrics
      reported without comparison to the test plan thresholds cannot determine whether
      the design met its goals."

  finding-grounding:
    weight: 35
    threshold: 75
    failure_instruction: "Every finding must be supported by observations from at least
      2 participant sessions. Single-participant findings must be marked as 'emerging
      signal — not validated' rather than elevated to a finding. Every finding must
      include a specific root cause (the design decision or omission that caused the
      issue) and a specific recommendation (the design change needed). Recommendations
      that say only 'this needs more work' are not actionable."

accept_threshold: 76
```

## What the Verifier Checks

1. Every participant session has a structured log with all required fields
2. Task metrics table present with completion rate, time, error rate per task
3. Every metric compared against test plan thresholds with Pass/Fail label
4. Every finding supported by 2+ participant sessions
5. Every finding has a root cause and a specific recommendation
6. "What Worked Well" section present with 2–4 positive findings

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Sessions missing structured log format (list by participant ID)
- Metrics without test plan comparison (list by task)
- Findings with single-participant support (list by F-N)
- The best output produced so far
