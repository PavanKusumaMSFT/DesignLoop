import React, { useState, useRef, useEffect } from 'react';
import { useCopilot } from './v8-copilot-provider';

import AddIcon from './v8-icons/commands/add.svg?react';
import CopilotOutlineIcon from './v8-icons/brand/copilot-outline.svg?react';
import ArrowRightIcon from './v8-icons/commands/arrow-right.svg?react';

import './v8-copilot-input.css';

/* ===========================================
   Copilot Input
   Bottom text input + send button
   =========================================== */

export function CopilotInput() {
  const { sendMessage, isLoading } = useCopilot();
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const canSend = value.trim().length > 0 && !isLoading;

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleSend = () => {
    if (!canSend) return;
    sendMessage(value.trim());
    setValue('');
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ap-copilot-input">
      <div className="ap-copilot-input__field">
        <textarea
          ref={textareaRef}
          className="ap-copilot-input__textarea"
          placeholder="Ask Copilot a question…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isLoading}
        />
        <div className="ap-copilot-input__actions">
          <button
            type="button"
            className="ap-copilot-input__action-btn"
            aria-label="Add context"
          >
            <AddIcon />
          </button>
          <button
            type="button"
            className="ap-copilot-input__action-btn"
            aria-label="Copilot options"
          >
            <CopilotOutlineIcon />
          </button>
          <button
            type="button"
            className="ap-copilot-input__send-btn"
            aria-label="Send message"
            disabled={!canSend}
            onClick={handleSend}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
