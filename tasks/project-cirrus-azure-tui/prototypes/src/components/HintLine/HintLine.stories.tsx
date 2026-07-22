import type { Meta, StoryObj } from '@storybook/react';
import { HintLine } from './HintLine';

const meta: Meta<typeof HintLine> = {
  title: 'Cirrus/HintLine',
  component: HintLine,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'One quiet, expert-framed, dismissible hint line (State D). Neutral ' +
          'copy only — never beginner-stigma phrasing (NG5). role="note" in a ' +
          'polite live region; dismiss is a real focusable button.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: 'var(--color-surface-terminal)' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    dismissible: { control: 'boolean' },
    variant: { control: 'inline-radio', options: ['rich', 'plain'] },
  },
};
export default meta;

type Story = StoryObj<typeof HintLine>;

export const Shown: Story = {
  args: {
    message: '3 required flags remain',
    shortcut: { keys: 'Ctrl+Space', action: 'review' },
    onDismiss: () => {},
    onDisableAll: () => {},
  },
};

export const NoShortcut: Story = {
  args: { message: '42 SKUs available', onDismiss: () => {} },
};

export const PlainVariant: Story = {
  args: {
    message: '3 required flags remain',
    shortcut: { keys: 'Ctrl+Space', action: 'review' },
    variant: 'plain',
    onDismiss: () => {},
  },
};

export const EmptyRendersNothing: Story = {
  args: { message: '', onDismiss: () => {} },
};
