/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Button,
  Text,
  mergeClasses,
} from "@fluentui/react-components";
import {
  PanelLeft24Regular,
  PanelRight24Regular,
  Dismiss24Regular,
  Add24Regular,
} from "@fluentui/react-icons";
import {
  CopilotProvider,
  CopilotNavDrawer,
  CopilotNavDrawerHeader,
  CopilotNavDrawerBody,
} from "@fluentui-copilot/react-copilot";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ── Props ──────────────────────────────────────────────────────────────────────

export interface AgentLayoutProps {
  /** Content for the portal header (e.g., AzureHeaderBuildMVP or TopNav). Rendered above the layout. */
  header?: React.ReactNode;
  /** Chat title displayed in the content header bar. */
  chatTitle?: string;
  /** Actions rendered in the right side of the content header bar (e.g., close, dock buttons). */
  headerActions?: React.ReactNode;
  /** Content for the left sidebar. If omitted, a default CopilotNavDrawer shell is rendered. */
  sidebar?: React.ReactNode;
  /** Main scrollable chat/content area — this is where messages, cards, and findings go. */
  children: React.ReactNode;
  /** Input bar rendered at the bottom of the content area (e.g., ChatInput or EnhancedInputBar). */
  inputBar?: React.ReactNode;
  /** Optional right panel content (e.g., code panel, detail panel). */
  rightPanel?: React.ReactNode;
  /** Whether the right panel is visible. Controlled externally. */
  rightPanelOpen?: boolean;
  /** Whether to start with sidebar collapsed. Default: false. */
  defaultSidebarCollapsed?: boolean;
  /** Callback when sidebar collapse state changes. */
  onSidebarToggle?: (collapsed: boolean) => void;
  /** Callback when close button is clicked (if headerActions not provided). */
  onClose?: () => void;
  /** Max width for the chat content area. Default: "920px". */
  contentMaxWidth?: string;
  /** Whether to use the "vision" layout style (rounded content area with shadow). Default: false. */
  visionStyle?: boolean;
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  // Outer container — fills viewport below portal header
  container: {
    position: "fixed",
    top: "48px",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 50,
  },

  // Horizontal flex: sidebar | mainContent | rightPanel
  contentWrapper: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
    height: "100%",
    minHeight: 0,
  },

  // ── Sidebar ──
  sidebar: {
    width: "268px",
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexShrink: 0,
    paddingBottom: tokens.spacingVerticalM,
    transitionProperty: "width, padding",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: "ease",
    overflow: "hidden",
    height: "100%",
    position: "sticky" as any,
    top: 0,
  },
  sidebarCollapsed: {
    width: "56px",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXS}`,
    backgroundColor: "transparent",
    borderRight: "none",
  },
  sidebarToggle: {
    marginLeft: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalS,
  },

  // ── Main content panel ──
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground2,
    overflow: "hidden",
    height: "100%",
    minHeight: 0,
    position: "relative",
  },
  mainContentVision: {
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    borderRadius: tokens.borderRadiusXLarge,
    margin: tokens.spacingVerticalM,
  },

  // ── Content header bar ──
  contentHeader: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalXL}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: tokens.colorNeutralBackground2,
    minHeight: "60px",
    flexShrink: 0,
  },
  contentHeaderVision: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    minHeight: "64px",
  },
  contentHeaderTitle: {
    flex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  contentHeaderActions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexShrink: 0,
  },

  // ── Scrollable chat area ──
  chatArea: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflow: "auto",
    padding: `${tokens.spacingVerticalXXL} 60px`,
    minHeight: 0,
    position: "relative",
  },
  chatAreaVision: {
    padding: tokens.spacingVerticalXXL,
    paddingBottom: 0,
  },

  // ── Input bar (sticky bottom) ──
  inputSection: {
    position: "sticky" as any,
    bottom: 0,
    left: 0,
    right: 0,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    zIndex: 100,
    pointerEvents: "none",
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: tokens.spacingVerticalXS,
    width: "100%",
    margin: "0 auto",
    pointerEvents: "auto",
  },

  // ── Right panel ──
  rightPanel: {
    width: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transitionProperty: "width, min-width",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: "ease-in-out",
    flexShrink: 0,
    height: "100%",
  },
  rightPanelOpen: {
    width: "40%",
    minWidth: "40%",
  },
  emptyConversations: {
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    opacity: 0.6,
  },
});

// ── Component ──────────────────────────────────────────────────────────────────

/**
 * Full-page agent/copilot layout shell with collapsible sidebar, scrollable chat area,
 * sticky input bar, and optional right panel.
 *
 * **When to use:** Any full-screen Copilot/agent experience — investigation agents, optimization
 * agents, chat interfaces, immersive AI workflows. Format-agnostic: pass any content as children.
 *
 * **Instead of:** rebuilding the sidebar + content + input 3-panel layout from scratch in each
 * agent page (the pattern currently repeated in optimization-agent.tsx and agent-immersive-vnext.tsx).
 *
 * @example
 * ```tsx
 * <AgentLayout
 *   header={<AzureHeaderBuildMVP />}
 *   chatTitle="Investigate Sev1 Alert - VM..."
 *   inputBar={<ChatInput placeholder="I want to..." />}
 *   sidebar={<MyChatHistory items={chats} />}
 * >
 *   <CopilotMessage>Here's what I found...</CopilotMessage>
 *   <IncidentInvestigationCard />
 *   <ReasoningCard steps={steps} />
 * </AgentLayout>
 * ```
 *
 * @see CopilotNavDrawer for sidebar nav items
 * @see ChatInput from @fluentui-copilot/react-copilot for the input bar
 * @see EnhancedInputBar from components/shared/enhanced-input-bar for alternative input
 */
export default function AgentLayout({
  header,
  chatTitle,
  headerActions,
  sidebar,
  children,
  inputBar,
  rightPanel,
  rightPanelOpen = false,
  defaultSidebarCollapsed = false,
  onSidebarToggle,
  onClose,
  contentMaxWidth = "920px",
  visionStyle = false,
}: AgentLayoutProps) {
  const styles = useStyles();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    defaultSidebarCollapsed,
  );
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const handleSidebarToggle = useCallback(() => {
    const next = !sidebarCollapsed;
    setSidebarCollapsed(next);
    onSidebarToggle?.(next);
  }, [sidebarCollapsed, onSidebarToggle]);

  // Auto-scroll to bottom when children change
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <CopilotProvider>
      {/* Portal header (AzureHeaderBuildMVP, TopNav, or custom) */}
      {header}

      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* ── Left sidebar ── */}
          <div
            className={mergeClasses(
              styles.sidebar,
              sidebarCollapsed && styles.sidebarCollapsed,
            )}
          >
            {sidebarCollapsed ? (
              <Button
                appearance="subtle"
                icon={<PanelLeft24Regular />}
                onClick={handleSidebarToggle}
                className={styles.sidebarToggle}
                title="Expand sidebar"
              />
            ) : (
              sidebar || (
                <CopilotNavDrawer open={!sidebarCollapsed}>
                  <CopilotNavDrawerHeader>
                    <Button
                      appearance="subtle"
                      icon={<PanelLeft24Regular />}
                      onClick={handleSidebarToggle}
                      title="Collapse sidebar"
                    />
                    <Button
                      appearance="subtle"
                      icon={<Add24Regular />}
                      title="New chat"
                    />
                  </CopilotNavDrawerHeader>
                  <CopilotNavDrawerBody>
                    <Text size={200} className={styles.emptyConversations}>
                      No conversations yet
                    </Text>
                  </CopilotNavDrawerBody>
                </CopilotNavDrawer>
              )
            )}
          </div>

          {/* ── Main content area ── */}
          <div
            className={mergeClasses(
              styles.mainContent,
              visionStyle && styles.mainContentVision,
            )}
          >
            {/* Content header */}
            {(chatTitle || headerActions) && (
              <div
                className={mergeClasses(
                  styles.contentHeader,
                  visionStyle && styles.contentHeaderVision,
                )}
              >
                <Text
                  size={400}
                  weight="semibold"
                  className={styles.contentHeaderTitle}
                >
                  {chatTitle}
                </Text>
                <div className={styles.contentHeaderActions}>
                  {headerActions}
                  {rightPanel && (
                    <Button
                      appearance="subtle"
                      icon={<PanelRight24Regular />}
                      title="Toggle panel"
                    />
                  )}
                  {onClose && (
                    <Button
                      appearance="subtle"
                      icon={<Dismiss24Regular />}
                      onClick={onClose}
                      title="Close"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Scrollable chat / content area */}
            <div
              ref={chatAreaRef}
              className={mergeClasses(
                styles.chatArea,
                visionStyle && styles.chatAreaVision,
              )}
            >
              {children}
            </div>

            {/* Sticky input bar */}
            {inputBar && (
              <div className={styles.inputSection}>
                <div
                  className={styles.inputWrapper}
                  style={{ maxWidth: contentMaxWidth }}
                >
                  {inputBar}
                </div>
              </div>
            )}
          </div>

          {/* ── Optional right panel ── */}
          <div
            className={mergeClasses(
              styles.rightPanel,
              rightPanelOpen && styles.rightPanelOpen,
            )}
          >
            {rightPanel}
          </div>
        </div>
      </div>
    </CopilotProvider>
  );
}
