/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client"

import React from "react"
import { makeStyles, tokens as fluentTokens, Tooltip } from "@fluentui/react-components"


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Info16Regular } from "@fluentui/react-icons"
import { Sparkline } from "./sparkline"
import type { TimeSeriesPoint } from "../../../../data/manage-dashboard-data"

// ---------------------------------------------------------------------------
// MetricCard — a small tile that shows a single KPI with sparkline
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "12px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minWidth: "0",
    flex: "1 1 180px",
    transition: "box-shadow 0.15s ease",
    "&:hover": {
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    },
  },
  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  label: {
    fontSize: "12px",
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase" as const,
    letterSpacing: "0.04em",
  },
  infoIcon: {
    color: tokens.colorNeutralForeground4,
    cursor: "help",
    flexShrink: 0,
  },
  valueRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap" as const,
  },
  sparkWrap: {
    width: "100%",
    overflow: "hidden",
    borderRadius: "4px",
  },
  value: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1",
  },
  unit: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground3,
    marginLeft: "2px",
  },
  badge: {
    fontSize: "11px",
    fontWeight: tokens.fontWeightSemibold,
    padding: "2px 6px",
    borderRadius: "6px",
    whiteSpace: "nowrap" as const,
  },
  badgeGreen: {
    backgroundColor: "#DFF6DD",
    color: tokens.colorPaletteGreenForeground1,
  },
  badgeYellow: {
    backgroundColor: `${tokens.colorNeutralBackground1}4CE`,
    color: "#835C00",
  },
  badgeRed: {
    backgroundColor: "#FDE7E9",
    color: "#B10E1C",
  },
  badgeNeutral: {
    backgroundColor: tokens.colorNeutralBackground4,
    color: tokens.colorNeutralForeground2,
  },
})

export interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  tooltip?: string
  sparklineData?: TimeSeriesPoint[]
  sparklineColor?: string
  badge?: string
  badgeVariant?: "green" | "yellow" | "red" | "neutral"
}

/** KPI card displaying a metric label, value with optional unit, trend badge, and inline sparkline chart.
 * Cross-project reusable: can be imported by any project. */
export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  tooltip,
  sparklineData,
  sparklineColor,
  badge,
  badgeVariant = "neutral",
}) => {
  const styles = useStyles()

  const badgeClass =
    badgeVariant === "green"
      ? styles.badgeGreen
      : badgeVariant === "yellow"
        ? styles.badgeYellow
        : badgeVariant === "red"
          ? styles.badgeRed
          : styles.badgeNeutral

  return (
    <div className={styles.card}>
      <div className={styles.labelRow}>
        <span className={styles.label}>{label}</span>
        {tooltip && (
          <Tooltip content={tooltip} relationship="description">
            <Info16Regular className={styles.infoIcon} />
          </Tooltip>
        )}
      </div>
      <div className={styles.valueRow}>
        <span className={styles.value}>{value}</span>
        {unit && <span className={styles.unit}>{unit}</span>}
        {badge && (
          <span className={`${styles.badge} ${badgeClass}`}>
            {badge}
          </span>
        )}
      </div>
      {sparklineData && sparklineData.length > 1 && (
        <div className={styles.sparkWrap}>
          <Sparkline data={sparklineData} color={sparklineColor} width={160} height={28} />
        </div>
      )}
    </div>
  )
}
