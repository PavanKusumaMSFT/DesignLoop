/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useNavigation } from "../../../lib/navigation-context";
import { CopilotSVGIcon } from "../../shared/copilot-svg-icon";
import { EnhancedInputBar } from "../../shared/enhanced-input-bar";
import ActionCard, { ActionCardGrid } from "../../shared/action-card";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
} from "@fluentui/react-components";
import {
  Database24Regular,
  Cube24Regular,
  FolderOpen24Regular,
  Money24Regular,
  Clock24Regular,
  Alert24Regular,
  QuestionCircle24Regular,
  Document24Regular,
  Globe24Regular,
  Info24Regular,
  Storage24Regular,
  Desktop24Regular,
  ChevronDown24Regular,
  Shield24Regular,
  Server24Regular,
  Search24Regular,
  ArrowSync24Regular,
  CloudArrowUp24Regular,
  Star20Regular,
  Star20Filled,
  Star16Regular,
  Star16Filled,
  Warning16Filled,
} from "@fluentui/react-icons";
import {
  FluentProvider,
  Button as FluentButton,
  Text,
} from "@fluentui/react-components";
import { webLightTheme, webDarkTheme } from "@fluentui/react-components";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  stickyNav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground1,
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
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  title: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  creditsInfo: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    padding: "8px 16px",
    borderRadius: "16px",
    fontSize: "14px",
  },
  creditsContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  },
  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px",
    marginBottom: "48px",
    marginTop: "24px",
  },
  actionCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid transparent`,
    borderRadius: "12px",
    padding: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxShadow: tokens.shadow4,
    overflow: "hidden",
    "&:hover": {
      boxShadow: tokens.shadow8,
    },
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "22px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  alertIconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: "#fdf3f4",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  moneyIconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: "#c6e7c6",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  moneyIcon: {
    color: "#28a745",
    fontSize: "20px",
  },
  alertIcon: {
    color: "#dc2626",
    fontSize: "20px",
  },
  cardHeaderTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  cardSubHeaderContainer: {
    marginBottom: "16px",
  },
  cardSubHeaderTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    marginBottom: "4px",
    lineHeight: "1.4",
  },
  cardSubHeaderDescription: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "16px",
    lineHeight: "1.5",
  },
  creditsStatsContainer: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "24px",
  },
  creditsStatsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  alertStatsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "24px",
  },
  alertStatBox: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "16px",
    borderRadius: "8px",
    textAlign: "center",
  },
  cardStatLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "6px",
    fontWeight: tokens.fontWeightRegular,
  },
  cardStatValue: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.2",
  },
  cardButtonContainer: {
    marginTop: "auto",
  },
  outlineButton: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    color: tokens.colorNeutralForeground1,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1Hover,
    },
  },
  resourcesContainer: {
    marginTop: "24px",
    marginBottom: "48px",
  },
  resourcesHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  resourcesIconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  resourcesIcon: {
    color: tokens.colorBrandForeground1,
    fontSize: "18px",
  },
  cardHeaderTimestamp: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground3,
  },
  cardHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  resourcesTabs: {
    display: "flex",
    gap: "24px",
    marginBottom: "24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  resourcesTab: {
    padding: "8px 0",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    "&:hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  resourcesTabActive: {
    color: tokens.colorBrandForeground1,
    borderBottomColor: tokens.colorBrandForeground1,
  },
  resourcesTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  resourcesTableHeader: {
    textAlign: "left",
    padding: "8px 8px",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  resourcesTableCell: {
    padding: "11px 8px",
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  resourcesTableCellIndented: {
    padding: "11px 8px 11px 38px",
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  resourcesSubRow: {
    backgroundColor: tokens.colorNeutralBackground3,
  },
  statusLink: {
    color: "#115ea3",
    fontSize: "14px",
    lineHeight: "20px",
  },
  resourceName: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#115ea3",
    cursor: "pointer",
    fontSize: "14px",
    lineHeight: "20px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  dropdown: {
    position: "relative",
    display: "inline-block",
  },
  dropdownButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: tokens.shadow4,
    },
  },
  dropdownContent: {
    position: "absolute",
    top: "100%",
    left: "0",
    marginTop: "4px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "8px",
    boxShadow: tokens.shadow16,
    zIndex: 1000,
    minWidth: "200px",
    overflow: "hidden",
  },
  dropdownItemParent: {
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  chevronSmall: {
    fontSize: "14px",
  },
  infoBrandIcon: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
  },
  actionCardRounded: {
    borderRadius: "16px",
  },
  buttonContainerFlex: {
    display: "flex",
    gap: "8px",
  },
  greenText: {
    color: tokens.colorPaletteGreenForeground1,
  },
  tableHeaderIcon: {
    width: "16px",
    padding: "8px 0",
  },
  tableHeaderName: {
    width: "35%",
  },
  tableHeaderType: {
    width: "25%",
  },
  tableHeaderStatus: {
    width: "20%",
  },
  tableCellExpand: {
    padding: "11px 8px 11px 16px",
  },
  expandChevron: {
    width: "16px",
    height: "16px",
    color: tokens.colorNeutralForeground1,
    transform: "rotate(0deg)",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
  expandChevronCollapsed: {
    transform: "rotate(-90deg)",
  },
  projectNameBold: {
    fontWeight: tokens.fontWeightSemibold,
  },
  statusInline: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  warningBadge: {
    display: "inline-flex",
    alignItems: "center",
    color: "#d83b01",
  },
});

interface HpReturningProps {
  experienceLevel?: "new" | "smb" | "enterprise";
  scenario?: "day-1" | "day-100";
  onAgentModeChange?: (enabled: boolean) => void;
  showAgentModeToggle?: boolean;
  agentModeEnabled?: boolean;
  customHeader?: React.ReactNode | null;
  onProjectClick?: (projectName: string) => void;
  isDarkMode?: boolean;
}

const HpReturning: React.FC<HpReturningProps> = ({
  experienceLevel = "new",
  scenario = "day-1",
  onAgentModeChange,
  showAgentModeToggle = false,
  agentModeEnabled = false,
  customHeader,
  onProjectClick,
  isDarkMode = false,
}) => {
  const styles = useStyles();
  const router = useRouter();
  const { handlePageChange } = useNavigation();



  const [showDropdown, setShowDropdown] = useState(false);
  const [isProject1Expanded, setIsProject1Expanded] = useState(true);
  const [showScopeDropdown, setShowScopeDropdown] = useState(false);
  const [selectedServiceGroup, setSelectedServiceGroup] =
    useState("All projects");
  const [selectedScope, setSelectedScope] = useState("All subscriptions");
  const [selectedSubscription, setSelectedSubscription] = useState(
    experienceLevel === "enterprise" ? "All projects" : "All projects",
  );
  const [searchValue, setSearchValue] = useState("");

  const getWelcomeMessage = () => {
    return "Welcome back, Jen";
  };

  const getCreditsInfo = () => {
    switch (experienceLevel) {
      case "new":
        return "$200 in credits - Expires Aug 25, 2025";
      case "smb":
        return "$10,000 in credits - Expires Dec 31, 2025";
      case "enterprise":
        return "Enterprise Agreement - Contact billing admin";
      default:
        return "$200 in credits - Expires Aug 25, 2025";
    }
  };

  const getActionCards = () => {
    switch (experienceLevel) {
      case "new":
        return [
          {
            icon: "/icons/templates.svg",
            title: "Start with a template",
            description: "Deploy in minutes using pre-made templates.",
            onClick: () => {
              if (customHeader !== undefined) {
                router.back();
              } else {
                handlePageChange("templates");
              }
            },
          },
          {
            icon: "/icons/Service.svg",
            title: "Explore services to deploy",
            description: "Choose the right solution for your use case.",
            onClick: () => {
              if (customHeader !== undefined) {
                router.back();
              } else {
                handlePageChange("fre-services");
              }
            },
          },
          {
            icon: "/icons/aifoundry.svg",
            title: "Build an AI agent",
            description:
              "Create and manage AI apps and agents using the latest models.",
          },
          {
            icon: "/icons/github.svg",
            title: "Import code from GitHub",
            description:
              "Connect your GitHub account and deploy existing repositories.",
          },
        ];
      case "smb":
        return [
          {
            icon: ArrowSync24Regular,
            title: "Migrate infrastructure",
            description:
              "Move your workloads to Azure with guided migration tools.",
          },
          {
            icon: "/icons/Service.svg",
            title: "Explore services",
            description: "Choose the right solution for your use case.",
            onClick: () => {
              if (customHeader !== undefined) {
                router.back();
              } else {
                handlePageChange("fre-services");
              }
            },
          },
          {
            icon: Shield24Regular,
            title: "Security & compliance",
            description:
              "Protect your resources with built-in security controls.",
          },
          {
            icon: Server24Regular,
            title: "Scale database",
            description: "Optimize your database performance and capacity.",
          },
        ];
      case "enterprise":
        return [
          {
            icon: CloudArrowUp24Regular,
            title: "Deploy to AKS cluster",
            description:
              "Deploy containerized applications to managed Kubernetes.",
          },
          {
            icon: "/icons/Service.svg",
            title: "Explore services",
            description: "Choose the right solution for your use case.",
            onClick: () => {
              if (customHeader !== undefined) {
                router.back();
              } else {
                handlePageChange("fre-services");
              }
            },
          },
          {
            icon: Database24Regular,
            title: "Enterprise database",
            description:
              "Manage large-scale databases with enterprise features.",
          },
          {
            icon: Storage24Regular,
            title: "Advanced storage",
            description: "Store and manage data with scalable cloud storage.",
          },
        ];
      default:
        return [
          {
            icon: "/icons/templates.svg",
            title: "Start with a template",
            description: "Deploy in minutes using pre-made templates.",
            onClick: () => {
              if (customHeader !== undefined) {
                router.back();
              } else {
                handlePageChange("templates");
              }
            },
          },
          {
            icon: "/icons/Service.svg",
            title: "Explore services",
            description: "Choose the right solution for your use case.",
            onClick: () => {
              if (customHeader !== undefined) {
                router.back();
              } else {
                handlePageChange("fre-services");
              }
            },
          },
        ];
    }
  };

  const getAlertsData = () => {
    switch (experienceLevel) {
      case "smb":
        return {
          activeAlerts: "3",
          serviceIssues: "0",
        };
      case "enterprise":
        return {
          activeAlerts: "47",
          serviceIssues: "3",
        };
      default:
        return scenario === "day-100"
          ? { activeAlerts: "2", serviceIssues: "0" }
          : { activeAlerts: "0", serviceIssues: "0" };
    }
  };

  const getCostsData = () => {
    switch (experienceLevel) {
      case "smb":
        return {
          title: "Monthly spending on track",
          description: null,
          creditsSpent: "$10,000",
          creditsRemaining: "$8,234",
          spentLabel: "Monthly budget",
          remainingLabel: "Remaining budget",
          buttonText: "View costs",
        };
      case "enterprise":
        return {
          title: "Enterprise spending overview",
          description: null,
          creditsSpent: "$25,000",
          creditsRemaining: "$8,000",
          spentLabel: "Monthly budget",
          remainingLabel: "Remaining budget",
          buttonText: "View costs",
        };
      default:
        return scenario === "day-100"
          ? {
              title: "Pay as you go - April",
              description:
                "You're billed monthly for the Azure services you use",
              creditsSpent: "$57.00",
              creditsRemaining: "$443.00",
              spentLabel: "Costs",
              remainingLabel: "Budget remaining",
              buttonText: "View costs",
            }
          : {
              title: "30 days left in your free trial",
              description: null,
              creditsSpent: "$0.00",
              creditsRemaining: "$200.00",
              spentLabel: "Credits spent",
              remainingLabel: "Available credits",
              buttonText: "View costs",
            };
    }
  };

  const actionCards = getActionCards();
  const alertsData = getAlertsData();
  const costsData = getCostsData();

  return (
    <FluentProvider theme={isDarkMode ? webDarkTheme : webLightTheme}>
      <div className={styles.container}>
        {customHeader === undefined ? (
          <div className={styles.stickyNav}>
            <AzureHeaderBuildMVP
              activeLink="Home"
              experienceLevel={experienceLevel}
              initialNavOpen={true}
              hideManage
              isDarkMode={isDarkMode}
            />
          </div>
        ) : (
          customHeader && <div className={styles.stickyNav}>{customHeader}</div>
        )}

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <Text as="h1" className={styles.title}>
              {getWelcomeMessage()}
            </Text>
            {(experienceLevel === "smb" ||
              experienceLevel === "enterprise") && (
              <div className={styles.headerRight}>
                <div className={styles.dropdown}>
                  <div
                    className={styles.dropdownButton}
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <span>
                      {experienceLevel === "smb"
                        ? "All projects"
                        : selectedServiceGroup}
                    </span>
                    <ChevronDown24Regular className={styles.chevronSmall} />
                  </div>
                  {showDropdown && (
                    <div className={styles.dropdownContent}>
                      {experienceLevel === "smb" ? (
                        <>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => setShowDropdown(false)}
                          >
                            All projects
                          </div>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => setShowDropdown(false)}
                          >
                            Authentication Service
                          </div>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => setShowDropdown(false)}
                          >
                            Checkout
                          </div>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => setShowDropdown(false)}
                          >
                            Fraud Detection
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => {
                              setSelectedServiceGroup("All projects");
                              setShowDropdown(false);
                            }}
                          >
                            All projects
                          </div>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => {
                              setSelectedServiceGroup("Global Platform");
                              setShowDropdown(false);
                            }}
                          >
                            Global Platform
                          </div>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => {
                              setSelectedServiceGroup("Data Analytics");
                              setShowDropdown(false);
                            }}
                          >
                            Data Analytics
                          </div>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => {
                              setSelectedServiceGroup("Infrastructure");
                              setShowDropdown(false);
                            }}
                          >
                            Infrastructure
                          </div>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => {
                              setSelectedServiceGroup("ML Platform");
                              setShowDropdown(false);
                            }}
                          >
                            ML Platform
                          </div>
                          <div
                            className={styles.dropdownItemParent}
                            onClick={() => {
                              setSelectedServiceGroup("Security & Compliance");
                              setShowDropdown(false);
                            }}
                          >
                            Security & Compliance
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Second dropdown for Enterprise - Scope */}
                {experienceLevel === "enterprise" && (
                  <div className={styles.dropdown}>
                    <div
                      className={styles.dropdownButton}
                      onClick={() => setShowScopeDropdown(!showScopeDropdown)}
                    >
                      <span>{selectedScope}</span>
                      <ChevronDown24Regular className={styles.chevronSmall} />
                    </div>
                    {showScopeDropdown && (
                      <div className={styles.dropdownContent}>
                        <div
                          className={styles.dropdownItemParent}
                          onClick={() => {
                            setSelectedScope("All subscriptions");
                            setShowScopeDropdown(false);
                          }}
                        >
                          All subscriptions
                        </div>
                        <div
                          className={styles.dropdownItemParent}
                          onClick={() => {
                            setSelectedScope("Production only");
                            setShowScopeDropdown(false);
                          }}
                        >
                          Production only
                        </div>
                        <div
                          className={styles.dropdownItemParent}
                          onClick={() => {
                            setSelectedScope("Non-Production only");
                            setShowScopeDropdown(false);
                          }}
                        >
                          Non-Production only
                        </div>
                        <div
                          className={styles.dropdownItemParent}
                          onClick={() => {
                            setSelectedScope("Auth Service Prod");
                            setShowScopeDropdown(false);
                          }}
                        >
                          Auth Service Prod
                        </div>
                        <div
                          className={styles.dropdownItemParent}
                          onClick={() => {
                            setSelectedScope("Payment Service Prod");
                            setShowScopeDropdown(false);
                          }}
                        >
                          Payment Service Prod
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {experienceLevel === "new" && scenario !== "day-100" && (
              <div className={styles.creditsContainer}>
                <div className={styles.creditsInfo}>
                  <span>{getCreditsInfo()}</span>
                  <Info24Regular className={styles.infoBrandIcon} />
                </div>
              </div>
            )}
          </div>

          {/* Old input bar removed — was using inline styles */}

          {/* EnhancedInputBar hidden
          <EnhancedInputBar
            value={searchValue}
            onChange={setSearchValue}
            onSubmit={(value) => console.log("Submit:", value)}
            placeholder="Message Copilot"
            maxWidth="50%"
          />
          */}

          <ActionCardGrid>
            {actionCards?.map((card, index) => (
              <ActionCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                onClick={card.onClick || (() => {})}
                iconBackground={typeof card.icon !== "string"}
                borderRadius={tokens.borderRadiusXLarge}
              />
            ))}
          </ActionCardGrid>

          <div className={styles.twoColumnGrid}>
            <div
              className={mergeClasses(
                styles.actionCard,
                styles.actionCardRounded,
              )}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <div className={styles.alertIconContainer}>
                    <Alert24Regular className={styles.alertIcon} />
                  </div>
                  <div className={styles.cardHeaderTitle}>
                    Alerts and service health
                  </div>
                </div>
                <div className={styles.cardHeaderTimestamp}>
                  Last updated: 07/10/2025
                </div>
              </div>

              <div className={styles.cardSubHeaderContainer}>
                <div className={styles.cardSubHeaderTitle}>
                  Set up alerts to catch issues
                </div>
                <div className={styles.cardSubHeaderDescription}>
                  Get notified early about errors, slowdowns, and unexpected
                  behaviors.
                </div>
              </div>

              <div className={styles.alertStatsContainer}>
                <div className={styles.alertStatBox}>
                  <div className={styles.cardStatLabel}>Active alerts</div>
                  <div className={styles.cardStatValue}>
                    {alertsData.activeAlerts}
                  </div>
                </div>
                <div className={styles.alertStatBox}>
                  <div className={styles.cardStatLabel}>Service issues</div>
                  <div className={styles.cardStatValue}>
                    {alertsData.serviceIssues}
                  </div>
                </div>
              </div>

              <div
                className={mergeClasses(
                  styles.cardButtonContainer,
                  styles.buttonContainerFlex,
                )}
              >
                <FluentButton
                  appearance="outline"
                  className={styles.outlineButton}
                  onClick={() => {
                    if (customHeader !== undefined) {
                      router.back();
                    } else {
                      handlePageChange("level1-manage");
                    }
                  }}
                >
                  {experienceLevel === "new" ? "Set up alerts" : "View alerts"}
                </FluentButton>
                <FluentButton
                  appearance="outline"
                  className={styles.outlineButton}
                  onClick={() => {
                    if (customHeader !== undefined) {
                      router.back();
                    } else {
                      handlePageChange("level1-manage");
                    }
                  }}
                >
                  View service health
                </FluentButton>
              </div>
            </div>
            <div
              className={mergeClasses(
                styles.actionCard,
                styles.actionCardRounded,
              )}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <div className={styles.moneyIconContainer}>
                    <Money24Regular className={styles.moneyIcon} />
                  </div>
                  <div className={styles.cardHeaderTitle}>Costs</div>
                </div>
              </div>

              <div className={styles.cardSubHeaderContainer}>
                <div className={styles.cardSubHeaderTitle}>
                  {costsData.title}
                </div>
                <div className={styles.cardSubHeaderDescription}>
                  {costsData.description ||
                    "Use your credits to cover Azure services, some services are always free."}
                </div>
              </div>

              <div className={styles.creditsStatsContainer}>
                <div className={styles.creditsStatsGrid}>
                  <div>
                    <div className={styles.cardStatLabel}>
                      {costsData.spentLabel}
                    </div>
                    <div className={styles.cardStatValue}>
                      {costsData.creditsSpent}
                    </div>
                  </div>
                  <div>
                    <div
                      className={mergeClasses(
                        styles.cardStatLabel,
                        styles.greenText,
                      )}
                    >
                      {costsData.remainingLabel}
                    </div>
                    <div
                      className={mergeClasses(
                        styles.cardStatValue,
                        styles.greenText,
                      )}
                    >
                      {costsData.creditsRemaining}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={mergeClasses(
                  styles.cardButtonContainer,
                  styles.buttonContainerFlex,
                )}
              >
                {scenario === "day-100" && (
                  <FluentButton
                    appearance="outline"
                    className={styles.outlineButton}
                    onClick={() => handlePageChange("cost-management")}
                  >
                    Edit budget
                  </FluentButton>
                )}
                <FluentButton
                  appearance="outline"
                  className={styles.outlineButton}
                  onClick={() => handlePageChange("cost-management")}
                >
                  {costsData.buttonText}
                </FluentButton>
              </div>
            </div>
          </div>

          <div className={styles.resourcesContainer}>
            <div
              className={mergeClasses(
                styles.actionCard,
                styles.actionCardRounded,
              )}
            >
              <div className={styles.resourcesHeader}>
                <div className={styles.resourcesIconContainer}>
                  <Clock24Regular className={styles.resourcesIcon} />
                </div>
                <div className={styles.cardTitle}>Projects</div>
              </div>

              <div className={styles.resourcesTabs}>
                <div
                  className={`${styles.resourcesTab} ${styles.resourcesTabActive}`}
                >
                  Recently viewed
                </div>
                <div className={styles.resourcesTab}>Favorites</div>
              </div>

              <table className={styles.resourcesTable}>
                <thead>
                  <tr>
                    <th
                      className={mergeClasses(
                        styles.resourcesTableHeader,
                        styles.tableHeaderIcon,
                      )}
                    ></th>
                    <th
                      className={mergeClasses(
                        styles.resourcesTableHeader,
                        styles.tableHeaderName,
                      )}
                    >
                      Name
                    </th>
                    <th
                      className={mergeClasses(
                        styles.resourcesTableHeader,
                        styles.tableHeaderType,
                      )}
                    >
                      Type
                    </th>
                    <th
                      className={mergeClasses(
                        styles.resourcesTableHeader,
                        styles.tableHeaderStatus,
                      )}
                    >
                      Status
                    </th>
                    <th className={styles.resourcesTableHeader}>Last viewed</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Parent project row */}
                  <tr>
                    <td
                      className={mergeClasses(
                        styles.resourcesTableCell,
                        styles.tableCellExpand,
                      )}
                    >
                      <ChevronDown24Regular
                        className={
                          isProject1Expanded
                            ? styles.expandChevron
                            : mergeClasses(
                                styles.expandChevron,
                                styles.expandChevronCollapsed,
                              )
                        }
                        onClick={() =>
                          setIsProject1Expanded(!isProject1Expanded)
                        }
                      />
                    </td>
                    <td className={styles.resourcesTableCell}>
                      <span
                        className={styles.resourceName}
                        onClick={() => {
                          if (onProjectClick) {
                            onProjectClick("zava-retail-storefront");
                          } else if (customHeader !== undefined) {
                            router.back();
                          } else {
                            handlePageChange("level2-projectdetail");
                          }
                        }}
                      >
                        <span className={styles.projectNameBold}>
                          zava-retail-storefront
                        </span>
                      </span>
                    </td>
                    <td className={styles.resourcesTableCell}>Zava Project</td>
                    <td className={styles.resourcesTableCell}>
                      <span
                        className={mergeClasses(
                          styles.statusLink,
                          styles.statusInline,
                        )}
                      >
                        Running
                        {scenario === "day-100" && (
                          <span
                            title="High CPU usage detected on Zava-VM"
                            className={styles.warningBadge}
                          >
                            <Warning16Filled />
                          </span>
                        )}
                      </span>
                    </td>
                    <td className={styles.resourcesTableCell}>
                      {scenario === "day-100" ? "3 hours ago" : "Just now"}
                    </td>
                  </tr>

                  {/* Child rows (visible when expanded) */}
                  {isProject1Expanded && (
                    <>
                      {(scenario === "day-100"
                        ? [
                            {
                              name: "zava-retail-storefront",
                              type: "Container App",
                              status: "Running",
                              time: "3 hours ago",
                            },
                            {
                              name: "Zava-VM",
                              type: "Virtual Machine",
                              status: "Running",
                              time: "2 days ago",
                            },
                            {
                              name: "managedenvironment-zavaretailstore",
                              type: "Container Apps Environment",
                              status: "Active",
                              time: "3 hours ago",
                            },
                            {
                              name: "zava-orders-postgres",
                              type: "PostgreSQL Server",
                              status: "Active",
                              time: "3 hours ago",
                            },
                            {
                              name: "zava-redis-cache",
                              type: "Azure Cache for Redis",
                              status: "Active",
                              time: "3 hours ago",
                            },
                            {
                              name: "zavaretailassets",
                              type: "Storage Account",
                              status: "Active",
                              time: "1 day ago",
                            },
                            {
                              name: "zava-kv",
                              type: "Key Vault",
                              status: "Active",
                              time: "3 hours ago",
                            },
                            {
                              name: "rg-zavaretailstore",
                              type: "Resource Group",
                              status: "Active",
                              time: "3 hours ago",
                            },
                          ]
                        : [
                            {
                              name: "zava-retail-storefront",
                              type: "Container App",
                              status: "Running",
                              time: "Just now",
                            },
                            {
                              name: "managedenvironment-zavaretailstore",
                              type: "Container Apps Environment",
                              status: "Active",
                              time: "Just now",
                            },
                            {
                              name: "zava-orders-postgres",
                              type: "PostgreSQL Server",
                              status: "Active",
                              time: "Just now",
                            },
                            {
                              name: "zava-redis-cache",
                              type: "Azure Cache for Redis",
                              status: "Active",
                              time: "Just now",
                            },
                            {
                              name: "zavaretailassets",
                              type: "Storage Account",
                              status: "Active",
                              time: "Just now",
                            },
                            {
                              name: "zava-kv",
                              type: "Key Vault",
                              status: "Active",
                              time: "Just now",
                            },
                            {
                              name: "rg-zavaretailstore",
                              type: "Resource Group",
                              status: "Active",
                              time: "Just now",
                            },
                          ]
                      ).map((resource) => (
                        <tr
                          key={resource.name + resource.type}
                          className={styles.resourcesSubRow}
                        >
                          <td
                            className={mergeClasses(
                              styles.resourcesTableCell,
                              styles.tableCellExpand,
                            )}
                          ></td>
                          <td className={styles.resourcesTableCellIndented}>
                            <span className={styles.resourceName}>
                              {resource.name}
                            </span>
                          </td>
                          <td className={styles.resourcesTableCell}>
                            {resource.type}
                          </td>
                          <td className={styles.resourcesTableCell}>
                            <span
                              className={mergeClasses(
                                styles.statusLink,
                                styles.statusInline,
                              )}
                            >
                              {resource.status}
                              {(resource as any).warning && (
                                <span
                                  title={(resource as any).warning}
                                  className={styles.warningBadge}
                                >
                                  <Warning16Filled />
                                </span>
                              )}
                            </span>
                          </td>
                          <td className={styles.resourcesTableCell}>
                            {resource.time}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

export default HpReturning;
