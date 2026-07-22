/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
import './v8-breadcrumb.css';
import ChevronRightIcon from './v8-icons/commands/chevron-right.svg?react';

export interface BreadcrumbItem {
  /** Display text for the breadcrumb */
  label: string;
  /** URL for the breadcrumb link */
  href?: string;
  /** Click handler (alternative to href) */
  onClick?: () => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb - Navigation breadcrumb trail
 * 
 * Displays a hierarchical path with clickable links separated by chevron icons.
 */
export function Breadcrumb({ items, className = '', ...props }: BreadcrumbProps) {
  const classNames = ['ap-breadcrumb', className].filter(Boolean).join(' ');

  return (
    <nav className={classNames} aria-label="Breadcrumb" {...props}>
      {items.map((item, index) => (
        <span key={index} style={{ display: 'contents' }}>
          {item.href ? (
            <a className="ap-breadcrumb__item" href={item.href}>
              {item.label}
            </a>
          ) : (
            <button
              type="button"
              className="ap-breadcrumb__item"
              onClick={item.onClick}
            >
              {item.label}
            </button>
          )}
          {index < items.length - 1 && (
            <span className="ap-breadcrumb__separator" aria-hidden="true">
              <ChevronRightIcon />
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
