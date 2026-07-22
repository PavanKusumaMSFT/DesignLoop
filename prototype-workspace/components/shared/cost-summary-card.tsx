"use client";

import React from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Button,
} from "@fluentui/react-components";
import { Money24Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ── Types ────────────────────────────────────────────────────────────────────

export interface CostStat {
  label: string;
  value: string;
  /** Whether to render this stat in a success/green color */
  highlight?: boolean;
}

export interface CostSummaryCardProps {
  /** Array of stat pairs (e.g. credits spent + remaining) */
  stats: CostStat[];
  /** Card subtitle (e.g. "Monthly spending on track") */
  subtitle?: string;
  /** Secondary description text */
  description?: string;
  /** Timestamp string */
  timestamp?: string;
  /** Action button text (e.g. "View costs") */
  buttonText?: string;
  /** Action button handler */
  onAction?: () => void;
  /** Custom icon component (defaults to Money24Regular) */
  icon?: React.ComponentType<{ className?: string }>;
  /** Card title (defaults to "Costs") */
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
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  icon: {
    width: "20px",
    height: "20px",
    color: tokens.colorBrandForeground1,
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
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalXS,
  },
  description: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalL,
  },
  statsContainer: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: tokens.spacingHorizontalL,
    borderRadius: "8px",
    marginBottom: "24px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
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
  highlight: {
    color: tokens.colorPaletteGreenForeground1,
  },
  buttonContainer: {
    display: "flex",
  },
});

// ── Component ────────────────────────────────────────────────────────────────

/**
 * Cost/spending summary card with icon, title, description, stats grid, and action button.
 *
 * **When to use:** Any card showing aggregated cost data — cost dashboards, billing overviews,
 * spending trend panels, budget summaries, resource cost breakdowns.
 * Format-agnostic: works on any page type. Composes Fluent `Card`, `Text`, `Button`,
 * and a stat grid.
 *
 * **Instead of:** building inline cost/billing cards with `<div>` + stat numbers + button.
 *
 * @see CostStat for the data shape each stat entry expects
 */
export default function CostSummaryCard({
  stats,
  subtitle,
  description,
  timestamp,
  buttonText,
  onAction,
  icon: IconComponent = Money24Regular,
  title = "Costs",
  className,
}: CostSummaryCardProps) {
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
      {description && <div className={styles.description}>{description}</div>}

      <div className={styles.statsContainer}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index}>
              <div
                className={mergeClasses(
                  styles.statLabel,
                  stat.highlight && styles.highlight,
                )}
              >
                {stat.label}
              </div>
              <div
                className={mergeClasses(
                  styles.statValue,
                  stat.highlight && styles.highlight,
                )}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {buttonText && (
        <div className={styles.buttonContainer}>
          <Button appearance="outline" onClick={onAction}>
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
}
