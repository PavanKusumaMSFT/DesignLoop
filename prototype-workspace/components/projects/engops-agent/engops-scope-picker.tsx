"use client"

import React, { useMemo, useState } from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Text,
  Button,
  TabList,
  Tab,
  SearchBox,
  Checkbox,
  Tag,
  TagGroup,
  Divider,
} from "@fluentui/react-components"
import { ArrowRight16Regular, Sparkle16Regular } from "@fluentui/react-icons"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

export interface ScopeEntry {
  id: string
  name: string
  /** e.g. "in prod-payments" or "Azure subscription 1" */
  subtitle?: string
  resources: number
  /** "$4,120" */
  costPerMo: string
  tags: Array<{ label: string; critical?: boolean }>
  /** Seeded as selected */
  defaultChecked?: boolean
  /** Included in "Critical + Production" preset */
  isCriticalProd?: boolean
  /** Rank for "Top 5 by spend" preset (1 = top) */
  spendRank?: number
}

export type ScopeTab = "subscriptions" | "resource-groups"

export interface EngopsScopePickerProps {
  subscriptions: ScopeEntry[]
  resourceGroups: ScopeEntry[]
  maxSelection?: number
  /** Called when user clicks Continue with final selection. */
  onContinue?: (selection: {
    subscriptions: string[]
    resourceGroups: string[]
  }) => void
  onCancel?: () => void
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingHorizontalL,
    boxShadow: tokens.shadow4,
    minWidth: 0,
    maxWidth: "100%",
    overflow: "hidden",
  },
  headerIconRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    color: tokens.colorBrandForeground1,
  },
  headerTaskLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
  title: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase500,
  },
  subtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase400,
  },
  subtitleStrong: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },

  toolbar: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  countRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  countText: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  searchBox: {
    width: "220px",
    maxWidth: "100%",
  },
  presetRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalXS,
  },

  list: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "340px",
    overflowY: "auto",
    marginLeft: `calc(-1 * ${tokens.spacingHorizontalS})`,
    marginRight: `calc(-1 * ${tokens.spacingHorizontalS})`,
  },
  row: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    borderRadius: tokens.borderRadiusMedium,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  rowSelected: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
  },
  rowContent: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    flex: 1,
    minWidth: 0,
  },
  rowNameLine: {
    display: "flex",
    alignItems: "baseline",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  rowName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    minWidth: 0,
  },
  rowSubtitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  rowMeta: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  rowMetaCost: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightMedium,
  },
  rowTags: {
    marginTop: tokens.spacingVerticalXXS,
    flexWrap: "wrap",
  },

  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  footerStatus: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  footerActions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    marginLeft: "auto",
  },
  emptyState: {
    padding: tokens.spacingVerticalL,
    textAlign: "center",
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
  },
})

/**
 * Conversational scope picker — lets the user pick up to N subscriptions and/or
 * resource groups to act on, with filter, search, and quick presets. Renders
 * inside an agent's CopilotMessage as the first step of a task.
 */
export default function EngopsScopePicker({
  subscriptions,
  resourceGroups,
  maxSelection = 10,
  onContinue,
  onCancel,
}: EngopsScopePickerProps) {
  const styles = useStyles()

  const [activeTab, setActiveTab] = useState<ScopeTab>("subscriptions")
  const [query, setQuery] = useState("")
  const [selectedSubs, setSelectedSubs] = useState<Set<string>>(
    () => new Set(subscriptions.filter((s) => s.defaultChecked).map((s) => s.id))
  )
  const [selectedRgs, setSelectedRgs] = useState<Set<string>>(
    () => new Set(resourceGroups.filter((r) => r.defaultChecked).map((r) => r.id))
  )

  const totalSelected = selectedSubs.size + selectedRgs.size
  const atMax = totalSelected >= maxSelection

  const entries = activeTab === "subscriptions" ? subscriptions : resourceGroups
  const selected = activeTab === "subscriptions" ? selectedSubs : selectedRgs
  const setSelected =
    activeTab === "subscriptions" ? setSelectedSubs : setSelectedRgs

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return entries
    return entries.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.subtitle?.toLowerCase().includes(q) ||
        e.tags.some((t) => t.label.toLowerCase().includes(q))
    )
  }, [entries, query])

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (totalSelected >= maxSelection) return prev
        next.add(id)
      }
      return next
    })
  }

  const applyPreset = (preset: "critical-prod" | "top-5-spend" | "clear") => {
    if (preset === "clear") {
      setSelected(new Set())
      return
    }
    if (preset === "critical-prod") {
      const ids = entries
        .filter((e) => e.isCriticalProd)
        .slice(0, maxSelection - (totalSelected - selected.size))
        .map((e) => e.id)
      setSelected(new Set(ids))
      return
    }
    if (preset === "top-5-spend") {
      const ids = [...entries]
        .filter((e) => e.spendRank !== undefined)
        .sort((a, b) => (a.spendRank ?? 99) - (b.spendRank ?? 99))
        .slice(0, 5)
        .map((e) => e.id)
      setSelected(new Set(ids))
      return
    }
  }

  const handleContinue = () => {
    onContinue?.({
      subscriptions: Array.from(selectedSubs),
      resourceGroups: Array.from(selectedRgs),
    })
  }

  return (
    <div className={styles.root}>
      <div className={styles.headerIconRow}>
        <Sparkle16Regular />
        <Text className={styles.headerTaskLabel}>Find retiring resources</Text>
      </div>
      <Text className={styles.title}>
        Which subscriptions and resource groups should I act on?
      </Text>
      <Text className={styles.subtitle}>
        Pick your{" "}
        <Text as="span" className={styles.subtitleStrong}>
          critical and production
        </Text>{" "}
        scopes first — that's where unaddressed issues cause real customer
        impact. Up to{" "}
        <Text as="span" className={styles.subtitleStrong}>
          {maxSelection} total
        </Text>{" "}
        across subscriptions and resource groups. You can change this anytime.
      </Text>

      <TabList
        selectedValue={activeTab}
        onTabSelect={(_, data) => setActiveTab(data.value as ScopeTab)}
        size="small"
      >
        <Tab value="subscriptions">
          Subscriptions ({selectedSubs.size})
        </Tab>
        <Tab value="resource-groups">
          Resource groups ({selectedRgs.size})
        </Tab>
      </TabList>

      <div className={styles.toolbar}>
        <div className={styles.countRow}>
          <Text className={styles.countText}>
            {entries.length}{" "}
            {activeTab === "subscriptions"
              ? "subscriptions in your tenant"
              : "resource groups across your subscriptions"}
          </Text>
          <SearchBox
            className={styles.searchBox}
            size="small"
            placeholder="Filter by name, ID, or tag"
            value={query}
            onChange={(_, data) => setQuery(data.value)}
          />
        </div>
        <div className={styles.presetRow}>
          <Button
            size="small"
            appearance="subtle"
            onClick={() => applyPreset("critical-prod")}
          >
            Critical + Production
          </Button>
          <Button
            size="small"
            appearance="subtle"
            onClick={() => applyPreset("top-5-spend")}
          >
            Top 5 by spend
          </Button>
          <Button
            size="small"
            appearance="subtle"
            onClick={() => applyPreset("clear")}
          >
            Clear current tab
          </Button>
        </div>
      </div>

      <Divider />

      <div className={styles.list} role="list">
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>No matches for "{query}"</div>
        ) : (
          filtered.map((entry) => {
            const checked = selected.has(entry.id)
            const disabled = !checked && atMax
            return (
              <label
                key={entry.id}
                className={mergeClasses(
                  styles.row,
                  checked ? styles.rowSelected : undefined
                )}
                role="listitem"
              >
                <Checkbox
                  checked={checked}
                  disabled={disabled}
                  onChange={() => toggle(entry.id)}
                  aria-label={`Select ${entry.name}`}
                />
                <div className={styles.rowContent}>
                  <div className={styles.rowNameLine}>
                    <Text className={styles.rowName}>{entry.name}</Text>
                    {entry.subtitle && (
                      <Text className={styles.rowSubtitle}>
                        {entry.subtitle}
                      </Text>
                    )}
                  </div>
                  <div className={styles.rowMeta}>
                    <Text>{entry.resources} resources</Text>
                    <Text className={styles.rowMetaCost}>
                      {entry.costPerMo}/mo
                    </Text>
                  </div>
                  {entry.tags.length > 0 && (
                    <TagGroup size="extra-small" className={styles.rowTags}>
                      {entry.tags.map((t) => (
                        <Tag
                          key={t.label}
                          shape="circular"
                          appearance={t.critical ? "brand" : "outline"}
                        >
                          {t.label}
                        </Tag>
                      ))}
                    </TagGroup>
                  )}
                </div>
              </label>
            )
          })
        )}
      </div>

      <Divider />

      <div className={styles.footer}>
        <Text className={styles.footerStatus}>
          {totalSelected} of {maxSelection} selected · {selectedSubs.size}{" "}
          subscriptions, {selectedRgs.size} resource groups
        </Text>
        <div className={styles.footerActions}>
          {onCancel && (
            <Button appearance="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            appearance="primary"
            disabled={totalSelected === 0}
            icon={<ArrowRight16Regular />}
            iconPosition="after"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
