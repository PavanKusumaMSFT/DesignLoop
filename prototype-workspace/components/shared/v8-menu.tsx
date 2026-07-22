import React from 'react';
import './v8-menu.css';

/* ===========================================
   Menu Item
   Individual item in a dropdown menu
   =========================================== */

export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon element to render (16x16) */
  icon?: React.ReactNode;
  /** Label text */
  label: string;
}

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>((
  {
    icon,
    label,
    className = '',
    ...props
  },
  ref
) => {
  const classNames = [
    'ap-menu-item',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button ref={ref} type="button" className={classNames} {...props}>
      {icon && <span className="ap-menu-item__icon">{icon}</span>}
      <span className="ap-menu-item__label">{label}</span>
    </button>
  );
});

MenuItem.displayName = 'MenuItem';

/* ===========================================
   Menu Divider
   Horizontal separator between menu items
   =========================================== */

export function MenuDivider({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={['ap-menu__divider', className].filter(Boolean).join(' ')} role="separator" {...props} />;
}

/* ===========================================
   Menu
   Container for menu items
   =========================================== */

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Menu items */
  children: React.ReactNode;
}

export function Menu({
  className = '',
  children,
  ...props
}: MenuProps) {
  const classNames = [
    'ap-menu',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} role="menu" {...props}>
      {children}
    </div>
  );
}
