"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Button as FluentButton,
  Input,
  Field,
  Dropdown,
  Option,
  Checkbox,
  Radio,
  RadioGroup,
  Spinner,
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  Subtitle1,
} from "@fluentui/react-components";
import {
  Info24Regular,
  Info16Regular,
  Info12Regular,
  Dismiss24Regular,
  Checkmark48Regular,
} from "@fluentui/react-icons";
import { useNavigation } from "../../lib/navigation-context";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: "transparent", // Transparent to show waves background
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    zIndex: 50, // Above background elements but allows top icons (z-index: 10) to be behind
  },
  formContainer: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "46px",
    maxWidth: "480px",
    width: "100%",
    boxShadow: tokens.shadow64, // Intense elevation for modal
    position: "relative",
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    right: "0",
    width: "32px",
    height: "32px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    color: tokens.colorNeutralForeground2,
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
      color: tokens.colorNeutralForeground1,
    },
  },
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "24px",
    position: "relative",
    zIndex: 2,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  logoIcon: {
    width: "135px", // Increased logo size by 25% from 108px to 135px width
    height: "30px", // Increased logo size by 25% from 24px to 30px height
  },
  title: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    margin: "0 0 32px 0",
    textAlign: "center",
    display: "block",
    width: "100%",
  },
  progressContainer: {
    width: "100%",
    marginBottom: "32px",
  },
  progressBar: {
    width: "100%",
    height: "2px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "1px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: tokens.colorBrandStroke1,
    borderRadius: "1px",
    transition: "width 0.3s ease",
  },
  creditsInfo: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    padding: "8px 12px",
    borderRadius: "4px",
    fontSize: "13px",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    lineHeight: "1.5",
  },
  fieldLabel: {
    fontWeight: tokens.fontWeightSemibold,
  },
  fieldLabelWithIcon: {
    fontWeight: tokens.fontWeightSemibold,
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "16px",
  },
  fullWidth: {
    gridColumn: "1 / -1",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "16px",
  },
  cardNumberContainer: {
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  cardIcons: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
  },
  cardIcon: {
    width: "24px",
    height: "16px",
    borderRadius: "2px",
  },
  visa: {
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#1a1f71",
    color: "white",
    fontSize: "10px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mastercard: {
    // eslint-disable-next-line no-restricted-syntax
    background: "linear-gradient(45deg, #eb001b, #ff5f00)",
  },
  amex: {
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#006fcf",
  },
  discover: {
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#ff6000",
  },
  addressGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
    marginBottom: "0px",
  },
  dropdownField: {
    width: "100%",
    "& .fui-Dropdown": {
      width: "100%",
      minWidth: "0", // Prevent dropdown from expanding beyond container
    },
  },
  checkbox: {
    marginTop: "16px",
    marginBottom: "20px",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    width: "100%",
    justifyContent: "space-between",
    marginTop: "24px",
  },
  button: {
    minWidth: "80px",
    height: "40px",
  },
  buttonFullWidth: {
    width: "100%",
    height: "40px",
  },
  fieldSpacing: {
    marginBottom: "16px",
  },
  helpText: {
    marginTop: "8px",
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.4",
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  radioGroup: {
    marginBottom: "32px",
  },
  termsSection: {
    marginBottom: "24px",
  },
  termsTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "12px",
  },
  termsText: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.6",
    marginTop: "16px",
  },
  termsLink: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "24px",
    minHeight: "300px",
  },
  loadingTitle: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  successContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "200px",
    textAlign: "center",
  },
  successTitle: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "48px",
    textAlign: "center",
  },
  celebrationEmoji: {
    fontSize: "120px",
    marginBottom: "16px",
    width: "140px",
    height: "140px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  celebrationIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  arkoseContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
  },
  arkoseTitle: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    textAlign: "center",
    marginBottom: "8px",
  },
  arkoseChallenge: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  arkoseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    width: "100%",
  },
  arkoseImage: {
    width: "100%",
    aspectRatio: "1",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "4px",
    border: `2px solid ${tokens.colorNeutralStroke2}`,
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "64px",
  },
  arkoseImageSelected: {
    border: `2px solid ${tokens.colorBrandForeground1}`,
    backgroundColor: tokens.colorBrandBackground2,
  },
  arkoseInstruction: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    textAlign: "center",
    marginBottom: "8px",
  },
  arkoseVerifyButton: {
    width: "100%",
    marginTop: "8px",
  },
  loadingPlaceholder: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  confettiCanvas: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 1,
  },
  contentWrapper: {
    position: "relative",
    zIndex: 2,
  },
  spinnerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingVerticalL,
    padding: "40px 0",
  },
  secondaryText: {
    color: tokens.colorNeutralForeground2,
  },
  secondaryTextCenter: {
    color: tokens.colorNeutralForeground2,
    textAlign: "center",
  },
  arkoseVideoContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0",
  },
  arkoseVideo: {
    width: "100%",
    maxWidth: "400px",
    height: "auto",
    borderRadius: tokens.borderRadiusMedium,
  },
  displayBlock: {
    display: "block",
  },
  checkmarkCircle: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandBackground2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animationName: {
      from: { transform: "scale(0)", opacity: 0 },
      to: { transform: "scale(1)", opacity: 1 },
    },
    animationDuration: "0.5s",
    animationTimingFunction: "ease-out",
  },
  checkmarkIconLarge: {
    width: "64px",
    height: "64px",
    color: tokens.colorBrandStroke1,
    animationName: {
      from: { transform: "scale(0) rotate(-45deg)", opacity: 0 },
      to: { transform: "scale(1) rotate(0deg)", opacity: 1 },
    },
    animationDuration: "0.6s",
    animationTimingFunction: "ease-out",
    animationDelay: "0.3s",
    animationFillMode: "both",
  },
  learnMoreLink: {
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
  },
  noMarginBottom: {
    marginBottom: "0px",
  },
  creditCardLink: {
    color: tokens.colorBrandForeground1,
    textDecoration: "underline",
  },
  // Variant classes for conditional styles
  containerDark: {
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "rgba(26, 26, 26, 0.85)",
  },
  containerEmbedded: {
    padding: "0",
  },
  formContainerCustomPlus: {
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  formContainerEmbedded: {
    padding: "24px",
    maxWidth: "none",
    boxShadow: "none",
    borderRadius: "0",
    margin: "0",
  },
  headerCustomPlus: {
    marginTop: "-16px",
  },
  closeButtonHidden: {
    display: "none",
  },
  titleCustomPlus: {
    textAlign: "left",
    fontSize: "20px",
  },
  successContainerCustomPlus: {
    alignItems: "flex-start",
    textAlign: "left",
  },
  celebrationEmojiCustomPlus: {
    alignSelf: "center",
  },
  successTitleAnimA: {
    opacity: 0,
    animationName: {
      from: { opacity: 0, transform: "translateY(10px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    animationDuration: "0.6s",
    animationTimingFunction: "ease-out",
    animationDelay: "1.7s",
    animationFillMode: "forwards",
  },
  successSubtitleAnimA: {
    opacity: 0,
    animationName: {
      from: { opacity: 0, transform: "translateY(10px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    animationDuration: "0.6s",
    animationTimingFunction: "ease-out",
    animationDelay: "2s",
    animationFillMode: "forwards",
  },
  successTitleAnimB: {
    opacity: 0,
    animationName: {
      from: { opacity: 0, transform: "translateY(10px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    animationDuration: "0.6s",
    animationTimingFunction: "ease-out",
    animationDelay: "1.2s",
    animationFillMode: "forwards",
  },
  successSubtitleAnimB: {
    opacity: 0,
    animationName: {
      from: { opacity: 0, transform: "translateY(10px)" },
      to: { opacity: 1, transform: "translateY(0)" },
    },
    animationDuration: "0.6s",
    animationTimingFunction: "ease-out",
    animationDelay: "1.5s",
    animationFillMode: "forwards",
  },
  successSubtitleCustomPlus: {
    textAlign: "left",
    fontSize: "12px",
  },
  progressFill1: { width: "20%" },
  progressFill2: { width: "40%" },
  progressFill3: { width: "60%" },
  progressFill4: { width: "80%" },
  progressFill5: { width: "100%" },
  fieldLabelCustomPlus: {
    fontWeight: tokens.fontWeightRegular,
  },
  inputCustomPlus: {
    borderRadius: "4px",
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#141414",
    border: "none",
  },
  dropdownCustomPlus: {
    borderRadius: "4px",
    // eslint-disable-next-line no-restricted-syntax
    backgroundColor: "#141414",
    border: "none",
  },
  cardNumberInput: {
    paddingRight: "120px",
    width: "100%",
  },
  buttonGroupCustomPlus: {
    justifyContent: "flex-end",
  },
});

export default function SignupModal({
  onClose,
  isDarkMode,
  isCustomPlus,
  isCustomDark,
  enableCloseButton,
  successVariant = "A",
  autoNavigateOnSuccess,
  isEmbedded,
}: {
  onClose?: (isSuccess?: boolean) => void;
  isDarkMode?: boolean;
  isCustomPlus?: boolean;
  isCustomDark?: boolean;
  enableCloseButton?: boolean;
  successVariant?: "A" | "B";
  autoNavigateOnSuccess?: boolean;
  isEmbedded?: boolean;
}) {
  const [step, setStep] = useState(1);
  const [isStylesLoaded, setIsStylesLoaded] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showArkose, setShowArkose] = useState(false);
  const [isLoadingStep, setIsLoadingStep] = useState(false);
  const [isCompletingSignup, setIsCompletingSignup] = useState(false);

  // Resize the popup window to fit content when embedded
  const containerRef = useRef<HTMLDivElement>(null);
  // Note: window.resizeTo is unreliable on macOS — popup stays at opened size (560px)
  // Content scrolls within the popup if a step is taller than the window

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "",
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    address1: "",
    address2: "",
    zipCode: "",
    city: "",
    state: "",
    billingCountry: "",
    sameAsPrimary: true,
    accountUsage: "",
    agreeToMarketing: false,
  });
  const { handlePageChange } = useNavigation();

  const styles = useStyles();

  useEffect(() => {
    setIsStylesLoaded(true);
  }, []);

  useEffect(() => {
    if (!showSuccess) return;

    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;

    // Lazy load confetti only when needed (performance optimization)
    const loadConfetti = async () => {
      const confettiModule = await import("canvas-confetti");
      const confetti = confettiModule.default;

      // Get the canvas element inside the modal
      const canvas = document.getElementById(
        "confetti-canvas",
      ) as HTMLCanvasElement;
      if (!canvas) return;

      // Set canvas size manually to match container
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Create confetti instance for this specific canvas
      const myConfetti = confetti.create(canvas, {
        resize: false,
      });

      // Use purple colors for AIF Custom, blue for Light/Dark Out of Box
      /* eslint-disable no-restricted-syntax */
      const confettiColors = isCustomDark
        ? ["#8251EE", "#9263F1", "#A175F3", "#C7B3FF", "#E0D4FF"] // Purple gradient for AIF Custom
        : ["#0078d4", "#50e6ff", "#c7d2fe", "#a5b4fc"]; // Blue gradient for Light/Dark OOB
      /* eslint-enable no-restricted-syntax */

      // Delay confetti to match text fade-in timing
      const confettiDelay = successVariant === "A" ? 800 : 500;

      timeoutId = setTimeout(() => {
        const duration = 1000;
        const end = Date.now() + duration;

        const frame = () => {
          // Spread confetti across the bottom - random x positions
          const randomX = Math.random(); // Random position from 0 to 1 across bottom
          myConfetti({
            particleCount: 2,
            angle: 90,
            spread: 45,
            origin: { x: randomX, y: 1 },
            colors: confettiColors,
            startVelocity: 55,
          });

          if (Date.now() < end) {
            animationFrameId = requestAnimationFrame(frame);
          }
        };

        frame();
      }, confettiDelay);
    };

    loadConfetti();

    // Cleanup function to cancel animations if component unmounts or dependencies change
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showSuccess, isCustomDark, isDarkMode, isCustomPlus, successVariant]);

  const handleNext = useCallback(() => {
    // Prevent advancing if already on success or in Arkose loading
    if (showSuccess || isLoadingStep) return;

    // Skip through loading states if user presses key
    if (isVerifying) {
      setIsVerifying(false);
      setStep(4);
      return;
    }

    if (isCompletingSignup) {
      setIsCompletingSignup(false);
      setShowSuccess(true);
      return;
    }

    if (step === 1) {
      // Show Arkose challenge after step 1
      setShowArkose(true);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Show loading state for 3 seconds before moving to step 4
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setStep(4);
      }, 3000);
    } else if (step === 4) {
      // Show loading state for 5 seconds before showing success
      setIsCompletingSignup(true);
      setTimeout(() => {
        setIsCompletingSignup(false);
        setShowSuccess(true);
      }, 6000);
    } else {
      handlePageChange("home-fre"); // Fixed navigation to use correct page ID
    }
  }, [
    showSuccess,
    isLoadingStep,
    isVerifying,
    isCompletingSignup,
    step,
    handlePageChange,
  ]);

  const handleArkoseComplete = useCallback(() => {
    setShowArkose(false);
    setIsLoadingStep(true);

    // Show loading spinner for 800ms before showing Step 2
    setTimeout(() => {
      setIsLoadingStep(false);
      setStep(2);
    }, 800);
  }, []);

  const handleBack = useCallback(() => {
    // Prevent going back if in any loading state or on success screen
    if (
      isVerifying ||
      isLoadingStep ||
      isCompletingSignup ||
      showSuccess ||
      showArkose
    )
      return;

    if (step > 1) {
      setStep(step - 1);
    }
  }, [
    isVerifying,
    isLoadingStep,
    isCompletingSignup,
    showSuccess,
    showArkose,
    step,
  ]);

  const handleInputChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Keyboard navigation with arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle arrow keys if not in an input field
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowRight" || e.key === "Enter") {
        // Advance to next step, complete Arkose, or close from success (E2E only)
        if (showSuccess && onClose && enableCloseButton) {
          onClose(true);
        } else if (showArkose) {
          handleArkoseComplete();
        } else if (!isLoadingStep && !showSuccess) {
          // Allow navigation even during isVerifying and isCompletingSignup
          handleNext();
        }
      } else if (e.key === "ArrowLeft") {
        // Go back (including from success screen)
        if (showSuccess) {
          // Go back from success to step 4
          console.log("Going back from success to step 4");
          setShowSuccess(false);
          setStep(4);
        } else if (
          step > 1 &&
          !isVerifying &&
          !showArkose &&
          !isLoadingStep &&
          !isCompletingSignup
        ) {
          handleBack();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    showSuccess,
    showArkose,
    isLoadingStep,
    enableCloseButton,
    onClose,
    handleNext,
    handleArkoseComplete,
    handleBack,
    step,
    isVerifying,
    isCompletingSignup,
  ]);

  // Auto-navigate after success (for POC)
  useEffect(() => {
    if (showSuccess && autoNavigateOnSuccess && onClose) {
      const timer = setTimeout(() => {
        onClose(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, autoNavigateOnSuccess, onClose]);

  if (!isStylesLoaded) {
    return <div className={styles.loadingPlaceholder} />;
  }

  return (
    <div
      className={mergeClasses(
        !isEmbedded ? styles.container : undefined,
        !isCustomDark && !isCustomPlus && isDarkMode
          ? styles.containerDark
          : undefined,
        isEmbedded ? styles.containerEmbedded : undefined,
      )}
    >
      <div
        ref={containerRef}
        className={mergeClasses(
          styles.formContainer,
          isCustomPlus ? styles.formContainerCustomPlus : undefined,
          isEmbedded ? styles.formContainerEmbedded : undefined,
        )}
      >
        {/* Confetti Canvas - positioned inside modal */}
        {showSuccess && (
          <canvas id="confetti-canvas" className={styles.confettiCanvas} />
        )}
        <div
          className={mergeClasses(
            styles.header,
            isCustomPlus ? styles.headerCustomPlus : undefined,
          )}
        >
          <div className={styles.logo}>
            <Image
              src="/azure-logo.svg"
              alt="Microsoft Azure"
              width={135}
              height={30}
              className={styles.logoIcon}
              priority
            />
          </div>
          <button
            aria-label="Close"
            className={mergeClasses(
              styles.closeButton,
              isEmbedded ? styles.closeButtonHidden : undefined,
            )}
            onClick={() => {
              // Only allow closing if enableCloseButton is true (E2E page)
              if (enableCloseButton) {
                if (onClose) {
                  onClose(showSuccess);
                } else {
                  setStep(1);
                  setShowSuccess(false);
                  setIsVerifying(false);
                }
              }
              // Do nothing for modal page (consistency across themes)
            }}
          >
            <Dismiss24Regular />
          </button>
        </div>

        {/* Content wrapper with z-index to appear above confetti */}
        <div className={styles.contentWrapper}>
          {!isVerifying &&
            !showSuccess &&
            !showArkose &&
            !isLoadingStep &&
            !isCompletingSignup && (
              <Subtitle1
                className={mergeClasses(
                  styles.title,
                  isCustomPlus ? styles.titleCustomPlus : undefined,
                )}
              >
                Sign up now
              </Subtitle1>
            )}

          {isCompletingSignup ? (
            <>
              <Subtitle1
                className={mergeClasses(
                  styles.title,
                  isCustomPlus ? styles.titleCustomPlus : undefined,
                )}
              >
                Doing some final checks
              </Subtitle1>
              <div className={styles.spinnerContainer}>
                <Spinner size="large" />
                <Text className={styles.secondaryTextCenter}>
                  Creating your account...
                  <br />
                  This may take several seconds.
                </Text>
              </div>
            </>
          ) : showArkose ? (
            <>
              <Subtitle1
                className={mergeClasses(
                  styles.title,
                  isCustomPlus ? styles.titleCustomPlus : undefined,
                )}
              >
                Let's prove you're human
              </Subtitle1>
              <div className={styles.arkoseVideoContainer}>
                <video
                  autoPlay
                  muted
                  playsInline
                  onEnded={() => {
                    setTimeout(() => {
                      handleArkoseComplete();
                    }, 1000);
                  }}
                  className={styles.arkoseVideo}
                >
                  <source src="/arkose1.mov" type="video/mp4" />
                </video>
              </div>
            </>
          ) : isLoadingStep ? (
            <div className={styles.spinnerContainer}>
              <Spinner size="large" />
              <Text className={styles.secondaryText}>Loading...</Text>
            </div>
          ) : showSuccess ? (
            <div
              className={mergeClasses(
                styles.successContainer,
                isCustomPlus ? styles.successContainerCustomPlus : undefined,
              )}
            >
              {successVariant === "A" ? (
                <>
                  <div
                    className={mergeClasses(
                      styles.celebrationEmoji,
                      isCustomPlus
                        ? styles.celebrationEmojiCustomPlus
                        : undefined,
                    )}
                    key="a-emoji"
                  >
                    <img
                      src={`/icons/Azure_Logo_Alpha.gif?t=${Date.now()}`}
                      alt="Azure Logo"
                      width={120}
                      height={120}
                      className={styles.displayBlock}
                      key={Date.now()}
                    />
                  </div>
                  <div
                    className={mergeClasses(
                      styles.successTitle,
                      styles.successTitleAnimA,
                      isCustomPlus ? styles.titleCustomPlus : undefined,
                    )}
                    key={`a-title-${isDarkMode}-${isCustomDark}-${isCustomPlus}`}
                  >
                    Your Azure account is ready!
                  </div>
                  <div
                    className={mergeClasses(
                      styles.successSubtitle,
                      styles.successSubtitleAnimA,
                      isCustomPlus
                        ? styles.successSubtitleCustomPlus
                        : undefined,
                    )}
                    key={`a-subtitle-${isDarkMode}-${isCustomDark}-${isCustomPlus}`}
                  >
                    Start building your first project with $200 in
                    Azure&nbsp;credits.
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={mergeClasses(
                      styles.celebrationEmoji,
                      isCustomPlus
                        ? styles.celebrationEmojiCustomPlus
                        : undefined,
                    )}
                    key={`b-emoji-${isDarkMode}-${isCustomDark}-${isCustomPlus}`}
                  >
                    <div className={styles.checkmarkCircle}>
                      <Checkmark48Regular
                        className={styles.checkmarkIconLarge}
                      />
                    </div>
                  </div>
                  <div
                    className={mergeClasses(
                      styles.successTitle,
                      styles.successTitleAnimB,
                      isCustomPlus ? styles.titleCustomPlus : undefined,
                    )}
                    key={`b-title-${isDarkMode}-${isCustomDark}-${isCustomPlus}`}
                  >
                    Your Azure account is ready!
                  </div>
                  <div
                    className={mergeClasses(
                      styles.successSubtitle,
                      styles.successSubtitleAnimB,
                      isCustomPlus
                        ? styles.successSubtitleCustomPlus
                        : undefined,
                    )}
                    key={`b-subtitle-${isDarkMode}-${isCustomDark}-${isCustomPlus}`}
                  >
                    Start building your first project with $200 in
                    Azure&nbsp;credits.
                  </div>
                </>
              )}
              <style jsx>{`
                @keyframes fadeInText {
                  from {
                    opacity: 0;
                    transform: translateY(10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: translateY(10px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                @keyframes scaleIn {
                  from {
                    transform: scale(0);
                    opacity: 0;
                  }
                  to {
                    transform: scale(1);
                    opacity: 1;
                  }
                }
                @keyframes checkmarkDraw {
                  from {
                    transform: scale(0) rotate(-45deg);
                    opacity: 0;
                  }
                  to {
                    transform: scale(1) rotate(0deg);
                    opacity: 1;
                  }
                }
              `}</style>
            </div>
          ) : isVerifying ? (
            <>
              <Subtitle1
                className={mergeClasses(
                  styles.title,
                  isCustomPlus ? styles.titleCustomPlus : undefined,
                )}
              >
                Verifying your identity
              </Subtitle1>
              <div className={styles.spinnerContainer}>
                <Spinner size="large" />
                <Text className={styles.secondaryText}>Verifying...</Text>
              </div>
            </>
          ) : (
            <>
              <div className={styles.progressContainer}>
                <div className={styles.progressBar}>
                  <div
                    className={mergeClasses(
                      styles.progressFill,
                      step === 1
                        ? styles.progressFill1
                        : step === 2
                          ? styles.progressFill2
                          : step === 3
                            ? styles.progressFill3
                            : step === 4
                              ? styles.progressFill4
                              : styles.progressFill5,
                    )}
                  />
                </div>
              </div>
              {step === 1 ? (
                <>
                  <div className={styles.creditsInfo}>
                    <Info16Regular />
                    Your free Azure account includes $200 in credits.
                  </div>

                  <div className={styles.formGrid}>
                    <Field
                      label="First name"
                      className={mergeClasses(
                        styles.fieldLabel,
                        isCustomPlus ? styles.fieldLabelCustomPlus : undefined,
                      )}
                    >
                      <Input
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className={
                          isCustomPlus ? styles.inputCustomPlus : undefined
                        }
                      />
                    </Field>
                    <Field
                      label="Last name"
                      className={mergeClasses(
                        styles.fieldLabel,
                        isCustomPlus ? styles.fieldLabelCustomPlus : undefined,
                      )}
                    >
                      <Input
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className={
                          isCustomPlus ? styles.inputCustomPlus : undefined
                        }
                      />
                    </Field>

                    <Field
                      label={
                        <div
                          className={mergeClasses(
                            styles.fieldLabelWithIcon,
                            isCustomPlus
                              ? styles.fieldLabelCustomPlus
                              : undefined,
                          )}
                        >
                          <span>Email</span>
                          <Info16Regular />
                        </div>
                      }
                      className={styles.fullWidth}
                    >
                      <Input
                        placeholder="kat@gmail.com"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={
                          isCustomPlus ? styles.inputCustomPlus : undefined
                        }
                      />
                    </Field>

                    <Field
                      label={
                        <div
                          className={mergeClasses(
                            styles.fieldLabelWithIcon,
                            isCustomPlus
                              ? styles.fieldLabelCustomPlus
                              : undefined,
                          )}
                        >
                          <span>Phone</span>
                          <Info16Regular />
                        </div>
                      }
                      className={styles.fullWidth}
                    >
                      <Input
                        placeholder="(425) 555-0100"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className={
                          isCustomPlus ? styles.inputCustomPlus : undefined
                        }
                      />
                    </Field>

                    <Field
                      label={
                        <div
                          className={mergeClasses(
                            styles.fieldLabelWithIcon,
                            isCustomPlus
                              ? styles.fieldLabelCustomPlus
                              : undefined,
                          )}
                        >
                          <span>Country/Region</span>
                          <Info16Regular />
                        </div>
                      }
                      className={styles.fullWidth}
                    >
                      <Dropdown
                        placeholder="Country/Region"
                        value={formData.country}
                        onOptionSelect={(e, data) =>
                          handleInputChange("country", data.optionValue || "")
                        }
                        className={
                          isCustomPlus ? styles.dropdownCustomPlus : undefined
                        }
                      >
                        <Option value="us">United States</Option>
                        <Option value="ca">Canada</Option>
                        <Option value="uk">United Kingdom</Option>
                        <Option value="de">Germany</Option>
                        <Option value="fr">France</Option>
                      </Dropdown>
                      <div className={styles.helpText}>
                        Choose the location that matches your billing address.
                        You cannot change this selection later. If your country
                        is not listed, the offer is not available in your
                        region.{" "}
                        <Text
                          weight="semibold"
                          className={styles.learnMoreLink}
                        >
                          Learn more
                        </Text>
                      </div>
                    </Field>
                  </div>
                </>
              ) : step === 2 ? (
                <>
                  <Field
                    label={
                      <div
                        className={mergeClasses(
                          styles.fieldLabelWithIcon,
                          isCustomPlus
                            ? styles.fieldLabelCustomPlus
                            : undefined,
                        )}
                      >
                        <span>Enter your primary address</span>
                        <Info16Regular />
                      </div>
                    }
                    className={`${styles.fullWidth} ${styles.fieldSpacing}`}
                  >
                    <Input
                      placeholder="Address line 1"
                      value={formData.address1}
                      onChange={(e) =>
                        handleInputChange("address1", e.target.value)
                      }
                      className={
                        isCustomPlus ? styles.inputCustomPlus : undefined
                      }
                    />
                  </Field>

                  <Field
                    label=""
                    className={`${styles.fullWidth} ${styles.fieldSpacing}`}
                  >
                    <Input
                      placeholder="Address line 2 (optional)"
                      value={formData.address2}
                      onChange={(e) =>
                        handleInputChange("address2", e.target.value)
                      }
                      className={
                        isCustomPlus ? styles.inputCustomPlus : undefined
                      }
                    />
                  </Field>

                  <div
                    className={`${styles.cardGrid} ${styles.noMarginBottom}`}
                  >
                    <Field label="">
                      <Input
                        placeholder="Zip code"
                        value={formData.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                        className={
                          isCustomPlus ? styles.inputCustomPlus : undefined
                        }
                      />
                    </Field>

                    <Field label="">
                      <Input
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        className={
                          isCustomPlus ? styles.inputCustomPlus : undefined
                        }
                      />
                    </Field>
                  </div>

                  <div className={styles.addressGrid}>
                    <Field label="" className={styles.dropdownField}>
                      <Dropdown
                        placeholder="State"
                        value={formData.state}
                        onOptionSelect={(e, data) =>
                          handleInputChange("state", data.optionValue || "")
                        }
                        className={
                          isCustomPlus ? styles.dropdownCustomPlus : undefined
                        }
                      >
                        <Option value="wa">Washington</Option>
                        <Option value="ca">California</Option>
                        <Option value="ny">New York</Option>
                        <Option value="tx">Texas</Option>
                      </Dropdown>
                    </Field>

                    <Field label="" className={styles.dropdownField}>
                      <Dropdown
                        placeholder="Country/Region"
                        value={formData.billingCountry}
                        onOptionSelect={(e, data) =>
                          handleInputChange(
                            "billingCountry",
                            data.optionValue || "",
                          )
                        }
                        className={
                          isCustomPlus ? styles.dropdownCustomPlus : undefined
                        }
                      >
                        <Option value="us">United States</Option>
                        <Option value="ca">Canada</Option>
                        <Option value="uk">United Kingdom</Option>
                      </Dropdown>
                    </Field>
                  </div>
                </>
              ) : step === 3 ? (
                <>
                  <div className={styles.sectionTitle}>
                    <span>How do you plan to use your Azure account?</span>
                    <Info16Regular />
                  </div>

                  <RadioGroup
                    className={styles.radioGroup}
                    value={formData.accountUsage}
                    onChange={(e, data) =>
                      handleInputChange("accountUsage", data.value)
                    }
                  >
                    <Radio value="personal" label="For personal use" />
                    <Radio
                      value="organization"
                      label="For use in connection with an organization, university, research group, NGO"
                    />
                  </RadioGroup>

                  <div className={styles.termsSection}>
                    <div className={styles.termsTitle}>Agree to our terms</div>
                    <Checkbox
                      checked={formData.agreeToMarketing}
                      onChange={(e, data) =>
                        handleInputChange(
                          "agreeToMarketing",
                          data.checked?.toString() || "false",
                        )
                      }
                      label="I would like Microsoft to share my information with partners to receive updates about their products and services."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.creditsInfo}>
                    <Info16Regular />
                    <span>
                      Your account is free.{" "}
                      <a href="#" className={styles.creditCardLink}>
                        Learn why we ask for a credit card.
                      </a>
                    </span>
                  </div>

                  <Field
                    label="Card information"
                    required
                    className={mergeClasses(
                      styles.fullWidth,
                      styles.fieldLabel,
                      styles.fieldSpacing,
                      isCustomPlus ? styles.fieldLabelCustomPlus : undefined,
                    )}
                  >
                    <Input
                      placeholder="Cardholder name"
                      value={formData.cardholderName}
                      onChange={(e) =>
                        handleInputChange("cardholderName", e.target.value)
                      }
                      className={
                        isCustomPlus ? styles.inputCustomPlus : undefined
                      }
                    />
                  </Field>

                  <Field
                    label=""
                    className={`${styles.fullWidth} ${styles.fieldSpacing}`}
                  >
                    <div className={styles.cardNumberContainer}>
                      <Input
                        placeholder="Card number"
                        value={formData.cardNumber}
                        onChange={(e) =>
                          handleInputChange("cardNumber", e.target.value)
                        }
                        className={mergeClasses(
                          styles.cardNumberInput,
                          isCustomPlus ? styles.inputCustomPlus : undefined,
                        )}
                      />
                      <div className={styles.cardIcons}>
                        <Image
                          src="/icons/visa.svg"
                          alt="Visa"
                          width={24}
                          height={16}
                        />
                        <Image
                          src="/icons/mc.svg"
                          alt="Mastercard"
                          width={24}
                          height={16}
                        />
                        <Image
                          src="/icons/amex.svg"
                          alt="Amex"
                          width={24}
                          height={16}
                        />
                        <Image
                          src="/icons/discover.svg"
                          alt="Discover"
                          width={24}
                          height={16}
                        />
                      </div>
                    </div>
                  </Field>

                  <div className={styles.cardGrid}>
                    <Field label="">
                      <Input
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) =>
                          handleInputChange("expiryDate", e.target.value)
                        }
                        className={
                          isCustomPlus ? styles.inputCustomPlus : undefined
                        }
                      />
                    </Field>

                    <Field label="">
                      <Input
                        placeholder="CVC"
                        value={formData.cvc}
                        onChange={(e) =>
                          handleInputChange("cvc", e.target.value)
                        }
                        className={
                          isCustomPlus ? styles.inputCustomPlus : undefined
                        }
                      />
                    </Field>
                  </div>
                </>
              )}

              {!isVerifying &&
                (step > 1 ? (
                  <div
                    className={mergeClasses(
                      styles.buttonGroup,
                      isCustomPlus ? styles.buttonGroupCustomPlus : undefined,
                    )}
                  >
                    {isCustomPlus ? (
                      <>
                        <FluentButton
                          appearance="primary"
                          className={styles.button}
                          onClick={handleNext}
                        >
                          {step === 4 ? "Complete" : "Next"}
                        </FluentButton>
                        <FluentButton
                          appearance="outline"
                          className={styles.button}
                          onClick={handleBack}
                        >
                          Back
                        </FluentButton>
                      </>
                    ) : (
                      <>
                        <FluentButton
                          appearance="outline"
                          className={styles.button}
                          onClick={handleBack}
                        >
                          Back
                        </FluentButton>
                        <FluentButton
                          appearance="primary"
                          className={styles.button}
                          onClick={handleNext}
                        >
                          {step === 4 ? "Complete" : "Next"}
                        </FluentButton>
                      </>
                    )}
                  </div>
                ) : (
                  <div
                    className={mergeClasses(
                      styles.buttonGroup,
                      isCustomPlus ? styles.buttonGroupCustomPlus : undefined,
                    )}
                  >
                    <FluentButton
                      appearance="primary"
                      className={
                        isCustomPlus ? styles.button : styles.buttonFullWidth
                      }
                      onClick={handleNext}
                    >
                      Next
                    </FluentButton>
                  </div>
                ))}

              {step === 3 && (
                <div className={styles.termsText}>
                  By clicking next, I understand that Microsoft may contact me
                  about this Azure account, agree to receive information, tips,
                  and offers about Azure and other Microsoft products and
                  services, and accept the{" "}
                  <a href="#" className={styles.termsLink}>
                    Microsoft Customer Agreement
                  </a>
                  . Read our{" "}
                  <a href="#" className={styles.termsLink}>
                    privacy statement
                  </a>{" "}
                  to learn how your data is handled.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
