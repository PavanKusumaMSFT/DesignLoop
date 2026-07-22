---
title: "HITS Study Participation — HMW Statements"
phase: ideate
status: draft
created: 2026-06-22
updated: 2026-06-22
author: "Ideator Agent"
related:
  - ../strategy/problem-statements.md
---

# HMW Questions: HITS Study Participation Experience

## Source: Problem Statements

| ID | Problem Statement | User Segment | Unmet Need | Barrier |
|----|-------------------|--------------|------------|---------|
| PS-1 | Study Discoverability | All participants (esp. Alex Chen) | Find relevant studies faster | Flat chronological list, no personalization, no proactive notifications |
| PS-2 | Task Completion Friction | All participants (esp. Jordan Blake) | Complete studies without abandoning | Unclear instructions, no progress indicators, no save/resume, session timeouts |
| PS-3 | Participant-Study Matching | Researchers (Priya) + participants | Right people join right studies | No profile-based matching, no screener pre-qualification, broad self-selection only |
| PS-4 | Feedback Loops | All participants + researchers | Feel valued, get richer insights | No post-study communication, no impact visibility, abrupt end after submission |

---

## HMW Questions (Grouped by Cluster)

### Cluster 1: Discovery & Awareness

**HMW-1a** — Remove the barrier (Source: PS-1)
> How might we eliminate the need for participants to actively search for studies so that relevant opportunities reach them effortlessly?

**HMW-1b** — Change the context (Source: PS-1)
> How might we embed study opportunities into participants' existing daily workflows so that discovery happens naturally without a separate browsing session?

**HMW-1c** — Reframe the goal (Source: PS-1)
> How might we help participants build an ongoing awareness of research needs across Microsoft even when they have no time dedicated to browsing?

---

### Cluster 2: Completion & Progress

**HMW-2a** — Remove the barrier (Source: PS-2)
> How might we eliminate the fear of losing progress so that participants feel safe starting a study at any moment regardless of available time?

**HMW-2b** — Change the context (Source: PS-2)
> How might we design the study experience so that participants always know where they are, what comes next, and how long it will take?

**HMW-2c** — Reframe the goal (Source: PS-2)
> How might we help participants contribute meaningful research data even when they cannot complete an entire study in one sitting?

---

### Cluster 3: Matching & Relevance

**HMW-3a** — Remove the barrier (Source: PS-3)
> How might we remove the guesswork from study eligibility so that participants only see studies they are genuinely qualified for?

**HMW-3b** — Change the context (Source: PS-3)
> How might we design the enrollment process so that participant-study fit is confirmed before time is invested by either side?

**HMW-3c** — Reframe the goal (Source: PS-3)
> How might we help researchers reach their ideal participants even when those participants don't know the study exists?

---

### Cluster 4: Value & Recognition

**HMW-4a** — Remove the barrier (Source: PS-4)
> How might we close the gap between participation and visible impact so that contributors see how their feedback shaped products?

**HMW-4b** — Change the context (Source: PS-4)
> How might we create an environment where research participation is celebrated and socially visible across the organization?

**HMW-4c** — Reframe the goal (Source: PS-4)
> How might we help participants build a sense of ongoing partnership with researchers even when individual studies are one-time events?

---

## Selected Questions for Brainstorm

The following 8 HMW questions are selected for concept ideation — at least one per problem statement, representing all three reframing angles:

| # | HMW Question | Source | Angle | Why This Framing |
|---|---|---|---|---|
| 1 | How might we eliminate the need for participants to actively search for studies so that relevant opportunities reach them effortlessly? | PS-1 | Remove barrier | Opens space for push notifications, AI matching, ambient discovery — doesn't prescribe any mechanism |
| 2 | How might we embed study opportunities into participants' existing daily workflows so that discovery happens naturally without a separate browsing session? | PS-1 | Change context | Forces solutions that integrate into Teams, Outlook, Viva — meets people where they already are |
| 3 | How might we eliminate the fear of losing progress so that participants feel safe starting a study at any moment regardless of available time? | PS-2 | Remove barrier | Targets the emotional barrier (fear) rather than the technical one — invites UX, messaging, and architecture solutions |
| 4 | How might we help participants contribute meaningful research data even when they cannot complete an entire study in one sitting? | PS-2 | Reframe goal | Reframes "completion" as "contribution" — opens door to partial-value designs and micro-interactions |
| 5 | How might we design the enrollment process so that participant-study fit is confirmed before time is invested by either side? | PS-3 | Change context | Shifts the screening moment earlier — invites screeners, profiles, and smart pre-qualification |
| 6 | How might we help researchers reach their ideal participants even when those participants don't know the study exists? | PS-3 | Reframe goal | Flips discovery from participant-initiated to researcher-initiated — opens outbound recruiting concepts |
| 7 | How might we close the gap between participation and visible impact so that contributors see how their feedback shaped products? | PS-4 | Remove barrier | Directly targets the communication void — invites impact reports, timelines, and transparency mechanisms |
| 8 | How might we create an environment where research participation is celebrated and socially visible across the organization? | PS-4 | Change context | Moves beyond individual feedback loops into organizational culture — invites social proof, recognition, and community concepts |

---

## Ideation Constraints

All solutions generated from these HMW questions must respect the following hard constraints:

| Category | Constraint |
|----------|-----------|
| **Privacy** | No use of employee role/org/calendar data without explicit opt-in via Azure AD consent flow |
| **Communications** | Max 2 unsolicited notifications per week per Microsoft internal policy |
| **Data retention** | Partial study data auto-purged after 30 days |
| **Performance** | Page load < 2 seconds; no added latency to study-taking experience |
| **Accessibility** | WCAG 2.1 AA compliance; keyboard navigation; screen reader support |
| **Browser support** | Edge, Chrome, Safari — desktop and mobile |
| **Fairness** | Matching algorithms must not create exclusionary patterns against any demographic group |
| **Confidentiality** | Impact summaries require study-owner approval before publication |
| **Researcher autonomy** | Cannot alter study authoring schema without migration tooling |

---

## Next Steps

1. Use these 8 HMW questions as ideation prompts for concept brainstorming
2. Each concept should clearly map to one or more HMW questions
3. Aim for 8+ distinct concepts spanning all four clusters before converging
