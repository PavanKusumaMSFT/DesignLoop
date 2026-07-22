/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client"

import { useMemo, useState, type ReactNode } from "react"
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  OverlayDrawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
  DrawerFooter,
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Button,
  Input,
  Checkbox,
  Text,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Divider,
} from "@fluentui/react-components"
import {
  Dismiss20Regular,
  Dismiss12Regular,
  ChevronDown12Regular,
  Dismiss16Regular,
  Search16Regular,
} from "@fluentui/react-icons"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface ResourcePickerColumn<T> {
  /** Stable key used for keys + sort identification */
  key: string
  /** Column header label */
  label: string
  /** Cell renderer */
  render: (item: T) => ReactNode
  /** Optional sort accessor. When provided, the column header becomes clickable and sorts ascending/descending. */
  sortValue?: (item: T) => string | number
}

export interface ResourcePickerFilter<T> {
  /** Stable key for the filter pill */
  key: string
  /** Pill label prefix, e.g. "Location" — rendered as "Location == all" / "Location == East US (+2)" */
  label: string
  /** Distinct values to offer in the multi-select callout */
  options: string[]
  /** Predicate: return true when the row matches the selected values (null → "all", do not filter) */
  predicate: (item: T, values: string[] | null) => boolean
}

export interface ResourcePickerProps<T> {
  /** Drawer width preset (default: "large"). Maps to Fluent's `OverlayDrawer` size prop. */
  size?: "small" | "medium" | "large" | "full"
  /** Drawer open state */
  open: boolean
  /** Called when the drawer is dismissed (X button, Cancel button, or backdrop click) */
  onClose: () => void
  /** Drawer title, e.g. "Add subscriptions to export" */
  title: string
  /** Optional subtitle below the title (e.g. "Optional location") */
  subtitle?: string
  /** Full list of items to choose from */
  items: T[]
  /** Stable unique key for an item (used for selection state) */
  itemKey: (item: T) => string
  /** Optional icon rendered before the name in the first column (per row). */
  itemIcon?: (item: T) => ReactNode
  /** Columns rendered in the table. The first column should typically be the item name. */
  columns: ResourcePickerColumn<T>[]
  /** Optional filter pills shown above the table */
  filters?: ResourcePickerFilter<T>[]
  /** Optional keyword search predicate. When provided, the SearchBox filters rows via this function. */
  searchPredicate?: (item: T, query: string) => boolean
  /** Initial selected item keys */
  initialSelectedKeys?: string[]
  /** Called when the user clicks Apply with the chosen keys */
  onApply: (selectedKeys: string[]) => void
  /** Apply button label (default: "Apply") */
  applyLabel?: string
  /** Cancel button label (default: "Cancel") */
  cancelLabel?: string
  /** Label for the second accordion (default: "Review selected resources") \u2014 the "(n)" count is appended automatically */
  reviewLabel?: string
  /** Label for the first accordion (default: "Filtered list") */
  filteredListLabel?: string  /** When false, the review accordion is hidden and the filtered list renders flat (no accordion wrapper). Default: true. */
  showReviewAccordion?: boolean}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  header: {
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  titleRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
  },
  title: {
    fontSize: "20px",
    lineHeight: "28px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXXS,
  },
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    overflow: "hidden",
  },
  accordionRoot: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflow: "hidden",
  },
  accordionItem: {
    display: "flex",
    flexDirection: "column",
    flex: "0 0 auto",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: tokens.colorNeutralStroke2,
  },
  accordionItemOpen: {
    flex: "1 1 auto",
    overflow: "hidden",
  },
  accordionHeader: {
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    "& button": {
      fontWeight: tokens.fontWeightSemibold,
    },
  },
  accordionPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
  },
  flatPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  filterRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  searchBox: {
    width: "240px",
  },
  // Pill styling — mirrors components/projects/carbon-optimization/carbon-filters.tsx
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
    backgroundColor: tokens.colorBrandBackground2,
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
      backgroundColor: tokens.colorBrandBackground2Hover,
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
  popoverScroll: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    paddingTop: "6px",
    paddingBottom: "6px",
    maxHeight: "240px",
    overflowY: "auto",
  },
  popoverDivider: {
    marginTop: "0",
    marginBottom: "0",
  },
  popoverFooter: {
    display: "flex",
    gap: "14px",
    paddingTop: "6px",
  },
  tableScroll: {
    flex: 1,
    overflowY: "auto",
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    paddingBottom: tokens.spacingVerticalL,
  },
  selectionCell: {
    width: "32px",
  },
  removeCell: {
    width: "60px",
    textAlign: "right",
  },
  removeButton: {
    minWidth: "auto",
    color: tokens.colorBrandForeground1,
    paddingLeft: tokens.spacingHorizontalXS,
    paddingRight: tokens.spacingHorizontalXS,
  },
  emptyMessage: {
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
    fontSize: "13px",
  },
  footer: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: tokens.colorNeutralStroke2,
  },
})

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/** Reusable right-side resource picker drawer. Shows a "Filtered list" accordion (datagrid + search + filter pills) for choosing items, and a "Review selected resources (n)" accordion for inspecting/removing the current selection. Only one accordion can be open at a time; the open one expands to fill remaining vertical space. Generic over the row type T \u2014 callers supply columns, filters, search predicate, and a selection apply handler. */
export default function ResourcePicker<T>({
  open,
  onClose,
  title,
  subtitle,
  items,
  itemKey,
  itemIcon,
  columns,
  filters,
  searchPredicate,
  initialSelectedKeys,
  onApply,
  applyLabel = "Apply",
  cancelLabel = "Cancel",
  reviewLabel = "Review selected resources",
  filteredListLabel = "Filtered list",
  showReviewAccordion = true,
  size = "large",
}: ResourcePickerProps<T>) {
  const styles = useStyles()
  const [openAccordion, setOpenAccordion] = useState<string>("filtered")
  const [searchQuery, setSearchQuery] = useState("")
  // Map of filter key → selected option values. null/undefined entry means "all".
  const [filterValues, setFilterValues] = useState<Record<string, string[] | null>>({})
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"ascending" | "descending">("ascending")
  const [reviewSortColumn, setReviewSortColumn] = useState<string | null>(null)
  const [reviewSortDir, setReviewSortDir] = useState<"ascending" | "descending">("ascending")
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(
    () => new Set(initialSelectedKeys ?? [])
  )

  const filteredItems = useMemo(() => {
    const out = items.filter((item) => {
      if (searchPredicate && searchQuery && !searchPredicate(item, searchQuery)) return false
      if (filters) {
        for (const f of filters) {
          const v = filterValues[f.key] ?? null
          if (!f.predicate(item, v)) return false
        }
      }
      return true
    })
    if (sortColumn) {
      const col = columns.find((c) => c.key === sortColumn)
      if (col?.sortValue) {
        const accessor = col.sortValue
        const dir = sortDir === "ascending" ? 1 : -1
        out.sort((a, b) => {
          const av = accessor(a)
          const bv = accessor(b)
          if (av < bv) return -1 * dir
          if (av > bv) return 1 * dir
          return 0
        })
      }
    }
    return out
  }, [items, searchQuery, filterValues, filters, searchPredicate, sortColumn, sortDir, columns])

  const handleSortClick = (key: string, sortable: boolean) => {
    if (!sortable) return
    if (sortColumn === key) {
      setSortDir((d) => (d === "ascending" ? "descending" : "ascending"))
    } else {
      setSortColumn(key)
      setSortDir("ascending")
    }
  }

  const allFilteredSelected =
    filteredItems.length > 0 && filteredItems.every((it) => selectedKeys.has(itemKey(it)))
  const someFilteredSelected =
    !allFilteredSelected && filteredItems.some((it) => selectedKeys.has(itemKey(it)))

  const toggleSelectAll = () => {
    setSelectedKeys((prev) => {
      const next = new Set(prev)
      if (allFilteredSelected) {
        for (const it of filteredItems) next.delete(itemKey(it))
      } else {
        for (const it of filteredItems) next.add(itemKey(it))
      }
      return next
    })
  }

  const toggleOne = (key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const removeOne = (key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev)
      next.delete(key)
      return next
    })
  }

  const selectedItems = useMemo(
    () => {
      const out = items.filter((it) => selectedKeys.has(itemKey(it)))
      if (reviewSortColumn) {
        const col = columns.find((c) => c.key === reviewSortColumn)
        if (col?.sortValue) {
          const accessor = col.sortValue
          const dir = reviewSortDir === "ascending" ? 1 : -1
          out.sort((a, b) => {
            const av = accessor(a)
            const bv = accessor(b)
            if (av < bv) return -1 * dir
            if (av > bv) return 1 * dir
            return 0
          })
        }
      }
      return out
    },
    [items, selectedKeys, itemKey, reviewSortColumn, reviewSortDir, columns]
  )

  const handleReviewSortClick = (key: string, sortable: boolean) => {
    if (!sortable) return
    if (reviewSortColumn === key) {
      setReviewSortDir((d) => (d === "ascending" ? "descending" : "ascending"))
    } else {
      setReviewSortColumn(key)
      setReviewSortDir("ascending")
    }
  }

  const handleApply = () => {
    onApply(Array.from(selectedKeys))
    onClose()
  }

  return (
    <OverlayDrawer
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open) onClose()
      }}
      position="end"
      size={size}
      modalType="non-modal"
      style={{ top: "48px", bottom: "50px", height: "auto" }}
    >
      <DrawerHeader className={styles.header}>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              icon={<Dismiss20Regular />}
              aria-label="Close"
              onClick={onClose}
            />
          }
        >
          <div>
            <div className={styles.title}>{title}</div>
            {subtitle ? <div className={styles.subtitle}>{subtitle}</div> : null}
          </div>
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className={styles.body}>
        {(() => {
          const filteredListContent = (
            <>
              <div className={styles.filterRow}>
                {searchPredicate ? (
                  <Input
                    className={styles.searchBox}
                    size="small"
                    placeholder="Filter for any field..."
                    contentBefore={<Search16Regular />}
                    value={searchQuery}
                    onChange={(_, d) => setSearchQuery(d.value)}
                  />
                ) : null}
                {filters?.map((f) => (
                  <FilterPill
                    key={f.key}
                    filter={f}
                    selected={filterValues[f.key] ?? null}
                    onApply={(values) =>
                      setFilterValues((prev) => ({ ...prev, [f.key]: values }))
                    }
                  />
                ))}
              </div>
              <div className={styles.tableScroll}>
                <Table size="small" sortable aria-label="Available resources">
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell className={styles.selectionCell}>
                        <Checkbox
                          checked={
                            allFilteredSelected
                              ? true
                              : someFilteredSelected
                                ? "mixed"
                                : false
                          }
                          onChange={toggleSelectAll}
                          aria-label="Select all"
                        />
                      </TableHeaderCell>
                      {columns.map((c) => {
                        const isSortable = !!c.sortValue
                        return (
                          <TableHeaderCell
                            key={c.key}
                            sortDirection={sortColumn === c.key ? sortDir : undefined}
                            onClick={() => handleSortClick(c.key, isSortable)}
                            style={isSortable ? { cursor: "pointer" } : undefined}
                          >
                            {c.label}
                          </TableHeaderCell>
                        )
                      })}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => {
                      const k = itemKey(item)
                      const isSelected = selectedKeys.has(k)
                      return (
                        <TableRow key={k}>
                          <TableCell className={styles.selectionCell}>
                            <Checkbox
                              checked={isSelected}
                              onChange={() => toggleOne(k)}
                              aria-label={`Select ${k}`}
                            />
                          </TableCell>
                          {columns.map((c, idx) => (
                            <TableCell key={c.key}>
                              {idx === 0 && itemIcon ? (
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                  {itemIcon(item)}
                                  {c.render(item)}
                                </span>
                              ) : (
                                c.render(item)
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      )
                    })}
                    {filteredItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={columns.length + 1}>
                          <div className={styles.emptyMessage}>No items match the current filters.</div>
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </div>
            </>
          )

          if (!showReviewAccordion) {
            return <div className={styles.flatPanel}>{filteredListContent}</div>
          }

          return (
        <Accordion
          collapsible
          openItems={[openAccordion]}
          onToggle={(_, data) => {
            const next = data.openItems[0] as string | undefined
            // Enforce single-open: ignore close events that would leave neither open.
            if (next) setOpenAccordion(next)
          }}
          className={styles.accordionRoot}
        >
          <AccordionItem
            value="filtered"
            className={mergeClasses(styles.accordionItem, openAccordion === "filtered" && styles.accordionItemOpen)}
          >
            <AccordionHeader className={styles.accordionHeader} expandIconPosition="start">
              {filteredListLabel}
            </AccordionHeader>
            <AccordionPanel className={styles.accordionPanel}>
              {filteredListContent}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem
            value="review"
            className={mergeClasses(styles.accordionItem, openAccordion === "review" && styles.accordionItemOpen)}
          >
            <AccordionHeader className={styles.accordionHeader} expandIconPosition="start">
              {`${reviewLabel} (${selectedItems.length})`}
            </AccordionHeader>
            <AccordionPanel className={styles.accordionPanel}>
              <div className={styles.tableScroll}>
                <Table size="small" sortable aria-label="Selected resources">
                  <TableHeader>
                    <TableRow>
                      {columns.map((c) => {
                        const isSortable = !!c.sortValue
                        return (
                          <TableHeaderCell
                            key={c.key}
                            sortDirection={reviewSortColumn === c.key ? reviewSortDir : undefined}
                            onClick={() => handleReviewSortClick(c.key, isSortable)}
                            style={isSortable ? { cursor: "pointer" } : undefined}
                          >
                            {c.label}
                          </TableHeaderCell>
                        )
                      })}
                      <TableHeaderCell className={styles.removeCell}>Remove</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedItems.map((item) => {
                      const k = itemKey(item)
                      return (
                        <TableRow key={k}>
                          {columns.map((c, idx) => (
                            <TableCell key={c.key}>
                              {idx === 0 && itemIcon ? (
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                  {itemIcon(item)}
                                  {c.render(item)}
                                </span>
                              ) : (
                                c.render(item)
                              )}
                            </TableCell>
                          ))}
                          <TableCell className={styles.removeCell}>
                            <Button
                              appearance="subtle"
                              size="small"
                              icon={<Dismiss16Regular />}
                              aria-label={`Remove ${k}`}
                              className={styles.removeButton}
                              onClick={() => removeOne(k)}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    {selectedItems.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={columns.length + 1}>
                          <div className={styles.emptyMessage}>No resources selected yet.</div>
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
          )
        })()}
      </DrawerBody>

      <DrawerFooter className={styles.footer}>
        <Button appearance="primary" onClick={handleApply}>
          {applyLabel}
        </Button>
        <Button appearance="secondary" onClick={onClose}>
          {cancelLabel}
        </Button>
      </DrawerFooter>
    </OverlayDrawer>
  )
}

// ---------------------------------------------------------------------------
// Filter pill — multi-select callout (mirrors carbon-filters.tsx)
// ---------------------------------------------------------------------------

interface FilterPillProps<T> {
  filter: ResourcePickerFilter<T>
  selected: string[] | null
  onApply: (values: string[] | null) => void
}

function FilterPill<T>({ filter, selected, onApply }: FilterPillProps<T>) {
  const styles = useStyles()
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  // tempSelected: explicitly-selected option values. null === "All".
  const [tempSelected, setTempSelected] = useState<Set<string>>(
    () => new Set(selected ?? filter.options)
  )

  const isActive = selected !== null && selected.length > 0
  const displayValue =
    !isActive
      ? "all"
      : selected!.length === 1
        ? selected![0]
        : `${selected![0]} (+${selected!.length - 1})`

  const filteredOptions = useMemo(() => {
    if (!search) return filter.options
    const q = search.toLowerCase()
    return filter.options.filter((o) => o.toLowerCase().includes(q))
  }, [filter.options, search])

  const allChecked = tempSelected.size === filter.options.length
  const allMixed = tempSelected.size > 0 && !allChecked

  const handleOpen = () => {
    setTempSelected(new Set(selected ?? filter.options))
    setSearch("")
    setOpen(true)
  }

  const handleToggleAll = (checked: boolean) => {
    setTempSelected(checked ? new Set(filter.options) : new Set())
  }

  const handleToggleOption = (option: string, checked: boolean) => {
    setTempSelected((prev) => {
      const next = new Set(prev)
      if (checked) next.add(option)
      else next.delete(option)
      return next
    })
  }

  const handleApply = () => {
    if (tempSelected.size === filter.options.length) onApply(null)
    else onApply(Array.from(tempSelected))
    setOpen(false)
  }

  return (
    <Popover
      open={open}
      onOpenChange={(_, data) => {
        if (!data.open) setOpen(false)
      }}
      positioning={{ position: "below", align: "start", offset: 4 }}
    >
      <PopoverTrigger>
        <span>
          <span
            className={styles.pill}
            onClick={handleOpen}
            role="button"
            tabIndex={0}
          >
            <span className={styles.pillTextGroup}>
              <span className={styles.pillLabel}>{filter.label}</span>
              <span className={styles.pillLabel}>==</span>
              <span className={styles.pillValue}>{displayValue}</span>
            </span>
            {isActive ? (
              <button
                className={styles.pillCloseBtn}
                onClick={(e) => {
                  e.stopPropagation()
                  onApply(null)
                  setOpen(false)
                }}
                aria-label={`Clear ${filter.label} filter`}
              >
                <Dismiss12Regular />
              </button>
            ) : (
              <ChevronDown12Regular />
            )}
          </span>
        </span>
      </PopoverTrigger>
      <PopoverSurface>
        <div className={styles.popoverContent}>
          <Text className={styles.popoverTitle}>{filter.label}</Text>
          <Input
            size="small"
            placeholder="Search"
            contentBefore={<Search16Regular />}
            value={search}
            onChange={(_, data) => setSearch(data.value)}
          />
          <div className={styles.popoverScroll}>
            <Checkbox
              size="medium"
              label="All"
              checked={allMixed ? "mixed" : allChecked}
              onChange={(_, data) => handleToggleAll(data.checked === true)}
            />
            <Divider className={styles.popoverDivider} />
            {filteredOptions.length === 0 ? (
              <Text size={200}>No matches</Text>
            ) : (
              filteredOptions.map((option) => (
                <Checkbox
                  key={option}
                  size="medium"
                  label={option}
                  checked={tempSelected.has(option)}
                  onChange={(_, data) => handleToggleOption(option, data.checked === true)}
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
            <Button size="small" appearance="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </PopoverSurface>
    </Popover>
  )
}
