/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  TabList,
  Tab,
  Field,
  Input,
  Dropdown,
  Option,
  Link,
  MessageBar,
  MessageBarBody,
  Divider,
  Subtitle2,
  Button,
  Switch,
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
  infoBar: {
    marginBottom: tokens.spacingVerticalL,
  },
  description: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalS,
    display: "block",
  },
  learnMore: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    fontSize: tokens.fontSizeBase200,
    marginBottom: tokens.spacingVerticalXXL,
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
  nameSuffix: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    textAlign: "right" as const,
    display: "block",
    marginTop: tokens.spacingVerticalXXS,
  },
  switchRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalL,
    paddingLeft: "196px",
  },
  switchLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  regionInfoBar: {
    marginTop: tokens.spacingVerticalXS,
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

export interface CreateWebAppProps {
  onClose?: () => void;
}

/** Create Web App form matching Azure portal experience with Basics tab. */
export default function CreateWebApp({ onClose }: CreateWebAppProps) {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<string>("basics");
  const [hostnameOn, setHostnameOn] = useState(true);

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
          <Tab value="database">Database</Tab>
          <Tab value="deployment">Deployment</Tab>
          <Tab value="networking">Networking</Tab>
          <Tab value="monitor">Monitor + secure</Tab>
          <Tab value="tags">Tags</Tab>
          <Tab value="review">Review + create</Tab>
        </TabList>

        {activeTab === "basics" && (
          <>
            <MessageBar
              className={styles.infoBar}
              intent="info"
            >
              <MessageBarBody>
                Try Managed Instances (preview) on Azure App Service: a new option that delivers the
                platform benefits you rely on today, plus added features and flexibility to help you
                modernize applications seamlessly{" "}
                <Link inline href="#">Learn More</Link>
              </MessageBarBody>
            </MessageBar>

            <Text className={styles.description}>
              App Service Web Apps lets you quickly build, deploy, and scale enterprise-grade web,
              mobile, and API apps running on any platform. Meet rigorous performance, scalability,
              security and compliance requirements while using a fully managed platform to perform
              infrastructure maintenance.{" "}
              <Link inline href="#">Learn more</Link>
            </Text>

            {/* Project Details */}
            <Subtitle2 className={styles.sectionTitle}>Project Details</Subtitle2>
            <Text className={styles.sectionDescription}>
              Select a subscription to manage deployed resources and costs. Use resource groups like
              folders to organize and manage all your resources.
            </Text>

            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Subscription <span className={styles.requiredStar}>*</span>{" "}
                <Info16Regular />
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
                  Resource Group <span className={styles.requiredStar}>*</span>{" "}
                  <Info16Regular />
                </Text>
                <div className={styles.dropdownWrapper}>
                  <Dropdown
                    style={{ width: "100%" }}
                    defaultValue="(New) Resource group"
                    defaultSelectedOptions={["new"]}
                  >
                    <Option value="new">(New) Resource group</Option>
                    <Option value="default">Default</Option>
                  </Dropdown>
                  <div className={styles.createNewLink}>
                    <Link href="#">Create new</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Instance Details */}
            <Divider className={styles.sectionDivider} />
            <Subtitle2 className={styles.sectionTitle}>Instance Details</Subtitle2>

            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Name
              </Text>
              <div>
                <Input style={{ width: "100%" }} placeholder="Web App name" />
                <Text className={styles.nameSuffix}>.azurewebsites.net</Text>
              </div>
            </div>

            <div className={styles.switchRow}>
              <Switch
                checked={hostnameOn}
                onChange={(_, data) => setHostnameOn(data.checked)}
              />
              <Text className={styles.switchLabel}>
                Secure unique default hostname on.{" "}
                <Link inline href="#">More about this update</Link>
              </Text>
            </div>

            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Publish <span className={styles.requiredStar}>*</span>
              </Text>
              <RadioGroup defaultValue="code" layout="horizontal">
                <Radio value="code" label="Code" />
                <Radio value="container" label="Container" />
              </RadioGroup>
            </div>

            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Runtime stack <span className={styles.requiredStar}>*</span>
              </Text>
              <Dropdown
                style={{ width: "100%" }}
                placeholder="Select a runtime stack"
              >
                <Option>.NET 8 (LTS)</Option>
                <Option>.NET 9</Option>
                <Option>Node 20 LTS</Option>
                <Option>Python 3.12</Option>
                <Option>Java 21</Option>
                <Option>PHP 8.3</Option>
              </Dropdown>
            </div>

            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Operating System
              </Text>
              <RadioGroup defaultValue="linux" layout="horizontal">
                <Radio value="linux" label="Linux" />
                <Radio value="windows" label="Windows" />
              </RadioGroup>
            </div>

            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Region <span className={styles.requiredStar}>*</span>
              </Text>
              <div style={{ minWidth: 0 }}>
                <Dropdown
                  style={{ width: "100%" }}
                  defaultValue="Canada Central"
                  defaultSelectedOptions={["canadacentral"]}
                >
                  <Option value="canadacentral">Canada Central</Option>
                  <Option value="eastus">East US</Option>
                  <Option value="westus">West US</Option>
                  <Option value="westeurope">West Europe</Option>
                </Dropdown>
                <MessageBar
                  className={styles.regionInfoBar}
                  intent="info"
                >
                  <MessageBarBody>
                    Not finding your App Service Plan? Try a different region or select your App
                    Service Environment.
                  </MessageBarBody>
                </MessageBar>
              </div>
            </div>
          </>
        )}

        {activeTab === "database" && (
          <Text className={styles.description}>
            Configure database settings for your web app.
          </Text>
        )}

        {activeTab === "deployment" && (
          <Text className={styles.description}>
            Configure deployment settings for your web app.
          </Text>
        )}

        {activeTab === "networking" && (
          <Text className={styles.description}>
            Configure networking settings for your web app.
          </Text>
        )}

        {activeTab === "monitor" && (
          <Text className={styles.description}>
            Configure monitoring and security settings for your web app.
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
            Review your web app configuration before creating.
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
          <Button appearance="outline" size="medium">Next : Database &gt;</Button>
        </div>
        <Link className={styles.feedbackLink} href="#">
          <NotepadPerson20Regular />
          Give feedback
        </Link>
      </div>
    </div>
  );
}
