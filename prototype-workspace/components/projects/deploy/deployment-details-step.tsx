"use client";

import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  Subtitle1,
  Subtitle2,
  Body1,
  Caption1,
  Input,
  Dropdown,
  Option,
  Divider,
  Link,
  Button as FluentButton,
  Badge,
} from "@fluentui/react-components";
import {
  DocumentOnePageSparkle24Regular,
  Copy20Regular,
  ArrowDownload16Regular,
  ChevronRight20Regular,
  ChevronDown20Regular,
  Document20Regular,
} from "@fluentui/react-icons";
import { useState } from "react";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

type DeploymentDetailsStepProps = {
  onBack: () => void;
  onNext: () => void;
};

const useStyles = makeStyles({
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "12px",
    boxShadow: tokens.shadow4,
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
  },
  titleText: {
    flex: 1,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase600,
    lineHeight: tokens.lineHeightBase600,
    color: tokens.colorNeutralForeground1,
  },
  titleActions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexShrink: 0,
  },
  actionIcon: {
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
  },
  description: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  sectionTitle: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  summaryBox: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "20px",
    padding: "24px",
  },
  summaryText: {
    color: tokens.colorNeutralForeground1,
  },
  // Recommended hosting service
  hostingBox: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    width: "100%",
  },
  hostingIconContainer: {
    width: "40px",
    height: "40px",
    borderRadius: "6px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  hostingContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 0,
  },
  hostingDescription: {
    color: tokens.colorNeutralForeground3,
  },
  learnMoreLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    marginTop: "4px",
  },
  // Cost estimate
  costBox: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  costBillingLabel: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  costDescription: {
    color: tokens.colorNeutralForeground1,
  },
  costValuesRow: {
    display: "flex",
    alignItems: "center",
    gap: "64px",
  },
  costValueGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  costCaption: {
    color: tokens.colorNeutralForeground3,
  },
  costAmount: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase600,
    lineHeight: tokens.lineHeightBase600,
    color: tokens.colorNeutralBackgroundStatic,
  },
  creditCaption: {
    color: tokens.colorPaletteGreenForeground1,
  },
  creditAmount: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase600,
    lineHeight: tokens.lineHeightBase600,
    color: tokens.colorPaletteGreenForeground1,
  },
  // Project details
  detailsContainer: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  detailRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
  },
  detailLabelGroup: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 0,
  },
  detailLabel: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  detailDescription: {
    color: tokens.colorNeutralForeground2,
  },
  detailInput: {
    width: "280px",
    flexShrink: 0,
  },
  dockerLink: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    flexShrink: 0,
  },
  // Advanced settings
  advancedToggle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    padding: 0,
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
  },
  advancedLabel: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  advancedContent: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    width: "100%",
  },
  envVarsTitle: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  envVarsTable: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    width: "100%",
  },
  envVarsHeaderRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    width: "100%",
  },
  envVarsDataRow: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    width: "100%",
  },
  envVarsCell: {
    flex: 1,
    minWidth: 0,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  aiGeneratedBadge: {
    alignSelf: "flex-start",
    backgroundColor: tokens.colorNeutralBackground5,
    color: tokens.colorNeutralForeground3,
  },
  sectionWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  costHeaderInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  dividerSpaced: {
    marginTop: "12px",
  },
  linkIcon: {
    color: tokens.colorBrandForegroundLink,
  },
  envVarsGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    width: "100%",
  },
  captionPrimary: {
    color: tokens.colorNeutralForeground1,
  },
  addButton: {
    alignSelf: "flex-start",
    marginTop: "4px",
  },
});

const PROJECT_FIELDS = [
  {
    label: "Subscription",
    description: "All resources in an Azure subscription are billed together.",
    value: "zava-sub",
    type: "dropdown" as const,
    options: ["zava-sub", "zava-dev", "zava-prod"],
  },
  {
    label: "Resource group",
    description:
      "The resource group keeps everything related to your project in one place (your app, hosting, and settings).",
    value: "(New) rg-zavaretailstore",
    type: "input" as const,
    options: [] as string[],
  },
  {
    label: "Region",
    description:
      "The region is the data center where your app runs\u2014choose one close to your users for better performance.",
    value: "(US) East US",
    type: "dropdown" as const,
    options: ["(US) East US", "(US) West US", "(US) Central US", "(Europe) West Europe"],
  },
    {
      label: "Application name",
      description: "This name is used to identify your app and workspace in Azure.",
      value: "zava-retail-storefront",
      type: "input" as const,
      options: [] as string[],
    },
];

export function DeploymentDetailsStep({
  onBack,
  onNext,
}: DeploymentDetailsStepProps) {
  const styles = useStyles();
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <DocumentOnePageSparkle24Regular />
          <Text className={styles.titleText}>Review deployment details</Text>
          <div className={styles.titleActions}>
            <Copy20Regular className={styles.actionIcon} />
            <ArrowDownload16Regular className={styles.actionIcon} />
          </div>
        </div>
        <Badge
          size="small"
          appearance="filled"
          color="subtle"
          className={styles.aiGeneratedBadge}
        >
          AI-generated content may be incorrect
        </Badge>
        <Text className={styles.description}>
          Review subscription and configuration details, including your
          Azure-recommended hosting service and cost estimate, then deploy when
          you&apos;re ready.
        </Text>
      </div>

      {/* Summary */}
      <div className={styles.sectionWrapper}>
        <Subtitle1 className={styles.sectionTitle}>Summary</Subtitle1>
        <div className={styles.summaryBox}>
          <Body1 className={styles.summaryText}>
            Deploying the cava&#x2011;retail&#x2011;storefront to Azure using
            Container Apps is ideal because it handles scaling, HTTPS, and
            deployments for a containerized storefront, letting you ship fast
            without managing Kubernetes or infrastructure.
          </Body1>
        </div>
      </div>

      {/* Recommended hosting service */}
      <div className={styles.sectionWrapper}>
        <Subtitle1 className={styles.sectionTitle}>
          Recommended hosting service
        </Subtitle1>
        <div className={styles.hostingBox}>
          <div className={styles.hostingIconContainer}>
            <img
              src="/icons/containerapps.svg"
              alt="Container Apps"
              width={24}
              height={24}
            />
          </div>
          <div className={styles.hostingContent}>
            <Subtitle2>Container Apps</Subtitle2>
            <Body1 className={styles.hostingDescription}>
              Azure Container Apps is a fully managed service that runs your
              containerized app without you managing servers, Kubernetes, or
              scaling infrastructure.
            </Body1>
            <Link
              className={styles.learnMoreLink}
              href="https://learn.microsoft.com/en-us/azure/container-apps/overview"
              target="_blank"
              inline
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>

      {/* Cost estimate */}
      <div className={styles.sectionWrapper}>
        <Subtitle1 className={styles.sectionTitle}>Cost estimate</Subtitle1>
        <div className={styles.costBox}>
          <div className={styles.costHeaderInfo}>
            <Body1 className={styles.costBillingLabel}>
              Pay-as-you-go | April
            </Body1>
            <Body1 className={styles.costDescription}>
              You&apos;re billed monthly for the Azure services you use. Costs
              can take time to update, and can vary based on many factors,
              including heavy usage.
              <br />
              For a more detailed and custom cost estimate, see the{" "}
              <Link
                href="https://azure.microsoft.com/en-us/pricing/calculator/"
                target="_blank"
                inline
              >
                Pricing calculator.
              </Link>
            </Body1>
          </div>
          <div className={styles.costValuesRow}>
            <div className={styles.costValueGroup}>
              <Caption1 className={styles.costCaption}>
                Expected monthly cost
              </Caption1>
              <Text className={styles.costAmount}>$150.00</Text>
            </div>
            <div className={styles.costValueGroup}>
              <Caption1 className={styles.creditCaption}>
                Available credits
              </Caption1>
              <Text className={styles.creditAmount}>$50.00</Text>
            </div>
          </div>
        </div>
      </div>

      {/* Project details */}
      <div className={styles.sectionWrapper}>
        <Subtitle1 className={styles.sectionTitle}>Project details</Subtitle1>
        <div className={styles.detailsContainer}>
          {PROJECT_FIELDS.map((field, index) => (
            <div key={field.label}>
              <div className={styles.detailRow}>
                <div className={styles.detailLabelGroup}>
                  <Body1 className={styles.detailLabel}>{field.label}</Body1>
                  <Caption1 className={styles.detailDescription}>
                    {field.description}
                  </Caption1>
                </div>
                {field.type === "dropdown" ? (
                  <Dropdown
                    className={styles.detailInput}
                    defaultValue={field.value}
                    defaultSelectedOptions={[field.value]}
                  >
                    {field.options.map((opt) => (
                      <Option key={opt} value={opt}>
                        {opt}
                      </Option>
                    ))}
                  </Dropdown>
                ) : (
                  <Input
                    className={styles.detailInput}
                    defaultValue={field.value}
                    appearance="outline"
                  />
                )}
              </div>
              {index < PROJECT_FIELDS.length - 1 && (
                <Divider className={styles.dividerSpaced} />
              )}
            </div>
          ))}
          {/* Containerization row */}
          <Divider />
          <div className={styles.detailRow}>
            <div className={styles.detailLabelGroup}>
              <Body1 className={styles.detailLabel}>Containerization</Body1>
              <Caption1 className={styles.detailDescription}>
                We detected a Dockerfile that containerizes your app for
                consistent builds and runs across environments.
              </Caption1>
            </div>
            <div className={styles.dockerLink}>
              <Link href="#" inline>
                Dockerfile
              </Link>
              <Document20Regular className={styles.linkIcon} />
            </div>
          </div>
        </div>
      </div>

      {/* Advanced settings */}
      <div className={styles.sectionWrapper}
      >
        <div
          className={styles.advancedToggle}
          onClick={() => setAdvancedOpen(!advancedOpen)}
        >
          {advancedOpen ? <ChevronDown20Regular /> : <ChevronRight20Regular />}
          <Subtitle1 className={styles.advancedLabel}>
            Advanced settings
          </Subtitle1>
        </div>
        {advancedOpen && (
        <div className={styles.advancedContent}>
          <div className={styles.envVarsGroup}>
            <Subtitle2 className={styles.envVarsTitle}>
              Environment variables
            </Subtitle2>
            <div className={styles.envVarsTable}>
              {/* Column headers */}
              <div className={styles.envVarsHeaderRow}>
                <Caption1
                  className={mergeClasses(styles.envVarsCell, styles.captionPrimary)}
                >
                  Key
                </Caption1>
                <Caption1
                  className={mergeClasses(styles.envVarsCell, styles.captionPrimary)}
                >
                  Value
                </Caption1>
                <Caption1
                  className={mergeClasses(styles.envVarsCell, styles.captionPrimary)}
                >
                  Mark as secure
                </Caption1>
              </div>
              {/* Data row */}
              <div className={styles.envVarsDataRow}>
                <Input
                  className={styles.envVarsCell}
                  appearance="outline"
                />
                <Input
                  className={styles.envVarsCell}
                  appearance="outline"
                />
                <Dropdown
                  className={styles.envVarsCell}
                  defaultValue="No"
                  defaultSelectedOptions={["No"]}
                >
                  <Option value="No">No</Option>
                  <Option value="Yes">Yes</Option>
                </Dropdown>
              </div>
            </div>
            <FluentButton
              appearance="secondary"
              className={styles.addButton}
            >
              Add
            </FluentButton>
          </div>
        </div>
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <FluentButton appearance="secondary" onClick={onBack}>
          Back
        </FluentButton>
        <FluentButton appearance="primary" onClick={onNext}>
          Next
        </FluentButton>
      </div>
    </div>
  );
}
