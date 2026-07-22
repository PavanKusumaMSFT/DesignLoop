---
stage: deliver
label: Deliver
coordinator-agent: handoff
---

# Deliver Stage — Coordinator Playbook

## Purpose
Package everything a development team needs to implement without asking questions.
Every component documented, every design decision logged, every checklist item
checked before handoff is declared complete.

## Tools in This Stage

| Tool ID | Required | Depends On | Can Parallel |
|---|---|---|---|
| `implementation-guide` | yes | All prior stage artifacts | no (runs first) |
| `component-spec` | yes | Prototype artifacts | yes (parallel with impl-guide) |
| `design-engineering-changelog` | yes | Design + Test artifacts | no |
| `handoff-checklist` | yes | All above | no (runs last) |

## Selection Logic

Before running any tool, check the `handoff/` directory:

1. If `handoff/implementation-guide.md` covers all components → skip `implementation-guide`
2. If `handoff/components/{Name}.md` exists for all components → skip `component-spec`
3. If `handoff/design-engineering-changelog.md` exists → skip changelog
4. `handoff-checklist` always runs last — its job is to verify all other tools completed

`component-spec` in this stage focuses on developer-facing API documentation,
distinct from the design-phase `component-spec` which is design-focused.

## Execution Order

```
implementation-guide ──────┐
component-spec (all)       ├── (parallel)
                            ↓
           design-engineering-changelog
                            ↓
                  handoff-checklist
```

## Completion Criteria

Stage is complete when `handoff-checklist` passes verification:
0 unchecked items in `handoff/handoff-checklist.md`.

This is a binary gate — either all items are checked or the stage is not done.

## Artifacts Expected

```
handoff/
  implementation-guide.md
  design-engineering-changelog.md
  handoff-checklist.md
  components/
    {ComponentName}.md
```

## Definition of Done

A developer reading the handoff artifacts should be able to implement every
component without asking any questions. If that is not true, the stage is not done.
