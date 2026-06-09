---
description: "Use when creating or editing React components in TSX/JSX. Covers design system patterns, accessibility requirements, Storybook readiness, and TypeScript conventions."
applyTo: ["**/*.tsx", "**/*.jsx"]
---

# React Component Standards

## Component Structure

- Use functional components with hooks
- Export components as **named exports** (not default)
- Define a TypeScript `interface` for props (suffix: `Props`)
- Co-locate component, styles, and stories in the same directory

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css
└── ComponentName.stories.tsx
```

## Design Token Usage

- Import tokens via CSS Modules referencing CSS custom properties
- Use `var(--token-name)` for all colors, spacing, typography, elevation
- Never hardcode values — always reference design tokens from `designs/tokens/`

```css
/* Good */
.button { background: var(--color-primary-500); padding: var(--spacing-sm) var(--spacing-md); }

/* Bad */
.button { background: #3B82F6; padding: 8px 16px; }
```

## Accessibility

- All interactive elements must be keyboard-accessible
- Include `aria-label` or `aria-labelledby` for non-text interactive elements
- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`) over generic `<div>`
- Add `role` attributes only when semantic HTML is insufficient
- Include visible focus indicators using `--color-primary-500`
- Support `prefers-reduced-motion` for animations

## Storybook Readiness

- Every component should have a `.stories.tsx` file
- Include stories for each variant and state
- Use `argTypes` for interactive controls
- Add `tags: ['autodocs']` for automatic documentation
