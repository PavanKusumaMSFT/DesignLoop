# Contributing to DesAIgns

DesAIgns is designed to grow through open contributions. Every tool, stage, and
verification metric is a self-contained unit — you can contribute a single tool
without touching anything else, with zero risk of merge conflicts.

---

## What You Can Contribute

| Contribution type | What to add |
|---|---|
| New tool in an existing stage | A folder under `.github/skills/<tool-id>/` |
| New stage | A stage folder `<stage-id>/STAGE.md` + a stage coordinator agent |
| Improve a verification metric | Edit `VERIFY.md` in the tool's folder |
| Improve how a tool runs | Edit `SKILL.md` in the tool's folder |
| Improve stage orchestration | Edit `STAGE.md` in the stage folder |

The system discovers tools automatically by scanning `.github/skills/*/tool.json`.
No central registry file to edit. No coordination required with other contributors.

---

## How to Add a New Tool

### Step 1 — Create the tool folder

```
.github/skills/<your-tool-id>/
  tool.json    ← contribution contract
  SKILL.md     ← how to run the tool
  VERIFY.md    ← quality gate (metric dimensions, weights, thresholds)
```

Replace `<your-tool-id>` with a lowercase, hyphen-separated identifier that
matches the tool's purpose. Examples: `user-interviews`, `journey-map`,
`design-tokens`.

---

### Step 2 — Write `tool.json`

`tool.json` is the contribution contract. It tells the system what the tool is,
which stages it belongs to, what it needs, and what it produces.

```json
{
  "id": "your-tool-id",
  "name": "Human-readable Tool Name",
  "description": "One sentence: what the tool does and when to use it.",
  "stages": ["discover"],
  "agent": "your-tool-id",
  "inputs": [
    { "type": "task-description", "required": true },
    { "type": "artifact", "from": "research-brief", "required": false }
  ],
  "outputs": [
    "research/your-tool/{filename}.md"
  ],
  "dependencies": [],
  "required": false
}
```

**Field reference**

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique identifier, matches the folder name |
| `name` | string | Display name shown in the UI |
| `description` | string | One-sentence summary for the tool picker |
| `stages` | string[] | Stages this tool belongs to — can be multiple |
| `agent` | string | Agent slug that runs this tool (usually same as `id`) |
| `inputs` | object[] | What the tool needs — from user or from another tool's output |
| `outputs` | string[] | Artifact paths this tool writes, relative to `tasks/<task-id>/` |
| `dependencies` | string[] | Tool ids that must complete before this tool can run |
| `required` | boolean | Whether this tool is mandatory for the stage to be complete |

**Input types**

| `type` | Meaning |
|---|---|
| `task-description` | The user's task prompt — always available |
| `artifact` | Output file from another tool (use `from` to name the tool id) |
| `user-prompt` | Additional input the tool asks the user for at runtime |

---

### Step 3 — Write `SKILL.md`

`SKILL.md` is the tool's operating manual. The sub-agent reads this to know
exactly how to run the tool. It must be self-sufficient — a user can invoke this
tool directly without going through the stage coordinator.

**Required sections**

```markdown
---
name: your-tool-id
description: "Short description for the agent skill picker"
argument-hint: "What the user should pass (e.g., 'product category')"
---

# Tool Name

## When to Use
<!-- Conditions that make this tool the right choice -->

## Dependencies
<!-- What must exist before running this tool. Include artifact paths. -->

## Procedure

### 1. ...
### 2. ...
<!-- Step-by-step instructions the agent follows -->

## Output Format
<!-- Exact structure and section headings the output must follow -->

## Artifact Paths
<!-- Where to save output files, relative to tasks/<task-id>/ -->
```

**Writing good procedures**

- Be specific. Generic instructions produce generic output.
- Name exact artifact paths, not just folders.
- Include decision rules (e.g. "if personas exist in `strategy/personas.md`,
  use them; otherwise infer from the task description").
- Define the output format in enough detail that the verifier can check it
  mechanically.

---

### Step 4 — Write `VERIFY.md`

`VERIFY.md` defines the quality gate. The verifier scores the tool's output
against these dimensions and decides: **ACCEPT** or **RE-RUN**. If the output
still fails after one re-run, the verifier hard-stops and flags the user.

```yaml
---
tool: your-tool-id
---

# Verification: Tool Name

## Dimensions

dimensions:
  dimension-name:
    weight: 40        # percentage — all weights must sum to 100
    threshold: 70     # minimum score (0–100) for this dimension to pass
    failure_instruction: |
      Specific instruction injected into the re-run prompt when this
      dimension fails. Tell the tool exactly what to fix and how.
      Be surgical — vague instructions produce a second generic output.

  another-dimension:
    weight: 35
    threshold: 65
    failure_instruction: |
      ...

  completeness:
    weight: 25
    threshold: 75
    failure_instruction: |
      ...

accept_threshold: 75  # composite weighted score required to ACCEPT

## What the Verifier Checks

1. Explicit checklist item the verifier evaluates (matches dimension-name)
2. Another specific check
3. ...

## Hard Stop Behaviour

If the output still fails after one re-run, flag for user with:
- List of specific failures to surface to the user
- The best output produced so far
```

**Dimension design principles**

| Dimension | Use when |
|---|---|
| `specificity` | Output must reference the actual task, not generic examples |
| `evidence` | Claims must be backed by sources, quotes, or data |
| `completeness` | All required sections / criteria must be covered |
| `framework-accuracy` | Output must follow a defined framework exactly (codes, labels, etc.) |
| `actionability` | Each finding must include a concrete, implementable suggestion |

Weights must sum to 100. Set thresholds conservatively — 70-80 is the right
range for most dimensions. `accept_threshold` is typically 75-78.

**Writing good `failure_instruction` values**

The failure instruction is injected verbatim into the re-run prompt alongside
the specific dimension scores. Write it as a directive to the agent, not as a
description of the failure:

```
✗  "The evidence was too vague."
✓  "Every finding must cite a specific location (screen name, component,
    interaction step) and a concrete impact. Replace all vague statements
    like 'button is hard to see' with specific observations that include
    the exact element, its measured property, and the affected user."
```

---

### Step 5 — Create the sub-agent file

Every tool has its own dedicated sub-agent. Create:
`.github/agents/<your-tool-id>.agent.md`

```markdown
---
name: "Your Tool Name"
description: "One-line description for the agent picker."
tools: [read, edit, search]
---

You are the **Your Tool Name** agent.

## Behaviour

1. Read `.github/skills/your-tool-id/SKILL.md` for the full procedure.
2. Read `.github/skills/your-tool-id/VERIFY.md` to understand the quality bar.
3. Follow the SKILL.md procedure exactly.
4. Before writing output, self-check:
   - Does every claim have supporting evidence?
   - Does every section specified in SKILL.md exist?
   - Is everything grounded in the actual task — not generic boilerplate?
5. Write output to the artifact paths defined in SKILL.md.

## Constraints

- DO NOT write generic output. Everything must reference the specific task.
- DO NOT skip sections defined in SKILL.md.
- ALWAYS save to the correct artifact paths.
```

**Available tool sets**

| Set | Include when |
|---|---|
| `read, edit, search` | Text analysis and writing tools |
| `execute` | Tool needs to run code or commands |
| `playwright/*` | Tool does browser-based testing or screenshots |
| `figma/*` | Tool reads Figma files |
| `storybook/*` | Tool works with Storybook |
| `msgraph/*` | Tool sends notifications via Microsoft Graph |

---

### Step 6 — Register in the stage's `STAGE.md`

Open `.github/skills/<stage-id>/STAGE.md` and add your tool to:

1. **Tools table** — add a row with id, name, outputs, dependencies, required
2. **Selection logic** — describe when to skip this tool (if ever)
3. **Execution order** — place your tool in the dependency graph
4. **Completion criteria** — add your tool's required outputs to the gate

This is the only file outside your tool's folder that you need to touch.

---

## How to Add a New Stage

1. Create `.github/skills/<stage-id>/STAGE.md` (see schema below)
2. Create `.github/agents/<stage-id>.agent.md` (coordinator agent)
3. Add the stage id to the `stageAgents` map in `bridge/server.js` (one line)
4. Add the stage to the `PHASES` array in `bridge/server.js` if it produces
   file artifacts the UI should display

### `STAGE.md` schema

```markdown
# Stage Name — Stage Playbook

## Tools in This Stage

| Tool id | Name | Outputs | Dependencies | Required |
|---|---|---|---|---|
| tool-a | Tool A | path/a.md | — | yes |
| tool-b | Tool B | path/b.md | tool-a | no |

## Selection Logic

When to skip a tool (context-aware):
- Skip `tool-a` if `path/a.md` already exists and is non-empty.
- Always run `tool-b` when `tool-a` was run this session.

## Execution Order

tool-a (required)
  └── tool-b (optional, depends on tool-a)

Tools with no shared dependencies can run in parallel.

## Completion Criteria

The stage is complete when:
- [ ] `path/a.md` exists and passes verification
- [ ] All required tool outputs are present

## Context to Pass Forward

When handing off to the next stage, include:
- Key findings or decisions made during this stage
- Artifact paths of the primary outputs
```

---

## Checklist Before Submitting

```
Tool folder and files
  [ ] .github/skills/<tool-id>/tool.json       — all required fields present
  [ ] .github/skills/<tool-id>/SKILL.md        — procedure is specific, not generic
  [ ] .github/skills/<tool-id>/VERIFY.md       — weights sum to 100; failure_instructions are directives
  [ ] .github/agents/<tool-id>.agent.md        — references SKILL.md and VERIFY.md

Verification quality
  [ ] Each dimension threshold is between 60 and 90
  [ ] accept_threshold is between 70 and 85
  [ ] failure_instruction for each dimension tells the agent exactly what to fix

Stage integration
  [ ] Tool added to the correct STAGE.md tools table
  [ ] Dependencies match what tool.json declares
  [ ] Completion criteria updated if tool is required

Syntax check
  [ ] tool.json is valid JSON (run: node -e "require('./.github/skills/<id>/tool.json')")
  [ ] VERIFY.md weights sum to 100
```

---

## Key Architecture Principles

**Every tool is independent.** A tool must be runnable by itself without going
through the stage coordinator. `SKILL.md` must declare everything it needs.

**No central registry.** The system discovers tools by scanning the directory.
Never edit a central list — just drop your folder in.

**One re-run, then hard stop.** The verifier gives every tool exactly one chance
to self-correct. The `failure_instruction` values you write in `VERIFY.md` are
the re-run prompt — make them precise enough to actually fix the problem.

**Specificity over completeness.** A focused tool that does one thing with high
specificity is better than a broad tool that produces generic output across many
things. The verifier will reject generic output.

For the full architecture, see [architecture.md](./architecture.md).
