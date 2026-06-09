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
