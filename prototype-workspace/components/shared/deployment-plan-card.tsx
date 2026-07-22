"use client";

import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Button,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Send16Regular, Checkmark20Regular } from "@fluentui/react-icons";
import { useState } from "react";

const useStyles = makeStyles({
  planCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "12px",
    padding: "12px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
    marginTop: "16px",
    marginBottom: "16px",
  },
  headerSection: {
    backgroundColor: "rgba(0, 120, 212, 0.05)",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  contentSection: {
    padding: "0 20px 8px 20px",
  },
  planTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
  },
  planDetails: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
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
  stepsList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "24px",
  },
  step: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  },
  stepIcon: {
    color: tokens.colorPaletteGreenForeground1,
    marginTop: "2px",
    flexShrink: 0,
  },
  stepContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  stepTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  notesSection: {
    marginBottom: "24px",
  },
  notesLabel: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "8px",
    display: "block",
  },
  notesInput: {
    width: "100%",
    padding: "8px 12px",
    fontSize: "14px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "4px",
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    "::placeholder": {
      color: tokens.colorNeutralForeground3,
    },
    ":focus": {
      outline: `2px solid ${tokens.colorBrandStroke1}`,
      outlineOffset: "1px",
    },
  },
  notesHint: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    marginTop: "8px",
    display: "block",
  },
  tabContainer: {
    display: "flex",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    marginBottom: "16px",
  },
  tab: {
    padding: "8px 0",
    marginRight: "24px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground3,
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s ease",
    ":hover": {
      color: tokens.colorNeutralForeground2,
    },
  },
  activeTab: {
    color: tokens.colorBrandForeground1,
    borderBottomColor: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  primaryButton: {
    borderRadius: "20px",
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    border: "none",
    padding: "6px 12px",
    fontSize: "13px",
    fontWeight: tokens.fontWeightRegular,
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    fontFamily: tokens.fontFamilyBase,
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
      transform: "translateY(-1px)",
    },
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
    gap: "8px",
    whiteSpace: "nowrap",
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightRegular,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
      transform: "translateY(-1px)",
    },
  },
  primaryButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  serviceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: "16px",
    marginBottom: "16px",
  },
  serviceCol: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  serviceLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  serviceIconRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  serviceIcon: {
    width: "16px",
    height: "16px",
  },
  serviceValue: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },
});

interface DeploymentPlanCardProps {
  serviceName: string;
  region?: string;
  pricingTier?: string;
  estimatedCost?: string;
  usersSupported?: string;
  onApprove?: () => void;
  onInviteColleagues?: () => void;
  onAddSupport?: () => void;
  isDeployDisabled?: boolean;
}

/** Renders a deployment plan preview card with service details, step checklist, notes input, and approve/action buttons.
 * Composed from: makeStyles card, Checkmark20Regular steps, Send16Regular action buttons.
 * Instead of: building inline deployment preview UI with plan details and approval actions. */
export function DeploymentPlanCard({
  serviceName,
  region = "West-US",
  pricingTier = "Basic",
  estimatedCost = "$1.30",
  usersSupported = "1,000–5,000",
  onApprove,
  onInviteColleagues,
  onAddSupport,
  isDeployDisabled = false,
}: DeploymentPlanCardProps) {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<
    "plan" | "architecture" | "pricing"
  >("plan");

  // Determine if this is scenario 2 based on serviceName
  const isScenario2 = serviceName === "containerized web app";

  const steps = isScenario2
    ? [
        {
          title:
            "Provision Azure App Services for your React frontend and Node.js backend",
        },
        {
          title:
            "Configure containers for both workloads and set up CI/CD pipelines",
        },
        {
          title:
            "Create an Azure Cosmos DB instance with global distribution and secure access",
        },
        {
          title:
            "Enable monitoring and scaling for performance and cost efficiency",
        },
        {
          title:
            "Apply security settings including SSL/TLS and Azure AD integration",
        },
        {
          title: "Validate functionality of newly created resources",
        },
      ]
    : [
        {
          title:
            "Set up your first Azure Environment to organize apps and services",
        },
        {
          title: "Configure auto-scaling and deployment slots",
        },
        {
          title: "Test and iterate, validate your domain",
        },
      ];

  return (
    <div className={styles.planCard}>
      <div className={styles.headerSection}>
        <div className={styles.planTitle}>Deployment plan: {serviceName}</div>

        {isScenario2 && (
          <div className={styles.serviceRow}>
            <div className={styles.serviceCol}>
              <span className={styles.serviceLabel}>Frontend (React)</span>
              <div className={styles.serviceIconRow}>
                <img
                  src="/icons/App-Services.svg"
                  alt="Azure App Service"
                  className={styles.serviceIcon}
                />
                <span className={styles.serviceValue}>Azure App Service</span>
              </div>
            </div>
            <div className={styles.serviceCol}>
              <span className={styles.serviceLabel}>Backend (Node.js)</span>
              <div className={styles.serviceIconRow}>
                <img
                  src="/icons/App-Services.svg"
                  alt="Azure App Service"
                  className={styles.serviceIcon}
                />
                <span className={styles.serviceValue}>Azure App Service</span>
              </div>
            </div>
            <div className={styles.serviceCol}>
              <span className={styles.serviceLabel}>Database</span>
              <div className={styles.serviceIconRow}>
                <img
                  src="/icons/SQL-Database.svg"
                  alt="Azure Cosmos DB"
                  className={styles.serviceIcon}
                />
                <span className={styles.serviceValue}>
                  Azure Cosmos DB (MongoDB API)
                </span>
              </div>
            </div>
          </div>
        )}

        {!isScenario2 && (
          <div className={styles.planDetails}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Region</span>
              <span className={styles.detailValue}>{region}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Pricing tier</span>
              <span className={styles.detailValue}>{pricingTier}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Estimated daily cost</span>
              <span className={styles.detailValue}>{estimatedCost}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Users supported</span>
              <span className={styles.detailValue}>{usersSupported}</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.contentSection}>
        {isScenario2 && (
          <div className={styles.tabContainer}>
            <div
              className={`${styles.tab} ${activeTab === "plan" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("plan")}
            >
              Plan
            </div>
            <div
              className={`${styles.tab} ${activeTab === "architecture" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("architecture")}
            >
              Architecture
            </div>
            <div
              className={`${styles.tab} ${activeTab === "pricing" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("pricing")}
            >
              Pricing
            </div>
          </div>
        )}

        <div className={styles.stepsList}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <Checkmark20Regular className={styles.stepIcon} />
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>{step.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.notesSection}>
          <span className={styles.notesLabel}>
            Add custom notes and requirements
          </span>
          <input
            type="text"
            placeholder="Focus on..."
            className={styles.notesInput}
          />
          <span className={styles.notesHint}>
            I'll use any additional notes you leave here to inform my
            decision-making.
          </span>
        </div>

        <div className={styles.actions}>
          <button
            className={mergeClasses(
              styles.primaryButton,
              isDeployDisabled ? styles.primaryButtonDisabled : "",
            )}
            onClick={onApprove}
            disabled={isDeployDisabled}
          >
            <span>Approve and deploy</span>
            <Send16Regular />
          </button>
          <button
            className={styles.secondaryButton}
            onClick={onInviteColleagues}
          >
            <span>
              {isScenario2 ? "Open in VS Code" : "Invite colleagues for RBAC"}
            </span>
            <Send16Regular />
          </button>
          {!isScenario2 && (
            <button className={styles.secondaryButton} onClick={onAddSupport}>
              <span>Add support for up to 10,000 users</span>
              <Send16Regular />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
