"use client";

import React from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Text,
  Button,
  useId,
} from "@fluentui/react-components";
import {
  ChatEmpty20Regular,
  Filter16Regular,
} from "@fluentui/react-icons";
import {
  CopilotNavDrawer,
  CopilotNavDrawerBody,
  CopilotNavDrawerHeader,
  CopilotNavItem,
  CopilotNavCategory,
  CopilotNavCategoryItem,
  CopilotNavSubItemGroup,
  CopilotNavSubItem,
} from "@fluentui-copilot/react-copilot";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  sidebarHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    width: "100%",
    height: "60px",
    boxSizing: "border-box",
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
  collapseIcon: {
    width: "20px",
    height: "20px",
  },
  headerButton: {
    minWidth: "32px",
    height: "32px",
  },
  agentIcon: {
    width: "20px",
    height: "20px",
    flexShrink: 0,
    borderRadius: "6px",
    border: `1px solid rgba(0,0,0,0.05)`,
  },
  navDrawerBase: {
    display: "flex",
    width: "284px",
    backgroundColor: tokens.colorNeutralBackground3,
    overflow: "hidden",
    paddingTop: 0,
  },
  navDrawerHidden: { display: "none" },
  navChatItemText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "block",
  },
  chatsCategoryContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  chatsCategoryFilterIcon: {
    color: tokens.colorNeutralForeground3,
    flexShrink: 0,
  },
  darkModeInvert: { filter: "invert(1) brightness(1.2)" },
  darkModeNone: { filter: "none" },
});

export interface AgentSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isDarkMode: boolean;
  docked: boolean;
  conversationTitle: string;
  /** Header label shown next to the copilot logo. Default: "Azure Copilot". */
  headerTitle?: string;
  /** Agent names listed under the "Agents" category. Default: the Optimization agent lineup. */
  agents?: string[];
  /** Whether to show the "Agents" category at all. Default: true. */
  showAgents?: boolean;
}

const DEFAULT_AGENTS = [
  "Deployment agent",
  "Migration agent",
  "Troubleshooting agent",
  "Observability agent",
  "Optimization agent",
  "Resiliency agent",
  "Azure specialized agent",
];

/** CopilotNavDrawer sidebar with agent list and chat history. */
export default function AgentSidebar({
  isCollapsed,
  onToggleCollapse,
  isDarkMode,
  docked,
  headerTitle = "Azure Copilot",
  agents = DEFAULT_AGENTS,
  showAgents = true,
}: AgentSidebarProps) {
  const styles = useStyles();
  const copilotNavId = useId("copilot-nav");

  if (docked) return null;

  return (
    <CopilotNavDrawer
      open={true}
      type="inline"
      size="small"
      selectedValue="current-chat"
      defaultSelectedCategoryValue="chats"
      defaultOpenCategories={["agents", "chats"]}
      className={mergeClasses(
        styles.navDrawerBase,
        isCollapsed ? styles.navDrawerHidden : undefined,
      )}
    >
      <CopilotNavDrawerHeader>
        <div className={styles.sidebarHeader}>
          {!isCollapsed && (
            <div className={styles.sidebarHeaderLeft}>
              <img
                src="/icons/copilot-icon.svg"
                alt="Copilot"
                className={mergeClasses(
                  styles.copilotLogo,
                  isDarkMode ? styles.darkModeInvert : styles.darkModeNone,
                )}
              />
              <Text className={styles.sidebarTitle}>{headerTitle}</Text>
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
                  isDarkMode ? styles.darkModeInvert : styles.darkModeNone,
                )}
              />
            }
            className={styles.headerButton}
            title={isCollapsed ? "Expand navigation" : "Collapse navigation"}
            onClick={onToggleCollapse}
          />
        </div>
      </CopilotNavDrawerHeader>
      <CopilotNavDrawerBody>
        {!isCollapsed && (
          <>
            <CopilotNavItem
              icon={<ChatEmpty20Regular />}
              value="new-chat"
            >
              New chat
            </CopilotNavItem>

            {showAgents && (
              <CopilotNavCategory value="agents">
                <CopilotNavCategoryItem id={`${copilotNavId}-agents`}>
                  Agents
                </CopilotNavCategoryItem>
                <CopilotNavSubItemGroup
                  aria-labelledby={`${copilotNavId}-agents`}
                >
                  {agents.map((agent) => (
                    <CopilotNavSubItem
                      key={agent}
                      value={agent}
                      icon={
                        <img
                          src="/icons/AgentsColor.svg"
                          alt=""
                          className={styles.agentIcon}
                        />
                      }
                    >
                      {agent}
                    </CopilotNavSubItem>
                  ))}
                </CopilotNavSubItemGroup>
              </CopilotNavCategory>
            )}

            <CopilotNavCategory value="chats">
              <CopilotNavCategoryItem id={`${copilotNavId}-chats`}>
                <span className={styles.chatsCategoryContent}>
                  Chats
                  <Filter16Regular
                    className={styles.chatsCategoryFilterIcon}
                  />
                </span>
              </CopilotNavCategoryItem>
              <CopilotNavSubItemGroup
                aria-labelledby={`${copilotNavId}-chats`}
              >
                <CopilotNavSubItem value="current-chat">
                  <span className={styles.navChatItemText}>
                    Apply rightsized requests with a 20% buffer
                  </span>
                </CopilotNavSubItem>
              </CopilotNavSubItemGroup>
            </CopilotNavCategory>
          </>
        )}
      </CopilotNavDrawerBody>
    </CopilotNavDrawer>
  );
}
