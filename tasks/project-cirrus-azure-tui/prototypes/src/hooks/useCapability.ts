import { useMemo } from 'react';
import type { RenderVariant } from '../types';

/**
 * Capability probe inputs. In production these come from terminal capability
 * detection (concept C17); here they are injected so the cascade is testable.
 */
export interface CapabilityInput {
  /** false in CI / piped / no-TTY contexts (State F-2 => suppressed). */
  isInteractiveTty: boolean;
  /** false on constrained/limited terminals (State F-1 => plain). */
  supportsOverlays: boolean;
  /** the command's token-0 is `az` — otherwise everything suppresses (State E). */
  isAzContext: boolean;
  /** user has globally disabled Cirrus surfaces (AC-4.3). */
  suggestionsEnabled?: boolean;
  /** AI-terminal surface: expose context, draw no UI (AC-6.3 => suppressed). */
  isAiTerminal?: boolean;
}

export interface CapabilityResult {
  /** the render tier every child should honour in lockstep. */
  variant: RenderVariant;
  /** convenience booleans for the overlay host. */
  isRich: boolean;
  isPlain: boolean;
  isSuppressed: boolean;
}

/**
 * Resolves the single render tier (rich -> plain -> suppressed) that drives the
 * whole overlay in lockstep. Fails DOWN to the plainer tier when uncertain
 * (safe default per wireframe State F edge cases).
 */
export function useCapability(input: CapabilityInput): CapabilityResult {
  const {
    isInteractiveTty,
    supportsOverlays,
    isAzContext,
    suggestionsEnabled = true,
    isAiTerminal = false,
  } = input;

  const variant = useMemo<RenderVariant>(() => {
    // Hard suppression gates (State E / F-2 / AI-terminal / disabled).
    if (!isAzContext) return 'suppressed';
    if (!isInteractiveTty) return 'suppressed';
    if (isAiTerminal) return 'suppressed';
    if (!suggestionsEnabled) return 'suppressed';

    // Interactive az context: rich if overlays are supported, else plain (F-1).
    return supportsOverlays ? 'rich' : 'plain';
  }, [
    isAzContext,
    isInteractiveTty,
    isAiTerminal,
    suggestionsEnabled,
    supportsOverlays,
  ]);

  return {
    variant,
    isRich: variant === 'rich',
    isPlain: variant === 'plain',
    isSuppressed: variant === 'suppressed',
  };
}
