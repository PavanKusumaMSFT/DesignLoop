/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import React from "react";
import { makeStyles, mergeClasses, tokens as fluentTokens } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  CheckmarkCircle24Filled,
  Warning24Filled,
  ErrorCircle24Filled,
} from "@fluentui/react-icons";
import type { HealthStatus } from "../../../../data/manage-dashboard-data";

// ---------------------------------------------------------------------------
// HealthStatusBanner — prominent health indicator at top of detail pane
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  banner: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "20px 24px",
    borderRadius: "14px",
    marginBottom: "24px",
  },
  bannerHealthy: {
    backgroundColor: "#F0FFF0",
    border: "1px solid #B7E1CD",
  },
  bannerDegraded: {
    backgroundColor: `${tokens.colorNeutralBackground1}BEB`,
    border: "1px solid #FBBF24",
  },
  bannerCritical: {
    backgroundColor: `${tokens.colorNeutralBackground1}1F2`,
    border: "1px solid #FCA5A5",
  },
  iconWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    flexShrink: 0,
  },
  textCol: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  statusLabel: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "1.2",
  },
  statusReason: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground3,
  },
  lastUpdated: {
    marginLeft: "auto",
    fontSize: "12px",
    color: tokens.colorNeutralForeground4,
    whiteSpace: "nowrap" as const,
  },
  iconHealthy: { color: tokens.colorPaletteGreenForeground1 },
  iconDegraded: { color: "#9A6700" },
  iconCritical: { color: tokens.colorPaletteRedForeground1 },
  iconBgHealthy: { backgroundColor: "#DCF5DC" },
  iconBgDegraded: { backgroundColor: "#FEF3C7" },
  iconBgCritical: { backgroundColor: "#FEE2E2" },
  labelColorHealthy: { color: tokens.colorPaletteGreenForeground1 },
  labelColorDegraded: { color: "#9A6700" },
  labelColorCritical: { color: tokens.colorPaletteRedForeground1 },
});

interface HealthStatusBannerProps {
  status: HealthStatus;
  reason: string;
  lastUpdated: string;
}

/** Color-coded health status banner with large icon, status label, reason text, and last-updated timestamp.
 * Cross-project reusable: can be imported by any project. */
export const HealthStatusBanner: React.FC<HealthStatusBannerProps> = ({
  status,
  reason,
  lastUpdated,
}) => {
  const styles = useStyles();

  const iconEl =
    status === "healthy" ? (
      <CheckmarkCircle24Filled className={styles.iconHealthy} />
    ) : status === "degraded" ? (
      <Warning24Filled className={styles.iconDegraded} />
    ) : (
      <ErrorCircle24Filled className={styles.iconCritical} />
    );

  const iconBgClass =
    status === "healthy"
      ? styles.iconBgHealthy
      : status === "degraded"
        ? styles.iconBgDegraded
        : styles.iconBgCritical;

  const labelColorClass =
    status === "healthy"
      ? styles.labelColorHealthy
      : status === "degraded"
        ? styles.labelColorDegraded
        : styles.labelColorCritical;

  const bannerVariantClass =
    status === "healthy"
      ? styles.bannerHealthy
      : status === "degraded"
        ? styles.bannerDegraded
        : styles.bannerCritical;

  const statusLabel =
    status === "healthy"
      ? "Healthy"
      : status === "degraded"
        ? "Degraded"
        : "Critical";

  return (
    <div className={mergeClasses(styles.banner, bannerVariantClass)}>
      <div className={mergeClasses(styles.iconWrap, iconBgClass)}>{iconEl}</div>
      <div className={styles.textCol}>
        <span className={mergeClasses(styles.statusLabel, labelColorClass)}>
          {statusLabel}
        </span>
        <span className={styles.statusReason}>{reason}</span>
      </div>
      <span className={styles.lastUpdated}>Updated {lastUpdated}</span>
    </div>
  );
};
