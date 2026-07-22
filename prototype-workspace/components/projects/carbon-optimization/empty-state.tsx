"use client"

import { makeStyles, tokens as fluentTokens, Text, Button, Link } from "@fluentui/react-components"
import type { ReactNode } from "react"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: "80px",
    paddingBottom: "80px",
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    gap: tokens.spacingVerticalM,
  },
  iconWrapper: {
    width: "64px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: tokens.spacingVerticalS,
    // Greyscale + slight desaturation to match the "no data" treatment from the design system empty-state convention.
    filter: "grayscale(1)",
    opacity: 0.55,
  },
  iconImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  heading: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase500,
    textAlign: "center",
    display: "block",
    width: "100%",
  },
  body: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
    maxWidth: "440px",
    textAlign: "center",
    display: "block",
  },
  actions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalS,
  },
  link: {
    fontSize: tokens.fontSizeBase300,
    marginTop: tokens.spacingVerticalXS,
    backgroundColor: "transparent",
    borderTopStyle: "none",
    borderRightStyle: "none",
    borderBottomStyle: "none",
    borderLeftStyle: "none",
    paddingTop: "0",
    paddingRight: "0",
    paddingBottom: "0",
    paddingLeft: "0",
    cursor: "pointer",
    textAlign: "center",
  },
})

export interface EmptyStateProps {
  /** Path to the icon SVG (rendered greyscale). Use Azure service-icon paths or `/icons/...` paths. */
  iconSrc: string
  /** Alt text for the icon. */
  iconAlt?: string
  /** Headline shown below the icon (e.g. "No billing accounts to display"). */
  heading: string
  /** Supporting body copy explaining why the state is empty and what to do next. */
  body: ReactNode
  /** Optional primary action (e.g. "Request access"). */
  primaryAction?: { label: string; onClick: () => void }
  /** Optional secondary action (e.g. "Learn more"). */
  secondaryAction?: { label: string; onClick: () => void }
  /** Optional inline text link rendered below the body. Use when the action won't resolve the empty state but offers a useful next step (e.g. "Switch to another view"). */
  link?: { label: string; onClick: () => void }
}

/** Centered empty-state layout following the Azure design-system convention: greyscale icon + heading + body + optional actions. Use when a page or panel has no data to display, for permission errors, or for first-run "you don't have any X yet" states. */
export default function EmptyState({ iconSrc, iconAlt = "", heading, body, primaryAction, secondaryAction, link }: EmptyStateProps) {
  const styles = useStyles()
  return (
    <div className={styles.root}>
      <div className={styles.iconWrapper}>
        <img src={iconSrc} alt={iconAlt} className={styles.iconImg} />
      </div>
      <Text className={styles.heading}>{heading}</Text>
      <Text className={styles.body}>{body}</Text>
      {link && (
        <Link
          as="button"
          onClick={link.onClick}
          className={styles.link}
        >
          {link.label}
        </Link>
      )}
      {(primaryAction || secondaryAction) && (
        <div className={styles.actions}>
          {primaryAction && (
            <Button appearance="primary" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button appearance="secondary" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
