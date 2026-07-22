---
stage: define
label: Define
coordinator-agent: strategist
---

# Define Stage — Coordinator Playbook

## Purpose
Transform research findings into a clear, actionable problem space: crisp problem
statements, evidence-grounded personas, a journey map that reveals pain points, and
a PRD that the Ideate and Design stages can act on directly.

## Tools in This Stage

| Tool ID | Required | Depends On | Can Parallel |
|---|---|---|---|
| `problem-statements` | yes | Discover artifacts | no (runs first) |
| `personas` | yes | `problem-statements` | yes |
| `journey-map` | no | `problem-statements` | yes |
| `requirements-prd` | yes | `personas`, `journey-map` | no (runs last) |

## Selection Logic

Before running any tool, check the `strategy/` directory:

1. If `strategy/problem-statements.md` exists → skip `problem-statements`
2. If `strategy/personas.md` has ≥ 2 personas with research citations → skip `personas`
3. If `strategy/journey-map.md` exists → skip `journey-map`
4. If `strategy/requirements-prd.md` exists with acceptance criteria → skip `requirements-prd`

Always verify that existing artifacts reference current Discover outputs — if
Discover artifacts changed significantly, re-run the dependent Define tools.

## Execution Order

```
problem-statements
    ↓
personas ──────────┐
journey-map        ├── (parallel)
                   ↓
          requirements-prd
```

## Completion Criteria

Stage is complete when `requirements-prd` has passed verification. The PRD is the
gate — it must have acceptance criteria for every must-have requirement.

## Artifacts Expected

```
strategy/
  problem-statements.md
  personas.md
  journey-map.md
  requirements-prd.md
```

## Passing Context to Ideate

The Ideator needs:
- `strategy/problem-statements.md` — HMW framing
- `strategy/personas.md` — who we're designing for
- `strategy/requirements-prd.md` — must-have requirements and constraints
