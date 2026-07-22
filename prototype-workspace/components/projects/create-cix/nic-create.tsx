"use client"

import { useState } from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Input,
  Dropdown,
  Option,
  Field,
  InfoLabel,
  RadioGroup,
  Radio,
  Divider,
  Menu,
  MenuTrigger,
  MenuButton,
  MenuPopover,
  MenuList,
  MenuItem,
} from "@fluentui/react-components"
import {
  ChevronLeft20Regular,
  ArrowRight20Regular,
  ArrowExport20Regular,
  Dismiss20Regular,
  MoreHorizontal20Regular,
  Checkmark20Regular,
} from "@fluentui/react-icons"
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

interface NicCreateProps {
  isDarkMode?: boolean
  onClose?: () => void
  onGoHome?: () => void
  onGoToBrowse?: () => void
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  // Breadcrumb bar
  breadcrumbBar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalXL}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  breadcrumbLink: {
    fontSize: tokens.fontSizeBase300,
    color: "#0078D4",
    cursor: "pointer",
    lineHeight: tokens.lineHeightBase300,
    backgroundColor: "transparent",
    border: "none",
    padding: "0",
    ":hover": {
      textDecoration: "underline",
    },
  },
  breadcrumbSeparator: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  breadcrumbCurrent: {
    fontSize: tokens.fontSizeBase300,
    color: "#0078D4",
    lineHeight: tokens.lineHeightBase300,
  },
  // Blade header
  bladeHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalXL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    height: "64px",
  },
  bladeHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  bladeTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase600,
  },
  bladeEllipsis: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground3,
    borderRadius: tokens.borderRadiusMedium,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  bladeClose: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground3,
    padding: "0",
    ":hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  // Content area (below blade header)
  contentArea: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
  // Left vertical tab nav
  verticalNav: {
    width: "226px",
    display: "flex",
    flexDirection: "column",
    padding: `${tokens.spacingVerticalM} 40px`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    paddingRight: tokens.spacingHorizontalS,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
  },
  navItemInner: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalSNudge,
    height: "32px",
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  navItemText: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
    padding: `0 ${tokens.spacingHorizontalXXS}`,
  },
  navItemTextActive: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    padding: `0 ${tokens.spacingHorizontalXXS}`,
  },
  navActiveIndicator: {
    position: "absolute",
    left: "0",
    top: tokens.spacingVerticalS,
    bottom: tokens.spacingVerticalS,
    width: "3px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorCompoundBrandStroke,
  },
  // Form area
  formArea: {
    flex: 1,
    overflowY: "auto",
    padding: `${tokens.spacingVerticalM} 0`,
  },
  formContent: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
    maxWidth: "800px",
    padding: `0 40px`,
  },
  // Section title area
  sectionTitleArea: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase600,
    color: tokens.colorNeutralForeground1,
  },
  sectionTip: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
  tipLink: {
    color: tokens.colorBrandForeground1,
    textDecoration: "underline",
    cursor: "pointer",
  },
  // Form sections
  formSections: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXXL,
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXL,
  },
  formSectionTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "28px",
    color: tokens.colorNeutralForeground1,
  },
  formFields: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  fieldContainer: {
    width: "500px",
  },
  // Indented resource group with elbow connector
  elbowRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
    width: "500px",
  },
  elbowConnector: {
    width: "44px",
    height: "12px",
    display: "flex",
    alignItems: "center",
    marginTop: tokens.spacingVerticalM,
  },
  elbowLine: {
    width: "22px",
    height: "12px",
    borderLeft: `1px solid ${tokens.colorNeutralStroke1}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    borderBottomLeftRadius: "4px",
  },
  elbowDash: {
    width: "22px",
    borderBottom: `1px dashed ${tokens.colorNeutralStroke1}`,
  },
  elbowField: {
    flex: 1,
  },
  // Link
  link: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorBrandForeground1,
    textDecoration: "underline",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    padding: "0",
  },
  // Footer
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalXL} 40px`,
    paddingBottom: "60px",
    marginLeft: "226px",
    maxWidth: "720px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  footerLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  footerRight: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  // Tags step
  tagsSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  tagRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    maxWidth: "500px",
  },
  // Review step
  reviewSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXL,
  },
  reviewGroup: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  reviewGroupTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "28px",
    color: tokens.colorNeutralForeground1,
  },
  reviewRow: {
    display: "flex",
    gap: tokens.spacingHorizontalXXL,
  },
  reviewLabel: {
    width: "180px",
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
  },
  reviewValue: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
})

const steps = [
  { id: 1, label: "Basics" },
  { id: 2, label: "Tags" },
  { id: 3, label: "Review" },
]

export default function NicCreate({ isDarkMode, onClose, onGoHome, onGoToBrowse }: NicCreateProps) {
  const styles = useStyles()
  const [currentStep, setCurrentStep] = useState(1)

  // Form state
  const [subscription, setSubscription] = useState("myDefaultSub")
  const [resourceGroup, setResourceGroup] = useState("Resource group A")
  const [nicName, setNicName] = useState("")
  const [region, setRegion] = useState("(US) West US")
  const [virtualNetwork, setVirtualNetwork] = useState("")
  const [subnet, setSubnet] = useState("")
  const [privateIpAllocation, setPrivateIpAllocation] = useState("Dynamic")
  const [ipVersion, setIpVersion] = useState("IPv4")

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }
  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }
  const handleSkipToReview = () => {
    setCurrentStep(3)
  }

  return (
    <div className={styles.root}>
      {/* Azure Header */}
      <AzureHeaderBuildMVP
        onSearchSubmit={() => {}}
        onLogoClick={onGoHome}
      />

      {/* Breadcrumb */}
      <div className={styles.breadcrumbBar}>
        <button className={styles.breadcrumbLink} onClick={onGoHome}>Home</button>
        <span className={styles.breadcrumbSeparator}>&gt;</span>
        <button className={styles.breadcrumbLink} onClick={onGoToBrowse}>Network foundation | Network interfaces</button>
      </div>

      {/* Blade Header */}
      <div className={styles.bladeHeader}>
        <div className={styles.bladeHeaderLeft}>
          <Text className={styles.bladeTitle}>Create network interface</Text>
          <button className={styles.bladeEllipsis}>
            <MoreHorizontal20Regular />
          </button>
        </div>
        <button className={styles.bladeClose} onClick={onClose}>
          <Dismiss20Regular />
        </button>
      </div>

      {/* Main content */}
      <div className={styles.contentArea}>
        {/* Left vertical nav */}
        <div className={styles.verticalNav}>
          {steps.map((step) => (
            <button
              key={step.id}
              className={styles.navItem}
              onClick={() => setCurrentStep(step.id)}
            >
              {currentStep === step.id && <div className={styles.navActiveIndicator} />}
              <div className={styles.navItemInner}>
                <span className={currentStep === step.id ? styles.navItemTextActive : styles.navItemText}>
                  {step.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Form area */}
        <div className={styles.formArea}>
          <div className={styles.formContent}>
            {/* Step 1: Basics */}
            {currentStep === 1 && (
              <>
                <div className={styles.sectionTitleArea}>
                  <Text className={styles.sectionTitle}>Basics</Text>
                  <Text className={styles.sectionTip}>
                    Ensure all required fields are filled out on this tab. For a detailed walkthrough,{" "}
                    <span className={styles.tipLink}>check out the network interface creation guide.</span>
                  </Text>
                </div>

                <Divider />

                <div className={styles.formSections}>
                  {/* Project details */}
                  <div className={styles.formSection}>
                    <Text className={styles.formSectionTitle}>Project details</Text>
                    <div className={styles.formFields}>
                      <div className={styles.fieldContainer}>
                        <Field label="Subscription" required>
                          <Dropdown
                            value={subscription}
                            onOptionSelect={(_, data) => setSubscription(data.optionText || "")}
                          >
                            <Option>myDefaultSub</Option>
                            <Option>Visual Studio Enterprise</Option>
                          </Dropdown>
                        </Field>
                      </div>
                      <div className={styles.elbowRow}>
                        <div className={styles.elbowConnector}>
                          <div className={styles.elbowLine} />
                          <div className={styles.elbowDash} />
                        </div>
                        <div className={styles.elbowField}>
                          <Field label="Resource group" required>
                            <Dropdown
                              value={resourceGroup}
                              onOptionSelect={(_, data) => setResourceGroup(data.optionText || "")}
                            >
                              <Option>Resource group A</Option>
                              <Option>myResourceGroup</Option>
                              <Option>Create new</Option>
                            </Dropdown>
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Instance details */}
                  <div className={styles.formSection}>
                    <Text className={styles.formSectionTitle}>Instance details</Text>
                    <div className={styles.formFields}>
                      <div className={styles.fieldContainer}>
                        <Field label="Name" required>
                          <Input
                            placeholder="Unique name"
                            value={nicName}
                            onChange={(_, data) => setNicName(data.value)}
                          />
                        </Field>
                      </div>
                      <div className={styles.fieldContainer}>
                        <Field label="Region" required>
                          <Dropdown
                            value={region}
                            onOptionSelect={(_, data) => setRegion(data.optionText || "")}
                          >
                            <Option>(US) West US</Option>
                            <Option>(US) East US</Option>
                            <Option>(US) Central US</Option>
                            <Option>(Europe) West Europe</Option>
                          </Dropdown>
                        </Field>
                      </div>
                      <div className={styles.fieldContainer}>
                        <Field label={<InfoLabel info="The virtual network where this network interface will be deployed." required>Virtual network</InfoLabel>}>
                          <Dropdown
                            placeholder="Select a virtual network"
                            value={virtualNetwork}
                            onOptionSelect={(_, data) => setVirtualNetwork(data.optionText || "")}
                          >
                            <Option>myVNet</Option>
                            <Option>defaultVNet</Option>
                            <Option>Create new</Option>
                          </Dropdown>
                        </Field>
                        <button className={styles.link}>Edit virtual network</button>
                      </div>
                      <div className={styles.fieldContainer}>
                        <Field label={<InfoLabel info="A range of IP addresses in the virtual network that isolates resources.">Subnet</InfoLabel>}>
                          <Dropdown
                            placeholder="Select a subnet"
                            value={subnet}
                            onOptionSelect={(_, data) => setSubnet(data.optionText || "")}
                          >
                            <Option>default (10.0.0.0/24)</Option>
                            <Option>subnet-1 (10.0.1.0/24)</Option>
                          </Dropdown>
                        </Field>
                        <button className={styles.link}>Edit subnet</button>
                      </div>
                      <div className={styles.fieldContainer}>
                        <Field label="IP version">
                          <RadioGroup
                            value={ipVersion}
                            onChange={(_, data) => setIpVersion(data.value)}
                          >
                            <Radio value="IPv4" label="IPv4" />
                            <Radio value="IPv4andIPv6" label="IPv4 and IPv6" />
                          </RadioGroup>
                        </Field>
                      </div>
                      <div className={styles.fieldContainer}>
                        <Field label="Private IP address allocation">
                          <RadioGroup
                            value={privateIpAllocation}
                            onChange={(_, data) => setPrivateIpAllocation(data.value)}
                          >
                            <Radio value="Dynamic" label="Dynamic" />
                            <Radio value="Static" label="Static" />
                          </RadioGroup>
                        </Field>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Tags */}
            {currentStep === 2 && (
              <>
                <div className={styles.sectionTitleArea}>
                  <Text className={styles.sectionTitle}>Tags</Text>
                  <Text className={styles.sectionTip}>
                    Tags are name/value pairs that enable you to categorize resources and view consolidated billing.
                  </Text>
                </div>

                <Divider />

                <div className={styles.tagsSection}>
                  <div className={styles.tagRow}>
                    <Field label="Name">
                      <Input placeholder="e.g. Environment" />
                    </Field>
                    <Field label="Value">
                      <Input placeholder="e.g. Production" />
                    </Field>
                  </div>
                  <div className={styles.tagRow}>
                    <Field label="Name">
                      <Input placeholder="e.g. Department" />
                    </Field>
                    <Field label="Value">
                      <Input placeholder="e.g. Engineering" />
                    </Field>
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <>
                <div className={styles.sectionTitleArea}>
                  <Text className={styles.sectionTitle}>Review + create</Text>
                  <Text className={styles.sectionTip}>
                    Review your settings before creating the network interface.
                  </Text>
                </div>

                <Divider />

                <div className={styles.reviewSection}>
                  <div className={styles.reviewGroup}>
                    <Text className={styles.reviewGroupTitle}>Project details</Text>
                    <div className={styles.reviewRow}>
                      <Text className={styles.reviewLabel}>Subscription</Text>
                      <Text className={styles.reviewValue}>{subscription || "—"}</Text>
                    </div>
                    <div className={styles.reviewRow}>
                      <Text className={styles.reviewLabel}>Resource group</Text>
                      <Text className={styles.reviewValue}>{resourceGroup || "—"}</Text>
                    </div>
                  </div>

                  <div className={styles.reviewGroup}>
                    <Text className={styles.reviewGroupTitle}>Instance details</Text>
                    <div className={styles.reviewRow}>
                      <Text className={styles.reviewLabel}>Name</Text>
                      <Text className={styles.reviewValue}>{nicName || "—"}</Text>
                    </div>
                    <div className={styles.reviewRow}>
                      <Text className={styles.reviewLabel}>Region</Text>
                      <Text className={styles.reviewValue}>{region || "—"}</Text>
                    </div>
                    <div className={styles.reviewRow}>
                      <Text className={styles.reviewLabel}>Virtual network</Text>
                      <Text className={styles.reviewValue}>{virtualNetwork || "—"}</Text>
                    </div>
                    <div className={styles.reviewRow}>
                      <Text className={styles.reviewLabel}>Subnet</Text>
                      <Text className={styles.reviewValue}>{subnet || "—"}</Text>
                    </div>
                    <div className={styles.reviewRow}>
                      <Text className={styles.reviewLabel}>Private IP allocation</Text>
                      <Text className={styles.reviewValue}>{privateIpAllocation}</Text>
                    </div>
                    <div className={styles.reviewRow}>
                      <Text className={styles.reviewLabel}>IP version</Text>
                      <Text className={styles.reviewValue}>{ipVersion === "IPv4andIPv6" ? "IPv4 and IPv6" : ipVersion}</Text>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <Button
            appearance="secondary"
            icon={<ChevronLeft20Regular />}
            disabled={currentStep === 1}
            onClick={handlePrevious}
          />
          <Button
            appearance="secondary"
            icon={<ArrowRight20Regular />}
            onClick={handleNext}
            disabled={currentStep === 3}
          >
            Next
          </Button>
          {currentStep === 3 ? (
            <Button
              appearance="primary"
              icon={<Checkmark20Regular />}
              onClick={onClose}
            >
              Create resource
            </Button>
          ) : (
            <Button
              appearance="secondary"
              icon={<ArrowExport20Regular />}
              onClick={handleSkipToReview}
            >
              Skip to review
            </Button>
          )}
        </div>
        <div className={styles.footerRight}>
          <Menu>
            <MenuTrigger>
              <MenuButton appearance="subtle">More actions</MenuButton>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem>Save draft</MenuItem>
                <MenuItem>Download template</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </div>
      </div>
    </div>
  )
}
