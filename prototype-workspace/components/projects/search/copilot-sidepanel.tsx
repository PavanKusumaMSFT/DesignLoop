"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { makeStyles, tokens as fluentTokens, Avatar } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Dismiss24Regular,
  Send24Regular,
  ThumbLike20Regular,
  ThumbDislike20Regular,
  ArrowMaximize20Regular,
  MoreHorizontal24Regular,
  Add20Regular,
  Mic20Regular,
} from "@fluentui/react-icons";

// Content mapping for different prompts (from copilot-immersive.tsx)
const promptContent: Record<string, any> = {
  "Visualize RG1 architecture map": {
    userMessage: "Visualize RG1 architecture map",
    copilotResponse: {
      text: "Here's the architecture for your RG1 resource group in West US. I've mapped out how your virtual machines, databases, and services connect within the network.",
      image: "/rg1-architecture.png",
    },
    suggestions: [
      "Check RG1 for cost and performance",
      "Visualize RG1 topology map",
      "Compare RG1's architecture against best practices",
    ],
    resourceGroups: [
      { name: "RG1", icon: "/icons/Resource-Groups.svg" },
      { name: "RG2", icon: "/icons/Resource-Groups.svg" },
      { name: "Contoso-rg", icon: "/icons/Resource-Groups.svg" },
      { name: "Dev-RG", icon: "/icons/Resource-Groups.svg" },
      { name: "testingRG", icon: "/icons/Resource-Groups.svg" },
    ],
    documentation: [{ name: "Documentation (99+)", count: "99+" }],
  },
};

const useStyles = makeStyles({
  container: {
    width: "400px",
    minWidth: "400px",
    maxWidth: "400px",
    height: "100%",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    flexShrink: 0,
    animation: "slideInRight 0.3s ease-out",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  headerTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  iconButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    color: tokens.colorNeutralForeground2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
      borderRadius: "4px",
    },
  },
  chatArea: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  messageContainer: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  },
  userMessage: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "12px",
    borderRadius: "8px",
    marginLeft: "auto",
    maxWidth: "80%",
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
  },
  agentMessage: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    maxWidth: "100%",
  },
  agentHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  agentName: {
    fontSize: "13px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  agentContent: {
    fontSize: "13px",
    lineHeight: "1.5",
    color: tokens.colorNeutralForeground1,
  },
  agentContentList: {
    marginLeft: "16px",
    marginTop: "8px",
    marginBottom: "8px",
  },
  agentContentListItem: {
    marginBottom: "4px",
  },
  agentTip: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "12px",
    borderRadius: "4px",
    fontSize: "12px",
    marginTop: "8px",
    color: tokens.colorNeutralForeground2,
  },
  feedbackButtons: {
    display: "flex",
    gap: "8px",
    marginTop: "8px",
  },
  feedbackButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    color: tokens.colorNeutralForeground2,
    display: "flex",
    alignItems: "center",
    ":hover": {
      color: tokens.colorBrandForeground1,
    },
  },
  inputArea: {
    padding: "12px 16px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tagSection: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
    fontSize: "12px",
  },
  tag: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "12px",
  },
  tagIcon: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #FF6B9D 0%, #C239B3 100%)",
  },
  removeTag: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0",
    marginLeft: "4px",
    color: tokens.colorNeutralForeground2,
    fontSize: "12px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "4px",
    padding: "8px 12px",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "13px",
    fontFamily: "Segoe UI, sans-serif",
  },
  inputActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  agentButton: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 8px",
    backgroundColor: "transparent",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "12px",
    color: tokens.colorBrandForeground1,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  agentIcon: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #FF6B9D 0%, #C239B3 100%)",
  },
  statusMessage: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "12px",
    borderRadius: "8px",
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    fontStyle: "italic",
    textAlign: "center",
  },
  learnMore: {
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
  copilotGradientIcon: {
    width: "20px",
    height: "20px",
    background: "linear-gradient(135deg, #FF6B9D 0%, #C239B3 100%)",
    borderRadius: "4px",
  },
  userMessageWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "16px",
  },
  copilotAvatarGradient: {
    background: "linear-gradient(135deg, #FF6B9D 0%, #C239B3 100%)",
  },
  imageSpacing: {
    marginTop: "16px",
    marginBottom: "16px",
  },
  architectureImage: {
    width: "100%",
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  suggestionsSection: {
    marginTop: "16px",
  },
  suggestionsLabel: {
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  suggestionItem: {
    padding: "8px 12px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "4px",
    marginBottom: "6px",
    fontSize: "12px",
    cursor: "pointer",
  },
});

interface CopilotSidePanelProps {
  onClose: () => void;
  initialPrompt?: string;
}

export default function CopilotSidePanel({
  onClose,
  initialPrompt,
}: CopilotSidePanelProps) {
  const styles = useStyles();
  const [message, setMessage] = useState("");
  const [showCopilotResponse, setShowCopilotResponse] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  console.log("CopilotSidePanel rendered with initialPrompt:", initialPrompt);

  // Get content based on initial prompt
  const currentContent =
    initialPrompt && promptContent[initialPrompt]
      ? promptContent[initialPrompt]
      : promptContent["Visualize RG1 architecture map"];

  console.log("Using content:", currentContent.userMessage);

  // Show copilot response after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCopilotResponse(true);
      // Scroll to bottom after response appears
      setTimeout(() => {
        if (chatAreaRef.current) {
          chatAreaRef.current.scrollTo({
            top: chatAreaRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.copilotGradientIcon} />
          <span className={styles.headerTitle}>Chat 55</span>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.iconButton} title="More options">
            <MoreHorizontal24Regular />
          </button>
          <button className={styles.iconButton} title="Pop out">
            <ArrowMaximize20Regular />
          </button>
          <button className={styles.iconButton} onClick={onClose} title="Close">
            <Dismiss24Regular />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className={styles.chatArea} ref={chatAreaRef}>
        {/* User Message */}
        <div className={styles.userMessageWrapper}>
          <div className={styles.userMessage}>{currentContent.userMessage}</div>
        </div>

        {/* Copilot Response */}
        {showCopilotResponse && (
          <div className={styles.messageContainer}>
            <Avatar
              name="Copilot"
              size={32}
              className={styles.copilotAvatarGradient}
            />
            <div className={styles.agentMessage}>
              <div className={styles.agentHeader}>
                <span className={styles.agentName}>Copilot</span>
              </div>
              <div className={styles.agentContent}>
                <div>{currentContent.copilotResponse.text}</div>

                {/* Architecture Image */}
                {currentContent.copilotResponse.image && (
                  <div className={styles.imageSpacing}>
                    <img
                      src={currentContent.copilotResponse.image}
                      alt="Architecture diagram"
                      className={styles.architectureImage}
                    />
                  </div>
                )}

                {/* Suggestions */}
                {currentContent.suggestions &&
                  currentContent.suggestions.length > 0 && (
                    <div className={styles.suggestionsSection}>
                      <div className={styles.suggestionsLabel}>
                        Related suggestions:
                      </div>
                      {currentContent.suggestions.map(
                        (suggestion: string, index: number) => (
                          <div key={index} className={styles.suggestionItem}>
                            {suggestion}
                          </div>
                        ),
                      )}
                    </div>
                  )}
              </div>
              <div className={styles.feedbackButtons}>
                <button className={styles.feedbackButton} title="Like">
                  <ThumbLike20Regular />
                </button>
                <button className={styles.feedbackButton} title="Dislike">
                  <ThumbDislike20Regular />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className={styles.inputArea}>
        <div className={styles.inputContainer}>
          <button className={styles.iconButton} aria-label="Add attachment">
            <Add20Regular />
          </button>
          <input
            type="text"
            className={styles.input}
            placeholder="Ask Copilot..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className={styles.iconButton} aria-label="Send message">
            <Send24Regular />
          </button>
        </div>
      </div>
    </div>
  );
}
