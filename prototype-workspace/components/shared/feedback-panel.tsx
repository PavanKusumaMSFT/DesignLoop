"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Textarea,
  Avatar,
  Input,
  Field,
  Divider,
  Badge,
  OverlayDrawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
  DrawerFooter,
  mergeClasses,
  Dropdown,
  Option,
} from "@fluentui/react-components";
import {
  CommentNote20Filled,
  Send20Filled,
  ThumbLike20Regular,
  ThumbLike20Filled,
  ThumbDislike20Regular,
  ThumbDislike20Filled,
  Dismiss20Regular,
  CommentAdd20Regular,
  Edit20Regular,
  Delete20Regular,
  Image20Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

/* ── Data model ──────────────────────────── */

interface FeedbackReply {
  id: string;
  author: string;
  message: string;
  timestamp: number;
  likes: string[];
  dislikes: string[];
}

interface FeedbackComment {
  id: string;
  pageId: string;
  author: string;
  message: string;
  timestamp: number;
  likes: string[];
  dislikes: string[];
  resolved: boolean;
  replies: FeedbackReply[];
  tag?: FeedbackTag;
  images?: string[];
}

type FeedbackTag = "Design" | "Content" | "Research" | "Product" | "Developer" | "General";

const TAG_COLORS: Record<FeedbackTag, { bg: string; fg: string }> = {
  Design:    { bg: "#FFF4CE", fg: "#835C00" },
  Content:   { bg: "#FCE4EC", fg: "#880E4F" },
  Research:  { bg: "#E3F2FD", fg: "#0D47A1" },
  Product:   { bg: "#EDE7F6", fg: "#4A148C" },
  Developer: { bg: "#E8F5E9", fg: "#1B5E20" },
  General:   { bg: "#F5F5F5", fg: "#424242" },
};

const ALL_TAGS: FeedbackTag[] = ["Design", "Content", "Research", "Product", "Developer", "General"];

const ADMIN_USERS = ["Arturo", "arturo", "Arturo Benito", "arturo benito"];

export type PageStatus = "Not applicable" | "Not started" | "In progress" | "Ready for review" | "In review" | "Done";

const STATUS_COLORS: Record<PageStatus, { bg: string; fg: string; icon?: string }> = {
  "Not applicable": { bg: "#F0F0F0", fg: "#333" },
  "Not started":    { bg: "#F0F0F0", fg: "#333" },
  "In progress":    { bg: "#E8E8E8", fg: "#000" },
  "Ready for review": { bg: "#E0E0E0", fg: "#000" },
  "In review":      { bg: "#D0D0D0", fg: "#000" },
  "Done":           { bg: "#333", fg: "#fff", icon: "✓" },
};

const EMOJI_CATEGORIES: { label: string; emojis: string[] }[] = [
  { label: "Reactions", emojis: ["👍", "👎", "👏", "🙌", "🔥", "💯", "❤️", "😍", "🎉", "✅", "❌", "⚠️", "💡", "🤔", "😊", "😂"] },
  { label: "Work", emojis: ["🚀", "🎯", "📌", "📎", "🔧", "🐛", "💬", "📝", "📊", "🔍", "⭐", "💪", "🏗️", "✨", "📦", "🧪"] },
  { label: "Status", emojis: ["🟢", "🟡", "🔴", "🔵", "⏳", "🚧", "🛑", "🔒", "🔓", "📢", "🏁", "🎨", "💻", "📱", "☁️", "⚙️"] },
];

type FilterMode = "all" | "resolved" | "newest" | "mentions";

/* ── Persistence helpers ─────────────────── */

const STORAGE_KEY = "azure-poc-feedback";
const USER_KEY = "feedbackUserName";

function loadFeedback(pageId: string): FeedbackComment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const all: FeedbackComment[] = JSON.parse(raw);
    return all.filter((c) => c.pageId === pageId);
  } catch {
    return [];
  }
}

function saveFeedbackAll(comments: FeedbackComment[], pageId: string) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing: FeedbackComment[] = raw ? JSON.parse(raw) : [];
    const other = existing.filter((c) => c.pageId !== pageId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...other, ...comments]));
  } catch {
    /* noop */
  }
}

function loadUserName(): string {
  try {
    return localStorage.getItem(USER_KEY) || "";
  } catch {
    return "";
  }
}

function loadAllFeedbackCounts(): Record<string, number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const all: FeedbackComment[] = JSON.parse(raw);
    const counts: Record<string, number> = {};
    for (const c of all) {
      if (!c.resolved) counts[c.pageId] = (counts[c.pageId] || 0) + 1;
    }
    return counts;
  } catch {
    return {};
  }
}

/** Returns the total comment count for a given pageId from localStorage (excludes resolved). */
export function getCommentCount(pageId: string): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const all: FeedbackComment[] = JSON.parse(raw);
    return all.filter((c) => c.pageId === pageId && !c.resolved).length;
  } catch {
    return 0;
  }
}

/** Returns total comment count across all pages matching a prefix (excludes resolved). */
export function getCommentCountByPrefix(prefix: string): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const all: FeedbackComment[] = JSON.parse(raw);
    return all.filter((c) => c.pageId.startsWith(prefix) && !c.resolved).length;
  } catch {
    return 0;
  }
}

function saveUserName(name: string) {
  try {
    localStorage.setItem(USER_KEY, name);
  } catch {
    /* noop */
  }
}

function loadAllUsers(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const all: FeedbackComment[] = JSON.parse(raw);
    const names = new Set<string>();
    for (const c of all) {
      names.add(c.author);
      for (const r of c.replies) names.add(r.author);
    }
    return Array.from(names).sort();
  } catch {
    return [];
  }
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  const d = new Date(ts);
  const date = d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  const time = d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  const stamp = `${date}, ${time}`;
  if (mins < 1) return `just now · ${stamp}`;
  if (mins < 60) return `${mins}m ago · ${stamp}`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago · ${stamp}`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago · ${stamp}`;
}

/* ── Styles ──────────────────────────────── */

const useStyles = makeStyles({
  fab: {
    position: "fixed",
    bottom: "80px",
    right: "24px",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    backgroundColor: "#F2C811",
    color: "#1a1a1a",
    border: "none",
    borderRadius: tokens.borderRadiusXLarge,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    cursor: "pointer",
    boxShadow: tokens.shadow8,
    transitionDuration: tokens.durationNormal,
    transitionProperty: "transform, box-shadow",
    ":hover": {
      transform: "scale(1.04)",
      boxShadow: tokens.shadow16,
    },
    ":active": {
      transform: "scale(0.97)",
    },
  },
  fabBadge: {
    position: "absolute",
    top: "-6px",
    right: "-6px",
  },

  /* ── Name prompt ── */
  namePrompt: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalL,
    textAlign: "center",
  },

  /* ── Panel ── */
  panelBody: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalL,
  },
  filterRow: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
    flexWrap: "wrap",
    marginBottom: tokens.spacingVerticalS,
  },
  filterPill: {
    cursor: "pointer",
  },
  filterPillActive: {
    backgroundColor: tokens.colorNeutralForeground1,
    color: tokens.colorNeutralBackground1,
    ":hover": {
      backgroundColor: tokens.colorNeutralForeground2,
      color: tokens.colorNeutralBackground1,
    },
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalXXL,
    color: tokens.colorNeutralForeground3,
  },

  /* ── Comment card ── */
  commentCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  commentCardResolved: {
    opacity: 0.6,
  },
  commentHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  commentMeta: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  commentActions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    marginTop: tokens.spacingVerticalXXS,
  },
  reactionBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "3px",
    background: "none",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    padding: `2px ${tokens.spacingHorizontalXS}`,
    cursor: "pointer",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  reactionBtnActive: {
    borderTopColor: tokens.colorNeutralForeground1,
    borderRightColor: tokens.colorNeutralForeground1,
    borderBottomColor: tokens.colorNeutralForeground1,
    borderLeftColor: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
  },

  /* ── Replies ── */
  repliesSection: {
    marginLeft: "36px",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    borderLeft: `2px solid ${tokens.colorNeutralStroke2}`,
    paddingLeft: tokens.spacingHorizontalM,
  },
  replyCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  replyHeader: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
  },
  replyInput: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
    marginTop: tokens.spacingVerticalXXS,
  },

  /* ── New comment ── */
  newCommentArea: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    padding: `${tokens.spacingVerticalM} 0`,
  },
  submitRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalS,
  },

  /* ── Page directory ── */
  directorySection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    marginBottom: tokens.spacingVerticalS,
  },
  directoryTitle: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    marginBottom: tokens.spacingVerticalXXS,
  },
  directoryItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    backgroundColor: "transparent",
    border: "none",
    width: "100%",
    textAlign: "left" as const,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  directoryItemActive: {
    backgroundColor: tokens.colorNeutralBackground3,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  directoryBadge: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
  },
});

/* ── Sub-components ──────────────────────── */

function ReactionButton({
  icon,
  activeIcon,
  count,
  active,
  onClick,
  label,
}: {
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  count: number;
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  const styles = useStyles();
  return (
    <button
      className={mergeClasses(styles.reactionBtn, active && styles.reactionBtnActive)}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {active ? activeIcon : icon}
      {count > 0 && <span>{count}</span>}
    </button>
  );
}

function CommentCard({
  comment,
  userName,
  onUpdate,
  onDelete,
  onImageClick,
}: {
  comment: FeedbackComment;
  userName: string;
  onUpdate: (updated: FeedbackComment) => void;
  onDelete: (id: string) => void;
  onImageClick?: (src: string) => void;
}) {
  const styles = useStyles();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.message);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [editReplyText, setEditReplyText] = useState("");

  const isAuthor = comment.author === userName;
  const isAdmin = ADMIN_USERS.some((a) => a.toLowerCase() === userName.toLowerCase());

  const saveEdit = () => {
    if (!editText.trim()) return;
    onUpdate({ ...comment, message: editText.trim() });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(comment.message);
    setIsEditing(false);
  };

  const toggleLike = () => {
    const likes = comment.likes.includes(userName)
      ? comment.likes.filter((n) => n !== userName)
      : [...comment.likes, userName];
    const dislikes = comment.dislikes.filter((n) => n !== userName);
    onUpdate({ ...comment, likes, dislikes });
  };

  const toggleDislike = () => {
    const dislikes = comment.dislikes.includes(userName)
      ? comment.dislikes.filter((n) => n !== userName)
      : [...comment.dislikes, userName];
    const likes = comment.likes.filter((n) => n !== userName);
    onUpdate({ ...comment, likes, dislikes });
  };

  const toggleReplyLike = (replyId: string) => {
    const replies = comment.replies.map((r) => {
      if (r.id !== replyId) return r;
      const likes = r.likes.includes(userName) ? r.likes.filter((n) => n !== userName) : [...r.likes, userName];
      const dislikes = r.dislikes.filter((n) => n !== userName);
      return { ...r, likes, dislikes };
    });
    onUpdate({ ...comment, replies });
  };

  const toggleReplyDislike = (replyId: string) => {
    const replies = comment.replies.map((r) => {
      if (r.id !== replyId) return r;
      const dislikes = r.dislikes.includes(userName) ? r.dislikes.filter((n) => n !== userName) : [...r.dislikes, userName];
      const likes = r.likes.filter((n) => n !== userName);
      return { ...r, likes, dislikes };
    });
    onUpdate({ ...comment, replies });
  };

  const startEditReply = (r: FeedbackReply) => {
    setEditingReplyId(r.id);
    setEditReplyText(r.message);
  };

  const saveEditReply = () => {
    if (!editReplyText.trim() || !editingReplyId) return;
    const replies = comment.replies.map((r) =>
      r.id === editingReplyId ? { ...r, message: editReplyText.trim() } : r
    );
    onUpdate({ ...comment, replies });
    setEditingReplyId(null);
    setEditReplyText("");
  };

  const cancelEditReply = () => {
    setEditingReplyId(null);
    setEditReplyText("");
  };

  const submitReply = () => {
    if (!replyText.trim()) return;
    const reply: FeedbackReply = {
      id: generateId(),
      author: userName,
      message: replyText.trim(),
      timestamp: Date.now(),
      likes: [],
      dislikes: [],
    };
    onUpdate({ ...comment, replies: [...comment.replies, reply] });
    setReplyText("");
    setShowReplyInput(false);
  };

  const toggleResolved = () => {
    onUpdate({ ...comment, resolved: !comment.resolved });
  };

  return (
    <div className={mergeClasses(styles.commentCard, comment.resolved && styles.commentCardResolved)}>
      <div className={styles.commentHeader}>
        <Avatar name={comment.author} size={28} color="colorful" />
        <div className={styles.commentMeta}>
          <div style={{ display: "flex", alignItems: "center", gap: tokens.spacingHorizontalXS }}>
            <Text size={200} weight="semibold">{comment.author}</Text>
            {comment.tag && (
              <span style={{
                padding: "1px 6px",
                fontSize: "10px",
                fontWeight: 600,
                borderRadius: "10px",
                backgroundColor: TAG_COLORS[comment.tag]?.bg || TAG_COLORS.General.bg,
                color: TAG_COLORS[comment.tag]?.fg || TAG_COLORS.General.fg,
                lineHeight: "16px",
              }}>
                {comment.tag}
              </span>
            )}
          </div>
          <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{timeAgo(comment.timestamp)}</Text>
        </div>
        <Button
          appearance="subtle"
          size="small"
          onClick={toggleResolved}
          title={comment.resolved ? "Reopen" : "Resolve"}
        >
          {comment.resolved ? "Reopen" : "Resolve"}
        </Button>
        {isAuthor && !isEditing && (
          <Button
            appearance="subtle"
            size="small"
            icon={<Edit20Regular style={{ width: 14, height: 14 }} />}
            onClick={() => setIsEditing(true)}
            title="Edit comment"
          />
        )}
        {(isAuthor || isAdmin) && !isEditing && (
          <Button
            appearance="subtle"
            size="small"
            icon={<Delete20Regular style={{ width: 14, height: 14, color: tokens.colorPaletteRedForeground1 }} />}
            onClick={() => onDelete(comment.id)}
            title="Delete comment"
          />
        )}
      </div>

      {isEditing ? (
        <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXS }}>
          <Textarea
            value={editText}
            onChange={(_, d) => setEditText(d.value)}
            rows={2}
            resize="vertical"
          />
          <div style={{ display: "flex", gap: tokens.spacingHorizontalXS, justifyContent: "flex-end" }}>
            <Button appearance="subtle" size="small" onClick={cancelEdit}>Cancel</Button>
            <Button appearance="primary" size="small" onClick={saveEdit} disabled={!editText.trim()}
              style={{ backgroundColor: tokens.colorNeutralForeground1, color: tokens.colorNeutralBackground1 }}
            >Save</Button>
          </div>
        </div>
      ) : (
        <Text size={300} style={{ color: tokens.colorNeutralForeground1 }}>{comment.message}</Text>
      )}

      {/* Comment images */}
      {comment.images && comment.images.length > 0 && (
        <div style={{ display: "flex", gap: tokens.spacingHorizontalXS, flexWrap: "wrap" }}>
          {comment.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Attachment ${i + 1}`}
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                objectFit: "contain",
                borderRadius: tokens.borderRadiusMedium,
                border: `1px solid ${tokens.colorNeutralStroke2}`,
                cursor: "pointer",
              }}
              onClick={() => onImageClick?.(img)}
            />
          ))}
        </div>
      )}

      <div className={styles.commentActions}>
        <ReactionButton
          icon={<ThumbLike20Regular style={{ width: 14, height: 14 }} />}
          activeIcon={<ThumbLike20Filled style={{ width: 14, height: 14 }} />}
          count={comment.likes.length}
          active={comment.likes.includes(userName)}
          onClick={toggleLike}
          label="Like"
        />
        <ReactionButton
          icon={<ThumbDislike20Regular style={{ width: 14, height: 14 }} />}
          activeIcon={<ThumbDislike20Filled style={{ width: 14, height: 14 }} />}
          count={comment.dislikes.length}
          active={comment.dislikes.includes(userName)}
          onClick={toggleDislike}
          label="Dislike"
        />
        <Button
          appearance="transparent"
          size="small"
          onClick={() => setShowReplyInput(!showReplyInput)}
        >
          Reply
        </Button>
      </div>

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className={styles.repliesSection}>
          {comment.replies.map((r) => (
            <div key={r.id} className={styles.replyCard}>
              <div className={styles.replyHeader}>
                <Avatar name={r.author} size={20} color="colorful" />
                <Text size={200} weight="semibold">{r.author}</Text>
                <Text size={100} style={{ color: tokens.colorNeutralForeground3 }}>{timeAgo(r.timestamp)}</Text>
                {r.author === userName && editingReplyId !== r.id && (
                  <Button
                    appearance="subtle"
                    size="small"
                    icon={<Edit20Regular style={{ width: 12, height: 12 }} />}
                    onClick={() => startEditReply(r)}
                    title="Edit reply"
                  />
                )}
                {ADMIN_USERS.some((a) => a.toLowerCase() === userName.toLowerCase()) && (
                  <Button
                    appearance="subtle"
                    size="small"
                    icon={<Delete20Regular style={{ width: 12, height: 12, color: tokens.colorPaletteRedForeground1 }} />}
                    onClick={() => {
                      onUpdate({ ...comment, replies: comment.replies.filter((rep) => rep.id !== r.id) });
                    }}
                    title="Delete reply (admin)"
                  />
                )}
              </div>
              {editingReplyId === r.id ? (
                <div style={{ marginLeft: "28px", display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXS }}>
                  <Input
                    size="small"
                    value={editReplyText}
                    onChange={(_, d) => setEditReplyText(d.value)}
                  />
                  <div style={{ display: "flex", gap: tokens.spacingHorizontalXS, justifyContent: "flex-end" }}>
                    <Button appearance="subtle" size="small" onClick={cancelEditReply}>Cancel</Button>
                    <Button appearance="primary" size="small" onClick={saveEditReply} disabled={!editReplyText.trim()}
                      style={{ backgroundColor: tokens.colorNeutralForeground1, color: tokens.colorNeutralBackground1 }}
                    >Save</Button>
                  </div>
                </div>
              ) : (
                <Text size={200} style={{ color: tokens.colorNeutralForeground1, marginLeft: "28px" }}>{r.message}</Text>
              )}
              <div className={styles.commentActions} style={{ marginLeft: "28px" }}>
                <ReactionButton
                  icon={<ThumbLike20Regular style={{ width: 12, height: 12 }} />}
                  activeIcon={<ThumbLike20Filled style={{ width: 12, height: 12 }} />}
                  count={r.likes.length}
                  active={r.likes.includes(userName)}
                  onClick={() => toggleReplyLike(r.id)}
                  label="Like reply"
                />
                <ReactionButton
                  icon={<ThumbDislike20Regular style={{ width: 12, height: 12 }} />}
                  activeIcon={<ThumbDislike20Filled style={{ width: 12, height: 12 }} />}
                  count={r.dislikes.length}
                  active={r.dislikes.includes(userName)}
                  onClick={() => toggleReplyDislike(r.id)}
                  label="Dislike reply"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reply input */}
      {showReplyInput && (
        <div className={styles.replyInput} style={{ marginLeft: "36px" }}>
          <Input
            size="small"
            placeholder="Reply..."
            value={replyText}
            onChange={(_, d) => setReplyText(d.value)}
            onKeyDown={(e) => { if (e.key === "Enter") submitReply(); }}
            style={{ flex: 1 }}
          />
          <Button
            appearance="subtle"
            size="small"
            icon={<Send20Filled style={{ width: 14, height: 14 }} />}
            onClick={submitReply}
            disabled={!replyText.trim()}
            aria-label="Send reply"
          />
        </div>
      )}
    </div>
  );
}

/* ── Props ───────────────────────────────── */

interface FeedbackPanelProps {
  /** Page route / identifier for scoping comments */
  pageId: string;
  /** Controlled open state — when provided, the FAB is hidden and the parent controls open/close */
  isOpen?: boolean;
  /** Callback when the panel wants to close (used with isOpen) */
  onOpenChange?: (open: boolean) => void;
  /** Map of pageId → display name for the page directory. When provided, shows a page list with comment counts. */
  pageDirectory?: Record<string, string>;
  /** Callback to switch to a different page (used with pageDirectory) */
  onPageSelect?: (pageId: string) => void;
  /** Map of pageId → status for each page in the directory */
  pageStatuses?: Record<string, PageStatus>;
}

/** Drawer panel for in-app design review comments with reactions and threaded replies. */
export default function FeedbackPanel({ pageId, isOpen, onOpenChange, pageDirectory, onPageSelect, pageStatuses }: FeedbackPanelProps) {
  const controlled = isOpen !== undefined;
  const styles = useStyles();
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlled ? isOpen : internalOpen;
  const setOpen = controlled ? (v: boolean) => onOpenChange?.(v) : setInternalOpen;
  const [userName, setUserName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [comments, setComments] = useState<FeedbackComment[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [mounted, setMounted] = useState(false);
  const [allCounts, setAllCounts] = useState<Record<string, number>>({});
  const [isEditingName, setIsEditingName] = useState(false);
  const [selectedTag, setSelectedTag] = useState<FeedbackTag>("General");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMentionPicker, setShowMentionPicker] = useState(false);
  const [mentionFilter, setMentionFilter] = useState("");
  const [knownUsers, setKnownUsers] = useState<string[]>([]);
  const [attachedImages, setAttachedImages] = useState<string[]>([]);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load persisted data on mount
  useEffect(() => {
    setMounted(true);
    setUserName(loadUserName());
    setComments(loadFeedback(pageId));
    setAllCounts(loadAllFeedbackCounts());
    setKnownUsers(loadAllUsers());
  }, [pageId]);

  // Persist on change
  const updateComments = useCallback(
    (next: FeedbackComment[]) => {
      setComments(next);
      saveFeedbackAll(next, pageId);
      setAllCounts(loadAllFeedbackCounts());
      setKnownUsers(loadAllUsers());
    },
    [pageId],
  );

  const handleSetName = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    setUserName(trimmed);
    saveUserName(trimmed);
  };

  const handleSubmit = () => {
    if (!newMessage.trim() && attachedImages.length === 0) return;
    const comment: FeedbackComment = {
      id: generateId(),
      pageId,
      author: userName,
      message: newMessage.trim(),
      timestamp: Date.now(),
      likes: [],
      dislikes: [],
      resolved: false,
      replies: [],
      tag: selectedTag,
      images: attachedImages.length > 0 ? attachedImages : undefined,
    };
    updateComments([comment, ...comments]);
    setNewMessage("");
    setSelectedTag("General");
    setAttachedImages([]);
  };

  const handleImageAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;
      if (file.size > 5 * 1024 * 1024) return; // 5MB limit
      const reader = new FileReader();
      reader.onload = () => {
        setAttachedImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleUpdateComment = (updated: FeedbackComment) => {
    updateComments(comments.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleDeleteComment = (id: string) => {
    updateComments(comments.filter((c) => c.id !== id));
  };

  // Apply filter
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const mentionPattern = new RegExp(`@${userName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
  const hasMention = (text: string) => mentionPattern.test(text);
  const newestCount = comments.filter((c) => c.timestamp >= sevenDaysAgo).length;
  const resolvedCount = comments.filter((c) => c.resolved).length;
  const mentionsCount = userName ? comments.filter((c) => hasMention(c.message) || c.replies.some((r) => hasMention(r.message))).length : 0;
  const allCount = comments.length;

  const filtered = (() => {
    let list = [...comments];
    if (filter === "resolved") list = list.filter((c) => c.resolved);
    if (filter === "newest") list = list.filter((c) => c.timestamp >= sevenDaysAgo).sort((a, b) => b.timestamp - a.timestamp);
    if (filter === "mentions") list = list.filter((c) => hasMention(c.message) || c.replies.some((r) => hasMention(r.message)));
    return list;
  })();

  if (!mounted) return null;

  return (
    <>
      {/* Floating action button — only shown in uncontrolled mode */}
      {!controlled && (
        <button
          className={styles.fab}
          onClick={() => setOpen(true)}
          aria-label="Open feedback panel"
        >
          <CommentNote20Filled />
          Feedback
          {comments.filter((c) => !c.resolved).length > 0 && (
            <Badge
              className={styles.fabBadge}
              size="small"
              appearance="filled"
              color="danger"
            >
              {comments.filter((c) => !c.resolved).length}
            </Badge>
          )}
        </button>
      )}

      {/* Drawer */}
      <OverlayDrawer
        open={open}
        onOpenChange={(_, d) => setOpen(d.open)}
        position="end"
        size="medium"
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                icon={<Dismiss20Regular />}
                onClick={() => setOpen(false)}
                aria-label="Close feedback"
              />
            }
          >
            Design Feedback
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          {/* Name prompt (first time) */}
          {!userName ? (
            <div className={styles.namePrompt}>
              <Text size={400} weight="semibold">
                Hello
              </Text>
              <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
                Enter your name to start leaving feedback on this prototype.
              </Text>
              <Field label="Name">
                <Input
                  value={nameInput}
                  onChange={(_, d) => setNameInput(d.value)}
                  placeholder="Type name"
                  onKeyDown={(e) => { if (e.key === "Enter") handleSetName(); }}
                />
              </Field>
              <Button appearance="primary" onClick={handleSetName} disabled={!nameInput.trim()}
                style={{ backgroundColor: tokens.colorNeutralForeground1, color: tokens.colorNeutralBackground1 }}
              >
                Continue
              </Button>
            </div>
          ) : (
            <div className={styles.panelBody} ref={bodyRef}>
              {/* Page directory */}
              {pageDirectory && Object.keys(pageDirectory).length > 0 && (
                <>
                  <div className={styles.directorySection}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: tokens.spacingVerticalXXS }}>
                      <span className={styles.directoryTitle}>Pages</span>
                      <span className={styles.directoryTitle}>Status</span>
                    </div>
                    {Object.entries(pageDirectory).map(([pid, label]) => {
                      // Resolve effective status: auto-transition Ready for review → In review when comments exist
                      const baseStatus = pageStatuses?.[pid];
                      const effectiveStatus: PageStatus | undefined = baseStatus === "Ready for review" && (allCounts[pid] || 0) > 0
                        ? "In review"
                        : baseStatus;
                      const statusColor = effectiveStatus ? STATUS_COLORS[effectiveStatus] : undefined;
                      return (
                        <button
                          key={pid}
                          className={mergeClasses(styles.directoryItem, pid === pageId && styles.directoryItemActive)}
                          onClick={() => onPageSelect?.(pid)}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: tokens.spacingHorizontalXS, flex: 1, minWidth: 0 }}>
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
                            {(allCounts[pid] || 0) > 0 && (
                              <Badge size="small" appearance="tint" color="informative">{allCounts[pid]}</Badge>
                            )}
                          </div>
                          {effectiveStatus && statusColor && (
                            <span style={{
                              fontSize: "10px",
                              fontWeight: 600,
                              padding: "1px 6px",
                              borderRadius: "10px",
                              backgroundColor: statusColor.bg,
                              color: statusColor.fg,
                              lineHeight: "16px",
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                            }}>
                              {statusColor.icon ? `${statusColor.icon} ` : ""}{effectiveStatus}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <Divider />
                </>
              )}

              {/* New comment */}
              <div className={styles.newCommentArea}>
                {pageDirectory?.[pageId] && (
                  <Text size={200} weight="semibold" style={{ color: tokens.colorNeutralForeground2 }}>
                    PAGE: {pageDirectory[pageId]}
                  </Text>
                )}
                <Textarea
                  ref={textareaRef}
                  placeholder="Leave feedback on this page"
                  value={newMessage}
                  onChange={(_, d) => {
                    setNewMessage(d.value);
                    if (d.value.endsWith("/emoji")) {
                      setShowEmojiPicker(true);
                    }
                    // Detect @mention trigger
                    const atMatch = d.value.match(/@(\w*)$/);
                    if (atMatch) {
                      setMentionFilter(atMatch[1].toLowerCase());
                      setShowMentionPicker(true);
                    } else {
                      setShowMentionPicker(false);
                    }
                  }}
                  resize="vertical"
                  rows={3}
                />
                {/* Attached images preview */}
                {attachedImages.length > 0 && (
                  <div style={{ display: "flex", gap: tokens.spacingHorizontalXS, flexWrap: "wrap" }}>
                    {attachedImages.map((img, i) => (
                      <div key={i} style={{ position: "relative", display: "inline-block" }}>
                        <img
                          src={img}
                          alt={`Attachment ${i + 1}`}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            borderRadius: tokens.borderRadiusMedium,
                            border: `1px solid ${tokens.colorNeutralStroke2}`,
                            cursor: "pointer",
                          }}
                          onClick={() => setLightboxImage(img)}
                        />
                        <button
                          onClick={() => setAttachedImages((prev) => prev.filter((_, idx) => idx !== i))}
                          style={{
                            position: "absolute",
                            top: "-4px",
                            right: "-4px",
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            border: "none",
                            backgroundColor: tokens.colorNeutralForeground1,
                            color: tokens.colorNeutralBackground1,
                            fontSize: "10px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                            lineHeight: 1,
                          }}
                          title="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleImageAttach}
                />
                {showEmojiPicker && (
                  <div style={{
                    border: `1px solid ${tokens.colorNeutralStroke1}`,
                    borderRadius: tokens.borderRadiusMedium,
                    backgroundColor: tokens.colorNeutralBackground1,
                    boxShadow: tokens.shadow8,
                    padding: tokens.spacingVerticalS,
                    display: "flex",
                    flexDirection: "column",
                    gap: tokens.spacingVerticalXS,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Text size={200} weight="semibold">Pick an emoji</Text>
                      <Button appearance="subtle" size="small" icon={<Dismiss20Regular />}
                        onClick={() => setShowEmojiPicker(false)} aria-label="Close emoji picker"
                        style={{ minWidth: "auto", padding: "2px" }}
                      />
                    </div>
                    {EMOJI_CATEGORIES.map((cat) => (
                      <div key={cat.label}>
                        <Text size={100} style={{ color: tokens.colorNeutralForeground3, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          {cat.label}
                        </Text>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "2px", marginTop: "2px" }}>
                          {cat.emojis.map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => {
                                setNewMessage((prev) => prev.replace(/\/emoji$/, emoji));
                                setShowEmojiPicker(false);
                                textareaRef.current?.focus();
                              }}
                              style={{
                                width: "28px",
                                height: "28px",
                                fontSize: "16px",
                                border: "none",
                                borderRadius: tokens.borderRadiusSmall,
                                backgroundColor: "transparent",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 0,
                              }}
                              title={emoji}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {showMentionPicker && (() => {
                  const filteredUsers = knownUsers.filter((u) => u.toLowerCase().includes(mentionFilter) && u !== userName);
                  // Also suggest current user if matches
                  const allSuggestions = [...(userName.toLowerCase().includes(mentionFilter) ? [userName] : []), ...filteredUsers];
                  if (allSuggestions.length === 0) return null;
                  return (
                    <div style={{
                      border: `1px solid ${tokens.colorNeutralStroke1}`,
                      borderRadius: tokens.borderRadiusMedium,
                      backgroundColor: tokens.colorNeutralBackground1,
                      boxShadow: tokens.shadow8,
                      padding: tokens.spacingVerticalXXS,
                      display: "flex",
                      flexDirection: "column",
                    }}>
                      <Text size={100} style={{ color: tokens.colorNeutralForeground3, padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalS}`, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        Mention someone
                      </Text>
                      {allSuggestions.map((u) => (
                        <button
                          key={u}
                          onClick={() => {
                            setNewMessage((prev) => prev.replace(/@\w*$/, `@${u} `));
                            setShowMentionPicker(false);
                            textareaRef.current?.focus();
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: tokens.spacingHorizontalS,
                            padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
                            border: "none",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            textAlign: "left" as const,
                            width: "100%",
                            fontSize: tokens.fontSizeBase200,
                            borderRadius: tokens.borderRadiusSmall,
                          }}
                          onMouseEnter={(e) => { (e.target as HTMLElement).style.backgroundColor = tokens.colorNeutralBackground3; }}
                          onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = "transparent"; }}
                        >
                          <Avatar name={u} size={20} color="colorful" />
                          {u}
                        </button>
                      ))}
                    </div>
                  );
                })()}
                <div style={{ display: "flex", alignItems: "center", gap: tokens.spacingHorizontalS, flexWrap: "nowrap" }}>
                  <Dropdown
                    size="small"
                    value={selectedTag}
                    selectedOptions={[selectedTag]}
                    onOptionSelect={(_, d) => setSelectedTag(d.optionValue as FeedbackTag)}
                    style={{ minWidth: "110px", maxWidth: "130px" }}
                  >
                    {ALL_TAGS.map((t) => (
                      <Option key={t} value={t}>
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}>
                          <span style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: TAG_COLORS[t].fg,
                            flexShrink: 0,
                          }} />
                          {t}
                        </span>
                      </Option>
                    ))}
                  </Dropdown>
                  <Button
                    appearance="subtle"
                    size="small"
                    icon={<Image20Regular style={{ width: 14, height: 14 }} />}
                    onClick={() => fileInputRef.current?.click()}
                    title="Add image"
                  >
                    Add image
                  </Button>
                  <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: tokens.spacingHorizontalS }}>
                    {isEditingName ? (
                      <div style={{ display: "flex", alignItems: "center", gap: tokens.spacingHorizontalXS }}>
                        <Input
                          size="small"
                          value={nameInput}
                          onChange={(_, d) => setNameInput(d.value)}
                          placeholder="Type name"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && nameInput.trim()) {
                              setUserName(nameInput.trim());
                              saveUserName(nameInput.trim());
                              setIsEditingName(false);
                            }
                          }}
                          style={{ width: "100px" }}
                        />
                        <Button appearance="primary" size="small" disabled={!nameInput.trim()}
                          style={{ backgroundColor: tokens.colorNeutralForeground1, color: tokens.colorNeutralBackground1 }}
                          onClick={() => {
                            setUserName(nameInput.trim());
                            saveUserName(nameInput.trim());
                            setIsEditingName(false);
                          }}
                        >Save</Button>
                        <Button appearance="subtle" size="small" onClick={() => setIsEditingName(false)}>Cancel</Button>
                      </div>
                    ) : (
                      <Text size={200} style={{ color: tokens.colorNeutralForeground3, display: "flex", alignItems: "center", gap: tokens.spacingHorizontalXXS, whiteSpace: "nowrap" }}>
                        Posting as {userName}
                        <Button
                          appearance="subtle"
                          size="small"
                          icon={<Edit20Regular style={{ width: 12, height: 12 }} />}
                          onClick={() => { setNameInput(userName); setIsEditingName(true); }}
                          title="Edit name"
                          style={{ minWidth: "auto", padding: "2px" }}
                        />
                      </Text>
                    )}
                    <Button
                      appearance="primary"
                      size="small"
                      icon={<Send20Filled />}
                      onClick={handleSubmit}
                      disabled={!newMessage.trim() && attachedImages.length === 0}
                      style={{ backgroundColor: tokens.colorNeutralForeground1, color: tokens.colorNeutralBackground1 }}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>

              <Divider />

              {/* Filters */}
              <div style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalXXS }}>
                <div className={styles.filterRow}>
                  {(["all", "newest", "mentions", "resolved"] as FilterMode[]).map((f) => {
                    const count = f === "all" ? allCount : f === "newest" ? newestCount : f === "mentions" ? mentionsCount : resolvedCount;
                    return (
                      <Button
                        key={f}
                        className={mergeClasses(styles.filterPill, filter === f && styles.filterPillActive)}
                        size="small"
                        appearance={filter === f ? "primary" : "outline"}
                        onClick={() => setFilter(f)}
                      >
                        {f === "all" ? "All" : f === "newest" ? "Newest" : f === "mentions" ? "Mentions" : "Resolved"} ({count})
                      </Button>
                    );
                  })}
                </div>
                {filter === "newest" && (
                  <Text size={100} style={{ color: tokens.colorNeutralForeground3, paddingLeft: tokens.spacingHorizontalXXS }}>
                    Comments from the last 7 days
                  </Text>
                )}
              </div>

              {/* Comments list */}
              {filtered.length === 0 ? (
                <div className={styles.emptyState}>
                  <CommentAdd20Regular style={{ fontSize: 32 }} />
                  <Text size={300} style={{ textAlign: "center", whiteSpace: "pre-line" }}>
                    {filter === "all"
                      ? "No feedback yet.\nBe the first to comment!"
                      : "No comments match this filter."}
                  </Text>
                </div>
              ) : (
                filtered.map((c) => (
                  <CommentCard
                    key={c.id}
                    comment={c}
                    userName={userName}
                    onUpdate={handleUpdateComment}
                    onDelete={handleDeleteComment}
                    onImageClick={(src) => setLightboxImage(src)}
                  />
                ))
              )}
            </div>
          )}
        </DrawerBody>
        <DrawerFooter style={{ display: "flex", justifyContent: "space-between" }}>
          {pageDirectory && Object.keys(pageDirectory).length > 0 ? (
            <Button
              appearance="subtle"
              onClick={() => bodyRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
            >
              View all comments ({Object.values(allCounts).reduce((a, b) => a + b, 0)})
            </Button>
          ) : <span />}
          <Button appearance="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DrawerFooter>
      </OverlayDrawer>

      {/* Lightbox */}
      {lightboxImage && ReactDOM.createPortal(
        <div
          onClick={() => setLightboxImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000000,
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#fff",
              fontSize: "20px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close image"
          >
            ×
          </button>
          <img
            src={lightboxImage}
            alt="Full size"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: tokens.borderRadiusLarge,
              cursor: "default",
            }}
          />
        </div>,
        document.body
      )}
    </>
  );
}
