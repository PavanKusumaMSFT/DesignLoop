"use client"

import { makeStyles, tokens as fluentTokens, Skeleton, SkeletonItem } from "@fluentui/react-components"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  // Mirrors EmissionTrends.mainPanel layout: KPI column + chart area
  mainPanel: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    borderRadius: tokens.borderRadiusSmall,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
  },
  mainPanelRow: {
    display: "flex",
    gap: "40px",
  },
  kpiColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    width: "260px",
    flexShrink: 0,
  },
  kpiBlock: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  chartArea: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  // Mirrors EmissionTrends.bottomRow: 3 equal cards
  bottomRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: tokens.spacingHorizontalL,
  },
  bottomCard: {
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minHeight: "320px",
  },
  bottomCardCenter: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomCardLegend: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  // Savings opportunities section: title + horizontal row of 3 cards
  savingsSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  savingsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: tokens.spacingHorizontalL,
  },
  savingsCard: {
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minHeight: "180px",
  },
  footerText: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    paddingTop: tokens.spacingVerticalM,
  },
  // Single-card layouts (Details / Reductions)
  card: {
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  tabRow: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalS,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorNeutralStroke2,
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: tokens.spacingHorizontalL,
    alignItems: "center",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
  },
  reductionRow: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
    alignItems: "center",
  },
  // Reductions skeleton: single card mirroring EmissionReductions (root marginTop + card padding/shadow + KPI row + table + footer)
  reductionsRoot: {
    display: "flex",
    flexDirection: "column",
    marginTop: tokens.spacingVerticalXL,
  },
  reductionsKpiRow: {
    display: "flex",
    gap: "40px",
    alignItems: "flex-start",
  },
  reductionsKpiBlock: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    minWidth: "180px",
  },
  reductionsTable: {
    display: "flex",
    flexDirection: "column",
  },
  reductionsTableHeader: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr 1.2fr 1.5fr 1fr 1fr",
    gap: tokens.spacingHorizontalL,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorNeutralStroke2,
  },
  reductionsTableRow: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr 1.2fr 1.5fr 1fr 1fr",
    gap: tokens.spacingHorizontalL,
    alignItems: "center",
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
  },
  reductionsFooter: {
    paddingTop: tokens.spacingVerticalM,
  },
})

/** Skeleton placeholder mimicking the EmissionTrends layout: KPI column + bar chart + 3 bottom cards (donuts/carbon intensity). */
export function TrendsSkeleton() {
  const styles = useStyles()
  return (
    <Skeleton animation="wave" className={styles.root}>
      <div className={styles.mainPanel}>
        <div className={styles.mainPanelRow}>
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
            <SkeletonItem shape="rectangle" size={16} style={{ width: "180px" }} />
            <SkeletonItem shape="rectangle" style={{ height: "320px", borderRadius: tokens.borderRadiusMedium }} />
          </div>
        </div>
      </div>

      <div className={styles.bottomRow}>
        {/* Two donut cards */}
        {[0, 1].map((i) => (
          <div key={i} className={styles.bottomCard}>
            <SkeletonItem shape="rectangle" size={16} style={{ width: "75%" }} />
            <div className={styles.bottomCardCenter}>
              <SkeletonItem shape="circle" size={128} />
            </div>
            <div className={styles.bottomCardLegend}>
              <SkeletonItem shape="rectangle" size={12} style={{ width: "85%" }} />
              <SkeletonItem shape="rectangle" size={12} style={{ width: "70%" }} />
              <SkeletonItem shape="rectangle" size={12} style={{ width: "60%" }} />
            </div>
          </div>
        ))}
        {/* Carbon intensity card (no donut, just stacked rows) */}
        <div className={styles.bottomCard}>
          <SkeletonItem shape="rectangle" size={16} style={{ width: "75%" }} />
          <div className={styles.bottomCardLegend}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <SkeletonItem key={i} shape="rectangle" size={16} style={{ width: `${90 - i * 8}%` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Savings opportunities section */}
      <div className={styles.savingsSection}>
        <SkeletonItem shape="rectangle" size={20} style={{ width: "260px" }} />
        <div className={styles.savingsRow}>
          {[0, 1, 2].map((i) => (
            <div key={i} className={styles.savingsCard}>
              <SkeletonItem shape="rectangle" size={16} style={{ width: "70%" }} />
              <SkeletonItem shape="rectangle" size={28} style={{ width: "50%" }} />
              <SkeletonItem shape="rectangle" size={12} style={{ width: "90%" }} />
              <SkeletonItem shape="rectangle" size={12} style={{ width: "80%" }} />
              <SkeletonItem shape="rectangle" size={12} style={{ width: "40%" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer disclaimer text */}
      <div className={styles.footerText}>
        <SkeletonItem shape="rectangle" size={12} style={{ width: "95%" }} />
        <SkeletonItem shape="rectangle" size={12} style={{ width: "88%" }} />
        <SkeletonItem shape="rectangle" size={12} style={{ width: "60%" }} />
      </div>
    </Skeleton>
  )
}

/** Skeleton placeholder for the EmissionDetails view: tab strip + 6 table rows. */
export function DetailsSkeleton() {
  const styles = useStyles()
  return (
    <Skeleton animation="wave" className={styles.root}>
      <div className={styles.card}>
        <div className={styles.tabRow}>
          {[0, 1, 2].map((i) => (
            <SkeletonItem key={i} shape="rectangle" size={20} style={{ width: "120px" }} />
          ))}
        </div>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={styles.tableRow}>
            <SkeletonItem shape="rectangle" size={16} />
            <SkeletonItem shape="rectangle" size={16} style={{ width: "60%" }} />
            <SkeletonItem shape="rectangle" size={16} style={{ width: "40%" }} />
            <SkeletonItem shape="rectangle" size={16} style={{ width: "50%" }} />
          </div>
        ))}
      </div>
    </Skeleton>
  )
}

/** Skeleton placeholder for the EmissionReductions view.
 *  By default, mirrors the v1 baseline (flat KPI row + table on the page).
 *  Pass `cardSurface` to wrap in an elevated card matching the company-level exploration. */
export function ReductionsSkeleton({ cardSurface = false }: { cardSurface?: boolean } = {}) {
  const styles = useStyles()
  const kpiWidths = ["55%", "75%", "85%", "70%"]
  const rowWidths: [string, string, string, string, string, string][] = [
    ["75%", "60%", "80%", "90%", "50%", "55%"],
    ["65%", "70%", "75%", "85%", "60%", "50%"],
    ["80%", "55%", "70%", "95%", "45%", "60%"],
    ["70%", "65%", "85%", "80%", "55%", "50%"],
    ["60%", "75%", "75%", "90%", "50%", "55%"],
    ["75%", "60%", "70%", "85%", "55%", "50%"],
  ]
  const inner = (
    <>
      {/* KPI row */}
      <div className={styles.reductionsKpiRow}>
        {kpiWidths.map((labelWidth, i) => (
          <div key={i} className={styles.reductionsKpiBlock}>
            <SkeletonItem shape="rectangle" size={12} style={{ width: labelWidth }} />
            <SkeletonItem shape="rectangle" size={32} style={{ width: "60%" }} />
          </div>
        ))}
      </div>

      {/* Recommendations table */}
      <div className={styles.reductionsTable}>
        <div className={styles.reductionsTableHeader}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <SkeletonItem key={i} shape="rectangle" size={12} style={{ width: "70%" }} />
          ))}
        </div>
        {rowWidths.map((widths, i) => (
          <div key={i} className={styles.reductionsTableRow}>
            {widths.map((w, j) => (
              <SkeletonItem key={j} shape="rectangle" size={16} style={{ width: w }} />
            ))}
          </div>
        ))}
      </div>

      {cardSurface && (
        <div className={styles.reductionsFooter}>
          <SkeletonItem shape="rectangle" size={32} style={{ width: "140px", borderRadius: tokens.borderRadiusMedium }} />
        </div>
      )}
    </>
  )
  return (
    <Skeleton animation="wave" className={styles.reductionsRoot}>
      {cardSurface ? <div className={styles.card}>{inner}</div> : inner}
    </Skeleton>
  )
}
