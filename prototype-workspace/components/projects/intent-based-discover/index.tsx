"use client"

import { makeStyles, tokens as fluentTokens, Text } from "@fluentui/react-components"
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp"

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
    fontSize: tokens.fontSizeBase700,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase700,
    marginBottom: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase300,
    marginBottom: tokens.spacingVerticalXXL,
  },
})

export default function IntentBasedDiscover({ isDarkMode = false }: { isDarkMode?: boolean }) {
  const styles = useStyles()

  return (
    <div className={styles.root}>
      <AzureHeaderBuildMVP activeLink=""  isDarkMode={isDarkMode} />
      <div className={styles.content}>
        <Text as="h1" className={styles.title}>Hello, World!</Text>
        <Text as="p" className={styles.subtitle}>
          Service discovery based on user goals.
        </Text>
      </div>
    </div>
  )
}
