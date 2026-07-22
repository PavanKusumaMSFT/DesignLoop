/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import React from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Text,
  Button,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

export interface CloudShellCommand {
  command: string;
  outputs: string[];
}

export interface CloudShellPanelProps {
  isOpen: boolean;
  onClose: () => void;
  commands: CloudShellCommand[];
  /** When true, multi-line commands are split and indented (Azure CLI style). */
  multiLineCommands?: boolean;
}

const useStyles = makeStyles({
  cloudShellPanel: {
    width: "0",
    backgroundColor: "#1e1e1e",
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    transitionProperty: "width",
    transitionDuration: "0.3s",
    transitionTimingFunction: "ease-in-out",
    overflow: "hidden",
    flexShrink: 0,
    height: "100%",
  },
  cloudShellPanelOpen: { width: "500px" },
  cloudShellHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    backgroundColor: tokens.colorNeutralForeground1,
    borderBottom: "1px solid #3e3e3e",
    minHeight: "48px",
    flexShrink: 0,
  },
  cloudShellTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralBackground1,
  },
  iconWhite: { color: tokens.colorNeutralBackground1 },
  cloudShellContent: {
    flex: 1,
    overflow: "auto",
    padding: tokens.spacingHorizontalL,
  },
  terminalFont: {
    fontFamily: "'Consolas', 'Monaco', 'Courier New', monospace",
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralStroke1,
  },
  terminalLine: { marginBottom: tokens.spacingVerticalS },
  terminalLineLg: { marginBottom: tokens.spacingVerticalL },
  terminalLineEnd: { marginBottom: tokens.spacingVerticalXS },
  terminalLineIndent: {
    marginBottom: tokens.spacingVerticalS,
    paddingLeft: "20px",
  },
  terminalLineLgIndent: {
    marginBottom: tokens.spacingVerticalL,
    paddingLeft: "20px",
  },
  terminalComment: { marginBottom: tokens.spacingVerticalS, color: "#6A9955" },
  terminalCommentLg: {
    marginBottom: tokens.spacingVerticalL,
    color: "#6A9955",
  },
  terminalPromptUser: { color: "#4EC9B0" },
  terminalPromptSep: { color: tokens.colorNeutralStroke1 },
  terminalPromptDir: { color: "#569CD6" },
  terminalPromptCmd: { color: "#CE9178" },
  blinkingCursor: {
    display: "inline-block",
    width: "8px",
    height: "16px",
    backgroundColor: tokens.colorNeutralStroke1,
    animationName: {
      "0%, 49%": { opacity: 1 },
      "50%, 100%": { opacity: 0 },
    },
    animationDuration: "1s",
    animationIterationCount: "infinite",
  },
});

/** Terminal-style CloudShell panel that slides in from the right, rendering prompt lines with syntax-colored output. */
export default function CloudShellPanel({
  isOpen,
  onClose,
  commands,
  multiLineCommands = false,
}: CloudShellPanelProps) {
  const styles = useStyles();

  const renderPrompt = (
    user: string,
    dir: string,
    cmd: string,
    key?: string,
  ) => (
    <div className={styles.terminalLine} key={key}>
      <span className={styles.terminalPromptUser}>{user}</span>
      <span className={styles.terminalPromptSep}>:</span>
      <span className={styles.terminalPromptDir}>{dir}</span>
      <span className={styles.terminalPromptSep}>$ </span>
      <span className={styles.terminalPromptCmd}>{cmd}</span>
    </div>
  );

  return (
    <div
      className={mergeClasses(
        styles.cloudShellPanel,
        isOpen ? styles.cloudShellPanelOpen : undefined,
      )}
    >
      <div className={styles.cloudShellHeader}>
        <Text className={styles.cloudShellTitle}>CloudShell - Bash</Text>
        <Button
          appearance="subtle"
          icon={<Dismiss24Regular className={styles.iconWhite} />}
          onClick={onClose}
          title="Close"
        />
      </div>
      <div className={styles.cloudShellContent}>
        <div className={styles.terminalFont}>
          {!multiLineCommands
            ? /* Single-line commands (e.g. Terraform) */
              commands.map((entry, i) => (
                <React.Fragment key={i}>
                  {renderPrompt(
                    "user@cloudshell",
                    "~",
                    entry.command,
                    `p${i}`,
                  )}
                  {entry.outputs.map((output, j) => (
                    <div
                      key={j}
                      className={
                        j === entry.outputs.length - 1
                          ? styles.terminalCommentLg
                          : styles.terminalComment
                      }
                    >
                      {output}
                    </div>
                  ))}
                </React.Fragment>
              ))
            : /* Multi-line commands (e.g. Azure CLI with backslash continuations) */
              commands.map((entry, i) => {
                const cmdLines = entry.command.split("\n");
                return (
                  <React.Fragment key={i}>
                    {renderPrompt(
                      "user@cloudshell",
                      "~",
                      cmdLines[0],
                      `p${i}`,
                    )}
                    {cmdLines.slice(1).map((line, j) => (
                      <div
                        key={j}
                        className={
                          j === cmdLines.length - 2
                            ? styles.terminalLineLgIndent
                            : styles.terminalLineIndent
                        }
                      >
                        <span className={styles.terminalPromptCmd}>{line}</span>
                      </div>
                    ))}
                    {entry.outputs.map((output, j) => (
                      <div
                        key={`o${j}`}
                        className={
                          j === entry.outputs.length - 1
                            ? styles.terminalCommentLg
                            : styles.terminalComment
                        }
                      >
                        {output}
                      </div>
                    ))}
                  </React.Fragment>
                );
              })}

          {/* Blinking cursor at the end */}
          <div className={styles.terminalLineEnd}>
            <span className={styles.terminalPromptUser}>user@cloudshell</span>
            <span className={styles.terminalPromptSep}>:</span>
            <span className={styles.terminalPromptDir}>~</span>
            <span className={styles.terminalPromptSep}>$ </span>
            <span className={styles.blinkingCursor}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
