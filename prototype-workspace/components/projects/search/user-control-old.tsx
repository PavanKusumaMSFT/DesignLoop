"use client";

import { makeStyles, tokens as fluentTokens } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { AzureHeaderP1 } from "../../shared/azure-header-p1";
import {
  Circle24Regular,
  DocumentBulletList24Regular,
  ShieldTask24Regular,
  Wrench24Regular,
  PeopleTeam24Regular,
  Apps24Regular,
  Certificate24Regular,
  Desktop24Regular,
  Add24Regular,
  Key24Regular,
  ChatHelp24Regular,
  Info24Regular,
  History24Regular,
  DocumentData24Regular,
  Edit20Regular,
  Delete20Regular,
  ArrowClockwise20Regular,
  LockClosed20Regular,
  DismissCircle20Regular,
  Eye20Regular,
  CommentNote20Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    backgroundColor: "transparent",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
  },
  header: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "8px 16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  breadcrumb: {
    fontSize: "12px",
    color: tokens.colorBrandForeground1,
    marginBottom: "4px",
  },
  breadcrumbLink: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
  },
  userIcon: {
    width: "24px",
    height: "24px",
    color: tokens.colorBrandForeground1,
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  closeButton: {
    marginLeft: "auto",
    background: "transparent",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    padding: "4px 8px",
    color: tokens.colorNeutralForeground2,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  searchContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "12px 16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  searchBox: {
    width: "100%",
    padding: "6px 12px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "2px",
    fontSize: "13px",
  },
  toolbar: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "12px 24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    gap: "16px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  toolbarButton: {
    padding: "0",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: tokens.colorNeutralForeground2,
    ":hover": {
      color: tokens.colorBrandForeground1,
    },
  },
  toolbarSeparator: {
    width: "1px",
    height: "20px",
    backgroundColor: tokens.colorNeutralStroke2,
  },
  mainContent: {
    display: "flex",
    gap: 0,
  },
  sidebar: {
    width: "220px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "8px 0",
  },
  sidebarItem: {
    padding: "6px 16px",
    fontSize: "13px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: tokens.colorNeutralForeground1,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  sidebarItemActive: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderLeft: `3px solid ${tokens.colorBrandForeground1}`,
    fontWeight: "600",
  },
  contentArea: {
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "16px 24px",
  },
  tabBar: {
    display: "flex",
    gap: "24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    marginBottom: "16px",
  },
  tab: {
    padding: "8px 12px",
    fontSize: "13px",
    cursor: "pointer",
    color: tokens.colorNeutralForeground2,
    borderBottom: "2px solid transparent",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    ":hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  tabActive: {
    color: tokens.colorBrandForeground1,
    borderBottom: `2px solid ${tokens.colorBrandForeground1}`,
    fontWeight: "400",
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "12px",
    color: tokens.colorNeutralForeground1,
  },
  userProfile: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: "600",
    color: "white",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "4px",
    color: tokens.colorNeutralForeground1,
  },
  userEmail: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "2px",
  },
  userType: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "24px",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  infoLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  copyButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "2px",
    color: tokens.colorNeutralForeground2,
    ":hover": {
      color: tokens.colorBrandForeground1,
    },
  },
  feedSection: {
    marginTop: "24px",
  },
  feedCardsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginTop: "12px",
  },
  feedCard: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "4px",
    padding: "16px",
    display: "flex",
    gap: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  feedIcon: {
    width: "40px",
    height: "40px",
    flexShrink: 0,
  },
  feedContent: {
    flex: 1,
  },
  feedTitle: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
    color: tokens.colorNeutralForeground1,
  },
  feedStatus: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  feedLink: {
    fontSize: "12px",
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    marginTop: "4px",
    display: "inline-block",
    ":hover": {
      textDecoration: "underline",
    },
  },
  groupSection: {
    marginTop: "16px",
  },
  groupItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  groupLabel: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground1,
  },
  groupCount: {
    fontSize: "13px",
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
  },
  userHeaderIcon: {
    flexShrink: 0,
  },
  tabIcon: {
    width: "16px",
    height: "16px",
  },
  groupMembershipCount: {
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
  },
  statusIconEnabled: {
    width: "16px",
    height: "16px",
    color: tokens.colorPaletteGreenForeground1,
  },
});

export function UserControlOld() {
  const styles = useStyles();

  return (
    <>
      <AzureHeaderP1 activeLink="Home" viewMode="list" />
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <img
            src="/icons/Users.svg"
            alt="User"
            width={24}
            height={24}
            className={styles.userHeaderIcon}
          />
          <div>
            <div className={styles.breadcrumb}>
              <a className={styles.breadcrumbLink}>Home</a> &gt;{" "}
              <a className={styles.breadcrumbLink}>Microsoft</a> &gt;{" "}
              <a className={styles.breadcrumbLink}>Overview</a>
            </div>
            <h1 className={styles.title}>Adam Farz</h1>
          </div>
          <button className={styles.closeButton}>✕</button>
        </div>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Search Box */}
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search"
                className={styles.searchBox}
              />
            </div>
            <div
              className={`${styles.sidebarItem} ${styles.sidebarItemActive}`}
            >
              <Circle24Regular /> Overview
            </div>
            <div className={styles.sidebarItem}>
              <Circle24Regular /> Audit logs
            </div>
            <div className={styles.sidebarItem}>
              <Circle24Regular /> Sign-in logs
            </div>
            <div className={styles.sidebarItem}>
              <Circle24Regular /> Diagnose and solve problems
            </div>
            <div className={styles.sidebarItem}>
              <Circle24Regular /> Custom security attributes
            </div>
            <div className={styles.sidebarItem}>
              <Circle24Regular /> Assigned roles
            </div>
            <div className={styles.sidebarItem}>
              <Circle24Regular /> Groups
            </div>
            <div className={styles.sidebarItem}>
              <Circle24Regular /> Applications
            </div>
            <div className={styles.sidebarItem}>
              <Circle24Regular /> Licenses
            </div>
            <div className={styles.sidebarItem}>
              <Circle24Regular /> Devices
            </div>
            <div className={styles.sidebarItem}>
              <Circle24Regular /> Azure role assignments
            </div>
            <div className={styles.sidebarItem}>
              <Circle24Regular /> Authentication methods
            </div>
            <div className={styles.sidebarItem}>
              <Circle24Regular /> New support request
            </div>
          </div>

          {/* Content Area */}
          <div className={styles.contentArea}>
            {/* Toolbar */}
            <div className={styles.toolbar}>
              <button className={styles.toolbarButton}>
                <Edit20Regular />
                Edit properties
              </button>
              <button className={styles.toolbarButton}>
                <Delete20Regular />
                Delete
              </button>
              <button className={styles.toolbarButton}>
                <ArrowClockwise20Regular />
                Refresh
              </button>
              <div className={styles.toolbarSeparator} />
              <button className={styles.toolbarButton}>
                <LockClosed20Regular />
                Reset password
              </button>
              <button className={styles.toolbarButton}>
                <DismissCircle20Regular />
                Revoke sessions
              </button>
              <button className={styles.toolbarButton}>
                <Eye20Regular />
                Manage view
              </button>
              <div className={styles.toolbarSeparator} />
              <button className={styles.toolbarButton}>
                <CommentNote20Regular />
                Got feedback?
              </button>
            </div>

            {/* Tabs */}
            <div className={styles.tabBar}>
              <div className={`${styles.tab} ${styles.tabActive}`}>
                <Info24Regular className={styles.tabIcon} />
                Overview
              </div>
              <div className={styles.tab}>
                <DocumentData24Regular className={styles.tabIcon} />
                Monitoring
              </div>
              <div className={styles.tab}>
                <DocumentBulletList24Regular className={styles.tabIcon} />
                Properties
              </div>
            </div>

            {/* Basic Info Section */}
            <div className={styles.sectionTitle}>Basic info</div>

            <div className={styles.userProfile}>
              <div className={styles.avatar}>AF</div>
              <div className={styles.userInfo}>
                <div className={styles.userName}>Adam Farz</div>
                <div className={styles.userEmail}>
                  adam-far@4b4b4c4a.com#EXT#@microsoft.com
                </div>
                <div className={styles.userType}>Guest</div>
              </div>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>User principal name</div>
                <div className={styles.infoValue}>
                  adam-far__4b4b4c4a.com#EXT#@microsoft.com#...
                  <button className={styles.copyButton}>📋</button>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Object ID</div>
                <div className={styles.infoValue}>
                  b6707f1a-ce6f-4f95-8fa6-e1fb2a8f3d
                  <button className={styles.copyButton}>📋</button>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Created date time</div>
                <div className={styles.infoValue}>Jul 8, 2025, 5:51 PM</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>User type</div>
                <div className={styles.infoValue}>Guest</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Multitask</div>
                <div className={styles.infoValue}>Enabled/Enforced</div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoLabel}>Agent ID</div>
                <div className={styles.infoValue}>-</div>
              </div>
            </div>

            {/* Group Memberships */}
            <div className={styles.groupSection}>
              <div className={styles.sectionTitle}>
                Group memberships{" "}
                <span className={styles.groupMembershipCount}>6</span>
              </div>
              <div className={styles.groupItem}>
                <div className={styles.groupLabel}>Applications</div>
                <div className={styles.groupCount}>67</div>
              </div>
              <div className={styles.groupItem}>
                <div className={styles.groupLabel}>Assigned roles</div>
                <div className={styles.groupCount}>0</div>
              </div>
              <div className={styles.groupItem}>
                <div className={styles.groupLabel}>Assigned licenses</div>
                <div className={styles.groupCount}>0</div>
              </div>
            </div>

            {/* My Feed Section */}
            <div className={styles.feedSection}>
              <div className={styles.sectionTitle}>My feed</div>

              <div className={styles.feedCardsContainer}>
                <div className={styles.feedCard}>
                  <img
                    src="/icons/Users.svg"
                    alt="User"
                    className={styles.feedIcon}
                  />
                  <div className={styles.feedContent}>
                    <div className={styles.feedTitle}>Account status</div>
                    <div className={styles.feedStatus}>
                      <Circle24Regular className={styles.statusIconEnabled} />
                      Enabled
                    </div>
                    <a className={styles.feedLink}>Edit</a>
                  </div>
                </div>

                <div className={styles.feedCard}>
                  <img
                    src="/icons/Users.svg"
                    alt="User"
                    className={styles.feedIcon}
                  />
                  <div className={styles.feedContent}>
                    <div className={styles.feedTitle}>B2B invitation</div>
                    <div className={styles.feedStatus}>
                      Invitation state: Accepted
                    </div>
                    <a className={styles.feedLink}>Reset redemption status</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
