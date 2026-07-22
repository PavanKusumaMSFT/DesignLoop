"use client"

import { useState } from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  TabList,
  Tab,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Link,
} from "@fluentui/react-components"
import {
  Add24Regular,
  ArrowRight24Regular,
} from "@fluentui/react-icons"
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  content: {
    maxWidth: "1060px",
    margin: "0 auto",
    padding: "32px 48px 80px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },

  /* ── Section titles ─────────────────────────── */
  sectionTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
  },

  /* ── Azure services row ─────────────────────── */
  servicesSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  servicesRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  serviceItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalXS,
    width: "80px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    padding: tokens.spacingVerticalXS,
    borderRadius: tokens.borderRadiusMedium,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  serviceIcon: {
    width: "32px",
    height: "32px",
  },
  serviceLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase200,
    textAlign: "center" as const,
  },
  serviceLabelBrand: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    lineHeight: tokens.lineHeightBase200,
    textAlign: "center" as const,
  },
  createIcon: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorBrandForeground1,
  },
  moreServicesIcon: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorBrandForeground1,
  },

  /* ── Resources section ──────────────────────── */
  resourcesSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  resourceLink: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
    cursor: "pointer",
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
  tableCell: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  tableHeaderCell: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
  seeAllLink: {
    paddingTop: tokens.spacingVerticalS,
  },

  /* ── Navigate section ───────────────────────── */
  navigateSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  navigateRow: {
    display: "flex",
    alignItems: "center",
    gap: "64px",
  },
  navigateItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusMedium,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  navigateIcon: {
    width: "32px",
    height: "32px",
    flexShrink: 0,
  },
  navigateLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },

  /* ── Tools section ──────────────────────────── */
  toolsSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  toolsRow: {
    display: "flex",
    alignItems: "center",
    gap: "64px",
  },
})

const azureServices = [
  { label: "Create a resource", icon: "create", isBrand: true },
  { label: "Network interfaces", icon: "/azure-service-icons/networking/10080-icon-service-Network-Interfaces.svg" },
  { label: "Operations center", icon: "/azure-service-icons/new icons/035572279-icon-service-Operation-Center.svg" },
  { label: "Virtual machines", icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg" },
  { label: "Azure Arc", icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg" },
  { label: "Compute infrastructure", icon: "/azure-service-icons/other/02864-icon-service-Azure-Compute-Galleries.svg" },
  { label: "Configuration", icon: "/azure-service-icons/compute/00195-icon-service-Maintenance-Configuration.svg" },
  { label: "Change Tracking and...", icon: "/azure-service-icons/devops/00563-icon-service-Change-Analysis.svg" },
  { label: "Azure Update Manager", icon: "/azure-service-icons/azure stack/10115-icon-service-Updates.svg" },
  { label: "More services", icon: "more", isBrand: true },
]

const recentResources = [
  { name: "ACTTest1", type: "Virtual machine", lastViewed: "a week ago", icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg" },
  { name: "test", type: "Storage mover", lastViewed: "a week ago", icon: "/azure-service-icons/storage/10086-icon-service-Storage-Accounts.svg" },
  { name: "amisha-appgateway-1", type: "Application gateway", lastViewed: "2 weeks ago", icon: "/azure-service-icons/networking/10076-icon-service-Application-Gateways.svg" },
  { name: "amisha-loadbalancer", type: "Load balancer", lastViewed: "3 weeks ago", icon: "/azure-service-icons/networking/10062-icon-service-Load-Balancers.svg" },
  { name: "0.0.1", type: "VM image version", lastViewed: "4 weeks ago", icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg" },
  { name: "ADITI", type: "Machine - Azure Arc", lastViewed: "a month ago", icon: "/azure-service-icons/management + governance/10450-icon-service-MachinesAzureArc.svg" },
  { name: "dcscadc", type: "Application gateway", lastViewed: "a month ago", icon: "/azure-service-icons/networking/10076-icon-service-Application-Gateways.svg" },
  { name: "aastha-moverg-test", type: "Resource group", lastViewed: "a month ago", icon: "/azure-service-icons/general/10007-icon-service-Resource-Groups.svg" },
  { name: "sdcsd", type: "Public IP address", lastViewed: "a month ago", icon: "/azure-service-icons/networking/10069-icon-service-Public-IP-Addresses.svg" },
  { name: "dsvsd", type: "Virtual network", lastViewed: "a month ago", icon: "/azure-service-icons/networking/10061-icon-service-Virtual-Networks.svg" },
  { name: "anujainTestAvnm", type: "Network manager", lastViewed: "2 months ago", icon: "/azure-service-icons/networking/10080-icon-service-Network-Interfaces.svg" },
  { name: "shreya-test-ASG", type: "Application security group", lastViewed: "2 months ago", icon: "/azure-service-icons/security/10244-icon-service-Application-Security-Groups.svg" },
]

const navigateItems = [
  { label: "Subscriptions", icon: "/azure-service-icons/general/10002-icon-service-Subscriptions.svg" },
  { label: "Resource groups", icon: "/azure-service-icons/general/10007-icon-service-Resource-Groups.svg" },
  { label: "All resources", icon: "/azure-service-icons/general/10001-icon-service-All-Resources.svg" },
  { label: "Dashboard", icon: "/azure-service-icons/general/10015-icon-service-Dashboard.svg" },
]

/** Classic Azure portal homepage with services row, resources table, navigate shortcuts, and tools. */
export default function EntrypointsDaynLanding({
  isDarkMode = false,
  onNavigate,
}: {
  isDarkMode?: boolean
  onNavigate?: (target: string) => void
}) {
  const styles = useStyles()
  const [activeTab, setActiveTab] = useState<string>("recent")

  return (
    <div className={styles.root}>
      <AzureHeaderBuildMVP
        isDarkMode={isDarkMode}
        searchPlaceholder="Search resources, services, and docs (G+/)"
        initialShowSuggestions={false}
        onSuggestionSelect={(suggestion) => onNavigate?.(suggestion)}
      />

      <div className={styles.content}>
        {/* ── Azure services ─────────────────────── */}
        <div className={styles.servicesSection}>
          <Text className={styles.sectionTitle}>Azure services</Text>
          <div className={styles.servicesRow}>
            {azureServices.map((svc) => (
              <button key={svc.label} className={styles.serviceItem} onClick={() => onNavigate?.(svc.label)}>
                {svc.icon === "create" ? (
                  <div className={styles.createIcon}>
                    <Add24Regular />
                  </div>
                ) : svc.icon === "more" ? (
                  <div className={styles.moreServicesIcon}>
                    <ArrowRight24Regular />
                  </div>
                ) : (
                  <img src={svc.icon} alt="" className={styles.serviceIcon} />
                )}
                <Text className={svc.isBrand ? styles.serviceLabelBrand : styles.serviceLabel}>
                  {svc.label}
                </Text>
              </button>
            ))}
          </div>
        </div>

        {/* ── Resources ──────────────────────────── */}
        <div className={styles.resourcesSection}>
          <Text className={styles.sectionTitle}>Resources</Text>
          <TabList
            selectedValue={activeTab}
            onTabSelect={(_, data) => setActiveTab(data.value as string)}
          >
            <Tab value="recent">Recent</Tab>
            <Tab value="favorite">Favorite</Tab>
          </TabList>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCell className={styles.tableHeaderCell}>Name</TableHeaderCell>
                <TableHeaderCell className={styles.tableHeaderCell}>Type</TableHeaderCell>
                <TableHeaderCell className={styles.tableHeaderCell}>Last Viewed</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentResources.map((r) => (
                <TableRow key={r.name}>
                  <TableCell>
                    <div className={styles.resourceNameCell}>
                      <img src={r.icon} alt="" className={styles.resourceIcon} />
                      <Link className={styles.resourceLink}>{r.name}</Link>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Text className={styles.tableCell}>{r.type}</Text>
                  </TableCell>
                  <TableCell>
                    <Text className={styles.tableCell}>{r.lastViewed}</Text>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className={styles.seeAllLink}>
            <Link className={styles.resourceLink}>See all</Link>
          </div>
        </div>

        {/* ── Navigate ───────────────────────────── */}
        <div className={styles.navigateSection}>
          <Text className={styles.sectionTitle}>Navigate</Text>
          <div className={styles.navigateRow}>
            {navigateItems.map((item) => (
              <button key={item.label} className={styles.navigateItem}>
                <img src={item.icon} alt="" className={styles.navigateIcon} />
                <Text className={styles.navigateLabel}>{item.label}</Text>
              </button>
            ))}
          </div>
        </div>

        {/* ── Tools ──────────────────────────────── */}
        <div className={styles.toolsSection}>
          <Text className={styles.sectionTitle}>Tools</Text>
          <div className={styles.toolsRow}>
            <button className={styles.navigateItem}>
              <img src="/azure-service-icons/devops/00563-icon-service-Change-Analysis.svg" alt="" className={styles.navigateIcon} />
              <Text className={styles.navigateLabel}>Azure mobile app</Text>
            </button>
            <button className={styles.navigateItem}>
              <img src="/azure-service-icons/general/10015-icon-service-Dashboard.svg" alt="" className={styles.navigateIcon} />
              <Text className={styles.navigateLabel}>Azure CLI</Text>
            </button>
            <button className={styles.navigateItem}>
              <img src="/azure-service-icons/general/10001-icon-service-All-Resources.svg" alt="" className={styles.navigateIcon} />
              <Text className={styles.navigateLabel}>Azure PowerShell</Text>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
