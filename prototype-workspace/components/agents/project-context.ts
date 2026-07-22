// ============================================================================
// Project Context — Builds agent-consumable context from the project registry
// ============================================================================

import {
  projects,
  type Project,
  type Area,
  type PortalPillar,
  type Horizon,
  type ExperienceArea,
  type ProjectStatus,
  getTimeframe,
} from "../../data/projects";

export interface ProjectSummary {
  id: string;
  title: string;
  description: string;
  owner: string;
  team: string;
  status: ProjectStatus;
  area: Area;
  pillars: PortalPillar[];
  horizon: Horizon;
  timeframe: string;
  experienceArea?: ExperienceArea;
  route?: string;
  componentPath?: string;
  connectionCount: number;
  tags: string[];
}

export interface PrototypeRouteOption {
  id: string;
  label: string;
  route: string;
}

const PROTOTYPE_ROUTE_OVERRIDES: Record<string, PrototypeRouteOption[]> = {
  "create-cix": [
    {
      id: "network-configurations",
      label: "Network Configurations",
      route: "/create-cix/network-configurations",
    },
    {
      id: "nic-azure-home-page",
      label: "Networking: Network Interface Card (NIC)",
      route: "/create-cix/nic-azure-home-page",
    },
  ],
  "carbon-optimization": [
    {
      id: "as-is",
      label: "As-Is - Current ACO experience",
      route: "/carbon-optimization/as-is",
    },
    {
      id: "design-explorations",
      label: "Design explorations for EID to ACO parity",
      route: "/carbon-optimization/design-explorations",
    },
  ],
  emm: [
    {
      id: "entrypoints-dayn",
      label: "Workstreams 1-4: Updates, Entry points, Day N and vNext",
      route: "/emm/entrypoints-dayn",
    },
    {
      id: "prototype",
      label: "Workstream 4: vNext",
      route: "/emm/prototype",
    },
  ],
  "resource-manager-mvp": [
    {
      id: "prototype",
      label: "Prototype",
      route: "/resource-manager-mvp/prototype",
    },
    {
      id: "insights",
      label: "Prototype - Insights",
      route: "/resource-manager-mvp/prototype/insights",
    },
  ],
};

export function toProjectSummary(p: Project): ProjectSummary {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    owner: p.owner,
    team: p.team ?? "Unassigned",
    status: p.status,
    area: p.area,
    pillars: p.pillars,
    horizon: p.horizon,
    timeframe: getTimeframe(p.horizon),
    experienceArea: p.experienceArea,
    route: p.source.route,
    componentPath: p.componentPath,
    connectionCount: p.connections.length,
    tags: p.tags,
  };
}

export function getAllProjectSummaries(): ProjectSummary[] {
  return projects.map(toProjectSummary);
}

export function getPrototypeRouteOptions(projectId: string): PrototypeRouteOption[] {
  const override = PROTOTYPE_ROUTE_OVERRIDES[projectId];
  if (override?.length) {
    return override;
  }

  const project = projects.find((p) => p.id === projectId);
  if (!project?.source.route) {
    return [];
  }

  const baseRoute = project.source.route;
  return [
    {
      id: "base",
      label: "Project Prototype Page",
      route: baseRoute,
    },
  ];
}