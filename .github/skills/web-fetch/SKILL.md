---
name: web-fetch
description: "Fetch and read content from any URL. Handles public pages and authenticated Microsoft portals. Use before any stage that needs to read source material from the web."
argument-hint: "URL to fetch (e.g. https://hits.microsoft.com/study/6047768)"
---

# Web Fetch

## When to Use
- A URL was provided as source material for a task
- You need to read a research study, PRD, or document hosted on the web
- You need to access an internal Microsoft portal (HITS, SharePoint, Loop, DevDiv wiki)
- Any stage where the source artifact is a link rather than a local file

## How to Fetch

### Public URLs
Use the bridge fetch endpoint:
```
GET http://localhost:8099/api/fetch?url=<encoded-url>
```
Returns JSON with `content` field containing clean markdown.

### Authenticated Microsoft Portals (HITS, SharePoint, Loop, internal tools)
Use the browser endpoint:
```
GET http://localhost:8099/api/browse?url=<encoded-url>&provider=microsoft
```
- On first use: opens a visible Edge browser — log in with your Microsoft account
- After login: session is saved and all subsequent calls run headlessly
- Session is stored in `bridge/sessions/microsoft.json`

### Starting a Login Session Manually
```
POST http://localhost:8099/api/sessions/login
Body: { "provider": "microsoft" }
```

## Procedure

1. Identify the URL(s) from the user's prompt or attached sources.
2. For each URL:
   a. Detect if it is a Microsoft/internal portal — if so, use `/api/browse` with `provider=microsoft`
   b. Otherwise use `/api/fetch`
   c. If the response has a `needsLogin` error, call `/api/sessions/login` first
3. Extract the relevant content from the markdown returned.
4. Save the fetched content to `research/web/{slug}.md` where `slug` is derived from the URL path.
5. Return a summary of what was fetched and what the content contains.

## Output Format

Save fetched content as:
```markdown
---
source: <original-url>
fetched: <ISO date>
---

# <page title>

<cleaned markdown content>
```

## Artifact Paths

`research/web/{slug}.md` — relative to `tasks/<task-id>/`

## Dependencies

None. This tool runs first, before any stage-specific tools.

## Notes

- The bridge fetch endpoint strips scripts, styles, and navigation chrome — you get the main content only
- For multi-page sources, fetch each URL separately
- If a page requires interaction (clicking "Continue", dismissing cookie banners), use the browse endpoint — it runs a real browser
