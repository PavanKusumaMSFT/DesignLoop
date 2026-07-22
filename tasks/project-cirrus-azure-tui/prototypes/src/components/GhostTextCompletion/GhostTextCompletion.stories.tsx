import type { Meta, StoryObj } from '@storybook/react';
import { GhostTextCompletion } from './GhostTextCompletion';

const meta: Meta<typeof GhostTextCompletion> = {
  title: 'Cirrus/GhostTextCompletion',
  component: GhostTextCompletion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Single low-emphasis inline prediction after the caret (State A). ' +
          'Decorative visually (aria-hidden); an aria-live companion announces ' +
          'the suggestion so screen readers never read half-typed text as input.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          fontFamily: 'var(--font-family-mono)',
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-command)',
          background: 'var(--color-surface-terminal)',
          padding: 16,
        }}
      >
        <span>$ az storage account cre</span>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    visible: { control: 'boolean' },
    variant: { control: 'inline-radio', options: ['rich', 'plain'] },
    maxWidthCh: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof GhostTextCompletion>;

export const Visible: Story = {
  args: {
    suggestion: 'ate --name mydata',
    matchedPrefix: 'ate',
    visible: true,
    onAccept: () => {},
  },
};

export const Hidden: Story = {
  args: { suggestion: null, visible: false, onAccept: () => {} },
};

export const Overflow: Story = {
  args: {
    suggestion: 'ate --name mydata --resource-group rg-shared-eastus --sku Standard_LRS',
    visible: true,
    maxWidthCh: 24,
    onAccept: () => {},
  },
};

export const PlainVariantNoGhost: Story = {
  args: {
    suggestion: 'ate --name mydata',
    visible: true,
    variant: 'plain',
    onAccept: () => {},
  },
};
