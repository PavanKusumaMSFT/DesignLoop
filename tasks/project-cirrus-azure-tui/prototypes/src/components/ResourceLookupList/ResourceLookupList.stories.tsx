import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ResourceLookupList } from './ResourceLookupList';
import type { ResourceItem } from '../../types';

const cached: ResourceItem[] = [
  { name: 'rg-shared-eastus', meta: 'eastus', freshness: 'cached' },
  { name: 'rg-staging-westus2', meta: 'westus2', freshness: 'cached' },
];

const merged: ResourceItem[] = [
  { name: 'rg-staging-westus2', meta: 'westus2', freshness: 'live' },
  { name: 'rg-staging-eastus', meta: 'eastus', freshness: 'cached' },
];

const meta: Meta<typeof ResourceLookupList> = {
  title: 'Cirrus/ResourceLookupList',
  component: ResourceLookupList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Async cached-first resource lookup (State C). Cached rows usable ' +
          'immediately while live results merge in; never blocks. Esc collapses ' +
          'to free text (AC-3.3). aria-busy while loading; polite status region.',
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
};
export default meta;

type Story = StoryObj<typeof ResourceLookupList>;

function Interactive(args: React.ComponentProps<typeof ResourceLookupList>) {
  const [active, setActive] = useState(args.activeIndex);
  return (
    <ResourceLookupList
      {...args}
      activeIndex={active}
      onActiveIndexChange={setActive}
    />
  );
}

const base = {
  id: 'res',
  resourceType: 'resource groups',
  subscriptionLabel: 'contoso-prod',
  activeIndex: 0,
  onSelect: () => {},
  onDismiss: () => {},
  onActiveIndexChange: () => {},
};

export const Loading: Story = {
  render: (a) => <Interactive {...a} />,
  args: { ...base, status: 'loading', items: cached },
};

export const Resolved: Story = {
  render: (a) => <Interactive {...a} />,
  args: { ...base, status: 'resolved', items: merged, filterText: 'rg-st' },
};

export const Timeout: Story = {
  render: (a) => <Interactive {...a} />,
  args: { ...base, status: 'timeout', items: cached },
};

export const Unauthenticated: Story = {
  args: { ...base, status: 'unauthenticated', items: [] },
};

export const Empty: Story = {
  args: { ...base, status: 'empty', items: [] },
};

export const PlainVariant: Story = {
  args: {
    ...base,
    status: 'resolved',
    items: cached,
    variant: 'plain',
  },
};
