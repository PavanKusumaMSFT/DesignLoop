---
tool: user-interviews
---

# Verification: User Interviews

## Dimensions

```yaml
dimensions:
  guide-quality:
    weight: 35
    threshold: 75
    failure_instruction: "The discussion guide must contain all five sections (warm-up,
      current behaviour, pain points, optional concept, debrief) with timing for each.
      Every question must be open-ended — no yes/no questions in the core section.
      Every question must include a moderator probe note. Remove any leading questions
      that suggest an answer. Rewrite any question that contains the product name in
      a way that steers the participant toward the product."

  synthesis-evidence:
    weight: 40
    threshold: 75
    failure_instruction: "Every insight in the synthesis must be supported by direct
      quotes or observations from at least 2 different participants. Insights supported
      by a single participant must be removed or downgraded to 'emerging signal.' Every
      research question from the brief must be addressed in the synthesis — mark
      unanswered questions explicitly rather than omitting them. Vague insights like
      'users found it confusing' are not acceptable — specify what was confusing and why."

  research-alignment:
    weight: 25
    threshold: 70
    failure_instruction: "The guide questions must directly address the research questions
      listed in research-brief.md. If a research question has no corresponding guide
      question, add one before re-submitting. The synthesis must map every theme to at
      least one research question — themes that do not connect to any research question
      should be flagged as 'out of scope' rather than included as findings."

accept_threshold: 76
```

## What the Verifier Checks

1. Discussion guide has all 5 sections with timing
2. No yes/no questions in the core question sections
3. Every guide question has a moderator probe note
4. Every synthesis insight is supported by 2+ participant quotes
5. Every research question from the brief is addressed in synthesis
6. Design opportunities section exists with at least one opportunity per insight

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Questions that are leading or closed (list them by section and question number)
- Insights with only single-participant support (list by insight number)
- Research questions not addressed in synthesis (list them)
- The best output produced so far
