"use client";

import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Button,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Checkmark20Regular, Send16Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    flex: 1,
    padding: "20px 40px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  header: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    marginBottom: "32px",
    lineHeight: "1.4",
    maxWidth: "1000px",
  },
  planCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
    marginBottom: "40px",
    maxWidth: "900px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "24px",
    marginBottom: "24px",
    paddingBottom: "24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  detailLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  detailValue: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    textAlign: "left",
    padding: "12px 8px",
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tableCell: {
    padding: "12px 8px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  detailValueGreen: {
    color: tokens.colorPaletteGreenForeground1,
  },
  tableCellGreen: {
    color: tokens.colorPaletteGreenForeground1,
  },
  sendIconSpaced: {
    marginLeft: "6px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
  },
  primaryButton: {
    borderRadius: "20px",
    padding: "8px 20px",
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
  },
  secondaryButton: {
    borderRadius: "20px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "6px 12px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
      transform: "translateY(-1px)",
    },
  },
});

interface VMUpgradePlanProps {
  onUpgrade: () => void;
  onCancel: () => void;
}

export default function VMUpgradePlan({
  onUpgrade,
  onCancel,
}: VMUpgradePlanProps) {
  const styles = useStyles();

  const vms = [
    {
      name: "ai-core-vm01",
      utilization: "68%",
      version: "Epsv5",
      currentCost: "$430.60",
      projectedCost: "$395.80",
    },
    {
      name: "nlp-engine-vm",
      utilization: "80%",
      version: "Epsv5",
      currentCost: "$395.80",
      projectedCost: "$340.20",
    },
    {
      name: "vision-node-vm",
      utilization: "77%",
      version: "Epsv5",
      currentCost: "$395.80",
      projectedCost: "$390.80",
    },
    {
      name: "chatbot-api-vm",
      utilization: "50%",
      version: "Epsv5",
      currentCost: "$430.60",
      projectedCost: "$405.75",
    },
    {
      name: "ml-trainer-vm",
      utilization: "49%",
      version: "Eadsv5-series",
      currentCost: "$620.45",
      projectedCost: "$575.40",
    },
    {
      name: "openai-proxy-vm",
      utilization: "73%",
      version: "Eadsv5-series",
      currentCost: "$478.80",
      projectedCost: "$413.55",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        These are the VMs eligible for upgrading, along with the upgrade
        details.
      </div>

      <div className={styles.planCard}>
        <div className={styles.sectionTitle}>Upgrade details</div>

        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>VMs affected</div>
            <div className={styles.detailValue}>6</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Average utilization</div>
            <div className={styles.detailValue}>66%</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Upgrade version</div>
            <div className={styles.detailValue}>Easv6-series</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Current cost</div>
            <div className={styles.detailValue}>$2,752.50/month</div>
          </div>
          <div className={styles.detailItem}>
            <div className={styles.detailLabel}>Projected savings</div>
            <div
              className={mergeClasses(
                styles.detailValue,
                styles.detailValueGreen,
              )}
            >
              $231.00/month
            </div>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Resource name</th>
              <th className={styles.tableHeader}>Utilization</th>
              <th className={styles.tableHeader}>Version</th>
              <th className={styles.tableHeader}>Current monthly cost</th>
              <th className={styles.tableHeader}>Projected monthly cost</th>
            </tr>
          </thead>
          <tbody>
            {vms.map((vm) => (
              <tr key={vm.name}>
                <td className={styles.tableCell}>{vm.name}</td>
                <td className={styles.tableCell}>{vm.utilization}</td>
                <td className={styles.tableCell}>{vm.version}</td>
                <td className={styles.tableCell}>{vm.currentCost}</td>
                <td
                  className={mergeClasses(
                    styles.tableCell,
                    styles.tableCellGreen,
                  )}
                >
                  {vm.projectedCost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.actions}>
          <Button
            appearance="primary"
            className={styles.primaryButton}
            onClick={onUpgrade}
          >
            Approve and upgrade listed VMs
            <Send16Regular className={styles.sendIconSpaced} />
          </Button>
          <button className={styles.secondaryButton} onClick={onCancel}>
            <span>Add more resources to upgrade</span>
            <Send16Regular />
          </button>
          <button className={styles.secondaryButton} onClick={onCancel}>
            <span>Exclude resources from upgrade</span>
            <Send16Regular />
          </button>
        </div>
      </div>
    </div>
  );
}
