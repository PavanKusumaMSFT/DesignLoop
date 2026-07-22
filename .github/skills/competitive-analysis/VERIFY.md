---
tool: competitive-analysis
---

# Verification: Competitive Analysis

## Dimensions

```yaml
dimensions:
  specificity:
    weight: 40
    threshold: 70
    failure_instruction: "Every competitor, feature, and insight must be specific to
      the actual product category and task context. Remove any section that could apply
      to a different industry or product. Name real competitors, real pricing tiers,
      real feature differences — not placeholders."

  evidence:
    weight: 35
    threshold: 68
    failure_instruction: "Every claim about a competitor (pricing, feature presence,
      UX approach) must cite a source, observed behaviour, or specific data point.
      Remove all assertions that are not backed by something found during research.
      If a fact cannot be verified, say so explicitly rather than guessing."

  coverage:
    weight: 25
    threshold: 72
    failure_instruction: "The analysis must include 4–8 competitors (at least 2 direct,
      1 indirect, 1 aspirational reference). The feature matrix must be fully scored.
      Market gaps and differentiation opportunities must be explicitly called out —
      not implied."

accept_threshold: 78
```

## What the Verifier Checks

1. Competitor count: 4–8 named, real products
2. Feature matrix: all rows scored, no blank cells
3. Every strength/weakness claim has a source or observed evidence
4. Market gaps section exists and is specific to this product context
5. Output references the actual task description — not a generic analysis template

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- The composite score and which dimensions failed
- The best output produced so far
- Specific gaps the user can fill in manually (e.g., "pricing data for Competitor X was unavailable")
