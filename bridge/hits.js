'use strict';

/**
 * HITS API client for the DesAIgns bridge.
 *
 * Token acquisition: uses Azure CLI ("az account get-access-token").
 * The user must be signed in with "az login" (Microsoft account).
 *
 * Tokens are cached in-memory and on disk (bridge/tokens/hits.json).
 * They are refreshed automatically 5 minutes before expiry.
 * On a 401 from the API, the token is cleared and re-acquired once.
 */

const { execSync } = require('child_process');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const HITS_BASE  = 'https://hits.microsoft.com';
const HITS_SCOPE = 'https://microsoft.onmicrosoft.com/MSFT_HITS_API';

const TOKENS_DIR  = path.resolve(__dirname, 'tokens');
const TOKEN_FILE  = path.join(TOKENS_DIR, 'hits.json');
const REFRESH_MS  = 5 * 60 * 1000; // refresh 5 min before expiry

let _cached = null;

/* ── Token persistence ───────────────────────────────────────────── */

function saveToken(t) {
  try {
    if (!fs.existsSync(TOKENS_DIR)) fs.mkdirSync(TOKENS_DIR, { recursive: true });
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(t, null, 2));
  } catch {}
}

function loadToken() {
  try { return JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8')); } catch { return null; }
}

function isValid(t) {
  return !!(t && t.accessToken && t.expiresAt && Date.now() < t.expiresAt - REFRESH_MS);
}

function clearToken() {
  _cached = null;
  try { fs.unlinkSync(TOKEN_FILE); } catch {}
}

/* ── Azure CLI token acquisition ─────────────────────────────────── */

async function acquireToken() {
  let raw;
  try {
    raw = execSync(
      `az account get-access-token --resource "${HITS_SCOPE}" --output json`,
      { encoding: 'utf8', timeout: 30_000 }
    );
  } catch (e) {
    throw new Error(
      `HITS token acquisition failed. ` +
      `Run "az login" in your terminal to sign in with your Microsoft account, then retry.\n` +
      `az error: ${e.message.split('\n')[0]}`
    );
  }

  let parsed;
  try { parsed = JSON.parse(raw); }
  catch { throw new Error(`Could not parse "az account get-access-token" output: ${raw.slice(0, 200)}`); }

  const t = {
    accessToken: parsed.accessToken,
    expiresAt:   new Date(parsed.expiresOn).getTime(),
    source:      'az-cli',
    acquiredAt:  new Date().toISOString(),
  };
  _cached = t;
  saveToken(t);
  console.log(`[hits] Token acquired via az CLI. Expires: ${new Date(t.expiresAt).toISOString()}`);
  return t;
}

async function getToken() {
  if (isValid(_cached)) return _cached;
  const disk = loadToken();
  if (isValid(disk)) { _cached = disk; return disk; }
  return acquireToken();
}

/* ── HTTPS request helper ────────────────────────────────────────── */

function hitsRequest(method, pathname, body) {
  return getToken().then(t => new Promise((resolve, reject) => {
    const u = new URL(pathname, HITS_BASE);
    const opts = {
      hostname: u.hostname,
      port:     443,
      path:     u.pathname + u.search,
      method,
      headers: {
        Authorization:  `Bearer ${t.accessToken}`,
        Accept:         'application/json',
        'Content-Type': 'application/json',
        'User-Agent':   'DesAIgns-Bridge/1.0',
      },
    };
    if (body) {
      const payload = JSON.stringify(body);
      opts.headers['Content-Length'] = Buffer.byteLength(payload);
    }

    const req = https.request(opts, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const raw = Buffer.concat(chunks).toString('utf8');
        if (res.statusCode === 401) {
          clearToken();
          return reject(Object.assign(
            new Error('HITS API returned 401 — token expired.'),
            { code: 'TOKEN_EXPIRED' }
          ));
        }
        if (res.statusCode >= 400) {
          return reject(new Error(`HITS API ${res.statusCode}: ${raw.slice(0, 300)}`));
        }
        try { resolve({ status: res.statusCode, data: JSON.parse(raw) }); }
        catch { resolve({ status: res.statusCode, data: raw }); }
      });
    });

    req.setTimeout(30_000, () => { req.destroy(); reject(new Error('HITS API timeout')); });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  }));
}

// Auto-retry once on 401 (re-acquire token then retry).
async function hitsCall(method, pathname, body) {
  try {
    return await hitsRequest(method, pathname, body);
  } catch (e) {
    if (e.code === 'TOKEN_EXPIRED') {
      console.log('[hits] Token expired, re-acquiring...');
      await acquireToken();
      return hitsRequest(method, pathname, body);
    }
    throw e;
  }
}

/* ── Public API methods ──────────────────────────────────────────── */

function getStudy(id) {
  return hitsCall('GET', `/api/classic/Study/Get?id=${encodeURIComponent(id)}`);
}

function getTask(id) {
  return hitsCall('GET', `/api/classic/Task/Get?id=${encodeURIComponent(id)}`);
}

function getInsight(id) {
  return hitsCall('GET', `/api/classic/Insight/Get?id=${encodeURIComponent(id)}`);
}

function searchStudies(query, { filters = {}, top = 20, skip = 0 } = {}) {
  return hitsCall('POST', '/api/search/index', { query, filters, top, skip });
}

async function tokenStatus() {
  const t = _cached || loadToken();
  if (!t) return { hasToken: false, valid: false, source: null, expiresAt: null, expiresIn: null };
  const valid = isValid(t);
  return {
    hasToken:  true,
    valid,
    source:    t.source || 'unknown',
    expiresAt: new Date(t.expiresAt).toISOString(),
    expiresIn: Math.round((t.expiresAt - Date.now()) / 1000),
  };
}

module.exports = { getStudy, getTask, getInsight, searchStudies, tokenStatus, acquireToken };
