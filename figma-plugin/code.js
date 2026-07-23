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

// Cache imported library components by key (many buttons share one key).
var compCache = {};
async function importComp(key) {
  if (compCache[key] !== undefined) return compCache[key];
  var comp = null;
  try { comp = await figma.importComponentByKeyAsync(key); } catch (e) { comp = null; }
  compCache[key] = comp;
  return comp;
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
  if (!key) return null;
  var comp = await importComp(key);
  if (!comp) return null;
  try {
    var inst = comp.createInstance();
    inst.name = node.name || node.fluent.component;
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
  if (node.fluent && node.fluent.componentKey) {
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
      el.appendChild(tx);
    }

    var kids = node.children || [];
    for (var i = 0; i < kids.length; i++) {
      var childEl = await buildNode(kids[i], node);
      childEl.x = kids[i].x - node.x;
      childEl.y = kids[i].y - node.y;
      el.appendChild(childEl);
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

async function handleBuild(msg) {
  var jobId = msg.jobId;
  var tree = msg.tree;
  var pageName = msg.pageName || "DesignLoop";

  var send = function (m) {
    m.jobId = jobId;
    figma.ui.postMessage(m);
  };
  reportProgress = function (pct) {
    send({ type: "progress", percent: pct, message: "Building layers… " + pct + "%" });
  };

  try {
    if (!tree || !tree.root) throw new Error("empty design tree");
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
    page.appendChild(rootFrame);

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
    handleBuild(msg);
  } else if (msg.type === "learn-kit") {
    handleLearnKit();
  } else if (msg.type === "ping") {
    figma.ui.postMessage({ type: "pong" });
  }
};
