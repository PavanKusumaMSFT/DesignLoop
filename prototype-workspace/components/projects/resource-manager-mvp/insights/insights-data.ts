// Mock data for the Resource Manager MVP "Get insights" blade.
// Structured so the blade can reflect a dynamic set of selected resources via
// the ?ids= query param on the insights page.

export type AlertSeverity = "Critical" | "Warning" | "Info"

export interface AlertDimension {
  key: string
  value: string
}

export interface AlertRow {
  severity: AlertSeverity
  title: string
  resource: string
  time: string
  // Extra fields rendered in the alert context pane
  description?: string
  monitorService?: string
  alertCondition?: string
  dimensions?: AlertDimension[]
  value?: string
  threshold?: string
  deviation?: string
  query?: string
}

export interface SelectedResource {
  id: string
  name: string
  type: string
  /** Child resources (e.g. resources inside a Resource group). */
  children?: SelectedResource[]
}

// Small lookup used by the insights page to resolve `?ids=` into resource rows.
// Kept in-file so insights-data.ts stays self-contained.
const RESOURCE_LOOKUP: Record<string, { name: string; type: string }> = {
  "1": { name: "prod-web-vm-01", type: "Virtual machine" },
  "2": { name: "prod-web-vm-02", type: "Virtual machine" },
  "3": { name: "staging-api-vm", type: "Virtual machine" },
  "4": { name: "dev-test-vm", type: "Virtual machine" },
  "5": { name: "ml-training-cluster", type: "Virtual machine scale set" },
  "6": { name: "prod-vnet-eastus", type: "Virtual network" },
  "7": { name: "staging-vnet-westus", type: "Virtual network" },
  "8": { name: "prod-lb-frontend", type: "Load balancer" },
  "9": { name: "app-gateway-01", type: "Application gateway" },
  "10": { name: "prod-nsg-web", type: "Network security group" },
  "11": { name: "prodstorage01", type: "Storage account" },
  "12": { name: "devstorageblobs", type: "Storage account" },
  "13": { name: "backupstoragevault", type: "Storage account" },
  "14": { name: "prod-sql-server", type: "SQL database" },
  "15": { name: "prod-cosmosdb", type: "Cosmos DB" },
  "16": { name: "dev-postgres", type: "PostgreSQL" },
  "17": { name: "prod-key-vault", type: "Key vault" },
  "18": { name: "prod-app-service", type: "App service" },
  "19": { name: "staging-app-service", type: "App service" },
  "20": { name: "contoso-api-func", type: "Function app" },
}

// Resource group lookup — each RG knows its child resource ids so the insights
// panel can expand to show contained resources.
const RESOURCE_GROUP_LOOKUP: Record<
  string,
  { name: string; childIds: string[] }
> = {
  "rg-1": {
    name: "rg-production",
    childIds: ["1", "2", "11", "18", "20"],
  },
  "rg-2": {
    name: "rg-staging",
    childIds: ["3", "19"],
  },
  "rg-3": {
    name: "rg-development",
    childIds: ["4", "12", "16"],
  },
  "rg-4": {
    name: "rg-networking",
    childIds: ["6", "7", "8", "9", "10"],
  },
}

export interface InsightsMockData {
  selectedResourceIds: string[]
  selectedResources: SelectedResource[]
  timeSpanLabel: string

  alerts: {
    critical: number
    total: number
    rows: AlertRow[]
  }

  costs: {
    incurred: string // e.g. "$43 USD"
    incurredChange: string // e.g. "23% MoM"
    incurredTrend: "up" | "down"
    forecast: string // e.g. "$96 USD"
    forecastChange: string
    forecastTrend: "up" | "down"
    yAxisLabels: string[] // e.g. ["$100", "$75", "$50", "$25", "$0"]
    xAxisLabels: string[] // e.g. ["Jun 1", "Jun 5", ...]
  }

  serviceHealth: {
    activeIssues: number
    resolved24h: number
  }

  security: {
    score: number // 0-100
    label: string // "Fair" | "Good" | ...
  }

  resiliency: {
    zonalPercent: number
    nonZonalCount: number
    zonalCount: number
  }

  deployments: {
    succeeded24h: number
    failed24h: number
  }

  changeAnalysis: {
    creates: number
    deletes: number
    updates: number
  }
}

/** Build the insights dataset from a list of selected resource ids. */
export function buildInsightsData(selectedIds: string[]): InsightsMockData {
  const DEFAULT_IDS = ["9", "13", "15", "1"]
  const ids = selectedIds.length ? selectedIds : DEFAULT_IDS

  const selectedResources: SelectedResource[] = ids.map((id) => {
    const rg = RESOURCE_GROUP_LOOKUP[id]
    if (rg) {
      return {
        id,
        name: rg.name,
        type: "Resource group",
        children: rg.childIds.map((childId) => {
          const child = RESOURCE_LOOKUP[childId]
          return child
            ? { id: `${id}/${childId}`, ...child }
            : { id: `${id}/${childId}`, name: childId, type: "Resource" }
        }),
      }
    }
    const hit = RESOURCE_LOOKUP[id]
    return hit
      ? { id, ...hit }
      : { id, name: id, type: "Resource" }
  })

  return {
    selectedResourceIds: selectedIds,
    selectedResources,
    timeSpanLabel: "Last 24 hours",
    alerts: {
      critical: 2,
      total: 3,
      rows: [
        {
          severity: "Critical",
          title: "CPU > 95% for 15+ min",
          resource: "app-gateway-02",
          time: "4/28/2026, 1:14 PM",
          description: "The query condition crossed the dynamic threshold of 90% and reached 97.3% CPU utilization, sustained for more than 15 minutes.",
          monitorService: "Log Alerts V2",
          alertCondition: "Fired",
          dimensions: [
            { key: "DeployRing", value: "SDFV2" },
            { key: "EntityType", value: "ChtConversationMimir" },
            { key: "HttpStatusCode", value: "200" },
            { key: "Partner", value: "teams" },
            { key: "Route", value: "nuowo" },
            { key: "Scenario", value: "powerbar" },
          ],
          value: "97.3",
          threshold: "90.0",
          deviation: "7.3",
          query: "Perf | where ObjectName == 'Processor' and CounterName == '% Processor Time' | summarize avg(CounterValue) by Computer, bin(TimeGenerated, 5m)",
        },
        {
          severity: "Critical",
          title: "Failed connection",
          resource: "vm-prod-o1",
          time: "4/28/2026, 12:47 PM",
          description: "The connection failure rate crossed the static threshold of 5 failures/min and reached 23 failures/min.",
          monitorService: "Platform Metrics",
          alertCondition: "Fired",
          dimensions: [
            { key: "DeployRing", value: "SDFV2" },
            { key: "EntityType", value: "ChtConversationMimir" },
            { key: "HttpStatusCode", value: "200" },
            { key: "Partner", value: "teams" },
            { key: "Route", value: "nuowo" },
            { key: "Scenario", value: "powerbar" },
          ],
          value: "23",
          threshold: "5",
          deviation: "18",
          query: "AzureMetrics | where ResourceId contains 'vm-prod-o1' and MetricName == 'Network In Drops'",
        },
        {
          severity: "Warning",
          title: "Latency elevated",
          resource: "vm-prod-o1",
          time: "4/28/2026, 11:32 AM",
          description: "The query condition crossed the dynamic threshold of 2472.461 and reached 3286.5, for the following dimensions combination:",
          monitorService: "Log Alerts V2",
          alertCondition: "Fired",
          dimensions: [
            { key: "DeployRing", value: "SDFV2" },
            { key: "EntityType", value: "ChtConversationMimir" },
            { key: "HttpStatusCode", value: "200" },
            { key: "Partner", value: "teams" },
            { key: "Route", value: "nuowo" },
            { key: "Scenario", value: "powerbar" },
          ],
          value: "3286.5",
          threshold: "2472.461",
          deviation: "814.04",
          query: "requests | where name contains 'SearchMIMIR' | summarize avg(duration) by bin(timestamp, 5m)",
        },
      ],
    },
    costs: {
      incurred: "$43 USD",
      incurredChange: "23% MoM",
      incurredTrend: "up",
      forecast: "$96 USD",
      forecastChange: "23% MoM",
      forecastTrend: "up",
      yAxisLabels: ["$100", "$75", "$50", "$25", "$0"],
      xAxisLabels: ["Jun 1", "Jun 5", "Jun 10", "Jun 20", "Jun 25", "Jun 30"],
    },
    serviceHealth: {
      activeIssues: 0,
      resolved24h: 5,
    },
    security: {
      score: 68,
      label: "Fair",
    },
    resiliency: {
      zonalPercent: 50,
      nonZonalCount: 0,
      zonalCount: 4,
    },
    deployments: {
      succeeded24h: 4,
      failed24h: 0,
    },
    changeAnalysis: {
      creates: 3,
      deletes: 1,
      updates: 7,
    },
  }
}

/** Simple seeded pseudo-random — deterministic per timeSpan string so values
 * don't re-shuffle on re-render, only when the time span selection changes. */
function seededRandom(seed: string, index: number): number {
  let h = index * 2654435761
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 2246822519)
    h ^= h >>> 13
  }
  h = Math.imul(h ^ (h >>> 16), 2654435761)
  return ((h >>> 0) / 4294967295)
}

function rand(seed: string, idx: number, min: number, max: number): number {
  return Math.round(min + seededRandom(seed, idx) * (max - min))
}

/** Builds a randomised InsightsMockData for a given time span. Values are
 * seeded by the time span string so they're stable per selection. */
export function buildRandomizedInsightsData(
  selectedIds: string[],
  timeSpan: string
): InsightsMockData {
  const base = buildInsightsData(selectedIds)
  const s = timeSpan

  const critical = rand(s, 1, 0, 5)
  const total = critical + rand(s, 2, 0, 4)
  const alertRows: AlertRow[] = [
    { severity: "Critical", title: "CPU > 95% for 15+ min", resource: "app-gateway-02", time: "4/28/2026, 1:14 PM" },
    { severity: "Warning", title: "Latency elevated", resource: "vm-prod-01", time: "4/28/2026, 11:32 AM" },
    { severity: "Info", title: "Auto-scale triggered", resource: "prod-vmss-01", time: "4/28/2026, 9:05 AM" },
  ].slice(0, Math.max(1, rand(s, 3, 1, 3)))

  const incurredVal = rand(s, 4, 18, 120)
  const forecastVal = Math.round(incurredVal * (1 + seededRandom(s, 5) * 0.6 + 0.1))
  const incurredChangePct = rand(s, 6, 2, 45)
  const forecastChangePct = rand(s, 7, 2, 35)
  const incurredTrend: "up" | "down" = seededRandom(s, 8) > 0.4 ? "up" : "down"
  const forecastTrend: "up" | "down" = seededRandom(s, 9) > 0.4 ? "up" : "down"

  return {
    ...base,
    timeSpanLabel: timeSpan,
    alerts: {
      critical,
      total,
      rows: alertRows,
    },
    costs: {
      ...base.costs,
      incurred: `$${incurredVal} USD`,
      incurredChange: `${incurredChangePct}% MoM`,
      incurredTrend,
      forecast: `$${forecastVal} USD`,
      forecastChange: `${forecastChangePct}% MoM`,
      forecastTrend,
    },
    serviceHealth: {
      activeIssues: rand(s, 10, 0, 3),
      resolved24h: rand(s, 11, 0, 12),
    },
    security: {
      score: rand(s, 12, 40, 100),
      label: (() => {
        const v = rand(s, 12, 40, 100)
        if (v >= 80) return "Good"
        if (v >= 60) return "Fair"
        return "Poor"
      })(),
    },
    resiliency: {
      zonalPercent: rand(s, 13, 20, 100),
      nonZonalCount: rand(s, 14, 0, 4),
      zonalCount: rand(s, 15, 1, 8),
    },
    deployments: {
      succeeded24h: rand(s, 16, 0, 12),
      failed24h: rand(s, 17, 0, 3),
    },
    changeAnalysis: {
      creates: rand(s, 18, 0, 10),
      deletes: rand(s, 19, 0, 5),
      updates: rand(s, 20, 0, 15),
    },
  }
}
