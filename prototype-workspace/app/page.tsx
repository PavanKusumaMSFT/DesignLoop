"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  tokens as fluentTokens,
  Text,
  Badge,
  SearchBox,
} from "@fluentui/react-components";
import {
  Sparkle24Regular,
  Apps24Regular,
  Grid24Regular,
  Navigation24Regular,
  Home24Regular,
  Search24Regular,
  Beaker24Regular,
  ArrowRight20Regular,
} from "@fluentui/react-icons";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ---------------------------------------------------------------------------
// Icon + status maps
// ---------------------------------------------------------------------------

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  Sparkle24Regular,
  Apps24Regular,
  Grid24Regular,
  Navigation24Regular,
  Home24Regular,
  Search24Regular,
  Beaker24Regular,
};
const resolveIcon = (name?: string) =>
  (name && ICONS[name]) || Apps24Regular;

const statusColorMap: Record<
  string,
  "success" | "brand" | "informative" | "warning" | "subtle"
> = {
  active: "success",
  "in-progress": "brand",
  "coming-soon": "warning",
  archived: "subtle",
};
const statusLabels: Record<string, string> = {
  active: "Active",
  "in-progress": "In progress",
  "coming-soon": "Coming soon",
  archived: "Archived",
};

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  gradientAccent: {
    position: "absolute",
    top: "-15%",
    right: "-10%",
    width: "55%",
    height: "60%",
    background:
      "radial-gradient(circle, rgba(0, 120, 212, 0.06) 0%, transparent 70%)",
    borderRadius: "50%",
    pointerEvents: "none",
  },
  content: {
    position: "relative",
    zIndex: 1,
    padding: `${tokens.spacingVerticalXXXL} ${tokens.spacingHorizontalXXL}`,
    maxWidth: "880px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXL,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    alignSelf: "flex-start",
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    padding: 0,
    marginBottom: tokens.spacingVerticalM,
    transitionProperty: "color",
    transitionDuration: tokens.durationFast,
    ":hover": { color: tokens.colorBrandForeground1 },
  },
  eyebrow: {
    display: "block",
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
    textTransform: "uppercase" as const,
    letterSpacing: "0.09em",
  },
  title: {
    display: "block",
    fontSize: "44px",
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: "1.1",
    color: tokens.colorNeutralForeground1,
    letterSpacing: "-0.01em",
  },
  subtitle: {
    display: "block",
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground3,
    lineHeight: "1.5",
    maxWidth: "620px",
    marginTop: tokens.spacingVerticalXS,
  },
  countPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    alignSelf: "flex-start",
    marginTop: tokens.spacingVerticalS,
    padding: `2px ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium,
  },
  countPillIcon: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  searchBox: {
    width: "100%",
    maxWidth: "360px",
    borderRadius: tokens.borderRadiusLarge,
  },
  card: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    width: "100%",
    textAlign: "left",
    padding: tokens.spacingVerticalL,
    paddingRight: tokens.spacingHorizontalXL,
    borderRadius: "12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    boxShadow: tokens.shadow2,
    transitionProperty: "transform, box-shadow, border-color, background-color",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: tokens.shadow8,
      borderColor: tokens.colorBrandStroke1,
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    ":hover .protoChevron": {
      transform: "translateX(4px)",
      color: tokens.colorBrandForeground1,
    },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorBrandStroke1}`,
      outlineOffset: "2px",
    },
  },
  iconTile: {
    display: "none",
  },
  iconGlyph: {
    display: "none",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
    flexGrow: 1,
    minWidth: 0,
  },
  cardTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  cardTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.25",
  },
  cardDesc: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
    lineHeight: "1.45",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical" as const,
  },
  chevron: {
    flexShrink: 0,
    color: tokens.colorNeutralForeground4,
    fontSize: "20px",
    transitionProperty: "transform, color",
    transitionDuration: tokens.durationNormal,
    transitionTimingFunction: tokens.curveEasyEase,
  },
  empty: {
    padding: tokens.spacingVerticalXXXL,
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
    border: `1px dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
  },
});

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

function PrototypeCard({ project }: { project: Project }) {
  const styles = useStyles();
  const router = useRouter();

  const open = useCallback(() => {
    if (project.source.type === "fork" && project.source.deployUrl) {
      window.open(project.source.deployUrl, "_blank", "noopener");
    } else if (project.source.route) {
      router.push(project.source.route);
    }
  }, [project, router]);

  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
    >
      <div className={styles.body}>
        <div className={styles.cardTitleRow}>
          <Text className={styles.cardTitle}>{project.title}</Text>
          <Badge
            appearance="tint"
            size="small"
            color={statusColorMap[project.status] ?? "informative"}
          >
            {statusLabels[project.status] ?? project.status}
          </Badge>
        </div>

        {project.description && (
          <Text className={styles.cardDesc}>{project.description}</Text>
        )}
      </div>

      <ArrowRight20Regular className={`${styles.chevron} protoChevron`} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

function WorkspaceContent() {
  const styles = useStyles();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) => p.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className={styles.container}>
      <div className={styles.gradientAccent} />

      <div className={styles.content}>
        <div className={styles.header}>
          <Text className={styles.eyebrow}>Prototype Workspace</Text>
          <Text as="h1" className={styles.title}>
            Proto Loop
          </Text>
          <Text className={styles.subtitle}>
            Interactive Fluent prototypes generated across your design tasks.
            Open one to explore its screens, states, and flows.
          </Text>

        </div>

        {projects.length > 0 && (
          <SearchBox
            className={styles.searchBox}
            size="large"
            placeholder="Search prototypes by name"
            value={query}
            onChange={(_, data) => setQuery(data.value)}
            aria-label="Search prototypes by name"
          />
        )}

        {projects.length === 0 ? (
          <div className={styles.empty}>
            No prototypes yet. Generate one from a design task and it will appear
            here.
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.empty}>
            No prototypes match &ldquo;{query}&rdquo;.
          </div>
        ) : (
          <div className={styles.list}>
            {filtered.map((p) => (
              <PrototypeCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function WorkspacePage() {
  return (
    <FluentProvider theme={webLightTheme}>
      <WorkspaceContent />
    </FluentProvider>
  );
}
