/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import React from "react";
import { makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  svg: {
    display: "block",
    flexShrink: 0,
  },
});

// ---------------------------------------------------------------------------
// Sparkline — lightweight SVG mini-chart
// ---------------------------------------------------------------------------
// Uses a simple polyline. No external charting library required.
// Accepts an optional `color`, `highlightThreshold` (draws red above it),
// and `height`/`width` for sizing.
// ---------------------------------------------------------------------------

export interface SparklineProps {
  data: { time: string; value: number }[];
  width?: number;
  height?: number;
  color?: string;
  fillOpacity?: number;
  highlightThreshold?: number;
  highlightColor?: string;
  showArea?: boolean;
}

/** Lightweight SVG sparkline chart with polyline and optional area fill — no external charting library needed.
 * Cross-project reusable: can be imported by any project. */
export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 120,
  height = 32,
  color = "#0078D4",
  fillOpacity = 0.1,
  showArea = true,
}) => {
  const styles = useStyles();
  if (data.length < 2) return null;

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pad = 2;

  const points = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2);
    const y = height - pad - ((d.value - min) / range) * (height - pad * 2);
    return `${x},${y}`;
  });

  const areaPath = showArea
    ? `M ${pad},${height - pad} ` +
      data
        .map((d, i) => {
          const x = pad + (i / (data.length - 1)) * (width - pad * 2);
          const y =
            height - pad - ((d.value - min) / range) * (height - pad * 2);
          return `L ${x},${y}`;
        })
        .join(" ") +
      ` L ${width - pad},${height - pad} Z`
    : undefined;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={styles.svg}
    >
      {showArea && areaPath && (
        <path d={areaPath} fill={color} opacity={fillOpacity} />
      )}
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
