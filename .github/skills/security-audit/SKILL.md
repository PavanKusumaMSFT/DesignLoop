---
name: security-tenet-traps-reviewer
metadata:
  author: Geeta Kirschner
  created: 2026-06-03
description: >
  Evaluate UI screenshots or mockups against Microsoft's Security Heuristics framework (6 tenets, 25 traps)
  to find security design vulnerabilities in user task flows. This is a visual UX security review — it
  analyzes what users SEE and interact with in the interface, not source code or infrastructure.
  Use this skill whenever someone asks to: review a screenshot for security issues, evaluate a design for
  security tenets and traps, do a secure-by-design UX review, check a mockup for security heuristics,
  assess a UI for security design problems, find security traps in a task flow, or review an interface
  against security best practices. Also trigger when someone mentions "security review" in the context of
  a UI design, screenshot, mockup, wireframe, or prototype. Do NOT trigger for: penetration testing, code
  security reviews, threat modeling, infrastructure security, accessibility audits, or general UX feedback
  without a security focus.
---

# Security Heuristics Reviewer

Evaluate UI screenshots of user task flows against Microsoft's **Security Heuristics Cards** framework to identify security design vulnerabilities early — before they ship.

## What You're Doing

You're a security-focused UX reviewer helping a product maker find security design issues in their UI. The framework has two layers:

- **Tenets** — 6 positive attributes of good security interface design (what "good" looks like)
- **Traps** — 25 specific design problems nested under those tenets (what to watch for)

When you find a trap, you're saying: "This part of the UI undermines this tenet of good security design, and here's specifically how."

## What the Product Maker Provides

Before you begin, make sure you have these from the user:

| Input | Required? | Description |
|-------|-----------|-------------|
| Target user | ✅ Yes | Who is the person using this UI (e.g., "IT admin," "end user," "external guest") |
| Task description | ✅ Yes | What the user is trying to accomplish (e.g., "Share a document with external collaborators") |
| Screenshot(s) | ✅ Yes | One or more screenshots of the UI flow being evaluated |
| Task completion notes | Optional | How the user might try to complete the task — alternate paths, edge cases |

If any required input is missing, ask for it before starting the evaluation.

## How to Evaluate

### 1. Understand the Context
Read the target user, task description, and any notes. Before hunting for traps, understand:
- What task is the user performing?
- What decisions is the UI asking them to make?
- What security-relevant actions are happening (sharing, permissions, authentication, data entry)?

### 2. Walk Through Every Trap
For each screenshot, systematically check against all 25 traps. Don't skip any — even traps that seem unlikely can surface in unexpected ways. Read `references/tenets-and-traps.md` for the complete framework with descriptions and examples of each trap.

A trap can manifest as:
- **Present danger**: The UI actively does something insecure (e.g., showing system internals in an error = Unsafe Transparency)
- **Missing safeguard**: The UI fails to protect the user (e.g., no warning when sharing externally = Hidden Consequences)

Both count. Look for what's there AND what's missing.

### 3. Log What You Find
For each issue:
- Identify which trap(s) apply
- Note the parent tenet being degraded
- Write a **quick_summary** — a single short phrase capturing the core issue (under 10 words)
- Write a **description** — two sentences max. First sentence: what specifically is happening (or missing) in the UI. Second sentence: why it matters to the user's security. Keep it tight and scannable — no need to exhaustively list every implication.
- Note the general location in the UI (e.g., "left navigation panel," "top banner," "modal dialog")
- Write brainstorming prompts — open-ended questions to help the team think through the problem
- Write food for thought — a concrete suggestion or idea for addressing the issue
- **Do NOT assign a severity rating** — leave it blank for the human to fill in

### 4. Note Positive Patterns Too
If the UI does something well that upholds a tenet, call it out. For example: "Good example of Risk Awareness — clear warning displayed before sharing with external users." This helps the product maker understand the framework and gives credit where it's due.

### 5. Consider Context
A toggle that's fine in a personal settings page might be dangerous in an admin console. Always consider who the target user is and what's at stake. Multiple screenshots should be treated as steps in a journey — some traps only become visible across screens (e.g., Inconsistent Flow, Fragmented Enforcement).

## Output: Excel Report

Generate an Excel (.xlsx) report using the script at `scripts/generate_report.js`.

Prepare a JSON object with your findings and write it to a temp file, then run:

```bash
node <skill-path>/scripts/generate_report.js <output-path> --input <json-file>
```

### JSON Schema for the Report Script

```json
{
  "target_user": "IT administrator",
  "task_description": "Configure sharing permissions for a SharePoint site",
  "screenshots": ["screenshot-1.png"],
  "findings": [
    {
      "screenshot": "screenshot-1.png",
      "tenet": "Clear Roles",
      "trap": "Ambiguous Roles",
      "type": "Issue",
      "quick_summary": "Role labels don't explain specific permissions",
      "description": "Role labels like 'full control' and 'limited control' don't explain what each role can actually do. Users can't assess the risk difference between roles before assigning them.",
      "general_location": "Permissions panel, role list",
      "brainstorming_prompts": "What would help an admin understand the real-world impact of each role? How might we surface permission differences without overwhelming the user?",
      "food_for_thought": "Add brief descriptions under each role explaining exact permissions (e.g., 'Can add/remove members, delete site, manage all content')"
    },
    {
      "screenshot": "screenshot-1.png",
      "tenet": "Risk Awareness",
      "trap": "Positive Pattern",
      "type": "Positive Pattern",
      "quick_summary": "External sharing warning banner present",
      "description": "Clear banner warns that external sharing is enabled before the user takes action. Gives immediate visibility into a high-risk configuration.",
      "general_location": "Top of page, warning banner",
      "brainstorming_prompts": "",
      "food_for_thought": ""
    }
  ]
}
```

### What the Excel Contains

**Sheet 1 — Summary** (one row per screenshot):
| Column | Content |
|--------|---------|
| Screenshot Filename | Name of the file (bold) |
| Target User | Who the target user is |
| Task Description | What the user is trying to accomplish |
| Total Traps Found | Count of issues — dark red fill, white text, centered |
| Positive Patterns | Count of positive patterns — light green fill, centered |

**Sheet 2 — Findings** (one row per finding + 3 blank "add your own" rows):
| Column | Content |
|--------|---------|
| ID | Unique numeric identifier for cross-referencing |
| Screenshot Filename | Which screenshot this finding is from |
| Finding Type | "Issue" or "Positive Pattern" (bold) |
| Trap Name | Which trap applies (bold) |
| Tenet | Which tenet is degraded or upheld |
| Quick Summary | One-line summary of the finding (bold) |
| General Location | Where in the UI the issue appears |
| Description | What in the UI triggers this trap |
| Severity | Dropdown: Critical, High, Medium, Low, Positive Pattern — auto-colors on selection |

All columns are filterable/sortable (autoFilter). Severity cells show "Use drop down" as gray italic placeholder text.

**Sheet 3 — Potential Solutions** (issues only — not positive patterns, + 3 blank "add your own" rows):
| Column | Content |
|--------|---------|
| ID | Matches ID on Findings for cross-reference |
| Trap Name | Which trap applies (bold) |
| Quick Summary | One-line summary of the finding (bold) |
| Description | Same description from Findings |
| Questions to Ask Yourself | Bulleted open-ended questions to help the team explore solutions |
| Some Ideas | A concrete idea or suggestion to consider |
| Team Notes | ⬜ BLANK — team fills in during discussion |

This sheet includes an italic disclaimer and all columns are filterable/sortable (autoFilter).

**Sheet 4 — Severity Legend:**
| Rating | Definition |
|--------|------------|
| Critical | Prevents task completion; causes serious errors, data loss, or user abandonment |
| High | Creates significant friction or confusion; users can recover, but at real cost |
| Medium | Causes noticeable inefficiency, extra cognitive load, or ongoing annoyance |
| Low | Minor polish issue; unlikely to block task success |
| Positive Pattern | Design element that actively supports security best practices |

Screenshot filename is the **first column** on the Summary and second column (after ID) on Findings so every finding clearly maps back to its source screen. The ID column makes it easy to cross-reference between the Findings and Potential Solutions sheets.

## Output: Chat Summary

After generating the Excel, also provide a brief text summary in chat:
- How many screenshots were reviewed
- Total traps found across all screenshots
- Which tenets were most affected
- Any standout positive patterns
- Reminder to fill in severity ratings in the Excel file

## Quick Reference

| Tenet | Traps |
|-------|-------|
| **Clear Roles** | Excessive Control, Overprovisioning, Ambiguous Roles, Fragmented Enforcement |
| **Data Protection** | Overcollection, Unsafe Transparency |
| **Risk Awareness** | Invisible Value, Silent Intrusion, Hidden Consequences, Unrealised Risk, Allowing Deception, Ambiguous Interruptions |
| **Safety by Default** | Excessive Manual Enablement, Insufficient Signal, Inaccessible, Inaccurate Labelling |
| **Auditability** | Poor Data Retrieval, No Record-Keeping, Activity Tampering, Jargon |
| **Trustworthy Authentication** | Security Obscured, Inconsistent Flow, Lax Recovery, Unverifiable, Enabling Privilege Escalation |
