---
source: https://www.figma.com/proto/pc5Xfta4qujYYEImIfLXFI/Project-Cirrus?node-id=813-1502
fetched: 2026-06-23
title: "Project Cirrus — AI-assisted Azure CLI error handling (prototype capture)"
phase: test
status: approved
author: "Tester Agent"
note: "Password-gated Figma prototype. Accessed with the provided password and captured frame-by-frame via Playwright. Frames saved in ./screens/."
---

# Project Cirrus — Prototype Source of Truth

> Captured from the password-protected Figma prototype `Project Cirrus`
> (node `813:1502`, starting point). The prototype is a **simulated zsh terminal**
> demonstrating an **AI-assisted error-recovery experience for the Azure CLI** (`az`).
> 8 frames were captured by advancing the prototype; screenshots live in
> `./screens/frame-00.png … frame-07.png`.

## What the feature is

When an `az` command fails, the CLI offers an **AI "root cause analysis"** step that:
1. Detects the error,
2. Analyses the command and the error,
3. Surfaces a structured list of issues, and
4. Proposes concrete corrective next-action commands the user can copy and run.

The simulated user is **MonaKane** in a `monakane —zsh - 124x79` terminal window.

## The captured flow (state by state)

| Frame | State | On-screen content |
|---|---|---|
| 00 | Idle prompt | `MonaKane [ ~ ]$` empty prompt, black terminal. |
| 01 | Command typed | `az vm create -g myRG -n myvm1 --image Ubuntu2204 --admin-username azureuser --generate-ssh-keys` |
| 02 | Running / warning | Yellow warning: `The default value of '--size' will be changed to 'Standard_D2s_v5' from 'Standard_DS1_v2' in a future release.` + blinking cursor (in-progress). |
| 03 | Error returned | Red error block: `(ResourceGroupNotFound) Resource group 'myRG' could not be found.` / `Code: ResourceGroupNotFound` / `Message: Resource group 'myRG' could not be found.` |
| 04 | AI analysis (loading) | `Analyzing error root cause using AI ...` with blinking cursor. |
| 05 | AI help (result) | See "AI help output" below. |
| 06–07 | Settled | Same as 05, returned to `MonaKane [ ~ ]$` prompt (flow end). |

## AI help output (frame 05 — the core deliverable)

```
AI help
---------
Found 6 issues:
1. Invalid flag: `-g`, use --resource-group
2. Invalid flag: `-n`, use --name
3. Unsupported option: --image
4. Unsupported option: --generate-ssh-keys
5. Missing required: --location, --vm-size, --subscription-id
6. Missing resource: resource group `myRG`

Next action:
1. Create missing resource group
   └ az group create --name myRG --location eastus --subscription-id 2dad32d6-b188-49e6-9437-ca1d51cec4dd

2. Retry VM creation with corrected parameters
   └ az vm create --name myvm1 --resource-group myRG --location eastus --subscription-id 2dad32d6-b188-49e6-9437-ca1d51cec4dd --vm-size Standard_D2vs_v3 --admin-username azureuser --admin-password <your-admin-password> --network-interface-name myvm1-nic --virtual-network-name myvm1-vnet --network-security-group-name myvm1-nsg

AI-generated content may be incorrect
```

Then the prompt returns to `MonaKane [ ~ ]$`.

## Measured visual styling (sampled from frame-05)

| Element | Foreground | Background | Contrast | WCAG AA (4.5:1) |
|---|---|---|---|---|
| Command / normal text | `#F2F2F2` | `#000000` | 18.76:1 | Pass |
| Warning text | `#C19C00` | `#000000` | 8.02:1 | Pass |
| Error text | `#E74856` | `#000000` | 5.46:1 | Pass |
| Secondary / dim text | `#B6B6B6` | `#000000` | 10.36:1 | Pass |
| Dimmest sampled text | `#797979` | `#000000` | 4.82:1 | Pass (marginal) |

Terminal window: dark body `#000000`, light title bar with macOS traffic-light controls and `monakane —zsh - 124x79` label. Monospace typeface throughout.

> Note: The cookie banner and "enable hardware acceleration" toast visible at the
> bottom of the raw screenshots are **Figma chrome**, not part of the design, and are
> excluded from evaluation.

## Interaction model (inferred — flagged as assumption)

The prototype is a linear click-through; it does not expose the real interaction
affordances. The following are **assumptions** the Test stage must validate, not
established facts:

- **A1** — How the user *triggers* AI analysis (automatic on error vs. an explicit
  prompt/keypress such as `az ?` or pressing a key) is not shown. Frame 04 implies it
  runs automatically after the error.
- **A2** — Whether the suggested `Next action` commands are **copyable, selectable,
  or executable in place** (e.g. press a number, press Enter) is not shown.
- **A3** — No visible focus indicator, selection state, or keyboard hint is rendered
  in any captured frame.
- **A4** — The AI output is **plain terminal text**; there is no indication of an
  accessible/structured (ARIA) layer, because this is a native terminal, not a DOM UI.
