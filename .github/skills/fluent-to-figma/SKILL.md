---
name: fluent-to-figma
description: "Send a DesignLoop prototype into a Figma file as editable native layers (frames, auto-layout, text, variables) via the Figma MCP write tools."
argument-hint: "Prototype/task id plus the target Figma file URL (e.g., 'prototype cost-dashboard into https://figma.com/design/<key>/...')"
---

# Fluent to Figma

> This skill runs on the **Copilot CLI** and uses the connected **`figma` MCP
> server** (Figma's local desktop Dev Mode MCP server at `127.0.0.1:3845`, which
> needs no OAuth and is not client-gated). If `FIGMA_RUNNER=claude` is set the
> bridge routes it through Claude Code + the remote Figma MCP instead; the
> procedure below is identical either way.

## Goal

Reconstruct a DesignLoop prototype inside a Figma file as **editable native
Figma layers** — real frames with **auto-layout**, real **text nodes**, and
fills/strokes/radii/spacing **bound to Figma variables** (not raw hex/px).
No screenshot import, no flattened images, no rasterized frames.

The design is added as a **new Page** inside the **user-provided target Figma
file** (MCP cannot create a new file). Reuse the same file across a task's
prototypes; add one Page per send, named after the prototype.

## Inputs (provided in the invoking prompt)

- `prototypeId` / `taskId` — the prototype route id (e.g. `cost-dashboard`).
- `figmaFileUrl` and `figmaFileKey` — the target Figma file.
- `liveUrl` — the running prototype, e.g. `http://localhost:3100/<prototypeId>`.
- Source paths in this repo:
  - Page: `prototype-workspace/app/<prototypeId>/page.tsx`
  - Components: `prototype-workspace/components/projects/<prototypeId>/*.tsx`
  - Shared components used: `prototype-workspace/components/shared/`
  - Fluent rules/inventory: `prototype-workspace/AGENTS.md`
- Reverse token map: run
  `node prototype-workspace/scripts/fluent-to-figma-map.mjs`
  to print the **Fluent token → Figma variable name** table
  (`FLUENT_TO_FIGMA`). Use it to bind variables; `FLUENT_SIZE_VALUES` gives the
  literal px fallback when a variable is missing from the file's library.

## Preconditions

1. The `figma` MCP server is connected and listed in your tools. On the Copilot
   CLI this is Figma's local desktop server (enable it in Figma → Preferences →
   “Enable local MCP server” / Dev Mode MCP server; it listens on
   `127.0.0.1:3845`). If it is not available, stop and report that the Figma
   local MCP server must be enabled.
2. The target file is open/accessible to the signed-in Figma desktop account.

## Procedure

### 1. Read the prototype source

Read `app/<prototypeId>/page.tsx` and every file under
`components/projects/<prototypeId>/`. Build a tree of:

- Layout regions and nesting (which `makeStyles` classes wrap what).
- Fluent primitives used (`Card`, `Button`, `Text`/`Title2`/`Body1`, `Badge`,
  `Field`, `Table`, `Avatar`, etc.) and shared components from
  `components/shared/`.
- For each styled element, the Fluent tokens referenced in `makeStyles`
  (`colorNeutralBackground1`, `spacingHorizontalM`, `borderRadiusMedium`, …),
  plus `display:flex` direction/gap/padding (→ auto-layout), and typography
  ramp (`fontSize*`, `fontWeight*`, `lineHeight*`).

### 2. (Optional) Read live geometry

If `liveUrl` is reachable, you may inspect the rendered DOM/computed styles to
recover exact sizes and order. Do not screenshot-import; use it only to inform
frame sizes and layout that are ambiguous from source.

### 3. Map Fluent tokens → Figma variables

For every color/radius/stroke/spacing/typography value, translate the Fluent
token to its Figma variable via `FLUENT_TO_FIGMA`. Bind the layer property to
that **variable**. Only if the variable is absent in the target file's library,
fall back to the literal value from `FLUENT_SIZE_VALUES` (sizes) or the Fluent
default color, and record the fallback in your summary.

### 4. Create the page + native layers via Figma MCP write tools

Using the Figma MCP **write** tools (create-frame / auto-layout / text /
set-variable-binding style operations exposed by the connected server):

1. Create a **new Page** in the target file named `DesignLoop — <prototypeId>`.
2. Recreate the layout as nested **auto-layout frames** matching the flex
   direction, `gap`, and `padding` from the source. Never use absolute
   positioning where the source uses flex.
3. Create real **text nodes** for every `Text`/`Title2`/`Body1`/label, with the
   mapped typography variables and the actual copy from source.
4. Recreate Fluent primitives as grouped native layers (e.g. a `Button` = an
   auto-layout frame + text + bound brand background/foreground + corner
   radius), reusing your own components on the page where a primitive repeats.
5. **Bind variables** for all fills, strokes, corner radius, and spacing — do
   not hardcode hex/px when a variable exists.

### 5. Report

Return: the Figma **page deep link** (file URL + `node-id` of the new page),
the count of frames/text nodes created, and a list of any tokens that fell back
to literals (unmapped variables).

## Hard rules

- Editable native layers only — **no** image/screenshot import, no flattened or
  rasterized output.
- Auto-layout for anything that is flex in source; absolute only for truly
  absolute source positioning.
- Bind Figma **variables**; raw hex/px only as an explicitly-reported fallback.
- One new Page per send; never overwrite existing pages/frames in the file.
- Do not modify any repo files — this skill only writes into Figma.
