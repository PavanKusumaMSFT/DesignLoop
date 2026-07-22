import { useCallback, useRef, useState } from 'react';
import styles from './OverlayHost.module.css';
import { GhostTextCompletion } from '../components/GhostTextCompletion/GhostTextCompletion';
import { ParameterPalette } from '../components/ParameterPalette/ParameterPalette';
import { ResourceLookupList } from '../components/ResourceLookupList/ResourceLookupList';
import { HintLine } from '../components/HintLine/HintLine';
import { useCapability, type CapabilityInput } from '../hooks/useCapability';
import type {
  ParamGroup,
  ParamItem,
  ResourceItem,
  ResourceStatus,
} from '../types';

/** Which single overlay (if any) is currently anchored under the caret line. */
export type ActiveOverlay = 'none' | 'palette' | 'resource';

export interface OverlayHostProps {
  /** the shell prompt string, e.g. "$ ". */
  prompt?: string;
  /** the already-typed command text (always fully visible + editable). */
  command: string;
  /** capability probe inputs driving the rich -> plain -> suppressed cascade. */
  capability: CapabilityInput;

  /** ghost text (State A). */
  ghostSuggestion?: string | null;
  ghostMatchedPrefix?: string;

  /** hint line (State D). */
  hint?: { message: string; shortcut?: { keys: string; action: string } };

  /** which overlay is open + its data. */
  activeOverlay?: ActiveOverlay;
  paletteContext?: string;
  paletteFreshness?: 'cached' | 'live';
  paletteGroups?: ParamGroup[];
  resourceType?: string;
  subscriptionLabel?: string;
  resourceStatus?: ResourceStatus;
  resourceItems?: ResourceItem[];

  onAcceptGhost?: (accepted: string) => void;
  onSelectParam?: (item: ParamItem) => void;
  onSelectResource?: (item: ResourceItem) => void;
}

const PALETTE_ID = 'cirrus-palette';
const RESOURCE_ID = 'cirrus-resource';

/**
 * The single positioned container that anchors under the caret line and holds at
 * most one of ParameterPalette / ResourceLookupList, plus optionally HintLine and
 * inline GhostTextCompletion. Owns the shared keyboard contract so children never
 * trap the user: Enter / Ctrl+C / Ctrl+L / tmux prefixes are NEVER intercepted;
 * only Tab / ArrowUp/Down / Esc / Ctrl+Space are handled, and only while open.
 */
export function OverlayHost({
  prompt = '$ ',
  command,
  capability,
  ghostSuggestion = null,
  ghostMatchedPrefix,
  hint,
  activeOverlay = 'none',
  paletteContext = '',
  paletteFreshness = 'cached',
  paletteGroups = [],
  resourceType = '',
  subscriptionLabel = '',
  resourceStatus = 'resolved',
  resourceItems = [],
  onAcceptGhost,
  onSelectParam,
  onSelectResource,
}: OverlayHostProps) {
  const { variant, isSuppressed, isPlain } = useCapability(capability);
  const inputRef = useRef<HTMLSpanElement>(null);

  const [overlay, setOverlay] = useState<ActiveOverlay>(activeOverlay);
  const [hintVisible, setHintVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const paletteRows = paletteGroups.reduce((n, g) => n + g.items.length, 0);
  const resourceRows = resourceItems.length;
  const rowCount = overlay === 'palette' ? paletteRows : resourceRows;

  const activeDescendant =
    overlay === 'palette'
      ? `${PALETTE_ID}-opt-${activeIndex}`
      : overlay === 'resource' && resourceItems[activeIndex]
        ? `${RESOURCE_ID}-opt-${resourceItems[activeIndex].name.replace(/\W+/g, '-')}`
        : undefined;

  /**
   * Centralised key handler. Returns nothing and only preventDefaults the keys
   * Cirrus explicitly opts into — everything else (Enter, Ctrl+C, printable
   * keys) flows straight through to the shell.
   */
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Never touch these — they belong to the shell / terminal multiplexer.
      if (
        e.key === 'Enter' ||
        (e.ctrlKey && (e.key === 'c' || e.key === 'l')) ||
        (e.ctrlKey && e.key === 'b') // common tmux prefix
      ) {
        return; // pass through untouched
      }

      // Ctrl+Space: on-demand peek — force-open the palette for the token.
      if (e.ctrlKey && e.key === ' ') {
        e.preventDefault();
        setOverlay((o) => (o === 'none' ? 'palette' : o));
        return;
      }

      // Below here, only act while an overlay is open.
      if (overlay === 'none') {
        // Tab accepts the ghost suggestion if present; else let shell complete.
        if (e.key === 'Tab' && ghostSuggestion) {
          e.preventDefault();
          onAcceptGhost?.(ghostSuggestion);
        }
        return;
      }

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          setOverlay('none'); // single Esc exits to plain typing (never traps)
          break;
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((i) => (rowCount ? (i + 1) % rowCount : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((i) => (rowCount ? (i - 1 + rowCount) % rowCount : 0));
          break;
        case 'Tab':
          e.preventDefault();
          if (overlay === 'palette') {
            const flat = paletteGroups.flatMap((g) => g.items);
            const item = flat[activeIndex];
            if (item) onSelectParam?.(item);
          } else if (overlay === 'resource') {
            const item = resourceItems[activeIndex];
            if (item) onSelectResource?.(item);
          }
          setOverlay('none');
          break;
        default:
          break; // printable keys re-filter upstream; never blocked
      }
    },
    [
      overlay,
      rowCount,
      ghostSuggestion,
      onAcceptGhost,
      paletteGroups,
      activeIndex,
      resourceItems,
      onSelectParam,
      onSelectResource,
    ],
  );

  // State E / F-2 / disabled: Cirrus draws NOTHING and holds no keybindings.
  if (isSuppressed) {
    return (
      <div className={styles.host}>
        <div className={styles.line}>
          <span className={styles.prompt}>{prompt}</span>
          <span className={styles.command}>{command}</span>
          <span className={styles.caret} aria-hidden="true" />
        </div>
      </div>
    );
  }

  const componentVariant = isPlain ? 'plain' : 'rich';
  const showOverlay = overlay !== 'none';

  return (
    <div className={styles.host}>
      {/* The command line is always the top-most, editable region. */}
      <div className={styles.line}>
        <span className={styles.prompt}>{prompt}</span>
        {/* A contenteditable-like span standing in for the shell input. */}
        <span
          ref={inputRef}
          className={styles.command}
          role="combobox"
          tabIndex={0}
          aria-label="Azure CLI command"
          aria-autocomplete="inline"
          aria-expanded={showOverlay}
          aria-controls={
            overlay === 'palette'
              ? PALETTE_ID
              : overlay === 'resource'
                ? RESOURCE_ID
                : undefined
          }
          aria-activedescendant={activeDescendant}
          onKeyDown={onKeyDown}
        >
          {command}
        </span>
        {!isPlain && (
          <GhostTextCompletion
            suggestion={ghostSuggestion}
            matchedPrefix={ghostMatchedPrefix}
            visible={overlay === 'none' && !!ghostSuggestion}
            variant={componentVariant}
            onAccept={(a) => onAcceptGhost?.(a)}
          />
        )}
        <span className={styles.caret} aria-hidden="true" />
      </div>

      {/* Below the caret line — overlays never cover the command. */}
      <div className={styles.below}>
        {hint && hintVisible && overlay === 'none' && (
          <HintLine
            message={hint.message}
            shortcut={hint.shortcut}
            variant={componentVariant}
            onDismiss={() => setHintVisible(false)}
            onDisableAll={() => setHintVisible(false)}
          />
        )}

        {overlay === 'palette' && (
          <ParameterPalette
            id={PALETTE_ID}
            commandContext={paletteContext}
            freshness={paletteFreshness}
            groups={paletteGroups}
            activeIndex={activeIndex}
            variant={componentVariant}
            onSelect={(i) => onSelectParam?.(i)}
            onDismiss={() => setOverlay('none')}
            onActiveIndexChange={setActiveIndex}
          />
        )}

        {overlay === 'resource' && (
          <ResourceLookupList
            id={RESOURCE_ID}
            resourceType={resourceType}
            subscriptionLabel={subscriptionLabel}
            status={resourceStatus}
            items={resourceItems}
            activeIndex={activeIndex}
            variant={componentVariant}
            onSelect={(i) => onSelectResource?.(i)}
            onDismiss={() => setOverlay('none')}
            onActiveIndexChange={setActiveIndex}
          />
        )}
      </div>

      <p className={styles.debug} aria-hidden="true">
        variant: {variant} · overlay: {overlay}
      </p>
    </div>
  );
}
