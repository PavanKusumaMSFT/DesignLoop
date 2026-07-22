/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Send16Regular, ArrowUpRight16Regular } from "@fluentui/react-icons";

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
  summaryCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
    marginBottom: "40px",
    maxWidth: "900px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  cardTitle: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    lineHeight: "100%",
  },
  cardSubtitle: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground3,
  },
  viewLink: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    textDecoration: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    ":hover": {
      color: tokens.colorNeutralForeground1,
      textDecoration: "underline",
    },
  },
  summaryContent: {
    display: "flex",
    gap: "24px",
    marginTop: "16px",
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "24px",
    borderRadius: "8px",
  },
  leftSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  investigationText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.6",
    marginBottom: "8px",
  },
  bulletList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  bulletItem: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.5",
    paddingLeft: "20px",
    position: "relative",
    "::before": {
      content: '"•"',
      position: "absolute",
      left: "8px",
      color: tokens.colorNeutralForeground3,
    },
  },
  adoItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "6px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    marginTop: "8px",
  },
  adoIcon: {
    width: "16px",
    height: "16px",
    color: tokens.colorBrandForeground1,
  },
  adoLink: {
    color: tokens.colorNeutralForeground2,
    textDecoration: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginLeft: "auto",
    ":hover": {
      color: tokens.colorNeutralForeground1,
      textDecoration: "underline",
    },
  },
  adoItemLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  approvalText: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.5",
    marginTop: "16px",
  },
  chartSection: {
    width: "310px",
    flexShrink: 0,
  },
  chartContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "16px",
    height: "240px",
    display: "flex",
    flexDirection: "column",
  },
  chartHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  chartTitle: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
  },
  expandIcon: {
    width: "16px",
    height: "16px",
    color: tokens.colorNeutralForeground3,
    cursor: "pointer",
  },
  chartPlaceholder: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForeground3,
    fontSize: "12px",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "24px",
    flexWrap: "wrap",
  },
  actionButton: {
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
  mentionLink: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
  },
});

interface InvestigationSummaryProps {
  onPromptClick: (prompt: string) => void;
}

export default function InvestigationSummary({
  onPromptClick,
}: InvestigationSummaryProps) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        The VM Operator agent investigated the Sev1 alert on BackendVM4. Here's
        a summary of the steps it followed to pinpoint the issue:
      </h2>

      <div className={styles.summaryCard}>
        <div className={styles.cardHeader}>
          <div>
            <div className={styles.cardTitle}>
              Investigation summary: Sev1 alert on BackendVM4
            </div>
            <div className={styles.cardSubtitle}>Summary by VM Operator</div>
          </div>
          <a className={styles.viewLink}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8.5V12.5C12 13.0523 11.5523 13.5 11 13.5H3.5C2.94772 13.5 2.5 13.0523 2.5 12.5V5C2.5 4.44772 2.94772 4 3.5 4H7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M10 2.5H13.5V6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.5 2.5L8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span>View activity log</span>
          </a>
        </div>

        <div className={styles.summaryContent}>
          <div className={styles.leftSection}>
            <div className={styles.investigationText}>
              🔍 I investigated a Sev1 alert that was triggered due to a
              significant increase in failed requests in the contoso-AI-app.
            </div>

            <ul className={styles.bulletList}>
              <li className={styles.bulletItem}>
                Diagnostics revealed that 90% of failures were routed to
                BackendVM4.
              </li>
              <li className={styles.bulletItem}>
                These failures were linked to canned Traffic-Analytics flows on
                port 80.
              </li>
              <li className={styles.bulletItem}>
                The root cause was a blocked port, traced to the
                SecurityTeamHTTPBlock rule.
              </li>
              <li className={styles.bulletItem}>
                The rule was added by{" "}
                <a className={styles.mentionLink}>@Charlotte Walston</a> two
                hours earlier:
              </li>
            </ul>

            <div className={styles.adoItem}>
              <svg
                className={styles.adoIcon}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 2L2 5v6l6 3 6-3V5l-6-3z" />
              </svg>
              <span>Block port 80 on all non-prod environments</span>
              <span className={styles.adoItemLabel}>ADO item 31245</span>
              <a className={styles.adoLink}>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8.5V12.5C12 13.0523 11.5523 13.5 11 13.5H3.5C2.94772 13.5 2.5 13.0523 2.5 12.5V5C2.5 4.44772 2.94772 4 3.5 4H7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 2.5H13.5V6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.5 2.5L8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </a>
            </div>

            <div className={styles.approvalText}>
              With your approval, I can resolve the alert by modifying the new
              NSG rule using a CLI command.
            </div>
          </div>

          <div className={styles.chartSection}>
            <div className={styles.chartContainer}>
              <div className={styles.chartHeader}>
                <span className={styles.chartTitle}>Failed requests</span>
                <svg
                  className={styles.expandIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M10 2H14V6M14 2L8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 14H2V10M2 14L8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.chartPlaceholder}>
                <svg
                  width="270"
                  height="170"
                  viewBox="0 0 270 170"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    x1="40"
                    y1="130"
                    x2="230"
                    y2="130"
                    stroke={tokens.colorNeutralStroke1}
                    strokeWidth="1"
                  />
                  <line
                    x1="40"
                    y1="106"
                    x2="230"
                    y2="106"
                    stroke={tokens.colorNeutralStroke1}
                    strokeWidth="1"
                  />
                  <line
                    x1="40"
                    y1="82"
                    x2="230"
                    y2="82"
                    stroke={tokens.colorNeutralStroke1}
                    strokeWidth="1"
                  />
                  <line
                    x1="40"
                    y1="58"
                    x2="230"
                    y2="58"
                    stroke={tokens.colorNeutralStroke1}
                    strokeWidth="1"
                  />
                  <line
                    x1="40"
                    y1="34"
                    x2="230"
                    y2="34"
                    stroke={tokens.colorNeutralStroke1}
                    strokeWidth="1"
                  />
                  <line
                    x1="40"
                    y1="10"
                    x2="230"
                    y2="10"
                    stroke={tokens.colorNeutralStroke1}
                    strokeWidth="1"
                  />

                  {/* Y-axis labels */}
                  <text
                    x="35"
                    y="134"
                    fontSize="11"
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="end"
                  >
                    0
                  </text>
                  <text
                    x="35"
                    y="110"
                    fontSize="11"
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="end"
                  >
                    20
                  </text>
                  <text
                    x="35"
                    y="86"
                    fontSize="11"
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="end"
                  >
                    40
                  </text>
                  <text
                    x="35"
                    y="62"
                    fontSize="11"
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="end"
                  >
                    60
                  </text>
                  <text
                    x="35"
                    y="38"
                    fontSize="11"
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="end"
                  >
                    80
                  </text>
                  <text
                    x="35"
                    y="14"
                    fontSize="11"
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="end"
                  >
                    100
                  </text>

                  {/* X-axis labels - simplified */}
                  <text
                    x="45"
                    y="148"
                    fontSize="9"
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="start"
                  >
                    11:15 AM
                  </text>
                  <text
                    x="105"
                    y="148"
                    fontSize="9"
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="middle"
                  >
                    11:30 AM
                  </text>
                  <text
                    x="165"
                    y="148"
                    fontSize="9"
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="middle"
                  >
                    11:45 AM
                  </text>
                  <text
                    x="225"
                    y="148"
                    fontSize="9"
                    fill={tokens.colorNeutralForeground3}
                    textAnchor="end"
                  >
                    12:30 PM
                  </text>

                  {/* Line - smooth curve with animation matching mockup */}
                  <path
                    className="animated-line"
                    d="M45 130 Q50 125 55 118 T65 108 Q70 103 75 100 T85 95 Q90 92 95 90 T105 88 Q110 87 115 84 T125 78 Q135 72 145 68 T165 60 Q175 56 185 50 T205 42 Q215 38 220 32 T230 25"
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

        <div className={styles.actions}>
          <button
            className={styles.actionButton}
            onClick={() => onPromptClick("Resolve the Sev1 alert for me")}
          >
            <span>Resolve the Sev1 alert for me</span>
            <Send16Regular />
          </button>
          <button
            className={styles.actionButton}
            onClick={() =>
              onPromptClick("What is the scope of the investigation?")
            }
          >
            <span>What is the scope of the investigation?</span>
            <Send16Regular />
          </button>
          <button
            className={styles.actionButton}
            onClick={() =>
              onPromptClick("Tell me how to run the recommended CLI command")
            }
          >
            <span>Tell me how to run the recommended CLI command</span>
            <Send16Regular />
          </button>
          <button
            className={styles.actionButton}
            onClick={() =>
              onPromptClick("Explain the root cause in more detail")
            }
          >
            <span>Explain the root cause in more detail</span>
            <Send16Regular />
          </button>
        </div>
      </div>
    </div>
  );
}
