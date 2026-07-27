// DesignLoop Figma plugin — main thread.
//
// Receives a serialized prototype design tree from the DesignLoop bridge (via
// the UI iframe's WebSocket relay) and reconstructs it as editable native Figma
// layers: frames with fills / strokes / corner radius and real, editable text
// nodes with mapped fonts. Progress and the resulting page node id are reported
// back over the same relay so the workspace card can show live status + a deep
// link.

figma.showUI(__html__, { width: 300, height: 230, visible: true });

// ---- font handling ---------------------------------------------------------
// Prototype fonts (Segoe UI, Aptos, etc.) may not exist in the user's Figma, so
// fall back to Inter, which ships with every Figma install.
var FALLBACK_FAMILY = "Inter";

function weightToStyle(weight) {
  if (weight >= 700) return "Bold";
  if (weight >= 600) return "Semi Bold";
  if (weight >= 500) return "Medium";
  return "Regular";
}

var fontCache = {}; // requestedKey -> resolved {family, style}

async function resolveFont(family, weight) {
  var style = weightToStyle(weight);
  var key = family + "|" + style;
  if (fontCache[key]) return fontCache[key];

  var attempts = [
    { family: family, style: style },
    { family: family, style: "Regular" },
    { family: FALLBACK_FAMILY, style: style },
    { family: FALLBACK_FAMILY, style: "Regular" },
  ];
  for (var i = 0; i < attempts.length; i++) {
    try {
      await figma.loadFontAsync(attempts[i]);
      fontCache[key] = attempts[i];
      return attempts[i];
    } catch (e) {
      // try next
    }
  }
  // Last resort — Inter Regular is guaranteed.
  var fallback = { family: FALLBACK_FAMILY, style: "Regular" };
  await figma.loadFontAsync(fallback);
  fontCache[key] = fallback;
  return fallback;
}

// Load every font used by a node's text (including nested instance sublayers),
// so reparenting/appendChild never throws "unloaded font …". Best-effort: a font
// that truly isn't installed is skipped (its text falls back visually).
async function loadNodeFonts(node) {
  if (!node) return;
  var texts = [];
  try {
    if (node.type === "TEXT") texts.push(node);
    if (typeof node.findAll === "function") {
      texts = texts.concat(node.findAll(function (n) { return n.type === "TEXT"; }));
    }
  } catch (e) { /* ignore traversal issues */ }
  for (var i = 0; i < texts.length; i++) {
    var t = texts[i];
    var fonts = [];
    try {
      if (t.fontName === figma.mixed) {
        var len = (t.characters || "").length;
        if (typeof t.getRangeAllFontNames === "function" && len > 0) fonts = t.getRangeAllFontNames(0, len);
      } else if (t.fontName) {
        fonts = [t.fontName];
      }
    } catch (e) { /* skip */ }
    for (var j = 0; j < fonts.length; j++) {
      try { await figma.loadFontAsync(fonts[j]); } catch (e) { /* not installed — skip */ }
    }
  }
}

// Preload the fonts prototypes commonly use so createInstance() sublayers and
// authored text nodes can be reparented without a font-load race.
var COMMON_FONTS_LOADED = false;
async function preloadCommonFonts() {
  if (COMMON_FONTS_LOADED) return;
  COMMON_FONTS_LOADED = true;
  var families = ["Segoe UI", "Segoe UI Variable", "Aptos", "Aptos Display", FALLBACK_FAMILY];
  var styles = ["Regular", "Medium", "Semi Bold", "Semibold", "Bold", "Light"];
  for (var f = 0; f < families.length; f++) {
    for (var s = 0; s < styles.length; s++) {
      try { await figma.loadFontAsync({ family: families[f], style: styles[s] }); } catch (e) { /* absent */ }
    }
  }
}

// ---- helpers ---------------------------------------------------------------
function solid(color) {
  return {
    type: "SOLID",
    color: { r: clamp01(color.r), g: clamp01(color.g), b: clamp01(color.b) },
    opacity: color.a == null ? 1 : clamp01(color.a),
  };
}
function clamp01(v) { return Math.max(0, Math.min(1, v || 0)); }

function countNodes(node) {
  var n = 1;
  var kids = node.children || [];
  for (var i = 0; i < kids.length; i++) n += countNodes(kids[i]);
  return n;
}

// ---- build -----------------------------------------------------------------
var built = 0;
var total = 1;
var lastPct = -1;
var instanced = 0;   // how many nodes became real kit component instances
var fellBack = 0;    // detected components that couldn't be instanced
var reportProgress = function () {};

// Cache imported library components / sets / styles by key.
var compCache = {};
var setCache = {};
var styleCache = {};
async function importComp(key) {
  if (compCache[key] !== undefined) return compCache[key];
  var comp = null;
  try { comp = await figma.importComponentByKeyAsync(key); } catch (e) { comp = null; }
  compCache[key] = comp;
  return comp;
}
async function importSet(key) {
  if (setCache[key] !== undefined) return setCache[key];
  var set = null;
  try { set = await figma.importComponentSetByKeyAsync(key); } catch (e) { set = null; }
  setCache[key] = set;
  return set;
}
async function importStyle(key) {
  if (styleCache[key] !== undefined) return styleCache[key];
  var s = null;
  try { s = await figma.importStyleByKeyAsync(key); } catch (e) { s = null; }
  styleCache[key] = s;
  return s;
}

// Set the first text sublayer of an instance to the detected label.
async function overrideInstanceText(inst, chars) {
  try {
    var t = inst.findOne(function (n) { return n.type === "TEXT"; });
    if (t) {
      await figma.loadFontAsync(t.fontName);
      t.characters = chars;
    }
  } catch (e) { /* leave default text */ }
}

// Try to build a node as a real kit component instance. Returns the instance or null.
async function tryInstance(node) {
  var key = node.fluent && node.fluent.componentKey;
  var setKey = node.fluent && node.fluent.setKey;
  var comp = null;
  if (key) comp = await importComp(key);
  if (!comp && setKey) {
    var set = await importSet(setKey);
    if (set) comp = set.defaultVariant || (set.children && set.children[0]) || null;
  }
  if (!comp) return null;
  try {
    var inst = comp.createInstance();
    inst.name = node.name || node.fluent.component;
    await loadNodeFonts(inst);
    try { inst.resize(Math.max(1, node.w), Math.max(1, node.h)); } catch (e) {}
    if (node.fluent.label) await overrideInstanceText(inst, node.fluent.label);
    return inst;
  } catch (e) {
    return null;
  }
}

async function buildNode(node, parentAbs) {
  var relX = node.x - (parentAbs ? parentAbs.x : 0);
  var relY = node.y - (parentAbs ? parentAbs.y : 0);
  var w = Math.max(1, node.w);
  var h = Math.max(1, node.h);

  var el = null;

  // Detected Fluent component with a resolved kit key → real instance.
  if (node.fluent && (node.fluent.componentKey || node.fluent.setKey)) {
    el = await tryInstance(node);
    if (el) instanced++;
    else fellBack++;
  }

  if (!el) {
    var isPureText = node.text && !node.fill && !node.stroke && (!node.children || node.children.length === 0);
    if (isPureText) {
      el = await makeText(node, w, h);
    } else {
      el = figma.createFrame();
      el.name = node.name || "frame";
      el.resizeWithoutConstraints(w, h);
      el.fills = node.fill ? [solid(node.fill)] : [];
      el.clipsContent = false;
      if (node.stroke) {
        el.strokes = [solid(node.stroke.color)];
        el.strokeWeight = Math.max(1, Math.round(node.stroke.weight));
      }
      if (node.radius) el.cornerRadius = node.radius;
      if (node.opacity != null && node.opacity < 1) el.opacity = node.opacity;

      // Text that also has a box becomes a child text node filling the frame.
    if (node.text) {
      var tx = await makeText(node, w, h);
      tx.x = 0;
      tx.y = 0;
      await safeAppend(el, tx);
    }

    var kids = node.children || [];
    for (var i = 0; i < kids.length; i++) {
      var childEl = await buildNode(kids[i], node);
      childEl.x = kids[i].x - node.x;
      childEl.y = kids[i].y - node.y;
      await safeAppend(el, childEl);
    }
    }
  }

  el.x = relX;
  el.y = relY;

  built++;
  var pct = Math.floor((built / total) * 100);
  if (pct !== lastPct && pct % 5 === 0) {
    lastPct = pct;
    reportProgress(pct);
  }
  return el;
}

async function makeText(node, w, h) {
  var t = node.text;
  var font = await resolveFont(t.family, t.weight);
  var text = figma.createText();
  text.fontName = font;
  text.characters = t.characters;
  text.fontSize = Math.max(1, Math.round(t.size));
  text.fills = [solid(t.color)];
  if (t.lineHeight) text.lineHeight = { value: t.lineHeight, unit: "PIXELS" };
  if (t.align === "center") text.textAlignHorizontal = "CENTER";
  else if (t.align === "right") text.textAlignHorizontal = "RIGHT";
  else text.textAlignHorizontal = "LEFT";
  text.textAutoResize = "NONE";
  try { text.resizeWithoutConstraints(w, h); } catch (e) {}
  text.name = t.characters.slice(0, 40) || "text";
  return text;
}

// ---- build-spec executor ---------------------------------------------------
// A build spec is an authored tree of ops the plugin renders using REAL Azure
// Fluent 2 library components (instanced by global key), library text styles,
// icon swaps, and auto-layout. Produced either by the bridge (deterministic
// serializer path) or the fluent-to-figma composer agent.
//
//   { op:"frame",    name, layout?{mode,gap,padding[4],primaryAlign,counterAlign,
//                    widthMode,heightMode}, size?{w,h}, fill?, stroke?, radius?,
//                    clip?, x?, y?, layoutSizing?{h,v}, stretch?, grow?, children:[] }
//   { op:"instance", key?|setKey?, variant?{Prop:val}, props?{"Name#id":val},
//                    label?, textOverrides?{layerName:chars}, iconSwaps?[{find,key}],
//                    size?{w,h}, name?, ...layout fields }
//   { op:"text",     chars, styleKey?, size?, weight?, family?, color?, align?,
//                    lineHeight?, width?, ...layout fields }

function findTextByName(node, name) {
  if (node.type === "TEXT" && node.name === name) return node;
  if ("children" in node) {
    for (var i = 0; i < node.children.length; i++) {
      var f = findTextByName(node.children[i], name);
      if (f) return f;
    }
  }
  return null;
}

async function overrideNamedText(inst, name, chars) {
  try {
    var t = findTextByName(inst, name);
    if (t) { await figma.loadFontAsync(t.fontName); t.characters = String(chars); }
  } catch (e) { /* leave default */ }
}

async function swapIcon(inst, sw) {
  try {
    var ic = await importComp(sw.key);
    if (!ic) return;
    var target = null;
    if (sw.find) target = inst.findOne(function (n) { return n.type === "INSTANCE" && n.name === sw.find; });
    if (!target) target = inst.findOne(function (n) { return n.type === "INSTANCE" && n.width <= 24; });
    if (target) target.swapComponent(ic);
  } catch (e) { /* icon swap is best-effort */ }
}

// Build a real component instance from an instance op. Returns null on failure
// so the caller can fall back to a primitive frame.
async function makeInstance(node) {
  var comp = null;
  if (node.key) comp = await importComp(node.key);
  if (!comp && node.setKey) {
    var set = await importSet(node.setKey);
    if (set) comp = set.defaultVariant || (set.children && set.children[0]) || null;
  }
  if (!comp) return null;
  var inst;
  try { inst = comp.createInstance(); } catch (e) { return null; }
  inst.name = node.name || "component";
  await loadNodeFonts(inst);

  // Variant + component properties. Apply one at a time so a single bad key
  // never drops the rest (property IDs drift between kit versions).
  var all = {};
  var k;
  if (node.variant) for (k in node.variant) all[k] = node.variant[k];
  if (node.props) for (k in node.props) all[k] = node.props[k];
  for (k in all) {
    try { var o = {}; o[k] = all[k]; inst.setProperties(o); } catch (e) { /* skip */ }
  }

  if (node.textOverrides) for (var nm in node.textOverrides) await overrideNamedText(inst, nm, node.textOverrides[nm]);
  if (node.label) await overrideInstanceText(inst, node.label);
  if (node.iconSwaps) for (var i = 0; i < node.iconSwaps.length; i++) await swapIcon(inst, node.iconSwaps[i]);
  if (node.size) { try { inst.resize(Math.max(1, node.size.w), Math.max(1, node.size.h)); } catch (e) {} }
  return inst;
}

async function applyTextStyle(t, styleKey) {
  var s = await importStyle(styleKey);
  if (!s) return false;
  try {
    await t.setTextStyleIdAsync(s.id);
    // Ensure the style's font is loaded so setting characters/appendChild is safe.
    try { if (s.fontName) await figma.loadFontAsync(s.fontName); } catch (e) {}
    await loadNodeFonts(t);
    return true;
  } catch (e) { return false; }
}

async function makeSpecText(node) {
  var t = figma.createText();
  var applied = false;
  if (node.styleKey) applied = await applyTextStyle(t, node.styleKey);
  if (!applied) {
    var font = await resolveFont(node.family || "Inter", node.weight || 400);
    t.fontName = font;
    t.fontSize = Math.max(1, Math.round(node.size || 14));
    if (node.lineHeight) t.lineHeight = { value: node.lineHeight, unit: "PIXELS" };
  }
  t.characters = String(node.chars == null ? "" : node.chars);
  if (node.color) t.fills = [solid(node.color)];
  if (node.align === "center") t.textAlignHorizontal = "CENTER";
  else if (node.align === "right") t.textAlignHorizontal = "RIGHT";
  else t.textAlignHorizontal = "LEFT";
  if (node.width) { t.textAutoResize = "HEIGHT"; try { t.resize(node.width, t.height); } catch (e) {} }
  else t.textAutoResize = "WIDTH_AND_HEIGHT";
  t.name = (node.chars ? String(node.chars) : "text").slice(0, 40);
  return t;
}

function specSizingModes(layout) {
  var mode = layout.mode || "VERTICAL";
  var wMode = layout.widthMode || "FIXED";
  var hMode = layout.heightMode || "FIXED";
  if (mode === "VERTICAL") return { primary: hMode === "AUTO" ? "AUTO" : "FIXED", counter: wMode === "AUTO" ? "AUTO" : "FIXED" };
  return { primary: wMode === "AUTO" ? "AUTO" : "FIXED", counter: hMode === "AUTO" ? "AUTO" : "FIXED" };
}

function applyChildLayout(el, spec) {
  try {
    if (spec.layoutSizing) {
      if (spec.layoutSizing.h) el.layoutSizingHorizontal = spec.layoutSizing.h;
      if (spec.layoutSizing.v) el.layoutSizingVertical = spec.layoutSizing.v;
    } else if (spec.stretch) {
      el.layoutAlign = "STRETCH";
    }
    if (spec.grow) el.layoutGrow = 1;
  } catch (e) { /* sizing can conflict with component min-size — non-fatal */ }
}

// Reparent a child under a parent, tolerating Figma's font-load validation:
// on failure, load the child's fonts and retry once; never throw.
async function safeAppend(parent, child) {
  try { parent.appendChild(child); return true; }
  catch (e) {
    try { await loadNodeFonts(child); parent.appendChild(child); return true; }
    catch (e2) { return false; }
  }
}

async function buildSpecNode(node) {
  if (!node) return null;
  if (node.op === "text") {
    specBuilt++; maybeSpecProgress();
    return await makeSpecText(node);
  }
  if (node.op === "instance") {
    var inst = await makeInstance(node);
    specBuilt++; maybeSpecProgress();
    if (inst) { instanced++; return inst; }
    fellBack++;
    // Fall through: render a labelled placeholder frame so nothing disappears.
    node = { op: "frame", name: node.name || "component", size: node.size, fill: node.fill, radius: node.radius, children: node.label ? [{ op: "text", chars: node.label, size: 14 }] : [] };
  }

  var el = figma.createFrame();
  el.name = node.name || "frame";
  var w = node.size ? node.size.w : 100;
  var h = node.size ? node.size.h : 100;
  el.clipsContent = !!node.clip;
  el.fills = node.fill ? [solid(node.fill)] : [];
  if (node.stroke) { el.strokes = [solid(node.stroke.color)]; el.strokeWeight = Math.max(1, Math.round(node.stroke.weight || 1)); }
  if (node.radius) el.cornerRadius = node.radius;
  if (node.opacity != null && node.opacity < 1) el.opacity = node.opacity;

  var kids = node.children || [];
  var built = [];
  for (var i = 0; i < kids.length; i++) {
    var childEl = await buildSpecNode(kids[i]);
    if (childEl && await safeAppend(el, childEl)) built.push({ el: childEl, spec: kids[i] });
  }

  if (node.layout) {
    el.layoutMode = node.layout.mode || "VERTICAL";
    el.itemSpacing = node.layout.gap != null ? node.layout.gap : 0;
    if (node.layout.padding) {
      var p = node.layout.padding;
      el.paddingTop = p[0] || 0; el.paddingRight = p[1] || 0;
      el.paddingBottom = p[2] || 0; el.paddingLeft = p[3] || 0;
    }
    el.primaryAxisAlignItems = node.layout.primaryAlign || "MIN";
    if (node.layout.counterAlign) el.counterAxisAlignItems = node.layout.counterAlign;
    var sm = specSizingModes(node.layout);
    if (node.size) { try { el.resize(Math.max(1, w), Math.max(1, h)); } catch (e) {} }
    try { el.primaryAxisSizingMode = sm.primary; } catch (e) {}
    try { el.counterAxisSizingMode = sm.counter; } catch (e) {}
    for (var j = 0; j < built.length; j++) applyChildLayout(built[j].el, built[j].spec);
  } else {
    try { el.resizeWithoutConstraints(Math.max(1, w), Math.max(1, h)); } catch (e) {}
    for (var m = 0; m < built.length; m++) {
      var cs = built[m].spec;
      if (cs && cs.x != null) built[m].el.x = cs.x;
      if (cs && cs.y != null) built[m].el.y = cs.y;
    }
  }
  return el;
}

var specBuilt = 0;
var specTotal = 1;
var specLastPct = -1;
var specReport = function () {};
function maybeSpecProgress() {
  var pct = Math.min(99, 10 + Math.floor((specBuilt / specTotal) * 85));
  if (pct !== specLastPct && pct % 5 === 0) { specLastPct = pct; specReport(pct); }
}
function countSpec(node) {
  if (!node) return 0;
  var n = (node.op === "text" || node.op === "instance") ? 1 : 1;
  var kids = node.children || [];
  for (var i = 0; i < kids.length; i++) n += countSpec(kids[i]);
  return n;
}

async function handleBuildSpec(msg) {
  var jobId = msg.jobId;
  var spec = msg.spec;
  var pageName = msg.pageName || (spec && spec.page) || "DesignLoop";
  var send = function (m) { m.jobId = jobId; figma.ui.postMessage(m); };
  specReport = function (pct) { send({ type: "progress", percent: pct, message: "Building components… " + pct + "%" }); };
  try {
    if (!spec || !spec.root) throw new Error("empty build spec");
    await preloadCommonFonts();
    instanced = 0; fellBack = 0; compCache = {}; setCache = {}; styleCache = {};
    specBuilt = 0; specLastPct = -1; specTotal = countSpec(spec.root);

    send({ type: "progress", percent: 1, message: "Creating page…" });
    var page = figma.createPage();
    page.name = pageName;

    var root = await buildSpecNode(spec.root);
    root.x = 0; root.y = 0;
    await safeAppend(page, root);

    try {
      if (typeof figma.setCurrentPageAsync === "function") await figma.setCurrentPageAsync(page);
      else figma.currentPage = page;
      figma.currentPage.selection = [root];
      figma.viewport.scrollAndZoomIntoView([root]);
    } catch (navErr) { /* non-fatal */ }

    var summary = "Built page “" + pageName + "” — " + instanced + " Fluent component instance(s)";
    if (fellBack) summary += ", " + fellBack + " fell back to layers";
    send({ type: "done", nodeId: root.id, pageId: page.id, pageName: pageName, instanced: instanced, fellBack: fellBack, message: summary + "." });
  } catch (e) {
    send({ type: "error", message: (e && e.message) || String(e) });
  }
}

async function handleBuild(msg) {
  var jobId = msg.jobId;
  var tree = msg.tree;
  var pageName = msg.pageName || "DesignLoop";
  reportProgress = function (pct) {
    send({ type: "progress", percent: pct, message: "Building layers… " + pct + "%" });
  };

  try {
    if (!tree || !tree.root) throw new Error("empty design tree");
    await preloadCommonFonts();
    built = 0;
    lastPct = -1;
    instanced = 0;
    fellBack = 0;
    compCache = {};
    total = countNodes(tree.root);

    send({ type: "progress", percent: 1, message: "Creating page…" });
    var page = figma.createPage();
    page.name = pageName;

    var rootFrame = await buildNode(tree.root, null);
    rootFrame.x = 0;
    rootFrame.y = 0;
    await safeAppend(page, rootFrame);

    // Switch to the new page and frame it in view. Newer Figma requires the
    // async page switch; selection/zoom are cosmetic, so never let them fail
    // the build (the layers are already created at this point).
    try {
      if (typeof figma.setCurrentPageAsync === "function") {
        await figma.setCurrentPageAsync(page);
      } else {
        figma.currentPage = page;
      }
      figma.currentPage.selection = [rootFrame];
      figma.viewport.scrollAndZoomIntoView([rootFrame]);
    } catch (navErr) {
      // Non-fatal — the page + layers exist regardless.
    }

    var summary = "Created " + total + " layers on page “" + pageName + "”";
    if (instanced || fellBack) {
      summary += " (" + instanced + " Fluent component instance(s)";
      if (fellBack) summary += ", " + fellBack + " fell back to layers";
      summary += ")";
    }
    send({
      type: "done",
      nodeId: rootFrame.id,
      pageId: page.id,
      pageName: pageName,
      instanced: instanced,
      fellBack: fellBack,
      message: summary + ".",
    });
  } catch (e) {
    send({ type: "error", message: (e && e.message) || String(e) });
  }
}

// ---- learn kit -------------------------------------------------------------
// Enumerate published components in the CURRENT file (run this in the Fluent kit
// library file) and send their name → key map to the bridge for build-time use.
async function handleLearnKit() {
  try {
    figma.ui.postMessage({ type: "kit-progress", message: "Scanning components…" });
    if (typeof figma.loadAllPagesAsync === "function") {
      try { await figma.loadAllPagesAsync(); } catch (e) {}
    }
    var comps;
    if (typeof figma.root.findAllWithCriteria === "function") {
      comps = figma.root.findAllWithCriteria({ types: ["COMPONENT"] });
    } else {
      comps = figma.root.findAll(function (n) { return n.type === "COMPONENT"; });
    }
    var out = [];
    var skipped = 0;
    var errored = 0;
    for (var i = 0; i < comps.length; i++) {
      var c = comps[i];
      if (!c.key) { skipped++; continue; } // unpublished — can't import by key
      // A component set with validation errors (duplicate/conflicting variants)
      // throws on .variantProperties and .parent.name. Never let one bad set
      // abort the whole scan — capture what we can and move on.
      var setName = null;
      try {
        if (c.parent && c.parent.type === "COMPONENT_SET") setName = c.parent.name;
      } catch (e1) { errored++; }
      var props = {};
      try { props = c.variantProperties || {}; } catch (e2) { errored++; }
      var name = c.name;
      try { name = c.name; } catch (e3) { name = "component"; }
      out.push({
        set: setName || name,
        name: name,
        key: c.key,
        props: props,
      });
    }
    figma.ui.postMessage({ type: "kit", components: out });
    var note = "Sent " + out.length + " components to the bridge.";
    if (skipped) note += " (" + skipped + " unpublished skipped — publish the kit as a library.)";
    if (errored) note += " (" + errored + " component set(s) had errors — imported without variant info.)";
    figma.ui.postMessage({ type: "kit-progress", message: note });
  } catch (e) {
    figma.ui.postMessage({ type: "kit-progress", message: "Learn kit failed: " + ((e && e.message) || e) });
  }
}

figma.ui.onmessage = function (msg) {
  if (!msg) return;
  if (msg.type === "build") {
    if (msg.spec) handleBuildSpec(msg);
    else handleBuild(msg);
  } else if (msg.type === "learn-kit") {
    handleLearnKit();
  } else if (msg.type === "ping") {
    figma.ui.postMessage({ type: "pong" });
  }
};
