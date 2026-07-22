/**
 * Lightweight scale functions for chart layout.
 * Replaces d3-scale for the subset of functionality we need.
 */

/** Linear scale: maps a numeric domain to a pixel range */
export function linearScale(
  domain: [number, number],
  range: [number, number]
): (value: number) => number {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const span = d1 - d0 || 1;
  return (value: number) => r0 + ((value - d0) / span) * (r1 - r0);
}

/** Band scale: maps categorical labels to evenly-spaced bands */
export interface BandScaleResult {
  (label: string): number;
  bandwidth: () => number;
  step: () => number;
}

export function bandScale(
  domain: string[],
  range: [number, number],
  padding = 0.2
): BandScaleResult {
  const [r0, r1] = range;
  const n = domain.length || 1;
  const totalRange = r1 - r0;
  const step = totalRange / (n + padding * 2);
  const bandwidth = step * (1 - padding);
  const offset = step * padding + (step - bandwidth) / 2;

  const map = new Map<string, number>();
  domain.forEach((label, i) => {
    map.set(label, r0 + offset + i * step);
  });

  const fn = ((label: string) => map.get(label) ?? r0) as BandScaleResult;
  fn.bandwidth = () => bandwidth;
  fn.step = () => step;
  return fn;
}

/** Compute nice axis bounds for a numeric extent */
export function niceExtent(
  min: number,
  max: number,
  tickCount = 5
): [number, number] {
  if (min === max) {
    return min === 0 ? [0, 1] : [0, max * 1.1];
  }
  const range = max - min;
  const roughStep = range / tickCount;
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const residual = roughStep / magnitude;
  let niceStep: number;
  if (residual <= 1.5) niceStep = magnitude;
  else if (residual <= 3) niceStep = 2 * magnitude;
  else if (residual <= 7) niceStep = 5 * magnitude;
  else niceStep = 10 * magnitude;

  const niceMin = Math.floor(min / niceStep) * niceStep;
  const niceMax = Math.ceil(max / niceStep) * niceStep;
  return [Math.min(niceMin, 0), niceMax];
}

/** Generate evenly-spaced tick values */
export function generateTicks(
  min: number,
  max: number,
  count = 5
): number[] {
  const [nMin, nMax] = niceExtent(min, max, count);
  const step = (nMax - nMin) / count;
  if (step === 0) return [nMin];
  const ticks: number[] = [];
  for (let v = nMin; v <= nMax + step * 0.01; v += step) {
    ticks.push(Math.round(v * 1e10) / 1e10); // avoid float drift
  }
  return ticks;
}

/** Format a tick value for display (e.g., 80000 → "80K") */
export function formatTickValue(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return (value / 1_000_000_000).toFixed(abs % 1_000_000_000 === 0 ? 0 : 1) + 'B';
  if (abs >= 1_000_000) return (value / 1_000_000).toFixed(abs % 1_000_000 === 0 ? 0 : 1) + 'M';
  if (abs >= 1_000) return (value / 1_000).toFixed(abs % 1_000 === 0 ? 0 : 1) + 'K';
  if (Number.isInteger(value)) return value.toString();
  return value.toFixed(1);
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
