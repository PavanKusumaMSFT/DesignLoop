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
  Button,
  MessageBar,
  MessageBarBody,
  MessageBarActions,
  Divider,
  Subtitle2,
  Radio,
  RadioGroup,
} from "@fluentui/react-components";
import {
  Info16Regular,
  CheckmarkCircle16Filled,
  ErrorCircle16Filled,
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
  tabWithError: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
  },
  description: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalM,
    display: "block",
  },
  successBar: {
    marginBottom: tokens.spacingVerticalM,
  },
  hyperscaleBar: {
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
  indentedRow: {
    position: "relative",
  },
  indentLine: {
    position: "absolute",
    left: tokens.spacingHorizontalM,
    top: "0",
    height: "50%",
    width: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
  },
  indentBend: {
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
  sectionDivider: {
    marginTop: tokens.spacingVerticalXXL,
    marginBottom: tokens.spacingVerticalL,
  },
  errorText: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorPaletteRedForeground1,
    marginTop: tokens.spacingVerticalXS,
  },
  disabledText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
  },
  configureLink: {
    fontSize: tokens.fontSizeBase200,
    marginTop: tokens.spacingVerticalXXS,
  },
  computeValue: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    paddingTop: tokens.spacingVerticalS,
  },
  behaviorRow: {
    display: "grid",
    gridTemplateColumns: "240px 1fr",
    alignItems: "start",
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL,
  },
  behaviorLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    paddingTop: tokens.spacingVerticalXS,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
  },
  radioLabel: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
  },
  radioDescription: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
    marginTop: tokens.spacingVerticalXXS,
    marginBottom: tokens.spacingVerticalM,
  },
  backupDescription: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalM,
    display: "block",
  },
  backupNote: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalL,
    display: "block",
  },
  backupLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    marginBottom: tokens.spacingVerticalXXL,
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
});

export interface CreateSqlDatabaseProps {
  onClose?: () => void;
}

/** Simplified create SQL Database form matching Azure portal free-tier experience. */
export default function CreateSqlDatabase({ onClose }: CreateSqlDatabaseProps) {
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
          <Tab value="networking">Networking</Tab>
          <Tab value="security">Security</Tab>
          <Tab value="additional">Additional settings</Tab>
          <Tab value="tags">Tags</Tab>
          <Tab value="review">Review + create</Tab>
        </TabList>

        {activeTab === "basics" && (
          <>
            <Text className={styles.description}>
              Create a SQL database with your preferred configurations. Complete the Basics tab then
              go to Review + Create to provision with smart defaults, or visit each tab to customize.{" "}
              <Link inline href="#">Learn more</Link>
            </Text>

            {/* Free offer banner */}
            <MessageBar
              className={styles.successBar}
              intent="success"
            >
              <MessageBarBody>
                Free offer applied! You get 100,000 vCore seconds, 32GB of data, and 32GB of backup
                storage free per month for the lifetime of your subscription.{" "}
                <Link inline href="#">Learn more</Link>
              </MessageBarBody>
              <MessageBarActions>
                <Button appearance="outline" size="small">Remove offer</Button>
              </MessageBarActions>
            </MessageBar>

            {/* Hyperscale info */}
            <MessageBar
              className={styles.hyperscaleBar}
              intent="info"
            >
              <MessageBarBody>
                SQL Database Hyperscale: Low price, high scalability, and best feature set.{" "}
                <Link inline href="#">Learn more</Link>
              </MessageBarBody>
            </MessageBar>

            {/* Project details */}
            <Subtitle2 className={styles.sectionTitle}>Project details</Subtitle2>
            <Text className={styles.sectionDescription}>
              Select the subscription to manage deployed resources and costs. Use resource groups
              like folders to organize and manage all your resources.
            </Text>

            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Subscription <span className={styles.requiredStar}>*</span>{" "}
                <Info16Regular />
              </Text>
              <Dropdown defaultValue="Azure subscription 1" defaultSelectedOptions={["sub1"]}>
                <Option value="sub1">Azure subscription 1</Option>
              </Dropdown>
            </div>

            <div className={styles.indentedRow}>
              <div className={styles.indentLine} />
              <div className={styles.indentBend} />
              <div className={styles.formRow}>
                <Text className={styles.indentedFormLabel}>
                  Resource group <span className={styles.requiredStar}>*</span>{" "}
                  <Info16Regular />
                </Text>
                <div>
                  <Dropdown style={{ width: "100%" }} placeholder="Select a resource group">
                    <Option value="hello">Hello</Option>
                    <Option value="default">Default</Option>
                  </Dropdown>
                  <div className={styles.createNewLink}>
                    <Link href="#">Create new</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Database details */}
            <Divider className={styles.sectionDivider} />
            <Subtitle2 className={styles.sectionTitle}>Database details</Subtitle2>
            <Text className={styles.sectionDescription}>
              Enter required settings for this database, including picking a logical server and
              configuring the compute and storage resources
            </Text>

            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Database name <span className={styles.requiredStar}>*</span>
              </Text>
              <Input placeholder="Enter database name" />
            </div>

            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Server <span className={styles.requiredStar}>*</span>{" "}
                <Info16Regular />
              </Text>
              <div>
                <Dropdown style={{ width: "100%" }} placeholder="Select a server">
                  <Option value="server1">my-sql-server</Option>
                </Dropdown>
                <div className={styles.createNewLink}>
                  <Link href="#">Create new</Link>
                </div>
                <Text className={styles.errorText}>
                  <ErrorCircle16Filled primaryFill={tokens.colorPaletteRedForeground1} />
                  The value must not be empty.
                </Text>
              </div>
            </div>

            <div className={styles.formRow}>
              <Text className={styles.formLabel}>
                Compute + storage <span className={styles.requiredStar}>*</span>{" "}
                <Info16Regular />
              </Text>
              <div className={styles.computeValue}>
                <Text className={styles.disabledText}>Please select a server first.</Text>
                <div className={styles.configureLink}>
                  <Link href="#">Configure database</Link>
                </div>
              </div>
            </div>

            {/* Behavior section */}
            <Divider className={styles.sectionDivider} />
            <Subtitle2 className={styles.sectionTitle}>
              Behavior when free offer limit reached
            </Subtitle2>

            <div className={styles.behaviorRow}>
              <Text className={styles.behaviorLabel}>
                Behavior when free offer limit reached{" "}
                <Info16Regular />
              </Text>
              <RadioGroup defaultValue="auto-pause">
                <Radio value="auto-pause" label={
                  <>
                    <Text className={styles.radioLabel}>Auto-pause the database until next month</Text>
                    <Text className={styles.radioDescription}>
                      When free offer limit is reached, the database will not be accessible until
                      the beginning of next calendar month when free amount is renewed.
                      There will be no additional charges.
                    </Text>
                  </>
                } />
                <Radio value="continue" label={
                  <>
                    <Text className={styles.radioLabel}>Continue using database for additional charges</Text>
                    <Text className={styles.radioDescription}>
                      Database continues to be accessible after free offer limit is reached.
                      Additional usage beyond the free offer amount for that month will be
                      charged at general purpose serverless tier rates. The free amount will be
                      renewed at the beginning of the next calendar month.
                    </Text>
                  </>
                } />
              </RadioGroup>
            </div>

            {/* Backup storage redundancy */}
            <Divider className={styles.sectionDivider} />
            <Subtitle2 className={styles.sectionTitle}>
              Backup storage redundancy
            </Subtitle2>
            <Text className={styles.backupDescription}>
              Choose how your PITR and LTR backups are replicated. Geo restore or ability to recover from regional outage is only
              available when geo-redundant storage is selected.
            </Text>
            <Text className={styles.backupNote}>
              The default backup storage redundancy setting is taken from the setting of the source.
            </Text>
            <Text className={styles.backupLabel}>
              Backup storage redundancy{" "}
              <Info16Regular />
            </Text>
          </>
        )}

        {activeTab === "networking" && (
          <Text className={styles.description}>
            Configure network access and connectivity for your SQL database.
          </Text>
        )}

        {activeTab === "security" && (
          <Text className={styles.description}>
            Configure security settings for your SQL database.
          </Text>
        )}

        {activeTab === "additional" && (
          <Text className={styles.description}>
            Configure additional settings including data source, collation, and maintenance window.
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
            Review your SQL database configuration before creating.
          </Text>
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.footerButtons}>
          <Button appearance="primary" size="medium">Review + create</Button>
          <Button appearance="outline" size="medium">Next : Networking &gt;</Button>
        </div>
        <Link className={styles.feedbackLink} href="#">
          <NotepadPerson20Regular />
          Give feedback
        </Link>
      </div>
    </div>
  );
}
