"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Input,
  Dropdown,
  Option,
  Label,
  Link,
  RadioGroup,
  Radio,
  Divider,
  SpinButton,
  Badge,
  mergeClasses,
} from "@fluentui/react-components";
import {
  Info16Regular,
  Warning12Filled,
  Edit20Regular,
  Add20Regular,
  Attach20Regular,
  Dismiss20Regular,
  ChevronUp20Regular,
  ChevronDown20Regular,
  Eye20Regular,
  Share20Regular,
  ArrowDownload20Regular,
  Checkmark20Regular,
  ArrowLeft20Regular,
} from "@fluentui/react-icons";
import { NavigationProvider } from "../../../lib/navigation-context";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import PageBreadcrumb from "../../shared/page-breadcrumb";
import PageHeader from "../../shared/page-header";
import WizardLayout from "../../shared/wizard-layout";
import WizardStepNav from "../../shared/wizard-step-nav";
import WizardActionBar from "../../shared/wizard-action-bar";
import EmmDeploymentSuccess from "./vm-deployment-success";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  centerSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    padding: `${tokens.spacingVerticalXXL} 40px`,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
  },
  titleRow: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalL,
  },
  tipBox: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  tipLink: {
    color: "#115ea3",
    textDecoration: "underline",
    cursor: "pointer",
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "28px",
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalL,
  },
  sectionTitleLarge: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "32px",
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
  },
  sectionDesc: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
    marginBottom: tokens.spacingVerticalL,
  },
  formField: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    marginBottom: tokens.spacingVerticalXL,
    maxWidth: "500px",
  },
  formFieldWide: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    marginBottom: tokens.spacingVerticalXL,
    maxWidth: "720px",
  },
  fieldWithLink: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    marginBottom: tokens.spacingVerticalXL,
    maxWidth: "500px",
  },
  labelRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  infoButton: {
    color: tokens.colorNeutralForeground3,
    cursor: "pointer",
    flexShrink: 0,
  },
  helperText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  warningRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  warningIcon: {
    color: tokens.colorPaletteYellowForeground1,
    flexShrink: 0,
  },
  warningText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase200,
  },
  elbowConnector: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "flex-start",
    maxWidth: "500px",
    marginBottom: tokens.spacingVerticalXL,
  },
  elbowLine: {
    width: "44px",
    height: "12px",
    flexShrink: 0,
    borderLeft: `1px solid ${tokens.colorNeutralStroke1}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    marginTop: "-4px",
  },
  elbowContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  sectionSpacer: {
    marginTop: tokens.spacingVerticalXXL,
    marginBottom: tokens.spacingVerticalL,
  },
  divider: {
    marginBottom: tokens.spacingVerticalXXL,
  },

  /* Disks section */
  diskTagsRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    flexWrap: "wrap",
    marginBottom: tokens.spacingVerticalL,
  },
  diskTag: {
    borderRadius: tokens.borderRadiusMedium,
  },
  diskActionsRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalL,
  },
  emptyDiskCard: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusLarge,
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalXS,
    textAlign: "center" as const,
  },
  emptyDiskTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  emptyDiskDesc: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
  },

  /* Admin section */
  radioHelperText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
    paddingLeft: "28px",
    marginTop: `-${tokens.spacingVerticalXS}`,
  },

  /* Review step */
  impactSummary: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL}`,
    marginBottom: tokens.spacingVerticalXXL,
  },
  impactTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
    marginBottom: tokens.spacingVerticalS,
  },
  impactList: {
    paddingLeft: tokens.spacingHorizontalL,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  impactItem: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: "18px",
  },
  impactBold: {
    fontWeight: tokens.fontWeightSemibold,
  },
  reviewActionsRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  reviewCollapsible: {
    display: "flex",
    flexDirection: "column",
  },
  reviewSectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    paddingBottom: tokens.spacingVerticalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    marginBottom: tokens.spacingVerticalL,
  },
  reviewSectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  reviewTable: {
    display: "grid",
    gridTemplateColumns: "200px 1fr",
    rowGap: tokens.spacingVerticalM,
  },
  reviewLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
    whiteSpace: "pre-line",
  },
  reviewValue: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  reviewActionBar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    marginTop: tokens.spacingVerticalXXL,
    paddingTop: tokens.spacingVerticalXL,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  reviewRightActions: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
});

const STEPS = [
  { id: 1, title: "Basics" },
  { id: 2, title: "Networking" },
  { id: 3, title: "Management" },
  { id: 4, title: "Monitoring" },
  { id: 5, title: "Advanced" },
  { id: 6, title: "Tags" },
  { id: 7, title: "Review" },
];

/** EMM-specific Create VM wizard matching the Figma design (node 6445-107888). */
export default function EmmCreateVm({
  onBack,
  onHome,
  onNavigateToComputeInfra,
  onNavigateToDashboardDetails,
}: {
  onBack?: () => void;
  onHome?: () => void;
  onNavigateToComputeInfra?: () => void;
  onNavigateToDashboardDetails?: () => void;
}) {
  const styles = useStyles();
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [subscription, setSubscription] = useState("sub 03");
  const [resourceGroup, setResourceGroup] = useState("rg 03");
  const [vmName, setVmName] = useState("Contoso-vm");
  const [instanceCount, setInstanceCount] = useState(1);
  const [region, setRegion] = useState("west-us-2");
  const [availabilityZone, setAvailabilityZone] = useState("zone-1");
  const [image, setImage] = useState("ubuntu-2404");
  const [size, setSize] = useState("standard-d2s-v3");
  const [authType, setAuthType] = useState("ssh");
  const [username, setUsername] = useState("azureuser");
  const [sshKeySource, setSshKeySource] = useState("generate-new");
  const [sshKeyType, setSshKeyType] = useState("rsa");
  const [keyPairName, setKeyPairName] = useState("");
  const [basicsExpanded, setBasicsExpanded] = useState(true);
  const [disksExpanded, setDisksExpanded] = useState(false);
  const [networkingExpanded, setNetworkingExpanded] = useState(false);
  const [managementExpanded, setManagementExpanded] = useState(false);
  const [monitoringExpanded, setMonitoringExpanded] = useState(false);
  const [showDeployment, setShowDeployment] = useState(false);

  const handleNext = () => {
    if (currentStep < 7) setCurrentStep(currentStep + 1);
  };
  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (showDeployment) {
    return (
      <EmmDeploymentSuccess
        vmName={vmName || "Contoso-vm"}
        onBack={onBack}
        onHome={onHome}
        onNavigateToComputeInfra={onNavigateToComputeInfra}
        onNavigateToDashboardDetails={onNavigateToDashboardDetails}
      />
    );
  }

  return (
    <NavigationProvider>
      <div className={styles.container}>
        <AzureHeaderBuildMVP isDarkMode={false} onLogoClick={onHome} />
        <PageBreadcrumb
          noBorder
          items={[
            { label: "Home", onClick: onHome || onBack },
            { label: "New" },
            { label: "Create a resource" },
          ]}
        />
        <PageHeader title="Create a virtual machine" onClose={onBack} />

        <WizardLayout
          stepNav={
            <WizardStepNav
              steps={STEPS}
              activeStep={currentStep}
              onStepChange={setCurrentStep}
            />
          }
        >
          <div className={styles.centerSection}>
            {currentStep === 1 && (
              <>
                {/* Title + Tip */}
                <div className={styles.titleRow}>
                  <Text className={styles.sectionTitleLarge}>Basics</Text>
                  <Text className={styles.tipBox}>
                    {
                      "Ensure all required fields are filled out on this tab. For a detailed walkthrough, "
                    }
                    <span className={styles.tipLink}>
                      check out the storage account creation guide.
                    </span>
                  </Text>
                </div>

                <Divider className={styles.divider} />

                {/* Resource details */}
                <Text className={styles.sectionTitle}>Resource details</Text>

                <div className={styles.formField}>
                  <Label required>Subscription</Label>
                  <Dropdown
                    value={subscription === "sub 03" ? "sub 03" : undefined}
                    selectedOptions={subscription ? [subscription] : []}
                    onOptionSelect={(_, data) =>
                      setSubscription(data.optionValue as string)
                    }
                  >
                    <Option value="sub 03">sub 03</Option>
                    <Option value="sub 01">sub 01</Option>
                    <Option value="sub 02">sub 02</Option>
                  </Dropdown>
                </div>

                <div className={styles.elbowConnector}>
                  <div className={styles.elbowLine} />
                  <div className={styles.elbowContent}>
                    <Label required>Resource group</Label>
                    <Dropdown
                      value={resourceGroup === "rg 03" ? "rg 03" : undefined}
                      selectedOptions={resourceGroup ? [resourceGroup] : []}
                      onOptionSelect={(_, data) =>
                        setResourceGroup(data.optionValue as string)
                      }
                    >
                      <Option value="rg 03">rg 03</Option>
                      <Option value="rg 01">rg 01</Option>
                      <Option value="rg 02">rg 02</Option>
                    </Dropdown>
                  </div>
                </div>

                <div className={styles.formField}>
                  <div className={styles.labelRow}>
                    <Label required>Virtual machine resource name</Label>
                    <Info16Regular className={styles.infoButton} />
                  </div>
                  <Input
                    value={vmName}
                    onChange={(e) => setVmName(e.target.value)}
                  />
                  <Text className={styles.helperText}>
                    Use 3-60 lowercase letters, numbers, or hyphens.
                  </Text>
                  <div className={styles.warningRow}>
                    <Warning12Filled className={styles.warningIcon} />
                    <Text className={styles.warningText}>
                      This cannot be changed later.
                    </Text>
                  </div>
                </div>

                <div className={styles.formField}>
                  <div className={styles.labelRow}>
                    <Label required>Instance count</Label>
                    <Info16Regular className={styles.infoButton} />
                  </div>
                  <SpinButton
                    value={instanceCount}
                    onChange={(_, data) => {
                      if (data.value !== undefined && data.value !== null) {
                        setInstanceCount(data.value);
                      }
                    }}
                    min={1}
                    max={100}
                  />
                </div>

                <div className={styles.fieldWithLink}>
                  <div>
                    <Label required>Region</Label>
                    <Dropdown
                      value={region === "west-us-2" ? "West US 2" : undefined}
                      selectedOptions={region ? [region] : []}
                      onOptionSelect={(_, data) =>
                        setRegion(data.optionValue as string)
                      }
                    >
                      <Option value="west-us-2">West US 2</Option>
                      <Option value="east-us">East US</Option>
                      <Option value="west-europe">West Europe</Option>
                    </Dropdown>
                  </div>
                  <Link>Deploy to an Azure extended zone</Link>
                </div>

                <div className={styles.fieldWithLink}>
                  <div>
                    <div className={styles.labelRow}>
                      <Label>Availability zone</Label>
                      <Info16Regular className={styles.infoButton} />
                    </div>
                    <Dropdown
                      value={
                        availabilityZone === "zone-1" ? "Zone 1" : undefined
                      }
                      selectedOptions={
                        availabilityZone ? [availabilityZone] : []
                      }
                      onOptionSelect={(_, data) =>
                        setAvailabilityZone(data.optionValue as string)
                      }
                    >
                      <Option value="zone-1">Zone 1</Option>
                      <Option value="zone-2">Zone 2</Option>
                      <Option value="zone-3">Zone 3</Option>
                    </Dropdown>
                  </div>
                  <Link>Configure zone settings</Link>
                </div>

                <div className={styles.formField}>
                  <div className={styles.labelRow}>
                    <Label required>Image</Label>
                    <Info16Regular className={styles.infoButton} />
                  </div>
                  <Dropdown
                    value={
                      image === "ubuntu-2404"
                        ? "Ubuntu Server 24.04 LTS - x64 Gen2"
                        : undefined
                    }
                    selectedOptions={image ? [image] : []}
                    onOptionSelect={(_, data) =>
                      setImage(data.optionValue as string)
                    }
                  >
                    <Option value="ubuntu-2404">
                      Ubuntu Server 24.04 LTS - x64 Gen2
                    </Option>
                    <Option value="ubuntu-2204">
                      Ubuntu Server 22.04 LTS - x64 Gen2
                    </Option>
                    <Option value="windows-2022">
                      Windows Server 2022 Datacenter
                    </Option>
                    <Option value="redhat-9">Red Hat Enterprise Linux 9</Option>
                  </Dropdown>
                </div>

                <div className={styles.fieldWithLink}>
                  <div>
                    <div className={styles.labelRow}>
                      <Label required>Size</Label>
                      <Info16Regular className={styles.infoButton} />
                    </div>
                    <Dropdown
                      value={
                        size === "standard-d2s-v3"
                          ? "Standard_D2s_v3 - 2 vcpus, 8 GiB memory ($137.24/month)"
                          : undefined
                      }
                      selectedOptions={size ? [size] : []}
                      onOptionSelect={(_, data) =>
                        setSize(data.optionValue as string)
                      }
                    >
                      <Option value="standard-b2s">
                        Standard_B2s - 2 vcpus, 4 GiB memory ($30.37/month)
                      </Option>
                      <Option value="standard-d2s-v3">
                        Standard_D2s_v3 - 2 vcpus, 8 GiB memory ($137.24/month)
                      </Option>
                      <Option value="standard-d4s-v3">
                        Standard_D4s_v3 - 4 vcpus, 16 GiB memory ($274.48/month)
                      </Option>
                    </Dropdown>
                  </div>
                  <Link>See all sizes</Link>
                </div>

                {/* Disks section */}
                <div className={styles.sectionSpacer}>
                  <Text className={styles.sectionTitleLarge}>Disks</Text>
                  <Text className={styles.sectionDesc}>
                    Azure VMs have one operating system disk and a temporary
                    disk for short-term storage. You can attach additional data
                    disks. The size of the VM determines the type of storage you
                    can use and the number of data disks allowed.
                  </Text>
                </div>

                <div className={styles.formFieldWide}>
                  <div className={styles.labelRow}>
                    <Label required>Operating system disk</Label>
                    <Info16Regular className={styles.infoButton} />
                  </div>
                  <div className={styles.diskTagsRow}>
                    <Badge appearance="outline" className={styles.diskTag}>
                      Premium SSD (ZRS)
                    </Badge>
                    <Badge appearance="outline" className={styles.diskTag}>
                      Image default 16 GiB
                    </Badge>
                    <Badge appearance="outline" className={styles.diskTag}>
                      Delete with VM
                    </Badge>
                    <Button
                      appearance="subtle"
                      size="small"
                      icon={<Edit20Regular />}
                    >
                      Edit
                    </Button>
                  </div>
                </div>

                <div className={styles.diskActionsRow}>
                  <Button
                    appearance="subtle"
                    size="small"
                    icon={<Add20Regular />}
                  >
                    Create and attach a new disk
                  </Button>
                  <Button
                    appearance="subtle"
                    size="small"
                    icon={<Attach20Regular />}
                  >
                    Attach an existing disk
                  </Button>
                </div>

                <div className={styles.emptyDiskCard}>
                  <Text className={styles.emptyDiskTitle}>
                    No additional disks
                  </Text>
                  <Text className={styles.emptyDiskDesc}>
                    Create or attach a disk populate this area.
                  </Text>
                </div>

                {/* Administrator account */}
                <div className={styles.sectionSpacer}>
                  <Text className={styles.sectionTitle}>
                    Administrator account
                  </Text>
                </div>

                <div className={styles.formField}>
                  <div className={styles.labelRow}>
                    <Label required>Authentication type</Label>
                    <Info16Regular className={styles.infoButton} />
                  </div>
                  <RadioGroup
                    value={authType}
                    onChange={(_, data) => setAuthType(data.value)}
                  >
                    <Radio value="ssh" label="SSH public key" />
                    <Radio value="password" label="Password" />
                  </RadioGroup>
                  {authType === "ssh" && (
                    <Text className={styles.radioHelperText}>
                      Azure now automatically generates an SSH key pair for you
                      and allows you to store it for future use. It is a fast,
                      simple, and secure way to connect to your virtual machine.
                    </Text>
                  )}
                </div>

                <div className={styles.formField}>
                  <div className={styles.labelRow}>
                    <Label required>Username</Label>
                    <Info16Regular className={styles.infoButton} />
                  </div>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                {authType === "ssh" && (
                  <>
                    <div className={styles.formField}>
                      <div className={styles.labelRow}>
                        <Label required>SSH public key source</Label>
                        <Info16Regular className={styles.infoButton} />
                      </div>
                      <Dropdown
                        value={
                          sshKeySource === "generate-new"
                            ? "Generate a new key pair"
                            : undefined
                        }
                        selectedOptions={sshKeySource ? [sshKeySource] : []}
                        onOptionSelect={(_, data) =>
                          setSshKeySource(data.optionValue as string)
                        }
                      >
                        <Option value="generate-new">
                          Generate a new key pair
                        </Option>
                        <Option value="existing-azure">
                          Use existing key stored in Azure
                        </Option>
                        <Option value="existing-public">
                          Use existing public key
                        </Option>
                      </Dropdown>
                    </div>

                    <div className={styles.formField}>
                      <div className={styles.labelRow}>
                        <Label required>SSH Key Type</Label>
                        <Info16Regular className={styles.infoButton} />
                      </div>
                      <RadioGroup
                        value={sshKeyType}
                        onChange={(_, data) => setSshKeyType(data.value)}
                      >
                        <Radio value="rsa" label="RSA SSH Format" />
                        <Radio value="ed25519" label="Ed25519 SSH Format" />
                      </RadioGroup>
                    </div>

                    <div className={styles.formField}>
                      <Label required>Key pair name</Label>
                      <Input
                        placeholder="Enter the name of the SSH public key pair"
                        value={keyPairName}
                        onChange={(e) => setKeyPairName(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {authType === "password" && (
                  <div className={styles.formField}>
                    <Label required>Password</Label>
                    <Input type="password" placeholder="Enter password" />
                    <Text className={styles.helperText}>
                      Must be 12-72 characters with uppercase, lowercase,
                      number, and special character
                    </Text>
                  </div>
                )}
              </>
            )}

            {currentStep >= 2 && currentStep <= 6 && (
              <Text className={styles.sectionTitleLarge}>
                {STEPS.find((s) => s.id === currentStep)?.title}
              </Text>
            )}

            {currentStep === 7 && (
              <>
                <Text className={styles.sectionTitleLarge}>Review</Text>

                {/* Impact summary */}
                <div className={styles.impactSummary}>
                  <Text className={styles.impactTitle}>Impact summary</Text>
                  <ul className={styles.impactList}>
                    <li>
                      <Text className={styles.impactItem}>
                        <Text className={styles.impactBold}>
                          1 virtual machine
                        </Text>
                        {" will be added to "}
                        <Text className={styles.impactBold}>sub-03</Text>
                        {" in "}
                        <Text className={styles.impactBold}>rg-03</Text>
                        {"."}
                      </Text>
                    </li>
                    <li>
                      <Text className={styles.impactItem}>
                        {"To support your new virtual machine, "}
                        <Text className={styles.impactBold}>
                          we recommend enabling essential machine management
                          after deployment
                        </Text>
                      </Text>
                    </li>
                  </ul>
                </div>

                {/* Action links row */}
                <div className={styles.reviewActionsRow}>
                  <Button
                    appearance="transparent"
                    size="small"
                    icon={<Eye20Regular />}
                  >
                    View automation template
                  </Button>
                  <Button
                    appearance="transparent"
                    size="small"
                    icon={<Share20Regular />}
                  >
                    Share details
                  </Button>
                  <Button
                    appearance="transparent"
                    size="small"
                    icon={<ArrowDownload20Regular />}
                  >
                    Save draft
                  </Button>
                </div>

                {/* Collapsible Basics section */}
                <div className={styles.reviewCollapsible}>
                  <div
                    className={styles.reviewSectionHeader}
                    onClick={() => setBasicsExpanded(!basicsExpanded)}
                  >
                    <Text className={styles.reviewSectionTitle}>Basics</Text>
                    {basicsExpanded ? (
                      <ChevronUp20Regular />
                    ) : (
                      <ChevronDown20Regular />
                    )}
                  </div>
                  {basicsExpanded && (
                    <div className={styles.reviewTable}>
                      <Text className={styles.reviewLabel}>Subscription</Text>
                      <Text className={styles.reviewValue}>sub-03</Text>
                      <Text className={styles.reviewLabel}>Resource group</Text>
                      <Text className={styles.reviewValue}>rg-03</Text>
                      <Text className={styles.reviewLabel}>
                        Virtual machine{"\n"}resource name
                      </Text>
                      <Text className={styles.reviewValue}>
                        {vmName || "Contoso-vm"}
                      </Text>
                      <Text className={styles.reviewLabel}>Instance count</Text>
                      <Text className={styles.reviewValue}>
                        {instanceCount}
                      </Text>
                      <Text className={styles.reviewLabel}>Region</Text>
                      <Text className={styles.reviewValue}>West US 2</Text>
                      <Text className={styles.reviewLabel}>
                        Availability zone
                      </Text>
                      <Text className={styles.reviewValue}>Zone 1</Text>
                      <Text className={styles.reviewLabel}>Image</Text>
                      <Text className={styles.reviewValue}>
                        Ubuntu Server 24.04 LTS - x64 Gen2
                      </Text>
                      <Text className={styles.reviewLabel}>Size</Text>
                      <Text className={styles.reviewValue}>
                        Standard_D2s_v3 - 2 vcpus, 8 GiB memory ($137.24/month)
                      </Text>
                    </div>
                  )}
                </div>

                {/* Collapsible Disks section */}
                <div className={styles.reviewCollapsible}>
                  <div
                    className={styles.reviewSectionHeader}
                    onClick={() => setDisksExpanded(!disksExpanded)}
                  >
                    <Text className={styles.reviewSectionTitle}>Disks</Text>
                    {disksExpanded ? (
                      <ChevronUp20Regular />
                    ) : (
                      <ChevronDown20Regular />
                    )}
                  </div>
                  {disksExpanded && (
                    <div className={styles.reviewTable}>
                      <Text className={styles.reviewLabel}>OS disk type</Text>
                      <Text className={styles.reviewValue}>
                        Premium SSD (locally-redundant storage)
                      </Text>
                      <Text className={styles.reviewLabel}>OS disk size</Text>
                      <Text className={styles.reviewValue}>
                        Default size (30 GiB)
                      </Text>
                      <Text className={styles.reviewLabel}>
                        Encryption type
                      </Text>
                      <Text className={styles.reviewValue}>
                        Platform-managed key
                      </Text>
                      <Text className={styles.reviewLabel}>
                        Enable Ultra Disk{"\n"}compatibility
                      </Text>
                      <Text className={styles.reviewValue}>No</Text>
                      <Text className={styles.reviewLabel}>Data disks</Text>
                      <Text className={styles.reviewValue}>None</Text>
                    </div>
                  )}
                </div>

                {/* Collapsible Networking section */}
                <div className={styles.reviewCollapsible}>
                  <div
                    className={styles.reviewSectionHeader}
                    onClick={() => setNetworkingExpanded(!networkingExpanded)}
                  >
                    <Text className={styles.reviewSectionTitle}>
                      Networking
                    </Text>
                    {networkingExpanded ? (
                      <ChevronUp20Regular />
                    ) : (
                      <ChevronDown20Regular />
                    )}
                  </div>
                  {networkingExpanded && (
                    <div className={styles.reviewTable}>
                      <Text className={styles.reviewLabel}>
                        Virtual network
                      </Text>
                      <Text className={styles.reviewValue}>
                        (new) {vmName || "Contoso-vm"}-vnet
                      </Text>
                      <Text className={styles.reviewLabel}>Subnet</Text>
                      <Text className={styles.reviewValue}>
                        default (10.0.0.0/24)
                      </Text>
                      <Text className={styles.reviewLabel}>Public IP</Text>
                      <Text className={styles.reviewValue}>
                        (new) {vmName || "Contoso-vm"}-ip
                      </Text>
                      <Text className={styles.reviewLabel}>
                        NIC network{"\n"}security group
                      </Text>
                      <Text className={styles.reviewValue}>Basic</Text>
                      <Text className={styles.reviewLabel}>
                        Public inbound ports
                      </Text>
                      <Text className={styles.reviewValue}>SSH (22)</Text>
                      <Text className={styles.reviewLabel}>
                        Accelerated networking
                      </Text>
                      <Text className={styles.reviewValue}>Enabled</Text>
                      <Text className={styles.reviewLabel}>Load balancing</Text>
                      <Text className={styles.reviewValue}>None</Text>
                    </div>
                  )}
                </div>

                {/* Collapsible Management section */}
                <div className={styles.reviewCollapsible}>
                  <div
                    className={styles.reviewSectionHeader}
                    onClick={() => setManagementExpanded(!managementExpanded)}
                  >
                    <Text className={styles.reviewSectionTitle}>
                      Management
                    </Text>
                    {managementExpanded ? (
                      <ChevronUp20Regular />
                    ) : (
                      <ChevronDown20Regular />
                    )}
                  </div>
                  {managementExpanded && (
                    <div className={styles.reviewTable}>
                      <Text className={styles.reviewLabel}>
                        Microsoft Defender{"\n"}for Cloud
                      </Text>
                      <Text className={styles.reviewValue}>Basic (free)</Text>
                      <Text className={styles.reviewLabel}>
                        System assigned{"\n"}managed identity
                      </Text>
                      <Text className={styles.reviewValue}>Off</Text>
                      <Text className={styles.reviewLabel}>
                        Login with{"\n"}Microsoft Entra ID
                      </Text>
                      <Text className={styles.reviewValue}>Off</Text>
                      <Text className={styles.reviewLabel}>Auto-shutdown</Text>
                      <Text className={styles.reviewValue}>Disabled</Text>
                      <Text className={styles.reviewLabel}>Backup</Text>
                      <Text className={styles.reviewValue}>Disabled</Text>
                      <Text className={styles.reviewLabel}>
                        Patch orchestration
                      </Text>
                      <Text className={styles.reviewValue}>
                        Azure-orchestrated
                      </Text>
                    </div>
                  )}
                </div>

                {/* Collapsible Monitoring section */}
                <div className={styles.reviewCollapsible}>
                  <div
                    className={styles.reviewSectionHeader}
                    onClick={() => setMonitoringExpanded(!monitoringExpanded)}
                  >
                    <Text className={styles.reviewSectionTitle}>
                      Monitoring
                    </Text>
                    {monitoringExpanded ? (
                      <ChevronUp20Regular />
                    ) : (
                      <ChevronDown20Regular />
                    )}
                  </div>
                  {monitoringExpanded && (
                    <div className={styles.reviewTable}>
                      <Text className={styles.reviewLabel}>
                        Boot diagnostics
                      </Text>
                      <Text className={styles.reviewValue}>
                        Enabled with managed storage account
                      </Text>
                      <Text className={styles.reviewLabel}>
                        OS guest diagnostics
                      </Text>
                      <Text className={styles.reviewValue}>Off</Text>
                      <Text className={styles.reviewLabel}>
                        Diagnostics{"\n"}storage account
                      </Text>
                      <Text className={styles.reviewValue}>N/A</Text>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Action bar -- custom for review step to match Figma */}
            {currentStep === 7 ? (
              <div className={styles.reviewActionBar}>
                <Button
                  appearance="subtle"
                  icon={<ArrowLeft20Regular />}
                  onClick={handlePrevious}
                />
                <Button appearance="secondary" disabled>
                  Next
                </Button>
                <Button
                  appearance="primary"
                  icon={<Checkmark20Regular />}
                  onClick={() => setShowDeployment(true)}
                >
                  Create resource
                </Button>
                <div className={styles.reviewRightActions}>
                  <Button appearance="subtle" size="small">
                    More actions
                  </Button>
                </div>
              </div>
            ) : (
              <WizardActionBar
                currentStep={currentStep}
                totalSteps={7}
                reviewStep={7}
                nextLabel="Next"
                createLabel="Create resource"
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSkipToReview={() => setCurrentStep(7)}
                showSkipToReview
                rightActions={
                  <Button appearance="subtle" size="small">
                    More actions
                  </Button>
                }
              />
            )}
          </div>
        </WizardLayout>
      </div>
    </NavigationProvider>
  );
}
