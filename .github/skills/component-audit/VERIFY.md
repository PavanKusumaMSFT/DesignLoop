---
tool: component-audit
---

# Verification: Component Audit

## Dimensions

```yaml
dimensions:
  diagnostic_accuracy:
    weight: 35
    threshold: 82
    failure_instruction: "Every finding must be grounded in the target code with a line number, exact value or pattern, and a concrete replacement. Remove vague, speculative, or unsupported findings."

  system_coverage:
    weight: 30
    threshold: 80
    failure_instruction: "The audit must cover hardcoded colors, typography, spacing, state tokens, inline styles, SafeTokens, icon sources, shared component reuse, Fluent primitives, Fluent Copilot usage, and basic accessibility. Re-read the target and fill missing categories."

  prioritization:
    weight: 20
    threshold: 78
    failure_instruction: "Findings must be sorted into P0, P1, P2, and P3 with counts in the summary. Reclassify severity so critical theming issues appear first and informational concerns do not block work."

  read_only_integrity:
    weight: 15
    threshold: 100
    failure_instruction: "This skill must not modify target implementation files. If any target code was changed, revert it and write only the audit report."

accept_threshold: 84
```

## What the Verifier Checks

1. Target implementation files were not modified.
2. The report is written to `tasks/{taskId}/prototypes/audit-{component}.md`.
3. The report includes summary counts and P0/P1/P2/P3 sections.
4. Findings include line numbers, evidence, and recommended replacements.
5. Shared-component, Fluent v9, and Fluent Copilot discovery results are reflected.
6. Legitimate exceptions are not incorrectly flagged.
7. The report names what is already correct, not just violations.

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- The composite score and failed dimensions
- Whether any target file was accidentally modified
- The missing categories or evidence needed for a reliable audit
