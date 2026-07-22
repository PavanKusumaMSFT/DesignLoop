/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client"

import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components"


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Checkmark20Filled, Send16Regular, ChatSparkle20Regular, Sparkle16Filled } from "@fluentui/react-icons"
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
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "20px",
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
  progressSection: {
    marginBottom: "20px",
  },
  progressLabel: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "12px",
  },
  progressBox: {
    backgroundColor: "rgba(59, 130, 246, 0.08)",
    padding: "16px",
    borderRadius: "8px",
  },
  stepsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  step: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
  },
  stepIcon: {
    flexShrink: 0,
  },
  iconCompleted: {
    color: tokens.colorPaletteGreenForeground1,
  },
  iconInProgress: {
    color: tokens.colorBrandForeground1,
  },
  iconPending: {
    color: tokens.colorNeutralForeground3,
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
})

interface DeploymentProgressProps {
  serviceName: string
  onComplete: () => void
  showNotification?: boolean
  onNotificationShow?: () => void
  onNotificationDismiss?: () => void
}

/** Animated deployment progress view with step indicators, elapsed timer, metrics, and an optional floating notification card.
 * Cross-project reusable: can be imported by any project. */
export default function DeploymentProgress({ 
  serviceName, 
  onComplete, 
  showNotification = false,
  onNotificationShow,
  onNotificationDismiss
}: DeploymentProgressProps) {
  const styles = useStyles()
  const [currentStep, setCurrentStep] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)

  const steps = [
    "Setting up your first Azure Environment to organize apps and services",
    "Setting up role-based access control (RBAC) and network isolation",
    "Configuring auto-scaling and deployment slots",
    "Testing and iterating, validating your domain"
  ]

  useEffect(() => {
    // Simulate time progression
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Show notification after 6 seconds
    const notificationTimer = setTimeout(() => {
      onNotificationShow?.()
    }, 6000)

    return () => clearTimeout(notificationTimer)
  }, [onNotificationShow])

  useEffect(() => {
    // Progress through steps
    if (currentStep < steps.length) {
      const stepTimer = setTimeout(() => {
        setCurrentStep(currentStep + 1)
      }, 2000) // Each step takes 2 seconds
      
      return () => clearTimeout(stepTimer)
    } else {
      // All steps complete, wait a moment then trigger completion
      const completeTimer = setTimeout(() => {
        onComplete()
      }, 500)
      return () => clearTimeout(completeTimer)
    }
  }, [currentStep, steps.length, onComplete])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        I've assigned Deployment Manager to work on your new deployment. I'll send an update when it's complete, or you can{" "}
        <span className={styles.link}>view more details in the agent summary</span>.
      </div>

      <div className={styles.agentCard}>
        <div className={styles.agentHeader}>
          <div className={styles.agentTitle}>
            <img 
              src="/icons/AgentsColor.svg" 
              alt="Deployment Manager" 
              className={styles.agentIcon}
            />
            Deployment Manager
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

        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Time elapsed</div>
            <div className={styles.statValue}>{timeElapsed} seconds</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Time to completion</div>
            <div className={styles.statValue}>4–8 minutes</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Accuracy rate</div>
            <div className={styles.statValue}>100%</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Cost to use</div>
            <div className={styles.statValue}>Free</div>
          </div>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.progressLabel}>In progress</div>
          <div className={styles.progressBox}>
            {currentStep < steps.length ? (
              <div className={styles.step}>
                <div className={styles.loadingSpinner}></div>
                <span>{steps[currentStep]}</span>
              </div>
            ) : (
              <div className={styles.step}>
                <Checkmark20Filled className={`${styles.stepIcon} ${styles.iconCompleted}`} />
                <span>All steps completed</span>
              </div>
            )}
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

      {showNotification && (
        <div className={styles.notificationCard}>
          <div className={styles.notificationHeader}>
            <div className={styles.notificationTitleRow}>
              <div className={styles.notificationIconWrapper}>
                <ChatSparkle20Regular className={styles.notificationIcon} />
              </div>
              <span className={styles.notificationTitle}>New thought from Copilot</span>
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
            Now that you've deployed your first service, I've compiled some Learn articles that can help develop your knowledge of Azure.
          </p>
        </div>
      )}
    </div>
  )
}
