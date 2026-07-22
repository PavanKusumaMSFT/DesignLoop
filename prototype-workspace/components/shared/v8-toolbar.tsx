import React from 'react';
import ChevronDownIcon from './v8-icons/commands/chevron-down.svg?react';
import EllipsisIcon from './v8-icons/commands/ellipsis.svg?react';
import './v8-toolbar.css';

/* ===========================================
   Toolbar Item
   Individual command button in a toolbar
   =========================================== */

export interface ToolbarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon element to render (16x16) */
  icon?: React.ReactNode;
  /** Label text */
  label?: string;
  /** Whether this item has a dropdown menu */
  hasMenu?: boolean;
}

export const ToolbarItem = React.forwardRef<HTMLButtonElement, ToolbarItemProps>((
  {
    icon,
    label,
    hasMenu = false,
    className = '',
    children,
    ...props
  },
  ref
) => {
  const classNames = [
    'ap-toolbar-item',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button ref={ref} type="button" className={classNames} {...props}>
      {icon && <span className="ap-toolbar-item__icon">{icon}</span>}
      {label && <span className="ap-toolbar-item__label">{label}</span>}
      {children}
      {hasMenu && (
        <span className="ap-toolbar-item__chevron">
          <ChevronDownIcon />
        </span>
      )}
    </button>
  );
});

ToolbarItem.displayName = 'ToolbarItem';

/* ===========================================
   Toolbar Divider
   Vertical separator between toolbar items
   =========================================== */

export function ToolbarDivider({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['ap-toolbar__divider', className].filter(Boolean).join(' ')} role="separator" {...props} />;
}

/* ===========================================
   Toolbar Overflow
   Overflow menu button (ellipsis)
   =========================================== */

export interface ToolbarOverflowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const ToolbarOverflow = React.forwardRef<HTMLButtonElement, ToolbarOverflowProps>((
  {
    className = '',
    ...props
  },
  ref
) => {
  const classNames = [
    'ap-toolbar-overflow',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button ref={ref} type="button" className={classNames} aria-label="More commands" {...props}>
      <EllipsisIcon />
    </button>
  );
});

ToolbarOverflow.displayName = 'ToolbarOverflow';

/* ===========================================
   Toolbar
   Container for toolbar items
   =========================================== */

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Toolbar items */
  children: React.ReactNode;
}

export function Toolbar({
  className = '',
  children,
  ...props
}: ToolbarProps) {
  const classNames = [
    'ap-toolbar',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="toolbar" {...props}>
      {children}
    </div>
  );
}
