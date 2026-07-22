"use client";

import React from "react";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

export interface WizardSectionProps {
  /** Section title text */
  title: string;
  /** Optional description below the title */
  description?: string;
  /** Whether to show a bottom divider under the title (Postgres style) */
  divider?: boolean;
  /** Children form fields */
  children: React.ReactNode;
  /** Optional className for the root */
  className?: string;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: tokens.spacingVerticalXXL,
  },
  titleArea: {
    marginBottom: tokens.spacingVerticalL,
  },
  titleAreaWithDivider: {
    paddingBottom: tokens.spacingVerticalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  description: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalM,
  },
});

/** A titled section within a wizard step, used to group related form fields (e.g. "Project details", "Instance details"). */
export default function WizardSection({
  title,
  description,
  divider = false,
  children,
  className,
}: WizardSectionProps) {
  const styles = useStyles();

  return (
    <div className={mergeClasses(styles.root, className)}>
      <div
        className={mergeClasses(
          styles.titleArea,
          divider && styles.titleAreaWithDivider
        )}
      >
        <Text size={500} weight="semibold">
          {title}
        </Text>
      </div>
      {description && (
        <Text className={styles.description}>{description}</Text>
      )}
      {children}
    </div>
  );
}
