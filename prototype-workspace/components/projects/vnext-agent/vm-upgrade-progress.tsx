/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client"

import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components"


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Checkmark20Filled, Send16Regular } from "@fluentui/react-icons"
import { useState, useEffect } from "react"

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
  link: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    cursor: "pointer",
    padding: "2px 4px",
    position: "relative",
    transition: "background-color 0.2s",
    backgroundImage: `repeating-linear-gradient(to right, rgba(0, 120, 212, 0.35) 4px, rgba(0, 120, 212, 0.35) 8px, transparent 8px, transparent 10px)`,
    backgroundPosition: "0 calc(100% - 2px)",
    backgroundSize: "100% 3px",
    backgroundRepeat: "no-repeat",
    ":hover": {
      backgroundColor: "rgba(59, 130, 246, 0.04)",
    },
  },
  agentCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
    marginBottom: "40px",
    maxWidth: "800px",
  },
  agentHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  agentTitle: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "20px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
  },
  agentIcon: {
    width: "32px",
    height: "32px",
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
  agentDescription: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "20px",
    lineHeight: "1.5",
  },
  currentTask: {
    backgroundColor: "rgba(59, 130, 246, 0.08)",
    padding: "12px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  loadingSpinner: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(0, 120, 212, 0.2)",
    borderTopColor: "#0078d4",
    borderRadius: "50%",
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
    animation: "spin 0.8s linear infinite",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  statValue: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  promptsSection: {
    marginTop: "40px",
  },
  promptsTitle: {
    fontSize: "16px",
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
})

interface VMUpgradeProgressProps {
  onComplete: () => void
}

export default function VMUpgradeProgress({ onComplete }: VMUpgradeProgressProps) {
  const styles = useStyles()
  const [timeElapsed, setTimeElapsed] = useState(8)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    "Checking configuration versions",
    "Validating VM compatibility",
    "Preparing upgrade packages",
    "Applying system updates"
  ]

  useEffect(() => {
    // Simulate time progression
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Progress through steps every 3 seconds (12 seconds total for 4 steps)
    if (currentStep < steps.length) {
      const stepTimer = setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, 3000)
      
      return () => clearTimeout(stepTimer)
    } else {
      // Complete after all steps
      const completeTimer = setTimeout(() => {
        onComplete()
      }, 1000)
      return () => clearTimeout(completeTimer)
    }
  }, [currentStep, steps.length, onComplete])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        I've assigned VM Operator to work on your new deployment. I'll send an update when it's complete, or you can{" "}
        <span className={styles.link}>view more details in the agent summary</span>.
      </div>

      <div className={styles.agentCard}>
        <div className={styles.agentHeader}>
          <div className={styles.agentTitle}>
            <img 
              src="/icons/AgentsColor.svg" 
              alt="VM Operator" 
              className={styles.agentIcon}
            />
            VM Operator
          </div>
          <a className={styles.viewLink}>
            <span>View in agent summary</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6.5 3L11.5 8L6.5 13" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </a>
        </div>

        <div className={styles.agentDescription}>
          I configure environments, optimize compute, storage, and networking, and enforce security and compliance policies across Azure services—automatically and at scale. I'm available to use for free to all new users within their first 30 days using Azure.
        </div>

        <div className={styles.currentTask}>
          <div className={styles.loadingSpinner}></div>
          <span>{currentStep < steps.length ? steps[currentStep] : "Finalizing upgrade"}</span>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Time elapsed</div>
            <div className={styles.statValue}>{timeElapsed} seconds</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Est. time remaining</div>
            <div className={styles.statValue}>{Math.max(0, 26 - Math.floor(timeElapsed / 60))} minutes</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Accuracy rate</div>
            <div className={styles.statValue}>100%</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Cost to use</div>
            <div className={styles.statValue}>$0.16/minute</div>
          </div>
        </div>
      </div>

      <div className={styles.promptsSection}>
        <div className={styles.promptsTitle}>What can I help you with next?</div>
        <div className={styles.promptButtons}>
          <button className={styles.promptButton}>
            <span>Help me build an AI agent</span>
            <Send16Regular />
          </button>
          <button className={styles.promptButton}>
            <span>Help me import existing code from GitHub</span>
            <Send16Regular />
          </button>
          <button className={styles.promptButton}>
            <span>Help me set up my Azure free account</span>
            <Send16Regular />
          </button>
        </div>
      </div>
    </div>
  )
}
