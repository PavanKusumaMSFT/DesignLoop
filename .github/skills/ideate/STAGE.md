---
stage: ideate
label: Ideate
coordinator-agent: ideator
---

# Ideate Stage — Coordinator Playbook

## Purpose
Generate a breadth of concepts, evaluate them rigorously, and converge on a single
winning direction with a clear rationale. The output is a decision log that the
Design stage can act on without re-opening the question of what to build.

## Tools in This Stage

| Tool ID | Required | Depends On | Can Parallel |
|---|---|---|---|
| `hmw-reframing` | yes | Define artifacts | no (runs first) |
| `concept-brainstorm` | yes | `hmw-reframing` | no |
| `concept-evaluation` | yes | `concept-brainstorm` | no |
| `decision-log` | yes | `concept-evaluation` | no (runs last) |

## Selection Logic

Before running any tool, check the `ideation/` directory:

1. If `ideation/hmw-statements.md` has ≥ 5 HMWs → skip `hmw-reframing`
2. If `ideation/solution-concepts.md` has ≥ 8 concepts → skip `concept-brainstorm`
3. If `ideation/concept-evaluation.md` has scoring matrix → skip `concept-evaluation`
4. If `ideation/decision-log.md` has a chosen concept with rationale → skip `decision-log`

Ideate is sequential by design — divergence must precede convergence.

## Execution Order

```
hmw-reframing
    ↓
concept-brainstorm
    ↓
concept-evaluation
    ↓
decision-log
```

## Completion Criteria

Stage is complete when `decision-log` passes verification: exactly one winning
concept is documented with rationale tied to evaluation scores.

## Artifacts Expected

```
ideation/
  hmw-statements.md
  solution-concepts.md
  concept-evaluation.md
  decision-log.md
```

## Passing Context to Design

The Designer needs:
- `ideation/decision-log.md` — the chosen concept and its rationale
- `strategy/requirements-prd.md` — must-have requirements to design for
- `strategy/personas.md` — who the design must serve
