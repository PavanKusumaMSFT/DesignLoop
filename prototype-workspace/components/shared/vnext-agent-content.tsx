"use client";

import { TopNav } from "./top-nav";
import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { useNavigation } from "../../lib/navigation-context";
import { useState, useEffect, useCallback, useMemo } from "react";
import WelcomeCanvas from "../projects/vnext-agent/welcome-canvas";
import WelcomeReturning from "../projects/vnext-agent/welcome-returning";
import WelcomeReturning2 from "../projects/vnext-agent/welcome-returning-2";
import ServiceRecommendations from "../projects/vnext-agent/service-recommendations";
import DeploymentPlan from "../projects/vnext-agent/deployment-plan";
import DeploymentProgress from "../projects/vnext-agent/deployment-progress";
import DeploymentComplete from "../projects/vnext-agent/deployment-complete";
import InvestigationSummary from "../projects/vnext-agent/investigation-summary";
import ResolutionPlan from "../projects/vnext-agent/resolution-plan";
import VMSev1Progress from "../projects/vnext-agent/vm-sev1-progress";
import ResolutionReport from "../projects/vnext-agent/resolution-report";
import VMUpgradePlan from "../projects/vnext-agent/vm-upgrade-plan";
import VMUpgradeProgress from "../projects/vnext-agent/vm-upgrade-progress";
import VMUpgradeComplete from "../projects/vnext-agent/vm-upgrade-complete";
import CanvasHeader from "../projects/vnext-agent/shared/canvas-header";
import CanvasFooter from "../projects/vnext-agent/shared/canvas-footer";
import AgentSummaryPanel from "../projects/vnext-agent/agent-summary-panel";
import SparkleMenuPanel from "../projects/vnext-agent/sparkle-menu-panel";
import HpReturning from "./hp-returning";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    background: `linear-gradient(to top, rgba(96, 165, 250, 0.08) 0%, ${tokens.colorNeutralBackground2} 40%)`,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  fadeIn: {
    animation: "fadeInUp 0.6s ease-out forwards",
  },
  fadeOut: {
    animation: "fadeOut 0.3s ease-out forwards",
  },
  userInfo: {
    position: "absolute",
    top: "16px",
    right: "24px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    zIndex: 10,
  },
  creditBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "16px",
    fontSize: "14px",
  },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForegroundInverted,
    fontWeight: tokens.fontWeightSemibold,
  },
  loadingPlaceholder: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
});

interface VNextAgentContentProps {
  experienceLevel: "new" | "smb" | "enterprise";
  initialState?:
    | "welcome"
    | "returning"
    | "returning-2"
    | "services"
    | "deployment"
    | "deploying"
    | "complete"
    | "vm-upgrade-plan"
    | "vm-upgrading"
    | "vm-upgrade-complete"
    | "investigation-summary"
    | "resolution-plan"
    | "sev1-resolving"
    | "resolution-report";
  showTopNav?: boolean;
}

export default function VNextAgentContent({
  experienceLevel,
  initialState = "welcome",
  showTopNav = false,
}: VNextAgentContentProps) {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();
  const [isStylesLoaded, setIsStylesLoaded] = useState(false);
  const [canvasState, setCanvasState] = useState<
    | "welcome"
    | "returning"
    | "returning-2"
    | "services"
    | "deployment"
    | "deploying"
    | "complete"
    | "vm-upgrade-plan"
    | "vm-upgrading"
    | "vm-upgrade-complete"
    | "investigation-summary"
    | "resolution-plan"
    | "sev1-resolving"
    | "resolution-report"
  >(initialState);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [historyItems, setHistoryItems] = useState<string[]>(
    initialState === "investigation-summary"
      ? ["Investigation summary"]
      : ["Welcome, Connie"],
  );
  const [selectedHistory, setSelectedHistory] = useState(
    initialState === "investigation-summary"
      ? "Investigation summary"
      : "Welcome, Connie",
  );
  const [hasCompletedDeployment, setHasCompletedDeployment] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSparkleMenu, setShowSparkleMenu] = useState(false);
  const [customRecommendationMessage, setCustomRecommendationMessage] =
    useState<string | undefined>(undefined);
  const [agentMode, setAgentMode] = useState(true);

  useEffect(() => {
    // Small delay to ensure styles are loaded
    const timer = setTimeout(() => {
      setIsStylesLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handlePromptClick = useCallback((prompt: string) => {
    console.log("Selected prompt:", prompt);

    // Handle investigation summary navigation
    if (prompt === "Explain details of the investigation") {
      setIsTransitioning(true);
      setTimeout(() => {
        setCanvasState("investigation-summary");
        setSelectedHistory("Investigation summary");
        setHistoryItems((prev) =>
          prev.includes("Investigation summary")
            ? prev
            : [...prev, "Investigation summary"],
        );
        setIsTransitioning(false);
      }, 300);
    }

    // Handle resolution plan navigation
    if (prompt === "Resolve the Sev1 alert for me") {
      setIsTransitioning(true);
      setTimeout(() => {
        setCanvasState("resolution-plan");
        setSelectedHistory("Resolution plan: Change NSG rule");
        setHistoryItems((prev) =>
          prev.includes("Resolution plan: Change NSG rule")
            ? prev
            : [...prev, "Resolution plan: Change NSG rule"],
        );
        setIsTransitioning(false);
      }, 300);
    }
  }, []);

  const handleUpgradeClick = useCallback(() => {
    console.log("Upgrade VMs clicked");
    setIsTransitioning(true);
    setTimeout(() => {
      setCanvasState("vm-upgrade-plan");
      setSelectedHistory("VMs eligible for upgrade");
      setHistoryItems((prev) =>
        prev.includes("VMs eligible for upgrade")
          ? prev
          : [...prev, "VMs eligible for upgrade"],
      );
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleStartUpgrade = useCallback(() => {
    console.log("Starting VM upgrade");
    setIsTransitioning(true);
    setTimeout(() => {
      setCanvasState("vm-upgrading");
      setSelectedHistory("Upgrade VMs to Easv6-series");
      setHistoryItems((prev) =>
        prev.includes("Upgrade VMs to Easv6-series")
          ? prev
          : [...prev, "Upgrade VMs to Easv6-series"],
      );
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleUpgradeComplete = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCanvasState("vm-upgrade-complete");
      setSelectedHistory("VM upgrade complete");
      setHistoryItems((prev) =>
        prev.includes("VM upgrade complete")
          ? prev
          : [...prev, "VM upgrade complete"],
      );
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleCancelUpgrade = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCanvasState("returning");
      setSelectedHistory("Welcome back, Connie");
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleApproveResolution = useCallback(() => {
    console.log("Approving resolution plan");
    setIsTransitioning(true);
    setTimeout(() => {
      setCanvasState("sev1-resolving");
      setSelectedHistory("Resolving Sev1 alert");
      setHistoryItems((prev) =>
        prev.includes("Resolving Sev1 alert")
          ? prev
          : [...prev, "Resolving Sev1 alert"],
      );
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleCancelResolution = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCanvasState("investigation-summary");
      setSelectedHistory("Investigation summary");
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleSev1ResolutionComplete = useCallback(() => {
    console.log("Sev1 resolution complete");
    setIsTransitioning(true);
    setTimeout(() => {
      setCanvasState("resolution-report");
      setSelectedHistory("Resolution report: Change NSG rule");
      setHistoryItems((prev) =>
        prev.includes("Resolution report: Change NSG rule")
          ? prev
          : [...prev, "Resolution report: Change NSG rule"],
      );
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleLinkClick = useCallback((action: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (action === "suggest services") {
        setCustomRecommendationMessage(undefined); // Reset custom message
        setCanvasState("services");
        setSelectedHistory("Suggest services");
        setHistoryItems((prev) =>
          prev.includes("Suggest services")
            ? prev
            : [...prev, "Suggest services"],
        );
      } else if (action === "deploy template") {
        setCanvasState("deployment");
      }
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleServiceSelect = useCallback((service: string, action: string) => {
    console.log("Service selected:", service, action);
    if (action === "deploy") {
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedService(service);
        setCanvasState("deployment");
        setSelectedHistory("App Service deployment plan");
        setHistoryItems((prev) =>
          prev.includes("App Service deployment plan")
            ? prev
            : [...prev, "App Service deployment plan"],
        );
        setIsTransitioning(false);
      }, 300);
    }
  }, []);

  const handleDeploy = useCallback(() => {
    console.log("Deploying service:", selectedService);
    setIsTransitioning(true);
    setTimeout(() => {
      setCanvasState("deploying");
      setSelectedHistory("Deploy App Service");
      setHistoryItems((prev) =>
        prev.includes("Deploy App Service")
          ? prev
          : [...prev, "Deploy App Service"],
      );
      setIsTransitioning(false);
    }, 300);
  }, [selectedService]);

  const handleDeploymentComplete = useCallback(() => {
    console.log("Deployment complete - setting flag to true");
    setIsTransitioning(true);
    setTimeout(() => {
      setCanvasState("complete");
      setSelectedHistory("Completed deployment");
      setHasCompletedDeployment(true); // Mark that we've completed a deployment
      console.log("hasCompletedDeployment set to true");
      setHistoryItems((prev) =>
        prev.includes("Completed deployment")
          ? prev
          : [...prev, "Completed deployment"],
      );
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleCancelDeployment = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCanvasState("services");
      setSelectedHistory("Suggest services");
      setIsTransitioning(false);
    }, 300);
  }, []);

  const handleRefresh = useCallback(() => {
    console.log("=== REFRESH CLICKED ===");
    console.log("Current state:", canvasState);
    console.log("History items:", historyItems);
    console.log("Has completed deployment flag:", hasCompletedDeployment);

    setIsTransitioning(true);
    setTimeout(() => {
      // If on resolution-report page, go back to welcome
      if (canvasState === "resolution-report") {
        console.log("✅ From resolution report - going to welcome");
        setCanvasState("welcome");
        setSelectedHistory("Welcome, Connie");
        setHistoryItems(["Welcome, Connie"]);
        setSelectedService("");
        setIsTransitioning(false);
        return;
      }

      // Check if we have completed any deployment or upgrade
      const hasDeployed = historyItems.includes("Completed deployment");
      const hasUpgraded = historyItems.includes("VM upgrade complete");
      const shouldShowReturning =
        hasDeployed || hasUpgraded || hasCompletedDeployment;

      console.log("Has deployed?", hasDeployed);
      console.log("Has upgraded?", hasUpgraded);
      console.log("Should show returning?", shouldShowReturning);

      if (shouldShowReturning) {
        // If coming from VM upgrade, show returning-2 with carousel
        if (hasUpgraded) {
          console.log("✅ Showing returning-2 state (carousel)");
          setCanvasState("returning-2");
          setSelectedHistory("Welcome back, Daisy");
          setHistoryItems(["Welcome back, Daisy"]);
        } else {
          console.log("✅ Showing returning state");
          setCanvasState("returning");
          setSelectedHistory("Welcome back, Connie");
          setHistoryItems(["Welcome back, Connie"]);
        }
      } else {
        console.log("❌ Showing welcome state");
        setCanvasState("welcome");
        setSelectedHistory("Welcome, Connie");
        setHistoryItems(["Welcome, Connie"]);
      }
      setSelectedService("");
      setIsTransitioning(false);
    }, 300);
  }, [canvasState, historyItems, hasCompletedDeployment]);

  const handleHistoryChange = useCallback((value: string) => {
    setSelectedHistory(value);
    setIsTransitioning(true);

    setTimeout(() => {
      // Map history items to canvas states
      if (value === "Welcome, Connie") {
        setCanvasState("welcome");
      } else if (value === "Welcome back, Connie") {
        setCanvasState("returning");
      } else if (value === "Welcome back, Daisy") {
        setCanvasState("returning-2");
      } else if (value === "VMs eligible for upgrade") {
        setCanvasState("vm-upgrade-plan");
      } else if (value === "Upgrade VMs to Easv6-series") {
        setCanvasState("vm-upgrading");
      } else if (value === "VM upgrade complete") {
        setCanvasState("vm-upgrade-complete");
      } else if (value === "Investigation summary") {
        setCanvasState("investigation-summary");
      } else if (value === "Resolution plan: Change NSG rule") {
        setCanvasState("resolution-plan");
      } else if (value === "Resolving Sev1 alert") {
        setCanvasState("sev1-resolving");
      } else if (value === "Resolution report: Change NSG rule") {
        setCanvasState("resolution-report");
      } else if (value === "Suggest services") {
        setCanvasState("services");
      } else if (value === "App Service deployment plan") {
        setCanvasState("deployment");
      } else if (value === "Deploy App Service") {
        setCanvasState("deploying");
      } else if (value === "Completed deployment") {
        setCanvasState("complete");
      }
      setIsTransitioning(false);
    }, 300);
  }, []);

  // Show loading state until styles are ready
  if (!isStylesLoaded) {
    return <div className={styles.loadingPlaceholder} />;
  }

  return (
    <div className={styles.container}>
      {showTopNav && (
        <TopNav
          activeLink="Home"
          experienceLevel={experienceLevel}
          onAgentModeChange={(enabled: boolean) => setAgentMode(enabled)}
          showAgentModeToggle={!showTopNav}
          agentModeEnabled={agentMode}
        />
      )}
      {!agentMode ? (
        <HpReturning
          experienceLevel={experienceLevel}
          onAgentModeChange={(enabled: boolean) => setAgentMode(enabled)}
          showAgentModeToggle={true}
          agentModeEnabled={agentMode}
        />
      ) : (
        <>
          {!showTopNav && (
            <TopNav
              activeLink="Home"
              experienceLevel={experienceLevel}
              onAgentModeChange={(enabled: boolean) => setAgentMode(enabled)}
              showAgentModeToggle={true}
              agentModeEnabled={agentMode}
            />
          )}

          <div className={styles.userInfo}>
            <div className={styles.creditBadge}>
              <span>💰</span>
              <span>$200 in credits available</span>
            </div>
            <div className={styles.avatar}>C</div>
          </div>

          <div className={styles.content}>
            {canvasState !== "welcome" &&
              canvasState !== "returning" &&
              canvasState !== "returning-2" &&
              !selectedCategory && (
                <CanvasHeader
                  historyItems={historyItems}
                  selectedHistory={selectedHistory}
                  onHistoryChange={handleHistoryChange}
                  onRefresh={handleRefresh}
                />
              )}

            <div className={isTransitioning ? styles.fadeOut : styles.fadeIn}>
              {selectedCategory === "agent-summary" ? (
                <AgentSummaryPanel onClose={() => setSelectedCategory(null)} />
              ) : (
                <>
                  {canvasState === "welcome" && (
                    <WelcomeCanvas
                      userName="Connie"
                      onLinkClick={handleLinkClick}
                      onPromptClick={handlePromptClick}
                    />
                  )}

                  {canvasState === "returning" && (
                    <WelcomeReturning
                      userName="Daisy"
                      messageSegments={[
                        {
                          text: "While you were away, I identified that your VMs are ",
                        },
                        {
                          text: "eligible for an upgrade",
                          isLink: true,
                          onClick: handleUpgradeClick,
                        },
                        {
                          text: " that can enhance performance and help prevent unexpected costs.",
                        },
                      ]}
                      secondaryMessage={[
                        {
                          text: "Additionally, two of your resources encountered critical outages. I resolved them using CLI commands—you can ",
                        },
                        {
                          text: "review the fix here.",
                          isLink: true,
                          onClick: () => console.log("Review fix clicked"),
                        },
                      ]}
                      prompts={[
                        "What else happened?",
                        "Report on the status of my VMs",
                        "Overview of resource utilization",
                        "Recommendations for optimization",
                      ]}
                      onPromptClick={handlePromptClick}
                    />
                  )}

                  {canvasState === "returning-2" && (
                    <WelcomeReturning2
                      userName="Daisy"
                      onPromptClick={handlePromptClick}
                    />
                  )}

                  {canvasState === "vm-upgrade-plan" && (
                    <VMUpgradePlan
                      onUpgrade={handleStartUpgrade}
                      onCancel={handleCancelUpgrade}
                    />
                  )}

                  {canvasState === "vm-upgrading" && (
                    <VMUpgradeProgress onComplete={handleUpgradeComplete} />
                  )}

                  {canvasState === "vm-upgrade-complete" && (
                    <VMUpgradeComplete onPromptClick={handlePromptClick} />
                  )}

                  {canvasState === "investigation-summary" && (
                    <InvestigationSummary onPromptClick={handlePromptClick} />
                  )}

                  {canvasState === "resolution-plan" && (
                    <ResolutionPlan
                      onApprove={handleApproveResolution}
                      onCancel={handleCancelResolution}
                    />
                  )}

                  {canvasState === "sev1-resolving" && (
                    <VMSev1Progress onComplete={handleSev1ResolutionComplete} />
                  )}

                  {canvasState === "resolution-report" && (
                    <ResolutionReport onPromptClick={handlePromptClick} />
                  )}

                  {canvasState === "services" && (
                    <ServiceRecommendations
                      onServiceSelect={handleServiceSelect}
                      customMessage={customRecommendationMessage}
                    />
                  )}

                  {canvasState === "deployment" && (
                    <DeploymentPlan
                      serviceName={selectedService}
                      onDeploy={handleDeploy}
                      onCancel={handleCancelDeployment}
                    />
                  )}

                  {canvasState === "deploying" && (
                    <DeploymentProgress
                      serviceName={selectedService}
                      onComplete={handleDeploymentComplete}
                    />
                  )}

                  {canvasState === "complete" && (
                    <DeploymentComplete
                      serviceName={selectedService}
                      resourceName="contoso-AI-app"
                      onPromptClick={handlePromptClick}
                    />
                  )}
                </>
              )}
            </div>

            <div className={styles.fadeIn}>
              <CanvasFooter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                onSparkleClick={() => setShowSparkleMenu(!showSparkleMenu)}
                onNavigateToRecommendations={() => {
                  setCustomRecommendationMessage(
                    "Here are a few services that I'd recommend for your startup—keeping costs low, setup easy, and ensuring scalability for future growth.",
                  );
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCanvasState("services");
                    setSelectedHistory("Service recommendations");
                    if (!historyItems.includes("Service recommendations")) {
                      setHistoryItems([
                        ...historyItems,
                        "Service recommendations",
                      ]);
                    }
                    setIsTransitioning(false);
                  }, 300);
                }}
                disablePanels={canvasState !== "welcome"}
              />
            </div>

            {showSparkleMenu && (
              <SparkleMenuPanel onClose={() => setShowSparkleMenu(false)} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
