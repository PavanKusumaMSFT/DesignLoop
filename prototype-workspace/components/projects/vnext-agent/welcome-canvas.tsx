"use client"

import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components"


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Send16Regular } from "@fluentui/react-icons"

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
    fontSize: "34px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    textAlign: "center",
    lineHeight: "1.5",
    marginBottom: "48px",
    maxWidth: "850px",
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
})

interface WelcomeCanvasProps {
  userName: string
  onLinkClick: (action: string) => void
  onPromptClick: (prompt: string) => void
}

/** Welcome screen for new users with personalized greeting, interactive links, and quick-start prompt buttons.
 * Cross-project reusable: can be imported by any project. */
export default function WelcomeCanvas({ userName, onLinkClick, onPromptClick }: WelcomeCanvasProps) {
  const styles = useStyles()

  const prompts = [
    "Help me build an AI agent",
    "Help me import existing code from Github",
    "Help me set up my Azure free account",
    "What can you do?"
  ]

  return (
    <div className={styles.container}>
      <div className={styles.welcomeText}>WELCOME, {userName.toUpperCase()}</div>
      
      <div className={styles.mainMessage}>
        To get started building with Azure, I can help you{" "}
        <span className={styles.link} role="button" tabIndex={0} onClick={() => onLinkClick("deploy template")} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onLinkClick("deploy template"); } }}>
          deploy a starter template
        </span> or{" "}
        <span className={styles.link} role="button" tabIndex={0} onClick={() => onLinkClick("suggest services")} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onLinkClick("suggest services"); } }}>
          suggest services
        </span>
        <br />
        based on your account profile.
      </div>

      <div className={styles.promptSection}>
        <div className={styles.promptLabel}>
          Interested in something else? Select a prompt to get started.
        </div>
        
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
  )
}
