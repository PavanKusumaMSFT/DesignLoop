import type { Meta, StoryObj } from '@storybook/react';
import { DeployGate } from './DeployGate';

const baseResources = [
  { name: 'web-server-02', type: 'VM', status: 'added' as const },
  { name: 'cache-redis', type: 'Cache', status: 'added' as const },
  { name: 'web-server-01', type: 'VM', status: 'modified' as const },
  { name: 'legacy-lb', type: 'LB', status: 'removed' as const },
];

const allPassValidation = [
  { name: 'Quota', status: 'pass' as const, message: 'All quotas within limits' },
  { name: 'Region', status: 'pass' as const, message: 'All resources available in target region' },
  { name: 'Policy', status: 'pass' as const, message: 'All policies satisfied' },
  { name: 'Dependencies', status: 'pass' as const, message: 'No broken dependencies' },
];

const warningValidation = [
  { name: 'Quota', status: 'pass' as const },
  { name: 'Region', status: 'pass' as const },
  { name: 'Policy', status: 'warning' as const, message: 'Policy "require-tags" — 1 resource missing required tags' },
  { name: 'Dependencies', status: 'pass' as const },
];

const failureValidation = [
  { name: 'Quota', status: 'pass' as const },
  { name: 'Region', status: 'pass' as const },
  { name: 'Policy', status: 'warning' as const, message: 'Policy "require-tags" — 1 resource missing tags' },
  { name: 'Destructive Changes', status: 'fail' as const, message: 'Deleting load balancer "legacy-lb" — 3 resources depend on this' },
];

const costSummary = {
  total: 485,
  delta: 150,
  drivers: [
    { serviceName: 'Compute', previousCost: 190, currentCost: 310, delta: 120 },
    { serviceName: 'Database', previousCost: 120, currentCost: 120, delta: 0 },
    { serviceName: 'Cache', previousCost: 0, currentCost: 55, delta: 55 },
    { serviceName: 'Load Balancer', previousCost: 25, currentCost: 0, delta: -25 },
  ],
};

const meta: Meta<typeof DeployGate> = {
  title: 'Components/DeployGate',
  component: DeployGate,
  tags: ['autodocs'],
  argTypes: {
    environment: {
      control: 'radio',
      options: ['production', 'staging', 'development', 'test'],
    },
  },
  args: {
    onDeploy: () => console.log('Deploy'),
    onCancel: () => console.log('Cancel'),
    onSaveAsPR: () => console.log('Save as PR'),
  },
};

export default meta;
type Story = StoryObj<typeof DeployGate>;

export const AllPassed: Story = {
  args: {
    resources: baseResources.filter((r) => r.status !== 'removed'),
    validationResults: allPassValidation,
    costSummary,
    environment: 'production',
  },
};

export const WithWarnings: Story = {
  args: {
    resources: baseResources,
    validationResults: warningValidation,
    costSummary,
    environment: 'production',
  },
};

export const WithFailures: Story = {
  args: {
    resources: baseResources,
    validationResults: failureValidation,
    costSummary,
    environment: 'production',
  },
};

export const Production: Story = {
  args: {
    resources: baseResources,
    validationResults: allPassValidation,
    costSummary,
    environment: 'production',
  },
};

export const Development: Story = {
  name: 'Development (Fast-track)',
  args: {
    resources: baseResources.filter((r) => r.status !== 'removed'),
    validationResults: allPassValidation,
    costSummary,
    environment: 'development',
  },
};
