"use client"

import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components"
import { TopNav } from "../../shared/top-nav"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "48px 32px",
    width: "100%",
  },
  title: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "40px",
    margin: "0 0 8px 0",
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground3,
    lineHeight: "22px",
    margin: "0 0 32px 0",
  },
})

export default function EmbrToPortal({ isDarkMode = false }: { isDarkMode?: boolean }) {
  const styles = useStyles()

  return (
    <div className={styles.root}>
      <TopNav  isDarkMode={isDarkMode} />
      <div className={styles.content}>
        <h1 className={styles.title}>Hello, World!</h1>
        <p className={styles.subtitle}>
          Start building the Embr To Portal experience here.
        </p>
      </div>
    </div>
  )
}
