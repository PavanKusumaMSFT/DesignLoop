"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
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
import { Alert24Regular, Info12Regular } from "@fluentui/react-icons";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import { NavigationProvider } from "../../../lib/navigation-context";
import ActionCard, { ActionCardGrid } from "../../shared/action-card";

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
    maxWidth: "1340px",
    margin: "0 auto",
    padding: "48px 32px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },

  /* ── Welcome row ──────────────────────────────── */
  welcomeRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  welcomeTitle: {
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

  /* ── Alerts + Costs row ───────────────────────── */
  summaryRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },

  /* ── Generic summary card shell ───────────────── */
  summaryCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "16px",
    boxShadow: tokens.shadow4,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
  },
  cardHeaderTextWrapper: {
    display: "flex",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  cardTimestamp: {
    fontSize: "10px",
    color: tokens.colorNeutralForeground3,
    lineHeight: "14px",
  },
  cardBody: {
    flex: "1",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
  },
  cardFooter: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalL,
  },

  /* ── Alerts card specifics ────────────────────── */
  alertIconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: "#fdf3f4",
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  alertIcon: {
    color: tokens.colorPaletteRedForeground1,
  },
  alertBodyRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalM,
    height: "100%",
  },
  alertBodyCell: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacingHorizontalL,
  },
  alertSetupContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalXS,
    textAlign: "center" as const,
  },
  alertSetupTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  alertSetupDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
    maxWidth: "211px",
    textAlign: "center" as const,
  },
  serviceIssuesContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalXS,
  },
  serviceIssuesLabel: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  serviceIssuesLabelText: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  serviceIssuesNumber: {
    fontSize: tokens.fontSizeBase700,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "36px",
  },

  /* ── Costs card specifics ─────────────────────── */
  costsIconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: "#c6e7c6",
    borderRadius: "7px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  costsBodyContainer: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "16px",
    padding: "14px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  costsBodyContent: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingHorizontalL,
  },
  costsTrialTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  costsTrialDesc: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  costsTrialDescText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  costsStatsRow: {
    display: "flex",
    alignItems: "center",
    gap: "64px",
  },
  costsStat: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  costsStatLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  costsStatLabelGreen: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorPaletteGreenForeground1,
    lineHeight: tokens.lineHeightBase200,
  },
  costsStatValue: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "32px",
  },
  costsStatValueGreen: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
    lineHeight: "32px",
  },

  /* ── Resources section ────────────────────────── */
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
  resourcesTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  resourcesBody: {
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
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
  alertsZero: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
    cursor: "pointer",
  },
  viewAllLink: {
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
  },
});

const recentResources = [
  {
    name: "Aarc-1",
    type: "Azure Arc",
    alerts: 0,
    lastViewed: "April 30, 2026",
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
  },
  {
    name: "ContosoAds",
    type: "SQL Database",
    alerts: 0,
    lastViewed: "April 30, 2026",
    icon: "/azure-service-icons/databases/10130-icon-service-SQL-Database.svg",
  },
  {
    name: "Contoso-storage",
    type: "Storage account",
    alerts: 0,
    lastViewed: "April 28, 2026",
    icon: "/azure-service-icons/storage/10086-icon-service-Storage-Accounts.svg",
  },
  {
    name: "Contoso-rg",
    type: "Resource group",
    alerts: 0,
    lastViewed: "April 27, 2026",
    icon: "/azure-service-icons/general/10007-icon-service-Resource-Groups.svg",
  },
  {
    name: "Contoso-vm",
    type: "Virtual machine",
    alerts: 0,
    lastViewed: "April 27, 2026",
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
  },
];

export interface DaynLandingPageProps {
  isDarkMode?: boolean;
  onSearchSelect?: (item: string) => void;
  onNavigateToComputeInfra?: () => void;
  onNavigateToVmOverview?: () => void;
  onNavigateToAarcManage?: () => void;
}

/** Day-N populated version of the Azure Portal Landing page — shows resources table with recent items instead of empty state. */
export default function DaynLandingPage({
  isDarkMode = false,
  onSearchSelect,
  onNavigateToComputeInfra,
  onNavigateToVmOverview,
  onNavigateToAarcManage,
}: DaynLandingPageProps) {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<string>("recently-viewed");

  return (
    <NavigationProvider>
      <div className={styles.root}>
        <AzureHeaderBuildMVP
          isDarkMode={isDarkMode}
          searchPlaceholder="Search resources, services, and docs (G+/)"
          initialShowSuggestions={false}
          onSuggestionSelect={onSearchSelect}
        />

        <div className={styles.content}>
          {/* ── Welcome ──────────────────────────────── */}
          <div className={styles.welcomeRow}>
            <Text className={styles.welcomeTitle}>Welcome back, Connie</Text>
            <div className={styles.creditsBadge}>
              <Text className={styles.creditsBadgeText}>
                $157 in credits - Expires Aug 25, 2026
              </Text>
              <Info12Regular className={styles.creditsBadgeIcon} />
            </div>
          </div>

          {/* ── Action Cards ─────────────────────────── */}
          <ActionCardGrid columns={4}>
            <ActionCard
              icon="/icons/templates.svg"
              title="Start with a template"
              description="Deploy in minutes using pre-made templates."
              onClick={() => {}}
            />
            <ActionCard
              icon="/icons/Service.svg"
              title="Explore services"
              description="Choose the right service for your use case."
              onClick={() => {}}
            />
            <ActionCard
              icon="/icons/aifoundry.svg"
              title="Build an AI agent"
              description="Create and manage AI apps and agents using the latest models."
              onClick={() => {}}
            />
            <ActionCard
              icon="/icons/github.svg"
              title="Import code from GitHub"
              description="Connect your GitHub account and deploy existing repositories."
              onClick={() => {}}
            />
          </ActionCardGrid>

          {/* ── Alerts + Costs ───────────────────────── */}
          <div className={styles.summaryRow}>
            {/* Alerts and service health */}
            <div className={styles.summaryCard}>
              <div className={styles.cardHeader}>
                <div className={styles.alertIconContainer}>
                  <Alert24Regular className={styles.alertIcon} />
                </div>
                <Text className={styles.cardTitle}>
                  Alerts and service health
                </Text>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.alertBodyRow}>
                  <div className={styles.alertBodyCell}>
                    <div className={styles.alertSetupContent}>
                      <Alert24Regular
                        style={{ color: tokens.colorNeutralForeground3 }}
                      />
                      <Text className={styles.alertSetupTitle}>
                        Set up alerts to catch issues
                      </Text>
                      <Text className={styles.alertSetupDesc}>
                        Get notified early about errors, slowdowns, and
                        unexpected behaviors.
                      </Text>
                    </div>
                  </div>
                  <div className={styles.alertBodyCell}>
                    <div className={styles.serviceIssuesContent}>
                      <div className={styles.serviceIssuesLabel}>
                        <Text className={styles.serviceIssuesLabelText}>
                          Service issues
                        </Text>
                        <Info12Regular
                          style={{ color: tokens.colorNeutralForeground3 }}
                        />
                      </div>
                      <Text className={styles.serviceIssuesNumber}>2</Text>
                      <Text className={styles.cardTimestamp}>
                        Last updated: 04/28/2026
                      </Text>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <Button appearance="outline" size="small">
                  Set up alerts
                </Button>
                <Button appearance="outline" size="small">
                  View service health
                </Button>
              </div>
            </div>

            {/* Costs */}
            <div className={styles.summaryCard}>
              <div className={styles.cardHeader}>
                <div className={styles.costsIconContainer}>
                  <img src="/icons/savings.svg" alt="" width={24} height={24} />
                </div>
                <div className={styles.cardHeaderTextWrapper}>
                  <Text className={styles.cardTitle}>Costs</Text>
                  <Text className={styles.cardTimestamp}>
                    Last updated: 04/28/2026
                  </Text>
                </div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.costsBodyContainer}>
                  <div className={styles.costsBodyContent}>
                    <div>
                      <Text className={styles.costsTrialTitle}>
                        30 days left in your free trial
                      </Text>
                      <div className={styles.costsTrialDesc}>
                        <Text className={styles.costsTrialDescText}>
                          Use your credits to cover Azure services, some
                          services are always free.
                        </Text>
                        <Info12Regular
                          style={{ color: tokens.colorNeutralForeground3 }}
                        />
                      </div>
                    </div>

                    <div className={styles.costsStatsRow}>
                      <div className={styles.costsStat}>
                        <Text className={styles.costsStatLabel}>
                          Credits spent
                        </Text>
                        <Text className={styles.costsStatValue}>$43.00</Text>
                      </div>
                      <div className={styles.costsStat}>
                        <Text className={styles.costsStatLabelGreen}>
                          Available credits
                        </Text>
                        <Text className={styles.costsStatValueGreen}>
                          $157.00
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <Button appearance="outline" size="small">
                  View costs
                </Button>
              </div>
            </div>
          </div>

          {/* ── Resources (populated) ────────────────── */}
          <div className={styles.resourcesCard}>
            <div className={styles.resourcesHeader}>
              <div className={styles.resourcesIconContainer}>
                <img
                  src="/icons/History.svg"
                  alt=""
                  width={24}
                  height={24}
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(33%) sepia(93%) saturate(1352%) hue-rotate(196deg) brightness(95%) contrast(91%)",
                  }}
                />
              </div>
              <Text className={styles.resourcesTitle}>Resources</Text>
            </div>

            <div className={styles.resourcesBody}>
              <TabList
                selectedValue={activeTab}
                onTabSelect={(_, data) => setActiveTab(data.value as string)}
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
                      Type
                    </TableHeaderCell>
                    <TableHeaderCell className={styles.tableHeaderCell}>
                      Alerts
                    </TableHeaderCell>
                    <TableHeaderCell className={styles.tableHeaderCell}>
                      Last viewed
                    </TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentResources.map((r) => (
                    <TableRow key={r.name}>
                      <TableCell>
                        <div className={styles.resourceNameCell}>
                          <img
                            src={r.icon}
                            alt=""
                            className={styles.resourceIcon}
                          />
                          <Link
                            className={styles.resourceLink}
                            onClick={
                              r.name === "Contoso-vm" && onNavigateToVmOverview
                                ? onNavigateToVmOverview
                                : r.name === "Aarc-1" && onNavigateToAarcManage
                                  ? onNavigateToAarcManage
                                  : undefined
                            }
                          >
                            {r.name}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Text className={styles.tableCell}>{r.type}</Text>
                      </TableCell>
                      <TableCell>
                        <Link className={styles.alertsZero}>{r.alerts}</Link>
                      </TableCell>
                      <TableCell>
                        <Text className={styles.tableCell}>{r.lastViewed}</Text>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className={styles.viewAllLink}>
                <Link className={styles.resourceLink}>
                  View all recent resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavigationProvider>
  );
}
