"use client"

import { makeStyles, shorthands, tokens as fluentTokens, Input, mergeClasses } from "@fluentui/react-components"
import { Search16Regular } from "@fluentui/react-icons"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

export type CarbonView = "trends" | "details" | "reductions"

interface CarbonNavProps {
  activeView: CarbonView
  onViewChange: (view: CarbonView) => void
}

const navItems: { id: CarbonView; label: string }[] = [
  { id: "trends", label: "Emission Trends" },
  { id: "details", label: "Emission Details" },
  { id: "reductions", label: "Emission Reductions" },
]

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "200px",
    minWidth: "200px",
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: tokens.colorNeutralStroke2,
    backgroundColor: tokens.colorNeutralBackground1,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
  },
  search: {
    marginBottom: tokens.spacingVerticalS,
  },
  navList: {
    display: "flex",
    flexDirection: "column",
    gap: "0px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    cursor: "pointer",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    backgroundColor: "transparent",
    ...shorthands.border("0", "none"),
    ...shorthands.borderLeft("3px", "solid", "transparent"),
    borderRadius: tokens.borderRadiusMedium,
    textAlign: "left",
    width: "100%",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  navItemActive: {
    fontWeight: tokens.fontWeightSemibold,
    backgroundColor: tokens.colorNeutralBackground1Selected,
    borderLeftColor: tokens.colorBrandStroke1,
  },
})

/** Left sidebar navigation for Carbon Optimization views. */
export default function CarbonNav({ activeView, onViewChange }: CarbonNavProps) {
  const styles = useStyles()

  return (
    <nav className={styles.root}>
      <Input
        className={styles.search}
        size="small"
        placeholder="Search"
        contentBefore={<Search16Regular />}
      />
      <div className={styles.navList}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={mergeClasses(styles.navItem, item.id === activeView && styles.navItemActive)}
            onClick={() => onViewChange(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
