import React from 'react';
import './v8-header-search.css';

export interface HeaderSearchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Whether the search dropdown/menu is open (shows open state styling) */
  open?: boolean;
  /** Icon element to render on the left side (typically search icon) */
  iconStart?: React.ReactNode;
}

/**
 * HeaderSearch - Search input styled for the Azure header bar
 * 
 * Designed to sit on the blue header background with specific styling:
 * - Rest: Blue-tinted background with blue text/icons
 * - Focus: White background with dark text and inner border
 * - Open: White background, no border (when dropdown menu is shown)
 */
export const HeaderSearch = React.forwardRef<HTMLInputElement, HeaderSearchProps>(
  ({ open = false, iconStart, className = '', ...props }, ref) => {
    const wrapperClasses = [
      'ap-header-search',
      open && 'ap-header-search--open',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={wrapperClasses}>
        {iconStart && (
          <span className="ap-header-search__icon">
            {iconStart}
          </span>
        )}
        <input
          ref={ref}
          type="text"
          className="ap-header-search__field"
          {...props}
        />
      </div>
    );
  }
);

HeaderSearch.displayName = 'HeaderSearch';
