"use client";
import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  mergeClasses,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Add24Regular,
  ChevronRight24Regular,
  Database24Regular,
  Server24Regular,
  Shield24Regular,
  Globe24Regular,
  Apps24Regular,
  Alert24Regular,
  ChartMultiple24Regular,
  Lightbulb24Regular,
  Grid24Regular,
} from "@fluentui/react-icons";

interface HpControlOldProps {
  variant?: "startup" | "returning";
}

const useStyles = makeStyles({
  container: {
    backgroundColor: "transparent",
    padding: "32px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  section: {
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
    display: "block",
  },
  azureServicesGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "24px",
    paddingBottom: "8px",
  },
  serviceItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    width: "80px",
    flexShrink: 0,
    cursor: "pointer",
    padding: "8px",
    borderRadius: "4px",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1,
    },
  },
  serviceIcon: {
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    color: tokens.colorBrandForeground1,
  },
  serviceLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground1,
    textAlign: "center",
    lineHeight: "1.2",
  },
  tabs: {
    display: "flex",
    gap: "16px",
    marginBottom: "16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tab: {
    padding: "8px 0",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s",
    "&:hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  tabActive: {
    color: tokens.colorBrandForeground1,
    borderBottomColor: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  resourcesTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    textAlign: "left",
    padding: "8px 8px",
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tableRow: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1,
    },
  },
  tableCell: {
    padding: "8px 8px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
  },
  resourceName: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  seeAllLink: {
    color: tokens.colorBrandForeground1,
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "16px",
    display: "inline-block",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  navigateGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
  },
  navigateCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    width: "calc(25% - 12px)",
    minWidth: "200px",
    flexShrink: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1,
    },
  },
  navigateIcon: {
    fontSize: "24px",
    color: tokens.colorBrandForeground1,
  },
  navigateLabel: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  toolsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
  },
  toolCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "16px",
    width: "calc(25% - 12px)",
    minWidth: "200px",
    flexShrink: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1,
    },
  },
  toolIcon: {
    width: "32px",
    height: "32px",
    flexShrink: 0,
  },
  toolTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    marginBottom: "4px",
    display: "block",
  },
  toolDescription: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.4",
    display: "block",
  },
  usefulLinksGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "32px",
    marginTop: "16px",
  },
  linkColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "calc(25% - 24px)",
    minWidth: "180px",
    flexShrink: 0,
  },
  linkItem: {
    color: tokens.colorBrandForeground1,
    fontSize: "14px",
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  mobileAppColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "calc(25% - 24px)",
    minWidth: "180px",
    flexShrink: 0,
  },
  appStoreButtons: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  appStoreButton: {
    cursor: "pointer",
    transition: "opacity 0.2s",
    "&:hover": {
      opacity: 0.8,
    },
  },
  mobileAppTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
  },
  appStoreImage: {
    width: "120px",
    height: "auto",
  },
});

export const HpControlOld = ({ variant = "returning" }: HpControlOldProps) => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState("Recent");

  // Startup version has simpler services
  const azureServicesStartup = [
    { icon: <Add24Regular />, label: "Create a resource" },
    { icon: "/icons/App-Services.svg", label: "App Services" },
    { icon: "/icons/Storage.svg", label: "Storage accounts" },
    { icon: "/icons/virtual-machine.svg", label: "Virtual machines" },
    {
      icon: "/icons/Virtual-Networks.svg",
      label: "Virtual machine scale sets",
    },
    { icon: "/icons/Azure-Arc.svg", label: "Microsoft Entra ID" },
    { icon: "/icons/Network-Security-Hub.svg", label: "Change Analysis" },
    { icon: "/icons/backup.svg", label: "Network security groups" },
    { icon: <ChevronRight24Regular />, label: "More services" },
  ];

  // Returning user version has more complex services
  const azureServicesReturning = [
    { icon: <Add24Regular />, label: "Create a resource" },
    { icon: "/icons/Users.svg", label: "Microsoft Entra ID" },
    { icon: "/icons/Azure-Migrate.svg", label: "Change Analysis" },
    {
      icon: "/icons/Network-Security-Hub.svg",
      label: "Network security groups",
    },
    { icon: "/icons/Virtual-Networks.svg", label: "Virtual networks" },
    { icon: "/icons/Function-App.svg", label: "Function App" },
    { icon: "/icons/virtual-machine.svg", label: "Virtual machines" },
    { icon: "/icons/backup.svg", label: "Alerts" },
    {
      icon: "/icons/Azure-Synapse-Analytics.svg",
      label: "Application Insights",
    },
    { icon: <ChevronRight24Regular />, label: "More services" },
  ];

  const azureServices =
    variant === "startup" ? azureServicesStartup : azureServicesReturning;

  // Startup version has only 1 resource
  const resourcesStartup = [
    {
      name: "aks-vnet-12870329",
      type: "Virtual network",
      lastViewed: "",
      icon: "/icons/Virtual-Networks.svg",
    },
  ];

  // Returning user version has full list
  const resourcesReturning = [
    {
      name: "vcc-cl-test",
      type: "Azure Arc",
      lastViewed: "a week ago",
      icon: "/icons/Azure-Arc.svg",
    },
    {
      name: "azureiaasmc",
      type: "Virtual machine",
      lastViewed: "a week ago",
      icon: "/icons/virtual-machine.svg",
    },
    {
      name: "aks-agentpool-13301706-nsg",
      type: "Network security group",
      lastViewed: "a week ago",
      icon: "/icons/Network-Security-Hub.svg",
    },
    {
      name: "agent-host-vm-DataDisk",
      type: "Disk",
      lastViewed: "a week ago",
      icon: "/icons/Storage.svg",
    },
    {
      name: "EEResourceGroupManagement-AzurePortal",
      type: "Application Insights",
      lastViewed: "2 weeks ago",
      icon: "/icons/Azure-Synapse-Analytics.svg",
    },
    {
      name: "LS-ConfigPortal",
      type: "Subscription",
      lastViewed: "3 weeks ago",
      icon: "/icons/Resource-Groups.svg",
    },
    {
      name: "agent-host-linux-vm",
      type: "Virtual machine",
      lastViewed: "4 weeks ago",
      icon: "/icons/virtual-machine.svg",
    },
    {
      name: "ContosoVSTSDB-commerceruntime",
      type: "SQL database",
      lastViewed: "4 weeks ago",
      icon: "/icons/SQL-Database.svg",
    },
    {
      name: "Rhino_ASGAR-WORK",
      type: "SQL database",
      lastViewed: "a month ago",
      icon: "/icons/SQL-Database.svg",
    },
    {
      name: "contoso-mdmtelserver",
      type: "SQL server",
      lastViewed: "a month ago",
      icon: "/icons/SQL-Database.svg",
    },
    {
      name: "bagaciohq",
      type: "Virtual machine",
      lastViewed: "a month ago",
      icon: "/icons/virtual-machine.svg",
    },
    {
      name: "aks-vnet-27156787",
      type: "Virtual network",
      lastViewed: "2 months ago",
      icon: "/icons/Virtual-Networks.svg",
    },
  ];

  const resources =
    variant === "startup" ? resourcesStartup : resourcesReturning;

  const navigateItems = [
    { icon: "/icons/Subscriptions.svg", label: "Subscriptions" },
    { icon: "/icons/Resource-Groups.svg", label: "Resource groups" },
    { icon: "/icons/All-Resources.svg", label: "All resources" },
    { icon: "/icons/Dashboard.svg", label: "Dashboard" },
  ];

  const tools = [
    {
      icon: "/icons/Learn.svg",
      title: "Microsoft Learn",
      description:
        "Learn new skills and discover the power of Microsoft products",
    },
    {
      icon: "/icons/Monitor.svg",
      title: "Azure Monitor",
      description:
        "Full observability into your applications, infrastructure, and network",
    },
    {
      icon: "/icons/Defender-for-Cloud.svg",
      title: "Microsoft Defender for Cloud",
      description: "Protect your multi-cloud and hybrid environments",
    },
    {
      icon: "/icons/Cost Management.svg",
      title: "Cost Management",
      description: "Optimize costs and manage spending",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Azure Services Section */}
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Azure services</Text>
        <div className={styles.azureServicesGrid}>
          {azureServices.map((service, index) => (
            <div key={index} className={styles.serviceItem}>
              <div className={styles.serviceIcon}>
                {typeof service.icon === "string" ? (
                  <img
                    src={service.icon}
                    alt={service.label}
                    width={32}
                    height={32}
                  />
                ) : (
                  service.icon
                )}
              </div>
              <Text className={styles.serviceLabel}>{service.label}</Text>
            </div>
          ))}
        </div>
      </div>

      {/* Resources Section */}
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Resources</Text>
        <div className={styles.tabs}>
          <div
            className={
              activeTab === "Recent"
                ? `${styles.tab} ${styles.tabActive}`
                : styles.tab
            }
            onClick={() => setActiveTab("Recent")}
          >
            Recent
          </div>
          <div
            className={
              activeTab === "Favorite"
                ? `${styles.tab} ${styles.tabActive}`
                : styles.tab
            }
            onClick={() => setActiveTab("Favorite")}
          >
            Favorite
          </div>
        </div>
        <table className={styles.resourcesTable}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Name</th>
              <th className={styles.tableHeader}>Type</th>
              <th className={styles.tableHeader}>Last Viewed</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <div className={styles.resourceName}>
                    <img
                      src={resource.icon}
                      alt={resource.type}
                      width={16}
                      height={16}
                    />
                    <span>{resource.name}</span>
                  </div>
                </td>
                <td className={styles.tableCell}>{resource.type}</td>
                <td className={styles.tableCell}>{resource.lastViewed}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Text className={styles.seeAllLink}>See all</Text>
      </div>

      {/* Navigate Section */}
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Navigate</Text>
        <div className={styles.navigateGrid}>
          {navigateItems.map((item, index) => (
            <div key={index} className={styles.navigateCard}>
              <img src={item.icon} alt={item.label} width={24} height={24} />
              <Text className={styles.navigateLabel}>{item.label}</Text>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Section */}
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Tools</Text>
        <div className={styles.toolsGrid}>
          {tools.map((tool, index) => (
            <div key={index} className={styles.toolCard}>
              <img
                src={tool.icon}
                alt={tool.title}
                className={styles.toolIcon}
              />
              <div>
                <Text className={styles.toolTitle}>{tool.title}</Text>
                <Text className={styles.toolDescription}>
                  {tool.description}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Useful Links Section */}
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Useful links</Text>
        <div className={styles.usefulLinksGrid}>
          <div className={styles.linkColumn}>
            <Text className={styles.linkItem}>Training and certification</Text>
            <Text className={styles.linkItem}>Azure Migration Tools</Text>
          </div>
          <div className={styles.linkColumn}>
            <Text className={styles.linkItem}>Azure Advisor</Text>
            <Text className={styles.linkItem}>Find an Azure partner</Text>
          </div>
          <div className={styles.linkColumn}>
            <Text className={styles.linkItem}>Recent Azure Updates</Text>
            <Text className={styles.linkItem}>Quickstart Center</Text>
          </div>
          <div className={styles.mobileAppColumn}>
            <Text className={styles.mobileAppTitle}>Azure mobile app</Text>
            <div className={styles.appStoreButtons}>
              <img
                src="/icons/appstore.png"
                alt="Download on App Store"
                className={mergeClasses(
                  styles.appStoreButton,
                  styles.appStoreImage,
                )}
              />
              <img
                src="/icons/playstore.png"
                alt="Get it on Google Play"
                className={mergeClasses(
                  styles.appStoreButton,
                  styles.appStoreImage,
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HpControlOld;
