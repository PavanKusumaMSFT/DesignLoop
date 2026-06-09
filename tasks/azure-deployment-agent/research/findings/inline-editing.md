---
title: "Finding: Inline Editing Functionality"
phase: discover
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Researcher Agent"
related:
  - "../azure-deployment-agent-ux-enhancements.md"
  - "bicep-deployments.md"
---

# Finding: Inline Editing Functionality

## Severity: **Medium**

## Summary

Inline editing was a study focus area, but findings were primarily captured within the Bicep deployment context. Available evidence suggests that prompt-only editing was perceived as unclear, and users preferred direct inline edits for lightweight changes within the IaC context pane. Detailed behavioral data specific to inline editing requires additional extraction from session recordings.

## Detailed Insights (Extracted from Bicep Findings)

### Prompt-Only Editing Perceived as Unclear

When users needed to make changes to generated infrastructure code, the prompt-based editing approach was often perceived as unclear. Users were uncertain about what their prompt would change, whether changes would be isolated to a specific resource, and how to verify the result before it was applied.

### Preference for Direct Inline Editing

Users expected direct inline editing within the IaC context pane — the ability to click into a value, modify it, and see the change reflected immediately. This aligns with IDE-driven mental models where code is directly editable, not indirectly modified through conversational prompts.

### Editing Thresholds

There exist implicit editing thresholds in users' mental models:
- **Lightweight inline edits**: Small, targeted changes (renaming a resource, adjusting a SKU, modifying a parameter value) should be possible directly within the web UI
- **Full VS Code experience**: Larger, structural changes (refactoring modules, adding new resources, modifying complex logic) should transition to a full IDE experience

### Designed Intent

Inline editing was designed to allow quick, contextual changes without leaving the primary workflow. The feature aimed to reduce context-switching costs and keep users within the deployment flow for minor adjustments.

### Study Evaluation Goals

The study was intended to evaluate whether inline editing:
- Reduced cognitive load compared to prompt-based editing
- Improved efficiency for lightweight configuration changes
- Aligned with users' existing mental models for code editing

## Data Gap Note

> **Note**: Detailed findings specific to inline editing behaviors, cognitive load measurements, and efficiency comparisons were not fully captured in the available study summary. The inline editing findings presented here are primarily extracted from the Bicep deployment context. Additional data extraction from session recordings and observer notes is recommended to fully characterize inline editing usability.

## Recommendations

| # | Recommendation | Priority |
|---|---------------|----------|
| 1 | Support direct inline editing within the IaC/configuration context (not prompt-only) | **HIGH** |
| 2 | Define clear thresholds for when inline editing is appropriate vs. when to transition to VS Code | **MEDIUM** |
| 3 | Ensure inline edits provide immediate visual feedback and validation | **MEDIUM** |
| 4 | Conduct focused follow-up research specifically on inline editing behaviors and preferences | **LOW** |

## Design Implications

- **Inline edit component design**: Design an inline editing experience that supports direct value editing within code/configuration views — click-to-edit with in-place validation and immediate visual feedback
- **Edit mode transitions**: Define clear transition points where the system suggests moving to VS Code for more complex edits, with a seamless handoff that preserves context
- **Contextual validation**: Inline edits should trigger immediate validation (syntax, compatibility, dependency) with clear success/error states
- **Threshold-based mode switching**: Design the system to recognize edit complexity and suggest the appropriate editing mode — inline for simple changes, VS Code for structural modifications

## Related Findings

- [Bicep Deployments](bicep-deployments.md) — The primary source of inline editing evidence; editing within the IaC pane was observed and discussed in the context of Bicep code browsing
