import type { Meta, StoryObj } from '@storybook/react';
import { ProgressStepper, Step } from './ProgressStepper';

const meta: Meta<typeof ProgressStepper> = {
  title: 'HITS/ProgressStepper',
  component: ProgressStepper,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['horizontal', 'vertical', 'minimal'],
    },
    completionPercentage: {
      control: { type: 'range', min: 0, max: 100 },
    },
    currentStep: {
      control: { type: 'number', min: 0, max: 5 },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '32px', background: '#FAFAFA', maxWidth: '700px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProgressStepper>;

const standardSteps: Step[] = [
  { id: 'consent', label: 'Consent', state: 'completed' },
  { id: 'screening', label: 'Screening', state: 'completed' },
  { id: 'tasks', label: 'Study Tasks', description: 'Complete all assigned activities', state: 'active' },
  { id: 'survey', label: 'Final Survey', description: 'Share your overall experience', state: 'upcoming' },
  { id: 'complete', label: 'Complete', description: 'Receive your compensation', state: 'upcoming' },
];

// === Variants ===

export const Horizontal: Story = {
  args: {
    steps: standardSteps,
    currentStep: 2,
    completionPercentage: 45,
    variant: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    steps: standardSteps,
    currentStep: 2,
    completionPercentage: 45,
    variant: 'vertical',
  },
};

export const Minimal: Story = {
  args: {
    steps: standardSteps,
    currentStep: 2,
    completionPercentage: 45,
    variant: 'minimal',
  },
};

// === States ===

export const AllUpcoming: Story = {
  name: 'All Steps Upcoming',
  args: {
    steps: [
      { id: 'consent', label: 'Consent', state: 'active' },
      { id: 'screening', label: 'Screening', state: 'upcoming' },
      { id: 'tasks', label: 'Study Tasks', state: 'upcoming' },
      { id: 'survey', label: 'Final Survey', state: 'upcoming' },
    ],
    currentStep: 0,
    completionPercentage: 0,
    variant: 'horizontal',
  },
};

export const AllCompleted: Story = {
  name: 'All Steps Completed',
  args: {
    steps: [
      { id: 'consent', label: 'Consent', state: 'completed' },
      { id: 'screening', label: 'Screening', state: 'completed' },
      { id: 'tasks', label: 'Study Tasks', state: 'completed' },
      { id: 'survey', label: 'Final Survey', state: 'completed' },
      { id: 'complete', label: 'Complete', state: 'completed' },
    ],
    currentStep: 4,
    completionPercentage: 100,
    variant: 'horizontal',
  },
};

export const WithError: Story = {
  name: 'Error State',
  args: {
    steps: [
      { id: 'consent', label: 'Consent', state: 'completed' },
      { id: 'screening', label: 'Screening', description: 'Additional info required', state: 'error' },
      { id: 'tasks', label: 'Study Tasks', state: 'upcoming' },
      { id: 'survey', label: 'Final Survey', state: 'upcoming' },
    ],
    currentStep: 1,
    completionPercentage: 25,
    variant: 'horizontal',
  },
};

export const VerticalWithError: Story = {
  name: 'Vertical with Error',
  args: {
    steps: [
      { id: 'consent', label: 'Consent', description: 'Review and accept terms', state: 'completed' },
      { id: 'screening', label: 'Screening', description: 'Additional information required', state: 'error' },
      { id: 'tasks', label: 'Study Tasks', description: 'Complete assigned activities', state: 'upcoming' },
      { id: 'survey', label: 'Final Survey', description: 'Share your feedback', state: 'upcoming' },
    ],
    currentStep: 1,
    completionPercentage: 25,
    variant: 'vertical',
  },
};

export const ThreeSteps: Story = {
  name: 'Three Step Flow',
  args: {
    steps: [
      { id: 'setup', label: 'Setup', state: 'completed' },
      { id: 'session', label: 'Session', state: 'active' },
      { id: 'done', label: 'Done', state: 'upcoming' },
    ],
    currentStep: 1,
    completionPercentage: 50,
    variant: 'horizontal',
  },
};

export const MinimalHalfway: Story = {
  name: 'Minimal - Halfway',
  args: {
    steps: [
      { id: 's1', label: 'Step 1', state: 'completed' },
      { id: 's2', label: 'Step 2', state: 'completed' },
      { id: 's3', label: 'Step 3', state: 'active' },
      { id: 's4', label: 'Step 4', state: 'upcoming' },
    ],
    currentStep: 2,
    completionPercentage: 50,
    variant: 'minimal',
  },
};
