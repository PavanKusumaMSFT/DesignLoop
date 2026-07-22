---
description: "Use when creating or editing React components in TSX/JSX. Covers design system patterns, accessibility requirements, Storybook readiness, and TypeScript conventions."
applyTo: ["**/*.tsx", "**/*.jsx"]
---

# React Component Standards — Fluent UI React v9

## Component Structure

- Use React with TypeScript, functional components, and hooks.
- Export components as **named exports** unless an existing framework convention requires otherwise.
- Define a TypeScript `interface` for props (suffix: `Props`).
- Reuse shared components before creating a new component: check `prototype-workspace/component-map.json`, `prototype-workspace/components/shared/`, and `prototype-workspace/AGENTS.md` first.

## Mandatory Fluent v9 Styling

- Use Fluent UI React v9 (`@fluentui/react-components`) for Design and Prototype phase React code.
- Use `makeStyles` plus Fluent tokens. Do **not** use CSS Modules, styled-components, Tailwind, or generic CSS-variable token wrappers in prototype React code.
- Every TSX file that styles with Fluent tokens must include the SafeTokens alias:

```tsx
import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";
type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
```

- Use Fluent token families such as `colorNeutral*`, `colorBrand*`, `spacingHorizontal*`, `spacingVertical*`, `fontSize*`, `fontWeight*`, `lineHeight*`, `borderRadius*`, and `shadow*`.
- The only allowed hardcoded hex values are Azure brand blues: `#0078D4`, `#106EBE`, and `#005A9E`.
- Inline `style={}` is forbidden except for truly dynamic values that cannot be expressed with `makeStyles`.

## Fluent Primitives Over Raw HTML

Use Fluent primitives for UI semantics and typography:

- Actions: `Button`, `CompoundButton`, `ToggleButton`, `MenuButton`
- Typography: `Text`, `Body1`, `Body2`, `Caption1`, `Subtitle1`, `Title2`, `Title3`
- Surfaces: `Card`, `CardHeader`, `Divider`, `Toolbar`
- Forms: `Field`, `Input`, `Textarea`, `Dropdown`, `Combobox`, `Checkbox`, `RadioGroup`, `Switch`
- Data and status: `Table`, `Badge`, `MessageBar`, `Spinner`, `Tooltip`, `TabList`

Do not use raw `<p>`, `<span>`, `<h1>`–`<h6>`, or styled `<div>` elements for typography when a Fluent text component fits. Use raw `div` only for neutral layout wrappers.

## Icons and Assets

- Use `@fluentui/react-icons` for UI chrome such as search, settings, chevrons, add, dismiss, and status glyphs.
- Use `<img>` for Azure service logos from `prototype-workspace/public/azure-service-icons/{category}/*.svg`.
- Use `<img>` for portal/custom icons from `prototype-workspace/public/icons/`.
- Never paste inline `<svg>` into React components.
- All images require meaningful `alt` text, or empty `alt=""` only for decorative imagery.

## Accessibility

- Prefer Fluent components because they provide keyboard, focus, and ARIA behavior by default.
- Maintain WCAG 2.1 AA: 4.5:1 contrast for normal text, 3:1 for large text and non-text UI indicators.
- Ensure custom interactive regions are keyboard-accessible and have visible focus indicators.
- Add `aria-label` or `aria-labelledby` for icon-only controls.
- Support `prefers-reduced-motion` for animations and avoid motion that blocks task completion.

## Storybook Readiness

- Prototype workspace components should include Storybook CSF3 stories when promoted to reusable or shared use.
- Cover each variant, state, and accessibility-relevant interaction.
- Use `argTypes` for interactive controls and `tags: ['autodocs']` where appropriate.
