---
title: "Task Scripts: Deployment Agent UX Enhancements (Round 4)"
phase: test
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Tester Agent"
related:
  - "deployment-agent-r4-test-plan.md"
---

# Task Scripts: Deployment Agent UX Enhancements (Round 4)

Moderator scripts for the five usability test scenarios validating the Azure Deployment Agent UX enhancements. Each task includes the scenario prompt, success criteria, observation guidance, and follow-up questions.

---

## Introduction Script

> **Read aloud to participant:**
>
> "Thank you for joining us today. We're testing some new features in Azure's deployment experience within VS Code. I want to emphasize — we're testing the product, not you. There are no right or wrong answers, and any confusion or difficulty you experience is valuable feedback for us.
>
> As you work through the tasks, please think aloud — tell us what you're looking at, what you're thinking, and what you expect to happen. If something is confusing, say so. If something works well, tell us that too.
>
> I'll give you a scenario for each task. Try to complete it as naturally as you would in your own work. I may not answer questions about how things work during the task — I want to see what you'd do on your own — but I'll be happy to discuss everything afterward.
>
> We're recording this session with your consent for our research team. The recording will only be used internally and will be deleted after analysis.
>
> Do you have any questions before we begin?"

---

## Background Interview (5 minutes)

Ask the following questions to understand the participant's context:

1. What is your current role, and how long have you been in it?
2. How frequently do you deploy infrastructure to Azure? (Daily / Weekly / Monthly)
3. What IaC tools do you use? (Terraform, Bicep, ARM templates, Pulumi, other)
4. Walk me through your typical deployment workflow — from writing code to production.
5. Have you used GitHub Copilot or Azure Copilot before? If so, how?
6. What's your biggest pain point with deployments today?

> **Moderator note:** Listen for cues about their mental model of AI assistants vs. agents. This will inform how you interpret Task 1 observations.

---

## Task 1: Agent Discovery

**Component Under Test:** Mode Switcher (Ask / Plan / Agent segmented control)

**Critical Validation:** This task validates whether the 0% discovery rate from Round 3 has been resolved.

### Scenario

> **Read to participant:**
>
> "Imagine you've been asked to deploy a new web application to Azure. You have VS Code open with Azure Copilot available. Go ahead and set up the deployment however you'd normally approach it."

### Moderator Instructions

- **DO NOT** mention the mode switcher, agent mode, or the `@deploy` command
- **DO NOT** guide them toward any specific UI element
- Let them explore freely for up to 3 minutes before offering a gentle nudge
- If stuck after 3 minutes: "Is there anything else in the interface you haven't explored yet?"
- If stuck after 5 minutes: End task, note as failure, and demonstrate the mode switcher before proceeding

### Success Criteria

| Criterion | Pass / Fail |
|-----------|-------------|
| User notices the segmented control (Ask / Plan / Agent) | |
| User switches to Agent mode without guidance | |
| User invokes the Deployment Agent (via mode switch or @deploy) | |
| Completed within 3 minutes | |

### Observation Points

- [ ] Where does the user look first? (Chat input? Sidebar? Command palette?)
- [ ] Do they notice the mode switcher? If so, when? (Timestamp: ___)
- [ ] Do they try typing `@deploy` or similar natural language?
- [ ] Do they try the command palette or menu system?
- [ ] What is their mental model? (Do they think of it as a chat, a tool, or an agent?)
- [ ] How long until they find Agent mode? (Time: ___ seconds)
- [ ] Do they read the mode labels or hover for tooltips?

### Follow-Up Questions

1. **How easy was it to find the deployment feature?** (1 = Very difficult, 5 = Very easy)
2. What did you expect to happen when you first opened Copilot?
3. Did you notice the Ask / Plan / Agent options? What did you think they meant?
4. Was anything confusing about the different modes?
5. How would you explain the difference between the three modes to a colleague?

---

## Task 2: Workload Plan + Cost Understanding

**Components Under Test:** Cost Badge (inline cost annotations with SKU alternatives)

### Scenario

> **Read to participant:**
>
> "The agent has generated a workload plan for your web application. Take a moment to review the plan. Then tell me: which resource is the most expensive? And is there a cheaper alternative available?"

### Moderator Instructions

- Ensure the prototype displays a workload plan with 4–6 resources and visible cost badges
- Do not point to the cost badges — let them discover the annotations
- If they identify the expensive resource but miss the alternatives: "How might you explore other options?"

### Success Criteria

| Criterion | Pass / Fail |
|-----------|-------------|
| Correctly identifies the most expensive resource | |
| Notices and interacts with cost badge annotations | |
| Finds the SKU alternatives panel | |
| Reviews at least one alternative SKU | |

### Observation Points

- [ ] Do they notice the cost badges immediately or do they need to scan?
- [ ] Can they interpret the cost amounts correctly? (Monthly? Hourly? Confused?)
- [ ] Do they click a cost badge? Which one first?
- [ ] Do they find the alternatives panel? How?
- [ ] Do they compare alternatives or just glance?
- [ ] Do they express surprise at any costs?
- [ ] Do they understand the relationship between SKU choice and cost?

### Follow-Up Questions

1. **How easy was it to understand the costs?** (1 = Very difficult, 5 = Very easy)
2. Was the cost information helpful for making decisions? Why or why not?
3. What level of cost detail do you need? (Resource-level? Line-item? Monthly projection?)
4. Would you trust these cost estimates for production planning?
5. Is there any cost information that was missing?

---

## Task 3: Inline Editing

**Component Under Test:** Click-to-Edit (inline parameter editing)

### Scenario

> **Read to participant:**
>
> "You've decided to change the VM SKU from Standard_D4s_v3 to Standard_D2s_v3 to reduce costs. Go ahead and make this change directly in the plan."

### Moderator Instructions

- The plan should show an editable VM configuration with the SKU field highlighted or hinted as editable
- Do not tell them to click the field — observe their first instinct
- If they try to type a chat prompt instead: let them, then ask "Is there another way you might do this?"

### Success Criteria

| Criterion | Pass / Fail |
|-----------|-------------|
| Clicks the SKU field to enter edit mode | |
| Selects or types the new SKU value (Standard_D2s_v3) | |
| Notices the impact preview (cost/performance delta) | |
| Confirms the change (clicks confirm or presses Enter) | |

### Observation Points

- [ ] First instinct: Do they click the field or type a prompt?
- [ ] Do they recognize the field as editable? (Cursor change? Hover state? Pencil icon?)
- [ ] Do they notice the impact preview showing cost/performance changes?
- [ ] Is the confirm/cancel interaction clear?
- [ ] Do they try to edit other fields after succeeding?
- [ ] Do they try to undo the change?
- [ ] Any hesitation or confusion during the edit flow?

### Follow-Up Questions

1. **How natural was that editing experience?** (1 = Very unnatural, 5 = Very natural)
2. Would you prefer editing inline like this or typing a prompt to Copilot? Why?
3. Did you notice the impact preview? Was it useful?
4. Were there any fields you wanted to edit but couldn't?
5. How does this compare to editing a Bicep/Terraform file directly?

---

## Task 4: Version Comparison + Rollback

**Component Under Test:** Version Timeline (horizontal version comparison with rollback)

### Scenario

> **Read to participant:**
>
> "You've made several iterations to the deployment plan and are now on version 5. Compare the current plan with version 3 to see what changed between them. Then, roll back to version 4."

### Moderator Instructions

- The prototype should show a horizontal timeline with versions v1–v5
- v5 should be selected as current
- Do not explain the two-dot selection mechanism — observe if they figure it out
- If stuck on comparison after 60 seconds: "How might you select two versions to compare?"

### Success Criteria

| Criterion | Pass / Fail |
|-----------|-------------|
| Locates the version timeline | |
| Selects v3 and v5 for comparison (two-dot selection) | |
| Reads and interprets the diff correctly | |
| Finds the rollback action | |
| Successfully rolls back to v4 | |

### Observation Points

- [ ] Do they understand the timeline is interactive?
- [ ] Can they figure out two-dot selection without guidance?
- [ ] How do they attempt to select versions? (Click? Drag? Right-click?)
- [ ] Can they read the diff? Do they understand additions vs. removals?
- [ ] How do they find the rollback action? (Button? Right-click? Menu?)
- [ ] Do they look for search or filter within the timeline?
- [ ] Do they express concern about rolling back? (Data loss? Irreversibility?)
- [ ] Time to complete comparison: ___ seconds

### Follow-Up Questions

1. **How easy was it to compare versions?** (1 = Very difficult, 5 = Very easy)
2. Was the timeline layout intuitive? Would you prefer a different visualization?
3. How did the version comparison feel compared to tools you use today (e.g., git diff)?
4. Did you feel confident about what would happen when you rolled back?
5. Would you use this for tracking changes across team members?

---

## Task 5: Deploy Gate + Production Deployment

**Component Under Test:** Deploy Gate (pre-deployment validation — Review + Create pattern)

### Scenario

> **Read to participant:**
>
> "You're satisfied with the plan and ready to deploy to production. Go ahead and proceed with the deployment."

### Moderator Instructions

- The Deploy Gate should show validation sections: resource summary, cost estimate, security checks, compliance status, and a destructive change warning
- Do not rush them through the gate — observe reading behavior
- Note whether they read all sections or skip ahead to Deploy

### Success Criteria

| Criterion | Pass / Fail |
|-----------|-------------|
| Reviews the resource summary section | |
| Reviews the cost estimate section | |
| Notices security and compliance validation results | |
| Acknowledges the destructive change warning | |
| Clicks Deploy to confirm | |

### Observation Points

- [ ] Do they read each validation section or skip to Deploy?
- [ ] Which sections do they spend the most time on?
- [ ] How do they react to the destructive change warning? (Pause? Read carefully? Dismiss?)
- [ ] Do they notice the "Save as PR" alternative?
- [ ] Would they use the PR option instead of direct deploy?
- [ ] Do they look for additional information before deploying? (Logs? Plan details?)
- [ ] Do they express confidence or anxiety at the deploy step?
- [ ] Do they try to go back and change anything?

### Follow-Up Questions

1. **Did you feel confident enough to deploy?** (1 = Not at all, 5 = Very confident)
2. What would make you more confident before deploying?
3. Did the validation checks match what you'd want to see before a production deployment?
4. How did the destructive change warning feel — helpful or alarming?
5. Would you use the "Save as PR" option? In what situations?
6. How does this compare to your current deployment review process?

---

## Post-Session: System Usability Scale (SUS)

> **Read to participant:**
>
> "Thank you for completing the tasks. I'd now like you to rate your overall experience with these features. For each statement, give a rating from 1 (Strongly Disagree) to 5 (Strongly Agree)."

| # | Statement | Rating (1–5) |
|---|-----------|---------------|
| 1 | I think that I would like to use this system frequently. | |
| 2 | I found the system unnecessarily complex. | |
| 3 | I thought the system was easy to use. | |
| 4 | I think that I would need the support of a technical person to use this system. | |
| 5 | I found the various functions in this system were well integrated. | |
| 6 | I thought there was too much inconsistency in this system. | |
| 7 | I would imagine that most people would learn to use this system very quickly. | |
| 8 | I found the system very cumbersome to use. | |
| 9 | I felt very confident using the system. | |
| 10 | I needed to learn a lot of things before I could get going with this system. | |

> **SUS Score Calculation:** Odd items: subtract 1 from score. Even items: subtract score from 5. Sum all values, multiply by 2.5. Target: ≥ 72.

---

## Post-Session Debrief Script

> **Read to participant:**
>
> "Now I'd like to ask a few final questions about your overall experience."

1. Overall, what was your first impression of these deployment features?
2. Which feature was the most useful to you? Why?
3. Which feature was the most confusing or frustrating? Why?
4. Was there anything missing from this experience that you'd need for your real work?
5. If you could change one thing about any of these features, what would it be?
6. How likely would you be to use this deployment agent in your daily work? (1–10)
7. Is there anything else you'd like to share?

> **Moderator closing:**
>
> "Thank you so much for your time and feedback. Your input is invaluable and will directly shape how we build this experience. You'll receive your $100 gift card within 5 business days. If you have any additional thoughts after the session, feel free to email us."

---

## Next Steps

- [ ] Pilot test full script with internal team member and adjust timing
- [ ] Prepare observation sheet template for notetakers
- [ ] Set up recording and transcription pipeline
- [ ] Schedule sessions and distribute consent forms
