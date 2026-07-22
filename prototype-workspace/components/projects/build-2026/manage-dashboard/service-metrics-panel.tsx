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
import { Info16Regular } from "@fluentui/react-icons";
import { MetricCard } from "./metric-card";
import { Sparkline } from "./sparkline";
import type {
  ServiceData,
  ContainerAppMetrics,
  FunctionAppMetrics,
  StorageAccountMetrics,
} from "../../../../data/manage-dashboard-data";

// ---------------------------------------------------------------------------
// ServiceMetricsPanel — renders service-type-specific metric cards
// ---------------------------------------------------------------------------
// To add a new service type, add a case to the switch below and create a
// render function following the existing patterns.
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  section: {
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
  lastUpdated: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground4,
  },
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "12px",
    marginBottom: "16px",
  },
  wideCard: {
    gridColumn: "span 2",
    "@media (max-width: 640px)": {
      gridColumn: "span 1",
    },
  },
  activityCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "14px",
    padding: "20px 24px",
    marginBottom: "12px",
  },
  activityTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  sparkWrap: {
    marginBottom: "4px",
  },
  sparkLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground4,
    marginTop: "4px",
  },
  deploymentsTable: {
    width: "100%",
    fontSize: "13px",
    borderCollapse: "collapse" as const,
  },
  deployRow: {
    borderTop: `1px solid ${tokens.colorNeutralStroke3}`,
  },
  deployCell: {
    padding: "8px 8px 8px 0",
    color: tokens.colorNeutralForeground2,
  },
  deployCellStatus: {
    padding: "8px 0",
  },
  statusPill: {
    fontSize: "11px",
    fontWeight: tokens.fontWeightSemibold,
    padding: "2px 8px",
    borderRadius: "4px",
  },
  statusActive: {
    backgroundColor: "#DFF6DD",
    color: tokens.colorPaletteGreenForeground1,
  },
  statusInactive: {
    backgroundColor: tokens.colorNeutralBackground4,
    color: tokens.colorNeutralForeground3,
  },
  statusFailed: {
    backgroundColor: "#FDE7E9",
    color: "#B10E1C",
  },
  httpCodesRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap" as const,
  },
  httpCodeChip: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground3,
    fontSize: "13px",
  },
  httpCodeDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
  httpCodeLabel: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  httpCodeCount: {
    color: tokens.colorNeutralForeground3,
    fontSize: "12px",
  },
  infoIcon: {
    color: tokens.colorNeutralForeground4,
    cursor: "help",
  },
  metricsGridCompact: {
    marginBottom: "12px",
  },
  deployCellBold: {
    fontWeight: tokens.fontWeightSemibold,
  },
  noMetricsState: {
    padding: "32px",
    textAlign: "center" as const,
    color: tokens.colorNeutralForeground3,
  },
  httpDotBgGreen: { backgroundColor: "#00B294" },
  httpDotBgAzure: { backgroundColor: "#0078D4" },
  httpDotBgYellow: { backgroundColor: tokens.colorPaletteYellowForeground1 },
  httpDotBgRed: { backgroundColor: tokens.colorPaletteRedForeground1 },
});

interface ServiceMetricsPanelProps {
  service: ServiceData;
}

// ---- Container App Metrics ------------------------------------------------

const ContainerAppPanel: React.FC<{
  m: ContainerAppMetrics;
  lastUpdated: string;
}> = ({ m, lastUpdated }) => {
  const styles = useStyles();

  const getHttpDotBgClass = (color: string): string => {
    switch (color) {
      case "#00B294":
        return styles.httpDotBgGreen;
      case "#0078D4":
        return styles.httpDotBgAzure;
      case tokens.colorPaletteYellowForeground1:
        return styles.httpDotBgYellow;
      case tokens.colorPaletteRedForeground1:
        return styles.httpDotBgRed;
      default:
        return "";
    }
  };

  return (
    <>
      {/* Critical health signals */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>Critical Health Signals</span>
          <span className={styles.lastUpdated}>
            24h window · Updated {lastUpdated}
          </span>
        </div>
        <div className={styles.metricsGrid}>
          <MetricCard
            label="Container Restarts"
            value={m.restartCount}
            tooltip="Number of container restarts in the last 24 hours. Frequent restarts may indicate crashes or OOM kills."
            sparklineData={m.restartSeries}
            sparklineColor={
              m.restartCount > 2 ? tokens.colorPaletteRedForeground1 : "#0078D4"
            }
            badge={m.restartCount > 2 ? "Elevated" : "Normal"}
            badgeVariant={m.restartCount > 2 ? "red" : "green"}
          />
          <MetricCard
            label="Response Time (p50)"
            value={m.responseTimeP50}
            unit="ms"
            tooltip="Median response time — 50% of requests are faster than this."
            sparklineData={m.responseTimeSeries}
            sparklineColor="#0078D4"
          />
          <MetricCard
            label="Response Time (p95)"
            value={m.responseTimeP95}
            unit="ms"
            tooltip="95th percentile response time — only 5% of requests are slower."
            sparklineData={m.responseTimeSeries}
            sparklineColor={m.responseTimeP95 > 150 ? "#CA8A04" : "#0078D4"}
            badge={m.responseTimeP95 > 150 ? "Slow" : "OK"}
            badgeVariant={m.responseTimeP95 > 150 ? "yellow" : "green"}
          />
          <MetricCard
            label="Response Time (p99)"
            value={m.responseTimeP99}
            unit="ms"
            tooltip="99th percentile — the slowest 1% of requests."
          />
          <MetricCard
            label="CPU Usage"
            value={m.cpuPercent}
            unit="%"
            tooltip="CPU usage as a percentage of allocated resources."
            sparklineData={m.cpuSeries}
            sparklineColor={
              m.cpuPercent > 80 ? tokens.colorPaletteRedForeground1 : "#0078D4"
            }
            badge={
              m.cpuPercent > 80
                ? "High"
                : m.cpuPercent > 60
                  ? "Moderate"
                  : "Normal"
            }
            badgeVariant={
              m.cpuPercent > 80 ? "red" : m.cpuPercent > 60 ? "yellow" : "green"
            }
          />
          <MetricCard
            label="Memory Usage"
            value={m.memoryPercent}
            unit="%"
            tooltip="Memory usage as a percentage of allocated resources. Approaching limits can cause OOM kills."
            sparklineData={m.memorySeries}
            sparklineColor={
              m.memoryPercent > 80
                ? tokens.colorPaletteRedForeground1
                : m.memoryPercent > 65
                  ? "#CA8A04"
                  : "#0078D4"
            }
            badge={
              m.memoryPercent > 80
                ? "Critical"
                : m.memoryPercent > 65
                  ? "Elevated"
                  : "Normal"
            }
            badgeVariant={
              m.memoryPercent > 80
                ? "red"
                : m.memoryPercent > 65
                  ? "yellow"
                  : "green"
            }
          />
          <MetricCard
            label="Replicas"
            value={`${m.replicaCount} / ${m.replicaMax}`}
            tooltip="Active container replicas out of maximum configured. Autoscaling adjusts based on load."
            sparklineData={m.replicaSeries}
            sparklineColor="#8764B8"
          />
          <MetricCard
            label="Error Rate"
            value={m.errorRate}
            unit="%"
            tooltip="Percentage of total requests resulting in 5xx errors."
            sparklineData={m.errorRateSeries}
            sparklineColor={
              m.errorRate > 1 ? tokens.colorPaletteRedForeground1 : "#0078D4"
            }
            badge={m.errorRate > 1 ? "Elevated" : "Normal"}
            badgeVariant={m.errorRate > 1 ? "red" : "green"}
          />
        </div>

        {/* HTTP codes breakdown */}
        <div className={styles.activityCard}>
          <div className={styles.activityTitle}>
            HTTP Response Codes (24h)
            <Tooltip
              content="Breakdown of HTTP status codes across all requests."
              relationship="description"
            >
              <Info16Regular className={styles.infoIcon} />
            </Tooltip>
          </div>
          <div className={styles.httpCodesRow}>
            {m.httpCodes.map((c) => (
              <div key={c.code} className={styles.httpCodeChip}>
                <span
                  className={mergeClasses(
                    styles.httpCodeDot,
                    getHttpDotBgClass(c.color),
                  )}
                />
                <span className={styles.httpCodeLabel}>{c.code}</span>
                <span className={styles.httpCodeCount}>
                  {c.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity indicators */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>Activity</span>
          <span className={styles.lastUpdated}>Updated {lastUpdated}</span>
        </div>

        <div className={styles.activityCard}>
          <div className={styles.activityTitle}>Request Volume (24h)</div>
          <div className={styles.sparkWrap}>
            <Sparkline
              data={m.requestVolumeSeries}
              width={520}
              height={44}
              color="#0078D4"
            />
          </div>
          <span className={styles.sparkLabel}>Hourly request count</span>
        </div>

        <div
          className={mergeClasses(
            styles.metricsGrid,
            styles.metricsGridCompact,
          )}
        >
          <MetricCard
            label="Active Connections"
            value={m.activeConnections}
            tooltip="Current number of active TCP connections to your container app."
          />
          <MetricCard
            label="Total Requests (24h)"
            value={m.httpCodes
              .reduce((sum, c) => sum + c.count, 0)
              .toLocaleString()}
            tooltip="Total HTTP requests received in the last 24 hours."
          />
        </div>

        {/* Recent deployments */}
        <div className={styles.activityCard}>
          <div className={styles.activityTitle}>Recent Deployments</div>
          <table className={styles.deploymentsTable}>
            <tbody>
              {m.deployments.map((d) => (
                <tr key={d.id} className={styles.deployRow}>
                  <td
                    className={mergeClasses(
                      styles.deployCell,
                      styles.deployCellBold,
                    )}
                  >
                    {d.revision}
                  </td>
                  <td className={styles.deployCell}>{d.timestamp}</td>
                  <td className={styles.deployCellStatus}>
                    <span
                      className={`${styles.statusPill} ${
                        d.status === "active"
                          ? styles.statusActive
                          : d.status === "failed"
                            ? styles.statusFailed
                            : styles.statusInactive
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// ---- Function App Metrics -------------------------------------------------

const FunctionAppPanel: React.FC<{
  m: FunctionAppMetrics;
  lastUpdated: string;
}> = ({ m, lastUpdated }) => {
  const styles = useStyles();

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>Function Performance</span>
        <span className={styles.lastUpdated}>
          24h window · Updated {lastUpdated}
        </span>
      </div>
      <div className={styles.metricsGrid}>
        <MetricCard
          label="Executions (24h)"
          value={m.executionCount.toLocaleString()}
          tooltip="Total function invocations in the last 24 hours."
          sparklineData={m.executionSeries}
          sparklineColor="#0078D4"
        />
        <MetricCard
          label="Avg Duration"
          value={m.avgDurationMs}
          unit="ms"
          tooltip="Average execution duration across all functions."
          sparklineData={m.durationSeries}
          sparklineColor="#8764B8"
        />
        <MetricCard
          label="Failure Rate"
          value={m.failureRate}
          unit="%"
          tooltip="Percentage of executions that failed with an error."
          sparklineData={m.failureSeries}
          sparklineColor={
            m.failureRate > 1 ? tokens.colorPaletteRedForeground1 : "#00B294"
          }
          badge={m.failureRate < 1 ? "Normal" : "Elevated"}
          badgeVariant={m.failureRate < 1 ? "green" : "red"}
        />
        <MetricCard
          label="Active Instances"
          value={m.activeInstances}
          tooltip="Number of instances currently handling requests."
        />
      </div>

      <div className={styles.activityCard}>
        <div className={styles.activityTitle}>Execution Volume (24h)</div>
        <div className={styles.sparkWrap}>
          <Sparkline
            data={m.executionSeries}
            width={520}
            height={44}
            color="#0078D4"
          />
        </div>
        <span className={styles.sparkLabel}>Hourly executions</span>
      </div>
    </div>
  );
};

// ---- Storage Account Metrics ----------------------------------------------

const StorageAccountPanel: React.FC<{
  m: StorageAccountMetrics;
  lastUpdated: string;
}> = ({ m, lastUpdated }) => {
  const styles = useStyles();

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>Storage Performance</span>
        <span className={styles.lastUpdated}>
          24h window · Updated {lastUpdated}
        </span>
      </div>
      <div className={styles.metricsGrid}>
        <MetricCard
          label="Transactions (24h)"
          value={m.transactionCount.toLocaleString()}
          tooltip="Total storage transactions (reads, writes, lists) in the last 24 hours."
          sparklineData={m.transactionSeries}
          sparklineColor="#0078D4"
        />
        <MetricCard
          label="Capacity"
          value={m.capacityGB.toFixed(1)}
          unit="GB"
          tooltip="Current used storage capacity."
          sparklineData={m.capacitySeries}
          sparklineColor="#8764B8"
        />
        <MetricCard
          label="Avg Latency"
          value={m.avgLatencyMs.toFixed(1)}
          unit="ms"
          tooltip="Average end-to-end latency for storage operations."
          sparklineData={m.latencySeries}
          sparklineColor={m.avgLatencyMs > 10 ? "#CA8A04" : "#00B294"}
          badge={m.avgLatencyMs < 10 ? "Normal" : "Slow"}
          badgeVariant={m.avgLatencyMs < 10 ? "green" : "yellow"}
        />
      </div>

      <div className={styles.activityCard}>
        <div className={styles.activityTitle}>Transaction Volume (24h)</div>
        <div className={styles.sparkWrap}>
          <Sparkline
            data={m.transactionSeries}
            width={520}
            height={44}
            color="#0078D4"
          />
        </div>
        <span className={styles.sparkLabel}>Hourly transactions</span>
      </div>
    </div>
  );
};

// ---- Router ---------------------------------------------------------------

export const ServiceMetricsPanel: React.FC<ServiceMetricsPanelProps> = ({
  service,
}) => {
  const styles = useStyles();
  switch (service.type) {
    case "container-app":
      return (
        <ContainerAppPanel
          m={service.metrics as ContainerAppMetrics}
          lastUpdated={service.lastUpdated}
        />
      );
    case "function-app":
      return (
        <FunctionAppPanel
          m={service.metrics as FunctionAppMetrics}
          lastUpdated={service.lastUpdated}
        />
      );
    case "storage-account":
      return (
        <StorageAccountPanel
          m={service.metrics as StorageAccountMetrics}
          lastUpdated={service.lastUpdated}
        />
      );
    default:
      return (
        <div className={styles.noMetricsState}>
          Metrics panel not yet available for {service.typeLabel}.
        </div>
      );
  }
};
