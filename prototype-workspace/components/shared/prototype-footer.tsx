"use client"

import Link from "next/link"
import {
  makeStyles,
  tokens as fluentTokens,
  Dropdown,
  Option,
  Text,
} from "@fluentui/react-components"
import {
  ArrowLeft24Regular,
  WeatherSunny20Regular,
  WeatherMoon20Regular,
} from "@fluentui/react-icons"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

export interface ScenarioOption {
  id: string
  label: string
  /** Optional secondary line shown under the label in the dropdown menu. */
  description?: string
}

export interface PrototypeFooterProps {
  /** Where the "Back" button navigates to. */
  backHref: string
  /** Override the default "Back to Scenarios" label. */
  backLabel?: string
  /** Current theme — drives the icon shown on the toggle. */
  theme: "light" | "dark"
  /** Called when the theme toggle is clicked. */
  onThemeToggle: () => void
  /** When provided, renders a centered Dropdown for switching between explorations. */
  scenarios?: ScenarioOption[]
  /** Currently active scenario id (controlled). */
  activeScenarioId?: string
  /** Called with the new scenario id when the user picks a different option. */
  onScenarioChange?: (id: string) => void
  /** Optional label rendered before the dropdown (e.g. "Version", "Scenario"). */
  scenarioLabel?: string
}

/** Fixed black bar at the bottom of every prototype page. Hosts the "Back to Scenarios" link, an optional version/scenario dropdown, and the light/dark theme toggle. */
export default function PrototypeFooter({
  backHref,
  backLabel = "Back to Scenarios",
  theme,
  onThemeToggle,
  scenarios,
  activeScenarioId,
  onScenarioChange,
  scenarioLabel = "Version",
}: PrototypeFooterProps) {
  const styles = useStyles()
  const active = scenarios?.find((s) => s.id === activeScenarioId)

  return (
    <div className={styles.footer}>
      <Link href={backHref} className={styles.backButton}>
        <ArrowLeft24Regular />
        {backLabel}
      </Link>

      {scenarios && scenarios.length > 0 && (
        <div className={styles.scenarioSlot}>
          <Text className={styles.scenarioLabel}>{scenarioLabel}</Text>
          <Dropdown
            className={styles.dropdown}
            value={active?.label ?? ""}
            selectedOptions={activeScenarioId ? [activeScenarioId] : []}
            onOptionSelect={(_, data) => {
              if (data.optionValue) onScenarioChange?.(data.optionValue)
            }}
            size="small"
          >
            {scenarios.map((s) => {
              const isSelected = s.id === activeScenarioId
              return (
                <Option key={s.id} value={s.id} text={s.label} className={isSelected ? styles.optionSelected : undefined}>
                  <div className={styles.optionRow}>
                    <Text className={styles.optionLabel}>{s.label}</Text>
                    {s.description && (
                      <Text className={styles.optionDescription}>{s.description}</Text>
                    )}
                  </div>
                </Option>
              )
            })}
          </Dropdown>
        </div>
      )}

      <button onClick={onThemeToggle} className={styles.themeToggle}>
        {theme === "light" ? <WeatherMoon20Regular /> : <WeatherSunny20Regular />}
      </button>
    </div>
  )
}

const useStyles = makeStyles({
  footer: {
    position: "fixed",
    bottom: "0",
    left: "0",
    right: "0",
    backgroundColor: tokens.colorNeutralBackgroundInverted,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    zIndex: 2000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalL,
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    color: tokens.colorNeutralForegroundInverted,
    backgroundColor: "transparent",
    borderTop: `1px solid ${tokens.colorNeutralStrokeInvertedDisabled}`,
    borderRight: `1px solid ${tokens.colorNeutralStrokeInvertedDisabled}`,
    borderBottom: `1px solid ${tokens.colorNeutralStrokeInvertedDisabled}`,
    borderLeft: `1px solid ${tokens.colorNeutralStrokeInvertedDisabled}`,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium,
    textDecorationLine: "none",
    flexShrink: 0,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackgroundInvertedDisabled,
    },
  },
  scenarioSlot: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flex: 1,
    justifyContent: "center",
    minWidth: 0,
  },
  scenarioLabel: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForegroundInverted,
    whiteSpace: "nowrap",
  },
  dropdown: {
    minWidth: "260px",
  },
  optionRow: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  optionSelected: {
    backgroundColor: tokens.colorBrandBackground2,
    ":hover": {
      backgroundColor: tokens.colorBrandBackground2Hover,
    },
  },
  optionLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
  },
  optionDescription: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  themeToggle: {
    paddingTop: tokens.spacingHorizontalXS,
    paddingBottom: tokens.spacingHorizontalXS,
    paddingLeft: tokens.spacingHorizontalXS,
    paddingRight: tokens.spacingHorizontalXS,
    backgroundColor: "transparent",
    borderTop: `1px solid ${tokens.colorNeutralStrokeInvertedDisabled}`,
    borderRight: `1px solid ${tokens.colorNeutralStrokeInvertedDisabled}`,
    borderBottom: `1px solid ${tokens.colorNeutralStrokeInvertedDisabled}`,
    borderLeft: `1px solid ${tokens.colorNeutralStrokeInvertedDisabled}`,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    color: tokens.colorNeutralForegroundInverted,
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
  },
})
