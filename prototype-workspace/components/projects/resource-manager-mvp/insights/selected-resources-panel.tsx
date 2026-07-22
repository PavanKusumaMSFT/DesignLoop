/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client"

import * as React from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Link,
} from "@fluentui/react-components"
import {
  AddSquare20Regular,
  CubeRegular,
  FolderRegular,
  ChevronRight12Regular,
  ChevronDown12Regular,
} from "@fluentui/react-icons"
import type { SelectedResource } from "./insights-data"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  panel: {
    width: "397px",
    flex: "0 0 397px",
    boxSizing: "border-box",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    overflow: "auto",
    "@container insights (max-width: 1399px)": {
      width: "360px",
      flex: "0 0 360px",
    },
    "@container insights (max-width: 1099px)": {
      width: "320px",
      flex: "0 0 320px",
    },
    "@container insights (max-width: 819px)": {
      width: "100%",
      flex: "1 1 auto",
      borderLeft: "none",
      borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    width: "100%",
  },
  title: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap",
  },
  addButton: {
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightSemibold,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    padding: "6px 8px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  row: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke3}`,
  },
  td: {
    padding: "6px 8px",
    verticalAlign: "middle",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: 0,
  },
  nameCell: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    minWidth: 0,
    overflow: "hidden",
  },
  chevronButton: {
    flex: "0 0 auto",
    width: "20px",
    height: "20px",
    minWidth: "20px",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: tokens.colorNeutralForeground2,
    borderRadius: tokens.borderRadiusSmall,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  chevronSpacer: {
    flex: "0 0 20px",
    width: "20px",
  },
  resourceIcon: {
    flex: "0 0 18px",
    width: "18px",
    height: "18px",
    color: tokens.colorBrandForeground1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  nameLink: {
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorBrandForeground1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    textDecoration: "none",
    ":hover": { textDecoration: "underline" },
  },
  emptyState: {
    padding: "16px 8px",
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
})

export interface SelectedResourcesPanelProps {
  resources: SelectedResource[]
  onAddResources?: () => void
  /** When false, the panel is not rendered. Defaults to true. */
  visible?: boolean
}

type FlatRow = {
  id: string
  name: string
  type: string
  depth: number
  expandable: boolean
  expanded: boolean
  onToggle?: () => void
  isGroup: boolean
}

/** Right rail for the insights blade — lists the resources currently scoped to
 * the insights view. Resource groups are expandable to reveal child resources. */
export default function SelectedResourcesPanel({
  resources,
  onAddResources,
  visible = true,
}: SelectedResourcesPanelProps) {
  const styles = useStyles()
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>(() => {
    // Default: resource groups expanded on first render.
    const init: Record<string, boolean> = {}
    for (const r of resources) {
      if (r.children && r.children.length) init[r.id] = true
    }
    return init
  })

  const toggle = React.useCallback((id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const rows: FlatRow[] = React.useMemo(() => {
    const out: FlatRow[] = []
    for (const r of resources) {
      const hasChildren = !!r.children && r.children.length > 0
      const isOpen = !!expanded[r.id]
      out.push({
        id: r.id,
        name: r.name,
        type: r.type,
        depth: 0,
        expandable: hasChildren,
        expanded: isOpen,
        onToggle: hasChildren ? () => toggle(r.id) : undefined,
        isGroup: hasChildren,
      })
      if (hasChildren && isOpen) {
        for (const child of r.children!) {
          out.push({
            id: child.id,
            name: child.name,
            type: child.type,
            depth: 1,
            expandable: false,
            expanded: false,
            isGroup: false,
          })
        }
      }
    }
    return out
  }, [resources, expanded, toggle])

  if (!visible) return null

  return (
    <aside className={styles.panel}>
      <div className={styles.header}>
        <Text className={styles.title}>Selected resources</Text>
        <Button
          appearance="subtle"
          size="small"
          icon={<AddSquare20Regular />}
          className={styles.addButton}
          onClick={onAddResources}
        >
          Add resources
        </Button>
      </div>

      {resources.length === 0 ? (
        <div className={styles.emptyState}>
          No resources selected — showing insights for the full scope.
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Type</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className={styles.row}>
                <td className={styles.td}>
                  <span
                    className={styles.nameCell}
                    style={{ paddingLeft: `${row.depth * 16}px` }}
                  >
                    {row.expandable ? (
                      <button
                        type="button"
                        className={styles.chevronButton}
                        onClick={row.onToggle}
                        aria-label={row.expanded ? "Collapse" : "Expand"}
                        aria-expanded={row.expanded}
                      >
                        {row.expanded ? (
                          <ChevronDown12Regular />
                        ) : (
                          <ChevronRight12Regular />
                        )}
                      </button>
                    ) : (
                      <span className={styles.chevronSpacer} aria-hidden />
                    )}
                    <span className={styles.resourceIcon} aria-hidden>
                      {row.isGroup ? <FolderRegular /> : <CubeRegular />}
                    </span>
                    <Link href="#" className={styles.nameLink}>
                      {row.name}
                    </Link>
                  </span>
                </td>
                <td className={styles.td}>{row.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </aside>
  )
}
