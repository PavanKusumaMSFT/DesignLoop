"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Subtitle1,
  Body1,
  Caption1,
  Input,
  Divider,
  Link,
  Button as FluentButton,
  Badge,
} from "@fluentui/react-components";
import {
  DocumentOnePageSparkle24Regular,
  Document20Regular,
} from "@fluentui/react-icons";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

type ApplicationProfileStepProps = {
  onBack: () => void;
  onNext: () => void;
};

const useStyles = makeStyles({
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "12px",
    boxShadow: tokens.shadow4,
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    width: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  titleText: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase600,
    lineHeight: tokens.lineHeightBase600,
    color: tokens.colorNeutralForeground1,
  },
  description: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase400,
    lineHeight: tokens.lineHeightBase400,
  },
  sectionTitle: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  summaryBox: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  summaryText: {
    color: tokens.colorNeutralForeground1,
  },
  runtimeLabel: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  bulletList: {
    margin: 0,
    paddingLeft: "21px",
    listStyleType: "disc",
    display: "flex",
    flexDirection: "column",
    gap: "0px",
  },
  specsContainer: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  specRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
  },
  specLabelGroup: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 0,
  },
  specLabel: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  specDescription: {
    color: tokens.colorNeutralForeground2,
  },
  specInput: {
    width: "280px",
    flexShrink: 0,
  },
  dockerRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
  },
  dockerLink: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    flexShrink: 0,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  aiGeneratedBadge: {
    alignSelf: "flex-start",
    backgroundColor: tokens.colorNeutralBackground5,
    color: tokens.colorNeutralForeground3,
  },
  sectionWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  runtimeInner: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  dividerSpaced: {
    marginTop: "12px",
  },
  linkIcon: {
    color: tokens.colorBrandForegroundLink,
  },
});

const SPEC_FIELDS = [
  {
    label: "Application name",
    description: "This name is used to identify your app.",
    value: "zava-retail-storefront",
  },
  {
    label: "GitHub repo",
    description: "This directory contains your app\u2019s source code.",
    value: "zava-retail-storefront",
  },
  {
    label: "Frontend framework",
    description:
      "Defines user-facing functionality like content, UI, interactions, in-browser behavior, and more.",
    value: "Next.js",
  },
  {
    label: "Programming language",
    description:
      "Source code language that defines app behavior and logic.",
    value: "JavaScript / TypeScript",
  },
  {
    label: "Build tools",
    description:
      "Software used to create, run, and package your app during development and deployment.",
    value: "Next.js build pipeline (next build), Node/Express server, npm scripts",
  },
];

export function ApplicationProfileStep({
  onBack,
  onNext,
}: ApplicationProfileStepProps) {
  const styles = useStyles();

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <DocumentOnePageSparkle24Regular />
          <Text className={styles.titleText}>Review application profile</Text>
        </div>
        <Badge
          size="small"
          appearance="filled"
          color="subtle"
          className={styles.aiGeneratedBadge}
        >
          AI-generated content may be incorrect
        </Badge>
        <Text className={styles.description}>
          Here&apos;s the profile Azure created for your app based on its source
          code. After checking for accuracy, click Next to see your proposed
          hosting service, a ballpark cost estimate, and other deployment
          details.
        </Text>
      </div>

      {/* Summary */}
      <div className={styles.sectionWrapper}>
        <Subtitle1 className={styles.sectionTitle}>Summary</Subtitle1>
        <div className={styles.summaryBox}>
          <Body1 className={styles.summaryText}>
            We detected a full&#x2011;stack web application with Next.js
            storefront with a Node/Express backend designed for image&#x2011;heavy
            retail pages and a transactional checkout flow.
          </Body1>
          <div className={styles.runtimeInner}>
            <Body1 className={styles.runtimeLabel}>
              Runtime considerations:
            </Body1>
            <ul className={styles.bulletList}>
              <li>
                <Body1>SSR pages (likely high CPU under load)</Body1>
              </li>
              <li>
                <Body1>Image&#x2011;heavy rendering</Body1>
              </li>
              <li>
                <Body1>
                  API endpoints for cart, checkout, product metadata
                </Body1>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className={styles.sectionWrapper}>
        <Subtitle1 className={styles.sectionTitle}>Specifications</Subtitle1>
        <div className={styles.specsContainer}>
          {SPEC_FIELDS.map((field, index) => (
            <div key={field.label}>
              <div className={styles.specRow}>
                <div className={styles.specLabelGroup}>
                  <Body1 className={styles.specLabel}>{field.label}</Body1>
                  <Caption1 className={styles.specDescription}>
                    {field.description}
                  </Caption1>
                </div>
                <Input
                  className={styles.specInput}
                  defaultValue={field.value}
                  appearance="outline"
                />
              </div>
              {index < SPEC_FIELDS.length - 1 && <Divider className={styles.dividerSpaced} />}
            </div>
          ))}
          <Divider />
          <div className={styles.dockerRow}>
            <div className={styles.specLabelGroup}>
              <Body1 className={styles.specLabel}>Containerization</Body1>
              <Caption1 className={styles.specDescription}>
                We detected a Dockerfile that containerizes your app for
                consistent builds and runs across environments.
              </Caption1>
            </div>
            <div className={styles.dockerLink}>
              <Link href="#" inline>
                Dockerfile
              </Link>
              <Document20Regular className={styles.linkIcon} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <FluentButton appearance="secondary" onClick={onBack}>
          Back
        </FluentButton>
        <FluentButton appearance="primary" onClick={onNext}>
          Next
        </FluentButton>
      </div>
    </div>
  );
}
