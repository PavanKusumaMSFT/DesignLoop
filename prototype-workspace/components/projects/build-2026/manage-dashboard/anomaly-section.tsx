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
  Warning20Filled,
  Info20Filled,
  ErrorCircle20Filled,
  Clock16Regular,
} from "@fluentui/react-icons";
import type { Anomaly } from "../../../../data/manage-dashboard-data";

// ---------------------------------------------------------------------------
// AnomalySection — surfaces detected anomalies with severity badges
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
    marginBottom: "16px",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  emptyState: {
    padding: "24px",
    textAlign: "center" as const,
    color: tokens.colorNeutralForeground3,
    fontSize: "13px",
  },
  anomalyList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  anomalyItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "12px 16px",
    borderRadius: "10px",
    border: `1px solid transparent`,
    transition: "background-color 0.15s ease",
  },
  anomalyWarning: {
    backgroundColor: `${tokens.colorNeutralBackground1}BEB`,
    border: `1px solid #FDE68A`,
  },
  anomalyCritical: {
    backgroundColor: `${tokens.colorNeutralBackground1}1F2`,
    border: `1px solid #FECACA`,
  },
  anomalyInfo: {
    backgroundColor: "#F0F9FF",
    border: `1px solid #BAE6FD`,
  },
  iconWrap: {
    width: "28px",
    height: "28px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: "1px",
  },
  textCol: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    flex: 1,
    minWidth: 0,
  },
  message: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.4",
  },
  meta: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  badge: {
    fontSize: "11px",
    fontWeight: tokens.fontWeightSemibold,
    padding: "1px 6px",
    borderRadius: "4px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.03em",
  },
  badgeWarning: {
    backgroundColor: "#FEF3C7",
    color: "#92400E",
  },
  badgeCritical: {
    backgroundColor: "#FEE2E2",
    color: "#991B1B",
  },
  badgeInfo: {
    backgroundColor: "#E0F2FE",
    color: "#075985",
  },
  count: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    marginLeft: tokens.spacingHorizontalS,
  },
  lastUpdatedNote: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground4,
  },
  clockIcon: {
    width: "12px",
    height: "12px",
  },
  iconColorWarning: { color: "#CA8A04" },
  iconColorCritical: { color: tokens.colorPaletteRedForeground1 },
  iconColorInfo: { color: "#0369A1" },
  iconBgWarning: { backgroundColor: "#FEF3C7" },
  iconBgCritical: { backgroundColor: "#FEE2E2" },
  iconBgInfo: { backgroundColor: "#E0F2FE" },
});

interface AnomalySectionProps {
  anomalies: Anomaly[];
  lastUpdated: string;
}

const severityConfig = {
  warning: {
    itemClass: "anomalyWarning",
    badgeClass: "badgeWarning",
  },
  critical: {
    itemClass: "anomalyCritical",
    badgeClass: "badgeCritical",
  },
  info: {
    itemClass: "anomalyInfo",
    badgeClass: "badgeInfo",
  },
};

/** Displays detected anomalies with severity badges (warning/critical/info), messages, metadata, and an empty state fallback.
 * Cross-project reusable: can be imported by any project. */
export const AnomalySection: React.FC<AnomalySectionProps> = ({
  anomalies,
  lastUpdated,
}) => {
  const styles = useStyles();

  const SeverityIcon: React.FC<{ severity: Anomaly["severity"] }> = ({
    severity,
  }) => {
    switch (severity) {
      case "warning":
        return <Warning20Filled className={styles.iconColorWarning} />;
      case "critical":
        return <ErrorCircle20Filled className={styles.iconColorCritical} />;
      case "info":
        return <Info20Filled className={styles.iconColorInfo} />;
    }
  };

  const iconBgClass = (sev: Anomaly["severity"]) =>
    sev === "warning"
      ? styles.iconBgWarning
      : sev === "critical"
        ? styles.iconBgCritical
        : styles.iconBgInfo;

  const itemClass = (sev: Anomaly["severity"]) =>
    sev === "warning"
      ? styles.anomalyWarning
      : sev === "critical"
        ? styles.anomalyCritical
        : styles.anomalyInfo;

  const badgeClassForSev = (sev: Anomaly["severity"]) =>
    sev === "warning"
      ? styles.badgeWarning
      : sev === "critical"
        ? styles.badgeCritical
        : styles.badgeInfo;

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>
          Anomaly Detection
          {anomalies.length > 0 && (
            <span className={styles.count}>({anomalies.length})</span>
          )}
        </span>
        <span className={styles.lastUpdatedNote}>Updated {lastUpdated}</span>
      </div>

      {anomalies.length === 0 ? (
        <div className={styles.emptyState}>
          No anomalies detected — everything looks normal.
        </div>
      ) : (
        <div className={styles.anomalyList}>
          {anomalies.map((a) => (
            <div
              key={a.id}
              className={mergeClasses(
                styles.anomalyItem,
                itemClass(a.severity),
              )}
            >
              <div
                className={mergeClasses(
                  styles.iconWrap,
                  iconBgClass(a.severity),
                )}
              >
                <SeverityIcon severity={a.severity} />
              </div>
              <div className={styles.textCol}>
                <span className={styles.message}>{a.message}</span>
                <span className={styles.meta}>
                  <span
                    className={mergeClasses(
                      styles.badge,
                      badgeClassForSev(a.severity),
                    )}
                  >
                    {a.severity}
                  </span>
                  <Clock16Regular className={styles.clockIcon} />
                  {a.timestamp}
                  <span>·</span>
                  {a.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
