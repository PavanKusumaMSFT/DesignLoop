# DesignLoop Figma plugin

Rebuilds a DesignLoop prototype inside Figma as **editable native layers** —
frames (fills, strokes, corner radius), real editable text nodes, and — when you
teach it your Fluent kit — **real instances of your published Fluent components**.
This is the plugin half of the workspace **"Send to Figma"** button. No Claude, no
MCP, no OAuth: the DesignLoop bridge renders the live prototype, serializes its
layout, and streams it to this plugin over a local WebSocket.

## Install (one time)

1. Open the **Figma desktop app** (plugins in Development mode need the desktop app).
2. Menu → **Plugins → Development → Import plugin from manifest…**
3. Choose `figma-plugin/manifest.json` from this repository.

## Teach it your Fluent kit (one time, recommended)

Sending as real Fluent component instances (instead of redrawn primitives) needs
the component **keys** from your kit. The Figma Plugin API can't read a team
library's catalog, so you capture the keys once from the kit file itself:

1. Open your **Fluent UI kit** Figma file (the one that defines Button, Card,
   Input, etc.). Its components must be **published as a library**.
2. Run **Plugins → Development → DesignLoop** and click **Learn kit**.
3. The status line shows e.g. *“Kit: 42 components learned”*. The keys are saved
   to `bridge/data/figma-kit.json` and reused for every send.

Skip this and sends still work — every detected component just falls back to
redrawn frames/text. Re-run **Learn kit** whenever your kit changes.

## Use

1. Make sure the **DesignLoop bridge** is running (`node bridge/server.js`, port 8099).
2. Open (or create) the Figma file you want to send designs into. If you learned a
   kit, **enable that library** in this file (Assets → Libraries) so instances can
   be imported by key.
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
- **Send:** the bridge serializes the live prototype's DOM (Fluent v9 components
  are detected by their `fui-<Component>` class), resolves each detected component
  to the best kit variant key, and sends `{ type: "build", jobId, pageName, tree }`.
  `code.js` instances matched components via `figma.importComponentByKeyAsync` +
  `createInstance()` (overriding the first text sublayer with the detected label),
  and rebuilds everything else with `figma.createFrame` / `figma.createText`
  (fonts fall back to **Inter** when a prototype font isn't installed). It posts
  `progress` / `done` / `error` back; `done` includes the page node id so the
  bridge can build a `…?node-id=…` deep link.
- The allow-listed origins live in `manifest.json → networkAccess` (`"*"` so any
  localhost port works during development).

## Files

| File            | Context      | Role                                                        |
| --------------- | ------------ | ----------------------------------------------------------- |
| `manifest.json` | —            | Plugin manifest + `networkAccess` allow-list                |
| `ui.html`       | UI iframe    | WebSocket client + relay (only context allowed to network)  |
| `code.js`       | Main thread  | Learn-kit enumeration + rebuilds the tree as native layers  |

No build step — Figma loads these files directly.
