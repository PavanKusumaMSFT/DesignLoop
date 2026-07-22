/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Input,
} from "@fluentui/react-components";
import {
  Dismiss20Regular,
  ChevronRight12Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  overlay: {
    position: "fixed" as const,
    inset: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    zIndex: 100,
  },
  modal: {
    position: "fixed" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 101,
    backgroundColor: "#1a1a1a",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
    width: "540px",
    maxWidth: "90vw",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as const,
  },

  /* Header */
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "28px 28px 0 28px",
  },
  headerText: {
    flex: 1,
    paddingRight: "16px",
  },
  title: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: "#ffffff",
    display: "block" as const,
    marginBottom: "8px",
    lineHeight: tokens.lineHeightBase600,
  },
  description: {
    fontSize: tokens.fontSizeBase300,
    color: "rgba(255,255,255,0.55)",
    display: "block" as const,
    lineHeight: tokens.lineHeightBase300,
  },
  closeBtn: {
    flexShrink: 0,
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.6)",
    cursor: "pointer",
    borderRadius: tokens.borderRadiusMedium,
    ":hover": {
      backgroundColor: "rgba(255,255,255,0.08)",
      color: "#ffffff",
    },
  },

  /* Form area */
  formArea: {
    padding: "24px 28px",
  },
  fieldLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    display: "block" as const,
    marginBottom: "6px",
  },

  /* Accordion */
  accordion: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 0",
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.6)",
    fontSize: tokens.fontSizeBase300,
    fontFamily: "inherit",
    ":hover": {
      color: "#ffffff",
    },
  },
  chevron: {
    transition: "transform 150ms ease",
    fontSize: "12px",
  },
  chevronOpen: {
    transform: "rotate(90deg)",
  },

  /* Footer */
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "16px 28px 24px",
    backgroundColor: "rgba(255,255,255,0.03)",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
});

export interface CreateProjectModalProps {
  onClose: () => void;
  onCreate?: (projectName: string) => void;
}

/** Create project modal with blur overlay — used on FRE experiment pages. */
export default function CreateProjectModal({
  onClose,
  onCreate,
}: CreateProjectModalProps) {
  const styles = useStyles();
  const [projectName, setProjectName] = useState("my-project");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <Text className={styles.title}>
              Get started with your first agent. It&apos;s quick and easy.
            </Text>
            <Text className={styles.description}>
              Create a project to set up your workspace where you can build,
              customize, and manage agents, tools, and models.
            </Text>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <Dismiss20Regular />
          </button>
        </div>

        {/* Form */}
        <div className={styles.formArea}>
          <Text className={styles.fieldLabel}>Project</Text>
          <Input
            value={projectName}
            onChange={(_, data) => setProjectName(data.value)}
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
              borderBottom: "2px solid #6B4FBB",
              borderRadius: 0,
              color: tokens.colorNeutralForeground1,
              width: "100%",
            }}
          />

          <button
            className={styles.accordion}
            onClick={() => setAdvancedOpen(!advancedOpen)}
          >
            <ChevronRight12Regular
              className={`${styles.chevron} ${advancedOpen ? styles.chevronOpen : ""}`}
            />
            Advanced setup
          </button>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Button
            appearance="primary"
            onClick={() => {
              onCreate?.(projectName);
              onClose();
            }}
            style={{
              backgroundColor: "#643fb2",
              borderColor: "#643fb2",
              borderRadius: "9999px",
              paddingLeft: "24px",
              paddingRight: "24px",
            }}
          >
            Create project
          </Button>
        </div>
      </div>
    </>
  );
}
