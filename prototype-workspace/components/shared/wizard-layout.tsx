/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
} from "@fluentui/react-components";
import { ReactNode } from "react";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WizardLayoutProps {
  /** Step navigation sidebar content (left column, ~180px) */
  stepNav: ReactNode;
  /** Main form content (center column, flex 1) */
  children: ReactNode;
  /** Right panel content — typically WizardCostPanel (right column, ~280px). Pass `null` for 2-column layout. */
  rightPanel?: ReactNode;
  /** Max width for the layout container (default: "1400px") */
  maxWidth?: string;
  /** Whether a custom header sits above the layout (affects sticky top offset) */
  hasCustomHeader?: boolean;
  /** Optional className for the root container */
  className?: string;
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "180px minmax(0, 1fr)",
    alignItems: "start",
    flex: 1,
    maxWidth: "1400px",
    width: "100%",
    margin: "0 auto",
    gap: tokens.spacingHorizontalXXL,
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL} 80px ${tokens.spacingHorizontalXXL}`,
  },
  leftSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    gridColumn: "1",
  },
  leftStickyWithHeader: {
    position: "sticky",
    top: "72px",
    alignSelf: "flex-start",
  },
  leftStickyNoHeader: {
    position: "sticky",
    top: "24px",
    alignSelf: "flex-start",
  },
  contentPanelsWithRight: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 280px",
    gap: tokens.spacingHorizontalXXL,
    alignItems: "start",
    width: "100%",
    minWidth: 0,
    gridColumn: "2",
  },
  contentPanelsNoRight: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: 0,
    gridColumn: "2",
  },
  contentColumn: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
    minWidth: 0,
  },
});

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/** 3-column wizard layout shell: step sidebar | form content | optional right panel. */
export default function WizardLayout({
  stepNav,
  children,
  rightPanel,
  maxWidth = "1400px",
  hasCustomHeader = true,
  className,
}: WizardLayoutProps) {
  const styles = useStyles();

  return (
    <div
      className={mergeClasses(styles.root, className)}
      style={{ maxWidth }}
    >
      {/* Left: step navigation */}
      <div
        className={mergeClasses(
          styles.leftSection,
          hasCustomHeader
            ? styles.leftStickyWithHeader
            : styles.leftStickyNoHeader,
        )}
      >
        {stepNav}
      </div>

      {/* Center + Right */}
      <div
        className={
          rightPanel
            ? styles.contentPanelsWithRight
            : styles.contentPanelsNoRight
        }
      >
        <div className={styles.contentColumn}>{children}</div>
        {rightPanel}
      </div>
    </div>
  );
}
