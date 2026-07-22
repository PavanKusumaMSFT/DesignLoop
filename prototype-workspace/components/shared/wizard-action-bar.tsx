"use client";

import React from "react";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Button,
  Spinner,
} from "@fluentui/react-components";
import { Save20Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

export interface WizardActionBarProps {
  /** Current step number (1-based) */
  currentStep: number;
  /** Total number of steps */
  totalSteps: number;
  /** Step number of the review step (usually last) */
  reviewStep?: number;
  /** Label for the next button, e.g. "Next: Networking" */
  nextLabel?: string;
  /** Label for the create/deploy button */
  createLabel?: string;
  /** Whether the create action is in progress */
  isCreating?: boolean;
  /** Called when Previous is clicked */
  onPrevious?: () => void;
  /** Called when Next is clicked */
  onNext?: () => void;
  /** Called when Skip to review is clicked */
  onSkipToReview?: () => void;
  /** Called when Create/Deploy is clicked */
  onCreate?: () => void;
  /** Whether to show Save draft button */
  showSaveDraft?: boolean;
  /** Called when Save draft is clicked */
  onSaveDraft?: () => void;
  /** Whether to show Skip to review button */
  showSkipToReview?: boolean;
  /** Optional className */
  className?: string;
  /** Optional additional buttons to render on the right side */
  rightActions?: React.ReactNode;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    marginTop: tokens.spacingVerticalXXL,
    paddingTop: tokens.spacingVerticalXL,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  rightArea: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
});

/** Bottom action bar for wizard steps with Previous, Next, Skip to review, Create, and Save draft buttons. */
export default function WizardActionBar({
  currentStep,
  totalSteps,
  reviewStep,
  nextLabel,
  createLabel,
  isCreating = false,
  onPrevious,
  onNext,
  onSkipToReview,
  onCreate,
  showSaveDraft = false,
  onSaveDraft,
  showSkipToReview = false,
  className,
  rightActions,
}: WizardActionBarProps) {
  const styles = useStyles();

  const effectiveReviewStep = reviewStep ?? totalSteps;
  const isReviewStep = currentStep === effectiveReviewStep;

  return (
    <div className={mergeClasses(styles.root, className)}>
      {currentStep > 1 && (
        <Button appearance="secondary" onClick={onPrevious}>
          Previous
        </Button>
      )}

      {currentStep < totalSteps && (
        <Button appearance="secondary" onClick={onNext}>
          {nextLabel ?? "Next"}
        </Button>
      )}

      {showSkipToReview && currentStep !== effectiveReviewStep && (
        <Button appearance="secondary" onClick={onSkipToReview}>
          Skip to review
        </Button>
      )}

      {isReviewStep && (
        <Button
          appearance="primary"
          disabled={isCreating}
          icon={isCreating ? <Spinner size="tiny" /> : undefined}
          onClick={onCreate}
        >
          {createLabel ?? "Create"}
        </Button>
      )}

      {(rightActions || showSaveDraft) && (
        <div className={styles.rightArea}>
          {rightActions}
          {showSaveDraft && (
            <Button
              appearance="transparent"
              icon={<Save20Regular />}
              onClick={onSaveDraft}
            >
              Save draft
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
