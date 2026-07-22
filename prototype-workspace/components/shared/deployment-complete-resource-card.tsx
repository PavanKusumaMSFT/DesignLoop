"use client";

import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { ArrowUpRight16Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  resourceCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "18px",
    padding: "24px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
    marginTop: "16px",
    marginBottom: "16px",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  resourceHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resourceTitle: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  resourceIcon: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconImg: {
    width: "32px",
    height: "32px",
  },
  resourceName: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
  },
  portalLink: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    cursor: "pointer",
    background: "none",
    border: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
  resourceDetails: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    paddingTop: "16px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  detailLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightRegular,
  },
  detailValue: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: tokens.colorPaletteGreenForeground1,
    display: "inline-block",
    marginRight: "6px",
  },
});

interface DeploymentCompleteResourceCardProps {
  serviceName: string;
  resourceName: string;
  iconPath?: string;
}

/** Displays a single deployed resource with icon, name, status dot, region, and cost details.
 * Composed from: makeStyles card, ArrowUpRight16Regular link, service icon image.
 * Instead of: building inline resource confirmation cards after deployment completes. */
export function DeploymentCompleteResourceCard({
  serviceName,
  resourceName,
  iconPath = "/icons/App-Services.svg",
}: DeploymentCompleteResourceCardProps) {
  const styles = useStyles();

  return (
    <div className={styles.resourceCard}>
      <div className={styles.resourceHeader}>
        <div className={styles.resourceTitle}>
          <div className={styles.resourceIcon}>
            <img src={iconPath} alt={serviceName} className={styles.iconImg} />
          </div>
          <span className={styles.resourceName}>{resourceName}</span>
        </div>
        <button className={styles.portalLink} onClick={() => {}}>
          <span>Go to resource</span>
          <ArrowUpRight16Regular />
        </button>
      </div>

      <div className={styles.resourceDetails}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Status</span>
          <span className={styles.detailValue}>
            <span className={styles.statusDot}></span>
            Running
          </span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Region</span>
          <span className={styles.detailValue}>West-US</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Daily cost</span>
          <span className={styles.detailValue}>$2.30</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>September forecasted cost</span>
          <span className={styles.detailValue}>$67.80</span>
        </div>
      </div>
    </div>
  );
}
