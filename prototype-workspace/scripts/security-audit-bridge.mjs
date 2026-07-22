import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const REPORTS_ROOT = path.join(ROOT, "public", "reports", "security-audit");
const PORT = Number(process.env.SECURITY_AUDIT_BRIDGE_PORT || 4317);
const APP_BASE_URL = process.env.SECURITY_AUDIT_APP_BASE_URL || "http://127.0.0.1:3000";
const ENABLE_ROUTE_SCREENSHOTS = process.env.SECURITY_AUDIT_CAPTURE_SCREENSHOTS !== "false";
const APPEND_AUDIT_BYPASS_QUERY = process.env.SECURITY_AUDIT_APPEND_BYPASS_QUERY !== "false";
const MAX_NAV_VIEWS_PER_ROUTE = Number(process.env.SECURITY_AUDIT_MAX_NAV_VIEWS || 8);
const MAX_SECTIONS_PER_VIEW = Number(process.env.SECURITY_AUDIT_MAX_SECTIONS_PER_VIEW || 6);
const ALLOWED_CITATION_HOST = "learn.microsoft.com";
const ALLOWED_CITATION_PATH_PREFIX = "/en-us/security/zero-trust/";

function json(res, statusCode, body) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(body));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeRoute(route) {
  if (!route) return "/";
  return route.startsWith("/") ? route : `/${route}`;
}

function routeSlug(route) {
  const normalized = normalizeRoute(route);
  const withoutLeadingSlash = normalized.replace(/^\//, "") || "root";
  return withoutLeadingSlash.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "root";
}

function buildAuditableUrl(route) {
  const normalizedRoute = normalizeRoute(route);
  const url = new URL(`${APP_BASE_URL}${normalizedRoute}`);
  if (APPEND_AUDIT_BYPASS_QUERY) {
    url.searchParams.set("auditBridge", "1");
  }
  return {
    normalizedRoute,
    url: url.toString(),
  };
}

function pickCitation(payloadCitations, category) {
  const fallback = {
    citationtitle: "Secure Future Initiative overview",
    citationlink:
      "https://learn.microsoft.com/en-us/security/zero-trust/sfi/secure-future-initiative-overview",
  };

  const safeCitations = (payloadCitations || []).filter((item) => {
    try {
      const url = new URL(item.citationlink);
      return (
        url.hostname === ALLOWED_CITATION_HOST &&
        url.pathname.startsWith(ALLOWED_CITATION_PATH_PREFIX)
      );
    } catch {
      return false;
    }
  });

  if (safeCitations.length === 0) return fallback;

  const preferredByCategory = {
    "Protect Identity & Safeguard Access":
      "secure-future-initiative-identity-overview",
    "Use Data to Improve Security":
      "secure-future-initiative-threat-overview",
    "Make the Default Options Secure": "zero-trust-overview",
    "Provide Ongoing User Communication":
      "secure-future-initiative-response-overview",
  };

  const preferredToken = preferredByCategory[category];
  if (preferredToken) {
    const matched = safeCitations.find((c) => c.citationlink.includes(preferredToken));
    if (matched) {
      return matched;
    }
  }

  return safeCitations[0];
}

async function fetchRouteHtml(route) {
  const { normalizedRoute, url } = buildAuditableUrl(route);
  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "text/html" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${normalizedRoute} (status ${response.status})`);
  }

  return response.text();
}

function toPlainText(html) {
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function getGuidelineKeywords(guideline) {
  return String(guideline || "")
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter((token) => token.length >= 4);
}

function evaluateGuideline(guideline, html, viewCount = 1) {
  const plain = String(html || "").toLowerCase();

  const checks = [
    {
      match: /complex|advanced settings|expert mode|technical/i,
      positive: /simple|guided|step|wizard|recommended/i,
    },
    {
      match: /sign in|authenticate|mfa|passkey|verify/i,
      positive: /sign in|authenticate|verify|step/i,
    },
    {
      match: /role|permission|rbac|admin|owner|reader/i,
      positive: /role|permission|admin|owner|reader/i,
    },
    {
      match: /access|authorized|scope|tenant|subscription/i,
      positive: /access|authorized|scope|subscription/i,
    },
    {
      match: /anonymous|guest|public/i,
      positive: /sign in|required|authenticated/i,
    },
    {
      match: /recover|reset|account recovery|identity verification/i,
      positive: /recover|reset|verification/i,
    },
    {
      match: /verify user|confirm identity|approver/i,
      positive: /confirm|verify|identity/i,
    },
    {
      match: /activity|history|recent|timeline|events/i,
      positive: /activity|history|recent|events/i,
    },
    {
      match: /logs|logging|audit log|telemetry/i,
      positive: /logs|audit|telemetry/i,
    },
    {
      match: /immutable|retention|tamper|write once/i,
      positive: /retention|tamper|immutable/i,
    },
    {
      match: /default|recommended|secure by default/i,
      positive: /default|recommended|secure/i,
    },
    {
      match: /default|preset|recommended/i,
      positive: /default|recommended|preset/i,
    },
    {
      match: /share|sharing|data visibility|public/i,
      positive: /share|sharing|visibility|data/i,
    },
    {
      match: /organization|policy|tenant|enterprise/i,
      positive: /organization|policy|enterprise|tenant/i,
    },
    {
      match: /onboarding|get started|walkthrough|intro/i,
      positive: /onboarding|get started|walkthrough|learn/i,
    },
    {
      match: /success|failed|completed|status|result/i,
      positive: /success|failed|status|result|completed/i,
    },
    {
      match: /warning|unsafe|risk|alert|danger/i,
      positive: /warning|alert|risk|unsafe/i,
    },
    {
      match: /down|outage|incident|degraded|unavailable/i,
      positive: /outage|incident|degraded|status/i,
    },
  ];

  const index = Math.max(
    0,
    Math.min(checks.length - 1, guideline.indexHint ?? 0)
  );
  const check = checks[index];

  const hasRelevantSignals = check.match.test(plain);
  const hasPositiveSignals = check.positive.test(plain);

  if (hasRelevantSignals && hasPositiveSignals) {
    return {
      status: "In Use",
      justification:
        `Observed matching security signals across ${viewCount} audited view(s), aligned with this guideline.`,
    };
  }

  return {
    status: "Unclear",
    justification:
      `Across ${viewCount} audited view(s), no clear deterministic evidence was found for this guideline.`,
  };
}

function pickBestSectionEvidence(guideline, routeEvidence) {
  const sections = routeEvidence?.sectionEvidence || [];
  if (sections.length === 0) {
    if (routeEvidence?.fallbackEvidenceImagePath) {
      return {
        evidenceImagePath: routeEvidence.fallbackEvidenceImagePath,
        evidenceNote: routeEvidence.fallbackEvidenceNote || "Using route-level evidence screenshot.",
      };
    }
    return null;
  }

  const keywords = getGuidelineKeywords(guideline?.guideline || guideline || "");
  let best = null;
  let bestScore = -1;

  for (const section of sections) {
    const text = String(section.text || "").toLowerCase();
    const score = keywords.reduce((count, token) => count + (text.includes(token) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = section;
    }
  }

  if (!best) return null;

  return {
    evidenceImagePath: best.evidenceImagePath,
    evidenceNote:
      bestScore > 0
        ? `${best.evidenceNote} (matched ${bestScore} guideline keyword(s))`
        : `${best.evidenceNote} (best available section evidence)`,
  };
}

function countRouteSectionEvidence(captures) {
  let total = 0;
  for (const routeEvidence of captures.values()) {
    total += Array.isArray(routeEvidence?.sectionEvidence)
      ? routeEvidence.sectionEvidence.length
      : 0;
  }
  return total;
}

function countRoutePageEvidence(captures) {
  let total = 0;
  for (const routeEvidence of captures.values()) {
    total += Array.isArray(routeEvidence?.pageEvidencePaths)
      ? routeEvidence.pageEvidencePaths.length
      : 0;
  }
  return total;
}

function validateFindings(findings) {
  for (const finding of findings) {
    if (!finding.route || !finding.category || !finding.guideline) {
      throw new Error("Invalid finding schema: missing route/category/guideline");
    }
    if (finding.status !== "In Use" && finding.status !== "Unclear") {
      throw new Error("Invalid finding schema: unsupported status");
    }
    if (!finding.justification || !finding.citationlink || !finding.citationtitle) {
      throw new Error("Invalid finding schema: missing justification/citation fields");
    }

    const citationUrl = new URL(finding.citationlink);
    if (
      citationUrl.hostname !== ALLOWED_CITATION_HOST ||
      !citationUrl.pathname.startsWith(ALLOWED_CITATION_PATH_PREFIX)
    ) {
      throw new Error("Citation policy violation: non-authoritative citation link");
    }

    if (finding.evidenceImagePath && !String(finding.evidenceImagePath).startsWith("/reports/security-audit/")) {
      throw new Error("Invalid finding schema: evidenceImagePath must be report-relative");
    }
  }
}

async function captureRouteScreenshots(runId, routes, evidenceFolder) {
  const captures = new Map();

  if (!ENABLE_ROUTE_SCREENSHOTS) {
    return {
      captures,
      mode: "screenshots-disabled",
      error: null,
    };
  }

  let playwright;
  try {
    playwright = await import("playwright");
  } catch {
    return {
      captures,
      mode: "screenshots-unavailable",
      error: "Playwright package is not installed in this workspace.",
    };
  }

  let browser;
  try {
    browser = await playwright.chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1440, height: 2200 } });

    for (const route of routes) {
      const { normalizedRoute, url } = buildAuditableUrl(route);
      const routeBase = routeSlug(normalizedRoute);

      let viewCount = 0;
      const sectionEvidence = [];
      const pageEvidencePaths = [];
      const combinedTextParts = [];
      const seenViewFingerprints = new Set();

      const captureCurrentView = async (viewLabel) => {
        const viewData = await page.evaluate(() => {
          const viewportArea = Math.max(window.innerWidth * window.innerHeight, 1);

          const toPath = (el) => {
            if (!(el instanceof Element)) return "";
            const parts = [];
            let node = el;
            while (node && node.nodeType === Node.ELEMENT_NODE && parts.length < 8) {
              const tag = node.tagName.toLowerCase();
              let segment = tag;
              if (node.id) {
                segment += `#${node.id}`;
                parts.unshift(segment);
                break;
              }
              const siblings = node.parentElement
                ? Array.from(node.parentElement.children).filter((s) => s.tagName === node.tagName)
                : [];
              if (siblings.length > 1) {
                segment += `:nth-of-type(${siblings.indexOf(node) + 1})`;
              }
              parts.unshift(segment);
              node = node.parentElement;
            }
            return parts.join(" > ");
          };

          const visible = (el) => {
            const rect = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);
            return (
              rect.width > 80 &&
              rect.height > 40 &&
              style.visibility !== "hidden" &&
              style.display !== "none"
            );
          };

          const pickAuditRoot = () => {
            const explicit = document.querySelector("[data-audit-root], main, [role='main']");
            if (explicit && explicit instanceof Element) return explicit;

            const candidates = Array.from(document.querySelectorAll("div,section,article"))
              .filter((el) => visible(el))
              .filter((el) => {
                const tag = el.tagName.toLowerCase();
                if (tag === "header" || tag === "nav" || tag === "footer" || tag === "aside") {
                  return false;
                }

                const parentTag = el.parentElement?.tagName.toLowerCase();
                if (parentTag === "header" || parentTag === "nav" || parentTag === "footer") {
                  return false;
                }

                const text = (el.textContent || "").replace(/\s+/g, " ").trim();
                return text.length > 80;
              });

            if (candidates.length === 0) return document.body;

            return candidates
              .sort((a, b) => {
                const ra = a.getBoundingClientRect();
                const rb = b.getBoundingClientRect();
                return rb.width * rb.height - ra.width * ra.height;
              })[0];
          };

          const auditRoot = pickAuditRoot();

          const sectionSelectors = [
            "section",
            "article",
            "form",
            "[role='region']",
            "[role='tabpanel']",
            "[role='dialog']",
            "[role='group']",
            ".card",
            "[class*='card']",
            "[class*='panel']",
            "[class*='content']",
            "[class*='container']",
            "[data-testid]",
            "[aria-label]",
          ];

          const sectionNodes = Array.from(auditRoot.querySelectorAll(sectionSelectors.join(",")));
          const sections = sectionNodes
            .filter((el) => visible(el))
            .map((el) => {
              const rect = el.getBoundingClientRect();
              const area = rect.width * rect.height;
              const areaRatio = area / viewportArea;
              const text = (el.textContent || "").replace(/\s+/g, " ").trim();
              return {
                selector: toPath(el),
                text,
                label: (el.getAttribute("aria-label") || el.getAttribute("data-testid") || el.tagName).slice(0, 60),
                areaRatio,
              };
            })
            .filter((section) => {
              if (!section.selector || section.text.length < 40) return false;
              // Drop tiny fragments and giant shell-sized containers.
              if (section.areaRatio < 0.006 || section.areaRatio > 0.9) return false;
              return true;
            })
            .slice(0, 16);

          const headingAnchoredSections = Array.from(
            auditRoot.querySelectorAll("h1,h2,h3,h4")
          )
            .filter((el) => visible(el))
            .map((heading) => {
              const parent =
                heading.closest("section,article,[role='region'],[role='tabpanel'],.card,[class*='card'],[class*='panel'],div") ||
                heading.parentElement;
              if (!(parent instanceof Element)) return null;

              const text = (parent.textContent || "").replace(/\s+/g, " ").trim();
              if (text.length < 40) return null;

              return {
                selector: toPath(parent),
                text,
                label: (heading.textContent || heading.tagName).replace(/\s+/g, " ").trim().slice(0, 60),
                areaRatio: 0,
              };
            })
            .filter(Boolean)
            .slice(0, 8);

          const sectionMap = new Map();
          for (const section of [...sections, ...headingAnchoredSections]) {
            if (!section?.selector) continue;
            if (!sectionMap.has(section.selector)) {
              sectionMap.set(section.selector, section);
            }
          }

          const mergedSections = Array.from(sectionMap.values()).slice(0, 20);

          const navNodes = Array.from(
            document.querySelectorAll("[role='tab'], [role='menuitem'], button, a[href], [aria-controls]")
          );

          const navCandidates = navNodes
            .filter((el) => visible(el))
            .map((el) => {
              const label = (el.textContent || el.getAttribute("aria-label") || "")
                .replace(/\s+/g, " ")
                .trim();
              return {
                selector: toPath(el),
                label,
              };
            })
            .filter((item) => {
              const lower = item.label.toLowerCase();
              if (!item.selector || lower.length < 2 || lower.length > 80) return false;
              if (/(sign out|logout|delete|remove|close account)/i.test(lower)) return false;
              return true;
            })
            .slice(0, 30);

          const bodyText = (auditRoot?.innerText || document.body?.innerText || "")
            .replace(/\s+/g, " ")
            .trim();

          return {
            sections: mergedSections,
            navCandidates,
            bodyText,
          };
        });

        const fingerprint = `${viewData.bodyText.slice(0, 800)}::${viewData.sections.length}`;
        if (seenViewFingerprints.has(fingerprint)) {
          return viewData;
        }

        seenViewFingerprints.add(fingerprint);
        viewCount += 1;
        combinedTextParts.push(viewData.bodyText);

        const pageName = `${routeBase}-view-${viewCount}-page.png`;
        const pageFsPath = path.join(evidenceFolder, pageName);
        const pageRelativePath = `/reports/security-audit/${runId}/evidence/${pageName}`;
        await page.screenshot({ path: pageFsPath, fullPage: true });
        pageEvidencePaths.push(pageRelativePath);

        const sectionsToCapture = viewData.sections.slice(0, MAX_SECTIONS_PER_VIEW);
        for (let idx = 0; idx < sectionsToCapture.length; idx += 1) {
          const section = sectionsToCapture[idx];
          const sectionName = `${routeBase}-view-${viewCount}-section-${idx + 1}.png`;
          const sectionFsPath = path.join(evidenceFolder, sectionName);
          const sectionRelativePath = `/reports/security-audit/${runId}/evidence/${sectionName}`;

          try {
            await page.locator(section.selector).first().screenshot({ path: sectionFsPath });
            sectionEvidence.push({
              text: section.text,
              evidenceImagePath: sectionRelativePath,
              evidenceNote: `View ${viewCount} (${viewLabel}) section: ${section.label}`,
            });
          } catch {
            sectionEvidence.push({
              text: section.text,
              evidenceImagePath: pageRelativePath,
              evidenceNote: `View ${viewCount} (${viewLabel}) fallback to page-level evidence for section: ${section.label}`,
            });
          }
        }

        return viewData;
      };

      try {
        await page.goto(url, {
          waitUntil: "networkidle",
          timeout: 20000,
        });

        const initialView = await captureCurrentView("initial");
        const clicked = new Set();
        let navClicks = 0;

        for (const candidate of initialView.navCandidates || []) {
          if (navClicks >= MAX_NAV_VIEWS_PER_ROUTE) break;
          if (!candidate.selector || clicked.has(candidate.selector)) continue;
          clicked.add(candidate.selector);

          try {
            await page.locator(candidate.selector).first().click({ timeout: 2000 });
            await page.waitForTimeout(450);
            try {
              await page.waitForLoadState("networkidle", { timeout: 2000 });
            } catch {
              // Keep running even if no network-idle transition occurs.
            }
            await captureCurrentView(candidate.label || `nav-${navClicks + 1}`);
            navClicks += 1;
          } catch {
            // Ignore click failures and continue with other candidates.
          }
        }

        const fallbackEvidenceImagePath = sectionEvidence[0]?.evidenceImagePath || null;
        const firstPageEvidence = pageEvidencePaths[0] || null;
        captures.set(normalizedRoute, {
          viewCount,
          combinedText: combinedTextParts.join("\n").toLowerCase(),
          sectionEvidence,
          pageEvidencePaths,
          fallbackEvidenceImagePath: fallbackEvidenceImagePath || firstPageEvidence,
          fallbackEvidenceNote: `Captured ${viewCount} view(s), ${pageEvidencePaths.length} page evidence image(s), and ${sectionEvidence.length} section evidence image(s) for ${normalizedRoute}.`,
          evidenceNote: `Captured ${viewCount} view(s), ${pageEvidencePaths.length} page evidence image(s), and ${sectionEvidence.length} section evidence image(s).`,
        });
      } catch (error) {
        captures.set(normalizedRoute, {
          viewCount: 0,
          combinedText: "",
          sectionEvidence: [],
          pageEvidencePaths: [],
          fallbackEvidenceImagePath: null,
          fallbackEvidenceNote: undefined,
          evidenceNote:
            error instanceof Error
              ? `View capture failed for ${normalizedRoute}: ${error.message}`
              : `View capture failed for ${normalizedRoute}.`,
        });
      }
    }

    return {
      captures,
      mode: "screenshots-captured",
      error: null,
    };
  } catch (error) {
    return {
      captures,
      mode: "screenshots-error",
      error:
        error instanceof Error
          ? `Unable to launch Playwright browser: ${error.message}`
          : "Unable to launch Playwright browser.",
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function buildDeterministicFindings(payload, route, routeEvidence) {
  let corpus = routeEvidence?.combinedText || "";
  if (!corpus) {
    const html = await fetchRouteHtml(route);
    corpus = toPlainText(html);
  }

  const guidelines = payload.guidelines || [];
  const viewCount = routeEvidence?.viewCount || 1;

  return guidelines.map((g, idx) => {
    const evaluation = evaluateGuideline(
      { ...g, indexHint: idx },
      corpus,
      viewCount
    );
    const citation = pickCitation(payload.citations, g.category);
    const bestEvidence = pickBestSectionEvidence(g, routeEvidence);

    return {
      route,
      category: g.category,
      guideline: g.guideline,
      status: evaluation.status,
      justification: evaluation.justification,
      citationtitle: citation.citationtitle,
      citationlink: citation.citationlink,
      evidenceImagePath: bestEvidence?.evidenceImagePath || undefined,
      evidenceNote: bestEvidence?.evidenceNote || routeEvidence?.evidenceNote || undefined,
    };
  });
}

function renderReportHtml(payload, findings, runMeta) {
  const byRoute = new Map();
  for (const item of findings) {
    if (!byRoute.has(item.route)) byRoute.set(item.route, []);
    byRoute.get(item.route).push(item);
  }

  const total = findings.length;
  const inUse = findings.filter((f) => f.status === "In Use").length;
  const unclear = findings.filter((f) => f.status === "Unclear").length;

  const routesHtml = Array.from(byRoute.entries())
    .map(([route, routeFindings]) => {
      const grouped = new Map();
      for (const item of routeFindings) {
        if (!grouped.has(item.category)) grouped.set(item.category, []);
        grouped.get(item.category).push(item);
      }

      const categoriesHtml = Array.from(grouped.entries())
        .map(([category, items]) => {
          const rows = items
            .map((item) => {
              const statusClass = item.status === "In Use" ? "inuse" : "unclear";
              return `
                <div class="row">
                  <div class="row-head">
                    <span class="pill ${statusClass}">${escapeHtml(item.status)}</span>
                    <span class="guide">${escapeHtml(item.guideline)}</span>
                  </div>
                  <p class="just">${escapeHtml(item.justification)}</p>
                  ${item.evidenceImagePath ? `<a href="${escapeHtml(item.evidenceImagePath)}" target="_blank" rel="noopener noreferrer"><img class="evidence" src="${escapeHtml(item.evidenceImagePath)}" alt="Evidence snapshot for ${escapeHtml(item.guideline)}" /></a>` : ""}
                  ${item.evidenceNote ? `<p class="note">${escapeHtml(item.evidenceNote)}</p>` : ""}
                  <a href="${escapeHtml(item.citationlink)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.citationtitle)}</a>
                </div>
              `;
            })
            .join("\n");

          return `
            <section class="category">
              <h2>${escapeHtml(category)} <span>${items.length} guidelines</span></h2>
              ${rows}
            </section>
          `;
        })
        .join("\n");

      return `
        <section class="route-section">
          <h2 class="route-title">Route: ${escapeHtml(route)}</h2>
          ${categoriesHtml}
        </section>
      `;
    })
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Security Audit Report - ${escapeHtml(payload.project.title)}</title>
  <style>
    body { font-family: Segoe UI, system-ui, sans-serif; margin: 0; padding: 24px; background: #f5f5f5; color: #1b1a19; }
    .wrap { max-width: 1180px; margin: 0 auto; display: grid; gap: 16px; }
    .hero { background: #fff; border: 1px solid #e1dfdd; border-radius: 12px; padding: 16px; }
    .hero h1 { margin: 0 0 6px 0; font-size: 24px; }
    .meta { color: #605e5c; font-size: 14px; }
    .stats { display: grid; grid-template-columns: repeat(3, minmax(160px, 1fr)); gap: 10px; }
    .stat { background: #fff; border: 1px solid #e1dfdd; border-radius: 12px; padding: 12px; }
    .stat .n { font-size: 26px; font-weight: 600; color: #0078d4; }
    .category { background: #fff; border: 1px solid #e1dfdd; border-radius: 12px; padding: 16px; }
    .route-section { display: grid; gap: 12px; }
    .route-title { margin: 0; font-size: 20px; color: #323130; }
    .category h2 { margin: 0 0 12px 0; font-size: 18px; display: flex; gap: 8px; align-items: baseline; }
    .category h2 span { font-size: 13px; color: #605e5c; font-weight: 400; }
    .row { border: 1px solid #edebe9; border-radius: 10px; padding: 10px; margin-bottom: 10px; }
    .row-head { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .pill { font-size: 12px; border-radius: 999px; padding: 2px 8px; border: 1px solid transparent; }
    .pill.inuse { background: #e6f4ea; border-color: #18a100; color: #0f6b2e; }
    .pill.unclear { background: #fde7e9; border-color: #d13438; color: #a4262c; }
    .guide { font-weight: 600; }
    .just { margin: 8px 0; color: #484644; }
    .note { margin: 8px 0; color: #605e5c; font-size: 12px; }
    img.evidence { width: 100%; border: 1px solid #edebe9; border-radius: 8px; margin: 8px 0; }
    a { color: #3256bb; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <main class="wrap">
    <section class="hero">
      <h1>Secure by Design Audit Report</h1>
      <div class="meta">Project: ${escapeHtml(payload.project.title)} | Routes: ${escapeHtml(String(payload.project.prototypeRoutes?.length ?? 1))} | Run: ${escapeHtml(payload.runId)}</div>
      <div class="meta">Requested at: ${escapeHtml(payload.requestedAt)}</div>
      <div class="meta">Audited views captured: ${escapeHtml(String(runMeta?.totalAuditedViews || 0))}</div>
      <div class="meta">Evidence mode: ${escapeHtml(runMeta?.evidenceMode || "unknown")} | Evidence images: ${escapeHtml(String(runMeta?.evidenceCount || 0))}</div>
      <div class="meta">Section evidence images: ${escapeHtml(String(runMeta?.totalSectionEvidenceImages || 0))} | Page evidence images: ${escapeHtml(String(runMeta?.totalPageEvidenceImages || 0))}</div>
      ${runMeta?.evidenceError ? `<div class="meta">Evidence note: ${escapeHtml(runMeta.evidenceError)}</div>` : ""}
    </section>

    <section class="stats">
      <div class="stat"><div class="n">${total}</div><div>Guidelines Applicable</div></div>
      <div class="stat"><div class="n">${inUse}</div><div>In Use</div></div>
      <div class="stat"><div class="n">${unclear}</div><div>Unclear</div></div>
    </section>

    ${routesHtml}
  </main>
</body>
</html>`;
}

async function readRequestBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}

async function handleRun(req, res) {
  const raw = await readRequestBody(req);
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json(res, 400, { error: "Invalid JSON payload" });
  }

  const routes = Array.isArray(payload?.project?.prototypeRoutes)
    ? payload.project.prototypeRoutes
    : payload?.project?.prototypeRoute
      ? [payload.project.prototypeRoute]
      : [];

  if (!payload?.runId || !payload?.project?.id || routes.length === 0) {
    return json(res, 400, {
      error: "Missing required fields: runId, project.id, project.prototypeRoutes",
    });
  }

  payload.project.prototypeRoutes = routes;

  const runFolder = path.join(REPORTS_ROOT, payload.runId);
  const evidenceFolder = path.join(runFolder, "evidence");
  const reportPath = path.join(runFolder, "report.html");
  const payloadPath = path.join(runFolder, "request.json");
  const findingsPath = path.join(runFolder, "findings.json");

  await fs.mkdir(evidenceFolder, { recursive: true });

  const evidenceCapture = await captureRouteScreenshots(
    payload.runId,
    routes,
    evidenceFolder
  );

  const findings = [];
  let totalAuditedViews = 0;
  for (const route of routes) {
    const normalizedRoute = normalizeRoute(route);
    const routeEvidence = evidenceCapture.captures.get(normalizedRoute);
    totalAuditedViews += routeEvidence?.viewCount || 0;

    try {
      const routeFindings = await buildDeterministicFindings(payload, route, routeEvidence);
      findings.push(...routeFindings);
    } catch (error) {
      const routeFallback = (payload.guidelines || []).map((g) => {
        const citation = pickCitation(payload.citations, g.category);
        return {
          route: normalizedRoute,
          category: g.category,
          guideline: g.guideline,
          status: "Unclear",
          justification:
            "Route view capture/evaluation failed in bridge. Keeping guideline as Unclear pending deeper audit.",
          citationtitle: citation.citationtitle,
          citationlink: citation.citationlink,
          evidenceImagePath: routeEvidence?.fallbackEvidenceImagePath || undefined,
          evidenceNote: routeEvidence?.evidenceNote || undefined,
        };
      });
      findings.push(...routeFallback);
    }
  }

  validateFindings(findings);

  const evidenceCount = findings.filter((item) => Boolean(item.evidenceImagePath)).length;
  const totalSectionEvidenceImages = countRouteSectionEvidence(evidenceCapture.captures);
  const totalPageEvidenceImages = countRoutePageEvidence(evidenceCapture.captures);

  const reportHtml = renderReportHtml(payload, findings, {
    evidenceMode: evidenceCapture.mode,
    evidenceError: evidenceCapture.error,
    evidenceCount,
    totalAuditedViews,
    totalSectionEvidenceImages,
    totalPageEvidenceImages,
  });

  await Promise.all([
    fs.writeFile(reportPath, reportHtml, "utf8"),
    fs.writeFile(payloadPath, JSON.stringify(payload, null, 2), "utf8"),
    fs.writeFile(findingsPath, JSON.stringify(findings, null, 2), "utf8"),
  ]);

  return json(res, 200, {
    accepted: true,
    runId: payload.runId,
    reportRelativePath: `/reports/security-audit/${payload.runId}/report.html`,
    findingsCount: findings.length,
    evidenceCount,
    auditedViews: totalAuditedViews,
    sectionEvidenceImages: totalSectionEvidenceImages,
    pageEvidenceImages: totalPageEvidenceImages,
    mode: "deterministic-multiview-section-evaluator",
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    return json(res, 200, { ok: true });
  }

  if (req.method === "POST" && req.url === "/security-audit/run") {
    try {
      return await handleRun(req, res);
    } catch (error) {
      return json(res, 500, {
        error: "Bridge execution failed",
        details: error instanceof Error ? error.message : "unknown",
      });
    }
  }

  return json(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`Security Audit bridge listening on http://127.0.0.1:${PORT}`);
});
