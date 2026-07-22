"use client";

import React, { useState, useRef } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Input,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Dismiss24Regular,
  Send24Regular,
  ArrowLeft24Regular,
  PanelLeft24Regular,
  Add24Regular,
  Sparkle20Regular,
} from "@fluentui/react-icons";
import WelcomeCanvas from "../projects/vnext-agent/welcome-canvas";

const useStyles = makeStyles({
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(10px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  container: {
    position: "fixed",
    top: "48px",
    left: 0,
    right: 0,
    bottom: "80px",
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 2000,
  },
  contentWrapper: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
    height: "100%",
  },
  sidebar: {
    width: "260px",
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    flexShrink: 0,
    padding: "12px 8px",
    transition: "width 0.3s ease, padding 0.3s ease",
    overflow: "hidden",
    height: "100%",
    position: "sticky",
    top: 0,
  },
  sidebarCollapsed: {
    width: "56px",
    padding: "12px 4px",
    backgroundColor: "transparent",
    borderRight: "none",
  },
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 12px",
    width: "100%",
  },
  sidebarHeaderCollapsed: {
    justifyContent: "center",
    padding: "8px 0",
  },
  sidebarHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  copilotLogo: {
    width: "24px",
    height: "24px",
  },
  sidebarTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  sidebarNav: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "4px",
  },
  navItem: {
    display: "flex",
    padding: "8px 16px",
    alignItems: "center",
    gap: "8px",
    flex: "1 0 0",
    borderRadius: "12px",
    border: `1px solid transparent`,
    background: "transparent",
    cursor: "pointer",
    position: "relative",
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    width: "100%",
    textAlign: "left",
    minHeight: "44px",
  },
  navItemActive: {
    backgroundColor: tokens.colorNeutralBackground4Selected,
    border: `1px solid ${tokens.colorNeutralStrokeAlpha}`,
  },
  navIcon: {
    width: "20px",
    height: "20px",
    flexShrink: 0,
  },
  collapseIcon: {
    width: "20px",
    height: "20px",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground1,
    overflow: "hidden",
    height: "100%",
    position: "relative",
    boxShadow: tokens.shadow4,
    borderRadius: "12px",
    margin: "12px",
  },
  header: {
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: tokens.colorNeutralBackground1,
    minHeight: "64px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    flexShrink: 0,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  headerTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    lineHeight: "20px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  headerButton: {
    minWidth: "32px",
    height: "32px",
  },
  newChatButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    fontSize: "14px",
    fontWeight: tokens.fontWeightRegular,
  },
  chatArea: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground1,
    flex: 1,
    overflow: "auto",
    padding: "24px",
    paddingTop: "24px",
    paddingBottom: "0",
    minHeight: 0,
    position: "relative",
  },
  messagesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    flex: 1,
    paddingBottom: "100px",
  },
  conversationPanel: {
    padding: "24px",
    paddingTop: "0px",
    maxWidth: "888px",
    margin: "0 auto",
    width: "100%",
  },
  userMessage: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    marginBottom: "24px",
    padding: "12px 16px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "18px 18px 4px 18px",
    maxWidth: "80%",
    marginLeft: "auto",
    alignSelf: "flex-end",
    width: "fit-content",
  },
  copilotResponse: {
    display: "flex",
    gap: "12px",
    marginBottom: "16px",
    maxWidth: "100%",
    animationName: "fadeIn",
    animationDuration: "0.5s",
    animationTimingFunction: "ease-in",
  },
  copilotAvatar: {
    width: "24px",
    height: "24px",
    flexShrink: 0,
  },
  responseContent: {
    flex: 1,
  },
  responseHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  copilotLabel: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  aiDisclaimer: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  inputSection: {
    position: "sticky",
    bottom: "80px",
    left: "0",
    right: "0",
    padding: "0 24px 20px 24px",
    backgroundColor: tokens.colorNeutralBackground1,
    zIndex: 100,
    pointerEvents: "none",
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "32px",
    maxWidth: "784px",
    width: "100%",
    margin: "0 auto",
    pointerEvents: "auto",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  inputField: {
    flex: 1,
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
  },
  inputActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  addButton: {
    minWidth: "32px",
    height: "32px",
  },
  sendButton: {
    minWidth: "32px",
    height: "32px",
  },
});

interface AgentWelcomeProps {
  onClose: () => void;
  userName?: string;
}

/** Agent welcome screen with sidebar, welcome canvas, and conversation starter input.
 * Composed from: makeStyles shell, WelcomeCanvas, sidebar nav, chat input.
 * Instead of: building an agent onboarding/landing page from scratch. */
export default function AgentWelcome({
  onClose,
  userName = "Connie",
}: AgentWelcomeProps) {
  const styles = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [showConversation, setShowConversation] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = (action: string) => {
    console.log("Link clicked:", action);
    setUserPrompt(action);
    setShowConversation(true);
  };

  const handlePromptClick = (prompt: string) => {
    console.log("Prompt clicked:", prompt);
    setUserPrompt(prompt);
    setShowConversation(true);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setUserPrompt(inputValue);
      setShowConversation(true);
      setInputValue("");
    }
  };

  const handleBack = () => {
    setShowConversation(false);
    setUserPrompt("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        {/* Sidebar */}
        <div
          className={`${styles.sidebar} ${isSidebarCollapsed ? styles.sidebarCollapsed : ""}`}
        >
          <div
            className={`${styles.sidebarHeader} ${isSidebarCollapsed ? styles.sidebarHeaderCollapsed : ""}`}
          >
            {!isSidebarCollapsed && (
              <div className={styles.sidebarHeaderLeft}>
                <img
                  src="/icons/AgentsColor.svg"
                  alt="Azure Copilot"
                  className={styles.copilotLogo}
                />
                <Text className={styles.sidebarTitle}>Azure Copilot</Text>
              </div>
            )}
            <Button
              appearance="subtle"
              icon={<PanelLeft24Regular />}
              className={styles.collapseIcon}
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />
          </div>

          {!isSidebarCollapsed && (
            <div className={styles.sidebarNav}>
              <button
                className={`${styles.navItem} ${styles.navItemActive}`}
                onClick={handleBack}
              >
                <Sparkle20Regular className={styles.navIcon} />
                <span>New conversation</span>
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <div className={styles.headerTitle}>
                {showConversation ? "Conversation" : "New conversation"}
              </div>
            </div>
            <div className={styles.headerRight}>
              <Button
                appearance="subtle"
                icon={<Dismiss24Regular />}
                className={styles.headerButton}
                onClick={onClose}
              />
            </div>
          </div>

          <div className={styles.chatArea} ref={chatAreaRef}>
            <div className={styles.messagesContainer}>
              {!showConversation ? (
                /* Welcome Canvas */
                <WelcomeCanvas
                  userName={userName}
                  onLinkClick={handleLinkClick}
                  onPromptClick={handlePromptClick}
                />
              ) : (
                /* Conversation Panel */
                <div className={styles.conversationPanel}>
                  {/* User Message */}
                  <div className={styles.userMessage}>{userPrompt}</div>

                  {/* Copilot Response Placeholder */}
                  <div className={styles.copilotResponse}>
                    <img
                      src="/icons/AgentsColor.svg"
                      alt="Copilot"
                      className={styles.copilotAvatar}
                    />
                    <div className={styles.responseContent}>
                      <div className={styles.responseHeader}>
                        <Text className={styles.copilotLabel}>Copilot</Text>
                        <Text className={styles.aiDisclaimer}>
                          AI-generated content may be incorrect
                        </Text>
                      </div>

                      <Text>
                        I'm working on your request: "{userPrompt}". This is a
                        placeholder response for scenario 4.
                      </Text>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className={styles.inputSection}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputRow}>
                <input
                  className={styles.inputField}
                  placeholder="Ask a follow-up question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className={styles.inputActions}>
                  <Button
                    appearance="subtle"
                    icon={<Add24Regular />}
                    className={styles.addButton}
                  />
                  <Button
                    appearance="primary"
                    icon={<Send24Regular />}
                    className={styles.sendButton}
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
