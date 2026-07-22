"use client";

import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Avatar,
  PresenceBadge,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Dismiss24Regular,
  ArrowLeft20Regular,
  Circle12Filled,
} from "@fluentui/react-icons";
import { useState } from "react";

const useStyles = makeStyles({
  container: {
    padding: "20px 40px 40px",
    maxWidth: "1000px",
    margin: "0 auto",
    width: "100%",
    paddingTop: "20px",
  },
  panel: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "18px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)",
    marginBottom: "20px",
    animationName: {
      "0%": {
        opacity: "0",
        transform: "scale(0.95)",
      },
      "100%": {
        opacity: "1",
        transform: "scale(1)",
      },
    },
    animationDuration: "0.4s",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 32px 16px",
  },
  title: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  closeButton: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: tokens.colorNeutralForeground2,
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1,
    },
  },
  tabs: {
    display: "flex",
    gap: "8px",
    padding: "0 32px",
    marginBottom: "16px",
  },
  tab: {
    padding: "6px 12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "16px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    transition: "all 0.2s",
    fontWeight: tokens.fontWeightRegular,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1,
    },
  },
  tabActive: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  content: {
    padding: "0 32px 24px",
    maxHeight: "400px",
    overflowY: "auto",
  },
  agentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  agentCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "16px",
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    transition: "all 0.2s",
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      border: `1px solid ${tokens.colorNeutralStroke1}`,
    },
  },
  avatarContainer: {
    position: "relative",
    flexShrink: 0,
  },
  avatarWithImageContainer: {
    "& > div": {
      backgroundColor: "white !important",
    },
    "& img": {
      backgroundColor: "white !important",
    },
  },
  agentInfo: {
    flex: 1,
    minWidth: 0,
  },
  agentName: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "4px",
  },
  agentDescription: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.4",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  },
  agentStatus: {
    fontSize: "11px",
    color: tokens.colorNeutralForeground3,
    marginTop: "4px",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    color: tokens.colorNeutralForeground3,
    fontSize: "14px",
    padding: 0,
    transition: "all 0.2s",
    ":hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  detailTabs: {
    display: "flex",
    gap: "8px",
    padding: "0 32px",
    marginBottom: "8px",
  },
  detailTab: {
    padding: "6px 12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "16px",
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    transition: "all 0.2s",
    fontWeight: tokens.fontWeightRegular,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1,
    },
  },
  detailTabActive: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  detailContent: {
    padding: "24px 32px",
  },
  currentTask: {
    backgroundColor: "rgba(59, 130, 246, 0.08)",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "24px",
  },
  taskLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "8px",
    fontWeight: tokens.fontWeightSemibold,
  },
  taskText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.5",
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
  },
  taskIcon: {
    color: tokens.colorBrandForeground1,
    marginTop: "2px",
  },
  statsSection: {
    display: "grid",
    gridTemplateColumns: "160px 1fr",
    gap: "24px",
  },
  statsLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "16px 12px",
    borderRadius: "8px",
    minHeight: "70px",
    cursor: "pointer",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  statItemActive: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  statLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    textAlign: "center",
  },
  statValue: {
    fontSize: "18px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
  },
  statsRight: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  description: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.6",
    marginBottom: "16px",
  },
  activityTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeader: {
    textAlign: "left",
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightSemibold,
    padding: "8px 0",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tableRow: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tableCell: {
    padding: "12px 0",
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
  },
  agentDetailNameWrapper: {
    padding: "0 32px 16px",
  },
  avatarWhiteBg: {
    backgroundColor: "white",
  },
});

interface AgentSummaryPanelProps {
  onClose: () => void;
}

export default function AgentSummaryPanel({ onClose }: AgentSummaryPanelProps) {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState("overview");
  const [selectedStat, setSelectedStat] = useState("accuracy");

  const agents = [
    {
      name: "VM Operator",
      description:
        "I'm working on upgrading your VMs subscriptions in an effort to improve CPU usage and prevent an unexpected price increase.",
      status: "active",
      image: "/icons/AgentsColor.svg",
      lastActive: "Active now",
    },
    {
      name: "Backup Specialist",
      description:
        "I'm implementing a new backup strategy to ensure your data remains safe and recoverable in case of failure.",
      status: "active",
      icon: "💾",
      lastActive: "Active now",
    },
    {
      name: "Cloud Architect",
      description:
        "I'm implementing a new backup strategy to ensure your data remains safe and recoverable in case of failure.",
      status: "idle",
      icon: "☁️",
      lastActive: "Last active 2h ago",
    },
    {
      name: "Kubernetes Troubleshooter",
      description:
        "I'm implementing a new backup strategy to ensure your data remains safe and recoverable in case of failure.",
      status: "idle",
      icon: "⚙️",
      lastActive: "Last active 2h ago",
    },
    {
      name: "Global Security Specialist",
      description:
        "I'm implementing a new backup strategy to ensure your data remains safe and recoverable in case of failure.",
      status: "idle",
      icon: "🔒",
      lastActive: "Last active 2h ago",
    },
    {
      name: "Infrastructure Manager",
      description:
        "I'm implementing a new backup strategy to ensure your data remains safe and recoverable in case of failure.",
      status: "idle",
      icon: "🏗️",
      lastActive: "Last active yesterday",
    },
    {
      name: "VM Operator",
      description: "Last active 4m ago",
      status: "idle",
      icon: "🤖",
      lastActive: "Last active 4m ago",
    },
    {
      name: "Cloud Architect",
      description: "Last active 2h ago",
      status: "idle",
      icon: "☁️",
      lastActive: "Last active 2h ago",
    },
    {
      name: "Infrastructure Manager",
      description: "Running",
      status: "active",
      icon: "🏗️",
      lastActive: "Running",
    },
  ];

  // If an agent is selected, show detail view
  if (selectedAgent) {
    return (
      <div className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <button
                className={styles.backButton}
                onClick={() => setSelectedAgent(null)}
                aria-label="Back"
              >
                <ArrowLeft20Regular />
                <span>Agent summary</span>
              </button>
            </div>
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close"
            >
              <Dismiss24Regular />
            </button>
          </div>

          <div className={styles.agentDetailNameWrapper}>
            <div className={styles.title}>{selectedAgent}</div>
          </div>

          <div className={styles.detailTabs}>
            <button
              className={`${styles.detailTab} ${detailTab === "overview" ? styles.detailTabActive : ""}`}
              onClick={() => setDetailTab("overview")}
            >
              Overview
            </button>
            <button
              className={`${styles.detailTab} ${detailTab === "chat" ? styles.detailTabActive : ""}`}
              onClick={() => setDetailTab("chat")}
            >
              Chat
            </button>
            <button
              className={`${styles.detailTab} ${detailTab === "activity" ? styles.detailTabActive : ""}`}
              onClick={() => setDetailTab("activity")}
            >
              Activity log
            </button>
            <button
              className={`${styles.detailTab} ${detailTab === "training" ? styles.detailTabActive : ""}`}
              onClick={() => setDetailTab("training")}
            >
              Training
            </button>
            <button
              className={`${styles.detailTab} ${detailTab === "compliance" ? styles.detailTabActive : ""}`}
              onClick={() => setDetailTab("compliance")}
            >
              Compliance
            </button>
            <button
              className={`${styles.detailTab} ${detailTab === "collaborators" ? styles.detailTabActive : ""}`}
              onClick={() => setDetailTab("collaborators")}
            >
              Collaborators
            </button>
            <button
              className={`${styles.detailTab} ${detailTab === "settings" ? styles.detailTabActive : ""}`}
              onClick={() => setDetailTab("settings")}
            >
              Settings
            </button>
          </div>

          <div className={styles.detailContent}>
            <div className={styles.currentTask}>
              <div className={styles.taskLabel}>Current task</div>
              <div className={styles.taskText}>
                <Circle12Filled className={styles.taskIcon} />
                <span>
                  I'm working on upgrading your VMs subscriptions in an effort
                  to improve CPU usage and prevent an unexpected price increase.
                </span>
              </div>
            </div>

            <div className={styles.statsSection}>
              <div className={styles.statsLeft}>
                <div
                  className={`${styles.statItem} ${selectedStat === "accuracy" ? styles.statItemActive : ""}`}
                  onClick={() => setSelectedStat("accuracy")}
                >
                  <div className={styles.statLabel}>Accuracy</div>
                  <div className={styles.statValue}>94.5%</div>
                </div>
                <div
                  className={`${styles.statItem} ${selectedStat === "completion" ? styles.statItemActive : ""}`}
                  onClick={() => setSelectedStat("completion")}
                >
                  <div className={styles.statLabel}>Task completion rate</div>
                  <div className={styles.statValue}>76%</div>
                </div>
                <div
                  className={`${styles.statItem} ${selectedStat === "cost" ? styles.statItemActive : ""}`}
                  onClick={() => setSelectedStat("cost")}
                >
                  <div className={styles.statLabel}>Estimated daily cost</div>
                  <div className={styles.statValue}>$13.80</div>
                </div>
                <div
                  className={`${styles.statItem} ${selectedStat === "memory" ? styles.statItemActive : ""}`}
                  onClick={() => setSelectedStat("memory")}
                >
                  <div className={styles.statLabel}>Daily memory usage</div>
                  <div className={styles.statValue}>36 MB RAM</div>
                </div>
                <div
                  className={`${styles.statItem} ${selectedStat === "satisfaction" ? styles.statItemActive : ""}`}
                  onClick={() => setSelectedStat("satisfaction")}
                >
                  <div className={styles.statLabel}>
                    User satisfaction score
                  </div>
                  <div className={styles.statValue}>89%</div>
                </div>
              </div>

              <div className={styles.statsRight}>
                <div className={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Excepteur
                  sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </div>

                <table className={styles.activityTable}>
                  <thead>
                    <tr>
                      <th className={styles.tableHeader}>Date</th>
                      <th className={styles.tableHeader}>Confidence</th>
                      <th className={styles.tableHeader}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.tableRow}>
                      <td className={styles.tableCell}>9/20/2025, 11:59 PM</td>
                      <td className={styles.tableCell}>100%</td>
                      <td className={styles.tableCell}>
                        At vero eos et accusamus et iusto odio dignissimos
                      </td>
                    </tr>
                    <tr className={styles.tableRow}>
                      <td className={styles.tableCell}>9/15/2025, 10:52 AM</td>
                      <td className={styles.tableCell}>95%</td>
                      <td className={styles.tableCell}>
                        Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris
                      </td>
                    </tr>
                    <tr className={styles.tableRow}>
                      <td className={styles.tableCell}>9/14/2025, 06:18 PM</td>
                      <td className={styles.tableCell}>100%</td>
                      <td className={styles.tableCell}>
                        Sed ut perspiciatis unde omnis iste natus error sit
                      </td>
                    </tr>
                    <tr className={styles.tableRow}>
                      <td className={styles.tableCell}>9/14/2025, 02:30 PM</td>
                      <td className={styles.tableCell}>83%</td>
                      <td className={styles.tableCell}>
                        Voluptatum deleniti atque corrupti quos dolores et quas
                        ipsum
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise show agent list
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <div className={styles.title}>Agent summary</div>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            <Dismiss24Regular />
          </button>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "all" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All (12)
          </button>
          <button
            className={`${styles.tab} ${activeTab === "active" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("active")}
          >
            Active (6)
          </button>
          <button
            className={`${styles.tab} ${activeTab === "idle" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("idle")}
          >
            Idle (4)
          </button>
          <button
            className={`${styles.tab} ${activeTab === "training" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("training")}
          >
            Training (1)
          </button>
          <button
            className={`${styles.tab} ${activeTab === "deprecating" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("deprecating")}
          >
            Deprecating (0)
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.agentGrid}>
            {agents.map((agent, index) => (
              <div
                key={index}
                className={styles.agentCard}
                onClick={() => setSelectedAgent(agent.name)}
              >
                <div
                  className={`${styles.avatarContainer} ${agent.image ? styles.avatarWithImageContainer : ""}`}
                >
                  <Avatar
                    name={agent.name}
                    size={40}
                    image={agent.image ? { src: agent.image } : undefined}
                    color="colorful"
                    badge={{
                      status: agent.status === "active" ? "available" : "away",
                    }}
                    className={agent.image ? styles.avatarWhiteBg : undefined}
                  />
                </div>
                <div className={styles.agentInfo}>
                  <div className={styles.agentName}>{agent.name}</div>
                  <div className={styles.agentDescription}>
                    {agent.description}
                  </div>
                  <div className={styles.agentStatus}>{agent.lastActive}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
