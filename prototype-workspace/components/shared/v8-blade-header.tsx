import './v8-blade-header.css';

// Default icons
import ResourceIcon from './v8-icons/services/resource.svg?react';
import PinIcon from './v8-icons/commands/pin.svg?react';
import FavoriteIcon from './v8-icons/commands/favorite.svg?react';
import EllipsisIcon from './v8-icons/commands/ellipsis.svg?react';
import CloseIcon from './v8-icons/commands/close.svg?react';

export interface BladeHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Blade title text */
  title: string;
  /** Optional menu item name (shown after divider) */
  menuName?: string;
  /** Optional subtitle text */
  subtitle?: string;
  /** Custom icon element (defaults to Resource icon). Pass `false` to hide. */
  icon?: React.ReactNode | false;
  /** Show pin action icon */
  showPin?: boolean;
  /** Show favorites (star) action icon */
  showFavorites?: boolean;
  /** Show ellipsis (more) action icon */
  showEllipsis?: boolean;
  /** Callback when pin is clicked */
  onPinClick?: () => void;
  /** Callback when favorites is clicked */
  onFavoritesClick?: () => void;
  /** Callback when ellipsis is clicked */
  onEllipsisClick?: () => void;
  /** Callback when close is clicked */
  onCloseClick?: () => void;
}

/**
 * BladeHeader - Header component for Azure portal blades/panels
 * 
 * Displays an icon, title, optional menu name, action icons, and close button.
 */
export function BladeHeader({
  title,
  menuName,
  subtitle,
  icon,
  showPin = false,
  showFavorites = false,
  showEllipsis = false,
  onPinClick,
  onFavoritesClick,
  onEllipsisClick,
  onCloseClick,
  className = '',
  ...props
}: BladeHeaderProps) {
  const classNames = ['ap-blade-header', className].filter(Boolean).join(' ');
  const hasActions = showPin || showFavorites || showEllipsis;

  return (
    <header className={classNames} {...props}>
      {/* Icon */}
      {icon !== false && (
        <div className="ap-blade-header__icon">
          {icon || <ResourceIcon />}
        </div>
      )}

      {/* Content Stack */}
      <div className="ap-blade-header__content">
        {/* Title Row */}
        <div className="ap-blade-header__title-row">
          <h1 className="ap-blade-header__title">{title}</h1>

          {menuName && (
            <>
              <div className="ap-blade-header__divider" />
              <span className="ap-blade-header__menu-name">{menuName}</span>
            </>
          )}

          {hasActions && (
            <div className="ap-blade-header__actions">
              {showPin && (
                <button
                  type="button"
                  className="ap-blade-header__action"
                  onClick={onPinClick}
                  aria-label="Pin"
                >
                  <PinIcon />
                </button>
              )}
              {showFavorites && (
                <button
                  type="button"
                  className="ap-blade-header__action"
                  onClick={onFavoritesClick}
                  aria-label="Add to favorites"
                >
                  <FavoriteIcon />
                </button>
              )}
              {showEllipsis && (
                <button
                  type="button"
                  className="ap-blade-header__action"
                  onClick={onEllipsisClick}
                  aria-label="More options"
                >
                  <EllipsisIcon />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Subtitle — always rendered to maintain consistent title positioning */}
        <p className="ap-blade-header__subtitle">{subtitle}</p>
      </div>

      {/* Close Button */}
      <button
        type="button"
        className="ap-blade-header__close"
        onClick={onCloseClick}
        aria-label="Close"
      >
        <CloseIcon />
      </button>
    </header>
  );
}
