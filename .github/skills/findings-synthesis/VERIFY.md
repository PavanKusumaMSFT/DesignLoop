---
tool: findings-synthesis
---

# Verification: Findings Synthesis

## Dimensions

```yaml
dimensions:
  multi-source-grounding:
    weight: 40
    threshold: 75
    failure_instruction: "Every theme must be supported by findings from at least 2
      different research sources (e.g., competitive analysis AND user interviews). Single-
      source themes must be flagged as 'low confidence' or removed. Every insight must
      cite specific source labels (e.g., [CA], [UI]) — do not write insights without
      citing which artifact they came from. If only one research source was available,
      state this limitation explicitly in the Gaps section."

  insight-precision:
    weight: 35
    threshold: 72
    failure_instruction: "Each insight must follow the format: '[User segment] [experience
      or believe] [specific behaviour] because [root cause]. This matters because [design
      implication].' Insights that do not name a root cause are incomplete — rewrite them
      to explain why the behaviour occurs, not just that it occurs. Insight statements
      must be specific to this product context — generic truisms like 'users prefer
      simple interfaces' are not acceptable."

  opportunity-ranking:
    weight: 25
    threshold: 70
    failure_instruction: "Opportunity areas must be ranked by impact. Impact is calculated
      as (breadth: how many users affected) × (severity: how much the problem blocks
      their goal). Unranked opportunity lists are not acceptable. Every opportunity must
      map to at least one insight by ID. Opportunities that are not grounded in a specific
      insight must be removed."

accept_threshold: 76
```

## What the Verifier Checks

1. Every theme has 2+ source citations from different research artifacts
2. Every insight follows the required format (user segment + behaviour + root cause + implication)
3. Opportunity areas are ranked with explicit impact rationale
4. Every opportunity cites the insight it derives from
5. Gaps and Unanswered Questions section present (even if empty, must be stated)
6. Raw findings section lists 15+ atomic observations

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Themes with only single-source support (list them)
- Insights missing root cause (list by insight number)
- Unranked or ungrounded opportunities
- The best output produced so far
