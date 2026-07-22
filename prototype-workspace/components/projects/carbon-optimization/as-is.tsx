/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client"

import { useState, useEffect, type ReactNode, type Ref } from "react"
import { makeStyles, tokens as fluentTokens, Text, Button, Tooltip, Link } from "@fluentui/react-components"
import {
  MoreHorizontal16Regular,
  ArrowDownload16Regular,
  Lightbulb16Regular,
  PersonFeedback16Regular,
  Open12Regular,
} from "@fluentui/react-icons"
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp"
import PageBreadcrumb from "../../shared/page-breadcrumb"
import BladeTocNav, { type TocItem } from "../../shared/blade-toc-nav"
import BladeCommandBar, { type CommandBarItem } from "../../shared/blade-command-bar"
import CarbonFilters, { type FilterState } from "./carbon-filters"
import InlineMessage from "./inline-message"
import EmissionTrends from "./emission-trends"
import EmissionDetails from "./emission-details"
import EmissionReductions from "./emission-reductions"
import { TrendsSkeleton, ReductionsSkeleton } from "./loading-skeletons"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

type CarbonView = "trends" | "details" | "reductions"

const viewLabels: Record<CarbonView, string> = {
  trends: "Emission Trends",
  details: "Emission Details",
  reductions: "Emissions Reductions",
}

const viewIconSrc: Record<CarbonView, string> = {
  trends: "/icons/carbon-optimization/emission-trends.svg",
  details: "/icons/carbon-optimization/emission-details.svg",
  reductions: "/icons/carbon-optimization/emission-reductions.svg",
}

const NavIcon = ({ src }: { src: string }) => (
  <img src={src} alt="" width={16} height={16} style={{ display: "block" }} />
)

const navItems: TocItem[] = [
  { id: "trends", label: "Emission Trends", icon: <NavIcon src={viewIconSrc.trends} /> },
  { id: "details", label: "Emission Details", icon: <NavIcon src={viewIconSrc.details} /> },
  { id: "reductions", label: "Emission Reductions", icon: <NavIcon src={viewIconSrc.reductions} /> },
  { id: "support", label: "Support + Troubleshooting", children: [] },
]

const trendsToolbarItems: CommandBarItem[] = [
  { key: "export", label: "Export to CSV", icon: <ArrowDownload16Regular /> },
  { key: "tour", label: "Take a tour", icon: <Lightbulb16Regular /> },
  { key: "feedback", label: "Feedback", icon: <PersonFeedback16Regular />, dividerBefore: true },
]

const otherToolbarItems: CommandBarItem[] = [
  { key: "export", label: "Export to CSV", icon: <ArrowDownload16Regular /> },
  { key: "feedback", label: "Feedback", icon: <PersonFeedback16Regular />, dividerBefore: true },
]

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  bladeHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    height: "48px",
    paddingLeft: tokens.spacingHorizontalXL,
    paddingRight: tokens.spacingHorizontalXL,
    paddingBottom: tokens.spacingVerticalS,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  bladeIcon: {
    width: "28px",
    height: "28px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bladeTitleGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    flex: 1,
    minWidth: 0,
  },
  bladeExtensionTitle: {
    fontSize: tokens.fontSizeBase600,
    lineHeight: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap",
    minWidth: "100px",
  },
  bladePipe: {
    width: "1px",
    height: "24px",
    backgroundColor: tokens.colorNeutralStroke1,
    flexShrink: 0,
  },
  bladeViewTitle: {
    fontSize: tokens.fontSizeBase600,
    lineHeight: "32px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap",
    overflowX: "hidden",
    overflowY: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "250px",
  },
  body: {
    display: "flex",
    flex: 1,
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  scrollContent: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalXL,
    paddingBottom: "80px",
    paddingLeft: tokens.spacingHorizontalXL,
    paddingRight: tokens.spacingHorizontalXL,
  },
  toolbarNoBorder: {
    borderBottomWidth: "0",
    borderBottomStyle: "none",
  },
  infoBar: {
    backgroundColor: "transparent",
  },
  descriptionRow: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: "15px",
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  learnMoreLink: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: "15px",
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
})

export interface AsIsProps {
  isDarkMode?: boolean
  /** Override the extension title shown in the blade header (default: "Carbon optimization"). */
  extensionTitle?: string
  /** Replace the default "Showing emissions data for up to 100 selected subscriptions" MessageBar. Pass `null` to hide it entirely. */
  infoBarSlot?: ReactNode | null
  /** Replace the default <CarbonFilters /> row. Pass `null` to hide it entirely. When provided, the variant is responsible for managing its own filter state and passing the resulting FilterState back via `onFiltersChange` if it wants the views to react. */
  filtersSlot?: ReactNode | null
  /** Replace the default <BladeCommandBar /> (Export / Take a tour / Feedback row). Pass `null` to hide entirely. */
  commandBarSlot?: ReactNode | null
  /** Optional content rendered above the info bar — e.g. a "View: Subscriptions" picker for the company-level exploration. */
  viewPickerSlot?: ReactNode
  /** Override the description row at the top of the Trends view (forwarded to <EmissionTrends descriptionSlot={…} />). Pass `null` to hide it entirely. */
  trendsDescription?: ReactNode | null
  /** Optional content rendered at the bottom of the scroll area, after the active view — e.g. a "Give feedback" footer link. Applies to all three Toc views. */
  footerSlot?: ReactNode
  /** Forwarded to <EmissionTrends exportSlot={…} /> — rendered next to the "Monthly emissions" chart title. */
  trendsExportSlot?: ReactNode
  /** Forwarded to <EmissionTrends reductionsKpiRef={…} />. Lets a parent attach a ref to the "Potential monthly emissions reductions" KPI block (e.g. for the v3 onboarding tour). */
  trendsReductionsKpiRef?: Ref<HTMLDivElement>
  /** Forwarded to <EmissionDetails exportSlot={…} /> — rendered above the breakdown table. */
  detailsExportSlot?: ReactNode
  /** When true, wraps the EmissionDetails breakdown table in an elevated card with the export slot pinned to the bottom-left and pagination controls. Also removes the divider between the top KPI card and the table. Defaults to false to mirror the live Carbon Optimization extension. */
  detailsCardSurface?: boolean
  /** Forwarded to <EmissionReductions exportSlot={…} /> — rendered at the bottom-left footer of the recommendations card. */
  reductionsExportSlot?: ReactNode
  /** When true, wraps the EmissionReductions KPIs + table in an elevated card surface (and matches the loading skeleton). Defaults to false to mirror the live Carbon Optimization extension. */
  reductionsCardSurface?: boolean
  /** Where to render export buttons relative to each blade's elevated card. "footer" (default) keeps the v1/v2 baseline placement. "topRight" pins them to the top-right of the Trends main panel and the Details/Reductions card surfaces. Has no effect on the Details / Reductions cards when their respective `cardSurface` is false. */
  exportPosition?: "footer" | "topRight" | "topLeft"
  /** When set, scopes the default <CarbonFilters /> Subscription pill to subscriptions belonging to this billing account. Ignored if `filtersSlot` is overridden. */
  filtersBillingAccountId?: string | null
  /** When true, applies Billing Accounts view tweaks: hides the Resource group filter pill (across all blades) and the "Resource groups" + "Resources" tabs in the Details blade. Ignored if `filtersSlot` is overridden. */
  companyView?: boolean
  /** When true, hides the "The emissions data presented here is calculated…" methodology disclaimer (and its top divider) at the bottom of the Trends and Details blades. */
  hideMethodologyFooter?: boolean
  /** When provided, replaces the entire data area (info bar, filters, per-blade description, active view content) with this node. The blade nav, view picker, and footer slot remain visible so the user can still navigate. Use for permission errors, empty data states, etc. */
  errorState?: ReactNode
  /** Append additional items to the left blade nav (rendered after Reductions, before Support + Troubleshooting). Each item's `id` becomes a valid value for `activeView`. Pair with `extraViewLabels`, `extraViewIconSrc`, and `extraViewContent` to render the corresponding view. */
  extraNavItems?: TocItem[]
  /** Blade title labels for any `extraNavItems` ids — shown after the pipe in the blade header. */
  extraViewLabels?: Record<string, string>
  /** Icon src paths (24x24) for any `extraNavItems` ids — shown next to the extension title in the blade header. */
  extraViewIconSrc?: Record<string, string>
  /** Content rendered in the main scroll area for any `extraNavItems` id. When the active view matches a key, the default trends/details/reductions content, info bar, filters, and per-blade descriptions are skipped — only the command bar (or its override) and this content are shown. */
  extraViewContent?: Record<string, ReactNode>
  /** Initial active blade nav id (default: "trends"). Use to land on an extra nav item on mount. */
  initialActiveView?: string
  /** Notified whenever the active blade nav id changes (including the initial mount value). Use to track the current blade from a parent component (e.g. for return-here navigation). */
  onActiveViewChange?: (id: string) => void
  /** When true, replaces the active blade's content with shape-matched skeletons. Page chrome (header, view picker, filters, footer) stays visible to communicate that only the data is updating. */
  isLoading?: boolean
  /** Optional controlled filter state. When provided (along with `onFiltersChange`), `<AsIs>` becomes controlled — parents can reset or scope filters externally (e.g. resetting when switching between Subscriptions / Billing Accounts views). */
  filters?: FilterState
  /** Change handler paired with controlled `filters`. Required when `filters` is provided. */
  onFiltersChange?: (next: FilterState) => void
}

/** As-Is variant — full Carbon Optimization extension replica. Accepts optional slot props so design explorations can layer changes on top without duplicating the file. */
export default function AsIs({
  isDarkMode = false,
  extensionTitle = "Carbon optimization",
  infoBarSlot,
  filtersSlot,
  commandBarSlot,
  viewPickerSlot,
  trendsDescription,
  footerSlot,
  trendsExportSlot,
  trendsReductionsKpiRef,
  detailsExportSlot,
  detailsCardSurface = false,
  reductionsExportSlot,
  reductionsCardSurface = false,
  exportPosition = "footer",
  filtersBillingAccountId,
  companyView = false,
  hideMethodologyFooter = false,
  errorState,
  extraNavItems,
  extraViewLabels,
  extraViewIconSrc,
  extraViewContent,
  initialActiveView,
  onActiveViewChange,
  isLoading = false,
  filters: filtersProp,
  onFiltersChange: onFiltersChangeProp,
}: AsIsProps) {
  const styles = useStyles()
  const [activeView, setActiveView] = useState<string>(initialActiveView ?? "trends")
  // Notify parent of the current view (initial + every change) so they can track "where the user was".
  useEffect(() => {
    onActiveViewChange?.(activeView)
  }, [activeView, onActiveViewChange])
  const isExtraView = !!extraViewContent && activeView in extraViewContent
  const resolvedNavItems: TocItem[] = extraNavItems && extraNavItems.length > 0
    ? [...navItems.filter((n) => n.id !== "support"), ...extraNavItems, ...navItems.filter((n) => n.id === "support")]
    : navItems
  const resolvedViewLabel = isExtraView
    ? (extraViewLabels?.[activeView] ?? activeView)
    : viewLabels[activeView as CarbonView]
  const resolvedViewIconSrc = isExtraView
    ? (extraViewIconSrc?.[activeView] ?? viewIconSrc.trends)
    : viewIconSrc[activeView as CarbonView]
  const [internalFilters, setInternalFilters] = useState<FilterState>({
    subscriptionIds: null,
    resourceGroup: null,
    emissionsType: null,
    resourceType: null,
    location: null,
  })
  const filters = filtersProp ?? internalFilters
  const setFilters = onFiltersChangeProp ?? setInternalFilters

  const toolbarItems = activeView === "trends" ? trendsToolbarItems : otherToolbarItems

  // Slot resolution: `undefined` → render default, explicit `null` → render nothing, ReactNode → render override.
  const resolvedCommandBar =
    commandBarSlot === undefined ? (
      <BladeCommandBar items={toolbarItems} className={styles.toolbarNoBorder} />
    ) : (
      commandBarSlot
    )
  const resolvedInfoBar =
    infoBarSlot === undefined ? (
      <InlineMessage intent="info" className={styles.infoBar}>
        Showing emissions data for up to 100 selected subscriptions. Modify your selection in the subscription filter to update the results.
      </InlineMessage>
    ) : (
      infoBarSlot
    )
  const resolvedFilters =
    filtersSlot === undefined ? (
      <CarbonFilters
        filters={filters}
        onFiltersChange={setFilters}
        billingAccountId={filtersBillingAccountId}
        hideResourceGroup={companyView}
        reductionsMode={activeView === "reductions"}
      />
    ) : (
      filtersSlot
    )

  // Trends description is rendered as page chrome (above the data area) so it stays visible during the
  // loading skeleton swap. EmissionTrends's own internal description is suppressed via descriptionSlot={null}.
  const resolvedTrendsDescription =
    trendsDescription === undefined ? (
      <Text className={styles.descriptionRow}>
        Azure carbon optimization provides data and insights to help with optimizing carbon emissions from your Azure usage.{" "}
        <Link href="#" inline className={styles.learnMoreLink}>Learn more <Open12Regular /></Link>
      </Text>
    ) : (
      trendsDescription
    )

  return (
    <div className={styles.root}>
      <AzureHeaderBuildMVP activeLink="" isDarkMode={isDarkMode} />

      <PageBreadcrumb
        items={[
          { label: "Home", onClick: () => {} },
        ]}
        noBorder
      />

      <div className={styles.bladeHeader}>
        <span className={styles.bladeIcon}>
          <img src={resolvedViewIconSrc} alt="" width={24} height={24} style={{ display: "block" }} />
        </span>
        <div className={styles.bladeTitleGroup}>
          <Text className={styles.bladeExtensionTitle}>{extensionTitle}</Text>
          <span className={styles.bladePipe} />
          <Text className={styles.bladeViewTitle}>{resolvedViewLabel}</Text>
          <Tooltip content="More options" relationship="label">
            <Button appearance="subtle" icon={<MoreHorizontal16Regular />} size="small" />
          </Tooltip>
        </div>
      </div>

      <div className={styles.body}>
        <BladeTocNav
          items={resolvedNavItems}
          activeItem={activeView}
          onItemClick={(id) => {
            if (extraViewContent && id in extraViewContent) {
              setActiveView(id)
              return
            }
            if (id === "trends" || id === "details" || id === "reductions") {
              setActiveView(id)
            }
          }}
        />

        <div className={styles.mainContent}>
          <div className={styles.scrollContent}>
            {resolvedCommandBar}
            {!isExtraView && viewPickerSlot}
            {isExtraView ? (
              extraViewContent![activeView]
            ) : errorState ? (
              errorState
            ) : (
              <>
                {resolvedInfoBar}
                {resolvedFilters}
                {activeView === "details" && !detailsCardSurface && (
                  <Text className={styles.descriptionRow}>
                    Data on this page reflects carbon emissions for the most recent full month.{" "}
                    <Link href="#" inline className={styles.learnMoreLink}>Learn more <Open12Regular /></Link>
                  </Text>
                )}
                {activeView === "reductions" && (
                  <Text className={styles.descriptionRow}>
                    Reduce emissions by acting on optimization recommendations.{" "}
                    <Link href="#" inline className={styles.learnMoreLink}>Learn more about emissions reductions <Open12Regular /></Link>
                  </Text>
                )}
                {activeView === "trends" && resolvedTrendsDescription}
                {activeView === "trends" && (isLoading ? <TrendsSkeleton /> : <EmissionTrends filters={filters} exportSlot={trendsExportSlot} exportPosition={exportPosition} reductionsKpiRef={trendsReductionsKpiRef} descriptionSlot={null} hideMethodologyFooter={hideMethodologyFooter} />)}
                {activeView === "details" && <EmissionDetails filters={filters} exportSlot={detailsExportSlot} hideResourceTabs={companyView} hideMethodologyFooter={hideMethodologyFooter} isLoading={isLoading} detailsCardSurface={detailsCardSurface} exportPosition={exportPosition} />}
                {activeView === "reductions" && (isLoading ? <ReductionsSkeleton cardSurface={reductionsCardSurface} /> : <EmissionReductions filters={filters} exportSlot={reductionsExportSlot} cardSurface={reductionsCardSurface} exportPosition={exportPosition} />)}
              </>
            )}
            {footerSlot}
          </div>
        </div>
      </div>
    </div>
  )
}
