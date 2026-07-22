"use client";

import React from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Button,
} from "@fluentui/react-components";
import { Alert24Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ── Types ────────────────────────────────────────────────────────────────────

export interface AlertStat {
  label: string;
  value: string | number;
}

export interface AlertSummaryCardProps {
  /** Array of stat boxes to display (e.g. active alerts, service issues) */
  stats: AlertStat[];
  /** Card subtitle or description */
  subtitle?: string;
  /** Timestamp string (e.g. "Last updated: 07/10/2025") */
  timestamp?: string;
  /** Primary action button text */
  primaryButtonText?: string;
  /** Primary action handler */
  onPrimaryAction?: () => void;
  /** Secondary action button text */
  secondaryButtonText?: string;
  /** Secondary action handler */
  onSecondaryAction?: () => void;
  /** Custom icon component (defaults to Alert24Regular) */
  icon?: React.ComponentType<{ className?: string }>;
  /** Card title (defaults to "Alerts and service issues") */
  title?: string;
  /** Additional className */
  className?: string;
}

// ── Styles ───────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "12px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalM,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  iconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: tokens.colorPaletteYellowBackground1,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  icon: {
    width: "20px",
    height: "20px",
    color: tokens.colorPaletteYellowForeground1,
  },
  headerTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  timestamp: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  subtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalL,
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    marginBottom: "24px",
  },
  statBox: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: tokens.spacingHorizontalL,
    borderRadius: "8px",
    textAlign: "center" as const,
  },
  statLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    marginBottom: "6px",
    fontWeight: tokens.fontWeightRegular,
  },
  statValue: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.2",
  },
  buttonRow: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
  },
});

// ── Component ────────────────────────────────────────────────────────────────

/**
 * Summary card for alerts and service health issues with stat boxes and action buttons.
 *
 * **When to use:** Any card showing aggregated alert/issue counts — dashboard alert panels,
 * incident summaries, service health overviews, monitoring views.
 * Format-agnostic: works on any page type. Composes Fluent `Card`, `Text`, `Button`,
 * and a stat grid.
 *
 * **Instead of:** building inline alert summary with `<div>` + colored stat boxes + buttons.
 *
 * @see AlertStat for the data shape each stat box expects
 */
export default function AlertSummaryCard({
  stats,
  subtitle,
  timestamp,
  primaryButtonText,
  onPrimaryAction,
  secondaryButtonText,
  onSecondaryAction,
  icon: IconComponent = Alert24Regular,
  title = "Alerts and service issues",
  className,
}: AlertSummaryCardProps) {
  const styles = useStyles();

  return (
    <div className={mergeClasses(styles.card, className)}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.iconContainer}>
            <IconComponent className={styles.icon} />
          </div>
          <div className={styles.headerTitle}>{title}</div>
        </div>
        {timestamp && <div className={styles.timestamp}>{timestamp}</div>}
      </div>

      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}

      <div className={styles.statsContainer}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statBox}>
            <div className={styles.statLabel}>{stat.label}</div>
            <div className={styles.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>

      {(primaryButtonText || secondaryButtonText) && (
        <div className={styles.buttonRow}>
          {primaryButtonText && (
            <Button appearance="outline" onClick={onPrimaryAction}>
              {primaryButtonText}
            </Button>
          )}
          {secondaryButtonText && (
            <Button appearance="outline" onClick={onSecondaryAction}>
              {secondaryButtonText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
