"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  Button,
} from "@fluentui/react-components";
type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Dismiss24Regular,
  Add24Regular,
  ChevronDown20Regular,
} from "@fluentui/react-icons";
import WelcomeCanvas from "../projects/vnext-agent/welcome-canvas";

// Copy ALL styles from agent-immersive-vnext.tsx (lines 44-600)
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
  "@keyframes fadeInCards": {
    from: {
      opacity: 0,
      transform: "translateY(20px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  cardFadeIn: {
    animationName: "fadeInCards",
    animationDuration: "0.5s",
    animationTimingFunction: "ease-out",
    animationFillMode: "forwards",
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
    zIndex: 50,
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
    padding: "12px 16px",
    alignItems: "center",
    gap: "8px",
    flex: "1 0 0",
    borderRadius: "12px",
    border: `1px solid transparent`,
    background: "transparent",
    cursor: "pointer",
    position: "relative",
    fontSize: "16px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    width: "100%",
    textAlign: "left",
    minHeight: "44px",
  },
  navItemActive: {
    backgroundColor: tokens.colorNeutralBackground4Selected,
    border: `1px solid ${tokens.colorNeutralStrokeAlpha}`,
  },
  navItemIndicator: {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: "3px",
    height: "20px",
    backgroundColor: tokens.colorBrandForeground1,
    borderRadius: "999px",
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
  divider: {
    height: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
    margin: "12px 0",
    marginBottom: "-38px",
  },
  agentsSubheader: {
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    padding: "8px 16px",
  },
  conversationsSection: {
    marginTop: "24px",
    display: "flex",
    flexDirection: "column",
  },
  conversationsSectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    borderRadius: "4px",
  },
  conversationsSectionTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  conversationsContent: {
    display: "flex",
    flexDirection: "column",
    marginTop: "4px",
  },
  navLink: {
    display: "flex",
    padding: "12px 16px",
    alignItems: "center",
    gap: "8px",
    borderRadius: "4px",
    background: "transparent",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    width: "100%",
    textAlign: "left",
    border: "none",
    minHeight: "44px",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  conversationItem: {
    padding: "12px 16px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground4,
    transition: "background-color 0.2s",
    marginBottom: "8px",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground4Hover,
    },
  },
  allConversationsLink: {
    padding: "12px 16px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    textDecoration: "none",
    display: "block",
    "&:hover": {
      textDecoration: "none",
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    borderRadius: "4px",
  },
  conversationPanel: {
    padding: "24px",
    paddingTop: "0px",
    maxWidth: "888px",
    margin: "0 auto",
    width: "100%",
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
  agentButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
  },
  agentButtonIcon: {
    width: "20px",
    height: "20px",
  },
  sendButton: {
    minWidth: "32px",
    height: "32px",
  },
  containerFullHeight: {
    height: "calc(100vh - 48px)",
  },
  collapseButton: {
    minWidth: "32px",
    height: "32px",
  },
  iconImg20: {
    width: "20px",
    height: "20px",
  },
  chevronIcon: {
    transitionProperty: "transform",
    transitionDuration: "0.2s",
    transitionTimingFunction: "ease",
  },
  chevronCollapsed: {
    transform: "rotate(-90deg)",
  },
  chevronExpanded: {
    transform: "rotate(0deg)",
  },
});

interface AgentWelcomeProps {
  onClose?: () => void;
  userName?: string;
}

/** Clean/minimal agent welcome variant with sidebar, conversations list, and welcome canvas.
 * Composed from: makeStyles shell, collapsible sidebar with conversation history, WelcomeCanvas.
 * Instead of: duplicating agent onboarding layout with conversation management inline. */
const AgentWelcome: React.FC<AgentWelcomeProps> = ({
  onClose,
  userName = "Connie",
}) => {
  const styles = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isConversationsCollapsed, setIsConversationsCollapsed] =
    useState(false);

  // Conversation title (matches header)
  const conversationTitle = "New conversation";

  // Truncate conversation title for sidebar (22 chars + ...)
  const truncatedTitle =
    conversationTitle.length > 22
      ? conversationTitle.substring(0, 22) + "..."
      : conversationTitle;

  const handleLinkClick = (linkText: string) => {
    console.log("Link clicked:", linkText);
  };

  const handlePromptClick = (promptText: string) => {
    console.log("Prompt clicked:", promptText);
  };

  return (
    <div className={`${styles.container} ${styles.containerFullHeight}`}>
      <div className={styles.contentWrapper}>
        {/* Left Sidebar - EXACT COPY from agent-immersive-vnext */}
        <div
          className={`${styles.sidebar} ${isSidebarCollapsed ? styles.sidebarCollapsed : ""}`}
        >
          <div
            className={`${styles.sidebarHeader} ${isSidebarCollapsed ? styles.sidebarHeaderCollapsed : ""}`}
          >
            {!isSidebarCollapsed && (
              <div className={styles.sidebarHeaderLeft}>
                <img
                  src="/icons/copilot-icon.svg"
                  alt="Copilot"
                  className={styles.copilotLogo}
                />
                <Text className={styles.sidebarTitle}>Azure Copilot</Text>
              </div>
            )}
            <Button
              appearance="subtle"
              icon={
                <img
                  src="/icons/pane-sidebar.svg"
                  alt="Collapse"
                  className={styles.collapseIcon}
                />
              }
              className={styles.collapseButton}
              title={
                isSidebarCollapsed ? "Expand navigation" : "Collapse navigation"
              }
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />
          </div>

          {!isSidebarCollapsed && (
            <>
              <div className={styles.sidebarNav}>
                <button className={`${styles.navItem} ${styles.navItemActive}`}>
                  <div className={styles.navItemIndicator} />
                  <span>New conversation</span>
                </button>
              </div>

              {/* Divider */}
              <div className={styles.divider} />

              <div className={styles.sidebarNav}>
                <button className={styles.navLink}>
                  <span>Activity</span>
                </button>

                <button className={styles.navLink}>
                  <span>Your agents</span>
                </button>

                <button className={styles.navLink}>
                  <span>Agent store</span>
                </button>
              </div>

              {/* Divider */}
              <div className={styles.divider} />

              {/* Conversations Section */}
              <div className={styles.conversationsSection}>
                <div
                  className={styles.conversationsSectionHeader}
                  onClick={() =>
                    setIsConversationsCollapsed(!isConversationsCollapsed)
                  }
                >
                  <Text className={styles.conversationsSectionTitle}>
                    Conversations
                  </Text>
                  <ChevronDown20Regular
                    className={mergeClasses(
                      styles.chevronIcon,
                      isConversationsCollapsed
                        ? styles.chevronCollapsed
                        : styles.chevronExpanded,
                    )}
                  />
                </div>

                {!isConversationsCollapsed && (
                  <div className={styles.conversationsContent}>
                    <div className={styles.conversationItem}>
                      {truncatedTitle}
                    </div>

                    <a className={styles.allConversationsLink}>
                      All conversations
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Main Content - EXACT COPY from agent-immersive-vnext */}
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <Text className={styles.headerTitle}>New conversation</Text>
            </div>
            <div className={styles.headerRight}>
              <Button
                appearance="subtle"
                icon={
                  <img
                    src="/icons/MoreHorizontal.svg"
                    alt="More"
                    className={styles.iconImg20}
                  />
                }
                className={styles.headerButton}
                title="More options"
              />
              <Button
                appearance="outline"
                icon={
                  <img
                    src="/icons/ChatAdd.svg"
                    alt="New chat"
                    className={styles.iconImg20}
                  />
                }
                className={styles.newChatButton}
                title="New chat"
              >
                New chat
              </Button>
              <Button
                appearance="subtle"
                icon={
                  <img
                    src="/icons/Panel.svg"
                    alt="Panel"
                    className={styles.iconImg20}
                  />
                }
                className={styles.headerButton}
                title="Toggle panel"
              />
              <Button
                appearance="subtle"
                icon={<Dismiss24Regular />}
                className={styles.headerButton}
                onClick={onClose}
                title="Close"
              />
            </div>
          </div>

          <div className={styles.chatArea}>
            <div className={styles.messagesContainer}>
              <div className={styles.conversationPanel}>
                <WelcomeCanvas
                  userName={userName}
                  onLinkClick={handleLinkClick}
                  onPromptClick={handlePromptClick}
                />
              </div>
            </div>

            {/* Input Section - EXACT COPY from agent-immersive-vnext */}
            <div className={styles.inputSection}>
              <div className={styles.inputWrapper}>
                <div className={styles.inputRow}>
                  <input
                    type="text"
                    placeholder="I want to..."
                    className={styles.inputField}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
                <div className={styles.inputActions}>
                  <Button
                    appearance="subtle"
                    icon={<Add24Regular />}
                    className={styles.addButton}
                    title="Add attachment"
                  />
                  <button className={styles.agentButton}>
                    <img
                      src="/icons/Agents.svg"
                      alt="Agent"
                      className={styles.agentButtonIcon}
                    />
                    <span>Agent</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AgentWelcome);
