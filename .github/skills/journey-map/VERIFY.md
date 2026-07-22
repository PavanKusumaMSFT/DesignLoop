---
tool: journey-map
---

# Verification: Journey Map

## Dimensions

```yaml
dimensions:
  coverage:
    weight: 35
    threshold: 72
    failure_instruction: "The journey must include at least 4 stages and must span the
      full experience: at least one stage before the user touches the product (context/
      trigger stage) and at least one stage after the primary task (follow-up or reflection).
      A journey map that covers only the in-product flow is incomplete. Each stage must
      document all five row dimensions: Actions, Thoughts, Emotions, Pain Points, and
      Opportunities."

  research-grounding:
    weight: 35
    threshold: 75
    failure_instruction: "Every pain point must cite a research source — a theme ID
      from findings-synthesis.md, a participant quote, or a competitive analysis
      observation. Pain points invented without evidence must be removed. Emotion
      ratings must be justified by observed behaviour or direct quotes — do not assign
      emotional states based on assumption. If emotion data was not collected in
      research, mark it as 'inferred' and explain the basis."

  opportunity-quality:
    weight: 30
    threshold: 70
    failure_instruction: "Every pain point must have a corresponding opportunity annotation
      (OPP-N). Opportunities must be phrased as design directions, not restatements of
      the problem. 'Users struggle with setup' is a problem, not an opportunity. Rewrite
      as: 'Reduce setup friction by surfacing defaults at the point of first use.' The
      Top Opportunities section must list exactly the top 5 opportunities with their
      stage reference."

accept_threshold: 74
```

## What the Verifier Checks

1. Minimum 4 stages present
2. At least one pre-product stage and one post-task stage included
3. Every stage has all 5 row dimensions filled
4. Every pain point has a research source citation
5. Every pain point has a corresponding OPP-N annotation
6. 1–3 Moments of Truth identified and explained
7. Top 5 opportunities listed in summary section

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Stages missing row dimensions (list by stage and missing row)
- Pain points without source citations (list them)
- Pain points without opportunity annotations
- The best output produced so far
