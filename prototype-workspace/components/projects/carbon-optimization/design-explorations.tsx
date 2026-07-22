"use client"

import AsIs from "./as-is"
import CompanyLevelView from "./company-level-view"
import AsyncExportsView from "./async-exports-view"
import AsyncExportsViewV4 from "./async-exports-view-v4"

export type DesignExplorationVariant =
  | "v1-current"
  | "company-view"
  | "company-view-error"
  | "company-view-buttons"
  | "v3-async-exports"
  | "v3-async-exports-b"
  | "v4-full-reflow"

export interface DesignExplorationsScenario {
  id: DesignExplorationVariant
  label: string
  description: string
}

/** Registry of all explorations. The first entry is the default. Extend this list as new variants are designed. */
export const DESIGN_EXPLORATION_SCENARIOS: DesignExplorationsScenario[] = [
  {
    id: "v1-current",
    label: "v1 — Current ACO (baseline)",
    description: "Replica of today's experience.",
  },
  {
    id: "company-view",
    label: "v2 — Company-level view",
    description: "Adds a Subscriptions / Billing Accounts view picker.",
  },
  {
    id: "company-view-error",
    label: "v2.error — Company-level view (no BA permissions)",
    description: "Billing Accounts view shows a permissions empty state.",
  },
  {
    id: "company-view-buttons",
    label: "v2.buttons — Export buttons at top-right",
    description: "v2 with Export to CSV moved to the top-right of each card.",
  },
  {
    id: "v3-async-exports",
    label: "v3 — Async exports (Option A)",
    description: "Per-blade Export entrypoint as a split MenuButton in the bottom-left of each card.",
  },
  {
    id: "v3-async-exports-b",
    label: "v3 — Async exports (Option B)",
    description: "Per-blade Export entrypoint as a compact toolbar MenuButton in the top-left of each card.",
  },
  {
    id: "v4-full-reflow",
    label: "v4 — Full reflow (work in progress)",
    description: "Reflow build forked from v3 Option A. Tour off, view picker on. Tokenization + a11y landing first; layout reflow lands incrementally.",
  },
]

interface DesignExplorationsProps {
  /** Active variant id. Controlled by the parent page (via ?v= search param). */
  variant: DesignExplorationVariant
  isDarkMode?: boolean
}

/** Renders the active design exploration variant for the EID > ACO parity scenario. The variant chrome (dropdown, theme toggle, back button) lives in the page-level PrototypeFooter. */
export default function DesignExplorations({ variant, isDarkMode = false }: DesignExplorationsProps) {
  switch (variant) {
    case "v1-current":
      return <AsIs isDarkMode={isDarkMode} />
    case "company-view":
      return <CompanyLevelView isDarkMode={isDarkMode} enableTour />
    case "company-view-error":
      return <CompanyLevelView isDarkMode={isDarkMode} noBillingAccountAccess enableTour />
    case "company-view-buttons":
      return <CompanyLevelView isDarkMode={isDarkMode} exportPosition="topRight" enableTour />
    case "v3-async-exports":
      return <AsyncExportsView isDarkMode={isDarkMode} option="A" />
    case "v3-async-exports-b":
      return <AsyncExportsView isDarkMode={isDarkMode} option="B" />
    case "v4-full-reflow":
      return <AsyncExportsViewV4 isDarkMode={isDarkMode} option="A" />
    default:
      return <AsIs isDarkMode={isDarkMode} />
  }
}
