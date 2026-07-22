"use client";

import React, { useState, useEffect, type ReactNode } from "react";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  FluentProvider,
  webLightTheme,
  type Theme,
  Badge,
  Text,
} from "@fluentui/react-components";
import { ChevronLeft16Regular } from "@fluentui/react-icons";
import { useRouter } from "next/navigation";
import { NavigationProvider } from "../../lib/navigation-context";
import { getProjectById } from "../../data/projects";
import FeedbackPanel, { getCommentCount } from "./feedback-panel";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

interface ProjectLayoutProps {
  /** Project ID from data/projects.ts registry */
  id: string;
  /** Page content */
  children: ReactNode;
  /** Whether content should be full-width without max-width constraint (default: false) */
  fullWidth?: boolean;
  /** Hide the back-to-workspace link (e.g. for immersive agent pages) */
  hideBackLink?: boolean;
  /** Hide the auto-generated project header (title, description, metadata) */
  hideProjectHeader?: boolean;
  /** Optional Fluent theme override for project-specific experiences */
  theme?: Theme;
}

const statusColor: Record<string, "success" | "brand" | "subtle" | "informative" | "warning"> = {
  active: "success",
  "in-progress": "brand",
  "on-hold": "warning",
  "coming-soon": "informative",
  archived: "subtle",
};

const statusLabel: Record<string, string> = {
  active: "Active",
  "in-progress": "In Progress",
  "on-hold": "On Hold",
  "coming-soon": "Coming Soon",
  archived: "Archived",
};

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    backgroundColor: tokens.colorNeutralBackground2,
    transitionProperty: "opacity",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
  },
  containerMounted: {
    opacity: 1,
  },
  containerUnmounted: {
    opacity: 0,
  },
  gradientAccent: {
    display: "none",
  },
  backLink: {
    position: "fixed",
    top: tokens.spacingVerticalM,
    left: "0",
    zIndex: 200,
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalM,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderTopRightRadius: tokens.borderRadiusCircular,
    borderBottomRightRadius: tokens.borderRadiusCircular,
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
    borderLeftStyle: "none",
    boxShadow: tokens.shadow8,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transform: "translateX(calc(-100% + 22px))",
    transitionProperty: "transform, color, box-shadow, background-color",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      transform: "translateX(0)",
      color: tokens.colorBrandForeground1Hover,
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: tokens.shadow16,
    },
    ":focus-visible": {
      transform: "translateX(0)",
      outline: `2px solid ${tokens.colorStrokeFocus2}`,
    },
  },
  content: {
    position: "relative",
    zIndex: 2,
    padding: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "100vh",
  },
  contentFullWidth: {
    position: "relative",
    zIndex: 2,
    padding: "40px",
    margin: "0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "100vh",
  },
  projectHeader: {
    marginBottom: tokens.spacingVerticalL,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalS,
  },
  projectTitle: {
    fontSize: tokens.fontSizeBase700,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.15",
    margin: "0",
  },
  projectDescription: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground3,
    lineHeight: "1.5",
    margin: `0 0 ${tokens.spacingVerticalL} 0`,
    maxWidth: "560px",
    whiteSpace: "pre-line",
  },
  metaStrip: {
    display: "flex",
    alignItems: "stretch",
    gap: "0",
    marginBottom: tokens.spacingVerticalM,
    borderTopStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderLeftStyle: "solid",
    borderTopWidth: "1px",
    borderRightWidth: "1px",
    borderBottomWidth: "1px",
    borderLeftWidth: "1px",
    borderTopColor: tokens.colorNeutralStroke2,
    borderRightColor: tokens.colorNeutralStroke2,
    borderBottomColor: tokens.colorNeutralStroke2,
    borderLeftColor: tokens.colorNeutralStroke2,
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
    width: "fit-content",
  },
  metaCell: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    borderRightStyle: "solid",
    borderRightWidth: "1px",
    borderRightColor: tokens.colorNeutralStroke2,
    ":last-child": {
      borderRightStyle: "none",
    },
  },
  metaLabel: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightMedium,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  metaValue: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    textTransform: "capitalize",
  },
  feedbackFooter: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    backgroundColor: "#1b1b1b",
  },
  feedbackButton: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    color: tokens.colorNeutralForegroundInverted,
    backgroundColor: "transparent",
    border: `1px solid ${tokens.colorNeutralStrokeInvertedDisabled}`,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium,
    height: "32px",
    position: "relative",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackgroundInvertedDisabled,
    },
  },
});

/** Root layout shell that wraps every project page with FluentProvider, NavigationProvider,
 * a subtle background, back-to-workspace link, and auto-rendered project header from registry.
 * Composed from: FluentProvider, NavigationProvider.
 * Instead of: manually setting up providers and navigation in each page. */
export default function ProjectLayout({
  id,
  children,
  fullWidth = false,
  hideBackLink = false,
  hideProjectHeader = false,
  theme = webLightTheme,
}: ProjectLayoutProps) {
  const styles = useStyles();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const project = getProjectById(id);
  const hasFeedback = ["emm", "create-cix", "troubleshoot-agent"].includes(id);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (hasFeedback) {
      setFeedbackCount(getCommentCount(id));
    }
  }, [feedbackOpen, id, hasFeedback]);

  return (
    <NavigationProvider>
      <FluentProvider theme={theme}>
        <div
          className={mergeClasses(
            styles.container,
            isMounted ? styles.containerMounted : styles.containerUnmounted,
          )}
        >
          <div className={styles.gradientAccent} />

          {!hideBackLink && !process.env.NEXT_PUBLIC_USERTEST_MODE && (
            <span
              className={styles.backLink}
              role="button"
              tabIndex={0}
              onClick={() => router.push("/workspace")}
              onKeyDown={(e) => {
                if (e.key === "Enter") router.push("/workspace");
              }}
            >
              <ChevronLeft16Regular />
              Workspace
            </span>
          )}

          <div className={fullWidth ? styles.contentFullWidth : styles.content}>
            {!hideProjectHeader && project && (
              <div className={styles.projectHeader}>
                <div className={styles.titleRow}>
                  <h1 className={styles.projectTitle}>{project.title}</h1>
                  <Badge
                    appearance="tint"
                    color={statusColor[project.status] ?? "informative"}
                    size="small"
                  >
                    {statusLabel[project.status] ?? project.status}
                  </Badge>
                </div>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.metaStrip}>
                  {project.owner && (
                    <div className={styles.metaCell}>
                      <span className={styles.metaLabel}>Owner</span>
                      <span className={styles.metaValue}>{project.owner}</span>
                    </div>
                  )}
                  {project.team && (
                    <div className={styles.metaCell}>
                      <span className={styles.metaLabel}>Team</span>
                      <span className={styles.metaValue}>{project.team}</span>
                    </div>
                  )}
                  {project.timeframe && (
                    <div className={styles.metaCell}>
                      <span className={styles.metaLabel}>Timeframe</span>
                      <span className={styles.metaValue}>{project.timeframe.replace("-", " ")}</span>
                    </div>
                  )}
                </div>

              </div>
            )}

            {children}
          </div>
          {hasFeedback && (
            <>
              <div style={{ height: "48px" }} />
              <div className={styles.feedbackFooter}>
                <button
                  onClick={() => setFeedbackOpen(true)}
                  className={styles.feedbackButton}
                >
                  Design Feedback
                  {feedbackCount > 0 && (
                    <Badge size="small" appearance="filled" color="danger"
                      style={{ position: "absolute", top: "-6px", right: "-6px" }}
                    >{feedbackCount}</Badge>
                  )}
                </button>
              </div>
              <FeedbackPanel
                pageId={id}
                isOpen={feedbackOpen}
                onOpenChange={setFeedbackOpen}
              />
            </>
          )}
        </div>
      </FluentProvider>
    </NavigationProvider>
  );
}
