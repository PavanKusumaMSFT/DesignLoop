/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Input,
} from "@fluentui/react-components";
import {
  Search20Regular,
  ChevronLeft12Regular,
  ChevronRight12Regular,
  Add16Regular,
  ArrowRight16Regular,
  Open12Regular,
  Dismiss20Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const navItems = ["Home", "Discover", "Build", "Operate", "Docs"];

const modelCards = [
  {
    name: "GPT-5",
    description:
      "GPT-5 unifies frontier reasoning and advanced coding with high-performance",
    checkoutLabel: "Check out model",
  },
  {
    name: "Introducing DeepSeek-R1-0528",
    description:
      "Improved reasoning, fewer hallucinations, better coding and functions",
    checkoutLabel: "Check out model",
  },
  {
    name: "Sora",
    description:
      "Generate up to 20s 1080p videos with Sora and its unique API: text-to-video now, image-to-video coming soon",
    checkoutLabel: "Check out model",
  },
];

const filterPills = ["All", "New arrivals"];

const resourceLinks = [
  {
    icon: "docs",
    title: "Docs and changelog",
    description: "Explore our detailed docs for all the info you need.",
    external: false,
  },
  {
    icon: "github",
    title: "GitHub",
    description: "Get the latest SDK updates and code samples on GitHub.",
    external: true,
  },
  {
    icon: "discord",
    title: "Discord",
    description:
      "Have questions? Join and connect with our Discord community.",
    external: true,
  },
];

const footerLinks = ["About", "Changelog", "Terms", "Privacy", "Support"];

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
    position: "relative" as const,
    overflow: "hidden",
  },

  /* Waves background layer */
  wavesBackground: {
    position: "absolute" as const,
    inset: 0,
    backgroundImage: "url('/icons/foundry-waves.svg')",
    backgroundSize: "cover",
    backgroundPosition: "center bottom",
    backgroundRepeat: "no-repeat",
    opacity: 0.15,
    pointerEvents: "none",
    zIndex: 0,
  },

  /* Top nav */
  topNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "48px",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    backgroundColor: "transparent",
    flexShrink: 0,
    zIndex: 1,
    position: "relative" as const,
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  navLogoImg: {
    width: "20px",
    height: "20px",
  },
  navTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: "#ffffff",
  },
  navBreadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    fontSize: tokens.fontSizeBase300,
    color: "rgba(255,255,255,0.6)",
  },
  navBreadcrumbActive: {
    color: "#ffffff",
  },
  navCenter: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: "rgba(255,255,255,0.6)",
    backgroundColor: "transparent",
    borderRadius: "9999px",
    border: `1px solid ${tokens.colorNeutralForeground2}`,
    padding: "4px 16px",
    cursor: "pointer",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  navLink: {
    fontSize: tokens.fontSizeBase300,
    color: "rgba(255,255,255,0.7)",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "inherit",
    ":hover": {
      color: "#ffffff",
    },
  },
  navLinkActive: {
    color: "#ffffff",
    fontWeight: tokens.fontWeightSemibold,
  },
  navIcons: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  navAvatar: {
    width: "28px",
    height: "28px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: "#643fb2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },

  /* Main content */
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    position: "relative" as const,
    paddingTop: "40px",
    paddingBottom: "24px",
  },
  body: {
    width: "100%",
    maxWidth: "1030px",
    display: "flex",
    flexDirection: "column",
    gap: "48px",
  },

  /* Title section */
  titleSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "22px",
  },
  welcomeText: {
    fontSize: "40px",
    fontWeight: tokens.fontWeightSemibold,
    color: "#ffffff",
    lineHeight: "48px",
    textAlign: "center" as const,
  },

  /* Carousel section */
  carouselSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingHorizontalS,
  },
  filterBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalS,
  },
  filterLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  filterSearchInput: {
    width: "200px",
    backgroundColor: "#141414",
  },
  filterPill: {
    display: "flex",
    alignItems: "center",
    padding: "4px 12px",
    borderRadius: tokens.borderRadiusMedium,
    fontSize: tokens.fontSizeBase200,
    cursor: "pointer",
    border: "none",
    fontFamily: "inherit",
    color: "#ffffff",
  },
  filterPillActive: {
    backgroundColor: "#383838",
  },
  filterPillInactive: {
    backgroundColor: "transparent",
    color: "rgba(255,255,255,0.7)",
  },
  filterRight: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  paginationBtn: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    padding: "4px 8px",
    backgroundColor: "transparent",
    border: "none",
    color: "rgba(255,255,255,0.7)",
    fontSize: tokens.fontSizeBase200,
    cursor: "pointer",
    fontFamily: "inherit",
    ":hover": {
      color: "#ffffff",
    },
  },
  pageNum: {
    padding: "4px 8px",
    fontSize: tokens.fontSizeBase200,
    color: "rgba(255,255,255,0.5)",
    cursor: "pointer",
    background: "none",
    border: "none",
    fontFamily: "inherit",
  },

  /* Model announcement cards */
  cardsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
  },
  announcementCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalXXL,
    background:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), linear-gradient(138deg, #5230AB -7%, #FBB0CB 145.86%)",
    borderRadius: tokens.borderRadiusXLarge,
    border: "1px solid rgba(255,255,255,0.08)",
    cursor: "pointer",
    ":hover": {
      borderColor: "rgba(255,255,255,0.20)",
    },
  },
  cardLogo: {
    width: "36px",
    height: "36px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: "rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: "#ffffff",
  },
  cardDesc: {
    fontSize: tokens.fontSizeBase300,
    color: "rgba(255,255,255,0.6)",
    lineHeight: tokens.lineHeightBase300,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  cardActions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    marginTop: "auto",
  },
  cardActionBtn: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    padding: "6px 16px",
    borderRadius: "9999px",
    backgroundColor: "#1F1F1F",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    color: "#ffffff",
    fontSize: tokens.fontSizeBase200,
    cursor: "pointer",
    fontFamily: "inherit",
    ":hover": {
      backgroundColor: "rgba(255,255,255,0.15)",
    },
  },

  /* Resource links row */
  resourceRow: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    paddingTop: tokens.spacingVerticalL,
  },
  resourceItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center" as const,
    gap: tokens.spacingHorizontalS,
    width: "200px",
    cursor: "pointer",
  },
  resourceIcon: {
    width: "24px",
    height: "24px",
    color: "#d6d6d6",
  },
  resourceTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
  },
  resourceTitle: {
    fontSize: tokens.fontSizeBase300,
    color: "#C9AAF9",
  },
  resourceExternalIcon: {
    color: "#C9AAF9",
    fontSize: "12px",
  },
  resourceDesc: {
    fontSize: tokens.fontSizeBase200,
    color: "#d6d6d6",
    lineHeight: tokens.lineHeightBase200,
    textAlign: "center" as const,
  },

  /* Footer */
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "48px",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    zIndex: 1,
    position: "relative" as const,
    maxWidth: "1030px",
    width: "100%",
    margin: "0 auto",
  },
  footerLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  footerStatus: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: "rgba(255,255,255,0.6)",
  },
  statusDot: {
    width: "6px",
    height: "6px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: "#4caf50",
  },
  footerLink: {
    fontSize: tokens.fontSizeBase300,
    color: "#ffffff",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "inherit",
    fontWeight: tokens.fontWeightSemibold,
  },
  footerRight: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
  },
  footerSmallLink: {
    fontSize: tokens.fontSizeBase200,
    color: "rgba(255,255,255,0.5)",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    fontFamily: "inherit",
    ":hover": {
      color: "#ffffff",
    },
  },
});

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export interface AiFoundryPageProps {
  onBack?: () => void;
  showCreateModal?: boolean;
  onCreateProject?: () => void;
}

/** Azure AI Foundry landing page — dark themed with welcome, model carousel, and resource links. */
export default function AiFoundryPage({
  onBack,
  showCreateModal = false,
  onCreateProject,
}: AiFoundryPageProps) {
  const styles = useStyles();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(showCreateModal);
  const [projectName, setProjectName] = useState("my-project");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <div className={styles.page}>
      {/* Background waves */}
      <div className={styles.wavesBackground} />

      {/* ─── Top Nav ─── */}
      <nav className={styles.topNav}>
        <div className={styles.navLeft}>
          <div className={styles.navLogo}>
            <img
              src="/icons/aifoundry-glyph.svg"
              alt=""
              className={styles.navLogoImg}
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <Text className={styles.navTitle}>Azure AI Foundry</Text>
          </div>
          <div className={styles.navBreadcrumb}>
            <span>›</span>
            <span className={styles.navBreadcrumbActive}>
              project-contoso-agent
            </span>
          </div>
        </div>

        <div
          className={styles.navCenter}
          role="search"
          aria-label="Search with AI"
        >
          <Search20Regular style={{ fontSize: "14px" }} />
          <span>Search with AI</span>
          <span
            style={{
              marginLeft: "8px",
              fontSize: "11px",
              opacity: 0.6,
              display: "flex",
              gap: "2px",
            }}
          >
            <kbd
              style={{
                padding: "1px 4px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "3px",
                fontSize: "11px",
              }}
            >
              ⌘
            </kbd>
            <kbd
              style={{
                padding: "1px 4px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "3px",
                fontSize: "11px",
              }}
            >
              K
            </kbd>
          </span>
        </div>

        <div className={styles.navRight}>
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <button
                key={item}
                className={`${styles.navLink} ${item === "Home" ? styles.navLinkActive : ""}`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className={styles.navAvatar}>M</div>
        </div>
      </nav>

      {/* ─── Main Content ─── */}
      <div className={styles.mainContent}>
        <div className={styles.body}>
          {/* Title section */}
          <div className={styles.titleSection}>
            <Text className={styles.welcomeText}>Welcome, Connie</Text>
            <Button
              appearance="primary"
              size="medium"
              style={{
                backgroundColor: "#643fb2",
                borderColor: "#643fb2",
                borderRadius: "9999px",
                paddingLeft: "24px",
                paddingRight: "24px",
              }}
              onClick={() => setModalOpen(true)}
            >
              Create a project
            </Button>
          </div>

          {/* Carousel section */}
          <div className={styles.carouselSection}>
            {/* Model cards */}
            <div className={styles.cardsRow}>
              {modelCards.map((card) => (
                <div key={card.name} className={styles.announcementCard}>
                  <div className={styles.cardLogo}>
                    <img
                      src="/icons/aifoundry-glyph.svg"
                      alt=""
                      style={{
                        width: "20px",
                        height: "20px",
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  </div>
                  <div>
                    <Text className={styles.cardTitle}>{card.name}</Text>
                    <Text className={styles.cardDesc}>{card.description}</Text>
                  </div>
                  <div className={styles.cardActions}>
                    <button className={styles.cardActionBtn}>
                      {card.checkoutLabel}{" "}
                      <ArrowRight16Regular style={{ fontSize: "12px" }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resource links */}
          <div className={styles.resourceRow}>
            {resourceLinks.map((link) => (
              <div key={link.title} className={styles.resourceItem}>
                <div className={styles.resourceIcon}>
                  {link.icon === "docs" && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M4 4h16v16H4z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M8 8h8M8 12h8M8 16h4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  )}
                  {link.icon === "github" && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  )}
                  {link.icon === "discord" && (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
                    </svg>
                  )}
                </div>
                <div className={styles.resourceTitleRow}>
                  <Text className={styles.resourceTitle}>{link.title}</Text>
                  {link.external && (
                    <Open12Regular className={styles.resourceExternalIcon} />
                  )}
                </div>
                <Text className={styles.resourceDesc}>{link.description}</Text>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Footer ─── */}
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <div className={styles.footerStatus}>
            <div className={styles.statusDot} />
            <span>All services are online</span>
          </div>

        </div>
        <div className={styles.footerRight}>
          {footerLinks.map((link) => (
            <button key={link} className={styles.footerSmallLink}>
              {link}
            </button>
          ))}
        </div>
      </footer>

      {/* ─── Create Project Modal ─── */}
      {modalOpen && (
        <>
          {/* Blur overlay */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              zIndex: 100,
            }}
            onClick={() => setModalOpen(false)}
          />
          {/* Modal dialog */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 101,
              backgroundColor: "#1a1a1a",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
              width: "540px",
              maxWidth: "90vw",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "28px 28px 0 28px" }}>
              <div style={{ flex: 1, paddingRight: "16px" }}>
                <Text
                  style={{
                    fontSize: tokens.fontSizeBase600,
                    fontWeight: tokens.fontWeightSemibold,
                    color: "#ffffff",
                    display: "block",
                    marginBottom: "8px",
                    lineHeight: tokens.lineHeightBase600,
                  }}
                >
                  Get started with your first agent. It&apos;s quick and easy.
                </Text>
                <Text
                  style={{
                    fontSize: tokens.fontSizeBase300,
                    color: "rgba(255,255,255,0.55)",
                    display: "block",
                    lineHeight: tokens.lineHeightBase300,
                  }}
                >
                  Create a project to set up your workspace where you can build,
                  customize, and manage agents, tools, and models.
                </Text>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close"
                style={{
                  flexShrink: 0,
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                <Dismiss20Regular />
              </button>
            </div>

            {/* Form */}
            <div style={{ padding: "24px 28px" }}>
              <Text
                style={{
                  fontSize: tokens.fontSizeBase300,
                  color: "#adadad",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Project
              </Text>
              <Input
                value={projectName}
                onChange={(_, data) => setProjectName(data.value)}
                input={{ style: { color: "#ffffff" } }}
                style={{
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                  borderBottom: "2px solid #6B4FBB",
                  borderRadius: 0,
                  color: "#ffffff",
                  width: "100%",
                }}
              />

              <button
                onClick={() => setAdvancedOpen(!advancedOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 0",
                  marginTop: "8px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: tokens.fontSizeBase300,
                  fontFamily: "inherit",
                }}
              >
                <ChevronRight12Regular
                  style={{
                    transition: "transform 150ms ease",
                    fontSize: "12px",
                    transform: advancedOpen ? "rotate(90deg)" : "none",
                  }}
                />
                Advanced setup
              </button>
            </div>

            {/* Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "16px 28px 24px",
                backgroundColor: "rgba(255,255,255,0.03)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Button
                appearance="primary"
                onClick={() => {
                  if (onCreateProject) {
                    onCreateProject();
                  }
                }}
                style={{
                  backgroundColor: "#643fb2",
                  borderColor: "#643fb2",
                  borderRadius: "9999px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                }}
              >
                Create project
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
