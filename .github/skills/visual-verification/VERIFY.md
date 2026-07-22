---
tool: visual-verification
---

# Verification: Visual Verification

## Dimensions

```yaml
dimensions:
  workspace-targeting:
    weight: 30
    threshold: 80
    failure_instruction: "Visual verification must target the running workspace:
      Next dev at http://localhost:3000/{taskId} or Storybook at
      http://localhost:6006. Do not use file:// static HTML or self-contained
      demo files. The report must include the server command, verified URL, and
      screenshot output path under tasks/{taskId}/prototypes/screenshots/."

  case-coverage:
    weight: 30
    threshold: 75
    failure_instruction: "Every variant and state in the component spec or
      manifest must have a corresponding verification case in the coverage
      table. Include desktop and mobile viewports. No variant or state may be
      skipped; document manual checks explicitly if automation cannot trigger a
      state."

  failure-specificity:
    weight: 25
    threshold: 75
    failure_instruction: "Every diff failure must include pixel diff count and
      percentage, screenshot or diff path, region description, root cause, and
      the specific fix required. Reports that say only 'visual difference
      detected' without a token, component prop, state, layout, or render-engine
      cause are not actionable."

  severity-classification:
    weight: 15
    threshold: 70
    failure_instruction: "Every failure must be classified as Critical, Major,
      Minor, or Accepted. Critical and Major failures must block sign-off and
      must not be marked Accepted without explicit written justification.
      Anti-aliasing differences may be marked Accepted automatically, but all
      other Accepted failures require a justification statement."

accept_threshold: 76
```

## What the Verifier Checks

1. Verification targets `http://localhost:3000/{taskId}` or `http://localhost:6006`, not `file://`
2. Report records the dev server or Storybook command used
3. Screenshots and diffs are saved under `tasks/{taskId}/prototypes/screenshots/`
4. Report is saved to `tasks/{taskId}/prototypes/visual-verification.md`
5. Every variant and state in the spec or manifest has a coverage table entry
6. Desktop and mobile viewports are covered
7. Every failure entry has pixel diff count, screenshot path, region description, root cause, and specific fix
8. Every failure has a severity classification
9. Summary section lists total cases, pass/fail/accepted breakdown, and sign-off blockers

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Static HTML or `file://` verification target found
- Missing server command, verified URL, or screenshot path
- Variants or states missing from coverage table
- Failure entries without screenshot path, root cause, or fix (list by VV-N)
- Unclassified failures
- The best output produced so far
