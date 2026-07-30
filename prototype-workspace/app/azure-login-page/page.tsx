"use client";

import LoginPage from "../../components/projects/azure-login-page";

/**
 * Route: /azure-login-page
 * Single-canvas Azure sign-in / login experience built from Fluent UI React v9.
 * Self-contained mock flow (no real MSAL): identify → method/password → MFA →
 * loading → success, with an inline error/recovery system.
 */
export default function AzureLoginPageRoute() {
  return <LoginPage />;
}
