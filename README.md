# DesignLoop

**An AI-agent-driven product design platform.** Every stage of the design
lifecycle — **Discover → Define → Ideate → Design → Prototype → Test → Deliver** —
is an intelligent loop driven by specialized AI agents. These stage loops compose
into one continuous loop that carries an idea from research all the way to
engineering handoff.

You can run the **full lifecycle**, a **single stage**, or a **single tool**
directly on your artifacts — all from a local web UI.

---

## What's in the box

| Piece | What it is |
|-------|------------|
| **Bridge** (`bridge/`) | A tiny zero-config Node server (`:8099`) that serves the DesignLoop site, runs the GitHub Copilot CLI headlessly, and streams agent output live. It also auto-starts the prototype workspace. |
| **DesignLoop site** (`index.html`, `task.html`, `assets/`) | The static task browser served by the bridge. Browse tasks, run stages/tools, and view artifacts and prototype **report cards**. |
| **Prototype workspace** (`prototype-workspace/`) | A Next.js 15 + Fluent UI React v9 + Storybook app (`:3100`) where prototypes are built and previewed. Auto-started by the bridge. |
| **Tasks** (`tasks/<id>/`) | Per-task artifacts organized by phase: `research/`, `strategy/`, `ideation/`, `designs/`, `prototypes/`, `tests/`, `handoff/`. |
| **Agents & skills** (`.github/`) | Stage coordinators and tool sub-agents (e.g. Researcher, Strategist, Designer, Prototyper, Tester, Handoff) plus their SKILL/VERIFY definitions. |

---

## Prerequisites

- **Node.js ≥ 18** (repo developed on Node 25). Check with `node -v`.
- **GitHub Copilot CLI** — the bridge shells out to the `copilot` binary to run
  agents. Install it and make sure it's on your `PATH`:
  ```bash
  command -v copilot   # should print a path
  ```
  If it lives elsewhere, point the bridge at it with `COPILOT_BIN=/path/to/copilot`.
- **npm** (ships with Node). The prototype workspace also works with `pnpm`.

> The bridge binds to `127.0.0.1` only — it is a **local, single-user** tool.

---

## Sign in to Copilot

The bridge drives the GitHub Copilot CLI on your behalf, so you must be
**authenticated once** before starting it. Otherwise agent runs will fail with an
auth error.

```bash
copilot login
```

This starts an OAuth browser (device) flow and stores the token securely in your
system credential store (falling back to `~/.copilot/` if none is available).

You can verify you're signed in by launching Copilot once:

```bash
copilot          # starts an interactive session; exit with /exit or Ctrl+C
```

### Headless / CI authentication

For automation you can skip the browser flow by providing a token via environment
variable (checked in this order): `COPILOT_GITHUB_TOKEN`, `GH_TOKEN`,
`GITHUB_TOKEN`.

```bash
export COPILOT_GITHUB_TOKEN=<token>   # fine-grained PAT with the "Copilot Requests" permission,
                                      # or an OAuth token from the Copilot CLI / gh app
```

> Classic personal access tokens (`ghp_…`) are **not** supported. Run
> `copilot help environment` for the full list.

---

## Quick start

From the repo root:

```bash
# 0. Sign in to Copilot (once) — see "Sign in to Copilot" below
copilot login

# 1. Install bridge dependencies (once)
cd bridge && npm install && cd ..

# 2. Install prototype workspace dependencies (once)
cd prototype-workspace && npm install && cd ..

# 3. Start the bridge (also auto-starts the prototype workspace on :3100)
npm start
```

Then open **http://localhost:8099** in your browser.

That's it. `npm start` runs `node bridge/server.js`, which:

1. Serves the DesignLoop site at `http://localhost:8099`.
2. Resolves and reports the `copilot` binary it will drive.
3. Auto-starts (or reuses) the prototype workspace dev server at
   `http://localhost:3100`.

You should see:

```
DesignLoop Bridge running at http://127.0.0.1:8099
  Serving:  /path/to/DesignLoop
  Copilot:  /opt/homebrew/bin/copilot
  Prototypes: starting Next dev server on :3100 …
  Prototypes: dev server ready on :3100
```

---

## Running the prototype workspace on its own

The bridge starts it for you, but you can run it standalone during UI development:

```bash
cd prototype-workspace
npm run dev          # Next dev server (defaults to :3000 here; bridge uses :3100)
npm run storybook    # Storybook component explorer on :6006
npm run build        # production build
npm run lint         # lint
```

When running the workspace separately from the bridge, point it at the bridge API:

```bash
# prototype-workspace/.env.local
NEXT_PUBLIC_BRIDGE_URL=http://localhost:8099
```

Prototype **report cards** and the **"Changes to push"** badge are populated by the
bridge API, so the bridge must be running for them to appear.

---

## Configuration

All configuration is via environment variables — no config file is required.

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `8099` | Bridge HTTP port. |
| `PROTOTYPE_PORT` | `3100` | Port the bridge starts/expects the prototype workspace on. |
| `COPILOT_BIN` | auto-detected | Absolute path to the `copilot` binary. |
| `CLAUDE_BIN` | auto-detected | Absolute path to the `claude` (Claude Code) binary, used by skills that require Figma MCP write tools. |
| `NEXT_PUBLIC_BRIDGE_URL` | `http://localhost:8099` | Bridge URL the prototype workspace calls (set in `prototype-workspace/.env.local`). |
| `NEXT_PUBLIC_MICROSOFT_CLIENT_ID` | (demo id) | Entra ID app registration's Application (client) ID for workspace sign-in. |
| `NEXT_PUBLIC_MICROSOFT_TENANT_ID` | `common` | Sign-in authority: a tenant ID (single-tenant), `organizations` (any work/school org), or `common` (also personal accounts). |

---

## Microsoft (Entra ID) sign-in

The prototype workspace can gate access behind **Sign in with Microsoft** (MSAL,
`prototype-workspace/lib/msal-config.ts`). Copy `prototype-workspace/.env.example`
to `.env.local` and set the two `NEXT_PUBLIC_MICROSOFT_*` values, then restart the
workspace (`.env.local` is gitignored — never commit real values).

**Two things must agree:** the `NEXT_PUBLIC_MICROSOFT_TENANT_ID` authority **and**
the app registration's *Supported account types*.

| You want… | `NEXT_PUBLIC_MICROSOFT_TENANT_ID` | App registration "Supported account types" |
|-----------|-----------------------------------|---------------------------------------------|
| Only your org | your Directory (tenant) ID | Single tenant |
| **Anyone with a work/school account** | `organizations` | **Accounts in any organizational directory (Multitenant)** |
| Work/school **or** personal MS accounts | `common` | Multitenant + personal Microsoft accounts |

> **"Selected user account does not exist in tenant … and cannot access the
> application"** means the app is single-tenant (or the authority points at one
> tenant) and the person is in a different org. Fix it by making the app
> **multitenant** in the Azure Portal (App registrations → your app →
> Authentication → *Supported account types*) **and** setting
> `NEXT_PUBLIC_MICROSOFT_TENANT_ID=organizations`. Users from other orgs may see a
> one-time consent prompt for the `User.Read` permission.

---

## How it works

1. **You pick a scope** in the UI — the full lifecycle, one stage, or a single tool
   — for a task.
2. **The bridge runs the matching agent** via the Copilot CLI and streams its
   output back to the page in real time.
3. **Agents write artifacts** into `tasks/<id>/<phase>/` as versioned markdown
   with YAML frontmatter (`title`, `phase`, `status`, `created`, `updated`,
   `author`).
4. **Design & Prototype work targets the prototype workspace** — runnable Fluent
   UI React v9 pages under `prototype-workspace/app/<taskId>/`.
5. **The Test stage** produces accessibility, security, usability, tenets & traps,
   visual, and test-execution reports. These roll up into a per-prototype
   **report card** (see below).

See `docs/architecture.md` for the full three-tier agent model and the
`No-slop / verify-every-artifact` principle.

---

## Prototype report cards

Each prototype surfaces a **report card** summarizing the Test-stage checks run
against it (accessibility, security, tenets & traps, usability, test execution,
visual, and any other test artifact). For every check it shows **Ran / Not-run**,
a **status badge**, and a **link to open the full report**.

- In the **prototype workspace**, cards show a compact chip strip plus a full
  "Report card" dialog.
- In the **DesignLoop task browser**, the task page shows a Report Card panel.
- From either UI you can **mark an in-review (or draft) test as Completed** — this
  rewrites the artifact's frontmatter `status` (and refreshes `updated`) via the
  bridge.
- A prototype with uncommitted local changes shows a **"Changes to push"** badge
  in addition to its Live/Local badge, cleared once you push it live.

---

## Prototypes: Local vs Live

- **Local** prototypes exist only in your working tree.
- **Live** prototypes are committed to the repo baseline (everyone sees them).
- Use **Go Live** in the workspace to commit and push a local prototype. The
  **"Changes to push"** badge tells you when a prototype has unpushed edits.

---

## Troubleshooting

- **Prototype home is blank after a change** — the bridge auto-manages the Next
  dev server; give it a few seconds to recompile, or restart the bridge
  (`Ctrl+C`, then `npm start`) to force a clean start.
- **Report card / new API routes not showing** — the bridge loads code at
  startup. After pulling changes to `bridge/server.js`, **restart the bridge** so
  new endpoints (e.g. `/api/report`) are live.
- **`copilot` not found** — install the GitHub Copilot CLI and ensure it's on
  `PATH`, or set `COPILOT_BIN` to its absolute path.
- **Agent runs fail with an authentication error** — you're not signed in. Run
  `copilot login` (or set `COPILOT_GITHUB_TOKEN`), then restart the bridge. See
  "Sign in to Copilot".
- **Port already in use** — another bridge/dev-server instance may be running.
  Stop it, or start on different ports with `PORT` / `PROTOTYPE_PORT`.

---

## Repository layout

```
DesignLoop/
├── bridge/                 # Local Node bridge server + helpers (fetcher, jobs, hits, ws)
├── prototype-workspace/    # Next.js 15 + Fluent UI v9 + Storybook prototype app
├── tasks/<id>/             # Per-task artifacts, organized by phase
│   ├── research/           #   Discover
│   ├── strategy/           #   Define
│   ├── ideation/           #   Ideate
│   ├── designs/            #   Design
│   ├── prototypes/         #   Prototype (pointer manifest + screenshots)
│   ├── tests/              #   Test
│   └── handoff/            #   Deliver
├── assets/                 # Static site JS/CSS
├── docs/                   # Architecture, contributing, verification notes
├── .github/                # Agents, skills, and Copilot instructions
├── index.html · task.html · tool.html   # Static DesignLoop site pages
└── package.json            # `npm start` → bridge
```

---

## Contributing

See `docs/contributing.md`. In short: artifacts are markdown with YAML
frontmatter; Design/Prototype UI targets Fluent UI React v9 in
`prototype-workspace/` (see `prototype-workspace/AGENTS.md` for the Fluent
inventory and rules).
