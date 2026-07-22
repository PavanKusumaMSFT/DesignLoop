/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  FluentProvider,
  webLightTheme,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import {
  Navigation24Regular,
  ArrowRight24Regular,
  Globe24Regular,
  Search24Regular,
  Rocket24Regular,
  PersonAdd24Regular,
} from "@fluentui/react-icons";
import { useNavigation } from "../../../lib/navigation-context";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    background:
      "linear-gradient(120deg, #fefefe 0%, #f8fafc 30%, #f1f5f9 60%, #e2e8f0 80%, #c7d2fe 95%, #a5b4fc 100%)",
  },
  animatedBackground: {
    position: "absolute",
    bottom: "-20%",
    right: "-25%",
    width: "70%",
    height: "70%",
    background:
      "linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(99, 102, 241, 0.12) 30%, rgba(59, 130, 246, 0.15) 60%, rgba(147, 197, 253, 0.1) 100%)",
    borderRadius: "50%",
    filter: "blur(80px)",
    animation: "float 15s ease-in-out infinite",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    padding: "40px 40px 40px 120px",
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    maxWidth: "900px",
  },
  logoSection: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: "8px",
  },
  agxLogo: {
    height: "40px",
    width: "auto",
  },
  titleSection: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  title: {
    fontSize: "48px",
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.1",
    margin: "0",
    background: "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  descriptionSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  subtitle: {
    fontSize: "18px",
    color: tokens.colorNeutralForeground3,
    lineHeight: "1.5",
    margin: "0",
    display: "block",
  },
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "24px",
    marginTop: "40px",
  },
  projectCard: {
    padding: "32px",
    borderRadius: "16px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      borderTopColor: tokens.colorBrandStroke1,
      borderRightColor: tokens.colorBrandStroke1,
      borderBottomColor: tokens.colorBrandStroke1,
      borderLeftColor: tokens.colorBrandStroke1,
    },
  },
  projectIcon: {
    width: "48px",
    height: "48px",
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
    color: "white",
  },
  projectTitle: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "12px",
  },
  projectDescription: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground3,
    lineHeight: "1.5",
    marginBottom: "20px",
  },
  projectButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  floatingElements: {
    position: "absolute",
    top: "20%",
    right: "15%",
    width: "200px",
    height: "200px",
    background:
      "linear-gradient(45deg, rgba(139, 92, 246, 0.08), rgba(99, 102, 241, 0.05))",
    borderRadius: "50%",
    filter: "blur(40px)",
    transition: "transform 0.6s ease-out",
    zIndex: 1,
  },
  floatingElements2: {
    position: "absolute",
    top: "60%",
    left: "5%",
    width: "180px",
    height: "180px",
    background:
      "linear-gradient(225deg, rgba(59, 130, 246, 0.06), rgba(147, 197, 253, 0.04))",
    borderRadius: "50%",
    filter: "blur(35px)",
    transition: "transform 0.8s ease-out",
    zIndex: 1,
  },
  floatingElements3: {
    position: "absolute",
    top: "10%",
    left: "20%",
    width: "160px",
    height: "160px",
    background:
      "linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.06))",
    borderRadius: "50%",
    filter: "blur(30px)",
    transition: "transform 0.7s ease-out",
    zIndex: 1,
  },
  organizationSection: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  organizationName: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightSemibold,
    background:
      "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "0.5px",
    margin: "0",
    lineHeight: "normal",
  },
  loadingContainer: {
    minHeight: "100vh",
    background:
      "linear-gradient(120deg, #fefefe 0%, #f8fafc 30%, #f1f5f9 60%, #e2e8f0 80%, #c7d2fe 95%, #a5b4fc 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  spinner: {
    width: "40px",
    height: "40px",
    borderTopWidth: "3px",
    borderRightWidth: "3px",
    borderBottomWidth: "3px",
    borderLeftWidth: "3px",
    borderTopStyle: "solid",
    borderRightStyle: "solid",
    borderBottomStyle: "solid",
    borderLeftStyle: "solid",
    borderRightColor: "#e2e8f0",
    borderBottomColor: "#e2e8f0",
    borderLeftColor: "#e2e8f0",
    borderTopColor: "#3b82f6",
    borderRadius: "50%",
    animationDuration: "1s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationName: {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },
  },
  containerReady: {
    opacity: 1,
    transitionProperty: "opacity",
    transitionDuration: "0.3s",
    transitionTimingFunction: "ease-in-out",
  },
  containerLoading: {
    opacity: 0,
    transitionProperty: "opacity",
    transitionDuration: "0.3s",
    transitionTimingFunction: "ease-in-out",
  },
});


export default function TeamOverview() {
  const styles = useStyles();
  const { handlePageChange } = useNavigation();
  const [isStylesLoaded, setIsStylesLoaded] = useState(false);
  const floating1Ref = useRef<HTMLDivElement>(null);
  const floating2Ref = useRef<HTMLDivElement>(null);
  const floating3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applyInfluence = (
      el: HTMLDivElement | null,
      index: number,
      intensity: number,
      x: number,
      y: number,
    ) => {
      if (!el) return;
      const centerX = 50;
      const centerY = 50;
      const deltaX = (x - centerX) * intensity * 3;
      const deltaY = (y - centerY) * intensity * 3;
      const multiplier = index === 0 ? 1.5 : index === 1 ? -1.2 : 0.8;
      el.style.transform = `translate(${deltaX * multiplier}px, ${deltaY * multiplier}px) scale(${1 + Math.abs(deltaX * multiplier) * 0.01})`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      applyInfluence(floating1Ref.current, 0, 4, x, y);
      applyInfluence(floating2Ref.current, 1, 3, x, y);
      applyInfluence(floating3Ref.current, 2, 2.5, x, y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Ensure styles are loaded before showing content
    const timer = setTimeout(() => {
      setIsStylesLoaded(true);
    }, 50); // Small delay to ensure styles are applied

    return () => clearTimeout(timer);
  }, [styles]);

  // Show loading state until styles are ready
  if (!isStylesLoaded) {
    return (
      <FluentProvider theme={webLightTheme}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} />
        </div>
      </FluentProvider>
    );
  }

  return (
    <FluentProvider theme={webLightTheme}>
      <div
        className={mergeClasses(
          styles.container,
          isStylesLoaded ? styles.containerReady : styles.containerLoading,
        )}
      >
        {/* Animated Background Elements */}
        <div className={styles.animatedBackground}></div>
        <div className={styles.floatingElements} ref={floating1Ref}></div>
        <div className={styles.floatingElements2} ref={floating2Ref}></div>
        <div className={styles.floatingElements3} ref={floating3Ref}></div>

        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.logoSection}>
              <img
                src="/designloop-logo.svg"
                alt="Proto Loop Logo"
                className={styles.agxLogo}
              />
            </div>

            <div className={styles.titleSection}>
              <Text as="h1" className={styles.title}>
                Azure Portal End-to-End & Growth
              </Text>
            </div>

            <div className={styles.descriptionSection}>
              <Text className={styles.subtitle}>
                Exploring the future of Azure Portal experiences through
                interactive prototypes, user research insights, and innovative
                design patterns that enhance developer and user productivity.
                Note that designs are conceptual and demo purposes only and not
                final.
              </Text>
            </div>

            <div className={styles.organizationSection}>
              <Text className={styles.organizationName}>
                Proto Loop
              </Text>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) rotate(0deg) scale(1);
            }
            50% {
              transform: translateY(-15px) rotate(1deg) scale(1.02);
            }
          }
        `}</style>
      </div>
    </FluentProvider>
  );
}
