import type { Meta, StoryObj } from '@storybook/react';
import { VersionTimeline } from './VersionTimeline';

const fiveVersions = [
  { id: 'v1', label: 'v1.0', date: '2026-05-01', changeCount: 12, author: 'Alice' },
  { id: 'v2', label: 'v1.1', date: '2026-05-05', changeCount: 8, author: 'Bob' },
  { id: 'v3', label: 'v1.2', date: '2026-05-08', changeCount: 15, author: 'Alice' },
  { id: 'v4', label: 'v2.0', date: '2026-05-10', changeCount: 22, author: 'Carol' },
  { id: 'v5', label: 'v2.1', date: '2026-05-13', changeCount: 5, author: 'Bob' },
];

const twoVersions = [
  { id: 'v1', label: 'v1.0', date: '2026-05-01', changeCount: 12, author: 'Alice' },
  { id: 'v2', label: 'v1.1', date: '2026-05-05', changeCount: 8, author: 'Bob' },
];

const meta: Meta<typeof VersionTimeline> = {
  title: 'Components/VersionTimeline',
  component: VersionTimeline,
  tags: ['autodocs'],
  argTypes: {
    searchQuery: { control: 'text' },
  },
  args: {
    onVersionSelect: (id) => console.log('Selected version:', id),
    onRollback: (id) => console.log('Rollback to:', id),
  },
};

export default meta;
type Story = StoryObj<typeof VersionTimeline>;

export const Default: Story = {
  args: {
    versions: fiveVersions,
    selectedVersions: ['v4', 'v5'],
  },
};

export const TwoVersions: Story = {
  args: {
    versions: twoVersions,
    selectedVersions: ['v1', 'v2'],
  },
};

export const Selecting: Story = {
  args: {
    versions: fiveVersions,
    selectedVersions: ['v2', 'v2'],
  },
};

export const WithSearch: Story = {
  args: {
    versions: fiveVersions,
    selectedVersions: ['v4', 'v5'],
    searchQuery: '',
    onSearch: (query) => console.log('Search:', query),
  },
};

export const SingleVersion: Story = {
  args: {
    versions: [{ id: 'v1', label: 'v1.0', date: '2026-05-01', changeCount: 12, author: 'Alice' }],
    selectedVersions: ['v1', 'v1'],
  },
};
