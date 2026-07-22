"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  Button as FluentButton,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  News24Regular,
  Money24Regular,
  Edit24Regular,
} from "@fluentui/react-icons";
import { CopilotSVGIcon } from "../../shared/copilot-svg-icon";
import { NextStepsCard } from "../../shared/next-steps-carousel";

const useStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "32px",
    marginTop: "40px",
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
  },
  header: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px",
    color: tokens.colorNeutralForeground1,
  },
  cardGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  card: {
    backgroundColor: tokens.colorNeutralBackground2,
    border: "none",
    borderRadius: "20px",
    padding: "20px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "16px",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "rgba(59, 130, 246, 0.04)",
    },
  },
  iconWrapper: {
    fontSize: "32px",
    color: tokens.colorNeutralForeground1,
    marginBottom: "0px",
  },
  iconSize: {
    width: "32px",
    height: "32px",
  },
  cardHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    width: "100%",
  },
  cardTitleRow: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    width: "100%",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  badge: {
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    padding: "4px 8px",
    borderRadius: "4px",
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    border: `1px solid ${tokens.colorBrandForeground1}`,
    whiteSpace: "nowrap",
  },
  cardDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "20px",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "auto",
    alignItems: "center",
  },
  copilotButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "6px 12px",
    border: "1px solid #464FEB",
    borderRadius: "24px",
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "normal",
    transition: "all 0.2s ease",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  secondaryButton: {
    width: "100%",
  },
});

interface NextStepsCardGroupProps {
  cards: NextStepsCard[];
}

const iconMap = {
  "What's new": News24Regular,
  "Explore pricing options": Money24Regular,
  "Customize your learning": Edit24Regular,
};

export function NextStepsCardGroup({ cards }: NextStepsCardGroupProps) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.header}>Get started with Azure</div>
      <div className={styles.cardGroup}>
        {cards.map((card, index) => {
          const IconComponent =
            iconMap[card.title as keyof typeof iconMap] || News24Regular;

          return (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                <IconComponent className={styles.iconSize} />
              </div>

              <div className={styles.cardHeader}>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardDescription}>{card.description}</div>
              </div>

              <div className={styles.buttonGroup}>
                {card.buttons
                  .filter((button) => button.icon)
                  .map((button, btnIndex) => (
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
                      {button.label}
                    </button>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
