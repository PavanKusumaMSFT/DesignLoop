/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import React from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Button,
  Text,
} from "@fluentui/react-components";
import { Dismiss20Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

/**
 * A docked right-side chat/copilot panel that slides onto an existing page.
 *
 * Format-agnostic: works alongside any page layout (dashboard, resource detail, etc.).
 * Accepts `children` to render any agent, chat, or content inside the panel chrome.
 *
 * Composed from: makeStyles shell with close button header.
 * Instead of: rebuilding 420px sticky panel + border + CSS overrides inline.
 *
 * @example
 * ```tsx
 * {panelOpen && (
 *   <DockedChatPanel onClose={() => setPanelOpen(false)} title="Copilot">
 *     <OptimizationAgent docked onClose={() => setPanelOpen(false)} />
 *   </DockedChatPanel>
 * )}
 * ```
 *
 * @see AgentLayout — for full-screen standalone agent pages (not docked)
 */

export interface DockedChatPanelProps {
  /** Content to render inside the panel (agent component, chat, etc.) */
  children: React.ReactNode;
  /** Called when user clicks the close button */
  onClose?: () => void;
  /** Optional panel title shown in the header bar */
  title?: string;
  /** Panel width — defaults to "420px" */
  width?: string;
  /** Whether to show the built-in header with title + close button. Defaults to true.
   *  Set to false if the child component provides its own header. */
  showHeader?: boolean;
  /** Height offset to account for page header/toolbar above. Defaults to "48px" (standard AzureHeader). */
  headerOffset?: string;
  /** Additional className for the outer container */
  className?: string;
}

const useStyles = makeStyles({
  panel: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    flexShrink: 0,
    position: "sticky" as const,
    top: 0,
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    flexShrink: 0,
  },
  headerTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  content: {
    flex: 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
});

/** Renders a fixed-width right-side panel for docking a chat/agent onto an existing page.
 * Composed from: makeStyles shell, Text, Button (dismiss).
 * Instead of: rebuilding a sticky side panel with border and close button inline. */
export default function DockedChatPanel({
  children,
  onClose,
  title,
  width = "420px",
  showHeader = true,
  headerOffset = "48px",
  className,
}: DockedChatPanelProps) {
  const styles = useStyles();

  return (
    <div
      className={mergeClasses(styles.panel, className)}
      style={{
        width,
        minWidth: width,
        height: `calc(100vh - ${headerOffset})`,
      }}
    >
      {showHeader && (title || onClose) && (
        <div className={styles.header}>
          {title && <Text className={styles.headerTitle}>{title}</Text>}
          {onClose && (
            <Button
              appearance="subtle"
              icon={<Dismiss20Regular />}
              onClick={onClose}
              aria-label="Close panel"
            />
          )}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}
