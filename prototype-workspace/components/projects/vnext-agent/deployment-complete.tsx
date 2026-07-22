"use client";

import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Send16Regular,
  ArrowUpRight16Regular,
  ChatSparkle20Regular,
  Sparkle16Filled,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    flex: 1,
    padding: "20px 40px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  heading: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
    lineHeight: "1.4",
    maxWidth: "900px",
  },
  subheading: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "32px",
  },
  resourceCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
    marginBottom: "40px",
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
  nextSection: {
    marginTop: "24px",
  },
  nextHeading: {
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
  notificationCard: {
    position: "fixed",
    bottom: "120px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "28px",
    padding: "32px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "680px",
    width: "calc(100% - 80px)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    zIndex: 1000,
    "@keyframes slideUp": {
      "0%": {
        opacity: 0,
        transform: "translateX(-50%) translateY(20px)",
      },
      "100%": {
        opacity: 1,
        transform: "translateX(-50%) translateY(0)",
      },
    },
    animation: "slideUp 0.4s ease-out",
  },
  notificationIconWrapper: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 120, 212, 0.1)",
    border: "1px solid rgba(0, 120, 212, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginRight: "12px",
  },
  notificationIcon: {
    color: tokens.colorBrandForeground1,
  },
  notificationHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notificationTitleRow: {
    display: "flex",
    alignItems: "center",
  },
  notificationTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
  },
  notificationActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  notificationLink: {
    fontSize: "14px",
    fontWeight: 500,
    color: tokens.colorNeutralForeground2,
    textDecoration: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "none",
    border: "none",
    padding: 0,
    ":hover": {
      textDecoration: "underline",
      color: tokens.colorBrandForeground1,
    },
  },
  dismissLink: {
    fontSize: "14px",
    fontWeight: 500,
    color: tokens.colorNeutralForeground2,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    ":hover": {
      textDecoration: "underline",
      color: tokens.colorBrandForeground1,
    },
  },
  notificationText: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.5",
    margin: 0,
  },
  serviceImg: {
    width: "32px",
    height: "32px",
  },
});

interface DeploymentCompleteProps {
  serviceName: string;
  resourceName: string;
  onPromptClick: (prompt: string) => void;
  showNotification?: boolean;
  onNotificationDismiss?: () => void;
}

/** Success screen shown after deployment, displaying the resource status, region, daily cost, forecast, and next-step prompts.
 * Cross-project reusable: can be imported by any project. */
export default function DeploymentComplete({
  serviceName,
  resourceName,
  onPromptClick,
  showNotification = false,
  onNotificationDismiss,
}: DeploymentCompleteProps) {
  const styles = useStyles();

  const prompts = [
    "Help me build an AI agent",
    "Help me import existing code from GitHub",
    "Help me set up my Azure free account",
    "Explain Azure pricing and cost management",
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Your first resource is deployed, active, and healthy!
      </h2>
      <p className={styles.subheading}>
        You can dive into the details by opening it in the Azure Portal, or I
        can continue to help you with any other tasks you may have.
      </p>

      <div className={styles.resourceCard}>
        <div className={styles.resourceHeader}>
          <div className={styles.resourceTitle}>
            <div className={styles.resourceIcon}>
              <img
                src="/icons/App-Services.svg"
                alt={serviceName}
                className={styles.serviceImg}
              />
            </div>
            <span className={styles.resourceName}>{resourceName}</span>
          </div>
          <a
            className={styles.portalLink}
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <span>Go to resource</span>
            <ArrowUpRight16Regular />
          </a>
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
            <span className={styles.detailLabel}>
              September forecasted cost
            </span>
            <span className={styles.detailValue}>$67.80</span>
          </div>
        </div>
      </div>

      <div className={styles.nextSection}>
        <h3 className={styles.nextHeading}>What can I help you with next?</h3>
        <div className={styles.promptButtons}>
          {prompts.map((prompt) => (
            <button
              key={prompt}
              className={styles.promptButton}
              onClick={() => onPromptClick(prompt)}
            >
              <span>{prompt}</span>
              <Send16Regular />
            </button>
          ))}
        </div>
      </div>

      {showNotification && (
        <div className={styles.notificationCard}>
          <div className={styles.notificationHeader}>
            <div className={styles.notificationTitleRow}>
              <div className={styles.notificationIconWrapper}>
                <ChatSparkle20Regular className={styles.notificationIcon} />
              </div>
              <span className={styles.notificationTitle}>
                New thought from Copilot
              </span>
            </div>
            <div className={styles.notificationActions}>
              <button className={styles.notificationLink}>
                <Sparkle16Filled />
                <span>Show me</span>
              </button>
              <button
                className={styles.dismissLink}
                onClick={() => onNotificationDismiss?.()}
              >
                Dismiss
              </button>
            </div>
          </div>
          <p className={styles.notificationText}>
            Now that you've deployed your first service, I've compiled some
            Learn articles that can help develop your knowledge of Azure.
          </p>
        </div>
      )}
    </div>
  );
}
