'use strict';

/**
 * Serialize a running DesignLoop prototype (Fluent UI React v9, rendered by the
 * Next.js dev server on :3100) into a design tree that the DesignLoop Figma
 * plugin can rebuild as editable native layers.
 *
 * Strategy: render the page in headless Chromium and walk the DOM, keeping only
 * "meaningful" elements (those with a background, border, direct text, or that
 * are images/controls). Meaningful descendants attach to their nearest
 * meaningful ancestor so the Figma output stays a clean, shallow frame tree with
 * real text nodes — not a 1:1 copy of every div.
 *
 * Zero new deps: uses the root `playwright` package (already installed).
 */

const path = require('path');

// Resolve playwright from the repo root regardless of cwd.
function loadChromium() {
  const candidates = [
    path.join(__dirname, '..', 'node_modules', 'playwright'),
    'playwright',
  ];
  for (const c of candidates) {
    try { return require(c).chromium; } catch {}
  }
  throw new Error('playwright is not installed (npm i at repo root)');
}

// This function is stringified and evaluated in the page context.
/* istanbul ignore next */
function domWalker(maxNodes) {
  const toRgba = (str) => {
    if (!str) return null;
    const m = str.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(',').map((s) => parseFloat(s.trim()));
    const a = p.length > 3 ? p[3] : 1;
    return { r: (p[0] || 0) / 255, g: (p[1] || 0) / 255, b: (p[2] || 0) / 255, a };
  };
  const isTransparent = (c) => !c || c.a === 0;
  const num = (v) => parseFloat(v) || 0;

  // Fluent v9 renders a stable `fui-<ComponentName>` class on each component root
  // (the Griffel style classes are hashed, but this identity class is not). We use
  // it to rebuild "atomic" components as real Figma kit instances. Container
  // components keep their children as primitive frames.
  const ATOMIC = {
    Button: 1, CompoundButton: 1, MenuButton: 1, ToggleButton: 1, SplitButton: 1,
    SearchBox: 1, Input: 1, Textarea: 1, Dropdown: 1, Combobox: 1, SpinButton: 1,
    Avatar: 1, Badge: 1, CounterBadge: 1, PresenceBadge: 1,
    Checkbox: 1, Radio: 1, Switch: 1, Slider: 1,
    Link: 1, Divider: 1, Spinner: 1, ProgressBar: 1, Tag: 1,
  };
  function fuiComponent(el) {
    if (!el.classList) return null;
    const found = [];
    for (const c of el.classList) {
      const m = /^fui-([A-Za-z0-9]+)$/.exec(c);
      if (m) found.push(m[1]);
    }
    if (!found.length) return null;
    // Composed components carry their base class too (e.g. SearchBox → "fui-Input
    // fui-SearchBox"). Prefer the specific one over the generic base.
    const BASE = { Input: 1, Button: 1, Badge: 1 };
    const specific = found.find((n) => !BASE[n]);
    return specific || found[0];
  }
  function textStyle(el, style, characters) {
    const fontSize = num(style.fontSize) || 14;
    const lh = style.lineHeight === 'normal'
      ? Math.round(fontSize * 1.4)
      : num(style.lineHeight) || Math.round(fontSize * 1.4);
    return {
      characters,
      color: toRgba(style.color) || { r: 0, g: 0, b: 0, a: 1 },
      family: (style.fontFamily || 'Inter').split(',')[0].replace(/['"]/g, '').trim(),
      size: fontSize,
      weight: parseInt(style.fontWeight, 10) || 400,
      lineHeight: lh,
      align: style.textAlign || 'left',
    };
  }

  function directText(el) {
    let t = '';
    for (const n of el.childNodes) {
      if (n.nodeType === 3) t += n.textContent;
    }
    return t.replace(/\s+/g, ' ').trim();
  }

  const scrollX = window.scrollX || 0;
  const scrollY = window.scrollY || 0;
  let count = 0;

  function walk(el) {
    if (count >= maxNodes) return [];
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || num(style.opacity) === 0) {
      return [];
    }
    const rect = el.getBoundingClientRect();
    const w = rect.width, h = rect.height;
    if (w <= 0 || h <= 0) {
      // still walk children (wrapper with 0 size is rare but possible)
      let acc = [];
      for (const child of el.children) acc = acc.concat(walk(child));
      return acc;
    }

    const tag = el.tagName.toLowerCase();
    const bg = toRgba(style.backgroundColor);
    const borderW = num(style.borderTopWidth);
    const borderColor = toRgba(style.borderTopColor);
    const radius = Math.max(
      num(style.borderTopLeftRadius), num(style.borderTopRightRadius),
      num(style.borderBottomLeftRadius), num(style.borderBottomRightRadius),
    );
    const text = directText(el);
    const isImg = tag === 'img' || tag === 'svg';
    const isControl = ['button', 'input', 'select', 'textarea', 'a'].includes(tag);
    const hasBg = !isTransparent(bg);
    const hasBorder = borderW > 0 && !isTransparent(borderColor);

    // Atomic Fluent component → emit a single node the plugin can instantiate as
    // a real kit component. Do NOT recurse (the kit component owns its internals).
    const fui = fuiComponent(el);
    if (fui && ATOMIC[fui]) {
      if (count >= maxNodes) return [];
      count++;
      const label = (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim();
      const props = {};
      if (el.getAttribute('aria-disabled') === 'true' || el.disabled) props.disabled = true;
      if (el.getAttribute('aria-checked') === 'true' || el.getAttribute('aria-pressed') === 'true') props.checked = true;
      if (el.getAttribute('aria-current')) props.selected = true;
      const node = {
        name: 'fui-' + fui,
        x: rect.left + scrollX,
        y: rect.top + scrollY,
        w, h,
        opacity: num(style.opacity) || 1,
        fluent: { component: fui, label, props },
        children: [],
      };
      // Fallback styling used only if the plugin can't resolve a kit component.
      if (hasBg) node.fill = bg;
      if (hasBorder) node.stroke = { color: borderColor, weight: borderW };
      if (radius > 0) node.radius = radius;
      if (label) node.text = textStyle(el, style, label);
      return [node];
    }

    const meaningful = hasBg || hasBorder || !!text || isImg || isControl || radius > 0;

    // Recurse first so we can attach children to a meaningful node.
    let childNodes = [];
    for (const child of el.children) childNodes = childNodes.concat(walk(child));

    if (!meaningful) return childNodes;
    if (count >= maxNodes) return childNodes;
    count++;

    const node = {
      name: fui ? 'fui-' + fui : tag + (el.id ? '#' + el.id : ''),
      x: rect.left + scrollX,
      y: rect.top + scrollY,
      w, h,
      opacity: num(style.opacity) || 1,
      children: childNodes,
    };
    if (hasBg) node.fill = bg;
    if (hasBorder) node.stroke = { color: borderColor, weight: borderW };
    if (radius > 0) node.radius = radius;
    if (isImg) node.kind = 'image';

    if (text) {
      node.text = textStyle(el, style, text);
    }
    return [node];
  }

  const bodyRect = document.body.getBoundingClientRect();
  const roots = walk(document.body);
  return {
    title: document.title || '',
    width: Math.max(document.documentElement.scrollWidth, bodyRect.width),
    height: Math.max(document.documentElement.scrollHeight, bodyRect.height),
    nodeCount: count,
    root: {
      name: 'root',
      x: 0, y: 0,
      w: Math.max(document.documentElement.scrollWidth, bodyRect.width),
      h: Math.max(document.documentElement.scrollHeight, bodyRect.height),
      fill: toRgba(getComputedStyle(document.body).backgroundColor) || { r: 1, g: 1, b: 1, a: 1 },
      children: roots,
    },
  };
}

/**
 * @param {string} url  e.g. http://localhost:3100/<prototypeId>
 * @param {object} [opts] { width, height, maxNodes, timeoutMs, onLog }
 * @returns {Promise<object>} design tree
 */
async function serializePrototype(url, opts = {}) {
  const width = opts.width || 1440;
  const height = opts.height || 1024;
  const maxNodes = opts.maxNodes || 2000;
  const timeoutMs = opts.timeoutMs || 45000;
  const log = typeof opts.onLog === 'function' ? opts.onLog : () => {};

  // The prototype workspace is behind an MSAL wall; `auditBridge=1` is the
  // workspace's built-in headless-tooling bypass (see auth-wrapper.tsx).
  let target = url;
  try {
    const u = new URL(url);
    if (!u.searchParams.has('auditBridge')) u.searchParams.set('auditBridge', '1');
    target = u.toString();
  } catch {
    target = url + (url.includes('?') ? '&' : '?') + 'auditBridge=1';
  }

  const chromium = loadChromium();
  let browser;
  try {
    log(`Launching headless browser…`);
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width, height } });
    log(`Loading ${target} …`);
    url = target;
    await page.goto(url, { waitUntil: 'networkidle', timeout: timeoutMs }).catch(async () => {
      // Fall back to DOMContentLoaded if networkidle never settles.
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: timeoutMs });
    });
    // Let Fluent/React finish painting.
    await page.waitForTimeout(1200);
    log(`Snapshotting layout…`);
    const tree = await page.evaluate(
      new Function('maxNodes', `return (${domWalker.toString()})(maxNodes);`),
      maxNodes,
    );
    log(`Captured ${tree.nodeCount} layers.`);
    return tree;
  } finally {
    if (browser) { try { await browser.close(); } catch {} }
  }
}

module.exports = { serializePrototype };
