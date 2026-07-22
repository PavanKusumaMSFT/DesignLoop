"use client"

import { makeStyles, tokens as fluentTokens, Dropdown, Option } from "@fluentui/react-components"


type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;
import { ArrowReset20Regular } from "@fluentui/react-icons"

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "20px 40px",
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  },
  historyLabel: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightRegular,
  },
  dropdown: {
    minWidth: "220px",
    minHeight: "38px",
    borderRadius: "20px",
    border: "none",
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06)",
    ":focus-within": {
      outline: "none",
      boxShadow: "0 5px 14px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.08)",
    },
  },
  refreshButton: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: tokens.colorNeutralForeground2,
    transition: "all 0.2s",
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06)",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1,
      boxShadow: "0 5px 14px rgba(0, 0, 0, 0.1), 0 2px 5px rgba(0, 0, 0, 0.08)",
      transform: "translateY(-1px)",
    },
  },
})

interface CanvasHeaderProps {
  historyItems: string[]
  selectedHistory: string
  onHistoryChange: (value: string) => void
  onRefresh: () => void
}

/** Header bar with a history dropdown selector and refresh button for canvas-style views.
 * Cross-project reusable: can be imported by any project. */
export default function CanvasHeader({ 
  historyItems, 
  selectedHistory, 
  onHistoryChange,
  onRefresh 
}: CanvasHeaderProps) {
  const styles = useStyles()

  return (
    <>
      <style>{`
        .fui-Listbox {
          padding: 4px !important;
          border-radius: 16px !important;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.06) !important;
        }
        .fui-Option {
          padding: 10px 12px !important;
          text-align: left !important;
          justify-content: flex-start !important;
        }
        .fui-Option__checkIcon {
          display: none !important;
        }
        .fui-Option:focus::after,
        .fui-Option:focus-visible::after {
          display: none !important;
        }
        .fui-Option:focus,
        .fui-Option:focus-visible {
          outline: none !important;
        }
        .fui-Dropdown::after,
        .fui-Dropdown:focus::after,
        .fui-Dropdown:focus-visible::after,
        .fui-Dropdown:active::after {
          display: none !important;
          border: none !important;
        }
        .fui-Dropdown button::after,
        .fui-Dropdown button:focus::after,
        .fui-Dropdown button:focus-visible::after {
          display: none !important;
          border: none !important;
        }
        .fui-Dropdown,
        .fui-Dropdown:focus,
        .fui-Dropdown:focus-visible,
        .fui-Dropdown:active,
        .fui-Dropdown button,
        .fui-Dropdown button:focus,
        .fui-Dropdown button:focus-visible {
          outline: none !important;
        }
      `}</style>
      <div className={styles.header}>
        <span className={styles.historyLabel}>History</span>
        <Dropdown
          className={styles.dropdown}
          placeholder="Select history"
          value={selectedHistory}
          onOptionSelect={(_, data) => onHistoryChange(data.optionValue as string)}
        >
          {historyItems.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Dropdown>
        
        <button 
          className={styles.refreshButton}
          onClick={onRefresh}
          aria-label="Refresh"
        >
          <ArrowReset20Regular />
        </button>
      </div>
    </>
  )
}
