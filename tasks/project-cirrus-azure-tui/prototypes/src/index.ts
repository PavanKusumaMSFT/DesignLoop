/** Project Cirrus prototype — public component surface. */
export { GhostTextCompletion } from './components/GhostTextCompletion/GhostTextCompletion';
export type { GhostTextCompletionProps } from './components/GhostTextCompletion/GhostTextCompletion';

export { ParameterPalette } from './components/ParameterPalette/ParameterPalette';
export type { ParameterPaletteProps } from './components/ParameterPalette/ParameterPalette';

export { ResourceLookupList } from './components/ResourceLookupList/ResourceLookupList';
export type { ResourceLookupListProps } from './components/ResourceLookupList/ResourceLookupList';

export { HintLine } from './components/HintLine/HintLine';
export type { HintLineProps } from './components/HintLine/HintLine';

export { SuggestionItem } from './components/SuggestionItem/SuggestionItem';
export type { SuggestionItemProps } from './components/SuggestionItem/SuggestionItem';

export { OverlayHost } from './OverlayHost/OverlayHost';
export type { OverlayHostProps, ActiveOverlay } from './OverlayHost/OverlayHost';

export { useCapability } from './hooks/useCapability';
export type {
  CapabilityInput,
  CapabilityResult,
} from './hooks/useCapability';

export type {
  RenderVariant,
  ComponentVariant,
  ParamItem,
  ParamGroup,
  ResourceItem,
  ResourceStatus,
  Freshness,
  SuggestionKind,
} from './types';
