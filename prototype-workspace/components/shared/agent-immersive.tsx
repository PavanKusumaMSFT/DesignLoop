"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Text,
  Button,
  Input,
  Label,
  Spinner,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Dismiss24Regular,
  Send24Regular,
  Sparkle20Regular,
  PanelLeft24Regular,
  Add24Regular,
  Document24Regular,
  ThumbLike20Regular,
  ThumbDislike20Regular,
  ArrowLeft24Regular,
  Settings20Regular,
} from "@fluentui/react-icons";
import { TopNav } from "./top-nav";
import { AzureHeaderP1 } from "./azure-header-p1";

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
    height: "calc(100vh - 48px)",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  contentWrapper: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
    height: "100%",
  },
  sidebar: {
    width: "284px",
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    flexShrink: 0,
    padding: "12px 8px",
    transition: "width 0.3s ease, padding 0.3s ease",
    overflow: "auto",
    height: "100%",
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
  conversationItem: {
    padding: "12px 16px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    borderRadius: "4px",
    transition: "background-color 0.2s",
    marginLeft: "-8px",
    marginRight: "-8px",
    width: "calc(100% + 16px)",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  allConversationsLink: {
    padding: "12px 16px",
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
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
  responseTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "12px",
    display: "block",
  },
  responseDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.5",
    marginBottom: "12px",
    display: "block",
  },
  bulletList: {
    paddingLeft: "20px",
    marginBottom: "12px",
  },
  bulletItem: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.6",
    marginBottom: "4px",
  },
  costWarning: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "12px",
    display: "block",
  },
  sectionSubheader: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginTop: "16px",
    marginBottom: "8px",
    display: "block",
  },
  readmeLink: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    marginBottom: "16px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  actionButtons: {
    display: "flex",
    gap: "8px",
    marginBottom: "12px",
    flexWrap: "wrap",
    "& button": {
      whiteSpace: "nowrap",
    },
  },
  blinkingCursor: {
    display: "inline-block",
    width: "8px",
    height: "16px",
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: tokens.colorNeutralStroke1,
    animationName: {
      "0%, 49%": {
        opacity: 1,
      },
      "50%, 100%": {
        opacity: 0,
      },
    },
    animationDuration: "1s",
    animationIterationCount: "infinite",
  },
  feedbackSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "12px",
    marginBottom: "24px",
  },
  feedbackButtons: {
    display: "flex",
    gap: "4px",
  },
  criteriaButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "16px",
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
  },
  codePanel: {
    width: "0",
    backgroundColor: tokens.colorNeutralBackground1,
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transition: "width 0.3s ease-in-out",
    flexShrink: 0,
    height: "100%",
  },
  codePanelOpen: {
    width: "40%",
    minWidth: "40%",
  },
  codePanelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  codePanelTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  codePanelContent: {
    flex: 1,
    overflow: "auto",
    padding: "0",
    backgroundColor: tokens.colorNeutralBackground1,
    fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
    fontSize: "13px",
    lineHeight: "1.6",
    color: tokens.colorNeutralForeground1,
  },
  codeBlock: {
    whiteSpace: "pre",
    margin: 0,
    padding: "16px",
    counterReset: "line",
  },
  codeLine: {
    display: "block",
    paddingLeft: "60px",
    position: "relative",
  },
  lineNumber: {
    position: "absolute",
    left: "0",
    width: "50px",
    textAlign: "right",
    paddingRight: "10px",
    color: tokens.colorNeutralForeground3,
    userSelect: "none",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground1,
    overflow: "hidden",
    height: "100%",
    position: "relative",
  },
  header: {
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: tokens.colorNeutralBackground2,
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
    backgroundColor: tokens.colorNeutralBackground2,
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
    paddingBottom: "120px",
    flex: 1,
  },
  welcomeSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "60px 20px 40px",
    gap: "24px",
    flex: 1,
  },
  welcomeTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    maxWidth: "700px",
    lineHeight: "1.4",
  },
  inputSection: {
    position: "sticky",
    bottom: "0",
    left: "0",
    right: "0",
    padding: "0 24px 20px 24px",
    backgroundColor: tokens.colorNeutralBackground2,
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
    borderRadius: "30px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.14)",
    maxWidth: "888px",
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
  suggestionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
    marginTop: "32px",
    maxWidth: "1000px",
    width: "100%",
  },
  suggestionCard: {
    padding: "20px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    textAlign: "left",
    lineHeight: "1.5",
    transition: "all 0.2s",
  },
  seeMore: {
    textAlign: "center",
    marginTop: "24px",
  },
  seeMoreLink: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    textDecoration: "none",
  },
  fixedHeaderOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  fadeInAnim: {
    animationName: {
      from: { opacity: 0, transform: "translateY(10px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    animationDuration: "0.5s",
    animationTimingFunction: "ease-in",
  },
  costWarningMt: {
    marginTop: tokens.spacingVerticalL,
  },
  responseDescMt: {
    marginTop: tokens.spacingVerticalM,
  },
  actionIconStyle: {
    width: "20px",
    height: "20px",
    marginRight: "6px",
  },
  projectCardContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    padding: "0",
    marginTop: tokens.spacingVerticalL,
    overflow: "hidden",
  },
  projectCardTitle: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightSemibold,
    padding: tokens.spacingHorizontalXXL,
    paddingBottom: "0",
    margin: "0",
  },
  projectCardDivider: {
    height: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
    width: "100%",
    margin: `${tokens.spacingVerticalL} 0 0 0`,
  },
  projectCardBody: {
    padding: tokens.spacingHorizontalXXL,
  },
  projectCardDesc: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: "20px",
    marginBottom: tokens.spacingVerticalXXL,
  },
  projectCardLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalS,
    display: "block",
  },
  requiredAsterisk: {
    color: tokens.colorPaletteRedForeground1,
  },
  projectCardInput: {
    width: "100%",
    marginBottom: tokens.spacingVerticalXXL,
  },
  advancedOptionsBox: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusXLarge,
    marginBottom: tokens.spacingVerticalXXL,
  },
  advancedOptionsHeader: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalS,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  advancedOptionsText: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "18px",
  },
  projectCardActions: {
    display: "flex",
    justifyContent: "flex-start",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    margin: "0",
  },
  spinnerRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  criteriaIconSize: {
    width: "16px",
    height: "16px",
  },
  cloudShellPanel: {
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#1e1e1e",
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column" as const,
    transition: "width 0.3s ease-in-out",
    overflow: "hidden",
    flexShrink: 0,
    height: "100%",
  },
  cloudShellHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: tokens.colorNeutralForeground1,
    // eslint-disable-next-line no-restricted-syntax
    borderBottom: "1px solid #3e3e3e",
    minHeight: "48px",
    flexShrink: 0,
  },
  cloudShellTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    // eslint-disable-next-line no-restricted-syntax
    color: tokens.colorNeutralBackground1,
  },
  cloudShellCloseIcon: {
    // eslint-disable-next-line no-restricted-syntax
    color: tokens.colorNeutralBackground1,
  },
  cloudShellContent: {
    flex: 1,
    overflow: "auto",
    padding: tokens.spacingHorizontalL,
  },
  terminalFont: {
    fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
    fontSize: tokens.fontSizeBase300,
    // eslint-disable-next-line no-restricted-syntax
    color: tokens.colorNeutralStroke1,
  },
  termLine: {
    marginBottom: tokens.spacingVerticalS,
  },
  termLineSpaced: {
    marginBottom: tokens.spacingVerticalL,
  },
  termLineIndented: {
    marginBottom: tokens.spacingVerticalS,
    paddingLeft: "20px",
  },
  termLineIndentedSpaced: {
    marginBottom: tokens.spacingVerticalL,
    paddingLeft: "20px",
  },
  termCursorLine: {
    marginBottom: "4px",
  },
  termPromptUser: {
    // eslint-disable-next-line no-restricted-syntax
    color: "#4EC9B0",
  },
  termSeparator: {
    // eslint-disable-next-line no-restricted-syntax
    color: tokens.colorNeutralStroke1,
  },
  termPath: {
    // eslint-disable-next-line no-restricted-syntax
    color: "#569CD6",
  },
  termCommand: {
    // eslint-disable-next-line no-restricted-syntax
    color: "#CE9178",
  },
  termComment: {
    marginBottom: tokens.spacingVerticalS,
    // eslint-disable-next-line no-restricted-syntax
    color: "#6A9955",
  },
  termCommentSpaced: {
    marginBottom: tokens.spacingVerticalL,
    // eslint-disable-next-line no-restricted-syntax
    color: "#6A9955",
  },
  moreIconSize: {
    width: "20px",
    height: "20px",
  },
  iconDark: { filter: "invert(1) brightness(1.2)" },
  iconSm: { width: "20px", height: "20px" },
  iconXs: { width: "16px", height: "16px" },
  cloudShellPanelOpen: { width: "500px" },
  cloudShellPanelClosed: { width: "0" },
});

interface AgentImmersiveProps {
  onClose?: () => void;
  initialPrompt?: string;
  initialMessage?: string;
  viewMode?: "list" | "bubbles" | "bubbles-history" | "bubbles-history-2";
  onViewModeChange?: (
    mode: "list" | "bubbles" | "bubbles-history" | "bubbles-history-2",
  ) => void;
  vmScenario?: 1 | 2;
  onVmScenarioChange?: (scenario: 1 | 2) => void;
  isDarkMode?: boolean;
  useTopNav?: boolean;
  customHeader?: React.ReactNode | null;
}

/** Full-screen immersive Copilot agent with sidebar, multi-turn chat, and scenario-driven conversations.
 * Composed from: makeStyles shell, CopilotNavDrawer sidebar, chat messages, input bar.
 * Instead of: building a full agent page with sidebar + chat + input from scratch. */
const AgentImmersive: React.FC<AgentImmersiveProps> = ({
  onClose,
  initialPrompt,
  initialMessage,
  viewMode = "list",
  onViewModeChange,
  vmScenario = 1,
  onVmScenarioChange,
  isDarkMode = false,
  useTopNav = true,
  customHeader,
}) => {
  const styles = useStyles();
  const [activeSection, setActiveSection] = useState<
    "chat" | "researcher" | "analyst" | "infrastructure"
  >("infrastructure");
  const [inputValue, setInputValue] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showCodePanel, setShowCodePanel] = useState(false);
  const [showCloudShell, setShowCloudShell] = useState(false);
  const [showCopilotResponse, setShowCopilotResponse] = useState(false);
  const [showProjectCard, setShowProjectCard] = useState(false);
  const [projectName, setProjectName] = useState("MyDemo-Project");
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectCreated, setProjectCreated] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when component loads and show copilot response after delay
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }

    // Show copilot response after 800ms delay
    setTimeout(() => {
      setShowCopilotResponse(true);
      // Scroll to bottom again after response appears
      setTimeout(() => {
        if (chatAreaRef.current) {
          chatAreaRef.current.scrollTo({
            top: chatAreaRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }, 800);
  }, []);

  const suggestions = [
    "Create a AKS cluster to deploy and manage a scalable and secure web application for hosting a blog",
    "Restart my virtual machines in West US",
    "How can I optimize my monthly bill?",
  ];

  return (
    <div className={styles.container}>
      {/* Header - Fixed at top, outside scrolling content */}
      {customHeader === undefined && (
        <div className={styles.fixedHeaderOverlay}>
          {useTopNav ? (
            <TopNav activeLink="Build" />
          ) : (
            <AzureHeaderP1
              activeLink="Home"
              viewMode={viewMode}
              onCopilotOpen={() => {}}
            />
          )}
        </div>
      )}

      <div className={styles.contentWrapper}>
        {/* Left Sidebar */}
        <div
          className={`${styles.sidebar} ${isSidebarCollapsed ? styles.sidebarCollapsed : ""}`}
        >
          {/* Sidebar Header */}
          <div
            className={`${styles.sidebarHeader} ${isSidebarCollapsed ? styles.sidebarHeaderCollapsed : ""}`}
          >
            {!isSidebarCollapsed && (
              <div className={styles.sidebarHeaderLeft}>
                <img
                  src="/icons/copilot-icon.svg"
                  alt="Copilot"
                  className={mergeClasses(
                    styles.copilotLogo,
                    isDarkMode && styles.iconDark,
                  )}
                />
                <Text className={styles.sidebarTitle}>Copilot</Text>
              </div>
            )}
            <Button
              appearance="subtle"
              icon={
                <img
                  src="/icons/pane-sidebar.svg"
                  alt="Collapse"
                  className={mergeClasses(
                    styles.collapseIcon,
                    isDarkMode && styles.iconDark,
                  )}
                />
              }
              className={styles.headerButton}
              title={
                isSidebarCollapsed ? "Expand navigation" : "Collapse navigation"
              }
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />
          </div>

          {!isSidebarCollapsed && (
            <>
              {/* Navigation Items */}
              <div className={styles.sidebarNav}>
                <button
                  className={`${styles.navItem} ${activeSection === "chat" ? styles.navItemActive : ""}`}
                  onClick={() => setActiveSection("chat")}
                >
                  {activeSection === "chat" && (
                    <div className={styles.navItemIndicator} />
                  )}
                  <img
                    src="/icons/ChatEmpty.svg"
                    alt="Chat"
                    className={mergeClasses(
                      styles.navIcon,
                      isDarkMode && styles.iconDark,
                    )}
                  />
                  <span>Chat</span>
                </button>
              </div>

              {/* Divider */}
              <div className={styles.divider} />

              {/* Agents Section */}
              <div className={styles.sidebarNav}>
                <Text className={styles.agentsSubheader}>Agents</Text>

                <button
                  className={`${styles.navItem} ${activeSection === "infrastructure" ? styles.navItemActive : ""}`}
                  onClick={() => setActiveSection("infrastructure")}
                >
                  {activeSection === "infrastructure" && (
                    <div className={styles.navItemIndicator} />
                  )}
                  <img
                    src="/icons/AgentsColor.svg"
                    alt="Infrastructure Agent"
                    className={styles.navIcon}
                  />
                  <span>Infrastructure Agent</span>
                </button>
              </div>
            </>
          )}

          {/* Conversations Section */}
          {!isSidebarCollapsed && (
            <div className={styles.conversationsSection}>
              <Text className={styles.agentsSubheader}>Conversations</Text>

              <div className={styles.conversationItem}>
                Deploy Kubernetes cluster wi...
              </div>
              <div className={styles.conversationItem}>
                Set up CI/CD pipeline with Gi...
              </div>
              <div className={styles.conversationItem}>
                Optimize Docker container si...
              </div>
              <div className={styles.conversationItem}>
                Configure Azure App Service...
              </div>
              <div className={styles.conversationItem}>
                Implement microservices arc...
              </div>

              <a className={styles.allConversationsLink}>All conversations</a>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <Text className={styles.headerTitle}>
                {initialPrompt || "Deploy full-stack web app with CI/CD"}
              </Text>
            </div>
            <div className={styles.headerRight}>
              <Button
                appearance="subtle"
                icon={
                  <img
                    src="/icons/MoreHorizontal.svg"
                    alt="More"
                    className={mergeClasses(
                      styles.iconSm,
                      isDarkMode && styles.iconDark,
                    )}
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
                    className={mergeClasses(
                      styles.iconSm,
                      isDarkMode && styles.iconDark,
                    )}
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
                    className={mergeClasses(
                      styles.iconSm,
                      isDarkMode && styles.iconDark,
                    )}
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

          {/* Chat Area */}
          <div className={styles.chatArea} ref={chatAreaRef}>
            <div className={styles.messagesContainer}>
              {/* Conversation Panel */}
              <div className={styles.conversationPanel}>
                {/* User Message */}
                <div className={styles.userMessage}>
                  {initialMessage ||
                    (useTopNav
                      ? "I need to deploy a full-stack web application with a React frontend, Python API backend, and MongoDB database. I want to use Terraform for infrastructure as code and need a complete CI/CD pipeline configuration for automated deployments."
                      : "Make a clone of VM01")}
                </div>

                {/* Copilot Response */}
                {showCopilotResponse && (
                  <div
                    className={mergeClasses(
                      styles.copilotResponse,
                      styles.fadeInAnim,
                    )}
                  >
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

                      {useTopNav ? (
                        // Infrastructure Agent view (Sitemap POC)
                        <>
                          <Text className={styles.responseTitle}>
                            React Web App with Python API and MongoDB -
                            Terraform
                          </Text>

                          <Text className={styles.responseDescription}>
                            A production-ready blueprint for deploying a React
                            web app with Python (FastAPI) API and MongoDB
                            database on Azure. Includes sample ToDo app code and
                            complete Terraform infrastructure configuration.
                          </Text>

                          <Text className={styles.sectionSubheader}>
                            What's included:
                          </Text>

                          <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>
                              React.js web app with Python (FastAPI) API
                            </li>
                            <li className={styles.bulletItem}>
                              MongoDB API in Cosmos database
                            </li>
                            <li className={styles.bulletItem}>
                              Sample ToDo web app code
                            </li>
                            <li className={styles.bulletItem}>
                              Infrastructure as Code using Terraform
                            </li>
                          </ul>

                          <div
                            className={mergeClasses(
                              styles.costWarning,
                              styles.costWarningMt,
                            )}
                          >
                            <strong>Note:</strong> Deploying can incur costs
                          </div>

                          <div
                            className={mergeClasses(
                              styles.responseDescription,
                              styles.responseDescMt,
                            )}
                          >
                            Service groups will be created to organize resources
                            by function, providing a clear structure for your
                            deployment.
                          </div>

                          <a href="#" className={styles.readmeLink}>
                            README on GitHub ↗
                          </a>

                          <div className={styles.actionButtons}>
                            <Button
                              appearance="primary"
                              onClick={() => setShowProjectCard(true)}
                            >
                              Deploy
                            </Button>
                            <Button
                              appearance="outline"
                              onClick={() => setShowCodePanel(!showCodePanel)}
                            >
                              <Document24Regular
                                className={styles.actionIconStyle}
                              />
                              View Terraform script
                            </Button>
                            <Button appearance="outline">
                              Open in VS Code Web
                            </Button>
                          </div>
                        </>
                      ) : (
                        // VM1 Clone view (Search/Usertest)
                        <>
                          <Text className={styles.responseTitle}>
                            VM01 Clone Configuration
                          </Text>

                          <Text className={styles.responseDescription}>
                            I can help you create an identical copy of VM01,
                            including its configuration, disks, and network
                            settings. The cloned VM will be created in the same
                            resource group with a new name.
                          </Text>

                          <Text className={styles.sectionSubheader}>
                            What will be cloned:
                          </Text>

                          <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>
                              VM size and configuration (Standard_D2s_v3)
                            </li>
                            <li className={styles.bulletItem}>
                              Operating system disk and data disks
                            </li>
                            <li className={styles.bulletItem}>
                              Network interface and security group settings
                            </li>
                            <li className={styles.bulletItem}>
                              Tags and metadata
                            </li>
                          </ul>

                          <div
                            className={mergeClasses(
                              styles.costWarning,
                              styles.costWarningMt,
                            )}
                          >
                            <strong>Note:</strong> Cloning will create new
                            resources and incur additional costs
                          </div>

                          <Text className={styles.sectionSubheader}>
                            Recommended next steps:
                          </Text>

                          <ul className={styles.bulletList}>
                            <li className={styles.bulletItem}>
                              Choose a name for the cloned VM
                            </li>
                            <li className={styles.bulletItem}>
                              Select target resource group (default: same as
                              VM01)
                            </li>
                            <li className={styles.bulletItem}>
                              Review and confirm configuration
                            </li>
                          </ul>

                          <div className={styles.actionButtons}>
                            <Button appearance="primary">Clone VM</Button>
                            <Button
                              appearance="outline"
                              onClick={() => setShowCodePanel(!showCodePanel)}
                            >
                              <Document24Regular
                                className={styles.actionIconStyle}
                              />
                              View Bicep template
                            </Button>
                            <Button
                              appearance="outline"
                              onClick={() => setShowCloudShell(!showCloudShell)}
                            >
                              Open CloudShell
                            </Button>
                          </div>
                        </>
                      )}

                      <div className={styles.feedbackSection}>
                        <Button
                          appearance="subtle"
                          size="small"
                          icon={<ThumbLike20Regular />}
                          title="Like"
                        />
                        <Button
                          appearance="subtle"
                          size="small"
                          icon={<ThumbDislike20Regular />}
                          title="Dislike"
                        />
                        <div className={styles.criteriaButton}>
                          <img
                            src="/icons/Agents.svg"
                            alt="Criteria"
                            className={mergeClasses(
                              styles.iconXs,
                              isDarkMode && styles.iconDark,
                            )}
                          />
                          <span>Criteria</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Project Creation Card */}
                {showProjectCard && (
                  <div
                    className={mergeClasses(
                      styles.copilotResponse,
                      styles.fadeInAnim,
                    )}
                  >
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

                      {/* White Card Container */}
                      <div className={styles.projectCardContainer}>
                        {/* Card Header */}
                        <div className={styles.projectCardTitle}>
                          Create a project
                        </div>

                        {/* Divider */}
                        <div className={styles.projectCardDivider} />

                        {/* Card Body */}
                        <div className={styles.projectCardBody}>
                          <div className={styles.projectCardDesc}>
                            Projects help you organize and manage resources that
                            share a common purpose or workload. Group related
                            resources, subscriptions, and services together for
                            easier monitoring and collaboration.
                          </div>

                          <Label className={styles.projectCardLabel}>
                            Project{" "}
                            <span className={styles.requiredAsterisk}>*</span>
                          </Label>
                          <Input
                            className={styles.projectCardInput}
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Enter project name"
                            disabled={isCreatingProject}
                            required
                          />

                          <div className={styles.advancedOptionsBox}>
                            <div className={styles.advancedOptionsHeader}>
                              <span>Advanced options</span>
                              <Settings20Regular />
                            </div>
                            <div className={styles.advancedOptionsText}>
                              We'll set up a new project for you with defaults
                              selected for optimal functionality.
                            </div>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className={styles.projectCardActions}>
                          <Button
                            appearance="primary"
                            onClick={async () => {
                              if (!projectName.trim()) return;
                              setIsCreatingProject(true);
                              await new Promise((resolve) =>
                                setTimeout(resolve, 2000),
                              );
                              setProjectCreated(true);
                              setShowCloudShell(true);
                            }}
                            disabled={
                              !projectName.trim() ||
                              isCreatingProject ||
                              projectCreated
                            }
                          >
                            {isCreatingProject ? (
                              <div className={styles.spinnerRow}>
                                <Spinner size="tiny" />
                                <span>Creating...</span>
                              </div>
                            ) : (
                              "Create project and deploy workload"
                            )}
                          </Button>
                          <Button
                            appearance="secondary"
                            onClick={() => {
                              setShowProjectCard(false);
                              setProjectName("MyDemo-Project");
                              setIsCreatingProject(false);
                            }}
                            disabled={isCreatingProject}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>

                      <div className={styles.feedbackSection}>
                        <Button
                          appearance="subtle"
                          size="small"
                          icon={<ThumbLike20Regular />}
                          title="Like"
                        />
                        <Button
                          appearance="subtle"
                          size="small"
                          icon={<ThumbDislike20Regular />}
                          title="Dislike"
                        />
                        <div className={styles.criteriaButton}>
                          <img
                            src="/icons/Agents.svg"
                            alt="Criteria"
                            className={mergeClasses(
                              styles.iconXs,
                              isDarkMode && styles.iconDark,
                            )}
                          />
                          <span>Criteria</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input Section - Fixed at bottom of chat area */}
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
                      className={mergeClasses(
                        styles.agentButtonIcon,
                        isDarkMode && styles.iconDark,
                      )}
                    />
                    <span>Agent</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Panel */}
        <div
          className={`${styles.codePanel} ${showCodePanel ? styles.codePanelOpen : ""}`}
        >
          <div className={styles.codePanelHeader}>
            <Text className={styles.codePanelTitle}>
              {useTopNav
                ? "Terraform script: main.tf"
                : "Bicep template: vm-clone.bicep"}
            </Text>
            <Button
              appearance="subtle"
              icon={<Dismiss24Regular />}
              onClick={() => setShowCodePanel(false)}
              title="Close"
            />
          </div>
          <div className={styles.codePanelContent}>
            {useTopNav ? (
              // Infrastructure Agent - Terraform code
              <pre className={styles.codeBlock}>{`1   locals {
2     tags                          = { azd-env-name : var.environment_name }
3     sha                           = base64encode(sha256("\${var.environment_name}\${var.location}\${data.azurerm_client_config.current.subscription_id}"))
4     resource_token                = substr(replace(lower(local.sha), "[^A-Za-z0-9_]", ""), 0, 13)
5     api_command_line              = "gunicorn --workers 4 --threads 2 --timeout 60 --access-logfile"
6     cosmos_connection_string_key  = "AZURE-COSMOS-CONNECTION-STRING"
7   }
8   
9   #
10  # Deploy resource Group
11  #
12  
13  resource "azurerm_resource_group" "rg" {
14    name     = "\${var.environment_name}-\${var.location}"
15    location = var.location
16    tags     = local.tags
17  }
18  
19  #
20  # Deploy application insights
21  #
22  
23  module "applicationinsights" {
24    source              = "./modules/applicationinsights"
25    location            = var.location
26    rg_name             = azurerm_resource_group.rg_name.result
27    environment_name    = var.environment_name
28    workspace_id        = module.loganalytics.LOGANALYTICS_WORKSPACE_ID
29    tags                = local.tags
30    resource_token      = local.resource_token
31  }
32  
33  #
34  # Deploy log analytics
35  #
36  
37  module "loganalytics" {
38    source              = "./modules/loganalytics"
39    location            = var.location
40    rg_name             = azurerm_resource_group.rg_name.result
41    tags                = local.tags
42  }`}</pre>
            ) : (
              // VM1 Clone - Bicep code
              <pre className={styles.codeBlock}>{`1   // Parameters
2   param vmName string = 'VM01-clone'
3   param location string = resourceGroup().location
4   param vmSize string = 'Standard_D2s_v3'
5   
6   // Variables
7   var nicName = '\${vmName}-nic'
8   var osDiskName = '\${vmName}-osdisk'
9   var sourceVmId = resourceId('Microsoft.Compute/virtualMachines', 'VM01')
10  
11  // Network Interface
12  resource networkInterface 'Microsoft.Network/networkInterfaces@2023-04-01' = {
13    name: nicName
14    location: location
15    properties: {
16      ipConfigurations: [
17        {
18          name: 'ipconfig1'
19          properties: {
20            subnet: {
21              id: reference(sourceVmId, '2023-03-01').networkProfile.networkInterfaces[0].id
22            }
23            privateIPAllocationMethod: 'Dynamic'
24          }
25        }
26      ]
27    }
28  }
29  
30  // Virtual Machine
31  resource virtualMachine 'Microsoft.Compute/virtualMachines@2023-03-01' = {
32    name: vmName
33    location: location
34    properties: {
35      hardwareProfile: {
36        vmSize: vmSize
37      }
38      storageProfile: {
39        imageReference: {
40          id: reference(sourceVmId, '2023-03-01').storageProfile.imageReference.id
41        }
42        osDisk: {
43          name: osDiskName
44          createOption: 'FromImage'
45          managedDisk: {
46            storageAccountType: 'Premium_LRS'
47          }
48        }
49      }
50      networkProfile: {
51        networkInterfaces: [
52          {
53            id: networkInterface.id
54          }
55        ]
56      }
57    }
58  }
59  
60  // Output
61  output vmId string = virtualMachine.id
62  output vmName string = virtualMachine.name
63  output vmLocation string = virtualMachine.location`}</pre>
            )}
          </div>
        </div>

        {/* CloudShell Panel */}
        <div
          className={mergeClasses(
            styles.cloudShellPanel,
            showCloudShell
              ? styles.cloudShellPanelOpen
              : styles.cloudShellPanelClosed,
          )}
        >
          <div className={styles.cloudShellHeader}>
            <Text className={styles.cloudShellTitle}>CloudShell - Bash</Text>
            <Button
              appearance="subtle"
              icon={<Dismiss24Regular className={styles.cloudShellCloseIcon} />}
              onClick={() => setShowCloudShell(false)}
              title="Close"
            />
          </div>
          <div className={styles.cloudShellContent}>
            <div className={styles.terminalFont}>
              {useTopNav ? (
                // Infrastructure Agent - Terraform deployment
                <>
                  <div className={styles.termLine}>
                    <span className={styles.termPromptUser}>
                      user@cloudshell
                    </span>
                    <span className={styles.termSeparator}>:</span>
                    <span className={styles.termPath}>~</span>
                    <span className={styles.termSeparator}>$ </span>
                    <span className={styles.termCommand}>terraform init</span>
                  </div>
                  <div className={styles.termComment}>
                    # Initializing Terraform...
                  </div>
                  <div className={styles.termCommentSpaced}>
                    # Terraform has been successfully initialized!
                  </div>

                  <div className={styles.termLine}>
                    <span className={styles.termPromptUser}>
                      user@cloudshell
                    </span>
                    <span className={styles.termSeparator}>:</span>
                    <span className={styles.termPath}>~</span>
                    <span className={styles.termSeparator}>$ </span>
                    <span className={styles.termCommand}>terraform plan</span>
                  </div>
                  <div className={styles.termComment}>
                    # Planning infrastructure deployment...
                  </div>
                  <div className={styles.termComment}>
                    # Plan: 15 to add, 0 to change, 0 to destroy
                  </div>
                  <div className={styles.termCommentSpaced}>
                    # Resources: App Service, Cosmos DB, Application Insights,
                    Log Analytics
                  </div>

                  <div className={styles.termLine}>
                    <span className={styles.termPromptUser}>
                      user@cloudshell
                    </span>
                    <span className={styles.termSeparator}>:</span>
                    <span className={styles.termPath}>~</span>
                    <span className={styles.termSeparator}>$ </span>
                    <span className={styles.termCommand}>
                      terraform apply -auto-approve
                    </span>
                  </div>
                  <div className={styles.termComment}>
                    # Deploying React web app with Python API and MongoDB...
                  </div>
                  <div className={styles.termComment}>
                    # Creating resource group...
                  </div>
                  <div className={styles.termComment}>
                    # Provisioning Cosmos DB...
                  </div>
                  <div className={styles.termCommentSpaced}>
                    # Deployment in progress...
                  </div>
                </>
              ) : (
                // VM1 Clone - Azure CLI
                <>
                  <div className={styles.termLine}>
                    <span className={styles.termPromptUser}>
                      user@cloudshell
                    </span>
                    <span className={styles.termSeparator}>:</span>
                    <span className={styles.termPath}>~</span>
                    <span className={styles.termSeparator}>$ </span>
                    <span className={styles.termCommand}>az vm create \</span>
                  </div>
                  <div className={styles.termLineIndented}>
                    <span className={styles.termCommand}>
                      {" "}
                      --resource-group RG1 \
                    </span>
                  </div>
                  <div className={styles.termLineIndented}>
                    <span className={styles.termCommand}>
                      {" "}
                      --name VM01-clone \
                    </span>
                  </div>
                  <div className={styles.termLineIndented}>
                    <span className={styles.termCommand}>
                      {" "}
                      --image UbuntuLTS \
                    </span>
                  </div>
                  <div className={styles.termLineIndented}>
                    <span className={styles.termCommand}>
                      {" "}
                      --size Standard_D2s_v3 \
                    </span>
                  </div>
                  <div className={styles.termLineIndentedSpaced}>
                    <span className={styles.termCommand}>
                      {" "}
                      --admin-username azureuser
                    </span>
                  </div>

                  <div className={styles.termComment}>
                    # Creating VM01-clone...
                  </div>
                  <div className={styles.termComment}>
                    # Allocating resources...
                  </div>
                  <div className={styles.termCommentSpaced}>
                    # VM created successfully
                  </div>
                </>
              )}

              <div className={styles.termCursorLine}>
                <span className={styles.termPromptUser}>user@cloudshell</span>
                <span className={styles.termSeparator}>:</span>
                <span className={styles.termPath}>~</span>
                <span className={styles.termSeparator}>$ </span>
                <span className={styles.blinkingCursor}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AgentImmersive);
