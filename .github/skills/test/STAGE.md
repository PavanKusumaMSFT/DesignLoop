---
stage: test
label: Test
coordinator-agent: tester
---

# Test Stage — Coordinator Playbook

## Purpose
Validate that the prototypes are usable, accessible, and ready for handoff.
No High or Critical findings. WCAG Level A clear. A test plan ready to execute
with real participants.

## Tools in This Stage

| Tool ID | Required | Depends On | Can Parallel |
|---|---|---|---|
| `tenets-traps-evaluation` | yes | Prototype artifacts | yes |
| `accessibility-audit` | yes | Prototype artifacts | yes |
| `usability-test-plan` | no | Define + Prototype artifacts | yes |
| `test-execution` | no | `usability-test-plan` | no (runs last) |

## Selection Logic

Before running any tool, check the `tests/` directory:

1. If `tests/usability/tenets-traps-evaluation-r*.md` exists with 0 High/Critical → skip
2. If `tests/usability/accessibility-audit.md` exists with 0 Level A violations → skip
3. If `tests/usability/{feature}-test-plan.md` exists → skip `usability-test-plan`
4. `tenets-traps-evaluation` and `accessibility-audit` can run in parallel — they evaluate
   different dimensions and do not share output dependencies

When re-running after fixes, always increment the round suffix (r1 → r2 → r3).
The verify layer enforces strict quality — the tool must pass on its own.

## Execution Order

```
tenets-traps-evaluation ────┐
accessibility-audit         ├── (parallel)
usability-test-plan         │
                             ↓
                    test-execution
```

## Completion Criteria

Stage is complete when:
- `tenets-traps-evaluation` latest round has 0 Critical, 0 High findings
- `accessibility-audit` has 0 WCAG Level A violations
- (optional) `usability-test-plan` exists and is executable

## Artifacts Expected

```
tests/
  usability/
    tenets-traps-evaluation-r{N}.md
    accessibility-audit.md
    {feature}-test-plan.md
    {feature}-task-scripts.md
    {feature}-observation-sheet.md
```

## Passing Context to Deliver

The Handoff agent needs:
- `tests/usability/tenets-traps-evaluation-r{N}.md` — final evaluation with all findings resolved
- `tests/usability/accessibility-audit.md` — compliance status
- All prototype artifacts from `prototypes/`
