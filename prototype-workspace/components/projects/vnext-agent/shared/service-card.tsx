"use client"

import { makeStyles, tokens as fluentTokens, Button } from "@fluentui/react-components"


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Send16Regular, Checkmark20Regular } from "@fluentui/react-icons"

const useStyles = makeStyles({
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "18px",
    padding: "12px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
    transition: "all 0.2s",
    display: "flex",
    flexDirection: "column",
    gap: "0",
    maxWidth: "380px",
    width: "100%",
    ":hover": {
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.08)",
      transform: "translateY(-2px)",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px",
    marginLeft: "-4px",
  },
  iconContainer: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconImage: {
    width: "32px",
    height: "32px",
  },
  badge: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    flex: 1,
  },
  contentSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "24px",
    borderRadius: "14px",
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "rgba(59, 130, 246, 0.04)",
    },
  },
  title: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
  },
  description: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.5",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  feature: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.4",
  },
  checkIcon: {
    color: tokens.colorPaletteGreenForeground1,
    marginTop: "2px",
    flexShrink: 0,
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "auto",
    paddingTop: "16px",
    paddingLeft: "12px",
    paddingBottom: "8px",
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
    width: "fit-content",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      transform: "translateY(-1px)",
    },
  },
})

interface ServiceCardProps {
  icon: string
  iconBgColor: string
  title: string
  description: string
  badge?: string
  features: string[]
  actions: Array<{
    label: string
    onClick: () => void
  }>
}

/** Reusable service card with icon, optional badge, title, description, checkmark feature list, and action buttons.
 * Cross-project reusable: can be imported by any project. */
export default function ServiceCard({
  icon,
  iconBgColor,
  title,
  description,
  badge,
  features,
  actions
}: ServiceCardProps) {
  const styles = useStyles()

  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.contentSection}>
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              {icon.startsWith('/') ? (
                <img src={icon} alt={title} className={styles.iconImage} />
              ) : (
                <span>{icon}</span>
              )}
            </div>
            {badge && <div className={styles.badge}>{badge}</div>}
          </div>
          
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
          
          <div className={styles.features}>
            {features.map((feature, index) => (
              <div key={index} className={styles.feature}>
                <Checkmark20Regular className={styles.checkIcon} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.actions}>
          {actions.map((action, index) => (
            <button
              key={index}
              className={styles.actionButton}
              onClick={action.onClick}
            >
              <span>{action.label}</span>
              <Send16Regular />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
