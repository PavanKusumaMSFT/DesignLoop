"use client";

import React, { useState } from "react";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  FluentProvider,
  Text,
  webLightTheme,
  Tooltip,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Info16Regular } from "@fluentui/react-icons";
import { AzureHeaderBuildMVP } from "../azure-header-buildmvp";
import { ServiceCard } from "./service-card";
import { HealthStatusBanner } from "./health-status";
import { CostSection } from "./cost-section";
import { AnomalySection } from "./anomaly-section";
import { ServiceMetricsPanel } from "./service-metrics-panel";
import {
  allServices,
  type ServiceData,
} from "../../../../data/manage-dashboard-data";

// ---------------------------------------------------------------------------
// ManageDashboard — main orchestrator
// ---------------------------------------------------------------------------
// Layout: fixed service sidebar on left, scrollable detail pane on right.
// On mobile (<768px) the sidebar stacks above the detail.
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  outer: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  stickyNav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  shell: {
    display: "flex",
    flex: 1,
    maxWidth: "1400px",
    width: "100%",
    margin: "0 auto",
    padding: "24px 24px 120px",
    gap: "24px",
    "@media (max-width: 860px)": {
      flexDirection: "column",
      padding: "16px 16px 120px",
    },
  },
  sidebar: {
    width: "280px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    "@media (max-width: 860px)": {
      width: "100%",
      flexDirection: "row",
      overflowX: "auto",
      gap: "8px",
      paddingBottom: "8px",
    },
  },
  sidebarHeader: {
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    padding: "0 4px 8px",
  },
  detail: {
    flex: 1,
    minWidth: 0,
  },
  detailHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
  },
  detailTitle: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  detailMeta: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground3,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "20px",
  },
  pillType: {
    fontSize: "11px",
    fontWeight: tokens.fontWeightSemibold,
    padding: "2px 8px",
    borderRadius: "6px",
    backgroundColor: tokens.colorNeutralBackground4,
    color: tokens.colorNeutralForeground2,
  },
  sectionDivider: {
    border: "none",
    borderTop: `1px solid ${tokens.colorNeutralStroke3}`,
    margin: "8px 0 24px",
  },
  totalCostBanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 20px",
    borderRadius: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    marginBottom: "24px",
    flexWrap: "wrap" as const,
    gap: "12px",
  },
  totalCostLabel: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground3,
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  totalCostValue: {
    fontSize: "22px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  totalCostRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  totalCostMini: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  miniLabel: {
    fontSize: "11px",
    color: tokens.colorNeutralForeground4,
  },
  miniValue: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    padding: "8px 0 0",
  },
  costSummaryWrapper: {
    marginTop: tokens.spacingVerticalL,
  },
  costSummaryCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "12px",
    padding: tokens.spacingHorizontalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  costSummarySmLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    marginBottom: tokens.spacingVerticalXS,
  },
  costSummaryBigValue: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
  },
  costSummaryRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  costSummaryRowMt: {
    marginTop: tokens.spacingVerticalXS,
  },
});

interface ManageDashboardProps {
  experienceLevel?: "new" | "smb" | "enterprise";
  customHeader?: React.ReactNode | null;
}

const ManageDashboardContent: React.FC<ManageDashboardProps> = ({
  experienceLevel = "smb",
  customHeader,
}) => {
  const styles = useStyles();
  const [selectedId, setSelectedId] = useState(allServices[0]?.id ?? "");

  const selected =
    allServices.find((s) => s.id === selectedId) ?? allServices[0];

  // Aggregate cost
  const totalMTD = allServices.reduce((s, svc) => s + svc.currentMonthCost, 0);
  const totalLastMonth = allServices.reduce(
    (s, svc) => s + svc.lastMonthCost,
    0,
  );
  const totalProjection = allServices.reduce(
    (s, svc) => s + svc.burnRateProjection,
    0,
  );

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.outer}>
        {/* Header */}
        {customHeader === undefined ? (
          <div className={styles.stickyNav}>
            <AzureHeaderBuildMVP
              activeLink="Manage"
              experienceLevel={experienceLevel}
            />
          </div>
        ) : (
          customHeader && <div className={styles.stickyNav}>{customHeader}</div>
        )}

        <div className={styles.shell}>
          {/* Sidebar — Service List */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>Deployed Services</div>
            {allServices.map((svc) => (
              <ServiceCard
                key={svc.id}
                service={svc}
                selected={svc.id === selectedId}
                onClick={() => setSelectedId(svc.id)}
              />
            ))}

            {/* Aggregate cost summary in sidebar */}
            <div className={styles.costSummaryWrapper}>
              <div className={styles.sidebarHeader}>Subscription Cost</div>
              <div className={styles.costSummaryCard}>
                <div className={styles.costSummarySmLabel}>
                  Month to date (all services)
                </div>
                <div className={styles.costSummaryBigValue}>
                  ${totalMTD.toFixed(2)}
                </div>
                <div className={styles.costSummaryRow}>
                  <span>Last month: ${totalLastMonth.toFixed(2)}</span>
                </div>
                <div
                  className={mergeClasses(
                    styles.costSummaryRow,
                    styles.costSummaryRowMt,
                  )}
                >
                  <span>Projected: ${totalProjection.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detail pane */}
          <div className={styles.detail}>
            {/* Detail header */}
            <div className={styles.detailHeader}>
              <Text className={styles.detailTitle}>{selected.name}</Text>
              <span className={styles.pillType}>{selected.typeLabel}</span>
            </div>
            <div className={styles.detailMeta}>
              <span>
                Resource Group: <strong>{selected.resourceGroup}</strong>
              </span>
              <span>·</span>
              <span>{selected.region}</span>
            </div>

            {/* Health status */}
            <HealthStatusBanner
              status={selected.status}
              reason={selected.statusReason}
              lastUpdated={selected.lastUpdated}
            />

            {/* Anomalies — shown only when there are any, placed high for visibility */}
            {selected.anomalies.length > 0 && (
              <AnomalySection
                anomalies={selected.anomalies}
                lastUpdated={selected.lastUpdated}
              />
            )}

            {/* Service-specific metrics & activity */}
            <ServiceMetricsPanel service={selected} />

            {/* Cost */}
            <CostSection service={selected} />

            {/* Anomalies — show empty state for healthy services */}
            {selected.anomalies.length === 0 && (
              <AnomalySection
                anomalies={selected.anomalies}
                lastUpdated={selected.lastUpdated}
              />
            )}
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

const ManageDashboard: React.FC<ManageDashboardProps> = (props) => {
  return <ManageDashboardContent {...props} />;
};

export default ManageDashboard;
