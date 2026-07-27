---
name: fluent-to-figma
description: "Send a DesignLoop prototype into a Figma file as real Azure Fluent 2 component instances by authoring a build spec the DesignLoop Figma plugin renders."
argument-hint: "Prototype/task id plus the target Figma file (e.g., 'prototype cost-dashboard into https://figma.com/design/<key>/...')"
---

# Fluent to Figma

> This skill runs on the **Copilot CLI** and does **not** call any Figma tool or
> MCP. It authors a **build spec** (JSON) describing the design in terms of real
> Azure Fluent 2 library components. The DesignLoop bridge hands that spec to the
> connected **DesignLoop Figma plugin**, which instantiates the components in the
> target file. Your only job is to write the best possible build spec to the
> file path given in the invoking prompt.

## Goal

Reconstruct a DesignLoop prototype inside a Figma file as **real Azure Fluent 2
library component INSTANCES** — Site Header, Blade header, Service Menu, Toolbar,
Data Grid, Essentials, Card, SearchBox, TabList, Form, etc. — instantiated by
their global component **keys**, configured with the correct **variants** and
**property IDs**, with **library text styles** and **icon swaps**. Never redraw a
component as manual frames/rectangles/text. The plugin adds the result as a new
**Page** in the user-provided file.

## Reference material (read in this order)

1. **`figma-plugin/azure-fluent2-kit.json`** — authoritative, machine-readable
   map: component keys, variant-specific keys, set keys, property IDs, text-style
   keys, icon keys, and layout defaults. Prefer these keys.
2. **`.github/skills/fluent-to-figma/azure-fluent2-guidelines.md`** — the full
   Azure Fluent 2 guidance: Component Instantiation Rules (CRITICAL), Master
   Component Key Reference, Variant Selection, property-ID formats, Typography
   Application (text-style keys), Auto-Layout Rules, full-page blade recipes, and
   pitfalls. This is your primary reference for keys and page structure.
3. **The prototype source** — `prototype-workspace/app/<prototypeId>/page.tsx`
   and every file under `prototype-workspace/components/projects/<prototypeId>/`.
   Optionally read the live render at `liveUrl` (append `?auditBridge=1`) to
   recover exact copy, order, and geometry. Do not screenshot-import.

## Procedure

1. **Understand the prototype.** Read the source (and, if helpful, the live DOM)
   to identify each region and which Azure Fluent 2 component represents it.
   Follow the guidelines' "Search Before You Create" and the Golden Rules — every
   recognizable element must be a component instance, not a hand-drawn frame.
2. **Choose keys + variants.** For each element pick the best key from the kit
   json / guidelines. Prefer a **variant-specific key** (`key`); when only a set
   key exists, use `setKey` plus a `variant` object. Set text/boolean properties
   using the exact `Name#ID:N` property IDs from the guidelines.
3. **Text.** Use `styleKey` from the kit's `textStyles` (Web/Title 3, Web/Body 1,
   Web/Caption 1, …) for every text node instead of hardcoding font properties.
4. **Layout.** Wrap flex regions in auto-layout frames using the guideline
   defaults (`gap: 12`, horizontal `padding: 20`, `primaryAlign: "MIN"`). Use
   `layoutSizing`/`stretch`/`grow` for children that fill. Only use absolute x/y
   on a frame when the source is genuinely absolute.
5. **Icons.** Swap service/resource icons by key via `iconSwaps` where relevant.
6. **Write the spec.** Emit ONLY the JSON build spec (no markdown fences, no
   prose) to the exact file path given in the prompt. Then print
   `SPEC_WRITTEN <path>`.

## Build-spec schema

```jsonc
{
  "page": "DesignLoop — <prototypeId>",
  "root": <node>
}
```

`node` is one of:

- **frame** — `{ "op":"frame", "name":str, "size":{"w":n,"h":n},
  "layout":{ "mode":"VERTICAL|HORIZONTAL", "gap":n, "padding":[t,r,b,l],
  "primaryAlign":"MIN|CENTER|MAX|SPACE_BETWEEN", "counterAlign":"MIN|CENTER|MAX",
  "widthMode":"FIXED|AUTO", "heightMode":"FIXED|AUTO" },
  "fill":{"r":0-1,"g":0-1,"b":0-1,"a":0-1}, "radius":n, "clip":bool,
  "children":[node], "x":n, "y":n,
  "layoutSizing":{"h":"FILL|HUG|FIXED","v":"..."}, "stretch":bool, "grow":bool }`
- **instance** — `{ "op":"instance", "key":"<variant key>",
  "setKey":"<set key when key is a set>", "variant":{"Prop":"Value"},
  "props":{"Page title#32630:2":"…"}, "label":str,
  "textOverrides":{"<layer name>":str},
  "iconSwaps":[{"find":"<layer name>","key":"<icon key>"}],
  "size":{"w":n,"h":n}, "layoutSizing":{...}, "stretch":bool }`
- **text** — `{ "op":"text", "chars":str, "styleKey":"<text style key>",
  "color":{...}, "align":"left|center|right", "width":n }`

Notes:
- `variant` and `props` are both applied via the instance's property setter, one
  key at a time (a bad key is skipped, never fatal). Use the exact property-ID
  format from the guidelines.
- Children of an auto-layout frame are positioned by the layout — do not set x/y
  on them; use `layoutSizing`/`stretch`/`grow` instead.

## Hard rules

- Real component instances (by key) for every recognizable element — **no**
  manual frames/rectangles mimicking a component, **no** screenshot import.
- Library text styles (`styleKey`) for text; auto-layout for flex regions.
- Write ONLY valid JSON to the given path; do not modify any other repo file and
  do not call any Figma tool/MCP.
- The plugin creates a new Page — never target existing pages/frames.
