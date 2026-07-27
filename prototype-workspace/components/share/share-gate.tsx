"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Button,
  Input,
  Text,
  Spinner,
  Field,
  MessageBar,
  MessageBarBody,
  Card,
} from "@fluentui/react-components";
import {
  LockClosed24Regular,
  Eye20Regular,
  EyeOff20Regular,
} from "@fluentui/react-icons";
import {
  verifyShare,
  getShareSession,
  setShareSession,
  type ShareSession,
} from "@/lib/shares";
import FeedbackLayer from "@/components/feedback/feedback-layer";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  overlay: {
    position: "fixed",
    inset: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colorNeutralBackgroundOverlay,
    zIndex: 10000,
  },
  card: {
    width: "400px",
    maxWidth: "90vw",
    padding: tokens.spacingVerticalXXL,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalL,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusXLarge,
    boxShadow: tokens.shadow16,
  },
  iconContainer: {
    width: "56px",
    height: "56px",
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForegroundOnBrand,
  },
  title: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    textAlign: "center",
  },
  subtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
    textAlign: "center",
    lineHeight: tokens.lineHeightBase300,
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  passwordInput: {
    width: "100%",
    "& input::-ms-reveal": { display: "none" },
    "& input::-ms-clear": { display: "none" },
  },
  submitButton: { width: "100%" },
  footer: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground4,
    textAlign: "center",
  },
  errorBar: { width: "100%" },
});

const REASON_MESSAGES: Record<string, string> = {
  locked: "This share link has been locked by the owner.",
  expired: "This share link has expired.",
  not_found: "This share link is no longer valid.",
  password: "Incorrect password. Please try again.",
  network: "Could not reach the server. Please try again.",
  missing: "This share link is incomplete.",
};

export interface ShareGateProps {
  prototypeId: string;
  token: string;
  children: ReactNode;
}

/**
 * Public, no-login access gate for externally shared prototypes.
 * Validates a share token + password against /api/shares/verify, stores a
 * time-boxed sessionStorage session, then renders the prototype.
 */
export default function ShareGate({
  prototypeId,
  token,
  children,
}: ShareGateProps) {
  const styles = useStyles();
  const [session, setSession] = useState<ShareSession | null>(null);
  const [checked, setChecked] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [blocked, setBlocked] = useState<string | null>(null);

  useEffect(() => {
    const existing = getShareSession(prototypeId);
    if (existing && existing.token === token) setSession(existing);
    setChecked(true);
  }, [prototypeId, token]);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!password.trim()) {
        setError("Please enter the password");
        return;
      }
      setVerifying(true);
      setError("");
      try {
        const result = await verifyShare(prototypeId, token, password.trim());
        if (result.valid) {
          const newSession: ShareSession = {
            prototypeId,
            token,
            expiresAt: result.expiresAt || "",
            authenticatedAt: new Date().toISOString(),
          };
          setShareSession(newSession);
          setSession(newSession);
          setPassword("");
        } else if (result.reason === "locked" || result.reason === "expired") {
          setBlocked(REASON_MESSAGES[result.reason]);
        } else {
          setError(
            REASON_MESSAGES[result.reason || ""] || "Invalid password",
          );
        }
      } catch {
        setError(REASON_MESSAGES.network);
      } finally {
        setVerifying(false);
      }
    },
    [password, prototypeId, token],
  );

  if (!checked) {
    return (
      <div className={styles.overlay}>
        <Spinner size="large" label="Loading…" />
      </div>
    );
  }

  if (session) {
    return (
      <>
        {children}
        <FeedbackLayer
          prototypeId={prototypeId}
          route={
            typeof window !== "undefined"
              ? window.location.pathname
              : `/${prototypeId}`
          }
          context={{ kind: "external", token }}
        />
      </>
    );
  }

  if (blocked) {
    return (
      <div className={styles.overlay}>
        <Card className={styles.card}>
          <div className={styles.iconContainer}>
            <LockClosed24Regular />
          </div>
          <Text className={styles.title}>Access Unavailable</Text>
          <Text className={styles.subtitle}>{blocked}</Text>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <Card className={styles.card}>
        <div className={styles.iconContainer}>
          <LockClosed24Regular />
        </div>
        <Text className={styles.title}>Protected Prototype</Text>
        <Text className={styles.subtitle}>
          Enter the password shared with you to view this prototype.
        </Text>

        {error && (
          <MessageBar intent="error" className={styles.errorBar}>
            <MessageBarBody>{error}</MessageBarBody>
          </MessageBar>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <Field label="Password" required>
            <Input
              className={styles.passwordInput}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(_, data) => setPassword(data.value)}
              placeholder="Enter password"
              autoFocus
              disabled={verifying}
              contentAfter={
                <Button
                  appearance="transparent"
                  size="small"
                  icon={showPassword ? <EyeOff20Regular /> : <Eye20Regular />}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                />
              }
            />
          </Field>

          <Button
            appearance="primary"
            className={styles.submitButton}
            type="submit"
            disabled={verifying || !password.trim()}
            icon={verifying ? <Spinner size="tiny" /> : undefined}
          >
            {verifying ? "Verifying…" : "View prototype"}
          </Button>
        </form>

        <Text className={styles.footer}>
          This is a time-limited access link for research purposes.
        </Text>
      </Card>
    </div>
  );
}
