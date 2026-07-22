interface CopilotSVGIconProps {
  width?: number;
  height?: number;
  className?: string;
}

/** Full-color gradient Copilot brand icon with unique gradient IDs to avoid SVG conflicts.
 * Instead of: pasting inline gradient SVG markup or using a static image for the Copilot icon. */
export const CopilotSVGIcon = ({
  width = 16,
  height = 16,
  className,
}: CopilotSVGIconProps = {}) => {
  // Generate unique ID for gradients to avoid conflicts
  const uniqueId = Math.random().toString(36).substr(2, 9);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.6691 1.98972C11.4685 1.39807 10.9132 1 10.2884 1L9.38791 1C8.68681 1 8.085 1.49905 7.95523 2.18803L7.02393 7.13282L7.48695 5.54883C7.66865 4.92722 8.23863 4.5 8.88625 4.5L11.765 4.5L13.0095 6.12858L14.1175 4.5L13.5653 4.5C12.9406 4.5 12.3853 4.10193 12.1847 3.51027L11.6691 1.98972Z"
        fill={`url(#paint0_radial_${uniqueId})`}
      />
      <path
        d="M4.50309 14.0036C4.70167 14.5987 5.25866 15 5.88598 15H7.35221C8.14798 15 8.79674 14.3619 8.80987 13.5662L8.88301 9.13477L8.49768 10.4516C8.31584 11.073 7.74595 11.5 7.09849 11.5L4.20857 11.5L2.97822 10.4147L2.07031 11.5H2.61719C3.24451 11.5 3.80149 11.9013 4.00008 12.4964L4.50309 14.0036Z"
        fill={`url(#paint1_radial_${uniqueId})`}
      />
      <path
        d="M10.0004 1H4.16755C2.50102 1 1.50109 3.20235 0.834479 5.40471C0.044714 8.01392 -0.988711 11.5035 2.00105 11.5035H4.69024C5.34194 11.5035 5.91403 11.0727 6.09306 10.4461C6.52129 8.94725 7.32308 6.15282 7.94795 4.04403C8.25428 3.01026 8.50944 2.12243 8.90103 1.56954C9.12058 1.25958 9.48649 1 10.0004 1Z"
        fill={`url(#paint2_linear_${uniqueId})`}
      />
      <path
        d="M10.0004 1H4.16755C2.50102 1 1.50109 3.20235 0.834479 5.40471C0.044714 8.01392 -0.988711 11.5035 2.00105 11.5035H4.69024C5.34194 11.5035 5.91403 11.0727 6.09306 10.4461C6.52129 8.94725 7.32308 6.15282 7.94795 4.04403C8.25428 3.01026 8.50944 2.12243 8.90103 1.56954C9.12058 1.25958 9.48649 1 10.0004 1Z"
        fill={`url(#paint3_linear_${uniqueId})`}
      />
      <path
        d="M5.99951 15H11.8324C13.4989 15 14.4988 12.7979 15.1655 10.5958C15.9552 7.98689 16.9887 4.49768 13.9989 4.49768H11.3097C10.658 4.49768 10.0859 4.92848 9.90686 5.55508C9.47862 7.05377 8.67685 9.84782 8.05199 11.9563C7.74566 12.99 7.49051 13.8777 7.09891 14.4305C6.87936 14.7405 6.51346 15 5.99951 15Z"
        fill={`url(#paint4_radial_${uniqueId})`}
      />
      <path
        d="M5.99951 15H11.8324C13.4989 15 14.4988 12.7979 15.1655 10.5958C15.9552 7.98689 16.9887 4.49768 13.9989 4.49768H11.3097C10.658 4.49768 10.0859 4.92848 9.90686 5.55508C9.47862 7.05377 8.67685 9.84782 8.05199 11.9563C7.74566 12.99 7.49051 13.8777 7.09891 14.4305C6.87936 14.7405 6.51346 15 5.99951 15Z"
        fill={`url(#paint5_radial_${uniqueId})`}
      />
      {/* eslint-disable no-restricted-syntax -- SVG gradient brand colors cannot use CSS custom properties */}
      <defs>
        <radialGradient
          id={`paint0_radial_${uniqueId}`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-4.01994 -5.00476 -4.34022 4.19783 13.0846 7.1729)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0955758" stopColor="#00AEFF" />
          <stop offset="0.773185" stopColor="#2253CE" />
          <stop offset="1" stopColor="#0736C4" />
        </radialGradient>
        <radialGradient
          id={`paint1_radial_${uniqueId}`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(3.56222 4.42321 4.20512 -3.61031 3.30628 11.0661)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFB657" />
          <stop offset="0.633728" stopColor="#FF5F3D" />
          <stop offset="0.923392" stopColor="#C02B3C" />
        </radialGradient>
        <linearGradient
          id={`paint2_linear_${uniqueId}`}
          x1="3.81844"
          y1="2.2727"
          x2="4.65052"
          y2="11.8998"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.156162" stopColor="#0D91E1" />
          <stop offset="0.487484" stopColor="#52B471" />
          <stop offset="0.652394" stopColor="#98BD42" />
          <stop offset="0.937361" stopColor="#FFC800" />
        </linearGradient>
        <linearGradient
          id={`paint3_linear_${uniqueId}`}
          x1="4.54577"
          y1="1"
          x2="5.00014"
          y2="11.5035"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3DCBFF" />
          <stop offset="0.246674" stopColor="#0588F7" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id={`paint4_radial_${uniqueId}`}
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(-4.60802 13.1726 -15.6828 -5.81373 14.2985 3.46943)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0661714" stopColor="#8C48FF" />
          <stop offset="0.5" stopColor="#F2598A" />
          <stop offset="0.895833" stopColor="#FFB152" />
        </radialGradient>
        <linearGradient
          id={`paint5_linear_${uniqueId}`}
          x1="14.7593"
          y1="3.85649"
          x2="14.7534"
          y2="6.71696"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0581535" stopColor="#F8ADFA" />
          <stop offset="0.708063" stopColor="#A86EDD" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* eslint-enable no-restricted-syntax */}
    </svg>
  );
};
