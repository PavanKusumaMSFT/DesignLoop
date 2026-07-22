"use client";

import { useState, useEffect } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Card,
  Link,
  Divider,
  Badge,
  Spinner,
} from "@fluentui/react-components";
import {
  ArrowClockwise20Regular,
  ArrowDownload20Regular,
  Share20Regular,
  Delete20Regular,
  Prohibited20Regular,
  ContractUpRight20Regular,
  Pin20Regular,
  Star20Regular,
  MoreHorizontal20Regular,
  Search20Regular,
  CheckmarkCircle20Filled,
  Checkmark16Regular,
  Dismiss20Regular,
  Sparkle20Regular,
  PlugConnected20Regular,
} from "@fluentui/react-icons";
import { NavigationProvider } from "../../../lib/navigation-context";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import PageBreadcrumb from "../../shared/page-breadcrumb";
import EmmEnableBlade from "./emm-enable-blade";
import EmmVmOverview from "./contoso-vm-manage";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    flexDirection: "column",
  },
  pageContent: {
    display: "flex",
    flex: 1,
  },

  /* Left sidebar */
  sidebar: {
    width: "200px",
    flexShrink: 0,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    paddingTop: tokens.spacingVerticalM,
  },
  sidebarSearch: {
    padding: `0 ${tokens.spacingHorizontalM}`,
    marginBottom: tokens.spacingVerticalM,
  },
  sidebarSearchInput: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  sidebarItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    backgroundColor: "transparent",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  sidebarItemActive: {
    fontWeight: tokens.fontWeightSemibold,
    borderLeft: `2px solid #0078D4`,
    paddingLeft: "14px",
  },
  sidebarIcon: {
    width: "16px",
    height: "16px",
    flexShrink: 0,
  },

  /* Main content area */
  mainArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  resourceHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXXL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  resourceIcon: {
    width: "32px",
    height: "32px",
    flexShrink: 0,
  },
  resourceTitleGroup: {
    display: "flex",
    flexDirection: "column",
  },
  resourceTitle: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  resourceName: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "32px",
  },
  resourceSubtitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    marginLeft: tokens.spacingHorizontalM,
  },

  /* Toolbar */
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalXXL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    flexWrap: "wrap",
  },
  toolbarDivider: {
    height: "20px",
  },

  /* Content area */
  content: {
    flex: 1,
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalXXL}`,
    overflowY: "auto",
  },
  successTitle: {
    display: "block",
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
    marginBottom: tokens.spacingVerticalXS,
  },
  successDesc: {
    display: "block",
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
    marginBottom: tokens.spacingVerticalXXL,
  },

  /* Resource details section */
  resourceDetailsTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
    marginBottom: tokens.spacingVerticalL,
  },

  /* Resource info grid */
  resourceInfoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalXXL,
  },
  infoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
  },
  infoLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: "18px",
    minWidth: "180px",
  },
  infoValue: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    lineHeight: "18px",
  },
  infoLink: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: "18px",
  },
  vmIcon: {
    width: "20px",
    height: "20px",
    flexShrink: 0,
    marginRight: tokens.spacingHorizontalXS,
  },

  /* Recommended next steps */
  nextStepsTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
    marginBottom: tokens.spacingVerticalL,
  },
  nextStepsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: tokens.spacingHorizontalL,
    marginTop: tokens.spacingVerticalM,
  },
  nextStepCard: {
    padding: tokens.spacingHorizontalXXL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  nextStepCardTextGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacingVerticalXS,
  },
  nextStepCardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  nextStepCardDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: "18px",
  },
  emmStatsRow: {
    display: "flex",
    gap: tokens.spacingHorizontalXXL,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
  },
  emmStatItem: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  emmStatLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  emmStatValue: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  emmAddonsText: {
    fontSize: tokens.fontSizeBase100,
    fontStyle: "italic",
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  emmStatValueGreen: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorPaletteGreenForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  nextStepActions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalS,
    marginTop: "auto",
    paddingTop: tokens.spacingVerticalM,
  },
  emmCardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
    paddingTop: tokens.spacingVerticalM,
  },
  enabledText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorPaletteGreenForeground1,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
  },
  emmFooterButtons: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },

  /* Toast notification */
  toast: {
    position: "fixed",
    top: "56px",
    right: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: tokens.spacingHorizontalL,
    display: "flex",
    gap: tokens.spacingHorizontalM,
    zIndex: 1000,
    maxWidth: "320px",
    alignItems: "flex-start",
  },
  toastContent: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    flex: 1,
  },
  toastTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase300,
  },
  toastDesc: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    lineHeight: "18px",
  },
  toastSuccessIcon: {
    color: tokens.colorPaletteGreenForeground1,
    flexShrink: 0,
  },
  toastDismiss: {
    flexShrink: 0,
  },
  /* Deployment in progress — inline in status area */
  deployInlineStatus: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
  },
  deployInlineText: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  deployInlineTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "28px",
  },
  deployInlineSubtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  deploySteps: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    width: "400px",
    maxWidth: "100%",
  },
  deployStepRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  deployStepIcon: {
    width: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  deployStepDone: {
    color: tokens.colorPaletteGreenForeground1,
  },
  deployStepPending: {
    color: tokens.colorNeutralForeground3,
  },
  deployStepText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
  deployStepTextPending: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
  },
  deployProgressBar: {
    width: "400px",
    maxWidth: "100%",
    height: "4px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
  },
  deployProgressFill: {
    height: "100%",
    backgroundColor: "#0078D4",
    borderRadius: tokens.borderRadiusMedium,
    transitionProperty: "width",
    transitionDuration: "0.6s",
    transitionTimingFunction: "ease-in-out",
  },
});

export interface EmmDeploymentSuccessProps {
  /** VM name displayed in the resource header and info */
  vmName?: string;
  /** Called when navigating back or closing */
  onBack?: () => void;
  /** Called when navigating to the landing page */
  onHome?: () => void;
  /** Called when navigating back to Compute Infrastructure */
  onNavigateToComputeInfra?: () => void;
  /** Called when navigating to EMM Dashboard Details */
  onNavigateToDashboardDetails?: () => void;
}

/** Deployment success page for EMM Create VM flow, showing resource overview with next steps. */
export default function EmmDeploymentSuccess({
  vmName = "Contoso-vm",
  onBack,
  onHome,
  onNavigateToComputeInfra,
  onNavigateToDashboardDetails,
}: EmmDeploymentSuccessProps) {
  const styles = useStyles();
  const [deployPhase, setDeployPhase] = useState(0);
  const [deployDone, setDeployDone] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [showEmmBlade, setShowEmmBlade] = useState(false);
  const [emmEnabled, setEmmEnabled] = useState(false);
  const [showVmOverview, setShowVmOverview] = useState(false);

  const deploySteps = [
    "Validating deployment configuration...",
    "Provisioning virtual network and public IP...",
    "Creating virtual machine...",
    "Applying security rules and finalizing...",
  ];

  // Deployment progress animation
  useEffect(() => {
    if (deployDone) return;
    if (deployPhase === 0) {
      const t = setTimeout(() => setDeployPhase(1), 300);
      return () => clearTimeout(t);
    }
    if (deployPhase <= 4) {
      const t = setTimeout(
        () => setDeployPhase((p) => p + 1),
        deployPhase === 4 ? 800 : 1200,
      );
      return () => clearTimeout(t);
    }
    // phase 5 = all steps done, show "Success!" briefly then transition
    if (deployPhase === 5) {
      const t = setTimeout(() => setDeployDone(true), 1500);
      return () => clearTimeout(t);
    }
  }, [deployPhase, deployDone]);

  if (showVmOverview) {
    return (
      <EmmVmOverview
        vmName={vmName}
        onBack={() => setShowVmOverview(false)}
        onHome={onHome}
        onNavigateToComputeInfra={onNavigateToComputeInfra}
      />
    );
  }

  const deployProgress = Math.min((deployPhase / 4) * 100, 100);
  const allStepsDone = deployPhase >= 5;

  return (
    <NavigationProvider>
      <div className={styles.root}>
        <AzureHeaderBuildMVP isDarkMode={false} onLogoClick={onHome} />
        <PageBreadcrumb
          noBorder
          items={[
            { label: "Home", onClick: onHome || onBack },
            { label: "New" },
            { label: "Create a resource" },
            { label: vmName },
          ]}
        />

        <div className={styles.pageContent}>
          {/* Left sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarSearch}>
              <div className={styles.sidebarSearchInput}>
                <Search20Regular />
                <Text>Search</Text>
              </div>
            </div>
            <div
              className={`${styles.sidebarItem} ${styles.sidebarItemActive}`}
            >
              Overview
            </div>
            <div className={styles.sidebarItem}>Inputs</div>
            <div className={styles.sidebarItem}>Outputs</div>
            <div className={styles.sidebarItem}>Template</div>
          </div>

          {/* Main content */}
          <div className={styles.mainArea}>
            {/* Resource header */}
            <div className={styles.resourceHeader}>
              <img
                src="/azure-service-icons/compute/10021-icon-service-Virtual-Machine.svg"
                alt=""
                className={styles.resourceIcon}
              />
              <div className={styles.resourceTitleGroup}>
                <div className={styles.resourceTitle}>
                  <Text className={styles.resourceName}>{vmName}</Text>
                  <Text className={styles.resourceName}>|</Text>
                  <Text className={styles.resourceName}>Overview</Text>
                </div>
                <Text className={styles.resourceSubtitle}>Virtual machine</Text>
              </div>
              <div className={styles.headerActions}>
                <Button
                  appearance="transparent"
                  size="small"
                  icon={<Pin20Regular />}
                />
                <Button
                  appearance="transparent"
                  size="small"
                  icon={<Star20Regular />}
                />
                <Button
                  appearance="transparent"
                  size="small"
                  icon={<MoreHorizontal20Regular />}
                />
              </div>
            </div>

            {/* Toolbar */}
            <div className={styles.toolbar}>
              <Button
                appearance="subtle"
                size="small"
                icon={<ArrowClockwise20Regular />}
              >
                Refresh
              </Button>
              <Button
                appearance="subtle"
                size="small"
                icon={<ContractUpRight20Regular />}
              >
                Redeploy
              </Button>
              <Button
                appearance="subtle"
                size="small"
                icon={<ArrowDownload20Regular />}
              >
                Download
              </Button>
              <Button
                appearance="subtle"
                size="small"
                icon={<Share20Regular />}
              >
                Share details
              </Button>
              <Divider vertical className={styles.toolbarDivider} />
              <Button
                appearance="subtle"
                size="small"
                icon={<Prohibited20Regular />}
                disabled
              >
                Cancel deployment
              </Button>
              <Button
                appearance="subtle"
                size="small"
                icon={<Delete20Regular />}
              >
                Delete
              </Button>
            </div>

            {/* Content */}
            <div className={styles.content}>
              {/* Status section — animation plays here, then settles to "Success!" */}
              {!deployDone ? (
                allStepsDone ? (
                  <>
                    <Text className={styles.successTitle}>Success!</Text>
                    <Text className={styles.successDesc}>
                      {vmName} has been created and is now running in West US 2.
                    </Text>
                  </>
                ) : (
                  <div className={styles.deployInlineStatus}>
                    <Spinner size="small" />
                    <div className={styles.deployInlineText}>
                      <Text className={styles.deployInlineTitle}>
                        Deployment is in progress
                      </Text>
                      <Text className={styles.deployInlineSubtitle}>
                        Creating {vmName} and associated resources in West US
                        2...
                      </Text>
                      <div className={styles.deployProgressBar}>
                        <div
                          className={styles.deployProgressFill}
                          style={{ width: `${deployProgress}%` }}
                        />
                      </div>
                      <div className={styles.deploySteps}>
                        {deploySteps.map((step, i) => {
                          const stepNum = i + 1;
                          const isDone = deployPhase > stepNum;
                          const isActive = deployPhase === stepNum;
                          return (
                            <div key={i} className={styles.deployStepRow}>
                              <div className={styles.deployStepIcon}>
                                {isDone ? (
                                  <CheckmarkCircle20Filled
                                    className={styles.deployStepDone}
                                  />
                                ) : isActive ? (
                                  <Spinner size="tiny" />
                                ) : (
                                  <span className={styles.deployStepPending}>
                                    &#x2022;
                                  </span>
                                )}
                              </div>
                              <Text
                                className={
                                  isDone || isActive
                                    ? styles.deployStepText
                                    : styles.deployStepTextPending
                                }
                              >
                                {step}
                              </Text>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <>
                  <Text className={styles.successTitle}>Success!</Text>
                  <Text className={styles.successDesc}>
                    Your virtual machine is deployed and ready to use.
                  </Text>
                </>
              )}

              {/* Resource details */}
              <Text as="h3" className={styles.resourceDetailsTitle}>
                Resource details
              </Text>
              <div className={styles.resourceInfoGrid}>
                <div className={styles.infoRow}>
                  <Text className={styles.infoLabel}>
                    Virtual machine resource name:
                  </Text>
                  <Link
                    className={styles.infoLink}
                    onClick={() => setShowVmOverview(true)}
                  >
                    {vmName}
                  </Link>
                </div>
                <div className={styles.infoRow}>
                  <Text className={styles.infoLabel}>Start time:</Text>
                  <Text className={styles.infoValue}>11/30/2018, 3:30pm</Text>
                </div>
                <div className={styles.infoRow}>
                  <Text className={styles.infoLabel}>Subscription:</Text>
                  <Link className={styles.infoLink}>sub-03</Link>
                </div>
                <div className={styles.infoRow}>
                  <Text className={styles.infoLabel}>Correlation ID:</Text>
                  <Text className={styles.infoValue}>
                    7d5490af-2...6b-be76-514772ce8
                  </Text>
                </div>
                <div className={styles.infoRow}>
                  <Text className={styles.infoLabel}>Resource group:</Text>
                  <Link className={styles.infoLink}>rh-01</Link>
                </div>
              </div>

              {/* Recommended next steps */}
              <Text as="h3" className={styles.nextStepsTitle}>
                Recommended next steps
              </Text>
              <div className={styles.nextStepsGrid}>
                <Card className={styles.nextStepCard}>
                  <div className={styles.nextStepCardTextGroup}>
                    <Badge appearance="filled" color="success" size="small">
                      New
                    </Badge>
                    <Text className={styles.nextStepCardTitle}>
                      Essential Machine Management
                    </Text>
                    <Text className={styles.nextStepCardDesc}>
                      Manage and secure your machines at scale, all in one
                      place.
                    </Text>
                  </div>
                  <div className={styles.emmStatsRow}>
                    <div className={styles.emmStatItem}>
                      <Text className={styles.emmStatLabel}>Cost</Text>
                      <Text className={styles.emmStatValue}>Free</Text>
                      <Text className={styles.emmAddonsText}>
                        add-ons available
                      </Text>
                    </div>
                    <div className={styles.emmStatItem}>
                      <Text className={styles.emmStatLabel}>
                        Estimated monthly savings
                      </Text>
                      <Text className={styles.emmStatValueGreen}>
                        $5,773.77
                      </Text>
                    </div>
                  </div>
                  {emmEnabled ? (
                    <div className={styles.emmCardFooter}>
                      <Text className={styles.enabledText}>
                        <Checkmark16Regular />
                        Enabled
                      </Text>
                      <div className={styles.emmFooterButtons}>
                        <Button
                          appearance="primary"
                          size="small"
                          onClick={onNavigateToDashboardDetails}
                        >
                          View dashboard
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.nextStepActions}>
                      <Button appearance="outline" size="small">
                        Pricing
                      </Button>
                      <Button
                        appearance="outline"
                        size="small"
                        onClick={() =>
                          window.open(
                            "https://learn.microsoft.com/en-us/azure/operations/configuration-enrollment",
                            "_blank",
                          )
                        }
                      >
                        Documentation
                      </Button>
                      <Button
                        appearance="primary"
                        size="small"
                        onClick={() => setShowEmmBlade(true)}
                      >
                        Enable
                      </Button>
                    </div>
                  )}
                </Card>

                <Card className={styles.nextStepCard}>
                  <Text className={styles.nextStepCardTitle}>
                    Optimize with Copilot
                  </Text>
                  <Text className={styles.nextStepCardDesc}>
                    Use AI-powered recommendations to optimize cost,
                    performance, and security for this VM.
                  </Text>
                  <div className={styles.nextStepActions}>
                    <Button appearance="outline" size="small">
                      Learn more
                    </Button>
                    <Button
                      appearance="secondary"
                      size="small"
                      icon={<Sparkle20Regular />}
                    >
                      Optimize with Copilot
                    </Button>
                  </div>
                </Card>

                <Card className={styles.nextStepCard}>
                  <Text className={styles.nextStepCardTitle}>
                    Connect to your VM
                  </Text>
                  <Text className={styles.nextStepCardDesc}>
                    Connect via RDP or SSH to start configuring your virtual
                    machine and deploying workloads.
                  </Text>
                  <div className={styles.nextStepActions}>
                    <Button appearance="outline" size="small">
                      Download RDP file
                    </Button>
                    <Button
                      appearance="secondary"
                      size="small"
                      icon={<PlugConnected20Regular />}
                    >
                      Connect
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Toast notification */}
        {deployDone && showToast && (
          <div className={styles.toast}>
            <CheckmarkCircle20Filled className={styles.toastSuccessIcon} />
            <div className={styles.toastContent}>
              <Text className={styles.toastTitle}>Success!</Text>
              <Text className={styles.toastDesc}>Virtual machine deployed</Text>
              <Link onClick={() => setShowVmOverview(true)}>
                Manage resource
              </Link>
            </div>
            <Button
              appearance="transparent"
              size="small"
              icon={<Dismiss20Regular />}
              className={styles.toastDismiss}
              onClick={() => setShowToast(false)}
            />
          </div>
        )}
      </div>

      <EmmEnableBlade
        isOpen={showEmmBlade}
        onClose={() => setShowEmmBlade(false)}
        onEnabled={() => {
          setEmmEnabled(true);
          setShowToast(false);
        }}
        onNavigateVm={() => setShowVmOverview(true)}
        onViewDashboard={onNavigateToDashboardDetails}
        defaultSubscription="sub-03"
      />
    </NavigationProvider>
  );
}
