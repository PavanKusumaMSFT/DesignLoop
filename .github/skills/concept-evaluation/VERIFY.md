---
tool: concept-evaluation
---

# Verification: Concept Evaluation

## Dimensions

```yaml
dimensions:
  scoring-completeness:
    weight: 35
    threshold: 75
    failure_instruction: "Every concept from concepts.md must appear in the scoring
      matrix — do not silently omit concepts. Every row in the matrix must have all
      three dimension scores (Desirability, Feasibility, Viability) and the calculated
      weighted score. Blank cells are not acceptable. If a score cannot be determined
      from available information, assign 3 (neutral) and add a note explaining the
      uncertainty."

  shortlist-rationale:
    weight: 35
    threshold: 72
    failure_instruction: "The shortlist rationale must be 3–5 sentences explaining
      specifically why the selected 2–4 concepts were chosen over higher-scoring
      alternatives. Rationale that only restates the scores ('this was chosen because
      it scored highest') is not acceptable — explain the strategic or user-experience
      reasoning. The shortlist must include at least one concept from a non-conventional
      lens — if all shortlisted concepts are conventional, explain why or add a concept
      from another lens."

  evaluation-notes:
    weight: 30
    threshold: 70
    failure_instruction: "Every concept scoring 3.0 or above must have evaluation notes
      covering: specific strengths against the criteria, the top 1–2 risks if pursued,
      and hybrid potential with other concepts. Evaluation notes that consist only of
      score summaries add no value — write the reasoning behind the scores. Each risk
      must be specific enough that a designer or PM could assess its probability."

accept_threshold: 76
```

## What the Verifier Checks

1. Every concept from concepts.md is in the scoring matrix
2. All three dimension scores present for every concept
3. Weighted score calculated correctly: (D × 0.45) + (F × 0.35) + (V × 0.20)
4. Shortlist has 2–4 concepts
5. Shortlist rationale is 3–5 sentences with strategic reasoning
6. All concepts scoring ≥ 3.0 have evaluation notes

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Concepts missing from the matrix (list by concept ID)
- Matrix rows with blank scores
- Shortlisted concepts all from the same lens
- The best output produced so far
