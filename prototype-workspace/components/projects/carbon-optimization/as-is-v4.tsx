"use client"

import { useState, useEffect, useRef, type ReactNode, type Ref } from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Tooltip,
  Link,
  mergeClasses,
  OverlayDrawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
} from "@fluentui/react-components"
import {
  MoreHorizontal16Regular,
  ArrowDownload16Regular,
  Lightbulb16Regular,
  PersonFeedback16Regular,
  Open12Regular,
  ChevronDoubleRight16Regular,
  Dismiss20Regular,
} from "@fluentui/react-icons"
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp"
import PageBreadcrumb from "../../shared/page-breadcrumb"
import BladeTocNav, { type TocItem } from "../../shared/blade-toc-nav"
import BladeCommandBar, { type CommandBarItem } from "../../shared/blade-command-bar"
import CarbonFilters, { type FilterState } from "./carbon-filters-v4"
import InlineMessage from "./inline-message"
import EmissionTrends from "./emission-trends-v4"
import EmissionDetails from "./emission-details-v4"
import EmissionReductions from "./emission-reductions-v4"
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
    // PR7 reflow — below 500px (Figma's smallest breakpoint for the blade
    // header) tighten horizontal padding from XL (20px) to M (12px) so the
    // titles have more room before they need to ellipsize.
    "@media (max-width: 499px)": {
      paddingLeft: tokens.spacingHorizontalM,
      paddingRight: tokens.spacingHorizontalM,
    },
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
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap",
    // PR7 reflow — per Figma the extension title shrinks first and ellipsizes
    // before the view title does. `flex: 0 1 auto` lets it shrink under flex
    // pressure; `min-width: 32px` keeps at least a few characters + ellipsis
    // visible so the title never disappears entirely.
    flexShrink: 1,
    flexGrow: 0,
    flexBasis: "auto",
    minWidth: "32px",
    overflowX: "hidden",
    overflowY: "hidden",
    textOverflow: "ellipsis",
  },
  bladePipe: {
    width: "1px",
    height: "24px",
    backgroundColor: tokens.colorNeutralStroke1,
    flexShrink: 0,
  },
  bladeViewTitle: {
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap",
    overflowX: "hidden",
    overflowY: "hidden",
    textOverflow: "ellipsis",
    // PR7 reflow — view title takes whatever space remains after the
    // extension title and shrinks last. Removed the previous `maxWidth: 250px`
    // cap so long view labels can use the full row width on wide viewports,
    // and gracefully ellipsize on narrow ones.
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: "auto",
    minWidth: "32px",
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
    // PR3 reflow — allow this flex child to shrink below content size so
    // wide charts inside can clip locally instead of pushing page-level scroll.
    minWidth: 0,
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
    // PR10a reflow — at very narrow viewports (≤499px) the 20px L/R padding
    // eats too much of the available width. Drop to 12px so cards, tables,
    // and the chart row keep enough room for content.
    "@media (max-width: 499px)": {
      paddingLeft: tokens.spacingHorizontalM,
      paddingRight: tokens.spacingHorizontalM,
    },
  },
  // PR9 reflow — at <720px the inline TOC is removed and replaced with a
  // sticky "Service menu" trigger button row that sits between the blade
  // header and the page content. Clicking it opens the TOC in an OverlayDrawer.
  serviceMenuTriggerRow: {
    position: "sticky",
    top: 0,
    zIndex: 1,
    backgroundColor: tokens.colorNeutralBackground1,
    // Cancel out the parent scrollContent's horizontal padding so the row
    // hugs the viewport edges like production.
    marginLeft: `calc(-1 * ${tokens.spacingHorizontalXL})`,
    marginRight: `calc(-1 * ${tokens.spacingHorizontalXL})`,
    // PR10a — keep the negative margin in sync with the reduced parent
    // padding at narrow widths, otherwise the row overflows to the left.
    "@media (max-width: 499px)": {
      marginLeft: `calc(-1 * ${tokens.spacingHorizontalM})`,
      marginRight: `calc(-1 * ${tokens.spacingHorizontalM})`,
    },
  },
  serviceMenuTriggerButton: {
    justifyContent: "flex-start",
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
    // PR6 reflow — render as a paragraph so the trailing "Learn more" link
    // wraps onto a new line at narrow widths instead of staying glued to the
    // copy via flex layout.
    display: "block",
  },
  learnMoreLink: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: "15px",
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  // PR2 a11y — skip link is visually hidden until focused, then becomes a
  // standard Fluent-styled chip pinned to the top-left of the viewport.
  skipLink: {
    position: "fixed",
    top: tokens.spacingVerticalS,
    left: tokens.spacingHorizontalS,
    zIndex: 10000,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorBrandForeground1,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow8,
    textDecorationLine: "none",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    // Hide off-screen by default; reveal on focus.
    transform: "translateY(-200%)",
    transitionProperty: "transform",
    transitionDuration: tokens.durationFast,
    ":focus": {
      transform: "translateY(0)",
      outlineStyle: "solid",
      outlineWidth: "2px",
      outlineColor: tokens.colorStrokeFocus2,
      outlineOffset: "2px",
    },
    ":focus-visible": {
      transform: "translateY(0)",
    },
  },
  // PR2 a11y — visually hidden but available to assistive tech.
  visuallyHidden: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  // PR2 a11y — make <main> programmatically focusable without a visible outline.
  mainContentFocusable: {
    outlineStyle: "none",
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

/**
 * PR9 reflow — combined viewport + menu state. Returns `[isWide, tocOpen,
 * setTocOpen]`. Both values are updated *together* inside the `matchMedia`
 * change handler so React 18 batches them into a single commit.
 *
 * Why not two separate hooks: previously `isWide` updated on render N and
 * `tocOpen` reset on render N+1, so the OverlayDrawer mounted with `open=true`
 * for one frame when crossing wide→narrow, producing a visible flash of the
 * drawer over the entire app frame.
 */
function useResponsiveMenuState(query: string) {
  const [state, setState] = useState<{ isWide: boolean; tocOpen: boolean }>({
    isWide: true,
    tocOpen: true,
  })
  useEffect(() => {
    if (typeof window === "undefined") return
    const mql = window.matchMedia(query)
    // Reset menu visibility to a sensible default for the new mode whenever
    // the boundary is crossed: wide → expanded inline, narrow → drawer closed.
    const apply = (matches: boolean) =>
      setState({ isWide: matches, tocOpen: matches })
    apply(mql.matches)
    const onChange = (e: MediaQueryListEvent) => apply(e.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [query])
  const setTocOpen = (next: boolean) =>
    setState((prev) => ({ ...prev, tocOpen: next }))
  return [state.isWide, state.tocOpen, setTocOpen] as const
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
  // PR2 a11y — focus + announce the new blade title only when the view change came
  // from a keyboard activation. Mouse users keep their cursor context. We detect
  // keyboard via `:focus-visible` at the moment of activation.
  const mainRef = useRef<HTMLElement | null>(null)
  const kbdActivationRef = useRef(false)
  const isFirstRenderRef = useRef(true)
  const [liveMessage, setLiveMessage] = useState("")
  // PR9 reflow — service-menu state. At ≥720px the menu renders inline and
  // toggles between expanded (264px) and rail (32px). At <720px the inline
  // menu is removed and a sticky "Service menu" trigger row + OverlayDrawer
  // takes over. `tocOpen` is the single source of truth for "is the menu
  // showing its contents" — interpreted differently per mode. Both values
  // are batched together to avoid a one-frame drawer flash on resize.
  const [isWideViewport, tocOpen, setTocOpen] = useResponsiveMenuState(
    "(min-width: 720px)"
  )
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
  // PR2 a11y — on view change (skipping initial mount), update the live region
  // and, if the change came from a keyboard activation, focus the <main> landmark
  // so screen readers announce the new context and keyboard users can keep tabbing
  // forward into the new content.
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false
      return
    }
    setLiveMessage(`${resolvedViewLabel} blade loaded`)
    if (kbdActivationRef.current) {
      mainRef.current?.focus()
      kbdActivationRef.current = false
    }
  }, [activeView, resolvedViewLabel])
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
      {/* PR2 a11y — keyboard skip link, visible only on focus. */}
      <a href="#blade-main" className={styles.skipLink}>
        Skip to blade content
      </a>
      {/* PR2 a11y — polite live region announces blade view changes. */}
      <div role="status" aria-live="polite" aria-atomic="true" className={styles.visuallyHidden}>
        {liveMessage}
      </div>
      <AzureHeaderBuildMVP activeLink="" isDarkMode={isDarkMode} />

      <PageBreadcrumb
        items={[
          { label: "Home", onClick: () => {} },
        ]}
        noBorder
        density="compact"
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
        {/* PR9 reflow — at ≥720px render the TOC inline with collapse-to-rail
            support. At <720px the inline TOC is removed entirely; a sticky
            trigger row inside scrollContent (below) opens it as an OverlayDrawer. */}
        {isWideViewport && (
          <BladeTocNav
            items={resolvedNavItems}
            activeItem={activeView}
            collapsible
            collapsed={!tocOpen}
            onCollapsedChange={(c) => setTocOpen(!c)}
            onItemClick={(id) => {
              // PR2 a11y — detect whether this click came from a keyboard activation
              // (Enter / Space / arrow-driven focus). `:focus-visible` is set by the
              // browser only when the focus ring would normally be drawn, which is the
              // standard heuristic for "this came from the keyboard".
              const active = document.activeElement
              const wasKbd = !!(active && "matches" in active && (active as HTMLElement).matches(":focus-visible"))
              kbdActivationRef.current = wasKbd
              if (extraViewContent && id in extraViewContent) {
                setActiveView(id)
                return
              }
              if (id === "trends" || id === "details" || id === "reductions") {
                setActiveView(id)
              }
            }}
          />
        )}

        <main
          id="blade-main"
          ref={mainRef}
          tabIndex={-1}
          className={mergeClasses(styles.mainContent, styles.mainContentFocusable)}
        >
          <div className={styles.scrollContent}>
            {/* PR9 reflow — sticky service-menu trigger button (narrow viewports
                only). Production behavior: this row sits between the blade
                header and the toolbar, sticks to the top of the scroll area,
                and opens the TOC as a non-modal OverlayDrawer (no scrim). */}
            {!isWideViewport && (
              <div className={styles.serviceMenuTriggerRow}>
                <Button
                  appearance="subtle"
                  className={styles.serviceMenuTriggerButton}
                  icon={<ChevronDoubleRight16Regular />}
                  onClick={() => setTocOpen(true)}
                  aria-label="Open service menu"
                  aria-expanded={tocOpen}
                  aria-controls="blade-service-menu-drawer"
                >
                  Service menu
                </Button>
              </div>
            )}
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
        </main>
      </div>

      {/* PR9 reflow — service menu OverlayDrawer for narrow viewports.
          Mounted only when <720px so screen readers don't see two copies of
          the same nav. `modalType="non-modal"` matches production: no scrim,
          no focus trap — the drawer floats over content like a slide-out. */}
      {!isWideViewport && (
        <OverlayDrawer
          id="blade-service-menu-drawer"
          position="start"
          modalType="non-modal"
          open={tocOpen}
          onOpenChange={(_, data) => setTocOpen(data.open)}
        >
          <DrawerHeader>
            <DrawerHeaderTitle
              action={
                <Button
                  appearance="subtle"
                  icon={<Dismiss20Regular />}
                  onClick={() => setTocOpen(false)}
                  aria-label="Close service menu"
                />
              }
            >
              Service menu
            </DrawerHeaderTitle>
          </DrawerHeader>
          <DrawerBody>
            <BladeTocNav
              items={resolvedNavItems}
              activeItem={activeView}
              width={264}
              onItemClick={(id) => {
                if (extraViewContent && id in extraViewContent) {
                  setActiveView(id)
                  setTocOpen(false)
                  return
                }
                if (id === "trends" || id === "details" || id === "reductions") {
                  setActiveView(id)
                  setTocOpen(false)
                }
              }}
            />
          </DrawerBody>
        </OverlayDrawer>
      )}
    </div>
  )
}
