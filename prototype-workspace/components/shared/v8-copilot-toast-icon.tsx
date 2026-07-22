import type { CopilotToastVariant } from './v8-copilot-types';
import CopilotIcon from './v8-icons/brand/copilot-color.svg?react';
import CheckIcon from './v8-icons/commands/check.svg?react';
import ErrorIcon from './v8-icons/status/error.svg?react';
import './v8-copilot-toast-icon.css';

/* ===========================================
   Copilot Toast Icon
   Animated Copilot-branded status indicator
   =========================================== */

export interface CopilotToastIconProps {
  /** Variant controls icon choice and animation */
  variant: CopilotToastVariant;
  /** Optional className override */
  className?: string;
}

export function CopilotToastIcon({ variant, className = '' }: CopilotToastIconProps) {
  const classNames = [
    'ap-copilot-toast-icon',
    `ap-copilot-toast-icon--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  let icon: React.ReactNode;
  switch (variant) {
    case 'completed':
      icon = <CheckIcon />;
      break;
    case 'error':
      icon = <ErrorIcon />;
      break;
    case 'progress':
    case 'input-required':
    case 'generic':
    default:
      icon = <CopilotIcon />;
      break;
  }

  return (
    <span className={classNames} aria-hidden="true">
      {icon}
    </span>
  );
}
