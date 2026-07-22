# Team Workspace

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Fluent UI](https://img.shields.io/badge/Fluent%20UI%20v9-React-blue?style=for-the-badge)](https://react.fluentui.dev/)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Azure%20Static%20Web%20Apps-blue?style=for-the-badge&logo=microsoft-azure)](https://lively-island-0f5253710.1.azurestaticapps.net/)

## What Is This?

A shared workspace where Azure portal teams build **live, interactive prototypes** that connect every team's experience in one place. Every team's prototype lives in the same repo, uses the same components, and links together — so we can see and test the full user journey across Discover → Build → Manage.

**Live site:** [https://lively-island-0f5253710.1.azurestaticapps.net/](https://lively-island-0f5253710.1.azurestaticapps.net/)

## Quick Start

```bash
# 1. Clone and install
git clone https://github.com/azure-core/azure-portal-poc.git
cd azure-portal-poc
pnpm install

# 2. Start dev server
pnpm dev

# 3. Create your project
pnpm create-project "my-project-id" \
  --team "YourTeam" \
  --owner "Your Name" \
  --experience fre \
  --horizon build-2026 \
  --pillar discover \
  --description "Brief description"
```

This generates `app/<project-id>/page.tsx`, `components/projects/<project-id>/index.tsx`, and a registry entry in `data/projects.ts`.

## Copilot Skills

This repo includes custom GitHub Copilot prompt skills. Use them in VS Code chat:

| Skill                    | What It Does                                               |
| ------------------------ | ---------------------------------------------------------- |
| `/start-setup`           | First-run project setup — prerequisites, clone, dev server |
| `/create-project`        | Scaffold a new project with standardized summary           |
| `/figma-to-fluent`       | Convert a Figma design to Fluent v9 code                   |
| `/refactor-to-system`    | Clean up code to follow repo conventions                   |
| `/component-audit`       | Audit a component for token, style, and reuse violations   |
| `/generate-preview-link` | Generate a PR preview URL for stakeholders                 |
| `/publish-to-production` | Run quality checks, refactor, and merge to main            |
| `/delete-preview`        | Close PR, delete branch, free up a staging slot            |

## Tech Stack

| Layer            | Technology                                              |
| ---------------- | ------------------------------------------------------- |
| Framework        | Next.js 15 (App Router, `output: "export"`)             |
| UI               | Fluent UI React v9 (`@fluentui/react-components`)       |
| Agent/Copilot UI | `@fluentui-copilot/react-copilot`                       |
| Styling          | `makeStyles` + Fluent design tokens                     |
| Icons            | `@fluentui/react-icons` + `public/azure-service-icons/` |
| Auth             | MSAL (`@azure/msal-react`) — Microsoft accounts only    |
| Deployment       | Azure Static Web Apps (Standard)                        |
| Package Manager  | pnpm                                                    |

## Project Structure

```
azure-portal-poc/
├── app/                           # Next.js pages (one folder per project)
│   ├── page.tsx                   # Landing page
│   ├── workspace/                 # Team workspace hub
│   ├── build-2026/                # Build 2026 project
│   └── <your-project>/            # Your project goes here
├── components/
│   ├── shared/                    # 50+ reusable components (search here first!)
│   │   ├── project-layout.tsx     # Wraps every project page
│   │   ├── azure-header-buildmvp.tsx
│   │   ├── action-card.tsx
│   │   ├── metric-card.tsx
│   │   ├── agent-layout.tsx
│   │   └── ...
│   ├── projects/                  # Project-scoped components
│   │   ├── build-2026/
│   │   ├── optimize/
│   │   └── <your-project>/
│   └── auth/                      # Auth components
├── data/
│   └── projects.ts                # Project registry
├── .github/
│   ├── prompts/                   # Copilot prompt skills
│   └── copilot-instructions.md    # AI coding instructions
├── scripts/
│   └── create-project.mjs         # Project scaffolding CLI
├── docs/                          # Training materials
├── AGENTS.md                      # Full component inventory & rules
└── public/                        # Static assets & icons
```

## Key Rules

Full details in [`AGENTS.md`](./AGENTS.md). The essentials:

- **Fluent UI v9 only** — no Tailwind, no Radix, no shadcn, no CSS modules
- **`makeStyles` + tokens** — no inline `style={{}}` (except truly dynamic values), no hardcoded colors
- **Search before creating** — check `components/shared/` first, then `components/projects/`
- **Icons** — `@fluentui/react-icons` for UI chrome, `public/azure-service-icons/` for service logos

## Available Scripts

| Command               | Description                          |
| --------------------- | ------------------------------------ |
| `pnpm dev`            | Start development server             |
| `pnpm build`          | Build for production (static export) |
| `pnpm lint`           | Run ESLint                           |
| `pnpm create-project` | Scaffold a new project               |

## Previews & Deployment

- **Production:** Auto-deploys from `main` → [lively-island-0f5253710.1.azurestaticapps.net](https://lively-island-0f5253710.1.azurestaticapps.net/)
- **PR Previews:** Each PR deploys to one of 5 SWAs via modulo routing (`PR# % 5`), giving us **50 simultaneous preview slots**. The SWA deploy bot auto-comments the preview URL on each PR.

| SWA            | Routing               | Hostname                    |
| -------------- | --------------------- | --------------------------- |
| SWA1 (primary) | PRs ≤ 37 + `% 5 == 0` | `lively-island-0f5253710`   |
| SWA2           | `% 5 == 1`            | `gentle-mushroom-089e8ae0f` |
| SWA3           | `% 5 == 2`            | `agreeable-water-02228c00f` |
| SWA4           | `% 5 == 3`            | `black-desert-00c85480f`    |
| SWA5           | `% 5 == 4`            | `agreeable-field-0c5591f0f` |

## Security & Access

**Internal Microsoft Use Only** — restricted to `@microsoft.com` accounts.

- **Auth:** Microsoft Entra ID with MSAL (OAuth 2.0 + PKCE)
- **Client-side only** — no backend secrets
- **Deployment:** Azure Static Web Apps with Entra ID integration

## Contributing

1. Create a feature branch: `git checkout -b feat/<project-id>`
2. Use `pnpm create-project` to scaffold your project
3. Build your pages using shared components
4. Push and open a PR targeting `main`
5. Share your preview link with stakeholders

For access or questions, contact the AGX Growth & Foundation team.
