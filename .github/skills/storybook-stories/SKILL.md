---
name: storybook-stories
description: "Write Fluent UI React v9 Storybook CSF3 stories in the prototype workspace, covering all component variants, interactive states, and accessibility annotations using @storybook/addon-a11y. Use after design-to-code to create a living component library for workspace prototypes."
argument-hint: "Task ID and component name (e.g., 'cost-dashboard MetricSummary — all variants and states')"
---

# Storybook Stories

## When to Use
- After design-to-code has produced Fluent UI React v9 components in the prototype workspace
- When building a living component library for task prototypes or shared components
- Before accessibility audit — Storybook with a11y addon provides automated checks

## Procedure

### 1. Read Source Artifacts

Load:
- `tasks/{taskId}/designs/` — component spec, variants, states, and ARIA requirements
- `prototype-workspace/components/projects/{taskId}/` — project component implementation
- `prototype-workspace/components/shared/` — shared component implementation, when writing shared stories
- Workspace Storybook configuration and decorators, including the FluentProvider decorator

### 2. Choose the Story Location

Save CSF3 story files to the workspace:
- Project-specific stories: `prototype-workspace/components/projects/{taskId}/*.stories.tsx`
- Shared component stories: colocated with the shared component under `prototype-workspace/components/shared/`

Do not write stories under `tasks/{taskId}/prototypes/`. That directory holds only the pointer manifest and Playwright screenshots.

### 3. Configure the Story File

Use Storybook CSF3 format. Required imports:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { {ComponentName} } from './{ComponentName}';
```

Default export (Meta):
```typescript
const meta: Meta<typeof {ComponentName}> = {
  title: 'Prototype/{taskId}/{ComponentName}',
  component: {ComponentName},
  parameters: {
    layout: 'centered',
    a11y: { config: { rules: [{ id: 'color-contrast', enabled: true }] } },
    docs: { description: { component: '{Description from component spec}' } },
  },
  argTypes: {
    // Map every prop from the component spec with controls
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof {ComponentName}>;
```

Rely on the workspace's Fluent decorator (`FluentProvider`) instead of wrapping each story in a custom provider unless the component needs an additional local provider such as `CopilotProvider`.

### 4. Write Required Stories

**One story per variant** (from component spec Variants section):
```typescript
export const {VariantName}: Story = {
  args: { /* props that produce this variant */ },
  parameters: { docs: { description: { story: '{What this variant is for}' } } },
};
```

**One story per interactive state** (Default, Hover, Focus, Active, Disabled, Error, Loading):
```typescript
export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled button' },
};
```

**One story for the full prop matrix** (shows all variants × states in a grid):
```typescript
export const AllVariants: Story = {
  render: () => (
    <div className={styles.grid}>
      {/* Render all variant × state combinations */}
    </div>
  ),
};
```

Use `makeStyles`, Fluent tokens, and the SafeTokens pattern for story-only layout styles. Avoid inline styles, CSS Modules, Tailwind, and raw HTML text elements.

### 5. Add Accessibility Annotations

For stories that test accessibility-critical interactions, add play functions:

```typescript
export const KeyboardNavigation: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};
```

At minimum, write a keyboard navigation story for every interactive component and keep the a11y addon enabled.

### 6. Add argTypes for Every Prop

Every prop in the component spec must have an `argType` entry:
- `control`: appropriate control type (`select`, `boolean`, `text`, `color`, `range`)
- `description`: one-line description from the spec
- `table.defaultValue`: the default from the spec

### 7. Save and Verify the Story File

Save to `prototype-workspace/components/projects/{taskId}/*.stories.tsx` or the relevant shared component folder.

Run Storybook from the workspace:

```bash
pnpm --dir prototype-workspace storybook
```

The file must be parseable by Storybook without modification — do not include pseudocode or placeholder imports.
