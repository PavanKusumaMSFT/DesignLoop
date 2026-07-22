import React from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  shorthands,
  Text,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Lightbulb20Regular,
  Open16Regular,
  Send16Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("24px"),
    width: "100%",
  },
  summaryCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius("18px"),
    ...shorthands.padding("20px"),
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("12px"),
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("4px"),
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightRegular,
    lineHeight: "28px",
    color: tokens.colorNeutralForeground1,
  },
  cardSubtitle: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightRegular,
    lineHeight: "18px",
    color: tokens.colorNeutralForeground2,
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
  viewLink: {
    fontSize: "13px",
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("4px"),
  },
  summaryContent: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("12px"),
  },
  contentContainer: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.borderRadius("8px"),
    ...shorthands.padding("20px"),
    display: "flex",
    ...shorthands.gap("24px"),
  },
  leftSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("12px"),
  },
  findingsText: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightRegular,
    lineHeight: "20px",
    color: tokens.colorNeutralForeground1,
  },
  findingLabel: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  workItemChip: {
    display: "inline-flex",
    alignItems: "center",
    ...shorthands.gap("8px"),
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke1),
    ...shorthands.borderRadius("16px"),
    ...shorthands.padding("6px", "12px"),
    fontSize: "13px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    marginTop: "8px",
    cursor: "pointer",
    transition: "all 0.15s ease",
    ":hover": {
      backgroundColor: tokens.colorNeutralStroke1,
    },
  },
  workItemIcon: {
    width: "16px",
    height: "16px",
    color: tokens.colorBrandForeground1,
  },
  proposedSection: {
    backgroundColor: "rgba(0, 120, 212, 0.05)",
    ...shorthands.borderRadius("8px"),
    ...shorthands.padding("16px"),
    marginTop: "8px",
  },
  proposedTitle: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "20px",
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("6px"),
  },
  proposedText: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightRegular,
    lineHeight: "20px",
    color: tokens.colorNeutralForeground1,
  },
  chartSection: {
    width: "240px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("8px"),
  },
  chartContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius("8px"),
    ...shorthands.padding("12px"),
    height: "180px",
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("8px"),
    border: "1px solid #f0f0f0",
  },
  chartHeader: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "18px",
    color: tokens.colorNeutralForeground1,
  },
  actions: {
    display: "flex",
    ...shorthands.gap("8px"),
    marginTop: "12px",
    paddingTop: "12px",
    ...shorthands.borderTop("1px", "solid", tokens.colorNeutralStroke2),
  },
  primaryButton: {
    ...shorthands.borderRadius("20px"),
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    ...shorthands.border("none"),
    ...shorthands.padding("6px", "12px"),
    fontSize: "13px",
    fontWeight: tokens.fontWeightRegular,
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    display: "inline-flex",
    alignItems: "center",
    ...shorthands.gap("8px"),
    whiteSpace: "nowrap",
    fontFamily: tokens.fontFamilyBase,
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
      transform: "translateY(-1px)",
    },
  },
  secondaryButton: {
    ...shorthands.borderRadius("20px"),
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding("6px", "12px"),
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    display: "inline-flex",
    alignItems: "center",
    ...shorthands.gap("8px"),
    whiteSpace: "nowrap",
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightRegular,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
      transform: "translateY(-1px)",
    },
  },
  agentIcon: {
    width: "16px",
    height: "16px",
    verticalAlign: "middle",
    marginLeft: "8px",
    marginRight: "4px",
  },
  devOpsIcon: {
    width: "16px",
    height: "16px",
  },
  openIcon: {
    marginLeft: "auto",
    color: tokens.colorNeutralForeground3,
  },
  mentionLink: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    fontWeight: tokens.fontWeightSemibold,
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
  },
});

export interface IncidentInvestigationCardProps {
  onActionClick?: (action: string) => void;
}

/** Copilot investigation summary card showing diagnostic findings, root cause analysis,
 * a failed-requests chart, and a proposed solution with action buttons.
 * Composed from: styled card sections, inline SVG chart, and action buttons.
 * Instead of: building inline diagnostic summaries in agent chat responses. */
export function IncidentInvestigationCard({
  onActionClick,
}: IncidentInvestigationCardProps) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.summaryCard}>
        <div className={styles.cardHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.cardTitle}>Summary of findings</div>
            <div className={styles.cardSubtitle}>
              Generated by{" "}
              <img
                src="/icons/AgentsColor.svg"
                alt=""
                className={styles.agentIcon}
              />
              VM Operator
            </div>
          </div>
          <a
            className={styles.viewLink}
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            View in activity
          </a>
        </div>

        <div className={styles.summaryContent}>
          <div className={styles.contentContainer}>
            <div className={styles.leftSection}>
              <div className={styles.findingsText}>
                <span className={styles.findingLabel}>Diagnostics:</span> 90% of
                failures were routed to <strong>BackendVM4</strong>.
              </div>

              <div className={styles.findingsText}>
                <span className={styles.findingLabel}>Issue:</span> Failures
                linked to denied Traffic Analytics flows on{" "}
                <strong>port 80</strong>.
              </div>

              <div className={styles.findingsText}>
                <span className={styles.findingLabel}>Root Cause:</span> Blocked
                port traced to the <strong>SecurityTeamHTTPBlock</strong> rule.
              </div>

              <div className={styles.findingsText}>
                <span className={styles.findingLabel}>Change History:</span>{" "}
                Rule added by{" "}
                <a
                  href="#"
                  className={styles.mentionLink}
                  onClick={(e) => e.preventDefault()}
                >
                  @Charlotte Walston
                </a>{" "}
                two hours ago:
              </div>

              <div className={styles.workItemChip}>
                <img
                  src="/icons/Azure-DevOps.svg"
                  alt=""
                  className={styles.devOpsIcon}
                />
                <span>Block port 80 on all non-prod environments</span>
                <Open16Regular className={styles.openIcon} />
              </div>
            </div>

            <div className={styles.chartSection}>
              <div className={styles.chartContainer}>
                <div className={styles.chartHeader}>Failed requests</div>
                <svg width="220" height="160" viewBox="0 0 220 160">
                  <defs>
                    <style>
                      {`
                        @keyframes drawLine {
                          from {
                            stroke-dashoffset: 500;
                          }
                          to {
                            stroke-dashoffset: 0;
                          }
                        }
                        .animated-line {
                          stroke-dasharray: 500;
                          stroke-dashoffset: 500;
                          animation: drawLine 2s ease-out forwards;
                        }
                      `}
                    </style>
                  </defs>

                  {/* Grid lines */}
                  <line
                    x1="35"
                    y1="130"
                    x2="185"
                    y2="130"
                    // eslint-disable-next-line no-restricted-syntax
                    stroke={tokens.colorNeutralStroke1}
                    strokeWidth="1"
                  />
                  <line
                    x1="35"
                    y1="104"
                    x2="185"
                    y2="104"
                    // eslint-disable-next-line no-restricted-syntax
                    stroke={tokens.colorNeutralStroke1}
                    strokeWidth="1"
                  />
                  <line
                    x1="35"
                    y1="78"
                    x2="185"
                    y2="78"
                    // eslint-disable-next-line no-restricted-syntax
                    stroke={tokens.colorNeutralStroke1}
                    strokeWidth="1"
                  />
                  <line
                    x1="35"
                    y1="52"
                    x2="185"
                    y2="52"
                    // eslint-disable-next-line no-restricted-syntax
                    stroke={tokens.colorNeutralStroke1}
                    strokeWidth="1"
                  />
                  <line
                    x1="35"
                    y1="26"
                    x2="185"
                    y2="26"
                    // eslint-disable-next-line no-restricted-syntax
                    stroke={tokens.colorNeutralStroke1}
                    strokeWidth="1"
                  />

                  {/* Y-axis labels */}
                  <text
                    x="30"
                    y="134"
                    fontSize="10"
                    // eslint-disable-next-line no-restricted-syntax
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="end"
                  >
                    0
                  </text>
                  <text
                    x="30"
                    y="108"
                    fontSize="10"
                    // eslint-disable-next-line no-restricted-syntax
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="end"
                  >
                    25
                  </text>
                  <text
                    x="30"
                    y="82"
                    fontSize="10"
                    // eslint-disable-next-line no-restricted-syntax
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="end"
                  >
                    50
                  </text>
                  <text
                    x="30"
                    y="56"
                    fontSize="10"
                    // eslint-disable-next-line no-restricted-syntax
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="end"
                  >
                    75
                  </text>
                  <text
                    x="30"
                    y="30"
                    fontSize="10"
                    // eslint-disable-next-line no-restricted-syntax
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="end"
                  >
                    100
                  </text>

                  {/* X-axis labels */}
                  <text
                    x="40"
                    y="146"
                    fontSize="8"
                    // eslint-disable-next-line no-restricted-syntax
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="start"
                  >
                    11:15
                  </text>
                  <text
                    x="85"
                    y="146"
                    fontSize="8"
                    // eslint-disable-next-line no-restricted-syntax
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="middle"
                  >
                    11:30
                  </text>
                  <text
                    x="130"
                    y="146"
                    fontSize="8"
                    // eslint-disable-next-line no-restricted-syntax
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="middle"
                  >
                    11:45
                  </text>
                  <text
                    x="180"
                    y="146"
                    fontSize="8"
                    // eslint-disable-next-line no-restricted-syntax
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="end"
                  >
                    12:30
                  </text>

                  {/* Line - smooth curve with animation */}
                  <path
                    className="animated-line"
                    d="M40 130 Q44 126 48 120 T56 110 Q60 106 64 103 T72 97 Q76 94 80 92 T88 88 Q92 86 96 84 T104 78 Q112 72 120 67 T136 57 Q144 52 152 45 T168 35 Q175 30 178 26 T185 20"
                    // eslint-disable-next-line no-restricted-syntax
                    stroke="#0078d4"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.proposedSection}>
          <div className={styles.proposedTitle}>
            <Lightbulb20Regular /> Proposed solution
          </div>
          <div className={styles.proposedText}>
            With your approval, I can remove or modify the SecurityTeamHTTPBlock
            rule to allow HTTP traffic on port 80 for BackendVM4. This will
            restore normal operations and prevent further service impact.
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.secondaryButton}
            onClick={() => onActionClick?.("Show me the resolution plan")}
          >
            <span>Show me the resolution plan</span>
            <Send16Regular />
          </button>
          <button
            className={styles.secondaryButton}
            onClick={() => onActionClick?.("Lorem ipsum dolor set amet")}
          >
            <span>Lorem ipsum dolor set amet</span>
            <Send16Regular />
          </button>
        </div>
      </div>
    </div>
  );
}
