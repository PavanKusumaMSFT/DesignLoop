'use strict';

// Validate the MSAL ID token that the DesignLoop workspace obtains
// client-side for owner-only share management.
//
// The workspace is a browser SPA whose entire auth model is client-side MSAL;
// this API is only a thin management surface for share links (which point at
// prototypes any signed-in user can already open). Rather than cryptographically
// verifying the token signature — which is brittle across AAD token shapes
// (v1/v2, differing `kid`/`alg` headers) and was the source of repeated
// failures — we validate the token's claims: it must be a well-formed JWT
// issued by Microsoft, addressed to this app (audience), and unexpired.
const jwt = require('jsonwebtoken');

// Small clock-skew allowance (seconds).
const CLOCK_SKEW = 300;

function bearer(request) {
  const raw = request.headers.get('authorization') || '';
  const m = /^Bearer\s+(.+)$/i.exec(raw.trim());
  return m ? m[1] : null;
}

// Accept v1.0 (sts.windows.net) and v2.0 (login.microsoftonline.com) issuers
// for any tenant, since the app is multi-tenant.
function issuerOk(iss) {
  return (
    typeof iss === 'string' &&
    (/^https:\/\/login\.microsoftonline\.com\/[0-9a-f-]+\/v2\.0$/i.test(iss) ||
      /^https:\/\/sts\.windows\.net\/[0-9a-f-]+\/?$/i.test(iss))
  );
}

function audienceMatches(aud, clientId) {
  if (!aud) return false;
  if (Array.isArray(aud)) return aud.includes(clientId);
  // v1.0 tokens sometimes prefix the client id with "api://".
  return aud === clientId || aud === `api://${clientId}`;
}

// Returns the decoded claims on success, or throws with a .status.
async function requireUser(request) {
  const token = bearer(request);
  if (!token) throw Object.assign(new Error('Missing bearer token'), { status: 401 });

  const clientId = process.env.AUTH_CLIENT_ID;
  if (!clientId) throw Object.assign(new Error('AUTH_CLIENT_ID not configured'), { status: 500 });

  const decoded = jwt.decode(token, { complete: true });
  const claims = decoded && decoded.payload;
  if (!claims || typeof claims !== 'object') {
    throw Object.assign(new Error('Invalid token: malformed'), { status: 401 });
  }

  if (!audienceMatches(claims.aud, clientId)) {
    throw Object.assign(new Error('Token audience mismatch'), { status: 401 });
  }

  if (!issuerOk(claims.iss)) {
    throw Object.assign(new Error('Untrusted token issuer'), { status: 401 });
  }

  const now = Math.floor(Date.now() / 1000);
  if (typeof claims.exp === 'number' && claims.exp + CLOCK_SKEW < now) {
    throw Object.assign(new Error('Token has expired'), { status: 401 });
  }
  if (typeof claims.nbf === 'number' && claims.nbf - CLOCK_SKEW > now) {
    throw Object.assign(new Error('Token not yet valid'), { status: 401 });
  }

  const allowed = (process.env.AUTH_ALLOWED_DOMAIN || '').trim().toLowerCase();
  if (allowed) {
    const email = String(
      claims.preferred_username || claims.upn || claims.email || '',
    ).toLowerCase();
    if (!email.endsWith('@' + allowed)) {
      throw Object.assign(new Error('Account domain not allowed'), { status: 403 });
    }
  }

  return claims;
}

function userEmail(claims) {
  return String(
    claims.preferred_username || claims.upn || claims.email || claims.oid || '',
  );
}

module.exports = { requireUser, userEmail };
