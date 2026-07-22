/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { useMemo } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Popover,
  PopoverTrigger,
  PopoverSurface,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  FilterDismiss24Regular,
  FolderOpen20Regular,
} from "@fluentui/react-icons";
import ProjectCard from "./project-card";
import type { Project } from "../../../data/projects";

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: tokens.spacingHorizontalM,
  },

  // Grouped view — compact cards with popover
  groupGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: tokens.spacingHorizontalM,
  },
  groupCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    cursor: "pointer",
    transitionProperty: "box-shadow, border-color",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    ":hover": {
      boxShadow: tokens.shadow4,
      borderTopColor: tokens.colorNeutralStroke1Hover,
      borderRightColor: tokens.colorNeutralStroke1Hover,
      borderBottomColor: tokens.colorNeutralStroke1Hover,
      borderLeftColor: tokens.colorNeutralStroke1Hover,
    },
  },
  groupIcon: {
    color: "#0078D4",
    flexShrink: 0,
  },
  groupInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "1px",
    minWidth: 0,
    flex: 1,
  },
  groupName: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  groupCount: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
  },

  // Popover surface with project list
  popSurface: {
    padding: tokens.spacingVerticalM,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    maxWidth: "320px",
    minWidth: "240px",
  },
  popTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    paddingBottom: tokens.spacingVerticalXS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  popProjectsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },

  // Empty state
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingVerticalM,
    padding: "80px 24px",
    textAlign: "center",
    color: tokens.colorNeutralForeground4,
  },
  emptyIcon: {
    width: "48px",
    height: "48px",
    color: tokens.colorNeutralForeground4,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
  },
  emptySubtitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground4,
  },
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toTitleCase(str: string): string {
  return str
    .split(/[\s\-_/]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const pillarLabels: Record<string, string> = {
  discover: "Discover",
  build: "Build",
  manage: "Manage",
  search: "Search",
};

const horizonLabels: Record<string, string> = {
  "build-2026": "Short-term (P0, MVP)",
  "v1-ideal": "Mid-term (Phase II–III)",
  vision: "Long-term (Vision)",
};

function getGroupLabel(groupBy: string, key: string): string {
  if (groupBy === "area") {
    const experienceLabels: Record<string, string> = {
      signup: "Signup",
      upgrade: "Upgrade",
      "catalog-all-services": "All Services / Catalog",
      "onboarding-fre": "Onboarding / FRE",
      manage: "Manage & Monitor",
      "search-discover": "Search & Discover",
      startups: "Startups",
      create: "Create",
      cost: "Cost",
      agent: "Agent",
      other: "Other",
    };
    return experienceLabels[key] ?? toTitleCase(key);
  }
  if (groupBy === "pillar") return pillarLabels[key] ?? toTitleCase(key);
  if (groupBy === "horizon") return horizonLabels[key] ?? toTitleCase(key);
  if (groupBy === "team") return toTitleCase(key) || "Unassigned";
  if (groupBy === "status") {
    const statusLabels: Record<string, string> = {
      active: "Active",
      "in-progress": "In Progress",
      "coming-soon": "Coming Soon",
      archived: "Archived",
    };
    return statusLabels[key] ?? key;
  }
  return toTitleCase(key); // owner — use name directly
}

function groupProjects(
  projects: Project[],
  groupBy: string,
): Record<string, Project[]> {
  const groups: Record<string, Project[]> = {};

  for (const project of projects) {
    if (groupBy === "pillar") {
      // A project can belong to multiple pillars — add to each group
      for (const pillar of project.pillars) {
        if (!groups[pillar]) groups[pillar] = [];
        groups[pillar].push(project);
      }
    } else if (groupBy === "area") {
      const key = project.experienceArea || "other";
      if (!groups[key]) groups[key] = [];
      groups[key].push(project);
    } else if (groupBy === "team") {
      const key = project.team || "Unassigned";
      if (!groups[key]) groups[key] = [];
      groups[key].push(project);
    } else {
      const key = (project as unknown as Record<string, unknown>)[
        groupBy
      ] as string;
      if (!groups[key]) groups[key] = [];
      groups[key].push(project);
    }
  }
  return groups;
}

// Define a stable sort order for each groupBy dimension
const experienceAreaOrder = [
  "signup",
  "onboarding-fre",
  "search-discover",
  "catalog-all-services",
  "create",
  "manage",
  "cost",
  "agent",
  "startups",
  "other",
];
const pillarOrder = ["discover", "build", "manage", "search"];
const horizonOrder = ["build-2026", "v1-ideal", "vision"];
const statusOrder = ["active", "in-progress", "coming-soon", "archived"];

function sortedGroupKeys(groupBy: string, keys: string[]): string[] {
  if (groupBy === "area") {
    return keys.sort((a, b) => {
      const ai = experienceAreaOrder.indexOf(a);
      const bi = experienceAreaOrder.indexOf(b);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
  }
  if (groupBy === "pillar") {
    return keys.sort((a, b) => pillarOrder.indexOf(a) - pillarOrder.indexOf(b));
  }
  if (groupBy === "horizon") {
    return keys.sort(
      (a, b) => horizonOrder.indexOf(a) - horizonOrder.indexOf(b),
    );
  }
  if (groupBy === "status") {
    return keys.sort((a, b) => statusOrder.indexOf(a) - statusOrder.indexOf(b));
  }
  return keys.sort((a, b) => a.localeCompare(b));
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface WorkspaceGridProps {
  projects: Project[];
  groupBy: string | null;
  /** Set of project IDs that have active user tests */
  activeTestIds?: Set<string>;
}

/** Responsive grid of ProjectCards with optional grouping.
 * When grouped, shows compact group cards with popover detail. */
export default function WorkspaceGrid({
  projects,
  groupBy,
  activeTestIds,
}: WorkspaceGridProps) {
  const styles = useStyles();

  const visibleIds = useMemo(
    () => new Set(projects.map((p) => p.id)),
    [projects],
  );

  if (projects.length === 0) {
    return (
      <div className={styles.empty}>
        <FilterDismiss24Regular className={styles.emptyIcon} />
        <Text className={styles.emptyTitle}>
          No projects match your filters
        </Text>
        <Text className={styles.emptySubtitle}>
          Try adjusting or clearing some filters to see more projects.
        </Text>
      </div>
    );
  }

  // Flat grid (no grouping)
  if (!groupBy) {
    return (
      <div className={styles.grid}>
        {projects.map((project, idx) => (
          <ProjectCard
            key={`${project.id}-${idx}`}
            project={project}
            visibleProjectIds={visibleIds}
            isUserTesting={activeTestIds?.has(project.id)}
          />
        ))}
      </div>
    );
  }

  // Grouped — compact cards with popover
  const groups = groupProjects(projects, groupBy);
  const orderedKeys = sortedGroupKeys(groupBy, Object.keys(groups));

  return (
    <div className={styles.groupGrid}>
      {orderedKeys.map((key) => {
        const count = groups[key].length;
        const label = getGroupLabel(groupBy, key);
        return (
          <Popover key={key} withArrow positioning="below-start">
            <PopoverTrigger disableButtonEnhancement>
              <div className={styles.groupCard} role="button" tabIndex={0}>
                <FolderOpen20Regular className={styles.groupIcon} />
                <div className={styles.groupInfo}>
                  <span className={styles.groupName}>{label}</span>
                  <span className={styles.groupCount}>
                    {count} {count === 1 ? "project" : "projects"}
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverSurface className={styles.popSurface}>
              <Text className={styles.popTitle}>{label}</Text>
              <div className={styles.popProjectsGrid}>
                {groups[key].map((project, idx) => (
                  <ProjectCard
                    key={`${project.id}-${idx}`}
                    project={project}
                    visibleProjectIds={visibleIds}
                    isUserTesting={activeTestIds?.has(project.id)}
                  />
                ))}
              </div>
            </PopoverSurface>
          </Popover>
        );
      })}
    </div>
  );
}
