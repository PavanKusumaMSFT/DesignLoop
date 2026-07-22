"use client";

import { useState } from "react";
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  tokens as fluentTokens,
  Button,
  Input,
  Text,
  SearchBox,
} from "@fluentui/react-components";
type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { ChevronLeft20Regular, Search20Regular } from "@fluentui/react-icons";
import { TopNav } from "./top-nav";
import { useNavigation } from "../../lib/navigation-context";

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
  breadcrumbSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "12px 24px",
  },
  breadcrumbContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  breadcrumbItem: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    textDecoration: "none",
    cursor: "pointer",
    ":hover": {
      color: tokens.colorBrandForeground1,
    },
  },
  breadcrumbCurrent: {
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },
  breadcrumbSeparator: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
  header: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "16px 32px",
  },
  mainContent: {
    display: "flex",
    flex: 1,
    maxWidth: "1400px",
    width: "100%",
    margin: "0 auto",
    gap: "24px",
    padding: "24px",
  },
  leftSection: {
    flex: "0 0 220px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  categoryItem: {
    padding: "12px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "14px",
    transition: "all 0.2s",
    backgroundColor: "transparent",
    border: "none",
    width: "100%",
    textAlign: "left",
    color: tokens.colorNeutralForeground2,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  categoryItemActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  centerSection: {
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "32px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "16px",
    marginTop: "24px",
  },
  serviceCard: {
    padding: "20px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: tokens.colorNeutralBackground1,
    ":hover": {
      boxShadow: tokens.shadow8,
    },
  },
  serviceIcon: {
    width: "40px",
    height: "40px",
    marginBottom: "12px",
  },
  serviceIconContainer: {
    width: "40px",
    height: "40px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "12px",
  },
  serviceName: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
  },
  serviceDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.4",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  backButton: {
    minWidth: "auto",
    padding: tokens.spacingVerticalS,
    color: tokens.colorBrandForeground1,
  },
  pageTitle: {
    display: "block",
  },
  pageSubtitle: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginTop: tokens.spacingVerticalXS,
  },
  stickyNav: {
    position: "sticky",
    top: "24px",
    alignSelf: "flex-start",
  },
  categoriesHeading: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    display: "block",
  },
  searchSection: {
    marginBottom: tokens.spacingVerticalXXL,
  },
  searchInput: {
    maxWidth: "400px",
  },
  sectionTitle: {
    display: "block",
    marginBottom: tokens.spacingVerticalS,
  },
  sectionSubtitle: {
    color: tokens.colorNeutralForeground2,
    display: "block",
    marginBottom: tokens.spacingVerticalL,
  },
  serviceIconImg: {
    width: "24px",
    height: "24px",
  },
  emptyState: {
    textAlign: "center",
    padding: "48px",
    color: tokens.colorNeutralForeground3,
  },
  emptyStateIcon: {
    fontSize: "48px",
    marginBottom: tokens.spacingVerticalL,
  },
  emptyStateText: {
    display: "block",
  },
});

interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
}

const categories: Category[] = [
  { id: "all", name: "All services" },
  { id: "compute", name: "Compute" },
  { id: "networking", name: "Networking" },
  { id: "storage", name: "Storage" },
  { id: "databases", name: "Databases" },
  { id: "web", name: "Web" },
  { id: "mobile", name: "Mobile" },
  { id: "containers", name: "Containers" },
  { id: "ai-ml", name: "AI + Machine Learning" },
  { id: "analytics", name: "Analytics" },
  { id: "iot", name: "Internet of Things" },
  { id: "devops", name: "Developer Tools" },
  { id: "security", name: "Security" },
  { id: "identity", name: "Identity" },
  { id: "integration", name: "Integration" },
  { id: "management", name: "Management and Governance" },
  { id: "migration", name: "Migration" },
  { id: "mixed-reality", name: "Mixed Reality" },
  { id: "monitoring", name: "Monitor" },
];

const services: Service[] = [
  // Compute
  {
    id: "vm",
    name: "Virtual Machines",
    description: "Provision Windows and Linux virtual machines in seconds",
    icon: "/icons/virtual-machine.svg",
    category: "compute",
  },
  {
    id: "app-service",
    name: "App Service",
    description: "Quickly create powerful cloud apps for web and mobile",
    icon: "/icons/App-Services.svg",
    category: "compute",
  },
  {
    id: "functions",
    name: "Functions",
    description:
      "Execute event-driven serverless code with an end-to-end development experience",
    icon: "/icons/Function-App.svg",
    category: "compute",
  },
  {
    id: "aks",
    name: "Kubernetes Service",
    description:
      "Simplify deployment, management, and operations of Kubernetes",
    icon: "/icons/Kubernetes-Services.svg",
    category: "compute",
  },
  {
    id: "container-apps",
    name: "Container Apps",
    description:
      "Build and deploy modern apps and microservices using serverless containers",
    icon: "/icons/containerapps.svg",
    category: "compute",
  },
  {
    id: "batch",
    name: "Batch",
    description: "Cloud-scale job scheduling and compute management",
    icon: "/icons/Batch-Accounts.svg",
    category: "compute",
  },
  {
    id: "service-fabric",
    name: "Service Fabric",
    description:
      "Develop microservices and orchestrate containers on Windows or Linux",
    icon: "/icons/Service-Fabric-Clusters.svg",
    category: "compute",
  },
  {
    id: "vmss",
    name: "Virtual Machine Scale Sets",
    description: "Manage and scale up to thousands of Linux and Windows VMs",
    icon: "/icons/VM-Scale-Sets.svg",
    category: "compute",
  },

  // Networking
  {
    id: "vnet",
    name: "Virtual Network",
    description:
      "Provision private networks, optionally connect to on-premises datacenters",
    icon: "/icons/Virtual-Networks.svg",
    category: "networking",
  },
  {
    id: "load-balancer",
    name: "Load Balancer",
    description:
      "Deliver high availability and network performance to your applications",
    icon: "/icons/Load-Balancers.svg",
    category: "networking",
  },
  {
    id: "app-gateway",
    name: "Application Gateway",
    description:
      "Build secure, scalable, highly available web front ends in Azure",
    icon: "/icons/Application-Gateways.svg",
    category: "networking",
  },
  {
    id: "vpn-gateway",
    name: "VPN Gateway",
    description: "Establish secure, cross-premises connectivity",
    icon: "/icons/VPN-Gateway.svg",
    category: "networking",
  },
  {
    id: "firewall",
    name: "Azure Firewall",
    description: "Cloud-native, intelligent network firewall security",
    icon: "/icons/Firewalls.svg",
    category: "networking",
  },
  {
    id: "cdn",
    name: "Content Delivery Network",
    description:
      "Ensure secure, reliable content delivery with broad global reach",
    icon: "/icons/CDN-Profiles.svg",
    category: "networking",
  },
  {
    id: "dns",
    name: "DNS",
    description: "Host your DNS domain in Azure",
    icon: "/icons/DNS-Zones.svg",
    category: "networking",
  },
  {
    id: "traffic-manager",
    name: "Traffic Manager",
    description: "Route incoming traffic for high performance and availability",
    icon: "/icons/Traffic-Manager-Profiles.svg",
    category: "networking",
  },

  // Storage
  {
    id: "storage-account",
    name: "Storage Accounts",
    description:
      "Durable, highly available, and massively scalable cloud storage",
    icon: "/icons/Storage.svg",
    category: "storage",
  },
  {
    id: "blob-storage",
    name: "Blob Storage",
    description: "REST-based object storage for unstructured data",
    icon: "/icons/Storage.svg",
    category: "storage",
  },
  {
    id: "disk-storage",
    name: "Disk Storage",
    description: "Persistent, secured disk options supporting virtual machines",
    icon: "/icons/Disks.svg",
    category: "storage",
  },
  {
    id: "file-storage",
    name: "Azure Files",
    description:
      "Simple, secure and serverless enterprise-grade cloud file shares",
    icon: "/icons/Storage.svg",
    category: "storage",
  },
  {
    id: "data-lake",
    name: "Data Lake Storage",
    description:
      "Scalable, secure data lake functionality built on Azure Blob Storage",
    icon: "/icons/Storage.svg",
    category: "storage",
  },
  {
    id: "backup",
    name: "Backup",
    description: "Simple and reliable server backup to the cloud",
    icon: "/icons/backup.svg",
    category: "storage",
  },

  // Databases
  {
    id: "sql-database",
    name: "SQL Database",
    description: "Managed, intelligent SQL in the cloud",
    icon: "/icons/SQL-Database.svg",
    category: "databases",
  },
  {
    id: "cosmos-db",
    name: "Cosmos DB",
    description: "Fast NoSQL database with open APIs for any scale",
    icon: "/icons/Azure-Cosmos-DB.svg",
    category: "databases",
  },
  {
    id: "azure-sql",
    name: "Azure SQL",
    description: "Managed SQL Server instances in the cloud",
    icon: "/icons/SQL-Server.svg",
    category: "databases",
  },
  {
    id: "mysql",
    name: "Database for MySQL",
    description: "Managed MySQL database service for app developers",
    icon: "/icons/Azure-Database-MySQL-Server.svg",
    category: "databases",
  },
  {
    id: "postgresql",
    name: "Database for PostgreSQL",
    description: "Managed PostgreSQL database service for app developers",
    icon: "/icons/Azure-Database-PostgreSQL-Server.svg",
    category: "databases",
  },
  {
    id: "redis",
    name: "Cache for Redis",
    description:
      "Power applications with high-throughput, low-latency data access",
    icon: "/icons/Redis-Cache.svg",
    category: "databases",
  },

  // Web
  {
    id: "static-web-apps",
    name: "Static Web Apps",
    description:
      "Modern web app service for streamlined full-stack development",
    icon: "/icons/Static-Web-Apps.svg",
    category: "web",
  },
  {
    id: "api-management",
    name: "API Management",
    description:
      "Publish APIs to developers, partners, and employees securely and at scale",
    icon: "/icons/API-Management-Services.svg",
    category: "web",
  },
  {
    id: "signalr",
    name: "SignalR Service",
    description: "Add real-time web functionalities easily",
    icon: "/icons/SignalR.svg",
    category: "web",
  },

  // Containers
  {
    id: "container-registry",
    name: "Container Registry",
    description:
      "Store and manage container images across all types of deployments",
    icon: "/icons/Container-Registries.svg",
    category: "containers",
  },
  {
    id: "container-instances",
    name: "Container Instances",
    description: "Easily run containers on Azure without managing servers",
    icon: "/icons/Container-Instances.svg",
    category: "containers",
  },

  // AI + ML
  {
    id: "cognitive-services",
    name: "Cognitive Services",
    description: "Add smart API capabilities to enable contextual interactions",
    icon: "/icons/Cognitive-Services.svg",
    category: "ai-ml",
  },
  {
    id: "openai",
    name: "Azure OpenAI Service",
    description: "Apply advanced language models to a variety of use cases",
    icon: "/icons/Azure-OpenAI.svg",
    category: "ai-ml",
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    description: "Build, train, and deploy machine learning models",
    icon: "/icons/Machine-Learning.svg",
    category: "ai-ml",
  },
  {
    id: "bot-service",
    name: "Bot Service",
    description: "Intelligent, serverless bot service that scales on demand",
    icon: "/icons/Bot-Services.svg",
    category: "ai-ml",
  },
  {
    id: "computer-vision",
    name: "Computer Vision",
    description:
      "Extract information from images to categorize and process visual data",
    icon: "/icons/Computer-Vision.svg",
    category: "ai-ml",
  },

  // Analytics
  {
    id: "synapse",
    name: "Synapse Analytics",
    description: "Limitless analytics service with unmatched time to insight",
    icon: "/icons/Azure-Synapse-Analytics.svg",
    category: "analytics",
  },
  {
    id: "databricks",
    name: "Databricks",
    description:
      "Fast, easy, and collaborative Apache Spark-based analytics platform",
    icon: "/icons/Azure-Databricks.svg",
    category: "analytics",
  },
  {
    id: "data-factory",
    name: "Data Factory",
    description: "Hybrid data integration at enterprise scale, made easy",
    icon: "/icons/Data-Factories.svg",
    category: "analytics",
  },
  {
    id: "stream-analytics",
    name: "Stream Analytics",
    description: "Real-time analytics on fast moving streams of data",
    icon: "/icons/Stream-Analytics-Jobs.svg",
    category: "analytics",
  },
  {
    id: "hdinsight",
    name: "HDInsight",
    description:
      "Provision cloud Hadoop, Spark, R Server, HBase, and Storm clusters",
    icon: "/icons/HD-Insight-Clusters.svg",
    category: "analytics",
  },

  // IoT
  {
    id: "iot-hub",
    name: "IoT Hub",
    description: "Connect, monitor, and manage billions of IoT assets",
    icon: "/icons/IoT-Hub.svg",
    category: "iot",
  },
  {
    id: "iot-central",
    name: "IoT Central",
    description: "Accelerate the creation of IoT solutions",
    icon: "/icons/IoT-Central-Applications.svg",
    category: "iot",
  },
  {
    id: "digital-twins",
    name: "Digital Twins",
    description: "Build next-generation IoT spatial intelligence solutions",
    icon: "/icons/Digital-Twins.svg",
    category: "iot",
  },

  // DevOps
  {
    id: "devops",
    name: "Azure DevOps",
    description:
      "Services for teams to share code, track work, and ship software",
    icon: "/icons/Azure-DevOps.svg",
    category: "devops",
  },
  {
    id: "devtest-labs",
    name: "DevTest Labs",
    description:
      "Quickly create environments using reusable templates and artifacts",
    icon: "/icons/DevTest-Labs.svg",
    category: "devops",
  },
  {
    id: "load-testing",
    name: "Load Testing",
    description: "Optimize app performance with high-scale load testing",
    icon: "/icons/Load-Testing.svg",
    category: "devops",
  },

  // Security
  {
    id: "key-vault",
    name: "Key Vault",
    description: "Safeguard and maintain control of keys and other secrets",
    icon: "/icons/Key-Vaults.svg",
    category: "security",
  },
  {
    id: "security-center",
    name: "Security Center",
    description:
      "Unify security management and enable advanced threat protection",
    icon: "/icons/Defender-for-Cloud.svg",
    category: "security",
  },
  {
    id: "sentinel",
    name: "Sentinel",
    description: "Intelligent security analytics for your entire enterprise",
    icon: "/icons/Azure-Sentinel.svg",
    category: "security",
  },
  {
    id: "ddos-protection",
    name: "DDoS Protection",
    description:
      "Protect your applications from Distributed Denial of Service attacks",
    icon: "/icons/DDoS-Protection-Plans.svg",
    category: "security",
  },

  // Identity
  {
    id: "active-directory",
    name: "Active Directory",
    description:
      "Synchronize on-premises directories and enable single sign-on",
    icon: "/icons/Users.svg",
    category: "identity",
  },
  {
    id: "ad-b2c",
    name: "Active Directory B2C",
    description: "Consumer identity and access management in the cloud",
    icon: "/icons/Azure-AD-B2C.svg",
    category: "identity",
  },

  // Integration
  {
    id: "logic-apps",
    name: "Logic Apps",
    description: "Automate the access and use of data across clouds",
    icon: "/icons/Logic-Apps.svg",
    category: "integration",
  },
  {
    id: "service-bus",
    name: "Service Bus",
    description: "Connect across private and public cloud environments",
    icon: "/icons/Service-Bus.svg",
    category: "integration",
  },
  {
    id: "event-grid",
    name: "Event Grid",
    description: "Get reliable event delivery at massive scale",
    icon: "/icons/Event-Grid-Topics.svg",
    category: "integration",
  },
  {
    id: "event-hubs",
    name: "Event Hubs",
    description: "Receive telemetry from millions of devices",
    icon: "/icons/Event-Hubs.svg",
    category: "integration",
  },

  // Management and Governance
  {
    id: "monitor",
    name: "Monitor",
    description:
      "Full observability into your applications, infrastructure, and network",
    icon: "/icons/Monitor.svg",
    category: "management",
  },
  {
    id: "automation",
    name: "Automation",
    description: "Simplify cloud management with process automation",
    icon: "/icons/Automation-Accounts.svg",
    category: "management",
  },
  {
    id: "policy",
    name: "Policy",
    description: "Implement corporate governance and standards at scale",
    icon: "/icons/Policy.svg",
    category: "management",
  },
  {
    id: "blueprints",
    name: "Blueprints",
    description: "Enabling quick, repeatable creation of governed environments",
    icon: "/icons/Blueprints.svg",
    category: "management",
  },
  {
    id: "cost-management",
    name: "Cost Management",
    description:
      "Optimize what you spend on the cloud, while maximizing cloud potential",
    icon: "/icons/Cost-Management.svg",
    category: "management",
  },
  {
    id: "advisor",
    name: "Advisor",
    description:
      "Get personalized recommendations for high availability, security, performance, and cost",
    icon: "/icons/Advisor.svg",
    category: "management",
  },

  // Migration
  {
    id: "migrate",
    name: "Azure Migrate",
    description:
      "Discover, assess, right-size, and migrate your on-premises VMs to Azure",
    icon: "/icons/Azure-Migrate.svg",
    category: "migration",
  },
  {
    id: "site-recovery",
    name: "Site Recovery",
    description: "Orchestrate protection and recovery of private clouds",
    icon: "/icons/Recovery-Services-Vaults.svg",
    category: "migration",
  },
  {
    id: "database-migration",
    name: "Database Migration Service",
    description: "Simplify on-premises database migration to the cloud",
    icon: "/icons/Azure-Database-Migration-Services.svg",
    category: "migration",
  },

  // Mixed Reality
  {
    id: "spatial-anchors",
    name: "Spatial Anchors",
    description: "Create multi-user, spatially aware mixed reality experiences",
    icon: "/icons/Spatial-Anchors-Accounts.svg",
    category: "mixed-reality",
  },
  {
    id: "remote-rendering",
    name: "Remote Rendering",
    description: "Render high-quality, interactive 3D content in the cloud",
    icon: "/icons/Remote-Rendering-Accounts.svg",
    category: "mixed-reality",
  },

  // Monitor
  {
    id: "application-insights",
    name: "Application Insights",
    description:
      "Detect, triage, and diagnose issues in your web apps and services",
    icon: "/icons/Application-Insights.svg",
    category: "monitoring",
  },
  {
    id: "log-analytics",
    name: "Log Analytics",
    description:
      "Collect, analyze, and act on telemetry data from your cloud and on-premises",
    icon: "/icons/Log-Analytics-Workspaces.svg",
    category: "monitoring",
  },
];

const AllServicesPage: React.FC = () => {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        <div className={styles.stickyNav}>
          <TopNav activeLink="Discover" />
        </div>

        <div className={styles.breadcrumbSection}>
          <div className={styles.breadcrumbContainer}>
            <span
              className={styles.breadcrumbItem}
              onClick={() => handlePageChange("home-fre")}
            >
              Home
            </span>
            <span className={styles.breadcrumbSeparator}>›</span>
            <span className={styles.breadcrumbCurrent}>All services</span>
          </div>
        </div>

        <div className={styles.header}>
          <div className={styles.headerRow}>
            <Button
              appearance="subtle"
              icon={<ChevronLeft20Regular />}
              onClick={() => handlePageChange("discover")}
              title="Back to Discover"
              className={styles.backButton}
            />
            <div>
              <Text size={600} weight="semibold" className={styles.pageTitle}>
                All services
              </Text>
              <Text size={300} className={styles.pageSubtitle}>
                Browse all Azure services by category
              </Text>
            </div>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={`${styles.leftSection} ${styles.stickyNav}`}>
            <Text
              size={400}
              weight="semibold"
              className={styles.categoriesHeading}
            >
              Categories
            </Text>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.categoryItem} ${
                  selectedCategory === category.id
                    ? styles.categoryItemActive
                    : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className={styles.centerSection}>
            <div className={styles.searchSection}>
              <SearchBox
                placeholder="Search services..."
                value={searchQuery}
                onChange={(_, data) => setSearchQuery(data.value)}
                className={styles.searchInput}
              />
            </div>

            <Text size={500} weight="semibold" className={styles.sectionTitle}>
              {selectedCategory === "all"
                ? "All services"
                : categories.find((c) => c.id === selectedCategory)?.name}
            </Text>
            <Text size={300} className={styles.sectionSubtitle}>
              {filteredServices.length} service
              {filteredServices.length !== 1 ? "s" : ""} available
            </Text>

            <div className={styles.servicesGrid}>
              {filteredServices.map((service) => (
                <div key={service.id} className={styles.serviceCard}>
                  <div className={styles.serviceIconContainer}>
                    <img
                      src={service.icon}
                      alt={service.name}
                      className={styles.serviceIconImg}
                    />
                  </div>
                  <div className={styles.serviceName}>{service.name}</div>
                  <div className={styles.serviceDescription}>
                    {service.description}
                  </div>
                </div>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className={styles.emptyState}>
                <Search20Regular className={styles.emptyStateIcon} />
                <Text size={400} className={styles.emptyStateText}>
                  No services found matching your search
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

export default AllServicesPage;
