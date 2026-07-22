# DesAIgns — Architecture

A systematic, open-source-friendly design operations platform where every stage of the design process is powered by tools users can invoke at any granularity — full lifecycle, a single stage, or a single tool directly on their artifacts.

---

## Core Principle

> Every tool must produce specific, evidenced, task-grounded output —
> or it re-runs once with surgical precision before the user is involved.

No slop. No generic output. Every artifact is verified before it leaves a tool.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER                                    │
│                                                                 │
│   Run full lifecycle   Run a stage   Run a single tool          │
└────────────┬──────────────────┬───────────────────┬────────────┘
             │                  │                   │
             ▼                  ▼                   ▼
    ┌─────────────────┐  ┌────────────┐  ┌──────────────────┐
    │  Design Lead    │  │ Stage Agent│  │ Tool Sub-agent   │
    │  (Orchestrator) │  │(Coordinator│  │ (e.g. @Comp-     │
    │                 │  │  )         │  │  Analysis)       │
    └────────┬────────┘  └─────┬──────┘  └────────┬─────────┘
             │                 │                   │
             ▼                 ▼                   ▼
      Runs all stages   Runs tools in       Runs SKILL.md
      in sequence       this stage only     then VERIFY.md
```

---

## The Three-Tier Agent Hierarchy

```
Design Lead Agent
│   Orchestrates the full lifecycle across all stages
│
├── Stage Agent  (one per stage — coordinator, not worker)
│   │   Reads context, selects which tools to run, orders them,
│   │   passes artifacts between tools, tracks stage completion
│   │
│   ├── Tool Sub-agent  ──→  Verifier
│   │   Runs SKILL.md        Runs VERIFY.md
│   │                        Scores output → ACCEPT or RE-RUN
│   │
│   ├── Tool Sub-agent  ──→  Verifier
│   │
│   └── Tool Sub-agent  ──→  Verifier
│
└── (next stage agent...)
```

**Every tool has its own dedicated sub-agent** — regardless of complexity.
This enables independent invocation, parallelism, and independent upgrades.

---

## The Tool — Atomic Unit

Every capability in the system is a **Tool**. Three files, one folder.

```
.github/skills/competitive-analysis/
  ├── tool.json     ← who I am, where I belong, what I need
  ├── SKILL.md      ← how to run me (self-sufficient, works standalone)
  └── VERIFY.md     ← how to judge my output (metric → ACCEPT or RE-RUN)
```

### tool.json — Contribution Contract

```json
{
  "id": "competitive-analysis",
  "name": "Competitive Analysis",
  "description": "Analyse competing products to identify gaps and opportunities",
  "stages": ["discover"],
  "agent": "competitive-analysis",
  "inputs": [
    { "type": "task-description", "required": true },
    { "type": "artifact", "from": "research-brief", "required": false }
  ],
  "outputs": ["research/competitive-analysis.md"],
  "dependencies": [],
  "required": false
}
```

| Field | What it declares |
|---|---|
| `stages` | Which stage(s) this tool belongs to — tools can span multiple stages |
| `agent` | The sub-agent that runs this tool |
| `inputs` | What it needs — from user or from another tool's output |
| `outputs` | Artifacts it produces |
| `dependencies` | Tool ids that must complete before this one runs |
| `required` | Whether this tool is mandatory for the stage to be considered complete |

> `SKILL.md` and `VERIFY.md` are always in the same folder — no need to reference them.
> `parallel` is inferred from `dependencies`: no deps = can run in parallel.

---

## The Verify Layer — Quality Gate

Every tool output passes through a verifier before it's accepted. The verifier is an **autonomous decision-maker** — it scores the output and decides: **ACCEPT** or **RE-RUN**.

### VERIFY.md — The Rubric

```yaml
dimensions:
  specificity:
    weight: 40
    threshold: 70
    failure_instruction: "Reference the actual product, user, and context
      from the task. Do not use generic industry examples."

  evidence:
    weight: 35
    threshold: 65
    failure_instruction: "Every claim must cite a source, quote, or data
      point. Remove all unsupported assertions."

  completeness:
    weight: 25
    threshold: 75
    failure_instruction: "Cover all required sections: market size, key
      competitors, feature gaps, pricing comparison."

accept_threshold: 75
```

Dimensions, weights, and thresholds are **defined per tool** — a competitive
analysis weights evidence heavily, a persona weights specificity heavily.

### The Verify Loop — Strict

```
                    ┌─────────────┐
                    │  Tool runs  │
                    │  SKILL.md   │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  Verifier   │
                    │  VERIFY.md  │
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
        ACCEPT ✓                    RE-RUN
      output ready           inject surgical brief:
                             • pre-defined failure instructions
                             • dynamic score specifics
                                        │
                                ┌───────▼───────┐
                                │  Tool re-runs │
                                │  (once only)  │
                                └───────┬───────┘
                                        │
                                ┌───────▼───────┐
                                │   Verifier    │
                                └───────┬───────┘
                                        │
                           ┌────────────┴────────────┐
                           │                          │
                     ACCEPT ✓                   HARD STOP ⚑
                   output ready            flag for user with:
                                           • best output so far
                                           • specific failures
```

**Only 1 re-run is allowed.** The tool and its SKILL.md must be precise enough
to get it right. The re-run is a safety net, not a crutch.

### Re-run Injection — Surgical, Not Vague

When the verifier decides RE-RUN, it injects a precise brief built from two sources:

```
1. Pre-defined failure_instruction from VERIFY.md  (contributor's intent)
   +
2. Dynamic specifics from actual scoring            (what scored low and why)

Result: "Specificity score: 42/100.
         Reference the actual product, user, and context from the task.
         The output mentions no specific product names, teams, or constraints."
```

Pre-defined instructions take priority — tool contributors know their
tool's failure modes best. Dynamic specifics fill in the exact numbers.

### Metric Dimensions

| Dimension | What it detects |
|---|---|
| **Specificity** | Output grounded in this actual task — not boilerplate anyone could write |
| **Completeness** | All required sections and criteria are present |
| **Evidence** | Claims backed by sources, quotes, or data — not just assertions |

---

## The Stage Agent — Coordinator

The stage agent reads the task context and **selects tools intelligently** — it does not always run all tools.

```
Stage Agent reads:
  1. What artifacts already exist on disk
  2. What the user asked for
  3. Which tools are available (from STAGE.md)

Then decides:
  • Skip this tool    → artifact exists and looks complete
  • Run this tool     → missing or stale output
  • Run these in parallel → no dependency between them
```

### STAGE.md — The Coordinator's Playbook

Each stage has a `STAGE.md` alongside the tool directories:

```
.github/skills/
  discover/
    STAGE.md              ← full tool graph, ordering, selection logic
  competitive-analysis/
    tool.json / SKILL.md / VERIFY.md
  user-interviews/
    tool.json / SKILL.md / VERIFY.md
  findings-synthesis/
    tool.json / SKILL.md / VERIFY.md   ← declares dep on competitive-analysis
```

### Dual Declaration of Dependencies

Dependencies are declared in **both** places — because invocation can happen from either level:

```
Running a full stage:
  Stage agent reads STAGE.md → full dependency graph → orchestrates tools in order

Running a single tool directly:
  Tool reads its own SKILL.md → knows what inputs it needs → asks user if anything missing
```

---

## Tools Per Stage

Tools keep growing to cover the full breadth of each stage. This is the starting set:

```
DISCOVER                    DEFINE                      IDEATE
────────────────────        ────────────────────        ────────────────────
○ Research Brief            ○ Problem Statements        ○ HMW Reframing
○ Competitive Analysis      ○ User Personas             ○ Concept Brainstorm
○ User Interviews           ○ Journey Map               ○ Concept Evaluation
○ Findings Synthesis        ○ PRD / Requirements        ○ Decision Log

DESIGN                      PROTOTYPE                   TEST
────────────────────        ────────────────────        ────────────────────
○ Wireframe Spec            ○ Component Impl.           ○ Tenets & Traps Eval
○ Design Tokens             ○ Demo Pages                ○ Accessibility Audit
○ Component Specs           ○ Storybook Stories         ○ Usability Test Plan
○ Design System             ○ Visual Verification       ○ Test Execution

DELIVER
────────────────────
○ Implementation Guide
○ Component API Reference
○ Design-Engineering Changelog
○ Handoff Checklist
```

---

## Open-Source Contribution Model

The tool registry is **directory-based**. No central file. No merge conflicts.

```
Contributing a new tool = adding a folder:

.github/skills/
  └── my-new-tool/          ← create this folder
        ├── tool.json        ← fill out the contribution contract
        ├── SKILL.md         ← write how the tool runs
        └── VERIFY.md        ← write the quality metric

That's it. The system discovers it automatically.
```

The system scans `.github/skills/`, reads every `tool.json`, and builds
the registry dynamically. New stages can be contributed the same way —
add a stage folder with a `STAGE.md`.

This mirrors how successful open-source ecosystems work — VS Code extensions,
GitHub Actions, npm packages. Each unit is self-describing.

---

## Full File Structure

```
.github/
├── agents/
│   ├── design-lead.agent.md          ← lifecycle orchestrator
│   ├── researcher.agent.md           ← discover stage coordinator
│   ├── strategist.agent.md           ← define stage coordinator
│   ├── ideator.agent.md              ← ideate stage coordinator
│   ├── designer.agent.md             ← design stage coordinator
│   ├── prototyper.agent.md           ← prototype stage coordinator
│   ├── tester.agent.md               ← test stage coordinator
│   ├── handoff.agent.md              ← deliver stage coordinator
│   ├── competitive-analysis.agent.md ← tool sub-agent
│   ├── user-interviews.agent.md      ← tool sub-agent
│   └── ... (one per tool)
│
└── skills/
    ├── discover/
    │   └── STAGE.md                  ← discover stage playbook
    ├── competitive-analysis/
    │   ├── tool.json
    │   ├── SKILL.md
    │   └── VERIFY.md
    ├── user-interviews/
    │   ├── tool.json
    │   ├── SKILL.md
    │   └── VERIFY.md
    ├── findings-synthesis/
    │   ├── tool.json
    │   ├── SKILL.md
    │   └── VERIFY.md
    ├── define/
    │   └── STAGE.md
    ├── personas/
    │   ├── tool.json
    │   ├── SKILL.md
    │   └── VERIFY.md
    └── ... (one folder per tool, one STAGE.md per stage)
```

---

## Key Architecture Decisions

| Decision | Choice | Reason |
|---|---|---|
| Tool registry | Directory-based discovery | Open-source friendly — no central file, no merge conflicts |
| Agent per tool | One sub-agent per tool, always | Uniform architecture, independent invocation, parallelism |
| Stage agent role | Coordinator, not worker | Context-aware selection; skips what's already done |
| Dependencies | Dual declaration — STAGE.md + SKILL.md | Supports stage-run and direct tool invocation equally |
| Verify re-runs | Strictly 1 | SKILL.md must be precise; re-run is a safety net, not a loop |
| Failure instructions | Pre-defined in VERIFY.md + dynamic from verifier | Contributors know their tool's failure modes best |
| Metric dimensions | Tool-specific, weighted per tool | Different tools have different quality signatures |
| Hard stop behaviour | Flag user with best output + specific failures | User stays in control; not overwhelmed by retry noise |
