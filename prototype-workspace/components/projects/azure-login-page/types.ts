// Shared types and mock auth adapter for the Azure sign-in / login prototype.
// No real MSAL/network — all behavior is simulated with timeouts + validation.

export type LoginState =
  | "identify" // S1
  | "picker" // S1b
  | "method" // S2
  | "password" // S3
  | "mfa" // S4
  | "loading" // S6
  | "success"; // S7

export type AccountType = "work" | "personal";
export type Environment = "Prod" | "Staging" | "Dev";

export interface KnownAccount {
  id: string;
  displayName: string;
  email: string;
  type: AccountType;
  tenant: string;
  environment?: Environment;
}

export type MethodKind =
  | "passkey"
  | "authenticator"
  | "windows-hello"
  | "password";

export interface AuthMethod {
  kind: MethodKind;
  label: string;
  /** Enrollment-driven ordering — lower renders first (FR-3 AC4). */
  order: number;
}

export type ErrorKind =
  | "wrong-password"
  | "unknown-account"
  | "locked-account"
  | "expired-session"
  | "network-error"
  | "policy-block"
  | "mfa-failed";

export type MessageIntent = "error" | "warning" | "info";

export interface ErrorSpec {
  kind: ErrorKind;
  message: string;
  intent: MessageIntent;
  /** Uses role="status" instead of role="alert" for non-urgent info. */
  status?: boolean;
  /** Optional plain-language policy panel (C8 / FR-6 AC2). */
  policyPanel?: { summary: string; detail: string };
}

/** Error taxonomy (C10, FR-6 AC1) — single source of truth for all error copy. */
export const ERROR_TAXONOMY: Record<ErrorKind, ErrorSpec> = {
  "wrong-password": {
    kind: "wrong-password",
    message: "That password isn't correct. Try again or reset it.",
    intent: "error",
  },
  "unknown-account": {
    kind: "unknown-account",
    message: "We couldn't find an account with that name.",
    intent: "error",
  },
  "locked-account": {
    kind: "locked-account",
    message: "Your account is temporarily locked for your protection.",
    intent: "warning",
  },
  "expired-session": {
    kind: "expired-session",
    message: "Your session expired. Sign in again to continue.",
    intent: "info",
    status: true,
  },
  "network-error": {
    kind: "network-error",
    message: "We couldn't reach the sign-in service. Check your connection.",
    intent: "error",
  },
  "policy-block": {
    kind: "policy-block",
    message: "Access is blocked by your organization's security policy.",
    intent: "warning",
    policyPanel: {
      summary: "How to fix this",
      detail:
        "You must sign in from a managed device. Enroll this device in your organization, or contact your admin to request access.",
    },
  },
  "mfa-failed": {
    kind: "mfa-failed",
    message: "We couldn't verify that request. Try again or choose another method.",
    intent: "error",
  },
};

/** Mock known accounts for the returning-user picker (S1b). */
export const MOCK_ACCOUNTS: KnownAccount[] = [
  {
    id: "priya-personal",
    displayName: "Priya Sharma",
    email: "priya@outlook.com",
    type: "personal",
    tenant: "Microsoft account",
  },
  {
    id: "priya-work",
    displayName: "Priya Sharma",
    email: "priya@contoso.com",
    type: "work",
    tenant: "Contoso Ltd",
    environment: "Prod",
  },
  {
    id: "devan-devops",
    displayName: "Devan Rao",
    email: "devan@fabrikam.dev",
    type: "work",
    tenant: "Fabrikam DevOps",
    environment: "Dev",
  },
];

/**
 * Enrolled methods for the chosen account, ordered by (mock) enrollment state.
 * Password is always present as the silent fallback floor (FR-4).
 */
export function getMethodsForAccount(email: string): AuthMethod[] {
  // Personal accounts: passkey-forward. Work accounts: Authenticator-forward.
  if (email.endsWith("@outlook.com") || email.endsWith("@gmail.com")) {
    return [
      { kind: "passkey", label: "Use a passkey", order: 0 },
      { kind: "password", label: "Use your password", order: 2 },
    ];
  }
  if (email.endsWith("@fabrikam.dev")) {
    // Simulate an account with NO passwordless enrolled → password floor only.
    return [{ kind: "password", label: "Use your password", order: 0 }];
  }
  return [
    {
      kind: "authenticator",
      label: "Approve a request on Microsoft Authenticator",
      order: 0,
    },
    { kind: "windows-hello", label: "Use Windows Hello", order: 1 },
    { kind: "passkey", label: "Use a passkey", order: 2 },
    { kind: "password", label: "Use your password", order: 3 },
  ];
}

export function detectAccountType(email: string): AccountType | null {
  const at = email.indexOf("@");
  if (at < 0 || at === email.length - 1) return null;
  const domain = email.slice(at + 1).toLowerCase();
  if (!domain.includes(".")) return null;
  const personalDomains = ["outlook.com", "hotmail.com", "gmail.com", "live.com"];
  return personalDomains.includes(domain) ? "personal" : "work";
}

export function isValidIdentifier(value: string): boolean {
  const v = value.trim();
  // Accept email, phone, or Skype-name-ish identifiers.
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return true; // email
  if (/^\+?[\d\s()-]{7,}$/.test(v)) return true; // phone
  return false;
}

/** Simulated async delay used to fake network/loading. */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
