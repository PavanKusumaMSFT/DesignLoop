/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Button,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Checkmark20Filled, Send16Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    flex: 1,
    padding: "20px 40px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  successBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#DFF6DD",
    color: tokens.colorPaletteGreenForeground1,
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "16px",
  },
  checkIcon: {
    color: tokens.colorPaletteGreenForeground1,
  },
  header: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    marginBottom: "32px",
    lineHeight: "1.4",
    maxWidth: "900px",
  },
  vmCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
    marginBottom: "40px",
    maxWidth: "800px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  vmTitle: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "20px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
  },
  vmIcon: {
    width: "32px",
    height: "32px",
  },
  openLink: {
    fontSize: "13px",
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
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
  nextStepsSection: {
    marginTop: "24px",
  },
  nextStepsTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
  },
  promptButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  tableCellGreen: {
    color: tokens.colorPaletteGreenForeground1,
  },
  promptButton: {
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

interface VMUpgradeCompleteProps {
  onPromptClick: (prompt: string) => void;
}

export default function VMUpgradeComplete({
  onPromptClick,
}: VMUpgradeCompleteProps) {
  const styles = useStyles();

  const upgradedVMs = [
    {
      name: "ai-core-vm01",
      utilization: "68%",
      version: "Easv6-series",
      cost: "$395.80",
    },
    {
      name: "nlp-engine-vm",
      utilization: "80%",
      version: "Easv6-series",
      cost: "$340.20",
    },
    {
      name: "vision-node-vm",
      utilization: "77%",
      version: "Easv6-series",
      cost: "$390.80",
    },
    {
      name: "chatbot-api-vm",
      utilization: "50%",
      version: "Easv6-series",
      cost: "$405.75",
    },
    {
      name: "ml-trainer-vm",
      utilization: "49%",
      version: "Easv6-series",
      cost: "$575.40",
    },
    {
      name: "openai-proxy-vm",
      utilization: "73%",
      version: "Easv6-series",
      cost: "$413.55",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        All of your eligible VMs have been successfully upgraded to
        Easv6-series.
      </div>

      <div className={styles.vmCard}>
        <div className={styles.cardHeader}>
          <div className={styles.vmTitle}>
            <img
              src="/icons/virtual-machine.svg"
              alt="Virtual Machines"
              className={styles.vmIcon}
            />
            Virtual Machines
          </div>
          <a className={styles.openLink}>
            <span>Open in Azure Portal</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M6.5 3L11.5 8L6.5 13"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </a>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Resource name</th>
              <th className={styles.tableHeader}>Utilization</th>
              <th className={styles.tableHeader}>Version</th>
              <th className={styles.tableHeader}>Monthly cost</th>
            </tr>
          </thead>
          <tbody>
            {upgradedVMs.map((vm) => (
              <tr key={vm.name}>
                <td className={styles.tableCell}>{vm.name}</td>
                <td className={styles.tableCell}>{vm.utilization}</td>
                <td className={styles.tableCell}>{vm.version}</td>
                <td
                  className={mergeClasses(
                    styles.tableCell,
                    styles.tableCellGreen,
                  )}
                >
                  {vm.cost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.nextStepsSection}>
        <div className={styles.nextStepsTitle}>
          What can I help you with next?
        </div>
        <div className={styles.promptButtons}>
          <button
            className={styles.promptButton}
            onClick={() =>
              onPromptClick("Monitor VM performance after upgrade")
            }
          >
            <span>Monitor VM performance after upgrade</span>
            <Send16Regular />
          </button>
          <button
            className={styles.promptButton}
            onClick={() => onPromptClick("Review cost savings report")}
          >
            <span>Review cost savings report</span>
            <Send16Regular />
          </button>
          <button
            className={styles.promptButton}
            onClick={() => onPromptClick("Optimize other resources")}
          >
            <span>Optimize other resources</span>
            <Send16Regular />
          </button>
          <button
            className={styles.promptButton}
            onClick={() => onPromptClick("Set up alerts for VMs")}
          >
            <span>Set up alerts for VMs</span>
            <Send16Regular />
          </button>
        </div>
      </div>
    </div>
  );
}
