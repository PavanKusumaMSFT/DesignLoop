"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  tokens as fluentTokens,
  Button,
  Input,
  Dropdown,
  Option,
  Label,
  Text,
  RadioGroup,
  Radio,
  MessageBar,
  MessageBarBody,
  mergeClasses,
} from "@fluentui/react-components";

// Required token aliasing pattern
type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Info20Regular,
  Checkmark20Regular,
  QuestionCircle20Regular,
  Lightbulb20Regular,
  CheckmarkCircle48Regular,
  ArrowExport20Regular,
  Document20Regular,
  Star20Regular,
  Save20Regular,
  Edit20Regular,
  ArrowClockwise20Regular,
  Home20Regular,
  Save20Filled,
  Database20Regular,
  ShieldTask20Regular,
  Desktop20Regular,
  Server20Regular,
} from "@fluentui/react-icons";
import { TopNav } from "./top-nav";
import { useNavigation } from "../../lib/navigation-context";
import DeploymentSuccessCard from "./deployment-success-card";
import PageBreadcrumb from "./page-breadcrumb";
import PageHeader from "./page-header";
import WizardStepNav from "./wizard-step-nav";
import WizardLayout from "./wizard-layout";
import WizardSection from "./wizard-section";
import WizardActionBar from "./wizard-action-bar";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  stickyNav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  centerSection: {
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "32px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  rightSection: {
    flex: "0 0 320px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "24px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    alignSelf: "flex-start",
    position: "sticky",
    top: "24px",
  },
  formField: {
    marginBottom: "24px",
  },
  assistantSection: {
    marginBottom: "20px",
    paddingBottom: "20px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  assistantIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandBackground2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorBrandForeground2,
  },

  // Assistant content styles
  assistantTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalXL,
  },
  assistantIconGap: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalS,
  },
  assistantTextBlock: {
    display: "block",
    marginBottom: tokens.spacingVerticalXS,
  },
  assistantSecondaryText: {
    color: tokens.colorNeutralForeground2,
  },
  assistantTipCard: {
    backgroundColor: tokens.colorBrandBackground2,
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorBrandStroke1}`,
  },
  assistantBrandText: {
    display: "block",
    marginBottom: tokens.spacingVerticalXS,
    color: tokens.colorBrandForeground1,
  },
  assistantWelcomeContainer: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalL,
  },

  // Success page styles
  successContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacingVerticalXXXL,
  },
  successCard: {
    maxWidth: "800px",
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    padding: "48px",
    textAlign: "center",
  },
  successIcon: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: tokens.colorPaletteGreenBackground2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: `0 auto ${tokens.spacingVerticalXL}`,
  },
  successTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalM,
    textAlign: "center",
  },
  successSubtitle: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginBottom: tokens.spacingVerticalXXXL,
    textAlign: "center",
  },

  // Resource details styles
  resourceDetailsCard: {
    textAlign: "left",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingVerticalXL,
    marginBottom: tokens.spacingVerticalXL,
  },
  resourceDetailsTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalXL,
  },
  resourceGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalL,
  },
  resourceFieldLabel: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginBottom: tokens.spacingVerticalXS,
  },
  resourceTimeGrid: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
  },

  // Action buttons styles
  actionButtonsContainer: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    justifyContent: "center",
    marginBottom: tokens.spacingVerticalXXL,
  },

  // Next steps styles
  nextStepsContainer: {
    paddingTop: tokens.spacingVerticalXL,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: tokens.spacingVerticalXXL,
  },
  nextStepsTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalL,
    textAlign: "left",
  },
  nextStepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalL,
  },
  nextStepCard: {
    padding: tokens.spacingVerticalXL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "left",
  },
  nextStepIcon: {
    width: "40px",
    height: "40px",
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorBrandBackground2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: tokens.spacingVerticalM,
  },
  nextStepTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalS,
  },
  nextStepDescription: {
    color: tokens.colorNeutralForeground3,
    display: "block",
  },

  // Form styles
  wizardSubtitle: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginBottom: tokens.spacingVerticalXL,
  },
  formNoticeText: {
    color: tokens.colorBrandForeground1,
    display: "block",
    marginBottom: tokens.spacingVerticalM,
  },
  fieldHelpText: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginTop: tokens.spacingVerticalXS,
  },
  fieldErrorText: {
    color: tokens.colorStatusDangerForeground1,
    display: "block",
    marginTop: tokens.spacingVerticalXS,
  },
  planGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
  },
  planCard: {
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalL,
  },
  planCardSelected: {
    border: `2px solid ${tokens.colorBrandStroke1}`,
    backgroundColor: tokens.colorBrandBackground2,
  },
  planCardUnselected: {
    border: `2px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  planDescription: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginLeft: "28px",
    marginTop: tokens.spacingVerticalXS,
  },
  planFeatureList: {
    marginLeft: "28px",
    marginTop: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase100,
  },
  planRecommendation: {
    color: tokens.colorBrandForeground1,
    display: "block",
    marginLeft: "28px",
    marginTop: tokens.spacingVerticalS,
  },
  deploymentOptions: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  deploymentOptionRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  recommendedBadge: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    padding: "2px 8px",
    borderRadius: tokens.borderRadiusMedium,
    fontSize: "11px",
    fontWeight: tokens.fontWeightSemibold,
  },
  tagRow: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalS,
  },
  tagInput: {
    flex: 1,
  },

  // Review page styles
  reviewCard: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingVerticalXL,
    marginBottom: tokens.spacingVerticalXL,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  reviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalXL,
  },
  editButton: {
    minWidth: "auto",
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingVerticalS}`,
    cursor: "pointer",
  },
  reviewGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
  },
  reviewFieldLabel: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginBottom: tokens.spacingVerticalXS,
  },
  costBreakdownTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalS,
  },
  costBreakdownSubtitle: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginBottom: tokens.spacingVerticalL,
  },
  costRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${tokens.spacingVerticalM} 0`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  costTotalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${tokens.spacingVerticalL} 0`,
  },

  // Action bar styles
  actionBar: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    marginTop: tokens.spacingVerticalXXL,
    paddingTop: tokens.spacingVerticalXL,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  actionBarInner: {
    marginTop: "0",
    paddingTop: "0",
    borderTopStyle: "none",
  },

  // Shared component styles
  fullWidth: {
    width: "100%",
  },
  iconColor: {
    color: tokens.colorBrandForeground1,
  },
  iconFlexShrink0: {
    flexShrink: 0,
  },
  iconGreenFlexShrink0: {
    color: tokens.colorPaletteGreenForeground1,
    flexShrink: 0,
  },
  iconOrangeFlexShrink0: {
    color: tokens.colorPaletteDarkOrangeForeground1,
    flexShrink: 0,
  },
  iconGreen: {
    color: tokens.colorPaletteGreenForeground1,
  },
});

interface Step {
  id: number;
  title: string;
  completed: boolean;
}

interface CreateWebAppWizardProps {
  customHeader?: React.ReactNode | null;
  onBack?: () => void;
  onComplete?: () => void;
  onCreateVm?: () => void;
}

const CreateWebAppWizard: React.FC<CreateWebAppWizardProps> = ({
  customHeader,
  onBack,
  onComplete,
  onCreateVm,
}) => {
  const styles = useStyles();
  const router = useRouter();
  const { sourcePage, handlePageChange } = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentComplete, setDeploymentComplete] = useState(false);

  const [formData, setFormData] = useState({
    subscription: "",
    resourceGroup: "",
    name: "",
    region: "",
    hostingPlan: "free",
    deployment: "github",
  });

  const steps: Step[] = [
    { id: 1, title: "Basics", completed: false },
    { id: 2, title: "Review + create", completed: false },
  ];

  const handleBackClick = () => {
    // If onBack callback is provided, use it
    if (onBack) {
      onBack();
    } else if (customHeader !== undefined) {
      // If customHeader is provided, use browser back
      router.back();
    } else {
      // Otherwise use navigation context (portal-ia context)
      if (sourcePage) {
        handlePageChange(sourcePage);
      } else {
        // Default to returning home or discover page
        handlePageChange("returning-home-2");
      }
    }
  };

  const handleCreate = () => {
    setIsDeploying(true);
    // Simulate deployment
    setTimeout(() => {
      setIsDeploying(false);
      setDeploymentComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  };

  const assistantContent: Record<
    string,
    {
      title: string;
      whatItIs: string;
      whyItMatters: string;
      rulesExamples: string;
      proTip?: string;
    }
  > = {
    subscription: {
      title: "Subscription",
      whatItIs: "Where billing and policy apply.",
      whyItMatters:
        "Determines billing, access policies, and resource quotas. Different subscriptions may have different service limits.",
      rulesExamples:
        "Select from available subscriptions in your tenant. Each has its own spending limits and policies.",
      proTip:
        "Use separate subscriptions for different environments (dev/test/prod) or departments for better cost tracking.",
    },
    resourceGroup: {
      title: "Resource Group",
      whatItIs: "Group related resources so you can manage them together.",
      whyItMatters:
        "Resources in the same group share lifecycle, permissions, and policies. Deleting a resource group deletes all resources within it.",
      rulesExamples:
        'Choose an existing group or create new. Example: "rg-myapp-prod" for production resources.',
      proTip:
        "Group resources that will be managed together and have the same lifecycle.",
    },
    name: {
      title: "Web App Name",
      whatItIs: "Unique identifier for your web application.",
      whyItMatters:
        "This becomes part of your app's URL (name.azurewebsites.net). Must be globally unique across all Azure.",
      rulesExamples:
        "Use 3-50 lowercase letters, numbers, or hyphens. Must be globally unique for *.azurewebsites.net",
      proTip:
        "Use a descriptive name that includes environment (e.g., myapp-prod, myapp-dev).",
    },
    region: {
      title: "Region",
      whatItIs: "Physical location where your app will be hosted.",
      whyItMatters:
        "Affects latency for users, data residency compliance, and available features. Choose closest to your users.",
      rulesExamples:
        "Select from available Azure regions. Popular: East US, West Europe, Southeast Asia.",
      proTip: "Choose a region close to your users for best performance.",
    },
    hostingPlan: {
      title: "Hosting Plan",
      whatItIs: "Defines compute resources and features for your app.",
      whyItMatters:
        "Determines pricing, performance, scaling capabilities, and available features.",
      rulesExamples:
        "Free: For development. Standard: For production with custom domains. Premium: For high-scale apps.",
      proTip:
        "Start with Free for development, upgrade to Standard or Premium for production workloads.",
    },
  };

  const getCurrentAssistant = () => {
    // Show subscription help on Review step
    if (currentStep === 2) {
      const content = assistantContent["subscription"];
      return (
        <div>
          <Text size={500} weight="semibold" className={styles.assistantTitle}>
            {content.title}
          </Text>

          <div className={styles.assistantSection}>
            <div className={styles.assistantIconGap}>
              <Info20Regular
                className={mergeClasses(
                  styles.iconColor,
                  styles.iconFlexShrink0,
                )}
              />
              <div>
                <Text
                  size={300}
                  weight="semibold"
                  className={styles.assistantTextBlock}
                >
                  What it is
                </Text>
                <Text size={300} className={styles.assistantSecondaryText}>
                  {content.whatItIs}
                </Text>
              </div>
            </div>
          </div>

          <div className={styles.assistantSection}>
            <div className={styles.assistantIconGap}>
              <Checkmark20Regular className={styles.iconGreenFlexShrink0} />
              <div>
                <Text
                  size={300}
                  weight="semibold"
                  className={styles.assistantTextBlock}
                >
                  Why it matters
                </Text>
                <Text size={300} className={styles.assistantSecondaryText}>
                  {content.whyItMatters}
                </Text>
              </div>
            </div>
          </div>

          <div className={styles.assistantSection}>
            <div className={styles.assistantIconGap}>
              <QuestionCircle20Regular
                className={styles.iconOrangeFlexShrink0}
              />
              <div>
                <Text
                  size={300}
                  weight="semibold"
                  className={styles.assistantTextBlock}
                >
                  Rules & examples
                </Text>
                <Text size={300} className={styles.assistantSecondaryText}>
                  {content.rulesExamples}
                </Text>
              </div>
            </div>
          </div>

          {content.proTip && (
            <div className={styles.assistantTipCard}>
              <div className={styles.assistantIconGap}>
                <Lightbulb20Regular
                  className={mergeClasses(
                    styles.iconColor,
                    styles.iconFlexShrink0,
                  )}
                />
                <div>
                  <Text
                    size={300}
                    weight="semibold"
                    className={styles.assistantBrandText}
                  >
                    Pro tip
                  </Text>
                  <Text size={300} className={styles.assistantSecondaryText}>
                    {content.proTip}
                  </Text>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (!activeField || !assistantContent[activeField]) {
      return (
        <div>
          <div className={styles.assistantWelcomeContainer}>
            <div className={styles.assistantIcon}>
              <QuestionCircle20Regular />
            </div>
            <Text size={500} weight="semibold">
              Get contextual help
            </Text>
          </div>
          <Text size={300} className={styles.assistantSecondaryText}>
            Click on any form field to see helpful guidance and best practices.
          </Text>
        </div>
      );
    }

    const content = assistantContent[activeField];
    return (
      <div>
        <Text size={500} weight="semibold" className={styles.assistantTitle}>
          {content.title}
        </Text>

        <div className={styles.assistantSection}>
          <div className={styles.assistantIconGap}>
            <Info20Regular
              className={mergeClasses(styles.iconColor, styles.iconFlexShrink0)}
            />
            <div>
              <Text
                size={300}
                weight="semibold"
                className={styles.assistantTextBlock}
              >
                What it is
              </Text>
              <Text size={300} className={styles.assistantSecondaryText}>
                {content.whatItIs}
              </Text>
            </div>
          </div>
        </div>

        <div className={styles.assistantSection}>
          <div className={styles.assistantIconGap}>
            <Checkmark20Regular className={styles.iconGreenFlexShrink0} />
            <div>
              <Text
                size={300}
                weight="semibold"
                className={styles.assistantTextBlock}
              >
                Why it matters
              </Text>
              <Text size={300} className={styles.assistantSecondaryText}>
                {content.whyItMatters}
              </Text>
            </div>
          </div>
        </div>

        <div className={styles.assistantSection}>
          <div className={styles.assistantIconGap}>
            <QuestionCircle20Regular className={styles.iconOrangeFlexShrink0} />
            <div>
              <Text
                size={300}
                weight="semibold"
                className={styles.assistantTextBlock}
              >
                Rules & examples
              </Text>
              <Text size={300} className={styles.assistantSecondaryText}>
                {content.rulesExamples}
              </Text>
            </div>
          </div>
        </div>

        {content.proTip && (
          <div className={styles.assistantTipCard}>
            <div className={styles.assistantIconGap}>
              <Lightbulb20Regular
                className={mergeClasses(
                  styles.iconColor,
                  styles.iconFlexShrink0,
                )}
              />
              <div>
                <Text
                  size={300}
                  weight="semibold"
                  className={styles.assistantBrandText}
                >
                  Pro tip
                </Text>
                <Text size={300} className={styles.assistantSecondaryText}>
                  {content.proTip}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Show success state if deployment is complete
  if (deploymentComplete) {
    return (
      <FluentProvider theme={webLightTheme}>
        <div className={styles.container}>
          {customHeader !== null && (
            <div className={styles.stickyNav}>
              {customHeader || <TopNav activeLink="Build" />}
            </div>
          )}

          <PageBreadcrumb
            items={[
              { label: "Home", onClick: () => handlePageChange("home-fre") },
              { label: "MyDemo-Project", onClick: () => handlePageChange("project-groups") },
              { label: "Create resource" },
            ]}
          />

          <PageHeader
            onBack={handleBackClick}
            icon="/icons/Static-Web-Apps.svg"
            iconAlt="Web App"
            title="Create Web App"
          />

          <div className={styles.successContainer}>
            <DeploymentSuccessCard
              className={styles.successCard}
              title="Your static web app was deployed successfully"
              description="Your static web app has been created and is ready to use."
              sections={[
                { id: "deploy", label: "1. Deploy resources" },
                {
                  id: "details",
                  label: "2. Resource details",
                  defaultExpanded: true,
                  children: (
                    <div className={styles.resourceGrid}>
                      <div>
                        <Text size={200} className={styles.resourceFieldLabel}>
                          Resource name
                        </Text>
                        <Text size={300}>
                          {formData.name || "Static Web App--5pxfnr"}
                        </Text>
                      </div>
                      <div>
                        <Text size={200} className={styles.resourceFieldLabel}>
                          Resource group
                        </Text>
                        <Text size={300}>
                          {formData.resourceGroup || "Not specified"}
                        </Text>
                      </div>
                      <div>
                        <Text size={200} className={styles.resourceFieldLabel}>
                          Type
                        </Text>
                        <Text size={300}>Static Web App</Text>
                      </div>
                      <div>
                        <Text size={200} className={styles.resourceFieldLabel}>
                          Region
                        </Text>
                        <Text size={300}>
                          {formData.region === "east-us"
                            ? "East US"
                            : formData.region === "east-us-2"
                              ? "East US 2"
                              : formData.region === "west-us"
                                ? "West US"
                                : formData.region === "west-us-2"
                                  ? "West US 2"
                                  : formData.region === "central-us"
                                    ? "Central US"
                                    : formData.region === "west-europe"
                                      ? "West Europe"
                                      : formData.region === "north-europe"
                                        ? "North Europe"
                                        : formData.region === "southeast-asia"
                                          ? "Southeast Asia"
                                          : "global"}
                        </Text>
                      </div>
                      <div>
                        <Text size={200} className={styles.resourceFieldLabel}>
                          Subscription
                        </Text>
                        <Text size={300}>
                          {formData.subscription === "contoso-prod"
                            ? "Contoso Production"
                            : formData.subscription === "contoso-dev"
                              ? "Contoso Development"
                              : formData.subscription === "contoso-test"
                                ? "Contoso Test Environment"
                                : formData.subscription === "contoso-shared"
                                  ? "Contoso Shared Services"
                                  : "Not specified"}
                        </Text>
                      </div>
                      <div>
                        <div className={styles.resourceTimeGrid}>
                          <div>
                            <Text size={200} className={styles.resourceFieldLabel}>
                              Duration
                            </Text>
                            <Text size={300}>56s</Text>
                          </div>
                          <div>
                            <Text size={200} className={styles.resourceFieldLabel}>
                              Completed
                            </Text>
                            <Text size={300}>9/30/2025, 1:36:54 PM</Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                },
              ]}
              nextSteps={{
                description:
                  "Continue building your application with these recommended next steps.",
                cards: [
                  {
                    icon: <Desktop20Regular className={styles.iconColor} />,
                    title: "Create a virtual machine",
                    description:
                      "Deploy a VM to run your backend services and applications",
                    onClick: () => {
                      if (onCreateVm) {
                        onCreateVm();
                      } else {
                        router.back();
                      }
                    },
                  },
                  {
                    icon: <Database20Regular className={styles.iconColor} />,
                    title: "Enable storage and data",
                    description:
                      "Set up databases, blob storage, and data management services",
                  },
                  {
                    icon: <Server20Regular className={styles.iconColor} />,
                    title: "Setup web/app server",
                    description:
                      "Configure web servers and application hosting environments",
                  },
                ],
              }}
              nextStepsLabel="3. Next steps"
              onHome={() => {
                if (onComplete) {
                  onComplete();
                } else if (customHeader !== undefined) {
                  router.back();
                } else {
                  handlePageChange("returning-home-2");
                }
              }}
              homeLabel="Return to home"
              onManage={() => {}}
              manageLabel="Go to resource"
            />
          </div>
        </div>
      </FluentProvider>
    );
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        {customHeader !== null && (
          <div className={styles.stickyNav}>
            {customHeader || <TopNav activeLink="Build" />}
          </div>
        )}

        <PageBreadcrumb
          items={[
            { label: "Home", onClick: () => handlePageChange("home-fre") },
            { label: "MyDemo-Project", onClick: () => handlePageChange("project-groups") },
            { label: "Create resource" },
          ]}
        />

        <PageHeader
          onBack={handleBackClick}
          icon="/icons/Static-Web-Apps.svg"
          iconAlt="Web App"
          title="Create Web App"
          description="Fast, global hosting for static sites and optional serverless APIs. Connect your repo now or later."
        />

        <WizardLayout
          stepNav={<WizardStepNav steps={steps} activeStep={currentStep} onStepChange={setCurrentStep} />}
          rightPanel={<div className={styles.rightSection}>{getCurrentAssistant()}</div>}
          hasCustomHeader={customHeader !== null && customHeader !== undefined}
        >
          <div className={styles.centerSection}>
            {currentStep === 1 && (
              <WizardSection title="Basics" description="Configure the fundamental settings for your new Web App.">

                <MessageBar intent="info" className={styles.formField}>
                  <MessageBarBody>
                    Fast, global hosting for static sites and optional
                    serverless APIs. Connect your repo now or later.
                  </MessageBarBody>
                </MessageBar>

                <div className={styles.formField}>
                  <Label required>Subscription</Label>
                  <Dropdown
                    placeholder="Select subscription"
                    value={formData.subscription}
                    selectedOptions={
                      formData.subscription ? [formData.subscription] : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        subscription: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("subscription")}
                    className={styles.fullWidth}
                  >
                    <Option value="contoso-prod">Contoso Production</Option>
                    <Option value="contoso-dev">Contoso Development</Option>
                    <Option value="contoso-test">
                      Contoso Test Environment
                    </Option>
                    <Option value="contoso-shared">
                      Contoso Shared Services
                    </Option>
                  </Dropdown>
                </div>

                <div className={styles.formField}>
                  <Label required>Resource Group</Label>
                  <Dropdown
                    placeholder="Select resource group"
                    value={formData.resourceGroup}
                    selectedOptions={
                      formData.resourceGroup ? [formData.resourceGroup] : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        resourceGroup: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("resourceGroup")}
                    className={styles.fullWidth}
                  >
                    <Option value="new">Create new</Option>
                    <Option value="rg-prod">rg-myapp-prod</Option>
                    <Option value="rg-dev">rg-myapp-dev</Option>
                  </Dropdown>
                </div>

                <div className={styles.formField}>
                  <Label required>Name</Label>
                  <Input
                    placeholder="my-web-app"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    onFocus={() => setActiveField("name")}
                    className={styles.fullWidth}
                  />
                  <Text size={200} className={styles.fieldHelpText}>
                    Use 3-50 lowercase letters, numbers, or hyphens. Must be
                    globally unique for *.azurewebsites.net
                  </Text>
                  {formData.name && (
                    <Text size={200} className={styles.fieldErrorText}>
                      ⚠ App name is required
                    </Text>
                  )}
                </div>

                <div className={styles.formField}>
                  <Label required>Region</Label>
                  <Dropdown
                    placeholder="Select region"
                    value={formData.region}
                    selectedOptions={formData.region ? [formData.region] : []}
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        region: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("region")}
                    className={styles.fullWidth}
                  >
                    <Option value="east-us">East US</Option>
                    <Option value="east-us-2">East US 2</Option>
                    <Option value="west-us">West US</Option>
                    <Option value="west-us-2">West US 2</Option>
                    <Option value="central-us">Central US</Option>
                    <Option value="west-europe">West Europe</Option>
                    <Option value="north-europe">North Europe</Option>
                    <Option value="southeast-asia">Southeast Asia</Option>
                  </Dropdown>
                  <Text size={200} className={styles.fieldHelpText}>
                    Choose a region close to your users for best performance
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Label required>Hosting plan</Label>
                  <Text size={300} className={styles.formNoticeText}>
                    Free tier recommended for most apps
                  </Text>
                  <RadioGroup
                    value={formData.hostingPlan}
                    onChange={(_, data) =>
                      setFormData({ ...formData, hostingPlan: data.value })
                    }
                    onFocus={() => setActiveField("hostingPlan")}
                  >
                    <div className={styles.planGrid}>
                      <div
                        className={`${styles.planCard} ${
                          formData.hostingPlan === "free"
                            ? styles.planCardSelected
                            : styles.planCardUnselected
                        }`}
                      >
                        <Radio value="free" label="Free" />
                        <Text size={200} className={styles.planDescription}>
                          Perfect for personal projects
                        </Text>
                        <ul className={styles.planFeatureList}>
                          <li>100 GB bandwidth/month</li>
                          <li>Custom domains</li>
                          <li>SSL certificates</li>
                        </ul>
                        <Text size={200} className={styles.planRecommendation}>
                          Free tier recommended for most apps
                        </Text>
                      </div>

                      <div
                        className={`${styles.planCard} ${
                          formData.hostingPlan === "standard"
                            ? styles.planCardSelected
                            : styles.planCardUnselected
                        }`}
                      >
                        <Radio value="standard" label="Standard" />
                        <Text size={200} className={styles.planDescription}>
                          For production applications
                        </Text>
                        <ul className={styles.planFeatureList}>
                          <li>100 GB + pay-as-you-go</li>
                          <li>Private endpoints</li>
                          <li>Advanced authentication</li>
                        </ul>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className={styles.formField}>
                  <Label>Deployment configuration</Label>
                  <Text size={300} className={styles.wizardSubtitle}>
                    Configure how your web app will be built and deployed
                  </Text>
                  <Text size={300} className={styles.formNoticeText}>
                    GitHub recommended for CI/CD
                  </Text>
                  <RadioGroup
                    value={formData.deployment}
                    onChange={(_, data) =>
                      setFormData({ ...formData, deployment: data.value })
                    }
                  >
                    <div className={styles.deploymentOptions}>
                      <div className={styles.deploymentOptionRow}>
                        <Radio value="github" label="GitHub" />
                        <span className={styles.recommendedBadge}>
                          Recommended
                        </span>
                      </div>
                      <Radio value="azure-devops" label="Azure DevOps" />
                      <Radio value="local-git" label="Local Git" />
                      <Radio value="deploy-later" label="Deploy later" />
                    </div>
                  </RadioGroup>
                </div>

                <div className={styles.formField}>
                  <Label>Tags</Label>
                  <Text size={200} className={styles.fieldHelpText}>
                    We prefilled required tags. Add more if needed for cost
                    allocation
                  </Text>
                  <div className={styles.tagRow}>
                    <Input
                      placeholder="tag-example"
                      className={styles.tagInput}
                    />
                    <Input
                      placeholder="value-123"
                      className={styles.tagInput}
                    />
                    <Button appearance="secondary">+</Button>
                  </div>
                  <Button appearance="subtle" size="small">
                    Add new tag
                  </Button>
                </div>
              </WizardSection>
            )}

            {currentStep === 2 && (
              <WizardSection title="Review your static web app">

                {/* Basics Section */}
                <div className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <Text size={400} weight="semibold">
                      Basics
                    </Text>
                    <Button
                      appearance="transparent"
                      icon={<Edit20Regular className={styles.iconColor} />}
                      onClick={() => {
                        setCurrentStep(1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      title="Edit basics"
                      className={styles.editButton}
                    />
                  </div>

                  <div className={styles.reviewGrid}>
                    <div>
                      <Text size={200} className={styles.reviewFieldLabel}>
                        Subscription
                      </Text>
                      <Text size={300}>
                        {formData.subscription === "contoso-prod"
                          ? "Contoso Production"
                          : formData.subscription === "contoso-dev"
                            ? "Contoso Development"
                            : formData.subscription === "contoso-test"
                              ? "Contoso Test Environment"
                              : formData.subscription === "contoso-shared"
                                ? "Contoso Shared Services"
                                : "Not selected"}
                      </Text>
                    </div>
                    <div>
                      <Text size={200} className={styles.reviewFieldLabel}>
                        Resource group
                      </Text>
                      <Text size={300}>
                        {formData.resourceGroup || "Not selected"}
                      </Text>
                    </div>
                    <div>
                      <Text size={200} className={styles.reviewFieldLabel}>
                        Name
                      </Text>
                      <Text size={300}>{formData.name || "Not specified"}</Text>
                    </div>
                    <div>
                      <Text size={200} className={styles.reviewFieldLabel}>
                        Region
                      </Text>
                      <Text size={300}>
                        {formData.region === "east-us"
                          ? "East US"
                          : formData.region === "east-us-2"
                            ? "East US 2"
                            : formData.region === "west-us"
                              ? "West US"
                              : formData.region === "west-us-2"
                                ? "West US 2"
                                : formData.region === "central-us"
                                  ? "Central US"
                                  : formData.region === "west-europe"
                                    ? "West Europe"
                                    : formData.region === "north-europe"
                                      ? "North Europe"
                                      : formData.region === "southeast-asia"
                                        ? "Southeast Asia"
                                        : "Not selected"}
                      </Text>
                    </div>
                    <div>
                      <Text size={200} className={styles.reviewFieldLabel}>
                        Hosting plan
                      </Text>
                      <Text size={300}>
                        {formData.hostingPlan === "free" ? "Free" : "Standard"}
                      </Text>
                    </div>
                    <div>
                      <Text size={200} className={styles.reviewFieldLabel}>
                        Deployment source
                      </Text>
                      <Text size={300}>
                        {formData.deployment === "github"
                          ? "GitHub"
                          : formData.deployment === "azure-devops"
                            ? "Azure DevOps"
                            : formData.deployment === "local-git"
                              ? "Local Git"
                              : "Deploy later"}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className={styles.reviewCard}>
                  <Text
                    size={400}
                    weight="semibold"
                    className={styles.costBreakdownTitle}
                  >
                    Cost breakdown
                  </Text>
                  <Text size={200} className={styles.costBreakdownSubtitle}>
                    Estimates change as you edit. Actual cost depends on region,
                    usage, and discounts.
                  </Text>

                  <div className={styles.costRow}>
                    <Text size={300}>Static Web App</Text>
                    <Text size={300} weight="semibold">
                      Free
                    </Text>
                  </div>

                  <div className={styles.costTotalRow}>
                    <Text size={300} weight="semibold">
                      Estimated monthly cost
                    </Text>
                    <Text size={500} weight="semibold">
                      Free
                    </Text>
                  </div>
                </div>
              </WizardSection>
            )}

            <div className={styles.actionBar}>
              <Button appearance="secondary" onClick={handleBackClick}>
                Cancel
              </Button>
              <WizardActionBar
                currentStep={currentStep}
                totalSteps={2}
                reviewStep={2}
                createLabel="Create"
                isCreating={isDeploying}
                onPrevious={() => {
                  setCurrentStep(currentStep - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onNext={() => {
                  setCurrentStep(currentStep + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onCreate={handleCreate}
                className={styles.actionBarInner}
              />
            </div>
          </div>
        </WizardLayout>
      </div>
    </FluentProvider>
  );
};

export default CreateWebAppWizard;
