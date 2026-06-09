---
title: "Usability Test Plan: Deployment Agent UX Enhancements (Round 4)"
phase: test
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Tester Agent"
related:
  - "../../research/azure-deployment-agent-ux-enhancements.md"
  - "../../strategy/requirements-prd.md"
---

# Usability Test Plan: Deployment Agent UX Enhancements (Round 4)

This test plan validates five UX enhancements to the Azure Deployment Agent built as React prototypes following three prior research rounds. The study will assess whether the new interactions improve discoverability, cost transparency, editing efficiency, version management, and deployment confidence.

## Study Overview

| Parameter | Details |
|-----------|---------|
| **Features Tested** | Mode Switcher, Cost Badge, Deploy Gate, Click-to-Edit, Version Timeline |
| **Test Type** | Moderated remote (think-aloud protocol) |
| **Participants** | 8–10 (mix of developers, DevOps, architects) |
| **Session Duration** | 60 minutes per session |
| **Prototype** | React prototypes — link TBD |
| **Study Window** | TBD (target 2 weeks) |
| **Tools** | Screen-share via Microsoft Teams, recording with consent |

---

## Research Questions

1. **Discovery** — Can users discover and invoke the Deployment Agent without guidance?
2. **Cost Awareness** — Do users understand the cost implications of their architectural choices when presented with inline cost annotations?
3. **Deploy Confidence** — Does the Deploy Gate build sufficient confidence for production deployments?
4. **Inline Editing** — Do users successfully edit parameters inline without confusion or errors?
5. **Version Management** — Can users compare and rollback versions effectively using the horizontal timeline?
6. **Mode Clarity** — Does the Mode Switcher reduce ambiguity about Copilot's behavior across Ask, Plan, and Agent modes?
7. **Workflow Fit** — Do the enhancements fit naturally into participants' existing deployment workflows?
8. **Learnability** — Can users accomplish all core tasks without repeated prompting or assistance?

---

## Success Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Discovery rate (unguided) | ≥ 80% | % of users who find and invoke Agent mode without hints |
| Task completion rate | ≥ 85% | % of tasks completed successfully across all scenarios |
| Time on task — Version comparison | ≤ 30 seconds | Stopwatch from task start to correct comparison displayed |
| Cost driver identification accuracy | ≥ 90% | % who correctly identify the most expensive resource |
| System Usability Scale (SUS) | ≥ 72 | Post-session SUS questionnaire |
| Post-task difficulty rating | ≤ 2 / 5 | Single Ease Question (SEQ) after each task |
| Error rate (inline editing) | ≤ 10% | % of edit attempts resulting in unrecoverable or confused states |
| Rollback success rate | ≥ 85% | % who successfully rollback to the specified version |

---

## Participant Profile

### Composition

| Segment | Count | Key Characteristics |
|---------|-------|---------------------|
| Software Developers (IDE-centric) | 3–4 | Daily VS Code users, deploy via CLI or CI/CD, moderate Azure familiarity |
| DevOps / Platform Engineers (IaC-native) | 3–4 | Heavy Terraform/Bicep users, manage multi-env pipelines, advanced Azure |
| Cloud Architects (cost-focused) | 2–3 | Own cost optimization, review deployment architectures, strategic Azure use |

### Screening Criteria

- [ ] Uses Azure at least weekly in a professional context
- [ ] Has deployed infrastructure using IaC (Terraform, Bicep, ARM, or Pulumi) in the past 6 months
- [ ] Familiar with VS Code or a JetBrains IDE as their primary editor
- [ ] Mix of Terraform and Bicep experience across the panel
- [ ] Has not participated in Rounds 1–3 of this study (fresh perspective)
- [ ] Comfortable with think-aloud protocol and screen sharing

### Exclusions

- Microsoft employees or Azure product team members
- Participants who only use the Azure Portal (no CLI/IaC experience)

### Incentive

$100 USD gift card per participant, sent within 5 business days of session completion.

---

## Session Structure

| Block | Duration | Activities |
|-------|----------|------------|
| **Introduction** | 5 min | Welcome, consent form, recording start, think-aloud instructions |
| **Background Interview** | 5 min | Role, Azure usage, IaC tools, current deployment workflow |
| **Task Scenarios** | 40 min | 5 task scenarios (see task scripts), SEQ after each task |
| **Post-Session** | 10 min | SUS questionnaire, open-ended debrief, final questions |

### Task Flow

```
Task 1: Agent Discovery (Mode Switcher)
  ↓
Task 2: Workload Plan + Cost Understanding (Cost Badge)
  ↓
Task 3: Inline Editing (Click-to-Edit)
  ↓
Task 4: Version Comparison + Rollback (Version Timeline)
  ↓
Task 5: Deploy Gate + Production Deployment (Deploy Gate)
```

> **Note:** Task order is fixed because the scenario builds progressively (discover → plan → edit → iterate → deploy). Counterbalancing is not appropriate for this sequential workflow.

---

## Equipment & Environment

| Item | Details |
|------|---------|
| Prototype | React prototypes running locally or hosted (Storybook / Vercel preview) |
| Screen sharing | Microsoft Teams with recording enabled |
| Observation | Dedicated notetaker using observation sheet template |
| Timer | Stopwatch for time-on-task metrics |
| Recording consent | Digital consent form sent before session |
| Backup | Pre-recorded walkthrough video in case of prototype failure |

---

## Pre-Test Checklist

### 1 Week Before

- [ ] Recruit and confirm 8–10 participants matching screening criteria
- [ ] Schedule 60-minute sessions with 15-minute buffer between sessions
- [ ] Send calendar invites with Teams link and consent form
- [ ] Ensure prototypes are deployed and accessible via shared URL
- [ ] Pilot test all 5 tasks with an internal team member
- [ ] Prepare observation sheets (1 per participant)
- [ ] Set up recording and ensure storage permissions

### Day Before

- [ ] Confirm participant attendance via email
- [ ] Test prototype links and verify all 5 component flows work end-to-end
- [ ] Test screen-share and recording setup
- [ ] Print/prepare task scripts and observation sheets
- [ ] Verify incentive gift cards are ready for distribution

### Day Of (Before Each Session)

- [ ] Reset prototype to default state (v1, no edits applied)
- [ ] Open task scripts and observation sheet
- [ ] Start recording and verify audio/video quality
- [ ] Have backup prototype screenshots ready

---

## Data Collection & Analysis

### During Sessions

- Screen recording with audio (think-aloud)
- Notetaker captures observations per task using structured observation sheet
- Single Ease Question (SEQ) rating after each task
- Note critical incidents, confusion points, and verbal feedback

### After All Sessions

- Calculate aggregate metrics against targets
- Affinity-map qualitative observations by feature
- Identify patterns in failure points and confusion
- Prioritize findings by severity (critical / major / minor / cosmetic)
- Compile findings report with recommendations

### Deliverables

| Artifact | Location |
|----------|----------|
| Test plan | `tests/usability/deployment-agent-r4-test-plan.md` |
| Task scripts | `tests/usability/deployment-agent-r4-task-scripts.md` |
| Raw observation notes | `tests/usability/data/` (post-study) |
| Findings report | `tests/usability/deployment-agent-r4-findings.md` (post-study) |

---

## Next Steps

- [ ] Finalize prototype hosting URL and update overview table
- [ ] Complete participant recruitment and schedule sessions
- [ ] Conduct pilot session and iterate on task scripts if needed
- [ ] Run study sessions over 1–2 week window
- [ ] Synthesize findings and publish report
