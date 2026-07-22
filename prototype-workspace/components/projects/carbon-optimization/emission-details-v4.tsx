"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  Link,
  TabList,
  Tab,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Skeleton,
  SkeletonItem,
  Overflow,
  OverflowItem,
  useOverflowMenu,
  useIsOverflowItemVisible,
  Menu,
  MenuTrigger,
  MenuButton,
  MenuPopover,
  MenuList,
  MenuItem,
} from "@fluentui/react-components"
import { Info12Regular, ArrowUp12Filled, ArrowDown12Filled, Open12Regular, ChevronLeft16Regular, ChevronRight16Regular } from "@fluentui/react-icons"
import { AreaChart, DataVizPalette, getColorFromToken } from "@fluentui/react-charting"
import {
  getMonthlyTotals,
  getKpiSummary,
  months,
  allSubscriptions,
  allResourceGroups,
  allResources,
  monthlyEmissions,
  getEmissionsByResourceGroup,
  getEmissionsByResourceTypeDetailed,
  getEmissionsByResource,
  getEmissionsByLocationDetailed,
  type EmissionRow,
} from "./data/mock-data"
import type { FilterState } from "./carbon-filters-v4"
import { getFilteredSubscriptionIds } from "./carbon-filters-v4"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

type DetailsTab = "subscriptions" | "resource-groups" | "resources" | "resource-types" | "locations"

type SortKey = "name" | "subscriptionName" | "resourceGroupName" | "resourceType" | "lastMonth" | "prevMonth" | "change" | "mom"
type SortDir = "asc" | "desc"

interface EmissionDetailsProps {
  filters: FilterState
  /** Optional element rendered above the breakdown table (e.g. an Export to CSV button). */
  exportSlot?: import("react").ReactNode
  /** When true, the "Resource groups" and "Resources" tabs are hidden (e.g. Billing Accounts view, where individual RGs/resources are not the relevant scope). If the active tab is one of the hidden ones, the view falls back to "subscriptions". */
  hideResourceTabs?: boolean
  /** When true, hides the "The emissions data presented here is calculated…" methodology disclaimer at the bottom of the view (and its top divider). */
  hideMethodologyFooter?: boolean
  /** When true, the TabList stays visible (and clickable) but the KPI/chart card and the table below are replaced with shape-matched skeleton placeholders. Used to communicate that data is updating in response to a scope change (e.g. switching billing accounts). */
  isLoading?: boolean
  /** When true: the divider between the top KPI card and the table is removed, the breakdown table is wrapped in an elevated card with the export slot pinned to the bottom-left, and pagination controls render below the table. Defaults to false to mirror the live Carbon Optimization extension. */
  detailsCardSurface?: boolean
  /** Where to render `exportSlot` when `detailsCardSurface` is true. "footer" (default) pins it to the bottom-left of the table card. "topRight" pins it to the top-right of the table card, alongside the title. "topLeft" places a compact toolbar row above the card title. Has no effect when `detailsCardSurface` is false. */
  exportPosition?: "footer" | "topRight" | "topLeft"
}

// Resolve DataVizPalette colors for chart series
const CHART_COLORS = Array.from({ length: 8 }, (_, i) =>
  getColorFromToken(DataVizPalette[`color${i + 1}` as keyof typeof DataVizPalette])
)

const chartTitleMap: Record<DetailsTab, string> = {
  subscriptions: "Emissions by subscription (last 12 months)",
  "resource-groups": "Emissions by resource group (last 12 months)",
  resources: "Emissions by resource (last 12 months)",
  "resource-types": "Emissions by resource type (last 12 months)",
  locations: "Emissions by location (last 12 months)",
}

const tableTitleMap: Record<DetailsTab, string> = {
  subscriptions: "Emissions by subscription (MoM)",
  "resource-groups": "Emissions by resource group (MoM)",
  resources: "Emissions by resource (MoM)",
  "resource-types": "Emissions by resource type (MoM)",
  locations: "Emissions by location (MoM)",
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  tabBar: {
    marginBottom: tokens.spacingVerticalXXL,
    // PR12 — prevent the TabList row from forcing horizontal scroll on its
    // parent. With min-width: 0 the Overflow wrapper can measure available
    // width and hide tabs into the More menu.
    minWidth: 0,
  },
  // PR12 — More menu trigger styled to sit visually inside the TabList row.
  moreMenuButton: {
    border: "none",
    backgroundColor: "transparent",
    minWidth: 0,
  },
  // PR12 — When the active tab is hidden in the overflow menu, mark the More
  // button with a brand-color underline so the user sees their selection lives
  // inside the menu. (Auto-promote should normally prevent this; safety net.)
  moreMenuButtonActive: {
    color: tokens.colorBrandForeground1,
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorBrandForeground1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  mainPanel: {
    display: "flex",
    gap: "40px",
    borderRadius: tokens.borderRadiusSmall,
    paddingTop: tokens.spacingVerticalXL,
    paddingRight: tokens.spacingHorizontalXL,
    paddingBottom: tokens.spacingVerticalXL,
    paddingLeft: tokens.spacingHorizontalXL,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    // PR6b reflow — allow inner flex children to shrink past their content
    // size so the chart can use useContainerWidth without overflowing.
    minWidth: 0,
    // PR6b reflow — below 1024px stack KPIs above the chart, matching the
    // Trends view's reflow threshold.
    "@media (max-width: 1023px)": {
      flexDirection: "column",
      gap: tokens.spacingVerticalL,
    },
  },
  kpiColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
    minWidth: "228px",
  },
  kpiBlock: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  kpiLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase200,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  kpiValueRow: {
    display: "flex",
    alignItems: "baseline",
  },
  kpiNumber: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "32px",
  },
  kpiUnit: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    lineHeight: "18px",
    marginLeft: tokens.spacingHorizontalXXS,
  },
  kpiTrend: {
    fontSize: tokens.fontSizeBase100,
    lineHeight: "14px",
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
  },
  trendDown: {
    color: tokens.colorPaletteGreenForeground1,
  },
  trendUp: {
    color: tokens.colorPaletteRedForeground1,
  },
  kpiLink: {
    fontSize: tokens.fontSizeBase100,
    lineHeight: "14px",
  },
  chartArea: {
    flex: 1,
    minWidth: 0,
    // PR6b reflow — clamp the AreaChart's drawing area so react-charting's
    // height-grow behavior on narrow widths can't push the card.
    minHeight: "380px",
  },
  // PR6b reflow — horizontal scroll wrapper for the Table at narrow viewports.
  tableScroll: {
    width: "100%",
    overflowX: "auto",
  },
  // PR6b reflow — keep the Table at its natural readable width so the
  // wrapper above scrolls horizontally instead of letting columns squish.
  tableMinWidth: {
    minWidth: "880px",
  },
  chartTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
    marginBottom: tokens.spacingVerticalS,
  },
  divider: {
    height: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
    marginTop: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalL,
  },
  tableCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    borderRadius: tokens.borderRadiusSmall,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    marginTop: tokens.spacingVerticalL,
  },
  tableCardFooter: {
    display: "flex",
    justifyContent: "flex-start",
  },
  exportSlotRow: {
    marginBottom: tokens.spacingVerticalS,
  },
  tableCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
  },
  tableCardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: tokens.spacingVerticalS,
  },
  pageArrow: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "24px",
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    padding: 0,
    margin: 0,
    cursor: "pointer",
    color: tokens.colorNeutralForeground1,
    ":disabled": {
      color: tokens.colorNeutralForegroundDisabled,
      cursor: "default",
    },
  },
  pageNumber: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "24px",
    paddingLeft: tokens.spacingHorizontalSNudge,
    paddingRight: tokens.spacingHorizontalSNudge,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    margin: 0,
    cursor: "pointer",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorBrandForeground1,
    fontFamily: "inherit",
    ":hover": {
      textDecorationLine: "underline",
    },
  },
  pageNumberActive: {
    color: tokens.colorNeutralForeground1,
    cursor: "default",
    ":hover": {
      textDecorationLine: "none",
    },
  },
  linkCell: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
  },
  changeUp: {
    color: tokens.colorPaletteRedForeground1,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    fontSize: tokens.fontSizeBase300,
  },
  changeDown: {
    color: tokens.colorPaletteGreenForeground1,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
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
  sortHeader: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
  },
  sortButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    padding: 0,
    margin: 0,
    cursor: "pointer",
    color: "inherit",
    font: "inherit",
    textAlign: "left",
    ":hover": {
      color: tokens.colorBrandForeground1,
    },
  },
})

// ── Stable lookup maps (built once at module scope) ──
const subLookup = new Map(allSubscriptions.map((s) => [s.id, s]))
const rgLookup = new Map(allResourceGroups.map((rg) => [rg.id, rg]))
const resLookup = new Map(allResources.map((r) => [r.id, r]))

// ── Unified table row type ──
interface DetailsTableRow {
  id: string
  name: string
  subscriptionName?: string
  resourceGroupName?: string
  resourceType?: string
  lastMonth: number
  prevMonth: number
  change: number
  mom: number
}

/** Hook to track container width for responsive charts */
function useContainerWidth(ref: React.RefObject<HTMLDivElement | null>) {
  const [width, setWidth] = useState(400)
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

/** PR12 — Render order matches the visible tab order so the overflow menu lists
 *  hidden tabs in their original position. */
const TAB_ORDER: { value: DetailsTab; label: string; resourceOnly?: boolean }[] = [
  { value: "subscriptions", label: "Subscriptions" },
  { value: "resource-groups", label: "Resource groups", resourceOnly: true },
  { value: "resources", label: "Resources", resourceOnly: true },
  { value: "resource-types", label: "Resource types" },
  { value: "locations", label: "Locations" },
]

/** PR12 — "More" menu trigger for the Details TabList. Renders only when at
 *  least one OverflowItem is hidden. Lists the hidden tabs in their original
 *  order; clicking one selects it (which auto-promotes its priority and brings
 *  it back into the visible row). */
function DetailsTabOverflowMenu({
  activeTab,
  hideResourceTabs,
  onTabSelect,
  buttonClassName,
  buttonActiveClassName,
}: {
  activeTab: DetailsTab
  hideResourceTabs: boolean
  onTabSelect: (value: DetailsTab) => void
  buttonClassName?: string
  buttonActiveClassName?: string
}) {
  const { ref, isOverflowing } = useOverflowMenu<HTMLButtonElement>()
  const visibleTabs = TAB_ORDER.filter((t) => !hideResourceTabs || !t.resourceOnly)
  if (!isOverflowing) return null
  // Active tab should be auto-promoted into visible items, but if for any
  // reason it's not, surface that state on the More button.
  const activeIsHidden = false // intentional: rely on priority auto-promote
  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton
          ref={ref}
          appearance="transparent"
          className={mergeClasses(
            buttonClassName,
            activeIsHidden && buttonActiveClassName
          )}
        >
          More
        </MenuButton>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {visibleTabs.map((t) => (
            <DetailsTabOverflowMenuItem
              key={t.value}
              tab={t}
              isActive={activeTab === t.value}
              onSelect={onTabSelect}
            />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}

/** PR12 — Renders a MenuItem only for tabs that are currently hidden (in the
 *  overflow). Visible tabs return null so the menu shows just the hidden set. */
function DetailsTabOverflowMenuItem({
  tab,
  isActive,
  onSelect,
}: {
  tab: { value: DetailsTab; label: string }
  isActive: boolean
  onSelect: (value: DetailsTab) => void
}) {
  const isVisible = useIsOverflowItemVisible(tab.value)
  if (isVisible) return null
  return (
    <MenuItem onClick={() => onSelect(tab.value)}>
      {tab.label}
      {isActive ? " (current)" : ""}
    </MenuItem>
  )
}

/** Emission Details view — area chart with tab-specific breakdowns + table. */
export default function EmissionDetails({ filters, exportSlot, hideResourceTabs = false, hideMethodologyFooter = false, isLoading = false, detailsCardSurface = false, exportPosition = "footer" }: EmissionDetailsProps) {
  const styles = useStyles()
  const [activeTab, setActiveTab] = useState<DetailsTab>("subscriptions")
  // If a tab gets hidden (e.g. switching into Billing Accounts view while on "resources"),
  // snap back to the always-available Subscriptions tab.
  useEffect(() => {
    if (hideResourceTabs && (activeTab === "resource-groups" || activeTab === "resources")) {
      setActiveTab("subscriptions")
    }
  }, [hideResourceTabs, activeTab])
  const [sortKey, setSortKey] = useState<SortKey>("lastMonth")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const PAGE_SIZE = 10
  const filteredIds = getFilteredSubscriptionIds(filters)
  const emScopeAll = filters.emissionsType === null
  const emScopeIncludes = (s: "scope1" | "scope2" | "scope3") =>
    emScopeAll || (filters.emissionsType !== null && filters.emissionsType.includes(s))
  const chartRef = useRef<HTMLDivElement>(null)
  const chartWidth = useContainerWidth(chartRef)

  const kpi = useMemo(() => {
    const raw = getKpiSummary(filteredIds)
    if (emScopeAll) return raw
    const totals = getMonthlyTotals(filteredIds).map((m) => {
      const s1 = emScopeIncludes("scope1") ? m.scope1 : 0
      const s2 = emScopeIncludes("scope2") ? m.scope2 : 0
      const s3 = emScopeIncludes("scope3") ? m.scope3 : 0
      return { ...m, scope1: s1, scope2: s2, scope3: s3, total: s1 + s2 + s3 }
    })
    const lastMonth = totals[totals.length - 1]
    const prevMonth = totals[totals.length - 2]
    const twelveMonthTotal = totals.reduce((sum, m) => sum + m.total, 0)
    const monthOverMonth =
      prevMonth.total > 0
        ? +(((lastMonth.total - prevMonth.total) / prevMonth.total) * 100).toFixed(1)
        : 0
    return {
      totalLast12Months: +twelveMonthTotal.toFixed(1),
      lastMonthTotal: +lastMonth.total.toFixed(1),
      lastMonthMoM: monthOverMonth,
      potentialMonthlySavings: raw.potentialMonthlySavings,
    }
  }, [filteredIds, emScopeAll, filters.emissionsType])
  const lastMonth = months[months.length - 1]
  const prevMonth = months[months.length - 2]
  const lastMonthLabel = formatMonthShort(lastMonth)
  const prevMonthLabel = formatMonthShort(prevMonth)

  // ── Area chart data (changes per tab) ──
  const areaChartData = useMemo(() => {
    switch (activeTab) {
      case "subscriptions":
        return computeSubscriptionChart(filteredIds)
      case "resource-groups":
        return computeBreakdownChart(
          (m) => getEmissionsByResourceGroup(m, filteredIds),
          (row) => row.name
        )
      case "resources":
        return computeBreakdownChart(
          (m) => getEmissionsByResource(m, filteredIds) as (EmissionRow & { resourceGroupName: string })[],
          (row) => {
            const r = row as EmissionRow & { resourceGroupName?: string }
            return r.resourceGroupName ? `${r.resourceGroupName}/${row.name}` : row.name
          }
        )
      case "resource-types":
        return computeBreakdownChart(
          (m) => getEmissionsByResourceTypeDetailed(m, filteredIds),
          (row) => row.name
        )
      case "locations":
        return computeBreakdownChart(
          (m) => getEmissionsByLocationDetailed(m, filteredIds),
          (row) => row.name
        )
    }
  }, [activeTab, filteredIds])

  // ── Table data (changes per tab) ──
  const tableRows = useMemo((): DetailsTableRow[] => {
    let rows: DetailsTableRow[]
    switch (activeTab) {
      case "subscriptions":
        rows = computeSubscriptionTable(lastMonth, prevMonth, filteredIds)
        break
      case "resource-groups":
        rows = computeResourceGroupTable(lastMonth, prevMonth, filteredIds)
        break
      case "resources":
        rows = computeResourceTable(lastMonth, prevMonth, filteredIds)
        break
      case "resource-types":
        rows = computeSimpleTable(
          () => getEmissionsByResourceTypeDetailed(lastMonth, filteredIds),
          () => getEmissionsByResourceTypeDetailed(prevMonth, filteredIds)
        )
        break
      case "locations":
        rows = computeSimpleTable(
          () => getEmissionsByLocationDetailed(lastMonth, filteredIds),
          () => getEmissionsByLocationDetailed(prevMonth, filteredIds)
        )
        break
    }
    return [...rows].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      let cmp: number
      if (typeof av === "number" && typeof bv === "number") {
        cmp = av - bv
      } else {
        cmp = String(av ?? "").localeCompare(String(bv ?? ""))
      }
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [activeTab, lastMonth, prevMonth, filteredIds, sortKey, sortDir])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir("desc")
    }
  }

  const renderSortIcon = (key: SortKey) => {
    if (sortKey !== key) return null
    return sortDir === "desc" ? <ArrowDown12Filled /> : <ArrowUp12Filled />
  }

  return (
    <div className={styles.root}>
      {/* PR12 — Wrap TabList in Overflow so tabs collapse into a "More" menu at
          narrow widths instead of forcing horizontal scroll on the parent.
          Priority order (higher = stays visible longer): Subscriptions (4),
          Resource types (3), Resource groups (2), Locations (1), Resources (0).
          The active tab is auto-promoted to priority 99 so the user's current
          selection is always visible. */}
      <Overflow minimumVisible={1}>
        <TabList
          className={styles.tabBar}
          selectedValue={activeTab}
          onTabSelect={(_, data) => {
            setActiveTab(data.value as DetailsTab)
            setSortKey("lastMonth")
            setSortDir("desc")
            setCurrentPage(1)
          }}
        >
          <OverflowItem id="subscriptions" priority={activeTab === "subscriptions" ? 99 : 4}>
            <Tab value="subscriptions">Subscriptions</Tab>
          </OverflowItem>
          {!hideResourceTabs && (
            <OverflowItem id="resource-groups" priority={activeTab === "resource-groups" ? 99 : 2}>
              <Tab value="resource-groups">Resource groups</Tab>
            </OverflowItem>
          )}
          {!hideResourceTabs && (
            <OverflowItem id="resources" priority={activeTab === "resources" ? 99 : 0}>
              <Tab value="resources">Resources</Tab>
            </OverflowItem>
          )}
          <OverflowItem id="resource-types" priority={activeTab === "resource-types" ? 99 : 3}>
            <Tab value="resource-types">Resource types</Tab>
          </OverflowItem>
          <OverflowItem id="locations" priority={activeTab === "locations" ? 99 : 1}>
            <Tab value="locations">Locations</Tab>
          </OverflowItem>
          <DetailsTabOverflowMenu
            activeTab={activeTab}
            hideResourceTabs={hideResourceTabs}
            onTabSelect={(value) => {
              setActiveTab(value)
              setSortKey("lastMonth")
              setSortDir("desc")
              setCurrentPage(1)
            }}
            buttonClassName={styles.moreMenuButton}
            buttonActiveClassName={styles.moreMenuButtonActive}
          />
        </TabList>
      </Overflow>

      {/* Main panel: KPIs + area chart (or skeleton placeholder while loading) */}
      {isLoading ? (
        <Skeleton animation="wave">
          <div className={styles.mainPanel}>
            <div className={styles.kpiColumn}>
              {[0, 1, 2].map((i) => (
                <div key={i} className={styles.kpiBlock}>
                  <SkeletonItem shape="rectangle" size={12} style={{ width: "70%" }} />
                  <SkeletonItem shape="rectangle" size={32} style={{ width: "60%" }} />
                  <SkeletonItem shape="rectangle" size={12} style={{ width: "50%" }} />
                </div>
              ))}
            </div>
            <div className={styles.chartArea}>
              <SkeletonItem shape="rectangle" size={16} style={{ width: "240px" }} />
              <SkeletonItem shape="rectangle" style={{ height: "300px", borderRadius: tokens.borderRadiusMedium, marginTop: tokens.spacingVerticalS }} />
            </div>
          </div>
        </Skeleton>
      ) : (
      <div className={styles.mainPanel}>
        <div className={styles.kpiColumn}>
          <div className={styles.kpiBlock}>
            <Text className={styles.kpiLabel}>
              Total carbon emissions <Info12Regular />
            </Text>
            <span className={styles.kpiValueRow}>
              <Text className={styles.kpiNumber}>{kpi.totalLast12Months.toLocaleString()}</Text>
              <Text className={styles.kpiUnit}>kgCO2e</Text>
            </span>
            <Link className={styles.kpiLink} href="#">View emissions equivalents</Link>
          </div>

          <div className={styles.kpiBlock}>
            <Text className={styles.kpiLabel}>
              Carbon emissions for the last month <Info12Regular />
            </Text>
            <span className={styles.kpiValueRow}>
              <Text className={styles.kpiNumber}>{kpi.lastMonthTotal.toLocaleString()}</Text>
              <Text className={styles.kpiUnit}>kgCO2e</Text>
            </span>
            <span className={`${styles.kpiTrend} ${kpi.lastMonthMoM <= 0 ? styles.trendDown : styles.trendUp}`}>
              {kpi.lastMonthMoM <= 0 ? <ArrowDown12Filled /> : <ArrowUp12Filled />} {Math.abs(kpi.lastMonthMoM)}% from prev month
            </span>
            <Link className={styles.kpiLink} href="#">View emissions equivalents</Link>
          </div>

          <div className={styles.kpiBlock}>
            <Text className={styles.kpiLabel}>
              Potential monthly emissions reductions <Info12Regular />
            </Text>
            <span className={styles.kpiValueRow}>
              <Text className={styles.kpiNumber}>{kpi.potentialMonthlySavings.toLocaleString()}</Text>
              <Text className={styles.kpiUnit}>kgCO2e</Text>
            </span>
            <Link className={styles.kpiLink} href="#">See all reduction opportunities</Link>
          </div>
        </div>

        <div className={styles.chartArea} ref={chartRef}>
          <Text className={styles.chartTitle}>{chartTitleMap[activeTab]}</Text>
          <AreaChart
            key={`area-${Math.floor(chartWidth / 40)}`}
            data={{
              chartTitle: chartTitleMap[activeTab],
              lineChartData: areaChartData,
            }}
            height={300}
            width={Math.max(Math.floor((chartWidth - 32) / 40) * 40, 280)}
            yAxisTitle="Carbon emissions (kgCO2e)"
          />
        </div>
      </div>
      )}

      {/* Divider between card and table — only in the v1 baseline; v2 (detailsCardSurface) wraps the table in its own card, so the divider is redundant. */}
      {!detailsCardSurface && <div className={styles.divider} />}

      {/* Breakdown table (or skeleton rows while loading) */}
      {isLoading ? (
        <Skeleton animation="wave">
          <div className={detailsCardSurface ? styles.tableCard : undefined}>
            {/* Header row */}
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: tokens.spacingHorizontalL, paddingTop: tokens.spacingVerticalM, paddingBottom: tokens.spacingVerticalM, borderBottomWidth: "1px", borderBottomStyle: "solid", borderBottomColor: tokens.colorNeutralStroke2 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <SkeletonItem key={i} shape="rectangle" size={12} style={{ width: "70%" }} />
              ))}
            </div>
            {/* Body rows */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: tokens.spacingHorizontalL, paddingTop: tokens.spacingVerticalM, paddingBottom: tokens.spacingVerticalM, alignItems: "center" }}>
                <SkeletonItem shape="rectangle" size={16} />
                <SkeletonItem shape="rectangle" size={16} style={{ width: "60%" }} />
                <SkeletonItem shape="rectangle" size={16} style={{ width: "60%" }} />
                <SkeletonItem shape="rectangle" size={16} style={{ width: "40%" }} />
                <SkeletonItem shape="rectangle" size={16} style={{ width: "40%" }} />
              </div>
            ))}
          </div>
        </Skeleton>
      ) : (
      <div className={detailsCardSurface ? styles.tableCard : undefined}>
        {detailsCardSurface && exportPosition === "topLeft" && exportSlot && (
          <div className={styles.exportSlotRow}>{exportSlot}</div>
        )}
        {detailsCardSurface && (
          exportPosition === "topRight" && exportSlot ? (
            <div className={styles.tableCardHeader}>
              <Text className={styles.tableCardTitle}>{tableTitleMap[activeTab]}</Text>
              {exportSlot}
            </div>
          ) : (
            <Text className={styles.tableCardTitle}>{tableTitleMap[activeTab]}</Text>
          )
        )}
        {/* v1 baseline: export button sits directly above the table (toolbar-style). v2 moves it to a footer below the pagination. */}
        {!detailsCardSurface && exportSlot && <div className={styles.exportSlotRow}>{exportSlot}</div>}
        <div className={styles.tableScroll}>
        <Table className={styles.tableMinWidth}>
          <TableHeader>
            <TableRow>
              {(activeTab === "subscriptions" || activeTab === "resource-groups" || activeTab === "resources") && (
                <TableHeaderCell>
                  <button type="button" className={styles.sortButton} onClick={() => handleSort(activeTab === "subscriptions" ? "name" : "subscriptionName")}>
                    Subscription name {renderSortIcon(activeTab === "subscriptions" ? "name" : "subscriptionName")}
                  </button>
                </TableHeaderCell>
              )}
              {(activeTab === "resource-groups" || activeTab === "resources") && (
                <TableHeaderCell>
                  <button type="button" className={styles.sortButton} onClick={() => handleSort(activeTab === "resource-groups" ? "name" : "resourceGroupName")}>
                    Resource groups {renderSortIcon(activeTab === "resource-groups" ? "name" : "resourceGroupName")}
                  </button>
                </TableHeaderCell>
              )}
              {activeTab === "resources" && (
                <>
                  <TableHeaderCell>
                    <button type="button" className={styles.sortButton} onClick={() => handleSort("name")}>
                      Resources {renderSortIcon("name")}
                    </button>
                  </TableHeaderCell>
                  <TableHeaderCell>
                    <button type="button" className={styles.sortButton} onClick={() => handleSort("resourceType")}>
                      Resource type {renderSortIcon("resourceType")}
                    </button>
                  </TableHeaderCell>
                </>
              )}
              {activeTab === "resource-types" && (
                <TableHeaderCell>
                  <button type="button" className={styles.sortButton} onClick={() => handleSort("name")}>
                    Resource type {renderSortIcon("name")}
                  </button>
                </TableHeaderCell>
              )}
              {activeTab === "locations" && (
                <TableHeaderCell>
                  <button type="button" className={styles.sortButton} onClick={() => handleSort("name")}>
                    Location name {renderSortIcon("name")}
                  </button>
                </TableHeaderCell>
              )}
              <TableHeaderCell>
                <button type="button" className={styles.sortButton} onClick={() => handleSort("lastMonth")}>
                  {lastMonthLabel} emissions {renderSortIcon("lastMonth")}
                </button>
              </TableHeaderCell>
              <TableHeaderCell>
                <button type="button" className={styles.sortButton} onClick={() => handleSort("prevMonth")}>
                  {prevMonthLabel} emissions {renderSortIcon("prevMonth")}
                </button>
              </TableHeaderCell>
              <TableHeaderCell>
                <button type="button" className={styles.sortButton} onClick={() => handleSort("change")}>
                  Change {renderSortIcon("change")}
                </button>
              </TableHeaderCell>
              <TableHeaderCell>
                <button type="button" className={styles.sortButton} onClick={() => handleSort("mom")}>
                  MoM% {renderSortIcon("mom")}
                </button>
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(detailsCardSurface
              ? tableRows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
              : tableRows.slice(0, 20)
            ).map((row, i) => (
              <TableRow key={`${row.id}-${i}`}>
                {/* Tab-specific cells */}
                {(activeTab === "subscriptions") && (
                  <TableCell>
                    <Link className={styles.linkCell} href="#">{row.name}</Link>
                  </TableCell>
                )}
                {(activeTab === "resource-groups") && (
                  <>
                    <TableCell>
                      <Link className={styles.linkCell} href="#">{row.subscriptionName}</Link>
                    </TableCell>
                    <TableCell>
                      <Link className={styles.linkCell} href="#">{row.name}</Link>
                    </TableCell>
                  </>
                )}
                {activeTab === "resources" && (
                  <>
                    <TableCell>
                      <Link className={styles.linkCell} href="#">{row.subscriptionName}</Link>
                    </TableCell>
                    <TableCell>
                      <Link className={styles.linkCell} href="#">{row.resourceGroupName}</Link>
                    </TableCell>
                    <TableCell>
                      <Link className={styles.linkCell} href="#">{row.name}</Link>
                    </TableCell>
                    <TableCell>
                      <Text size={300}>{row.resourceType}</Text>
                    </TableCell>
                  </>
                )}
                {activeTab === "resource-types" && (
                  <TableCell><Text size={300}>{row.name}</Text></TableCell>
                )}
                {activeTab === "locations" && (
                  <TableCell><Text size={300}>{row.name}</Text></TableCell>
                )}
                {/* Common emission cells */}
                <TableCell><Text size={300}>{formatEmission(row.lastMonth)}</Text></TableCell>
                <TableCell><Text size={300}>{formatEmission(row.prevMonth)}</Text></TableCell>
                <TableCell>
                  {row.change !== 0 ? (
                    <span className={row.change > 0 ? styles.changeUp : styles.changeDown}>
                      {row.change > 0 ? <ArrowUp12Filled /> : <ArrowDown12Filled />}
                      {formatChange(row.change)}
                    </span>
                  ) : "—"}
                </TableCell>
                <TableCell>
                  {row.mom !== 0 ? (
                    <span className={row.mom > 0 ? styles.changeUp : styles.changeDown}>
                      {row.mom > 0 ? <ArrowUp12Filled /> : <ArrowDown12Filled />} {Math.abs(row.mom).toFixed(1)}%
                    </span>
                  ) : "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
        {detailsCardSurface && (() => {
          const totalPages = Math.max(1, Math.ceil(tableRows.length / PAGE_SIZE))
          const page = Math.min(currentPage, totalPages)
          if (totalPages <= 1) return null
          // Windowed page numbers — show up to 5 centered around the current page.
          const MAX_VISIBLE = 5
          const half = Math.floor(MAX_VISIBLE / 2)
          let start = Math.max(1, page - half)
          const end = Math.min(totalPages, start + MAX_VISIBLE - 1)
          start = Math.max(1, end - MAX_VISIBLE + 1)
          const pageList: number[] = []
          for (let p = start; p <= end; p++) pageList.push(p)
          return (
            <div className={styles.pagination}>
              <button
                type="button"
                className={styles.pageArrow}
                aria-label="Previous page"
                disabled={page <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft16Regular />
              </button>
              {pageList.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={p === page ? `${styles.pageNumber} ${styles.pageNumberActive}` : styles.pageNumber}
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? "page" : undefined}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                className={styles.pageArrow}
                aria-label="Next page"
                disabled={page >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight16Regular />
              </button>
            </div>
          )
        })()}
        {detailsCardSurface && exportSlot && exportPosition === "footer" && <div className={styles.tableCardFooter}>{exportSlot}</div>}
      </div>
      )}

      {!hideMethodologyFooter && (
        <Text className={styles.footer}>
          The emissions data presented here is calculated based on the methodology documented in this white paper:{" "}
          <Link href="#" inline>A new approach for scope 3 emissions transparency.</Link>{" "}
          The findings, interpretations and conclusions presented in the report are for informational purposes only.
        </Text>
      )}
    </div>
  )
}

// ── Formatting helpers ──

function formatMonthShort(month: string): string {
  const [year, m] = month.split("-")
  const date = new Date(parseInt(year), parseInt(m) - 1)
  return date.toLocaleDateString("en-US", { month: "short" })
}

function formatChange(change: number): string {
  const abs = Math.abs(change)
  if (abs >= 1000) return `${(abs / 1000).toFixed(1)} mtCO2e`
  if (abs >= 1) return `${abs.toFixed(1)} kgCO2e`
  return `${(abs * 1000).toFixed(1)} gCO2e`
}

function formatEmission(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1)} mtCO2e`
  if (value >= 1) return `${value.toFixed(1)} kgCO2e`
  return `${(value * 1000).toFixed(1)} gCO2e`
}

// ── Area chart helpers ──

function computeSubscriptionChart(
  filteredIds: string[] | undefined
): { legend: string; data: { x: Date; y: number }[]; color: string }[] {
  const ids = filteredIds ? new Set(filteredIds) : null
  const subMonthly = new Map<string, Map<string, number>>()

  for (const e of monthlyEmissions) {
    if (ids && !ids.has(e.subscriptionId)) continue
    const mm = subMonthly.get(e.subscriptionId) ?? new Map<string, number>()
    mm.set(e.month, (mm.get(e.month) ?? 0) + e.scope1 + e.scope2 + e.scope3)
    subMonthly.set(e.subscriptionId, mm)
  }

  const lastMonth = months[months.length - 1]
  const ranked = Array.from(subMonthly.entries())
    .map(([subId, mm]) => ({ subId, total: mm.get(lastMonth) ?? 0 }))
    .sort((a, b) => b.total - a.total)

  const top7 = ranked.slice(0, 7)
  const top7Set = new Set(top7.map((t) => t.subId))

  const series = top7.map((item, idx) => ({
    legend: subLookup.get(item.subId)?.name ?? item.subId,
    data: months.map((m) => ({
      x: new Date(m + "-15"),
      y: +(subMonthly.get(item.subId)?.get(m) ?? 0).toFixed(2),
    })),
    color: CHART_COLORS[idx % CHART_COLORS.length],
  }))

  if (ranked.length > 7) {
    series.push({
      legend: "Others",
      data: months.map((m) => {
        let total = 0
        for (const [subId, mm] of subMonthly) {
          if (!top7Set.has(subId)) total += mm.get(m) ?? 0
        }
        return { x: new Date(m + "-15"), y: +total.toFixed(2) }
      }),
      color: CHART_COLORS[7],
    })
  }

  return series
}

function computeBreakdownChart<T extends { id: string; name: string; total: number }>(
  getBreakdown: (month: string) => T[],
  getLegend: (row: T) => string
): { legend: string; data: { x: Date; y: number }[]; color: string }[] {
  const monthData = months.map((m) => {
    const rows = getBreakdown(m)
    const map = new Map(rows.map((r) => [r.id, r]))
    return { month: m, rows, map }
  })

  const lastRows = monthData[monthData.length - 1].rows
  const top7 = lastRows.slice(0, 7)
  const top7Ids = new Set(top7.map((t) => t.id))

  const series = top7.map((item, idx) => ({
    legend: getLegend(item),
    data: monthData.map((md) => {
      const entry = md.map.get(item.id)
      return { x: new Date(md.month + "-15"), y: +(entry?.total ?? 0).toFixed(2) }
    }),
    color: CHART_COLORS[idx % CHART_COLORS.length],
  }))

  if (lastRows.length > 7) {
    series.push({
      legend: "Others",
      data: monthData.map((md) => {
        let othersTotal = 0
        for (const r of md.rows) {
          if (!top7Ids.has(r.id)) othersTotal += r.total
        }
        return { x: new Date(md.month + "-15"), y: +othersTotal.toFixed(2) }
      }),
      color: CHART_COLORS[7],
    })
  }

  return series
}

// ── Table data helpers ──

function computeSubscriptionTable(
  lastMonth: string,
  prevMonth: string,
  filteredIds?: string[]
): DetailsTableRow[] {
  const ids = filteredIds ? new Set(filteredIds) : null

  const aggMonth = (month: string) => {
    const map = new Map<string, number>()
    for (const e of monthlyEmissions) {
      if (e.month !== month) continue
      if (ids && !ids.has(e.subscriptionId)) continue
      map.set(e.subscriptionId, (map.get(e.subscriptionId) ?? 0) + e.scope1 + e.scope2 + e.scope3)
    }
    return map
  }

  const lastMap = aggMonth(lastMonth)
  const prevMap = aggMonth(prevMonth)
  const rows: DetailsTableRow[] = []

  for (const [subId, lastVal] of lastMap) {
    const sub = subLookup.get(subId)
    if (!sub) continue
    const prevVal = prevMap.get(subId) ?? 0
    const change = lastVal - prevVal
    const mom = prevVal > 0 ? +((change / prevVal) * 100).toFixed(1) : 0
    rows.push({ id: subId, name: sub.name, lastMonth: lastVal, prevMonth: prevVal, change, mom })
  }

  return rows.sort((a, b) => b.lastMonth - a.lastMonth).slice(0, 50)
}

function computeResourceGroupTable(
  lastMonth: string,
  prevMonth: string,
  filteredIds?: string[]
): DetailsTableRow[] {
  const lastRows = getEmissionsByResourceGroup(lastMonth, filteredIds)
  const prevRows = getEmissionsByResourceGroup(prevMonth, filteredIds)
  const prevMap = new Map(prevRows.map((r) => [r.id, r.total]))

  return lastRows.slice(0, 50).map((row) => {
    const prev = prevMap.get(row.id) ?? 0
    const change = row.total - prev
    const mom = prev > 0 ? +((change / prev) * 100).toFixed(1) : 0
    const rg = rgLookup.get(row.id)
    const sub = rg ? subLookup.get(rg.subscriptionId) : undefined
    return {
      id: row.id,
      name: row.name,
      subscriptionName: sub?.name ?? "—",
      lastMonth: row.total,
      prevMonth: prev,
      change,
      mom,
    }
  })
}

function computeResourceTable(
  lastMonth: string,
  prevMonth: string,
  filteredIds?: string[]
): DetailsTableRow[] {
  const lastRows = getEmissionsByResource(lastMonth, filteredIds)
  const prevRows = getEmissionsByResource(prevMonth, filteredIds)
  const prevMap = new Map(prevRows.map((r) => [r.id, r.total]))

  return lastRows.slice(0, 50).map((row) => {
    const prev = prevMap.get(row.id) ?? 0
    const change = row.total - prev
    const mom = prev > 0 ? +((change / prev) * 100).toFixed(1) : 0
    const res = resLookup.get(row.id)
    const sub = res ? subLookup.get(res.subscriptionId) : undefined
    return {
      id: row.id,
      name: row.name,
      subscriptionName: sub?.name ?? "—",
      resourceGroupName: row.resourceGroupName,
      resourceType: row.type,
      lastMonth: row.total,
      prevMonth: prev,
      change,
      mom,
    }
  })
}

function computeSimpleTable(
  getLastMonth: () => EmissionRow[],
  getPrevMonth: () => EmissionRow[]
): DetailsTableRow[] {
  const lastRows = getLastMonth()
  const prevRows = getPrevMonth()
  const prevMap = new Map(prevRows.map((r) => [r.id, r.total]))

  return lastRows.map((row) => {
    const prev = prevMap.get(row.id) ?? 0
    const change = row.total - prev
    const mom = prev > 0 ? +((change / prev) * 100).toFixed(1) : 0
    return { id: row.id, name: row.name, lastMonth: row.total, prevMonth: prev, change, mom }
  })
}
