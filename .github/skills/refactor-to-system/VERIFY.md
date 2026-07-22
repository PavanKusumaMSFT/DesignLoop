---
tool: refactor-to-system
---

# Verification: Refactor to System

## Dimensions

```yaml
dimensions:
  behavior_preservation:
    weight: 30
    threshold: 85
    failure_instruction: "Refactoring must preserve props, state, data flow, accessibility behavior, and rendered intent. Revert or revise any change that alters functionality without explicit need."

  system_compliance:
    weight: 35
    threshold: 88
    failure_instruction: "Target files must use makeStyles, SafeTokens, Fluent tokens/components, approved icon sources, and Fluent Copilot for agent UI. Remove Tailwind, CSS Modules, unsupported hardcoded colors, inline SVG, raw text elements, and non-dynamic inline styles."

  reuse_quality:
    weight: 20
    threshold: 78
    failure_instruction: "Shared components and Fluent primitives must be reused where they match. Re-check component-map.json, components/shared, Fluent v9 exports, and Fluent Copilot exports, then replace duplicate patterns."

  scope_control:
    weight: 15
    threshold: 80
    failure_instruction: "Changes must stay limited to the requested target and tightly coupled imports. Undo unrelated rewrites, dependency changes, or behavior changes."

accept_threshold: 84
```

## What the Verifier Checks

1. The requested files were refactored in place without broad unrelated changes.
2. Behavior, public API, and user-visible functionality are preserved.
3. SafeTokens pattern is present where tokens are used.
4. Styling is tokenized through `makeStyles`.
5. Shared components and Fluent primitives replace duplicate custom visual wrappers.
6. Agent/chat UI uses Fluent Copilot components where applicable.
7. No new dependencies were introduced.

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- The composite score and failed dimensions
- The files or violations that remain
- Any validation command that failed and the smallest next step needed
