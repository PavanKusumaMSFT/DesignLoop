---
title: "What Prior Research Tells Us — Error Handling · UXR Summary"
phase: discover
status: approved
created: 2026-06-23
updated: 2026-06-23
author: "Zainab Alasadi (UXR)"
related: ["../findings-synthesis.md"]
source: "Inline UXR summary provided in task instruction (verbatim capture)"
---

# What Prior Research Tells Us — Error Handling · UXR Summary

Synthesizing feedback on how users experience and interpret errors in Azure CLI and Azure PowerShell, identifying recurring themes and areas for improvement.

**Author(s):** Zainab Alasadi (UXR) | May 2026
**Stakeholders:** Aakash Basavaraj (PM), Teresa Ritorto (EM), Yu Chen (EM), Yong Zhang (EM), Pavan Kusuma (UXD)

## TL;DR

TODO (not supplied in source).

## Recommendation

TODO (not supplied in source).

## Methodology

The findings in this document are derived from **115 error-related open-text responses** collected through the Azure CLI and Azure PowerShell **HaTS survey** between **October 2022 and June 2026**. Responses were sourced from the open-text question: *"What, if anything, do you dislike about using Azure CLI/Azure PowerShell?"*

Approximately **75% of responses were from Azure CLI users** and **25% were from Azure PowerShell users**. Verbatims were analysed to identify recurring themes and user sentiments.

## Findings

### Finding 1 (Most prevalent) — Errors are vague and cryptic

Users know something went wrong but cannot easily interpret what actually went wrong. The single most-cited complaint. Customers consistently describe error text as generic and "cryptic." Consistent with Azure Portal error sentiment, where understanding & mitigating error messages accounts for the largest volume of feedback received (318/month in Oct 2025 and increasing).

- "Error messages are often useless 'at least one resource deployment operation failed.' Sure but which one?" — CLI, April 2023
- "Cryptic error messages if something doesn't work. It is not always clear what the problem is." — CLI, March 2024
- "Errors are not always clear on WHAT the root Problem is." — PS, January 2025
- "Incomplete error messages when a deployment fails. I need to go into the portal to see the detailed information." — CLI, January 2026

**Recommendation:** Errors should adopt a **3-part contract** —
- *What happened:* plain-language summary in customer vocabulary (not stack-trace excerpt)
- *Why:* the likely cause(s), distinguishing user-input vs. environment vs. service issues
- *What to try next:* 1–3 concrete actions, or a doc link specific to this error

### Finding 2 — Errors tell what failed but not how to fix it

Some error messages may tell users what failed but not how to fix it, making it difficult for users to recover and continue their workflow. Customers want errors to be a starting point for resolution, pointing to the right command, doc, or remediation step. Today they describe being dropped into a problem with no path forward, often falling back to the Azure Portal, Microsoft Support, or AI assistants to translate.

- "Better error handling with remediation steps. The output is sometimes vague and hard to follow to the exact cause." — CLI, November 2024
- "The error messages it returns are very vague, pointing to general documentation instead of specific ones related to the subject or error." — CLI, March 2026
- "Some error messages could be more precise to indicate what I should change to fix an error, even if it comes from Azure itself." — CLI, June 2023

**Recommendation:** Ensure error messages clearly communicate the resolution — corrected command, remediation step, and/or detailed documentation related to the issue (not generic docs landing pages).

### Finding 3 (#2 most prevalent) — Errors can be misleading

Beyond being unclear, errors often actively mislead, surfacing a symptom (auth, role, "conditional access") when the real cause is something else (network, firewall, missing config). This costs hours or days of misdirected troubleshooting.

- "Error messages are often misleading or otherwise unhelpful. For example, error messages that are due to insufficient authorization or incorrect context often do not provide any indication of the actual cause." — CLI, August 2025
- "It doesn't work on the latest version of Ubuntu, and the error messages there took our team three days to figure out that it just wasn't working on Ubuntu." — CLI, February 2025
- "The error messages can be very misleading. For example, if the storage account firewall is blocking the connection, the reported error is that you don't have the correct role." — CLI, May 2023
- "Error messages that do not make sense. I am constantly blocked by 'conditional access policies prevent access…' and THERE IS NO CAP ON MY ACCOUNT." — CLI, April 2023

**Recommendation:** Azure CLI tools shouldn't be passthroughs for Azure's confusing errors — they should be the layer that translates them. Explore solutions that disambiguate unclear errors (test connectivity, permissions, environment).

### Finding 4 — Error output formatting is unreadable

Stringified JSON-in-JSON, walls of text. Even when the underlying error information is present, the formatting destroys readability: nested escaped JSON, no visual hierarchy. Users describe needing dedicated time just to read the error before they can act on it.

- "The most annoying thing is that error messages are almost always stringified JSON, within another JSON. This results in very ugly quote escaping and make it very unreadable and thus less actionable." — CLI, October 2023
- "What would be better for error handling is not showing a 'wall of text' when a command fails (mostly from 'az aks' commands). I want a clear, concise error code/message with actionable results as a user." — CLI, July 2023
- "I wish there were an option to format the error messages to make them more human-readable." — CLI, October 2022
- "If I have a bicep error for example using az deployment group create, the error output is multiple times escaped json which could be parsed and displayed properly." — CLI, October 2022
- "Clearer error messages would be nice - sometimes the actual cause is buried." — CLI, December 2022

**Recommendation:** Offer a human-readable view of JSON error messages, enabling users to understand and act on errors without needing to parse structured data.

### Finding 5 — Inconsistent failure signalling breaks scripting and automation

Users report commands don't reliably tell calling scripts that they failed. Some return non-zero exit codes, some return 0 on failure; some write errors to stderr, others to stdout. The convention varies by command group, so every script must handle every command differently. Most damaging in DevOps and CI/CD contexts where the CLI is invoked at scale and silent or mis-signalled failures slip past pipeline guardrails.

- "The tool should write errors to STDERR stream and always set the return code to non-zero if an error happens, it is really difficult to track errors in the tool while automation is where it is used the most." — CLI, July 2023
- "Just some of command groups and just recently have implemented outputting errors to the stderr stream instead of stdout. And returning non-zero exit code on errors. It would be nice to have a common approach where all commands use stderr and non-zero exit codes for errors…" — CLI, January 2024
- "Inconsistent return values, sometimes you have a message of failure and error code 0, sometimes ok. Makes CLI automation tricky as you cater for command specific response handling." — CLI, August 2024
- "Error output is different for different command classes, some of them have non-zero return code, some not, some of them write to stderr (Win, Linux), some not. Error handling sometimes change and breaks automation." — CLI, January 2025
- "The way that errors are displayed. Every subcommand has it's own way to display errors. […] Since azcli is also used in DevOps, unifying error messages would be a big plus." — CLI, October 2022

**Recommendation:** Ensure all errors print to stderr and always set the return code to non-zero if an error happens.

### Finding 6 — Inconsistency across cmdlets violates PowerShell norms

PS users have a distinct sub-theme: the inconsistency between Az cmdlets feels un-PowerShell-like. Some cmdlets throw on not-found, others return null; ErrorAction is ignored; errors aren't always written to the error stream. This breaks the idiomatic try/catch and pipeline patterns PS users expect.

- "Inconsistent error handling (some Cmdlets fail if a resource is not found, others don't), inconsistent parameters (-SubscriptionId vs -DefaultProfile)… Azure PowerShell sometimes feels more like a collection of modules rather than one cohesive experience." — PS, July 2024
- "I would like it if all of the Azure PowerShell respected the -ErrorAction SilentlyContinue rather than ignoring it and spitting out an error." — PS, June 2024
- "No error is sent to the error stream, and to find out what happened, I have to parse JSON of the $error object to find out what is wrong. And I do not have a specific exception or error ID; if I want to handle errors programatically, I have to parse the text of the error message. That in general is totally inconsistent with the spirit of PowerShell error handling." — PS, August 2024
- "Some cmdlets (I think key vault network rules, role assignments) will throw errors if the rule doesn't exist, even if NotExists is expected." — PS, August 2023

**Recommendation:** Standardize cmdlet behaviour to align with PowerShell conventions and user expectations.

### Finding 7 — Raw Python tracebacks and unhandled exceptions leak to users

Raw Python tracebacks expose implementation details that most users cannot act on, increase cognitive load during troubleshooting, and create a perception of poor product quality.

- "Also, every once in a while, when I encounter an error, the CLI throws up an ugly Python stack trace; I wish runtime errors were a little better insulated and rendered when the debug flags aren't turned on." — CLI, October 2024
- "Sometimes it throws python errors. These should all be caught and wrapped into helpful messages from the application itself." — CLI, April 2026
- "It spits out a lot of python errors on console." — CLI, September 2025

**Recommendation:** Catch and gracefully handle unexpected exceptions before they reach end users.

### Finding 8 — Warnings are noisy, intrusive, and hard to manage

Warnings are occasionally surfaced in contexts where users expect clean, structured output (such as JSON), and users report limited control over suppressing notices they have already acknowledged. The cumulative effect is warning fatigue: automation users lose confidence in machine-readable output, while interactive users become desensitized and more likely to ignore important messages.

- "Error message (or warning) appears when using JSON output !!!" — CLI, June 2024
- "When deprecate errors appear and cannot be removed." — CLI, November 2024
- "Lots of warnings." — CLI, February 2026

**Recommendation:** Reduce warning noise — ensure warnings are contextually relevant, do not contaminate structured outputs, and can be easily dismissed or suppressed once acknowledged.

### Finding 9 (Emerging signal) — Users increasingly use AI assistants to decode errors

A small but growing signal from 2024–2026 verbatims: users turn to AI assistants (Copilot, ChatGPT, Claude) specifically to decode Az CLI/PS errors. This indicates the bar for "good enough errors" is rising — users may now compare Az CLI/PS error output to an LLM's explanation of it.

- "Basically, it's way too complicated. If I wasn't using Claude code to generate my az… commands, I would never be able to use it." — CLI, October 2025
- "Bad experience, I have to use ChatGPT as assistant to use Azure PowerShell, otherwise there are many errors that I can't handle them within minutes." — PS, January 2025
- "I strongly believe the error messages could be analyzed by an AI or something else to describe clearer the error and options to resolve the problem." — CLI, May 2026
