---
tool: problem-statements
---

# Verification: Problem Statements

## Dimensions

```yaml
dimensions:
  research-grounding:
    weight: 40
    threshold: 75
    failure_instruction: "Every problem statement must cite a specific insight ID from
      findings-synthesis.md (e.g., 'Insight 3'). Problem statements without a citation
      must be removed or rewritten with a valid citation. Do not write problem statements
      based on assumed user needs — every 'because' clause must trace to a validated
      research finding. If a problem statement cannot be grounded in existing research,
      flag it as 'assumption — requires validation.'"

  structural-correctness:
    weight: 35
    threshold: 72
    failure_instruction: "Every problem statement must follow the exact format: '[Specific
      user segment] needs a way to [functional goal] because [insight-backed reason],
      but currently [specific barrier].' Each clause is required — statements missing
      the 'but currently' clause are incomplete. The 'need' must describe a functional
      goal (what the user is trying to accomplish), not a feature request. Replace any
      feature-as-need statements (e.g., 'needs a dashboard') with goal statements
      (e.g., 'needs to monitor project status at a glance')."

  prioritisation:
    weight: 25
    threshold: 70
    failure_instruction: "All problem statements must be scored on user impact (1–5)
      and strategic value (1–5), and ranked by combined score. The top 3 must be
      explicitly labelled as Priority. An unranked list is not acceptable. If fewer
      than 3 statements are written, return to the findings synthesis and identify
      additional opportunity areas."

accept_threshold: 76
```

## What the Verifier Checks

1. Every statement follows the 4-clause format exactly
2. Every statement cites a specific insight ID
3. The "need" is functional (not a feature request)
4. All statements are scored and ranked
5. Top 3 are labelled Priority
6. HMW preview questions are present for each statement

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Statements missing citations (list by PS-N)
- Statements with feature-as-need (list by PS-N with suggested reframe)
- Missing scoring or ranking
- The best output produced so far
