"use client"

import { useState } from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Field,
  Input,
  Dropdown,
  Option,
  RadioGroup,
  Radio,
  Link,
  MessageBar,
  MessageBarBody,
  Button,
  Badge,
} from "@fluentui/react-components"
import {
  Add20Regular,
  Dismiss20Regular,
  ErrorCircle16Filled,
} from "@fluentui/react-icons"
import PageBreadcrumb from "../../shared/page-breadcrumb"
import PageHeader from "../../shared/page-header"
import WizardLayout from "../../shared/wizard-layout"
import WizardStepNav from "../../shared/wizard-step-nav"
import WizardSection from "../../shared/wizard-section"
import WizardActionBar from "../../shared/wizard-action-bar"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  centerSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingVerticalXXL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  description: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalXXL,
    lineHeight: tokens.lineHeightBase300,
  },
  learnMoreLink: {
    fontSize: tokens.fontSizeBase300,
  },
  formField: {
    marginBottom: tokens.spacingVerticalL,
  },
  createNewLink: {
    fontSize: tokens.fontSizeBase200,
    marginTop: tokens.spacingVerticalXS,
  },
  validationError: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorPaletteRedForeground1,
    marginTop: tokens.spacingVerticalXS,
  },
  errorIcon: {
    color: tokens.colorPaletteRedForeground1,
    flexShrink: 0,
  },
  tagRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr auto",
    gap: tokens.spacingHorizontalM,
    alignItems: "end",
    marginBottom: tokens.spacingVerticalM,
  },
  tagNote: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    marginTop: tokens.spacingVerticalM,
  },
  reviewSection: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  reviewSectionTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalS,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  reviewRow: {
    display: "grid",
    gridTemplateColumns: "200px 1fr",
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalS} 0`,
  },
  reviewLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
  },
  reviewValue: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
  templateLink: {
    fontSize: tokens.fontSizeBase300,
  },
})

// ── Steps ────────────────────────────────────────────────────────────────────

const steps = [
  { id: 1, title: "Basics" },
  { id: 2, title: "Tags" },
  { id: 3, title: "Review + create" },
]

// ── Component ────────────────────────────────────────────────────────────────

export interface CreateNicWizardProps {
  onClose?: () => void
  isDarkMode?: boolean
}

/** Create Network Interface wizard following the vertical create pattern. */
export default function CreateNicWizard({ onClose, isDarkMode = false }: CreateNicWizardProps) {
  const styles = useStyles()
  const [currentStep, setCurrentStep] = useState(1)

  // Form state — Basics
  const [subscription, setSubscription] = useState("NSPInternalTest05")
  const [resourceGroup, setResourceGroup] = useState("")
  const [name, setName] = useState("")
  const [region, setRegion] = useState("(US) West Central US")
  const [virtualNetwork, setVirtualNetwork] = useState("")
  const [subnet, setSubnet] = useState("")
  const [ipVersion, setIpVersion] = useState("ipv4")
  const [ipAssignment, setIpAssignment] = useState("dynamic")

  // Form state — Tags
  const [tags, setTags] = useState<{ name: string; value: string }[]>([
    { name: "", value: "" },
  ])

  const addTag = () => setTags([...tags, { name: "", value: "" }])
  const removeTag = (index: number) => setTags(tags.filter((_, i) => i !== index))
  const updateTag = (index: number, field: "name" | "value", val: string) => {
    const updated = [...tags]
    updated[index][field] = val
    setTags(updated)
  }

  // Navigation
  const goToStep = (step: number) => setCurrentStep(step)
  const nextLabel = currentStep === 1 ? "Next : Tags >" : currentStep === 2 ? "Next : Review + create >" : undefined

  return (
    <div className={styles.root}>
      <PageBreadcrumb
        noBorder
        items={[
          { label: "Home", onClick: () => onClose?.() },
          { label: "Network foundation | Network interfaces" },
          { label: "Create network interface" },
        ]}
      />
      <PageHeader
        title="Create network interface"
        onClose={onClose}
      />

      <WizardLayout
        stepNav={
          <WizardStepNav
            steps={steps}
            activeStep={currentStep}
            onStepChange={goToStep}
          />
        }
      >
        <div className={styles.centerSection}>
          {/* ─── STEP 1: BASICS ────────────────────────────────────────── */}
          {currentStep === 1 && (
            <>
              <Text className={styles.description}>
                Create a network interface and attach it to a virtual machine. A network interface enables a virtual machine to communicate with Internet, Azure, and on-premises resources.{" "}
                <Link href="#" className={styles.learnMoreLink}>
                  Learn more about network interface
                </Link>
              </Text>

              <WizardSection title="Project details" description="Select the subscription to manage deployed resources and costs. Use resource groups like folders to organize and manage all your resources.">
                <div className={styles.formField}>
                  <Field label="Subscription" required>
                    <Dropdown
                      value={subscription}
                      selectedOptions={[subscription]}
                      onOptionSelect={(_, data) => setSubscription(data.optionValue ?? "")}
                    >
                      <Option value="NSPInternalTest05">NSPInternalTest05</Option>
                      <Option value="Azure subscription 1">Azure subscription 1</Option>
                    </Dropdown>
                  </Field>
                </div>
                <div className={styles.formField}>
                  <Field label="Resource group" required validationState={!resourceGroup ? "error" : "none"} validationMessage={!resourceGroup ? "The value must not be empty." : undefined}>
                    <Dropdown
                      value={resourceGroup}
                      selectedOptions={resourceGroup ? [resourceGroup] : []}
                      onOptionSelect={(_, data) => setResourceGroup(data.optionValue ?? "")}
                      placeholder="Select a resource group"
                    >
                      <Option value="rg-production">rg-production</Option>
                      <Option value="rg-development">rg-development</Option>
                      <Option value="rg-management">rg-management</Option>
                    </Dropdown>
                  </Field>
                  <Link href="#" className={styles.createNewLink}>Create new</Link>
                </div>
              </WizardSection>

              <WizardSection title="Instance details">
                <div className={styles.formField}>
                  <Field label="Name" required validationState={!name ? "error" : "none"} validationMessage={!name ? "The value must not be empty." : undefined}>
                    <Input
                      value={name}
                      onChange={(_, data) => setName(data.value)}
                      placeholder="Enter NIC name"
                    />
                  </Field>
                  {!name && (
                    <div className={styles.validationError}>
                      <ErrorCircle16Filled className={styles.errorIcon} />
                      <Text size={200}>The name must be between 2 and 64 characters.</Text>
                    </div>
                  )}
                  {!name && (
                    <div className={styles.validationError}>
                      <ErrorCircle16Filled className={styles.errorIcon} />
                      <Text size={200}>The name must begin with a letter or number, end with a letter, number or underscore, and may contain only letters, numbers, underscores, periods, or hyphens.</Text>
                    </div>
                  )}
                </div>
                <div className={styles.formField}>
                  <Field label="Region" required>
                    <Dropdown
                      value={region}
                      selectedOptions={[region]}
                      onOptionSelect={(_, data) => setRegion(data.optionValue ?? "")}
                    >
                      <Option value="(US) West Central US">(US) West Central US</Option>
                      <Option value="(US) East US">(US) East US</Option>
                      <Option value="(US) West US 2">(US) West US 2</Option>
                      <Option value="(Europe) West Europe">(Europe) West Europe</Option>
                    </Dropdown>
                  </Field>
                </div>
                <div className={styles.formField}>
                  <Field label="Virtual network" hint="Select a virtual network for this NIC">
                    <Dropdown
                      value={virtualNetwork}
                      selectedOptions={virtualNetwork ? [virtualNetwork] : []}
                      onOptionSelect={(_, data) => setVirtualNetwork(data.optionValue ?? "")}
                      placeholder="Select virtual network"
                    >
                      <Option value="vnet-prod-eastus">vnet-prod-eastus</Option>
                      <Option value="vnet-dev-centralus">vnet-dev-centralus</Option>
                      <Option value="vnet-mgmt-westus">vnet-mgmt-westus</Option>
                    </Dropdown>
                  </Field>
                </div>
                <div className={styles.formField}>
                  <Field label="Subnet" hint="Select a subnet within the virtual network">
                    <Dropdown
                      value={subnet}
                      selectedOptions={subnet ? [subnet] : []}
                      onOptionSelect={(_, data) => setSubnet(data.optionValue ?? "")}
                      placeholder="Select subnet"
                    >
                      <Option value="subnet-default">subnet-default</Option>
                      <Option value="subnet-app">subnet-app</Option>
                      <Option value="subnet-data">subnet-data</Option>
                      <Option value="subnet-gateway">subnet-gateway</Option>
                    </Dropdown>
                  </Field>
                </div>
                <div className={styles.formField}>
                  <Field label="IP version">
                    <RadioGroup value={ipVersion} onChange={(_, data) => setIpVersion(data.value)}>
                      <Radio value="ipv4" label="IPv4" />
                      <Radio value="ipv4-ipv6" label="IPv4 and IPv6" />
                    </RadioGroup>
                  </Field>
                </div>
                <div className={styles.formField}>
                  <Field label="Private IP address assignment">
                    <RadioGroup value={ipAssignment} onChange={(_, data) => setIpAssignment(data.value)}>
                      <Radio value="dynamic" label="Dynamic" />
                      <Radio value="static" label="Static" />
                    </RadioGroup>
                  </Field>
                </div>
              </WizardSection>

              <WizardActionBar
                currentStep={1}
                totalSteps={3}
                reviewStep={3}
                nextLabel="Next : Tags >"
                createLabel="Review + create"
                onNext={() => setCurrentStep(2)}
                onSkipToReview={() => setCurrentStep(3)}
                onCreate={() => setCurrentStep(3)}
                rightActions={
                  <Link href="#" className={styles.templateLink}>
                    Download a template for automation
                  </Link>
                }
              />
            </>
          )}

          {/* ─── STEP 2: TAGS ──────────────────────────────────────────── */}
          {currentStep === 2 && (
            <>
              <Text className={styles.description}>
                Tags are name/value pairs that enable you to categorize resources and view consolidated billing by applying the same tag to multiple resources and resource groups.{" "}
                <Link href="#" className={styles.learnMoreLink}>
                  Learn more about tags
                </Link>
              </Text>

              <WizardSection title="Tags">
                {tags.map((tag, index) => (
                  <div key={index} className={styles.tagRow}>
                    <Field label={index === 0 ? "Name" : undefined}>
                      <Input
                        value={tag.name}
                        onChange={(_, data) => updateTag(index, "name", data.value)}
                        placeholder="e.g. Environment"
                      />
                    </Field>
                    <Field label={index === 0 ? "Value" : undefined}>
                      <Input
                        value={tag.value}
                        onChange={(_, data) => updateTag(index, "value", data.value)}
                        placeholder="e.g. Production"
                      />
                    </Field>
                    <Button
                      appearance="subtle"
                      icon={<Dismiss20Regular />}
                      onClick={() => removeTag(index)}
                      disabled={tags.length === 1}
                    />
                  </div>
                ))}
                <Button
                  appearance="subtle"
                  icon={<Add20Regular />}
                  onClick={addTag}
                >
                  Add tag
                </Button>
                <Text className={styles.tagNote}>
                  Note: Not all resources support tags. Tags are applied to the resource group if selected.
                </Text>
              </WizardSection>

              <WizardActionBar
                currentStep={2}
                totalSteps={3}
                reviewStep={3}
                nextLabel="Next : Review + create >"
                createLabel="Review + create"
                onPrevious={() => setCurrentStep(1)}
                onNext={() => setCurrentStep(3)}
                onCreate={() => setCurrentStep(3)}
                rightActions={
                  <Link href="#" className={styles.templateLink}>
                    Download a template for automation
                  </Link>
                }
              />
            </>
          )}

          {/* ─── STEP 3: REVIEW + CREATE ───────────────────────────────── */}
          {currentStep === 3 && (
            <>
              <Text className={styles.description}>
                Review the settings below and click Create to deploy your network interface.
              </Text>

              <div className={styles.reviewSection}>
                <Text className={styles.reviewSectionTitle}>Basics</Text>
                <div className={styles.reviewRow}>
                  <Text className={styles.reviewLabel}>Subscription</Text>
                  <Text className={styles.reviewValue}>{subscription}</Text>
                </div>
                <div className={styles.reviewRow}>
                  <Text className={styles.reviewLabel}>Resource group</Text>
                  <Text className={styles.reviewValue}>{resourceGroup || "(not set)"}</Text>
                </div>
                <div className={styles.reviewRow}>
                  <Text className={styles.reviewLabel}>Name</Text>
                  <Text className={styles.reviewValue}>{name || "(not set)"}</Text>
                </div>
                <div className={styles.reviewRow}>
                  <Text className={styles.reviewLabel}>Region</Text>
                  <Text className={styles.reviewValue}>{region}</Text>
                </div>
                <div className={styles.reviewRow}>
                  <Text className={styles.reviewLabel}>Virtual network</Text>
                  <Text className={styles.reviewValue}>{virtualNetwork || "(not set)"}</Text>
                </div>
                <div className={styles.reviewRow}>
                  <Text className={styles.reviewLabel}>Subnet</Text>
                  <Text className={styles.reviewValue}>{subnet || "(not set)"}</Text>
                </div>
                <div className={styles.reviewRow}>
                  <Text className={styles.reviewLabel}>IP version</Text>
                  <Text className={styles.reviewValue}>{ipVersion === "ipv4" ? "IPv4" : "IPv4 and IPv6"}</Text>
                </div>
                <div className={styles.reviewRow}>
                  <Text className={styles.reviewLabel}>Private IP address assignment</Text>
                  <Text className={styles.reviewValue}>{ipAssignment === "dynamic" ? "Dynamic" : "Static"}</Text>
                </div>
              </div>

              <div className={styles.reviewSection}>
                <Text className={styles.reviewSectionTitle}>Tags</Text>
                {tags.filter(t => t.name).length > 0 ? (
                  tags.filter(t => t.name).map((tag, i) => (
                    <div key={i} className={styles.reviewRow}>
                      <Text className={styles.reviewLabel}>{tag.name}</Text>
                      <Text className={styles.reviewValue}>{tag.value || "(empty)"}</Text>
                    </div>
                  ))
                ) : (
                  <div className={styles.reviewRow}>
                    <Text className={styles.reviewLabel}>—</Text>
                    <Text className={styles.reviewValue}>No tags defined</Text>
                  </div>
                )}
              </div>

              <WizardActionBar
                currentStep={3}
                totalSteps={3}
                reviewStep={3}
                createLabel="Create"
                onPrevious={() => setCurrentStep(2)}
                onCreate={() => {
                  // Could trigger deployment flow here
                  alert("Network interface creation initiated!")
                }}
                rightActions={
                  <Link href="#" className={styles.templateLink}>
                    Download a template for automation
                  </Link>
                }
              />
            </>
          )}
        </div>
      </WizardLayout>
    </div>
  )
}
