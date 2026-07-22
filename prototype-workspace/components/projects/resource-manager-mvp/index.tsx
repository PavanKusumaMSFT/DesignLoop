"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"

// v8 (classic blade) components from components/shared/
import { SiteHeader } from "../../shared/v8-site-header"
import { Breadcrumb } from "../../shared/v8-breadcrumb"
import { BladeHeader } from "../../shared/v8-blade-header"
import {
  Toolbar,
  ToolbarItem,
  ToolbarDivider,
  ToolbarOverflow,
} from "../../shared/v8-toolbar"
import {
  FilterBar,
  FilterBarAddButton,
} from "../../shared/v8-filter-bar"
import { FilterPill } from "../../shared/v8-filter-pill"
import { TextInput } from "../../shared/v8-text-input"
import { Dropdown } from "../../shared/v8-dropdown"
import { DataGrid } from "../../shared/v8-data-grid"
import type {
  DataGridColumn,
  DataGridRow,
} from "../../shared/v8-data-grid"
import {
  Footer,
  FooterBrowseInfo,
  FooterPagination,
} from "../../shared/v8-footer"
import type { PageSize } from "../../shared/v8-footer"
import { ServiceNav } from "../../shared/v8-service-nav"
import type { ServiceNavEntry } from "../../shared/v8-service-nav"

// Fluent v9 Popover for the "Get insights" intro — opens on page load, stays until dismissed.
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Overflow,
  OverflowItem,
  OverflowDivider,
  useOverflowMenu,
  useIsOverflowItemVisible,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from "@fluentui/react-components"
import { Lightbulb16Regular, Dismiss16Regular } from "@fluentui/react-icons"

// Icons from the v8 icon set
import AddIcon from "../../shared/v8-icons/commands/add.svg?react"
import DeleteIcon from "../../shared/v8-icons/commands/delete.svg?react"
import ViewIcon from "../../shared/v8-icons/commands/view.svg?react"
import RefreshIcon from "../../shared/v8-icons/commands/refresh.svg?react"
import DownloadIcon from "../../shared/v8-icons/commands/download.svg?react"
import QueryIcon from "../../shared/v8-icons/commands/query.svg?react"
import TagsIcon from "../../shared/v8-icons/commands/tags.svg?react"
import AddTeamMemberIcon from "../../shared/v8-icons/commands/add-team-member.svg?react"
import { ArrowTrending20Regular } from "@fluentui/react-icons"
import AllResourcesIcon from "../../shared/v8-icons/services/all-resources.svg?react"

// ServiceNav (TOC) icons
import FavoriteResourcesIcon from "../../shared/v8-icons/commands/favorite.svg?react"
import RecentResourcesIcon from "../../shared/v8-icons/services/recent.svg?react"
import ResourceGroupsIcon from "../../shared/v8-icons/services/resource-groups.svg?react"
import TagsServiceIcon from "../../shared/v8-icons/services/tags.svg?react"
import ServiceGroupsIcon from "../../shared/v8-icons/services/groups.svg?react"
import ManagementGroupsIcon from "../../shared/v8-icons/services/management-groups.svg?react"
import SubscriptionsIcon from "../../shared/v8-icons/services/subscriptions.svg?react"
import ResourceGraphExplorerIcon from "../../shared/v8-icons/services/resource-graph-explorer.svg?react"
import ResourceGraphQueriesIcon from "../../shared/v8-icons/services/resource-graph-queries.svg?react"
import ResourceVisualizerIcon from "../../shared/v8-icons/services/topology.svg?react"
import ResourceExplorerIcon from "../../shared/v8-icons/services/resource-explorer.svg?react"
import ApiPlaygroundIcon from "../../shared/v8-icons/services/api-playground.svg?react"
import ResourceMoverIcon from "../../shared/v8-icons/services/resource-mover.svg?react"
import TemplatesIcon from "../../shared/v8-icons/services/templates.svg?react"
import TemplateSpecsIcon from "../../shared/v8-icons/services/template-specs.svg?react"
import SupportIcon from "../../shared/v8-icons/services/help-and-support.svg?react"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

// ---------------------------------------------------------------------------
// Mock data (adapted from components/projects/build-2026/resource-manager.tsx)
// ---------------------------------------------------------------------------
interface MockResource {
  id: string
  name: string
  type: string
  resourceGroup: string
  location: string
  subscription: string
  status: "Running" | "Stopped" | "Deallocated"
}

const mockResources: MockResource[] = [
  { id: "1", name: "prod-web-vm-01", type: "Virtual machine", resourceGroup: "rg-production", location: "East US", subscription: "Production", status: "Running" },
  { id: "2", name: "prod-web-vm-02", type: "Virtual machine", resourceGroup: "rg-production", location: "East US", subscription: "Production", status: "Running" },
  { id: "3", name: "staging-api-vm", type: "Virtual machine", resourceGroup: "rg-staging", location: "West US 2", subscription: "Development", status: "Stopped" },
  { id: "4", name: "dev-test-vm", type: "Virtual machine", resourceGroup: "rg-development", location: "Central US", subscription: "Development", status: "Deallocated" },
  { id: "5", name: "ml-training-cluster", type: "Virtual machine scale set", resourceGroup: "rg-ml-workloads", location: "East US 2", subscription: "Production", status: "Running" },
  { id: "6", name: "prod-vnet-eastus", type: "Virtual network", resourceGroup: "rg-networking", location: "East US", subscription: "Production", status: "Running" },
  { id: "7", name: "staging-vnet-westus", type: "Virtual network", resourceGroup: "rg-networking", location: "West US 2", subscription: "Development", status: "Running" },
  { id: "8", name: "prod-lb-frontend", type: "Load balancer", resourceGroup: "rg-networking", location: "East US", subscription: "Production", status: "Running" },
  { id: "9", name: "app-gateway-01", type: "Application gateway", resourceGroup: "rg-networking", location: "East US", subscription: "Production", status: "Running" },
  { id: "10", name: "prod-nsg-web", type: "Network security group", resourceGroup: "rg-networking", location: "East US", subscription: "Production", status: "Running" },
  { id: "11", name: "prodstorage01", type: "Storage account", resourceGroup: "rg-production", location: "East US", subscription: "Production", status: "Running" },
  { id: "12", name: "devstorageblobs", type: "Storage account", resourceGroup: "rg-development", location: "Central US", subscription: "Development", status: "Running" },
  { id: "13", name: "backupstoragevault", type: "Storage account", resourceGroup: "rg-backups", location: "East US 2", subscription: "Production", status: "Running" },
  { id: "14", name: "prod-sql-server", type: "SQL database", resourceGroup: "rg-databases", location: "East US", subscription: "Production", status: "Running" },
  { id: "15", name: "prod-cosmosdb", type: "Cosmos DB", resourceGroup: "rg-databases", location: "East US", subscription: "Production", status: "Running" },
  { id: "16", name: "dev-postgres", type: "PostgreSQL", resourceGroup: "rg-development", location: "Central US", subscription: "Development", status: "Running" },
  { id: "17", name: "prod-key-vault", type: "Key vault", resourceGroup: "rg-security", location: "East US", subscription: "Production", status: "Running" },
  { id: "18", name: "prod-app-service", type: "App service", resourceGroup: "rg-production", location: "East US", subscription: "Production", status: "Running" },
  { id: "19", name: "staging-app-service", type: "App service", resourceGroup: "rg-staging", location: "West US 2", subscription: "Development", status: "Running" },
  { id: "20", name: "contoso-api-func", type: "Function app", resourceGroup: "rg-production", location: "East US", subscription: "Production", status: "Running" },
]

interface MockResourceGroup {
  id: string
  name: string
  subscription: string
  location: string
}

const mockResourceGroups: MockResourceGroup[] = [
  { id: "rg-1", name: "rg-production", subscription: "Production", location: "East US" },
  { id: "rg-2", name: "rg-staging", subscription: "Development", location: "West US 2" },
  { id: "rg-3", name: "rg-development", subscription: "Development", location: "Central US" },
  { id: "rg-4", name: "rg-networking", subscription: "Production", location: "East US" },
]

// ---------------------------------------------------------------------------
// Styles — the v8 components own their CSS; these layout the page.
// ---------------------------------------------------------------------------
const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground3,
  },
  breadcrumb: {
    backgroundColor: tokens.colorNeutralBackground1,
    "& .ap-breadcrumb__item": {
      color: tokens.colorNeutralForeground1,
    },
    "& .ap-breadcrumb__item:hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  bladeBody: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    minHeight: 0,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  leftNav: {
    flex: "0 0 264px",
    overflowY: "auto",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: "0px",
    gap: tokens.spacingVerticalM,
  },
  pad: {
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  gridRow: {
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    flex: 1,
    minHeight: "320px",
  },
  toolbarInner: {
    display: "flex",
    alignItems: "center",
    flex: "1 1 auto",
    minWidth: 0,
  },
  tipSurface: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    borderColor: tokens.colorBrandBackground,
    maxWidth: "320px",
    boxShadow: tokens.shadow16,
  },
  tipContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalM,
  },
  tipText: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    minWidth: 0,
    flex: "1 1 auto",
  },
  tipTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForegroundOnBrand,
    lineHeight: tokens.lineHeightBase300,
  },
  tipBody: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  tipClose: {
    flex: "0 0 auto",
    color: tokens.colorNeutralForegroundOnBrand,
    marginTop: `calc(-1 * ${tokens.spacingVerticalXS})`,
    marginRight: `calc(-1 * ${tokens.spacingHorizontalXS})`,
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
      color: tokens.colorNeutralForegroundOnBrand,
    },
    ":hover:active": {
      backgroundColor: tokens.colorBrandBackgroundPressed,
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
})

// ---------------------------------------------------------------------------
// Table of contents — adapted from components/projects/build-2026/resource-manager.tsx
// ---------------------------------------------------------------------------
const tocEntries: ServiceNavEntry[] = [
  {
    type: "item",
    id: "all-resources",
    label: "All resources",
    icon: <AllResourcesIcon />,
  },
  {
    type: "item",
    id: "favorite-resources",
    label: "Favorite resources",
    icon: <FavoriteResourcesIcon />,
  },
  {
    type: "item",
    id: "recent-resources",
    label: "Recent resources",
    icon: <RecentResourcesIcon />,
  },
  {
    type: "group",
    id: "organization",
    label: "Organization",
    defaultExpanded: false,
    items: [
      {
        id: "resource-groups",
        label: "Resource groups",
        icon: <ResourceGroupsIcon />,
      },
      {
        id: "tags",
        label: "Tags",
        icon: <TagsServiceIcon />,
      },
      {
        id: "service-groups",
        label: "Service groups",
        icon: <ServiceGroupsIcon />,
      },
      {
        id: "management-groups",
        label: "Management groups",
        icon: <ManagementGroupsIcon />,
      },
      {
        id: "subscriptions",
        label: "Subscriptions",
        icon: <SubscriptionsIcon />,
      },
    ],
  },
  {
    type: "group",
    id: "tools",
    label: "Tools",
    defaultExpanded: false,
    items: [
      {
        id: "resource-graph-explorer",
        label: "Resource graph explorer",
        icon: <ResourceGraphExplorerIcon />,
      },
      {
        id: "resource-graph-queries",
        label: "Resource graph queries",
        icon: <ResourceGraphQueriesIcon />,
      },
      {
        id: "resource-visualizer",
        label: "Resource visualizer",
        icon: <ResourceVisualizerIcon />,
      },
      {
        id: "resource-explorer",
        label: "Resource explorer",
        icon: <ResourceExplorerIcon />,
      },
      {
        id: "arm-api-playground",
        label: "ARM API playground",
        icon: <ApiPlaygroundIcon />,
      },
      {
        id: "resource-mover",
        label: "Resource mover",
        icon: <ResourceMoverIcon />,
      },
    ],
  },
  {
    type: "group",
    id: "deployments",
    label: "Deployments",
    defaultExpanded: false,
    items: [
      {
        id: "templates",
        label: "Templates",
        icon: <TemplatesIcon />,
      },
      {
        id: "template-specs",
        label: "Template specs",
        icon: <TemplateSpecsIcon />,
      },
    ],
  },
  {
    type: "item",
    id: "support-troubleshooting",
    label: "Support + troubleshooting",
    icon: <SupportIcon />,
  },
]

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface ResourceManagerMvpProps {
  isDarkMode?: boolean
}

// ---------------------------------------------------------------------------
// Overflow menu — renders MenuItems only for toolbar items that have been
// pushed out of visible flow by Fluent v9's <Overflow>. The trigger reuses the
// v8 "…" ellipsis button so the styling matches the rest of the toolbar.
// ---------------------------------------------------------------------------
interface ToolbarOverflowItem {
  id: string
  label: string
  icon: React.ReactNode
  disabled?: boolean
  onClick?: () => void
}

function ToolbarOverflowMenuItem({ item }: { item: ToolbarOverflowItem }) {
  const isVisible = useIsOverflowItemVisible(item.id)
  if (isVisible) return null
  return (
    <MenuItem
      icon={item.icon as any}
      disabled={item.disabled}
      onClick={item.onClick}
    >
      {item.label}
    </MenuItem>
  )
}

function ToolbarOverflowMenu({ items }: { items: ToolbarOverflowItem[] }) {
  const { ref, isOverflowing } =
    useOverflowMenu<HTMLButtonElement>()
  if (!isOverflowing) return null
  return (
    <Menu>
      <MenuTrigger>
        <ToolbarOverflow ref={ref} />
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {items.map((item) => (
            <ToolbarOverflowMenuItem key={item.id} item={item} />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}

/** Resource Manager MVP — "All resources" blade styled with v8 (classic blade) components
 * (SiteHeader, Breadcrumb, BladeHeader, Toolbar, FilterBar, DataGrid, Footer).
 *
 * A Fluent Teaching popover introduces the "Get insights" action. */
export default function ResourceManagerMvp(_props: ResourceManagerMvpProps) {
  const styles = useStyles()
  const router = useRouter()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<PageSize>(20)
  const [tipVisible, setTipVisible] = useState(true)
  const [activeTocItem, setActiveTocItem] = useState("all-resources")

  const isResourceGroups = activeTocItem === "resource-groups"

  const handleTocSelect = (id: string) => {
    if (id !== activeTocItem) {
      setActiveTocItem(id)
      setPage(1)
      setSelectedIds([])
    }
  }

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (isResourceGroups) {
      if (!q) return mockResourceGroups
      return mockResourceGroups.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.subscription.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q),
      )
    }
    if (!q) return mockResources
    return mockResources.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.type.toLowerCase().includes(q) ||
        r.resourceGroup.toLowerCase().includes(q),
    )
  }, [searchQuery, isResourceGroups])

  const pageCount =
    pageSize === "auto" ? 1 : Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageStart = pageSize === "auto" ? 0 : (page - 1) * pageSize
  const pageEnd =
    pageSize === "auto"
      ? filtered.length
      : Math.min(filtered.length, pageStart + pageSize)
  const pagedRows =
    pageSize === "auto" ? filtered : filtered.slice(pageStart, pageEnd)

  const columns: DataGridColumn[] = isResourceGroups
    ? [
        { key: "name", label: "Name", type: "link", sortable: true, width: "320px" },
        { key: "subscription", label: "Subscription", type: "text", sortable: true, width: "240px" },
        { key: "location", label: "Location", type: "text", sortable: true, width: "200px" },
      ]
    : [
        { key: "name", label: "Name", type: "link", sortable: true, width: "280px" },
        { key: "type", label: "Type", type: "text", sortable: true, width: "200px" },
        { key: "resourceGroup", label: "Resource group", type: "text", sortable: true, width: "200px" },
        { key: "subscription", label: "Subscription", type: "text", sortable: true, width: "180px" },
        { key: "status", label: "Status", type: "text", sortable: true, width: "140px" },
        { key: "location", label: "Location", type: "text", sortable: true, width: "160px" },
      ]

  const rows: DataGridRow[] = isResourceGroups
    ? (pagedRows as MockResourceGroup[]).map((r) => ({
        id: r.id,
        name: { text: r.name, onClick: () => {} },
        subscription: r.subscription,
        location: r.location,
      }))
    : (pagedRows as MockResource[]).map((r) => ({
        id: r.id,
        name: { text: r.name, onClick: () => {} },
        type: r.type,
        resourceGroup: r.resourceGroup,
        subscription: r.subscription,
        status: r.status,
        location: r.location,
      }))

  return (
    <div className={styles.page}>
      <SiteHeader userName="Reed Fansler" userCompany="MICROSOFT" />

      <Breadcrumb
        className={styles.breadcrumb}
        items={[
          { label: "Home", onClick: () => {} },
          { label: "Resource Manager" },
        ]}
      />

      <BladeHeader
        title={
          isResourceGroups
            ? "Resource Manager | Resource groups"
            : "Resource Manager | All resources"
        }
        subtitle="Microsoft"
        icon={isResourceGroups ? <ResourceGroupsIcon /> : <AllResourcesIcon />}
        showPin
        showFavorites
        showEllipsis
      />

      <div className={styles.bladeBody}>
        <ServiceNav
          className={styles.leftNav}
          entries={tocEntries}
          selectedId={activeTocItem}
          onSelect={handleTocSelect}
        />

      <div className={styles.content}>
        {/* Toolbar */}
        <div className={styles.pad}>
          <Toolbar>
            <Overflow minimumVisible={2} padding={48}>
              <div className={styles.toolbarInner}>
                <OverflowItem id="create" priority={10}>
                  <ToolbarItem icon={<AddIcon />} label="Create" hasMenu />
                </OverflowItem>
                <OverflowItem id="manage-view" priority={9}>
                  <ToolbarItem icon={<ViewIcon />} label="Manage view" hasMenu />
                </OverflowItem>
                <OverflowItem id="refresh" priority={8}>
                  <ToolbarItem icon={<RefreshIcon />} label="Refresh" />
                </OverflowItem>
                <OverflowItem id="export-csv" priority={5}>
                  <ToolbarItem icon={<DownloadIcon />} label="Export to CSV" />
                </OverflowItem>
                <OverflowItem id="open-query" priority={4}>
                  <ToolbarItem icon={<QueryIcon />} label="Open query" />
                </OverflowItem>
                <OverflowDivider groupId="actions">
                  <ToolbarDivider />
                </OverflowDivider>
                <OverflowItem id="assign-tags" priority={3} groupId="actions">
                  <ToolbarItem
                    icon={<TagsIcon />}
                    label="Assign tags"
                    disabled={selectedIds.length === 0}
                  />
                </OverflowItem>

                <OverflowItem id="get-insights" priority={7} groupId="actions">
                  <span>
                    {/* Get insights — Popover opens on page load and stays until the user dismisses it via the close button. */}
                    <Popover
                      open={tipVisible}
                      onOpenChange={(_e, data) => {
                        // Only allow the close button (our explicit onClick) to dismiss —
                        // ignore outside-click / escape so the tip stays until dismissed.
                        if (data.open) setTipVisible(true)
                      }}
                      positioning={{ position: "below", align: "start" }}
                      withArrow
                      trapFocus={false}
                    >
                      <PopoverTrigger disableButtonEnhancement>
                        <ToolbarItem
                          icon={<ArrowTrending20Regular />}
                          label="Analyze selection"
                          onClick={() => {
                            const qs = selectedIds.length
                              ? `?ids=${encodeURIComponent(selectedIds.join(","))}`
                              : ""
                            router.push(`/resource-manager-mvp/prototype/insights/${qs}`)
                          }}
                        />
                      </PopoverTrigger>
                      <PopoverSurface className={styles.tipSurface}>
                        <div className={styles.tipContent}>
                          <div className={styles.tipText}>
                            <span className={styles.tipTitleRow}>
                              <Lightbulb16Regular />
                              <span>Instant insights</span>
                            </span>
                            <Text className={styles.tipBody}>
                              Select resources to create a live analysis of cost trends,
                              active alerts, security posture, and health.
                            </Text>
                          </div>
                          <Button
                            appearance="transparent"
                            size="small"
                            icon={<Dismiss16Regular />}
                            aria-label="Dismiss"
                            className={styles.tipClose}
                            onClick={() => setTipVisible(false)}
                          />
                        </div>
                      </PopoverSurface>
                    </Popover>
                  </span>
                </OverflowItem>

                <OverflowItem id="delete" priority={2} groupId="actions">
                  <ToolbarItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    disabled={selectedIds.length === 0}
                  />
                </OverflowItem>
                <OverflowItem id="add-to-service-group" priority={1} groupId="actions">
                  <ToolbarItem
                    icon={<AddTeamMemberIcon />}
                    label="Add to service group"
                    disabled={selectedIds.length === 0}
                  />
                </OverflowItem>
                <ToolbarOverflowMenu
                  items={[
                    { id: "create", label: "Create", icon: <AddIcon /> },
                    { id: "manage-view", label: "Manage view", icon: <ViewIcon /> },
                    { id: "refresh", label: "Refresh", icon: <RefreshIcon /> },
                    { id: "export-csv", label: "Export to CSV", icon: <DownloadIcon /> },
                    { id: "open-query", label: "Open query", icon: <QueryIcon /> },
                    {
                      id: "assign-tags",
                      label: "Assign tags",
                      icon: <TagsIcon />,
                      disabled: selectedIds.length === 0,
                    },
                    { id: "get-insights",
                      label: "Analyze selection",
                      icon: <ArrowTrending20Regular />,
                      onClick: () => {
                        const qs = selectedIds.length
                          ? `?ids=${encodeURIComponent(selectedIds.join(","))}`
                          : ""
                        router.push(`/resource-manager-mvp/prototype/insights/${qs}`)
                      },
                    },
                    {
                      id: "delete",
                      label: "Delete",
                      icon: <DeleteIcon />,
                      disabled: selectedIds.length === 0,
                    },
                    {
                      id: "add-to-service-group",
                      label: "Add to service group",
                      icon: <AddTeamMemberIcon />,
                      disabled: selectedIds.length === 0,
                    },
                  ]}
                />
              </div>
            </Overflow>
          </Toolbar>
        </div>

        {/* Filter bar */}
        <div className={styles.pad}>
          <FilterBar
            searchInput={
              <TextInput
                placeholder="Filter for any field..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(
                    (e.target as HTMLInputElement | HTMLTextAreaElement).value,
                  )
                }
              />
            }
            groupByDropdown={<Dropdown label="Group by: None" />}
          >
            <FilterPill name="Subscription" modifier="==" value="all" dismissible />
            <FilterPill name="Type" modifier="==" value="all" dismissible />
            <FilterPill name="Resource group" modifier="==" value="all" dismissible />
            <FilterPill name="Location" modifier="==" value="all" dismissible />
            <FilterBarAddButton />
          </FilterBar>
        </div>

        {/* Data grid */}
        <div className={styles.gridRow}>
          <DataGrid
            columns={columns}
            rows={rows}
            selectionMode="multiple"
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
          />
        </div>

        {/* Footer */}
        <Footer
          left={
            <FooterBrowseInfo
              start={filtered.length === 0 ? 0 : pageStart + 1}
              end={pageEnd}
              total={filtered.length}
              pageSize={pageSize}
              onPageSizeChange={(size) => {
                setPageSize(size)
                setPage(1)
              }}
            />
          }
          center={
            <FooterPagination
              page={page}
              totalPages={pageCount}
              onPageChange={setPage}
            />
          }
        />
      </div>
      </div>
    </div>
  )
}
