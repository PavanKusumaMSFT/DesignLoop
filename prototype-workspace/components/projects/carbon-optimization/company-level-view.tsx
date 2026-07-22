"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Divider,
  Dropdown,
  Option,
  Button,
  Text,
  Link,
  Menu,
  MenuTrigger,
  MenuButton,
  MenuPopover,
  MenuList,
  MenuItem,
  TeachingPopover,
  TeachingPopoverSurface,
  TeachingPopoverBody,
} from "@fluentui/react-components"
import {
  ArrowDownload16Regular,
  ArrowDownload20Regular,
  Open12Regular,
  PersonFeedback16Regular,
} from "@fluentui/react-icons"
import AsIs from "./as-is"
import BladeCommandBar from "../../shared/blade-command-bar"
import type { TocItem } from "../../shared/blade-toc-nav"
import EmptyState from "./empty-state"
import { billingAccounts } from "./data/mock-data"
import type { FilterState } from "./carbon-filters"

const emptyFilters: FilterState = {
  subscriptionIds: null,
  resourceGroup: null,
  emissionsType: null,
  resourceType: null,
  location: null,
}

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

type CompanyView = "subscriptions" | "billing-accounts"

/** Identifies which blade the user clicked "Export to storage" from — used to pre-select a template in the New scheduled export wizard. */
export type ExportSourceBlade = "trends" | "details" | "reductions"

/** Snapshot of the user's current scope/filter context at the moment they clicked "Export to storage". The wizard pre-fills its View / Billing account / Subscriptions fields from this so the export reflects what the user is looking at. */
export interface ExportContext {
  blade: ExportSourceBlade
  view: "subscriptions" | "billing-accounts"
  billingAccountId?: string
  subscriptionIds?: string[]
}

/** Company-level view exploration. Layers a "View" picker (Subscriptions / Billing Accounts), removes the legacy command bar, moves Export to CSV onto the per-blade content, and adds a sticky "Give feedback" footer — by passing slot overrides into <AsIs />. When "Billing Accounts" is selected, a single-select billing-account picker (radio-style) appears next to the View dropdown; selection persists across all three Toc blades because the state lives in this component, not inside <AsIs />. When `noBillingAccountAccess` is true, switching to Billing Accounts surfaces a permissions empty state instead of data — used by the v2.error variant. When `enableTour` is true, the "Take a tour" link in the trends description starts a 3-step teaching popover tour anchored to the View dropdown, the Reductions KPI, and the trends Export button. */
export default function CompanyLevelView({ isDarkMode = false, noBillingAccountAccess = false, exportPosition = "footer", compactExportButton = false, extraNavItems, extraViewLabels, extraViewIconSrc, extraViewContent, initialActiveView, onActiveViewChange, onExportToStorage, enableTour = false }: { isDarkMode?: boolean; noBillingAccountAccess?: boolean; exportPosition?: "footer" | "topRight" | "topLeft"; compactExportButton?: boolean; extraNavItems?: TocItem[]; extraViewLabels?: Record<string, string>; extraViewIconSrc?: Record<string, string>; extraViewContent?: Record<string, ReactNode>; initialActiveView?: string; onActiveViewChange?: (id: string) => void; onExportToStorage?: (context: ExportContext) => void; enableTour?: boolean }) {
  const styles = useStyles()
  const [view, setView] = useState<CompanyView>("subscriptions")
  const [selectedBillingAccountId, setSelectedBillingAccountId] = useState<string>(
    billingAccounts[0]?.id ?? ""
  )
  // Subscription IDs scoped to a billing account — used to populate filters.subscriptionIds
  // so the actual KPIs / charts / tables narrow to just that BA's subs (mock-data has
  // distinct subscription sets and weighted emissions per BA).
  const subsForBillingAccount = (baId: string): string[] =>
    billingAccounts.find((ba) => ba.id === baId)?.subscriptions.map((s) => s.id) ?? []
  // Filters live here (not inside <AsIs />) so that switching View (Subscriptions ↔ Billing Accounts)
  // can reset all filter selections while <AsIs /> stays mounted — preserving the active Toc blade.
  const [filters, setFilters] = useState<FilterState>(emptyFilters)
  const handleViewChange = (nextView: CompanyView) => {
    if (nextView === view) return
    setView(nextView)
    // v2.error: when the user has no BA permissions, the BA view is just an error state with no
    // data scoping of its own. Preserve whatever filters the user set in Subscriptions view so
    // they're still in place when the user returns (via dropdown or the empty-state link).
    if (noBillingAccountAccess) return
    if (nextView === "billing-accounts") {
      setFilters({ ...emptyFilters, subscriptionIds: subsForBillingAccount(selectedBillingAccountId) })
    } else {
      setFilters(emptyFilters)
    }
  }
  // Re-scope filters whenever the user picks a different billing account.
  useEffect(() => {
    if (view !== "billing-accounts") return
    if (noBillingAccountAccess) return
    setFilters({ ...emptyFilters, subscriptionIds: subsForBillingAccount(selectedBillingAccountId) })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBillingAccountId, view])

  // Brief skeleton state when the user switches billing accounts — mock data resolves instantly,
  // so we hold the loading state for ~600ms to give a visual confirmation that data is updating.
  // Skip on first mount; only triggers on subsequent BA changes while in Billing Accounts view.
  const [isLoading, setIsLoading] = useState(false)
  const previousBaRef = useRef(selectedBillingAccountId)
  useEffect(() => {
    if (view !== "billing-accounts") {
      previousBaRef.current = selectedBillingAccountId
      return
    }
    if (previousBaRef.current === selectedBillingAccountId) return
    previousBaRef.current = selectedBillingAccountId
    setIsLoading(true)
    const t = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(t)
  }, [selectedBillingAccountId, view])

  const selectedBillingAccount = billingAccounts.find((ba) => ba.id === selectedBillingAccountId)

  // ---- Onboarding tour state (v3 only; gated by `enableTour`) ---------------------------------
  // null = closed; 0..2 = active step. Each step anchors to a different element on the Trends blade.
  const [tourStep, setTourStep] = useState<number | null>(null)
  const viewDropdownRef = useRef<HTMLDivElement>(null)
  const reductionsKpiRef = useRef<HTMLDivElement>(null)
  const trendsExportAnchorRef = useRef<HTMLSpanElement>(null)
  const closeTour = () => setTourStep(null)
  const goNext = () => setTourStep((s) => (s === null ? null : s + 1 > 2 ? null : s + 1))
  const goPrev = () => setTourStep((s) => (s === null || s === 0 ? s : s - 1))

  const viewIcon = (
    <img
      src={view === "subscriptions" ? "/icons/Subscriptions.svg" : "/icons/billing-account.svg"}
      alt=""
      className={styles.viewOptionIcon}
    />
  )

  const viewPicker = (
    <div className={styles.viewPickerWrapper}>
      <div className={styles.pickerRow}>
        <div className={styles.picker} ref={viewDropdownRef}>
          <Text className={styles.pickerLabel}>View</Text>
          <Dropdown
            className={styles.pickerDropdown}
            size="small"
            value={view === "subscriptions" ? "Subscriptions" : "Billing Accounts"}
            selectedOptions={[view]}
            button={{ children: (
              <span className={styles.viewTriggerContent}>
                {viewIcon}
                <span>{view === "subscriptions" ? "Subscriptions" : "Billing Accounts"}</span>
              </span>
            ) }}
            onOptionSelect={(_, data) => {
              if (data.optionValue === "subscriptions" || data.optionValue === "billing-accounts") {
                handleViewChange(data.optionValue)
              }
            }}
          >
            <Option value="subscriptions" text="Subscriptions" media={<img src="/icons/Subscriptions.svg" alt="" className={styles.viewOptionIcon} />}>Subscriptions</Option>
            <Option value="billing-accounts" text="Billing Accounts" media={<img src="/icons/billing-account.svg" alt="" className={styles.viewOptionIcon} />}>Billing Accounts</Option>
          </Dropdown>
        </div>

        {view === "billing-accounts" && !noBillingAccountAccess && (
          <div className={styles.picker}>
            <Text className={styles.pickerLabel}>Billing account</Text>
            <Dropdown
              className={styles.pickerDropdown}
              size="small"
              value={selectedBillingAccount?.name ?? ""}
              selectedOptions={[selectedBillingAccountId]}
              onOptionSelect={(_, data) => {
                if (data.optionValue) setSelectedBillingAccountId(data.optionValue)
              }}
            >
              {billingAccounts.map((ba) => (
                <Option key={ba.id} value={ba.id} text={ba.name} checkIcon={null}>
                  {ba.name}
                </Option>
              ))}
            </Dropdown>
          </div>
        )}
      </div>
      <Divider className={styles.viewPickerDivider} />
    </div>
  )

  const handleStartTour = (e?: React.MouseEvent) => {
    e?.preventDefault()
    if (!enableTour) return
    setTourStep(0)
  }

  const trendsDescription = (
    <Text className={styles.description}>
      Azure carbon optimization provides data and insights to help with optimizing carbon emissions from your Azure usage.{" "}
      <Link href="#" inline className={styles.descriptionLink} onClick={handleStartTour}>Take a tour</Link>
      {" "}or{" "}
      <Link href="#" inline className={styles.descriptionLink}>
        learn more about emissions and emissions scopes <Open12Regular />
      </Link>
    </Text>
  )

  const renderExportButton = (blade: ExportSourceBlade) => {
    const onStorage = () => onExportToStorage?.({
      blade,
      view,
      billingAccountId: view === "billing-accounts" ? selectedBillingAccountId : undefined,
      subscriptionIds: filters.subscriptionIds ?? undefined,
    })

    // v2 variants don't wire up scheduled exports — they only need a single "Export to CSV" button.
    // The Menu (CSV + storage) is exclusively a v3 affordance, gated on `onExportToStorage` being supplied.
    if (!onExportToStorage) {
      return (
        <Button appearance="secondary" icon={<ArrowDownload16Regular />}>Export to CSV</Button>
      )
    }

    const menuList = (
      <MenuList>
        <MenuItem
          className={styles.exportMenuItem}
          icon={<ArrowDownload20Regular className={styles.exportMenuItemIconBrand} />}
        >
          <div className={styles.exportMenuItemText}>
            <Text className={styles.exportMenuItemPrimary}>Export CSV</Text>
            <Text className={styles.exportMenuItemSecondary}>Download emissions data from this view</Text>
          </div>
        </MenuItem>
        <MenuItem
          className={styles.exportMenuItem}
          icon={<img src="/azure-service-icons/storage/10086-icon-service-Storage-Accounts.svg" alt="" width={20} height={20} />}
          onClick={onStorage}
        >
          <div className={styles.exportMenuItemText}>
            <Text className={styles.exportMenuItemPrimary}>Export to storage</Text>
            <Text className={styles.exportMenuItemSecondary}>Deliver emissions data to Azure blob storage</Text>
          </div>
        </MenuItem>
      </MenuList>
    )

    if (compactExportButton) {
      // Option B — reuse the same toolbar control from the Exports blade for visual parity.
      return (
        <BladeCommandBar
          className={styles.compactExportToolbar}
          items={[{ key: "export", label: "Export", icon: <ArrowDownload16Regular />, menu: menuList }]}
        />
      )
    }

    return (
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton appearance="secondary" icon={<ArrowDownload16Regular />}>Export</MenuButton>
        </MenuTrigger>
        <MenuPopover className={styles.exportMenuPopover}>
          {menuList}
        </MenuPopover>
      </Menu>
    )
  }

  const giveFeedbackFooter = (
    <div className={styles.feedbackFooter}>
      <Text className={styles.feedbackLabel}>Give feedback</Text>
      <Link href="#" inline className={styles.feedbackLink}>
        <PersonFeedback16Regular /> Tell us about your experience with Carbon Optimization
      </Link>
    </div>
  )

  const isBillingAccountsAccessError = noBillingAccountAccess && view === "billing-accounts"

  const billingAccessErrorState = (
    <EmptyState
      iconSrc="/icons/billing-account.svg"
      iconAlt="Billing account"
      heading="You don't have access to billing account data"
      body="You don't have permissions to view emissions data at the billing account level. Contact your billing administrator to request access."
      link={{ label: "Switch to Subscriptions view", onClick: () => handleViewChange("subscriptions") }}
    />
  )

  // ---- Tour bubble configuration --------------------------------------------------------------
  // Each step anchors to a different element on the Trends blade. The 3rd step automatically
  // follows the trends Export button via `trendsExportAnchorRef`, so positioning works equally
  // well for v3 Option A (footer) and v3 Option B (top toolbar) without per-option overrides.
  // Body-only design (no title / no icon) per the Figma teaching popover spec.
  const tourSteps: Array<{
    body: string
    target: React.RefObject<HTMLElement>
    position: "above" | "below" | "after" | "before"
  }> = [
    {
      body: "View emissions data by subscriptions, or by billing account for company-wide totals.",
      target: viewDropdownRef,
      position: "below",
    },
    {
      body: "Optimize resource utilization to reduce emissions.",
      target: reductionsKpiRef,
      position: "after",
    },
    {
      body: "Export the current view or set up exports to Azure blob storage.",
      target: trendsExportAnchorRef,
      position: "above",
    },
  ]

  return (
    <>
    <AsIs
      isDarkMode={isDarkMode}
      commandBarSlot={null}
      viewPickerSlot={viewPicker}
      trendsDescription={trendsDescription}
      footerSlot={isBillingAccountsAccessError ? null : giveFeedbackFooter}
      trendsExportSlot={<span ref={trendsExportAnchorRef} className={styles.exportAnchor}>{renderExportButton("trends")}</span>}
      trendsReductionsKpiRef={reductionsKpiRef}
      detailsExportSlot={renderExportButton("details")}
      reductionsExportSlot={renderExportButton("reductions")}
      reductionsCardSurface
      detailsCardSurface
      exportPosition={exportPosition}
      // For Billing Accounts view, the BA dropdown drives scope, so the legacy info-bar doesn't apply.
      infoBarSlot={view === "billing-accounts" ? null : undefined}
      // Scope the Subscription filter pill to subs under the selected billing account.
      filtersBillingAccountId={view === "billing-accounts" ? selectedBillingAccountId : undefined}
      // In Billing Accounts view, drop the Resource group filter pill and the RG/Resources tabs in Details.
      companyView={view === "billing-accounts"}
      // The methodology disclaimer is removed across the entire company-level exploration (both sub-views).
      hideMethodologyFooter
      // Permissions error variant: replace the data area with an empty state when switching to BA view.
      errorState={isBillingAccountsAccessError ? billingAccessErrorState : undefined}
      isLoading={isLoading}
      filters={filters}
      onFiltersChange={setFilters}
      extraNavItems={extraNavItems}
      extraViewLabels={extraViewLabels}
      extraViewIconSrc={extraViewIconSrc}
      extraViewContent={extraViewContent}
      initialActiveView={initialActiveView}
      onActiveViewChange={onActiveViewChange}
    />
    {enableTour && tourSteps.map((step, idx) => (
      <TeachingPopover
        key={idx}
        open={tourStep === idx}
        onOpenChange={(_, data) => { if (!data.open) closeTour() }}
        appearance="brand"
        withArrow
        positioning={{ target: step.target.current, position: step.position, align: "center", offset: 12 }}
      >
        <TeachingPopoverSurface className={styles.tourSurface}>
          <TeachingPopoverBody>
            <Text className={styles.tourBody}>{step.body}</Text>
          </TeachingPopoverBody>
          <div className={styles.tourFooter}>
            <Text className={styles.tourPageCount}>{idx + 1} of {tourSteps.length}</Text>
            <div className={styles.tourFooterButtons}>
              {/* Next button (or Close on the final step). Primary appearance renders
                  white-on-blue on the brand surface to match the Figma spec. */}
              <Button
                size="small"
                appearance="primary"
                className={styles.tourButtonPrimary}
                onClick={idx === tourSteps.length - 1 ? closeTour : goNext}
              >
                {idx === tourSteps.length - 1 ? "Close" : "Next"}
              </Button>
              {/* Previous appears from step 2 onward. Outline appearance gives the
                  transparent-with-white-border look on the brand surface. */}
              {idx > 0 && (
                <Button
                  size="small"
                  appearance="outline"
                  className={styles.tourButtonOutline}
                  onClick={goPrev}
                >
                  Previous
                </Button>
              )}
            </div>
          </div>
        </TeachingPopoverSurface>
      </TeachingPopover>
    ))}
    </>
  )
}

const useStyles = makeStyles({
  exportMenuPopover: {
    minWidth: "292px",
  },
  // Inline anchor that wraps the trends Export button so a TeachingPopover can target it.
  // Uses inline-block (not display:contents) so the wrapper has a measurable bounding rect —
  // otherwise the popover positioner falls back to the viewport's top-left corner.
  exportAnchor: {
    display: "inline-block",
  },
  // Cap the brand-blue tour bubble at the Figma spec width so long copy wraps cleanly
  // instead of stretching across the viewport.
  tourSurface: {
    maxWidth: "320px",
  },
  // Body text size matches the Figma teaching popover (Body1, ~14px). White is inherited
  // from the brand-appearance popover surface.
  tourBody: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: "inherit",
  },
  // Tour bubble footer (3rd row of the brand-blue popover) — page count on the left,
  // Next/Previous (or Close/Previous on the final step) on the right.
  tourFooter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: tokens.spacingHorizontalM,
  },
  tourPageCount: {
    fontSize: tokens.fontSizeBase300,
    color: "inherit",
  },
  tourFooterButtons: {
    display: "flex",
    flexDirection: "row",
    gap: tokens.spacingHorizontalS,
  },
  // The default Fluent primary button is brand-blue — same as our popover surface, so it
  // disappears. Force a white fill with blue text/border to match the Figma spec.
  tourButtonPrimary: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: "#0078D4",
    borderTopColor: tokens.colorNeutralBackground1,
    borderRightColor: tokens.colorNeutralBackground1,
    borderBottomColor: tokens.colorNeutralBackground1,
    borderLeftColor: tokens.colorNeutralBackground1,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: "#106EBE",
      borderTopColor: tokens.colorNeutralBackground1Hover,
      borderRightColor: tokens.colorNeutralBackground1Hover,
      borderBottomColor: tokens.colorNeutralBackground1Hover,
      borderLeftColor: tokens.colorNeutralBackground1Hover,
    },
    "&:hover:active": {
      backgroundColor: tokens.colorNeutralBackground1Pressed,
      color: "#005A9E",
      borderTopColor: tokens.colorNeutralBackground1Pressed,
      borderRightColor: tokens.colorNeutralBackground1Pressed,
      borderBottomColor: tokens.colorNeutralBackground1Pressed,
      borderLeftColor: tokens.colorNeutralBackground1Pressed,
    },
  },
  // Outline buttons inherit neutral colors that vanish on the blue surface. Force white
  // border + white label so the Previous button reads cleanly against brand-blue.
  tourButtonOutline: {
    backgroundColor: "transparent",
    color: tokens.colorNeutralBackground1,
    borderTopColor: tokens.colorNeutralBackground1,
    borderRightColor: tokens.colorNeutralBackground1,
    borderBottomColor: tokens.colorNeutralBackground1,
    borderLeftColor: tokens.colorNeutralBackground1,
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: tokens.colorNeutralBackground1,
      borderTopColor: tokens.colorNeutralBackground1,
      borderRightColor: tokens.colorNeutralBackground1,
      borderBottomColor: tokens.colorNeutralBackground1,
      borderLeftColor: tokens.colorNeutralBackground1,
    },
    "&:hover:active": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: tokens.colorNeutralBackground1,
      borderTopColor: tokens.colorNeutralBackground1,
      borderRightColor: tokens.colorNeutralBackground1,
      borderBottomColor: tokens.colorNeutralBackground1,
      borderLeftColor: tokens.colorNeutralBackground1,
    },
  },
  compactExportToolbar: {
    // Toolbar lives inside a card, so drop the bottom divider line that the
    // page-level command bar uses.
    borderBottomStyle: "none",
    backgroundColor: "transparent",
    // Tint just the leading icon brand-blue; label and chevron stay neutral.
    "& button > span:first-child": {
      color: tokens.colorBrandForeground1,
    },
  },
  exportMenuItem: {
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
  },
  exportMenuItemIconBrand: {
    color: tokens.colorBrandForeground1,
  },
  exportMenuItemText: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  exportMenuItemPrimary: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
  exportMenuItemSecondary: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  viewPickerWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  pickerRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: tokens.spacingHorizontalL,
    flexWrap: "wrap",
  },
  picker: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    minWidth: "240px",
  },
  pickerLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase200,
  },
  pickerDropdown: {
    minWidth: "240px",
  },
  viewTriggerContent: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  viewOptionIcon: {
    width: "16px",
    height: "16px",
    objectFit: "contain",
    flexShrink: 0,
  },
  viewPickerDivider: {
    width: "100%",
  },
  description: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: "16px",
  },
  descriptionLink: {
    fontSize: tokens.fontSizeBase200,
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
  },
  feedbackFooter: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    paddingTop: tokens.spacingVerticalXL,
    marginTop: tokens.spacingVerticalL,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: tokens.colorNeutralStroke2,
  },
  feedbackLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  feedbackLink: {
    fontSize: tokens.fontSizeBase200,
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    textDecorationLine: "none",
    ":hover": {
      textDecorationLine: "underline",
    },
  },
})
