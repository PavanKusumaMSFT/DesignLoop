---
title: "Implementation Guide: Safe Contextual CLI Completion"
phase: deliver
status: draft
created: 2026-07-12
updated: 2026-07-12
author: "Handoff Agent"
related: ["../designs/design-token-document.md", "components/EvidenceConsole.md", "../prototypes/README.md"]
---

# Implementation Guide: Safe Contextual CLI Completion

## Overview

Implement Evidence Console as a client component that renders suggested commands and validation categories obtained from a governed service. The demo is a visual/interaction reference only: production must not inherit its static claims as real validation.

## Prerequisites

Use a current React and TypeScript application, an approved service for suggestion generation, documented data handling, and a policy-approved documentation source. No environment variables are defined because provider and data policy choices remain unresolved.

## Implementation Steps

1. Import the shared token stylesheet from the design system and use only `var(--...)` values in component styles.
2. Model `ValidationCheck` as `{ label: string; state: "checked" | "notice" | "unavailable"; detail: string }` and render each category separately.
3. Keep intent submission, suggestion rendering, and command insertion as separate actions. Never invoke a terminal, shell, clipboard, or network request from insertion without clear user consent.
4. Render environment-dependent risks as `unavailable` or a boundary notice. Do not display permissions, quotas, or organizational conventions as verified unless a governed source genuinely validates them.
5. Include an opt-in switch and disclose the exact context sent before request submission.

## Basic TypeScript Interface

```ts
export type ValidationCheck = {
  label: string;
  state: "checked" | "notice" | "unavailable";
  detail: string;
};

export type EvidenceConsoleProps = {
  enabled: boolean;
  intent: string;
  suggestion: string;
  checks: ValidationCheck[];
  environmentNotice: string;
  onInsert: () => void;
  onToggle: (enabled: boolean) => void;
};
```

## Do and Don't

| Do | Don't |
|---|---|
| Label each validation category and its limitation. | Collapse checks into an unexplained confidence score. |
| Insert only after a deliberate action. | Auto-run or silently replace a command. |
| Announce state changes politely and preserve focus. | Shift focus on every suggestion update. |
| Treat environment conditions as unverified by default. | Promise permission, quota, or naming validation. |

## Testing Guide

Write unit tests for disabled generation, empty intent, insertion callback, and each validation state. Run axe-core with zero critical or serious violations, then manually test keyboard path, 320px reflow, 400% zoom, VoiceOver/Safari, and an additional screen-reader/browser combination where supported. Compare behavior with [the demo](../prototypes/demos/EvidenceConsole.html).

## Troubleshooting

**Suggestion looks trusted but has no evidence:** require a non-empty validation-category collection and render `unavailable` when evidence is absent.

**Status updates interrupt typing:** use a polite live region and only announce meaningful completed transitions.

**Users expect live execution:** retain explicit labels that insertion and preview are separate from execution.

## Next Steps

- [ ] Resolve service, privacy, and organization approval decisions before connecting real context.
- [ ] Re-run the accessibility review after the framework implementation.