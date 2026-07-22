"use client";

import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

export interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Click handler — omit for the current (last) item */
  onClick?: () => void;
}

export interface PageBreadcrumbProps {
  /** Ordered breadcrumb items. The last item is rendered as the current page (bold, not clickable). */
  items: BreadcrumbItem[];
  /** Hide the bottom border (default: false) */
  noBorder?: boolean;
  /** Optional className for the root container */
  className?: string;
  /**
   * Density of the horizontal padding. Defaults to `"default"` (24px / XXL on all
   * widths). When set to `"compact"`, horizontal padding tightens to M (12px)
   * below the Azure Portal Fluent 2 chrome breakpoint of 1048px — used by
   * reflow-aware page variants. Vertical padding and visual styling are unchanged.
   */
  density?: "default" | "compact";
}

const useStyles = makeStyles({
  section: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorNeutralStroke2,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  sectionNoBorder: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottomWidth: 0,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: "0px",
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  // PR8 reflow — compact density opt-in. Tightens only horizontal padding,
  // and only below the Azure Portal Fluent 2 chrome breakpoint (1048px). Layered
  // on top of `section` / `sectionNoBorder` via mergeClasses so default behavior
  // is preserved for v1/v2/v3 consumers that don't pass `density="compact"`.
  sectionCompact: {
    "@media (max-width: 1047px)": {
      paddingLeft: tokens.spacingHorizontalM,
      paddingRight: tokens.spacingHorizontalM,
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  item: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase200,
    textDecoration: "none",
    cursor: "pointer",
    backgroundColor: "transparent",
    borderTopStyle: "none",
    borderRightStyle: "none",
    borderBottomStyle: "none",
    borderLeftStyle: "none",
    paddingTop: "0",
    paddingBottom: "0",
    paddingLeft: "0",
    paddingRight: "0",
    fontFamily: "inherit",
    lineHeight: tokens.lineHeightBase200,
    ":hover": {
      color: tokens.colorBrandForeground1,
      textDecoration: "underline",
    },
  },
  separator: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  current: {
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase200,
  },
  itemGroup: {
    display: "contents",
  },
});

/** Shared breadcrumb navigation bar. Renders a horizontal trail with › separators. Last item is the current page. */
export default function PageBreadcrumb({ items, noBorder = false, className, density = "default" }: PageBreadcrumbProps) {
  const styles = useStyles();

  return (
    <nav
      aria-label="Breadcrumb"
      className={mergeClasses(
        noBorder ? styles.sectionNoBorder : styles.section,
        density === "compact" && styles.sectionCompact,
        className,
      )}
    >
      <div className={styles.container}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <span key={index} className={styles.itemGroup}>
              {index > 0 && (
                <span className={styles.separator} aria-hidden="true">
                  ›
                </span>
              )}
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  className={styles.item}
                  onClick={item.onClick}
                >
                  {item.label}
                </button>
              )}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
