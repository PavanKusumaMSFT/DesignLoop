'use strict';

// Validate the MSAL ID token that the DesignLoop workspace obtains
// client-side. The app is multi-tenant, so we do NOT pin the issuer tenant;
// instead we verify the signature against the common AAD JWKS and require the
// audience to be our app registration.
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const JWKS_URI = 'https://login.microsoftonline.com/common/discovery/v2.0/keys';

const jwks = jwksClient({
  jwksUri: JWKS_URI,
  cache: true,
  cacheMaxAge: 12 * 60 * 60 * 1000,
  rateLimit: true,
  jwksRequestsPerMinute: 10,
});

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

// Resolve candidate public keys. Prefer the key named by the token header's
// `kid`; if that is missing or unresolved, fall back to every signing key
// published by Microsoft so a valid signature still verifies.
async function candidatePublicKeys(kid) {
  if (kid) {
    try {
      const key = await jwks.getSigningKey(kid);
      return [key.getPublicKey()];
    } catch {
      /* fall through to all keys */
    }
  }
  const keys = await jwks.getSigningKeys();
  return keys.map((k) => k.getPublicKey());
}

// Returns the decoded claims on success, or throws.
async function requireUser(request) {
  const token = bearer(request);
  if (!token) throw Object.assign(new Error('Missing bearer token'), { status: 401 });

  const clientId = process.env.AUTH_CLIENT_ID;
  if (!clientId) throw Object.assign(new Error('AUTH_CLIENT_ID not configured'), { status: 500 });

  const decoded = jwt.decode(token, { complete: true });
  if (!decoded || !decoded.header) {
    throw Object.assign(new Error('Invalid token: malformed'), { status: 401 });
  }

  const pubKeys = await candidatePublicKeys(decoded.header.kid);

  let claims = null;
  let lastError = null;
  for (const pk of pubKeys) {
    try {
      claims = jwt.verify(token, pk, {
        audience: clientId,
        algorithms: ['RS256'],
      });
      break;
    } catch (e) {
      lastError = e;
    }
  }

  if (!claims) {
    throw Object.assign(
      new Error('Invalid token: ' + (lastError ? lastError.message : 'signature')),
      { status: 401 },
    );
  }

  if (!issuerOk(claims.iss)) {
    throw Object.assign(new Error('Untrusted token issuer'), { status: 401 });
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
