/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import React, { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Card,
  mergeClasses,
} from "@fluentui/react-components";
import {
  ArrowTrending16Regular,
  ArrowTrendingDown16Regular,
  Lightbulb16Regular,
  ChevronDown16Regular,
  ChevronUp16Regular,
} from "@fluentui/react-icons";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from "recharts";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ── Types ────────────────────────────────────────────────────────────────────

export interface CostMetric {
  /** Label above the value (e.g. "Cost incurred this month") */
  label: string;
  /** Display value (e.g. "$43 USD") */
  value: string;
  /** Trend text (e.g. "23% MoM") */
  trend?: string;
  /** Trend direction — "up" shows ascending arrow, "down" shows descending */
  trendDirection?: "up" | "down";
}

export interface CostChartDataPoint {
  /** X-axis label (e.g. "Jun 1") */
  day: string;
  /** Actual cost value — null for forecast-only points */
  actual: number | null;
  /** Forecast cost value — null for actual-only points */
  forecast: number | null;
}

export interface CostCardProps {
  /** Card title (defaults to "Costs") */
  title?: string;
  /** Handler for "See all" link click */
  onSeeAll?: () => void;
  /** Left metric (e.g. cost incurred) */
  incurredMetric: CostMetric;
  /** Right metric (e.g. forecast) */
  forecastMetric: CostMetric;
  /** Chart data points with actual and forecast series */
  chartData: CostChartDataPoint[];
  /** Recommendation text shown at the bottom */
  recommendation?: string;
  /** Whether the recommendation section is initially expanded */
  recommendationExpanded?: boolean;
  /** Additional className for the root card */
  className?: string;
}

// ── Styles ───────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "0",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "32px",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingTop: tokens.spacingVerticalL,
  },
  title: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
  },
  seeAll: {
    fontSize: "13px",
    lineHeight: "18px",
    color: "#0078D4",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "0",
    ":hover": {
      textDecoration: "underline",
    },
  },
  metricsRow: {
    display: "flex",
    gap: tokens.spacingHorizontalXXL,
    alignItems: "center",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
  },
  metricColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    flex: "1 0 0",
    minWidth: "0",
  },
  metricLabel: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  metricValueRow: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
    width: "100%",
  },
  metricValue: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase600,
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap",
  },
  trendBadge: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
    alignItems: "center",
    overflow: "hidden",
  },
  trendText: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground2,
    whiteSpace: "nowrap",
  },
  chartContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    width: "100%",
    height: "240px",
  },
  chartWrapper: {
    display: "flex",
    alignItems: "center",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    width: "100%",
    flex: 1,
    position: "relative",
  },
  forecastLabel: {
    position: "absolute",
    top: "0",
    right: tokens.spacingHorizontalL,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  recommendation: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    minHeight: "37px",
  },
  recommendationHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "0",
    minHeight: "37px",
  },
  recommendationLeft: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
  },
  recommendationIcon: {
    color: tokens.colorNeutralForeground3,
  },
  recommendationText: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  recommendationBody: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground2,
    paddingBottom: tokens.spacingVerticalM,
  },
});

// ── Component ────────────────────────────────────────────────────────────────

/** Displays cost summary with incurred/forecast metrics, an area chart with actual vs. forecast series, and an expandable recommendation. */
export default function CostCard({
  title = "Costs",
  onSeeAll,
  incurredMetric,
  forecastMetric,
  chartData,
  recommendation,
  recommendationExpanded = false,
  className,
}: CostCardProps) {
  const styles = useStyles();
  const [expanded, setExpanded] = useState(recommendationExpanded);

  const renderMetric = (metric: CostMetric) => (
    <div className={styles.metricColumn}>
      <Text className={styles.metricLabel}>{metric.label}</Text>
      <div className={styles.metricValueRow}>
        <Text className={styles.metricValue}>{metric.value}</Text>
        {metric.trend && (
          <div className={styles.trendBadge}>
            {metric.trendDirection === "down" ? (
              <ArrowTrendingDown16Regular />
            ) : (
              <ArrowTrending16Regular />
            )}
            <Text className={styles.trendText}>{metric.trend}</Text>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card className={mergeClasses(styles.card, className)}>
      {/* Header */}
      <div className={styles.header}>
        <Text className={styles.title}>{title}</Text>
        {onSeeAll && (
          <button className={styles.seeAll} onClick={onSeeAll}>
            See all
          </button>
        )}
      </div>

      {/* Metrics row */}
      <div className={styles.metricsRow}>
        {renderMetric(incurredMetric)}
        {renderMetric(forecastMetric)}
      </div>

      {/* Area chart */}
      <div className={styles.chartContainer}>
        <div className={styles.chartWrapper}>
          <Text className={styles.forecastLabel}>Forecast</Text>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 16, right: 4, bottom: 0, left: -10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ebebeb" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: tokens.colorNeutralForeground2 }}
                tickLine={false}
                axisLine={false}
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
                formatter={(value: number | null, name: string) => {
                  if (value == null) return [null, null];
                  return [
                    `$${value}`,
                    name === "actual" ? "Actual" : "Forecast",
                  ];
                }}
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#637CEF"
                strokeWidth={2}
                fill="#637CEF"
                fillOpacity={0.15}
                connectNulls={false}
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="#EE5FB7"
                strokeWidth={2}
                strokeDasharray="5 3"
                fill="#EE5FB7"
                fillOpacity={0.12}
                connectNulls={false}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommendation */}
      {recommendation !== undefined && (
        <div className={styles.recommendation}>
          <button
            className={styles.recommendationHeader}
            onClick={() => setExpanded(!expanded)}
          >
            <div className={styles.recommendationLeft}>
              <Lightbulb16Regular className={styles.recommendationIcon} />
              <Text className={styles.recommendationText}>Recommendation</Text>
            </div>
            {expanded ? <ChevronUp16Regular /> : <ChevronDown16Regular />}
          </button>
          {expanded && recommendation && (
            <Text className={styles.recommendationBody}>{recommendation}</Text>
          )}
        </div>
      )}
    </Card>
  );
}
