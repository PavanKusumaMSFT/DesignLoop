/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
import React from "react"
import type { AlertRow } from "./insights-data"
import "./alert-context-pane.css"

import CloseIcon from "../../../shared/v8-icons/commands/close.svg?react"
import LinkIcon from "../../../shared/v8-icons/commands/link.svg?react"
import ViewIcon from "../../../shared/v8-icons/commands/view.svg?react"
import BeakerIcon from "../../../shared/v8-icons/commands/beaker.svg?react"
import EditIcon from "../../../shared/v8-icons/commands/edit.svg?react"
import ChevronRightIcon from "../../../shared/v8-icons/commands/chevron-right.svg?react"
import WarningIcon from "../../../shared/v8-icons/status/warning-outline.svg?react"

export interface AlertContextPaneProps {
  alert: AlertRow
  onClose: () => void
}

function SeverityDot({ severity }: { severity: AlertRow["severity"] }) {
  const mod =
    severity === "Critical" ? "critical"
    : severity === "Warning" ? "warning"
    : "info"
  return (
    <span className={`ap-alert-pane__severity-dot ap-alert-pane__severity-dot--${mod}`} />
  )
}

function severityLabel(severity: AlertRow["severity"]) {
  if (severity === "Critical") return "1 - Critical"
  if (severity === "Warning") return "2 - Warning"
  return "3 - Informational"
}

/** Alert detail context pane — slides in from the right when an alert row is clicked.
 *  Matches the Azure Monitor alert detail panel from the Figma design. */
export default function AlertContextPane({ alert, onClose }: AlertContextPaneProps) {
  const [activeTab, setActiveTab] = React.useState<"summary" | "history">("summary")
  const [queryOpen, setQueryOpen] = React.useState(false)
  const [detailsOpen, setDetailsOpen] = React.useState(false)

  return (
    <>
      {/* Scrim */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.2)",
          zIndex: 999,
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Pane — fixed to right edge, full height */}
      <div
        className="ap-alert-pane"
        style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 1000 }}
        role="dialog"
        aria-modal="true"
        aria-label={alert.title}
      >
        {/* Header */}
        <div className="ap-alert-pane__header">
          <div className="ap-alert-pane__header-content">
            <span className="ap-alert-pane__title">{alert.title}</span>
            <span className="ap-alert-pane__subtitle">
              {alert.monitorService ?? "Log search alert"} details
            </span>
          </div>
          <button
            type="button"
            className="ap-alert-pane__close"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Toolbar */}
        <div className="ap-alert-pane__toolbar">
          <div className="ap-alert-pane__toolbar-left">
            <button type="button" className="ap-alert-pane__toolbar-btn">
              <LinkIcon />
              Copy link
            </button>
            <div className="ap-alert-pane__toolbar-divider" aria-hidden="true" />
            <button type="button" className="ap-alert-pane__toolbar-btn">
              <ViewIcon />
              Go to alert rules
            </button>
          </div>
          <div className="ap-alert-pane__toolbar-right">
            <button type="button" className="ap-alert-pane__toolbar-btn">
              <BeakerIcon />
              Investigate (preview)
            </button>
            <span className="ap-alert-pane__new-badge">New</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="ap-alert-pane__tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "summary"}
            className={`ap-alert-pane__tab${activeTab === "summary" ? " ap-alert-pane__tab--active" : ""}`}
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "history"}
            className={`ap-alert-pane__tab${activeTab === "history" ? " ap-alert-pane__tab--active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
        </div>

        {/* Scrollable body */}
        <div className="ap-alert-pane__body" role="tabpanel">
          {activeTab === "summary" && (
            <>
              {/* General details */}
              <div className="ap-alert-pane__details-card">
                <p className="ap-alert-pane__details-card-title">General details</p>
                <div className="ap-alert-pane__details-grid">
                  <div className="ap-alert-pane__detail-col">
                    <span className="ap-alert-pane__detail-label">Severity</span>
                    <span className="ap-alert-pane__detail-value">
                      <SeverityDot severity={alert.severity} />
                      {severityLabel(alert.severity)}
                    </span>
                  </div>
                  <div className="ap-alert-pane__detail-col">
                    <span className="ap-alert-pane__detail-label">Fired time</span>
                    <span className="ap-alert-pane__detail-value">{alert.time}</span>
                  </div>
                  <div className="ap-alert-pane__detail-col">
                    <span className="ap-alert-pane__detail-label">Affected resource</span>
                    <a
                      className="ap-alert-pane__detail-value ap-alert-pane__detail-value--link"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      {alert.resource}
                    </a>
                  </div>
                  <div className="ap-alert-pane__detail-col">
                    <span className="ap-alert-pane__detail-label">Monitor service</span>
                    <span className="ap-alert-pane__detail-value">
                      {alert.monitorService ?? "Log Alerts V2"}
                    </span>
                  </div>
                  <div className="ap-alert-pane__detail-col">
                    <span className="ap-alert-pane__detail-label">Alert condition</span>
                    <span className="ap-alert-pane__detail-value">
                      <WarningIcon className="ap-alert-pane__condition-icon" />
                      {alert.alertCondition ?? "Fired"}
                    </span>
                  </div>
                  <div className="ap-alert-pane__detail-col">
                    <span className="ap-alert-pane__detail-label">User response</span>
                    <button type="button" className="ap-alert-pane__user-response">
                      New <EditIcon />
                    </button>
                  </div>
                </div>
              </div>

              {/* Why did this alert fire? */}
              {alert.description && (
                <div className="ap-alert-pane__why-card">
                  <p className="ap-alert-pane__why-title">Why did this alert fire?</p>
                  <div className="ap-alert-pane__why-description">
                    {/* Lightbulb icon */}
                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" aria-hidden="true">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5A4.5 4.5 0 0 0 5 9.43V11h6V9.43A4.5 4.5 0 0 0 8 1.5zM5.5 12v1a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-1h-5z" fill="currentColor" />
                    </svg>
                    <p>{alert.description}</p>
                  </div>

                  {(alert.dimensions?.length || alert.value) && (
                    <div className="ap-alert-pane__why-combined-row">
                      {alert.dimensions && alert.dimensions.length > 0 && (
                        <div className="ap-alert-pane__dims">
                          {alert.dimensions.map((dim) => (
                            <div key={dim.key} className="ap-alert-pane__dim-pair">
                              <span className="ap-alert-pane__dim-key">{dim.key}</span>
                              <span className="ap-alert-pane__dim-value">{dim.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {alert.dimensions?.length && alert.value && (
                        <div className="ap-alert-pane__why-vdivider" aria-hidden="true" />
                      )}

                      {alert.value && (
                        <div className="ap-alert-pane__metric-row">
                          <div className="ap-alert-pane__metric-col">
                            <span className="ap-alert-pane__metric-label">Value (when alert fired)</span>
                            <span className="ap-alert-pane__metric-value">
                              <span className="ap-alert-pane__trend-up" aria-hidden="true">↑</span>
                              {alert.value}
                            </span>
                          </div>
                          {alert.threshold && (
                            <div className="ap-alert-pane__metric-col">
                              <span className="ap-alert-pane__metric-label">Threshold</span>
                              <span className="ap-alert-pane__metric-value">{alert.threshold}</span>
                            </div>
                          )}
                          {alert.deviation && (
                            <div className="ap-alert-pane__metric-col">
                              <span className="ap-alert-pane__metric-label">Deviation</span>
                              <span className="ap-alert-pane__metric-value">{alert.deviation}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Query collapsible */}
              {alert.query && (
                <div className="ap-alert-pane__collapsible">
                  <div
                    className="ap-alert-pane__collapsible-header"
                    onClick={() => setQueryOpen((o) => !o)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setQueryOpen((o) => !o)}
                  >
                    <span className="ap-alert-pane__collapsible-left">
                      <ChevronRightIcon
                        className={`ap-alert-pane__collapsible-chevron${queryOpen ? " ap-alert-pane__collapsible-chevron--open" : ""}`}
                      />
                      Query
                    </span>
                    <button
                      type="button"
                      className="ap-alert-pane__view-logs-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View results in logs
                    </button>
                  </div>
                  {queryOpen && (
                    <div className="ap-alert-pane__collapsible-body">
                      <pre className="ap-alert-pane__query-code">{alert.query}</pre>
                    </div>
                  )}
                </div>
              )}

              {/* Additional details collapsible */}
              <div className="ap-alert-pane__collapsible">
                <div
                  className="ap-alert-pane__collapsible-header"
                  onClick={() => setDetailsOpen((o) => !o)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setDetailsOpen((o) => !o)}
                >
                  <span className="ap-alert-pane__collapsible-left">
                    <ChevronRightIcon
                      className={`ap-alert-pane__collapsible-chevron${detailsOpen ? " ap-alert-pane__collapsible-chevron--open" : ""}`}
                    />
                    Additional details
                  </span>
                </div>
                {detailsOpen && (
                  <div className="ap-alert-pane__collapsible-body">
                    <p>No additional details available.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "history" && (
            <div style={{ color: "var(--text-secondary)", fontSize: "var(--body-size)" }}>
              No history available.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

