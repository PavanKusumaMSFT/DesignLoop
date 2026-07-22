/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { makeStyles, mergeClasses, tokens as fluentTokens } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Mic24Regular,
  Mic24Filled,
  ChatAdd24Regular,
  ChatAdd24Filled,
  Sparkle24Regular,
  Sparkle24Filled,
  Send24Regular,
  Add20Regular,
  Settings20Regular,
  Briefcase20Regular,
  Mic16Regular,
} from "@fluentui/react-icons";
import { useState, useEffect, useRef, memo, useMemo } from "react";

const useStyles = makeStyles({
  footer: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    gap: "16px",
    alignItems: "center",
    padding: "40px 20px",
    marginBottom: "70px",
  },
  leftGroup: {
    display: "flex",
    gap: "16px",
    justifyContent: "flex-end",
  },
  rightGroup: {
    display: "flex",
    gap: "16px",
    justifyContent: "flex-start",
  },
  categoryPill: {
    borderRadius: "24px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "10px 20px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
    ":hover": {
      backgroundColor: tokens.colorBrandBackground2,
      color: tokens.colorBrandForeground1,
    },
  },
  categoryPillActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
  },
  mainGroup: {
    display: "flex",
    gap: "2px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "28px",
    padding: "4px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)",
  },
  iconButton: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    color: tokens.colorNeutralForeground1,
    ":hover": {
      backgroundColor: tokens.colorBrandBackground2,
      color: tokens.colorBrandForeground1,
    },
  },
  iconButtonActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
  },
  voiceInputContainer: {
    position: "fixed",
    bottom: "120px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "90%",
    maxWidth: "900px",
    minHeight: "120px",
    maxHeight: "140px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "28px",
    padding: "36px 48px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    zIndex: 1000,
  },
  voiceInputContent: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "36px",
    width: "100%",
    zIndex: 1,
  },
  waveformIcon: {
    display: "flex",
    alignItems: "center",
    gap: "3px",
    minWidth: "32px",
  },
  waveBar: {
    width: "3px",
    backgroundColor: tokens.colorBrandForeground1,
    borderRadius: "2px",
    willChange: "transform",
    backfaceVisibility: "hidden",
    animationName: {
      "0%, 100%": { transform: "scaleY(0.5)" },
      "50%": { transform: "scaleY(1)" },
    },
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
  },
  waveBar0: { height: "8px", animationDuration: "0.8s", animationDelay: "0s" },
  waveBar1: {
    height: "16px",
    animationDuration: "0.9s",
    animationDelay: "0.15s",
  },
  waveBar2: {
    height: "12px",
    animationDuration: "1.0s",
    animationDelay: "0.3s",
  },
  waveBar3: {
    height: "20px",
    animationDuration: "1.1s",
    animationDelay: "0.45s",
  },
  waveBar4: {
    height: "10px",
    animationDuration: "1.2s",
    animationDelay: "0.6s",
  },
  waveBar5: {
    height: "18px",
    animationDuration: "1.3s",
    animationDelay: "0.75s",
  },
  voiceInputText: {
    flex: 1,
    fontSize: "20px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.5",
  },
  voiceInputSvg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: 1,
  },
  textInputContainer: {
    position: "fixed",
    bottom: "120px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "600px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "30px",
    padding: "16px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.14)",
    zIndex: 1000,
  },
  textInputContent: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  textInputArea: {
    width: "100%",
    minHeight: "24px",
    maxHeight: "120px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    fontFamily: "inherit",
    lineHeight: "1.5",
    resize: "none",
    color: tokens.colorNeutralForeground1,
    backgroundColor: "transparent",
    padding: "0",
    "::placeholder": {
      color: tokens.colorNeutralForeground3,
    },
  },
  textInputFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "8px",
  },
  textInputActions: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
  textInputButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 8px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  sendButton: {
    width: "32px",
    height: "32px",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: "0",
    borderRadius: "50%",
    transition: "all 0.2s",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  voiceTraceAnimation: {
    animationName: {
      "0%": { strokeDashoffset: "0" },
      "100%": { strokeDashoffset: "-100" },
    },
    animationDuration: "6s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  fixedBottomBar: {
    position: "fixed",
    bottom: "50px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    zIndex: 1000,
  },
  categoryPillFixed: {
    position: "relative",
    bottom: "auto",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)",
  },
  categoryPillActiveBorder: {
    borderTopColor: tokens.colorBrandStroke1,
    borderRightColor: tokens.colorBrandStroke1,
    borderBottomColor: tokens.colorBrandStroke1,
    borderLeftColor: tokens.colorBrandStroke1,
  },
  mainGroupFixed: {
    display: "flex",
    gap: "2px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "28px",
    padding: "4px",
    boxShadow:
      "0 -6px 32px rgba(0, 0, 0, 0.12), 0 -2px 16px rgba(0, 0, 0, 0.08)",
  },
});

interface CanvasFooterProps {
  onVoiceInput?: () => void;
  onTextInput?: () => void;
  onSparkleClick?: () => void;
  selectedCategory?: string | null;
  onCategoryChange?: (category: string | null) => void;
  onNavigateToRecommendations?: () => void;
  disablePanels?: boolean;
  disableMicSimulation?: boolean;
}

// Waveform animation component - defined outside to prevent recreation
const WaveformIcon = memo(function WaveformIcon() {
  const styles = useStyles();
  const waveBarClasses = [
    styles.waveBar0,
    styles.waveBar1,
    styles.waveBar2,
    styles.waveBar3,
    styles.waveBar4,
    styles.waveBar5,
  ];
  return (
    <div className={styles.waveformIcon}>
      {waveBarClasses.map((cls, index) => (
        <div key={index} className={mergeClasses(styles.waveBar, cls)} />
      ))}
    </div>
  );
});

export default function CanvasFooter({
  onSparkleClick,
  selectedCategory,
  onCategoryChange,
  onNavigateToRecommendations,
  disablePanels = false,
  disableMicSimulation = false,
}: CanvasFooterProps) {
  const styles = useStyles();
  const [pressedMainButton, setPressedMainButton] = useState<string | null>(
    null,
  );
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcribedText, setTranscribedText] = useState("");
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");

  // Track voice input container size for SVG border
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textInputRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  // Simulated transcription text
  const fullText =
    "I'm totally new to Azure and don't know where to start. I know I want to build a chat-based AI app, what's the most cost-effective way to get started?";

  // Track container size for SVG - use border box dimensions
  useEffect(() => {
    if (!containerRef.current || !isListening) return;
    const el = containerRef.current;
    const ro = new ResizeObserver((entries) => {
      // Use borderBoxSize for accurate dimensions including padding
      const borderBox = entries[0].borderBoxSize?.[0];
      const size = borderBox
        ? {
            w: Math.ceil(borderBox.inlineSize),
            h: Math.ceil(borderBox.blockSize),
          }
        : { w: Math.ceil(el.offsetWidth), h: Math.ceil(el.offsetHeight) };

      console.log("Container border box dimensions:", size);
      setContainerSize(size);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [isListening]);

  // Create SVG path that exactly matches CSS border-radius using elliptical arcs
  const borderPath = useMemo(() => {
    const w = containerSize.w,
      h = containerSize.h;
    const r = 28; // border radius
    const offset = 0.75; // half of stroke width to center the stroke on the edge

    if (!w || !h) return "";

    // Adjust dimensions to account for stroke width
    const x = offset;
    const y = offset;
    const width = w - offset * 2;
    const height = h - offset * 2;
    const radius = r - offset;

    // Use elliptical arc (A) commands to match CSS border-radius exactly
    return `
      M ${x + radius},${y}
      L ${x + width - radius},${y}
      A ${radius},${radius} 0 0 1 ${x + width},${y + radius}
      L ${x + width},${y + height - radius}
      A ${radius},${radius} 0 0 1 ${x + width - radius},${y + height}
      L ${x + radius},${y + height}
      A ${radius},${radius} 0 0 1 ${x},${y + height - radius}
      L ${x},${y + radius}
      A ${radius},${radius} 0 0 1 ${x + radius},${y}
      Z
    `
      .trim()
      .replace(/\s+/g, " ");
  }, [containerSize.w, containerSize.h]);

  // Calculate path length for dash animation
  const perimeter = useMemo(() => {
    const w = containerSize.w,
      h = containerSize.h,
      r = 28;
    if (!w || !h) return 0;
    return 2 * (w + h - 2 * r) + 2 * Math.PI * r;
  }, [containerSize.w, containerSize.h]);

  // Dash array: segment length ~800px (doubled)
  const dashArray = useMemo(() => {
    if (!perimeter) return "0 100";
    const segment = Math.min(800, perimeter * 0.8);
    const segPct = (segment / perimeter) * 100;
    const gapPct = 100 - segPct;
    return `${segPct} ${gapPct}`;
  }, [perimeter]);

  useEffect(() => {
    if (isListening) {
      let typingInterval: NodeJS.Timeout;

      // Delay before starting transcription to show waveform animation first
      const startDelay = setTimeout(() => {
        // Simulate typing effect
        let currentIndex = 0;
        typingInterval = setInterval(() => {
          if (currentIndex <= fullText.length) {
            setTranscribedText(fullText.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            // Navigate to recommendations after 2 seconds
            setTimeout(() => {
              setIsListening(false);
              setTranscribedText("");
              onNavigateToRecommendations?.();
            }, 2000);
          }
        }, 30); // 30ms per character for typing effect
      }, 800); // 800ms delay to show waveform animation first

      return () => {
        clearTimeout(startDelay);
        if (typingInterval) clearInterval(typingInterval);
      };
    }
  }, [isListening]);

  const handleMainButtonClick = (button: "mic" | "chat" | "sparkle") => {
    if (button === "sparkle") {
      onSparkleClick?.();
      return;
    }

    // Don't open panels if disabled
    if (disablePanels) {
      return;
    }

    setPressedMainButton(button);
    setHoveredButton(button);

    if (button === "mic") {
      // Only start listening if mic simulation is not disabled
      if (!disableMicSimulation) {
        setIsListening(true);
        setShowTextInput(false);
      }
    } else if (button === "chat") {
      setShowTextInput(true);
      setIsListening(false);
    }
    // Reset pressed state after animation
    setTimeout(() => setPressedMainButton(null), 200);
  };

  const handleCategoryClick = (category: string) => {
    // Toggle: if clicking the same category, deselect it
    if (selectedCategory === category) {
      onCategoryChange?.(null);
    } else {
      onCategoryChange?.(category);
    }
  };

  // Click outside to close panels
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close voice panel if clicking outside
      if (
        isListening &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsListening(false);
        setTranscribedText("");
      }

      // Close text input panel if clicking outside
      if (
        showTextInput &&
        textInputRef.current &&
        !textInputRef.current.contains(event.target as Node)
      ) {
        setShowTextInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isListening, showTextInput]);

  return (
    <>
      {/* Voice Input Overlay */}
      {isListening && (
        <div ref={containerRef} className={styles.voiceInputContainer}>
          {/* SVG animated border tracer */}
          {containerSize.w > 0 && containerSize.h > 0 && (
            <svg
              className={styles.voiceInputSvg}
              width={containerSize.w}
              height={containerSize.h}
              viewBox={`0 0 ${containerSize.w} ${containerSize.h}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="voiceTraceGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#0078D4" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#0078D4" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#0078D4" stopOpacity="0.05" />
                </linearGradient>
                <filter
                  id="voiceTraceGlow"
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Moving tracer using path that matches CSS border-radius exactly */}
              <path
                d={borderPath}
                fill="none"
                stroke="url(#voiceTraceGradient)"
                strokeWidth={1.5}
                strokeDasharray={dashArray}
                strokeDashoffset={0}
                pathLength={100}
                filter="url(#voiceTraceGlow)"
                className={styles.voiceTraceAnimation}
              />
            </svg>
          )}

          <div className={styles.voiceInputContent}>
            <WaveformIcon />
            <div className={styles.voiceInputText}>{transcribedText}</div>
          </div>
        </div>
      )}

      {/* Text Input Overlay */}
      {showTextInput && (
        <div ref={textInputRef} className={styles.textInputContainer}>
          <div className={styles.textInputContent}>
            <textarea
              className={styles.textInputArea}
              placeholder="I want to..."
              value={textInputValue}
              onChange={(e) => setTextInputValue(e.target.value)}
              autoFocus
            />
            <div className={styles.textInputFooter}>
              <div className={styles.textInputActions}>
                <button
                  className={styles.textInputButton}
                  aria-label="Add attachment"
                >
                  <Add20Regular />
                </button>
                <button className={styles.textInputButton}>
                  <Settings20Regular />
                  <span>Tools</span>
                </button>
                <button className={styles.textInputButton}>
                  <Briefcase20Regular />
                  <span>Sources</span>
                </button>
              </div>
              <div className={styles.textInputActions}>
                <button className={styles.sendButton} aria-label="Send message">
                  <Send24Regular />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All controls in one centered horizontal row */}
      <div className={styles.fixedBottomBar}>
        {/* Left category pills */}
        <button
          className={mergeClasses(
            styles.categoryPill,
            styles.categoryPillFixed,
            selectedCategory === "agent-summary"
              ? mergeClasses(
                  styles.categoryPillActive,
                  styles.categoryPillActiveBorder,
                )
              : undefined,
          )}
          onClick={() => handleCategoryClick("agent-summary")}
        >
          Agent summary
        </button>
        <button
          className={mergeClasses(
            styles.categoryPill,
            styles.categoryPillFixed,
            selectedCategory === "performance"
              ? mergeClasses(
                  styles.categoryPillActive,
                  styles.categoryPillActiveBorder,
                )
              : undefined,
          )}
          onClick={() => handleCategoryClick("performance")}
        >
          Performance
        </button>

        {/* Main action group - centered */}
        <div className={styles.mainGroupFixed}>
          <button
            className={`${styles.iconButton} ${pressedMainButton === "mic" || hoveredButton === "mic" ? styles.iconButtonActive : ""}`}
            onClick={() => handleMainButtonClick("mic")}
            onMouseEnter={() => setHoveredButton("mic")}
            onMouseLeave={() => setHoveredButton(null)}
            aria-label="Voice input"
          >
            {pressedMainButton === "mic" || hoveredButton === "mic" ? (
              <Mic24Filled />
            ) : (
              <Mic24Regular />
            )}
          </button>
          <button
            className={`${styles.iconButton} ${pressedMainButton === "chat" || hoveredButton === "chat" ? styles.iconButtonActive : ""}`}
            onClick={() => handleMainButtonClick("chat")}
            onMouseEnter={() => setHoveredButton("chat")}
            onMouseLeave={() => setHoveredButton(null)}
            aria-label="Text input"
          >
            {pressedMainButton === "chat" || hoveredButton === "chat" ? (
              <ChatAdd24Filled />
            ) : (
              <ChatAdd24Regular />
            )}
          </button>
          <button
            className={`${styles.iconButton} ${pressedMainButton === "sparkle" || hoveredButton === "sparkle" ? styles.iconButtonActive : ""}`}
            onClick={() => handleMainButtonClick("sparkle")}
            onMouseEnter={() => setHoveredButton("sparkle")}
            onMouseLeave={() => setHoveredButton(null)}
            aria-label="AI assist"
          >
            {pressedMainButton === "sparkle" || hoveredButton === "sparkle" ? (
              <Sparkle24Filled />
            ) : (
              <Sparkle24Regular />
            )}
          </button>
        </div>

        {/* Right category pills */}
        <button
          className={mergeClasses(
            styles.categoryPill,
            styles.categoryPillFixed,
            selectedCategory === "usage"
              ? mergeClasses(
                  styles.categoryPillActive,
                  styles.categoryPillActiveBorder,
                )
              : undefined,
          )}
          onClick={() => handleCategoryClick("usage")}
        >
          Usage & capacity
        </button>
        <button
          className={mergeClasses(
            styles.categoryPill,
            styles.categoryPillFixed,
            selectedCategory === "alerts"
              ? mergeClasses(
                  styles.categoryPillActive,
                  styles.categoryPillActiveBorder,
                )
              : undefined,
          )}
          onClick={() => handleCategoryClick("alerts")}
        >
          Alerts & anomalies
        </button>
      </div>
    </>
  );
}
