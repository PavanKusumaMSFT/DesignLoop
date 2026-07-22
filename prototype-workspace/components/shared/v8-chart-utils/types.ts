/**
 * Shared chart data types.
 */

/** Single labeled value — used by Pie, Donut, single-series Bar */
export interface CategoricalDatum {
  label: string;
  value: number;
}

/** A single data point with x and y coordinates */
export interface SeriesDatum {
  x: string | number;
  y: number;
}

/** A named series of data points — used by Line, Area, multi-series Bar, Radar */
export interface Series {
  name: string;
  data: SeriesDatum[];
}

/** A single cell in a heatmap grid */
export interface HeatmapDatum {
  x: string;
  y: string;
  value: number;
}

/** Common props shared by all standard chart components */
export interface ChartBaseProps {
  /** Chart title */
  title?: string;
  /** Chart width (CSS value or number for px). Default '100%' */
  width?: number | string;
  /** Chart height in px. Default 300 */
  height?: number;
  /** Show legend. Default true (except Sparkline) */
  showLegend?: boolean;
  /** Legend position. Default 'top' */
  legendPosition?: 'top' | 'bottom' | 'right';
  /** Additional CSS class */
  className?: string;
}

/** Props for charts with cartesian axes */
export interface CartesianChartProps extends ChartBaseProps {
  /** X-axis label */
  xLabel?: string;
  /** Y-axis label */
  yLabel?: string;
  /** Number of Y-axis ticks. Default 5 */
  yTickCount?: number;
}
