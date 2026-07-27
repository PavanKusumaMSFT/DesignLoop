"use client";

// Client helpers for prototype versioning.
//
// Versions are git-backed (each commit over a prototype's source = a numbered
// version) plus an uncommitted "Working copy" head, enriched with run
// provenance from the bridge's append-only event log. Because git is local, the
// history endpoint is served by the local DesignLoop bridge — not the SWA
// Functions host — mirroring Go Live / Send-to-Figma.

const BRIDGE_URL =
  process.env.NEXT_PUBLIC_BRIDGE_URL ?? "http://localhost:8099";

export type VersionSource =
  | "commit"
  | "web-run"
  | "make-live"
  | "local"
  | string;

export interface VersionFile {
  path: string;
  additions?: number | null;
  deletions?: number | null;
}

export interface PrototypeVersion {
  kind: "snapshot" | "commit" | "working";
  version: number | null;
  label: string;
  snapId?: string;
  hash?: string;
  shortHash?: string;
  author?: string | null;
  email?: string | null;
  at?: string | null;
  summary?: string;
  source: VersionSource;
  sourceLabel: string;
  tool?: string | null;
  agent?: string | null;
  taskId?: string | null;
  jobId?: string | null;
  files: VersionFile[];
  additions?: number | null;
  deletions?: number | null;
  current?: boolean;
  uncommitted?: boolean;
}

export interface VersionContributor {
  name: string;
  commits: number;
  runs: number;
}

export interface PrototypeLastUpdate {
  at?: string | null;
  author?: string | null;
  source?: VersionSource;
  summary?: string;
  sourceLabel?: string;
}

export interface PrototypeHistory {
  id: string;
  versionCount: number;
  committedCount: number;
  hasUncommitted: boolean;
  lastUpdate: PrototypeLastUpdate | null;
  contributors: VersionContributor[];
  versions: PrototypeVersion[];
}

/** Fetch the full version history for a prototype from the local bridge. */
export async function fetchPrototypeHistory(
  id: string,
): Promise<PrototypeHistory> {
  const res = await fetch(
    `${BRIDGE_URL}/api/prototypes/history?id=${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.error) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data as PrototypeHistory;
}

/** Compact, human-friendly relative time (e.g. "3h ago", "yesterday"). */
export function relativeTime(iso?: string | null): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (isNaN(then)) return "";
  const diff = Date.now() - then;
  if (diff < 0) return "just now";
  const sec = Math.floor(diff / 1000);
  if (sec < 45) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day === 1) return "yesterday";
  if (day < 7) return `${day}d ago`;
  const wk = Math.floor(day / 7);
  if (wk < 5) return `${wk}w ago`;
  const mo = Math.floor(day / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(day / 365)}y ago`;
}

/** Full timestamp for tooltips. */
export function fullTime(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString();
}

/** Fluent Badge color for a version source. */
export function sourceColor(
  source: VersionSource,
): "brand" | "success" | "informative" | "warning" | "subtle" {
  switch (source) {
    case "web-run":
      return "brand";
    case "make-live":
      return "success";
    case "commit":
      return "informative";
    case "local":
      return "warning";
    default:
      return "subtle";
  }
}
