# UI Tenets & Traps — Framework Reference

> **Source:** Microsoft *UI Tenets & Traps* — [SharePoint site](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Home.aspx?web=1).
> This file is the canonical taxonomy used by the `tenets-traps-evaluation` skill. Findings in
> evaluation reports must map to a **Tenet** (with a link back to its page) and one or more **Traps** below.

UI Tenets & Traps is a heuristic framework for evaluating user interfaces — *"100 years of research in your hands."*
**Tenets** describe general attributes of good interface design. **Traps** describe common design problems
that degrade that goodness. There are **9 Tenets** and **26 Traps** organized under them.

---

## How to apply the framework

From [How To Use](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/How_To_Use.aspx?web=1):

1. Identify the tasks most important to the target user.
2. Walk through the different ways users might complete each task.
3. Identify and log any **Traps** observed; note **severity**.
4. When more than one Trap applies to an issue, log all applicable Traps.
5. When classification is unclear, check which **Tenets** are being degraded.
6. When multiple issues are connected, look for the **root-cause Trap**.
7. Cross-validate with other reviewers if possible.
8. Use the framework to facilitate discussion (shared language).

---

## The Nine Tenets

| # | Tenet | Promise | Page |
|---|-------|---------|------|
| 1 | **Understandable** | "I know what I can do" | [Understandable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Understandable.aspx?web=1) |
| 2 | **Comfortable** | "Interaction is effortless" | [Comfortable](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Comfortable.aspx?web=1) |
| 3 | **Responsive** | "I don't wait" | [Responsive](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Responsive.aspx?web=1) |
| 4 | **Efficient** | "I take fewer steps and process less information" | [Efficient](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Efficient.aspx?web=1) |
| 5 | **Forgiving** | "I can undo my actions" | [Forgiving](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Forgiving.aspx?web=1) |
| 6 | **Discreet** | "I don't overshare" | [Discreet](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Discreet.aspx?web=1) |
| 7 | **Protective** | "I don't lose my data" | [Protective](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Protective.aspx?web=1) |
| 8 | **Habituating** | "I quickly achieve mastery" | [Habituating](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Habituating.aspx?web=1) |
| 9 | **Beautiful** | "I like how it looks and feels" | [Beautiful](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Beautiful.aspx?web=1) |

### 1. Understandable — "I know what I can do"
A great UI has either been previously learned or can be quickly learned; the goal is rapid learning. Sub-tenets:
- **Perceptible** — an element can be perceived with one of the user's senses.
- **Noticeable** — a cue is visible *and* presented so the user attends to it.
- **Comprehensible** — users attend to and correctly interpret groupings, symbols, language, memory demands, and feedback.

### 2. Comfortable — "Interaction is effortless"
Users can perform actions quickly and comfortably. Focus on **legibility** (read text quickly and error-free)
and **accurate targeting** (acquire targets quickly and error-free; cf. Fitts's Law).

### 3. Responsive — "I don't wait"
The UI responds quickly to what the user asks. The most critical absolute threshold for detecting time passage is
within **100 ms** of activation: confirm within 100 ms, respond fast for "easy" actions, and give appropriate
progress feedback for longer waits.

### 4. Efficient — "I take fewer steps and process less information"
Users perceive they are doing things in a minimal number of steps (perception matters as much as actual reduction).
Facets: **Prioritized**, **Spatial**, **Remembers**, **Previews**, **Predictive When Certain**.

### 5. Forgiving — "I can undo my actions"
The user can undo what they previously did. Humans make mistakes frequently; letting users rewind actions is one of
technology's most valuable abilities.

### 6. Discreet — "I don't overshare"
The UI lets the user operate in social contexts with minimal embarrassment or disruption to others.

### 7. Protective — "I don't lose my data"
Data and work are never lost unintentionally.

### 8. Habituating — "I quickly achieve mastery"
Over time the user does things automatically. Facets: **Sense of Home**, **Non-Redundant**, **Modeless**, **Consistent**.

### 9. Beautiful — "I like how it looks and feels"
The user finds the design attractive. Beautiful objects are perceived as easier to use, and users are more forgiving
of interfaces they find attractive.

---

## The 26 Traps (organized by Tenet)

### Understandable traps
| Code | Trap | Description |
|------|------|-------------|
| 1.1 | **Invisible Element** | No cue is provided to signal how to achieve a goal, and the user lacks enough prior learning to compensate. |
| 1.2 | **Effectively Invisible Element** | A cue exists but is not noticed (or is slow to be noticed) because its appearance or location differs from expectation. |
| 1.3 | **Distraction** | Something suddenly draws attention away from the user's goal. |
| 1.4 | **Uncomprehended Element** | A critical cue is noticed, but its meaning or method of interaction is unclear. |
| 1.5 | **Inviting Dead End** | A cue looks like the right path to a goal but is actually wrong. |
| 1.6 | **Poor Grouping** | A critical relationship between cues is not obvious. |
| 1.7 | **Forced Syntax** | The system does not allow commands/steps in the order or manner most natural to the user. |
| 1.8 | **Memory Challenge** | The system requires users to remember information that is easy to forget. |
| 1.9 | **Feedback Failure** | The system fails to provide noticeable, comprehensible, and actionable feedback in response to user actions. |

### Comfortable traps
| Code | Trap | Description |
|------|------|-------------|
| 2.1 | **Physical Challenge** | An action required by the system is physically effortful, difficult, or impossible. |
| 2.2 | **Accidental Activation** | The system misinterprets a physical action, causing an unintended outcome. |

### Responsive traps
| Code | Trap | Description |
|------|------|-------------|
| 3.1 | **Slow or No Response** | The user is prevented from achieving a goal in a timely manner due to actual/perceived poor performance or inaccessible information/resources. |
| 3.2 | **Captive Wait** | The system intentionally prevents the user from advancing or backing out in a timely manner. |

### Efficient traps
| Code | Trap | Description |
|------|------|-------------|
| 4.1 | **Unnecessary Step** | When used as intended, the number of actual or perceived steps is too high. |
| 4.2 | **System Amnesia** | The system re-prompts for information it already gathered or fails to leverage prior work. |
| 4.3 | **Information Overload** | Information is comprehensible, but there is too much of it. |
| 4.4 | **Bad Prediction** | The system incorrectly predicts or interprets the user's intent or preference. |

### Forgiving trap
| Code | Trap | Description |
|------|------|-------------|
| 5.1 | **Irreversible Action** | The system does not allow the user to undo an action. |

### Discreet trap
| Code | Trap | Description |
|------|------|-------------|
| 6.1 | **Unwanted Disclosure** | The system makes the user's data or behavior public in a harmful or embarrassing way. |

### Protective trap
| Code | Trap | Description |
|------|------|-------------|
| 7.1 | **Data Loss** | The system can lose the user's work through action or inaction on the user's part. |

### Habituating traps
| Code | Trap | Description |
|------|------|-------------|
| 8.1 | **Gratuitous Redundancy** | Duplicate cues for the same action on the same or directly nested level of the UI. |
| 8.2 | **Variable Outcome** | The same user action produces different system responses at different times or contexts. |
| 8.3 | **Wandering Element** | The location of a cue for a given action varies across the UI. |
| 8.4 | **Inconsistent Appearance** | The visual appearance of a cue for a given action varies across the UI. |
| 8.5 | **Ambiguous Home** | No single clear place to return to for reorientation/new task, or competing homes. |

### Beautiful trap
| Code | Trap | Description |
|------|------|-------------|
| 9.1 | **Unattractive Appearance** | The UI is aesthetically unpleasing, inconsistent, and/or inappropriate for its intended users. |

---

## Severity scale (for logging Traps)

| Severity | Definition |
|----------|------------|
| **Critical** | Blocks task completion or causes data loss; users cannot proceed or recover. |
| **High** | Major friction; many users will struggle, make errors, or abandon the task. |
| **Medium** | Noticeable friction; users can complete the task but with effort, confusion, or extra steps. |
| **Low** | Minor polish or edge-case issue; limited impact on task success. |

---

## Source pages

Home · What Are Tenets & Traps · How To Use · Tenets & Traps · the nine Tenet pages · the 26 Trap pages —
all under [microsoftapc.sharepoint.com/teams/UITenetsTraps](https://microsoftapc.sharepoint.com/teams/UITenetsTraps/SitePages/Home.aspx?web=1).
