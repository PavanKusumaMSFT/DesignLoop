import { useCopilot } from './v8-copilot-provider';
import { CopilotCard } from './v8-copilot-card';
import type { CopilotChatMessage } from './v8-copilot-types';

import CopilotColorIcon from './v8-icons/brand/copilot-color.svg?react';
import ThumbsUpIcon from './v8-icons/commands/thumbs-up.svg?react';
import ThumbsDownIcon from './v8-icons/commands/thumbs-down.svg?react';

import './v8-copilot-message.css';
import './v8-copilot-warm-start.css'; /* shared .ap-copilot-suggestion styles */

/* ===========================================
   Copilot Message
   A single chat message (user or assistant)
   =========================================== */

export interface CopilotMessageProps {
  message: CopilotChatMessage;
}

export function CopilotMessage({ message }: CopilotMessageProps) {
  const { promptSuggestions, sendMessage } = useCopilot();
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  const classNames = [
    'ap-copilot-message',
    isUser && 'ap-copilot-message--user',
    isAssistant && 'ap-copilot-message--assistant',
    message.status === 'error' && 'ap-copilot-message--error',
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {/* User messages: right-aligned bubble */}
      {isUser && (
        <div className="ap-copilot-message__bubble">
          {message.content}
        </div>
      )}

      {/* Assistant messages: full-width with branding */}
      {isAssistant && (
        <>
          {/* Copilot header row */}
          <div className="ap-copilot-message__header">
            <span className="ap-copilot-message__avatar">
              <CopilotColorIcon />
            </span>
            <span className="ap-copilot-message__name">Copilot</span>
            <span className="ap-copilot-message__disclaimer">
              AI-generated content may be incorrect
            </span>
          </div>

          {/* Text body */}
          <div className="ap-copilot-message__body">
            {message.content}
          </div>

          {/* Rich content cards */}
          {message.cards && message.cards.length > 0 && (
            <div className="ap-copilot-message__cards">
              {message.cards.map((card) => (
                <CopilotCard key={card.id} card={card} />
              ))}
            </div>
          )}

          {/* Feedback row */}
          <div className="ap-copilot-message__feedback">
            <button type="button" className="ap-copilot-message__feedback-btn" aria-label="Thumbs up">
              <ThumbsUpIcon />
            </button>
            <button type="button" className="ap-copilot-message__feedback-btn" aria-label="Thumbs down">
              <ThumbsDownIcon />
            </button>
          </div>

          {/* Follow-up suggestions (shown after the last assistant message) */}
          {promptSuggestions && promptSuggestions.length > 0 && (
            <div className="ap-copilot-message__suggestions">
              {promptSuggestions.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  className="ap-copilot-suggestion"
                  onClick={() => sendMessage(s.value ?? s.label)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
