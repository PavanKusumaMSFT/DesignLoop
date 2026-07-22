/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
import React, { useMemo, useRef } from 'react';
import { ChartTooltip, useChartTooltip } from './v8-chart-tooltip';
import { formatTickValue } from './v8-chart-utils';
import type { HeatmapDatum, ChartBaseProps } from './v8-chart-utils';
import './v8-chart.css';
import './v8-chart-heatmap.css';

export interface HeatmapChartProps extends ChartBaseProps {
  /** Heatmap cell data */
  data: HeatmapDatum[];
  /** X-axis label */
  xLabel?: string;
  /** Y-axis label */
  yLabel?: string;
  /** Low-value color. Default 'var(--blue-10)' */
  colorMin?: string;
  /** High-value color. Default 'var(--blue-50)' */
  colorMax?: string;
  /** Cell border radius in px. Default 2 */
  cellRadius?: number;
  /** Cell gap in virtual px. Default 2 */
  cellGap?: number;
  /** Click handler */
  onCellClick?: (datum: HeatmapDatum) => void;
}

const MARGIN = { top: 8, right: 16, bottom: 40, left: 56 };
const MARGIN_WITH_X_LABEL = { ...MARGIN, bottom: 60 };
const MARGIN_WITH_Y_LABEL = { ...MARGIN, left: 80 };
const VIRTUAL_W = 600;

export function HeatmapChart({
  data,
  title,
  xLabel,
  yLabel,
  width = '100%',
  height = 300,
  colorMin = 'var(--blue-10)',
  colorMax = 'var(--blue-50)',
  cellRadius = 2,
  cellGap = 2,
  className = '',
  onCellClick,
}: HeatmapChartProps) {
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

  // Derive unique x and y categories
  const xCategories = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);
  const yCategories = useMemo(() => [...new Set(data.map((d) => d.y))], [data]);

  // Value range
  const [valMin, valMax] = useMemo(() => {
    const values = data.map((d) => d.value);
    if (values.length === 0) return [0, 1];
    return [Math.min(...values), Math.max(...values)];
  }, [data]);

  // Cell sizing
  const cellW = xCategories.length > 0 ? (plotW - cellGap * (xCategories.length - 1)) / xCategories.length : plotW;
  const cellH = yCategories.length > 0 ? (plotH - cellGap * (yCategories.length - 1)) / yCategories.length : plotH;

  // Build lookup
  const cellLookup = useMemo(() => {
    const map = new Map<string, HeatmapDatum>();
    data.forEach((d) => map.set(`${d.x}|${d.y}`, d));
    return map;
  }, [data]);

  // Normalize value to 0–1 for color interpolation
  const normalizeValue = (v: number) => {
    if (valMax === valMin) return 0.5;
    return (v - valMin) / (valMax - valMin);
  };

  const classNames = ['ap-chart', 'ap-heatmap-chart', className].filter(Boolean).join(' ');
  const containerStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
  };

  // Define gradient for cell fill
  const gradientId = 'ap-heatmap-grad';

  return (
    <div className={classNames} style={containerStyle} ref={containerRef}>
      {title && <div className="ap-chart__title">{title}</div>}
      <svg
        className="ap-heatmap-chart__svg"
        viewBox={`0 0 ${VIRTUAL_W} ${height}`}
        preserveAspectRatio="xMinYMin meet"
        role="img"
        aria-label="Heatmap chart"
      >
        <defs>
          <linearGradient id={gradientId}>
            <stop offset="0%" stopColor={colorMin} />
            <stop offset="100%" stopColor={colorMax} />
          </linearGradient>
        </defs>

        {/* Y-axis labels */}
        {yCategories.map((cat, yi) => (
          <text
            key={cat}
            x={plotLeft - 8}
            y={plotTop + yi * (cellH + cellGap) + cellH / 2}
            className="ap-chart__tick-label"
            textAnchor="end"
            dominantBaseline="middle"
          >
            {cat}
          </text>
        ))}

        {/* X-axis labels */}
        {xCategories.map((cat, xi) => (
          <text
            key={cat}
            x={plotLeft + xi * (cellW + cellGap) + cellW / 2}
            y={plotBottom + 16}
            className="ap-chart__tick-label"
            textAnchor="middle"
          >
            {cat}
          </text>
        ))}

        {/* Axis labels */}
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

        {/* Cells */}
        {xCategories.map((xCat, xi) =>
          yCategories.map((yCat, yi) => {
            const datum = cellLookup.get(`${xCat}|${yCat}`);
            if (!datum) return null;
            const t = normalizeValue(datum.value);
            const x = plotLeft + xi * (cellW + cellGap);
            const y = plotTop + yi * (cellH + cellGap);
            return (
              <rect
                key={`${xi}-${yi}`}
                x={x}
                y={y}
                width={Math.max(cellW, 0)}
                height={Math.max(cellH, 0)}
                rx={cellRadius}
                ry={cellRadius}
                opacity={0.15 + t * 0.85}
                fill={`url(#${gradientId})`}
                className="ap-heatmap-chart__cell"
                onClick={() => onCellClick?.(datum)}
                onMouseEnter={(e) => {
                  const svgEl = e.currentTarget.closest('svg');
                  if (!svgEl) return;
                  const pt = svgEl.getBoundingClientRect();
                  showTooltip(
                    {
                      title: `${xCat} / ${yCat}`,
                      items: [{ color: colorMax, label: 'Value', value: formatTickValue(datum.value) }],
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
          })
        )}
      </svg>
      <ChartTooltip {...tooltip} containerRef={containerRef} />
    </div>
  );
}
