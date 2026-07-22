"use client"

import type { ReactNode } from "react"
import { makeStyles, mergeClasses, tokens as fluentTokens, Text, Link } from "@fluentui/react-components"
import { Info16Regular, Warning16Regular, ErrorCircle16Regular, CheckmarkCircle16Regular } from "@fluentui/react-icons"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

export type InlineMessageIntent = "info" | "warning" | "error" | "success"

export interface InlineMessageProps {
  /** Body text shown next to the icon. */
  children: ReactNode
  /** Intent color for the leading icon. Defaults to "info". */
  intent?: InlineMessageIntent
  /** Optional "Learn more" link appended after the body text. */
  learnMoreHref?: string
  /** Optional label for the link (defaults to "Learn more"). */
  learnMoreLabel?: string
  /** Optional className override on the root element. */
  className?: string
}

const ICONS: Record<InlineMessageIntent, typeof Info16Regular> = {
  info: Info16Regular,
  warning: Warning16Regular,
  error: ErrorCircle16Regular,
  success: CheckmarkCircle16Regular,
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
  },
  icon: {
    flexShrink: 0,
    marginTop: "2px",
  },
  iconInfo: { color: tokens.colorBrandForeground1 },
  iconWarning: { color: tokens.colorPaletteYellowForeground1 },
  iconError: { color: tokens.colorPaletteRedForeground1 },
  iconSuccess: { color: tokens.colorPaletteGreenForeground1 },
  body: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground1,
  },
  link: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    marginLeft: tokens.spacingHorizontalXXS,
  },
})

/** Inline message for short in-content notices (info / warning / error / success).
 *  Lighter-weight alternative to `MessageBar` — icon + text on a single line, no background.
 *  Matches the Azure portal "Inline message" pattern from the Fluent 1 extension kit. */
export default function InlineMessage({
  children,
  intent = "info",
  learnMoreHref,
  learnMoreLabel = "Learn more",
  className,
}: InlineMessageProps) {
  const styles = useStyles()
  const Icon = ICONS[intent]
  const iconClass =
    intent === "info"
      ? styles.iconInfo
      : intent === "warning"
        ? styles.iconWarning
        : intent === "error"
          ? styles.iconError
          : styles.iconSuccess

  return (
    <div className={mergeClasses(styles.root, className)}>
      <Icon className={mergeClasses(styles.icon, iconClass)} />
      <Text className={styles.body}>
        {children}
        {learnMoreHref && (
          <>
            {" "}
            <Link href={learnMoreHref} inline className={styles.link}>
              {learnMoreLabel}
            </Link>
          </>
        )}
      </Text>
    </div>
  )
}
