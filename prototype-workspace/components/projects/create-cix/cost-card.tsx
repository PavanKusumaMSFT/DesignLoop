"use client";

import React, { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Text,
  Button,
  Card,
} from "@fluentui/react-components";
import {
  ChevronDown20Regular,
  ChevronUp20Regular,
  LightbulbFilament20Regular,
} from "@fluentui/react-icons";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ── Types ────────────────────────────────────────────────────────────────────

export interface CostMetric {
  /** Label above the value (e.g. "Cost incurred this month") */
  label: string;
  /** Display value (e.g. "$43 USD") */
  value: string;
  /** Change indicator text (e.g. "↑ 23% MoM") */
  change?: string;
  /** Whether the change is positive ("up"), negative ("down"), or neutral */
  changeDirection?: "up" | "down" | "neutral";
}

export interface CostDataPoint {
  /** X-axis label (e.g. "Jun 1") */
  label: string;
  /** Actual cost value */
  actual?: number;
  /** Forecasted cost value */
  forecast?: number;
}

export interface CostCardProps {
  /** Card title (defaults to "Costs") */
  title?: string;
  /** Handler for "See all" link */
  onSeeAll?: () => void;
  /** Cost metrics displayed above the chart */
  metrics?: CostMetric[];
  /** Chart data points */
  data?: CostDataPoint[];
  /** Recommendation text shown in the expandable section */
  recommendation?: string;
  /** Additional className for the root card */
  className?: string;
}

// ── Styles ───────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  card: {
    padding: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase400,
  },
  seeAll: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorBrandForeground1,
    lineHeight: tokens.lineHeightBase300,
    cursor: "pointer",
    ":hover": {
      textDecorationLine: "underline",
    },
  },
  metricsRow: {
    display: "flex",
    gap: tokens.spacingHorizontalXXL,
  },
  metricGroup: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  metricLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  metricValueRow: {
    display: "flex",
    alignItems: "baseline",
    gap: tokens.spacingHorizontalS,
  },
  metricValue: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase500,
  },
  changeUp: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  changeDown: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorPaletteGreenForeground1,
    lineHeight: tokens.lineHeightBase200,
  },
  chartContainer: {
    width: "100%",
    height: "160px",
  },
  forecastLabel: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: tokens.spacingHorizontalS,
  },
  forecastText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  divider: {
    height: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
    marginTop: tokens.spacingVerticalXS,
  },
  recommendationToggle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  recommendationLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  recommendationIcon: {
    color: tokens.colorNeutralForeground3,
  },
  recommendationLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  recommendationContent: {
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingBottom: tokens.spacingVerticalS,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
});

// ── Default Data ─────────────────────────────────────────────────────────────

const defaultMetrics: CostMetric[] = [
  {
    label: "Cost incurred this month",
    value: "$43 USD",
    change: "↑ 23% MoM",
    changeDirection: "up",
  },
  {
    label: "Forecasted this month",
    value: "$96 USD",
    change: "↑ 23% MoM",
    changeDirection: "up",
  },
];

const defaultData: CostDataPoint[] = [
  { label: "Jun 1", actual: 25, forecast: undefined },
  { label: "Jun 5", actual: 40, forecast: undefined },
  { label: "Jun 10", actual: 30, forecast: undefined },
  { label: "Jun 20", actual: 35, forecast: undefined },
  { label: "Jun 25", actual: 40, forecast: 40 },
  { label: "Jun 27", actual: undefined, forecast: 50 },
  { label: "Jun 30", actual: undefined, forecast: 75 },
];

// ── Component ────────────────────────────────────────────────────────────────

/** Cost summary card with incurred/forecasted metrics, area chart with forecast shading, and an expandable recommendation section. */
export default function CostCard({
  title = "Costs",
  onSeeAll,
  metrics = defaultMetrics,
  data = defaultData,
  recommendation,
  className,
}: CostCardProps) {
  const styles = useStyles();
  const [isRecommendationOpen, setIsRecommendationOpen] = useState(false);

  return (
    <Card className={mergeClasses(styles.card, className)}>
      {/* Header */}
      <div className={styles.header}>
        <Text className={styles.title}>{title}</Text>
        {onSeeAll && (
          <Button
            appearance="transparent"
            size="small"
            className={styles.seeAll}
            onClick={onSeeAll}
          >
            See all
          </Button>
        )}
      </div>

      {/* Metrics row */}
      <div className={styles.metricsRow}>
        {metrics.map((metric, i) => (
          <div key={i} className={styles.metricGroup}>
            <Text className={styles.metricLabel}>{metric.label}</Text>
            <div className={styles.metricValueRow}>
              <Text className={styles.metricValue}>{metric.value}</Text>
              {metric.change && (
                <Text
                  className={
                    metric.changeDirection === "down"
                      ? styles.changeDown
                      : styles.changeUp
                  }
                >
                  {metric.change}
                </Text>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Forecast label */}
      <div className={styles.forecastLabel}>
        <Text className={styles.forecastText}>Forecast</Text>
      </div>

      {/* Area chart */}
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={tokens.colorNeutralStroke2}
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: tokens.colorNeutralForeground3 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v: number) => `$${v}`}
              tick={{ fontSize: 11, fill: tokens.colorNeutralForeground3 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              formatter={(value: number) => [`$${value}`, ""]}
              contentStyle={{
                borderRadius: tokens.borderRadiusXLarge,
                border: `1px solid ${tokens.colorNeutralStroke2}`,
                fontSize: tokens.fontSizeBase200,
              }}
            />
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0078D4" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#0078D4" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient
                id="forecastGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#E1A7E8" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#E1A7E8" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#0078D4"
              fill="url(#actualGradient)"
              strokeWidth={2}
              connectNulls={false}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="forecast"
              stroke="#C577CD"
              fill="url(#forecastGradient)"
              strokeWidth={2}
              strokeDasharray="6 4"
              connectNulls={false}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Divider */}
      <div className={styles.divider} />

      {/* Recommendation accordion */}
      <div>
        <div
          className={styles.recommendationToggle}
          onClick={() => setIsRecommendationOpen(!isRecommendationOpen)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsRecommendationOpen(!isRecommendationOpen);
            }
          }}
        >
          <div className={styles.recommendationLeft}>
            <LightbulbFilament20Regular
              className={styles.recommendationIcon}
            />
            <Text className={styles.recommendationLabel}>Recommendation</Text>
          </div>
          {isRecommendationOpen ? (
            <ChevronUp20Regular className={styles.recommendationIcon} />
          ) : (
            <ChevronDown20Regular className={styles.recommendationIcon} />
          )}
        </div>
        {isRecommendationOpen && recommendation && (
          <div className={styles.recommendationContent}>{recommendation}</div>
        )}
      </div>
    </Card>
  );
}
