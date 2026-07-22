/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { ReactNode } from "react";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Button,
  Text,
} from "@fluentui/react-components";
import { ChevronLeft20Regular, Dismiss20Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

export interface PageHeaderProps {
  /** Page title text */
  title: string;
  /** Optional description shown below the title */
  description?: string;
  /** Optional icon — accepts an image path string or a ReactNode (Fluent icon component) */
  icon?: string | ReactNode;
  /** Alt text for icon when it's a string path */
  iconAlt?: string;
  /** Back button click handler. Shows a ← chevron button when provided. */
  onBack?: () => void;
  /** Close button click handler. Shows an × dismiss button when provided. Mutually exclusive with onBack visually (close appears on the right side). */
  onClose?: () => void;
  /** Optional extra action buttons rendered between title and close button */
  actions?: ReactNode;
  /** Hide the bottom border (default: false) */
  noBorder?: boolean;
  /** Compact mode — renders icon inline at 24px without the rounded container background. Used for blade-style headers. */
  compact?: boolean;
  /** Optional className for root container */
  className?: string;
}

const useStyles = makeStyles({
  section: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorNeutralStroke2,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  sectionNoBorder: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottomWidth: 0,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  container: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  backButton: {
    minWidth: "auto",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    color: tokens.colorBrandForeground1,
  },
  iconContainer: {
    width: "48px",
    height: "48px",
    minWidth: "48px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: "28px",
    height: "28px",
  },
  compactIcon: {
    width: "24px",
    height: "24px",
    color: "#0078D4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  compactIconImage: {
    width: "24px",
    height: "24px",
  },
  compactSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.colorNeutralStroke2,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
  },
  compactContainer: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  titleGroup: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minWidth: 0,
  },
  title: {
    display: "block",
  },
  description: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginTop: tokens.spacingVerticalXS,
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginLeft: "auto",
  },
  closeButton: {
    minWidth: "auto",
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
  },
});

/** Shared page header with icon, title, description, and optional back/close buttons. */
export default function PageHeader({
  title,
  description,
  icon,
  iconAlt,
  onBack,
  onClose,
  actions,
  noBorder = false,
  compact = false,
  className,
}: PageHeaderProps) {
  const styles = useStyles();

  const renderIcon = () => {
    if (!icon) return null;
    if (compact) {
      return typeof icon === "string" ? (
        <img src={icon} alt={iconAlt ?? ""} className={styles.compactIconImage} />
      ) : (
        <span className={styles.compactIcon}>{icon}</span>
      );
    }
    return (
      <div className={styles.iconContainer}>
        {typeof icon === "string" ? (
          <img
            src={icon}
            alt={iconAlt ?? ""}
            className={styles.iconImage}
          />
        ) : (
          icon
        )}
      </div>
    );
  };

  if (compact) {
    return (
      <header className={mergeClasses(noBorder ? styles.sectionNoBorder : styles.compactSection, className)}>
        <div className={styles.compactContainer}>
          {onBack && (
            <Button
              appearance="subtle"
              className={styles.backButton}
              icon={<ChevronLeft20Regular />}
              onClick={onBack}
              aria-label="Go back"
            />
          )}
          {renderIcon()}
          <Text size={400} weight="semibold" className={styles.title} style={{ flex: 1 }}>
            {title}
          </Text>
          {(actions || onClose) && (
            <div className={styles.rightSection}>
              {actions}
              {onClose && (
                <Button
                  appearance="subtle"
                  className={styles.closeButton}
                  icon={<Dismiss20Regular />}
                  onClick={onClose}
                  aria-label="Close"
                />
              )}
            </div>
          )}
        </div>
      </header>
    );
  }

  return (
    <header className={mergeClasses(noBorder ? styles.sectionNoBorder : styles.section, className)}>
      <div className={styles.container}>
        {onBack && (
          <Button
            appearance="subtle"
            className={styles.backButton}
            icon={<ChevronLeft20Regular />}
            onClick={onBack}
            aria-label="Go back"
          />
        )}

        {renderIcon()}

        <div className={styles.titleGroup}>
          <Text size={600} weight="semibold" className={styles.title}>
            {title}
          </Text>
          {description && (
            <Text size={300} className={styles.description}>
              {description}
            </Text>
          )}
        </div>

        {(actions || onClose) && (
          <div className={styles.rightSection}>
            {actions}
            {onClose && (
              <Button
                appearance="subtle"
                className={styles.closeButton}
                icon={<Dismiss20Regular />}
                onClick={onClose}
                aria-label="Close"
              />
            )}
          </div>
        )}
      </div>
    </header>
  );
}
