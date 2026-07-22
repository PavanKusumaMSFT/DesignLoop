/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
import React from 'react';
import './v8-chart-legend.css';

export interface ChartLegendItem {
  label: string;
  color: string;
}

export interface ChartLegendProps {
  items: ChartLegendItem[];
  position?: 'top' | 'bottom' | 'right';
  className?: string;
}

export function ChartLegend({ items, position = 'top', className = '' }: ChartLegendProps) {
  if (items.length === 0) return null;

  const classNames = [
    'ap-chart-legend',
    `ap-chart-legend--${position}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {items.map((item, i) => (
        <div key={i} className="ap-chart-legend__item">
          <span className="ap-chart-legend__swatch" style={{ background: item.color }} />
          <span className="ap-chart-legend__label">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
