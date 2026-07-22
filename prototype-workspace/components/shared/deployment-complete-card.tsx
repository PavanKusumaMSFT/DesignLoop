"use client";

import { makeStyles, mergeClasses, tokens as fluentTokens } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Checkmark20Filled } from "@fluentui/react-icons";

const useStyles = makeStyles({
  completeCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "18px",
    padding: "24px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
    marginTop: "16px",
    marginBottom: "16px",
    maxWidth: "800px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
  },
  viewLink: {
    fontSize: "13px",
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  viewLinkDefault: {
    cursor: "default",
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
  statusCell: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  statusIcon: {
    color: tokens.colorPaletteGreenForeground1,
  },
  statusText: {
    color: tokens.colorPaletteGreenForeground1,
  },
});

interface Resource {
  name: string;
  type: string;
  status: string;
  monthlyCost: string;
  lastActivity: string;
}

interface DeploymentCompleteCardProps {
  resources: Resource[];
  title?: string;
  onViewManage?: () => void;
  viewLinkText?: string;
}

/** Renders a post-deployment summary card with a resource table showing name, type, status, cost, and activity.
 * Composed from: makeStyles table, Checkmark20Filled icon, status badges.
 * Instead of: building inline deployment result tables after resource provisioning. */
export function DeploymentCompleteCard({
  resources,
  title = "Project-01",
  onViewManage,
  viewLinkText = "View in Manage",
}: DeploymentCompleteCardProps) {
  const styles = useStyles();

  return (
    <div className={styles.completeCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>{title}</div>
        <a
          className={mergeClasses(
            styles.viewLink,
            !onViewManage && styles.viewLinkDefault,
          )}
          onClick={onViewManage}
        >
          <span>{viewLinkText}</span>
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
            <th className={styles.tableHeader}>Type</th>
            <th className={styles.tableHeader}>Status</th>
            <th className={styles.tableHeader}>Monthly cost</th>
            <th className={styles.tableHeader}>Last activity</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((resource, index) => (
            <tr key={index}>
              <td className={styles.tableCell}>{resource.name}</td>
              <td className={styles.tableCell}>{resource.type}</td>
              <td className={styles.tableCell}>
                <div className={styles.statusCell}>
                  <Checkmark20Filled className={styles.statusIcon} />
                  <span className={styles.statusText}>{resource.status}</span>
                </div>
              </td>
              <td className={styles.tableCell}>{resource.monthlyCost}</td>
              <td className={styles.tableCell}>{resource.lastActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
