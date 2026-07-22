"use client";

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

export interface CodeViewerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  code: string;
}

const useStyles = makeStyles({
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
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  codePanelTitle: {
    fontSize: tokens.fontSizeBase400,
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
    padding: tokens.spacingHorizontalL,
    counterReset: "line",
  },
});

/** Sliding right-side panel that displays a code block (Terraform, Bicep, etc.) with a close button. */
export default function CodeViewerPanel({
  isOpen,
  onClose,
  title,
  code,
}: CodeViewerPanelProps) {
  const styles = useStyles();

  return (
    <div
      className={mergeClasses(
        styles.codePanel,
        isOpen ? styles.codePanelOpen : undefined,
      )}
    >
      <div className={styles.codePanelHeader}>
        <Text className={styles.codePanelTitle}>{title}</Text>
        <Button
          appearance="subtle"
          icon={<Dismiss24Regular />}
          onClick={onClose}
          title="Close"
        />
      </div>
      <div className={styles.codePanelContent}>
        <pre className={styles.codeBlock}>{code}</pre>
      </div>
    </div>
  );
}
