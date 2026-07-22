export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  costBasis?: string;
}

export const categories: Category[] = [
  { id: "ai-ml", name: "AI + Machine Learning" },
  { id: "analytics", name: "Analytics" },
  { id: "compute", name: "Compute" },
  { id: "containers", name: "Containers" },
  { id: "databases", name: "Databases" },
  { id: "devops", name: "DevOps" },
  { id: "general", name: "General" },
  { id: "hybrid", name: "Hybrid + multicloud" },
  { id: "identity", name: "Identity" },
  { id: "integration", name: "Integration" },
  { id: "iot", name: "Internet of things" },
  { id: "management", name: "Management & governance" },
  { id: "migration", name: "Migration" },
  { id: "monitoring", name: "Monitor" },
  { id: "networking", name: "Networking" },
  { id: "security", name: "Security" },
  { id: "storage", name: "Storage" },
  { id: "web", name: "Web & mobile" },
];

export const collectionOptions = ["Alphabetical", "Most used"];

export const startupServiceIds = new Set([
  "azure-openai",
  "azure-ml",
  "vm",
  "aks",
  "app-services",
  "function-app",
  "container-apps",
  "container-instances",
  "storage-accounts",
  "azure-sql",
  "postgresql",
  "cosmos-db",
  "redis",
  "key-vaults",
  "entra-id-identity",
  "app-insights-mon",
  "monitor",
  "cost-billing",
  "vnets",
  "api-management",
]);

/**
 * Cost-basis subtitles per service ID.
 * "Free" = no cost ever
 * "Free limits" = always-free tier with usage caps
 */
export const serviceCostBasis: Record<string, string> = {
  // Free
  "service-fabric": "Free",
  "service-fabric-managed": "Free",
  "devtest-labs": "Free",
  "defender-cloud": "Free",
  "defender-cloud-sec": "Free",
  advisor: "Free",
  batch: "Free",
  "azure-ml": "Free",
  "machines-arc": "Free",
  "arc-machines": "Free",
  aks: "Free",
  "aks-auto": "Free",
  "aks-containers": "Free",
  lighthouse: "Free",
  migrate: "Free",
  policy: "Free",
  "storage-movers": "Free",
  "db-migration": "Free",
  "db-migration-svc": "Free",
  "private-link": "Free",
  "cost-mgmt": "Free",
  "update-manager": "Free",
  "deployment-env": "Free",

  // Free limits
  vm: "Free limits",
  disks: "Free limits",
  "key-vaults": "Free limits",
  mysql: "Free limits",
  postgresql: "Free limits",
  "cosmos-db": "Free limits",
  "custom-vision": "Free limits",
  "computer-vision": "Free limits",
  "face-api": "Free limits",
  "document-intelligence": "Free limits",
  "service-bus": "Free limits",
  "container-registries": "Free limits",
  "load-balancers": "Free limits",
  "vnet-gateways": "Free limits",
  "azure-sql": "Free limits",
  "app-services": "Free limits",
  "app-services-web": "Free limits",
  "function-app": "Free limits",
  "function-app-web": "Free limits",
  "entra-id": "Free limits",
  "entra-id-identity": "Free limits",
  "entra-security": "Free limits",
  "devops-org": "Free limits",
  "iot-hub": "Free limits",
  "data-factories": "Free limits",
  "ai-search": "Free limits",
  "ai-search-web": "Free limits",
  "notification-hubs": "Free limits",
  automation: "Free limits",
  vnets: "Free limits",
  "logic-apps": "Free limits",
  "logic-apps-web": "Free limits",
  "app-config": "Free limits",
  "app-config-web": "Free limits",
  "api-management": "Free limits",
  "api-mgmt": "Free limits",
  "api-mgmt-web": "Free limits",
  maps: "Free limits",
  signalr: "Free limits",
  "bot-services": "Free limits",
  "event-grid": "Free limits",
  "immersive-readers": "Free limits",
  monitor: "Free limits",
  "network-watcher": "Free limits",
  "network-watcher-net": "Free limits",
  "speech-services": "Free limits",
  "static-web-apps": "Free limits",
  "container-apps": "Free limits",
  "container-apps-web": "Free limits",
  "container-app-jobs": "Free limits",
  "container-apps-env": "Free limits",
  "web-pubsub": "Free limits",
  translators: "Free limits",
  language: "Free limits",
  "ad-b2c": "Free limits",
  "b2c-tenants": "Free limits",
};

export const services: Service[] = [
  // AI + Machine Learning
  {
    id: "azure-ml",
    name: "Azure Machine Learning",
    description:
      "Workspaces are where you manage all the models, assets, and data related to your machine learning projects. Create one now to start using Azure Machine Learning.",
    icon: "/azure-service-icons/ai + machine learning/10166-icon-service-Machine-Learning.svg",
    category: "ai-ml",
  },
  {
    id: "ai-search",
    name: "AI Search",
    description:
      "Information retrieval at scale for generative AI (RAG) and classic search over user-owned content.",
    icon: "/azure-service-icons/ai + machine learning/10044-icon-service-Cognitive-Search.svg",
    category: "ai-ml",
  },
  {
    id: "video-indexer",
    name: "Azure AI Video Indexer",
    description:
      "Extract insights from video and audio files using a rich set of AI media technologies",
    icon: "/azure-service-icons/other/01800-icon-service-Azure-Video-Indexer.svg",
    category: "ai-ml",
  },
  {
    id: "anomaly-detectors",
    name: "Anomaly detectors",
    description: "Identify potential problems early on.",
    icon: "/azure-service-icons/ai + machine learning/00814-icon-service-Anomaly-Detector.svg",
    category: "ai-ml",
  },
  {
    id: "bot-services",
    name: "Bot Services",
    description:
      "Develop intelligent, enterprise-grade bots that help you enrich the customer experience while maintaining control of your data.",
    icon: "/azure-service-icons/ai + machine learning/10165-icon-service-Bot-Services.svg",
    category: "ai-ml",
  },
  {
    id: "computer-vision",
    name: "Computer vision",
    description: "Analyze content in images and videos.",
    icon: "/azure-service-icons/ai + machine learning/00792-icon-service-Computer-Vision.svg",
    category: "ai-ml",
  },
  {
    id: "content-moderators",
    name: "Content moderators",
    description: "Detect potentially offensive or unwanted content.",
    icon: "/azure-service-icons/ai + machine learning/00795-icon-service-Content-Moderators.svg",
    category: "ai-ml",
  },
  {
    id: "custom-vision",
    name: "Custom vision",
    description: "Customize image recognition to fit your business.",
    icon: "/azure-service-icons/ai + machine learning/00793-icon-service-Custom-Vision.svg",
    category: "ai-ml",
  },
  {
    id: "document-intelligence",
    name: "Document intelligences",
    description:
      "Turn documents into usable data at a fraction of the time and cost.",
    icon: "/azure-service-icons/ai + machine learning/00819-icon-service-Form-Recognizers.svg",
    category: "ai-ml",
  },
  {
    id: "face-api",
    name: "Face APIs",
    description: "Detect and identify people and emotions in images.",
    icon: "/azure-service-icons/ai + machine learning/00794-icon-service-Face-APIs.svg",
    category: "ai-ml",
  },
  {
    id: "immersive-readers",
    name: "Immersive readers",
    description: "Help users read and comprehend text.",
    icon: "/azure-service-icons/ai + machine learning/00812-icon-service-Immersive-Readers.svg",
    category: "ai-ml",
  },
  {
    id: "language",
    name: "Language",
    description:
      "Build apps with industry-leading natural language understanding capabilities.",
    icon: "/azure-service-icons/ai + machine learning/02876-icon-service-Language.svg",
    category: "ai-ml",
  },
  {
    id: "metrics-advisors",
    name: "Metrics advisors",
    description: "Proactively monitor metrics and diagnose issues.",
    icon: "/azure-service-icons/ai + machine learning/02409-icon-service-Metrics-Advisor.svg",
    category: "ai-ml",
  },
  {
    id: "azure-openai",
    name: "Azure OpenAI",
    description: "Perform a wide variety of natural language tasks.",
    icon: "/azure-service-icons/ai + machine learning/03438-icon-service-Azure-OpenAI.svg",
    category: "ai-ml",
  },
  {
    id: "personalizers",
    name: "Personalizers",
    description: "Create rich, personalized experiences for each user.",
    icon: "/azure-service-icons/ai + machine learning/00796-icon-service-Personalizers.svg",
    category: "ai-ml",
  },
  {
    id: "speech-services",
    name: "Speech services",
    description:
      "Speech to text, text to speech, translation and speaker recognition.",
    icon: "/azure-service-icons/ai + machine learning/00797-icon-service-Speech-Services.svg",
    category: "ai-ml",
  },
  {
    id: "translators",
    name: "Translators",
    description: "Translate more than 100 languages and dialects.",
    icon: "/azure-service-icons/ai + machine learning/00800-icon-service-Translator-Text.svg",
    category: "ai-ml",
  },
  {
    id: "synapse-ai",
    name: "Azure Synapse Analytics",
    description: "Limitless analytics service",
    icon: "/azure-service-icons/analytics/00606-icon-service-Azure-Synapse-Analytics.svg",
    category: "ai-ml",
  },

  // Analytics
  {
    id: "analysis-services",
    name: "Analysis Services",
    description:
      "Enterprise-grade BI semantic modeling capabilities with scale and flexibility.",
    icon: "/azure-service-icons/analytics/10148-icon-service-Analysis-Services.svg",
    category: "analytics",
  },
  {
    id: "data-factories",
    name: "Data factories",
    description:
      "Integrate data silos with a service built for all data integration needs.",
    icon: "/azure-service-icons/analytics/10126-icon-service-Data-Factories.svg",
    category: "analytics",
  },
  {
    id: "data-lake-analytics",
    name: "Data Lake Analytics",
    description: "On-demand analytics job service that simplifies big data.",
    icon: "/azure-service-icons/analytics/10143-icon-service-Data-Lake-Analytics.svg",
    category: "analytics",
  },
  {
    id: "data-lake-gen1",
    name: "Data Lake Storage Gen1",
    description: "Hyperscale repository for big data",
    icon: "/azure-service-icons/analytics/10150-icon-service-Data-Lake-Store-Gen1.svg",
    category: "analytics",
  },
  {
    id: "databricks",
    name: "Azure Databricks",
    description:
      "Unlock insights from all your data and build AI solutions with Apache Spark.",
    icon: "/azure-service-icons/analytics/10787-icon-service-Azure-Databricks.svg",
    category: "analytics",
  },
  {
    id: "hdinsight",
    name: "HDInsight clusters",
    description:
      "Process massive amounts of data using Hadoop, Spark, Hive, and more.",
    icon: "/azure-service-icons/analytics/10142-icon-service-HD-Insight-Clusters.svg",
    category: "analytics",
  },
  {
    id: "data-explorer",
    name: "Azure Data Explorer Clusters",
    description:
      "Big-data, interactive analytics platform with ultra-fast telemetry search.",
    icon: "/azure-service-icons/analytics/10145-icon-service-Azure-Data-Explorer-Clusters.svg",
    category: "analytics",
  },
  {
    id: "data-shares",
    name: "Data Shares",
    description:
      "Share data simply and safely from multiple sources with other organizations.",
    icon: "/azure-service-icons/storage/10098-icon-service-Data-Shares.svg",
    category: "analytics",
  },
  {
    id: "power-bi",
    name: "Power BI Embedded",
    description:
      "Author reports and build models for free with Power BI Desktop.",
    icon: "/azure-service-icons/analytics/03332-icon-service-Power-BI-Embedded.svg",
    category: "analytics",
  },
  {
    id: "event-hubs-analytics",
    name: "Event Hubs",
    description:
      "Management container for event hubs with DNS-integrated network endpoints.",
    icon: "/azure-service-icons/analytics/00039-icon-service-Event-Hubs.svg",
    category: "analytics",
  },
  {
    id: "log-analytics",
    name: "Log Analytics workspaces",
    description:
      "Unique environments for log data from Azure Monitor and other services.",
    icon: "/azure-service-icons/analytics/00009-icon-service-Log-Analytics-Workspaces.svg",
    category: "analytics",
  },
  {
    id: "stream-analytics",
    name: "Stream Analytics jobs",
    description:
      "Process and analyze real-time data streams from multiple sources.",
    icon: "/azure-service-icons/analytics/00042-icon-service-Stream-Analytics-Jobs.svg",
    category: "analytics",
  },
  {
    id: "synapse",
    name: "Azure Synapse Analytics",
    description:
      "Fully-managed service to build modern data warehouses for enterprises.",
    icon: "/azure-service-icons/analytics/00606-icon-service-Azure-Synapse-Analytics.svg",
    category: "analytics",
  },

  // Compute
  {
    id: "availability-sets",
    name: "Availability sets",
    description:
      "Create an availability set to provide redundancy for your application.",
    icon: "/azure-service-icons/compute/10025-icon-service-Availability-Sets.svg",
    category: "compute",
  },
  {
    id: "community-images",
    name: "Community images",
    description: "Community-shared VM images",
    icon: "/azure-service-icons/other/02865-icon-service-Community-Images.svg",
    category: "compute",
  },
  {
    id: "compute-fleet",
    name: "Compute Fleet",
    description: "Manage compute resources at scale",
    icon: "/azure-service-icons/compute/03487-icon-service-Compute-Fleet.svg",
    category: "compute",
  },
  {
    id: "compute-galleries",
    name: "Azure compute galleries",
    description:
      "Organize your custom managed images, share images with users, and replicate to multiple regions.",
    icon: "/azure-service-icons/compute/02864-icon-service-Azure-Compute-Galleries.svg",
    category: "compute",
  },
  {
    id: "host-groups",
    name: "Host groups",
    description:
      "Dedicated hosts providing physical servers for one or more virtual machines.",
    icon: "/azure-service-icons/compute/10346-icon-service-Host-Groups.svg",
    category: "compute",
  },
  {
    id: "image-templates",
    name: "Image templates",
    description:
      "Azure image builder simplifies the image customization pipeline.",
    icon: "/azure-service-icons/compute/02634-icon-service-Image-Templates.svg",
    category: "compute",
  },
  {
    id: "images",
    name: "Images",
    description:
      "Managed images can be used to deploy virtual machines and virtual machine scale sets.",
    icon: "/azure-service-icons/compute/10033-icon-service-Images.svg",
    category: "compute",
  },
  {
    id: "ssh-keys",
    name: "SSH keys",
    description:
      "SSH keys allow secure connection to virtual machines without passwords.",
    icon: "/azure-service-icons/other/00412-icon-service-SSH-Keys.svg",
    category: "compute",
  },
  {
    id: "virtual-desktop",
    name: "Azure Virtual Desktop",
    description:
      "Transform your remote work with cloud-based desktop and app virtualization.",
    icon: "/azure-service-icons/other/00327-icon-service-Azure-Virtual-Desktop.svg",
    category: "compute",
  },
  {
    id: "vmss",
    name: "Virtual machine scale sets",
    description:
      "Deploy and manage a load balanced set of identical VMs with autoscale.",
    icon: "/azure-service-icons/compute/10034-icon-service-VM-Scale-Sets.svg",
    category: "compute",
  },
  {
    id: "vm",
    name: "Virtual machines",
    description: "Create a virtual machine that runs Linux or Windows.",
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
    category: "compute",
  },
  {
    id: "app-services",
    name: "App Services",
    description:
      "Create, build, deploy, and manage powerful web, mobile, and API apps.",
    icon: "/azure-service-icons/compute/10035-icon-service-App-Services.svg",
    category: "compute",
  },
  {
    id: "cloud-services",
    name: "Cloud services (extended support)",
    description:
      "Create a cloud service to host your cloud service application.",
    icon: "/azure-service-icons/compute/10030-icon-service-Cloud-Services-(Classic).svg",
    category: "compute",
  },
  {
    id: "spring-apps",
    name: "Azure Spring Apps",
    description:
      "Fully managed service that helps Spring developers focus on code.",
    icon: "/azure-service-icons/compute/10370-icon-service-Azure-Spring-Apps.svg",
    category: "compute",
  },
  {
    id: "container-apps",
    name: "Container Apps",
    description:
      "Simplify the deployment and scaling of containerized applications.",
    icon: "/azure-service-icons/other/02989-icon-service-Container-Apps-Environments.svg",
    category: "compute",
  },
  {
    id: "function-app",
    name: "Function App",
    description: "Run event-driven code without managing infrastructure.",
    icon: "/azure-service-icons/compute/10029-icon-service-Function-Apps.svg",
    category: "compute",
  },
  {
    id: "aks-auto",
    name: "Kubernetes service - Automatic",
    description: "Managed Kubernetes service",
    icon: "/azure-service-icons/compute/10023-icon-service-Kubernetes-Services.svg",
    category: "compute",
  },
  {
    id: "aks",
    name: "Kubernetes services",
    description:
      "Create and manage Kubernetes clusters with Azure handling operations.",
    icon: "/azure-service-icons/compute/10023-icon-service-Kubernetes-Services.svg",
    category: "compute",
  },
  {
    id: "batch",
    name: "Batch accounts",
    description:
      "Run large-scale parallel and high-performance computing applications.",
    icon: "/azure-service-icons/compute/10031-icon-service-Batch-Accounts.svg",
    category: "compute",
  },
  {
    id: "machines-arc",
    name: "Machines - Azure Arc",
    description:
      "Add Linux and Windows servers to Azure for management and governance.",
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
    category: "compute",
  },

  // Containers
  {
    id: "container-instances",
    name: "Container instances",
    description: "Create and manage Docker containers without setting up VMs.",
    icon: "/azure-service-icons/compute/10104-icon-service-Container-Instances.svg",
    category: "containers",
  },
  {
    id: "container-registries",
    name: "Container registries",
    description:
      "Build, store, secure, scan, replicate, and manage container images.",
    icon: "/azure-service-icons/containers/10105-icon-service-Container-Registries.svg",
    category: "containers",
  },
  {
    id: "kubernetes-center",
    name: "Kubernetes center (preview)",
    description: "Centralized Kubernetes management",
    icon: "/azure-service-icons/containers/10023-icon-service-Kubernetes-Services.svg",
    category: "containers",
  },
  {
    id: "kubernetes-fleet",
    name: "Kubernetes fleet manager",
    description:
      "Multicluster and at-scale scenarios for Kubernetes Service clusters.",
    icon: "/azure-service-icons/other/03134-icon-service-Kubernetes-Fleet-Manager.svg",
    category: "containers",
  },
  {
    id: "aks-containers",
    name: "Kubernetes services",
    description: "Managed Kubernetes service",
    icon: "/azure-service-icons/containers/10023-icon-service-Kubernetes-Services.svg",
    category: "containers",
  },
  {
    id: "openshift",
    name: "Azure Red Hat OpenShift clusters",
    description:
      "Highly available, fully managed OpenShift clusters on demand.",
    icon: "/azure-service-icons/containers/03331-icon-service-Azure-Red-Hat-OpenShift.svg",
    category: "containers",
  },
  {
    id: "service-fabric",
    name: "Service Fabric clusters",
    description:
      "Distributed systems platform for microservices and containers.",
    icon: "/azure-service-icons/containers/10036-icon-service-Service-Fabric-Clusters.svg",
    category: "containers",
  },
  {
    id: "service-fabric-managed",
    name: "Service Fabric managed clusters",
    description:
      "Evolution of Service Fabric with streamlined deployment and management.",
    icon: "/azure-service-icons/compute/02370-icon-service-Managed-Service-Fabric.svg",
    category: "containers",
  },
  {
    id: "container-app-jobs",
    name: "Container App Jobs",
    description:
      "Perform tasks such as data processing, machine learning, or on-demand processing.",
    icon: "/azure-service-icons/other/02989-icon-service-Container-Apps-Environments.svg",
    category: "containers",
  },
  {
    id: "container-apps-env",
    name: "Container Apps",
    description: "Run containerized applications",
    icon: "/azure-service-icons/other/02989-icon-service-Container-Apps-Environments.svg",
    category: "containers",
  },

  // Databases
  {
    id: "cosmos-db",
    name: "Azure Cosmos DB",
    description:
      "Globally distributed, multi-model, fully managed database using API of your choice.",
    icon: "/azure-service-icons/databases/10121-icon-service-Azure-Cosmos-DB.svg",
    category: "databases",
  },
  {
    id: "postgresql",
    name: "Azure Database for PostgreSQL flexible servers",
    description:
      "Fully managed service based on PostgreSQL, optimized for performance and security.",
    icon: "/azure-service-icons/databases/10131-icon-service-Azure-Database-PostgreSQL-Server.svg",
    category: "databases",
  },
  {
    id: "mysql",
    name: "Azure Database for MySQL flexible servers",
    description:
      "Flexible Server offers advanced customization for optimized performance.",
    icon: "/azure-service-icons/databases/10122-icon-service-Azure-Database-MySQL-Server.svg",
    category: "databases",
  },
  {
    id: "cassandra",
    name: "Azure Managed Instance for Apache Cassandra",
    description:
      "Create a Microsoft Azure Managed Instance for Apache Cassandra.",
    icon: "/azure-service-icons/other/02663-icon-service-Managed-Instance-Apache-Cassandra.svg",
    category: "databases",
  },
  {
    id: "redis",
    name: "Azure Cache for Redis",
    description:
      "In-memory data store that improves performance and scalability.",
    icon: "/azure-service-icons/databases/10137-icon-service-Cache-Redis.svg",
    category: "databases",
  },
  {
    id: "db-migration",
    name: "Azure Database Migration Services",
    description: "Migrate databases with Azure management tools.",
    icon: "/azure-service-icons/databases/10133-icon-service-Azure-Database-Migration-Services.svg",
    category: "databases",
  },
  {
    id: "managed-redis",
    name: "Azure Managed Redis",
    description: "Fully managed Redis service.",
    icon: "/azure-service-icons/new icons/03675-icon-service-Azure-Managed-Redis.svg",
    category: "databases",
  },
  {
    id: "azure-sql",
    name: "Azure SQL",
    description: "Migrate, modernize, and innovate with the modern SQL family.",
    icon: "/azure-service-icons/databases/02390-icon-service-Azure-SQL.svg",
    category: "databases",
  },

  // DevOps
  {
    id: "chaos-studio",
    name: "Chaos Studio",
    description:
      "Measure, understand, and build application resilience to real-world outages.",
    icon: "/azure-service-icons/other/02223-icon-service-Azure-Chaos-Studio.svg",
    category: "devops",
  },
  {
    id: "deployment-env",
    name: "Azure Deployment Environments",
    description: "Enable your team to quickly spin up app infrastructure.",
    icon: "/azure-service-icons/other/03251-icon-service-Azure-Deployment-Environments.svg",
    category: "devops",
  },
  {
    id: "dev-centers",
    name: "Dev centers",
    description:
      "Centrally manage images, workstation sizes, environment templates, and networks.",
    icon: "/azure-service-icons/devops/03339-icon-service-DevOps-Starter.svg",
    category: "devops",
  },
  {
    id: "devops-org",
    name: "Azure DevOps organizations",
    description:
      "Comprehensive suite of tools for planning, tracking, and delivering software.",
    icon: "/azure-service-icons/devops/10261-icon-service-Azure-DevOps.svg",
    category: "devops",
  },
  {
    id: "devtest-labs",
    name: "DevTest Labs",
    description:
      "Agile development and testing with on-demand, self-service environments.",
    icon: "/azure-service-icons/devops/10264-icon-service-DevTest-Labs.svg",
    category: "devops",
  },
  {
    id: "github",
    name: "GitHub",
    description:
      "Build, scale, deliver and deploy secure software to the cloud with GitHub Enterprise.",
    icon: "/icons/github.svg",
    category: "devops",
  },
  {
    id: "lab-services",
    name: "Azure Lab Services",
    description:
      "Easily set up and provide on-demand access to preconfigured VMs.",
    icon: "/azure-service-icons/devops/10265-icon-service-Lab-Services.svg",
    category: "devops",
  },
  {
    id: "load-testing",
    name: "Azure Load Testing",
    description:
      "Fully managed load testing service for high-scale load and insights.",
    icon: "/azure-service-icons/devops/02423-icon-service-Load-Testing.svg",
    category: "devops",
  },
  {
    id: "dev-box",
    name: "Microsoft Dev Box",
    description:
      "Streamline development with secure, ready-to-code workstations in the cloud.",
    icon: "/azure-service-icons/other/03250-icon-service-Microsoft-Dev-Box.svg",
    category: "devops",
  },
  {
    id: "api-management",
    name: "API Management services",
    description:
      "Hybrid and multi-cloud management platform for APIs across all environments.",
    icon: "/azure-service-icons/devops/10042-icon-service-API-Management-Services.svg",
    category: "devops",
  },
  {
    id: "app-insights",
    name: "Application Insights",
    description:
      "Extensible APM service with deep insights into web applications.",
    icon: "/azure-service-icons/devops/00012-icon-service-Application-Insights.svg",
    category: "devops",
  },
  {
    id: "monitor-devops",
    name: "Monitor",
    description:
      "Comprehensive monitoring solution for collecting, analyzing, and responding to data.",
    icon: "/azure-service-icons/monitor/00001-icon-service-Monitor.svg",
    category: "devops",
  },

  // General
  {
    id: "cost-billing",
    name: "Cost Management + Billing",
    description: "Analyze, manage, and optimize your costs.",
    icon: "/azure-service-icons/general/00004-icon-service-Cost-Management-and-Billing.svg",
    category: "general",
  },
  {
    id: "free-services",
    name: "Free services",
    description: "Explore free Azure services.",
    icon: "/azure-service-icons/general/10016-icon-service-Free-Services.svg",
    category: "general",
  },
  {
    id: "quotas",
    name: "Quotas",
    description:
      "Oversee and control resource limits in the Azure environment.",
    icon: "/azure-service-icons/other/02951-icon-service-Azure-Quotas.svg",
    category: "general",
  },
  {
    id: "reservations",
    name: "Reservations",
    description: "Save money by committing to one-year or three-year plans.",
    icon: "/azure-service-icons/general/10003-icon-service-Reservations.svg",
    category: "general",
  },
  {
    id: "resource-manager",
    name: "Resource Manager",
    description: "Manage, organize, and deploy Azure resources.",
    icon: "/azure-service-icons/general/10007-icon-service-Resource-Groups.svg",
    category: "general",
  },
  {
    id: "quickstart",
    name: "Quickstart Center",
    description: "Guided, step-by-step tutorials and best practices.",
    icon: "/azure-service-icons/general/10010-icon-service-Quickstart-Center.svg",
    category: "general",
  },
  {
    id: "help-support",
    name: "Help + support",
    description: "Create and manage support requests.",
    icon: "/azure-service-icons/general/10013-icon-service-Help-and-Support.svg",
    category: "general",
  },
  {
    id: "service-health",
    name: "Service Health",
    description:
      "Stay proactive with personalized insights tailored to your Azure environment.",
    icon: "/azure-service-icons/general/10004-icon-service-Service-Health.svg",
    category: "general",
  },

  // Hybrid + multicloud
  {
    id: "arc-data",
    name: "Azure Arc data controllers",
    description:
      "Enable Azure data services in the Kubernetes environment of your choice.",
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
    category: "hybrid",
  },
  {
    id: "custom-locations",
    name: "Custom locations",
    description:
      "Map your on-premises and other infrastructure environments to Azure.",
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
    category: "hybrid",
  },
  {
    id: "entra-id",
    name: "Microsoft Entra ID",
    description:
      "Streamline identity management across Microsoft Entra devices and services.",
    icon: "/azure-service-icons/identity/03400-icon-Entra-Identity.svg",
    category: "hybrid",
  },
  {
    id: "resource-bridges",
    name: "Resource bridges",
    description:
      "Packaged virtual machine with built-in Kubernetes management cluster.",
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
    category: "hybrid",
  },
  {
    id: "vmware-solution",
    name: "Azure VMware Solution",
    description:
      "VMware Software Defined Data Center with Azure bare-metal infrastructure.",
    icon: "/azure-service-icons/other/01219-icon-service-Azure-VMware-Solution.svg",
    category: "hybrid",
  },
  {
    id: "arc-private-link",
    name: "Azure Arc Private Link Scopes",
    description: "Access Azure PaaS services over a private endpoint.",
    icon: "/azure-service-icons/management + governance/00756-icon-service-Azure-Arc.svg",
    category: "hybrid",
  },
  {
    id: "expressroute",
    name: "ExpressRoute circuits",
    description: "Fast, private connection to Microsoft cloud services.",
    icon: "/azure-service-icons/networking/10079-icon-service-ExpressRoute-Circuits.svg",
    category: "hybrid",
  },
  {
    id: "azure-local",
    name: "Azure Local",
    description: "Azure Local for on-premises.",
    icon: "/azure-service-icons/new icons/033745116-icon-service-Azure-Local.svg",
    category: "hybrid",
  },
  {
    id: "arc-machines",
    name: "Machines - Azure Arc",
    description:
      "Add Linux and Windows servers to Azure for management and governance.",
    icon: "/azure-service-icons/management + governance/01710-icon-service-Arc-Machines.svg",
    category: "hybrid",
  },
  {
    id: "virtual-wan",
    name: "Virtual WANs",
    description: "Create virtual WAN with sites connected to virtual hubs.",
    icon: "/azure-service-icons/networking/10353-icon-service-Virtual-WANs.svg",
    category: "hybrid",
  },
  {
    id: "defender-cloud",
    name: "Microsoft Defender for Cloud",
    description:
      "Comprehensive protection, threat detection, and compliance management.",
    icon: "/azure-service-icons/security/10241-icon-service-Microsoft-Defender-for-Cloud.svg",
    category: "hybrid",
  },
  {
    id: "sentinel",
    name: "Microsoft Sentinel",
    description:
      "See and stop threats before they cause harm with SIEM reinvented.",
    icon: "/azure-service-icons/security/10248-icon-service-Azure-Sentinel.svg",
    category: "hybrid",
  },

  // Identity
  {
    id: "entra-connect",
    name: "Microsoft Entra Connect Health",
    description:
      "Monitor and maintain the health of your Microsoft Entra Connect infrastructure.",
    icon: "/azure-service-icons/identity/10224-icon-service-Entra-Connect-Health.svg",
    category: "identity",
  },
  {
    id: "ad-b2c",
    name: "Azure AD B2C",
    description:
      "Provide secure access to your applications for customers with customizable authentication.",
    icon: "/azure-service-icons/identity/10228-icon-service-Azure-AD-B2C.svg",
    category: "identity",
  },
  {
    id: "b2c-tenants",
    name: "B2C Tenants",
    description:
      "Securely manage customer identities and access to applications.",
    icon: "/azure-service-icons/identity/02679-icon-service-Tenant-Properties.svg",
    category: "identity",
  },
  {
    id: "enterprise-apps",
    name: "Enterprise applications",
    description:
      "Integrate external applications with Azure services using pre-integrated connectors.",
    icon: "/azure-service-icons/identity/10225-icon-service-Enterprise-Applications.svg",
    category: "identity",
  },
  {
    id: "external-identities",
    name: "External Identities",
    description: "Extend identity management beyond corporate boundaries.",
    icon: "/azure-service-icons/identity/03338-icon-service-External-Identities.svg",
    category: "identity",
  },
  {
    id: "app-registrations",
    name: "App registrations",
    description: "Enable secure and controlled access to APIs and services.",
    icon: "/azure-service-icons/identity/10232-icon-service-App-Registrations.svg",
    category: "identity",
  },
  {
    id: "managed-identities",
    name: "Managed Identities",
    description:
      "Simplify access management with automatically managed identities.",
    icon: "/azure-service-icons/identity/10227-icon-service-Managed-Identities.svg",
    category: "identity",
  },
  {
    id: "domain-services",
    name: "Microsoft Entra Domain Services",
    description:
      "Enable seamless domain join, LDAP integration, and directory-aware applications.",
    icon: "/azure-service-icons/identity/10222-icon-service-Entra-Domain-Services.svg",
    category: "identity",
  },
  {
    id: "entra-id-identity",
    name: "Microsoft Entra ID",
    description:
      "Streamline identity management across Microsoft Entra devices and services.",
    icon: "/azure-service-icons/identity/03400-icon-Entra-Identity.svg",
    category: "identity",
  },
  {
    id: "pim",
    name: "Microsoft Entra Privileged Identity Management",
    description: "Protect from compromised permanent privileged user accounts.",
    icon: "/azure-service-icons/identity/02251-icon-service-Entra-Privleged-Identity-Management.svg",
    category: "identity",
  },
  {
    id: "id-governance",
    name: "Identity Governance",
    description:
      "Ensure compliance and reduce security risks by governing access.",
    icon: "/azure-service-icons/identity/10235-icon-service-Identity-Governance.svg",
    category: "identity",
  },
  {
    id: "id-protection",
    name: "Microsoft Entra ID Protection",
    description:
      "Safeguard identities against identity theft and fraudulent activities.",
    icon: "/azure-service-icons/identity/10231-icon-service-Entra-ID-Protection.svg",
    category: "identity",
  },
  {
    id: "verified-id",
    name: "Verified ID",
    description:
      "Digitally secure documents you issue as W3C standards-based Verifiable Credentials.",
    icon: "/azure-service-icons/identity/03143-icon-service-Entra-Verified-ID.svg",
    category: "identity",
  },

  // Integration
  {
    id: "app-config",
    name: "App Configuration",
    description:
      "Centrally manage application configuration and feature flags in the cloud.",
    icon: "/azure-service-icons/integration/10219-icon-service-App-Configuration.svg",
    category: "integration",
  },
  {
    id: "integration-accounts",
    name: "Integration accounts",
    description:
      "Build enterprise integration and B2B/EDI solutions with Logic Apps.",
    icon: "/azure-service-icons/integration/10218-icon-service-Integration-Accounts.svg",
    category: "integration",
  },
  {
    id: "logic-apps",
    name: "Logic apps",
    description:
      "Create workflows leveraging hundreds of connectors and the visual designer.",
    icon: "/azure-service-icons/integration/02631-icon-service-Logic-Apps.svg",
    category: "integration",
  },
  {
    id: "api-connections",
    name: "API Connections",
    description: "Easily connect to hundreds of services from Logic Apps.",
    icon: "/azure-service-icons/integration/10048-icon-service-API-Connections.svg",
    category: "integration",
  },
  {
    id: "api-mgmt",
    name: "API Management services",
    description:
      "Hybrid and multi-cloud management platform for APIs across all environments.",
    icon: "/azure-service-icons/integration/10042-icon-service-API-Management-Services.svg",
    category: "integration",
  },
  {
    id: "event-grid",
    name: "Event Grid",
    description: "Easily build applications with event-based architectures.",
    icon: "/azure-service-icons/integration/10206-icon-service-Event-Grid-Topics.svg",
    category: "integration",
  },
  {
    id: "event-hubs",
    name: "Event Hubs",
    description:
      "Management container for event hubs with DNS-integrated network endpoints.",
    icon: "/azure-service-icons/analytics/00039-icon-service-Event-Hubs.svg",
    category: "integration",
  },
  {
    id: "event-hubs-clusters",
    name: "Event Hubs Clusters",
    description: "Dedicated Event Hubs",
    icon: "/azure-service-icons/analytics/10149-icon-service-Event-Hub-Clusters.svg",
    category: "integration",
  },
  {
    id: "relays",
    name: "Relays",
    description:
      "Scoping containers for all components with multiple relays within namespace.",
    icon: "/azure-service-icons/integration/10209-icon-service-Relays.svg",
    category: "integration",
  },
  {
    id: "service-bus",
    name: "Service Bus",
    description:
      "Fully managed enterprise message broker with queues and publish-subscribe topics.",
    icon: "/azure-service-icons/integration/10836-icon-service-Azure-Service-Bus.svg",
    category: "integration",
  },

  // Internet of Things
  {
    id: "iot-central",
    name: "IoT Central Applications",
    description:
      "Accelerate IoT solution development with fully managed application platform.",
    icon: "/azure-service-icons/iot/10184-icon-service-IoT-Central-Applications.svg",
    category: "iot",
  },
  {
    id: "iot-hub",
    name: "IoT Hub",
    description: "Connect, monitor, and manage billions of your IoT assets.",
    icon: "/azure-service-icons/iot/10182-icon-service-IoT-Hub.svg",
    category: "iot",
  },
  {
    id: "device-update",
    name: "Device Update for IoT Hubs",
    description:
      "Automate and manage updates for IoT devices connected to IoT Hub.",
    icon: "/azure-service-icons/other/02475-icon-service-Device-Update-IoT-Hub.svg",
    category: "iot",
  },
  {
    id: "dps",
    name: "Azure IoT Hub Device Provisioning Services",
    description: "Automate IoT device provisioning and registration.",
    icon: "/azure-service-icons/iot/10369-icon-service-Device-Provisioning-Services.svg",
    category: "iot",
  },
  {
    id: "defender-iot",
    name: "Microsoft Defender for IoT",
    description: "Protect IoT devices with advanced threat detection.",
    icon: "/azure-service-icons/security/02247-icon-service-Microsoft-Defender-for-IoT.svg",
    category: "iot",
  },
  {
    id: "digital-twins",
    name: "Azure Digital Twins",
    description: "Model physical environments",
    icon: "/azure-service-icons/iot/01030-icon-service-Digital-Twins.svg",
    category: "iot",
  },
  {
    id: "maps",
    name: "Azure Maps Accounts",
    description:
      "Portfolio of geospatial services including Maps, Search, Routing, Traffic.",
    icon: "/azure-service-icons/iot/10185-icon-service-Azure-Maps-Accounts.svg",
    category: "iot",
  },
  {
    id: "stack-edge",
    name: "Azure Stack Edge / Data Box Gateway",
    description: "Edge computing devices",
    icon: "/azure-service-icons/storage/10095-icon-service-Azure-Stack-Edge.svg",
    category: "iot",
  },

  // Management and governance
  {
    id: "subscriptions",
    name: "Subscriptions",
    description: "Foundational access and billing mechanism for Azure.",
    icon: "/azure-service-icons/general/10002-icon-service-Subscriptions.svg",
    category: "management",
  },
  {
    id: "template-specs",
    name: "Template specs",
    description:
      "Easier way to share your templates with users in your organization.",
    icon: "/azure-service-icons/other/02340-icon-service-Template-Specs.svg",
    category: "management",
  },
  {
    id: "advisor",
    name: "Advisor",
    description:
      "Personalized, actionable recommendations to enhance performance and cost-efficiency.",
    icon: "/azure-service-icons/management + governance/00003-icon-service-Advisor.svg",
    category: "management",
  },
  {
    id: "automation",
    name: "Automation Accounts",
    description:
      "Streamline operations with automated processes and configuration management.",
    icon: "/azure-service-icons/management + governance/00022-icon-service-Automation-Accounts.svg",
    category: "management",
  },
  {
    id: "carbon",
    name: "Carbon optimization",
    description: "Reduce your carbon footprint with insights and tools.",
    icon: "/azure-service-icons/other/03314-icon-service-Azure-Sustainability.svg",
    category: "management",
  },
  {
    id: "cost-mgmt",
    name: "Cost Management",
    description: "Detailed cost analysis, budgeting, and financial governance.",
    icon: "/azure-service-icons/general/10019-icon-service-Cost-Management.svg",
    category: "management",
  },
  {
    id: "policy",
    name: "Policy",
    description:
      "Ensure compliance and govern resources by automating enforcement of standards.",
    icon: "/azure-service-icons/management + governance/10316-icon-service-Policy.svg",
    category: "management",
  },
  {
    id: "update-manager",
    name: "Azure Update Manager",
    description:
      "Keep infrastructure up-to-date with centralized management and automated patching.",
    icon: "/azure-service-icons/other/02846-icon-service-Update-Management-Center.svg",
    category: "management",
  },
  {
    id: "purview",
    name: "Microsoft Purview accounts",
    description:
      "Maximize the business value of data with unified data governance.",
    icon: "/azure-service-icons/management + governance/10316-icon-service-Policy.svg",
    category: "management",
  },
  {
    id: "lighthouse",
    name: "Azure Lighthouse",
    description: "Visibility and control across multiple tenants.",
    icon: "/azure-service-icons/management + governance/00471-icon-service-Azure-Lighthouse.svg",
    category: "management",
  },
  {
    id: "backup-vaults",
    name: "Backup vaults",
    description: "Data protection strategy to keep your business running.",
    icon: "/azure-service-icons/other/02361-icon-service-Backup-Vault.svg",
    category: "management",
  },
  {
    id: "recovery-vaults",
    name: "Recovery Services vaults",
    description: "Disaster recovery and data protection strategy.",
    icon: "/azure-service-icons/storage/00017-icon-service-Recovery-Services-Vaults.svg",
    category: "management",
  },

  // Migration
  {
    id: "db-migration-svc",
    name: "Azure Database Migration Services",
    description: "Migrate databases with Azure management tools.",
    icon: "/azure-service-icons/migration/10133-icon-service-Azure-Database-Migration-Services.svg",
    category: "migration",
  },
  {
    id: "migrate",
    name: "Azure Migrate",
    description:
      "Accelerate your migration with assessment, migration, and optimization tools.",
    icon: "/azure-service-icons/migrate/10281-icon-service-Azure-Migrate.svg",
    category: "migration",
  },
  {
    id: "data-box",
    name: "Azure Data Box",
    description:
      "Secure, offline data transfer solutions for efficient migration and backup.",
    icon: "/azure-service-icons/storage/10094-icon-service-Data-Box.svg",
    category: "migration",
  },
  {
    id: "recovery-migration",
    name: "Recovery Services vaults",
    description: "Disaster recovery and data protection strategy.",
    icon: "/azure-service-icons/storage/00017-icon-service-Recovery-Services-Vaults.svg",
    category: "migration",
  },
  {
    id: "stack-edge-mig",
    name: "Azure Stack Edge / Data Box Gateway",
    description:
      "Extend Azure services to the edge with hybrid cloud solutions.",
    icon: "/azure-service-icons/storage/10095-icon-service-Azure-Stack-Edge.svg",
    category: "migration",
  },

  // Monitor
  {
    id: "alerts",
    name: "Alerts",
    description:
      "Stay informed with customizable alerts that notify you of critical conditions.",
    icon: "/azure-service-icons/management + governance/00002-icon-service-Alerts.svg",
    category: "monitoring",
  },
  {
    id: "autoscale",
    name: "Autoscale",
    description:
      "Automatically adjust Azure resource capacity based on demand.",
    icon: "/azure-service-icons/monitor/10832-icon-service-Auto-Scale.svg",
    category: "monitoring",
  },
  {
    id: "change-analysis",
    name: "Change Analysis",
    description:
      "View changes in all resources to mitigate and diagnose issues.",
    icon: "/azure-service-icons/monitor/00563-icon-service-Change-Analysis.svg",
    category: "monitoring",
  },
  {
    id: "diagnostic-settings",
    name: "Diagnostic settings",
    description:
      "Comprehensive logging and monitoring by routing logs and metrics.",
    icon: "/azure-service-icons/monitor/00008-icon-service-Diagnostics-Settings.svg",
    category: "monitoring",
  },
  {
    id: "log-analytics-workspaces",
    name: "Log Analytics workspaces",
    description: "Unique environments for log data from Azure Monitor.",
    icon: "/azure-service-icons/monitor/00009-icon-service-Log-Analytics-Workspaces.svg",
    category: "monitoring",
  },
  {
    id: "managed-prometheus",
    name: "Managed Prometheus",
    description:
      "Seamless monitoring and alerting for Kubernetes environments.",
    icon: "/azure-service-icons/new icons/033112809-icon-service-promethus.svg",
    category: "monitoring",
  },
  {
    id: "metrics",
    name: "Metrics",
    description:
      "Gain actionable insights with real-time monitoring and visualization.",
    icon: "/azure-service-icons/monitor/00020-icon-service-Metrics.svg",
    category: "monitoring",
  },
  {
    id: "monitor-workspaces",
    name: "Azure Monitor workspaces",
    description: "Centralized monitoring",
    icon: "/azure-service-icons/monitor/00001-icon-service-Monitor.svg",
    category: "monitoring",
  },
  {
    id: "workbooks",
    name: "Azure Workbooks",
    description: "Canvas for data analysis or reporting in the Azure Portal.",
    icon: "/azure-service-icons/monitor/02189-icon-service-Azure-Workbooks.svg",
    category: "monitoring",
  },
  {
    id: "app-insights-mon",
    name: "Application Insights",
    description:
      "Extensible APM service with deep insights into web applications.",
    icon: "/azure-service-icons/monitor/00012-icon-service-Application-Insights.svg",
    category: "monitoring",
  },
  {
    id: "activity-log",
    name: "Activity log",
    description: "Gain visibility into Azure resource management operations.",
    icon: "/azure-service-icons/monitor/00007-icon-service-Activity-Log.svg",
    category: "monitoring",
  },
  {
    id: "managed-grafana",
    name: "Azure Managed Grafana",
    description:
      "Run a fully managed instance of Grafana connected to Azure resources.",
    icon: "/azure-service-icons/other/02905-icon-service-Azure-Managed-Grafana.svg",
    category: "monitoring",
  },
  {
    id: "monitor",
    name: "Monitor",
    description:
      "Comprehensive monitoring solution for collecting, analyzing, and responding to data.",
    icon: "/azure-service-icons/monitor/00001-icon-service-Monitor.svg",
    category: "monitoring",
  },
  {
    id: "network-watcher",
    name: "Network Watcher",
    description:
      "Monitor and diagnose your network performance and health in Azure.",
    icon: "/azure-service-icons/monitor/10066-icon-service-Network-Watcher.svg",
    category: "monitoring",
  },
  {
    id: "service-health-mon",
    name: "Service Health",
    description:
      "Stay proactive with personalized insights for your Azure environment.",
    icon: "/azure-service-icons/general/10004-icon-service-Service-Health.svg",
    category: "monitoring",
  },

  // Networking
  {
    id: "bastions",
    name: "Bastions",
    description: "Configure web based access to your vnet vm.",
    icon: "/azure-service-icons/networking/02422-icon-service-Bastions.svg",
    category: "networking",
  },
  {
    id: "dns-resolvers",
    name: "DNS private resolvers",
    description: "Private DNS resolution",
    icon: "/azure-service-icons/networking/02882-icon-service-DNS-Private-Resolver.svg",
    category: "networking",
  },
  {
    id: "dns-zones",
    name: "DNS zones",
    description: "Host DNS domains by using Microsoft Azure infrastructure.",
    icon: "/azure-service-icons/networking/10064-icon-service-DNS-Zones.svg",
    category: "networking",
  },
  {
    id: "nat-gateways",
    name: "NAT gateways",
    description:
      "Highly resilient and secure outbound connectivity to the internet.",
    icon: "/azure-service-icons/networking/10310-icon-service-NAT.svg",
    category: "networking",
  },
  {
    id: "network-interfaces",
    name: "Network interfaces",
    description:
      "Enable virtual machines to communicate with Internet and Azure.",
    icon: "/azure-service-icons/networking/10080-icon-service-Network-Interfaces.svg",
    category: "networking",
  },
  {
    id: "network-managers",
    name: "Network managers",
    description: "Define and apply connectivity and security configurations.",
    icon: "/azure-service-icons/other/02237-icon-service-Network-Managers.svg",
    category: "networking",
  },
  {
    id: "private-dns",
    name: "Private DNS zones",
    description: "Reliable, secure DNS service without custom DNS solution.",
    icon: "/azure-service-icons/networking/10064-icon-service-DNS-Zones.svg",
    category: "networking",
  },
  {
    id: "private-link",
    name: "Private Link",
    description:
      "Connect your virtual network to Azure services privately and securely.",
    icon: "/azure-service-icons/networking/00427-icon-service-Private-Link.svg",
    category: "networking",
  },
  {
    id: "public-ips",
    name: "Public IP addresses",
    description:
      "Allow internet resources to communicate inbound to Azure resources.",
    icon: "/azure-service-icons/networking/10069-icon-service-Public-IP-Addresses.svg",
    category: "networking",
  },
  {
    id: "route-tables",
    name: "Route tables",
    description: "Override Azure's default routing.",
    icon: "/azure-service-icons/networking/10082-icon-service-Route-Tables.svg",
    category: "networking",
  },
  {
    id: "vnets",
    name: "Virtual networks",
    description: "Securely connect Azure resources to each other.",
    icon: "/azure-service-icons/networking/10061-icon-service-Virtual-Networks.svg",
    category: "networking",
  },
  {
    id: "expressroute-net",
    name: "ExpressRoute circuits",
    description: "Fast, private connection to Microsoft cloud services.",
    icon: "/azure-service-icons/networking/10079-icon-service-ExpressRoute-Circuits.svg",
    category: "networking",
  },
  {
    id: "vnet-gateways",
    name: "Virtual network gateways",
    description: "Connect on-premises networks through Site-to-Site VPNs.",
    icon: "/azure-service-icons/networking/10063-icon-service-Virtual-Network-Gateways.svg",
    category: "networking",
  },
  {
    id: "virtual-wan-net",
    name: "Virtual WANs",
    description: "Connect sites to virtual hubs in preferred Azure regions.",
    icon: "/azure-service-icons/networking/10353-icon-service-Virtual-WANs.svg",
    category: "networking",
  },
  {
    id: "ddos-protection",
    name: "DDoS protection plans",
    description: "Massive DDoS mitigation capacity in every Azure region.",
    icon: "/azure-service-icons/networking/10072-icon-service-DDoS-Protection-Plans.svg",
    category: "networking",
  },
  {
    id: "firewalls",
    name: "Firewalls",
    description:
      "Cloud-native network security to protect your Azure Virtual Network resources.",
    icon: "/azure-service-icons/networking/10084-icon-service-Firewalls.svg",
    category: "networking",
  },
  {
    id: "nsgs",
    name: "Network security groups",
    description: "Filter inbound and outbound traffic to VMs and subnets.",
    icon: "/azure-service-icons/networking/10067-icon-service-Network-Security-Groups.svg",
    category: "networking",
  },
  {
    id: "waf-policies",
    name: "Web Application Firewall policies (WAF)",
    description: "Protect web applications from common exploits.",
    icon: "/azure-service-icons/networking/10362-icon-service-Web-Application-Firewall-Policies(WAF).svg",
    category: "networking",
  },
  {
    id: "app-gateways",
    name: "Application gateways",
    description: "Application-level routing and load balancing services.",
    icon: "/azure-service-icons/networking/10076-icon-service-Application-Gateways.svg",
    category: "networking",
  },
  {
    id: "load-balancers",
    name: "Load balancers",
    description:
      "High availability requiring high performance and ultra-low latency.",
    icon: "/azure-service-icons/networking/10062-icon-service-Load-Balancers.svg",
    category: "networking",
  },
  {
    id: "front-doors",
    name: "Front Doors",
    description:
      "Fast, reliable, and secure access between users and applications globally.",
    icon: "/azure-service-icons/networking/10073-icon-service-Front-Door-and-CDN-Profiles.svg",
    category: "networking",
  },
  {
    id: "network-watcher-net",
    name: "Network Watcher",
    description: "Network diagnostics",
    icon: "/azure-service-icons/networking/10066-icon-service-Network-Watcher.svg",
    category: "networking",
  },

  // Security
  {
    id: "app-security-groups",
    name: "Application security groups",
    description:
      "Configure network security as natural extension of application.",
    icon: "/azure-service-icons/security/10244-icon-service-Application-Security-Groups.svg",
    category: "security",
  },
  {
    id: "confidential-ledgers",
    name: "Confidential Ledgers",
    description:
      "Ensure unparalleled data privacy and integrity with cryptographic techniques.",
    icon: "/azure-service-icons/other/02668-icon-service-Confidential-Ledgers.svg",
    category: "security",
  },
  {
    id: "log-analytics-sec",
    name: "Log Analytics workspaces",
    description: "Unique environments for log data from Azure Monitor.",
    icon: "/azure-service-icons/monitor/00009-icon-service-Log-Analytics-Workspaces.svg",
    category: "security",
  },
  {
    id: "waf-security",
    name: "Web Application Firewall policies (WAF)",
    description: "Protect web applications from common exploits.",
    icon: "/azure-service-icons/networking/10362-icon-service-Web-Application-Firewall-Policies(WAF).svg",
    category: "security",
  },
  {
    id: "domain-services-sec",
    name: "Microsoft Entra Domain Services",
    description: "Enable seamless domain join and LDAP integration.",
    icon: "/azure-service-icons/identity/10222-icon-service-Entra-Domain-Services.svg",
    category: "security",
  },
  {
    id: "entra-security",
    name: "Microsoft Entra ID",
    description:
      "Streamline identity management across Microsoft Entra devices.",
    icon: "/azure-service-icons/identity/03400-icon-Entra-Identity.svg",
    category: "security",
  },
  {
    id: "pim-security",
    name: "Microsoft Entra Privileged Identity Management",
    description: "Protect from compromised privileged accounts.",
    icon: "/azure-service-icons/identity/02251-icon-service-Entra-Privleged-Identity-Management.svg",
    category: "security",
  },
  {
    id: "mfa",
    name: "Multifactor authentication",
    description: "Verify identity through multiple methods.",
    icon: "/azure-service-icons/security/03344-icon-service-Multifactor-Authentication.svg",
    category: "security",
  },
  {
    id: "ddos-sec",
    name: "DDoS protection plans",
    description: "Massive DDoS mitigation capacity in every Azure region.",
    icon: "/azure-service-icons/networking/10072-icon-service-DDoS-Protection-Plans.svg",
    category: "security",
  },
  {
    id: "firewalls-sec",
    name: "Firewalls",
    description:
      "Cloud-native network security to protect your Virtual Network resources.",
    icon: "/azure-service-icons/networking/10084-icon-service-Firewalls.svg",
    category: "security",
  },
  {
    id: "key-vaults",
    name: "Key vaults",
    description:
      "Safeguard cryptographic keys and other secrets used by cloud apps.",
    icon: "/azure-service-icons/security/10245-icon-service-Key-Vaults.svg",
    category: "security",
  },
  {
    id: "defender-easm",
    name: "Microsoft Defender EASM",
    description:
      "Build dynamic inventory of web applications and dependencies.",
    icon: "/azure-service-icons/security/03336-icon-service-Microsoft-Defender-EASM.svg",
    category: "security",
  },
  {
    id: "defender-cloud-sec",
    name: "Microsoft Defender for Cloud",
    description: "Comprehensive protection, threat detection, and compliance.",
    icon: "/azure-service-icons/security/10241-icon-service-Microsoft-Defender-for-Cloud.svg",
    category: "security",
  },
  {
    id: "defender-iot-sec",
    name: "Microsoft Defender for IoT",
    description: "Protect IoT devices with advanced threat detection.",
    icon: "/azure-service-icons/security/02247-icon-service-Microsoft-Defender-for-IoT.svg",
    category: "security",
  },
  {
    id: "sentinel-sec",
    name: "Microsoft Sentinel",
    description:
      "See and stop threats before they cause harm with SIEM reinvented.",
    icon: "/azure-service-icons/security/10248-icon-service-Azure-Sentinel.svg",
    category: "security",
  },

  // Storage
  {
    id: "edge-hardware",
    name: "Azure Edge Hardware Center",
    description: "Explore and order first party Azure hardware.",
    icon: "/azure-service-icons/other/02810-icon-service-Azure-Edge-Hardware-Center.svg",
    category: "storage",
  },
  {
    id: "stack-edge-storage",
    name: "Azure Stack Edge / Data Box Gateway",
    description: "Extend Azure services to the edge.",
    icon: "/azure-service-icons/storage/10095-icon-service-Azure-Stack-Edge.svg",
    category: "storage",
  },
  {
    id: "disk-access",
    name: "Disk Accesses",
    description: "Secure disk access",
    icon: "/azure-service-icons/compute/10032-icon-service-Disks.svg",
    category: "storage",
  },
  {
    id: "disk-encryption",
    name: "Disk Encryption Sets",
    description: "Manage encryption keys",
    icon: "/azure-service-icons/compute/00398-icon-service-Disk-Encryption-Sets.svg",
    category: "storage",
  },
  {
    id: "disks",
    name: "Disks",
    description:
      "Block-level storage volumes managed by Azure for virtual machines.",
    icon: "/azure-service-icons/compute/10032-icon-service-Disks.svg",
    category: "storage",
  },
  {
    id: "elastic-san",
    name: "Elastic SANs",
    description: "Fully managed cloud-native storage area network solution.",
    icon: "/azure-service-icons/other/03190-icon-service-Elastic-SAN.svg",
    category: "storage",
  },
  {
    id: "netapp-files",
    name: "Azure NetApp Files",
    description:
      "Migrate and run complex file-based applications with no code change.",
    icon: "/azure-service-icons/storage/10096-icon-service-Azure-NetApp-Files.svg",
    category: "storage",
  },
  {
    id: "snapshots",
    name: "Snapshots",
    description: "Full point-in-time copy of a VM managed disk.",
    icon: "/azure-service-icons/compute/10026-icon-service-Disks-Snapshots.svg",
    category: "storage",
  },
  {
    id: "storage-accounts",
    name: "Storage accounts",
    description:
      "Store up to 500TB of data in the cloud for objects, queues, and files.",
    icon: "/azure-service-icons/storage/10086-icon-service-Storage-Accounts.svg",
    category: "storage",
  },
  {
    id: "storage-browser",
    name: "Storage browser",
    description: "Browse storage data",
    icon: "/azure-service-icons/storage/10091-icon-service-Storage-Explorer.svg",
    category: "storage",
  },
  {
    id: "data-box-storage",
    name: "Azure Data Box",
    description: "Secure, offline data transfer to Azure.",
    icon: "/azure-service-icons/storage/10094-icon-service-Data-Box.svg",
    category: "storage",
  },
  {
    id: "storage-movers",
    name: "Storage movers",
    description: "Migration service for on-premises file shares to Azure.",
    icon: "/azure-service-icons/other/03091-icon-service-Azure-Storage-Mover.svg",
    category: "storage",
  },
  {
    id: "managed-lustre",
    name: "Azure Managed Lustre",
    description: "File caching for high-performance computing (HPC).",
    icon: "/azure-service-icons/storage/00776-icon-service-Azure-HCP-Cache.svg",
    category: "storage",
  },
  {
    id: "storage-sync",
    name: "Storage Sync Services",
    description: "Hybrid file storage",
    icon: "/azure-service-icons/storage/10093-icon-service-Storage-Sync-Services.svg",
    category: "storage",
  },

  // Web & Mobile
  {
    id: "api-connections-web",
    name: "API Connections",
    description: "Easily connect to hundreds of services from Logic Apps.",
    icon: "/azure-service-icons/web/10048-icon-service-API-Connections.svg",
    category: "web",
  },
  {
    id: "api-mgmt-web",
    name: "API Management services",
    description:
      "Hybrid and multi-cloud management for APIs across environments.",
    icon: "/azure-service-icons/web/10042-icon-service-API-Management-Services.svg",
    category: "web",
  },
  {
    id: "app-config-web",
    name: "App Configuration",
    description:
      "Centrally manage application configuration and feature flags.",
    icon: "/azure-service-icons/integration/10219-icon-service-App-Configuration.svg",
    category: "web",
  },
  {
    id: "app-service-certs",
    name: "App Service Certificates",
    description: "Purchase, manage, and deploy SSL/TLS certificates.",
    icon: "/azure-service-icons/web/00049-icon-service-App-Service-Certificates.svg",
    category: "web",
  },
  {
    id: "app-service-domains",
    name: "App Service Domains",
    description:
      "Simplify purchasing, managing, and renewing custom domain names.",
    icon: "/azure-service-icons/web/00050-icon-service-App-Service-Domains.svg",
    category: "web",
  },
  {
    id: "app-service-env",
    name: "App Service Environments",
    description:
      "Fully isolated and dedicated environment for high scale apps.",
    icon: "/azure-service-icons/web/10047-icon-service-App-Service-Environments.svg",
    category: "web",
  },
  {
    id: "app-service-plans",
    name: "App Service plans",
    description: "Collection of physical resources used to host your apps.",
    icon: "/azure-service-icons/web/00046-icon-service-App-Service-Plans.svg",
    category: "web",
  },
  {
    id: "app-insights-web",
    name: "Application Insights",
    description:
      "Extensible APM service with deep insights into web applications.",
    icon: "/azure-service-icons/monitor/00012-icon-service-Application-Insights.svg",
    category: "web",
  },
  {
    id: "app-services-web",
    name: "App Services",
    description:
      "Create, build, deploy, and manage powerful web, mobile, and API apps.",
    icon: "/azure-service-icons/web/10035-icon-service-App-Services.svg",
    category: "web",
  },
  {
    id: "container-apps-web",
    name: "Container Apps",
    description:
      "Simplify deployment and scaling of containerized applications.",
    icon: "/azure-service-icons/other/02989-icon-service-Container-Apps-Environments.svg",
    category: "web",
  },
  {
    id: "function-app-web",
    name: "Function App",
    description: "Run event-driven code without managing infrastructure.",
    icon: "/azure-service-icons/compute/10029-icon-service-Function-Apps.svg",
    category: "web",
  },
  {
    id: "logic-apps-web",
    name: "Logic apps",
    description: "Create workflows leveraging hundreds of connectors.",
    icon: "/azure-service-icons/integration/02631-icon-service-Logic-Apps.svg",
    category: "web",
  },
  {
    id: "spring-apps-web",
    name: "Azure Spring Apps",
    description:
      "Fully managed service for Spring developers to focus on code.",
    icon: "/azure-service-icons/web/10370-icon-service-Azure-Spring-Apps.svg",
    category: "web",
  },
  {
    id: "static-web-apps",
    name: "Static Web Apps",
    description: "Build modern web applications that automatically publish.",
    icon: "/azure-service-icons/web/01007-icon-service-Static-Apps.svg",
    category: "web",
  },
  {
    id: "ai-search-web",
    name: "AI Search",
    description:
      "Information retrieval at scale for generative AI and classic search.",
    icon: "/azure-service-icons/web/10044-icon-service-Cognitive-Search.svg",
    category: "web",
  },
  {
    id: "communication-services",
    name: "Communication Services",
    description:
      "Build communication experiences with SMS, voice, video, and chat.",
    icon: "/azure-service-icons/other/00968-icon-service-Azure-Communication-Services.svg",
    category: "web",
  },
  {
    id: "notification-hubs",
    name: "Notification Hubs",
    description: "Massively scalable mobile push notification engine.",
    icon: "/azure-service-icons/web/10053-icon-service-Notification-Hub-Namespaces.svg",
    category: "web",
  },
  {
    id: "signalr",
    name: "SignalR",
    description:
      "Simplify development of real time web application using SignalR.",
    icon: "/azure-service-icons/web/10052-icon-service-SignalR.svg",
    category: "web",
  },
  {
    id: "web-pubsub",
    name: "Web PubSub Service",
    description: "Simplify real time web application using WebSocket.",
    icon: "/azure-service-icons/new icons/02987-icon-service-pubsub.svg",
    category: "web",
  },
];

export const startupServiceData: Service[] = [
  {
    id: "vm",
    name: "Virtual machine",
    description:
      "Create a virtual machine that runs Linux or Windows. Select an image from the marketplace or use your own customized image.",
    icon: "/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg",
    category: "compute",
    costBasis: "Free limits",
  },
  {
    id: "storage-account",
    name: "Storage accounts",
    description:
      "Create a storage account to store up to 500TB of data in the cloud. Use a general-purpose storage account to store object data, use a NoSQL data store, define and use queues for message...",
    icon: "/azure-service-icons/storage/10086-icon-service-Storage-Accounts.svg",
    category: "storage",
  },
  {
    id: "sql-database",
    name: "Azure SQL database",
    description:
      "Utilize a fully managed relational database service, perfect for accelerating application development and simplifying management tasks.",
    icon: "/azure-service-icons/databases/02390-icon-service-Azure-SQL.svg",
    category: "databases",
    costBasis: "Free limits",
  },
  {
    id: "web-app",
    name: "Web app",
    description:
      "Easily host and manage websites and web applications without managing infrastructure.",
    icon: "/azure-service-icons/web/01007-icon-service-Static-Apps.svg",
    category: "web",
    costBasis: "Free limits",
  },
  {
    id: "container-apps",
    name: "Container apps",
    description:
      "Run your app in containers with automatic scaling and built-in microservices support.",
    icon: "/azure-service-icons/other/02989-icon-service-Container-Apps-Environments.svg",
    category: "compute",
    costBasis: "Free limits",
  },
  {
    id: "function-app",
    name: "Function app",
    description:
      "Build serverless apps that run code on demand without worrying about servers.",
    icon: "/azure-service-icons/compute/10029-icon-service-Function-Apps.svg",
    category: "compute",
    costBasis: "Free limits",
  },
];

// ─── Most Used view data ─────────────────────────────────────────────────────

/**
 * Category display order for the "Most used" sort.
 * Categories not listed here are shown at the bottom of the nav/list.
 */
export const mostUsedCategoryOrder: string[] = [
  "ai-ml",
  "compute",
  "networking",
  "databases",
  "analytics",
  "storage",
  "security",
  "devops",
  "containers",
  "integration",
  "monitoring",
  "management",
  "hybrid",
  "web",
  "migration",
  // remaining categories appended
  "general",
  "identity",
  "iot",
];

/**
 * Service IDs to display per category when sorted by "Most used".
 * Only services whose category matches the category key will be rendered.
 * Expand ("See all") shows every service in the category.
 */
export const mostUsedServicesByCategory: Record<string, string[]> = {
  "ai-ml": [
    "azure-openai",
    "azure-ml",
    "computer-vision",
    "language",
    "speech-services",
    "translators",
  ],
  analytics: ["log-analytics", "event-hubs-analytics"],
  compute: ["vm", "app-services", "function-app", "aks"],
  containers: [
    "container-instances",
    "container-registries",
    "container-apps-env",
    "aks-containers",
  ],
  databases: ["azure-sql", "postgresql", "mysql", "cosmos-db", "redis"],
  devops: ["devops-org", "github", "load-testing"],
  general: [
    "cost-billing",
    "quickstart",
    "help-support",
    "free-services",
    "resource-manager",
  ],
  identity: ["entra-id-identity", "app-registrations", "managed-identities"],
  integration: [
    "logic-apps",
    "api-mgmt",
    "event-grid",
    "event-hubs",
    "service-bus",
  ],
  iot: ["iot-hub", "digital-twins"],
  monitoring: [
    "app-insights-mon",
    "monitor",
    "log-analytics-workspaces",
    "alerts",
    "metrics",
  ],
  networking: ["vnets", "nsgs", "public-ips", "dns-zones"],
  security: ["key-vaults", "defender-cloud-sec"],
  storage: ["storage-accounts", "disks", "storage-browser"],
  web: [
    "app-services-web",
    "static-web-apps",
    "function-app-web",
    "app-insights-web",
    "api-mgmt-web",
    "signalr",
    "notification-hubs",
    "communication-services",
  ],
};
