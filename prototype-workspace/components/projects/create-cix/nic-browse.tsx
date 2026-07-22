"use client"

import { useState } from "react"
import {
  makeStyles,
  tokens as fluentTokens,
  Text,
  Button,
  MenuButton,
  Input,
  Checkbox,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
} from "@fluentui/react-components"
import {
  Search20Regular,
  Filter20Regular,
  Add20Regular,
  ArrowSync20Regular,
  ArrowDownload20Regular,
  Code20Regular,
  Tag20Regular,
  Delete20Regular,

  Dismiss12Regular,
  Dismiss16Regular,
  ChevronRight12Regular,
  ChevronDown12Regular,
  ChevronLeft20Filled,
  ChevronRight20Filled,
  MoreHorizontal16Regular,
  PersonFeedback16Regular,
  Sparkle20Filled,
  Settings20Regular,
  Pin20Regular,
  Star20Regular,
  MoreHorizontal20Regular,
  PanelLeftContract20Regular,
  Dismiss20Regular,
} from "@fluentui/react-icons"
import { AzureHeaderBuildMVP } from "../../shared/azure-header-buildmvp"

type SafeTokens = { [key: string]: any }
const tokens: SafeTokens = fluentTokens

// ── Mock data matching Figma design ──────────────────────────────────────────

interface NicResource {
  name: string
  kind: string
  virtualNetwork: string
  primaryPrivateIp: string
  attachedTo: string
  resourceGroup: string
  location: string
  subscription: string
}

const mockNicData: NicResource[] = [
  { name: "2012-r2383", kind: "Regular", virtualNetwork: "virtualmachine-vnet", primaryPrivateIp: "10.0.1.4", attachedTo: "2012-R2-nsg", resourceGroup: "virtualmachine", location: "East US", subscription: "NPMD Internal Azu..." },
  { name: "23martestvm252_z1", kind: "Regular", virtualNetwork: "SanthoshRGvnet452", primaryPrivateIp: "10.41.0.5", attachedTo: "", resourceGroup: "SanthoshRG", location: "eastus2euap", subscription: "NPMD Internal Azu..." },
  { name: "acttest1124_z2", kind: "Regular", virtualNetwork: "mathi-msrc-test-lin...", primaryPrivateIp: "10.2.0.11", attachedTo: "ACTTest1", resourceGroup: "mathi-test-rg", location: "centraluseaup", subscription: "NPMD Internal Azu..." },
  { name: "acttest2701_z2", kind: "Regular", virtualNetwork: "mathi-msrc-test-lin...", primaryPrivateIp: "10.2.0.12", attachedTo: "", resourceGroup: "mathi-test-rg", location: "centraluseaup", subscription: "NPMD Internal Azu..." },
  { name: "aditi-test-win771", kind: "Regular", virtualNetwork: "vnet-northcentralus...", primaryPrivateIp: "172.16.0.4", attachedTo: "aditi-test-win", resourceGroup: "aditi-rg-test", location: "North Central US", subscription: "NPMD Internal Azu..." },
  { name: "aditi-vm-dst372_z1", kind: "Regular", virtualNetwork: "aditi-vnet-dst", primaryPrivateIp: "100.101.0.4", attachedTo: "aditi-vm-dst", resourceGroup: "aditi-rg-westus2", location: "West US 2", subscription: "NPMD Internal Azu..." },
  { name: "aditi-vm-src363_z1", kind: "Regular", virtualNetwork: "aditi-vnet-src", primaryPrivateIp: "100.100.0.4", attachedTo: "aditi-vm-src", resourceGroup: "aditi-rg-westus2", location: "West US 2", subscription: "NPMD Internal Azu..." },
  { name: "aditi-vm1248_z1", kind: "Regular", virtualNetwork: "aditi-VM1-vnet", primaryPrivateIp: "10.5.0.4", attachedTo: "aditi-VM1", resourceGroup: "aditi-rg", location: "West US 2", subscription: "NPMD Internal Azu..." },
  { name: "aditi-vm227_z1", kind: "Regular", virtualNetwork: "aditi-VM1-vnet", primaryPrivateIp: "10.5.0.5", attachedTo: "", resourceGroup: "aditi-rg", location: "West US 2", subscription: "NPMD Internal Azu..." },
  { name: "aditilinux64433_z2", kind: "Regular", virtualNetwork: "pcapvm-vnet", primaryPrivateIp: "172.20.0.5", attachedTo: "aditilinux64", resourceGroup: "aditi-rg", location: "centraluseaup", subscription: "NPMD Internal Azu..." },
  { name: "aditivmlinux913_z2", kind: "Regular", virtualNetwork: "pcapvm-vnet", primaryPrivateIp: "172.20.0.6", attachedTo: "aditiVmLinux", resourceGroup: "aditi-rg", location: "centraluseaup", subscription: "NPMD Internal Azu..." },
  { name: "agentreleasevm-rhel8417", kind: "Regular", virtualNetwork: "vnet-eastus2euap-37", primaryPrivateIp: "172.16.0.4", attachedTo: "AgentReleaseVM-R", resourceGroup: "spanchaIRG_eastCa...", location: "eastus2euap", subscription: "NPMD Internal Azu..." },
  { name: "agentreleasevm-win22826", kind: "Regular", virtualNetwork: "vnet-eastus2euap-36", primaryPrivateIp: "172.16.0.4", attachedTo: "AgentReleaseVM-W", resourceGroup: "spanchaIRG_eastCa...", location: "eastus2euap", subscription: "NPMD Internal Azu..." },
  { name: "agentreleasevm-win22995", kind: "Regular", virtualNetwork: "vnet-eastus2euap-35", primaryPrivateIp: "172.16.0.4", attachedTo: "AgentReleaseVM-W", resourceGroup: "spanchaIRG_eastCa...", location: "eastus2euap", subscription: "NPMD Internal Azu..." },
  { name: "agentreleasevm604", kind: "Regular", virtualNetwork: "vnet-eastus2euap-34", primaryPrivateIp: "172.16.0.4", attachedTo: "AgentReleaseVM", resourceGroup: "spanchaIRG_eastCa...", location: "eastus2euap", subscription: "NPMD Internal Azu..." },
  { name: "aj1775_z1", kind: "Regular", virtualNetwork: "m1-vnet", primaryPrivateIp: "10.11.0.8", attachedTo: "AJ1", resourceGroup: "t-amkapoor", location: "eastus2euap", subscription: "NPMD Internal Azu..." },
  { name: "aj2472_z1", kind: "Regular", virtualNetwork: "m1-vnet", primaryPrivateIp: "10.11.0.9", attachedTo: "Aj2", resourceGroup: "t-amkapoor", location: "eastus2euap", subscription: "NPMD Internal Azu..." },
  { name: "aj3653_z1", kind: "Regular", virtualNetwork: "m3-vnet", primaryPrivateIp: "10.0.0.5", attachedTo: "AJ3", resourceGroup: "t-amkapoor", location: "eastus2euap", subscription: "NPMD Internal Azu..." },
]

// Left nav items matching Figma blade sidebar
const navItems: NavItem[] = [
  { label: "Overview", indent: 0, isCategory: false },
  { label: "Virtual network", indent: 0, isCategory: true, expanded: true },
  { label: "Virtual Network overview", indent: 1, isCategory: false },
  { label: "Virtual networks", indent: 1, isCategory: false },
  { label: "NAT gateways", indent: 1, isCategory: false },
  { label: "Public IP addresses", indent: 1, isCategory: false },
  { label: "Network interfaces", indent: 1, isCategory: false, active: true },
  { label: "Network security groups", indent: 1, isCategory: false },
  { label: "Application security groups", indent: 1, isCategory: false },
  { label: "Bastions", indent: 1, isCategory: false },
  { label: "Route tables", indent: 1, isCategory: false },
  { label: "Route servers", indent: 1, isCategory: false },
  { label: "Private Link", indent: 0, isCategory: true, expanded: false },
  { label: "DNS", indent: 0, isCategory: false },
  { label: "Related services", indent: 0, isCategory: true, expanded: false },
  { label: "Monitoring and management", indent: 0, isCategory: true, expanded: false },
]

interface NavItem {
  label: string
  indent: number
  isCategory: boolean
  expanded?: boolean
  active?: boolean
}

// ── Styles ───────────────────────────────────────────────────────────────────

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  // Breadcrumb (28px height)
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    padding: `0 ${tokens.spacingHorizontalL}`,
    height: "28px",
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  breadcrumbLink: {
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    padding: "0",
    fontSize: tokens.fontSizeBase200,
    ":hover": {
      textDecoration: "underline",
    },
  },
  breadcrumbSeparator: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase100,
  },
  // Title area (blade header 64px)
  titleArea: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `0 ${tokens.spacingHorizontalL}`,
    height: "64px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  titleIcon: {
    width: "28px",
    height: "28px",
    flexShrink: 0,
  },
  titleTextGroup: {
    display: "flex",
    flexDirection: "column",
  },
  titleText: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightBase400,
  },
  subtitleText: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase200,
  },
  titleActions: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    marginLeft: tokens.spacingHorizontalS,
  },
  titleActionButton: {
    color: tokens.colorNeutralForeground3,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    padding: tokens.spacingHorizontalXXS,
    display: "flex",
    alignItems: "center",
    borderRadius: tokens.borderRadiusSmall,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1,
    },
  },
  closeButton: {
    marginLeft: "auto",
    color: tokens.colorNeutralForeground3,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    padding: tokens.spacingHorizontalXS,
    display: "flex",
    alignItems: "center",
    borderRadius: tokens.borderRadiusSmall,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1,
    },
  },
  // Copilot suggestions bar
  copilotBar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    padding: `0 ${tokens.spacingHorizontalL}`,
    height: "40px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  copilotIcon: {
    color: "#0078D4",
    flexShrink: 0,
  },
  copilotSuggestion: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    padding: `${tokens.spacingVerticalXXS} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  // Main content area with sidebar
  contentArea: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
  // Left sidebar nav (264px per Figma)
  sidebar: {
    width: "264px",
    minWidth: "264px",
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
  },
  sidebarSearchRow: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  sidebarSearchInput: {
    flex: 1,
    minWidth: "0",
  },
  collapseButton: {
    flexShrink: 0,
    color: tokens.colorNeutralForeground3,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    padding: tokens.spacingHorizontalXXS,
    display: "flex",
    alignItems: "center",
    borderRadius: tokens.borderRadiusSmall,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1,
    },
  },
  navList: {
    flex: 1,
    overflowY: "auto",
    padding: `${tokens.spacingVerticalXS} 0`,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    textAlign: "left",
    lineHeight: tokens.lineHeightBase200,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  navItemActive: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    border: "none",
    backgroundColor: tokens.colorNeutralBackground1Selected,
    width: "100%",
    textAlign: "left",
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase200,
    borderLeft: `2px solid #0078D4`,
  },
  navCategory: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    textAlign: "left",
    lineHeight: tokens.lineHeightBase200,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  navItemChild: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    paddingLeft: tokens.spacingHorizontalXXXL,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    width: "100%",
    textAlign: "left",
    lineHeight: tokens.lineHeightBase200,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  navItemChildActive: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    paddingLeft: tokens.spacingHorizontalXXXL,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    border: "none",
    backgroundColor: tokens.colorNeutralBackground1Selected,
    width: "100%",
    textAlign: "left",
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase200,
    borderLeft: `2px solid #0078D4`,
  },
  navChevron: {
    flexShrink: 0,
    color: tokens.colorNeutralForeground3,
  },
  // Main panel
  mainPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  // Toolbar — matches Figma 3897:79559
  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: "0",
    paddingTop: tokens.spacingVerticalXS,
    paddingBottom: tokens.spacingVerticalXS,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
  },
  toolbarSeparator: {
    width: "1px",
    height: "20px",
    backgroundColor: tokens.colorNeutralStroke2,
    margin: `0 ${tokens.spacingHorizontalXXS}`,
  },
  // Filter bar (32px height, 20px gap from toolbar)
  filterBar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: `0 ${tokens.spacingHorizontalXL}`,
    height: "32px",
    marginTop: tokens.spacingVerticalXL,
    flexWrap: "wrap",
  },
  filterInput: {
    minWidth: "274px",
    maxWidth: "274px",
  },
  filterPillGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
  },
  filterPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    height: "24px",
    maxHeight: "24px",
    paddingLeft: tokens.spacingHorizontalSNudge,
    paddingRight: tokens.spacingHorizontalSNudge,
    paddingTop: "0",
    paddingBottom: "0",
    backgroundColor: tokens.colorBrandBackground2,
    border: `1px solid transparent`,
    borderRadius: tokens.borderRadiusCircular,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    lineHeight: tokens.lineHeightBase200,
    whiteSpace: "nowrap",
  },
  filterPillBold: {
    fontWeight: tokens.fontWeightSemibold,
  },
  filterPillDismiss: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    padding: "0",
    color: tokens.colorNeutralForeground2,
    ":hover": {
      opacity: "0.7",
    },
  },
  addFilter: {
    display: "inline-flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXXS,
    height: "24px",
    maxHeight: "24px",
    paddingLeft: tokens.spacingHorizontalSNudge,
    paddingRight: tokens.spacingHorizontalSNudge,
    paddingTop: "0",
    paddingBottom: "0",
    backgroundColor: tokens.colorBrandBackground2,
    border: `1px solid transparent`,
    borderRadius: tokens.borderRadiusCircular,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    lineHeight: tokens.lineHeightBase200,
    whiteSpace: "nowrap",
    ":hover": {
      opacity: "0.8",
    },
  },
  // Data grid (20px gap from filter bar, 20px side padding)
  tableContainer: {
    flex: 1,
    overflowY: "auto",
    overflowX: "auto",
    marginTop: tokens.spacingVerticalXL,
    padding: `0 ${tokens.spacingHorizontalXL}`,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: tokens.fontSizeBase200,
  },
  tableHeader: {
    position: "sticky",
    top: "0",
    backgroundColor: tokens.colorNeutralBackground1,
    zIndex: 1,
  },
  th: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    textAlign: "left",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    whiteSpace: "nowrap",
    height: "36px",
  },
  thSortable: {
    cursor: "pointer",
    userSelect: "none",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  sortIndicator: {
    marginLeft: tokens.spacingHorizontalXXS,
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase100,
  },
  td: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "180px",
    lineHeight: tokens.lineHeightBase300,
    height: "38px",
  },
  tdLink: {
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorBrandForeground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "180px",
    lineHeight: tokens.lineHeightBase300,
    height: "38px",
    cursor: "pointer",
  },
  resourceName: {
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
    ":hover": {
      textDecoration: "underline",
    },
  },
  moreButton: {
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    color: tokens.colorNeutralForeground3,
    padding: tokens.spacingHorizontalXXS,
    display: "flex",
    alignItems: "center",
    borderRadius: tokens.borderRadiusSmall,
    ":hover": {
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  tableRow: {
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  checkboxCell: {
    width: "28px",
    padding: `2px ${tokens.spacingHorizontalXS}`,
  },
  moreCell: {
    width: "28px",
    padding: `2px ${tokens.spacingHorizontalXXS}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  // Pagination / Footer bar (matches Figma node 3897:79568)
  pagination: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap" as const,
    padding: `${tokens.spacingVerticalL} ${tokens.spacingHorizontalXL}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
    backgroundColor: tokens.colorNeutralBackground1,
    gap: tokens.spacingHorizontalS,
  },
  paginationControls: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalSNudge,
  },
  pageButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "33px",
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalXS,
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorBrandForegroundLink,
    borderRadius: tokens.borderRadiusSmall,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  pageButtonActive: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "33px",
    paddingLeft: tokens.spacingHorizontalS,
    paddingRight: tokens.spacingHorizontalS,
    paddingTop: tokens.spacingVerticalXS,
    border: "none",
    backgroundColor: "transparent",
    cursor: "default",
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase300,
    color: tokens.colorNeutralForeground1,
    borderRadius: tokens.borderRadiusSmall,
  },
  chevronButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacingHorizontalSNudge,
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    borderRadius: tokens.borderRadiusSmall,
    color: tokens.colorNeutralForeground2,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  chevronButtonDisabled: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacingHorizontalSNudge,
    border: "none",
    backgroundColor: "transparent",
    cursor: "default",
    borderRadius: tokens.borderRadiusSmall,
    color: tokens.colorNeutralForegroundDisabled,
  },
  paginationSpacer: {
    flex: "1 0 0",
    minWidth: "1px",
  },
  feedbackSection: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  feedbackIcon: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground2,
  },
  // Footer bar
  footer: {
    display: "flex",
    alignItems: "center",
    padding: `0 ${tokens.spacingHorizontalL}`,
    height: "28px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  footerText: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase100,
  },
  feedbackLink: {
    border: "none",
    backgroundColor: "transparent",
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
    color: "#0078D4",
    cursor: "pointer",
    padding: "0",
    ":hover": {
      textDecoration: "underline",
    },
  },
})

// ── Component ────────────────────────────────────────────────────────────────

export interface NicBrowseProps {
  isDarkMode?: boolean
  onGoHome?: () => void
  onCreateNic?: () => void
}

/** Network Interfaces resource browse page matching the Azure portal blade layout with left nav, toolbar, filters, and data grid. */
export default function NicBrowse({ isDarkMode = false, onGoHome, onCreateNic }: NicBrowseProps) {
  const styles = useStyles()
  const [filterValue, setFilterValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const totalItems = 1116
  const itemsPerPage = 18

  const handleSuggestionSelect = (suggestion: string) => {
    // Already on browse page
  }

  return (
    <div className={styles.root}>
      {/* Azure Header */}
      <AzureHeaderBuildMVP isDarkMode={isDarkMode} activeLink="" onSuggestionSelect={handleSuggestionSelect} />

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <button className={styles.breadcrumbLink} onClick={onGoHome}>
          Home
        </button>
        <span className={styles.breadcrumbSeparator}>&rsaquo;</span>
        <Text size={200}>Network foundation</Text>
      </div>

      {/* Title area (blade header 64px) */}
      <div className={styles.titleArea}>
        <img
          src="/azure-service-icons/networking/10061-icon-service-Virtual-Networks.svg"
          alt=""
          className={styles.titleIcon}
        />
        <div className={styles.titleTextGroup}>
          <Text className={styles.titleText}>Network foundation | Network interfaces</Text>
          <Text className={styles.subtitleText}>Preview</Text>
        </div>
        <div className={styles.titleActions}>
          <button className={styles.titleActionButton} aria-label="Pin">
            <Pin20Regular />
          </button>
          <button className={styles.titleActionButton} aria-label="Favorite">
            <Star20Regular />
          </button>
          <button className={styles.titleActionButton} aria-label="More actions">
            <MoreHorizontal20Regular />
          </button>
        </div>
        <button className={styles.closeButton} onClick={onGoHome} aria-label="Close">
          <Dismiss20Regular />
        </button>
      </div>

      {/* Copilot suggestion bar */}
      <div className={styles.copilotBar}>
        <Sparkle20Filled className={styles.copilotIcon} />
        <button className={styles.copilotSuggestion}>
          Find network interfaces with connectivity issues
        </button>
        <button className={styles.copilotSuggestion}>
          Check NICs for misconfigurations
        </button>
      </div>

      {/* Content area with sidebar + main */}
      <div className={styles.contentArea}>
        {/* Left sidebar nav */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarSearchRow}>
            <Input
              className={styles.sidebarSearchInput}
              placeholder="Search"
              size="small"
              contentBefore={<Search20Regular />}
            />
            <button className={styles.collapseButton} aria-label="Collapse sidebar">
              <PanelLeftContract20Regular />
            </button>
          </div>
          <div className={styles.navList}>
            {navItems.map((item, idx) => {
              if (item.isCategory) {
                return (
                  <button key={idx} className={styles.navCategory}>
                    {item.expanded ? (
                      <ChevronDown12Regular className={styles.navChevron} />
                    ) : (
                      <ChevronRight12Regular className={styles.navChevron} />
                    )}
                    {item.label}
                  </button>
                )
              }
              if (item.indent === 1) {
                return (
                  <button
                    key={idx}
                    className={item.active ? styles.navItemChildActive : styles.navItemChild}
                  >
                    {item.label}
                  </button>
                )
              }
              return (
                <button
                  key={idx}
                  className={item.active ? styles.navItemActive : styles.navItem}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Main panel */}
        <div className={styles.mainPanel}>
          {/* Toolbar — matches Figma 3897:79559 */}
          <div className={styles.toolbar}>
            <Button appearance="subtle" icon={<Add20Regular />} onClick={onCreateNic}>
              Create
            </Button>
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <MenuButton appearance="subtle" icon={<Settings20Regular />}>
                  Manage view
                </MenuButton>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>Default view</MenuItem>
                  <MenuItem>Custom view</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
            <Button appearance="subtle" icon={<ArrowSync20Regular />}>
              Refresh
            </Button>
            <Button appearance="subtle" icon={<ArrowDownload20Regular />}>
              Export to CSV
            </Button>
            <Button appearance="subtle" icon={<Code20Regular />}>
              Open query
            </Button>
            <div className={styles.toolbarSeparator} />
            <Button appearance="subtle" icon={<Tag20Regular />} disabled>
              Assign tags
            </Button>
            <Button appearance="subtle" icon={<Delete20Regular />} disabled>
              Delete
            </Button>
          </div>

          {/* Filter bar */}
          <div className={styles.filterBar}>
            <Input
              className={styles.filterInput}
              placeholder="Filter for any field..."
              size="small"
              contentBefore={<Filter20Regular />}
              value={filterValue}
              onChange={(_, data) => setFilterValue(data.value)}
            />
            <div className={styles.filterPillGroup}>
              <span className={styles.filterPill}>
                Subscription : <span className={styles.filterPillBold}>all</span>
              </span>
              <span className={styles.filterPill}>
                Type equals <span className={styles.filterPillBold}>all</span>
                <button className={styles.filterPillDismiss}><Dismiss16Regular /></button>
              </span>
              <span className={styles.filterPill}>
                Resource group equals <span className={styles.filterPillBold}>all</span>
                <button className={styles.filterPillDismiss}><Dismiss16Regular /></button>
              </span>
              <span className={styles.filterPill}>
                Location equals <span className={styles.filterPillBold}>all</span>
                <button className={styles.filterPillDismiss}><Dismiss16Regular /></button>
              </span>
              <button className={styles.addFilter}>Add filter</button>
            </div>
          </div>

          {/* Data grid */}
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.checkboxCell}>
                    <Checkbox size="medium" />
                  </th>
                  <th className={`${styles.th} ${styles.thSortable}`}>
                    Name<span className={styles.sortIndicator}>↑</span>
                  </th>
                  <th className={styles.moreCell}></th>
                  <th className={styles.th}>
                    Kind
                  </th>
                  <th className={styles.th}>
                    Virtual network
                  </th>
                  <th className={styles.th}>
                    Primary private IP
                  </th>
                  <th className={styles.th}>
                    Attached to
                  </th>
                  <th className={`${styles.th} ${styles.thSortable}`}>
                    Resource Group<span className={styles.sortIndicator}>↑↓</span>
                  </th>
                  <th className={`${styles.th} ${styles.thSortable}`}>
                    Location<span className={styles.sortIndicator}>↑↓</span>
                  </th>
                  <th className={`${styles.th} ${styles.thSortable}`}>
                    Subscription<span className={styles.sortIndicator}>↑↓</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockNicData.map((nic, idx) => (
                  <tr key={idx} className={styles.tableRow}>
                    <td className={styles.checkboxCell}>
                      <Checkbox size="medium" />
                    </td>
                    <td className={styles.tdLink}>
                      <span className={styles.resourceName}>{nic.name}</span>
                    </td>
                    <td className={styles.moreCell}>
                      <button className={styles.moreButton}>
                        <MoreHorizontal16Regular />
                      </button>
                    </td>
                    <td className={styles.td}>{nic.kind}</td>
                    <td className={styles.td}>{nic.virtualNetwork}</td>
                    <td className={styles.td}>{nic.primaryPrivateIp}</td>
                    <td className={styles.tdLink}>{nic.attachedTo || ""}</td>
                    <td className={styles.tdLink}>{nic.resourceGroup}</td>
                    <td className={styles.td}>{nic.location}</td>
                    <td className={styles.tdLink}>{nic.subscription}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Bar (Figma 3897:79568) */}
          <div className={styles.pagination}>
            <div className={styles.paginationControls}>
              <button className={styles.chevronButtonDisabled}>
                <ChevronLeft20Filled />
              </button>
              <button className={styles.pageButtonActive}>1</button>
              <button className={styles.pageButton}>2</button>
              <button className={styles.pageButton}>3</button>
              <button className={styles.pageButton}>4</button>
              <button className={styles.pageButton}>5</button>
              <button className={styles.chevronButton}>
                <ChevronRight20Filled />
              </button>
            </div>
            <div className={styles.paginationSpacer} />
            <div className={styles.feedbackSection}>
              <PersonFeedback16Regular className={styles.feedbackIcon} />
              <button className={styles.feedbackLink}>Give feedback</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <Text size={100} className={styles.footerText}>Add or remove favorites by pressing Cmd+Shift+F</Text>
      </div>
    </div>
  )
}
