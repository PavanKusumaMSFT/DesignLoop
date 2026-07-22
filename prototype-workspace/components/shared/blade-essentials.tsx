"use client"

import { type ReactNode, useState } from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  mergeClasses,
} from "@fluentui/react-components"
import { ChevronDown16Regular, ChevronRight16Regular } from "@fluentui/react-icons"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

export interface EssentialsField {
  label: string
  value: ReactNode
}

export interface BladeEssentialsProps {
  /** Field rows. Distributed left-to-right across the configured number of columns. */
  fields: EssentialsField[]
  /** Whether the section starts expanded. Defaults to true. */
  defaultOpen?: boolean
  /** Number of columns. Defaults to 2 to match the Azure portal Essentials control. */
  columns?: 1 | 2 | 3
  /** Header label. Defaults to "Essentials". */
  title?: string
  /** Optional className override for the outer container. */
  className?: string
}

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: tokens.colorNeutralStroke2,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorNeutralStroke2,
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    width: "100%",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    cursor: "pointer",
    fontFamily: "inherit",
    color: tokens.colorNeutralForeground1,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  headerLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  body: {
    display: "grid",
    columnGap: tokens.spacingHorizontalXXL,
    rowGap: tokens.spacingVerticalXS,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalM,
  },
  bodyCols1: {
    gridTemplateColumns: "1fr",
  },
  bodyCols2: {
    gridTemplateColumns: "1fr 1fr",
  },
  bodyCols3: {
    gridTemplateColumns: "1fr 1fr 1fr",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "minmax(140px, max-content) auto 1fr",
    columnGap: tokens.spacingHorizontalS,
    alignItems: "baseline",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    paddingTop: "2px",
    paddingBottom: "2px",
  },
  label: {
    color: tokens.colorNeutralForeground2,
  },
  separator: {
    color: tokens.colorNeutralForeground3,
  },
  value: {
    color: tokens.colorNeutralForeground1,
    minWidth: 0,
    wordBreak: "break-word",
  },
})

/**
 * Azure portal Essentials control. A collapsible header followed by a multi-column grid of
 * label/value rows. Mirrors the Essentials section that sits at the top of every resource blade
 * (Cost Management Exports, Resource Manager, etc.). Pass any fields you want as `EssentialsField`
 * objects; the component splits them across `columns` left-to-right.
 */
export default function BladeEssentials({
  fields,
  defaultOpen = true,
  columns = 2,
  title = "Essentials",
  className,
}: BladeEssentialsProps) {
  const styles = useStyles()
  const [open, setOpen] = useState(defaultOpen)

  const colsClass =
    columns === 1 ? styles.bodyCols1 : columns === 3 ? styles.bodyCols3 : styles.bodyCols2

  return (
    <div className={mergeClasses(styles.root, className)}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? <ChevronDown16Regular /> : <ChevronRight16Regular />}
        <Text className={styles.headerLabel}>{title}</Text>
      </button>
      {open && (
        <div className={mergeClasses(styles.body, colsClass)}>
          {fields.map((f, i) => (
            <div key={`${f.label}-${i}`} className={styles.row}>
              <span className={styles.label}>{f.label}</span>
              <span className={styles.separator}>:</span>
              <span className={styles.value}>{f.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
