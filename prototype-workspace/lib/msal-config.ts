import { Configuration } from "@azure/msal-browser";

// Sign-in authority tenant. Set NEXT_PUBLIC_MICROSOFT_TENANT_ID to:
//   - a specific Directory (tenant) ID  → single-tenant (only that org can sign in)
//   - "organizations"                   → any Microsoft work/school account (multi-tenant)
//   - "common"                          → any work/school account OR personal Microsoft account
// The app registration's "Supported account types" must match (e.g. multitenant
// for "organizations"/"common"). Falls back to "common".
const tenantId = process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID || "common";

export const msalConfig: Configuration = {
  auth: {
    clientId:
      process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID ||
      "e676d528-f113-40a9-a3ae-eba4457f8266",
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri:
      typeof window !== "undefined"
        ? window.location.origin
        : "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};
