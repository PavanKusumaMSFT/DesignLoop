"use client"

import * as React from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Tag,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Label,
  Dropdown,
  Option,
  Button,
} from "@fluentui/react-components"
import { ChevronDown12Regular, ShieldCheckmark20Regular } from "@fluentui/react-icons"
import AlertsCard from "./alerts-card"
import CostsCard from "./costs-card"
import KpiCard from "./kpi-card"
import SecurityCard from "./security-card"
import ChangeAnalysisCard from "./change-analysis-card"
import SelectedResourcesPanel from "./selected-resources-panel"
import type { InsightsMockData } from "./insights-data"
import { buildRandomizedInsightsData } from "./insights-data"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    minHeight: "calc(100vh - 132px - 48px)", // minus v8 shell (132) + prototype footer (~48)
    backgroundColor: tokens.colorNeutralBackground2,
    containerType: "inline-size",
    containerName: "insights",
    "@container insights (max-width: 819px)": {
      flexDirection: "column",
    },
  },
  content: {
    flex: "1 1 auto",
    minWidth: 0,
    padding: "40px clamp(8px, 8vw, 120px)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    "@container insights (max-width: 1099px)": {
      padding: "32px clamp(8px, 4vw, 120px)",
    },
    "@container insights (max-width: 819px)": {
      padding: "24px 8px",
    },
  },
  metricsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metricsTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
  },
  timeSpanTag: {
    backgroundColor: tokens.colorBrandBackground2,
    border: "none",
    borderRadius: tokens.borderRadiusCircular,
    cursor: "pointer",
  },
  timeSpanPopoverSurface: {
    padding: tokens.spacingVerticalM,
    width: "312px",
    boxShadow: tokens.shadow16,
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    flexDirection: "column",
    gap: "13px",
  },
  timeSpanTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
  },
  timeSpanFieldRow: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    width: "100%",
  },
  timeSpanDropdown: {
    width: "100%",
  },
  timeSpanButtons: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
    alignItems: "center",
    paddingTop: "2px",
  },
  topRow: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)",
    gap: "12px",
    alignItems: "stretch",
    "@container insights (max-width: 1299px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  bottomRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "12px",
    alignItems: "stretch",
    "@container insights (max-width: 1399px)": {
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    },
    "@container insights (max-width: 1099px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    "@container insights (max-width: 819px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
  cardShell: {
    display: "flex",
    minHeight: "416px",
    "@container insights (max-width: 819px)": {
      minHeight: 0,
    },
  },
  cardShellSmall: {
    display: "flex",
    minHeight: "226px",
    "@container insights (max-width: 819px)": {
      minHeight: 0,
    },
  },
})

export interface InsightsBladeProps {
  data: InsightsMockData
  /** Whether the right-rail "Selected resources" panel is visible. Defaults to true. */
  showResourcesPanel?: boolean
  /** Fires when the blade width drops below the auto-collapse threshold (820px). */
  onAutoCollapseResourcesPanel?: () => void
}

/** Full-page insights blade for the Resource Manager MVP — composes alerts, costs,
 * service health, security, resiliency, and deployments cards with a right-rail
 * "Selected resources" panel. */
export default function InsightsBlade({
  data,
  showResourcesPanel = true,
  onAutoCollapseResourcesPanel,
}: InsightsBladeProps) {
  const styles = useStyles()
  const rootRef = React.useRef<HTMLDivElement>(null)
  const TIME_SPAN_OPTIONS = [
    "Past 24 hours",
    "Past 3 days",
    "Past 7 days",
    "Past 30 days",
    "Past 60 days",
  ]
  const [timeSpanOpen, setTimeSpanOpen] = React.useState(false)
  const [selectedTimeSpan, setSelectedTimeSpan] = React.useState(data.timeSpanLabel ?? "Past 24 hours")
  const [pendingTimeSpan, setPendingTimeSpan] = React.useState(selectedTimeSpan)
  const [isLoading, setIsLoading] = React.useState(true)
  const [currentData, setCurrentData] = React.useState<InsightsMockData>(data)

  // Initial 3s skeleton load on mount
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleApplyTimeSpan = React.useCallback(() => {
    setSelectedTimeSpan(pendingTimeSpan)
    setTimeSpanOpen(false)
    setIsLoading(true)
    setTimeout(() => {
      setCurrentData(buildRandomizedInsightsData(currentData.selectedResourceIds, pendingTimeSpan))
      setIsLoading(false)
    }, 3000)
  }, [pendingTimeSpan, currentData.selectedResourceIds])

  // Auto-collapse the right rail when the blade gets narrow.
  React.useEffect(() => {
    const el = rootRef.current
    if (!el || typeof ResizeObserver === "undefined") return
    let wasNarrow = el.clientWidth < 820
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const isNarrow = entry.contentRect.width < 820
        if (isNarrow && !wasNarrow) {
          onAutoCollapseResourcesPanel?.()
        }
        wasNarrow = isNarrow
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [onAutoCollapseResourcesPanel])

  return (
    <div className={styles.root} ref={rootRef}>
      <div className={styles.content}>
        {/* Metrics header + time span filter */}
        <div className={styles.metricsHeader}>
          <Text className={styles.metricsTitle}>At a glance</Text>
          <Popover
            open={timeSpanOpen}
            onOpenChange={(_e, d) => {
              setTimeSpanOpen(d.open)
              if (d.open) setPendingTimeSpan(selectedTimeSpan)
            }}
            positioning={{ position: "below", align: "end" }}
            withArrow={false}
          >
            <PopoverTrigger disableButtonEnhancement>
              <Tag
                appearance="brand"
                shape="circular"
                size="small"
                className={styles.timeSpanTag}
                onClick={() => setTimeSpanOpen((o) => !o)}
              >
                Time span within <strong>&nbsp;{selectedTimeSpan}</strong>&nbsp;<ChevronDown12Regular />
              </Tag>
            </PopoverTrigger>
            <PopoverSurface className={styles.timeSpanPopoverSurface}>
              <Text className={styles.timeSpanTitle}>Time settings</Text>
              <div className={styles.timeSpanFieldRow}>
                <Label size="small" htmlFor="time-span-dropdown">Time range</Label>
                <Dropdown
                  id="time-span-dropdown"
                  size="small"
                  value={pendingTimeSpan}
                  selectedOptions={[pendingTimeSpan]}
                  onOptionSelect={(_e, d) => setPendingTimeSpan(d.optionText ?? pendingTimeSpan)}
                  className={styles.timeSpanDropdown}
                >
                  {TIME_SPAN_OPTIONS.map((opt) => (
                    <Option key={opt} value={opt}>{opt}</Option>
                  ))}
                </Dropdown>
              </div>
              <div className={styles.timeSpanButtons}>
                <Button
                  appearance="primary"
                  size="small"
                  onClick={handleApplyTimeSpan}
                >
                  Apply
                </Button>
                <Button
                  appearance="secondary"
                  size="small"
                  onClick={() => setTimeSpanOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </PopoverSurface>
          </Popover>
        </div>

        {/* Top row: Alerts (narrow) + Costs (wide) */}
        <div className={styles.topRow}>
          <div className={styles.cardShell}>
            <AlertsCard data={currentData.alerts} isLoading={isLoading} />
          </div>
          <div className={styles.cardShell}>
            <CostsCard data={currentData.costs} isLoading={isLoading} />
          </div>
        </div>

        {/* Bottom row: 4 KPI cards */}
        <div className={styles.bottomRow}>
          <div className={styles.cardShellSmall}>
            <KpiCard
              title="Service Health"
              isLoading={isLoading}
              stats={[
                { label: "Active issues", value: currentData.serviceHealth.activeIssues },
                { label: "Issues resolved (24h)", value: currentData.serviceHealth.resolved24h },
              ]}
            />
          </div>
          <div className={styles.cardShellSmall}>
            <SecurityCard data={currentData.security} isLoading={isLoading} />
          </div>
          <div className={styles.cardShellSmall}>
            <KpiCard
              title="Resiliency"
              isLoading={isLoading}
              stats={[
                { label: "Zonal resiliency", value: `${currentData.resiliency.zonalPercent}%` },
                {
                  label: "",
                  value: "",
                  secondary: `${currentData.resiliency.nonZonalCount} non-zonal resilient\n${currentData.resiliency.zonalCount} zonally resilient`,
                },
              ]}
              recommendations={[
                {
                  key: "migrate-zonal",
                  icon: <ShieldCheckmark20Regular />,
                  label: "Migrate 2 remaining resources to availability zones",
                },
                {
                  key: "enable-zone-redundancy",
                  icon: <ShieldCheckmark20Regular />,
                  label: "Enable zone-redundant storage on backup accounts",
                },
                {
                  key: "review-sla",
                  icon: <ShieldCheckmark20Regular />,
                  label: "Review SLA coverage for non-zonal workloads",
                },
              ]}
            />
          </div>
          <div className={styles.cardShellSmall}>
            <ChangeAnalysisCard data={currentData.changeAnalysis} isLoading={isLoading} />
          </div>
        </div>
      </div>

      <SelectedResourcesPanel
        resources={currentData.selectedResources}
        visible={showResourcesPanel}
      />
    </div>
  )
}
