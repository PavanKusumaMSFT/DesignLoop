---
title: "Custom Security Rules"
phase: test
status: draft
created: 2026-05-20
updated: 2026-05-20
author: "Security Auditor Agent"
related:
  - ../../../.github/agents/security-auditor.agent.md
---

# Custom Security Rules

Define project-specific security scanning rules below. The Security Auditor agent will apply these rules in addition to the built-in SBD and OWASP rulesets.

## Rule Format

Each rule must include:

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique identifier (e.g., `CUSTOM-001`) |
| `name` | Yes | Short descriptive name |
| `pattern` | Yes | Regex pattern or keyword to match |
| `severity` | Yes | `critical`, `high`, `medium`, or `low` |
| `description` | Yes | What this rule detects |
| `remediation` | Yes | How to fix the issue |
| `category` | No | Grouping category (e.g., `pii`, `auth`, `compliance`) |

## Rules

### CUSTOM-001: Internal URLs

- **Pattern**: `localhost`, `127.0.0.1`, `0.0.0.0`, `.internal.`, `.corp.`, `.local`
- **Severity**: High
- **Category**: Infrastructure
- **Description**: Internal/development URLs visible in design assets
- **Remediation**: Replace with production URLs or use placeholder domains (e.g., `example.com`)

### CUSTOM-002: Environment Variables

- **Pattern**: `process.env`, `ENV_`, `REACT_APP_`, `NEXT_PUBLIC_`
- **Severity**: High
- **Category**: Secrets
- **Description**: Environment variable references visible in UI
- **Remediation**: Remove environment variable references from visible design content

<!-- Add more custom rules below using the format above -->
