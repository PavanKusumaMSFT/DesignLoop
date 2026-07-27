"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  makeStyles,
  mergeClasses,
  shorthands,
  tokens as fluentTokens,
  FluentProvider,
  webLightTheme,
  Button,
  Textarea,
  Input,
  Field,
  Card,
  Text,
  Badge,
  Avatar,
  Spinner,
  Switch,
  Tooltip,
  OverlayDrawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
} from "@fluentui/react-components";
import {
  Comment24Regular,
  Comment24Filled,
  Dismiss20Regular,
  Dismiss24Regular,
  Send20Filled,
  CheckmarkCircle20Regular,
  ArrowUndo20Regular,
  Delete20Regular,
  Cursor20Regular,
  Cursor16Regular,
  Comment20Filled,
  Comment16Filled,
} from "@fluentui/react-icons";
import {
  type FeedbackAnchor,
  type FeedbackComment,
  type FeedbackContext,
  captureAnchor,
  createFeedback,
  deleteFeedback,
  getStoredName,
  isFeedbackUi,
  listFeedback,
  locateAnchor,
  storeName,
  updateFeedback,
} from "@/lib/feedback";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const Z = {
  overlay: 2147482000,
  pins: 2147482100,
  popover: 2147483000,
  toolbar: 2147483200,
};

/* --------------------------------------------------------------- styles */

const useStyles = makeStyles({
  // A themed host for portaled UI. `display: contents` means it paints no
  // box (no background, no layout impact) yet still supplies Fluent theme
  // CSS custom properties + font family to all descendants via inheritance.
  portalProvider: {
    display: "contents",
  },
  captureOverlay: {
    position: "fixed",
    ...shorthands.inset(0),
    zIndex: Z.overlay,
    cursor: "crosshair",
    backgroundColor: "rgba(0,120,212,0.04)",
  },
  captureHint: {
    position: "fixed",
    top: "16px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: Z.toolbar,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalL),
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralForeground1,
    color: tokens.colorNeutralBackground1,
    fontSize: tokens.fontSizeBase300,
    boxShadow: tokens.shadow16,
  },
  pinsRoot: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    zIndex: Z.pins,
    pointerEvents: "none",
  },
  pin: {
    position: "absolute",
    width: "28px",
    height: "28px",
    marginLeft: "-4px",
    marginTop: "-24px",
    borderRadius: "50% 50% 50% 2px",
    ...shorthands.border("2px", "solid", tokens.colorNeutralBackground1),
    backgroundColor: "#0078D4",
    color: "#ffffff",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    pointerEvents: "auto",
    boxShadow: tokens.shadow8,
    transition: "transform 120ms ease",
    ":hover": { transform: "scale(1.12)" },
  },
  pinResolved: { backgroundColor: tokens.colorPaletteGreenBackground3 },
  pinActive: {
    transform: "scale(1.15)",
    boxShadow: `0 0 0 3px ${tokens.colorBrandBackground2}, ${tokens.shadow16}`,
  },
  draftDot: {
    position: "absolute",
    width: "14px",
    height: "14px",
    marginLeft: "-7px",
    marginTop: "-7px",
    borderRadius: "50%",
    backgroundColor: "#0078D4",
    ...shorthands.border("2px", "solid", tokens.colorNeutralBackground1),
    boxShadow: tokens.shadow8,
    pointerEvents: "none",
  },
  popover: {
    position: "fixed",
    zIndex: Z.popover,
    width: "340px",
    maxWidth: "92vw",
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    boxShadow: tokens.shadow64,
    borderRadius: tokens.borderRadiusXLarge,
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    backgroundColor: tokens.colorNeutralBackground1,
  },
  popoverTitle: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    color: tokens.colorNeutralForeground1,
  },
  popoverTitleIcon: {
    color: tokens.colorBrandForeground1,
    display: "inline-flex",
  },
  rowBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalS,
  },
  anchorLabel: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    alignSelf: "flex-start",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground2,
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.padding(tokens.spacingVerticalXXS, tokens.spacingHorizontalS),
    borderRadius: tokens.borderRadiusMedium,
    maxWidth: "100%",
    ...shorthands.overflow("hidden"),
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  composerActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalS,
  },
  thread: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    maxHeight: "46vh",
    overflowY: "auto",
  },
  commentBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  authorName: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  timeText: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground4,
  },
  bodyText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  replyBlock: {
    marginLeft: tokens.spacingHorizontalL,
    paddingLeft: tokens.spacingHorizontalS,
    ...shorthands.borderLeft("2px", "solid", tokens.colorNeutralStroke2),
    display: "flex",
    flexDirection: "column",
    gap: "1px",
  },
  toolbar: {
    position: "fixed",
    right: "20px",
    bottom: "20px",
    zIndex: Z.toolbar,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: tokens.spacingVerticalS,
  },
  fab: {
    borderRadius: tokens.borderRadiusCircular,
    boxShadow: tokens.shadow16,
    minWidth: "auto",
  },
  countBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  togglePill: {
    display: "inline-flex",
    alignItems: "center",
    ...shorthands.padding(tokens.spacingVerticalXXS, tokens.spacingHorizontalM),
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusCircular,
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    boxShadow: tokens.shadow8,
  },
  panelItem: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    padding: tokens.spacingVerticalS,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke2),
    ":hover": { backgroundColor: tokens.colorNeutralBackground2 },
  },
  panelItemActive: {
    ...shorthands.borderColor(tokens.colorBrandStroke1),
    backgroundColor: tokens.colorBrandBackground2,
  },
  panelList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  empty: {
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
    padding: tokens.spacingVerticalXXL,
    fontSize: tokens.fontSizeBase300,
  },
});

/* --------------------------------------------------------------- helpers */

function relTime(iso?: string | null): string {
  if (!iso) return "";
  const t = new Date(iso).getTime();
  if (isNaN(t)) return "";
  const diff = Date.now() - t;
  if (diff < 60000) return "just now";
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

/** Clamp a desired popover position into the viewport. */
function clampToViewport(x: number, y: number, w = 320, h = 260) {
  const pad = 12;
  const maxX = window.innerWidth - w - pad;
  const maxY = window.innerHeight - h - pad;
  return {
    left: Math.max(pad, Math.min(x, maxX)),
    top: Math.max(pad, Math.min(y, maxY)),
  };
}

/* --------------------------------------------------------------- props */

export interface FeedbackLayerProps {
  prototypeId: string;
  /** The current route path (e.g. "/azure-home-page"). */
  route: string;
  context: FeedbackContext;
}

interface Draft {
  anchor: FeedbackAnchor;
  /** viewport coords of the click, for composer placement */
  vx: number;
  vy: number;
}

/* --------------------------------------------------------------- main */

export default function FeedbackLayer({
  prototypeId,
  route,
  context,
}: FeedbackLayerProps) {
  const styles = useStyles();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState(false); // comment (placing) mode
  const [comments, setComments] = useState<FeedbackComment[]>([]);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [draft, setDraft] = useState<Draft | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [pinsHidden, setPinsHidden] = useState(false); // toggle pin visibility
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const page = useMemo(() => route || "/", [route]);

  useEffect(() => {
    setMounted(true);
    if (context.kind === "internal") {
      setName(context.email || "Reviewer");
    } else {
      setName(getStoredName());
    }
  }, [context]);

  /* ---- load comments ---- */
  const reload = useCallback(async () => {
    try {
      setLoading(true);
      const list = await listFeedback(prototypeId, page, context);
      setComments(list);
    } catch {
      /* bridge/API offline — feedback simply stays empty */
    } finally {
      setLoading(false);
    }
  }, [prototypeId, page, context]);

  useEffect(() => {
    if (!mounted) return;
    reload();
  }, [mounted, reload]);

  /* ---- pin numbering (stable, by creation order) ---- */
  const numberById = useMemo(() => {
    const sorted = [...comments].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
    const map: Record<string, number> = {};
    sorted.forEach((c, i) => (map[c.id] = i + 1));
    return map;
  }, [comments]);

  /* ---- position pins (document coords; recompute on layout changes) ---- */
  const recompute = useCallback(() => {
    const next: Record<string, { x: number; y: number }> = {};
    for (const c of comments) next[c.id] = locateAnchor(c.anchor);
    setPositions(next);
  }, [comments]);

  useEffect(() => {
    if (!mounted) return;
    recompute();
    const timers = [150, 500, 1200].map((d) => setTimeout(recompute, d));
    window.addEventListener("resize", recompute);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(recompute);
      ro.observe(document.body);
    }
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", recompute);
      if (ro) ro.disconnect();
    };
  }, [mounted, recompute]);

  /* ---- Esc exits comment mode / closes popovers ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMode(false);
        setDraft(null);
        setActiveId(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ---- capture a click while in comment mode ---- */
  const onCaptureClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const overlay = overlayRef.current;
    if (!overlay) return;
    const cx = e.clientX;
    const cy = e.clientY;
    overlay.style.pointerEvents = "none";
    const el = document.elementFromPoint(cx, cy);
    overlay.style.pointerEvents = "";
    if (!el || isFeedbackUi(el)) return;
    const anchor = captureAnchor(el, cx, cy);
    setDraft({ anchor, vx: cx, vy: cy });
    setActiveId(null);
    setMode(false); // one comment per activation; toolbar re-enables
  }, []);

  /* ---- create / reply / resolve / delete ---- */
  const submitNew = useCallback(
    async (text: string, authorName: string) => {
      if (!draft) return;
      if (context.kind === "external") storeName(authorName);
      setName(authorName);
      const created = await createFeedback(
        {
          prototypeId,
          route,
          page,
          author: authorName,
          text,
          anchor: draft.anchor,
        },
        context,
      );
      setComments((cs) => [...cs, created]);
      setDraft(null);
      setActiveId(created.id);
    },
    [draft, prototypeId, route, page, context],
  );

  const addReply = useCallback(
    async (id: string, text: string) => {
      const updated = await updateFeedback(
        { prototypeId, id, reply: { author: name, text } },
        context,
      );
      setComments((cs) => cs.map((c) => (c.id === id ? updated : c)));
    },
    [prototypeId, name, context],
  );

  const toggleResolve = useCallback(
    async (c: FeedbackComment) => {
      const updated = await updateFeedback(
        {
          prototypeId,
          id: c.id,
          status: c.status === "resolved" ? "open" : "resolved",
          resolvedBy: name,
        },
        context,
      );
      setComments((cs) => cs.map((x) => (x.id === c.id ? updated : x)));
    },
    [prototypeId, name, context],
  );

  const remove = useCallback(
    async (id: string) => {
      await deleteFeedback(prototypeId, id, context);
      setComments((cs) => cs.filter((c) => c.id !== id));
      setActiveId(null);
    },
    [prototypeId, context],
  );

  const scrollToComment = useCallback(
    (c: FeedbackComment) => {
      const p = positions[c.id] || locateAnchor(c.anchor);
      window.scrollTo({
        top: Math.max(0, p.y - window.innerHeight / 2),
        behavior: "smooth",
      });
      setActiveId(c.id);
      setPanelOpen(false);
    },
    [positions],
  );

  if (!mounted) return null;

  const openCount = comments.filter((c) => c.status !== "resolved").length;
  const activeComment = comments.find((c) => c.id === activeId) || null;

  return (
    <div data-feedback-ui="1">
      {createPortal(
        <FluentProvider
          theme={webLightTheme}
          className={styles.portalProvider}
          data-feedback-ui="1"
        >
          {/* capture overlay */}
          {mode && (
            <>
              <div
                ref={overlayRef}
                className={styles.captureOverlay}
                onClick={onCaptureClick}
                data-feedback-ui="1"
              />
              <div className={styles.captureHint} data-feedback-ui="1">
                <Cursor20Regular />
                Click anywhere on the prototype to leave a comment · Esc to cancel
              </div>
            </>
          )}

          {/* pins */}
          <div className={styles.pinsRoot} data-feedback-ui="1">
            {!pinsHidden &&
              comments.map((c) => {
                const p = positions[c.id];
                if (!p) return null;
                return (
                  <button
                    key={c.id}
                    className={mergeClasses(
                      styles.pin,
                      c.status === "resolved" && styles.pinResolved,
                      activeId === c.id && styles.pinActive,
                    )}
                    style={{ left: `${p.x}px`, top: `${p.y}px` }}
                    onClick={() => setActiveId(activeId === c.id ? null : c.id)}
                    aria-label={`Comment ${numberById[c.id]} by ${c.author}`}
                    data-feedback-ui="1"
                  >
                    {c.status === "resolved" ? (
                      <Comment16Filled />
                    ) : (
                      numberById[c.id]
                    )}
                  </button>
                );
              })}
            {draft &&
              (() => {
                const p = locateAnchor(draft.anchor);
                return (
                  <div
                    className={styles.draftDot}
                    style={{ left: `${p.x}px`, top: `${p.y}px` }}
                    data-feedback-ui="1"
                  />
                );
              })()}
          </div>

          {/* composer for a new comment */}
          {draft && (
            <Composer
              styles={styles}
              draft={draft}
              defaultName={name}
              needName={context.kind === "external"}
              onCancel={() => setDraft(null)}
              onSubmit={submitNew}
            />
          )}

          {/* thread popover for the active pin */}
          {!pinsHidden && activeComment && positions[activeComment.id] && (
            <Thread
              styles={styles}
              comment={activeComment}
              number={numberById[activeComment.id]}
              pos={positions[activeComment.id]}
              canModerate={context.kind === "internal"}
              onClose={() => setActiveId(null)}
              onReply={addReply}
              onToggleResolve={toggleResolve}
              onDelete={remove}
            />
          )}

          {/* floating toolbar */}
          <div className={styles.toolbar} data-feedback-ui="1">
            {comments.length > 0 && (
              <div className={styles.togglePill} data-feedback-ui="1">
                <Switch
                  checked={!pinsHidden}
                  label={pinsHidden ? "Show comments" : "Hide comments"}
                  onChange={(_, d) => {
                    setPinsHidden(!d.checked);
                    if (!d.checked) setActiveId(null);
                  }}
                />
              </div>
            )}
            {comments.length > 0 && !pinsHidden && (
              <Button
                className={styles.fab}
                appearance="secondary"
                icon={<Comment24Regular />}
                onClick={() => setPanelOpen(true)}
              >
                <span className={styles.countBadge}>
                  Comments
                  <Badge appearance="filled" color="informative">
                    {comments.length}
                  </Badge>
                </span>
              </Button>
            )}
            <Tooltip
              content={mode ? "Cancel commenting" : "Add a comment"}
              relationship="label"
            >
              <Button
                className={styles.fab}
                appearance={mode ? "outline" : "primary"}
                size="large"
                icon={mode ? <Dismiss24Regular /> : <Comment24Filled />}
                onClick={() => {
                  setDraft(null);
                  setActiveId(null);
                  setMode((m) => !m);
                }}
              >
                {mode
                  ? "Cancel"
                  : openCount > 0
                    ? `Comment · ${openCount} open`
                    : "Comment"}
              </Button>
            </Tooltip>
          </div>
        </FluentProvider>,
        document.body,
      )}

      {/* side panel */}
      <OverlayDrawer
        position="end"
        open={panelOpen}
        onOpenChange={(_, d) => setPanelOpen(d.open)}
        data-feedback-ui="1"
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                icon={<Dismiss24Regular />}
                aria-label="Close"
                onClick={() => setPanelOpen(false)}
              />
            }
          >
            Feedback ({comments.length})
          </DrawerHeaderTitle>
        </DrawerHeader>
        <DrawerBody>
          {loading && <Spinner size="tiny" label="Loading…" />}
          {!loading && comments.length === 0 && (
            <div className={styles.empty}>
              No comments yet. Use the Comment button, then click any part of the
              prototype to leave feedback.
            </div>
          )}
          <div className={styles.panelList}>
            {[...comments]
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .map((c) => (
                <div
                  key={c.id}
                  className={mergeClasses(
                    styles.panelItem,
                    activeId === c.id && styles.panelItemActive,
                  )}
                  onClick={() => scrollToComment(c)}
                >
                  <div className={styles.rowBetween}>
                    <div className={styles.metaRow}>
                      <Avatar size={20} name={c.author} />
                      <Text className={styles.authorName}>{c.author}</Text>
                      <Badge
                        size="small"
                        appearance="tint"
                        color={c.status === "resolved" ? "success" : "informative"}
                      >
                        {c.status === "resolved"
                          ? "Resolved"
                          : `#${numberById[c.id]}`}
                      </Badge>
                    </div>
                    <Text className={styles.timeText}>{relTime(c.createdAt)}</Text>
                  </div>
                  <span className={styles.anchorLabel}>
                    <Cursor16Regular />
                    {c.anchor.label}
                  </span>
                  <Text className={styles.bodyText}>{c.text}</Text>
                  {c.replies.length > 0 && (
                    <Text className={styles.timeText}>
                      {c.replies.length} repl
                      {c.replies.length === 1 ? "y" : "ies"}
                    </Text>
                  )}
                </div>
              ))}
          </div>
        </DrawerBody>
      </OverlayDrawer>
    </div>
  );
}

/* --------------------------------------------------------------- Composer */

function Composer({
  styles,
  draft,
  defaultName,
  needName,
  onCancel,
  onSubmit,
}: {
  styles: ReturnType<typeof useStyles>;
  draft: Draft;
  defaultName: string;
  needName: boolean;
  onCancel: () => void;
  onSubmit: (text: string, name: string) => Promise<void>;
}) {
  const [text, setText] = useState("");
  const [who, setWho] = useState(defaultName);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const pos = clampToViewport(draft.vx + 14, draft.vy + 14);

  const submit = async () => {
    if (!text.trim()) return;
    if (needName && !who.trim()) {
      setErr("Please add your name so the team knows who left this.");
      return;
    }
    setBusy(true);
    setErr("");
    try {
      await onSubmit(text.trim(), (who || defaultName || "Anonymous").trim());
    } catch (e: any) {
      setErr(e?.message || "Could not save comment.");
      setBusy(false);
    }
  };

  return (
    <Card
      className={styles.popover}
      style={{ left: pos.left, top: pos.top }}
      data-feedback-ui="1"
    >
      <div className={styles.rowBetween}>
        <span className={styles.popoverTitle}>
          <span className={styles.popoverTitleIcon}>
            <Comment20Filled />
          </span>
          <Text weight="semibold">New comment</Text>
        </span>
        <Button
          appearance="subtle"
          size="small"
          icon={<Dismiss20Regular />}
          aria-label="Cancel"
          onClick={onCancel}
        />
      </div>
      <span className={styles.anchorLabel}>
        <Cursor16Regular />
        {draft.anchor.label}
      </span>
      {needName && !defaultName && (
        <Field label="Your name" required>
          <Input
            value={who}
            onChange={(_, d) => setWho(d.value)}
            placeholder="e.g. Alex Participant"
          />
        </Field>
      )}
      <Textarea
        value={text}
        onChange={(_, d) => setText(d.value)}
        placeholder="What's your feedback on this?"
        resize="vertical"
        rows={3}
      />
      {err && (
        <Text size={200} style={{ color: tokens.colorPaletteRedForeground1 }}>
          {err}
        </Text>
      )}
      <div className={styles.composerActions}>
        <Button
          appearance="secondary"
          size="small"
          onClick={onCancel}
          disabled={busy}
        >
          Cancel
        </Button>
        <Button
          appearance="primary"
          size="small"
          icon={busy ? <Spinner size="tiny" /> : <Send20Filled />}
          onClick={submit}
          disabled={busy || !text.trim()}
        >
          Post
        </Button>
      </div>
    </Card>
  );
}

/* ----------------------------------------------------------------- Thread */

function Thread({
  styles,
  comment,
  number,
  pos,
  canModerate,
  onClose,
  onReply,
  onToggleResolve,
  onDelete,
}: {
  styles: ReturnType<typeof useStyles>;
  comment: FeedbackComment;
  number: number;
  pos: { x: number; y: number };
  canModerate: boolean;
  onClose: () => void;
  onReply: (id: string, text: string) => Promise<void>;
  onToggleResolve: (c: FeedbackComment) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  // pin document coords → viewport coords for a fixed popover
  const vx = pos.x - window.scrollX;
  const vy = pos.y - window.scrollY;
  const p = clampToViewport(vx + 18, vy - 10, 320, 320);

  const sendReply = async () => {
    if (!reply.trim()) return;
    setBusy(true);
    try {
      await onReply(comment.id, reply.trim());
      setReply("");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card
      className={styles.popover}
      style={{ left: p.left, top: p.top }}
      data-feedback-ui="1"
    >
      <div className={styles.rowBetween}>
        <div className={styles.metaRow}>
          <Badge
            appearance="filled"
            color={comment.status === "resolved" ? "success" : "brand"}
          >
            #{number}
          </Badge>
          <Text weight="semibold">
            {comment.status === "resolved" ? "Resolved" : "Comment"}
          </Text>
        </div>
        <Button
          appearance="subtle"
          size="small"
          icon={<Dismiss20Regular />}
          aria-label="Close"
          onClick={onClose}
        />
      </div>
      <span className={styles.anchorLabel}>
        <Cursor16Regular />
        {comment.anchor.label}
      </span>

      <div className={styles.thread}>
        <div className={styles.commentBlock}>
          <div className={styles.metaRow}>
            <Avatar size={20} name={comment.author} />
            <Text className={styles.authorName}>{comment.author}</Text>
            <Text className={styles.timeText}>{relTime(comment.createdAt)}</Text>
          </div>
          <Text className={styles.bodyText}>{comment.text}</Text>
        </div>
        {comment.replies.map((r, i) => (
          <div key={i} className={styles.replyBlock}>
            <div className={styles.metaRow}>
              <Text className={styles.authorName}>{r.author}</Text>
              <Text className={styles.timeText}>{relTime(r.at)}</Text>
            </div>
            <Text className={styles.bodyText}>{r.text}</Text>
          </div>
        ))}
      </div>

      <Textarea
        value={reply}
        onChange={(_, d) => setReply(d.value)}
        placeholder="Reply…"
        resize="vertical"
        rows={2}
      />
      <div className={styles.rowBetween}>
        <div className={styles.metaRow}>
          <Button
            appearance="subtle"
            size="small"
            icon={
              comment.status === "resolved" ? (
                <ArrowUndo20Regular />
              ) : (
                <CheckmarkCircle20Regular />
              )
            }
            onClick={() => onToggleResolve(comment)}
          >
            {comment.status === "resolved" ? "Reopen" : "Resolve"}
          </Button>
          {canModerate && (
            <Tooltip content="Delete" relationship="label">
              <Button
                appearance="subtle"
                size="small"
                icon={<Delete20Regular />}
                onClick={() => onDelete(comment.id)}
                aria-label="Delete comment"
              />
            </Tooltip>
          )}
        </div>
        <Button
          appearance="primary"
          size="small"
          icon={busy ? <Spinner size="tiny" /> : <Send20Filled />}
          onClick={sendReply}
          disabled={busy || !reply.trim()}
        >
          Reply
        </Button>
      </div>
    </Card>
  );
}
