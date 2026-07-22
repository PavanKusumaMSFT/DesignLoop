// ---------------------------------------------------------------------------
// Startups discovery data model
// ---------------------------------------------------------------------------

export interface StartupService {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface Alternative {
  title: string;
  pros: string[];
  cons: string[];
  serviceIds: string[];
}

export interface Bundle {
  id: string;
  intentId: string;
  title: string;
  outcome: string;
  serviceIds: string[];
  whatYouLearn: string[];
  whyThis: string[];
  alternatives: Alternative[];
}

export interface Intent {
  id: string;
  title: string;
  description: string;
}

// ---------------------
// Services seed (subset used in bundles)
// ---------------------
export const startupServices: StartupService[] = [
  {
    id: "app-services",
    name: "App Service",
    description: "Build and host web apps, mobile back ends, and RESTful APIs.",
    icon: "/azure-service-icons/compute/10035-icon-service-App-Services.svg",
  },
  {
    id: "static-web-apps",
    name: "Static Web Apps",
    description: "Globally distributed static content with dynamic APIs.",
    icon: "/azure-service-icons/web/01007-icon-service-Static-Apps.svg",
  },
  {
    id: "function-app",
    name: "Function App",
    description: "Run event-driven code without managing servers.",
    icon: "/azure-service-icons/compute/10029-icon-service-Function-Apps.svg",
  },
  {
    id: "azure-sql",
    name: "Azure SQL",
    description: "Managed, intelligent SQL database in the cloud.",
    icon: "/azure-service-icons/databases/02390-icon-service-Azure-SQL.svg",
  },
  {
    id: "cosmos-db",
    name: "Cosmos DB",
    description: "Globally distributed, multi-model NoSQL database.",
    icon: "/azure-service-icons/databases/10121-icon-service-Azure-Cosmos-DB.svg",
  },
  {
    id: "storage-accounts",
    name: "Storage Accounts",
    description: "Durable, highly available object, file, and table storage.",
    icon: "/azure-service-icons/storage/10086-icon-service-Storage-Accounts.svg",
  },
  {
    id: "entra-id",
    name: "Microsoft Entra ID",
    description: "Cloud identity and access management for your apps.",
    icon: "/azure-service-icons/identity/03400-icon-Entra-Identity.svg",
  },
  {
    id: "key-vault",
    name: "Key Vault",
    description: "Safeguard cryptographic keys and secrets used by apps.",
    icon: "/azure-service-icons/security/10245-icon-service-Key-Vaults.svg",
  },
  {
    id: "app-insights",
    name: "Application Insights",
    description: "Monitor live applications and detect performance anomalies.",
    icon: "/azure-service-icons/monitor/00012-icon-service-Application-Insights.svg",
  },
  {
    id: "api-management",
    name: "API Management",
    description:
      "Publish APIs to developers, partners, and employees securely.",
    icon: "/azure-service-icons/devops/10042-icon-service-API-Management-Services.svg",
  },
  {
    id: "service-bus",
    name: "Service Bus",
    description: "Reliable cloud messaging-as-a-service for decoupled systems.",
    icon: "/azure-service-icons/integration/10836-icon-service-Azure-Service-Bus.svg",
  },
  {
    id: "redis",
    name: "Azure Cache for Redis",
    description: "In-memory data store for sub-millisecond caching.",
    icon: "/azure-service-icons/databases/10137-icon-service-Cache-Redis.svg",
  },
  {
    id: "container-instances",
    name: "Container Instances",
    description:
      "Run containers on demand without managing servers or clusters.",
    icon: "/azure-service-icons/compute/10104-icon-service-Container-Instances.svg",
  },
  {
    id: "azure-openai",
    name: "Azure OpenAI",
    description: "Deploy and use OpenAI models with enterprise-grade security.",
    icon: "/azure-service-icons/ai + machine learning/03438-icon-service-Azure-OpenAI.svg",
  },
  {
    id: "logic-apps",
    name: "Logic Apps",
    description: "Automate workflows across apps, data, systems, and services.",
    icon: "/azure-service-icons/integration/02631-icon-service-Logic-Apps.svg",
  },
  {
    id: "monitor",
    name: "Azure Monitor",
    description:
      "Collect, analyze, and act on telemetry from cloud and on-premises.",
    icon: "/azure-service-icons/monitor/00001-icon-service-Monitor.svg",
  },
  {
    id: "cost-management",
    name: "Cost Management",
    description: "Analyze, monitor, and optimize your Azure spending.",
    icon: "/azure-service-icons/general/10019-icon-service-Cost-Management.svg",
  },
];

// ---------------------
// Intents
// ---------------------
export const intents: Intent[] = [
  {
    id: "deploy-web-app",
    title: "Deploy a web app",
    description:
      "Ship a full-stack web application with hosting, a database, and auth.",
  },
  {
    id: "deploy-api",
    title: "Deploy an API",
    description: "Expose a backend API, secure it, and manage its lifecycle.",
  },
  {
    id: "add-database",
    title: "Add a database",
    description:
      "Choose and provision the right managed database for your workload.",
  },
  {
    id: "add-auth",
    title: "Add authentication",
    description:
      "Protect your app with sign-in, tokens, and role-based access control.",
  },
  {
    id: "background-jobs",
    title: "Run background jobs",
    description:
      "Process tasks asynchronously — queues, timers, and event triggers.",
  },
  {
    id: "monitor-debug",
    title: "Monitor & debug",
    description:
      "Gain live visibility into errors, performance, and usage patterns.",
  },
];

// ---------------------
// Bundles
// ---------------------
export const bundles: Bundle[] = [
  // --- deploy-web-app ---
  {
    id: "webapp-fullstack-app-service",
    intentId: "deploy-web-app",
    title: "Full-stack app on App Service",
    outcome:
      "A Node/Python/Java web app with a managed SQL database, auth, and live monitoring — deployed in minutes.",
    serviceIds: ["app-services", "azure-sql", "entra-id", "app-insights"],
    whatYouLearn: [
      "How to deploy a web app using App Service and CI/CD",
      "Connecting to Azure SQL with managed identity (no passwords)",
      "Checking request traces and errors in Application Insights",
    ],
    whyThis: [
      "App Service is the lowest-friction path from code to a live URL",
      "Managed identity removes secret handling from your config",
      "Application Insights auto-instruments most popular frameworks",
    ],
    alternatives: [
      {
        title: "Static front-end + Function App back-end",
        pros: [
          "No server to maintain",
          "Pay-per-execution cost model",
          "Fastest cold deploy",
        ],
        cons: [
          "More initial wiring between front and back end",
          "Function cold starts can add latency",
        ],
        serviceIds: ["static-web-apps", "function-app", "azure-sql"],
      },
      {
        title: "Container on Container Instances",
        pros: [
          "Full control over runtime and OS",
          "Works with any language or stack",
        ],
        cons: [
          "You manage the container image lifecycle",
          "More setup for auto-scaling",
        ],
        serviceIds: ["container-instances", "azure-sql", "entra-id"],
      },
    ],
  },
  {
    id: "webapp-static-jamstack",
    intentId: "deploy-web-app",
    title: "Static site + serverless API",
    outcome:
      "A globally distributed front end (React/Vue/Next.js) backed by serverless functions and a NoSQL database.",
    serviceIds: ["static-web-apps", "function-app", "cosmos-db"],
    whatYouLearn: [
      "Deploying a static front end with built-in CI/CD from GitHub",
      "Writing and testing Function App APIs locally and in the cloud",
      "Using Cosmos DB's free tier for rapid prototyping",
    ],
    whyThis: [
      "Static Web Apps auto-provisions CDN and SSL — zero config",
      "Cosmos DB's multi-region write scales globally from day one",
      "Fully serverless: you only pay for what you use",
    ],
    alternatives: [
      {
        title: "Full-stack App Service",
        pros: [
          "Simpler architecture (one service)",
          "Good for server-rendered apps",
        ],
        cons: ["Higher base cost", "Not as CDN-optimised for static assets"],
        serviceIds: ["app-services", "azure-sql"],
      },
    ],
  },
  {
    id: "webapp-container",
    intentId: "deploy-web-app",
    title: "Containerised web app",
    outcome:
      "A Docker-based web application with managed storage, secrets in Key Vault, and observability.",
    serviceIds: [
      "container-instances",
      "storage-accounts",
      "key-vault",
      "app-insights",
    ],
    whatYouLearn: [
      "Running a Docker container on Azure without Kubernetes",
      "Storing app secrets securely in Key Vault",
      "Streaming container logs into Application Insights",
    ],
    whyThis: [
      "Container Instances needs no cluster management — ideal for early-stage apps",
      "Key Vault keeps credentials out of environment variables and source code",
      "Single command deploy from a container registry",
    ],
    alternatives: [
      {
        title: "App Service (built-in container support)",
        pros: [
          "Easier vertical scaling",
          "Built-in auto-restart and health probes",
        ],
        cons: ["Less OS-level control than a raw container"],
        serviceIds: ["app-services", "key-vault"],
      },
    ],
  },

  // --- deploy-api ---
  {
    id: "api-apim-funcapp",
    intentId: "deploy-api",
    title: "Managed API with gateway",
    outcome:
      "A Function App back-end exposed through an API Management gateway with rate-limiting, auth, and docs.",
    serviceIds: ["function-app", "api-management", "entra-id"],
    whatYouLearn: [
      "Publishing a Function App as an API through API Management",
      "Configuring OAuth 2.0 with Microsoft Entra ID for API security",
      "Adding rate-limiting and developer portal with zero extra code",
    ],
    whyThis: [
      "API Management standardises versioning, throttling, and auth in one place",
      "Function Apps let you build API endpoints without provis­ioning a server",
      "Entra ID tokens work seamlessly with Microsoft 365 and other Azure services",
    ],
    alternatives: [
      {
        title: "App Service API + API Management",
        pros: [
          "Better for long-running operations",
          "Easier to run as part of a larger web app",
        ],
        cons: ["Higher base cost when idle"],
        serviceIds: ["app-services", "api-management"],
      },
    ],
  },
  {
    id: "api-appservice-redis",
    intentId: "deploy-api",
    title: "High-performance REST API",
    outcome:
      "An App Service-hosted API with Redis caching and Application Insights for sub-100 ms response times.",
    serviceIds: ["app-services", "redis", "app-insights"],
    whatYouLearn: [
      "Adding Redis as a cache layer to reduce database load",
      "Setting cache TTL policies for API responses",
      "Using Application Insights Live Metrics to spot bottlenecks",
    ],
    whyThis: [
      "Redis cuts database round-trips, keeping p99 latency low",
      "App Service supports slot-based blue/green deployments with no downtime",
      "Application Insights gives distributed tracing across API hops",
    ],
    alternatives: [
      {
        title: "Function App + Redis",
        pros: ["Lower cost for low-traffic APIs", "Auto-scales on demand"],
        cons: ["Cold-start latency unless Premium plan is used"],
        serviceIds: ["function-app", "redis"],
      },
    ],
  },

  // --- add-database ---
  {
    id: "db-azuresql",
    intentId: "add-database",
    title: "Relational data with Azure SQL",
    outcome:
      "A fully managed SQL Server database with automatic backups, scaling, and secure connection from your app.",
    serviceIds: ["azure-sql", "app-services", "key-vault"],
    whatYouLearn: [
      "Provisioning Azure SQL with serverless compute for dev workloads",
      "Using managed identity so your app never stores a password",
      "Reading the built-in query performance advisor",
    ],
    whyThis: [
      "Azure SQL is T-SQL compatible — familiar if you know SQL Server",
      "Serverless tier pauses when idle, saving cost during development",
      "Point-in-time restore means accidental DELETE is recoverable",
    ],
    alternatives: [
      {
        title: "Cosmos DB (NoSQL)",
        pros: [
          "Schema-free, great for rapidly changing data models",
          "Built-in multi-region replication",
        ],
        cons: [
          "Not suitable for complex JOIN queries",
          "Pricing model differs from per-vCore SQL",
        ],
        serviceIds: ["cosmos-db"],
      },
    ],
  },
  {
    id: "db-cosmosdb",
    intentId: "add-database",
    title: "NoSQL with Cosmos DB",
    outcome:
      "A globally distributed document database with automatic indexing, free tier, and SDK support for every language.",
    serviceIds: ["cosmos-db", "function-app"],
    whatYouLearn: [
      "Creating a Cosmos DB account and choosing the right API (NoSQL vs MongoDB)",
      "Using the Cosmos DB change feed to trigger Functions on data events",
      "Reading the RU/s consumption dashboard to right-size throughput",
    ],
    whyThis: [
      "Free tier gives 1000 RU/s and 25 GB storage — enough for an MVP",
      "Multi-master writes let your app go global without re-architecture",
      "Change feed is the simplest way to react to data changes in real time",
    ],
    alternatives: [
      {
        title: "Azure SQL (relational)",
        pros: [
          "Strong consistency with ACID transactions",
          "Familiar SQL tooling",
        ],
        cons: ["Schema migrations required as data model evolves"],
        serviceIds: ["azure-sql"],
      },
    ],
  },

  // --- add-auth ---
  {
    id: "auth-entra-appservice",
    intentId: "add-auth",
    title: "Sign-in with Microsoft identity",
    outcome:
      "Add Microsoft / social sign-in to your app using Entra ID with zero auth code — managed by the platform.",
    serviceIds: ["entra-id", "app-services", "key-vault"],
    whatYouLearn: [
      "Registering an app in Entra ID and configuring redirect URIs",
      "Enabling Easy Auth on App Service for zero-code sign-in",
      "Storing client secrets in Key Vault and referencing them as app settings",
    ],
    whyThis: [
      "Easy Auth intercepts requests before your code runs — no SDK needed",
      "Entra ID supports MFA, Conditional Access, and B2B out of the box",
      "Works with Microsoft 365, GitHub, Google, and Facebook as identity providers",
    ],
    alternatives: [
      {
        title: "Custom auth with Entra ID + MSAL SDK",
        pros: [
          "Full control over token claims and session behavior",
          "Supports advanced flows (on-behalf-of, daemon)",
        ],
        cons: ["Requires auth SDK integration in your app code"],
        serviceIds: ["entra-id"],
      },
    ],
  },
  {
    id: "auth-apim-oauth",
    intentId: "add-auth",
    title: "API OAuth 2.0 with API Management",
    outcome:
      "Protect your API with OAuth 2.0 bearer tokens validated at the gateway — no auth code in your backend.",
    serviceIds: ["api-management", "entra-id", "function-app"],
    whatYouLearn: [
      "Configuring an API Management policy to validate JWT tokens",
      "Registering API scopes in Entra ID",
      "Testing OAuth flows with the built-in API Management developer portal",
    ],
    whyThis: [
      "JWT validation at the gateway means auth is enforced before traffic hits your code",
      "API Management centralises auth across multiple backend services",
      "Developer portal auto-generates interactive docs with OAuth try-it support",
    ],
    alternatives: [
      {
        title: "App Service Easy Auth",
        pros: ["Zero code, one-click setup", "Best for user-facing web apps"],
        cons: ["Less suited for machine-to-machine (M2M) API scenarios"],
        serviceIds: ["app-services", "entra-id"],
      },
    ],
  },

  // --- background-jobs ---
  {
    id: "jobs-funcapp-servicebus",
    intentId: "background-jobs",
    title: "Event-driven jobs with Service Bus",
    outcome:
      "Reliable background processing with a Service Bus queue triggering Function Apps — retries and dead-letter included.",
    serviceIds: ["function-app", "service-bus", "app-insights"],
    whatYouLearn: [
      "Connecting a Function App trigger to a Service Bus queue in seconds",
      "Configuring max delivery count and dead-letter queue for failed messages",
      "Correlating background job traces in Application Insights",
    ],
    whyThis: [
      "Service Bus guarantees at-least-once delivery with built-in retry",
      "Function App scales out automatically based on queue depth",
      "Dead-letter queue prevents silent message loss",
    ],
    alternatives: [
      {
        title: "Logic Apps workflow",
        pros: ["Visual designer, no code required", "200+ built-in connectors"],
        cons: ["Less suited for high-throughput or compute-heavy tasks"],
        serviceIds: ["logic-apps", "service-bus"],
      },
    ],
  },
  {
    id: "jobs-funcapp-timer",
    intentId: "background-jobs",
    title: "Scheduled jobs with timer triggers",
    outcome:
      "Run cron-like tasks (reports, cleanups, syncs) on a schedule using Function Apps with zero infrastructure.",
    serviceIds: ["function-app", "storage-accounts", "app-insights"],
    whatYouLearn: [
      "Writing a timer-triggered Function App with a CRON expression",
      "Using Storage queues as a durable checkpoint for long-running jobs",
      "Alerting on job failures with Application Insights and Azure Monitor",
    ],
    whyThis: [
      "CRON-based timer triggers are the simplest scheduled-job primitive on Azure",
      "Storage Accounts (queues + blobs) provide cheap durable state for jobs",
      "Consumption plan means you pay only while the job runs",
    ],
    alternatives: [
      {
        title: "Logic Apps recurrence trigger",
        pros: ["No-code schedule builder", "Easy to connect to SaaS APIs"],
        cons: ["More expensive per execution for compute-heavy tasks"],
        serviceIds: ["logic-apps"],
      },
    ],
  },

  // --- monitor-debug ---
  {
    id: "monitor-app-insights",
    intentId: "monitor-debug",
    title: "End-to-end app observability",
    outcome:
      "Live error tracking, performance profiling, and usage analytics across your entire application.",
    serviceIds: ["app-insights", "monitor", "app-services"],
    whatYouLearn: [
      "Auto-instrumenting an App Service app with one-click Application Insights",
      "Reading the Application Map to trace latency across dependencies",
      "Creating alerts that page you when error rates spike",
    ],
    whyThis: [
      "Application Insights is the fastest way to go from zero to distributed tracing",
      "Azure Monitor centralises alerts from all your Azure resources in one place",
      "Live Metrics stream lets you debug production issues in real time",
    ],
    alternatives: [
      {
        title: "Azure Monitor Logs (Log Analytics only)",
        pros: [
          "Cheapest option — pay only for logs ingested",
          "Powerful KQL query language",
        ],
        cons: [
          "No built-in APM or user analytics",
          "Requires manual instrumentation",
        ],
        serviceIds: ["monitor"],
      },
    ],
  },
  {
    id: "monitor-cost",
    intentId: "monitor-debug",
    title: "Cost monitoring & budget alerts",
    outcome:
      "Understand your Azure spend, set budgets, and get notified before you overshoot.",
    serviceIds: ["cost-management", "monitor"],
    whatYouLearn: [
      "Reading the Cost Analysis dashboard to find top cost drivers",
      "Creating a budget with email alerts at 80% and 100% thresholds",
      "Using Azure Advisor recommendations to right-size over-provisioned resources",
    ],
    whyThis: [
      "Cost Management is free — there's no reason not to set it up on day one",
      "Budget alerts catch runaway costs before the invoice arrives",
      "Advisor actively finds wasted spend in your subscription",
    ],
    alternatives: [
      {
        title: "Application Insights + Monitor for operational cost",
        pros: [
          "Correlates spend with traffic and errors",
          "Helps justify scale-down decisions",
        ],
        cons: ["Does not replace billing-level cost analysis"],
        serviceIds: ["app-insights", "monitor"],
      },
    ],
  },
];
