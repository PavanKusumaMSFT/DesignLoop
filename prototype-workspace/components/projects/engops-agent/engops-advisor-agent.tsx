"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  Button,
} from "@fluentui/react-components"
import {
  Info16Regular,
  Copy20Regular,
  ShieldLock16Filled,
  ShieldLock16Regular,
} from "@fluentui/react-icons"
import {
  CopilotProvider,
  CopilotChat,
  CopilotMessage,
  UserMessage,
} from "@fluentui-copilot/react-copilot"
import AgentLayout from "../../shared/agent-layout"
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp"
import AgentHeader from "../optimize/agent-header"
import AgentSidebar from "../optimize/agent-sidebar"
import ChatInputSection from "../optimize/chat-input-section"
import FeedbackSection from "../optimize/feedback-section"
import type { ReasoningStep } from "../optimize/reasoning-card"
import EngopsScopePicker from "./engops-scope-picker"
import EngopsResultsView from "./engops-results-view"
import { MOCK_SUBSCRIPTIONS, MOCK_RESOURCE_GROUPS } from "./engops-scope-data"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

/** Which seeded conversation to open with. */
export type EngopsIntent = "agent" | "retirements" | "resiliency"

export interface EngopsAdvisorAgentProps {
  intent: EngopsIntent
  onClose?: () => void
  isDarkMode?: boolean
  docked?: boolean
  /** True when the docked panel is widened. Controls the expand/collapse icon. */
  isExpanded?: boolean
  /** Called when the user clicks the expand/collapse button in the header. */
  onToggleExpand?: () => void
  /** Called when the user clicks expand in the docked header to navigate to a full-screen immersive agent. Takes precedence over onToggleExpand. */
  onExpandToImmersive?: () => void
  /** Prior scope selection to rehydrate the agent with (skips the scope picker and jumps straight to results). */
  initialScope?: { subscriptions: string[]; resourceGroups: string[] } | null
  /** Called when the user submits a scope from the picker (so the parent can persist it). */
  onScopeSubmitted?: (sel: { subscriptions: string[]; resourceGroups: string[] }) => void
}

interface SeededConversation {
  userMessage: string
  conversationTitle: string
  response: string
  reasoningSteps: ReasoningStep[]
}

const SEEDS: Record<EngopsIntent, SeededConversation> = {
  agent: {
    conversationTitle: "EngOps Advisor",
    userMessage: "Give me a prioritized plan for my critical workloads.",
    response:
      "Using your selected scopes, I found:\n\n• 2 critical retirement risks on workloads tagged criticality=tier-0.\n• 4 resiliency gaps increasing blast radius for rg-payments-api.\n• 11 impacted resources — 7 can be auto-remediated.\n\nI'll draft a ready-to-run plan and track progress to completion.",
    reasoningSteps: [
      { name: "Scanning selected scopes", desc: "Enumerating resources in your picked subscriptions and resource groups" },
      { name: "Cross-referencing retirement calendar", desc: "Matching resources to upcoming Azure deadlines" },
      { name: "Scoring resiliency exposure", desc: "Ranking gaps by blast radius and SLO impact" },
      { name: "Assembling execution plan", desc: "Preparing auto-remediation and human-in-the-loop steps" },
    ],
  },
  retirements: {
    conversationTitle: "Service retirements",
    userMessage: "What's retiring in my subscriptions?",
    response:
      "Across your selected scopes, I found 18 resources affected by upcoming Azure retirements.\n\nImmediate attention (next 90 days):\n• Classic Application Gateway — 4 resources, deadline Aug 31, 2026.\n• Azure AD Graph API — 2 apps calling deprecated endpoints.\n• Ubuntu 18.04 LTS VMs — 6 instances past end-of-support.\n\nI can draft a migration plan grouped by workload and deadline.",
    reasoningSteps: [
      { name: "Fetching retirement calendar", desc: "Loading Azure service retirement feed" },
      { name: "Matching resources", desc: "Comparing ARM inventory against retiring SKUs" },
      { name: "Ranking by deadline and impact", desc: "Weighting by criticality tag and usage" },
      { name: "Drafting migration plan", desc: "Grouping resources by workload boundaries" },
    ],
  },
  resiliency: {
    conversationTitle: "Resiliency posture",
    userMessage: "Where are my critical workloads exposed?",
    response:
      "Within your selected scopes, I identified 7 high-impact resiliency gaps.\n\nHighest impact:\n• rg-payments-api — no zonal redundancy on primary SQL instance.\n• rg-identity-services — single-region AKS, RTO exceeds SLO.\n• 3 unprotected storage accounts missing GRS.\n\nClosing these gaps would raise zonal resiliency from 50% → 86%.",
    reasoningSteps: [
      { name: "Evaluating zonal redundancy", desc: "Checking deployment topology across AZs" },
      { name: "Simulating failure scenarios", desc: "Estimating RTO/RPO for critical workloads" },
      { name: "Cross-referencing SLOs", desc: "Comparing measured resiliency to targets" },
      { name: "Ranking improvements", desc: "Ordering by impact per effort" },
    ],
  },
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    minHeight: 0,
    backgroundColor: tokens.colorNeutralBackground2,
    position: "relative",
    overflow: "hidden",
  },
  chatArea: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "hidden",
    backgroundColor: tokens.colorNeutralBackground2,
    padding: "0 16px",
    paddingBottom: "140px",
    position: "relative",
    minWidth: 0,
  },
  conversation: {
    padding: 0,
    margin: 0,
    maxWidth: "none",
  },
  messagesContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    flex: 1,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
  },
  copilotMsg: {
    width: "100%",
  },
  response: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase400,
    whiteSpace: "pre-line",
    display: "block",
    marginTop: tokens.spacingVerticalS,
  },
  agentNameSlot: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  copilotLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  shieldWrapper: {
    position: "relative",
    display: "inline-flex",
    width: "16px",
    height: "16px",
  },
  shieldPos: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  infoIcon: {
    color: tokens.colorNeutralForeground3,
  },
  iconSm: {
    width: "20px",
    height: "20px",
  },
  scopeSummary: {
    marginTop: tokens.spacingVerticalS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    fontStyle: "italic",
  },
})

/** Docked EngOps Advisor agent — reuses optimization-agent's header, chat input, reasoning, and feedback chrome. */
export default function EngopsAdvisorAgent({
  intent,
  onClose,
  isDarkMode = false,
  docked = true,
  isExpanded = false,
  onToggleExpand,
  onExpandToImmersive,
  initialScope = null,
  onScopeSubmitted,
}: EngopsAdvisorAgentProps) {
  const styles = useStyles()
  const chatAreaRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(docked)

  const seed = SEEDS[intent]

  // Flow: scope picker → (continue) → reasoning + response.
  // If an initialScope is provided (persisted from a prior session), rehydrate into the results state.
  const [scopeSubmitted, setScopeSubmitted] = useState<boolean>(!!initialScope)
  const [selectedCounts, setSelectedCounts] = useState<{
    subs: number
    rgs: number
  } | null>(
    initialScope
      ? { subs: initialScope.subscriptions.length, rgs: initialScope.resourceGroups.length }
      : null,
  )

  // Reset on intent change, but preserve rehydrated scope if provided
  useEffect(() => {
    setScopeSubmitted(!!initialScope)
    setSelectedCounts(
      initialScope
        ? { subs: initialScope.subscriptions.length, rgs: initialScope.resourceGroups.length }
        : null,
    )
    setInputValue("")
    if (chatAreaRef.current) chatAreaRef.current.scrollTop = 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intent])

  const handleSend = () => {
    if (!inputValue.trim()) return
    setIsSending(true)
    setTimeout(() => {
      setInputValue("")
      setIsSending(false)
    }, 400)
  }

  const handleScopeContinue = (sel: {
    subscriptions: string[]
    resourceGroups: string[]
  }) => {
    setSelectedCounts({
      subs: sel.subscriptions.length,
      rgs: sel.resourceGroups.length,
    })
    setScopeSubmitted(true)
    onScopeSubmitted?.(sel)
  }

  const agentNameContent = (
    <div className={styles.agentNameSlot}>
      <Text className={styles.copilotLabel}>EngOps Advisor</Text>
      <span className={styles.shieldWrapper} aria-hidden>
        <ShieldLock16Filled primaryFill="orange" className={styles.shieldPos} />
        <ShieldLock16Regular className={styles.shieldPos} />
      </span>
      <Info16Regular className={styles.infoIcon} />
    </div>
  )

  const agentAvatarProps = {
    children: (
      <img
        src="/icons/AgentsColor.svg"
        alt="EngOps Advisor"
        className={styles.iconSm}
      />
    ),
  }

  // Shared chat content (used by both docked and full-screen renderings).
  const chatContent = (
    <>
      {/* CopilotMessage default indents cause h-scroll in a narrow sidecar —
          mirror the override OptimizationAgent uses in docked mode. */}
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
      <div className={`${styles.messagesContainer} docked-copilot-panel`}>
        <CopilotChat className={styles.conversation}>
          <UserMessage>{seed.userMessage}</UserMessage>

          <CopilotMessage
            className={styles.copilotMsg}
            avatar={agentAvatarProps}
            name={{ children: agentNameContent }}
            disclaimer={null}
            actions={
              scopeSubmitted
                ? {
                    children: (
                      <Button
                        appearance="subtle"
                        size="small"
                        icon={<Copy20Regular />}
                      />
                    ),
                  }
                : undefined
            }
          >
            {!scopeSubmitted ? (
              <EngopsScopePicker
                subscriptions={MOCK_SUBSCRIPTIONS}
                resourceGroups={MOCK_RESOURCE_GROUPS}
                maxSelection={10}
                onContinue={handleScopeContinue}
                onCancel={onClose}
              />
            ) : (
              selectedCounts && (
                <>
                  <EngopsResultsView
                    selectedCounts={selectedCounts}
                    onChangeScope={() => {
                      setScopeSubmitted(false)
                      setSelectedCounts(null)
                    }}
                    onFollowUp={(p) => setInputValue(p)}
                  />
                  <FeedbackSection isDarkMode={isDarkMode} />
                </>
              )
            )}
          </CopilotMessage>
        </CopilotChat>
      </div>
    </>
  )

  const inputBar = (
    <ChatInputSection
      docked={docked}
      inputValue={inputValue}
      onInputChange={setInputValue}
      isSending={isSending}
      onSend={handleSend}
      agentName="EngOps Advisor"
    />
  )

  // Full-screen: use the shared AgentLayout shell (fixed viewport container,
  // sticky input slot, optional sidebar). Pass AgentSidebar as the sidebar so
  // we keep the Optimization-agent-style Agents/Chats nav, and use `bare` on
  // ChatInputSection so AgentLayout's sticky input slot isn't double-wrapped.
  if (!docked) {
    return (
      <AgentLayout
        header={<AzureHeaderBuildMVP activeLink="Home" hideManage />}
        sidebar={
          <AgentSidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed((c) => !c)}
            isDarkMode={isDarkMode}
            docked={false}
            conversationTitle={seed.conversationTitle}
            showAgents={false}
          />
        }
        chatTitle={`EngOps Advisor › ${seed.conversationTitle}`}
        onClose={onClose}
        inputBar={
          <ChatInputSection
            docked={false}
            bare
            inputValue={inputValue}
            onInputChange={setInputValue}
            isSending={isSending}
            onSend={handleSend}
            agentName="EngOps Advisor"
          />
        }
        contentMaxWidth="920px"
      >
        {chatContent}
      </AgentLayout>
    )
  }

  // Docked sidecar: keep the optimize-style AgentHeader + ChatInputSection composition.
  return (
    <CopilotProvider>
      <div className={mergeClasses(styles.root)}>
        <AgentHeader
          docked={docked}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleSidebar={() => setIsSidebarCollapsed((c) => !c)}
          conversationTitle={seed.conversationTitle}
          onClose={onClose}
          isDarkMode={isDarkMode}
          useTopNav={false}
          customHeader={null}
          agentTitle="EngOps Advisor"
          /* AgentHeader's docked mode wires its FullScreenMaximize button to
             onNavigate("optimization-agent"). Reuse that hook: prefer
             navigating to the full-screen immersive agent, otherwise fall
             back to toggling the docked panel's width. */
          onNavigate={
            onExpandToImmersive
              ? () => onExpandToImmersive()
              : onToggleExpand
              ? () => onToggleExpand()
              : undefined
          }
        />
        <div className={styles.chatArea} ref={chatAreaRef}>
          {chatContent}
        </div>
        {inputBar}
      </div>
    </CopilotProvider>
  )
}
