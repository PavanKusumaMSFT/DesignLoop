/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
import React from 'react';
import type { CopilotToast as CopilotToastData } from './v8-copilot-types';
import { CopilotToastIcon } from './v8-copilot-toast-icon';
import CloseIcon from './v8-icons/commands/close.svg?react';
import './v8-copilot-toast.css';

/* ===========================================
   Copilot Toast
   Individual toast notification card with
   animated gradient border and status icon
   =========================================== */

export interface CopilotToastProps {
  /** Toast data */
  toast: CopilotToastData;
  /** Called when close button is clicked */
  onClose?: (id: string) => void;
  /** Called when the toast body is clicked */
  onClick?: (toast: CopilotToastData) => void;
  /** Animation state */
  animationState?: 'entering' | 'exiting' | 'idle';
  /** Optional className */
  className?: string;
  /** Style overrides (used by stack for positioning) */
  style?: React.CSSProperties;
}

export function CopilotToast({
  toast,
  onClose,
  onClick,
  animationState = 'idle',
  className = '',
  style,
}: CopilotToastProps) {
  const showClose = toast.showClose !== false;

  const classNames = [
    'ap-copilot-toast',
    animationState === 'entering' && 'ap-copilot-toast--entering',
    animationState === 'exiting' && 'ap-copilot-toast--exiting',
    className,
  ].filter(Boolean).join(' ');

  const handleClick = (e: React.MouseEvent) => {
    // Don't fire onClick if close button was clicked
    if ((e.target as HTMLElement).closest('.ap-copilot-toast__close')) return;
    onClick?.(toast);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.onDismiss?.(toast);
    onClose?.(toast.id);
  };

  return (
    <div
      className={classNames}
      style={style}
      onClick={handleClick}
      role="status"
      aria-live="polite"
    >
      <div className="ap-copilot-toast__inner">
        {/* Header */}
        <div className="ap-copilot-toast__header">
          <CopilotToastIcon variant={toast.variant} />
          <span className="ap-copilot-toast__title">{toast.title}</span>
          {showClose && (
            <button
              type="button"
              className="ap-copilot-toast__close"
              onClick={handleClose}
              aria-label="Close notification"
            >
              <CloseIcon />
            </button>
          )}
        </div>

        {/* Body */}
        {toast.body && (
          <div className="ap-copilot-toast__body">{toast.body}</div>
        )}

        {/* Actions */}
        {toast.actions && (
          <div className="ap-copilot-toast__actions">{toast.actions}</div>
        )}
      </div>
    </div>
  );
}
