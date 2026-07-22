import React from 'react';
import './v8-info-box.css';

import InfoOutlineIcon from './v8-icons/status/info-outline.svg?react';
import SuccessOutlineIcon from './v8-icons/status/success-outline.svg?react';
import WarningOutlineIcon from './v8-icons/status/warning-outline.svg?react';
import ErrorOutlineIcon from './v8-icons/status/error-outline.svg?react';
import UpsellIcon from './v8-icons/status/upsell.svg?react';
import BlockedOutlineIcon from './v8-icons/status/blocked-outline.svg?react';
import WarningSevereOutlineIcon from './v8-icons/status/warning-severe-outline.svg?react';
import CloseIcon from './v8-icons/commands/close.svg?react';

export type InfoBoxVariant =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'upsell'
  | 'blocked'
  | 'severe-warning';

const variantIcons: Record<InfoBoxVariant, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  info: InfoOutlineIcon,
  success: SuccessOutlineIcon,
  warning: WarningOutlineIcon,
  error: ErrorOutlineIcon,
  upsell: UpsellIcon,
  blocked: BlockedOutlineIcon,
  'severe-warning': WarningSevereOutlineIcon,
};

export interface InfoBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant */
  variant?: InfoBoxVariant;
  /** Whether the infobox can be dismissed */
  dismissable?: boolean;
  /** Callback when dismiss button is clicked */
  onDismiss?: () => void;
  /** Optional hyperlink rendered after children */
  link?: {
    text: string;
    href?: string;
    onClick?: () => void;
  };
  /** Message content */
  children: React.ReactNode;
}

export function InfoBox({
  variant = 'info',
  dismissable = false,
  onDismiss,
  link,
  children,
  className = '',
  ...props
}: InfoBoxProps) {
  const Icon = variantIcons[variant];

  const classNames = [
    'ap-infobox',
    `ap-infobox--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="status" {...props}>
      <span className="ap-infobox__icon">
        <Icon />
      </span>
      <div className="ap-infobox__content">
        <span className="ap-infobox__message">{children}</span>
        {link && (
          <a
            className="ap-infobox__link"
            href={link.href}
            onClick={link.onClick}
          >
            {link.text}
          </a>
        )}
      </div>
      {dismissable && (
        <button
          type="button"
          className="ap-infobox__dismiss"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
