"use client"

import * as React from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
} from "@fluentui/react-components"
import { PieChart, Pie, Cell } from "recharts"
import { ShieldCheckmark20Regular } from "@fluentui/react-icons"
import InsightsCard from "./insights-card"
import type { InsightsMockData } from "./insights-data"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "0 16px 16px 16px",
  },
  gaugeWrap: {
    position: "relative",
    width: "120px",
    height: "68px",
    flexShrink: "0",
  },
  gaugeScore: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    textAlign: "center",
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
    pointerEvents: "none",
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
})

function SecurityGauge({ score, styles }: { score: number; styles: ReturnType<typeof useStyles> }) {
  const data = [
    { value: score },
    { value: 100 - score },
  ]
  return (
    <div className={styles.gaugeWrap}>
      <PieChart width={120} height={68}>
        <Pie
          data={data}
          cx={60}
          cy={64}
          startAngle={180}
          endAngle={0}
          innerRadius={40}
          outerRadius={56}
          dataKey="value"
          strokeWidth={0}
          isAnimationActive={false}
        >
          <Cell fill="#0078D4" />
          <Cell fill="#E0E0E0" />
        </Pie>
      </PieChart>
      <Text className={styles.gaugeScore}>{score}</Text>
    </div>
  )
}

export interface SecurityCardProps {
  data: InsightsMockData["security"]
  isLoading?: boolean
}

/** Security card — half-donut gauge + security score label and value. */
export default function SecurityCard({ data, isLoading }: SecurityCardProps) {
  const styles = useStyles()

  return (
    <InsightsCard
      title="Security"
      onSeeAll={() => {}}
      isLoading={isLoading}
      recommendations={[
        {
          key: "enable-defender",
          icon: <ShieldCheckmark20Regular />,
          label: "Enable Microsoft Defender for Cloud on 2 resources",
        },
        {
          key: "close-recommendations",
          icon: <ShieldCheckmark20Regular />,
          label: "Close 4 open security recommendations",
        },
        {
          key: "rotate-keys",
          icon: <ShieldCheckmark20Regular />,
          label: "Rotate expiring keys in production key vault",
        },
      ]}
    >
      <div className={styles.body}>
        <SecurityGauge score={data.score} styles={styles} />
        <div className={styles.stat}>
          <Text className={styles.label}>Security score: {data.label}</Text>
          <Text className={styles.value}>{data.score}/100</Text>
        </div>
      </div>
    </InsightsCard>
  )
}
