"use client";

import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  Text,
  LargeTitle,
  Subtitle1,
  Subtitle2,
  Body1,
  makeStyles,
  tokens as fluentTokens,
} from "@fluentui/react-components";
import {
  LinkMultiple20Filled,
  PenSparkle20Filled,
  Rocket20Filled,
  CloudArrowUp24Regular,
  Checkmark20Filled,
} from "@fluentui/react-icons";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useNavigation } from "../../../lib/navigation-context";
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp";
import { GitHubAuthModal } from "./github-auth-modal";
import { ImportGitHubStep } from "./import-github-step";
import { ReasoningStep } from "./reasoning-step";
import { ApplicationProfileStep } from "./application-profile-step";
import { DeploymentDetailsStep } from "./deployment-details-step";
import { DeployStep } from "./deploy-step";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

type DeploymentAgentProps = {
  experienceLevel?: "new" | "smb" | "enterprise";
  customHeader?: React.ReactNode | null;
  isDarkMode?: boolean;
};

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  stickyNav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  contentWrapper: {
    display: "flex",
    flex: 1,
    transition: "all 0.3s ease-out",
  },
  mainContent: {
    flex: 1,
    padding: "0 32px 120px",
    maxWidth: "960px",
    margin: "0 auto",
    width: "100%",
  },
  // Stepper
  stepper: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "48px 0 48px",
    width: "100%",
  },
  stepItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "11px",
    width: "160px",
    flexShrink: 0,
  },
  stepCircleActive: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandForeground1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepCircleCompleted: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: tokens.colorPaletteGreenForeground1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepCircleInactive: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: tokens.colorNeutralForegroundDisabled,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  stepLine: {
    flex: 1,
    height: "2px",
    backgroundColor: tokens.colorNeutralStroke2,
    alignSelf: "center",
    marginTop: "16px", // center with the 32px circle
    minWidth: "80px",
  },
  // Hero section
  heroSection: {
    textAlign: "center",
    maxWidth: "1032px",
    margin: "0 auto",
    padding: "48px 0 0",
  },
  heroTitle: {
    display: "block",
    textAlign: "center",
    marginBottom: "28px",
    color: tokens.colorNeutralForeground1,
  },
  heroSubtitle: {
    display: "block",
    textAlign: "center",
    marginBottom: "12px",
    color: tokens.colorNeutralForeground1,
  },
  heroBody: {
    display: "block",
    textAlign: "center",
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
    color: tokens.colorNeutralForeground1,
    marginBottom: "12px",
  },
  heroLink: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
  },
  // Cards section
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "28px",
    marginTop: "48px",
    maxWidth: "1032px",
    margin: "48px auto 0",
  },
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorTransparentStrokeInteractive}`,
    borderRadius: "12px",
    padding: "16px",
    cursor: "pointer",
    boxShadow: tokens.shadow4,
    transition: "all 0.2s ease",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    ":hover": {
      boxShadow: tokens.shadow8,
    },
  },
  cardIconContainer: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    backgroundColor: tokens.colorBrandBackground2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardTextContent: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  privacyDisclaimer: {
    textAlign: "center",
    maxWidth: "1032px",
    margin: "32px auto 0",
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  privacyLink: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
  },
  stepContainerFlex: {
    display: "flex",
    alignItems: "flex-start",
    flex: 1,
  },
  stepContainerBase: {
    display: "flex",
    alignItems: "flex-start",
  },
  iconWhite: {
    color: "white",
  },
  stepLabel: {
    color: tokens.colorNeutralForeground1,
  },
  imgRounded: {
    borderRadius: "8px",
  },
  bodyTextPrimary: {
    color: tokens.colorNeutralForeground1,
  },
  brandIcon: {
    color: tokens.colorBrandForeground1,
  },
  captionSubtle: {
    color: tokens.colorNeutralForeground3,
  },
});

export default function DeploymentAgent({
  experienceLevel = "new",
  customHeader,
  isDarkMode = false,
}: DeploymentAgentProps) {
  const styles = useStyles();
  const router = useRouter();
  const { handlePageChange } = useNavigation();
  const [showGitHubAuth, setShowGitHubAuth] = useState(false);
  const [currentView, setCurrentView] = useState<
    | "landing"
    | "import-github"
    | "reasoning"
    | "app-profile"
    | "deployment-details"
    | "deploy"
  >("landing");
  const [deployComplete, setDeployComplete] = useState(false);

  // Scroll to top when navigating between steps
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Derive activeStep from currentView so stepper always reflects the correct state
  const activeStep = (() => {
    switch (currentView) {
      case "landing":
      case "import-github":
      case "reasoning":
        return 0;
      case "app-profile":
        return 1;
      case "deployment-details":
        return 2;
      case "deploy":
        return deployComplete ? 4 : 3;
      default:
        return 0;
    }
  })();

  const views = [
    "landing",
    "import-github",
    "reasoning",
    "app-profile",
    "deployment-details",
    "deploy",
  ] as const;

  const advanceView = useCallback(() => {
    const currentIndex = views.indexOf(currentView);
    if (currentIndex < views.length - 1) {
      setCurrentView(views[currentIndex + 1]);
    }
  }, [currentView]);

  const retreatView = useCallback(() => {
    const currentIndex = views.indexOf(currentView);
    if (currentIndex > 0) {
      setCurrentView(views[currentIndex - 1]);
    }
  }, [currentView]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        advanceView();
      } else if (e.key === "ArrowLeft") {
        retreatView();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [advanceView, retreatView]);

  const steps = [
    { label: "Import application", icon: LinkMultiple20Filled },
    { label: "Application profile", icon: PenSparkle20Filled },
    { label: "Deployment details", icon: PenSparkle20Filled },
    { label: "Deploy", icon: Rocket20Filled },
  ];

  return (
    <FluentProvider theme={isDarkMode ? webDarkTheme : webLightTheme}>
      <div className={styles.container}>
        {customHeader !== null &&
          (customHeader ? (
            <div className={styles.stickyNav}>{customHeader}</div>
          ) : (
            <div className={styles.stickyNav}>
              <AzureHeaderBuildMVP
                activeLink="Home"
                experienceLevel={experienceLevel}
                disabledItems={["Build", "Manage"]}
                stayOnCurrentPage={true}
                initialNavOpen={false}
                hideManage={true}
                isDarkMode={isDarkMode}
              />
            </div>
          ))}

        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            {/* Stepper */}
            <div className={styles.stepper}>
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.label}
                    className={index < steps.length - 1 ? styles.stepContainerFlex : styles.stepContainerBase}
                  >
                    <div className={styles.stepItem}>
                      <div
                        className={
                          index < activeStep
                            ? styles.stepCircleCompleted
                            : index === activeStep
                              ? styles.stepCircleActive
                              : styles.stepCircleInactive
                        }
                      >
                        {index < activeStep ? (
                          <Checkmark20Filled className={styles.iconWhite} />
                        ) : (
                          <Icon className={styles.iconWhite} />
                        )}
                      </div>
                      <Subtitle2 className={styles.stepLabel}>
                        {step.label}
                      </Subtitle2>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={styles.stepLine} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Step content */}
            {currentView === "landing" ? (
              <>
                {/* Hero content */}
                <div className={styles.heroSection}>
                  <LargeTitle className={styles.heroTitle}>
                    Streamline onboarding with AI app detection and guidance
                  </LargeTitle>
                  <Subtitle1 className={styles.heroSubtitle}>
                    Get smart service recommendations and deploy faster
                  </Subtitle1>
                  <Text className={styles.heroBody}>
                    Upload or import your code from GitHub, and Azure will
                    create a detailed app profile, suggest a hosting service,
                    and prepare your deployment.
                  </Text>
                  <a className={styles.heroLink}>
                    See supported programming languages and platforms
                  </a>
                </div>

                {/* Import cards */}
                <div className={styles.cardsGrid}>
                  <div
                    className={styles.card}
                    onClick={() => setShowGitHubAuth(true)}
                  >
                    <img
                      src="/icons/github.svg"
                      alt="GitHub"
                      width={36}
                      height={36}
                      className={styles.imgRounded}
                    />
                    <div className={styles.cardTextContent}>
                      <Subtitle2>Import an app from GitHub</Subtitle2>
                      <Body1 className={styles.bodyTextPrimary}>
                        Already on GitHub? Just connect your account to get
                        started.
                      </Body1>
                    </div>
                  </div>
                  <div className={styles.card}>
                    <div className={styles.cardIconContainer}>
                      <CloudArrowUp24Regular className={styles.brandIcon} />
                    </div>
                    <div className={styles.cardTextContent}>
                      <Subtitle2>Upload your app as a zip file</Subtitle2>
                      <Body1 className={styles.bodyTextPrimary}>
                        No GitHub, no problem. Upload your app as a .zip file.
                      </Body1>
                    </div>
                  </div>
                </div>

                {/* Privacy disclaimer */}
                <div className={styles.privacyDisclaimer}>
                  <Text
                    size={200}
                    className={styles.captionSubtle}
                  >
                    Your source data isn&apos;t stored in Azure once your
                    session expires, and isn&apos;t used to train AI.{" "}
                    <a
                      className={styles.privacyLink}
                      href="https://privacy.microsoft.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Microsoft Data Privacy Policy
                    </a>
                  </Text>
                </div>
              </>
            ) : currentView === "import-github" ? (
              <ImportGitHubStep
                onBack={() => setCurrentView("landing")}
                onNext={() => setCurrentView("reasoning")}
              />
            ) : currentView === "reasoning" ? (
              <ReasoningStep
                onComplete={() => {
                  setCurrentView("app-profile");
                }}
              />
            ) : currentView === "app-profile" ? (
              <ApplicationProfileStep
                onBack={() => {
                  setCurrentView("reasoning");
                }}
                onNext={() => {
                  setCurrentView("deployment-details");
                }}
              />
            ) : currentView === "deployment-details" ? (
              <DeploymentDetailsStep
                onBack={() => {
                  setCurrentView("app-profile");
                }}
                onNext={() => {
                  setCurrentView("deploy");
                }}
              />
            ) : currentView === "deploy" ? (
              <DeployStep
                onCancel={() => {
                  setCurrentView("deployment-details");
                }}
                onHome={() => {
                  handlePageChange("returning-home");
                }}
                onManage={() => {
                  handlePageChange("resource-manager-post-deploy");
                }}
                onDeployComplete={() => {
                  setDeployComplete(true);
                }}
              />
            ) : null}
          </div>
        </div>
      </div>

      <GitHubAuthModal
        open={showGitHubAuth}
        onDismiss={() => setShowGitHubAuth(false)}
        onSignIn={() => {
          setShowGitHubAuth(false);
          setCurrentView("import-github");
        }}
      />
    </FluentProvider>
  );
}
