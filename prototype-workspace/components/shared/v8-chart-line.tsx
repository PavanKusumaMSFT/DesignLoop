/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
import React, { useMemo, useRef } from 'react';
import { ChartTooltip, useChartTooltip } from './v8-chart-tooltip';
import { ChartLegend } from './v8-chart-legend';
import {
  bandScale,
  linearScale,
  niceExtent,
  generateTicks,
  formatTickValue,
  getSeriesColor,
} from './v8-chart-utils';
import type { Series, CartesianChartProps } from './v8-chart-utils';
import './v8-chart.css';
import './v8-chart-line.css';

export interface LineChartProps extends CartesianChartProps {
  /** One or more data series */
  series: Series[];
  /** Show data point dots. Default true */
  showDots?: boolean;
  /** Dot radius in px. Default 4 */
  dotRadius?: number;
  /** Click handler for a data point */
  onPointClick?: (seriesIndex: number, pointIndex: number, datum: { x: string | number; y: number }) => void;
}

const MARGIN = { top: 8, right: 16, bottom: 40, left: 56 };
const MARGIN_WITH_X_LABEL = { ...MARGIN, bottom: 60 };
const MARGIN_WITH_Y_LABEL = { ...MARGIN, left: 80 };
const VIRTUAL_W = 600;

export function LineChart({
  series,
  title,
  xLabel,
  yLabel,
  yTickCount = 5,
  width = '100%',
  height = 300,
  showLegend = true,
  legendPosition = 'top',
  showDots = true,
  dotRadius = 4,
  className = '',
  onPointClick,
}: LineChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { tooltip, showTooltip, moveTooltip, hideTooltip } = useChartTooltip();

  const margin = useMemo(() => {
    const m = { ...MARGIN };
    if (xLabel) m.bottom = MARGIN_WITH_X_LABEL.bottom;
    if (yLabel) m.left = MARGIN_WITH_Y_LABEL.left;
    return m;
  }, [xLabel, yLabel]);

  const plotLeft = margin.left;
  const plotRight = VIRTUAL_W - margin.right;
  const plotTop = margin.top;
  const plotBottom = height - margin.bottom;
  const plotW = plotRight - plotLeft;
  const plotH = plotBottom - plotTop;

  // Derive categories and value extent
  const categories = useMemo(
    () => series[0]?.data.map((d) => String(d.x)) ?? [],
    [series]
  );

  const valueExtent = useMemo<[number, number]>(() => {
    const allY = series.flatMap((s) => s.data.map((d) => d.y));
    if (allY.length === 0) return [0, 1];
    return [Math.min(0, Math.min(...allY)), Math.max(...allY)];
  }, [series]);

  const [niceMin, niceMax] = niceExtent(valueExtent[0], valueExtent[1], yTickCount);
  const ticks = generateTicks(niceMin, niceMax, yTickCount);

  const xScale = bandScale(categories, [plotLeft, plotRight], 0.05);
  const yScale = linearScale([niceMin, niceMax], [plotBottom, plotTop]);

  const legendItems = useMemo(
    () =>
      series.length > 1
        ? series.map((s, i) => ({ label: s.name, color: getSeriesColor(i) }))
        : [],
    [series]
  );

  const bandwidth = xScale.bandwidth();

  const classNames = ['ap-chart', 'ap-line-chart', className].filter(Boolean).join(' ');
  const containerStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
  };

  return (
    <div className={classNames} style={containerStyle} ref={containerRef}>
      {title && <div className="ap-chart__title">{title}</div>}
      {showLegend && legendPosition === 'top' && <ChartLegend items={legendItems} position="top" />}
      <div className="ap-chart__body" style={{ display: legendPosition === 'right' ? 'flex' : 'block' }}>
        <svg
          className="ap-line-chart__svg"
          viewBox={`0 0 ${VIRTUAL_W} ${height}`}
          preserveAspectRatio="xMinYMin meet"
          role="img"
          aria-label={`Line chart: ${series.map((s) => s.name).filter(Boolean).join(', ')}`}
        >
          {/* Grid lines */}
          {ticks.map((tick) => (
            <line
              key={tick}
              x1={plotLeft}
              x2={plotRight}
              y1={yScale(tick)}
              y2={yScale(tick)}
              className="ap-chart__grid-line"
            />
          ))}

          {/* Y-axis tick labels */}
          {ticks.map((tick) => (
            <text
              key={tick}
              x={plotLeft - 8}
              y={yScale(tick)}
              className="ap-chart__tick-label"
              textAnchor="end"
              dominantBaseline="middle"
            >
              {formatTickValue(tick)}
            </text>
          ))}

          {/* X-axis category labels */}
          {categories.map((cat) => (
            <text
              key={cat}
              x={xScale(cat) + bandwidth / 2}
              y={plotBottom + 16}
              className="ap-chart__tick-label"
              textAnchor="middle"
            >
              {cat}
            </text>
          ))}

          {/* Axis labels */}
          {xLabel && (
            <text
              x={plotLeft + plotW / 2}
              y={height - 4}
              className="ap-chart__axis-label"
              textAnchor="middle"
            >
              {xLabel}
            </text>
          )}
          {yLabel && (
            <text
              x={14}
              y={plotTop + plotH / 2}
              className="ap-chart__axis-label"
              textAnchor="middle"
              transform={`rotate(-90, 14, ${plotTop + plotH / 2})`}
            >
              {yLabel}
            </text>
          )}

          {/* Axis lines */}
          <line x1={plotLeft} x2={plotLeft} y1={plotTop} y2={plotBottom} className="ap-chart__axis-line" />
          <line x1={plotLeft} x2={plotRight} y1={plotBottom} y2={plotBottom} className="ap-chart__axis-line" />

          {/* Lines + dots */}
          {series.map((s, si) => {
            const color = getSeriesColor(si);
            const points = s.data.map((d, di) => ({
              cx: xScale(String(d.x)) + bandwidth / 2,
              cy: yScale(d.y),
              datum: d,
              index: di,
            }));
            const pathD = points
              .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.cx} ${p.cy}`)
              .join(' ');

            return (
              <g key={si}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={color}
                  strokeWidth={2}
                  className="ap-line-chart__line"
                />
                {showDots &&
                  points.map((p) => (
                    <circle
                      key={p.index}
                      cx={p.cx}
                      cy={p.cy}
                      r={dotRadius}
                      fill={color}
                      className="ap-line-chart__dot"
                      onClick={() => onPointClick?.(si, p.index, p.datum)}
                      onMouseEnter={(e) => {
                        const svgEl = e.currentTarget.closest('svg');
                        if (!svgEl) return;
                        const pt = svgEl.getBoundingClientRect();
                        showTooltip(
                          {
                            title: String(p.datum.x),
                            items: [{ color, label: s.name || String(p.datum.x), value: formatTickValue(p.datum.y) }],
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
