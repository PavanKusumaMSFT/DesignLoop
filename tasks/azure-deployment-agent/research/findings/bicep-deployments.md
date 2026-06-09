---
title: "Finding: Bicep Deployments in Azure Portal"
phase: discover
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Researcher Agent"
related:
  - "../azure-deployment-agent-ux-enhancements.md"
  - "inline-editing.md"
  - "agent-discovery.md"
---

# Finding: Bicep Deployments in Azure Portal

## Severity: **Medium** (Strong Trust, UX Polish Needed)

## Summary

Generated Bicep increased trust and transparency. Quality confidence was high; issues were primarily UX-related. There is strong demand for pre-deployment validation and collaborative workflows. Users see Bicep output as a trust-building mechanism, and the browsing experience in the web UI felt IDE-like — but gaps in syntax highlighting, comments, and validation workflows limit its effectiveness.

## Detailed Insights

### Strong Confidence in Generated Quality

Participants expressed strong confidence in the quality of generated Bicep code. They noted modular structure, clear variable usage, and readable formatting. The generated output met or exceeded expectations for auto-generated infrastructure-as-code.

### Cross-Language Acceptance

Even Terraform-first users found Bicep output understandable and acceptable. The syntax was approachable enough that users without Bicep experience could read and reason about the generated code, reducing the barrier to adoption.

### IDE-Like Browsing Experience

Browsing Bicep in the web UI felt IDE-like and increased trust through transparency. Users appreciated being able to inspect the actual infrastructure code that would be deployed, rather than relying on abstract summaries. This transparency was a significant trust driver.

### UX Polish Issues

Several UX issues reduced the effectiveness of the code browsing experience:
- **Lack of syntax highlighting** made code harder to scan and read
- **Limited explanatory comments** left users without context for why specific configurations were chosen
- **Naming inconsistencies** across generated files created confusion about resource relationships

### Pre-Deployment Validation Demand

Participants consistently expected a pre-deployment validation step similar to Terraform's `plan` command or Azure Portal's "Review + Create" pattern. Expected validations included:
- Quota and region capacity checks
- Policy compliance verification
- Dependency validation
- Destructive change detection and warnings

### Production vs. Test Confidence

Confidence was high for test and greenfield scenarios. For production deployments, users wanted additional verification and peer review before execution. This hesitation was driven by process expectations (organizational approval workflows), not doubts about code quality.

## Recommendations

| # | Recommendation | Priority |
|---|---------------|----------|
| 1 | Mirror Azure Portal's Review + Create and Terraform's `plan` experience for a pre-deployment review step | **HIGH** |
| 2 | Validate workloads before deployment — proactively surface issues (quotas, policies, dependencies, destructive changes) and recommend fixes | **HIGH** |
| 3 | Enable richer IaC editing: syntax highlighting, diff views, cross-file edits, lightweight changes | **HIGH** |
| 4 | Support direct inline editing within the IaC context pane (prompt-only editing perceived as unclear) | **MEDIUM** |
| 5 | Design for collaborative async deployment workflows: PR creation, review, iteration, approval | **MEDIUM** |
| 6 | Conduct additional research for production-grade deployment scenarios | **LOW** |

## Design Implications

- **Pre-deployment validation component**: Design a dedicated validation step that runs checks (quotas, policies, dependencies, destructive changes) and presents results in a clear, actionable format before deployment execution
- **Enhanced code viewer with syntax highlighting**: Upgrade the code browsing experience with syntax highlighting, line numbers, and search — matching the quality of VS Code's read-only editor
- **Collaborative PR/review workflow**: Design a workflow that supports creating pull requests from generated Bicep, routing them for peer review, and tracking approval status before deployment
- **Inline edit affordances**: Provide direct edit capabilities within the IaC context pane for lightweight changes, with clear visual feedback on what was modified

## Related Findings

- [Inline Editing](inline-editing.md) — Editing expectations within the Bicep context pane directly inform the inline editing design
- [Agent Discovery](agent-discovery.md) — Workflow expectations (plan → validate → deploy) reflect the same IDE-driven mental models that drive agent discovery expectations
