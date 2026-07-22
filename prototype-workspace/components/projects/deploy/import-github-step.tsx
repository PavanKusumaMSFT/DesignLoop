/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Subtitle2,
  Body1,
  Caption1,
  Dropdown,
  Option,
  Divider,
  RadioGroup,
  Radio,
  Button as FluentButton,
} from "@fluentui/react-components";
import { useState } from "react";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

type ImportGitHubStepProps = {
  onBack: () => void;
  onNext: () => void;
};

const useStyles = makeStyles({
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "12px",
    boxShadow: tokens.shadow4,
    padding: "24px",
    maxWidth: "1032px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  title: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: 600,
    lineHeight: tokens.lineHeightBase600,
    color: tokens.colorNeutralForeground1,
  },
  description: {
    color: tokens.colorNeutralForeground2,
  },
  accountBadge: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "9999px",
    padding: "4px",
    width: "fit-content",
  },
  accountInfo: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "4px",
    paddingRight: "8px",
  },
  switchAccountLink: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase100,
    lineHeight: tokens.lineHeightBase100,
    cursor: "pointer",
  },
  configSection: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  fieldRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  fieldLabel: {
    width: "486px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
  },
  fieldControl: {
    flex: 1,
    minWidth: 0,
  },
  radioDescription: {
    paddingLeft: "26px",
    color: tokens.colorNeutralForeground4,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  captionSecondary: {
    color: tokens.colorNeutralForeground2,
  },
  dropdownFull: {
    width: "100%",
  },
});

export function ImportGitHubStep({ onBack, onNext }: ImportGitHubStepProps) {
  const styles = useStyles();
  const [selectedRepo, setSelectedRepo] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const isNextEnabled = selectedRepo !== "" && selectedBranch !== "";

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <Text className={styles.title}>Import app via GitHub</Text>
        <Body1 className={styles.description}>
          Select the directory containing your app&apos;s source code, then
          click &apos;Next&apos; to import it. Azure AI will detect its type and
          features, recommend a hosting option, and help provision a
          deployment-ready environment based on best practices.
        </Body1>
      </div>

      {/* GitHub account badge */}
      <div className={styles.accountBadge}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
            fill="#24292f"
          />
        </svg>
        <div className={styles.accountInfo}>
          <Text weight="semibold" size={300}>
            jenwilson-work
          </Text>
          <span className={styles.switchAccountLink}>Switch account</span>
        </div>
      </div>

      {/* Config section */}
      <div className={styles.configSection}>
        {/* Repository access */}
        <div className={styles.fieldRow}>
          <div className={styles.fieldLabel}>
            <Text weight="semibold" size={300}>
              Repository access
            </Text>
            <Caption1 className={styles.captionSecondary}>
              Allow access to all, or only specific, repositories, including
              public (read-only).
            </Caption1>
          </div>
          <div className={styles.fieldControl}>
            <RadioGroup defaultValue="specific">
              <div>
                <Radio value="specific" label="Choose a specific repository" />
                <div className={styles.radioDescription}>
                  Select one repository from your list
                </div>
              </div>
              <div>
                <Radio value="all" label="All repositories" />
                <div className={styles.radioDescription}>
                  Include all of an owner&apos;s current and future repositories
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Divider />

        {/* Repository */}
        <div className={styles.fieldRow}>
          <div className={styles.fieldLabel}>
            <Text weight="semibold" size={300}>
              Repository
            </Text>
            <Caption1 className={styles.captionSecondary}>
              Choose the repository that contains the application you want to
              deploy.
            </Caption1>
          </div>
          <div className={styles.fieldControl}>
            <Dropdown
              placeholder="Select a repository"
              className={styles.dropdownFull}
              value={selectedRepo || ""}
              onOptionSelect={(_, data) => setSelectedRepo(data.optionValue ?? "")}
            >
              <Option value="zava-retail-storefront">zava-retail-storefront</Option>
              <Option value="zava-api-gateway">zava-api-gateway</Option>
              <Option value="zava-inventory-service">zava-inventory-service</Option>
            </Dropdown>
          </div>
        </div>

        <Divider />

        {/* Branch */}
        <div className={styles.fieldRow}>
          <div className={styles.fieldLabel}>
            <Text weight="semibold" size={300}>
              Branch
            </Text>
            <Caption1 className={styles.captionSecondary}>
              Choose the branch (like main or master) that represents the
              version of your application you want to deploy.
            </Caption1>
          </div>
          <div className={styles.fieldControl}>
            <Dropdown
              placeholder="Select branch"
              className={styles.dropdownFull}
              value={selectedBranch || ""}
              onOptionSelect={(_, data) => setSelectedBranch(data.optionValue ?? "")}
            >
              <Option value="main">main</Option>
              <Option value="develop">develop</Option>
            </Dropdown>
          </div>
        </div>

        <Divider />
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <FluentButton appearance="secondary" onClick={onBack}>
          Back
        </FluentButton>
        <FluentButton
          appearance="primary"
          disabled={!isNextEnabled}
          onClick={onNext}
        >
          Next
        </FluentButton>
      </div>
    </div>
  );
}
