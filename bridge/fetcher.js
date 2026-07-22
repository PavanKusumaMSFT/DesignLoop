'use strict';

/**
 * DesignLoop Fetcher — web content retrieval for agents.
 *
 * Two modes:
 *   fetchUrl(url)   — pure HTTP/HTTPS via Node built-ins. Fast, zero browser
 *                     overhead. Works for public pages that return readable HTML.
 *   browseUrl(url)  — Playwright headless browser. Handles JS-rendered pages,
 *                     SPAs, and authenticated portals via saved session state.
 *
 * Session management (for authenticated portals):
 *   Sessions are stored as Playwright storage-state JSON files in bridge/sessions/.
 *   On first use, browseUrl opens a visible browser so the user can log in.
 *   The session is then saved and reused headlessly on every subsequent call.
 */

const https  = require('https');
const http   = require('http');
const fs     = require('fs');
const path   = require('path');
const { URL } = require('url');

const SESSIONS_DIR = path.resolve(__dirname, 'sessions');

/* ── HTML → readable markdown ───────────────────────────────────── */

function stripTags(html) {
  return String(html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function htmlToMarkdown(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    // Headings
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi,
      (_, n, t) => '\n' + '#'.repeat(+n) + ' ' + stripTags(t) + '\n')
    // Links
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi,
      (_, href, text) => `[${stripTags(text)}](${href})`)
    // Block elements → newlines
    .replace(/<\/?(p|div|section|article|li|tr|td|th|blockquote|br|hr)[^>]*>/gi, '\n')
    // Bold / italic
    .replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, '**$2**')
    .replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, '_$2_')
    // Strip remaining tags
    .replace(/<[^>]+>/g, '')
    // Decode HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    // Collapse blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/* ── Plain HTTP fetch (public, no JS rendering) ─────────────────── */

function fetchUrl(rawUrl, { maxRedirects = 5 } = {}) {
  return new Promise((resolve, reject) => {
    if (!maxRedirects) return reject(new Error('Too many redirects'));
    let parsed;
    try { parsed = new URL(rawUrl); } catch (e) { return reject(e); }

    const mod  = parsed.protocol === 'https:' ? https : http;
    const opts = {
      hostname: parsed.hostname,
      port:     parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
      path:     parsed.pathname + parsed.search,
      headers: {
        'User-Agent':      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    };

    const req = mod.get(opts, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const next = new URL(res.headers.location, rawUrl).href;
        return fetchUrl(next, { maxRedirects: maxRedirects - 1 }).then(resolve, reject);
      }

      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString('utf8');
        const ct   = res.headers['content-type'] || '';
        const content = ct.includes('text/html') ? htmlToMarkdown(body) : body;
        resolve({ url: rawUrl, status: res.statusCode, contentType: ct, content, raw: body });
      });
    });

    req.setTimeout(20_000, () => { req.destroy(); reject(new Error(`Timeout fetching ${rawUrl}`)); });
    req.on('error', reject);
  });
}

/* ── Session helpers ────────────────────────────────────────────── */

function sessionPath(provider) {
  if (!fs.existsSync(SESSIONS_DIR)) fs.mkdirSync(SESSIONS_DIR, { recursive: true });
  return path.join(SESSIONS_DIR, `${provider}.json`);
}

function hasSession(provider) {
  const p = sessionPath(provider);
  try { return fs.statSync(p).size > 10; } catch { return false; }
}

function detectProvider(rawUrl) {
  try {
    const host = new URL(rawUrl).hostname;
    if (/microsoft\.com|msft\.net|office\.com|sharepoint\.com|teams\.microsoft\.com|hits\.microsoft\.com/i.test(host))
      return 'microsoft';
    if (/google\.com|docs\.google|gmail\.com/i.test(host)) return 'google';
    return null; // public — no session needed
  } catch { return null; }
}

/* ── Microsoft SSO domains — we are "still logging in" while on these ── */
const SSO_HOSTNAMES = /login\.microsoftonline\.com|login\.microsoft\.com|login\.live\.com|account\.microsoft\.com|sts\.windows\.net/i;

function isLoginPage(url) {
  try { return SSO_HOSTNAMES.test(new URL(url).hostname); } catch { return false; }
}

/* ── Playwright browse (JS-rendered + authenticated) ─────────────── */

async function browseUrl(rawUrl, { provider: forceProvider, headless, targetUrl } = {}) {
  let playwright;
  try { playwright = require('playwright'); }
  catch { throw new Error('Playwright is not installed. Run: npm install playwright && npx playwright install chromium'); }

  const { chromium } = playwright;
  const provider = forceProvider || detectProvider(rawUrl);

  const needLogin = provider && !hasSession(provider);
  const runHeadless = headless !== undefined ? headless : !needLogin;

  const launchOpts = {
    headless: runHeadless,
    channel: 'msedge',
    args: ['--disable-blink-features=AutomationControlled'],
  };

  let browser, context;
  try {
    try {
      browser = await chromium.launch(launchOpts);
    } catch {
      browser = await chromium.launch({ ...launchOpts, channel: undefined });
    }

    const ctxOpts = {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 800 },
    };
    if (provider && hasSession(provider)) {
      ctxOpts.storageState = sessionPath(provider);
    }
    context = await browser.newContext(ctxOpts);
    const page = await context.newPage();

    if (needLogin && !runHeadless) {
      // Navigate to the actual target URL — let SSO redirect to login naturally.
      // This ensures we capture cookies for the target domain, not just login.microsoftonline.com.
      const dest = targetUrl || rawUrl;
      let targetHostname = null;
      try { targetHostname = new URL(dest).hostname; } catch {}

      console.log(`\n[auth] Opening browser for Microsoft login…`);
      console.log(`[auth] Navigating to: ${dest}`);
      console.log(`[auth] Complete sign-in in the browser window. The session saves automatically once you reach the destination.\n`);

      await page.goto(dest, { waitUntil: 'domcontentloaded', timeout: 30_000 }).catch(() => {});

      // Wait for a POSITIVE match: the URL must land on the target hostname.
      // This is deliberately NOT a negative check ("not on SSO domain") because
      // the Microsoft auth flow passes through intermediate domains
      // (aadcdn.msauth.net, account.microsoft.com, etc.) that are not SSO
      // hostnames — a negative check fires early and saves an incomplete session.
      // Only when the browser is actually back on the destination do we save.
      try {
        if (targetHostname) {
          await page.waitForURL(
            url => {
              try {
                const h = new URL(url).hostname;
                return h === targetHostname || h.endsWith('.' + targetHostname);
              } catch { return false; }
            },
            { timeout: 300_000 }
          );
          console.log(`[auth] Login complete. Final URL: ${page.url()}`);
        } else {
          // Fallback when we have no target to match against.
          await page.waitForFunction(
            src => !new RegExp(src, 'i').test(window.location.hostname),
            SSO_HOSTNAMES.source,
            { timeout: 300_000, polling: 2000 }
          );
        }
      } catch {
        console.log('[auth] Login wait timed out (5 min). Saving current session state.');
      }

      // Let the page fully settle and flush all cookies.
      await page.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
      await page.waitForTimeout(3000);

      // Save session state — now includes cookies for the target domain.
      await context.storageState({ path: sessionPath(provider) });
      console.log(`[auth] Session saved to bridge/sessions/${provider}.json`);

      const finalUrl  = page.url();
      const title     = await page.title();
      const html      = await page.content();
      return { url: finalUrl, title, content: htmlToMarkdown(html), raw: html, provider };
    }

    // Normal headless fetch (session already exists).
    await page.goto(rawUrl, { waitUntil: 'networkidle', timeout: 45_000 });

    // Detect if we landed on a login page despite having a saved session —
    // session has expired. Clear it and signal the caller to re-authenticate.
    if (isLoginPage(page.url())) {
      clearSession(provider);
      throw Object.assign(
        new Error(`Session expired for provider "${provider}". Call /api/sessions/login to re-authenticate.`),
        { code: 'SESSION_EXPIRED', provider }
      );
    }

    const finalUrl = page.url();
    const title    = await page.title();
    const html     = await page.content();

    // Refresh saved session on every successful authenticated browse.
    if (provider) {
      await context.storageState({ path: sessionPath(provider) });
    }

    return { url: finalUrl, title, content: htmlToMarkdown(html), raw: html, provider };

  } finally {
    try { if (context) await context.close(); } catch {}
    try { if (browser) await browser.close(); } catch {}
  }
}

/* ── Session management ─────────────────────────────────────────── */

function listSessions() {
  try {
    return fs.readdirSync(SESSIONS_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => {
        const provider = f.replace('.json', '');
        const stat = fs.statSync(path.join(SESSIONS_DIR, f));
        return { provider, savedAt: stat.mtime.toISOString() };
      });
  } catch { return []; }
}

function clearSession(provider) {
  const p = sessionPath(provider);
  try { fs.unlinkSync(p); return true; } catch { return false; }
}

module.exports = { fetchUrl, browseUrl, htmlToMarkdown, detectProvider, hasSession, listSessions, clearSession, sessionPath };
