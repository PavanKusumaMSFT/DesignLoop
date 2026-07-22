"use client"

import * as React from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
} from "@fluentui/react-components"
import InsightsCard from "./insights-card"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "0 16px 16px 16px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: "24px",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: 0,
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
})

export interface ChangeAnalysisCardProps {
  data: {
    creates: number
    deletes: number
    updates: number
  }
  isLoading?: boolean
}

/** Change Analysis card — creates + deletes on the first row, updates on the second. */
export default function ChangeAnalysisCard({ data, isLoading }: ChangeAnalysisCardProps) {
  const styles = useStyles()
  return (
    <InsightsCard title="Change Analysis" onSeeAll={() => {}} isLoading={isLoading}>
      <div className={styles.body}>
        <div className={styles.row}>
          <div className={styles.stat}>
            <Text className={styles.label}>Creates</Text>
            <Text className={styles.value}>{data.creates}</Text>
          </div>
          <div className={styles.stat}>
            <Text className={styles.label}>Deletes</Text>
            <Text className={styles.value}>{data.deletes}</Text>
          </div>
        </div>
        <div className={styles.stat}>
          <Text className={styles.label}>Updates</Text>
          <Text className={styles.value}>{data.updates}</Text>
        </div>
      </div>
    </InsightsCard>
  )
}
