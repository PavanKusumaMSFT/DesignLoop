---
tool: web-fetch
---

# Verification: Web Fetch

## Dimensions

```yaml
dimensions:
  content-retrieved:
    weight: 50
    threshold: 80
    failure_instruction: "The fetched content must be non-empty and must contain
      substantive text from the target page — not an error message, login redirect,
      or empty body. If the page requires authentication, retry with the browse
      endpoint and provider=microsoft. If still empty, report the failure clearly
      and stop."

  relevance:
    weight: 30
    threshold: 70
    failure_instruction: "The saved markdown must contain content directly relevant
      to the task. If the fetched page is a navigation/landing page rather than
      the actual content, follow the most prominent link to the actual study or
      document and fetch that instead."

  artifact-saved:
    weight: 20
    threshold: 90
    failure_instruction: "The fetched content must be saved to research/web/{slug}.md
      with the correct frontmatter (source URL and fetch date). If the file was
      not written, write it before reporting completion."

accept_threshold: 75
```

## What the Verifier Checks

1. `research/web/{slug}.md` exists and has non-trivial content (> 200 chars)
2. File has frontmatter with `source:` URL matching what was requested
3. Content is not an error page, login page, or empty body
4. Content is relevant to the stated task

## Hard Stop Behaviour

If still failing after one re-run:
- Report the exact HTTP status or error from the fetch attempt
- Note whether authentication may be required
- Provide the raw URL so the user can check manually
