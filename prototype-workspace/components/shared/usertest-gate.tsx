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

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const SESSION_KEY = "usertest_session";

interface UserTestSession {
  authenticated: boolean;
  project: string;
  expiresAt: string;
  authenticatedAt: string;
}

/** Props for the UserTestGate component */
export interface UserTestGateProps {
  children: ReactNode;
}

function getStoredSession(): UserTestSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session: UserTestSession = JSON.parse(raw);
    if (!session.authenticated) return null;
    // Check client-side expiry
    if (session.expiresAt) {
      const expiry = new Date(session.expiresAt);
      if (!isNaN(expiry.getTime()) && expiry < new Date()) {
        sessionStorage.removeItem(SESSION_KEY);
        return null;
      }
    }
    return session;
  } catch {
    return null;
  }
}

function storeSession(session: UserTestSession) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

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
    // Hide native browser password reveal (Edge/Chrome)
    "& input::-ms-reveal": { display: "none" },
    "& input::-ms-clear": { display: "none" },
  },
  submitButton: {
    width: "100%",
  },
  footer: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground4,
    textAlign: "center",
  },
  errorBar: {
    width: "100%",
  },
  expiredOverlay: {
    position: "fixed",
    inset: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colorNeutralBackgroundOverlay,
    zIndex: 10001,
  },
});

/**
 * Password-based access gate for user testing deployments.
 * Wraps the app and shows a password modal when NEXT_PUBLIC_USERTEST_MODE is enabled.
 * Validates against the /api/verify Azure Function endpoint.
 * Stores session in sessionStorage (cleared on tab close).
 */
export default function UserTestGate({ children }: UserTestGateProps) {
  const styles = useStyles();
  const [session, setSession] = useState<UserTestSession | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Check for existing session on mount
  useEffect(() => {
    const existing = getStoredSession();
    setSession(existing);
  }, []);

  // The target project this deployment is scoped to (set at build time)
  const allowedProject = process.env.NEXT_PUBLIC_USERTEST_PROJECT || "";

  // Skip gate for admin routes and API routes
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";
  const isAdminRoute =
    pathname.startsWith("/usertest-admin") ||
    pathname.startsWith("/api") ||
    pathname === "/.auth/login/aad";

  // Check if the current route belongs to the allowed project
  const isAllowedRoute =
    !allowedProject ||
    pathname === "/" ||
    pathname.startsWith(`/${allowedProject}`);

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!password.trim()) {
        setError("Please enter the access code");
        return;
      }

      setVerifying(true);
      setError("");

      // Helper: check against build-time baked password
      const tryBuildPassword = (): boolean => {
        const buildPassword = process.env.NEXT_PUBLIC_USERTEST_PASSWORD;
        if (buildPassword && password.trim() === buildPassword) {
          const newSession: UserTestSession = {
            authenticated: true,
            project: allowedProject || "",
            expiresAt: "",
            authenticatedAt: new Date().toISOString(),
          };
          storeSession(newSession);
          setSession(newSession);
          setPassword("");
          return true;
        }
        return false;
      };

      try {
        // Try server-side API first
        const res = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: password.trim(),
            project: allowedProject,
          }),
        });

        const data = await res.json();

        if (data.valid) {
          const newSession: UserTestSession = {
            authenticated: true,
            project: data.project || allowedProject || "",
            expiresAt: data.expiresAt || "",
            authenticatedAt: new Date().toISOString(),
          };
          storeSession(newSession);
          setSession(newSession);
          setPassword("");
        } else {
          // API said invalid — also try build-time password as fallback
          if (!tryBuildPassword()) {
            setError(data.error || "Invalid access code");
          }
        }
      } catch {
        // Network error — try build-time password
        if (!tryBuildPassword()) {
          setError("Invalid access code");
        }
      } finally {
        setVerifying(false);
      }
    },
    [password]
  );

  // Admin routes bypass the gate
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Authenticated — enforce project isolation
  if (session?.authenticated) {
    // If at root, redirect to the project
    if (allowedProject && pathname === "/") {
      if (typeof window !== "undefined") {
        window.location.href = `/${allowedProject}/`;
      }
      return (
        <div className={styles.overlay}>
          <Spinner size="large" label="Redirecting..." />
        </div>
      );
    }

    // Block access to other projects
    if (!isAllowedRoute) {
      return (
        <div className={styles.overlay}>
          <Card className={styles.card}>
            <div className={styles.iconContainer}>
              <LockClosed24Regular />
            </div>
            <Text className={styles.title}>Access Restricted</Text>
            <Text className={styles.subtitle}>
              Your access is limited to the{" "}
              <strong>{allowedProject}</strong> project.
            </Text>
            <Button
              appearance="primary"
              className={styles.submitButton}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = `/${allowedProject}/`;
                }
              }}
            >
              Go to {allowedProject}
            </Button>
          </Card>
        </div>
      );
    }

    return <>{children}</>;
  }

  // Show password modal
  return (
    <div className={styles.overlay}>
      <Card className={styles.card}>
        <div className={styles.iconContainer}>
          <LockClosed24Regular />
        </div>

        <Text className={styles.title}>User Testing Access</Text>
        <Text className={styles.subtitle}>
          Enter the access code provided by the study coordinator to continue.
        </Text>

        {error && (
          <MessageBar intent="error" className={styles.errorBar}>
            <MessageBarBody>{error}</MessageBarBody>
          </MessageBar>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <Field label="Access code" required>
            <Input
              className={styles.passwordInput}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(_, data) => setPassword(data.value)}
              placeholder="Enter access code"
              autoFocus
              disabled={verifying}
              contentAfter={
                <Button
                  appearance="transparent"
                  size="small"
                  icon={
                    showPassword ? (
                      <EyeOff20Regular />
                    ) : (
                      <Eye20Regular />
                    )
                  }
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
            {verifying ? "Verifying..." : "Continue"}
          </Button>
        </form>

        <Text className={styles.footer}>
          This is a time-limited access link for usability testing.
        </Text>
      </Card>
    </div>
  );
}
