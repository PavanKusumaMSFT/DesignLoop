---
tool: implementation-guide
---

# Verification: Implementation Guide

## Dimensions

```yaml
dimensions:
  setup-executability:
    weight: 35
    threshold: 78
    failure_instruction: "Every setup step must be a copy-pasteable command or code
      block that works without modification. No pseudocode, no placeholder values like
      'your-package-name', no steps that say 'configure as needed.' Every code block
      must be syntactically valid. Every command must include the exact package name,
      flag, and syntax. A guide with one non-working step fails this dimension — fix
      every step before re-submitting."

  component-documentation:
    weight: 35
    threshold: 75
    failure_instruction: "For every component in scope, the guide must include: a Basic
      Usage code example, at minimum 3 common usage patterns with complete code, a props
      reference table with TypeScript types, and at least 3 do/don't pairs. Props tables
      that use 'any' types or omit default values are incomplete. Do/don't pairs that
      explain only the 'Don't' without a clear 'Do' alternative are not useful."

  troubleshooting-coverage:
    weight: 30
    threshold: 70
    failure_instruction: "The troubleshooting section must contain at least 5 specific
      problems with structured entries (Problem, Symptom, Cause, Fix). Problems that
      are generic ('component not rendering') are not useful — each problem must describe
      a specific symptom a developer would encounter, its specific cause, and the exact
      fix. Review the demo pages and component specs for the most common failure modes
      and include those."

accept_threshold: 76
```

## What the Verifier Checks

1. Prerequisites section lists Node version, package manager, and peer dependency versions
2. Every setup step is a working command or code block (no pseudocode)
3. Every component has: Basic Usage, 3+ patterns, props table, 3+ do/don't pairs
4. Props tables use TypeScript types (not 'any') and include default values
5. Troubleshooting section has 5+ structured entries
6. Testing guide section present

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- Setup steps with placeholder values (list by step number)
- Components missing required sections (list by component)
- Fewer than 5 troubleshooting entries (current count)
- The best output produced so far
