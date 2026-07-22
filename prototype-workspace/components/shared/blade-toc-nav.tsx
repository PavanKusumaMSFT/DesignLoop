/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { useState, useMemo, ReactNode } from "react";
import {
  makeStyles,
  shorthands,
  mergeClasses,
  tokens as fluentTokens,
  Input,
  Button,
} from "@fluentui/react-components";
import {
  Search16Regular,
  ChevronDown12Regular,
  ChevronRight12Regular,
  ChevronDoubleLeft16Regular,
  ChevronDoubleRight16Regular,
  ChevronUpDown16Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface TocItem {
  /** Unique identifier for the item */
  id: string;
  /** Display label */
  label: string;
  /** Optional icon rendered before the label */
  icon?: ReactNode;
  /** Child items — when present, this item becomes a collapsible group header */
  children?: { id: string; label: string }[];
}

export interface BladeTocNavProps {
  /** Ordered list of nav items / groups */
  items: TocItem[];
  /** Currently active item id */
  activeItem: string;
  /** Called when an item is clicked */
  onItemClick: (id: string) => void;
  /** Show search input at the top (default: true) */
  showSearch?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Nav width in px (default: 264) */
  width?: number;
  /** IDs of groups that should be expanded on mount */
  defaultExpandedGroups?: string[];
  /** Optional className for root container */
  className?: string;
  /**
   * PR9 reflow — opt into collapse-to-rail behavior. When `true`, the component
   * renders an expand/collapse toggle in its header and supports a 24px-wide
   * "rail" mode containing only an expand chevron. Default `false` preserves
   * the original always-expanded behavior for v1/v2/v3 consumers.
   */
  collapsible?: boolean;
  /** Controlled collapsed state (only meaningful when `collapsible` is true). */
  collapsed?: boolean;
  /** Called when the user clicks the collapse/expand chevron. */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Width of the collapsed rail in px (default: 32, per Figma spec). */
  collapsedWidth?: number;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground1,
    overflowY: "auto",
    // PR9 reflow — smooth width transition between rail (24px) and expanded
    // (default 264px) when consumers toggle collapsed state.
    transitionProperty: "width, min-width",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
  },
  // PR9 reflow — collapsed rail: shows only the expand chevron at the top.
  rail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: tokens.spacingVerticalS,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  // PR9 reflow — collapse/expand chevron buttons. 24x24 to match search
  // header sibling buttons.
  toggleButton: {
    minWidth: "24px",
    width: "24px",
    height: "24px",
    paddingLeft: "0",
    paddingRight: "0",
  },
  search: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    marginBottom: "0px",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalM,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    borderRadius: tokens.borderRadiusSmall,
  },
  searchButton: {
    minWidth: "24px",
    width: "24px",
    height: "24px",
    paddingLeft: "0",
    paddingRight: "0",
  },
  navList: {
    display: "flex",
    flexDirection: "column",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    paddingTop: "7px",
    paddingBottom: "7px",
    paddingLeft: tokens.spacingHorizontalXL,
    paddingRight: tokens.spacingHorizontalXL,
    cursor: "pointer",
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border("0", "none"),
    ...shorthands.borderLeft("2px", "solid", "transparent"),
    borderRadius: "0",
    textAlign: "left" as const,
    width: "100%",
    fontFamily: "inherit",
    maxHeight: "50px",
    overflowX: "hidden" as const,
    overflowY: "hidden" as const,
    textOverflow: "ellipsis",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  navItemActive: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderLeftColor: "#0078D4",
  },
  groupHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    paddingTop: "7px",
    paddingBottom: "7px",
    paddingLeft: "22px",
    paddingRight: tokens.spacingHorizontalXL,
    cursor: "pointer",
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border("0", "none"),
    ...shorthands.borderLeft("2px", "solid", "transparent"),
    textAlign: "left" as const,
    width: "100%",
    fontFamily: "inherit",
    maxHeight: "50px",
    overflowX: "hidden" as const,
    overflowY: "hidden" as const,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  chevron: {
    marginLeft: "auto",
    flexShrink: 0,
  },
  childItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    paddingTop: "7px",
    paddingBottom: "7px",
    paddingLeft: "46px",
    paddingRight: tokens.spacingHorizontalXL,
    cursor: "pointer",
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.border("0", "none"),
    ...shorthands.borderLeft("2px", "solid", "transparent"),
    textAlign: "left" as const,
    width: "100%",
    fontFamily: "inherit",
    maxHeight: "50px",
    overflowX: "hidden" as const,
    overflowY: "hidden" as const,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
});

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/** Shared left sidebar TOC navigation for Azure blade pages. Supports flat items and collapsible groups with children. */
export default function BladeTocNav({
  items,
  activeItem,
  onItemClick,
  showSearch = true,
  searchPlaceholder = "Search",
  width = 264,
  defaultExpandedGroups,
  className,
  collapsible = false,
  collapsed = false,
  onCollapsedChange,
  collapsedWidth = 32,
}: BladeTocNavProps) {
  const styles = useStyles();
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => new Set(defaultExpandedGroups ?? [])
  );
  const [searchQuery, setSearchQuery] = useState("");

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items
      .map((item) => {
        if (item.label.toLowerCase().includes(q)) return item;
        if (item.children) {
          const filtered = item.children.filter((c) =>
            c.label.toLowerCase().includes(q)
          );
          if (filtered.length > 0) return { ...item, children: filtered };
        }
        return null;
      })
      .filter(Boolean) as TocItem[];
  }, [items, searchQuery]);

  // PR9 reflow — collapsed rail render. Per production behavior the rail is
  // a thin column containing only an expand chevron; no item icons, no labels.
  if (collapsible && collapsed) {
    return (
      <nav
        className={mergeClasses(styles.root, styles.rail, className)}
        style={{ width: `${collapsedWidth}px`, minWidth: `${collapsedWidth}px` }}
        aria-label="Service menu (collapsed)"
      >
        <Button
          className={styles.toggleButton}
          appearance="subtle"
          icon={<ChevronDoubleRight16Regular />}
          onClick={() => onCollapsedChange?.(false)}
          aria-label="Expand service menu"
          aria-expanded="false"
        />
      </nav>
    );
  }

  return (
    <nav
      className={mergeClasses(styles.root, className)}
      style={{ width: `${width}px`, minWidth: `${width}px` }}
    >
      {showSearch && (
        <div className={styles.search}>
          <Input
            className={styles.searchInput}
            size="small"
            placeholder={searchPlaceholder}
            contentBefore={<Search16Regular />}
            value={searchQuery}
            onChange={(_, data) => setSearchQuery(data.value)}
          />
          {/* PR9 reflow — expand-all chevron pair (decorative only per spec) */}
          {collapsible && (
            <Button
              className={styles.toggleButton}
              appearance="subtle"
              icon={<ChevronUpDown16Regular />}
              aria-label="Expand or collapse all groups"
              disabled
            />
          )}
          {/* PR9 reflow — collapse-to-rail toggle */}
          {collapsible && (
            <Button
              className={styles.toggleButton}
              appearance="subtle"
              icon={<ChevronDoubleLeft16Regular />}
              onClick={() => onCollapsedChange?.(true)}
              aria-label="Collapse service menu"
              aria-expanded="true"
            />
          )}
        </div>
      )}
      <div className={styles.navList}>
        {filteredItems.map((item) => {
          if (!item.children) {
            // Flat nav item (no children)
            return (
              <button
                key={item.id}
                className={mergeClasses(
                  styles.navItem,
                  item.id === activeItem && styles.navItemActive
                )}
                onClick={() => onItemClick(item.id)}
              >
                {item.icon}
                {item.label}
              </button>
            );
          }

          // Collapsible group
          const isExpanded = expandedGroups.has(item.id);
          return (
            <div key={item.id}>
              <button
                className={mergeClasses(
                  styles.groupHeader,
                  item.id === activeItem && styles.navItemActive
                )}
                onClick={() => {
                  toggleGroup(item.id);
                  onItemClick(item.id);
                }}
              >
                {item.icon}
                {item.label}
                <span className={styles.chevron}>
                  {isExpanded ? (
                    <ChevronDown12Regular />
                  ) : (
                    <ChevronRight12Regular />
                  )}
                </span>
              </button>
              {isExpanded &&
                item.children.map((child) => (
                  <button
                    key={child.id}
                    className={mergeClasses(
                      styles.childItem,
                      child.id === activeItem && styles.navItemActive
                    )}
                    onClick={() => onItemClick(child.id)}
                  >
                    {child.label}
                  </button>
                ))}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
