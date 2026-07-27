'use strict';

const { app } = require('@azure/functions');
const { json, readJson, errorResponse } = require('../lib/http');
const { requireUser } = require('../lib/auth');
const { getShare, patchShare } = require('../lib/store');

// POST /api/shares/lock  (owner-only)
// body: { prototypeId, token, locked }  -> lock or unlock a share.
app.http('sharesLock', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'shares/lock',
  handler: async (request) => {
    try {
      await requireUser(request);
      const body = await readJson(request);
      const prototypeId = String(body.prototypeId || '').trim();
      const token = String(body.token || '').trim();
      const locked = !!body.locked;

      if (!prototypeId || !token)
        return json(400, { error: 'prototypeId and token are required' });

      const existing = await getShare(prototypeId, token);
      if (!existing) return json(404, { error: 'Share not found' });

      await patchShare(prototypeId, token, {
        locked,
        updatedAt: new Date().toISOString(),
      });

      return json(200, { prototypeId, token, locked });
    } catch (e) {
      return errorResponse(e);
    }
  },
});
