"use client";

import { useState } from "react";
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  Input,
  Field,
  Link,
  Card,
  mergeClasses,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from "@fluentui/react-components";
import {
  Checkmark16Regular,
  Open12Regular,
  ChatHelp20Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
    flex: 1,
  },

  /* Two-column layout: main + sidebar */
  contentRow: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: tokens.spacingHorizontalXXL,
    alignItems: "start",
  },

  mainContent: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
  },

  /* Step sections */
  stepSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  stepLabel: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },

  /* Support plan cards row */
  planCardsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: tokens.spacingHorizontalM,
  },
  planCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalL,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    cursor: "pointer",
    backgroundColor: tokens.colorNeutralBackground1,
    minHeight: "120px",
    ":hover": {
      borderColor: tokens.colorNeutralStroke1,
    },
  },
  planCardSelected: {
    borderColor: tokens.colorBrandStroke1,
    borderWidth: "2px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  planCardTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
  planCardDesc: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground2,
  },

  /* Upgrade button + disclaimer */
  upgradeSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: tokens.spacingVerticalM,
    paddingTop: tokens.spacingVerticalL,
  },
  disclaimer: {
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: tokens.colorNeutralForeground2,
    textAlign: "center",
    maxWidth: "600px",
  },

  /* Right sidebar */
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
  },
  whyUpgradeCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    paddingTop: tokens.spacingVerticalXL,
    paddingBottom: tokens.spacingVerticalXL,
    paddingLeft: tokens.spacingHorizontalXL,
    paddingRight: tokens.spacingHorizontalXL,
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow4,
  },
  whyTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase500,
    color: tokens.colorNeutralForeground1,
  },
  whySection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  whySectionTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
  whySectionDesc: {
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground2,
  },

  /* FAQ section */
  faqSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  faqTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase500,
    color: tokens.colorNeutralForeground1,
  },

  /* Feedback */
  feedbackSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    paddingTop: tokens.spacingVerticalL,
  },
  feedbackTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
  },
});

const supportPlans = [
  {
    id: "basic",
    name: "Basic - Included",
    description:
      "For individuals or teams that do not require technical support",
  },
  {
    id: "developer",
    name: "Developer - $35.26/month",
    description:
      "Technical support available on weekdays from 9:00 AM to 5:00 PM with initial response times under 8 business hours.",
  },
  {
    id: "standard",
    name: "Standard - $121.59/month",
    description:
      "Initial response time is between one hour and one business day, based on case severity.",
  },
  {
    id: "professional",
    name: "Professional Direct - $1215.90/month",
    description:
      "Initial response time between one hour and one business day, based on case severity, and includes high-severity incident management. Includes advisory services and access to expert webinars.",
  },
];

const whyUpgradeItems = [
  {
    title: "Continued access to free services",
    desc: "Upgrade your subscription to pay as you go and keep enjoying free monthly amounts of 85+ popular Azure services.",
  },
  {
    title: "Pay only for what you use",
    desc: "Your upgraded plan requires no upfront commitment and you can cancel anytime. Any remaining credit from your trial rolls over and is valid for 30 days from sign up.",
  },
  {
    title: "Production - ready capabilities",
    desc: "Upgrade to activate access to the full catalog of Azure services—helping you deliver at scale with security and reliability.",
  },
];

const faqItems = [
  "What happens if I don't upgrade?",
  "What happens to my unused credit if I upgrade before 30 days?",
  "How do free services work after I upgrade?",
  "When will I get charged after I upgrade?",
];

/** Upgrade subscription page — Name subscription, choose support plan, upgrade to pay-as-you-go. */
export default function UpgradePage() {
  const styles = useStyles();
  const [subscriptionName, setSubscriptionName] = useState("Azure subscription 1");
  const [selectedPlan, setSelectedPlan] = useState("basic");

  return (
    <div className={styles.container}>
      <div className={styles.contentRow}>
        {/* Main content */}
        <div className={styles.mainContent}>
          {/* Step 1: Name your subscription */}
          <div className={styles.stepSection}>
            <Text className={styles.stepLabel}>
              1. Name your subscription *
            </Text>
            <Field>
              <Input
                value={subscriptionName}
                onChange={(_, data) => setSubscriptionName(data.value)}
                style={{ maxWidth: "280px" }}
              />
            </Field>
          </div>

          {/* Step 2: Support plan */}
          <div className={styles.stepSection}>
            <Text className={styles.stepLabel}>
              2. Add a support plan to your subscription *
            </Text>
            <div className={styles.planCardsRow}>
              {supportPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={mergeClasses(
                    styles.planCard,
                    selectedPlan === plan.id && styles.planCardSelected
                  )}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <Text className={styles.planCardTitle}>{plan.name}</Text>
                  <Text className={styles.planCardDesc}>
                    {plan.description}
                  </Text>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade button */}
          <div className={styles.upgradeSection}>
            <Button appearance="primary" size="large">
              Upgrade now
            </Button>
            <Text className={styles.disclaimer}>
              By selecting &apos;Upgrade now&apos; you authorize Microsoft to
              charge your payment method on a monthly basis for services used
              beyond the monthly free amounts indicated in the offer details
              until your account is cancelled or terminated. Find{" "}
              <Link href="#" inline>
                pricing details
              </Link>{" "}
              <Open12Regular /> and{" "}
              <Link href="#" inline>
                learn about cancellations
              </Link>{" "}
              <Open12Regular />
            </Text>
          </div>
        </div>

        {/* Right sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.whyUpgradeCard}>
            <Text className={styles.whyTitle}>Why upgrade?</Text>
            {whyUpgradeItems.map((item) => (
              <div key={item.title} className={styles.whySection}>
                <Text className={styles.whySectionTitle}>{item.title}</Text>
                <Text className={styles.whySectionDesc}>{item.desc}</Text>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className={styles.faqSection}>
            <Text className={styles.faqTitle}>Frequently asked questions</Text>
            <Accordion collapsible>
              {faqItems.map((question, idx) => (
                <AccordionItem key={idx} value={idx}>
                  <AccordionHeader>{question}</AccordionHeader>
                  <AccordionPanel>
                    <Text>
                      More information about this topic will be available here.
                    </Text>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Feedback */}
          <div className={styles.feedbackSection}>
            <Text className={styles.feedbackTitle}>Give feedback</Text>
            <Link href="#">
              <ChatHelp20Regular /> Help us improve the page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
