"use client";

// Client helpers for the external prototype share feature.
//
// Owner endpoints (create/list/lock) require an MSAL bearer token; the public
// verify endpoint does not. In production the API is same-origin at `/api`;
// for local dev set NEXT_PUBLIC_SHARES_API_BASE (the Functions host) since the
// SWA API does not run under `next dev`.
import { msalInstance } from "@/components/auth/auth-providers";
import { loginRequest } from "@/lib/msal-config";

const API_BASE = process.env.NEXT_PUBLIC_SHARES_API_BASE || "/api";

export interface ShareRecord {
  prototypeId: string;
  token: string;
  route: string;
  label: string;
  expiresAt: string;
  locked: boolean;
  createdBy: string;
  createdAt: string;
  status: "active" | "expired" | "locked";
}

const SESSION_PREFIX = "share_session:";

export interface ShareSession {
  prototypeId: string;
  token: string;
  expiresAt: string;
  authenticatedAt: string;
}

function sessionKey(prototypeId: string) {
  return `${SESSION_PREFIX}${prototypeId}`;
}

export function getShareSession(prototypeId: string): ShareSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(sessionKey(prototypeId));
    if (!raw) return null;
    const s: ShareSession = JSON.parse(raw);
    if (s.expiresAt) {
      const exp = new Date(s.expiresAt);
      if (!isNaN(exp.getTime()) && exp < new Date()) {
        sessionStorage.removeItem(sessionKey(prototypeId));
        return null;
      }
    }
    return s;
  } catch {
    return null;
  }
}

export function setShareSession(s: ShareSession) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(sessionKey(s.prototypeId), JSON.stringify(s));
}

export function clearShareSession(prototypeId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(sessionKey(prototypeId));
}

// Acquire an MSAL token to authenticate owner-only calls.
async function getIdToken(): Promise<string> {
  const account =
    msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];
  if (!account) throw new Error("You must be signed in to manage shares.");
  try {
    const res = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account,
    });
    return res.idToken;
  } catch {
    const res = await msalInstance.acquireTokenPopup({
      ...loginRequest,
      account,
    });
    return res.idToken;
  }
}

async function ownerFetch(path: string, init: RequestInit = {}) {
  const token = await getIdToken();
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      // Azure Static Web Apps reserves the `Authorization` header for its own
      // platform auth and does not forward it to managed Functions, so the
      // MSAL token is sent in a custom header the function reads instead.
      "X-Owner-Token": token,
      ...(init.headers || {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

export interface CreateShareInput {
  prototypeId: string;
  route: string;
  password: string;
  expiresInMinutes: number;
  label?: string;
}

export async function createShare(input: CreateShareInput): Promise<{
  token: string;
  expiresAt: string;
  route: string;
}> {
  return ownerFetch("/shares", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function listShares(prototypeId: string): Promise<ShareRecord[]> {
  const data = await ownerFetch(
    `/shares/list?prototypeId=${encodeURIComponent(prototypeId)}`,
  );
  return data.shares || [];
}

export async function lockShare(
  prototypeId: string,
  token: string,
  locked: boolean,
): Promise<void> {
  await ownerFetch("/shares/lock", {
    method: "POST",
    body: JSON.stringify({ prototypeId, token, locked }),
  });
}

export interface VerifyResult {
  valid: boolean;
  expiresAt?: string;
  route?: string;
  reason?: string;
}

// Public — no auth. Used by the ShareGate.
export async function verifyShare(
  prototypeId: string,
  token: string,
  password: string,
): Promise<VerifyResult> {
  const res = await fetch(`${API_BASE}/shares/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prototypeId, token, password }),
  });
  return res.json().catch(() => ({ valid: false, reason: "network" }));
}

// Build the shareable URL for a prototype route + token.
export function buildShareUrl(route: string, token: string): string {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const path = route.startsWith("/") ? route : `/${route}`;
  return `${origin}${path}?share=${token}`;
}
