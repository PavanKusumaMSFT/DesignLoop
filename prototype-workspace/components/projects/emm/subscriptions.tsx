"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Badge,
  Card,
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
  ShieldCheckmark24Regular,
  History24Regular,
  ChevronLeft20Regular,
  ChevronRight20Regular,
  Alert24Regular,
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
    maxWidth: "1340px",
    width: "100%",
    margin: "0 auto",
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
  },

  /* -- Title -- */
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pageTitle: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "40px",
  },
  creditsBadge: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalM}`,
  },
  creditsBadgeText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
  },

  /* -- Two card row -- */
  twoCardRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
  },

  /* -- Alerts card -- */
  alertsCard: {
    padding: tokens.spacingHorizontalXXL,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  cardHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  iconContainerRed: {
    width: "36px",
    height: "36px",
    backgroundColor: "#fdf3f4",
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
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
  sectionTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase400,
  },
  alertsBody: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXL,
    flex: "1",
  },
  alertItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalS,
    textAlign: "center" as const,
  },
  alertIcon: {
    fontSize: "28px",
    color: tokens.colorNeutralForeground3,
  },
  alertItemTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  alertItemDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
    maxWidth: "200px",
  },
  alertStatItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalXS,
  },
  alertStatHeaderRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  alertStatLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
  },
  alertStatValue: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "36px",
  },
  alertStatTimestamp: {
    fontSize: "10px",
    color: tokens.colorNeutralForeground3,
    lineHeight: "14px",
  },
  cardFooter: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingTop: tokens.spacingVerticalM,
  },

  /* -- Manage card -- */
  manageCard: {
    padding: tokens.spacingHorizontalXXL,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
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
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  manageTextGroup: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    alignItems: "flex-start",
  },
  manageTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  manageDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  statsRow: {
    display: "flex",
    gap: tokens.spacingHorizontalXXL,
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
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase400,
  },
  savingsValueGreen: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
    lineHeight: tokens.lineHeightBase400,
  },
  addonsText: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase100,
  },

  /* -- Subscriptions table -- */
  subscriptionsCard: {
    padding: tokens.spacingHorizontalXXL,
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  tabsArea: {
    marginBottom: tokens.spacingVerticalS,
  },
  tableHeaderCell: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
  },
  tableCell: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase200,
  },
  resourceNameCell: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  resourceIcon: {
    width: "16px",
    height: "16px",
  },
  resourceLink: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    lineHeight: tokens.lineHeightBase200,
    cursor: "pointer",
    ":hover": {
      textDecorationLine: "underline",
    },
  },
  viewAllLink: {
    paddingTop: tokens.spacingVerticalM,
  },
});

const subscriptions = [
  {
    name: "Sub-01",
    id: "dde02a76-63cf-4f5f-be84-c943b4da4409",
    role: "Resource access",
    cost: "Unauthorized",
    mgmtGroup: "Production-DevBox",
  },
  {
    name: "Sub-02",
    id: "076b00c5-69cb-4fbf-927c-e3473de84ab5",
    role: "Resource access",
    cost: "Unauthorized",
    mgmtGroup: "Production-DevBox",
  },
  {
    name: "Sub-03",
    id: "84ca48fe-c942-42e5-b492-d56681d058fa",
    role: "Resource access",
    cost: "Unauthorized",
    mgmtGroup: "Production-DevBox",
  },
  {
    name: "Sub-04",
    id: "dde02a76-63cf-4f5f-be84-c943b4da4409",
    role: "Resource access",
    cost: "Unauthorized",
    mgmtGroup: "Production-DevBox",
  },
  {
    name: "Sub-05",
    id: "076b00c5-69cb-4fbf-927c-e3473de84ab5",
    role: "Resource access",
    cost: "Unauthorized",
    mgmtGroup: "Production-DevBox",
  },
  {
    name: "Sub-06",
    id: "84ca48fe-c942-42e5-b492-d56681d058fa",
    role: "Resource access",
    cost: "Unauthorized",
    mgmtGroup: "Production-DevBox",
  },
  {
    name: "Sub-07",
    id: "dde02a76-63cf-4f5f-be84-c943b4da4409",
    role: "Resource access",
    cost: "Unauthorized",
    mgmtGroup: "Production-DevBox",
  },
  {
    name: "Sub-08",
    id: "076b00c5-69cb-4fbf-927c-e3473de84ab5",
    role: "Resource access",
    cost: "Unauthorized",
    mgmtGroup: "Production-DevBox",
  },
  {
    name: "Sub-09",
    id: "84ca48fe-c942-42e5-b492-d56681d058fa",
    role: "Resource access",
    cost: "Unauthorized",
    mgmtGroup: "Production-DevBox",
  },
  {
    name: "Sub-10",
    id: "dde02a76-63cf-4f5f-be84-c943b4da4409",
    role: "Resource access",
    cost: "Unauthorized",
    mgmtGroup: "Production-DevBox",
  },
  {
    name: "Sub-11",
    id: "076b00c5-69cb-4fbf-927c-e3473de84ab5",
    role: "Resource access",
    cost: "Unauthorized",
    mgmtGroup: "Production-DevBox",
  },
  {
    name: "Sub-12",
    id: "84ca48fe-c942-42e5-b492-d56681d058fa",
    role: "Resource access",
    cost: "Unauthorized",
    mgmtGroup: "Production-DevBox",
  },
];

export interface SubscriptionsPageProps {
  isDarkMode?: boolean;
  onHome?: () => void;
  onSearchSelect?: (item: string) => void;
  onSubscriptionClick?: (name: string) => void;
  onNavigateToDashboard?: () => void;
}

/** Subscriptions page — shows alerts & subscription health, manage and operations card, and all subscriptions table. */
export default function SubscriptionsPage({
  isDarkMode = false,
  onHome,
  onSearchSelect,
  onSubscriptionClick,
  onNavigateToDashboard,
}: SubscriptionsPageProps) {
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
            { label: "Subscriptions" },
          ]}
        />

        <div className={styles.content}>
          {/* -- Title -- */}
          <div className={styles.titleRow}>
            <Text className={styles.pageTitle}>Subscriptions</Text>
            <div className={styles.creditsBadge}>
              <Text className={styles.creditsBadgeText}>
                $157 in credits - Expires Aug 25, 2026
              </Text>
              <Info12Regular />
            </div>
          </div>

          {/* -- Alerts + Manage and operations -- */}
          <div className={styles.twoCardRow}>
            {/* Alerts and subscription health */}
            <Card className={styles.alertsCard}>
              <div className={styles.cardHeaderRow}>
                <div className={styles.iconContainerRed}>
                  <Alert24Regular style={{ color: "#d13438" }} />
                </div>
                <Text className={styles.sectionTitle}>
                  Alerts and subscription health
                </Text>
              </div>

              <div className={styles.alertsBody}>
                <div className={styles.alertItem}>
                  <Alert24Regular className={styles.alertIcon} />
                  <Text className={styles.alertItemTitle}>
                    Set up alerts to catch issues
                  </Text>
                  <Text className={styles.alertItemDesc}>
                    Get notified early about errors, slowdowns, and unexpected
                    behaviors.
                  </Text>
                </div>
                <div className={styles.alertStatItem}>
                  <div className={styles.alertStatHeaderRow}>
                    <Text className={styles.alertStatLabel}>
                      Subscription issues
                    </Text>
                    <Info12Regular
                      style={{ color: tokens.colorNeutralForeground3 }}
                    />
                  </div>
                  <Text className={styles.alertStatValue}>2</Text>
                  <Text className={styles.alertStatTimestamp}>
                    Last updated: 04/28/2026
                  </Text>
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
            </Card>

            {/* Manage and operations — matches compute-infrastructure.tsx */}
            <Card className={styles.manageCard}>
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

              <div className={styles.manageBody}>
                <div className={styles.manageTextGroup}>
                  <Badge appearance="filled" color="success" size="small">
                    New
                  </Badge>
                  <Text className={styles.manageTitle}>
                    Essential Machine Management
                  </Text>
                  <Text className={styles.manageDesc}>
                    Manage and secure your machines at scale, all in one place.
                  </Text>
                </div>
                <div className={styles.statsRow}>
                  <div className={styles.statItem}>
                    <Text className={styles.savingsLabel}>Cost</Text>
                    <Text className={styles.savingsValue}>Free</Text>
                    <Text className={styles.addonsText}>add-ons available</Text>
                  </div>
                  <div className={styles.statItem}>
                    <Text className={styles.savingsLabel}>
                      Estimated monthly savings
                    </Text>
                    <Text className={styles.savingsValueGreen}>$5,773.77</Text>
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
            </Card>
          </div>

          {/* -- All subscriptions -- */}
          <Card className={styles.subscriptionsCard}>
            <div className={styles.cardHeaderRow}>
              <div className={styles.iconContainerPurple}>
                <History24Regular style={{ color: "#0f6cbd" }} />
              </div>
              <Text className={styles.sectionTitle}>All subscriptions</Text>
            </div>

            <div className={styles.tabsArea}>
              <TabList
                selectedValue={activeTab}
                onTabSelect={(_, data) => setActiveTab(data.value as string)}
                size="small"
              >
                <Tab value="recently-viewed">Recently viewed</Tab>
                <Tab value="favorites">Favorites</Tab>
              </TabList>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    Resource name
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    Subscription ID
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    My role
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    Current Cost
                  </TableHeaderCell>
                  <TableHeaderCell className={styles.tableHeaderCell}>
                    Parent management group
                  </TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map((sub) => (
                  <TableRow key={sub.name}>
                    <TableCell>
                      <div className={styles.resourceNameCell}>
                        <img
                          src="/azure-service-icons/management + governance/10002-icon-service-Subscriptions.svg"
                          alt=""
                          className={styles.resourceIcon}
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
                      <Text className={styles.tableCell}>{sub.id}</Text>
                    </TableCell>
                    <TableCell>
                      <Text className={styles.tableCell}>{sub.role}</Text>
                    </TableCell>
                    <TableCell>
                      <Text className={styles.tableCell}>{sub.cost}</Text>
                    </TableCell>
                    <TableCell>
                      <Text className={styles.tableCell}>{sub.mgmtGroup}</Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className={styles.viewAllLink}>
              <Link className={styles.resourceLink}>
                View all subscriptions
              </Link>
            </div>
          </Card>
        </div>
      </div>

      <EmmEnableBlade
        isOpen={showEnableBlade}
        onClose={() => setShowEnableBlade(false)}
      />
    </NavigationProvider>
  );
}
