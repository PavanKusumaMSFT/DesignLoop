"use client";

import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  Divider,
} from "@fluentui/react-components";
type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Apps24Regular, Dismiss24Regular } from "@fluentui/react-icons";
import { useRouter } from "next/navigation";
import { getFeaturedProjects } from "../../data/projects";
import HowItWorksDialog from "../projects/workspace/how-it-works-dialog";
import GettingStartedDialog from "../projects/workspace/getting-started-panel";
import CreateProjectDialog from "../projects/workspace/create-project-dialog";

const useStyles = makeStyles({
  sidebar: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "80px",
    height: "100vh",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1001,
  },
  menuToggle: {
    width: "48px",
    height: "48px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: tokens.borderRadiusXLarge,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transitionDuration: tokens.durationNormal,
    transitionProperty: "background-color",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  slideOutMenu: {
    position: "fixed",
    top: "0",
    left: "80px",
    width: "260px",
    height: "100vh",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    transitionDuration: "0.4s",
    transitionProperty: "transform",
    zIndex: 999,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  slideOutMenuOpen: {
    transform: "translateX(0)",
  },
  slideOutMenuClosed: {
    transform: "translateX(-100%)",
  },
  sectionLabel: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    paddingLeft: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalXXS,
    display: "block",
  },
  divider: {
    marginTop: tokens.spacingVerticalXXS,
    marginBottom: tokens.spacingVerticalXXS,
  },
  actionsSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: tokens.spacingVerticalXXS,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    transitionDuration: tokens.durationFaster,
    transitionProperty: "background-color",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  navItemActive: {
    backgroundColor: tokens.colorNeutralBackground2Hover,
    fontWeight: tokens.fontWeightMedium,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground2Hover,
    },
  },
  featuredDot: {
    width: "6px",
    height: "6px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandForeground1,
    flexShrink: 0,
  },
});

interface Project {
  id: string;
  title: string;
  route: string;
}

interface ProjectsMenuProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  activeProjectId: string;
  /** Optional project list override. If omitted, uses featured projects. */
  projects?: Project[];
}

/** Fixed left sidebar with a toggle button and slide-out menu listing featured projects,
 * workspace link, and action dialogs (How It Works, Getting Started, Create Project).
 * Composed from: Fluent Text, Divider, mergeClasses, and next/navigation router.
 * Instead of: building custom project switcher menus with manual route handling. */
export default function ProjectsMenu({
  isMenuOpen,
  onToggleMenu,
  activeProjectId,
  projects: projectsProp,
}: ProjectsMenuProps) {
  const styles = useStyles();
  const router = useRouter();
  const projects = projectsProp ?? getFeaturedProjects();

  const handleProjectClick = (route: string, id: string) => {
    onToggleMenu();
    if (id === activeProjectId) return;
    if (route === "") {
      router.push("/");
    } else {
      router.push(`/${route}`);
    }
  };

  const handleWorkspaceClick = () => {
    onToggleMenu();
    if (activeProjectId === "workspace") return;
    router.push("/workspace");
  };

  return (
    <>
      {/* Sidebar with Menu Toggle Button */}
      <div className={styles.sidebar}>
        <div className={styles.menuToggle} role="button" tabIndex={0} onClick={onToggleMenu} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggleMenu(); } }}>
          {isMenuOpen ? <Dismiss24Regular /> : <Apps24Regular />}
        </div>
      </div>

      {/* Slide-out Menu */}
      <div
        className={mergeClasses(
          styles.slideOutMenu,
          isMenuOpen ? styles.slideOutMenuOpen : styles.slideOutMenuClosed,
        )}
      >
        {/* Actions */}
        <Text className={styles.sectionLabel}>Actions</Text>
        <div className={styles.actionsSection}>
          <HowItWorksDialog />
          <GettingStartedDialog />
          <CreateProjectDialog />
        </div>

        <Divider className={styles.divider} />

        {/* Projects */}
        <Text className={styles.sectionLabel}>Featured</Text>

        <div
          className={mergeClasses(
            styles.navItem,
            activeProjectId === "workspace" && styles.navItemActive,
          )}
          onClick={handleWorkspaceClick}
        >
          All Projects
        </div>

        {projects.map((project) => (
          <div
            key={project.id}
            className={mergeClasses(
              styles.navItem,
              project.id === activeProjectId && styles.navItemActive,
            )}
            onClick={() => handleProjectClick(project.route, project.id)}
          >
            <span className={styles.featuredDot} />
            {project.title}
          </div>
        ))}
      </div>
    </>
  );
}
