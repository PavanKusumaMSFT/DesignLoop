"use client";

import { makeStyles, mergeClasses, tokens as fluentTokens } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Send16Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px 20px",
    maxWidth: "900px",
    margin: "0 auto",
    width: "100%",
    minHeight: "calc(100vh - 200px)",
  },
  welcomeText: {
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "20px",
  },
  mainMessage: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    textAlign: "center",
    marginBottom: "24px",
    lineHeight: "1.4",
    maxWidth: "700px",
  },
  link: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    cursor: "pointer",
    padding: "2px 4px",
    borderRadius: "12px",
    transition: "background-color 0.2s",
    position: "relative",
    backgroundImage: `repeating-linear-gradient(to right, rgba(0, 120, 212, 0.35) 4px, rgba(0, 120, 212, 0.35) 8px, transparent 8px, transparent 10px)`,
    backgroundPosition: "0 calc(100% - 2px)",
    backgroundSize: "100% 3px",
    backgroundRepeat: "no-repeat",
    ":hover": {
      backgroundColor: "rgba(59, 130, 246, 0.04)",
    },
  },
  promptSection: {
    marginTop: "20px",
    textAlign: "center",
    maxWidth: "750px",
    width: "100%",
  },
  promptLabel: {
    fontSize: "15px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "20px",
    fontWeight: tokens.fontWeightRegular,
  },
  promptButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "center",
    marginBottom: "20px",
  },
  mainMessageSecondary: {
    marginTop: "-8px",
  },
  promptButton: {
    borderRadius: "20px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "6px 12px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
      transform: "translateY(-1px)",
    },
  },
});

interface MessageSegment {
  text: string;
  isLink?: boolean;
  onClick?: () => void;
}

interface WelcomeReturningProps {
  userName: string;
  messageSegments: MessageSegment[];
  secondaryMessage?: MessageSegment[];
  prompts: string[];
  onPromptClick: (prompt: string) => void;
  onLinkClick?: (action: string) => void;
}

/** Welcome screen for returning users with customizable message segments (supporting inline links) and flexible prompt buttons.
 * Cross-project reusable: can be imported by any project. */
export default function WelcomeReturning({
  userName,
  messageSegments,
  secondaryMessage,
  prompts,
  onPromptClick,
  onLinkClick,
}: WelcomeReturningProps) {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.welcomeText}>
        LET'S BUILD, {userName.toUpperCase()}
      </div>

      <div className={styles.mainMessage}>
        {messageSegments.map((segment, index) =>
          segment.isLink ? (
            <span
              key={index}
              className={styles.link}
              onClick={() => {
                console.log("Link clicked:", segment.text);
                segment.onClick?.();
              }}
            >
              {segment.text}
            </span>
          ) : (
            <span key={index}>{segment.text}</span>
          ),
        )}
      </div>

      {secondaryMessage && (
        <div
          className={mergeClasses(
            styles.mainMessage,
            styles.mainMessageSecondary,
          )}
        >
          {secondaryMessage.map((segment, index) =>
            segment.isLink ? (
              <span
                key={index}
                className={styles.link}
                onClick={segment.onClick}
              >
                {segment.text}
              </span>
            ) : (
              <span key={index}>{segment.text}</span>
            ),
          )}
        </div>
      )}

      <div className={styles.promptSection}>
        <div className={styles.promptButtons}>
          {prompts.map((prompt) => (
            <button
              key={prompt}
              className={styles.promptButton}
              onClick={() => onPromptClick(prompt)}
            >
              <span>{prompt}</span>
              <Send16Regular />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
