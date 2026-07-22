"use client";

import { makeStyles, tokens as fluentTokens, shorthands } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Send16Regular, Open16Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  reportCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "18px",
    ...shorthands.padding("20px"),
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
    marginTop: "16px",
    marginBottom: "16px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  cardTitleSection: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
  },
  cardSubtitle: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "18px",
    display: "flex",
    alignItems: "center",
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
  summaryContent: {
    display: "flex",
    gap: "24px",
    marginTop: "0px",
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.padding("20px"),
    borderRadius: "8px",
  },
  leftSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  resolutionText: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.6",
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
  },
  checkmark: {
    color: tokens.colorPaletteGreenForeground1,
    fontSize: "16px",
    flexShrink: 0,
    marginTop: "2px",
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
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.5",
    paddingLeft: "16px",
    position: "relative",
    "::before": {
      content: '"•"',
      position: "absolute",
      left: "4px",
      color: tokens.colorNeutralForeground3,
    },
  },
  link: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
  },
  chartSection: {
    width: "280px",
    flexShrink: 0,
  },
  chartContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    ...shorthands.padding("16px"),
    height: "220px",
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
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  expandIcon: {
    color: tokens.colorNeutralForeground3,
    cursor: "pointer",
  },
  actions: {
    display: "flex",
    gap: "8px",
    marginTop: "12px",
    flexWrap: "wrap",
  },
  actionButton: {
    borderRadius: "20px",
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.padding("6px", "16px"),
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.12)",
      transform: "translateY(-1px)",
    },
  },
  summaryIcon: {
    width: "16px",
    height: "16px",
    verticalAlign: "middle",
    marginLeft: "8px",
    marginRight: "4px",
  },
});

interface ResolutionReportCardProps {
  onAction?: (action: string) => void;
}

/** Renders a post-resolution summary report with checkmark findings, bullet-point details, failed-requests chart, and action buttons.
 * Composed from: makeStyles card, Open16Regular, Send16Regular, inline SVG chart.
 * Instead of: building inline resolution summary UI with chart and follow-up actions. */
export default function ResolutionReportCard({
  onAction,
}: ResolutionReportCardProps) {
  const styles = useStyles();

  return (
    <div className={styles.reportCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleSection}>
          <div className={styles.cardTitle}>
            Resolution report: Change NSG rule
          </div>
          <div className={styles.cardSubtitle}>
            Summary by{" "}
            <img
              src="/icons/AgentsColor.svg"
              alt=""
              className={styles.summaryIcon}
            />
            VM Operator
          </div>
        </div>
        <a className={styles.viewLink}>
          <span>View activity log</span>
          <Open16Regular />
        </a>
      </div>

      <div className={styles.summaryContent}>
        <div className={styles.leftSection}>
          <div className={styles.resolutionText}>
            <span className={styles.checkmark}>✓</span>
            <span>
              By removing the NSG rule SecurityTeamHTTPBlock, outbound
              connectivity was restored on port 80.
            </span>
          </div>

          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>
              After connectivity was restored, incoming failed requests to
              BackendVM4 decreased by 96% into a healthy range.
            </li>
            <li className={styles.bulletItem}>
              Marked the Sev1 alert as resolved after verifying system stability
              and normal traffic flow.
            </li>
            <li className={styles.bulletItem}>
              Notified <a className={styles.link}>@Charlotte Walston</a> of the
              change and its performance impact.
            </li>
            <li className={styles.bulletItem}>
              Logged the update in ServiceNow with notes on the rule change and
              resolution steps.
            </li>
          </ul>
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
            <svg
              width="240"
              height="160"
              viewBox="0 0 240 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid lines */}
              {/* eslint-disable-next-line no-restricted-syntax */}
              <line
                x1="40"
                y1="120"
                x2="220"
                y2="120"
                stroke={tokens.colorNeutralStroke1}
                strokeWidth="1"
              />
              {/* eslint-disable-next-line no-restricted-syntax */}
              <line
                x1="40"
                y1="96"
                x2="220"
                y2="96"
                stroke={tokens.colorNeutralStroke1}
                strokeWidth="1"
              />
              {/* eslint-disable-next-line no-restricted-syntax */}
              <line
                x1="40"
                y1="72"
                x2="220"
                y2="72"
                stroke={tokens.colorNeutralStroke1}
                strokeWidth="1"
              />
              {/* eslint-disable-next-line no-restricted-syntax */}
              <line
                x1="40"
                y1="48"
                x2="220"
                y2="48"
                stroke={tokens.colorNeutralStroke1}
                strokeWidth="1"
              />
              {/* eslint-disable-next-line no-restricted-syntax */}
              <line
                x1="40"
                y1="24"
                x2="220"
                y2="24"
                stroke={tokens.colorNeutralStroke1}
                strokeWidth="1"
              />

              {/* Y-axis labels */}
              {/* eslint-disable-next-line no-restricted-syntax */}
              <text
                x="35"
                y="124"
                fontSize="10"
                fill={tokens.colorNeutralForeground3}
                textAnchor="end"
              >
                0
              </text>
              {/* eslint-disable-next-line no-restricted-syntax */}
              <text
                x="35"
                y="100"
                fontSize="10"
                fill={tokens.colorNeutralForeground3}
                textAnchor="end"
              >
                20
              </text>
              {/* eslint-disable-next-line no-restricted-syntax */}
              <text
                x="35"
                y="76"
                fontSize="10"
                fill={tokens.colorNeutralForeground3}
                textAnchor="end"
              >
                40
              </text>
              {/* eslint-disable-next-line no-restricted-syntax */}
              <text
                x="35"
                y="52"
                fontSize="10"
                fill={tokens.colorNeutralForeground3}
                textAnchor="end"
              >
                60
              </text>
              {/* eslint-disable-next-line no-restricted-syntax */}
              <text
                x="35"
                y="28"
                fontSize="10"
                fill={tokens.colorNeutralForeground3}
                textAnchor="end"
              >
                80
              </text>

              {/* X-axis labels */}
              {/* eslint-disable-next-line no-restricted-syntax */}
              <text
                x="45"
                y="138"
                fontSize="9"
                fill={tokens.colorNeutralForeground3}
                textAnchor="start"
              >
                12:15
              </text>
              {/* eslint-disable-next-line no-restricted-syntax */}
              <text
                x="105"
                y="138"
                fontSize="9"
                fill={tokens.colorNeutralForeground3}
                textAnchor="middle"
              >
                12:30
              </text>
              {/* eslint-disable-next-line no-restricted-syntax */}
              <text
                x="165"
                y="138"
                fontSize="9"
                fill={tokens.colorNeutralForeground3}
                textAnchor="middle"
              >
                12:45
              </text>
              {/* eslint-disable-next-line no-restricted-syntax */}
              <text
                x="215"
                y="138"
                fontSize="9"
                fill={tokens.colorNeutralForeground3}
                textAnchor="end"
              >
                1:30
              </text>

              {/* Line - showing drop after resolution */}
              {/* eslint-disable no-restricted-syntax */}
              <path
                d="M45 28 Q55 27 65 26 T85 24 Q95 25 105 26 T125 28 Q145 30 165 64 T185 110 Q195 115 205 118 T220 118"
                stroke="#0078D4"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* eslint-enable no-restricted-syntax */}
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.actionButton}
          onClick={() => onAction?.("Create an incident report")}
        >
          <span>Create an incident report</span>
          <Send16Regular />
        </button>
        <button
          className={styles.actionButton}
          onClick={() => onAction?.("What are the next steps?")}
        >
          <span>What are the next steps?</span>
          <Send16Regular />
        </button>
        <button
          className={styles.actionButton}
          onClick={() =>
            onAction?.("Always apply this fix automatically in the future")
          }
        >
          <span>Always apply this fix automatically in the future</span>
          <Send16Regular />
        </button>
      </div>
    </div>
  );
}
