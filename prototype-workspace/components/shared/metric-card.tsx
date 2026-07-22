"use client";

import React from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Tooltip,
} from "@fluentui/react-components";
import { Info16Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ── Types ────────────────────────────────────────────────────────────────────

export interface MetricCardProps {
  /** Metric label (e.g. "API CALLS", "UPTIME") */
  label: string;
  /** Metric value (e.g. "1,234" or 99.9) */
  value: string | number;
  /** Unit suffix (e.g. "K", "%", "ms") */
  unit?: string;
  /** Tooltip text for the info icon */
  tooltip?: string;
  /** Badge text (e.g. "+5.2%", "Active") */
  badge?: string;
  /** Badge color variant */
  badgeVariant?: "green" | "yellow" | "red" | "neutral";
  /** Optional sparkline or chart ReactNode */
  chart?: React.ReactNode;
  /** Additional className */
  className?: string;
}

export interface MetricCardGridProps {
  children: React.ReactNode;
  className?: string;
}

// ── Styles ───────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  grid: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
    flexWrap: "wrap" as const,
  },

  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "12px",
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: "0",
    flex: "1 1 180px",
    transition: "box-shadow 0.15s ease",
    "&:hover": {
      boxShadow: tokens.shadow4,
    },
  },

  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  label: {
    fontSize: tokens.fontSizeBase200,
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
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap" as const,
  },
  value: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1",
  },
  unit: {
    fontSize: tokens.fontSizeBase300,
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
    backgroundColor: tokens.colorStatusSuccessBackground1,
    color: tokens.colorPaletteGreenForeground1,
  },
  badgeYellow: {
    backgroundColor: tokens.colorPaletteYellowBackground1,
    color: tokens.colorPaletteYellowForeground1,
  },
  badgeRed: {
    backgroundColor: tokens.colorStatusDangerBackground1,
    color: tokens.colorPaletteRedForeground1,
  },
  badgeNeutral: {
    backgroundColor: tokens.colorNeutralBackground4,
    color: tokens.colorNeutralForeground2,
  },

  chartContainer: {
    width: "100%",
    overflow: "hidden",
    borderRadius: "4px",
  },
});

// ── MetricCardGrid ───────────────────────────────────────────────────────────

/** Flex-wrap layout container for arranging multiple MetricCards in a responsive row.
 * Composed from: CSS flex-wrap with Fluent spacing tokens.
 * Instead of: writing custom flex containers for metric card grids. */
export function MetricCardGrid({ children, className }: MetricCardGridProps) {
  const styles = useStyles();
  return <div className={mergeClasses(styles.grid, className)}>{children}</div>;
}

// ── MetricCard ───────────────────────────────────────────────────────────────

/**
 * KPI tile displaying a label, value, unit, optional badge, and optional chart placeholder.
 *
 * **When to use:** Any single numeric KPI — dashboard stats, cost totals, resource counts,
 * performance metrics, alert tallies. Format-agnostic: works on any page type.
 * Composes Fluent `Card`, `Text`, `Badge`.
 *
 * **Instead of:** building inline stat boxes with `<div>` + large number + small label.
 *
 * @see MetricCardGrid for flex-wrap layout of multiple MetricCards
 */
export default function MetricCard({
  label,
  value,
  unit,
  tooltip,
  badge,
  badgeVariant = "neutral",
  chart,
  className,
}: MetricCardProps) {
  const styles = useStyles();

  const badgeClass =
    badgeVariant === "green"
      ? styles.badgeGreen
      : badgeVariant === "yellow"
        ? styles.badgeYellow
        : badgeVariant === "red"
          ? styles.badgeRed
          : styles.badgeNeutral;

  return (
    <div className={mergeClasses(styles.card, className)}>
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
          <span className={mergeClasses(styles.badge, badgeClass)}>
            {badge}
          </span>
        )}
      </div>

      {chart && <div className={styles.chartContainer}>{chart}</div>}
    </div>
  );
}
