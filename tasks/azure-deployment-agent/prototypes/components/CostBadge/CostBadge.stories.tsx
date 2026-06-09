import type { Meta, StoryObj } from '@storybook/react';
import { CostBadge } from './CostBadge';

const sampleAlternatives = [
  { sku: 'D2v3', vCPUs: 2, ram: '8 GB', cost: 70, perfScore: 6 },
  { sku: 'D4v3', vCPUs: 4, ram: '16 GB', cost: 120, perfScore: 8, recommended: true },
  { sku: 'D8v3', vCPUs: 8, ram: '32 GB', cost: 230, perfScore: 9 },
];

const meta: Meta<typeof CostBadge> = {
  title: 'Components/CostBadge',
  component: CostBadge,
  tags: ['autodocs'],
  argTypes: {
    cost: { control: 'number' },
    currency: { control: 'text' },
    timeHorizon: { control: 'radio', options: ['hourly', 'monthly', 'annual'] },
    status: { control: 'radio', options: ['normal', 'warning', 'critical'] },
    loading: { control: 'boolean' },
  },
  args: {
    resourceName: 'web-server-01',
    onAlternativeSelect: (sku) => console.log('Selected SKU:', sku),
  },
};

export default meta;
type Story = StoryObj<typeof CostBadge>;

export const Default: Story = {
  args: {
    cost: 120,
    resourceName: 'web-server-01',
  },
};

export const Expanded: Story = {
  args: {
    cost: 120,
    resourceName: 'web-server-01',
    alternatives: sampleAlternatives,
  },
};

export const WithAlternatives: Story = {
  args: {
    cost: 120,
    resourceName: 'web-server-01',
    alternatives: sampleAlternatives,
  },
};

export const Warning: Story = {
  args: {
    cost: 340,
    resourceName: 'prod-cluster',
    status: 'warning',
  },
};

export const Critical: Story = {
  args: {
    cost: 500,
    resourceName: 'main-db',
    status: 'critical',
  },
};

export const Loading: Story = {
  args: {
    cost: 0,
    resourceName: 'loading-resource',
    loading: true,
  },
};
