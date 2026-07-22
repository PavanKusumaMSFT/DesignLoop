"use client"

import * as React from "react"
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  Link,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Skeleton,
  SkeletonItem,
} from "@fluentui/react-components"
import {
  Lightbulb16Regular,
  ChevronDown20Regular,
} from "@fluentui/react-icons"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadius2XLarge,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    width: "100%",
  },
  header: {
    padding: `12px 16px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flex: "0 0 auto",
  },
  title: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  seeAll: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    flexShrink: 0,
    marginLeft: tokens.spacingHorizontalS,
    ":hover": { textDecoration: "underline" },
  },
  body: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
  },
  recommendation: {
    flex: "0 0 auto",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: `8px 16px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: "37px",
    boxSizing: "border-box",
    width: "100%",
    background: "transparent",
    border: "none",
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    borderTopColor: tokens.colorNeutralStroke2,
    cursor: "pointer",
    textAlign: "left",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  recLeft: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: tokens.colorNeutralForeground3,
  },
  recLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  recChevron: {
    color: tokens.colorNeutralForeground2,
    display: "flex",
    alignItems: "center",
  },
  skeletonBody: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL} ${tokens.spacingVerticalL}`,
  },
  skeletonItem: {
    borderRadius: tokens.borderRadiusXLarge,
  },
})

export interface RecommendationItem {
  key: string
  icon?: React.ReactNode
  label: React.ReactNode
  onClick?: () => void
}

export interface InsightsCardProps {
  title: string
  seeAllLabel?: string
  seeAllHref?: string
  onSeeAll?: () => void
  /** When provided, renders the recommendation footer as a menu trigger. Each
   * item becomes a MenuItem. */
  recommendations?: RecommendationItem[]
  className?: string
  bodyClassName?: string
  /** When true, replaces card body with two Fluent skeleton rectangles. */
  isLoading?: boolean
  children: React.ReactNode
}

/** Shared card shell used by the Resource Manager MVP "Get insights" blade.
 * Renders the title + "See all" action, a body slot, and an optional
 * recommendation footer that opens a menu listing each recommendation. */
export default function InsightsCard({
  title,
  seeAllLabel = "See all",
  seeAllHref,
  onSeeAll,
  recommendations,
  className,
  bodyClassName,
  isLoading,
  children,
}: InsightsCardProps) {
  const styles = useStyles()
  const hasRecs = !isLoading && !!recommendations && recommendations.length > 0

  return (
    <div className={mergeClasses(styles.card, className)}>
      <div className={styles.header}>
        <Text className={styles.title}>{title}</Text>
        {(seeAllHref || onSeeAll) && (
          <Link
            as="a"
            href={seeAllHref ?? "#"}
            onClick={(e) => {
              if (!seeAllHref) e.preventDefault()
              onSeeAll?.()
            }}
            className={styles.seeAll}
          >
            {seeAllLabel}
          </Link>
        )}
      </div>

      <div className={mergeClasses(styles.body, bodyClassName)}>
        {isLoading ? (
          <div className={styles.skeletonBody}>
            <Skeleton>
              <SkeletonItem size={96} className={styles.skeletonItem} />
            </Skeleton>
            <Skeleton>
              <SkeletonItem size={96} className={styles.skeletonItem} />
            </Skeleton>
          </div>
        ) : (
          children
        )}
      </div>

      {hasRecs && (
        <Menu positioning={{ position: "below", align: "end" }}>
          <MenuTrigger disableButtonEnhancement>
            <button type="button" className={styles.recommendation}>
              <span className={styles.recLeft}>
                <Lightbulb16Regular />
                <Text className={styles.recLabel}>Recommendation</Text>
              </span>
              <span className={styles.recChevron} aria-hidden>
                <ChevronDown20Regular />
              </span>
            </button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {recommendations!.map((rec) => (
                <MenuItem
                  key={rec.key}
                  icon={rec.icon as React.ReactElement | undefined}
                  onClick={rec.onClick}
                >
                  {rec.label}
                </MenuItem>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      )}
    </div>
  )
}
