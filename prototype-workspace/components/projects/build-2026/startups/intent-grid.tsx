"use client";

import { makeStyles, tokens as fluentTokens, Text, Button } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  GlobePerson20Regular,
  Code20Regular,
  Database20Regular,
  ShieldLock20Regular,
  Timer20Regular,
  Bug20Regular,
} from "@fluentui/react-icons";
import type { Intent } from "../startups-data";

const intentIcons: Record<string, React.ReactNode> = {
  "deploy-web-app": <GlobePerson20Regular />,
  "deploy-api": <Code20Regular />,
  "add-database": <Database20Regular />,
  "add-auth": <ShieldLock20Regular />,
  "background-jobs": <Timer20Regular />,
  "monitor-debug": <Bug20Regular />,
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    padding: "24px 0",
  },
  heading: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase500,
  },
  subheading: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase300,
    marginTop: "4px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxShadow:
      "0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 4px 0px rgba(0,0,0,0.14)",
    cursor: "pointer",
    transition: "box-shadow 0.15s ease",
    ":hover": {
      boxShadow: tokens.shadow16,
    },
  },
  cardIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    backgroundColor: tokens.colorBrandBackground2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorBrandForeground1,
  },
  cardTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase400,
  },
  cardDescription: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase200,
    flex: 1,
  },
  cardCta: {
    alignSelf: "flex-start",
    marginTop: "4px",
  },
});

interface Props {
  intents: Intent[];
  onSelect: (intentId: string) => void;
}

export function IntentGrid({ intents, onSelect }: Props) {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <div className={styles.heading}>Choose your goal</div>
        <div className={styles.subheading}>
          Pick what you want to build — we'll assemble a curated set of services
          and learning resources for you.
        </div>
      </div>
      <div className={styles.grid}>
        {intents.map((intent) => (
          <div
            key={intent.id}
            className={styles.card}
            onClick={() => onSelect(intent.id)}
          >
            <div className={styles.cardIcon}>
              {intentIcons[intent.id] ?? <GlobePerson20Regular />}
            </div>
            <div className={styles.cardTitle}>{intent.title}</div>
            <div className={styles.cardDescription}>{intent.description}</div>
            <Button
              appearance="primary"
              size="small"
              className={styles.cardCta}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(intent.id);
              }}
            >
              Start
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
