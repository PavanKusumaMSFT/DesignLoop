"use client"

import { makeStyles, tokens as fluentTokens, Button, Divider } from "@fluentui/react-components"
import { ArrowDownload16Regular, Lightbulb16Regular, PersonFeedback16Regular, ChevronDown12Regular } from "@fluentui/react-icons"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

interface CarbonToolbarProps {
  variant?: "default" | "reductions"
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorNeutralStroke2,
  },
  separator: {
    height: "20px",
  },
})

/** Toolbar with Export, Take a tour, and Feedback buttons (visual only). */
export default function CarbonToolbar({ variant = "default" }: CarbonToolbarProps) {
  const styles = useStyles()

  if (variant === "reductions") {
    return (
      <div className={styles.root}>
        <Button appearance="transparent" size="small" icon={<ArrowDownload16Regular />}>
          Export
        </Button>
        <Button appearance="transparent" size="small" icon={<ChevronDown12Regular />} />
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <Button appearance="transparent" size="small" icon={<ArrowDownload16Regular />}>
        Export to CSV
      </Button>
      <Divider className={styles.separator} vertical />
      <Button appearance="transparent" size="small" icon={<Lightbulb16Regular />}>
        Take a tour
      </Button>
      <Divider className={styles.separator} vertical />
      <Button appearance="transparent" size="small" icon={<PersonFeedback16Regular />}>
        Feedback
      </Button>
    </div>
  )
}
