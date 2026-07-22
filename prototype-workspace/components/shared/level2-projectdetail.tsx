"use client";

import { useState, useEffect } from "react";
import { tokens as fluentTokens } from "@fluentui/react-theme";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Document24Regular,
  Cube24Regular,
  FolderOpen24Regular,
  Database24Regular,
  Layer24Regular,
  Shield24Regular,
  Gauge24Regular,
  Server24Regular,
  Add24Regular,
  Settings24Regular,
  Lightbulb24Regular,
  ChevronDown16Regular,
  ChevronRight16Regular,
  Info16Regular,
} from "@fluentui/react-icons";
import { useNavigation } from "../../lib/navigation-context";
import {
  FluentProvider,
  Button as FluentButton,
  Text,
  webLightTheme,
  Tab,
  TabList,
  Tooltip,
} from "@fluentui/react-components";
import { makeStyles, mergeClasses } from "@fluentui/react-components";
import { AzureHeaderP1 } from "./azure-header-p1";
import { TopNav } from "./top-nav";
import { CopilotSVGIcon } from "./copilot-svg-icon";
import { GaugeChart } from "@fluentui/react-charting";
import { NextStepsCarousel } from "./next-steps-carousel";
import { CanvasView } from "../../app/portal-ia/canvas-view";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  mainContent: {
    flex: 1,
    padding: "48px 32px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 12px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      borderRadius: "4px",
    },
  },
  title: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  subtitle: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginTop: "4px",
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "24px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    padding: "8px 8px 8px 16px",
    maxWidth: "768px",
    marginLeft: "0",
    marginRight: "auto",
    marginBottom: "32px",
    transition: "all 0.2s ease",
    height: "48px",
  },
  searchInput: {
    flex: 1,
    padding: "8px 16px",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    fontSize: "16px",
  },
  overviewSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "24px",
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
  },
  statsTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    marginBottom: "16px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
    marginBottom: "24px",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
  statCard: {
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "8px",
  },
  statLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "8px",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  resourcesTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  resourcesTableHeader: {
    textAlign: "left",
    padding: "12px 0",
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  resourcesTableCell: {
    padding: "12px 0",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  actionCards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginTop: "24px",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  actionCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow4,
    },
  },
  cardIcon: {
    width: "24px",
    height: "24px",
    color: tokens.colorBrandForeground1,
    marginBottom: "12px",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
  },
  cardDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.4",
  },
  pageHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  subtitleFlex: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  statusDotGreen: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: tokens.colorPaletteGreenForeground1,
  },
  brandLink: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    cursor: "pointer",
  },
  headerActions: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
  },
  outlineBtn: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  flexRowGap8: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  flexRowGap4: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  brandColorText: {
    color: tokens.colorBrandForeground1,
  },
  sectionMt: {
    marginTop: "32px",
  },
  archHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalL,
  },
  archContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    overflow: "hidden",
    height: "600px",
  },
  drawerOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1200,
  },
  drawer: {
    position: "fixed" as const,
    top: 0,
    right: 0,
    bottom: 0,
    width: "480px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow64,
    zIndex: 1201,
    display: "flex",
    flexDirection: "column" as const,
    animation: "slideInRight 0.3s ease-out",
  },
  drawerHeader: {
    padding: tokens.spacingHorizontalXXL,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  drawerHeaderTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    display: "block",
  },
  drawerHeaderSubtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    marginTop: tokens.spacingVerticalS,
    display: "block",
  },
  drawerContent: {
    flex: 1,
    overflowY: "auto" as const,
    padding: tokens.spacingHorizontalXXL,
  },
  drawerFooter: {
    padding: tokens.spacingHorizontalXXL,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    gap: tokens.spacingHorizontalM,
    justifyContent: "flex-start",
  },
  sectionMb32: {
    marginBottom: "32px",
  },
  sectionMb24: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  sectionMb16: {
    marginBottom: tokens.spacingVerticalL,
  },
  sectionMb12: {
    marginBottom: tokens.spacingVerticalM,
  },
  sectionMb8: {
    marginBottom: tokens.spacingVerticalS,
  },
  sectionSubMl24: {
    marginLeft: tokens.spacingHorizontalXXL,
  },
  sectionSubMb20: {
    marginBottom: "20px",
    marginLeft: tokens.spacingHorizontalXXL,
  },
  drawerSectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalM,
    display: "block",
  },
  formLabel: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  radioMargin: {
    marginRight: tokens.spacingHorizontalS,
  },
  formText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
  formTextMr: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    marginRight: tokens.spacingHorizontalXS,
  },
  infoIcon: {
    color: tokens.colorNeutralForeground3,
  },
  chevronMargin: {
    marginRight: tokens.spacingHorizontalS,
  },
  sectionHeaderText: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  formTextBlock: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalM,
    display: "block",
  },
  formTextBlockSm: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalS,
    display: "block",
  },
  gaugeWrapper: {
    position: "relative" as const,
    display: "inline-block",
    width: "200px",
  },
  fullWidth: {
    width: "100%",
  },
  numberInput: {
    width: "100%",
    padding: "8px 40px 8px 12px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    fontSize: tokens.fontSizeBase300,
  },
  unitSuffix: {
    position: "absolute" as const,
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    pointerEvents: "none" as const,
  },
  sectionExpanderRow: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  sectionExpanderRowOpen: {
    marginBottom: "16px",
  },
});

interface Level2ProjectDetailProps {
  experienceLevel: "new" | "smb" | "enterprise";
  projectName?: string;
  onBack?: () => void;
  customHeader?: React.ReactNode | null;
  useTopNav?: boolean;
}

const Level2ProjectDetailContent = ({
  experienceLevel,
  projectName = "Checkout",
  onBack,
  customHeader,
  useTopNav = false,
}: Level2ProjectDetailProps) => {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();
  const [searchValue, setSearchValue] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [goalsConfigured, setGoalsConfigured] = useState(false);
  const [resiliencyExpanded, setResiliencyExpanded] = useState(true);
  const [securityExpanded, setSecurityExpanded] = useState(false);
  const [performanceExpanded, setPerformanceExpanded] = useState(false);
  const [complianceExpanded, setComplianceExpanded] = useState(false);
  const [costExpanded, setCostExpanded] = useState(true);

  const projectResources = [
    {
      name: "checkout-frontend",
      type: "App Service",
      status: "Running",
      cost: "$45.20",
      location: "East US",
      icon: <Document24Regular />,
      statusColor: tokens.colorPaletteGreenForeground1,
    },
    {
      name: "checkout-api",
      type: "App Service",
      status: "Running",
      cost: "$45.20",
      location: "East US",
      icon: <Document24Regular />,
      statusColor: tokens.colorPaletteGreenForeground1,
    },
    {
      name: "checkout-db",
      type: "SQL Database",
      status: "Online",
      cost: "$89.40",
      location: "East US",
      icon: <Database24Regular />,
      statusColor: tokens.colorPaletteGreenForeground1,
    },
    {
      name: "checkout-storage",
      type: "Storage Account",
      status: "Available",
      cost: "$12.30",
      location: "East US",
      icon: <Layer24Regular />,
      statusColor: tokens.colorPaletteGreenForeground1,
    },
    {
      name: "checkout-cache",
      type: "Redis Cache",
      status: "Running",
      cost: "$23.50",
      location: "East US",
      icon: <Server24Regular />,
      statusColor: tokens.colorPaletteGreenForeground1,
    },
  ];

  const quickActions = [
    {
      icon: <Layer24Regular />,
      title: "Add Fallback Region",
      description:
        "Deploy resources to a secondary region for high availability and disaster recovery",
    },
    {
      icon: <Shield24Regular />,
      title: "Enable Payment Security",
      description:
        "Add Azure Key Vault to securely store payment credentials and API keys",
    },
    {
      icon: <Gauge24Regular />,
      title: "Set Up Performance Monitoring",
      description:
        "Configure Application Insights to track checkout conversion rates and performance",
    },
  ];

  const nextStepsCards = [
    {
      title: "Add fallback region",
      description:
        "Deploy resources to a secondary region for high availability and disaster recovery",
      badges: ["Recommended"],
      buttons: [
        { label: "Configure", primary: true },
        { label: "Ask infrastructure agent", primary: false, icon: true },
      ],
    },
    {
      title: "Enable payment security",
      description:
        "Add Azure Key Vault to securely store payment credentials and API keys",
      badges: ["Critical"],
      buttons: [
        { label: "Set up", primary: true },
        { label: "Learn more", primary: false },
      ],
    },
    {
      title: "Set up performance monitoring",
      description:
        "Configure Application Insights to track checkout conversion rates and performance metrics",
      badges: ["Recommended"],
      buttons: [
        { label: "Enable monitoring", primary: true },
        { label: "Ask Copilot", primary: false, icon: true },
      ],
    },
    {
      title: "Optimize costs",
      description:
        "Review and implement cost-saving recommendations for your current infrastructure",
      progress: 35,
      buttons: [
        { label: "View recommendations", primary: true },
        { label: "Ask Copilot", primary: false, icon: true },
      ],
    },
  ];

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        {/* Use TopNav for portal-ia, P1 header otherwise - suppress if customHeader is null */}
        {customHeader === undefined &&
          (useTopNav ? (
            <TopNav activeLink="Build" experienceLevel={experienceLevel} />
          ) : (
            <AzureHeaderP1
              activeLink="Build"
              experienceLevel={experienceLevel}
            />
          ))}

        <div className={styles.mainContent}>
          <div className={styles.pageHeaderRow}>
            <div>
              <Text as="h1" className={styles.title}>
                {projectName}
              </Text>
              <div
                className={mergeClasses(styles.subtitle, styles.subtitleFlex)}
              >
                <div className={styles.statusDotGreen} />
                <a
                  href="#"
                  className={styles.brandLink}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  All systems operational
                </a>
                <span> • Created 3 months ago • Last modified 2 days ago</span>
              </div>
            </div>
            <div className={styles.headerActions}>
              <FluentButton
                appearance="secondary"
                onClick={() => setIsDrawerOpen(true)}
                className={styles.outlineBtn}
              >
                Configure project goals
              </FluentButton>
              <FluentButton appearance="primary" icon={<Add24Regular />}>
                Add a resource
              </FluentButton>
            </div>
          </div>

          {/* Next Steps Carousel */}
          <NextStepsCarousel
            cards={nextStepsCards}
            title="Recommended next steps"
          />

          <div className={styles.overviewSection}>
            <div className={styles.sectionTitle}>
              Resources ({projectResources.length})
            </div>
            <table className={styles.resourcesTable}>
              <thead>
                <tr>
                  <th className={styles.resourcesTableHeader}>Name</th>
                  <th className={styles.resourcesTableHeader}>Type</th>
                  <th className={styles.resourcesTableHeader}>Status</th>
                  <th className={styles.resourcesTableHeader}>Location</th>
                  <th className={styles.resourcesTableHeader}>Cost</th>
                </tr>
              </thead>
              <tbody>
                {projectResources.map((resource, index) => (
                  <tr key={index}>
                    <td className={styles.resourcesTableCell}>
                      <div className={styles.flexRowGap8}>
                        <div className={styles.brandColorText}>
                          {resource.icon}
                        </div>
                        <span className={styles.brandColorText}>
                          {resource.name}
                        </span>
                      </div>
                    </td>
                    <td className={styles.resourcesTableCell}>
                      {resource.type}
                    </td>
                    <td className={styles.resourcesTableCell}>
                      <div className={styles.flexRowGap4}>
                        <div className={styles.statusDotGreen} />
                        {resource.status}
                      </div>
                    </td>
                    <td className={styles.resourcesTableCell}>
                      {resource.location}
                    </td>
                    <td
                      className={mergeClasses(
                        styles.resourcesTableCell,
                        styles.brandColorText,
                      )}
                    >
                      {resource.cost}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Architecture Card */}
          <div
            className={mergeClasses(styles.overviewSection, styles.sectionMt)}
          >
            <div className={styles.archHeaderRow}>
              <div className={styles.sectionTitle}>Architecture</div>
              <FluentButton
                appearance="secondary"
                icon={<Add24Regular />}
                className={styles.outlineBtn}
              >
                Add a resource
              </FluentButton>
            </div>
            <div className={styles.archContainer}>
              <CanvasView
                nodes={[
                  // Top Layer - Frontend
                  {
                    id: "checkout-frontend",
                    title: "checkout-frontend",
                    description: "React frontend app",
                    icon: <Document24Regular />,
                    // eslint-disable-next-line no-restricted-syntax
                    color: "#0078D4",
                    x: 700,
                    y: 50,
                    level: 1,
                  },
                  // Middle Layer - API and Cache
                  {
                    id: "checkout-api",
                    title: "checkout-api",
                    description: "REST API service",
                    icon: <Server24Regular />,
                    // eslint-disable-next-line no-restricted-syntax
                    color: "#0078D4",
                    x: 550,
                    y: 200,
                    level: 2,
                  },
                  {
                    id: "checkout-cache",
                    title: "checkout-cache",
                    description: "Session & cart cache",
                    icon: <Cube24Regular />,
                    // eslint-disable-next-line no-restricted-syntax
                    color: "#E74856",
                    x: 850,
                    y: 200,
                    level: 2,
                  },
                  // Bottom Layer - Database and Storage
                  {
                    id: "checkout-db",
                    title: "checkout-db",
                    description: "Order & customer data",
                    icon: <Database24Regular />,
                    // eslint-disable-next-line no-restricted-syntax
                    color: "#00BCF2",
                    x: 500,
                    y: 380,
                    level: 3,
                  },
                  {
                    id: "checkout-storage",
                    title: "checkout-storage",
                    description: "Product images & files",
                    icon: <Layer24Regular />,
                    // eslint-disable-next-line no-restricted-syntax
                    color: tokens.colorPaletteYellowForeground1,
                    x: 800,
                    y: 380,
                    level: 3,
                  },
                ]}
                connections={[
                  // Frontend to API
                  {
                    from: "checkout-frontend",
                    to: "checkout-api",
                    type: "primary",
                  },
                  // Frontend to Cache (for session management)
                  {
                    from: "checkout-frontend",
                    to: "checkout-cache",
                    type: "secondary",
                  },
                  // API to Database
                  {
                    from: "checkout-api",
                    to: "checkout-db",
                    type: "primary",
                  },
                  // API to Cache
                  {
                    from: "checkout-api",
                    to: "checkout-cache",
                    type: "primary",
                  },
                  // API to Storage
                  {
                    from: "checkout-api",
                    to: "checkout-storage",
                    type: "secondary",
                  },
                ]}
                onNodeClick={(nodeId) => {
                  console.log("Node clicked:", nodeId);
                }}
                showLevelBadge={false}
              />
            </div>
          </div>
        </div>

        {/* Right-hand Drawer */}
        {isDrawerOpen && (
          <>
            {/* Overlay */}
            <div
              className={styles.drawerOverlay}
              onClick={() => setIsDrawerOpen(false)}
            />

            {/* Drawer */}
            <div className={styles.drawer}>
              {/* Drawer Header */}
              <div className={styles.drawerHeader}>
                <Text className={styles.drawerHeaderTitle}>
                  Configure Goals
                </Text>
                <Text className={styles.drawerHeaderSubtitle}>
                  Set your project priorities to optimize recommendations
                </Text>
              </div>

              {/* Drawer Content */}
              <div className={styles.drawerContent}>
                {/* Criticality Section */}
                <div className={styles.sectionMb32}>
                  <Text className={styles.drawerSectionTitle}>
                    Project criticality
                  </Text>

                  <div className={styles.sectionMb8}>
                    <Tooltip
                      content="The workload enables your organization's most important outcomes. If this workload does not operate as expected, it causes severe impact to those outcomes."
                      relationship="description"
                    >
                      <label className={styles.formLabel}>
                        <input
                          type="radio"
                          name="criticality"
                          value="high"
                          defaultChecked
                          className={styles.radioMargin}
                        />
                        <Text className={styles.formTextMr}>High</Text>
                        <Info16Regular className={styles.infoIcon} />
                      </label>
                    </Tooltip>
                  </div>

                  <div>
                    <Tooltip
                      content="The workload's correct operation is helpful, but not required, to achieve your organization's most important outcomes."
                      relationship="description"
                    >
                      <label className={styles.formLabel}>
                        <input
                          type="radio"
                          name="criticality"
                          value="low"
                          className={styles.radioMargin}
                        />
                        <Text className={styles.formTextMr}>Low</Text>
                        <Info16Regular className={styles.infoIcon} />
                      </label>
                    </Tooltip>
                  </div>
                </div>

                {/* Resiliency Section */}
                <div className={styles.sectionMb24}>
                  <div
                    className={mergeClasses(
                      styles.sectionExpanderRow,
                      resiliencyExpanded && styles.sectionExpanderRowOpen,
                    )}
                    onClick={() => setResiliencyExpanded(!resiliencyExpanded)}
                  >
                    {resiliencyExpanded ? (
                      <ChevronDown16Regular className={styles.radioMargin} />
                    ) : (
                      <ChevronRight16Regular className={styles.radioMargin} />
                    )}
                    <Text className={styles.sectionHeaderText}>Resiliency</Text>
                  </div>

                  {resiliencyExpanded && (
                    <>
                      {/* Availability */}
                      <div className={styles.sectionSubMb20}>
                        <div
                          className={mergeClasses(
                            styles.pageHeaderRow,
                            styles.sectionMb8,
                          )}
                        >
                          <Text className={styles.formText}>Availability</Text>
                          <Text className={styles.formText}>99.99%</Text>
                        </div>
                        <input
                          type="range"
                          aria-label="SLA uptime target"
                          min="99.98"
                          max="100.00"
                          defaultValue="99.99"
                          step="0.01"
                          className={styles.fullWidth}
                        />
                      </div>

                      {/* RTO */}
                      <div className={styles.sectionSubMb20}>
                        <Text className={styles.formTextBlockSm}>RTO</Text>
                        <div className={styles.gaugeWrapper}>
                          <input
                            type="number"
                            aria-label="RTO in minutes"
                            min="0"
                            defaultValue="0"
                            className={styles.numberInput}
                          />
                          <span className={styles.unitSuffix}>min</span>
                        </div>
                      </div>

                      {/* RPO */}
                      <div className={styles.sectionSubMb20}>
                        <Text className={styles.formTextBlockSm}>RPO</Text>
                        <div className={styles.gaugeWrapper}>
                          <input
                            type="number"
                            aria-label="RPO in minutes"
                            min="0"
                            defaultValue="0"
                            className={styles.numberInput}
                          />
                          <span className={styles.unitSuffix}>min</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Security Section - Collapsed */}
                <div className={styles.sectionMb16}>
                  <div
                    className={mergeClasses(
                      styles.sectionExpanderRow,
                      securityExpanded && styles.sectionExpanderRowOpen,
                    )}
                    onClick={() => setSecurityExpanded(!securityExpanded)}
                  >
                    {securityExpanded ? (
                      <ChevronDown16Regular className={styles.radioMargin} />
                    ) : (
                      <ChevronRight16Regular className={styles.radioMargin} />
                    )}
                    <Text className={styles.sectionHeaderText}>Security</Text>
                  </div>

                  {securityExpanded && (
                    <div className={styles.sectionSubMl24}>
                      <div className={styles.sectionMb12}>
                        <label className={styles.formLabel}>
                          <input
                            type="checkbox"
                            defaultChecked
                            className={styles.radioMargin}
                          />
                          <Text className={styles.formText}>
                            Resolve vulnerabilities
                          </Text>
                        </label>
                      </div>
                      <div>
                        <label className={styles.formLabel}>
                          <input
                            type="checkbox"
                            defaultChecked
                            className={styles.radioMargin}
                          />
                          <Text className={styles.formText}>
                            Least privilege
                          </Text>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Performance Section - Collapsed */}
                <div className={styles.sectionMb16}>
                  <div
                    className={mergeClasses(
                      styles.sectionExpanderRow,
                      performanceExpanded && styles.sectionExpanderRowOpen,
                    )}
                    onClick={() => setPerformanceExpanded(!performanceExpanded)}
                  >
                    {performanceExpanded ? (
                      <ChevronDown16Regular className={styles.radioMargin} />
                    ) : (
                      <ChevronRight16Regular className={styles.radioMargin} />
                    )}
                    <Text className={styles.sectionHeaderText}>
                      Performance
                    </Text>
                  </div>

                  {performanceExpanded && (
                    <div className={styles.sectionSubMl24}>
                      {/* Efficiency Checkbox */}
                      <div className={styles.sectionMb16}>
                        <label className={styles.formLabel}>
                          <input
                            type="checkbox"
                            defaultChecked
                            className={styles.radioMargin}
                          />
                          <Text className={styles.formText}>Efficiency</Text>
                        </label>
                      </div>

                      {/* Acceptable Latency */}
                      <div>
                        <Text className={styles.formTextBlock}>
                          Acceptable latency
                        </Text>
                        <div className={styles.sectionMb8}>
                          <label className={styles.formLabel}>
                            <input
                              type="radio"
                              name="latency"
                              value="low"
                              defaultChecked
                              className={styles.radioMargin}
                            />
                            <Text className={styles.formText}>Low</Text>
                          </label>
                        </div>
                        <div>
                          <label className={styles.formLabel}>
                            <input
                              type="radio"
                              name="latency"
                              value="high"
                              className={styles.radioMargin}
                            />
                            <Text className={styles.formText}>High</Text>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Compliance Section - Collapsed */}
                <div className={styles.sectionMb16}>
                  <div
                    className={mergeClasses(
                      styles.sectionExpanderRow,
                      complianceExpanded && styles.sectionExpanderRowOpen,
                    )}
                    onClick={() => setComplianceExpanded(!complianceExpanded)}
                  >
                    {complianceExpanded ? (
                      <ChevronDown16Regular className={styles.radioMargin} />
                    ) : (
                      <ChevronRight16Regular className={styles.radioMargin} />
                    )}
                    <Text className={styles.sectionHeaderText}>Compliance</Text>
                  </div>

                  {complianceExpanded && (
                    <div className={styles.sectionSubMl24}>
                      <div className={styles.sectionMb12}>
                        <label className={styles.formLabel}>
                          <input
                            type="checkbox"
                            className={styles.radioMargin}
                          />
                          <Text className={styles.formText}>GDPR</Text>
                        </label>
                      </div>
                      <div className={styles.sectionMb12}>
                        <label className={styles.formLabel}>
                          <input
                            type="checkbox"
                            className={styles.radioMargin}
                          />
                          <Text className={styles.formText}>HIPAA</Text>
                        </label>
                      </div>
                      <div className={styles.sectionMb12}>
                        <label className={styles.formLabel}>
                          <input
                            type="checkbox"
                            className={styles.radioMargin}
                          />
                          <Text className={styles.formText}>SOC 2</Text>
                        </label>
                      </div>
                      <div>
                        <label className={styles.formLabel}>
                          <input
                            type="checkbox"
                            className={styles.radioMargin}
                          />
                          <Text className={styles.formText}>PCI-DSS</Text>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cost Section - Collapsed */}
                <div className={styles.sectionMb24}>
                  <div
                    className={mergeClasses(
                      styles.sectionExpanderRow,
                      costExpanded && styles.sectionExpanderRowOpen,
                    )}
                    onClick={() => setCostExpanded(!costExpanded)}
                  >
                    {costExpanded ? (
                      <ChevronDown16Regular className={styles.radioMargin} />
                    ) : (
                      <ChevronRight16Regular className={styles.radioMargin} />
                    )}
                    <Text className={styles.sectionHeaderText}>Cost</Text>
                  </div>

                  {costExpanded && (
                    <div className={styles.sectionSubMl24}>
                      <div className={styles.sectionMb8}>
                        <label className={styles.formLabel}>
                          <input
                            type="checkbox"
                            defaultChecked
                            className={styles.radioMargin}
                          />
                          <Text className={styles.formText}>Optimized</Text>
                        </label>
                      </div>
                      <div>
                        <label className={styles.formLabel}>
                          <input
                            type="checkbox"
                            className={styles.radioMargin}
                          />
                          <Text className={styles.formText}>Set a budget</Text>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className={styles.drawerFooter}>
                <FluentButton
                  appearance="primary"
                  onClick={() => {
                    setGoalsConfigured(true);
                    setIsDrawerOpen(false);
                  }}
                >
                  Save Goals
                </FluentButton>
                <FluentButton
                  appearance="secondary"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Cancel
                </FluentButton>
              </div>
            </div>

            <style>{`
              @keyframes slideInRight {
                from {
                  transform: translateX(100%);
                }
                to {
                  transform: translateX(0);
                }
              }
            `}</style>
          </>
        )}
      </div>
    </FluentProvider>
  );
};

/** Level 2 project detail page with tabbed views (overview/resources/settings/monitoring),
 * collapsible resiliency/security/cost sections, and a goals configuration drawer.
 * Composed from: TopNav or AzureHeaderP1, TabList, GaugeChart, collapsible checkbox sections.
 * Instead of: building project detail views with inline tab management and configuration drawers. */
const Level2ProjectDetail = ({
  experienceLevel,
  projectName,
  onBack,
  customHeader,
  useTopNav,
}: Level2ProjectDetailProps) => {
  return (
    <Level2ProjectDetailContent
      experienceLevel={experienceLevel}
      projectName={projectName}
      onBack={onBack}
      customHeader={customHeader}
      useTopNav={useTopNav}
    />
  );
};

export default Level2ProjectDetail;
