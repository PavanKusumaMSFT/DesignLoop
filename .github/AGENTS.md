# DesignLoop — Agent Ecosystem

This workspace provides a suite of AI agents for the full product design lifecycle. Each stage of the design process forms an intelligent loop — powered by one or more specialized agents that iterate within that stage. Together, these stage-level loops compose into a larger continuous loop spanning the entire design process: Discover → Define → Ideate → Design → Prototype → Test → Deliver.

## Agent Overview

```
@Design Lead (Orchestrator)
 ├── @Researcher        → Discover
 ├── @Strategist        → Define
 ├── @Ideator           → Ideate
 ├── @Designer          → Design
 ├── @Prototyper        → Prototype
 ├── @Tester            → Test
 ├── @Handoff           → Deliver
 └── @Security Auditor  → All Phases (cross-cutting)
```

## Agents × Phases × Tools

| Agent | Phase | Tools | MCP Servers | Skills |
|-------|-------|-------|-------------|--------|
| **Design Lead** | All | read, search, edit, agent, web, todo | msgraph | — |
| **Researcher** | Discover | read, search, web, edit | msgraph | `/competitive-analysis` |
| **Strategist** | Define | read, search, edit | msgraph | — |
| **Ideator** | Ideate | read, edit, search | msgraph | — |
| **Designer** | Design | read, edit, search | figma | `/design-system-setup`, `/design-with-fluent` |
| **Prototyper** | Prototype | read, edit, search, execute | storybook, playwright | `/design-to-code`, `/figma-to-fluent`, `/refactor-to-system`, `/component-audit` |
| **Tester** | Test | read, search, web, edit | playwright | `/usability-test-plan`, `/tenets-traps-evaluation` |
| **Handoff** | Deliver | read, search, edit | figma, storybook, msgraph | `/component-spec` |
| **Security Auditor** | All (cross-cutting) | read, search, web | figma, playwright, sbd-mcp | — |

## MCP Server Dependencies

| MCP Server | Purpose | Required Credentials | Used By |
|------------|---------|---------------------|---------|
| **Figma** | Read designs, extract tokens, inspect components | `FIGMA_ACCESS_TOKEN` | Designer, Handoff |
| **Playwright** | Browser automation, screenshots, accessibility audits | None | Prototyper, Tester, Security Auditor |
| **Microsoft Graph** | Word, Excel, PowerPoint, Teams integration | Azure AD OAuth (Tenant ID, Client ID, Secret) | Researcher, Strategist, Ideator, Handoff, Design Lead |
| **Storybook** | Component docs, visual testing | Storybook URL | Prototyper, Handoff |
| **SBD MCP** | Security scanning rules engine, text/URL/Figma audits | None | Security Auditor |



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

## Skills

| Skill | Description | Typical Agent |
|-------|-------------|---------------|
| `/design-system-setup` | Scaffold design tokens, CSS variables, and theme files | Designer |
| `/component-spec` | Generate standardized component documentation | Handoff |
| `/competitive-analysis` | Structured competitive research with scoring matrices | Researcher |
| `/usability-test-plan` | Create test plans, task scripts, and observation sheets | Tester |
| `/tenets-traps-evaluation` | UI Tenets & Traps heuristic evaluation with findings report and fix → re-evaluate loop; available in the Test phase and as a standalone tool on the DesignLoop Home | Tester |
| `/design-to-code` | Convert design specs to React + Storybook components | Prototyper |
| `/component-audit` | Quality gate for Fluent token, icon, reuse, and markup violations | Prototyper |
| `/refactor-to-system` | Refactor prototype code to Fluent tokens, primitives, and shared-component reuse | Prototyper |
| `/figma-to-fluent` | Convert Figma designs into Fluent UI React v9 prototype-workspace code | Prototyper |
| `/design-with-fluent` | Design pages and component specs against Fluent UI React v9 and prototype-workspace reuse rules | Designer |

## Hooks (Automated Enforcement)

| Hook | Event | Behavior | Severity |
|------|-------|----------|----------|
| **Design Token Validator** | PostToolUse | Validates token files and warns on Fluent v9 prototype TSX violations | Token files: **Blocking** (exit 2); prototype TSX: **Warning** |
| **Accessibility Checker** | PostToolUse | Checks HTML/JSX/TSX for missing alt text, keyboard access, heading hierarchy | **Warning** (non-blocking) |
| **Output Organizer** | PreToolUse | Enforces file placement in standard output directories | **Prompts** (asks permission) |

## Instructions (Auto-Loaded)

| Instruction | Applies To | Purpose |
|-------------|-----------|---------|
| Design Tokens | `**/tokens/**`, `**/design-system/**` | Token naming conventions and forbidden patterns |
| React Components | `**/*.tsx`, `**/*.jsx` | Component structure, a11y, Storybook readiness |
| Design Documents | `research/**`, `strategy/**`, `designs/**`, etc. | Standard document format with frontmatter |
| MCP Setup | On-demand | Setup guide for configuring MCP server credentials |

## Output Directory Structure

Every task lives in its own folder under `tasks/<task-id>/`, and each task contains the
full set of phase subdirectories below (e.g. `tasks/<task-id>/research/`). The Home page
lists all tasks; selecting one lets users browse that task's artifacts across the full
lifecycle.

| Directory (per task) | Phase | Contents |
|----------------------|-------|----------|
| `research/` | Discover | Research briefs, competitive analyses, market insights |
| `strategy/` | Define | Problem statements, personas, journey maps, PRDs |
| `ideation/` | Ideate | Concept docs, feature matrices, decision logs |
| `designs/` | Design | Wireframes, design tokens, component specs |
| `prototypes/` | Prototype | Pointer manifest to `prototype-workspace/` source plus screenshots |
| `tests/` | Test | Test plans, accessibility reports, feedback analysis |
| `handoff/` | Deliver | Implementation specs, component docs, style guides |

## Getting Started

1. **Set up MCP servers**: Ask any agent about MCP setup, or read `.github/instructions/mcp-setup.instructions.md`
2. **Start a project**: Talk to `@Design Lead` with your project idea — it will guide you through the entire process
3. **Work on a specific phase**: Talk directly to any specialist agent (e.g., `@Researcher` for competitive analysis)
4. **Use skills**: Type `/` in chat to see available skills for templated workflows
