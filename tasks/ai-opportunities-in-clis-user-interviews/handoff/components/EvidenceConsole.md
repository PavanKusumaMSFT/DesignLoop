---
title: "Handoff Component Reference: Evidence Console"
phase: deliver
status: approved
created: 2026-07-12
updated: 2026-07-12
author: "Handoff Agent"
related: ["../../designs/component-spec.md", "../../prototypes/demos/EvidenceConsole.html", "../implementation-guide.md"]
---

# Handoff Component Reference: Evidence Console

## Overview

This handoff reference mirrors the design contract for an opt-in command-review component. It is a reference implementation target, not a live AI or command-execution contract.

## Props and States

Implement `enabled`, `intent`, `suggestion`, `checks`, `environmentNotice`, `onInsert`, and `onToggle` exactly as described in [the design component specification](../../designs/component-spec.md). Preserve disabled, empty-intent, suggestion-ready, correction-ready, and no-execution notice states.

## Accessibility Contract

Use native controls, descriptive labels, an associated error, a polite live region for state changes, and an explicit label for validation boundaries. Do not use a confidence score as a substitute for category-level evidence.

## Next Steps

- [ ] Add unit and accessibility tests alongside the production component.