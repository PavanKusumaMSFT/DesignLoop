"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  Button,
  Input,
  Label,
  makeStyles,
  tokens as fluentTokens,
  Spinner,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Dismiss24Regular, Settings20Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  dialogSurface: {
    maxWidth: "600px",
    width: "100%",
    padding: "0",
    overflow: "hidden",
  },
  dialogTitle: {
    fontSize: "24px",
    fontWeight: "600",
    padding: "24px",
    margin: "0",
    backgroundColor: tokens.colorNeutralBackground4,
  },
  divider: {
    height: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
    width: "100%",
    margin: "0",
  },
  dialogBody: {
    padding: "0",
  },
  dialogBodyContent: {
    padding: "24px",
  },
  description: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    lineHeight: "20px",
    marginBottom: "24px",
  },
  inputLabel: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
    display: "block",
  },
  required: {
    color: tokens.colorPaletteRedForeground1,
  },
  input: {
    width: "100%",
    marginBottom: "24px",
  },
  advancedSection: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "24px",
  },
  advancedHeader: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  advancedDescription: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "18px",
  },
  regionLink: {
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
    textDecoration: "none",
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    padding: "16px 24px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    margin: "0",
  },
  createButton: {
    minWidth: "100px",
  },
  loadingContent: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
});

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreateProject: (projectName: string) => void;
  serviceName?: string;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  open,
  onClose,
  onCreateProject,
  serviceName = "Web App",
}) => {
  const styles = useStyles();
  const [projectName, setProjectName] = useState("MyDemo-Project");
  const [isCreating, setIsCreating] = useState(false);
  const [advancedExpanded, setAdvancedExpanded] = useState(false);

  const handleCreate = async () => {
    if (!projectName.trim()) return;

    setIsCreating(true);
    
    // Simulate loading for 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    onCreateProject(projectName);
    setIsCreating(false);
  };

  const handleCancel = () => {
    if (!isCreating) {
      setProjectName("MyDemo-Project");
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(_, data) => !isCreating && data.open === false && handleCancel()}>
      <DialogSurface className={styles.dialogSurface}>
        <div className={styles.dialogTitle}>
          Create a project
        </div>
        <div className={styles.divider} />
        
        <div className={styles.dialogBodyContent}>
          <div className={styles.description}>
            Projects help you organize and manage resources that share a common purpose or workload. Group related resources, subscriptions, and services together for easier monitoring and collaboration.
          </div>

          <Label className={styles.inputLabel}>
            Project <span className={styles.required}>*</span>
          </Label>
          <Input
            className={styles.input}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
            disabled={isCreating}
            required
          />

          <div className={styles.advancedSection}>
            <div
              className={styles.advancedHeader}
              onClick={() => setAdvancedExpanded(!advancedExpanded)}
            >
              <span>Advanced options</span>
              <Settings20Regular />
            </div>
            <div className={styles.advancedDescription}>
              We'll set up a new project for you with defaults selected for optimal functionality.
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button appearance="secondary" onClick={handleCancel} disabled={isCreating}>
            Cancel
          </Button>
          <Button
            appearance="primary"
            onClick={handleCreate}
            disabled={!projectName.trim() || isCreating}
            className={styles.createButton}
          >
            {isCreating ? (
              <div className={styles.loadingContent}>
                <Spinner size="tiny" />
                <span>Creating...</span>
              </div>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </DialogSurface>
    </Dialog>
  );
};
