"use client"

import * as React from "react"
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  Badge,
} from "@fluentui/react-components"
import {
  MoreHorizontal20Regular,
} from "@fluentui/react-icons"
import InsightsCard from "./insights-card"
import type { AlertRow, InsightsMockData } from "./insights-data"
import AlertContextPane from "./alert-context-pane"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  statRow: {
    display: "flex",
    gap: "32px",
    padding: "0 16px 8px 16px",
  },
  stat: {
    flex: "0 0 auto",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  statLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  statValue: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase600,
    color: tokens.colorNeutralForeground1,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    padding: "0 16px 16px 16px",
    flex: "1 1 auto",
    minHeight: 0,
    overflow: "auto",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "8px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  rowFirst: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  badgeCol: {
    flex: "0 0 auto",
    minWidth: "70px",
  },
  textCol: {
    flex: "1 1 auto",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "0px",
  },
  rowTitle: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground2,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  rowMeta: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  iconCol: {
    flex: "0 0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    color: tokens.colorNeutralForeground3,
  },
})

function AlertBadge({ severity }: { severity: AlertRow["severity"] }) {
  if (severity === "Critical") {
    return (
      <Badge appearance="tint" color="danger" size="small" shape="rounded">
        Critical
      </Badge>
    )
  }
  if (severity === "Warning") {
    return (
      <Badge appearance="tint" color="severe" size="small" shape="rounded">
        Warning
      </Badge>
    )
  }
  return (
      <Badge appearance="tint" color="informative" size="small" shape="rounded">
      Info
    </Badge>
  )
}

function AlertRowIcon() {
  return <MoreHorizontal20Regular />
}

export interface AlertsCardProps {
  data: InsightsMockData["alerts"]
  isLoading?: boolean
}

/** Alerts card for the insights blade — shows Critical/Total tiles + a list of alert rows. */
export default function AlertsCard({ data, isLoading }: AlertsCardProps) {
  const styles = useStyles()
  const [selectedAlert, setSelectedAlert] = React.useState<AlertRow | null>(null)

  return (
    <InsightsCard title="Alerts" onSeeAll={() => {}} isLoading={isLoading}>
      <div className={styles.statRow}>
        <div className={styles.stat}>
          <Text className={styles.statLabel}>Critical alerts</Text>
          <Text className={styles.statValue}>{data.critical}</Text>
        </div>
        <div className={styles.stat}>
          <Text className={styles.statLabel}>Total alerts</Text>
          <Text className={styles.statValue}>{data.total}</Text>
        </div>
      </div>
      <div className={styles.list}>
        {data.rows.map((row, idx) => (
          <div
            key={idx}
            className={mergeClasses(styles.row, idx === 0 && styles.rowFirst)}
            onClick={() => setSelectedAlert(row)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setSelectedAlert(row)}
          >
            <div className={styles.badgeCol}>
              <AlertBadge severity={row.severity} />
            </div>
            <div className={styles.textCol}>
              <Text className={styles.rowTitle}>{row.title}</Text>
              <Text className={styles.rowMeta}>
                {row.resource} • {row.time}
              </Text>
            </div>
            <div className={styles.iconCol}>
              <AlertRowIcon />
            </div>
          </div>
        ))}
      </div>
      {selectedAlert && (
        <AlertContextPane
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
        />
      )}
    </InsightsCard>
  )
}
