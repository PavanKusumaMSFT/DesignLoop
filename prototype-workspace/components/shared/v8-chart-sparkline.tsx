/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
import React, { useMemo } from 'react';
import { linearScale, niceExtent, getSeriesColor } from './v8-chart-utils';
import './v8-chart.css';
import './v8-chart-sparkline.css';

export interface SparklineProps {
  /** Array of numeric values */
  data: number[];
  /** Width in px or CSS value. Default '100%' */
  width?: number | string;
  /** Height in px. Default 32 */
  height?: number;
  /** Line color. Defaults to first data palette color */
  color?: string;
  /** Show area fill below line. Default true */
  showArea?: boolean;
  /** Fill opacity. Default 0.15 */
  fillOpacity?: number;
  /** Line stroke width. Default 1.5 */
  strokeWidth?: number;
  /** Additional CSS class */
  className?: string;
}

const V_W = 200;

export function Sparkline({
  data,
  width = '100%',
  height = 32,
  color,
  showArea = true,
  fillOpacity = 0.15,
  strokeWidth = 1.5,
  className = '',
}: SparklineProps) {
  const lineColor = color ?? getSeriesColor(0);

  const points = useMemo(() => {
    if (data.length === 0) return [];
    const min = Math.min(...data);
    const max = Math.max(...data);
    const [nMin, nMax] = niceExtent(min, max, 4);
    const xStep = data.length > 1 ? V_W / (data.length - 1) : V_W / 2;
    const yScale = linearScale([nMin, nMax], [height - 2, 2]);
    return data.map((v, i) => ({ x: i * xStep, y: yScale(v) }));
  }, [data, height]);

  if (points.length === 0) return null;

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath =
    linePath +
    ` L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  const classNames = ['ap-sparkline', className].filter(Boolean).join(' ');
  const containerStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height,
  };

  return (
    <svg
      className={classNames}
      style={containerStyle}
      viewBox={`0 0 ${V_W} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="Sparkline"
    >
      {showArea && (
        <path d={areaPath} fill={lineColor} opacity={fillOpacity} />
      )}
      <path
        d={linePath}
        fill="none"
        stroke={lineColor}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
