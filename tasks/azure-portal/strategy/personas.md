---
title: "Azure Portal — User Personas"
phase: define
status: draft
created: 2026-07-17
updated: 2026-07-17
author: "Personas Agent"
related:
  - "../../project-cirrus-azure-tui/research/findings-synthesis.md"
  - "../../project-cirrus-azure-tui/strategy/problem-statements.md"
---

# Personas: Azure Portal

Four evidence-grounded personas for the **Azure Portal** (the web GUI for managing Azure
resources), each derived from validated Azure-user research rather than job-title
assumption. Every pain point cites a source — a theme ID (T1–T8) or a direct participant
quote — from the 2025 HaTS Azure-user telemetry and the approved Cirrus UXR summary.

## Overview

The personas cover the behavioural axes the research proves matter for Azure users:
**cloud breadth** (68.9% work multi-cloud, T7), **surface/environment breadth** (avg 1.86
execution contexts; IDE 49.4%, T7), **expertise framing** (expert-vs-"beginner-mode"
stigma, T4), and the **emerging AI-assisted channel** (13.1% AI cohort; Azure Copilot
~20% retention, T8/T1). Portal users span the same population as CLI users — the portal
is simply the GUI surface where much of the same intent (navigate resources, discover
correct settings, act quickly) plays out through blades, dashboards, and search.

## Research Foundation

- **Source telemetry & UXR:** `project-cirrus-azure-tui/research/findings-synthesis.md`
  (themes T1–T8) and its problem statements (HMW-1 … HMW-6), which synthesise the 2025
  HaTS Azure-user waves and the prior-experiment retention data.
- **Grounding note:** The source study measured Azure users across surfaces (local
  terminal, IDE, Cloud Shell, CI/CD, AI terminals). The behaviours it documents —
  multi-cloud work, cross-environment context-switching, discoverability need, expert
  stigma — are **surface-agnostic** and apply directly to the portal, the primary GUI
  Azure surface. Where a claim is portal-specific, it is flagged for portal-native
  validation in Next Steps.
- **Segmentation rule:** Each persona below meets the qualifying bar — a distinct primary
  goal, ≥2 unique pain points, and support from ≥2 data sources/themes.

---

## Persona 1 — Maya Okonkwo · Multi-Cloud Platform / DevOps Engineer

*"The portal is where I go to see what's actually happening — but my world isn't only Azure, and drilling through blades isn't how I work."*

**A. Identity**
- **Role & org:** Platform/DevOps engineer at a mid-size SaaS company; owns cross-cloud infrastructure and reliability.
- **Experience:** Expert Azure user; equally fluent in AWS and Kubernetes.
- **One-liner:** Maya is a multi-cloud platform engineer who uses the Azure portal for visibility and incident triage but resents workflows that assume Azure is her only cloud.

**B. Goals**
- To triage and diagnose cross-cloud incidents in the portal so that mean-time-to-resolution stays low during outages.
- To inspect resource state and metrics visually so that she can confirm what her automation actually provisioned.
- To reach the exact resource or setting fast so that the portal complements — not replaces — her scripted workflow.

**C. Pain Points**
- The portal assumes Azure is her whole world; she still juggles the AWS console and cloud-specific tooling with no unified cross-cloud view. — *Source: Theme T7 (68.9% of Azure users work multi-cloud)*
- Deep blade-drilling and modal navigation break her compositional, keyboard-driven flow — the GUI analogue of the mode-switching friction users called "unnatural" and "heavyweight." — *Source: Theme T2 / T3 (HaTS v2.40.0: "I'm not able to use a combination of kubectl powershell and AZ")*
- Slow, heavy blade loads waste her time during time-critical incidents. — *Source: Theme T6 (HaTS v2.54.0/v2.61.0: "startup time is too slow… cache things perhaps?")*
- Portal-driven click-ops don't translate into her IaC/automation, creating configuration drift she has to reconcile. — *Source: Theme T3 / HMW-3 (cross-environment portability)*

**D. Behaviours (axis spectrums)**
- Prefers manual control ←————————X→ Trusts automation
- Works solo ←—————X————→ Collaborates in real-time
- GUI-first ←———X——————————→ Terminal/API-first (X near terminal)
- Single-cloud focus ←——————————X→ Multi-cloud breadth
- Tolerates latency ←—X————————————→ Latency-intolerant

**E. Tools and Context**
- **Tools:** Azure portal (triage/observability), Azure CLI, AWS console/CLI, kubectl, Terraform, Grafana, tmux.
- **Environment:** Remote/hybrid; large multi-monitor desktop; portal open alongside terminals and dashboards.
- **Frequency:** Opens the portal several times daily, spiking heavily during incidents.

**F. Scenario Narrative**
It's 2 a.m. and an alert fires: an app spanning an AKS cluster and an Azure storage account is failing. Maya opens the Azure portal to see the storage account's metrics and firewall rules, but she's simultaneously checking an AWS load balancer in another tab and running `kubectl` in her terminal. In the portal she drills blade after blade to find the networking setting she needs, losing her place twice as context panes stack up. She wishes the portal would let her jump straight to the resource via search, show her the one setting that changed, and stay fast under pressure — without assuming Azure is the only cloud on fire tonight. What she needs is a portal that respects her cross-cloud, keyboard-driven reality: quick, searchable, shallow paths to the exact control, and state that mirrors what her automation provisioned so she can trust it. Above all, it must stay responsive at 2 a.m. — every blade that stalls is a minute added to an outage her team is measuring.

**G. Design Implications**
- This persona needs global command-style search and shallow, deep-linkable navigation because deep blade-drilling breaks her compositional, time-critical flow (T2/T3).
- This persona needs cross-cloud-aware context (or at least non-Azure-exclusive framing) because 68.9% of Azure users, including her, operate multi-cloud (T7).
- This persona needs portal actions that expose their IaC equivalent (export-to-template/CLI) because click-ops that don't travel create drift she must reconcile (HMW-3).

---

## Persona 2 — David Rossi · Azure-Primary Application Developer

*"I bounce between VS Code and the portal all day. Half my Azure config lives in a blade I have to hunt for."*

**A. Identity**
- **Role & org:** Backend application developer at a product company; Azure is his primary cloud.
- **Experience:** Intermediate–advanced with his own services; a relative novice whenever he touches an unfamiliar Azure service.
- **One-liner:** David is an Azure-primary developer who alt-tabs between his IDE and the portal to configure and inspect resources, and stumbles on unfamiliar settings.

**B. Goals**
- To configure a new Azure resource correctly the first time so that his app connects without failed deployments.
- To inspect and copy connection details / keys so that he can wire them into code without leaving his flow for long.
- To learn an unfamiliar service incrementally so that he ships without feeling "handled" like a beginner.

**C. Pain Points**
- His Azure work is split between the IDE terminal and the portal (avg 1.86 contexts), so he constantly alt-tabs to configure what he can't do from code. — *Source: Theme T7 (avg 1.86 execution contexts; IDE 49.4%)*
- He guesses at valid values (SKUs, tiers, existing resource-group names) because discoverability lives deep in the UI — the very "dynamic resource lookup" capability users prized. — *Source: Theme T5 (HaTS v2.67.0: "I really enjoyed… its dynamic resource lookups")*
- In-product guidance feels pitched at newcomers, so an experienced dev like him skips help that would actually save him. — *Source: Theme T4 ("SECRET mode, beginners must see" framing)*

**D. Behaviours (axis spectrums)**
- Prefers manual control ←————X———————→ Trusts automation
- Works solo ←———X————————→ Collaborates in real-time
- GUI-first ←——————X———————→ Terminal/API-first (context-dependent, mid)
- Reads documentation eagerly ←——————X——→ Learns by doing in-product
- Wants hand-holding ←———————————X→ Wants expert-grade, dismissible help

**E. Tools and Context**
- **Tools:** Azure portal (config/inspect), VS Code + integrated terminal, Cloud Shell, GitHub, application code SDKs.
- **Environment:** In-office/hybrid; laptop; portal in the browser next to his IDE.
- **Frequency:** Touches the portal multiple times a day while building and debugging.

**F. Scenario Narrative**
David is wiring his app to Azure Service Bus. From VS Code he switches to the portal to create the namespace, but the create blade asks for a `--sku`/tier and a resource group, and he isn't sure which SKU his scenario needs or the exact name of the group he made last week. He scrolls the blade, opens a docs link in a new tab, and loses ten minutes reconciling three windows. He'd happily accept inline guidance — valid SKU options, a live lookup of his existing resource groups — but the tooltip help he does find reads like a tutorial for someone who's never seen Azure, so he closes it. What he needs is expert-grade, contextual discoverability surfaced right in the create flow: real, validated options drawn from his own subscription, presented as a fast assist rather than training wheels, so he configures it correctly the first time without a browser-tab scavenger hunt.

**G. Design Implications**
- This persona needs inline, subscription-aware value discovery (valid SKUs, existing resource names) inside create/config blades because he guesses and fails when discoverability is buried (T5).
- This persona needs expert-framed, dismissible guidance — not tutorialised help — because "beginner-mode" framing makes experienced devs opt out (T4).
- This persona needs tight IDE↔portal continuity (deep links, copyable connection strings, quick auth) because his day is split across ~1.86 contexts (T7).

---

## Persona 3 — Sofia Nováková · Cloud Administrator & Governance / Cost Owner

*"I own who can touch what, what it costs, and whether we're compliant — and the answers are scattered across a hundred blades."*

**A. Identity**
- **Role & org:** Cloud/IT administrator at an enterprise; owns subscriptions, RBAC, policy, and cloud cost.
- **Experience:** Expert portal user; the portal is her primary daily surface, not a fallback.
- **One-liner:** Sofia is a governance-and-cost administrator who runs the tenant almost entirely from the portal and fights to find and reconcile settings spread across it.

**B. Goals**
- To review and adjust access (RBAC) and policy assignments so that the tenant stays least-privilege and compliant.
- To monitor and attribute spend across subscriptions so that she can flag budget overruns before month-end.
- To answer audit and stakeholder questions quickly so that governance never blocks delivery teams.

**C. Pain Points**
- Governance controls are scattered across sprawling, deeply nested areas (IAM, Policy, Cost Management, Advisor), so finding the right setting is slow — the discoverability gap users repeatedly named. — *Source: Theme T5 (valued capabilities are "dynamic resource lookups, discoverability support")*
- Much of her work is portal-only click-ops that never travel to automation/CI, so config drifts from the org's IaC and she reconciles by hand. — *Source: Theme T7 / HMW-3 (cross-environment portability; avg 1.86 contexts)*
- Repetitive, multi-step governance flows are slow and heavy, and sluggish loads compound the pain at scale. — *Source: Theme T6 (performance/reliability accelerated abandonment)*

**D. Behaviours (axis spectrums)**
- Prefers manual control ←—————X——————→ Trusts automation
- Works solo ←——————————X→ Collaborates in real-time (cross-team)
- GUI-first ←—X——————————————→ Terminal/API-first (strongly GUI)
- Ad-hoc / reactive ←—————————X→ Process-driven / audit-minded
- Tolerates latency ←———X———————————→ Latency-intolerant at scale

**E. Tools and Context**
- **Tools:** Azure portal (primary: IAM, Policy, Cost Management, Advisor, Monitor), Excel for cost reporting, occasional Azure CLI/PowerShell for bulk changes, ServiceNow for tickets.
- **Environment:** In-office/hybrid; desktop; portal open all day across multiple subscriptions.
- **Frequency:** Constant — the portal is her workbench throughout the working day.

**F. Scenario Narrative**
Month-end approaches and Sofia must confirm that no team has drifted outside policy and that spend is within budget. She moves between Cost Management, Policy compliance, and IAM role assignments — three different areas, each several blades deep — copying figures into a spreadsheet as she goes. A director pings her: "Who granted Contributor on the production subscription last week?" Answering means hunting through activity logs and role assignments across scopes, and each view takes a beat too long to load. She knows the data exists; the problem is that governance is smeared across the portal with no consolidated, searchable governance surface, and her manual clicks never sync back to the org's IaC. What she needs is a unified, fast, filterable governance-and-cost view that lets her answer access, policy, and spend questions in one place — and export changes as templates so click-ops stops drifting from code. When the auditor asks who changed what and when, she wants that answer in one query, not a half-hour of cross-referencing blades and logs across every subscription she owns.

**G. Design Implications**
- This persona needs a consolidated, searchable governance-and-cost surface because access, policy, and spend controls are scattered across deeply nested areas (T5).
- This persona needs bulk actions and export-to-IaC on governance changes because portal-only click-ops drift from the org's automation (HMW-3/T7).
- This persona needs performant, filterable audit/activity views at tenant scale because slow, heavy multi-step flows compound painfully across many subscriptions (T6).

---

## Persona 4 — Priya Menon · AI-Assisted Portal Power User

*"I already ask Copilot to do things in Azure. I want it to actually know my resources — not to be one more half-smart chatbot."*

**A. Identity**
- **Role & org:** Senior cloud engineer / early adopter at a fast-moving startup; drives Azure conversationally.
- **Experience:** Expert; an active adopter of AI-assisted tooling (portal Copilot, Copilot CLI, Claude Code).
- **One-liner:** Priya is an AI-forward power user who wants the portal's Copilot to carry real, first-party Azure context rather than generic answers she can't trust.

**B. Goals**
- To express intent in natural language ("spin up staging mirroring prod") so that the portal produces correct, resource-aware actions.
- To validate AI-suggested changes against her real environment so that she acts fast without shipping mistakes.
- To stay in one flow so that she doesn't juggle a separate AI tool alongside the portal.

**C. Pain Points**
- General AI assistance lacks deep, first-party Azure awareness, so it guesses at resource names and deprecated SKUs — the unowned first-party-context gap. — *Source: Theme T8 / Competitive gap #1 (AI terminals emerging; first-party Azure depth missing)*
- Bespoke AI modes fail to form a habit — she's watched novelty AI experiences crater (AI Shell ~6% monthly vs Azure Copilot ~20%), so she distrusts anything that feels like a bolt-on. — *Source: Theme T1 (AI Shell ~6% monthly retention; ~20% Copilot benchmark)*
- She won't tolerate fragmentation: a separate AI surface she has to switch into defeats the purpose. — *Source: Theme T2 (mode-switching is intrinsic friction)*

**D. Behaviours (axis spectrums)**
- Prefers manual control ←——————————X→ Trusts automation
- Works solo ←——————X———→ Collaborates in real-time
- GUI-first ←————————X—————→ Terminal/API-first (fluid across both)
- Skeptical of novelty ←————X—————————→ Eager early adopter (adopts, but drops fast)
- Prescriptive step-by-step ←——————————X→ Intent-first / conversational

**E. Tools and Context**
- **Tools:** Azure portal + Copilot, Copilot CLI, Claude Code, GitHub Copilot, Azure CLI.
- **Environment:** Remote; laptop; fluidly moves between conversational AI and direct portal action.
- **Frequency:** Daily; reaches for the AI assist reflexively for non-routine tasks.

**F. Scenario Narrative**
Priya needs a staging environment mirroring production. In the portal she asks Copilot to "create a staging environment matching prod," and it drafts a plan — but it invents a resource-group name that doesn't exist and picks a SKU that's since been deprecated. She catches both because she's experienced, but it costs her the trust that would let her lean on the assistant. What she wants is for the portal's AI to draw on first-party, live context — her actual resource groups, current valid SKUs, prod's real configuration — so its suggestions are runnable and correct in her environment. If instead Azure shipped a separate, bolted-on AI surface she had to switch into, she'd try it once and abandon it, exactly as the AI Shell retention curve predicts. She needs the intelligence woven into the portal she already uses, grounded in her real resources — close enough to act on immediately, transparent enough that she can verify each step before it runs against production.

**G. Design Implications**
- This persona needs portal AI grounded in live, first-party resource context (real names, valid SKUs, actual prod config) because generic AI guesses and forfeits her trust (T8).
- This persona needs AI woven into the existing portal flow, not a separate mode, because bolt-on AI surfaces fail to retain even engaged experts (T1/T2).
- This persona needs every AI-proposed change to be inspectable and validated against her environment before execution because she adopts fast but abandons anything that ships mistakes.

---

## Design Implications Summary

| # | Persona | Distinct design driver | Primary theme(s) |
|---|---------|------------------------|------------------|
| 1 | Maya — Multi-Cloud DevOps | Fast, shallow, searchable navigation + cross-cloud-aware, non-Azure-exclusive framing + export-to-IaC | T7, T2/T3, T6 |
| 2 | David — Azure-Primary Developer | Inline, subscription-aware value discovery + expert-framed dismissible help + IDE↔portal continuity | T5, T4, T7 |
| 3 | Sofia — Governance & Cost Admin | Consolidated searchable governance/cost surface + bulk actions & export-to-IaC + performant tenant-scale audit views | T5, T7, T6 |
| 4 | Priya — AI-Assisted Power User | Portal AI grounded in first-party live context + woven-in (not bolt-on) AI + inspectable validated changes | T8, T1/T2 |

**Distinctness check:** Each persona owns ≥2 pain points no other persona shares — Maya (cross-cloud fragmentation, blade-drilling vs composability), David (IDE↔portal alt-tabbing, beginner-stigma of guidance), Sofia (scattered governance controls, click-ops→IaC drift), Priya (AI lacks first-party context, bolt-on AI fails to retain). Design implications differ across all four.

## Next Steps

- Hand personas to the Journey Map and Requirements (PRD) stages; use Maya as the cross-cloud/navigation-speed gate, David as the discoverability/expert-framing test, Sofia as the governance-consolidation test, and Priya as the grounded-AI stress test.
- **Portal-native validation:** Grounding derives from the approved 2025 HaTS / Cirrus UXR (surface-agnostic Azure-user behaviours adapted to the GUI). Commission or attach portal-specific research (portal HaTS, blade-navigation task analysis, Copilot-in-portal telemetry) to confirm portal-specific pain points and refresh personas if portal segments differ.
- Flag any persona whose portal-specific claims cannot be corroborated by portal-native data before locking requirements.
