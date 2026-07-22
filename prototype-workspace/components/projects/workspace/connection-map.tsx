/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { makeStyles, mergeClasses, tokens as fluentTokens } from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import type { Project } from "../../../data/projects";

// ============================================================================
// Per-timeframe sitemap topologies
// ============================================================================
//
// Each timeframe has its own sitemap reflecting the portal's evolution:
// • Short-term: current portal structure (All Services, All Resources, etc.)
// • Mid-term: incremental improvements (P1 iterations)
// • Vision: full Portal IA redesign (Discover → Build → Manage)
//
// Layout is LEFT-TO-RIGHT with cross-cutting bars (Nav/Search) below nodes.
// ============================================================================

interface SitemapNode {
  id: string;
  label: string;
  /** Grid x position (column index) */
  x: number;
  /** Grid y position (row index) */
  y: number;
  /** Accent color */
  color: string;
  /** Which project IDs map to this node */
  projectIds: string[];
}

interface CrossCuttingBar {
  id: string;
  label: string;
  color: string;
  projectIds: string[];
}

interface SitemapConnection {
  from: string;
  to: string;
}

interface TimeframeSitemap {
  bars: CrossCuttingBar[];
  nodes: SitemapNode[];
  connections: SitemapConnection[];
}

// ---------------------------------------------------------------------------
// SHORT-TERM sitemap
// ---------------------------------------------------------------------------

const SHORT_TERM: TimeframeSitemap = {
  bars: [
    {
      id: "bar-nav",
      label: "Left Nav P0",
      color: "#64748b",
      projectIds: ["left-nav-experiments"],
    },
    {
      id: "bar-search",
      label: "Search P0",
      color: "#ec4899",
      projectIds: ["search-p0"],
    },
  ],
  nodes: [
    {
      id: "dev-tools",
      label: "Dev Tools",
      x: 0,
      y: 0,
      color: "#64748b",
      projectIds: [],
    },
    {
      id: "signup",
      label: "Signup",
      x: 1,
      y: 0,
      color: "#0078D4",
      projectIds: ["signup"],
    },
    {
      id: "fre",
      label: "FRE",
      x: 2,
      y: 0,
      color: "#0078D4",
      projectIds: ["fre-experiments"],
    },
    {
      id: "all-services",
      label: "All Services",
      x: 3,
      y: 0,
      color: "#10b981",
      projectIds: [],
    },
    { id: "home", label: "Home", x: 2, y: 1, color: "#0078D4", projectIds: [] },
    {
      id: "all-resources",
      label: "All Resources",
      x: 3,
      y: 1,
      color: "#3b82f6",
      projectIds: ["resource-manager"],
    },
    {
      id: "cost-overview",
      label: "Cost Overview\n(Free Trial)",
      x: 3,
      y: 2,
      color: "#8b5cf6",
      projectIds: [],
    },
    {
      id: "project-scope",
      label: "Project Scope/\nWorkspace",
      x: 4,
      y: 1,
      color: "#3b82f6",
      projectIds: [],
    },
    {
      id: "agentic",
      label: "Agentic\nDashboard",
      x: 4,
      y: 2,
      color: "#6366f1",
      projectIds: [],
    },
    {
      id: "startups-home",
      label: "Startups\nHomepage",
      x: 2,
      y: 3,
      color: "#64748b",
      projectIds: [],
    },
    {
      id: "startups-re",
      label: "Startups\nReplatform",
      x: 3,
      y: 3,
      color: "#64748b",
      projectIds: [],
    },
  ],
  connections: [
    { from: "dev-tools", to: "signup" },
    { from: "signup", to: "fre" },
    { from: "fre", to: "all-services" },
    { from: "fre", to: "home" },
    { from: "home", to: "all-resources" },
    { from: "home", to: "cost-overview" },
    { from: "all-resources", to: "project-scope" },
    { from: "cost-overview", to: "agentic" },
    { from: "startups-home", to: "startups-re" },
  ],
};

// ---------------------------------------------------------------------------
// MID-TERM sitemap
// ---------------------------------------------------------------------------

const MID_TERM: TimeframeSitemap = {
  bars: [
    { id: "bar-nav", label: "Left Nav P1", color: "#64748b", projectIds: [] },
    { id: "bar-search", label: "Search P1", color: "#ec4899", projectIds: [] },
  ],
  nodes: [
    {
      id: "dev-tools",
      label: "Dev Tools",
      x: 0,
      y: 0,
      color: "#64748b",
      projectIds: [],
    },
    {
      id: "signup",
      label: "Signup",
      x: 1,
      y: 0,
      color: "#0078D4",
      projectIds: [],
    },
    { id: "fre", label: "FRE", x: 2, y: 0, color: "#0078D4", projectIds: [] },
    {
      id: "all-services",
      label: "All Services",
      x: 3,
      y: 0,
      color: "#10b981",
      projectIds: [],
    },
    { id: "home", label: "Home", x: 2, y: 1, color: "#0078D4", projectIds: [] },
    {
      id: "all-resources",
      label: "All Resources",
      x: 3,
      y: 1,
      color: "#3b82f6",
      projectIds: [],
    },
    {
      id: "project-scope",
      label: "Project Scope/\nWorkspace",
      x: 4,
      y: 1,
      color: "#3b82f6",
      projectIds: [],
    },
    {
      id: "agentic",
      label: "Agentic\nDashboard",
      x: 4,
      y: 2,
      color: "#6366f1",
      projectIds: [],
    },
    {
      id: "startups-home",
      label: "Startups\nHomepage",
      x: 2,
      y: 3,
      color: "#64748b",
      projectIds: [],
    },
    {
      id: "startups-re",
      label: "Startups\nReplatform",
      x: 3,
      y: 3,
      color: "#64748b",
      projectIds: [],
    },
  ],
  connections: [
    { from: "dev-tools", to: "signup" },
    { from: "signup", to: "fre" },
    { from: "fre", to: "all-services" },
    { from: "fre", to: "home" },
    { from: "home", to: "all-resources" },
    { from: "all-resources", to: "project-scope" },
    { from: "all-resources", to: "agentic" },
    { from: "startups-home", to: "startups-re" },
  ],
};

// ---------------------------------------------------------------------------
// VISION sitemap — full Portal IA hierarchy
// ---------------------------------------------------------------------------

const VISION: TimeframeSitemap = {
  bars: [
    { id: "bar-nav", label: "New Nav", color: "#64748b", projectIds: [] },
    {
      id: "bar-search",
      label: "Search + Copilot",
      color: "#ec4899",
      projectIds: [],
    },
  ],
  nodes: [
    {
      id: "dev-tools",
      label: "Dev Tools",
      x: 0,
      y: 0,
      color: "#64748b",
      projectIds: [],
    },
    {
      id: "signup",
      label: "Signup",
      x: 1,
      y: 0,
      color: "#0078D4",
      projectIds: [],
    },
    { id: "fre", label: "FRE", x: 2, y: 0, color: "#0078D4", projectIds: [] },
    {
      id: "discover",
      label: "Discover",
      x: 3,
      y: 0,
      color: "#10b981",
      projectIds: ["portal-ia"],
    },
    {
      id: "service-hubs",
      label: "Service Hubs",
      x: 4,
      y: 0,
      color: "#10b981",
      projectIds: [],
    },
    { id: "home", label: "Home", x: 2, y: 1, color: "#0078D4", projectIds: [] },
    {
      id: "build",
      label: "Build",
      x: 3,
      y: 1,
      color: "#3b82f6",
      projectIds: ["portal-ia"],
    },
    {
      id: "create-resource",
      label: "Create Resource",
      x: 4,
      y: 1,
      color: "#3b82f6",
      projectIds: [],
    },
    {
      id: "manage",
      label: "Manage",
      x: 3,
      y: 2,
      color: "#8b5cf6",
      projectIds: ["portal-ia"],
    },
    {
      id: "project-scope",
      label: "Project Scope/\nWorkspace",
      x: 4,
      y: 2,
      color: "#8b5cf6",
      projectIds: [],
    },
    { id: "cost", label: "Cost", x: 4, y: 3, color: "#8b5cf6", projectIds: [] },
    {
      id: "resource-detail",
      label: "Resource Detail",
      x: 5,
      y: 1,
      color: "#005A9E",
      projectIds: [],
    },
    {
      id: "agentic",
      label: "Agentic\nDashboard",
      x: 5,
      y: 2,
      color: "#6366f1",
      projectIds: [],
    },
  ],
  connections: [
    { from: "dev-tools", to: "signup" },
    { from: "signup", to: "fre" },
    { from: "fre", to: "discover" },
    { from: "discover", to: "service-hubs" },
    { from: "fre", to: "home" },
    { from: "home", to: "build" },
    { from: "home", to: "manage" },
    { from: "build", to: "create-resource" },
    { from: "manage", to: "project-scope" },
    { from: "manage", to: "cost" },
    { from: "create-resource", to: "resource-detail" },
    { from: "project-scope", to: "agentic" },
  ],
};

const SITEMAP_CONFIGS: Record<string, TimeframeSitemap> = {
  "build-2026": SHORT_TERM,
  "v1-ideal": MID_TERM,
  vision: VISION,
};

// ---------------------------------------------------------------------------
// Layout constants — horizontal flow (left-to-right)
// ---------------------------------------------------------------------------

const NODE_W = 140;
const NODE_H = 52;
const H_GAP = 36;
const V_GAP = 24;
const PAD_X = 24;
const PAD_Y = 24;
const BAR_H = 36;
const BAR_GAP = 8;
const BARS_BOTTOM_MARGIN = 28;
const CHIP_H = 26;
const CHIP_GAP = 3;
const CHIP_AREA_GAP = 6;

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

// Applies dynamic layout props via ref callback (avoids inline styling)
const applyStyles =
  (props: Record<string, string | number>) => (el: HTMLElement | null) => {
    if (!el) return;
    for (const [k, v] of Object.entries(props)) {
      (el.style as any)[k] = typeof v === "number" ? `${v}px` : v;
    }
  };

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderRadius: "16px",
    border: "1px solid rgba(226, 232, 240, 0.5)",
    padding: "24px 28px",
    position: "relative",
    overflowX: "auto",
    overflowY: "hidden",
  },
  canvas: {
    position: "relative",
    minHeight: "200px",
    transitionProperty: "height",
    transitionDuration: "0.3s",
    transitionTimingFunction: "ease",
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
  },
  bar: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    border: "1.5px solid rgba(226, 232, 240, 0.7)",
    fontSize: "13px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    height: `${BAR_H}px`,
    zIndex: 2,
    cursor: "pointer",
    userSelect: "none",
    transitionProperty: "border-color, box-shadow, opacity",
    transitionDuration: "0.2s",
  },
  barActive: {
    borderTopColor: "rgba(99, 102, 241, 0.45)",
    borderRightColor: "rgba(99, 102, 241, 0.45)",
    borderBottomColor: "rgba(99, 102, 241, 0.45)",
    borderLeftColor: "rgba(99, 102, 241, 0.45)",
    boxShadow: "0 2px 10px rgba(99, 102, 241, 0.1)",
  },
  barExpanded: {
    borderTopColor: "rgba(99, 102, 241, 0.6)",
    borderRightColor: "rgba(99, 102, 241, 0.6)",
    borderBottomColor: "rgba(99, 102, 241, 0.6)",
    borderLeftColor: "rgba(99, 102, 241, 0.6)",
    boxShadow: "0 3px 14px rgba(99, 102, 241, 0.15)",
  },
  barDisabled: {
    opacity: 0.4,
    cursor: "default",
  },
  sitemapNode: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "0 12px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    border: "1.5px solid rgba(226, 232, 240, 0.8)",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    transitionProperty: "border-color, box-shadow, opacity, transform",
    transitionDuration: "0.2s",
    width: `${NODE_W}px`,
    height: `${NODE_H}px`,
    zIndex: 2,
    userSelect: "none",
    cursor: "pointer",
  },
  sitemapNodeActive: {
    borderTopColor: "rgba(99, 102, 241, 0.45)",
    borderRightColor: "rgba(99, 102, 241, 0.45)",
    borderBottomColor: "rgba(99, 102, 241, 0.45)",
    borderLeftColor: "rgba(99, 102, 241, 0.45)",
    boxShadow: "0 2px 12px rgba(99, 102, 241, 0.1)",
  },
  sitemapNodeExpanded: {
    borderTopColor: "rgba(99, 102, 241, 0.6)",
    borderRightColor: "rgba(99, 102, 241, 0.6)",
    borderBottomColor: "rgba(99, 102, 241, 0.6)",
    borderLeftColor: "rgba(99, 102, 241, 0.6)",
    boxShadow: "0 4px 16px rgba(99, 102, 241, 0.15)",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  sitemapNodeDisabled: {
    opacity: 0.4,
    cursor: "default",
  },
  sitemapNodeDimmed: {
    opacity: 0.3,
  },
  nodeLabel: {
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.3",
    flex: 1,
    whiteSpace: "pre-line",
    textAlign: "center",
  },
  badge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "20px",
    height: "20px",
    padding: "0 5px",
    borderRadius: "10px",
    fontSize: "10px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralBackground1,
    flexShrink: 0,
  },
  accentDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  // Expanded chip list
  chipList: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    zIndex: 3,
  },
  chip: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "4px 10px",
    borderRadius: "7px",
    fontSize: "10px",
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground1,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
    border: "1px solid rgba(226, 232, 240, 0.7)",
    cursor: "pointer",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    transitionProperty: "transform, box-shadow, border-color, background-color",
    transitionDuration: "0.15s",
    userSelect: "none",
  },
  chipHovered: {
    transform: "translateY(-1px)",
    boxShadow: "0 3px 10px rgba(99, 102, 241, 0.15)",
    borderTopColor: "rgba(99, 102, 241, 0.5)",
    borderRightColor: "rgba(99, 102, 241, 0.5)",
    borderBottomColor: "rgba(99, 102, 241, 0.5)",
    borderLeftColor: "rgba(99, 102, 241, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  chipComingSoon: {
    opacity: 0.5,
    cursor: "default",
  },
  horizonDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  chipLabel: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    flex: 1,
  },
  canvasCenter: {
    margin: "0 auto",
  },
  connectionPath: {
    transitionProperty: "stroke, opacity",
    transitionDuration: "0.2s",
  },
  barDotLabel: {
    marginRight: "6px",
    fontWeight: tokens.fontWeightSemibold,
  },
  badgeSpaced: {
    marginLeft: "8px",
  },
});

// ---------------------------------------------------------------------------
// Horizon colors / labels
// ---------------------------------------------------------------------------

const horizonColors: Record<string, string> = {
  "build-2026": "#0078D4",
  "v1-ideal": "#8b5cf6",
  vision: "#f59e0b",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface ConnectionMapProps {
  projects: Project[];
  /** Current timeframe key — drives which sitemap topology is shown */
  timeframe: string;
  /** Currently selected sitemap node id */
  selectedNode?: string | null;
  /** Called when a sitemap node is clicked */
  onNodeSelect?: (nodeId: string | null, projectIds: string[]) => void;
}

export default function ConnectionMap({
  projects,
  timeframe,
  selectedNode,
  onNodeSelect,
}: ConnectionMapProps) {
  const styles = useStyles();
  const router = useRouter();
  const [hoveredChip, setHoveredChip] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const expandedNode = selectedNode ?? null;
  const sitemap = SITEMAP_CONFIGS[timeframe] ?? SHORT_TERM;

  // Build project lookup by ID
  const projectById = useMemo(() => {
    const map = new Map<string, Project>();
    for (const p of projects) map.set(p.id, p);
    return map;
  }, [projects]);

  // Map each node/bar to its resolved projects
  const nodeProjectMap = useMemo(() => {
    const map = new Map<string, Project[]>();
    for (const node of sitemap.nodes) {
      map.set(
        node.id,
        node.projectIds
          .map((id) => projectById.get(id))
          .filter((p): p is Project => !!p),
      );
    }
    for (const bar of sitemap.bars) {
      map.set(
        bar.id,
        bar.projectIds
          .map((id) => projectById.get(id))
          .filter((p): p is Project => !!p),
      );
    }
    return map;
  }, [sitemap, projectById]);

  const nodeCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const [id, projs] of nodeProjectMap) counts.set(id, projs.length);
    return counts;
  }, [nodeProjectMap]);

  // Compute layout
  const { nodePositions, barPositions, canvasWidth, canvasHeight } =
    useMemo(() => {
      const positions = new Map<string, { x: number; y: number }>();
      let maxCol = 0;
      let maxRow = 0;
      for (const node of sitemap.nodes) {
        maxCol = Math.max(maxCol, node.x);
        maxRow = Math.max(maxRow, node.y);
      }
      const totalW = PAD_X * 2 + (maxCol + 1) * NODE_W + maxCol * H_GAP;

      // Position nodes on grid (bars go below, so nodes start at top)
      const nodesStartY = PAD_Y;

      for (const node of sitemap.nodes) {
        const nx = PAD_X + node.x * (NODE_W + H_GAP);
        let ny = nodesStartY + node.y * (NODE_H + V_GAP);
        // Push down if an expanded node is above in the same column
        for (const other of sitemap.nodes) {
          if (
            other.x === node.x &&
            other.y < node.y &&
            expandedNode === other.id
          ) {
            const cc = nodeCounts.get(other.id) ?? 0;
            if (cc > 0) ny += CHIP_AREA_GAP + cc * (CHIP_H + CHIP_GAP);
          }
        }
        positions.set(node.id, { x: nx, y: ny });
      }

      let maxY = 0;
      for (const [nid, pos] of positions) {
        let total = NODE_H;
        if (expandedNode === nid) {
          const cc = nodeCounts.get(nid) ?? 0;
          if (cc > 0) total += CHIP_AREA_GAP + cc * (CHIP_H + CHIP_GAP);
        }
        maxY = Math.max(maxY, pos.y + total);
      }

      // Bars below nodes, starting from column 2 (Home/FRE column)
      const barPos: { id: string; x: number; y: number; w: number }[] = [];
      const barStartCol = 2;
      const barStartX = PAD_X + barStartCol * (NODE_W + H_GAP);
      const barW = totalW - barStartX - PAD_X;
      let barY = maxY + BARS_BOTTOM_MARGIN;
      for (const bar of sitemap.bars) {
        barPos.push({ id: bar.id, x: barStartX, y: barY, w: barW });
        barY += BAR_H + BAR_GAP;
      }

      const finalMaxY = sitemap.bars.length > 0 ? barY : maxY;

      return {
        nodePositions: positions,
        barPositions: barPos,
        canvasWidth: totalW,
        canvasHeight: finalMaxY + PAD_Y,
      };
    }, [sitemap, nodeCounts, expandedNode]);

  const activeIds = useMemo(() => {
    const active = new Set<string>();
    for (const [id, projs] of nodeProjectMap) {
      if (projs.length > 0) active.add(id);
    }
    return active;
  }, [nodeProjectMap]);

  const focusedNode = expandedNode ?? hoveredNode;

  const handleNodeClick = useCallback(
    (nodeId: string) => {
      const count = nodeCounts.get(nodeId) ?? 0;
      if (count === 0) return;
      const projs = nodeProjectMap.get(nodeId) ?? [];
      if (onNodeSelect) {
        onNodeSelect(
          selectedNode === nodeId ? null : nodeId,
          selectedNode === nodeId ? [] : projs.map((p) => p.id),
        );
      }
    },
    [nodeCounts, nodeProjectMap, onNodeSelect, selectedNode],
  );

  const handleChipClick = useCallback(
    (project: Project) => {
      if (project.status === "coming-soon" && !project.source.route) return;
      if (project.source.type === "fork" && project.source.deployUrl) {
        window.open(project.source.deployUrl, "_blank", "noopener");
      } else if (project.source.route) {
        router.push(project.source.route);
      }
    },
    [router],
  );

  // Connection SVG paths (horizontal flow)
  const connectionPaths = useMemo(() => {
    return sitemap.connections
      .map((conn) => {
        const from = nodePositions.get(conn.from);
        const to = nodePositions.get(conn.to);
        if (!from || !to) return null;

        const fromRight = from.x + NODE_W;
        const fromCY = from.y + NODE_H / 2;
        const fromBotCX = from.x + NODE_W / 2;
        const fromBot = from.y + NODE_H;
        const toLeft = to.x;
        const toCY = to.y + NODE_H / 2;
        const toTopCX = to.x + NODE_W / 2;
        const toTop = to.y;

        let d: string;
        let sx: number, sy: number, ex: number, ey: number;

        if (Math.abs(from.y - to.y) < 5 && to.x > from.x) {
          sx = fromRight;
          sy = fromCY;
          ex = toLeft;
          ey = toCY;
          d = `M ${sx} ${sy} L ${ex} ${ey}`;
        } else if (Math.abs(from.x - to.x) < 5 && to.y > from.y) {
          sx = fromBotCX;
          sy = fromBot;
          ex = toTopCX;
          ey = toTop;
          d = `M ${sx} ${sy} L ${ex} ${ey}`;
        } else if (to.y > from.y && to.x > from.x) {
          sx = fromBotCX;
          sy = fromBot;
          ex = toLeft;
          ey = toCY;
          const midY = fromBot + (toTop - fromBot) * 0.5;
          d = `M ${sx} ${sy} C ${sx} ${midY}, ${ex} ${midY}, ${ex} ${ey}`;
        } else if (to.y > from.y) {
          sx = fromBotCX;
          sy = fromBot;
          ex = toTopCX;
          ey = toTop;
          d = `M ${sx} ${sy} C ${sx} ${toTop - 10}, ${ex} ${fromBot + 10}, ${ex} ${ey}`;
        } else {
          sx = fromRight;
          sy = fromCY;
          ex = toLeft;
          ey = toCY;
          const midX = fromRight + (toLeft - fromRight) * 0.5;
          d = `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ey}, ${ex} ${ey}`;
        }

        return {
          key: `${conn.from}-${conn.to}`,
          d,
          from: conn.from,
          to: conn.to,
          sx,
          sy,
          ex,
          ey,
        };
      })
      .filter(Boolean) as {
      key: string;
      d: string;
      from: string;
      to: string;
      sx: number;
      sy: number;
      ex: number;
      ey: number;
    }[];
  }, [sitemap, nodePositions]);

  return (
    <div className={styles.wrapper}>
      <div
        className={mergeClasses(styles.canvas, styles.canvasCenter)}
        ref={applyStyles({ width: canvasWidth, height: canvasHeight })}
      >
        {/* SVG connections */}
        <svg className={styles.svg} width={canvasWidth} height={canvasHeight}>
          {connectionPaths.map((path) => {
            const isHighlighted =
              focusedNode &&
              (path.from === focusedNode || path.to === focusedNode);
            const isDimmed = focusedNode && !isHighlighted;
            const color = isHighlighted
              ? "rgba(99, 102, 241, 0.5)"
              : "rgba(148, 163, 184, 0.35)";
            const op = isDimmed ? 0.15 : 1;
            return (
              <path
                key={path.key}
                d={path.d}
                fill="none"
                stroke={color}
                strokeWidth={isHighlighted ? 2 : 1.5}
                strokeDasharray={isHighlighted ? "6 3" : "4 3"}
                className={styles.connectionPath}
                opacity={op}
              />
            );
          })}
        </svg>

        {/* Cross-cutting bars */}
        {barPositions.map((bp) => {
          const bar = sitemap.bars.find((b) => b.id === bp.id)!;
          const count = nodeCounts.get(bar.id) ?? 0;
          const isActive = activeIds.has(bar.id);
          const isExpanded = expandedNode === bar.id;
          const barProjects = nodeProjectMap.get(bar.id) ?? [];

          let barClass = styles.bar;
          if (isExpanded) barClass += ` ${styles.barExpanded}`;
          else if (isActive) barClass += ` ${styles.barActive}`;
          if (!isActive) barClass += ` ${styles.barDisabled}`;

          return (
            <div key={bar.id}>
              <div
                className={barClass}
                ref={applyStyles({ left: bp.x, top: bp.y, width: bp.w })}
                onClick={() => handleNodeClick(bar.id)}
                onMouseEnter={() => setHoveredNode(bar.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <span
                  className={styles.barDotLabel}
                  ref={applyStyles({ color: bar.color })}
                >
                  ●
                </span>
                {bar.label}
                {count > 0 && (
                  <span
                    className={mergeClasses(styles.badge, styles.badgeSpaced)}
                    ref={applyStyles({ backgroundColor: bar.color })}
                  >
                    {count}
                  </span>
                )}
              </div>
              {isExpanded && barProjects.length > 0 && (
                <div
                  className={styles.chipList}
                  ref={applyStyles({
                    left: bp.x,
                    top: bp.y + BAR_H + CHIP_AREA_GAP,
                    width: bp.w,
                  })}
                >
                  {barProjects.map((project) =>
                    renderChip(
                      project,
                      styles,
                      hoveredChip,
                      setHoveredChip,
                      handleChipClick,
                    ),
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Sitemap nodes */}
        {sitemap.nodes.map((node) => {
          const pos = nodePositions.get(node.id);
          if (!pos) return null;

          const count = nodeCounts.get(node.id) ?? 0;
          const isActive = activeIds.has(node.id);
          const isExpanded = expandedNode === node.id;
          const isHighlighted = focusedNode === node.id;
          const isDimmed = focusedNode !== null && !isHighlighted;
          const nodeProjects = nodeProjectMap.get(node.id) ?? [];

          let nodeClass = styles.sitemapNode;
          if (isExpanded) nodeClass += ` ${styles.sitemapNodeExpanded}`;
          else if (isActive) nodeClass += ` ${styles.sitemapNodeActive}`;
          if (!isActive) nodeClass += ` ${styles.sitemapNodeDisabled}`;
          if (isDimmed && !isExpanded)
            nodeClass += ` ${styles.sitemapNodeDimmed}`;

          return (
            <div key={node.id}>
              <div
                className={nodeClass}
                ref={applyStyles({ left: pos.x, top: pos.y })}
                onClick={() => handleNodeClick(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                role="button"
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    handleNodeClick(node.id);
                }}
              >
                <span
                  className={styles.accentDot}
                  ref={applyStyles({ backgroundColor: node.color })}
                />
                <span className={styles.nodeLabel}>{node.label}</span>
                {count > 0 && (
                  <span
                    className={styles.badge}
                    ref={applyStyles({ backgroundColor: node.color })}
                  >
                    {count}
                  </span>
                )}
              </div>
              {isExpanded && nodeProjects.length > 0 && (
                <div
                  className={styles.chipList}
                  ref={applyStyles({
                    left: pos.x,
                    top: pos.y + NODE_H + CHIP_AREA_GAP,
                    width: NODE_W,
                  })}
                >
                  {nodeProjects.map((project) =>
                    renderChip(
                      project,
                      styles,
                      hoveredChip,
                      setHoveredChip,
                      handleChipClick,
                    ),
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chip renderer (shared between bars and nodes)
// ---------------------------------------------------------------------------

function renderChip(
  project: Project,
  styles: ReturnType<typeof useStyles>,
  hoveredChip: string | null,
  setHoveredChip: (id: string | null) => void,
  handleChipClick: (project: Project) => void,
) {
  const isChipHovered = hoveredChip === project.id;
  const isComingSoon =
    project.status === "coming-soon" && !project.source.route;
  let chipClass = styles.chip;
  if (isChipHovered) chipClass += ` ${styles.chipHovered}`;
  if (isComingSoon) chipClass += ` ${styles.chipComingSoon}`;

  return (
    <div
      key={project.id}
      className={chipClass}
      onMouseEnter={() => setHoveredChip(project.id)}
      onMouseLeave={() => setHoveredChip(null)}
      onClick={(e) => {
        e.stopPropagation();
        handleChipClick(project);
      }}
      role="button"
      tabIndex={isComingSoon ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.stopPropagation();
          handleChipClick(project);
        }
      }}
      title={project.description}
    >
      <span
        className={styles.horizonDot}
        ref={applyStyles({
          backgroundColor: horizonColors[project.horizon] ?? "#94a3b8",
        })}
      />
      <span className={styles.chipLabel}>{project.title}</span>
    </div>
  );
}
