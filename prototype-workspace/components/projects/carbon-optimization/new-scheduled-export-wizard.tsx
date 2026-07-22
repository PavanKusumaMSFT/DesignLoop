/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Link,
  TabList,
  Tab,
  Field,
  Input,
  Dropdown,
  Option,
  SearchBox,
  Switch,
  OverlayDrawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  type SelectTabData,
  type SelectTabEvent,
} from "@fluentui/react-components"
import {
  Dismiss20Regular,
  Add20Regular,
  Info16Regular,
  ChevronDown16Regular,
} from "@fluentui/react-icons"
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp"
import PageBreadcrumb from "../../shared/page-breadcrumb"
import ResourcePicker, { type ResourcePickerColumn, type ResourcePickerFilter } from "../../shared/resource-picker"
import { allSubscriptions, allResourceGroups, billingAccounts, locations, type Subscription } from "./data/mock-data"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

type WizardTab = "basics" | "storage" | "review"

const TAB_ORDER: WizardTab[] = ["basics", "storage", "review"]
const TAB_LABELS: Record<WizardTab, string> = {
  basics: "Basics",
  storage: "Storage",
  review: "Review + create",
}

export type ReportType = "trends" | "breakdown" | "reductions"

interface ReportTypeDef {
  id: ReportType
  title: string
  description: string
  startsWith: string
  iconSrc: string
}

const REPORT_TYPES: ReportTypeDef[] = [
  {
    id: "trends",
    title: "Emission trends",
    description: "Monthly totals with Scope 1, 2, and 3 breakdown for the last 12 months.",
    startsWith: "Monthly emissions by scope",
    iconSrc: "/icons/carbon-optimization/emission-trends.svg",
  },
  {
    id: "breakdown",
    title: "Emissions breakdown",
    description: "Latest month vs. previous month emissions, broken down by your choice of dimension.",
    startsWith: "Emissions by subscription, resource group, resource, type, or location",
    iconSrc: "/icons/carbon-optimization/emission-details.svg",
  },
  {
    id: "reductions",
    title: "Reduction recommendations",
    description: "List of suggested optimizations with estimated emissions savings.",
    startsWith: "Recommendations with savings estimates",
    iconSrc: "/icons/carbon-optimization/emission-reductions.svg",
  },
]

type BreakdownDimension = "subscription" | "resourceGroup" | "resource" | "resourceType" | "location"

const BREAKDOWN_LABELS: Record<BreakdownDimension, string> = {
  subscription: "Subscription",
  resourceGroup: "Resource group",
  resource: "Resource",
  resourceType: "Resource type",
  location: "Location",
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  pageTitle: {
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  closeButton: {
    color: tokens.colorNeutralForeground2,
  },
  tabs: {
    paddingLeft: "20px",
    paddingRight: "20px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorNeutralStroke2,
  },
  body: {
    flex: 1,
    paddingTop: tokens.spacingVerticalL,
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "128px",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "180px 1fr",
    columnGap: tokens.spacingHorizontalM,
    alignItems: "center",
    maxWidth: "640px",
  },
  // Variant of fieldRow used when the right cell stacks a control above help text (e.g. a Switch
  // followed by an info caption). Top-aligns the label with the control line instead of centering
  // it against the full stack.
  fieldRowToggle: {
    display: "grid",
    gridTemplateColumns: "180px 1fr",
    columnGap: tokens.spacingHorizontalM,
    alignItems: "start",
    maxWidth: "640px",
  },
  fieldRowSubordinate: {
    display: "grid",
    gridTemplateColumns: "180px 1fr",
    columnGap: tokens.spacingHorizontalM,
    alignItems: "center",
    maxWidth: "640px",
    position: "relative",
    minHeight: "32px",
  },
  subordinateLabelCell: {
    position: "relative",
    paddingLeft: "32px",
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorNeutralForeground1,
  },
  subordinateLine: {
    position: "absolute",
    left: "12px",
    top: "-12px",
    width: "16px",
    height: "20px",
    borderLeftWidth: "1px",
    borderLeftStyle: "solid",
    borderLeftColor: tokens.colorNeutralStroke1,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorNeutralStroke1,
    borderBottomLeftRadius: "2px",
  },
  label: {
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorNeutralForeground1,
    textAlign: "left",
  },
  inputControl: {
    width: "100%",
    maxWidth: "400px",
  },
  linkButton: {
    justifySelf: "start",
    color: tokens.colorBrandForeground1,
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: "auto",
    fontWeight: tokens.fontWeightRegular,
  },
  selectionSummary: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorNeutralForeground1,
  },
  sectionHeader: {
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginTop: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalXS,
  },
  controlStack: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacingVerticalXS,
    width: "100%",
    maxWidth: "400px",
  },
  createNewLink: {
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorBrandForeground1,
  },
  toggleControlCell: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  toggleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  toggleHelp: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalXS,
    fontSize: "12px",
    lineHeight: "16px",
    color: tokens.colorNeutralForeground2,
    paddingLeft: "2px",
  },
  toggleHelpIcon: {
    flexShrink: 0,
    marginTop: "1px",
    color: tokens.colorNeutralForeground3,
  },
  placeholderTab: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase300,
    paddingTop: tokens.spacingVerticalXXL,
  },
  pickerIntro: {
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalS,
    maxWidth: "720px",
  },
  pickerSectionLabel: {
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
  },
  pickerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 280px))",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalL,
  },
  pickerCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacingVerticalXS,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    textAlign: "left",
    transitionDuration: tokens.durationNormal,
    transitionProperty: "border-color, box-shadow, background-color",
    ":hover": {
      borderTopColor: tokens.colorNeutralStroke1,
      borderRightColor: tokens.colorNeutralStroke1,
      borderBottomColor: tokens.colorNeutralStroke1,
      borderLeftColor: tokens.colorNeutralStroke1,
      boxShadow: tokens.shadow4,
    },
  },
  pickerCardSelected: {
    borderTopColor: "#0078D4",
    borderRightColor: "#0078D4",
    borderBottomColor: "#0078D4",
    borderLeftColor: "#0078D4",
    boxShadow: tokens.shadow4,
  },
  pickerCardIcon: {
    width: "32px",
    height: "32px",
    marginBottom: tokens.spacingVerticalXS,
  },
  pickerCardTitle: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  pickerCardDesc: {
    fontSize: "12px",
    lineHeight: "16px",
    color: tokens.colorNeutralForeground2,
  },
  pickerCardStartsWith: {
    fontSize: "11px",
    lineHeight: "14px",
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXS,
  },
  selectedTemplateRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorNeutralBackground2,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    marginBottom: tokens.spacingVerticalL,
    maxWidth: "720px",
  },
  selectedTemplateIcon: {
    width: "24px",
    height: "24px",
    flexShrink: 0,
  },
  selectedTemplateText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  selectedTemplateTitle: {
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  selectedTemplateDesc: {
    fontSize: "12px",
    lineHeight: "16px",
    color: tokens.colorNeutralForeground2,
  },
  // In edit mode, structurally-locked fields are rendered as plain text in the right column
  // (same row grid as editable fields). No input chrome, no "disabled" cue — the absence of
  // a control is the cue.
  readOnlyValue: {
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorNeutralForeground1,
    paddingTop: "5px",
    paddingBottom: "5px",
  },
  reviewSection: {
    marginBottom: tokens.spacingVerticalXXL,
    maxWidth: "640px",
  },
  reviewSectionTitle: {
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalM,
  },
  reviewRow: {
    display: "grid",
    gridTemplateColumns: "200px 1fr",
    columnGap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
  },
  reviewLabel: {
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorNeutralForeground2,
  },
  reviewValue: {
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorNeutralForeground1,
  },
  reviewValueMuted: {
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorNeutralForeground3,
    fontStyle: "italic",
  },
  subPickerTrigger: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalS,
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalS,
    backgroundColor: tokens.colorNeutralBackground1,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    borderLeft: `1px solid ${tokens.colorNeutralStroke1}`,
    borderBottom: `1px solid ${tokens.colorNeutralStrokeAccessible}`,
    borderRadius: tokens.borderRadiusMedium,
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    textAlign: "left",
  },
  subPickerTriggerPlaceholder: {
    color: tokens.colorNeutralForeground3,
  },
  subPickerSurface: {
    padding: 0,
    width: "400px",
    maxHeight: "720px",
    display: "flex",
    flexDirection: "column",
  },
  subPickerSearchWrap: {
    padding: tokens.spacingHorizontalS,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorNeutralStroke2,
  },
  subPickerList: {
    overflowY: "auto",
    flex: 1,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
  },
  subPickerOption: {
    width: "100%",
    display: "block",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    backgroundColor: "transparent",
    borderTopStyle: "none",
    borderRightStyle: "none",
    borderBottomStyle: "none",
    borderLeftStyle: "none",
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    textAlign: "left",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  subPickerOptionSelected: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
  },
  subPickerEmpty: {
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    fontSize: "13px",
    color: tokens.colorNeutralForeground3,
    textAlign: "center",
  },
  footer: {
    position: "fixed",
    bottom: "48px",
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    backgroundColor: tokens.colorNeutralBackground1,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: tokens.colorNeutralStroke2,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: "20px",
    paddingRight: "20px",
    boxShadow: tokens.shadow8,
  },
})

/** A single execution row shown in the export's Run history table. */
export interface ExportRunHistoryEntry {
  executionTime: string
  status: "Succeeded" | "Failed" | "In progress" | "Queued"
  exportTimePeriod: string
}

/** A user-created export record, returned from the wizard via `onCreate`. Used by the Exports list view to render a row. */
export interface CreatedExport {
  id: string
  name: string
  reportType: ReportType
  reportTypeLabel: string
  reportTypeIconSrc: string
  breakdownDimension: BreakdownDimension | null
  scope: string
  frequency: string
  destination: string
  status: "Active" | "Inactive" | "Paused"
  lastRun: string
  createdAt: string
  // Raw scope identifiers for round-tripping into edit mode. Wizard-created exports populate these;
  // some seed rows may omit them (the picker will then start empty in edit mode for the editable scope field).
  viewKind?: "subscriptions" | "billing-accounts"
  billingAccountId?: string
  selectedSubscriptionIds?: string[]
  // Optional Essentials/run-history mock data. Seed rows populate these so the detail drawer
  // shows realistic content; wizard-created exports leave them undefined and the drawer fills
  // in computed defaults.
  typeOfData?: string
  exportStartDate?: string
  expirationDate?: string
  filePartitioning?: "On" | "Off"
  overwriteData?: "On" | "Off"
  storageType?: string
  storageAccount?: string
  storageAccountSubscription?: string
  destinationSubscriptionName?: string
  storageContainer?: string
  storageDirectory?: string
  datasetVersion?: string
  description?: string
  format?: string
  compressionType?: string
  runHistory?: ExportRunHistoryEntry[]
}

export interface NewScheduledExportWizardProps {
  /** Called when the user dismisses the wizard (X button or Cancel-equivalent) */
  onClose?: () => void
  /** Optional override for the breadcrumb's "Scheduled exports" item click */
  onBreadcrumbScheduledExports?: () => void
  /** Called when the user clicks Review + create on the Review tab. Receives a record that the parent should append to its exports list. */
  onCreate?: (record: CreatedExport) => void
  /** Pre-selects a report-type template card on entry (e.g. when the user enters the wizard from a specific blade's "Export to storage" menu item). */
  initialReportType?: ReportType
  /** Pre-selects the View dropdown (Subscriptions vs. Billing accounts). */
  initialView?: "subscriptions" | "billing-accounts"
  /** Pre-selects a billing account id when initialView is "billing-accounts". */
  initialBillingAccountId?: string
  /** Pre-selects subscription ids when initialView is "subscriptions". */
  initialSubscriptionIds?: string[]
  /** When "edit", the wizard prefills from `initialExport`, locks structural fields (template, breakdown, view, billing account, frequency, storage type, format), changes the title to "Edit export", and the primary action to "Save". */
  mode?: "create" | "edit"
  /** The export being edited. Required when `mode="edit"`. */
  initialExport?: CreatedExport
  /** Called in edit mode when the user clicks Save on the Review tab. Receives the updated record (same `id` as `initialExport`). */
  onSave?: (record: CreatedExport) => void
}

/** Full-page wizard launched from the v3 Async exports blade's \"Create\" command. Three horizontal tabs (Basics, Storage, Review + create) with left-label form fields, plus a fixed footer action bar. Lightweight intentionally — does not use the shared WizardLayout/WizardStepNav infrastructure (which is vertical-only).\n *\n * **Edit mode** — pass `mode=\"edit\"` + `initialExport` to switch the wizard into edit mode. The title becomes \"Edit export\", the primary action becomes \"Save\", and seven structurally-significant fields are locked (disabled): template, breakdown dimension, view, billing account, frequency, storage type, format. A banner at the top explains why. Editable fields cover lifecycle/routing knobs: name, subscription scope, destination subscription/account/container, directory, compression, overwrite. */
export default function NewScheduledExportWizard({
  onClose,
  onBreadcrumbScheduledExports,
  onCreate,
  initialReportType,
  initialView,
  initialBillingAccountId,
  initialSubscriptionIds,
  mode = "create",
  initialExport,
  onSave,
}: NewScheduledExportWizardProps) {
  const styles = useStyles()
  const isEdit = mode === "edit" && !!initialExport

  // Derive raw form values from a CreatedExport (only used in edit mode). Some seed exports
  // store display strings rather than raw IDs, so we map them back where possible.
  const editPrefill = isEdit && initialExport
    ? (() => {
        const e = initialExport
        const frequencyValue =
          e.frequency === "Monthly" ? "monthly" : e.frequency === "One-time" ? "one-time" : ""
        const formatValue =
          e.format?.toLowerCase() === "csv"
            ? "csv"
            : e.format?.toLowerCase() === "parquet"
              ? "parquet"
              : ""
        const compressionValue =
          e.compressionType?.toLowerCase() === "gzip"
            ? "gzip"
            : e.compressionType?.toLowerCase() === "none"
              ? "none"
              : ""
        const viewValue: "subscriptions" | "billing-accounts" | "" =
          e.viewKind ??
          (e.scope.startsWith("Subscriptions")
            ? "subscriptions"
            : e.scope.startsWith("Billing account")
              ? "billing-accounts"
              : "")
        const billingAccountValue =
          e.billingAccountId ??
          (viewValue === "billing-accounts"
            ? billingAccounts.find(
                (ba) => ba.name === e.scope.replace("Billing account: ", "")
              )?.id ?? ""
            : "")
        const destinationSubValue = e.destinationSubscriptionName
          ? allSubscriptions.find((s) => s.name === e.destinationSubscriptionName)?.id ?? ""
          : ""
        return {
          reportType: e.reportType,
          exportName: e.name,
          breakdownDimension: (e.breakdownDimension ?? "") as BreakdownDimension | "",
          view: viewValue as string,
          billingAccount: billingAccountValue,
          selectedSubscriptionIds: e.selectedSubscriptionIds ?? [],
          frequency: frequencyValue,
          storageType: "azure-blob",
          destinationSubscription: destinationSubValue,
          storageAccount: e.storageAccount ?? "",
          container: e.storageContainer ?? "",
          directory: e.storageDirectory ?? "",
          format: formatValue,
          compressionType: compressionValue,
          overwriteData: e.overwriteData === "On",
        }
      })()
    : null

  const [activeTab, setActiveTab] = useState<WizardTab>("basics")
  const [reportType, setReportType] = useState<ReportType | null>(
    editPrefill?.reportType ?? initialReportType ?? null
  )
  const [breakdownDimension, setBreakdownDimension] = useState<BreakdownDimension | "">(
    editPrefill?.breakdownDimension ?? ""
  )
  const [exportName, setExportName] = useState(editPrefill?.exportName ?? "")
  const [view, setView] = useState<string>(editPrefill?.view ?? initialView ?? "")
  const [billingAccount, setBillingAccount] = useState<string>(
    editPrefill?.billingAccount ?? initialBillingAccountId ?? ""
  )
  const [frequency, setFrequency] = useState(editPrefill?.frequency ?? "")
  const [pickerOpen, setPickerOpen] = useState(false)
  const [selectedSubscriptionIds, setSelectedSubscriptionIds] = useState<string[]>(
    editPrefill?.selectedSubscriptionIds ?? initialSubscriptionIds ?? []
  )

  // When the user switches to Billing accounts view, the breakdown options shrink to match
  // the Emission Details blade (Subscriptions / Resource type / Location). Clear any prior
  // selection that's no longer valid so the form stays consistent.
  useEffect(() => {
    if (view !== "billing-accounts") return
    if (breakdownDimension && !["subscription", "resourceType", "location"].includes(breakdownDimension)) {
      setBreakdownDimension("")
    }
  }, [view, breakdownDimension])

  // Storage tab
  const [storageType, setStorageType] = useState<string>(editPrefill?.storageType ?? "azure-blob")
  const [destinationSubscription, setDestinationSubscription] = useState<string>(
    editPrefill?.destinationSubscription ?? ""
  )
  const [storageAccount, setStorageAccount] = useState<string>(editPrefill?.storageAccount ?? "")
  const [container, setContainer] = useState(editPrefill?.container ?? "")
  const [directory, setDirectory] = useState(editPrefill?.directory ?? "")
  const [format, setFormat] = useState<string>(editPrefill?.format ?? "")
  const [compressionType, setCompressionType] = useState<string>(editPrefill?.compressionType ?? "")
  const [filePartitioning, setFilePartitioning] = useState(true)
  // eslint-disable-next-line no-unused-vars
  const _ignoreSetFilePartitioning = setFilePartitioning
  const [destinationSubQuery, setDestinationSubQuery] = useState("")
  const [destinationSubOpen, setDestinationSubOpen] = useState(false)
  const destinationSubTriggerRef = useRef<HTMLButtonElement>(null)
  const [destinationSubMaxHeight, setDestinationSubMaxHeight] = useState(720)

  // Recompute the picker max height when it opens (and on resize while open) so the popover
  // never extends past the bottom of the viewport. Caps at 720px when there is enough room.
  useEffect(() => {
    if (!destinationSubOpen) return
    const compute = () => {
      const trigger = destinationSubTriggerRef.current
      if (!trigger) return
      const rect = trigger.getBoundingClientRect()
      const gap = 24 // breathing room from viewport bottom
      const available = window.innerHeight - rect.bottom - gap
      const next = Math.max(200, Math.min(720, available))
      setDestinationSubMaxHeight(next)
    }
    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [destinationSubOpen])
  const [overwriteData, setOverwriteData] = useState(editPrefill?.overwriteData ?? true)
  const [createStorageOpen, setCreateStorageOpen] = useState(false)
  const [storageAccountOptions, setStorageAccountOptions] = useState<string[]>([
    "contoso-emissions-sa",
    "contoso-reports-sa",
  ])

  const activeIndex = TAB_ORDER.indexOf(activeTab)
  const isFirst = activeIndex === 0
  const isReview = activeTab === "review"
  const nextTab = !isReview ? TAB_ORDER[activeIndex + 1] : null

  const handleTabSelect = (_e: SelectTabEvent, data: SelectTabData) => {
    setActiveTab(data.value as WizardTab)
  }

  const goPrevious = () => {
    if (!isFirst) setActiveTab(TAB_ORDER[activeIndex - 1])
  }

  const goNext = () => {
    if (nextTab) setActiveTab(nextTab)
  }

  const goReview = () => setActiveTab("review")

  return (
    <div className={styles.root}>
      <AzureHeaderBuildMVP />

      <PageBreadcrumb
        noBorder
        items={[
          { label: "Home", onClick: () => {} },
          {
            label: "Carbon optimization | Exports",
            onClick: onBreadcrumbScheduledExports,
          },
        ]}
      />

      <div className={styles.titleRow}>
        <Text className={styles.pageTitle} as="h1">
          {isEdit ? "Edit export" : "New export"}
        </Text>
        <Button
          appearance="subtle"
          icon={<Dismiss20Regular />}
          aria-label="Close"
          className={styles.closeButton}
          onClick={onClose}
        />
      </div>

      <div className={styles.tabs}>
        <TabList selectedValue={activeTab} onTabSelect={handleTabSelect}>
          {TAB_ORDER.map((id) => (
            <Tab key={id} value={id}>
              {TAB_LABELS[id]}
            </Tab>
          ))}
        </TabList>
      </div>

      <div className={styles.body}>
        {activeTab === "basics" && (
          <>
            {reportType === null && !isEdit ? (
              <>
                <Text className={styles.pickerIntro}>
                  Choose what data this export should produce. Each option mirrors data you can already see in Carbon optimization, on a schedule.
                </Text>
                <Text className={styles.pickerSectionLabel}>Select a template</Text>
                <div className={styles.pickerGrid} role="radiogroup" aria-label="Export template">
                  {REPORT_TYPES.map((rt) => {
                    const selected = false
                    return (
                      <button
                        key={rt.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        className={`${styles.pickerCard}${selected ? ` ${styles.pickerCardSelected}` : ""}`}
                        onClick={() => setReportType(rt.id)}
                      >
                        <img
                          src={rt.iconSrc}
                          alt=""
                          aria-hidden="true"
                          className={styles.pickerCardIcon}
                        />
                        <span className={styles.pickerCardTitle}>{rt.title}</span>
                        <span className={styles.pickerCardDesc}>{rt.description}</span>
                      </button>
                    )
                  })}
                </div>
              </>
            ) : (
              <>
                {(() => {
                  const rt = REPORT_TYPES.find((r) => r.id === reportType)
                  if (!rt) return null
                  return (
                    <div className={styles.selectedTemplateRow}>
                      <img
                        src={rt.iconSrc}
                        alt=""
                        aria-hidden="true"
                        className={styles.selectedTemplateIcon}
                      />
                      <div className={styles.selectedTemplateText}>
                        <span className={styles.selectedTemplateTitle}>{rt.title}</span>
                        <span className={styles.selectedTemplateDesc}>{rt.description}</span>
                      </div>
                      {!isEdit && (
                        <Link
                          as="button"
                          onClick={() => {
                            setReportType(null)
                            setBreakdownDimension("")
                          }}
                        >
                          Change template
                        </Link>
                      )}
                    </div>
                  )
                })()}

            <div className={styles.fieldRow}>
              <span className={styles.label}>Export name *</span>
              <Field>
                <Input
                  className={styles.inputControl}
                  value={exportName}
                  onChange={(_, d) => setExportName(d.value)}
                />
              </Field>
            </div>

            <div className={styles.fieldRow}>
              <span className={styles.label}>View{!isEdit && " *"}</span>
              {isEdit ? (
                <span className={styles.readOnlyValue}>
                  {view === "subscriptions" ? "Subscriptions" : view === "billing-accounts" ? "Billing accounts" : "—"}
                </span>
              ) : (
                <Field>
                  <Dropdown
                    className={styles.inputControl}
                    value={view === "subscriptions" ? "Subscriptions" : view === "billing-accounts" ? "Billing accounts" : ""}
                    selectedOptions={view ? [view] : []}
                    onOptionSelect={(_, d) => {
                      const next = d.optionValue ?? ""
                      setView(next)
                      // Closing the resource picker if user switches away from subscriptions while it was open
                      if (next !== "subscriptions" && pickerOpen) {
                        setPickerOpen(false)
                      }
                    }}
                    placeholder=""
                  >
                    <Option value="subscriptions">Subscriptions</Option>
                    <Option value="billing-accounts">Billing accounts</Option>
                  </Dropdown>
                </Field>
              )}
            </div>

            {view === "subscriptions" && (
              <div className={styles.fieldRowSubordinate}>
                <span className={styles.subordinateLabelCell}>
                  <span className={styles.subordinateLine} aria-hidden="true" />
                  Select subscriptions *
                </span>
                {selectedSubscriptionIds.length > 0 ? (
                  <span className={styles.selectionSummary}>
                    <Text>
                      {selectedSubscriptionIds.length} subscription{selectedSubscriptionIds.length === 1 ? "" : "s"} selected
                    </Text>
                    <Text aria-hidden="true"> · </Text>
                    <Link as="button" onClick={() => setPickerOpen(true)}>
                      Edit
                    </Link>
                  </span>
                ) : (
                  <Button
                    appearance="transparent"
                    icon={<Add20Regular />}
                    className={styles.linkButton}
                    onClick={() => setPickerOpen(true)}
                  >
                    Add subscriptions
                  </Button>
                )}
              </div>
            )}

            {view === "billing-accounts" && (
              <div className={styles.fieldRowSubordinate}>
                <span className={styles.subordinateLabelCell}>
                  <span className={styles.subordinateLine} aria-hidden="true" />
                  Select billing account{!isEdit && " *"}
                </span>
                {isEdit ? (
                  <span className={styles.readOnlyValue}>
                    {billingAccounts.find((ba) => ba.id === billingAccount)?.name ?? "—"}
                  </span>
                ) : (
                  <Field>
                    <Dropdown
                      className={styles.inputControl}
                      value={billingAccounts.find((ba) => ba.id === billingAccount)?.name ?? ""}
                      selectedOptions={billingAccount ? [billingAccount] : []}
                      onOptionSelect={(_, d) => setBillingAccount(d.optionValue ?? "")}
                      placeholder=""
                    >
                      {billingAccounts.map((ba) => (
                        <Option key={ba.id} value={ba.id}>
                          {ba.name}
                        </Option>
                      ))}
                    </Dropdown>
                  </Field>
                )}
              </div>
            )}

            <div className={styles.fieldRow}>
              <span className={styles.label}>Frequency{!isEdit && " *"}</span>
              {isEdit ? (
                <span className={styles.readOnlyValue}>
                  {frequency === "one-time" ? "One-time" : frequency === "monthly" ? "Monthly" : "—"}
                </span>
              ) : (
                <Field>
                  <Dropdown
                    className={styles.inputControl}
                    value={frequency === "one-time" ? "One-time" : frequency === "monthly" ? "Monthly" : ""}
                    selectedOptions={frequency ? [frequency] : []}
                    onOptionSelect={(_, d) => setFrequency(d.optionValue ?? "")}
                    placeholder=""
                  >
                    <Option value="one-time">One-time</Option>
                    <Option value="monthly">Monthly</Option>
                  </Dropdown>
                </Field>
              )}
            </div>

            {reportType === "breakdown" && (() => {
              // When the user has chosen Billing accounts as the view, the available breakdown
              // dimensions match the Emission Details blade tabs in BA mode (Subscriptions /
              // Resource type / Location — no Resource group, no Resource).
              const allowedBreakdowns: BreakdownDimension[] = view === "billing-accounts"
                ? ["subscription", "resourceType", "location"]
                : (Object.keys(BREAKDOWN_LABELS) as BreakdownDimension[])
              const isCurrentValid = !breakdownDimension || allowedBreakdowns.includes(breakdownDimension as BreakdownDimension)
              return (
                <div className={styles.fieldRow}>
                  <span className={styles.label}>Break down by{!isEdit && " *"}</span>
                  {isEdit ? (
                    <span className={styles.readOnlyValue}>
                      {isCurrentValid && breakdownDimension ? BREAKDOWN_LABELS[breakdownDimension] : "—"}
                    </span>
                  ) : (
                    <Field>
                      <Dropdown
                        className={styles.inputControl}
                        value={isCurrentValid && breakdownDimension ? BREAKDOWN_LABELS[breakdownDimension] : ""}
                        selectedOptions={isCurrentValid && breakdownDimension ? [breakdownDimension] : []}
                        onOptionSelect={(_, d) =>
                          setBreakdownDimension((d.optionValue as BreakdownDimension) ?? "")
                        }
                        placeholder=""
                      >
                        {allowedBreakdowns.map((k) => (
                          <Option key={k} value={k}>
                            {BREAKDOWN_LABELS[k]}
                          </Option>
                        ))}
                      </Dropdown>
                    </Field>
                  )}
                </div>
              )
            })()}
              </>
            )}
          </>
        )}

        {activeTab === "storage" && (
          <>
            <div className={styles.fieldRow}>
              <span className={styles.label}>Storage type{!isEdit && " *"}</span>
              {isEdit ? (
                <span className={styles.readOnlyValue}>
                  {storageType === "azure-blob" ? "Azure blob storage" : "—"}
                </span>
              ) : (
                <Field>
                  <Dropdown
                    className={styles.inputControl}
                    value={storageType === "azure-blob" ? "Azure blob storage" : ""}
                    selectedOptions={storageType ? [storageType] : []}
                    onOptionSelect={(_, d) => setStorageType(d.optionValue ?? "")}
                  >
                    <Option value="azure-blob">Azure blob storage</Option>
                  </Dropdown>
                </Field>
              )}
            </div>

            <div className={styles.sectionHeader}>Destination</div>

            <div className={styles.fieldRow}>
              <span className={styles.label}>Destination subscription *</span>
              <Popover
                open={destinationSubOpen}
                onOpenChange={(_, d) => {
                  setDestinationSubOpen(d.open)
                  if (!d.open) setDestinationSubQuery("")
                }}
                positioning="below-start"
                trapFocus
              >
                <PopoverTrigger disableButtonEnhancement>
                  <button
                    type="button"
                    ref={destinationSubTriggerRef}
                    className={styles.subPickerTrigger}
                  >
                    {destinationSubscription ? (
                      <span>
                        {allSubscriptions.find((s) => s.id === destinationSubscription)?.name}
                      </span>
                    ) : (
                      <span className={styles.subPickerTriggerPlaceholder}>
                        Select a subscription
                      </span>
                    )}
                    <ChevronDown16Regular />
                  </button>
                </PopoverTrigger>
                <PopoverSurface
                  className={styles.subPickerSurface}
                  style={{ maxHeight: `${destinationSubMaxHeight}px` }}
                >
                  <div className={styles.subPickerSearchWrap}>
                    <SearchBox
                      placeholder="Search subscriptions"
                      value={destinationSubQuery}
                      onChange={(_, d) => setDestinationSubQuery(d.value)}
                      style={{ width: "100%" }}
                      autoFocus
                    />
                  </div>
                  <div className={styles.subPickerList} role="listbox">
                    {(() => {
                      const q = destinationSubQuery.trim().toLowerCase()
                      const filtered = q
                        ? allSubscriptions.filter((s) => s.name.toLowerCase().includes(q))
                        : allSubscriptions
                      if (filtered.length === 0) {
                        return (
                          <div className={styles.subPickerEmpty}>No subscriptions match.</div>
                        )
                      }
                      return filtered.map((s) => {
                        const selected = s.id === destinationSubscription
                        return (
                          <button
                            key={s.id}
                            type="button"
                            role="option"
                            aria-selected={selected}
                            className={`${styles.subPickerOption}${selected ? ` ${styles.subPickerOptionSelected}` : ""}`}
                            onClick={() => {
                              setDestinationSubscription(s.id)
                              setDestinationSubOpen(false)
                              setDestinationSubQuery("")
                            }}
                          >
                            {s.name}
                          </button>
                        )
                      })
                    })()}
                  </div>
                </PopoverSurface>
              </Popover>
            </div>

            <div className={styles.fieldRow}>
              <span className={styles.label}>Storage account *</span>
              <div className={styles.controlStack}>
                <Field style={{ width: "100%" }}>
                  <Dropdown
                    className={styles.inputControl}
                    value={storageAccount}
                    selectedOptions={storageAccount ? [storageAccount] : []}
                    onOptionSelect={(_, d) => setStorageAccount(d.optionValue ?? "")}
                    placeholder=""
                  >
                    {storageAccountOptions.map((sa) => (
                      <Option key={sa} value={sa}>
                        {sa}
                      </Option>
                    ))}
                  </Dropdown>
                </Field>
                <Link
                  as="button"
                  className={styles.createNewLink}
                  onClick={() => setCreateStorageOpen(true)}
                >
                  Create new
                </Link>
              </div>
            </div>

            <div className={styles.sectionHeader}>Delivery path</div>

            <div className={styles.fieldRow}>
              <span className={styles.label}>Container *</span>
              <Field>
                <Input
                  className={styles.inputControl}
                  value={container}
                  onChange={(_, d) => setContainer(d.value)}
                />
              </Field>
            </div>

            <div className={styles.fieldRow}>
              <span className={styles.label}>Directory</span>
              <Field>
                <Input
                  className={styles.inputControl}
                  value={directory}
                  onChange={(_, d) => setDirectory(d.value)}
                />
              </Field>
            </div>

            <div className={styles.sectionHeader}>Dataset format</div>

            <div className={styles.fieldRow}>
              <span className={styles.label}>Format{!isEdit && " *"}</span>
              {isEdit ? (
                <span className={styles.readOnlyValue}>
                  {format === "csv" ? "CSV" : format === "parquet" ? "Parquet" : "—"}
                </span>
              ) : (
                <Field>
                  <Dropdown
                    className={styles.inputControl}
                    value={format === "csv" ? "CSV" : format === "parquet" ? "Parquet" : ""}
                    selectedOptions={format ? [format] : []}
                    onOptionSelect={(_, d) => setFormat(d.optionValue ?? "")}
                    placeholder=""
                  >
                    <Option value="csv">CSV</Option>
                    <Option value="parquet">Parquet</Option>
                  </Dropdown>
                </Field>
              )}
            </div>

            <div className={styles.fieldRow}>
              <span className={styles.label}>Compression type *</span>
              <Field>
                <Dropdown
                  className={styles.inputControl}
                  value={compressionType === "none" ? "None" : compressionType === "gzip" ? "Gzip" : ""}
                  selectedOptions={compressionType ? [compressionType] : []}
                  onOptionSelect={(_, d) => setCompressionType(d.optionValue ?? "")}
                  placeholder=""
                >
                  <Option value="none">None</Option>
                  <Option value="gzip">Gzip</Option>
                </Dropdown>
              </Field>
            </div>

            <div className={styles.fieldRowToggle}>
              <span className={styles.label}>File partitioning *</span>
              <div className={styles.toggleControlCell}>
                <div className={styles.toggleRow}>
                  <Switch
                    checked={true}
                    disabled
                    label="Enabled"
                  />
                </div>
                <div className={styles.toggleHelp}>
                  <Info16Regular className={styles.toggleHelpIcon} />
                  <span>For larger datasets, exports will be split into multiple files.</span>
                </div>
              </div>
            </div>

            <div className={styles.fieldRowToggle}>
              <span className={styles.label}>Overwrite data *</span>
              <div className={styles.toggleControlCell}>
                <div className={styles.toggleRow}>
                  <Switch
                    checked={overwriteData}
                    onChange={(_, d) => setOverwriteData(d.checked)}
                    label="Enable"
                  />
                </div>
                <div className={styles.toggleHelp}>
                  <Info16Regular className={styles.toggleHelpIcon} />
                  <span>
                    When enabled, exports will overwrite the same file instead of creating a new
                    file for each run.
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "review" && (() => {
          const rt = REPORT_TYPES.find((r) => r.id === reportType)
          const subCount = selectedSubscriptionIds.length
          const baName = billingAccounts.find((b) => b.id === billingAccount)?.name
          // Match the Essentials drawer's combined View value: "Subscriptions (N)" or
          // "Billing account: Name". Keep this in sync with the scope formatter at submit time
          // and the Essentials section in async-exports-view.tsx.
          const viewText =
            view === "subscriptions"
              ? `Subscriptions (${subCount})`
              : view === "billing-accounts"
                ? `Billing account: ${baName ?? "—"}`
                : ""
          const destinationSubName =
            allSubscriptions.find((s) => s.id === destinationSubscription)?.name
          const renderValue = (v: string | undefined | null, fallback = "Not set") =>
            v && v.trim() !== "" ? (
              <span className={styles.reviewValue}>{v}</span>
            ) : (
              <span className={styles.reviewValueMuted}>{fallback}</span>
            )
          return (
            <>
              <div className={styles.reviewSection}>
                <div className={styles.reviewSectionTitle}>Basics</div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Template</span>
                  {renderValue(rt?.title)}
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Export name</span>
                  {renderValue(exportName)}
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>View</span>
                  {renderValue(viewText)}
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Frequency</span>
                  {renderValue(
                    frequency === "one-time"
                      ? "One-time"
                      : frequency === "monthly"
                        ? "Monthly"
                        : ""
                  )}
                </div>
                {reportType === "breakdown" && (
                  <div className={styles.reviewRow}>
                    <span className={styles.reviewLabel}>Break down by</span>
                    {renderValue(
                      breakdownDimension ? BREAKDOWN_LABELS[breakdownDimension] : ""
                    )}
                  </div>
                )}
              </div>

              <div className={styles.reviewSection}>
                <div className={styles.reviewSectionTitle}>Storage</div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Storage type</span>
                  {renderValue(storageType === "azure-blob" ? "Azure blob storage" : "")}
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Destination subscription</span>
                  {renderValue(destinationSubName)}
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Storage account</span>
                  {renderValue(storageAccount)}
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Container</span>
                  {renderValue(container)}
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Directory</span>
                  {renderValue(directory, "—")}
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Format</span>
                  {renderValue(format ? format.toUpperCase() : "")}
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>Compression type</span>
                  {renderValue(
                    compressionType
                      ? compressionType.charAt(0).toUpperCase() + compressionType.slice(1)
                      : ""
                  )}
                </div>
                <div className={styles.reviewRow}>
                  <span className={styles.reviewLabel}>File partitioning</span>
                  <span className={styles.reviewValue}>{filePartitioning ? "On" : "Off"}</span>
                </div>
              </div>
            </>
          )
        })()}
      </div>

      <div className={styles.footer}>
        <Button
          appearance="primary"
          disabled={!isReview || reportType === null || exportName.trim() === ""}
          onClick={() => {
            if (reportType === null) return
            const rt = REPORT_TYPES.find((r) => r.id === reportType)
            if (!rt) return
            const subCount = selectedSubscriptionIds.length
            const baName = billingAccounts.find((b) => b.id === billingAccount)?.name
            const scope =
              view === "subscriptions"
                ? `Subscriptions (${subCount})`
                : view === "billing-accounts"
                  ? `Billing account: ${baName ?? "—"}`
                  : "—"
            const destinationSubName =
              allSubscriptions.find((s) => s.id === destinationSubscription)?.name
            const baseRecord: CreatedExport = {
              id: isEdit && initialExport ? initialExport.id : `export-${Date.now()}`,
              name: exportName.trim(),
              reportType,
              reportTypeLabel: rt.title,
              reportTypeIconSrc: rt.iconSrc,
              breakdownDimension: reportType === "breakdown" ? (breakdownDimension || null) : null,
              scope,
              frequency:
                frequency === "monthly" ? "Monthly" : frequency === "one-time" ? "One-time" : "—",
              destination: storageAccount
                ? container
                  ? `${storageAccount} / ${container}`
                  : storageAccount
                : "—",
              status: isEdit && initialExport ? initialExport.status : "Active",
              lastRun: isEdit && initialExport ? initialExport.lastRun : "Never",
              createdAt: isEdit && initialExport ? initialExport.createdAt : new Date().toISOString(),
              viewKind: view === "subscriptions" || view === "billing-accounts" ? view : undefined,
              billingAccountId: view === "billing-accounts" ? billingAccount || undefined : undefined,
              selectedSubscriptionIds: view === "subscriptions" ? selectedSubscriptionIds : undefined,
              storageType: storageType === "azure-blob" ? "Azure blob storage" : undefined,
              storageAccount: storageAccount || undefined,
              destinationSubscriptionName: destinationSubName,
              storageContainer: container || undefined,
              storageDirectory: directory || undefined,
              format: format ? format.toUpperCase() : undefined,
              compressionType:
                compressionType === "gzip" ? "Gzip" : compressionType === "none" ? "None" : undefined,
              overwriteData: overwriteData ? "On" : "Off",
              filePartitioning: "On",
            }
            if (isEdit && initialExport) {
              // Preserve detail/run-history fields that the wizard doesn't edit.
              const merged: CreatedExport = {
                ...initialExport,
                ...baseRecord,
                runHistory: initialExport.runHistory,
                typeOfData: initialExport.typeOfData,
                exportStartDate: initialExport.exportStartDate,
                expirationDate: initialExport.expirationDate,
                description: initialExport.description,
                datasetVersion: initialExport.datasetVersion,
                storageAccountSubscription: initialExport.storageAccountSubscription,
              }
              onSave?.(merged)
            } else {
              onCreate?.(baseRecord)
            }
            onClose?.()
          }}
        >
          {isEdit ? "Save" : "Create"}
        </Button>
        <Button appearance="secondary" disabled={isFirst} onClick={goPrevious}>
          {"< Previous"}
        </Button>
        <Button
          appearance="secondary"
          disabled={isReview || (activeTab === "basics" && reportType === null)}
          onClick={isReview ? undefined : goNext}
        >
          {nextTab ? `Next: ${TAB_LABELS[nextTab]} >` : "Next >"}
        </Button>
      </div>

      <ResourcePicker<Subscription>
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        title={selectedSubscriptionIds.length > 0 ? "Edit subscriptions" : "Add subscriptions"}
        subtitle={`New export${exportName.trim() ? `: ${exportName.trim()}` : ""}`}
        items={allSubscriptions}
        itemKey={(s) => s.id}
        itemIcon={() => (
          <img src="/azure-service-icons/general/10002-icon-service-Subscriptions.svg" alt="" width={16} height={16} />
        )}
        columns={subscriptionColumns}
        filters={subscriptionFilters}
        searchPredicate={(s, q) => {
          const needle = q.toLowerCase()
          const baName = billingAccounts.find((b) => b.id === s.billingAccountId)?.name ?? ""
          return (
            s.name.toLowerCase().includes(needle) ||
            s.location.toLowerCase().includes(needle) ||
            baName.toLowerCase().includes(needle)
          )
        }}
        initialSelectedKeys={selectedSubscriptionIds}
        onApply={(keys) => setSelectedSubscriptionIds(keys)}
      />

      <CreateStorageAccountDrawer
        open={createStorageOpen}
        onClose={() => setCreateStorageOpen(false)}
        subscriptionId={destinationSubscription}
        onCreate={(name) => {
          setStorageAccountOptions((prev) => (prev.includes(name) ? prev : [name, ...prev]))
          setStorageAccount(name)
          setCreateStorageOpen(false)
        }}
      />
    </div>
  )
}

const subscriptionColumns: ResourcePickerColumn<Subscription>[] = [
  { key: "name", label: "Name", render: (s) => s.name, sortValue: (s) => s.name.toLowerCase() },
  {
    key: "billingAccount",
    label: "Billing account",
    render: (s) => billingAccounts.find((b) => b.id === s.billingAccountId)?.name ?? "—",
    sortValue: (s) =>
      (billingAccounts.find((b) => b.id === s.billingAccountId)?.name ?? "").toLowerCase(),
  },
  { key: "location", label: "Location", render: (s) => s.location, sortValue: (s) => s.location.toLowerCase() },
]

const subscriptionFilters: ResourcePickerFilter<Subscription>[] = [
  {
    key: "billing",
    label: "Billing account",
    options: billingAccounts.map((ba) => ba.name),
    predicate: (s, vs) => {
      if (!vs || vs.length === 0) return true
      const allowed = new Set(
        vs
          .map((name) => billingAccounts.find((b) => b.name === name)?.id)
          .filter((id): id is string => !!id)
      )
      return allowed.has(s.billingAccountId)
    },
  },
  {
    key: "location",
    label: "Location",
    options: locations,
    predicate: (s, vs) => !vs || vs.length === 0 || vs.includes(s.location),
  },
]

// ---------------------------------------------------------------------------
// Create new storage account — small non-modal OverlayDrawer (Figma 35:1884)
// ---------------------------------------------------------------------------

const useStorageDrawerStyles = makeStyles({
  drawer: {
    boxShadow: tokens.shadow28,
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    paddingTop: tokens.spacingVerticalM,
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "140px 1fr",
    columnGap: tokens.spacingHorizontalM,
    alignItems: "start",
  },
  label: {
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorNeutralForeground1,
    paddingTop: "4px",
  },
  controlStack: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  inputWithSuffix: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: tokens.spacingVerticalXXS,
  },
  suffix: {
    fontSize: "13px",
    lineHeight: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  fullWidth: {
    width: "100%",
  },
  createNewLink: {
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorBrandForeground1,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    width: "100%",
    boxSizing: "border-box",
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: "16px",
    paddingRight: "16px",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: tokens.colorNeutralStroke2,
  },
})

interface CreateStorageAccountDrawerProps {
  open: boolean
  onClose: () => void
  /** Subscription selected on the parent Storage tab — used to scope resource group options. */
  subscriptionId?: string
  onCreate: (accountName: string) => void
}

/** Small right-side context pane for creating a new Azure storage account inline. Non-modal so the parent wizard remains visible/interactive. */
function CreateStorageAccountDrawer({ open, onClose, subscriptionId, onCreate }: CreateStorageAccountDrawerProps) {
  const styles = useStorageDrawerStyles()
  const [accountName, setAccountName] = useState("")
  const [resourceGroup, setResourceGroup] = useState("")
  const [location, setLocation] = useState("")
  const [extraResourceGroups, setExtraResourceGroups] = useState<string[]>([])
  const [rgCalloutOpen, setRgCalloutOpen] = useState(false)

  // Resource groups scoped to the selected destination subscription, plus any newly-created ones.
  // Deduped — when no subscription is selected, the mock data contains the same RG name across
  // multiple subscriptions, which would produce duplicate React keys.
  const scopedResourceGroups = useMemo(() => {
    const fromMock = subscriptionId
      ? allResourceGroups.filter((rg) => rg.subscriptionId === subscriptionId).map((rg) => rg.name)
      : allResourceGroups.map((rg) => rg.name)
    return Array.from(new Set([...extraResourceGroups, ...fromMock]))
  }, [subscriptionId, extraResourceGroups])

  const canSave = accountName.trim().length > 0 && resourceGroup && location

  const handleClose = () => {
    setAccountName("")
    setResourceGroup("")
    setLocation("")
    setRgCalloutOpen(false)
    onClose()
  }

  return (
    <OverlayDrawer
      open={open}
      onOpenChange={(_, d) => {
        if (!d.open) handleClose()
      }}
      position="end"
      size="medium"
      modalType="non-modal"
      className={styles.drawer}
      style={{ top: "48px", bottom: "50px", height: "auto" }}
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              icon={<Dismiss20Regular />}
              aria-label="Close"
              onClick={handleClose}
            />
          }
        >
          Create new storage account
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <div className={styles.body}>
          <div className={styles.fieldRow}>
            <span className={styles.label}>Account name *</span>
            <div className={styles.inputWithSuffix}>
              <Field className={styles.fullWidth}>
                <Input
                  value={accountName}
                  onChange={(_, d) => setAccountName(d.value)}
                />
              </Field>
              <span className={styles.suffix}>.core.windows.net</span>
            </div>
          </div>

          <div className={styles.fieldRow}>
            <span className={styles.label}>Resource group *</span>
            <div className={styles.controlStack}>
              <Field>
                <Dropdown
                  value={resourceGroup}
                  selectedOptions={resourceGroup ? [resourceGroup] : []}
                  onOptionSelect={(_, d) => setResourceGroup(d.optionValue ?? "")}
                  placeholder=""
                >
                  {scopedResourceGroups.map((rg) => (
                    <Option key={rg} value={rg}>
                      {rg}
                    </Option>
                  ))}
                </Dropdown>
              </Field>
              <Popover
                open={rgCalloutOpen}
                onOpenChange={(_, d) => setRgCalloutOpen(d.open)}
                positioning="below-start"
                withArrow
              >
                <PopoverTrigger disableButtonEnhancement>
                  <Link
                    as="button"
                    className={styles.createNewLink}
                    onClick={() => setRgCalloutOpen(true)}
                  >
                    Create new
                  </Link>
                </PopoverTrigger>
                <PopoverSurface>
                  <CreateResourceGroupCallout
                    onCreate={(name) => {
                      setExtraResourceGroups((prev) => (prev.includes(name) ? prev : [name, ...prev]))
                      setResourceGroup(name)
                      setRgCalloutOpen(false)
                    }}
                    onCancel={() => setRgCalloutOpen(false)}
                  />
                </PopoverSurface>
              </Popover>
            </div>
          </div>

          <div className={styles.fieldRow}>
            <span className={styles.label}>Location *</span>
            <Field>
              <Dropdown
                value={location}
                selectedOptions={location ? [location] : []}
                onOptionSelect={(_, d) => setLocation(d.optionValue ?? "")}
                placeholder=""
              >
                {locations.map((loc) => (
                  <Option key={loc} value={loc}>
                    {loc}
                  </Option>
                ))}
              </Dropdown>
            </Field>
          </div>
        </div>
      </DrawerBody>

      <div className={styles.footer}>
        <Button
          appearance="primary"
          disabled={!canSave}
          onClick={() => canSave && onCreate(accountName.trim())}
        >
          Save
        </Button>
        <Button appearance="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </div>
    </OverlayDrawer>
  )
}

// ---------------------------------------------------------------------------
// Create new resource group — small popover callout (Figma 37:2625)
// ---------------------------------------------------------------------------

const useRgCalloutStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    width: "252px",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  title: {
    fontSize: "18px",
    lineHeight: "24px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  description: {
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorNeutralForeground1,
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalXS,
  },
})

interface CreateResourceGroupCalloutProps {
  onCreate: (name: string) => void
  onCancel: () => void
}

/** Inline single-field callout for creating a resource group from inside another form (e.g. the storage account drawer). */
function CreateResourceGroupCallout({ onCreate, onCancel }: CreateResourceGroupCalloutProps) {
  const styles = useRgCalloutStyles()
  const [name, setName] = useState("")
  const canCreate = name.trim().length > 0

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.title}>Create new resource group</span>
        <span className={styles.description}>
          A resource group is a container that holds related resources for an Azure solution
        </span>
      </div>
      <Field label="Name" required>
        <Input
          value={name}
          onChange={(_, d) => setName(d.value)}
          placeholder="e.g. rg-emissions-storage"
        />
      </Field>
      <div className={styles.buttons}>
        <Button
          appearance="primary"
          disabled={!canCreate}
          onClick={() => canCreate && onCreate(name.trim())}
        >
          Create
        </Button>
        <Button appearance="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
