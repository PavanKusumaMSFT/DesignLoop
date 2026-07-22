"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Checkbox,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuButton,
  Link,
  mergeClasses,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Add20Regular,
  ArrowSync20Regular,
  Delete20Regular,
  ArrowExport20Regular,
  FolderOpen20Regular,
  MoreHorizontal20Regular,
  Dismiss20Regular,
  ChevronDown20Regular,
  ChevronRight20Regular,
  Filter20Regular,
} from "@fluentui/react-icons";
import { AzureHeaderP1 } from "../../shared/azure-header-p1";

const useStyles = makeStyles({
  container: {
    backgroundColor: "transparent",
    minHeight: "100vh",
    padding: "0",
  },
  header: {
    padding: "8px 16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  breadcrumb: {
    fontSize: "12px",
    color: tokens.colorBrandForeground1,
    marginBottom: "4px",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  title: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  closeButton: {
    minWidth: "32px",
    height: "32px",
  },
  toolbar: {
    padding: "8px 16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    alignItems: "center",
    gap: "4px",
    flexWrap: "wrap",
  },
  infoBar: {
    padding: "8px 16px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  infoLink: {
    fontSize: "13px",
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  filterBar: {
    padding: "8px 16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  filterChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 8px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "4px",
    fontSize: "12px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  removeFilter: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  tableContainer: {
    padding: "0 16px 16px 16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    textAlign: "left",
    padding: "4px 8px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: "12px",
  },
  tableRow: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  tableCell: {
    padding: "4px 8px",
    color: tokens.colorNeutralForeground1,
    fontSize: "13px",
  },
  nameCell: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  nameLink: {
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  statusRunning: {
    color: tokens.colorPaletteGreenForeground1,
  },
  linkCell: {
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  footer: {
    padding: "8px 16px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  pageButton: {
    minWidth: "32px",
    height: "32px",
    padding: "0",
  },
  serviceIcon: {
    width: "24px",
    height: "24px",
  },
  subtitleText: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  infoText: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
  },
  filterDismissIcon: {
    fontSize: "12px",
  },
  addFilterLink: {
    fontSize: "12px",
    marginLeft: "8px",
  },
  checkboxColumn: {
    width: "40px",
  },
  chevronIcon: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground3,
  },
  feedbackLink: {
    fontSize: "12px",
  },
});

const appServicesData = [
  {
    name: "AzureWebSiteApp",
    status: "Running",
    location: "Central US",
    pricingTier: "Premium V2",
    appServicePlan: "ASP-azurelab3-a390",
    subscription: "Traffic manager Preview",
    appType: "Web App",
  },
  {
    name: "csharpv1project",
    status: "Running",
    location: "East US",
    pricingTier: "Free",
    appServicePlan: "AshwinTestPolicy",
    subscription: "Traffic manager Preview",
    appType: "Web App",
  },
  {
    name: "democontapp",
    status: "Running",
    location: "West US",
    pricingTier: "Free",
    appServicePlan: "TestDevPlanName",
    subscription: "Traffic manager Preview",
    appType: "Web App",
  },
  {
    name: "democontapp2",
    status: "Running",
    location: "West US",
    pricingTier: "Free",
    appServicePlan: "TestDevPlanName",
    subscription: "Traffic manager Preview",
    appType: "Web App",
  },
  {
    name: "demowebapp4",
    status: "Running",
    location: "West US",
    pricingTier: "Free",
    appServicePlan: "TestDevPlanName",
    subscription: "Traffic manager Preview",
    appType: "Web App",
  },
  {
    name: "demowebappfinal",
    status: "Running",
    location: "West US",
    pricingTier: "Free",
    appServicePlan: "TestDevPlanName",
    subscription: "Traffic manager Preview",
    appType: "Web App",
  },
  {
    name: "angelformstn1",
    status: "Running",
    location: "Canada Central",
    pricingTier: "Premium V4",
    appServicePlan: "angelformstn1",
    subscription: "Traffic manager Preview",
    appType: "Web App",
  },
  {
    name: "angelformstn2",
    status: "Running",
    location: "Canada Central",
    pricingTier: "Premium V4",
    appServicePlan: "angelformstn2",
    subscription: "Traffic manager Preview",
    appType: "Web App",
  },
  {
    name: "angelformstn3",
    status: "Running",
    location: "Canada Central",
    pricingTier: "Premium V4",
    appServicePlan: "angelformstn3",
    subscription: "Traffic manager Preview",
    appType: "Web App",
  },
  {
    name: "app-web-onboardcoding",
    status: "Running",
    location: "East US 2",
    pricingTier: "Premium V3",
    appServicePlan: "plan-onboardcoding",
    subscription: "Empty Supportability - Test and e...",
    appType: "Web App",
  },
  {
    name: "appAzureDevOpsWebControlsIn",
    status: "Running",
    location: "West Central US",
    pricingTier: "Standard",
    appServicePlan: "appAzureDevOpsControlsIn",
    subscription: "TEST - Azure Mobile App 1",
    appType: "Web App",
  },
  {
    name: "appAzureDevOpsWebsiteLn2",
    status: "Running",
    location: "East US 2",
    pricingTier: "Standard",
    appServicePlan: "appAzureWebsiteLn2",
    subscription: "TEST - Azure Mobile App 1",
    appType: "Web App",
  },
  {
    name: "appAzureDevOpsWebsiteLn3-GerryaMooRealtyAgent",
    status: "Running",
    location: "West US 2",
    pricingTier: "Standard",
    appServicePlan: "appAzureWebsiteLn2",
    subscription: "TEST - Azure Mobile App 1",
    appType: "Web App",
  },
  {
    name: "appAzureWebsiteCentralsIn",
    status: "Running",
    location: "West Central US",
    pricingTier: "Standard",
    appServicePlan: "appAzureWebsiteCentralsIn",
    subscription: "TEST - Azure Mobile App 1",
    appType: "Web App",
  },
  {
    name: "appAzureWebsiteCentralsInMiniRealtyAgent",
    status: "Running",
    location: "West Central US",
    pricingTier: "Standard",
    appServicePlan: "appAzureWebsiteCentralsIn",
    subscription: "TEST - Azure Mobile App 1",
    appType: "Web App",
  },
  {
    name: "appcatAzureMobileApp1",
    status: "Running",
    location: "Canada Central",
    pricingTier: "Standard",
    appServicePlan: "ASP-apicet-a74c",
    subscription: "Traffic manager Preview",
    appType: "Web App",
  },
  {
    name: "arm-template-webapp",
    status: "Running",
    location: "North Europe",
    pricingTier: "Standard",
    appServicePlan: "arm-template-f9bd",
    subscription: "Traffic manager Preview",
    appType: "Web App",
  },
  {
    name: "ATOMapsDeployment",
    status: "Running",
    location: "West US",
    pricingTier: "Premium V3",
    appServicePlan: "MyAppDeploymentPlan",
    subscription: "Traffic manager Preview",
    appType: "Web App",
  },
  {
    name: "ATOMapsDeploymentPlanSer",
    status: "Running",
    location: "East US",
    pricingTier: "Premium V3",
    appServicePlan: "MyAppDeploymentPlan",
    subscription: "Traffic manager Preview",
    appType: "Web App",
  },
  {
    name: "bamboo-island",
    status: "Running",
    location: "West US",
    pricingTier: "Shared",
    appServicePlan: "West_US_Free",
    subscription: "TEST - Saas Portal Dogfood",
    appType: "Web App",
  },
];

export const AppSerControlOld = () => {
  const styles = useStyles();
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(new Set(appServicesData.map((_, index) => index)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedRows(newSelected);
  };

  return (
    <>
      <AzureHeaderP1 activeLink="Home" viewMode="list" />
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.breadcrumb}>Home &gt;</div>
            <div className={styles.titleRow}>
              <img
                src="/icons/App-Services.svg"
                alt="App Services"
                className={styles.serviceIcon}
              />
              <h1 className={styles.title}>App Services</h1>
            </div>
            <Text className={styles.subtitleText}>
              Microsoft.Web/sites/read,write
            </Text>
          </div>
          <Button
            appearance="subtle"
            icon={<Dismiss20Regular />}
            className={styles.closeButton}
          />
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <Menu>
            <MenuTrigger>
              <Button appearance="primary" icon={<Add20Regular />}>
                Create
              </Button>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem>Web App</MenuItem>
                <MenuItem>Function App</MenuItem>
                <MenuItem>Static Web App</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
          <Button appearance="subtle" icon={<ArrowSync20Regular />}>
            Manage Deleted Apps
          </Button>
          <Menu>
            <MenuTrigger>
              <MenuButton appearance="subtle" icon={<ChevronDown20Regular />}>
                Manage view
              </MenuButton>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem>Columns</MenuItem>
                <MenuItem>Filter</MenuItem>
                <MenuItem>Group by</MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
          <Button appearance="subtle" icon={<ArrowSync20Regular />}>
            Refresh
          </Button>
          <Button appearance="subtle" icon={<ArrowExport20Regular />}>
            Export to CSV
          </Button>
          <Button appearance="subtle" icon={<FolderOpen20Regular />}>
            Open query
          </Button>
          <Button appearance="subtle" icon={<MoreHorizontal20Regular />}>
            Assign tags
          </Button>
          <Button appearance="subtle" icon={<MoreHorizontal20Regular />}>
            Start
          </Button>
          <Button appearance="subtle" icon={<MoreHorizontal20Regular />}>
            Restart
          </Button>
          <Button appearance="subtle" icon={<MoreHorizontal20Regular />}>
            Stop
          </Button>
          <Button appearance="subtle" icon={<Delete20Regular />}>
            Delete
          </Button>
        </div>

        {/* Info Bar */}
        <div className={styles.infoBar}>
          <Text className={styles.infoText}>
            Try our existing a new version of Browse experience.
          </Text>
          <Link className={styles.infoLink}>
            Click here to access the old experience.
          </Link>
        </div>

        {/* Filter Bar */}
        <div className={styles.filterBar}>
          <Button appearance="subtle" icon={<Filter20Regular />} size="small">
            Filter for any field...
          </Button>
          <div className={styles.filterChip}>
            <Text>Subscription equals: all</Text>
            <div className={styles.removeFilter}>
              <Dismiss20Regular className={styles.filterDismissIcon} />
            </div>
          </div>
          <div className={styles.filterChip}>
            <Text>Resource Group equals: all</Text>
            <div className={styles.removeFilter}>
              <Dismiss20Regular className={styles.filterDismissIcon} />
            </div>
          </div>
          <div className={styles.filterChip}>
            <Text>Type equals: App Service</Text>
            <div className={styles.removeFilter}>
              <Dismiss20Regular className={styles.filterDismissIcon} />
            </div>
          </div>
          <div className={styles.filterChip}>
            <Text>Location equals: all</Text>
            <div className={styles.removeFilter}>
              <Dismiss20Regular className={styles.filterDismissIcon} />
            </div>
          </div>
          <Link className={styles.addFilterLink}>Add filter</Link>
        </div>

        {/* Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th
                  className={mergeClasses(
                    styles.tableHeader,
                    styles.checkboxColumn,
                  )}
                >
                  <Checkbox
                    checked={selectedRows.size === appServicesData.length}
                    onChange={(_, data) =>
                      handleSelectAll(data.checked === true)
                    }
                  />
                </th>
                <th className={styles.tableHeader}>Name</th>
                <th className={styles.tableHeader}>Status</th>
                <th className={styles.tableHeader}>Location</th>
                <th className={styles.tableHeader}>Pricing Tier</th>
                <th className={styles.tableHeader}>App Service Plan</th>
                <th className={styles.tableHeader}>Subscription</th>
                <th className={styles.tableHeader}>App Type</th>
              </tr>
            </thead>
            <tbody>
              {appServicesData.slice(0, 20).map((app, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <Checkbox
                      checked={selectedRows.has(index)}
                      onChange={(_, data) =>
                        handleSelectRow(index, data.checked === true)
                      }
                    />
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.nameCell}>
                      <ChevronRight20Regular className={styles.chevronIcon} />
                      <Text className={styles.nameLink}>{app.name}</Text>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <Text className={styles.statusRunning}>{app.status}</Text>
                  </td>
                  <td className={styles.tableCell}>{app.location}</td>
                  <td className={styles.tableCell}>{app.pricingTier}</td>
                  <td className={styles.tableCell}>
                    <Text className={styles.linkCell}>
                      {app.appServicePlan}
                    </Text>
                  </td>
                  <td className={styles.tableCell}>{app.subscription}</td>
                  <td className={styles.tableCell}>{app.appType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Text>Showing 1 - 20 of 83 Display count: auto</Text>
          <div className={styles.pagination}>
            <Button
              appearance="subtle"
              size="small"
              className={styles.pageButton}
            >
              &lt;
            </Button>
            <Button
              appearance="subtle"
              size="small"
              className={styles.pageButton}
            >
              1
            </Button>
            <Button
              appearance="subtle"
              size="small"
              className={styles.pageButton}
            >
              2
            </Button>
            <Button
              appearance="subtle"
              size="small"
              className={styles.pageButton}
            >
              3
            </Button>
            <Button
              appearance="subtle"
              size="small"
              className={styles.pageButton}
            >
              4
            </Button>
            <Button
              appearance="subtle"
              size="small"
              className={styles.pageButton}
            >
              &gt;
            </Button>
          </div>
          <Link className={styles.feedbackLink}>Give feedback</Link>
        </div>
      </div>
    </>
  );
};

export default AppSerControlOld;
