'use strict';

const { app } = require('@azure/functions');
const { json, errorResponse } = require('../lib/http');
const { requireUser } = require('../lib/auth');
const { listShares } = require('../lib/store');

function statusOf(e) {
  if (e.locked) return 'locked';
  if (e.expiresAt && new Date(e.expiresAt).getTime() < Date.now()) return 'expired';
  return 'active';
}

// GET /api/shares/list?prototypeId=  (owner-only)
// Returns sanitized shares (never the password hash).
app.http('sharesList', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'shares/list',
  handler: async (request) => {
    try {
      await requireUser(request);
      const prototypeId = request.query.get('prototypeId') || '';
      const rows = await listShares(prototypeId);
      const shares = rows.map((e) => ({
        prototypeId: e.prototypeId,
        token: e.token,
        route: e.route || '',
        label: e.label || '',
        expiresAt: e.expiresAt,
        locked: !!e.locked,
        createdBy: e.createdBy || '',
        createdAt: e.createdAt,
        status: statusOf(e),
      }));
      shares.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
      return json(200, { shares });
    } catch (e) {
      return errorResponse(e);
    }
  },
});
