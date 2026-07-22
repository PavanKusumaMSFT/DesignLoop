// ============================================================================
// Workspace Agents Registry
// ============================================================================
// Lists agents that run ON TOP of the project catalog — these help users
// discover, understand, and leverage projects in this workspace.
//
// This is NOT the same as projects with experienceArea: "agent" in
// data/projects.ts. Those are Azure Portal agent prototypes (product features).
// These are workspace-level assistants for the POC tool itself.
// ============================================================================

export interface WorkspaceAgent {
  /** Unique identifier (kebab-case) */
  id: string;
  /** Display name */
  title: string;
  /** What this agent does */
  description: string;
  /** Current status */
  status: "available" | "coming-soon";
  /** Route to the agent experience */
  route: string;
  /** Path to the component inside components/agents/ */
  componentPath: string;
  /** Capabilities this agent offers */
  capabilities: string[];
}

export const workspaceAgents: WorkspaceAgent[] = [
  {
    id: "project-navigator",
    title: "Project Navigator",
    description:
      "Workspace agent launcher for cross-project actions. Start a Security Audit by selecting a project, then run the audit against that project's prototype.",
    status: "available",
    route: "/agents",
    componentPath: "agents/index.tsx",
    capabilities: [
      "Launch Security Audit workflow",
      "Prompt for project selection via modal",
      "Target project prototype for audit",
      "Extensible launcher for future workspace agents",
    ],
  },
];
