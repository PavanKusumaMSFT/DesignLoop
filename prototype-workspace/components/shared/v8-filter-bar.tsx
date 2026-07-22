import React from 'react';
import FilterIcon from './v8-icons/commands/filter.svg?react';
import './v8-filter-bar.css';

/* ===========================================
   Filter Bar
   Horizontal bar with search, filters, and grouping
   =========================================== */

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Search input component (optional) */
  searchInput?: React.ReactNode;
  /** Filter pills and other content */
  children?: React.ReactNode;
  /** Group by dropdown component (optional, pinned to right) */
  groupByDropdown?: React.ReactNode;
}

export function FilterBar({
  searchInput,
  children,
  groupByDropdown,
  className = '',
  ...props
}: FilterBarProps) {
  const classNames = [
    'ap-filter-bar',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} {...props}>
      {searchInput && (
        <div className="ap-filter-bar__search">
          {searchInput}
        </div>
      )}
      <div className="ap-filter-bar__pills">
        {children}
      </div>
      {groupByDropdown && (
        <div className="ap-filter-bar__group-by">
          {groupByDropdown}
        </div>
      )}
    </div>
  );
}

/* ===========================================
   Filter Bar Add Button
   Button to add new filters
   =========================================== */

export interface FilterBarAddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button label */
  label?: string;
}

export const FilterBarAddButton = React.forwardRef<HTMLButtonElement, FilterBarAddButtonProps>((
  {
    label = 'Add filter',
    className = '',
    ...props
  },
  ref
) => {
  const classNames = [
    'ap-filter-bar__add',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button ref={ref} type="button" className={classNames} {...props}>
      <span className="ap-filter-bar__add-icon">
        <FilterIcon />
      </span>
      {label}
    </button>
  );
});

FilterBarAddButton.displayName = 'FilterBarAddButton';
