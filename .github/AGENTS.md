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
| **Designer** | Design | read, edit, search | figma | `/design-system-setup` |
| **Prototyper** | Prototype | read, edit, search, execute | storybook, playwright | `/design-to-code` |
| **Tester** | Test | read, search, web, edit | playwright | `/usability-test-plan` |
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

## Skills

| Skill | Description | Typical Agent |
|-------|-------------|---------------|
| `/design-system-setup` | Scaffold design tokens, CSS variables, and theme files | Designer |
| `/component-spec` | Generate standardized component documentation | Handoff |
| `/competitive-analysis` | Structured competitive research with scoring matrices | Researcher |
| `/usability-test-plan` | Create test plans, task scripts, and observation sheets | Tester |
| `/design-to-code` | Convert design specs to React + Storybook components | Prototyper |

## Hooks (Automated Enforcement)

| Hook | Event | Behavior | Severity |
|------|-------|----------|----------|
| **Design Token Validator** | PostToolUse | Validates token naming convention and blocks hardcoded values in token files | **Blocking** (exit 2) |
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
| `prototypes/` | Prototype | React components, Storybook stories, demos |
| `tests/` | Test | Test plans, accessibility reports, feedback analysis |
| `handoff/` | Deliver | Implementation specs, component docs, style guides |

## Getting Started

1. **Set up MCP servers**: Ask any agent about MCP setup, or read `.github/instructions/mcp-setup.instructions.md`
2. **Start a project**: Talk to `@Design Lead` with your project idea — it will guide you through the entire process
3. **Work on a specific phase**: Talk directly to any specialist agent (e.g., `@Researcher` for competitive analysis)
4. **Use skills**: Type `/` in chat to see available skills for templated workflows
