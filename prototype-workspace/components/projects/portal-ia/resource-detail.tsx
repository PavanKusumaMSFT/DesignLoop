import { TopNav } from "../../shared/top-nav";
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  breadcrumbSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "12px 24px",
  },
  breadcrumbItem: {
    height: "12px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "4px",
  },
  titleSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "16px 24px",
  },
  progressSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "16px 24px",
  },
  mainLayout: {
    display: "flex",
    height: "100%",
  },
  sidebar: {
    width: "256px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
  },
  searchSection: {
    padding: "16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  searchInput: {
    width: "100%",
    paddingLeft: "40px",
    paddingRight: "12px",
    paddingTop: "8px",
    paddingBottom: "8px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "4px",
    backgroundColor: tokens.colorNeutralBackground3,
    height: "32px",
  },
  navSection: {
    flex: 1,
    padding: "16px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px",
    borderRadius: "4px",
    marginBottom: "8px",
  },
  navIcon: {
    width: "16px",
    height: "16px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "4px",
  },
  navText: {
    height: "12px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "4px",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  contentArea: {
    flex: 1,
    padding: "24px",
    maxWidth: "1024px",
  },
  rightPanel: {
    width: "320px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "24px",
  },
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tableHeader: {
    padding: "16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  tableRow: {
    padding: "16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke3}`,
  },
  primaryButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    fontSize: "14px",
    fontWeight: tokens.fontWeightMedium,
  },

  // Flex layout patterns
  breadcrumbRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px",
  },
  subscriptionRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginLeft: "44px",
  },
  progressStepsRow: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginBottom: "16px",
  },
  flexRowCenter8: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  flexRowSpaceBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexColGap8: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  flexColGap12: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  flexColGap24: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  contentFlexRow: {
    display: "flex",
    flex: "1",
  },

  // Typography
  breadcrumbSeparator: {
    color: tokens.colorNeutralForeground3,
  },
  resourceTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    margin: "0",
  },
  subscriptionLabel: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },

  // Position
  posRelative: {
    position: "relative",
  },
  searchIconPos: {
    position: "absolute",
    top: "50%",
    left: "12px",
    transform: "translateY(-50%)",
  },

  // Spacing
  cardBody: {
    padding: "16px",
  },
  cardTopMargin: {
    marginTop: "24px",
  },

  // Skeleton helpers
  skeletonLine: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "4px",
    height: "12px",
  },
  skeletonBlock: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "4px",
    height: "16px",
  },
  skeletonSquare12: {
    width: "12px",
    height: "12px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "4px",
  },
  skeletonSquare16: {
    width: "16px",
    height: "16px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "4px",
  },
  skeletonSquare32: {
    width: "32px",
    height: "32px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "4px",
  },
  skeletonBtnText: {
    backgroundColor: "currentColor",
    borderRadius: "4px",
    height: "16px",
  },

  // Progress indicators
  progressDotActive: {
    width: "16px",
    height: "16px",
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: "50%",
  },
  progressDotInactive: {
    width: "16px",
    height: "16px",
    border: `2px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "50%",
  },
  progressTrack: {
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "4px",
    height: "8px",
  },
  progressFill: {
    backgroundColor: tokens.colorPalettePurpleBackground2,
    height: "8px",
    borderRadius: "4px",
    width: "35%",
  },

  // Width modifiers
  w32: { width: "32px" },
  w48: { width: "48px" },
  w64: { width: "64px" },
  w72: { width: "72px" },
  w80: { width: "80px" },
  w96: { width: "96px" },
  w120: { width: "120px" },
  w128: { width: "128px" },
  wFull: { width: "100%" },
  w75pct: { width: "75%" },
  w66pct: { width: "66%" },
});

const ResourceDetail = () => {
  const styles = useStyles();

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.container}>
        <TopNav activeLink="Resource" />

        <div className={styles.breadcrumbSection}>
          <div className={styles.breadcrumbRow}>
            <div
              className={mergeClasses(styles.breadcrumbItem, styles.w48)}
            ></div>
            <span className={styles.breadcrumbSeparator}>›</span>
            <div
              className={mergeClasses(styles.breadcrumbItem, styles.w64)}
            ></div>
            <span className={styles.breadcrumbSeparator}>›</span>
            <div
              className={mergeClasses(styles.breadcrumbItem, styles.w80)}
            ></div>
            <span className={styles.breadcrumbSeparator}>›</span>
            <div
              className={mergeClasses(styles.breadcrumbItem, styles.w72)}
            ></div>
          </div>
        </div>

        <div className={styles.titleSection}>
          <div className={styles.titleRow}>
            <div className={styles.skeletonSquare32}></div>
            <h1 className={styles.resourceTitle}>
              Resource: Contoso-VM-123......
            </h1>
          </div>
          <div className={styles.subscriptionRow}>
            <span className={styles.subscriptionLabel}>Subscription:</span>
            <div
              className={mergeClasses(styles.skeletonLine, styles.w120)}
            ></div>
          </div>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.progressStepsRow}>
            <div className={styles.flexRowCenter8}>
              <div className={styles.progressDotActive}></div>
              <div
                className={mergeClasses(styles.skeletonLine, styles.w64)}
              ></div>
            </div>
            <div className={styles.flexRowCenter8}>
              <div className={styles.progressDotInactive}></div>
              <div
                className={mergeClasses(styles.skeletonLine, styles.w64)}
              ></div>
            </div>
            <div className={styles.flexRowCenter8}>
              <div className={styles.progressDotInactive}></div>
              <div
                className={mergeClasses(styles.skeletonLine, styles.w64)}
              ></div>
            </div>
            <div className={styles.flexRowCenter8}>
              <div className={styles.progressDotInactive}></div>
              <div
                className={mergeClasses(styles.skeletonLine, styles.w64)}
              ></div>
            </div>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill}></div>
          </div>
        </div>

        <div className={styles.mainLayout}>
          <div className={styles.sidebar}>
            <div className={styles.searchSection}>
              <div className={styles.posRelative}>
                <div className={styles.searchIconPos}>
                  <div className={styles.navIcon}></div>
                </div>
                <div className={styles.searchInput}></div>
              </div>
            </div>

            <div className={styles.navSection}>
              <div className={styles.navItem}>
                <div className={styles.navIcon}></div>
                <div className={mergeClasses(styles.navText, styles.w64)}></div>
              </div>
              <div className={styles.navItem}>
                <div className={styles.navIcon}></div>
                <div className={mergeClasses(styles.navText, styles.w80)}></div>
              </div>
              <div className={styles.navItem}>
                <div className={styles.navIcon}></div>
                <div className={mergeClasses(styles.navText, styles.w96)}></div>
              </div>
              <div className={styles.navItem}>
                <div className={styles.navIcon}></div>
                <div className={mergeClasses(styles.navText, styles.w32)}></div>
              </div>
            </div>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.contentFlexRow}>
              <div className={styles.contentArea}>
                {/* Search */}
                <div className={styles.searchSection}>
                  <div className={styles.posRelative}>
                    <div className={styles.searchIconPos}>
                      <div className={styles.navIcon}></div>
                    </div>
                    <div className={styles.searchInput}></div>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className={styles.navSection}>
                  <div className={styles.navItem}>
                    <div className={styles.navIcon}></div>
                    <div
                      className={mergeClasses(styles.navText, styles.w64)}
                    ></div>
                  </div>
                  <div className={styles.navItem}>
                    <div className={styles.navIcon}></div>
                    <div
                      className={mergeClasses(styles.navText, styles.w80)}
                    ></div>
                  </div>
                  <div className={styles.navItem}>
                    <div className={styles.navIcon}></div>
                    <div
                      className={mergeClasses(styles.navText, styles.w96)}
                    ></div>
                  </div>
                  <div className={styles.navItem}>
                    <div className={styles.navIcon}></div>
                    <div
                      className={mergeClasses(styles.navText, styles.w32)}
                    ></div>
                  </div>
                </div>

                {/* Main Content */}
                <div
                  className={mergeClasses(styles.card, styles.cardTopMargin)}
                >
                  <div className={styles.tableHeader}>
                    <div className={styles.flexRowCenter8}>
                      <div className={styles.skeletonSquare12}></div>
                      <div
                        className={mergeClasses(
                          styles.skeletonBlock,
                          styles.w96,
                        )}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.flexColGap12}>
                      <div
                        className={mergeClasses(
                          styles.skeletonLine,
                          styles.wFull,
                        )}
                      ></div>
                      <div
                        className={mergeClasses(
                          styles.skeletonLine,
                          styles.w75pct,
                        )}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.rightPanel}>
                <div className={styles.flexColGap24}>
                  <div className={styles.flexRowSpaceBetween}>
                    <div className={styles.skeletonSquare16}></div>
                    <div
                      className={mergeClasses(
                        styles.skeletonBlock,
                        styles.w128,
                      )}
                    ></div>
                  </div>

                  <div className={styles.flexColGap12}>
                    <div
                      className={mergeClasses(styles.skeletonLine, styles.w80)}
                    ></div>
                    <div
                      className={mergeClasses(
                        styles.skeletonLine,
                        styles.wFull,
                      )}
                    ></div>
                    <div
                      className={mergeClasses(
                        styles.skeletonLine,
                        styles.w75pct,
                      )}
                    ></div>
                  </div>

                  <div className={styles.flexColGap8}>
                    <button
                      className={styles.primaryButton}
                      aria-label="Action button"
                    >
                      <div
                        className={mergeClasses(
                          styles.skeletonBtnText,
                          styles.w64,
                        )}
                      ></div>
                    </button>
                    <button
                      className={styles.primaryButton}
                      aria-label="Action button"
                    >
                      <div
                        className={mergeClasses(
                          styles.skeletonBtnText,
                          styles.w64,
                        )}
                      ></div>
                    </button>
                    <button
                      className={styles.primaryButton}
                      aria-label="Action button"
                    >
                      <div
                        className={mergeClasses(
                          styles.skeletonBtnText,
                          styles.w64,
                        )}
                      ></div>
                    </button>
                  </div>

                  <div className={styles.flexColGap12}>
                    <div
                      className={mergeClasses(styles.skeletonBlock, styles.w96)}
                    ></div>
                    <div className={styles.flexColGap8}>
                      <div
                        className={mergeClasses(
                          styles.skeletonLine,
                          styles.wFull,
                        )}
                      ></div>
                      <div
                        className={mergeClasses(
                          styles.skeletonLine,
                          styles.wFull,
                        )}
                      ></div>
                      <div
                        className={mergeClasses(
                          styles.skeletonLine,
                          styles.w66pct,
                        )}
                      ></div>
                    </div>
                    <button
                      className={mergeClasses(
                        styles.primaryButton,
                        styles.w128,
                      )}
                      aria-label="Submit action"
                    >
                      <div
                        className={mergeClasses(
                          styles.skeletonBtnText,
                          styles.w96,
                        )}
                      ></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

export default ResourceDetail;
