"use client";

import React, { useState, useEffect } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  TabList,
  Tab,
  mergeClasses,
} from "@fluentui/react-components";
import {
  ChevronDown20Regular,
  ChevronRight20Regular,
  ArrowMinimizeVertical20Regular,
  CheckmarkCircle20Regular,
  Notepad20Regular,
  ArrowMaximize20Regular,
  ArrowDownload20Regular,
} from "@fluentui/react-icons";
import { LatencyLoader } from "../../shared/safe-latency-loader";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ===== Types =====
export interface ReasoningStep {
  name: string;
  desc: string;
}

export interface ReasoningArtifact {
  name: string;
  desc: string;
}

export interface ReasoningCardProps {
  /** Steps to display and animate through */
  steps: ReasoningStep[];
  /** Artifacts revealed on completion */
  artifacts?: ReasoningArtifact[];
  /** Delay between step transitions in ms (default: 600) */
  stepDelay?: number;
  /** Whether to start the animation (typically tied to parent visibility) */
  isActive?: boolean;
  /** Called when all steps are complete */
  onComplete?: () => void;
  /** Custom title (default: "Reasoning") */
  title?: string;
  /** When true, freeze at loading state — no step progression */
  docked?: boolean;
  /** When true, hides the Artifacts tab entirely */
  hideArtifacts?: boolean;
  /** When true, steps are revealed one at a time as each previous step completes */
  revealStepsSequentially?: boolean;
  /** When false, the card stays expanded after all steps complete (default: true) */
  collapseOnComplete?: boolean;
}

// ===== Styles =====
const useStyles = makeStyles({
  card: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "12px",
    padding: "16px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
    overflow: "hidden",
    width: "620px",
    maxWidth: "100%",
  },
  headerRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  titleGroup: {
    display: "flex",
    flexDirection: "column" as const,
  },
  title: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
    lineHeight: "22px",
  },
  subtitle: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground3,
    lineHeight: "20px",
  },
  body: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "12px",
    overflow: "hidden",
  },
  summaryRow: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    display: "flex",
    alignItems: "center",
    gap: "4px",
    lineHeight: "16px",
  },
  step: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    paddingTop: "2px",
    paddingBottom: "2px",
  },
  stepIcon: {
    width: "21px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
    display: "flex",
    alignItems: "center",
    gap: "4px",
    lineHeight: "20px",
    cursor: "pointer",
  },
  stepDesc: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground3,
    lineHeight: "20px",
    marginTop: "6px",
    paddingRight: "16px",
  },
  artifactBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    width: "100%",
    textAlign: "left" as const,
    marginTop: "8px",
  },
  artifactName: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    flex: 1,
  },
  artifactDesc: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  iconNeutral4: {
    color: tokens.colorNeutralForeground4,
  },
  toggleButton: {
    whiteSpace: "nowrap" as const,
    flexShrink: 0,
  },
  compactButton: {
    minWidth: "auto",
    padding: "0 4px",
  },
  compactButtonNoPad: {
    minWidth: "auto",
    padding: "0",
  },
  latencySmall: {
    width: "20px",
    height: "20px",
  },
  flexOne: {
    flex: 1,
  },
  artifactMarginTop: {
    marginTop: "8px",
  },
  iconNeutral3Shrink: {
    color: tokens.colorNeutralForeground3,
    flexShrink: 0,
  },
  iconNeutral3: {
    color: tokens.colorNeutralForeground3,
  },
  artifactsTabPadding: {
    padding: "8px 0",
  },
  downloadIconSmall: {
    color: tokens.colorNeutralForeground3,
    width: "16px",
    height: "16px",
  },
  noArtifactsText: {
    color: tokens.colorNeutralForeground3,
    fontSize: "13px",
  },
});

// ===== Component =====
const ReasoningCard: React.FC<ReasoningCardProps> = ({
  steps,
  artifacts = [],
  stepDelay = 1000,
  isActive = false,
  onComplete,
  title: titleProp = "Reasoning",
  docked = false,
  hideArtifacts = false,
  revealStepsSequentially = false,
  collapseOnComplete = true,
}) => {
  const styles = useStyles();

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [bodyCollapsed, setBodyCollapsed] = useState(false);
  const [collapsedDescs, setCollapsedDescs] = useState<Set<number>>(
    () => new Set(steps.map((_, i) => i)),
  );
  const [activeTab, setActiveTab] = useState<string>("activity");
  const [allExpanded, setAllExpanded] = useState(false);
  const [allDone, setAllDone] = useState(false);

  // Sequential step progression (frozen when docked)
  useEffect(() => {
    if (!isActive || allDone || docked) return;
    if (currentStep >= steps.length) {
      setAllDone(true);
      if (collapseOnComplete) setBodyCollapsed(true);
      onComplete?.();
      return;
    }
    const timer = setTimeout(() => {
      setCompletedSteps((prev) => prev + 1);
      setCollapsedDescs((prev) => new Set(prev).add(currentStep));
      setCurrentStep((prev) => prev + 1);
    }, stepDelay);
    return () => clearTimeout(timer);
  }, [isActive, currentStep, allDone, docked, steps.length, stepDelay]);

  const toggleAllDescs = () => {
    if (allExpanded) {
      const allIdxs = new Set<number>();
      for (let i = 0; i < steps.length; i++) allIdxs.add(i);
      setCollapsedDescs(allIdxs);
    } else {
      setCollapsedDescs(new Set());
    }
    setAllExpanded((prev) => !prev);
  };

  const toggleDesc = (idx: number) => {
    setCollapsedDescs((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  // Subtitle text
  const subtitleText = allDone
    ? `${steps.length} actions completed${artifacts.length > 0 ? ` · ${artifacts.length} artifacts created` : ""}`
    : completedSteps > 0
      ? `${completedSteps} of ${steps.length} steps completed`
      : "Working...";

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.headerRow}>
        <div className={styles.headerLeft}>
          {allDone && (
            <div className={styles.stepIcon}>
              <CheckmarkCircle20Regular className={styles.iconNeutral4} />
            </div>
          )}
          <div className={styles.titleGroup}>
            <span className={styles.title}>
              {allDone ? `${titleProp} complete` : titleProp}
            </span>
            <span className={styles.subtitle}>{subtitleText}</span>
          </div>
        </div>
        <Button
          icon={<ArrowMinimizeVertical20Regular />}
          onClick={() => setBodyCollapsed((prev) => !prev)}
          className={styles.toggleButton}
        >
          {bodyCollapsed ? "Show activity" : "Hide activity"}
        </Button>
      </div>

      {/* Body */}
      {!bodyCollapsed && (
        <div className={styles.body}>
          <TabList
            selectedValue={activeTab}
            onTabSelect={(_, d) => setActiveTab(d.value as string)}
            size="small"
          >
            <Tab value="activity">Activity</Tab>
            {!hideArtifacts && <Tab value="artifacts">Artifacts</Tab>}
          </TabList>

          {activeTab === "activity" ? (
            <>
              <div className={styles.summaryRow}>
                <span>{completedSteps} actions completed</span>
                <span>&middot;</span>
                <Button
                  appearance="subtle"
                  size="small"
                  className={styles.compactButton}
                  onClick={toggleAllDescs}
                >
                  {allExpanded ? "Collapse all" : "Show all"}
                </Button>
                <Button
                  appearance="subtle"
                  size="small"
                  icon={
                    allExpanded ? (
                      <ChevronDown20Regular />
                    ) : (
                      <ChevronRight20Regular />
                    )
                  }
                  className={styles.compactButtonNoPad}
                />
              </div>

              {(revealStepsSequentially
                ? steps.slice(0, currentStep + 1)
                : steps
              ).map((step, idx) => {
                const isCompleted = idx < completedSteps;
                const isDescCollapsed =
                  (idx > currentStep && !allDone) || collapsedDescs.has(idx);

                return (
                  <div key={idx} className={styles.step}>
                    <div className={styles.stepIcon}>
                      {isCompleted || allDone ? (
                        <CheckmarkCircle20Regular
                          className={styles.iconNeutral4}
                        />
                      ) : (
                        <LatencyLoader className={styles.latencySmall} />
                      )}
                    </div>
                    <div className={styles.flexOne}>
                      <div
                        className={styles.stepTitle}
                        onClick={() => toggleDesc(idx)}
                      >
                        {step.name}
                        <Button
                          appearance="subtle"
                          size="small"
                          icon={
                            isDescCollapsed ? (
                              <ChevronRight20Regular />
                            ) : (
                              <ChevronDown20Regular />
                            )
                          }
                          className={styles.compactButtonNoPad}
                        />
                      </div>
                      {!isDescCollapsed && (
                        <div className={styles.stepDesc}>
                          {step.desc}
                          {allDone &&
                            idx === steps.length - 1 &&
                            artifacts.length > 0 && (
                              <div className={styles.artifactMarginTop}>
                                {artifacts.map((art, ai) => (
                                  <div key={ai} className={styles.artifactBtn}>
                                    <Notepad20Regular
                                      className={styles.iconNeutral3Shrink}
                                    />
                                    <div className={styles.flexOne}>
                                      <div className={styles.artifactName}>
                                        {art.name}
                                      </div>
                                      <div className={styles.artifactDesc}>
                                        {art.desc}
                                      </div>
                                    </div>
                                    <ArrowMaximize20Regular
                                      className={styles.iconNeutral3}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            /* Artifacts tab */
            <div className={styles.artifactsTabPadding}>
              {allDone && artifacts.length > 0 ? (
                artifacts.map((art, ai) => (
                  <div key={ai} className={styles.artifactBtn}>
                    <Notepad20Regular className={styles.iconNeutral3Shrink} />
                    <div className={styles.flexOne}>
                      <div className={styles.artifactName}>{art.name}</div>
                      <div className={styles.artifactDesc}>{art.desc}</div>
                    </div>
                    <ArrowDownload20Regular
                      className={styles.downloadIconSmall}
                    />
                    <ArrowMaximize20Regular className={styles.iconNeutral3} />
                  </div>
                ))
              ) : (
                <Text className={styles.noArtifactsText}>No artifacts yet</Text>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/** Animated card displaying sequential reasoning steps with progressive checkmarks, expandable details, and optional artifact output.
 * Cross-project reusable: can be imported by any project. */
export default ReasoningCard;
