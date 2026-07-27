'use strict';

// Authorization for feedback endpoints. A caller is allowed when EITHER:
//   • external: they present a valid, active (not locked/expired) share token
//     for this prototype — the same token that gated their password entry; or
//   • internal: they present a valid owner MSAL token (X-Owner-Token).
// Returns { source, email } describing the authorized identity.
const { getShare } = require('./store');
const { requireUser, userEmail } = require('./auth');

async function authorizeFeedback(request, prototypeId, token) {
  if (token) {
    const share = await getShare(prototypeId, token);
    if (!share) throw Object.assign(new Error('Invalid share link'), { status: 404 });
    if (share.locked) throw Object.assign(new Error('This share link is locked'), { status: 403 });
    if (share.expiresAt && new Date(share.expiresAt).getTime() < Date.now()) {
      throw Object.assign(new Error('This share link has expired'), { status: 403 });
    }
    return { source: 'external', email: null };
  }
  const claims = await requireUser(request);
  return { source: 'internal', email: userEmail(claims) };
}

module.exports = { authorizeFeedback };
