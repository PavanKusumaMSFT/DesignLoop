---
title: "Finding: Participant Matching & Screener Experience"
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
  - ./feedback-loops.md
---

# Finding: Participant Matching & Screener Experience

| Attribute | Value |
|-----------|-------|
| **Severity** | 🟡 Medium |
| **Workflow Stage** | Screen → Enroll |
| **Impact Area** | Participant satisfaction, screener pass-through rate, recruitment efficiency |
| **Confidence** | Medium (heuristic analysis + competitive benchmarking; needs participant validation) |

---

## 1. Summary

The current participant-matching process on HITS creates frustration through redundant screener questions, opaque rejection experiences, and underutilized profile data. Participants invest time answering screener questions only to be rejected without explanation, and existing employee signals (role, org, product usage) are not leveraged to pre-qualify or automatically match participants to studies.

---

## 2. Evidence

### 2.1 Redundant Screener Questions

Participants report answering the same types of questions across multiple studies:

| Question Category | Already Available in Profile? | Asked Again in Screener? |
|-------------------|:-----------------------------:|:------------------------:|
| Job role / title | ✅ Yes | ✅ Frequently |
| Organization / team | ✅ Yes | ✅ Frequently |
| Years at Microsoft | ✅ Yes | ✅ Sometimes |
| Products used regularly | ✅ Yes (if profile updated) | ✅ Almost always |
| Device / OS | ✅ Yes | ✅ Sometimes |
| Location / time zone | ✅ Yes (via Azure AD) | ✅ Sometimes |
| Accessibility needs | ⚠️ Partially | ✅ Sometimes |
| Prior study participation | ✅ Yes (HITS has this data) | ✅ Sometimes |

**Key insight:** An estimated 40–60% of screener questions could be auto-answered or pre-filtered from existing HITS profile and Azure AD data, reducing screener burden from ~3–5 minutes to <1 minute.

### 2.2 Opaque Rejection Experience

When a participant does not pass the screener, the current experience is:

```
Submit screener → "Thank you for your interest. You were not selected for this study." → End
```

Issues:
- **No reason given** — Participants don't know *why* they weren't selected (e.g., wrong role, already at quota for their segment, wrong product usage).
- **No alternative offered** — The rejection is a dead end with no "You might be a better fit for these other studies" suggestion.
- **Emotional cost** — Repeated rejections without explanation lead to participant disengagement ("Why do I bother?").

### 2.3 Profile Staleness

- Participant profiles are set up once during registration and rarely updated.
- No prompts or incentives to keep profile data current.
- As participants change roles, teams, or product usage, their profile becomes inaccurate — leading to poor matching and more screener questions.

### 2.4 Matching Logic Limitations

| Capability | Current State | Best Practice (Respondent.io / dscout) |
|------------|---------------|---------------------------------------|
| Profile-based pre-filtering | ❌ Not used | ✅ Auto-filter before showing study to participant |
| AI-assisted matching | ❌ Not available | ✅ ML-based match scoring |
| Screener skip for known data | ❌ All questions shown | ✅ Skip questions already answered in profile |
| Match confidence score | ❌ Not shown | ✅ "Great fit" / "Good fit" labels on study cards |
| Historical participation awareness | ❌ Not factored in | ✅ Avoid showing studies from same researcher if recently screened out |

---

## 3. Impact

| Metric | Current State (estimated) | Desired State |
|--------|--------------------------|---------------|
| Screener pass-through rate | ~25–35% | >50% (by pre-filtering low-fit participants) |
| Avg. screener completion time | 3–5 minutes | <1 minute |
| Rejection-to-re-engagement rate | Low (many participants disengage after 2–3 rejections) | Maintained through alternatives and transparency |
| Profile freshness (updated within 6 months) | ~20% of participants | >60% |

### Downstream Effects

- **Researcher pain** — Low screener pass-through means researchers must send to more participants, increasing email noise.
- **Participant churn** — Repeated rejections without explanation cause participants to stop using HITS.
- **Data quality** — Stale profiles lead to mismatched participants, reducing research validity.

---

## 4. Hypothesized Root Causes

1. **Disconnected data model** — HITS profiles, Azure AD data, and screener forms are not linked in a way that enables auto-population or pre-filtering.
2. **Researcher autonomy** — Each researcher writes their own screener questions without visibility into what data the platform already has.
3. **No rejection UX design** — The rejection flow was never intentionally designed — it's a default system message.
4. **No profile maintenance loop** — There is no trigger or incentive for participants to update their profiles.

---

## 5. Design Opportunities

### Opportunity A: Smart Screener with Auto-Population
- Pre-fill screener questions using existing profile and Azure AD data.
- Show pre-filled answers to participants for confirmation ("We already know you're a PM in Azure. Is this still correct?").
- Only ask questions the platform cannot answer from existing data.

### Opportunity B: Pre-Filtered Study Visibility
- Only show studies in the catalog that the participant has a reasonable chance of qualifying for, based on profile data.
- Add a "Match score" badge to study cards ("Great fit", "May qualify", "Not eligible").

### Opportunity C: Transparent Rejection with Alternatives
Redesign the rejection experience:
```
"This study was looking for engineers in the Windows org, and your profile
indicates you're a PM in Azure. Here are 2 studies that are a better fit
for your background: [Study A] [Study B]"
```

### Opportunity D: Profile Freshness Prompts
- Trigger a profile review prompt every 6 months or when a participant changes roles (detected via Azure AD signal).
- Gamify profile completeness ("Your profile is 70% complete — answer 3 more questions to get better study matches").

### Opportunity E: Researcher Screener Guidance
- When a researcher creates a screener, show them which questions can be auto-answered from participant profiles.
- Provide a "Use profile data" toggle per question to reduce screener length.

---

## 6. Next Steps

1. **Audit screener data** — Analyze the last 50 studies' screener questions to quantify overlap with profile fields.
2. **Map Azure AD signals** — Identify which employee attributes are reliably available and up-to-date in Azure AD for auto-population.
3. **Interview recently rejected participants** — Conduct 6–8 interviews with participants who were screened out of 2+ studies to understand emotional impact and behavioral response.
4. **Prototype smart screener** — Create a clickable prototype showing the auto-populated screener experience for concept testing.
5. **Define matching algorithm requirements** — Work with HITS engineering and data science to scope a profile-based matching model.
