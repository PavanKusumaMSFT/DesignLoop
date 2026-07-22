"use client";

import React from "react";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Button as FluentButton,
} from "@fluentui/react-components";
type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Carousel,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselViewport,
  CarouselSlider,
} from "@fluentui/react-components";
import { Bot24Regular, Lightbulb24Regular } from "@fluentui/react-icons";
import { useNavigation } from "../../lib/navigation-context";

const useStyles = makeStyles({
  nextStepsCarousel: {
    marginBottom: "32px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "12px",
    padding: "24px",
    width: "100%",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
  },
  nextStepsHeader: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px",
    color: tokens.colorNeutralForeground1,
  },
  carouselSlider: {
    gap: "16px",
  },
  carouselCardWrapper: {
    maxWidth: "calc(50% - 8px)",
    minWidth: "300px",
  },
  carouselCard: {
    width: "100%",
    height: "100%",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "20px",
    padding: "16px",
    border: "none",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "rgba(59, 130, 246, 0.04)",
    },
  },
  carouselCardTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "8px",
    color: tokens.colorNeutralForeground1,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  carouselCardDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "12px",
    lineHeight: "1.5",
  },
  carouselCardProgress: {
    fontSize: "11px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "8px",
  },
  carouselCardProgressBar: {
    height: "2px",
    backgroundColor: tokens.colorNeutralBackground6,
    borderRadius: "2px",
    overflow: "hidden",
    marginBottom: "12px",
  },
  carouselCardProgressFill: {
    height: "100%",
    backgroundColor: tokens.colorBrandForeground1,
    transition: "width 0.3s ease",
  },
  carouselCardButtons: {
    display: "flex",
    gap: "8px",
    marginTop: "auto",
    marginBottom: "0px",
  },
  copilotButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    border: "1px solid transparent",
    borderRadius: "20px",
    background:
      "linear-gradient(white, white) padding-box, linear-gradient(90deg, #0078D4, #8B5CF6) border-box",
    color: tokens.colorNeutralForeground1,
    fontSize: "13px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
    width: "fit-content",
    ":hover": {
      background:
        "linear-gradient(white, white) padding-box, linear-gradient(90deg, #8B5CF6, #0078D4, #3FC150) border-box",
      transform: "translateY(-1px)",
    },
  },
  secondaryButton: {
    padding: "6px 12px",
    fontSize: "13px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "20px",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
    width: "fit-content",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      transform: "translateY(-1px)",
    },
  },
  cardHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: tokens.spacingVerticalS,
  },
  cardTitleFlex: {
    marginBottom: "0",
    flex: "1",
  },
  badgesContainer: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    flexShrink: 0,
    marginLeft: tokens.spacingHorizontalS,
  },
  badgeTag: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "16px",
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    borderRadius: "12px",
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    height: "24px",
    width: "fit-content",
    flexShrink: 0,
  },
  badgeIcon16: {
    fontSize: "16px",
    width: "16px",
    height: "16px",
  },
  badgeCritical: {
    color: tokens.colorPaletteRedForeground1,
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#fef2f2",
    // eslint-disable-next-line no-restricted-syntax
    border: "1px solid #fca5a5",
  },
  badgeDefault: {
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorBrandBackground2,
    border: `1px solid ${tokens.colorBrandStroke1}`,
  },
});

const ProgressFill: React.FC<{ progress: number; className: string }> = ({
  progress,
  className,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (ref.current) ref.current.style.width = `${progress}%`;
  }, [progress]);
  return <div className={className} ref={ref} />;
};

export interface NextStepsCard {
  title: string;
  description: string;
  progress?: number;
  badge?: string;
  badges?: string[];
  buttons: Array<{
    label: string;
    primary: boolean;
    icon?: boolean;
    onClick?: () => void;
  }>;
}

interface NextStepsCarouselProps {
  cards: NextStepsCard[];
  title?: string;
}

/** Horizontal carousel of "Next steps" cards with progress bars, badges, and CTA buttons.
 * Composed from: Fluent Carousel, CarouselCard, CarouselNav, and copilot-styled action buttons.
 * Instead of: building inline card sliders with custom scroll logic. */
export const NextStepsCarousel: React.FC<NextStepsCarouselProps> = ({
  cards,
  title = "Next steps",
}) => {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();

  return (
    <div className={styles.nextStepsCarousel}>
      <div className={styles.nextStepsHeader}>{title}</div>
      <Carousel groupSize={2} circular={false} whitespace>
        <CarouselViewport>
          <CarouselSlider className={styles.carouselSlider}>
            {cards.map((card, index) => (
              <CarouselCard
                key={index}
                aria-label={`${index + 1} of ${cards.length}`}
                className={styles.carouselCardWrapper}
              >
                <div className={styles.carouselCard}>
                  <div className={styles.cardHeaderRow}>
                    <div
                      className={`${styles.carouselCardTitle} ${styles.cardTitleFlex}`}
                    >
                      {card.title}
                    </div>
                    {(card.badges || (card.badge ? [card.badge] : [])).length >
                      0 && (
                      <div className={styles.badgesContainer}>
                        {(card.badges || [card.badge!]).map((badge, idx) => (
                          <span
                            key={idx}
                            className={mergeClasses(
                              styles.badgeTag,
                              badge === "Critical"
                                ? styles.badgeCritical
                                : styles.badgeDefault,
                            )}
                          >
                            {badge === "Critical" ? (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M8 1L1 14h14L8 1z"
                                  // eslint-disable-next-line no-restricted-syntax
                                  fill="#dc2626"
                                  // eslint-disable-next-line no-restricted-syntax
                                  stroke="#dc2626"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M8 6v3M8 11h.01"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            ) : (
                              <Lightbulb24Regular
                                className={styles.badgeIcon16}
                              />
                            )}
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={styles.carouselCardDescription}>
                    {card.description}
                  </div>
                  {card.progress !== undefined && (
                    <>
                      <div className={styles.carouselCardProgress}>
                        {card.progress}% complete
                      </div>
                      <div className={styles.carouselCardProgressBar}>
                        <ProgressFill
                          progress={card.progress}
                          className={styles.carouselCardProgressFill}
                        />
                      </div>
                    </>
                  )}
                  <div className={styles.carouselCardButtons}>
                    {card.buttons.map((button, btnIndex) =>
                      button.icon &&
                      (button.label.includes("Copilot") ||
                        button.label.includes("infrastructure agent") ||
                        button.label.includes("Review incident")) ? (
                        <button
                          key={btnIndex}
                          className={styles.copilotButton}
                          onClick={button.onClick}
                        >
                          <img
                            src="/icons/Copilot-line.svg"
                            alt="Copilot"
                            width={16}
                            height={16}
                          />
                          <span>{button.label}</span>
                        </button>
                      ) : (
                        <button
                          key={btnIndex}
                          className={styles.secondaryButton}
                          onClick={button.onClick}
                        >
                          <span>{button.label}</span>
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </CarouselCard>
            ))}
          </CarouselSlider>
        </CarouselViewport>

        <CarouselNavContainer
          layout="inline"
          next={{ "aria-label": "go to next" }}
          prev={{ "aria-label": "go to prev" }}
        >
          <CarouselNav>
            {(index) => (
              <CarouselNavButton aria-label={`Carousel Nav Button ${index}`} />
            )}
          </CarouselNav>
        </CarouselNavContainer>
      </Carousel>
    </div>
  );
};
