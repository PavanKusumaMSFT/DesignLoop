"use client"

import { useState } from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Input,
  TabList,
  Tab,
} from "@fluentui/react-components"
import {
  Search24Regular,
  Add20Regular,
  Filter20Regular,
  ArrowSync20Regular,
  MoreHorizontal20Regular,
  Globe20Regular,
  ChevronRight12Regular,
  Alert24Regular,
  Info20Regular,
  ArrowCircleUp24Regular,
} from "@fluentui/react-icons"
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp"
import CreateNicWizard from "./create-nic-wizard"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

// ── Mock NIC data ────────────────────────────────────────────────────────────

const mockNicResources = [
  { name: "web-app-nic-01", resourceGroup: "rg-production", location: "East US", virtualNetwork: "vnet-prod-eastus/subnet-app", privateIp: "10.0.1.4", status: "Running" },
  { name: "db-server-nic", resourceGroup: "rg-production", location: "East US", virtualNetwork: "vnet-prod-eastus/subnet-data", privateIp: "10.0.2.5", status: "Running" },
  { name: "jumpbox-nic", resourceGroup: "rg-management", location: "West US", virtualNetwork: "vnet-mgmt-westus/subnet-mgmt", privateIp: "10.1.0.4", status: "Running" },
  { name: "dev-vm-nic-01", resourceGroup: "rg-development", location: "Central US", virtualNetwork: "vnet-dev-centralus/subnet-default", privateIp: "10.2.0.4", status: "Stopped" },
  { name: "api-gateway-nic", resourceGroup: "rg-production", location: "East US", virtualNetwork: "vnet-prod-eastus/subnet-gateway", privateIp: "10.0.3.4", status: "Running" },
  { name: "monitoring-nic", resourceGroup: "rg-management", location: "West US", virtualNetwork: "vnet-mgmt-westus/subnet-monitoring", privateIp: "10.1.1.4", status: "Running" },
]

// Mock recent resources for the home page (matching Figma design)
const mockRecentResources = [
  { name: "Aarc-1", type: "Azure Arc", icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg", alerts: 0, lastViewed: "November 13, 2024" },
  { name: "ContosoAds", type: "SQL Database", icon: "/azure-service-icons/databases/10130-icon-service-SQL-Database.svg", alerts: 0, lastViewed: "November 13, 2024" },
  { name: "Contoso-storage", type: "Storage account", icon: "/azure-service-icons/storage/10086-icon-service-Storage-Accounts.svg", alerts: 0, lastViewed: "November 11, 2024" },
  { name: "Contoso-rg", type: "Resource group", icon: "/azure-service-icons/general/10007-icon-service-Resource-Groups.svg", alerts: 0, lastViewed: "November 10, 2024" },
  { name: "Contoso-vm", type: "Virtual machine", icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg", alerts: 0, lastViewed: "November 10, 2024" },
]

// ── Styles ───────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  // Home page styles
  homeContent: {
    padding: "48px 32px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  // Welcome header row
  welcomeRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: tokens.spacingVerticalXXL,
  },
  welcomeTitle: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  creditsBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    borderRadius: tokens.borderRadiusXLarge,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium,
  },
  // Action cards grid
  actionCardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalXXL,
    "@media (max-width: 1200px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  actionCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalXL,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    boxShadow: tokens.shadow4,
    transitionProperty: "box-shadow",
    transitionDuration: tokens.durationNormal,
    ":hover": {
      boxShadow: tokens.shadow8,
    },
  },
  cardIconContainer: {
    width: "40px",
    height: "40px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardIconGithub: {
    width: "40px",
    height: "40px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardIconImg: {
    width: "24px",
    height: "24px",
  },
  cardTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  cardDescription: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  // Summary cards row (Alerts + Costs)
  summaryRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalXXL,
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  summaryCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalXL,
    boxShadow: tokens.shadow4,
  },
  summaryCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalL,
  },
  summaryCardTitle: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  summaryCardTitleIcon: {
    color: tokens.colorPaletteRedForeground1,
  },
  summaryCardTitleIconGreen: {
    color: tokens.colorPaletteGreenForeground1,
  },
  summaryCardTitleText: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  summaryCardDate: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
  },
  // Alerts card content
  alertsContent: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXL,
    marginBottom: tokens.spacingVerticalL,
  },
  alertsSetup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalS,
  },
  alertsIcon: {
    width: "48px",
    height: "48px",
    color: tokens.colorNeutralForeground3,
  },
  alertsSetupText: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    textAlign: "center",
  },
  alertsSetupDescription: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    textAlign: "center",
    maxWidth: "200px",
  },
  serviceIssues: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalXS,
  },
  serviceIssuesLabel: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  serviceIssuesValue: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  serviceIssuesDate: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
  },
  alertsActions: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
  },
  // Cost card content
  costsContent: {
    marginBottom: tokens.spacingVerticalL,
  },
  costsTrialInfo: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
  },
  costsTrialDescription: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    marginBottom: tokens.spacingVerticalL,
  },
  costsStats: {
    display: "flex",
    gap: tokens.spacingHorizontalXXL,
  },
  costStat: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  costStatLabel: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
  },
  costStatValue: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  costStatValueGreen: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
  },
  // Resources section
  resourcesSection: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  resourcesSectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalM,
  },
  resourcesSectionIcon: {
    color: tokens.colorBrandForeground1,
  },
  resourcesSectionTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  resourcesTabs: {
    marginBottom: tokens.spacingVerticalL,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tableHeader: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  th: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    textAlign: "left",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  td: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  resourceName: {
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
  },
  resourceNameCell: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  resourceIcon: {
    width: "16px",
    height: "16px",
    flexShrink: 0,
  },
  alertLink: {
    color: tokens.colorBrandForeground1,
  },
  viewAllLink: {
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    fontSize: tokens.fontSizeBase300,
    border: "none",
    backgroundColor: "transparent",
    padding: "0",
    marginTop: tokens.spacingVerticalM,
    display: "block",
    ":hover": {
      textDecoration: "underline",
    },
  },
  // Browse page styles
  browseContainer: {
    padding: tokens.spacingHorizontalXXL,
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    marginBottom: tokens.spacingVerticalL,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  breadcrumbLink: {
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    padding: "0",
    fontSize: tokens.fontSizeBase200,
    ":hover": {
      textDecoration: "underline",
    },
  },
  browseHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalL,
  },
  browseTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalL,
    padding: `${tokens.spacingVerticalS} 0`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  filterInput: {
    width: "250px",
  },
  statusRunning: {
    color: tokens.colorPaletteGreenForeground1,
    fontWeight: tokens.fontWeightMedium,
  },
  statusStopped: {
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightMedium,
  },
  resourceCount: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    marginBottom: tokens.spacingVerticalM,
  },
})

// ── Component ────────────────────────────────────────────────────────────────

type View = "home" | "browse" | "create"

export default function NicBrowseFlow({ isDarkMode = false, onNavigateToBrowse }: { isDarkMode?: boolean; onNavigateToBrowse?: () => void }) {
  const styles = useStyles()
  const [view, setView] = useState<View>("home")
  const [filterValue, setFilterValue] = useState("")
  const [resourceTab, setResourceTab] = useState<string>("recently-viewed")

  const filteredResources = mockNicResources.filter(r =>
    filterValue === "" || r.name.toLowerCase().includes(filterValue.toLowerCase()) ||
    r.resourceGroup.toLowerCase().includes(filterValue.toLowerCase()) ||
    r.location.toLowerCase().includes(filterValue.toLowerCase())
  )

  const handleSuggestionSelect = (suggestion: string) => {
    const lower = suggestion.toLowerCase()
    if (lower.includes("nic") || lower.includes("network interface")) {
      if (onNavigateToBrowse) {
        onNavigateToBrowse()
      } else {
        setView("browse")
      }
    }
  }

  if (view === "create") {
    return <CreateNicWizard onClose={() => setView("browse")} isDarkMode={isDarkMode} />
  }

  if (view === "browse") {
    return (
      <div className={styles.root}>
        <AzureHeaderBuildMVP isDarkMode={isDarkMode} activeLink="" onSuggestionSelect={handleSuggestionSelect} />
        <div className={styles.browseContainer}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <button className={styles.breadcrumbLink} onClick={() => setView("home")}>
              Home
            </button>
            <ChevronRight12Regular />
            <Text>Network interfaces</Text>
          </div>

          {/* Header with Create button */}
          <div className={styles.browseHeader}>
            <Text className={styles.browseTitle}>Network interfaces</Text>
            <Button appearance="primary" icon={<Add20Regular />} onClick={() => setView("create")}>
              Create
            </Button>
          </div>

          {/* Toolbar */}
          <div className={styles.toolbar}>
            <Input
              className={styles.filterInput}
              placeholder="Filter by name..."
              contentBefore={<Search24Regular />}
              value={filterValue}
              onChange={(_, data) => setFilterValue(data.value)}
            />
            <Button appearance="subtle" icon={<Filter20Regular />}>Filter</Button>
            <Button appearance="subtle" icon={<ArrowSync20Regular />}>Refresh</Button>
            <Button appearance="subtle" icon={<MoreHorizontal20Regular />} />
          </div>

          {/* Resource count */}
          <Text className={styles.resourceCount}>
            {filteredResources.length} network interfaces
          </Text>

          {/* Resource table */}
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Resource group</th>
                <th className={styles.th}>Location</th>
                <th className={styles.th}>Virtual network/subnet</th>
                <th className={styles.th}>Private IP address</th>
                <th className={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.map((resource, index) => (
                <tr key={index}>
                  <td className={styles.td}>
                    <span className={styles.resourceName}>{resource.name}</span>
                  </td>
                  <td className={styles.td}>{resource.resourceGroup}</td>
                  <td className={styles.td}>{resource.location}</td>
                  <td className={styles.td}>{resource.virtualNetwork}</td>
                  <td className={styles.td}>{resource.privateIp}</td>
                  <td className={styles.td}>
                    <span className={resource.status === "Running" ? styles.statusRunning : styles.statusStopped}>
                      {resource.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Home view — Azure portal landing page (matching Figma design)
  return (
    <div className={styles.root}>
      <AzureHeaderBuildMVP isDarkMode={isDarkMode} activeLink="" onSuggestionSelect={handleSuggestionSelect} />
      <div className={styles.homeContent}>
        {/* Welcome row with credits badge */}
        <div className={styles.welcomeRow}>
          <Text as="h1" className={styles.welcomeTitle}>
            Welcome back, Connie
          </Text>
          <div className={styles.creditsBadge}>
            $157 in credits · Expires Aug 25, 2025 <Info20Regular />
          </div>
        </div>

        {/* Action cards */}
        <div className={styles.actionCardsGrid}>
          <div className={styles.actionCard}>
            <div className={styles.cardIconContainer}>
              <img src="/icons/templates.svg" alt="" className={styles.cardIconImg} />
            </div>
            <Text className={styles.cardTitle}>Start with a template</Text>
            <Text className={styles.cardDescription}>Deploy in minutes using pre-made templates.</Text>
          </div>
          <div className={styles.actionCard} onClick={() => setView("browse")}>
            <div className={styles.cardIconContainer}>
              <img src="/icons/Service.svg" alt="" className={styles.cardIconImg} />
            </div>
            <Text className={styles.cardTitle}>Explore services</Text>
            <Text className={styles.cardDescription}>Choose the right service for your use case.</Text>
          </div>
          <div className={styles.actionCard}>
            <div className={styles.cardIconContainer}>
              <img src="/icons/aifoundry.svg" alt="" className={styles.cardIconImg} />
            </div>
            <Text className={styles.cardTitle}>Build an AI agent</Text>
            <Text className={styles.cardDescription}>Create and manage AI apps and agents using the latest models.</Text>
          </div>
          <div className={styles.actionCard}>
            <div className={styles.cardIconGithub}>
              <img src="/icons/github.svg" alt="" className={styles.cardIconImg} />
            </div>
            <Text className={styles.cardTitle}>Import code from GitHub</Text>
            <Text className={styles.cardDescription}>Connect your GitHub account and deploy existing repositories.</Text>
          </div>
        </div>

        {/* Alerts and Costs cards */}
        <div className={styles.summaryRow}>
          {/* Alerts and service health */}
          <div className={styles.summaryCard}>
            <div className={styles.summaryCardHeader}>
              <div className={styles.summaryCardTitle}>
                <Alert24Regular className={styles.summaryCardTitleIcon} />
                <Text className={styles.summaryCardTitleText}>Alerts and service health</Text>
              </div>
            </div>
            <div className={styles.alertsContent}>
              <div className={styles.alertsSetup}>
                <Alert24Regular className={styles.alertsIcon} />
                <Text className={styles.alertsSetupText}>Set up alerts to catch issues</Text>
                <Text className={styles.alertsSetupDescription}>Get notified early about errors, slowdowns, and unexpected behaviors.</Text>
              </div>
              <div className={styles.serviceIssues}>
                <div className={styles.serviceIssuesLabel}>
                  Service issues <Info20Regular />
                </div>
                <Text className={styles.serviceIssuesValue}>2</Text>
                <Text className={styles.serviceIssuesDate}>Last updated 07/10/2025</Text>
              </div>
            </div>
            <div className={styles.alertsActions}>
              <Button appearance="outline" size="small">Set up alerts</Button>
              <Button appearance="outline" size="small">View service health</Button>
            </div>
          </div>

          {/* Costs */}
          <div className={styles.summaryCard}>
            <div className={styles.summaryCardHeader}>
              <div className={styles.summaryCardTitle}>
                <ArrowCircleUp24Regular className={styles.summaryCardTitleIconGreen} />
                <Text className={styles.summaryCardTitleText}>Costs</Text>
              </div>
              <Text className={styles.summaryCardDate}>Last updated 07/10/2025</Text>
            </div>
            <div className={styles.costsContent}>
              <Text as="p" className={styles.costsTrialInfo}>30 days left in your free trial</Text>
              <Text as="p" className={styles.costsTrialDescription}>
                Use your credits to cover Azure services, some services are always free.
              </Text>
              <div className={styles.costsStats}>
                <div className={styles.costStat}>
                  <Text className={styles.costStatLabel}>Credits spent</Text>
                  <Text className={styles.costStatValue}>$43.00</Text>
                </div>
                <div className={styles.costStat}>
                  <Text className={styles.costStatLabel}>Available credits</Text>
                  <Text className={styles.costStatValueGreen}>$157.00</Text>
                </div>
              </div>
            </div>
            <Button appearance="outline" size="small">View costs</Button>
          </div>
        </div>

        {/* Resources section */}
        <div className={styles.resourcesSection}>
          <div className={styles.resourcesSectionHeader}>
            <Globe20Regular className={styles.resourcesSectionIcon} />
            <Text className={styles.resourcesSectionTitle}>Resources</Text>
          </div>
          <div className={styles.resourcesTabs}>
            <TabList
              selectedValue={resourceTab}
              onTabSelect={(_, data) => setResourceTab(data.value as string)}
              size="small"
            >
              <Tab value="recently-viewed">Recently viewed</Tab>
              <Tab value="favorites">Favorites</Tab>
            </TabList>
          </div>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.th}>Resource name</th>
                <th className={styles.th}>Type</th>
                <th className={styles.th}>Alerts</th>
                <th className={styles.th}>Last viewed</th>
              </tr>
            </thead>
            <tbody>
              {mockRecentResources.map((resource, index) => (
                <tr key={index}>
                  <td className={styles.td}>
                    <div className={styles.resourceNameCell}>
                      <img src={resource.icon} alt="" className={styles.resourceIcon} />
                      <span className={styles.resourceName}>{resource.name}</span>
                    </div>
                  </td>
                  <td className={styles.td}>{resource.type}</td>
                  <td className={styles.td}>
                    <span className={styles.alertLink}>{resource.alerts}</span>
                  </td>
                  <td className={styles.td}>{resource.lastViewed}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className={styles.viewAllLink}>View all recent resources</button>
        </div>
      </div>
    </div>
  )
}
