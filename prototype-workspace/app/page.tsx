"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@fluentui/react-components";
import {
  ArrowRight20Regular,
  CloudArrowUp16Regular,
} from "@fluentui/react-icons";
import { projects } from "../data/projects";
import liveExtras from "../data/live-prototypes.json";
import { msalInstance } from "../components/auth/auth-providers";

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
};

/** Shape of an entry in public/local-prototypes.json (all optional but id/title). */
type LocalPrototypeEntry = {
  id: string;
  title: string;
  description?: string;
  status?: string;
  author?: string;
  createdBy?: string;
  route?: string;
};

// ---------------------------------------------------------------------------
// Status maps + local prototype loading
// ---------------------------------------------------------------------------

const statusColorMap: Record<
  string,
  "success" | "brand" | "informative" | "warning" | "subtle"
> = {
  active: "success",
  "in-progress": "brand",
  "coming-soon": "warning",
  archived: "subtle",
};
const statusLabels: Record<string, string> = {
  active: "Active",
  "in-progress": "In progress",
  "coming-soon": "Coming soon",
  archived: "Archived",
};

/** Shape of an entry in data/live-prototypes.json (promoted prototypes). */
type LivePrototypeEntry = {
  id: string;
  title: string;
  description?: string;
  status?: string;
  author?: string;
  route?: string;
};

/** Live (repo baseline) prototypes as flat card items. */
const LIVE_ITEMS: CardItem[] = (() => {
  const fromRegistry: CardItem[] = projects.map((p) => ({
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
      sourceType: "local",
    }));
  const seen = new Set(fromRegistry.map((p) => p.id));
  return [...fromRegistry, ...fromPromoted.filter((p) => !seen.has(p.id))];
})();

/**
 * Fetch locally-created prototypes from public/local-prototypes.json.
 * The file is git-ignored and absent on the hosted site (→ no local items),
 * so everything hosted shows as "Live".
 */
async function loadLocalItems(): Promise<CardItem[]> {
  try {
    const res = await fetch("/local-prototypes.json", { cache: "no-store" });
    if (!res.ok) return [];
    const entries = (await res.json()) as LocalPrototypeEntry[];
    if (!Array.isArray(entries)) return [];
    return entries
      .filter((e) => e && e.id && e.title)
      .map((e) => ({
        id: e.id,
        title: e.title,
        description: e.description,
        status: e.status || "in-progress",
        author: e.author,
        createdBy: e.createdBy,
        origin: "local" as const,
        route: e.route || `/${e.id}`,
        sourceType: "local",
      }));
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
    cursor: "pointer",
    boxShadow: tokens.shadow2,
    transitionProperty: "transform, box-shadow, border-color, background-color",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: tokens.shadow8,
      borderColor: tokens.colorBrandStroke1,
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    ":hover .protoChevron": {
      transform: "translateX(4px)",
      color: tokens.colorBrandForeground1,
    },
    ":hover .makeLiveBtn": { opacity: 1 },
    ":focus-within .makeLiveBtn": { opacity: 1 },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorBrandStroke1}`,
      outlineOffset: "2px",
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
    color: tokens.colorNeutralForeground3,
  },
  youText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  chevron: {
    flexShrink: 0,
    color: tokens.colorNeutralForeground4,
    fontSize: "20px",
    transitionProperty: "transform, color",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
  },
  makeLiveBtn: {
    flexShrink: 0,
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: tokens.durationNormal,
  },
  makeLiveBtnVisible: {
    opacity: 1,
  },
  dialogText: {
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.5",
  },
  dialogCode: {
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground3,
    padding: `1px ${tokens.spacingHorizontalXS}`,
    borderRadius: tokens.borderRadiusSmall,
  },
  dialogStatus: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalM,
  },
  dialogError: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: tokens.fontSizeBase200,
    marginTop: tokens.spacingVerticalM,
    whiteSpace: "pre-wrap" as const,
  },
  empty: {
    padding: tokens.spacingVerticalXXXL,
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
    border: `1px dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
  },
});

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

function PrototypeCard({
  item,
  currentEmail,
  onMakeLive,
}: {
  item: CardItem;
  currentEmail: string | null;
  onMakeLive?: (item: CardItem) => void;
}) {
  const styles = useStyles();
  const router = useRouter();

  const open = useCallback(() => {
    if (item.sourceType === "fork" && item.deployUrl) {
      window.open(item.deployUrl, "_blank", "noopener");
    } else if (item.route) {
      router.push(item.route);
    }
  }, [item, router]);

  const isMine =
    !!currentEmail &&
    !!item.createdBy &&
    item.createdBy.toLowerCase() === currentEmail.toLowerCase();

  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
    >
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
          <Badge
            appearance="tint"
            size="small"
            color={statusColorMap[item.status] ?? "informative"}
          >
            {statusLabels[item.status] ?? item.status}
          </Badge>
        </div>

        {item.description && (
          <Text className={styles.cardDesc}>{item.description}</Text>
        )}

        {(isMine || item.author) && (
          <div className={styles.metaRow}>
            {isMine ? (
              <Text className={styles.youText}>Created by you</Text>
            ) : (
              <Text className={styles.authorText}>By {item.author}</Text>
            )}
          </div>
        )}
      </div>

      {onMakeLive && item.origin === "local" && (
        <Button
          className={`${styles.makeLiveBtn} makeLiveBtn`}
          appearance="subtle"
          size="small"
          icon={<CloudArrowUp16Regular />}
          onClick={(e) => {
            e.stopPropagation();
            onMakeLive(item);
          }}
        >
          Make live
        </Button>
      )}

      <ArrowRight20Regular className={`${styles.chevron} protoChevron`} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

type PromotePhase = "confirm" | "working" | "done" | "error";

function WorkspaceContent() {
  const styles = useStyles();
  const [query, setQuery] = useState("");
  const [localItems, setLocalItems] = useState<CardItem[]>([]);
  const [promotedItems, setPromotedItems] = useState<CardItem[]>([]);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [bridgeReady, setBridgeReady] = useState(false);

  // Make-live dialog state.
  const [target, setTarget] = useState<CardItem | null>(null);
  const [phase, setPhase] = useState<PromotePhase>("confirm");
  const [errorDetail, setErrorDetail] = useState("");

  useEffect(() => {
    loadLocalItems().then(setLocalItems);
    try {
      const account =
        msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];
      setCurrentEmail(account?.username ?? null);
    } catch {
      setCurrentEmail(null);
    }
    // Probe the local bridge — "Make live" (git commit + push) only works when it's up.
    fetch(`${BRIDGE_URL}/api/health`, { cache: "no-store" })
      .then((r) => setBridgeReady(r.ok))
      .catch(() => setBridgeReady(false));
  }, []);

  const openPromote = useCallback((item: CardItem) => {
    setTarget(item);
    setPhase("confirm");
    setErrorDetail("");
  }, []);

  const runPromote = useCallback(async () => {
    if (!target) return;
    setPhase("working");
    try {
      const res = await fetch(`${BRIDGE_URL}/api/prototypes/make-live`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: target.id }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) {
        setErrorDetail(data.detail || data.error || `Bridge returned ${res.status}.`);
        setPhase("error");
        return;
      }
      // Flip the card to Live locally so the change is reflected immediately.
      setLocalItems((prev) => prev.filter((p) => p.id !== target.id));
      setPromotedItems((prev) => [
        { ...target, origin: "live" as const },
        ...prev,
      ]);
      if (data.pushed === false) {
        setErrorDetail(data.warning || "Committed locally, but push failed.");
        setPhase("error");
        return;
      }
      setPhase("done");
    } catch {
      setErrorDetail(
        `Could not reach the local bridge at ${BRIDGE_URL}. Start it and try again.`,
      );
      setPhase("error");
    }
  }, [target]);

  // Local prototypes first, then promoted (session), then live baseline.
  const allItems = useMemo(
    () => [...localItems, ...promotedItems, ...LIVE_ITEMS],
    [localItems, promotedItems],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allItems;
    return allItems.filter((p) => p.title.toLowerCase().includes(q));
  }, [query, allItems]);

  return (
    <div className={styles.container}>
      <div className={styles.gradientAccent} />

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

        {allItems.length === 0 ? (
          <div className={styles.empty}>
            No prototypes yet. Generate one from a design task and it will appear
            here.
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
                onMakeLive={bridgeReady ? openPromote : undefined}
              />
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={!!target}
        onOpenChange={(_, data) => {
          if (!data.open && phase !== "working") setTarget(null);
        }}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>
              {phase === "done" ? "Prototype is live" : "Make prototype live"}
            </DialogTitle>
            <DialogContent>
              {phase === "confirm" && (
                <Text className={styles.dialogText}>
                  This commits <span className={styles.dialogCode}>{target?.id}</span>{" "}
                  and pushes it to the repository, making it visible to everyone as
                  a Live prototype. Continue?
                </Text>
              )}
              {phase === "working" && (
                <div className={styles.dialogStatus}>
                  <Spinner size="tiny" />
                  <Text className={styles.dialogText}>
                    Committing and pushing to the repository…
                  </Text>
                </div>
              )}
              {phase === "done" && (
                <Text className={styles.dialogText}>
                  <span className={styles.dialogCode}>{target?.id}</span> was pushed
                  to the repo. It now appears as Live for everyone once the hosted
                  workspace redeploys.
                </Text>
              )}
              {phase === "error" && (
                <>
                  <Text className={styles.dialogText}>
                    Couldn&rsquo;t fully make this prototype live.
                  </Text>
                  <Text as="p" className={styles.dialogError}>
                    {errorDetail}
                  </Text>
                </>
              )}
            </DialogContent>
            <DialogActions>
              {phase === "confirm" && (
                <>
                  <Button appearance="secondary" onClick={() => setTarget(null)}>
                    Cancel
                  </Button>
                  <Button
                    appearance="primary"
                    icon={<CloudArrowUp16Regular />}
                    onClick={runPromote}
                  >
                    Make live
                  </Button>
                </>
              )}
              {phase === "working" && (
                <Button appearance="primary" disabled>
                  Working…
                </Button>
              )}
              {(phase === "done" || phase === "error") && (
                <Button appearance="primary" onClick={() => setTarget(null)}>
                  Close
                </Button>
              )}
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
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
