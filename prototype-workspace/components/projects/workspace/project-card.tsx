/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { useRouter } from "next/navigation";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  mergeClasses,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  ArrowRight24Regular,
  BranchFork24Regular,
  Beaker20Regular,
} from "@fluentui/react-icons";
import type { Project } from "../../../data/projects";

// ---------------------------------------------------------------------------
// Styles — compact tile + detail popover
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  tile: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    cursor: "pointer",
    transitionProperty: "transform, box-shadow, border-color",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: tokens.shadow4,
      borderTopColor: tokens.colorNeutralStroke1Hover,
      borderRightColor: tokens.colorNeutralStroke1Hover,
      borderBottomColor: tokens.colorNeutralStroke1Hover,
      borderLeftColor: tokens.colorNeutralStroke1Hover,
    },
  },
  tileDisabled: {
    opacity: 0.5,
    cursor: "default",
    ":hover": {
      transform: "none",
      boxShadow: "none",
      borderTopColor: tokens.colorNeutralStroke2,
      borderRightColor: tokens.colorNeutralStroke2,
      borderBottomColor: tokens.colorNeutralStroke2,
      borderLeftColor: tokens.colorNeutralStroke2,
    },
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: tokens.borderRadiusCircular,
    flexShrink: 0,
  },
  dotActive: { backgroundColor: tokens.colorPaletteGreenForeground1 },
  dotInProgress: { backgroundColor: "#0078D4" },
  dotOnHold: { backgroundColor: tokens.colorPaletteYellowForeground1 },
  dotComingSoon: { backgroundColor: tokens.colorNeutralForeground3 },
  dotArchived: { backgroundColor: tokens.colorNeutralForeground3 },
  tileBody: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
    flex: 1,
  },
  tileTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.35",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  tileSubtext: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  testingBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorPalettePurpleForeground2,
    backgroundColor: tokens.colorPalettePurpleBackground2,
    paddingTop: "1px",
    paddingBottom: "1px",
    paddingLeft: tokens.spacingHorizontalXS,
    paddingRight: tokens.spacingHorizontalS,
    borderRadius: tokens.borderRadiusMedium,
    flexShrink: 0,
  },
  testingIcon: {
    fontSize: "12px",
  },
  testingLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
  // Detail popover
  surface: {
    padding: tokens.spacingHorizontalXL,
    maxWidth: "360px",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusXLarge,
  },
  popTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.3",
  },
  popDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.55",
  },
  popMeta: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  popRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase200,
  },
  popLabel: {
    color: tokens.colorNeutralForeground4,
    minWidth: "72px",
    flexShrink: 0,
  },
  popValue: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightMedium,
  },
  popTags: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
    flexWrap: "wrap",
  },
  popTag: {
    fontSize: tokens.fontSizeBase100,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
    fontWeight: tokens.fontWeightMedium,
  },
  popActions: {
    paddingTop: tokens.spacingVerticalXS,
  },
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const dotStyleKey: Record<string, string> = {
  active: "dotActive",
  "in-progress": "dotInProgress",
  "on-hold": "dotOnHold",
  "coming-soon": "dotComingSoon",
  archived: "dotArchived",
};

const statusColorMap: Record<
  string,
  "success" | "brand" | "informative" | "important" | "subtle"
> = {
  active: "success",
  "in-progress": "brand",
  "coming-soon": "informative",
  archived: "subtle",
};

const statusLabels: Record<string, string> = {
  active: "Active",
  "in-progress": "In Progress",
  "coming-soon": "Coming Soon",
  archived: "Archived",
};

const timeframeLabels: Record<string, string> = {
  "short-term": "Short-term",
  "mid-term": "Mid-term",
  "long-term": "Long-term",
};

const horizonLabels: Record<string, string> = {
  "build-2026": "Short-term",
  "v1-ideal": "Mid-term",
  vision: "Long-term",
};

const purposeLabels: Record<string, string> = {
  vision: "Vision",
  "user-test": "User Test",
  poc: "POC",
  experiment: "Experiment",
  "demo-walkthrough": "Demo",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface ProjectCardProps {
  project: Project;
  /** Kept for API compat with WorkspaceGrid */
  visibleProjectIds?: Set<string>;
  /** When true, shows a "Live Testing" badge on the tile */
  isUserTesting?: boolean;
}

/** Project tile with status indicator, title, owner info, and a popover detail panel showing metadata, tags, and actions.
 * Cross-project reusable: can be imported by any project. */
export default function ProjectCard({ project, isUserTesting }: ProjectCardProps) {
  const styles = useStyles();
  const router = useRouter();

  const isDisabled = project.status === "coming-soon" && !project.source.route;

  const handleOpen = () => {
    if (isDisabled) return;
    if (project.source.type === "fork" && project.source.deployUrl) {
      window.open(project.source.deployUrl, "_blank", "noopener");
    } else if (project.source.type === "local" && project.source.route) {
      router.push(project.source.route);
    }
  };

  const teamLabel = project.team || project.owner;
  const timeframe = project.timeframe
    ? timeframeLabels[project.timeframe]
    : horizonLabels[project.horizon];

  return (
    <Popover withArrow positioning="below-start">
      <PopoverTrigger disableButtonEnhancement>
        <div
          className={mergeClasses(
            styles.tile,
            isDisabled && styles.tileDisabled,
          )}
          role="button"
          tabIndex={isDisabled ? -1 : 0}
        >
          <span
            className={mergeClasses(
              styles.statusDot,
              styles[
                dotStyleKey[project.status] as keyof typeof styles
              ] as string,
            )}
          />
          <div className={styles.tileBody}>
            <span className={styles.tileTitle}>{project.title}</span>
            <span className={styles.tileSubtext}>{teamLabel}</span>
          </div>
          {isUserTesting && (
            <span className={styles.testingBadge}>
              <Beaker20Regular className={styles.testingIcon} />
              Live Test
            </span>
          )}
        </div>
      </PopoverTrigger>

      {/* Detail popover — click a tile to see full info */}
      <PopoverSurface className={styles.surface}>
        <Text className={styles.popTitle}>{project.title}</Text>
        {project.description && (
          <Text className={styles.popDesc}>{project.description}</Text>
        )}
        <div className={styles.popMeta}>
          <div className={styles.popRow}>
            <span className={styles.popLabel}>Owner</span>
            <span className={styles.popValue}>{project.owner}</span>
          </div>
          {project.team && (
            <div className={styles.popRow}>
              <span className={styles.popLabel}>Team</span>
              <span className={styles.popValue}>{project.team}</span>
            </div>
          )}
          <div className={styles.popRow}>
            <span className={styles.popLabel}>Timeframe</span>
            <span className={styles.popValue}>{timeframe}</span>
          </div>
          <div className={styles.popRow}>
            <span className={styles.popLabel}>Status</span>
            <Badge
              size="small"
              appearance="filled"
              color={statusColorMap[project.status] ?? "informative"}
            >
              {statusLabels[project.status] ?? project.status}
            </Badge>
          </div>
          {project.purpose && (
            <div className={styles.popRow}>
              <span className={styles.popLabel}>Purpose</span>
              <span className={styles.popValue}>
                {purposeLabels[project.purpose] ?? project.purpose}
              </span>
            </div>
          )}
          {isUserTesting && (
            <div className={styles.popRow}>
              <span className={styles.popLabel}>Testing</span>
              <a
                href="https://black-meadow-0b77efc10.7.azurestaticapps.net/usertest-admin"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.testingLink}
              >
                <Beaker20Regular className={styles.testingIcon} />
                Live Test Active — Manage
              </a>
            </div>
          )}
        </div>
        {project.tags.length > 0 && (
          <div className={styles.popTags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.popTag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className={styles.popActions}>
          <Button
            appearance="primary"
            size="small"
            icon={
              project.source.type === "fork" ? (
                <BranchFork24Regular />
              ) : (
                <ArrowRight24Regular />
              )
            }
            onClick={handleOpen}
            disabled={isDisabled}
          >
            {isDisabled
              ? "Coming Soon"
              : project.source.type === "fork"
                ? "Open Fork"
                : "Open Project"}
          </Button>
        </div>
      </PopoverSurface>
    </Popover>
  );
}
