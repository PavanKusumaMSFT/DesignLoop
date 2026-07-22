import { startupServiceIds } from "../build-2026/all-services-data";

export interface ServiceComparisonData {
  /** One or two sentences on what this service excels at */
  bestAt: string;
  /** One or two sentences on day-to-day management burden */
  management: string;
  /** One or two sentences on how cost is calculated */
  costModel: string;
  /** One or two sentences on why this service fits the current use case */
  whySuggested: string;
  /** Azure services that pair well with this one to build an MVP web app + database */
  pairWith?: { name: string; reason: string }[];
}

/** Per-service comparison details used by IntentComparisonCard */
export const serviceComparisonData: Record<string, ServiceComparisonData> = {
  "app-services": {
    bestAt:
      "Running containerized or code-based web apps and REST APIs at scale. Supports Node, Python, .NET, Java, and more out of the box.",
    management:
      "Mostly automatic — Azure handles OS patching, load balancing, and auto-scaling.",
    costModel:
      "Billed by App Service Plan tier (compute + memory). You pay for the plan whether or not the app is running.",
    whySuggested:
      "Ideal for hosting the backend API or server-rendered web app in this scenario. Minimal infrastructure overhead so you can focus on code.",
    pairWith: [
      {
        name: "Azure SQL",
        reason:
          "Store structured app data like user records and orders with familiar SQL syntax.",
      },
      {
        name: "PostgreSQL",
        reason:
          "Open-source relational database that integrates easily with Node and Python backends.",
      },
      {
        name: "Azure DevOps",
        reason:
          "Automate deployments to App Service directly from your source repo with CI/CD pipelines.",
      },
    ],
  },
  "app-services-web": {
    bestAt:
      "Running containerized or code-based web apps and REST APIs at scale. Supports Node, Python, .NET, Java, and more out of the box.",
    management:
      "Mostly automatic — Azure handles OS patching, load balancing, and auto-scaling.",
    costModel:
      "Billed by App Service Plan tier (compute + memory). You pay for the plan whether or not the app is running.",
    whySuggested:
      "Ideal for hosting the backend API or server-rendered web app in this scenario. Minimal infrastructure overhead so you can focus on code.",
    pairWith: [
      {
        name: "Azure SQL",
        reason:
          "Store structured app data like user records and orders with familiar SQL syntax.",
      },
      {
        name: "PostgreSQL",
        reason:
          "Open-source relational database that integrates easily with Node and Python backends.",
      },
      {
        name: "Azure DevOps",
        reason:
          "Automate deployments to App Service directly from your source repo with CI/CD pipelines.",
      },
    ],
  },
  "static-web-apps": {
    bestAt:
      "Hosting static frontends (React, Vue, Angular, Next.js static export) with built-in CDN and GitHub/Azure DevOps CI/CD.",
    management:
      "Fully managed — Azure handles CDN, SSL, and global distribution automatically.",
    costModel:
      "Free tier covers most hobby and small production workloads. Paid tier adds custom auth and higher bandwidth.",
    whySuggested:
      "Best fit for the frontend layer of this web app — zero server management and automatic deploys from source control.",
    pairWith: [
      {
        name: "App Service",
        reason:
          "Host the backend API that serves data to your static frontend.",
      },
      {
        name: "Azure Functions",
        reason:
          "Add serverless API routes or background tasks without managing a server.",
      },
      {
        name: "Azure SQL",
        reason:
          "Connect a managed relational database to persist user and app data.",
      },
    ],
  },
  "function-app": {
    bestAt:
      "Event-driven, short-lived compute tasks such as API endpoints, queue processors, or scheduled jobs.",
    management:
      "Serverless — Azure scales instances to zero when idle and back up on demand.",
    costModel:
      "Consumption plan bills per execution and GB-seconds of memory. You pay nothing when functions aren't running.",
    whySuggested:
      "Great for lightweight API routes or background tasks in this scenario where traffic is bursty or unpredictable.",
    pairWith: [
      {
        name: "Cosmos DB",
        reason:
          "Store flexible, schema-free data like events or user sessions at serverless scale.",
      },
      {
        name: "Azure SQL",
        reason:
          "Persist relational data such as orders or user records from function-triggered workflows.",
      },
      {
        name: "Static Web Apps",
        reason:
          "Serve the frontend while Functions handle backend API calls in the same deployment.",
      },
    ],
  },
  "function-app-web": {
    bestAt:
      "Event-driven, short-lived compute tasks such as API endpoints, queue processors, or scheduled jobs.",
    management:
      "Serverless — Azure scales instances to zero when idle and back up on demand.",
    costModel:
      "Consumption plan bills per execution and GB-seconds of memory. You pay nothing when functions aren't running.",
    whySuggested:
      "Great for lightweight API routes or background tasks in this scenario where traffic is bursty or unpredictable.",
    pairWith: [
      {
        name: "Cosmos DB",
        reason:
          "Store flexible, schema-free data like events or user sessions at serverless scale.",
      },
      {
        name: "Azure SQL",
        reason:
          "Persist relational data such as orders or user records from function-triggered workflows.",
      },
      {
        name: "Static Web Apps",
        reason:
          "Serve the frontend while Functions handle backend API calls in the same deployment.",
      },
    ],
  },
  "azure-sql": {
    bestAt:
      "Relational data with complex queries, transactions, and strong consistency. Fully compatible with SQL Server tooling.",
    management: "Automated backups, patching, and high availability built in.",
    costModel:
      "Billed by vCores (or DTUs) and storage. Serverless tier scales compute to zero when idle to reduce cost.",
    whySuggested:
      "Strong choice for structured app data like user records and orders. Familiar SQL dialect and excellent .NET/Node support.",
    pairWith: [
      {
        name: "App Service",
        reason:
          "Connect your web app backend directly to Azure SQL over a secure private endpoint.",
      },
      {
        name: "Azure Functions",
        reason:
          "Trigger serverless workflows from database changes using SQL bindings.",
      },
      {
        name: "Virtual Network",
        reason:
          "Isolate the database on a private subnet so it is never exposed to the public internet.",
      },
    ],
  },
  postgresql: {
    bestAt:
      "Open-source relational workloads with advanced extensions (PostGIS, pgvector, etc.) and full SQL compliance.",
    management: "Azure manages backups, patching, and HA replicas.",
    costModel:
      "Billed by compute tier (Burstable, General Purpose) and storage GB. Flexible Server allows stopping the server to pause compute costs.",
    whySuggested:
      "Great open-source alternative to Azure SQL — works well with Python/Django, Node, and most ORMs in this stack.",
    pairWith: [
      {
        name: "App Service",
        reason:
          "Connect your web app backend to PostgreSQL using standard connection strings and ORMs.",
      },
      {
        name: "Azure Functions",
        reason:
          "Run scheduled or event-driven jobs that read from or write to the database.",
      },
      {
        name: "Virtual Network",
        reason:
          "Keep the database on a private subnet away from public internet access.",
      },
    ],
  },
  "cosmos-db": {
    bestAt:
      "Globally distributed, low-latency NoSQL data with multiple API choices (NoSQL, MongoDB, Cassandra, Gremlin).",
    management:
      "Fully managed — replication, failover, and indexing are automatic.",
    costModel:
      "Billed by Request Units (RUs) per second provisioned plus storage. Serverless mode bills per operation instead.",
    whySuggested:
      "Best when you need sub-10ms reads at global scale or schema-flexible data like user sessions or product catalogs.",
    pairWith: [
      {
        name: "App Service",
        reason:
          "Read and write Cosmos DB documents from your web app backend using the SDK.",
      },
      {
        name: "Azure Functions",
        reason:
          "React to Cosmos DB change feed events with serverless triggers for real-time processing.",
      },
      {
        name: "Static Web Apps",
        reason:
          "Call Cosmos DB through a Functions API layer bundled with your static frontend deployment.",
      },
    ],
  },
  vm: {
    bestAt:
      "Full control over OS, runtime, and network configuration for any workload that doesn't fit PaaS constraints.",
    management:
      "Manual — you manage OS updates, security patches, scaling, and monitoring.",
    costModel:
      "Billed per hour by VM size (CPU + memory). Reserved instances and spot pricing can significantly reduce cost.",
    whySuggested:
      "Useful if you need to run a custom runtime, legacy software, or workloads that require specific OS-level configuration.",
    pairWith: [
      {
        name: "Virtual Network",
        reason:
          "Place the VM on a private subnet and control inbound and outbound traffic with NSG rules.",
      },
      {
        name: "Load Balancer",
        reason:
          "Distribute traffic across multiple VM instances for higher availability and scale.",
      },
      {
        name: "Azure SQL",
        reason:
          "Connect the app running on the VM to a fully managed relational database.",
      },
    ],
  },
  vnets: {
    bestAt:
      "Isolating and connecting Azure resources with private IP networking, subnets, and traffic routing rules.",
    management:
      "Low maintenance once configured — you manage routing rules and peering.",
    costModel:
      "VNets themselves are free. You pay for bandwidth (egress), VPN gateways, and peering traffic.",
    whySuggested:
      "Required if you want to keep your app and database on a private network, preventing public internet exposure.",
    pairWith: [
      {
        name: "App Service",
        reason:
          "Run your web app within the VNet so it can reach the database over a private connection.",
      },
      {
        name: "Virtual Machines",
        reason:
          "Host custom workloads on VMs that are fully isolated within the private network.",
      },
      {
        name: "Azure SQL",
        reason:
          "Attach the database to the VNet via a private endpoint to block all public access.",
      },
    ],
  },
  "load-balancers": {
    bestAt:
      "Distributing inbound traffic across multiple VM or container instances for high availability and scale.",
    management: "Mostly automatic once health probes and rules are configured.",
    costModel:
      "Billed by rules and data processed. Standard Load Balancer includes zone redundancy at a predictable flat rate.",
    whySuggested:
      "Needed when running multiple VM instances behind your app to ensure traffic is spread evenly and stays available.",
    pairWith: [
      {
        name: "Virtual Machines",
        reason:
          "Balance traffic across a fleet of VMs hosting your web app or API tier.",
      },
      {
        name: "App Service",
        reason:
          "Combine with App Service Environment for fine-grained load distribution in a VNet.",
      },
      {
        name: "Virtual Network",
        reason:
          "Deploy the load balancer inside a VNet to keep traffic private and secure.",
      },
    ],
  },
  "devops-org": {
    bestAt:
      "End-to-end CI/CD pipelines, Git repos, work item tracking, and artifact management in one place.",
    management: "SaaS — Azure manages the infrastructure.",
    costModel:
      "Free for up to 5 users with basic features. Paid tiers add parallel pipeline jobs and extended artifact storage.",
    whySuggested:
      "Streamlines automated builds and deployments to App Service or Static Web Apps directly from your source repo.",
    pairWith: [
      {
        name: "App Service",
        reason:
          "Deploy your web app backend automatically on every push with Azure Pipelines.",
      },
      {
        name: "Static Web Apps",
        reason:
          "Trigger frontend builds and CDN deployments via GitHub Actions or Azure Pipelines.",
      },
      {
        name: "Azure Functions",
        reason:
          "Push serverless function deployments through the same pipeline as the rest of your app.",
      },
    ],
  },
};

export interface CannedResult {
  /** Explanation paragraph shown below the page title */
  explanation: string;
  /** Category IDs to include — empty means all categories */
  categoryIds: string[];
  /** Service IDs to show within those categories */
  serviceIds: Set<string>;
}

const WEB_APP_DB_SERVICE_IDS = new Set([
  // Web & mobile
  "static-web-apps",
  // Compute
  "app-services",
  "function-app",
  // Databases
  "azure-sql",
  "postgresql",
  "cosmos-db",
  // Compute
  "vm",
  // Networking
  "vnets",
  "load-balancers",
  // DevOps
  "devops-org",
]);

export const cannedResults: Record<string, CannedResult> = {
  "web-app-database": {
    explanation:
      "Based on your goal, I've highlighted the Azure services most relevant to building and hosting a web application backed by a managed database. " +
      "You'll find options for hosting your app and APIs, relational and NoSQL databases, compute for backend workloads, and supporting services for networking, identity, and deployment.",
    categoryIds: ["web", "databases", "compute", "networking", "devops"],
    serviceIds: WEB_APP_DB_SERVICE_IDS,
  },
};

/** Fallback result used when no canned match is found — shows the standard startup service set */
export const fallbackResult: CannedResult = {
  explanation:
    "Based on your goal, here are the most commonly used Azure services to help you get started. " +
    "Browse by category or use the anchor links on the right to jump to a specific area.",
  categoryIds: [],
  serviceIds: startupServiceIds,
};

/** Returns the canned result key that best matches the prompt, or null to use the fallback */
export function matchPrompt(prompt: string): string | null {
  const n = prompt.toLowerCase();
  const hasWeb =
    n.includes("web") ||
    n.includes("app") ||
    n.includes("site") ||
    n.includes("frontend") ||
    n.includes("backend") ||
    n.includes("server");
  const hasDb =
    n.includes("database") ||
    n.includes("db") ||
    n.includes("sql") ||
    n.includes("postgres") ||
    n.includes("data") ||
    n.includes("storage");
  if (hasWeb && hasDb) return "web-app-database";
  return null;
}
