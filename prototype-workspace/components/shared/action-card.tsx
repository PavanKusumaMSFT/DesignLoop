"use client";

import React from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Card,
  Subtitle2,
  Body1,
  Button,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ── Props ────────────────────────────────────────────────────────────────────

export interface ActionCardProps {
  /** Icon source — either an image path (string) or a Fluent icon component */
  icon: string | React.ComponentType<{ className?: string }>;
  /** Card title */
  title: string;
  /** Card description — string text or custom ReactNode (e.g. skeleton placeholders) */
  description: React.ReactNode;
  /** Optional button label at the bottom of the card */
  buttonText?: string;
  /** Click handler — applied to the whole card and/or the button */
  onClick?: () => void;
  /** Whether to wrap the icon in a colored background container.
   * Default: false — most `/icons/*.svg` files already include a 36×36 brand background.
   * Set true only for Fluent icon components or raw SVGs without embedded backgrounds. */
  iconBackground?: boolean;
  /** Override border radius — accepts a Fluent token or CSS value.
   * Default: `borderRadius2XLarge` (12px). */
  borderRadius?: string;
  /** Rest-state shadow. Default: `shadow4`. */
  shadow?: string;
  /** Hover-state shadow. Default: `shadow8`. */
  hoverShadow?: string;
  /** className override for the title (Subtitle2). Use makeStyles to change font size, weight, color. */
  titleClassName?: string;
  /** className override for the description (Body1). Use makeStyles to change font size, weight, color. */
  descriptionClassName?: string;
  /** Additional className for the card root */
  className?: string;
}

export interface ActionCardGridProps {
  children: React.ReactNode;
  /** Number of columns (default: 4) */
  columns?: 2 | 3 | 4;
  className?: string;
}

// ── Styles ───────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: tokens.spacingHorizontalL,
    marginBottom: "48px",
    "@media (max-width: 1200px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  grid3: {
    gridTemplateColumns: "repeat(3, 1fr)",
    "@media (max-width: 900px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
  grid2: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  // Fluent Card overrides to match Figma spec (shadow4 rest, shadow8 hover)
  card: {
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    borderRadius: tokens.borderRadius2XLarge,
    transitionProperty: "box-shadow",
    transitionDuration: tokens.durationNormal,
    "&:hover": {
      boxShadow: tokens.shadow8,
    },
  },
  cardClickable: {
    cursor: "pointer",
  },
  cardDefault: {
    cursor: "default",
  },
  cardNoHover: {
    "&:hover": {
      boxShadow: "unset",
    },
  },

  // Figma: 36×36 brand-colored container, 8px radius, centered icon
  iconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  iconInContainer: {
    width: "24px",
    height: "24px",
    color: tokens.colorBrandForeground1,
  },

  // Plain image — icon SVGs that already include their own background
  iconImage: {
    width: "36px",
    height: "36px",
    flexShrink: 0,
  },

  textBlock: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    flex: "1",
  },
  description: {
    color: tokens.colorNeutralForeground1,
  },
  buttonPill: {
    alignSelf: "flex-start",
    borderRadius: "20px",
  },
});

// ── ActionCardGrid ───────────────────────────────────────────────────────────

/** Responsive CSS Grid wrapper for ActionCard children (4→2→1 columns).
 * Composed from: CSS Grid with responsive breakpoints.
 * Instead of: writing inline grid containers for each ActionCard layout. */
export function ActionCardGrid({
  children,
  columns = 4,
  className,
}: ActionCardGridProps) {
  const styles = useStyles();
  return (
    <div
      className={mergeClasses(
        styles.grid,
        columns === 3 && styles.grid3,
        columns === 2 && styles.grid2,
        className,
      )}
    >
      {children}
    </div>
  );
}

// ── ActionCard ───────────────────────────────────────────────────────────────

/**
 * Card with icon, title, description, and optional CTA button.
 * Built on Fluent v9 primitives: `Card`, `Subtitle2`, `Body1`, `Button`.
 *
 * **Figma spec:** Shadow 04 at rest, Shadow 08 on hover. Icons from `/icons/*.svg`
 * already include a 36×36 brand background — do NOT double-wrap them.
 * For Fluent icon components, set `iconBackground={true}` to add the container.
 * Title = Subtitle2 (16px/semibold). Body = Body1 (14px/regular).
 *
 * **When to use:** Any card that drives a single user action — FRE steps, homepage tiles,
 * feature discovery, onboarding prompts, getting-started guides, manage page quick actions.
 *
 * **Instead of:** building inline card JSX with `<div>` + icon + heading + paragraph + button.
 *
 * @see ActionCardGrid for responsive grid layout (4→2→1 columns)
 */
export default function ActionCard({
  icon,
  title,
  description,
  buttonText,
  onClick,
  iconBackground = false,
  borderRadius,
  shadow,
  hoverShadow,
  titleClassName,
  descriptionClassName,
  className,
}: ActionCardProps) {
  const styles = useStyles();
  const IconComponent = typeof icon !== "string" ? icon : null;

  // Build dynamic style overrides for border radius and shadows
  const dynamicStyle: React.CSSProperties = {};
  if (borderRadius) dynamicStyle.borderRadius = borderRadius;
  if (shadow) dynamicStyle.boxShadow = shadow;

  return (
    <Card
      className={mergeClasses(
        styles.card,
        hoverShadow ? styles.cardNoHover : undefined,
        onClick ? styles.cardClickable : styles.cardDefault,
        className,
      )}
      onClick={onClick || undefined}
      appearance="subtle"
      style={Object.keys(dynamicStyle).length > 0 ? dynamicStyle : undefined}
      onMouseEnter={
        hoverShadow
          ? (e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = hoverShadow;
            }
          : undefined
      }
      onMouseLeave={
        hoverShadow
          ? (e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                shadow || tokens.shadow4;
            }
          : undefined
      }
    >
      {/* Icon — Figma: 36×36 brand container with 24×24 icon */}
      {typeof icon === "string" ? (
        iconBackground ? (
          <div className={styles.iconContainer}>
            <img src={icon} alt="" className={styles.iconInContainer} />
          </div>
        ) : (
          <img src={icon} alt="" className={styles.iconImage} />
        )
      ) : (
        <div className={styles.iconContainer}>
          {IconComponent && (
            <IconComponent className={styles.iconInContainer} />
          )}
        </div>
      )}

      {/* Text block — Figma: 12px gap between icon and text, 8px between title/body */}
      <div className={styles.textBlock}>
        <Subtitle2 className={titleClassName}>{title}</Subtitle2>
        <Body1
          className={mergeClasses(styles.description, descriptionClassName)}
        >
          {description}
        </Body1>
      </div>

      {/* Optional CTA button */}
      {buttonText && (
        <Button
          appearance="secondary"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          className={styles.buttonPill}
        >
          {buttonText}
        </Button>
      )}
    </Card>
  );
}
