"use client"

import { makeStyles, tokens as fluentTokens, Button } from "@fluentui/react-components"


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Send16Regular, Checkmark20Regular, ArrowRight16Regular } from "@fluentui/react-icons"

const useStyles = makeStyles({
  container: {
    flex: 1,
    padding: "20px 40px 40px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  heading: {
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
  stepDescription: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.5",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
    flexWrap: "wrap",
  },
  primaryButton: {
    borderRadius: "20px",
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    border: "none",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
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
    padding: "8px 16px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
      transform: "translateY(-1px)",
    },
  },
})

interface DeploymentPlanProps {
  serviceName: string
  onDeploy: () => void
  onCancel: () => void
}

/** Displays a deployment plan card with region, pricing tier, estimated cost, and a multi-step process overview.
 * Cross-project reusable: can be imported by any project. */
export default function DeploymentPlan({ serviceName, onDeploy, onCancel }: DeploymentPlanProps) {
  const styles = useStyles()

  const steps = [
    {
      title: "Set up your first Azure Environment to organize apps and services",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
    },
    {
      title: "(Optional) Set up role-based access control (RBAC) and network isolation",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
    },
    {
      title: "Configure auto-scaling and deployment slots",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      title: "Test and iterate, validate your domain",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.planCard}>
        <div className={styles.planTitle}>Deployment plan: {serviceName}</div>
        
        <div className={styles.planDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Region</span>
            <span className={styles.detailValue}>West-US</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Pricing tier</span>
            <span className={styles.detailValue}>Basic</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Estimated daily cost</span>
            <span className={styles.detailValue}>$2.30</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Users supported</span>
            <span className={styles.detailValue}>1,000–5,000</span>
          </div>
        </div>
        
        <div className={styles.stepsList}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <Checkmark20Regular className={styles.stepIcon} />
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>{step.title}</div>
                <div className={styles.stepDescription}>{step.description}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.actions}>
          <button className={styles.primaryButton} onClick={onDeploy}>
            <span>Approve and deploy</span>
            <ArrowRight16Regular />
          </button>
          <button className={styles.secondaryButton} onClick={onCancel}>
            <span>Invite colleagues for RBAC</span>
            <Send16Regular />
          </button>
          <button className={styles.secondaryButton} onClick={onCancel}>
            <span>Configure resource to support up to 10,000 users</span>
            <Send16Regular />
          </button>
        </div>
      </div>
    </div>
  )
}
