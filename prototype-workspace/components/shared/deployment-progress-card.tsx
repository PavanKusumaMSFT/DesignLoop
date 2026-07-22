"use client";

import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";
type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Checkmark20Filled } from "@fluentui/react-icons";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
  progressCard: {
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
    display: "flex",
    alignItems: "center",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "20px",
  },
  statsGridFiveColumns: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
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
  completedBox: {
    backgroundColor: "rgba(16, 124, 16, 0.1)",
    padding: "16px",
    borderRadius: "8px",
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
  loadingSpinner: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(0, 120, 212, 0.2)",
    // eslint-disable-next-line no-restricted-syntax
    borderTopColor: "#0078d4",
    borderRadius: "50%",
    "@keyframes spin": {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
    animation: "spin 0.8s linear infinite",
  },
  statValueWithSparkline: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  sparkline: {
    width: "60px",
    height: "20px",
  },
  agentInlineIcon: {
    width: "16px",
    height: "16px",
    verticalAlign: "middle",
    marginLeft: tokens.spacingHorizontalS,
    marginRight: tokens.spacingHorizontalXS,
  },
  sparklineTransition: {
    transition: "all 0.5s ease-out",
  },
});

interface DeploymentProgressCardProps {
  serviceName: string;
  title?: string;
  steps?: string[];
  initialTimeElapsed?: number;
  artifactsCreated?: number;
  estTimeRemaining?: string;
  costToUse?: string;
  onComplete?: () => void;
  showLiveMetrics?: boolean; // For scenario 3 with live failed requests
  targetResource?: string; // For scenario 3
  agentName?: string; // For scenario 3 - defaults to "Copilot"
  agentIcon?: string; // For scenario 3 - defaults to AgentsColor.svg
}

/** Animated deployment progress card with elapsed time, step indicators, spinner, and optional live metrics.
 * Composed from: makeStyles card, Checkmark20Filled, animated spinner, sparkline SVG.
 * Instead of: building inline deployment progress UI with manual timer and step state. */
export function DeploymentProgressCard({
  serviceName,
  title,
  steps: customSteps,
  initialTimeElapsed = 0,
  artifactsCreated = 0,
  estTimeRemaining,
  costToUse,
  onComplete,
  showLiveMetrics = false,
  targetResource,
  agentName = "Copilot",
  agentIcon = "/icons/AgentsColor.svg",
}: DeploymentProgressCardProps) {
  const styles = useStyles();
  const [currentStep, setCurrentStep] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(initialTimeElapsed);
  const [isCompleted, setIsCompleted] = useState(false);
  const [failedRequests, setFailedRequests] = useState(showLiveMetrics ? 4 : 0);

  const steps = customSteps || [
    "Setting up your first Azure Environment to organize apps and services",
    "Configuring auto-scaling and deployment slots",
    "Testing and iterating, validating your domain",
  ];

  // Helper function to generate sparkline path
  const getSparklinePath = (requests: number) => {
    if (requests === 4) {
      return "M 0 10 L 15 10 L 30 10 L 45 10 L 60 10";
    } else if (requests === 1) {
      return "M 0 10 L 15 10 L 30 12 L 45 14 L 60 16";
    } else {
      return "M 0 10 L 15 12 L 30 14 L 45 17 L 60 20";
    }
  };

  const getSparklineFill = (requests: number) => {
    if (requests === 4) {
      return "M 0 10 L 15 10 L 30 10 L 45 10 L 60 10 L 60 20 L 0 20 Z";
    } else if (requests === 1) {
      return "M 0 10 L 15 10 L 30 12 L 45 14 L 60 16 L 60 20 L 0 20 Z";
    } else {
      return "M 0 10 L 15 12 L 30 14 L 45 17 L 60 20 L 60 20 L 0 20 Z";
    }
  };

  // Update failed requests for live metrics
  useEffect(() => {
    if (showLiveMetrics) {
      if (timeElapsed === 10) setFailedRequests(1);
      if (timeElapsed === 14) setFailedRequests(0);
    }
  }, [timeElapsed, showLiveMetrics]);

  useEffect(() => {
    // Simulate time progression
    const timer = setInterval(() => {
      setTimeElapsed((prev) => {
        const newTime = prev + 1;
        // Mark as completed after 5 seconds
        if (newTime >= 5 && !isCompleted) {
          setIsCompleted(true);
          // Call onComplete callback after completion
          if (onComplete) {
            setTimeout(() => {
              onComplete();
            }, 1000); // Wait 1 second after completion before triggering
          }
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCompleted, onComplete]);

  useEffect(() => {
    // Progress through steps until completed
    if (!isCompleted && currentStep < steps.length - 1) {
      const stepTimer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 2000); // Each step takes 2 seconds

      return () => clearTimeout(stepTimer);
    }
  }, [currentStep, steps.length, isCompleted]);

  return (
    <div className={styles.progressCard}>
      <div className={styles.agentHeader}>
        <div className={styles.agentTitle}>
          {title || `Deploying ${serviceName}`}
        </div>
        <a className={styles.viewLink}>
          <span>View in activity</span>
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

      <div className={styles.agentDescription}>
        Assigned to{" "}
        <img src={agentIcon} alt="" className={styles.agentInlineIcon} />
        {agentName}
      </div>

      <div
        className={
          showLiveMetrics ? styles.statsGridFiveColumns : styles.statsGrid
        }
      >
        <div className={styles.statItem}>
          <div className={styles.statLabel}>Time elapsed</div>
          <div className={styles.statValue}>
            {isCompleted
              ? "3m"
              : initialTimeElapsed > 0
                ? `${timeElapsed}s`
                : `${timeElapsed} seconds`}
          </div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statLabel}>
            {isCompleted
              ? "Artifacts created"
              : estTimeRemaining
                ? "Est. time remaining"
                : "Time to completion"}
          </div>
          <div className={styles.statValue}>
            {isCompleted ? "1" : estTimeRemaining || "4–8 minutes"}
          </div>
        </div>
        {showLiveMetrics ? (
          <>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Target resource</div>
              <div className={styles.statValue}>{targetResource || "N/A"}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Failed requests</div>
              <div className={styles.statValueWithSparkline}>
                <span>{failedRequests}</span>
                <svg
                  className={styles.sparkline}
                  viewBox="0 0 60 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d={getSparklinePath(failedRequests)}
                    // eslint-disable-next-line no-restricted-syntax
                    stroke="#0078d4"
                    strokeWidth="2"
                    fill="none"
                    className={styles.sparklineTransition}
                  />
                  <path
                    d={getSparklineFill(failedRequests)}
                    // eslint-disable-next-line no-restricted-syntax
                    fill="#0078d4"
                    opacity="0.2"
                    className={styles.sparklineTransition}
                  />
                </svg>
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Cost to use</div>
              <div className={styles.statValue}>{costToUse || "Free"}</div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>
                {artifactsCreated !== undefined
                  ? "Artifacts created"
                  : "Accuracy rate"}
              </div>
              <div className={styles.statValue}>
                {artifactsCreated !== undefined ? artifactsCreated : "100%"}
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Cost to use</div>
              <div className={styles.statValue}>{costToUse || "Free"}</div>
            </div>
          </>
        )}
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressLabel}>
          {isCompleted ? "Completed" : "In progress"}
        </div>
        <div className={isCompleted ? styles.completedBox : styles.progressBox}>
          {!isCompleted ? (
            <div className={styles.step}>
              <div className={styles.loadingSpinner}></div>
              <span>{steps[currentStep]}</span>
            </div>
          ) : (
            <div className={styles.step}>
              <Checkmark20Filled
                className={`${styles.stepIcon} ${styles.iconCompleted}`}
              />
              <span>All steps completed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
