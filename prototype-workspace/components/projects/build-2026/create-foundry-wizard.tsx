"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Text,
  Button,
  Input,
  Dropdown,
  Option,
  Divider,
  TabList,
  Tab,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
} from "@fluentui/react-components";
import {
  Info16Regular,
  ChevronLeft20Regular,
  Dismiss20Regular,
} from "@fluentui/react-icons";
import { useNavigation } from "../../../lib/navigation-context";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ─── Styles ────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 96px)", // 48px azure header + 48px prototype footer
    overflow: "hidden",
    backgroundColor: tokens.colorNeutralBackground2,
  },

  // Breadcrumb bar
  breadcrumbBar: {
    backgroundColor: tokens.colorNeutralBackground1,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    flexShrink: 0,
  },

  // Page header
  pageHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalS}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  pageTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  pageTitle: {
    fontSize: tokens.fontSizeBase700,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  pageTitleEllipsis: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase700,
  },
  closeButton: {
    color: tokens.colorNeutralForeground2,
  },

  // Tab bar
  tabBar: {
    backgroundColor: tokens.colorNeutralBackground1,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },

  // Scrollable content area
  scrollArea: {
    flex: 1,
    overflowY: "auto",
  },

  // Form container
  formContainer: {
    maxWidth: "760px",
    margin: "0",
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
  },

  // Tab description
  tabDescription: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalXS,
  },
  tabDescriptionLink: {
    color: tokens.colorBrandForeground1,
  },

  // Section headings
  sectionHeading: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalXS,
  },
  sectionDescription: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalL,
  },

  // Form fields
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  fieldLabelRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  fieldLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
  },
  fieldRequired: {
    color: tokens.colorPaletteRedForeground1,
    marginLeft: "2px",
  },
  fieldInfoIcon: {
    color: tokens.colorNeutralForeground3,
    cursor: "help",
    display: "flex",
    alignItems: "center",
  },
  fieldInput: {
    width: "100%",
  },

  // Resource group row with create new link
  resourceGroupRow: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  resourceGroupDropdownRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  resourceGroupDropdown: {
    flex: 1,
  },
  createNewLink: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },

  // Indented subscription/resource row
  indentedField: {
    paddingLeft: tokens.spacingHorizontalXXL,
  },

  // Pricing link
  pricingLink: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
  pricingLinkWrapper: {
    marginTop: tokens.spacingVerticalL,
  },

  // Content review policy links
  policyLinkRow: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalXS,
  },
  policyLink: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },

  // Bottom action bar — in-flow (not fixed), sits at bottom of flex column
  actionBar: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXXL}`,
    backgroundColor: tokens.colorNeutralBackground1,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
});

// ─── Props ─────────────────────────────────────────────────────────────────

export interface CreateFoundryWizardProps {
  onBack: () => void;
  onBackLabel?: string;
  onAllServicesClick?: () => void;
  onServiceClick?: () => void;
  serviceName?: string;
}

// ─── Tab steps ─────────────────────────────────────────────────────────────

const TABS = [
  "Basics",
  "Storage",
  "Network",
  "Identity",
  "Encryption",
  "Tags",
  "Review + create",
] as const;
type TabId = (typeof TABS)[number];

// ─── Field label helper ────────────────────────────────────────────────────

function FieldLabel({
  label,
  required,
  styles,
}: {
  label: string;
  required?: boolean;
  styles: ReturnType<typeof useStyles>;
}) {
  return (
    <div className={styles.fieldLabelRow}>
      <Text className={styles.fieldLabel}>{label}</Text>
      {required && <span className={styles.fieldRequired}>*</span>}
      <span className={styles.fieldInfoIcon}>
        <Info16Regular />
      </span>
    </div>
  );
}

// ─── Basics tab content ────────────────────────────────────────────────────

function BasicsTab({ styles }: { styles: ReturnType<typeof useStyles> }) {
  const [subscription] = useState("1ES-DevBoxInfra");
  const [resourceGroup, setResourceGroup] = useState("");
  const [name, setName] = useState("");
  const [region] = useState("(US) East US");
  const [projectName, setProjectName] = useState("proj-default");

  return (
    <>
      {/* Tab description */}
      <Text className={styles.tabDescription}>
        Design, customize, and manage AI apps and agents at scale.{" "}
        <a
          className={styles.tabDescriptionLink}
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          Learn More
        </a>
      </Text>

      {/* ── Instance Details ── */}
      <div>
        <Text className={styles.sectionHeading}>Instance Details</Text>
        <Text className={styles.sectionDescription}>
          Select the subscription to manage deployed resources and costs. Use
          resources groups like folders to organize and manage all your
          resources.
        </Text>

        <div className={styles.fieldGroup}>
          {/* Subscription */}
          <div className={styles.field}>
            <FieldLabel label="Subscription" required styles={styles} />
            <Dropdown
              className={styles.fieldInput}
              defaultValue={subscription}
              defaultSelectedOptions={[subscription]}
            >
              <Option>1ES-DevBoxInfra</Option>
              <Option>Visual Studio Enterprise</Option>
              <Option>Pay-As-You-Go</Option>
            </Dropdown>
          </div>

          {/* Resource group — indented under Subscription */}
          <div className={styles.field}>
            <FieldLabel label="Resource group" required styles={styles} />
            <div className={styles.resourceGroupRow}>
              <div className={styles.resourceGroupDropdownRow}>
                <Dropdown
                  className={styles.resourceGroupDropdown}
                  placeholder=""
                  value={resourceGroup}
                  onOptionSelect={(_, d) =>
                    setResourceGroup(d.optionValue ?? "")
                  }
                >
                  <Option value="rg-ai-prod">rg-ai-prod</Option>
                  <Option value="rg-dev">rg-dev</Option>
                  <Option value="rg-staging">rg-staging</Option>
                </Dropdown>
              </div>
              <a
                className={styles.createNewLink}
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Create new
              </a>
            </div>
          </div>

          {/* Name */}
          <div className={styles.field}>
            <FieldLabel label="Name" required styles={styles} />
            <Input
              className={styles.fieldInput}
              value={name}
              onChange={(_, d) => setName(d.value)}
              placeholder=""
            />
          </div>

          {/* Region */}
          <div className={styles.field}>
            <div className={styles.fieldLabelRow}>
              <Text className={styles.fieldLabel}>Region</Text>
              <span className={styles.fieldInfoIcon}>
                <Info16Regular />
              </span>
            </div>
            <Dropdown
              className={styles.fieldInput}
              defaultValue={region}
              defaultSelectedOptions={[region]}
            >
              <Option>(US) East US</Option>
              <Option>(US) West US 2</Option>
              <Option>(US) South Central US</Option>
              <Option>(Europe) West Europe</Option>
              <Option>(Europe) North Europe</Option>
            </Dropdown>
          </div>
        </div>

        {/* Pricing link */}
        <div className={styles.pricingLinkWrapper}>
          <a
            className={styles.pricingLink}
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            View full pricing details
          </a>
        </div>
      </div>

      <Divider />

      {/* ── Your first project ── */}
      <div>
        <Text className={styles.sectionHeading}>Your first project</Text>
        <Text className={styles.sectionDescription}>
          Foundry organizes development artifacts into projects— containers for
          managing permissions, monitoring, costs, and more. When you create a
          resource, a project is also created. This &ldquo;default&rdquo;
          project has more capabilities than projects that you create later.{" "}
          <a
            className={styles.tabDescriptionLink}
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Learn more.
          </a>
        </Text>

        <div className={styles.fieldGroup}>
          <div className={styles.field}>
            <FieldLabel label="Default project name" required styles={styles} />
            <Input
              className={styles.fieldInput}
              value={projectName}
              onChange={(_, d) => setProjectName(d.value)}
            />
          </div>
        </div>
      </div>

      <Divider />

      {/* ── Content Review Policy ── */}
      <div>
        <Text className={styles.sectionHeading}>Content Review Policy</Text>
        <Text className={styles.sectionDescription}>
          Foundry provides access to Azure OpenAI models. To detect and mitigate
          harmful use of the Azure OpenAI Service, Microsoft logs the content
          you send to the Completions and image generations APIs as well as the
          content it sends back. If content is flagged by the service&apos;s
          filters, it may be reviewed by a Microsoft full-time employee
        </Text>
        <div className={styles.policyLinkRow}>
          <a
            className={styles.policyLink}
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Learn more about how Microsoft processes, uses, and stores your data
          </a>
          <a
            className={styles.policyLink}
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Apply for modified content filters and abuse monitoring
          </a>
        </div>
      </div>
    </>
  );
}

// ─── Placeholder tabs ──────────────────────────────────────────────────────

function PlaceholderTab({
  tab,
  styles,
}: {
  tab: string;
  styles: ReturnType<typeof useStyles>;
}) {
  return (
    <Text className={styles.tabDescription}>
      Configure {tab} settings for your Foundry resource.
    </Text>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────

/** Create wizard for Azure AI Foundry (Azure OpenAI) — matches the "Create a Foundry resource" portal UX. */
export default function CreateFoundryWizard({
  onBack,
  onBackLabel = "All services",
  onAllServicesClick,
  onServiceClick,
  serviceName = "Azure OpenAI",
}: CreateFoundryWizardProps) {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();
  const [activeTab, setActiveTab] = useState<TabId>("Basics");

  const activeIndex = TABS.indexOf(activeTab);
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === TABS.length - 1;

  const handlePrevious = () => {
    if (!isFirst) setActiveTab(TABS[activeIndex - 1]);
  };
  const handleNext = () => {
    if (!isLast) setActiveTab(TABS[activeIndex + 1]);
  };

  return (
    <div className={styles.root}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumbBar}>
        <Breadcrumb aria-label="Breadcrumb" size="medium">
          <BreadcrumbItem>
            <BreadcrumbButton onClick={() => handlePageChange("home-fre")}>
              Home
            </BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton onClick={onAllServicesClick ?? onBack}>
              {onBackLabel}
            </BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton onClick={onServiceClick ?? onBack}>
              {serviceName}
            </BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton current>
              Create a Foundry resource
            </BreadcrumbButton>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>

      {/* Page header */}
      <div className={styles.pageHeader}>
        <div className={styles.pageTitleRow}>
          <Text className={styles.pageTitle}>Create a Foundry resource</Text>
          <Text className={styles.pageTitleEllipsis}>&nbsp;&hellip;</Text>
        </div>
        <Button
          appearance="subtle"
          icon={<Dismiss20Regular />}
          className={styles.closeButton}
          onClick={onBack}
          aria-label="Close"
        />
      </div>

      {/* Tab bar */}
      <div className={styles.tabBar}>
        <TabList
          selectedValue={activeTab}
          onTabSelect={(_, d) => setActiveTab(d.value as TabId)}
        >
          {TABS.map((tab) => (
            <Tab key={tab} value={tab}>
              {tab}
            </Tab>
          ))}
        </TabList>
      </div>

      {/* Scrollable form area */}
      <div className={styles.scrollArea}>
        <div className={styles.formContainer}>
          {activeTab === "Basics" && <BasicsTab styles={styles} />}
          {activeTab !== "Basics" && (
            <PlaceholderTab tab={activeTab} styles={styles} />
          )}
        </div>
      </div>

      {/* Bottom action bar */}
      <div className={styles.actionBar}>
        <Button
          appearance="secondary"
          disabled={isFirst}
          onClick={handlePrevious}
          icon={<ChevronLeft20Regular />}
        >
          Previous
        </Button>
        <Button
          appearance="secondary"
          onClick={isLast ? undefined : handleNext}
          disabled={isLast}
        >
          Next
        </Button>
        <Button
          appearance="primary"
          onClick={() => setActiveTab("Review + create")}
        >
          Review + create
        </Button>
      </div>
    </div>
  );
}
