import React from 'react';
import ErrorIcon from './v8-icons/status/error.svg?react';
import './v8-tabs.css';

export interface TabItem {
  /** Unique identifier */
  id: string;
  /** Tab label text */
  label: string;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Whether the tab has an error state */
  hasError?: boolean;
}

export interface TabBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Array of tab items */
  tabs: TabItem[];
  /** Currently selected tab ID */
  selectedId: string;
  /** Callback when a tab is selected */
  onSelect: (id: string) => void;
}

/**
 * TabBar - Horizontal tab navigation container
 * 
 * Displays a row of tabs where only one can be active at a time.
 */
export function TabBar({
  tabs,
  selectedId,
  onSelect,
  className = '',
  ...props
}: TabBarProps) {
  const classNames = ['ap-tab-bar', className].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="tablist" {...props}>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          {...tab}
          selected={selectedId === tab.id}
          onClick={() => !tab.disabled && onSelect(tab.id)}
        />
      ))}
    </div>
  );
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Tab label text */
  label: string;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Whether the tab is selected */
  selected?: boolean;
  /** Whether the tab has an error state */
  hasError?: boolean;
}

/**
 * Tab - Individual tab component
 * 
 * Can be used standalone or within a TabBar.
 */
export const Tab = React.forwardRef<HTMLButtonElement, TabProps>((
  {
    label,
    icon,
    selected = false,
    disabled = false,
    hasError = false,
    onClick,
    className = '',
    ...props
  },
  ref
) => {
  const classNames = [
    'ap-tab',
    selected && 'ap-tab--selected',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type="button"
      className={classNames}
      role="tab"
      aria-selected={selected}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {(icon || hasError) && (
        <span className="ap-tab__icon">
          {hasError ? <ErrorIcon /> : icon}
        </span>
      )}
      <span className="ap-tab__label">{label}</span>
    </button>
  );
});

Tab.displayName = 'Tab';
