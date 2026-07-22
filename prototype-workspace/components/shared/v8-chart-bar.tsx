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
import type { CategoricalDatum, Series, CartesianChartProps } from './v8-chart-utils';
import './v8-chart.css';
import './v8-chart-bar.css';

export interface BarChartProps extends CartesianChartProps {
  /** Single-series categorical data */
  data?: CategoricalDatum[];
  /** Multi-series data (overrides data) */
  series?: Series[];
  /** Bar orientation. Default 'vertical' */
  orientation?: 'vertical' | 'horizontal';
  /** Stacking mode for multi-series. Default 'grouped' */
  mode?: 'grouped' | 'stacked';
  /** Click handler for a bar segment */
  onBarClick?: (datum: CategoricalDatum, seriesName?: string) => void;
}

// Internal layout constants
const MARGIN = { top: 8, right: 16, bottom: 40, left: 56 };
const MARGIN_WITH_X_LABEL = { ...MARGIN, bottom: 60 };
const MARGIN_WITH_Y_LABEL = { ...MARGIN, left: 80 };

export function BarChart({
  data,
  series,
  orientation = 'vertical',
  mode = 'grouped',
  title,
  xLabel,
  yLabel,
  yTickCount = 5,
  width = '100%',
  height = 300,
  showLegend = true,
  legendPosition = 'top',
  className = '',
  onBarClick,
}: BarChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { tooltip, showTooltip, moveTooltip, hideTooltip } = useChartTooltip();

  // Normalize data: convert single-series to multi-series
  const normalizedSeries = useMemo<Series[]>(() => {
    if (series && series.length > 0) return series;
    if (data && data.length > 0) {
      return [{ name: '', data: data.map((d) => ({ x: d.label, y: d.value })) }];
    }
    return [];
  }, [data, series]);

  // Extract category labels from first series (assumed consistent)
  const categories = useMemo(
    () => (normalizedSeries[0]?.data.map((d) => String(d.x)) ?? []),
    [normalizedSeries]
  );

  // Compute value extent
  const valueExtent = useMemo<[number, number]>(() => {
    if (normalizedSeries.length === 0) return [0, 1];
    if (mode === 'stacked') {
      // Sum per category
      const sums = categories.map((_, ci) =>
        normalizedSeries.reduce((sum, s) => sum + (s.data[ci]?.y ?? 0), 0)
      );
      return [0, Math.max(...sums)];
    }
    const allValues = normalizedSeries.flatMap((s) => s.data.map((d) => d.y));
    return [0, Math.max(...allValues)];
  }, [normalizedSeries, categories, mode]);

  // Compute margins based on axis labels
  const margin = useMemo(() => {
    const m = { ...MARGIN };
    if (xLabel) m.bottom = MARGIN_WITH_X_LABEL.bottom;
    if (yLabel) m.left = MARGIN_WITH_Y_LABEL.left;
    return m;
  }, [xLabel, yLabel]);

  // Derive legend items
  const legendItems = useMemo(
    () =>
      normalizedSeries.length > 1
        ? normalizedSeries.map((s, i) => ({
            label: s.name,
            color: getSeriesColor(i),
          }))
        : [],
    [normalizedSeries]
  );

  const isVertical = orientation === 'vertical';

  const classNames = [
    'ap-chart',
    'ap-bar-chart',
    className,
  ].filter(Boolean).join(' ');

  const containerStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
  };

  // Compute SVG internal dimensions
  const svgHeight = height;
  const plotWidth = `calc(100% - ${margin.left + margin.right}px)`;

  return (
    <div className={classNames} style={containerStyle} ref={containerRef}>
      {title && <div className="ap-chart__title">{title}</div>}
      {showLegend && legendPosition === 'top' && <ChartLegend items={legendItems} position="top" />}
      <div className="ap-chart__body" style={{ display: legendPosition === 'right' ? 'flex' : 'block' }}>
        <BarChartSVG
          series={normalizedSeries}
          categories={categories}
          valueExtent={valueExtent}
          isVertical={isVertical}
          mode={mode}
          margin={margin}
          svgHeight={svgHeight}
          yTickCount={yTickCount}
          xLabel={xLabel}
          yLabel={yLabel}
          onBarClick={onBarClick}
          showTooltip={showTooltip}
          moveTooltip={moveTooltip}
          hideTooltip={hideTooltip}
        />
        {showLegend && legendPosition === 'right' && <ChartLegend items={legendItems} position="right" />}
      </div>
      {showLegend && legendPosition === 'bottom' && <ChartLegend items={legendItems} position="bottom" />}
      <ChartTooltip {...tooltip} containerRef={containerRef} />
    </div>
  );
}

// ─── Internal SVG renderer ─────────────────────────────────────────────────────

interface BarChartSVGProps {
  series: Series[];
  categories: string[];
  valueExtent: [number, number];
  isVertical: boolean;
  mode: 'grouped' | 'stacked';
  margin: typeof MARGIN;
  svgHeight: number;
  yTickCount: number;
  xLabel?: string;
  yLabel?: string;
  onBarClick?: (datum: CategoricalDatum, seriesName?: string) => void;
  showTooltip: (data: any, x: number, y: number) => void;
  moveTooltip: (x: number, y: number) => void;
  hideTooltip: () => void;
}

function BarChartSVG({
  series,
  categories,
  valueExtent,
  isVertical,
  mode,
  margin,
  svgHeight,
  yTickCount,
  xLabel,
  yLabel,
  onBarClick,
  showTooltip,
  moveTooltip,
  hideTooltip,
}: BarChartSVGProps) {
  // We use a viewBox-less SVG with 100% width and fixed height to allow responsive behavior.
  // Axis and bar positions are computed as percentages or absolute px within the margin frame.
  // For simplicity with SVG coordinate math, we pick a virtual coordinate width.
  const VIRTUAL_W = 600;
  const plotLeft = margin.left;
  const plotRight = VIRTUAL_W - margin.right;
  const plotTop = margin.top;
  const plotBottom = svgHeight - margin.bottom;
  const plotW = plotRight - plotLeft;
  const plotH = plotBottom - plotTop;

  const [niceMin, niceMax] = niceExtent(valueExtent[0], valueExtent[1], yTickCount);
  const ticks = generateTicks(niceMin, niceMax, yTickCount);

  // Scales
  const categoryScale = bandScale(categories, isVertical ? [plotLeft, plotRight] : [plotTop, plotBottom], 0.25);
  const valueScale = linearScale(
    [niceMin, niceMax],
    isVertical ? [plotBottom, plotTop] : [plotLeft, plotRight]
  );

  const numSeries = series.length;
  const bandwidth = categoryScale.bandwidth();
  const barWidth =
    mode === 'grouped' && numSeries > 1
      ? bandwidth / numSeries
      : bandwidth;

  return (
    <svg
      className="ap-bar-chart__svg"
      viewBox={`0 0 ${VIRTUAL_W} ${svgHeight}`}
      preserveAspectRatio="xMinYMin meet"
      role="img"
      aria-label={`Bar chart${series.length > 0 ? `: ${series.map((s) => s.name).filter(Boolean).join(', ')}` : ''}`}
    >
      {/* Grid lines */}
      {ticks.map((tick) => {
        const pos = isVertical ? valueScale(tick) : valueScale(tick);
        return isVertical ? (
          <line
            key={tick}
            x1={plotLeft}
            x2={plotRight}
            y1={pos}
            y2={pos}
            className="ap-chart__grid-line"
          />
        ) : (
          <line
            key={tick}
            x1={pos}
            x2={pos}
            y1={plotTop}
            y2={plotBottom}
            className="ap-chart__grid-line"
          />
        );
      })}

      {/* Y-axis tick labels */}
      {ticks.map((tick) => {
        if (isVertical) {
          return (
            <text
              key={tick}
              x={plotLeft - 8}
              y={valueScale(tick)}
              className="ap-chart__tick-label"
              textAnchor="end"
              dominantBaseline="middle"
            >
              {formatTickValue(tick)}
            </text>
          );
        }
        return (
          <text
            key={tick}
            x={valueScale(tick)}
            y={plotBottom + 16}
            className="ap-chart__tick-label"
            textAnchor="middle"
            dominantBaseline="auto"
          >
            {formatTickValue(tick)}
          </text>
        );
      })}

      {/* X-axis category labels */}
      {categories.map((cat) => {
        const pos = categoryScale(cat) + bandwidth / 2;
        if (isVertical) {
          return (
            <text
              key={cat}
              x={pos}
              y={plotBottom + 16}
              className="ap-chart__tick-label"
              textAnchor="middle"
              dominantBaseline="auto"
            >
              {cat}
            </text>
          );
        }
        return (
          <text
            key={cat}
            x={plotLeft - 8}
            y={pos}
            className="ap-chart__tick-label"
            textAnchor="end"
            dominantBaseline="middle"
          >
            {cat}
          </text>
        );
      })}

      {/* Axis labels */}
      {xLabel && (
        <text
          x={plotLeft + plotW / 2}
          y={svgHeight - 4}
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

      {/* Bars */}
      {categories.map((cat, ci) => {
        let stackBase = isVertical ? plotBottom : plotLeft;
        return series.map((s, si) => {
          const value = s.data[ci]?.y ?? 0;
          const color = getSeriesColor(si);

          if (isVertical) {
            const barH = plotBottom - valueScale(value);
            let x: number;
            let y: number;
            let w: number;
            let h: number;

            if (mode === 'stacked') {
              x = categoryScale(cat);
              w = bandwidth;
              y = stackBase - barH;
              h = barH;
              stackBase -= barH;
            } else {
              x = categoryScale(cat) + si * barWidth;
              w = barWidth;
              y = valueScale(value);
              h = barH;
            }

            return (
              <rect
                key={`${cat}-${si}`}
                x={x}
                y={y}
                width={Math.max(w, 0)}
                height={Math.max(h, 0)}
                fill={color}
                className="ap-bar-chart__bar"
                onClick={() => onBarClick?.({ label: cat, value }, s.name)}
                onMouseEnter={(e) => {
                  const svgEl = e.currentTarget.closest('svg');
                  if (!svgEl) return;
                  const pt = svgEl.getBoundingClientRect();
                  const relX = e.clientX - pt.left;
                  const relY = e.clientY - pt.top;
                  showTooltip(
                    {
                      title: cat,
                      items: mode === 'stacked'
                        ? series.map((ss, ssi) => ({
                            color: getSeriesColor(ssi),
                            label: ss.name,
                            value: formatTickValue(ss.data[ci]?.y ?? 0),
                          }))
                        : [{ color, label: s.name || cat, value: formatTickValue(value) }],
                    },
                    relX,
                    relY
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
            );
          } else {
            // Horizontal
            const barLen = valueScale(value) - plotLeft;
            let x: number;
            let y: number;
            let w: number;
            let h: number;

            if (mode === 'stacked') {
              y = categoryScale(cat);
              h = bandwidth;
              x = stackBase;
              w = barLen;
              stackBase += barLen;
            } else {
              y = categoryScale(cat) + si * barWidth;
              h = barWidth;
              x = plotLeft;
              w = barLen;
            }

            return (
              <rect
                key={`${cat}-${si}`}
                x={x}
                y={y}
                width={Math.max(w, 0)}
                height={Math.max(h, 0)}
                fill={color}
                className="ap-bar-chart__bar"
                onClick={() => onBarClick?.({ label: cat, value }, s.name)}
                onMouseEnter={(e) => {
                  const svgEl = e.currentTarget.closest('svg');
                  if (!svgEl) return;
                  const pt = svgEl.getBoundingClientRect();
                  showTooltip(
                    {
                      title: cat,
                      items: mode === 'stacked'
                        ? series.map((ss, ssi) => ({
                            color: getSeriesColor(ssi),
                            label: ss.name,
                            value: formatTickValue(ss.data[ci]?.y ?? 0),
                          }))
                        : [{ color, label: s.name || cat, value: formatTickValue(value) }],
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
            );
          }
        });
      })}
    </svg>
  );
}
