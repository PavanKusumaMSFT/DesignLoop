/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client"

import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components"


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Send16Regular, ChevronLeft20Regular, ChevronRight20Regular, ChatSparkle20Regular } from "@fluentui/react-icons"
import { useState } from "react"

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px 20px",
    maxWidth: "900px",
    margin: "0 auto",
    width: "100%",
    minHeight: "calc(100vh - 200px)",
  },
  welcomeText: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "20px",
  },
  mainMessage: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    textAlign: "center",
    marginBottom: "32px",
    lineHeight: "1.4",
    maxWidth: "700px",
  },
  link: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    cursor: "pointer",
    padding: "2px 4px",
    borderRadius: "12px",
    transition: "background-color 0.2s",
    position: "relative",
    backgroundImage: `repeating-linear-gradient(to right, rgba(0, 120, 212, 0.35) 4px, rgba(0, 120, 212, 0.35) 8px, transparent 8px, transparent 10px)`,
    backgroundPosition: "0 calc(100% - 2px)",
    backgroundSize: "100% 3px",
    backgroundRepeat: "no-repeat",
    ":hover": {
      backgroundColor: "rgba(59, 130, 246, 0.04)",
    },
  },
  carouselContainer: {
    width: "100%",
    maxWidth: "760px",
    marginTop: "20px",
  },
  carouselCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "18px",
    padding: "32px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
    marginBottom: "20px",
    animationName: {
      "0%": {
        opacity: "0",
        transform: "scale(0.95)",
      },
      "100%": {
        opacity: "1",
        transform: "scale(1)",
      },
    },
    animationDuration: "1s",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  cardIconContainer: {
    width: "40px",
    height: "40px",
    backgroundColor: "#e6f3ff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardIcon: {
    width: "20px",
    height: "20px",
    color: tokens.colorBrandForeground1,
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
  },
  cardDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "24px",
    lineHeight: "1.5",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    marginBottom: "20px",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "16px",
    borderRadius: "8px",
    textAlign: "center",
  },
  statLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  statValue: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginTop: "8px",
  },
  statChange: {
    fontSize: "12px",
    color: tokens.colorPaletteGreenForeground1,
    marginLeft: "8px",
  },
  adoSection: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "16px",
  },
  adoHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  adoItem: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  adoTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
    paddingBottom: "16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  adoLink: {
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
  adoDetails: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  adoDetailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  adoDetailLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  adoDetailValue: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  avatar: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    color: "white",
    fontWeight: tokens.fontWeightSemibold,
  },
  cardActions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  actionButton: {
    borderRadius: "20px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "6px 12px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    transition: "all 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      transform: "translateY(-1px)",
    },
  },
  carouselControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  },
  navButton: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: tokens.colorNeutralForeground2,
    transition: "all 0.2s",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
    },
    ":disabled": {
      opacity: 0.4,
      cursor: "not-allowed",
    },
  },
  dots: {
    display: "flex",
    gap: "8px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: tokens.colorNeutralStroke2,
    cursor: "pointer",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: tokens.colorNeutralStroke1,
    },
  },
  dotActive: {
    width: "24px",
    borderRadius: "4px",
    backgroundColor: tokens.colorBrandForeground1,
  },
})

interface WelcomeReturning2Props {
  userName: string
  onPromptClick: (prompt: string) => void
}

export default function WelcomeReturning2({ userName, onPromptClick }: WelcomeReturning2Props) {
  const styles = useStyles()
  const [currentSlide, setCurrentSlide] = useState(0)

  const insights = [
    {
      title: "Expand production capacity for seasonal business growth",
      description: "Your current infrastructure may not handle the upcoming seasonal spike. Consider scaling resources proactively.",
      stats: [
        { label: "Current capacity utilization", value: "83%" },
        { label: "3-month forecasted utilization", value: "134%", change: "↑ 51%" },
      ],
      actions: ["Ut enim ad minim veniam", "Lorem ipsum dolor sit consectetur adipiscing"],
    },
    {
      title: "Optimize costs with reserved instances",
      description: "You could save up to $2,400/month by switching to reserved instances for your consistently running VMs.",
      stats: [
        { label: "Current monthly cost", value: "$8,234" },
        { label: "Potential savings", value: "$2,400", change: "↓ 29%" },
      ],
      actions: ["View cost analysis", "Switch to reserved instances"],
    },
    {
      title: "Security recommendations require attention",
      description: "3 critical security vulnerabilities detected across your resources. Immediate action recommended.",
      stats: [
        { label: "Critical vulnerabilities", value: "3" },
        { label: "Resources affected", value: "12" },
      ],
      actions: ["View security report", "Apply recommended fixes"],
    },
    {
      title: "Change an NSG rule causing Sev1 alerts using a CLI command",
      description: "After a Sev1 alert occurred on BackendVM4, I found that 90% of failure anomalies in contoso-ai-app were due to a blocked port caused by a newly implemented SecurityTeamHTTPBlock rule.",
      ado: {
        item: "ADO item 31245",
        title: "Block port 80 on all non-prod environments",
        link: "View in Azure DevOps",
        details: [
          { label: "Implemented by", value: "Charlotte Walston", hasAvatar: true },
          { label: "Date added", value: "Today at 11:10 AM" },
          { label: "Proposed action", value: "Agent fix using CLI command" },
        ],
      },
      actions: ["Change the NSG rule for me", "Explain details of the investigation"],
    },
  ]

  const currentInsight = insights[currentSlide]

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? insights.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === insights.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className={styles.container}>
      <div className={styles.welcomeText}>WELCOME BACK, {userName.toUpperCase()}</div>
      
      <div className={styles.mainMessage}>
        Here are some quick stats to keep an eye on—a few issues could use your attention. Select one you'd like to address first, or I can{" "}
        <span className={styles.link} role="button" tabIndex={0} onClick={() => onPromptClick("Walk me through all issues")} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPromptClick("Walk me through all issues"); } }}>
          walk you through all of them.
        </span>
      </div>

      <div className={styles.carouselContainer}>
        <div key={currentSlide} className={styles.carouselCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIconContainer}>
              <ChatSparkle20Regular className={styles.cardIcon} />
            </div>
            <div className={styles.cardTitle}>{currentInsight.title}</div>
          </div>
          <div className={styles.cardDescription}>{currentInsight.description}</div>
          
          {currentInsight.stats && (
            <div className={styles.statsGrid}>
              {currentInsight.stats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <div className={styles.statLabel}>{stat.label}</div>
                  <div>
                    <span className={styles.statValue}>{stat.value}</span>
                    {stat.change && <span className={styles.statChange}>{stat.change}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentInsight.ado && (
            <div className={styles.adoSection}>
              <div className={styles.adoHeader}>
                <div className={styles.adoItem}>{currentInsight.ado.item}</div>
                <a className={styles.adoLink}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8.5V12.5C12 13.0523 11.5523 13.5 11 13.5H3.5C2.94772 13.5 2.5 13.0523 2.5 12.5V5C2.5 4.44772 2.94772 4 3.5 4H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M10 2.5H13.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.5 2.5L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span>{currentInsight.ado.link}</span>
                </a>
              </div>
              <div className={styles.adoTitle}>{currentInsight.ado.title}</div>
              <div className={styles.adoDetails}>
                {currentInsight.ado.details.map((detail, index) => (
                  <div key={index} className={styles.adoDetailItem}>
                    <div className={styles.adoDetailLabel}>{detail.label}</div>
                    <div className={styles.adoDetailValue}>
                      {detail.hasAvatar && (
                        <div className={styles.avatar}>CW</div>
                      )}
                      <span>{detail.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.cardActions}>
            {currentInsight.actions.map((action) => (
              <button
                key={action}
                className={styles.actionButton}
                onClick={() => onPromptClick(action)}
              >
                <span>{action}</span>
                <Send16Regular />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.carouselControls}>
          <button
            className={styles.navButton}
            onClick={handlePrevious}
            aria-label="Previous"
          >
            <ChevronLeft20Regular />
          </button>
          
          <div className={styles.dots}>
            {insights.map((_, index) => (
              <div
                key={index}
                className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ""}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>

          <button
            className={styles.navButton}
            onClick={handleNext}
            aria-label="Next"
          >
            <ChevronRight20Regular />
          </button>
        </div>
      </div>
    </div>
  )
}
