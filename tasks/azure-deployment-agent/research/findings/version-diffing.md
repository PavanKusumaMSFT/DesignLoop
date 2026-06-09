---
title: "Finding: Workload Plan Version Diffing"
phase: discover
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Researcher Agent"
related:
  - "../azure-deployment-agent-ux-enhancements.md"
  - "cost-transparency.md"
---

# Finding: Workload Plan Version Diffing

## Severity: **Low** (Positive Reception — Enhancement Opportunities)

## Summary

The diff experience strongly resonated with participants. Side-by-side tables, color coding, and clear labels made changes easy to scan, understand, and track. Users viewed this as significantly superior to their existing manual comparison workflows. Findings in this area focus on enhancement opportunities rather than fundamental problems.

## Detailed Insights

### Intuitive and Comprehensive Experience

Participants consistently described the version diffing experience as intuitive, comprehensive, and easy to follow. The combination of visual differentiation (color coding) with structured tabular layouts allowed rapid scanning of changes without deep reading.

### Fluid Summary-to-Detail Navigation

The ability to move fluidly between high-level summaries and detailed drill-downs supported both quick reviews and deep inspection workflows. Users valued being able to get a rapid overview and then selectively dive into areas of interest — a pattern that matched their existing review behaviors.

### Rich Explanatory Content

Participants valued the explanatory content embedded within diffs: configuration details, best-practice flags, trade-offs, costs, and alternatives. This contextual information reduced the need to consult external documentation and supported more informed decision-making within the diff view itself.

### Default Diff Expectations

Users expected version differences to be shown automatically by default, without requiring manual triggering. The preferred comparison was between the current version and the immediately previous version (two-version comparison).

### Version History and Rollback

Participants expected access to recent version history — typically the last 3–5 versions. All participants expected rollback as part of an iterative "try → validate → undo if needed" workflow. Rollback was seen as a safety net that enabled confident experimentation.

### Mixed Reception of Formal Baseline Versioning

Opinions on formal baseline versioning (named snapshots, milestone markers) were mixed. Some saw value for production workflows, but there was no strong consensus. This suggests the feature is not urgently needed and should be deferred until clearer user demand emerges.

## Recommendations

| # | Recommendation | Priority |
|---|---------------|----------|
| 1 | Group related resources, add search/filtering, and use collapsible sections to manage complexity | **HIGH** |
| 2 | Refine labeling to clearly distinguish introduced, updated, unchanged, and removed resources — especially for SKU modifications | **HIGH** |
| 3 | Add succinct high-level summaries of what changed and why within diff tables | **MEDIUM** |
| 4 | Enhance visual context through auto-generated architecture/deployment diagrams | **MEDIUM** |
| 5 | Default to two-version comparisons (current vs. previous); support rollback to the last 3–5 versions | **MEDIUM** |
| 6 | Defer formal baseline versioning until clearer user demand emerges | **LOW** |

## Design Implications

- **Enhanced diff component**: Add search/filter capabilities, resource grouping (by service type, resource group, change type), and collapsible sections for managing large diffs
- **Refined change labels**: Design a labeling taxonomy that distinguishes introduced, updated, unchanged, and removed — with special treatment for SKU/tier modifications that are updates but feel like replacements
- **Rollback controls**: Integrate rollback affordances directly within the diff view, enabling users to revert to any of the last 3–5 versions
- **Architecture diagram integration**: Auto-generate lightweight architecture or deployment topology diagrams that reflect the current vs. previous state, embedded within the diff view

## Related Findings

- [Cost Transparency](cost-transparency.md) — Cost trade-offs surfaced within diffs were highly valued; the diff view is a natural location for cost impact signals
