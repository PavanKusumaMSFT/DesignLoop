/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { ReactNode } from "react";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Menu,
  MenuTrigger,
  MenuPopover,
} from "@fluentui/react-components";
import { ChevronDown12Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface CommandBarItem {
  /** Unique key */
  key: string;
  /** Button label */
  label: string;
  /** Fluent icon element */
  icon?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Render a vertical line divider BEFORE this item */
  dividerBefore?: boolean;
  /** Optional dropdown menu content (e.g. a `<MenuList>`). When provided, the button becomes a menu trigger with a chevron-down indicator and `onClick` is ignored. */
  menu?: ReactNode;
}

export interface BladeCommandBarProps {
  /** Ordered list of command bar buttons */
  items: CommandBarItem[];
  /** Optional className for root container */
  className?: string;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorNeutralStroke2,
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    paddingTop: "10px",
    paddingBottom: "10px",
    paddingLeft: "8px",
    paddingRight: "8px",
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    border: "none",
    fontFamily: "inherit",
    fontSize: "12px",
    lineHeight: "16px",
    color: tokens.colorNeutralForeground1,
    whiteSpace: "nowrap" as const,
    flexShrink: 0,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  itemDisabled: {
    opacity: 0.5,
    cursor: "default",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1,
    },
  },
  itemIcon: {
    width: "16px",
    height: "16px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  caret: {
    width: "12px",
    height: "12px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForeground2,
  },
  divider: {
    display: "flex",
    alignItems: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
    flexShrink: 0,
  },
  dividerLine: {
    width: "1px",
    height: "16px",
    backgroundColor: tokens.colorNeutralStroke2,
  },
});

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/** Shared command bar / toolbar for Azure blade pages. Renders items left-aligned with optional vertical line dividers. */
export default function BladeCommandBar({
  items,
  className,
}: BladeCommandBarProps) {
  const styles = useStyles();

  return (
    <div className={mergeClasses(styles.root, className)}>
      {items.map((item) => {
        const button = (
          <button
            className={mergeClasses(
              styles.item,
              item.disabled && styles.itemDisabled
            )}
            disabled={item.disabled}
            onClick={item.menu ? undefined : item.onClick}
          >
            {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
            {item.label && <span>{item.label}</span>}
            {item.menu && (
              <span className={styles.caret}>
                <ChevronDown12Regular />
              </span>
            )}
          </button>
        );
        return (
          <span key={item.key} style={{ display: "contents" }}>
            {item.dividerBefore && (
              <span className={styles.divider}>
                <span className={styles.dividerLine} />
              </span>
            )}
            {item.menu ? (
              <Menu>
                <MenuTrigger disableButtonEnhancement>{button}</MenuTrigger>
                <MenuPopover>{item.menu}</MenuPopover>
              </Menu>
            ) : (
              button
            )}
          </span>
        );
      })}
    </div>
  );
}
