"use client";

import { useState, useEffect } from "react";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  Button,
  Card,
  Link,
  Badge,
  TabList,
  Tab,
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Checkbox,
  Input,
  Divider,
} from "@fluentui/react-components";
import {
  Dismiss24Regular,
  ChevronRight20Regular,
  Sparkle20Regular,
  CheckmarkCircle16Filled,
  Warning16Filled,
  ArrowSync16Regular,
  ArrowClockwise16Regular,
  ArrowDownload16Regular,
  Filter16Regular,
  Open16Regular,
  Search16Regular,
  Add16Regular,
  ArrowTurnUpLeft20Regular,
} from "@fluentui/react-icons";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import { NavigationProvider } from "../../../lib/navigation-context";
import PageBreadcrumb from "../../shared/page-breadcrumb";

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
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "48px 32px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },

  /* Title row */
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  titleLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  pageTitle: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "36px",
  },

  /* Section headers */
  sectionTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  sectionSubtitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
  },
  sectionHeader: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },

  /* Top actions – 3 cards */
  topActionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: tokens.spacingHorizontalL,
  },
  actionCard: {
    padding: tokens.spacingHorizontalXXL,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  actionCardHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  actionCardHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  actionCardIcon: {
    width: "36px",
    height: "36px",
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  iconAlert: {
    backgroundColor: "#fdf3f4",
  },
  iconOptimize: {
    backgroundColor: "#f3f4fd",
  },
  iconCost: {
    backgroundColor: "#f0fdf4",
  },
  iconImg: {
    width: "20px",
    height: "20px",
  },
  actionCardTitleGroup: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  actionCardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  actionCardSubtitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
  },
  actionCardBody: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },

  /* Management services – 2x2 grid */
  mgmtGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
  },
  mgmtCard: {
    padding: tokens.spacingHorizontalXXL,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    cursor: "pointer",
  },
  mgmtCardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mgmtCardHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  mgmtCardIcon: {
    width: "36px",
    height: "36px",
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  mgmtCardIconBlue: {
    backgroundColor: "#f0f4ff",
  },
  mgmtCardIconPurple: {
    backgroundColor: "#f3f4fd",
  },
  mgmtCardIconTeal: {
    backgroundColor: "#f0fdf9",
  },
  mgmtCardIconGreen: {
    backgroundColor: "#f0fdf4",
  },
  mgmtIconImg: {
    width: "18px",
    height: "18px",
  },
  mgmtCardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  mgmtCardBody: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  mgmtCardDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
  },
  mgmtStatsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
  },
  mgmtStatItem: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  mgmtStatLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
  },
  mgmtStatValue: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "36px",
  },
  complianceAlert: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingHorizontalM,
  },
  complianceAlertTitle: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase200,
  },
  complianceAlertDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
  },

  /* Resources section */
  resourcesSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingHorizontalXXL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  resourcesTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  toolbarDivider: {
    height: "20px",
  },
  filterRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  filterChip: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
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
  statusCell: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
  },
  tableHeaderCell: {
    fontWeight: tokens.fontWeightSemibold,
  },
  troubleshootLink: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase200,
    cursor: "pointer",
    marginLeft: tokens.spacingHorizontalS,
  },

  /* Metrics cards */
  metricsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gap: tokens.spacingHorizontalL,
  },
  metricCard: {
    padding: tokens.spacingHorizontalL,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  metricLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
  },
  metricValue: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "36px",
  },
  metricValueGreen: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
    lineHeight: "36px",
  },
  metricSubRow: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
  },
  metricSubItem: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  metricSubLabel: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase100,
  },
  metricSubValue: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
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
});

const resources = [
  {
    name: "Contoso-vm",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Prod-web-vm-01",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Prod-web-vm-02",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Dev-vm-01",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Staging-api-vm",
    type: "Virtual machine",
    status: "Processing",
    statusType: "processing" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Db-server-vm",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Monitoring-vm",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Batch-processor-vm",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Prod-api-vm-01",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Prod-api-vm-02",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Cache-vm-01",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Load-balancer-vm",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "CI-runner-vm",
    type: "Virtual machine",
    status: "Processing",
    statusType: "processing" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Analytics-vm-01",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Gateway-vm",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Auth-service-vm",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Search-index-vm",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Logging-vm",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Dev-vm-02",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Test-runner-vm",
    type: "Virtual machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
  {
    name: "Aarc-linux-01",
    type: "Arc machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
  },
  {
    name: "Aarc-linux-02",
    type: "Arc machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
  },
  {
    name: "Aarc-win-01",
    type: "Arc machine",
    status: "Unable to register",
    statusType: "error" as const,
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
  },
  {
    name: "Aarc-win-02",
    type: "Arc machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
  },
  {
    name: "Aarc-linux-03",
    type: "Arc machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
  },
  {
    name: "Aarc-linux-04",
    type: "Arc machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
  },
  {
    name: "Aarc-win-03",
    type: "Arc machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
  },
  {
    name: "Aarc-win-04",
    type: "Arc machine",
    status: "Processing",
    statusType: "processing" as const,
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
  },
  {
    name: "Aarc-linux-05",
    type: "Arc machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
  },
  {
    name: "Aarc-rhel-01",
    type: "Arc machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
  },
  {
    name: "Aarc-rhel-02",
    type: "Arc machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
  },
  {
    name: "Aarc-ubuntu-01",
    type: "Arc machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
  },
  {
    name: "Aarc-ubuntu-02",
    type: "Arc machine",
    status: "Unable to register",
    statusType: "error" as const,
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
  },
  {
    name: "Aarc-win-05",
    type: "Arc machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
  },
  {
    name: "Aarc-suse-01",
    type: "Arc machine",
    status: "Enabled",
    statusType: "enabled" as const,
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
  },
];

const vmCount = resources.filter((r) => r.type === "Virtual machine").length;
const arcCount = resources.filter((r) => r.type === "Arc machine").length;

export interface EmmDashboardDetailsProps {
  subscriptionName?: string;
  isDarkMode?: boolean;
  source?: "azure-arc" | "compute-infrastructure";
  onHome?: () => void;
  onBack?: () => void;
  onClose?: () => void;
  onNavigateToComputeInfra?: () => void;
  onNavigateToArc?: () => void;
  onSearchSelect?: (item: string) => void;
}

/** Subscription detail page for EMM dashboard — shows Top actions, Management services (Update Manager, Machine Configuration, Inventory, Monitoring), and Resources table for a selected subscription. */
export default function EmmDashboardDetails({
  subscriptionName = "Sub-01",
  isDarkMode = false,
  source = "compute-infrastructure",
  onHome,
  onBack,
  onClose,
  onNavigateToComputeInfra,
  onNavigateToArc,
  onSearchSelect,
}: EmmDashboardDetailsProps) {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<string>("enabled");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            {
              label:
                source === "azure-arc" ? "Azure Arc" : "Compute Infrastructure",
              onClick:
                source === "azure-arc"
                  ? onNavigateToArc
                  : onNavigateToComputeInfra,
            },
            { label: "Essential Machine Management", onClick: onBack },
            { label: subscriptionName },
          ]}
        />

        <div className={styles.content}>
          {/* Title row */}
          <div className={styles.titleRow}>
            <Text className={styles.pageTitle}>{subscriptionName}</Text>
            <div className={styles.titleLeft}>
              <Button
                appearance="secondary"
                icon={<ArrowTurnUpLeft20Regular />}
                onClick={onBack}
              >
                Return to Overview
              </Button>
              <Button
                appearance="subtle"
                icon={<Dismiss24Regular />}
                onClick={onClose || onBack}
              />
            </div>
          </div>

          {/* ── Metrics ────────────────────────── */}
          <div className={styles.metricsRow}>
            <Card className={styles.metricCard}>
              <Text className={styles.metricLabel}>Machines</Text>
              <Text className={styles.metricValue}>{resources.length}</Text>
              <div className={styles.metricSubRow}>
                <div className={styles.metricSubItem}>
                  <Text className={styles.metricSubLabel}>
                    Virtual machines
                  </Text>
                  <Text className={styles.metricSubValue}>{vmCount}</Text>
                </div>
                <div className={styles.metricSubItem}>
                  <Text className={styles.metricSubLabel}>Arc machines</Text>
                  <Text className={styles.metricSubValue}>{arcCount}</Text>
                </div>
              </div>
            </Card>
            <Card className={styles.metricCard}>
              <Text className={styles.metricLabel}>Active alerts</Text>
              <Text className={styles.metricValue}>3</Text>
              <div className={styles.metricSubRow}>
                <div className={styles.metricSubItem}>
                  <Text className={styles.metricSubLabel}>Critical</Text>
                  <Text className={styles.metricSubValue}>1</Text>
                </div>
                <div className={styles.metricSubItem}>
                  <Text className={styles.metricSubLabel}>Warning</Text>
                  <Text className={styles.metricSubValue}>2</Text>
                </div>
              </div>
            </Card>
            <Card className={styles.metricCard}>
              <Text className={styles.metricLabel}>Compliance</Text>
              <Text className={styles.metricValueGreen}>92%</Text>
              <div className={styles.metricSubRow}>
                <div className={styles.metricSubItem}>
                  <Text className={styles.metricSubLabel}>Compliant</Text>
                  <Text className={styles.metricSubValue}>11</Text>
                </div>
                <div className={styles.metricSubItem}>
                  <Text className={styles.metricSubLabel}>Non-compliant</Text>
                  <Text className={styles.metricSubValue}>1</Text>
                </div>
              </div>
            </Card>
            <Card className={styles.metricCard}>
              <Text className={styles.metricLabel}>Est. monthly savings</Text>
              <Text className={styles.metricValueGreen}>$5,773.77</Text>
              <div className={styles.metricSubRow}>
                <div className={styles.metricSubItem}>
                  <Text className={styles.metricSubLabel}>Monthly cost</Text>
                  <Text className={styles.metricSubValue}>$2,140</Text>
                </div>
                <div className={styles.metricSubItem}>
                  <Text className={styles.metricSubLabel}>Add-ons</Text>
                  <Text className={styles.metricSubValue}>$14.88</Text>
                </div>
              </div>
            </Card>
          </div>

          {/* ── Top actions ────────────────────────── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: tokens.spacingVerticalM,
            }}
          >
            <Text className={styles.sectionTitle}>Top actions</Text>
            <div className={styles.topActionsGrid}>
              {/* Alert card */}
              <Card className={styles.actionCard}>
                <div className={styles.actionCardHeader}>
                  <div className={styles.actionCardHeaderLeft}>
                    <div
                      className={mergeClasses(
                        styles.actionCardIcon,
                        styles.iconAlert,
                      )}
                    >
                      <img
                        src="/azure-service-icons/security/10241-icon-service-Microsoft-Defender-for-Cloud.svg"
                        alt=""
                        className={styles.iconImg}
                      />
                    </div>
                    <div className={styles.actionCardTitleGroup}>
                      <Text className={styles.actionCardTitle}>Alert</Text>
                      <Text className={styles.actionCardSubtitle}>
                        Security Center
                      </Text>
                    </div>
                  </div>
                  <Badge appearance="filled" color="danger" size="small">
                    Critical
                  </Badge>
                </div>
                <Text className={styles.actionCardBody}>
                  Drift detected in your desired configuration
                </Text>
                <div>
                  <Button
                    appearance="outline"
                    size="small"
                    icon={<Sparkle20Regular />}
                  >
                    Troubleshoot
                  </Button>
                </div>
              </Card>

              {/* Optimize budget card */}
              <Card className={styles.actionCard}>
                <div className={styles.actionCardHeader}>
                  <div className={styles.actionCardHeaderLeft}>
                    <div
                      className={mergeClasses(
                        styles.actionCardIcon,
                        styles.iconOptimize,
                      )}
                    >
                      <img
                        src="/azure-service-icons/management + governance/00003-icon-service-Advisor.svg"
                        alt=""
                        className={styles.iconImg}
                      />
                    </div>
                    <div className={styles.actionCardTitleGroup}>
                      <Text className={styles.actionCardTitle}>
                        Optimize budget
                      </Text>
                      <Text className={styles.actionCardSubtitle}>
                        Azure Advisor
                      </Text>
                    </div>
                  </div>
                </div>
                <Text className={styles.actionCardBody}>
                  Body text that describes the issue and the recommendation if
                  there is one.
                </Text>
                <div>
                  <Button
                    appearance="outline"
                    size="small"
                    icon={<Sparkle20Regular />}
                  >
                    Optimize
                  </Button>
                </div>
              </Card>

              {/* Cost recommendation card */}
              <Card className={styles.actionCard}>
                <div className={styles.actionCardHeader}>
                  <div className={styles.actionCardHeaderLeft}>
                    <div
                      className={mergeClasses(
                        styles.actionCardIcon,
                        styles.iconCost,
                      )}
                    >
                      <img
                        src="/azure-service-icons/management + governance/00003-icon-service-Advisor.svg"
                        alt=""
                        className={styles.iconImg}
                      />
                    </div>
                    <div className={styles.actionCardTitleGroup}>
                      <Text className={styles.actionCardTitle}>
                        Cost recommendation
                      </Text>
                      <Text className={styles.actionCardSubtitle}>
                        Azure Advisor
                      </Text>
                    </div>
                  </div>
                </div>
                <Text className={styles.actionCardBody}>
                  Body text that describes the issue and the recommendation if
                  there is one. <Link inline>Optional link</Link>
                </Text>
                <div>
                  <Button appearance="outline" size="small">
                    View recommendation
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* ── Management services ────────────────── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: tokens.spacingVerticalM,
            }}
          >
            <div className={styles.sectionHeader}>
              <Text className={styles.sectionTitle}>Management services</Text>
              <Text className={styles.sectionSubtitle}>
                Machine enrollment includes these services.
              </Text>
            </div>
            <div className={styles.mgmtGrid}>
              {/* Update Manager */}
              <Card className={styles.mgmtCard}>
                <div className={styles.mgmtCardHeader}>
                  <div className={styles.mgmtCardHeaderLeft}>
                    <div
                      className={mergeClasses(
                        styles.mgmtCardIcon,
                        styles.mgmtCardIconBlue,
                      )}
                    >
                      <img
                        src="/azure-service-icons/management + governance/00471-icon-service-Azure-Lighthouse.svg"
                        alt=""
                        className={styles.mgmtIconImg}
                      />
                    </div>
                    <Text className={styles.mgmtCardTitle}>Update Manager</Text>
                  </div>
                  <ChevronRight20Regular />
                </div>
                <div className={styles.mgmtCardBody}>
                  <Text className={styles.mgmtCardDesc}>
                    Extension is installed.{"\n"}Periodic sync is on.
                  </Text>
                  <div className={styles.mgmtStatsRow}>
                    <div className={styles.mgmtStatItem}>
                      <Text className={styles.mgmtStatLabel}>
                        Pending updates
                      </Text>
                      <Text className={styles.mgmtStatValue}>4</Text>
                    </div>
                    <div className={styles.mgmtStatItem}>
                      <Text className={styles.mgmtStatLabel}>
                        Failed updates
                      </Text>
                      <Text className={styles.mgmtStatValue}>0</Text>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Machine Configuration */}
              <Card className={styles.mgmtCard}>
                <div className={styles.mgmtCardHeader}>
                  <div className={styles.mgmtCardHeaderLeft}>
                    <div
                      className={mergeClasses(
                        styles.mgmtCardIcon,
                        styles.mgmtCardIconPurple,
                      )}
                    >
                      <img
                        src="/azure-service-icons/management + governance/10316-icon-service-Policy.svg"
                        alt=""
                        className={styles.mgmtIconImg}
                      />
                    </div>
                    <Text className={styles.mgmtCardTitle}>
                      Machine Configuration
                    </Text>
                  </div>
                  <ChevronRight20Regular />
                </div>
                <div className={styles.mgmtCardBody}>
                  <Text className={styles.mgmtCardDesc}>
                    Extension is installed.
                  </Text>
                  <div className={styles.mgmtStatsRow}>
                    <div className={styles.mgmtStatItem}>
                      <Text className={styles.mgmtStatLabel}>
                        Policies out of compliance
                      </Text>
                      <Text className={styles.mgmtStatValue}>2</Text>
                    </div>
                  </div>
                  <div className={styles.complianceAlert}>
                    <Text className={styles.complianceAlertTitle}>
                      Multiple policies are out of compliance
                    </Text>
                    <Text className={styles.complianceAlertDesc}>
                      Resolve this to ensure security baselines are met.
                    </Text>
                  </div>
                </div>
              </Card>

              {/* Inventory */}
              <Card className={styles.mgmtCard}>
                <div className={styles.mgmtCardHeader}>
                  <div className={styles.mgmtCardHeaderLeft}>
                    <div
                      className={mergeClasses(
                        styles.mgmtCardIcon,
                        styles.mgmtCardIconTeal,
                      )}
                    >
                      <img
                        src="/azure-service-icons/management + governance/00009-icon-service-Log-Analytics-Workspaces.svg"
                        alt=""
                        className={styles.mgmtIconImg}
                      />
                    </div>
                    <Text className={styles.mgmtCardTitle}>Inventory</Text>
                  </div>
                  <ChevronRight20Regular />
                </div>
                <div className={styles.mgmtCardBody}>
                  <Text className={styles.mgmtCardDesc}>
                    Extension is installed.{"\n"}Workspace is identified.
                  </Text>
                  <div className={styles.mgmtStatsRow}>
                    <div className={styles.mgmtStatItem}>
                      <Text className={styles.mgmtStatLabel}>
                        New software packages in last 24 hours
                      </Text>
                      <Text className={styles.mgmtStatValue}>5</Text>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Monitoring */}
              <Card className={styles.mgmtCard}>
                <div className={styles.mgmtCardHeader}>
                  <div className={styles.mgmtCardHeaderLeft}>
                    <div
                      className={mergeClasses(
                        styles.mgmtCardIcon,
                        styles.mgmtCardIconGreen,
                      )}
                    >
                      <img
                        src="/azure-service-icons/management + governance/00001-icon-service-Monitor.svg"
                        alt=""
                        className={styles.mgmtIconImg}
                      />
                    </div>
                    <Text className={styles.mgmtCardTitle}>Monitoring</Text>
                  </div>
                  <ChevronRight20Regular />
                </div>
                <div className={styles.mgmtCardBody}>
                  <Text className={styles.mgmtCardDesc}>
                    Extension is installed.{"\n"}Workspace is identified.
                  </Text>
                  <div className={styles.mgmtStatsRow}>
                    <div className={styles.mgmtStatItem}>
                      <Text className={styles.mgmtStatLabel}>
                        Perf metrics surfaced
                      </Text>
                      <Text className={styles.mgmtStatValue}>3</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* ── Resources ────────────────────────── */}
          <div className={styles.resourcesSection}>
            <Text className={styles.resourcesTitle}>
              Resources ({resources.length})
            </Text>

            <TabList
              selectedValue={activeTab}
              onTabSelect={(_, data) => setActiveTab(data.value as string)}
              size="small"
            >
              <Tab value="enabled">Enabled</Tab>
              <Tab value="excluded">Excluded</Tab>
            </TabList>

            {/* Toolbar */}
            <div className={styles.toolbar}>
              <Button
                appearance="subtle"
                size="small"
                icon={<Filter16Regular />}
              >
                Manage view
              </Button>
              <Divider vertical className={styles.toolbarDivider} />
              <Button
                appearance="subtle"
                size="small"
                icon={<ArrowClockwise16Regular />}
              >
                Refresh
              </Button>
              <Button
                appearance="subtle"
                size="small"
                icon={<ArrowDownload16Regular />}
              >
                Export to CSV
              </Button>
              <Button appearance="subtle" size="small" icon={<Open16Regular />}>
                Open query
              </Button>
            </div>

            {/* Filter row */}
            <div className={styles.filterRow}>
              <Input
                size="small"
                placeholder="Filter for any field..."
                contentBefore={<Search16Regular />}
              />
              <div className={styles.filterChip}>Subscription equals all</div>
              <Button appearance="subtle" size="small" icon={<Add16Regular />}>
                Add filter
              </Button>
            </div>

            {/* Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell style={{ width: "32px" }} />
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    Resource
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    Type
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    Status
                  </TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {resources.map((res) => (
                  <TableRow key={res.name}>
                    <TableCell style={{ width: "32px" }}>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className={styles.resourceNameCell}>
                        <img
                          src={res.icon}
                          alt=""
                          className={styles.resourceIcon}
                        />
                        <Link className={styles.resourceLink}>{res.name}</Link>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Text className={styles.tableCell}>{res.type}</Text>
                    </TableCell>
                    <TableCell>
                      <div className={styles.statusCell}>
                        {res.statusType === "enabled" && (
                          <>
                            <CheckmarkCircle16Filled
                              style={{
                                color: tokens.colorPaletteGreenForeground1,
                              }}
                            />
                            <Text className={styles.tableCell}>
                              {res.status}
                            </Text>
                          </>
                        )}
                        {res.statusType === "processing" && (
                          <>
                            <ArrowSync16Regular
                              style={{ color: tokens.colorBrandForeground1 }}
                            />
                            <Text className={styles.tableCell}>
                              {res.status}
                            </Text>
                          </>
                        )}
                        {res.statusType === "error" && (
                          <>
                            <Warning16Filled
                              style={{
                                color: tokens.colorPaletteRedForeground1,
                              }}
                            />
                            <Text className={styles.tableCell}>
                              {res.status}
                            </Text>
                            <Link inline className={styles.troubleshootLink}>
                              Troubleshoot
                            </Link>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </NavigationProvider>
  );
}
