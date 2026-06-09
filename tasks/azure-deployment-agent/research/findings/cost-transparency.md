---
title: "Finding: Cost Transparency & Performance Trade-offs"
phase: discover
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Researcher Agent"
related:
  - "../azure-deployment-agent-ux-enhancements.md"
  - "version-diffing.md"
---

# Finding: Cost Transparency & Performance Trade-offs

## Severity: **High**

## Summary

Cost transparency and performance trade-off understanding are core user expectations that are currently unmet. Users want cost information early, granular, and contextual — not as an afterthought. The absence of meaningful cost signals at decision points undermines confidence and forces users to leave the workflow to estimate costs externally.

## Detailed Insights

### Cost–Performance Trade-off Visibility

Participants expected to understand how architectural decisions — swapping services, changing SKUs, adjusting tiers, modifying scaling configurations — affected both cost AND performance. Cost alone was insufficient; users needed to see the trade-off between what they would pay and what they would get in return.

### Early Cost Information

Cost information was expected early in the workflow, not after decisions had already been made. Users wanted cost signals during the planning and configuration phases, so they could make cost-informed decisions before committing to a deployment path.

### Granularity Beyond Aggregates

A single aggregate cost estimate was insufficient. Participants wanted visibility into major cost drivers at the individual service and SKU level. Aggregate totals were useful as a summary, but without breakdowns, users could not identify which resources were driving costs or where optimization opportunities existed.

### Proactive Risk Signals

Users expected proactive signals and warnings for budget, scaling, or operational risks prior to deployment. Rather than discovering cost surprises after deployment, they wanted the system to flag potential issues — such as resources that would exceed budget thresholds, auto-scaling configurations with high cost ceilings, or tier selections with known cost pitfalls.

## Recommendations

| # | Recommendation | Priority |
|---|---------------|----------|
| 1 | Surface cost impact of architectural changes alongside price-performance trade-offs | **HIGH** |
| 2 | Provide service-level and SKU-level cost breakdowns in addition to overall estimates | **HIGH** |
| 3 | Support flexible cost views across time horizons (hourly, monthly) | **MEDIUM** |
| 4 | Highlight high-impact resources and offer optional links to deeper Azure pricing details | **MEDIUM** |
| 5 | Surface early warnings for budget/scaling risks before deployment | **MEDIUM** |

## Design Implications

- **Cost estimation component redesign**: Replace or augment the current aggregate-only cost display with a multi-level component that shows total, service-level, and SKU-level breakdowns
- **Inline cost signals in diff views**: Embed cost impact indicators within the version diff experience so users can see cost implications of each change in context
- **Cost breakdown panels**: Provide expandable panels or drill-down views that allow users to inspect cost drivers at progressively finer granularity
- **Risk warning system**: Design a proactive warning system that flags budget, scaling, and operational risks with clear thresholds and actionable recommendations

## Related Findings

- [Version Diffing](version-diffing.md) — Cost trade-offs within the diff context were highly valued; the diff view is a natural integration point for cost signals
