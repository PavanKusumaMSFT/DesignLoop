/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  TabList,
  Tab,
  mergeClasses,
} from "@fluentui/react-components";
import {
  ChevronUp20Regular,
  ChevronDown20Regular,
  Sparkle20Regular,
} from "@fluentui/react-icons";
import { useState, ReactNode } from "react";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WizardStep {
  /** Unique step identifier */
  id: number;
  /** Display title */
  title: string;
  /** Whether this step has been completed */
  completed?: boolean;
  /** Show a Copilot sparkle icon next to the step title */
  copilotEnhanced?: boolean;
  /** Custom icon rendered after title (alternative to copilotEnhanced) */
  icon?: ReactNode;
}

export interface WizardStepGroup {
  /** Optional group label (renders as a collapsible header when `collapsible` is true) */
  label?: string;
  /** Whether this group can be collapsed */
  collapsible?: boolean;
  /** Steps in this group */
  steps: WizardStep[];
  /** Whether steps are visually indented (for nested groups) */
  indented?: boolean;
}

export interface WizardStepNavProps {
  /** Active step id */
  activeStep: number;
  /** Called when user clicks a step */
  onStepChange: (stepId: number) => void;
  /** Whether Copilot sparkle icons should be shown (even if steps have copilotEnhanced=true) */
  showCopilotIcons?: boolean;
  /** Optional className for the root container */
  className?: string;

  // --- Two modes: flat steps OR grouped steps ---

  /** Flat list of steps (simple mode — no groups/collapsible) */
  steps?: WizardStep[];
  /** Grouped steps with optional collapsible sections (advanced mode) */
  groups?: WizardStepGroup[];
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    width: "100%",
  },
  // --- Flat mode: Fluent TabList ---
  tabSparkle: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  copilotIcon: {
    display: "inline-flex",
    alignItems: "center",
    color: "#4F52F6",
    fontSize: tokens.fontSizeBase300,
  },
  // --- Grouped mode: custom step items ---
  stepItem: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    transitionDuration: tokens.durationFast,
    transitionProperty: "background-color",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  stepItemActive: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderLeft: `2px solid ${tokens.colorBrandForeground1}`,
  },
  stepItemInactive: {
    backgroundColor: "transparent",
    borderLeft: "2px solid transparent",
  },
  stepItemIndented: {
    paddingLeft: tokens.spacingHorizontalXXL,
  },
  dividerLine: {
    height: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
    margin: `${tokens.spacingVerticalXS} 0`,
  },
  groupHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    cursor: "pointer",
    borderRadius: tokens.borderRadiusMedium,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
});

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/** Vertical step navigation for wizard flows. Supports flat step lists and grouped/collapsible sections. */
export default function WizardStepNav({
  activeStep,
  onStepChange,
  showCopilotIcons = false,
  className,
  steps,
  groups,
}: WizardStepNavProps) {
  const styles = useStyles();

  const handleStepClick = (stepId: number) => {
    onStepChange(stepId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Flat mode: use Fluent TabList
  if (steps && !groups) {
    return (
      <div className={mergeClasses(styles.root, className)}>
        <TabList
          vertical
          selectedValue={String(activeStep)}
          onTabSelect={(_, data) => handleStepClick(Number(data.value))}
        >
          {steps.map((step) => (
            <Tab key={step.id} value={String(step.id)}>
              <span className={styles.tabSparkle}>
                {step.title}
                {showCopilotIcons && step.copilotEnhanced && (
                  <span className={styles.copilotIcon}>
                    <Sparkle20Regular />
                  </span>
                )}
                {step.icon}
              </span>
            </Tab>
          ))}
        </TabList>
      </div>
    );
  }

  // Grouped mode: custom step items with collapsible sections
  if (groups) {
    return (
      <div className={mergeClasses(styles.root, className)}>
        {groups.map((group, gi) => (
          <GroupSection
            key={gi}
            group={group}
            activeStep={activeStep}
            showCopilotIcons={showCopilotIcons}
            onStepClick={handleStepClick}
            styles={styles}
            showDividerAfter={gi < groups.length - 1}
          />
        ))}
      </div>
    );
  }

  return null;
}

// ---------------------------------------------------------------------------
// Group section (handles collapsible)
// ---------------------------------------------------------------------------

function GroupSection({
  group,
  activeStep,
  showCopilotIcons,
  onStepClick,
  styles,
  showDividerAfter,
}: {
  group: WizardStepGroup;
  activeStep: number;
  showCopilotIcons: boolean;
  onStepClick: (id: number) => void;
  styles: ReturnType<typeof useStyles>;
  showDividerAfter: boolean;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <>
      {group.label && group.collapsible ? (
        <div
          className={styles.groupHeader}
          onClick={() => setExpanded(!expanded)}
        >
          <Text size={300} weight="semibold">
            {group.label}
          </Text>
          {expanded ? <ChevronUp20Regular /> : <ChevronDown20Regular />}
        </div>
      ) : group.label ? (
        <Text
          size={300}
          weight="semibold"
          style={{ padding: `${0} 12px` }}
        >
          {group.label}
        </Text>
      ) : null}

      {(!group.collapsible || expanded) &&
        group.steps.map((step) => (
          <div
            key={step.id}
            className={mergeClasses(
              styles.stepItem,
              activeStep === step.id
                ? styles.stepItemActive
                : styles.stepItemInactive,
              group.indented ? styles.stepItemIndented : undefined,
            )}
            onClick={() => onStepClick(step.id)}
          >
            <Text
              size={300}
              weight={activeStep === step.id ? "semibold" : "regular"}
            >
              {step.title}
            </Text>
            {showCopilotIcons && step.copilotEnhanced && (
              <span className={styles.copilotIcon}>
                <Sparkle20Regular />
              </span>
            )}
            {step.icon}
          </div>
        ))}

      {showDividerAfter && <div className={styles.dividerLine} />}
    </>
  );
}
