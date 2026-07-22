"use client";

import { useState, useEffect, useCallback } from "react";
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

  Subtitle1,
  Subtitle2,
  Body1,
  Caption1,
  Link,
  Tooltip,
  Spinner,
  Badge,
  Skeleton,
  SkeletonItem,
} from "@fluentui/react-components";
import {
  Info20Regular,
  Dismiss20Regular,
  ChevronRight20Regular,
  ChevronDown20Regular,
  ChevronLeft20Regular,
  Edit20Regular,
  Add20Regular,
  Database20Regular,
  Info12Regular,
  Fire20Filled,
} from "@fluentui/react-icons";
import { CopilotProvider } from "@fluentui-copilot/react-copilot";
import { AzureHeaderBuildMVP } from "./azure-header-buildmvp";
import { useNavigation } from "../../lib/navigation-context";
import PageBreadcrumb from "./page-breadcrumb";
import PageHeader from "./page-header";
import WizardStepNav from "./wizard-step-nav";
import WizardLayout from "./wizard-layout";
import WizardSection from "./wizard-section";
import WizardActionBar from "./wizard-action-bar";

// ---------------------------------------------------------------------------
// Styles (matching create-vm-wizard layout)
// ---------------------------------------------------------------------------

// Required token aliasing pattern
type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
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
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "32px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  rightSection: {
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "24px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    alignSelf: "flex-start",
    position: "sticky",
  },
  formField: {
    marginBottom: "24px",
  },

  // Deployment-related styles
  deploymentContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  deploymentMainWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: "48px 32px 120px",
  },
  deploymentContent: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  deploymentHeader: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalL,
  },
  deploymentTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  deploymentSections: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },

  // Deployment table styles
  deployTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: tokens.spacingVerticalM,
  },
  deployTableHeaderRow: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  deployTableHeader: {
    textAlign: "left",
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
  },
  deployTableRow: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  deployTableCellText: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
  deployTableCellDetail: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  deployTableCellStatus: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase300,
  },
  deployStatusIcon: {
    width: "12px",
    height: "12px",
  },
  deployStatusRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },

  // Deployment section styles
  deploymentSection: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  deploySectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingVerticalM + " " + tokens.spacingHorizontalL,
    cursor: "pointer",
  },
  deploySectionContent: {
    padding: "0 " + tokens.spacingHorizontalL + " " + tokens.spacingHorizontalL,
  },
  deploySectionCard: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingVerticalL,
  },
  deployNextStepsButtons: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  deployNextStepsLinks: {
    marginTop: tokens.spacingVerticalL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },

  // Deployment success icon styles
  deploySuccessIcon: {
    width: "20px",
    height: "20px",
  },
  deployUpsellIcon: {
    width: "20px",
    height: "20px",
  },
  deployLargeSuccessIcon: {
    width: "28px",
    height: "28px",
  },

  // Embr project card styles
  embrProjectCard: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingVerticalXL,
    marginTop: tokens.spacingVerticalS,
  },
  embrProjectHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalS,
  },
  embrProjectTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  embrRunningBadge: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#E8F5E9",
    padding: "2px 10px",
    borderRadius: "12px",
  },
  embrProjectDetails: {
    display: "block",
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalS,
  },
  embrProjectMeta: {
    display: "block",
    color: tokens.colorNeutralForeground3,
    marginBottom: tokens.spacingVerticalM,
  },
  embrProjectButtons: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
  },



  // Copilot badge
  copilotBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "2px",
    padding: "1px 6px",
    borderRadius: tokens.borderRadiusMedium,
    // eslint-disable-next-line no-restricted-syntax
    background: "#EBF3FC",
    fontSize: "11px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    lineHeight: "16px",
    flexShrink: 0,
  },

  // Form field styles
  fieldLabelRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    marginBottom: tokens.spacingVerticalXS,
  },
  fieldLabelStyle: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
  },
  fieldInfoIcon: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground3,
    cursor: "help",
  },

  // Form input group styles
  serverNameGroup: {
    display: "flex",
    alignItems: "center",
    gap: "0",
  },
  serverNameInput: {
    flex: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  serverNameSuffix: {
    padding: "0 12px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground3,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderLeft: "none",
    borderRadius: `0 ${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium} 0`,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    whiteSpace: "nowrap",
  },

  // Resource group input styles
  resourceGroupRow: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  resourceGroupDropdown: {
    flex: 1,
  },
  resourceGroupLink: {
    whiteSpace: "nowrap",
  },

  // Compute configuration card
  computeCard: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.spacingHorizontalXS,
    padding: tokens.spacingVerticalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  computeCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalS,
  },
  computeCardDescription: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginBottom: tokens.spacingVerticalS,
  },
  computeCardCost: {
    color: tokens.colorNeutralForeground3,
  },
  computeCardActions: {
    marginTop: tokens.spacingVerticalS,
  },

  // Caption styles with specific colors
  captionSecondary: {
    color: tokens.colorNeutralForeground2,
    marginTop: tokens.spacingVerticalXS,
    display: "block",
  },
  captionSecondaryLarge: {
    color: tokens.colorNeutralForeground2,
    marginTop: tokens.spacingVerticalXS,
    display: "block",
    marginBottom: tokens.spacingVerticalXL,
  },
  captionSecondaryXLarge: {
    color: tokens.colorNeutralForeground2,
    marginTop: tokens.spacingVerticalXS,
    display: "block",
    marginBottom: tokens.spacingVerticalXXL,
  },
  captionTertiary: {
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalXS,
    display: "block",
  },
  captionError: {
    color: tokens.colorPaletteRedForeground1,
    marginTop: tokens.spacingVerticalXS,
    display: "block",
  },

  // Firewall rule card
  firewallRuleCard: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.spacingHorizontalXS,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingVerticalL}`,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    marginBottom: tokens.spacingVerticalL,
  },
  firewallRuleContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  firewallRuleInfo: {},
  firewallRuleTitle: {
    fontWeight: tokens.fontWeightSemibold,
    display: "block",
  },
  firewallRuleDetails: {
    color: tokens.colorNeutralForeground3,
  },
  firewallRuleButton: {
    minWidth: "32px",
    height: "32px",
  },

  // VNet integration card
  vnetCard: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.spacingHorizontalXS,
    padding: tokens.spacingVerticalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  vnetCardDescription: {
    color: tokens.colorNeutralForeground2,
    display: "block",
  },
  vnetCardActions: {
    marginTop: tokens.spacingVerticalM,
  },

  // Encryption card
  encryptionCard: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.spacingHorizontalXS,
    padding: tokens.spacingVerticalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    marginBottom: tokens.spacingVerticalXXL,
  },
  encryptionCardDescription: {
    color: tokens.colorNeutralForeground2,
    display: "block",
  },
  encryptionCardActions: {
    marginTop: tokens.spacingVerticalM,
  },

  // Defender caption
  defenderCaption: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginTop: tokens.spacingVerticalS,
  },

  // Tags form styles
  tagRow: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    alignItems: "flex-end",
    marginBottom: tokens.spacingVerticalM,
  },
  tagInputGroup: {
    flex: 1,
  },
  tagLabelStyle: {
    display: "block",
    marginBottom: tokens.spacingVerticalXS,
    fontWeight: tokens.fontWeightSemibold,
  },
  tagInputStyle: {
    width: "100%",
  },
  tagDismissButton: {
    minWidth: "32px",
    height: "32px",
  },
  tagAddButton: {
    marginTop: tokens.spacingVerticalS,
  },

  // Review section styles
  reviewSectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalM,
  },
  reviewSectionCard: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.spacingHorizontalXS,
    padding: tokens.spacingVerticalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  reviewSectionContainer: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  reviewRowContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalS} 0`,
  },
  reviewRowLabel: {
    color: tokens.colorNeutralForeground2,
    minWidth: "180px",
  },
  reviewRowValue: {
    fontWeight: tokens.fontWeightSemibold,
    textAlign: "right",
  },
  reviewNoTags: {
    color: tokens.colorNeutralForeground3,
  },

  // Cost panel styles
  costPanelContainer: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  costPanelTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalL,
  },
  costPanelCustomMessage: {
    color: tokens.colorNeutralForeground3,
  },
  costRowContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${tokens.spacingVerticalS} 0`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  costTotalContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${tokens.spacingVerticalM} 0 0`,
  },
  costTotalValue: {
    color: tokens.colorBrandForeground1,
  },

  // Embr project in cost panel
  embrCostSeparator: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingTop: tokens.spacingVerticalXL,
  },
  embrCostHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalM,
  },
  embrCostBadge: {
    fontSize: "11px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#E8F5E9",
    padding: "1px 8px",
    borderRadius: "10px",
    marginLeft: "auto",
  },
  embrCostDescription: {
    display: "block",
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalXS,
  },
  embrCostMeta: {
    display: "block",
    color: tokens.colorNeutralForeground3,
    marginBottom: tokens.spacingVerticalM,
  },
  embrCostButtons: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
  },


  // Form input width 100%
  inputFullWidth: {
    width: "100%",
  },
  // Deploy table — link cell overrides base color
  deployTableCellTextLink: {
    color: tokens.colorBrandForeground1,
  },

  // Deploy status text states
  deployStatusOk: {
    color: tokens.colorPaletteGreenForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  deployStatusPending: {
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightRegular,
  },

  // Fire/Embr icon brand color (#e37d80 is Embr's brand red — intentional)
  fireIconColor: {
    // eslint-disable-next-line no-restricted-syntax
    color: "#e37d80",
  },
  fireIconSize18: {
    fontSize: "18px",
  },

  // Caption with bottom margin for form section descriptions
  captionSecondaryMarginBottom: {
    marginBottom: "20px",
  },

  // Database icon brand color
  databaseIconBrand: {
    color: tokens.colorBrandForeground1,
  },

  // Review row with bottom border (omitted on last row)
  reviewRowWithBorder: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  // Ellipsis icon font size inside Button icon slot
  ellipsisIconFont: {
    fontSize: "16px",
  },

  // Right sidebar top offset variants
  rightSectionTopWithHeader: {
    top: "72px",
  },
  rightSectionTopNoHeader: {
    top: "24px",
  },
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface Step {
  id: number;
  title: string;
  copilotEnhanced?: boolean;
}

interface Tag {
  name: string;
  value: string;
}

interface FormData {
  subscription: string;
  resourceGroup: string;
  serverName: string;
  region: string;
  postgresVersion: string;
  workloadType: string;
  adminUsername: string;
  adminPassword: string;
  confirmPassword: string;
  connectivityMethod: string;
  allowAzureServices: boolean;
  addClientIp: boolean;
  dataEncryption: string;
  defenderForCloud: boolean;
  tags: Tag[];
}

interface CreatePostgresWizardProps {
  customHeader?: React.ReactNode | null;
  onBack?: () => void;
  onComplete?: () => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const STEPS: Step[] = [
  { id: 1, title: "Basics", copilotEnhanced: true },
  { id: 2, title: "Networking", copilotEnhanced: false },
  { id: 3, title: "Security", copilotEnhanced: false },
  { id: 4, title: "Tags", copilotEnhanced: true },
  { id: 5, title: "Review + create", copilotEnhanced: false },
];

const REVIEW_STEP = 5;

const REGIONS: { value: string; label: string }[] = [
  { value: "eastus", label: "(US) East US" },
  { value: "eastus2", label: "(US) East US 2" },
  { value: "westus2", label: "(US) West US 2" },
  { value: "centralus", label: "(US) Central US" },
  { value: "westeurope", label: "(Europe) West Europe" },
  { value: "northeurope", label: "(Europe) North Europe" },
  { value: "southeastasia", label: "(Asia Pacific) Southeast Asia" },
  { value: "japaneast", label: "(Asia Pacific) Japan East" },
];

const PG_VERSIONS = ["16", "15", "14", "13"];

const WORKLOAD_TIERS: Record<
  string,
  {
    label: string;
    cost: number;
    compute: string;
    storage: string;
    backup: string;
  }
> = {
  development: {
    label: "Burstable, B1ms, 1 vCore, 2 GiB RAM, 32 GiB storage",
    cost: 15.49,
    compute: "$12.41",
    storage: "$2.56",
    backup: "$0.52",
  },
  production: {
    label: "General Purpose, D2ds_v5, 2 vCores, 8 GiB RAM, 128 GiB storage",
    cost: 158.02,
    compute: "$124.10",
    storage: "$14.72",
    backup: "$19.20",
  },
  custom: {
    label: "Configure manually after creation",
    cost: 0,
    compute: "$0.00",
    storage: "$0.00",
    backup: "$0.00",
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const CreatePostgresWizard: React.FC<CreatePostgresWizardProps> = ({
  customHeader,
  onBack,
  onComplete,
}) => {
  const styles = useStyles();
  const router = useRouter();
  const { sourcePage, handlePageChange } = useNavigation();
  const sidebarStickyTop = customHeader !== null ? "72px" : "24px";

  const [currentStep, setCurrentStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    subscription: "new-embr-sub",
    resourceGroup: "embr-rg",
    serverName: "",
    region: "eastus",
    postgresVersion: "16",
    workloadType: "development",
    adminUsername: "",
    adminPassword: "",
    confirmPassword: "",
    connectivityMethod: "public",
    allowAzureServices: true,
    addClientIp: false,
    dataEncryption: "service-managed",
    defenderForCloud: false,
    tags: [
      { name: "environment", value: "production" },
      { name: "project", value: "embr-test-app-drizzle" },
    ],
  });

  // -- helpers ---------------------------------------------------------------
  const update = (patch: Partial<FormData>) =>
    setFormData((prev) => ({ ...prev, ...patch }));

  const regionLabel =
    REGIONS.find((r) => r.value === formData.region)?.label ?? formData.region;

  const tier =
    WORKLOAD_TIERS[formData.workloadType] ?? WORKLOAD_TIERS.development;

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else if (customHeader !== undefined) {
      router.back();
    } else {
      if (sourcePage) {
        handlePageChange(sourcePage);
      } else {
        handlePageChange("returning-home-2");
      }
    }
  };

  const goStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReturnToEmbr = async () => {
    try {
      await fetch("http://localhost:8080/admin/deploy-postgres", {
        method: "POST",
      });
    } catch {}
    window.location.href = "/embr-to-portal/prototype/?postgresDeployed=true";
  };

  const handleCreate = () => {
    if (onComplete) {
      onComplete();
    } else {
      setIsDeploying(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // =========================================================================
  // Deployment progress view (animated accordion — same pattern as deploy-step)
  // =========================================================================

  type ResourceStatus = "Not started" | "OK";
  interface DeployRow {
    name: string;
    detail: string;
    status: ResourceStatus;
    isLink?: boolean;
  }
  type DeployPhase = "resources" | "configuration" | "done";

  const INITIAL_PG_RESOURCES: DeployRow[] = [
    {
      name: formData.serverName || "embr-pg-server",
      detail: "PostgreSQL Flexible Server",
      status: "Not started",
      isLink: true,
    },
    {
      name: `${formData.serverName || "embr-pg-server"}-vnet`,
      detail: "Virtual Network",
      status: "Not started",
      isLink: true,
    },
    {
      name: `${formData.serverName || "embr-pg-server"}-subnet`,
      detail: "Subnet",
      status: "Not started",
    },
    {
      name: `${formData.serverName || "embr-pg-server"}-dns`,
      detail: "Private DNS Zone",
      status: "Not started",
      isLink: true,
    },
    {
      name: `${formData.serverName || "embr-pg-server"}-dns-link`,
      detail: "Virtual Network Link",
      status: "Not started",
    },
  ];

  const INITIAL_CONFIG_ACTIONS: DeployRow[] = [
    {
      name: "Configure firewall rules",
      detail: "Allow Azure services and add client IP rules",
      status: "Not started",
    },
    {
      name: "Set server parameters",
      detail: "Apply recommended PostgreSQL parameters",
      status: "Not started",
    },
    {
      name: "Create admin user",
      detail: "Configure authentication and admin credentials",
      status: "Not started",
    },
    {
      name: "Enable backups",
      detail: "Configure automated backup retention policy",
      status: "Not started",
    },
    {
      name: "Verify connectivity",
      detail: "Test connection to PostgreSQL endpoint",
      status: "Not started",
    },
  ];

  const PG_DEPLOY_SECTIONS = [
    { id: "resources", label: "Deploy PostgreSQL resources" },
    { id: "configuration", label: "Configure server" },
    { id: "nextsteps", label: "Next steps" },
  ];

  // -- deployment animation state --
  const [pgResources, setPgResources] =
    useState<DeployRow[]>(INITIAL_PG_RESOURCES);
  const [pgConfigActions, setPgConfigActions] = useState<DeployRow[]>(
    INITIAL_CONFIG_ACTIONS,
  );
  const [deployPhase, setDeployPhase] = useState<DeployPhase>("resources");
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    resources: true,
    configuration: false,
    nextsteps: false,
  });

  // Animate resources one by one
  useEffect(() => {
    if (!isDeploying || deployPhase !== "resources") return;
    const nextIdx = pgResources.findIndex((r) => r.status === "Not started");
    if (nextIdx === -1) {
      const t = setTimeout(() => {
        setExpandedSections((p) => ({
          ...p,
          resources: false,
          configuration: true,
        }));
        setDeployPhase("configuration");
      }, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setPgResources((p) =>
        p.map((r, i) => (i === nextIdx ? { ...r, status: "OK" } : r)),
      );
    }, 700);
    return () => clearTimeout(t);
  }, [isDeploying, pgResources, deployPhase]);

  // Animate config actions one by one
  useEffect(() => {
    if (!isDeploying || deployPhase !== "configuration") return;
    const nextIdx = pgConfigActions.findIndex(
      (r) => r.status === "Not started",
    );
    if (nextIdx === -1) {
      const t = setTimeout(() => {
        setExpandedSections((p) => ({
          ...p,
          configuration: false,
          nextsteps: true,
        }));
        setDeployPhase("done");
      }, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setPgConfigActions((p) =>
        p.map((r, i) => (i === nextIdx ? { ...r, status: "OK" } : r)),
      );
    }, 800);
    return () => clearTimeout(t);
  }, [isDeploying, pgConfigActions, deployPhase]);

  const toggleDeploySection = useCallback((id: string) => {
    setExpandedSections((p) => ({ ...p, [id]: !p[id] }));
  }, []);

  const isSecActive = (id: string) =>
    (id === "resources" && deployPhase === "resources") ||
    (id === "configuration" && deployPhase === "configuration");
  const isSecComplete = (id: string) =>
    (id === "resources" && deployPhase !== "resources") ||
    (id === "configuration" && deployPhase === "done");
  const isSecNextSteps = (id: string) =>
    id === "nextsteps" && deployPhase === "done";
  const deployDone = deployPhase === "done";

  const DeployStatusIcon = ({ status }: { status: ResourceStatus }) => {
    if (status === "OK")
      return (
        <img
          src="/icons/Success.svg"
          alt="OK"
          className={styles.deployStatusIcon}
        />
      );
    return (
      <img
        src="/icons/Pending.svg"
        alt="Pending"
        className={styles.deployStatusIcon}
      />
    );
  };

  const renderDeployTable = (headers: string[], rows: DeployRow[]) => (
    <table className={styles.deployTable}>
      <thead>
        <tr className={styles.deployTableHeaderRow}>
          {headers.map((h) => (
            <th key={h} className={styles.deployTableHeader}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name} className={styles.deployTableRow}>
            <td
              className={mergeClasses(
                styles.deployTableCellText,
                row.isLink ? styles.deployTableCellTextLink : undefined,
              )}
            >
              {row.name}
            </td>
            <td className={styles.deployTableCellDetail}>{row.detail}</td>
            <td className={styles.deployTableCellStatus}>
              <div className={styles.deployStatusRow}>
                <DeployStatusIcon status={row.status} />
                <span
                  className={
                    row.status === "OK"
                      ? styles.deployStatusOk
                      : styles.deployStatusPending
                  }
                >
                  {row.status}
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  if (isDeploying) {
    const serverName = formData.serverName || "embr-pg-server";
    return (
      <FluentProvider theme={webLightTheme}>
        <CopilotProvider>
          <div className={styles.deploymentContainer}>
            {customHeader !== null && (
              <div className={styles.stickyNav}>
                {customHeader || (
                  <AzureHeaderBuildMVP activeLink="Build" hideManage />
                )}
              </div>
            )}

            <div className={styles.deploymentMainWrapper}>
              <div className={styles.deploymentContent}>
                {/* Header */}
                <div className={styles.deploymentHeader}>
                  <div className={styles.deploymentTitleRow}>
                    {!deployDone ? (
                      <Spinner size="small" />
                    ) : (
                      <img
                        src="/icons/Success.svg"
                        alt="Success"
                        className={styles.deployLargeSuccessIcon}
                      />
                    )}
                    <Text size={500} weight="semibold">
                      {!deployDone
                        ? "Deploying your PostgreSQL server"
                        : "Your PostgreSQL server was deployed successfully"}
                    </Text>
                  </div>
                  <Text size={300} className={styles.captionSecondary}>
                    {!deployDone
                      ? `Creating resources for ${serverName}. This typically takes 2-3 minutes.`
                      : `${serverName}.postgres.database.azure.com is running in ${regionLabel}.`}
                  </Text>
                </div>

                {/* Accordion sections */}
                <div className={styles.deploymentSections}>
                  {PG_DEPLOY_SECTIONS.map((section, idx) => {
                    const isExpanded = expandedSections[section.id];
                    const active = isSecActive(section.id);
                    const complete = isSecComplete(section.id);

                    return (
                      <div
                        key={section.id}
                        className={styles.deploymentSection}
                      >
                        <div
                          className={styles.deploySectionHeader}
                          onClick={() => toggleDeploySection(section.id)}
                        >
                          {isExpanded ? (
                            <ChevronDown20Regular />
                          ) : (
                            <ChevronRight20Regular />
                          )}
                          {complete && (
                            <img
                              src="/icons/Success.svg"
                              alt="Done"
                              className={styles.deploySuccessIcon}
                            />
                          )}
                          {isSecNextSteps(section.id) && (
                            <img
                              src="/icons/Upsell.svg"
                              alt="Next"
                              className={styles.deployUpsellIcon}
                            />
                          )}
                          {active && !complete && <Spinner size="tiny" />}
                          <Subtitle1>
                            {idx + 1}. {section.label}
                          </Subtitle1>
                        </div>

                        {isExpanded && section.id === "resources" && (
                          <div className={styles.deploySectionContent}>
                            <div className={styles.deploySectionCard}>
                              <Body1 className={styles.captionSecondary}>
                                {isSecComplete("resources")
                                  ? "PostgreSQL resources deployed successfully."
                                  : "Deploying PostgreSQL Flexible Server and networking resources."}
                              </Body1>
                              {renderDeployTable(
                                ["Resource", "Type", "Status"],
                                pgResources,
                              )}
                            </div>
                          </div>
                        )}

                        {isExpanded && section.id === "configuration" && (
                          <div className={styles.deploySectionContent}>
                            <div className={styles.deploySectionCard}>
                              <Body1 className={styles.captionSecondary}>
                                Configuring firewall rules, authentication,
                                backups, and verifying connectivity.
                              </Body1>
                              {renderDeployTable(
                                ["Action", "Details", "Status"],
                                pgConfigActions,
                              )}
                            </div>
                          </div>
                        )}

                        {isExpanded && section.id === "nextsteps" && (
                          <div className={styles.deploySectionContent}>
                            <div className={styles.deploySectionCard}>
                              <Body1 className={styles.embrProjectDetails}>
                                Your PostgreSQL server is ready. Connect your
                                application or explore the resource.
                              </Body1>
                              <div className={styles.deployNextStepsButtons}>
                                <Button
                                  appearance="primary"
                                  onClick={handleReturnToEmbr}
                                >
                                  Return to Embr
                                </Button>
                                <Button
                                  appearance="secondary"
                                  onClick={() =>
                                    window.open(
                                      "/resource-manager/embr-drizzle",
                                      "_blank",
                                    )
                                  }
                                >
                                  Go to resource
                                </Button>
                              </div>
                              <div className={styles.deployNextStepsLinks}>
                                <Subtitle2>More</Subtitle2>
                                <Link href="#" inline>
                                  Set up read replicas
                                </Link>
                                <Link href="#" inline>
                                  Configure alerts and monitoring
                                </Link>
                                <Link href="#" inline>
                                  Enable query performance insights
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Embr project card — after deploy */}
                {deployDone && (
                  <div className={styles.embrProjectCard}>
                    <div className={styles.embrProjectHeader}>
                      <div className={styles.embrProjectTitleRow}>
                        {/* eslint-disable-next-line no-restricted-syntax */}
                        <Fire20Filled className={styles.fireIconColor} />
                        <Text weight="semibold">embr-test-app-drizzle</Text>
                      </div>
                      <span className={styles.embrRunningBadge}>Running</span>
                    </div>
                    <Caption1 className={styles.embrProjectDetails}>
                      Connected Embr project
                    </Caption1>
                    <Caption1 className={styles.embrProjectMeta}>
                      ● All systems operational · Created 3 months ago · Last
                      modified 2 days ago
                    </Caption1>
                    <div className={styles.embrProjectButtons}>
                      <Button
                        size="small"
                        appearance="subtle"
                        onClick={() =>
                          window.open(
                            "/resource-manager/embr-drizzle",
                            "_blank",
                          )
                        }
                      >
                        View project
                      </Button>
                      <Button
                        size="small"
                        appearance="primary"
                        onClick={handleReturnToEmbr}
                      >
                        Return to Embr
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CopilotProvider>
      </FluentProvider>
    );
  }

  // -- shared sub-components -------------------------------------------------
  const CopilotBadge = () => (
    <span className={styles.copilotBadge}>Copilot</span>
  );


  const FieldLabel: React.FC<{
    children: React.ReactNode;
    required?: boolean;
    info?: string;
  }> = ({ children, required, info }) => (
    <div className={styles.fieldLabelRow}>
      <Label required={required} className={styles.fieldLabelStyle}>
        {children}
      </Label>
      {info && (
        <Tooltip content={info} relationship="description">
          <Info20Regular className={styles.fieldInfoIcon} />
        </Tooltip>
      )}
    </div>
  );

  // =========================================================================
  // Step renderers
  // =========================================================================

  const renderBasicsStep = () => (
    <>
      {/* Project details */}
      <WizardSection title="Project details" divider>
      <Caption1
        className={mergeClasses(
          styles.captionSecondary,
          styles.captionSecondaryMarginBottom,
        )}
      >
        Select the subscription to manage deployed resources and costs. Use
        resource groups like folders to organize and manage all your resources.
      </Caption1>

      <div className={styles.formField}>
        <FieldLabel required info="The Azure subscription for billing.">
          Subscription
        </FieldLabel>
        <Dropdown
          value={formData.subscription}
          selectedOptions={[formData.subscription]}
          onOptionSelect={(_, d) =>
            update({ subscription: d.optionValue as string })
          }
          className={styles.inputFullWidth}
        >
          <Option value="new-embr-sub">new-embr-sub</Option>
          <Option value="azure-sub-1">Azure subscription 1</Option>
          <Option value="visual-studio-enterprise">
            Visual Studio Enterprise Subscription
          </Option>
        </Dropdown>
      </div>

      <div className={styles.formField}>
        <FieldLabel required info="A container that holds related resources.">
          Resource group
        </FieldLabel>
        <div className={styles.resourceGroupRow}>
          <Dropdown
            value={formData.resourceGroup}
            selectedOptions={[formData.resourceGroup]}
            onOptionSelect={(_, d) =>
              update({ resourceGroup: d.optionValue as string })
            }
            className={styles.resourceGroupDropdown}
          >
            <Option value="embr-rg">embr-rg</Option>
            <Option value="default-rg">default-rg</Option>
          </Dropdown>
          <Link className={styles.resourceGroupLink}>Create new</Link>
        </div>
      </div>
      </WizardSection>

      {/* Server details */}
      <WizardSection title="Server details" divider>

      <div className={styles.formField}>
        <FieldLabel
          required
          info="Globally unique name for your PostgreSQL server."
        >
          Server name
        </FieldLabel>
        <div className={styles.serverNameGroup}>
          <Input
            value={formData.serverName}
            onChange={(_, d) => update({ serverName: d.value })}
            placeholder="Enter server name"
            className={styles.serverNameInput}
          />
          <span className={styles.serverNameSuffix}>
            .postgres.database.azure.com
          </span>
        </div>
      </div>

      <div className={styles.formField}>
        <FieldLabel
          required
          info="Azure region where the server will be hosted."
        >
          Region
        </FieldLabel>
        <Dropdown
          value={regionLabel}
          selectedOptions={[formData.region]}
          onOptionSelect={(_, d) => update({ region: d.optionValue as string })}
          className={styles.inputFullWidth}
        >
          {REGIONS.map((r) => (
            <Option key={r.value} value={r.value}>
              {r.label}
            </Option>
          ))}
        </Dropdown>
      </div>

      <div className={styles.formField}>
        <FieldLabel required>PostgreSQL version</FieldLabel>
        <Dropdown
          value={formData.postgresVersion}
          selectedOptions={[formData.postgresVersion]}
          onOptionSelect={(_, d) =>
            update({ postgresVersion: d.optionValue as string })
          }
          className={styles.inputFullWidth}
        >
          {PG_VERSIONS.map((v) => (
            <Option key={v} value={v}>
              {v}
            </Option>
          ))}
        </Dropdown>
      </div>

      <div className={styles.formField}>
        <FieldLabel
          required
          info="Determines the default compute tier and storage."
        >
          Workload type
        </FieldLabel>
        <RadioGroup
          value={formData.workloadType}
          onChange={(_, d) => update({ workloadType: d.value })}
        >
          <Radio
            value="development"
            label="Development — For small-scale dev/test workloads with burstable compute"
          />
          <Radio
            value="production"
            label="Production — For production workloads requiring high availability"
          />
          <Radio
            value="custom"
            label="Custom — Configure compute and storage manually"
          />
        </RadioGroup>
      </div>
      </WizardSection>

      {/* Compute + storage */}
      <WizardSection title="Compute + storage" divider>

      <div className={styles.formField}>
        <div className={styles.computeCard}>
          <div className={styles.computeCardHeader}>
            <Database20Regular className={styles.databaseIconBrand} />
            <Text weight="semibold" size={300}>
              Compute + storage configuration
            </Text>
          </div>
          <Text size={200} className={styles.computeCardDescription}>
            {tier.label}
          </Text>
          {formData.workloadType !== "custom" && (
            <Text size={200} className={styles.computeCardCost}>
              Estimated cost: ${tier.cost.toFixed(2)}/month
            </Text>
          )}
          <div className={styles.computeCardActions}>
            <Link>Configure server</Link>
          </div>
        </div>
      </div>
      </WizardSection>

      {/* Authentication */}
      <WizardSection title="Authentication" divider>

      <div className={styles.formField}>
        <FieldLabel required>Admin username</FieldLabel>
        <Input
          value={formData.adminUsername}
          onChange={(_, d) => update({ adminUsername: d.value })}
          placeholder="e.g. pgadmin"
          className={styles.inputFullWidth}
        />
        <Caption1 className={styles.captionTertiary}>
          Cannot be &quot;admin&quot;, &quot;azure_superuser&quot;,
          &quot;azure_pg_admin&quot;, &quot;root&quot;, &quot;guest&quot;, or
          &quot;public&quot;.
        </Caption1>
      </div>

      <div className={styles.formField}>
        <FieldLabel required>Password</FieldLabel>
        <Input
          type="password"
          value={formData.adminPassword}
          onChange={(_, d) => update({ adminPassword: d.value })}
          placeholder="Enter password"
          className={styles.inputFullWidth}
        />
        <Caption1 className={styles.captionTertiary}>
          Must be 8-128 characters. Must contain characters from three of the
          following categories: uppercase, lowercase, numbers, and
          non-alphanumeric characters.
        </Caption1>
      </div>

      <div className={styles.formField}>
        <FieldLabel required>Confirm password</FieldLabel>
        <Input
          type="password"
          value={formData.confirmPassword}
          onChange={(_, d) => update({ confirmPassword: d.value })}
          placeholder="Confirm password"
          className={styles.inputFullWidth}
        />
        {formData.confirmPassword &&
          formData.adminPassword !== formData.confirmPassword && (
            <Caption1 className={styles.captionError}>
              Passwords do not match.
            </Caption1>
          )}
      </div>
      </WizardSection>
    </>
  );

  const renderNetworkingStep = () => (
    <>
      <WizardSection title="Connectivity method" divider>
      <Caption1 className={styles.captionSecondaryLarge}>
        Configure the connectivity method for your PostgreSQL Flexible Server.
        Choose public access for development or private access for production
        workloads.
      </Caption1>

      <div className={styles.formField}>
        <RadioGroup
          value={formData.connectivityMethod}
          onChange={(_, d) => update({ connectivityMethod: d.value })}
        >
          <Radio value="public" label="Public access (allowed IP addresses)" />
          <Radio value="private" label="Private access (VNet Integration)" />
        </RadioGroup>
      </div>
      </WizardSection>

      {formData.connectivityMethod === "public" && (
        <>
          <WizardSection title="Firewall rules" divider>
          <Caption1
            className={mergeClasses(
              styles.captionSecondary,
              styles.captionSecondaryMarginBottom,
            )}
          >
            Add firewall rules to allow access from specific IP addresses. You
            can also allow Azure services and add your current client IP
            address.
          </Caption1>

          <div className={styles.formField}>
            <Checkbox
              checked={formData.allowAzureServices}
              onChange={(_, d) => update({ allowAzureServices: !!d.checked })}
              label="Allow public access from any Azure service within Azure to this server"
            />
          </div>

          <div className={styles.formField}>
            <Checkbox
              checked={formData.addClientIp}
              onChange={(_, d) => update({ addClientIp: !!d.checked })}
              label="Add current client IP address (203.0.113.42)"
            />
          </div>

          {formData.addClientIp && (
            <div className={styles.firewallRuleCard}>
              <div className={styles.firewallRuleContent}>
                <div className={styles.firewallRuleInfo}>
                  <Text
                    size={200}
                    weight="semibold"
                    className={styles.firewallRuleTitle}
                  >
                    ClientIPAddress_2025-01-15
                  </Text>
                  <Text size={200} className={styles.firewallRuleDetails}>
                    203.0.113.42 – 203.0.113.42
                  </Text>
                </div>
                <Button
                  appearance="subtle"
                  icon={<Dismiss20Regular />}
                  size="small"
                  onClick={() => update({ addClientIp: false })}
                  className={styles.firewallRuleButton}
                />
              </div>
            </div>
          )}
          </WizardSection>
        </>
      )}

      {formData.connectivityMethod === "private" && (
        <>
          <WizardSection title="Virtual network integration" divider>
          <div className={styles.vnetCard}>
            <Caption1 className={styles.vnetCardDescription}>
              A virtual network and a dedicated subnet are required for private
              access. A new virtual network and subnet will be created
              automatically. You can change this after creation.
            </Caption1>
            <div className={styles.vnetCardActions}>
              <Link>Configure virtual network</Link>
            </div>
          </div>
          </WizardSection>
        </>
      )}
    </>
  );

  const renderSecurityStep = () => (
    <>
      <WizardSection title="Data encryption" divider>
      <Caption1
        className={mergeClasses(
          styles.captionSecondary,
          styles.captionSecondaryMarginBottom,
        )}
      >
        By default, data is encrypted at rest with a service-managed key. You
        can optionally use a customer-managed key stored in Azure Key Vault.
      </Caption1>

      <div className={styles.formField}>
        <RadioGroup
          value={formData.dataEncryption}
          onChange={(_, d) => update({ dataEncryption: d.value })}
        >
          <Radio value="service-managed" label="Service-managed key" />
          <Radio value="customer-managed" label="Customer-managed key" />
        </RadioGroup>
      </div>

      {formData.dataEncryption === "customer-managed" && (
        <div className={styles.encryptionCard}>
          <Caption1 className={styles.encryptionCardDescription}>
            To use a customer-managed key, you need to configure an Azure Key
            Vault and a managed identity. This can be configured after creation.
          </Caption1>
          <div className={styles.encryptionCardActions}>
            <Link>Learn more about customer-managed keys</Link>
          </div>
        </div>
      )}
      </WizardSection>

      <WizardSection title="Microsoft Defender for Cloud" divider>
      <Caption1
        className={mergeClasses(
          styles.captionSecondary,
          styles.captionSecondaryMarginBottom,
        )}
      >
        Microsoft Defender for open-source relational databases provides threat
        detection for PostgreSQL. Alerts surface suspicious database activities,
        potential vulnerabilities, and anomalous access patterns.
      </Caption1>

      <div className={styles.formField}>
        <RadioGroup
          value={formData.defenderForCloud ? "enabled" : "disabled"}
          onChange={(_, d) =>
            update({ defenderForCloud: d.value === "enabled" })
          }
        >
          <Radio
            value="enabled"
            label="Enable Microsoft Defender for PostgreSQL"
          />
          <Radio value="disabled" label="Disable (can be enabled later)" />
        </RadioGroup>
        {formData.defenderForCloud && (
          <Caption1 className={styles.defenderCaption}>
            Additional charges may apply. Free trial available for 30 days.
          </Caption1>
        )}
      </div>
      </WizardSection>
    </>
  );

  const renderTagsStep = () => (
    <>
      <WizardSection title="Tags" divider>
      <Caption1
        className={mergeClasses(
          styles.captionSecondary,
          styles.captionSecondaryMarginBottom,
        )}
      >
        Tags are name/value pairs that enable you to categorize resources and
        view consolidated billing by applying the same tag to multiple resources
        and resource groups.
      </Caption1>

      {formData.tags.map((tag, index) => (
        <div key={index} className={styles.tagRow}>
          <div className={styles.tagInputGroup}>
            {index === 0 && (
              <Label className={styles.tagLabelStyle}>Name</Label>
            )}
            <Input
              value={tag.name}
              onChange={(_, d) => {
                const newTags = [...formData.tags];
                newTags[index] = { ...newTags[index], name: d.value };
                update({ tags: newTags });
              }}
              placeholder="Enter name"
              className={styles.tagInputStyle}
            />
          </div>
          <div className={styles.tagInputGroup}>
            {index === 0 && (
              <Label className={styles.tagLabelStyle}>Value</Label>
            )}
            <Input
              value={tag.value}
              onChange={(_, d) => {
                const newTags = [...formData.tags];
                newTags[index] = { ...newTags[index], value: d.value };
                update({ tags: newTags });
              }}
              placeholder="Enter value"
              className={styles.tagInputStyle}
            />
          </div>
          <div className={styles.tagInputGroup}>
            {index === 0 && (
              <Label className={styles.tagLabelStyle}>Resource</Label>
            )}
            <Input
              value="Azure Database for PostgreSQL"
              readOnly
              className={styles.tagInputStyle}
            />
          </div>
          <Button
            appearance="subtle"
            icon={<Dismiss20Regular />}
            onClick={() => {
              const newTags = formData.tags.filter((_, i) => i !== index);
              update({ tags: newTags });
            }}
            className={styles.tagDismissButton}
          />
        </div>
      ))}

      <Button
        appearance="subtle"
        icon={<Add20Regular />}
        onClick={() =>
          update({ tags: [...formData.tags, { name: "", value: "" }] })
        }
        className={styles.tagAddButton}
      >
        Add tag
      </Button>
      </WizardSection>
    </>
  );

  const renderReviewStep = () => (
    <>
      <WizardSection title="Review + create" divider>
      <Caption1 className={styles.captionSecondaryXLarge}>
        Review your PostgreSQL Flexible Server configuration before creating the
        resource. Estimated monthly cost is shown in the right panel.
      </Caption1>

      {/* Basics summary */}
      <div className={styles.reviewSectionContainer}>
        <div className={styles.reviewSectionHeader}>
          <Text weight="semibold" size={400}>
            Basics
          </Text>
          <Link onClick={() => goStep(1)}>Edit</Link>
        </div>
        <div className={styles.reviewSectionCard}>
          <ReviewRow label="Subscription" value={formData.subscription} />
          <ReviewRow label="Resource group" value={formData.resourceGroup} />
          <ReviewRow
            label="Server name"
            value={`${formData.serverName || "(not set)"}.postgres.database.azure.com`}
          />
          <ReviewRow label="Region" value={regionLabel} />
          <ReviewRow
            label="PostgreSQL version"
            value={formData.postgresVersion}
          />
          <ReviewRow
            label="Workload type"
            value={
              formData.workloadType.charAt(0).toUpperCase() +
              formData.workloadType.slice(1)
            }
          />
          <ReviewRow label="Compute + storage" value={tier.label} />
          <ReviewRow
            label="Admin username"
            value={formData.adminUsername || "(not set)"}
          />
          <ReviewRow
            label="Admin password"
            value={formData.adminPassword ? "••••••••" : "(not set)"}
            last
          />
        </div>
      </div>

      {/* Networking summary */}
      <div className={styles.reviewSectionContainer}>
        <div className={styles.reviewSectionHeader}>
          <Text weight="semibold" size={400}>
            Networking
          </Text>
          <Link onClick={() => goStep(2)}>Edit</Link>
        </div>
        <div className={styles.reviewSectionCard}>
          <ReviewRow
            label="Connectivity method"
            value={
              formData.connectivityMethod === "public"
                ? "Public access"
                : "Private access"
            }
          />
          <ReviewRow
            label="Allow Azure services"
            value={formData.allowAzureServices ? "Yes" : "No"}
          />
          <ReviewRow
            label="Client IP added"
            value={formData.addClientIp ? "203.0.113.42" : "No"}
            last
          />
        </div>
      </div>

      {/* Security summary */}
      <div className={styles.reviewSectionContainer}>
        <div className={styles.reviewSectionHeader}>
          <Text weight="semibold" size={400}>
            Security
          </Text>
          <Link onClick={() => goStep(3)}>Edit</Link>
        </div>
        <div className={styles.reviewSectionCard}>
          <ReviewRow
            label="Data encryption"
            value={
              formData.dataEncryption === "service-managed"
                ? "Service-managed key"
                : "Customer-managed key"
            }
          />
          <ReviewRow
            label="Microsoft Defender"
            value={formData.defenderForCloud ? "Enabled" : "Disabled"}
            last
          />
        </div>
      </div>

      {/* Tags summary */}
      <div className={styles.reviewSectionContainer}>
        <div className={styles.reviewSectionHeader}>
          <Text weight="semibold" size={400}>
            Tags
          </Text>
          <Link onClick={() => goStep(4)}>Edit</Link>
        </div>
        <div className={styles.reviewSectionCard}>
          {formData.tags.filter((t) => t.name).length === 0 ? (
            <Text size={200} className={styles.reviewNoTags}>
              No tags configured
            </Text>
          ) : (
            formData.tags
              .filter((t) => t.name)
              .map((tag, i, arr) => (
                <ReviewRow
                  key={i}
                  label={tag.name}
                  value={tag.value || "(empty)"}
                  last={i === arr.length - 1}
                />
              ))
          )}
        </div>
      </div>
      </WizardSection>
    </>
  );

  // -- review row helper -----------------------------------------------------
  const ReviewRow: React.FC<{
    label: string;
    value: string;
    last?: boolean;
  }> = ({ label, value, last }) => (
    <div
      className={mergeClasses(
        styles.reviewRowContainer,
        last ? undefined : styles.reviewRowWithBorder,
      )}
    >
      <Text size={200} className={styles.reviewRowLabel}>
        {label}
      </Text>
      <Text size={200} weight="semibold" className={styles.reviewRowValue}>
        {value}
      </Text>
    </div>
  );

  // -- render step dispatcher ------------------------------------------------
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderBasicsStep();
      case 2:
        return renderNetworkingStep();
      case 3:
        return renderSecurityStep();
      case 4:
        return renderTagsStep();
      case 5:
        return renderReviewStep();
      default:
        return renderBasicsStep();
    }
  };

  // =========================================================================
  // Cost panel (right sidebar)
  // =========================================================================
  const renderCostPanel = () => (
    <>
      {/* Cost estimation */}
      <div className={styles.costPanelContainer}>
        <Text size={500} weight="semibold" className={styles.costPanelTitle}>
          Estimated monthly cost
        </Text>

        {formData.workloadType === "custom" ? (
          <Caption1 className={styles.costPanelCustomMessage}>
            Configure compute and storage to see estimated costs.
          </Caption1>
        ) : (
          <>
            <div className={styles.costRowContainer}>
              <Text size={300}>Compute</Text>
              <Text size={300} weight="semibold">
                {tier.compute}
              </Text>
            </div>
            <div className={styles.costRowContainer}>
              <Text size={300}>Storage</Text>
              <Text size={300} weight="semibold">
                {tier.storage}
              </Text>
            </div>
            <div className={styles.costRowContainer}>
              <Text size={300}>Backup</Text>
              <Text size={300} weight="semibold">
                {tier.backup}
              </Text>
            </div>
            <div className={styles.costTotalContainer}>
              <Text size={400} weight="semibold">
                Total
              </Text>
              <Text
                size={500}
                weight="semibold"
                className={styles.costTotalValue}
              >
                ${tier.cost.toFixed(2)}/mo
              </Text>
            </div>
          </>
        )}
      </div>

      {/* Embr project card */}
      <div className={styles.embrCostSeparator}>
        <div className={styles.embrCostHeader}>
          {/* eslint-disable-next-line no-restricted-syntax */}
          <Fire20Filled
            className={mergeClasses(
              styles.fireIconColor,
              styles.fireIconSize18,
            )}
          />
          <Text weight="semibold" size={300}>
            embr-test-app-drizzle
          </Text>
          <span className={styles.embrCostBadge}>Running</span>
        </div>
        <Caption1 className={styles.embrCostDescription}>
          Connected Embr project
        </Caption1>
        <Caption1 className={styles.embrCostMeta}>
          ● All systems operational · Created 3 months ago · Last modified 2
          days ago
        </Caption1>
        <div className={styles.embrCostButtons}>
          <Button
            size="small"
            appearance="subtle"
            onClick={() =>
              window.open("/resource-manager/embr-drizzle", "_blank")
            }
          >
            View project
          </Button>
          <Button
            size="small"
            appearance="primary"
            onClick={handleReturnToEmbr}
          >
            Return to Embr
          </Button>
        </div>
      </div>
    </>
  );

  // =========================================================================
  // Main layout
  // =========================================================================
  return (
    <FluentProvider theme={webLightTheme}>
      <CopilotProvider>
        <div className={styles.container}>
          {customHeader !== null && (
            <div className={styles.stickyNav}>
              {customHeader || (
                <AzureHeaderBuildMVP activeLink="Build" hideManage />
              )}
            </div>
          )}

          {/* Breadcrumb */}
          <PageBreadcrumb
            items={[
              { label: "Home", onClick: () => handlePageChange("home-fre") },
              { label: "New" },
              { label: "Create a resource" },
            ]}
          />

          {/* Header */}
          <PageHeader
            title="Create Azure Database for PostgreSQL - Flexible Server"
            actions={
              <Button
                appearance="subtle"
                icon={<span className={styles.ellipsisIconFont}>⋯</span>}
                size="small"
              />
            }
            onClose={handleBackClick}
          />

          {/* 3-column layout */}
          <WizardLayout
            stepNav={
              <WizardStepNav
                steps={STEPS}
                activeStep={currentStep}
                onStepChange={goStep}
                showCopilotIcons
              />
            }
            rightPanel={
              <div
                className={mergeClasses(
                  styles.rightSection,
                  customHeader !== null
                    ? styles.rightSectionTopWithHeader
                    : styles.rightSectionTopNoHeader,
                )}
              >
                {renderCostPanel()}
              </div>
            }
            hasCustomHeader={customHeader !== null && customHeader !== undefined}
          >
            {/* Center — form */}
            <div className={styles.centerSection}>
              {renderCurrentStep()}

              {/* Bottom action buttons */}
              <WizardActionBar
                currentStep={currentStep}
                totalSteps={STEPS.length}
                reviewStep={REVIEW_STEP}
                nextLabel={currentStep === 1 ? "Next: Networking" : undefined}
                createLabel="Create"
                isCreating={isDeploying}
                onPrevious={() => goStep(currentStep - 1)}
                onNext={() => goStep(currentStep === 1 ? 2 : currentStep + 1)}
                onSkipToReview={() => goStep(REVIEW_STEP)}
                onCreate={handleCreate}
                showSkipToReview
                showSaveDraft
              />
            </div>
          </WizardLayout>
        </div>
      </CopilotProvider>
    </FluentProvider>
  );
};

export default CreatePostgresWizard;
