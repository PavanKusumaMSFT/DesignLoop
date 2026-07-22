/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import React, { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Dropdown,
  Option,
  Badge,
} from "@fluentui/react-components";
import {
  ShieldTask24Regular,
  ArrowRight16Regular,
  Play16Regular,
  Open16Regular,
} from "@fluentui/react-icons";
import {
  getAllProjectSummaries,
  getPrototypeRouteOptions,
  type ProjectSummary,
} from "./project-context";
import {
  SECURITY_AUDIT_CITATIONS,
  SECURITY_AUDIT_GUIDELINES,
} from "../../data/security-audit";
import {
  createSecurityAuditPrompt,
  createSecurityAuditRunId,
  type SecurityAuditRunRequest,
} from "../../lib/agents/security-audit-contract";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalXL,
    paddingRight: tokens.spacingHorizontalXL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  headerIcon: {
    color: "#0078D4",
    display: "flex",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  headerSubtitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    paddingTop: tokens.spacingVerticalXL,
    paddingBottom: tokens.spacingVerticalXL,
    paddingLeft: tokens.spacingHorizontalXXL,
    paddingRight: tokens.spacingHorizontalXXL,
  },
  agentCard: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "720px",
    cursor: "pointer",
    transitionProperty: "box-shadow, transform",
    transitionDuration: tokens.durationNormal,
    ":hover": {
      boxShadow: tokens.shadow8,
      transform: "translateY(-2px)",
    },
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  cardTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  cardDescription: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
  sectionLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground2,
  },
  statusRow: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  launchButton: {
    alignSelf: "flex-start",
    marginTop: tokens.spacingVerticalM,
  },
  resultBanner: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    width: "fit-content",
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  resultIcon: {
    color: "#0078D4",
  },
  resultText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  reportLink: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    fontWeight: tokens.fontWeightSemibold,
    marginLeft: tokens.spacingHorizontalS,
    ":hover": {
      textDecoration: "underline",
    },
  },
  modalField: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    marginTop: tokens.spacingVerticalM,
  },
});

export default function AgentsHome() {
  const styles = useStyles();
  const allProjects = getAllProjectSummaries();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<"security-audit" | "content-review" | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [bridgeStatus, setBridgeStatus] = useState<string>("");
  const [runStartedFor, setRunStartedFor] = useState<{
    action: "security-audit" | "content-review";
    project: ProjectSummary;
    routes: string[];
    runId?: string;
    reportPath?: string;
  } | null>(null);

  const selectableProjects = allProjects.filter((p) => Boolean(p.route));

  const actionMeta = {
    "security-audit": {
      title: "Security Audit",
      modalTitle: "Select Project for Security Audit",
      modalDescription: "Select a project to run the security audit on its prototype.",
      launchButton: "Launch Security Audit",
      startButton: "Start Audit",
      capabilityBadge: "Project Prototype Audit",
      resultText: "Security audit started",
    },
    "content-review": {
      title: "Content Review",
      modalTitle: "Select Project for Content Review",
      modalDescription: "Select a project to run content review against its prototype.",
      launchButton: "Launch Content Review",
      startButton: "Start Review",
      capabilityBadge: "Project Prototype Content",
      resultText: "Content review started",
    },
  } as const;

  const handleLaunchAction = (action: "security-audit" | "content-review") => {
    setActiveAction(action);
    setSelectedProjectId("");
    setSelectedRoute("");
    setBridgeStatus("");
    setIsModalOpen(true);
  };

  const selectedProject = selectableProjects.find((p) => p.id === selectedProjectId);
  const routeOptions = selectedProjectId ? getPrototypeRouteOptions(selectedProjectId) : [];
  const ALL_ROUTES_VALUE = "__ALL_PROTOTYPE_ROUTES__";
  const allowFallbackAudit =
    process.env.NEXT_PUBLIC_ALLOW_SECURITY_AUDIT_FALLBACK === "true";

  const escapeHtml = (value: string): string =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const toPlainText = (value: string): string =>
    value
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

  const pickCitationForCategory = (category: string) => {
    const lowerCategory = category.toLowerCase();

    if (lowerCategory.includes("identity")) {
      return (
        SECURITY_AUDIT_CITATIONS.find((citation) =>
          citation.citationtitle.toLowerCase().includes("identity")
        ) ?? SECURITY_AUDIT_CITATIONS[0]
      );
    }

    if (lowerCategory.includes("data")) {
      return (
        SECURITY_AUDIT_CITATIONS.find((citation) =>
          citation.citationtitle.toLowerCase().includes("threat")
        ) ?? SECURITY_AUDIT_CITATIONS[0]
      );
    }

    if (lowerCategory.includes("default")) {
      return (
        SECURITY_AUDIT_CITATIONS.find((citation) =>
          citation.citationtitle.toLowerCase().includes("zero trust")
        ) ?? SECURITY_AUDIT_CITATIONS[0]
      );
    }

    if (lowerCategory.includes("communication")) {
      return (
        SECURITY_AUDIT_CITATIONS.find((citation) =>
          citation.citationtitle.toLowerCase().includes("response")
        ) ?? SECURITY_AUDIT_CITATIONS[0]
      );
    }

    return SECURITY_AUDIT_CITATIONS[0];
  };

  const evaluateGuidelineAgainstRoute = (
    guideline: (typeof SECURITY_AUDIT_GUIDELINES)[number],
    route: string,
    routeText: string,
    routeFetchOk: boolean
  ) => {
    const guidelineLower = guideline.guideline.toLowerCase();

    const keywordSignals = [
      "auth",
      "signin",
      "signup",
      "identity",
      "access",
      "role",
      "permission",
      "secure",
      "security",
      "default",
      "log",
      "activity",
      "audit",
      "onboarding",
      "warning",
      "error",
      "recover",
      "verify",
    ];

    const guidelineWords = guidelineLower
      .split(/[^a-z0-9]+/g)
      .filter((word) => word.length >= 4);

    const matchedWords = guidelineWords.filter((word) => routeText.includes(word));
    const hasKeywordSignal = keywordSignals.some((signal) => routeText.includes(signal));
    const hasStrongMatch = matchedWords.length >= 2 || (matchedWords.length >= 1 && hasKeywordSignal);

    const citation = pickCitationForCategory(guideline.category);

    if (!routeFetchOk) {
      return {
        category: guideline.category,
        guideline: guideline.guideline,
        status: "Unclear" as const,
        justification:
          `Could not load route ${route} for deterministic checks. ` +
          "Run the local bridge for full validation and artifact output.",
        citationlink: citation.citationlink,
        citationtitle: citation.citationtitle,
      };
    }

    if (hasStrongMatch) {
      return {
        category: guideline.category,
        guideline: guideline.guideline,
        status: "In Use" as const,
        justification:
          `Route ${route} includes signals related to this guideline ` +
          `(matched: ${matchedWords.slice(0, 3).join(", ") || "contextual security terms"}).`,
        citationlink: citation.citationlink,
        citationtitle: citation.citationtitle,
      };
    }

    return {
      category: guideline.category,
      guideline: guideline.guideline,
      status: "Unclear" as const,
      justification:
        `Route ${route} did not provide enough deterministic evidence for this guideline. ` +
        "Keep as Unclear until explicit security behavior is observed.",
      citationlink: citation.citationlink,
      citationtitle: citation.citationtitle,
    };
  };

  const buildFallbackAuditReport = async (
    project: ProjectSummary,
    prototypeRoutes: string[],
    runId: string
  ): Promise<string> => {
    const routeResults = await Promise.all(
      prototypeRoutes.map(async (route) => {
        try {
          const response = await fetch(route, {
            method: "GET",
            headers: { Accept: "text/html" },
          });

          if (!response.ok) {
            return { route, routeText: "", routeFetchOk: false };
          }

          const html = await response.text();
          return { route, routeText: toPlainText(html), routeFetchOk: true };
        } catch {
          return { route, routeText: "", routeFetchOk: false };
        }
      })
    );

    const findingsByRoute = routeResults.map((routeResult) => ({
      route: routeResult.route,
      findings: SECURITY_AUDIT_GUIDELINES.map((guideline) =>
        evaluateGuidelineAgainstRoute(
          guideline,
          routeResult.route,
          routeResult.routeText,
          routeResult.routeFetchOk
        )
      ),
    }));

    const findingsCount = findingsByRoute.reduce(
      (total, routeGroup) => total + routeGroup.findings.length,
      0
    );

    const sectionsHtml = findingsByRoute
      .map((routeGroup) => {
        const cards = routeGroup.findings
          .map(
            (finding) => `
              <article class="card">
                <div class="row">
                  <span class="category">${escapeHtml(finding.category)}</span>
                  <span class="badge ${finding.status === "In Use" ? "ok" : "warn"}">${escapeHtml(
                    finding.status
                  )}</span>
                </div>
                <h3>${escapeHtml(finding.guideline)}</h3>
                <p>${escapeHtml(finding.justification)}</p>
                <a href="${escapeHtml(finding.citationlink)}" target="_blank" rel="noreferrer">${escapeHtml(
                  finding.citationtitle
                )}</a>
              </article>
            `
          )
          .join("\n");

        return `
          <section class="route-section">
            <h2>${escapeHtml(routeGroup.route)}</h2>
            <div class="grid">
              ${cards}
            </div>
          </section>
        `;
      })
      .join("\n");

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Security Audit Report - ${escapeHtml(project.title)}</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f4f7fb;
        --surface: #ffffff;
        --text: #20262d;
        --muted: #5d6b79;
        --line: #d3dce6;
        --brand: #005fb8;
        --ok: #0f7b0f;
        --warn: #9c5b00;
      }
      body {
        margin: 0;
        font-family: "Segoe UI", "Helvetica Neue", sans-serif;
        background: radial-gradient(circle at 0% 0%, #e9f3ff, var(--bg) 45%);
        color: var(--text);
      }
      main {
        max-width: 1100px;
        margin: 0 auto;
        padding: 32px 20px 56px;
      }
      h1 {
        margin: 0 0 6px;
        font-size: 28px;
      }
      .meta {
        color: var(--muted);
        margin-bottom: 22px;
      }
      .route-section {
        margin-top: 22px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 12px;
      }
      .card {
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 12px;
        padding: 14px;
      }
      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
      }
      .category {
        font-size: 12px;
        color: var(--muted);
      }
      .badge {
        font-size: 11px;
        padding: 2px 8px;
        border-radius: 99px;
        border: 1px solid transparent;
      }
      .badge.ok {
        color: var(--ok);
        border-color: #a7d9a7;
        background: #eef9ee;
      }
      .badge.warn {
        color: var(--warn);
        border-color: #f3d6ac;
        background: #fff7ea;
      }
      h3 {
        font-size: 15px;
        margin: 10px 0 8px;
      }
      p {
        margin: 0 0 10px;
        font-size: 13px;
        color: #384554;
      }
      a {
        color: var(--brand);
        text-decoration: none;
        font-size: 13px;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Security Audit Report</h1>
      <div class="meta">
        Project: ${escapeHtml(project.title)} | Run: ${escapeHtml(runId)} | Findings: ${findingsCount} | Mode: client-deterministic-fallback
      </div>
      ${sectionsHtml}
    </main>
  </body>
</html>`;
  };

  const queueSecurityAuditRun = async (
    project: ProjectSummary,
    prototypeRoutes: string[]
  ) => {
    const runId = createSecurityAuditRunId(project.id);
    const payload: SecurityAuditRunRequest = {
      version: "1.0",
      runId,
      requestedAt: new Date().toISOString(),
      action: "security-audit",
      project: {
        id: project.id,
        title: project.title,
        baseRoute: project.route ?? `/${project.id}`,
        prototypeRoutes,
      },
      instructions: {
        modelPrompt: createSecurityAuditPrompt(),
        outputFormat: "json-array",
        renderFormat: "visual-cards-per-route",
        citationPolicy: "microsoft-learn-sfi-only",
      },
      guidelines: SECURITY_AUDIT_GUIDELINES,
      citations: SECURITY_AUDIT_CITATIONS,
    };

    const bridgeUrl =
      process.env.NEXT_PUBLIC_SECURITY_AUDIT_BRIDGE_URL ??
      "http://127.0.0.1:4317";

    try {
      const response = await fetch(`${bridgeUrl}/security-audit/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Bridge returned ${response.status}`);
      }

      const result = await response.json();

      setBridgeStatus(`Bridge accepted run ${runId}.`);
      return {
        runId,
        reportPath:
          typeof result?.reportRelativePath === "string"
            ? result.reportRelativePath
            : undefined,
      };
    } catch (error) {
      if (!allowFallbackAudit) {
        setBridgeStatus(
          "Bridge unavailable at http://127.0.0.1:4317. Real audit did not run. Start bridge from azure-portal-poc with: pnpm security-audit:bridge"
        );
        return { runId };
      }

      const htmlReport = await buildFallbackAuditReport(project, prototypeRoutes, runId);
      const reportBlob = new Blob([htmlReport], { type: "text/html" });
      const reportPath = URL.createObjectURL(reportBlob);

      setBridgeStatus(
        "Bridge unavailable at http://127.0.0.1:4317. Local fallback report generated (not bridge-backed)."
      );
      return { runId, reportPath };
    }
  };

  const validatePrototypeRoutes = async (prototypeRoutes: string[]) => {
    const invalidRoutes: string[] = [];

    await Promise.all(
      prototypeRoutes.map(async (route) => {
        try {
          const routeUrl = new URL(route, window.location.origin);
          routeUrl.searchParams.set("auditBridge", "1");

          const response = await fetch(routeUrl.toString(), {
            method: "GET",
            headers: { Accept: "text/html" },
          });

          if (!response.ok) {
            invalidRoutes.push(route);
          }
        } catch {
          invalidRoutes.push(route);
        }
      })
    );

    return invalidRoutes;
  };

  const handleStartAction = async () => {
    const selected = selectableProjects.find((p) => p.id === selectedProjectId);
    if (!selected || !activeAction || !selectedRoute) return;

    const selectedRoutes =
      selectedRoute === ALL_ROUTES_VALUE
        ? routeOptions.map((routeOption) => routeOption.route)
        : [selectedRoute];

    if (activeAction === "security-audit") {
      const invalidRoutes = await validatePrototypeRoutes(selectedRoutes);
      if (invalidRoutes.length > 0) {
        setBridgeStatus(
          `Selected route(s) are not reachable for audit: ${invalidRoutes.join(", " )}. Pick a valid prototype route.`
        );
        return;
      }
    }

    let runId: string | undefined;
    let reportPath: string | undefined;
    if (activeAction === "security-audit") {
      const run = await queueSecurityAuditRun(selected, selectedRoutes);
      runId = run.runId;
      reportPath = run.reportPath;

      if (!reportPath) {
        setIsModalOpen(false);
        return;
      }
    }

    setRunStartedFor({
      action: activeAction,
      project: selected,
      routes: selectedRoutes,
      runId,
      reportPath,
    });

    if (reportPath) {
      window.open(reportPath, "_blank", "noopener,noreferrer");
    }

    setIsModalOpen(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <ShieldTask24Regular />
        </div>
        <div>
          <Text className={styles.headerTitle}>Workspace Agents</Text>
          <br />
          <Text className={styles.headerSubtitle}>
            Launch cross-project agents that run on top of this workspace
          </Text>
        </div>
      </div>

      <div className={styles.content}>
        <Text className={styles.sectionLabel}>Available Agent Actions</Text>

        <Card className={styles.agentCard} size="large">
          <CardHeader
            header={
              <div className={styles.cardHeader}>
                <ShieldTask24Regular />
                <Text className={styles.cardTitle}>{actionMeta["security-audit"].title}</Text>
              </div>
            }
            description={
              <Text className={styles.cardDescription}>
                Run a security audit agent against a selected project's prototype.
                Choose a project, then start the audit workflow.
              </Text>
            }
          />

          <div className={styles.statusRow}>
            <Badge appearance="filled" color="success" size="small">
              Available
            </Badge>
            <Badge appearance="outline" size="small">
              {actionMeta["security-audit"].capabilityBadge}
            </Badge>
          </div>

          <Button
            className={styles.launchButton}
            appearance="primary"
            icon={<Play16Regular />}
            onClick={() => handleLaunchAction("security-audit")}
          >
            {actionMeta["security-audit"].launchButton}
          </Button>
        </Card>

        <Card className={styles.agentCard} size="large">
          <CardHeader
            header={
              <div className={styles.cardHeader}>
                <ShieldTask24Regular />
                <Text className={styles.cardTitle}>{actionMeta["content-review"].title}</Text>
              </div>
            }
            description={
              <Text className={styles.cardDescription}>
                Run a content review agent against a selected project's prototype.
                Choose a project, then start the review workflow.
              </Text>
            }
          />

          <div className={styles.statusRow}>
            <Badge appearance="filled" color="success" size="small">
              Available
            </Badge>
            <Badge appearance="outline" size="small">
              {actionMeta["content-review"].capabilityBadge}
            </Badge>
          </div>

          <Button
            className={styles.launchButton}
            appearance="primary"
            icon={<Play16Regular />}
            onClick={() => handleLaunchAction("content-review")}
          >
            {actionMeta["content-review"].launchButton}
          </Button>
        </Card>

        <Dialog open={isModalOpen} onOpenChange={(_, data) => setIsModalOpen(data.open)}>
          <DialogSurface>
            <DialogBody>
              <DialogTitle>
                {activeAction ? actionMeta[activeAction].modalTitle : "Select Project"}
              </DialogTitle>
              <DialogContent>
                {activeAction
                  ? actionMeta[activeAction].modalDescription
                  : "Select a project."}

                <div className={styles.modalField}>
                  <Text size={200}>Project</Text>
                  <Dropdown
                    value={
                      selectableProjects.find((p) => p.id === selectedProjectId)?.title ?? ""
                    }
                    placeholder="Choose a project"
                    selectedOptions={selectedProjectId ? [selectedProjectId] : []}
                    onOptionSelect={(_, data) => {
                      setSelectedProjectId(data.optionValue ?? "");
                      setSelectedRoute("");
                    }}
                  >
                    {selectableProjects.map((project) => (
                      <Option key={project.id} value={project.id} text={project.title}>
                        {project.title}
                      </Option>
                    ))}
                  </Dropdown>
                </div>

                <div className={styles.modalField}>
                  <Text size={200}>Prototype Route</Text>
                  <Dropdown
                    value={
                      selectedRoute === ALL_ROUTES_VALUE
                        ? "All prototype routes"
                        : routeOptions.find((r) => r.route === selectedRoute)?.label ?? ""
                    }
                    placeholder={
                      selectedProjectId
                        ? "Choose a prototype route"
                        : "Select project first"
                    }
                    disabled={!selectedProjectId}
                    selectedOptions={selectedRoute ? [selectedRoute] : []}
                    onOptionSelect={(_, data) => {
                      setSelectedRoute(data.optionValue ?? "");
                    }}
                  >
                    <Option
                      key={ALL_ROUTES_VALUE}
                      value={ALL_ROUTES_VALUE}
                      text="All prototype routes"
                    >
                      All prototype routes
                    </Option>
                    {routeOptions.map((routeOption) => (
                      <Option
                        key={routeOption.id}
                        value={routeOption.route}
                        text={routeOption.label}
                      >
                        {routeOption.label}
                      </Option>
                    ))}
                  </Dropdown>
                </div>
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">Cancel</Button>
                </DialogTrigger>
                <Button
                  appearance="primary"
                  icon={<ArrowRight16Regular />}
                  iconPosition="after"
                  disabled={!selectedProjectId || !selectedRoute || !activeAction}
                  onClick={handleStartAction}
                >
                  {activeAction ? actionMeta[activeAction].startButton : "Start"}
                </Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>

        {runStartedFor && (
          <div className={styles.resultBanner}>
            <ShieldTask24Regular className={styles.resultIcon} />
            <Text className={styles.resultText}>
              {actionMeta[runStartedFor.action].resultText} for {runStartedFor.project.title} across {runStartedFor.routes.length} route(s).
            </Text>
            {runStartedFor.reportPath && (
              <a
                className={styles.reportLink}
                href={runStartedFor.reportPath}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open report <Open16Regular />
              </a>
            )}
          </div>
        )}

        {bridgeStatus && (
          <div className={styles.resultBanner}>
            <ShieldTask24Regular className={styles.resultIcon} />
            <Text className={styles.resultText}>{bridgeStatus}</Text>
          </div>
        )}

        <Text className={styles.sectionLabel}>
          More workspace-level agents can be added here over time.
        </Text>
      </div>
    </div>
  );
}