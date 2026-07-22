"use client";

import React from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ── Types ────────────────────────────────────────────────────────────────────

export interface ResourceItem {
  /** Resource name (clickable) */
  name: string;
  /** Azure resource type (e.g. "App Service", "SQL Database") */
  type: string;
  /** Fluent icon component for the resource type */
  icon?: React.ComponentType<{ className?: string }>;
  /** Active alert count (0, 3, "--" for unknown) */
  alerts?: string | number;
  /** Monthly or current cost (e.g. "$2.45") */
  cost?: string;
  /** Last activity or last viewed date */
  lastActivity?: string;
  /** Resource status */
  status?: "Running" | "Stopped" | "Warning" | "Error" | string;
  /** Click handler for the resource name */
  onClick?: () => void;
}

export interface ResourceStatusTableProps {
  /** Array of resources to display */
  resources: ResourceItem[];
  /** Optional table title */
  title?: string;
  /** Whether to show the alerts column */
  showAlerts?: boolean;
  /** Whether to show the cost column */
  showCost?: boolean;
  /** Whether to show the last activity column */
  showLastActivity?: boolean;
  /** Additional className */
  className?: string;
}

// ── Styles ───────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  container: {
    width: "100%",
  },
  title: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalM,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  headerCell: {
    padding: "12px 0",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textAlign: "left",
    borderBottom: `2px solid ${tokens.colorNeutralStroke1}`,
  },
  cell: {
    padding: "12px 0",
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  nameCell: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  nameCellNoClick: {
    cursor: "default",
    color: tokens.colorNeutralForeground1,
    "&:hover": {
      textDecoration: "none",
    },
  },
  icon: {
    color: tokens.colorBrandForeground1,
    fontSize: "16px",
    flexShrink: 0,
  },
  costCell: {
    color: tokens.colorBrandForeground1,
  },
  statusRunning: {
    color: tokens.colorPaletteGreenForeground1,
  },
  statusStopped: {
    color: tokens.colorNeutralForeground3,
  },
  statusWarning: {
    color: tokens.colorPaletteYellowForeground1,
  },
  statusError: {
    color: tokens.colorPaletteRedForeground1,
  },
});

// ── Component ────────────────────────────────────────────────────────────────

/**
 * Table displaying Azure resources with name, type, status badge, alert count, cost, and last activity.
 *
 * **When to use:** Any tabular display of Azure resources — manage pages, project detail views,
 * resource overviews, monitoring dashboards, cost breakdowns by resource.
 * Format-agnostic: works on any page type. Composes Fluent `Table`, `TableHeader`, `TableRow`,
 * `TableCell`, `Badge`, `Text`.
 *
 * **Instead of:** building inline `<table>` or `<div>` grids for resource listings.
 *
 * @see ResourceItem for the data shape each row expects
 */
export default function ResourceStatusTable({
  resources,
  title,
  showAlerts = true,
  showCost = true,
  showLastActivity = true,
  className,
}: ResourceStatusTableProps) {
  const styles = useStyles();

  const getStatusClass = (status?: string) => {
    switch (status) {
      case "Running":
        return styles.statusRunning;
      case "Stopped":
        return styles.statusStopped;
      case "Warning":
        return styles.statusWarning;
      case "Error":
        return styles.statusError;
      default:
        return undefined;
    }
  };

  return (
    <div className={mergeClasses(styles.container, className)}>
      {title && <div className={styles.title}>{title}</div>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerCell}>Name</th>
            <th className={styles.headerCell}>Type</th>
            {showAlerts && <th className={styles.headerCell}>Alerts</th>}
            {showCost && <th className={styles.headerCell}>Cost</th>}
            {showLastActivity && (
              <th className={styles.headerCell}>Last activity</th>
            )}
          </tr>
        </thead>
        <tbody>
          {resources.map((resource, index) => {
            const IconComp = resource.icon;
            return (
              <tr key={index}>
                <td className={styles.cell}>
                  <div
                    className={mergeClasses(
                      styles.nameCell,
                      !resource.onClick && styles.nameCellNoClick,
                    )}
                    onClick={resource.onClick}
                  >
                    {IconComp && <IconComp className={styles.icon} />}
                    {resource.name}
                  </div>
                </td>
                <td className={styles.cell}>{resource.type}</td>
                {showAlerts && (
                  <td className={styles.cell}>{resource.alerts ?? 0}</td>
                )}
                {showCost && (
                  <td className={mergeClasses(styles.cell, styles.costCell)}>
                    {resource.cost ?? "—"}
                  </td>
                )}
                {showLastActivity && (
                  <td className={styles.cell}>
                    {resource.lastActivity ?? "—"}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
