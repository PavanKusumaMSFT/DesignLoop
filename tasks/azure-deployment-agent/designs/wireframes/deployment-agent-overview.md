---
title: "Wireframe: Deployment Agent Enhanced Experience"
phase: design
status: draft
created: 2026-05-13
updated: 2026-05-13
author: "Designer Agent"
related:
  - "../components/mode-switcher.md"
  - "../components/cost-annotation.md"
  - "../components/deploy-gate.md"
  - "../components/click-to-edit.md"
  - "../components/version-timeline.md"
---

# Wireframe: Deployment Agent Enhanced Experience

## Overview

This wireframe illustrates the end-to-end deployment agent workflow across five screens, demonstrating how the Mode Switcher, Cost Annotation, Click-to-Edit, Version Timeline, and Deploy Gate components integrate into a cohesive experience.

---

## Screen 1 — Copilot Side Panel with Mode Switcher

The entry point. The Copilot side panel displays the segmented mode control at the top, with the Deployment Agent chat conversation below.

```
┌─────────────────────────────────────┐
│  ┌─────┬──────┬─────────┐          │
│  │ Ask │ Plan │ *Agent* │          │
│  └─────┴──────┴─────────┘          │
│  Deployment Agent                   │
│─────────────────────────────────────│
│                                     │
│  🤖 Agent: What would you like to   │
│     deploy today?                   │
│                                     │
│  👤 You: Set up a web app with      │
│     AKS, SQL DB, and storage in     │
│     East US.                        │
│                                     │
│  🤖 Agent: I've drafted a workload  │
│     plan with 4 resources.          │
│     Review below ↓                  │
│                                     │
│─────────────────────────────────────│
│  ┌─────────────────────────────┐    │
│  │ Message Deployment Agent... │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**Components used:** Mode Switcher (`[Ask|Plan|*Agent*]` segmented control)

---

## Screen 2 — Workload Plan with Cost Annotations

The agent presents a resource table with inline cost badges. SKU fields are click-to-edit. An expanded cost badge shows alternative SKU options.

```
┌──────────────────────────────────────────────────────────────────┐
│  Workload Plan — "web-app-prod"                                  │
│──────────────────────────────────────────────────────────────────│
│                                                                  │
│  Resource       │ Type       │ SKU            │ Region  │ Est.Cost│
│  ───────────────┼────────────┼────────────────┼─────────┼─────────│
│  app-vm-01      │ VM         │ [Standard_D4s] │ East US │ $140/mo │
│  app-storage    │ Storage    │ [Standard_LRS] │ East US │  $25/mo │
│  app-aks        │ AKS        │ [Standard_D2s] │ East US │  $85/mo │
│  app-sqldb      │ SQL DB     │ [S1           ]│ East US │  $35/mo │
│                 │            │  ┌────────────────────────┐       │
│                 │            │  │ Alternatives:          │       │
│                 │            │  │  S0  —  $15/mo  ↓$20  │       │
│                 │            │  │  S2  —  $75/mo  ↑$40  │       │
│                 │            │  │  P1  — $465/mo  ↑$430 │       │
│                 │            │  └────────────────────────┘       │
│  ───────────────┴────────────┴────────────────┴─────────┴─────────│
│                                          Total: ~$285/mo         │
│                                                                  │
│  [ ] fields in brackets are click-to-edit                        │
│                                                                  │
│  [Continue to Deploy →]                                          │
└──────────────────────────────────────────────────────────────────┘
```

**Components used:** Cost Annotation (badges + alternatives dropdown), Click-to-Edit (SKU fields in brackets)

---

## Screen 3 — Version Diff with Timeline

The timeline strip shows versions v1–v5 with v4 and v5 selected for comparison. A diff table below shows resource-level changes grouped by resource group.

```
┌──────────────────────────────────────────────────────────────────┐
│  Version History                                                 │
│──────────────────────────────────────────────────────────────────│
│                                                                  │
│  ○───────○───────○───────●━━━━━━━●                               │
│  v1      v2      v3      v4      v5                              │
│                          ▲       ▲                               │
│                        selected                                  │
│                                                                  │
│  Comparing v4 ↔ v5                                               │
│                                                                  │
│  ┌──────────────────────────────────────────┐                    │
│  │ 🔍 Search versions...                    │                    │
│  └──────────────────────────────────────────┘                    │
│                                                                  │
│  Resource Group: rg-web-app-prod                                 │
│  ────────────────┬──────────────┬──────────────┬────────┬────────│
│  Resource        │ v4           │ v5           │ Status │ Cost Δ │
│  ────────────────┼──────────────┼──────────────┼────────┼────────│
│  app-vm-01       │ Standard_D2s │ Standard_D4s │ Changed│ +$70/mo│
│  app-storage     │ Standard_LRS │ Standard_LRS │ —      │   —    │
│  app-aks         │ Standard_D2s │ Standard_D2s │ —      │   —    │
│  app-sqldb       │ S1           │ S2           │ Changed│ +$40/mo│
│  app-cache       │ —            │ C1           │ Added  │ +$15/mo│
│  ────────────────┴──────────────┴──────────────┴────────┴────────│
│                                                                  │
│  Resource Group: rg-shared-services                              │
│  ────────────────┬──────────────┬──────────────┬────────┬────────│
│  Resource        │ v4           │ v5           │ Status │ Cost Δ │
│  ────────────────┼──────────────┼──────────────┼────────┼────────│
│  shared-kv       │ Standard     │ Standard     │ —      │   —    │
│  log-analytics   │ PerGB2018    │ —            │ Removed│ -$100/mo│
│  ────────────────┴──────────────┴──────────────┴────────┴────────│
│                                                                  │
│                                     Net Impact: +$25/mo          │
│                                                                  │
│  [← Back]                                      [Deploy This →]  │
└──────────────────────────────────────────────────────────────────┘
```

**Components used:** Version Timeline (dot strip + connector + search bar), Cost Annotation (Cost Δ column)

---

## Screen 4 — Deploy Gate

A pre-deployment validation checklist with five sections. A warning banner highlights items needing attention. Action buttons at the bottom.

```
┌──────────────────────────────────────────────────────────────────┐
│  Deploy Gate — Pre-Deployment Review                             │
│──────────────────────────────────────────────────────────────────│
│                                                                  │
│  ⚠ WARNING: 1 validation check requires attention                │
│                                                                  │
│  ┌─ 1. Resource Changes ────────────────────────────────────┐    │
│  │  ✅  3 resources unchanged                               │    │
│  │  🔄  2 resources modified (app-vm-01, app-sqldb)          │    │
│  │  ➕  1 resource added (app-cache)                         │    │
│  │  🗑  1 resource removed (log-analytics)                   │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─ 2. Validation Checks ───────────────────────────────────┐    │
│  │  ✅  Quota check — sufficient quota in East US            │    │
│  │  ✅  Naming conventions — all names compliant             │    │
│  │  ⚠️  RBAC — missing Contributor role on rg-shared-services│    │
│  │  ✅  Policy compliance — no violations                    │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─ 3. Cost Impact ─────────────────────────────────────────┐    │
│  │  Current:  $260/mo                                        │    │
│  │  Proposed: $285/mo                                        │    │
│  │  Delta:    +$25/mo (+9.6%)                                │    │
│  │  Budget:   $500/mo — ✅ within budget                     │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─ 4. Bicep Preview ───────────────────────────────────────┐    │
│  │  📄 main.bicep — 142 lines, 7 resources                  │    │
│  │  📄 modules/vm.bicep — 38 lines                           │    │
│  │  📄 modules/aks.bicep — 55 lines                          │    │
│  │  [View Full Bicep ↗]                                      │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌─ 5. Deployment Target ───────────────────────────────────┐    │
│  │  Subscription: Visual Studio Enterprise                   │    │
│  │  Resource Groups: rg-web-app-prod, rg-shared-services     │    │
│  │  Region: East US                                          │    │
│  │  Mode: Incremental                                        │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                  │
│  ┌──────────┐  ┌────────────┐  ┌──────────────┐                 │
│  │  Cancel   │  │ Save as PR │  │  Deploy →    │                 │
│  └──────────┘  └────────────┘  └──────────────┘                 │
└──────────────────────────────────────────────────────────────────┘
```

**Components used:** Deploy Gate (5 validation sections + warning banner + action buttons), Cost Annotation (cost impact section)

---

## Screen 5 — Post-Deploy Confirmation

A success state showing deployed resources, useful links, and a rollback option.

```
┌──────────────────────────────────────────────────────────────────┐
│  Deployment Complete                                             │
│──────────────────────────────────────────────────────────────────│
│                                                                  │
│  ✅ SUCCESS — All 6 resources deployed to East US                │
│     Completed at 2026-05-13 14:32 UTC (Duration: 4m 12s)        │
│                                                                  │
│  Deployed Resources:                                             │
│  ────────────────────┬────────────┬──────────────────────────────│
│  Resource            │ Type       │ Status                       │
│  ────────────────────┼────────────┼──────────────────────────────│
│  app-vm-01           │ VM         │ ✅ Running                   │
│  app-storage         │ Storage    │ ✅ Available                 │
│  app-aks             │ AKS        │ ✅ Running                   │
│  app-sqldb           │ SQL DB     │ ✅ Online                    │
│  app-cache           │ Redis      │ ✅ Connected                 │
│  shared-kv           │ Key Vault  │ ✅ Available                 │
│  ────────────────────┴────────────┴──────────────────────────────│
│                                                                  │
│  Quick Links:                                                    │
│  🌐 View in Azure Portal →                                      │
│  🔀 Pull Request #247 — "Deploy web-app-prod v5" →              │
│                                                                  │
│  ┌────────────────┐                                              │
│  │ ↩ Rollback v5  │                                              │
│  └────────────────┘                                              │
│                                                                  │
│  💡 Tip: You can rollback to any previous version from the       │
│     Version Timeline.                                            │
└──────────────────────────────────────────────────────────────────┘
```

**Components used:** Version Timeline (rollback action)

---

## Component Integration Map

| Screen | Mode Switcher | Cost Annotation | Click-to-Edit | Version Timeline | Deploy Gate |
|--------|:---:|:---:|:---:|:---:|:---:|
| 1. Copilot Panel | ✅ | — | — | — | — |
| 2. Workload Plan | — | ✅ | ✅ | — | — |
| 3. Version Diff | — | ✅ | — | ✅ | — |
| 4. Deploy Gate | — | ✅ | — | — | ✅ |
| 5. Post-Deploy | — | — | — | ✅ | — |
