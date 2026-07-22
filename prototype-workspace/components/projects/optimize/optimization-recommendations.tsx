/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import React, { useState, useEffect } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
} from "@fluentui/react-components";
import { Copy16Regular } from "@fluentui/react-icons";
import { LatencyLoader } from "../../shared/safe-latency-loader";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ===== Styles =====
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
    marginTop: "32px",
  },
  summaryText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    lineHeight: "20px",
    display: "block",
  },
  bulletList: {
    paddingLeft: "20px",
    marginTop: "4px",
    marginBottom: "8px",
    listStyleType: "disc",
  },
  bulletItem: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
    listStyleType: "disc",
  },
  boldValue: {
    fontWeight: tokens.fontWeightSemibold,
  },
  bodyText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    lineHeight: "20px",
    display: "block",
    marginTop: "8px",
  },
  recCard: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  recCardTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "20px",
    display: "block",
    borderLeft: `3px solid ${tokens.colorNeutralStroke1}`,
    paddingLeft: "12px",
  },
  recCardBody: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "20px",
    display: "block",
  },
  recTable: {
    fontSize: "14px",
    lineHeight: "20px",
    borderCollapse: "collapse" as const,
    marginTop: "4px",
  },
  recTableHeader: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    textAlign: "left" as const,
    paddingRight: "24px",
    paddingBottom: "4px",
  },
  recTableCell: {
    color: tokens.colorNeutralForeground2,
    paddingRight: "24px",
    paddingTop: "4px",
    paddingBottom: "4px",
  },
  recTableLabel: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    paddingRight: "24px",
    paddingTop: "4px",
    paddingBottom: "4px",
  },
  bashBlock: {
    borderRadius: "0px",
    overflow: "hidden",
  },
  bashHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "2px 5px 2px 8px",
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid #d1d1d1`,
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  },
  bashLabel: {
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    lineHeight: "16px",
  },
  bashCode: {
    padding: "4px 8px",
    fontSize: "12px",
    lineHeight: "19px",
    color: "#c71585",
    fontFamily: "'Consolas', monospace",
    whiteSpace: "pre-wrap" as const,
    margin: 0,
    overflowX: "auto" as const,
    backgroundColor: tokens.colorNeutralBackground1,
    borderLeft: `1px solid #d1d1d1`,
    borderRight: `1px solid #d1d1d1`,
    borderBottom: `1px solid #d1d1d1`,
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
  },
  runButton: {
    marginTop: "4px",
  },
  latencyLoader: {
    width: "20px",
    height: "20px",
    marginTop: "4px",
  },
  copyButton: {
    minWidth: "auto",
  },
});

export interface OptimizationRecommendationsProps {
  onScrollRequest?: () => void;
  onComplete?: () => void;
  onRun?: () => void;
}

// ===== Component =====
/** Progressively reveals optimization recommendation cards with performance tables, CLI commands, and run buttons.
 * Cross-project reusable: can be imported by any project. */
export default function OptimizationRecommendations({
  onScrollRequest,
  onComplete,
  onRun,
}: OptimizationRecommendationsProps) {
  const styles = useStyles();
  // 0 = summary loading, 1 = summary shown + rec1 loading, 2 = rec1 shown + rec2 loading, 3 = rec2 shown + rec3 loading, 4 = all shown
  const [revealStep, setRevealStep] = useState(0);
  const [runDisabled, setRunDisabled] = useState(false);

  useEffect(() => {
    if (revealStep >= 4) return;
    const delay = revealStep === 0 ? 500 : 1000;
    const timer = setTimeout(() => {
      setRevealStep((prev) => {
        const next = prev + 1;
        if (next >= 4) setTimeout(() => onComplete?.(), 100);
        return next;
      });
      setTimeout(() => onScrollRequest?.(), 100);
    }, delay);
    return () => clearTimeout(timer);
  }, [revealStep, onScrollRequest, onComplete]);

  return (
    <div className={styles.root}>
      {/* Loader while summary loads */}
      {revealStep === 0 && <LatencyLoader className={styles.latencyLoader} />}

      {/* Summary */}
      {revealStep >= 1 && (
        <>
          <Text className={styles.summaryText}>
            {`Here's a summary of MyCluster-1:`}
          </Text>
          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>
              Cluster CPU utilization:{" "}
              <span className={styles.boldValue}>23%</span>
            </li>
            <li className={styles.bulletItem}>
              Memory utilization: <span className={styles.boldValue}>31%</span>
            </li>
            <li className={styles.bulletItem}>
              Inventory request volume:{" "}
              <span className={styles.boldValue}>stable</span>
            </li>
            <li className={styles.bulletItem}>
              Infrastructure spend:{" "}
              <span className={styles.boldValue}>increased</span>
            </li>
          </ul>
          <Text className={styles.bodyText}>
            Your AKS node pods need to be rightsized to match normal traffic
            patterns. You can expect reduced compute costs during low demand
            periods. The Cluster Autoscaler feature will handle scaling back up
            when peak traffic returns.
          </Text>
        </>
      )}

      {/* Loader while rec 1 loads */}
      {revealStep === 1 && <LatencyLoader className={styles.latencyLoader} />}

      {/* Recommendation 1 */}
      {revealStep >= 2 && (
        <div className={styles.recCard}>
          <Text className={styles.recCardTitle}>
            Recommendation 1: Right-size AKS pods and enable the Cluster
            Autoscaler (CAS)
          </Text>
          <Text className={styles.recCardBody}>
            Estimated savings: $8k per month. Cluster Autoscaler will handle
            peak demand when traffic spikes.
          </Text>
          <table className={styles.recTable}>
            <thead>
              <tr>
                <th className={styles.recTableHeader}></th>
                <th className={styles.recTableHeader}>Current</th>
                <th className={styles.recTableHeader}>Suggested</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.recTableLabel}>CPU</td>
                <td className={styles.recTableCell}>4 cores</td>
                <td className={styles.recTableCell}>2 cores</td>
              </tr>
              <tr>
                <td className={styles.recTableLabel}>Memory</td>
                <td className={styles.recTableCell}>16Gi</td>
                <td className={styles.recTableCell}>8Gi</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.bashBlock}>
            <div className={styles.bashHeader}>
              <span className={styles.bashLabel}>Bash</span>
              <Button
                appearance="subtle"
                size="small"
                icon={<Copy16Regular />}
                className={styles.copyButton}
              />
            </div>
            <pre
              className={styles.bashCode}
            >{`kubectl top pods zava-database -n default
az aks nodepool update \\
  --resource-group zavaRG \\
  --cluster-name ZavaCluster-1 \\
  --name zavaPool \\
  --enable-cluster-autoscaler \\
  --min-count 3 \\
  --max-count 10`}</pre>
          </div>
          <div className={styles.runButton}>
            <Button
              appearance="outline"
              size="small"
              disabled={runDisabled}
              onClick={() => {
                setRunDisabled(true);
                onRun?.();
              }}
            >
              Run
            </Button>
          </div>
        </div>
      )}

      {/* Loader while rec 2 loads */}
      {revealStep === 2 && <LatencyLoader className={styles.latencyLoader} />}

      {/* Recommendation 2 */}
      {revealStep >= 3 && (
        <div className={styles.recCard}>
          <Text className={styles.recCardTitle}>
            Recommendation 2: Optimize pod resource requests and enable the
            Cluster Autoscaler (CAS)
          </Text>
          <Text className={styles.recCardBody}>
            {`Estimated savings: $9k per month. This would allow more pods per node.`}
          </Text>
          <table className={styles.recTable}>
            <thead>
              <tr>
                <th className={styles.recTableHeader}></th>
                <th className={styles.recTableHeader}>Current</th>
                <th className={styles.recTableHeader}>Actual</th>
                <th className={styles.recTableHeader}>Suggested</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.recTableLabel}>CPU</td>
                <td className={styles.recTableCell}>1000m</td>
                <td className={styles.recTableCell}>320m</td>
                <td className={styles.recTableCell}>400m</td>
              </tr>
              <tr>
                <td className={styles.recTableLabel}>Memory</td>
                <td className={styles.recTableCell}>2Gi</td>
                <td className={styles.recTableCell}>750Mi</td>
                <td className={styles.recTableCell}>1Gi</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.bashBlock}>
            <div className={styles.bashHeader}>
              <span className={styles.bashLabel}>Bash</span>
              <Button
                appearance="subtle"
                size="small"
                icon={<Copy16Regular />}
                className={styles.copyButton}
              />
            </div>
            <pre className={styles.bashCode}>{`kubectl top pods -A --containers
kubectl set resources deployment/<deploy> -n zavaSpace --
  requests=cpu=200m,memory=256Mi --limits=cpu=500m,memory=512Mi
az aks update --resource-group zavaRG --name ZavaCluster-1 --enable-cluster-
  autoscaler --min-count 1 --max-count 5`}</pre>
          </div>
          <div className={styles.runButton}>
            <Button
              appearance="outline"
              size="small"
              disabled={runDisabled}
              onClick={() => {
                setRunDisabled(true);
                onRun?.();
              }}
            >
              Run
            </Button>
          </div>
        </div>
      )}

      {/* Loader while rec 3 loads */}
      {revealStep === 3 && <LatencyLoader className={styles.latencyLoader} />}

      {/* Recommendation 3 */}
      {revealStep >= 4 && (
        <div className={styles.recCard}>
          <Text className={styles.recCardTitle}>
            Recommendation 3: Optimize PostgreSQL compute tier and enable the
            Cluster Autoscaler (CAS)
          </Text>
          <Text className={styles.recCardBody}>
            Estimated savings: $12k per month. Burstable compute scaling may
            benefit your business.
          </Text>
          <table className={styles.recTable}>
            <thead>
              <tr>
                <th className={styles.recTableHeader}></th>
                <th className={styles.recTableHeader}>Peak</th>
                <th className={styles.recTableHeader}>Off-peak</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={styles.recTableLabel}>CPU</td>
                <td className={styles.recTableCell}>45%</td>
                <td className={styles.recTableCell}>&lt;10%</td>
              </tr>
            </tbody>
          </table>
          <div className={styles.bashBlock}>
            <div className={styles.bashHeader}>
              <span className={styles.bashLabel}>Bash</span>
              <Button
                appearance="subtle"
                size="small"
                icon={<Copy16Regular />}
                className={styles.copyButton}
              />
            </div>
            <pre
              className={styles.bashCode}
            >{`az postgres flexible-server update --resource-group zavaRG --name zavaServer --tier
  Burstable
az aks update --resource-group zavaRG --name ZavaCluster-1 --enable-cluster-
  autoscaler --min-count 1 --max-count 5`}</pre>
          </div>
          <div className={styles.runButton}>
            <Button
              appearance="outline"
              size="small"
              disabled={runDisabled}
              onClick={() => {
                setRunDisabled(true);
                onRun?.();
              }}
            >
              Run
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
