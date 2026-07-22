---
title: "useCapability"
phase: deliver
status: draft
created: 2026-07-13
updated: 2026-07-13
author: "Handoff Agent"
related:
  - "prototypes/src/hooks/useCapability.ts"
  - "designs/component-specs.md"
  - "ideation/decision-log.md"
  - "strategy/requirements-prd.md"
---

# useCapability (hook)

> The capability-detecting rendering layer (concept C17) as a React hook. It resolves a
> **single render tier** — `rich → plain → suppressed` — that the entire overlay honours in
> lockstep, so every surface degrades together and no component can render richer than its
> environment allows (FR-6, NG1, NG3). It **fails DOWN** to the plainer tier whenever the probe
> is uncertain (safe default).

## Overview

- **Maps to:** FR-6 (graceful cross-environment degradation), concept C17, NFR-3.
- **Not a component** — a pure `useMemo`-backed hook. In production the `CapabilityInput` comes
  from real terminal capability detection (TTY, overlay support, AI-terminal, az-context); in
  the prototype the inputs are **injected** so the cascade is testable.
- **Consumed by:** `OverlayHost`, which maps the result to the `variant` prop passed to every
  child (`rich`/`plain`) or renders nothing (`suppressed`).

## API

```ts
function useCapability(input: CapabilityInput): CapabilityResult;
```

### Input — `CapabilityInput`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `isInteractiveTty` | `boolean` | — (required) | `false` in CI / piped / no-TTY contexts ⇒ **suppressed** (State F-2). |
| `supportsOverlays` | `boolean` | — (required) | `false` on constrained/limited terminals ⇒ **plain** (State F-1). |
| `isAzContext` | `boolean` | — (required) | The command's token-0 is `az`. Otherwise **everything suppresses** (State E — FR-5 non-az passthrough). |
| `suggestionsEnabled` | `boolean` | `true` | User has globally disabled Cirrus surfaces (AC-4.3) ⇒ **suppressed**. |
| `isAiTerminal` | `boolean` | `false` | AI-terminal surface: expose context, draw no UI ⇒ **suppressed** (AC-6.3, compose don't compete — NG2). |

### Output — `CapabilityResult`

| Field | Type | Description |
|-------|------|-------------|
| `variant` | `'rich' \| 'plain' \| 'suppressed'` | The render tier every child honours in lockstep. |
| `isRich` | `boolean` | Convenience: `variant === 'rich'`. |
| `isPlain` | `boolean` | Convenience: `variant === 'plain'`. |
| `isSuppressed` | `boolean` | Convenience: `variant === 'suppressed'`. |

## Resolution cascade

The tier is resolved in this exact order (hard suppression gates first):

```
if (!isAzContext)        → 'suppressed'   // State E — non-az passthrough (FR-5)
if (!isInteractiveTty)   → 'suppressed'   // State F-2 — CI / piped / no-TTY
if (isAiTerminal)        → 'suppressed'   // AC-6.3 — compose, don't compete
if (!suggestionsEnabled) → 'suppressed'   // AC-4.3 — user-disabled
else supportsOverlays
     ? 'rich'                             // State A–D — full inline UI
     : 'plain';                           // State F-1 — plain advisory text
```

**Fail-down principle:** when a probe is uncertain, prefer the *plainer* tier. Never render
`rich` speculatively — a wrong `rich` guess risks breaking a constrained surface; a wrong
`plain`/`suppressed` guess only under-delivers.

## Component mapping (`ComponentVariant`)

`RenderVariant` (`rich | plain | suppressed`) is the hook's tier. Child components accept the
narrower `ComponentVariant` (`rich | plain`) — `suppressed` is handled by `OverlayHost`
rendering nothing at all:

| `variant` | `OverlayHost` behaviour | Child `variant` prop |
|-----------|-------------------------|----------------------|
| `rich` | Full overlay UI rendered | `'rich'` |
| `plain` | Command line + plain advisory lines only | `'plain'` |
| `suppressed` | **Only the command line** — no overlays, no keybindings held | (children not rendered) |

## Accessibility notes

- The hook itself renders nothing, so it has no ARIA surface. Its correctness *is* an
  accessibility guarantee: `suppressed` means Cirrus holds **no keybindings** and draws
  nothing, so it can never trap or interfere (NG2/NFR-3).
- Because the tier drives every child in lockstep, degraded surfaces never present a mix of
  rich (colour-dependent) and plain output that could confuse AT.

## Usage Examples

```tsx
import { useCapability } from 'cirrus-prototype';
import type { CapabilityInput } from 'cirrus-prototype';

const capability: CapabilityInput = {
  isInteractiveTty: process.stdout.isTTY,
  supportsOverlays: terminalSupportsOverlays(),
  isAzContext: commandTokens[0] === 'az',
  suggestionsEnabled: userSettings.cirrusHints,
  isAiTerminal: detectAiTerminal(),
};

const { variant, isSuppressed } = useCapability(capability);
if (isSuppressed) return null; // draw nothing, hold no keys
```

### Do / Don't

- ✅ **Do** compute one `CapabilityResult` at the host and pass the derived `variant` down.
- ❌ **Don't** let individual components probe capability independently — they must degrade in
  lockstep.
- ✅ **Do** default new uncertain probes to the plainer tier.
- ❌ **Don't** treat a missing/unknown TTY as interactive — that would render rich UI into a
  script and break it (AC-6.2).

## Related

- `OverlayHost` — the sole consumer; maps the result to child `variant` / suppression.

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-07-13 | Initial developer API spec | Handoff Agent |
