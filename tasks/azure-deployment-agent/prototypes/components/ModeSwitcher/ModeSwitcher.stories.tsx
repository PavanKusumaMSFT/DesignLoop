import type { Meta, StoryObj } from '@storybook/react';
import { ModeSwitcher } from './ModeSwitcher';

const meta: Meta<typeof ModeSwitcher> = {
  title: 'Components/ModeSwitcher',
  component: ModeSwitcher,
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['ask', 'plan', 'agent'],
    },
    activeAgent: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    onModeChange: (mode) => console.log('Mode changed:', mode),
  },
};

export default meta;
type Story = StoryObj<typeof ModeSwitcher>;

export const Default: Story = {
  args: {
    mode: 'ask',
  },
};

export const PlanMode: Story = {
  args: {
    mode: 'plan',
  },
};

export const AgentMode: Story = {
  args: {
    mode: 'agent',
  },
};

export const AgentWithName: Story = {
  args: {
    mode: 'agent',
    activeAgent: 'Deploy',
  },
};

export const Disabled: Story = {
  args: {
    mode: 'ask',
    disabled: true,
  },
};
