/* =================================================================
   TASK REGISTRY
   To add a new task, add an entry to this array.
   ================================================================= */
const TASKS = [
  {
    id: 'azure-deployment-agent',
    dir: 'tasks/azure-deployment-agent',
    title: 'Azure Deployment Agent UX Enhancements',
    description: 'Full design lifecycle for Deployment Agent improvements — from research through handoff.',
    source: 'research/azure-deployment-agent-ux-enhancements.md',
    phases: [
      {
        id: 'discover',
        label: 'Discover',
        files: [
          { path: 'research/azure-deployment-agent-ux-enhancements.md', label: 'Research Brief' },
          { path: 'research/findings/agent-discovery.md', label: 'Agent Discovery (Critical)' },
          { path: 'research/findings/cost-transparency.md', label: 'Cost Transparency (High)' },
          { path: 'research/findings/bicep-deployments.md', label: 'Bicep Deployments (Medium)' },
          { path: 'research/findings/inline-editing.md', label: 'Inline Editing (Medium)' },
          { path: 'research/findings/version-diffing.md', label: 'Version Diffing (Low)' },
        ]
      },
      {
        id: 'define',
        label: 'Define',
        files: [
          { path: 'strategy/problem-statements.md', label: 'Problem Statements (HMWs)' },
          { path: 'strategy/personas.md', label: 'User Personas' },
          { path: 'strategy/requirements-prd.md', label: 'Requirements (PRD)' },
        ]
      },
      {
        id: 'ideate',
        label: 'Ideate',
        files: [
          { path: 'ideation/solution-concepts.md', label: 'Solution Concepts' },
          { path: 'ideation/concept-evaluation.md', label: 'Concept Evaluation' },
          { path: 'ideation/decision-log.md', label: 'Decision Log' },
        ]
      },
      {
        id: 'design',
        label: 'Design',
        files: [
          { path: 'designs/wireframes/deployment-agent-overview.md', label: 'Wireframe Overview' },
          { path: 'designs/components/mode-switcher.md', label: 'Mode Switcher Spec' },
          { path: 'designs/components/cost-annotation.md', label: 'Cost Annotation Spec' },
          { path: 'designs/components/deploy-gate.md', label: 'Deploy Gate Spec' },
          { path: 'designs/components/click-to-edit.md', label: 'Click-to-Edit Spec' },
          { path: 'designs/components/version-timeline.md', label: 'Version Timeline Spec' },
        ]
      },
      {
        id: 'prototype',
        label: 'Prototype',
        files: [],
        components: [
          {
            name: 'ModeSwitcher',
            demo: 'prototypes/demos/ModeSwitcher.html',
            sources: [
              { path: 'prototypes/components/ModeSwitcher/ModeSwitcher.tsx', label: 'Component.tsx' },
              { path: 'prototypes/components/ModeSwitcher/ModeSwitcher.module.css', label: 'Styles.css' },
              { path: 'prototypes/components/ModeSwitcher/ModeSwitcher.stories.tsx', label: 'Stories.tsx' },
            ]
          },
          {
            name: 'CostBadge',
            demo: 'prototypes/demos/CostBadge.html',
            sources: [
              { path: 'prototypes/components/CostBadge/CostBadge.tsx', label: 'Component.tsx' },
              { path: 'prototypes/components/CostBadge/CostBadge.module.css', label: 'Styles.css' },
              { path: 'prototypes/components/CostBadge/CostBadge.stories.tsx', label: 'Stories.tsx' },
            ]
          },
          {
            name: 'DeployGate',
            demo: 'prototypes/demos/DeployGate.html',
            sources: [
              { path: 'prototypes/components/DeployGate/DeployGate.tsx', label: 'Component.tsx' },
              { path: 'prototypes/components/DeployGate/DeployGate.module.css', label: 'Styles.css' },
              { path: 'prototypes/components/DeployGate/DeployGate.stories.tsx', label: 'Stories.tsx' },
            ]
          },
          {
            name: 'ClickToEdit',
            demo: 'prototypes/demos/ClickToEdit.html',
            sources: [
              { path: 'prototypes/components/ClickToEdit/ClickToEdit.tsx', label: 'Component.tsx' },
              { path: 'prototypes/components/ClickToEdit/ClickToEdit.module.css', label: 'Styles.css' },
              { path: 'prototypes/components/ClickToEdit/ClickToEdit.stories.tsx', label: 'Stories.tsx' },
            ]
          },
          {
            name: 'VersionTimeline',
            demo: 'prototypes/demos/VersionTimeline.html',
            sources: [
              { path: 'prototypes/components/VersionTimeline/VersionTimeline.tsx', label: 'Component.tsx' },
              { path: 'prototypes/components/VersionTimeline/VersionTimeline.module.css', label: 'Styles.css' },
              { path: 'prototypes/components/VersionTimeline/VersionTimeline.stories.tsx', label: 'Stories.tsx' },
            ]
          },
        ]
      },
      {
        id: 'test',
        label: 'Test',
        files: [
          { path: 'tests/usability/tenets-traps-evaluation-r1.md', label: 'Tenets & Traps Evaluation (R1)' },
          { path: 'tests/usability/tenets-traps-evaluation-r2.md', label: 'Tenets & Traps Evaluation (R2)' },
          { path: 'tests/usability/deployment-agent-r4-test-plan.md', label: 'Usability Test Plan (R4)' },
          { path: 'tests/usability/deployment-agent-r4-task-scripts.md', label: 'Task Scripts (R4)' },
        ]
      },
      {
        id: 'deliver',
        label: 'Deliver',
        files: [
          { path: 'handoff/implementation-guide.md', label: 'Implementation Guide' },
          { path: 'handoff/components/component-api-reference.md', label: 'Component API Reference' },
          { path: 'handoff/design-engineering-changelog.md', label: 'Design-Engineering Changelog' },
        ]
      },
    ]
  },
  {
    id: 'design-loop-landing-page',
    dir: 'tasks',
    title: 'Design Loop Landing Page',
    description: 'Usability and accessibility evaluation of the Design Loop marketing landing page.',
    source: 'design-loop-landing-page-tenets-traps-r1-v2.md',
    phases: [
      { id: 'discover', label: 'Discover', files: [] },
      { id: 'define', label: 'Define', files: [] },
      { id: 'ideate', label: 'Ideate', files: [] },
      { id: 'design', label: 'Design', files: [] },
      { id: 'prototype', label: 'Prototype', files: [], components: [] },
      {
        id: 'test',
        label: 'Test',
        files: [
          { path: 'design-loop-landing-page-tenets-traps-r1.md', label: 'Tenets & Traps Evaluation (R1 — prior)' },
          { path: 'design-loop-landing-page-tenets-traps-r1-v2.md', label: 'Tenets & Traps Evaluation (R1)' },
          { path: 'design-loop-landing-page-accessibility-audit.md', label: 'Accessibility Audit (prior)' },
          { path: 'design-loop-landing-page-accessibility-audit-v2.md', label: 'Accessibility Audit' },
          { path: 'design-loop-landing-page-usability-test-plan.md', label: 'Usability Test Plan' },
        ]
      },
      { id: 'deliver', label: 'Deliver', files: [] },
    ]
  },
  // ────────────────────────────────────────────────────────────────
  // ADD NEW TASKS HERE:
  // ────────────────────────────────────────────────────────────────
  {
    id: 'cli-walkthrough',
    dir: 'tasks/cli-walkthrough',
    title: 'CLI Walkthrough',
    description: 'Tenets & Traps usability evaluation of the Project Cirrus AI-assisted Azure CLI walkthrough (Figma prototype).',
    source: 'tests/usability/tenets-traps-evaluation-r1.md',
    phases: [
      { id: 'discover', label: 'Discover', files: [] },
      { id: 'define', label: 'Define', files: [] },
      { id: 'ideate', label: 'Ideate', files: [] },
      { id: 'design', label: 'Design', files: [] },
      { id: 'prototype', label: 'Prototype', files: [], components: [] },
      {
        id: 'test',
        label: 'Test',
        files: [
          { path: 'tests/usability/tenets-traps-evaluation-r1.md', label: 'Tenets & Traps Evaluation (R1)' },
        ]
      },
      { id: 'deliver', label: 'Deliver', files: [] },
    ]
  },
];

/* =================================================================
   STATE
   ================================================================= */
let activeFile = null;
let collapsedPhases = {};
let currentTaskId = null;
let ROUTING = false; // true while rendering from a URL route (suppresses pushState)
const TASK_SOURCE_ARTIFACTS_KEY = 'dl-task-source-artifacts-v1';

function loadTaskSourceArtifacts() {
  try {
    const raw = localStorage.getItem(TASK_SOURCE_ARTIFACTS_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

let TASK_SOURCE_ARTIFACTS = loadTaskSourceArtifacts();

/* =================================================================
   HELPERS
   ================================================================= */
function getTask(taskId) {
  return TASKS.find(t => t.id === taskId);
}
function fullPath(task, p) {
  return task && task.dir ? task.dir + '/' + p : p;
}

function normalizeSourceArtifact(item) {
  if (!item || typeof item !== 'object') return null;
  const label = String(item.label || '').trim();
  const value = String(item.value || '').trim();
  const type = String(item.type || 'document').trim().toLowerCase();
  if (!label && !value) return null;
  return { type, label: label || 'Source', value };
}

function sourceArtifactsForTask(task) {
  if (!task) return [];
  const merged = [];
  const seen = new Set();
  const fromTask = Array.isArray(task.sourceArtifacts) ? task.sourceArtifacts : [];
  const fromStore = Array.isArray(TASK_SOURCE_ARTIFACTS[task.id]) ? TASK_SOURCE_ARTIFACTS[task.id] : [];
  for (const raw of [...fromTask, ...fromStore]) {
    const n = normalizeSourceArtifact(raw);
    if (!n) continue;
    const key = `${n.type}|${n.label}|${n.value}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(n);
  }
  return merged;
}

function persistTaskSourceArtifacts(taskId, sourceArtifacts) {
  if (!taskId || !Array.isArray(sourceArtifacts) || !sourceArtifacts.length) return;
  const cleaned = sourceArtifacts.map(normalizeSourceArtifact).filter(Boolean);
  if (!cleaned.length) return;
  TASK_SOURCE_ARTIFACTS[taskId] = cleaned;
  try { localStorage.setItem(TASK_SOURCE_ARTIFACTS_KEY, JSON.stringify(TASK_SOURCE_ARTIFACTS)); } catch { /* ignore */ }
  const task = getTask(taskId);
  if (task) task.sourceArtifacts = cleaned;
}

function captureComposerSourceArtifacts() {
  return HOME_SOURCES.map((s) => {
    if (s.type === 'link') {
      return { type: 'link', label: 'Link / URL', value: String(s.value || '').trim() };
    }
    // For uploaded files, show the file name as the source value (not inline file contents).
    return { type: 'file', label: 'Uploaded file', value: String(s.label || '').trim() || String(s.value || '').trim() };
  }).filter(x => x.value);
}

function runtimeComposerSourceArtifacts() {
  return HOME_SOURCES.map((s) => {
    if (s.type === 'link') {
      const value = String(s.value || '').trim();
      if (!value) return null;
      return { type: 'link', label: String(s.label || 'Link / URL'), value };
    }
    const label = String(s.label || '').trim() || 'attachment';
    const item = { type: 'file', label, value: label };
    if (s.content && s.encoding) {
      item.content = s.content;
      item.encoding = s.encoding;
      item.mime = s.mime || 'application/octet-stream';
    }
    return item;
  }).filter(Boolean);
}

/* Monochrome inline SVG icon set (stroke = currentColor) */
const ICONS = {
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  css: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s6 5.5 6 10a6 6 0 0 1-12 0c0-4.5 6-10 6-10z"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
  cube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5"/><path d="M12 12v10"/></svg>',
  loop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M18.178 8c-3.418 0-4.764 8-8.356 8a4 4 0 0 1 0-8c3.592 0 4.938 8 8.356 8a4 4 0 0 0 0-8z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg>',
  warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
  evaluate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  folder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  panelLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
  sparkle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></svg>',
};

/* =================================================================
   TOOL REGISTRY
   Standalone agent tools surfaced in the global sidebar + tool pages.
   ================================================================= */
const TOOLS = [
  {
    id: 'tenets-traps',
    name: 'Tenets & Traps Evaluation',
    icon: 'evaluate',
    status: 'active',
    agent: '@Tester',
    blurb: "Heuristically evaluate a design, prototype, or live UI against Microsoft's UI Tenets & Traps framework. Produces a report with Top Issues, All Findings (each mapped to a Tenet and Trap), Quick Wins, and Reasoning — and supports a fix → re-evaluate loop.",
    skill: '.github/skills/tenets-traps-evaluation/SKILL.md',
  },
  {
    id: 'security-audit',
    name: 'Security Audit',
    icon: 'shield',
    status: 'active',
    agent: '@Security Auditor',
    blurb: 'Audit designs and prototypes against the Microsoft Secure Future Initiative (SFI) framework, with supporting SBD pattern detection and OWASP design-phase checks.',
    skill: '.github/agents/security-auditor.agent.md',
    inputLabel: 'Security audit target',
    inputPlaceholder: 'e.g. Review the authentication flow in prototypes/demos/account.html',
    outputs: ['tests/security/audit-{target}-{date}.md'],
  },
  {
    id: 'research-brief',
    name: 'Research Brief',
    icon: 'book',
    status: 'active',
    agent: '@Research Brief',
    blurb: 'Scope the goals, questions, methods, participant profile, and success criteria for a design research effort.',
    skill: '.github/skills/research-brief/SKILL.md',
    outputs: ['research/research-brief.md'],
  },
  {
    id: 'competitive-analysis',
    name: 'Competitive Analysis',
    icon: 'evaluate',
    status: 'active',
    agent: '@Competitive Analysis',
    blurb: 'Compare products across experience, features, pricing, and positioning to identify gaps and opportunities.',
    skill: '.github/skills/competitive-analysis/SKILL.md',
    outputs: ['research/competitive/{category}-matrix.md', 'research/competitive/{category}-brief.md'],
  },
  {
    id: 'web-fetch',
    name: 'Web Fetch',
    icon: 'send',
    status: 'active',
    agent: '@Web Fetch',
    blurb: 'Fetch public or Microsoft-internal source material and save clean markdown for research and analysis.',
    skill: '.github/skills/web-fetch/SKILL.md',
    inputLabel: 'URL or URLs to fetch',
    inputPlaceholder: 'https://example.com/research-report',
    outputs: ['research/web/{slug}.md'],
  },
  {
    id: 'design-system-setup',
    name: 'Design System Setup',
    icon: 'css',
    status: 'active',
    agent: '@Design System Setup',
    blurb: 'Create a complete, token-based foundation for color, type, spacing, elevation, and motion.',
    skill: '.github/skills/design-system-setup/SKILL.md',
    outputs: ['designs/tokens/tokens.css', 'designs/tokens/README.md'],
  },
  {
    id: 'design-to-code',
    name: 'Design to Code',
    icon: 'code',
    status: 'active',
    agent: '@Design to Code',
    blurb: 'Convert a design specification, wireframe, or Figma reference into React, TypeScript, styles, and stories.',
    skill: '.github/skills/design-to-code/SKILL.md',
    outputs: ['prototypes/components/{ComponentName}/{ComponentName}.tsx', 'prototypes/components/{ComponentName}/{ComponentName}.module.css', 'prototypes/components/{ComponentName}/{ComponentName}.stories.tsx'],
  },
  {
    id: 'usability-test-plan',
    name: 'Usability Test Plan',
    icon: 'evaluate',
    status: 'active',
    agent: '@Usability Test Plan',
    blurb: 'Create research objectives, test tasks, moderator guidance, success measures, and observation sheets.',
    skill: '.github/skills/usability-test-plan/SKILL.md',
    outputs: ['tests/usability/{feature}-test-plan.md', 'tests/usability/{feature}-task-scripts.md', 'tests/usability/{feature}-observation-sheet.md'],
  },
  {
    id: 'component-spec',
    name: 'Component Specification',
    icon: 'cube',
    status: 'active',
    agent: '@Component Spec',
    blurb: 'Document a component API, variants, states, accessibility requirements, and design-token dependencies.',
    skill: '.github/skills/component-spec/SKILL.md',
    outputs: ['handoff/components/{ComponentName}.md'],
  },
];

function getTool(toolId) { return TOOLS.find(t => t.id === toolId); }

/* =================================================================
   SIDEBAR RENDERING
   ================================================================= */
function renderSidebar(scopeId) {
  const nav = document.getElementById('sidebarNav');
  if (!nav) return;
  const list = scopeId ? TASKS.filter(t => t.id === scopeId) : TASKS;
  nav.innerHTML = list.map(task => `
    <div class="task-group" data-task="${task.id}">
      <div class="task-header">
        <span style="flex:1;cursor:pointer" onclick="loadTask('${task.id}')">${task.title}</span>
        <span class="chevron" style="cursor:pointer" onclick="toggleTask('${task.id}')">&#9662;</span>
      </div>
      <div class="task-phases" id="task-${task.id}">
        ${task.phases.map(phase => `
          <div class="phase-group">
            <div class="phase-label" onclick="togglePhase('${task.id}-${phase.id}')">
              <span class="phase-dot ${phase.id}"></span>
              ${phase.label}
              <span style="margin-left:auto;font-size:0.6rem;color:var(--color-neutral-600)">${phase.files.length + (phase.components || []).length}</span>
            </div>
            <div class="phase-files" id="phase-${task.id}-${phase.id}">
              ${phase.files.map(file => `
                <div class="file-item ${activeFile === fullPath(task, file.path) ? 'active' : ''}"
                     onclick="loadFile('${task.id}', '${file.path}', '${phase.id}')"
                     title="${fullPath(task, file.path)}">
                  <span class="file-icon">${getFileIcon(file.path)}</span>${file.label}
                </div>
              `).join('')}
              ${(phase.components || []).map(comp => `
                <div class="file-item ${activeFile === fullPath(task, comp.demo) ? 'active' : ''}"
                     onclick="loadComponent('${task.id}', '${comp.name}', '${comp.demo}', ${JSON.stringify(comp.sources).replace(/"/g, '&quot;')})"
                     title="${comp.name} — Live Preview">
                  <span class="file-icon">${ICONS.cube}</span>${comp.name}
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function getFileIcon(path) {
  if (path.endsWith('.stories.tsx')) return ICONS.book;
  if (path.endsWith('.tsx') || path.endsWith('.ts') || path.endsWith('.jsx') || path.endsWith('.js')) return ICONS.code;
  if (path.endsWith('.css')) return ICONS.css;
  if (path.endsWith('.md')) return ICONS.doc;
  return ICONS.doc;
}

function toggleTask(taskId) {
  const el = document.getElementById(`task-${taskId}`);
  const header = el.previousElementSibling;
  if (el.style.display === 'none') {
    el.style.display = '';
    header.classList.remove('collapsed');
  } else {
    el.style.display = 'none';
    header.classList.add('collapsed');
  }
}

function togglePhase(phaseKey) {
  const el = document.getElementById(`phase-${phaseKey}`);
  if (el.style.maxHeight && el.style.maxHeight !== '0px') {
    el.style.maxHeight = '0px';
    el.style.overflow = 'hidden';
  } else {
    el.style.maxHeight = el.scrollHeight + 'px';
    el.style.overflow = 'visible';
  }
}

/* =================================================================
   TASK OVERVIEW (browse one task's full lifecycle)
   ================================================================= */

/* Phase accent colors — mirror the .phase-dot / --p-* tokens in styles.css. */
const PHASE_COLORS = {
  discover: '#5E5CE6', define: '#FF2D92', ideate: '#FF9F0A', design: '#34C759',
  prototype: '#0A84FF', test: '#FF6B35', deliver: '#AF52DE',
};

function fmtTimelineDate(s) {
  if (!s) return '';
  const d = new Date(String(s).length <= 10 ? s + 'T00:00:00' : s);
  if (isNaN(d)) return String(s);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* Build the interactive process-timeline block for a task. Returns '' when the
   task has no phases. Nodes carry their metadata in data-* attributes; hover
   cards are wired up separately by wireTaskTimeline(). */
function renderTaskTimeline(task) {
  const phases = (task.phases || []).filter(p => (p.files && p.files.length) || (p.components && p.components.length));
  if (!phases.length) return '';

  const segW = 100 / phases.length;
  const legend = phases.map(p =>
    `<span><i style="background:${PHASE_COLORS[p.id] || '#86868B'}"></i>${escapeHtml(p.label)}</span>`
  ).join('');

  let nodesHtml = '';
  phases.forEach((phase, pi) => {
    const color = PHASE_COLORS[phase.id] || '#86868B';
    const items = [];
    (phase.files || []).forEach(f => {
      const m = f.meta || {};
      items.push({
        kind: 'file', path: f.path,
        title: m.title || f.label, label: f.label,
        status: m.status || '', created: m.created || '', updated: m.updated || '',
        author: m.author || '', excerpt: m.excerpt || '',
      });
    });
    (phase.components || []).forEach(c => {
      items.push({
        kind: 'component', name: c.name, demo: c.demo || '',
        sources: c.sources || [], title: c.name, label: c.name,
        status: '', created: '', updated: '', author: '',
        excerpt: 'Live React prototype with a runnable demo.',
      });
    });

    items.forEach((it, ii) => {
      const within = (ii + 1) / (items.length + 1);
      const raw = (pi * segW) + (within * segW);
      const leftPct = 3 + raw * 0.94; // inset so edge chips don't clip
      const level = ii % 4;
      const stemH = 30 + level * 28;
      const onclick = it.kind === 'file'
        ? `loadFile('${task.id}', '${it.path}', '${phase.id}')`
        : `loadComponent('${task.id}', '${it.name}', '${it.demo}', ${JSON.stringify(it.sources).replace(/"/g, '&quot;')})`;
      nodesHtml += `
        <div class="tl-node" role="button" tabindex="0"
          style="left:${leftPct.toFixed(3)}%;color:${color}"
          aria-label="${escapeHtml(it.title)} — ${escapeHtml(phase.label)}"
          data-phase="${escapeHtml(phase.label)}" data-color="${color}"
          data-title="${escapeHtml(it.title)}" data-status="${escapeHtml(it.status)}"
          data-created="${escapeHtml(it.created)}" data-updated="${escapeHtml(it.updated)}"
          data-author="${escapeHtml(it.author)}" data-excerpt="${escapeHtml(it.excerpt)}"
          onclick="${onclick}" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.click();}">
          <span class="chip">${escapeHtml(it.label)}</span>
          <span class="dot"></span>
          <span class="stem" style="height:${stemH}px"></span>
        </div>`;
    });
  });

  const segments = phases.map(p =>
    `<div class="tl-seg ${p.id}"><span class="seg-label">${escapeHtml(p.label)}</span></div>`
  ).join('');

  return `
    <div class="task-timeline" aria-label="Design process timeline">
      <div class="tl-head">
        <div class="tl-title"><span class="spark">✦</span> Process Timeline</div>
        <div class="tl-legend">${legend}</div>
      </div>
      <div class="tl-scroll">
        <div class="tl-lane">
          <div class="tl-nodes">${nodesHtml}</div>
          <div class="tl-track">${segments}</div>
        </div>
      </div>
    </div>`;
}

/* Wire hover/focus cards for the timeline. Uses one shared floating card. */
function wireTaskTimeline() {
  const timeline = document.querySelector('.task-timeline');
  if (!timeline) return;

  let card = document.getElementById('tlCard');
  if (!card) {
    card = document.createElement('div');
    card.className = 'tl-card';
    card.id = 'tlCard';
    card.setAttribute('role', 'tooltip');
    card.innerHTML = `
      <div class="accent"></div>
      <div class="c-body">
        <div class="c-top"><span class="c-badge"></span><span class="c-status"></span></div>
        <h4></h4>
        <p class="c-desc"></p>
        <div class="c-meta"></div>
        <div class="c-open">Open artifact
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M17 7H8M17 7v9"/></svg>
        </div>
      </div>`;
    document.body.appendChild(card);
  }

  const accent = card.querySelector('.accent');
  const badge = card.querySelector('.c-badge');
  const status = card.querySelector('.c-status');
  const h4 = card.querySelector('h4');
  const desc = card.querySelector('.c-desc');
  const meta = card.querySelector('.c-meta');

  function show(node) {
    const d = node.dataset;
    accent.style.background = d.color;
    badge.textContent = d.phase;
    badge.style.background = d.color;
    if (d.status) { status.textContent = d.status; status.style.display = ''; }
    else { status.style.display = 'none'; }
    h4.textContent = d.title;
    if (d.excerpt) { desc.textContent = d.excerpt; desc.style.display = ''; }
    else { desc.style.display = 'none'; }
    const rows = [];
    if (d.created) rows.push(`<div class="c-row"><b>Created</b> <span>${escapeHtml(fmtTimelineDate(d.created))}</span></div>`);
    if (d.updated) rows.push(`<div class="c-row"><b>Updated</b> <span>${escapeHtml(fmtTimelineDate(d.updated))}</span></div>`);
    if (d.author) rows.push(`<div class="c-row"><b>Author</b> <span>${escapeHtml(d.author)}</span></div>`);
    meta.innerHTML = rows.join('');
    meta.style.display = rows.length ? '' : 'none';

    card.classList.add('show');
    const r = node.getBoundingClientRect();
    const cw = card.offsetWidth || 288;
    const ch = card.offsetHeight || 220;
    let left = r.left + r.width / 2 - cw / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - cw - 12));
    let top = r.top - ch - 14;
    if (top < 12) top = r.bottom + 14;
    card.style.left = left + 'px';
    card.style.top = top + 'px';
  }
  function hide() { card.classList.remove('show'); }

  timeline.querySelectorAll('.tl-node').forEach(node => {
    node.addEventListener('mouseenter', () => show(node));
    node.addEventListener('mouseleave', hide);
    node.addEventListener('focus', () => show(node));
    node.addEventListener('blur', hide);
  });
  timeline.querySelector('.tl-scroll')?.addEventListener('scroll', hide, { passive: true });
}

function loadTask(taskId) {
  const task = getTask(taskId);
  if (!task) return;
  activeFile = null;
  currentTaskId = taskId;
  if (!ROUTING) pushTaskRoute({ task: taskId });
  renderSidebar(taskId);
  closeSidebar();

  // Expand this task in the sidebar
  const phasesEl = document.getElementById(`task-${task.id}`);
  if (phasesEl) {
    phasesEl.style.display = '';
    phasesEl.previousElementSibling.classList.remove('collapsed');
  }

  const area = document.getElementById('contentArea');
  area.innerHTML = `
    <div class="task-overview">
      <div class="task-overview-header">
        <h1>${task.title}</h1>
        <p>${task.description}</p>
        ${sourceArtifactsForTask(task).length ? `<button type="button" class="task-overview-source" onclick="openArtifactsDialog('${task.id}')">${ICONS.folder} Artifacts</button>` : ''}
      </div>
      ${renderTaskTimeline(task)}
      ${task.phases.map(phase => `
        <div class="phase-section">
          <div class="phase-section-head">
            <span class="phase-dot ${phase.id}"></span>
            <h3>${phase.label}</h3>
            <span class="phase-count">${phase.files.length + (phase.components || []).length} item(s)</span>
          </div>
          <div class="phase-file-list">
            ${phase.files.map(file => `
              <div class="phase-file-row" onclick="loadFile('${task.id}', '${file.path}', '${phase.id}')">
                <span class="file-icon">${getFileIcon(file.path)}</span>${file.label}
              </div>
            `).join('')}
            ${(phase.components || []).map(comp => `
              <div class="phase-file-row" onclick="loadComponent('${task.id}', '${comp.name}', '${comp.demo}', ${JSON.stringify(comp.sources).replace(/"/g, '&quot;')})">
                <span class="file-icon">${ICONS.cube}</span>${comp.name} <span style="color:var(--color-neutral-400);font-size:0.75rem">— live prototype</span>
              </div>
            `).join('')}
          </div>
          ${(phase.fluentPreviewRoute || phase.fluentPreview) ? (() => {
            const src = prototypePreviewSrc(phase);
            return src ? `
            <div class="phase-live-preview">
              <div class="phase-live-preview-head">
                <span class="proto-badge">Live prototype</span>
                <a class="preview-open-new" href="${src}" target="_blank" rel="noopener">Open in new tab ↗</a>
              </div>
              <div class="preview-iframe-wrapper">
                <iframe class="preview-iframe preview-iframe--app" src="${src}" title="${task.title} — live prototype" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe>
              </div>
            </div>
          ` : '';
          })() : ''}
        </div>
      `).join('')}
    </div>
  `;
  document.getElementById('breadcrumb').innerHTML = `
    <span style="cursor:pointer" onclick="goHome()">Home</span>
    <span>›</span>
    <span class="crumb-active">${task.title}</span>
  `;
  wireTaskTimeline();
}

/* =================================================================
   ARTIFACTS DIALOG (uploaded source artifacts only)
   ================================================================= */
function sourceIcon(type) {
  if (type === 'link' || type === 'url') return ICONS.send;
  if (type === 'file' || type === 'document') return ICONS.doc;
  return ICONS.folder;
}

function openArtifactsDialog(taskId) {
  const task = getTask(taskId);
  if (!task) return;
  const items = sourceArtifactsForTask(task);
  closeArtifactsDialog();

  const rows = items.map((it) => {
    const value = escapeHtml(it.value || '');
    const isUrl = /^https?:\/\//i.test(it.value || '');
    const action = isUrl
      ? `<a class="artifacts-row-open" href="${escapeHtml(it.value)}" target="_blank" rel="noopener">Open</a>`
      : `<span class="artifacts-row-type">${escapeHtml(it.type)}</span>`;
    return `
      <div class="artifacts-row">
        <span class="artifacts-row-ico">${sourceIcon(it.type)}</span>
        <span class="artifacts-row-main">
          <span class="artifacts-row-name">${escapeHtml(it.label || 'Source')}</span>
          <small class="artifacts-row-value">${value}</small>
        </span>
        ${action}
      </div>`;
  }).join('');

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay open';
  overlay.id = 'artifactsDialog';
  overlay.innerHTML = `
    <div class="modal artifacts-modal" role="dialog" aria-modal="true" aria-label="Task artifacts">
      <div class="artifacts-modal-head">
        <div>
          <h2>Artifacts</h2>
          <p class="modal-sub">${items.length} uploaded item${items.length === 1 ? '' : 's'} for ${escapeHtml(task.title)}</p>
        </div>
        <button type="button" class="artifacts-close" aria-label="Close" onclick="closeArtifactsDialog()">&times;</button>
      </div>
      <div class="artifacts-list">${rows || '<p class="modal-sub">No uploaded artifacts yet for this task.</p>'}</div>
    </div>`;
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeArtifactsDialog();
  });
  document.body.appendChild(overlay);
  document.addEventListener('keydown', artifactsEscHandler);
}

function artifactsEscHandler(e) {
  if (e.key === 'Escape') closeArtifactsDialog();
}

function closeArtifactsDialog() {
  const el = document.getElementById('artifactsDialog');
  if (el) el.remove();
  document.removeEventListener('keydown', artifactsEscHandler);
}

/* =================================================================
   TENETS & TRAPS EVALUATION (standalone)
   ================================================================= */
function openEvalModal() {
  document.getElementById('evalPromptOutput').innerHTML = '';
  document.getElementById('evalName').value = '';
  document.getElementById('evalRef').value = '';
  document.getElementById('evalTarget').value = 'task';
  document.getElementById('evalModal').classList.add('open');
}
function closeEvalModal() {
  document.getElementById('evalModal').classList.remove('open');
}
function buildEvalPromptStr() {
  const name = document.getElementById('evalName').value.trim();
  const targetType = document.getElementById('evalTarget').value;
  const ref = document.getElementById('evalRef').value.trim();
  if (!name || !ref) {
    return { error: "Please describe what you're evaluating and provide a reference." };
  }
  const targetLabels = {
    task: 'existing task', design: 'designs / wireframes', prototype: 'React prototypes',
    figma: 'Figma file', url: 'live URL', paste: 'pasted spec / description'
  };
  const outPath = targetType === 'task'
    ? `tasks/${ref}/tests/usability/tenets-traps-evaluation-r1.md`
    : `tasks/<task-id>/tests/usability/tenets-traps-evaluation-r1.md`;
  const prompt =
`@Tester Run a UI Tenets & Traps usability evaluation of "${name}".

Target type: ${targetLabels[targetType] || targetType}
Reference: ${ref}

Use the tenets-traps-evaluation skill (.github/skills/tenets-traps-evaluation/SKILL.md) and its framework reference (reference.md). Walk the most important user tasks, then produce an evaluation report at ${outPath} with these sections: Executive Summary, Scope & Method, Scorecard, Top Issues, All Findings (table: ID | Area | Finding | Tenet (linked) | Trap(s) | Severity | Evidence), Quick Wins, Reasoning & Decisions, and a Fix & Re-evaluate Loop with a round tracker. Map every finding to an official Tenet and Trap. When done, register the report in index.html's TASKS array under the Test phase.`;
  return { prompt, agent: 'tester', taskId: targetType === 'task' ? ref : null, kind: 'eval' };
}

function generateEvalPrompt() {
  const built = buildEvalPromptStr();
  const out = document.getElementById('evalPromptOutput');
  if (built.error) {
    out.innerHTML = `<p style="color:var(--color-error-500,#dc2626);font-size:0.8rem;margin-top:8px">${built.error}</p>`;
    return;
  }
  renderCopyFallback(out, built.prompt, 'Copy this prompt to your agent');
}

function buildToolRunPrompt(tool) {
  const taskId = document.getElementById('toolTaskId')?.value.trim();
  const input = document.getElementById('toolInput')?.value.trim();
  if (!taskId || !/^[a-z0-9][a-z0-9-]*$/.test(taskId)) {
    return { error: 'Enter a task id using lowercase letters, numbers, and hyphens.' };
  }
  if (!input) {
    return { error: `Describe the target for ${tool.name}.` };
  }

  const outputPaths = tool.outputs || [];
  const outputs = outputPaths.length
    ? outputPaths.map(path => `- tasks/${taskId}/${path}`).join('\n')
    : '- Use the output path specified by the tool contract.';
  const prompt =
`@${tool.agent.replace(/^@/, '')} ${input}

Run the "${tool.name}" workflow using \`${tool.skill}\`.
Work only in \`tasks/${taskId}/\`. Create the task and required phase directory if they do not exist. Do not write to another task.

Save outputs to:
${outputs}

State any unavailable prerequisite or external dependency clearly instead of inventing results.`;
  return { prompt, agent: tool.agent, taskId, kind: `tool:${tool.id}` };
}

function generateToolPrompt(toolId) {
  const tool = getTool(toolId);
  const out = document.getElementById('toolPromptOutput');
  if (!tool || !out) return;
  const built = buildToolRunPrompt(tool);
  if (built.error) {
    out.innerHTML = `<p style="color:var(--color-error-500,#dc2626);font-size:0.8rem;margin-top:8px">${built.error}</p>`;
    return;
  }
  renderCopyFallback(out, built.prompt, 'Copy this prompt to your agent');
}

function runToolAgent(toolId) {
  const tool = getTool(toolId);
  const out = document.getElementById('toolPromptOutput');
  if (!tool || !out) return;
  const built = buildToolRunPrompt(tool);
  if (built.error) {
    out.innerHTML = `<p style="color:var(--color-error-500,#dc2626);font-size:0.8rem;margin-top:8px">${built.error}</p>`;
    return;
  }
  if (BRIDGE.online) {
    runAgent({ kind: built.kind, prompt: built.prompt, agent: built.agent, taskId: built.taskId, mountEl: out, label: `Starting ${tool.name}…`, toolId: tool.id });
  } else {
    renderCopyFallback(out, built.prompt);
  }
}

function runEvalAgent() {
  const built = buildEvalPromptStr();
  const out = document.getElementById('evalPromptOutput');
  if (built.error) {
    out.innerHTML = `<p style="color:var(--color-error-500,#dc2626);font-size:0.8rem;margin-top:8px">${built.error}</p>`;
    return;
  }
  if (BRIDGE.online) {
    runAgent({ kind: built.kind, prompt: built.prompt, agent: built.agent, taskId: built.taskId, mountEl: out, label: 'Starting Tester…' });
  } else {
    renderCopyFallback(out, built.prompt);
  }
}
function copyEvalPrompt(btn) {
  const text = document.getElementById('generatedEvalPrompt').innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
  });
}

/* =================================================================
   FILE LOADING & RENDERING
   ================================================================= */
async function loadFile(taskId, path, phaseId) {
  const task = getTask(taskId);
  const resolved = fullPath(task, path);
  activeFile = resolved;
  currentTaskId = taskId;
  if (!ROUTING) pushTaskRoute({ task: taskId, file: path, phase: phaseId });
  renderSidebar(taskId); // refresh active state
  closeSidebar();

  const area = document.getElementById('contentArea');
  area.innerHTML = '<div class="loading"><div class="spinner"></div> Loading...</div>';

  // Update breadcrumb
  const phaseName = phaseId.charAt(0).toUpperCase() + phaseId.slice(1);
  const fileName = path.split('/').pop();
  document.getElementById('breadcrumb').innerHTML = `
    <span style="cursor:pointer" onclick="goHome()">Home</span>
    <span>›</span>
    <span style="cursor:pointer" onclick="loadTask('${task.id}')">${task.title}</span>
    <span>›</span>
    <span class="badge-phase ${phaseId}">${phaseName}</span>
    <span>›</span>
    <span class="crumb-active">${fileName}</span>
  `;

  try {
    const response = await fetch(resolved);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();

    if (path.endsWith('.md')) {
      renderMarkdown(text, resolved, phaseId);
    } else {
      renderCode(text, resolved);
    }
  } catch (err) {
    area.innerHTML = `
      <div class="error-state">
        <div class="error-icon">${ICONS.warn}</div>
        <p>Could not load <strong>${resolved}</strong></p>
        <p style="font-size:0.85rem;margin-top:8px;color:var(--color-neutral-400)">
          Make sure you're serving this page via a local server.<br>
          Run: <code>python3 -m http.server 8080</code> from the project root.
        </p>
      </div>
    `;
  }
}

function renderMarkdown(raw, path, phaseId) {
  const area = document.getElementById('contentArea');

  // Parse frontmatter
  let body = raw;
  let frontmatter = null;
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (fmMatch) {
    frontmatter = parseFrontmatter(fmMatch[1]);
    body = fmMatch[2];
  }

  // Configure marked
  marked.setOptions({
    gfm: true,
    breaks: false,
    highlight: function(code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    }
  });

  const html = marked.parse(body);

  let fmHtml = '';
  if (frontmatter) {
    const items = Object.entries(frontmatter)
      .filter(([k]) => !['title', 'related'].includes(k))
      .map(([k, v]) => `<div class="fm-item"><span class="fm-label">${k}:</span><span class="fm-value">${v}</span></div>`)
      .join('');
    fmHtml = `<div class="frontmatter">${items}</div>`;
  }

  // Stash the raw doc so the toolbar CTAs can export / copy it
  const fileName = path.split('/').pop();
  currentDoc = { raw, path, fileName };

  const toolbar = `
    <div class="doc-toolbar">
      <div class="doc-toolbar-name">${ICONS.doc}<span>${fileName}</span></div>
      <div class="doc-toolbar-actions">
        <button class="doc-cta" onclick="copyDocMarkdown(this)" title="Copy the document as Markdown">${ICONS.copy} Copy</button>
        <button class="doc-cta" onclick="downloadDocMarkdown()" title="Download as a Markdown file">${ICONS.download} .md</button>
        <button class="doc-cta" onclick="downloadDocCsv()" title="Download tables as CSV">${ICONS.download} .csv</button>
      </div>
    </div>`;

  area.innerHTML = `<div class="doc-content">${toolbar}${fmHtml}${html}</div>`;

  // Re-highlight any code blocks
  area.querySelectorAll('pre code').forEach(block => {
    hljs.highlightElement(block);
  });

  // Convert checkbox list items
  area.querySelectorAll('li').forEach(li => {
    const text = li.innerHTML;
    if (text.startsWith('[ ] ')) {
      li.innerHTML = `<input type="checkbox" disabled> ${text.slice(4)}`;
    } else if (text.startsWith('[x] ') || text.startsWith('[X] ')) {
      li.innerHTML = `<input type="checkbox" checked disabled> ${text.slice(4)}`;
    }
  });

  // Polish tables: severity/status -> pills, tenet -> chips
  enhanceDocTables(area);

  // Format the "Top Issues" list into impact cards
  enhanceTopIssues(area);
}

/* Turn severity/status cells into pills and tenet cells into chips */
function enhanceDocTables(area) {
  const sevMap = { critical: 'critical', high: 'high', medium: 'medium', low: 'low' };
  area.querySelectorAll('.doc-content table').forEach(table => {
    if (!table.parentElement.classList.contains('table-wrap')) {
      const wrap = document.createElement('div');
      wrap.className = 'table-wrap';
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    }
    const headers = [...table.querySelectorAll('thead th')].map(th =>
      th.textContent.trim().toLowerCase());
    const sevCol = headers.findIndex(h => h === 'severity' || h === 'status' || h === 'worst severity');
    const tenetCol = headers.findIndex(h => h.startsWith('tenet'));

    table.querySelectorAll('tbody tr').forEach(tr => {
      const cells = tr.querySelectorAll('td');
      if (sevCol > -1 && cells[sevCol]) {
        const cell = cells[sevCol];
        const key = cell.textContent.trim().toLowerCase().replace(/[^a-z]/g, '');
        const cls = sevMap[key];
        if (cls) cell.innerHTML = `<span class="sev-pill ${cls}">${cell.textContent.trim()}</span>`;
      }
      if (tenetCol > -1 && cells[tenetCol]) {
        const cell = cells[tenetCol];
        const link = cell.querySelector('a');
        if (link) {
          link.classList.add('tnt-chip');
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        } else if (cell.textContent.trim()) {
          cell.innerHTML = `<span class="tnt-chip">${cell.textContent.trim()}</span>`;
        }
      }
    });
  });
}

/* Turn the "Top Issues" ordered list into ranked impact cards */
function enhanceTopIssues(area) {
  const sevMap = { critical: 'critical', high: 'high', medium: 'medium', low: 'low' };
  const heading = [...area.querySelectorAll('.doc-content h2')].find(h =>
    /top\s+issues/i.test(h.textContent));
  if (!heading) return;

  // Find the first <ol> after the heading (skipping intro paragraphs)
  let node = heading.nextElementSibling;
  while (node && node.tagName !== 'OL' && node.tagName !== 'H2') node = node.nextElementSibling;
  if (!node || node.tagName !== 'OL' || node.dataset.enhanced) return;

  const items = [...node.querySelectorAll(':scope > li')];
  if (!items.length) return;

  const rows = items.map((li, i) => {
    const strong = li.querySelector('strong');
    const lead = (strong ? strong.textContent : li.textContent).trim();
    const sevMatch = lead.match(/\(([^)]+)\)\s*\.?\s*$/);
    const sevKey = sevMatch ? sevMatch[1].toLowerCase().replace(/[^a-z]/g, '') : '';
    const cls = sevMap[sevKey];
    const title = lead.replace(/\s*\(([^)]+)\)\s*\.?\s*$/, '').trim();
    let desc = li.textContent.trim();
    if (strong) desc = desc.slice(strong.textContent.length).trim();
    const pill = cls
      ? `<span class="sev-pill ${cls}">${sevMatch[1].trim()}</span>`
      : '';
    const num = String(i + 1).padStart(2, '0');
    return `<div class="ti-row">
      <span class="ti-num">${num}</span>
      <div class="ti-body">
        <div class="ti-title">${title}</div>
        ${desc ? `<p class="ti-desc">${desc}</p>` : ''}
      </div>
      ${pill}
    </div>`;
  }).join('');

  const card = document.createElement('div');
  card.className = 'top-issues';
  card.dataset.enhanced = '1';
  card.innerHTML = `${rows}`;
  node.replaceWith(card);
}

/* =================================================================
   DOCUMENT EXPORT / COPY (toolbar CTAs)
   ================================================================= */
let currentDoc = null;

function ctaDone(btn, label) {
  if (!btn) return;
  const original = btn.innerHTML;
  btn.classList.add('is-done');
  btn.innerHTML = `${ICONS.check} ${label}`;
  setTimeout(() => { btn.innerHTML = original; btn.classList.remove('is-done'); }, 1600);
}

function copyDocMarkdown(btn) {
  if (!currentDoc) return;
  navigator.clipboard.writeText(currentDoc.raw).then(() => ctaDone(btn, 'Copied'));
}

function triggerDownload(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadDocMarkdown() {
  if (!currentDoc) return;
  triggerDownload(currentDoc.raw, currentDoc.fileName, 'text/markdown;charset=utf-8');
}

/* Convert all Markdown tables in the doc to CSV (sections separated by a blank line) */
function downloadDocCsv() {
  if (!currentDoc) return;
  const lines = currentDoc.raw.split('\n');
  const csvBlocks = [];
  let block = [];
  const flush = () => {
    if (block.length >= 2) {
      // Drop the |---|---| header-separator row (always the 2nd line of a block)
      const cleaned = block.filter((r, i) => !(i === 1 && /^[\s|:-]+$/.test(r)));
      const csv = cleaned.map(r =>
        r.trim().replace(/^\||\|$/g, '').split('|')
          .map(c => {
            const v = c.trim().replace(/"/g, '""');
            return /[",\n]/.test(v) ? `"${v}"` : v;
          }).join(',')
      ).join('\n');
      csvBlocks.push(csv);
    }
    block = [];
  };
  lines.forEach(line => {
    if (/^\s*\|.*\|\s*$/.test(line)) {
      block.push(line);
    } else {
      flush();
    }
  });
  flush();

  if (csvBlocks.length === 0) {
    alert('No tables found in this document to export as CSV.');
    return;
  }
  const csv = csvBlocks.join('\n\n');
  const name = currentDoc.fileName.replace(/\.md$/, '') + '.csv';
  triggerDownload(csv, name, 'text/csv;charset=utf-8');
}

function renderCode(text, path) {
  const area = document.getElementById('contentArea');
  const ext = path.split('.').pop();
  const langMap = { tsx: 'typescript', ts: 'typescript', jsx: 'javascript', js: 'javascript', css: 'css', json: 'json' };
  const lang = langMap[ext] || ext;
  const fileName = path.split('/').pop();

  let highlighted;
  try {
    highlighted = hljs.highlight(text, { language: lang }).value;
  } catch {
    highlighted = hljs.highlightAuto(text).value;
  }

  area.innerHTML = `
    <div class="code-viewer">
      <div class="code-viewer-header">
        <span class="file-name">${fileName}</span>
        <span class="lang-badge">${lang.toUpperCase()}</span>
      </div>
      <pre><code>${highlighted}</code></pre>
    </div>
  `;
}

/* =================================================================
   COMPONENT PREVIEW (Prototype phase)
   ================================================================= */
async function loadComponent(taskId, name, demoPath, sources) {
  const task = getTask(taskId);
  const resolvedDemo = fullPath(task, demoPath);
  activeFile = resolvedDemo;
  currentTaskId = taskId;
  if (!ROUTING) pushTaskRoute({ task: taskId, component: name });
  renderSidebar(taskId);
  closeSidebar();

  const area = document.getElementById('contentArea');
  area.innerHTML = '<div class="loading"><div class="spinner"></div> Loading...</div>';

  // Update breadcrumb
  document.getElementById('breadcrumb').innerHTML = `
    <span style="cursor:pointer" onclick="goHome()">Home</span>
    <span>›</span>
    <span style="cursor:pointer" onclick="loadTask('${task.id}')">${task.title}</span>
    <span>›</span>
    <span class="badge-phase prototype">Prototype</span>
    <span>›</span>
    <span class="crumb-active">${name}</span>
  `;

  // Build tab buttons
  const tabButtons = [
    `<button class="preview-tab active" onclick="switchPreviewTab(this, 'preview-pane-live')">Preview</button>`,
    ...sources.map((s, i) =>
      `<button class="preview-tab" onclick="switchPreviewTab(this, 'preview-pane-${i}')">${s.label}</button>`
    ),
  ].join('');

  // Build source panes (initially hidden)
  let sourcePanes = '';
  for (let i = 0; i < sources.length; i++) {
    try {
      const resp = await fetch(fullPath(task, sources[i].path));
      const code = await resp.text();
      const ext = sources[i].path.split('.').pop();
      const langMap = { tsx: 'typescript', ts: 'typescript', css: 'css' };
      const lang = langMap[ext] || ext;
      let highlighted;
      try { highlighted = hljs.highlight(code, { language: lang }).value; }
      catch { highlighted = hljs.highlightAuto(code).value; }
      sourcePanes += `
        <div id="preview-pane-${i}" class="preview-source-pane">
          <div class="code-viewer">
            <div class="code-viewer-header">
              <span class="file-name">${sources[i].path.split('/').pop()}</span>
              <span class="lang-badge">${lang.toUpperCase()}</span>
            </div>
            <pre><code>${highlighted}</code></pre>
          </div>
        </div>`;
    } catch {
      sourcePanes += `<div id="preview-pane-${i}" class="preview-source-pane"><div class="error-state">Could not load source</div></div>`;
    }
  }

  area.innerHTML = `
    <div class="component-preview">
      <div class="component-preview-header">
        <h2>${name}</h2>
        <span class="proto-badge">Interactive Prototype</span>
      </div>
      <div class="preview-tabs">${tabButtons}</div>
      <div id="preview-pane-live" class="preview-source-pane active">
        <div class="preview-iframe-wrapper">
          <iframe class="preview-iframe" src="${resolvedDemo}" title="${name} preview" sandbox="allow-scripts allow-same-origin"></iframe>
        </div>
      </div>
      ${sourcePanes}
    </div>
  `;

  // Auto-resize iframe to content
  const iframe = area.querySelector('.preview-iframe');
  iframe.addEventListener('load', () => {
    try {
      const h = iframe.contentDocument.documentElement.scrollHeight;
      iframe.style.height = Math.max(h + 32, 300) + 'px';
    } catch { /* cross-origin, keep default height */ }
  });
}

/* Render the built Fluent prototype static export inside the task page. The
   preview URL points at prototype-workspace/out/<taskId>/index.html, served by
   the bridge (with its export-asset fallback). Full app page → give it a tall
   fixed-height frame with its own scroll rather than auto-resizing. */
function loadFluentPreview(taskId, previewUrl) {
  const task = getTask(taskId);
  activeFile = previewUrl;
  currentTaskId = taskId;
  if (!ROUTING) pushTaskRoute({ task: taskId, component: 'fluent-prototype' });
  renderSidebar(taskId);
  closeSidebar();

  document.getElementById('breadcrumb').innerHTML = `
    <span style="cursor:pointer" onclick="goHome()">Home</span>
    <span>›</span>
    <span style="cursor:pointer" onclick="loadTask('${task.id}')">${task.title}</span>
    <span>›</span>
    <span class="badge-phase prototype">Prototype</span>
    <span>›</span>
    <span class="crumb-active">Fluent prototype</span>
  `;

  const area = document.getElementById('contentArea');
  area.innerHTML = `
    <div class="component-preview">
      <div class="component-preview-header">
        <h2>Fluent prototype</h2>
        <span class="proto-badge">Live preview</span>
        <a class="preview-open-new" href="${previewUrl}" target="_blank" rel="noopener" style="margin-left:auto;font-size:0.8rem">Open in new tab ↗</a>
      </div>
      <div class="preview-source-pane active">
        <div class="preview-iframe-wrapper">
          <iframe class="preview-iframe preview-iframe--app" src="${previewUrl}" title="Fluent prototype for ${task.title}" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe>
        </div>
      </div>
    </div>
  `;
}

function switchPreviewTab(btn, paneId) {
  // Deactivate all tabs
  btn.parentElement.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  // Hide all panes, show selected
  const container = btn.closest('.component-preview');
  container.querySelectorAll('.preview-source-pane').forEach(p => p.classList.remove('active'));
  document.getElementById(paneId).classList.add('active');
}

function parseFrontmatter(raw) {
  const result = {};
  raw.split('\n').forEach(line => {
    const match = line.match(/^(\w[\w-]*)\s*:\s*(.+)/);
    if (match) {
      let val = match[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
      result[match[1]] = val;
    }
  });
  return result;
}

/* =================================================================
   MOBILE SIDEBAR
   ================================================================= */
function closeSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebarOverlay');
  if (sb) sb.classList.remove('open');
  if (ov) ov.classList.remove('open');
}

/* Wire mobile hamburger / overlay if present on this page */
(function wireMobileSidebar() {
  const burger = document.getElementById('hamburgerBtn');
  const overlay = document.getElementById('sidebarOverlay');
  if (burger) {
    burger.addEventListener('click', () => {
      const sb = document.getElementById('sidebar');
      if (sb) sb.classList.toggle('open');
      if (overlay) overlay.classList.toggle('open');
    });
  }
  if (overlay) overlay.addEventListener('click', closeSidebar);
})();

/* =================================================================
   MULTI-PAGE NAVIGATION
   index.html  = Home          (global sidebar: Tools + Tasks)
   task.html   = Task workspace (task-specific sidebar)
   tool.html   = Tool page      (global sidebar)
   ================================================================= */
function goHome() { location.href = 'index.html'; }
function openTaskPage(taskId) { location.href = `task.html?task=${encodeURIComponent(taskId)}`; }
function openToolPage(toolId) { location.href = `tool.html?tool=${encodeURIComponent(toolId)}`; }

/* ---- Global sidebar (Home + Tool pages): Tools above Tasks ---- */
function railCollapsed() { return localStorage.getItem('dl-rail-collapsed') === '1'; }

let CURRENT_SCOPE = null;
function rebuildSidebar() {
  if (document.getElementById('globalNav')) buildGlobalSidebar(CURRENT_SCOPE || { type: 'home' });
}
function titleCaseId(id) {
  return String(id).replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function buildGlobalSidebar(active) {
  CURRENT_SCOPE = active || CURRENT_SCOPE;
  const sb = document.getElementById('sidebar');
  const nav = document.getElementById('globalNav');
  if (!sb || !nav) return;
  if (railCollapsed()) sb.classList.add('rail-collapsed');

  const taskItems = TASKS.map(task => {
    const isActive = active && active.type === 'task' && active.id === task.id;
    return `
      <a class="nav-item ${isActive ? 'active' : ''}"
         onclick="openTaskPage('${task.id}')" title="${task.title}">
        <span class="nav-item-label">${task.title}</span>
      </a>`;
  }).join('');

  nav.innerHTML = `
    <div class="nav-section">
      <div class="nav-section-label">Tasks</div>
      ${taskItems || '<div class="nav-empty">No tasks yet</div>'}
    </div>`;
}

function toggleRail() {
  const sb = document.getElementById('sidebar');
  if (!sb) return;
  const collapsed = sb.classList.toggle('rail-collapsed');
  localStorage.setItem('dl-rail-collapsed', collapsed ? '1' : '0');
}

/* =================================================================
   TASK PAGE (task.html) — deep-link routing via query params
   ================================================================= */
function pushTaskRoute(params, replace) {
  const u = new URL(location.href);
  u.search = '';
  u.searchParams.set('task', params.task);
  if (params.file) u.searchParams.set('file', params.file);
  if (params.phase) u.searchParams.set('phase', params.phase);
  if (params.component) u.searchParams.set('component', params.component);
  history[replace ? 'replaceState' : 'pushState'](params, '', u.pathname + u.search);
}

function findComponent(task, name) {
  for (const phase of task.phases) {
    const c = (phase.components || []).find(x => x.name === name);
    if (c) return c;
  }
  return null;
}

function renderTaskRoute() {
  const p = new URLSearchParams(location.search);
  const taskId = p.get('task');
  const task = getTask(taskId);
  if (!task) { goHome(); return; }
  ROUTING = true;
  if (p.get('file')) {
    loadFile(taskId, p.get('file'), p.get('phase') || 'discover');
  } else if (p.get('component')) {
    const c = findComponent(task, p.get('component'));
    if (c) loadComponent(taskId, c.name, c.demo, c.sources);
    else loadTask(taskId);
  } else {
    loadTask(taskId);
  }
  ROUTING = false;
}

async function initTaskPage() {
  await bridgeHealth();
  await refreshTasks();
  renderTaskRoute();
  window.addEventListener('popstate', renderTaskRoute);
}

/* =================================================================
   HOME PAGE (index.html) — command box
   ================================================================= */
/* ---- Lifecycle stages → owning agent + output dir ---- */
const STAGES = [
  { id: 'discover',  label: 'Discover',  dir: 'research',    agent: 'researcher', desc: 'Research & competitive analysis' },
  { id: 'define',    label: 'Define',    dir: 'strategy',    agent: 'strategist', desc: 'Problem framing, personas, PRD' },
  { id: 'ideate',    label: 'Ideate',    dir: 'ideation',    agent: 'ideator',    desc: 'Concepts & prioritization' },
  { id: 'design',    label: 'Design',    dir: 'designs',     agent: 'designer',   desc: 'Wireframes, tokens, specs' },
  { id: 'prototype', label: 'Prototype', dir: 'prototypes',  agent: 'prototyper', desc: 'React components & demos' },
  { id: 'test',      label: 'Test',      dir: 'tests',       agent: 'tester',     desc: 'Usability & accessibility' },
  { id: 'deliver',   label: 'Deliver',   dir: 'handoff',     agent: 'handoff',    desc: 'Implementation specs & handoff' },
];

const AGENT_DISPLAY = {
  'design-lead': 'Design Lead', researcher: 'Researcher', strategist: 'Strategist',
  ideator: 'Ideator', designer: 'Designer', prototyper: 'Prototyper',
  tester: 'Tester', handoff: 'Handoff', 'security-auditor': 'Security Auditor',
};
function agentDisplayName(slug) { return AGENT_DISPLAY[slug] || 'Design Lead'; }

/* =================================================================
   TOOL REGISTRY — loaded dynamically from /api/tools. Bridge scans
   .github/skills/ for tool.json files. Falls back to empty offline.
   ================================================================= */
let TOOL_REGISTRY = [];

async function loadToolRegistry() {
  try {
    const res = await fetch('/api/tools');
    if (!res.ok) return;
    const { tools } = await res.json();
    TOOL_REGISTRY = Array.isArray(tools) ? tools : [];
  } catch { /* bridge offline — registry stays empty */ }
}

function getToolsForStage(stageId) {
  return TOOL_REGISTRY.filter(t => Array.isArray(t.stages) && t.stages.includes(stageId));
}

/* ---- Composer source artifacts (attached via + menu) ---- */
let HOME_SOURCES = []; // { type:'link'|'file', label, value, inline?, mime?, encoding?, content? }
const MAX_INLINE_BYTES = 100 * 1024;
const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;
let HOME_SOURCE_PENDING = 0;

function commandText() {
  const box = document.getElementById('commandInput');
  return box ? box.value.trim() : '';
}

function fillCommand(text) {
  const box = document.getElementById('commandInput');
  if (box) { box.value = text; box.focus(); }
}

/* ---------- Source CTAs ---------- */
function closeComposerMenus() {
  const runMenu = document.getElementById('runMenu');
  if (runMenu) runMenu.hidden = true;
  const caret = document.querySelector('.run-split .cmd-primary[aria-haspopup]');
  if (caret) caret.setAttribute('aria-expanded', 'false');
}

function pickDocumentArtifact() {
  const input = document.getElementById('artifactFileInput');
  if (input) input.click();
}

function openLinkSourceModal() {
  const modal = document.getElementById('linkSourceModal');
  const input = document.getElementById('linkSourceInput');
  if (!modal || !input) return;
  input.value = '';
  modal.classList.add('open');
  setTimeout(() => input.focus(), 0);
}

function closeLinkSourceModal() {
  const modal = document.getElementById('linkSourceModal');
  if (modal) modal.classList.remove('open');
}

function submitLinkSource() {
  const input = document.getElementById('linkSourceInput');
  if (!input) return;
  const trimmed = input.value.trim();
  if (!trimmed) return;
  HOME_SOURCES.push({ type: 'link', label: trimmed, value: trimmed, inline: false });
  renderHomeSources();
  closeLinkSourceModal();
}

function onArtifactFiles(e) {
  const files = Array.from(e.target.files || []);
  files.forEach(file => {
    const isText = /\.(md|markdown|txt|json|csv|tsx?|jsx?|css|html?|ya?ml)$/i.test(file.name) || file.type.startsWith('text/');
    const source = {
      type: 'file',
      label: file.name,
      inline: false,
      mime: file.type || 'application/octet-stream',
      value: '',
      encoding: null,
      content: null,
    };

    if (isText && file.size <= MAX_INLINE_BYTES) {
      HOME_SOURCE_PENDING += 1;
      const reader = new FileReader();
      reader.onload = () => {
        source.inline = true;
        source.value = String(reader.result || '');
        source.encoding = 'utf8';
        source.content = source.value;
        HOME_SOURCE_PENDING = Math.max(0, HOME_SOURCE_PENDING - 1);
        renderHomeSources();
      };
      reader.onerror = () => {
        source.value = `(file could not be read: ${file.name})`;
        HOME_SOURCE_PENDING = Math.max(0, HOME_SOURCE_PENDING - 1);
        renderHomeSources();
      };
      HOME_SOURCES.push(source);
      reader.readAsText(file);
    } else {
      source.value = `(${isText ? 'large' : 'binary'} file, ${Math.round(file.size / 1024)} KB)`;
      HOME_SOURCES.push(source);
      renderHomeSources();

      if (file.size <= MAX_UPLOAD_BYTES) {
        HOME_SOURCE_PENDING += 1;
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = String(reader.result || '');
          const comma = dataUrl.indexOf(',');
          if (comma !== -1) {
            source.encoding = 'base64';
            source.content = dataUrl.slice(comma + 1);
            source.value = `${source.value} ready to feed`;
          }
          HOME_SOURCE_PENDING = Math.max(0, HOME_SOURCE_PENDING - 1);
          renderHomeSources();
        };
        reader.onerror = () => {
          source.value = `${source.value} (could not encode)`;
          HOME_SOURCE_PENDING = Math.max(0, HOME_SOURCE_PENDING - 1);
          renderHomeSources();
        };
        reader.readAsDataURL(file);
      } else {
        source.value = `${source.value} (too large to upload inline)`;
        renderHomeSources();
      }
    }
  });
  e.target.value = '';
}

function pickLinkArtifact() {
  openLinkSourceModal();
}

function removeHomeSource(i) {
  HOME_SOURCES.splice(i, 1);
  renderHomeSources();
}

function renderHomeSources() {
  const wrap = document.getElementById('composerSources');
  if (!wrap) return;
  if (!HOME_SOURCES.length) { wrap.hidden = true; wrap.innerHTML = ''; return; }
  wrap.hidden = false;
  const chips = HOME_SOURCES.map((s, i) => `
    <span class="source-chip" title="${escapeHtml(s.label)}">
      <span class="source-chip-ico">${s.type === 'file' ? ICONS.doc : ICONS.send}</span>
      <span class="source-chip-name">${escapeHtml(s.label)}</span>
      <button type="button" class="source-chip-x" aria-label="Remove" onclick="removeHomeSource(${i})">&times;</button>
    </span>`).join('');

  wrap.innerHTML = chips;
}

function composerSourcesBlock() {
  if (!HOME_SOURCES.length) return '';
  const lines = HOME_SOURCES.map((s, i) => {
    if (s.type === 'file' && s.inline) {
      return `${i + 1}. [file: ${s.label}]\n"""\n${s.value}\n"""`;
    }
    return `${i + 1}. [${s.type}] ${s.value}`;
  });
  return `\n\nSource artifacts:\n${lines.join('\n')}`;
}

/**
 * Derive a stable task slug from a URL so the coordinator works in a
 * predictable, URL-specific directory instead of guessing from disk.
 * e.g. https://hits.microsoft.com/study/6047768 → "hits-study-6047768"
 */
function slugFromUrl(raw) {
  try {
    const u = new URL(raw);
    const parts = u.pathname.split('/').filter(Boolean);
    const last  = parts[parts.length - 1] || '';
    const domain = u.hostname.split('.').find(p => p !== 'www' && p.length > 1) || u.hostname.split('.')[0];
    const prefix = parts.length > 1 ? parts[parts.length - 2] : domain;
    return `${domain}-${prefix}-${last}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60)
           || null;
  } catch { return null; }
}

function slugFromText(raw) {
  const slug = String(raw || '')
    .toLowerCase()
    .replace(/\.[a-z0-9]{1,6}$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return slug || null;
}

/** Find the first URL in a string of text or attached sources. */
function extractTaskId() {
  // Prefer an explicitly attached link source.
  const link = HOME_SOURCES.find(s => s.type === 'link');
  if (link) return slugFromUrl(link.value);
  // Fall back to the first attached file name.
  const file = HOME_SOURCES.find(s => s.type === 'file' && s.label);
  if (file) return slugFromText(file.label);
  // Fall back to the first URL found anywhere in the command text.
  const text = commandText();
  const match = text.match(/https?:\/\/\S+/);
  return match ? slugFromUrl(match[0]) : null;
}

function ensureComposerSourcesReady(out) {
  if (HOME_SOURCE_PENDING > 0) {
    if (out) out.innerHTML = '<p class="command-hint-error">Finishing attachment processing. Please run again in a second.</p>';
    return false;
  }
  return true;
}

/* ---------- Run menu (lifecycle / stage / tool) ---------- */

/* Per-stage glyphs for the rich run popover (stroke style, 24×24). */
const STAGE_GLYPHS = {
  discover: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  define: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.6"/>',
  ideate: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1h6c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/>',
  design: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  prototype: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  test: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  deliver: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
};
function stageGlyph(id) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${STAGE_GLYPHS[id] || STAGE_GLYPHS.discover}</svg>`;
}

const STAGE_COLORS = {
  discover: '#5E5CE6', define: '#FF2D92', ideate: '#FF9F0A', design: '#34C759',
  prototype: '#0A84FF', test: '#FF6B35', deliver: '#AF52DE',
};
/* Deepened, high-contrast variants for icon glyphs / badge text on light tinted chips (WCAG AA). */
const STAGE_COLORS_DEEP = {
  discover: '#3B39AD', define: '#B10E63', ideate: '#8A5200', design: '#167A36',
  prototype: '#0A5FC0', test: '#B23C17', deliver: '#7E2AAB',
};
function stageColor(id) { return STAGE_COLORS[id] || '#0071E3'; }
function stageColorDeep(id) { return STAGE_COLORS_DEEP[id] || '#0057B8'; }

let RUN_TOOL_QUERY = '';
let RUN_TOOL_STAGE = 'all';
/* Multi-select sets for sequential runs (insertion order preserved). */
const RUN_STAGE_SELECTED = new Set();
const RUN_TOOL_SELECTED = new Set();

function toggleRunMenu(e) {
  if (e) e.stopPropagation();
  const m = document.getElementById('runMenu');
  const wasOpen = m && !m.hidden;
  closeComposerMenus();
  if (m && !wasOpen) {
    renderRunMenuRoot();
    m.hidden = false;
    const btn = document.querySelector('.run-split .cmd-primary');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  }
}

/* Render a popover view with a directional slide transition. */
function setRunView(view, dir, html) {
  const m = document.getElementById('runMenu');
  if (!m) return;
  m.classList.remove('run-view-root', 'run-view-stages', 'run-view-tools');
  m.classList.add('run-view-' + view);
  m.innerHTML = `<div class="run-pop-view" data-dir="${dir || 'fwd'}">${html}</div>`;
}

function renderRunMenuRoot() {
  const steps = ['discover', 'define', 'ideate', 'design', 'test', 'deliver'];
  const stepper = steps.map((id, i) => {
    const s = STAGES.find(x => x.id === id);
    return `<span class="run-step"><i class="run-step-dot" style="--sc:${stageColor(id)}"></i><em>${s ? s.label : id}</em></span>${i < steps.length - 1 ? '<span class="run-step-line"></span>' : ''}`;
  }).join('');

  const html = `
    <div class="run-pop-head">
      <h3>Choose how to run</h3>
      <p>Select the level of guidance for this task</p>
    </div>
    <button type="button" class="run-card run-card--hero is-recommended" role="menuitem" onclick="runComposer('lifecycle')">
      <span class="run-card-ico">${ICONS.loop}</span>
      <span class="run-card-main">
        <span class="run-card-title">Run end-to-end <span class="run-badge">Recommended</span></span>
        <span class="run-card-sub">Guided through every stage</span>
        <span class="run-stepper">${stepper}</span>
      </span>
    </button>
    <button type="button" class="run-card" role="menuitem" onclick="renderRunMenuStages()">
      <span class="run-card-ico">${stageGlyph('define')}</span>
      <span class="run-card-main">
        <span class="run-card-title">Run stage(s)</span>
        <span class="run-card-sub">Focus on a specific phase</span>
      </span>
      <span class="run-card-chev">${ICONS.chevronRight || '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>'}</span>
    </button>
    <button type="button" class="run-card" role="menuitem" onclick="renderRunMenuTools()">
      <span class="run-card-ico">${ICONS.cube}</span>
      <span class="run-card-main">
        <span class="run-card-title">Run tool(s) or framework(s)</span>
        <span class="run-card-sub">Jump directly into a design method</span>
      </span>
      <span class="run-card-chev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
    </button>`;
  setRunView('root', 'back', html);
}

function renderRunMenuStages() {
  RUN_STAGE_SELECTED.clear();
  const cards = STAGES.map((s, i) => {
    const count = getToolsForStage(s.id).length;
    return `
      <button type="button" class="run-stage-card" role="menuitemcheckbox" aria-checked="false" onclick="toggleStageSelect('${s.id}', this)">
        <span class="run-stage-num">${i + 1}</span>
        <span class="run-stage-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
        <span class="run-stage-ico" style="--sc:${stageColor(s.id)};--scd:${stageColorDeep(s.id)}">${stageGlyph(s.id)}</span>
        <span class="run-stage-label">${s.label}</span>
        <span class="run-stage-desc">${s.desc}</span>
        ${count ? `<span class="run-stage-count">${count} tool${count === 1 ? '' : 's'}</span>` : ''}
      </button>`;
  }).join('');

  const html = `
    <div class="run-pop-head run-pop-head--nav">
      <button type="button" class="run-back" onclick="renderRunMenuRoot()" aria-label="Back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div><h3>Choose stages</h3><p>Select one or more to run in sequence</p></div>
    </div>
    <div class="run-stage-grid">${cards}</div>
    <div class="run-seq-bar">
      <span class="run-seq-count" id="runStageCount">None selected</span>
      <button type="button" class="run-seq-run" id="runStageRun" disabled onclick="runSelectedStages()">Run</button>
    </div>`;
  setRunView('stages', 'fwd', html);
}

function toggleStageSelect(id, el) {
  if (RUN_STAGE_SELECTED.has(id)) RUN_STAGE_SELECTED.delete(id);
  else RUN_STAGE_SELECTED.add(id);
  const on = RUN_STAGE_SELECTED.has(id);
  if (el) { el.classList.toggle('is-selected', on); el.setAttribute('aria-checked', on ? 'true' : 'false'); }
  const n = RUN_STAGE_SELECTED.size;
  const countEl = document.getElementById('runStageCount');
  const runEl = document.getElementById('runStageRun');
  if (countEl) countEl.textContent = n ? `${n} stage${n === 1 ? '' : 's'} selected` : 'None selected';
  if (runEl) { runEl.disabled = n === 0; runEl.textContent = n > 1 ? `Run ${n} in sequence` : 'Run'; }
}

function runSelectedStages() {
  const ids = STAGES.filter(s => RUN_STAGE_SELECTED.has(s.id)).map(s => s.id);
  if (!ids.length) return;
  closeComposerMenus();
  runSequence('stage', ids);
}

function renderRunMenuTools() {
  RUN_TOOL_QUERY = '';
  RUN_TOOL_STAGE = 'all';
  RUN_TOOL_SELECTED.clear();
  const tabs = [{ id: 'all', label: 'All stages' }, ...STAGES.map(s => ({ id: s.id, label: s.label }))]
    .map(t => `<button type="button" class="run-tool-tab ${t.id === 'all' ? 'active' : ''}" data-stage="${t.id}" onclick="setRunToolStage('${t.id}')">${t.label}</button>`)
    .join('');

  const html = `
    <div class="run-pop-head run-pop-head--nav">
      <button type="button" class="run-back" onclick="renderRunMenuRoot()" aria-label="Back">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div><h3>Choose tools or frameworks</h3><p>Select one or more to run in sequence</p></div>
    </div>
    <div class="run-tool-search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="text" id="runToolSearch" placeholder="Search tools or frameworks" oninput="setRunToolQuery(this.value)" autocomplete="off">
    </div>
    <div class="run-tool-tabs">${tabs}</div>
    <div class="run-tool-results" id="runToolResults"></div>
    <div class="run-seq-bar">
      <span class="run-seq-count" id="runToolCount">None selected</span>
      <button type="button" class="run-seq-run" id="runToolRun" disabled onclick="runSelectedTools()">Run</button>
    </div>`;
  setRunView('tools', 'fwd', html);
  updateRunToolResults();
}

function toggleToolSelect(id, el) {
  if (RUN_TOOL_SELECTED.has(id)) RUN_TOOL_SELECTED.delete(id);
  else RUN_TOOL_SELECTED.add(id);
  const on = RUN_TOOL_SELECTED.has(id);
  if (el) { el.classList.toggle('is-selected', on); el.setAttribute('aria-checked', on ? 'true' : 'false'); }
  updateRunToolSelCount();
}

function updateRunToolSelCount() {
  const n = RUN_TOOL_SELECTED.size;
  const countEl = document.getElementById('runToolCount');
  const runEl = document.getElementById('runToolRun');
  if (countEl) countEl.textContent = n ? `${n} tool${n === 1 ? '' : 's'} selected` : 'None selected';
  if (runEl) { runEl.disabled = n === 0; runEl.textContent = n > 1 ? `Run ${n} in sequence` : 'Run'; }
}

function runSelectedTools() {
  const ids = [...RUN_TOOL_SELECTED];
  if (!ids.length) return;
  closeComposerMenus();
  runSequence('tool', ids);
}

function setRunToolStage(stage) {
  RUN_TOOL_STAGE = stage;
  document.querySelectorAll('.run-tool-tab').forEach(t => t.classList.toggle('active', t.dataset.stage === stage));
  updateRunToolResults();
}

function setRunToolQuery(q) {
  RUN_TOOL_QUERY = String(q || '').toLowerCase().trim();
  updateRunToolResults();
}

function updateRunToolResults() {
  const box = document.getElementById('runToolResults');
  if (!box) return;

  let tools = TOOL_REGISTRY.slice();
  if (RUN_TOOL_STAGE !== 'all') tools = tools.filter(t => Array.isArray(t.stages) && t.stages.includes(RUN_TOOL_STAGE));
  if (RUN_TOOL_QUERY) {
    tools = tools.filter(t =>
      (t.name || '').toLowerCase().includes(RUN_TOOL_QUERY) ||
      (t.description || '').toLowerCase().includes(RUN_TOOL_QUERY));
  }

  if (!TOOL_REGISTRY.length) {
    box.innerHTML = `<div class="run-tool-empty">Tools load when the bridge is running.</div>`;
    return;
  }
  if (!tools.length) {
    box.innerHTML = `<div class="run-tool-empty">No tools match your search.</div>`;
    return;
  }

  box.innerHTML = tools.map(t => {
    const stage = (t.stages && t.stages[0]) || 'discover';
    const stageLabel = (STAGES.find(s => s.id === stage) || {}).label || stage;
    const sel = RUN_TOOL_SELECTED.has(t.id);
    return `
      <button type="button" class="run-tool-card${sel ? ' is-selected' : ''}" role="menuitemcheckbox" aria-checked="${sel ? 'true' : 'false'}" onclick="toggleToolSelect('${t.id}', this)">
        <span class="run-tool-ico" style="--sc:${stageColor(stage)};--scd:${stageColorDeep(stage)}">${stageGlyph(stage)}</span>
        <span class="run-tool-main">
          <span class="run-tool-title">${escapeHtml(t.name)}<span class="run-tool-badge" style="--sc:${stageColor(stage)};--scd:${stageColorDeep(stage)}">${escapeHtml(stageLabel)}</span></span>
          <span class="run-tool-desc">${escapeHtml(t.description || '')}</span>
        </span>
        <span class="run-tool-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
      </button>`;
  }).join('');
}

/* ---------- Prompt building ---------- */
function buildComposerPrompt(mode, stageId) {
  const text = commandText();
  if (!text && !HOME_SOURCES.length) {
    return { error: "Describe what you'd like to do, or attach a source artifact." };
  }
  const sources = composerSourcesBlock();
  const taskId  = extractTaskId();
  const taskDir = taskId ? `tasks/${taskId}` : 'tasks/<new-task-slug>';

  if (mode === 'stage') {
    const stage = STAGES.find(s => s.id === stageId) || STAGES[0];
    const prompt =
`@${agentDisplayName(stage.agent)} ${text || 'Use the attached source artifacts.'}${sources}

Run only the ${stage.label} stage. Work ONLY in \`${taskDir}/${stage.dir}/\`. Do NOT use any other task directory on disk. If the directory does not exist, create it.`;
    return {
      prompt,
      agent: stage.agent,
      taskId,
      kind: `stage:${stage.id}`,
      label: `Starting ${agentDisplayName(stage.agent)}…`,
      sourceArtifacts: captureComposerSourceArtifacts(),
    };
  }

  // lifecycle (default)
  const prompt =
`@Design Lead ${text || 'Use the attached source artifacts to start a new design task.'}${sources}

Run the full design lifecycle. Work ONLY in \`${taskDir}/\` using the standard phase structure (research, strategy, ideation, designs, prototypes, tests, handoff). Do NOT use any other existing task directory on disk. If the directory does not exist, create it.`;
  return {
    prompt,
    agent: 'design-lead',
    taskId,
    kind: 'lifecycle',
    label: 'Starting Design Lead…',
    sourceArtifacts: captureComposerSourceArtifacts(),
  };
}

function runComposer(mode, stageId) {
  closeComposerMenus();
  const out = document.getElementById('commandOutput');
  if (!out) return;
  if (!ensureComposerSourcesReady(out)) return;
  const built = buildComposerPrompt(mode, stageId);
  if (built.error) { out.innerHTML = `<p class="command-hint-error">${built.error}</p>`; return; }
  if (BRIDGE.online) {
    runAgent({
      kind: built.kind,
      prompt: built.prompt,
      agent: built.agent,
      taskId: built.taskId,
      mountEl: out,
      label: built.label,
      sourceArtifacts: built.sourceArtifacts,
      runtimeSourceArtifacts: runtimeComposerSourceArtifacts(),
    });
  } else {
    renderCopyFallback(out, built.prompt);
  }
}

function runComposerTool(toolId) {
  closeComposerMenus();
  // Carry the current description into the tool page so it isn't lost.
  const text = commandText();
  if (text) { try { sessionStorage.setItem('dl-tool-seed', text); } catch {} }
  openToolPage(toolId);
}

function runTool(toolId) {
  closeComposerMenus();
  const tool = TOOL_REGISTRY.find(t => t.id === toolId);
  if (!tool) return;
  const text  = commandText();
  const out   = document.getElementById('commandOutput');
  if (!out) return;
  if (!ensureComposerSourcesReady(out)) return;
  const prompt = `@${tool.agent} ${text || 'Use the attached source artifacts.'}${composerSourcesBlock()}

Run the "${tool.name}" tool. Save output to the paths defined in the tool spec.`;
  if (BRIDGE.online) {
    runAgent({
      kind: `tool:${toolId}`,
      prompt,
      agent: tool.agent,
      taskId: null,
      mountEl: out,
      label: `Running ${tool.name}…`,
      toolId,
      sourceArtifacts: captureComposerSourceArtifacts(),
      runtimeSourceArtifacts: runtimeComposerSourceArtifacts(),
    });
  } else {
    renderCopyFallback(out, prompt);
  }
}

async function runStage(stageId) {
  closeComposerMenus();
  const stage = STAGES.find(s => s.id === stageId);
  if (!stage) return;
  const text = commandText();
  const out  = document.getElementById('commandOutput');
  if (!out) return;
  if (!ensureComposerSourcesReady(out)) return;
  if (!BRIDGE.online) {
    renderCopyFallback(out, `Run the ${stage.label} stage for: ${text || '(your task)'}`);
    return;
  }
  const sourcesBlock = composerSourcesBlock();
  const prompt = (text || '') + sourcesBlock;

  const taskId = extractTaskId();
  const sourceArtifacts = runtimeComposerSourceArtifacts();

  out.innerHTML = processingPanelHtml(`Starting ${stage.label} stage…`);
  const statusEl   = out.querySelector('.run-status-text');
  const cancelBtn  = out.querySelector('.run-cancel');
  try {
    const res = await fetch('/api/run-stage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stageId, prompt, taskId, sourceArtifacts }),
    });

    let data = null;
    try { data = await res.json(); } catch { data = null; }

    if (!res.ok) {
      throw new Error((data && data.error) || `Bridge responded ${res.status}`);
    }

    if (!data || !data.jobId) {
      finishRun(out, { ok: false, error: (data && data.error) || 'Bridge did not return a job ID.' });
      return;
    }

    const initLogEl = out.querySelector('.run-log');
    if (initLogEl && data.sourceContext) {
      logSourceContext(initLogEl, data.sourceContext);
    }

    if (statusEl) statusEl.textContent = `${stage.label} coordinator running…`;
    if (cancelBtn) cancelBtn.onclick = () => cancelJob(data.jobId);
    CURRENT_JOB = data.jobId;
    const es = new EventSource(`/api/jobs/${data.jobId}/stream`);
    es.addEventListener('status', (e) => {
      let d; try { d = JSON.parse(e.data); } catch { return; }
      if (d.status === 'done') { es.close(); finishRun(out, { ok: true, artifacts: d.artifacts || [], sourceArtifacts: captureComposerSourceArtifacts(), taskId }); }
      else if (d.status === 'error') { es.close(); finishRun(out, { ok: false, error: d.error }); }
      else if (d.status === 'cancelled') { es.close(); finishRun(out, { cancelled: true, sourceArtifacts: captureComposerSourceArtifacts(), taskId }); }
    });
    es.addEventListener('log', (e) => {
      let d; try { d = JSON.parse(e.data); } catch { return; }
      const logEl = out.querySelector('.run-log');
      if (logEl) appendLogLine(logEl, d.stream, d.line);
      if (isMeaningfulStep(d.line)) {
        const stepsEl = out.querySelector('.run-steps');
        const step = humanizeLogLine(d.line);
        if (step && stepsEl) makeStepTracker(stepsEl).add(step);
      }
    });
  } catch (err) {
    finishRun(out, { ok: false, error: err.message });
  }
}

/* ---------- Sequential multi-step runner (stages / tools) ---------- */
let SEQ_STATE = null;

function runSequence(mode, ids) {
  const out = document.getElementById('commandOutput');
  if (!out) return;
  if (!ensureComposerSourcesReady(out)) return;

  const text = commandText();
  const sourcesBlock = composerSourcesBlock();

  if (!BRIDGE.online) {
    const names = ids.map(id => mode === 'stage'
      ? ((STAGES.find(s => s.id === id) || {}).label || id)
      : ((TOOL_REGISTRY.find(t => t.id === id) || {}).name || id));
    renderCopyFallback(out, `Run these ${mode === 'stage' ? 'stages' : 'tools'} in sequence:\n- ${names.join('\n- ')}\n\nFor: ${text || '(your task)'}`);
    return;
  }

  const steps = ids.map(id => {
    if (mode === 'stage') {
      const s = STAGES.find(x => x.id === id) || { id, label: id };
      return { id, mode, label: s.label, stageId: id };
    }
    const t = TOOL_REGISTRY.find(x => x.id === id) || { id, name: id, agent: null, stages: ['discover'] };
    return { id, mode, label: t.name, tool: t, stage: (t.stages && t.stages[0]) || 'discover' };
  });

  const state = {
    mode, steps, text, sourcesBlock,
    runtimeSources: runtimeComposerSourceArtifacts(),
    sourceSnapshot: captureComposerSourceArtifacts(),
    taskId: extractTaskId(),
    statuses: steps.map(() => 'pending'),
    allArtifacts: [],
    aborted: false,
    jobId: null,
    index: 0,
  };
  SEQ_STATE = state;
  out.innerHTML = renderSeqPanel(state);
  const cancelBtn = out.querySelector('.run-seq-cancel');
  if (cancelBtn) cancelBtn.onclick = () => seqCancel(state);
  runSeqFrom(out, state, 0);
}

function renderSeqPanel(state) {
  const rows = state.steps.map((step, i) => {
    const glyph = step.mode === 'stage' ? stageGlyph(step.id) : stageGlyph(step.stage);
    const c = step.mode === 'stage' ? stageColor(step.id) : stageColor(step.stage);
    const cd = step.mode === 'stage' ? stageColorDeep(step.id) : stageColorDeep(step.stage);
    return `
      <li class="seq-step status-${state.statuses[i]}" data-i="${i}">
        <span class="seq-ico" style="--sc:${c};--scd:${cd}">${glyph}</span>
        <span class="seq-name">${escapeHtml(step.label)}</span>
        <span class="seq-state" aria-live="polite">${SEQ_STATE_LABELS[state.statuses[i]] || ''}</span>
      </li>`;
  }).join('');
  const n = state.steps.length;
  return `
    <div class="run-seq">
      <div class="run-seq-head">
        <strong class="run-seq-title">Running ${n} ${state.mode === 'stage' ? 'stage' : 'tool'}${n === 1 ? '' : 's'} in sequence</strong>
        <button class="run-seq-cancel" type="button">Cancel</button>
      </div>
      <ol class="run-seq-steps">${rows}</ol>
      <div class="run-seq-controls"></div>
      <div class="run-seq-active"></div>
    </div>`;
}

const SEQ_STATE_LABELS = { pending: 'Queued', running: 'Running…', done: 'Done', error: 'Failed', skipped: 'Skipped' };

function setSeqStatus(out, state, i, status) {
  state.statuses[i] = status;
  const row = out.querySelector(`.seq-step[data-i="${i}"]`);
  if (!row) return;
  row.className = `seq-step status-${status}`;
  const st = row.querySelector('.seq-state');
  if (st) st.textContent = SEQ_STATE_LABELS[status] || '';
}

async function runSeqFrom(out, state, startIndex) {
  for (let j = startIndex; j < state.steps.length; j++) {
    if (state.statuses[j] === 'skipped') setSeqStatus(out, state, j, 'pending');
  }
  const controls = out.querySelector('.run-seq-controls');
  if (controls) controls.innerHTML = '';

  for (let i = startIndex; i < state.steps.length; i++) {
    if (state.aborted) return;
    state.index = i;
    setSeqStatus(out, state, i, 'running');
    const activeEl = out.querySelector('.run-seq-active');
    try {
      const result = await runSequenceStep(state.steps[i], state, activeEl);
      if (result && result.taskId && !state.taskId) state.taskId = result.taskId;
      if (result && Array.isArray(result.artifacts)) state.allArtifacts.push(...result.artifacts);
      setSeqStatus(out, state, i, 'done');
    } catch (err) {
      if (state.aborted) return;
      setSeqStatus(out, state, i, 'error');
      for (let j = i + 1; j < state.steps.length; j++) setSeqStatus(out, state, j, 'skipped');
      showSeqFailControls(out, state, i, err);
      return;
    }
  }
  finishSeq(out, state);
}

function buildSeqStepRequest(step, state) {
  if (step.mode === 'stage') {
    return {
      url: '/api/run-stage',
      body: {
        stageId: step.stageId,
        prompt: (state.text || '') + state.sourcesBlock,
        taskId: state.taskId,
        sourceArtifacts: state.runtimeSources || [],
      },
    };
  }
  const t = step.tool;
  const prompt = stripAgentPrefix(`@${t.agent} ${state.text || 'Use the attached source artifacts.'}${state.sourcesBlock}

Run the "${t.name}" tool. Save output to the paths defined in the tool spec.`);
  return {
    url: '/api/run',
    body: {
      prompt,
      agent: t.agent,
      taskId: state.taskId,
      kind: `tool:${step.id}`,
      toolId: step.id,
      sourceArtifacts: state.runtimeSources || [],
    },
  };
}

function runSequenceStep(step, state, mountEl) {
  return new Promise((resolve, reject) => {
    if (!mountEl) { reject(new Error('No mount element')); return; }
    mountEl.innerHTML = processingPanelHtml(`Starting ${step.label}…`);
    const logEl = mountEl.querySelector('.run-log');
    const stepsEl = mountEl.querySelector('.run-steps');
    const statusEl = mountEl.querySelector('.run-status-text');
    const cancelBtn = mountEl.querySelector('.run-cancel');
    const tracker = makeStepTracker(stepsEl);
    if (cancelBtn) cancelBtn.onclick = () => seqCancel(state);

    const req = buildSeqStepRequest(step, state);
    fetch(req.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    })
      .then(async (res) => {
        let data = null;
        try { data = await res.json(); } catch { data = null; }
        if (!res.ok) throw new Error((data && data.error) || `Bridge responded ${res.status}`);
        if (!data || !data.jobId) throw new Error((data && data.error) || 'Bridge did not return a job ID.');
        if (data.sourceContext && logEl) logSourceContext(logEl, data.sourceContext);

        const jobId = data.jobId;
        state.jobId = jobId;
        CURRENT_JOB = jobId;

        const es = new EventSource(`/api/jobs/${jobId}/stream`);
        es.addEventListener('log', (e) => {
          let d; try { d = JSON.parse(e.data); } catch { return; }
          appendLogLine(logEl, d.stream, d.line);
          if (d.stream !== 'stderr' && isMeaningfulStep(d.line)) {
            const s = humanizeLogLine(d.line);
            if (s) tracker.add(s);
          }
        });
        es.addEventListener('status', (e) => {
          let d; try { d = JSON.parse(e.data); } catch { return; }
          if (d.status === 'running') { if (statusEl) statusEl.textContent = `${step.label} running…`; }
          else if (d.status === 'verifying') { if (statusEl) statusEl.textContent = `Verifying ${step.label} (round ${d.round || 1})…`; }
          else if (d.status === 'rerunning') { if (statusEl) statusEl.textContent = `Re-running ${step.label} (round ${d.round || 2})…`; }
          else if (d.status === 'done' || d.status === 'flagged') { es.close(); resolve({ taskId: data.taskId || null, artifacts: d.artifacts || [] }); }
          else if (d.status === 'error') { es.close(); reject(new Error(d.error || `${step.label} failed`)); }
          else if (d.status === 'cancelled') { es.close(); reject(new Error('cancelled')); }
        });
        es.onerror = () => { /* browser auto-reconnects; server replays buffered log */ };
      })
      .catch((err) => reject(err));
  });
}

function showSeqFailControls(out, state, i, err) {
  const controls = out.querySelector('.run-seq-controls');
  if (!controls) return;
  const msg = (err && err.message) || 'Step failed.';
  const hasMore = i + 1 < state.steps.length;
  controls.innerHTML = `
    <div class="run-seq-fail">
      <span class="run-seq-fail-msg">${escapeHtml(state.steps[i].label)} failed: ${escapeHtml(msg)}</span>
      <span class="run-seq-fail-actions">
        <button type="button" class="run-seq-retry">Retry step</button>
        ${hasMore ? '<button type="button" class="run-seq-continue">Skip &amp; continue</button>' : ''}
      </span>
    </div>`;
  const retry = controls.querySelector('.run-seq-retry');
  if (retry) retry.onclick = () => { state.aborted = false; runSeqFrom(out, state, i); };
  const cont = controls.querySelector('.run-seq-continue');
  if (cont) cont.onclick = () => { state.aborted = false; runSeqFrom(out, state, i + 1); };
}

function finishSeq(out, state) {
  const title = out.querySelector('.run-seq-title');
  const cancel = out.querySelector('.run-seq-cancel');
  const n = state.steps.length;
  if (title) title.textContent = `Sequence complete — ${n} ${state.mode === 'stage' ? 'stage' : 'tool'}${n === 1 ? '' : 's'} run`;
  if (cancel) cancel.remove();
  const activeEl = out.querySelector('.run-seq-active');
  if (activeEl) {
    finishRun(activeEl, {
      ok: true,
      artifacts: state.allArtifacts,
      taskId: state.taskId,
      sourceArtifacts: state.sourceSnapshot || [],
    });
  }
}

function seqCancel(state) {
  if (!state) return;
  state.aborted = true;
  if (state.jobId) cancelJob(state.jobId);
  const out = document.getElementById('commandOutput');
  if (!out) return;
  const i = state.index;
  setSeqStatus(out, state, i, 'error');
  const row = out.querySelector(`.seq-step[data-i="${i}"] .seq-state`);
  if (row) row.textContent = 'Cancelled';
  for (let j = i + 1; j < state.steps.length; j++) setSeqStatus(out, state, j, 'skipped');
  const title = out.querySelector('.run-seq-title');
  if (title) title.textContent = 'Sequence cancelled';
  const cancel = out.querySelector('.run-seq-cancel');
  if (cancel) cancel.remove();
}

/* Back-compat shim: keep old entry points working. */
function runCommandPrompt() { runComposer('lifecycle'); }

function createTaskFromCommand() {
  const seed = commandText().slice(0, 100);
  if (seed) fillCommand(seed);
}

function initHomePage() {
  buildGlobalSidebar({ type: 'home' });
  loadToolRegistry();
  const linkInput = document.getElementById('linkSourceInput');
  if (linkInput) {
    linkInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitLinkSource();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLinkSourceModal();
      }
    });
  }
  const box = document.getElementById('commandInput');
  if (box) {
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); runComposer('lifecycle'); }
    });
  }
  // Close composer menus on outside click / Escape.
  // Use composedPath() (frozen at dispatch) so submenu navigation that
  // re-renders innerHTML — detaching the clicked node — is still treated as
  // an inside click rather than closing the menu.
  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'linkSourceModal') {
      closeLinkSourceModal();
      return;
    }
    const path = (typeof e.composedPath === 'function') ? e.composedPath() : [];
    const inside = path.some(el => el && el.classList && el.classList.contains('composer-bar'));
    if (!inside) closeComposerMenus();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeComposerMenus();
    }
  });
  bridgeBoot({ type: 'home' }).then(updatePrototypesLink);
}

/* Show/hide and target the home "Prototypes" link based on the live workspace. */
function updatePrototypesLink() {
  const link = document.getElementById('prototypesLink');
  if (!link) return;
  if (!PROTO.enabled) { link.hidden = true; return; }
  link.hidden = false;
  link.href = prototypeWorkspaceUrl();
  const dot = document.getElementById('prototypesLinkStatus');
  if (dot) {
    dot.classList.toggle('is-ready', PROTO.ready);
    dot.classList.toggle('is-starting', !PROTO.ready);
    link.title = PROTO.ready
      ? 'Open the prototype workspace'
      : 'Prototype workspace is starting… (opens when ready)';
  }
}

/* =================================================================
   TOOL PAGE (tool.html)
   ================================================================= */
function initToolPage() {
  const p = new URLSearchParams(location.search);
  const tool = getTool(p.get('tool'));
  if (!tool) { goHome(); return; }
  buildGlobalSidebar({ type: 'tool', id: tool.id });
  renderToolPage(tool);
  bridgeBoot({ type: 'tool', id: tool.id });
}

function renderToolPage(tool) {
  const area = document.getElementById('toolContent');
  if (!area) return;
  document.title = `${tool.name} — DesignLoop`;
  const crumb = document.getElementById('breadcrumb');
  if (crumb) {
    crumb.innerHTML = `
      <span style="cursor:pointer" onclick="goHome()">Home</span>
      <span>›</span>
      <span class="crumb-active">${tool.name}</span>`;
  }

  const header = `
    <div class="tool-head">
      <span class="tool-icon">${ICONS[tool.icon] || ICONS.evaluate}</span>
      <div>
        <h1>${tool.name}</h1>
        <p>${tool.blurb}</p>
      </div>
    </div>`;

  if (tool.status === 'soon') {
    area.innerHTML = `
      <div class="tool-hero">
        ${header}
        <div class="tool-soon">
          <span class="soon-badge">Coming soon</span>
          <p>This tool isn't available yet. It will run via the <strong>${tool.agent}</strong> agent once enabled.</p>
        </div>
      </div>`;
    return;
  }

  if (tool.id !== 'tenets-traps') {
    const inputLabel = tool.inputLabel || 'What should this tool work on?';
    const inputPlaceholder = tool.inputPlaceholder || 'Describe the problem, artifact, or outcome to work on';
    const outputs = (tool.outputs || []).length
      ? `<p class="tool-run-hint">Outputs: ${(tool.outputs || []).map(path => `<code>${path}</code>`).join(', ')}</p>`
      : '';
    area.innerHTML = `
      <div class="tool-hero">
        ${header}
        <div class="command-box tool-run">
          <div class="tool-run-row">
            <label for="toolTaskId">Task id</label>
            <input id="toolTaskId" type="text" placeholder="e.g. azure-deployment-agent" autocomplete="off">
          </div>
          <div class="tool-run-row">
            <label for="toolInput">${inputLabel}</label>
            <textarea id="toolInput" rows="5" placeholder="${inputPlaceholder}"></textarea>
          </div>
          ${outputs}
          <div class="command-actions">
            <button class="cmd-primary" onclick="runToolAgent('${tool.id}')">${ICONS.send} Run tool</button>
            <button class="cmd-secondary" onclick="generateToolPrompt('${tool.id}')">${ICONS.copy} Copy prompt</button>
          </div>
          <div id="toolPromptOutput"></div>
        </div>
      </div>`;

    try {
      const seed = sessionStorage.getItem('dl-tool-seed');
      if (seed) {
        const inputEl = document.getElementById('toolInput');
        if (inputEl) inputEl.value = seed;
        sessionStorage.removeItem('dl-tool-seed');
      }
    } catch { /* ignore */ }
    return;
  }

  // Tenets &amp; Traps has a specialized target form.
  area.innerHTML = `
    <div class="tool-hero">
      ${header}
      <div class="command-box tool-run">
        <div class="tool-run-row">
          <label for="evalName">What are you evaluating?</label>
          <input id="evalName" type="text" placeholder="e.g. Deployment Agent overview screen">
        </div>
        <div class="tool-run-row">
          <label for="evalTarget">Target type</label>
          <select id="evalTarget">
            <option value="task">Existing task</option>
            <option value="design">Designs / wireframes</option>
            <option value="prototype">React prototypes</option>
            <option value="figma">Figma file</option>
            <option value="url">Live URL</option>
            <option value="paste">Pasted spec / description</option>
          </select>
        </div>
        <div class="tool-run-row">
          <label for="evalRef">Reference</label>
          <input id="evalRef" type="text" placeholder="task id, file path, URL, or Figma link">
        </div>
        <div class="command-actions">
          <button class="cmd-primary" onclick="runEvalAgent()">${ICONS.send} Run evaluation</button>
          <button class="cmd-secondary" onclick="generateEvalPrompt()">${ICONS.copy} Copy prompt</button>
        </div>
        <div id="evalPromptOutput"></div>
      </div>
    </div>`;

  // Seed the name field if a description was carried over from the Home composer.
  try {
    const seed = sessionStorage.getItem('dl-tool-seed');
    if (seed) {
      const nameEl = document.getElementById('evalName');
      if (nameEl) nameEl.value = seed;
      sessionStorage.removeItem('dl-tool-seed');
    }
  } catch { /* ignore */ }
}

/* =================================================================
   DESIGNLOOP BRIDGE — live agent runs
   Talks to the local Node bridge (bridge/server.js) to run the
   GitHub Copilot CLI headlessly and stream its output here.
   Gracefully degrades to "copy prompt" when the bridge is offline.
   ================================================================= */
const BRIDGE = { online: false, copilot: null, checked: false };

/* Auto-managed Fluent prototype dev server (see bridge GET /api/prototypes). */
const PROTO = { enabled: false, port: 3100, ready: false, starting: false };

async function loadPrototypeInfo() {
  try {
    const r = await fetch('/api/prototypes', { cache: 'no-store' });
    if (!r.ok) return;
    const d = await r.json();
    PROTO.enabled = !!d.enabled;
    PROTO.port = d.port || PROTO.port;
    PROTO.ready = !!d.ready;
    PROTO.starting = !!d.starting;
  } catch { /* bridge offline */ }
}

/* Normalize the host for the prototype workspace. Azure AD only allows
   `http://localhost` (not 127.0.0.1) as an SPA redirect URI, so MSAL sign-in
   must run on the localhost origin. */
function prototypeHost() {
  const h = location.hostname;
  return (h === '127.0.0.1' || h === '::1' || h === '0.0.0.0') ? 'localhost' : h;
}

/* Absolute URL to the running prototype workspace list. Requires Microsoft
   sign-in (no bypass) — opens the real authenticated workspace. */
function prototypeWorkspaceUrl() {
  return `http://${prototypeHost()}:${PROTO.port}/`;
}

/* Best available preview URL for a prototype phase: prefer the live dev-server
   route (hot-reloading, no build), fall back to the static export path. */
function prototypePreviewSrc(phase) {
  if (phase.fluentPreviewRoute) {
    const route = phase.fluentPreviewRoute.replace(/\/+$/, '');
    return `http://${prototypeHost()}:${PROTO.port}${route}/?auditBridge=1`;
  }
  return phase.fluentPreview || null;
}

async function bridgeHealth() {
  try {
    const r = await fetch('/api/health', { cache: 'no-store' });
    if (r.ok) {
      const d = await r.json();
      BRIDGE.online = !!d.ok;
      BRIDGE.copilot = d.copilot || null;
    } else {
      BRIDGE.online = false;
    }
  } catch {
    BRIDGE.online = false;
  }
  BRIDGE.checked = true;
  document.body.classList.toggle('bridge-online', BRIDGE.online);
  document.body.classList.toggle('bridge-offline', !BRIDGE.online);
  if (BRIDGE.online) { await loadPrototypeInfo(); }
  return BRIDGE.online;
}

/* Boot: ping the bridge, discover tasks, refresh sidebar if scope provided. */
async function bridgeBoot(active) {
  await bridgeHealth();
  await refreshTasks();
  if (active) buildGlobalSidebar(active);
}

/* Pull dynamically discovered tasks from the bridge and merge in any
   that aren't already in the curated TASKS registry. */
async function refreshTasks() {
  if (!BRIDGE.online) return;
  try {
    const r = await fetch('/api/tasks', { cache: 'no-store' });
    if (!r.ok) return;
    const data = await r.json();
    const known = new Set(TASKS.map(t => t.id));
    for (const t of (data.tasks || [])) {
      if (!known.has(t.id)) { TASKS.push(t); known.add(t.id); }
      const existing = getTask(t.id);
      if (existing) {
        mergeTaskMeta(existing, t);
        if (Array.isArray(TASK_SOURCE_ARTIFACTS[t.id])) {
          existing.sourceArtifacts = TASK_SOURCE_ARTIFACTS[t.id];
        }
      }
    }
  } catch { /* offline / no tasks */ }
}

/* Merge freshly-discovered artifact metadata (frontmatter title/status/dates/
   author/excerpt from the bridge) into a curated task, matching files by path so
   the curated human labels are preserved. */
function mergeTaskMeta(existing, fresh) {
  const metaByPath = {};
  for (const ph of (fresh.phases || [])) {
    for (const f of (ph.files || [])) {
      if (f && f.path && f.meta) metaByPath[f.path] = f.meta;
    }
  }
  for (const ph of (existing.phases || [])) {
    for (const f of (ph.files || [])) {
      if (f && f.path && metaByPath[f.path] && !f.meta) f.meta = metaByPath[f.path];
    }
  }
}

/* Strip a leading "@Agent Name " mention so the CLI doesn't read "@" as a file ref.
   The agent is passed separately via the --agent flag. */
function stripAgentPrefix(prompt) {
  let p = String(prompt);
  const names = ['Design Lead', 'Tester', 'Security Auditor', 'Researcher',
    'Strategist', 'Ideator', 'Designer', 'Prototyper', 'Handoff'];
  for (const n of names) {
    if (p.startsWith('@' + n + ' ')) return p.slice(n.length + 2).trimStart();
    if (p.startsWith('@' + n + '\n')) return p.slice(n.length + 2).trimStart();
  }
  return p.replace(/^@[A-Za-z][A-Za-z ]*\s+/, '').trimStart();
}

/* Build a task.html deep link for a repo-relative artifact path. */
function artifactLink(relPath) {
  const m = String(relPath).match(/^tasks\/([^/]+)\/(.+)$/);
  if (!m) return null;
  const taskId = m[1];
  const within = m[2];
  const topDir = within.split('/')[0];
  const phaseMap = {
    research: 'discover', strategy: 'define', ideation: 'ideate',
    designs: 'design', prototypes: 'prototype', tests: 'test', handoff: 'deliver'
  };
  const phase = phaseMap[topDir] || 'discover';
  return `task.html?task=${encodeURIComponent(taskId)}&file=${encodeURIComponent(within)}&phase=${phase}`;
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* Offline / copy-prompt fallback UI. */
function renderCopyFallback(el, prompt, headline) {
  if (!el) return;
  const head = headline || (BRIDGE.checked && !BRIDGE.online
    ? 'Bridge offline — copy this prompt into VS Code'
    : 'Copy this prompt to your agent');
  el.innerHTML = `
    <div class="prompt-output">
      <div class="prompt-output-head">
        <span>${head}</span>
        <button class="copy-btn" onclick="copyFromPre(this)">Copy</button>
      </div>
      <pre>${escapeHtml(prompt)}</pre>
    </div>`;
}
function copyFromPre(btn) {
  const pre = btn.closest('.prompt-output').querySelector('pre');
  navigator.clipboard.writeText(pre.innerText).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
  });
}

function processingPanelHtml(label) {
  return `
    <div class="processing-panel" role="status" aria-live="polite">
      <div class="run-head">
        <span class="run-spinner" aria-hidden="true"></span>
        <span class="run-status-text">${escapeHtml(label || 'Working…')}</span>
        <button class="run-cancel" type="button">Cancel</button>
      </div>
      <div class="run-steps" aria-label="Progress"></div>
      <details class="run-rawwrap">
        <summary>Show full log</summary>
        <pre class="run-log" aria-label="Agent output log"></pre>
      </details>
      <div class="run-result"></div>
    </div>`;
}

/* Returns true only for actions worth surfacing in the minimal step view. */
function isMeaningfulStep(raw) {
  const s = String(raw).replace(/\x1b\[[0-9;]*m/g, '').trim();
  // Skill use and file writes are meaningful; reads/explores/commands are noise.
  if (/^skill\(/i.test(s)) return true;
  if (/^(?:Write|Writing|Creat(?:e|ed|ing)|Edit|Editing|Updat(?:e|ed|ing))\s/i.test(s)) return true;
  return false;
}

function appendLogLine(logEl, stream, line) {
  if (!logEl) return;
  const div = document.createElement('div');
  div.className = `log-line ${stream || 'stdout'}`;
  div.textContent = line;
  logEl.appendChild(div);
  logEl.scrollTop = logEl.scrollHeight;
}

function logSourceContext(logEl, sourceContext) {
  if (!logEl || !sourceContext) return;
  const files = Array.isArray(sourceContext.files) ? sourceContext.files : [];
  const extracted = Array.isArray(sourceContext.extractedFiles) ? sourceContext.extractedFiles : [];
  const links = Array.isArray(sourceContext.links) ? sourceContext.links : [];
  const fetchedLinks = Array.isArray(sourceContext.fetchedLinks) ? sourceContext.fetchedLinks : [];

  const fetchedCount = fetchedLinks.filter((l) => l && l.fetchedPath).length;
  appendLogLine(logEl, 'system', `Sources prepared: files=${files.length}, links=${links.length}, extracted=${extracted.length}, fetchedLinks=${fetchedCount}`);

  files.forEach((f) => {
    appendLogLine(logEl, 'system', `  file: ${f.label || 'source'} -> ${f.path || 'n/a'}${f.wrote ? '' : ' (unavailable)'}`);
  });
  extracted.forEach((f) => {
    appendLogLine(logEl, 'system', `  extracted: ${f.label || 'source'} -> ${f.extractedPath || 'n/a'}${f.truncated ? ' (truncated)' : ''}`);
  });
  fetchedLinks.forEach((l) => {
    appendLogLine(logEl, 'system', `  fetched link: ${l.label || l.url || 'link'} -> ${l.fetchedPath || `unavailable (${l.note || 'failed'})`}`);
  });
}

function baseName(p) {
  return String(p).trim().replace(/[`"']/g, '').split('/').pop();
}

const PHASE_OF_DIR = {
  research: 'discover', strategy: 'define', ideation: 'ideate',
  designs: 'design', prototypes: 'prototype', tests: 'test', handoff: 'deliver',
};
function phaseOf(relPath) {
  const within = String(relPath).replace(/^tasks\/[^/]+\//, '');
  return PHASE_OF_DIR[within.split('/')[0]] || 'discover';
}
function taskIdFromArtifacts(artifacts) {
  for (const a of (artifacts || [])) {
    const m = String(a.path).match(/^tasks\/([^/]+)\//);
    if (m) return m[1];
  }
  return null;
}

/* Turn a raw CLI log line into a clean, subtle "chain of thought" step
   (Copilot-chat style). Returns { icon, text } or null to skip noise. */
function humanizeLogLine(raw) {
  let s = String(raw).replace(/\x1b\[[0-9;]*m/g, ''); // strip ANSI
  const hadBullet = /^\s*[●○•]/.test(s);
  s = s.replace(/^\s*[●○•▶✔✖■\u2514\u2502|>\-]+\s*/, '').trim();
  if (!s) return null;

  // Skip sub-detail / noise lines.
  if (/^\d+\s+(lines?|files?|results?|matches?)\b/i.test(s)) return null;
  if (/^L\d+(:\d+)?/.test(s)) return null;
  if (/^\(.*\)$/.test(s)) return null;

  let m;
  if ((m = s.match(/^skill\(([^)]+)\)/i)))
    return { icon: ICONS.book, text: `Using skill <strong>${escapeHtml(m[1])}</strong>` };
  if ((m = s.match(/^(?:Read|Reading)(?:\s+file)?\s+(.+)$/i)))
    return { icon: ICONS.doc, text: `Reading <strong>${escapeHtml(baseName(m[1]))}</strong>` };
  if ((m = s.match(/^(?:List directory|Listing|Explored?|Exploring)\s+(.+)$/i)))
    return { icon: ICONS.folder, text: `Exploring <strong>${escapeHtml(m[1])}</strong>` };
  if ((m = s.match(/^(?:Write|Writing|Creat(?:e|ed|ing)|Edit|Editing|Updat(?:e|ed|ing))\s+(?:file\s+)?(.+)$/i))) {
    const name = baseName(m[1]);
    const label = /\.md$/i.test(name) ? `Generating <strong>${escapeHtml(name)}</strong>` : `Writing <strong>${escapeHtml(name)}</strong>`;
    return { icon: ICONS.sparkle, text: label };
  }
  if (/^(?:Bash|Run|Running|\$)/i.test(s)) return { icon: ICONS.code, text: 'Running a command' };
  if ((m = s.match(/^(?:Fetch|Fetching)\s+(.+)$/i)))
    return { icon: ICONS.send, text: `Fetching <strong>${escapeHtml(m[1].slice(0, 60))}</strong>` };
  if ((m = s.match(/^(?:Search|Searching|Grep)\s+(.+)$/i)))
    return { icon: ICONS.evaluate, text: `Searching <strong>${escapeHtml(m[1].slice(0, 60))}</strong>` };

  // Our own system markers.
  if (/^Running Copilot CLI/i.test(s)) return { icon: ICONS.sparkle, text: 'Starting up' };
  if (/^Cancel/i.test(s) || /^Done\b/i.test(s) || /^Exited\b/i.test(s)) return null;

  // Generic short bulleted action → show as a subtle thought.
  if (hadBullet && s.length <= 100) return { icon: ICONS.loop, text: escapeHtml(s) };
  return null;
}

function makeStepTracker(stepsEl) {
  return {
    add(step) {
      if (!stepsEl) return;
      // Replace the single active step in-place — no growing list.
      stepsEl.innerHTML = `<div class="run-step active"><span class="step-ico"><span class="step-spin"></span></span><span class="step-text">${step.text}</span></div>`;
    },
    finalize() { if (stepsEl) stepsEl.innerHTML = ''; },
  };
}

function finalizeSteps(mountEl) {
  mountEl.querySelectorAll('.run-step.active').forEach(el => {
    el.classList.remove('active');
    el.classList.add('done');
    const ico = el.querySelector('.step-ico');
    if (ico) ico.innerHTML = ICONS.check;
  });
}

let CURRENT_JOB = null;

async function runAgent({ kind, prompt, agent, taskId, mountEl, label, sourceArtifacts, runtimeSourceArtifacts, toolId }) {
  if (!mountEl) return;
  const cleanPrompt = stripAgentPrefix(prompt);
  mountEl.innerHTML = processingPanelHtml(label || 'Starting…');
  const logEl = mountEl.querySelector('.run-log');
  const stepsEl = mountEl.querySelector('.run-steps');
  const statusEl = mountEl.querySelector('.run-status-text');
  const cancelBtn = mountEl.querySelector('.run-cancel');
  const steps = makeStepTracker(stepsEl);

  let jobId = null;
  try {
    const res = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: cleanPrompt,
        agent,
        taskId,
        kind,
        toolId: toolId || null,
        sourceArtifacts: runtimeSourceArtifacts || [],
      }),
    });
    if (!res.ok) {
      let payload = null;
      try { payload = await res.json(); } catch { payload = null; }
      const txt = payload ? JSON.stringify(payload) : await res.text().catch(() => '');
      throw new Error(`Bridge responded ${res.status} ${txt}`);
    }
    const data = await res.json();
    jobId = data.jobId;
    if (data && data.sourceContext) {
      logSourceContext(logEl, data.sourceContext);
    }
  } catch (err) {
    statusEl.textContent = 'Could not reach the bridge.';
    appendLogLine(logEl, 'stderr', String(err.message || err));
    appendLogLine(logEl, 'system', 'Falling back to copy-prompt mode.');
    cancelBtn.textContent = 'Copy prompt instead';
    cancelBtn.onclick = () => renderCopyFallback(mountEl, prompt);
    return;
  }

  CURRENT_JOB = jobId;
  cancelBtn.onclick = () => {
    cancelBtn.disabled = true;
    cancelBtn.textContent = 'Cancelling…';
    statusEl.textContent = 'Cancelling…';
    cancelJob(jobId);
  };

  const es = new EventSource(`/api/jobs/${jobId}/stream`);
  es.addEventListener('log', (e) => {
    let d; try { d = JSON.parse(e.data); } catch { return; }
    appendLogLine(logEl, d.stream, d.line);
    if (d.stream === 'stderr') return; // keep errors in raw log only
    // Only surface meaningful milestones — skill use and file writes.
    if (isMeaningfulStep(d.line)) {
      const step = humanizeLogLine(d.line);
      if (step) steps.add(step);
    }
  });
  let lastVerifyResult = null;

  es.addEventListener('status', (e) => {
    let d; try { d = JSON.parse(e.data); } catch { return; }
    if (d.status === 'running') {
      statusEl.textContent = `${agentDisplayName(agent)} is working…`;
    } else if (d.status === 'verifying') {
      statusEl.textContent = `Verifying quality (round ${d.round || 1})…`;
      steps.add({ icon: ICONS.evaluate, text: 'Checking output against quality gate' });
    } else if (d.status === 'rerunning') {
      statusEl.textContent = `Quality gate failed — re-running (round ${d.round || 2})…`;
      steps.add({ icon: ICONS.loop, text: `Re-running with targeted fixes (round ${d.round || 2})` });
    } else if (d.status === 'done') {
      es.close();
      finishRun(mountEl, { ok: true, artifacts: d.artifacts || [], taskId, verifyResult: d.verifyResult || lastVerifyResult, sourceArtifacts });
    } else if (d.status === 'flagged') {
      es.close();
      finishRun(mountEl, { flagged: true, artifacts: d.artifacts || [], taskId, verifyResult: d.verifyResult || lastVerifyResult, sourceArtifacts });
    } else if (d.status === 'error') {
      es.close();
      finishRun(mountEl, { ok: false, artifacts: d.artifacts || [], error: d.error, taskId, prompt, agent, kind, label, sourceArtifacts });
    } else if (d.status === 'cancelled') {
      es.close();
      finishRun(mountEl, { cancelled: true, taskId, sourceArtifacts });
    }
  });

  es.addEventListener('verify-result', (e) => {
    let d; try { d = JSON.parse(e.data); } catch { return; }
    lastVerifyResult = d;
  });

  es.onerror = () => { /* browser auto-reconnects; server replays buffered log */ };
}

async function finishRun(mountEl, { ok, flagged, cancelled, artifacts = [], error, taskId, prompt, agent, kind, label, verifyResult, sourceArtifacts = [] }) {
  CURRENT_JOB = null;
  const panel = mountEl.querySelector('.processing-panel');
  const spinner = mountEl.querySelector('.run-spinner');
  const statusEl = mountEl.querySelector('.run-status-text');
  const cancelBtn = mountEl.querySelector('.run-cancel');
  const resultEl = mountEl.querySelector('.run-result');
  finalizeSteps(mountEl);
  if (spinner) spinner.classList.add('stopped');
  if (panel) panel.classList.add(ok ? 'is-done' : (flagged ? 'is-flagged' : (cancelled ? 'is-cancelled' : 'is-error')));
  if (cancelBtn) cancelBtn.disabled = false;

  if (cancelled) {
    if (statusEl) statusEl.textContent = 'Run cancelled.';
    if (cancelBtn) { cancelBtn.textContent = 'Close'; cancelBtn.onclick = () => { mountEl.innerHTML = ''; }; }
    return;
  }

  if (flagged) {
    if (statusEl) statusEl.textContent = 'Quality gate failed after 2 rounds — review needed.';
    if (cancelBtn) { cancelBtn.textContent = 'Dismiss'; cancelBtn.onclick = () => { mountEl.innerHTML = ''; }; }
    if (resultEl) resultEl.innerHTML = renderVerifyPanel(verifyResult, artifacts, taskId);
    return;
  }

  if (!ok) {
    if (statusEl) statusEl.textContent = error ? `Run failed: ${error}` : 'Run failed.';
    if (cancelBtn) {
      cancelBtn.textContent = 'Retry';
      cancelBtn.onclick = () => runAgent({
        kind,
        prompt,
        agent,
        taskId,
        mountEl,
        label,
        sourceArtifacts,
        runtimeSourceArtifacts: runtimeComposerSourceArtifacts(),
      });
    }
    return;
  }

  // Make the new/updated task show up in the sidebar.
  await refreshTasks();
  rebuildSidebar();

  const tid = taskId || taskIdFromArtifacts(artifacts);
  if (tid && Array.isArray(sourceArtifacts) && sourceArtifacts.length) {
    persistTaskSourceArtifacts(tid, sourceArtifacts);
  }
  const task = tid ? getTask(tid) : null;
  const taskTitle = task ? task.title : (tid ? titleCaseId(tid) : null);

  if (statusEl) {
    statusEl.textContent = artifacts.length
      ? `Done — ${artifacts.length} artifact${artifacts.length === 1 ? '' : 's'} ready.`
      : 'Done.';
  }
  if (cancelBtn) { cancelBtn.textContent = 'Done'; cancelBtn.onclick = () => { mountEl.innerHTML = ''; }; }

  if (!resultEl) return;
  let html = '';

  if (tid) {
    const primary = artifacts.find(a => a.isMarkdown) || artifacts[0];
    let taskHref = `task.html?task=${encodeURIComponent(tid)}`;
    if (primary) {
      const within = primary.path.replace(/^tasks\/[^/]+\//, '');
      taskHref += `&file=${encodeURIComponent(within)}&phase=${phaseOf(primary.path)}`;
    }
    html += `
      <a class="run-open-task" href="${taskHref}">
        <span class="run-open-ico">${ICONS.folder}</span>
        <span class="run-open-text">
          <strong>Open ${escapeHtml(taskTitle || 'task')}</strong>
          <small>Browse everything generated for this task</small>
        </span>
        <span class="run-open-arrow">→</span>
      </a>`;
  }

  if (artifacts.length) {
    const items = artifacts.map(a => {
      const href = artifactLink(a.path);
      const name = baseName(a.path);
      const inner = `
        <span class="run-artifact-ico">${a.isMarkdown ? ICONS.doc : ICONS.code}</span>
        <span class="run-artifact-name">${escapeHtml(name)}</span>
        <small>${escapeHtml(a.path)}</small>`;
      return href
        ? `<a class="run-artifact" href="${href}">${inner}</a>`
        : `<div class="run-artifact">${inner}</div>`;
    }).join('');
    html += `<div class="run-artifacts-head">Generated artifacts</div>${items}`;
  }

  resultEl.innerHTML = html;
}

function renderVerifyPanel(verifyResult, artifacts = [], taskId) {
  const scoreColor = (s) => s >= 80 ? 'var(--color-success-500)' : s >= 60 ? 'var(--color-warning-500)' : 'var(--color-error-500)';

  let dimensionRows = '';
  if (verifyResult && verifyResult.scores) {
    dimensionRows = Object.entries(verifyResult.scores).map(([dim, score]) => {
      const failed = verifyResult.failedDimensions && verifyResult.failedDimensions.some(d => d.dimension === dim);
      return `
        <div class="verify-dimension ${failed ? 'verify-dimension-fail' : 'verify-dimension-pass'}">
          <span class="verify-dim-name">${escapeHtml(dim)}</span>
          <span class="verify-dim-score" style="color:${scoreColor(score)}">${score}/100</span>
          ${failed ? `<span class="verify-dim-tag">${ICONS.warn} Below threshold</span>` : `<span class="verify-dim-tag verify-dim-ok">${ICONS.check} Passed</span>`}
        </div>`;
    }).join('');
  }

  let failureInstructions = '';
  if (verifyResult && verifyResult.failedDimensions && verifyResult.failedDimensions.length) {
    failureInstructions = `
      <div class="verify-failures">
        <div class="verify-failures-label">What to fix:</div>
        ${verifyResult.failedDimensions.map(d => `
          <div class="verify-failure-item">
            <strong>${escapeHtml(d.dimension)}</strong>
            <p>${escapeHtml(d.instruction || '')}</p>
          </div>`).join('')}
      </div>`;
  }

  let artifactLinks = '';
  if (artifacts.length) {
    artifactLinks = artifacts.map(a => {
      const href = artifactLink(a.path);
      const name = baseName(a.path);
      return href
        ? `<a class="run-artifact" href="${href}"><span class="run-artifact-ico">${ICONS.doc}</span><span class="run-artifact-name">${escapeHtml(name)}</span><small>${escapeHtml(a.path)}</small></a>`
        : '';
    }).join('');
  }

  const score = verifyResult ? verifyResult.composite : 0;

  return `
    <div class="verify-panel">
      <div class="verify-panel-head">
        <span class="verify-flag-ico">${ICONS.warn}</span>
        <div>
          <strong>Quality gate failed</strong>
          <small>Output did not meet the quality bar after 2 rounds. Review and fix manually, or adjust the tool's VERIFY.md.</small>
        </div>
        <span class="verify-score-badge" style="background:${scoreColor(score)}">${score}/100</span>
      </div>
      ${dimensionRows ? `<div class="verify-dimensions">${dimensionRows}</div>` : ''}
      ${failureInstructions}
      ${artifactLinks ? `<div class="run-artifacts-head">Best output (round 2)</div>${artifactLinks}` : ''}
    </div>`;
}

async function cancelJob(jobId) {
  try { await fetch(`/api/jobs/${jobId}`, { method: 'DELETE' }); } catch { /* ignore */ }
}
