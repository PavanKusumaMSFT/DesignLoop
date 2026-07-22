import CopilotColorIcon from './v8-icons/brand/copilot-color.svg?react';
import { useCopilot } from './v8-copilot-provider';
import './v8-copilot-warm-start.css';

/* ===========================================
   Copilot Warm Start
   Shown when the chat has no messages
   =========================================== */

export interface CopilotWarmStartProps {
  /** Called when a suggestion chip is clicked */
  onSuggestionClick?: (value: string) => void;
}

export function CopilotWarmStart({ onSuggestionClick }: CopilotWarmStartProps) {
  const { greeting, promptSuggestions } = useCopilot();

  return (
    <div className="ap-copilot-warm">
      <div className="ap-copilot-warm__icon">
        <CopilotColorIcon />
      </div>
      <p className="ap-copilot-warm__greeting">{greeting}</p>

      {promptSuggestions && promptSuggestions.length > 0 && (
        <div className="ap-copilot-warm__suggestions">
          {promptSuggestions.map((s) => (
            <button
              key={s.label}
              type="button"
              className="ap-copilot-suggestion"
              onClick={() => onSuggestionClick?.(s.value ?? s.label)}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
