# DesignLoop Figma plugin

Rebuilds a DesignLoop prototype inside Figma. The preferred output is **real
Azure Fluent 2 component instances** (Blade header, Site header, Data grid,
Essentials, Toolbar, Search box, Card, …) with the correct variants, property
values, and library text styles — for high-fidelity engineering handoff. When a
component can't be matched it falls back to editable native layers (auto-layout
frames, fills, strokes, corner radius, real text). This is the plugin half of the
workspace **"Send to Figma"** button. No Claude, no MCP, no OAuth: the DesignLoop
bridge sends the plugin a build spec over a local WebSocket and the plugin
instantiates it via the Figma Plugin API.

## Two send modes

- **Agent (default, `FIGMA_RUNNER=agent`)** — the bridge runs the
  `fluent-to-figma` Copilot agent, which reads the prototype source plus
  `figma-plugin/azure-fluent2-kit.json` and the Azure Fluent 2 guidelines and
  **authors a build spec** of real component instances. Best fidelity for
  Azure-portal-style pages.
- **Deterministic (`FIGMA_RUNNER=plugin`)** — the bridge serializes the live
  prototype DOM and maps detected Fluent v9 components to Azure kit keys
  automatically (no agent run). Faster, simpler, lower fidelity.

Both modes require the DesignLoop plugin to be connected, and both render through
the same build-spec executor in `code.js`.

## Install (one time)

1. Open the **Figma desktop app** (plugins in Development mode need the desktop app).
2. Menu → **Plugins → Development → Import plugin from manifest…**
3. Choose `figma-plugin/manifest.json` from this repository.

## Enable the Azure Fluent 2 libraries (one time)

The Azure Fluent 2 component **keys are global** — you do **not** need to run
"Learn kit" for them. In the Figma file you send into, enable these libraries via
**Assets → Libraries** so instances can be imported by key:

- **Azure UI Kit** (`q2TdO4dVcMhNWYp0N6Bc05`)
- **Pattern Templates** (`TXALL9CS0727dvGcZo84Bg`)
- **Icons — Azure Fluent Extension** (`fQO2yNBwr773QI4ANvb1Z4`)

## Teach it a custom kit (optional)

If you send into a file that uses a **custom/private** Fluent kit whose keys are
not the global Azure ones, capture them once:

1. Open the **kit** Figma file; its components must be **published as a library**.
2. Run **Plugins → Development → DesignLoop** and click **Learn kit**.
3. The status line shows e.g. *“Kit: 42 components learned”*. The keys are saved
   to `bridge/data/figma-kit.json` and used as a fallback when a component isn't
   in the global Azure map. Re-run whenever your kit changes.

## Use

1. Make sure the **DesignLoop bridge** is running (`node bridge/server.js`, port 8099).
2. Open (or create) the Figma file you want to send designs into, and **enable the
   three Azure Fluent 2 libraries** (Assets → Libraries) so instances can be
   imported by key.
3. Run **Plugins → Development → DesignLoop**. A small panel appears and should
   show **“Connected to DesignLoop bridge”** — keep it open.
4. In the DesignLoop prototype workspace, click **Send to Figma** on a prototype
   card. Paste the Figma **file URL** the first time (saved per task afterwards).
5. Watch progress on the card. When it finishes, a new page named
   `DesignLoop — <prototypeId>` holds the layers, and the card shows an **In
   Figma** deep link. The done message reports how many nodes became real Fluent
   component instances vs. fallback layers.

## How it connects

- The plugin UI (`ui.html`) opens `ws://127.0.0.1:8099/figma-plugin`. A Figma
  plugin can only reach the network from its **UI iframe**, so `ui.html` relays
  messages between the bridge and the plugin's main thread (`code.js`).
- **Learn kit:** `code.js` enumerates published `COMPONENT` nodes
  (`figma.root.findAllWithCriteria`), collects each `{ set, name, key, props }`,
  and posts them over the WS. The bridge groups them by normalized set name into
  `bridge/data/figma-kit.json` and acks with the learned count.
- **Send:** the bridge produces a **build spec** — either the `fluent-to-figma`
  agent authors it (agent mode) or the bridge serializes the live prototype DOM
  and maps detected Fluent v9 components to Azure kit keys (deterministic mode) —
  and sends `{ type: "build", jobId, pageName, spec }`. `code.js` executes the
  spec: each `instance` op is imported by `key` (or `setKey` → default variant)
  via `figma.importComponentByKeyAsync` + `createInstance()`, then configured
  (variant + `Name#ID` property overrides, named-text overrides, icon swaps, and
  library text styles via `figma.importStyleByKeyAsync`); `frame` ops become
  auto-layout frames and `text` ops become text nodes (fonts fall back to
  **Inter** when a prototype font isn't installed). Components that can't be
  imported fall back to primitives. It posts `progress` / `done` / `error` back;
  `done` includes the page node id (for the `…?node-id=…` deep link) and the
  instanced-vs-fallback counts.
- The allow-listed origins live in `manifest.json → networkAccess` (`"*"` so any
  localhost port works during development).

## Files

| File            | Context      | Role                                                        |
| --------------- | ------------ | ----------------------------------------------------------- |
| `manifest.json` | —            | Plugin manifest + `networkAccess` allow-list                |
| `ui.html`       | UI iframe    | WebSocket client + relay (only context allowed to network)  |
| `code.js`       | Main thread  | Learn-kit enumeration + rebuilds the tree as native layers  |

No build step — Figma loads these files directly.
