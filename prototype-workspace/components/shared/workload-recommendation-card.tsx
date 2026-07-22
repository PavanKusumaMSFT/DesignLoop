"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  Text,
} from "@fluentui/react-components";
type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  ChevronDown20Regular,
  ChevronUp20Regular,
  Send16Regular,
} from "@fluentui/react-icons";
import { useState } from "react";

const useStyles = makeStyles({
  card: {
    padding: "20px",
    marginBottom: "16px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
    cursor: "default",
  },
  header: {
    marginBottom: "16px",
  },
  title: {
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "8px",
    display: "block",
  },
  subtitle: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground3,
    display: "block",
  },
  servicesRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    marginBottom: "16px",
  },
  serviceColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  serviceLabel: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground3,
  },
  serviceItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  serviceIcon: {
    width: "16px",
    height: "16px",
  },
  serviceName: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
  },
  tabContainer: {
    display: "flex",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    marginBottom: "16px",
  },
  tab: {
    padding: "8px 0",
    marginRight: "24px",
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground3,
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s ease",
    "&:hover": {
      color: tokens.colorNeutralForeground2,
    },
  },
  activeTab: {
    color: tokens.colorBrandForeground1,
    borderBottomColor: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  featuresList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  featureItem: {
    cursor: "pointer",
    "&:hover": {
      "& $featureTitle": {
        color: tokens.colorNeutralForeground1,
      },
    },
  },
  featureHeader: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
  },
  featureIcon: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    height: "20px",
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    marginBottom: "4px",
    display: "block",
  },
  featureDescription: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground3,
    display: "block",
    marginTop: "4px",
  },
  buttonsContainer: {
    display: "flex",
    gap: "8px",
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  primaryButton: {
    borderRadius: "20px",
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    border: "none",
    padding: "6px 12px",
    fontSize: "13px",
    fontWeight: tokens.fontWeightRegular,
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    fontFamily: tokens.fontFamilyBase,
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
      transform: "translateY(-1px)",
    },
  },
  chevronIcon: {
    color: tokens.colorNeutralForeground3,
  },
  deploymentPlaceholder: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
  },
  secondaryButton: {
    borderRadius: "20px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "6px 12px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightRegular,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
      transform: "translateY(-1px)",
    },
  },
});

interface WorkloadRecommendationCardProps {
  title?: string;
  subtitle?: string;
  onCreateDeployment?: () => void;
  onExplainChoice?: () => void;
}

/** AI-generated workload recommendation card showing service selections, expandable feature list, and deployment actions.
 * Composed from: makeStyles card, Fluent Text, ChevronDown/Up icons, Send16Regular action buttons.
 * Instead of: building inline workload recommendation UI with tabs and collapsible feature details. */
export const WorkloadRecommendationCard = ({
  title = "Workload recommendation for containerized web app",
  subtitle = "React + Node.js on Azure App Services with Cosmos DB offers scalable, secure, globally distributed apps with low-latency data, managed hosting, CI/CD, and pay-as-you-go pricing for cost efficiency and agility.",
  onCreateDeployment,
  onExplainChoice,
}: WorkloadRecommendationCardProps) => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState<"features" | "deployment">(
    "features",
  );
  const [expandedFeature, setExpandedFeature] = useState<number | null>(0);

  const services = [
    { icon: "/icons/App-Services.svg", name: "Azure App Service" },
    { icon: "/icons/App-Services.svg", name: "Azure App Service" },
    { icon: "/icons/SQL-Database.svg", name: "Azure Cosmos DB (MongoDB API)" },
  ];

  const features = [
    {
      title:
        "Auto-scaling for app services; global distribution with Cosmos DB.",
      description:
        "Azure App Services provide auto-scaling for React and Node.js workloads, while Cosmos DB offers global distribution and high throughput with guaranteed SLAs for latency and availability.",
    },
    {
      title: "No server maintenance; integrated monitoring",
      description:
        "Fully managed platform handles infrastructure, with built-in monitoring and diagnostics.",
    },
    {
      title: "Built-in authentication and compliance",
      description:
        "Enterprise-grade security with Azure AD integration and compliance certifications.",
    },
    {
      title: "CI/CD ready; optimized for React and Node.js",
      description:
        "Seamless integration with GitHub Actions and Azure DevOps for automated deployments.",
    },
    {
      title: "Pay-as-you-go with serverless options",
      description:
        "Flexible pricing with consumption-based billing and cost optimization features.",
    },
  ];

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.subtitle}>{subtitle}</Text>
      </div>

      {/* Services */}
      <div className={styles.servicesRow}>
        {/* Frontend */}
        <div className={styles.serviceColumn}>
          <Text className={styles.serviceLabel}>Frontend (React)</Text>
          <div className={styles.serviceItem}>
            <img
              src={services[0].icon}
              alt={services[0].name}
              className={styles.serviceIcon}
            />
            <Text className={styles.serviceName}>{services[0].name}</Text>
          </div>
        </div>

        {/* Backend */}
        <div className={styles.serviceColumn}>
          <Text className={styles.serviceLabel}>Backend (Node.js)</Text>
          <div className={styles.serviceItem}>
            <img
              src={services[1].icon}
              alt={services[1].name}
              className={styles.serviceIcon}
            />
            <Text className={styles.serviceName}>{services[1].name}</Text>
          </div>
        </div>

        {/* Database */}
        <div className={styles.serviceColumn}>
          <Text className={styles.serviceLabel}>Database</Text>
          <div className={styles.serviceItem}>
            <img
              src={services[2].icon}
              alt={services[2].name}
              className={styles.serviceIcon}
            />
            <Text className={styles.serviceName}>{services[2].name}</Text>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabContainer}>
        <div
          className={`${styles.tab} ${activeTab === "features" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("features")}
        >
          Features
        </div>
        <div
          className={`${styles.tab} ${activeTab === "deployment" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("deployment")}
        >
          Deployment process
        </div>
      </div>

      {/* Features List */}
      {activeTab === "features" && (
        <div className={styles.featuresList}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={styles.featureItem}
              onClick={() =>
                setExpandedFeature(expandedFeature === index ? null : index)
              }
            >
              <div className={styles.featureHeader}>
                <div className={styles.featureIcon}>
                  {expandedFeature === index ? (
                    <ChevronUp20Regular className={styles.chevronIcon} />
                  ) : (
                    <ChevronDown20Regular className={styles.chevronIcon} />
                  )}
                </div>
                <div className={styles.featureContent}>
                  <Text className={styles.featureTitle}>{feature.title}</Text>
                  {expandedFeature === index && (
                    <Text className={styles.featureDescription}>
                      {feature.description}
                    </Text>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Deployment Process */}
      {activeTab === "deployment" && (
        <div className={styles.featuresList}>
          <Text className={styles.deploymentPlaceholder}>
            Deployment process details will be shown here.
          </Text>
        </div>
      )}

      {/* Action Buttons */}
      <div className={styles.buttonsContainer}>
        <button className={styles.secondaryButton} onClick={onCreateDeployment}>
          <span>Create deployment plan</span>
          <Send16Regular />
        </button>
        <button className={styles.secondaryButton} onClick={onExplainChoice}>
          <span>Explain how you chose this workload</span>
          <Send16Regular />
        </button>
      </div>
    </div>
  );
};
