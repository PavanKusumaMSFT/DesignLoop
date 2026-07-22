"use client";

import { useState, useRef, useEffect } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  FluentProvider,
  webLightTheme,
  Text,
  Button as FluentButton,
  mergeClasses,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Database24Regular,
  Cloud24Regular,
  Globe24Regular,
  Cube24Regular,
  Document24Regular,
  Settings24Regular,
  Search24Regular,
  Bot24Regular,
  Server24Regular,
  Shield24Regular,
  DataUsage24Regular,
  Code24Regular,
} from "@fluentui/react-icons";
import { TopNav } from "../../shared/top-nav";
import { useNavigation } from "../../../lib/navigation-context";
import SimpleSearchSuggestions from "../../shared/simple-search-suggestions";
import { CopilotSVGIcon } from "../../shared/copilot-svg-icon";

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
  titleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  title: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
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
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
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
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
    zIndex: 1000,
    minWidth: "200px",
    overflow: "hidden",
  },
  dropdownItem: {
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
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
  searchIcon: {
    width: "20px",
    height: "20px",
    color: tokens.colorNeutralForeground3,
    margin: "0 8px",
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
  copilotButton: {
    borderRadius: "24px",
    marginLeft: "-4px",
    background:
      "linear-gradient(white, white) padding-box, linear-gradient(90deg, #FF32EE, #548AFF, #3FC150) border-box",
    border: "1px solid transparent",
    position: "relative",
  },
  actionCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "24px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow4,
    },
  },
  cardIcon: {
    width: "32px",
    height: "32px",
    color: tokens.colorBrandForeground1,
    marginBottom: "16px",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
  },
  cardDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.4",
  },
  actionCards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "24px",
    marginBottom: "48px",
    "@media (max-width: 1200px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  projectOverview: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "24px",
    marginBottom: "24px",
  },
  projectTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
  },
  viewToggle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "24px",
  },
  viewButton: {
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },
  viewButtonActive: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  viewButtonInactive: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "24px",
  },
  projectCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow4,
    },
  },
  serviceIconContainer: {
    width: "36px",
    height: "36px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  heroSection: {
    marginBottom: "32px",
  },
  azureSolutionsTabs: {
    display: "flex",
    gap: "24px",
    marginBottom: "24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  azureSolutionsTab: {
    padding: "8px 0",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    "&:hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  azureSolutionsTabActive: {
    color: tokens.colorBrandForeground1,
    borderBottomColor: tokens.colorBrandForeground1,
  },
  searchWrapperHalf: {
    maxWidth: "50%",
  },
  copilotIconWrapper: {
    marginRight: "4px",
    display: "flex",
    alignItems: "center",
  },
  suggestionsWrapper: {
    position: "relative" as const,
    zIndex: 1000,
    maxWidth: "50%",
  },
  projectTitleSmall: {
    fontSize: "18px",
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "24px",
  },
  servicesInnerGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  cursorDefault: {
    cursor: "default",
  },
  serviceCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "12px",
  },
  serviceIconImg: {
    width: "20px",
    height: "20px",
  },
  serviceName: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  statusBadge: {
    fontSize: "10px",
    padding: "2px 6px",
    borderRadius: "4px",
    textTransform: "uppercase" as const,
    fontWeight: "500",
  },
  statusBadgeRecommended: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
  },
  statusBadgePopular: {
    backgroundColor: tokens.colorPaletteGreenBackground1,
    color: tokens.colorPaletteGreenForeground1,
  },
  statusBadgeEnterprise: {
    backgroundColor: tokens.colorPaletteBerryBackground2,
    color: tokens.colorPaletteBerryForeground1,
  },
  statusBadgeNew: {
    backgroundColor: tokens.colorPaletteYellowBackground1,
    color: tokens.colorPaletteYellowForeground2,
  },
  serviceDescriptionText: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "12px",
    lineHeight: "1.5",
  },
  pricingText: {
    fontSize: "14px",
    color: tokens.colorPaletteGreenForeground1,
    fontWeight: "600",
  },
  videoContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForeground2,
  },
  videoThumbnail: {
    width: "100%",
    height: "140px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    position: "relative" as const,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  playButton: {
    width: "48px",
    height: "48px",
    backgroundColor: "rgba(0, 120, 212, 0.9)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "20px",
  },
  durationBadge: {
    position: "absolute" as const,
    bottom: "8px",
    right: "8px",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    padding: "2px 6px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "500",
  },
  videoTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
    textAlign: "left" as const,
    lineHeight: "1.3",
    width: "100%",
  },
  videoDescriptionText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    textAlign: "left" as const,
    lineHeight: "1.4",
    marginBottom: "16px",
    width: "100%",
  },
  selfAlignStart: {
    alignSelf: "flex-start",
  },
  templateCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
  },
  templateName: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  templateDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "8px",
  },
  templateFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  techBadge: {
    fontSize: "10px",
    padding: "2px 6px",
    borderRadius: "4px",
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    fontWeight: "500",
  },
  educationalCardsColumn: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
  educationalCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "20px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    flex: 1,
  },
  educationalCardTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  educationalCardDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "16px",
    lineHeight: "1.4",
  },
  architectureIcon: {
    fontSize: "48px",
    marginBottom: "16px",
    color: tokens.colorBrandForeground1,
  },
  architectureTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
    color: tokens.colorNeutralForeground1,
  },
  architectureDescription: {
    textAlign: "center" as const,
    maxWidth: "400px",
  },
  marginTopM: {
    marginTop: "16px",
  },
  actionCardsSection: {
    marginTop: "24px",
  },
  codeIconSmall: {
    width: "20px",
    height: "20px",
    color: tokens.colorBrandForeground1,
  },
  architectureBuilderContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "32px",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForeground2,
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: "20px 20px",
    position: "relative",
  },
});

interface Level1DiscoverProps {
  experienceLevel?: "new" | "smb" | "enterprise";
}

const Level1Discover: React.FC<Level1DiscoverProps> = ({
  experienceLevel = "new",
}) => {
  const styles = useStyles();
  const { handlePageChange, sourcePage } = useNavigation();

  // Check if we came from hp-fre (home/FRE page) for special navigation behavior
  // Note: hp-fre.tsx has page ID "home-fre" in the navigation system
  const cameFromAzurePortal = sourcePage === "home-fre";
  console.log(
    "[v0] DiscoverContent2: sourcePage =",
    sourcePage,
    "cameFromAzurePortal =",
    cameFromAzurePortal,
  );
  const [viewMode, setViewMode] = useState<
    "services" | "templates" | "architecture"
  >("services");

  const getDefaultSelection = () => {
    if (experienceLevel === "enterprise") return "Scaling enterprise workloads";
    if (experienceLevel === "smb") return "Migrating infrastructure";
    return "Deploying an app";
  };

  const getInitialSearchValue = () => {
    if (experienceLevel === "enterprise")
      return "Scale my enterprise workloads";
    if (experienceLevel === "smb") return "Migrate my infrastructure to Azure";
    return "Deploy my first application to Azure";
  };

  const [selectedOption, setSelectedOption] = useState(getDefaultSelection());
  const [searchValue, setSearchValue] = useState(getInitialSearchValue());
  const [showSuggestions, setShowSuggestions] = useState(false); // Set showSuggestions to false by default
  const inputRef = useRef<HTMLInputElement>(null);

  // Update selectedOption and searchValue when experienceLevel changes
  useEffect(() => {
    setSelectedOption(getDefaultSelection());
    setSearchValue(getInitialSearchValue());
  }, [experienceLevel]);

  const getDropdownOptions = () => {
    if (experienceLevel === "enterprise") {
      return [
        "Scaling enterprise workloads",
        "Multi-cloud governance",
        "Enterprise security & compliance",
        "Global infrastructure deployment",
        "Advanced analytics & AI",
        "DevOps at enterprise scale",
      ];
    } else if (experienceLevel === "smb") {
      return [
        "Migrating infrastructure",
        "Modernizing business applications",
        "Setting up cloud backup",
        "Implementing basic security",
        "Cost optimization",
        "Remote work enablement",
      ];
    } else {
      return [
        "Deploying an app",
        "Scaling a service",
        "Migrating infrastructure",
        "Setting up monitoring",
        "Configuring security",
        "Managing databases",
      ];
    }
  };

  const getAzureServices = () => {
    if (experienceLevel === "enterprise") {
      return [
        {
          name: "Azure Kubernetes Service",
          description:
            "Deploy and scale containerized applications with enterprise-grade orchestration and management.",
          icon: "/icons/Kubernetes-Services.svg",
          status: "recommended",
        },
        {
          name: "Azure Service Fabric",
          description:
            "Build and operate always-on, scalable, distributed microservices applications.",
          icon: "/icons/Service-Fabric-Clusters.svg",
          status: "enterprise",
        },
        {
          name: "Azure Synapse Analytics",
          description:
            "Limitless analytics service with unmatched time to insight across data warehouses and big data.",
          icon: "/icons/Azure-Synapse-Analytics.svg",
          status: "popular",
        },
        {
          name: "Azure Arc",
          description:
            "Extend Azure management and services to any infrastructure across on-premises and multi-cloud.",
          icon: "/icons/Azure-Arc.svg",
          status: "recommended",
        },
      ];
    } else if (experienceLevel === "smb") {
      return [
        {
          name: "Azure Migrate",
          description:
            "Discover, assess, and migrate your on-premises workloads to Azure with guided tools.",
          icon: "/icons/Azure-Migrate.svg",
          status: "recommended",
        },
        {
          name: "Azure Network Security",
          description:
            "Protect your business with network security groups, firewalls, and DDoS protection.",
          icon: "/icons/Network-Security-Hub.svg",
          status: "popular",
          onClick: () => handlePageChange("service-hubs"),
        },
        {
          name: "Azure SQL Database",
          description:
            "Fully managed intelligent SQL database with built-in high availability and security.",
          icon: "/icons/SQL-Database.svg",
          status: "recommended",
        },
        {
          name: "Windows Virtual Desktop",
          description:
            "Enable secure remote work with virtualized Windows desktops and apps in the cloud.",
          icon: "/icons/Windows-Virtual-Desktop.svg",
          status: "popular",
        },
      ];
    } else {
      return [
        {
          name: "Web App",
          description:
            "Easily host and manage websites and web applications without managing infrastructure.",
          icon: "/icons/Static-Web-Apps.svg",
          status: "recommended",
          pricing: "Free",
          onClick: () => handlePageChange("create-resource-2"),
        },
        {
          name: "Container Apps",
          description:
            "Run your app in containers with automatic scaling and built-in microservices support.",
          icon: "/icons/containerapps.svg",
          status: "popular",
          pricing: "Free",
        },
        {
          name: "Function App",
          description:
            "Build serverless apps that run code on demand without worrying about servers.",
          icon: "/icons/Function-App.svg",
          status: "recommended",
          pricing: "Free",
        },
        {
          name: "App Services",
          description:
            "Build and deploy enterprise-ready web apps at scale with fully managed platform.",
          icon: "/icons/App-Services.svg",
          status: "popular",
          pricing: "Free",
        },
      ];
    }
  };

  const getActionCards = () => {
    if (experienceLevel === "enterprise") {
      return [
        {
          icon: DataUsage24Regular,
          title: "Enterprise Architecture",
          description:
            "Reference architectures, best practices, and enterprise-scale deployment patterns.",
        },
        {
          icon: Shield24Regular,
          title: "Governance & Compliance",
          description:
            "Enterprise policies, regulatory compliance, and security frameworks at scale.",
        },
        {
          icon: Server24Regular,
          title: "Multi-Cloud Strategy",
          description:
            "Hybrid and multi-cloud management, Azure Arc, and global infrastructure.",
        },
        {
          icon: Database24Regular,
          title: "Data & Analytics Platform",
          description:
            "Enterprise data lakes, AI/ML platforms, and advanced analytics solutions.",
        },
      ];
    } else if (experienceLevel === "smb") {
      return [
        {
          icon: Server24Regular,
          title: "SMB Migration Hub",
          description:
            "Assessment tools, migration guides, and cost calculators tailored for small-medium business.",
        },
        {
          icon: Shield24Regular,
          title: "Business Continuity",
          description:
            "Backup solutions, disaster recovery, and security essentials for business protection.",
        },
        {
          icon: Cloud24Regular,
          title: "Productivity Integration",
          description:
            "Connect Azure with Microsoft 365, Teams, and existing business applications.",
        },
        {
          icon: Database24Regular,
          title: "Business Applications",
          description:
            "CRM, ERP integration, business intelligence, and customer-facing applications.",
        },
      ];
    } else {
      return [
        {
          icon: Document24Regular,
          title: "Learning Path",
          description:
            "Step-by-step tutorials, quickstarts, and guided learning modules for Azure fundamentals.",
        },
        {
          icon: Database24Regular,
          title: "Service Hubs",
          description:
            "Explore curated Azure services organized by category with guided setup and best practices.",
          onClick: () => handlePageChange("service-hubs"),
        },
        {
          icon: Settings24Regular,
          title: "Free Tier Explorer",
          description:
            "Discover always-free services and 12-month free tier offerings to start building without cost.",
        },
        {
          icon: Bot24Regular,
          title: "AI Templates",
          description:
            "Pre-built AI templates for common scenarios like chatbots, document analysis, and image recognition.",
        },
      ];
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === "workload-agent") {
      handlePageChange("workload-agent");
    } else {
      setSearchValue(suggestion);
    }
    setShowSuggestions(false);
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        <TopNav
          activeLink="Discover"
          experienceLevel={experienceLevel}
          disabledItems={cameFromAzurePortal ? ["Build", "Manage"] : []}
          homeNavigatesTo={cameFromAzurePortal ? "home-fre" : undefined}
        />

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <Text as="h1" className={styles.title}>
                Discover
              </Text>
            </div>
          </div>

          <div className={styles.heroSection}>
            <div
              className={mergeClasses(
                styles.searchWrapper,
                styles.searchWrapperHalf,
              )}
            >
              <div className={styles.copilotIconWrapper}>
                <CopilotSVGIcon width={20} height={20} />
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Message Copilot"
                className={styles.searchInput}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
              />
            </div>

            {showSuggestions && (
              <div className={styles.suggestionsWrapper}>
                <SimpleSearchSuggestions
                  showSuggestions={showSuggestions}
                  onSuggestionClick={handleSuggestionClick}
                  setShowSuggestions={setShowSuggestions}
                  inputRef={inputRef}
                  experienceLevel={experienceLevel}
                  searchValue={searchValue}
                />
              </div>
            )}
          </div>

          <div className={styles.projectOverview}>
            <div
              className={mergeClasses(
                styles.projectTitle,
                styles.projectTitleSmall,
              )}
            >
              Azure Solutions
            </div>
            <div className={styles.azureSolutionsTabs}>
              <div
                onClick={() => setViewMode("services")}
                className={`${styles.azureSolutionsTab} ${
                  viewMode === "services" ? styles.azureSolutionsTabActive : ""
                }`}
              >
                Services
              </div>
              <div
                onClick={() => setViewMode("templates")}
                className={`${styles.azureSolutionsTab} ${
                  viewMode === "templates" ? styles.azureSolutionsTabActive : ""
                }`}
              >
                Templates
              </div>
              <div
                onClick={() => setViewMode("architecture")}
                className={`${styles.azureSolutionsTab} ${
                  viewMode === "architecture"
                    ? styles.azureSolutionsTabActive
                    : ""
                }`}
              >
                Architecture Builder
              </div>
            </div>
            {viewMode === "services" ? (
              <div className={styles.servicesGrid}>
                {/* First two columns: 2x2 grid of core services */}
                <div className={styles.servicesInnerGrid}>
                  {getAzureServices().map((service, index) => (
                    <div
                      key={index}
                      className={mergeClasses(
                        styles.projectCard,
                        !(service as any).onClick && styles.cursorDefault,
                      )}
                      onClick={(service as any).onClick}
                    >
                      <div className={styles.serviceCardHeader}>
                        {service.icon && (
                          <div className={styles.serviceIconContainer}>
                            <img
                              src={service.icon as string}
                              alt={service.name}
                              className={styles.serviceIconImg}
                            />
                          </div>
                        )}
                        <span className={styles.serviceName}>
                          {service.name}
                        </span>
                        <div
                          className={mergeClasses(
                            styles.statusBadge,
                            service.status === "recommended"
                              ? styles.statusBadgeRecommended
                              : service.status === "popular"
                                ? styles.statusBadgePopular
                                : service.status === "enterprise"
                                  ? styles.statusBadgeEnterprise
                                  : styles.statusBadgeNew,
                          )}
                        >
                          {service.status}
                        </div>
                      </div>
                      <div className={styles.serviceDescriptionText}>
                        {service.description}
                      </div>
                      {(service as any).pricing && (
                        <div className={styles.pricingText}>
                          {(service as any).pricing}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Third column: Video placeholder */}
                <div className={styles.videoContainer}>
                  {/* Video thumbnail placeholder */}
                  <div
                    className={styles.videoThumbnail}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        tokens.colorNeutralBackground2;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        tokens.colorNeutralBackground3;
                    }}
                  >
                    {/* Play button overlay */}
                    <div className={styles.playButton}>▶</div>
                    {/* Duration badge */}
                    <div className={styles.durationBadge}>5:42</div>
                  </div>

                  {/* Video title and description */}
                  <div className={styles.videoTitle}>
                    {experienceLevel === "enterprise"
                      ? "Scaling enterprise workloads with Azure Kubernetes Service"
                      : experienceLevel === "smb"
                        ? "Migrating your infrastructure to Azure with Azure Migrate"
                        : "Ways to deploy your app on Azure"}
                  </div>
                  <div className={styles.videoDescriptionText}>
                    {experienceLevel === "enterprise"
                      ? "Learn how to scale your enterprise applications using Azure Kubernetes Service, implementing auto-scaling, load balancing, and multi-region deployments for high availability."
                      : experienceLevel === "smb"
                        ? "Discover how to assess your current infrastructure and migrate your business workloads to Azure using Azure Migrate tools and best practices for SMB environments."
                        : "Azure cloud services and choose the right deployment option for your application based on your specific requirements and architecture needs."}
                  </div>
                  <FluentButton
                    appearance="outline"
                    size="small"
                    className={styles.selfAlignStart}
                  >
                    Watch Video
                  </FluentButton>
                </div>
              </div>
            ) : viewMode === "templates" ? (
              <div className={styles.servicesGrid}>
                {/* First two columns: 2x2 grid of realistic AZD templates */}
                <div className={styles.servicesInnerGrid}>
                  {experienceLevel === "smb" ? (
                    <>
                      {/* VM Migration Template */}
                      <div className={styles.projectCard}>
                        <div className={styles.templateCardHeader}>
                          <span className={styles.serviceName}>
                            VM Migration Template
                          </span>
                          <div
                            className={mergeClasses(
                              styles.statusBadge,
                              styles.statusBadgePopular,
                            )}
                          >
                            popular
                          </div>
                        </div>
                        <div className={styles.templateDescription}>
                          Migrate on-premises VMs to Azure with automated
                          assessment
                        </div>
                        <div className={styles.templateFooter}>
                          <span className={styles.techBadge}>
                            Azure Migrate
                          </span>
                          <FluentButton size="small" appearance="subtle">
                            Use Template
                          </FluentButton>
                        </div>
                      </div>

                      {/* Database Migration */}
                      <div className={styles.projectCard}>
                        <div className={styles.templateCardHeader}>
                          <span className={styles.serviceName}>
                            Database Migration
                          </span>
                          <div
                            className={mergeClasses(
                              styles.statusBadge,
                              styles.statusBadgeRecommended,
                            )}
                          >
                            recommended
                          </div>
                        </div>
                        <div className={styles.templateDescription}>
                          Migrate SQL Server databases to Azure SQL with minimal
                          downtime
                        </div>
                        <div className={styles.templateFooter}>
                          <span className={styles.techBadge}>Azure SQL</span>
                          <FluentButton size="small" appearance="subtle">
                            Use Template
                          </FluentButton>
                        </div>
                      </div>

                      {/* Hybrid Network Setup */}
                      <div className={styles.projectCard}>
                        <div className={styles.templateCardHeader}>
                          <span className={styles.serviceName}>
                            Hybrid Network Setup
                          </span>
                        </div>
                        <div className={styles.templateDescription}>
                          Connect on-premises network to Azure with VPN Gateway
                        </div>
                        <div className={styles.templateFooter}>
                          <span className={styles.techBadge}>VPN Gateway</span>
                          <FluentButton size="small" appearance="subtle">
                            Use Template
                          </FluentButton>
                        </div>
                      </div>

                      {/* Backup & DR */}
                      <div className={styles.projectCard}>
                        <div className={styles.templateCardHeader}>
                          <span className={styles.serviceName}>
                            Backup & Disaster Recovery
                          </span>
                        </div>
                        <div className={styles.templateDescription}>
                          Automated backup and disaster recovery for business
                          continuity
                        </div>
                        <div className={styles.templateFooter}>
                          <span className={styles.techBadge}>Azure Backup</span>
                          <FluentButton size="small" appearance="subtle">
                            Use Template
                          </FluentButton>
                        </div>
                      </div>
                    </>
                  ) : experienceLevel === "enterprise" ? (
                    <>
                      {/* AKS Multi-Region */}
                      <div className={styles.projectCard}>
                        <div className={styles.templateCardHeader}>
                          <span className={styles.serviceName}>
                            AKS Multi-Region Cluster
                          </span>
                          <div
                            className={mergeClasses(
                              styles.statusBadge,
                              styles.statusBadgePopular,
                            )}
                          >
                            popular
                          </div>
                        </div>
                        <div className={styles.templateDescription}>
                          Kubernetes cluster with auto-scaling across multiple
                          regions
                        </div>
                        <div className={styles.templateFooter}>
                          <span className={styles.techBadge}>Kubernetes</span>
                          <FluentButton size="small" appearance="subtle">
                            Use Template
                          </FluentButton>
                        </div>
                      </div>

                      {/* Global Load Balancer */}
                      <div className={styles.projectCard}>
                        <div className={styles.templateCardHeader}>
                          <span className={styles.serviceName}>
                            Global Load Balancer
                          </span>
                          <div
                            className={mergeClasses(
                              styles.statusBadge,
                              styles.statusBadgeRecommended,
                            )}
                          >
                            recommended
                          </div>
                        </div>
                        <div className={styles.templateDescription}>
                          Traffic Manager with geo-distributed endpoints and
                          failover
                        </div>
                        <div className={styles.templateFooter}>
                          <span className={styles.techBadge}>
                            Traffic Manager
                          </span>
                          <FluentButton size="small" appearance="subtle">
                            Use Template
                          </FluentButton>
                        </div>
                      </div>

                      {/* Enterprise Data Lake */}
                      <div className={styles.projectCard}>
                        <div className={styles.templateCardHeader}>
                          <span className={styles.serviceName}>
                            Enterprise Data Lake
                          </span>
                        </div>
                        <div className={styles.templateDescription}>
                          Scalable data lake with Synapse Analytics and Power BI
                        </div>
                        <div className={styles.templateFooter}>
                          <span className={styles.techBadge}>
                            Synapse Analytics
                          </span>
                          <FluentButton size="small" appearance="subtle">
                            Use Template
                          </FluentButton>
                        </div>
                      </div>

                      {/* Microservices Architecture */}
                      <div className={styles.projectCard}>
                        <div className={styles.templateCardHeader}>
                          <span className={styles.serviceName}>
                            Microservices Architecture
                          </span>
                        </div>
                        <div className={styles.templateDescription}>
                          Service mesh with API Management and event-driven
                          scaling
                        </div>
                        <div className={styles.templateFooter}>
                          <span className={styles.techBadge}>
                            Service Fabric
                          </span>
                          <FluentButton size="small" appearance="subtle">
                            Use Template
                          </FluentButton>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* AI Chat App */}
                      <div className={styles.projectCard}>
                        <div className={styles.templateCardHeader}>
                          <span className={styles.serviceName}>
                            AI Chat App
                          </span>
                          <div
                            className={mergeClasses(
                              styles.statusBadge,
                              styles.statusBadgePopular,
                            )}
                          >
                            popular
                          </div>
                        </div>
                        <div className={styles.templateDescription}>
                          OpenAI-powered chat application with Azure AI services
                        </div>
                        <div className={styles.templateFooter}>
                          <span className={styles.techBadge}>
                            React + Node.js
                          </span>
                          <FluentButton size="small" appearance="subtle">
                            Use Template
                          </FluentButton>
                        </div>
                      </div>

                      {/* E-commerce Store */}
                      <div className={styles.projectCard}>
                        <div className={styles.templateCardHeader}>
                          <span className={styles.serviceName}>
                            E-commerce Store
                          </span>
                          <div
                            className={mergeClasses(
                              styles.statusBadge,
                              styles.statusBadgeRecommended,
                            )}
                          >
                            recommended
                          </div>
                        </div>
                        <div className={styles.templateDescription}>
                          Full-stack e-commerce with payment integration
                        </div>
                        <div className={styles.templateFooter}>
                          <span className={styles.techBadge}>Next.js</span>
                          <FluentButton size="small" appearance="subtle">
                            Use Template
                          </FluentButton>
                        </div>
                      </div>

                      {/* Task Management App */}
                      <div className={styles.projectCard}>
                        <div className={styles.templateCardHeader}>
                          <span className={styles.serviceName}>
                            Task Management App
                          </span>
                          <div
                            className={mergeClasses(
                              styles.statusBadge,
                              styles.statusBadgeNew,
                            )}
                          >
                            new
                          </div>
                        </div>
                        <div className={styles.templateDescription}>
                          Collaborative project management with real-time
                          updates
                        </div>
                        <div className={styles.templateFooter}>
                          <span className={styles.techBadge}>
                            Vue.js + Python
                          </span>
                          <FluentButton size="small" appearance="subtle">
                            Use Template
                          </FluentButton>
                        </div>
                      </div>

                      {/* Data Analytics Dashboard */}
                      <div className={styles.projectCard}>
                        <div className={styles.templateCardHeader}>
                          <span className={styles.serviceName}>
                            Data Analytics Dashboard
                          </span>
                        </div>
                        <div className={styles.templateDescription}>
                          Interactive dashboard with Azure Synapse integration
                        </div>
                        <div className={styles.templateFooter}>
                          <span className={styles.techBadge}>React + .NET</span>
                          <FluentButton size="small" appearance="subtle">
                            Use Template
                          </FluentButton>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Third column: Educational cards */}
                <div className={styles.educationalCardsColumn}>
                  {/* VSCode for Web card */}
                  <div
                    className={styles.educationalCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = tokens.shadow4;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div className={styles.serviceCardHeader}>
                      <div className={styles.serviceIconContainer}>
                        <img
                          src="/icons/vscode.svg"
                          alt="VSCode"
                          className={styles.serviceIconImg}
                        />
                      </div>
                      <span className={styles.educationalCardTitle}>
                        Deploy with VSCode for Web
                      </span>
                    </div>
                    <div className={styles.educationalCardDescription}>
                      Use browser-based VSCode to deploy templates directly to
                      Azure without local setup.
                    </div>
                    <FluentButton appearance="outline" size="small">
                      Learn More
                    </FluentButton>
                  </div>

                  {/* Azure CLI/CloudShell card */}
                  <div
                    className={styles.educationalCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = tokens.shadow4;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div className={styles.serviceCardHeader}>
                      <div className={styles.serviceIconContainer}>
                        <Code24Regular className={styles.codeIconSmall} />
                      </div>
                      <span className={styles.educationalCardTitle}>
                        Using Azure CLI & CloudShell
                      </span>
                    </div>
                    <div className={styles.educationalCardDescription}>
                      Deploy and manage templates using command-line tools and
                      cloud-based terminal.
                    </div>
                    <FluentButton appearance="outline" size="small">
                      Get Started
                    </FluentButton>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.architectureBuilderContainer}>
                <Cube24Regular className={styles.architectureIcon} />
                <div className={styles.architectureTitle}>
                  Architecture Builder
                </div>
                <div className={styles.architectureDescription}>
                  Design and visualize your application architecture with our
                  interactive builder. Drag and drop Azure services to create
                  your deployment blueprint.
                </div>
                <FluentButton
                  appearance="primary"
                  className={styles.marginTopM}
                >
                  Launch Builder
                </FluentButton>
              </div>
            )}
          </div>

          <div className={styles.actionCardsSection}>
            <div className={styles.actionCards}>
              {getActionCards().map((card, i) => (
                <div
                  key={i}
                  className={styles.actionCard}
                  onClick={card.onClick}
                >
                  {card.icon && <card.icon className={styles.cardIcon} />}
                  <div className={styles.cardTitle}>{card.title}</div>
                  <div className={styles.cardDescription}>
                    {card.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

export default Level1Discover;
