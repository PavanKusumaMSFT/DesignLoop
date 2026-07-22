import type { SecurityAuditGuideline, SecurityAuditCitation } from "../../data/security-audit";

export interface SecurityAuditRunRequest {
  version: "1.0";
  runId: string;
  requestedAt: string;
  action: "security-audit";
  project: {
    id: string;
    title: string;
    baseRoute: string;
    prototypeRoutes: string[];
  };
  instructions: {
    modelPrompt: string;
    outputFormat: "json-array";
    renderFormat: "visual-cards-per-route";
    citationPolicy: "microsoft-learn-sfi-only";
  };
  guidelines: SecurityAuditGuideline[];
  citations: SecurityAuditCitation[];
}

export function createSecurityAuditRunId(projectId: string): string {
  const timestamp = Date.now();
  return `security-audit-${projectId}-${timestamp}`;
}

export function createSecurityAuditPrompt(): string {
  return [
    "Evaluate this UI design against principles from Microsoft's Secure Future Initiative.",
    "Only consider guidelines that are clearly relevant to the prototype screen in the workflow.",
    "Return results as a JSON array with fields:",
    "category, guideline, status ('In Use' or 'Unclear'), justification, citationlink, citationtitle.",
    "Audit each screen in scope and produce output that can be rendered in HTML as visual cards per route.",
    "Use only authoritative Microsoft Learn / SFI citation links.",
  ].join(" ");
}