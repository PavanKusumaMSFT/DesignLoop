"use client"

import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  Button,
  Link as FluentLink,
  Tag,
  TagGroup,
  Card,
} from "@fluentui/react-components"
import { ArrowRight16Regular } from "@fluentui/react-icons"
import type { ReactNode } from "react"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

export interface EngopsHeroQuickStart {
  eyebrow: string
  title: string
  description: string
  linkLabel: string
  onClick?: () => void
}

export interface EngopsHeroStat {
  label: string
  value: string | number
  caption: string
  /** Accent color rendered as a left bar on the stat card. */
  accent: "red" | "yellow" | "green" | "brand"
}

export interface EngopsHeroActivatedState {
  /** Selected scope entries (subscription / resource group names) shown as chips. */
  scopeChips: string[]
  /** Handler for the "Change" link next to scope chips. */
  onChangeScope?: () => void
  /** Stat cards shown on the right side in place of quick-start cards. */
  stats: EngopsHeroStat[]
}

export interface EngopsHeroCardProps {
  /** Title shown next to the icon (e.g. "EngOps Agent"). */
  title: string
  /** Tagline under the title (e.g. "From knowing to doing — in one place"). */
  tagline: string
  /** Longer paragraph under the tagline. */
  description: string
  /** Primary CTA label (e.g. "Launch EngOps Agent"). */
  ctaLabel: string
  onCtaClick?: () => void
  /** Quick-start entry points shown on the right side of the hero when not activated. */
  quickStarts?: EngopsHeroQuickStart[]
  /** When provided, the card switches into "activated" mode: scope chips + stat cards replace the quick-start cards. */
  activatedState?: EngopsHeroActivatedState
  /** Optional icon override (defaults to a star). */
  icon?: ReactNode
  /** Force the hero into a stacked/compact layout (use when the container is narrow, e.g. the docked panel is expanded). */
  compact?: boolean
}

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, 1fr)",
    gap: tokens.spacingHorizontalXXL,
    alignItems: "stretch",
    padding: tokens.spacingHorizontalXL,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorBrandStroke2 ?? tokens.colorNeutralStroke2}`,
    backgroundImage: `linear-gradient(135deg, ${
      tokens.colorBrandBackground2 ?? tokens.colorNeutralBackground2
    } 0%, ${tokens.colorNeutralBackground1} 70%)`,
    "@media (max-width: 1100px)": {
      gridTemplateColumns: "1fr",
      gap: tokens.spacingVerticalL,
    },
  },
  rootActivated: {
    gridTemplateColumns: "minmax(0, 2fr) minmax(180px, 220px) minmax(180px, 220px)",
    alignItems: "center",
    borderTopColor: tokens.colorBrandStroke1,
    borderRightColor: tokens.colorBrandStroke1,
    borderBottomColor: tokens.colorBrandStroke1,
    borderLeftColor: tokens.colorBrandStroke1,
    "@media (max-width: 1100px)": {
      gridTemplateColumns: "1fr",
    },
  },
  rootCompact: {
    gridTemplateColumns: "1fr",
    gap: tokens.spacingVerticalL,
  },
  rootCompactActivated: {
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalL,
    "& > :first-child": {
      gridColumn: "1 / -1",
    },
  },

  // Left: branded intro
  intro: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minWidth: 0,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  iconTile: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    flexShrink: 0,
  },
  iconTileImg: {
    width: "32px",
    height: "32px",
  },
  titleCol: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  title: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase500,
  },
  tagline: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  description: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase400,
  },
  ctaRow: {
    display: "flex",
    marginTop: "auto",
  },

  // Scope row (activated state)
  scopeRow: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalXS,
    minWidth: 0,
  },
  scopeLabel: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    flexShrink: 0,
  },
  scopeChips: {
    flex: "1 1 auto",
    minWidth: 0,
    // Fluent TagGroup defaults to a single nowrap row; force its inner list
    // to wrap so long scope selections don't overflow into the stat cards.
    "& > *": {
      flexWrap: "wrap",
      rowGap: tokens.spacingVerticalXS,
    },
    "& [role='list']": {
      flexWrap: "wrap",
      rowGap: tokens.spacingVerticalXS,
    },
  },
  scopeChip: {
    fontFamily: tokens.fontFamilyMonospace,
    maxWidth: "220px",
  },
  scopeChangeLink: {
    flexShrink: 0,
  },

  // Right: quick-start cards
  quickCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    minWidth: 0,
  },
  eyebrow: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  quickTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase400,
  },
  quickDescription: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
    flex: 1,
  },
  quickLinkRow: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },

  // Stat cards (activated state) — use Fluent Card for surface + elevation
  statCard: {
    position: "relative",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    paddingLeft: tokens.spacingHorizontalL,
    minWidth: 0,
    overflow: "hidden",
  },
  statLabel: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  statValue: {
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightHero700,
  },
  statCaption: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  statAccentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "4px",
  },
  statAccentBarRed: { backgroundColor: tokens.colorPaletteRedBackground3 },
  statAccentBarYellow: { backgroundColor: tokens.colorPaletteYellowBackground3 },
  statAccentBarGreen: { backgroundColor: tokens.colorPaletteGreenBackground3 },
  statAccentBarBrand: { backgroundColor: tokens.colorBrandBackground },
})

/** Hero card announcing an agent/experience with a primary CTA and up to N quick-start entry points, or a scope+stats activated state once the agent has run. */
export default function EngopsHeroCard({
  title,
  tagline,
  description,
  ctaLabel,
  onCtaClick,
  quickStarts = [],
  activatedState,
  icon,
  compact = false,
}: EngopsHeroCardProps) {
  const styles = useStyles()

  const activated = Boolean(activatedState)
  const accentBarClass: Record<EngopsHeroStat["accent"], string> = {
    red: styles.statAccentBarRed,
    yellow: styles.statAccentBarYellow,
    green: styles.statAccentBarGreen,
    brand: styles.statAccentBarBrand,
  }

  return (
    <section
      className={mergeClasses(
        styles.root,
        activated && styles.rootActivated,
        compact && styles.rootCompact,
        compact && activated && styles.rootCompactActivated,
      )}
    >
      <div className={styles.intro}>
        <div className={styles.titleRow}>
          <span className={styles.iconTile} aria-hidden>
            {icon ?? (
              <img
                src="/icons/AgentsColor.svg"
                alt=""
                className={styles.iconTileImg}
              />
            )}
          </span>
          <div className={styles.titleCol}>
            <Text className={styles.title}>{title}</Text>
            <Text className={styles.tagline}>{tagline}</Text>
          </div>
        </div>
        <Text className={styles.description}>{description}</Text>
        {activatedState && activatedState.scopeChips.length > 0 && (
          <div className={styles.scopeRow}>
            <Text className={styles.scopeLabel}>Scope</Text>
            <div className={styles.scopeChips}>
              <TagGroup aria-label="Selected scope">
                {activatedState.scopeChips.map((chip) => (
                  <Tag
                    key={chip}
                    size="small"
                    shape="rounded"
                    appearance="outline"
                    className={styles.scopeChip}
                  >
                    {chip}
                  </Tag>
                ))}
              </TagGroup>
            </div>
            {activatedState.onChangeScope && (
              <FluentLink
                as="button"
                onClick={activatedState.onChangeScope}
                className={styles.scopeChangeLink}
              >
                Change
              </FluentLink>
            )}
          </div>
        )}
        <div className={styles.ctaRow}>
          <Button
            appearance="primary"
            onClick={onCtaClick}
            icon={<ArrowRight16Regular />}
            iconPosition="after"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>

      {activatedState
        ? activatedState.stats.map((s) => (
            <Card key={s.label} className={styles.statCard} appearance="filled">
              <span
                className={`${styles.statAccentBar} ${accentBarClass[s.accent]}`}
                aria-hidden
              />
              <Text className={styles.statLabel}>{s.label}</Text>
              <Text className={styles.statValue}>{s.value}</Text>
              <Text className={styles.statCaption}>{s.caption}</Text>
            </Card>
          ))
        : quickStarts.map((q) => (
            <div key={q.eyebrow} className={styles.quickCard}>
              <Text className={styles.eyebrow}>{q.eyebrow}</Text>
              <Text className={styles.quickTitle}>{q.title}</Text>
              <Text className={styles.quickDescription}>{q.description}</Text>
              <FluentLink
                as="button"
                onClick={q.onClick}
                className={styles.quickLinkRow}
              >
                {q.linkLabel} <ArrowRight16Regular />
              </FluentLink>
            </div>
          ))}
    </section>
  )
}

