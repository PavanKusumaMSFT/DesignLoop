import React from 'react';
import CloseIcon from './v8-icons/commands/close.svg?react';
import './v8-filter-pill.css';

/* ===========================================
   Filter Pill
   Clickable filter chip for filter bars
   =========================================== */

export interface FilterPillProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Filter name (e.g., "Status", "Type") */
  name?: string;
  /** Modifier/operator displayed after name (e.g., ":", "equals", "contains") */
  modifier?: string;
  /** Filter value displayed after modifier */
  value?: string;
  /** Icon element to render on the left (16x16) */
  icon?: React.ReactNode;
  /** Whether to show dismiss (X) button */
  dismissible?: boolean;
  /** Callback when dismiss button is clicked */
  onDismiss?: (e: React.MouseEvent) => void;
}

export const FilterPill = React.forwardRef<HTMLButtonElement, FilterPillProps>((
  {
    name = 'Filter name',
    modifier = ':',
    value = 'Value',
    icon,
    dismissible = false,
    onDismiss,
    className = '',
    disabled,
    ...props
  },
  ref
) => {
  const classNames = [
    'ap-filter-pill',
    className,
  ].filter(Boolean).join(' ');

  const handleDismissClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the pill's onClick
    onDismiss?.(e);
  };

  return (
    <button ref={ref} className={classNames} disabled={disabled} type="button" {...props}>
      {icon && <span className="ap-filter-pill__icon">{icon}</span>}
      <span className="ap-filter-pill__content">
        <span className="ap-filter-pill__name">{name}</span>
        <span className="ap-filter-pill__separator">{modifier}</span>
        <span className="ap-filter-pill__value">{value}</span>
      </span>
      {dismissible && (
        <span 
          className="ap-filter-pill__dismiss"
          onClick={disabled ? undefined : handleDismissClick}
          role="button"
          aria-label="Remove filter"
        >
          <CloseIcon />
        </span>
      )}
    </button>
  );
});

FilterPill.displayName = 'FilterPill';
