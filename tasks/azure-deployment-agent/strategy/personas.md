---
title: "User Personas — Deployment Agent"
phase: define
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Strategist Agent"
related:
  - "problem-statements.md"
  - "../research/azure-deployment-agent-ux-enhancements.md"
---

# User Personas — Deployment Agent

## Overview

Three primary personas represent the target user archetypes for the Azure Copilot Deployment Agent. These personas are synthesized from behavioral patterns, mental models, and pain points observed across three rounds of evaluative research. Each persona maps to specific "How Might We" problem statements defined in [problem-statements.md](problem-statements.md).

---

## Persona 1: Dev-First Deployer (Software Developer)

| Attribute | Detail |
|-----------|--------|
| **Name** | Alex Chen |
| **Role** | Full-stack developer, 5 years experience |
| **Environment** | Primarily VS Code; uses GitHub for version control |
| **Azure experience** | Moderate — deploys regularly but not a cloud specialist |

### Mental Model

IDE-centric. Alex expects @ mentions, slash commands, and command palette interactions to work in Azure Copilot the same way they do in VS Code. He thinks in terms of code and files, not portal UI. When he types a prompt, he expects the system to behave like an IDE extension — predictable, direct, and responsive.

### Pain Points

- **Cannot find the Deployment Agent without help.** Tried typing `@deploy` and using slash commands — neither worked. Without guidance, he never discovered the agent existed.
- **Unclear what prompting will do.** Doesn't know whether a prompt will create a plan, trigger an action, or just answer a question. This ambiguity makes him hesitant to experiment.
- **Wants to edit parameters inline.** When he sees a SKU or configuration value he wants to change, his instinct is to click and edit — not type a conversational prompt describing the change.

### Goals

- Deploy quickly with confidence, without needing to become a cloud infrastructure expert.
- Understand the cost impact of his choices before committing.
- Iterate fast on deployment configurations without switching between tools.

### Key Quote (Synthesized)

> "I expected to just type @deploy and have it know what I mean."

### Relevant Problem Statements

- **HMW 1: Agent Discovery** — Cannot find or invoke the agent using familiar IDE patterns
- **HMW 4: Inline Editing** — Prefers direct manipulation over prompt-based editing
- **HMW 2: Cost Transparency** — Needs cost signals to make informed decisions without deep Azure expertise

---

## Persona 2: Platform Engineer (DevOps/Cloud Ops)

| Attribute | Detail |
|-----------|--------|
| **Name** | Priya Sharma |
| **Role** | Senior DevOps engineer, 8 years experience |
| **Environment** | VS Code + Terminal; Terraform-heavy; manages CI/CD pipelines |
| **Azure experience** | Advanced — manages multi-environment deployments, IaC-first |

### Mental Model

IaC-native. Priya thinks in terms of `plan → validate → apply`. She expects pre-deployment checks (quotas, policies, dependencies) as a standard part of any deployment workflow. For production, she requires PR-based review and team approval before anything executes. She evaluates generated code with the eye of someone who writes and maintains IaC daily.

### Pain Points

- **Needs pre-deployment validation like Terraform plan.** Won't deploy without seeing what will change, what could break, and whether policies are satisfied. The absence of a structured review step blocks her confidence.
- **Wants Bicep syntax highlighting and proper diffing.** Browsing generated Bicep without syntax highlighting feels like reading code in a text file — functional but frustrating.
- **Needs cost-performance trade-off visibility.** When evaluating SKU changes across environments, she needs to understand not just cost delta but performance implications.
- **Expects collaborative review workflows.** Production deployments require peer review. She needs PR creation, review routing, and approval tracking before deploy.

### Goals

- Validate infrastructure changes thoroughly before deploying to any environment.
- Ensure policy compliance and quota availability before execution.
- Review IaC quality at the code level with proper tooling.
- Enable team-based approval workflows for production deployments.

### Key Quote (Synthesized)

> "I need to see what's going to change and what could break before I hit deploy."

### Relevant Problem Statements

- **HMW 3: Bicep Deployments** — Demands pre-deployment validation and IaC code quality tooling
- **HMW 2: Cost Transparency** — Needs granular cost-performance trade-offs for SKU and tier decisions
- **HMW 5: Version Diffing** — Uses diff views as a primary review tool; needs enhanced navigation and rollback

---

## Persona 3: Cloud Architect / Admin

| Attribute | Detail |
|-----------|--------|
| **Name** | Marcus Williams |
| **Role** | Cloud solutions architect, 10+ years experience |
| **Environment** | Azure Portal + VS Code hybrid user |
| **Azure experience** | Expert — designs multi-service architectures, manages budgets |

### Mental Model

Architecture-first. Marcus thinks in terms of service interactions, cost optimization, compliance posture, and organizational governance. He evaluates deployments not just for technical correctness but for strategic alignment — budget impact, scaling headroom, and audit readiness. He expects architectural context (diagrams, cost breakdowns, compliance summaries) as first-class artifacts.

### Pain Points

- **Aggregate cost estimates aren't granular enough.** A monthly total doesn't help him explain to stakeholders which services drive costs or where optimization is possible.
- **Needs to compare architectural alternatives.** When deciding between configurations, he wants side-by-side cost-performance comparisons — not sequential, manual evaluation.
- **Wants to understand the "why" behind changes.** Diffs that show what changed are useful; diffs that explain why the change was recommended are transformative.

### Goals

- Optimize architecture for cost and performance across multi-service deployments.
- Ensure compliance with organizational policies and governance requirements.
- Communicate trade-offs clearly to stakeholders and leadership.
- Maintain version history for audit trails and change accountability.

### Key Quote (Synthesized)

> "Don't just tell me it costs $500/month — show me what's driving that cost and what happens if I change the SKU."

### Relevant Problem Statements

- **HMW 2: Cost Transparency** — Needs granular, multi-level cost breakdowns and trade-off visibility
- **HMW 5: Version Diffing** — Uses version history for audit, comparison, and stakeholder communication
- **HMW 3: Bicep Deployments** — Requires compliance validation and governance-ready deployment workflows

---

## Persona Comparison Matrix

| Dimension | Alex Chen (Developer) | Priya Sharma (DevOps) | Marcus Williams (Architect) |
|-----------|----------------------|----------------------|----------------------------|
| **Primary concern** | Speed & simplicity | Validation & compliance | Cost optimization & governance |
| **Discovery expectation** | @ mentions, slash commands | Command palette, CLI | Portal integration, contextual suggestions |
| **Cost needs** | "Will this be expensive?" | "What's the cost delta of this SKU change?" | "What drives the cost and how do I optimize?" |
| **Deployment confidence** | Needs reassurance via review step | Needs validation checks + peer review | Needs compliance verification + stakeholder-ready summaries |
| **Editing preference** | Click-to-edit inline | Syntax-highlighted code editing | High-level parameter adjustment |
| **Diffing use case** | Quick comparison | Detailed code review | Audit trail & change accountability |
| **Top HMWs** | Discovery, Inline Editing, Cost | Bicep, Cost, Diffing | Cost, Diffing, Bicep |

---

## Next Steps

- [ ] Validate personas with product and engineering stakeholders
- [ ] Map each persona to the end-to-end deployment journey to identify persona-specific friction points
- [ ] Use personas to prioritize requirements in [requirements-prd.md](requirements-prd.md)
- [ ] Identify which persona is the primary design target for each P0 requirement
