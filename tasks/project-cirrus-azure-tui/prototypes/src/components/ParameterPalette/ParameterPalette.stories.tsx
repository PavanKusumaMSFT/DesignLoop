import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ParameterPalette } from './ParameterPalette';
import type { ParamGroup } from '../../types';

const groups: ParamGroup[] = [
  {
    label: 'required',
    requirement: 'required',
    items: [
      {
        kind: 'flag',
        label: '--sku',
        valueType: 'enum',
        description: 'Pricing tier',
        requirement: 'required',
      },
      {
        kind: 'flag',
        label: '--location',
        valueType: 'string',
        description: 'Azure region',
        requirement: 'required',
      },
      {
        kind: 'flag',
        label: '--resource-group',
        valueType: 'lookup',
        description: 'Existing RG',
        requirement: 'required',
      },
    ],
  },
  {
    label: 'optional',
    requirement: 'optional',
    items: [
      {
        kind: 'flag',
        label: '--tags',
        valueType: 'string',
        description: 'Key=value pairs',
        requirement: 'optional',
      },
    ],
  },
];

const enumGroups: ParamGroup[] = [
  {
    label: '--sku values',
    requirement: 'required',
    items: [
      { kind: 'enum-value', label: 'Basic', requirement: 'optional', status: 'deprecated' },
      { kind: 'enum-value', label: 'Standard', requirement: 'optional', status: 'valid' },
      { kind: 'enum-value', label: 'Premium', requirement: 'optional', status: 'valid' },
    ],
  },
];

const meta: Meta<typeof ParameterPalette> = {
  title: 'Cirrus/ParameterPalette',
  component: ParameterPalette,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Non-modal popover of valid parameters/enum values (State B). ARIA ' +
          'listbox with roving aria-activedescendant — command input keeps DOM ' +
          'focus (no focus trap, NG2). Required params first; never color-alone.',
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

type Story = StoryObj<typeof ParameterPalette>;

function Interactive(args: React.ComponentProps<typeof ParameterPalette>) {
  const [active, setActive] = useState(args.activeIndex);
  return (
    <ParameterPalette
      {...args}
      activeIndex={active}
      onActiveIndexChange={setActive}
    />
  );
}

export const Open: Story = {
  render: (args) => <Interactive {...args} />,
  args: {
    id: 'pal-open',
    commandContext: 'az servicebus namespace create',
    freshness: 'cached',
    groups,
    activeIndex: 0,
    onSelect: () => {},
    onDismiss: () => {},
    onActiveIndexChange: () => {},
  },
};

export const EnumValues: Story = {
  render: (args) => <Interactive {...args} />,
  args: { ...Open.args, id: 'pal-enum', groups: enumGroups, activeIndex: 1 },
};

export const Filtered: Story = {
  render: (args) => <Interactive {...args} />,
  args: { ...Open.args, id: 'pal-filter', filterText: '--re', activeIndex: 0 },
};

export const PlainVariant: Story = {
  args: {
    id: 'pal-plain',
    commandContext: '--sku',
    freshness: 'cached',
    groups: enumGroups,
    activeIndex: 0,
    variant: 'plain',
    onSelect: () => {},
    onDismiss: () => {},
    onActiveIndexChange: () => {},
  },
};
