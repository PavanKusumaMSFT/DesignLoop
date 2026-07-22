import type { CopilotCardInstance } from './v8-copilot-types';
import { Button } from './v8-button';

import CopyIcon from './v8-icons/commands/copy.svg?react';
import StartIcon from './v8-icons/commands/start.svg?react';

import './v8-copilot-card-code.css';

/* ===========================================
   Code Card — Built-in card renderer
   Renders read-only code inside a Copilot message
   =========================================== */

export interface CodeCardProps {
  card: CopilotCardInstance;
}

/**
 * Expected `card.props`:
 * - `value: string` — the code text
 * - `language?: string` — syntax label (shown in header, no highlighting in this version)
 */
/**
 * Header actions rendered in the CopilotCard header alongside the title.
 * Registered via `headerActions` in the card registry.
 */
export function CodeCardHeaderActions({ card }: CodeCardProps) {
  const value = (card.props.value as string) ?? '';

  const handleCopy = () => {
    navigator.clipboard.writeText(value).catch(() => { /* fail silently */ });
  };

  return (
    <div className="ap-copilot-code-card__actions">
      <Button variant="secondary" icon={<StartIcon />} aria-label="Run" title="Run">Run</Button>
      <Button variant="secondary" icon={<CopyIcon />} aria-label="Copy" title="Copy" onClick={handleCopy}>Copy</Button>
    </div>
  );
}

export function CodeCard({ card }: CodeCardProps) {
  const value = (card.props.value as string) ?? '';

  return (
    <div className="ap-copilot-code-card">
      <pre className="ap-copilot-code-card__code"><code>{value}</code></pre>
    </div>
  );
}
