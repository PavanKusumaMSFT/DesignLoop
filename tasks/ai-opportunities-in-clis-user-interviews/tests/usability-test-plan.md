---
title: "Usability Test Plan: Evidence Console"
phase: test
status: draft
created: 2026-07-12
updated: 2026-07-12
author: "Tester Agent"
related: ["../prototypes/README.md", "../strategy/requirements-prd.md", "accessibility-review.md"]
---

# Usability Test Plan: Evidence Console

## Overview

This evaluative plan tests whether the Evidence Console helps users discover and review CLI commands while maintaining control and correct understanding of validation boundaries. No recruitment number is prescribed because the source report provides no participant-count basis; set the sample before fieldwork and report it transparently.

## Research Questions and Measures

| Question | Measure |
|---|---|
| Can participants obtain a command from a stated outcome? | Task completion and path taken. |
| Can participants interpret evidence and the environment boundary? | Correct explanation in follow-up. |
| Is the issue signal appropriately non-disruptive? | Observed interruption, confusion, and preference. |
| Do opt-in and no-execution controls feel understandable? | Participant explanation and reported confidence. |

The PRD’s 80% targets are design targets, not a claim about the study. Capture completion, time on task, error observations, confidence rating, and qualitative comments without inferring causality from a small sample.

## Participant Profile

Recruit people who use Azure CLI or PowerShell and include both terminal-heavy and IDE-heavy workflow behaviors where possible. Screen for accessibility needs and allow participants to use their preferred keyboard and assistive technology. Do not assume roles or demographics absent from the source.

## Session Structure

| Segment | Duration | Moderator activity |
|---|---:|---|
| Consent and context | 5 min | Explain the prototype does not run commands. |
| Warm-up | 5 min | Ask about the last time command discovery was difficult. |
| Tasks | 20 min | Read neutral scenarios; observe without coaching. |
| Debrief | 10 min | Probe trust, scope understanding, and control. |

## Task Scripts

1. “You need to create a resource group. Use this screen to find a command you would consider using. Think aloud.”
2. “Before inserting it, tell me what the screen has checked and what it has not checked.”
3. “Review the issue notice and decide what you would do next.”
4. “Turn assistance off, then describe what information the prototype would use or send.”

**Moderator probes:** “What tells you that?” “What would you expect after this action?” “What would make this evidence more useful?” Avoid asserting that any command is correct.

## Observation Sheet

For each task, capture expected versus actual path, point of hesitation, erroneous interpretation, participant language about trust, and severity: `0` none, `1` recoverable hesitation, `2` task-blocking confusion, `3` potential harmful misunderstanding. Record a separate accessibility observation for keyboard, focus, and announcements.

## Next Steps

- [ ] Set recruitment number, recording policy, and consent process before sessions.
- [ ] Synthesize observed findings separately from this plan.