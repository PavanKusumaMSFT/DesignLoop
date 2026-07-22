import type { CopilotCardInstance } from './v8-copilot-types';
import { Button } from './v8-button';

import ViewIcon from './v8-icons/commands/view.svg?react';

import './v8-copilot-card-resource.css';

/* ===========================================
   Resource Card — Built-in card renderer
   Renders an Azure resource link inside a
   Copilot message (icon, name, type, etc.)
   =========================================== */

export interface ResourceCardMeta {
  label: string;
  value: React.ReactNode;
  href?: string;
}

export interface ResourceCardProps {
  card: CopilotCardInstance;
}

/**
 * Expected `card.props`:
 * - `name: string` — resource display name
 * - `type?: string` — resource type label (e.g. "Storage account")
 * - `icon?: React.ReactNode` — resource type icon (rendered externally)
 * - `status?: string` — status text (e.g. "Running")
 * - `statusVariant?: 'success' | 'warning' | 'error' | 'info'`
 * - `href?: string` — link target for the View button
 * - `meta?: ResourceCardMeta[]` — additional metadata rows
 */
export function ResourceCard({ card }: ResourceCardProps) {
  const name = (card.props.name as string) ?? 'Unnamed resource';
  const type = card.props.type as string | undefined;
  const status = card.props.status as string | undefined;
  const statusVariant = (card.props.statusVariant as string) ?? 'info';
  const meta = card.props.meta as ResourceCardMeta[] | undefined;
  const icon = card.props.icon as React.ReactNode | undefined;

  const statusClass = status
    ? `ap-copilot-resource-card__status--${statusVariant}`
    : '';

  return (
    <div className="ap-copilot-resource-card">
      {/* Top row: icon + name/type + status */}
      <div className="ap-copilot-resource-card__header-row">
        {icon && (
          <span className="ap-copilot-resource-card__icon">{icon}</span>
        )}
        <div className="ap-copilot-resource-card__info">
          <span className="ap-copilot-resource-card__name">{name}</span>
          {type && (
            <span className="ap-copilot-resource-card__type">{type}</span>
          )}
        </div>
        {status && (
          <span className={`ap-copilot-resource-card__status ${statusClass}`}>
            <span className="ap-copilot-resource-card__status-dot" />
            {status}
          </span>
        )}
      </div>

      {/* Metadata */}
      {meta && meta.length > 0 && (
        <div className="ap-copilot-resource-card__meta">
          {meta.map((m) => (
            <div key={String(m.label)} className="ap-copilot-resource-card__meta-row">
              <span className="ap-copilot-resource-card__meta-label">{m.label}</span>
              <span className="ap-copilot-resource-card__meta-value">
                {m.href ? (
                  <a
                    className="ap-copilot-resource-card__meta-link"
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {m.value}
                  </a>
                ) : (
                  m.value
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Header actions for the resource card — renders a "View" button
 * when the card has an `href` prop.
 */
export function ResourceCardHeaderActions({ card }: { card: CopilotCardInstance }) {
  const href = card.props.href as string | undefined;
  if (!href) return null;

  return (
    <Button
      variant="secondary"
      icon={<ViewIcon />}
      onClick={() => window.open(href, '_blank', 'noopener,noreferrer')}
    >
      View
    </Button>
  );
}
