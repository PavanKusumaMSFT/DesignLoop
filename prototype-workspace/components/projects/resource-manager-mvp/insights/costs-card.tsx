/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client"

import * as React from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
} from "@fluentui/react-components"
import {
  ArrowTrendingLines20Regular,
  ArrowUp12Filled,
  ArrowDown12Filled,
} from "@fluentui/react-icons"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts"
import InsightsCard from "./insights-card"
import type { InsightsMockData } from "./insights-data"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  statsRow: {
    display: "flex",
    gap: "48px",
    padding: "0 16px 8px 16px",
  },
  stat: {
    flex: "0 0 auto",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  statValueRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  statValue: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase600,
    color: tokens.colorNeutralForeground1,
  },
  sparkline: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  sparklineText: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground2,
  },
  trendUp: {
    color: tokens.colorPaletteGreenForeground1,
  },
  trendDown: {
    color: tokens.colorPaletteRedForeground1,
  },
  chartWrap: {
    padding: "0 16px 16px 16px",
    flex: "1 1 auto",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
    minHeight: 0,
  },
  forecastLabel: {
    position: "absolute",
    right: "16px",
    top: "4px",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
})

const costAreaData = [
  { day: "Jun 1", actual: 0, forecast: null as number | null },
  { day: "Jun 3", actual: 4, forecast: null as number | null },
  { day: "Jun 5", actual: 8, forecast: null as number | null },
  { day: "Jun 8", actual: 14, forecast: null as number | null },
  { day: "Jun 10", actual: 18, forecast: null as number | null },
  { day: "Jun 12", actual: 22, forecast: null as number | null },
  { day: "Jun 15", actual: 28, forecast: null as number | null },
  { day: "Jun 18", actual: 33, forecast: null as number | null },
  { day: "Jun 20", actual: 36, forecast: null as number | null },
  { day: "Jun 22", actual: 39, forecast: null as number | null },
  { day: "Jun 25", actual: 43, forecast: 43 as number | null },
  { day: "Jun 27", actual: null as number | null, forecast: 68 },
  { day: "Jun 30", actual: null as number | null, forecast: 96 },
]

function CostChart() {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={180}>
      <AreaChart
        data={costAreaData}
        margin={{ top: 8, right: 8, bottom: 0, left: -10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#EDEBE9" vertical={false} />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 12, fill: tokens.colorNeutralForeground2 }}
          tickLine={false}
          axisLine={false}
          interval={1}
        />
        <YAxis
          tick={{ fontSize: 12, fill: tokens.colorNeutralForeground2 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v: number) => `$${v}`}
        />
        <RechartsTooltip
          contentStyle={{
            fontSize: 12,
            borderRadius: 6,
            border: `1px solid ${tokens.colorNeutralStroke1}`,
          }}
          formatter={(value, name) => {
            if (value == null) return [null, null]
            return [`$${value}`, name === "actual" ? "Actual" : "Forecast"]
          }}
        />
        <Area
          type="monotone"
          dataKey="actual"
          name="actual"
          stroke="#637CEF"
          strokeWidth={2}
          fill="#637CEF"
          fillOpacity={0.18}
          connectNulls={false}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 2, fill: "#fff", stroke: "#637CEF" }}
        />
        <Area
          type="monotone"
          dataKey="forecast"
          name="forecast"
          stroke="#637CEF"
          strokeWidth={2}
          strokeDasharray="4 3"
          fill="#93A4F4"
          fillOpacity={0.12}
          connectNulls={false}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 2, fill: "#fff", stroke: "#637CEF" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export interface CostsCardProps {
  data: InsightsMockData["costs"]
  isLoading?: boolean
}

/** Costs card for the insights blade — shows incurred / forecast stats + area chart. */
export default function CostsCard({ data, isLoading }: CostsCardProps) {
  const styles = useStyles()

  const renderTrend = (trend: "up" | "down", change: string) => (
    <div className={styles.sparkline}>
      {trend === "up" ? (
        <ArrowUp12Filled className={styles.trendUp} />
      ) : (
        <ArrowDown12Filled className={styles.trendDown} />
      )}
      <Text className={styles.sparklineText}>{change}</Text>
    </div>
  )

  return (
    <InsightsCard
      title="Costs"
      onSeeAll={() => {}}
      isLoading={isLoading}
      recommendations={[
        {
          key: "review-idle-compute",
          icon: <ArrowTrendingLines20Regular />,
          label: "Review idle compute and low-utilization disks",
        },
        {
          key: "reserved-instances",
          icon: <ArrowTrendingLines20Regular />,
          label: "Switch eligible VMs to reserved instances",
        },
        {
          key: "budget-alert",
          icon: <ArrowTrendingLines20Regular />,
          label: "Set a budget alert for next month",
        },
      ]}
    >
      <div className={styles.statsRow}>
        <div className={styles.stat}>
          <Text className={styles.statLabel}>Cost incurred</Text>
          <div className={styles.statValueRow}>
            <Text className={styles.statValue}>{data.incurred}</Text>
            {renderTrend(data.incurredTrend, data.incurredChange)}
          </div>
        </div>
        <div className={styles.stat}>
          <Text className={styles.statLabel}>Forecasted</Text>
          <div className={styles.statValueRow}>
            <Text className={styles.statValue}>{data.forecast}</Text>
            {renderTrend(data.forecastTrend, data.forecastChange)}
          </div>
        </div>
      </div>
      <div className={styles.chartWrap}>
        <CostChart />
      </div>
    </InsightsCard>
  )
}
