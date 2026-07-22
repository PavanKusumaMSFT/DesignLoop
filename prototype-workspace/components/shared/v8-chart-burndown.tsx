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
import type { SeriesDatum, CartesianChartProps } from './v8-chart-utils';
import './v8-chart.css';
import './v8-chart-burndown.css';

export interface BurndownChartProps extends CartesianChartProps {
  /** Actual (historical) data points */
  actual: SeriesDatum[];
  /** Projected (future) data points. First point should overlap with the last actual point. */
  projected?: SeriesDatum[];
  /** Optional ideal/target burndown line */
  target?: SeriesDatum[];
  /** Label for the vertical "current" divider. Derived from last actual point if omitted. */
  currentLabel?: string;
  /** Show the vertical divider between actual and projected regions. Default true */
  showCurrentLine?: boolean;
  /** Fill opacity for the area regions. Default 0.3 */
  fillOpacity?: number;
  /** Projected region fill opacity. Default: fillOpacity * 0.5 */
  projectedFillOpacity?: number;
  /** Color for the actual series. Default var(--data-10) */
  actualColor?: string;
  /** Color for the projected series. Default same as actualColor */
  projectedColor?: string;
  /** Color for the target line. Default var(--data-30) */
  targetColor?: string;
  /** Format y values as percentages (appends %). Default false */
  yPercent?: boolean;
  /** Click handler for a data point */
  onPointClick?: (
    region: 'actual' | 'projected' | 'target',
    pointIndex: number,
    datum: SeriesDatum,
  ) => void;
}

const MARGIN = { top: 8, right: 16, bottom: 40, left: 56 };
const MARGIN_WITH_X_LABEL = { ...MARGIN, bottom: 60 };
const MARGIN_WITH_Y_LABEL = { ...MARGIN, left: 80 };
const VIRTUAL_W = 600;

export function BurndownChart({
  actual,
  projected,
  target,
  currentLabel,
  showCurrentLine = true,
  fillOpacity = 0.3,
  projectedFillOpacity,
  actualColor,
  projectedColor,
  targetColor,
  yPercent = false,
  title,
  xLabel,
  yLabel,
  yTickCount = 5,
  width = '100%',
  height = 300,
  showLegend = true,
  legendPosition = 'top',
  className = '',
  onPointClick,
}: BurndownChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { tooltip, showTooltip, moveTooltip, hideTooltip } = useChartTooltip();

  const aColor = actualColor ?? getSeriesColor(0);
  const pColor = projectedColor ?? aColor;
  const tColor = targetColor ?? getSeriesColor(2);
  const pFillOpacity = projectedFillOpacity ?? fillOpacity * 0.5;

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

  // Gather all categories in order: actual then projected (de-duped)
  const categories = useMemo(() => {
    const seen = new Set<string>();
    const cats: string[] = [];
    const addAll = (data: SeriesDatum[]) => {
      for (const d of data) {
        const key = String(d.x);
        if (!seen.has(key)) {
          seen.add(key);
          cats.push(key);
        }
      }
    };
    addAll(actual);
    if (projected) addAll(projected);
    if (target) addAll(target);
    return cats;
  }, [actual, projected, target]);

  // Y extent
  const valueExtent = useMemo<[number, number]>(() => {
    const allY = [
      ...actual.map((d) => d.y),
      ...(projected ?? []).map((d) => d.y),
      ...(target ?? []).map((d) => d.y),
    ];
    if (allY.length === 0) return [0, 1];
    return [0, Math.max(...allY)];
  }, [actual, projected, target]);

  const [niceMin, niceMax] = niceExtent(valueExtent[0], valueExtent[1], yTickCount);
  const ticks = generateTicks(niceMin, niceMax, yTickCount);

  const xScale = bandScale(categories, [plotLeft, plotRight], 0.05);
  const yScale = linearScale([niceMin, niceMax], [plotBottom, plotTop]);
  const bandwidth = xScale.bandwidth();

  // Divider position — after last actual point
  const dividerX = useMemo(() => {
    if (actual.length === 0) return null;
    const lastCat = String(actual[actual.length - 1].x);
    return xScale(lastCat) + bandwidth / 2;
  }, [actual, xScale, bandwidth]);

  const dividerLabel = currentLabel ?? (actual.length > 0 ? String(actual[actual.length - 1].x) : '');

  // Format tick helper
  const fmtTick = (v: number) => (yPercent ? `${formatTickValue(v)}%` : formatTickValue(v));

  // Build SVG path helpers
  const toLinePath = (data: SeriesDatum[]) =>
    data
      .map((d, i) => {
        const cx = xScale(String(d.x)) + bandwidth / 2;
        const cy = yScale(d.y);
        return `${i === 0 ? 'M' : 'L'} ${cx} ${cy}`;
      })
      .join(' ');

  const toAreaPath = (data: SeriesDatum[]) => {
    const forward = data
      .map((d, i) => {
        const cx = xScale(String(d.x)) + bandwidth / 2;
        const cy = yScale(d.y);
        return `${i === 0 ? 'M' : 'L'} ${cx} ${cy}`;
      })
      .join(' ');
    const lastX = xScale(String(data[data.length - 1].x)) + bandwidth / 2;
    const firstX = xScale(String(data[0].x)) + bandwidth / 2;
    return `${forward} L ${lastX} ${plotBottom} L ${firstX} ${plotBottom} Z`;
  };

  // Legend items — use fill opacity to match the area appearance
  const legendItems = useMemo(() => {
    const withOpacity = (color: string, opacity: number) => {
      // If already rgba/rgb, just override alpha
      const m = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (m) return `rgba(${m[1]}, ${m[2]}, ${m[3]}, ${opacity})`;
      // Hex color
      const hex = color.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      return color;
    };
    const items: { label: string; color: string }[] = [
      { label: 'Actual', color: withOpacity(aColor, fillOpacity) },
    ];
    if (projected && projected.length > 0)
      items.push({ label: 'Projected', color: withOpacity(pColor, pFillOpacity) });
    if (target && target.length > 0) items.push({ label: 'Target', color: tColor });
    return items;
  }, [aColor, pColor, tColor, fillOpacity, pFillOpacity, projected, target]);

  // Dot event handlers factory
  const makeDotHandlers = (
    region: 'actual' | 'projected' | 'target',
    datum: SeriesDatum,
    pointIndex: number,
    color: string,
    seriesLabel: string,
  ) => ({
    onClick: () => onPointClick?.(region, pointIndex, datum),
    onMouseEnter: (e: React.MouseEvent<SVGCircleElement>) => {
      const svgEl = e.currentTarget.closest('svg');
      if (!svgEl) return;
      const rect = svgEl.getBoundingClientRect();
      showTooltip(
        { title: String(datum.x), items: [{ color, label: seriesLabel, value: fmtTick(datum.y) }] },
        e.clientX - rect.left,
        e.clientY - rect.top,
      );
    },
    onMouseMove: (e: React.MouseEvent<SVGCircleElement>) => {
      const svgEl = e.currentTarget.closest('svg');
      if (!svgEl) return;
      const rect = svgEl.getBoundingClientRect();
      moveTooltip(e.clientX - rect.left, e.clientY - rect.top);
    },
    onMouseLeave: hideTooltip,
  });

  const classNames = ['ap-chart', 'ap-burndown-chart', className].filter(Boolean).join(' ');
  const containerStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
  };

  return (
    <div className={classNames} style={containerStyle} ref={containerRef}>
      {title && <div className="ap-chart__title">{title}</div>}
      {showLegend && legendPosition === 'top' && <ChartLegend items={legendItems} position="top" />}
      <div className="ap-chart__body" style={{ display: legendPosition === 'right' ? 'flex' : 'block' }}>
        <svg
          className="ap-burndown-chart__svg"
          viewBox={`0 0 ${VIRTUAL_W} ${height}`}
          preserveAspectRatio="xMinYMin meet"
          role="img"
        >
          {/* Grid lines */}
          {ticks.map((tick) => (
            <line key={tick} x1={plotLeft} x2={plotRight} y1={yScale(tick)} y2={yScale(tick)} className="ap-chart__grid-line" />
          ))}

          {/* Y-axis tick labels */}
          {ticks.map((tick) => (
            <text key={tick} x={plotLeft - 8} y={yScale(tick)} className="ap-chart__tick-label" textAnchor="end" dominantBaseline="middle">
              {fmtTick(tick)}
            </text>
          ))}

          {/* X-axis category labels */}
          {categories.map((cat) => (
            <text key={cat} x={xScale(cat) + bandwidth / 2} y={plotBottom + 16} className="ap-chart__tick-label" textAnchor="middle">
              {cat}
            </text>
          ))}

          {xLabel && (
            <text x={plotLeft + plotW / 2} y={height - 4} className="ap-chart__axis-label" textAnchor="middle">
              {xLabel}
            </text>
          )}
          {yLabel && (
            <text x={14} y={plotTop + plotH / 2} className="ap-chart__axis-label" textAnchor="middle" transform={`rotate(-90, 14, ${plotTop + plotH / 2})`}>
              {yLabel}
            </text>
          )}

          {/* Axis lines */}
          <line x1={plotLeft} x2={plotLeft} y1={plotTop} y2={plotBottom} className="ap-chart__axis-line" />
          <line x1={plotLeft} x2={plotRight} y1={plotBottom} y2={plotBottom} className="ap-chart__axis-line" />

          {/* Target line (dashed, behind everything) */}
          {target && target.length > 1 && (
            <path
              d={toLinePath(target)}
              fill="none"
              stroke={tColor}
              strokeWidth={2}
              strokeDasharray="6 4"
              className="ap-burndown-chart__target-line"
            />
          )}

          {/* Projected area + line */}
          {projected && projected.length > 1 && (
            <g>
              <path d={toAreaPath(projected)} fill={pColor} opacity={pFillOpacity} className="ap-burndown-chart__area ap-burndown-chart__area--projected" />
              <path d={toLinePath(projected)} fill="none" stroke={pColor} strokeWidth={2} opacity={0.6} className="ap-burndown-chart__line ap-burndown-chart__line--projected" />
            </g>
          )}

          {/* Actual area + line */}
          {actual.length > 1 && (
            <g>
              <path d={toAreaPath(actual)} fill={aColor} opacity={fillOpacity} className="ap-burndown-chart__area" />
              <path d={toLinePath(actual)} fill="none" stroke={aColor} strokeWidth={2} className="ap-burndown-chart__line" />
            </g>
          )}

          {/* Current value vertical divider */}
          {showCurrentLine && dividerX !== null && (
            <g className="ap-burndown-chart__divider">
              <line x1={dividerX} x2={dividerX} y1={plotTop} y2={plotBottom} className="ap-burndown-chart__divider-line" />
            </g>
          )}

          {/* Target dots */}
          {target?.map((d, i) => (
            <circle
              key={`t-${i}`}
              cx={xScale(String(d.x)) + bandwidth / 2}
              cy={yScale(d.y)}
              r={3.5}
              fill={tColor}
              stroke="var(--neutral-0)"
              strokeWidth={1.5}
              className="ap-burndown-chart__dot"
              {...makeDotHandlers('target', d, i, tColor, 'Target')}
            />
          ))}

          {/* Projected dots */}
          {projected?.map((d, i) => (
            <circle
              key={`p-${i}`}
              cx={xScale(String(d.x)) + bandwidth / 2}
              cy={yScale(d.y)}
              r={4}
              fill={pColor}
              stroke="var(--neutral-0)"
              strokeWidth={2}
              opacity={0.6}
              className="ap-burndown-chart__dot ap-burndown-chart__dot--projected"
              {...makeDotHandlers('projected', d, i, pColor, 'Projected')}
            />
          ))}

          {/* Actual dots */}
          {actual.map((d, i) => (
            <circle
              key={`a-${i}`}
              cx={xScale(String(d.x)) + bandwidth / 2}
              cy={yScale(d.y)}
              r={4}
              fill={aColor}
              stroke="var(--neutral-0)"
              strokeWidth={2}
              className="ap-burndown-chart__dot"
              {...makeDotHandlers('actual', d, i, aColor, 'Actual')}
            />
          ))}
        </svg>
        {showLegend && legendPosition === 'right' && <ChartLegend items={legendItems} position="right" />}
      </div>
      {showLegend && legendPosition === 'bottom' && <ChartLegend items={legendItems} position="bottom" />}
      <ChartTooltip {...tooltip} containerRef={containerRef} />
    </div>
  );
}
