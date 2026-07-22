// ============================================================================
// Manage Dashboard — Mock Data & Type Definitions
// ============================================================================
// Architecture: Each Azure service type implements ServiceData with a shared
// shape (health, cost, anomalies) plus a service-specific `metrics` bag.
// To add a new service type:
//   1. Add a new entry to ServiceType
//   2. Define its metrics interface and add to ServiceMetricsMap
//   3. Create a mock data object following the pattern below
// ============================================================================

// ---------------------------------------------------------------------------
// Core types
// ---------------------------------------------------------------------------

export type ServiceType =
  | "container-app"
  | "app-service"
  | "function-app"
  | "sql-database"
  | "storage-account"

export type HealthStatus = "healthy" | "degraded" | "critical"

export interface TimeSeriesPoint {
  time: string       // ISO-ish label, e.g. "02:00" or "Feb 1"
  value: number
}

export interface CostBreakdownItem {
  category: string
  amount: number
  color: string
}

export interface Anomaly {
  id: string
  severity: "info" | "warning" | "critical"
  message: string
  timestamp: string
  metric: string
}

export interface Deployment {
  id: string
  revision: string
  timestamp: string
  status: "active" | "inactive" | "failed"
}

// ---------------------------------------------------------------------------
// Service-specific metric shapes
// ---------------------------------------------------------------------------

export interface ContainerAppMetrics {
  restartCount: number
  restartSeries: TimeSeriesPoint[]
  httpCodes: { code: string; count: number; color: string }[]
  responseTimeP50: number
  responseTimeP95: number
  responseTimeP99: number
  responseTimeSeries: TimeSeriesPoint[]
  cpuPercent: number
  cpuSeries: TimeSeriesPoint[]
  memoryPercent: number
  memorySeries: TimeSeriesPoint[]
  replicaCount: number
  replicaMax: number
  replicaSeries: TimeSeriesPoint[]
  requestVolumeSeries: TimeSeriesPoint[]
  activeConnections: number
  errorRate: number
  errorRateSeries: TimeSeriesPoint[]
  deployments: Deployment[]
}

export interface FunctionAppMetrics {
  executionCount: number
  executionSeries: TimeSeriesPoint[]
  avgDurationMs: number
  durationSeries: TimeSeriesPoint[]
  failureRate: number
  failureSeries: TimeSeriesPoint[]
  activeInstances: number
}

export interface SqlDatabaseMetrics {
  dtuPercent: number
  dtuSeries: TimeSeriesPoint[]
  connectionCount: number
  connectionSeries: TimeSeriesPoint[]
  queryPerformanceMs: number
  querySeries: TimeSeriesPoint[]
  storageUsedGB: number
  storageLimitGB: number
}

export interface StorageAccountMetrics {
  transactionCount: number
  transactionSeries: TimeSeriesPoint[]
  capacityGB: number
  capacitySeries: TimeSeriesPoint[]
  avgLatencyMs: number
  latencySeries: TimeSeriesPoint[]
}

export interface AppServiceMetrics {
  requestCount: number
  requestSeries: TimeSeriesPoint[]
  responseTimeMs: number
  responseTimeSeries: TimeSeriesPoint[]
  httpErrors: number
  cpuPercent: number
  cpuSeries: TimeSeriesPoint[]
  memoryPercent: number
  memorySeries: TimeSeriesPoint[]
}

// Map service types to their metric interfaces
export interface ServiceMetricsMap {
  "container-app": ContainerAppMetrics
  "function-app": FunctionAppMetrics
  "sql-database": SqlDatabaseMetrics
  "storage-account": StorageAccountMetrics
  "app-service": AppServiceMetrics
}

// ---------------------------------------------------------------------------
// ServiceData — the unified shape every service entry follows
// ---------------------------------------------------------------------------

export interface ServiceData<T extends ServiceType = ServiceType> {
  id: string
  name: string
  type: T
  typeLabel: string
  resourceGroup: string
  region: string
  status: HealthStatus
  statusReason: string
  lastUpdated: string   // human-readable relative time

  // Cost
  currentMonthCost: number
  lastMonthCost: number
  burnRateProjection: number
  costSeries: TimeSeriesPoint[]
  costBreakdown: CostBreakdownItem[]

  // Anomalies
  anomalies: Anomaly[]

  // Service-specific metrics
  metrics: ServiceMetricsMap[T]
}

// ---------------------------------------------------------------------------
// Helper — generate 24-hour series
// ---------------------------------------------------------------------------

function make24hSeries(
  baseFn: (hour: number) => number,
  noise = 0.1,
): TimeSeriesPoint[] {
  return Array.from({ length: 24 }, (_, i) => {
    const base = baseFn(i)
    const jitter = base * noise * (Math.random() - 0.5) * 2
    return {
      time: `${String(i).padStart(2, "0")}:00`,
      value: Math.max(0, Math.round((base + jitter) * 100) / 100),
    }
  })
}

function makeMonthlyCostSeries(dailyAvg: number): TimeSeriesPoint[] {
  let cumulative = 0
  return Array.from({ length: 13 }, (_, i) => {
    const day = i + 1
    const dailyCost = dailyAvg * (0.85 + Math.random() * 0.3)
    cumulative += dailyCost
    return {
      time: `Feb ${day}`,
      value: Math.round(cumulative * 100) / 100,
    }
  })
}

// ---------------------------------------------------------------------------
// Mock data: Container App — "contoso-api"
// ---------------------------------------------------------------------------

const containerApp1: ServiceData<"container-app"> = {
  id: "container-app-1",
  name: "contoso-api",
  type: "container-app",
  typeLabel: "Container App",
  resourceGroup: "contoso-prod-rg",
  region: "East US",
  status: "degraded",
  statusReason: "Error rate elevated (2.4% vs 0.3% baseline)",
  lastUpdated: "2 min ago",

  currentMonthCost: 47.82,
  lastMonthCost: 89.14,
  burnRateProjection: 112.30,
  costSeries: makeMonthlyCostSeries(3.68),
  costBreakdown: [
    { category: "Compute (vCPU)", amount: 31.20, color: "#0078D4" },
    { category: "Memory", amount: 9.85, color: "#50E6FF" },
    { category: "Requests", amount: 4.12, color: "#00B294" },
    { category: "Egress", amount: 2.65, color: "#8764B8" },
  ],

  anomalies: [
    {
      id: "a1",
      severity: "warning",
      message: "Error rate 3× higher than yesterday's average",
      timestamp: "12:34 PM",
      metric: "HTTP 5xx",
    },
    {
      id: "a2",
      severity: "info",
      message: "Unusual spike in replicas at 2:14 PM",
      timestamp: "2:14 PM",
      metric: "Replicas",
    },
    {
      id: "a3",
      severity: "warning",
      message: "Memory usage trending toward allocation limit",
      timestamp: "1:48 PM",
      metric: "Memory",
    },
  ],

  metrics: {
    restartCount: 3,
    restartSeries: make24hSeries((h) => (h === 14 ? 2 : h === 3 ? 1 : 0), 0),
    httpCodes: [
      { code: "2xx", count: 42_187, color: "#00B294" },
      { code: "3xx", count: 1_204, color: "#0078D4" },
      { code: "4xx", count: 387, color: tokens.colorPaletteYellowForeground1 },
      { code: "5xx", count: 1_042, color: tokens.colorPaletteRedForeground1 },
    ],
    responseTimeP50: 48,
    responseTimeP95: 187,
    responseTimeP99: 420,
    responseTimeSeries: make24hSeries(
      (h) => (h >= 12 && h <= 15 ? 95 : 45 + Math.sin(h / 3) * 15),
      0.15,
    ),
    cpuPercent: 42,
    cpuSeries: make24hSeries(
      (h) => (h >= 9 && h <= 17 ? 45 : 20) + Math.sin(h) * 8,
      0.1,
    ),
    memoryPercent: 73,
    memorySeries: make24hSeries(
      (h) => 60 + h * 0.5 + Math.sin(h / 2) * 5,
      0.05,
    ),
    replicaCount: 3,
    replicaMax: 10,
    replicaSeries: make24hSeries(
      (h) => (h >= 12 && h <= 14 ? 5 : h >= 9 && h <= 17 ? 3 : 1),
      0,
    ),
    requestVolumeSeries: make24hSeries(
      (h) => {
        if (h >= 9 && h <= 17) return 1800 + Math.sin((h - 9) / 2) * 600
        if (h >= 18 && h <= 22) return 800
        return 200
      },
      0.12,
    ),
    activeConnections: 127,
    errorRate: 2.4,
    errorRateSeries: make24hSeries(
      (h) => (h >= 12 && h <= 15 ? 2.6 : 0.3),
      0.2,
    ),
    deployments: [
      { id: "d1", revision: "contoso-api--v8", timestamp: "Feb 13, 10:22 AM", status: "active" },
      { id: "d2", revision: "contoso-api--v7", timestamp: "Feb 11, 3:45 PM", status: "inactive" },
      { id: "d3", revision: "contoso-api--v6", timestamp: "Feb 8, 9:10 AM", status: "inactive" },
    ],
  },
}

// ---------------------------------------------------------------------------
// Mock data: Function App — "contoso-jobs"
// ---------------------------------------------------------------------------

const functionApp1: ServiceData<"function-app"> = {
  id: "function-app-1",
  name: "contoso-jobs",
  type: "function-app",
  typeLabel: "Function App",
  resourceGroup: "contoso-prod-rg",
  region: "East US",
  status: "healthy",
  statusReason: "All functions executing normally",
  lastUpdated: "1 min ago",

  currentMonthCost: 8.42,
  lastMonthCost: 18.90,
  burnRateProjection: 19.40,
  costSeries: makeMonthlyCostSeries(0.65),
  costBreakdown: [
    { category: "Executions", amount: 5.10, color: "#0078D4" },
    { category: "GB-seconds", amount: 2.87, color: "#50E6FF" },
    { category: "Egress", amount: 0.45, color: "#8764B8" },
  ],

  anomalies: [],

  metrics: {
    executionCount: 28_432,
    executionSeries: make24hSeries(
      (h) => (h >= 6 && h <= 22 ? 1200 + Math.sin(h / 3) * 400 : 150),
      0.15,
    ),
    avgDurationMs: 245,
    durationSeries: make24hSeries(() => 230 + Math.random() * 40, 0.1),
    failureRate: 0.12,
    failureSeries: make24hSeries(() => 0.1 + Math.random() * 0.08, 0.15),
    activeInstances: 2,
  },
}

// ---------------------------------------------------------------------------
// Mock data: Storage Account — "contosostorage"
// ---------------------------------------------------------------------------

const storageAccount1: ServiceData<"storage-account"> = {
  id: "storage-account-1",
  name: "contosostorage",
  type: "storage-account",
  typeLabel: "Storage Account",
  resourceGroup: "contoso-prod-rg",
  region: "East US",
  status: "healthy",
  statusReason: "All operations normal",
  lastUpdated: "3 min ago",

  currentMonthCost: 3.18,
  lastMonthCost: 6.72,
  burnRateProjection: 7.35,
  costSeries: makeMonthlyCostSeries(0.24),
  costBreakdown: [
    { category: "Storage (Hot)", amount: 1.92, color: "#0078D4" },
    { category: "Transactions", amount: 0.84, color: "#50E6FF" },
    { category: "Egress", amount: 0.42, color: "#8764B8" },
  ],

  anomalies: [],

  metrics: {
    transactionCount: 145_200,
    transactionSeries: make24hSeries(
      (h) => (h >= 8 && h <= 20 ? 6500 : 1200),
      0.1,
    ),
    capacityGB: 12.4,
    capacitySeries: make24hSeries(() => 12.3 + Math.random() * 0.3, 0.02),
    avgLatencyMs: 4.2,
    latencySeries: make24hSeries(() => 3.8 + Math.random() * 1.2, 0.1),
  },
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const allServices: ServiceData[] = [
  containerApp1 as ServiceData,
  functionApp1 as ServiceData,
  storageAccount1 as ServiceData,
]

export function getServiceById(id: string): ServiceData | undefined {
  return allServices.find((s) => s.id === id)
}

/** Icon name hints per service type — consumed by the UI layer */
export const serviceTypeIcons: Record<ServiceType, string> = {
  "container-app": "BoxMultiple",
  "function-app": "Flash",
  "sql-database": "Database",
  "storage-account": "Storage",
  "app-service": "Globe",
}
