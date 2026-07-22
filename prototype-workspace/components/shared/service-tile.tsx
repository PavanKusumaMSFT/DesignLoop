"use client";

import React from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ── Types ────────────────────────────────────────────────────────────────────

export interface ServiceTileData {
  /** Service name */
  name: string;
  /** Service description */
  description: string;
  /** Icon source — image path or Fluent icon component */
  icon: string | React.ComponentType<{ className?: string }>;
  /** Whether the service is free tier eligible */
  free?: boolean;
  /** Optional badge text (overrides "Free" badge if provided) */
  badge?: string;
  /** Click handler */
  onClick?: () => void;
}

export interface ServiceTileProps extends ServiceTileData {
  className?: string;
}

export interface ServiceTileGridProps {
  children: React.ReactNode;
  /** Number of columns (default: 3) */
  columns?: 2 | 3 | 4;
  className?: string;
}

// ── Styles ───────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalL,
    marginBottom: "32px",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width: 600px)": {
      gridTemplateColumns: "1fr",
    },
  },
  grid2: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  grid4: {
    gridTemplateColumns: "repeat(4, 1fr)",
    "@media (max-width: 1200px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },

  tile: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow4,
    },
  },
  tileNoClick: {
    cursor: "default",
    "&:hover": {
      boxShadow: "none",
    },
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  iconImage: {
    width: "24px",
    height: "24px",
    flexShrink: 0,
  },
  iconComponent: {
    width: "24px",
    height: "24px",
    color: tokens.colorBrandForeground1,
    flexShrink: 0,
  },
  name: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  badge: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    padding: "2px 8px",
    borderRadius: "4px",
    backgroundColor: tokens.colorStatusSuccessBackground1,
    color: tokens.colorPaletteGreenForeground1,
    border: `1px solid ${tokens.colorPaletteGreenForeground1}`,
    flexShrink: 0,
  },
  description: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: "20px",
  },
});

// ── ServiceTileGrid ──────────────────────────────────────────────────────────

/** Responsive CSS Grid wrapper for ServiceTile components (default 3 → 2 → 1 columns at breakpoints).
 * Composed from: makeStyles grid with configurable column count. */
export function ServiceTileGrid({
  children,
  columns = 3,
  className,
}: ServiceTileGridProps) {
  const styles = useStyles();
  return (
    <div
      className={mergeClasses(
        styles.grid,
        columns === 2 && styles.grid2,
        columns === 4 && styles.grid4,
        className,
      )}
    >
      {children}
    </div>
  );
}

// ── ServiceTile ──────────────────────────────────────────────────────────────

/**
 * Azure service selection tile with icon, name, description, and optional "Free" badge.
 *
 * **When to use:** Any UI where users browse or select Azure services — service catalogs,
 * FRE pickers, "All services" grids, create flows, marketplace listings.
 * Format-agnostic: works on any page type. Composes Fluent `Card`, `Text`, `Badge`,
 * and an image element.
 *
 * **Instead of:** building inline service cards with `<div>` + `<img>` + name + description.
 *
 * @see ServiceTileGrid for responsive grid layout (3→2→1 columns)
 * @see ServiceTileData for the data shape to pass service info
 */
export default function ServiceTile({
  name,
  description,
  icon,
  free,
  badge,
  onClick,
  className,
}: ServiceTileProps) {
  const styles = useStyles();
  const IconComponent = typeof icon !== "string" ? icon : null;
  const badgeText = badge ?? (free ? "Free" : undefined);

  return (
    <div
      className={mergeClasses(
        styles.tile,
        !onClick && styles.tileNoClick,
        className,
      )}
      onClick={onClick}
    >
      <div className={styles.header}>
        <div className={styles.titleRow}>
          {typeof icon === "string" ? (
            <img src={icon} alt={name} className={styles.iconImage} />
          ) : (
            IconComponent && <IconComponent className={styles.iconComponent} />
          )}
          <div className={styles.name}>{name}</div>
        </div>
        {badgeText && <div className={styles.badge}>{badgeText}</div>}
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
