---
description: "Use when working with security audit artifacts, scan reports, or custom security rules. Covers audit report structure, severity classifications, and rule definition format."
applyTo: "**/tests/security/**"
---

# Security Audit Artifacts

## Report Structure

All security audit reports in `tests/security/` must follow the standard report template defined in the Security Auditor agent. Each report must include:

- **Target** — What was scanned (Figma file key, URL, or file path)
- **Date** — When the audit was performed
- **Rules Applied** — Count of SBD, OWASP, and custom rules applied
- **Summary table** — Finding counts by severity
- **Findings** — Each finding with severity, location, description, remediation, and reference

## Severity Levels

| Level | Criteria | Examples |
|-------|----------|----------|
| **Critical** | Exposed secrets, credentials, or financial data that could lead to immediate compromise | Passwords, API keys, credit cards, SSNs |
| **High** | Sensitive data exposure or insecure patterns with significant risk | Insecure protocols, PII exposure, missing auth gates |
| **Medium** | Design issues that indicate poor security hygiene | Deprecated content, non-final markers |
| **Low** | Informational findings unlikely to cause direct harm | Draft content, TODO notes, prototype labels |

## Custom Rule Format

When adding rules to `custom-rules.md`, every rule must include: `id`, `name`, `pattern`, `severity`, `description`, and `remediation`. See `tests/security/custom-rules.md` for examples.

## File Naming

- Audit reports: `audit-{target}-{YYYY-MM-DD}.md`
- Custom rules: `custom-rules.md` (single file, append new rules)
