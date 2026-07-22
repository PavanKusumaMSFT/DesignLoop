/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client"

import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components"


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Send16Regular, ArrowRight16Regular, Copy16Regular } from "@fluentui/react-icons"

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
    marginBottom: "4px",
  },
  planSubtitle: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground3,
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
    gap: "20px",
  },
  step: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  },
  stepIcon: {
    color: tokens.colorNeutralForeground2,
    marginTop: "2px",
    flexShrink: 0,
  },
  stepContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
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
  cliCommandWrapper: {
    marginTop: "8px",
  },
  cliCommandContainer: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "12px 16px",
    borderRadius: "12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  cliHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cliLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  copyButton: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: tokens.colorNeutralForeground2,
    transition: "all 0.2s",
    flexShrink: 0,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1,
      border: `1px solid ${tokens.colorNeutralStroke1}`,
    },
  },
  cliDivider: {
    height: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
  },
  cliCommand: {
    fontFamily: "'Cascadia Code', Consolas, 'Courier New', monospace",
    fontSize: "13px",
    color: "#c7254e",
    wordBreak: "break-all",
    lineHeight: "1.6",
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

interface ResolutionPlanProps {
  onApprove: () => void
  onCancel: () => void
}

/** Displays an incident resolution plan with target resource details, estimated time/cost, and CLI command steps.
 * Cross-project reusable: can be imported by any project. */
export default function ResolutionPlan({ onApprove, onCancel }: ResolutionPlanProps) {
  const styles = useStyles()

  const steps = [
    {
      title: "Update NSG rule with a new Wildcard destination prefix",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      cliCommand: "az network nsg rule update -g stock-vm-westus --nsg-name"
    },
    {
      title: "Mark issue as resolved in ADO",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
    },
    {
      title: "Document the change in ServiceNow",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
    }
  ]

  const handleCopy = (command: string) => {
    navigator.clipboard.writeText(command)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Here's a plan to resolve the Sev1 alert on BackendVM4.
      </h2>
      
      <div className={styles.planCard}>
        <div className={styles.planTitle}>Resolution plan: Change NSG rule</div>
        <div className={styles.planSubtitle}>Proposal by VM Operator</div>
        
        <div className={styles.planDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Target resource</span>
            <span className={styles.detailValue}>stock-vm-westus</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Region</span>
            <span className={styles.detailValue}>WestUS</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Estimated time</span>
            <span className={styles.detailValue}>1–2 hours</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Estimated cost</span>
            <span className={styles.detailValue}>$4.12</span>
          </div>
        </div>
        
        <div className={styles.stepsList}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <ArrowRight16Regular className={styles.stepIcon} />
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>{step.title}</div>
                <div className={styles.stepDescription}>{step.description}</div>
                {step.cliCommand && (
                  <div className={styles.cliCommandWrapper}>
                    <div className={styles.cliCommandContainer}>
                      <div className={styles.cliHeader}>
                        <div className={styles.cliLabel}>CLI command</div>
                        <button 
                          className={styles.copyButton} 
                          onClick={() => handleCopy(step.cliCommand!)}
                          aria-label="Copy command"
                        >
                          <Copy16Regular />
                        </button>
                      </div>
                      <div className={styles.cliDivider}></div>
                      <div className={styles.cliCommand}>{step.cliCommand}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.actions}>
          <button className={styles.primaryButton} onClick={onApprove}>
            <span>Approve plan & change NSG rule</span>
            <Send16Regular />
          </button>
          <button className={styles.secondaryButton} onClick={onCancel}>
            <span>Lorem ipsum dolor set smet</span>
            <Send16Regular />
          </button>
        </div>
      </div>
    </div>
  )
}
