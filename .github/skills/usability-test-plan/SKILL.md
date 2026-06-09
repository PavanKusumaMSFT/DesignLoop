---
name: usability-test-plan
description: "Create structured usability test plans with objectives, user scenarios, moderator scripts, success metrics, and feedback collection templates. Use when planning user testing, writing test scripts, preparing for usability studies, or creating observation frameworks."
argument-hint: "Feature or flow to test (e.g., 'checkout flow for mobile e-commerce app')"
---

# Usability Test Plan Generator

## When to Use
- Planning moderated or unmoderated usability tests
- Preparing for user testing sessions
- Creating standardized test scripts for the team
- Setting up observation and feedback collection

## Procedure

### 1. Define Test Scope

Gather from the user:
- Feature or flow being tested
- Test type: moderated remote, unmoderated remote, in-person
- Number of participants and recruitment criteria
- Available prototypes (check `prototypes/` directory)

### 2. Create the Test Plan

Use the template at [test-plan.md](./assets/test-plan.md):
- Research questions (what we want to learn)
- Success metrics (task completion rate, time on task, error rate, satisfaction)
- Participant profile and screening criteria
- Session structure and timing
- Equipment and environment requirements

### 3. Write Task Scripts

Use the template at [task-script.md](./assets/task-script.md):
- Scenario context (set the scene for the participant)
- Task instructions (what to ask them to do)
- Follow-up questions (probe for deeper insights)
- Observation notes template (what to watch for)

### 4. Create Observation Sheet

For each task, prepare:
- Expected path vs. actual path tracking
- Error and confusion point logging
- Verbal feedback capture areas
- Severity rating scale

### 5. Save Artifacts

Save all outputs to `tests/usability/`:
- `tests/usability/{feature}-test-plan.md`
- `tests/usability/{feature}-task-scripts.md`
- `tests/usability/{feature}-observation-sheet.md`
