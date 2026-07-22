/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
import React, { useState, useCallback, useRef } from 'react';
import './v8-chart-tooltip.css';

export interface TooltipData {
  /** Tooltip title (e.g., category label) */
  title?: string;
  /** Tooltip rows: color swatch + label + value */
  items: { color: string; label: string; value: string }[];
}

export interface ChartTooltipProps {
  data: TooltipData | null;
  x: number;
  y: number;
  visible: boolean;
  /** Container ref for boundary clamping */
  containerRef?: React.RefObject<HTMLElement | null>;
}

export function ChartTooltip({ data, x, y, visible, containerRef }: ChartTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  if (!visible || !data) return null;

  // Offset tooltip to avoid cursor overlap
  const offsetX = 12;
  const offsetY = -8;

  let finalX = x + offsetX;
  let finalY = y + offsetY;

  // Clamp within container if we have refs
  if (tooltipRef.current && containerRef?.current) {
    const containerRect = containerRef.current.getBoundingClientRect();
    const tipRect = tooltipRef.current.getBoundingClientRect();
    if (finalX + tipRect.width > containerRect.width) {
      finalX = x - tipRect.width - offsetX;
    }
    if (finalY + tipRect.height > containerRect.height) {
      finalY = containerRect.height - tipRect.height - 4;
    }
    if (finalY < 0) finalY = 4;
  }

  return (
    <div
      ref={tooltipRef}
      className="ap-chart-tooltip"
      style={{
        left: finalX,
        top: finalY,
      }}
    >
      {data.title && <div className="ap-chart-tooltip__title">{data.title}</div>}
      {data.items.map((item, i) => (
        <div key={i} className="ap-chart-tooltip__row">
          <span className="ap-chart-tooltip__swatch" style={{ background: item.color }} />
          <span className="ap-chart-tooltip__label">{item.label}</span>
          <span className="ap-chart-tooltip__value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

/** Hook to manage tooltip state for any chart */
export function useChartTooltip() {
  const [tooltip, setTooltip] = useState<{
    data: TooltipData | null;
    x: number;
    y: number;
    visible: boolean;
  }>({ data: null, x: 0, y: 0, visible: false });

  const showTooltip = useCallback(
    (data: TooltipData, x: number, y: number) => {
      setTooltip({ data, x, y, visible: true });
    },
    []
  );

  const moveTooltip = useCallback(
    (x: number, y: number) => {
      setTooltip((prev) => ({ ...prev, x, y }));
    },
    []
  );

  const hideTooltip = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  return { tooltip, showTooltip, moveTooltip, hideTooltip };
}
