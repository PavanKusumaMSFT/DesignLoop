"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  TabList,
  Tab,
  Input,
  Dropdown,
  Option,
  Link,
  Divider,
  Subtitle2,
  Button,
  Checkbox,
  Radio,
  RadioGroup,
} from "@fluentui/react-components";
import {
  Info16Regular,
  NotepadPerson20Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  content: {
    maxWidth: "800px",
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: "80px",
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  tabList: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  description: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalXXL,
    display: "block",
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalXS,
    display: "block",
  },
  sectionDescription: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalL,
    display: "block",
  },
  projectDetailsFields: {
    position: "relative",
  },
  connectorLine: {
    position: "absolute",
    left: tokens.spacingHorizontalM,
    top: "0",
    height: "50%",
    width: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
  },
  connectorBend: {
    position: "absolute",
    left: tokens.spacingHorizontalM,
    top: "50%",
    width: tokens.spacingHorizontalM,
    height: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
  },
  indentedFormLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    paddingTop: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalXXL,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "180px 1fr",
    alignItems: "start",
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalM,
  },
  formLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    paddingTop: tokens.spacingVerticalS,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
  },
  requiredStar: {
    color: tokens.colorPaletteRedForeground1,
  },
  createNewLink: {
    fontSize: tokens.fontSizeBase200,
    marginTop: tokens.spacingVerticalXXS,
  },
  dropdownWrapper: {
    "& .fui-Dropdown": {
      width: "100%",
    },
    "& button[role='combobox']": {
      width: "100%",
    },
  },
  sectionDivider: {
    marginTop: tokens.spacingVerticalXXL,
    marginBottom: tokens.spacingVerticalL,
  },
  checkboxRow: {
    display: "grid",
    gridTemplateColumns: "180px 1fr",
    alignItems: "start",
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalM,
  },
  checkboxContent: {
    display: "flex",
    flexDirection: "column",
  },
  checkboxDescription: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    paddingLeft: "30px",
    display: "block",
  },
  radioDescription: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    paddingLeft: "26px",
    display: "block",
  },
  footer: {
    position: "fixed",
    bottom: "0",
    left: "0",
    right: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    zIndex: 100,
  },
  footerButtons: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  feedbackLink: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
  },
  greyButton: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground3,
    border: "none",
    cursor: "default",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
      color: tokens.colorNeutralForeground3,
    },
  },
});

export interface CreateContainerAppProps {
  onClose?: () => void;
}

/** Create Container App form matching Azure portal experience. */
export default function CreateContainerApp({ onClose }: CreateContainerAppProps) {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<string>("basics");

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <TabList
          className={styles.tabList}
          selectedValue={activeTab}
          onTabSelect={(_, data) => setActiveTab(data.value as string)}
          size="medium"
        >
          <Tab value="basics">Basics</Tab>
          <Tab value="container">Container</Tab>
          <Tab value="ingress">Ingress</Tab>
          <Tab value="tags">Tags</Tab>
          <Tab value="review">Review + create</Tab>
        </TabList>

        {activeTab === "basics" && (
          <>
            <Text className={styles.description}>
              Create a containerized app and run it on a serverless platform—without managing cloud
              infrastructure.{" "}
              <Link inline href="#">Quickstart guide</Link>
            </Text>

            {/* Project details */}
            <Subtitle2 className={styles.sectionTitle}>Project details</Subtitle2>
            <Text className={styles.sectionDescription}>
              Select a subscription to manage resource creation and costs, and a resource group to
              organize all your resources for this deployment.
            </Text>

            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Subscription <span className={styles.requiredStar}>*</span>
              </Text>
              <Dropdown
                style={{ width: "100%" }}
                defaultValue="Azure subscription 1"
                defaultSelectedOptions={["sub1"]}
              >
                <Option value="sub1">Azure subscription 1</Option>
              </Dropdown>
            </div>

            <div className={styles.projectDetailsFields}>
              <div className={styles.connectorLine} />
              <div className={styles.connectorBend} />
              <div className={styles.formRow}>
                <Text className={styles.indentedFormLabel}>
                  Resource group <span className={styles.requiredStar}>*</span>
                </Text>
                <div className={styles.dropdownWrapper}>
                  <Dropdown
                    style={{ width: "100%" }}
                    defaultValue="Hello"
                    defaultSelectedOptions={["hello"]}
                  >
                    <Option value="hello">Hello</Option>
                    <Option value="default">Default</Option>
                  </Dropdown>
                  <div className={styles.createNewLink}>
                    <Link href="#">Create new resource group</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Container app name */}
            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Container app name <span className={styles.requiredStar}>*</span>
              </Text>
              <Input style={{ width: "100%" }} />
            </div>

            {/* Optimize for Azure Functions */}
            <div className={styles.checkboxRow}>
              <Text className={styles.formLabel}>
                Optimize for Azure Functions
              </Text>
              <div className={styles.checkboxContent}>
                <Checkbox
                  label="Built-in support and autoscaling for Azure Functions (requires image compatible with Functions)."
                />
                <Text className={styles.checkboxDescription}>
                  <Link inline href="#">How to run functions with your container app</Link>
                </Text>
              </div>
            </div>

            {/* Deployment source */}
            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Deployment source <span className={styles.requiredStar}>*</span>
              </Text>
              <RadioGroup defaultValue="container-image">
                <Radio
                  value="container-image"
                  label="Container image"
                />
                <Text className={styles.radioDescription}>
                  Bring your own container registry or build a container from a Dockerfile.
                </Text>
                <Radio
                  value="source-code"
                  label="Source code or artifact"
                />
                <Text className={styles.radioDescription}>
                  Build and deploy your code without using a Dockerfile.
                </Text>
              </RadioGroup>
            </div>

            {/* Container Apps environment */}
            <Divider className={styles.sectionDivider} />
            <Subtitle2 className={styles.sectionTitle}>Container Apps environment</Subtitle2>
            <Text className={styles.sectionDescription}>
              An environment is a secure boundary around a group of container apps.{" "}
              <Link inline href="#">Container Apps Pricing</Link>
            </Text>

            {/* Show environments in all regions */}
            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Show environments in all regions{" "}
                <Info16Regular />
              </Text>
              <Checkbox />
            </div>

            {/* Region */}
            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Region <span className={styles.requiredStar}>*</span>
              </Text>
              <Dropdown
                style={{ width: "100%" }}
                defaultValue="West US 2"
                defaultSelectedOptions={["westus2"]}
              >
                <Option value="westus2">West US 2</Option>
                <Option value="eastus">East US</Option>
                <Option value="centralus">Central US</Option>
              </Dropdown>
            </div>

            {/* Container Apps environment dropdown */}
            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Container Apps environment <span className={styles.requiredStar}>*</span>
              </Text>
              <div className={styles.dropdownWrapper}>
                <Dropdown
                  style={{ width: "100%" }}
                  defaultValue="(new) managedEnvironment-Hello-8011 (Hello)"
                  defaultSelectedOptions={["new"]}
                >
                  <Option value="new">(new) managedEnvironment-Hello-8011 (Hello)</Option>
                </Dropdown>
                <div className={styles.createNewLink}>
                  <Link href="#">Create new environment</Link>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "container" && (
          <Text className={styles.description}>
            Configure container settings for your app.
          </Text>
        )}

        {activeTab === "ingress" && (
          <Text className={styles.description}>
            Configure ingress settings for your container app.
          </Text>
        )}

        {activeTab === "tags" && (
          <Text className={styles.description}>
            Tags are name/value pairs that enable you to categorize resources and view consolidated
            billing by applying the same tag to multiple resources and resource groups.
          </Text>
        )}

        {activeTab === "review" && (
          <Text className={styles.description}>
            Review your container app configuration before creating.
          </Text>
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerButtons}>
          <Button appearance="primary" size="medium">Review + create</Button>
          <Button appearance="subtle" size="medium" className={styles.greyButton}>
            {"< Previous"}
          </Button>
          <Button appearance="outline" size="medium">Next : Container &gt;</Button>
        </div>
        <Link className={styles.feedbackLink} href="#">
          <NotepadPerson20Regular />
          Give feedback
        </Link>
      </div>
    </div>
  );
}
