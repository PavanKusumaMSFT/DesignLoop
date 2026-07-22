import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import type {
  CopilotConfig,
  CopilotContextValue,
  CopilotChatMessage,
  CopilotCardRenderer,
  CopilotPromptSuggestion,
  CopilotToast,
} from './v8-copilot-types';

/* ===========================================
   Copilot Provider
   Holds chat state, API config & card registry
   =========================================== */

const CopilotContext = createContext<CopilotContextValue | null>(null);

/** Access Copilot state & actions from any descendant */
export function useCopilot(): CopilotContextValue {
  const ctx = useContext(CopilotContext);
  if (!ctx) throw new Error('useCopilot must be used within a <CopilotProvider>');
  return ctx;
}

/* ---- Default fetch adapter ---- */

let _counter = 0;
function uid(): string {
  return `msg-${Date.now()}-${++_counter}`;
}

async function defaultSendMessage(
  messages: CopilotChatMessage[],
  config: CopilotConfig,
): Promise<CopilotChatMessage> {
  const maxTokens = config.maxTokens ?? 800;
  const timeout = config.timeout ?? 30_000;

  const payload = {
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
    max_completion_tokens: maxTokens,
    ...(config.model ? { model: config.model } : {}),
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(config.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': config.apiKey,
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!res.ok) {
      // Try to surface the API's error message
      let detail = '';
      try {
        const errBody = await res.json();
        detail = errBody?.error?.message ?? JSON.stringify(errBody);
      } catch { /* ignore parse failure */ }
      throw new Error(
        `Copilot API error ${res.status}: ${detail || res.statusText}`,
      );
    }

    const data = await res.json();
    const choice = data.choices?.[0];
    const content: string = choice?.message?.content ?? '';

    return {
      id: uid(),
      role: 'assistant',
      content,
      timestamp: new Date(),
      status: 'complete',
    };
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeout / 1000}s. Try a shorter question or increase the timeout.`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

/* ---- Provider Props ---- */

export interface CopilotProviderProps {
  /** API configuration (key, url, model, systemPrompt, onSendMessage) */
  config: CopilotConfig;
  /** Custom card renderers merged with built-in ones */
  cardRenderers?: Record<string, CopilotCardRenderer>;
  /** Greeting shown in warm-start state */
  greeting?: string;
  /** Prompt suggestion chips shown when chat is empty or after a response */
  promptSuggestions?: CopilotPromptSuggestion[];
  /** Start with sidecar open */
  defaultOpen?: boolean;
  /** Children */
  children: React.ReactNode;
}

export function CopilotProvider({
  config,
  cardRenderers = {},
  greeting = 'How can I help you today?',
  promptSuggestions,
  defaultOpen = false,
  children,
}: CopilotProviderProps) {
  const [messages, setMessages] = useState<CopilotChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [toasts, setToasts] = useState<CopilotToast[]>([]);

  // Keep latest config in a ref so the send callback doesn't go stale
  const configRef = useRef(config);
  configRef.current = config;

  // Keep a ref to messages so the async callback always has the latest
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const sendMessage = useCallback(
    async (content: string) => {
      const userMsg: CopilotChatMessage = {
        id: uid(),
        role: 'user',
        content,
        timestamp: new Date(),
        status: 'complete',
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const cfg = configRef.current;
        // Build the full history including system prompt
        const history: CopilotChatMessage[] = [];
        if (cfg.systemPrompt) {
          history.push({
            id: 'system',
            role: 'system',
            content: cfg.systemPrompt,
            timestamp: new Date(),
          });
        }

        // Add all existing messages + the new user message
        history.push(...messagesRef.current, userMsg);

        // Log the payload sent to the API for debugging
        console.log(
          '[Copilot] Sending messages:',
          history.map((m) => ({ role: m.role, content: m.content })),
        );

        const reply = cfg.onSendMessage
          ? await cfg.onSendMessage(history)
          : await defaultSendMessage(history, cfg);

        setMessages((prev) => [...prev, reply]);
      } catch (err) {
        const errorMsg: CopilotChatMessage = {
          id: uid(),
          role: 'assistant',
          content: `Sorry, something went wrong. ${err instanceof Error ? err.message : ''}`,
          timestamp: new Date(),
          status: 'error',
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  const toggleSidecar = useCallback(() => setIsOpen((v) => !v), []);
  const openSidecar = useCallback(() => setIsOpen(true), []);
  const closeSidecar = useCallback(() => setIsOpen(false), []);

  /* ---- Toast actions ---- */

  const addToast = useCallback(
    (toast: Omit<CopilotToast, 'id' | 'createdAt'> & { id?: string }): string => {
      const id = toast.id ?? uid();
      const newToast: CopilotToast = {
        ...toast,
        id,
        createdAt: new Date(),
      };
      setToasts((prev) => [newToast, ...prev]);
      return id;
    },
    [],
  );

  const updateToast = useCallback(
    (id: string, updates: Partial<CopilotToast>) => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      );
    },
    [],
  );

  const dismissToast = useCallback(
    (id: string) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    },
    [],
  );

  const dismissAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const value: CopilotContextValue = {
    messages,
    isLoading,
    isOpen,
    toasts,
    sendMessage,
    clearChat,
    toggleSidecar,
    openSidecar,
    closeSidecar,
    addToast,
    updateToast,
    dismissToast,
    dismissAllToasts,
    config,
    cardRegistry: cardRenderers,
    greeting,
    promptSuggestions,
  };

  return (
    <CopilotContext.Provider value={value}>
      {children}
    </CopilotContext.Provider>
  );
}
