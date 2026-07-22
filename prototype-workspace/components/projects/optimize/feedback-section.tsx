"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Button,
} from "@fluentui/react-components";
import {
  ThumbLike20Regular,
  ThumbDislike20Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

export interface FeedbackSectionProps {
  isDarkMode: boolean;
  animated?: boolean;
  className?: string;
}

const cardFadeInKf = {
  from: { opacity: 0, transform: "translateY(20px)" },
  to: { opacity: 1, transform: "translateY(0)" },
};

const useStyles = makeStyles({
  feedbackSection: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    marginTop: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalXXL,
  },
  feedbackSectionAnimated: {
    opacity: 0,
    animationName: cardFadeInKf,
    animationDuration: "0.3s",
    animationTimingFunction: "ease-out",
    animationFillMode: "forwards",
  },
  criteriaButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "16px",
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
  },
  criteriaIconImg: { width: "16px", height: "16px" },
  darkModeInvert: { filter: "invert(1) brightness(1.2)" },
  darkModeNone: { filter: "none" },
});

/** Thumbs-up / thumbs-down feedback row with a "Criteria" chip. Used after each agent response card. */
export default function FeedbackSection({
  isDarkMode,
  animated = true,
  className,
}: FeedbackSectionProps) {
  const styles = useStyles();

  return (
    <div
      className={mergeClasses(
        styles.feedbackSection,
        animated ? styles.feedbackSectionAnimated : undefined,
        className,
      )}
    >
      <Button
        appearance="subtle"
        size="small"
        icon={<ThumbLike20Regular />}
        title="Like"
      />
      <Button
        appearance="subtle"
        size="small"
        icon={<ThumbDislike20Regular />}
        title="Dislike"
      />
      <div className={styles.criteriaButton}>
        <img
          src="/icons/Agents.svg"
          alt="Criteria"
          className={mergeClasses(
            styles.criteriaIconImg,
            isDarkMode ? styles.darkModeInvert : styles.darkModeNone,
          )}
        />
        <span>Criteria</span>
      </div>
    </div>
  );
}
