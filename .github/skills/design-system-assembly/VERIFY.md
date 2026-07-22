---
tool: design-system-assembly
---

# Verification: Design System Assembly

## Dimensions

```yaml
dimensions:
  fluent-kit-indexing:
    weight: 35
    threshold: 75
    failure_instruction: "The design-system.md index must reference the vendored Fluent
      kit: prototype-workspace/component-map.json, prototype-workspace/components/shared/,
      prototype-workspace/AGENTS.md, and the task's Fluent theme/token documents. It must
      summarize Fluent token families instead of generic CSS custom properties."

  component-inventory:
    weight: 35
    threshold: 72
    failure_instruction: "Every component spec in tasks/{taskId}/designs/components/ and
      every mapped wireframe pattern must appear in the inventory table with status,
      source path, Fluent primitives, and usage. Components marked New Needed must include
      reuse evidence showing no component-map, shared component, or Fluent primitive match."

  usage-guidance:
    weight: 30
    threshold: 70
    failure_instruction: "The do/don't patterns section must contain a minimum of 10
      paired examples grounded in the Fluent rules: shared components first, Fluent
      primitives before custom wrappers, makeStyles + tokens, no CSS Modules, no Tailwind,
      no inline styles, no raw HTML text elements, no inline SVG, and brand colors only
      through theme customization."

accept_threshold: 74
```

## What the Verifier Checks

1. `tasks/{taskId}/designs/design-system.md` exists
2. Index references `prototype-workspace/component-map.json`, `components/shared/`, and `AGENTS.md`
3. Fluent token families are documented; generic `--{category}-{variant}-{scale}` tokens are not
4. Every component spec appears in the inventory table
5. Wireframe pattern mappings are represented or documented as gaps
6. Minimum 10 Fluent do/don't paired examples present
7. Contribution guide includes reuse evidence and component-map update requirements

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Missing Fluent kit references
- Components or wireframe patterns missing from inventory
- Invalid generic token guidance
- Do/don't section with fewer than 10 pairs (current count)
- The best output produced so far
