"use client"

import {
  makeStyles,
  tokens as fluentTokens,
  Card,
  Text,
  Button,
  Link,
} from "@fluentui/react-components"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

export interface SavingsOpportunity {
  id: string
  /** Headline text on the card, e.g. "Save 22.7 kgCO2e". */
  title: string
  /** Body description explaining the recommended action. */
  description: string
  /** Path under /azure-service-icons/... for the resource type logo. */
  iconSrc: string
  /** Alt text for the icon (e.g. "Virtual machine"). */
  iconAlt: string
  /** Optional: text to render as a subtle inline link inside description (e.g. resource name). */
  resourceLinkText?: string
  /** Click handler for the See details button. */
  onSeeDetails?: () => void
  /** Click handler for the Postpone button. */
  onPostpone?: () => void
}

export interface SavingsOpportunityCardProps extends SavingsOpportunity {
  className?: string
}

/** Small clickable recommendation card showing potential savings on a single resource — used in the Carbon Optimization emission trends "Top monthly saving opportunities" rail. */
export default function SavingsOpportunityCard({
  title,
  description,
  iconSrc,
  iconAlt,
  resourceLinkText,
  onSeeDetails,
  onPostpone,
}: SavingsOpportunityCardProps) {
  const styles = useStyles()

  return (
    <Card className={styles.card}>
      <div className={styles.header}>
        <img src={iconSrc} alt={iconAlt} className={styles.icon} />
        <Text className={styles.title}>{title}</Text>
      </div>
      <div className={styles.body}>
        <Text className={styles.description}>
          {resourceLinkText ? renderWithLink(description, resourceLinkText, styles.resourceLink) : description}
        </Text>
        <div className={styles.footer}>
          <Button appearance="primary" size="small" onClick={onSeeDetails}>See details</Button>
          <Button appearance="secondary" size="small" onClick={onPostpone}>Postpone</Button>
        </div>
      </div>
    </Card>
  )
}

/** Section wrapper: header row ("Top monthly saving opportunities" + see-all link) + responsive 4-column card grid. */
export function SavingsOpportunitiesSection({
  title,
  seeAllLabel,
  onSeeAll,
  opportunities,
}: {
  title: string
  seeAllLabel: string
  onSeeAll?: () => void
  opportunities: SavingsOpportunity[]
}) {
  const styles = useStyles()

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <Text className={styles.sectionTitle}>{title}</Text>
        <Link className={styles.seeAllLink} onClick={onSeeAll}>
          ({seeAllLabel})
        </Link>
      </div>
      <div className={styles.grid}>
        {opportunities.map((op) => (
          <SavingsOpportunityCard key={op.id} {...op} />
        ))}
      </div>
    </div>
  )
}

/** Render a description with one inline blue link substring (e.g. resource name). */
function renderWithLink(text: string, linkText: string, linkClass: string) {
  const idx = text.indexOf(linkText)
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <a className={linkClass} href="#" onClick={(e) => e.preventDefault()}>
        {linkText}
      </a>
      {text.slice(idx + linkText.length)}
    </>
  )
}

const useStyles = makeStyles({
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: tokens.spacingHorizontalS,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  seeAllLink: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: "18px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "16px",
    "@media (max-width: 1200px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  card: {
    paddingTop: "12px",
    paddingBottom: "12px",
    paddingLeft: "12px",
    paddingRight: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    borderRadius: tokens.borderRadiusSmall,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    transitionProperty: "box-shadow",
    transitionDuration: tokens.durationNormal,
    cursor: "default",
    ":hover": {
      boxShadow: tokens.shadow8,
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    minHeight: "32px",
  },
  icon: {
    width: "32px",
    height: "32px",
    flexShrink: 0,
    objectFit: "contain",
  },
  title: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "20px",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: 1,
  },
  description: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: "16px",
    minHeight: "48px",
  },
  resourceLink: {
    color: tokens.colorBrandForeground1,
    textDecorationLine: "none",
    ":hover": {
      textDecorationLine: "underline",
    },
  },
  footer: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
  },
})
