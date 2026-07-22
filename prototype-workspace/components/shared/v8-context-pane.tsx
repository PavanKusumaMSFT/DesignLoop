import React from 'react';
import CloseIcon from './v8-icons/commands/close.svg?react';
import './v8-context-pane.css';

/* ===========================================
   Context Pane
   Right-side panel for forms, details, etc.
   =========================================== */

export type ContextPaneSize = 'narrow' | 'medium' | 'wide' | 'extra-wide';

export interface ContextPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Panel title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Panel size */
  size?: ContextPaneSize;
  /** Callback when close button is clicked */
  onClose?: () => void;
  /** Footer actions (buttons) */
  footerActions?: React.ReactNode;
  /** Footer link (e.g., "Give feedback") */
  footerLink?: React.ReactNode;
  /** Panel content */
  children?: React.ReactNode;
}

export function ContextPane({
  title,
  subtitle,
  size = 'medium',
  onClose,
  footerActions,
  footerLink,
  children,
  className = '',
  ...props
}: ContextPaneProps) {
  const classNames = [
    'ap-context-pane',
    `ap-context-pane--${size}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      <header className="ap-context-pane__header">
        <div className="ap-context-pane__header-content">
          <span className="ap-context-pane__title">{title}</span>
          {subtitle && <p className="ap-context-pane__subtitle">{subtitle}</p>}
        </div>
        {onClose && (
          <button 
            type="button"
            className="ap-context-pane__close" 
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        )}
      </header>

      <div className="ap-context-pane__content">
        {children}
      </div>

      {(footerActions || footerLink) && (
        <footer className="ap-context-pane__footer">
          <div className="ap-context-pane__footer-actions">
            {footerActions}
          </div>
          {footerLink}
        </footer>
      )}
    </div>
  );
}

/* ===========================================
   Context Pane Footer Link
   Styled link for footer (e.g., "Give feedback")
   =========================================== */

export interface ContextPaneFooterLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Link icon */
  icon?: React.ReactNode;
  /** Link text */
  children: React.ReactNode;
}

export function ContextPaneFooterLink({
  icon,
  children,
  className = '',
  ...props
}: ContextPaneFooterLinkProps) {
  const classNames = [
    'ap-context-pane__footer-link',
    className,
  ].filter(Boolean).join(' ');

  return (
    <a className={classNames} {...props}>
      {icon}
      {children}
    </a>
  );
}
