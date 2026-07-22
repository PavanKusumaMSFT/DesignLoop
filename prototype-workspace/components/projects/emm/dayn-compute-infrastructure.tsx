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
} from "@fluentui/react-icons";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import { NavigationProvider } from "../../../lib/navigation-context";
import PageBreadcrumb from "../../shared/page-breadcrumb";
import EmmCreateVm from "./vm-create";

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

  /* -- Section title -- */
  sectionTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
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
  placeholderBox: {
    backgroundColor: "#d6d6d6",
    borderRadius: "16px",
    minHeight: "100px",
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

export interface DaynComputeInfrastructureProps {
  isDarkMode?: boolean;
  onHome?: () => void;
  onNavigateToVmOverview?: () => void;
  onSearchSelect?: (item: string) => void;
}

/** Day-N populated version of the Compute Infrastructure page — shows recommended actions, manage & operations, and populated resource table. */
export default function DaynComputeInfrastructure({
  isDarkMode = false,
  onHome,
  onNavigateToVmOverview,
  onSearchSelect,
}: DaynComputeInfrastructureProps) {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<string>("recently-viewed");
  const [showCreateVm, setShowCreateVm] = useState(false);

  if (showCreateVm) {
    return (
      <EmmCreateVm
        onBack={() => setShowCreateVm(false)}
        onHome={onHome}
        onNavigateToComputeInfra={() => setShowCreateVm(false)}
      />
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
                <div className={styles.placeholderBox} />
                <div className={styles.placeholderBox} />
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
                    <Text className={styles.cardTimestamp}>
                      Last updated: 04/28/2026
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
                <Button appearance="primary" size="small">
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
                            onClick={
                              r.name === "Contoso-vm" && onNavigateToVmOverview
                                ? onNavigateToVmOverview
                                : undefined
                            }
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
    </NavigationProvider>
  );
}
