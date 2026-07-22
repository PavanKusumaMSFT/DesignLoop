---
title: "Finding: Study Discovery & Browsing Experience"
phase: discover
status: draft
created: 2026-06-18
updated: 2026-06-18
author: "Researcher Agent"
related:
  - ../research-brief.md
  - ../competitive-analysis.md
  - ./participant-matching.md
  - ./task-completion-ux.md
  - ./feedback-loops.md
---

# Finding: Study Discovery & Browsing Experience

| Attribute | Value |
|-----------|-------|
| **Severity** | 🔴 Critical |
| **Workflow Stage** | Discover |
| **Impact Area** | Enrollment rates, participant engagement, study recruitment speed |
| **Confidence** | Medium (heuristic analysis + competitive benchmarking; needs participant validation) |

---

## 1. Summary

Participants struggle to find and evaluate relevant studies on HITS. The current discovery model relies on periodic email digests and a flat, unpersonalized catalog — leading to low awareness of available studies, poor study-to-participant fit, and slow recruitment timelines for researchers.

---

## 2. Evidence

### 2.1 Current Discovery Channels

| Channel | Reach | Effectiveness | Issues |
|---------|-------|--------------|--------|
| **Email digest** | High (all registered participants) | Low — easily buried in inbox | Batch delivery (not real-time); no personalization; competes with high-volume enterprise email |
| **HITS homepage catalog** | Medium (requires active visit) | Low-Medium — functional but not engaging | No personalized recommendations; basic filters only; no sorting by relevance |
| **Word of mouth / Teams posts** | Low (organic, researcher-driven) | Variable | Unscalable; inconsistent; depends on researcher effort |
| **Direct link sharing** | Low (targeted) | High (when used) | Requires researcher to manually identify and reach participants |

### 2.2 Catalog UX Issues

- **No personalization** — All participants see the same list of studies regardless of their role, org, product usage, or participation history.
- **Limited filtering** — Filters exist for basic attributes (study type, product area) but lack key participant-centric filters:
  - Estimated time commitment
  - Compensation amount
  - Device/platform requirements
  - "New since last visit"
- **No urgency signals** — Studies with closing deadlines or limited spots do not surface prominently.
- **Flat information architecture** — Studies are presented as a uniform list with no visual hierarchy, categorization, or recommendation logic.

### 2.3 Competitive Gap

External platforms like **dscout** and **Respondent.io** use personalized feeds, push notifications, and smart matching to proactively surface relevant studies. HITS requires participants to actively seek out studies — a pull model vs. the push model that drives higher engagement on external platforms.

See: [Competitive Analysis](../competitive-analysis.md) § 5.1

---

## 3. Impact

| Metric | Current State (estimated) | Desired State |
|--------|--------------------------|---------------|
| Study awareness rate | ~30% of eligible participants see a given study | >70% |
| Catalog visit frequency | Monthly (tied to digest) | Weekly or on-demand |
| Time to fill study recruitment | 5–10 business days | 1–3 business days |
| Study enrollment rate (views → enrollments) | ~8–12% | >25% |

### Downstream Effects

- **Researchers** over-recruit via broad email blasts, creating noise for participants.
- **Participants** miss studies they'd find valuable, reducing engagement over time.
- **Participant pool attrition** — Inactive participants stop checking HITS, shrinking the effective pool.

---

## 4. Hypothesized Root Causes

1. **No recommendation engine** — The platform lacks an algorithm to match studies to participants based on profile, behavior, and org data.
2. **Email-only notification strategy** — Enterprise inboxes are saturated; email is a low-signal channel for time-sensitive study invitations.
3. **No integration with daily tools** — HITS is a standalone web destination disconnected from Teams, Outlook, and other daily-use surfaces.
4. **Passive catalog design** — The catalog was designed as a researcher admin tool, not a participant engagement surface.

---

## 5. Design Opportunities

### Opportunity A: Personalized Study Feed
Replace the flat catalog with a ranked, personalized feed that considers:
- Participant role, org, and location
- Product usage signals (e.g., M365 usage data, Azure subscriptions)
- Past participation and preferences
- Study urgency (closing soon, limited spots)

### Opportunity B: Teams Bot Notifications
Deploy a Teams bot that sends targeted, real-time study invitations when a high-fit study is published. Participants can preview and enroll directly from the Teams card.

### Opportunity C: Smart Digest Emails
Redesign email digests to be personalized (top 3 matched studies) with one-click enrollment from email. Include "X spots remaining" urgency indicators.

### Opportunity D: Outlook Add-in
Surface a "Studies for you" panel in Outlook that shows 1–2 matched studies, reducing the need to visit the HITS website.

### Opportunity E: "Quick Browse" Study Cards
Redesign study cards to show all decision-critical info at a glance:
- Time commitment
- Compensation
- Study type icon
- Closing date
- Match score ("Great fit for you")

---

## 6. Next Steps

1. **Quantify** — Pull analytics on catalog page visits, email open/click rates, and enrollment sources to validate the reach and effectiveness of each channel.
2. **Interview participants** — Conduct 6–8 interviews focused on how participants currently learn about studies and what would make them check HITS more often.
3. **Prototype** — Create a low-fidelity mockup of a personalized study feed and Teams notification card for concept testing.
4. **Assess feasibility** — Work with HITS engineering to determine what profile and usage signals are available for a recommendation engine.
