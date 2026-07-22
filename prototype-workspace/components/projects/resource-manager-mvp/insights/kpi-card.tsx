"use client"

import * as React from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
} from "@fluentui/react-components"
import InsightsCard, { type RecommendationItem } from "./insights-card"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "0 16px 16px 16px",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  label: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  value: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase600,
    color: tokens.colorNeutralForeground1,
  },
  secondary: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
    whiteSpace: "pre-line",
  },
})

export interface KpiStat {
  label: string
  value: string | number
  secondary?: string
}

export interface KpiCardProps {
  title: string
  stats: KpiStat[]
  recommendations?: RecommendationItem[]
  isLoading?: boolean
}

/** Generic KPI card — 1-2 stat rows, used by Service Health, Resiliency, Deployments. */
export default function KpiCard({
  title,
  stats,
  recommendations,
  isLoading,
}: KpiCardProps) {
  const styles = useStyles()
  return (
    <InsightsCard
      title={title}
      onSeeAll={() => {}}
      recommendations={recommendations}
      isLoading={isLoading}
    >
      <div className={styles.body}>
        {stats.map((stat, idx) => (
          <div key={idx} className={styles.stat}>
            <Text className={styles.label}>{stat.label}</Text>
            {stat.value !== "" && (
              <Text className={styles.value}>{stat.value}</Text>
            )}
            {stat.secondary && (
              <Text className={styles.secondary}>{stat.secondary}</Text>
            )}
          </div>
        ))}
      </div>
    </InsightsCard>
  )
}
