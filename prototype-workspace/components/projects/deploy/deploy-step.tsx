"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Subtitle1,
  Subtitle2,
  Body1,
  Caption1,
  Spinner,
  Link,
  Button as FluentButton,
  Dropdown,
  Option,
  Tooltip,
} from "@fluentui/react-components";
import {
  ChevronDown20Regular,
  ChevronRight20Regular,
  Home20Filled,
  Dismiss24Regular,
  Info12Regular,
  ChevronUp20Regular,
} from "@fluentui/react-icons";
import { useState, useEffect, useCallback } from "react";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

type ResourceStatus = "Not started" | "Deploying" | "OK";

interface TableRow {
  name: string;
  detail: string;
  status: ResourceStatus;
  isLink?: boolean;
}

type DeployPhase = "resources" | "container" | "application" | "done";

type DeployStepProps = {
  onCancel: () => void;
  onHome: () => void;
  onManage: () => void;
  onDeployComplete?: () => void;
};

const INITIAL_RESOURCES: TableRow[] = [
  { name: "zava-retail-storefront", detail: "Log Analytics Workspace", status: "Not started", isLink: true },
  { name: "workspacezavaretails…", detail: "Log Analytics Workspace", status: "Not started", isLink: true },
  { name: "workspacezavaretails…", detail: "Log Analytics Workspace", status: "Not started", isLink: true },
  { name: "rg-zavaretailstore", detail: "Log Analytics Workspace", status: "Not started", isLink: true },
  { name: "managedEnvironmen…", detail: "Container Apps Environment", status: "Not started", isLink: true },
  { name: "zavaretailstore", detail: "Microsoft.App/containerapps", status: "Not started", isLink: true },
];

const INITIAL_CONTAINER_ACTIONS: TableRow[] = [
  { name: "Prepare source", detail: "Pull code from selected repository, branch, and application folder", status: "Not started" },
  { name: "Build container image", detail: "Use detected Dockerfile to package app and dependencies", status: "Not started" },
  { name: "Validate image", detail: "Ensure image builds successfully and is runnable", status: "Not started" },
  { name: "Push image to registry", detail: "Upload container image to Azure Container Registry", status: "Not started" },
];

const INITIAL_APP_ACTIONS: TableRow[] = [
  { name: "zavaretailstore", detail: "Microsoft.App/containerapps", status: "Not started", isLink: true },
  { name: "Configure ingress &…", detail: "Set up ingress, HTTPS endpoint, and public access", status: "Not started", isLink: true },
  { name: "Apply environment s…", detail: "Configure ports, environment variables, and secrets", status: "Not started", isLink: true },
  { name: "Enable scaling", detail: "Apply autoscaling rules for traffic and performance", status: "Not started", isLink: true },
  { name: "Start application", detail: "Launch container and make application available", status: "Not started", isLink: true },
];

const DEPLOY_SECTIONS = [
  { id: "resources", label: "Deploy Azure resources" },
  { id: "container", label: "Create container image" },
  { id: "application", label: "Deploy application" },
  { id: "nextsteps", label: "Next steps" },
];

const NEXT_STEPS_CARDS = [
  {
    icon: "/icons/Monitor.svg",
    iconAlt: "Monitor",
    title: "Track performance with metrics",
    description: "Monitor CPU, memory, and replica metrics to spot issues early and tune performance.",
  },
  {
    icon: "/icons/virtual-machine.svg",
    iconAlt: "Virtual Machine",
    title: "Create a Virtual Machine",
    description: "For deep OS control, legacy tooling, or strict compliance guarantees.",
  },
  {
    icon: "/icons/Defender-for-Cloud.svg",
    iconAlt: "Defender for Cloud",
    title: "Keep your app fast, secure, reliable",
    description: "Get built-in updates, monitoring, and protection in one step.",
  },
];

const MORE_LINKS = [
  "Create a backup strategy",
  "Check readiness with help from AI",
  "Set rules for autoscaling",
];

const useStyles = makeStyles({
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "12px",
    boxShadow: tokens.shadow4,
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
  },
  titleText: {
    flex: 1,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase600,
    lineHeight: tokens.lineHeightBase600,
    color: tokens.colorNeutralForeground1,
  },
  description: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  // Accordion
  accordionItem: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderRadius: "4px",
  },
  accordionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    height: "44px",
    padding: "0 10px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  accordionLabel: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    color: tokens.colorNeutralForeground1,
  },
  accordionPanel: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "0 0 12px 0",
    width: "100%",
  },
  // Resource table
  resourceBox: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    width: "100%",
  },
  statusText: {
    color: tokens.colorNeutralForeground1,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  tableRow: {
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${tokens.colorNeutralBackground3}`,
    width: "100%",
    height: "32px",
  },
  tableHeaderRow: {
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${tokens.colorNeutralBackground3}`,
    width: "100%",
    height: "42px",
  },
  cellName: {
    width: "165px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "0 8px",
    overflow: "hidden",
  },
  cellDetail: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "0 8px",
    overflow: "hidden",
  },
  cellStatus: {
    width: "220px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    overflow: "hidden",
  },
  cellOperation: {
    width: "196px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    overflow: "hidden",
  },
  headerText: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground1,
  },
  cellText: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  cellLink: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  // Next steps
  nextStepsCardsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    width: "100%",
  },
  nextStepCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    cursor: "pointer",
    ":hover": {
      boxShadow: tokens.shadow4,
    },
  },
  nextStepIconContainer: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "4px",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    width: "fit-content",
  },
  moreSection: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginTop: "8px",
  },
  // Footer
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  // Drawer
  drawerBody: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    paddingTop: "0",
  },
  drawerInfoBox: {
    backgroundColor: "rgba(176, 190, 255, 0.18)",
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  drawerInfoText: {
    color: tokens.colorNeutralForeground1,
  },
  drawerBulletList: {
    margin: "0",
    paddingLeft: "21px",
    listStyleType: "disc",
    color: tokens.colorNeutralForeground1,
  },
  drawerFieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "100%",
  },
  drawerFieldLabel: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: tokens.colorNeutralForeground1,
  },
  drawerCostSection: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    width: "100%",
  },
  drawerCostTitle: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  drawerCostAmount: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "24px",
    lineHeight: "32px",
    color: tokens.colorNeutralForeground1,
  },
  drawerCostUnit: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: "13px",
    lineHeight: "18px",
    color: tokens.colorNeutralForeground1,
  },
  drawerDisclaimer: {
    fontSize: "10px",
    lineHeight: "14px",
    color: tokens.colorNeutralForeground1,
  },
  drawerFooter: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
  },
  drawerCostBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    cursor: "pointer",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "8px",
    padding: "16px",
  },
  drawerFooterButtons: {
    display: "flex",
    gap: "8px",
    width: "100%",
  },
  statusIconSmall: {
    width: "12px",
    height: "12px",
    flexShrink: 0,
  },
  successIconLg: {
    width: "28px",
    height: "28px",
  },
  accordionIconSm: {
    width: "20px",
    height: "20px",
  },
  accordionSections: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
  },
  captionSecondary: {
    color: tokens.colorNeutralForeground2,
  },
  drawerBackdrop: {
    position: "fixed",
    top: "48px",
    left: "0",
    right: "0",
    bottom: "56px",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    zIndex: 1000,
  },
  drawerPanel: {
    position: "fixed",
    top: "48px",
    right: "0",
    bottom: "56px",
    width: "320px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow64,
    zIndex: 1001,
    display: "flex",
    flexDirection: "column",
  },
  drawerHeaderRow: {
    display: "flex",
    gap: "8px",
    alignItems: "flex-start",
    padding: "24px 16px 12px 24px",
    flexShrink: 0,
  },
  drawerTitleFlex: {
    flex: 1,
  },
  drawerScrollBody: {
    flex: 1,
    overflowY: "auto",
    padding: "0 24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  drawerFooterPadded: {
    padding: "16px 24px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  infoIconStyle: {
    color: tokens.colorNeutralForeground3,
    cursor: "help",
  },
  dropdownFull: {
    width: "100%",
  },
  disclaimerLink: {
    fontSize: "10px",
    lineHeight: "14px",
  },
});

const EMM_FIELDS = [
  { label: "Subscription", value: "zava-sub", options: ["zava-sub", "zava-dev", "zava-prod"] },
  { label: "Managed identity", value: "zava-mi", options: ["zava-mi", "zava-mi-2"] },
  { label: "Log analytics workspace", value: "zava-law", options: ["zava-law", "zava-law-2"] },
  { label: "Azure Monitor workspace", value: "zava-amw", options: ["zava-amw", "zava-amw-2"] },
];

function StatusIcon({ status }: { status: ResourceStatus }) {
  const styles = useStyles();
  if (status === "OK") {
    return <img src="/icons/Success.svg" alt="Success" className={styles.statusIconSmall} />;
  }
  // "Not started" — blue pending icon
  return <img src="/icons/Pending.svg" alt="Pending" className={styles.statusIconSmall} />;
}

export function DeployStep({ onCancel, onHome, onManage, onDeployComplete }: DeployStepProps) {
  const styles = useStyles();
  const [resources, setResources] = useState<TableRow[]>(INITIAL_RESOURCES);
  const [containerActions, setContainerActions] = useState<TableRow[]>(INITIAL_CONTAINER_ACTIONS);
  const [appActions, setAppActions] = useState<TableRow[]>(INITIAL_APP_ACTIONS);
  const [phase, setPhase] = useState<DeployPhase>("resources");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    resources: true,
    container: false,
    application: false,
    nextsteps: false,
  });
  const [emmDrawerOpen, setEmmDrawerOpen] = useState(false);
  const [emmCostExpanded, setEmmCostExpanded] = useState(true);

  // Animate resources deploying one by one
  useEffect(() => {
    if (phase !== "resources") return;
    const nextIndex = resources.findIndex((r) => r.status === "Not started");
    if (nextIndex === -1) {
      const timer = setTimeout(() => {
        setExpandedSections((prev) => ({ ...prev, resources: false, container: true }));
        setPhase("container");
      }, 500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setResources((prev) =>
        prev.map((r, i) => (i === nextIndex ? { ...r, status: "OK" } : r))
      );
    }, 600);
    return () => clearTimeout(timer);
  }, [resources, phase]);

  // Animate container actions one by one
  useEffect(() => {
    if (phase !== "container") return;
    const nextIndex = containerActions.findIndex((r) => r.status === "Not started");
    if (nextIndex === -1) {
      const timer = setTimeout(() => {
        setExpandedSections((prev) => ({ ...prev, container: false, application: true }));
        setPhase("application");
      }, 500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setContainerActions((prev) =>
        prev.map((r, i) => (i === nextIndex ? { ...r, status: "OK" } : r))
      );
    }, 800);
    return () => clearTimeout(timer);
  }, [containerActions, phase]);

  // Animate application actions one by one
  useEffect(() => {
    if (phase !== "application") return;
    const nextIndex = appActions.findIndex((r) => r.status === "Not started");
    if (nextIndex === -1) {
      const timer = setTimeout(() => {
        setExpandedSections((prev) => ({ ...prev, application: false, nextsteps: true }));
        setPhase("done");
        onDeployComplete?.();
      }, 500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setAppActions((prev) =>
        prev.map((r, i) => (i === nextIndex ? { ...r, status: "OK" } : r))
      );
    }, 700);
    return () => clearTimeout(timer);
  }, [appActions, phase]);

  const toggleSection = useCallback((id: string) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const isSectionActive = (id: string) => {
    switch (id) {
      case "resources": return phase === "resources";
      case "container": return phase === "container";
      case "application": return phase === "application";
      default: return false;
    }
  };

  const isNextSteps = (id: string) => id === "nextsteps" && phase === "done";

  const isSectionComplete = (id: string) => {
    switch (id) {
      case "resources": return phase !== "resources";
      case "container": return phase === "application" || phase === "done";
      case "application": return phase === "done";
      default: return false;
    }
  };

  const isDeploying = phase !== "done";

  // Table renderer shared by all 3 deploy sections
  const renderTable = (
    headers: string[],
    rows: TableRow[],
    showOperationDetails: boolean
  ) => (
    <div className={styles.table}>
      <div className={styles.tableHeaderRow}>
        <div className={styles.cellName}>
          <span className={styles.headerText}>{headers[0]}</span>
        </div>
        <div className={styles.cellDetail}>
          <span className={styles.headerText}>{headers[1]}</span>
        </div>
        <div className={styles.cellStatus}>
          <span className={styles.headerText}>{headers[2]}</span>
        </div>
        {showOperationDetails && (
          <div className={styles.cellOperation}>
            <span className={styles.headerText}>Operation details</span>
          </div>
        )}
      </div>
      {rows.map((row, idx) => (
        <div key={idx} className={styles.tableRow}>
          <div className={styles.cellName}>
            <StatusIcon status={row.status} />
            {row.isLink ? (
              <Link className={styles.cellLink} href="#" inline>
                {row.name}
              </Link>
            ) : (
              <span className={styles.cellText}>{row.name}</span>
            )}
          </div>
          <div className={styles.cellDetail}>
            <span className={styles.cellText}>{row.detail}</span>
          </div>
          <div className={styles.cellStatus}>
            <span className={styles.cellText}>{row.status}</span>
          </div>
          {showOperationDetails && (
            <div className={styles.cellOperation}>
              <Link className={styles.cellLink} href="#" inline>
                Operation details
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          {isDeploying ? (
            <Spinner size="small" />
          ) : (
            <img
              src="/icons/Success.svg"
              alt="Success"
              className={styles.successIconLg}
            />
          )}
          <Text className={styles.titleText}>
            {isDeploying
              ? "Deploying your application"
              : "Your application was deployed successfully"}
          </Text>
        </div>
        <Text className={styles.description}>
          When finished, you&apos;ll see the deployment you created in the list
          below. Click on a deployment to view individual resources created as
          part of the deployment.
        </Text>
      </div>

      {/* Accordion sections */}
      <div className={styles.accordionSections}>
        {DEPLOY_SECTIONS.map((section, sectionIndex) => {
          const isExpanded = expandedSections[section.id];
          const active = isSectionActive(section.id);
          const complete = isSectionComplete(section.id);

          return (
            <div key={section.id} className={styles.accordionItem}>
              <div
                className={styles.accordionHeader}
                onClick={() => toggleSection(section.id)}
              >
                {isExpanded ? (
                  <ChevronDown20Regular />
                ) : (
                  <ChevronRight20Regular />
                )}
                {complete && (
                  <img
                    src="/icons/Success.svg"
                    alt="Success"
                    className={styles.accordionIconSm}
                  />
                )}
                {isNextSteps(section.id) && (
                  <img
                    src="/icons/Upsell.svg"
                    alt="Upsell"
                    className={styles.accordionIconSm}
                  />
                )}
                {active && !complete && <Spinner size="tiny" />}
                <Subtitle1 className={styles.accordionLabel}>
                  {sectionIndex + 1}. {section.label}
                </Subtitle1>
              </div>

              {/* 1. Deploy Azure resources */}
              {isExpanded && section.id === "resources" && (
                <div className={styles.accordionPanel}>
                  <div className={styles.resourceBox}>
                    <Body1 className={styles.statusText}>
                      {isSectionComplete("resources")
                        ? "Azure resources deployed successfully."
                        : "Deploying Azure resources."}
                    </Body1>
                    {renderTable(
                      ["Resource", "Type", "Status"],
                      resources,
                      true
                    )}
                  </div>
                </div>
              )}

              {/* 2. Create container image */}
              {isExpanded && section.id === "container" && (
                <div className={styles.accordionPanel}>
                  <div className={styles.resourceBox}>
                    <Body1 className={styles.statusText}>
                      Your Dockerfile is used to bundle app specs, configurations,
                      and dependencies into a container image. After run-check
                      validation, the image is pushed to Azure Container Registry.
                    </Body1>
                    {renderTable(
                      ["Action", "Details", "Status"],
                      containerActions,
                      false
                    )}
                  </div>
                </div>
              )}

              {/* 3. Deploy application */}
              {isExpanded && section.id === "application" && (
                <div className={styles.accordionPanel}>
                  <div className={styles.resourceBox}>
                    <Body1 className={styles.statusText}>
                      Configure networking, incoming / outgoing ports, autoscaling,
                      and security resources to ensure communication between
                      services and prep for traffic.
                    </Body1>
                    {renderTable(
                      ["Resource", "Details", "Status"],
                      appActions,
                      false
                    )}
                  </div>
                </div>
              )}

              {/* 4. Next steps */}
              {isExpanded && section.id === "nextsteps" && (
                <div className={styles.accordionPanel}>
                  <div className={styles.resourceBox}>
                    <Body1 className={styles.statusText}>
                      Once you&apos;ve deployed, optimize performance with
                      real-time metrics, scaling rules, cost and error alerts,
                      and more.
                    </Body1>
                    <div className={styles.nextStepsCardsRow}>
                      {NEXT_STEPS_CARDS.map((card) => (
                        <div
                          key={card.title}
                          className={styles.nextStepCard}
                        >
                          <div className={styles.nextStepIconContainer}>
                            <img src={card.icon} alt={card.iconAlt} width={34} height={34} />
                          </div>
                          <Subtitle2>{card.title}</Subtitle2>
                          <Caption1 className={styles.captionSecondary}>
                            {card.description}
                          </Caption1>
                        </div>
                      ))}
                    </div>
                    <div className={styles.moreSection}>
                      <Subtitle2>More ways to optimize</Subtitle2>
                      {MORE_LINKS.map((link) => (
                        <Link key={link} href="#" inline>
                          {link}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* EMM Overlay Drawer */}
      {emmDrawerOpen && (
        <>
          {/* Backdrop scrim below header */}
          <div
            className={styles.drawerBackdrop}
            onClick={() => setEmmDrawerOpen(false)}
          />
          {/* Drawer panel */}
          <div
            className={styles.drawerPanel}
          >
            {/* Header */}
            <div
              className={styles.drawerHeaderRow}
            >
              <Subtitle1 className={styles.drawerTitleFlex}>
                Keep your app fast, secure, and reliable
              </Subtitle1>
              <FluentButton
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setEmmDrawerOpen(false)}
              />
            </div>

            {/* Body */}
            <div
              className={styles.drawerScrollBody}
            >
              {/* Info box */}
              <div className={styles.drawerInfoBox}>
                <Body1 className={styles.drawerInfoText}>
                  Enroll in <strong>machine management</strong> to:
                </Body1>
                <ul className={styles.drawerBulletList}>
                  <li><Body1>Automatically manage updates</Body1></li>
                  <li><Body1>Monitor performance</Body1></li>
                  <li><Body1>Protect your checkout and APIs for your Next.js + API app</Body1></li>
                </ul>
              </div>

              {/* Form fields */}
              {EMM_FIELDS.map((field) => (
                <div key={field.label} className={styles.drawerFieldGroup}>
                  <div className={styles.drawerFieldLabel}>
                    <Body1>{field.label}</Body1>
                    <Tooltip content={field.label} relationship="description">
                      <Info12Regular className={styles.infoIconStyle} />
                    </Tooltip>
                  </div>
                  <Dropdown
                    defaultValue={field.value}
                    defaultSelectedOptions={[field.value]}
                    className={styles.dropdownFull}
                  >
                    {field.options.map((opt) => (
                      <Option key={opt} value={opt}>
                        {opt}
                      </Option>
                    ))}
                  </Dropdown>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div
              className={styles.drawerFooterPadded}
            >
              {/* Cost estimate */}
              <div
                className={styles.drawerCostBar}
                onClick={() => setEmmCostExpanded(!emmCostExpanded)}
              >
                <div className={styles.drawerCostSection}>
                  <Body1 className={styles.drawerCostTitle}>Estimated monthly cost</Body1>
                  {emmCostExpanded && (
                    <>
                      <span>
                        <span className={styles.drawerCostAmount}>$15.00</span>
                        <span className={styles.drawerCostUnit}>/ server / month</span>
                      </span>
                      <span className={styles.drawerDisclaimer}>
                        Cost is an estimate only.{" "}
                        <Link href="#" inline className={styles.disclaimerLink}>
                          Read full disclaimer
                        </Link>
                      </span>
                    </>
                  )}
                </div>
                {emmCostExpanded ? <ChevronUp20Regular /> : <ChevronDown20Regular />}
              </div>
              {/* Action buttons */}
              <div className={styles.drawerFooterButtons}>
                <FluentButton appearance="primary" onClick={() => setEmmDrawerOpen(false)}>
                  Enroll
                </FluentButton>
                <FluentButton appearance="secondary" onClick={() => setEmmDrawerOpen(false)}>
                  Cancel
                </FluentButton>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Footer */}
      <div className={styles.footer}>
        {isDeploying ? (
          <>
            <FluentButton appearance="secondary" onClick={onCancel}>
              Cancel deployment
            </FluentButton>
            <FluentButton appearance="primary" icon={<Home20Filled />} onClick={onHome}>
              Home
            </FluentButton>
          </>
        ) : (
          <>
            <FluentButton appearance="secondary" icon={<Home20Filled />} onClick={onHome}>
              Home
            </FluentButton>
            <FluentButton appearance="primary" onClick={onManage}>
              Manage
            </FluentButton>
          </>
        )}
      </div>
    </div>
  );
}
