"use client";

import { useState, useMemo } from "react";
import { makeStyles, tokens as fluentTokens, Button } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { ArrowLeft20Regular } from "@fluentui/react-icons";
import {
  intents,
  bundles,
  startupServices,
  type StartupService,
} from "../startups-data";
import { IntentGrid } from "./intent-grid";
import { BundleList } from "./bundle-list";
import { NextSteps } from "./next-steps";

type Step = "intents" | "bundles" | "next-steps";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
    flex: 1,
    minHeight: 0,
  },
  backBar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    paddingBottom: "16px",
    flexShrink: 0,
  },
  backLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorBrandForeground1,
    fontFamily: tokens.fontFamilyBase,
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
  },
  stepHeading: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    lineHeight: tokens.lineHeightBase500,
    flexShrink: 0,
  },
  stepSubheading: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    fontFamily: tokens.fontFamilyBase,
    marginTop: "2px",
    marginBottom: "16px",
    flexShrink: 0,
  },
  scrollArea: {
    flex: 1,
    overflowY: "auto",
    minHeight: 0,
    paddingRight: "4px",
  },
});

export function StartupsView() {
  const styles = useStyles();

  const [step, setStep] = useState<Step>("intents");
  const [selectedIntentId, setSelectedIntentId] = useState<string | null>(null);
  const [createdBundleId, setCreatedBundleId] = useState<string | null>(null);

  const serviceMap = useMemo<Map<string, StartupService>>(
    () => new Map(startupServices.map((s) => [s.id, s])),
    [],
  );

  const selectedIntent = intents.find((i) => i.id === selectedIntentId);
  const visibleBundles = bundles.filter((b) => b.intentId === selectedIntentId);
  const createdBundle = bundles.find((b) => b.id === createdBundleId);

  const handleIntentSelect = (intentId: string) => {
    console.info("[Telemetry] Startups_intent_selected", intentId);
    setSelectedIntentId(intentId);
    setCreatedBundleId(null);
    setStep("bundles");
  };

  const handleCreateClick = (bundleId: string) => {
    console.info("[Telemetry] Startups_bundle_selected", bundleId);
    setCreatedBundleId(bundleId);
    setStep("next-steps");
  };

  const handleBackToIntents = () => {
    setStep("intents");
    setSelectedIntentId(null);
    setCreatedBundleId(null);
  };

  const handleBackToBundles = () => {
    setStep("bundles");
    setCreatedBundleId(null);
  };

  return (
    <div className={styles.root}>
      {/* Back navigation */}
      {step !== "intents" && (
        <div className={styles.backBar}>
          <Button
            appearance="transparent"
            size="small"
            icon={<ArrowLeft20Regular />}
            onClick={
              step === "bundles" ? handleBackToIntents : handleBackToBundles
            }
          />
          <span
            className={styles.backLabel}
            onClick={
              step === "bundles" ? handleBackToIntents : handleBackToBundles
            }
          >
            {step === "bundles" ? "Change goal" : "Back to bundles"}
          </span>
        </div>
      )}

      {/* Step sub-heading when on bundles */}
      {step === "bundles" && selectedIntent && (
        <>
          <div className={styles.stepHeading}>Goal: {selectedIntent.title}</div>
          <div className={styles.stepSubheading}>
            {selectedIntent.description}
          </div>
        </>
      )}

      {/* Scrollable body */}
      <div className={styles.scrollArea}>
        {step === "intents" && (
          <IntentGrid intents={intents} onSelect={handleIntentSelect} />
        )}

        {step === "bundles" && (
          <BundleList
            bundles={visibleBundles}
            serviceMap={serviceMap}
            onCreateClick={handleCreateClick}
          />
        )}

        {step === "next-steps" && createdBundle && (
          <NextSteps
            bundle={createdBundle}
            serviceMap={serviceMap}
            onDone={handleBackToIntents}
          />
        )}
      </div>
    </div>
  );
}
