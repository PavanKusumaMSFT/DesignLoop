"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  Subtitle1,
  Body1,
} from "@fluentui/react-components";
import { CheckmarkCircle24Regular } from "@fluentui/react-icons";
import { useState, useEffect, useRef } from "react";
import { LatencyLoader } from "../../shared/safe-latency-loader";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const CHECKLIST_ITEMS = [
  "Identifying language and framework",
  "Classifying app type",
  "Detecting Dockerfile",
];

const STEP_DURATION = 2000;

type ReasoningStepProps = {
  onComplete?: () => void;
};

const useStyles = makeStyles({
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    boxShadow: tokens.shadow4,
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    minHeight: "400px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "28px",
  },
  title: {
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightSemibold,
  },
  checklist: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "flex-start",
  },
  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  loader: {
    width: "20px",
    height: "20px",
  },
  checkIcon: {
    color: tokens.colorNeutralForeground2,
    width: "20px",
    height: "20px",
  },
  statusText: {
    color: tokens.colorNeutralForeground2,
    whiteSpace: "nowrap" as const,
  },
});

/** Animated checklist that progressively completes reasoning steps (language, app type, Dockerfile detection) and fires a callback on finish.
 * Cross-project reusable: can be imported by any project. */
export function ReasoningStep({ onComplete }: ReasoningStepProps) {
  const styles = useStyles();
  const [completedCount, setCompletedCount] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (completedCount >= CHECKLIST_ITEMS.length) {
      const timeout = setTimeout(() => onCompleteRef.current?.(), 1000);
      return () => clearTimeout(timeout);
    }
    const timer = setTimeout(() => {
      setCompletedCount((c) => c + 1);
    }, STEP_DURATION);
    return () => clearTimeout(timer);
  }, [completedCount]);

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <Subtitle1 className={styles.title}>Reasoning</Subtitle1>
        <div className={styles.checklist}>
          {CHECKLIST_ITEMS.map((item, index) => {
            const isCompleted = index < completedCount;
            const isCurrent = index === completedCount;

            if (!isCompleted && !isCurrent) return null;

            return (
              <div key={item} className={styles.statusRow}>
                {isCompleted ? (
                  <CheckmarkCircle24Regular className={styles.checkIcon} />
                ) : (
                  <LatencyLoader className={styles.loader} />
                )}
                <Body1 className={styles.statusText}>{item}</Body1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
