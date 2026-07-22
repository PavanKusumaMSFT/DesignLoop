import type React from 'react';

/* ===========================================
   Copilot Sidecar — Shared Types
   =========================================== */

/* ---- Messages ---- */

export type CopilotMessageRole = 'user' | 'assistant' | 'system';
export type CopilotMessageStatus = 'sending' | 'streaming' | 'complete' | 'error';

export interface CopilotChatMessage {
  /** Unique message id */
  id: string;
  /** Who sent it */
  role: CopilotMessageRole;
  /** Markdown / plain-text body */
  content: string;
  /** Optional rich content cards rendered below the text */
  cards?: CopilotCardInstance[];
  /** When the message was created */
  timestamp: Date;
  /** Lifecycle status */
  status?: CopilotMessageStatus;
}

/* ---- Rich Content Cards ---- */

/** A single card rendered inside an assistant message */
export interface CopilotCardInstance {
  /** Unique id for this card instance */
  id: string;
  /** Lookup key in the card registry, e.g. 'code', 'data-grid' */
  type: string;
  /** Optional header shown at the top of the card */
  title?: string;
  /** Arbitrary props forwarded to the registered renderer */
  props: Record<string, unknown>;
}

/** Registry entry — maps a card `type` to a React component */
export interface CopilotCardRenderer {
  /** The component to render */
  component: React.ComponentType<{ card: CopilotCardInstance }>;
  /** Optional component rendered in the card header alongside the title */
  headerActions?: React.ComponentType<{ card: CopilotCardInstance }>;
  /** When true, the card header (title + actions) is suppressed */
  hideHeader?: boolean;
  /** Human-readable label (used in tooling / docs) */
  label?: string;
}

/* ---- Prompt Suggestions ---- */

export interface CopilotPromptSuggestion {
  /** Display text */
  label: string;
  /** Value sent as user message (defaults to label if omitted) */
  value?: string;
}

/* ---- API Configuration ---- */

export interface CopilotConfig {
  /** API key for the AI service */
  apiKey: string;
  /** Endpoint URL (e.g. Azure OpenAI chat completions URL) */
  apiUrl: string;
  /** Model / deployment name */
  model?: string;
  /** System prompt prepended to every conversation */
  systemPrompt?: string;
  /** Maximum tokens in the assistant response (default: 800) */
  maxTokens?: number;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
  /**
   * Fully override the default fetch-based adapter.
   * Receives the message history and should return the assistant reply.
   */
  onSendMessage?: (messages: CopilotChatMessage[]) => Promise<CopilotChatMessage>;
}

/* ---- Toast Notifications ---- */

export type CopilotToastVariant = 'progress' | 'completed' | 'input-required' | 'error' | 'generic';

export interface CopilotToast {
  /** Unique toast ID (auto-generated if omitted when adding) */
  id: string;
  /** Predefined variant or generic */
  variant: CopilotToastVariant;
  /** Title shown in header row */
  title: string;
  /** Body content — text or React nodes */
  body?: React.ReactNode;
  /** Optional action buttons (fully custom ReactNode) */
  actions?: React.ReactNode;
  /** Whether auto-dismiss is enabled (overrides variant default) */
  autoDismiss?: boolean;
  /** Auto-dismiss timeout in ms (default: 5000) */
  autoDismissTimeout?: number;
  /** Show close button (default: true) */
  showClose?: boolean;
  /** Callback when toast is clicked (e.g., open sidecar) */
  onClick?: (toast: CopilotToast) => void;
  /** Callback when toast is dismissed */
  onDismiss?: (toast: CopilotToast) => void;
  /** Timestamp for ordering */
  createdAt: Date;
}

/* ---- Context (provided by CopilotProvider) ---- */

export interface CopilotContextValue {
  /* state */
  messages: CopilotChatMessage[];
  isLoading: boolean;
  isOpen: boolean;

  /* toast state */
  toasts: CopilotToast[];

  /* actions */
  sendMessage: (content: string) => void;
  clearChat: () => void;
  toggleSidecar: () => void;
  openSidecar: () => void;
  closeSidecar: () => void;

  /* toast actions */
  addToast: (toast: Omit<CopilotToast, 'id' | 'createdAt'> & { id?: string }) => string;
  updateToast: (id: string, updates: Partial<CopilotToast>) => void;
  dismissToast: (id: string) => void;
  dismissAllToasts: () => void;

  /* configuration */
  config: CopilotConfig;
  cardRegistry: Record<string, CopilotCardRenderer>;

  /* warm-start */
  greeting?: string;
  promptSuggestions?: CopilotPromptSuggestion[];
}
