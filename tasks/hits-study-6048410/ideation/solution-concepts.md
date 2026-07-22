---
title: "HITS Study Participation — Solution Concepts"
phase: ideate
status: draft
created: 2026-06-18
updated: 2026-06-22
author: "Ideator Agent"
related:
  - ../strategy/
  - ../research/findings/
  - ./hmw-statements.md
---

# Solution Concepts — HITS Study Participation Experience

## Overview

This document presents **eight divergent solution concepts** generated to address the HMW questions identified during the Ideate phase for Microsoft's HITS (Human Insights Tracking System) study participation experience. Each concept targets specific pain points experienced by our three personas: **Alex Chen** (busy PM), **Priya Sharma** (UX Researcher), and **Jordan Blake** (new employee).

### HMW Statements Addressed

| ID | HMW Statement | Source |
|----|---------------|--------|
| HMW-1 | How might we eliminate the need for participants to actively search for studies so that relevant opportunities reach them effortlessly? | PS-1 |
| HMW-2 | How might we embed study opportunities into participants' existing daily workflows so that discovery happens naturally? | PS-1 |
| HMW-3 | How might we eliminate the fear of losing progress so that participants feel safe starting a study at any moment? | PS-2 |
| HMW-4 | How might we help participants contribute meaningful research data even when they cannot complete an entire study in one sitting? | PS-2 |
| HMW-5 | How might we design the enrollment process so that participant-study fit is confirmed before time is invested by either side? | PS-3 |
| HMW-6 | How might we help researchers reach their ideal participants even when those participants don't know the study exists? | PS-3 |
| HMW-7 | How might we close the gap between participation and visible impact so that contributors see how their feedback shaped products? | PS-4 |
| HMW-8 | How might we create an environment where research participation is celebrated and socially visible across the organization? | PS-4 |

---

## Concept 1: Smart Study Feed

### Description

An AI-powered, personalized study recommendation feed that surfaces the most relevant studies to each participant based on their role, team, product expertise, past participation history, and availability signals from Microsoft 365 (calendar, focus time). Instead of browsing a flat list or relying on email blasts, participants open HITS and immediately see a curated feed — similar to a LinkedIn or Viva Insights feed — ranked by relevance, urgency, and estimated time commitment.

### Target Persona

**Alex Chen (Busy PM)** — Alex has limited time and needs studies surfaced proactively rather than having to hunt for them. The Smart Study Feed respects his schedule and highlights only what matters.

### HMW Addressed

- **HMW-1** (Primary): Improves discoverability by replacing manual browsing with intelligent recommendations.
- **HMW-3** (Secondary): Better matching by leveraging role, expertise, and participation history.

### Key Features

1. **Personalized Ranking Algorithm** — Uses role, org, product area, skills profile (from Microsoft 365 / internal HR data), and participation history to rank studies by relevance.
2. **Time-Aware Suggestions** — Integrates with Outlook calendar to suggest studies that fit within available time blocks; filters out studies requiring more time than the participant typically has.
3. **"Why This Study" Explainer** — Each recommendation includes a short rationale (e.g., "You're a PM in Teams — this study needs Teams PM perspectives") to build trust in the algorithm.
4. **Smart Filters & Facets** — Quick-filter chips for study type (survey, usability test, diary study), time commitment (< 10 min, 10–30 min, 30+ min), reward type, and product area.
5. **Digest Notifications** — Weekly or bi-weekly email/Teams digest summarizing new studies matching the participant's profile, with one-tap join from the notification.

### Pros

- Dramatically reduces time-to-discovery for busy employees
- Leverages existing Microsoft 365 signals (no new data collection needed)
- Scales well — works better as more participants use it
- Familiar feed-based UX pattern reduces learning curve

### Cons

- Requires ML/AI investment for recommendation quality
- Cold-start problem for new employees with no participation history
- Privacy considerations around calendar/profile data usage
- Risk of filter bubbles — participants may miss studies outside their typical profile

### Effort Estimate

**L (Large)** — Requires backend ML pipeline, Microsoft 365 Graph integrations, and careful privacy review. Frontend is moderate (feed UI pattern is well-established).

---

## Concept 2: Progress Tracker Dashboard

### Description

A visual, at-a-glance dashboard that gives participants full transparency into their study lifecycle — from enrollment through completion to impact. Think of it as a "My Studies" command center showing active studies with progress bars, upcoming deadlines, estimated time remaining, completion streaks, and earned rewards/recognition. The dashboard reduces abandonment by making progress tangible and creating gentle accountability.

### Target Persona

**Jordan Blake (New Employee)** — Jordan is eager to contribute but easily overwhelmed. The dashboard provides structure, clarity, and a sense of accomplishment that keeps him engaged through his first studies.

### HMW Addressed

- **HMW-2** (Primary): Reduces completion friction by visualizing progress and remaining effort.
- **HMW-4** (Secondary): Builds feedback loops through completion stats and reward visibility.

### Key Features

1. **Active Study Cards with Progress Bars** — Each enrolled study shows a visual progress indicator (e.g., "Step 3 of 5 complete"), estimated time remaining, and deadline countdown.
2. **Completion Streak & Stats** — Gamified streak counter ("🔥 5 studies completed this quarter") and lifetime stats (total studies, total time contributed, product areas impacted).
3. **Reward Tracker** — Centralized view of earned rewards (gift cards, recognition badges, raffle entries) with redemption status and history.
4. **Deadline Nudges** — Smart reminders via Teams or email when a study deadline is approaching, with a deep link to resume exactly where they left off.
5. **Quick-Resume Button** — One-click resume for in-progress studies, opening directly to the last incomplete step (no re-navigation needed).

### Pros

- Addresses the #1 reason for abandonment: losing track of where you left off
- Gamification elements (streaks, stats) drive intrinsic motivation
- Low conceptual complexity — participants understand dashboards intuitively
- Reward visibility creates a tangible incentive loop

### Cons

- Gamification can feel patronizing if overdone
- Requires studies to expose granular progress data (not all study types support this)
- Dashboard fatigue — yet another dashboard in the Microsoft ecosystem
- Streak mechanics can create unhealthy pressure or guilt

### Effort Estimate

**M (Medium)** — Frontend-heavy with moderate backend work for progress tracking APIs. Reward integration depends on existing infrastructure.

---

## Concept 3: Quick-Match Cards

### Description

A swipeable, card-based interface (inspired by Tinder/Bumble) for rapidly browsing and joining studies. Each card presents a study's essential info — title, time commitment, reward, product area, and a one-line description — in a scannable format. Participants swipe right to express interest, swipe left to dismiss, or tap for details. The system learns from swipe patterns to improve future recommendations. This concept prioritizes speed of decision-making and low-friction enrollment.

### Target Persona

**Alex Chen (Busy PM)** — Alex wants to make join/skip decisions in seconds, not minutes. Quick-Match Cards compress the decision loop and respect his time.

### HMW Addressed

- **HMW-1** (Primary): Improves discoverability through rapid, low-effort browsing.
- **HMW-3** (Secondary): Learns from swipe patterns to improve matching over time.

### Key Features

1. **Swipeable Study Cards** — Each card shows: study title, product area icon, time estimate, reward, study type badge, and a 1-sentence description. Swipe right = interested, left = skip.
2. **"Tell Me More" Expand** — Tap a card to expand for full description, eligibility criteria, researcher info, and scheduling options before committing.
3. **Batch Actions** — "Interested in all" or "Skip remaining" for power users who want to process the queue quickly.
4. **Preference Learning** — Backend tracks swipe patterns (e.g., "always skips diary studies," "prefers < 15 min") to reorder the deck over time.
5. **"It's a Match!" Confirmation** — When a participant expresses interest and meets eligibility criteria, a confirmation screen provides immediate enrollment with calendar integration.

### Pros

- Extremely fast decision-making — can review 10+ studies in under a minute
- Playful, engaging interaction pattern that feels different from typical enterprise UX
- Implicit preference data collection improves matching without explicit setup
- Mobile-friendly by design

### Cons

- Swipe pattern may feel too casual/consumer for an enterprise internal tool
- Risk of encouraging shallow decision-making (swiping without reading)
- Not ideal for studies that need nuanced eligibility screening
- Accessibility concerns with gesture-based primary interaction (needs keyboard/button alternatives)

### Effort Estimate

**M (Medium)** — Frontend work for swipe mechanics and animations; moderate backend for preference learning. Accessibility compliance adds effort.

---

## Concept 4: Study Completion Wizard

### Description

A step-by-step guided experience for completing studies, featuring a persistent progress bar, save-and-resume capability, contextual help tooltips, and estimated time per step. Instead of dropping participants into a raw survey or task with no scaffolding, the wizard wraps the study experience in a supportive container that reduces cognitive load, prevents abandonment, and provides escape hatches (save draft, skip and return, contact researcher). Think of it as TurboTax for study completion.

### Target Persona

**Jordan Blake (New Employee)** — Jordan isn't sure what to expect from a study. The wizard hand-holds him through the process, explains what's coming, and makes it safe to pause and resume.

### HMW Addressed

- **HMW-2** (Primary): Directly reduces task completion friction with guided flow and save/resume.
- **HMW-4** (Secondary): Contextual help and researcher contact create micro-feedback loops during the study.

### Key Features

1. **Step-by-Step Progress Bar** — Persistent top bar showing numbered steps (e.g., "Step 2 of 4: Product Feedback"), estimated time per step, and overall progress percentage.
2. **Save & Resume** — Auto-saves responses at each step. Participants can close the browser and return later via a deep link, resuming exactly where they left off with their prior responses intact.
3. **Contextual Help Tooltips** — "Why are we asking this?" tooltips on key questions, explaining how the data will be used. Reduces confusion and increases response quality.
4. **Pre-Study Briefing** — Before the study begins, a short overview screen explains: what the study is about, what to expect, estimated total time, and what happens with the results. Sets expectations upfront.
5. **Completion Celebration & Next Steps** — On completion, a celebration moment (confetti animation, thank-you message from the researcher) plus clear next steps: when to expect results, related upcoming studies, how to provide meta-feedback on the study experience itself.

### Pros

- Directly addresses the highest-friction moment (study completion itself)
- Save & resume alone could significantly reduce abandonment rates
- Contextual help improves data quality for researchers (Priya benefits too)
- Pattern is proven in consumer products (TurboTax, onboarding wizards)

### Cons

- Requires researcher buy-in to structure studies into discrete steps
- May feel over-engineered for simple 2-minute surveys
- Not all study types (e.g., live usability sessions) fit a wizard pattern
- Adds a wrapper layer that could conflict with existing survey tools (e.g., Qualtrics)

### Effort Estimate

**M (Medium)** — Moderate frontend effort for the wizard shell; save/resume requires backend state management. Integration with existing survey platforms is the main complexity.

---

## Concept 5: Impact Feed

### Description

A post-study communication channel that shows participants how their contributions actually influenced product decisions. After a study concludes, researchers publish a brief "impact update" — a card in the participant's feed showing the study name, key findings summary, product changes inspired by the research, and a thank-you from the product team. Over time, participants build a personal "impact portfolio" showing all the ways they've shaped Microsoft products. This concept targets the emotional and motivational side of participation.

### Target Persona

**Priya Sharma (UX Researcher)** — Priya knows that participants who feel valued come back for future studies. The Impact Feed helps her close the loop and build a loyal participant pool. Secondarily benefits all participants who wonder "did my feedback matter?"

### HMW Addressed

- **HMW-4** (Primary): Creates a direct feedback loop from research outcomes back to participants.
- **HMW-1** (Secondary): Impact stories surface related upcoming studies, improving discoverability.

### Key Features

1. **Impact Update Cards** — Researcher-authored cards with: study name, 2-3 key findings, product decisions influenced, before/after screenshots (when applicable), and a thank-you note.
2. **Personal Impact Portfolio** — A "My Impact" page aggregating all studies a participant contributed to, with tags for product areas influenced and a total impact score.
3. **"Your Voice Shipped"™ Moments** — Push notifications when a product change ships that was informed by a study the participant joined. E.g., "The Teams meeting redesign you gave feedback on is now live for all users!"
4. **Researcher Follow-Up Prompts** — Templates and nudges for researchers to publish impact updates within 30 days of study completion, lowering the friction of closing the loop.
5. **Social Sharing** — Participants can optionally share their impact updates to Viva Engage (Yammer) or their profile, creating social proof that encourages others to participate.

### Pros

- Addresses the most neglected part of the participation experience (post-study)
- Creates intrinsic motivation far more powerful than gift cards
- Builds long-term participant loyalty and repeat participation
- Social sharing creates organic recruitment for future studies

### Cons

- Depends entirely on researcher effort to create impact updates
- Impact may not be attributable to a single study (multiple research inputs)
- Some studies have confidential findings that can't be shared back
- Time lag between study participation and visible impact can be months

### Effort Estimate

**S (Small)** — Primarily a content/workflow solution with lightweight UI. The main challenge is organizational (getting researchers to post updates), not technical.

---

## Concept 6: Micro-Contribution Modules

### Description

A modular study architecture that breaks long studies into independent 2–5 minute "micro-tasks" that participants can complete asynchronously across multiple sessions. Instead of requiring a 30-minute uninterrupted block, researchers design studies as a sequence of atomic units — each valuable on its own. Participants can contribute one module during a coffee break, another between meetings, and finish the rest tomorrow. Each micro-contribution is saved and usable independently, so even partial participation generates value.

### Target Persona

**Alex Chen (Busy PM)** — Alex has fragmented availability. He can spare 3 minutes between meetings but rarely has a 30-minute block. Micro-contributions let him participate in ways that fit his schedule.

### HMW Addressed

- **HMW-4** (Primary): Enables meaningful contribution even when a full study can't be completed in one sitting.
- **HMW-3** (Secondary): Eliminates fear of losing progress — each module is independently saved and complete.

### Key Features

1. **Atomic Task Units** — Each module is self-contained: has its own context, instructions, and submission. No dependency on completing prior modules (where study design allows).
2. **Pick-Up-Anywhere Queue** — Participants see a queue of available modules for studies they've enrolled in. They can tackle any module in any order during spare moments.
3. **Partial Contribution Value** — Even 2 of 6 modules completed generates usable data for researchers. The system communicates this clearly: "You've already contributed valuable data. Complete more modules when you can."
4. **Calendar-Aware Suggestions** — Detects short gaps between meetings and suggests modules that fit: "You have 4 minutes before your next meeting — complete one quick task?"
5. **Researcher Module Builder** — A study authoring tool that helps researchers decompose studies into independent modules with clear atomic boundaries.

### Pros

- Fundamentally solves the time-availability problem for busy participants
- Partial data is still useful — reduces waste from abandonment
- Natural fit for mobile (complete a module while waiting for coffee)
- Gamification-friendly (module completion streaks, collection progress)

### Cons

- Not all study types decompose cleanly (some require sequential context)
- Requires researcher training on modular study design
- May reduce depth of individual responses if context is fragmented
- More complex study authoring and data assembly for researchers

### Effort Estimate

**L (Large)** — Requires rethinking study architecture, new authoring tools, and backend infrastructure for independent module state management.

---

## Concept 7: Research Champion Network

### Description

A peer-driven participation model where volunteer "Research Champions" in each team or org advocate for studies, share their participation experiences, and create social momentum around research contribution. Champions are recruited, recognized, and empowered with tools to promote studies within their networks. This leverages social influence and organizational culture — rather than platform features — to drive discovery and participation. Think of it as a distributed ambassador program.

### Target Persona

**Priya Sharma (UX Researcher)** — Priya struggles to recruit diverse participants beyond her immediate network. Research Champions give her organic reach into teams she'd never access through email blasts alone.

### HMW Addressed

- **HMW-8** (Primary): Creates visible, social celebration of research participation through peer advocacy.
- **HMW-6** (Secondary): Champions help researchers reach ideal participants who wouldn't discover studies on their own.

### Key Features

1. **Champion Enrollment & Training** — Self-nomination + lightweight onboarding explaining the role: share studies with your team, answer questions, model participation behavior.
2. **Champion Dashboard** — Personal dashboard showing: studies they've promoted, team participation rates, impact of their advocacy (e.g., "Your shares led to 12 enrollments this month").
3. **Team Leaderboard** — Optional, org-level visibility into which teams participate most in research, with Champions recognized as catalysts. Not competitive — framed as celebration.
4. **Study Sharing Toolkit** — One-click share buttons for Teams channels, email, and Viva Engage with pre-written messages Champions can customize.
5. **Recognition & Rewards** — Champions earn visible badges, quarterly recognition, and early access to research findings. Their contributions appear in Viva profile.

### Pros

- Leverages social proof — the most powerful motivator for behavior change
- Extremely low technical investment — primarily a program design + lightweight tooling
- Creates organic discovery channels that scale with org size
- Builds a research-positive culture beyond any single platform feature

### Cons

- Depends on volunteer motivation — Champions may lose interest over time
- Risk of performative advocacy without genuine engagement
- Leaderboards can create unhealthy competition or shame non-participating teams
- Uneven distribution — some orgs may have many Champions, others none

### Effort Estimate

**S (Small)** — Primarily a program/content solution. Technical build is minimal: sharing toolkit, basic dashboard, badge system.

---

## Concept 8: Smart Screener Flow

### Description

An intelligent pre-enrollment qualification flow that confirms participant-study fit in under 60 seconds before either party invests significant time. When a participant clicks "Join Study," instead of immediately enrolling them, the system presents 2–4 targeted screening questions. Based on responses, the system either confirms fit (with a personalized welcome), suggests a better-matched study, or gracefully explains the mismatch. Researchers define screening criteria; the system enforces them automatically, eliminating manual screening labor.

### Target Persona

**Priya Sharma (UX Researcher)** — Priya currently spends ~3 hours per study manually screening enrolled participants and disqualifying mismatches. The Smart Screener automates this entirely.

### HMW Addressed

- **HMW-5** (Primary): Confirms participant-study fit before time is invested by either side.
- **HMW-6** (Secondary): When a participant doesn't match, the system can redirect them to studies where they DO fit — expanding researcher reach.

### Key Features

1. **Dynamic Screener Questions** — Researchers define 2–4 eligibility questions per study (e.g., "Do you use Teams daily?", "What's your role?"). System auto-generates appropriate question types.
2. **Instant Qualification Feedback** — Within seconds of answering, participants know if they qualify. No waiting for manual researcher review.
3. **Graceful Mismatch Handling** — If disqualified, the participant sees: "This study needs [X], but we found 3 studies that are perfect for you!" — turns rejection into rediscovery.
4. **Profile-Based Auto-Screening** — For returning participants with established profiles, some screening questions can be auto-answered, making enrollment even faster.
5. **Researcher Screener Builder** — Drag-and-drop screener creation with logic branching, tied to study eligibility criteria.

### Pros

- Eliminates the most time-consuming researcher task (manual screening)
- Prevents the frustrating experience of being disqualified after enrollment
- Graceful redirects increase overall platform participation
- Profile data from screeners improves matching over time

### Cons

- Adds a step between "interested" and "enrolled" — may reduce conversion for some
- Screener design quality depends on researcher input — bad questions = bad matching
- Edge cases where fit is ambiguous may still need manual review
- Must avoid screeners feeling like gatekeeping or interrogation

### Effort Estimate

**M (Medium)** — Screener builder UI, matching logic, and redirect system are moderate effort. Benefits from existing profile infrastructure if available.

---

## Concept Comparison Summary

| Concept | Primary HMW | Target Persona | Effort | Key Value Proposition |
|---------|-------------|----------------|--------|----------------------|
| Smart Study Feed | HMW-1 | Alex Chen | L | Right studies, right people, right time |
| Progress Tracker Dashboard | HMW-3 | Jordan Blake | M | Never lose track, always see progress |
| Quick-Match Cards | HMW-1 | Alex Chen | M | Decide in seconds, not minutes |
| Study Completion Wizard | HMW-3 | Jordan Blake | M | Complete with confidence, resume anytime |
| Impact Feed | HMW-7 | Priya Sharma | S | See your feedback change products |
| Micro-Contribution Modules | HMW-4 | Alex Chen | L | Contribute in fragments, value every minute |
| Research Champion Network | HMW-8 | Priya Sharma | S | Social advocacy drives participation culture |
| Smart Screener Flow | HMW-5 | Priya Sharma | M | Right fit confirmed before time invested |

---

## Next Steps

1. **Score and evaluate** all eight concepts using a weighted scoring matrix (see `concept-evaluation.md`)
2. **Select top concepts** to advance into the Design phase based on evaluation scores and strategic fit
3. **Document decisions** and rationale in `decision-log.md`
4. **Identify concept synergies** — several concepts could be combined (e.g., Progress Tracker + Completion Wizard, Smart Feed + Smart Screener, Impact Feed + Champion Network)
5. **Validate with stakeholders** — share concepts with HITS platform team and 2-3 representative participants for gut-check feedback before investing in design
