/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import {
  makeStyles,
  tokens as fluentTokens,
  Body1,
} from "@fluentui/react-components";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

type GitHubAuthModalProps = {
  open: boolean;
  onDismiss: () => void;
  onSignIn: () => void;
};

const useStyles = makeStyles({
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  browserChrome: {
    width: "540px",
    backgroundColor: "#f6f8fa",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: tokens.shadow16,
  },
  titleBar: {
    display: "flex",
    alignItems: "center",
    padding: "10px 16px",
    backgroundColor: tokens.colorNeutralStroke1,
    borderBottom: "1px solid #d0d0d0",
    gap: "8px",
  },
  trafficLights: {
    display: "flex",
    gap: "6px",
  },
  trafficLight: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
  },
  trafficLightClose: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#ff5f57",
  },
  trafficLightMinimize: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#febc2e",
  },
  trafficLightMaximize: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#28c840",
  },
  titleBarText: {
    flex: 1,
    textAlign: "center",
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
  addressBar: {
    display: "flex",
    alignItems: "center",
    padding: "6px 16px 10px",
    backgroundColor: tokens.colorNeutralStroke1,
  },
  urlBar: {
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "6px",
    padding: "6px 12px",
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  pageContent: {
    backgroundColor: "#f6f8fa",
    padding: "32px 40px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  githubLogo: {
    marginBottom: "24px",
  },
  authCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: "1px solid #d0d7de",
    borderRadius: "6px",
    padding: "24px",
    width: "100%",
    maxWidth: "320px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  azureLogo: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#f3f3f3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  signInText: {
    textAlign: "center",
  },
  inputGroup: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#24292f",
  },
  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "5px 12px",
    fontSize: "14px",
    lineHeight: "20px",
    border: "1px solid #d0d7de",
    borderRadius: "6px",
    backgroundColor: tokens.colorNeutralBackground1,
    boxSizing: "border-box",
    outline: "none",
  },
  forgotLink: {
    fontSize: "12px",
    color: "#0969da",
    textDecoration: "none",
    cursor: "pointer",
  },
  signInButton: {
    width: "100%",
    padding: "5px 16px",
    fontSize: "14px",
    fontWeight: 600,
    color: tokens.colorNeutralBackground1,
    backgroundColor: "#2da44e",
    border: "1px solid rgba(27, 31, 36, 0.15)",
    borderRadius: "6px",
    cursor: "pointer",
    textAlign: "center",
    lineHeight: "20px",
    ":hover": {
      backgroundColor: "#2c974b",
    },
  },
  createAccountCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: "1px solid #d0d7de",
    borderRadius: "6px",
    padding: "16px 24px",
    width: "100%",
    maxWidth: "320px",
    textAlign: "center",
    marginTop: "16px",
    fontSize: "14px",
    color: "#24292f",
  },
  createLink: {
    color: "#0969da",
    textDecoration: "none",
    cursor: "pointer",
  },
  footer: {
    display: "flex",
    gap: "16px",
    marginTop: "32px",
    justifyContent: "center",
  },
  footerLink: {
    fontSize: "12px",
    color: "#0969da",
    textDecoration: "none",
  },
  footerText: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
});

/** Modal simulating a GitHub login flow with a fake browser chrome, username/password form, and sign-in callback.
 * Cross-project reusable: can be imported by any project. */
export function GitHubAuthModal({
  open,
  onDismiss,
  onSignIn,
}: GitHubAuthModalProps) {
  const styles = useStyles();

  if (!open) return null;

  return (
    <div className={styles.overlay} role="presentation" onClick={onDismiss}>
      <div
        className={styles.browserChrome}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Browser title bar */}
        <div className={styles.titleBar}>
          <div className={styles.trafficLights}>
            <div className={styles.trafficLightClose} />
            <div className={styles.trafficLightMinimize} />
            <div className={styles.trafficLightMaximize} />
          </div>
          <div className={styles.titleBarText}>
            Sign in to GitHub &middot; GitHub
          </div>
        </div>

        {/* Address bar */}
        <div className={styles.addressBar}>
          <div className={styles.urlBar}>
            https://github.com/login?client_id=779672759333c3c4c69e&return_to=...
          </div>
        </div>

        {/* Page content */}
        <div className={styles.pageContent}>
          {/* GitHub logo */}
          <div className={styles.githubLogo}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
                fill="#24292f"
              />
            </svg>
          </div>

          {/* Auth card */}
          <div className={styles.authCard}>
            {/* Azure logo */}
            <div className={styles.azureLogo}>
              <svg width="28" height="28" viewBox="0 0 96 96" fill="none">
                <path
                  d="M33.338 6.544h26.038l-27.03 80.912a4.152 4.152 0 01-3.933 2.824H8.149a4.145 4.145 0 01-3.928-5.47L29.404 9.368a4.152 4.152 0 013.934-2.825z"
                  fill="url(#azure-a)"
                />
                <path
                  d="M71.175 60.261H34.043a1.906 1.906 0 00-1.297 3.296l26.075 24.168a4.162 4.162 0 002.832 1.115h24.12L71.175 60.261z"
                  fill="#0078D4"
                />
                <path
                  d="M33.338 6.544a4.118 4.118 0 00-3.943 2.879L4.252 84.832a4.142 4.142 0 003.908 5.448h20.559a4.29 4.29 0 003.41-2.9l5.552-16.4 19.443 18.025a4.2 4.2 0 002.72 1.275h24.162l-10.514-28.02L46.166 6.544H33.338z"
                  fill="url(#azure-b)"
                />
                <path
                  d="M66.627 9.34a4.15 4.15 0 00-3.93-2.796H33.648a4.15 4.15 0 013.93 2.796l25.164 75.44a4.15 4.15 0 01-3.93 5.5h29.049a4.15 4.15 0 003.93-5.5L66.627 9.34z"
                  fill="url(#azure-c)"
                />
                <defs>
                  <linearGradient
                    id="azure-a"
                    x1="46.033"
                    y1="10.381"
                    x2="14.03"
                    y2="93.586"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#114A8B" />
                    <stop offset="1" stopColor="#0669BC" />
                  </linearGradient>
                  <linearGradient
                    id="azure-b"
                    x1="56.77"
                    y1="46.392"
                    x2="49.728"
                    y2="49.17"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopOpacity=".3" />
                    <stop offset=".071" stopOpacity=".2" />
                    <stop offset=".321" stopOpacity=".1" />
                    <stop offset=".623" stopOpacity=".05" />
                    <stop offset="1" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient
                    id="azure-c"
                    x1="50.942"
                    y1="8.017"
                    x2="79.39"
                    y2="92.34"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#3CCBF4" />
                    <stop offset="1" stopColor="#2892DF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className={styles.signInText}>
              <Body1>
                Sign in to <strong>GitHub</strong>
              </Body1>
              <br />
              <Body1>
                to continue to <strong>Azure GitHub Actions</strong>
              </Body1>
            </div>

            {/* Username field */}
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="gh-username">Username or email address</label>
              <input
                id="gh-username"
                className={styles.input}
                type="text"
                defaultValue="contosodev"
                readOnly
              />
            </div>

            {/* Password field */}
            <div className={styles.inputGroup}>
              <div className={styles.labelRow}>
                <label className={styles.label} htmlFor="gh-password">Password</label>
                <span className={styles.forgotLink}>Forgot password?</span>
              </div>
              <input
                id="gh-password"
                className={styles.input}
                type="password"
                defaultValue="contosopassword123"
                readOnly
              />
            </div>

            {/* Sign in button */}
            <button type="button" className={styles.signInButton} onClick={onSignIn}>
              Sign in
            </button>
          </div>

          {/* Create account card */}
          <div className={styles.createAccountCard}>
            New to GitHub?{" "}
            <span className={styles.createLink}>Create an account.</span>
          </div>

          {/* Footer links */}
          <div className={styles.footer}>
            <span className={styles.footerLink}>Terms</span>
            <span className={styles.footerLink}>Privacy</span>
            <span className={styles.footerLink}>Security</span>
            <span className={styles.footerText}>Contact GitHub</span>
          </div>
        </div>
      </div>
    </div>
  );
}
