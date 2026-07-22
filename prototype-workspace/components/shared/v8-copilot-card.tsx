import { useCopilot } from './v8-copilot-provider';
import type { CopilotCardInstance } from './v8-copilot-types';
import './v8-copilot-card.css';

/* ===========================================
   Copilot Card
   Wrapper that resolves a card instance to a
   registered renderer component
   =========================================== */

export interface CopilotCardProps {
  card: CopilotCardInstance;
}

export function CopilotCard({ card }: CopilotCardProps) {
  const { cardRegistry } = useCopilot();
  const entry = cardRegistry[card.type];

  if (!entry) {
    return (
      <div className="ap-copilot-card ap-copilot-card--unknown">
        <span className="ap-copilot-card__unknown-label">
          Unknown card type: {card.type}
        </span>
      </div>
    );
  }

  const Renderer = entry.component;
  const HeaderActions = entry.headerActions;
  const showHeader = !entry.hideHeader && card.title;

  return (
    <div className="ap-copilot-card">
      {showHeader && (
        <div className="ap-copilot-card__header">
          <span className="ap-copilot-card__title">{card.title}</span>
          {HeaderActions && <HeaderActions card={card} />}
        </div>
      )}
      <div className="ap-copilot-card__body">
        <Renderer card={card} />
      </div>
    </div>
  );
}
