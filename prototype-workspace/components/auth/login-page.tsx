"use client";

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "@/lib/msal-config";
import {
  makeStyles,
  tokens as fluentTokens,
  Button,
  Card,
  Text,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #005A9E 0%, #0078D4 50%, #005A9E 100%)",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    padding: tokens.spacingHorizontalXXL,
    borderRadius: tokens.borderRadiusXLarge,
  },
  header: {
    textAlign: "center",
    marginBottom: tokens.spacingVerticalXXL,
  },
  logo: {
    width: "160px",
    height: "60px",
    marginBottom: tokens.spacingVerticalXXL,
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: tokens.spacingVerticalM,
    display: "block",
    textAlign: "center",
  },
  subtitle: {
    color: tokens.colorNeutralForeground3,
    display: "block",
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase400,
    textAlign: "center",
  },
  logoCenter: {
    display: "flex",
    justifyContent: "center",
  },
  signInButton: {
    width: "100%",
    height: "48px",
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
});

export function LoginPage() {
  const styles = useStyles();
  const { instance } = useMsal();

  const handleMicrosoftSignIn = async () => {
    try {
      // Clear any stuck interaction state before starting a new login
      await instance.handleRedirectPromise();
      await instance.loginRedirect(loginRequest);
    } catch (error: any) {
      if (error?.errorCode === "interaction_in_progress") {
        // Force-clear stuck state and retry
        sessionStorage.clear();
        await instance.loginRedirect(loginRequest);
      } else {
        console.error("Sign in failed:", error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoCenter}>
            <img
              src="/designloop-logo.svg"
              alt="Proto Loop Logo"
              className={styles.logo}
            />
          </div>
          <Text as="h1" className={styles.title} style={{ fontSize: "2rem", fontWeight: 600, lineHeight: "1.2" }}>
            Proto Loop
          </Text>
          <Text className={styles.subtitle}>
            This application is restricted to Microsoft
            internal&nbsp;users&nbsp;only.
          </Text>
        </div>

        <Button
          appearance="primary"
          onClick={handleMicrosoftSignIn}
          className={styles.signInButton}
        >
          Sign in with Microsoft
        </Button>
      </Card>
    </div>
  );
}
