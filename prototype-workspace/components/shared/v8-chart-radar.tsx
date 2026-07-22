/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
import React, { useMemo, useRef } from 'react';
import { ChartTooltip, useChartTooltip } from './v8-chart-tooltip';
import { ChartLegend } from './v8-chart-legend';
import { getSeriesColor, formatTickValue } from './v8-chart-utils';
import type { Series, ChartBaseProps } from './v8-chart-utils';
import './v8-chart.css';
import './v8-chart-radar.css';

export interface RadarChartProps extends ChartBaseProps {
  /** One or more data series sharing the same axes */
  series: Series[];
  /** Axis labels (derived from first series x-values if not provided) */
  axes?: string[];
  /** Icons to render at each axis vertex instead of text labels (16x16). Length must match axes. */
  axisIcons?: React.ReactNode[];
  /** Number of concentric grid rings. Default 4 */
  rings?: number;
  /** Fill opacity for each series polygon. Default 0.2 */
  fillOpacity?: number;
  /** Click handler for a data point */
  onPointClick?: (seriesIndex: number, axisIndex: number) => void;
}

const VIRTUAL_SIZE = 300;
const CENTER = VIRTUAL_SIZE / 2;
const RADIUS = VIRTUAL_SIZE / 2 - 32; // leave room for labels

export function RadarChart({
  series,
  axes: axesProp,
  axisIcons,
  rings = 4,
  fillOpacity = 0.2,
  title,
  width = '100%',
  height = 300,
  showLegend = true,
  legendPosition = 'top',
  className = '',
  onPointClick,
}: RadarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { tooltip, showTooltip, moveTooltip, hideTooltip } = useChartTooltip();

  const axes = useMemo(
    () => axesProp ?? (series[0]?.data.map((d) => String(d.x)) ?? []),
    [axesProp, series]
  );
  const numAxes = axes.length;

  // Find max value for normalization
  const maxValue = useMemo(() => {
    const allY = series.flatMap((s) => s.data.map((d) => d.y));
    return allY.length > 0 ? Math.max(...allY) : 1;
  }, [series]);

  // Angle per axis (start from top, go clockwise)
  const angleStep = (2 * Math.PI) / (numAxes || 1);
  const getAngle = (i: number) => -Math.PI / 2 + i * angleStep;
  const polarToXY = (angle: number, r: number) => ({
    x: CENTER + r * Math.cos(angle),
    y: CENTER + r * Math.sin(angle),
  });

  // Concentric grid polygons
  const gridPolygons = useMemo(() => {
    return Array.from({ length: rings }, (_, ri) => {
      const r = (RADIUS * (ri + 1)) / rings;
      const pts = Array.from({ length: numAxes }, (_, ai) => {
        const { x, y } = polarToXY(getAngle(ai), r);
        return `${x},${y}`;
      });
      return pts.join(' ');
    });
  }, [numAxes, rings]);

  // Axis label positions
  const axisLabels = useMemo(
    () =>
      axes.map((label, i) => {
        const { x, y } = polarToXY(getAngle(i), RADIUS + 16);
        return { label, x, y };
      }),
    [axes]
  );

  // Series polygons
  const seriesPolygons = useMemo(
    () =>
      series.map((s) =>
        s.data.map((d, di) => {
          const r = maxValue > 0 ? (d.y / maxValue) * RADIUS : 0;
          return polarToXY(getAngle(di), r);
        })
      ),
    [series, maxValue]
  );

  const legendItems = useMemo(
    () =>
      series.length > 1
        ? series.map((s, i) => ({ label: s.name, color: getSeriesColor(i) }))
        : [],
    [series]
  );

  const classNames = ['ap-chart', 'ap-radar-chart', className].filter(Boolean).join(' ');
  const containerStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
  };

  return (
    <div className={classNames} style={containerStyle} ref={containerRef}>
      {title && <div className="ap-chart__title">{title}</div>}
      {showLegend && legendPosition === 'top' && <ChartLegend items={legendItems} position="top" />}
      <div className="ap-chart__body" style={{ display: legendPosition === 'right' ? 'flex' : 'block', alignItems: 'center' }}>
        <svg
          className="ap-radar-chart__svg"
          viewBox={`0 0 ${VIRTUAL_SIZE} ${VIRTUAL_SIZE}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ maxHeight: height }}
          role="img"
          aria-label="Radar chart"
        >
          {/* Grid polygons */}
          {gridPolygons.map((pts, i) => (
            <polygon key={i} points={pts} className="ap-radar-chart__grid" />
          ))}

          {/* Axis spokes */}
          {axes.map((_, i) => {
            const { x, y } = polarToXY(getAngle(i), RADIUS);
            return (
              <line key={i} x1={CENTER} y1={CENTER} x2={x} y2={y} className="ap-radar-chart__spoke" />
            );
          })}

          {/* Axis labels / icons */}
          {axisLabels.map((a, i) =>
            axisIcons?.[i] ? (
              <foreignObject
                key={i}
                x={a.x - 10}
                y={a.y - 10}
                width={20}
                height={20}
                className="ap-radar-chart__axis-icon"
                style={{ color: getSeriesColor(i) }}
                onMouseEnter={(e) => {
                  const svgEl = e.currentTarget.closest('svg');
                  if (!svgEl) return;
                  const pt = svgEl.getBoundingClientRect();
                  showTooltip(
                    { title: a.label, items: [] },
                    e.clientX - pt.left,
                    e.clientY - pt.top
                  );
                }}
                onMouseMove={(e) => {
                  const svgEl = e.currentTarget.closest('svg');
                  if (!svgEl) return;
                  const pt = svgEl.getBoundingClientRect();
                  moveTooltip(e.clientX - pt.left, e.clientY - pt.top);
                }}
                onMouseLeave={hideTooltip}
              >
                <div style={{ width: 16, height: 16, margin: '2px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {axisIcons[i]}
                </div>
              </foreignObject>
            ) : (
              <text
                key={i}
                x={a.x}
                y={a.y}
                className="ap-chart__tick-label"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {a.label}
              </text>
            )
          )}

          {/* Series polygons + dots */}
          {seriesPolygons.map((points, si) => {
            const color = getSeriesColor(si);
            const polyPoints = points.map((p) => `${p.x},${p.y}`).join(' ');
            return (
              <g key={si}>
                <polygon
                  points={polyPoints}
                  fill={color}
                  fillOpacity={fillOpacity}
                  stroke={color}
                  strokeWidth={2}
                  className="ap-radar-chart__polygon"
                />
                {points.map((p, ai) => (
                  <circle
                    key={ai}
                    cx={p.x}
                    cy={p.y}
                    r={4}
                    fill={color}
                    stroke="var(--neutral-0)"
                    strokeWidth={2}
                    className="ap-radar-chart__dot"
                    onClick={() => onPointClick?.(si, ai)}
                    onMouseEnter={(e) => {
                      const svgEl = e.currentTarget.closest('svg');
                      if (!svgEl) return;
                      const pt = svgEl.getBoundingClientRect();
                      showTooltip(
                        {
                          title: axes[ai],
                          items: [{ color, label: series[si].name, value: formatTickValue(series[si].data[ai]?.y ?? 0) }],
                        },
                        e.clientX - pt.left,
                        e.clientY - pt.top
                      );
                    }}
                    onMouseMove={(e) => {
                      const svgEl = e.currentTarget.closest('svg');
                      if (!svgEl) return;
                      const pt = svgEl.getBoundingClientRect();
                      moveTooltip(e.clientX - pt.left, e.clientY - pt.top);
                    }}
                    onMouseLeave={hideTooltip}
                  />
                ))}
              </g>
            );
          })}
        </svg>
        {showLegend && legendPosition === 'right' && <ChartLegend items={legendItems} position="right" />}
      </div>
      {showLegend && legendPosition === 'bottom' && <ChartLegend items={legendItems} position="bottom" />}
      <ChartTooltip {...tooltip} containerRef={containerRef} />
    </div>
  );
}
