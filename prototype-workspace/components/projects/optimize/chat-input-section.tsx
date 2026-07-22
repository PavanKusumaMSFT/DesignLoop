"use client";

import React from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
} from "@fluentui/react-components";
import {
  Mic20Filled,
  Mic20Regular,
  Add20Regular,
  bundleIcon,
} from "@fluentui/react-icons";
import { ChatInput } from "@fluentui-copilot/react-copilot";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const Mic20 = bundleIcon(Mic20Filled, Mic20Regular);

const useStyles = makeStyles({
  inputSection: {
    position: "sticky",
    bottom: "80px",
    left: "0",
    right: "0",
    padding: "8px 16px",
    backgroundColor: tokens.colorNeutralBackground2,
    zIndex: 100,
    pointerEvents: "none",
  },
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "4px",
    maxWidth: "920px",
    width: "100%",
    margin: "0 auto",
    paddingLeft: "28px",
    pointerEvents: "auto",
  },
  fullWidth: { width: "100%" },
  aiDisclaimer: {
    fontSize: "12px",
    lineHeight: "16px",
    color: tokens.colorNeutralForeground3,
    textAlign: "center",
  },
  dockedInputSection: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    padding: "8px 16px",
    backgroundColor: tokens.colorNeutralBackground2,
    zIndex: 100,
  },
  dockedInputColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "100%",
  },
  chatInputRounded: { borderRadius: "16px" },
});

export interface ChatInputSectionProps {
  docked: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
  isSending: boolean;
  onSend?: () => void;
  /** Agent display name used in the input placeholder ("Message {agentName}"). Default: "Optimization agent". */
  agentName?: string;
  /** When true, renders only the ChatInput + disclaimer without the outer sticky wrapper.
   * Use this when composing inside a shell (e.g. AgentLayout) that already provides sticky positioning. */
  bare?: boolean;
}

/** Message input area for an agent chat, with full-screen and docked layouts. */
export default function ChatInputSection({
  docked,
  onInputChange,
  isSending,
  onSend,
  agentName = "Optimization agent",
  bare = false,
}: ChatInputSectionProps) {
  const styles = useStyles();

  const handleSubmit = () => {
    onInputChange("");
    onSend?.();
  };

  const micButton = (
    <Button
      shape="circular"
      aria-label="record message"
      appearance="transparent"
      icon={<Mic20 />}
    />
  );

  const addButton = (
    <Button
      aria-label="Add"
      shape="circular"
      icon={<Add20Regular />}
      appearance="transparent"
    />
  );

  const bareBody = (
    <>
      <ChatInput
        className={styles.fullWidth}
        designVersion="next"
        actions={micButton}
        contentBefore={addButton}
        aria-label="Copilot Chat"
        placeholderValue={`Message ${agentName}`}
        charactersRemainingMessage={undefined}
        hideSendWhenEmpty
        isSending={isSending}
        onSubmit={handleSubmit}
      />
      <Text className={styles.aiDisclaimer}>
        AI-generated content may be incorrect
      </Text>
    </>
  );

  if (bare) {
    return bareBody;
  }

  if (docked) {
    return (
      <div className={styles.dockedInputSection}>
        <div className={styles.dockedInputColumn}>
          <ChatInput
            className={styles.fullWidth}
            mode="sidecar"
            designVersion="next"
            root={{ className: styles.chatInputRounded }}
            actions={micButton}
            contentBefore={addButton}
            aria-label="Copilot Chat"
            placeholderValue={`Message ${agentName}`}
            charactersRemainingMessage={undefined}
            hideSendWhenEmpty
            isSending={isSending}
            onSubmit={handleSubmit}
          />
          <Text className={styles.aiDisclaimer}>
            AI-generated content may be incorrect
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.inputSection}>
      <div className={styles.inputWrapper}>
        <ChatInput
          className={styles.fullWidth}
          designVersion="next"
          actions={micButton}
          contentBefore={addButton}
          aria-label="Copilot Chat"
          placeholderValue={`Message ${agentName}`}
          charactersRemainingMessage={undefined}
          hideSendWhenEmpty
          isSending={isSending}
          onSubmit={handleSubmit}
        />
        <Text className={styles.aiDisclaimer}>
          AI-generated content may be incorrect
        </Text>
      </div>
    </div>
  );
}
