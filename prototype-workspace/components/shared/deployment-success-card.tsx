"use client";

import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  Subtitle1,
  Subtitle2,
  Body1,
  Caption1,
  Button,
  Link,
} from "@fluentui/react-components";
import {
  ChevronDown20Regular,
  ChevronRight20Regular,
  Home20Filled,
} from "@fluentui/react-icons";
import { useState, useCallback, type ReactNode } from "react";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DeploymentSection {
  /** Unique section id */
  id: string;
  /** Display label (e.g. "1. Deploy Azure resources") */
  label: string;
  /** Status icon path — defaults to "/icons/Success.svg" */
  statusIcon?: string;
  /** Whether this section is expanded by default */
  defaultExpanded?: boolean;
  /** Arbitrary content rendered inside the accordion panel */
  children?: ReactNode;
}

export interface NextStepCard {
  /** Image path (string) or React element (e.g. a Fluent icon component) */
  icon: string | ReactNode;
  iconAlt?: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export interface MoreLink {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface NextStepsConfig {
  /** Description text shown at the top of the next steps panel */
  description: string;
  /** Grid of action cards */
  cards: NextStepCard[];
  /** "More ways to optimize" link section */
  moreLinks?: MoreLink[];
  /** Title above the links — defaults to "More ways to optimize" */
  moreLinksTitle?: string;
}

export interface DeploymentSuccessCardProps {
  /** Main success title (e.g. "Your application was deployed successfully") */
  title: string;
  /** Subtitle/description below the title */
  description: string;
  /** Accordion sections */
  sections?: DeploymentSection[];
  /** Next steps — rendered as the final accordion section automatically */
  nextSteps?: NextStepsConfig;
  /** Next steps section label — defaults to "Next steps" */
  nextStepsLabel?: string;
  /** Next steps status icon — defaults to "/icons/Upsell.svg" */
  nextStepsIcon?: string;
  /** Called when Home button is clicked */
  onHome?: () => void;
  /** Called when Manage / primary action button is clicked */
  onManage?: () => void;
  /** Home button label — defaults to "Home" */
  homeLabel?: string;
  /** Primary button label — defaults to "Manage" */
  manageLabel?: string;
  /** Success icon path — defaults to "/icons/Success.svg" */
  successIcon?: string;
  /** Additional content rendered after accordion sections (e.g. drawer overlays) */
  children?: ReactNode;
  /** Root class override */
  className?: string;
}

// ─── Styles — matches deploy-step.tsx visual language ────────────────────────

const useStyles = makeStyles({
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadius2XLarge,
    boxShadow: tokens.shadow4,
    padding: tokens.spacingVerticalXXL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    width: "100%",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    width: "100%",
  },
  titleText: {
    flex: 1,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase600,
    lineHeight: tokens.lineHeightBase600,
    color: tokens.colorNeutralForeground1,
  },
  description: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  successIcon: {
    width: "28px",
    height: "28px",
  },

  // Accordion
  accordionSections: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    width: "100%",
  },
  accordionItem: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderRadius: tokens.borderRadiusMedium,
  },
  accordionHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    height: "44px",
    padding: `0 ${tokens.spacingHorizontalM}`,
    cursor: "pointer",
    borderRadius: tokens.borderRadiusMedium,
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  accordionLabel: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    color: tokens.colorNeutralForeground1,
  },
  accordionPanel: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: `0 0 ${tokens.spacingVerticalM} 0`,
    width: "100%",
  },
  accordionContent: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadius2XLarge,
    padding: tokens.spacingVerticalXL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    width: "100%",
  },
  accordionIconSm: {
    width: "20px",
    height: "20px",
  },

  // Next steps cards
  nextStepsDescription: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginBottom: tokens.spacingVerticalL,
  },
  nextStepsCardsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalL,
    width: "100%",
  },
  nextStepCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingVerticalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    cursor: "pointer",
    ":hover": {
      boxShadow: tokens.shadow4,
    },
  },
  nextStepIconContainer: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalXS,
    display: "flex",
    alignItems: "center",
    width: "fit-content",
  },
  moreSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    marginTop: tokens.spacingVerticalS,
  },
  captionSecondary: {
    color: tokens.colorNeutralForeground2,
  },

  // Footer
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

// ─── Component ───────────────────────────────────────────────────────────────

/** Deployment success card with accordion sections, next-steps grid, and footer actions.
 *  Shared building block for wizard completion pages — matches the visual pattern from DeployStep. */
export default function DeploymentSuccessCard({
  title,
  description,
  sections = [],
  nextSteps,
  nextStepsLabel = "Next steps",
  nextStepsIcon = "/icons/Upsell.svg",
  onHome,
  onManage,
  homeLabel = "Home",
  manageLabel = "Manage",
  successIcon = "/icons/Success.svg",
  children,
  className,
}: DeploymentSuccessCardProps) {
  const styles = useStyles();

  // Build expanded state from sections + nextSteps
  const initialExpanded: Record<string, boolean> = {};
  sections.forEach((s) => {
    initialExpanded[s.id] = s.defaultExpanded ?? false;
  });
  if (nextSteps) {
    initialExpanded["__nextSteps"] = true;
  }

  const [expandedSections, setExpandedSections] = useState(initialExpanded);

  const toggleSection = useCallback((id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // All accordion items: user sections + auto-generated next steps section
  const allSections = [
    ...sections,
    ...(nextSteps
      ? [
          {
            id: "__nextSteps",
            label: nextStepsLabel,
            statusIcon: nextStepsIcon,
            defaultExpanded: true,
          } as DeploymentSection,
        ]
      : []),
  ];

  return (
    <div className={mergeClasses(styles.card, className)}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <img src={successIcon} alt="Success" className={styles.successIcon} />
          <Text className={styles.titleText}>{title}</Text>
        </div>
        <Body1 className={styles.description}>{description}</Body1>
      </div>

      {/* Accordion sections */}
      {allSections.length > 0 && (
        <div className={styles.accordionSections}>
          {allSections.map((section) => {
            const isExpanded = expandedSections[section.id] ?? false;
            const isNextSteps = section.id === "__nextSteps";
            const icon = section.statusIcon ?? successIcon;

            return (
              <div key={section.id} className={styles.accordionItem}>
                <button
                  className={styles.accordionHeader}
                  onClick={() => toggleSection(section.id)}
                  type="button"
                >
                  {isExpanded ? (
                    <ChevronDown20Regular />
                  ) : (
                    <ChevronRight20Regular />
                  )}
                  <img src={icon} alt="" className={styles.accordionIconSm} />
                  <Subtitle1 className={styles.accordionLabel}>
                    {section.label}
                  </Subtitle1>
                </button>

                {isExpanded && (
                  <div className={styles.accordionPanel}>
                    {/* Custom section content */}
                    {!isNextSteps && section.children && (
                      <div className={styles.accordionContent}>
                        {section.children}
                      </div>
                    )}

                    {/* Next steps content */}
                    {isNextSteps && nextSteps && (
                      <div className={styles.accordionContent}>
                        <Body1 className={styles.nextStepsDescription}>
                          {nextSteps.description}
                        </Body1>
                        <div className={styles.nextStepsCardsRow}>
                          {nextSteps.cards.map((card) => (
                            <div
                              key={card.title}
                              className={styles.nextStepCard}
                              onClick={card.onClick}
                              onKeyDown={card.onClick ? (e) => { if (e.key === "Enter" || e.key === " ") card.onClick?.(); } : undefined}
                              role={card.onClick ? "button" : undefined}
                              tabIndex={card.onClick ? 0 : undefined}
                            >
                              <div className={styles.nextStepIconContainer}>
                                {typeof card.icon === "string" ? (
                                  <img
                                    src={card.icon}
                                    alt={card.iconAlt ?? card.title}
                                    width={34}
                                    height={34}
                                  />
                                ) : (
                                  card.icon
                                )}
                              </div>
                              <Subtitle2>{card.title}</Subtitle2>
                              <Caption1 className={styles.captionSecondary}>
                                {card.description}
                              </Caption1>
                            </div>
                          ))}
                        </div>
                        {nextSteps.moreLinks &&
                          nextSteps.moreLinks.length > 0 && (
                            <div className={styles.moreSection}>
                              <Subtitle2>
                                {nextSteps.moreLinksTitle ??
                                  "More ways to optimize"}
                              </Subtitle2>
                              {nextSteps.moreLinks.map((link) => (
                                <Link
                                  key={link.label}
                                  href={link.href ?? "#"}
                                  inline
                                  onClick={link.onClick}
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      {(onHome || onManage) && (
        <div className={styles.footer}>
          {onHome && (
            <Button
              appearance="secondary"
              icon={<Home20Filled />}
              onClick={onHome}
            >
              {homeLabel}
            </Button>
          )}
          {onManage && (
            <Button appearance="primary" onClick={onManage}>
              {manageLabel}
            </Button>
          )}
        </div>
      )}

      {/* Extra content (e.g. drawer overlays) — rendered outside card flow */}
      {children}
    </div>
  );
}
