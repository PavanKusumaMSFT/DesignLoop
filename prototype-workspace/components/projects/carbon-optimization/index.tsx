"use client"

import { makeStyles, tokens as fluentTokens, Text } from "@fluentui/react-components"
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp"
import CostCard from "./cost-card"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const costChartData = [
  { day: "Jun 1", actual: 0, forecast: null },
  { day: "Jun 3", actual: 4, forecast: null },
  { day: "Jun 5", actual: 8, forecast: null },
  { day: "Jun 8", actual: 14, forecast: null },
  { day: "Jun 10", actual: 18, forecast: null },
  { day: "Jun 12", actual: 22, forecast: null },
  { day: "Jun 15", actual: 28, forecast: null },
  { day: "Jun 18", actual: 33, forecast: null },
  { day: "Jun 20", actual: 36, forecast: null },
  { day: "Jun 22", actual: 39, forecast: null },
  { day: "Jun 25", actual: 43, forecast: 43 },
  { day: "Jun 27", actual: null, forecast: 68 },
  { day: "Jun 30", actual: null, forecast: 96 },
]

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  content: {
    maxWidth: "1200px",
    marginTop: "0",
    marginRight: "auto",
    marginBottom: "0",
    marginLeft: "auto",
    paddingTop: "48px",
    paddingRight: "32px",
    paddingBottom: "48px",
    paddingLeft: "32px",
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
  cardWrapper: {
    maxWidth: "560px",
  },
})

export default function SukyLearningdayTest({ isDarkMode = false }: { isDarkMode?: boolean }) {
  const styles = useStyles()

  return (
    <div className={styles.root}>
      <AzureHeaderBuildMVP activeLink="" isDarkMode={isDarkMode} />
      <div className={styles.content}>
        <Text as="h1" className={styles.title}>Hello, World!</Text>
        <Text as="p" className={styles.subtitle}>
          Start building the Suky Learningday Test experience here.
        </Text>
        <div className={styles.cardWrapper}>
          <CostCard
            incurredMetric={{
              label: "Cost incurred this month",
              value: "$43 USD",
              trend: "23% MoM",
              trendDirection: "up",
            }}
            forecastMetric={{
              label: "Forecasted this month",
              value: "$96 USD",
              trend: "23% MoM",
              trendDirection: "up",
            }}
            chartData={costChartData}
            recommendation="Consider reserved instances to save up to 30% on compute costs."
            onSeeAll={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
