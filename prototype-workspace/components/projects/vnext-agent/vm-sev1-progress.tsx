/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Send16Regular, Checkmark20Filled } from "@fluentui/react-icons";
import { useState, useEffect } from "react";

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
  checkmarkGreen: {
    color: tokens.colorPaletteGreenForeground1,
  },
  sparklineTransition: {
    transition: "d 0.5s ease-out",
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
  statValueWithSparkline: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  sparkline: {
    width: "60px",
    height: "20px",
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
});

interface VMSev1ProgressProps {
  onComplete: () => void;
}

export default function VMSev1Progress({ onComplete }: VMSev1ProgressProps) {
  const styles = useStyles();
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [failedRequests, setFailedRequests] = useState(4);

  const steps = [
    "Updating NSG rule with a new Wildcard destination prefix",
    "Marking issue as resolved in ADO",
    "Documenting the change in ServiceNow",
    "Validating resolution",
  ];

  useEffect(() => {
    // Simulate time progression
    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // At 4 seconds, drop the failed requests from 4 to 1
    if (timeElapsed === 4) {
      setFailedRequests(1);
    }
    // At 12 seconds (completion), drop to 0
    if (timeElapsed === 12) {
      setFailedRequests(0);
    }
  }, [timeElapsed]);

  useEffect(() => {
    // Progress through steps every 3 seconds (12 seconds total for 4 steps)
    if (currentStep < steps.length) {
      const stepTimer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 3000);

      return () => clearTimeout(stepTimer);
    } else {
      // Complete after all steps, wait 3 more seconds (15 total) before navigating
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 3000);
      return () => clearTimeout(completeTimer);
    }
  }, [currentStep, steps.length, onComplete]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        VM Operator is working on correcting the Sev1 alert. I'll send an update
        when it's complete, or you can{" "}
        <span className={styles.link}>
          view more details in the agent summary
        </span>
        .
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
              <path
                d="M6.5 3L11.5 8L6.5 13"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </a>
        </div>

        <div className={styles.currentTask}>
          {currentStep < steps.length ? (
            <div className={styles.loadingSpinner}></div>
          ) : (
            <Checkmark20Filled className={styles.checkmarkGreen} />
          )}
          <span>
            {currentStep < steps.length
              ? steps[currentStep]
              : "Resolution complete"}
          </span>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Time elapsed</div>
            <div className={styles.statValue}>{timeElapsed} seconds</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Est. time remaining</div>
            <div className={styles.statValue}>56 minutes</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Target resource</div>
            <div className={styles.statValue}>stock-vm-westus</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statLabel}>Failed requests (live)</div>
            <div className={styles.statValueWithSparkline}>
              <svg
                className={styles.sparkline}
                viewBox="0 0 60 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Sparkline - line chart showing trend */}
                <path
                  d={
                    failedRequests === 0
                      ? "M 0 10 L 15 10 L 30 10 L 45 15 L 60 20"
                      : failedRequests === 1
                        ? "M 0 10 L 15 10 L 30 10 L 45 10 L 60 15"
                        : "M 0 10 L 15 10 L 30 10 L 45 10 L 60 10"
                  }
                  stroke="#0078d4"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.sparklineTransition}
                />
                {/* Area fill under the line */}
                <path
                  d={
                    failedRequests === 0
                      ? "M 0 10 L 15 10 L 30 10 L 45 15 L 60 20 L 60 20 L 0 20 Z"
                      : failedRequests === 1
                        ? "M 0 10 L 15 10 L 30 10 L 45 10 L 60 15 L 60 20 L 0 20 Z"
                        : "M 0 10 L 15 10 L 30 10 L 45 10 L 60 10 L 60 20 L 0 20 Z"
                  }
                  fill="#0078d4"
                  opacity="0.2"
                  className={styles.sparklineTransition}
                />
              </svg>
              <span className={styles.statValue}>{failedRequests}/minute</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.promptsSection}>
        <div className={styles.promptsTitle}>
          What can I help you with next?
        </div>
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
  );
}
