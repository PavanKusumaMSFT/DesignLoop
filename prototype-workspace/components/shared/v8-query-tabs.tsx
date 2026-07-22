import React from 'react';
import FolderIcon from './v8-icons/services/folder-blank.svg?react';
import CloseIcon from './v8-icons/commands/close.svg?react';
import AddIcon from './v8-icons/commands/add.svg?react';
import './v8-query-tabs.css';

/* ===========================================
   Query Tab
   Individual tab for query windows
   =========================================== */

export interface QueryTabItem {
  /** Unique identifier */
  id: string;
  /** Tab title text */
  title: string;
  /** Optional custom icon (defaults to folder icon) */
  icon?: React.ReactNode;
}

export interface QueryTabProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tab title text */
  title: string;
  /** Optional custom icon (defaults to folder icon) */
  icon?: React.ReactNode;
  /** Whether the tab is selected */
  selected?: boolean;
  /** Click handler for close button */
  onClose?: () => void;
}

/**
 * QueryTab - Individual query tab component
 * 
 * Displays a tab with folder icon, title, and close button.
 */
export const QueryTab = React.forwardRef<HTMLDivElement, QueryTabProps>((
  {
    title,
    icon,
    selected = false,
    onClick,
    onClose,
    className = '',
    ...props
  },
  ref
) => {
  const classNames = [
    'ap-query-tab',
    selected && 'ap-query-tab--selected',
    className,
  ].filter(Boolean).join(' ');

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
    props.onKeyDown?.(e);
  };

  return (
    <div
      ref={ref}
      className={classNames}
      role="tab"
      tabIndex={0}
      aria-selected={selected}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      <span className="ap-query-tab__icon">
        {icon || <FolderIcon />}
      </span>
      <span className="ap-query-tab__title" title={title}>
        {title}
      </span>
      {onClose && (
        <button
          className="ap-query-tab__close"
          onClick={handleCloseClick}
          aria-label="Close tab"
          type="button"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
});

QueryTab.displayName = 'QueryTab';

/* ===========================================
   Query Tab Bar
   Container for query tabs with new tab button and toolbar
   =========================================== */

export interface QueryTabBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Array of tab items */
  tabs: QueryTabItem[];
  /** Currently selected tab ID */
  selectedId: string;
  /** Callback when a tab is selected */
  onSelect: (id: string) => void;
  /** Callback when a tab is closed */
  onClose?: (id: string) => void;
  /** Callback when new tab button is clicked */
  onNewTab?: () => void;
  /** Toolbar content (pinned to right) */
  toolbar?: React.ReactNode;
}

/**
 * QueryTabBar - Tab bar for query windows
 * 
 * Contains query tabs, a new tab button, and an optional toolbar.
 */
export function QueryTabBar({
  tabs,
  selectedId,
  onSelect,
  onClose,
  onNewTab,
  toolbar,
  className = '',
  ...props
}: QueryTabBarProps) {
  const classNames = [
    'ap-query-tab-bar',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="tablist" {...props}>
      <div className="ap-query-tab-bar__tabs">
        {tabs.map((tab) => (
          <QueryTab
            key={tab.id}
            title={tab.title}
            icon={tab.icon}
            selected={selectedId === tab.id}
            onClick={() => onSelect(tab.id)}
            onClose={onClose ? () => onClose(tab.id) : undefined}
          />
        ))}
        {onNewTab && (
          <button
            className="ap-query-tab-bar__new-tab"
            onClick={onNewTab}
            aria-label="New tab"
            type="button"
          >
            <AddIcon />
          </button>
        )}
      </div>
      {toolbar && (
        <div className="ap-query-tab-bar__toolbar">
          {toolbar}
        </div>
      )}
    </div>
  );
}
