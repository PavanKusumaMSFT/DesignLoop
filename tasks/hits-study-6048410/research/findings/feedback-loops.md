---
title: "Finding: Post-Study Feedback Loops & Compensation Tracking"
phase: discover
status: draft
created: 2026-06-18
updated: 2026-06-18
author: "Researcher Agent"
related:
  - ../research-brief.md
  - ../competitive-analysis.md
  - ./study-discovery.md
  - ./task-completion-ux.md
  - ./participant-matching.md
---

# Finding: Post-Study Feedback Loops & Compensation Tracking

| Attribute | Value |
|-----------|-------|
| **Severity** | 🟡 Medium |
| **Workflow Stage** | Reward → Feedback |
| **Impact Area** | Participant retention, motivation, trust in platform |
| **Confidence** | Medium (heuristic analysis + competitive benchmarking; needs participant validation) |

---

## 1. Summary

After completing a study on HITS, participants enter an information void. There is no mechanism to track compensation status, no visibility into how their feedback was used, and no way to provide meta-feedback about the study experience itself. This "black hole" effect undermines intrinsic motivation and reduces long-term engagement with the platform.

---

## 2. Evidence

### 2.1 Compensation Tracking Gaps

The current post-completion experience for compensation:

```
Complete study → Wait (unknown duration) → Receive gift card email → (or don't, and wonder if something went wrong)
```

| Aspect | Current State | Participant Expectation |
|--------|---------------|------------------------|
| Payout timeline visibility | ❌ Not communicated | "When will I get paid?" |
| Pending/earned/paid status | ❌ No dashboard | Real-time tracking (like an order tracker) |
| Compensation history | ❌ Not available | "How much have I earned on HITS this year?" |
| Issue resolution | ❌ No self-service | "My gift card never arrived — who do I contact?" |

**Result:** Participants frequently ping researchers directly ("Did you send my gift card yet?"), creating overhead for both parties.

### 2.2 Impact Visibility — The "Black Hole" Problem

Participants invest time and cognitive effort into studies but almost never learn:
- Whether their feedback was useful
- What decisions were influenced by the research
- How many other people participated
- What the aggregate findings were (even at a high level)

This matters because participant motivation in internal research has two components:

| Motivation Type | Driver | Currently Served? |
|----------------|--------|--------------------|
| **Extrinsic** | Compensation (gift cards, swag) | ⚠️ Partially (compensation exists but tracking is poor) |
| **Intrinsic** | Feeling of impact, contributing to product quality | ❌ Not at all |

Research on internal participant pools consistently shows that **intrinsic motivation is the primary driver of repeat participation** — employees want to feel their voice matters. Compensation alone is insufficient to sustain engagement.

### 2.3 No Meta-Feedback Mechanism

| Feedback Direction | Available? | Value |
|-------------------|:----------:|-------|
| Participant → Researcher (study content) | ✅ Via study itself | Core purpose |
| Participant → Platform (study experience) | ❌ Not available | Would surface UX issues, confusing instructions, broken links |
| Researcher → Participant (thank you / impact) | ❌ Not available | Would close the loop and boost retention |
| Platform → Participant (contribution summary) | ❌ Not available | Would reinforce participation behavior |

### 2.4 Competitive Gap

**dscout** excels here with in-app messaging between researchers and scouts, a mission history portfolio, and badges/reputation. **Respondent.io** offers a mutual rating system and clear earnings dashboard. HITS has none of these features.

See: [Competitive Analysis](../competitive-analysis.md) § 5.5

---

## 3. Impact

| Metric | Current State (estimated) | Desired State |
|--------|--------------------------|---------------|
| Repeat participation rate (2+ studies/quarter) | ~25% | >50% |
| Compensation-related support inquiries | High (manual email/Teams pings) | Near-zero (self-service tracking) |
| Participant NPS | Unknown (not measured) | >40 |
| Time from completion to compensation | Unknown to participant; estimated 5–15 business days | <5 business days with real-time status |

### Downstream Effects

- **Participant attrition** — Without feedback or impact visibility, participants lose motivation over time.
- **Researcher overhead** — Handling compensation inquiries and manually thanking participants is time-consuming.
- **Platform trust** — Uncertainty about whether compensation will arrive erodes trust in HITS as a reliable system.
- **Missed quality signal** — Without meta-feedback, the platform cannot identify and fix broken or confusing studies.

---

## 4. Hypothesized Root Causes

1. **One-way data flow** — HITS was designed for researchers to extract insights from participants, not for information to flow back to participants.
2. **No compensation integration** — The compensation process (gift card procurement and distribution) is semi-manual and not tracked in HITS's UI.
3. **Researcher workload** — Researchers are focused on analysis and reporting; closing the loop with participants is an unfunded extra step.
4. **Privacy caution** — Sharing aggregate results or study impact requires careful consideration of what can be disclosed.

---

## 5. Design Opportunities

### Opportunity A: Compensation Dashboard

Build a "My Earnings" page showing:

| Column | Description |
|--------|-------------|
| Study Name | Title of the completed study |
| Completed On | Date of completion |
| Compensation | Amount / type (gift card, donation, swag) |
| Status | ⏳ Processing → 📦 Sent → ✅ Delivered |
| Estimated Delivery | Date or "within X business days" |

Include a "Report an issue" link for each entry to enable self-service resolution.

### Opportunity B: "Your Impact" Dashboard

A lightweight, opt-in feature where researchers can post a short impact statement after a study concludes:

> *"Your feedback on the new Teams meeting join experience helped us identify 3 usability issues. Two have already been fixed in the latest update."*

Display this on the participant's study history page alongside:
- Total studies completed
- Total hours contributed
- Product areas influenced

### Opportunity C: Post-Study Rating

After completing a study, prompt participants with a quick 2-question rating:
1. **Clarity** — "Were the study instructions clear?" (1–5 stars)
2. **Experience** — "How was your overall experience?" (1–5 stars)
3. Optional free-text: "Anything we should improve?"

Aggregate these ratings to give researchers and the HITS platform team a study-quality signal.

### Opportunity D: Thank-You Automation

Send an automated thank-you message (via email or Teams) within 24 hours of study completion:
- Personalized with participant name and study title
- Compensation status and estimated delivery date
- Link to rate the study experience
- (Future) Link to impact update when available

### Opportunity E: Contribution Portfolio

Create a personal "Research Contributions" page that participants can optionally reference in their career development (connects to Microsoft's growth mindset culture):
- Studies completed by quarter
- Product areas contributed to
- Skills exercised (e.g., prototype evaluation, accessibility testing, survey feedback)
- Badges for milestones (10 studies, 50 studies, etc.)

---

## 6. Next Steps

1. **Survey participants** — Deploy a short survey to recent HITS participants asking about compensation experience and what would motivate them to participate more.
2. **Map compensation workflow** — Document the end-to-end compensation process (from researcher approval to gift card delivery) to identify automation opportunities.
3. **Interview researchers** — Ask 5–6 researchers whether they'd be willing to post impact statements and what format would be sustainable.
4. **Prototype dashboards** — Create low-fidelity mockups of the compensation tracker and "Your Impact" dashboard.
5. **Define privacy guardrails** — Work with legal/privacy to determine what aggregate study outcomes can be shared with participants.
