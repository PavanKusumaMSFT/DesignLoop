import * as React from "react";
import { SVGProps } from "react";

/** Renders a 20×20 search magnifying glass icon with a gradient stroke (pink→orange).
 * Used in search bars and copilot input fields for branded visual emphasis.
 * Instead of: importing a flat Fluent icon when a gradient-branded search icon is needed. */
export const GradientSearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        {/* eslint-disable no-restricted-syntax */}
        <stop offset="0%" stopColor="#C13584" />
        <stop offset="50%" stopColor="#E1306C" />
        <stop offset="100%" stopColor="#F77737" />
        {/* eslint-enable no-restricted-syntax */}
      </linearGradient>
    </defs>
    <path
      d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
      stroke="url(#gradient)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
