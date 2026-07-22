"use client";

import { useState } from "react";
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
  Sparkle24Regular,
  History24Regular,
  ChevronLeft20Regular,
  ChevronRight20Regular,
  Settings24Regular,
  CheckmarkCircle20Filled,
  ShieldCheckmark20Regular,
  PlugConnected20Regular,
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
    margin: "0 auto",
    padding: "48px 32px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    alignItems: "flex-end",
  },

  /* -- Title row -- */
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
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

  /* -- Card base -- */
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "16px",
    boxShadow: tokens.shadow4,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    width: "100%",
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
  cardFooter: {
    display: "flex",
    gap: tokens.spacingHorizontalM,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalL,
  },

  /* -- Icon containers -- */
  iconContainerBlue: {
    width: "36px",
    height: "36px",
    backgroundColor: tokens.colorBrandBackground2,
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

  /* -- Section title -- */
  sectionTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },

  /* -- Overview card -- */
  overviewBody: {
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
  },
  summaryLabel: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
    paddingLeft: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
  },
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: tokens.spacingHorizontalM,
  },
  summaryCell: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacingVerticalXXL,
    gap: tokens.spacingVerticalXS,
  },
  summaryCellLabel: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  summaryCellLabelText: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  summaryCellValue: {
    fontSize: tokens.fontSizeBase700,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "36px",
  },
  summaryCellTimestamp: {
    fontSize: "10px",
    color: tokens.colorNeutralForeground3,
    lineHeight: "14px",
  },

  /* -- Two-card row -- */
  twoCardRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    width: "100%",
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

  /* -- Recommended actions placeholders -- */
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

  /* -- Manage & operations card -- */
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
  cardTimestamp: {
    fontSize: "10px",
    color: tokens.colorNeutralForeground3,
    lineHeight: "14px",
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

  /* -- Carousel nav -- */
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

  /* -- Resources table card -- */
  tabsArea: {
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
  },
  resourcesCardBody: {
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    paddingBottom: tokens.spacingVerticalM,
  },
  tableHeaderCell: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
  resourceLink: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
    cursor: "pointer",
  },
  resourceIcon: {
    width: "20px",
    height: "20px",
    flexShrink: 0,
  },
  resourceNameCell: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  tableCell: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
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
    name: "Aarc-1",
    resourceGroup: "rg-01",
    subscription: "sub-01",
    location: "Australia East",
    type: "Machine - Azure Arc",
    icon: "/azure-service-icons/management + governance/10450-icon-service-MachinesAzureArc.svg",
  },
  {
    name: "Aarc-2",
    resourceGroup: "rg-03",
    subscription: "sub-03",
    location: "West US 2",
    type: "Machine - Azure Arc",
    icon: "/azure-service-icons/management + governance/10450-icon-service-MachinesAzureArc.svg",
  },
  {
    name: "Aarc-3",
    resourceGroup: "rg-04",
    subscription: "sub-04",
    location: "West US 2",
    type: "Machine - Azure Arc",
    icon: "/azure-service-icons/management + governance/10450-icon-service-MachinesAzureArc.svg",
  },
];

export interface AzureArcPageProps {
  isDarkMode?: boolean;
  onHome?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToDashboardDetails?: () => void;
  onNavigateToEnable?: () => void;
  onResourceClick?: (name: string) => void;
  onSearchSelect?: (item: string) => void;
}

/** Azure Arc service page — Overview with summary stats (Machines, Kubernetes clusters, SQL servers), recommended actions, manage & operations, and Arc machine resources table. */
export default function AzureArcPage({
  isDarkMode = false,
  onHome,
  onNavigateToDashboard,
  onNavigateToDashboardDetails,
  onNavigateToEnable,
  onResourceClick,
  onSearchSelect,
}: AzureArcPageProps) {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<string>("recently-viewed");
  const [showEnableBlade, setShowEnableBlade] = useState(false);
  const [emmEnabled, setEmmEnabled] = useState(false);

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
          items={[{ label: "Home", onClick: onHome }, { label: "Azure Arc" }]}
        />

        <div className={styles.content}>
          {/* -- Title -- */}
          <div className={styles.titleRow}>
            <Text className={styles.pageTitle}>Azure Arc</Text>
            <div className={styles.creditsBadge}>
              <Text className={styles.creditsBadgeText}>
                $157 in credits - Expires Aug 25, 2026
              </Text>
              <Info12Regular className={styles.creditsBadgeIcon} />
            </div>
          </div>

          {/* -- Overview card -- */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderRow}>
                <div className={styles.iconContainerBlue}>
                  <img
                    src="/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </div>
                <Text className={styles.sectionTitle}>Overview</Text>
              </div>
            </div>

            <Text className={styles.summaryLabel}>Summary</Text>

            <div className={styles.overviewBody}>
              <div className={styles.summaryGrid}>
                <div className={styles.summaryCell}>
                  <div className={styles.summaryCellLabel}>
                    <Text className={styles.summaryCellLabelText}>
                      Machines
                    </Text>
                    <Info12Regular
                      style={{ color: tokens.colorNeutralForeground3 }}
                    />
                  </div>
                  <Text className={styles.summaryCellValue}>46</Text>
                  <Text className={styles.summaryCellTimestamp}>
                    Last updated: 04/28/2026
                  </Text>
                </div>

                <div className={styles.summaryCell}>
                  <div className={styles.summaryCellLabel}>
                    <Text className={styles.summaryCellLabelText}>
                      Kubernetes clusters
                    </Text>
                    <Info12Regular
                      style={{ color: tokens.colorNeutralForeground3 }}
                    />
                  </div>
                  <Text className={styles.summaryCellValue}>0</Text>
                  <Text className={styles.summaryCellTimestamp}>
                    Last updated: 04/28/2026
                  </Text>
                </div>

                <div className={styles.summaryCell}>
                  <div className={styles.summaryCellLabel}>
                    <Text className={styles.summaryCellLabelText}>
                      SQL servers
                    </Text>
                    <Info12Regular
                      style={{ color: tokens.colorNeutralForeground3 }}
                    />
                  </div>
                  <Text className={styles.summaryCellValue}>1</Text>
                  <Text className={styles.summaryCellTimestamp}>
                    Last updated: 04/28/2026
                  </Text>
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <Button appearance="outline" size="small">
                View related environments
              </Button>
              <Button appearance="outline" size="small">
                View capabilities
              </Button>
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
                    Enable Microsoft Defender for 12 Arc machines
                  </Text>
                  <Text className={styles.recommendationDesc}>
                    Protect Aarc-1, Aarc-2, and 10 others from threats with
                    real-time monitoring.
                  </Text>
                </div>
                <div className={styles.recommendationCard}>
                  <div className={styles.recommendationIconRow}>
                    <div
                      className={styles.recommendationIconBox}
                      style={{ backgroundColor: "#e3f2fd" }}
                    >
                      <PlugConnected20Regular style={{ color: "#0078d4" }} />
                    </div>
                    <Text className={styles.recommendationTag}>
                      Connectivity
                    </Text>
                  </div>
                  <Text className={styles.recommendationTitle}>
                    Reconnect 3 disconnected Arc agents
                  </Text>
                  <Text className={styles.recommendationDesc}>
                    Aarc-3 and 2 others have not reported in over 24 hours.
                    Reconnect to restore management.
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
                        <Text className={styles.savingsValue}>$9.00 USD</Text>
                        <Text className={styles.addonsText}>
                          per machine/month
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
              <div className={styles.dotInactive} />
            </div>
            <Button
              appearance="transparent"
              size="small"
              icon={<ChevronRight20Regular />}
            />
          </div>

          {/* -- All resources -- */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderRow}>
                <div className={styles.iconContainerBlue}>
                  <History24Regular style={{ color: "#0f6cbd" }} />
                </div>
                <Text className={styles.sectionTitle}>All resources</Text>
              </div>
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
                          <Link
                            className={styles.resourceLink}
                            onClick={() => onResourceClick?.(r.name)}
                          >
                            {r.name}
                          </Link>
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

      {/* Enable EMM blade overlay */}
      <EmmEnableBlade
        isOpen={showEnableBlade}
        onClose={() => setShowEnableBlade(false)}
        onEnabled={() => setEmmEnabled(true)}
        onViewDashboard={onNavigateToDashboardDetails}
        baseCost="$9.00 USD/machine/month"
      />
    </NavigationProvider>
  );
}
