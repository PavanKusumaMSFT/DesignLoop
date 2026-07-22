"use client";
import {
  makeStyles,
  tokens as fluentTokens,
  mergeClasses,
  FluentProvider,
  Button as FluentButton,
  Text,
  webLightTheme,
} from "@fluentui/react-components";
import {
  Search24Regular,
  ChevronLeft24Regular,
  ChevronDown16Regular,
  Document24Regular,
  Cube24Regular,
  Database24Regular,
  Layer24Regular,
  Globe24Regular,
  Person24Regular,
  Building24Regular,
  ShoppingBag24Regular,
  Heart24Regular,
  Open24Regular,
} from "@fluentui/react-icons";
import { AzureHeaderP1 } from "./azure-header-p1";
import { CopilotSVGIcon } from "./copilot-svg-icon";
import { useState, useRef, useEffect } from "react";
import { useNavigation } from "../../lib/navigation-context";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
    padding: "0 32px",
  },
  contentWrapper: {
    display: "flex",
    gap: "24px",
    marginTop: "16px",
  },
  leftPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  rightPanel: {
    width: "360px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  searchHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "16px",
    padding: "0 8px",
  },
  backButton: {
    minWidth: "32px",
    height: "32px",
    borderRadius: "4px",
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "24px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    padding: "8px 8px 8px 16px",
    flex: 1,
    height: "48px",
  },
  searchIcon: {
    width: "20px",
    height: "20px",
    color: tokens.colorNeutralForeground3,
    margin: "0 8px",
  },
  searchInput: {
    flex: 1,
    padding: "8px 16px",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    color: tokens.colorNeutralForeground1,
    fontSize: "16px",
  },
  copilotButton: {
    borderRadius: "24px",
    marginLeft: "-4px",
    background: `linear-gradient(${tokens.colorNeutralBackground1}, ${tokens.colorNeutralBackground1}) padding-box, linear-gradient(90deg, #FF32EE, #548AFF, #3FC150) border-box`,
    border: "1px solid transparent",
    position: "relative",
  },
  navTabs: {
    display: "flex",
    gap: "24px",
  },
  navTab: {
    padding: "8px 0",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    borderBottom: "2px solid transparent",
    position: "relative",
    "&:hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  navTabActive: {
    borderBottomColor: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  copilotOverview: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "24px",
    marginBottom: "24px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    maxWidth: "66.666%", // 2/3 width of action cards
    position: "relative",
  },
  copilotHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
  },
  copilotDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.5",
    marginBottom: "12px",
  },
  copilotSectionHeader: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginTop: "16px",
    marginBottom: "8px",
  },
  copilotTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  seeMoreButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "6px 12px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    backgroundColor: "transparent",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "4px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginTop: "24px",
    marginBottom: "16px",
    display: "block",
  },
  actionCards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "32px",
  },
  actionCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow4,
    },
  },
  cardIcon: {
    width: "24px",
    height: "24px",
    color: tokens.colorBrandForeground1,
    marginBottom: "12px",
  },
  cardTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
    lineHeight: "1.3",
  },
  cardDescription: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.4",
    marginBottom: "12px",
  },
  cardButton: {
    padding: "6px 12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: tokens.fontWeightMedium,
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    "&:hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
  resourcesTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "32px",
  },
  tableHeader: {
    textAlign: "left",
    padding: "12px 0",
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tableCell: {
    padding: "12px 0",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  resourceName: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  documentationCards: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "32px",
  },
  documentationCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow4,
    },
  },
  docCardTitle: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
    lineHeight: "1.3",
  },
  docCardDescription: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.4",
    marginBottom: "12px",
  },
  docCardButton: {
    padding: "6px 12px",
    borderRadius: "4px",
    border: `1px solid ${tokens.colorBrandStroke1}`,
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: tokens.fontWeightMedium,
    backgroundColor: "transparent",
    color: tokens.colorBrandForeground1,
    display: "flex",
    alignItems: "center",
    gap: "4px",
    "&:hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
  relatedSearches: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "20px",
  },
  relatedSearchTitle: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
    display: "block",
  },
  relatedSearchItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "6px",
    marginBottom: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    "&:last-child": {
      marginBottom: "0",
    },
  },
  viewAllLink: {
    color: tokens.colorBrandForeground1,
    fontSize: "14px",
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  stickyTabBar: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    paddingTop: "16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    margin: "0 -32px",
    paddingLeft: "32px",
    paddingRight: "32px",
    position: "sticky",
    backgroundColor: tokens.colorNeutralBackground2,
    zIndex: 10,
  },
  backButtonCompact: {
    minWidth: "32px",
    padding: "8px",
  },
  tabItemFlex: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  copilotContentWrapper: {
    position: "relative",
    overflow: "hidden",
  },
  copilotList: {
    marginLeft: "20px",
    color: tokens.colorNeutralForeground2,
  },
  copilotListItem: {
    marginBottom: "8px",
  },
  copilotListItemSecondary: {
    marginBottom: "8px",
    color: tokens.colorNeutralForeground3,
  },
  fadeOverlay: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    height: "80px",
    background: `linear-gradient(180deg, transparent 0%, ${tokens.colorNeutralBackground1} 100%)`,
    pointerEvents: "none",
  },
  diveDeeperWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "24px",
  },
  diveDeeperButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    border: "1px solid transparent",
    borderRadius: "4px",
    background: `linear-gradient(${tokens.colorNeutralBackground1}, ${tokens.colorNeutralBackground1}) padding-box, linear-gradient(90deg, #0078D4, #8B5CF6) border-box`,
    color: tokens.colorNeutralForeground1,
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: 500,
  },
  copilotDivider: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: "16px",
    marginBottom: "16px",
  },
  seeMoreWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  seeMoreButtonFlex: {
    display: "flex",
  },
  chevronRotated: {
    fontSize: "12px",
    transform: "rotate(180deg)",
  },
  chevronSmall: {
    fontSize: "12px",
  },
  sectionTitleSmallTop: {
    marginTop: "8px",
  },
  tableCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    padding: "16px",
  },
  fullWidthTable: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHeadRow: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tableHeaderCellWide: {
    textAlign: "left",
    padding: "12px 8px",
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    width: "300px",
  },
  tableHeaderCellDefault: {
    textAlign: "left",
    padding: "12px 8px",
    fontSize: "12px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
  },
  tableCellWide: {
    padding: "12px 8px",
    width: "300px",
  },
  serviceNameRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap",
  },
  brandLink: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
  },
  descriptionCell: {
    padding: "12px 8px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },
  viewAllWrapper: {
    marginTop: "16px",
  },
  viewAllLinkClickable: {
    cursor: "pointer",
  },
  tableCellBrand: {
    color: tokens.colorBrandForeground1,
  },
  tableCellPadded: {
    padding: "12px 8px",
  },
  flexRowGap8: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  brandLinkCell: {
    padding: "12px 8px",
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
    cursor: "pointer",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  cardHeaderRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    marginBottom: "12px",
  },
  avatarCircle: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: tokens.colorBrandBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForegroundInverted,
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    flexShrink: 0,
  },
  personIconLarge: {
    fontSize: "32px",
    color: tokens.colorBrandForeground1,
    flexShrink: 0,
  },
  flex1: {
    flex: 1,
  },
  titleMarginSmall: {
    marginBottom: "4px",
  },
  descriptionGrow: {
    marginBottom: "16px",
    flex: 1,
  },
  alignSelfStart: {
    alignSelf: "flex-start",
  },
  viewAllCentered: {
    textAlign: "center",
    marginTop: "16px",
  },
  marketplaceCardLayout: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  flexShrink0: {
    flexShrink: 0,
  },
  docTitleFlex: {
    flex: 1,
    marginBottom: "0",
  },
  heartIcon: {
    fontSize: "20px",
    color: tokens.colorNeutralForeground3,
    cursor: "pointer",
    flexShrink: 0,
  },
  marginBottom12: {
    marginBottom: "12px",
  },
  bottomSpacer: {
    height: "400px",
  },
  searchIconSmall: {
    width: "20px",
    height: "20px",
    color: tokens.colorNeutralForeground3,
    flexShrink: 0,
  },
  containerAutoHeight: {
    minHeight: "auto",
  },
  stickyTabBarAtZero: {
    top: "0",
  },
  stickyTabBarAt48: {
    top: "48px",
  },
  copilotExpanded: {
    maxHeight: "none",
  },
  copilotCollapsed: {
    maxHeight: "140px",
  },
  imgInvert: {
    filter: "invert(1)",
  },
  imgNoFilter: {
    filter: "none",
  },
  seeMoreTopZero: {
    marginTop: "0",
  },
  seeMoreTop16: {
    marginTop: "16px",
  },
  tableRowBordered: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tableRowNoBorder: {
    borderBottom: "none",
  },
});

interface SearchFullPageResultsProps {
  searchQuery?: string;
  onBackClick?: () => void;
  viewMode?: "list" | "bubbles" | "bubbles-history";
  hideHeader?: boolean;
  vmScenario?: 1 | 2;
  onVmScenarioChange?: (scenario: 1 | 2) => void;
  onCopilotOpen?: () => void;
  isDarkMode?: boolean;
}

export const SearchFullPageResults: React.FC<SearchFullPageResultsProps> = ({
  searchQuery = "VM",
  onBackClick,
  viewMode = "list",
  hideHeader = false,
  vmScenario = 1,
  onVmScenarioChange,
  onCopilotOpen,
  isDarkMode = false,
}) => {
  const styles = useStyles();
  const [activeTab, setActiveTab] = useState("All");
  const [isCopilotExpanded, setIsCopilotExpanded] = useState(false);
  const [isResourcesExpanded, setIsResourcesExpanded] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const { sourcePage, handlePageChange } = useNavigation();

  // Refs for scroll spy
  const copilotRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const resourceGroupsRef = useRef<HTMLDivElement>(null);
  const entraIdRef = useRef<HTMLDivElement>(null);
  const marketplaceRef = useRef<HTMLDivElement>(null);
  const documentationRef = useRef<HTMLDivElement>(null);

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { ref: copilotRef, name: "Copilot" },
        { ref: servicesRef, name: "Azure services" },
        { ref: resourcesRef, name: "Resources" },
        { ref: resourceGroupsRef, name: "Resource groups" },
        { ref: entraIdRef, name: "Microsoft Entra ID" },
        { ref: marketplaceRef, name: "Marketplace" },
        { ref: documentationRef, name: "Documentation" },
      ];

      const scrollPosition = window.scrollY + 200; // Offset for sticky header

      for (const section of sections) {
        if (section.ref.current) {
          const { offsetTop, offsetHeight } = section.ref.current;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveTab(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackClick = () => {
    if (onBackClick) {
      // Use custom back navigation handler (for copilot-search context)
      onBackClick();
    } else {
      // Navigate back to the source page (the page user came from)
      if (sourcePage) {
        handlePageChange(sourcePage);
      } else {
        // Fallback to home-fre if no source page is available
        handlePageChange("home-fre");
      }
    }
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    // Scroll to the corresponding section
    const sectionMap: { [key: string]: React.RefObject<HTMLDivElement> } = {
      Copilot: copilotRef,
      "Azure services": servicesRef,
      Resources: resourcesRef,
      "Resource groups": resourceGroupsRef,
      "Microsoft Entra ID": entraIdRef,
      Marketplace: marketplaceRef,
      Documentation: documentationRef,
    };

    const targetRef = sectionMap[tab];
    if (targetRef?.current) {
      // Get the scrollable container (parent with overflow: auto)
      const scrollContainer = targetRef.current.closest(
        '[style*="overflow"]',
      ) as HTMLElement;
      const container = scrollContainer || window;

      if (scrollContainer) {
        // Scroll within the container with offset
        const containerTop = scrollContainer.getBoundingClientRect().top;
        const elementTop = targetRef.current.getBoundingClientRect().top;
        const offsetPosition =
          scrollContainer.scrollTop + (elementTop - containerTop) - 100;

        scrollContainer.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      } else {
        // Fallback to window scroll
        targetRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (tab === "All") {
      // Scroll to top for "All" tab
      const scrollContainer = document.querySelector(
        '[style*="overflow: auto"]',
      ) as HTMLElement;
      if (scrollContainer) {
        scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const tabs = [
    "All",
    "Copilot",
    "Azure services",
    "Resources",
    "Resource groups",
    "Microsoft Entra ID",
    "Marketplace",
    "Documentation",
  ];

  // Determine if this is an aj1sa search
  const isAj1saSearch = searchQuery?.toLowerCase().includes("aj1sa");

  const servicesData = isAj1saSearch
    ? [
        {
          icon: "/icons/Storage.svg",
          name: "Storage accounts",
          description:
            "Create a storage account to store up to 500TB of data in the cloud. Use a general-purpose storage account to store object data, use a...",
        },
        {
          icon: "/icons/Browser.svg",
          name: "Storage browser",
          description:
            "Simplify and streamline management of Azure Storage resources with an intuitive web interface. Quickly navigate and manage blobs, files...",
        },
        {
          icon: "/icons/Storage-Sync-Services.svg",
          name: "Storage Sync Services",
          description:
            "Storage Sync Services are top-level objects that register servers for use with Azure File Sync and contain the sync group relationships.",
        },
        {
          icon: "/icons/Storage-Hub.svg",
          name: "Storage center",
          description:
            "Azure Edge Hardware Center lets you explore and order a variety of first party Azure hardware helping you build and run hybrid apps a...",
        },
        {
          icon: "/icons/Disks.svg",
          name: "Disks",
          description:
            "Azure managed disks are block-level storage volumes that are managed by Azure and used with Azure virtual machines. Managed...",
        },
        {
          icon: "/icons/Browser.svg",
          name: "Azure AI Video Indexer",
          description: "Establish secure, cross-premises connectivity",
        },
        {
          icon: "/icons/Computer-Vision.svg",
          name: "Anomaly detectors",
          description:
            "Detect anomalies in time series data and identify issues in real-time with AI-powered anomaly detection capabilities",
        },
        {
          icon: "/icons/Bot-Services.svg",
          name: "Bot Services",
          description:
            "Build, connect, deploy, and manage intelligent bots to interact with users across multiple channels and platforms",
        },
        {
          icon: "/icons/Computer-Vision.svg",
          name: "Compute vision",
          description:
            "Extract rich information from images to categorize and process visual data with AI-powered computer vision capabilities",
        },
        {
          icon: "/icons/Browser.svg",
          name: "Content moderators",
          description:
            "Detect potentially offensive or unwanted content with AI-assisted content moderation for text, images, and videos",
        },
      ]
    : [
        {
          icon: "/icons/virtual-machine.svg",
          name: "VM application definitions",
          description:
            "VM application definitions are created within a gallery and carry information about the ...",
        },
        {
          icon: "/icons/Cloud-Services-(Classic).svg",
          name: "VM application versions",
          description:
            "VM application versions can be deployed to virtual machines and virtual machine scale sets...",
        },
        {
          icon: "/icons/VM-Images-(Classic).svg",
          name: "VM image definitions",
          description:
            "VM image definitions are defined within an Azure compute gallery and carry information about...",
        },
        {
          icon: "/icons/VM-Scale-Sets.svg",
          name: "Virtual machine scale sets",
          description:
            "Create a virtual machine scale set to deploy and manage a load balanced set of identical ...",
        },
        {
          icon: "/icons/Cloud-Services-(Classic).svg",
          name: "Compute infrastructure",
          description:
            "Create VMs that scale, optimize cost and performance, and support a mix of sizes, zones,",
        },
      ];

  const suggestedActions = [
    {
      icon: "/icons/virtual-machine.svg",
      title: "Use infrastructure agent for enterprise scaling",
      description:
        "Get AI-powered recommendations for scaling enterprise workloads and infrastructure",
      buttonText: "Open infrastructure agent",
    },
    {
      icon: "/icons/VM-Scale-Sets.svg",
      title: "Use infrastructure agent for enterprise scaling",
      description:
        "Get AI-powered recommendations for scaling enterprise workloads and infrastructure",
      buttonText: "Open infrastructure agent",
    },
    {
      icon: "/icons/Azure-Arc-Servers.svg",
      title: "Use infrastructure agent for enterprise scaling",
      description:
        "Get AI-powered recommendations for scaling enterprise workloads and infrastructure",
      buttonText: "Open infrastructure agent",
    },
  ];

  const resourcesData = isAj1saSearch
    ? [
        {
          name: "aj1sa-0",
          type: "Storage account",
          alerts: 0,
          cost: "$4.09",
          lastViewed: "November 13, 2024",
          icon: (
            <img
              src="/icons/Storage.svg"
              alt="Storage"
              width={20}
              height={20}
            />
          ),
        },
        {
          name: "aj1sa-1",
          type: "Storage account",
          alerts: 0,
          cost: "$1.60",
          lastViewed: "November 13, 2024",
          icon: (
            <img
              src="/icons/Storage.svg"
              alt="Storage"
              width={20}
              height={20}
            />
          ),
        },
        {
          name: "aj1sa-2",
          type: "Storage account",
          alerts: 0,
          cost: "$2.06",
          lastViewed: "November 10, 2024",
          icon: (
            <img
              src="/icons/Storage.svg"
              alt="Storage"
              width={20}
              height={20}
            />
          ),
        },
        {
          name: "aj1sa-3",
          type: "Storage account",
          alerts: 0,
          cost: "$6.54",
          lastViewed: "November 10, 2024",
          icon: (
            <img
              src="/icons/Storage.svg"
              alt="Storage"
              width={20}
              height={20}
            />
          ),
        },
        {
          name: "aj1sa",
          type: "Storage account",
          alerts: 0,
          cost: "$0.54",
          lastViewed: "November 10, 2024",
          icon: (
            <img
              src="/icons/Storage.svg"
              alt="Storage"
              width={20}
              height={20}
            />
          ),
        },
        {
          name: "aj1sa-a",
          type: "Storage account",
          alerts: 0,
          cost: "$0.34",
          lastViewed: "November 10, 2024",
          icon: (
            <img
              src="/icons/Storage.svg"
              alt="Storage"
              width={20}
              height={20}
            />
          ),
        },
        {
          name: "aj1sa-b",
          type: "Storage account",
          alerts: 0,
          cost: "$0.34",
          lastViewed: "November 10, 2024",
          icon: (
            <img
              src="/icons/Storage.svg"
              alt="Storage"
              width={20}
              height={20}
            />
          ),
        },
        {
          name: "aj1sa-c",
          type: "Storage account",
          alerts: 0,
          cost: "$0.34",
          lastViewed: "November 10, 2024",
          icon: (
            <img
              src="/icons/Storage.svg"
              alt="Storage"
              width={20}
              height={20}
            />
          ),
        },
        {
          name: "aj1sa-d",
          type: "Storage account",
          alerts: 0,
          cost: "$0.34",
          lastViewed: "November 10, 2024",
          icon: (
            <img
              src="/icons/Storage.svg"
              alt="Storage"
              width={20}
              height={20}
            />
          ),
        },
        {
          name: "aj1sa-e",
          type: "Storage account",
          alerts: 0,
          cost: "$0.34",
          lastViewed: "November 10, 2024",
          icon: (
            <img
              src="/icons/Storage.svg"
              alt="Storage"
              width={20}
              height={20}
            />
          ),
        },
      ]
    : [
        {
          name: "React Web App with Node.js",
          type: "Virtual machine",
          alerts: 0,
          cost: "$4.99",
          lastViewed: "November 13, 2024",
          icon: (
            <img
              src="/icons/virtual-machine.svg"
              alt="VM"
              width={20}
              height={20}
            />
          ),
        },
        {
          name: "ContosoAds",
          type: "Virtual machine",
          alerts: 0,
          cost: "$3.40",
          lastViewed: "November 13, 2024",
          icon: (
            <img
              src="/icons/virtual-machine.svg"
              alt="VM"
              width={20}
              height={20}
            />
          ),
        },
        {
          name: "Contoso-storage",
          type: "Virtual machine",
          alerts: 0,
          cost: "$0.00",
          lastViewed: "November 11, 2024",
          icon: (
            <img
              src="/icons/virtual-machine.svg"
              alt="VM"
              width={20}
              height={20}
            />
          ),
        },
        {
          name: "Contoso-rg",
          type: "Virtual machine",
          alerts: 0,
          cost: "$6.54",
          lastViewed: "November 10, 2024",
          icon: (
            <img
              src="/icons/virtual-machine.svg"
              alt="VM"
              width={20}
              height={20}
            />
          ),
        },
        {
          name: "Contoso-vm",
          type: "Virtual machine",
          alerts: 0,
          cost: "$0.34",
          lastViewed: "November 10, 2024",
          icon: (
            <img
              src="/icons/virtual-machine.svg"
              alt="VM"
              width={20}
              height={20}
            />
          ),
        },
      ];

  const resourceGroupsData = isAj1saSearch
    ? [
        {
          icon: "/icons/Resource-Groups.svg",
          name: "005b4ac1-08f4-49a9-aa4a-540f29e83168-rg",
          subscription: "Netiso NRMS Microsoft Tenant Admin Management",
          location: "East US",
        },
        {
          icon: "/icons/Resource-Groups.svg",
          name: "00a1a635-1bdb-493b-96de-30fa40aa60c6-rg",
          subscription: "NetworkLocationMicrosoftManagement2",
          location: "West US",
        },
        {
          icon: "/icons/Resource-Groups.svg",
          name: "005b4ac1-08f4-49a9-aa4a-540f29e83168-rg",
          subscription: "NetworkLocationMicrosoftManagement2",
          location: "West US",
        },
        {
          icon: "/icons/Resource-Groups.svg",
          name: "005b4ac1-08f4-49a9-aa4a-540f29e83168-rg",
          subscription: "Netiso NRMS Microsoft Tenant Admin Management",
          location: "East US",
        },
        {
          icon: "/icons/Resource-Groups.svg",
          name: "005b4ac1-08f4-49a9-aa4a-540f29e83168-rg",
          subscription: "Netiso NRMS Microsoft Tenant Admin Management",
          location: "East US",
        },
        {
          icon: "/icons/Resource-Groups.svg",
          name: "005b4ac1-08f4-49a9-aa4a-540f29e83168-rg",
          subscription: "Netiso NRMS Microsoft Tenant Admin Management",
          location: "East US",
        },
      ]
    : [
        {
          icon: "/icons/Resource-Groups.svg",
          name: "005b4ac1-08f4-49a9-aa4a-540f29e83168-rg",
          subscription: "Netiso NRMS Microsoft Tenant Admin Management",
          location: "East US",
        },
        {
          icon: "/icons/Resource-Groups.svg",
          name: "00a1a635-1bdb-493b-96de-30fa40aa60c6-rg",
          subscription: "NetworkLocationMicrosoftManagement2",
          location: "West US",
        },
        {
          icon: "/icons/Resource-Groups.svg",
          name: "005b4ac1-08f4-49a9-aa4a-540f29e83168-rg",
          subscription: "NetworkLocationMicrosoftManagement2",
          location: "West US",
        },
        {
          icon: "/icons/Resource-Groups.svg",
          name: "005b4ac1-08f4-49a9-aa4a-540f29e83168-rg",
          subscription: "Netiso NRMS Microsoft Tenant Admin Management",
          location: "East US",
        },
      ];

  const documentationItems = [
    {
      icon: "/icons/Illustration.svg",
      title: "Azure Architecture Center",
      description:
        "Step-by-step guidance to help admins plan, set up, and secure Azure for your organization",
      buttonText: "Open",
    },
    {
      icon: "/icons/Illustration.svg",
      title: "Overview of VMs in Azure",
      description:
        "Step-by-step guidance to help assess your current environment, prepare for migration, and make the shift to Azure",
      buttonText: "Open",
    },
    {
      icon: "/icons/Illustration.svg",
      title: "Resize a virtual machine",
      description:
        "Step-by-step guidance to help build innovative solutions leveraging Azure platform capabilities",
      buttonText: "Open",
    },
  ];

  const entraIdItems = [
    {
      title: "Try Microsoft Entra admin center",
      description:
        "Secure your identity environment with Microsoft Entra ID, secure single sign-on, and more.",
      link: "Go to Microsoft Entra",
    },
    {
      title: "Microsoft Entra Connect",
      description: "Last sync was less than 1 hour ago.",
      link: "Go to Microsoft Entra Connect",
    },
    {
      title: "Annie Han",
      description: "7991562+ webdeveloper.nanosphere",
      link: "View profile",
    },
  ];

  const marketplaceItems = [
    {
      title: "Virtual Machine",
      description:
        "Azure Virtual Machines provide on-demand, high-scale, secure and virtualized infrastructure using either Linux or Windows operating systems.",
      buttonText: "Create",
      icon: "/icons/virtual-machine.svg",
    },
    {
      title: "Data Science Virtual Machines",
      description: "Data science Virtual Machine - Ubuntu 22.04",
      buttonText: "Create",
      icon: "/icons/virtual-machine.svg",
    },
    {
      title: "Virtual machine scale set",
      description: "Deploy multiple instances of a single image",
      buttonText: "Create",
      icon: "/icons/VM-Scale-Sets.svg",
    },
  ];

  const relatedSearches = isAj1saSearch
    ? [
        { text: "What are the metrics for this Storage Account?" },
        { text: "Is this Storage Account vulnerable?" },
        { text: "Help me create a new Azure OpenAI application" },
        { text: "What happened in my environment since yesterday?" },
        { text: "Purposes storage accounts" },
      ]
    : [
        { text: "VM meaning", bold: "VM" },
        { text: "Virtual machine definition", bold: "Virtual machine" },
        { text: "Types of virtual machines", bold: "Types" },
        { text: "How to create virtual machines", bold: "How to create" },
        { text: "Purposes of virtual machines", bold: "Purposes" },
      ];

  return (
    <div
      className={mergeClasses(
        styles.container,
        hideHeader ? styles.containerAutoHeight : undefined,
      )}
    >
      {!hideHeader && (
        <AzureHeaderP1
          activeLink="Home"
          viewMode={viewMode}
          onCopilotOpen={() => {}}
          initialSearchValue={searchQuery}
          hideSuggestions={true}
        />
      )}

      <div className={styles.mainContent}>
        {/* Back button and tabs row - sits on divider */}
        <div
          className={mergeClasses(
            styles.stickyTabBar,
            hideHeader ? styles.stickyTabBarAtZero : styles.stickyTabBarAt48,
          )}
        >
          <FluentButton
            appearance="subtle"
            icon={<ChevronLeft24Regular />}
            onClick={handleBackClick}
            title="Back to previous page"
            className={styles.backButtonCompact}
          />
          <div className={styles.navTabs}>
            {tabs.map((tab) => (
              <div
                key={tab}
                className={mergeClasses(
                  styles.navTab,
                  styles.tabItemFlex,
                  activeTab === tab ? styles.navTabActive : undefined,
                )}
                onClick={() => handleTabClick(tab)}
              >
                {tab === "Copilot" && <CopilotSVGIcon width={16} height={16} />}
                {tab}
              </div>
            ))}
          </div>
        </div>

        {/* Content wrapper with left and right panels */}
        <div className={styles.contentWrapper}>
          <div className={styles.leftPanel}>
            <div ref={copilotRef} className={styles.copilotOverview}>
              <div className={styles.copilotHeader}>
                <CopilotSVGIcon width={20} height={20} />
                <Text className={styles.copilotTitle}>Copilot overview</Text>
              </div>
              <div
                className={mergeClasses(
                  styles.copilotContentWrapper,
                  isCopilotExpanded
                    ? styles.copilotExpanded
                    : styles.copilotCollapsed,
                )}
              >
                {isAj1saSearch ? (
                  <>
                    <div className={styles.copilotDescription}>
                      The term "aj1sa" appears to be the name of an Azure
                      Storage Account within the resource group "aj1sa_group" in
                      your Azure subscription.
                    </div>
                    <div className={styles.copilotDescription}>
                      To manage your Azure Storage Account, you can use several
                      methods and tools provided by Microsoft Azure. Here are
                      some key ways to manage your storage account:
                    </div>

                    <div className={styles.copilotSectionHeader}>
                      1. Azure Portal:
                    </div>
                    <ul className={styles.copilotList}>
                      <li className={styles.copilotListItem}>
                        You can manage your storage account directly through the
                        Azure Portal. This includes viewing and copying your
                        account access keys, managing containers, and
                        configuring settings.
                      </li>
                      <li className={styles.copilotListItemSecondary}>
                        To view and copy your storage account access keys,
                        navigate to your storage account in the Azure Portal, go
                        to the "Access keys" section under "Security +
                        networking," and use the provided options to show and
                        copy keys or connection strings.
                      </li>
                    </ul>

                    <div className={styles.copilotSectionHeader}>
                      2. Azure CLI:
                    </div>
                    <ul className={styles.copilotList}>
                      <li className={styles.copilotListItem}>
                        Use the Azure Command-Line Interface (CLI) to manage
                        your storage account programmatically.
                      </li>
                    </ul>

                    <div className={styles.copilotSectionHeader}>
                      3. PowerShell:
                    </div>
                    <ul className={styles.copilotList}>
                      <li className={styles.copilotListItem}>
                        Azure PowerShell can also be used to manage your storage
                        account. You can retrieve your account access keys with
                        the Get-AzStorageAccountKey command.
                      </li>
                    </ul>

                    <div className={styles.copilotSectionHeader}>
                      4. Azure Explorer for Eclipse:
                    </div>
                    <ul className={styles.copilotList}>
                      <li className={styles.copilotListItem}>
                        Although deprecated, Azure Explorer for Eclipse was a
                        tool for Java developers to manage storage accounts
                        within the Eclipse IDE.
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <div className={styles.copilotDescription}>
                      A ContosoVM01 is a software-based emulation of a physical
                      computer. It allows you to create and configure virtual
                      computers with specific amounts of RAM, hard drive space,
                      CPU cores, and other hardware details. The software that
                      enables this is called a hypervisor.
                    </div>

                    <div className={styles.copilotSectionHeader}>
                      How Virtual Machines Work
                    </div>
                    <div className={styles.copilotDescription}>
                      The hypervisor runs on your host computer and emulates the
                      hardware of a physical computer. This allows the operating
                      system installed on the VM to believe it is running on a
                      real, physical machine. The hypervisor also manages the
                      requests from the VM that need to be serviced by the
                      actual hardware of the host computer.
                    </div>
                  </>
                )}

                {!isCopilotExpanded && <div className={styles.fadeOverlay} />}
              </div>

              {isCopilotExpanded && (
                <>
                  {/* Dive deeper button - left aligned */}
                  <div className={styles.diveDeeperWrapper}>
                    <button
                      onClick={() => {
                        if (onCopilotOpen) {
                          onCopilotOpen();
                        }
                      }}
                      className={styles.diveDeeperButton}
                    >
                      <img
                        src="/icons/Copilot-line.svg"
                        alt="Copilot"
                        width={16}
                        height={16}
                        className={
                          isDarkMode ? styles.imgInvert : styles.imgNoFilter
                        }
                      />
                      Dive deeper in Copilot
                    </button>
                  </div>

                  {/* Divider */}
                  <div className={styles.copilotDivider} />
                </>
              )}

              <div
                className={mergeClasses(
                  styles.seeMoreWrapper,
                  isCopilotExpanded
                    ? styles.seeMoreTopZero
                    : styles.seeMoreTop16,
                )}
              >
                <button
                  className={mergeClasses(
                    styles.seeMoreButton,
                    styles.seeMoreButtonFlex,
                  )}
                  onClick={() => setIsCopilotExpanded(!isCopilotExpanded)}
                >
                  {isCopilotExpanded ? (
                    <>
                      See less{" "}
                      <ChevronDown16Regular className={styles.chevronRotated} />
                    </>
                  ) : (
                    <>
                      See more{" "}
                      <ChevronDown16Regular className={styles.chevronSmall} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Services Section */}
            <div ref={servicesRef}>
              <Text
                className={mergeClasses(
                  styles.sectionTitle,
                  styles.sectionTitleSmallTop,
                )}
              >
                Azure services (10)
              </Text>
              <div className={styles.tableCard}>
                <table className={styles.fullWidthTable}>
                  <thead>
                    <tr className={styles.tableHeadRow}>
                      <th className={styles.tableHeaderCellWide}>Name</th>
                      <th className={styles.tableHeaderCellDefault}>
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(isServicesExpanded
                      ? servicesData
                      : servicesData.slice(0, 5)
                    ).map((service, index, array) => (
                      <tr
                        key={index}
                        className={
                          index < array.length - 1
                            ? styles.tableRowBordered
                            : styles.tableRowNoBorder
                        }
                      >
                        <td className={styles.tableCellWide}>
                          <div className={styles.serviceNameRow}>
                            <img
                              src={service.icon}
                              alt={service.name}
                              width={20}
                              height={20}
                            />
                            <span className={styles.brandLink}>
                              {service.name}
                            </span>
                          </div>
                        </td>
                        <td className={styles.descriptionCell}>
                          {service.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className={styles.viewAllWrapper}>
                  <Text
                    className={mergeClasses(
                      styles.viewAllLink,
                      styles.viewAllLinkClickable,
                    )}
                    onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                  >
                    {isServicesExpanded ? "Show less" : "View all"}
                  </Text>
                </div>
              </div>
            </div>

            <div ref={resourcesRef}>
              <Text className={styles.sectionTitle}>Resources (10)</Text>
              <div className={styles.tableCard}>
                <table className={styles.fullWidthTable}>
                  <thead>
                    <tr>
                      <th className={styles.tableHeader}>Resource name</th>
                      <th className={styles.tableHeader}>Type</th>
                      <th className={styles.tableHeader}>Alerts</th>
                      <th className={styles.tableHeader}>Cost</th>
                      <th className={styles.tableHeader}>Last viewed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(isResourcesExpanded
                      ? resourcesData
                      : resourcesData.slice(0, 5)
                    ).map((resource, index) => (
                      <tr key={index}>
                        <td className={styles.tableCell}>
                          <div className={styles.resourceName}>
                            {resource.icon}
                            <span>{resource.name}</span>
                          </div>
                        </td>
                        <td className={styles.tableCell}>{resource.type}</td>
                        <td className={styles.tableCell}>{resource.alerts}</td>
                        <td
                          className={mergeClasses(
                            styles.tableCell,
                            styles.tableCellBrand,
                          )}
                        >
                          {resource.cost}
                        </td>
                        <td className={styles.tableCell}>
                          {resource.lastViewed}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className={styles.viewAllWrapper}>
                  <Text
                    className={mergeClasses(
                      styles.viewAllLink,
                      styles.viewAllLinkClickable,
                    )}
                    onClick={() => setIsResourcesExpanded(!isResourcesExpanded)}
                  >
                    {isResourcesExpanded ? "Show less" : "View all"}
                  </Text>
                </div>
              </div>
            </div>

            {/* Resource Groups Section */}
            <div ref={resourceGroupsRef}>
              <Text className={styles.sectionTitle}>Resource groups (6)</Text>
              <div className={styles.tableCard}>
                <table className={styles.fullWidthTable}>
                  <thead>
                    <tr className={styles.tableHeadRow}>
                      <th className={styles.tableHeaderCellDefault}>Name</th>
                      <th className={styles.tableHeaderCellDefault}>
                        Subscription
                      </th>
                      <th className={styles.tableHeaderCellDefault}>
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {resourceGroupsData.map((rg, index) => (
                      <tr
                        key={index}
                        className={
                          index < resourceGroupsData.length - 1
                            ? styles.tableRowBordered
                            : styles.tableRowNoBorder
                        }
                      >
                        <td className={styles.tableCellPadded}>
                          <div className={styles.flexRowGap8}>
                            <img
                              src={rg.icon}
                              alt={rg.name}
                              width={20}
                              height={20}
                            />
                            <span className={styles.brandLink}>{rg.name}</span>
                          </div>
                        </td>
                        <td className={styles.brandLinkCell}>
                          {rg.subscription}
                        </td>
                        <td className={styles.descriptionCell}>
                          {rg.location}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Microsoft Entra ID Section */}
            <div ref={entraIdRef}>
              <Text className={styles.sectionTitle}>
                Microsoft Entra ID (18)
              </Text>
              <div className={styles.documentationCards}>
                {entraIdItems.map((item, index) => (
                  <div
                    key={index}
                    className={mergeClasses(
                      styles.documentationCard,
                      styles.flexColumn,
                    )}
                  >
                    <div className={styles.cardHeaderRow}>
                      {item.title === "Annie Han" ? (
                        <div className={styles.avatarCircle}>AH</div>
                      ) : (
                        <Person24Regular className={styles.personIconLarge} />
                      )}
                      <div className={styles.flex1}>
                        <Text
                          className={mergeClasses(
                            styles.docCardTitle,
                            styles.titleMarginSmall,
                          )}
                        >
                          {item.title}
                        </Text>
                      </div>
                    </div>
                    <Text
                      className={mergeClasses(
                        styles.docCardDescription,
                        styles.descriptionGrow,
                      )}
                    >
                      {item.description}
                    </Text>
                    <FluentButton
                      appearance="outline"
                      size="small"
                      icon={<Open24Regular />}
                      className={styles.alignSelfStart}
                    >
                      {item.link}
                    </FluentButton>
                  </div>
                ))}
              </div>
              <div className={styles.viewAllCentered}>
                <Text className={styles.viewAllLink}>View all</Text>
              </div>
            </div>

            <div ref={marketplaceRef}>
              <Text className={styles.sectionTitle}>Marketplace (9)</Text>
              <div className={styles.documentationCards}>
                {marketplaceItems.map((item, index) => (
                  <div
                    key={index}
                    className={mergeClasses(
                      styles.documentationCard,
                      styles.marketplaceCardLayout,
                    )}
                  >
                    <div className={styles.cardHeaderRow}>
                      <img
                        src={item.icon}
                        alt={item.title}
                        width={32}
                        height={32}
                        className={styles.flexShrink0}
                      />
                      <Text
                        className={mergeClasses(
                          styles.docCardTitle,
                          styles.docTitleFlex,
                        )}
                      >
                        {item.title}
                      </Text>
                      <Heart24Regular className={styles.heartIcon} />
                    </div>
                    <Text
                      className={mergeClasses(
                        styles.docCardDescription,
                        styles.descriptionGrow,
                      )}
                    >
                      {item.description}
                    </Text>
                    <button
                      className={mergeClasses(
                        styles.cardButton,
                        styles.alignSelfStart,
                      )}
                    >
                      {item.buttonText}
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.viewAllCentered}>
                <Text className={styles.viewAllLink}>View all</Text>
              </div>
            </div>

            <div ref={documentationRef}>
              <Text className={styles.sectionTitle}>Documentation (99+)</Text>
              <div className={styles.documentationCards}>
                {documentationItems.map((doc, index) => (
                  <div
                    key={index}
                    className={mergeClasses(
                      styles.documentationCard,
                      styles.flexColumn,
                    )}
                  >
                    <img
                      src={doc.icon}
                      alt={doc.title}
                      width={32}
                      height={32}
                      className={styles.marginBottom12}
                    />
                    <Text className={styles.docCardTitle}>{doc.title}</Text>
                    <Text
                      className={mergeClasses(
                        styles.docCardDescription,
                        styles.descriptionGrow,
                      )}
                    >
                      {doc.description}
                    </Text>
                    <FluentButton
                      appearance="outline"
                      size="small"
                      icon={<Open24Regular />}
                      className={styles.alignSelfStart}
                    >
                      {doc.buttonText}
                    </FluentButton>
                  </div>
                ))}
              </div>
              <div className={styles.viewAllCentered}>
                <Text className={styles.viewAllLink}>View all</Text>
              </div>
            </div>

            {/* Extra spacing at bottom to allow scrolling to Documentation section */}
            <div className={styles.bottomSpacer} />
          </div>

          <div className={styles.rightPanel}>
            <div className={styles.relatedSearches}>
              <Text className={styles.relatedSearchTitle}>
                Related searches
              </Text>
              {relatedSearches.map((search, index) => {
                const hasBold = "bold" in search && search.bold;
                const parts = hasBold
                  ? search.text.split(new RegExp(`(${search.bold})`, "i"))
                  : [search.text];
                return (
                  <div key={index} className={styles.relatedSearchItem}>
                    <Search24Regular className={styles.searchIconSmall} />
                    <span>
                      {hasBold
                        ? parts.map((part, i) =>
                            part.toLowerCase() ===
                            search.bold!.toLowerCase() ? (
                              <strong key={i}>{part}</strong>
                            ) : (
                              <span key={i}>{part}</span>
                            ),
                          )
                        : search.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFullPageResults;
