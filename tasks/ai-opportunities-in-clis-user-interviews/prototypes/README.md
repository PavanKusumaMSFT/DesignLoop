---
title: "Prototype README: Evidence Console"
phase: prototype
status: approved
created: 2026-07-12
updated: 2026-07-12
author: "Prototyper Agent"
related: ["../designs/wireframe-spec.md", "../designs/component-spec.md", "demos/EvidenceConsole.html"]
---

# Prototype README: Evidence Console

## Overview

This self-contained HTML demo exercises the selected Evidence Console concept without a framework scaffold or external service. Its command, evidence, and run result are illustrative local content; it never calls Azure, sends entered text to a service, or executes a command.

## Run

Open [demos/EvidenceConsole.html](demos/EvidenceConsole.html) in a current desktop browser. No package installation or server is required.

## Test Path

1. Enable assistance with the switch.
2. Enter a CLI goal, then choose **Generate suggestion**.
3. Review the command, evidence labels, and environment boundary.
4. Use **Review correction** to update the editable terminal preview.
5. Select **Run command** to verify the explicit no-execution notice.

## Constraints

This demo is a design prototype, not a command generator or validator. It demonstrates user control and scope communication only; it cannot validate credentials, permissions, quotas, naming conventions, or actual Azure syntax.

## Next Steps

- [ ] Run the usability tasks against the demo.
- [ ] Replace static data with governed, documented validation sources only after privacy and approval decisions are made.