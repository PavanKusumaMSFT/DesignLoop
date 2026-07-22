"use client"

import { useMemo, useState, type ReactNode } from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Link,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@fluentui/react-components"
import { Info12Regular, ArrowUp12Filled, ArrowDown12Filled, VirtualNetwork16Regular, TreeDeciduousFilled } from "@fluentui/react-icons"
import { savingsOpportunities, allSubscriptions } from "./data/mock-data"
import type { FilterState } from "./carbon-filters"
import { getFilteredSubscriptionIds } from "./carbon-filters"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

interface EmissionReductionsProps {
  filters: FilterState
  /** Optional element rendered at the bottom-left of the card footer (e.g. an Export to CSV button). Only renders when `cardSurface` is true. */
  exportSlot?: ReactNode
  /** When true, wraps KPIs + table in an elevated card surface with an export footer. Defaults to false to match the live Carbon Optimization extension (v1 baseline). */
  cardSurface?: boolean
  /** Where to render `exportSlot` when `cardSurface` is true. "footer" (default) pins it to the bottom-left of the card. "topRight" pins it to the top-right of the card, alongside the title. "topLeft" places a compact toolbar row above the card title. Has no effect when `cardSurface` is false. */
  exportPosition?: "footer" | "topRight" | "topLeft"
}

type SortKey = "subscription" | "resourceGroup" | "resource" | "recommendation" | "emissions" | "cost"
type SortDir = "asc" | "desc"

interface ReductionRow {
  id: string
  subscription: string
  resourceGroup: string
  resource: string
  recommendation: string
  emissions: number
  cost: number
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
    marginTop: tokens.spacingVerticalXL,
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
    borderRadius: tokens.borderRadiusSmall,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
  },
  cardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
  },
  cardFooter: {
    display: "flex",
    justifyContent: "flex-start",
  },
  cardToolbarRow: {
    display: "flex",
    justifyContent: "flex-start",
  },
  kpiRow: {
    display: "flex",
    gap: "40px",
    alignItems: "flex-start",
  },
  kpiBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  kpiLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: "18px",
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    whiteSpace: "nowrap",
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
  kpiValueRow: {
    display: "flex",
    alignItems: "baseline",
  },
  treeRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  treeValueGroup: {
    display: "flex",
    alignItems: "baseline",
  },
  treeIcon: {
    fontSize: "24px",
    color: tokens.colorPaletteGreenForeground1,
  },
  treeText: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "32px",
  },
  treeUnit: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    lineHeight: "18px",
    marginLeft: tokens.spacingHorizontalXXS,
  },
  kpiSubLink: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: "18px",
  },
  linkCell: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
  },
  resourceCell: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
  },
  resourceIcon: {
    color: tokens.colorBrandForeground1,
  },
  cellText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
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

/** Emission Reductions view — KPI summary + sortable recommendations table.
 *  By default renders flat on the page (matches the live Carbon Optimization extension).
 *  Pass `cardSurface` to wrap KPIs + table in an elevated card with an export footer (used by the company-level exploration). */
export default function EmissionReductions({ filters, exportSlot, cardSurface = false, exportPosition = "footer" }: EmissionReductionsProps) {
  const styles = useStyles()
  const [sortKey, setSortKey] = useState<SortKey>("emissions")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const filteredIds = getFilteredSubscriptionIds(filters)

  const subMap = useMemo(() => new Map(allSubscriptions.map((s) => [s.id, s])), [])

  const filteredOpportunities = useMemo(() => {
    if (!filteredIds) return savingsOpportunities
    const idSet = new Set(filteredIds)
    return savingsOpportunities.filter((s) => idSet.has(s.subscriptionId))
  }, [filteredIds])

  const totalRecommendations = filteredOpportunities.length
  const totalSavings = filteredOpportunities.reduce((sum, s) => sum + s.savingsKgCO2e, 0)
  const treesEquiv = Math.round(totalSavings * 17.5)
  const costSavings = totalSavings * 2200

  const rows: ReductionRow[] = useMemo(
    () =>
      filteredOpportunities.map((opp) => {
        const sub = subMap.get(opp.subscriptionId)
        return {
          id: opp.id,
          subscription: sub?.name ?? opp.subscriptionId,
          resourceGroup: sub?.resourceGroup ?? "—",
          resource: opp.resourceName,
          recommendation: opp.description,
          emissions: opp.savingsKgCO2e,
          cost: opp.savingsKgCO2e * 2200,
        }
      }),
    [filteredOpportunities, subMap]
  )

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      let cmp: number
      if (typeof av === "number" && typeof bv === "number") {
        cmp = av - bv
      } else {
        cmp = String(av).localeCompare(String(bv))
      }
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [rows, sortKey, sortDir])

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

  const savingsFormat = formatSavings(totalSavings)

  const inner = (
    <>
      {/* KPI row */}
      <div className={styles.kpiRow}>
        <div className={styles.kpiBlock}>
          <Text className={styles.kpiLabel}>Total recommendations</Text>
          <Text className={styles.kpiNumber}>{totalRecommendations}</Text>
        </div>

        <div className={styles.kpiBlock}>
          <Text className={styles.kpiLabel}>
            Potential monthly emissions savings <Info12Regular />
          </Text>
          <span className={styles.kpiValueRow}>
            <Text className={styles.kpiNumber}>{savingsFormat.value}</Text>
            <Text className={styles.kpiUnit}>{savingsFormat.unit}</Text>
          </span>
        </div>

        <div className={styles.kpiBlock}>
          <Text className={styles.kpiLabel}>
            Carbon savings equivalent <Info12Regular />
          </Text>
          <div className={styles.treeRow}>
            <TreeDeciduousFilled className={styles.treeIcon} />
            <span className={styles.treeValueGroup}>
              <Text className={styles.treeText}>{treesEquiv.toLocaleString()}</Text>
              <Text className={styles.treeUnit}>planted trees</Text>
            </span>
          </div>
          <Link className={styles.kpiSubLink} href="#">more equivalents</Link>
        </div>

        <div className={styles.kpiBlock}>
          <Text className={styles.kpiLabel}>
            Potential monthly cost savings <Info12Regular />
          </Text>
          <Text className={styles.kpiNumber}>${formatCost(costSavings)}</Text>
        </div>
      </div>

      {/* Recommendations table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <button type="button" className={styles.sortButton} onClick={() => handleSort("subscription")}>
                Subscription {renderSortIcon("subscription")}
              </button>
            </TableHeaderCell>
            <TableHeaderCell>
              <button type="button" className={styles.sortButton} onClick={() => handleSort("resourceGroup")}>
                Resource group {renderSortIcon("resourceGroup")}
              </button>
            </TableHeaderCell>
            <TableHeaderCell>
              <button type="button" className={styles.sortButton} onClick={() => handleSort("resource")}>
                Resource {renderSortIcon("resource")}
              </button>
            </TableHeaderCell>
            <TableHeaderCell>
              <button type="button" className={styles.sortButton} onClick={() => handleSort("recommendation")}>
                Recommendation {renderSortIcon("recommendation")}
              </button>
            </TableHeaderCell>
            <TableHeaderCell>
              <button type="button" className={styles.sortButton} onClick={() => handleSort("emissions")}>
                Emissions savings {renderSortIcon("emissions")}
              </button>
            </TableHeaderCell>
            <TableHeaderCell>
              <button type="button" className={styles.sortButton} onClick={() => handleSort("cost")}>
                Cost savings {renderSortIcon("cost")}
              </button>
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Link className={styles.linkCell} href="#">{row.subscription}</Link>
              </TableCell>
              <TableCell>
                <Link className={styles.linkCell} href="#">{row.resourceGroup}</Link>
              </TableCell>
              <TableCell>
                <Link className={styles.resourceCell} href="#">
                  <VirtualNetwork16Regular className={styles.resourceIcon} />
                  {row.resource}
                </Link>
              </TableCell>
              <TableCell>
                <Link className={styles.linkCell} href="#">{row.recommendation}</Link>
              </TableCell>
              <TableCell>
                <Text className={styles.cellText}>{formatEmission(row.emissions)}</Text>
              </TableCell>
              <TableCell>
                <Text className={styles.cellText}>${row.cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {cardSurface && exportSlot && exportPosition === "footer" && <div className={styles.cardFooter}>{exportSlot}</div>}
    </>
  )

  return (
    <div className={styles.root}>
      {cardSurface ? (
        <div className={styles.card}>
          {exportPosition === "topLeft" && exportSlot && (
            <div className={styles.cardToolbarRow}>{exportSlot}</div>
          )}
          {exportPosition === "topRight" && exportSlot ? (
            <div className={styles.cardHeader}>
              <Text className={styles.cardTitle}>Optimization recommendations</Text>
              {exportSlot}
            </div>
          ) : (
            <Text className={styles.cardTitle}>Optimization recommendations</Text>
          )}
          {inner}
        </div>
      ) : (
        inner
      )}
    </div>
  )
}

// ── Formatting helpers ──

function formatSavings(value: number): { value: string; unit: string } {
  if (value >= 1) return { value: value.toFixed(1), unit: "mtCO2e" }
  return { value: (value * 1000).toFixed(0), unit: "kgCO2e" }
}

function formatEmission(value: number): string {
  if (value >= 1) return `${value.toFixed(1)} mtCO2e`
  if (value >= 0.001) return `${(value * 1000).toFixed(1)} kgCO2e`
  return `${(value * 1_000_000).toFixed(0)} gCO2e`
}

function formatCost(value: number): string {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
  return value.toLocaleString(undefined, { maximumFractionDigits: 0 })
}
