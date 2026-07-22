"use client";
import {
  makeStyles,
  tokens as fluentTokens,
  FluentProvider,
  Text,
  webLightTheme,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { ChevronDown24Regular } from "@fluentui/react-icons";
import { AzureHeaderBuildMVP } from "./azure-header-buildmvp";
import { useState } from "react";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  stickyNav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  mainContent: {
    flex: 1,
    padding: "48px 32px 120px 32px",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  title: {
    fontSize: "32px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  dropdown: {
    position: "relative",
    display: "inline-block",
  },
  dropdownButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
    },
  },
  dropdownContent: {
    position: "absolute",
    top: "100%",
    left: "0",
    marginTop: "4px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
    zIndex: 1000,
    minWidth: "220px",
    maxHeight: "320px",
    overflow: "auto",
  },
  dropdownItemParent: {
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    transition: "background-color 0.15s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  chevronSmall: {
    fontSize: "14px",
  },
});

interface Level1ManageProps {
  experienceLevel: "new" | "smb" | "enterprise";
  customHeader?: React.ReactNode | null;
  hideNextSteps?: boolean;
  hideProjects?: boolean;
}

const Level1ManageContent = ({
  experienceLevel,
  customHeader,
  hideNextSteps = false,
  hideProjects = false,
}: Level1ManageProps) => {
  const styles = useStyles();

  const [showScopeDropdown, setShowScopeDropdown] = useState(false);
  const [selectedScope, setSelectedScope] = useState("All subscriptions");

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        {/* Portal-ia (undefined): Show AzureHeaderBuildMVP, App-modeling (null): No header */}
        {customHeader === undefined ? (
          <div className={styles.stickyNav}>
            <AzureHeaderBuildMVP
              activeLink="Manage"
              experienceLevel={experienceLevel}
            />
          </div>
        ) : (
          customHeader && <div className={styles.stickyNav}>{customHeader}</div>
        )}

        <div className={styles.mainContent}>
          <div className={styles.header}>
            <Text as="h1" className={styles.title}>
              Manage
            </Text>
            <div className={styles.headerRight}>
              {/* Second dropdown for Enterprise - Scope */}
              {experienceLevel === "enterprise" && (
                <div className={styles.dropdown}>
                  <div
                    className={styles.dropdownButton}
                    onClick={() => setShowScopeDropdown(!showScopeDropdown)}
                  >
                    <span>{selectedScope}</span>
                    <ChevronDown24Regular className={styles.chevronSmall} />
                  </div>
                  {showScopeDropdown && (
                    <div className={styles.dropdownContent}>
                      {[
                        { label: "All subscriptions" },
                        { label: "Production only" },
                        { label: "Non-Production only" },
                        { label: "Auth Service Prod" },
                        { label: "Payment Service Prod" },
                      ].map((option, index) => (
                        <div
                          key={index}
                          className={styles.dropdownItemParent}
                          onClick={() => {
                            setSelectedScope(option.label);
                            setShowScopeDropdown(false);
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

const Level1Manage = ({
  experienceLevel,
  customHeader,
  hideNextSteps,
  hideProjects,
}: Level1ManageProps) => {
  return (
    <Level1ManageContent
      experienceLevel={experienceLevel}
      customHeader={customHeader}
      hideNextSteps={hideNextSteps}
      hideProjects={hideProjects}
    />
  );
};

export default Level1Manage;
