/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
import React, { useMemo, useRef } from 'react';
import { ChartTooltip, useChartTooltip } from './v8-chart-tooltip';
import { ChartLegend } from './v8-chart-legend';
import { getSeriesColor, formatTickValue } from './v8-chart-utils';
import type { CategoricalDatum, ChartBaseProps } from './v8-chart-utils';
import './v8-chart.css';
import './v8-chart-pie.css';

export interface PieChartProps extends ChartBaseProps {
  /** Pie/Donut slices */
  data: CategoricalDatum[];
  /** Inner radius ratio (0 = pie, >0 = donut). Default 0 */
  innerRadius?: number;
  /** Click handler for a slice */
  onSliceClick?: (datum: CategoricalDatum, index: number) => void;
}

const VIRTUAL_SIZE = 300;

/** Compute arc path for an SVG sector */
function arcPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number
): string {
  const cos = Math.cos;
  const sin = Math.sin;
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

  const ox1 = cx + outerR * cos(startAngle);
  const oy1 = cy + outerR * sin(startAngle);
  const ox2 = cx + outerR * cos(endAngle);
  const oy2 = cy + outerR * sin(endAngle);

  if (innerR <= 0) {
    // Solid pie slice
    return [
      `M ${cx} ${cy}`,
      `L ${ox1} ${oy1}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${ox2} ${oy2}`,
      'Z',
    ].join(' ');
  }

  // Donut slice
  const ix1 = cx + innerR * cos(startAngle);
  const iy1 = cy + innerR * sin(startAngle);
  const ix2 = cx + innerR * cos(endAngle);
  const iy2 = cy + innerR * sin(endAngle);

  return [
    `M ${ox1} ${oy1}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${ox2} ${oy2}`,
    `L ${ix2} ${iy2}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix1} ${iy1}`,
    'Z',
  ].join(' ');
}

export function PieChart({
  data,
  innerRadius = 0,
  title,
  width = '100%',
  height = 300,
  showLegend = true,
  legendPosition = 'right',
  className = '',
  onSliceClick,
}: PieChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { tooltip, showTooltip, moveTooltip, hideTooltip } = useChartTooltip();

  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

  const slices = useMemo(() => {
    const cx = VIRTUAL_SIZE / 2;
    const cy = VIRTUAL_SIZE / 2;
    const outerR = VIRTUAL_SIZE / 2 - 4; // small padding
    const innerR = outerR * innerRadius;

    let angle = -Math.PI / 2; // start at top
    return data.map((d, i) => {
      const sliceAngle = total > 0 ? (d.value / total) * Math.PI * 2 : 0;
      const startAngle = angle;
      const endAngle = angle + sliceAngle;
      angle = endAngle;
      return {
        path: arcPath(cx, cy, outerR, innerR, startAngle, endAngle),
        color: getSeriesColor(i),
        datum: d,
        index: i,
        percentage: total > 0 ? ((d.value / total) * 100).toFixed(1) : '0',
      };
    });
  }, [data, total, innerRadius]);

  const legendItems = useMemo(
    () => data.map((d, i) => ({ label: d.label, color: getSeriesColor(i) })),
    [data]
  );

  const classNames = ['ap-chart', 'ap-pie-chart', className].filter(Boolean).join(' ');
  const containerStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
  };

  return (
    <div className={classNames} style={containerStyle} ref={containerRef}>
      {title && <div className="ap-chart__title">{title}</div>}
      {showLegend && legendPosition === 'top' && <ChartLegend items={legendItems} position="top" />}
      <div className="ap-chart__body ap-pie-chart__body" style={{ display: legendPosition === 'right' ? 'flex' : 'block', alignItems: 'center' }}>
        <svg
          className="ap-pie-chart__svg"
          viewBox={`0 0 ${VIRTUAL_SIZE} ${VIRTUAL_SIZE}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ maxHeight: height }}
          role="img"
          aria-label={`${innerRadius > 0 ? 'Donut' : 'Pie'} chart`}
        >
          {slices.map((slice) => (
            <path
              key={slice.index}
              d={slice.path}
              fill={slice.color}
              className="ap-pie-chart__slice"
              onClick={() => onSliceClick?.(slice.datum, slice.index)}
              onMouseEnter={(e) => {
                const svgEl = e.currentTarget.closest('svg');
                if (!svgEl) return;
                const pt = svgEl.getBoundingClientRect();
                showTooltip(
                  {
                    items: [{
                      color: slice.color,
                      label: slice.datum.label,
                      value: `${formatTickValue(slice.datum.value)} (${slice.percentage}%)`,
                    }],
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
        </svg>
        {showLegend && legendPosition === 'right' && <ChartLegend items={legendItems} position="right" />}
      </div>
      {showLegend && legendPosition === 'bottom' && <ChartLegend items={legendItems} position="bottom" />}
      <ChartTooltip {...tooltip} containerRef={containerRef} />
    </div>
  );
}

/** Convenience wrapper: Donut is Pie with innerRadius=0.6 */
export interface DonutChartProps extends Omit<PieChartProps, 'innerRadius'> {
  /** Inner radius ratio. Default 0.6 */
  innerRadius?: number;
}

export function DonutChart({ innerRadius = 0.6, ...props }: DonutChartProps) {
  return <PieChart innerRadius={innerRadius} {...props} />;
}
