"use client";

import { useState, useEffect, useRef } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Badge,
  TabList,
  Tab,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Link,
} from "@fluentui/react-components";
import {
  Info12Regular,
  Search24Regular,
  TableCursor24Regular,
  TextAsterisk20Filled,
  History24Regular,
  Sparkle24Regular,
  ChevronLeft20Regular,
  ChevronRight20Regular,
  ShieldCheckmark20Regular,
  ArrowSync20Regular,
} from "@fluentui/react-icons";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import { NavigationProvider } from "../../../lib/navigation-context";
import PageBreadcrumb from "../../shared/page-breadcrumb";
import EmmCreateVm from "./vm-create";
import DaynComputeInfrastructure from "./dayn-compute-infrastructure";
import EmmEnableBlade from "./emm-enable-blade";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  content: {
    maxWidth: "1340px",
    margin: "0 auto",
    padding: "48px 32px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },

  /* -- Title row -- */
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pageTitle: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "40px",
    color: tokens.colorNeutralForeground1,
  },
  creditsBadge: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    backgroundColor: tokens.colorBrandBackground2,
    border: `1px solid ${tokens.colorBrandStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    height: "32px",
  },
  creditsBadgeText: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: "#115ea3",
    lineHeight: tokens.lineHeightBase200,
  },
  creditsBadgeIcon: {
    color: "#115ea3",
  },

  /* -- Get Started card -- */
  getStartedCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "16px",
    boxShadow: tokens.shadow4,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  cardHeader: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    paddingTop: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
  },
  cardHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  getStartedIconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: "#fdf3f4",
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  getStartedSubtitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
    display: "block",
    marginBottom: tokens.spacingVerticalXS,
  },
  getStartedDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
    display: "block",
  },
  getStartedLink: {
    color: "#115ea3",
    textDecoration: "underline",
    cursor: "pointer",
  },
  cardBody: {
    flex: "1",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
  },
  getStartedBodyInner: {
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
  },
  heroArea: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "261px",
  },
  heroContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalXS,
    textAlign: "center" as const,
  },
  heroTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  heroDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
    maxWidth: "339px",
    textAlign: "center" as const,
  },
  cardFooter: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalL,
  },

  /* -- Two-card row -- */
  threeCardRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 1100px)": {
      gridTemplateColumns: "1fr 1fr",
    },
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  summaryCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "16px",
    boxShadow: tokens.shadow4,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "305px",
  },
  findVmIconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: "#f3f4fd",
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  findVmIcon: {
    color: tokens.colorNeutralForeground1,
  },
  compareCardHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    width: "100%",
  },
  compareCardHeaderTextWrapper: {
    display: "flex",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
  },
  compareCardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  cardTimestamp: {
    fontSize: "10px",
    color: tokens.colorNeutralForeground3,
    lineHeight: "14px",
  },
  cardBodyInner: {
    flex: "1",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
  },
  innerHeroArea: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  /* -- Two-card row -- */
  twoCardRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },
  fixedHeightCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "16px",
    boxShadow: tokens.shadow4,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "305px",
  },
  iconContainerPurple: {
    width: "36px",
    height: "36px",
    backgroundColor: "#f3f4fd",
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  placeholderRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalM,
    flex: "1",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
  },
  recommendationCard: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingHorizontalM,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  recommendationIconRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  recommendationIconBox: {
    width: "28px",
    height: "28px",
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  recommendationTag: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase100,
  },
  recommendationTitle: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase200,
  },
  recommendationDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  manageHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    width: "100%",
  },
  manageHeaderTextWrapper: {
    display: "flex",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
  },
  manageBody: {
    flex: "1",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
  },
  manageInner: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "16px",
    padding: "14px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  manageInnerContent: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  accentBar: {
    height: "3px",
    borderRadius: tokens.borderRadiusMedium,
    background: "linear-gradient(90deg, #0078D4, #005A9E, #0078D4)",
    marginBottom: tokens.spacingVerticalXS,
  },
  manageTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  manageTextGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacingVerticalXS,
  },
  manageTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  manageDesc: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  statsRow: {
    display: "flex",
    gap: tokens.spacingHorizontalXXL,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  savingsLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  savingsValue: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  addonsText: {
    fontSize: tokens.fontSizeBase100,
    fontStyle: "italic",
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  savingsValueGreen: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  carouselNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingHorizontalS,
    width: "100%",
  },
  carouselDots: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingVerticalXS,
  },
  dotActive: {
    width: "16px",
    height: "8px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralForeground2,
  },
  dotInactive: {
    width: "8px",
    height: "8px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralForeground2,
    opacity: 0.3,
  },

  /* -- Resources section -- */
  resourcesCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow4,
    overflow: "hidden",
  },
  resourcesHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
  },
  resourcesIconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  resourcesBody: {
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalXXL,
  },
  emptyStateTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
    textAlign: "center" as const,
  },
  emptyStateDesc: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
    textAlign: "center" as const,
  },
  tableHeaderCell: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
  resourceNameCell: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  resourceIcon: {
    width: "20px",
    height: "20px",
    flexShrink: 0,
  },
  resourceLink: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
    cursor: "pointer",
  },
  tableCell: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  tabsArea: {
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
  },
  resourcesCardBody: {
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
  },
  viewAllLink: {
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
  },
});

const resources = [
  {
    name: "Compute-vmss",
    resourceGroup: "rg-01",
    subscription: "sub-01",
    location: "Australia East",
    type: "Virtual machine scale set",
    icon: "/azure-service-icons/compute/10034-icon-service-VM-Scale-Sets.svg",
  },
  {
    name: "Contoso-vm",
    resourceGroup: "rg-03",
    subscription: "sub-03",
    location: "West US 2",
    type: "Virtual machine",
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Compute-vm2",
    resourceGroup: "rg-04",
    subscription: "sub-04",
    location: "West US 2",
    type: "Virtual machine",
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Prod-vmss-01",
    resourceGroup: "rg-02",
    subscription: "sub-01",
    location: "East US",
    type: "Virtual machine scale set",
    icon: "/azure-service-icons/compute/10034-icon-service-VM-Scale-Sets.svg",
  },
  {
    name: "Api-gateway-vm",
    resourceGroup: "rg-05",
    subscription: "sub-02",
    location: "West Europe",
    type: "Virtual machine",
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Backend-vmss",
    resourceGroup: "rg-06",
    subscription: "sub-01",
    location: "East US 2",
    type: "Virtual machine scale set",
    icon: "/azure-service-icons/compute/10034-icon-service-VM-Scale-Sets.svg",
  },
  {
    name: "Contoso-db-vm",
    resourceGroup: "rg-03",
    subscription: "sub-03",
    location: "West US 2",
    type: "Virtual machine",
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Monitoring-vm",
    resourceGroup: "rg-07",
    subscription: "sub-02",
    location: "North Europe",
    type: "Virtual machine",
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Dev-vm-01",
    resourceGroup: "rg-08",
    subscription: "sub-01",
    location: "Central US",
    type: "Virtual machine",
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Staging-vmss",
    resourceGroup: "rg-09",
    subscription: "sub-02",
    location: "UK South",
    type: "Virtual machine scale set",
    icon: "/azure-service-icons/compute/10034-icon-service-VM-Scale-Sets.svg",
  },
  {
    name: "Build-agent-vm",
    resourceGroup: "rg-05",
    subscription: "sub-02",
    location: "West Europe",
    type: "Virtual machine",
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Contoso-web-vmss",
    resourceGroup: "rg-03",
    subscription: "sub-03",
    location: "West US 2",
    type: "Virtual machine scale set",
    icon: "/azure-service-icons/compute/10034-icon-service-VM-Scale-Sets.svg",
  },
  {
    name: "Jump-box-vm",
    resourceGroup: "rg-10",
    subscription: "sub-01",
    location: "East US",
    type: "Virtual machine",
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Load-test-vmss",
    resourceGroup: "rg-04",
    subscription: "sub-04",
    location: "West US 2",
    type: "Virtual machine scale set",
    icon: "/azure-service-icons/compute/10034-icon-service-VM-Scale-Sets.svg",
  },
  {
    name: "Analytics-vm",
    resourceGroup: "rg-06",
    subscription: "sub-01",
    location: "East US 2",
    type: "Virtual machine",
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
];

/** Compute Infrastructure landing page — shown after clicking "Compute Infrastructure" from search results. */
export default function ComputeInfrastructure({
  isDarkMode = false,
  onHome,
  scrollToVmGrid = false,
  onNavigateToDashboardDetails,
  onNavigateToDashboard,
  onSearchSelect,
}: {
  isDarkMode?: boolean;
  onHome?: () => void;
  scrollToVmGrid?: boolean;
  onNavigateToDashboardDetails?: () => void;
  onNavigateToDashboard?: () => void;
  onSearchSelect?: (item: string) => void;
}) {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<string>("recently-viewed");
  const [showCreateVm, setShowCreateVm] = useState(false);
  const [showDayN, setShowDayN] = useState(false);
  const [showEnableBlade, setShowEnableBlade] = useState(false);
  const vmGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToVmGrid && vmGridRef.current) {
      setTimeout(() => {
        vmGridRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [scrollToVmGrid]);

  if (showCreateVm) {
    return (
      <EmmCreateVm
        onBack={() => setShowCreateVm(false)}
        onHome={onHome}
        onNavigateToComputeInfra={() => {
          setShowCreateVm(false);
          setShowDayN(true);
        }}
        onNavigateToDashboardDetails={onNavigateToDashboardDetails}
      />
    );
  }

  if (showDayN) {
    return (
      <DaynComputeInfrastructure isDarkMode={isDarkMode} onHome={onHome} />
    );
  }
  return (
    <NavigationProvider>
      <div className={styles.root}>
        <AzureHeaderBuildMVP
          isDarkMode={isDarkMode}
          onLogoClick={onHome}
          onSuggestionSelect={onSearchSelect}
        />

        <PageBreadcrumb
          noBorder
          items={[
            { label: "Home", onClick: onHome },
            { label: "Compute infrastructure" },
          ]}
        />

        <div className={styles.content}>
          {/* -- Title -- */}
          <div className={styles.titleRow}>
            <Text className={styles.pageTitle}>Compute infrastructure</Text>
            <div className={styles.creditsBadge}>
              <Text className={styles.creditsBadgeText}>
                $157 in credits - Expires Aug 25, 2026
              </Text>
              <Info12Regular className={styles.creditsBadgeIcon} />
            </div>
          </div>

          {/* -- Get Started + Find + Compare row -- */}
          <div className={styles.threeCardRow}>
            {/* Get Started */}
            <div className={styles.summaryCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.getStartedIconContainer}>
                    <img
                      src="/azure-service-icons/compute/10030-icon-service-Cloud-Services-(Classic).svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </div>
                  <Text className={styles.sectionTitle}>Get started</Text>
                </div>
              </div>

              <div className={styles.cardBodyInner}>
                <div className={styles.innerHeroArea}>
                  <div className={styles.heroContent}>
                    <TextAsterisk20Filled />
                    <Text className={styles.heroTitle}>
                      Create a virtual machine
                    </Text>
                    <Text className={styles.heroDesc}>
                      Set up a scalable compute resource to run applications,
                      store data, and manage workloads in the cloud.
                    </Text>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <Button
                  appearance="outline"
                  size="small"
                  onClick={() =>
                    window.open(
                      "https://learn.microsoft.com/en-us/azure/operations/configuration-enrollment",
                      "_blank",
                    )
                  }
                >
                  Documentation
                </Button>
                <Button
                  appearance="primary"
                  size="small"
                  onClick={() => setShowCreateVm(true)}
                >
                  Create
                </Button>
              </div>
            </div>

            {/* Find the right VM solution */}
            <div className={styles.summaryCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.findVmIconContainer}>
                    <Search24Regular className={styles.findVmIcon} />
                  </div>
                  <Text className={styles.sectionTitle}>
                    Find the right VM solution
                  </Text>
                </div>
              </div>

              <div className={styles.cardBodyInner}>
                <div className={styles.innerHeroArea}>
                  <div className={styles.heroContent}>
                    <Search24Regular />
                    <Text className={styles.heroTitle}>
                      Find the best product for your workload
                    </Text>
                    <Text className={styles.heroDesc}>
                      Answer three quick questions about your workload,
                      environment, and preferred capabilities, and we&apos;ll
                      tell you which product can help you the most.
                    </Text>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <Button appearance="outline" size="small">
                  Find the right VM solution
                </Button>
              </div>
            </div>

            {/* Compare and create VM solutions */}
            <div className={styles.summaryCard}>
              <div className={styles.cardHeader}>
                <div className={styles.compareCardHeaderRow}>
                  <div className={styles.findVmIconContainer}>
                    <TableCursor24Regular className={styles.findVmIcon} />
                  </div>
                  <div className={styles.compareCardHeaderTextWrapper}>
                    <Text className={styles.compareCardTitle}>
                      Compare and create VM solutions
                    </Text>
                  </div>
                </div>
              </div>

              <div className={styles.cardBodyInner}>
                <div className={styles.innerHeroArea}>
                  <div className={styles.heroContent}>
                    <TableCursor24Regular />
                    <Text className={styles.heroTitle}>
                      Compare VM products side by side, or just start building
                    </Text>
                    <Text className={styles.heroDesc}>
                      From scalability and capacity to batch management and cost
                      savings, compare features, specs, and key differences - or
                      just start creating.
                    </Text>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <Button appearance="outline" size="small">
                  Compare and create VM solutions
                </Button>
              </div>
            </div>
          </div>

          {/* -- Recommended actions + Manage and operations -- */}
          <div className={styles.twoCardRow}>
            {/* Recommended actions */}
            <div className={styles.fixedHeightCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.iconContainerPurple}>
                    <Sparkle24Regular />
                  </div>
                  <Text className={styles.sectionTitle}>
                    Recommended actions
                  </Text>
                </div>
              </div>
              <div className={styles.placeholderRow}>
                <div className={styles.recommendationCard}>
                  <div className={styles.recommendationIconRow}>
                    <div
                      className={styles.recommendationIconBox}
                      style={{ backgroundColor: "#e8f5e9" }}
                    >
                      <ShieldCheckmark20Regular style={{ color: "#107c10" }} />
                    </div>
                    <Text className={styles.recommendationTag}>Security</Text>
                  </div>
                  <Text className={styles.recommendationTitle}>
                    Enable Azure Backup for 3 unprotected VMs
                  </Text>
                  <Text className={styles.recommendationDesc}>
                    Protect Contoso-vm, Compute-vm2, and Api-gateway-vm from
                    data loss.
                  </Text>
                </div>
                <div className={styles.recommendationCard}>
                  <div className={styles.recommendationIconRow}>
                    <div
                      className={styles.recommendationIconBox}
                      style={{ backgroundColor: "#e3f2fd" }}
                    >
                      <ArrowSync20Regular style={{ color: "#0078d4" }} />
                    </div>
                    <Text className={styles.recommendationTag}>
                      Cost optimization
                    </Text>
                  </div>
                  <Text className={styles.recommendationTitle}>
                    Right-size 2 underutilized VMs
                  </Text>
                  <Text className={styles.recommendationDesc}>
                    Dev-vm-01 and Monitoring-vm are using less than 5% CPU.
                    Resize to save ~$48/mo.
                  </Text>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <Button appearance="outline" size="small">
                  View all
                </Button>
              </div>
            </div>

            {/* Manage and operations */}
            <div className={styles.fixedHeightCard}>
              <div className={styles.cardHeader}>
                <div className={styles.manageHeaderRow}>
                  <div className={styles.iconContainerPurple}>
                    <img
                      src="/azure-service-icons/compute/02112-icon-service-Automanaged-VM.svg"
                      alt=""
                      width={18}
                      height={18}
                    />
                  </div>
                  <div className={styles.manageHeaderTextWrapper}>
                    <Text className={styles.sectionTitle}>
                      Manage and operations
                    </Text>
                  </div>
                </div>
              </div>
              <div className={styles.manageBody}>
                <div className={styles.manageInner}>
                  <div className={styles.manageInnerContent}>
                    <div className={styles.manageTextGroup}>
                      <Badge appearance="filled" color="success" size="small">
                        New
                      </Badge>
                      <Text className={styles.manageTitle}>
                        Essential Machine Management
                      </Text>
                      <Text className={styles.manageDesc}>
                        Manage and secure your machines at scale, all in one
                        place.
                      </Text>
                    </div>
                    <div className={styles.statsRow}>
                      <div className={styles.statItem}>
                        <Text className={styles.savingsLabel}>Cost</Text>
                        <Text className={styles.savingsValue}>Free</Text>
                        <Text className={styles.addonsText}>
                          add-ons available
                        </Text>
                      </div>
                      <div className={styles.statItem}>
                        <Text className={styles.savingsLabel}>
                          Estimated monthly savings
                        </Text>
                        <Text className={styles.savingsValueGreen}>
                          $5,773.77
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <Button
                  appearance="outline"
                  size="small"
                  onClick={() =>
                    window.open(
                      "https://learn.microsoft.com/en-us/azure/operations/configuration-enrollment",
                      "_blank",
                    )
                  }
                >
                  Documentation
                </Button>
                <Button appearance="outline" size="small">
                  Pricing
                </Button>
                <Button
                  appearance="secondary"
                  size="small"
                  onClick={onNavigateToDashboard}
                >
                  View dashboard
                </Button>
                <Button
                  appearance="primary"
                  size="small"
                  onClick={() => setShowEnableBlade(true)}
                >
                  Enable
                </Button>
              </div>
            </div>
          </div>

          {/* -- Carousel nav -- */}
          <div className={styles.carouselNav}>
            <Button
              appearance="transparent"
              size="small"
              icon={<ChevronLeft20Regular />}
            />
            <div className={styles.carouselDots}>
              <div className={styles.dotActive} />
              <div className={styles.dotInactive} />
              <div className={styles.dotInactive} />
            </div>
            <Button
              appearance="transparent"
              size="small"
              icon={<ChevronRight20Regular />}
            />
          </div>

          {/* -- Resources -- */}
          <div ref={vmGridRef} className={styles.resourcesCard}>
            <div className={styles.resourcesHeader}>
              <div className={styles.resourcesIconContainer}>
                <History24Regular style={{ color: "#0f6cbd" }} />
              </div>
              <Text className={styles.sectionTitle}>Virtual machines</Text>
            </div>

            <div className={styles.tabsArea}>
              <TabList
                selectedValue={activeTab}
                onTabSelect={(_, data) => setActiveTab(data.value as string)}
              >
                <Tab value="recently-viewed">Recently viewed</Tab>
                <Tab value="favorites">Favorites</Tab>
              </TabList>
            </div>

            <div className={styles.resourcesCardBody}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell className={styles.tableHeaderCell}>
                      Resource name
                    </TableHeaderCell>
                    <TableHeaderCell className={styles.tableHeaderCell}>
                      Resource group
                    </TableHeaderCell>
                    <TableHeaderCell className={styles.tableHeaderCell}>
                      Subscription
                    </TableHeaderCell>
                    <TableHeaderCell className={styles.tableHeaderCell}>
                      Location
                    </TableHeaderCell>
                    <TableHeaderCell className={styles.tableHeaderCell}>
                      Type
                    </TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((r) => (
                    <TableRow key={r.name}>
                      <TableCell>
                        <div className={styles.resourceNameCell}>
                          <img
                            src={r.icon}
                            alt=""
                            className={styles.resourceIcon}
                          />
                          <Link className={styles.resourceLink}>{r.name}</Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link className={styles.resourceLink}>
                          {r.resourceGroup}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link className={styles.resourceLink}>
                          {r.subscription}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Text className={styles.tableCell}>{r.location}</Text>
                      </TableCell>
                      <TableCell>
                        <Link className={styles.resourceLink}>{r.type}</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className={styles.viewAllLink}>
              <Link className={styles.resourceLink}>View all resources</Link>
            </div>
          </div>
        </div>
      </div>
      <EmmEnableBlade
        isOpen={showEnableBlade}
        onClose={() => setShowEnableBlade(false)}
        onViewDashboard={onNavigateToDashboardDetails}
      />
    </NavigationProvider>
  );
}
