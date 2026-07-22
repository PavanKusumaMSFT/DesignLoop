---
title: "HITS Study Participation — Concept Evaluation Matrix"
phase: ideate
status: draft
created: 2026-06-18
updated: 2026-06-22
author: "Ideator Agent"
related:
  - ./solution-concepts.md
  - ./hmw-statements.md
  - ../strategy/
---

# Concept Evaluation: HITS Study Participation Experience

## Evaluation Criteria

| Dimension | Weight | Description |
|-----------|--------|-------------|
| **Desirability** | 45% | How well does this concept address the user's actual need? (5 = directly resolves primary pain point; 1 = tangential) |
| **Feasibility** | 35% | How achievable is this given known constraints? (5 = buildable with existing tech/team now; 1 = requires breakthrough technology) |
| **Viability** | 20% | How well does it align with HITS business strategy and sustainability? (5 = directly supports goals; 1 = works against strategy) |

**Weighted score** = (Desirability × 0.45) + (Feasibility × 0.35) + (Viability × 0.20)

---

## Scoring Matrix

| # | Concept | HMW Source | Desirability | Feasibility | Viability | Weighted Score | Recommendation |
|---|---------|-----------|:------------:|:-----------:|:---------:|:--------------:|----------------|
| 1 | Smart Study Feed | HMW-1 | 5 | 3 | 5 | **3.80** | Explore Further |
| 2 | Progress Tracker Dashboard | HMW-3 | 4 | 4 | 4 | **4.00** | Park |
| 3 | Quick-Match Cards | HMW-1 | 4 | 4 | 3 | **3.80** | Park |
| 4 | Study Completion Wizard | HMW-3, HMW-4 | 5 | 4 | 5 | **4.65** | Prototype |
| 5 | Impact Feed | HMW-7 | 4 | 5 | 5 | **4.55** | Prototype |
| 6 | Micro-Contribution Modules | HMW-4 | 5 | 2 | 4 | **3.75** | Explore Further |
| 7 | Research Champion Network | HMW-8, HMW-6 | 4 | 5 | 5 | **4.55** | Prototype |
| 8 | Smart Screener Flow | HMW-5 | 4 | 4 | 5 | **4.20** | Prototype |

### Score Calculation Verification

| # | D×0.45 | F×0.35 | V×0.20 | Total |
|---|:------:|:------:|:------:|:-----:|
| 1 | 2.25 | 1.05 | 1.00 | 3.80 |
| 2 | 1.80 | 1.40 | 0.80 | 4.00 |
| 3 | 1.80 | 1.40 | 0.60 | 3.80 |
| 4 | 2.25 | 1.40 | 1.00 | 4.65 |
| 5 | 1.80 | 1.75 | 1.00 | 4.55 |
| 6 | 2.25 | 0.70 | 0.80 | 3.75 |
| 7 | 1.80 | 1.75 | 1.00 | 4.55 |
| 8 | 1.80 | 1.40 | 1.00 | 4.20 |

---

## Evaluation Notes (Concepts Scoring ≥ 3.0)

### Concept 4: Study Completion Wizard (4.65) — HIGHEST

**Strengths:**
- Directly addresses the single highest-friction moment in the HITS experience (completion itself), earning the top desirability score
- Save-and-resume capability alone could recover a significant portion of the estimated 30–40% abandoned studies
- Uses proven wizard/step patterns — low UX risk, high user comprehension
- Absorbs the best elements of the Progress Tracker Dashboard (progress bars, quick-resume, deadlines) into one cohesive concept

**Risks:**
1. Survey tool integration complexity — HITS likely uses Qualtrics, Microsoft Forms, and custom tools. The wizard wrapper must adapter-integrate with each without breaking study functionality.
2. Over-engineering for simple studies — a 2-question survey wrapped in a full wizard feels like filing taxes. Requires a "lightweight mode" threshold.

**Hybrid potential:** Combine with Micro-Contribution Modules (Concept 6) — the wizard could expose individual modules as resumable steps, creating a unified "contribute in pieces" experience.

---

### Concept 5: Impact Feed (4.55) — TIED 2ND

**Strengths:**
- Exceptional feasibility (5/5) — technically the simplest build. Core is a content template + feed view with optional push notifications.
- Addresses the most neglected lifecycle stage (post-study). Participants currently receive nothing after submission.
- "Your Voice Shipped" moments create intrinsic motivation far more durable than extrinsic rewards (gift cards, raffles).
- Social sharing via Viva Engage creates organic discovery and viral recruitment.

**Risks:**
1. Researcher adoption is the critical dependency. If researchers don't publish impact updates, the feed stays empty. Must include nudge systems and auto-generated stubs.
2. Time lag between participation and visible impact (weeks to months) may weaken the emotional connection.

**Hybrid potential:** Natural companion to Research Champion Network (Concept 7) — Champions can amplify impact stories within their teams, creating a virtuous cycle.

---

### Concept 7: Research Champion Network (4.55) — TIED 2ND

**Strengths:**
- Leverages the most powerful driver of behavior change: social influence from trusted peers. Enterprise research consistently shows peer advocacy outperforms platform notifications.
- Extremely low technical investment — primarily a program design with lightweight sharing tools and a dashboard.
- Creates organic discovery channels that scale with organization size without engineering work.
- Builds a research-positive culture — a systemic improvement beyond any single feature.

**Risks:**
1. Champion volunteer fatigue — initial enthusiasm may wane without sustained recognition and purpose. Program needs ongoing curation.
2. Uneven coverage — some orgs may have no Champions, creating blind spots in reach.

**Hybrid potential:** Perfect complement to Impact Feed (Concept 5). Champions share impact stories, creating social proof. Impact Feed provides Champions with content to share.

---

### Concept 8: Smart Screener Flow (4.20)

**Strengths:**
- Eliminates the most time-consuming researcher task (~3 hrs/study of manual screening). Direct operational value.
- Prevents the demoralizing participant experience of post-enrollment disqualification.
- Graceful mismatch redirects ("These studies fit you better!") turn rejections into positive experiences and increase overall participation.
- Profile-based auto-screening for returning participants makes enrollment faster over time.

**Risks:**
1. Adding a step before enrollment may reduce conversion for studies with already-low interest. Must be fast (<60 seconds) and feel welcoming, not gate-keeping.
2. Screener quality depends on researcher input — poorly written questions lead to false disqualifications.

**Hybrid potential:** Natural pairing with Smart Study Feed (Concept 1) — the feed handles discovery, the screener confirms fit before enrollment.

---

### Concept 2: Progress Tracker Dashboard (4.00)

**Strengths:**
- Intuitive dashboard pattern that participants understand immediately.
- Gamification elements (streaks, stats) drive intrinsic motivation for repeat participation.
- Reward visibility creates tangible incentive loops.

**Risks:**
1. Dashboard fatigue — Microsoft employees already navigate multiple dashboards (Viva, Azure DevOps). Another "My X" dashboard risks low adoption.
2. Overlaps heavily with Study Completion Wizard — progress bars, resume, and deadlines are covered by Concept 4.

**Hybrid potential:** Best elements absorbed into Study Completion Wizard (in-progress tracking) and Impact Feed (lifetime stats and reward history).

---

### Concept 1: Smart Study Feed (3.80)

**Strengths:**
- Transforms discovery from "hunt" to "receive" — transformative for time-pressed participants.
- Microsoft ecosystem advantage — Graph API provides uniquely rich signals (calendar, org data, skills profile).
- Recommendation quality improves over time, creating a flywheel effect.

**Risks:**
1. Large engineering investment requiring ML pipeline, Graph API integration, and mandatory privacy impact assessment. Timeline risk is significant.
2. Cold-start problem for new employees with no participation history.

**Hybrid potential:** Pair with Smart Screener (Concept 8) for a complete discover→qualify flow. Long-term, the feed's preference signals could power screener auto-fill.

---

### Concept 3: Quick-Match Cards (3.80)

**Strengths:**
- Extremely fast decision-making — playful, engaging interaction that stands out from enterprise UX.
- Implicit preference learning from swipe patterns improves recommendations without explicit setup.
- Mobile-first design pattern with strong consumer precedent.

**Risks:**
1. Enterprise cultural fit — swipe mechanics may feel too casual for Microsoft's internal tool culture. Requires cultural validation.
2. Accessibility compliance for gesture-based interaction adds disproportionate effort.

**Hybrid potential:** Card format insights (scannable, decision-optimized) should inform the Smart Study Feed's card design even if swipe mechanic is deferred.

---

### Concept 6: Micro-Contribution Modules (3.75)

**Strengths:**
- Fundamentally solves the time-availability problem that plagues busy participants.
- Partial data is still valuable — reduces waste from all-or-nothing study designs.
- Natural mobile fit and gamification potential.

**Risks:**
1. Requires researchers to fundamentally rethink study architecture — significant organizational change management challenge.
2. Not all study types decompose cleanly; some require sequential context that fragments poorly.

**Hybrid potential:** Could be implemented as a feature within the Study Completion Wizard — studies that support modular design get the micro-contribution option, others get standard guided flow.

---

## Shortlisted Concepts

| Priority | Concept | Weighted Score | Recommendation |
|:--------:|---------|:--------------:|----------------|
| P0 | **Study Completion Wizard** | 4.65 | Prototype |
| P1 | **Impact Feed** | 4.55 | Prototype |
| P2 | **Research Champion Network** | 4.55 | Prototype |
| P3 | **Smart Screener Flow** | 4.20 | Prototype |

## Rationale

The shortlist prioritizes concepts that deliver the highest user impact with achievable effort, while covering the full participation lifecycle (complete → feel valued → discover next). The Study Completion Wizard earns P0 because it addresses the most critical metric — study completion rate — at the moment of highest friction. Impact Feed and Research Champion Network are prioritized together because they are complementary and both low-effort: the Feed provides content, Champions amplify it socially, and together they build the organizational culture shift that sustains long-term participation. Smart Screener Flow rounds out the shortlist by addressing the researcher side of the equation (matching quality) and preventing the demoralizing post-enrollment disqualification experience. Notably, the Champion Network represents a non-conventional "social/organizational" approach rather than a pure platform feature — ensuring the shortlist isn't limited to conventional product thinking.

---

## Parked Concepts

| Concept | Score | Reason | Disposition |
|---------|:-----:|--------|-------------|
| Smart Study Feed | 3.80 | Highest effort (L) with significant privacy review timeline risk. Strategic value is undeniable but can't be prototyped quickly. | **Explore Further** — begin technical discovery and privacy review in parallel. Phase 1 rule-based matching can proceed after initial concepts ship. |
| Progress Tracker Dashboard | 4.00 | Functional overlap with Study Completion Wizard (both address progress visibility). Best elements merged into Wizard. | **Park** — standalone dashboard deferred. Progress bars, streaks, and resume absorbed into Concept 4. |
| Quick-Match Cards | 3.80 | Enterprise culture fit risk + disproportionate accessibility effort for the strategic value delivered. | **Park** — revisit for mobile-first context. Card design insights inform Smart Study Feed's UI. |
| Micro-Contribution Modules | 3.75 | Requires fundamental study architecture change — too high organizational friction for initial launch. | **Explore Further** — prototype the concept within Completion Wizard for studies that naturally decompose into modules. |

---

## Value vs. Effort Plot

```
High Value │
           │  ★ Completion Wizard (4.65)
           │
           │  ★ Impact Feed (4.55)    ★ Smart Study Feed (3.80)
           │  ★ Champion Network (4.55)
           │
           │  ★ Smart Screener (4.20)  ★ Micro-Contributions (3.75)
           │  ★ Progress Tracker (4.00)
           │                            ★ Quick-Match Cards (3.80)
Low Value  │
           └──────────────────────────────────────────────────
               Low Effort                         High Effort
```

---

## Next Steps

1. **Document decisions** in `decision-log.md` with full rationale for shortlist selection
2. **Define MVP scope** for each shortlisted concept — smallest version that delivers value
3. **Assign design sequence** — recommend Completion Wizard and Impact Feed first (highest score, achievable effort), then Champion Network and Screener
4. **Begin technical discovery** for parked concepts (Smart Study Feed privacy review, Micro-Contributions architecture)
