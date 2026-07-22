"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useMsal } from "@azure/msal-react";
import {
  makeStyles,
  tokens as fluentTokens,
  Spinner,
  Text,
} from "@fluentui/react-components";
import { LoginPage } from "./login-page";

/** Routes that bypass authentication (shareable preview links) */
const PUBLIC_ROUTES = ["/fre-experiments"];

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #005A9E 0%, #0078D4 50%, #005A9E 100%)",
  },
  loadingInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalM,
  },
  loadingText: {
    color: tokens.colorNeutralForegroundOnBrand,
  },
});

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  // In usertest mode, skip MSAL auth entirely — the UserTestGate handles access
  const isUserTestMode =
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_USERTEST_MODE === "true";
  if (isUserTestMode) {
    return <>{children}</>;
  }

  return <AuthWrapperMsal>{children}</AuthWrapperMsal>;
}

function AuthWrapperMsal({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { instance, accounts, inProgress } = useMsal();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const styles = useStyles();

  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname?.startsWith(route));
  const isAuditAuthBypassEnabled =
    process.env.NEXT_PUBLIC_ENABLE_AUDIT_AUTH_BYPASS !== "false";
  const isAuditBypassRoute =
    isAuditAuthBypassEnabled &&
    searchParams?.get("auditBridge") === "1";

  // Optional email-domain allow-list. Set NEXT_PUBLIC_ALLOWED_EMAIL_DOMAIN
  // (e.g. "microsoft.com" or "contoso.com") to restrict sign-in to that domain.
  // If unset, any account from the configured tenant is allowed — the
  // single-tenant authority already scopes who can sign in.
  const allowedDomain = process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAIN;

  useEffect(() => {
    if (isPublicRoute || isAuditBypassRoute) return;

    const checkAuth = () => {
      if (inProgress === "none") {
        if (accounts.length > 0) {
          const userEmail = accounts[0].username;
          const domainOk =
            !allowedDomain ||
            userEmail?.toLowerCase().endsWith(`@${allowedDomain.toLowerCase()}`);
          if (domainOk) {
            setIsAuthenticated(true);
          } else {
            instance.logoutRedirect();
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [accounts, inProgress, instance, isPublicRoute, isAuditBypassRoute, allowedDomain]);

  if (isPublicRoute || isAuditBypassRoute) {
    return <>{children}</>;
  }

  if (isLoading || inProgress !== "none") {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingInner}>
          <Spinner size="large" />
          <Text className={styles.loadingText}>Loading...</Text>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
}
