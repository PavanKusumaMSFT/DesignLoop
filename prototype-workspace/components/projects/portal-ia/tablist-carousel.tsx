/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Carousel,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselViewport,
  CarouselSlider,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Send16Regular,
  Checkmark20Regular,
  Code24Regular,
  Cube24Regular,
  Copy16Regular,
} from "@fluentui/react-icons";
import { useState } from "react";

const useStyles = makeStyles({
  container: {
    marginTop: "40px",
    marginBottom: "32px",
    padding: "8px",
    marginRight: "-8px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
  },
  seeAll: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "0",
    ":hover": {
      textDecoration: "underline",
    },
  },
  subtitle: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "16px",
  },
  tabList: {
    display: "flex",
    gap: "8px",
    marginBottom: "24px",
    borderBottom: "none",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabButtons: {
    display: "flex",
    gap: "8px",
  },
  tab: {
    padding: "8px 0",
    marginRight: "16px",
    fontSize: "14px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground2,
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    cursor: "pointer",
    transition: "all 0.2s ease",
    ":hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  tabActive: {
    color: tokens.colorBrandForeground1,
    borderBottomColor: tokens.colorBrandForeground1,
  },
  carouselWrapper: {
    position: "relative",
    padding: "8px 0 16px 0",
  },
  fadeOverlay: {
    position: "absolute",
    top: "8px",
    right: "0",
    bottom: "16px",
    width: "120px",
    background: `linear-gradient(to left, ${tokens.colorNeutralBackground2} 0%, transparent 100%)`,
    pointerEvents: "none",
    zIndex: 1,
  },
  carouselSlider: {
    gap: "16px",
    display: "grid",
    gridAutoFlow: "column",
    gridAutoColumns: "400px",
  },
  carouselCardWrapper: {
    minWidth: "400px",
    maxWidth: "400px",
    display: "flex",
  },
  card: {
    minWidth: "400px",
    maxWidth: "400px",
    minHeight: "400px",
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: "none",
    borderRadius: "18px",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "0",
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
    transition: "all 0.2s",
    ":hover": {
      boxShadow:
        "0 20px 16px 0 rgba(0, 30, 68, 0.05), 0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
    },
  },
  videoSection: {
    position: "relative",
    width: "100%",
    height: "200px",
    backgroundColor: "#001F3F",
    borderRadius: "8px",
    overflow: "hidden",
  },
  videoThumbnail: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  videoDuration: {
    position: "absolute",
    top: "12px",
    left: "12px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "600",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
  },
  videoTitle: {
    position: "absolute",
    bottom: "12px",
    left: "12px",
    right: "12px",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
  },
  videoMeta: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
  },
  icon: {
    width: "40px",
    height: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  serviceTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
  },
  serviceDescription: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.5",
    marginBottom: "16px",
  },
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px",
  },
  feature: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.4",
  },
  checkmark: {
    color: tokens.colorPaletteGreenForeground1,
    marginTop: "2px",
    flexShrink: 0,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "auto",
    paddingTop: "16px",
    paddingLeft: "12px",
    paddingBottom: "8px",
  },
  primaryButton: {
    padding: "6px 12px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "20px",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
    width: "fit-content",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      transform: "translateY(-1px)",
    },
  },
  secondaryButton: {
    padding: "6px 12px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "20px",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
    width: "fit-content",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      transform: "translateY(-1px)",
    },
  },
  templateCard: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "24px",
    height: "100%",
    borderRadius: "14px",
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "rgba(59, 130, 246, 0.04)",
    },
  },
  templateHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "0",
  },
  templateTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  templateBadge: {
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "16px",
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 8px",
    borderRadius: "12px",
    height: "24px",
    width: "fit-content",
  },
  templateDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "8px",
  },
  templateFooter: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "8px",
    marginTop: "auto",
    paddingTop: "12px",
  },
  templateTag: {
    fontSize: "10px",
    padding: "2px 6px",
    borderRadius: "4px",
    backgroundColor: "#f0f0f0",
    color: tokens.colorNeutralForeground2,
    fontWeight: "500",
  },
  contentSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "24px",
    borderRadius: "14px",
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: "rgba(59, 130, 246, 0.04)",
    },
  },
  serviceCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  serviceIconImg: {
    width: "32px",
    height: "32px",
  },
  serviceBadge: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundInverted,
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
  },
  templateCardGrid: {
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.06) 1px, transparent 1px)
    `,
    backgroundSize: "20px 20px",
  },
  iconRow: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "12px",
  },
  iconContainer: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBgBlue: { backgroundColor: "rgba(59, 130, 246, 0.1)" },
  iconBgGreen: { backgroundColor: "rgba(34, 197, 94, 0.1)" },
  iconBgPurple: { backgroundColor: "rgba(139, 92, 246, 0.1)" },
  iconBgAmber: { backgroundColor: "rgba(245, 158, 11, 0.1)" },
  iconBgEmerald: { backgroundColor: "rgba(16, 185, 129, 0.1)" },
  iconBgRed: { backgroundColor: "rgba(239, 68, 68, 0.1)" },
  iconBgVsBlue: { backgroundColor: "rgba(0, 122, 204, 0.1)" },
  iconBgAzureBlue: { backgroundColor: "rgba(0, 120, 212, 0.1)" },
  iconBgDefault: { backgroundColor: tokens.colorNeutralBackground3 },
  fluentIconSmall: {
    width: "20px",
    height: "20px",
    color: tokens.colorBrandForeground1,
  },
  toolIconImg: {
    width: "20px",
    height: "20px",
  },
  badgePopular: {
    backgroundColor: tokens.colorStatusSuccessBackground1,
    color: tokens.colorStatusSuccessForeground1,
    border: `1px solid ${tokens.colorStatusSuccessForeground1}`,
  },
  badgeRecommended: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    border: `1px solid ${tokens.colorBrandForeground1}`,
  },
  badgeDefault: {
    backgroundColor: tokens.colorStatusWarningBackground1,
    color: tokens.colorStatusWarningForeground1,
    border: `1px solid ${tokens.colorStatusWarningForeground1}`,
  },
  cliCommandBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "8px",
    fontFamily: "monospace",
    backgroundColor: tokens.colorNeutralBackground4,
    padding: "4px 8px",
    borderRadius: "4px",
    gap: "8px",
  },
  copyIcon: {
    cursor: "pointer",
    flexShrink: 0,
    color: tokens.colorNeutralForeground2,
  },
  tagsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "12px",
  },
});

interface TabListCarouselProps {
  tabs?: string[];
  experienceLevel?: "new" | "smb" | "enterprise";
}

export function TabListCarousel({
  tabs = ["Services", "Templates", "Developer Tools", "Marketplace"],
  experienceLevel = "new",
}: TabListCarouselProps) {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState(0);

  const getIconBgClass = (color?: string) => {
    if (!color) return styles.iconBgDefault;
    const map: Record<string, string> = {
      "rgba(59, 130, 246, 0.1)": styles.iconBgBlue,
      "rgba(34, 197, 94, 0.1)": styles.iconBgGreen,
      "rgba(139, 92, 246, 0.1)": styles.iconBgPurple,
      "rgba(245, 158, 11, 0.1)": styles.iconBgAmber,
      "rgba(16, 185, 129, 0.1)": styles.iconBgEmerald,
      "rgba(239, 68, 68, 0.1)": styles.iconBgRed,
      "rgba(0, 122, 204, 0.1)": styles.iconBgVsBlue,
      "rgba(0, 120, 212, 0.1)": styles.iconBgAzureBlue,
    };
    return map[color] || styles.iconBgDefault;
  };

  const getBadgeClass = (badge: string) => {
    if (badge === "Popular") return styles.badgePopular;
    if (badge === "Recommended") return styles.badgeRecommended;
    return styles.badgeDefault;
  };

  // Dynamic content based on active tab
  const getTabContent = () => {
    switch (activeTab) {
      case 0: // Services
        if (experienceLevel === "new") {
          return {
            title: "Recommended services",
            subtitle:
              "Get started with these essential Azure services perfect for building your first application.",
          };
        } else if (experienceLevel === "smb") {
          return {
            title: "Recommended services",
            subtitle:
              "Scale your business with these services designed for growing teams and workloads.",
          };
        } else {
          return {
            title: "Recommended services",
            subtitle:
              "Enterprise-grade services for mission-critical workloads and complex architectures.",
          };
        }
      case 1: // Templates
        if (experienceLevel === "new") {
          return {
            title: "Popular templates",
            subtitle:
              "Jumpstart your project with these beginner-friendly templates ready to deploy in minutes.",
          };
        } else if (experienceLevel === "smb") {
          return {
            title: "Popular templates",
            subtitle:
              "Production-ready templates to accelerate your team's development and deployment.",
          };
        } else {
          return {
            title: "Popular templates",
            subtitle:
              "Enterprise-tested templates with advanced configurations and compliance built-in.",
          };
        }
      case 2: // Tools
        if (experienceLevel === "new") {
          return {
            title: "Developer Tools",
            subtitle:
              "Everything you need to start building on Azure with easy-to-use tools and resources.",
          };
        } else if (experienceLevel === "smb") {
          return {
            title: "Developer Tools",
            subtitle:
              "Streamline your team's workflow with these productivity and collaboration tools.",
          };
        } else {
          return {
            title: "Developer Tools",
            subtitle:
              "Professional-grade tools for enterprise development, governance, and automation.",
          };
        }
      case 3: // Marketplace
        if (experienceLevel === "new") {
          return {
            title: "Marketplace offerings",
            subtitle:
              "Discover popular third-party services to enhance your Azure applications.",
          };
        } else if (experienceLevel === "smb") {
          return {
            title: "Marketplace offerings",
            subtitle:
              "Extend your solutions with trusted partner services for monitoring, security, and more.",
          };
        } else {
          return {
            title: "Marketplace offerings",
            subtitle:
              "Enterprise-grade partner solutions for advanced integration and compliance needs.",
          };
        }
      default:
        return {
          title: "Recommended services",
          subtitle:
            "Based on your activity, here is a list of recommended services.",
        };
    }
  };

  const { title, subtitle } = getTabContent();

  console.log("TabListCarousel rendering"); // Debug log

  // Dynamic service cards based on experience level
  const getServiceCards = () => {
    if (experienceLevel === "enterprise") {
      return [
        {
          type: "service",
          icon: "/icons/Kubernetes-Services.svg",
          iconBgColor: "rgba(34, 197, 94, 0.1)",
          title: "Azure Kubernetes Service",
          description:
            "Deploy and scale containerized applications with enterprise-grade orchestration and management.",
          badge: "Recommended",
          features: [
            "Enterprise-grade container orchestration",
            "Built-in security and compliance",
            "Auto-scaling and self-healing clusters",
            "Azure Arc integration for hybrid deployments",
          ],
          buttons: [
            { label: "Deploy AKS cluster", primary: true },
            { label: "View enterprise architectures", primary: false },
          ],
        },
        {
          type: "service",
          icon: "/icons/Service-Fabric-Clusters.svg",
          iconBgColor: "rgba(139, 92, 246, 0.1)",
          title: "Azure Service Fabric",
          description:
            "Build and operate always-on, scalable, distributed microservices applications.",
          features: [
            "Microservices platform for mission-critical apps",
            "Built-in monitoring and diagnostics",
            "Rolling upgrades with zero downtime",
            "Stateful and stateless service support",
          ],
          buttons: [
            { label: "Deploy Service Fabric", primary: true },
            { label: "Compare to AKS", primary: false },
          ],
        },
        {
          type: "service",
          icon: "/icons/Azure-Synapse-Analytics.svg",
          iconBgColor: "rgba(245, 158, 11, 0.1)",
          title: "Azure Synapse Analytics",
          description:
            "Limitless analytics service with unmatched time to insight across data warehouses and big data.",
          badge: "Popular",
          features: [
            "Unified data integration and analytics",
            "Enterprise data warehousing at scale",
            "Built-in Apache Spark and SQL analytics",
            "Real-time and batch data processing",
          ],
          buttons: [
            { label: "Create Synapse workspace", primary: true },
            { label: "View analytics architectures", primary: false },
          ],
        },
        {
          type: "service",
          icon: "/icons/Azure-Arc.svg",
          iconBgColor: "rgba(16, 185, 129, 0.1)",
          title: "Azure Arc",
          description:
            "Extend Azure management and services to any infrastructure across on-premises and multi-cloud.",
          badge: "Recommended",
          features: [
            "Hybrid and multi-cloud management",
            "Consistent deployment and governance",
            "Run Azure services anywhere",
            "Unified security and compliance",
          ],
          buttons: [
            { label: "Enable Azure Arc", primary: true },
            { label: "Explore hybrid solutions", primary: false },
          ],
        },
      ];
    } else if (experienceLevel === "smb") {
      return [
        {
          type: "service",
          icon: "/icons/Azure-Migrate.svg",
          iconBgColor: "rgba(59, 130, 246, 0.1)",
          title: "Azure Migrate",
          description:
            "Discover, assess, and migrate your on-premises workloads to Azure with guided tools.",
          badge: "Recommended",
          features: [
            "Free migration assessment tools",
            "Agentless discovery and assessment",
            "Cost estimation and optimization",
            "Guided migration workflows",
          ],
          buttons: [
            { label: "Start migration assessment", primary: true },
            { label: "Calculate migration costs", primary: false },
          ],
        },
        {
          type: "service",
          icon: "/icons/Network-Security-Hub.svg",
          iconBgColor: "rgba(239, 68, 68, 0.1)",
          title: "Azure Network Security",
          description:
            "Protect your business with network security groups, firewalls, and DDoS protection.",
          badge: "Popular",
          features: [
            "Network security groups and firewalls",
            "DDoS protection for business-critical apps",
            "Web Application Firewall (WAF)",
            "Secure connectivity with VPN Gateway",
          ],
          buttons: [
            { label: "Configure network security", primary: true },
            { label: "View security best practices", primary: false },
          ],
        },
        {
          type: "service",
          icon: "/icons/SQL-Database.svg",
          iconBgColor: "rgba(245, 158, 11, 0.1)",
          title: "Azure SQL Database",
          description:
            "Fully managed intelligent SQL database with built-in high availability and security.",
          badge: "Recommended",
          features: [
            "Built-in high availability (99.99% SLA)",
            "Automated backups and point-in-time restore",
            "Intelligent query optimization",
            "Enterprise-grade security and compliance",
          ],
          buttons: [
            { label: "Create SQL database", primary: true },
            { label: "Migrate from on-premises", primary: false },
          ],
        },
        {
          type: "service",
          icon: "/icons/Windows-Virtual-Desktop.svg",
          iconBgColor: "rgba(139, 92, 246, 0.1)",
          title: "Windows Virtual Desktop",
          description:
            "Enable secure remote work with virtualized Windows desktops and apps in the cloud.",
          badge: "Popular",
          features: [
            "Multi-session Windows 10/11 experience",
            "Optimized for Microsoft 365 apps",
            "Flexible pricing and licensing",
            "Built-in security and management",
          ],
          buttons: [
            { label: "Set up virtual desktop", primary: true },
            { label: "Explore remote work solutions", primary: false },
          ],
        },
      ];
    } else {
      // new/free trial experience
      return [
        {
          type: "service",
          icon: "/icons/App-Services.svg",
          iconBgColor: "rgba(59, 130, 246, 0.1)",
          title: "App Service",
          description:
            "Deploy web apps, mobile backends, and APIs without managing infrastructure.",
          badge: "Best for you",
          features: [
            "Native Azure OpenAI integration for AI apps",
            "Deploy small language models locally",
            "Network isolation and encryption",
            "Built-in GitHub integration",
          ],
          buttons: [
            { label: "Deploy this service for...", primary: true },
            {
              label: "Do S&P 500 AI companies use this service?",
              primary: false,
            },
          ],
        },
        {
          type: "service",
          icon: "/icons/Function-App.svg",
          iconBgColor: "rgba(34, 197, 94, 0.1)",
          title: "Azure Functions",
          description:
            "Build serverless apps that run code on demand without worrying about servers.",
          features: [
            "Pay only for execution time",
            "Auto-scaling based on demand",
            "Multiple language support",
            "Integrated monitoring and logging",
          ],
          buttons: [
            { label: "Deploy Function App", primary: true },
            { label: "Compare to App Service", primary: false },
          ],
        },
        {
          type: "service",
          icon: "/icons/containerapps.svg",
          iconBgColor: "rgba(139, 92, 246, 0.1)",
          title: "Container Apps",
          description:
            "Run your app in containers with automatic scaling and built-in microservices support.",
          badge: "Popular",
          features: [
            "Deploy containers without Kubernetes complexity",
            "Built-in microservices patterns",
            "Automatic HTTPS and custom domains",
            "Scale to zero for cost savings",
          ],
          buttons: [
            { label: "Deploy Container App", primary: true },
            { label: "View container best practices", primary: false },
          ],
        },
        {
          type: "service",
          icon: "/icons/Static-Web-Apps.svg",
          iconBgColor: "rgba(245, 158, 11, 0.1)",
          title: "Static Web Apps",
          description:
            "Build and deploy modern web applications with integrated CI/CD and global distribution.",
          features: [
            "Automatic deployment from GitHub",
            "Global CDN for fast content delivery",
            "Native GitHub and Azure DevOps integration",
            "Free SSL and custom domains",
          ],
          buttons: [
            { label: "Compare Static Web Apps to App Service", primary: true },
            { label: "Suggest more services like this", primary: false },
          ],
        },
        {
          type: "service",
          icon: "/icons/Kubernetes-Services.svg",
          iconBgColor: "rgba(34, 197, 94, 0.1)",
          title: "Azure Kubernetes Service",
          description:
            "Deploy and scale containers on managed Kubernetes with integrated CI/CD.",
          features: [
            "Simplified cluster management",
            "Integrated monitoring and logging",
            "Auto-scaling and self-healing",
            "Enterprise-grade security and compliance",
          ],
          buttons: [
            { label: "Deploy AKS cluster", primary: true },
            { label: "Compare to Container Apps", primary: false },
          ],
        },
      ];
    }
  };

  const templateCards = [
    // Template cards
    {
      type: "template",
      title: "Azure OpenAI Chat Frontend",
      description:
        "Features a Chat-GPT-like user interface, including additional capabilities to debug responses, restyle, revisit history and reset the chat.",
      badge: "Popular",
      cliCommand: "azd init -t azure-openai-chat-frontend",
      tags: [
        "Azure OpenAI Service",
        "Azure AI Search",
        "Azure Blob Storage",
        "TypeScript",
        "JavaScript",
        "React",
      ],
      buttons: [{ label: "Use Template", primary: true }],
    },
    {
      type: "template",
      title: "Azure OpenAI keyless deployment",
      description:
        "Example Azure OpenAI deployment and RBAC role for your user account for keyless access",
      cliCommand: "azd init -t azure-openai-keyless-js",
      tags: [
        "Azure OpenAI Service",
        "Azure Managed Identities",
        "Bicep",
        "Node.js",
        "Serverless API",
        "GPT",
      ],
      buttons: [{ label: "Use Template", primary: true }],
    },
    {
      type: "template",
      title: "Azure OpenAI secure UI starter",
      description:
        "Reusable OpenAI secure UI and infrastructure for AI Chat with Azure",
      badge: "Recommended",
      cliCommand: "azd init -t openai-secure-ui-js",
      tags: [
        "Azure OpenAI Service",
        "Azure Functions",
        "Bicep",
        "JavaScript",
        "Azure Managed Identities",
        "GPT",
      ],
      buttons: [{ label: "Use Template", primary: true }],
    },
    {
      type: "template",
      title: "Todo Application with C# API",
      description:
        "A complete ToDo application that includes everything you need to build, deploy, and monitor an Azure solution.",
      cliCommand: "azd init -t todo-csharp-sql",
      tags: ["C#", ".NET", "Azure Cosmos DB", "Azure App Service"],
      buttons: [{ label: "Use Template", primary: true }],
    },
    {
      type: "template",
      title: "React Web App with Node.js API",
      description:
        "A blueprint for getting a React web app with a Node.js API and a MongoDB database running on Azure.",
      cliCommand: "azd init -t todo-nodejs-mongo",
      tags: [
        "React",
        "Node.js",
        "MongoDB",
        "Azure App Service",
        "JavaScript",
        "Express",
      ],
      buttons: [{ label: "Use Template", primary: true }],
    },
    {
      type: "template",
      title: "Python Web App with MongoDB",
      description:
        "A complete Python web application with a MongoDB database and Azure Application Insights for monitoring.",
      badge: "New",
      cliCommand: "azd init -t todo-python-mongo",
      tags: [
        "Python",
        "Flask",
        "MongoDB",
        "Application Insights",
        "Azure App Service",
        "Web Framework",
      ],
      buttons: [{ label: "Use Template", primary: true }],
    },
  ];

  const toolCards = [
    // Tools cards
    {
      type: "tool",
      fluentIcon: "Cube24Regular",
      iconBgColor: "rgba(139, 92, 246, 0.1)",
      title: "Architecture Builder",
      description:
        "Design and visualize your application architecture with our interactive builder. Drag and drop Azure services to create your deployment blueprint.",
      buttons: [{ label: "Launch Builder", primary: true }],
    },
    {
      type: "tool",
      icon: "/icons/vscode.svg",
      iconBgColor: "rgba(0, 122, 204, 0.1)",
      title: "Deploy with VSCode for Web",
      description:
        "Use browser-based VSCode to deploy templates directly to Azure without local setup.",
      buttons: [{ label: "Learn More", primary: true }],
    },
    {
      type: "tool",
      fluentIcon: "Code24Regular",
      iconBgColor: "rgba(0, 120, 212, 0.1)",
      title: "Using Azure CLI & CloudShell",
      description:
        "Deploy and manage templates using command-line tools and cloud-based terminal.",
      buttons: [{ label: "Get Started", primary: true }],
    },
  ];

  const marketplaceCards = [
    // Marketplace cards
    {
      type: "marketplace",
      title: "MongoDB Atlas",
      description:
        "Fully-managed cloud database service with automated backups, monitoring, and scaling capabilities.",
      badge: "Popular",
      tags: ["Database", "NoSQL", "Cloud Service", "Managed"],
      buttons: [{ label: "View in Marketplace", primary: true }],
    },
    {
      type: "marketplace",
      title: "Datadog Monitoring",
      description:
        "End-to-end monitoring platform for cloud-scale applications with real-time metrics and analytics.",
      tags: ["Monitoring", "Analytics", "APM", "Cloud Native"],
      buttons: [{ label: "View in Marketplace", primary: true }],
    },
    {
      type: "marketplace",
      title: "Auth0 Identity Platform",
      description:
        "Flexible authentication and authorization platform for modern applications with enterprise security.",
      badge: "Recommended",
      tags: ["Security", "Authentication", "Identity", "SSO"],
      buttons: [{ label: "View in Marketplace", primary: true }],
    },
    {
      type: "marketplace",
      title: "SendGrid Email API",
      description:
        "Reliable email delivery service with advanced analytics, templates, and deliverability tools.",
      tags: ["Email", "API", "Communication", "Marketing"],
      buttons: [{ label: "View in Marketplace", primary: true }],
    },
    {
      type: "marketplace",
      title: "Twilio Communications",
      description:
        "Programmable communication APIs for voice, messaging, video, and authentication.",
      tags: ["SMS", "Voice", "Video", "API"],
      buttons: [{ label: "View in Marketplace", primary: true }],
    },
    {
      type: "marketplace",
      title: "Elastic Cloud",
      description:
        "Managed Elasticsearch, Kibana, and observability tools for search and analytics at scale.",
      badge: "New",
      tags: ["Search", "Analytics", "Observability", "Logging"],
      buttons: [{ label: "View in Marketplace", primary: true }],
    },
  ];

  // Combine all card types
  const allCards = [
    ...getServiceCards(),
    ...templateCards,
    ...toolCards,
    ...marketplaceCards,
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tabList}>
        <div className={styles.tabButtons}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`${styles.tab} ${activeTab === index ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.title}>{title}</div>

      <div className={styles.header}>
        <div className={styles.subtitle}>{subtitle}</div>
        <button className={styles.seeAll}>
          <span>See all {tabs[activeTab].toLowerCase()}</span>
        </button>
      </div>

      <div className={styles.carouselWrapper}>
        <Carousel key={activeTab}>
          <CarouselViewport>
            <CarouselSlider className={styles.carouselSlider}>
              {allCards
                .filter((c) =>
                  activeTab === 0
                    ? c.type === "service"
                    : activeTab === 1
                      ? c.type === "template"
                      : activeTab === 2
                        ? c.type === "tool"
                        : activeTab === 3
                          ? c.type === "marketplace"
                          : false,
                )
                .map((card, index) => (
                  <CarouselCard
                    key={index}
                    className={styles.carouselCardWrapper}
                  >
                    <div className={styles.card}>
                      {card.type === "service" ? (
                        <>
                          <div className={styles.contentSection}>
                            <div className={styles.serviceCardHeader}>
                              <div className={styles.icon}>
                                {(card as any).icon?.startsWith("/") ? (
                                  <img
                                    src={(card as any).icon}
                                    alt={card.title}
                                    className={styles.serviceIconImg}
                                  />
                                ) : (
                                  <span>{(card as any).icon}</span>
                                )}
                              </div>
                              {(card as any).badge && (
                                <div className={styles.serviceBadge}>
                                  {(card as any).badge}
                                </div>
                              )}
                            </div>

                            <div className={styles.serviceTitle}>
                              {card.title}
                            </div>
                            <div className={styles.serviceDescription}>
                              {card.description}
                            </div>

                            <div className={styles.featureList}>
                              {(card as any).features?.map(
                                (feature: string, idx: number) => (
                                  <div key={idx} className={styles.feature}>
                                    <Checkmark20Regular
                                      className={styles.checkmark}
                                    />
                                    <span>{feature}</span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>

                          <div className={styles.buttonGroup}>
                            {card.buttons?.map((button: any, idx: number) => (
                              <button
                                key={idx}
                                className={
                                  button.primary
                                    ? styles.primaryButton
                                    : styles.secondaryButton
                                }
                              >
                                <span>{button.label}</span>
                                <Send16Regular />
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div
                          className={
                            card.title === "Architecture Builder"
                              ? mergeClasses(
                                  styles.templateCard,
                                  styles.templateCardGrid,
                                )
                              : styles.templateCard
                          }
                        >
                          {((card as any).icon || (card as any).fluentIcon) && (
                            <div className={styles.iconRow}>
                              <div
                                className={mergeClasses(
                                  styles.iconContainer,
                                  getIconBgClass((card as any).iconBgColor),
                                )}
                              >
                                {(card as any).fluentIcon ===
                                "Code24Regular" ? (
                                  <Code24Regular
                                    className={styles.fluentIconSmall}
                                  />
                                ) : (card as any).fluentIcon ===
                                  "Cube24Regular" ? (
                                  <Cube24Regular
                                    className={styles.fluentIconSmall}
                                  />
                                ) : (card as any).icon ? (
                                  <img
                                    src={(card as any).icon}
                                    alt={card.title}
                                    className={styles.toolIconImg}
                                  />
                                ) : null}
                              </div>
                            </div>
                          )}
                          <div className={styles.templateHeader}>
                            <span className={styles.templateTitle}>
                              {card.title}
                            </span>
                            {(card as any).badge && (
                              <div
                                className={mergeClasses(
                                  styles.templateBadge,
                                  getBadgeClass((card as any).badge),
                                )}
                              >
                                {(card as any).badge}
                              </div>
                            )}
                          </div>
                          {(card as any).cliCommand && (
                            <div className={styles.cliCommandBox}>
                              <span>{(card as any).cliCommand}</span>
                              <Copy16Regular
                                className={styles.copyIcon}
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    (card as any).cliCommand || "",
                                  )
                                }
                              />
                            </div>
                          )}
                          <div className={styles.templateDescription}>
                            {card.description}
                          </div>
                          {(card as any).tags &&
                            (card as any).tags.length > 0 && (
                              <div className={styles.tagsWrapper}>
                                {(card as any).tags.map(
                                  (tag: string, idx: number) => (
                                    <span
                                      key={idx}
                                      className={styles.templateTag}
                                    >
                                      {tag}
                                    </span>
                                  ),
                                )}
                              </div>
                            )}
                          <div className={styles.templateFooter}>
                            {card.buttons?.map((button: any, idx: number) => (
                              <button
                                key={idx}
                                className={styles.primaryButton}
                              >
                                <span>{button.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CarouselCard>
                ))}
            </CarouselSlider>
          </CarouselViewport>

          <CarouselNavContainer
            layout="inline"
            next={{ "aria-label": "go to next" }}
            prev={{ "aria-label": "go to prev" }}
          >
            <CarouselNav>
              {(index) => (
                <CarouselNavButton
                  aria-label={`Carousel Nav Button ${index}`}
                />
              )}
            </CarouselNav>
          </CarouselNavContainer>
        </Carousel>
        <div className={styles.fadeOverlay} />
      </div>
    </div>
  );
}
