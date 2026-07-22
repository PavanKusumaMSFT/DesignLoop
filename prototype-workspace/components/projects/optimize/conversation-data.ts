/** Hardcoded text, suggestions, reasoning steps, artifacts, and resource data for OptimizationAgent. */

// ---------------------------------------------------------------------------
// Type interfaces
// ---------------------------------------------------------------------------

export interface ReasoningStep {
  name: string;
  desc: string;
}

export interface Artifact {
  name: string;
  desc: string;
}

export interface DeploymentResource {
  name: string;
  type: string;
  status: string;
  monthlyCost: string;
  lastActivity: string;
}

// ---------------------------------------------------------------------------
// Conversation title
// ---------------------------------------------------------------------------

export const CONVERSATION_TITLE = "Apply rightsized requests with a 20% buffer";

// ---------------------------------------------------------------------------
// Text blocks
// ---------------------------------------------------------------------------

export const RECOMMENDATION_TEXT =
  "Awesome—let's get your containerized web app into production with a setup that's secure, observable, and easy to operate. Here's a starter bundle of services I recommend based on Microsoft Learn documentation as well as features, popularity, and other criteria.\n\nWould you like me to create a deployment plan for this workload? I'll also create a downloadable zip with everything wired for AKS + ACR.";

export const DEPLOYMENT_PLAN_TEXT =
  "Here's the deployment plan for your containerized app. If the plan looks good, I'll begin implementation—including setup, config, and rollout—and provide updates as I work.";

export const DEPLOYMENT_PROGRESS_TEXT =
  "I'm setting up your deployment now. I'll keep you updated on key progress or if I need your input. This process may take a few minutes, so feel free to step away and return later.";

export const DEPLOYMENT_COMPLETE_TEXT =
  "The deployment of your containerized web app is complete. You can view more details about all the created resources below. Some optional next steps include setting up monitoring and alerts, reviewing scaling rules, and scheduling an architecture walkthrough. Would you like me to create a health check report or an architecture diagram?";

// ---------------------------------------------------------------------------
// Suggestions
// ---------------------------------------------------------------------------

export const SUGGESTIONS = [
  "Create a AKS cluster to deploy and manage a scalable and secure web application for hosting a blog",
  "Restart my virtual machines in West US",
  "How can I optimize my monthly bill?",
] as const;

// ---------------------------------------------------------------------------
// User message text
// ---------------------------------------------------------------------------

export const USER_OPTIMIZATION_MESSAGE =
  "Run Recommendation 2: Optimize pod resource requests and enable the Cluster Autoscaler (CAS)";

// ---------------------------------------------------------------------------
// VM reasoning steps & artifacts
// ---------------------------------------------------------------------------

export const VM_REASONING_STEPS: ReasoningStep[] = [
  {
    name: "Reviewing VM utilization",
    desc: "Analyzing recent CPU and memory usage to understand when the VM is active versus idle.",
  },
  {
    name: "Identifying job execution patterns",
    desc: "Detecting when scheduled export jobs run and how long the VM is required to complete them.",
  },
  {
    name: "Evaluating optimization options",
    desc: "Assessing opportunities to reduce idle runtime by aligning VM start and stop behavior with job schedules.",
  },
];

export const VM_ARTIFACTS: Artifact[] = [
  {
    name: "optimization-report.md",
    desc: "VM utilization analysis and recommendations",
  },
];

// ---------------------------------------------------------------------------
// Pod optimization reasoning steps & artifacts
// ---------------------------------------------------------------------------

export const POD_REASONING_STEPS: ReasoningStep[] = [
  {
    name: "Reviewing pod resource usage",
    desc: "Identify over-provisioned pods by comparing requests to real usage.",
  },
  {
    name: "Setting pod resource limits",
    desc: "Adjust requests and limits to reduce wasted CPU and memory.",
  },
  {
    name: "Enabling cluster autoscaling",
    desc: "Automatically scale node count up or down based on demand.",
  },
];

export const POD_ARTIFACTS: Artifact[] = [
  {
    name: "optimization-report.md",
    desc: "VM utilization analysis and recommendations",
  },
];

// ---------------------------------------------------------------------------
// Deployment complete resources
// ---------------------------------------------------------------------------

export const DEPLOYMENT_RESOURCES: DeploymentResource[] = [
  {
    name: "my-first-app-01",
    type: "App Service",
    status: "Running",
    monthlyCost: "$2.15",
    lastActivity: "5 minutes ago",
  },
  {
    name: "my-first-app-02",
    type: "App Service",
    status: "Running",
    monthlyCost: "$1.30",
    lastActivity: "1 hour ago",
  },
  {
    name: "my-first-app-database",
    type: "Cosmos DB",
    status: "Running",
    monthlyCost: "$0.90",
    lastActivity: "2 hours ago",
  },
  {
    name: "my-first-app-monitor",
    type: "Azure Monitor",
    status: "Running",
    monthlyCost: "$2.15",
    lastActivity: "5 minutes ago",
  },
  {
    name: "my-first-app-vault",
    type: "Key Vault",
    status: "Running",
    monthlyCost: "$1.30",
    lastActivity: "1 hour ago",
  },
  {
    name: "my-first-app-secrets",
    type: "Secrets",
    status: "Running",
    monthlyCost: "$0.90",
    lastActivity: "2 hours ago",
  },
];
