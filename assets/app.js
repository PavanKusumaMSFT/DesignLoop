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
  // ────────────────────────────────────────────────────────────────
  // ADD NEW TASKS HERE:
  //
  // {
  //   id: 'my-new-project',
  //   dir: 'tasks/my-new-project',
  //   title: 'My New Project',
  //   description: 'Short description of the project.',
  //   source: 'research/my-research-brief.md',
  //   phases: [
  //     {
  //       id: 'discover',
  //       label: 'Discover',
  //       files: [
  //         { path: 'research/my-research-brief.md', label: 'Research Brief' },
  //       ]
  //     },
  //     ...
  //   ]
  // },
  // ────────────────────────────────────────────────────────────────
];

/* =================================================================
   STATE
   ================================================================= */
let activeFile = null;
let collapsedPhases = {};
let currentTaskId = null;
let ROUTING = false; // true while rendering from a URL route (suppresses pushState)

/* =================================================================
   HELPERS
   ================================================================= */
function getTask(taskId) {
  return TASKS.find(t => t.id === taskId);
}
function fullPath(task, p) {
  return task && task.dir ? task.dir + '/' + p : p;
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
    status: 'soon',
    agent: '@Security Auditor',
    blurb: 'Audit designs and prototypes against the Microsoft Secure Future Initiative (SFI) framework, with supporting SBD pattern detection and OWASP design-phase checks.',
    skill: '',
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
        ${task.source ? `<span class="task-overview-source" onclick="loadFile('${task.id}', '${task.source}', 'discover')" style="cursor:pointer">${ICONS.doc} Source research report</span>` : ''}
      </div>
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
        </div>
      `).join('')}
    </div>
  `;
  document.getElementById('breadcrumb').innerHTML = `
    <span style="cursor:pointer" onclick="goHome()">Home</span>
    <span>›</span>
    <span class="crumb-active">${task.title}</span>
  `;
}

/* =================================================================
   NEW TASK MODAL
   ================================================================= */
const SOURCE_TYPES = [
  { value: 'link',       label: 'Link / URL',  placeholder: 'https://example.com/research-report', input: 'text' },
  { value: 'document',   label: 'Document',    placeholder: 'Path or name, e.g. interview-notes.pdf', input: 'text' },
  { value: 'image',      label: 'Image',       placeholder: 'Path or URL to image, e.g. whiteboard.png', input: 'text' },
  { value: 'transcript', label: 'Transcript',  placeholder: 'Paste transcript text…', input: 'textarea' },
  { value: 'note',       label: 'Note / Text', placeholder: 'Paste any notes or raw text…', input: 'textarea' },
];

function sourceRowHtml() {
  const options = SOURCE_TYPES.map(t => `<option value="${t.value}">${t.label}</option>`).join('');
  return `
    <div class="source-row">
      <select onchange="onSourceTypeChange(this)">${options}</select>
      <input type="text" class="source-value" placeholder="${SOURCE_TYPES[0].placeholder}" />
      <button type="button" class="source-remove" title="Remove" onclick="removeSourceRow(this)">×</button>
    </div>`;
}

function onSourceTypeChange(select) {
  const type = SOURCE_TYPES.find(t => t.value === select.value) || SOURCE_TYPES[0];
  const row = select.closest('.source-row');
  const old = row.querySelector('.source-value');
  const val = old.value;
  let replacement;
  if (type.input === 'textarea') {
    replacement = document.createElement('textarea');
    replacement.rows = 3;
  } else {
    replacement = document.createElement('input');
    replacement.type = 'text';
  }
  replacement.className = 'source-value';
  replacement.placeholder = type.placeholder;
  replacement.value = val;
  old.replaceWith(replacement);
}

function addSourceRow() {
  const list = document.getElementById('sourcesList');
  list.insertAdjacentHTML('beforeend', sourceRowHtml());
  updateRemoveButtons();
}

function removeSourceRow(btn) {
  btn.closest('.source-row').remove();
  updateRemoveButtons();
}

function updateRemoveButtons() {
  const rows = document.querySelectorAll('#sourcesList .source-row');
  rows.forEach(r => {
    r.querySelector('.source-remove').style.visibility = rows.length > 1 ? 'visible' : 'hidden';
  });
}

function openNewTaskModal() {
  document.getElementById('promptOutput').innerHTML = '';
  document.getElementById('newTaskName').value = '';
  document.getElementById('sourcesList').innerHTML = sourceRowHtml();
  updateRemoveButtons();
  document.getElementById('newTaskModal').classList.add('open');
}
function closeNewTaskModal() {
  document.getElementById('newTaskModal').classList.remove('open');
}
function slugify(str) {
  return str.toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'new-task';
}

function collectSources() {
  const rows = document.querySelectorAll('#sourcesList .source-row');
  const sources = [];
  rows.forEach(row => {
    const type = row.querySelector('select').value;
    const value = row.querySelector('.source-value').value.trim();
    if (value) {
      const meta = SOURCE_TYPES.find(t => t.value === type) || SOURCE_TYPES[0];
      sources.push({ type, label: meta.label, value });
    }
  });
  return sources;
}

function buildTaskPromptStr() {
  const name = document.getElementById('newTaskName').value.trim();
  const sources = collectSources();
  if (!name || sources.length === 0) {
    return { error: 'Please enter a task name and at least one source artifact.' };
  }
  const slug = slugify(name);
  const sourcesBlock = sources
    .map((s, i) => `${i + 1}. [${s.label}] ${s.value}`)
    .join('\n');
  const prompt =
`@Design Lead Run the full design lifecycle for a new task named "${name}".

Source artifacts:
${sourcesBlock}

Use all of the above artifacts as input. Create all output under tasks/${slug}/ using the standard phase structure (research, strategy, ideation, designs, prototypes, tests, handoff). When complete, register the task in index.html's TASKS array (id: "${slug}", dir: "tasks/${slug}") so it appears on the Home page.`;
  return { prompt, agent: 'design-lead', taskId: slug, kind: 'new-task' };
}

function generateTaskPrompt() {
  const built = buildTaskPromptStr();
  const out = document.getElementById('promptOutput');
  if (built.error) {
    out.innerHTML = `<p style="color:var(--color-error-500,#dc2626);font-size:0.8rem;margin-top:8px">${built.error}</p>`;
    return;
  }
  renderCopyFallback(out, built.prompt, 'Copy this prompt to your agent');
}

function runTaskAgent() {
  const built = buildTaskPromptStr();
  const out = document.getElementById('promptOutput');
  if (built.error) {
    out.innerHTML = `<p style="color:var(--color-error-500,#dc2626);font-size:0.8rem;margin-top:8px">${built.error}</p>`;
    return;
  }
  if (BRIDGE.online) {
    runAgent({ kind: built.kind, prompt: built.prompt, agent: built.agent, taskId: built.taskId, mountEl: out, label: 'Starting Design Lead…' });
  } else {
    renderCopyFallback(out, built.prompt);
  }
}
function copyPrompt(btn) {
  const text = document.getElementById('generatedPrompt').innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
  });
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

function buildGlobalSidebar(active) {
  const sb = document.getElementById('sidebar');
  const nav = document.getElementById('globalNav');
  if (!sb || !nav) return;
  if (railCollapsed()) sb.classList.add('rail-collapsed');

  const toolItems = TOOLS.map(tool => {
    const isActive = active && active.type === 'tool' && active.id === tool.id;
    const disabled = tool.status === 'soon';
    const onclick = disabled ? '' : `onclick="openToolPage('${tool.id}')"`;
    return `
      <a class="nav-item ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}"
         ${onclick} title="${tool.name}${disabled ? ' (coming soon)' : ''}">
        <span class="nav-ico">${ICONS[tool.icon] || ICONS.evaluate}</span>
        <span class="nav-item-label">${tool.name}</span>
        ${disabled ? '<span class="soon-tag">Soon</span>' : ''}
      </a>`;
  }).join('');

  const taskItems = TASKS.map(task => {
    const isActive = active && active.type === 'task' && active.id === task.id;
    return `
      <a class="nav-item ${isActive ? 'active' : ''}"
         onclick="openTaskPage('${task.id}')" title="${task.title}">
        <span class="nav-ico">${ICONS.folder}</span>
        <span class="nav-item-label">${task.title}</span>
      </a>`;
  }).join('');

  nav.innerHTML = `
    <div class="nav-section">
      <div class="nav-section-label">Tools</div>
      ${toolItems}
    </div>
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
function commandText() {
  const box = document.getElementById('commandInput');
  return box ? box.value.trim() : '';
}

function fillCommand(text) {
  const box = document.getElementById('commandInput');
  if (box) { box.value = text; box.focus(); }
}

function buildCommandPromptStr() {
  const text = commandText();
  if (!text) return { error: "Type what you'd like the agent to do first." };
  const prompt =
`@Design Lead ${text}

If this requires creating new artifacts, place all output under tasks/<task-id>/ using the standard phase structure (research, strategy, ideation, designs, prototypes, tests, handoff), and register any new task in index.html's TASKS array so it appears on the Home page.`;
  return { prompt, agent: 'design-lead', kind: 'command' };
}

function runCommandPrompt() {
  const out = document.getElementById('commandOutput');
  if (!out) return;
  const built = buildCommandPromptStr();
  if (built.error) {
    out.innerHTML = `<p class="command-hint-error">${built.error}</p>`;
    return;
  }
  if (BRIDGE.online) {
    runAgent({ kind: built.kind, prompt: built.prompt, agent: built.agent, mountEl: out, label: 'Starting Design Lead…' });
  } else {
    renderCopyFallback(out, built.prompt);
  }
}

function copyCommandPrompt(btn) {
  const text = document.getElementById('generatedCommandPrompt').innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
  });
}

function createTaskFromCommand() {
  openNewTaskModal();
  const nameField = document.getElementById('newTaskName');
  if (nameField) nameField.value = commandText().slice(0, 100);
}

function initHomePage() {
  buildGlobalSidebar({ type: 'home' });
  const box = document.getElementById('commandInput');
  if (box) {
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); runCommandPrompt(); }
    });
  }
  bridgeBoot({ type: 'home' });
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

  // Active tool: Tenets &amp; Traps run form (reuses generateEvalPrompt)
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
}

/* =================================================================
   DESIGNLOOP BRIDGE — live agent runs
   Talks to the local Node bridge (bridge/server.js) to run the
   GitHub Copilot CLI headlessly and stream its output here.
   Gracefully degrades to "copy prompt" when the bridge is offline.
   ================================================================= */
const BRIDGE = { online: false, copilot: null, checked: false };

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
    }
  } catch { /* offline / no tasks */ }
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
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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
      <pre class="run-log" aria-label="Agent output log"></pre>
      <div class="run-artifacts"></div>
    </div>`;
}

function appendLogLine(logEl, stream, line) {
  if (!logEl) return;
  const div = document.createElement('div');
  div.className = `log-line ${stream || 'stdout'}`;
  div.textContent = line;
  logEl.appendChild(div);
  logEl.scrollTop = logEl.scrollHeight;
}

let CURRENT_JOB = null;

async function runAgent({ kind, prompt, agent, taskId, mountEl, label }) {
  if (!mountEl) return;
  const cleanPrompt = stripAgentPrefix(prompt);
  mountEl.innerHTML = processingPanelHtml(label || 'Starting…');
  const logEl = mountEl.querySelector('.run-log');
  const statusEl = mountEl.querySelector('.run-status-text');
  const cancelBtn = mountEl.querySelector('.run-cancel');

  let jobId = null;
  try {
    const res = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: cleanPrompt, agent, taskId, kind }),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      throw new Error(`Bridge responded ${res.status} ${txt}`);
    }
    const data = await res.json();
    jobId = data.jobId;
  } catch (err) {
    statusEl.textContent = 'Could not reach the bridge.';
    appendLogLine(logEl, 'stderr', String(err.message || err));
    appendLogLine(logEl, 'system', 'Falling back to copy-prompt mode.');
    cancelBtn.textContent = 'Copy prompt instead';
    cancelBtn.onclick = () => renderCopyFallback(mountEl, prompt);
    return;
  }

  CURRENT_JOB = jobId;
  cancelBtn.onclick = () => cancelJob(jobId);

  const es = new EventSource(`/api/jobs/${jobId}/stream`);
  es.addEventListener('log', (e) => {
    try { const d = JSON.parse(e.data); appendLogLine(logEl, d.stream, d.line); } catch {}
  });
  es.addEventListener('status', (e) => {
    let d; try { d = JSON.parse(e.data); } catch { return; }
    if (d.status === 'running') {
      statusEl.textContent = 'Processing…';
    } else if (d.status === 'done') {
      es.close();
      finishRun(mountEl, { ok: true, artifacts: d.artifacts || [], taskId });
    } else if (d.status === 'error') {
      es.close();
      finishRun(mountEl, { ok: false, artifacts: d.artifacts || [], error: d.error, taskId, prompt, agent, kind, label });
    } else if (d.status === 'cancelled') {
      es.close();
      finishRun(mountEl, { cancelled: true, taskId });
    }
  });
  es.onerror = () => { /* browser auto-reconnects; server replays buffered log */ };
}

async function finishRun(mountEl, { ok, cancelled, artifacts = [], error, taskId, prompt, agent, kind, label }) {
  CURRENT_JOB = null;
  const panel = mountEl.querySelector('.processing-panel');
  const spinner = mountEl.querySelector('.run-spinner');
  const statusEl = mountEl.querySelector('.run-status-text');
  const cancelBtn = mountEl.querySelector('.run-cancel');
  const artifactsEl = mountEl.querySelector('.run-artifacts');
  if (spinner) spinner.classList.add('stopped');
  if (panel) panel.classList.add(ok ? 'is-done' : (cancelled ? 'is-cancelled' : 'is-error'));

  if (cancelled) {
    if (statusEl) statusEl.textContent = 'Run cancelled.';
    if (cancelBtn) { cancelBtn.textContent = 'Close'; cancelBtn.onclick = () => { mountEl.innerHTML = ''; }; }
    return;
  }

  if (!ok) {
    if (statusEl) statusEl.textContent = error ? `Run failed: ${error}` : 'Run failed.';
    if (cancelBtn) {
      cancelBtn.textContent = 'Retry';
      cancelBtn.onclick = () => runAgent({ kind, prompt, agent, taskId, mountEl, label });
    }
  } else {
    if (statusEl) {
      statusEl.textContent = artifacts.length
        ? `Done — ${artifacts.length} artifact${artifacts.length === 1 ? '' : 's'} created.`
        : 'Done — no file changes detected.';
    }
    if (cancelBtn) { cancelBtn.textContent = 'Done'; cancelBtn.onclick = () => { mountEl.innerHTML = ''; }; }
  }

  await refreshTasks();

  if (artifactsEl && artifacts.length) {
    const items = artifacts.map(a => {
      const href = artifactLink(a.path);
      const name = a.path.split('/').pop();
      if (href) {
        return `<a class="run-artifact" href="${href}">
          <span class="run-artifact-ico">${a.isMarkdown ? ICONS.doc : ICONS.code}</span>
          <span class="run-artifact-name">${escapeHtml(name)}</span>
          <small>${escapeHtml(a.path)}</small></a>`;
      }
      return `<div class="run-artifact">
        <span class="run-artifact-ico">${ICONS.doc}</span>
        <span class="run-artifact-name">${escapeHtml(name)}</span>
        <small>${escapeHtml(a.path)}</small></div>`;
    }).join('');
    artifactsEl.innerHTML = `<div class="run-artifacts-head">Generated artifacts</div>${items}`;
  }
}

async function cancelJob(jobId) {
  try { await fetch(`/api/jobs/${jobId}`, { method: 'DELETE' }); } catch { /* ignore */ }
}
