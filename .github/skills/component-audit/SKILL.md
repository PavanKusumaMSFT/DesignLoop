---
name: component-audit
description: "Audit a Fluent prototype page or component for design system violations, missed shared component reuse, and Fluent Copilot misuse without modifying code."
argument-hint: "Target file or component path (e.g., 'prototype-workspace/app/foo/page.tsx')"
---

# Component Audit

## When to Use

- Reviewing a prototype page or component after code generation
- Checking a target file for token, styling, icon, accessibility, or shared-component violations
- Producing a prioritized read-only diagnostic before refactoring

This skill is read-only for target code. Do not modify implementation files. Write only the audit report markdown.

## Workspace Contract

All work targets the Fluent prototype workspace at `prototype-workspace/` in the DesAIgns repo root.

- Run discovery commands from `prototype-workspace/`.
- Shared components live in `prototype-workspace/components/shared/`.
- Per-task prototype pages live at `prototype-workspace/app/{taskId}/page.tsx`.
- Per-task components live at `prototype-workspace/components/projects/{taskId}/*.tsx`.
- Pattern lookup lives at `prototype-workspace/component-map.json`.
- Full Fluent inventory and rules live at `prototype-workspace/AGENTS.md`.
- Azure service logos live in `prototype-workspace/public/azure-service-icons/{category}/*.svg`.
- Custom portal icons live in `prototype-workspace/public/icons/*.svg`.
- UI chrome icons come from `@fluentui/react-icons`.


## Procedure

### 1. Identify Target and Report Path

Read the requested target file or component reference. Determine `{taskId}` from the path when possible.

Write the audit report to:

- `tasks/{taskId}/prototypes/audit-{component}.md`

If `{taskId}` cannot be determined, use a clear kebab-case task id from the request and state the assumption in the report.

### 2. Discover Available Components

Before flagging missed reuse, confirm what already exists.

```bash
# From prototype-workspace/
grep -r "export.*function\|export default" components/shared/ --include="*.tsx" -l
grep -r "export.*function\|export default" components/shared/action-card.tsx components/shared/metric-card.tsx components/shared/resource-status-table.tsx components/shared/alert-summary-card.tsx components/shared/cost-summary-card.tsx components/shared/service-tile.tsx 2>/dev/null
grep -r "export.*CardProps\|export.*TableProps\|export.*TileProps" components/ --include="*.tsx"
```

Also inspect `prototype-workspace/component-map.json` and `prototype-workspace/AGENTS.md`.

## Required Discovery Commands

Run these from `prototype-workspace/` before creating or replacing UI:

```bash
# Pattern lookup: inspect pattern to shared-component mappings
cat component-map.json | node -e "const m=JSON.parse(require('fs').readFileSync('/dev/stdin','utf-8')); Object.entries(m.patterns || m).forEach(([k,v]) => console.log(k + ': ' + (Array.isArray(v) ? v.map(c => c.component || c).join(', ') : JSON.stringify(v))))"

# Shared components by keyword
grep -rn "export.*KEYWORD" components/shared/ --include="*.tsx"

# Existing project components by keyword
grep -rn "export.*KEYWORD" components/projects/ --include="*.tsx"

# Fluent v9 primitives
node -e "console.log(Object.keys(require('@fluentui/react-components')).filter(k => /^[A-Z]/.test(k) && /KEYWORD/i.test(k)).join('\n'))"

# Fluent Copilot primitives
node -e "console.log(Object.keys(require('@fluentui-copilot/react-copilot')).filter(k => /KEYWORD/i.test(k)).join('\n'))"
```

Replace `KEYWORD` with the pattern, component, or UI need you are implementing or auditing.


### 3. Read and Categorize the Target Code

For each target file, extract:

1. Imports from Fluent, Fluent Copilot, shared components, icons, styles, and assets
2. `makeStyles` blocks and token usage
3. Inline `style={...}` props
4. JSX tree and visual wrapper patterns
5. Literal colors, typography, spacing, radius, shadows, and state values
6. Icon implementation and asset source
7. Copilot/agent/chat UI implementation
8. Accessibility basics: labels, alt text, keyboard controls, focus handling, text truncation

### 4. Detect Violations

#### P0 Critical

- Hardcoded colors except `transparent`, `currentColor`, `inherit`, `none`, and Azure brand blues `#0078D4`, `#106EBE`, `#005A9E`
- Hardcoded typography values that should use Fluent font tokens
- Tailwind, CSS Modules, or raw CSS patterns in Fluent prototype code
- Missing SafeTokens pattern when the file uses `makeStyles` or tokens

#### P1 High

- Inline styles that are not truly dynamic
- Custom card/form/table/button/badge/dialog/tab wrappers where Fluent provides primitives
- Missed shared components such as `ActionCard`, `MetricCard`, `ResourceStatusTable`, `AlertSummaryCard`, `CostSummaryCard`, `ServiceTile`, `DockedChatPanel`, `AgentLayout`, `CopyButton`, and `wizard-*`
- Custom agent/chat/prompt/feedback/reasoning/citation UI where Fluent Copilot provides components
- Inline SVG or wrong icon source tier
- State colors hardcoded instead of Fluent hover/pressed/focus/disabled tokens

#### P2 Medium

- Hardcoded spacing, radius, borders, or shadows where Fluent tokens exist
- Layout values that conflict with `prototype-workspace/AGENTS.md` rhythm
- Reusable UI patterns implemented inline instead of project components

#### P3 Info

- Text truncation without `Tooltip` or title where users may lose context
- Minor accessibility concerns that require product judgment
- Opportunities to improve naming, prop shape, or future reuse

### 5. Generate the Report

Use this exact structure:

```markdown
# Component Audit Report — [FileName]

## Summary
- Shared components used: N
- Hardcoded color violations: N
- Hardcoded typography violations: N
- Hardcoded spacing violations: N
- State token violations: N
- Inline style violations: N
- Missed shared component opportunities: N
- Missing SafeTokens pattern: yes/no
- Copilot library violations: N (only if file has AI/agent UI)

## P0 — Critical (fix immediately)
1. **[violation]** — line N: `value` → `recommended replacement`

## P1 — High (fix this session)
1. **[violation]** — lines N-M: issue → recommendation

## P2 — Medium (fix when touching this file)
1. **[violation]** — line N: issue → recommendation

## P3 — Info (review for accessibility)
1. **[info]** — line N: issue → recommendation

## Already Correct
- Uses ProjectLayout: yes/no
- Uses makeStyles: yes/no
- Uses SafeTokens pattern: yes/no
- Icons use approved sources: yes/no
- Interactive states use Fluent tokens: yes/no

## Evidence and Discovery Notes
- Shared-component searches performed
- Fluent primitive searches performed
- Fluent Copilot searches performed, if applicable
```

### 6. Verify

Self-check against `.github/skills/component-audit/VERIFY.md` before writing the report.

## Do NOT

- Do not modify target implementation files.
- Do not flag legitimate layout exceptions: `0`, percentages, viewport units, `repeat(..., 1fr)`, `1200px` max-width, `800px` side-panel width, `48px 32px` content padding, or `768px` search width.
- Do not suggest replacements that lose functionality.
- Do not skip line numbers or prioritized severity.
