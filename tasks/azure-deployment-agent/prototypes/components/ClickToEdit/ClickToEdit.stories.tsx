import type { Meta, StoryObj } from '@storybook/react';
import { ClickToEdit } from './ClickToEdit';

const meta: Meta<typeof ClickToEdit> = {
  title: 'Components/ClickToEdit',
  component: ClickToEdit,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['text', 'number', 'select'] },
    readOnly: { control: 'boolean' },
  },
  args: {
    onSave: (val) => console.log('Saved:', val),
  },
};

export default meta;
type Story = StoryObj<typeof ClickToEdit>;

export const TextDisplay: Story = {
  args: {
    value: 'Standard_D4v3',
    label: 'VM SKU',
    type: 'text',
  },
};

export const Editing: Story = {
  args: {
    value: 'Standard_D4v3',
    label: 'VM SKU',
    type: 'text',
  },
};

export const SelectField: Story = {
  args: {
    value: 'East US 2',
    label: 'Region',
    type: 'select',
    options: ['East US', 'East US 2', 'West US', 'West Europe', 'Southeast Asia'],
  },
};

export const WithImpactPreview: Story = {
  args: {
    value: 2,
    label: 'Instance Count',
    type: 'number',
    impactPreview: 'Estimated cost change: +$60/mo',
  },
};

export const ReadOnly: Story = {
  args: {
    value: 'rg-production-eastus2',
    label: 'Resource Group',
    readOnly: true,
  },
};

export const Invalid: Story = {
  args: {
    value: 'Standard_D4v3',
    label: 'VM SKU',
    type: 'text',
    validation: (val: string | number) => {
      const s = String(val);
      if (s.length < 3) return { valid: false, message: 'SKU must be at least 3 characters' };
      return { valid: true };
    },
  },
};
