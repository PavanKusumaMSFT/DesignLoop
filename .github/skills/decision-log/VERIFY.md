---
tool: decision-log
---

# Verification: Decision Log

## Dimensions

```yaml
dimensions:
  entry-completeness:
    weight: 40
    threshold: 75
    failure_instruction: "Every decision entry must include all six required sections:
      Context, Decision, Rationale, Alternatives Considered (table), Trade-offs Accepted,
      and Reversibility. Entries with missing sections must be completed before re-
      submitting. The Decision field must be a single, unambiguous statement of what
      was chosen — not a description of the deliberation process. The Alternatives table
      must include at least 2 alternatives and a specific reason for rejection for each."

  rationale-evidence:
    weight: 35
    threshold: 72
    failure_instruction: "Every rationale section must cite evidence — a research insight
      ID, a persona goal, a PRD requirement, or a specific engineering constraint. Rationale
      that reads as opinion without grounding (e.g., 'the team felt this was better')
      is not acceptable. Replace with artifact citations (e.g., 'Insight 4 from findings-
      synthesis.md shows users expect...') or documented constraints."

  trade-off-honesty:
    weight: 25
    threshold: 70
    failure_instruction: "The Trade-offs Accepted section must honestly describe what
      is being given up. Empty or trivially positive trade-off sections indicate the
      decision has not been fully examined. Write the actual downside of each decision —
      if there is genuinely no trade-off, explain why, rather than leaving the section
      blank. Irreversible decisions must be marked with the warning symbol and given
      extra scrutiny in the rationale."

accept_threshold: 74
```

## What the Verifier Checks

1. Minimum 3 decision entries present
2. Every entry has all 6 sections (Context, Decision, Rationale, Alternatives, Trade-offs, Reversibility)
3. Every Decision field is a single, clear statement
4. Every Alternatives table has 2+ alternatives with specific rejection reasons
5. Every Rationale cites an artifact ID or documented constraint
6. Summary table at the top matches all entries

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Entries with missing sections (list by decision number and section)
- Rationale without citations (list by decision number)
- Trade-offs sections that are empty or evasive
- The best output produced so far
