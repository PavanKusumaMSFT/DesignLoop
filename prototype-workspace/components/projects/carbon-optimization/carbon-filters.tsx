"use client"

import { useState, useMemo } from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Button,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Checkbox,
  Input,
  Text,
  Divider,
} from "@fluentui/react-components"
import { Dismiss12Regular, Search16Regular, ChevronDown12Regular } from "@fluentui/react-icons"
import {
  allSubscriptions,
  allResourceGroups,
  allResources,
  locations,
  resourceTypes,
} from "./data/mock-data"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

export interface FilterState {
  /** null = "all" selected. string[] = explicit selection. */
  subscriptionIds: string[] | null
  resourceGroup: string[] | null
  emissionsType: string[] | null // values: "scope1" | "scope2" | "scope3"; null = all 3
  resourceType: string[] | null
  location: string[] | null
}

interface CarbonFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  /** When set, the Subscription pill only lists subscriptions belonging to this billing account. Stale `filters.subscriptionIds` values that no longer match are pruned automatically. */
  billingAccountId?: string | null
  /** When true, the Resource group filter pill is omitted entirely (e.g. Billing Accounts view, where RGs are not the relevant scope). */
  hideResourceGroup?: boolean
  /** When true, render the Reductions blade filter set: Subscription + Resource group + Recommendation status (Active / Dismissed and postponed). Overrides `hideResourceGroup`. */
  reductionsMode?: boolean
}

/* ── Azure portal pill filter background (brand tint) ── */
const PILL_BG = tokens.colorBrandBackground2
const PILL_BG_HOVER = tokens.colorBrandBackground2Hover

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
  },
  pill: {
    fontSize: "13px",
    fontFamily: "inherit",
    borderRadius: "16px",
    height: "24px",
    minWidth: "50px",
    paddingTop: "0",
    paddingBottom: "0",
    paddingLeft: "10px",
    paddingRight: "8px",
    backgroundColor: PILL_BG,
    borderTopWidth: "0",
    borderRightWidth: "0",
    borderBottomWidth: "0",
    borderLeftWidth: "0",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    color: tokens.colorNeutralForeground1,
    lineHeight: "18px",
    ":hover": {
      backgroundColor: PILL_BG_HOVER,
    },
  },
  pillTextGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    whiteSpace: "nowrap",
  },
  pillLabel: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    lineHeight: "18px",
  },
  pillValue: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "18px",
  },
  pillCloseBtn: {
    flexShrink: 0,
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "16px",
    borderTopWidth: "0",
    borderRightWidth: "0",
    borderBottomWidth: "0",
    borderLeftWidth: "0",
    backgroundColor: "transparent",
    cursor: "pointer",
    color: tokens.colorNeutralForeground2,
    padding: "0",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  popoverContent: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "252px",
  },
  popoverTitle: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "24px",
  },
  scrollArea: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    paddingTop: "6px",
    paddingBottom: "6px",
    maxHeight: "240px",
    overflowY: "auto",
  },
  divider: {
    marginTop: "0",
    marginBottom: "0",
  },
  popoverFooter: {
    display: "flex",
    gap: "14px",
    paddingTop: "6px",
  },
})

/* ── Unique resource group names + label maps ── */
const uniqueResourceGroupNames = (() => {
  const seen = new Set<string>()
  for (const rg of allResourceGroups) seen.add(rg.name)
  return Array.from(seen).sort()
})()

const SCOPE_OPTIONS: FilterItem[] = [
  { id: "scope1", label: "Scope 1" },
  { id: "scope2", label: "Scope 2" },
  { id: "scope3", label: "Scope 3" },
]

const RECOMMENDATION_STATUS_OPTIONS: FilterItem[] = [
  { id: "active", label: "Active" },
  { id: "dismissed", label: "Dismissed and postponed" },
]

const subscriptionItems: FilterItem[] = allSubscriptions.map((s) => ({ id: s.id, label: s.name }))
const resourceGroupItems: FilterItem[] = uniqueResourceGroupNames.map((n) => ({ id: n, label: n }))
const resourceTypeItems: FilterItem[] = resourceTypes.map((t) => ({ id: t, label: t }))
const locationItems: FilterItem[] = locations.map((l) => ({ id: l, label: l }))

interface FilterItem {
  id: string
  label: string
}

/** Filter pills bar for Carbon Optimization views — every pill uses the same multi-select callout pattern. */
export default function CarbonFilters({ filters, onFiltersChange, billingAccountId, hideResourceGroup = false, reductionsMode = false }: CarbonFiltersProps) {
  const styles = useStyles()

  // Recommendation status is local to this filter bar (only surfaced in reductionsMode and not used for data scoping in the mock).
  // Defaults to ["active"] so the pill shows "Active" out of the gate, matching the spec.
  const [recommendationStatus, setRecommendationStatus] = useState<string[] | null>(["active"])

  // Subscriptions available depend on the selected billing account (when set).
  const availableSubscriptionItems = useMemo<FilterItem[]>(() => {
    if (!billingAccountId) return subscriptionItems
    return allSubscriptions
      .filter((s) => s.billingAccountId === billingAccountId)
      .map((s) => ({ id: s.id, label: s.name }))
  }, [billingAccountId])

  // Currently-selected subscription ids, filtered to those still available under the active billing account.
  const visibleSubscriptionSelection = useMemo<string[] | null>(() => {
    if (filters.subscriptionIds === null) return null
    const available = new Set(availableSubscriptionItems.map((i) => i.id))
    const filtered = filters.subscriptionIds.filter((id) => available.has(id))
    return filtered.length === 0 ? null : filtered
  }, [filters.subscriptionIds, availableSubscriptionItems])

  // Resource groups available depend on currently selected subscriptions.
  // When subscriptionIds is null ("all"), show every resource group.
  const availableResourceGroupItems = useMemo<FilterItem[]>(() => {
    if (filters.subscriptionIds === null) return resourceGroupItems
    const allowedSubs = new Set(filters.subscriptionIds)
    const names = new Set<string>()
    for (const rg of allResourceGroups) {
      if (allowedSubs.has(rg.subscriptionId)) names.add(rg.name)
    }
    return Array.from(names)
      .sort((a, b) => a.localeCompare(b))
      .map((n) => ({ id: n, label: n }))
  }, [filters.subscriptionIds])

  // Currently-selected resource groups, filtered to those still available.
  // Prevents stale selections when the user narrows subscriptions.
  const visibleResourceGroupSelection = useMemo<string[] | null>(() => {
    if (filters.resourceGroup === null) return null
    const available = new Set(availableResourceGroupItems.map((i) => i.id))
    const filtered = filters.resourceGroup.filter((id) => available.has(id))
    return filtered.length === 0 ? null : filtered
  }, [filters.resourceGroup, availableResourceGroupItems])

  const handleSubscriptionsApply = (ids: string[] | null) => {
    // Drop any resource-group selections that no longer belong to a selected subscription.
    let nextResourceGroup = filters.resourceGroup
    if (ids !== null && filters.resourceGroup !== null) {
      const allowedSubs = new Set(ids)
      const stillValid = new Set<string>()
      for (const rg of allResourceGroups) {
        if (allowedSubs.has(rg.subscriptionId)) stillValid.add(rg.name)
      }
      const pruned = filters.resourceGroup.filter((n) => stillValid.has(n))
      nextResourceGroup = pruned.length === 0 ? null : pruned
    }
    onFiltersChange({ ...filters, subscriptionIds: ids, resourceGroup: nextResourceGroup })
  }

  // Resources that match current subscription + resource group filters.
  // Resource type and location options are derived from this set so they
  // only show values that exist within the user's narrowed scope.
  const scopedResources = useMemo(() => {
    const allowedSubs = filters.subscriptionIds ? new Set(filters.subscriptionIds) : null
    const allowedRgNames = filters.resourceGroup ? new Set(filters.resourceGroup) : null
    let allowedRgIds: Set<string> | null = null
    if (allowedRgNames) {
      allowedRgIds = new Set<string>()
      for (const rg of allResourceGroups) {
        if (allowedRgNames.has(rg.name)) allowedRgIds.add(rg.id)
      }
    }
    return allResources.filter((r) => {
      if (allowedSubs && !allowedSubs.has(r.subscriptionId)) return false
      if (allowedRgIds && !allowedRgIds.has(r.resourceGroupId)) return false
      return true
    })
  }, [filters.subscriptionIds, filters.resourceGroup])

  const availableResourceTypeItems = useMemo<FilterItem[]>(() => {
    const types = new Set<string>()
    for (const r of scopedResources) types.add(r.type)
    return Array.from(types)
      .sort((a, b) => a.localeCompare(b))
      .map((t) => ({ id: t, label: t }))
  }, [scopedResources])

  const availableLocationItems = useMemo<FilterItem[]>(() => {
    const locs = new Set<string>()
    for (const r of scopedResources) locs.add(r.location)
    return Array.from(locs)
      .sort((a, b) => a.localeCompare(b))
      .map((l) => ({ id: l, label: l }))
  }, [scopedResources])

  const visibleResourceTypeSelection = useMemo<string[] | null>(() => {
    if (filters.resourceType === null) return null
    const available = new Set(availableResourceTypeItems.map((i) => i.id))
    const filtered = filters.resourceType.filter((id) => available.has(id))
    return filtered.length === 0 ? null : filtered
  }, [filters.resourceType, availableResourceTypeItems])

  const visibleLocationSelection = useMemo<string[] | null>(() => {
    if (filters.location === null) return null
    const available = new Set(availableLocationItems.map((i) => i.id))
    const filtered = filters.location.filter((id) => available.has(id))
    return filtered.length === 0 ? null : filtered
  }, [filters.location, availableLocationItems])

  if (reductionsMode) {
    return (
      <div className={styles.root}>
        <MultiSelectFilterPill
          filterName="Subscription"
          items={availableSubscriptionItems}
          selectedIds={visibleSubscriptionSelection}
          allLabel="all"
          onApply={handleSubscriptionsApply}
          searchPlaceholder="Search"
        />
        <MultiSelectFilterPill
          filterName="Resource group"
          items={availableResourceGroupItems}
          selectedIds={visibleResourceGroupSelection}
          allLabel="all"
          onApply={(ids) => onFiltersChange({ ...filters, resourceGroup: ids })}
          searchPlaceholder="Search"
        />
        <MultiSelectFilterPill
          filterName="Recommendation status"
          items={RECOMMENDATION_STATUS_OPTIONS}
          selectedIds={recommendationStatus}
          allLabel="all"
          onApply={setRecommendationStatus}
          searchPlaceholder="Search"
        />
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <MultiSelectFilterPill
        filterName="Subscription"
        items={availableSubscriptionItems}
        selectedIds={visibleSubscriptionSelection}
        allLabel="all"
        onApply={handleSubscriptionsApply}
        searchPlaceholder="Search"
      />

      {!hideResourceGroup && (
        <MultiSelectFilterPill
          filterName="Resource group"
          items={availableResourceGroupItems}
          selectedIds={visibleResourceGroupSelection}
          allLabel="all"
          onApply={(ids) => onFiltersChange({ ...filters, resourceGroup: ids })}
          searchPlaceholder="Search"
        />
      )}

      <MultiSelectFilterPill
        filterName="Emissions type"
        items={SCOPE_OPTIONS}
        selectedIds={filters.emissionsType}
        allLabel="Scope 1, 2, and 3"
        formatSelected={(ids) =>
          ids.length === 1
            ? `Scope ${ids[0].replace("scope", "")}`
            : `${ids.length} selected`
        }
        onApply={(ids) => onFiltersChange({ ...filters, emissionsType: ids })}
        searchPlaceholder="Search"
      />

      <MultiSelectFilterPill
        filterName="Resource type"
        items={availableResourceTypeItems}
        selectedIds={visibleResourceTypeSelection}
        allLabel="all"
        onApply={(ids) => onFiltersChange({ ...filters, resourceType: ids })}
        searchPlaceholder="Search"
      />

      <MultiSelectFilterPill
        filterName="Location"
        items={availableLocationItems}
        selectedIds={visibleLocationSelection}
        allLabel="all"
        onApply={(ids) => onFiltersChange({ ...filters, location: ids })}
        searchPlaceholder="Search"
      />
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   Pill button (chrome) — shared by all filters
   ──────────────────────────────────────────────────────────── */
function PillButton({
  filterName,
  value,
  isActive,
  onClick,
  onClear,
}: {
  filterName: string
  value: string
  isActive: boolean
  onClick: () => void
  onClear: () => void
}) {
  const styles = useStyles()
  return (
    <span className={styles.pill} onClick={onClick} role="button" tabIndex={0}>
      <span className={styles.pillTextGroup}>
        <span className={styles.pillLabel}>{filterName}</span>
        <span className={styles.pillLabel}>==</span>
        <span className={styles.pillValue}>{value}</span>
      </span>
      {isActive && (
        <button
          className={styles.pillCloseBtn}
          onClick={(e) => {
            e.stopPropagation()
            onClear()
          }}
          aria-label={`Clear ${filterName} filter`}
        >
          <Dismiss12Regular />
        </button>
      )}
      {!isActive && <ChevronDown12Regular />}
    </span>
  )
}

/* ────────────────────────────────────────────────────────────
   Unified multi-select pill — title + search + "All" + divider + items + Apply/Cancel
   ──────────────────────────────────────────────────────────── */
function MultiSelectFilterPill({
  filterName,
  items,
  selectedIds,
  allLabel,
  formatSelected,
  onApply,
  searchPlaceholder = "Search",
}: {
  filterName: string
  items: FilterItem[]
  selectedIds: string[] | null
  allLabel: string
  formatSelected?: (ids: string[]) => string
  onApply: (ids: string[] | null) => void
  searchPlaceholder?: string
}) {
  const styles = useStyles()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  // tempSelected: Set of explicitly-selected ids. null === "All" (treat as everything).
  const [tempSelected, setTempSelected] = useState<Set<string>>(
    () => new Set(selectedIds ?? items.map((i) => i.id))
  )

  const isActive = selectedIds !== null && selectedIds.length !== items.length
  const displayValue = !isActive
    ? allLabel
    : formatSelected
    ? formatSelected(selectedIds!)
    : selectedIds!.length === 1
    ? items.find((i) => i.id === selectedIds![0])?.label ?? selectedIds![0]
    : `${selectedIds!.length} selected`

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items
    const q = search.trim().toLowerCase()
    return items.filter((i) => i.label.toLowerCase().includes(q))
  }, [search, items])

  const allChecked = tempSelected.size === items.length
  const allMixed = tempSelected.size > 0 && tempSelected.size < items.length

  const handleOpen = () => {
    setTempSelected(new Set(selectedIds ?? items.map((i) => i.id)))
    setSearch("")
    setOpen(true)
  }

  const handleToggleAll = (checked: boolean) => {
    if (checked) {
      setTempSelected(new Set(items.map((i) => i.id)))
    } else {
      setTempSelected(new Set())
    }
  }

  const handleToggleItem = (id: string, checked: boolean) => {
    const next = new Set(tempSelected)
    if (checked) next.add(id)
    else next.delete(id)
    setTempSelected(next)
  }

  const handleApply = () => {
    if (tempSelected.size === items.length) {
      onApply(null) // all selected → no filter
    } else {
      onApply(Array.from(tempSelected))
    }
    setOpen(false)
  }

  const handleCancel = () => setOpen(false)

  return (
    <Popover
      open={open}
      onOpenChange={(_, data) => { if (!data.open) setOpen(false) }}
      positioning={{ position: "below", align: "start", offset: 4 }}
    >
      <PopoverTrigger>
        <span>
          <PillButton
            filterName={filterName}
            value={displayValue}
            isActive={isActive}
            onClick={handleOpen}
            onClear={() => { onApply(null); setOpen(false) }}
          />
        </span>
      </PopoverTrigger>
      <PopoverSurface>
        <div className={styles.popoverContent}>
          <Text className={styles.popoverTitle}>{filterName}</Text>
          <Input
            size="small"
            placeholder={searchPlaceholder}
            contentBefore={<Search16Regular />}
            value={search}
            onChange={(_, data) => setSearch(data.value)}
          />
          <div className={styles.scrollArea}>
            <Checkbox
              size="medium"
              label="All"
              checked={allMixed ? "mixed" : allChecked}
              onChange={(_, data) => handleToggleAll(data.checked === true)}
            />
            <Divider className={styles.divider} />
            {filteredItems.length === 0 ? (
              <Text size={200}>No matches</Text>
            ) : (
              filteredItems.map((item) => (
                <Checkbox
                  key={item.id}
                  size="medium"
                  label={item.label}
                  checked={tempSelected.has(item.id)}
                  onChange={(_, data) => handleToggleItem(item.id, data.checked === true)}
                />
              ))
            )}
          </div>
          <div className={styles.popoverFooter}>
            <Button
              size="small"
              appearance="primary"
              disabled={tempSelected.size === 0}
              onClick={handleApply}
            >
              Apply
            </Button>
            <Button size="small" appearance="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </PopoverSurface>
    </Popover>
  )
}

/* ────────────────────────────────────────────────────────────
   Compute effective subscription IDs from all filters
   ──────────────────────────────────────────────────────────── */
export function getFilteredSubscriptionIds(filters: FilterState): string[] | undefined {
  let ids: Set<string> | null = null

  // 1. Subscription filter
  if (filters.subscriptionIds) {
    ids = new Set(filters.subscriptionIds)
  }

  // 2. Resource group filter → restrict to subs that contain matching RG
  if (filters.resourceGroup) {
    const allowed = new Set(filters.resourceGroup)
    const matchingSubs = new Set<string>()
    for (const rg of allResourceGroups) {
      if (allowed.has(rg.name)) matchingSubs.add(rg.subscriptionId)
    }
    ids = intersect(ids, matchingSubs)
  }

  // 3. Resource type filter → restrict to subs that have resources of those types
  if (filters.resourceType) {
    const allowed = new Set(filters.resourceType)
    const matchingSubs = new Set<string>()
    for (const res of allResources) {
      if (allowed.has(res.type)) matchingSubs.add(res.subscriptionId)
    }
    ids = intersect(ids, matchingSubs)
  }

  // 4. Location filter → restrict to subs that have RGs in those locations
  if (filters.location) {
    const allowed = new Set(filters.location)
    const matchingSubs = new Set<string>()
    for (const rg of allResourceGroups) {
      if (allowed.has(rg.location)) matchingSubs.add(rg.subscriptionId)
    }
    ids = intersect(ids, matchingSubs)
  }

  return ids ? Array.from(ids) : undefined
}

function intersect(a: Set<string> | null, b: Set<string>): Set<string> {
  if (!a) return b
  const result = new Set<string>()
  for (const id of a) if (b.has(id)) result.add(id)
  return result
}
