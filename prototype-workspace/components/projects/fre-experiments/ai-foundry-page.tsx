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
  Field,
} from "@fluentui/react-components";
import {
  Search20Regular,
  Settings20Regular,
  Alert20Regular,
  Copy16Regular,
  Sparkle20Filled,
  LinkSquare20Regular,
  Code20Regular,
  BrainCircuit20Regular,
  ArrowImport16Regular,
  Send16Regular,
  Add16Regular,
  Timer20Regular,
  Share20Regular,
  Code20Filled,
  ChevronDown12Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const modelCards = [
  {
    name: "o3-mini",
    type: "Chat completion",
    color: "#0078D4",
    icon: "sparkle",
  },
  {
    name: "DeepSeek-R1",
    type: "Chat completion",
    color: "#0078D4",
    icon: "sparkle",
  },
  {
    name: "gpt-4o-mini-realtime-preview",
    type: "Audio generation",
    color: "#0078D4",
    icon: "sparkle",
  },
  {
    name: "gpt-4o-mini",
    type: "Chat completion",
    color: "#0078D4",
    icon: "sparkle",
  },
  {
    name: "Phi-4",
    type: "Chat completion",
    color: "#E74856",
    icon: "multi",
  },
  {
    name: "o1",
    type: "Chat completion",
    color: "#0078D4",
    icon: "sparkle",
  },
];

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const useStyles = makeStyles({
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },

  /* Top nav bar */
  topNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "48px",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    flexShrink: 0,
  },
  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  navLogo: {
    width: "20px",
    height: "20px",
  },
  navTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  navAvatar: {
    width: "28px",
    height: "28px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: "#0078D4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
  },

  /* Hero section */
  heroSection: {
    background: "linear-gradient(180deg, #EBF3FC 0%, #F5F5F5 100%)",
    paddingTop: "48px",
    paddingBottom: "48px",
    paddingLeft: "64px",
    paddingRight: "0",
    overflow: "hidden",
  },
  heroContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "380px 1fr",
    gap: "40px",
    alignItems: "center",
  },
  heroLeft: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  heroTitle: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "40px",
  },
  heroDescription: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },

  /* Explore models section */
  modelsSection: {
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    paddingTop: "48px",
    paddingBottom: "48px",
    paddingLeft: "64px",
    paddingRight: "64px",
  },
  modelsSectionTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "12px",
    display: "block",
  },
  modelsSubtitle: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground1,
    textAlign: "center" as const,
    marginBottom: tokens.spacingVerticalL,
    display: "block",
    width: "100%",
  },
  searchBar: {
    maxWidth: "420px",
    margin: "0 auto",
    marginBottom: tokens.spacingVerticalXXL,
  },
  modelsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: tokens.spacingVerticalM,
  },
  latestLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  catalogLink: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: "#0078D4",
    cursor: "pointer",
    textDecoration: "none",
    border: "none",
    background: "none",
    padding: 0,
    fontFamily: "inherit",
  },
  modelsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
    marginBottom: "24px",
  },
  modelCard: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    cursor: "pointer",
    ":hover": {
      boxShadow: tokens.shadow4,
      borderColor: tokens.colorNeutralStroke1,
    },
  },
  modelIcon: {
    width: "36px",
    height: "36px",
    borderRadius: tokens.borderRadiusCircular,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  modelInfo: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minWidth: 0,
  },
  modelName: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  modelType: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  modelCopy: {
    color: tokens.colorNeutralForeground3,
    cursor: "pointer",
    flexShrink: 0,
    ":hover": {
      color: tokens.colorNeutralForeground1,
    },
  },

  /* Explore more - title reuses moreSectionTitle */
  moreSectionTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
  },
  bannerCard: {
    borderRadius: tokens.borderRadiusXLarge,
    overflow: "hidden",
    position: "relative" as const,
    height: "280px",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=1200&h=400&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    marginBottom: tokens.spacingVerticalXXL,
  },
  bannerOverlay: {
    position: "absolute" as const,
    inset: "0",
    background:
      "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "32px",
    gap: tokens.spacingVerticalM,
  },
  bannerTitle: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightSemibold,
    color: "white",
    lineHeight: "36px",
  },
  bannerDescription: {
    fontSize: tokens.fontSizeBase300,
    color: "rgba(255,255,255,0.85)",
    lineHeight: tokens.lineHeightBase300,
    maxWidth: "400px",
  },

  /* Bottom cards */
  bottomCards: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalL,
    width: "100%",
  },
  bottomCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingHorizontalXXL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    cursor: "pointer",
    ":hover": {
      boxShadow: tokens.shadow4,
      borderColor: tokens.colorNeutralStroke1,
    },
  },
  bottomCardIcon: {
    color: "#0078D4",
    marginBottom: tokens.spacingVerticalXS,
  },
  bottomCardTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  bottomCardDesc: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    lineHeight: tokens.lineHeightBase300,
  },
});

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export interface AiFoundryPageProps {
  onBack?: () => void;
  showCreateModal?: boolean;
}

/** Azure AI Foundry landing page with hero, model catalog, and capabilities sections. */
export default function AiFoundryPage({ onBack, showCreateModal = false }: AiFoundryPageProps) {
  const styles = useStyles();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(showCreateModal);
  const [projectName, setProjectName] = useState("mokane-4636");

  return (
    <div className={styles.page}>
      {/* ─── Top nav bar ─── */}
      <div className={styles.topNav}>
        <div className={styles.navLeft}>
          <img
            src="/icons/aifoundry-glyph.svg"
            alt=""
            className={styles.navLogo}
          />
          <Text className={styles.navTitle}>Microsoft Foundry</Text>
        </div>
        <div className={styles.navRight}>
          <Button appearance="subtle" icon={<Alert20Regular />} size="small" />
          <Button
            appearance="subtle"
            icon={<Settings20Regular />}
            size="small"
          />
          <div className={styles.navAvatar}>C</div>
        </div>
      </div>

      {/* ─── Hero section ─── */}
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          {/* Left — Title + CTA */}
          <div className={styles.heroLeft}>
            <Text className={styles.heroTitle}>
              Create smarter agents with Microsoft Foundry
            </Text>
            <Text className={styles.heroDescription}>
              Design, customize, and manage powerful, adaptable AI agents that
              automate tasks, integrate seamlessly with your apps, and enhance
              user experiences.
            </Text>
            <Button appearance="primary" size="medium">
              Create an agent
            </Button>
          </div>

          {/* Right — Combined playground + trace card */}
          <div style={{
            position: "relative",
            overflow: "hidden",
            marginRight: "-300px",
            marginLeft: "100px",
          }}>
            {/* Fade on left */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(90deg, #EBF3FC 0%, transparent 100%)", zIndex: 2, pointerEvents: "none" }} />
            {/* Fade on bottom */}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "60px", background: "linear-gradient(180deg, transparent 0%, #F5F5F5 100%)", zIndex: 2, pointerEvents: "none" }} />

            {/* Card */}
            <div style={{
              backgroundColor: tokens.colorNeutralBackground1,
              borderRadius: "16px",
              boxShadow: tokens.shadow16,
              overflow: "hidden",
              pointerEvents: "none",
            }}>
              {/* Toolbar */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "10px 16px",
                borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: "#0078D4" }}>
                  <Sparkle20Filled style={{ fontSize: "16px" }} /> Evaluate
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: tokens.colorNeutralForeground3 }}>
                  <img src="/icons/aifoundry-glyph.svg" alt="" style={{ width: "16px", height: "16px", opacity: 0.6 }} /> Trace
                </span>
                <div style={{ flex: 1 }} />
                <div style={{ display: "flex", gap: "4px", color: tokens.colorNeutralForeground3 }}>
                  <Share20Regular style={{ fontSize: "16px" }} />
                  <Timer20Regular style={{ fontSize: "16px" }} />
                  <Settings20Regular style={{ fontSize: "16px" }} />
                  <Code20Filled style={{ fontSize: "16px" }} />
                </div>
              </div>

              {/* Two-column body */}
              <div style={{ display: "flex", minHeight: "340px" }}>
                {/* Left — Playground */}
                <div style={{
                  width: "260px",
                  flexShrink: 0,
                  borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
                  padding: "14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}>
                  {/* Model deployment */}
                  <div>
                    <div style={{ fontSize: "11px", color: tokens.colorNeutralForeground3, marginBottom: "4px" }}>Model deployment ⓘ</div>
                    <div style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "6px 10px", border: `1px solid ${tokens.colorNeutralStroke1}`,
                      borderRadius: "6px", fontSize: "13px", color: tokens.colorNeutralForeground1,
                    }}>
                      <span>GPT-4o mini</span>
                      <ChevronDown12Regular />
                    </div>
                  </div>

                  {/* System message */}
                  <div>
                    <div style={{ fontSize: "11px", color: tokens.colorNeutralForeground3, marginBottom: "4px" }}>System message ⓘ</div>
                    <div style={{
                      padding: "8px 10px", border: `1px solid ${tokens.colorNeutralStroke1}`,
                      borderRadius: "6px", fontSize: "13px", color: tokens.colorNeutralForeground2,
                      minHeight: "100px", position: "relative",
                    }}>
                      You are a helpful chatbot...
                      {/* Blue cursor arrow decoration */}
                      <div style={{
                        position: "absolute", right: "20px", bottom: "10px",
                        width: "40px", height: "50px",
                        background: "linear-gradient(135deg, #0078D4 0%, #50B0FF 100%)",
                        clipPath: "polygon(0 0, 40% 100%, 100% 60%)",
                      }} />
                    </div>
                  </div>

                  {/* Import / Samples */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px",
                      border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: "6px",
                      fontSize: "11px", color: "#0078D4",
                    }}>
                      <ArrowImport16Regular style={{ fontSize: "12px" }} /> Import
                    </div>
                    <div style={{
                      display: "flex", alignItems: "center", gap: "4px", padding: "4px 10px",
                      border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: "6px",
                      fontSize: "11px", color: tokens.colorNeutralForeground1,
                    }}>
                      <Sparkle20Filled style={{ fontSize: "12px", color: "#0078D4" }} /> Samples
                    </div>
                  </div>

                  {/* Knowledge */}
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontSize: "12px", color: tokens.colorNeutralForeground2,
                    paddingTop: "6px", borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
                  }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <ChevronDown12Regular /> Knowledge
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#0078D4" }}>
                      <Add16Regular style={{ fontSize: "12px" }} /> Add
                    </span>
                  </div>

                  {/* Knowledge description */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img src="/icons/aifoundry-glyph.svg" alt="" style={{ width: "20px", height: "20px" }} />
                    <span style={{ fontSize: "11px", color: tokens.colorNeutralForeground3 }}>
                      Knowledge gives the agent access to data sources for
                    </span>
                  </div>
                </div>

                {/* Right — Agent trace */}
                <div style={{
                  flex: 1,
                  padding: "14px 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  overflow: "hidden",
                }}>
                  {/* User bubble */}
                  <div style={{
                    alignSelf: "flex-end", backgroundColor: "#EBF3FC",
                    borderRadius: "12px 12px 2px 12px", padding: "8px 14px",
                    fontSize: "12px", color: tokens.colorNeutralForeground1,
                    maxWidth: "90%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    Get me the weather in the 3 biggest markets and email them…
                  </div>

                  {/* Agent response */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "20px", height: "20px", borderRadius: "50%",
                        backgroundColor: "#0078D4", display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Sparkle20Filled style={{ fontSize: "10px", color: "white" }} />
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: tokens.colorNeutralForeground1 }}>Research-agent</span>
                      <span style={{ fontSize: "10px", color: tokens.colorNeutralForeground3, fontStyle: "italic" }}>AI-generated content may be incorrect</span>
                    </div>

                    <div style={{ fontSize: "12px", color: tokens.colorNeutralForeground1, lineHeight: "18px", paddingLeft: "28px" }}>
                      <div style={{ marginBottom: "6px" }}>Here is the weather for today in the three biggest markets:</div>
                      <ol style={{ margin: 0, paddingLeft: "16px" }}>
                        <li>New York: Sunny with a high of 40°F and a low of 27°.</li>
                        <li>Los Angeles: Mostly cloudy with a high of 59°F and a low of 46°.</li>
                        <li>Chicago: Sunny with a high of 31°F and a low of 30°.</li>
                      </ol>
                    </div>
                  </div>

                  {/* Scores row */}
                  <div style={{
                    display: "flex", alignItems: "center", gap: "12px", paddingLeft: "28px",
                    fontSize: "11px", color: tokens.colorNeutralForeground3,
                    paddingTop: "6px", borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
                  }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                      <Timer20Regular style={{ fontSize: "13px" }} /> 5.8s
                    </span>
                    <span>Groundedness 0.4</span>
                    <span>Fluency 0.4</span>
                    <span style={{
                      padding: "2px 8px", border: `1px solid ${tokens.colorNeutralStroke2}`,
                      borderRadius: "4px", color: tokens.colorNeutralForeground1,
                    }}>View run trace</span>
                  </div>

                  {/* Input bar */}
                  <div style={{
                    padding: "8px 12px", border: `1px solid ${tokens.colorNeutralStroke2}`,
                    borderRadius: "8px", fontSize: "11px", color: tokens.colorNeutralForeground3,
                    marginTop: "auto",
                  }}>
                    <div>Describe what you&apos;d like to do or use / to reference files, people, and more</div>
                    <div style={{ textAlign: "right", fontSize: "10px", marginTop: "2px" }}>0/2000</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Explore models and capabilities ─── */}
      <div className={styles.modelsSection}>
        <Text className={styles.modelsSectionTitle}>
          Explore models and capabilities
        </Text>

        <div style={{
          backgroundColor: tokens.colorNeutralBackground1,
          borderRadius: "16px",
          border: `1px solid ${tokens.colorNeutralStroke2}`,
          padding: "32px",
        }}>
          <Text className={styles.modelsSubtitle}>
            Choose the right model for your use case
          </Text>

          <div className={styles.searchBar}>
            <Input
              placeholder="Search for a model"
              contentBefore={<Search20Regular />}
              style={{ width: "100%" }}
              size="large"
            />
          </div>

          <div className={styles.modelsHeader}>
            <Text className={styles.latestLabel}>Latest models</Text>
            <button className={styles.catalogLink}>
              <LinkSquare20Regular /> Go to full model catalog
            </button>
          </div>

        <div className={styles.modelsGrid}>
          {modelCards.map((model) => (
            <div key={model.name} className={styles.modelCard}>
              <div
                className={styles.modelIcon}
                style={{
                  backgroundColor:
                    model.icon === "multi"
                      ? "transparent"
                      : `${model.color}20`,
                }}
              >
                {model.icon === "multi" ? (
                  <span style={{ fontSize: "20px" }}>✦</span>
                ) : (
                  <Sparkle20Filled style={{ color: model.color }} />
                )}
              </div>
              <div className={styles.modelInfo}>
                <Text className={styles.modelName}>{model.name}</Text>
                <Text className={styles.modelType}>{model.type}</Text>
              </div>
              <Copy16Regular className={styles.modelCopy} />
            </div>
          ))}
        </div>

        {/* ─── Explore more capabilities ─── */}
        <Text className={styles.moreSectionTitle} style={{ marginTop: "24px" }}>
          Explore more capabilities
        </Text>

        <div className={styles.bannerCard}>
          <div className={styles.bannerOverlay}>
            <Text className={styles.bannerTitle}>Boundless innovation</Text>
            <Text className={styles.bannerDescription}>
              Drive efficiency and engagement with transformative workflows and
              cutting-edge videos using Sora in Azure AI Foundry Models.
            </Text>
            <Button
              appearance="secondary"
              size="medium"
              style={{
                backgroundColor: "white",
                color: tokens.colorNeutralForeground1,
                width: "fit-content",
              }}
            >
              Go to video playground
            </Button>
          </div>
        </div>

        {/* ─── Bottom cards ─── */}
        <div className={styles.bottomCards}>
          <div className={styles.bottomCard}>
            <Code20Regular className={styles.bottomCardIcon} />
            <Text className={styles.bottomCardTitle}>
              Build apps with code templates
            </Text>
            <Text className={styles.bottomCardDesc}>
              Use code templates to quickly create a proof-of-concept app and
              deploy it to production.
            </Text>
          </div>
          <div className={styles.bottomCard}>
            <BrainCircuit20Regular className={styles.bottomCardIcon} />
            <Text className={styles.bottomCardTitle}>
              Explore Azure AI Services
            </Text>
            <Text className={styles.bottomCardDesc}>
              Create market-ready AI applications using customizable APIs and
              models.
            </Text>
          </div>
        </div>

        </div> {/* end white card */}
      </div>

      {/* ─── Create Project Modal ─── */}
      {modalOpen && (
        <>
          {/* Dark overlay */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
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
              backgroundColor: tokens.colorNeutralBackground1,
              borderRadius: "12px",
              boxShadow: tokens.shadow16,
              padding: "32px",
              width: "480px",
              maxWidth: "90vw",
            }}
          >
            <Text
              style={{
                fontSize: "20px",
                fontWeight: tokens.fontWeightSemibold,
                color: tokens.colorNeutralForeground1,
                display: "block",
                marginBottom: "8px",
              }}
            >
              Create a project to build with agents
            </Text>
            <Text
              style={{
                fontSize: tokens.fontSizeBase300,
                color: tokens.colorNeutralForeground2,
                display: "block",
                marginBottom: "24px",
                lineHeight: tokens.lineHeightBase300,
              }}
            >
              Your Azure AI Foundry project is where you&apos;ll work,
              collaborate, and connect to data and other services.
            </Text>

            <Field label="Project name" required style={{ marginBottom: "16px" }}>
              <Input
                value={projectName}
                onChange={(e, data) => setProjectName(data.value)}
              />
            </Field>

            <div
              style={{
                backgroundColor: tokens.colorNeutralBackground3,
                borderRadius: "8px",
                padding: "14px 16px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
              >
                <div>
                  <Text
                    style={{
                      fontSize: tokens.fontSizeBase300,
                      fontWeight: tokens.fontWeightSemibold,
                      color: tokens.colorNeutralForeground1,
                      display: "block",
                    }}
                  >
                    Advanced options
                  </Text>
                  <Text
                    style={{
                      fontSize: tokens.fontSizeBase200,
                      color: tokens.colorNeutralForeground2,
                      display: "block",
                      marginTop: "2px",
                      lineHeight: tokens.lineHeightBase200,
                    }}
                  >
                    We&apos;ll set up a new project for you with defaults
                    selected for optimal functionality.
                    <br />
                    Your project will be located in the eastus region.
                  </Text>
                </div>
                <ChevronDown12Regular
                  style={{ flexShrink: 0, color: tokens.colorNeutralForeground3 }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
              }}
            >
              <Button appearance="primary" onClick={() => setModalOpen(false)}>
                Create
              </Button>
              <Button
                appearance="secondary"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
