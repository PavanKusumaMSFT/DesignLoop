---
name: test-execution
description: "Execute the usability test plan and document findings per participant and per task. Synthesise patterns, success rates, and severity-ranked recommendations. Use after usability-test-plan is approved and sessions have been conducted."
argument-hint: "Study name and participant count (e.g., 'DesAIgns onboarding study — 6 participants')"
---

# Test Execution

## When to Use
- After usability-test-plan is approved
- After participant sessions have been conducted or transcripts/notes are available
- When synthesis of session findings is needed before design iteration

## Procedure

### 1. Read Source Artifacts

Load:
- `tests/usability/usability-test-plan.md` (or `strategy/usability-test-plan.md`) — tasks, metrics, success criteria
- Session notes or transcripts (provided by the researcher or sourced from the task context)

### 2. Create the Session Log

For each participant session, create a structured log:

```
## Participant {P-N}

**Screening Profile**: {Role, experience level, product familiarity}
**Session Date**: {Date}
**Facilitator**: {Name or "Self-facilitated"}
**Consent Obtained**: Yes

### Task 1: {Task title}
- **Completion**: Success / Partial / Failure
- **Time on Task**: {X minutes Y seconds}
- **Errors**: {N} (describe each)
- **Observations**: Direct behaviours observed (not interpretations)
- **Quotes**: Direct quotes that illuminate the experience
- **Confusion Points**: Moments of hesitation or incorrect action

### Task 2: ...

### Post-Session
- SUS score: {N}/100
- Key feedback from debrief: {2-4 bullet points}
```

### 3. Calculate Task Metrics

For each task across all participants:

| Task | Completion Rate | Avg Time (s) | Error Rate | Participants Struggled |
|------|----------------|-------------|------------|------------------------|
| T-1 | 5/6 = 83% | 142s | 0.3/participant | P-03, P-05 |

Compare each metric against the success thresholds from the test plan. Mark as Pass/Fail.

### 4. Synthesise Themes

After reviewing all sessions:
1. List every friction point and confusion moment across all participants
2. Group related moments into themes (aim for 4–8 themes)
3. A theme must be observed in 2+ participant sessions to be included
4. For each theme: name it, list supporting evidence (participant IDs and quotes)

### 5. Write Findings

For each theme, write a finding:

```
## Finding [F-N]: {Short title}

**Severity**: Critical / Major / Minor
- Critical: Majority of participants could not complete the task
- Major: Multiple participants struggled significantly or completed with errors
- Minor: Individual difficulty, workaround found

**Frequency**: {N}/{total} participants affected

**Evidence**: List 2+ participant observations or quotes

**Root Cause**: What design decision or omission caused this

**Recommendation**: Specific design change to address the finding
```

### 6. Write the Report Summary

```
## Executive Summary
## Participants
## Task Performance Summary (table)
## Key Themes
## Findings (ordered by severity)
## Recommendations (ordered by impact)
## What Worked Well
## Next Steps
```

"What Worked Well" must be present — single out 2–4 design patterns that participants praised or used successfully.

### 7. Save the Report

Save to `tests/usability/test-findings.md`.
