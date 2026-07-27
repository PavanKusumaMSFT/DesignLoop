---
description: "Use when setting up MCP servers, configuring API tokens, or troubleshooting MCP connections for Figma, Playwright, Microsoft Graph, or Storybook"
---

# MCP Server Setup Guide

## Figma MCP

**Server**: `@anthropic/mcp-server-figma`

### Setup
1. Go to [Figma Developer Settings](https://www.figma.com/developers) → Personal Access Tokens
2. Generate a token with read access to your design files
3. When prompted by VS Code, enter your Figma access token

### Capabilities
- Read Figma files and inspect layers
- List components and component sets
- Extract design tokens (colors, typography, spacing)
- Get styles and variables
- Read comments and version history

### Used By
- `@Designer` — Extract tokens and inspect component specs
- `@Handoff` — Reference designs for developer documentation

---

## Send to Figma (prototype → real Azure Fluent 2 components)

The **"Send to Figma"** action on each prototype card pushes a prototype into a
Figma file as **real Azure Fluent 2 component instances** — Blade header, Site
header, Data grid, Essentials, Toolbar, Search box, Card, etc. — with the correct
variants, property values, and library text styles, for high-fidelity engineering
handoff. Components that can't be matched fall back to editable native layers
(auto-layout frames, fills/strokes/corner radius, real text). It is the reverse of
`/figma-to-fluent`.

The path uses the **DesignLoop Figma plugin** — **no Claude, no MCP, no OAuth**.
The bridge produces a **build spec** and streams it over a local WebSocket to the
plugin, which instantiates it via the Figma Plugin API.

### Two modes (env `FIGMA_RUNNER`)
- **`agent` (default)** — the bridge runs the `fluent-to-figma` Copilot agent,
  which reads the prototype source plus `figma-plugin/azure-fluent2-kit.json` and
  `.github/skills/fluent-to-figma/azure-fluent2-guidelines.md` and authors a build
  spec of real component instances. Best fidelity for Azure-portal-style pages.
- **`plugin`** — the bridge serializes the live prototype DOM (Playwright) and
  maps detected Fluent v9 components to Azure kit keys automatically (no agent
  run). Faster, lower fidelity.

Both modes require the plugin connected and both render through the same build-spec
executor in `figma-plugin/code.js`.

### One-time setup (install the plugin)
1. Open the **Figma desktop app**.
2. Menu → **Plugins → Development → Import plugin from manifest…**
3. Select `figma-plugin/manifest.json` from this repo.
4. Open the target Figma file, then run **Plugins → Development → DesignLoop**.
   A small panel shows **“Connected to DesignLoop bridge”** — keep it open.
5. Click **Send to Figma** on a prototype card and paste the target Figma **file
   URL** once (saved per task and reused). Instances land on a new page named
   `DesignLoop — <prototypeId>`; the card shows an **In Figma** deep link when done.

The plugin talks to the bridge at `ws://127.0.0.1:8099/figma-plugin` (allow-listed
in `figma-plugin/manifest.json → networkAccess`). See `figma-plugin/README.md`.

### Enable the Azure Fluent 2 libraries (one-time, no "Learn kit" needed)
The Azure Fluent 2 component **keys are global**, so there is **no Learn-kit step**
for them. In the target file, enable these libraries (Assets → Libraries) so the
plugin can import instances by key:
- **Azure UI Kit** (`q2TdO4dVcMhNWYp0N6Bc05`)
- **Pattern Templates** (`TXALL9CS0727dvGcZo84Bg`)
- **Icons — Azure Fluent Extension** (`fQO2yNBwr773QI4ANvb1Z4`)

### Custom kit (optional "Learn kit")
Only if you send into a file that uses a **custom/private** kit (not the global
Azure keys): open that kit file (components **published as a library**), run the
DesignLoop plugin, click **Learn kit**. Keys are saved to
`bridge/data/figma-kit.json` and used as a fallback when a component isn't in the
global Azure map. `GET /api/figma/kit` reports the learned map.

> **Legacy MCP runners.** `FIGMA_RUNNER=copilot` (Copilot CLI + Figma's local
> desktop MCP on `127.0.0.1:3845`) and `FIGMA_RUNNER=claude` (Claude Code + remote
> `https://mcp.figma.com/mcp`) remain as fallbacks, but the local Dev Mode MCP is
> read-only and the write MCP is client-gated, so the plugin path is the default.

### How it works
- The user clicks **Send to Figma** and pastes the Figma **file URL** once. The
  bridge saves it per task (`tasks/<id>/.task.json` `figmaFile`, or a per-user
  `bridge/data/figma-targets.json` fallback) and reuses it for that task's prototypes.
- `POST /api/figma/send { prototypeId, taskId?, figmaUrl? }` (default `agent`
  runner) returns **409 `needsPlugin`** with a hint if no plugin is connected.
  Otherwise it creates a single manual job and dispatches to `runFigmaAgentBuild`
  (agent authors a spec to `bridge/data/figma-specs/<jobId>.json`, which the bridge
  reads on process close and sends to the plugin; falls back to the deterministic
  path if the agent yields no spec) or `runFigmaPluginBuild` (serialize →
  annotate with Azure keys → build spec). It sends `{type:'build', jobId,
  pageName, spec}` to the plugin. Plugin progress/done/error is relayed to the job
  SSE stream; the terminal `done` status carries a `link` deep link
  (`…?node-id=…`) and instanced-vs-fallback counts. `GET /api/figma/plugin-status`
  reports connection state; `GET /api/figma/target?id=<id>` reports the saved target.
- The prototype workspace is behind MSAL, so the serializer appends
  `?auditBridge=1` (the workspace's built-in headless-tooling bypass).
- Fonts that don't exist in Figma (Segoe UI, Aptos, …) fall back to **Inter**.

### Used By
- Prototype card **Send to Figma** CTA (any workspace-rendered prototype)
- `figma-plugin/` (DesignLoop plugin) + bridge `/figma-plugin` WebSocket relay
- `/fluent-to-figma` skill / `@fluent-to-figma` agent (authors the build spec in
  agent mode)

---

## Playwright MCP

**Server**: `@anthropic/mcp-server-playwright`

### Setup
No authentication required. Playwright launches a local browser instance.

### Capabilities
- Navigate to URLs and take screenshots
- Interact with page elements (click, type, scroll)
- Run accessibility audits (axe-core integration)
- Capture full-page and element screenshots
- Execute JavaScript in page context

### Used By
- `@Tester` — Automated accessibility audits and usability verification
- `@Prototyper` — Preview and screenshot prototypes

---

## Microsoft Graph MCP

**Server**: `mcp-server-microsoft-graph`

### Setup
1. Register an app in [Azure Portal](https://portal.azure.com/) → App registrations
2. Grant API permissions: `Files.ReadWrite`, `Mail.Send`, `ChannelMessage.Send`, `User.Read`
3. Create a client secret
4. When prompted, enter your Tenant ID, Client ID, and Client Secret

### Capabilities
- **Word**: Create and read `.docx` documents (research briefs, PRDs)
- **Excel**: Create and read `.xlsx` spreadsheets (data analysis, scoring matrices)
- **PowerPoint**: Create and read `.pptx` presentations (concept decks)
- **Teams**: Send messages and channel posts (phase notifications, handoff alerts)

### Used By
- `@Researcher` — Create research briefs in Word
- `@Strategist` — PRDs in Word, data analysis in Excel
- `@Ideator` — Concept presentations in PowerPoint
- `@Handoff` — Send handoff notifications via Teams
- `@Design Lead` — Phase transition updates via Teams

---

## Storybook MCP

**Server**: `mcp-server-storybook`

### Setup
1. Ensure Storybook is running locally (`npm run storybook`)
2. Default URL: `http://localhost:6006`
3. When prompted, confirm or update the Storybook URL

### Capabilities
- List all stories and component documentation
- Read component source and props
- Capture story screenshots for visual comparison
- Check component states and variants

### Used By
- `@Prototyper` — Publish and verify component stories
- `@Handoff` — Reference component docs for developer specs
