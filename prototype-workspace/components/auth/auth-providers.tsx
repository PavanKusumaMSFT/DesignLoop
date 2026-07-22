"use client";

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "@/lib/msal-config";
import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { useEffect, useState } from "react";
import {
  FluentProvider,
  webLightTheme,
  Spinner,
} from "@fluentui/react-components";

// One-time migration: clear stale MSAL cache from wrong app registrations
if (typeof window !== "undefined") {
  const MIGRATION_KEY = "msal-migration-v7";
  if (!sessionStorage.getItem(MIGRATION_KEY)) {
    sessionStorage.clear();
    sessionStorage.setItem(MIGRATION_KEY, "done");
    if (window.location.hash) {
      window.location.href = window.location.origin + window.location.pathname;
    }
  }
}

export const msalInstance = new PublicClientApplication(msalConfig);

function InitializingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-screen-inner">
        <img
          src="/designloop-logo.svg"
          alt="Proto Loop Logo"
          width={120}
          height={45}
        />
        <Spinner size="medium" label="Loading..." labelPosition="below" />
      </div>
    </div>
  );
}

export function AuthProviders({ children }: { children: React.ReactNode }) {
  // In usertest mode, skip MSAL entirely — provide only FluentProvider + UserTestGate
  const isUserTestMode =
    typeof window !== "undefined" &&
    process.env.NEXT_PUBLIC_USERTEST_MODE === "true";

  if (isUserTestMode) {
    const UserTestGate =
      require("@/components/shared/usertest-gate").default;
    return (
      <FluentProvider theme={webLightTheme}>
        <UserTestGate>{children}</UserTestGate>
      </FluentProvider>
    );
  }

  return <MsalAuthProviders>{children}</MsalAuthProviders>;
}

function MsalAuthProviders({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Fallback: proceed without auth after 1s if MSAL hangs (local dev)
      if (!isInitialized) {
        console.warn("MSAL initialization timed out — proceeding without auth");
        setIsInitialized(true);
      }
    }, 1000);

    msalInstance
      .initialize()
      .then(() => {
        msalInstance
          .handleRedirectPromise()
          .then((response) => {
            if (response) {
              console.log("Login successful:", response);
            }
            if (
              window.location.hash &&
              window.location.hash.includes("code=")
            ) {
              window.history.replaceState(null, "", window.location.pathname);
            }
          })
          .catch((error) => {
            console.error("Redirect error:", error);
          });

        clearTimeout(timeout);
        setIsInitialized(true);
      })
      .catch((error) => {
        console.error("MSAL initialization failed:", error);
        clearTimeout(timeout);
        setIsInitialized(true);
      });

    return () => clearTimeout(timeout);
  }, []);

  if (!isInitialized) {
    return (
      <FluentProvider theme={webLightTheme}>
        <InitializingScreen />
      </FluentProvider>
    );
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <MsalProvider instance={msalInstance}>
        <AuthWrapper>{children}</AuthWrapper>
      </MsalProvider>
    </FluentProvider>
  );
}
