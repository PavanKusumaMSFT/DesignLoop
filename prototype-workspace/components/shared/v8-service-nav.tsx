import './v8-service-nav.css';
import { useState, useCallback, useMemo } from 'react';

// Icons
import ChevronRightIcon from './v8-icons/commands/chevron-right.svg?react';
import FavoriteIcon from './v8-icons/commands/favorite.svg?react';
import OpenIcon from './v8-icons/commands/open.svg?react';
import DoubleChevronIcon from './v8-icons/commands/double-chevron.svg?react';

export interface ServiceNavItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon element (from /icons/services/) */
  icon?: React.ReactNode;
  /** Whether item can be favorited */
  canFavorite?: boolean;
  /** Whether item is currently favorited */
  isFavorited?: boolean;
}

export interface ServiceNavGroup {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Child items */
  items: ServiceNavItem[];
  /** Whether group is initially expanded */
  defaultExpanded?: boolean;
}

export type ServiceNavEntry = 
  | ({ type: 'item' } & ServiceNavItem)
  | ({ type: 'group' } & ServiceNavGroup);

export interface ServiceNavProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** Navigation entries (items and groups) */
  entries: ServiceNavEntry[];
  /** Currently selected item ID */
  selectedId?: string;
  /** Callback when item is selected */
  onSelect?: (id: string) => void;
  /** Callback when item is favorited/unfavorited */
  onFavoriteToggle?: (id: string, isFavorited: boolean) => void;
  /** Controlled expanded group IDs (optional - if not provided, uses internal state) */
  expandedGroupIds?: string[];
  /** Callback when expanded groups change (for controlled mode) */
  onExpandedChange?: (expandedIds: string[]) => void;
  /** Custom search input component (optional - replaces default search) */
  searchInput?: React.ReactNode;
  /** Search placeholder text (only used with default search input) */
  searchPlaceholder?: string;
  /** Callback when search value changes (only used with default search input) */
  onSearchChange?: (value: string) => void;
}

/**
 * ServiceNav - Left navigation panel (Table of Contents) for Azure blades
 * 
 * Displays a searchable, hierarchical navigation menu with items and collapsible groups.
 * Supports both controlled and uncontrolled expansion state.
 */
export function ServiceNav({
  entries,
  selectedId,
  onSelect,
  onFavoriteToggle,
  expandedGroupIds,
  onExpandedChange,
  searchInput,
  searchPlaceholder = 'Search',
  onSearchChange,
  className = '',
  ...props
}: ServiceNavProps) {
  const classNames = ['ap-service-nav', className].filter(Boolean).join(' ');

  // Determine if we're in controlled mode
  const isControlled = expandedGroupIds !== undefined;

  // Internal state for uncontrolled mode
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    entries.forEach(entry => {
      if (entry.type === 'group' && entry.defaultExpanded) {
        initial.add(entry.id);
      }
    });
    return initial;
  });

  // Use controlled or internal state
  const expandedSet = useMemo(() => {
    return isControlled ? new Set(expandedGroupIds) : internalExpanded;
  }, [isControlled, expandedGroupIds, internalExpanded]);

  const updateExpanded = useCallback((newSet: Set<string>) => {
    if (isControlled) {
      onExpandedChange?.(Array.from(newSet));
    } else {
      setInternalExpanded(newSet);
    }
  }, [isControlled, onExpandedChange]);

  const toggleGroup = useCallback((groupId: string) => {
    const next = new Set(expandedSet);
    if (next.has(groupId)) {
      next.delete(groupId);
    } else {
      next.add(groupId);
    }
    updateExpanded(next);
  }, [expandedSet, updateExpanded]);

  const expandAll = useCallback(() => {
    const allGroupIds = entries
      .filter(e => e.type === 'group')
      .map(e => e.id);
    updateExpanded(new Set(allGroupIds));
  }, [entries, updateExpanded]);

  const collapseAll = useCallback(() => {
    updateExpanded(new Set());
  }, [updateExpanded]);

  const handleItemClick = useCallback((id: string) => {
    onSelect?.(id);
  }, [onSelect]);

  const handleFavoriteClick = useCallback((e: React.MouseEvent, id: string, currentState: boolean) => {
    e.stopPropagation();
    onFavoriteToggle?.(id, !currentState);
  }, [onFavoriteToggle]);

  const renderItem = (item: ServiceNavItem, isChild: boolean = false) => {
    const isSelected = selectedId === item.id;
    const itemClasses = [
      'ap-service-nav__item',
      isSelected && 'ap-service-nav__item--selected',
      isChild && 'ap-service-nav__item--child',
    ].filter(Boolean).join(' ');

    return (
      <div
        key={item.id}
        role="button"
        tabIndex={0}
        className={itemClasses}
        onClick={() => handleItemClick(item.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleItemClick(item.id);
          }
        }}
        aria-current={isSelected ? 'page' : undefined}
      >
        {item.icon && (
          <span className="ap-service-nav__item-icon">
            {item.icon}
          </span>
        )}
        <span className="ap-service-nav__item-label">{item.label}</span>
        {item.canFavorite && (
          <button
            type="button"
            className={`ap-service-nav__item-action ${item.isFavorited ? 'ap-service-nav__item-action--visible' : ''}`}
            onClick={(e) => handleFavoriteClick(e, item.id, item.isFavorited || false)}
            aria-label={item.isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FavoriteIcon />
          </button>
        )}
      </div>
    );
  };

  const renderGroup = (group: ServiceNavGroup) => {
    const isExpanded = expandedSet.has(group.id);
    const groupClasses = [
      'ap-service-nav__group',
      isExpanded && 'ap-service-nav__group--expanded',
    ].filter(Boolean).join(' ');

    const buttonClasses = [
      'ap-service-nav__item',
      isExpanded && 'ap-service-nav__item--expanded',
    ].filter(Boolean).join(' ');

    return (
      <div key={group.id} className={groupClasses}>
        <button
          type="button"
          className={buttonClasses}
          onClick={() => toggleGroup(group.id)}
          aria-expanded={isExpanded}
        >
          <span className="ap-service-nav__item-icon ap-service-nav__item-icon--chevron">
            <ChevronRightIcon />
          </span>
          <span className="ap-service-nav__item-label">{group.label}</span>
        </button>
        <div className="ap-service-nav__group-children">
          {group.items.map(item => renderItem(item, true))}
        </div>
      </div>
    );
  };

  // Default search input (used when searchInput prop not provided)
  const defaultSearchInput = (
    <input
      type="text"
      className="ap-service-nav__search-input"
      placeholder={searchPlaceholder}
      onChange={(e) => onSearchChange?.(e.target.value)}
    />
  );

  return (
    <nav className={classNames} aria-label="Service navigation" {...props}>
      {/* Search Header */}
      <div className="ap-service-nav__header">
        <div className="ap-service-nav__search">
          {searchInput || defaultSearchInput}
        </div>
        <button
          type="button"
          className="ap-service-nav__header-action"
          onClick={expandAll}
          aria-label="Expand all"
        >
          <OpenIcon />
        </button>
        <button
          type="button"
          className="ap-service-nav__header-action ap-service-nav__header-action--collapse"
          onClick={collapseAll}
          aria-label="Collapse all"
        >
          <DoubleChevronIcon />
        </button>
      </div>

      {/* Menu Items */}
      <div className="ap-service-nav__menu" role="menu">
        {entries.map(entry => {
          if (entry.type === 'item') {
            return renderItem(entry);
          } else {
            return renderGroup(entry);
          }
        })}
      </div>
    </nav>
  );
}
