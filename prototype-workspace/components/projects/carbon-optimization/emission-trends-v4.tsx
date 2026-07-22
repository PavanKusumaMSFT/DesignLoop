"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  Card,
  Link,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Button,
} from "@fluentui/react-components"
import { Info12Regular, ArrowUp12Filled, ArrowDown12Filled, Open12Regular } from "@fluentui/react-icons"
import { VerticalStackedBarChart, DonutChart, LineChart, DataVizPalette, getColorFromToken } from "@fluentui/react-charting"
import {
  getMonthlyTotals,
  getKpiSummary,
  getEmissionsByResourceType,
  getEmissionsByLocation,
  months,
  savingsOpportunities,
} from "./data/mock-data"
import type { FilterState } from "./carbon-filters-v4"
import { getFilteredSubscriptionIds } from "./carbon-filters-v4"
import { SavingsOpportunitiesSection, type SavingsOpportunity as SavingsOpportunityCardData } from "./savings-opportunity-card"
import type { ReactNode, Ref } from "react"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

interface EmissionTrendsProps {
  filters: FilterState
  /** Optional element rendered to the right of the "Monthly emissions" chart title (e.g. an Export to CSV button). */
  exportSlot?: ReactNode
  /** Where to render `exportSlot` relative to the main panel card. "footer" (default) keeps the v1 baseline placement (bottom-left). "topRight" pins it to the top-right of the card. "topLeft" places a compact toolbar row above the card content. */
  exportPosition?: "footer" | "topRight" | "topLeft"
  /** Optional ref attached to the "Potential monthly emissions reductions" KPI block. Used by parents to anchor a teaching popover (e.g. the v3 onboarding tour). */
  reductionsKpiRef?: Ref<HTMLDivElement>
  /** Override the description row at the top of the view. Pass `null` to hide it entirely. */
  descriptionSlot?: ReactNode | null
  /** When true, hides the "The emissions data presented here is calculated…" methodology disclaimer at the bottom of the view (and its top divider). */
  hideMethodologyFooter?: boolean
}

const scopeColors = {
  scope1: "#0078D4",
  scope2: "#002050",
  scope3: "#00BCF2",
}

// Resolve DataVizPalette tokens for chart colors
const chartPalette = [
  getColorFromToken(DataVizPalette.color1),
  getColorFromToken(DataVizPalette.color2),
  getColorFromToken(DataVizPalette.color3),
  getColorFromToken(DataVizPalette.color4),
  getColorFromToken(DataVizPalette.color5),
  getColorFromToken(DataVizPalette.color6),
  getColorFromToken(DataVizPalette.color7),
  getColorFromToken(DataVizPalette.color8),
  getColorFromToken(DataVizPalette.color9),
  getColorFromToken(DataVizPalette.color10),
]

/** Hook to track container width for responsive charts */
function useContainerWidth(ref: React.RefObject<HTMLDivElement | null>) {
  const [width, setWidth] = useState(280)
  useEffect(() => {
    if (!ref.current) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width)
      }
    })
    observer.observe(ref.current)
    setWidth(ref.current.clientWidth)
    return () => observer.disconnect()
  }, [ref])
  return width
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  description: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: "15px",
  },
  mainPanel: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    borderRadius: tokens.borderRadiusSmall,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    // PR3 reflow — allow this card to shrink below the natural width of its
    // (chart) child within the parent grid/flex layout.
    minWidth: 0,
    // PR4 reflow — chart now resizes to fill its container, so removing the
    // PR3 overflow:hidden — chart no longer overflows on its own.
  },
  mainPanelRow: {
    display: "flex",
    gap: "40px",
    // PR3 reflow — allow this flex row to shrink below content width.
    minWidth: 0,
    // PR4 reflow — below 1024px the KPI column stacks above the bar chart.
    // 40px row gap is replaced by a vertical gap when stacked.
    "@media (max-width: 1023px)": {
      flexDirection: "column",
      gap: tokens.spacingVerticalL,
    },
  },
  mainPanelFooter: {
    display: "flex",
    justifyContent: "flex-start",
  },
  kpiColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
    minWidth: "220px",
    maxWidth: "240px",
  },
  kpiBlock: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  kpiLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  kpiValue: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "32px",
  },
  kpiUnit: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  kpiTrend: {
    fontSize: tokens.fontSizeBase100,
    display: "flex",
    alignItems: "center",
    gap: "0px",
    lineHeight: "14px",
  },
  trendDown: {
    color: tokens.colorPaletteGreenForeground1,
  },
  trendUp: {
    color: tokens.colorPaletteRedForeground1,
  },
  kpiLink: {
    fontSize: tokens.fontSizeBase300,
  },
  chartArea: {
    flex: 1,
    minWidth: 0,
    // PR4 fix — reserve enough vertical space for chart (height={292}) + title
    // row (~32) + legend on a single row at desktop (~40). Below 1024 the legend
    // wraps to 2 rows, but the bar chart itself is also shorter via remount, so
    // 380 is enough at all widths.
    minHeight: "380px",
  },
  chartTitleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalS,
  },
  chartTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
  },
  chartTitleNoMargin: {
    marginBottom: 0,
  },
  bottomRow: {
    display: "grid",
    // PR3 reflow — was "1fr 1fr 1fr". `auto-fit` + `minmax(320px, 1fr)` naturally
    // wraps to 2 cols and then 1 col as the available width shrinks, no media
    // query needed. 320px is the minimum width before the donut/intensity charts
    // become unreadable.
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: tokens.spacingHorizontalL,
  },
  bottomCard: {
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    display: "flex",
    flexDirection: "column" as const,
    // PR3 reflow — allow grid-cell child to shrink and clip its (fixed-width)
    // chart locally rather than overflowing the row.
    minWidth: 0,
    overflowX: "hidden",
  },
  bottomCardContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column" as const,
  },
  bottomCardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    paddingTop: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
  },
  bottomCardChart: {
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    flex: 1,
  },
  legendRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    cursor: "pointer",
  },
  legendSwatch: {
    width: "12px",
    height: "12px",
    borderRadius: tokens.borderRadiusSmall,
    flexShrink: 0,
  },
  legendLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: "16px",
    whiteSpace: "nowrap" as const,
  },
  legendOverflowBtn: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightRegular,
    minWidth: 0,
    paddingLeft: "0",
    paddingRight: "0",
    height: "auto",
  },
  overflowList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingHorizontalS,
  },
  bottomCardFooter: {
    paddingLeft: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingHorizontalL,
  },
  seeDetailsLink: {
    fontSize: tokens.fontSizeBase300,
  },
  footer: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
    paddingTop: tokens.spacingVerticalM,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: tokens.colorNeutralStroke2,
  },
  savingsSpacer: {
    height: tokens.spacingVerticalS,
  },
})

/** Emission Trends view — KPIs, stacked bar chart, donut charts, carbon intensity. */
export default function EmissionTrends({ filters, exportSlot, exportPosition = "footer", reductionsKpiRef, descriptionSlot, hideMethodologyFooter = false }: EmissionTrendsProps) {
  const styles = useStyles()
  const filteredIds = getFilteredSubscriptionIds(filters)
  const emScopeAll = filters.emissionsType === null
  const emScopeIncludes = (s: "scope1" | "scope2" | "scope3") =>
    emScopeAll || (filters.emissionsType !== null && filters.emissionsType.includes(s))

  const monthlyTotals = useMemo(() => {
    const raw = getMonthlyTotals(filteredIds)
    if (emScopeAll) return raw
    return raw.map((m) => {
      const s1 = emScopeIncludes("scope1") ? m.scope1 : 0
      const s2 = emScopeIncludes("scope2") ? m.scope2 : 0
      const s3 = emScopeIncludes("scope3") ? m.scope3 : 0
      return { ...m, scope1: s1, scope2: s2, scope3: s3, total: s1 + s2 + s3 }
    })
  }, [filteredIds, emScopeAll, filters.emissionsType])

  const kpi = useMemo(() => {
    const raw = getKpiSummary(filteredIds)
    if (emScopeAll) return raw
    // Recompute KPIs from filtered monthly totals
    const totals = monthlyTotals
    const lastMonth = totals[totals.length - 1]
    const prevMonth = totals[totals.length - 2]
    const twelveMonthTotal = totals.reduce((sum, m) => sum + m.total, 0)
    const monthOverMonth =
      prevMonth.total > 0
        ? Math.round(((lastMonth.total - prevMonth.total) / prevMonth.total) * 1000) / 10
        : 0
    return {
      totalLast12Months: Math.round(twelveMonthTotal * 10) / 10,
      lastMonthTotal: Math.round(lastMonth.total * 10) / 10,
      lastMonthMoM: monthOverMonth,
      potentialMonthlySavings: raw.potentialMonthlySavings,
    }
  }, [filteredIds, emScopeAll, monthlyTotals])
  const lastMonth = months[months.length - 1]
  const byResourceType = useMemo(() => getEmissionsByResourceType(lastMonth, filteredIds), [filteredIds, lastMonth])
  const byLocation = useMemo(() => getEmissionsByLocation(lastMonth, filteredIds), [filteredIds, lastMonth])

  // Stacked bar chart data
  const barChartData = useMemo(() => {
    return monthlyTotals.map((m) => {
      const monthLabel = formatMonth(m.month)
      const chartData = []
      if (emScopeIncludes("scope1"))
        chartData.push({ legend: "Scope 1", data: Math.round(m.scope1), color: scopeColors.scope1 })
      if (emScopeIncludes("scope2"))
        chartData.push({ legend: "Scope 2", data: Math.round(m.scope2), color: scopeColors.scope2 })
      if (emScopeIncludes("scope3"))
        chartData.push({ legend: "Scope 3", data: Math.round(m.scope3), color: scopeColors.scope3 })
      return { chartData, xAxisPoint: monthLabel }
    })
  }, [monthlyTotals, emScopeAll, filters.emissionsType])

  // Donut chart data — by resource type
  const donutResourceData = useMemo(() => {
    return byResourceType.slice(0, 8).map((r, i) => ({
      legend: r.resourceType,
      data: Math.round(r.total * 10) / 10,
      color: chartPalette[i % chartPalette.length],
    }))
  }, [byResourceType])

  // Donut chart data — by location
  const donutLocationData = useMemo(() => {
    return byLocation.slice(0, 8).map((l, i) => ({
      legend: l.location,
      data: Math.round(l.total * 10) / 10,
      color: chartPalette[i % chartPalette.length],
    }))
  }, [byLocation])

  // Carbon intensity line chart (simulated trend)
  const intensityData = useMemo(() => {
    return monthlyTotals.map((m, i) => ({
      x: new Date(m.month + "-15"),
      y: +(m.total / (100 + i * 5)).toFixed(3),
    }))
  }, [monthlyTotals])

  const lastMonthTotal = kpi.lastMonthTotal

  const [highlightedResource, setHighlightedResource] = useState<string | null>(null)
  const [highlightedLocation, setHighlightedLocation] = useState<string | null>(null)

  const resourceDonutValue = useMemo(() => {
    if (!highlightedResource) return String(Math.round(lastMonthTotal * 10) / 10)
    const item = donutResourceData.find((d) => d.legend === highlightedResource)
    return item ? String(item.data) : String(Math.round(lastMonthTotal * 10) / 10)
  }, [highlightedResource, donutResourceData, lastMonthTotal])

  const locationDonutValue = useMemo(() => {
    if (!highlightedLocation) return String(Math.round(lastMonthTotal * 10) / 10)
    const item = donutLocationData.find((d) => d.legend === highlightedLocation)
    return item ? String(item.data) : String(Math.round(lastMonthTotal * 10) / 10)
  }, [highlightedLocation, donutLocationData, lastMonthTotal])

  const donutResourceDisplay = useMemo(() => {
    if (!highlightedResource) return donutResourceData
    return donutResourceData.map((d) => ({
      ...d,
      color: d.legend === highlightedResource ? d.color : d.color + "30",
    }))
  }, [donutResourceData, highlightedResource])

  const donutLocationDisplay = useMemo(() => {
    if (!highlightedLocation) return donutLocationData
    return donutLocationData.map((d) => ({
      ...d,
      color: d.legend === highlightedLocation ? d.color : d.color + "30",
    }))
  }, [donutLocationData, highlightedLocation])

  // Refs for responsive chart sizing
  const donutRef1 = useRef<HTMLDivElement>(null)
  const donutRef2 = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  // PR4 reflow — make the stacked bar chart respond to its container width like
  // the donut/line charts already do, instead of rendering at a fixed width.
  const barChartRef = useRef<HTMLDivElement>(null)
  const donutWidth1 = useContainerWidth(donutRef1)
  const donutWidth2 = useContainerWidth(donutRef2)
  const lineWidth = useContainerWidth(lineRef)
  const barChartWidth = useContainerWidth(barChartRef)

  // Top 4 saving opportunities (largest emissions savings first), filtered by selected subscriptions.
  const topOpportunities: SavingsOpportunityCardData[] = useMemo(() => {
    const allowedSubs = filteredIds ? new Set(filteredIds) : null
    const inScope = allowedSubs
      ? savingsOpportunities.filter((o) => allowedSubs.has(o.subscriptionId))
      : savingsOpportunities
    const top = [...inScope].sort((a, b) => b.savingsKgCO2e - a.savingsKgCO2e).slice(0, 4)
    return top.map((o) => {
      // Pick the right service icon based on the recommended action / resource family.
      const isVmss = /scale set|instance count/i.test(o.description)
      const isStorage = /storage|tier/i.test(o.description) || /_LRS$/.test(o.resourceName)
      const iconSrc = isStorage
        ? "/azure-service-icons/storage/10086-icon-service-Storage-Accounts.svg"
        : isVmss
          ? "/azure-service-icons/compute/10034-icon-service-VM-Scale-Sets.svg"
          : "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg"
      const iconAlt = isStorage ? "Storage account" : isVmss ? "Virtual machine scale set" : "Virtual machine"
      // Extract a resource name to highlight as a link, if present in description (e.g. "on resource R2D2.").
      const match = o.description.match(/on resource ([^\s.]+)/)
      const resourceLinkText = match?.[1]
      return {
        id: o.id,
        title: `Save ${o.savingsKgCO2e} kgCO2e`,
        description: o.description,
        iconSrc,
        iconAlt,
        resourceLinkText,
      }
    })
  }, [filteredIds])

  return (
    <div className={styles.root}>
      {descriptionSlot === undefined ? (
        <Text className={styles.description}>
          Azure carbon optimization provides data and insights to help with optimizing carbon emissions from your Azure usage.{" "}
          <Link href="#" inline>Learn more <Open12Regular /></Link>
        </Text>
      ) : (
        descriptionSlot
      )}

      {/* Main panel: KPIs left + Bar chart right, with optional export footer */}
      <div className={styles.mainPanel}>
        {exportPosition === "topLeft" && exportSlot && (
          <div className={styles.mainPanelFooter}>{exportSlot}</div>
        )}
        <div className={styles.mainPanelRow}>
          <div className={styles.kpiColumn}>
          <div className={styles.kpiBlock}>
            <Text className={styles.kpiLabel}>
              Total carbon emissions <Info12Regular />
            </Text>
            <Text className={styles.kpiValue}>
              {kpi.totalLast12Months.toLocaleString()}{" "}
              <Text className={styles.kpiUnit}>kgCO2e</Text>
            </Text>
            <Link className={styles.kpiLink} href="#">View emissions equivalents</Link>
          </div>

          <div className={styles.kpiBlock}>
            <Text className={styles.kpiLabel}>
              Carbon emissions for the last month <Info12Regular />
            </Text>
            <Text className={styles.kpiValue}>
              {kpi.lastMonthTotal.toLocaleString()}{" "}
              <Text className={styles.kpiUnit}>kgCO2e</Text>
            </Text>
            <span className={`${styles.kpiTrend} ${kpi.lastMonthMoM <= 0 ? styles.trendDown : styles.trendUp}`}>
              {kpi.lastMonthMoM <= 0 ? <ArrowDown12Filled /> : <ArrowUp12Filled />} {Math.abs(kpi.lastMonthMoM)}% from {new Date(months[months.length - 1] + "-01").getFullYear() - 1}
            </span>
            <Link className={styles.kpiLink} href="#">View emissions equivalents</Link>
          </div>

          <div className={styles.kpiBlock} ref={reductionsKpiRef}>
            <Text className={styles.kpiLabel}>
              Potential monthly emissions reductions <Info12Regular />
            </Text>
            <Text className={styles.kpiValue}>
              {kpi.potentialMonthlySavings.toLocaleString()}{" "}
              <Text className={styles.kpiUnit}>kgCO2e</Text>
            </Text>
            <Link className={styles.kpiLink} href="#">See all reduction opportunities</Link>
          </div>
        </div>

        <div className={styles.chartArea} ref={barChartRef}>
          {exportSlot && exportPosition === "topRight" ? (
            <div className={styles.chartTitleRow}>
              <Text className={mergeClasses(styles.chartTitle, styles.chartTitleNoMargin)}>Monthly emissions</Text>
              {exportSlot}
            </div>
          ) : (
            <Text className={styles.chartTitle}>Monthly emissions</Text>
          )}
          <VerticalStackedBarChart
            // PR4 fix — react-charting caches the largest layout it has rendered
            // and never shrinks back. Keying by width bucket forces a fresh
            // component instance per ~40px resize step, so height always reflects
            // the *current* width's label rotation needs.
            key={`bar-${Math.floor(barChartWidth / 40)}`}
            data={barChartData}
            height={292}
            // PR4 reflow — width follows the container; floor of 280 keeps the
            // y-axis legible at the narrowest viewport. Bucketed to 40px steps so
            // the chart doesn't re-layout on every pixel of resize (which causes
            // react-charting to miscalculate its internal height).
            width={Math.max(Math.floor(barChartWidth / 40) * 40, 280)}
            yAxisTitle="Carbon emissions (mtCO2)"
            // PR4 reflow — desktop uses 40px bars; below 1280px (where the chart
            // container drops under ~520px) we narrow bars to 24px so more months
            // remain visible.
            // PR11 — at very narrow widths (<360px chart width), 12 fixed-width bars
            // overflow the plotting area and visually overlap. Hand off to the
            // library's `'auto'` mode which scales bars to fit; cap with
            // `maxBarWidth` so they never exceed the 24px step we use above.
            barWidth={
              barChartWidth >= 520 ? 40 :
              barChartWidth >= 360 ? 24 :
              ('auto' as const)
            }
            maxBarWidth={24}
            hideTooltip={false}
            isCalloutForStack
            yAxisTickFormat={(val: number) => val >= 1000 ? `${(val / 1000).toFixed(1)}K` : String(val)}
            // PR11 — at narrow widths, wrap x-axis labels to 2 lines (month / 'YY)
            // and let the library auto-skip any that still collide.
            {...(barChartWidth < 500
              ? { wrapXAxisLables: true, hideTickOverlap: true }
              : {})}
          />
        </div>
        </div>
        {exportSlot && exportPosition === "footer" && <div className={styles.mainPanelFooter}>{exportSlot}</div>}
      </div>

      {/* Bottom row: resource type donut, location donut, carbon intensity */}
      <div className={styles.bottomRow}>
        <div className={styles.bottomCard} ref={donutRef1}>
          <div className={styles.bottomCardContent}>
            <Text className={styles.bottomCardTitle}>
              Emissions by resource type for the last month (in kgCO2e)
            </Text>
            <div className={styles.bottomCardChart}>
            <DonutChart
              data={{
                chartTitle: "Emissions by resource type",
                chartData: donutResourceDisplay,
              }}
              innerRadius={55}
              height={200}
              width={Math.max(donutWidth1 - 32, 200)}
              valueInsideDonut={resourceDonutValue}
              hideLabels
              hideLegend
            />
            </div>
            <DonutLegend
              items={donutResourceData}
              visibleCount={2}
              overflowLabel="More Resource Types"
              onHover={setHighlightedResource}
              onLeave={() => setHighlightedResource(null)}
            />
          </div>
          <div className={styles.bottomCardFooter}>
            <Link className={styles.seeDetailsLink} href="#">See details</Link>
          </div>
        </div>

        <div className={styles.bottomCard} ref={donutRef2}>
          <div className={styles.bottomCardContent}>
            <Text className={styles.bottomCardTitle}>
              Emissions by location for the last month (in kgCO2e)
            </Text>
            <div className={styles.bottomCardChart}>
            <DonutChart
              data={{
                chartTitle: "Emissions by location",
                chartData: donutLocationDisplay,
              }}
              innerRadius={55}
              height={200}
              width={Math.max(donutWidth2 - 32, 200)}
              valueInsideDonut={locationDonutValue}
              hideLabels
              hideLegend
            />
            </div>
            <DonutLegend
              items={donutLocationData}
              visibleCount={2}
              overflowLabel="More Locations"
              onHover={setHighlightedLocation}
              onLeave={() => setHighlightedLocation(null)}
            />
          </div>
          <div className={styles.bottomCardFooter}>
            <Link className={styles.seeDetailsLink} href="#">See details</Link>
          </div>
        </div>

        <div className={styles.bottomCard} ref={lineRef}>
          <div className={styles.bottomCardContent}>
            <Text className={styles.bottomCardTitle}>Carbon intensity</Text>
            <div className={styles.bottomCardChart}>
            <LineChart
              data={{
                chartTitle: "Carbon intensity",
                lineChartData: [
                  {
                    legend: "Carbon intensity",
                    data: intensityData,
                    color: "#0078D4",
                  },
                ],
              }}
              height={200}
              width={Math.max(lineWidth - 32, 200)}
              yAxisTitle="Carbon intensity * 10^-3"
            />
            </div>
          </div>
          <div className={styles.bottomCardFooter}>
            <Link className={styles.seeDetailsLink} href="#">See details</Link>
          </div>
        </div>
      </div>

      <div className={styles.savingsSpacer} />

      <SavingsOpportunitiesSection
        title="Top monthly saving opportunities"
        seeAllLabel="See all saving opportunities"
        opportunities={topOpportunities}
      />

      {!hideMethodologyFooter && (
        <Text className={styles.footer}>
          The emissions data presented here is calculated based on the methodology documented in this white paper:{" "}
          <Link href="#" inline>A new approach for scope 3 emissions transparency.</Link>{" "}
          The findings, interpretations and conclusions presented in the report are for informational purposes only. This report is not intended and should not be used for legal compliance, marketing, or reporting purposes.
        </Text>
      )}
    </div>
  )
}

function formatMonth(month: string): string {
  const [year, m] = month.split("-")
  const date = new Date(parseInt(year), parseInt(m) - 1)
  // Short month + 2-digit year with apostrophe (e.g. "Feb '26").
  // The space lets `wrapXAxisLables` split across two lines at narrow widths.
  const monthShort = date.toLocaleDateString("en-US", { month: "short" })
  const yearShort = year.slice(-2)
  return `${monthShort} '${yearShort}`
}

/** Custom donut legend with Fluent v9 Popover for overflow items. */
function DonutLegend({
  items,
  visibleCount,
  overflowLabel,
  onHover,
  onLeave,
}: {
  items: { legend: string; data: number; color: string }[]
  visibleCount: number
  overflowLabel: string
  onHover?: (legend: string) => void
  onLeave?: () => void
}) {
  const styles = useStyles()
  const visible = items.slice(0, visibleCount)
  const overflow = items.slice(visibleCount)

  return (
    <div className={styles.legendRow}>
      {visible.map((item) => (
        <span
          key={item.legend}
          className={styles.legendItem}
          onMouseEnter={() => onHover?.(item.legend)}
          onMouseLeave={() => onLeave?.()}
        >
          <span className={styles.legendSwatch} style={{ backgroundColor: item.color }} />
          <span className={styles.legendLabel}>{item.legend}</span>
        </span>
      ))}
      {overflow.length > 0 && (
        <Popover withArrow positioning="below">
          <PopoverTrigger disableButtonEnhancement>
            <Button appearance="transparent" className={styles.legendOverflowBtn} size="small">
              {overflow.length} {overflowLabel}...
            </Button>
          </PopoverTrigger>
          <PopoverSurface>
            <div className={styles.overflowList}>
              {overflow.map((item) => (
                <span
                  key={item.legend}
                  className={styles.legendItem}
                  onMouseEnter={() => onHover?.(item.legend)}
                  onMouseLeave={() => onLeave?.()}
                >
                  <span className={styles.legendSwatch} style={{ backgroundColor: item.color }} />
                  <span className={styles.legendLabel}>{item.legend}</span>
                </span>
              ))}
            </div>
          </PopoverSurface>
        </Popover>
      )}
    </div>
  )
}
