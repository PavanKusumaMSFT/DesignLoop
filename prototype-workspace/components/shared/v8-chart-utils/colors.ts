/**
 * Data visualization color palette utilities.
 * Maps series indices to CSS custom property values.
 */

/** The 10 data visualization colors from tokens.css */
export const DATA_COLORS = [
  'var(--data-10)',
  'var(--data-20)',
  'var(--data-30)',
  'var(--data-40)',
  'var(--data-50)',
  'var(--data-60)',
  'var(--data-70)',
  'var(--data-80)',
  'var(--data-90)',
  'var(--data-100)',
] as const;

/** Get color for series at index (wraps around if >10 series) */
export function getSeriesColor(index: number): string {
  return DATA_COLORS[index % DATA_COLORS.length];
}
