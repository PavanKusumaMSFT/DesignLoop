/**
 * Project Cirrus — shared prototype types.
 * All components are pure/presentational; data arrives via props from the
 * intelligence core (no component owns persistent "mode" state — NG1).
 */

/** Capability-driven render tier resolved by `useCapability` (concept C17). */
export type RenderVariant = 'rich' | 'plain' | 'suppressed';

/** The subset a component accepts (suppressed => host renders nothing). */
export type ComponentVariant = 'rich' | 'plain';

export type ParamRequirement = 'required' | 'optional';
export type EnumStatus = 'valid' | 'deprecated';
export type Freshness = 'cached' | 'live';

/** A single row model shared by ParameterPalette + ResourceLookupList. */
export type SuggestionKind = 'flag' | 'enum-value' | 'resource';

export interface ParamItem {
  kind: 'flag' | 'enum-value';
  label: string;
  valueType?: 'string' | 'enum' | 'lookup' | 'free-text';
  description?: string;
  requirement: ParamRequirement;
  status?: EnumStatus;
}

export interface ParamGroup {
  /** e.g. "required" | "optional" | "--sku values" */
  label: string;
  requirement: ParamRequirement;
  items: ParamItem[];
}

export interface ResourceItem {
  name: string;
  meta?: string;
  freshness: Freshness;
}

export type ResourceStatus =
  | 'loading'
  | 'resolved'
  | 'timeout'
  | 'unauthenticated'
  | 'empty';
