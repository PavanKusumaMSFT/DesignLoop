---
title: "Task Scripts: AI-Assisted Azure CLI Error Handling (Project Cirrus)"
phase: test
status: draft
created: 2026-06-23
updated: 2026-06-23
author: "Tester Agent"
related: ["ai-cli-error-handling-test-plan.md", "ai-cli-error-handling-observation-sheet.md"]
---

# Task Scripts: AI-Assisted Azure CLI Error Handling (Project Cirrus)

## Introduction Script

> "Thank you for participating today. We're testing a new Azure CLI experience that tries to
> help when a command fails — we're testing the design, not you, and there are no right or wrong
> answers. Please think aloud as you go: tell me what you're reading, what you expect to happen,
> and what you'd do next. Imagine you're in your own terminal getting real work done. I may not
> be able to answer questions during a task, but ask anything you like. Ready?"

## Background Questions

1. Tell me about your experience with the command line and with cloud CLIs like Azure CLI.
2. When an `az` (or similar) command fails with an error, what do you do right now to fix it?
3. Have you used any AI assistance inside a terminal before? What did you think of it?

---

## Task 1: Make sense of the failure

### Scenario
> "You ran a command to create a virtual machine and it didn't work. You're now looking at your
> terminal after the command finished."

*(Show the state through the error — frames 01–03: the `az vm create` command, the deprecation
warning, and the red `ResourceGroupNotFound` error.)*

### Instructions
> "Take a look and tell me what just happened and what you'd normally do next."

### Success Criteria
- [ ] Participant recognises the command failed and that a resource group is missing.
- [ ] Participant articulates a next step (their own, before seeing AI help).

### Observation Points
- Do they read the error or scroll past it?
- Do they distinguish the yellow *warning* from the red *error*? *(a11y 1.4.1)*
- What is their unaided plan? (baseline before AI)

### Follow-up Questions
1. How clear was it what went wrong? (1–5)
2. How confident are you that you could fix this on your own right now? (1–5)

---

## Task 2: Notice and interpret the AI help

### Scenario
> "Continue from where you are."

*(Advance to the AI analysis and result — frames 04–05.)*

### Instructions
> "Keep thinking aloud. Tell me what the terminal is doing now and what it's telling you."

### Success Criteria
- [ ] Participant notices AI help appeared and can say (or guess) how it was triggered. *(F1)*
- [ ] Participant identifies that there are 6 issues and which one actually blocked the command
      (the missing resource group, item 6). *(F2)*

### Observation Points
- Do they understand the "Analyzing…" wait? Do they look for a way to cancel? *(F4 / A-05)*
- Can they tell the *blocking* issue from the *advisory* ones, or do they treat all 6 equally?
  *(F2, F9)*
- Any confusion about what invoked the AI or whether they could turn it off? *(F1, F8)*

### Follow-up Questions
1. How easy or difficult was it to understand this AI help? (1–5)
2. Of the six issues, which one actually stopped your command? How did you decide?
3. Did anything about how this appeared surprise you? Would you want it to run automatically?

---

## Task 3: Decide whether to run the suggested commands

### Scenario
> "The AI has suggested some commands to fix the problem."

*(Keep frame 05 visible — the two "Next action" commands and the disclaimer.)*

### Instructions
> "Walk me through what you'd do with these suggestions to actually fix your VM. Do whatever you
> would do at your own machine."

### Success Criteria
- [ ] Participant decides on a next action (run as-is / review first / edit / reject).
- [ ] Participant **reviews** the command before "running" it. *(F3, F10)*
- [ ] Participant notices the second command creates real resources and contains
      `--admin-password`. *(F3)*

### Observation Points
- Do they try to **copy** the command, retype it, or look for a "run" control? *(F7 / A-07)*
- Do they spot values they never supplied — `eastus`, the literal `--subscription-id`,
  `Standard_D2vs_v3`, the NIC/VNet/NSG names? *(F5)*
- Do they catch the likely **invalid SKU** `Standard_D2vs_v3`? *(F6)*
- Do they read the "AI-generated content may be incorrect" caveat — and *when* (before or after
  deciding to run)? *(F10)*
- Any hesitation about cost or about running something that provisions billable infra? *(F3)*

### Follow-up Questions
1. How much do you trust these suggested commands? (1–5) Why?
2. Would you run the second command exactly as shown, or change something first? What?
3. Did you notice any values you didn't originally provide? How did that feel?
4. Where did you notice the "may be incorrect" note? Did it change what you'd do?

---

## Task 4: Screen-reader pass (AT participants only)

### Scenario
> "You're working in your terminal with your screen reader, and a command just failed."

*(Run the same flow with VoiceOver + Terminal or NVDA + Windows Terminal.)*

### Instructions
> "Using your screen reader as you normally would, find out what went wrong and tell me what the
> AI is suggesting you do."

### Success Criteria
- [ ] Participant is alerted that new output/AI help appeared. *(A-04 / 4.1.3)*
- [ ] Participant can navigate to and read each of the 6 issues and the suggested commands.
- [ ] Participant can read the disclaimer.

### Observation Points
- Is the AI status announced, or silent until they navigate manually? *(A-04)*
- Can they navigate issue-by-issue and command-by-command by line? *(A-04 / 1.3.1)*
- Does the long wrapped command read coherently? *(A-06)*
- Is the blinking cursor disruptive or is motion reduced? *(A-05)*

### Follow-up Questions
1. How easy was it to know the AI had responded? (1–5)
2. How easy was it to read the issues and the suggested commands in order? (1–5)
3. What would make this clearer with your screen reader?

---

## Post-Session Questions

1. Overall, how would you describe this experience when a command fails? (1–5)
2. What was the most helpful part of the AI help?
3. What was the most confusing or concerning part?
4. Did you trust the suggested fix enough to run it on your real subscription? Why / why not?
5. Is there anything you expected the AI to do that it didn't?
6. Any other thoughts or feedback?

## SUS Questionnaire

Administer the standard 10-item System Usability Scale (1 = Strongly disagree … 5 = Strongly
agree). Target average ≥ 68.

## Debrief Script

> "Thank you so much for your time and feedback — this directly shapes how the AI error help
> works. {Mention incentive process.} Do you have any final questions for us?"
