import type { Meta, StoryObj } from '@storybook/react';
import { StudyCard } from './StudyCard';

const meta: Meta<typeof StudyCard> = {
  title: 'HITS/StudyCard',
  component: StudyCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['compact', 'expanded', 'featured'],
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'enrolled', 'completed', 'expired'],
    },
    matchScore: {
      control: { type: 'range', min: 0, max: 100 },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '24px', background: '#F5F5F5', minHeight: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StudyCard>;

const defaultArgs = {
  id: 'study-001',
  title: 'Improving Microsoft Teams Meeting Experience',
  description: 'Help us understand how you use virtual meetings and identify areas for improvement in the Teams platform.',
  estimatedTime: '30 min',
  compensation: '$25 Gift Card',
  matchScore: 92,
  tags: [
    { label: 'Remote Work' },
    { label: 'Collaboration' },
    { label: 'Video Calls' },
  ],
  deadline: 'Jul 15, 2026',
  researcherName: 'Sarah Chen',
  spotsRemaining: 12,
};

// === Variants ===

export const Default: Story = {
  args: { ...defaultArgs },
};

export const Compact: Story = {
  args: {
    ...defaultArgs,
    variant: 'compact',
    title: 'Quick Surface Duo Feedback',
    estimatedTime: '10 min',
    compensation: '$10 Gift Card',
    matchScore: 75,
    tags: [{ label: 'Hardware' }, { label: 'Mobile' }],
  },
};

export const Expanded: Story = {
  args: {
    ...defaultArgs,
    variant: 'expanded',
  },
};

export const Featured: Story = {
  args: {
    ...defaultArgs,
    variant: 'featured',
    title: 'Windows 12 Early Preview Feedback Program',
    description: 'Be among the first to test the next generation of Windows and share your experience directly with our design team.',
    matchScore: 98,
    compensation: '$75 Gift Card',
    estimatedTime: '60 min',
    spotsRemaining: 3,
  },
};

// === States ===

export const Enrolled: Story = {
  args: {
    ...defaultArgs,
    state: 'enrolled',
    title: 'Outlook Mobile Accessibility Study',
    description: 'Participate in testing new accessibility features in Outlook Mobile.',
    matchScore: 88,
  },
};

export const Completed: Story = {
  args: {
    ...defaultArgs,
    state: 'completed',
    title: 'Edge Browser Performance Survey',
    description: 'Share your feedback on Edge browser performance improvements.',
    matchScore: 85,
    tags: [{ label: 'Browser' }, { label: 'Performance' }],
  },
};

export const Expired: Story = {
  args: {
    ...defaultArgs,
    state: 'expired',
    title: 'Xbox Game Pass UX Research',
    description: 'Study period has ended. Thank you for your interest.',
    matchScore: 70,
    deadline: 'Jun 01, 2026',
    spotsRemaining: 0,
  },
};

// === Special Cases ===

export const HighMatch: Story = {
  name: 'High Match Score (90%+)',
  args: {
    ...defaultArgs,
    matchScore: 96,
  },
};

export const MediumMatch: Story = {
  name: 'Medium Match Score (50-79%)',
  args: {
    ...defaultArgs,
    matchScore: 65,
  },
};

export const LowMatch: Story = {
  name: 'Low Match Score (<50%)',
  args: {
    ...defaultArgs,
    matchScore: 30,
  },
};

export const UrgentSpots: Story = {
  name: 'Urgent - Few Spots Left',
  args: {
    ...defaultArgs,
    spotsRemaining: 2,
    title: 'Last Chance: Azure DevOps Workflow Study',
  },
};

export const FeaturedEnrolled: Story = {
  name: 'Featured + Enrolled',
  args: {
    ...defaultArgs,
    variant: 'featured',
    state: 'enrolled',
    title: 'Microsoft Copilot Integration Feedback',
  },
};
