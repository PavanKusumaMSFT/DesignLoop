import React, { useRef, useEffect } from 'react';
import { useCopilot } from './v8-copilot-provider';
import { CopilotMessage } from './v8-copilot-message';
import { CopilotWarmStart } from './v8-copilot-warm-start';
import { CopilotInput } from './v8-copilot-input';

import CloseIcon from './v8-icons/commands/close.svg?react';
import MaximizeIcon from './v8-icons/commands/maximize.svg?react';
import AddIcon from './v8-icons/commands/add.svg?react';
import EllipsisIcon from './v8-icons/commands/ellipsis.svg?react';

import './v8-copilot-sidecar.css';

/* ===========================================
   Copilot Sidecar
   Right-side push panel with chat UI
   =========================================== */

export interface CopilotSidecarProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Control open state externally.
   * If omitted the provider's internal `isOpen` is used.
   */
  open?: boolean;
  /** Called when the user clicks the close button */
  onClose?: () => void;
}

export function CopilotSidecar({
  open: openProp,
  onClose,
  className = '',
  ...props
}: CopilotSidecarProps) {
  const {
    messages,
    isLoading,
    isOpen: providerOpen,
    closeSidecar,
    sendMessage,
  } = useCopilot();

  const isOpen = openProp ?? providerOpen;
  const handleClose = onClose ?? closeSidecar;

  // Auto-scroll to bottom when messages change
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  // Derive header title from first user message or default
  const firstUserMsg = messages.find((m) => m.role === 'user');
  const headerTitle = firstUserMsg?.content ?? 'Copilot';

  const classNames = [
    'ap-copilot-sidecar',
    isOpen && 'ap-copilot-sidecar--open',
    className,
  ].filter(Boolean).join(' ');

  return (
    <aside className={classNames} aria-label="Copilot" {...props}>
      <div className="ap-copilot-sidecar__inner">
        {/* Header */}
        <header className="ap-copilot-sidecar__header">
          <span className="ap-copilot-sidecar__title" title={headerTitle}>
            {headerTitle}
          </span>
          <div className="ap-copilot-sidecar__header-actions">
            <button type="button" className="ap-copilot-sidecar__header-btn" aria-label="More options">
              <EllipsisIcon />
            </button>
            <button type="button" className="ap-copilot-sidecar__header-btn" aria-label="New chat">
              <AddIcon />
            </button>
            <button type="button" className="ap-copilot-sidecar__header-btn" aria-label="Full screen">
              <MaximizeIcon />
            </button>
            <button type="button" className="ap-copilot-sidecar__header-btn" aria-label="Close" onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
        </header>

        {/* Messages area */}
        <div className="ap-copilot-sidecar__messages" ref={scrollRef}>
          {messages.length === 0 && !isLoading ? (
            <CopilotWarmStart onSuggestionClick={sendMessage} />
          ) : (
            <>
              {messages.map((msg) => (
                <CopilotMessage key={msg.id} message={msg} />
              ))}
            </>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="ap-copilot-sidecar__loading">
              <div className="ap-copilot-sidecar__progress-bar">
                <div className="ap-copilot-sidecar__progress-fill" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <CopilotInput />
      </div>
    </aside>
  );
}
