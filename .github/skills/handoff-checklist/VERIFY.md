---
tool: handoff-checklist
---

# Verification: Handoff Checklist

## Dimensions

```yaml
dimensions:
  checklist-completeness:
    weight: 40
    threshold: 78
    failure_instruction: "The checklist must contain all six sections: Artifacts Complete,
      Accessibility, Requirements Coverage, Component Readiness, Engineering Enablement,
      and Sign-Off. Every item within each section must be present — do not remove items
      because they seem inapplicable. If an item genuinely does not apply, mark it with
      'N/A' and a one-line justification. A checklist with missing items or missing
      sections is not a valid handoff gate."

  blocker-documentation:
    weight: 35
    threshold: 75
    failure_instruction: "Every unchecked item must be documented as a blocker with:
      what specifically is missing, who is responsible, estimated completion time, and
      whether it is a hard blocker or can be resolved in parallel with engineering.
      A checklist that lists unchecked items without blocker documentation provides
      no actionable path forward. Document every unchecked item before re-submitting."

  artifact-verification:
    weight: 25
    threshold: 72
    failure_instruction: "Before generating the checklist, verify each artifact actually
      exists and is non-empty. Do not mark 'implementation-guide.md exists' as checked
      if the file does not exist in handoff/. Do not mark accessibility checks as passed
      if the audit report does not exist. If an artifact is missing, mark the item
      unchecked and document the blocker. The checklist must reflect the actual state
      of artifacts — not the expected state."

accept_threshold: 78
```

## What the Verifier Checks

1. All 6 sections present
2. Every item is explicitly checked (✅) or unchecked (❌) — no blank rows
3. Every N/A item has a one-line justification
4. Every unchecked item has a blocker documentation block
5. Sign-off section has named roles (not generic "TBD")
6. Project Summary section present at the end

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Missing checklist sections (list which)
- Items that are checked but the artifact does not exist (list by item)
- Unchecked items without blocker documentation (list by item)
- The best output produced so far
