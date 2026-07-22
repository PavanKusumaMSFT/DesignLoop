import './v8-site-header.css';
import { Button } from './v8-button';
import { CopilotButton } from './v8-copilot-button';
import { HeaderSearch } from './v8-header-search';

// Import icons
import WaffleIcon from './v8-icons/commands/waffle.svg?react';
import HamburgerIcon from './v8-icons/commands/hamburger.svg?react';
import SearchIcon from './v8-icons/commands/search.svg?react';
import CloudShellIcon from './v8-icons/commands/cloud-shell.svg?react';
import NotificationIcon from './v8-icons/commands/notification.svg?react';
import GearIcon from './v8-icons/commands/gear.svg?react';
import QuestionCircleIcon from './v8-icons/commands/question-circle.svg?react';
import FeedbackIcon from './v8-icons/commands/feedback.svg?react';

export interface SiteHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** User's display name */
  userName?: string;
  /** User's company/organization */
  userCompany?: string;
  /** Avatar image URL */
  avatarUrl?: string;
  /** Callback when search value changes */
  onSearchChange?: (value: string) => void;
  /** Search input placeholder */
  searchPlaceholder?: string;
}

/**
 * SiteHeader - Azure portal header bar
 * 
 * Full-width header with three sections:
 * - Left: Navigation (waffle, hamburger) + branding
 * - Center: Search + Copilot
 * - Right: Toolbar icons + user info
 */
export function SiteHeader({
  userName = 'User Name',
  userCompany = 'COMPANY',
  avatarUrl,
  onSearchChange,
  searchPlaceholder = 'Search resources, services, and docs (G+/)',
  className = '',
  ...props
}: SiteHeaderProps) {
  const classNames = ['ap-site-header', className].filter(Boolean).join(' ');

  return (
    <header className={classNames} {...props}>
      {/* Left section */}
      <div className="ap-site-header__left">
        <Button variant="icon" icon={<WaffleIcon />} aria-label="Microsoft apps" />
        <Button variant="icon" icon={<HamburgerIcon />} aria-label="Portal menu" />
        <span className="ap-site-header__brand">Microsoft Azure</span>
      </div>

      {/* Center section */}
      <div className="ap-site-header__center">
        <HeaderSearch
          placeholder={searchPlaceholder}
          iconStart={<SearchIcon />}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
        <CopilotButton />
      </div>

      {/* Right section */}
      <div className="ap-site-header__right">
        <div className="ap-site-header__toolbar">
          <Button variant="icon" icon={<CloudShellIcon />} aria-label="Cloud Shell" />
          <Button variant="icon" icon={<NotificationIcon />} aria-label="Notifications" />
          <Button variant="icon" icon={<GearIcon />} aria-label="Settings" />
          <Button variant="icon" icon={<QuestionCircleIcon />} aria-label="Help" />
          <Button variant="icon" icon={<FeedbackIcon />} aria-label="Feedback" />
        </div>

        <div className="ap-site-header__user">
          <div className="ap-site-header__user-info">
            <span className="ap-site-header__user-name">{userName}</span>
            <span className="ap-site-header__user-company">{userCompany}</span>
          </div>
          <div className="ap-site-header__avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt={userName} />
            ) : (
              <span className="ap-site-header__avatar-placeholder">
                {userName.charAt(0)}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
