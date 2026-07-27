"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent as ReactDragEvent } from "react";
import { useRouter } from "next/navigation";
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  tokens as fluentTokens,
  Text,
  Badge,
  SearchBox,
  Button,
  Spinner,
  Avatar,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogContent,
  DialogActions,
} from "@fluentui/react-components";
import {
  ArrowRight20Regular,
  CloudArrowUp16Regular,
  ArrowExport16Regular,
  Open16Regular,
  Accessibility16Regular,
  ShieldCheckmark16Regular,
  PersonFeedback16Regular,
  ClipboardTask16Regular,
  Target16Regular,
  ImageMultiple16Regular,
  DocumentCheckmark16Regular,
  CheckmarkCircle12Filled,
  Share16Regular,
  History16Regular,
  ArrowUpload20Regular,
  ArrowUpload24Regular,
  Delete16Regular,
} from "@fluentui/react-icons";
import { projects } from "../data/projects";
import liveExtras from "../data/live-prototypes.json";
import { msalInstance } from "../components/auth/auth-providers";
import ShareDialog from "../components/share/share-dialog";
import VersionHistoryDialog from "../components/versions/version-history-dialog";
import { relativeTime, type PrototypeLastUpdate } from "../lib/versions";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

/** Base URL of the local DesignLoop bridge that performs git operations. */
const BRIDGE_URL =
  process.env.NEXT_PUBLIC_BRIDGE_URL ?? "http://localhost:8099";

// ---------------------------------------------------------------------------
// Card model — a flat shape shared by live (repo) and local prototypes
// ---------------------------------------------------------------------------

type CardItem = {
  id: string;
  title: string;
  description?: string;
  status: string;
  author?: string;
  createdBy?: string;
  origin: "live" | "local";
  route?: string;
  deployUrl?: string;
  sourceType?: string;
  hasLocalChanges?: boolean;
  lastUpdate?: PrototypeLastUpdate | null;
  versionCount?: number;
};

// ---------------------------------------------------------------------------
// Report card — Test-stage checks run on a prototype (from the bridge)
// ---------------------------------------------------------------------------

type ReportFile = { path: string; label: string; status?: string | null; updated?: string | null };
type ReportCheck = { key: string; label: string; ran: boolean; status?: string | null; files: ReportFile[] };
type ReportCard = { taskId: string; title: string; checks: ReportCheck[]; ranCount: number };

/** Icon per canonical check key. */
function checkIcon(key: string) {
  switch (key) {
    case "accessibility": return <Accessibility16Regular />;
    case "security": return <ShieldCheckmark16Regular />;
    case "tenets-traps": return <Target16Regular />;
    case "usability": return <PersonFeedback16Regular />;
    case "test-execution": return <ClipboardTask16Regular />;
    case "visual": return <ImageMultiple16Regular />;
    default: return <DocumentCheckmark16Regular />;
  }
}

/** Map an artifact status to a Fluent Badge color. */
function statusColor(status?: string | null): "success" | "warning" | "informative" | "subtle" {
  switch ((status || "").toLowerCase()) {
    case "completed": return "success";
    case "approved": return "success";
    case "in-review": return "warning";
    case "draft": return "informative";
    default: return "subtle";
  }
}

function statusLabel(status?: string | null): string {
  const s = (status || "").toLowerCase();
  if (s === "completed") return "Completed";
  if (s === "approved") return "Approved";
  if (s === "in-review") return "In review";
  if (s === "draft") return "Draft";
  return "Ran";
}

// A test file can be marked completed while it's still in-review or draft.
function canComplete(status?: string | null): boolean {
  const s = (status || "").toLowerCase();
  return s === "in-review" || s === "draft";
}


/** Shape of an entry in public/local-prototypes.json (all optional but id/title). */
type LocalPrototypeEntry = {
  id: string;
  title: string;
  description?: string;
  status?: string;
  author?: string;
  createdBy?: string;
  route?: string;
  sourceType?: string;
  hasLocalChanges?: boolean;
  lastUpdate?: PrototypeLastUpdate | null;
  versionCount?: number;
};

// ---------------------------------------------------------------------------
// Local prototype loading
// ---------------------------------------------------------------------------

/** Shape of an entry in data/live-prototypes.json (promoted prototypes). */
type LivePrototypeEntry = {
  id: string;
  title: string;
  description?: string;
  status?: string;
  author?: string;
  route?: string;
  sourceType?: string;
};

/** Live (repo baseline) prototypes as flat card items. */
const LIVE_ITEMS: CardItem[] = (() => {
  // Defensive: `projects` is a mutable registry that agents/scaffolds append to,
  // so a single imperfect entry (missing `id` or `source`) must never crash the
  // whole home page. Skip malformed entries instead of throwing at import time.
  const fromRegistry: CardItem[] = (Array.isArray(projects) ? projects : [])
    .filter((p) => p && p.id && p.title && p.source)
    .map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      status: p.status,
      author: p.author || p.owner,
      createdBy: p.createdBy,
      origin: "live" as const,
      route: p.source.route,
      deployUrl: p.source.deployUrl,
      sourceType: p.source.type,
    }));
  // Prototypes promoted to live via "Make live" (committed data/live-prototypes.json).
  const fromPromoted: CardItem[] = (liveExtras as LivePrototypeEntry[])
    .filter((e) => e && e.id && e.title)
    .map((e) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      status: e.status || "in-progress",
      author: e.author,
      origin: "live" as const,
      route: e.route || `/${e.id}`,
      sourceType: e.sourceType || "local",
    }));
  const seen = new Set(fromRegistry.map((p) => p.id));
  return [...fromRegistry, ...fromPromoted.filter((p) => !seen.has(p.id))];
})();

/** Normalize a raw local entry (from the bridge or the static file) to a card. */
function toLocalCard(e: LocalPrototypeEntry): CardItem {
  return {
    id: e.id,
    title: e.title,
    description: e.description,
    status: e.status || "in-progress",
    author: e.author,
    createdBy: e.createdBy,
    origin: "local" as const,
    route: e.route || `/${e.id}`,
    sourceType: e.sourceType || "local",
    hasLocalChanges: e.hasLocalChanges,
    lastUpdate: e.lastUpdate,
    versionCount: e.versionCount,
  };
}

/**
 * Load locally-created prototypes. Prefers the bridge's filesystem discovery
 * (GET /api/prototypes/list) so ANY agent-created prototype appears as soon as
 * its files exist — no scaffold bookkeeping or restart required. Falls back to
 * the static public/local-prototypes.json (git-ignored, absent when hosted, so
 * the hosted site shows only Live prototypes).
 */
async function loadLocalItems(): Promise<CardItem[]> {
  try {
    const res = await fetch(`${BRIDGE_URL}/api/prototypes/list`, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      const entries = Array.isArray(data?.items) ? data.items : [];
      return entries
        .filter((e: LocalPrototypeEntry) => e && e.id && e.title)
        .map(toLocalCard);
    }
  } catch {
    /* bridge unavailable (e.g. hosted) — fall through to the static file */
  }
  try {
    const res = await fetch("/local-prototypes.json", { cache: "no-store" });
    if (!res.ok) return [];
    const entries = (await res.json()) as LocalPrototypeEntry[];
    if (!Array.isArray(entries)) return [];
    return entries.filter((e) => e && e.id && e.title).map(toLocalCard);
  } catch {
    return [];
  }
}


// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  gradientAccent: {
    position: "absolute",
    top: "-15%",
    right: "-10%",
    width: "55%",
    height: "60%",
    background:
      "radial-gradient(circle, rgba(0, 120, 212, 0.06) 0%, transparent 70%)",
    borderRadius: "50%",
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    zIndex: 1,
    padding: `${tokens.spacingVerticalXXXL} ${tokens.spacingHorizontalXXL}`,
    maxWidth: "880px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    alignSelf: "flex-start",
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    padding: 0,
    marginBottom: tokens.spacingVerticalM,
    transitionProperty: "color",
    transitionDuration: tokens.durationFast,
    ":hover": { color: tokens.colorBrandForeground1 },
  },
  eyebrow: {
    display: "block",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    textTransform: "uppercase" as const,
    letterSpacing: "0.09em",
  },
  title: {
    display: "block",
    fontSize: "44px",
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "1.1",
    color: tokens.colorNeutralForeground1,
    letterSpacing: "-0.01em",
  },
  subtitle: {
    display: "block",
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground3,
    lineHeight: "1.5",
    maxWidth: "620px",
    marginTop: tokens.spacingVerticalXS,
  },
  countPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    alignSelf: "flex-start",
    marginTop: tokens.spacingVerticalS,
    padding: `2px ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium,
  },
  countPillIcon: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  searchBox: {
    width: "100%",
    maxWidth: "360px",
    borderRadius: tokens.borderRadiusLarge,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  uploadStatus: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  uploadError: {
    color: tokens.colorPaletteRedForeground1,
  },
  dropOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacingVerticalXXL,
    backgroundColor: "rgba(15, 23, 42, 0.28)",
    backdropFilter: "blur(2px)",
    pointerEvents: "none",
  },
  dropInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalS,
    textAlign: "center",
    paddingTop: tokens.spacingVerticalXXL,
    paddingBottom: tokens.spacingVerticalXXL,
    paddingLeft: tokens.spacingHorizontalXXXL,
    paddingRight: tokens.spacingHorizontalXXXL,
    borderRadius: tokens.borderRadiusXLarge,
    borderTopWidth: "2px",
    borderRightWidth: "2px",
    borderBottomWidth: "2px",
    borderLeftWidth: "2px",
    borderTopStyle: "dashed",
    borderRightStyle: "dashed",
    borderBottomStyle: "dashed",
    borderLeftStyle: "dashed",
    borderTopColor: tokens.colorBrandStroke1,
    borderRightColor: tokens.colorBrandStroke1,
    borderBottomColor: tokens.colorBrandStroke1,
    borderLeftColor: tokens.colorBrandStroke1,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow28,
    minWidth: "320px",
  },
  dropIcon: {
    fontSize: "40px",
    color: tokens.colorBrandForeground1,
  },
  dropTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  dropHint: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  card: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    width: "100%",
    textAlign: "left",
    padding: tokens.spacingVerticalL,
    paddingRight: tokens.spacingHorizontalXL,
    borderRadius: "12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "default",
    boxShadow: tokens.shadow2,
    transitionProperty: "transform, box-shadow, border-color, background-color",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      boxShadow: tokens.shadow8,
      borderColor: tokens.colorNeutralStroke1,
    },
    ":hover .protoChevron": {
      transform: "translateX(4px)",
      color: tokens.colorBrandForeground1,
    },
    ":focus-within": {
      borderColor: tokens.colorBrandStroke1,
    },
  },
  iconTile: {
    display: "none",
  },
  iconGlyph: {
    display: "none",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    flexGrow: 1,
    minWidth: 0,
  },
  cardTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  cardTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.25",
  },
  cardDesc: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
    lineHeight: "1.45",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical" as const,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
    marginTop: tokens.spacingVerticalXS,
  },
  metaDot: {
    width: "3px",
    height: "3px",
    borderRadius: "50%",
    backgroundColor: tokens.colorNeutralForeground4,
  },
  authorText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  updatedIcon: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground4,
    flexShrink: 0,
  },
  youBadge: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: tokens.borderRadiusSmall,
    padding: `1px ${tokens.spacingHorizontalXS}`,
    lineHeight: "1.4",
  },
  chevron: {
    flexShrink: 0,
    color: tokens.colorNeutralForeground4,
    fontSize: "20px",
    transitionProperty: "transform, color",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
  },
  chevronBtn: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    padding: 0,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "50%",
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    transitionProperty: "background-color, border-color, box-shadow",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      backgroundColor: tokens.colorBrandBackground2,
      borderColor: tokens.colorBrandStroke1,
    },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorBrandStroke1}`,
      outlineOffset: "2px",
    },
  },
  goLiveWrap: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    flexShrink: 0,
  },
  goLiveBtn: {
    flexShrink: 0,
  },
  goLiveWorking: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    flexShrink: 0,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  goLiveErrorText: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: tokens.fontSizeBase200,
    maxWidth: "160px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  cardActions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexShrink: 0,
  },
  figmaWrap: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    flexShrink: 0,
  },
  figmaBtn: {
    flexShrink: 0,
  },
  figmaWorking: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    flexShrink: 0,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  figmaLink: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    flexShrink: 0,
    color: tokens.colorBrandForegroundLink,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    textDecorationLine: "none",
    ":hover": { textDecorationLine: "underline" },
  },
  figmaErrorText: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: tokens.fontSizeBase200,
    maxWidth: "140px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  empty: {
    padding: tokens.spacingVerticalXXXL,
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
    border: `1px dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
  },
  reportStrip: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: tokens.spacingHorizontalXS,
    marginTop: tokens.spacingVerticalS,
  },
  reportChip: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    padding: `2px ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    lineHeight: "1.4",
    cursor: "pointer",
    ":hover": {
      borderColor: tokens.colorBrandStroke1,
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  reportChipIcon: {
    display: "inline-flex",
    color: tokens.colorNeutralForeground3,
  },
  reportTick: {
    color: tokens.colorPaletteGreenForeground1,
  },
  reportMore: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForegroundLink,
    background: "none",
    border: "none",
    padding: `2px ${tokens.spacingHorizontalXS}`,
    cursor: "pointer",
    ":hover": { textDecorationLine: "underline" },
  },
  reportEmpty: {
    marginTop: tokens.spacingVerticalS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground4,
  },
  dlgList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  dlgRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingVerticalS,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  dlgRowNotRun: {
    opacity: 0.55,
  },
  dlgRowIcon: {
    display: "inline-flex",
    marginTop: "2px",
    color: tokens.colorNeutralForeground3,
  },
  dlgRowMain: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    flexGrow: 1,
    minWidth: 0,
  },
  dlgRowHead: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  dlgRowLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  dlgFileLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForegroundLink,
    textDecorationLine: "none",
    ":hover": { textDecorationLine: "underline" },
  },
  dlgNotRunText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground4,
  },
  dlgFileRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
});

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

function PrototypeCard({
  item,
  currentEmail,
  onGoLive,
  goLiveState,
  onSendFigma,
  figmaState,
  report,
  onDelete,
}: {
  item: CardItem;
  currentEmail: string | null;
  onGoLive?: (item: CardItem) => void;
  goLiveState?: { phase: "working" | "error"; detail?: string };
  onSendFigma?: (item: CardItem) => void;
  figmaState?: { phase: "working" | "error" | "done"; detail?: string; link?: string };
  report?: ReportCard;
  onDelete?: (item: CardItem) => void;
}) {
  const styles = useStyles();
  const router = useRouter();
  const [reportOpen, setReportOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [versionOpen, setVersionOpen] = useState(false);
  // Local copy so "Mark completed" updates the card immediately without a reload.
  const [card, setCard] = useState<ReportCard | undefined>(report);
  const [savingPath, setSavingPath] = useState<string | null>(null);
  useEffect(() => { setCard(report); }, [report]);

  const markCompleted = useCallback(
    async (file: ReportFile) => {
      if (!card || savingPath) return;
      setSavingPath(file.path);
      try {
        const r = await fetch(`${BRIDGE_URL}/api/report/status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: item.id, kind: "prototype", path: file.path, status: "completed" }),
        });
        if (r.ok) {
          const data = await r.json();
          if (data.report) setCard(data.report as ReportCard);
        }
      } catch {
        /* offline — leave state unchanged */
      } finally {
        setSavingPath(null);
      }
    },
    [card, savingPath, item.id],
  );

  const open = useCallback(() => {
    if (item.sourceType === "fork" && item.deployUrl) {
      window.open(item.deployUrl, "_blank", "noopener");
    } else if (item.route) {
      router.push(item.route);
    }
  }, [item, router]);

  // Deep-link to a report in the DesignLoop task viewer (renders markdown). For
  // non-markdown evidence (e.g. a visual screenshots folder) open the task page.
  const reportHref = useCallback(
    (file?: ReportFile) => {
      if (!card) return "#";
      const base = `${BRIDGE_URL}/task.html?task=${encodeURIComponent(card.taskId)}`;
      if (file && /\.md$/i.test(file.path)) {
        return `${base}&file=${encodeURIComponent(file.path)}&phase=test`;
      }
      return `${base}&phase=test`;
    },
    [card],
  );

  const isMine =
    !!currentEmail &&
    !!item.createdBy &&
    item.createdBy.toLowerCase() === currentEmail.toLowerCase();

  const canGoLive =
    !!onGoLive &&
    item.origin === "local" &&
    (item.sourceType === "uploaded" || !!item.hasLocalChanges);

  // Send-to-Figma is available for any workspace-rendered prototype (has a
  // local route), regardless of live/local status. Forks (external deploy only)
  // have no reconstructable source, so they are excluded. The bridge composes a
  // build spec of real Azure Fluent 2 components (fluent-to-figma agent) and the
  // local DesignLoop plugin instantiates them into the target file.
  const SEND_FIGMA_ENABLED = true;
  const canSendFigma =
    SEND_FIGMA_ENABLED &&
    !!onSendFigma &&
    !!item.route &&
    item.sourceType !== "fork" &&
    item.sourceType !== "uploaded";

  // External password-protected sharing is available for any workspace-rendered
  // prototype (has a local route). Forks (external deploy only) and uploaded
  // (non-GitHub, no reconstructable route source) are excluded.
  const canShare =
    !!item.route && item.sourceType !== "fork" && item.sourceType !== "uploaded";
  // Version history is git-backed and served by the local bridge, so it is
  // available for any workspace-rendered prototype (has a local route). Forks
  // (external deploy only) and uploaded prototypes have no local git source.
  const canViewHistory =
    !!item.route && item.sourceType !== "fork" && item.sourceType !== "uploaded";
  // Uploaded (non-GitHub) prototypes can be removed while still local (before
  // they are promoted to Live and committed to the repo).
  const canDelete =
    item.sourceType === "uploaded" && item.origin === "local" && !!onDelete;
  // The share id must match the route's first path segment, which is what the
  // auth gate uses to resolve a shared link.
  const shareId =
    (item.route || "").split("/").filter(Boolean)[0] || item.id;

  return (
    <div className={styles.card}>
      <div className={styles.body}>
        <div className={styles.cardTitleRow}>
          <Text className={styles.cardTitle}>{item.title}</Text>
          <Badge
            appearance="tint"
            size="small"
            color={item.origin === "live" ? "success" : "warning"}
          >
            {item.origin === "live" ? "Live" : "Local"}
          </Badge>
          {item.hasLocalChanges && (
            <Badge
              appearance="filled"
              size="small"
              color="danger"
              title="This prototype has changes that haven't been pushed to live yet."
            >
              Changes to push
            </Badge>
          )}
        </div>

        {item.description && (
          <Text className={styles.cardDesc}>{item.description}</Text>
        )}

        {item.author && (
          <div className={styles.metaRow}>
            <Avatar
              name={item.author}
              size={20}
              color="colorful"
              aria-hidden
            />
            <Text className={styles.authorText}>{item.author}</Text>
            {isMine && <span className={styles.youBadge}>You</span>}
          </div>
        )}

        {item.lastUpdate && item.lastUpdate.at && (
          <div className={styles.metaRow}>
            <History16Regular className={styles.updatedIcon} />
            <Text className={styles.authorText}>
              {item.lastUpdate.sourceLabel || "Updated"}
              {item.lastUpdate.author ? ` by ${item.lastUpdate.author}` : ""}
              {" · "}
              {relativeTime(item.lastUpdate.at)}
              {typeof item.versionCount === "number" && item.versionCount > 0
                ? ` · v${item.versionCount}`
                : ""}
            </Text>
          </div>
        )}

        {card && (card.ranCount > 0 ? (
          <div
            className={styles.reportStrip}
            onClick={(e) => e.stopPropagation()}
            role="presentation"
          >
            {card.checks
              .filter((c) => c.ran)
              .map((c) => (
                <a
                  key={c.key}
                  className={styles.reportChip}
                  href={reportHref(c.files[0])}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${c.label} — ${statusLabel(c.status)}`}
                >
                  <span className={styles.reportChipIcon}>{checkIcon(c.key)}</span>
                  {c.label}
                  <CheckmarkCircle12Filled className={styles.reportTick} />
                </a>
              ))}
            <button
              type="button"
              className={styles.reportMore}
              onClick={() => setReportOpen(true)}
            >
              Report card ({card.ranCount})
            </button>
          </div>
        ) : (
          <div
            className={styles.reportEmpty}
            onClick={(e) => e.stopPropagation()}
            role="presentation"
          >
            No tests run yet
          </div>
        ))}
      </div>

      {card && (
        <Dialog
          open={reportOpen}
          onOpenChange={(_, data) => setReportOpen(data.open)}
        >
          <DialogSurface onClick={(e) => e.stopPropagation()}>
            <DialogBody>
              <DialogTitle>Report card — {item.title}</DialogTitle>
              <DialogContent>
                <div className={styles.dlgList}>
                  {card.checks.map((c) => (
                    <div
                      key={c.key}
                      className={`${styles.dlgRow} ${c.ran ? "" : styles.dlgRowNotRun}`}
                    >
                      <span className={styles.dlgRowIcon}>{checkIcon(c.key)}</span>
                      <div className={styles.dlgRowMain}>
                        <div className={styles.dlgRowHead}>
                          <Text className={styles.dlgRowLabel}>{c.label}</Text>
                          {c.ran ? (
                            <Badge appearance="tint" size="small" color={statusColor(c.status)}>
                              {statusLabel(c.status)}
                            </Badge>
                          ) : (
                            <Badge appearance="outline" size="small" color="subtle">
                              Not run
                            </Badge>
                          )}
                        </div>
                        {c.ran &&
                          c.files.map((f) => (
                            <div key={f.path} className={styles.dlgFileRow}>
                              <a
                                className={styles.dlgFileLink}
                                href={reportHref(f)}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Open16Regular />
                                {f.label}
                              </a>
                              {/\.md$/i.test(f.path) && canComplete(f.status) && (
                                <Button
                                  size="small"
                                  appearance="outline"
                                  disabled={savingPath === f.path}
                                  onClick={() => markCompleted(f)}
                                >
                                  {savingPath === f.path ? "Saving…" : "Mark completed"}
                                </Button>
                              )}
                            </div>
                          ))}
                        {!c.ran && (
                          <Text className={styles.dlgNotRunText}>
                            Run the {c.label.toLowerCase()} check in the Test stage.
                          </Text>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
              <DialogActions>
                <Button appearance="secondary" onClick={() => setReportOpen(false)}>
                  Close
                </Button>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      )}

      {canGoLive && (
        <div
          className={styles.goLiveWrap}
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          {goLiveState?.phase === "working" ? (
            <span className={styles.goLiveWorking}>
              <Spinner size="tiny" />
              Going live…
            </span>
          ) : goLiveState?.phase === "error" ? (
            <>
              <Text
                className={styles.goLiveErrorText}
                title={goLiveState.detail}
              >
                {goLiveState.detail || "Failed"}
              </Text>
              <Button
                className={styles.goLiveBtn}
                appearance="primary"
                size="small"
                icon={<CloudArrowUp16Regular />}
                onClick={() => onGoLive?.(item)}
              >
                Retry
              </Button>
            </>
          ) : (
            <Button
              className={styles.goLiveBtn}
              appearance="primary"
              size="small"
              icon={<CloudArrowUp16Regular />}
              onClick={() => onGoLive?.(item)}
            >
              Go Live
            </Button>
          )}
        </div>
      )}

      {canSendFigma && (
        <div
          className={styles.figmaWrap}
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          {figmaState?.phase === "working" ? (
            <span className={styles.figmaWorking}>
              <Spinner size="tiny" />
              Sending to Figma…
            </span>
          ) : figmaState?.phase === "done" ? (
            <a
              className={styles.figmaLink}
              href={figmaState.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Open16Regular />
              In Figma
            </a>
          ) : figmaState?.phase === "error" ? (
            <>
              <Text
                className={styles.figmaErrorText}
                title={figmaState.detail}
              >
                {figmaState.detail || "Failed"}
              </Text>
              <Button
                className={styles.figmaBtn}
                appearance="secondary"
                size="small"
                icon={<ArrowExport16Regular />}
                onClick={() => onSendFigma?.(item)}
              >
                Retry
              </Button>
            </>
          ) : (
            <Button
              className={styles.figmaBtn}
              appearance="secondary"
              size="small"
              icon={<ArrowExport16Regular />}
              onClick={() => onSendFigma?.(item)}
            >
              Send to Figma
            </Button>
          )}
        </div>
      )}

      {canShare && (
        <div
          className={styles.figmaWrap}
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          <Button
            className={styles.figmaBtn}
            appearance="secondary"
            size="small"
            icon={<Share16Regular />}
            onClick={() => setShareOpen(true)}
          >
            Share
          </Button>
        </div>
      )}

      {canShare && shareOpen && (
        <div onClick={(e) => e.stopPropagation()} role="presentation">
          <ShareDialog
            open={shareOpen}
            onClose={() => setShareOpen(false)}
            prototypeId={shareId}
            route={item.route || `/${shareId}`}
            title={item.title}
          />
        </div>
      )}

      {canViewHistory && (
        <div
          className={styles.figmaWrap}
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          <Button
            className={styles.figmaBtn}
            appearance="subtle"
            size="small"
            icon={<History16Regular />}
            onClick={() => setVersionOpen(true)}
          >
            History
          </Button>
        </div>
      )}

      {canViewHistory && versionOpen && (
        <div onClick={(e) => e.stopPropagation()} role="presentation">
          <VersionHistoryDialog
            open={versionOpen}
            onClose={() => setVersionOpen(false)}
            prototypeId={item.id}
            title={item.title}
          />
        </div>
      )}

      {canDelete && (
        <div
          className={styles.figmaWrap}
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          <Button
            className={styles.figmaBtn}
            appearance="subtle"
            size="small"
            icon={<Delete16Regular />}
            onClick={() => onDelete?.(item)}
          >
            Remove
          </Button>
        </div>
      )}

      <button
        type="button"
        className={styles.chevronBtn}
        onClick={open}
        aria-label={`Open ${item.title}`}
        title={`Open ${item.title}`}
      >
        <ArrowRight20Regular className={`${styles.chevron} protoChevron`} />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

function WorkspaceContent() {
  const styles = useStyles();
  const [query, setQuery] = useState("");
  const [localItems, setLocalItems] = useState<CardItem[]>([]);
  const [promotedItems, setPromotedItems] = useState<CardItem[]>([]);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [bridgeReady, setBridgeReady] = useState(false);

  // Per-card "Go Live" progress, keyed by prototype id.
  const [goLiveState, setGoLiveState] = useState<
    Record<string, { phase: "working" | "error"; detail?: string }>
  >({});

  // Per-card "Send to Figma" progress, keyed by prototype id.
  const [figmaState, setFigmaState] = useState<
    Record<string, { phase: "working" | "error" | "done"; detail?: string; link?: string }>
  >({});

  // Per-card report card (Test-stage checks), keyed by prototype id.
  const [reports, setReports] = useState<Record<string, ReportCard>>({});

  // Non-GitHub upload (drag-and-drop .html / .zip) state.
  const [dragActive, setDragActive] = useState(false);
  const [uploadState, setUploadState] = useState<
    { phase: "idle" } | { phase: "working"; name: string } | { phase: "error"; detail: string }
  >({ phase: "idle" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);

  const refreshLocal = useCallback(() => {
    loadLocalItems().then(setLocalItems);
  }, []);

  const uploadPrototype = useCallback(
    async (file: File, email: string | null) => {
      if (!/\.(html?|zip)$/i.test(file.name)) {
        setUploadState({
          phase: "error",
          detail: "Only .html and .zip files can be uploaded.",
        });
        return;
      }
      setUploadState({ phase: "working", name: file.name });
      try {
        const title = file.name.replace(/\.[a-z0-9]+$/i, "");
        const qs = new URLSearchParams({ filename: file.name, title });
        if (email) qs.set("by", email);
        const res = await fetch(
          `${BRIDGE_URL}/api/prototypes/upload?${qs.toString()}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/octet-stream" },
            body: file,
          },
        );
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.ok === false) {
          setUploadState({
            phase: "error",
            detail: data.error || `The bridge returned ${res.status}.`,
          });
          return;
        }
        setUploadState({ phase: "idle" });
        refreshLocal();
      } catch {
        setUploadState({
          phase: "error",
          detail: `Couldn't reach the local bridge at ${BRIDGE_URL}. Start it and try again.`,
        });
      }
    },
    [refreshLocal],
  );

  const deletePrototype = useCallback(
    async (item: CardItem) => {
      if (
        typeof window !== "undefined" &&
        !window.confirm(`Remove "${item.title}" from the workspace?`)
      ) {
        return;
      }
      try {
        await fetch(
          `${BRIDGE_URL}/api/prototypes/uploaded?id=${encodeURIComponent(item.id)}`,
          { method: "DELETE" },
        );
      } catch {
        /* bridge unreachable — refresh will show it still present */
      }
      refreshLocal();
    },
    [refreshLocal],
  );

  const onDrop = useCallback(
    (e: ReactDragEvent) => {
      e.preventDefault();
      dragDepth.current = 0;
      setDragActive(false);
      const file = e.dataTransfer?.files?.[0];
      if (file) void uploadPrototype(file, currentEmail);
    },
    [uploadPrototype, currentEmail],
  );

  const onDragOver = useCallback((e: ReactDragEvent) => {
    if (Array.from(e.dataTransfer?.types || []).includes("Files")) {
      e.preventDefault();
    }
  }, []);

  const onDragEnter = useCallback((e: ReactDragEvent) => {
    if (!Array.from(e.dataTransfer?.types || []).includes("Files")) return;
    dragDepth.current += 1;
    setDragActive(true);
  }, []);

  const onDragLeave = useCallback((e: ReactDragEvent) => {
    if (!Array.from(e.dataTransfer?.types || []).includes("Files")) return;
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setDragActive(false);
  }, []);

  useEffect(() => {
    loadLocalItems().then(setLocalItems);
    try {
      const account =
        msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];
      setCurrentEmail(account?.username ?? null);
    } catch {
      setCurrentEmail(null);
    }
    // Probe the local bridge — "Go Live" (git commit + push) only works when it's up.
    fetch(`${BRIDGE_URL}/api/health`, { cache: "no-store" })
      .then((r) => setBridgeReady(r.ok))
      .catch(() => setBridgeReady(false));
  }, []);

  const runGoLive = useCallback(async (item: CardItem) => {
    setGoLiveState((prev) => ({ ...prev, [item.id]: { phase: "working" } }));
    const setError = (detail: string) =>
      setGoLiveState((prev) => ({ ...prev, [item.id]: { phase: "error", detail } }));
    try {
      const res = await fetch(`${BRIDGE_URL}/api/prototypes/make-live`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) {
        setError(data.detail || data.error || `Bridge returned ${res.status}.`);
        return;
      }
      if (data.pushed === false) {
        setError(data.warning || "Committed locally, but push failed.");
        return;
      }
      // Success — seamlessly flip the card to Live and clear its progress.
      setLocalItems((prev) => prev.filter((p) => p.id !== item.id));
      setPromotedItems((prev) => [{ ...item, origin: "live" as const, hasLocalChanges: false }, ...prev]);
      setGoLiveState((prev) => {
        const next = { ...prev };
        delete next[item.id];
        return next;
      });
    } catch {
      setError(
        `Couldn't reach the local bridge at ${BRIDGE_URL}. Start it and try again.`,
      );
    }
  }, []);

  const runSendFigma = useCallback(async (item: CardItem) => {
    const setFig = (s: { phase: "working" | "error" | "done"; detail?: string; link?: string }) =>
      setFigmaState((prev) => ({ ...prev, [item.id]: s }));
    setFig({ phase: "working" });
    try {
      // Reuse the task's saved Figma file if any; otherwise prompt once.
      let figmaUrl: string | undefined;
      const tRes = await fetch(
        `${BRIDGE_URL}/api/figma/target?id=${encodeURIComponent(item.id)}`,
        { cache: "no-store" },
      );
      const tData = await tRes.json().catch(() => ({}));
      if (!tData?.target?.url) {
        const entered = window.prompt(
          "Paste the Figma file URL to send this prototype into.\n(Saved for this task and reused next time.)",
        );
        if (!entered) {
          setFigmaState((prev) => {
            const next = { ...prev };
            delete next[item.id];
            return next;
          });
          return;
        }
        figmaUrl = entered.trim();
      }

      const res = await fetch(`${BRIDGE_URL}/api/figma/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prototypeId: item.id, taskId: item.id, figmaUrl }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.jobId) {
        const detail = (data.needsPlugin || data.needsFigmaMcp)
          ? (data.hint || "Open the DesignLoop Figma plugin, then retry.")
          : data.error || `Bridge returned ${res.status}.`;
        setFig({ phase: "error", detail });
        return;
      }

      const fileLink: string | undefined = data.target?.url;
      // Stream job status; flip to done/error on the terminal event. The plugin
      // path returns a deep link (…?node-id=…) on the status payload once built.
      const es = new EventSource(`${BRIDGE_URL}/api/jobs/${data.jobId}/stream`);
      es.addEventListener("status", (ev) => {
        let status = "";
        let link: string | undefined;
        try {
          const parsed = JSON.parse((ev as MessageEvent).data) || {};
          status = parsed.status || "";
          link = parsed.link || undefined;
        } catch {
          /* ignore malformed */
        }
        if (status === "done") {
          es.close();
          setFig({ phase: "done", link: link || fileLink });
        } else if (status === "error" || status === "cancelled") {
          es.close();
          setFig({
            phase: "error",
            detail: status === "cancelled" ? "Cancelled" : "Send failed — check the bridge log.",
          });
        }
      });
      es.onerror = () => {
        es.close();
        setFig({ phase: "error", detail: "Lost connection to the bridge." });
      };
    } catch {
      setFig({
        phase: "error",
        detail: `Couldn't reach the local bridge at ${BRIDGE_URL}.`,
      });
    }
  }, []);
  const allItems = useMemo(
    () => [...localItems, ...promotedItems, ...LIVE_ITEMS],
    [localItems, promotedItems],
  );

  // Fetch each prototype's report card (Test-stage checks) once the bridge is up.
  useEffect(() => {
    if (!bridgeReady || allItems.length === 0) return;
    let cancelled = false;
    (async () => {
      for (const item of allItems) {
        if (reports[item.id]) continue;
        try {
          const r = await fetch(
            `${BRIDGE_URL}/api/report?id=${encodeURIComponent(item.id)}&kind=prototype`,
            { cache: "no-store" },
          );
          if (!r.ok) continue; // 404 = no task/report for this prototype
          const data: ReportCard = await r.json();
          if (cancelled) return;
          setReports((prev) => ({ ...prev, [item.id]: data }));
        } catch {
          /* bridge unreachable — skip silently */
        }
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bridgeReady, allItems]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter((p) => p.title.toLowerCase().includes(q));
  }, [query, allItems]);

  return (
    <div
      className={styles.container}
      onDragEnter={bridgeReady ? onDragEnter : undefined}
      onDragOver={bridgeReady ? onDragOver : undefined}
      onDragLeave={bridgeReady ? onDragLeave : undefined}
      onDrop={bridgeReady ? onDrop : undefined}
    >
      <div className={styles.gradientAccent} />

      <input
        ref={fileInputRef}
        type="file"
        accept=".html,.htm,.zip"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void uploadPrototype(file, currentEmail);
          e.target.value = "";
        }}
      />

      <div className={styles.content}>
        <div className={styles.header}>
          <Text className={styles.eyebrow}>Prototype Workspace</Text>
          <Text as="h1" className={styles.title}>
            Proto Loop
          </Text>
          <Text className={styles.subtitle}>
            Interactive Fluent prototypes generated across your design tasks.
            Open one to explore its screens, states, and flows.
          </Text>

        </div>

        <div className={styles.toolbar}>
          {allItems.length > 0 && (
            <SearchBox
              className={styles.searchBox}
              size="large"
              placeholder="Search prototypes by name"
              value={query}
              onChange={(_, data) => setQuery(data.value)}
              aria-label="Search prototypes by name"
            />
          )}
          {bridgeReady && (
            <Button
              appearance="secondary"
              icon={<ArrowUpload20Regular />}
              disabled={uploadState.phase === "working"}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload prototype
            </Button>
          )}
          {uploadState.phase === "working" && (
            <span className={styles.uploadStatus}>
              <Spinner size="tiny" />
              Uploading {uploadState.name}…
            </span>
          )}
          {uploadState.phase === "error" && (
            <span className={`${styles.uploadStatus} ${styles.uploadError}`}>
              {uploadState.detail}
            </span>
          )}
        </div>

        {allItems.length === 0 ? (
          <div className={styles.empty}>
            No prototypes yet. Generate one from a design task, or drag an HTML
            file or a .zip project here to add one.
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            No prototypes match &ldquo;{query}&rdquo;.
          </div>
        ) : (
          <div className={styles.list}>
            {filtered.map((p) => (
              <PrototypeCard
                key={p.id}
                item={p}
                currentEmail={currentEmail}
                onGoLive={bridgeReady ? runGoLive : undefined}
                goLiveState={goLiveState[p.id]}
                onSendFigma={bridgeReady ? runSendFigma : undefined}
                figmaState={figmaState[p.id]}
                report={reports[p.id]}
                onDelete={bridgeReady ? deletePrototype : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {dragActive && (
        <div className={styles.dropOverlay}>
          <div className={styles.dropInner}>
            <ArrowUpload24Regular className={styles.dropIcon} />
            <Text className={styles.dropTitle}>Drop to add a prototype</Text>
            <Text className={styles.dropHint}>
              An HTML file or a .zip of a static project
            </Text>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WorkspacePage() {
  return (
    <FluentProvider theme={webLightTheme}>
      <WorkspaceContent />
    </FluentProvider>
  );
}
