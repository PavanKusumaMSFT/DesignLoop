"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Button,
  Input,
  Dropdown,
  Option,
  Label,
  Text,
  RadioGroup,
  Radio,
  Checkbox,
  Textarea,
} from "@fluentui/react-components";

// Required alias for token usage
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
  Edit20Regular,
  ArrowClockwise20Regular,
  Add20Regular,
  Dismiss20Regular,
  Money20Regular,
  Shield20Regular,
  Flash20Regular,
  ChartMultiple20Regular,
  Map20Regular,
  Globe20Regular,
  Save20Filled,
  Connector20Regular,
  Home20Regular,
  Database20Regular,
  ShieldTask20Regular,
  Code20Regular,
  LockClosed20Regular,
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
  "@keyframes fadeIn": {
    "0%": {
      opacity: 0,
      transform: "translateY(10px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  teachingBubbleFadeIn: {
    animationName: {
      "0%": {
        opacity: 0,
        transform: "translateY(10px)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
    animationDuration: "0.4s",
    animationTimingFunction: "ease-out",
    animationFillMode: "forwards",
  },
  centerSection: {
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingVerticalXXL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  formField: {
    marginBottom: tokens.spacingVerticalL,
  },
  assistantSection: {
    marginBottom: tokens.spacingVerticalXL,
    paddingBottom: tokens.spacingVerticalXL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  assistantIcon: {
    width: tokens.spacingVerticalXXL,
    height: tokens.spacingHorizontalXXL,
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandBackground2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorBrandForeground2,
  },
  storageCardEnter: {
    animationName: {
      from: {
        opacity: 0,
        transform: "translateY(-20px)",
      },
      to: {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
    animationDuration: "300ms",
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    animationFillMode: "both",
  },
  // Cost estimation styles
  costHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalL,
  },
  costDescription: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginBottom: tokens.spacingVerticalL,
  },
  costItemContainer: {
    marginBottom: tokens.spacingVerticalL,
  },
  costItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: tokens.spacingVerticalS + " 0",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  costItemContent: {},
  costItemTitle: {
    display: "block",
  },
  costItemSubtitle: {
    color: tokens.colorNeutralForeground3,
    display: "block",
  },
  costTotal: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: tokens.spacingVerticalM + " 0",
    paddingTop: tokens.spacingVerticalL,
  },
  costDisclaimer: {
    marginTop: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusSmall,
  },
  costDisclaimerText: {
    color: tokens.colorNeutralForeground2,
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
  },
  costDisclaimerIcon: {
    flexShrink: 0,
    marginTop: "2px",
  },
  // Deployment complete styles
  deploymentContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  deploymentCard: {
    maxWidth: "800px",
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    padding: "48px",
    textAlign: "center",
  },
  deploymentIcon: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: tokens.colorPaletteGreenBackground2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto " + tokens.spacingVerticalL,
  },
  deploymentTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalM,
    textAlign: "center",
  },
  deploymentDescription: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginBottom: "40px",
    textAlign: "center",
  },
  deploymentDetails: {
    textAlign: "left",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingVerticalL,
    marginBottom: tokens.spacingVerticalL,
  },
  deploymentDetailsTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalXL,
  },
  deploymentDetailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL,
  },
  deploymentDetailItem: {},
  deploymentDetailLabel: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginBottom: tokens.spacingVerticalXXS,
  },
  deploymentButtons: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    justifyContent: "center",
    marginBottom: tokens.spacingVerticalXXL,
  },
  deploymentNextSteps: {
    paddingTop: tokens.spacingVerticalL,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  deploymentNextStepsTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalL,
    textAlign: "left",
  },
  deploymentNextStepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalL,
  },
  deploymentNextStepsCard: {
    padding: tokens.spacingVerticalXL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "left",
  },
  deploymentNextStepsCardIcon: {
    width: "40px",
    height: "40px",
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorBrandBackground2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: tokens.spacingVerticalM,
  },
  deploymentNextStepsCardTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalS,
  },
  deploymentNextStepsCardDescription: {
    color: tokens.colorNeutralForeground3,
    display: "block",
  },
  // Preset styles
  presetContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  presetCard: {
    padding: tokens.spacingVerticalL,
    borderRadius: tokens.borderRadiusXLarge,
    transition: "all 0.2s ease",
  },
  presetCardContent: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalM,
  },
  presetCardBody: {
    flex: 1,
  },
  presetCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalS,
  },
  presetCardTitle: {},
  presetCardDescription: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginBottom: tokens.spacingVerticalM,
  },
  presetCardFeatures: {
    margin: 0,
    paddingLeft: tokens.spacingHorizontalXL,
    listStyleType: "disc",
  },
  presetCardFeatureItem: {},
  presetCardFeatureText: {
    color: tokens.colorNeutralForeground2,
  },
  presetCardActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: tokens.spacingVerticalS,
  },
  presetCardCost: {
    color: tokens.colorNeutralForeground2,
  },
  // Runtime selection styles
  runtimeContainer: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
  },
  runtimeDropdown: {
    flex: 1,
  },
  // Field description styles
  fieldDescription: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginTop: tokens.spacingVerticalXXS,
  },
  fieldDescriptionInline: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginTop: tokens.spacingVerticalXXS,
    marginBottom: tokens.spacingVerticalS,
  },
  // Checkbox group styles
  checkboxContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  // Sticky positioning styles
  rightSectionCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingVerticalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  // Cost review styles
  costReviewCard: {
    padding: tokens.spacingVerticalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    marginBottom: tokens.spacingVerticalL,
  },
  costReviewHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalL,
  },
  costPresetInfo: {
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusSmall,
    marginBottom: tokens.spacingVerticalL,
  },
  costPresetTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalS,
  },
  costBreakdownTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalM,
  },
  costBreakdownContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  costBreakdownItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: tokens.spacingVerticalS + " 0",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  costBreakdownNote: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginTop: tokens.spacingVerticalL,
  },
  // Changes from preset styles
  changesCard: {
    padding: tokens.spacingVerticalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  changesTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalL,
  },
  changesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  changeItem: {
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusSmall,
  },
  changeItemTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalXXS,
  },
  changeItemDescription: {
    color: tokens.colorNeutralForeground3,
  },
  noChangesText: {
    color: tokens.colorNeutralForeground3,
  },
  // Additional static styles
  costHeaderContainer: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalL,
  },
  costEstimationDescription: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginBottom: tokens.spacingVerticalL,
  },
  costItemMargin: {
    marginBottom: tokens.spacingVerticalL,
  },
  costItemRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: tokens.spacingVerticalS + " 0",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  costItemTextBlock: {
    display: "block",
  },
  costItemSecondary: {
    color: tokens.colorNeutralForeground3,
    display: "block",
  },
  costTotalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: tokens.spacingVerticalM + " 0",
    paddingTop: tokens.spacingVerticalL,
  },
  costBrandAccent: {
    color: tokens.colorBrandForeground1,
  },
  costDisclaimerBox: {
    marginTop: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusSmall,
  },
  costDisclaimerFlex: {
    color: tokens.colorNeutralForeground2,
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
  },
  costDisclaimerIconSpacing: {
    flexShrink: 0,
    marginTop: "2px",
  },
  fullWidthDropdown: {
    width: "100%",
  },
  flexGap12: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
  },
  flexItem: {
    flex: 1,
  },
  textBlockMarginBottom8: {
    display: "block",
    marginBottom: tokens.spacingVerticalS,
  },
  textColorSecondary: {
    color: tokens.colorNeutralForeground3,
  },
  marginTop4: {
    marginTop: tokens.spacingVerticalXXS,
  },
  stepsEstimateBrandBlue: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalL,
  },
  costBreakdownGrid: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  costBreakdownRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: tokens.spacingVerticalS + " 0",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  presetInfoBox: {
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusSmall,
    marginBottom: tokens.spacingVerticalL,
  },
  textBlockMarginBottom16: {
    display: "block",
    marginBottom: tokens.spacingVerticalL,
  },
  textBlockMarginBottom12: {
    display: "block",
    marginBottom: tokens.spacingVerticalM,
  },
  changesFlexColumn: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  changesItemBox: {
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusSmall,
  },
  changesItemTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalXXS,
  },
  // Utility classes for remaining static styles
  textBlockMarginBottom20: {
    display: "block",
    marginBottom: tokens.spacingVerticalXL,
  },
  marginTopVertical4: {
    marginTop: tokens.spacingVerticalXXS,
  },
  gridTwoColumn: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL,
  },
  gridThreeColumn: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalL,
  },
  colorPaletteGreenForeground: {
    color: tokens.colorPaletteGreenForeground1,
  },
  // Dynamic preset card variants
  presetCardActive: {
    border: `2px solid ${tokens.colorBrandStroke1}`,
    backgroundColor: tokens.colorBrandBackground2,
  },
  presetCardInactive: {
    border: `2px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  // Preset icon styles
  presetCheckmarkIcon: {
    color: tokens.colorBrandForeground1,
    marginTop: "2px",
  },
  presetIcon: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase500,
  },
  // Storage dropdown wrapper
  storageDropdownWrapper: {
    marginTop: tokens.spacingVerticalM,
  },
  // Margin top helpers
  marginTopS: {
    marginTop: tokens.spacingVerticalS,
  },
  displayBlockMarginTopXS: {
    display: "block",
    marginTop: tokens.spacingVerticalXS,
  },
  displayBlockMarginTopL: {
    display: "block",
    marginTop: tokens.spacingVerticalL,
  },
  // Cost & changes section cards (padding XXL = 24px)
  costSectionCard: {
    padding: tokens.spacingVerticalXXL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    marginBottom: tokens.spacingVerticalXXL,
  },
  changesSectionCard: {
    padding: tokens.spacingVerticalXXL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  // Executions row (no border-bottom unlike costBreakdownRow)
  executionsRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: tokens.spacingVerticalS + " 0",
  },
});

interface Step {
  id: number;
  title: string;
  completed: boolean;
}

interface CreateFunctionAppWizardProps {
  customHeader?: React.ReactNode | null;
  onBack?: () => void;
  onComplete?: () => void;
}

const CreateFunctionAppWizard: React.FC<CreateFunctionAppWizardProps> = ({
  customHeader,
  onBack,
  onComplete,
}) => {
  const styles = useStyles();
  const router = useRouter();
  const { sourcePage, handlePageChange } = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentComplete, setDeploymentComplete] = useState(false);
  const [isCreatingStorageAccount, setIsCreatingStorageAccount] =
    useState(false);
  const [storageAccountCreated, setStorageAccountCreated] = useState(false);

  const [formData, setFormData] = useState({
    optimizationType: "cost",
    subscription: "",
    resourceGroup: "",
    vmName: "",
    region: "",
    availabilityOptions: "none",
    zoneOptions: "none",
    availabilityZones: [] as string[],
    securityType: "standard",
    image: "ubuntu",
    size: "standard-b2s",
    vmArchitecture: "x64",
    runWithSpotDiscount: false,
    vmDiskEncryption: "platform-managed",
    encryptionAtHost: false,
    osDiskSize: "default",
    osDiskType: "premium-ssd",
    deleteOSDiskWithVM: true,
    enableUltraDiskCompatibility: false,
    keyManagement: "platform-managed",
    dataDisks: [] as Array<{
      name: string;
      size: string;
      type: string;
      hostCaching: string;
    }>,
    virtualNetwork: "",
    subnet: "",
    publicIP: "none",
    nicNetworkSecurityGroup: "basic",
    publicInboundPortsNetwork: "allow-selected",
    selectedInboundPortsNetwork: [] as string[],
    deleteNICWithVM: true,
    enableAcceleratedNetworking: false,
    loadBalancingOptions: "none",
    enableDefenderForCloud: false,
    enableSystemAssignedIdentity: false,
    enableEntraID: false,
    loginWithEntraID: false,
    enablePeriodicAssessment: true,
    patchOrchestrationOptions: "azure-orchestrated",
    enableRecommendedAlertRules: false,
    bootDiagnostics: "disable",
    enableOSGuestDiagnostics: false,
    enableApplicationHealthMonitoring: false,
    enableVMInsights: false,
    authenticationType: "ssh",
    username: "",
    password: "",
    sshPublicKeySource: "generate-new",
    sshKeyType: "rsa",
    publicInboundPorts: "allow-selected",
    selectedInboundPorts: [] as string[],
    // Function App specific properties
    operatingSystem: "",
    runtimeStack: "",
    runtimeVersion: "",
    hostingPlan: "",
    inboundAccess: "",
    vnetIntegration: "",
    storageAccountType: "create-new",
    storageAccount: "",
    redundancy: "",
    encryption: "",
    enableAppInsights: "",
    logAnalyticsWorkspace: "",
    dataCollectionProfile: "",
    enableBaselineAlerts: "",
    deploymentSource: "",
    createStagingSlot: "",
    httpsOnly: "",
    minTlsVersion: "",
    enableManagedIdentity: "",
    enableKeyVaultReferences: "",
  });

  const steps: Step[] = [
    { id: 1, title: "Presets", completed: false },
    { id: 2, title: "Basics", completed: false },
    { id: 3, title: "Runtime & plan", completed: false },
    { id: 4, title: "Networking", completed: false },
    { id: 5, title: "Storage", completed: false },
    { id: 6, title: "Monitoring", completed: false },
    { id: 7, title: "Deployment & slots", completed: false },
    { id: 8, title: "Security & Identity", completed: false },
    { id: 9, title: "Cost & impact", completed: false },
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
        handlePageChange("returning-home-2");
      }
    }
  };

  const handleCreate = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeploymentComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 3000);
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
      whatItIs: "Where billing and policy apply for this VM.",
      whyItMatters:
        "Determines billing, access policies, and resource quotas. Different subscriptions may have different service limits and VM availability.",
      rulesExamples:
        "Select from available subscriptions in your tenant. Each has its own spending limits and policies.",
      proTip:
        "Use separate subscriptions for different environments (dev/test/prod) or departments for better cost tracking.",
    },
    resourceGroup: {
      title: "Resource Group",
      whatItIs:
        "Logical container for resources that share the same lifecycle.",
      whyItMatters:
        "Resources in the same group can be managed together. Deleting a resource group deletes all resources within it.",
      rulesExamples:
        'Choose an existing group or create new. Example: "rg-myapp-vms-prod" for production VM resources.',
      proTip:
        "Group VMs with their related resources (disks, NICs, NSGs) for easier management.",
    },
    vmName: {
      title: "Virtual Machine Name",
      whatItIs: "Unique identifier for your virtual machine.",
      whyItMatters:
        "This name is used to identify the VM in the portal and becomes the hostname. Must be unique within the resource group.",
      rulesExamples:
        'Use 1-64 characters: letters, numbers, hyphens, and underscores. Example: "vm-web-prod-001"',
      proTip:
        "Use a naming convention that includes environment and purpose (e.g., vm-webapp-prod-01).",
    },
    region: {
      title: "Region",
      whatItIs: "Physical datacenter location where your VM will run.",
      whyItMatters:
        "Affects latency, data residency compliance, pricing, and VM SKU availability. Choose closest to your users.",
      rulesExamples:
        "Select from available Azure regions. Popular: East US, West Europe, Southeast Asia.",
      proTip:
        "Choose a region close to your users for best performance and check VM availability.",
    },
    image: {
      title: "Image",
      whatItIs: "Operating system and pre-configured software for your VM.",
      whyItMatters:
        "Determines the OS, included software, and compatibility with your applications.",
      rulesExamples:
        "Windows Server, Ubuntu, Red Hat Enterprise Linux, or custom marketplace images.",
      proTip:
        "Use latest LTS versions for production workloads for better security and support.",
    },
    size: {
      title: "Size",
      whatItIs: "VM compute resources including CPU, memory, and storage.",
      whyItMatters:
        "Directly impacts performance and cost. Larger sizes cost more but provide better performance.",
      rulesExamples:
        "B-series for burstable workloads, D-series for general purpose, E-series for memory-intensive apps.",
      proTip:
        "Start with a smaller size and scale up as needed. B-series is cost-effective for dev/test.",
    },
    authenticationType: {
      title: "Authentication",
      whatItIs: "How you'll securely access the VM.",
      whyItMatters:
        "SSH keys are more secure than passwords. Proper authentication prevents unauthorized access.",
      rulesExamples:
        "SSH public key (recommended for Linux) or password. Windows VMs use password/RDP.",
      proTip:
        "Always use SSH keys for Linux VMs in production for better security.",
    },
  };

  const applyOptimizationPreset = (type: string) => {
    let updates: Partial<typeof formData> = { optimizationType: type };

    switch (type) {
      case "development":
        // Development preset: Fast, low-cost setup for testing
        updates = {
          ...updates,
          hostingPlan: "consumption",
          inboundAccess: "public",
          vnetIntegration: "none",
          storageAccountType: "create-new",
          redundancy: "LRS",
          encryption: "microsoft-managed",
          enableAppInsights: "yes",
          logAnalyticsWorkspace: "Create new workspace",
          dataCollectionProfile: "Recommended",
          enableBaselineAlerts: "no",
          deploymentSource: "None (deploy manually)",
          createStagingSlot: "no",
          httpsOnly: "yes",
          minTlsVersion: "1.2",
          enableManagedIdentity: "no",
          enableKeyVaultReferences: "no",
        };
        break;

      case "production-internet":
        // Production Internet preset: Public-facing production with high availability
        updates = {
          ...updates,
          hostingPlan: "premium",
          inboundAccess: "public",
          vnetIntegration: "enabled",
          storageAccountType: "create-new",
          redundancy: "ZRS",
          encryption: "microsoft-managed",
          enableAppInsights: "yes",
          logAnalyticsWorkspace: "Create new workspace",
          dataCollectionProfile: "Recommended",
          enableBaselineAlerts: "yes",
          deploymentSource: "GitHub Actions",
          createStagingSlot: "yes",
          httpsOnly: "yes",
          minTlsVersion: "1.2",
          enableManagedIdentity: "yes",
          enableKeyVaultReferences: "yes",
        };
        break;

      case "production-private":
        // Production Private preset: Fully private and secure production setup
        updates = {
          ...updates,
          hostingPlan: "premium",
          inboundAccess: "private-endpoint",
          vnetIntegration: "enabled",
          storageAccountType: "create-new",
          redundancy: "ZRS",
          encryption: "customer-managed",
          enableAppInsights: "yes",
          logAnalyticsWorkspace: "Create new workspace",
          dataCollectionProfile: "Recommended",
          enableBaselineAlerts: "yes",
          deploymentSource: "Azure DevOps",
          createStagingSlot: "yes",
          httpsOnly: "yes",
          minTlsVersion: "1.3",
          enableManagedIdentity: "yes",
          enableKeyVaultReferences: "yes",
        };
        break;

      case "manual":
        // Manual: clear configuration so user starts fresh
        updates = {
          ...updates,
          hostingPlan: "",
          inboundAccess: "",
          vnetIntegration: "",
          storageAccountType: "create-new",
          redundancy: "",
          encryption: "",
          enableAppInsights: "",
          logAnalyticsWorkspace: "",
          dataCollectionProfile: "",
          enableBaselineAlerts: "",
          deploymentSource: "",
          createStagingSlot: "",
          httpsOnly: "",
          minTlsVersion: "",
          enableManagedIdentity: "",
          enableKeyVaultReferences: "",
        };
        break;
    }

    setFormData({ ...formData, ...updates });
  };

  const getCostEstimation = () => {
    // Calculate hosting plan cost
    const hostingPlanCost =
      formData.hostingPlan === "premium"
        ? 75.0
        : formData.hostingPlan === "dedicated"
          ? 55.0
          : 0.0;

    // Calculate storage cost based on redundancy - only if redundancy is selected
    const storageCost = formData.redundancy
      ? formData.redundancy === "GZRS"
        ? 15.0
        : formData.redundancy === "GRS"
          ? 10.0
          : formData.redundancy === "ZRS"
            ? 7.5
            : formData.redundancy === "LRS"
              ? 5.0
              : 0.0
      : 0.0;

    // Networking costs (VNet integration)
    const networkingCost =
      formData.vnetIntegration && formData.vnetIntegration !== "none"
        ? 12.0
        : 0.0;

    // Monitoring costs (Application Insights)
    const monitoringCost = formData.enableAppInsights === "yes" ? 20.0 : 0.0;

    // Deployment costs (staging slot)
    const deploymentCost = formData.createStagingSlot === "yes" ? 15.0 : 0.0;

    // Estimated execution and bandwidth cost
    const executionCost = 0.5;

    const totalCost =
      hostingPlanCost +
      storageCost +
      networkingCost +
      monitoringCost +
      deploymentCost +
      executionCost;

    return (
      <div>
        <div className={styles.costHeaderContainer}>
          <Text size={500} weight="semibold">
            Cost estimation
          </Text>
        </div>

        <Text size={200} className={styles.costEstimationDescription}>
          Estimated monthly cost based on your selections. Actual costs may
          vary.
        </Text>

        <div className={styles.costItemMargin}>
          {/* Hosting Plan Cost - only show if non-zero */}
          {hostingPlanCost > 0 && (
            <div className={styles.costItemRow}>
              <div>
                <Text size={300} className={styles.costItemTextBlock}>
                  Hosting Plan
                </Text>
                <Text size={200} className={styles.costItemSecondary}>
                  {formData.hostingPlan === "premium"
                    ? "Premium (EP1)"
                    : formData.hostingPlan === "dedicated"
                      ? "Dedicated (S1)"
                      : "Consumption (Y1)"}
                </Text>
              </div>
              <Text size={300} weight="semibold">
                ${hostingPlanCost.toFixed(2)}
              </Text>
            </div>
          )}

          {/* Storage Cost - only show if redundancy is selected */}
          {storageCost > 0 && (
            <div className={styles.costItemRow}>
              <div>
                <Text size={300} className={styles.costItemTextBlock}>
                  Storage
                </Text>
                <Text size={200} className={styles.costItemSecondary}>
                  {formData.redundancy} redundancy
                </Text>
              </div>
              <Text size={300} weight="semibold">
                ${storageCost.toFixed(2)}
              </Text>
            </div>
          )}

          {/* Networking Cost - only show if non-zero */}
          {networkingCost > 0 && (
            <div className={styles.costItemRow}>
              <div>
                <Text size={300} className={styles.costItemTextBlock}>
                  Networking
                </Text>
                <Text size={200} className={styles.costItemSecondary}>
                  VNet integration enabled
                </Text>
              </div>
              <Text size={300} weight="semibold">
                ${networkingCost.toFixed(2)}
              </Text>
            </div>
          )}

          {/* Monitoring Cost - only show if non-zero */}
          {monitoringCost > 0 && (
            <div className={styles.costItemRow}>
              <div>
                <Text size={300} className={styles.costItemTextBlock}>
                  Monitoring
                </Text>
                <Text size={200} className={styles.costItemSecondary}>
                  Application Insights enabled
                </Text>
              </div>
              <Text size={300} weight="semibold">
                ${monitoringCost.toFixed(2)}
              </Text>
            </div>
          )}

          {/* Deployment Cost - only show if non-zero */}
          {deploymentCost > 0 && (
            <div className={styles.costItemRow}>
              <div>
                <Text size={300} className={styles.costItemTextBlock}>
                  Deployment
                </Text>
                <Text size={200} className={styles.costItemSecondary}>
                  Staging slot enabled
                </Text>
              </div>
              <Text size={300} weight="semibold">
                ${deploymentCost.toFixed(2)}
              </Text>
            </div>
          )}
        </div>

        {/* Total */}
        <div className={styles.costTotalRow}>
          <Text size={400} weight="semibold">
            Estimated monthly
          </Text>
          <Text size={500} weight="semibold" className={styles.costBrandAccent}>
            $
            {(
              hostingPlanCost +
              storageCost +
              networkingCost +
              monitoringCost +
              deploymentCost
            ).toFixed(2)}
          </Text>
        </div>

        {/* Disclaimer */}
        <div className={styles.costDisclaimerBox}>
          <Text size={200} className={styles.costDisclaimerFlex}>
            <Lightbulb20Regular className={styles.costDisclaimerIconSpacing} />
            <span>
              Estimates based on typical usage patterns. Actual costs depend on
              execution count, bandwidth, and resource utilization. Consumption
              plan includes 1 million free executions per month.
            </span>
          </Text>
        </div>
      </div>
    );
  };

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
            icon="/icons/Function-App.svg"
            iconAlt="Function App"
            title="Create Function App"
          />

          <div className={styles.deploymentContainer}>
            <DeploymentSuccessCard
              className={styles.deploymentCard}
              title="Your function app was deployed successfully"
              description="Your function app has been created and is ready to use."
              sections={[
                { id: "deploy", label: "1. Deploy resources" },
                {
                  id: "details",
                  label: "2. Resource details",
                  defaultExpanded: true,
                  children: (
                    <div className={styles.gridTwoColumn}>
                      <div>
                        <Text size={200} className={styles.deploymentDetailLabel}>
                          Function app name
                        </Text>
                        <Text size={300}>
                          {formData.vmName || "my-function-app"}
                        </Text>
                      </div>
                      <div>
                        <Text size={200} className={styles.deploymentDetailLabel}>
                          Resource group
                        </Text>
                        <Text size={300}>
                          {formData.resourceGroup || "Not specified"}
                        </Text>
                      </div>
                      <div>
                        <Text size={200} className={styles.deploymentDetailLabel}>
                          Type
                        </Text>
                        <Text size={300}>Function App</Text>
                      </div>
                      <div>
                        <Text size={200} className={styles.deploymentDetailLabel}>
                          Region
                        </Text>
                        <Text size={300}>
                          {formData.region === "east-us"
                            ? "East US"
                            : formData.region === "west-us-2"
                              ? "West US 2"
                              : formData.region === "west-europe"
                                ? "West Europe"
                                : formData.region === "southeast-asia"
                                  ? "Southeast Asia"
                                  : "East US"}
                        </Text>
                      </div>
                      <div>
                        <Text size={200} className={styles.deploymentDetailLabel}>
                          Runtime stack
                        </Text>
                        <Text size={300}>
                          {formData.runtimeStack || "Node.js 20"}
                        </Text>
                      </div>
                      <div>
                        <Text size={200} className={styles.deploymentDetailLabel}>
                          Hosting plan
                        </Text>
                        <Text size={300}>
                          {formData.hostingPlan === "premium"
                            ? "Premium (EP1)"
                            : formData.hostingPlan === "dedicated"
                              ? "Dedicated (B1)"
                              : "Consumption (Serverless)"}
                        </Text>
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
                    icon: <Save20Filled className={styles.costBrandAccent} />,
                    title: "Create a storage account",
                    description:
                      "Add blob storage, file shares, and backup capabilities to your function app",
                  },
                  {
                    icon: <Database20Regular className={styles.costBrandAccent} />,
                    title: "Configure database",
                    description:
                      "Set up Azure SQL Database or MySQL for your application data",
                  },
                  {
                    icon: <ShieldTask20Regular className={styles.costBrandAccent} />,
                    title: "Deploy advanced firewall",
                    description:
                      "Add Azure Firewall for enhanced network security and threat protection",
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
          icon="/icons/virtual-machine.svg"
          iconAlt="Virtual Machine"
          title="Create function app"
          description="Execute code in a serverless environment without having to first create a VM or publish a web application"
        />

        <WizardLayout
          stepNav={
            <WizardStepNav
              steps={steps}
              activeStep={currentStep}
              onStepChange={setCurrentStep}
            />
          }
          rightPanel={
            currentStep !== 1 && currentStep !== 9 ? (
              <div className={styles.rightSectionCard}>
                {getCostEstimation()}
              </div>
            ) : null
          }
          hasCustomHeader={customHeader !== null && customHeader !== undefined}
        >
          <div className={styles.centerSection}>
            {currentStep === 1 && (
              <WizardSection
                title="Presets"
                description='Ready-made "starter packs" that turn on smart, safe settings for you. Save time, reduce mistakes, keep things secure, and give you a good cost starting point. You can change details if you want.'
              >
                {/* Preset Cards */}
                <div className={styles.presetContainer}>
                  {/* Development Preset */}
                  <div
                    className={mergeClasses(
                      styles.presetCard,
                      formData.optimizationType === "development"
                        ? styles.presetCardActive
                        : styles.presetCardInactive,
                    )}
                  >
                    <div className={styles.presetCardContent}>
                      {formData.optimizationType === "development" && (
                        <Checkmark20Regular
                          className={styles.presetCheckmarkIcon}
                        />
                      )}
                      <div className={styles.presetCardBody}>
                        <div className={styles.presetCardHeader}>
                          <Code20Regular className={styles.presetIcon} />
                          <Text
                            size={400}
                            weight="semibold"
                            className={styles.presetCardTitle}
                          >
                            Development
                          </Text>
                        </div>
                        <Text
                          size={300}
                          className={styles.presetCardDescription}
                        >
                          Fast, low-cost setup for testing - public endpoint,
                          scales to zero.
                        </Text>
                        <ul className={styles.presetCardFeatures}>
                          <li className={styles.presetCardFeatureItem}>
                            <Text
                              size={300}
                              className={styles.presetCardFeatureText}
                            >
                              Consumption (Y1) plan; serverless auto-scale
                              (Default from preset)
                            </Text>
                          </li>
                          <li className={styles.presetCardFeatureItem}>
                            <Text
                              size={300}
                              className={styles.presetCardFeatureText}
                            >
                              Public endpoint with access restrictions you can
                              tighten
                            </Text>
                          </li>
                          <li className={styles.presetCardFeatureItem}>
                            <Text
                              size={300}
                              className={styles.presetCardFeatureText}
                            >
                              Storage (LRS) + Application Insights with basic
                              signals
                            </Text>
                          </li>
                        </ul>
                      </div>
                      <div className={styles.presetCardActions}>
                        <Text size={300} className={styles.presetCardCost}>
                          Estimated Cost: $
                        </Text>
                        <Button
                          appearance="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            applyOptimizationPreset("development");
                            setCurrentStep(2);
                          }}
                        >
                          Get started
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Production Internet Preset */}
                  <div
                    className={mergeClasses(
                      styles.presetCard,
                      formData.optimizationType === "production-internet"
                        ? styles.presetCardActive
                        : styles.presetCardInactive,
                    )}
                  >
                    <div className={styles.presetCardContent}>
                      {formData.optimizationType === "production-internet" && (
                        <Checkmark20Regular
                          className={styles.presetCheckmarkIcon}
                        />
                      )}
                      <div className={styles.presetCardBody}>
                        <div className={styles.presetCardHeader}>
                          <Globe20Regular className={styles.presetIcon} />
                          <Text
                            size={400}
                            weight="semibold"
                            className={styles.presetCardTitle}
                          >
                            Production Internet
                          </Text>
                        </div>
                        <Text
                          size={300}
                          className={styles.presetCardDescription}
                        >
                          Internet-facing APIs. Locked-down public access;
                          predictable performance.
                        </Text>
                        <ul className={styles.presetCardFeatures}>
                          <li className={styles.presetCardFeatureItem}>
                            <Text
                              size={300}
                              className={styles.presetCardFeatureText}
                            >
                              Elastic Premium (EP1) with 1 pre-warmed instance
                              (Default from preset)
                            </Text>
                          </li>
                          <li className={styles.presetCardFeatureItem}>
                            <Text
                              size={300}
                              className={styles.presetCardFeatureText}
                            >
                              Access restrictions allowlist; VNet integration
                              for outbound (NAT optional)
                            </Text>
                          </li>
                          <li className={styles.presetCardFeatureItem}>
                            <Text
                              size={300}
                              className={styles.presetCardFeatureText}
                            >
                              Staging slot ready for blue/green; insights
                              (workspace-based) + recommended DCR + baseline
                              alerts
                            </Text>
                          </li>
                        </ul>
                      </div>
                      <div className={styles.presetCardActions}>
                        <Text size={300} className={styles.presetCardCost}>
                          Estimated Cost: $$
                        </Text>
                        <Button
                          appearance="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            applyOptimizationPreset("production-internet");
                            setCurrentStep(2);
                          }}
                        >
                          Get started
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Production Private Preset */}
                  <div
                    className={mergeClasses(
                      styles.presetCard,
                      formData.optimizationType === "production-private"
                        ? styles.presetCardActive
                        : styles.presetCardInactive,
                    )}
                  >
                    <div className={styles.presetCardContent}>
                      {formData.optimizationType === "production-private" && (
                        <Checkmark20Regular
                          className={styles.presetCheckmarkIcon}
                        />
                      )}
                      <div className={styles.presetCardBody}>
                        <div className={styles.presetCardHeader}>
                          <LockClosed20Regular className={styles.presetIcon} />
                          <Text
                            size={400}
                            weight="semibold"
                            className={styles.presetCardTitle}
                          >
                            Production Private
                          </Text>
                        </div>
                        <Text
                          size={300}
                          className={styles.presetCardDescription}
                        >
                          Internal-only endpoints on your VNet. No public
                          access.
                        </Text>
                        <ul className={styles.presetCardFeatures}>
                          <li className={styles.presetCardFeatureItem}>
                            <Text
                              size={300}
                              className={styles.presetCardFeatureText}
                            >
                              Elastic Premium (EP1) + Always on (Default from
                              preset)
                            </Text>
                          </li>
                          <li className={styles.presetCardFeatureItem}>
                            <Text
                              size={300}
                              className={styles.presetCardFeatureText}
                            >
                              Private Endpoint + Private DNS; Public network
                              access disabled
                            </Text>
                          </li>
                          <li className={styles.presetCardFeatureItem}>
                            <Text
                              size={300}
                              className={styles.presetCardFeatureText}
                            >
                              VNet Integration for outbound + NAT Gateway;
                              Storage with PE; Insights + DCR + Alerts
                            </Text>
                          </li>
                          <li className={styles.presetCardFeatureItem}>
                            <Text
                              size={300}
                              className={styles.presetCardFeatureText}
                            >
                              Zonally resilient to increase availability during
                              zonal outages
                            </Text>
                          </li>
                        </ul>
                      </div>
                      <div className={styles.presetCardActions}>
                        <Text size={300} className={styles.presetCardCost}>
                          Estimated Cost: $$$
                        </Text>
                        <Button
                          appearance="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            applyOptimizationPreset("production-private");
                            setCurrentStep(2);
                          }}
                        >
                          Get started
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </WizardSection>
            )}

            {currentStep === 2 && (
              <WizardSection title="Basics">
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
                    className={styles.fullWidthDropdown}
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
                  <Label required>Resource group</Label>
                  <Dropdown
                    placeholder="Select or create resource group"
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
                    className={styles.fullWidthDropdown}
                  >
                    <Option value="rg-production">rg-production</Option>
                    <Option value="rg-development">rg-development</Option>
                    <Option value="rg-test">rg-test</Option>
                    <Option value="create-new">Create new</Option>
                  </Dropdown>
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
                    className={styles.fullWidthDropdown}
                  >
                    <Option value="eastus">East US</Option>
                    <Option value="westus2">West US 2</Option>
                    <Option value="westeurope">West Europe</Option>
                    <Option value="southeastasia">Southeast Asia</Option>
                  </Dropdown>
                </div>

                <div className={styles.formField}>
                  <Label required>Function app name</Label>
                  <Input
                    placeholder="my-function-app"
                    value={formData.vmName}
                    onChange={(e) =>
                      setFormData({ ...formData, vmName: e.target.value })
                    }
                    onFocus={() => setActiveField("vmName")}
                    className={styles.fullWidthDropdown}
                  />
                  <Text size={200} className={styles.fieldDescription}>
                    Name must be globally unique and contain only alphanumeric
                    characters and hyphens
                  </Text>
                </div>
              </WizardSection>
            )}

            {currentStep === 3 && (
              <WizardSection title="Runtime & plan">
                <div className={styles.formField}>
                  <Label required>Operating system</Label>
                  <RadioGroup
                    value={formData.operatingSystem}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        operatingSystem: data.value,
                      })
                    }
                    onFocus={() => setActiveField("operatingSystem")}
                  >
                    <Radio value="windows" label="Windows" />
                    <Radio value="linux" label="Linux" />
                  </RadioGroup>
                </div>

                <div className={styles.formField}>
                  <Label required>Runtime stack</Label>
                  <div className={styles.flexGap12}>
                    <Dropdown
                      placeholder="Select runtime"
                      value={formData.runtimeStack}
                      selectedOptions={
                        formData.runtimeStack ? [formData.runtimeStack] : []
                      }
                      onOptionSelect={(_, data) =>
                        setFormData({
                          ...formData,
                          runtimeStack: data.optionValue as string,
                          runtimeVersion: "", // Reset version when runtime changes
                        })
                      }
                      onFocus={() => setActiveField("runtimeStack")}
                      className={styles.flexItem}
                    >
                      <Option value="dotnet">.NET</Option>
                      <Option value="node">Node.js</Option>
                      <Option value="python">Python</Option>
                      <Option value="java">Java</Option>
                    </Dropdown>
                    <Dropdown
                      placeholder="Select version"
                      value={formData.runtimeVersion}
                      selectedOptions={
                        formData.runtimeVersion ? [formData.runtimeVersion] : []
                      }
                      onOptionSelect={(_, data) =>
                        setFormData({
                          ...formData,
                          runtimeVersion: data.optionValue as string,
                        })
                      }
                      onFocus={() => setActiveField("runtimeVersion")}
                      className={styles.flexItem}
                      disabled={!formData.runtimeStack}
                    >
                      {formData.runtimeStack === "dotnet" && (
                        <>
                          <Option value="8">8 (LTS)</Option>
                          <Option value="6">6 (LTS)</Option>
                        </>
                      )}
                      {formData.runtimeStack === "node" && (
                        <>
                          <Option value="20">20 LTS</Option>
                          <Option value="18">18 LTS</Option>
                          <Option value="16">16 LTS</Option>
                        </>
                      )}
                      {formData.runtimeStack === "python" && (
                        <>
                          <Option value="3.11">3.11</Option>
                          <Option value="3.10">3.10</Option>
                          <Option value="3.9">3.9</Option>
                        </>
                      )}
                      {formData.runtimeStack === "java" && (
                        <>
                          <Option value="17">17</Option>
                          <Option value="11">11</Option>
                        </>
                      )}
                    </Dropdown>
                  </div>
                </div>

                <div className={styles.formField}>
                  <Label required>Hosting plan</Label>
                  <RadioGroup
                    value={formData.hostingPlan}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        hostingPlan: data.value,
                      })
                    }
                    onFocus={() => setActiveField("hostingPlan")}
                  >
                    <Radio
                      value="consumption"
                      label="Consumption (Serverless)"
                    />
                    <Radio value="premium" label="Premium" />
                    <Radio
                      value="dedicated"
                      label="Dedicated (App Service Plan)"
                    />
                  </RadioGroup>
                  <Text
                    size={200}
                    className={mergeClasses(
                      styles.textColorSecondary,
                      styles.displayBlockMarginTopXS,
                    )}
                  >
                    Consumption plan offers automatic scaling and
                    pay-per-execution pricing
                  </Text>
                </div>
              </WizardSection>
            )}

            {currentStep === 4 && (
              <WizardSection
                title="Networking"
                description="Choose how your app is reached and how it reaches others"
              >
                <div className={styles.formField}>
                  <Label required>Inbound access</Label>
                  <Text size={200} className={styles.fieldDescriptionInline}>
                    Control how your function app can be accessed from the
                    internet
                  </Text>
                  <div className={styles.checkboxContainer}>
                    <Checkbox
                      label="Public"
                      checked={formData.inboundAccess === "public"}
                      onChange={(_, data) =>
                        setFormData({
                          ...formData,
                          inboundAccess: data.checked ? "public" : "",
                        })
                      }
                      onFocus={() => setActiveField("inboundAccess")}
                    />
                    <Checkbox
                      label="Private endpoint"
                      checked={formData.inboundAccess === "private"}
                      onChange={(_, data) =>
                        setFormData({
                          ...formData,
                          inboundAccess: data.checked ? "private" : "",
                        })
                      }
                      onFocus={() => setActiveField("inboundAccess")}
                    />
                    <Checkbox
                      label="Service endpoint"
                      checked={formData.inboundAccess === "service-endpoint"}
                      onChange={(_, data) =>
                        setFormData({
                          ...formData,
                          inboundAccess: data.checked ? "service-endpoint" : "",
                        })
                      }
                      onFocus={() => setActiveField("inboundAccess")}
                    />
                  </div>
                </div>

                <div className={styles.formField}>
                  <Label>VNet Integration</Label>
                  <Text size={200} className={styles.fieldDescriptionInline}>
                    Connect your function app to a virtual network for outbound
                    connectivity
                  </Text>
                  <Checkbox
                    label="Enable VNet Integration"
                    checked={
                      formData.vnetIntegration !== "" &&
                      formData.vnetIntegration !== "none"
                    }
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        vnetIntegration: data.checked ? "enabled" : "none",
                      })
                    }
                    onFocus={() => setActiveField("vnetIntegration")}
                  />
                </div>
              </WizardSection>
            )}

            {currentStep === 5 && (
              <WizardSection
                title="Storage"
                description="Function apps need storage for runtime state and artifacts"
              >
                <div className={styles.formField}>
                  <Label required>Storage account</Label>
                  <RadioGroup
                    value={formData.storageAccountType}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        storageAccountType: data.value,
                        storageAccount: "", // Reset selection when switching types
                      })
                    }
                    onFocus={() => setActiveField("storageAccount")}
                  >
                    <Radio
                      value="create-new"
                      label="Create a new storage account"
                    />
                    <Radio value="use-existing" label="Use existing" />
                  </RadioGroup>

                  {formData.storageAccountType === "use-existing" && (
                    <div className={styles.storageDropdownWrapper}>
                      <Dropdown
                        placeholder="Select storage account"
                        value={formData.storageAccount}
                        selectedOptions={
                          formData.storageAccount
                            ? [formData.storageAccount]
                            : []
                        }
                        onOptionSelect={(_, data) =>
                          setFormData({
                            ...formData,
                            storageAccount: data.optionValue as string,
                          })
                        }
                        className={styles.fullWidthDropdown}
                      >
                        <Option value="stgprod01">stgprod01</Option>
                        <Option value="stgdev01">stgdev01</Option>
                        <Option value="stgtest01">stgtest01</Option>
                      </Dropdown>
                    </div>
                  )}

                  <Text
                    size={200}
                    className={mergeClasses(
                      styles.fieldDescription,
                      styles.marginTopS,
                    )}
                  >
                    Storage account for function app triggers, logs, and code
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Label required>Redundancy</Label>
                  <Dropdown
                    placeholder="Select redundancy option"
                    value={formData.redundancy}
                    selectedOptions={
                      formData.redundancy ? [formData.redundancy] : []
                    }
                    onOptionSelect={(_, data) =>
                      setFormData({
                        ...formData,
                        redundancy: data.optionValue as string,
                      })
                    }
                    onFocus={() => setActiveField("redundancy")}
                    className={styles.fullWidthDropdown}
                  >
                    <Option value="lrs">Locally-redundant storage (LRS)</Option>
                    <Option value="zrs">Zone-redundant storage (ZRS)</Option>
                    <Option value="grs">Geo-redundant storage (GRS)</Option>
                    <Option value="gzrs">
                      Geo-zone-redundant storage (GZRS)
                    </Option>
                  </Dropdown>
                  <Text size={200} className={styles.fieldDescription}>
                    How your data is replicated for durability and availability
                  </Text>
                </div>

                <div className={styles.formField}>
                  <Label required>Encryption</Label>
                  <Text size={200} className={styles.fieldDescriptionInline}>
                    All data is encrypted at rest. Choose who manages the keys
                  </Text>
                  <RadioGroup
                    value={formData.encryption}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        encryption: data.value,
                      })
                    }
                    onFocus={() => setActiveField("encryption")}
                  >
                    <Radio value="microsoft" label="Microsoft-managed keys" />
                    <Radio value="customer" label="Customer-managed keys" />
                  </RadioGroup>
                </div>
              </WizardSection>
            )}

            {currentStep === 6 && (
              <WizardSection
                title="Monitoring"
                description="Logs billed by GB; retention adds storage"
              >
                <div className={styles.formField}>
                  <Checkbox
                    label="Enable application insights"
                    checked={formData.enableAppInsights === "yes"}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        enableAppInsights: data.checked ? "yes" : "no",
                      })
                    }
                    onFocus={() => setActiveField("enableAppInsights")}
                  />
                </div>

                <div className={styles.formField}>
                  <Label>Log analytics workspace</Label>
                  <Text size={200} className={styles.fieldDescriptionInline}>
                    Centralized log storage and analytics
                  </Text>
                  <RadioGroup
                    value={formData.logAnalyticsWorkspace}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        logAnalyticsWorkspace: data.value,
                      })
                    }
                    onFocus={() => setActiveField("logAnalyticsWorkspace")}
                  >
                    <Radio value="create-new" label="Create new workspace" />
                    <Radio
                      value="use-existing"
                      label="Use existing workspace"
                    />
                  </RadioGroup>
                </div>

                <div className={styles.formField}>
                  <Label>Data collection Profile</Label>
                  <Text size={200} className={styles.fieldDescriptionInline}>
                    Control what telemetry data is collected
                  </Text>
                  <RadioGroup
                    value={formData.dataCollectionProfile}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        dataCollectionProfile: data.value,
                      })
                    }
                    onFocus={() => setActiveField("dataCollectionProfile")}
                  >
                    <Radio value="recommended" label="Recommended" />
                    <Radio value="minimal" label="Minimal" />
                  </RadioGroup>
                </div>

                <div className={styles.formField}>
                  <Checkbox
                    label="Enable baseline alerts"
                    checked={formData.enableBaselineAlerts === "yes"}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        enableBaselineAlerts: data.checked ? "yes" : "no",
                      })
                    }
                    onFocus={() => setActiveField("enableBaselineAlerts")}
                  />
                </div>
              </WizardSection>
            )}

            {currentStep === 7 && (
              <WizardSection
                title="Deployment & slots"
                description="Link CI/CD now or add it after creation. Use slots for safe releases"
              >
                <div className={styles.formField}>
                  <Label>Deployment source</Label>
                  <Text size={200} className={styles.fieldDescriptionInline}>
                    Configure continuous deployment from your code repository
                  </Text>
                  <RadioGroup
                    value={formData.deploymentSource}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        deploymentSource: data.value,
                      })
                    }
                    onFocus={() => setActiveField("deploymentSource")}
                  >
                    <Radio value="none" label="None (deploy manually)" />
                    <Radio value="github" label="GitHub Actions" />
                    <Radio value="azure-devops" label="Azure DevOps" />
                  </RadioGroup>
                </div>

                <div className={styles.formField}>
                  <Checkbox
                    label="Create staging slot"
                    checked={formData.createStagingSlot === "yes"}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        createStagingSlot: data.checked ? "yes" : "no",
                      })
                    }
                    onFocus={() => setActiveField("createStagingSlot")}
                  />
                </div>
              </WizardSection>
            )}

            {currentStep === 8 && (
              <WizardSection
                title="Security & Identity"
                description="Prefer identity over secrets and enforce secure transport"
              >
                <div className={styles.formField}>
                  <Checkbox
                    checked={formData.httpsOnly === "yes"}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        httpsOnly: data.checked ? "yes" : "no",
                      })
                    }
                    label="HTTPS only - Redirect all HTTP traffic to HTTPS"
                  />
                </div>

                <div className={styles.formField}>
                  <Label required>Minimum TLS version</Label>
                  <Text size={200} className={styles.fieldDescription}>
                    Set the minimum TLS version for secure connections
                  </Text>
                  <RadioGroup
                    value={formData.minTlsVersion}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        minTlsVersion: data.value,
                      })
                    }
                  >
                    <Radio value="1.2" label="TLS 1.2" />
                    <Radio value="1.3" label="TLS 1.3 (Recommended)" />
                  </RadioGroup>
                </div>

                <div className={styles.formField}>
                  <Checkbox
                    checked={formData.enableManagedIdentity === "yes"}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        enableManagedIdentity: data.checked ? "yes" : "no",
                      })
                    }
                    label="Enable system-assigned managed identity"
                  />
                </div>

                <div className={styles.formField}>
                  <Checkbox
                    checked={formData.enableKeyVaultReferences === "yes"}
                    onChange={(_, data) =>
                      setFormData({
                        ...formData,
                        enableKeyVaultReferences: data.checked ? "yes" : "no",
                      })
                    }
                    label="Enable key vault references"
                  />
                </div>
              </WizardSection>
            )}

            {currentStep === 9 && (
              <WizardSection title="Cost & impact">
                {/* Cost Estimate Card */}
                <div className={styles.costSectionCard}>
                  {(() => {
                    // Calculate costs dynamically
                    const hostingPlanCost =
                      formData.hostingPlan === "premium"
                        ? 75.0
                        : formData.hostingPlan === "dedicated"
                          ? 55.0
                          : 0.0;

                    const storageCost = formData.redundancy
                      ? formData.redundancy === "GZRS"
                        ? 15.0
                        : formData.redundancy === "GRS"
                          ? 10.0
                          : formData.redundancy === "ZRS"
                            ? 7.5
                            : formData.redundancy === "LRS"
                              ? 5.0
                              : 0.0
                      : 0.0;

                    const networkingCost =
                      formData.vnetIntegration &&
                      formData.vnetIntegration !== "none"
                        ? 12.0
                        : 0.0;

                    const monitoringCost =
                      formData.enableAppInsights === "yes" ? 20.0 : 0.0;

                    const deploymentCost =
                      formData.createStagingSlot === "yes" ? 15.0 : 0.0;

                    const executionCost = 0.5;

                    const totalCost =
                      hostingPlanCost +
                      storageCost +
                      networkingCost +
                      monitoringCost +
                      deploymentCost +
                      executionCost;

                    return (
                      <>
                        <div className={styles.stepsEstimateBrandBlue}>
                          <Text size={400} weight="semibold">
                            Estimated monthly cost
                          </Text>
                          <Text
                            size={600}
                            weight="bold"
                            className={styles.costBrandAccent}
                          >
                            ${totalCost.toFixed(2)}
                          </Text>
                        </div>
                      </>
                    );
                  })()}

                  <div className={styles.presetInfoBox}>
                    <Text
                      size={300}
                      weight="semibold"
                      className={styles.textBlockMarginBottom8}
                    >
                      Selected Preset:{" "}
                      {formData.optimizationType === "development"
                        ? "Development"
                        : formData.optimizationType === "production-internet"
                          ? "Production Internet"
                          : formData.optimizationType === "production-private"
                            ? "Production Private"
                            : "None"}
                    </Text>
                    <Text size={200} className={styles.textColorSecondary}>
                      {formData.optimizationType === "development"
                        ? "Fast, low-cost setup for testing - public endpoint, scales to zero"
                        : formData.optimizationType === "production-internet"
                          ? "Internet-facing APIs with locked-down public access and predictable performance"
                          : formData.optimizationType === "production-private"
                            ? "Internal-only endpoints on your VNet with no public access"
                            : "No preset selected"}
                    </Text>
                  </div>

                  <Text
                    size={300}
                    weight="semibold"
                    className={styles.textBlockMarginBottom12}
                  >
                    Cost breakdown
                  </Text>

                  <div className={styles.costBreakdownGrid}>
                    <div className={styles.costBreakdownRow}>
                      <Text size={300}>
                        Hosting plan ({formData.hostingPlan || "Consumption"})
                      </Text>
                      <Text size={300} weight="semibold">
                        $
                        {formData.hostingPlan === "premium"
                          ? "75.00"
                          : formData.hostingPlan === "dedicated"
                            ? "55.00"
                            : "0.00"}
                      </Text>
                    </div>

                    <div className={styles.costBreakdownRow}>
                      <Text size={300}>
                        Storage ({formData.redundancy || "LRS"})
                      </Text>
                      <Text size={300} weight="semibold">
                        $
                        {formData.redundancy === "GZRS"
                          ? "15.00"
                          : formData.redundancy === "GRS"
                            ? "10.00"
                            : formData.redundancy === "ZRS"
                              ? "7.50"
                              : "5.00"}
                      </Text>
                    </div>

                    <div className={styles.costBreakdownRow}>
                      <Text size={300}>
                        Networking (
                        {formData.vnetIntegration &&
                        formData.vnetIntegration !== "none"
                          ? "VNet enabled"
                          : "Basic"}
                        )
                      </Text>
                      <Text size={300} weight="semibold">
                        $
                        {formData.vnetIntegration &&
                        formData.vnetIntegration !== "none"
                          ? "12.00"
                          : "0.00"}
                      </Text>
                    </div>

                    <div className={styles.costBreakdownRow}>
                      <Text size={300}>
                        Monitoring (
                        {formData.enableAppInsights === "yes"
                          ? "App Insights enabled"
                          : "Disabled"}
                        )
                      </Text>
                      <Text size={300} weight="semibold">
                        $
                        {formData.enableAppInsights === "yes"
                          ? "20.00"
                          : "0.00"}
                      </Text>
                    </div>

                    <div className={styles.costBreakdownRow}>
                      <Text size={300}>
                        Deployment (
                        {formData.createStagingSlot === "yes"
                          ? "Staging slot enabled"
                          : "No slots"}
                        )
                      </Text>
                      <Text size={300} weight="semibold">
                        $
                        {formData.createStagingSlot === "yes"
                          ? "15.00"
                          : "0.00"}
                      </Text>
                    </div>

                    <div className={styles.executionsRow}>
                      <Text size={300}>Estimated executions & bandwidth</Text>
                      <Text size={300} weight="semibold">
                        $0.50
                      </Text>
                    </div>
                  </div>

                  <Text
                    size={200}
                    className={mergeClasses(
                      styles.textColorSecondary,
                      styles.displayBlockMarginTopL,
                    )}
                  >
                    Estimates based on typical usage patterns. Actual costs may
                    vary based on execution count, bandwidth, and resource
                    utilization.
                  </Text>
                </div>

                {/* Changes from Preset Section */}
                <div className={styles.changesSectionCard}>
                  <Text
                    size={400}
                    weight="semibold"
                    className={styles.textBlockMarginBottom16}
                  >
                    Changes from preset
                  </Text>

                  {/* Check if any changes were made */}
                  {(() => {
                    const changes = [];

                    // Default preset values based on selection
                    const presetDefaults: Record<string, any> = {
                      development: {
                        hostingPlan: "consumption",
                        inboundAccess: "public",
                        vnetIntegration: "none",
                        redundancy: "LRS",
                        encryption: "microsoft-managed",
                        enableAppInsights: "yes",
                        logAnalyticsWorkspace: "Create new workspace",
                        dataCollectionProfile: "Recommended",
                        enableBaselineAlerts: "no",
                        deploymentSource: "None (deploy manually)",
                        createStagingSlot: "no",
                        httpsOnly: "yes",
                        minTlsVersion: "1.2",
                        enableManagedIdentity: "no",
                        enableKeyVaultReferences: "no",
                      },
                      "production-internet": {
                        hostingPlan: "premium",
                        inboundAccess: "public",
                        vnetIntegration: "enabled",
                        redundancy: "ZRS",
                        encryption: "microsoft-managed",
                        enableAppInsights: "yes",
                        logAnalyticsWorkspace: "Create new workspace",
                        dataCollectionProfile: "Recommended",
                        enableBaselineAlerts: "yes",
                        deploymentSource: "GitHub Actions",
                        createStagingSlot: "yes",
                        httpsOnly: "yes",
                        minTlsVersion: "1.2",
                        enableManagedIdentity: "yes",
                        enableKeyVaultReferences: "yes",
                      },
                      "production-private": {
                        hostingPlan: "premium",
                        inboundAccess: "private-endpoint",
                        vnetIntegration: "enabled",
                        redundancy: "ZRS",
                        encryption: "customer-managed",
                        enableAppInsights: "yes",
                        logAnalyticsWorkspace: "Create new workspace",
                        dataCollectionProfile: "Recommended",
                        enableBaselineAlerts: "yes",
                        deploymentSource: "Azure DevOps",
                        createStagingSlot: "yes",
                        httpsOnly: "yes",
                        minTlsVersion: "1.3",
                        enableManagedIdentity: "yes",
                        enableKeyVaultReferences: "yes",
                      },
                    };

                    const currentPreset = formData.optimizationType;
                    const defaults = presetDefaults[currentPreset] || {};

                    // Compare form data with preset defaults
                    if (
                      formData.hostingPlan &&
                      formData.hostingPlan !== defaults.hostingPlan
                    ) {
                      changes.push({
                        field: "Hosting plan",
                        from: defaults.hostingPlan || "Consumption",
                        to: formData.hostingPlan,
                      });
                    }
                    if (
                      formData.inboundAccess &&
                      formData.inboundAccess !== defaults.inboundAccess
                    ) {
                      changes.push({
                        field: "Inbound access",
                        from: defaults.inboundAccess || "Public",
                        to: formData.inboundAccess,
                      });
                    }
                    if (
                      formData.vnetIntegration &&
                      formData.vnetIntegration !== defaults.vnetIntegration
                    ) {
                      changes.push({
                        field: "VNet Integration",
                        from: defaults.vnetIntegration || "None",
                        to: formData.vnetIntegration,
                      });
                    }
                    if (
                      formData.enableAppInsights &&
                      formData.enableAppInsights !== defaults.enableAppInsights
                    ) {
                      changes.push({
                        field: "Application Insights",
                        from:
                          defaults.enableAppInsights === "yes"
                            ? "Enabled"
                            : "Disabled",
                        to:
                          formData.enableAppInsights === "yes"
                            ? "Enabled"
                            : "Disabled",
                      });
                    }
                    if (
                      formData.createStagingSlot &&
                      formData.createStagingSlot !== defaults.createStagingSlot
                    ) {
                      changes.push({
                        field: "Staging slot",
                        from:
                          defaults.createStagingSlot === "yes"
                            ? "Enabled"
                            : "Disabled",
                        to:
                          formData.createStagingSlot === "yes"
                            ? "Enabled"
                            : "Disabled",
                      });
                    }
                    if (
                      formData.httpsOnly &&
                      formData.httpsOnly !== defaults.httpsOnly
                    ) {
                      changes.push({
                        field: "HTTPS only",
                        from:
                          defaults.httpsOnly === "yes" ? "Enabled" : "Disabled",
                        to:
                          formData.httpsOnly === "yes" ? "Enabled" : "Disabled",
                      });
                    }
                    if (
                      formData.enableManagedIdentity &&
                      formData.enableManagedIdentity !==
                        defaults.enableManagedIdentity
                    ) {
                      changes.push({
                        field: "Managed identity",
                        from:
                          defaults.enableManagedIdentity === "yes"
                            ? "Enabled"
                            : "Disabled",
                        to:
                          formData.enableManagedIdentity === "yes"
                            ? "Enabled"
                            : "Disabled",
                      });
                    }
                    if (
                      formData.redundancy &&
                      formData.redundancy !== defaults.redundancy
                    ) {
                      changes.push({
                        field: "Storage redundancy",
                        from: defaults.redundancy || "LRS",
                        to: formData.redundancy,
                      });
                    }
                    if (
                      formData.encryption &&
                      formData.encryption !== defaults.encryption
                    ) {
                      changes.push({
                        field: "Encryption",
                        from: defaults.encryption || "Microsoft-managed",
                        to: formData.encryption,
                      });
                    }
                    if (
                      formData.deploymentSource &&
                      formData.deploymentSource !== defaults.deploymentSource
                    ) {
                      changes.push({
                        field: "Deployment source",
                        from: defaults.deploymentSource || "None",
                        to: formData.deploymentSource,
                      });
                    }
                    if (
                      formData.minTlsVersion &&
                      formData.minTlsVersion !== defaults.minTlsVersion
                    ) {
                      changes.push({
                        field: "Minimum TLS version",
                        from: defaults.minTlsVersion || "1.2",
                        to: formData.minTlsVersion,
                      });
                    }
                    if (
                      formData.enableBaselineAlerts &&
                      formData.enableBaselineAlerts !==
                        defaults.enableBaselineAlerts
                    ) {
                      changes.push({
                        field: "Baseline alerts",
                        from:
                          defaults.enableBaselineAlerts === "yes"
                            ? "Enabled"
                            : "Disabled",
                        to:
                          formData.enableBaselineAlerts === "yes"
                            ? "Enabled"
                            : "Disabled",
                      });
                    }
                    if (
                      formData.enableKeyVaultReferences &&
                      formData.enableKeyVaultReferences !==
                        defaults.enableKeyVaultReferences
                    ) {
                      changes.push({
                        field: "Key Vault references",
                        from:
                          defaults.enableKeyVaultReferences === "yes"
                            ? "Enabled"
                            : "Disabled",
                        to:
                          formData.enableKeyVaultReferences === "yes"
                            ? "Enabled"
                            : "Disabled",
                      });
                    }

                    if (changes.length === 0) {
                      return (
                        <Text size={300} className={styles.textColorSecondary}>
                          No changes made from the preset configuration
                        </Text>
                      );
                    }

                    return (
                      <div className={styles.changesFlexColumn}>
                        {changes.map((change, index) => (
                          <div key={index} className={styles.changesItemBox}>
                            <Text
                              size={300}
                              weight="semibold"
                              className={styles.changesItemTitle}
                            >
                              {change.field}
                            </Text>
                            <Text
                              size={200}
                              className={styles.textColorSecondary}
                            >
                              Changed from <strong>{change.from}</strong> to{" "}
                              <strong>{change.to}</strong>
                            </Text>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </WizardSection>
            )}

            <WizardActionBar
              currentStep={currentStep}
              totalSteps={9}
              reviewStep={9}
              nextLabel={currentStep === 1 ? "Cancel" : "Next"}
              createLabel={isDeploying ? "Deploying..." : "Deploy"}
              isCreating={isDeploying}
              onPrevious={() => {
                if (currentStep > 1) {
                  setCurrentStep(currentStep - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              onNext={() => {
                if (currentStep === 1) {
                  handleBackClick();
                } else {
                  setCurrentStep(currentStep + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              onSkipToReview={() => {
                setCurrentStep(9);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onCreate={handleCreate}
              showSkipToReview={currentStep === 2}
              showSaveDraft
            />
          </div>
        </WizardLayout>
      </div>
    </FluentProvider>
  );
};

export default CreateFunctionAppWizard;
