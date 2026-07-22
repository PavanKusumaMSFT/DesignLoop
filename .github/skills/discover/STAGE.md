---
stage: discover
label: Discover
coordinator-agent: researcher
---

# Discover Stage — Coordinator Playbook

## Purpose
Surface the research foundation the entire lifecycle depends on. Output is a
synthesis of market context, user evidence, and competitive landscape that makes
the Define stage possible without guesswork.

## Tools in This Stage

| Tool ID | Required | Depends On | Can Parallel |
|---|---|---|---|
| `research-brief` | yes | — | no (runs first) |
| `competitive-analysis` | no | `research-brief` | yes |
| `user-interviews` | no | `research-brief` | yes |
| `findings-synthesis` | yes | `competitive-analysis`, `user-interviews` | no (runs last) |

## Selection Logic

Before running any tool, check the `research/` directory:

1. If `research/competitive/` has files dated within 30 days → skip `competitive-analysis`
2. If `research/interviews/` has files → skip `user-interviews`
3. If `research/findings-synthesis.md` exists and references current artifacts → skip `findings-synthesis`
4. Always run `research-brief` first if `research/brief.md` does not exist

If the user's task description includes attached links or documents, treat them
as pre-completed research input and adjust which tools to skip accordingly.

## Execution Order

```
research-brief
    ↓
competitive-analysis ──┐
user-interviews        ├── (parallel)
                       ↓
              findings-synthesis
```

## Completion Criteria

Stage is complete when:
- `findings-synthesis` tool has passed verification, OR
- User has explicitly provided research artifacts that cover competitive analysis
  and user evidence (skipping synthesis is allowed if brief already synthesises them)

## Artifacts Expected

```
research/
  brief.md
  competitive/
    {category}-matrix.md
    {category}-brief.md
  interviews/
    {session}-notes.md (if conducted)
  findings-synthesis.md
```

## Passing Context to Define

The Strategist (Define stage coordinator) needs:
- `research/brief.md` — scope and research questions
- `research/competitive/{category}-brief.md` — competitive landscape
- `research/findings-synthesis.md` — synthesised user pain points and insights
