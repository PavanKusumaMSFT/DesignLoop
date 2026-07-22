"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Link,
  OverlayDrawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
} from "@fluentui/react-components";
import {
  Dismiss20Regular,
  Copy16Regular,
  Checkmark16Regular,
  Open16Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  drawer: {
    width: "410px",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
  },
  description: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
  stepsSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  step: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  stepWithCode: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  stepLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
  codeBar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  codeText: {
    flex: 1,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    fontFamily: "'Cascadia Code', 'Consolas', monospace",
    minWidth: 0,
    wordBreak: "break-all",
  },
  codeTextMultiline: {
    flex: 1,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    fontFamily: "'Cascadia Code', 'Consolas', monospace",
    minWidth: 0,
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
  },
  copyBtn: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    backgroundColor: "transparent",
    border: "none",
    color: tokens.colorNeutralForeground3,
    padding: 0,
    ":hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  installOptions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
  orText: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
  linksSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  externalLink: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
});

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS = [
  {
    label: "1. Install GitHub Copilot CLI",
    code: "npm install -g @github/copilot",
  },
  {
    label: "2. Install the Copilot extension",
    code: "copilot extension install github/github-copilot-cli && \\",
  },
  {
    label: "3. Add the Azure plugin marketplace",
    code: "copilot plugin marketplace add microsoft/github-copilot-for-azure && \\",
  },
  {
    label: "4. Install the Azure plugin",
    code: "copilot plugin install azure@github-copilot-for-azure",
  },
];

const FULL_CODE = `npm install -g @github/copilot
copilot extension install github/github-copilot-cli && \\
copilot plugin marketplace add microsoft/github-copilot-for-azure && \\
copilot plugin install azure@github-copilot-for-azure`;

/** Overlay drawer showing GitHub Copilot CLI installation steps for the terminal workflow. */
export default function TerminalDrawer({ isOpen, onClose }: TerminalDrawerProps) {
  const styles = useStyles();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <OverlayDrawer
      open={isOpen}
      onOpenChange={(_, data) => { if (!data.open) onClose(); }}
      position="end"
      className={styles.drawer}
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss20Regular />}
              onClick={onClose}
            />
          }
        >
          Work from your terminal
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>
        <div className={styles.body}>
          <Text className={styles.description}>
            The GitHub Copilot CLI reads, writes, runs and deploys code to Azure
            right where you work.
          </Text>

          <div className={styles.stepsSection}>
            {STEPS.map((step, i) => (
              <div key={i} className={styles.stepWithCode}>
                <Text className={styles.stepLabel}>{step.label}</Text>
                <div className={styles.codeBar}>
                  <span className={styles.codeText}>{step.code}</span>
                  <button
                    className={styles.copyBtn}
                    onClick={() => handleCopy(step.code, i)}
                    aria-label={`Copy step ${i + 1}`}
                  >
                    {copiedIndex === i ? (
                      <Checkmark16Regular />
                    ) : (
                      <Copy16Regular />
                    )}
                  </button>
                </div>
                {i === 0 && (
                  <span className={styles.installOptions}>
                    See other installation options{" "}
                    <Link href="#" inline>
                      here <Open16Regular />
                    </Link>
                  </span>
                )}
              </div>
            ))}
          </div>

          <Text className={styles.orText}>Or,</Text>

          <div className={styles.stepWithCode}>
            <Text className={styles.stepLabel}>Copy the entire code</Text>
            <div className={styles.codeBar}>
              <span className={styles.codeTextMultiline}>{FULL_CODE}</span>
              <button
                className={styles.copyBtn}
                onClick={() => handleCopy(FULL_CODE, 99)}
                aria-label="Copy entire code"
              >
                {copiedIndex === 99 ? (
                  <Checkmark16Regular />
                ) : (
                  <Copy16Regular />
                )}
              </button>
            </div>
          </div>

          <div className={styles.linksSection}>
            <Link className={styles.externalLink} href="#">
              More resources on the GitHub Copilot CLI <Open16Regular />
            </Link>
            <Link className={styles.externalLink} href="#">
              Learn more about Azure MCP <Open16Regular />
            </Link>
          </div>
        </div>
      </DrawerBody>
    </OverlayDrawer>
  );
}
