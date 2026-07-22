"use client";

import {
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Text,
  Input,
  ToggleButton,
} from "@fluentui/react-components";


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { Search24Regular } from "@fluentui/react-icons";

// ---------------------------------------------------------------------------
// Styles — lightweight bar, no heavy glass panel
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  bar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  searchInput: {
    minWidth: "200px",
    maxWidth: "280px",
  },
  toggleGroup: {
    display: "flex",
    gap: tokens.spacingHorizontalXS,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    padding: tokens.spacingHorizontalXXS,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  toggleActive: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
  countText: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground4,
    whiteSpace: "nowrap",
    marginLeft: "auto",
  },
});

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const organizeOptions = [
  { value: "", label: "All" },
  { value: "team", label: "Team" },
  { value: "area", label: "Experience Area" },
  { value: "horizon", label: "Timeframe" },
  { value: "owner", label: "Owner" },
  { value: "status", label: "Status" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export interface FilterBarProps {
  organizeBy: string | null;
  onOrganizeByChange: (organizeBy: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  projectCount: number;
  totalCount: number;
}

/** Filter and grouping toolbar with search input and group-by toggle buttons.
 * Cross-project reusable: can be imported by any project. */
export default function FilterBar({
  organizeBy,
  onOrganizeByChange,
  searchQuery,
  onSearchChange,
  projectCount,
  totalCount,
}: FilterBarProps) {
  const styles = useStyles();

  return (
    <div className={styles.bar}>
      <Input
        className={styles.searchInput}
        contentBefore={<Search24Regular />}
        placeholder="Search projects…"
        value={searchQuery}
        onChange={(_e, data) => onSearchChange(data.value)}
        size="medium"
      />

      <div className={styles.toggleGroup}>
        {organizeOptions.map((opt) => {
          const isActive = (organizeBy ?? "") === opt.value;
          return (
            <ToggleButton
              key={opt.value}
              size="small"
              appearance="subtle"
              checked={isActive}
              className={isActive ? styles.toggleActive : undefined}
              onClick={() =>
                onOrganizeByChange(opt.value === "" ? null : opt.value)
              }
            >
              {opt.label}
            </ToggleButton>
          );
        })}
      </div>

      <Text className={styles.countText}>
        {projectCount === totalCount
          ? `${totalCount} projects`
          : `${projectCount} of ${totalCount}`}
      </Text>
    </div>
  );
}
