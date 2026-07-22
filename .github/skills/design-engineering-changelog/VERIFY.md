---
tool: design-engineering-changelog
---

# Verification: Design Engineering Changelog

## Dimensions

```yaml
dimensions:
  entry-completeness:
    weight: 40
    threshold: 75
    failure_instruction: "Every changelog entry must include all seven fields: date,
      change type, affected component or screen, What Changed, Why, What It Means for
      Engineering, and What Not to Change. Entries missing the 'What Not to Change'
      field are incomplete — this field prevents engineers from accidentally reverting
      intentional design decisions. Add this field to every entry, even if it states
      'no implementation constraints beyond the spec.'"

  evidence-grounding:
    weight: 35
    threshold: 72
    failure_instruction: "Every 'Why' section must cite a specific artifact: a research
      finding ID, usability test finding (F-N), accessibility audit issue (A-N), or
      PRD requirement (FR-N). 'Why' sections that state only the team's preference or
      a vague goal (e.g., 'to improve UX') are not acceptable — ground every decision
      in evidence. If a decision was made for aesthetic reasons without research backing,
      state this explicitly and note it as a design judgment call."

  engineering-specificity:
    weight: 25
    threshold: 70
    failure_instruction: "The 'What It Means for Engineering' section must contain at
      least 2 specific implementation implications per entry — not a summary of the
      design change. Implications must describe the specific HTML, CSS, JavaScript, or
      ARIA change required. 'Implement the new design' is not an implication. Write
      the specific technical action: 'Add aria-live=\"polite\" to the status message
      container' or 'Apply --color-surface-warning token to the alert background.'"

accept_threshold: 74
```

## What the Verifier Checks

1. Minimum 5 entries present
2. Every entry has all 7 required fields
3. Every 'Why' section cites a specific artifact ID
4. Every 'What It Means for Engineering' has 2+ specific technical implications
5. 'Do Not Regress' section present with 5–10 items
6. Summary table at the top matches all entries

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Entries missing fields (list by date and field name)
- 'Why' sections without artifact citations (list by entry)
- Engineering implications that are too generic (list by entry)
- The best output produced so far
