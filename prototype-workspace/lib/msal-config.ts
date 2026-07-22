import { Configuration } from "@azure/msal-browser";

// Tenant the app is registered in. Set NEXT_PUBLIC_MICROSOFT_TENANT_ID to your
// Directory (tenant) ID (from the app's Overview page) for a single-tenant app.
// Falls back to "common" (multi-tenant / signed-in user's home tenant).
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
