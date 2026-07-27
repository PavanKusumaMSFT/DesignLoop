"use client";

// Client for the prototype feedback / commenting feature.
//
// Feedback works in two contexts:
//   • internal  — a signed-in DesignLoop user browsing in the workspace;
//   • external  — a research participant on a password-protected share link.
//
// The API base is resolved so the same client works everywhere:
//   • NEXT_PUBLIC_FEEDBACK_API_BASE, when explicitly set;
//   • the local bridge (http://<host>:8099) when running the dev workspace on
//     :3100 — the SWA Functions API does not run under `next dev`;
//   • otherwise same-origin `/api` (the deployed SWA Functions).
import { msalInstance } from "@/components/auth/auth-providers";
import { loginRequest } from "@/lib/msal-config";

/* ------------------------------------------------------------------ types */

export interface FeedbackAnchor {
  /** Best-effort unique CSS selector for the clicked element. */
  selector: string;
  /** Trimmed text snippet of the element, to help re-locate / show context. */
  text: string;
  /** Click offset within the element's box, 0..1 (resilient to resize). */
  relX: number;
  relY: number;
  /** Absolute document-coordinate ratios, used as a fallback when the
   *  selector no longer resolves (0..1 of scrollWidth / scrollHeight). */
  docX: number;
  docY: number;
  /** A short human label for the element (tag + text/aria), for the list. */
  label: string;
}

export interface FeedbackReply {
  author: string;
  text: string;
  at: string;
}

export interface FeedbackComment {
  id: string;
  prototypeId: string;
  route: string;
  page: string;
  author: string;
  authorSource: "internal" | "external";
  text: string;
  status: "open" | "resolved";
  anchor: FeedbackAnchor;
  replies: FeedbackReply[];
  createdAt: string;
  updatedAt: string;
  resolvedBy?: string | null;
}

export type FeedbackContext =
  | { kind: "internal"; email?: string | null }
  | { kind: "external"; token: string };

/* ------------------------------------------------------------- api base */

export function feedbackApiBase(): string {
  const explicit = process.env.NEXT_PUBLIC_FEEDBACK_API_BASE;
  if (explicit) return explicit.replace(/\/+$/, "");
  if (typeof window !== "undefined") {
    const { hostname, port, protocol } = window.location;
    if (port === "3100") {
      // Local dev workspace → talk to the bridge (permissive CORS).
      return `${protocol}//${hostname}:8099/api`;
    }
  }
  return "/api";
}

function usingBridge(base: string): boolean {
  return base.includes(":8099");
}

async function ownerToken(): Promise<string | null> {
  try {
    const account =
      msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];
    if (!account) return null;
    const res = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account,
    });
    return res.idToken;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------- requests */

async function api<T>(
  path: string,
  method: "GET" | "POST",
  ctx: FeedbackContext,
  body?: Record<string, unknown>,
  query?: Record<string, string>,
): Promise<T> {
  const base = feedbackApiBase();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const payload: Record<string, unknown> = { ...(body || {}) };
  const q = new URLSearchParams(query || {});

  if (ctx.kind === "external") {
    payload.token = ctx.token;
    q.set("token", ctx.token);
  } else if (!usingBridge(base)) {
    // Internal + deployed Functions: authenticate as the owner.
    const t = await ownerToken();
    if (t) headers["X-Owner-Token"] = t;
  }

  const qs = q.toString();
  const res = await fetch(`${base}${path}${qs ? `?${qs}` : ""}`, {
    method,
    headers,
    ...(method === "POST" ? { body: JSON.stringify(payload) } : {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data && (data.error || data.reason)) || `Request failed (${res.status})`);
  }
  return data as T;
}

export async function listFeedback(
  prototypeId: string,
  page: string,
  ctx: FeedbackContext,
): Promise<FeedbackComment[]> {
  const data = await api<{ comments: FeedbackComment[] }>(
    "/feedback/list",
    "GET",
    ctx,
    undefined,
    { prototypeId, page },
  );
  return data.comments || [];
}

export async function createFeedback(
  input: {
    prototypeId: string;
    route: string;
    page: string;
    author: string;
    text: string;
    anchor: FeedbackAnchor;
  },
  ctx: FeedbackContext,
): Promise<FeedbackComment> {
  const data = await api<{ comment: FeedbackComment }>(
    "/feedback/create",
    "POST",
    ctx,
    { ...input, authorSource: ctx.kind },
  );
  return data.comment;
}

export async function updateFeedback(
  input: {
    prototypeId: string;
    id: string;
    status?: "open" | "resolved";
    reply?: { author: string; text: string };
    resolvedBy?: string;
  },
  ctx: FeedbackContext,
): Promise<FeedbackComment> {
  // Translate the caller's intent into the backend's action protocol
  // (reply | resolve | reopen), shared by the bridge and the SWA Functions.
  const payload: Record<string, unknown> = {
    prototypeId: input.prototypeId,
    id: input.id,
  };
  if (input.reply) {
    payload.action = "reply";
    payload.author = input.reply.author;
    payload.text = input.reply.text;
  } else if (input.status === "resolved") {
    payload.action = "resolve";
    payload.author = input.resolvedBy || "";
  } else if (input.status === "open") {
    payload.action = "reopen";
    payload.author = input.resolvedBy || "";
  } else {
    throw new Error("Nothing to update");
  }
  const data = await api<{ comment: FeedbackComment }>(
    "/feedback/update",
    "POST",
    ctx,
    payload,
  );
  return data.comment;
}

export async function deleteFeedback(
  prototypeId: string,
  id: string,
  ctx: FeedbackContext,
): Promise<void> {
  await api<{ ok: boolean }>("/feedback/delete", "POST", ctx, { prototypeId, id });
}

/* --------------------------------------------------------- anchor utils */

const SKIP_ATTR = "data-feedback-ui";

/** Is this node part of the feedback overlay itself (so we never anchor to it)? */
export function isFeedbackUi(el: Element | null): boolean {
  return !!el && !!el.closest(`[${SKIP_ATTR}]`);
}

function cssEscape(v: string): string {
  if (typeof (window as any).CSS !== "undefined" && (window as any).CSS.escape) {
    return (window as any).CSS.escape(v);
  }
  return v.replace(/[^a-zA-Z0-9_-]/g, (c) => `\\${c}`);
}

/**
 * Build a resilient, best-effort unique selector for an element by walking up
 * to <body>, preferring stable hooks (id, data-testid) and otherwise using a
 * tag + :nth-of-type step. Bails out early on a usable id.
 */
export function computeSelector(el: Element): string {
  if (!el || el === document.body) return "body";
  const parts: string[] = [];
  let node: Element | null = el;
  let depth = 0;
  while (node && node.nodeType === 1 && node !== document.body && depth < 8) {
    const id = node.getAttribute("id");
    if (id && /^[a-zA-Z][\w-]*$/.test(id)) {
      parts.unshift(`#${cssEscape(id)}`);
      break; // an id is unique enough — stop here
    }
    const testid =
      node.getAttribute("data-testid") || node.getAttribute("data-test");
    let step = node.tagName.toLowerCase();
    if (testid) {
      step += `[data-testid="${cssEscape(testid)}"]`;
    } else {
      const parent = node.parentElement;
      if (parent) {
        const sibs = Array.from(parent.children).filter(
          (c) => c.tagName === node!.tagName,
        );
        if (sibs.length > 1) {
          step += `:nth-of-type(${sibs.indexOf(node) + 1})`;
        }
      }
    }
    parts.unshift(step);
    node = node.parentElement;
    depth++;
  }
  return parts.join(" > ") || el.tagName.toLowerCase();
}

function shortText(el: Element): string {
  const t = (el as HTMLElement).innerText || el.textContent || "";
  return t.replace(/\s+/g, " ").trim().slice(0, 80);
}

function elementLabel(el: Element): string {
  const aria = el.getAttribute("aria-label");
  const txt = shortText(el);
  const tag = el.tagName.toLowerCase();
  const base = aria || txt || tag;
  return base.length > 42 ? `${base.slice(0, 42)}…` : base;
}

/** Capture an anchor from a click at viewport coords over `el`. */
export function captureAnchor(
  el: Element,
  clientX: number,
  clientY: number,
): FeedbackAnchor {
  const r = el.getBoundingClientRect();
  const relX = r.width ? Math.min(1, Math.max(0, (clientX - r.left) / r.width)) : 0.5;
  const relY = r.height ? Math.min(1, Math.max(0, (clientY - r.top) / r.height)) : 0.5;
  const docW = document.documentElement.scrollWidth || 1;
  const docH = document.documentElement.scrollHeight || 1;
  const docX = (clientX + window.scrollX) / docW;
  const docY = (clientY + window.scrollY) / docH;
  return {
    selector: computeSelector(el),
    text: shortText(el),
    relX,
    relY,
    docX,
    docY,
    label: elementLabel(el),
  };
}

/** Resolve an anchor to current document coordinates { x, y } (px). */
export function locateAnchor(anchor: FeedbackAnchor): { x: number; y: number } {
  try {
    const el = anchor.selector ? document.querySelector(anchor.selector) : null;
    if (el) {
      const r = el.getBoundingClientRect();
      return {
        x: window.scrollX + r.left + anchor.relX * r.width,
        y: window.scrollY + r.top + anchor.relY * r.height,
      };
    }
  } catch {
    /* invalid selector — fall through to ratio fallback */
  }
  const docW = document.documentElement.scrollWidth || 1;
  const docH = document.documentElement.scrollHeight || 1;
  return { x: anchor.docX * docW, y: anchor.docY * docH };
}

/* --------------------------------------------------------- visitor name */

const NAME_KEY = "feedback_display_name";

export function getStoredName(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(NAME_KEY) || "";
  } catch {
    return "";
  }
}

export function storeName(name: string) {
  try {
    localStorage.setItem(NAME_KEY, name);
  } catch {
    /* ignore */
  }
}
