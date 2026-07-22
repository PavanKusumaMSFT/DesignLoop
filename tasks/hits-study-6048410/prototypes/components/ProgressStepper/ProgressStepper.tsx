import React from 'react';
import styles from './ProgressStepper.module.css';

export type StepState = 'active' | 'completed' | 'upcoming' | 'error';
export type ProgressStepperVariant = 'horizontal' | 'vertical' | 'minimal';

export interface Step {
  /** Unique step identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional description */
  description?: string;
  /** Step state */
  state: StepState;
}

export interface ProgressStepperProps {
  /** Array of step definitions */
  steps: Step[];
  /** Index of the current active step (0-based) */
  currentStep: number;
  /** Overall completion percentage (0-100) */
  completionPercentage: number;
  /** Layout variant */
  variant?: ProgressStepperVariant;
  /** Callback when a completed step is clicked */
  onStepClick?: (stepIndex: number) => void;
  /** Optional aria-label for the stepper */
  ariaLabel?: string;
}

export const ProgressStepper: React.FC<ProgressStepperProps> = ({
  steps,
  currentStep,
  completionPercentage,
  variant = 'horizontal',
  onStepClick,
  ariaLabel = 'Study progress',
}) => {
  const handleStepClick = (index: number, state: StepState) => {
    if (state === 'completed' && onStepClick) {
      onStepClick(index);
    }
  };

  const handleStepKeyDown = (
    e: React.KeyboardEvent,
    index: number,
    state: StepState
  ) => {
    if ((e.key === 'Enter' || e.key === ' ') && state === 'completed') {
      e.preventDefault();
      onStepClick?.(index);
    }
  };

  const getStepIcon = (state: StepState, index: number) => {
    switch (state) {
      case 'completed':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M6.5 12.5l-4-4 1.4-1.4L6.5 9.7l5.6-5.6L13.5 5.5z" />
          </svg>
        );
      case 'error':
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 1a7 7 0 110 14A7 7 0 018 1zm.5 10h-1v1h1v-1zm0-6h-1v5h1V5z" />
          </svg>
        );
      default:
        return <span aria-hidden="true">{index + 1}</span>;
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={styles.minimal} role="progressbar" aria-label={ariaLabel} aria-valuenow={completionPercentage} aria-valuemin={0} aria-valuemax={100}>
        <div className={styles.minimalHeader}>
          <span className={styles.minimalLabel}>
            Step {currentStep + 1} of {steps.length}
            {steps[currentStep] && `: ${steps[currentStep].label}`}
          </span>
          <span className={styles.minimalPercent}>{completionPercentage}%</span>
        </div>
        <div className={styles.minimalTrack}>
          <div
            className={styles.minimalFill}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <div className={styles.minimalDots}>
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`${styles.minimalDot} ${styles[`dot-${step.state}`]}`}
              aria-label={`${step.label}: ${step.state}`}
            />
          ))}
        </div>
      </div>
    );
  }

  const containerClass = `${styles.container} ${styles[`variant-${variant}`]}`;

  return (
    <nav className={containerClass} aria-label={ariaLabel}>
      {/* Progress bar */}
      <div className={styles.progressBar} role="progressbar" aria-valuenow={completionPercentage} aria-valuemin={0} aria-valuemax={100} aria-label={`${completionPercentage}% complete`}>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ [variant === 'vertical' ? 'height' : 'width']: `${completionPercentage}%` }} />
        </div>
        <span className={styles.progressLabel}>{completionPercentage}% complete</span>
      </div>

      {/* Steps */}
      <ol className={styles.steps}>
        {steps.map((step, index) => {
          const isClickable = step.state === 'completed';
          return (
            <li
              key={step.id}
              className={`${styles.step} ${styles[`step-${step.state}`]}`}
              aria-current={step.state === 'active' ? 'step' : undefined}
            >
              {/* Connector line */}
              {index > 0 && (
                <div
                  className={`${styles.connector} ${
                    step.state === 'completed' || step.state === 'active'
                      ? styles.connectorActive
                      : ''
                  }`}
                  aria-hidden="true"
                />
              )}
              <div
                className={styles.stepContent}
                role={isClickable ? 'button' : undefined}
                tabIndex={isClickable ? 0 : -1}
                onClick={() => handleStepClick(index, step.state)}
                onKeyDown={(e) => handleStepKeyDown(e, index, step.state)}
                aria-label={`Step ${index + 1}: ${step.label}, ${step.state}`}
              >
                <div className={`${styles.stepIndicator} ${styles[`indicator-${step.state}`]}`}>
                  {getStepIcon(step.state, index)}
                </div>
                <div className={styles.stepText}>
                  <span className={styles.stepLabel}>{step.label}</span>
                  {step.description && variant !== 'horizontal' && (
                    <span className={styles.stepDescription}>{step.description}</span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
