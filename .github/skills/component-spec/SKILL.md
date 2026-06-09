---
name: component-spec
description: "Generate standardized component documentation with props, variants, states, accessibility requirements, and design token dependencies. Use when documenting a React component for developer handoff, creating component API docs, or building a component library reference."
argument-hint: "Component name and description (e.g., 'Button - primary action trigger with multiple variants')"
---

# Component Specification Generator

## When to Use
- Documenting a component for developer handoff
- Creating API documentation for a component library
- Standardizing component documentation across a team
- Reviewing a component's accessibility requirements

## Procedure

### 1. Identify the Component
Determine the component to document. Check these sources:
- Design specs in `designs/`
- Existing code in `prototypes/components/`
- Figma files via MCP (if available)

### 2. Create the Spec Document

Use the template at [component-template.md](./assets/component-template.md) and fill in:

- **Overview**: Name, description, and usage context
- **Props/API**: All props with types, defaults, and descriptions
- **Variants**: Visual and behavioral variations
- **States**: All interactive states (default, hover, active, disabled, focus, error, loading)
- **Design Tokens**: Every token the component references
- **Accessibility**: ARIA roles, keyboard interactions, screen reader announcements
- **Usage Examples**: Code snippets showing common usage patterns

### 3. Save the Document

Save to `handoff/components/{ComponentName}.md`

### 4. Cross-Reference

- Verify props match the TypeScript interface in `prototypes/`
- Verify tokens match definitions in `designs/tokens/`
- Verify accessibility meets WCAG 2.1 AA
