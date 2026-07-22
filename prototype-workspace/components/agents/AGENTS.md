# Agents — Component Section

This folder houses **agent components** that help users navigate and leverage the full project catalog in this workspace.

## Purpose

Unlike `components/projects/` (project-specific UI) or `components/shared/` (reusable primitives), `components/agents/` contains intelligent assistant experiences that operate **across projects** — helping users discover, understand, and work with any project registered in `data/projects.ts`.

## Structure

```
components/agents/
  index.tsx              ← Main workspace agents screen (`/agents`)
  project-context.ts     ← Builds project selection context from registry
```

## Rules

1. **Agent components live here** — any cross-project intelligent assistant UI belongs in this folder.
2. **Project-specific agents stay in `projects/`** — if the agent only serves one project (e.g., engops-agent), it stays in `components/projects/`.
3. **Use the project registry** — agents should pull metadata from `data/projects.ts`, not hardcode project info.
4. **Follow workspace conventions** — Fluent UI v9, `makeStyles` + tokens, no forbidden patterns (see root AGENTS.md).
5. **Security Audit inputs are required** — users must select a project and then either one prototype route or "All prototype routes".
6. **Bridge-first execution** — Security Audit posts a run payload to `NEXT_PUBLIC_SECURITY_AUDIT_BRIDGE_URL` (default: `http://127.0.0.1:4317`).
7. **Deterministic route evaluator** — bridge fetches route HTML from `SECURITY_AUDIT_APP_BASE_URL` (default: `http://127.0.0.1:3000`) and applies schema-validated guideline checks.
8. **Visual evidence snapshots** — bridge captures per-route screenshots with Playwright (disable with `SECURITY_AUDIT_CAPTURE_SCREENSHOTS=false`).

## Agent Personas

### ProjectNavigator
- **Role**: Workspace-level launcher for cross-project actions (currently Security Audit).
- **Data source**: `data/projects.ts` — project metadata, connections, status, experience areas.
- **Capabilities**: Prompt project selection, launch Security Audit flow, and host future workspace-level agent cards.

### SecurityAudit Run Contract
- **Guideline source**: `data/security-audit.ts`
- **Payload contract**: `lib/agents/security-audit-contract.ts`
- **UI entrypoint**: `components/agents/index.tsx`
- **Local bridge command**: `npm run security-audit:bridge`
- **Report output**: `public/reports/security-audit/<runId>/report.html` with per-route sections
- **Bridge mode**: `deterministic-route-evaluator-with-snapshots` (citation policy, schema checks, and route evidence)
