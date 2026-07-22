"use client";

import type React from "react";
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  tokens as fluentTokens,
} from "@fluentui/react-components";
import { Search24Regular } from "@fluentui/react-icons";
import { useRef, useEffect } from "react";

const CopilotSVGIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.6691 1.98972C11.4685 1.39807 10.9132 1 10.2884 1L9.38791 1C8.68681 1 8.085 1.49905 7.95523 2.18803L7.02393 7.13282L7.48695 5.54883C7.66865 4.92722 8.23863 4.5 8.88625 4.5L11.765 4.5L13.0095 6.12858L14.1175 4.5L13.5653 4.5C12.9406 4.5 12.3853 4.10193 12.1847 3.51027L11.6691 1.98972Z"
      fill="url(#paint0_radial_4407_38935)"
    />
    <path
      d="M4.50309 14.0036C4.70167 14.5987 5.25866 15 5.88598 15H7.35221C8.14798 15 8.79674 14.3619 8.80987 13.5662L8.88301 9.13477L8.49768 10.4516C8.31584 11.073 7.74595 11.5 7.09849 11.5L4.20857 11.5L2.97822 10.4147L2.07031 11.5H2.61719C3.24451 11.5 3.80149 11.9013 4.00008 12.4964L4.50309 14.0036Z"
      fill="url(#paint1_radial_4407_38935)"
    />
    <path
      d="M10.0004 1H4.16755C2.50102 1 1.50109 3.20235 0.834479 5.40471C0.044714 8.01392 -0.988711 11.5035 2.00105 11.5035H4.69024C5.34194 11.5035 5.91403 11.0727 6.09306 10.4461C6.52129 8.94725 7.32308 6.15282 7.94795 4.04403C8.25428 3.01026 8.50944 2.12243 8.90103 1.56954C9.12058 1.25958 9.48649 1 10.0004 1Z"
      fill="url(#paint2_linear_4407_38935)"
    />
    <path
      d="M10.0004 1H4.16755C2.50102 1 1.50109 3.20235 0.834479 5.40471C0.044714 8.01392 -0.988711 11.5035 2.00105 11.5035H4.69024C5.34194 11.5035 5.91403 11.0727 6.09306 10.4461C6.52129 8.94725 7.32308 6.15282 7.94795 4.04403C8.25428 3.01026 8.50944 2.12243 8.90103 1.56954C9.12058 1.25958 9.48649 1 10.0004 1Z"
      fill="url(#paint3_linear_4407_38935)"
    />
    <path
      d="M5.99951 15H11.8324C13.4989 15 14.4988 12.7979 15.1655 10.5958C15.9552 7.98689 16.9887 4.49768 13.9989 4.49768H11.3097C10.658 4.49768 10.0859 4.92848 9.90686 5.55508C9.47862 7.05377 8.67685 9.84782 8.05199 11.9563C7.74566 12.99 7.49051 13.8777 7.09891 14.4305C6.87936 14.7405 6.51346 15 5.99951 15Z"
      fill="url(#paint4_radial_4407_38935)"
    />
    <path
      d="M5.99951 15H11.8324C13.4989 15 14.4988 12.7979 15.1655 10.5958C15.9552 7.98689 16.9887 4.49768 13.9989 4.49768H11.3097C10.658 4.49768 10.0859 4.92848 9.90686 5.55508C9.47862 7.05377 8.67685 9.84782 8.05199 11.9563C7.74566 12.99 7.49051 13.8777 7.09891 14.4305C6.87936 14.7405 6.51346 15 5.99951 15Z"
      fill="url(#paint5_radial_4407_38935)"
    />
    <defs>
      <radialGradient
        id="paint0_radial_4407_38935"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(10.5 3.5) rotate(90) scale(2.5 3.5)"
      >
        {/* eslint-disable no-restricted-syntax */}
        <stop stopColor="#9168C0" />
        <stop offset="1" stopColor="#68217A" />
        {/* eslint-enable no-restricted-syntax */}
      </radialGradient>
      <radialGradient
        id="paint1_radial_4407_38935"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(5.5 12.5) rotate(-90) scale(2.5 3.5)"
      >
        {/* eslint-disable no-restricted-syntax */}
        <stop stopColor="#9168C0" />
        <stop offset="1" stopColor="#68217A" />
        {/* eslint-enable no-restricted-syntax */}
      </radialGradient>
      <linearGradient
        id="paint2_linear_4407_38935"
        x1="0.834479"
        y1="6.25176"
        x2="10.0004"
        y2="6.25176"
        gradientUnits="userSpaceOnUse"
      >
        {/* eslint-disable no-restricted-syntax */}
        <stop stopColor="#1BA1E2" />
        <stop offset="0.5" stopColor="#5E9624" />
        <stop offset="1" stopColor="#F25022" />
        {/* eslint-enable no-restricted-syntax */}
      </linearGradient>
      <linearGradient
        id="paint3_linear_4407_38935"
        x1="0.834479"
        y1="6.25176"
        x2="10.0004"
        y2="6.25176"
        gradientUnits="userSpaceOnUse"
      >
        {/* eslint-disable no-restricted-syntax */}
        <stop stopColor="#1BA1E2" />
        <stop offset="0.5" stopColor="#5E9624" />
        <stop offset="1" stopColor="#F25022" />
        {/* eslint-enable no-restricted-syntax */}
      </linearGradient>
      <radialGradient
        id="paint4_radial_4407_38935"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(5.5 9.75) rotate(90) scale(5.25 7.5)"
      >
        {/* eslint-disable no-restricted-syntax */}
        <stop stopColor="#1BA1E2" />
        <stop offset="1" stopColor="#5E9624" />
        {/* eslint-enable no-restricted-syntax */}
      </radialGradient>
      <radialGradient
        id="paint5_radial_4407_38935"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(13.9989 9.75) rotate(90) scale(5.25 7.5)"
      >
        {/* eslint-disable no-restricted-syntax */}
        <stop stopColor="#F25022" />
        <stop offset="1" stopColor="#FFBA08" />
        {/* eslint-enable no-restricted-syntax */}
      </radialGradient>
    </defs>
  </svg>
);

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  dropdown: {
    position: "absolute",
    top: "calc(100% - 28px)", // Move panel down 8px from previous -36px
    left: "0",
    marginTop: "8px",
    width: "100%",
    maxWidth: "768px", // Match search field width
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "24px",
    boxShadow: "0 16px 32px rgba(0, 0, 0, 0.14), 0 0 2px rgba(0, 0, 0, 0.12)",
    zIndex: 1001,
    overflowY: "auto",
    maxHeight: "70vh",
  },
  suggestionsSection: {
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
  },
  suggestionsLabel: {
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalL} ${tokens.spacingVerticalXS} ${tokens.spacingHorizontalXXL}`,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase200,
  },
  suggestionItem: {
    width: "100%",
    textAlign: "left",
    padding: "12px 16px 12px 24px",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  workloadAgentItem: {
    width: "50%", // Changed width from 100% to 50% for workload agent recommendation card
    textAlign: "left",
    padding: "16px",
    border: `1px solid ${tokens.colorNeutralStroke2}`, // Add light gray border to workload agent recommendation
    backgroundColor: tokens.colorNeutralBackground1, // Style recommendation card like workload agent card with gradient left border
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderRadius: "8px",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: tokens.shadow8,
    },
    "&::before": {
      content: '""',
      position: "absolute",
      left: "0",
      top: "0",
      bottom: "0",
      width: "4px",
      background: "linear-gradient(to bottom, #0078d4, #8b5cf6)",
    },
  },
});

interface SimpleSearchSuggestionsProps {
  showSuggestions: boolean;
  onSuggestionClick: (suggestion: string) => void;
  setShowSuggestions: (show: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  experienceLevel?: "new" | "smb" | "enterprise";
  searchValue?: string;
}

/** Dropdown panel of prompt suggestions that appears below a search input, with experience-level–aware suggestions.
 * Composed from: FluentProvider, makeStyles dropdown, Search24Regular icon, click-outside dismiss.
 * Instead of: building inline search suggestion lists with manual outside-click handling. */
export default function SimpleSearchSuggestions({
  showSuggestions,
  onSuggestionClick,
  setShowSuggestions,
  inputRef,
  experienceLevel = "new",
  searchValue = "",
}: SimpleSearchSuggestionsProps) {
  const styles = useStyles();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getSuggestions = () => {
    if (experienceLevel === "enterprise") {
      if (searchValue.includes("Scaling enterprise workloads")) {
        return [
          "Set up auto-scaling for enterprise applications",
          "Configure load balancing for high availability",
          "Implement enterprise-grade monitoring",
          "Deploy multi-region architecture",
        ];
      }
      if (searchValue.includes("Multi-cloud governance")) {
        return [
          "Set up Azure Policy for governance",
          "Configure cross-cloud security policies",
          "Implement compliance monitoring",
          "Deploy governance automation",
        ];
      }
      return [
        "Deploy enterprise-scale architecture",
        "Set up advanced security compliance",
        "Configure multi-region deployment",
        "Implement enterprise monitoring",
        "Set up DevOps at scale",
        "Configure advanced networking",
      ];
    } else if (experienceLevel === "smb") {
      if (searchValue.includes("Migrating infrastructure")) {
        return [
          "Migrate on-premises servers to Azure",
          "Set up hybrid cloud connectivity",
          "Plan database migration strategy",
          "Configure backup and disaster recovery",
        ];
      }
      if (searchValue.includes("Modernizing business applications")) {
        return [
          "Containerize legacy applications",
          "Set up CI/CD for business apps",
          "Migrate to cloud-native architecture",
          "Implement API management",
        ];
      }
      return [
        "Migrate my business to Azure",
        "Set up cost-effective cloud backup",
        "Configure basic security for SMB",
        "Implement remote work solutions",
        "Set up business continuity",
        "Optimize cloud costs for SMB",
      ];
    } else {
      return [
        "Deploy my first application to Azure",
        "Scale my web service automatically",
        "Migrate my database to Azure",
        "Set up monitoring for my app",
        "Configure security for my resources",
        "Manage my Azure databases",
      ];
    }
  };

  const getWorkloadAgentRecommendation = () => {
    if (experienceLevel === "enterprise") {
      if (
        searchValue.includes("Scale my enterprise workloads") ||
        searchValue.includes("Scaling enterprise workloads")
      ) {
        return {
          title: "Use workload agent for enterprise scaling",
          description:
            "Get AI-powered recommendations for scaling enterprise workloads and infrastructure",
        };
      }
      return {
        title: "Use workload agent for enterprise deployment",
        description:
          "Get AI-powered enterprise infrastructure recommendations and deployment scripts",
      };
    } else if (experienceLevel === "smb") {
      if (
        searchValue.includes("Migrate my infrastructure to Azure") ||
        searchValue.includes("Migrating infrastructure")
      ) {
        return {
          title: "Use workload agent for migration",
          description:
            "Get AI-powered migration recommendations and step-by-step guidance",
        };
      }
      return {
        title: "Use workload agent for SMB deployment",
        description:
          "Get AI-powered SMB infrastructure recommendations and deployment scripts",
      };
    }
    return {
      title: "Use workload agent to deploy",
      description:
        "Get AI-powered infrastructure recommendations and deployment scripts",
    };
  };

  const suggestions = getSuggestions();

  const workloadAgent = getWorkloadAgentRecommendation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputRef, setShowSuggestions]);

  if (!showSuggestions) {
    return null;
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.dropdown} ref={dropdownRef}>
        <div className={styles.suggestionsSection}>
          {/* Prompt suggestions label */}
          <div className={styles.suggestionsLabel}>Prompt suggestions</div>

          {suggestions.map((suggestion: string, index: number) => (
            <button
              key={index}
              className={styles.suggestionItem}
              onClick={() => onSuggestionClick(suggestion)}
            >
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      </div>
    </FluentProvider>
  );
}
