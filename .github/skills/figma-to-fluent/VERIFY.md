---
tool: figma-to-fluent
---

# Verification: Figma to Fluent

## Dimensions

```yaml
dimensions:
  figma_fidelity:
    weight: 30
    threshold: 82
    failure_instruction: "The implementation must reflect the supplied Figma/design source: hierarchy, layout, typography, spacing, states, and icon intent. Re-read the design source and correct mismatches before finishing."

  fluent_mapping:
    weight: 30
    threshold: 85
    failure_instruction: "Every Figma element must be mapped to Fluent v9, Fluent Copilot, a shared component, or a justified layout container. Remove Tailwind/raw CSS copied from Figma MCP and replace unsupported custom UI with Fluent primitives."

  token_and_icon_compliance:
    weight: 25
    threshold: 85
    failure_instruction: "All styling must use makeStyles, SafeTokens, Fluent tokens, and approved icon source tiers. Replace unsupported hardcoded colors, inline SVG, CSS Modules, raw text elements, emoji, and non-dynamic inline styles."

  workspace_output:
    weight: 15
    threshold: 78
    failure_instruction: "Generated code must be placed under prototype-workspace/components/projects/{taskId}/ and prototype-workspace/app/{taskId}/page.tsx with reusable component boundaries and typed props."

accept_threshold: 83
```

## What the Verifier Checks

1. The Figma/design source was read and translated rather than pasted verbatim.
2. Shared-component and library discovery occurred before new code was written.
3. The implementation uses correct Fluent v9 and Fluent Copilot components.
4. Every generated TSX file includes the SafeTokens pattern and tokenized `makeStyles` styling.
5. Icons follow the three-tier source rules.
6. Output paths match the DesAIgns prototype workspace contract.
7. Accessibility basics are present: labels, alt text, keyboard-friendly controls, and focus states.

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- The composite score and failed dimensions
- The design regions that could not be mapped confidently
- The missing Figma details, asset paths, or component decisions needed to proceed
