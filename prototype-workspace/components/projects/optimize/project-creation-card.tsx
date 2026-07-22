"use client";

import React, { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Button,
  Input,
  Label,
  Spinner,
} from "@fluentui/react-components";
import { Settings20Regular } from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  projectCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge,
    padding: "0",
    marginTop: tokens.spacingVerticalL,
    overflow: "hidden",
  },
  projectCardHeader: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    padding: tokens.spacingHorizontalXXL,
    paddingBottom: "0",
    margin: "0",
  },
  projectCardDivider: {
    height: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
    width: "100%",
    margin: `${tokens.spacingVerticalL} 0 0 0`,
  },
  projectCardBody: { padding: tokens.spacingHorizontalXXL },
  projectCardDesc: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
    marginBottom: tokens.spacingVerticalXXL,
  },
  formLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalS,
    display: "block",
  },
  requiredAsterisk: { color: tokens.colorPaletteRedForeground1 },
  inputFullWidth: { width: "100%", marginBottom: tokens.spacingVerticalXXL },
  advancedOptionsBox: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusLarge,
    marginBottom: tokens.spacingVerticalXXL,
  },
  advancedOptionsHeader: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalS,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  advancedOptionsDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: "18px",
  },
  projectCardActions: {
    display: "flex",
    justifyContent: "flex-start",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    margin: "0",
  },
  flexRowGap8: { display: "flex", alignItems: "center", gap: tokens.spacingHorizontalS },
});

export interface ProjectCreationCardProps {
  /** Whether dark mode is active (reserved for future theming) */
  isDarkMode: boolean;
  /** Called after the creation simulation completes (e.g. to show CloudShell) */
  onProjectCreated?: () => void;
  /** Called when the user clicks Cancel */
  onSkip?: () => void;
}

/** Card that lets the user name and create a new Azure project with advanced options. */
export default function ProjectCreationCard({
  isDarkMode,
  onProjectCreated,
  onSkip,
}: ProjectCreationCardProps) {
  const styles = useStyles();
  const [projectName, setProjectName] = useState("MyDemo-Project");
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectCreated, setProjectCreated] = useState(false);

  return (
    <div className={styles.projectCard}>
      <div className={styles.projectCardHeader}>Create a project</div>

      <div className={styles.projectCardDivider} />

      <div className={styles.projectCardBody}>
        <div className={styles.projectCardDesc}>
          Projects help you organize and manage resources that share a common
          purpose or workload. Group related resources, subscriptions, and
          services together for easier monitoring and collaboration.
        </div>

        <Label className={styles.formLabel}>
          Project <span className={styles.requiredAsterisk}>*</span>
        </Label>
        <Input
          className={styles.inputFullWidth}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter project name"
          disabled={isCreatingProject}
          required
        />

        <div className={styles.advancedOptionsBox}>
          <div className={styles.advancedOptionsHeader}>
            <span>Advanced options</span>
            <Settings20Regular />
          </div>
          <div className={styles.advancedOptionsDesc}>
            We&apos;ll set up a new project for you with defaults selected for
            optimal functionality.
          </div>
        </div>
      </div>

      <div className={styles.projectCardActions}>
        <Button
          appearance="primary"
          onClick={async () => {
            if (!projectName.trim()) return;
            setIsCreatingProject(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setProjectCreated(true);
            onProjectCreated?.();
          }}
          disabled={!projectName.trim() || isCreatingProject || projectCreated}
        >
          {isCreatingProject ? (
            <div className={styles.flexRowGap8}>
              <Spinner size="tiny" />
              <span>Creating...</span>
            </div>
          ) : (
            "Create project and deploy workload"
          )}
        </Button>
        <Button
          appearance="secondary"
          onClick={() => {
            setProjectName("MyDemo-Project");
            setIsCreatingProject(false);
            onSkip?.();
          }}
          disabled={isCreatingProject}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
