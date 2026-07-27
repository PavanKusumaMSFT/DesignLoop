'use strict';

// Validate the MSAL ID/access token that the DesignLoop workspace obtains
// client-side. The app is multi-tenant, so we do NOT pin the issuer tenant;
// instead we verify the signature against the common AAD JWKS and require the
// audience to be our app registration.
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const JWKS_URI = 'https://login.microsoftonline.com/common/discovery/v2.0/keys';

const jwks = jwksClient({
  jwksUri: JWKS_URI,
  cache: true,
  cacheMaxage: 12 * 60 * 60 * 1000,
  rateLimit: true,
  jwksRequestsPerMinute: 10,
});

function getKey(header, callback) {
  jwks.getSigningKey(header.kid, (err, key) => {
    if (err) return callback(err);
    callback(null, key.getPublicKey());
  });
}

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

// Returns the decoded claims on success, or throws.
async function requireUser(request) {
  const token = bearer(request);
  if (!token) throw Object.assign(new Error('Missing bearer token'), { status: 401 });

  const clientId = process.env.AUTH_CLIENT_ID;
  if (!clientId) throw Object.assign(new Error('AUTH_CLIENT_ID not configured'), { status: 500 });

  const claims = await new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      { audience: clientId, algorithms: ['RS256'] },
      (err, decoded) => (err ? reject(err) : resolve(decoded)),
    );
  }).catch((e) => {
    throw Object.assign(new Error('Invalid token: ' + e.message), { status: 401 });
  });

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
