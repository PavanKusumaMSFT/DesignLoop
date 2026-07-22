import type { Meta, StoryObj } from '@storybook/react';
import { SuggestionItem } from './SuggestionItem';

const meta: Meta<typeof SuggestionItem> = {
  title: 'Cirrus/SuggestionItem',
  component: SuggestionItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Shared row primitive for ParameterPalette and ResourceLookupList. ' +
          'Every non-color signal (requirement, deprecation, freshness, match) ' +
          'is carried in text/glyph/weight in addition to color (never color-alone).',
      },
    },
  },
  decorators: [
    (Story) => (
      <ul
        role="listbox"
        aria-label="demo"
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 8,
          background: 'var(--color-surface-overlay)',
          borderRadius: 'var(--border-radius-md)',
        }}
      >
        <Story />
      </ul>
    ),
  ],
  argTypes: {
    kind: { control: 'inline-radio', options: ['flag', 'enum-value', 'resource'] },
    requirement: { control: 'inline-radio', options: [undefined, 'required', 'optional'] },
    status: { control: 'inline-radio', options: [undefined, 'valid', 'deprecated'] },
    freshness: { control: 'inline-radio', options: [undefined, 'cached', 'live'] },
    selected: { control: 'boolean' },
    variant: { control: 'inline-radio', options: ['rich', 'plain'] },
  },
};
export default meta;

type Story = StoryObj<typeof SuggestionItem>;

export const RequiredFlag: Story = {
  args: {
    id: 'opt-sku',
    kind: 'flag',
    label: '--sku',
    typeHint: '<enum>',
    secondary: 'Pricing tier',
    requirement: 'required',
    selected: false,
    onSelect: () => {},
  },
};

export const SelectedFlag: Story = {
  args: { ...RequiredFlag.args, id: 'opt-sku-sel', selected: true },
};

export const ValidEnumValue: Story = {
  args: {
    id: 'opt-standard',
    kind: 'enum-value',
    label: 'Standard',
    status: 'valid',
    selected: false,
    onSelect: () => {},
  },
};

export const DeprecatedEnumValue: Story = {
  args: {
    id: 'opt-basic',
    kind: 'enum-value',
    label: 'Basic',
    status: 'deprecated',
    selected: false,
    onSelect: () => {},
  },
};

export const LiveResource: Story = {
  args: {
    id: 'opt-rg-live',
    kind: 'resource',
    label: 'rg-staging-westus2',
    matchRanges: [[0, 5]],
    secondary: 'westus2',
    freshness: 'live',
    selected: true,
    onSelect: () => {},
  },
};

export const CachedResource: Story = {
  args: {
    id: 'opt-rg-cached',
    kind: 'resource',
    label: 'rg-shared-eastus',
    secondary: 'eastus',
    freshness: 'cached',
    selected: false,
    onSelect: () => {},
  },
};

export const PlainVariant: Story = {
  args: {
    id: 'opt-plain',
    kind: 'enum-value',
    label: 'Standard_LRS',
    variant: 'plain',
    selected: false,
    onSelect: () => {},
  },
};
