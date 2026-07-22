// ============================================================================
// Central Project Registry — Single Source of Truth
// ============================================================================
// All project metadata lives here. This drives:
//   - The workspace view (cards, canvas, filtering)
//   - The ProjectsMenu sidebar navigation
//   - The connection map between projects
//   - Fork awareness for external teams
//
// To add a new project, either:
//   1. Use `pnpm create-project <id>` (generates files + adds entry here)
//   2. Manually add an entry to the `projects` array below
// ============================================================================

import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Type definitions
// ---------------------------------------------------------------------------

export type ProjectStatus =
  | "active"
  | "in-progress"
  | "coming-soon"
  | "archived";

/** Top-level team area */
export type Area = "growth" | "foundations";
/** Sub-area within an area */
export type SubArea = "onboarding" | "activation" | "wayfinding";
/** Specific category within a sub-area */
export type Category =
  | "signup"
  | "manage-monitor"
  | "search"
  | "discover"
  | "navigation"
  | "cost";
/** Portal journey pillar — projects can span multiple */
export type PortalPillar =
  | "growth"
  | "discover"
  | "build"
  | "manage"
  | "shell-intelligence";

export type Horizon = "build-2026" | "v1-ideal" | "vision";
/** Timeframe label for display (maps from Horizon) */
export type Timeframe = "short-term" | "mid-term" | "long-term";
export type SourceType = "local" | "fork";
export type ConnectionRelationship =
  | "feeds-into"
  | "variant-of"
  | "part-of"
  | "replaces";

/** Experience area — the portal experience this project belongs to */
export type ExperienceArea =
  | "signup"
  | "upgrade"
  | "catalog-all-services"
  | "onboarding-fre"
  | "manage"
  | "search-discover"
  | "startups"
  | "create"
  | "cost"
  | "agent"
  | "other";

/** Shell type — which header/chrome wraps this experience */
export type ShellType = "build-mvp" | "vision-topnav" | "none";

/** Purpose of the project */
export type ProjectPurpose =
  | "vision"
  | "user-test"
  | "poc"
  | "experiment"
  | "demo-walkthrough";

export interface ProjectSource {
  type: SourceType;
  /** Route path for local projects (e.g., "/search") */
  route?: string;
  /** GitHub repo identifier for forks (e.g., "azure-core/portal-poc-teamx") */
  repo?: string;
  /** Deployed URL for forks (e.g., "https://teamx-poc.azurestaticapps.net") */
  deployUrl?: string;
}

export interface ProjectConnection {
  /** Target project ID */
  to: string;
  /** How this project relates to the target */
  relationship: ConnectionRelationship;
}

export interface Project {
  /** Unique identifier (kebab-case, matches route segment) */
  id: string;
  /** Display title */
  title: string;
  /** Brief description of the project */
  description: string;
  /** Feature owner name */
  owner: string;
  /** Team name (e.g., "Growth & Foundations", "Cross-Team") */
  team?: string;
  /** Current project status */
  status: ProjectStatus;
  /** Team area: growth or foundations */
  area: Area;
  /** Sub-area within the team area */
  subArea: SubArea;
  /** Specific category (optional — cross-cutting projects may omit) */
  category?: Category;
  /** Portal experience area this project belongs to */
  experienceArea?: ExperienceArea;
  /** Portal journey pillars this project touches */
  pillars: PortalPillar[];
  /** Target timeframe */
  horizon: Horizon;
  /** Display-friendly timeframe label */
  timeframe?: Timeframe;
  /** Which shell/chrome wraps this experience */
  shell?: ShellType;
  /** Path to main component file (relative to components/) */
  componentPath?: string;
  /** Purpose of this project */
  purpose?: ProjectPurpose;
  /** Categorization tags */
  tags: string[];
  /** Where the project lives */
  source: ProjectSource;
  /** Relationships to other projects */
  connections: ProjectConnection[];
  /** Fluent UI icon name (e.g., "Search24Regular") */
  icon?: string;
  /** Last meaningful update (ISO date string) */
  updatedAt?: string;
  /** Whether this project appears in the sidebar as a featured project */
  featured?: boolean;
}

// ---------------------------------------------------------------------------
// Helpers — Horizon ↔ Timeframe mapping
// ---------------------------------------------------------------------------

const HORIZON_TO_TIMEFRAME: Record<Horizon, Timeframe> = {
  "build-2026": "short-term",
  "v1-ideal": "mid-term",
  vision: "long-term",
};

const HORIZON_TO_SHELL: Record<Horizon, ShellType> = {
  "build-2026": "build-mvp",
  "v1-ideal": "build-mvp",
  vision: "vision-topnav",
};

/** Get display-friendly timeframe label from horizon */
export function getTimeframe(horizon: Horizon): Timeframe {
  return HORIZON_TO_TIMEFRAME[horizon];
}

/** Get default shell type for a given horizon */
export function getDefaultShell(horizon: Horizon): ShellType {
  return HORIZON_TO_SHELL[horizon];
}

// ---------------------------------------------------------------------------
// Project data
// ---------------------------------------------------------------------------

const ALL_PROJECTS: Project[] = [
  // ==========================================================================
  // GROWTH — Onboarding
  // ==========================================================================
  {
    id: "signup",
    title: "Signup Simplification",
    description:
      "Streamlining new user activation — modal-based account creation, reduced onboarding friction, and AIF end-to-end integration for a seamless first-run experience.",
    owner: "Heather",
    team: "Growth & Foundations",
    status: "in-progress",
    area: "growth",
    subArea: "onboarding",
    category: "signup",
    experienceArea: "signup",
    pillars: ["discover"],
    horizon: "v1-ideal",
    timeframe: "short-term",
    shell: "build-mvp",
    tags: ["signup", "onboarding", "modal", "growth", "aif"],
    source: { type: "local", route: "/signup" },
    connections: [{ to: "portal-ia", relationship: "part-of" }],
    icon: "PersonAdd24Regular",
    featured: true,
  },

  // ==========================================================================
  // FOUNDATIONS — Wayfinding
  // ==========================================================================

  // ---- Cross-cutting (span multiple wayfinding categories) ----
  {
    id: "build-2026",
    title: "BUILD 2026",
    description:
      "Near-term portal experience targeting BUILD 2026 — new navigation, search, and manage patterns with Fluent UI.",
    owner: "Team",
    team: "Cross-Team",
    status: "active",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "other",
    pillars: ["discover", "build", "manage", "search"],
    horizon: "build-2026",
    timeframe: "short-term",
    shell: "build-mvp",
    componentPath: "build-2026/",
    tags: ["nav", "search", "manage", "build-2026", "flagship"],
    source: { type: "local", route: "/build-2026" },
    connections: [
      { to: "portal-ia", relationship: "part-of" },
      { to: "search", relationship: "feeds-into" },
    ],
    icon: "Rocket24Regular",
    featured: true,
  },
  {
    title: "Portal IA Sitemap",
    description:
      "Futuristic vision piece — interactive sitemap showing the holistic Azure Portal information architecture across Discover, Build, and Manage.",
    owner: "Ki",
    team: "Cross-Team",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "other",
    pillars: ["discover", "build", "manage"],
    horizon: "vision",
    timeframe: "long-term",
    shell: "vision-topnav",
    componentPath: "portal-ia/",
    tags: ["ia", "sitemap", "vision", "canvas", "end-to-end"],
    source: { type: "local", route: "/portal-ia" },
    connections: [{ to: "build-2026", relationship: "feeds-into" }],
    icon: "Globe24Regular",
  },
  {
    title: "VNext Agentic Experience",
    description:
      "Agent-driven portal experiences for new and returning users — Copilot immersive interface with conversational navigation and task completion.",
    owner: "Heather",
    team: "Cross-Team",
    status: "active",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "other",
    pillars: ["build", "manage"],
    horizon: "vision",
    timeframe: "long-term",
    shell: "vision-topnav",
    tags: ["agent", "copilot", "ai", "vnext", "immersive"],
    source: { type: "local", route: "/vnext-agent" },
    connections: [
      { to: "portal-ia-vnext-agent", relationship: "feeds-into" },
      { to: "portal-ia", relationship: "part-of" },
    ],
    icon: "Bot24Regular",
  },
  {
    title: "Portal IA + Agent",
    description:
      "Hybrid exploration combining the Portal IA sitemap vision with agent-driven capabilities — AI-powered navigation within the information architecture.",
    owner: "Michelle",
    team: "Cross-Team",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "onboarding-fre",
    pillars: ["discover", "build", "manage"],
    horizon: "vision",
    timeframe: "long-term",
    shell: "vision-topnav",
    tags: ["ia", "agent", "copilot", "vision", "hybrid"],
    source: { type: "local", route: "/portal-ia-vnext-agent" },
    connections: [
      { to: "portal-ia", relationship: "variant-of" },
      { to: "vnext-agent", relationship: "variant-of" },
    ],
    icon: "BrainCircuit24Regular",
  },

  // ---- Search ----
  {
    id: "search",
    title: "Copilot + Search",
    description:
      "Search experience explorations from P0 through Vision — full-page results, suggestion panels, and Copilot integration for user testing.",
    owner: "Steph",
    team: "Growth & Foundations",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    category: "search",
    experienceArea: "search-discover",
    pillars: ["search"],
    horizon: "v1-ideal",
    timeframe: "short-term",
    shell: "build-mvp",
    tags: ["search", "copilot", "usertest", "p0", "p1"],
    source: { type: "local", route: "/search" },
    connections: [
      { to: "build-2026", relationship: "feeds-into" },
      { to: "portal-ia", relationship: "part-of" },
    ],
    icon: "Search24Regular",
  },

  // ---- Discover ----
  {
    id: "templates",
    title: "Templates V2",
    description:
      "Next-generation template system — guided deployment flows, template detail pages, and post-Ignite template catalog explorations.",
    owner: "Kyle",
    team: "Growth & Foundations",
    status: "active",
    area: "foundations",
    subArea: "wayfinding",
    category: "discover",
    experienceArea: "create",
    pillars: ["build"],
    horizon: "build-2026",
    timeframe: "mid-term",
    shell: "build-mvp",
    tags: ["templates", "deploy", "catalog", "guided"],
    source: { type: "local", route: "/templates" },
    connections: [{ to: "build-2026", relationship: "feeds-into" }],
    icon: "DocumentCopy24Regular",
  },
  {
    id: "all-services",
    title: "All Services Experiments",
    description:
      "Azure services catalog experiments — browsing, filtering, and layout patterns for service discovery.",
    owner: "Jeff",
    team: "Growth & Foundations",
    status: "active",
    area: "foundations",
    subArea: "wayfinding",
    category: "discover",
    experienceArea: "catalog-all-services",
    pillars: ["discover"],
    horizon: "build-2026",
    timeframe: "short-term",
    shell: "build-mvp",
    tags: ["services", "catalog", "discover", "browse"],
    source: { type: "local", route: "/all-services" },
    connections: [{ to: "build-2026", relationship: "part-of" }],
    icon: "Grid24Regular",
  },

  // ---- Manage & Monitor ----
  {
    id: "fre-experiments",
    title: "FRE Experiments",
    description:
      "First-run experience experiments — testing activation patterns for new users.",
    owner: "Heather, Reed",
    team: "Growth & Foundations",
    status: "active",
    area: "growth",
    subArea: "activation",
    experienceArea: "onboarding-fre",
    pillars: ["discover"],
    horizon: "v1-ideal",
    timeframe: "mid-term",
    shell: "build-mvp",
    tags: ["fre", "activation", "experiment", "growth"],
    source: { type: "local", route: "/fre-experiments" },
    connections: [],
  },

  // ==========================================================================
  {
    id: "left-nav-experiments",
    title: "Left Navigation Experiments",
    description:
      "Left navigation design experiments — testing wayfinding patterns and structure.",
    owner: "Jeff",
    team: "Growth & Foundations",
    status: "active",
    area: "foundations",
    subArea: "wayfinding",
    category: "navigation",
    experienceArea: "other",
    pillars: ["discover", "build", "manage"],
    horizon: "build-2026",
    timeframe: "short-term",
    shell: "build-mvp",
    tags: ["navigation", "left-nav", "wayfinding", "experiment"],
    source: { type: "local", route: "/left-nav-experiments" },
    connections: [],
  },
  {
    id: "search-p0",
    title: "Search P0 Experiments",
    description:
      "Search P0 experiments — short-term search improvements and pattern testing.",
    owner: "Steph",
    team: "Growth & Foundations",
    status: "active",
    area: "foundations",
    subArea: "wayfinding",
    category: "search",
    experienceArea: "search-discover",
    pillars: ["search"],
    horizon: "build-2026",
    timeframe: "short-term",
    shell: "build-mvp",
    tags: ["search", "p0", "experiment"],
    source: { type: "local", route: "/search" },
    connections: [{ to: "search", relationship: "part-of" }],
  },

  // ==========================================================================
  // MID-TERM Projects
  // ==========================================================================
  {
    id: "bring-your-app",
    title: "Bring Your App",
    description:
      "Cloud native onboarding — import from GitHub, AI-recommended architecture, deploy to Container Apps with full workspace setup.",
    owner: "Ivelisse",
    team: "Cloud Natives Experiences",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "create",
    pillars: ["build"],
    horizon: "v1-ideal",
    timeframe: "mid-term",
    shell: "build-mvp",
    tags: ["deploy", "github", "container-apps", "onboarding"],
    source: { type: "local", route: "/bring-your-app" },
    connections: [],
  },
  {
    id: "optimization-agent-mid",
    title: "Optimization Agent",
    description:
      "AKS cost optimization copilot agent — rightsizing recommendations, VPA, reserved instances with apply-from-chat.",
    owner: "EmilyD",
    team: "Cross-Team",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "agent",
    pillars: ["manage"],
    horizon: "v1-ideal",
    timeframe: "mid-term",
    shell: "build-mvp",
    tags: ["optimization", "aks", "copilot", "agent", "cost"],
    source: { type: "local", route: "/optimization-agent" },
    connections: [],
  },
  {
    id: "create-vmss",
    title: "Create VMSS",
    description:
      "VM Scale Set creation flow — proactive scaling when traffic outpaces current capacity, Copilot pre-configures from existing context.",
    owner: "Aimee, Julia, Favour",
    team: "CIX",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "create",
    pillars: ["build"],
    horizon: "v1-ideal",
    timeframe: "mid-term",
    shell: "build-mvp",
    tags: ["vm", "vmss", "scale", "create"],
    source: { type: "local", route: "/create-vmss" },
    connections: [],
  },
  {
    id: "zava-e2e-journey",
    title: "Zava E2E Journey",
    description:
      "End-to-end Zava athletic wear scenario — FRE through manage, stitching multiple team workstreams into one cohesive demo narrative.",
    owner: "Julia, Ivelisse, Reed",
    team: "Cross-Team",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "other",
    pillars: ["discover", "build", "manage"],
    horizon: "v1-ideal",
    timeframe: "mid-term",
    shell: "build-mvp",
    tags: ["zava", "e2e", "demo", "journey", "cross-team"],
    source: { type: "local", route: "/zava-e2e" },
    connections: [],
    featured: true,
  },
  {
    id: "embr-to-portal",
    title: "Embr → Portal",
    description: "Connecting Azure service to Embr platform",
    owner: "Steph, Ki",
    team: "Growth & Foundations",
    status: "on-hold",
    area: "growth",
    subArea: "wayfinding",
    experienceArea: "startups",
    pillars: ["discover", "build", "growth"],
    horizon: "v1-ideal",
    timeframe: "mid-term",
    shell: "build-mvp",
    purpose: "demo-walkthrough",
    componentPath: "projects/embr-to-portal/index.tsx",
    tags: ["Explorations", "Zero Cloud"],
    source: { type: "local", route: "/embr-to-portal" },
    connections: [{ to: "build-2026", relationship: "feeds-into" }],
    icon: "PlugConnected24Regular",
    updatedAt: "2026-04-07",
  },
  {
    id: "resource-manager-mvp",
    title: "Resource Manager MVP",
    description: "Get insights button flow for Resource Manager",
    owner: "Reed, Yonder",
    team: "Growth & Foundations",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "manage",
    pillars: ["manage"],
    horizon: "build-2026",
    timeframe: "near-term",
    shell: "build-mvp",
    purpose: "prototype",
    componentPath: "projects/resource-manager-mvp/index.tsx",
    tags: ["MVP", "resource manager"],
    source: { type: "local", route: "/resource-manager-mvp" },
    connections: [],
    icon: "Sparkle24Regular",
    updatedAt: "2026-04-28",
  },
  {
    id: "heather-test-signup",
    title: "Heather Test Signup",
    description: "Heather test signup page.",
    team: "Growth",
    owner: "Heather",
    status: "in-progress",
    experience: "manage",
    horizon: "build-2026",
    timeframe: "near-term",
    shell: "build-mvp",
    purpose: "prototype",
    componentPath: "projects/heather-test-signup/index.tsx",
    pillar: ["discover"],
    tags: ["Cost", "Charts"],
    source: { type: "local", route: "/heather-test-signup" },
    connections: [],
    icon: "Money24Regular",
    updatedAt: "2026-04-13",
  },
  {
    id: "carbon-optimization",
    title: "Azure Carbon Optimization",
    description:
      "Prototype to explore Azure Carbon Optimization extension UX updates",
    owner: "Suky Kang",
    team: "Other",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    category: "cost",
    experienceArea: "manage",
    pillars: ["manage"],
    horizon: "build-2026",
    timeframe: "short-term",
    shell: "build-mvp",
    componentPath: "projects/carbon-optimization/index.tsx",
    purpose: "demo-walkthrough",
    tags: ["Carbon", "Carbon emissions", "Sustainability", "Optimization"],
    source: { type: "local", route: "/carbon-optimization" },
    connections: [],
    icon: "LeafTwo24Regular",
    updatedAt: "2026-04-21",
  },
  {
    id: "engops-agent",
    title: "Engops Agent",
    description:
      "Build scoped agent to provide prioritized recommendations related to service retirements and resiliency posture for critical workloads.",
    owner: "JC Zabel",
    team: "Cross-Team",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "agent",
    pillars: ["discover"],
    horizon: "build-2026",
    timeframe: "short-term",
    shell: "build-mvp",
    componentPath: "projects/engops-agent/index.tsx",
    tags: ["Advisor", "Agent", "Build"],
    source: { type: "local", route: "/engops-agent" },
    connections: [],
    icon: "Sparkle24Regular",
  },
  {
    id: "kaila-testenvironment",
    title: "Kaila Testenvironment",
    description:
      "Environment for CIX experiments and testing new experiences",
    owner: "Kaila Snyder",
    team: "Other",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "agent",
    pillars: ["manage", "shell-intelligence", "discover", "build"],
    horizon: "v1-ideal",
    timeframe: "mid-term",
    shell: "build-mvp",
    componentPath: "projects/kaila-testenvironment/index.tsx",
    tags: ["kaila", "testenvironment"],
    source: { type: "local", route: "/kaila-testenvironment" },
    connections: [],
    icon: "Sparkle24Regular",
  },
  {
    id: "troubleshoot-agent",
    title: "Troubleshoot Agent",
    description:
      "Troubleshoot Agent copilot experience",
    owner: "Abe",
    team: "CIX",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "agent",
    pillars: ["discover"],
    horizon: "vision",
    timeframe: "vision",
    shell: "vision-topnav",
    componentPath: "projects/troubleshoot-agent/index.tsx",
    tags: ["troubleshoot", "agent", "copilot"],
    source: { type: "local", route: "/troubleshoot-agent" },
    connections: [],
    icon: "Sparkle24Regular",
  },
  {
    id: "emm",
    title: "EMM",
    description:
      "Essential Machine Management\nfor Virtual machines and Arc machines",
    owner: "Abe",
    team: "CIX",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "manage",
    pillars: ["discover"],
    horizon: "vision",
    timeframe: "vision",
    shell: "vision-topnav",
    componentPath: "projects/emm/index.tsx",
    tags: ["Essential Machine Management", "EMM"],
    source: { type: "local", route: "/emm" },
    connections: [],
    icon: "Sparkle24Regular",
  },
  {
    id: "project-navigator",
    title: "Project Navigator Agent",
    description:
      "Cross-project assistant agent that helps users discover, explore, and navigate across all projects in the workspace catalog.",
    owner: "Team",
    team: "Cross-Team",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "agent",
    pillars: ["discover", "shell-intelligence"],
    horizon: "build-2026",
    timeframe: "short-term",
    shell: "build-mvp",
    componentPath: "agents/index.tsx",
    tags: ["agent", "navigator", "projects", "discovery", "workspace"],
    source: { type: "local", route: "/agents" },
    connections: [],
    icon: "Sparkle24Regular",
    featured: true,
  },
  {
    id: "create-cix",
    title: "Create",
    description:
      "Create explorations for Compute, Storage, AKS and Networking",
    owner: "Abe",
    team: "CIX",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "create",
    pillars: ["discover"],
    horizon: "vision",
    timeframe: "vision",
    shell: "vision-topnav",
    componentPath: "projects/create-cix/index.tsx",
    tags: ["create", "networking", "netconfigs"],
    source: { type: "local", route: "/create-cix" },
    connections: [],
    icon: "Sparkle24Regular",
  },
  {
    id: "intent-based-discover",
    title: "Intent Based Discover",
    description:
      "Service discovery based on user goals.",
    owner: "Jeff",
    team: "Growth & Foundations",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "search-discover",
    pillars: ["discover"],
    horizon: "v1-ideal",
    timeframe: "mid-term",
    shell: "build-mvp",
    componentPath: "projects/intent-based-discover/index.tsx",
    tags: ["intent", "based", "discover"],
    source: { type: "local", route: "/intent-based-discover" },
    connections: [],
    icon: "Sparkle24Regular",
  },
  {
    id: "cix-roadmaps",
    title: "CIX Roadmaps",
    description:
      "Integrated roadmap workspace for CIX planning, timeline review, and inline editing across Storage, Compute, AKS, and Horizontal workstreams.",
    owner: "Kaila Snyder",
    team: "Other",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "other",
    pillars: ["manage", "discover", "build"],
    horizon: "v1-ideal",
    timeframe: "mid-term",
    shell: "build-mvp",
    componentPath: "projects/cix-roadmaps/index.tsx",
    tags: ["cix", "roadmaps", "planning", "timeline"],
    source: { type: "local", route: "/cix-roadmaps" },
    connections: [{ to: "kaila-testenvironment", relationship: "part-of" }],
    icon: "Board24Regular",
  },
  {
    id: "demo-task",
    title: "Demo Task",
    description:
      "Generated demo task prototype for build verification.",
    owner: "DesignLoop",
    team: "DesignLoop",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    experienceArea: "other",
    pillars: ["discover", "build"],
    horizon: "build-2026",
    timeframe: "short-term",
    shell: "build-mvp",
    componentPath: "projects/demo-task/index.tsx",
    purpose: "poc",
    tags: ["task-prototype", "demo-task"],
    source: { type: "local", route: "/demo-task" },
    connections: [],
    icon: "Sparkle24Regular",
    featured: true,
  },
  {
    id: "azure-home-page",
    title: "Azure Home Page",
    description:
      "Azure portal home page with clickable quick-action and service links",
    owner: "Designer Agent",
    team: "FRE",
    status: "in-progress",
    area: "foundations",
    subArea: "wayfinding",
    category: "navigation",
    experienceArea: "onboarding-fre",
    pillars: ["discover"],
    horizon: "build-2026",
    timeframe: "short-term",
    shell: "build-mvp",
    componentPath: "projects/azure-home-page/index.tsx",
    tags: ["homepage", "navigation", "links"],
    source: { type: "local", route: "/azure-home-page" },
    connections: [],
    icon: "Sparkle24Regular",
  },
];

/**
 * Prototypes created in THIS DesignLoop repo. For now the workspace lists only
 * these — the inherited Azure Portal PoC samples are intentionally excluded.
 * Add a project/task id here as new prototypes are generated in the repo, or
 * clear the filter below (return ALL_PROJECTS) to restore every prototype.
 */
export const REPO_PROTOTYPE_IDS = new Set<string>([
  "azure-home-page",
]);

/**
 * The prototypes surfaced across the workspace (home grid, menu, connection
 * map, task-prototypes page). Filtered to repo-created prototypes only.
 */
export const projects: Project[] = ALL_PROJECTS.filter((p) =>
  REPO_PROTOTYPE_IDS.has(p.id),
);

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/** Get a project by its ID */
export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

/** Get all projects in a team area */
export function getProjectsByArea(area: Area): Project[] {
  return projects.filter((p) => p.area === area);
}

/** Get all projects in a specific category */
export function getProjectsByCategory(category: Category): Project[] {
  return projects.filter((p) => p.category === category);
}

/** Get all projects touching a portal pillar */
export function getProjectsByPillar(pillar: PortalPillar): Project[] {
  return projects.filter((p) => p.pillars.includes(pillar));
}

/** Get all projects owned by a specific person */
export function getProjectsByOwner(owner: string): Project[] {
  return projects.filter((p) => p.owner === owner);
}

/** Get all projects targeting a specific horizon */
export function getProjectsByHorizon(horizon: Horizon): Project[] {
  return projects.filter((p) => p.horizon === horizon);
}

/** Get all projects with a specific status */
export function getProjectsByStatus(status: ProjectStatus): Project[] {
  return projects.filter((p) => p.status === status);
}

/** Get all projects matching any of the given tags */
export function getProjectsByTags(tags: string[]): Project[] {
  return projects.filter((p) => p.tags.some((t) => tags.includes(t)));
}

/** Get unique owners across all projects */
export function getAllOwners(): string[] {
  return [...new Set(projects.map((p) => p.owner))];
}

/** Get unique tags across all projects */
export function getAllTags(): string[] {
  return [...new Set(projects.flatMap((p) => p.tags))].sort();
}

/** Get unique categories across all projects (excludes undefined) */
export function getAllCategories(): Category[] {
  return [
    ...new Set(
      projects.map((p) => p.category).filter((c): c is Category => !!c),
    ),
  ];
}

/**
 * Get projects formatted for the ProjectsMenu sidebar.
 * Returns the subset of projects that should appear in navigation,
 * in display order, with the shape expected by ProjectsMenu.
 */
export function getMenuProjects(): {
  id: string;
  title: string;
  route: string;
  status?: string;
}[] {
  // Define display order for menu
  const menuOrder = [
    "build-2026",
    "portal-ia",
    "search",
    "signup",
    "templates",
    "vnext-agent",
  ];

  const statusMap: Record<ProjectStatus, string | undefined> = {
    active: undefined,
    "in-progress": "In progress",
    "coming-soon": "Coming Soon",
    archived: "Archived",
  };

  return menuOrder
    .map((id) => {
      const project = getProjectById(id);
      if (!project) return null;
      return {
        id: project.id,
        title: project.title,
        route: project.source.route?.replace(/^\//, "") ?? "",
        status: statusMap[project.status],
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);
}

/** Returns projects marked as featured for the sidebar nav. */
export function getFeaturedProjects(): {
  id: string;
  title: string;
  route: string;
}[] {
  return projects
    .filter((p) => p.featured)
    .map((project) => ({
      id: project.id,
      title: project.title,
      route: project.source.route?.replace(/^\//, "") ?? "",
    }));
}
