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
  Body1,
  Subtitle2,
  Button,
} from "@fluentui/react-components";
import {
  Info16Regular,
  Dismiss16Regular,
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
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
  },
  learnMore: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    fontSize: tokens.fontSizeBase300,
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
    fontSize: tokens.fontSizeBase300,
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
  freeInfoBar: {
    marginTop: tokens.spacingVerticalXXL,
    marginBottom: tokens.spacingVerticalXXL,
  },
  readOnlyRow: {
    display: "grid",
    gridTemplateColumns: "180px 1fr",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL,
  },
  readOnlyLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
  },
  readOnlyValue: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
  readOnlyBold: {
    fontWeight: tokens.fontWeightSemibold,
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

export interface CreateStorageAccountProps {
  onClose?: () => void;
}

/** Simplified create storage account form matching Azure portal free-tier experience. */
export default function CreateStorageAccount({ onClose }: CreateStorageAccountProps) {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<string>("basics");
  const [showSimplifiedBar, setShowSimplifiedBar] = useState(true);
  const [showFreeBar, setShowFreeBar] = useState(true);

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
          <Tab value="tags">Tags</Tab>
          <Tab value="review">Review + create</Tab>
        </TabList>

        {activeTab === "basics" && (
          <>
            {showSimplifiedBar && (
              <MessageBar
                className={styles.infoBar}
                intent="info"
              >
                <MessageBarBody>
                  This is a simplified create experience specific to your free service selection.
                  Don&apos;t see what you need? Go to the{" "}
                  <Link inline href="#">standard create experience</Link>{" "}
                  for full customization of your storage account.
                </MessageBarBody>
              </MessageBar>
            )}

            <Text className={styles.description}>
              Azure Storage is a Microsoft-managed service providing cloud storage that is highly
              available, secure, durable, scalable, and redundant. Azure Storage includes Azure Blobs
              (objects), Azure Data Lake Storage Gen2, Azure Files, Azure Queues, and Azure Tables.
              The cost of your storage account depends on the usage and the options you choose below.
            </Text>
            <div className={styles.learnMore}>
              <Link href="#" inline>
                Learn more about Azure storage accounts
              </Link>
            </div>

            {/* Project details */}
            <Subtitle2 className={styles.sectionTitle}>Project details</Subtitle2>
            <Text className={styles.sectionDescription}>
              Select the subscription in which to create the new storage account. Choose a new or
              existing resource group to organize and manage your storage account together with other
              resources.
            </Text>

            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Subscription <span className={styles.requiredStar}>*</span>
              </Text>
              <Dropdown defaultValue="Azure subscription 1" defaultSelectedOptions={["sub1"]}>
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
                  <Dropdown style={{ width: "100%" }} defaultValue="Hello" defaultSelectedOptions={["hello"]}>
                    <Option value="hello">Hello</Option>
                    <Option value="default">Default</Option>
                  </Dropdown>
                  <div className={styles.createNewLink}>
                    <Link href="#">Create new</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Instance details */}
            <Divider className={styles.sectionDivider} />
            <Subtitle2 className={styles.sectionTitle}>Instance details</Subtitle2>

            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Storage account name <span className={styles.requiredStar}>*</span>{" "}
                <Info16Regular />
              </Text>
              <Input placeholder="" />
            </div>

            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Region <span className={styles.requiredStar}>*</span>{" "}
                <Info16Regular />
              </Text>
              <Dropdown defaultValue="(US) East US" defaultSelectedOptions={["eastus"]}>
                <Option value="eastus">(US) East US</Option>
                <Option value="westus">(US) West US</Option>
                <Option value="centralus">(US) Central US</Option>
              </Dropdown>
            </div>

            {/* Free tier info */}
            {showFreeBar && (
              <MessageBar
                className={styles.freeInfoBar}
                intent="info"
              >
                <MessageBarBody>
                  The combination of options below is necessary for the Azure Blob Storage free
                  service benefit.
                </MessageBarBody>
              </MessageBar>
            )}

            {/* Read-only fields */}
            <div className={styles.readOnlyRow}>
              <Text className={styles.readOnlyLabel}>
                Performance <span className={styles.requiredStar}>*</span>{" "}
                <Info16Regular />
              </Text>
              <Text className={styles.readOnlyValue}>
                <span className={styles.readOnlyBold}>Standard</span>: Recommended for most
                scenarios (general-purpose v2 account)
              </Text>
            </div>

            <div className={styles.readOnlyRow}>
              <Text className={styles.readOnlyLabel}>
                Redundancy <span className={styles.requiredStar}>*</span>{" "}
                <Info16Regular />
              </Text>
              <Text className={styles.readOnlyValue}>
                Locally-redundant storage (LRS)
              </Text>
            </div>
          </>
        )}

        {activeTab === "tags" && (
          <Text className={styles.description}>
            Tags are name/value pairs that enable you to categorize resources and view consolidated
            billing by applying the same tag to multiple resources and resource groups.
          </Text>
        )}

        {activeTab === "review" && (
          <Text className={styles.description}>
            Review your storage account configuration before creating.
          </Text>
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerButtons}>
          <Button appearance="subtle" size="medium" className={styles.greyButton}>Previous</Button>
          <Button appearance="outline" size="medium">Next</Button>
          <Button appearance="primary" size="medium">Review + create</Button>
        </div>
        <Link className={styles.feedbackLink} href="#">
          <NotepadPerson20Regular />
          Give feedback
        </Link>
      </div>
    </div>
  );
}
