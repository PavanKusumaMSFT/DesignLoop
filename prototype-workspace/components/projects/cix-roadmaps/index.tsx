"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Input,
  makeStyles,
  mergeClasses,
  Dropdown,
  Option,
  Tab,
  TabList,
  Text,
  Textarea,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  tokens as fluentTokens,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { Dismiss24Regular, MoreHorizontal20Regular, ArrowDownload20Regular, ArrowUpload20Regular, ChevronDown20Regular, ChevronRight20Regular } from "@fluentui/react-icons";
import seedRoadmaps from "../../../data/cix-roadmaps-seed.json";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

type SizeValue = "" | "S" | "M" | "L" | "XL";
type ColumnKey =
  | "name"
  | "assignee"
  | "pmAssigned"
  | "stakeholders"
  | "adoStart"    // New: ADO Start date
  | "adoEnd"      // New: ADO End date
  | "researchStart"
  | "researchEnd"
  | "researchStart2"
  | "researchEnd2"
  | "start"
  | "end"
  | "engStart"
  | "shipDate"
  | "figmaLink"
  | "notes"
  | "size"
  | "status"
  | "priority";
type BaseArea = "Storage" | "Compute" | "AKS" | "Horizontal";
type Area = BaseArea | "Intake" | "Office hours";

interface TimelineItem {
  id: string;
  name: string;
  assignee: string;
  pmAssigned: string;
  stakeholders: string;
  adoStart: string;      // New: ADO Start date
  adoEnd: string;        // New: ADO End date
  researchStart: string;
  researchEnd: string;
  researchStart2: string;
  researchEnd2: string;
  start: string;
  end: string;
  engStart: string;
  shipDate: string;
  figmaLink: string;
  notes: string;
  size: SizeValue;
  status: string;
  priority: string;
  link?: string;
}

interface TimelinePoint {
  y: number;
  m: number;
  d: number;
}

type SeedTimelineItem = Omit<TimelineItem, "id" | "size" | "pmAssigned" | "engStart" | "shipDate" | "figmaLink" | "researchStart" | "researchEnd" | "researchStart2" | "researchEnd2" | "adoStart" | "adoEnd"> & {
  size: string;
  pmAssigned?: string;
  engStart?: string;
  shipDate?: string;
  figmaLink?: string;
  researchStart?: string;
  researchEnd?: string;
  researchStart2?: string;
  researchEnd2?: string;
  adoStart?: string;
  adoEnd?: string;
};
type SeedRoadmaps = Record<BaseArea, SeedTimelineItem[]>;

const RANGE_START = { y: 2024, m: 11 };
const TOTAL_MONTHS = 10;
const MONTH_NAMES = ["Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const TODAY = { y: 2025, m: 3, d: 24 };
const AREAS: Area[] = ["Storage", "Compute", "AKS", "Horizontal", "Intake", "Office hours"];
const PLACEHOLDER_AREAS: ReadonlySet<Area> = new Set<Area>(["Intake", "Office hours"]);
const TABLE_COLUMNS: ColumnKey[] = [
  "name",
  "assignee",
  "pmAssigned",
  "stakeholders",
  "adoStart",      // New: ADO Start date
  "adoEnd",        // New: ADO End date
  "researchStart",
  "researchEnd",
  "researchStart2",
  "researchEnd2",
  "start",
  "end",
  "engStart",
  "shipDate",
  "figmaLink",
  "notes",
  "size",
  "status",
  "priority",
];

const roadmapColorTokens = {
  coral: "#FF6B6B",
  amber: "#EA9010",
  mint: "#80DED9",
  mist: "#AEECEF",
  slate: "#355070",
  indigo: "#445E93",
  lilac: "#DAC4F7",
} as const;

const COLUMN_LABELS: Record<ColumnKey, string> = {
  name: "Work item",
  assignee: "Assignment",
  pmAssigned: "PM assigned",
  stakeholders: "Stakeholders",
  adoStart: "Start date",      // New: ADO Start date
  adoEnd: "End date",          // New: ADO End date
  researchStart: "Research start date",
  researchEnd: "Research end date",
  researchStart2: "Research 2 start date",
  researchEnd2: "Research 2 end date",
  start: "Design start date",
  end: "Design end date",
  engStart: "Eng start",
  shipDate: "Ship date",
  figmaLink: "Figma/prototype link",
  notes: "Notes/links",
  size: "Size",
  status: "Status",
  priority: "Priority",
};

const DATE_COLUMNS: ReadonlySet<ColumnKey> = new Set([
  "adoStart",
  "adoEnd",
  "researchStart",
  "researchEnd",
  "researchStart2",
  "researchEnd2",
  "start",
  "end",
  "engStart",
  "shipDate",
]);

type SortDirection = "ascending" | "descending" | "none";
interface SortState { column: ColumnKey | null; direction: SortDirection; }
const INITIAL_SORT: SortState = { column: null, direction: "none" };

const SIZE_ORDER: Record<string, number> = { "": 0, S: 1, M: 2, L: 3, XL: 4 };

function getSortValue(item: TimelineItem, column: ColumnKey): string | number | null {
  const raw = item[column];
  if (raw === undefined || raw === null || raw === "") return null;
  const str = String(raw);
  if (DATE_COLUMNS.has(column)) {
    const d = new Date(str);
    return isNaN(d.getTime()) ? null : d.getTime();
  }
  if (column === "size") return SIZE_ORDER[str] ?? 0;
  if (column === "priority") {
    const m = str.match(/^P(\d+)$/i);
    return m ? parseInt(m[1], 10) : null;
  }
  return str;
}

function sortItems(items: TimelineItem[], state: SortState): TimelineItem[] {
  if (!state.column || state.direction === "none") return items;
  const col = state.column;
  const dir = state.direction === "ascending" ? 1 : -1;
  return [...items].sort((a, b) => {
    const va = getSortValue(a, col);
    const vb = getSortValue(b, col);
    if (va === null && vb === null) return 0;
    if (va === null) return 1;
    if (vb === null) return -1;
    if (typeof va === "number" && typeof vb === "number") return (va - vb) * dir;
    return String(va).localeCompare(String(vb), undefined, { sensitivity: "base" }) * dir;
  });
}

function nextSortDirection(current: SortDirection): SortDirection {
  if (current === "none") return "ascending";
  if (current === "ascending") return "descending";
  return "none";
}

type PhaseKey = "research" | "design" | "engineering";

interface PhaseDef {
  key: PhaseKey;
  label: string;
  color: string;
  startField: keyof TimelineItem;
  endField: keyof TimelineItem;
}

const PHASES: ReadonlyArray<PhaseDef> = [
  { key: "research", label: "Research", color: "#80DED9", startField: "researchStart", endField: "researchEnd" },
  { key: "research2", label: "Research 2", color: "#AEECEF", startField: "researchStart2", endField: "researchEnd2" },
  { key: "design", label: "Design", color: "#445E93", startField: "start", endField: "end" },
  { key: "engineering", label: "Engineering", color: "#EA9010", startField: "engStart", endField: "shipDate" },
];
const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

function stringToDate(value: string): Date | null {
  const point = parseDate(value);
  if (!point) {
    return null;
  }
  return new Date(point.y, point.m, point.d);
}

function dateToString(date: Date | null | undefined): string {
  if (!date) {
    return "";
  }
  return `${SHORT_MONTHS[date.getMonth()]} ${date.getDate()}`;
}

function formatDateForCell(date?: Date): string {
  if (!date) {
    return "";
  }
  return `${SHORT_MONTHS[date.getMonth()]} ${date.getDate()}`;
}

let rowCounter = 1;

function nextRowId() {
  const id = `row-${rowCounter}`;
  rowCounter += 1;
  return id;
}

const roadmapSeed: SeedRoadmaps = seedRoadmaps;

function toTimelineItems(items: ReadonlyArray<SeedTimelineItem>): TimelineItem[] {
  return items.map((item) => {
    const size: SizeValue =
      item.size === "S" || item.size === "M" || item.size === "L" || item.size === "XL" ? item.size : "";

    return {
      ...item,
      size,
      pmAssigned: item.pmAssigned ?? "",
      adoStart: item.adoStart ?? "",
      adoEnd: item.adoEnd ?? "",
      engStart: item.engStart ?? "",
      shipDate: item.shipDate ?? "",
      figmaLink: item.figmaLink ?? "",
      researchStart: item.researchStart ?? "",
      researchEnd: item.researchEnd ?? "",
      researchStart2: item.researchStart2 ?? "",
      researchEnd2: item.researchEnd2 ?? "",
      id: nextRowId(),
    };
  });
}

const INITIAL_ROADMAPS: Record<Area, TimelineItem[]> = {
  Storage: toTimelineItems(roadmapSeed.Storage),
  Compute: toTimelineItems(roadmapSeed.Compute),
  AKS: toTimelineItems(roadmapSeed.AKS),
  Horizontal: toTimelineItems(roadmapSeed.Horizontal),
  Intake: [],
  "Office hours": [],
};

function pct({ y, m, d }: TimelinePoint) {
  const base = RANGE_START.y * 12 + RANGE_START.m;
  const absolute = y * 12 + m;
  const value = (absolute - base + (d - 1) / 30) / TOTAL_MONTHS;
  return Math.min(100, Math.max(0, value * 100));
}

function parseDate(value: string | null): TimelinePoint | null {
  if (!value || value.trim() === "" || /^tbd$/i.test(value.trim())) {
    return null;
  }

  const monthMap: Record<string, number> = {
    Jan: 0,
    January: 0,
    Feb: 1,
    February: 1,
    Mar: 2,
    March: 2,
    Apr: 3,
    April: 3,
    May: 4,
    Jun: 5,
    June: 5,
    Jul: 6,
    July: 6,
    Aug: 7,
    August: 7,
    Sep: 8,
    Sept: 8,
    September: 8,
    Oct: 9,
    October: 9,
    Nov: 10,
    November: 10,
    Dec: 11,
    December: 11,
  };

  const match = value.trim().match(
    /(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2})/i,
  );

  if (!match) {
    return null;
  }

  const month = `${match[1].charAt(0).toUpperCase()}${match[1].slice(1).toLowerCase()}`;
  const numericMonth = monthMap[month];
  const numericDay = Number.parseInt(match[2], 10);

  if (numericMonth === undefined || Number.isNaN(numericDay)) {
    return null;
  }

  return { y: numericMonth <= 8 ? 2025 : 2024, m: numericMonth, d: numericDay };
}

function uniqueAssignees(items: TimelineItem[]) {
  return items.filter(
    (item, index) => items.findIndex((entry) => entry.assignee === item.assignee) === index && item.assignee !== "",
  );
}

function colorForAssignee(assignee: string) {
  const palette = [
    roadmapColorTokens.coral,
    roadmapColorTokens.amber,
    roadmapColorTokens.mint,
    roadmapColorTokens.mist,
    roadmapColorTokens.slate,
    roadmapColorTokens.indigo,
    roadmapColorTokens.lilac,
  ];
  const normalized = assignee.trim() || "TBD";
  const explicit: Record<string, string> = {
    "Manny / Jay": roadmapColorTokens.slate,
    Joe: roadmapColorTokens.mint,
    Jay: roadmapColorTokens.lilac,
    Grant: roadmapColorTokens.amber,
    TBD: tokens.colorNeutralForeground3,
    Favour: roadmapColorTokens.indigo,
    Julia: roadmapColorTokens.coral,
    "Office hours": roadmapColorTokens.mist,
  };

  if (explicit[normalized]) {
    return explicit[normalized];
  }

  let hash = 0;
  for (let index = 0; index < normalized.length; index += 1) {
    hash = (hash << 5) - hash + normalized.charCodeAt(index);
    hash |= 0;
  }

  return palette[Math.abs(hash) % palette.length];
}

const useStyles = makeStyles({
    datePicker: {
      backgroundColor: tokens.colorNeutralBackground1,
      // The DatePicker input is a native input, so we use !important to ensure override
      '& input': {
        backgroundColor: tokens.colorNeutralBackground1 + ' !important',
      },
      // Add border and radius for consistency
      borderRadius: tokens.borderRadiusMedium,
      border: `1px solid ${tokens.colorNeutralStroke2}`,
    },
    datePickerPopup: {
      backgroundColor: tokens.colorNeutralBackground1,
      borderRadius: tokens.borderRadiusLarge,
      border: `1px solid ${tokens.colorNeutralStroke1}`,
      boxShadow: tokens.shadow16,
      zIndex: 10,
    },
  page: {
    width: "100%",
    maxWidth: "1440px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalXL,
  },
  shell: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadius2XLarge,
    boxShadow: tokens.shadow16,
    overflow: "hidden",
  },
  areaTabs: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalXXL}`,
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  areaTabList: {
    columnGap: tokens.spacingHorizontalS,
    rowGap: tokens.spacingVerticalS,
    backgroundColor: "transparent",
  },
  areaTab: {
    borderRadius: tokens.borderRadiusCircular,
    color: tokens.colorNeutralForeground2,
    backgroundColor: tokens.colorNeutralBackground1,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    borderLeft: `1px solid ${tokens.colorNeutralStroke1}`,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    ":hover": {
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    '&[aria-selected="true"]': {
      backgroundColor: roadmapColorTokens.indigo,
      borderTopColor: roadmapColorTokens.indigo,
      borderRightColor: roadmapColorTokens.indigo,
      borderBottomColor: roadmapColorTokens.indigo,
      borderLeftColor: roadmapColorTokens.indigo,
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: tokens.spacingHorizontalL,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  headerBlock: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXXS,
  },
  kicker: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  title: {
    lineHeight: "1.1",
  },
  subtitle: {
    color: tokens.colorNeutralForeground2,
  },
  overview: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
    flexWrap: "wrap",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  metricCard: {
    display: "flex",
    alignItems: "baseline",
    gap: tokens.spacingHorizontalXS,
    paddingLeft: tokens.spacingHorizontalL,
    borderLeft: `1px solid ${tokens.colorNeutralStroke1}`,
    minHeight: "28px",
    ':first-child': {
      borderLeft: "none",
      paddingLeft: 0,
    },
  },
  metricValue: {
    color: tokens.colorNeutralForeground1,
  },
  metricLabel: {
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  board: {
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXXL}`,
  },
  srOnly: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
  },
  monthHeaderGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 240px) minmax(0, 1fr)",
    alignItems: "end",
    marginBottom: tokens.spacingVerticalXS,
  },
  monthHeader: {
    position: "relative",
    height: "32px",
  },
  monthLabel: {
    position: "absolute",
    top: "6px",
    transform: "translateX(-50%)",
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
  todayMarker: {
    position: "absolute",
    top: 0,
    bottom: "-8px",
    width: "1px",
    backgroundColor: roadmapColorTokens.coral,
    opacity: 0.8,
    pointerEvents: "none",
  },
  todayLabel: {
    position: "absolute",
    top: "-8px",
    transform: "translate(-50%, -100%)",
    color: roadmapColorTokens.coral,
    fontSize: tokens.fontSizeBase100,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    whiteSpace: "nowrap",
  },
  timelineRow: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 240px) minmax(0, 1fr)",
    alignItems: "stretch",
    minHeight: "52px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    ":last-of-type": {
      borderBottom: "none",
    },
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  timelineRowExpanded: {
    minHeight: "88px",
  },
  timelineLabel: {
    display: "flex",
    alignItems: "center",
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL} ${tokens.spacingVerticalM} 0`,
  },
  timelineLink: {
    color: roadmapColorTokens.mist,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
  assignee: {
    display: "block",
    marginTop: tokens.spacingVerticalXXS,
    color: tokens.colorNeutralForeground3,
  },
  timelineChart: {
    position: "relative",
    minHeight: "64px",
  },
  todayLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "1px",
    backgroundColor: tokens.colorPaletteRedForeground1,
    opacity: 0.8,
    pointerEvents: "none",
  },
  timelineBar: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    height: "18px",
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow2,
  },
  timelineBarOpen: {
    opacity: 0.6,
    borderRightWidth: "2px",
    borderRightStyle: "dashed",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  timelineTbd: {
    position: "absolute",
    top: "50%",
    left: tokens.spacingHorizontalS,
    transform: "translateY(-50%)",
    color: tokens.colorNeutralForeground3,
    fontStyle: "italic",
  },
  legend: {
    display: "flex",
    flexWrap: "wrap",
    gap: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalL}`,
    paddingTop: tokens.spacingVerticalL,
    marginTop: tokens.spacingVerticalM,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  legendItem: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  legendDot: {
    width: "12px",
    height: "12px",
    borderRadius: tokens.borderRadiusSmall,
    flexShrink: 0,
  },
  emptyState: {
    display: "grid",
    gap: tokens.spacingVerticalS,
    padding: `${tokens.spacingVerticalL} 0`,
  },
  tablePanel: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: `${tokens.spacingVerticalXL} ${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalL}`,
  },
  tableHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
  },
  tableToggle: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    cursor: "pointer",
    userSelect: "none" as const,
    background: "none",
    border: "none",
    padding: 0,
    color: tokens.colorNeutralForeground1,
  },
  tableActions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  columnMenu: {
    position: "relative",
  },
  actionButton: {
    borderRadius: tokens.borderRadiusCircular,
  },
  columnPopover: {
    position: "absolute",
    right: 0,
    top: "calc(100% + 8px)",
    zIndex: 20,
    width: "220px",
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
    display: "grid",
    gap: tokens.spacingVerticalXS,
  },
  columnItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalXXS} 0`,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
  },
  tableWrap: {
    overflowX: "auto",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusXLarge,
  },
  table: {
    width: "100%",
    minWidth: "1520px",
    borderCollapse: "collapse",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  tableCell: {
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    textAlign: "left",
    verticalAlign: "top",
    padding: tokens.spacingHorizontalM,
    ":last-child": {
      borderRight: "none",
    },
  },
  tableHeadCell: {
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground1,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  sortableHeader: {
    cursor: "pointer",
    userSelect: "none" as const,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground2Hover,
    },
  },
  sortHeaderContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalXS,
  },
  sortArrow: {
    fontSize: "10px",
    lineHeight: 1,
    opacity: 0.8,
    flexShrink: 0,
  },
  input: {
    width: "100%",
  },
  workInput: {
    fontWeight: tokens.fontWeightSemibold,
  },
  textarea: {
    minHeight: "56px",
    lineHeight: tokens.lineHeightBase300,
  },
  select: {
    minWidth: "78px",
  },
  figmaCell: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  figmaOpenLink: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase200,
    textDecorationLine: "none",
    whiteSpace: "nowrap",
    ":hover": {
      textDecorationLine: "underline",
    },
  },
  placeholder: {
    padding: `${tokens.spacingVerticalXXXL} ${tokens.spacingHorizontalXXL}`,
    display: "grid",
    gap: tokens.spacingVerticalM,
    minHeight: "320px",
    alignContent: "start",
  },
  placeholderBody: {
    color: tokens.colorNeutralForeground3,
    maxWidth: "640px",
  },
  checkbox: {
    color: tokens.colorNeutralForeground2,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalL,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXXL} ${tokens.spacingVerticalXL}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  footerNote: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
  mobileInset: {
    "@media (max-width: 900px)": {
      paddingLeft: tokens.spacingHorizontalL,
      paddingRight: tokens.spacingHorizontalL,
    },
  },
  mobileHeader: {
    "@media (max-width: 900px)": {
      display: "grid",
    },
  },
  mobileTimelineGrid: {
    "@media (max-width: 900px)": {
      gridTemplateColumns: "1fr",
    },
  },
  mobileTable: {
    "@media (max-width: 900px)": {
      minWidth: "1180px",
    },
  },
});

/** Integrated roadmap workspace migrated from the standalone CIX portable app into the main Next project structure. */
export default function CixRoadmaps() {
  const styles = useStyles();
  const [activeArea, setActiveArea] = useState<Area>("Storage");
  const [roadmaps, setRoadmaps] = useState<Record<Area, TimelineItem[]>>(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("cix-roadmaps-data");
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Record<string, TimelineItem[]>;
          // Seed is source of truth: seed non-empty values always win,
          // localStorage fills in fields the seed leaves blank,
          // new seed items appear, user-added items are preserved.
          const merged: Record<string, TimelineItem[]> = {};
          for (const area of Object.keys(INITIAL_ROADMAPS) as Array<keyof typeof INITIAL_ROADMAPS>) {
            const seedItems = INITIAL_ROADMAPS[area];
            const localItems = parsed[area] || [];

            const result = seedItems.map((seedItem) => {
              const localMatch = localItems.find((l) => l.name === seedItem.name);
              if (!localMatch) return seedItem;
              // Start from localStorage, then overwrite with any non-empty seed values
              const item = { ...localMatch };
              for (const key of Object.keys(seedItem) as Array<keyof TimelineItem>) {
                if (seedItem[key]) {
                  (item as any)[key] = seedItem[key];
                }
              }
              return item;
            });

            // Append user-added items that don't exist in the seed
            for (const localItem of localItems) {
              if (!seedItems.find((s) => s.name === localItem.name)) {
                result.push(localItem);
              }
            }

            merged[area] = result;
          }
          return merged as Record<Area, TimelineItem[]>;
        } catch {
          // fallback to seed if corrupted
        }
      }
    }
    return INITIAL_ROADMAPS;
  });
    // Persist roadmaps to localStorage on every change
    useEffect(() => {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("cix-roadmaps-data", JSON.stringify(roadmaps));
      }
    }, [roadmaps]);
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<Record<ColumnKey, boolean>>(() => {
    // Ensure all TABLE_COLUMNS are present and default to true
    const initial: Record<ColumnKey, boolean> = {} as any;
    TABLE_COLUMNS.forEach((col) => { initial[col] = true; });
    return initial;
  });
  const activeItems = roadmaps[activeArea];
  const activeColumns = TABLE_COLUMNS.filter((column) => visibleColumns[column]);
  const [sortState, setSortState] = useState<SortState>(INITIAL_SORT);
  const sortedItems = useMemo(() => sortItems(activeItems, sortState), [activeItems, sortState]);
  const handleSort = (column: ColumnKey) => {
    setSortState((prev) => {
      if (prev.column === column) return { column, direction: nextSortDirection(prev.direction) };
      return { column, direction: "ascending" };
    });
  };
  const todayPosition = pct(TODAY);
  const columnMenuRef = useRef<HTMLDivElement | null>(null);
  const tbdCount = activeItems.filter(
    (item) =>
      !parseDate(item.researchStart) &&
      !parseDate(item.researchEnd) &&
      !parseDate(item.researchStart2) &&
      !parseDate(item.researchEnd2) &&
      !parseDate(item.start) &&
      !parseDate(item.end) &&
      !parseDate(item.engStart) &&
      !parseDate(item.shipDate),
  ).length;
  const scheduledCount = activeItems.length - tbdCount;
  const hasItems = activeItems.length > 0;
  const isPlaceholder = PLACEHOLDER_AREAS.has(activeArea);

  function updateRow(rowId: string, field: ColumnKey, value: string) {
    setRoadmaps((prev) => ({
      ...prev,
      [activeArea]: prev[activeArea].map((item) => (item.id === rowId ? { ...item, [field]: value } : item)),
    }));
  }

  function toggleColumn(column: ColumnKey) {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  }

  function addRow() {
    setRoadmaps((prev) => ({
      ...prev,
      [activeArea]: [
        ...prev[activeArea],
        {
          id: nextRowId(),
          name: "New work item",
          assignee: "TBD",
          pmAssigned: "",
          stakeholders: "",
          researchStart: "",
          researchEnd: "",
          researchStart2: "",
          researchEnd2: "",
          start: "TBD",
          end: "TBD",
          engStart: "",
          shipDate: "",
          figmaLink: "",
          notes: "",
          size: "",
          status: "",
          priority: "",
        },
      ],
    }));
  }

  const [editMode, setEditMode] = useState(false);
  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const isEditableArea = activeArea === "Storage" || activeArea === "Compute";
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function exportData() {
    const blob = new Blob([JSON.stringify(roadmaps, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cix-roadmaps-seed.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importData() {
    fileInputRef.current?.click();
  }

  function handleFileImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        setRoadmaps(data);
      } catch {
        alert("Invalid JSON file. Please select a valid roadmap data file.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  function deleteRow(rowId: string) {
    setRoadmaps((prev) => ({
      ...prev,
      [activeArea]: prev[activeArea].filter((item) => item.id !== rowId),
    }));
  }

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (!columnMenuRef.current) {
        return;
      }

      if (!columnMenuRef.current.contains(event.target as Node)) {
        setIsColumnMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function renderTableCell(
    item: TimelineItem,
    column: ColumnKey,
    onUpdate: (rowId: string, field: ColumnKey, value: string) => void,
    s: ReturnType<typeof useStyles>,
    mc: typeof mergeClasses,
  ) {
    if (column === "notes") {
      return (
        <td className={s.tableCell} key={`${item.id}-${column}`}>
          <Textarea
            className={mc(s.input, s.textarea)}
            onChange={(event) => onUpdate(item.id, "notes", event.target.value)}
            value={item.notes}
          />
        </td>
      );
    }

    if (column === "size") {
      return (
        <td className={s.tableCell} key={`${item.id}-${column}`}>
          <Dropdown
            className={mc(s.input)}
            onOptionSelect={(_e, data) => onUpdate(item.id, "size", data.optionValue ?? "")}
            value={item.size || "-"}
          >
            <Option value="">-</Option>
            <Option value="S">S</Option>
            <Option value="M">M</Option>
            <Option value="L">L</Option>
            <Option value="XL">XL</Option>
          </Dropdown>
        </td>
      );
    }

    if (DATE_COLUMNS.has(column)) {
      return (
        <td className={s.tableCell} key={`${item.id}-${column}`}>
          <DatePicker
            className={mc(s.input)}
            popupSurface={{ className: s.datePickerPopup }}
            inlinePopup
            onSelectDate={(date) => onUpdate(item.id, column, dateToString(date))}
            placeholder=""
            value={stringToDate(item[column]) ?? undefined}
            formatDate={(d) => (d ? formatDateForCell(d) : "")}
          />
        </td>
      );
    }

    return (
      <td className={s.tableCell} key={`${item.id}-${column}`}>
        <Input
          className={mc(s.input, column === "name" && s.workInput)}
          onChange={(event) => onUpdate(item.id, column, event.target.value)}
          value={item[column]}
        />
      </td>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.shell}>
        <nav aria-label="Roadmap areas" className={mergeClasses(styles.areaTabs, styles.mobileInset)}>
          <TabList
            appearance="subtle-circular"
            aria-label="Roadmap areas"
            className={styles.areaTabList}
            onTabSelect={(_, data) => setActiveArea(data.value as Area)}
            selectedValue={activeArea}
            size="small"
          >
            {AREAS.map((area) => (
              <Tab className={styles.areaTab} key={area} value={area}>
                {area}
              </Tab>
            ))}
          </TabList>
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Button
                appearance="subtle"
                icon={<MoreHorizontal20Regular />}
                aria-label="Data options"
                size="small"
              />
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem icon={<ArrowDownload20Regular />} onClick={exportData}>
                  Export data (JSON)
                </MenuItem>
                <MenuItem icon={<ArrowUpload20Regular />} onClick={importData}>
                  Import data (JSON)
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            style={{ display: "none" }}
            onChange={handleFileImport}
          />
        </nav>

        {isPlaceholder ? (
          <section className={mergeClasses(styles.placeholder, styles.mobileInset)}>
            <Text as="h2" className={styles.title} size={700} weight="semibold">
              {activeArea}
            </Text>
            {activeArea === "Intake" ? (
              <Text as="p" size={300} className={styles.placeholderBody}>
                Placeholder for the design intake queue. New requests, triage status, and intake forms will live here.
              </Text>
            ) : (
              <>
                <Text as="p" size={300} className={styles.placeholderBody}>
                  Our CIX Design office hours series is for PMs and Engineers in the Portal Compute, Storage, and AKS/Cloud Native orgs to get design feedback or consultation on smaller work items that don’t have full design support. This can include:
                </Text>
                <ul className={styles.placeholderBody} style={{ marginTop: 8, marginBottom: 8 }}>
                  <li>Feedback on Portal interaction / pattern best practices</li>
                  <li>Quick brainstorm sessions on approaching UX problems</li>
                  <li>Fit and Finish for XS features</li>
                  <li>And more!</li>
                </ul>
                <Text as="p" size={300} className={styles.placeholderBody}>
                  <a href="https://microsoft.sharepoint.com/:fl:/s/4e4273f2-9ac9-497f-8bca-1b2c8a2f9bf7/IQAayyopbpcnR4NWEdeYHvnLAfhLuwyUb4_B-MvOHStUrM0?e=2ZNqqD&nav=cz0lMkZzaXRlcyUyRjRlNDI3M2YyLTlhYzktNDk3Zi04YmNhLTFiMmM4YTJmOWJmNyZkPWIlMjFSdHBtUHBPVkxVYWhIYVlaM0JCMHd4VlJXanoyREp0RHVmcTFiYkdrazlvcjNQMUNQM1BwUUpPdjc5eFUzYkJ4JmY9MDFHUkJMTlpZMlpNVkNTM1VYRTVEWUdWUVIyNk1CNTZPTCZjPSUyRiZhPUxvb3BBcHAmcD0lNDBmbHVpZHglMkZsb29wLXBhZ2UtY29udGFpbmVyJng9JTdCJTIydyUyMiUzQSUyMlQwUlRVSHh0YVdOeWIzTnZablF1YzJoaGNtVndiMmx1ZEM1amIyMThZaUZTZEhCdFVIQlBWa3hWWVdoSVlWbGFNMEpDTUhkNFZsSlhhbm95UkVwMFJIVm1jVEZpWWtkcmF6bHZjak5RTVVOUU0xQndVVXBQZGpjNWVGVXpZa0o0ZkRBeFIxSkNURTVhTTBGQ1QxWlFTRlpaU0VWT1IwcFFSbFpQUmpSVFJqVk5WMHMlM0QlMjIlMkMlMjJpJTIyJTNBJTIyNjk3NjBjOTQtMjAwNS00MjhmLWIyMmEtN2Q1ODQ0YjNiYzMyJTIyJTdE" target="_blank" rel="noopener noreferrer" style={{ color: '#0078D4', textDecoration: 'underline' }}>
                    Please sign up here
                  </a>
                </Text>
                <Text as="p" size={300} className={styles.placeholderBody}>
                  If there are still slots opened, we will check with the team in the chat for any last minute signups. If there is no agenda before 12PM PST, we will consider the office hours cancelled.
                </Text>
              </>
            )}
          </section>
        ) : (
          <>
        <header className={mergeClasses(styles.header, styles.mobileInset, styles.mobileHeader)}>
          <div className={styles.headerBlock}>
            <Text as="h2" className={styles.title} size={700} weight="semibold">
              {(() => {
                switch (activeArea) {
                  case "Storage":
                    return "Storage Design/Research Roadmap";
                  case "Compute":
                    return "Compute Design/Research Roadmap";
                  case "AKS":
                    return "AKS/Cloud Native Design/Research Roadmap";
                  case "Horizontal":
                    return "Horizontal Initiatives in CIX";
                  default:
                    return `${activeArea} Roadmap`;
                }
              })()}
            </Text>
            <Text as="span" className={styles.subtitle} size={200}>
              Dec 2024 to Sep 2025
            </Text>
          </div>
        </header>

        <div className={mergeClasses(styles.board, styles.mobileInset)}>
          <Text as="h3" className={styles.srOnly}>Roadmap timeline for {activeArea}</Text>

          {hasItems ? (
            <>
              <div aria-hidden="true" className={mergeClasses(styles.monthHeaderGrid, styles.mobileTimelineGrid)}>
                <div />
                <div className={styles.monthHeader}>
                  {MONTH_NAMES.map((month, index) => (
                    <span className={styles.monthLabel} key={month} style={{ left: `${(index / TOTAL_MONTHS) * 100}%` }}>
                      {month}
                    </span>
                  ))}
                  <span className={styles.todayLabel} style={{ left: `${todayPosition}%` }}>today</span>
                  <div className={styles.todayMarker} style={{ left: `${todayPosition}%` }} />
                </div>
              </div>

              {sortedItems.map((item) => {
                const phaseRanges = PHASES.map((phase) => {
                  const startStr = item[phase.startField] as string;
                  const endStr = item[phase.endField] as string;
                  const startPoint = parseDate(startStr);
                  const endPoint = parseDate(endStr);
                  if (!startPoint && !endPoint) {
                    return null;
                  }
                  const left = startPoint ? pct(startPoint) : 0;
                  const right = endPoint ? pct(endPoint) : 100;
                  return {
                    phase,
                    left,
                    width: Math.max(0.5, right - left),
                    isOpenEnded: Boolean(startPoint && !endPoint),
                  };
                }).filter((range): range is NonNullable<typeof range> => range !== null);
                const hasAnyPhase = phaseRanges.length > 0;
                const isExpanded = phaseRanges.length > 3;

                return (
                  <article className={mergeClasses(styles.timelineRow, styles.mobileTimelineGrid, isExpanded && styles.timelineRowExpanded)} key={item.id}>
                    <div className={styles.timelineLabel}>
                      <div>
                        <Text as="p" size={300} weight="semibold">
                          {item.link ? (
                            <a className={styles.timelineLink} href={item.link} rel="noreferrer" target="_blank">
                              {item.name}
                            </a>
                          ) : (
                            item.name
                          )}
                        </Text>
                        <Text as="span" className={styles.assignee} size={200}>{item.assignee}</Text>
                      </div>
                    </div>

                    <div className={styles.timelineChart}>
                      <div className={styles.todayLine} style={{ left: `${todayPosition}%` }} />
                      {hasAnyPhase ? (
                        phaseRanges.map(({ phase, left, width, isOpenEnded }, index) => {
                          const barHeight = 14;
                          const barGap = 4;
                          const totalBars = phaseRanges.length;
                          const totalHeight = totalBars * barHeight + (totalBars - 1) * barGap;
                          const topOffset = index * (barHeight + barGap) - totalHeight / 2;
                          return (
                            <div
                              className={mergeClasses(styles.timelineBar, isOpenEnded && styles.timelineBarOpen)}
                              key={phase.key}
                              style={{
                                left: `${left}%`,
                                width: `${width}%`,
                                backgroundColor: phase.color,
                                borderRightColor: phase.color,
                                top: "50%",
                                transform: `translateY(${topOffset}px)`,
                                height: `${barHeight}px`,
                              }}
                              title={`${phase.label}: ${item.notes || item.name}`}
                            />
                          );
                        })
                      ) : (
                        <Text as="span" className={styles.timelineTbd} size={200}>TBD</Text>
                      )}
                    </div>
                  </article>
                );
              })}

              <div aria-label="Timeline legend" className={styles.legend}>
                {PHASES.filter((phase) => phase.key !== "research2").map((phase) => (
                  <span className={styles.legendItem} key={phase.key}>
                    <span className={styles.legendDot} style={{ backgroundColor: phase.color }} />
                    <Text as="span" size={200}>{phase.label}</Text>
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.emptyState} role="status">
              <Text as="p" size={400} weight="semibold">No roadmap items yet for {activeArea}</Text>
              <Text as="p" size={300}>Add entries to the roadmap data in this component when you are ready to build this view.</Text>
            </div>
          )}
        </div>

        <section aria-label="Roadmap data table" className={mergeClasses(styles.tablePanel, styles.mobileInset)}>
          <div className={styles.tableHeader}>
            <button
              className={styles.tableToggle}
              onClick={() => setIsTableExpanded((prev) => !prev)}
              aria-expanded={isTableExpanded}
            >
              {isTableExpanded ? <ChevronDown20Regular /> : <ChevronRight20Regular />}
              <Text as="h3" size={500} weight="semibold">Roadmap data</Text>
            </button>
            {isTableExpanded && (
            <div className={styles.tableActions}>
              <div className={styles.columnMenu} ref={columnMenuRef}>
                <button
                  aria-expanded={isColumnMenuOpen}
                  aria-haspopup="menu"
                  className={styles.srOnly}
                  tabIndex={-1}
                  type="button"
                >
                  <span>Columns</span>
                </button>
                <Button
                  appearance="secondary"
                  className={styles.actionButton}
                  onClick={() => setIsColumnMenuOpen((prev) => !prev)}
                  size="small"
                >
                  Columns
                </Button>

                {isColumnMenuOpen ? (
                  <div className={styles.columnPopover} role="menu">
                    {TABLE_COLUMNS.map((column) => (
                      <Checkbox
                        checked={visibleColumns[column]}
                        className={styles.checkbox}
                        key={column}
                        label={COLUMN_LABELS[column]}
                        onChange={() => toggleColumn(column)}
                      />
                    ))}
                  </div>
                ) : null}
              </div>

              <Button appearance="primary" className={styles.actionButton} onClick={addRow} size="small">
                Add row
              </Button>
              {isEditableArea && (
                <Button
                  appearance={editMode ? "primary" : "secondary"}
                  className={styles.actionButton}
                  onClick={() => setEditMode((prev) => !prev)}
                  size="small"
                >
                  {editMode ? "Done editing" : "Edit"}
                </Button>
              )}
            </div>
            )}
          </div>

          {isTableExpanded && (
          <div className={styles.tableWrap}>
            <table className={mergeClasses(styles.table, styles.mobileTable)}>
              <thead>
                <tr>
                  {editMode && isEditableArea ? (
                    <>
                      <th className={mergeClasses(styles.tableCell, styles.tableHeadCell)} key="delete-col" scope="col">
                        Delete
                      </th>
                      {activeColumns.map((column) => {
                        const dir = sortState.column === column ? sortState.direction : "none";
                        const ariaSort = dir === "none" ? "none" : dir;
                        return (
                          <th
                            className={mergeClasses(styles.tableCell, styles.tableHeadCell, styles.sortableHeader)}
                            key={column}
                            scope="col"
                            aria-sort={ariaSort}
                            onClick={() => handleSort(column)}
                          >
                            <span className={styles.sortHeaderContent}>
                              {COLUMN_LABELS[column]}
                              {dir === "ascending" && <span className={styles.sortArrow} aria-hidden="true">▲</span>}
                              {dir === "descending" && <span className={styles.sortArrow} aria-hidden="true">▼</span>}
                            </span>
                          </th>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {activeColumns.map((column) => {
                        const dir = sortState.column === column ? sortState.direction : "none";
                        const ariaSort = dir === "none" ? "none" : dir;
                        return (
                          <th
                            className={mergeClasses(styles.tableCell, styles.tableHeadCell, styles.sortableHeader)}
                            key={column}
                            scope="col"
                            aria-sort={ariaSort}
                            onClick={() => handleSort(column)}
                          >
                            <span className={styles.sortHeaderContent}>
                              {COLUMN_LABELS[column]}
                              {dir === "ascending" && <span className={styles.sortArrow} aria-hidden="true">▲</span>}
                              {dir === "descending" && <span className={styles.sortArrow} aria-hidden="true">▼</span>}
                            </span>
                          </th>
                        );
                      })}
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {sortedItems.map((item) => (
                  <tr key={`${item.id}-table`}>
                    {editMode && isEditableArea ? (
                      <>
                        <td className={styles.tableCell} key={`${item.id}-delete`}>
                          <Button
                            icon={<Dismiss24Regular />}
                            appearance="subtle"
                            size="small"
                            aria-label="Delete row"
                            onClick={() => deleteRow(item.id)}
                          />
                        </td>
                        {activeColumns.map((column) => renderTableCell(item, column, updateRow, styles, mergeClasses))}
                      </>
                    ) : (
                      <>
                        {activeColumns.map((column) => renderTableCell(item, column, updateRow, styles, mergeClasses))}
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </section>
      </>
        )}
    </section>
  </main>
  );
}
