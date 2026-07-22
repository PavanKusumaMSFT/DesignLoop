/**
 * Mock data and utilities for the Azure Portal search component
 * This file contains all the test data and helper functions used to simulate search results
 */

// ============================================================================
// Mock Data Configuration
// ============================================================================

/**
 * Maximum result counts for each search category
 */
export const MOCK_MAX_RESULTS = {
  services: 30,
  resources: 20,
  entra: 10,
  resourceGroups: 8,
  marketplace: 12,
  documentation: 15,
} as const;

/**
 * Mock subscription filter information
 */
export const MOCK_SUBSCRIPTION_INFO = {
  activeSubscriptions: 2,
  totalSubscriptions: 10,
} as const;

/**
 * Default counts for randomized display items
 */
export const MOCK_DEFAULT_COUNTS = {
  searchHistory: 4,
  recentResources: 4,
} as const;

/**
 * Specific result counts for predefined search terms
 * Maps search terms to their expected result counts per category
 * Default: documentation = 99, marketplace = 30 (unless specified otherwise)
 */
export const SEARCH_TERM_RESULT_COUNTS: Record<
  string,
  {
    services?: number;
    resources?: number;
    entra?: number;
    resourceGroups?: number;
    marketplace?: number;
    documentation?: number;
  }
> = {
  entra: { services: 27, marketplace: 31, documentation: 99 },
  pim: { services: 4, marketplace: 24, documentation: 99 },
  storage: { services: 23, entra: 5, marketplace: 30, documentation: 99 },
  app: { services: 57, entra: 5, marketplace: 30, documentation: 99 },
  azure: { services: 99, entra: 30, marketplace: 30, documentation: 99 },
  sql: { services: 32, marketplace: 30, documentation: 99 },
  vm: { services: 18, entra: 2, marketplace: 30, documentation: 99 },
  vnet: { services: 55, marketplace: 3, entra: 1, documentation: 99 },
  key: { services: 9, marketplace: 2, documentation: 99 },
  dns: { services: 6, marketplace: 2, documentation: 99 },
  resource: { services: 27, entra: 9, marketplace: 30, documentation: 99 },
  user: { services: 99, marketplace: 30, documentation: 99 },
  users: { services: 19, marketplace: 25, documentation: 99 },
  roles: { services: 21, marketplace: 4, entra: 21, documentation: 99 },
  role: { services: 38, marketplace: 17, documentation: 99 },
  intune: { services: 3, marketplace: 0, documentation: 99 },
  aks: { services: 4, marketplace: 22, documentation: 99 },
  container: { services: 17, marketplace: 30, documentation: 99 },
  devops: { services: 8, marketplace: 0, documentation: 99 },
  api: { services: 19, marketplace: 4, documentation: 99 },
  apim: { services: 13, marketplace: 4, documentation: 99 },
  "app reg": { services: 43, marketplace: 2, documentation: 99 },
  "app regs": { services: 27, entra: 1, marketplace: 6, documentation: 99 },
  application: { services: 27, entra: 1, marketplace: 6, documentation: 99 },
  cosmos: { services: 6, marketplace: 0, documentation: 99 },
  logic: { services: 6, marketplace: 0, documentation: 99 },
  monitor: { services: 20, marketplace: 5, documentation: 99 },
  "azure monitor": { services: 99, marketplace: 18, documentation: 99 },
  blob: { services: 5, marketplace: 21, documentation: 99 },
  acr: { services: 22, marketplace: 0, documentation: 99 },
  database: { services: 32, marketplace: 11, documentation: 99 },
  "sql server": { services: 25, marketplace: 3, documentation: 99 },
  cost: { services: 56, marketplace: 7, documentation: 99 },
  data: { services: 93, entra: 2, marketplace: 16, documentation: 99 },
  groups: { services: 27, marketplace: 11, entra: 1, documentation: 99 },
  policy: { services: 12, entra: 2, marketplace: 6, documentation: 99 },
  iam: { services: 1, marketplace: 0, entra: 1, documentation: 99 },
  nsg: { services: 3, marketplace: 0, documentation: 99 },
  vpn: { services: 8, marketplace: 2, documentation: 99 },
  tenant: { services: 7, marketplace: 30, documentation: 99 },
  function: { services: 13, marketplace: 5, documentation: 99 },
  disk: { services: 29, marketplace: 4, entra: 1, documentation: 99 },
  "compute infrastructure": {
    services: 99,
    marketplace: 31,
    documentation: 99,
  },
  essential: { services: 3, marketplace: 2, documentation: 99 },
  "essential machine": { services: 1, marketplace: 0, documentation: 99 },
  "essential machine management": {
    services: 1,
    marketplace: 0,
    documentation: 99,
  },
  emm: { services: 1, marketplace: 0, documentation: 99 },
};

// ============================================================================
// Test Search Terms (that generate results)
// ============================================================================

/**
 * List of search terms that are known to generate results
 * Useful for testing and validating search functionality
 */
export const validSearchTerms = [
  "entra",
  "pim",
  "storage",
  "app",
  "azure",
  "sql",
  "vm",
  "virtual",
  "vnet",
  "key",
  "dns",
  "resource",
  "user",
  "users",
  "roles",
  "role",
  "intune",
  "aks",
  "container",
  "devops",
  "api",
  "apim",
  "app registration",
  "app registrations",
  "application",
  "cosmos",
  "logic",
  "monitor",
  "azure monitor",
  "blob",
  "acr",
  "database",
  "sql server",
  "cost",
  "data",
  "groups",
  "policy",
  "iam",
  "nsg",
  "vpn",
  "tenant",
  "function",
  "disk",
  "load",
  "private",
  "sub",
  "subs",
  "subsc",
  "sto",
  "stor",
  "stora",
  "vir",
  "virt",
  "virtu",
  "enter",
  "res",
  "log",
  "re",
  "s",
  "a",
  "c",
  "az",
  "v",
];

// ============================================================================
// Type Definitions
// ============================================================================

export type RecentResource = { name: string; type: string };

export type SearchHistoryItem = string;

export type ResourceItem = {
  name: string;
  subtext: string;
};

// ============================================================================
// Mock Data - Search History
// ============================================================================

export const allSearchHistory: SearchHistoryItem[] = [
  "virtual machine pricing",
  "cosmos db tutorial",
  "app service deployment",
  "azure functions getting started",
  "storage account setup",
  "azure sql database migration",
  "kubernetes deployment guide",
  "azure networking basics",
  "container instances quickstart",
  "azure monitor alerts",
];

// ============================================================================
// Mock Data - Recent Resources
// ============================================================================

export const allRecentResources: RecentResource[] = [
  { name: "contosovm1 - Virtual Machine", type: "Virtual Machine" },
  { name: "contoso-webapp - App Service", type: "App Service" },
  { name: "contosodb - Cosmos DB", type: "Cosmos DB" },
  { name: "contoso-storage - Storage Account", type: "Storage Account" },
  { name: "contoso-redis - Redis Cache", type: "Redis Cache" },
  { name: "contoso-sql - SQL Database", type: "SQL Database" },
  { name: "contoso-keyvault - Key Vault", type: "Key Vault" },
  { name: "contoso-func - Function App", type: "Function App" },
];

// ============================================================================
// Service Descriptions (for tooltips)
// ============================================================================

export const serviceDescriptions: Record<string, string> = {
  "Virtual Machines":
    "Create and manage Windows or Linux virtual machines in the cloud.",
  "Virtual networks":
    "Provision private networks and connect to on-premises datacenters.",
  "Virtual Appointments Builder":
    "Create and manage virtual appointments for your organization.",
  "Virtual clusters":
    "Manage clusters of virtual machines for high availability and scale.",
  "App Service": "Build and host web apps, mobile backends, and RESTful APIs.",
  "Azure Functions":
    "Run event-driven serverless code without managing infrastructure.",
  "Container Instances":
    "Run Docker containers on-demand without managing servers.",
  "Kubernetes Service":
    "Deploy and manage containerized applications with Kubernetes.",
  "Azure SQL Database":
    "Fully managed relational database with built-in intelligence.",
  "SQL server":
    "Managed SQL Server in the cloud with enterprise-grade performance.",
  "SQL elastic pool":
    "Manage and scale multiple databases with shared resources.",
  "SQL Server databases": "Create and manage SQL Server databases in Azure.",
  "SQL Server instances":
    "Deploy and manage SQL Server instances in the cloud.",
  "Cosmos DB": "Globally distributed, multi-model database for any scale.",
  "Storage Accounts":
    "Massively scalable object storage for unstructured data.",
  "Database watchers": "Monitor and analyze database performance and health.",
  "Databases for SAP solutions":
    "Optimized database solutions for SAP workloads.",
  "Data factories":
    "Hybrid data integration service to orchestrate and automate data movement.",
  "Data Shares":
    "Simple and safe service for sharing big data with external organizations.",
  "Azure Cache for Redis":
    "Fully managed in-memory cache for faster application performance.",
  "Service Bus":
    "Reliable cloud messaging as a service for enterprise integration.",
  "Event Hubs": "Big data streaming platform and event ingestion service.",
  "API Management": "Publish, secure, and manage APIs across all platforms.",
  "Logic Apps": "Automate workflows and integrate apps, data, and services.",
  "Azure DevOps":
    "Services for teams to share code, track work, and ship software.",
  Monitor: "Full observability into applications, infrastructure, and network.",
  "Key Vault":
    "Safeguard cryptographic keys and secrets used by cloud applications.",
  "Application Insights":
    "Application performance management and monitoring service.",
  "Load Balancer":
    "Distribute network traffic across multiple servers for high availability.",
  "VPN Gateway":
    "Send encrypted traffic between Azure and on-premises networks.",
  "Virtual Network":
    "Private network infrastructure in the cloud for Azure resources.",
  "Azure Firewall":
    "Cloud-native network security service to protect Azure resources.",
  "Front Door":
    "Scalable entry point for fast delivery of global applications.",
  CDN: "Fast content delivery network for high-bandwidth content globally.",
  DNS: "Host your DNS domain in Azure for reliable and fast resolution.",
  "Azure AD":
    "Identity and access management service for cloud and on-premises.",
  "Azure Backup":
    "Simple and reliable backup service for Azure and on-premises data.",
  "Site Recovery":
    "Disaster recovery service to keep applications running during outages.",
  Batch: "Run large-scale parallel and batch compute jobs in the cloud.",
  "Azure ML": "Build, train, and deploy machine learning models at scale.",
  "Cognitive Services":
    "Add AI capabilities like vision, speech, and language to apps.",
  "Essential Machine Management":
    "Enroll, configure, and manage machines across your subscriptions with unified policies.",
};

// ============================================================================
// Icon Mapping Functions
// ============================================================================

/**
 * Get icon path based on resource type
 */
export const getResourceIcon = (type: string): string => {
  const iconMap: Record<string, string> = {
    "Virtual Machine":
      "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
    "App Service":
      "/azure-service-icons/compute/10035-icon-service-App-Services.svg",
    "Cosmos DB":
      "/azure-service-icons/databases/10121-icon-service-Azure-Cosmos-DB.svg",
    "Storage Account":
      "/azure-service-icons/storage/10086-icon-service-Storage-Accounts.svg",
  };
  return (
    iconMap[type] ||
    "/azure-service-icons/general/10007-icon-service-Resource-Groups.svg"
  );
};

/**
 * Map service names to icon file paths
 */
export const getServiceIconPath = (serviceName: string): string => {
  const iconMap: Record<string, string> = {
    "Virtual Machines":
      "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
    "Virtual networks":
      "/azure-service-icons/networking/10061-icon-service-Virtual-Networks.svg",
    "Virtual Appointments Builder":
      "/azure-service-icons/compute/10104-icon-service-Container-Instances.svg",
    "Virtual clusters":
      "/azure-service-icons/compute/10104-icon-service-Container-Instances.svg",
    "App Service":
      "/azure-service-icons/compute/10035-icon-service-App-Services.svg",
    "Azure Functions":
      "/azure-service-icons/compute/10029-icon-service-Function-Apps.svg",
    "Container Instances":
      "/azure-service-icons/compute/10104-icon-service-Container-Instances.svg",
    "Container Apps":
      "/azure-service-icons/other/02989-icon-service-Container-Apps-Environments.svg",
    "Container Registry":
      "/azure-service-icons/containers/10105-icon-service-Container-Registries.svg",
    "Kubernetes Service":
      "/azure-service-icons/compute/10023-icon-service-Kubernetes-Services.svg",
    "Azure SQL Database":
      "/azure-service-icons/databases/10130-icon-service-SQL-Database.svg",
    "SQL server":
      "/azure-service-icons/databases/10130-icon-service-SQL-Database.svg",
    "SQL elastic pool":
      "/azure-service-icons/databases/10130-icon-service-SQL-Database.svg",
    "SQL Server databases":
      "/azure-service-icons/databases/10130-icon-service-SQL-Database.svg",
    "SQL Server instances":
      "/azure-service-icons/databases/10130-icon-service-SQL-Database.svg",
    "Cosmos DB":
      "/azure-service-icons/databases/10121-icon-service-Azure-Cosmos-DB.svg",
    "Storage Accounts":
      "/azure-service-icons/storage/10086-icon-service-Storage-Accounts.svg",
    "Database watchers":
      "/azure-service-icons/databases/10130-icon-service-SQL-Database.svg",
    "Databases for SAP solutions":
      "/azure-service-icons/databases/10121-icon-service-Azure-Cosmos-DB.svg",
    "Data factories":
      "/azure-service-icons/analytics/00039-icon-service-Event-Hubs.svg",
    "Data Shares":
      "/azure-service-icons/storage/10098-icon-service-Data-Shares.svg",
    "Azure Cache for Redis":
      "/azure-service-icons/databases/10137-icon-service-Cache-Redis.svg",
    "Service Bus":
      "/azure-service-icons/integration/10836-icon-service-Azure-Service-Bus.svg",
    "Event Hubs":
      "/azure-service-icons/analytics/00039-icon-service-Event-Hubs.svg",
    "Event Grid":
      "/azure-service-icons/integration/10206-icon-service-Event-Grid-Topics.svg",
    "API Management":
      "/azure-service-icons/integration/10042-icon-service-API-Management-Services.svg",
    "Logic Apps":
      "/azure-service-icons/integration/02631-icon-service-Logic-Apps.svg",
    "Azure DevOps":
      "/azure-service-icons/devops/02850-icon-service-Azure-DevOps.svg",
    Monitor: "/azure-service-icons/monitor/00008-icon-service-Monitor.svg",
    "Key Vault":
      "/azure-service-icons/security/10245-icon-service-Key-Vaults.svg",
    "Application Gateway":
      "/azure-service-icons/networking/10076-icon-service-Application-Gateways.svg",
    "Application Insights":
      "/azure-service-icons/monitor/00012-icon-service-Application-Insights.svg",
    "Load Balancer":
      "/azure-service-icons/networking/10062-icon-service-Load-Balancers.svg",
    "VPN Gateway":
      "/azure-service-icons/networking/10063-icon-service-Virtual-Network-Gateways.svg",
    "Virtual Network Gateway":
      "/azure-service-icons/networking/10063-icon-service-Virtual-Network-Gateways.svg",
    "Virtual Network":
      "/azure-service-icons/networking/10061-icon-service-Virtual-Networks.svg",
    "Azure Firewall":
      "/azure-service-icons/networking/10084-icon-service-Firewalls.svg",
    "Front Door":
      "/azure-service-icons/networking/10073-icon-service-Front-Door-and-CDN-Profiles.svg",
    CDN: "/azure-service-icons/networking/00056-icon-service-CDN-Profiles.svg",
    DNS: "/azure-service-icons/networking/10064-icon-service-DNS-Zones.svg",
    "Traffic Manager":
      "/azure-service-icons/networking/10065-icon-service-Traffic-Manager-Profiles.svg",
    "Azure AD":
      "/azure-service-icons/identity/10221-icon-service-Azure-Active-Directory.svg",
    "Azure Backup":
      "/azure-service-icons/storage/00017-icon-service-Recovery-Services-Vaults.svg",
    "Site Recovery":
      "/azure-service-icons/storage/00017-icon-service-Recovery-Services-Vaults.svg",
    Batch: "/azure-service-icons/compute/10031-icon-service-Batch-Accounts.svg",
    "Azure Bastion":
      "/azure-service-icons/networking/02422-icon-service-Bastions.svg",
    "Azure ML":
      "/azure-service-icons/ai + machine learning/10295-icon-service-Machine-Learning.svg",
    "Cognitive Services":
      "/azure-service-icons/ai + machine learning/02236-icon-service-Cognitive-Services.svg",
    "AI Services":
      "/azure-service-icons/ai + machine learning/10162-icon-service-Cognitive-Services.svg",
    "OpenAI Service":
      "/azure-service-icons/ai + machine learning/03438-icon-service-Azure-OpenAI.svg",
    "Bot Service":
      "/azure-service-icons/ai + machine learning/10165-icon-service-Bot-Services.svg",
    "Stream Analytics":
      "/azure-service-icons/analytics/00042-icon-service-Stream-Analytics-Jobs.svg",
    "Synapse Analytics":
      "/azure-service-icons/analytics/00606-icon-service-Azure-Synapse-Analytics.svg",
    "Data Lake Storage":
      "/azure-service-icons/analytics/10150-icon-service-Data-Lake-Store-Gen1.svg",
    HDInsight:
      "/azure-service-icons/analytics/10142-icon-service-HD-Insight-Clusters.svg",
    Databricks:
      "/azure-service-icons/analytics/10787-icon-service-Azure-Databricks.svg",
    "Azure Database for MySQL":
      "/azure-service-icons/databases/10122-icon-service-Azure-Database-MySQL-Server.svg",
    "Azure Database for PostgreSQL":
      "/azure-service-icons/databases/10131-icon-service-Azure-Database-PostgreSQL-Server.svg",
    "Azure Database for MariaDB":
      "/azure-service-icons/databases/10123-icon-service-Azure-Database-MariaDB-Server.svg",
    "Notification Hubs":
      "/azure-service-icons/mobile/10045-icon-service-Notification-Hubs.svg",
    "SignalR Service":
      "/azure-service-icons/web/10052-icon-service-SignalR.svg",
    "Web PubSub": "/azure-service-icons/web/10052-icon-service-SignalR.svg",
    "Communication Services":
      "/azure-service-icons/other/00968-icon-service-Azure-Communication-Services.svg",
    "Azure IoT Hub": "/azure-service-icons/iot/10182-icon-service-IoT-Hub.svg",
    "IoT Central":
      "/azure-service-icons/iot/10184-icon-service-IoT-Central-Applications.svg",
    "Digital Twins":
      "/azure-service-icons/iot/01030-icon-service-Digital-Twins.svg",
    "Time Series Insights":
      "/azure-service-icons/iot/10181-icon-service-Time-Series-Insights-Environments.svg",
    Sphere: "/azure-service-icons/other/10190-icon-service-Azure-Sphere.svg",
    "Search Service":
      "/azure-service-icons/ai + machine learning/10044-icon-service-Cognitive-Search.svg",
    Maps: "/azure-service-icons/iot/10185-icon-service-Azure-Maps-Accounts.svg",
    "Media Services":
      "/azure-service-icons/web/10309-icon-service-Azure-Media-Service.svg",
    "Content Delivery Network":
      "/azure-service-icons/networking/00056-icon-service-CDN-Profiles.svg",
    "Azure Spring Apps":
      "/azure-service-icons/web/10370-icon-service-Azure-Spring-Apps.svg",
    "Static Web Apps":
      "/azure-service-icons/web/01007-icon-service-Static-Apps.svg",
    "Web App": "/azure-service-icons/web/10035-icon-service-App-Services.svg",
    "Mobile App":
      "/azure-service-icons/mobile/10035-icon-service-App-Services.svg",
    "Power BI Embedded":
      "/azure-service-icons/analytics/03332-icon-service-Power-BI-Embedded.svg",
    "Analysis Services":
      "/azure-service-icons/analytics/10148-icon-service-Analysis-Services.svg",
    Purview:
      "/azure-service-icons/integration/10216-icon-service-Azure-Data-Catalog.svg",
    "Data Catalog":
      "/azure-service-icons/integration/10216-icon-service-Azure-Data-Catalog.svg",
    "Cost Management":
      "/azure-service-icons/management + governance/00004-icon-service-Cost-Management-and-Billing.svg",
    "Azure Advisor":
      "/azure-service-icons/management + governance/00003-icon-service-Advisor.svg",
    "Service Health":
      "/azure-service-icons/management + governance/00025-icon-service-Service-Providers.svg",
    "Resource Manager":
      "/azure-service-icons/management + governance/10318-icon-service-Resource-Graph-Explorer.svg",
    "Azure Lighthouse":
      "/azure-service-icons/management + governance/00471-icon-service-Azure-Lighthouse.svg",
    "Managed Applications":
      "/azure-service-icons/management + governance/10313-icon-service-Managed-Applications-Center.svg",
    Policy:
      "/azure-service-icons/management + governance/10316-icon-service-Policy.svg",
    Blueprints:
      "/azure-service-icons/management + governance/00006-icon-service-Blueprints.svg",
    "Azure Arc":
      "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
    "Azure Arc (classic)":
      "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
    Automation:
      "/azure-service-icons/management + governance/00022-icon-service-Automation-Accounts.svg",
    Scheduler:
      "/azure-service-icons/management + governance/00010-icon-service-Scheduler-Job-Collections.svg",
    "Azure Relay":
      "/azure-service-icons/integration/10209-icon-service-Relays.svg",
    ExpressRoute:
      "/azure-service-icons/networking/10079-icon-service-ExpressRoute-Circuits.svg",
    "Private Link":
      "/azure-service-icons/networking/00427-icon-service-Private-Link.svg",
    "Peering Service":
      "/azure-service-icons/other/00970-icon-service-Peering-Service.svg",
    "NAT Gateway": "/azure-service-icons/networking/10310-icon-service-NAT.svg",
    "Firewall Manager":
      "/azure-service-icons/networking/00271-icon-service-Azure-Firewall-Manager.svg",
    "DDoS Protection":
      "/azure-service-icons/networking/10072-icon-service-DDoS-Protection-Plans.svg",
    "Network Watcher":
      "/azure-service-icons/networking/10066-icon-service-Network-Watcher.svg",
    "Bastion Host":
      "/azure-service-icons/networking/02422-icon-service-Bastions.svg",
    "Compute Infrastructure":
      "/azure-service-icons/other/02864-icon-service-Azure-Compute-Galleries.svg",
    "Compute fleet":
      "/azure-service-icons/compute/03487-icon-service-Compute-Fleet.svg",
    "Computer vision":
      "/azure-service-icons/ai + machine learning/00792-icon-service-Computer-Vision.svg",
  };
  return (
    iconMap[serviceName] ||
    "/azure-service-icons/general/10001-icon-service-Resource-Groups.svg"
  );
};

/**
 * Map resource types to icon file paths
 */
export const getResourceTypeIcon = (resourceType: string): string => {
  const typeMap: Record<string, string> = {
    "Virtual Machine":
      "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
    "App Service":
      "/azure-service-icons/compute/10035-icon-service-App-Services.svg",
    "Cosmos DB":
      "/azure-service-icons/databases/10121-icon-service-Azure-Cosmos-DB.svg",
    "Storage Account":
      "/azure-service-icons/storage/10086-icon-service-Storage-Accounts.svg",
    "Redis Cache":
      "/azure-service-icons/databases/10137-icon-service-Cache-Redis.svg",
    "SQL Database":
      "/azure-service-icons/databases/10130-icon-service-SQL-Database.svg",
    "Key Vault":
      "/azure-service-icons/security/10245-icon-service-Key-Vaults.svg",
    "Service Bus":
      "/azure-service-icons/integration/10836-icon-service-Azure-Service-Bus.svg",
    "Virtual Network":
      "/azure-service-icons/networking/10061-icon-service-Virtual-Networks.svg",
    "Load Balancer":
      "/azure-service-icons/networking/10062-icon-service-Load-Balancers.svg",
    "Application Gateway":
      "/azure-service-icons/networking/10076-icon-service-Application-Gateways.svg",
    "API Management":
      "/azure-service-icons/integration/10042-icon-service-API-Management-Services.svg",
    "Logic App":
      "/azure-service-icons/integration/02631-icon-service-Logic-Apps.svg",
    "Function App":
      "/azure-service-icons/compute/10029-icon-service-Function-Apps.svg",
    "Kubernetes Service":
      "/azure-service-icons/compute/10023-icon-service-Kubernetes-Services.svg",
    "Container Registry":
      "/azure-service-icons/containers/10105-icon-service-Container-Registries.svg",
    "Event Hub":
      "/azure-service-icons/analytics/00039-icon-service-Event-Hubs.svg",
    "Application Insights":
      "/azure-service-icons/monitor/00012-icon-service-Application-Insights.svg",
    "Monitor Workspace":
      "/azure-service-icons/monitor/00008-icon-service-Monitor.svg",
    "Backup Vault":
      "/azure-service-icons/storage/00017-icon-service-Recovery-Services-Vaults.svg",
  };
  return (
    typeMap[resourceType] ||
    "/azure-service-icons/general/10001-icon-service-Resource-Groups.svg"
  );
};

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Shuffle and return subset of array
 */
export const shuffleArray = <T>(array: T[], count: number = 4): T[] => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// ============================================================================
// Data Generation Functions
// ============================================================================

/**
 * Generate mock service results based on search query
 */
export const generateServices = (count: number, searchQuery: string = "") => {
  const services = [
    "Virtual Machines",
    "Virtual networks",
    "Virtual Appointments Builder",
    "Virtual clusters",
    "App Service",
    "Azure Functions",
    "Container Instances",
    "Container Apps",
    "Container Registry",
    "Kubernetes Service",
    "Azure SQL Database",
    "SQL server",
    "SQL elastic pool",
    "SQL Server databases",
    "SQL Server instances",
    "Cosmos DB",
    "Storage Accounts",
    "Database watchers",
    "Databases for SAP solutions",
    "Data factories",
    "Data Shares",
    "Azure Cache for Redis",
    "Service Bus",
    "Event Hubs",
    "Event Grid",
    "API Management",
    "Logic Apps",
    "Azure DevOps",
    "Monitor",
    "Key Vault",
    "Application Gateway",
    "Application Insights",
    "Load Balancer",
    "VPN Gateway",
    "Virtual Network Gateway",
    "Azure Firewall",
    "Front Door",
    "CDN",
    "DNS",
    "Traffic Manager",
    "Azure AD",
    "Azure Backup",
    "Site Recovery",
    "Batch",
    "Azure Bastion",
    "Azure ML",
    "Cognitive Services",
    "AI Services",
    "OpenAI Service",
    "Bot Service",
    "Stream Analytics",
    "Synapse Analytics",
    "Data Lake Storage",
    "HDInsight",
    "Databricks",
    "Azure Database for MySQL",
    "Azure Database for PostgreSQL",
    "Azure Database for MariaDB",
    "Notification Hubs",
    "SignalR Service",
    "Web PubSub",
    "Communication Services",
    "Azure IoT Hub",
    "IoT Central",
    "Digital Twins",
    "Time Series Insights",
    "Sphere",
    "Search Service",
    "Maps",
    "Media Services",
    "Content Delivery Network",
    "Azure Spring Apps",
    "Static Web Apps",
    "Web App",
    "Mobile App",
    "Power BI Embedded",
    "Analysis Services",
    "Purview",
    "Data Catalog",
    "Cost Management",
    "Azure Advisor",
    "Service Health",
    "Resource Manager",
    "Azure Lighthouse",
    "Managed Applications",
    "Policy",
    "Blueprints",
    "Azure Arc",
    "Azure Arc (classic)",
    "Automation",
    "Scheduler",
    "Azure Relay",
    "ExpressRoute",
    "Private Link",
    "Peering Service",
    "NAT Gateway",
    "Firewall Manager",
    "DDoS Protection",
    "Network Watcher",
    "Network interfaces",
    "Bastion Host",
    "Compute Infrastructure",
    "Compute fleet",
    "Computer vision",
    "Essential Machine Management",
    "Subscriptions",
  ];

  // Aliases: searching for one term should also surface related services
  const serviceAliases: Record<string, string[]> = {
    "virtual machine": ["Virtual Machines", "Compute Infrastructure"],
    "virtual machines": ["Virtual Machines", "Compute Infrastructure"],
    vm: ["Virtual Machines", "Compute Infrastructure"],
    nic: ["Network interfaces"],
    "network interface": ["Network interfaces"],
    emm: ["Essential Machine Management"],
    "machine management": ["Essential Machine Management"],
    arc: ["Azure Arc"],
    subs: ["Subscriptions"],
    subscription: ["Subscriptions"],
    compute: ["Compute Infrastructure"],
    infrastructure: ["Compute Infrastructure"],
  };

  if (!searchQuery.trim()) {
    // No search input = no results
    return [];
  }

  const query = searchQuery.toLowerCase();

  // Check if this search term has a predefined result count
  const predefinedCount = SEARCH_TERM_RESULT_COUNTS[query]?.services;
  if (predefinedCount !== undefined) {
    // Try word-based matching against real services first
    const words = query.split(/\s+/).filter((w) => w.length >= 3);
    const realMatches = services.filter((service) =>
      words.some((word) => service.toLowerCase().includes(word)),
    );
    if (realMatches.length > 0) {
      const genericCount = Math.max(0, predefinedCount - realMatches.length);
      return [
        ...realMatches,
        ...Array(genericCount)
          .fill(null)
          .map((_, i) => `Service ${realMatches.length + i + 1}`),
      ];
    }
    return Array(predefinedCount)
      .fill(null)
      .map((_, i) => `Service ${i + 1}`);
  }

  const filtered = services.filter((service) =>
    service.toLowerCase().includes(query),
  );

  // Add aliased services that aren't already in the filtered list
  const aliasedServices: string[] = [];
  for (const [term, aliases] of Object.entries(serviceAliases)) {
    if (query.includes(term) || term.includes(query)) {
      for (const alias of aliases) {
        if (!filtered.includes(alias) && !aliasedServices.includes(alias)) {
          aliasedServices.push(alias);
        }
      }
    }
  }
  const combined = [...filtered, ...aliasedServices];

  // Limit results based on query length to be more realistic
  const queryLength = searchQuery.trim().length;
  if (queryLength <= 2) {
    // 1-2 characters: show maximum 2-3 results
    return combined.slice(
      0,
      Math.min(combined.length, 2 + Math.floor(Math.random() * 2)),
    );
  } else if (queryLength <= 4) {
    // 3-4 characters: show maximum 5-8 results
    return combined.slice(
      0,
      Math.min(combined.length, 5 + Math.floor(Math.random() * 4)),
    );
  }

  // 5+ characters: Return actual filtered results
  return combined;
};

/**
 * Generate mock resource results based on search query
 */
export const generateResources = (
  count: number,
  searchQuery: string = "",
): ResourceItem[] => {
  const resourceNames: ResourceItem[] = [
    {
      name: "Contoso-vm",
      subtext:
        "Virtual Machine | Location: East US 2, Resource Group: contoso-RG1",
    },
    {
      name: "contosovm1",
      subtext:
        "Virtual Machine | Location: East US 2, Resource Group: contoso-RG1",
    },
    {
      name: "contoso-webapp",
      subtext: "App Service | Location: West US 2, Resource Group: contoso-RG1",
    },
    {
      name: "contosodb",
      subtext: "Cosmos DB | Location: Central US, Resource Group: contoso-RG2",
    },
    {
      name: "contoso-storage",
      subtext:
        "Storage Account | Location: North Europe, Resource Group: contoso-RG1",
    },
    {
      name: "contoso-redis",
      subtext:
        "Redis Cache | Location: West Europe, Resource Group: contoso-RG3",
    },
    {
      name: "contoso-sql",
      subtext:
        "SQL Database | Location: East US 2, Resource Group: contoso-RG1",
    },
    {
      name: "contoso-keyvault",
      subtext: "Key Vault | Location: West US, Resource Group: contoso-RG2",
    },
    {
      name: "contoso-servicebus",
      subtext:
        "Service Bus | Location: Central US, Resource Group: contoso-RG1",
    },
    {
      name: "contoso-vnet",
      subtext:
        "Virtual Network | Location: East US 2, Resource Group: contoso-RG1",
    },
    {
      name: "contoso-lb",
      subtext:
        "Load Balancer | Location: West US 2, Resource Group: contoso-RG2",
    },
    {
      name: "contoso-appgw",
      subtext:
        "Application Gateway | Location: East US 2, Resource Group: contoso-RG1",
    },
    {
      name: "contoso-apim",
      subtext:
        "API Management | Location: West Europe, Resource Group: contoso-RG3",
    },
    {
      name: "contoso-logicapp",
      subtext: "Logic App | Location: Central US, Resource Group: contoso-RG2",
    },
    {
      name: "contoso-func",
      subtext:
        "Function App | Location: East US 2, Resource Group: contoso-RG1",
    },
    {
      name: "contoso-aks",
      subtext:
        "Kubernetes Service | Location: West US, Resource Group: contoso-RG1",
    },
    {
      name: "contoso-acr",
      subtext:
        "Container Registry | Location: East US 2, Resource Group: contoso-RG1",
    },
    {
      name: "contoso-eventhub",
      subtext: "Event Hub | Location: Central US, Resource Group: contoso-RG2",
    },
    {
      name: "contoso-appins",
      subtext:
        "Application Insights | Location: West US 2, Resource Group: contoso-RG1",
    },
    {
      name: "contoso-monitor",
      subtext:
        "Monitor Workspace | Location: East US 2, Resource Group: contoso-RG1",
    },
    {
      name: "contoso-backup",
      subtext:
        "Backup Vault | Location: West Europe, Resource Group: contoso-RG3",
    },
  ];

  if (!searchQuery.trim()) {
    return resourceNames.slice(0, Math.min(count, resourceNames.length));
  }

  const query = searchQuery.toLowerCase();

  // Check if this search term has a predefined result count
  const predefinedCount = SEARCH_TERM_RESULT_COUNTS[query]?.resources;
  if (predefinedCount !== undefined) {
    // Try matching against real resources first (name or subtext/type)
    const realMatches = resourceNames.filter(
      (r) =>
        r.name.toLowerCase().includes(query) ||
        r.subtext.toLowerCase().includes(query),
    );
    if (realMatches.length > 0) {
      const genericCount = Math.max(0, predefinedCount - realMatches.length);
      return [
        ...realMatches,
        ...Array(genericCount)
          .fill(null)
          .map((_, i) => ({
            name: `Resource ${realMatches.length + i + 1}`,
            subtext: `Resource Type | Location: East US, Resource Group: RG-${i + 1}`,
          })),
      ];
    }
    // Return array of the specified length
    return Array(predefinedCount)
      .fill(null)
      .map((_, i) => ({
        name: `Resource ${i + 1}`,
        subtext: `Resource Type | Location: East US, Resource Group: RG-${i + 1}`,
      }));
  }

  // Filter by name or subtext (resource type)
  const filtered = resourceNames.filter(
    (r) =>
      r.name.toLowerCase().includes(query) ||
      r.subtext.toLowerCase().includes(query),
  );
  if (filtered.length > 0) {
    return filtered;
  }

  // Return random count between 0 and 50
  const randomCount = Math.floor(Math.random() * 51);
  return Array(randomCount)
    .fill(null)
    .map((_, i) => ({
      name: `${searchQuery}-resource-${i + 1}`,
      subtext: `Resource Type | Location: East US, Resource Group: RG-${i + 1}`,
    }));
};

/**
 * Generate mock Entra ID results (users and groups)
 */
export const generateEntraIdResults = (
  count: number,
  searchQuery: string = "",
): ResourceItem[] => {
  const roles = ["Member", "Guest", "User", "Admin"];
  const users: ResourceItem[] = [
    {
      name: "John Doe",
      subtext: `${roles[Math.floor(Math.random() * roles.length)]} | john.doe@contoso.com`,
    },
    {
      name: "Jane Smith",
      subtext: `${roles[Math.floor(Math.random() * roles.length)]} | jane.smith@contoso.com`,
    },
    { name: "Marketing Team", subtext: "Group | 24 members" },
    { name: "Engineering Team", subtext: "Group | 156 members" },
    {
      name: "Bob Johnson",
      subtext: `${roles[Math.floor(Math.random() * roles.length)]} | bob.johnson@contoso.com`,
    },
    {
      name: "Alice Williams",
      subtext: `${roles[Math.floor(Math.random() * roles.length)]} | alice.williams@contoso.com`,
    },
    { name: "Sales Team", subtext: "Group | 42 members" },
    { name: "IT Support", subtext: "Group | 18 members" },
    {
      name: "Michael Brown",
      subtext: `${roles[Math.floor(Math.random() * roles.length)]} | michael.brown@contoso.com`,
    },
    {
      name: "Sarah Davis",
      subtext: `${roles[Math.floor(Math.random() * roles.length)]} | sarah.davis@contoso.com`,
    },
  ];

  if (!searchQuery.trim()) {
    return [];
  }

  const query = searchQuery.toLowerCase();

  // Check if this search term has a predefined result count
  const predefinedCount = SEARCH_TERM_RESULT_COUNTS[query]?.entra;
  if (predefinedCount !== undefined) {
    // Return array of the specified length
    return Array(predefinedCount)
      .fill(null)
      .map((_, i) => ({
        name: `User ${i + 1}`,
        subtext: `Member | user${i + 1}@contoso.com`,
      }));
  }

  const filtered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.subtext.toLowerCase().includes(query),
  );

  // Limit results based on query length
  const queryLength = searchQuery.trim().length;
  if (queryLength === 1) {
    return [];
  } else if (queryLength === 2) {
    return filtered.slice(
      0,
      Math.min(filtered.length, Math.floor(Math.random() * 2)),
    );
  }
  // For 3+ characters, return 4-99 results (randomized)
  const minResults = 4;
  const maxResults = 99;
  const randomCount =
    Math.floor(Math.random() * (maxResults - minResults + 1)) + minResults;
  return filtered.slice(0, Math.min(filtered.length, randomCount));
};

/**
 * Generate mock resource group results
 */
export const generateResourceGroups = (
  count: number,
  searchQuery: string = "",
): ResourceItem[] => {
  const resourceGroups: ResourceItem[] = [
    { name: "contoso-prod-rg", subtext: "Production | East US" },
    { name: "contoso-dev-rg", subtext: "Development | West US 2" },
    { name: "contoso-test-rg", subtext: "Testing | Central US" },
    { name: "contoso-staging-rg", subtext: "Staging | North Europe" },
    { name: "contoso-analytics-rg", subtext: "Analytics | West Europe" },
    { name: "contoso-network-rg", subtext: "Networking | East US 2" },
    { name: "contoso-security-rg", subtext: "Security | West US" },
    { name: "contoso-monitoring-rg", subtext: "Monitoring | Central US" },
  ];

  if (!searchQuery.trim()) {
    return resourceGroups.slice(0, Math.min(count, resourceGroups.length));
  }

  const query = searchQuery.toLowerCase();

  // Check if this search term has a predefined result count
  const predefinedCount = SEARCH_TERM_RESULT_COUNTS[query]?.resourceGroups;
  if (predefinedCount !== undefined) {
    // Return array of the specified length, capped at 10
    const cappedCount = Math.min(predefinedCount, 10);
    return Array(cappedCount)
      .fill(null)
      .map((_, i) => ({
        name: `resource-group-${i + 1}`,
        subtext: `Environment | East US`,
      }));
  }

  // Return random count between 0 and 10
  const randomCount = Math.floor(Math.random() * 11);
  return Array(randomCount)
    .fill(null)
    .map((_, i) => ({
      name: `${searchQuery}-rg-${i + 1}`,
      subtext: `Environment | East US`,
    }));
};

/**
 * Generate mock marketplace results
 */
export const generateMarketplace = (
  count: number,
  searchQuery: string = "",
): ResourceItem[] => {
  const marketplace: ResourceItem[] = [
    { name: "Ubuntu Server 22.04 LTS", subtext: "Virtual Machine" },
    { name: "WordPress on Linux", subtext: "Web Application" },
    { name: "MongoDB Atlas", subtext: "Database" },
    { name: "NGINX Plus", subtext: "Load Balancer" },
    { name: "PostgreSQL Flexible Server", subtext: "Database" },
    { name: "Redis Enterprise Cloud", subtext: "Cache" },
    { name: "Kubernetes Dashboard", subtext: "Container Management" },
    { name: "Grafana Enterprise", subtext: "Monitoring" },
    { name: "Jenkins", subtext: "CI/CD" },
    { name: "Elastic Stack", subtext: "Search & Analytics" },
    { name: "Terraform Enterprise", subtext: "Infrastructure as Code" },
    { name: "GitLab", subtext: "DevOps Platform" },
    { name: "Docker Enterprise", subtext: "Container Platform" },
    { name: "Datadog", subtext: "Monitoring & Analytics" },
    { name: "New Relic", subtext: "Application Performance Monitoring" },
    { name: "Splunk", subtext: "Log Analytics" },
    { name: "Tableau", subtext: "Business Intelligence" },
    { name: "Apache Kafka", subtext: "Event Streaming" },
    { name: "Consul", subtext: "Service Mesh" },
    { name: "Vault", subtext: "Secrets Management" },
    { name: "Ansible Tower", subtext: "Automation Platform" },
    { name: "Chef Automate", subtext: "Configuration Management" },
    { name: "Puppet Enterprise", subtext: "Infrastructure Automation" },
    { name: "ArgoCD", subtext: "GitOps Deployment" },
    { name: "Prometheus", subtext: "Monitoring & Alerting" },
    {
      name: "Microsoft Server Operating Systems Preview",
      subtext: "Virtual Machine",
    },
    {
      name: "Microsoft Dynamics 365 For Operations",
      subtext: "Business Application",
    },
    {
      name: "AudioCodes OneVoice Operations Center",
      subtext: "Communications",
    },
    {
      name: "Dynatrace Operator for Azure Kubernetes Services",
      subtext: "Monitoring",
    },
  ];

  if (!searchQuery.trim()) {
    // Randomize count between 8 and total available
    const minCount = 8;
    const maxCount = marketplace.length;
    const randomCount =
      Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
    return marketplace.slice(0, randomCount);
  }

  const query = searchQuery.toLowerCase();

  // Check if this search term has a predefined result count
  const predefinedCount = SEARCH_TERM_RESULT_COUNTS[query]?.marketplace;
  if (predefinedCount !== undefined) {
    // Try word-based matching against real marketplace items first
    const words = query.split(/\s+/).filter((w) => w.length >= 3);
    const realMatches = marketplace.filter((item) =>
      words.some(
        (word) =>
          item.name.toLowerCase().includes(word) ||
          item.subtext.toLowerCase().includes(word),
      ),
    );
    if (realMatches.length > 0) {
      const genericCount = Math.max(0, predefinedCount - realMatches.length);
      return [
        ...realMatches,
        ...Array(genericCount)
          .fill(null)
          .map((_, i) => ({
            name: `Marketplace Item ${i + 1}`,
            subtext: `Solution Type`,
          })),
      ];
    }
    return Array(predefinedCount)
      .fill(null)
      .map((_, i) => ({
        name: `Marketplace Item ${i + 1}`,
        subtext: `Solution Type`,
      }));
  }

  const filtered = marketplace.filter(
    (item) =>
      item.name.toLowerCase().includes(query) ||
      item.subtext.toLowerCase().includes(query),
  );

  // Limit results based on query length
  const queryLength = searchQuery.trim().length;
  if (queryLength === 1) {
    return [];
  } else if (queryLength === 2) {
    return filtered.slice(
      0,
      Math.min(filtered.length, Math.floor(Math.random() * 2)),
    );
  }
  // For 3+ characters, return 4-99 results (randomized)
  const minResults = 4;
  const maxResults = 99;
  const randomCount =
    Math.floor(Math.random() * (maxResults - minResults + 1)) + minResults;
  return filtered.slice(0, Math.min(filtered.length, randomCount));
};

/**
 * Generate mock documentation results
 */
export const generateDocumentation = (
  count: number,
  searchQuery: string = "",
): ResourceItem[] => {
  const documentation: ResourceItem[] = [
    {
      name: "Getting started with Azure Virtual Machines",
      subtext: "Quickstart",
    },
    { name: "Deploy your first web app to Azure", subtext: "Tutorial" },
    {
      name: "Azure Storage security best practices",
      subtext: "Best practices",
    },
    { name: "Monitoring Azure resources", subtext: "How-to guide" },
    { name: "Azure networking fundamentals", subtext: "Concept" },
    { name: "Secure your Azure SQL Database", subtext: "Security guide" },
    { name: "Optimize costs in Azure", subtext: "Best practices" },
    { name: "Azure Kubernetes Service (AKS) overview", subtext: "Concept" },
    { name: "Backup and disaster recovery", subtext: "Architecture" },
    { name: "Identity and access management", subtext: "Security guide" },
    { name: "Azure DevOps pipelines", subtext: "Tutorial" },
    { name: "Scaling applications in Azure", subtext: "How-to guide" },
    { name: "Azure Functions triggers and bindings", subtext: "Reference" },
    { name: "Azure Container Instances quickstart", subtext: "Quickstart" },
    { name: "Configure Azure Firewall", subtext: "How-to guide" },
    { name: "Azure App Service deployment", subtext: "Tutorial" },
    { name: "Working with Azure Cosmos DB", subtext: "Getting Started" },
    { name: "Azure Key Vault secrets management", subtext: "Security guide" },
    { name: "Load balancing in Azure", subtext: "Architecture" },
    { name: "Azure Virtual Network peering", subtext: "How-to guide" },
    { name: "Azure Blob Storage guide", subtext: "Concept" },
    { name: "Implementing Azure CDN", subtext: "Tutorial" },
    { name: "Azure Logic Apps overview", subtext: "Concept" },
    { name: "Continuous deployment with Azure", subtext: "DevOps guide" },
    { name: "Azure Monitor alerts and notifications", subtext: "How-to guide" },
    {
      name: "Send browser (web push) notifications with Azure Notification Hubs",
      subtext: "Tutorial",
    },
    {
      name: "Configure SAP parameters files for Ansible",
      subtext: "How-to guide",
    },
    { name: "Assessment lab frequently asked questions", subtext: "FAQ" },
  ];

  if (!searchQuery.trim()) {
    // Randomize count between 8 and total available
    const minCount = 8;
    const maxCount = documentation.length;
    const randomCount =
      Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
    return documentation.slice(0, randomCount);
  }

  const query = searchQuery.toLowerCase();

  // Check if this search term has a predefined result count
  const predefinedCount = SEARCH_TERM_RESULT_COUNTS[query]?.documentation;
  if (predefinedCount !== undefined) {
    // Try word-based matching against real documentation first
    const words = query.split(/\s+/).filter((w) => w.length >= 3);
    const realMatches = documentation.filter((item) =>
      words.some(
        (word) =>
          item.name.toLowerCase().includes(word) ||
          item.subtext.toLowerCase().includes(word),
      ),
    );
    if (realMatches.length > 0) {
      const genericCount = Math.max(
        0,
        Math.min(predefinedCount, 25) - realMatches.length,
      );
      return [
        ...realMatches,
        ...Array(genericCount)
          .fill(null)
          .map((_, i) => ({
            name: `Documentation Article ${i + 1}`,
            subtext: `Guide`,
          })),
      ];
    }
    return Array(Math.min(predefinedCount, 25))
      .fill(null)
      .map((_, i) => ({
        name: `Documentation Article ${i + 1}`,
        subtext: `Guide`,
      }));
  }

  // Default: return up to 25 documentation items
  return Array(25)
    .fill(null)
    .map((_, i) => ({
      name: `${searchQuery} Documentation ${i + 1}`,
      subtext: `Guide`,
    }));
};
