"use client";

import React from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Text,
  Button,
} from "@fluentui/react-components";
import {
  PanelLeftText20Regular,
  ChevronRight12Regular,
  ChevronDown20Regular,
  ChatAdd20Regular,
  FullScreenMaximize20Regular,
  Dismiss20Regular,
  Dismiss24Regular,
} from "@fluentui/react-icons";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  fixedHeaderWrapper: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  header: {
    padding: "8px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: tokens.colorNeutralBackground2,
    height: "60px",
    flexShrink: 0,
  },
  headerDockedStyle: { padding: "8px 12px", height: "auto" },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  headerLeftDockedStyle: {
    gap: "8px",
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  },
  headerButton: {
    minWidth: "32px",
    height: "32px",
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
  buttonGroupRow: {
    display: "flex",
    alignItems: "center",
    borderRadius: "4px",
    overflow: "hidden",
  },
  splitButtonLeft: {
    borderRadius: "4px 0 0 4px",
    padding: "6px 12px",
    fontSize: "13px",
  },
  splitButtonRight: {
    borderRadius: "0 4px 4px 0",
    minWidth: "28px",
    padding: "6px 4px",
    borderLeft: "1px solid rgba(255,255,255,0.3)",
  },
  dockedTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    overflow: "hidden",
    minWidth: 0,
  },
  chevronSubtle: { color: tokens.colorNeutralForeground3, flexShrink: 0 },
  conversationTitleEllipsis: {
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  conversationTitleText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
  },
  fontSize12: { fontSize: "12px" },
  iconSm: { width: "20px", height: "20px" },
  iconSmNoShrink: { width: "20px", height: "20px", flexShrink: 0 },
  iconXsInverted: {
    width: "16px",
    height: "16px",
    filter: "brightness(0) invert(1)",
  },
  collapseIcon: {
    width: "20px",
    height: "20px",
  },
  darkModeInvert: { filter: "invert(1) brightness(1.2)" },
  darkModeNone: { filter: "none" },
});

export interface AgentHeaderProps {
  docked: boolean;
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  conversationTitle: string;
  onClose?: () => void;
  onNavigate?: (page: string) => void;
  isDarkMode: boolean;
  customHeader?: React.ReactNode | null;
  useTopNav: boolean;
  onDock?: () => void;
  /** Agent display name shown in the title bar and image alt text. Default: "Optimization agent". */
  agentTitle?: string;
}

/** Header bar for an agent page, with full-screen and docked variants. */
export default function AgentHeader({
  docked,
  isSidebarCollapsed,
  onToggleSidebar,
  conversationTitle,
  onClose,
  onNavigate,
  isDarkMode,
  customHeader,
  onDock,
  agentTitle = "Optimization agent",
}: AgentHeaderProps) {
  const styles = useStyles();

  return (
    <>
      {/* Fixed header wrapper (AzureHeaderBuildMVP or custom) */}
      {!docked &&
        (customHeader === undefined ? (
          <div className={styles.fixedHeaderWrapper}>
            <AzureHeaderBuildMVP activeLink="Home" hideManage />
          </div>
        ) : customHeader !== null ? (
          <div className={styles.fixedHeaderWrapper}>{customHeader}</div>
        ) : null)}

      {/* Title bar */}
      <div
        className={mergeClasses(
          styles.header,
          docked ? styles.headerDockedStyle : undefined,
        )}
      >
        <div
          className={mergeClasses(
            styles.headerLeft,
            docked ? styles.headerLeftDockedStyle : undefined,
          )}
        >
          {docked && (
            <Button
              appearance="transparent"
              icon={<PanelLeftText20Regular />}
              className={styles.headerButton}
              title="Toggle sidebar"
            />
          )}
          {!docked && isSidebarCollapsed && (
            <Button
              appearance="subtle"
              icon={
                <img
                  src="/icons/pane-sidebar.svg"
                  alt="Expand"
                  className={mergeClasses(
                    styles.collapseIcon,
                    isDarkMode
                      ? styles.darkModeInvert
                      : styles.darkModeNone,
                  )}
                />
              }
              className={styles.headerButton}
              title="Expand navigation"
              onClick={onToggleSidebar}
            />
          )}
          {docked ? (
            <div className={styles.dockedTitleRow}>
              <img
                src="/icons/AgentsColor.svg"
                alt={agentTitle}
                className={styles.iconSmNoShrink}
              />
              <ChevronRight12Regular className={styles.chevronSubtle} />
              <Text className={styles.conversationTitleEllipsis}>
                {conversationTitle}
              </Text>
            </div>
          ) : (
            <>
              <img
                src="/icons/AgentsColor.svg"
                alt={agentTitle}
                className={styles.iconSm}
              />
              <Text className={styles.headerTitle}>
                {agentTitle}
              </Text>
              <ChevronRight12Regular className={styles.chevronSubtle} />
              <Text className={styles.conversationTitleText}>
                {conversationTitle}
              </Text>
            </>
          )}
        </div>
        <div className={styles.headerRight}>
          {docked && (
            <>
              <Button
                appearance="transparent"
                icon={<ChatAdd20Regular />}
                className={styles.headerButton}
                title="New chat"
              />
              <Button
                appearance="transparent"
                icon={<FullScreenMaximize20Regular />}
                className={styles.headerButton}
                title="Full screen"
                onClick={
                  onNavigate
                    ? () => onNavigate("optimization-agent")
                    : undefined
                }
              />
            </>
          )}
          {!docked && (
            <>
              <div className={styles.buttonGroupRow}>
                <Button
                  appearance="primary"
                  icon={
                    <img
                      src="/icons/ChatAdd.svg"
                      alt="New chat"
                      className={styles.iconXsInverted}
                    />
                  }
                  className={styles.splitButtonLeft}
                  title="New chat"
                >
                  New chat
                </Button>
                <Button
                  appearance="primary"
                  icon={
                    <ChevronDown20Regular className={styles.fontSize12} />
                  }
                  className={styles.splitButtonRight}
                  title="More options"
                />
              </div>
              <Button
                appearance="subtle"
                icon={
                  <img
                    src="/icons/Panel.svg"
                    alt="Panel"
                    className={mergeClasses(
                      styles.iconSm,
                      isDarkMode
                        ? styles.darkModeInvert
                        : styles.darkModeNone,
                    )}
                  />
                }
                className={styles.headerButton}
                title="Dock to side panel"
                onClick={onDock}
              />
            </>
          )}
          <Button
            appearance={docked ? "transparent" : "subtle"}
            icon={docked ? <Dismiss20Regular /> : <Dismiss24Regular />}
            className={styles.headerButton}
            onClick={onClose}
            title="Close"
          />
        </div>
      </div>
    </>
  );
}
