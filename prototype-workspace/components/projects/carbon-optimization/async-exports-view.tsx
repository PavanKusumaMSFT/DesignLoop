/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client"

import { useState, useRef } from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Badge,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  createTableColumn,
  type TableColumnDefinition,
  type DataGridProps,
  OverlayDrawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
  Button,
  Link,
  mergeClasses,
} from "@fluentui/react-components"
import {
  Add16Regular,
  Play16Regular,
  Stop16Regular,
  Delete16Regular,
  PersonFeedback16Regular,
  Dismiss20Regular,
  Edit16Regular,
  ArrowSync16Regular,
  CheckmarkCircle16Filled,
  ErrorCircle16Filled,
  Clock16Regular,
} from "@fluentui/react-icons"
import CompanyLevelView, { type ExportSourceBlade, type ExportContext } from "./company-level-view"
import BladeCommandBar, { type CommandBarItem } from "../../shared/blade-command-bar"
import BladeEssentials, { type EssentialsField } from "../../shared/blade-essentials"
import type { TocItem } from "../../shared/blade-toc-nav"
import NewScheduledExportWizard, {
  type CreatedExport,
  type ExportRunHistoryEntry,
  type ReportType,
} from "./new-scheduled-export-wizard"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const SCHEDULED_EXPORTS_ID = "scheduled-exports"

const navIcon = (
  <img
    src="/icons/carbon-optimization/scheduled-exports.svg"
    alt=""
    width={16}
    height={16}
    style={{ display: "block" }}
  />
)

const extraNavItems: TocItem[] = [
  { id: SCHEDULED_EXPORTS_ID, label: "Exports", icon: navIcon },
]

const extraViewLabels: Record<string, string> = {
  [SCHEDULED_EXPORTS_ID]: "Exports",
}

const extraViewIconSrc: Record<string, string> = {
  [SCHEDULED_EXPORTS_ID]: "/icons/carbon-optimization/scheduled-exports.svg",
}

const useStyles = makeStyles({
  emptyBody: {
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  bodyWithTable: {
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground1,
    paddingTop: tokens.spacingVerticalM,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: tokens.spacingVerticalL,
    overflowY: "auto",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: "120px",
    color: tokens.colorNeutralForeground2,
    gap: tokens.spacingVerticalS,
  },
  emptyStateTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  templateCell: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  templateIcon: {
    width: "16px",
    height: "16px",
    flexShrink: 0,
  },
  nameButton: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    padding: 0,
    margin: 0,
    color: tokens.colorBrandForeground1,
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: tokens.fontWeightRegular,
    cursor: "pointer",
    textAlign: "left",
    ":hover": {
      textDecorationLine: "underline",
    },
    ":focus-visible": {
      outlineStyle: "solid",
      outlineWidth: "2px",
      outlineColor: tokens.colorStrokeFocus2,
      outlineOffset: "2px",
    },
  },
  detailRow: {
    display: "grid",
    gridTemplateColumns: "160px 1fr",
    gap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorNeutralStroke2,
  },
  detailLabel: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
  detailValue: {
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
    wordBreak: "break-word",
  },
  drawerTemplate: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  drawerSubtitle: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    marginTop: "2px",
  },
  drawerToolbar: {
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
  },
  drawerBodyReset: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
  runHistorySection: {
    paddingTop: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
  },
  runHistoryTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
  },
  runStatusCell: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  runStatusSucceeded: { color: tokens.colorPaletteGreenForeground1 },
  runStatusFailed: { color: tokens.colorPaletteRedForeground1 },
  runStatusOther: { color: tokens.colorNeutralForeground2 },
})

// Sortable column definitions for the Exports DataGrid. Each column wires its `compare` to a
// stable string/number sort key so the built-in sort headers work without extra glue.
const exportColumns: TableColumnDefinition<CreatedExport>[] = [
  createTableColumn<CreatedExport>({
    columnId: "name",
    compare: (a, b) => a.name.localeCompare(b.name),
    renderHeaderCell: () => "Name",
    renderCell: (item) => item.name,
  }),
  createTableColumn<CreatedExport>({
    columnId: "template",
    compare: (a, b) => a.reportTypeLabel.localeCompare(b.reportTypeLabel),
    renderHeaderCell: () => "Template",
    renderCell: (item) => item, // body uses a custom renderer below
  }),
  createTableColumn<CreatedExport>({
    columnId: "scope",
    compare: (a, b) => a.scope.localeCompare(b.scope),
    renderHeaderCell: () => "View",
    renderCell: (item) => item.scope,
  }),
  createTableColumn<CreatedExport>({
    columnId: "frequency",
    compare: (a, b) => a.frequency.localeCompare(b.frequency),
    renderHeaderCell: () => "Frequency",
    renderCell: (item) => item.frequency,
  }),
  createTableColumn<CreatedExport>({
    columnId: "status",
    compare: (a, b) => a.status.localeCompare(b.status),
    renderHeaderCell: () => "Status",
    renderCell: (item) => item.status,
  }),
  createTableColumn<CreatedExport>({
    columnId: "lastRun",
    compare: (a, b) => a.lastRun.localeCompare(b.lastRun),
    renderHeaderCell: () => "Last run",
    renderCell: (item) => item.lastRun,
  }),
  createTableColumn<CreatedExport>({
    columnId: "destination",
    compare: (a, b) => a.destination.localeCompare(b.destination),
    renderHeaderCell: () => "Destination",
    renderCell: (item) => item.destination,
  }),
]

// Sortable columns for the Run history DataGrid inside the export details drawer.
const runHistoryColumns: TableColumnDefinition<ExportRunHistoryEntry>[] = [
  createTableColumn<ExportRunHistoryEntry>({
    columnId: "executionTime",
    compare: (a, b) => a.executionTime.localeCompare(b.executionTime),
    renderHeaderCell: () => "Execution time",
    renderCell: (r) => r.executionTime,
  }),
  createTableColumn<ExportRunHistoryEntry>({
    columnId: "status",
    compare: (a, b) => a.status.localeCompare(b.status),
    renderHeaderCell: () => "Execution status",
    renderCell: (r) => r.status,
  }),
  createTableColumn<ExportRunHistoryEntry>({
    columnId: "exportTimePeriod",
    compare: (a, b) => a.exportTimePeriod.localeCompare(b.exportTimePeriod),
    renderHeaderCell: () => "Export time period (UTC)",
    renderCell: (r) => r.exportTimePeriod,
  }),
]

function ScheduledExportsContent({
  onCreate,
  onEdit,
  exports,
}: {
  onCreate: () => void
  onEdit: (item: CreatedExport) => void
  exports: CreatedExport[]
}) {
  const styles = useStyles()
  const [selected, setSelected] = useState<Set<string | number>>(new Set())
  const [detailsExport, setDetailsExport] = useState<CreatedExport | null>(null)
  const items: CommandBarItem[] = [
    { key: "create", label: "Create", icon: <Add16Regular />, onClick: onCreate },
    { key: "run-now", label: "Run now", icon: <Play16Regular /> },
    { key: "disable", label: "Disable", icon: <Stop16Regular /> },
    { key: "delete", label: "Delete", icon: <Delete16Regular /> },
    { key: "feedback", label: "Feedback", icon: <PersonFeedback16Regular />, dividerBefore: true },
  ]

  const onSelectionChange: DataGridProps["onSelectionChange"] = (_e, data) => {
    setSelected(new Set(data.selectedItems))
  }

  return (
    <>
      <BladeCommandBar items={items} />
      {exports.length === 0 ? (
        <div className={styles.emptyState}>
          <Text className={styles.emptyStateTitle}>No exports yet</Text>
          <Text>Click Create to schedule your first export.</Text>
        </div>
      ) : (
        <div className={styles.bodyWithTable}>
          <DataGrid
            items={exports}
            columns={exportColumns}
            sortable
            selectionMode="multiselect"
            selectedItems={selected}
            onSelectionChange={onSelectionChange}
            getRowId={(item) => item.id}
            size="small"
            resizableColumns
            columnSizingOptions={{
              name: { defaultWidth: 280, minWidth: 200, idealWidth: 280 },
              template: { defaultWidth: 180, minWidth: 140 },
              scope: { defaultWidth: 180, minWidth: 140 },
              frequency: { defaultWidth: 120, minWidth: 100, idealWidth: 120 },
              status: { defaultWidth: 120, minWidth: 100, idealWidth: 120 },
              lastRun: { defaultWidth: 140, minWidth: 120 },
              destination: { defaultWidth: 220, minWidth: 160 },
            }}
            aria-label="Scheduled exports"
          >
            <DataGridHeader>
              <DataGridRow
                selectionCell={{
                  checkboxIndicator: { "aria-label": "Select all rows" },
                }}
              >
                {({ renderHeaderCell }) => (
                  <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                )}
              </DataGridRow>
            </DataGridHeader>
            <DataGridBody<CreatedExport>>
              {({ item, rowId }) => (
                <DataGridRow<CreatedExport>
                  key={rowId}
                  selectionCell={{
                    checkboxIndicator: { "aria-label": "Select row" },
                  }}
                >
                  {({ columnId }) => {
                    if (columnId === "name") {
                      return (
                        <DataGridCell>
                          <button
                            type="button"
                            className={styles.nameButton}
                            onClick={() => setDetailsExport(item)}
                          >
                            {item.name}
                          </button>
                        </DataGridCell>
                      )
                    }
                    if (columnId === "template") {
                      return (
                        <DataGridCell>{item.reportTypeLabel}</DataGridCell>
                      )
                    }
                    if (columnId === "status") {
                      return (
                        <DataGridCell>
                          <Badge
                            appearance="filled"
                            color={
                              item.status === "Active"
                                ? "success"
                                : item.status === "Paused"
                                  ? "warning"
                                  : "informative"
                            }
                          >
                            {item.status}
                          </Badge>
                        </DataGridCell>
                      )
                    }
                    if (columnId === "scope") return <DataGridCell>{item.scope}</DataGridCell>
                    if (columnId === "frequency")
                      return <DataGridCell>{item.frequency}</DataGridCell>
                    if (columnId === "lastRun")
                      return <DataGridCell>{item.lastRun}</DataGridCell>
                    if (columnId === "destination")
                      return (
                        <DataGridCell>
                          <button
                            type="button"
                            className={styles.nameButton}
                            onClick={() => {
                              /* TODO: open destination */
                            }}
                          >
                            {item.destination}
                          </button>
                        </DataGridCell>
                      )
                    return <DataGridCell>{null}</DataGridCell>
                  }}
                </DataGridRow>
              )}
            </DataGridBody>
          </DataGrid>
        </div>
      )}
      <ExportDetailsDrawer
        item={detailsExport}
        onClose={() => setDetailsExport(null)}
        onEdit={(item) => {
          setDetailsExport(null)
          onEdit(item)
        }}
      />
    </>
  )
}

function ExportDetailsDrawer({
  item,
  onClose,
  onEdit,
}: {
  item: CreatedExport | null
  onClose: () => void
  onEdit: (item: CreatedExport) => void
}) {
  const styles = useStyles()
  const fields = item ? buildEssentialsFields(item) : []
  const runHistory: ExportRunHistoryEntry[] = item?.runHistory ?? []
  const toolbarItems: CommandBarItem[] = [
    { key: "run-now", label: "Run now", icon: <Play16Regular /> },
    {
      key: "toggle",
      label: item?.status === "Active" ? "Disable" : "Enable",
      icon: item?.status === "Active" ? <Stop16Regular /> : <Play16Regular />,
    },
    { key: "delete", label: "Delete", icon: <Delete16Regular /> },
    {
      key: "edit",
      label: "Edit",
      icon: <Edit16Regular />,
      onClick: () => {
        if (item) onEdit(item)
      },
    },
    { key: "refresh", label: "Refresh", icon: <ArrowSync16Regular /> },
    {
      key: "feedback",
      label: "Feedback",
      icon: <PersonFeedback16Regular />,
      dividerBefore: true,
    },
  ]
  return (
    <OverlayDrawer
      open={item !== null}
      onOpenChange={(_, data) => {
        if (!data.open) onClose()
      }}
      position="end"
      size="large"
      modalType="non-modal"
      style={{ top: "48px", bottom: "50px", height: "auto" }}
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss20Regular />}
              onClick={onClose}
            />
          }
        >
          {item?.name ?? "Export details"}
          <div className={styles.drawerSubtitle}>Export</div>
        </DrawerHeaderTitle>
      </DrawerHeader>
      <DrawerBody className={styles.drawerBodyReset}>
        {item && (
          <>
            <div className={styles.drawerToolbar}>
              <BladeCommandBar items={toolbarItems} />
            </div>
            <BladeEssentials fields={fields} columns={2} />
            <div className={styles.runHistorySection}>
              <Text className={styles.runHistoryTitle}>Run history</Text>
              <DataGrid
                items={runHistory}
                columns={runHistoryColumns}
                sortable
                getRowId={(r) => `${r.executionTime}-${r.exportTimePeriod}`}
                size="small"
                aria-label="Run history"
              >
                <DataGridHeader>
                  <DataGridRow>
                    {({ renderHeaderCell }) => (
                      <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
                    )}
                  </DataGridRow>
                </DataGridHeader>
                <DataGridBody<ExportRunHistoryEntry>>
                  {({ item: r, rowId }) => (
                    <DataGridRow<ExportRunHistoryEntry> key={rowId}>
                      {({ columnId }) => {
                        if (columnId === "executionTime")
                          return <DataGridCell>{r.executionTime}</DataGridCell>
                        if (columnId === "status")
                          return (
                            <DataGridCell>
                              <span
                                className={mergeClasses(
                                  styles.runStatusCell,
                                  r.status === "Succeeded"
                                    ? styles.runStatusSucceeded
                                    : r.status === "Failed"
                                      ? styles.runStatusFailed
                                      : styles.runStatusOther,
                                )}
                              >
                                {r.status === "Succeeded" ? (
                                  <CheckmarkCircle16Filled />
                                ) : r.status === "Failed" ? (
                                  <ErrorCircle16Filled />
                                ) : (
                                  <Clock16Regular />
                                )}
                                {r.status}
                              </span>
                            </DataGridCell>
                          )
                        return <DataGridCell>{r.exportTimePeriod}</DataGridCell>
                      }}
                    </DataGridRow>
                  )}
                </DataGridBody>
              </DataGrid>
            </div>
          </>
        )}
      </DrawerBody>
    </OverlayDrawer>
  )
}

/** Builds the Essentials field rows. Mirrors the wizard's Review tab exactly: Basics fields\n * (Template, Export name, View, Scope, Frequency, optional Break down by) followed by Storage\n * fields (Storage type, Destination subscription, Storage account, Container, Directory, Format,\n * Compression type, File partitioning). */
function buildEssentialsFields(item: CreatedExport): EssentialsField[] {
  const linkValue = (text: string) => <Link href="#" inline>{text}</Link>

  const fields: EssentialsField[] = [
    { label: "Template", value: item.reportTypeLabel },
    { label: "Export name", value: item.name },
    { label: "View", value: item.scope },
    { label: "Frequency", value: item.frequency },
  ]
  if (item.breakdownDimension) {
    const breakdownLabels: Record<string, string> = {
      subscription: "Subscription",
      resourceGroup: "Resource group",
      resource: "Resource",
      resourceType: "Resource type",
      location: "Location",
    }
    fields.push({
      label: "Break down by",
      value: breakdownLabels[item.breakdownDimension] ?? item.breakdownDimension,
    })
  }
  fields.push(
    { label: "Storage type", value: item.storageType ?? "Azure blob storage" },
    {
      label: "Destination subscription",
      value: item.destinationSubscriptionName ?? item.storageAccountSubscription ?? "—",
    },
    {
      label: "Storage account",
      value: linkValue(item.storageAccount ?? item.destination.split(" / ")[0] ?? "—"),
    },
    {
      label: "Container",
      value: item.storageContainer ?? item.destination.split(" / ")[1] ?? "—",
    },
    { label: "Directory", value: item.storageDirectory ?? "—" },
    { label: "Format", value: item.format ?? "CSV" },
    { label: "Compression type", value: item.compressionType ?? "None" },
    { label: "File partitioning", value: item.filePartitioning ?? "On" },
  )
  return fields
}

// Seed rows so the Exports blade is never empty in the prototype. Mirrors the three report
// templates (Trends, Details, Reductions) and shows different statuses/frequencies/destinations
// to demonstrate the table.
const SEED_EXPORTS: CreatedExport[] = [
  {
    id: "seed-trends-monthly",
    name: "monthly-emissions-trends",
    reportType: "trends",
    reportTypeLabel: "Emission trends",
    reportTypeIconSrc: "/icons/carbon-optimization/emission-trends.svg",
    breakdownDimension: null,
    scope: "Subscriptions (3)",
    viewKind: "subscriptions",
    selectedSubscriptionIds: ["sub-0001", "sub-0002", "sub-0003"],
    frequency: "Monthly",
    destination: "contosocarbonexports / monthly-trends",
    status: "Active",
    lastRun: "Apr 1, 2026, 02:14 UTC",
    createdAt: "2026-01-15T10:00:00Z",
    typeOfData: "Emissions trends (Scope 1, 2, 3)",
    exportStartDate: "1/15/2026",
    expirationDate: "1/15/2027",
    filePartitioning: "On",
    overwriteData: "Off",
    storageType: "Azure blob storage",
    storageAccount: "contosocarbonexports",
    storageAccountSubscription: "sub-0001",
    destinationSubscriptionName: "Prod-WebApps",
    storageContainer: "monthly-trends",
    storageDirectory: "emissions/trends",
    datasetVersion: "2024-08-01",
    description: "Monthly trends across Contoso production subscriptions.",
    format: "CSV",
    compressionType: "Gzip",
    runHistory: [
      { executionTime: "Apr 1, 2026, 02:14 UTC", status: "Succeeded", exportTimePeriod: "Mar 2026" },
      { executionTime: "Mar 1, 2026, 02:11 UTC", status: "Succeeded", exportTimePeriod: "Feb 2026" },
      { executionTime: "Feb 1, 2026, 02:09 UTC", status: "Succeeded", exportTimePeriod: "Jan 2026" },
      { executionTime: "Jan 15, 2026, 10:02 UTC", status: "Succeeded", exportTimePeriod: "Initial backfill" },
    ],
  },
  {
    id: "seed-breakdown-rg",
    name: "emissions-by-resource-group",
    reportType: "breakdown",
    reportTypeLabel: "Emissions breakdown",
    reportTypeIconSrc: "/icons/carbon-optimization/emission-details.svg",
    breakdownDimension: "resourceGroup",
    scope: "Subscriptions (1)",
    frequency: "Monthly",
    destination: "contosocarbonexports / breakdown-rg",
    status: "Paused",
    lastRun: "Mar 1, 2026, 02:09 UTC",
    createdAt: "2025-11-02T09:30:00Z",
    typeOfData: "Emissions breakdown by resource group",
    exportStartDate: "11/2/2025",
    expirationDate: "11/2/2026",
    filePartitioning: "On",
    overwriteData: "On",
    storageType: "Azure blob storage",
    storageAccount: "contosocarbonexports",
    storageAccountSubscription: "sub-0001",
    destinationSubscriptionName: "Prod-WebApps",
    storageContainer: "breakdown-rg",
    storageDirectory: "emissions/breakdown",
    datasetVersion: "2024-08-01",
    description: "Resource-group rollup paused while Contoso reorgs the subscription.",
    format: "Parquet",
    compressionType: "None",
    runHistory: [
      { executionTime: "Mar 1, 2026, 02:09 UTC", status: "Succeeded", exportTimePeriod: "Feb 2026" },
      { executionTime: "Feb 1, 2026, 02:08 UTC", status: "Failed", exportTimePeriod: "Jan 2026" },
      { executionTime: "Jan 1, 2026, 02:07 UTC", status: "Succeeded", exportTimePeriod: "Dec 2025" },
    ],
  },
  {
    id: "seed-reductions-onetime",
    name: "q1-reductions-snapshot",
    reportType: "reductions",
    reportTypeLabel: "Reduction recommendations",
    reportTypeIconSrc: "/icons/carbon-optimization/emission-reductions.svg",
    breakdownDimension: null,
    scope: "Billing account: Contoso Enterprise Production",
    viewKind: "billing-accounts",
    billingAccountId: "ba-001",
    frequency: "One-time",
    destination: "contosocarbonexports / reductions-q1",
    status: "Inactive",
    lastRun: "Apr 5, 2026, 18:42 UTC",
    createdAt: "2026-04-05T18:00:00Z",
    typeOfData: "Reduction recommendations with savings estimates",
    exportStartDate: "4/5/2026",
    expirationDate: "4/5/2027",
    filePartitioning: "Off",
    overwriteData: "Off",
    storageType: "Azure blob storage",
    storageAccount: "contosocarbonexports",
    storageAccountSubscription: "sub-0001",
    destinationSubscriptionName: "Prod-WebApps",
    storageContainer: "reductions-q1",
    storageDirectory: "emissions/reductions",
    datasetVersion: "2024-08-01",
    description: "Snapshot taken for the Q1 carbon review meeting.",
    format: "CSV",
    compressionType: "None",
    runHistory: [
      { executionTime: "Apr 5, 2026, 18:42 UTC", status: "Succeeded", exportTimePeriod: "Q1 2026" },
    ],
  },
]

/** v3 — Async exports exploration. Same chrome as v2 (Company-level view) plus a new "Scheduled exports" item in the left blade nav. Clicking the Create command surfaces a full-page New scheduled export wizard.
 *
 * `option` controls the per-blade Export entrypoint affordance:
 * - "A" (default) — secondary-appearance MenuButton in the bottom-left footer of each card.
 * - "B" — compact subtle-appearance toolbar MenuButton in the top-left of each card.
 * Functionality is identical between options. */
export default function AsyncExportsView({ isDarkMode = false, option = "A" }: { isDarkMode?: boolean; option?: "A" | "B" }) {
  const [showWizard, setShowWizard] = useState(false)
  // Where to land after the wizard is dismissed. `undefined` = first mount, no override.
  // Set to a blade id when user entered via Export-to-storage from that blade,
  // or to SCHEDULED_EXPORTS_ID when entered via the Exports blade Create button.
  const [postWizardActiveView, setPostWizardActiveView] = useState<string | undefined>(undefined)
  const [exports, setExports] = useState<CreatedExport[]>(SEED_EXPORTS)
  // Pre-selected template + scope when the wizard is launched via a blade's "Export to storage" menu item.
  // Cleared when the wizard closes so subsequent launches (e.g. from the Create button on the Exports blade)
  // start fresh with no template / no scope pre-fill.
  const [initialReportType, setInitialReportType] = useState<ReportType | undefined>(undefined)
  const [initialView, setInitialView] = useState<"subscriptions" | "billing-accounts" | undefined>(undefined)
  const [initialBillingAccountId, setInitialBillingAccountId] = useState<string | undefined>(undefined)
  const [initialSubscriptionIds, setInitialSubscriptionIds] = useState<string[] | undefined>(undefined)
  // Set when the user clicks Edit from the Exports detail drawer. Switches the wizard into
  // edit mode (locked structural fields, "Save" instead of "Create") and prefills from this record.
  const [editingExport, setEditingExport] = useState<CreatedExport | undefined>(undefined)

  // Map blade source → wizard report-type template id.
  const bladeToReportType: Record<ExportSourceBlade, ReportType> = {
    trends: "trends",
    details: "breakdown",
    reductions: "reductions",
  }

  if (showWizard) {
    const goBack = () => {
      setShowWizard(false)
      setInitialReportType(undefined)
      setInitialView(undefined)
      setInitialBillingAccountId(undefined)
      setInitialSubscriptionIds(undefined)
      setEditingExport(undefined)
    }
    return (
      <NewScheduledExportWizard
        onClose={goBack}
        onBreadcrumbScheduledExports={goBack}
        onCreate={(record) => setExports((prev) => [record, ...prev])}
        onSave={(record) =>
          setExports((prev) => prev.map((e) => (e.id === record.id ? record : e)))
        }
        mode={editingExport ? "edit" : "create"}
        initialExport={editingExport}
        initialReportType={initialReportType}
        initialView={initialView}
        initialBillingAccountId={initialBillingAccountId}
        initialSubscriptionIds={initialSubscriptionIds}
      />
    )
  }

  const extraViewContent: Record<string, React.ReactNode> = {
    [SCHEDULED_EXPORTS_ID]: (
      <ScheduledExportsContent
        onCreate={() => {
          // Create from the Exports blade itself — always a blank wizard, returns to Exports on dismiss.
          setInitialReportType(undefined)
          setInitialView(undefined)
          setInitialBillingAccountId(undefined)
          setInitialSubscriptionIds(undefined)
          setEditingExport(undefined)
          setPostWizardActiveView(SCHEDULED_EXPORTS_ID)
          setShowWizard(true)
        }}
        onEdit={(item) => {
          // Edit from a row's detail drawer — open the wizard in edit mode, return to Exports on dismiss.
          setInitialReportType(undefined)
          setInitialView(undefined)
          setInitialBillingAccountId(undefined)
          setInitialSubscriptionIds(undefined)
          setEditingExport(item)
          setPostWizardActiveView(SCHEDULED_EXPORTS_ID)
          setShowWizard(true)
        }}
        exports={exports}
      />
    ),
  }

  return (
    <CompanyLevelView
      key={postWizardActiveView ?? "fresh"}
      isDarkMode={isDarkMode}
      exportPosition={option === "B" ? "topRight" : "footer"}
      compactExportButton={option === "B"}
      enableTour
      extraNavItems={extraNavItems}
      extraViewLabels={extraViewLabels}
      extraViewIconSrc={extraViewIconSrc}
      extraViewContent={extraViewContent}
      initialActiveView={postWizardActiveView}
      onExportToStorage={(ctx: ExportContext) => {
        setInitialReportType(bladeToReportType[ctx.blade])
        setInitialView(ctx.view)
        setInitialBillingAccountId(ctx.billingAccountId)
        setInitialSubscriptionIds(ctx.subscriptionIds)
        setPostWizardActiveView(ctx.blade)
        setShowWizard(true)
      }}
    />
  )
}
