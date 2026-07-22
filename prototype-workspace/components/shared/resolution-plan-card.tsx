"use client";

import { makeStyles, tokens as fluentTokens, shorthands } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Send16Regular,
  ChevronRight20Regular,
  Copy24Regular,
} from "@fluentui/react-icons";
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
    marginBottom: "8px",
  },
  planSubtitle: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
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
    gap: "12px",
    marginBottom: "24px",
  },
  stepItem: {
    cursor: "pointer",
  },
  stepHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
  },
  stepIcon: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    height: "20px",
    color: tokens.colorNeutralForeground2,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    lineHeight: "20px",
  },
  stepDetails: {
    marginTop: "12px",
    paddingTop: "12px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  stepDescription: {
    fontSize: "13px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground1,
    marginBottom: "12px",
  },
  cliContainer: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius("8px"),
    ...shorthands.padding("16px"),
    position: "relative",
  },
  cliHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  cliLabel: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightRegular,
  },
  copyButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    ...shorthands.borderRadius("4px"),
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  cliCommand: {
    fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
    fontSize: "13px",
    lineHeight: "20px",
    color: tokens.colorPaletteBerryForeground1,
    wordBreak: "break-all",
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
  iconSmall: {
    width: "16px",
    height: "16px",
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
});

interface ResolutionPlanCardProps {
  onApprove?: () => void;
  onCancel?: () => void;
  onAddNotes?: () => void;
}

/** Displays an agent-generated resolution plan with expandable steps, CLI commands, notes input, and approve/action buttons.
 * Composed from: makeStyles card, ChevronRight20Regular, Copy24Regular, Send16Regular action buttons.
 * Instead of: building inline incident resolution plan UI with collapsible step details. */
export function ResolutionPlanCard({
  onApprove,
  onCancel,
  onAddNotes,
}: ResolutionPlanCardProps) {
  const styles = useStyles();
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const steps = [
    "Update NSG rule with a new Wildcard destination prefix",
    "Mark issue as resolved in ADO",
    "Document the change in ServiceNow",
  ];

  return (
    <div className={styles.planCard}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.planTitle}>Resolution plan: Change NSG rule</div>
        <div className={styles.planSubtitle}>
          Generated by
          <img
            src="/icons/AgentsColor.svg"
            alt=""
            className={styles.iconSmall}
          />
          VM Operator
        </div>
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
      </div>

      {/* Content Section */}
      <div className={styles.contentSection}>
        {/* Steps List */}
        <div className={styles.stepsList}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepItem}>
              <div
                className={styles.stepHeader}
                onClick={() =>
                  setExpandedStep(expandedStep === index ? null : index)
                }
              >
                <div className={styles.stepIcon}>
                  <ChevronRight20Regular />
                </div>
                <div className={styles.stepContent}>
                  <div className={styles.stepTitle}>{step}</div>
                </div>
              </div>

              {expandedStep === index && index === 0 && (
                <div className={styles.stepDetails}>
                  <div className={styles.stepDescription}>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur.
                  </div>

                  <div className={styles.cliContainer}>
                    <div className={styles.cliHeader}>
                      <span className={styles.cliLabel}>CLI command</span>
                      <button
                        className={styles.copyButton}
                        aria-label="Copy CLI command"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(
                            "az network nsg rule update -g stock-vm-westus --nsg-name",
                          );
                        }}
                      >
                        <Copy24Regular className={styles.iconSmall} />
                      </button>
                    </div>
                    <div className={styles.cliCommand}>
                      az network nsg rule update -g stock-vm-westus --nsg-name
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Notes Section */}
        <div className={styles.notesSection}>
          <label className={styles.notesLabel}>
            Add custom notes and requirements
          </label>
          <input
            type="text"
            className={styles.notesInput}
            placeholder="Focus on..."
          />
          <span className={styles.notesHint}>
            I'll use any additional notes you leave here to inform my
            decision-making.
          </span>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button className={styles.primaryButton} onClick={onApprove}>
            <span>Approve and start</span>
            <Send16Regular />
          </button>
          <button className={styles.secondaryButton} onClick={onCancel}>
            <span>Lorem ipsum dolor set amet</span>
            <Send16Regular />
          </button>
          <button className={styles.secondaryButton} onClick={onAddNotes}>
            <span>Lorem ipsum dolor set amet</span>
            <Send16Regular />
          </button>
        </div>
      </div>
    </div>
  );
}
