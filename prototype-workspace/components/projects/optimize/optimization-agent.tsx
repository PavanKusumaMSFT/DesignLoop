"use client";

import React, { useState, useRef } from "react";
import { useConversationFlow } from "./use-conversation-flow";
import {
  CONVERSATION_TITLE,
  VM_REASONING_STEPS,
  VM_ARTIFACTS,
  POD_REASONING_STEPS,
  POD_ARTIFACTS,
  DEPLOYMENT_RESOURCES,
  USER_OPTIMIZATION_MESSAGE,
} from "./conversation-data";
import {
  TERRAFORM_CODE,
  BICEP_CODE,
  TERRAFORM_CLOUD_SHELL_COMMANDS,
  AZURE_CLI_CLOUD_SHELL_COMMANDS,
} from "./code-templates";
import FeedbackSection from "./feedback-section";
import CodeViewerPanel from "../../shared/code-viewer-panel";
import CloudShellPanel from "./cloud-shell-panel";
import AgentSidebar from "./agent-sidebar";
import AgentHeader from "./agent-header";
import ChatInputSection from "./chat-input-section";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  Text,
  Button,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Document24Regular,
  Info16Regular,
  Copy20Regular,
  ShieldLock16Regular,
  ShieldLock16Filled,
} from "@fluentui/react-icons";
import {
  CopilotProvider,
  CopilotChat,
  CopilotMessage,
  UserMessage,
  FeedbackButtons,
} from "@fluentui-copilot/react-copilot";

import ReasoningCard from "./reasoning-card";
import OptimizationRecommendations from "./optimization-recommendations";
import { DeploymentPlanCard } from "../../shared/deployment-plan-card";
import { DeploymentProgressCard } from "../../shared/deployment-progress-card";
import { DeploymentCompleteCard } from "../../shared/deployment-complete-card";
import ProjectCreationCard from "./project-creation-card";

const fadeIn = {
  from: { opacity: 0, transform: "translateY(10px)" },
  to: { opacity: 1, transform: "translateY(0)" },
};
const fadeInCards = {
  from: { opacity: 0, transform: "translateY(20px)" },
  to: { opacity: 1, transform: "translateY(0)" },
};

const useStyles = makeStyles({
  container: {
    position: "fixed",
    top: "48px",
    left: 0,
    right: 0,
    bottom: "80px", // Leave space for footer dock (matches pb-20 = 5rem = 80px)
    backgroundColor: tokens.colorNeutralBackground3,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 50, // Lower than footer's z-[100] (100)
  },
  contentWrapper: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
    height: "100%",
    minHeight: 0,
  },
  conversationPanel: {
    padding: "0 16px",
    paddingTop: "20px",
    maxWidth: "920px",
    margin: "0 auto",
    width: "100%",
  },
  responseContent: {
    flex: 1,
  },
  copilotLabel: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  responseTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "12px",
    display: "block",
  },
  responseDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.5",
    marginBottom: "12px",
    display: "block",
  },
  bulletList: {
    paddingLeft: "20px",
    marginBottom: "12px",
  },
  bulletItem: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.6",
    marginBottom: "4px",
  },
  costWarning: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginTop: "16px",
    marginBottom: "12px",
    display: "block",
  },
  sectionSubheader: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginTop: "16px",
    marginBottom: "8px",
    display: "block",
  },
  actionButtons: {
    display: "flex",
    gap: "8px",
    marginBottom: "12px",
    flexWrap: "wrap",
    "& button": {
      whiteSpace: "nowrap",
    },
  },
  lastReadDivider: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    margin: "40px 0",
    width: "100%",
  },
  lastReadLine: {
    flex: 1,
    height: "1px",
    backgroundColor: tokens.colorBrandForeground1,
  },
  lastReadText: {
    fontSize: "13px",
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground2,
    overflow: "hidden",
    height: "100%",
    minHeight: 0,
    position: "relative",
  },
  chatArea: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground2,
    flex: 1,
    overflow: "auto",
    padding: "0 60px",
    minHeight: 0,
    position: "relative",
  },
  messagesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    flex: 1,
    paddingBottom: "100px", // Add white space below deploy buttons
  },

  // --- Icon size classes ---
  iconSm: { width: "20px", height: "20px" },
  iconMd: { width: "24px", height: "24px" },
  iconSmMr6: { width: "20px", height: "20px", marginRight: "6px" },

  // --- Shield / info icon ---
  shieldWrapper: {
    position: "relative",
    display: "inline-block",
    width: "16px",
    height: "16px",
    flexShrink: 0,
  },
  shieldFilledPos: { position: "absolute", zIndex: 0 },
  shieldRegularPos: {
    position: "absolute",
    zIndex: 1,
    color: tokens.colorNeutralForeground1,
  },
  infoIconStyle: {
    color: tokens.colorNeutralForeground3,
    flexShrink: 0,
    cursor: "pointer",
  },

  // --- Agent name slot ---
  agentNameSlotStyle: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "nowrap" as const,
  },

  // --- CopilotMessage styles ---
  copilotMsgFadeIn: {
    animationName: fadeIn,
    animationDuration: "0.5s",
    animationTimingFunction: "ease-in",
  },
  copilotMsgFull: { width: "fit-content" },
  copilotMsgDocked: { width: "100%" },

  // --- Container variants ---
  containerDocked: {
    position: "relative" as const,
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    height: "100%",
    zIndex: "auto" as unknown as number,
    overflow: "hidden",
  },
  containerFull: { height: "calc(100vh - 48px)" },

  // --- Chat area docked ---
  chatAreaDockedStyle: { padding: "0 16px", paddingBottom: "140px" },
  messagesContainerDockedStyle: { paddingBottom: "16px" },
  copilotChatDockedStyle: { padding: "0", maxWidth: "none", margin: 0 },

  // --- Text block helpers ---
  textBlock: { display: "block" },
  textBlockMt4: { display: "block", marginTop: "4px" },
  textMb16: { marginBottom: "16px" },
  textMb16PreLine: { marginBottom: "16px", whiteSpace: "pre-line" },

  // --- Animations ---
  cardAnimateIn: {
    animationName: fadeInCards,
    animationDuration: "0.5s",
    animationTimingFunction: "ease-in",
    opacity: 1,
  },

});

interface AgentImmersiveProps {
  onClose?: () => void;
  initialPrompt?: string;
  initialMessage?: string;
  viewMode?: "list" | "bubbles" | "bubbles-history" | "bubbles-history-2";
  onViewModeChange?: (
    mode: "list" | "bubbles" | "bubbles-history" | "bubbles-history-2",
  ) => void;
  vmScenario?: 1 | 2;
  onVmScenarioChange?: (scenario: 1 | 2) => void;
  isDarkMode?: boolean;
  useTopNav?: boolean;
  customHeader?: React.ReactNode | null;
  onNavigate?: (page: string) => void;
  docked?: boolean;
  onDock?: () => void;
}

const OptimizationAgent: React.FC<AgentImmersiveProps> = ({
  onClose,
  initialPrompt,
  initialMessage,
  viewMode = "list",
  onViewModeChange,
  vmScenario = 1,
  onVmScenarioChange,
  isDarkMode = false,
  useTopNav = true,
  customHeader,
  onNavigate,
  docked = false,
  onDock,
}) => {
  const styles = useStyles();
  const [inputValue, setInputValue] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showCodePanel, setShowCodePanel] = useState(false);
  const [showCloudShell, setShowCloudShell] = useState(false);

  const chatAreaRef = useRef<HTMLDivElement>(null);

  const conversationTitle = CONVERSATION_TITLE;

  // Conversation flow state machine (all cascading visibility + handlers)
  const {
    showCopilotResponse,
    showOptimizationRecs,
    showRecsActions,
    showRec2Execution,
    showRec2ExecActions,
    showRec2Success,
    showDeploymentPlan,
    showDeploymentPlanCard,
    showDeploymentPlanFeedback,
    showDeploymentProgress,
    showDeploymentProgressCard,
    showDeploymentProgressFeedback,
    showDeploymentComplete,
    showLastReadDivider,
    showDeploymentCompleteCard,
    showDeploymentCompleteFeedback,
    showProjectCard,
    setShowOptimizationRecs,
    setShowRecsActions,
    setShowRec2Execution,
    setShowRec2ExecActions,
    setShowRec2Success,
    setShowProjectCard,
    handleApproveAndDeploy,
    handleDeploymentComplete,
    deploymentTypedText,
    deploymentProgressTypedText,
    deploymentCompleteTypedText,
  } = useConversationFlow({ chatAreaRef, useTopNav });

  // Shared CopilotMessage name content — children rendered inside the name slot div
  const agentNameContent = (
    <>
      <Text className={styles.copilotLabel}>
        {docked ? "Optimization" : "Optimization agent"}
      </Text>
      <span className={styles.shieldWrapper}>
        <ShieldLock16Filled
          primaryFill="orange"
          className={styles.shieldFilledPos}
        />
        <ShieldLock16Regular className={styles.shieldRegularPos} />
      </span>
      <Info16Regular className={styles.infoIconStyle} />
    </>
  );

  // Style applied directly to the name slot div so it becomes a flex container
  const agentNameSlotProps = {
    children: agentNameContent,
    className: styles.agentNameSlotStyle,
  };

  // Docked avatar uses 20x20 icon
  const dockedAvatarProps = docked
    ? {
        children: (
          <img
            src="/icons/AgentsColor.svg"
            alt="Optimization"
            className={styles.iconSm}
          />
        ),
      }
    : {
        children: (
          <img
            src="/icons/AgentsColor.svg"
            alt="Optimization agent"
            className={styles.iconMd}
          />
        ),
      };

  // CopilotMessage className: full-width when docked, fit-content when full-screen
  const copilotMessageClassName = mergeClasses(
    styles.copilotMsgFadeIn,
    docked ? styles.copilotMsgDocked : styles.copilotMsgFull,
  );

  return (
    <CopilotProvider>
      <div
        className={mergeClasses(
          styles.container,
          docked ? styles.containerDocked : styles.containerFull,
        )}
      >
        <div className={styles.contentWrapper}>
          {/* Left Sidebar */}
          <AgentSidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            isDarkMode={isDarkMode}
            docked={docked}
            conversationTitle={conversationTitle}
          />

          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Header */}
            <AgentHeader
              docked={docked}
              isSidebarCollapsed={isSidebarCollapsed}
              onToggleSidebar={() => setIsSidebarCollapsed(false)}
              conversationTitle={conversationTitle}
              onClose={onClose}
              onNavigate={onNavigate}
              isDarkMode={isDarkMode}
              customHeader={customHeader}
              useTopNav={useTopNav}
              onDock={onDock}
            />

            {/* Chat Area */}
            <div
              className={mergeClasses(
                styles.chatArea,
                docked ? styles.chatAreaDockedStyle : undefined,
              )}
              ref={chatAreaRef}
            >
              {docked && (
                <style>{`
                .docked-copilot-panel .fai-CopilotMessage__content,
                .docked-copilot-panel .fai-CopilotMessage__actions,
                .docked-copilot-panel .fai-CopilotMessage__footnote {
                  margin-left: 0 !important;
                  margin-right: 0 !important;
                  max-width: 100% !important;
                  overflow: hidden !important;
                }
              `}</style>
              )}
              <div
                className={mergeClasses(
                  styles.messagesContainer,
                  docked
                    ? mergeClasses(
                        styles.messagesContainerDockedStyle,
                        "docked-copilot-panel",
                      )
                    : undefined,
                )}
              >
                {/* Conversation Panel */}
                <CopilotChat
                  className={mergeClasses(
                    styles.conversationPanel,
                    docked ? styles.copilotChatDockedStyle : undefined,
                  )}
                >
                  {/* User Message */}
                  <UserMessage>
                    Apply rightsized requests with a 20% buffer
                  </UserMessage>

                  {/* Copilot Response */}
                  {showCopilotResponse && (
                    <CopilotMessage
                      className={copilotMessageClassName}
                      avatar={dockedAvatarProps}
                      name={agentNameSlotProps}
                      disclaimer={null}
                      actions={
                        showRecsActions
                          ? {
                              children: (
                                <>
                                  <Button
                                    appearance="subtle"
                                    size="small"
                                    icon={<Copy20Regular />}
                                  />
                                  <FeedbackButtons />
                                </>
                              ),
                            }
                          : undefined
                      }
                    >
                      <div className={styles.responseContent}>
                        {useTopNav ? (
                          // Infrastructure Agent view (Sitemap POC)
                          <>
                                <ReasoningCard
                                  steps={VM_REASONING_STEPS}
                                  artifacts={VM_ARTIFACTS}
                                  docked={docked}
                                  isActive={showCopilotResponse}
                                  onComplete={() => {
                                    setTimeout(() => {
                                      setShowOptimizationRecs(true);
                                      setTimeout(() => {
                                        if (chatAreaRef.current) {
                                          chatAreaRef.current.scrollTo({
                                            top: chatAreaRef.current
                                              .scrollHeight,
                                            behavior: "smooth",
                                          });
                                        }
                                      }, 100);
                                    }, 600);
                                  }}
                                />
                                {showOptimizationRecs && (
                                  <OptimizationRecommendations
                                    onComplete={() => setShowRecsActions(true)}
                                    onRun={() => {
                                      setShowRec2Execution(true);
                                      setTimeout(() => {
                                        if (chatAreaRef.current) {
                                          chatAreaRef.current.scrollTo({
                                            top: chatAreaRef.current
                                              .scrollHeight,
                                            behavior: "smooth",
                                          });
                                        }
                                      }, 100);
                                    }}
                                    onScrollRequest={() => {
                                      if (chatAreaRef.current) {
                                        chatAreaRef.current.scrollTo({
                                          top: chatAreaRef.current.scrollHeight,
                                          behavior: "smooth",
                                        });
                                      }
                                    }}
                                  />
                                )}
                          </>
                        ) : (
                          // VM1 Clone view (Search/Usertest)
                          <>
                            <Text className={styles.responseTitle}>
                              VM01 Clone Configuration
                            </Text>

                            <Text className={styles.responseDescription}>
                              I can help you create an identical copy of VM01,
                              including its configuration, disks, and network
                              settings. The cloned VM will be created in the
                              same resource group with a new name.
                            </Text>

                            <Text className={styles.sectionSubheader}>
                              What will be cloned:
                            </Text>

                            <ul className={styles.bulletList}>
                              <li className={styles.bulletItem}>
                                VM size and configuration (Standard_D2s_v3)
                              </li>
                              <li className={styles.bulletItem}>
                                Operating system disk and data disks
                              </li>
                              <li className={styles.bulletItem}>
                                Network interface and security group settings
                              </li>
                              <li className={styles.bulletItem}>
                                Tags and metadata
                              </li>
                            </ul>

                            <div className={styles.costWarning}>
                              <strong>Note:</strong> Cloning will create new
                              resources and incur additional costs
                            </div>

                            <Text className={styles.sectionSubheader}>
                              Recommended next steps:
                            </Text>

                            <ul className={styles.bulletList}>
                              <li className={styles.bulletItem}>
                                Choose a name for the cloned VM
                              </li>
                              <li className={styles.bulletItem}>
                                Select target resource group (default: same as
                                VM01)
                              </li>
                              <li className={styles.bulletItem}>
                                Review and confirm configuration
                              </li>
                            </ul>

                            <div className={styles.actionButtons}>
                              <Button appearance="primary">Clone VM</Button>
                              <Button
                                appearance="outline"
                                onClick={() => setShowCodePanel(!showCodePanel)}
                              >
                                <Document24Regular
                                  className={styles.iconSmMr6}
                                />
                                View Bicep template
                              </Button>
                              <Button
                                appearance="outline"
                                onClick={() =>
                                  setShowCloudShell(!showCloudShell)
                                }
                              >
                                Open CloudShell
                              </Button>
                            </div>
                          </>
                        )}

                      </div>
                    </CopilotMessage>
                  )}

                  {/* Rec 2 Execution (after clicking Run on recommendation 2) */}
                  {showRec2Execution && (
                    <>
                      <UserMessage>
                        {USER_OPTIMIZATION_MESSAGE}
                      </UserMessage>
                      <CopilotMessage
                        className={copilotMessageClassName}
                        avatar={dockedAvatarProps}
                        name={agentNameSlotProps}
                        disclaimer={null}
                        actions={
                          showRec2ExecActions
                            ? {
                                children: (
                                  <>
                                    <Button
                                      appearance="subtle"
                                      size="small"
                                      icon={<Copy20Regular />}
                                    />
                                    <FeedbackButtons />
                                  </>
                                ),
                              }
                            : undefined
                        }
                      >
                        <div className={styles.responseContent}>
                          <ReasoningCard
                            title="Reasoning"
                            steps={POD_REASONING_STEPS}
                            artifacts={POD_ARTIFACTS}
                            docked={docked}
                            isActive={showRec2Execution}
                            onComplete={() => {
                              setShowRec2ExecActions(true);
                              setTimeout(() => {
                                setShowRec2Success(true);
                                setTimeout(() => {
                                  if (chatAreaRef.current) {
                                    chatAreaRef.current.scrollTo({
                                      top: chatAreaRef.current.scrollHeight,
                                      behavior: "smooth",
                                    });
                                  }
                                }, 100);
                              }, 600);
                            }}
                          />
                        </div>
                      </CopilotMessage>
                    </>
                  )}

                  {/* Rec 2 Execution Success */}
                  {showRec2Success && (
                    <CopilotMessage
                      className={copilotMessageClassName}
                      avatar={dockedAvatarProps}
                      name={agentNameSlotProps}
                      disclaimer={null}
                      actions={{
                        children: (
                          <>
                            <Button
                              appearance="subtle"
                              size="small"
                              icon={<Copy20Regular />}
                            />
                            <FeedbackButtons />
                          </>
                        ),
                      }}
                    >
                      <div className={styles.responseContent}>
                        <Text weight="semibold" className={styles.textBlock}>
                          Pods rightsized successfully
                        </Text>
                        <Text className={styles.textBlockMt4}>
                          CPU and memory requests were updated to better match
                          observed usage, with a 20% buffer applied. This frees
                          up cluster capacity while maintaining workload
                          stability and performance.
                        </Text>
                      </div>
                    </CopilotMessage>
                  )}

                  {/* Deployment Plan */}
                  {showDeploymentPlan && (
                    <>
                      {/* User Message */}
                      <UserMessage data-message="deploy-container-app">
                        Create deployment plan
                      </UserMessage>

                      {/* Copilot Response with Deployment Plan */}
                      <CopilotMessage
                        className={copilotMessageClassName}
                        avatar={{
                          children: (
                            <img
                              src="/icons/AgentsColor.svg"
                              alt="Optimization agent"
                              className={styles.iconMd}
                            />
                          ),
                        }}
                        name={agentNameSlotProps}
                        disclaimer={null}
                      >
                        <div className={styles.responseContent}>
                          <Text className={styles.textMb16}>
                            {deploymentTypedText}
                          </Text>

                          {/* Show deployment plan card after typing completes */}
                          {showDeploymentPlanCard && (
                            <div className={styles.cardAnimateIn}>
                              <DeploymentPlanCard
                                serviceName="containerized web app"
                                region=""
                                pricingTier=""
                                estimatedCost=""
                                usersSupported=""
                                onApprove={handleApproveAndDeploy}
                                onInviteColleagues={() => {}}
                                onAddSupport={() => {}}
                                isDeployDisabled={showDeploymentProgressCard}
                              />
                            </div>
                          )}

                          {/* Feedback buttons for deployment plan */}
                          {showDeploymentPlanFeedback && (
                            <FeedbackSection isDarkMode={isDarkMode} />
                          )}
                        </div>
                      </CopilotMessage>
                    </>
                  )}

                  {/* Deployment Progress Section */}
                  {showDeploymentProgress && (
                    <>
                      {/* User message for approve and deploy */}
                      <UserMessage data-message="approve-deploy">
                        Approve and deploy
                      </UserMessage>

                      {/* Copilot response with deployment progress */}
                      <CopilotMessage
                        className={copilotMessageClassName}
                        avatar={{
                          children: (
                            <img
                              src="/icons/AgentsColor.svg"
                              alt="Optimization agent"
                              className={styles.iconMd}
                            />
                          ),
                        }}
                        name={agentNameSlotProps}
                        disclaimer={null}
                      >
                        <div className={styles.responseContent}>
                          <Text className={styles.textMb16}>
                            {deploymentProgressTypedText}
                          </Text>

                          {/* Show deployment progress card after typing completes */}
                          {showDeploymentProgressCard && (
                            <div className={styles.cardAnimateIn}>
                              <DeploymentProgressCard
                                serviceName="containerized web app"
                                title="Deploying containerized web app"
                                steps={[
                                  "Provisioning Azure App Services for your React frontend and Node.js backend",
                                  "Configuring container deployment and CI/CD pipelines",
                                  "Creating Azure Cosmos DB with MongoDB API",
                                  "Enabling Application Insights monitoring",
                                  "Applying security best practices and RBAC",
                                  "Validating deployment and running health checks",
                                ]}
                                initialTimeElapsed={12}
                                artifactsCreated={0}
                                estTimeRemaining="24-30 minutes"
                                costToUse="$0.24/minute"
                                onComplete={handleDeploymentComplete}
                              />
                            </div>
                          )}

                          {/* Feedback buttons for deployment progress */}
                          {showDeploymentProgressFeedback && (
                            <FeedbackSection isDarkMode={isDarkMode} />
                          )}
                        </div>
                      </CopilotMessage>
                    </>
                  )}

                  {/* Deployment Complete Section */}
                  {showDeploymentComplete && (
                    <>
                      {/* "Last read" divider */}
                      {showLastReadDivider && (
                        <div
                          className={styles.lastReadDivider}
                          data-message="deployment-complete"
                        >
                          <div className={styles.lastReadLine}></div>
                          <span className={styles.lastReadText}>Last read</span>
                          <div className={styles.lastReadLine}></div>
                        </div>
                      )}

                      {/* Copilot response with deployment complete */}
                      <CopilotMessage
                        className={copilotMessageClassName}
                        avatar={{
                          children: (
                            <img
                              src="/icons/AgentsColor.svg"
                              alt="Optimization agent"
                              className={styles.iconMd}
                            />
                          ),
                        }}
                        name={agentNameSlotProps}
                        disclaimer={null}
                      >
                        <div className={styles.responseContent}>
                          <Text className={styles.textMb16PreLine}>
                            {deploymentCompleteTypedText}
                          </Text>

                          {/* Show deployment complete card after typing completes */}
                          {showDeploymentCompleteCard && (
                            <div className={styles.cardAnimateIn}>
                              <DeploymentCompleteCard
                                resources={DEPLOYMENT_RESOURCES}
                                onViewManage={() =>
                                  onNavigate?.("manage-content-2")
                                }
                              />
                            </div>
                          )}

                          {/* Feedback buttons for deployment complete */}
                          {showDeploymentCompleteFeedback && (
                            <FeedbackSection isDarkMode={isDarkMode} />
                          )}
                        </div>
                      </CopilotMessage>
                    </>
                  )}

                  {/* Project Creation Card */}
                  {showProjectCard && (
                    <CopilotMessage
                      className={copilotMessageClassName}
                      avatar={{
                        children: (
                          <img
                            src="/icons/AgentsColor.svg"
                            alt="Optimization agent"
                            className={styles.iconMd}
                          />
                        ),
                      }}
                      name={agentNameSlotProps}
                      disclaimer={null}
                    >
                      <div className={styles.responseContent}>
                        <ProjectCreationCard
                          isDarkMode={isDarkMode}
                          onProjectCreated={() => setShowCloudShell(true)}
                          onSkip={() => setShowProjectCard(false)}
                        />

                        <FeedbackSection isDarkMode={isDarkMode} animated={false} />
                      </div>
                    </CopilotMessage>
                  )}
                </CopilotChat>
              </div>

              {/* Input Section - sticky at bottom of chatArea */}
              {!docked && (
                <ChatInputSection
                  docked={false}
                  inputValue={inputValue}
                  onInputChange={setInputValue}
                  isSending={
                    (showCopilotResponse && !showRecsActions) ||
                    (showRec2Execution && !showRec2Success)
                  }
                />
              )}
            </div>

            {/* Input Section - absolute at bottom of mainContent for docked mode */}
            {docked && (
              <ChatInputSection
                docked={true}
                inputValue={inputValue}
                onInputChange={setInputValue}
                isSending={
                  (showCopilotResponse && !showRecsActions) ||
                  (showRec2Execution && !showRec2Success)
                }
              />
            )}
          </div>

          {/* Code Panel */}
          <CodeViewerPanel
            isOpen={showCodePanel}
            onClose={() => setShowCodePanel(false)}
            title={
              useTopNav
                ? "Terraform script: main.tf"
                : "Bicep template: vm-clone.bicep"
            }
            code={useTopNav ? TERRAFORM_CODE : BICEP_CODE}
          />

          {/* CloudShell Panel */}
          <CloudShellPanel
            isOpen={showCloudShell}
            onClose={() => setShowCloudShell(false)}
            commands={
              useTopNav
                ? TERRAFORM_CLOUD_SHELL_COMMANDS
                : AZURE_CLI_CLOUD_SHELL_COMMANDS
            }
            multiLineCommands={!useTopNav}
          />
        </div>

      </div>
    </CopilotProvider>
  );
};

export default React.memo(OptimizationAgent);
