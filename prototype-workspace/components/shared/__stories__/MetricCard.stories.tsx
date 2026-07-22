import type { Meta, StoryObj } from "@storybook/react";
import MetricCard, { MetricCardGrid } from "../metric-card";

const meta = {
  title: "Shared/MetricCard",
  component: MetricCard,
  tags: ["autodocs"],
  argTypes: {
    badgeVariant: {
      control: "select",
      options: ["green", "yellow", "red", "neutral"],
    },
  },
  args: {
    label: "Task coverage",
    value: "96",
    unit: "%",
    tooltip: "Percent of prototype checks completed.",
    badge: "+12%",
    badgeVariant: "green",
  },
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Grid: Story = {
  render: () => (
    <MetricCardGrid>
      <MetricCard label="Build" value="Passing" badge="Ready" badgeVariant="green" />
      <MetricCard label="Stories" value={1} unit="story" badge="Boots" badgeVariant="neutral" />
      <MetricCard label="A11y" value="Queued" badge="Addon" badgeVariant="yellow" />
    </MetricCardGrid>
  ),
};
