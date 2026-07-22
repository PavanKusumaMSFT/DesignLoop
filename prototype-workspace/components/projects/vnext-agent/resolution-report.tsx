/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client"

import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components"


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Send16Regular, ArrowUpRight16Regular } from "@fluentui/react-icons"

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
  resolutionText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.6",
    marginBottom: "8px",
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
  },
  checkmark: {
    color: tokens.colorPaletteGreenForeground1,
    fontSize: "20px",
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
  link: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
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
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  expandIcon: {
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
})

interface ResolutionReportProps {
  onPromptClick: (prompt: string) => void
}

/** Post-resolution summary report showing completed steps, actions taken, an embedded trend chart, and next-step buttons.
 * Cross-project reusable: can be imported by any project. */
export default function ResolutionReport({ onPromptClick }: ResolutionReportProps) {
  const styles = useStyles()

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        Connectivity to BackendVM4 has been successfully restored! We'll continue monitoring it to ensure the fix remains effective.
      </h2>
      
      <div className={styles.summaryCard}>
        <div className={styles.cardHeader}>
          <div>
            <div className={styles.cardTitle}>Resolution report: Change NSG rule</div>
            <div className={styles.cardSubtitle}>Summary by VM Operator</div>
          </div>
          <a className={styles.viewLink}>
            <span>View activity log</span>
            <ArrowUpRight16Regular />
          </a>
        </div>
        
        <div className={styles.summaryContent}>
          <div className={styles.leftSection}>
            <div className={styles.resolutionText}>
              <span className={styles.checkmark}>✓</span>
              <span>By removing the NSG rule SecurityTeamHTTPBlock, outbound connectivity was restored on port 80.</span>
            </div>
            
            <ul className={styles.bulletList}>
              <li className={styles.bulletItem}>
                After connectivity was restored, incoming failed requests to BackendVM4 decreased by 96% into a healthy range.
              </li>
              <li className={styles.bulletItem}>
                Marked the Sev1 alert as resolved after verifying system stability and normal traffic flow.
              </li>
              <li className={styles.bulletItem}>
                Notified <a className={styles.link}>@Charlotte Walston</a> of the change and its performance impact.
              </li>
              <li className={styles.bulletItem}>
                Logged the update in ServiceNow with notes on the rule change and resolution steps.
              </li>
            </ul>
          </div>
          
          <div className={styles.chartSection}>
            <div className={styles.chartContainer}>
              <div className={styles.chartHeader}>
                <span className={styles.chartTitle}>Failed requests</span>
                <svg className={styles.expandIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 2H14V6M14 2L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 14H2V10M2 14L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.chartPlaceholder}>
                <svg width="270" height="170" viewBox="0 0 270 170" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Grid lines */}
                  <line x1="40" y1="130" x2="230" y2="130" stroke={tokens.colorNeutralStroke1} strokeWidth="1" />
                  <line x1="40" y1="106" x2="230" y2="106" stroke={tokens.colorNeutralStroke1} strokeWidth="1" />
                  <line x1="40" y1="82" x2="230" y2="82" stroke={tokens.colorNeutralStroke1} strokeWidth="1" />
                  <line x1="40" y1="58" x2="230" y2="58" stroke={tokens.colorNeutralStroke1} strokeWidth="1" />
                  <line x1="40" y1="34" x2="230" y2="34" stroke={tokens.colorNeutralStroke1} strokeWidth="1" />
                  <line x1="40" y1="10" x2="230" y2="10" stroke={tokens.colorNeutralStroke1} strokeWidth="1" />
                  
                  {/* Y-axis labels */}
                  <text x="35" y="134" fontSize="11" fill={tokens.colorNeutralForeground3} textAnchor="end">0</text>
                  <text x="35" y="110" fontSize="11" fill={tokens.colorNeutralForeground3} textAnchor="end">20</text>
                  <text x="35" y="86" fontSize="11" fill={tokens.colorNeutralForeground3} textAnchor="end">40</text>
                  <text x="35" y="62" fontSize="11" fill={tokens.colorNeutralForeground3} textAnchor="end">60</text>
                  <text x="35" y="38" fontSize="11" fill={tokens.colorNeutralForeground3} textAnchor="end">80</text>
                  <text x="35" y="14" fontSize="11" fill={tokens.colorNeutralForeground3} textAnchor="end">100</text>
                  
                  {/* X-axis labels */}
                  <text x="45" y="148" fontSize="9" fill={tokens.colorNeutralForeground3} textAnchor="start">12:15 PM</text>
                  <text x="105" y="148" fontSize="9" fill={tokens.colorNeutralForeground3} textAnchor="middle">12:30 PM</text>
                  <text x="165" y="148" fontSize="9" fill={tokens.colorNeutralForeground3} textAnchor="middle">12:45 PM</text>
                  <text x="225" y="148" fontSize="9" fill={tokens.colorNeutralForeground3} textAnchor="end">1:30 PM</text>
                  
                  {/* Line - showing drop after resolution */}
                  <path d="M45 30 Q55 28 65 26 T85 24 Q95 26 105 28 T125 30 Q145 32 165 70 T185 120 Q195 125 205 128 T225 128" 
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
          <button className={styles.actionButton} onClick={() => onPromptClick("Create an incident report")}>
            <span>Create an incident report</span>
            <Send16Regular />
          </button>
          <button className={styles.actionButton} onClick={() => onPromptClick("What are the next steps?")}>
            <span>What are the next steps?</span>
            <Send16Regular />
          </button>
          <button className={styles.actionButton} onClick={() => onPromptClick("Always apply this fix automatically in the future")}>
            <span>Always apply this fix automatically in the future</span>
            <Send16Regular />
          </button>
        </div>
      </div>
    </div>
  )
}
