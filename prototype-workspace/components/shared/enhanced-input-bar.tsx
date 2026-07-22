"use client";

import { useState, useRef, useEffect } from "react";
import {
  Add24Regular,
  ArrowRight24Filled,
  Mic24Regular,
  Attach24Regular,
  ArrowUpload24Regular,
  Dismiss16Regular,
} from "@fluentui/react-icons";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "32px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow:
      "0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
    padding: "8px 8px 8px 16px",
    maxWidth: "50%",
    marginLeft: "0",
    marginRight: "auto",
    marginBottom: "32px",
    transition: "all 0.3s ease",
    height: "56px",
    position: "relative",
    "&:hover": {
      boxShadow:
        "0 20px 16px 0 rgba(0, 30, 68, 0.05), 0 10px 12px 0 rgba(0, 30, 68, 0.04), 0 2px 8px 0 rgba(0, 30, 68, 0.06)",
    },
  },
  searchWrapperAgentMode: {
    height: "auto",
    minHeight: "80px",
    flexDirection: "column",
    alignItems: "stretch",
    gap: "12px",
    padding: "16px",
  },
  searchInput: {
    flex: 1,
    padding: "8px",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    fontSize: "14px",
    fontWeight: "400",
    resize: "none",
    minHeight: "24px",
    maxHeight: "120px",
    overflowY: "auto",
  },
  plusIcon: {
    color: tokens.colorNeutralForeground3,
    flexShrink: 0,
    cursor: "pointer",
  },
  submitButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "transparent",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transitionDuration: "200ms",
    transitionProperty: "all",
    transitionTimingFunction: "ease",
    flexShrink: 0,
    padding: "4px",
  },
  submitButtonInner: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transitionDuration: "200ms",
    transitionProperty: "all",
    transitionTimingFunction: "ease",
  },
  submitButtonInnerActive: {
    backgroundColor: tokens.colorBrandForeground1,
  },
  submitButtonFadeIn: {
    animation: "fadeIn 200ms ease-in",
  },
  submitButtonHover: {
    backgroundColor: tokens.colorBrandForeground2,
    transform: "scale(1.05)",
  },
  submitButtonPressed: {
    backgroundColor: tokens.colorBrandForeground2,
    transform: "scale(0.95)",
  },
  micButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transitionDuration: "200ms",
    transitionProperty: "all",
    transitionTimingFunction: "ease",
    flexShrink: 0,
    padding: "4px",
  },
  micButtonInner: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transitionDuration: "200ms",
    transitionProperty: "all",
    transitionTimingFunction: "ease",
  },
  micButtonHover: {
    backgroundColor: tokens.colorBrandForeground1,
    color: "white",
  },
  micButtonPressed: {
    backgroundColor: tokens.colorBrandForeground1,
    color: "white",
    boxShadow: "0 0 0 8px rgba(98, 100, 167, 0.2)",
  },
  micButtonRecording: {
    backgroundColor: tokens.colorBrandForeground1,
    color: "white",
    animation: "pulseRing 1.5s ease-in-out infinite",
  },
  agentPill: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    transition: "all 0.2s ease",
  },
  agentPillHover: {
    backgroundColor: tokens.colorNeutralBackground1Hover,
  },
  agentActions: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    width: "100%",
  },
  attachmentMenu: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: "0",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "24px",
    boxShadow: "0 16px 32px rgba(0, 0, 0, 0.14), 0 0 2px rgba(0, 0, 0, 0.12)",
    padding: "8px",
    width: "240px",
    zIndex: 1001,
  },
  attachmentMenuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "0 16px",
    height: "40px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    textAlign: "left",
    transitionDuration: "200ms",
  },
  attachmentMenuIcon: {
    width: "20px",
    height: "20px",
    fontSize: "20px",
    color: tokens.colorNeutralForeground2,
  },
  attachmentMenuText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    fontWeight: "400",
  },
  outerWrapper: {
    position: "relative",
    marginBottom: "32px",
  },
  agentModeInputRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalS,
    width: "100%",
  },
  textareaAutoSize: {
    height: "auto",
    minHeight: "24px",
  },
  iconSize20: {
    width: "20px",
    height: "20px",
  },
  verticalDivider: {
    width: "1px",
    height: "24px",
    backgroundColor: tokens.colorNeutralStroke2,
    margin: `0 ${tokens.spacingHorizontalS}`,
  },
  agentPillImg: {
    width: "16px",
    height: "16px",
  },
  dismissIconSmall: {
    width: "12px",
    height: "12px",
    marginLeft: tokens.spacingHorizontalXS,
  },
  flexSpacer: {
    flex: 1,
  },
  normalInputRow: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    width: "100%",
  },
});

interface EnhancedInputBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  className?: string;
}

/** Copilot-style search/chat input bar with attachment menu, agent mode toggle, mic, and animated submit button.
 * Composed from: makeStyles wrapper, textarea, Fluent icons (Add, Mic, ArrowRight, Attach).
 * Instead of: building a custom chat input with attachments and agent pill inline. */
export const EnhancedInputBar: React.FC<EnhancedInputBarProps> = ({
  value,
  onChange,
  onSubmit,
  onFocus,
  placeholder = "Message Copilot",
  className,
}) => {
  const styles = useStyles();
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);
  const [isSubmitPressed, setIsSubmitPressed] = useState(false);
  const [isMicHovered, setIsMicHovered] = useState(false);
  const [isMicPressed, setIsMicPressed] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [isAgentMode, setIsAgentMode] = useState(false);
  const [isAgentPillHovered, setIsAgentPillHovered] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const attachmentMenuRef = useRef<HTMLDivElement>(null);

  // Click outside handler for attachment menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        attachmentMenuRef.current &&
        !attachmentMenuRef.current.contains(event.target as Node)
      ) {
        setShowAttachmentMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMicClick = () => {
    console.log("Mic button clicked - voice input would be triggered here");
    // Voice input functionality would be implemented here
  };

  const handleSubmit = () => {
    if (value.trim() && onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <div className={mergeClasses(styles.outerWrapper, className)}>
      {showAttachmentMenu && (
        <div ref={attachmentMenuRef} className={styles.attachmentMenu}>
          <button
            className={styles.attachmentMenuItem}
            onClick={() => {
              console.log("Attach files clicked");
              setShowAttachmentMenu(false);
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                tokens.colorNeutralBackground2)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <Attach24Regular className={styles.attachmentMenuIcon} />
            <span className={styles.attachmentMenuText}>Attach files</span>
          </button>
          <button
            className={styles.attachmentMenuItem}
            onClick={() => {
              console.log("Upload from device clicked");
              setShowAttachmentMenu(false);
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                tokens.colorNeutralBackground2)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <ArrowUpload24Regular className={styles.attachmentMenuIcon} />
            <span className={styles.attachmentMenuText}>
              Upload from device
            </span>
          </button>
          <button
            className={styles.attachmentMenuItem}
            onClick={() => {
              setIsAgentMode(true);
              setShowAttachmentMenu(false);
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                tokens.colorNeutralBackground2)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <img
              src="/icons/Agents.svg"
              alt="Agent"
              className={styles.attachmentMenuIcon}
            />
            <span className={styles.attachmentMenuText}>Agent mode</span>
          </button>
        </div>
      )}
      <div
        className={mergeClasses(
          styles.searchWrapper,
          isAgentMode || value.length > 50 ? styles.searchWrapperAgentMode : "",
        )}
      >
        {isAgentMode || value.length > 50 ? (
          <>
            <div className={styles.agentModeInputRow}>
              <textarea
                ref={inputRef}
                placeholder={placeholder}
                className={mergeClasses(styles.searchInput, styles.textareaAutoSize)}
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onFocus={() => onFocus?.()}
                rows={1}
              />
            </div>
            <div className={styles.agentActions}>
              <Add24Regular
                className={mergeClasses(styles.plusIcon, styles.iconSize20)}
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
              />
              {isAgentMode && (
                <>
                  <div className={styles.verticalDivider} />
                  <button
                    className={mergeClasses(styles.agentPill, isAgentPillHovered ? styles.agentPillHover : undefined)}
                    onClick={() => {
                      setIsAgentMode(false);
                      onChange("");
                    }}
                    onMouseEnter={() => setIsAgentPillHovered(true)}
                    onMouseLeave={() => setIsAgentPillHovered(false)}
                  >
                    <img
                      src="/icons/Agents.svg"
                      alt="Agent"
                      className={styles.agentPillImg}
                    />
                    <span>Agent</span>
                    <Dismiss16Regular className={styles.dismissIconSmall} />
                  </button>
                </>
              )}
              <div className={styles.flexSpacer} />
              <button
                className={styles.micButton}
                onClick={handleMicClick}
                aria-label="Voice input"
              >
                <div
                  className={mergeClasses(styles.micButtonInner, isMicHovered ? styles.micButtonHover : undefined, isMicPressed ? styles.micButtonPressed : undefined)}
                  onMouseEnter={() => setIsMicHovered(true)}
                  onMouseLeave={() => {
                    setIsMicHovered(false);
                    setIsMicPressed(false);
                  }}
                  onMouseDown={() => setIsMicPressed(true)}
                  onMouseUp={() => setIsMicPressed(false)}
                >
                  <Mic24Regular className={styles.iconSize20} />
                </div>
              </button>
              {value.trim() && (
                <button
                  className={mergeClasses(styles.submitButton, styles.submitButtonFadeIn)}
                  onClick={handleSubmit}
                  aria-label="Submit"
                >
                  <div
                    className={mergeClasses(styles.submitButtonInner, styles.submitButtonInnerActive, isSubmitHovered ? styles.submitButtonHover : undefined, isSubmitPressed ? styles.submitButtonPressed : undefined)}
                    onMouseEnter={() => setIsSubmitHovered(true)}
                    onMouseLeave={() => setIsSubmitHovered(false)}
                    onMouseDown={() => setIsSubmitPressed(true)}
                    onMouseUp={() => setIsSubmitPressed(false)}
                  >
                    <ArrowRight24Filled className={styles.iconSize20} />
                  </div>
                </button>
              )}
            </div>
          </>
        ) : (
          <div className={styles.normalInputRow}>
            <Add24Regular
              className={mergeClasses(styles.plusIcon, styles.iconSize20)}
              onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
            />
            <textarea
              ref={inputRef}
              placeholder={placeholder}
              className={mergeClasses(styles.searchInput, styles.textareaAutoSize)}
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                e.target.style.height = "auto";
                const newHeight = e.target.scrollHeight;
                e.target.style.height = newHeight + "px";

                if (newHeight > 48 && !isAgentMode) {
                  setIsAgentMode(true);
                }
              }}
              onFocus={() => onFocus?.()}
              rows={1}
            />
            <button
              className={styles.micButton}
              onClick={handleMicClick}
              aria-label="Voice input"
            >
              <div
                className={mergeClasses(styles.micButtonInner, isMicHovered ? styles.micButtonHover : undefined, isMicPressed ? styles.micButtonPressed : undefined)}
                onMouseEnter={() => setIsMicHovered(true)}
                onMouseLeave={() => {
                  setIsMicHovered(false);
                  setIsMicPressed(false);
                }}
                onMouseDown={() => setIsMicPressed(true)}
                onMouseUp={() => setIsMicPressed(false)}
              >
                <Mic24Regular className={styles.iconSize20} />
              </div>
            </button>
            {value.trim() && (
              <button
                className={mergeClasses(styles.submitButton, styles.submitButtonFadeIn)}
                onClick={handleSubmit}
                aria-label="Submit"
              >
                <div
                  className={mergeClasses(styles.submitButtonInner, styles.submitButtonInnerActive, isSubmitHovered ? styles.submitButtonHover : undefined, isSubmitPressed ? styles.submitButtonPressed : undefined)}
                  onMouseEnter={() => setIsSubmitHovered(true)}
                  onMouseLeave={() => setIsSubmitHovered(false)}
                  onMouseDown={() => setIsSubmitPressed(true)}
                  onMouseUp={() => setIsSubmitPressed(false)}
                >
                  <ArrowRight24Filled className={styles.iconSize20} />
                </div>
              </button>
            )}
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulseRing {
          0% {
            box-shadow: 0 0 0 0 rgba(98, 100, 167, 0.3);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(98, 100, 167, 0.15);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(98, 100, 167, 0.3);
          }
        }

        textarea::placeholder {
          color: #616161;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};
