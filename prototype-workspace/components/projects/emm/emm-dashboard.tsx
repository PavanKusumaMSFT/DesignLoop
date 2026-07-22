"use client";

import { useState } from "react";
import {
  makeStyles,
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
} from "@fluentui/react-components";
import {
  Info12Regular,
  ChevronLeft20Regular,
  ChevronRight20Regular,
  Sparkle20Regular,
  CheckmarkCircle16Filled,
  Warning16Filled,
  ArrowSync16Regular,
} from "@fluentui/react-icons";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import { NavigationProvider } from "../../../lib/navigation-context";
import PageBreadcrumb from "../../shared/page-breadcrumb";
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
  pageTitle: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "36px",
  },
  creditsBadge: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  creditsBadgeText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    lineHeight: tokens.lineHeightBase200,
  },

  /* Top actions */
  sectionTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
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
  actionCardIconAlert: {
    width: "36px",
    height: "36px",
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: "#fdf3f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  actionCardIconCost: {
    width: "36px",
    height: "36px",
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: "#f0fdf4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
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

  /* Management services */
  mgmtServicesGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: tokens.spacingHorizontalL,
  },
  mgmtCard: {
    padding: tokens.spacingHorizontalXXL,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
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
    borderRadius: tokens.borderRadiusMedium,
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

  /* Carousel */
  carouselNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingHorizontalS,
  },
  carouselDots: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  dotActive: {
    width: "16px",
    height: "8px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralForeground1,
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralStroke2,
  },

  /* Subscriptions table */
  subscriptionsSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    padding: tokens.spacingHorizontalXXL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  subscriptionsHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  subscriptionsTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  subscriptionIconContainer: {
    width: "28px",
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorBrandForeground1,
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
  statusDotGreen: {
    width: "8px",
    height: "8px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorPaletteGreenForeground1,
    flexShrink: 0,
  },
  percentLink: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
    cursor: "pointer",
  },
  subscriptionIcon: {
    width: "16px",
    height: "16px",
  },
  resourceNameCell: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  tableHeaderCell: {
    fontWeight: tokens.fontWeightSemibold,
  },

  /* Enable EMM card */
  enableCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "16px",
    boxShadow: tokens.shadow4,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  enableCardHeader: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    paddingTop: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
  },
  enableCardHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    width: "100%",
  },
  enableCardIconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: "#f3f4fd",
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  enableCardHeaderTextWrapper: {
    display: "flex",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
  },
  enableCardBody: {
    flex: "1",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
  },
  enableCardInner: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "16px",
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  enableCardInnerContent: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  enableCardTextGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacingVerticalXS,
  },
  enableCardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  enableCardDesc: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  enableCardStatsRow: {
    display: "flex",
    gap: tokens.spacingHorizontalXXL,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
  },
  enableCardStatItem: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  enableCardStatLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  enableCardStatValue: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  enableCardStatValueGreen: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  enableCardAddonsText: {
    fontSize: tokens.fontSizeBase100,
    fontStyle: "italic",
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  enableCardFooter: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalL,
  },
});

const subscriptions = [
  {
    name: "Sub-01",
    status: "Enabled",
    statusType: "enabled" as const,
    percent: "100%",
    excluded: 0,
  },
  {
    name: "Sub-02",
    status: "Enabled",
    statusType: "enabled" as const,
    percent: "100%",
    excluded: 0,
  },
  {
    name: "Sub-03",
    status: "Enabled",
    statusType: "enabled" as const,
    percent: "100%",
    excluded: 0,
  },
  {
    name: "Sub-04",
    status: "Enabled",
    statusType: "enabled" as const,
    percent: "90%",
    excluded: 5,
  },
  {
    name: "Sub-05",
    status: "Processing",
    statusType: "processing" as const,
    percent: "N/A",
    excluded: "N/A" as const,
  },
  {
    name: "Sub-06",
    status: "Unable to register",
    statusType: "error" as const,
    percent: "N/A",
    excluded: "N/A" as const,
  },
  {
    name: "Sub-07",
    status: "Enabled",
    statusType: "enabled" as const,
    percent: "80%",
    excluded: 1,
  },
];

export interface EmmDashboardProps {
  isDarkMode?: boolean;
  onHome?: () => void;
  onBack?: () => void;
  onSubscriptionClick?: (name: string) => void;
  onNavigateToComputeInfra?: () => void;
  onNavigateToSubscriptions?: () => void;
  onNavigateToEnable?: () => void;
  onSearchSelect?: (item: string) => void;
}

/** Essential Machine Management dashboard — Top actions, Management services (Update manager, Machine configuration, Change tracking), and Subscriptions table. */
export default function EmmDashboard({
  isDarkMode = false,
  onHome,
  onBack,
  onSubscriptionClick,
  onNavigateToComputeInfra,
  onNavigateToSubscriptions,
  onNavigateToEnable,
  onSearchSelect,
}: EmmDashboardProps) {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<string>("recently-viewed");
  const [showEnableBlade, setShowEnableBlade] = useState(false);

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
              label: onNavigateToSubscriptions
                ? "Subscriptions"
                : onNavigateToComputeInfra
                  ? "Compute Infrastructure"
                  : "Azure Arc",
              onClick:
                onNavigateToSubscriptions || onNavigateToComputeInfra || onBack,
            },
            { label: "Essential Machine Management" },
          ]}
        />

        <div className={styles.content}>
          {/* Title row */}
          <div className={styles.titleRow}>
            <Text className={styles.pageTitle}>
              Essential Machine Management
            </Text>
            <div className={styles.creditsBadge}>
              <Text className={styles.creditsBadgeText}>
                $157 in credits - Expires Aug 25, 2026
              </Text>
              <Info12Regular />
            </div>
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
              {/* Manage and operations card */}
              <div className={styles.enableCard}>
                <div className={styles.enableCardHeader}>
                  <div className={styles.enableCardHeaderRow}>
                    <div className={styles.enableCardIconContainer}>
                      <img
                        src="/azure-service-icons/compute/02112-icon-service-Automanaged-VM.svg"
                        alt=""
                        width={18}
                        height={18}
                      />
                    </div>
                    <div className={styles.enableCardHeaderTextWrapper}>
                      <Text className={styles.sectionTitle}>
                        Manage and operations
                      </Text>
                    </div>
                  </div>
                </div>
                <div className={styles.enableCardBody}>
                  <div className={styles.enableCardInner}>
                    <div className={styles.enableCardInnerContent}>
                      <div className={styles.enableCardTextGroup}>
                        <Badge appearance="filled" color="success" size="small">
                          New
                        </Badge>
                        <Text className={styles.enableCardTitle}>
                          Essential Machine Management
                        </Text>
                        <Text className={styles.enableCardDesc}>
                          Manage and secure your machines at scale, all in one
                          place.
                        </Text>
                      </div>
                      <div className={styles.enableCardStatsRow}>
                        <div className={styles.enableCardStatItem}>
                          <Text className={styles.enableCardStatLabel}>
                            Cost
                          </Text>
                          <Text className={styles.enableCardStatValue}>
                            Free
                          </Text>
                          <Text className={styles.enableCardAddonsText}>
                            add-ons available
                          </Text>
                        </div>
                        <div className={styles.enableCardStatItem}>
                          <Text className={styles.enableCardStatLabel}>
                            Estimated monthly savings
                          </Text>
                          <Text className={styles.enableCardStatValueGreen}>
                            $5,773.77
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.enableCardFooter}>
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
                    appearance="primary"
                    size="small"
                    onClick={() =>
                      onNavigateToEnable
                        ? onNavigateToEnable()
                        : setShowEnableBlade(true)
                    }
                  >
                    Enable
                  </Button>
                </div>
              </div>

              {/* Alert card */}
              <Card className={styles.actionCard}>
                <div className={styles.actionCardHeader}>
                  <div className={styles.actionCardHeaderLeft}>
                    <div className={styles.actionCardIconAlert}>
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

              {/* Cost recommendation card */}
              <Card className={styles.actionCard}>
                <div className={styles.actionCardHeader}>
                  <div className={styles.actionCardHeaderLeft}>
                    <div className={styles.actionCardIconCost}>
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
            <Text className={styles.sectionTitle}>Management services</Text>
            <div className={styles.mgmtServicesGrid}>
              {/* Update manager */}
              <Card className={styles.mgmtCard}>
                <div className={styles.mgmtCardHeader}>
                  <div className={styles.mgmtCardHeaderLeft}>
                    <div
                      className={`${styles.mgmtCardIcon} ${styles.mgmtCardIconBlue}`}
                    >
                      <img
                        src="/azure-service-icons/management + governance/00471-icon-service-Azure-Lighthouse.svg"
                        alt=""
                        className={styles.iconImg}
                      />
                    </div>
                    <Text className={styles.mgmtCardTitle}>Update manager</Text>
                  </div>
                  <Badge appearance="tint" color="success" size="small">
                    Up to date
                  </Badge>
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

              {/* Machine configuration */}
              <Card className={styles.mgmtCard}>
                <div className={styles.mgmtCardHeader}>
                  <div className={styles.mgmtCardHeaderLeft}>
                    <div
                      className={`${styles.mgmtCardIcon} ${styles.mgmtCardIconPurple}`}
                    >
                      <img
                        src="/azure-service-icons/management + governance/10316-icon-service-Policy.svg"
                        alt=""
                        className={styles.iconImg}
                      />
                    </div>
                    <Text className={styles.mgmtCardTitle}>
                      Machine configuration
                    </Text>
                  </div>
                  <Badge appearance="tint" color="danger" size="small">
                    Needs attention
                  </Badge>
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

              {/* Change tracking */}
              <Card className={styles.mgmtCard}>
                <div className={styles.mgmtCardHeader}>
                  <div className={styles.mgmtCardHeaderLeft}>
                    <div
                      className={`${styles.mgmtCardIcon} ${styles.mgmtCardIconTeal}`}
                    >
                      <img
                        src="/azure-service-icons/management + governance/00009-icon-service-Log-Analytics-Workspaces.svg"
                        alt=""
                        className={styles.iconImg}
                      />
                    </div>
                    <Text className={styles.mgmtCardTitle}>
                      Change tracking
                    </Text>
                  </div>
                  <Badge appearance="tint" color="success" size="small">
                    Up to date
                  </Badge>
                </div>
                <div className={styles.mgmtCardBody}>
                  <Text className={styles.mgmtCardDesc}>
                    Extension is installed.{"\n"}Workspace is identified.
                  </Text>
                  <div className={styles.mgmtStatsRow}>
                    <div className={styles.mgmtStatItem}>
                      <Text className={styles.mgmtStatLabel}>
                        Changes in the last 24 hours
                      </Text>
                      <Text className={styles.mgmtStatValue}>2</Text>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Carousel nav */}
          <div className={styles.carouselNav}>
            <Button
              appearance="transparent"
              size="small"
              icon={<ChevronLeft20Regular />}
            />
            <div className={styles.carouselDots}>
              <div className={styles.dotActive} />
              <div className={styles.dot} />
              <div className={styles.dot} />
            </div>
            <Button
              appearance="transparent"
              size="small"
              icon={<ChevronRight20Regular />}
            />
          </div>

          {/* ── Subscriptions with enrolled machines ── */}
          <div className={styles.subscriptionsSection}>
            <div className={styles.subscriptionsHeader}>
              <div className={styles.subscriptionIconContainer}>
                <img
                  src="/azure-service-icons/general/10002-icon-service-Subscriptions.svg"
                  alt=""
                  className={styles.subscriptionIcon}
                />
              </div>
              <Text className={styles.subscriptionsTitle}>
                Subscriptions with enrolled machines
              </Text>
            </div>

            <TabList
              selectedValue={activeTab}
              onTabSelect={(_, data) => setActiveTab(data.value as string)}
              size="small"
            >
              <Tab value="recently-viewed">Recently viewed</Tab>
              <Tab value="favorites">Favorites</Tab>
            </TabList>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    Resource name
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    Status
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    Percent enabled
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    Excluded resources
                  </TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map((sub) => (
                  <TableRow key={sub.name}>
                    <TableCell>
                      <div className={styles.resourceNameCell}>
                        <img
                          src="/azure-service-icons/general/10002-icon-service-Subscriptions.svg"
                          alt=""
                          className={styles.subscriptionIcon}
                        />
                        <Link
                          className={styles.resourceLink}
                          onClick={() => onSubscriptionClick?.(sub.name)}
                        >
                          {sub.name}
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={styles.statusCell}>
                        {sub.statusType === "enabled" && (
                          <>
                            <CheckmarkCircle16Filled
                              style={{
                                color: tokens.colorPaletteGreenForeground1,
                              }}
                            />
                            <Text className={styles.tableCell}>
                              {sub.status}
                            </Text>
                          </>
                        )}
                        {sub.statusType === "processing" && (
                          <>
                            <ArrowSync16Regular
                              style={{ color: tokens.colorBrandForeground1 }}
                            />
                            <Text className={styles.tableCell}>
                              {sub.status}
                            </Text>
                          </>
                        )}
                        {sub.statusType === "error" && (
                          <>
                            <Warning16Filled
                              style={{
                                color: tokens.colorPaletteYellowForeground1,
                              }}
                            />
                            <Text className={styles.tableCell}>
                              {sub.status}
                            </Text>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {sub.percent !== "N/A" ? (
                        <Link className={styles.percentLink}>
                          {sub.percent}
                        </Link>
                      ) : (
                        <Text className={styles.tableCell}>N/A</Text>
                      )}
                    </TableCell>
                    <TableCell>
                      <Text className={styles.tableCell}>
                        {typeof sub.excluded === "number"
                          ? sub.excluded
                          : sub.excluded}
                      </Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <EmmEnableBlade
        isOpen={showEnableBlade}
        onClose={() => setShowEnableBlade(false)}
      />
    </NavigationProvider>
  );
}
