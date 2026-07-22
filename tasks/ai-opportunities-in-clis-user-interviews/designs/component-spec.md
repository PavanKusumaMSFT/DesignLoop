---
title: "Component Specification: Evidence Console"
phase: design
status: approved
created: 2026-07-12
updated: 2026-07-12
author: "Designer Agent"
related: ["wireframe-spec.md", "design-token-document.md", "../prototypes/demos/EvidenceConsole.html", "../handoff/components/EvidenceConsole.md"]
---

# Component Specification: Evidence Console

## Overview

Evidence Console collects a goal, presents a reviewable CLI suggestion, and keeps validation scope explicit. It is designed as a composite component with separate input, status, notice, command preview, and action controls.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `enabled` | `boolean` | required | Enables intent generation and context use. |
| `intent` | `string` | required | User-entered desired outcome. |
| `suggestion` | `string` | required | Display-only proposed command. |
| `checks` | `ValidationCheck[]` | required | Named validation categories and outcomes. |
| `environmentNotice` | `string` | required | Explicit non-validation boundary. |
| `onInsert` | `() => void` | required | Inserts into the host terminal after user action. |
| `onToggle` | `(enabled: boolean) => void` | required | Changes opt-in state. |

`ValidationCheck` is `{ label: string; state: "checked" | "notice" | "unavailable"; detail: string }`.

## Variants and States

The component has `enabled` and `disabled` variants. It supports default, hover, focus-visible, input-error, suggestion-ready, correction-ready, and local-run-notice states. Loading must reserve status-row space and announce only a concise update.

## Accessibility Requirements

- Use a real checkbox switch or `button[aria-pressed]` with an accessible label.
- Associate input feedback with `aria-describedby`; use `aria-invalid="true"` after a failed submit.
- Announce generation, correction, and local-run updates through a polite `aria-live` region without moving focus.
- Keep command text selectable; do not expose it as an editable field unless editing is supported.
- Support Tab / Shift+Tab, Enter for buttons, Space for the switch, and Escape only for transient menus if one is introduced.

## Token Dependencies

`--color-neutral-*`, `--color-teal-600`, `--color-green-700`, `--color-amber-800`, `--color-focus-500`, `--spacing-*`, typography, radius, elevation, and motion tokens from [design-token-document.md](design-token-document.md).

## Next Steps

- [ ] Keep the handoff component reference synchronized with any production TypeScript interface.