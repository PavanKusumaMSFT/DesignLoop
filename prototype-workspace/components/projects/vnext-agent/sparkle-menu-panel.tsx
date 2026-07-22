/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Search20Regular,
  Wrench20Regular,
  LockClosed20Regular,
  PeopleTeam20Regular,
  Link20Regular,
  Circle20Regular,
} from "@fluentui/react-icons";
import { useState } from "react";

const useStyles = makeStyles({
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: "120px",
  },
  overlay: {
    width: "100%",
    maxWidth: "620px",
    padding: "0 20px",
  },
  panel: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    animationName: {
      "0%": {
        opacity: "0",
        transform: "translateY(10px) scale(0.98)",
      },
      "100%": {
        opacity: "1",
        transform: "translateY(0) scale(1)",
      },
    },
    animationDuration: "0.2s",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  searchContainer: {
    padding: "16px 16px 12px",
    position: "relative",
  },
  searchInput: {
    width: "100%",
    padding: "8px 12px 8px 36px",
    border: "none",
    borderRadius: "20px",
    fontSize: "14px",
    backgroundColor: "#f9f9f9",
    color: tokens.colorNeutralForeground1,
    outline: "none",
    ":focus": {
      backgroundColor: "#f0f0f0",
    },
  },
  searchIconStyle: {
    position: "absolute",
    left: "28px",
    top: "24px",
    color: tokens.colorNeutralForeground3,
  },
  tabs: {
    display: "flex",
    gap: "8px",
    padding: "0 16px 12px",
  },
  tab: {
    padding: "6px 12px",
    border: "none",
    backgroundColor: "transparent",
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
    maxHeight: "380px",
    padding: "0 0 8px",
    overflowY: "auto",
  },
  section: {
    padding: "0",
  },
  sectionTitle: {
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    padding: "12px 16px 4px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 16px",
    cursor: "pointer",
    transition: "all 0.2s",
    backgroundColor: "transparent",
    border: "none",
    width: "100%",
    textAlign: "left",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  menuIcon: {
    width: "20px",
    height: "20px",
    color: tokens.colorNeutralForeground2,
    flexShrink: 0,
  },
  menuText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    flex: 1,
  },
});

interface SparkleMenuPanelProps {
  onClose: () => void;
}

/** Floating overlay panel with search, tabbed navigation (All/Agents/Resources/Commands/Portal), and grouped menu items.
 * Cross-project reusable: can be imported by any project. */
export default function SparkleMenuPanel({ onClose }: SparkleMenuPanelProps) {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = {
    recents: [
      { icon: Wrench20Regular, text: "Troubleshoot..." },
      { icon: LockClosed20Regular, text: "Upgrade resources to..." },
    ],
    security: [
      { icon: LockClosed20Regular, text: "Modify permissions..." },
      { icon: PeopleTeam20Regular, text: "Invite for RBAC..." },
      { icon: Link20Regular, text: "Lorem ipsum dolor set..." },
      { icon: Circle20Regular, text: "Lorem ipsum dolor set" },
    ],
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} role="presentation" onClick={handleBackdropClick}>
      <div className={styles.overlay}>
        <div className={styles.panel}>
          <div className={styles.searchContainer}>
            <Search20Regular className={styles.searchIconStyle} />
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === "all" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`${styles.tab} ${activeTab === "agents" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("agents")}
            >
              Agents
            </button>
            <button
              className={`${styles.tab} ${activeTab === "resources" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("resources")}
            >
              Resources
            </button>
            <button
              className={`${styles.tab} ${activeTab === "commands" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("commands")}
            >
              Commands
            </button>
            <button
              className={`${styles.tab} ${activeTab === "portal" ? styles.tabActive : ""}`}
              onClick={() => setActiveTab("portal")}
            >
              Portal?
            </button>
          </div>

          <div className={styles.content}>
            <div className={styles.section}>
              <div className={styles.sectionTitle}>Recents</div>
              {menuItems.recents.map((item, index) => (
                <button
                  key={index}
                  className={styles.menuItem}
                  onClick={onClose}
                >
                  <item.icon className={styles.menuIcon} />
                  <span className={styles.menuText}>{item.text}</span>
                </button>
              ))}
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>Security</div>
              {menuItems.security.map((item, index) => (
                <button
                  key={index}
                  className={styles.menuItem}
                  onClick={onClose}
                >
                  <item.icon className={styles.menuIcon} />
                  <span className={styles.menuText}>{item.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
