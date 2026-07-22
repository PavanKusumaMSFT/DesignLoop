/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import React from "react";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Tooltip,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  ArrowTrendingRegular,
  ArrowTrendingDownRegular,
  Info16Regular,
} from "@fluentui/react-icons";
import { Sparkline } from "./sparkline";
import type { ServiceData } from "../../../../data/manage-dashboard-data";

// ---------------------------------------------------------------------------
// CostSection — month-to-date spend, projection, and breakdown
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  section: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "14px",
    padding: "24px",
    marginBottom: "24px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  lastUpdated: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground4,
  },
  costGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
    "@media (max-width: 640px)": {
      gridTemplateColumns: "1fr",
    },
  },
  costCard: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  costLabel: {
    fontSize: "12px",
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase" as const,
    letterSpacing: "0.04em",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  costValue: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.1",
  },
  costCompare: {
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  trendUp: {
    color: tokens.colorPaletteRedForeground1,
  },
  trendDown: {
    color: tokens.colorPaletteGreenForeground1,
  },
  sparkWrap: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  sparkLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground4,
  },
  breakdownRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 0",
    borderTop: `1px solid ${tokens.colorNeutralStroke3}`,
  },
  breakdownLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
  },
  breakdownDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  breakdownAmount: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  breakdownBar: {
    flex: "0 0 120px",
    height: "6px",
    backgroundColor: tokens.colorNeutralBackground4,
    borderRadius: "3px",
    overflow: "hidden",
    marginLeft: "12px",
    marginRight: "12px",
  },
  breakdownFill: {
    height: "100%",
    borderRadius: "3px",
    width: "var(--fill-w, 0%)",
  },
  infoIcon: {
    color: tokens.colorNeutralForeground4,
    cursor: "help",
  },
  trendIcon: {
    width: "16px",
    height: "16px",
  },
  projectionRate: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  fillBgAzure: { backgroundColor: "#0078D4" },
  fillBgCyan: { backgroundColor: "#50E6FF" },
  fillBgGreen: { backgroundColor: "#00B294" },
  fillBgPurple: { backgroundColor: "#8764B8" },
  fillBgYellow: { backgroundColor: tokens.colorPaletteYellowForeground1 },
  fillBgRed: { backgroundColor: tokens.colorPaletteRedForeground1 },
});

interface CostSectionProps {
  service: ServiceData;
}

/** Cost overview section showing month-to-date, last month, and projected spend with trend sparkline and category breakdown bars.
 * Cross-project reusable: can be imported by any project. */
export const CostSection: React.FC<CostSectionProps> = ({ service }) => {
  const styles = useStyles();

  const costChange =
    service.currentMonthCost - service.lastMonthCost * (13 / 28); // pro-rated comparison
  const costChangePct =
    (costChange / (service.lastMonthCost * (13 / 28))) * 100;
  const isUp = costChangePct > 0;
  const maxBreakdown = Math.max(...service.costBreakdown.map((b) => b.amount));

  const getBgClass = (color: string): string => {
    switch (color) {
      case "#0078D4":
        return styles.fillBgAzure;
      case "#50E6FF":
        return styles.fillBgCyan;
      case "#00B294":
        return styles.fillBgGreen;
      case "#8764B8":
        return styles.fillBgPurple;
      case tokens.colorPaletteYellowForeground1:
        return styles.fillBgYellow;
      case tokens.colorPaletteRedForeground1:
        return styles.fillBgRed;
      default:
        return "";
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>
          Cost Awareness
          <Tooltip
            content="Estimated costs based on Azure pricing. Final billing may vary."
            relationship="description"
          >
            <Info16Regular className={styles.infoIcon} />
          </Tooltip>
        </span>
        <span className={styles.lastUpdated}>
          Updated {service.lastUpdated}
        </span>
      </div>

      <div className={styles.costGrid}>
        {/* MTD spend */}
        <div className={styles.costCard}>
          <span className={styles.costLabel}>Month to date</span>
          <span className={styles.costValue}>
            ${service.currentMonthCost.toFixed(2)}
          </span>
          <span
            className={`${styles.costCompare} ${isUp ? styles.trendUp : styles.trendDown}`}
          >
            {isUp ? (
              <ArrowTrendingRegular className={styles.trendIcon} />
            ) : (
              <ArrowTrendingDownRegular className={styles.trendIcon} />
            )}
            {Math.abs(costChangePct).toFixed(0)}% vs last month (pro-rated)
          </span>
        </div>

        {/* Last month */}
        <div className={styles.costCard}>
          <span className={styles.costLabel}>Last month total</span>
          <span className={styles.costValue}>
            ${service.lastMonthCost.toFixed(2)}
          </span>
        </div>

        {/* Projection */}
        <div className={styles.costCard}>
          <span className={styles.costLabel}>
            Projected this month
            <Tooltip
              content="Burn-rate projection based on daily average spend so far this month."
              relationship="description"
            >
              <Info16Regular className={styles.infoIcon} />
            </Tooltip>
          </span>
          <span className={styles.costValue}>
            ${service.burnRateProjection.toFixed(2)}
          </span>
          <span className={styles.projectionRate}>
            ~${(service.burnRateProjection / 28).toFixed(2)} / day
          </span>
        </div>
      </div>

      {/* MTD trend sparkline */}
      <div className={styles.sparkWrap}>
        <span className={styles.sparkLabel}>
          Month-to-date cumulative spend
        </span>
        <Sparkline
          data={service.costSeries}
          width={480}
          height={40}
          color="#0078D4"
        />
      </div>

      {/* Breakdown */}
      {service.costBreakdown.map((item) => (
        <div key={item.category} className={styles.breakdownRow}>
          <span className={styles.breakdownLabel}>
            <span
              className={mergeClasses(
                styles.breakdownDot,
                getBgClass(item.color),
              )}
            />
            {item.category}
          </span>
          <div className={styles.breakdownBar}>
            <div
              className={mergeClasses(
                styles.breakdownFill,
                getBgClass(item.color),
              )}
              ref={(el) =>
                el?.style.setProperty(
                  "--fill-w",
                  `${(item.amount / maxBreakdown) * 100}%`,
                )
              }
            />
          </div>
          <span className={styles.breakdownAmount}>
            ${item.amount.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
};
