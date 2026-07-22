# DesignLoop — Project-Wide Copilot Instructions

## Project Overview

This is a product design workspace powered by AI agents. Each stage of the design lifecycle is an intelligent loop — driven by one or more specialized agents that iterate and strengthen that stage. These stage-level loops compose into a larger continuous loop spanning the full design process: Discover → Define → Ideate → Design → Prototype → Test → Deliver.

## Output Directory Structure

Each task lives in its own folder under `tasks/<task-id>/`. Within every task, design
artifacts must be organized into phase-specific subdirectories (e.g.
`tasks/<task-id>/research/`). The Home page lists all tasks and lets users browse each
task's artifacts across the full lifecycle.

| Directory (per task) | Phase | Contents |
|----------------------|-------|----------|
| `research/` | Discover | Research briefs, competitive analyses, market insights |
| `strategy/` | Define | Problem statements, personas, journey maps, PRDs |
| `ideation/` | Ideate | Concept docs, feature matrices, decision logs |
| `designs/` | Design | Wireframes, design tokens, component specs |
| `prototypes/` | Prototype | Pointer manifest to `prototype-workspace/` source plus screenshots |
| `tests/` | Test | Test plans, accessibility reports, feedback analysis |
| `handoff/` | Deliver | Implementation specs, component docs, style guides |



## Mandatory Fluent UI React v9 for Design & Prototype

Design and Prototype phase deliverables that become UI must target `prototype-workspace/`, the runnable Next.js 15 + Fluent UI React v9 + Fluent Copilot + Storybook app.

- Use `prototype-workspace/AGENTS.md` as the Fluent inventory/rules source of truth.
- Check `prototype-workspace/component-map.json` and `prototype-workspace/components/shared/` before creating any pattern.
- Per-task prototype source belongs in `prototype-workspace/app/<taskId>/page.tsx` and `prototype-workspace/components/projects/<taskId>/`.
- `tasks/<id>/prototypes/` holds only a pointer manifest plus Playwright screenshots; do not place React source there.
- Use `makeStyles` with Fluent tokens and the SafeTokens pattern in every TSX file that uses tokens:

```tsx
import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";
type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
```

- Use Fluent primitives (`Button`, `Text`/`Body1`/`Title2`, `Card`, `Field`, `Table`, `Badge`, etc.) instead of raw HTML text or custom control markup.
- UI chrome icons come from `@fluentui/react-icons`; Azure service logos come from `prototype-workspace/public/azure-service-icons/{category}/*.svg`; portal icons come from `prototype-workspace/public/icons/`. No inline SVG.
- Only `#0078D4`, `#106EBE`, and `#005A9E` may be hardcoded. Otherwise use Fluent tokens or a `FluentProvider` theme.
- No CSS Modules, Tailwind, styled-components, generic CSS-var token mandates in TSX, or inline `style={}` except truly dynamic values.
- New Fluent skills: `design-with-fluent` for Design; `figma-to-fluent`, `refactor-to-system`, and `component-audit` for Prototype quality gates.

## Frontend Framework

- **React** with **TypeScript** is the target framework for all coded artifacts
- Design and Prototype phase code targets Fluent UI React v9 in `prototype-workspace/`
- Use functional components with hooks
- Export components as named exports
- Co-locate styles with `makeStyles` and Fluent tokens; do not use CSS Modules or styled-components for prototype React code

## Design Token Conventions

- **Prototype React code**: use Fluent token families from `@fluentui/react-components` (`colorNeutral*`, `colorBrand*`, `spacingHorizontal*`, `spacingVertical*`, `fontSize*`, `fontWeight*`, `lineHeight*`, `borderRadius*`, `shadow*`)
- **SafeTokens**: every TSX file using Fluent tokens must alias `tokens as fluentTokens` to `const tokens: SafeTokens = fluentTokens`
- **Theme**: brand customization belongs in a `FluentProvider` theme using Azure blues `#0078D4`, `#106EBE`, `#005A9E`
- **Non-React docs**: the generic `--{category}-{variant}-{scale}` convention may still document exploratory tokens before mapping to Fluent

## Markdown Document Standards

All design documents should include a YAML frontmatter header:

```yaml
---
title: "Document Title"
phase: discover | define | ideate | design | prototype | test | deliver
status: draft | in-review | approved
created: YYYY-MM-DD
updated: YYYY-MM-DD
author: ""
related: []
---
```

## HITS API — Direct Access (Preferred for hits.microsoft.com)

For any `https://hits.microsoft.com/study/<id>` URL, use the HITS API bridge — it's faster and more reliable than browser-based fetching.

### Get a study
```bash
# URL: https://hits.microsoft.com/study/6047768 → id is 6047768
curl -s "http://localhost:8099/api/hits/study/6047768"
```

### Search studies
```bash
curl -s -X POST http://localhost:8099/api/hits/search \
  -H "Content-Type: application/json" \
  -d '{"query": "accessibility usability testing", "top": 10}'
```

### Get a task or insight
```bash
curl -s "http://localhost:8099/api/hits/task/<id>"
curl -s "http://localhost:8099/api/hits/insight/<id>"
```

### Auth setup (one-time)
The bridge uses Azure CLI to get tokens automatically. If you see a 401:
```bash
# 1. Sign in (run once in terminal, outside bridge)
az login

# 2. Force-refresh the token in the bridge
curl -s -X POST http://localhost:8099/api/hits/token

# 3. Check token status
curl -s "http://localhost:8099/api/hits/token"
```

Token is cached and auto-refreshed. No manual token handling needed in normal operation.

---

## Shell & Web Fetch Capability

Every agent in this workspace can run shell commands (`execute` tool / `bash` tool). Use this capability to retrieve web content via the local bridge server before doing any stage work.

### Fetching URLs — always use the bridge, not external calls

The bridge runs at `http://localhost:8099`. Use `curl` to call it:

**Public URLs:**
```bash
curl -s "http://localhost:8099/api/fetch?url=$(python3 -c 'import urllib.parse,sys; print(urllib.parse.quote(sys.argv[1]))' 'https://example.com/page')"
```

**Microsoft internal portals** (HITS, SharePoint, Loop, DevDiv wikis):
```bash
curl -s "http://localhost:8099/api/browse?url=<encoded-url>&provider=microsoft"
```

**If Microsoft login is needed** (first time, or session expired):
```bash
# Step 1 — open the login browser (always pass the target URL so the right domain's cookies are captured)
curl -s -X POST http://localhost:8099/api/sessions/login \
  -H "Content-Type: application/json" \
  -d '{"provider":"microsoft","targetUrl":"https://the-actual-url-you-want-to-access"}'

# Step 2 — wait for the user to finish login, poll until the session exists
# (retry every 10 seconds; the session file appears once the browser lands on the destination)
until curl -sf http://localhost:8099/api/sessions/microsoft > /dev/null 2>&1; do
  echo "Waiting for login to complete..."; sleep 10
done

# Step 3 — retry your original browse call
curl -s "http://localhost:8099/api/browse?url=<encoded-url>&provider=microsoft"
```

### When to fetch

- **Any time a URL appears in the user prompt** — fetch it first, before reading or writing any artifacts
- Save the result to `tasks/<task-id>/research/web/<slug>.md`
- Use the saved markdown as the primary source of truth for the stage

### URL encoding shortcut

```bash
node -e "console.log(encodeURIComponent('https://hits.microsoft.com/study/6047768'))"
```

## MCP Server Integrations

This workspace integrates with external design tools via MCP:
- **Figma** — Design file reading, token extraction, component inspection
- **Storybook** — Component documentation and visual testing
- **Microsoft Graph** — Word, Excel, PowerPoint, and Teams integration
- **Playwright** — Browser automation, screenshots, accessibility audits

## Accessibility Standards

- Target **WCAG 2.1 AA** compliance
- All images require `alt` text
- Interactive elements need visible focus indicators
- Color contrast ratio minimum: 4.5:1 for normal text, 3:1 for large text
- All components must support keyboard navigation
