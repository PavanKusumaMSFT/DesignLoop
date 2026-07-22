---
name: implementation-guide
description: "Write the step-by-step developer implementation guide: environment setup, component installation, design token application, usage patterns, and common pitfalls. Use after component specs are finalised to enable engineers to implement without design support."
argument-hint: "Feature or component set name (e.g., 'DesAIgns Button component — implementation guide')"
---

# Implementation Guide

## When to Use
- After component specs are approved and reviewed
- Before engineering sprint begins
- When a new developer joins the project and needs a complete onboarding reference

## Procedure

### 1. Read Source Artifacts

Load:
- `handoff/components/` — all component spec files
- `designs/tokens/` — design token definitions
- `prototypes/components/` — reference implementation code
- `prototypes/demos/` — demo pages for visual reference

### 2. Write the Prerequisites Section

List everything a developer needs before they start:
- Node.js version
- Package manager (npm/yarn/pnpm)
- Required peer dependencies with minimum versions
- Environment variables (if any)
- Access requirements (design system package, Figma, etc.)

### 3. Write the Setup Steps

Numbered, copy-pasteable steps:

```
## 1. Install the package

\`\`\`bash
npm install @desaigns/components
\`\`\`

## 2. Import design tokens

Add to your root CSS or layout file:
\`\`\`css
@import '@desaigns/components/tokens.css';
\`\`\`

## 3. Configure your bundler (if required)

{Step-by-step with code}
```

Every code block must be runnable as-is. Do not include pseudocode.

### 4. Write Component Usage Patterns

For each component, document:

**A. Basic Usage**
The minimal correct usage — the "just make it work" example.

**B. Common Patterns**
The 3–5 most frequently needed usage patterns, each with a complete code example.

**C. Props Reference**
A table matching the component spec: Prop | Type | Default | Required | Description

**D. Do / Don't**
3–5 pairs showing correct and incorrect usage with explanation.

**E. Accessibility Notes for Engineers**
- ARIA attributes they must set manually (if any)
- Event handlers they must wire for keyboard support
- Focus management they are responsible for

**F. Design Token Customisation**
Which tokens can be overridden to theme the component, with examples.

### 5. Write the Troubleshooting Section

List the 5–8 most common implementation mistakes:

```
### Problem: Component renders without styles

**Symptom**: The component appears unstyled in the browser.

**Cause**: The token CSS file is not imported.

**Fix**: Add `@import '@desaigns/components/tokens.css'` to your root stylesheet.
```

### 6. Write the Testing Guide

How to verify the implementation is correct:
- Unit test patterns for the component's props
- Accessibility check: what `axe-core` result to expect
- Visual check: which demo page to compare against

### 7. Save the Document

Save to `handoff/implementation-guide.md`.

Every code example must be syntactically valid and match the component spec's TypeScript types. Do not use `any` types in examples.
