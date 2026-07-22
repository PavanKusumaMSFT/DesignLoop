import React from 'react';
import './v8-copilot-button.css';
import CopilotIcon from './v8-icons/brand/copilot-color.svg?react';

export interface CopilotButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button contents - typically "Copilot" */
  children?: React.ReactNode;
}

/**
 * CopilotButton - Branded Copilot button for header/navigation
 * 
 * Follows Button component patterns for potential future extraction:
 * - Same prop interface structure
 * - Same CSS class naming conventions (ap-copilot-button)
 * - Uses semantic tokens (--button-copilot-*)
 * 
 * Can be:
 * 1. Merged into Button as `variant="copilot"` if no further variation needed
 * 2. Kept standalone if Copilot branding evolves independently
 */
export const CopilotButton = React.forwardRef<HTMLButtonElement, CopilotButtonProps>((
  {
    className = '',
    children = 'Copilot',
    ...props
  },
  ref
) => {
  const classNames = [
    'ap-copilot-button',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button ref={ref} type="button" className={classNames} {...props}>
      <span className="ap-copilot-button__icon">
        <CopilotIcon />
      </span>
      <span className="ap-copilot-button__text">{children}</span>
    </button>
  );
});

CopilotButton.displayName = 'CopilotButton';
