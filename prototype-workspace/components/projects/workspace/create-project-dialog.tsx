/* eslint-disable react/forbid-dom-props, no-restricted-syntax */
"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Input,
  Dropdown,
  Option,
  Label,
  Text,
  makeStyles,
  mergeClasses,
  tokens as fluentTokens,
  Tooltip,
} from "@fluentui/react-components";
import {
  Add24Regular,
  Copy16Regular,
  Checkmark16Regular,
  ClipboardTextLtr20Regular,
} from "@fluentui/react-icons";
import type { ExperienceArea, Horizon } from "../../../data/projects";

type SafeTokens = { [key: string]: any };
const tokens: SafeTokens = fluentTokens;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TEAMS = [
  "Growth & Foundations",
  "Cross-Team",
  "Cloud Natives Experiences",
  "CIX",
  "Design System & Intelligence",
  "Cost",
  "Learn",
  "Other",
];

const EXPERIENCES: { value: ExperienceArea; label: string }[] = [
  { value: "signup", label: "Signup" },
  { value: "upgrade", label: "Upgrade" },
  { value: "catalog-all-services", label: "Catalog / All Services" },
  { value: "onboarding-fre", label: "Onboarding / FRE" },
  { value: "manage", label: "Manage" },
  { value: "search-discover", label: "Search / Discover" },
  { value: "startups", label: "Startups" },
  { value: "create", label: "Create" },
  { value: "cost", label: "Cost" },
  { value: "agent", label: "Agent" },
  { value: "other", label: "Other" },
];

const HORIZONS: { value: Horizon; label: string; shell: string }[] = [
  {
    value: "build-2026",
    label: "Short-term (P0, MVP)",
    shell: "AzureHeaderBuildMVP",
  },
  {
    value: "v1-ideal",
    label: "Mid-term (Phase II–III)",
    shell: "AzureHeaderBuildMVP",
  },
  { value: "vision", label: "Long-term (Vision)", shell: "TopNav" },
];

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const useStyles = makeStyles({
  twoPanel: {
    display: "flex",
    gap: "24px",
    minHeight: "420px",
  },
  leftPanel: {
    flex: "1 1 55%",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    overflowY: "auto",
    overflowX: "hidden",
    maxHeight: "520px",
    paddingRight: "8px",
  },
  rightPanel: {
    flex: "0 0 340px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    position: "sticky",
    top: 0,
    alignSelf: "flex-start",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "100%",
  },
  row: {
    display: "flex",
    gap: "12px",
  },
  halfField: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    minWidth: 0,
  },
  pillarsRow: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },
  commandSection: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "8px",
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  commandLabel: {
    fontSize: "11px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground3,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  commandBox: {
    fontFamily: "Consolas, 'Courier New', monospace",
    fontSize: "12px",
    lineHeight: "1.6",
    color: "#e2e8f0",
    backgroundColor: "#1e293b",
    borderRadius: "6px",
    padding: "12px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all",
    flex: 1,
    minHeight: "80px",
  },
  copilotBox: {
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    fontSize: "13px",
    lineHeight: "1.5",
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "6px",
    padding: "12px",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  buttonRow: {
    display: "flex",
    gap: "8px",
    justifyContent: "flex-end",
  },
  shellNote: {
    fontSize: "11px",
    color: tokens.colorNeutralForeground3,
    fontStyle: "italic",
  },
  hint: {
    fontSize: "11px",
    color: tokens.colorNeutralForeground3,
  },
  placeholder: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: tokens.colorNeutralForeground3,
    fontSize: "13px",
    textAlign: "center",
    padding: "24px 20px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "8px",
    gap: "8px",
    minHeight: "300px",
  },
  tabRow: {
    display: "flex",
    gap: "4px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "6px",
    padding: "3px",
  },
  dialogSurface: {
    maxWidth: "940px",
    width: "90vw",
  },
  fullFlex: {
    flex: "1",
  },
  placeholderIcon: {
    fontSize: "24px",
  },
  placeholderHint: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
  },
});

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CreateProjectDialog() {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [outputTab, setOutputTab] = useState<"cli" | "copilot">("cli");

  // Form state
  const [projectName, setProjectName] = useState("");
  const [team, setTeam] = useState("");
  const [owner, setOwner] = useState("");
  const [projectTemplate, setProjectTemplate] = useState<"new" | "stitch">(
    "new",
  );
  const [experience, setExperience] = useState("");
  const [horizon, setHorizon] = useState<string>("build-2026");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  // Derive project ID from name
  const projectId = projectName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const projectTitle = projectName || projectId;

  const isValid =
    projectId.length > 0 &&
    team &&
    horizon &&
    (projectTemplate === "stitch" || experience);

  // Get the shell info for the selected horizon
  const selectedHorizon = HORIZONS.find((h) => h.value === horizon);
  const shellName = selectedHorizon?.shell || "AzureHeaderBuildMVP";

  // Generate the CLI command
  const command = useMemo(() => {
    if (!isValid) return "";

    const parts = [`pnpm create-project "${projectId}"`, `--team "${team}"`];

    if (owner) parts.push(`--owner "${owner}"`);
    if (projectTemplate === "stitch") {
      parts.push(`--template stitch`);
    }
    if (experience) parts.push(`--experience ${experience}`);
    parts.push(`--horizon ${horizon}`);
    parts.push(`--branch`);

    if (description) {
      parts.push(`--description "${description}"`);
    }
    if (tags) {
      parts.push(`--tags "${tags}"`);
    }

    return parts.join(" \\\n  ");
  }, [
    projectId,
    team,
    owner,
    projectTemplate,
    experience,
    horizon,
    description,
    tags,
    isValid,
  ]);

  // Generate Copilot Chat prompt
  const copilotPrompt = useMemo(() => {
    if (!isValid) return "";
    const templateDesc =
      projectTemplate === "stitch"
        ? "stitch/integration project (composes existing components, no new component file)"
        : "new experience component";
    const shellDesc =
      shellName === "TopNav"
        ? "TopNav (vision)"
        : "AzureHeaderBuildMVP (short/mid-term)";
    const parts = [
      `/create-project`,
      `Create a ${templateDesc} called "${projectTitle}" (ID: ${projectId}) in the azure-portal-poc repo.`,
      `Team: ${team}.`,
      owner ? `Owner: ${owner}.` : "",
      `Time horizon: ${selectedHorizon?.label || horizon}.`,
      `Shell: ${shellDesc}.`,
      experience
        ? `Experience area: ${EXPERIENCES.find((e) => e.value === experience)?.label || experience}.`
        : "",
      description ? `Description: ${description}` : "",
      `Run the scaffold script: pnpm create-project "${projectId}" --team "${team}"${owner ? ` --owner "${owner}"` : ""}${experience ? ` --experience ${experience}` : ""} --horizon ${horizon}${description ? ` --description "${description}"` : ""}${tags ? ` --tags "${tags}"` : ""} --branch`,
    ].filter(Boolean);
    return parts.join("\n");
  }, [
    projectId,
    projectTitle,
    team,
    owner,
    projectTemplate,
    experience,
    horizon,
    description,
    tags,
    shellName,
    selectedHorizon,
    isValid,
  ]);

  const handleCopy = async () => {
    const oneLiner = command.replace(/\s*\\\n\s*/g, " ");
    await navigator.clipboard.writeText(oneLiner);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(copilotPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleReset = () => {
    setProjectName("");
    setTeam("");
    setOwner("");
    setProjectTemplate("new");
    setExperience("");
    setHorizon("build-2026");
    setDescription("");
    setTags("");
    setCopied(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(_e, data) => {
        setOpen(data.open);
        if (!data.open) handleReset();
      }}
    >
      <DialogTrigger disableButtonEnhancement>
        <Button appearance="primary" icon={<Add24Regular />} size="medium">
          Create Project
        </Button>
      </DialogTrigger>

      <DialogSurface className={styles.dialogSurface}>
        <DialogBody>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogContent>
            <div className={styles.twoPanel}>
              {/* LEFT PANEL — Form */}
              <div className={styles.leftPanel}>
                {/* Project Name */}
                <div className={styles.field}>
                  <Label required>Project Name</Label>
                  <Input
                    placeholder="e.g., Cost Dashboard V2"
                    value={projectName}
                    onChange={(_e, data) => setProjectName(data.value)}
                  />
                  {projectId && (
                    <Text className={styles.hint}>
                      ID: <code>{projectId}</code> → route:{" "}
                      <code>/{projectId}</code>
                    </Text>
                  )}
                </div>

                {/* Project Type */}
                <div className={styles.field}>
                  <Label>Project Type</Label>
                  <div className={styles.pillarsRow}>
                    <Button
                      size="small"
                      appearance={
                        projectTemplate === "new" ? "primary" : "outline"
                      }
                      onClick={() => setProjectTemplate("new")}
                    >
                      New Experience
                    </Button>
                    <Button
                      size="small"
                      appearance={
                        projectTemplate === "stitch" ? "primary" : "outline"
                      }
                      onClick={() => setProjectTemplate("stitch")}
                    >
                      Stitch / Integration
                    </Button>
                  </div>
                  <Text className={styles.hint}>
                    {projectTemplate === "stitch"
                      ? "Combines existing team work — scenario cards + clickthrough."
                      : "Creates a new experience component with shell pre-wired."}
                  </Text>
                </div>

                {/* Team + Owner */}
                <div className={styles.row}>
                  <div className={styles.halfField}>
                    <Label required>Team</Label>
                    <Dropdown
                      placeholder="Select team"
                      value={team}
                      onOptionSelect={(_e, data) =>
                        setTeam(data.optionValue || "")
                      }
                    >
                      {TEAMS.map((t) => (
                        <Option key={t} value={t}>
                          {t}
                        </Option>
                      ))}
                    </Dropdown>
                  </div>
                  <div className={styles.halfField}>
                    <Label>Owner</Label>
                    <Input
                      placeholder="e.g., Steph"
                      value={owner}
                      onChange={(_e, data) => setOwner(data.value)}
                    />
                  </div>
                </div>

                {/* Experience Area + Horizon */}
                <div className={styles.row}>
                  {projectTemplate === "new" && (
                    <div className={styles.halfField}>
                      <Label required>Experience Area</Label>
                      <Dropdown
                        placeholder="Select area"
                        value={
                          EXPERIENCES.find((e) => e.value === experience)
                            ?.label || ""
                        }
                        onOptionSelect={(_e, data) =>
                          setExperience(data.optionValue || "")
                        }
                      >
                        {EXPERIENCES.map((e) => (
                          <Option key={e.value} value={e.value}>
                            {e.label}
                          </Option>
                        ))}
                      </Dropdown>
                    </div>
                  )}
                  <div
                    className={mergeClasses(
                      projectTemplate === "new"
                        ? styles.halfField
                        : styles.field,
                      projectTemplate === "stitch"
                        ? styles.fullFlex
                        : undefined,
                    )}
                  >
                    <Label required>Time Horizon</Label>
                    <Dropdown
                      placeholder="Select horizon"
                      value={selectedHorizon?.label || ""}
                      onOptionSelect={(_e, data) =>
                        setHorizon(data.optionValue || "build-2026")
                      }
                    >
                      {HORIZONS.map((h) => (
                        <Option key={h.value} value={h.value}>
                          {h.label}
                        </Option>
                      ))}
                    </Dropdown>
                  </div>
                </div>

                <Text className={styles.shellNote}>Shell: {shellName}</Text>

                {/* Description + Tags */}
                <div className={styles.row}>
                  <div className={styles.halfField}>
                    <Label>Tags</Label>
                    <Input
                      placeholder="e.g., p0, experiment"
                      value={tags}
                      onChange={(_e, data) => setTags(data.value)}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <Label>Description</Label>
                  <Input
                    placeholder="Brief description of the project"
                    value={description}
                    onChange={(_e, data) => setDescription(data.value)}
                  />
                </div>
              </div>

              {/* RIGHT PANEL — Live command output */}
              <div className={styles.rightPanel}>
                {isValid ? (
                  <>
                    <div className={styles.tabRow}>
                      <Button
                        size="small"
                        appearance={outputTab === "cli" ? "primary" : "subtle"}
                        onClick={() => setOutputTab("cli")}
                      >
                        Terminal / CLI
                      </Button>
                      <Button
                        size="small"
                        appearance={
                          outputTab === "copilot" ? "primary" : "subtle"
                        }
                        onClick={() => setOutputTab("copilot")}
                      >
                        Copilot Chat / GHCP CLI in VSCode
                      </Button>
                    </div>

                    <div className={styles.commandSection}>
                      {outputTab === "cli" ? (
                        <>
                          <Text className={styles.commandLabel}>
                            Paste into terminal
                          </Text>
                          <Text className={styles.hint}>
                            This creates a git branch (
                            {team.toLowerCase().replace(/[\s/]+/g, "-")}/
                            {projectId}), pushes it to remote, scaffolds the
                            landing page, prototype sub-page, and component, and
                            registers the project.
                          </Text>
                          <div className={styles.commandBox}>{command}</div>
                          <div className={styles.buttonRow}>
                            <Tooltip
                              content={copied ? "Copied!" : "Copy command"}
                              relationship="label"
                            >
                              <Button
                                size="small"
                                appearance="subtle"
                                icon={
                                  copied ? (
                                    <Checkmark16Regular />
                                  ) : (
                                    <Copy16Regular />
                                  )
                                }
                                onClick={handleCopy}
                              >
                                {copied ? "Copied!" : "Copy"}
                              </Button>
                            </Tooltip>
                          </div>
                        </>
                      ) : (
                        <>
                          <Text className={styles.commandLabel}>
                            Paste into Copilot Chat or GHCP CLI in VS Code
                          </Text>
                          <div className={styles.copilotBox}>
                            {copilotPrompt}
                          </div>
                          <div className={styles.buttonRow}>
                            <Tooltip
                              content={copiedPrompt ? "Copied!" : "Copy prompt"}
                              relationship="label"
                            >
                              <Button
                                size="small"
                                appearance="subtle"
                                icon={
                                  copiedPrompt ? (
                                    <Checkmark16Regular />
                                  ) : (
                                    <Copy16Regular />
                                  )
                                }
                                onClick={handleCopyPrompt}
                              >
                                {copiedPrompt ? "Copied!" : "Copy"}
                              </Button>
                            </Tooltip>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <div className={styles.placeholder}>
                    <ClipboardTextLtr20Regular
                      className={styles.placeholderIcon}
                    />
                    <Text weight="semibold">Generated output</Text>
                    <Text className={styles.placeholderHint}>
                      Fill out the required fields to generate a<br />
                      scaffold command or Copilot Chat prompt
                    </Text>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>

          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
