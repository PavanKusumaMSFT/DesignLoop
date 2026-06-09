---
name: design-to-code
description: "Convert design specifications or Figma files into React components with TypeScript, CSS Modules using design tokens, and Storybook stories. Use when translating designs to code, building components from specs, converting Figma to React, or generating Storybook stories from component definitions."
argument-hint: "Component name and design source (e.g., 'Card component from designs/components/card-spec.md')"
---

# Design-to-Code Conversion

## When to Use
- Converting a design specification into a React component
- Extracting component structure from Figma (via MCP)
- Generating a Storybook story for a new component
- Building a component that matches an existing design spec

## Procedure

### 1. Read the Design Source

Check for the design spec in one of these locations:
- `designs/components/{ComponentName}.md` — Written component spec
- Figma file via `figma/*` MCP tools — Live design data
- `designs/wireframes/` — Wireframe references

Extract:
- Component name and description
- Props and their types
- Visual variants (primary, secondary, etc.)
- Interactive states (hover, active, disabled, focus)
- Design tokens used
- Layout and spacing details

### 2. Generate the React Component

Use the template at [component.tsx.template](./assets/component.tsx.template):
- Create a functional component with TypeScript
- Define a props interface with all variants and states
- Use CSS Modules for styling
- Reference design tokens as CSS custom properties
- Add ARIA attributes for accessibility
- Add keyboard event handlers where needed

Save to: `prototypes/components/{ComponentName}/{ComponentName}.tsx`

### 3. Generate CSS Module

Create `prototypes/components/{ComponentName}/{ComponentName}.module.css`:
- Use design tokens (`var(--token-name)`) for all values
- Include styles for all variants and states
- Add focus-visible styles for keyboard navigation
- Include responsive breakpoints if specified
- Use `prefers-reduced-motion` for animation

### 4. Generate Storybook Story

Use the template at [story.tsx.template](./assets/story.tsx.template):
- Create stories for each variant
- Add stories for interactive states
- Include a playground story with all controls
- Add accessibility documentation

Save to: `prototypes/components/{ComponentName}/{ComponentName}.stories.tsx`

### 5. Verify

- Check all design tokens are valid (exist in `designs/tokens/`)
- Ensure TypeScript types are complete
- Verify accessibility attributes are present
- Confirm the component matches the design spec
