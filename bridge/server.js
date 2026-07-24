'use strict';

/**
 * DesignLoop Bridge — a tiny localhost server that:
 *   1. Serves the static DesignLoop site (index.html, task.html, tool.html, assets/, tasks/).
 *   2. Exposes a small API to run the GitHub Copilot CLI headlessly and stream its output,
 *      so the website can trigger agent work and watch it live without copy-pasting prompts.
 *
 * Zero external dependencies. Binds to 127.0.0.1 only (local single-user).
 *
 * Run:  node bridge/server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');
const JSZip = require('jszip');
const mammoth = require('mammoth');
const pdfParse = require('pdf-parse');
const WordExtractor = require('word-extractor');
const xlsx = require('xlsx');
const { XMLParser } = require('fast-xml-parser');
const { JobManager, COPILOT_BIN } = require('./jobs');
const { Verifier } = require('./verifier');
const { attachWss } = require('./ws');
const { serializePrototype } = require('./figma-serialize');
const { fetchUrl, browseUrl, listSessions, clearSession, detectProvider, hasSession } = require('./fetcher');
const hits = require('./hits');

const ROOT = path.resolve(__dirname, '..');     // repo root (parent of bridge/)
const HOST = '127.0.0.1';
const PORT = Number(process.env.PORT) || 8099;

const jobs     = new JobManager({ root: ROOT, concurrency: 1 });
const verifier = new Verifier({ root: ROOT });
jobs.setVerifier(verifier);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json; charset=utf-8',
};

/* ───────────────────────────── helpers ───────────────────────────── */

// CORS: the prototype workspace dev server (:3100) is a different origin from
// this bridge (:8099), so browser calls from it need permissive CORS headers.
// This bridge is a localhost-only developer tool, so `*` is acceptable.
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...CORS_HEADERS,
  });
  res.end(body);
}

/**
 * Run a git command from the repo root, resolving with { code, stdout, stderr }.
 * Never rejects — callers inspect `code` to decide success.
 */
function runGit(args) {
  return new Promise((resolve) => {
    let stdout = '';
    let stderr = '';
    let proc;
    try {
      proc = spawn('git', args, { cwd: ROOT, env: process.env });
    } catch (e) {
      return resolve({ code: -1, stdout: '', stderr: e.message });
    }
    proc.stdout.on('data', (d) => { stdout += d; });
    proc.stderr.on('data', (d) => { stderr += d; });
    proc.on('error', (e) => resolve({ code: -1, stdout, stderr: stderr || e.message }));
    proc.on('close', (code) => resolve({ code, stdout: stdout.trim(), stderr: stderr.trim() }));
  });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const BODY_LIMIT_BYTES = 12 * 1024 * 1024;
    let data = '';
    let tooBig = false;
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > BODY_LIMIT_BYTES) { tooBig = true; req.destroy(); }
    });
    req.on('end', () => {
      if (tooBig) return reject(new Error('Request body too large'));
      if (!data) return resolve({});
      try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

/** Map a custom agent display name (e.g. "@Tester") to its CLI slug. */
function agentSlug(input) {
  if (!input) return null;
  return String(input)
    .replace(/^@/, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || null;
}

/** Look up the runner declared by a skill's tool.json ("copilot" | "claude").
 *  Some skills (e.g. fluent-to-figma) must run on Claude Code because they use
 *  Figma MCP write tools the Copilot CLI cannot access. Defaults to "copilot". */
function toolRunner(toolId) {
  if (!toolId) return 'copilot';
  try {
    const p = path.join(ROOT, '.github', 'skills', String(toolId), 'tool.json');
    const j = JSON.parse(fs.readFileSync(p, 'utf8'));
    return j && j.runner === 'claude' ? 'claude' : 'copilot';
  } catch { return 'copilot'; }
}

function safeFileName(name, fallback = 'attachment') {
  const clean = String(name || fallback)
    .replace(/[\\/]/g, '_')
    .replace(/\s+/g, ' ')
    .trim();
  const withoutDotDot = clean.replace(/\.\.+/g, '.');
  return (withoutDotDot || fallback).slice(0, 120);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function extLower(p) {
  return path.extname(String(p || '')).toLowerCase();
}

function isTextLikeExtension(ext) {
  return ['.txt', '.md', '.markdown', '.json', '.csv', '.yaml', '.yml', '.html', '.htm', '.xml', '.js', '.ts', '.tsx', '.jsx', '.css'].includes(ext);
}

function normalizeWhitespace(s) {
  return String(s || '').replace(/\r/g, '').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

function truncateText(text, maxChars = 120000) {
  const cleaned = normalizeWhitespace(text);
  if (cleaned.length <= maxChars) return { text: cleaned, truncated: false };
  return {
    text: `${cleaned.slice(0, maxChars)}\n\n[TRUNCATED: original length ${cleaned.length} chars]`,
    truncated: true,
  };
}

function isCompoundDocumentFile(absPath) {
  try {
    const header = fs.readFileSync(absPath).subarray(0, 8);
    const cdf = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]);
    return header.length === cdf.length && header.equals(cdf);
  } catch {
    return false;
  }
}

function detectProtectedOfficeDocument(absPath) {
  try {
    const sample = fs.readFileSync(absPath).subarray(0, 256 * 1024).toString('latin1');
    if (/DRMEncrypted|Microsoft Rights Label|License-Acquisition-URL|aadrm\.com|EncryptedPackage/i.test(sample)) {
      return 'This document appears to be Microsoft Rights Management / sensitivity-label protected. The uploaded file content is encrypted and cannot be extracted directly by the local bridge. Open the file in Microsoft Word with the authorized account and export an unprotected copy, or attach readable source text instead.';
    }
  } catch {
    // ignore
  }
  return null;
}

async function extractDocx(absPath) {
  const result = await mammoth.extractRawText({ path: absPath });
  return result && result.value ? result.value : '';
}

async function extractLegacyWord(absPath) {
  const extractor = new WordExtractor();
  const doc = await extractor.extract(absPath);
  return doc && typeof doc.getBody === 'function' ? doc.getBody() : '';
}

async function extractPdf(absPath) {
  const buffer = fs.readFileSync(absPath);
  const parsed = await pdfParse(buffer);
  return parsed && parsed.text ? parsed.text : '';
}

function extractXlsx(absPath) {
  const wb = xlsx.readFile(absPath, { cellDates: true });
  const parts = [];
  for (const name of wb.SheetNames || []) {
    const ws = wb.Sheets[name];
    const csv = xlsx.utils.sheet_to_csv(ws || {}, { blankrows: false });
    parts.push(`# Sheet: ${name}\n${csv}`);
  }
  return parts.join('\n\n');
}

async function extractPptx(absPath) {
  const zipData = fs.readFileSync(absPath);
  const zip = await JSZip.loadAsync(zipData);
  const parser = new XMLParser({ ignoreAttributes: true, trimValues: false });

  const slideFiles = Object.keys(zip.files)
    .filter((k) => /^ppt\/slides\/slide\d+\.xml$/i.test(k))
    .sort((a, b) => {
      const na = Number((a.match(/slide(\d+)\.xml/i) || [])[1] || 0);
      const nb = Number((b.match(/slide(\d+)\.xml/i) || [])[1] || 0);
      return na - nb;
    });

  const readNodes = (node, out) => {
    if (node == null) return;
    if (typeof node === 'string') {
      const v = node.trim();
      if (v) out.push(v);
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((n) => readNodes(n, out));
      return;
    }
    if (typeof node === 'object') {
      Object.entries(node).forEach(([k, v]) => {
        if (k === 'a:t' || k.endsWith(':t')) readNodes(v, out);
        else readNodes(v, out);
      });
    }
  };

  const slides = [];
  for (const file of slideFiles) {
    const xml = await zip.file(file).async('string');
    const parsed = parser.parse(xml);
    const texts = [];
    readNodes(parsed, texts);
    slides.push(texts.join(' '));
  }
  return slides.map((s, i) => `# Slide ${i + 1}\n${s}`).join('\n\n');
}

async function extractDocumentContent(absPath, relPath, mime) {
  const ext = extLower(relPath);
  try {
    const protectedReason = detectProtectedOfficeDocument(absPath);
    if (protectedReason) return protectedReason;
    if (isCompoundDocumentFile(absPath)) {
      return await extractLegacyWord(absPath);
    }
    if (isTextLikeExtension(ext) || String(mime || '').startsWith('text/')) {
      return fs.readFileSync(absPath, 'utf8');
    }
    if (ext === '.docx') return await extractDocx(absPath);
    if (ext === '.pdf') return await extractPdf(absPath);
    if (ext === '.xlsx' || ext === '.xls') return extractXlsx(absPath);
    if (ext === '.pptx') return await extractPptx(absPath);
    return '';
  } catch {
    return '';
  }
}

function looksLikeUrl(value) {
  try {
    const u = new URL(String(value || ''));
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

async function fetchLinkedSourceContent(rawUrl) {
  if (!looksLikeUrl(rawUrl)) {
    return { ok: false, content: '', note: 'not a valid URL' };
  }

  const provider = detectProvider(rawUrl);
  try {
    if (provider === 'microsoft') {
      const result = await browseUrl(rawUrl, { provider: 'microsoft', headless: true });
      return { ok: true, content: result.content || '', title: result.title || '', note: null };
    }

    const fast = await fetchUrl(rawUrl);
    const content = fast && fast.content ? String(fast.content) : '';
    if (content) return { ok: true, content, title: '', note: null };

    // Fallback to browser fetch for JS-rendered public pages.
    const rendered = await browseUrl(rawUrl, { headless: true });
    return { ok: true, content: rendered.content || '', title: rendered.title || '', note: null };
  } catch (e) {
    return { ok: false, content: '', note: e && e.message ? e.message : 'fetch failed' };
  }
}

async function materializeSourceArtifacts(sourceArtifacts) {
  if (!Array.isArray(sourceArtifacts) || !sourceArtifacts.length) {
    return { promptBlock: '', files: [], links: [], extractedFiles: [] };
  }

  const runId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const relBase = `.designloop/sources/${runId}`;
  const absBase = path.join(ROOT, relBase);
  ensureDir(absBase);

  const files = [];
  const links = [];
  const usedNames = new Set();

  sourceArtifacts.forEach((item, idx) => {
    if (!item || typeof item !== 'object') return;
    const type = String(item.type || '').trim().toLowerCase();

    if (type === 'link') {
      const value = String(item.value || '').trim();
      if (!value) return;
      links.push({
        label: String(item.label || `link-${idx + 1}`).trim() || `link-${idx + 1}`,
        value,
      });
      return;
    }

    if (type !== 'file') return;

    const label = String(item.label || `attachment-${idx + 1}`).trim() || `attachment-${idx + 1}`;
    const baseName = safeFileName(item.value || label, `attachment-${idx + 1}`);
    let fileName = baseName;
    let n = 2;
    while (usedNames.has(fileName)) {
      const dot = baseName.lastIndexOf('.');
      fileName = dot > 0
        ? `${baseName.slice(0, dot)}-${n}${baseName.slice(dot)}`
        : `${baseName}-${n}`;
      n += 1;
    }
    usedNames.add(fileName);
    const relPath = `${relBase}/${fileName}`;
    const absPath = path.join(ROOT, relPath);
    let wrote = false;
    try {
      if (item.content && item.encoding === 'base64') {
        fs.writeFileSync(absPath, Buffer.from(String(item.content), 'base64'));
        wrote = true;
      } else if (item.content && item.encoding === 'utf8') {
        fs.writeFileSync(absPath, String(item.content), 'utf8');
        wrote = true;
      }
    } catch {
      wrote = false;
    }

    files.push({ label, path: relPath, wrote, mime: item.mime || null });
  });

  if (!files.length && !links.length) {
    return { promptBlock: '', files: [], links: [], extractedFiles: [] };
  }

  const extractedFiles = [];
  for (const f of files) {
    if (!f.wrote) continue;
    const absPath = path.join(ROOT, f.path);
    const extracted = await extractDocumentContent(absPath, f.path, f.mime);
    const normalized = truncateText(extracted);
    if (!normalized.text) continue;
    const extractRel = `${f.path}.extracted.md`;
    const extractAbs = path.join(ROOT, extractRel);
    try {
      fs.writeFileSync(extractAbs, normalized.text, 'utf8');
      extractedFiles.push({
        label: f.label,
        sourcePath: f.path,
        extractedPath: extractRel,
        truncated: normalized.truncated,
      });
    } catch {
      // ignore write failure and continue
    }
  }

  const fetchedLinks = [];
  for (let i = 0; i < links.length; i += 1) {
    const l = links[i];
    const fetched = await fetchLinkedSourceContent(l.value);
    if (!fetched.ok || !fetched.content) {
      fetchedLinks.push({
        label: l.label,
        url: l.value,
        fetchedPath: null,
        note: fetched.note || 'no readable content',
      });
      continue;
    }

    const normalized = truncateText(fetched.content);
    const rel = `${relBase}/link-${i + 1}.fetched.md`;
    const abs = path.join(ROOT, rel);
    try {
      fs.writeFileSync(abs, normalized.text, 'utf8');
      fetchedLinks.push({
        label: l.label,
        url: l.value,
        fetchedPath: rel,
        truncated: normalized.truncated,
        title: fetched.title || '',
        note: null,
      });
    } catch {
      fetchedLinks.push({
        label: l.label,
        url: l.value,
        fetchedPath: null,
        note: 'failed to write fetched content',
      });
    }
  }

  const lines = [];
  lines.push('Attached source artifacts from the UI:');
  if (files.length) {
    lines.push('Files saved in workspace (read these files directly):');
    files.forEach((f) => {
      lines.push(`- ${f.label}: ${f.path}${f.wrote ? '' : ' (metadata only; content unavailable)'}`);
    });
  }
  if (links.length) {
    lines.push('Links provided by the user:');
    links.forEach((l) => lines.push(`- ${l.label}: ${l.value}`));
  }
  if (fetchedLinks.length) {
    lines.push('Fetched link content (preferred for analysis):');
    fetchedLinks.forEach((l) => {
      if (l.fetchedPath) {
        lines.push(`- ${l.label}: ${l.fetchedPath}${l.truncated ? ' (truncated)' : ''}`);
      } else {
        lines.push(`- ${l.label}: fetch unavailable (${l.note || 'unknown reason'})`);
      }
    });
  }
  if (extractedFiles.length) {
    lines.push('Extracted document text (preferred for analysis):');
    extractedFiles.forEach((f) => {
      lines.push(`- ${f.label}: ${f.extractedPath}${f.truncated ? ' (truncated)' : ''}`);
    });
  }

  return {
    promptBlock: `\n\n${lines.join('\n')}\n`,
    files,
    links,
    fetchedLinks,
    extractedFiles,
  };
}

function sourceContextSummary(sourceCtx) {
  if (!sourceCtx || typeof sourceCtx !== 'object') {
    return { files: [], extractedFiles: [], links: [], fetchedLinks: [] };
  }
  const pick = (arr, keys) => (Array.isArray(arr) ? arr.map((x) => {
    const out = {};
    keys.forEach((k) => { if (x && Object.prototype.hasOwnProperty.call(x, k)) out[k] = x[k]; });
    return out;
  }) : []);

  return {
    files: pick(sourceCtx.files, ['label', 'path', 'wrote', 'mime']),
    extractedFiles: pick(sourceCtx.extractedFiles, ['label', 'sourcePath', 'extractedPath', 'truncated']),
    links: pick(sourceCtx.links, ['label', 'value']),
    fetchedLinks: pick(sourceCtx.fetchedLinks, ['label', 'url', 'fetchedPath', 'truncated', 'note']),
  };
}

function slugFromText(raw, fallback = 'new-task') {
  const slug = String(raw || '')
    .toLowerCase()
    .replace(/\.[a-z0-9]{1,8}$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return slug || fallback;
}

function inferTaskId(explicitTaskId, userPrompt, sourceCtx) {
  const explicit = String(explicitTaskId || '').trim();
  if (explicit) return explicit;

  const firstLink = (sourceCtx && Array.isArray(sourceCtx.links) && sourceCtx.links.length)
    ? sourceCtx.links[0].value
    : null;
  if (firstLink) {
    try {
      const u = new URL(firstLink);
      const parts = u.pathname.split('/').filter(Boolean);
      const last = parts[parts.length - 1] || '';
      const domain = u.hostname.split('.').find((p) => p !== 'www' && p.length > 1) || u.hostname.split('.')[0];
      const prefix = parts.length > 1 ? parts[parts.length - 2] : domain;
      return slugFromText(`${domain}-${prefix}-${last}`, 'new-task');
    } catch {
      return slugFromText(firstLink, 'new-task');
    }
  }

  const firstFile = (sourceCtx && Array.isArray(sourceCtx.files) && sourceCtx.files.length)
    ? sourceCtx.files[0].label
    : null;
  if (firstFile) return slugFromText(firstFile, 'new-task');

  return slugFromText(userPrompt, 'new-task');
}

/* ───────────────────────── static file serving ───────────────────── */

function serveStatic(req, res) {
  let urlPath = decodeURIComponent((req.url.split('?')[0]) || '/');
  if (urlPath === '/') urlPath = '/index.html';

  const abs = path.normalize(path.join(ROOT, urlPath));
  if (!abs.startsWith(ROOT + path.sep) && abs !== ROOT) {
    return sendJson(res, 403, { error: 'Forbidden' });
  }

  // Fallback for the Fluent prototype static export. The exported Next.js app
  // references assets with web-root-absolute paths (/_next/*, /icons/*,
  // /azure-service-icons/*) that live under prototype-workspace/out/. When such a
  // path isn't a real file at repo root, transparently resolve it from the export
  // so embedded prototype previews load their assets. Safe because these roots do
  // not exist at repo root (no collision with the DesignLoop site).
  const OUT_DIR = path.join(ROOT, 'prototype-workspace', 'out');
  function exportFallback() {
    const alt = path.normalize(path.join(OUT_DIR, urlPath));
    if (!alt.startsWith(OUT_DIR + path.sep) && alt !== OUT_DIR) return null;
    return alt;
  }

  fs.stat(abs, (err, stat) => {
    if (err || !stat.isFile()) {
      const alt = exportFallback();
      if (alt) {
        return fs.stat(alt, (err2, stat2) => {
          if (err2 || !stat2.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('404 Not Found');
          }
          const ext2 = path.extname(alt).toLowerCase();
          res.writeHead(200, {
            'Content-Type': MIME[ext2] || 'application/octet-stream',
            'Cache-Control': 'no-cache',
          });
          fs.createReadStream(alt).pipe(res);
        });
      }
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found');
    }
    const ext = path.extname(abs).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    fs.createReadStream(abs).pipe(res);
  });
}

/* ─────────────────────── dynamic task discovery ──────────────────── */

const PHASES = [
  { id: 'discover', label: 'Discover', dirs: ['research'] },
  { id: 'define', label: 'Define', dirs: ['strategy'] },
  { id: 'ideate', label: 'Ideate', dirs: ['ideation'] },
  { id: 'design', label: 'Design', dirs: ['designs'] },
  { id: 'prototype', label: 'Prototype', dirs: ['prototypes'] },
  { id: 'test', label: 'Test', dirs: ['tests'] },
  { id: 'deliver', label: 'Deliver', dirs: ['handoff'] },
];

function walkFiles(absDir, relBase, out) {
  let entries;
  try { entries = fs.readdirSync(absDir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.name.startsWith('.')) continue;
    const abs = path.join(absDir, e.name);
    const rel = relBase ? `${relBase}/${e.name}` : e.name;
    if (e.isDirectory()) walkFiles(abs, rel, out);
    else out.push(rel);
  }
}

function titleCase(slug) {
  return slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Read and parse the leading YAML frontmatter block of a markdown file, plus a
 * short prose excerpt. Hand-rolled (no dependency) and defensive — returns null
 * when the file can't be read. Missing fields simply come back undefined.
 */
function readArtifactMeta(absPath, fallbackTitle) {
  let raw;
  try { raw = fs.readFileSync(absPath, 'utf8'); } catch { return null; }

  const meta = { title: fallbackTitle || null, status: null, created: null, updated: null, author: null, excerpt: null };

  let body = raw;
  const fm = raw.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (fm) {
    body = raw.slice(fm[0].length);
    const lines = fm[1].split(/\r?\n/);
    for (const line of lines) {
      const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
      if (!m) continue;
      const key = m[1].toLowerCase();
      let val = m[2].trim();
      if (!val) continue; // skip block/list keys like `related:`
      val = val.replace(/^["']/, '').replace(/["']$/, '').trim();
      if (key === 'title') meta.title = val;
      else if (key === 'status') meta.status = val;
      else if (key === 'created') meta.created = val;
      else if (key === 'updated') meta.updated = val;
      else if (key === 'author') meta.author = val;
    }
  }

  // Excerpt: first non-empty prose line that isn't a heading/frontmatter list item.
  const prose = body.split(/\r?\n/);
  for (let ln of prose) {
    ln = ln.trim();
    if (!ln) continue;
    if (/^#{1,6}\s/.test(ln)) continue; // markdown heading
    if (/^[-*>|]/.test(ln)) continue;   // list/quote/table
    if (/^(related|tags)\s*:/.test(ln.toLowerCase())) continue;
    meta.excerpt = ln
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[*_`]/g, '')
      .slice(0, 240);
    break;
  }

  return meta;
}

/**
 * Rewrite the `status:` (and refresh `updated:`) fields in a markdown artifact's
 * YAML frontmatter, preserving everything else. If the file has no frontmatter,
 * a minimal block is prepended. Returns the new status on success; throws on I/O
 * errors. Used by the report card to let users mark a test check completed.
 */
function updateArtifactStatus(absPath, newStatus) {
  const raw = fs.readFileSync(absPath, 'utf8');
  const today = new Date().toISOString().slice(0, 10);
  const fm = raw.match(/^(\uFEFF?)(---\r?\n)([\s\S]*?)(\r?\n---\r?\n?)/);

  if (fm) {
    const bom = fm[1] || '';
    const open = fm[2];
    let inner = fm[3];
    const close = fm[4];
    const body = raw.slice(fm[0].length);
    const eol = /\r\n/.test(open) ? '\r\n' : '\n';

    if (/^status\s*:.*$/im.test(inner)) {
      inner = inner.replace(/^status\s*:.*$/im, `status: ${newStatus}`);
    } else {
      inner += `${eol}status: ${newStatus}`;
    }
    if (/^updated\s*:.*$/im.test(inner)) {
      inner = inner.replace(/^updated\s*:.*$/im, `updated: ${today}`);
    } else {
      inner += `${eol}updated: ${today}`;
    }
    fs.writeFileSync(absPath, `${bom}${open}${inner}${close}${body}`, 'utf8');
  } else {
    const block = `---\nstatus: ${newStatus}\nupdated: ${today}\n---\n\n`;
    fs.writeFileSync(absPath, block + raw, 'utf8');
  }
  return newStatus;
}

/** Scan tasks/<id>/ to build the registry the frontend renders. */
/* Read an optional per-task config (tasks/<id>/.task.json). Currently holds a
   user-set display title so renames survive bridge restarts without touching
   the folder id/slug or any artifact path references. Defensive: returns {} on
   any read/parse error. */
function readTaskConfig(id) {
  try {
    const p = path.join(ROOT, 'tasks', id, '.task.json');
    const raw = fs.readFileSync(p, 'utf8');
    const obj = JSON.parse(raw);
    return obj && typeof obj === 'object' ? obj : {};
  } catch { return {}; }
}

/* ─── Figma "Send to Figma" per-task target registry ───
 * The target Figma file a task's prototypes are sent into is remembered so the
 * user only pastes the URL once. When the task has a tasks/<id>/ dir the target
 * lives in its .task.json (survives with the task); otherwise it falls back to
 * a bridge-side registry keyed by id. Never throws. */
const FIGMA_REGISTRY = path.join(__dirname, 'data', 'figma-targets.json');

/** Extract the file key from a Figma file/design/proto URL, or null. */
function figmaFileKey(url) {
  const m = String(url || '').match(/figma\.com\/(?:design|file|proto)\/([A-Za-z0-9]+)/i);
  return m ? m[1] : null;
}

/** Is Figma's local desktop MCP server up? (127.0.0.1:3845, no OAuth, not
 *  client-gated — usable by the Copilot CLI.) TCP-connect probe; never throws. */
function probeFigmaLocalMcp() {
  const host = process.env.FIGMA_MCP_HOST || '127.0.0.1';
  const port = Number(process.env.FIGMA_MCP_PORT) || 3845;
  return new Promise((resolve) => {
    const net = require('net');
    const socket = net.connect({ host, port });
    const done = (ok) => { try { socket.destroy(); } catch {} resolve(ok); };
    socket.setTimeout(1500);
    socket.once('connect', () => done(true));
    socket.once('timeout', () => done(false));
    socket.once('error', () => done(false));
  });
}

function readFigmaRegistry() {
  try {
    const obj = JSON.parse(fs.readFileSync(FIGMA_REGISTRY, 'utf8'));
    return obj && typeof obj === 'object' ? obj : {};
  } catch { return {}; }
}

/** Resolve the saved Figma target for a task/prototype id → { url, fileKey } | null. */
function readFigmaTarget(id) {
  if (!id) return null;
  const cfg = readTaskConfig(id);
  if (cfg.figmaFile && cfg.figmaFile.url) return cfg.figmaFile;
  const reg = readFigmaRegistry();
  return reg[id] || null;
}

/** Persist the Figma target for a task/prototype id. Returns the stored value. */
function saveFigmaTarget(id, url) {
  const fileKey = figmaFileKey(url);
  const value = { url: String(url), fileKey };
  const taskDir = path.join(ROOT, 'tasks', id);
  if (fs.existsSync(taskDir) && fs.statSync(taskDir).isDirectory()) {
    const cfg = readTaskConfig(id);
    cfg.figmaFile = value;
    fs.writeFileSync(path.join(taskDir, '.task.json'), JSON.stringify(cfg, null, 2) + '\n', 'utf8');
  } else {
    const reg = readFigmaRegistry();
    reg[id] = value;
    fs.mkdirSync(path.dirname(FIGMA_REGISTRY), { recursive: true });
    fs.writeFileSync(FIGMA_REGISTRY, JSON.stringify(reg, null, 2) + '\n', 'utf8');
  }
  return value;
}

/* ─── Figma plugin WebSocket relay ───
 * The DesignLoop Figma plugin connects to /figma-plugin and rebuilds a
 * serialized prototype as native layers. We keep the live connections here and
 * route a build job's messages to/from the plugin, bridging into a manual job
 * so the workspace card shows live progress + a deep link. */
const figmaPluginClients = new Set();     // WsConnection
const figmaBuildJobs = new Map();         // jobId -> { job, deepLink }

/* ─── Fluent kit map (learned from the plugin's "Learn kit" action) ───
 * Maps normalized Fluent component-set names → their published variant keys, so
 * a build can instantiate real kit components instead of redrawing primitives.
 * Persisted to bridge/data/figma-kit.json (gitignored). */
const FIGMA_KIT = path.join(__dirname, 'data', 'figma-kit.json');

function normalizeKitName(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Detected Fluent component → candidate kit set names (normalized), in priority
// order. Kits name things slightly differently, so we try several.
const KIT_SYNONYMS = {
  button: ['button'],
  compoundbutton: ['compoundbutton', 'button'],
  menubutton: ['menubutton', 'button'],
  togglebutton: ['togglebutton', 'button'],
  splitbutton: ['splitbutton', 'button'],
  searchbox: ['searchbox', 'search', 'searchfield', 'searchinput'],
  input: ['input', 'textfield', 'textinput', 'text'],
  textarea: ['textarea', 'textfield', 'textinput'],
  dropdown: ['dropdown', 'combobox', 'select'],
  combobox: ['combobox', 'dropdown', 'select'],
  spinbutton: ['spinbutton', 'numberinput', 'input'],
  avatar: ['avatar', 'persona'],
  badge: ['badge'],
  counterbadge: ['counterbadge', 'badge'],
  presencebadge: ['presencebadge', 'badge'],
  checkbox: ['checkbox'],
  radio: ['radio', 'radiobutton', 'radioitem'],
  switch: ['switch', 'toggle'],
  slider: ['slider'],
  link: ['link', 'hyperlink'],
  divider: ['divider', 'separator'],
  spinner: ['spinner', 'progressring', 'loader'],
  progressbar: ['progressbar', 'progress'],
  tag: ['tag', 'chip'],
};

function readKitMap() {
  try { return JSON.parse(fs.readFileSync(FIGMA_KIT, 'utf8')); }
  catch { return null; }
}

/** Save a learned kit from the plugin. `components` is a flat array of
 * { set, name, key, props }. We group by normalized set name. */
function saveKitMap(components) {
  const sets = {};
  for (const c of (components || [])) {
    if (!c || !c.key) continue;
    const norm = normalizeKitName(c.set || c.name);
    if (!norm) continue;
    if (!sets[norm]) sets[norm] = { display: c.set || c.name, variants: [] };
    sets[norm].variants.push({ key: c.key, props: c.props || {} });
  }
  const map = { learnedAt: Date.now(), setCount: Object.keys(sets).length, sets };
  fs.mkdirSync(path.dirname(FIGMA_KIT), { recursive: true });
  fs.writeFileSync(FIGMA_KIT, JSON.stringify(map, null, 2) + '\n', 'utf8');
  return map;
}

// Prop-value tokens that indicate a neutral/default variant (used to pick a
// sensible variant when the DOM gives no strong hint).
const DEFAULT_TOKENS = new Set(['rest', 'medium', 'secondary', 'default', 'false', 'off', 'no', 'regular', 'normal', 'filled']);

/** Choose the best variant key for a detected component from the kit. */
function resolveKitComponent(fluent, kit) {
  if (!fluent || !kit || !kit.sets) return null;
  const candidates = KIT_SYNONYMS[normalizeKitName(fluent.component)] || [normalizeKitName(fluent.component)];
  let set = null;
  for (const cand of candidates) {
    if (kit.sets[cand]) { set = kit.sets[cand]; break; }
  }
  if (!set || !set.variants || !set.variants.length) return null;

  const props = fluent.props || {};
  const scoreVariant = (v) => {
    let score = 0;
    const vals = Object.entries(v.props || {});
    for (const [k, val] of vals) {
      const lk = String(k).toLowerCase();
      const lv = String(val).toLowerCase();
      // Match explicit DOM hints.
      if (props.disabled && (lk === 'state' ? lv === 'disabled' : (lk === 'disabled' && lv === 'true'))) score += 5;
      if (props.selected && ((lk === 'state' && lv === 'selected') || (lk === 'selected' && lv === 'true'))) score += 5;
      if (props.checked && ((lk === 'checked' && lv === 'true') || (lk === 'state' && lv === 'checked'))) score += 5;
      // Reward neutral defaults when no hint applies.
      if (DEFAULT_TOKENS.has(lv)) score += 1;
    }
    // Penalise obviously non-default states when the DOM gave no hint.
    if (!props.disabled && !props.selected && !props.checked) {
      for (const [, val] of vals) {
        const lv = String(val).toLowerCase();
        if (['disabled', 'selected', 'pressed', 'error'].includes(lv)) score -= 3;
      }
    }
    return score;
  };
  let best = set.variants[0], bestScore = -Infinity;
  for (const v of set.variants) {
    const s = scoreVariant(v);
    if (s > bestScore) { bestScore = s; best = v; }
  }
  return { componentKey: best.key, setName: set.display };
}

/** Walk the tree and attach a resolved kit key to each detected Fluent node.
 * Returns { matched, unmatched } counts. */
function annotateKit(root, kit) {
  let matched = 0, unmatched = 0;
  (function walk(n) {
    if (n.fluent) {
      const r = kit ? resolveKitComponent(n.fluent, kit) : null;
      if (r) { n.fluent.componentKey = r.componentKey; n.fluent.setName = r.setName; matched++; }
      else { unmatched++; }
    }
    for (const c of (n.children || [])) walk(c);
  })(root);
  return { matched, unmatched };
}


function buildFigmaDeepLink(target, nodeId) {
  const base = String((target && target.url) || '');
  if (!base) return null;
  if (!nodeId) return base;
  const enc = encodeURIComponent(nodeId);
  return base.includes('?') ? `${base}&node-id=${enc}` : `${base}?node-id=${enc}`;
}

/** Handle a message coming back from the plugin (progress / done / error / kit). */
function onFigmaPluginMessage(raw, conn) {
  let msg;
  try { msg = JSON.parse(raw); } catch { return; }
  if (!msg || msg.type === 'hello') return;

  // "Learn kit" result: persist the component→key map and acknowledge.
  if (msg.type === 'kit') {
    const map = saveKitMap(msg.components || []);
    console.log(`  Figma kit learned: ${map.setCount} component set(s).`);
    if (conn) conn.send(JSON.stringify({ type: 'kit-ack', setCount: map.setCount }));
    return;
  }

  const entry = msg.jobId ? figmaBuildJobs.get(msg.jobId) : null;
  if (!entry) return;
  const { job } = entry;
  if (msg.type === 'progress') {
    if (msg.message) jobs.manualLog(job, msg.message);
  } else if (msg.type === 'done') {
    if (entry.timer) clearTimeout(entry.timer);
    if (msg.message) jobs.manualLog(job, `✔ ${msg.message}`);
    const link = buildFigmaDeepLink(entry.target, msg.nodeId);
    if (link) jobs.manualLog(job, `Open in Figma: ${link}`);
    jobs.manualFinish(job, { status: 'done', link });
    figmaBuildJobs.delete(msg.jobId);
  } else if (msg.type === 'error') {
    if (entry.timer) clearTimeout(entry.timer);
    jobs.manualLog(job, `✖ ${msg.message || 'Plugin build failed.'}`, 'stderr');
    jobs.manualFinish(job, { status: 'error', error: msg.message || 'Plugin build failed.' });
    figmaBuildJobs.delete(msg.jobId);
  }
}

/** Broadcast a build command to every connected plugin (usually one). */
function sendFigmaBuild(payload) {
  const str = JSON.stringify(payload);
  let sent = 0;
  for (const conn of figmaPluginClients) {
    if (conn.send(str)) sent++;
  }
  return sent;
}

/** Orchestrate a plugin build: snapshot the live prototype, then hand the tree
 * to the connected plugin and let onFigmaPluginMessage drive the job to done. */
async function runFigmaPluginBuild(job, prototypeId, target) {
  const entry = figmaBuildJobs.get(job.id);
  try {
    const liveUrl = `http://localhost:${PROTO_PORT}/${prototypeId}`;
    const tree = await serializePrototype(liveUrl, {
      onLog: (m) => jobs.manualLog(job, m),
    });
    if (!figmaPluginClients.size) {
      throw new Error('The DesignLoop Figma plugin disconnected before the build started. Re-open it in Figma.');
    }
    // Resolve detected Fluent components to learned kit component keys.
    const kit = readKitMap();
    const counts = annotateKit(tree.root, kit);
    if (kit) {
      jobs.manualLog(job, `Matched ${counts.matched} Fluent component(s) to the kit; ${counts.unmatched} will use fallback layers.`);
    } else if (counts.matched + counts.unmatched > 0) {
      jobs.manualLog(job, `No kit learned yet — run “Learn kit” in the plugin for real components. Building ${counts.unmatched} fallback layer(s).`);
    }
    const pageName = `DesignLoop — ${prototypeId}`;
    jobs.manualLog(job, `Sending ${tree.nodeCount} layers to the Figma plugin…`);
    const sent = sendFigmaBuild({
      type: 'build',
      jobId: job.id,
      pageName,
      fileKey: (target && target.fileKey) || null,
      tree,
    });
    if (!sent) throw new Error('Could not reach the Figma plugin.');
    // Safety timeout: if the plugin never reports done/error, fail the job.
    if (entry) {
      entry.timer = setTimeout(() => {
        if (!job.endedAt) {
          jobs.manualFinish(job, { status: 'error', error: 'Timed out waiting for the Figma plugin to finish.' });
        }
        figmaBuildJobs.delete(job.id);
      }, 4 * 60 * 1000);
    }
  } catch (e) {
    jobs.manualLog(job, `✖ ${e.message}`, 'stderr');
    jobs.manualFinish(job, { status: 'error', error: e.message });
    figmaBuildJobs.delete(job.id);
  }
}


function discoverTasks() {
  const tasksDir = path.join(ROOT, 'tasks');
  let ids;
  try {
    ids = fs.readdirSync(tasksDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
      .map((d) => d.name);
  } catch { return []; }

  return ids.map((id) => {
    const taskAbs = path.join(tasksDir, id);
    const customTitle = String(readTaskConfig(id).title || '').trim();
    const phases = [];
    for (const ph of PHASES) {
      const files = [];
      const components = [];
      for (const d of ph.dirs) {
        const phaseAbs = path.join(taskAbs, d);
        if (!fs.existsSync(phaseAbs)) continue;

        if (ph.id === 'prototype') {
          // Components: prototypes/components/<Name>/ with a matching demo.
          const compDir = path.join(phaseAbs, 'components');
          let comps = [];
          try {
            comps = fs.readdirSync(compDir, { withFileTypes: true })
              .filter((c) => c.isDirectory()).map((c) => c.name);
          } catch {}
          for (const name of comps) {
            const sources = [];
            const filesInComp = [];
            walkFiles(path.join(compDir, name), `prototypes/components/${name}`, filesInComp);
            for (const f of filesInComp) {
              const base = f.split('/').pop();
              let label = base;
              if (base.endsWith('.stories.tsx')) label = 'Stories.tsx';
              else if (base.endsWith('.module.css')) label = 'Styles.css';
              else if (base.endsWith('.tsx')) label = 'Component.tsx';
              sources.push({ path: f, label });
            }
            const demoRel = `prototypes/demos/${name}.html`;
            const demoExists = fs.existsSync(path.join(taskAbs, demoRel));
            components.push({ name, demo: demoExists ? demoRel : '', sources });
          }
          // Also surface loose markdown artifacts (manifest, audit, visual
          // verification, etc.) so the Prototype phase isn't empty when the
          // runnable source lives in the workspace rather than in components/.
          const found = [];
          walkFiles(phaseAbs, d, found);
          for (const rel of found) {
            if (!rel.toLowerCase().endsWith('.md')) continue;
            if (rel.includes('/components/')) continue;
            const base = rel.split('/').pop().replace(/\.md$/i, '');
            const label = titleCase(base);
            const meta = readArtifactMeta(path.join(taskAbs, rel), label);
            files.push({ path: rel, label, meta });
          }
        } else {
          const found = [];
          walkFiles(phaseAbs, d, found);
          for (const rel of found) {
            if (!rel.toLowerCase().endsWith('.md')) continue;
            const base = rel.split('/').pop().replace(/\.md$/i, '');
            const label = titleCase(base);
            const meta = readArtifactMeta(path.join(taskAbs, rel), label);
            files.push({ path: rel, label, meta });
          }
        }
      }
      if (files.length || components.length) {
        const phase = { id: ph.id, label: ph.label, files };
        if (components.length) phase.components = components;
        phases.push(phase);
      }
    }

    // Detect a Fluent prototype and expose it as an embeddable preview on the
    // Prototype phase. Preferred source is the live workspace route
    // (prototype-workspace/app/<id>/page.tsx), served by the auto-managed dev
    // server — no build required. A built static export (out/<id>/) is used as
    // an offline fallback. The workspace project id may differ from the task id,
    // so resolve candidate ids from the prototype manifest when needed.
    const outDir = path.join(ROOT, 'prototype-workspace', 'out');
    const appDir = path.join(ROOT, 'prototype-workspace', 'app');
    function exportExists(pid) {
      return pid && fs.existsSync(path.join(outDir, pid, 'index.html'));
    }
    function routeExists(pid) {
      return pid && (fs.existsSync(path.join(appDir, pid, 'page.tsx')) || fs.existsSync(path.join(appDir, pid, 'page.jsx')));
    }
    const candidates = [id];
    {
      const manifestAbs = path.join(taskAbs, 'prototypes', 'manifest.md');
      try {
        const mf = fs.readFileSync(manifestAbs, 'utf8');
        // Look for a `Route | /<id>` cell, a `Project id | `<id>`` cell, or a
        // `/prototype-workspace/out/<id>/` path, in that order.
        let m;
        const routeRe = /route[^\n|]*\|\s*`?\/?([a-z0-9][a-z0-9-_]*)`?/ig;
        while ((m = routeRe.exec(mf))) candidates.push(m[1]);
        const idRe = /project\s*id[^\n|]*\|\s*`?([a-z0-9][a-z0-9-_]*)`?/ig;
        while ((m = idRe.exec(mf))) candidates.push(m[1]);
        const outRe = /out\/([a-z0-9][a-z0-9-_]*)\//ig;
        while ((m = outRe.exec(mf))) candidates.push(m[1]);
      } catch { /* no manifest */ }
    }
    const routeId = candidates.find((c) => routeExists(c)) || null;
    const exportId = candidates.find((c) => exportExists(c)) || null;
    if (routeId || exportId) {
      let proto = phases.find((p) => p.id === 'prototype');
      if (!proto) {
        proto = { id: 'prototype', label: 'Prototype', files: [] };
        // Keep phases in lifecycle order.
        const order = PHASES.map((p) => p.id);
        phases.push(proto);
        phases.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
      }
      // Route path for the live dev server (frontend composes the absolute URL).
      if (routeId) proto.fluentPreviewRoute = `/${routeId}`;
      // Static export path (offline fallback), served by serveStatic's fallback.
      if (exportId) proto.fluentPreview = `/prototype-workspace/out/${exportId}/index.html`;
    }

    // Pick a "source" research brief if present.
    let source = null;
    const discover = phases.find((p) => p.id === 'discover');
    if (discover && discover.files.length) source = discover.files[0].path;

    return {
      id,
      dir: `tasks/${id}`,
      title: customTitle || titleCase(id),
      customTitle: customTitle || null,
      description: `Design lifecycle artifacts for ${customTitle || titleCase(id)}.`,
      source,
      phases,
    };
  });
}

/* ─────────────────────── Prototype report card ───────────────────────
 * A prototype's "report card" is the set of Test-stage checks that ran on it:
 * accessibility, security, usability, tenets & traps, visual verification, test
 * execution, and any other test artifact. Each check reports whether it ran, a
 * rolled-up status, and the artifact files (so the UI can link to the report). */

// Canonical check types, in display order. `match(rel)` tests a lowercased
// tests/-relative path (e.g. "usability/tenets-traps-evaluation-r1.md").
const CHECK_TYPES = [
  { key: 'accessibility', label: 'Accessibility', match: (p) => /accessib|a11y/.test(p) },
  { key: 'security',      label: 'Security',       match: (p) => /security|(^|\/)audit-|\baudit\b/.test(p) },
  { key: 'tenets-traps',  label: 'Tenets & Traps', match: (p) => /tenets?-?traps?/.test(p) },
  { key: 'usability',     label: 'Usability',      match: (p) => /usability|test-?plan|task-?scripts?|observation|moderator/.test(p) },
  { key: 'test-execution',label: 'Test Execution', match: (p) => /test-?execution|findings|results|synthesis/.test(p) },
  { key: 'visual',        label: 'Visual',         match: (p) => /visual|screenshot|regression/.test(p) },
];

// Status rollup order — a check's status is the strongest of its files'.
const STATUS_RANK = { completed: 4, approved: 3, 'in-review': 2, draft: 1, ran: 0 };
function strongerStatus(a, b) {
  const ra = STATUS_RANK[a] != null ? STATUS_RANK[a] : 0;
  const rb = STATUS_RANK[b] != null ? STATUS_RANK[b] : 0;
  return rb > ra ? b : a;
}

function classifyCheck(rel) {
  const p = String(rel || '').toLowerCase();
  for (const t of CHECK_TYPES) {
    if (t.match(p)) return t.key;
  }
  return 'other';
}

/**
 * Resolve a prototype id to its owning task id. Workspace-created prototypes use
 * the same slug for both; otherwise scan tasks whose prototype manifest declares
 * a matching route / project id / export path. Returns null when unresolved.
 */
function taskIdForPrototype(protoId) {
  if (!protoId) return null;
  const tasksDir = path.join(ROOT, 'tasks');
  const direct = path.join(tasksDir, protoId);
  if (fs.existsSync(direct) && fs.statSync(direct).isDirectory()) return protoId;

  let ids;
  try {
    ids = fs.readdirSync(tasksDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
      .map((d) => d.name);
  } catch { return null; }

  for (const id of ids) {
    const manifestAbs = path.join(tasksDir, id, 'prototypes', 'manifest.md');
    let mf;
    try { mf = fs.readFileSync(manifestAbs, 'utf8'); } catch { continue; }
    const cands = new Set();
    let m;
    const routeRe = /route[^\n|]*\|\s*`?\/?([a-z0-9][a-z0-9-_]*)`?/ig;
    while ((m = routeRe.exec(mf))) cands.add(m[1]);
    const idRe = /project\s*id[^\n|]*\|\s*`?([a-z0-9][a-z0-9-_]*)`?/ig;
    while ((m = idRe.exec(mf))) cands.add(m[1]);
    const outRe = /out\/([a-z0-9][a-z0-9-_]*)\//ig;
    while ((m = outRe.exec(mf))) cands.add(m[1]);
    if (cands.has(protoId)) return id;
  }
  return null;
}

/**
 * Build the report card for a task: categorize every Test-stage artifact into
 * canonical checks, roll up frontmatter status, and note whether each ran.
 * Returns { taskId, title, checks:[{key,label,ran,status,files:[…]}], ranCount }
 * or null when the task doesn't exist. Canonical types with no artifact are
 * included with ran:false so the UI can show a full checklist.
 */
function buildReportCard(taskId) {
  const taskAbs = path.join(ROOT, 'tasks', taskId);
  if (!fs.existsSync(taskAbs) || !fs.statSync(taskAbs).isDirectory()) return null;

  // Gather Test-stage files: markdown reports under tests/, plus visual
  // screenshots (which may live under tests/ or prototypes/tests/visual/).
  const groups = {}; // key -> { files:[], status }
  const addFile = (key, rel, label, meta) => {
    if (!groups[key]) groups[key] = { files: [], status: 'ran' };
    groups[key].files.push({
      path: rel,
      label,
      status: (meta && meta.status) || null,
      updated: (meta && (meta.updated || meta.created)) || null,
    });
    groups[key].status = strongerStatus(groups[key].status, (meta && meta.status) || 'ran');
  };

  const testsAbs = path.join(taskAbs, 'tests');
  if (fs.existsSync(testsAbs)) {
    const found = [];
    walkFiles(testsAbs, '', found); // rel is relative to tests/
    let sawScreenshot = false;
    for (const rel of found) {
      const lower = rel.toLowerCase();
      if (lower.endsWith('.md')) {
        const base = rel.split('/').pop().replace(/\.md$/i, '');
        const meta = readArtifactMeta(path.join(testsAbs, rel), titleCase(base));
        const label = (meta && meta.title) || titleCase(base);
        addFile(classifyCheck(rel), `tests/${rel}`, label, meta);
      } else if (/\.(png|jpe?g|gif|webp)$/i.test(lower)) {
        sawScreenshot = true;
      }
    }
    // Roll up any visual screenshots into a single "Visual" evidence entry.
    if (sawScreenshot && !groups.visual) {
      groups.visual = { files: [{ path: 'tests', label: 'Visual screenshots', status: null, updated: null }], status: 'ran' };
    }
  }

  // Also surface visual verification stored under prototypes/tests/visual/.
  const protoVisual = path.join(taskAbs, 'prototypes', 'tests', 'visual');
  if (fs.existsSync(protoVisual)) {
    const found = [];
    walkFiles(protoVisual, '', found);
    const hasShots = found.some((r) => /\.(png|jpe?g|gif|webp)$/i.test(r));
    if (hasShots && !groups.visual) {
      groups.visual = { files: [{ path: 'prototypes/tests/visual', label: 'Visual screenshots', status: null, updated: null }], status: 'ran' };
    }
  }

  // Assemble canonical checks first (preserving order), then any "other".
  const checks = [];
  for (const t of CHECK_TYPES) {
    const g = groups[t.key];
    checks.push({
      key: t.key,
      label: t.label,
      ran: !!g,
      status: g ? g.status : null,
      files: g ? g.files : [],
    });
  }
  if (groups.other) {
    checks.push({ key: 'other', label: 'Other Tests', ran: true, status: groups.other.status, files: groups.other.files });
  }

  const ranCount = checks.filter((c) => c.ran).length;
  const customTitle = String(readTaskConfig(taskId).title || '').trim();
  return { taskId, title: customTitle || titleCase(taskId), checks, ranCount };
}

/* ──────────────────────────── API router ─────────────────────────── */

/**
 * Collect the ids that are part of the LIVE repo baseline — the union of
 * data/live-prototypes.json entries and the LIVE_PROTOTYPE_IDS set declared in
 * data/projects.ts. Used to keep discovered LOCAL prototypes from duplicating
 * prototypes that already ship live.
 */
function liveIdSet() {
  const ids = new Set();
  try {
    const arr = JSON.parse(fs.readFileSync(path.join(PROTO_DIR, 'data', 'live-prototypes.json'), 'utf8'));
    if (Array.isArray(arr)) arr.forEach((e) => e && e.id && ids.add(e.id));
  } catch { /* no live registry */ }
  try {
    const src = fs.readFileSync(path.join(PROTO_DIR, 'data', 'projects.ts'), 'utf8');
    const m = src.match(/LIVE_PROTOTYPE_IDS\s*=\s*new Set<string>\(\[([\s\S]*?)\]\)/);
    if (m) {
      const re = /["'`]([a-z0-9][a-z0-9-_]*)["'`]/g;
      let x;
      while ((x = re.exec(m[1]))) ids.add(x[1]);
    }
  } catch { /* projects.ts unreadable */ }
  return ids;
}

/**
 * The local git user's display name (cached). Used as the author fallback for
 * prototypes that have no explicit author metadata.
 */
let _gitUserName;
function gitUserName() {
  if (_gitUserName !== undefined) return _gitUserName;
  try {
    _gitUserName = execSync('git config user.name', { cwd: ROOT, encoding: 'utf8' }).trim() || null;
  } catch { _gitUserName = null; }
  return _gitUserName;
}

/**
 * Best-effort author name for a prototype id: the author of the most recent
 * commit touching its files, falling back to the local git user name (for
 * untracked/never-committed prototypes). Never throws.
 */
function gitAuthorFor(id) {
  const scopes = [
    `prototype-workspace/app/${id}`,
    `prototype-workspace/components/projects/${id}`,
  ];
  try {
    const out = execSync(
      `git log -1 --format=%an -- ${scopes.map((s) => `"${s}"`).join(' ')}`,
      { cwd: ROOT, encoding: 'utf8' },
    ).trim();
    if (out) return out;
  } catch { /* no commit history for these paths */ }
  return gitUserName();
}

/**
 * Discover LOCAL prototypes by scanning prototype-workspace/app for route
 * directories that contain a page file. This is the source of truth for the
 * workspace listing locally, so ANY prototype an agent creates shows up as soon
 * as its files exist — no scaffold-script bookkeeping or bridge restart needed.
 * Metadata (title/author/createdBy) is enriched from public/local-prototypes.json
 * when present, otherwise derived from the id.
 */
function discoverLocalPrototypes() {
  const appDir = path.join(PROTO_DIR, 'app');
  const RESERVED = new Set(['workspace']); // framework/redirect routes, not prototypes
  const live = liveIdSet();

  const meta = {};
  try {
    const arr = JSON.parse(fs.readFileSync(path.join(PROTO_DIR, 'public', 'local-prototypes.json'), 'utf8'));
    if (Array.isArray(arr)) arr.forEach((e) => { if (e && e.id) meta[e.id] = e; });
  } catch { /* no local registry */ }

  let entries;
  try { entries = fs.readdirSync(appDir, { withFileTypes: true }); } catch { return []; }

  const items = [];
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    const id = e.name;
    if (id.startsWith('.') || id.startsWith('_') || RESERVED.has(id) || live.has(id)) continue;
    const hasPage =
      fs.existsSync(path.join(appDir, id, 'page.tsx')) ||
      fs.existsSync(path.join(appDir, id, 'page.jsx'));
    if (!hasPage) continue;
    const m = meta[id] || {};
    items.push({
      id,
      title: m.title || titleCase(id),
      description: m.description,
      status: m.status || 'in-progress',
      author: m.author || gitAuthorFor(id),
      createdBy: m.createdBy,
      origin: 'local',
      route: m.route || `/${id}`,
    });
  }
  // Newest first when a created timestamp is known.
  items.sort((a, b) => (meta[b.id]?.createdAt || '').localeCompare(meta[a.id]?.createdAt || ''));
  return items;
}

/**
 * Determine which local prototypes have uncommitted or unpushed changes at the
 * local end. A prototype is "dirty" when its files under
 * prototype-workspace/app/<id> or prototype-workspace/components/projects/<id>
 * show up in the working tree (untracked/modified/staged) OR in commits that
 * haven't been pushed to the upstream branch. Returns a Set of prototype ids.
 * Never throws — git failures resolve to an empty (or partial) set.
 */
async function dirtyPrototypeIds() {
  const ids = new Set();
  const scopes = ['prototype-workspace/app', 'prototype-workspace/components/projects'];
  const addFromPath = (p) => {
    if (!p) return;
    const clean = p.replace(/^"|"$/g, '');
    const m =
      clean.match(/prototype-workspace\/app\/([a-z0-9][a-z0-9-_]*)(?:\/|$)/i) ||
      clean.match(/prototype-workspace\/components\/projects\/([a-z0-9][a-z0-9-_]*)(?:\/|$)/i);
    if (m) ids.add(m[1]);
  };

  // Working-tree changes (untracked, modified, staged).
  const status = await runGit(['status', '--porcelain', '--', ...scopes]);
  if (status.code === 0) {
    for (const line of status.stdout.split('\n')) {
      if (!line.trim()) continue;
      // Porcelain v1: "XY <path>" (rename shows "orig -> new"; take the new path).
      let p = line.slice(3).trim();
      const arrow = p.indexOf(' -> ');
      if (arrow !== -1) p = p.slice(arrow + 4);
      addFromPath(p);
    }
  }

  // Commits not yet pushed to the upstream branch (skipped gracefully when there
  // is no upstream configured).
  const log = await runGit([
    'log', '--name-only', '--pretty=format:', '@{u}..HEAD', '--', ...scopes,
  ]);
  if (log.code === 0) {
    for (const line of log.stdout.split('\n')) {
      if (line.trim()) addFromPath(line.trim());
    }
  }

  return ids;
}

async function handleApi(req, res, url) {
  const { pathname } = url;

  // GET /api/health
  if (req.method === 'GET' && pathname === '/api/health') {
    return sendJson(res, 200, {
      ok: true,
      copilot: COPILOT_BIN,
      root: ROOT,
      concurrency: jobs.concurrency,
    });
  }

  // GET /api/prototypes — status of the auto-managed Fluent prototype dev server
  if (req.method === 'GET' && pathname === '/api/prototypes') {
    // Kick off a start if it isn't running yet (idempotent; non-blocking).
    startPrototypeServer().catch(() => {});
    return sendJson(res, 200, {
      enabled: !!(protoState.proc || protoState.ready),
      port: protoState.port,
      ready: protoState.ready,
      starting: protoState.starting,
    });
  }

  // GET /api/prototypes/list — LOCAL prototypes discovered from the filesystem.
  // The workspace merges these with the committed LIVE baseline. Each item is
  // annotated with hasLocalChanges so the UI can offer "Go Live" only when there
  // is something to push.
  if (req.method === 'GET' && pathname === '/api/prototypes/list') {
    const items = discoverLocalPrototypes();
    let dirty = new Set();
    try { dirty = await dirtyPrototypeIds(); } catch { /* git unavailable */ }
    for (const it of items) it.hasLocalChanges = dirty.has(it.id);
    return sendJson(res, 200, { items });
  }

  // POST /api/prototypes/make-live — promote a locally-created prototype to the
  // repo baseline: commit its route + component files and a committed registry
  // entry, then push so everyone sees it as "Live".
  if (req.method === 'POST' && pathname === '/api/prototypes/make-live') {
    let body;
    try { body = await readBody(req); } catch (e) { return sendJson(res, 400, { error: e.message }); }
    const id = String(body.id || '').trim();
    if (!/^[a-z][a-z0-9-]*$/.test(id)) {
      return sendJson(res, 400, { error: 'Invalid prototype id (must be kebab-case).' });
    }

    const appDir = path.join(PROTO_DIR, 'app', id);
    const compDir = path.join(PROTO_DIR, 'components', 'projects', id);
    if (!fs.existsSync(appDir) || !fs.existsSync(compDir)) {
      return sendJson(res, 404, {
        error: `Prototype "${id}" not found (missing app/${id} or components/projects/${id}).`,
      });
    }

    const localRegistryPath = path.join(PROTO_DIR, 'public', 'local-prototypes.json');
    const liveRegistryPath = path.join(PROTO_DIR, 'data', 'live-prototypes.json');

    // Read the local entry (title/description/author) so it carries into the live registry.
    let localEntries = [];
    try {
      if (fs.existsSync(localRegistryPath)) {
        const parsed = JSON.parse(fs.readFileSync(localRegistryPath, 'utf8'));
        if (Array.isArray(parsed)) localEntries = parsed;
      }
    } catch { localEntries = []; }
    const entry = localEntries.find((e) => e && e.id === id) || { id, title: titleCase(id) };

    // Merge into the committed live registry (upsert by id), dropping the createdBy
    // email so a personal identifier is never committed to the shared repo.
    let liveEntries = [];
    try {
      if (fs.existsSync(liveRegistryPath)) {
        const parsed = JSON.parse(fs.readFileSync(liveRegistryPath, 'utf8'));
        if (Array.isArray(parsed)) liveEntries = parsed;
      }
    } catch { liveEntries = []; }
    const liveEntry = {
      id,
      title: entry.title || id,
      description: entry.description,
      status: entry.status || 'in-progress',
      author: entry.author || gitAuthorFor(id),
      route: entry.route || `/${id}`,
      promotedAt: new Date().toISOString(),
    };
    liveEntries = liveEntries.filter((e) => e && e.id !== id);
    liveEntries.push(liveEntry);
    fs.mkdirSync(path.dirname(liveRegistryPath), { recursive: true });
    fs.writeFileSync(liveRegistryPath, JSON.stringify(liveEntries, null, 2) + '\n');

    // Remove it from the local (git-ignored) registry — it is now live, not local.
    const remaining = localEntries.filter((e) => e && e.id !== id);
    try { fs.writeFileSync(localRegistryPath, JSON.stringify(remaining, null, 2) + '\n'); } catch {}

    // Stage, commit, and push the prototype files + live registry.
    const relPaths = [
      `prototype-workspace/app/${id}`,
      `prototype-workspace/components/projects/${id}`,
      'prototype-workspace/data/live-prototypes.json',
    ];
    const add = await runGit(['add', ...relPaths]);
    if (add.code !== 0) {
      return sendJson(res, 500, { error: 'git add failed', detail: add.stderr || add.stdout });
    }
    const commitMsg =
      `Make "${liveEntry.title}" prototype live\n\n` +
      `Promotes the ${id} prototype to the repo baseline so it is visible to everyone.\n\n` +
      `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`;
    const commit = await runGit(['commit', '-m', commitMsg]);
    if (commit.code !== 0) {
      return sendJson(res, 500, {
        error: 'git commit failed',
        detail: commit.stderr || commit.stdout,
        hint: 'Nothing to commit, or git identity is not configured.',
      });
    }
    const push = await runGit(['push']);
    if (push.code !== 0) {
      return sendJson(res, 200, {
        ok: true,
        pushed: false,
        committed: true,
        id,
        warning: 'Committed locally but push failed — push manually.',
        detail: push.stderr || push.stdout,
      });
    }
    return sendJson(res, 200, { ok: true, pushed: true, committed: true, id });
  }

  // GET /api/tools — dynamic tool registry from .github/skills/*/tool.json
  if (req.method === 'GET' && pathname === '/api/tools') {
    try {
      const skillsDir = path.join(ROOT, '.github', 'skills');
      const entries = fs.readdirSync(skillsDir, { withFileTypes: true })
        .filter(d => d.isDirectory());
      const tools = [];
      for (const entry of entries) {
        const toolJsonPath = path.join(skillsDir, entry.name, 'tool.json');
        try {
          const raw = fs.readFileSync(toolJsonPath, 'utf8');
          tools.push(JSON.parse(raw));
        } catch { /* no tool.json = stage folder (STAGE.md only), skip */ }
      }
      return sendJson(res, 200, { tools });
    } catch (e) {
      return sendJson(res, 500, { error: e.message });
    }
  }

  // GET /api/fetch?url=<url> — plain HTTP fetch, returns markdown content
  if (req.method === 'GET' && pathname === '/api/fetch') {
    const rawUrl = url.searchParams.get('url');
    if (!rawUrl) return sendJson(res, 400, { error: 'Missing "url" query parameter.' });
    try {
      const result = await fetchUrl(rawUrl);
      return sendJson(res, 200, {
        url: result.url, status: result.status,
        contentType: result.contentType, content: result.content,
      });
    } catch (e) {
      return sendJson(res, 502, { error: `Fetch failed: ${e.message}` });
    }
  }

  // GET /api/browse?url=<url>[&provider=microsoft][&headless=false]
  // Playwright-based fetch — handles JS rendering and authenticated portals.
  // On first use for an auth provider, opens a visible browser for login.
  if (req.method === 'GET' && pathname === '/api/browse') {
    const rawUrl   = url.searchParams.get('url');
    const provider = url.searchParams.get('provider') || undefined;
    const headless = url.searchParams.has('headless') ? url.searchParams.get('headless') !== 'false' : undefined;
    if (!rawUrl) return sendJson(res, 400, { error: 'Missing "url" query parameter.' });
    try {
      const result = await browseUrl(rawUrl, { provider, headless });
      return sendJson(res, 200, {
        url: result.url, title: result.title,
        content: result.content, provider: result.provider || null,
      });
    } catch (e) {
      const status = e.code === 'SESSION_EXPIRED' ? 401 : 502;
      return sendJson(res, status, {
        error: e.message,
        code: e.code || null,
        hint: e.code === 'SESSION_EXPIRED'
          ? `POST /api/sessions/login with {"provider":"${provider || 'microsoft'}","targetUrl":"${rawUrl}"} to re-authenticate.`
          : null,
      });
    }
  }

  // GET /api/sessions — list saved auth sessions
  if (req.method === 'GET' && pathname === '/api/sessions') {
    const sessions = listSessions().map(s => ({
      ...s,
      provider: s.provider,
      loginUrl: s.provider === 'microsoft' ? 'https://login.microsoftonline.com' : null,
    }));
    return sendJson(res, 200, { sessions });
  }

  // GET /api/sessions/:provider — check if a specific session exists
  if (req.method === 'GET' && pathname.startsWith('/api/sessions/') && !pathname.endsWith('/login')) {
    const provider = pathname.split('/api/sessions/')[1];
    const exists = hasSession(provider);
    return sendJson(res, exists ? 200 : 404, { provider, exists });
  }

  // DELETE /api/sessions/:provider — clear a saved session
  if (req.method === 'DELETE' && pathname.startsWith('/api/sessions/')) {
    const provider = pathname.split('/api/sessions/')[1];
    const ok = clearSession(provider);
    return sendJson(res, ok ? 200 : 404, { cleared: ok, provider });
  }

  // POST /api/sessions/login — trigger a visible browser login for a provider
  // Body: { provider, targetUrl }
  // targetUrl MUST be the actual page the user wants to access (e.g. the HITS study URL).
  // The browser navigates there, SSO redirects to login, the bridge waits until the browser
  // lands back on the target hostname, then saves session cookies for that domain.
  if (req.method === 'POST' && pathname === '/api/sessions/login') {
    let body;
    try { body = await readBody(req); } catch (e) { return sendJson(res, 400, { error: e.message }); }
    const provider  = (body.provider || 'microsoft').toString().trim();
    const targetUrl = (body.targetUrl || '').toString().trim() || null;
    // Default to HITS home so cookies are captured for the right domain.
    const fallback  = provider === 'microsoft' ? 'https://hits.microsoft.com' : 'https://google.com';
    const dest      = targetUrl || fallback;

    // Fire-and-forget: open the browser, let user log in, session saves automatically
    // once the browser lands back on the target hostname.
    browseUrl(dest, { provider, headless: false, targetUrl: dest })
      .then(() => console.log(`[sessions] Session saved for provider: ${provider}`))
      .catch(e => console.error(`[sessions] Login failed for ${provider}:`, e.message));

    return sendJson(res, 202, {
      message: `Browser opened. Complete Microsoft sign-in for ${dest} — the session saves automatically once you land on the destination.`,
      provider,
      targetUrl: dest,
      hint: 'Poll GET /api/sessions to confirm the session is saved, then retry your browse request.',
    });
  }

  // ── HITS API proxy ────────────────────────────────────────────────
  // These endpoints acquire an OAuth token (via Azure CLI) and proxy
  // requests to https://hits.microsoft.com so agents never touch auth.

  // GET /api/hits/token — check token status (no token value returned)
  if (req.method === 'GET' && pathname === '/api/hits/token') {
    try {
      return sendJson(res, 200, await hits.tokenStatus());
    } catch (e) {
      return sendJson(res, 500, { error: e.message });
    }
  }

  // POST /api/hits/token — force-acquire a fresh token
  if (req.method === 'POST' && pathname === '/api/hits/token') {
    try {
      await hits.acquireToken();
      return sendJson(res, 200, await hits.tokenStatus());
    } catch (e) {
      return sendJson(res, 500, {
        error: e.message,
        hint: 'Run "az login" in your terminal, then retry POST /api/hits/token.',
      });
    }
  }

  // GET /api/hits/study/:id — fetch a study by numeric ID
  // e.g. https://hits.microsoft.com/study/6047768 → GET /api/hits/study/6047768
  if (req.method === 'GET' && pathname.startsWith('/api/hits/study/')) {
    const id = pathname.split('/api/hits/study/')[1];
    if (!id) return sendJson(res, 400, { error: 'Missing study ID' });
    try {
      const result = await hits.getStudy(id);
      return sendJson(res, 200, result.data);
    } catch (e) {
      const status = e.message.includes('401') ? 401 : e.message.includes('404') ? 404 : 502;
      return sendJson(res, status, {
        error: e.message,
        hint: status === 401 ? 'POST /api/hits/token to refresh auth.' : undefined,
      });
    }
  }

  // GET /api/hits/task/:id — fetch a task by ID
  if (req.method === 'GET' && pathname.startsWith('/api/hits/task/')) {
    const id = pathname.split('/api/hits/task/')[1];
    if (!id) return sendJson(res, 400, { error: 'Missing task ID' });
    try {
      const result = await hits.getTask(id);
      return sendJson(res, 200, result.data);
    } catch (e) {
      const status = e.message.includes('401') ? 401 : 502;
      return sendJson(res, status, { error: e.message });
    }
  }

  // GET /api/hits/insight/:id — fetch an insight by ID
  if (req.method === 'GET' && pathname.startsWith('/api/hits/insight/')) {
    const id = pathname.split('/api/hits/insight/')[1];
    if (!id) return sendJson(res, 400, { error: 'Missing insight ID' });
    try {
      const result = await hits.getInsight(id);
      return sendJson(res, 200, result.data);
    } catch (e) {
      const status = e.message.includes('401') ? 401 : 502;
      return sendJson(res, status, { error: e.message });
    }
  }

  // POST /api/hits/search — search HITS index
  // Body: { query, filters?, top?, skip? }
  if (req.method === 'POST' && pathname === '/api/hits/search') {
    let body;
    try { body = await readBody(req); } catch (e) { return sendJson(res, 400, { error: e.message }); }
    if (!body.query) return sendJson(res, 400, { error: 'Missing "query".' });
    try {
      const result = await hits.searchStudies(body.query, {
        filters: body.filters,
        top: body.top,
        skip: body.skip,
      });
      return sendJson(res, 200, result.data);
    } catch (e) {
      const status = e.message.includes('401') ? 401 : 502;
      return sendJson(res, status, { error: e.message });
    }
  }

  // GET /api/tasks
  if (req.method === 'GET' && pathname === '/api/tasks') {
    try {
      return sendJson(res, 200, { tasks: discoverTasks() });
    } catch (e) {
      return sendJson(res, 500, { error: e.message });
    }
  }

  // POST /api/tasks/rename — set a user-defined display title for a task.
  // Non-destructive: writes { title } to tasks/<id>/.task.json, leaving the
  // folder id/slug, URLs, and artifact path references untouched.
  if (req.method === 'POST' && pathname === '/api/tasks/rename') {
    let body;
    try { body = await readBody(req); }
    catch (e) { return sendJson(res, 400, { error: `Invalid body: ${e.message}` }); }

    const id = String(body.id || '').trim();
    const title = String(body.title || '').trim();
    if (!/^[a-z0-9][a-z0-9-_]*$/i.test(id)) {
      return sendJson(res, 400, { error: 'Invalid task id.' });
    }
    if (!title) return sendJson(res, 400, { error: 'Title cannot be empty.' });
    if (title.length > 120) return sendJson(res, 400, { error: 'Title is too long (max 120 chars).' });

    const taskDir = path.join(ROOT, 'tasks', id);
    if (!fs.existsSync(taskDir) || !fs.statSync(taskDir).isDirectory()) {
      return sendJson(res, 404, { error: `Task not found: ${id}` });
    }

    try {
      const cfg = readTaskConfig(id);
      cfg.title = title;
      fs.writeFileSync(path.join(taskDir, '.task.json'), JSON.stringify(cfg, null, 2) + '\n', 'utf8');
      return sendJson(res, 200, { ok: true, id, title });
    } catch (e) {
      return sendJson(res, 500, { error: e.message });
    }
  }

  // GET /api/report?id=<id>&kind=task|prototype — the prototype "report card":
  // Test-stage checks (accessibility, security, usability, tenets & traps,
  // visual, test execution, other) with ran/status/files for each.
  if (req.method === 'GET' && pathname === '/api/report') {
    const rawId = String(url.searchParams.get('id') || '').trim();
    const kind = String(url.searchParams.get('kind') || 'task').trim().toLowerCase();
    if (!/^[a-z0-9][a-z0-9-_]*$/i.test(rawId)) {
      return sendJson(res, 400, { error: 'Invalid id.' });
    }
    try {
      const taskId = kind === 'prototype' ? taskIdForPrototype(rawId) : rawId;
      if (!taskId) return sendJson(res, 404, { error: `No task found for ${kind} "${rawId}".` });
      const report = buildReportCard(taskId);
      if (!report) return sendJson(res, 404, { error: `Task not found: ${taskId}` });
      return sendJson(res, 200, report);
    } catch (e) {
      return sendJson(res, 500, { error: e.message });
    }
  }

  // POST /api/report/status — mark a test artifact's status (e.g. in-review →
  // completed) from the report card. Body: { id, kind?, path, status }.
  if (req.method === 'POST' && pathname === '/api/report/status') {
    let body;
    try { body = await readBody(req); }
    catch (e) { return sendJson(res, 400, { error: e.message }); }

    const rawId = String(body.id || '').trim();
    const kind = String(body.kind || 'task').trim().toLowerCase();
    const relPath = String(body.path || '').trim();
    const status = String(body.status || '').trim().toLowerCase();
    const ALLOWED = ['draft', 'in-review', 'approved', 'completed'];

    if (!/^[a-z0-9][a-z0-9-_]*$/i.test(rawId)) {
      return sendJson(res, 400, { error: 'Invalid id.' });
    }
    if (!ALLOWED.includes(status)) {
      return sendJson(res, 400, { error: `Invalid status. Allowed: ${ALLOWED.join(', ')}.` });
    }
    if (!/\.md$/i.test(relPath) || relPath.includes('..')) {
      return sendJson(res, 400, { error: 'Only markdown report files can be updated.' });
    }

    try {
      const taskId = kind === 'prototype' ? taskIdForPrototype(rawId) : rawId;
      if (!taskId) return sendJson(res, 404, { error: `No task found for ${kind} "${rawId}".` });
      const taskAbs = path.join(ROOT, 'tasks', taskId);
      const abs = path.resolve(taskAbs, relPath);
      if (abs !== taskAbs && !abs.startsWith(taskAbs + path.sep)) {
        return sendJson(res, 400, { error: 'Path escapes the task directory.' });
      }
      if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) {
        return sendJson(res, 404, { error: `File not found: ${relPath}` });
      }
      updateArtifactStatus(abs, status);
      const report = buildReportCard(taskId);
      return sendJson(res, 200, { ok: true, status, path: relPath, report });
    } catch (e) {
      return sendJson(res, 500, { error: e.message });
    }
  }

  // GET /api/figma/target?id=<prototypeOrTaskId> — does this task already have a
  // saved Figma file target? The UI uses this to decide whether to prompt for a
  // URL before sending.
  if (req.method === 'GET' && pathname === '/api/figma/target') {
    const id = String(url.searchParams.get('id') || url.searchParams.get('taskId') || '').trim();
    if (!/^[a-z0-9][a-z0-9-_]*$/i.test(id)) {
      return sendJson(res, 400, { error: 'Invalid id.' });
    }
    const target = readFigmaTarget(id);
    return sendJson(res, 200, { id, target: target || null });
  }

  // GET /api/figma/plugin-status — is the DesignLoop Figma plugin connected?
  if (req.method === 'GET' && pathname === '/api/figma/plugin-status') {
    return sendJson(res, 200, { connected: figmaPluginClients.size > 0, clients: figmaPluginClients.size });
  }

  // GET /api/figma/kit — has a Fluent kit been learned? (names + count)
  if (req.method === 'GET' && pathname === '/api/figma/kit') {
    const kit = readKitMap();
    if (!kit) return sendJson(res, 200, { learned: false, setCount: 0, sets: [] });
    return sendJson(res, 200, {
      learned: true,
      setCount: kit.setCount || 0,
      learnedAt: kit.learnedAt || null,
      sets: Object.values(kit.sets || {}).map((s) => s.display).sort(),
    });
  }

  // POST /api/figma/send { prototypeId, taskId?, figmaUrl? } — send a prototype
  // into a Figma file as editable native layers. Default path ("plugin") snapshots
  // the live prototype and rebuilds it via the DesignLoop Figma plugin over a local
  // WebSocket — no Claude, no MCP, no OAuth. Set FIGMA_RUNNER=copilot|claude to
  // instead drive Figma's write MCP through the respective CLI. Persists the
  // per-task target so the URL is pasted once. Returns a streaming { jobId }.
  if (req.method === 'POST' && pathname === '/api/figma/send') {
    let body;
    try { body = await readBody(req); }
    catch (e) { return sendJson(res, 400, { error: `Invalid body: ${e.message}` }); }

    const prototypeId = String(body.prototypeId || '').trim();
    const taskId = String(body.taskId || prototypeId || '').trim();
    if (!/^[a-z0-9][a-z0-9-_]*$/i.test(prototypeId)) {
      return sendJson(res, 400, { error: 'Invalid prototype id.' });
    }

    let target = readFigmaTarget(taskId);
    const provided = String(body.figmaUrl || '').trim();
    if (provided) {
      if (!figmaFileKey(provided)) {
        return sendJson(res, 400, { error: 'That does not look like a Figma file URL.' });
      }
      target = saveFigmaTarget(taskId, provided);
    }
    if (!target || !target.url) {
      return sendJson(res, 400, { error: 'No Figma file target. Provide a figmaUrl.', needsUrl: true });
    }

    const envRunner = (process.env.FIGMA_RUNNER || 'plugin').toLowerCase();
    const runner = ['plugin', 'copilot', 'claude'].includes(envRunner) ? envRunner : 'plugin';

    // Default path: the DesignLoop Figma plugin rebuilds the design natively.
    if (runner === 'plugin') {
      if (figmaPluginClients.size === 0) {
        return sendJson(res, 409, {
          error: 'The DesignLoop Figma plugin is not connected.',
          hint: 'In Figma: Plugins → Development → DesignLoop (import figma-plugin/manifest.json once), run it, and keep it open. Then try again.',
          needsPlugin: true,
        });
      }
      const job = jobs.createManualJob({ taskId: taskId || null, kind: 'figma', prototypeId, runner: 'plugin' });
      figmaBuildJobs.set(job.id, { job, target, timer: null });
      jobs.manualLog(job, `▶ Sending “${prototypeId}” to Figma…`);
      // Kick off asynchronously; the card subscribes to the job stream.
      runFigmaPluginBuild(job, prototypeId, target);
      return sendJson(res, 202, { jobId: job.id, status: job.status, taskId: taskId || null, runner, target });
    }

    // Preflight: the copilot runner needs Figma's local desktop MCP server up.
    if (runner === 'copilot' && !(await probeFigmaLocalMcp())) {
      return sendJson(res, 409, {
        error: 'Figma local MCP server is not running.',
        hint: 'In the Figma desktop app: Preferences → “Enable local MCP server” (Dev Mode MCP server), then try again. It listens on 127.0.0.1:3845.',
        needsFigmaMcp: true,
      });
    }

    const liveUrl = `http://localhost:${PROTO_PORT}/${prototypeId}`;
    const prompt = [
      `Run the "fluent-to-figma" skill to send a DesignLoop prototype into a Figma file as editable native layers.`,
      ``,
      `Read the full instructions in .github/skills/fluent-to-figma/SKILL.md and the quality bar in .github/skills/fluent-to-figma/VERIFY.md, then execute them precisely.`,
      ``,
      `Inputs:`,
      `- prototypeId: ${prototypeId}`,
      `- taskId: ${taskId}`,
      `- figmaFileUrl: ${target.url}`,
      `- figmaFileKey: ${target.fileKey || '(parse from the URL)'}`,
      `- liveUrl: ${liveUrl}`,
      `- Prototype source: prototype-workspace/app/${prototypeId}/page.tsx and prototype-workspace/components/projects/${prototypeId}/`,
      `- Reverse token map: run \`node prototype-workspace/scripts/fluent-to-figma-map.mjs\` for the Fluent→Figma variable table.`,
      ``,
      `Use the connected "figma" MCP server's write tools. Create a new Page named "DesignLoop — ${prototypeId}" in the target file with auto-layout frames, real text nodes, and variable-bound styles. Do not modify any repository files. Report the Figma page deep link, node counts, and any unmapped-token fallbacks.`,
    ].join('\n');

    const job = jobs.createJob({
      prompt,
      agent: runner === 'copilot' ? 'fluent-to-figma' : null,
      runner,
      taskId: taskId || null,
      kind: 'figma',
      _skipVerify: true,
    });
    return sendJson(res, 202, {
      jobId: job.id,
      status: job.status,
      taskId: taskId || null,
      runner,
      target,
    });
  }

  // POST /api/run-stage — run a full stage via its coordinator agent
  if (req.method === 'POST' && pathname === '/api/run-stage') {
    let body;
    try { body = await readBody(req); }
    catch (e) { return sendJson(res, 400, { error: `Invalid body: ${e.message}` }); }

    const stageId = (body.stageId || '').toString().trim();
    if (!stageId) return sendJson(res, 400, { error: 'Missing "stageId".' });

    const stageAgents = {
      discover: 'researcher', define: 'strategist', ideate: 'ideator',
      design: 'designer', prototype: 'prototyper', test: 'tester', deliver: 'handoff',
    };
    const agentName = stageAgents[stageId];
    if (!agentName) return sendJson(res, 400, { error: `Unknown stageId: ${stageId}` });

    const requestedTaskId = (body.taskId || '').toString().trim() || null;
    const userPrompt = (body.prompt || '').toString().trim();

    const sourceCtx  = await materializeSourceArtifacts(body.sourceArtifacts);
    const taskId     = inferTaskId(requestedTaskId, userPrompt, sourceCtx);
    const taskPath   = taskId ? `tasks/${taskId}` : null;

    const stageLabel = stageId.charAt(0).toUpperCase() + stageId.slice(1);

    const stagePrompt = `You are running as the ${stageLabel} stage coordinator.

${userPrompt ? `User instruction and source material:\n${userPrompt}\n` : ''}
${sourceCtx.promptBlock ? `${sourceCtx.promptBlock}\n` : ''}
Task directory: \`${taskPath}/\`
IMPORTANT: Work ONLY in \`${taskPath}/\`. Do NOT read, reference, or write to any other task directory on disk.
IMPORTANT: If source artifacts are missing/unreadable, STOP and output one clear blocker message. Do not guess intent from existing task folders.

## Step 0 — Fetch source material (always first)

If any URLs appear in the user instruction above, fetch them NOW before doing anything else.

**HITS studies** (hits.microsoft.com/study/<id>):
Use the direct HITS API — faster and more reliable than browser fetch:
- curl -s "http://localhost:8099/api/hits/study/<id>"
  Replace <id> with the numeric ID from the URL (e.g. hits.microsoft.com/study/6047768 → id is 6047768)
- If that returns a 401, run: curl -s -X POST http://localhost:8099/api/hits/token
  Then retry the study fetch.

**Microsoft internal portals (non-HITS):**
- curl -s "http://localhost:8099/api/browse?url=<encoded-url>&provider=microsoft"
- If login is needed, do these three steps IN ORDER:
  1. curl -X POST http://localhost:8099/api/sessions/login -H "Content-Type: application/json" -d '{"provider":"microsoft","targetUrl":"<the-url-you-are-fetching>"}'
  2. Poll until session exists: until curl -sf http://localhost:8099/api/sessions/microsoft; do sleep 10; done
  3. ONLY THEN retry the browse call. Do NOT retry before step 2 returns 200.

**Public URLs:**
- curl -s "http://localhost:8099/api/fetch?url=<encoded-url>"

Save fetched content to \`${taskPath || 'tasks/<slug>'}/research/web/<slug>.md\`. This becomes the ground truth for the entire stage run. Do not proceed to stage work until the source material is retrieved and saved.

## How to handle missing prerequisites

This stage may be invoked directly without prior stages having run. Follow this order:

1. **Fetch first.** Retrieve all URLs from the user instruction (Step 0 above).
2. **Check for existing artifacts.** Look in the task directory for outputs from prior stages. Use anything already there.
3. **Synthesise what is missing.** If prerequisite artifacts from a prior stage do not exist, derive them from the fetched source material and proceed. State assumptions clearly at the top of each synthesised document.
4. **Ask for consent only as a last resort.** If there is no source material and no existing artifacts — nothing at all to work from — output a single clear question and stop.

## Execution

1. Read \`.github/skills/${stageId}/STAGE.md\` for the coordination playbook.
2. ${taskPath
  ? `Check \`${taskPath}/\` for what is already complete.`
  : `Create the task directory. Treat this as a fresh run.`
}
3. Apply the selection logic from STAGE.md — skip tools whose outputs already exist.
4. Execute remaining tools in the order defined in STAGE.md.
5. For each tool: invoke its skill, confirm the artifact was written, then continue.
6. Report stage complete with a summary when all required tools have passed.`;

    const job = jobs.createJob({
      prompt:      stagePrompt,
      agent:       agentName,
      taskId,
      kind:        'stage',
      _skipVerify: true, // stage runs are coordinated by the agent; tools verify individually
    });
    return sendJson(res, 202, {
      jobId: job.id,
      status: job.status,
      stageId,
      agent: agentName,
      taskId,
      sourceContext: sourceContextSummary(sourceCtx),
    });
  }

  // POST /api/run
  if (req.method === 'POST' && pathname === '/api/run') {
    let body;
    try { body = await readBody(req); }
    catch (e) { return sendJson(res, 400, { error: `Invalid body: ${e.message}` }); }

    const prompt = (body.prompt || '').toString().trim();
    if (!prompt) return sendJson(res, 400, { error: 'Missing "prompt".' });

    const sourceCtx = await materializeSourceArtifacts(body.sourceArtifacts);
    const finalPrompt = sourceCtx.promptBlock ? `${prompt}${sourceCtx.promptBlock}` : prompt;
    const runner = body.runner || toolRunner(body.toolId);
    const job = jobs.createJob({
      prompt: finalPrompt,
      agent:      agentSlug(body.agent),
      taskId:     body.taskId  || null,
      kind:       body.kind    || 'run',
      toolId:     body.toolId  || null,
      round:      body.round   || 1,
      runner,
      // Only verify copilot tool runs; claude-runner tools (e.g. fluent-to-figma)
      // produce Figma-side output the copilot verify/rerun loop can't act on.
      _skipVerify: !body.toolId || runner === 'claude',
    });
    return sendJson(res, 202, {
      jobId: job.id,
      status: job.status,
      taskId: job.taskId || null,
      sourceContext: sourceContextSummary(sourceCtx),
    });
  }

  // Routes under /api/jobs/:id
  const jobMatch = pathname.match(/^\/api\/jobs\/([^/]+)(\/stream)?$/);
  if (jobMatch) {
    const id = jobMatch[1];
    const isStream = !!jobMatch[2];

    if (req.method === 'GET' && isStream) {
      const job = jobs.get(id);
      if (!job) return sendJson(res, 404, { error: 'Unknown job' });
      res.writeHead(200, {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no',
        ...CORS_HEADERS,
      });
      res.write('retry: 2000\n\n');
      // Replay buffered log, then current status, then live updates.
      for (const entry of job.log) {
        res.write(`event: log\ndata: ${JSON.stringify(entry)}\n\n`);
      }
      res.write(`event: status\ndata: ${JSON.stringify({
        status: job.status, exitCode: job.exitCode, error: job.error,
        artifacts: job.artifacts, verifyResult: job.verifyResult || null,
        round: job.round, rerunJobId: job.rerunJobId || null,
      })}\n\n`);
      if (job.verifyResult) {
        res.write(`event: verify-result\ndata: ${JSON.stringify(job.verifyResult)}\n\n`);
      }
      jobs.subscribe(id, res);
      // Heartbeat to keep the connection alive through proxies.
      const hb = setInterval(() => { try { res.write(': ping\n\n'); } catch {} }, 15000);
      res.on('close', () => clearInterval(hb));
      return;
    }

    if (req.method === 'GET') {
      const snap = jobs.snapshot(id);
      if (!snap) return sendJson(res, 404, { error: 'Unknown job' });
      return sendJson(res, 200, snap);
    }

    if (req.method === 'DELETE') {
      const ok = jobs.cancel(id);
      return sendJson(res, ok ? 200 : 404, { cancelled: ok });
    }
  }

  return sendJson(res, 404, { error: 'Unknown API route' });
}

/* ───────────────── prototype workspace dev server ────────────────── */
/*
 * Auto-starts and supervises the Fluent prototype workspace (`next dev`) on a
 * dedicated port so prototypes are always live — the user never builds/runs it
 * manually. The home page "Prototypes" link and the in-task previews point at
 * this server. Reuses an already-running server on the port if present, and
 * only kills a server it started itself on shutdown.
 */
const PROTO_DIR  = path.join(ROOT, 'prototype-workspace');
const PROTO_PORT = Number(process.env.PROTOTYPE_PORT) || 3100;
const protoState = { proc: null, spawnedByUs: false, ready: false, starting: false, port: PROTO_PORT, log: [] };

function pushProtoLog(line) {
  protoState.log.push(String(line));
  if (protoState.log.length > 200) protoState.log.shift();
}

function probePort(port) {
  return new Promise((resolve) => {
    const req = http.request({ host: '127.0.0.1', port, path: '/', method: 'HEAD', timeout: 1500 }, (r) => {
      r.resume();
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
    req.end();
  });
}

async function waitForReady(port, timeoutMs = 180000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await probePort(port)) return true;
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

let startPromise = null;
async function startPrototypeServer() {
  if (protoState.proc || protoState.ready) return;
  if (startPromise) return startPromise;
  startPromise = (async () => {
    if (!fs.existsSync(PROTO_DIR) || !fs.existsSync(path.join(PROTO_DIR, 'node_modules'))) {
      console.log('  Prototypes: workspace or node_modules missing — dev server not started');
      return;
    }
    // Reuse an existing dev server already listening on the port.
    if (await probePort(PROTO_PORT)) {
      protoState.ready = true;
      protoState.spawnedByUs = false;
      console.log(`  Prototypes: reusing existing dev server on :${PROTO_PORT}`);
      return;
    }
    protoState.starting = true;
    const localNext = path.join(PROTO_DIR, 'node_modules', '.bin', 'next');
    let bin, args;
    if (fs.existsSync(localNext)) {
      bin = localNext; args = ['dev', '--port', String(PROTO_PORT)];
    } else {
      bin = process.env.PNPM_BIN || 'pnpm'; args = ['exec', 'next', 'dev', '--port', String(PROTO_PORT)];
    }
    let proc;
    try {
      proc = spawn(bin, args, {
        cwd: PROTO_DIR,
        env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1', NODE_ENV: 'development' },
        stdio: ['ignore', 'pipe', 'pipe'],
      });
    } catch (e) {
      protoState.starting = false;
      console.log('  Prototypes: failed to spawn dev server —', e.message);
      return;
    }
    protoState.proc = proc;
    protoState.spawnedByUs = true;
    proc.stdout.on('data', (d) => pushProtoLog(d));
    proc.stderr.on('data', (d) => pushProtoLog(d));
    proc.on('exit', (code) => {
      pushProtoLog(`[dev server exited: ${code}]`);
      protoState.proc = null;
      protoState.ready = false;
      protoState.starting = false;
      startPromise = null;
    });
    console.log(`  Prototypes: starting Next dev server on :${PROTO_PORT} …`);
    const ok = await waitForReady(PROTO_PORT);
    protoState.ready = ok;
    protoState.starting = false;
    console.log(ok
      ? `  Prototypes: dev server ready on :${PROTO_PORT}`
      : `  Prototypes: dev server did not become ready in time`);
  })();
  try { await startPromise; } finally { if (!protoState.proc && !protoState.ready) startPromise = null; }
}

function stopPrototypeServer() {
  if (protoState.proc && protoState.spawnedByUs) {
    try { protoState.proc.kill('SIGTERM'); } catch {}
    protoState.proc = null;
  }
}

/* ──────────────────────────── server ─────────────────────────────── */

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);
  // CORS preflight for cross-origin calls from the prototype workspace (:3100).
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { ...CORS_HEADERS, 'Cache-Control': 'no-store' });
    return res.end();
  }
  if (url.pathname.startsWith('/api/')) {
    handleApi(req, res, url).catch((e) => {
      try { sendJson(res, 500, { error: e.message }); } catch {}
    });
    return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }
  serveStatic(req, res);
});

// DesignLoop Figma plugin WebSocket endpoint.
attachWss(server, '/figma-plugin', (conn) => {
  figmaPluginClients.add(conn);
  console.log(`  Figma plugin connected (${figmaPluginClients.size} client(s)).`);
  conn.on('message', (raw) => onFigmaPluginMessage(raw, conn));
  conn.on('close', () => {
    figmaPluginClients.delete(conn);
    console.log(`  Figma plugin disconnected (${figmaPluginClients.size} client(s)).`);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`DesignLoop Bridge running at http://${HOST}:${PORT}`);
  console.log(`  Serving:  ${ROOT}`);
  console.log(`  Copilot:  ${COPILOT_BIN}`);
  // Auto-start the Fluent prototype workspace so prototypes are always live.
  startPrototypeServer().catch((e) => console.log('  Prototypes:', e.message));
});

function shutdown(code) {
  stopPrototypeServer();
  process.exit(code || 0);
}
process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
process.on('exit', () => stopPrototypeServer());
