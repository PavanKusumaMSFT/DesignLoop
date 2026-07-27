'use strict';

const { app } = require('@azure/functions');
const { json, readJson, errorResponse } = require('../lib/http');
const { verifyPassword } = require('../lib/hash');
const { getShare } = require('../lib/store');

// POST /api/shares/verify  (PUBLIC — no login)
// body: { prototypeId, token, password }
// Returns { valid, expiresAt } or a reason when invalid.
app.http('sharesVerify', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'shares/verify',
  handler: async (request) => {
    try {
      const body = await readJson(request);
      const prototypeId = String(body.prototypeId || '').trim();
      const token = String(body.token || '').trim();
      const password = String(body.password || '');

      if (!prototypeId || !token)
        return json(400, { valid: false, reason: 'missing' });

      const share = await getShare(prototypeId, token);
      if (!share) return json(404, { valid: false, reason: 'not_found' });

      if (share.locked) return json(403, { valid: false, reason: 'locked' });

      if (share.expiresAt && new Date(share.expiresAt).getTime() < Date.now())
        return json(403, { valid: false, reason: 'expired' });

      const ok = await verifyPassword(password, share.passwordHash);
      if (!ok) return json(401, { valid: false, reason: 'password' });

      return json(200, {
        valid: true,
        expiresAt: share.expiresAt,
        route: share.route || '',
      });
    } catch (e) {
      return errorResponse(e);
    }
  },
});
