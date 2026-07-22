// ── Mock dataset for Contoso carbon emissions prototype ──

export interface BillingAccount {
  id: string;
  name: string;
  subscriptions: Subscription[];
}

export interface Subscription {
  id: string;
  name: string;
  billingAccountId: string;
  resourceGroup: string;
  location: string;
  resourceType: string;
}

export interface MonthlyEmission {
  month: string; // "YYYY-MM"
  subscriptionId: string;
  scope1: number; // kgCO2e
  scope2: number;
  scope3: number;
}

export interface SavingsOpportunity {
  id: string;
  subscriptionId: string;
  resourceName: string;
  description: string;
  savingsKgCO2e: number;
  action: string;
}

export interface ResourceGroup {
  id: string;
  name: string;
  subscriptionId: string;
  location: string;
}

export interface Resource {
  id: string;
  name: string;
  type: string;
  resourceGroupId: string;
  subscriptionId: string;
  location: string;
}

// ── Locations ──
export const locations = [
  "East US 2",
  "East US",
  "Central US",
  "West US 2",
  "West Europe",
  "North Europe",
  "Southeast Asia",
  "Japan East",
  "UK South",
  "Canada Central",
];

// ── Resource types ──
export const resourceTypes = [
  "Virtual machines",
  "Storage accounts",
  "SQL databases",
  "App Services",
  "Kubernetes clusters",
  "Cosmos DB",
  "Functions",
  "Redis Cache",
  "Key Vaults",
  "Container registries",
];

// ── Seeded pseudo-random number generator (deterministic) ──
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);

function pick<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function randBetween(min: number, max: number): number {
  return +(min + rand() * (max - min)).toFixed(2);
}

// ── Billing accounts ──
export const billingAccounts: BillingAccount[] = [
  { id: "ba-001", name: "Contoso Enterprise Production", subscriptions: [] },
  { id: "ba-002", name: "Contoso Development & Testing", subscriptions: [] },
  { id: "ba-003", name: "Contoso Data & Analytics", subscriptions: [] },
  { id: "ba-004", name: "Contoso Global Infrastructure", subscriptions: [] },
  { id: "ba-005", name: "Contoso Research & Innovation", subscriptions: [] },
];

// ── Subscription name templates per billing account ──
const subscriptionTemplates: Record<string, string[]> = {
  "ba-001": [
    "Prod-WebApps", "Prod-APIs", "Prod-Microservices", "Prod-Frontend",
    "Prod-Backend", "Prod-Database", "Prod-Cache", "Prod-Messaging",
    "Prod-Identity", "Prod-Gateway", "Prod-CDN", "Prod-Media",
    "Prod-Payments", "Prod-Notifications", "Prod-Search",
    "Prod-Monitoring", "Prod-Logging", "Prod-Analytics",
    "Prod-Security", "Prod-Compliance", "Prod-DR-EastUS",
    "Prod-DR-WestEurope", "Prod-Edge-APAC", "Prod-Edge-EMEA",
    "Prod-Mobile", "Prod-IoT-Hub", "Prod-EventGrid",
    "Prod-ServiceBus", "Prod-KeyVault", "Prod-DNS",
    "Prod-TrafficMgr", "Prod-AppInsights", "Prod-AzureAD",
    "Prod-B2C-Auth", "Prod-FunctionApps", "Prod-ContainerApps",
    "Prod-AKS-Cluster1", "Prod-AKS-Cluster2", "Prod-AKS-Cluster3",
    "Prod-CosmosDB", "Prod-PostgreSQL", "Prod-MySQL",
    "Prod-Redis-Primary", "Prod-Redis-Replica", "Prod-Redis-Geo",
    "Prod-BlobStorage", "Prod-FileStorage", "Prod-QueueStorage",
    "Prod-TableStorage", "Prod-DataFactory", "Prod-Synapse",
    "Prod-Purview", "Prod-Sentinel", "Prod-Bastion",
    "Prod-Firewall", "Prod-WAF", "Prod-PrivateLink",
    "Prod-SignalR", "Prod-APIM-External", "Prod-APIM-Internal",
    "Prod-LogicApps", "Prod-EventHubs", "Prod-NotificationHubs",
    "Prod-Maps", "Prod-CommunicationServices", "Prod-MediaServices",
    "Prod-StreamAnalytics", "Prod-MachineLearning", "Prod-CogSearch",
    "Prod-BotService", "Prod-StaticWebApps", "Prod-SpringApps",
    "Prod-BatchCompute", "Prod-DevCenter", "Prod-ManagedGrafana",
    "Prod-ContainerInstances", "Prod-ServiceFabric",
    "Prod-DedicatedHSM", "Prod-ConfidentialLedger",
  ],
  "ba-002": [
    "Dev-WebApps", "Dev-APIs", "Dev-Microservices", "Dev-Frontend",
    "Dev-Backend", "Dev-Database", "Dev-Sandbox-Team1",
    "Dev-Sandbox-Team2", "Dev-Sandbox-Team3", "Dev-Sandbox-Team4",
    "Dev-Sandbox-Team5", "Dev-QA-Integration", "Dev-QA-Performance",
    "Dev-QA-Security", "Dev-Staging-Blue", "Dev-Staging-Green",
    "Dev-CI-CD", "Dev-ArtifactRegistry", "Dev-TestLab-East",
    "Dev-FeatureFlags", "Dev-MockServices", "Dev-LoadTesting",
    "Dev-DockerRegistry", "Dev-K8s-Dev", "Dev-K8s-QA",
    "Dev-Shared-DB", "Dev-Shared-Cache", "Dev-Shared-Storage",
    "Dev-POC-ML", "Dev-POC-IoT", "Dev-Intern-Projects",
    "Test-E2E-Suite", "Test-Mobile-iOS", "Test-Mobile-Android",
    "Test-API-Smoke",
  ],
  "ba-003": [
    "Data-Lake-Raw", "Data-Lake-Curated", "Data-Lake-Enriched",
    "Data-Warehouse-Prod", "Data-Warehouse-Dev", "Data-ETL-Primary",
    "Data-ETL-Secondary", "Data-Stream-Ingest", "Data-Stream-Process",
    "Data-Stream-Output", "Data-ML-Training", "Data-ML-Inference",
    "Data-ML-Experimentation", "Data-ML-FeatureStore",
    "Data-ML-ModelRegistry", "Data-BI-PowerBI", "Data-BI-Dashboards",
    "Data-BI-Reports", "Data-BI-Embedded", "Data-Governance",
    "Data-Catalog", "Data-Quality", "Data-Lineage",
    "Data-Privacy-PII", "Data-Privacy-GDPR", "Data-Archive-Tier1",
    "Data-Archive-Tier2", "Data-Backup-Daily",
    "Analytics-CustomerInsights", "Analytics-ProductUsage",
    "Analytics-Revenue", "Analytics-Marketing",
    "Analytics-Operations", "Analytics-RealTime",
    "AI-OpenAI-Prod", "AI-OpenAI-Dev", "AI-CognitiveServices",
    "AI-BotFramework", "AI-FormRecognizer", "AI-CustomVision",
    "AI-SpeechServices", "AI-Translator", "AI-SearchCognitive",
  ],
  "ba-004": [
    "Infra-Networking-East", "Infra-Networking-West",
    "Infra-Networking-Europe", "Infra-DNS-Global",
    "Infra-Firewall-East", "Infra-Firewall-West",
    "Infra-VPN-Gateway", "Infra-ExpressRoute-East",
    "Infra-LoadBalancer-Ext", "Infra-WAF-Global",
    "Infra-Bastion-East", "Infra-Monitoring",
    "Infra-LogAnalytics-East", "Infra-KeyVault-Global",
    "Infra-ManagedIdentity",
  ],
  "ba-005": [
    "Research-QuantumDev", "Research-HPC-Cluster1",
    "Research-GPU-Training", "Research-LLM-FineTune",
    "Research-GenAI", "Innovation-Incubator-A",
    "Skunkworks-ProjectAlpha", "Skunkworks-SandboxGPU",
  ],
};

// ── Generate subscriptions ──
let subIndex = 0;
for (const ba of billingAccounts) {
  const templates = subscriptionTemplates[ba.id];
  ba.subscriptions = templates.map((name) => {
    subIndex++;
    const id = `sub-${String(subIndex).padStart(4, "0")}`;
    return {
      id,
      name,
      billingAccountId: ba.id,
      resourceGroup: `rg-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      location: pick(locations),
      resourceType: pick(resourceTypes),
    };
  });
}

export const allSubscriptions: Subscription[] = billingAccounts.flatMap(
  (ba) => ba.subscriptions
);

// ── Months: Feb 2025 – Jan 2026 ──
export const months = [
  "2025-02", "2025-03", "2025-04", "2025-05", "2025-06", "2025-07",
  "2025-08", "2025-09", "2025-10", "2025-11", "2025-12", "2026-01",
];

// ── Generate monthly emissions per subscription ──
// Emissions scale by billing account "weight" (prod > dev > data > infra > research)
const baWeights: Record<string, { s1: [number, number]; s2: [number, number]; s3: [number, number] }> = {
  "ba-001": { s1: [0.02, 0.12], s2: [0.08, 0.45], s3: [0.15, 0.80] },
  "ba-002": { s1: [0.01, 0.06], s2: [0.04, 0.20], s3: [0.05, 0.30] },
  "ba-003": { s1: [0.03, 0.15], s2: [0.10, 0.55], s3: [0.20, 0.90] },
  "ba-004": { s1: [0.01, 0.05], s2: [0.05, 0.25], s3: [0.08, 0.35] },
  "ba-005": { s1: [0.04, 0.20], s2: [0.15, 0.70], s3: [0.25, 1.10] },
};

export const monthlyEmissions: MonthlyEmission[] = [];

for (const sub of allSubscriptions) {
  const w = baWeights[sub.billingAccountId];
  // Each subscription has a base multiplier for some consistency month-to-month
  const baseMul = 0.6 + rand() * 0.8;

  for (const month of months) {
    // Slight seasonal variation: higher in winter months
    const monthNum = parseInt(month.split("-")[1]);
    const seasonal = monthNum >= 11 || monthNum <= 2 ? 1.15 : monthNum >= 6 && monthNum <= 8 ? 0.9 : 1.0;

    monthlyEmissions.push({
      month,
      subscriptionId: sub.id,
      scope1: +(randBetween(w.s1[0], w.s1[1]) * baseMul * seasonal).toFixed(3),
      scope2: +(randBetween(w.s2[0], w.s2[1]) * baseMul * seasonal).toFixed(3),
      scope3: +(randBetween(w.s3[0], w.s3[1]) * baseMul * seasonal).toFixed(3),
    });
  }
}

// ── Savings opportunities ──
export const savingsOpportunities: SavingsOpportunity[] = [
  {
    id: "sav-001",
    subscriptionId: "sub-0037",
    resourceName: "Standard_D8a_v4",
    description: "Change instance count from 100 to 32 by using Standard_D8a_v4 on resource R2D2.",
    savingsKgCO2e: 3.4,
    action: "Resize VM",
  },
  {
    id: "sav-002",
    subscriptionId: "sub-0038",
    resourceName: "Standard_D8a_v4",
    description: "Change instance count from 100 to 32 by using Standard_D8a_v4 on resource c3po.",
    savingsKgCO2e: 1.3,
    action: "Resize VM",
  },
  {
    id: "sav-003",
    subscriptionId: "sub-0105",
    resourceName: "Standard_D2s_v3",
    description: "Resize VM to Standard_D2s_v3 on resource R3-X.",
    savingsKgCO2e: 22.7,
    action: "Resize VM",
  },
  {
    id: "sav-004",
    subscriptionId: "sub-0142",
    resourceName: "Standard_D2s_v3",
    description: "Resize VM to Standard_D2s_v3 on resource CB-23.",
    savingsKgCO2e: 7.4,
    action: "Resize VM",
  },
  {
    id: "sav-005",
    subscriptionId: "sub-0001",
    resourceName: "Standard_E4s_v5",
    description: "Right-size VM from Standard_E8s_v5 to Standard_E4s_v5 on resource web-prod-01.",
    savingsKgCO2e: 4.8,
    action: "Right-size VM",
  },
  {
    id: "sav-006",
    subscriptionId: "sub-0180",
    resourceName: "Standard_B2ms",
    description: "Deallocate idle VM Standard_D4s_v3 on resource bastion-west-02.",
    savingsKgCO2e: 2.1,
    action: "Deallocate VM",
  },
  {
    id: "sav-007",
    subscriptionId: "sub-0210",
    resourceName: "Standard_NC6s_v3",
    description: "Schedule GPU VM to auto-shutdown on resource gpu-train-idle.",
    savingsKgCO2e: 15.3,
    action: "Auto-shutdown",
  },
  {
    id: "sav-008",
    subscriptionId: "sub-0090",
    resourceName: "Premium_LRS",
    description: "Move cold storage from Premium to Standard tier on resource archive-blob-01.",
    savingsKgCO2e: 1.9,
    action: "Change storage tier",
  },
];

// ── Resource group & resource name pools ──

const rgProjects = [
  "webapp", "api", "microservices", "networking", "storage",
  "database", "analytics", "monitoring", "security", "identity",
  "messaging", "cache", "search", "media", "iot",
  "ml-training", "ml-inference", "devops", "cicd", "backup",
  "logging", "dns", "gateway", "frontend", "backend",
  "shared-services", "platform", "batch", "streaming", "data-pipeline",
  "etl", "reporting", "dashboard", "container", "kubernetes",
  "functions", "logic-apps", "apim", "cdn", "waf",
  "bastion", "vpn", "expressroute", "cosmos", "postgres",
  "redis", "keyvault", "loadbalancer", "automation", "governance",
];

const rgEnvTags = [
  "prod", "dev", "staging", "test", "qa",
  "shared", "common", "core", "uat", "sandbox",
  "dr", "perf", "demo", "pilot", "canary",
];

const resourceWordPool = [
  "web", "api", "data", "auth", "core", "hub", "ops",
  "svc", "app", "gw", "log", "msg", "cache", "store",
  "proc", "ingest", "proxy", "worker", "scheduler", "relay",
  "batch", "queue", "event", "stream", "model", "bot",
  "media", "search", "notify", "config", "portal", "admin",
  "catalog", "orders", "inventory", "payments", "users", "session",
  "telemetry", "metrics", "alerts", "health", "diag", "sync",
  "router", "dispatch", "transform", "archive", "export", "import",
];

const resourcePrefixMap: Record<string, string> = {
  "Virtual machines": "vm",
  "Storage accounts": "st",
  "SQL databases": "sql",
  "App Services": "app",
  "Kubernetes clusters": "aks",
  "Cosmos DB": "cosmos",
  "Functions": "func",
  "Redis Cache": "redis",
  "Key Vaults": "kv",
  "Container registries": "cr",
};

// ── Generate resource groups & resources ──

let rgIdx = 0;
let resIdx = 0;
export const allResourceGroups: ResourceGroup[] = [];
export const allResources: Resource[] = [];

for (const sub of allSubscriptions) {
  const rgCount = Math.floor(rand() * 11) + 10; // 10–20

  for (let i = 0; i < rgCount; i++) {
    rgIdx++;
    const rgId = `rg-${String(rgIdx).padStart(5, "0")}`;
    const project = rgProjects[rgIdx % rgProjects.length];
    const env = rgEnvTags[Math.floor(rand() * rgEnvTags.length)];
    const rgName = `rg-contoso-${project}-${env}-${String(i + 1).padStart(2, "0")}`;
    const rgLocation = locations[Math.floor(rand() * locations.length)];

    allResourceGroups.push({
      id: rgId,
      name: rgName,
      subscriptionId: sub.id,
      location: rgLocation,
    });

    const resCount = Math.floor(rand() * 21) + 20; // 20–40

    for (let j = 0; j < resCount; j++) {
      resIdx++;
      const resType = resourceTypes[Math.floor(rand() * resourceTypes.length)];
      const prefix = resourcePrefixMap[resType];
      const word = resourceWordPool[Math.floor(rand() * resourceWordPool.length)];
      const resName = prefix === "st"
        ? `st${word}contoso${String(resIdx % 1000).padStart(3, "0")}`
        : `${prefix}-contoso-${word}-${String(j + 1).padStart(3, "0")}`;

      allResources.push({
        id: `res-${String(resIdx).padStart(7, "0")}`,
        name: resName,
        type: resType,
        resourceGroupId: rgId,
        subscriptionId: sub.id,
        location: rgLocation,
      });
    }
  }
}

// ── Aggregation helpers ──

/** Total emissions for a given month across all or filtered subscriptions */
export function getMonthlyTotals(
  filteredSubIds?: string[]
): { month: string; scope1: number; scope2: number; scope3: number; total: number }[] {
  const ids = filteredSubIds ? new Set(filteredSubIds) : null;
  const map = new Map<string, { scope1: number; scope2: number; scope3: number }>();

  for (const e of monthlyEmissions) {
    if (ids && !ids.has(e.subscriptionId)) continue;
    const agg = map.get(e.month) ?? { scope1: 0, scope2: 0, scope3: 0 };
    agg.scope1 += e.scope1;
    agg.scope2 += e.scope2;
    agg.scope3 += e.scope3;
    map.set(e.month, agg);
  }

  return months.map((m) => {
    const agg = map.get(m) ?? { scope1: 0, scope2: 0, scope3: 0 };
    const s1 = Math.round(agg.scope1 * 10) / 10;
    const s2 = Math.round(agg.scope2 * 10) / 10;
    const s3 = Math.round(agg.scope3 * 10) / 10;
    return {
      month: m,
      scope1: s1,
      scope2: s2,
      scope3: s3,
      total: Math.round((s1 + s2 + s3) * 10) / 10,
    };
  });
}

/** Emissions by resource type for a given month */
export function getEmissionsByResourceType(
  month: string,
  filteredSubIds?: string[]
): { resourceType: string; total: number }[] {
  const ids = filteredSubIds ? new Set(filteredSubIds) : null;
  const subMap = new Map(allSubscriptions.map((s) => [s.id, s]));
  const map = new Map<string, number>();

  for (const e of monthlyEmissions) {
    if (e.month !== month) continue;
    if (ids && !ids.has(e.subscriptionId)) continue;
    const sub = subMap.get(e.subscriptionId);
    if (!sub) continue;
    const rt = sub.resourceType;
    map.set(rt, (map.get(rt) ?? 0) + e.scope1 + e.scope2 + e.scope3);
  }

  return Array.from(map.entries())
    .map(([resourceType, total]) => ({ resourceType, total: Math.round(total * 10) / 10 }))
    .sort((a, b) => b.total - a.total);
}

/** Emissions by location for a given month */
export function getEmissionsByLocation(
  month: string,
  filteredSubIds?: string[]
): { location: string; total: number }[] {
  const ids = filteredSubIds ? new Set(filteredSubIds) : null;
  const subMap = new Map(allSubscriptions.map((s) => [s.id, s]));
  const map = new Map<string, number>();

  for (const e of monthlyEmissions) {
    if (e.month !== month) continue;
    if (ids && !ids.has(e.subscriptionId)) continue;
    const sub = subMap.get(e.subscriptionId);
    if (!sub) continue;
    const loc = sub.location;
    map.set(loc, (map.get(loc) ?? 0) + e.scope1 + e.scope2 + e.scope3);
  }

  return Array.from(map.entries())
    .map(([location, total]) => ({ location, total: Math.round(total * 10) / 10 }))
    .sort((a, b) => b.total - a.total);
}

/** KPI summary for the dashboard */
export function getKpiSummary(filteredSubIds?: string[]) {
  const totals = getMonthlyTotals(filteredSubIds);
  const lastMonth = totals[totals.length - 1];
  const prevMonth = totals[totals.length - 2];
  const twelveMonthTotal = totals.reduce((sum, m) => sum + m.total, 0);

  const monthOverMonth =
    prevMonth.total > 0
      ? Math.round(((lastMonth.total - prevMonth.total) / prevMonth.total) * 1000) / 10
      : 0;

  const potentialSavings = savingsOpportunities.reduce(
    (sum, s) => sum + s.savingsKgCO2e,
    0
  );

  return {
    totalLast12Months: Math.round(twelveMonthTotal * 10) / 10,
    lastMonthTotal: Math.round(lastMonth.total * 10) / 10,
    lastMonthMoM: monthOverMonth,
    potentialMonthlySavings: Math.round(potentialSavings * 10) / 10,
  };
}

// ── Deterministic weight distribution ──
// Derive a stable random weight for any string key so we can split a parent's
// emissions across children without storing per-child records.

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return h >>> 0; // unsigned
}

function stableWeight(key: string): number {
  // Returns a value in (0.2, 1.0] so no child is near-zero
  return 0.2 + (hashCode(key) % 10000) / 12500;
}

function distributeEmissions(
  parentScope1: number,
  parentScope2: number,
  parentScope3: number,
  childKeys: string[]
): Map<string, { scope1: number; scope2: number; scope3: number; total: number }> {
  const weights = childKeys.map((k) => stableWeight(k));
  const wSum = weights.reduce((a, b) => a + b, 0);
  const result = new Map<string, { scope1: number; scope2: number; scope3: number; total: number }>();

  for (let i = 0; i < childKeys.length; i++) {
    const frac = weights[i] / wSum;
    const s1 = +(parentScope1 * frac).toFixed(3);
    const s2 = +(parentScope2 * frac).toFixed(3);
    const s3 = +(parentScope3 * frac).toFixed(3);
    result.set(childKeys[i], { scope1: s1, scope2: s2, scope3: s3, total: +(s1 + s2 + s3).toFixed(3) });
  }
  return result;
}

// ── Lookup indexes (built once, lazily) ──

let _rgsBySub: Map<string, ResourceGroup[]> | null = null;
function rgsBySub(): Map<string, ResourceGroup[]> {
  if (!_rgsBySub) {
    _rgsBySub = new Map();
    for (const rg of allResourceGroups) {
      const list = _rgsBySub.get(rg.subscriptionId) ?? [];
      list.push(rg);
      _rgsBySub.set(rg.subscriptionId, list);
    }
  }
  return _rgsBySub;
}

let _resByRg: Map<string, Resource[]> | null = null;
function resByRg(): Map<string, Resource[]> {
  if (!_resByRg) {
    _resByRg = new Map();
    for (const r of allResources) {
      const list = _resByRg.get(r.resourceGroupId) ?? [];
      list.push(r);
      _resByRg.set(r.resourceGroupId, list);
    }
  }
  return _resByRg;
}

// ── Emission helpers for sub-levels ──

export interface EmissionRow {
  id: string;
  name: string;
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
}

/** Get per-subscription emission totals for a given month */
function getSubEmissionsForMonth(
  month: string,
  filteredSubIds?: string[]
): Map<string, { scope1: number; scope2: number; scope3: number }> {
  const ids = filteredSubIds ? new Set(filteredSubIds) : null;
  const map = new Map<string, { scope1: number; scope2: number; scope3: number }>();
  for (const e of monthlyEmissions) {
    if (e.month !== month) continue;
    if (ids && !ids.has(e.subscriptionId)) continue;
    const agg = map.get(e.subscriptionId) ?? { scope1: 0, scope2: 0, scope3: 0 };
    agg.scope1 += e.scope1;
    agg.scope2 += e.scope2;
    agg.scope3 += e.scope3;
    map.set(e.subscriptionId, agg);
  }
  return map;
}

/** Emissions broken down by resource group for a given month */
export function getEmissionsByResourceGroup(
  month: string,
  filteredSubIds?: string[]
): EmissionRow[] {
  const subEmissions = getSubEmissionsForMonth(month, filteredSubIds);
  const lookup = rgsBySub();
  const rows: EmissionRow[] = [];

  for (const [subId, totals] of subEmissions) {
    const rgs = lookup.get(subId);
    if (!rgs || rgs.length === 0) continue;
    const dist = distributeEmissions(totals.scope1, totals.scope2, totals.scope3, rgs.map((r) => r.id));
    for (const rg of rgs) {
      const d = dist.get(rg.id)!;
      rows.push({ id: rg.id, name: rg.name, ...d });
    }
  }

  return rows.sort((a, b) => b.total - a.total);
}

/** Emissions broken down by resource type for a given month (computed from resources) */
export function getEmissionsByResourceTypeDetailed(
  month: string,
  filteredSubIds?: string[]
): EmissionRow[] {
  const subEmissions = getSubEmissionsForMonth(month, filteredSubIds);
  const rgLookup = rgsBySub();
  const resLookup = resByRg();
  const typeAgg = new Map<string, { scope1: number; scope2: number; scope3: number }>();

  for (const [subId, subTotals] of subEmissions) {
    const rgs = rgLookup.get(subId);
    if (!rgs) continue;
    const rgDist = distributeEmissions(subTotals.scope1, subTotals.scope2, subTotals.scope3, rgs.map((r) => r.id));

    for (const rg of rgs) {
      const rgTotals = rgDist.get(rg.id)!;
      const resources = resLookup.get(rg.id);
      if (!resources || resources.length === 0) continue;
      const resDist = distributeEmissions(rgTotals.scope1, rgTotals.scope2, rgTotals.scope3, resources.map((r) => r.id));

      for (const res of resources) {
        const d = resDist.get(res.id)!;
        const agg = typeAgg.get(res.type) ?? { scope1: 0, scope2: 0, scope3: 0 };
        agg.scope1 += d.scope1;
        agg.scope2 += d.scope2;
        agg.scope3 += d.scope3;
        typeAgg.set(res.type, agg);
      }
    }
  }

  return Array.from(typeAgg.entries())
    .map(([type, t]) => ({
      id: type,
      name: type,
      scope1: +t.scope1.toFixed(3),
      scope2: +t.scope2.toFixed(3),
      scope3: +t.scope3.toFixed(3),
      total: +(t.scope1 + t.scope2 + t.scope3).toFixed(3),
    }))
    .sort((a, b) => b.total - a.total);
}

/** Emissions broken down by individual resource for a given month */
export function getEmissionsByResource(
  month: string,
  filteredSubIds?: string[]
): (EmissionRow & { type: string; resourceGroupName: string })[] {
  const subEmissions = getSubEmissionsForMonth(month, filteredSubIds);
  const rgLookup = rgsBySub();
  const resLookup = resByRg();
  const rows: (EmissionRow & { type: string; resourceGroupName: string })[] = [];

  for (const [subId, subTotals] of subEmissions) {
    const rgs = rgLookup.get(subId);
    if (!rgs) continue;
    const rgDist = distributeEmissions(subTotals.scope1, subTotals.scope2, subTotals.scope3, rgs.map((r) => r.id));

    for (const rg of rgs) {
      const rgTotals = rgDist.get(rg.id)!;
      const resources = resLookup.get(rg.id);
      if (!resources || resources.length === 0) continue;
      const resDist = distributeEmissions(rgTotals.scope1, rgTotals.scope2, rgTotals.scope3, resources.map((r) => r.id));

      for (const res of resources) {
        const d = resDist.get(res.id)!;
        rows.push({ id: res.id, name: res.name, type: res.type, resourceGroupName: rg.name, ...d });
      }
    }
  }

  return rows.sort((a, b) => b.total - a.total);
}

/** Emissions broken down by location/region for a given month */
export function getEmissionsByLocationDetailed(
  month: string,
  filteredSubIds?: string[]
): EmissionRow[] {
  const subEmissions = getSubEmissionsForMonth(month, filteredSubIds);
  const rgLookup = rgsBySub();
  const locAgg = new Map<string, { scope1: number; scope2: number; scope3: number }>();

  for (const [subId, subTotals] of subEmissions) {
    const rgs = rgLookup.get(subId);
    if (!rgs) continue;
    const rgDist = distributeEmissions(subTotals.scope1, subTotals.scope2, subTotals.scope3, rgs.map((r) => r.id));

    for (const rg of rgs) {
      const d = rgDist.get(rg.id)!;
      const agg = locAgg.get(rg.location) ?? { scope1: 0, scope2: 0, scope3: 0 };
      agg.scope1 += d.scope1;
      agg.scope2 += d.scope2;
      agg.scope3 += d.scope3;
      locAgg.set(rg.location, agg);
    }
  }

  return Array.from(locAgg.entries())
    .map(([loc, t]) => ({
      id: loc,
      name: loc,
      scope1: +t.scope1.toFixed(3),
      scope2: +t.scope2.toFixed(3),
      scope3: +t.scope3.toFixed(3),
      total: +(t.scope1 + t.scope2 + t.scope3).toFixed(3),
    }))
    .sort((a, b) => b.total - a.total);
}
